/**
 * Every change to the page's structure, in one place (nu-hax
 * docs/editor-redesign/spec.md §4.4, §5.6, §7.2, §7.3): moving, adding,
 * duplicating, removing and hiding sections, items and blocks. Each change
 * is one undo step, named for announcing ("Undid: moved Tools up"), and is
 * said in the live region ("Tools moved to 6 of 9"). Each leaves focus
 * where the spec has it: Add puts the caret in the new item's first field,
 * Duplicate selects the copy, Remove selects the unit before (or after, or
 * the section), and Move and Hide leave focus where it was.
 *
 * The rail, the frame, the Sections sheet and the keys call these; blocks,
 * which never import the editor, ask with a composed `oer-edit-request`
 * event, { action, …detail }, sent from themselves or a control of theirs:
 *
 *   this.dispatchEvent(new CustomEvent("oer-edit-request", { bubbles: true, composed: true, detail: { action: "add-item" } }))
 *
 *   action          detail                  does
 *   select          focus                   select(unit)
 *   move            dir (-1 up, 1 down)     move(unit, dir)
 *   move-to-column  dir                     moveToColumn(unit, dir)
 *   add-item        above, focus            addItem(unit)
 *   duplicate                               duplicate(unit)
 *   remove          ask, caret              remove(unit)
 *   hide, show                              hide(unit), show(unit)
 *   set-attr        name, value (or attrs)  setAttr(the sender, name, value), setAttrs(the sender, attrs)
 *   image           opener, back, focus     the image popover for its picture (oer-image-popover.js)
 *   icon            choices, title, opener  the icon picker for its icon (ui/oer-icon-picker.js)
 *   insert-block    slot, tag, starter      insertBlock(slot, tag, starter)
 *   paste-items     lines                   pasteItems(unit, lines)
 *   stray-to-items                          strayToItems(section)
 *   move-out                                moveOut(section)
 *
 * The unit is detail.unit, or the section, item or block the event came
 * from. A request the editor takes is cancelled (preventDefault), so a
 * block can tell (the hero's Change image). The popovers give focus back
 * to detail.opener (the control that asked, as Safari doesn't focus a
 * clicked button), or else to where it was as they opened.
 *
 * How (HAX 26.8.1, docs/editor-spikes/structure.md S1):
 * - Add: haxInsert(tag, starter, {}, item) passing the item, never a field
 *   (which would nest the new item in it), with __addAbove set first (HAX
 *   starts it true); then settled() before the caret goes in. Several at
 *   once (lines pasted, a section's stray blocks made items) go in as
 *   elements, and HAX makes their fields editable.
 * - Duplicate and Remove: haxDuplicateNode, haxDeleteNode.
 * - Move: a swap among the units of the same kind in one container
 *   (sections among sections, items among items, past their heading; a
 *   block past anything, in its column), never past a pinned one (the hero,
 *   Ready to start), with ___moveLock so HAX doesn't make the moved block
 *   active. HAX's haxMoveGridPlate would push an item past its section's
 *   heading. At the end of a column a block goes on to the next column.
 * - Hide, and any attribute: setAttr(), or setAttrs() for several at once
 *   (a picture and its description) as one step. Edits of the text that
 *   aren't typed (a link added or removed: oer-link-popover.js) run as one
 *   step the same way, through asOneStep().
 * Each is checkpointed before and after (undo.js checkpoint): typing not
 * yet recorded is its own step, and the change is one step, which notes
 * where the author was as it began and ended (for Undo and Redo to go
 * back to). Changes run one at a time, in the order asked, and what's
 * typed in the content meanwhile (Enter in a sentence, then the next
 * outcome's title straight away) is held and typed once they're done,
 * where they leave the caret.
 *
 * whyNot(action, el) says why something can't be done ("Already first",
 * "Only one per page"), for menus to show beside an item they switch off;
 * doing it anyway says the same in the live region.
 *
 * A removal's toast offers Undo for as long as editing lasts; its Undo goes
 * back to where the author was before the removal (undo.js placeOf), or
 * else to what it put back. And Enter on a unit selected as a whole (focus
 * in the content, no caret) puts the caret in its first field, rather than
 * HAX adding an empty paragraph above it.
 *
 *   installOps()   // from installEditorChrome (editor/index.js)
 *   await move(tools, -1)
 *   await addItem(outcome)
 */
import { checkpoint, undo, placeOf, placeAround } from "./undo.js";
import { policyOf, policyOfTag, labelOf, phraseOf, unitOf, TEXT_FIELDS } from "./policy.js";
import { editorState, contentView } from "./editor-state.js";
import { announce } from "./announce.js";
import { toaster } from "./oer-toast.js";
import { confirmDialog } from "../ui/oer-confirm.js";
import { columnCount } from "./layouts.js";
import { insertInSlot } from "./slots.js";
import { isMac } from "./stock.js";
import { imagePopover } from "./oer-image-popover.js";
import { iconPicker } from "../ui/oer-icon-picker.js";
import { getEditRange, setEditRange } from "../ui/edit-selection.js";

