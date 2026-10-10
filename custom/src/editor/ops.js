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
 *   remove          ask                     remove(unit)
 *   hide, show                              hide(unit), show(unit)
 *   set-attr        name, value             setAttr(the sender, name, value)
 *   insert-block    slot, tag, starter      insertBlock(slot, tag, starter)
 *
 * The unit is detail.unit, or the section, item or block the event came
 * from. Other actions ("image", "icon") are for the popovers.
 *
 * How (HAX 26.8.1, docs/editor-spikes/structure.md S1):
 * - Add: haxInsert(tag, starter, {}, item) passing the item, never a field
 *   (which would nest the new item in it), with __addAbove set first (HAX
 *   starts it true); then settled() before the caret goes in.
 * - Duplicate and Remove: haxDuplicateNode, haxDeleteNode.
 * - Move: a swap among the units of the same kind in one container
 *   (sections among sections, items among items, past their heading; a
 *   block past anything, in its column), never past a pinned one (the hero,
 *   Ready to start), with ___moveLock so HAX doesn't make the moved block
 *   active. HAX's haxMoveGridPlate would push an item past its section's
 *   heading. At the end of a column a block goes on to the next column.
 * - Hide, and any attribute: setAttr().
 * Each is checkpointed before and after (undo.js checkpoint): typing not
 * yet recorded is its own step, and the change is one step. Changes run one
 * at a time, in the order asked.
 *
 * whyNot(action, el) says why something can't be done ("Already first",
 * "Only one per page"), for menus to show beside an item they switch off;
 * doing it anyway says the same in the live region.
 *
 *   installOps()   // from installEditorChrome (editor/index.js)
 *   await move(tools, -1)
 *   await addItem(outcome)
 */
import { checkpoint, undo } from "./undo.js";
import { policyOf, policyOfTag, labelOf, unitOf, TEXT_FIELDS } from "./policy.js";
import { editorState, contentView } from "./editor-state.js";
import { announce } from "./announce.js";
import { toaster } from "./oer-toast.js";
import { confirmDialog } from "../ui/oer-confirm.js";
import { columnCount } from "./layouts.js";
import { insertInSlot } from "./slots.js";
import { isMac } from "./stock.js";

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

let queue = Promise.resolve();

// run fn(body) as one undo step named step, after any change still running
function change(step, fn) {
  const done = queue.then(async () => {
    const body = activeBody();
    if (!body?.editMode) return false;
    checkpoint(body);
    try {
      return await fn(body);
    } finally {
      checkpoint(body, step);
    }
  });
  queue = done.catch(() => {});
  return done;
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
 * the selection frame).
 */
export function select(el, { focus = true } = {}) {
  const body = activeBody();
  const unit = unitOf(el);
  if (!body?.editMode || !unit?.isConnected) return false;
  const sel = selectionOf(body);
  if (sel?.rangeCount && body.contains(sel.getRangeAt(0).startContainer)) sel.removeAllRanges();
  haxStore().activeNode = unit;
  reveal(unit);
  if (focus) editorState.requestFocus(unit);
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
  if (pin) return { reason: `${labelOf(unit)} stays at the ${PIN_PLACE[pin]}` };
  const peers = peersOf(unit);
  const partner = peers[peers.indexOf(unit) + dir];
  if (!partner) {
    const column = nextColumn(unit, dir);
    return column ? { column } : { reason: dir < 0 ? "Already first" : "Already last" };
  }
  const theirs = policyOf(partner).pin;
  if (theirs) return { reason: `${labelOf(partner)} stays at the ${PIN_PLACE[theirs]}` };
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
  const label = labelOf(unit);
  return change(`moved ${label} ${direction(unit, dir)}`, async (body) => {
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
    announce(`${label} moved to ${peers.indexOf(unit) + 1} of ${peers.length}`);
    return true;
  });
}