/** The attribute a section hidden from readers carries (spec §4.8). */
export const HIDDEN = "hidden-from-readers";

const UNDO_KEYS = isMac ? "⌘Z" : "Ctrl+Z";
const MEDIA = "img, video, audio, iframe";
const PIN_PLACE = { first: "top", last: "end" };

const haxStore = () => globalThis.HaxStore?.requestAvailability?.() ?? null;
const activeBody = () => haxStore()?.activeHaxBody ?? null;
const frame = () => new Promise((r) => requestAnimationFrame(r));
const selectionOf = (body) => body.getRootNode().getSelection?.() || globalThis.document.getSelection();
const hasText = (el) => !!el.textContent.trim() || el.matches(MEDIA) || !!el.querySelector(MEDIA);
// what's written in a unit: text and pictures in it, or its attributes that
// hold what the author wrote or chose (policy attrs: its heading, an image)
const hasContent = (unit) => [...unit.children].some(hasText) || policyOf(unit).attrs.some((a) => !!unit.getAttribute(a)?.trim());
// a sentence that starts with a unit's name: "The hero stays at the top"
const START = { start: true };

// focus as the person sees it, inside shadow roots
function deepActive() {
  let el = globalThis.document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el;
}
// focus gone: on the page itself, or on a control a change took away
const focusLost = (el = deepActive()) => !el || el === globalThis.document.body || !el.isConnected || !el.checkVisibility();
// whether a node is el or inside it, its shadow DOM included
function within(node, el) {
  for (let n = node; n; n = n.parentElement || n.getRootNode().host) if (n === el) return true;
  return false;
}

/**
 * Resolves once HAX has finished inserting (or importing) and two frames
 * have passed, or after 600 ms at most: then a caret placed in what it
 * inserted stays (hax-body.js haxInsert's finalizeInsert, 2665–2700).
 */
export async function settled(body = activeBody(), { timeout = 600 } = {}) {
  const start = performance.now();
  const state = body?._contentState;
  while (state && performance.now() - start < timeout && (state.getState("inserting") || state.getState("importing"))) await frame();
  await frame();
  await frame();
}

/* ---------- one change at a time, one undo step each ---------- */

/**
 * Run fn(body) as one undo step named step ("added a link"), after any
 * change still running, unit being what it changes: for edits that aren't
 * typed and aren't a unit's structure (oer-link-popover.js).
 */
export const asOneStep = (unit, step, fn) => change(unit, step, fn);

let queue = Promise.resolve();
// changes asked for and not yet done, and what's been typed meanwhile
let pending = 0;
let held = "";

// run fn(body) as one undo step named step, after any change still running;
// unit is what it changes, where Undo goes back to when the change came
// from a control (undo.js placeAround)
function change(unit, step, fn) {
  // (the page as it was is being saved: a change now would be dropped)
  if (editorState.saving) return refuse("Wait until the page is saved");
  pending++;
  const done = queue.then(async () => {
    const body = activeBody();
    if (!body?.editMode) return false;
    const before = placeAround(body, unit);
    checkpoint(body);
    try {
      return await fn(body);
    } finally {
      checkpoint(body, step, { before, after: placeAround(body, unit) });
    }
  });
  queue = done
    .catch(() => {})
    .then(() => {
      if (--pending === 0) typeHeld();
    });
  return done;
}

// a character typed in the content while a change is being made: held (a
// Backspace takes back the last one held), for typeHeld(). Otherwise it
// would go to the field the caret was in as the change was asked for: the
// sentence an Enter ended, not the new outcome's title
function holdKeys(e) {
  if (!pending || e.defaultPrevented || e.isComposing || e.ctrlKey || e.metaKey || e.altKey) return;
  const typed = e.key.length === 1;
  if (!typed && !(e.key === "Backspace" && held)) return;
  const body = activeBody();
  const origin = e.composedPath()[0];
  if (!body?.editMode || !(origin === body || body.contains(origin))) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  held = typed ? held + e.key : held.slice(0, -1);
}

// what was held, typed where the changes left the caret (if they left one)
function typeHeld() {
  const text = held;
  held = "";
  const body = activeBody();
  if (!text || !body?.editMode || deepActive() !== body) return;
  const sel = selectionOf(body);
  if (sel?.rangeCount && body.contains(sel.getRangeAt(0).startContainer)) globalThis.document.execCommand("insertText", false, text);
}

// say why not, and do nothing
function refuse(reason) {
  announce(reason);
  return Promise.resolve(false);
}

/* ---------- selecting ---------- */

// on screen, if none of it is
function reveal(el) {
  const view = contentView();
  const r = el.getBoundingClientRect();
  if (r.bottom <= view.top || r.top >= view.bottom) el.scrollIntoView({ block: "nearest" });
}

/**
 * Select a unit as a whole: HAX's active block, with no caret (so typing
 * can't go into it), and, with focus, focus on it (its name tag, drawn by
 * the selection frame); with no one to take it, and focus gone (with a
 * control a change took away), focus goes to the content, with no caret.
 */
export function select(el, { focus = true } = {}) {
  const body = activeBody();
  const unit = unitOf(el);
  if (!body?.editMode || !unit?.isConnected) return false;
  const sel = selectionOf(body);
  if (sel?.rangeCount && body.contains(sel.getRangeAt(0).startContainer)) sel.removeAllRanges();
  haxStore().activeNode = unit;
  reveal(unit);
  if (focus && !editorState.requestFocus(unit) && focusLost()) {
    body.focus({ preventScroll: true });
    sel?.removeAllRanges();
  }
  return true;
}

/**
 * Put the caret at the start (or end) of a field, with HAX's active block
 * on it. Resolves once it has stayed there a frame.
 */
export async function caretInto(field, { atEnd = false } = {}) {
  const body = activeBody();
  if (!body?.editMode || !field?.isConnected) return false;
  const place = () => {
    const range = globalThis.document.createRange();
    range.selectNodeContents(field);
    range.collapse(!atEnd);
    const sel = selectionOf(body);
    sel.removeAllRanges();
    sel.addRange(range);
  };
  body.focus({ preventScroll: true });
  place();
  body.__focusLogic(field, false);
  await frame();
  // (HAX making the field editable can take the caret away)
  const sel = selectionOf(body);
  if (!sel.rangeCount || !field.contains(sel.getRangeAt(0).startContainer)) place();
  return true;
}

// keep the caret (or selection) where it was across a move of what holds it
async function keepCaret(body, fn) {
  const sel = selectionOf(body);
  const range = sel?.rangeCount ? sel.getRangeAt(0) : null;
  const kept = range && body.contains(range.startContainer) ? new StaticRange(range) : null;
  await fn();
  if (!kept || !kept.startContainer.isConnected || !body.contains(kept.startContainer)) return;
  const back = globalThis.document.createRange();
  back.setStart(kept.startContainer, kept.startOffset);
  back.setEnd(kept.endContainer, kept.endOffset);
  sel.removeAllRanges();
  sel.addRange(back);
}

/* ---------- moving ---------- */

/**
 * The units a unit moves among, in order: a section among the sections, an
 * item among its section's items, and a block among everything beside it
 * (it moves past sections), in its column. Never the page-break.
 */
export function peersOf(el) {
  const unit = unitOf(el);
  const parent = unit?.parentElement;
  if (!parent) return [];
  const { kind } = policyOf(unit);
  const inColumns = policyOf(parent).kind === "layout";
  const slot = unit.getAttribute("slot") || "";
  return [...parent.children].filter((el) => {
    const k = policyOf(el).kind;
    if (k === "break" || (inColumns && (el.getAttribute("slot") || "") !== slot)) return false;
    if (kind === "section" || kind === "item") return k === kind;
    return k !== "item";
  });
}

// the column a block at the end of its column goes on to, or 0
function nextColumn(unit, dir) {
  const grid = unit.parentElement;
  if (policyOf(grid).kind !== "layout") return 0;
  const n = Number((unit.getAttribute("slot") || "col-1").replace("col-", "")) || 1;
  const to = n + dir;
  return to >= 1 && to <= columnCount(grid) ? to : 0;
}

// where a move goes: { partner } to swap with, { column }, or { reason } not
function planMove(unit, dir) {
  if (!unit) return { reason: "Nothing selected" };
  const { pin } = policyOf(unit);
  if (pin) return { reason: `${phraseOf(unit, START)} stays at the ${PIN_PLACE[pin]}` };
  const peers = peersOf(unit);
  const partner = peers[peers.indexOf(unit) + dir];
  if (!partner) {
    const column = nextColumn(unit, dir);
    return column ? { column } : { reason: dir < 0 ? "Already first" : "Already last" };
  }
  const theirs = policyOf(partner).pin;
  if (theirs) return { reason: `${phraseOf(partner, START)} stays at the ${PIN_PLACE[theirs]}` };
  return { partner };
}

// cards and chips run along a line: earlier and later, not up and down
function direction(unit, dir) {
  const { kind } = policyOf(unit);
  const along = kind === "item" && ["cards", "chips"].includes(policyOf(unit.parentElement).flow);
  return along ? (dir < 0 ? "earlier" : "later") : dir < 0 ? "up" : "down";
}