/** Move a block in columns to the top of the next column (dir 1) or the end of the one before (-1). */
export function moveToColumn(el, dir) {
  const unit = unitOf(el);
  dir = dir < 0 ? -1 : 1;
  const to = unit ? nextColumn(unit, dir) : 0;
  if (!to) return refuse(dir < 0 ? "Already in the first column" : "Already in the last column");
  const label = labelOf(unit);
  const grid = unit.parentElement;
  return change(`moved ${label} to column ${to}`, async (body) => {
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
    announce(`${label} moved to column ${to} of ${columnCount(grid)}`);
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
  const at = unitOf(el);
  const isItem = policyOf(at).kind === "item";
  const section = isItem ? at.parentElement : at;
  const tag = section ? itemTagOf(section) : "";
  if (!tag) return refuse(`${at ? labelOf(at) : "This"} has no items to add`);
  const label = labelOf(tag);
  return change(`added ${label.toLowerCase()}`, async (body) => {
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
    announce(`${label} added, ${peers.indexOf(item) + 1} of ${peers.length}`);
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
  const label = labelOf(tag);
  return change(`added ${label.toLowerCase()}`, async (body) => {
    const added = await insertInSlot(haxStore(), slot, { tag, content, properties });
    if (!added) return null;
    await settled(body);
    const field = firstField(added);
    if (field) await caretInto(field);
    else select(added);
    added.scrollIntoView({ block: "center" });
    announce(`${label} added`);
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
  const label = labelOf(unit);
  return change(`duplicated ${label}`, async (body) => {
    await body.haxDuplicateNode(unit);
    // HAX puts the copy right after it
    const copy = unit.nextElementSibling;
    await settled(body);
    if (!copy) return null;
    select(copy);
    const peers = peersOf(copy);
    announce(policyOf(unit).kind === "item" ? `${label} duplicated, ${peers.indexOf(copy) + 1} of ${peers.length}` : `${label} duplicated`);
    return copy;
  });
}

/* ---------- removing ---------- */

// what's typed in a section, for the question before removing it: its
// items with text ("3 outcomes"), or else its fields with text ("1 note")
function typedIn(section) {
  const items = [...section.children].filter((c) => policyOf(c).kind === "item" && hasText(c));
  if (items.length) return { count: items.length, noun: labelOf(items[0]).toLowerCase() };
  for (const [tag, field] of Object.entries(policyOf(section).fields)) {
    if (!field?.name || field.name === "heading") continue;
    const typed = [...section.querySelectorAll(tag)].filter(hasText);
    if (typed.length) return { count: typed.length, noun: field.name };
  }
  return { count: 0, noun: "" };
}

// what's selected once a unit has gone: the one before it, or after it, or
// (for an item) its section
function afterRemoving(unit) {
  const kind = policyOf(unit).kind;
  const around = kind === "item" ? peersOf(unit) : [...unit.parentElement.children].filter((c) => policyOf(c).kind !== "break");
  const i = around.indexOf(unit);
  return around[i - 1] || around[i + 1] || (kind === "item" ? unit.parentElement : null);
}

// a toast to take a removal back, while it's still the last thing done
function offerUndo(body, text) {
  const stack = body.undoStack;
  const step = stack?.commands[stack.undoStackPosition];
  toaster().show({
    text,
    said: `${text}. Undo with ${UNDO_KEYS}`,
    action: {
      label: "Undo",
      run: () => {
        checkpoint(body);
        if (body.editMode && step && stack.commands[stack.undoStackPosition] === step) undo();
        else announce("Something else has changed since; use Undo in the bar");
      },
    },
  });
}

/**
 * Remove a unit. A written section with something typed in it asks first
 * (Keep it, Hide it instead, Remove section), unless ask is false; anything
 * else goes at once, with a toast to undo it. Resolves to whether it went
 * (or, for Hide it instead, was hidden).
 */
export async function remove(el, { ask = true } = {}) {
  const unit = unitOf(el);
  if (!unit) return refuse("Nothing selected");
  const policy = policyOf(unit);
  if (policy.kind === "break") return refuse("Not for the page's details");
  const label = labelOf(unit);
  if (ask && policy.kind === "section" && !policy.source && [...unit.children].some(hasText)) {
    const { count, noun } = typedIn(unit);
    const choice = await confirmDialog().ask({
      title: count ? `Remove “${label}” and its ${count} ${count === 1 ? noun : `${noun}s`}?` : `Remove “${label}” and what's written in it?`,
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
  const done = await change(`removed ${label}`, async (body) => {
    if (!unit.isConnected) return false;
    const next = afterRemoving(unit);
    body.haxDeleteNode(unit);
    await settled(body);
    if (next?.isConnected) select(next);
    return true;
  });
  if (done) offerUndo(activeBody(), `${label} removed`);
  return done;
}

/* ---------- hiding, and attributes ---------- */

/**
 * Set an attribute (reflected by the block as a property), as one undo
 * step: null, undefined or false removes it, true sets it empty. step names
 * the undo step ("changed Hero"), and said is announced ("Hero changed").
 */
export function setAttr(el, name, value, { step = "", said = "" } = {}) {
  if (!el || !name) return refuse("Nothing to change");
  const label = labelOf(unitOf(el) || el);
  return change(step || `changed ${label}`, () => {
    if (!el.isConnected) return false;
    if (value === null || value === undefined || value === false) el.removeAttribute(name);
    else el.setAttribute(name, value === true ? "" : String(value));
    announce(said || `${label} changed`);
    return true;
  });
}

function setHidden(el, hidden) {
  const unit = unitOf(el);
  if (policyOf(unit).kind !== "section") return refuse("Only sections can be hidden");
  if (unit.hasAttribute(HIDDEN) === hidden) return Promise.resolve(false);
  const label = labelOf(unit);
  return setAttr(unit, HIDDEN, hidden, {
    step: hidden ? `hid ${label} from readers` : `showed ${label} to readers`,
    said: hidden ? `${label} hidden from readers. Undo with ${UNDO_KEYS}` : `${label} shown to readers`,
  });
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
      return itemTagOf(kind === "item" ? unit.parentElement : unit) ? "" : "Takes no items";
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
  "set-attr": (unit, d, from) => setAttr(from, d.name, d.value),
  "insert-block": (unit, d) => insertBlock(d.slot, d.tag, d.starter),
};

function onRequest(e) {
  const d = e.detail || {};
  const run = ACTIONS[d.action];
  const body = activeBody();
  if (!run || !body?.editMode) return;
  // the block the event came from: the first element in the content on its
  // way out (its own controls are in its shadow DOM)
  const from = d.unit || e.composedPath().find((n) => n.nodeType === 1 && n !== body && body.contains(n)) || null;
  run(from && unitOf(from), d, from);
}

/** All of the above, for the editor checks and the console (globalThis.OerEditor.ops). */
export const ops = { settled, select, caretInto, peersOf, move, moveToColumn, addItem, insertBlock, duplicate, remove, setAttr, hide, show, whyNot };

let installed = false;
export function installOps() {
  if (installed) return;
  installed = true;
  globalThis.addEventListener("oer-edit-request", onRequest);
}