// two elements change places (neighbours or not)
function swap(a, b) {
  const mark = globalThis.document.createComment("");
  a.replaceWith(mark);
  b.replaceWith(a);
  mark.replaceWith(b);
}

/** Move a unit one place up (dir -1) or down (1), as one undo step. */
export function move(el, dir) {
  const unit = unitOf(el);
  dir = dir < 0 ? -1 : 1;
  const plan = planMove(unit, dir);
  if (plan.reason) return refuse(plan.reason);
  if (plan.column) return moveToColumn(unit, dir);
  return change(unit, `moved ${phraseOf(unit)} ${direction(unit, dir)}`, async (body) => {
    const { partner, reason } = planMove(unit, dir);
    if (!partner) return refuse(reason || "Can't move it there");
    await keepCaret(body, () => {
      // HAX's observer, when it runs, doesn't make the moved block active
      body.___moveLock = true;
      swap(unit, partner);
    });
    await settled(body);
    body.___moveLock = false;
    reveal(unit);
    const peers = peersOf(unit);
    announce(`${phraseOf(unit, START)} moved to ${peers.indexOf(unit) + 1} of ${peers.length}`);
    return true;
  });
}

/** Move a block in columns to the top of the next column (dir 1) or the end of the one before (-1). */
export function moveToColumn(el, dir) {
  const unit = unitOf(el);
  dir = dir < 0 ? -1 : 1;
  const why = whyNot("move-to-column", unit, { dir });
  if (why) return refuse(why);
  const to = nextColumn(unit, dir);
  const grid = unit.parentElement;
  return change(unit, `moved ${phraseOf(unit)} to column ${to}`, async (body) => {
    const slot = `col-${to}`;
    const there = [...grid.children].filter((c) => c !== unit && (c.getAttribute("slot") || "col-1") === slot);
    await keepCaret(body, () => {
      body.___moveLock = true;
      if (dir > 0 && there.length) there[0].before(unit);
      else if (dir < 0 && there.length) there[there.length - 1].after(unit);
      else grid.append(unit);
      unit.setAttribute("slot", slot);
    });
    await settled(body);
    body.___moveLock = false;
    reveal(unit);
    announce(`${phraseOf(unit, START)} moved to column ${to} of ${columnCount(grid)}`);
    return true;
  });
}

/* ---------- adding ---------- */

// the item a section lists: one it has, or the one it takes
function itemTagOf(section) {
  const own = [...section.children].find((c) => policyOf(c).kind === "item");
  return own?.localName || policyOf(section).accepts.find((tag) => policyOfTag(tag).kind === "item") || "";
}

// an item's first field: where its caret goes
const firstField = (el) => (el.matches(TEXT_FIELDS) ? el : el.querySelector(TEXT_FIELDS));

/**
 * Add an item: after an item (before it, with above), or first in a section
 * (after its heading). The caret goes into the new item's first field,
 * unless focus is false. Resolves to the new item.
 */
export function addItem(el, { above = false, focus = true } = {}) {
  const why = whyNot("add-item", el);
  if (why) return refuse(why);
  const at = unitOf(el);
  const isItem = policyOf(at).kind === "item";
  const section = isItem ? at.parentElement : at;
  const tag = itemTagOf(section);
  return change(section, `added ${phraseOf(tag)}`, async (body) => {
    // next to the item, or first in the section: before its first item, or
    // after its heading
    let anchor = isItem ? at : [...section.children].find((c) => policyOf(c).kind === "item");
    let addAbove = isItem ? above : !!anchor;
    if (!anchor) anchor = [...section.children].find((c) => /^h[1-6]$/.test(c.localName)) || null;
    let item;
    if (anchor) {
      body.__addAbove = addAbove;
      item = body.haxInsert(tag, policyOfTag(tag).starter, {}, anchor);
    } else {
      // an empty section: HAX inserts only next to something
      const t = globalThis.document.createElement("template");
      t.innerHTML = `<${tag}>${policyOfTag(tag).starter}</${tag}>`;
      item = t.content.firstElementChild;
      section.append(item);
      await body.__rehydrateLayoutDescendants?.(section, true);
    }
    await settled(body);
    if (!item?.isConnected) return null;
    const field = firstField(item);
    if (focus && field) await caretInto(field);
    else if (focus) select(item);
    reveal(item);
    const peers = peersOf(item);
    announce(`${phraseOf(tag, START)} added, ${peers.indexOf(item) + 1} of ${peers.length}`);
    return item;
  });
}

/**
 * Insert a new block in a slot (slots.js computeSlots), starting as starter
 * says ({ content, properties }). The caret goes into its first field, or
 * else it's selected; it scrolls to the centre. Resolves to the block.
 */
export function insertBlock(slot, tag, { content = "", properties = {} } = {}) {
  if (!slot?.container || !tag) return refuse("Nowhere to add it");
  return change(null, `added ${phraseOf(tag)}`, async (body) => {
    const added = await insertInSlot(haxStore(), slot, { tag, content, properties });
    if (!added) return null;
    await settled(body);
    const field = firstField(added);
    if (field) await caretInto(field);
    else select(added);
    added.scrollIntoView({ block: "center" });
    announce(`${phraseOf(tag, START)} added`);
    return added;
  });
}

/* ---------- duplicating ---------- */

function whyNotDuplicate(unit) {
  if (!unit) return "Nothing selected";
  const { kind, limit } = policyOf(unit);
  if (kind === "break") return "Not for the page's details";
  if (limit === 1) return "Only one per page";
  return "";
}

/** Duplicate a unit; the copy, right after it, is selected. Resolves to the copy. */
export function duplicate(el) {
  const unit = unitOf(el);
  const why = whyNotDuplicate(unit);
  if (why) return refuse(why);
  return change(unit, `duplicated ${phraseOf(unit)}`, async (body) => {
    await body.haxDuplicateNode(unit);
    // HAX puts the copy right after it
    const copy = unit.nextElementSibling;
    await settled(body);
    if (!copy) return null;
    select(copy);
    const peers = peersOf(copy);
    const said = `${phraseOf(unit, START)} duplicated`;
    announce(policyOf(unit).kind === "item" ? `${said}, ${peers.indexOf(copy) + 1} of ${peers.length}` : said);
    return copy;
  });
}

/* ---------- removing ---------- */

// what's typed in a section, for the question before removing it: its
// items with text ("its 3 outcomes"), or else its fields with text ("its
// note"), or else "what's in it" (its heading, the hero's image)
function typedIn(section) {
  const items = [...section.children].filter((c) => policyOf(c).kind === "item" && hasText(c));
  let count = items.length;
  let noun = count ? phraseOf(items[0]) : "";
  for (const [tag, field] of Object.entries(policyOf(section).fields)) {
    if (count) break;
    if (!field?.name || field.name === "heading") continue;
    count = [...section.querySelectorAll(tag)].filter(hasText).length;
    noun = field.name;
  }
  if (!count) return "what's in it";
  return count === 1 ? `its ${noun}` : `its ${count} ${noun}s`;
}

// what's selected once a unit has gone: the one before it, or after it, or
// (for an item) its section
function afterRemoving(unit) {
  const kind = policyOf(unit).kind;
  const around = kind === "item" ? peersOf(unit) : [...unit.parentElement.children].filter((c) => policyOf(c).kind !== "break");
  const i = around.indexOf(unit);
  return around[i - 1] || around[i + 1] || (kind === "item" ? unit.parentElement : null);
}

// the toasts offering to undo a removal: put away when editing ends
const undoToasts = new Set();

// a toast to take a removal back, while it's still the last thing done;
// its Undo goes back to place (where the author was before the removal),
// or else to what it put back
function offerUndo(body, text, place) {
  const stack = body.undoStack;
  const step = stack?.commands[stack.undoStackPosition];
  const id = toaster().show({
    text,
    said: `${text}. Undo with ${UNDO_KEYS}`,
    onClose: () => undoToasts.delete(id),
    action: {
      label: "Undo",
      run: async () => {
        if (!body.editMode) return;
        checkpoint(body);
        if (!step || stack.commands[stack.undoStackPosition] !== step) {
          announce(`Something else has changed since. Undo with ${UNDO_KEYS}, one step at a time`);
          return;
        }
        await undo({ place });
        // a unit selected as a whole, and focus not back in the content (HAX
        // takes editing off the content while a generated section is
        // selected): whoever draws the selection takes it
        const active = haxStore().activeNode;
        if (deepActive() !== body && active && unitOf(active) === active) editorState.requestFocus(active);
      },
    },
  });
  undoToasts.add(id);
}

/**
 * Remove a unit. A written section with something in it (text, or what its
 * attributes hold: a heading, an image) asks first (Keep it, Hide it
 * instead, Remove section), unless ask is false; anything else goes at
 * once, with a toast to undo it. What's selected next is the unit before
 * (or after, or the section); with caret "before", the caret goes to the
 * end of the field before it instead (Backspace in an empty item's title,
 * blocks/course-site/cs-keys.js). Resolves to whether it went (or, for Hide
 * it instead, was hidden).
 */
export async function remove(el, { ask = true, caret = null } = {}) {
  const unit = unitOf(el);
  const why = whyNot("remove", unit);
  if (why) return refuse(why);
  const policy = policyOf(unit);
  // where the author is, for the toast's Undo to go back to
  const place = placeOf(activeBody());
  if (ask && policy.kind === "section" && !policy.source && hasContent(unit)) {
    const choice = await confirmDialog().ask({
      title: `Remove “${labelOf(unit)}” and ${typedIn(unit)}?`,
      text: "Readers won't see it either way, but hiding it keeps what's written for later.",
      actions: [
        { id: "keep", label: "Keep it" },
        { id: "hide", label: "Hide it instead" },
        { id: "remove", label: "Remove section", kind: "destructive" },
      ],
    });
    if (choice === "hide") return hide(unit);
    if (choice !== "remove") return false;
  }
  const done = await change(unit, `removed ${phraseOf(unit)}`, async (body) => {
    if (!unit.isConnected) return false;
    const next = afterRemoving(unit);
    const before = caret === "before" ? fieldBefore(unit) : null;
    body.haxDeleteNode(unit);
    await settled(body);
    if (before?.isConnected) await caretInto(before, { atEnd: true });
    else if (next?.isConnected) select(next);
    return true;
  });
  if (done) offerUndo(activeBody(), `${phraseOf(unit, START)} removed`, place);
  return done;
}

// the field before a unit in its section, in reading order: the item
// before's last field, or the section's heading
function fieldBefore(unit) {
  const section = policyOf(unit).kind === "item" ? unit.parentElement : unit;
  const fields = [...section.querySelectorAll(TEXT_FIELDS)].filter((f) => !f.querySelector(TEXT_FIELDS) && !unit.contains(f));
  return fields.filter((f) => f.compareDocumentPosition(unit) & Node.DOCUMENT_POSITION_FOLLOWING).at(-1) || null;
}

/* ---------- several items at once ---------- */

// a new item of tag holding text in its first field
function itemWith(tag, text) {
  const item = globalThis.document.createElement(tag);
  item.innerHTML = policyOfTag(tag).starter;
  const field = firstField(item);
  if (typeof text === "string") field.textContent = text;
  else field.append(...text);
  return item;
}

/**
 * Lines pasted in an item's title (or into an empty item), as one undo
 * step: the first goes in at the caret (an empty item takes it as its
 * title), and each of the others becomes a new item after it. The caret
 * goes to the end of the last one's title. Resolves to the items.
 */
export function pasteItems(el, lines) {
  const at = unitOf(el);
  if (policyOf(at).kind !== "item" || !lines?.length) return refuse("Nothing to paste");
  const tag = at.localName;
  return change(at, `pasted ${lines.length} ${phraseOf(tag)}s`, async (body) => {
    const title = firstField(at);
    if (![...at.children].some(hasText) && title) title.textContent = lines[0];
    else globalThis.document.execCommand("insertText", false, lines[0]);
    const made = lines.slice(1).map((line) => itemWith(tag, line));
    at.after(...made);
    // (HAX makes the fields of a layout's new blocks editable)
    await body.__rehydrateLayoutDescendants?.(at.parentElement, true);
    await settled(body);
    const last = made.at(-1) || at;
    await caretInto(firstField(last), { atEnd: true });
    reveal(last);
    announce(`${lines.length} ${phraseOf(tag)}s pasted`);
    return [at, ...made];
  });
}

// what's in a section that readers won't see: blocks it doesn't take (it
// says which, blocks/course-site/cs-shared.js sortChildren)
const straysOf = (section) => section?.sortChildren?.().stray ?? [];

/**
 * A section's blocks that readers won't see, made into its items, after
 * its last item, as one undo step: as the section makes items from what
 * was written before it had them (its itemsFrom(): a question and its
 * answer one question, a list's rows a tool each), and any other block an
 * item titled with its text (a list, an item a row). Blocks without text
 * (a picture) stay. The caret goes to the end of the first new item's
 * title.
 */
export function strayToItems(el) {
  const section = unitOf(el);
  const tag = section ? itemTagOf(section) : "";
  const strays = straysOf(section).filter(hasText);
  if (!tag) return refuse("Nothing can be added here");
  if (!strays.length) return refuse("Nothing to make into items");
  return change(section, `made ${phraseOf(tag)}s`, async (body) => {
    const blocks = section.itemsFrom?.(strays) ?? strays;
    const made = blocks.flatMap((block) =>
      block.localName === tag ? [block] : (/^(ul|ol)$/.test(block.localName) ? [...block.children] : [block]).filter(hasText).map((b) => itemWith(tag, [...b.childNodes])),
    );
    const items = [...section.children].filter((c) => c.localName === tag);
    const after = items.at(-1) || section.headingElement;
    if (after) after.after(...made);
    else section.prepend(...made);
    for (const stray of strays) stray.remove();
    await body.__rehydrateLayoutDescendants?.(section, true);
    await settled(body);
    if (made[0]) await caretInto(firstField(made[0]), { atEnd: true });
    announce(made.length === 1 ? `${phraseOf(tag, START)} made` : `${made.length} ${phraseOf(tag)}s made`);
    return made;
  });
}

/** A section's blocks that readers won't see, moved out to just after it (as one undo step), the first selected. */
export function moveOut(el) {
  const section = unitOf(el);
  const strays = straysOf(section);
  if (!strays.length) return refuse("Nothing to move");
  return change(section, `moved ${strays.length === 1 ? "a block" : `${strays.length} blocks`} out of ${phraseOf(section)}`, async (body) => {
    body.___moveLock = true;
    section.after(...strays);
    await settled(body);
    body.___moveLock = false;
    select(strays[0]);
    announce(`${strays.length === 1 ? "Moved below" : `${strays.length} blocks moved below`} ${phraseOf(section)}`);
    return true;
  });
}

/* ---------- hiding, and attributes ---------- */

/**
 * Set an attribute (reflected by the block as a property), as one undo
 * step: null, undefined or false removes it, true sets it empty. step names
 * the undo step ("changed the hero"), and said is announced ("The hero
 * changed").
 */
export function setAttr(el, name, value, options = {}) {
  if (!name) return refuse("Nothing to change");
  return setAttrs(el, { [name]: value }, options);
}

/** Set several attributes at once ({ source, alt }), as one undo step, as setAttr() does one. */
export function setAttrs(el, attrs, { step = "", said = "" } = {}) {
  if (!el || !attrs || !Object.keys(attrs).length) return refuse("Nothing to change");
  const unit = unitOf(el) || el;
  return change(unit, step || `changed ${phraseOf(unit)}`, async () => {
    if (!el.isConnected) return false;
    for (const [name, value] of Object.entries(attrs)) {
      if (value === null || value === undefined || value === false) el.removeAttribute(name);
      else el.setAttribute(name, value === true ? "" : String(value));
    }
    // (what the block draws and reflects from them is part of the step)
    await el.updateComplete;
    await frame();
    announce(said || `${phraseOf(unit, START)} changed`);
    return true;
  });
}

// focus stays with the section: from one of its own controls, which the
// change takes away (the strip's Show to readers), it's selected
async function setHidden(el, hidden) {
  const why = whyNot(hidden ? "hide" : "show", el);
  if (why) return refuse(why);
  const unit = unitOf(el);
  const own = deepActive() !== unit && within(deepActive(), unit);
  const done = await setAttr(unit, HIDDEN, hidden, {
    step: hidden ? `hid ${phraseOf(unit)} from readers` : `showed ${phraseOf(unit)} to readers`,
    said: hidden ? `${phraseOf(unit, START)} hidden from readers. Undo with ${UNDO_KEYS}` : `${phraseOf(unit, START)} shown to readers`,
  });
  if (done && own) {
    await unit.updateComplete;
    if (focusLost()) select(unit);
  }
  return done;
}

/** Hide a section from readers (it stays on the page for authors). */
export const hide = (el) => setHidden(el, true);
/** Show a hidden section to readers again. */
export const show = (el) => setHidden(el, false);

/* ---------- what can't be done, and why ---------- */

/** Why an action (as in oer-edit-request) can't be done to el, or "" if it can. */
export function whyNot(action, el, { dir = 1 } = {}) {
  const unit = unitOf(el);
  if (!unit) return "Nothing selected";
  const { kind } = policyOf(unit);
  switch (action) {
    case "move":
      return planMove(unit, dir < 0 ? -1 : 1).reason || "";
    case "move-to-column":
      return nextColumn(unit, dir < 0 ? -1 : 1) ? "" : dir < 0 ? "Already in the first column" : "Already in the last column";
    case "add-item":
      return itemTagOf(kind === "item" ? unit.parentElement : unit) ? "" : "Nothing can be added here";
    case "duplicate":
      return whyNotDuplicate(unit);
    case "remove":
      return kind === "break" ? "Not for the page's details" : "";
    case "hide":
    case "show":
      if (kind !== "section") return "Only sections can be hidden";
      return unit.hasAttribute(HIDDEN) === (action === "hide") ? (action === "hide" ? "Already hidden" : "Already shown") : "";
    default:
      return "";
  }
}

/* ---------- the popovers: a picture, an icon ---------- */

// where focus is as a popover opens, to give it back to as it closes when
// no control asked (a rail's command): the caret where it was, or the unit
function focusBack(unit) {
  const body = activeBody();
  const range = body && deepActive() === body ? getEditRange(body) : null;
  const kept = range && body.contains(range.startContainer) ? new StaticRange(range) : null;
  return () => {
    if (kept?.startContainer.isConnected) {
      body.focus({ preventScroll: true });
      setEditRange(kept);
    } else if (unit?.isConnected) select(unit);
  };
}

/** The picture a block shows (the hero's, an image's), changed in the image popover: one step. */
export function changeImage(unit, { opener = null, back = null, focus = "" } = {}) {
  return imagePopover().openFor(unit, {
    opener,
    focus,
    back: back || focusBack(unit),
    apply: (target, attrs) => setAttrs(target, attrs, { step: "changed a picture", said: "Image changed" }),
  });
}

/**
 * A unit's icon (an outcome's), chosen in the icon picker among choices
 * ([{ value, label, render() }], "" for automatic): one step. Focus goes
 * back to the opener, or where it was.
 */
export async function changeIcon(unit, { choices = null, title = "Choose an icon", opener = null } = {}) {
  if (!unit) return false;
  const back = opener?.isConnected ? () => opener.isConnected && opener.focus({ preventScroll: true }) : focusBack(unit);
  const was = unit.getAttribute("icon") || "";
  const choice = await iconPicker().pick(was, { choices, title, anchor: opener?.isConnected ? opener : unit });
  let done = false;
  if (choice !== null && choice !== was) {
    const label = choices?.find((c) => c.value === choice)?.label || choice || "Automatic";
    done = await setAttr(unit, "icon", choice || null, { step: "changed an icon", said: `Icon: ${label}` });
  }
  back();
  return done;
}

/* ---------- requests from blocks ---------- */

const ACTIONS = {
  select: (unit, d) => select(unit, d),
  move: (unit, d) => move(unit, d.dir),
  "move-to-column": (unit, d) => moveToColumn(unit, d.dir),
  "add-item": (unit, d) => addItem(unit, d),
  duplicate: (unit) => duplicate(unit),
  remove: (unit, d) => remove(unit, d),
  hide: (unit) => hide(unit),
  show: (unit) => show(unit),
  "set-attr": (unit, d, from) => (d.attrs ? setAttrs(from, d.attrs) : setAttr(from, d.name, d.value)),
  image: (unit, d, from) => changeImage(from, d),
  icon: (unit, d) => changeIcon(unit, d),
  "insert-block": (unit, d) => insertBlock(d.slot, d.tag, d.starter),
  "paste-items": (unit, d) => pasteItems(unit, d.lines),
  "stray-to-items": (unit) => strayToItems(unit),
  "move-out": (unit) => moveOut(unit),
};

function onRequest(e) {
  const d = e.detail || {};
  const run = ACTIONS[d.action];
  const body = activeBody();
  if (!run || !body?.editMode) return;
  // the block the event came from: the first element in the content on its
  // way out (its own controls are in its shadow DOM)
  const from = d.unit || e.composedPath().find((n) => n.nodeType === 1 && n !== body && body.contains(n)) || null;
  // (taken: a block asking can tell, as the hero's Change image does)
  e.preventDefault();
  run(from && unitOf(from), d, from);
}

/* ---------- Enter on a unit selected as a whole ---------- */

// Enter with focus in the content and no caret (a unit selected as a
// whole) edits the unit: the caret goes into its first field (spec §7.1).
// HAX would add an empty paragraph above it. (Until the selection frame's
// name tag holds focus in the Selected state, editor-redesign WP-09.) The
// state is the editor's as the key arrives: Chrome has by then put a caret
// at the start of the content.
function enterSelected(e) {
  if (e.key !== "Enter" || e.defaultPrevented || e.isComposing || e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) return;
  const body = activeBody();
  const { mode, unit } = editorState;
  if (!body?.editMode || mode !== "selected" || deepActive() !== body || !unit?.isConnected || !body.contains(unit)) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  const field = firstField(unit);
  if (field) caretInto(field);
}

/** All of the above, for the editor checks and the console (globalThis.OerEditor.ops). */
export const ops = { settled, select, caretInto, peersOf, move, moveToColumn, addItem, insertBlock, duplicate, remove, pasteItems, strayToItems, moveOut, setAttr, setAttrs, asOneStep, changeImage, changeIcon, hide, show, whyNot };

let installed = false;
export function installOps() {
  if (installed) return;
  installed = true;
  globalThis.addEventListener("oer-edit-request", onRequest);
  // capture, on the window: before HAX's own keydown (also on the window),
  // and the editor's on hax-body (editor/field-keys.js)
  globalThis.addEventListener("keydown", enterSelected, true);
  globalThis.addEventListener("keydown", holdKeys, true);
  // nothing is left to undo, or to type, once editing ends
  globalThis.addEventListener("haxcms-edit-mode-changed", (e) => {
    if (e.detail) return;
    for (const id of [...undoToasts]) toaster().dismiss(id);
    held = "";
  });
}
