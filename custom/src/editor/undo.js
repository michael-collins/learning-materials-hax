/**
 * Undo that follows the content, not the editor's bookkeeping (nu-hax
 * docs/editor-redesign/spec.md §6.2 #3 and #4, docs/editor-spikes/lifecycle.md).
 *
 * - Selecting isn't an undo step. HAX snapshots hax-body's HTML 300 ms after
 *   any change to it, and selecting a block changes attributes (data-hax-*,
 *   contenteditable, role, element-visible as blocks scroll in and out), so
 *   five clicks were five steps of nothing. Blocks change their own markup
 *   too, as they start and as Undo puts them back (grid-plate adds ready, a
 *   question takes its answer inputs out, editable-table rewrites the white
 *   space between its rows), which made entering edit mode a step and cost
 *   the Redo; normalizedHtml() leaves out what HAX never saves of them, and
 *   white space between blocks. A snapshot whose normalizedHtml() is that
 *   of the state the undo position stands for (the last step, or what Undo
 *   or Redo put back) is skipped, which also keeps Redo after a click (and
 *   after the blocks Undo put back redraw), and a step that is recorded
 *   starts from that state. Snapshots stay raw, so undoing still restores
 *   which block was active. hax-body/hax-body.js undoManagerStackLogic
 *   5444; undo-manager/undo-manager.js undoManagerStackLogic, Undo, and
 *   UndoManagerCommand.undo (which puts back the step before's newValue).
 * - Mod+Z, Mod+Shift+Z and Ctrl+Y (and Ctrl+Z, HAX's own, on a Mac too) run
 *   HAX's undo and redo when focus is in the content or the editor's own
 *   controls, but not in a form field, which keeps its own. HAX listened
 *   for Ctrl only, so ⌘Z ran the browser's undo, which HAX then recorded as
 *   a new step. The browser's own Undo and Redo commands (the Edit menu)
 *   go to HAX's too. hax-body.js _onKeyDown 1433–1451, undo 4237.
 * - Undo keeps a quiz's answers: a question's answers live in a property,
 *   and its light DOM holds them only after saving writes them there, so
 *   they're written back before each snapshot (keepAnswers).
 * - Typing HAX hasn't recorded yet (it waits 300 ms) is recorded first, so
 *   Undo straight after typing takes back the typing, not the step before.
 * - Undo and Redo put the caret back where it was (spec §6.2 #4, §7.2):
 *   HAX puts back a copy of the whole content and then puts the caret at
 *   the start of the block that was active, so the next key went in at the
 *   start of the paragraph. placeOf() notes the field and the caret's place
 *   in its text, and returnTo() finds them again in the copy; where Undo
 *   changed that field's text, the caret goes to the end of the change.
 *   When the place is gone (Undo took back the item it was in), the block
 *   HAX made active again takes it.
 * - checkpoint(body, label) records the content as one step now, named for
 *   announcing ("moved Tools up"); ops.js puts one before and one after
 *   each change it makes. undo() and redo() send `oer-undo` from hax-body
 *   with { redo, label }.
 * - What a block makes of itself as editing begins is how the page began,
 *   not a step: a course site section upgrades the markup written before
 *   the section model and makes an empty heading to type into (blocks/
 *   course-site/cs-shared.js upgrade(), on HAX's editModeChanged), which
 *   can come after HAX has taken its starting copy (once it has imported
 *   the page, a frame later). On its cs-upgraded, while nothing is recorded
 *   yet, the starting copy is taken again. hax-body.js 4401–4448, 3563.
 *
 *   installUndo()          // from installEditorChrome (editor/index.js)
 *   undo(); redo()         // the editing bar's buttons
 *   undo({ place })        // and go back to a place placeOf() took
 *   checkpoint(body, "moved Tools up")
 */
import { isMac } from "./stock.js";
import { onDefined, pinned } from "./hax-fixes.js";
import { fieldOf } from "./policy.js";

const haxStore = () => globalThis.HaxStore?.requestAvailability?.() ?? null;
const activeBody = () => haxStore()?.activeHaxBody ?? null;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const frame = () => new Promise((r) => requestAnimationFrame(r));
const selectionOf = (body) => body.getRootNode().getSelection?.() || globalThis.document.getSelection();

// focus as the person sees it, inside shadow roots
function deepActive() {
  let el = globalThis.document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el;
}

// the attributes HAX never saves for a tag (its haxProperties'
// saveOptions.unsetAttributes): state a block keeps in its own markup, as
// grid-plate's ready, true-false-question's _tfanswer, self-check's
// image-loaded. hax-body/lib/hax-store.js nodeToContent 5196–5202
const unsaved = (tag) => haxStore()?.elementList?.[tag]?.saveOptions?.unsetAttributes ?? [];
// question blocks (multiple-choice, true-false-question) take their
// answers out of light-DOM inputs when they start and write them back only
// for saving, so the inputs come and go with Undo and the stock editor's
// snapshot. multiple-choice/lib/QuestionElement.js loadLightDomData 1187,
// haxpreProcessNodeToContent 746
const answersInLightDom = (tag) => typeof globalThis.customElements.get(tag)?.prototype?.loadLightDomData === "function";

// blocks, between which white space is only layout
const BLOCK = /^(p|h[1-6]|ul|ol|li|dl|dt|dd|div|blockquote|pre|figure|figcaption|table|thead|tbody|tfoot|tr|td|th|hr|section|details|summary|page-break)$/;
const isBlock = (n) => n?.nodeType === 1 && (BLOCK.test(n.localName) || n.localName.includes("-"));
// white space HTML ignores (not a typed non-breaking space)
const BLANK = /^[ \t\n\r\f]*$/;

/**
 * HTML without what HAX changes while editing: data-hax-* attributes,
 * contenteditable, draggable, element-visible, role="textbox", hax-*
 * classes and the end cap a drag adds; without what blocks change in their
 * own markup that HAX never saves: attributes their haxProperties leave
 * unsaved, and a question's answer inputs; and without white space between
 * blocks, which HAX changes when it imports a page again (Edit HTML puts a
 * line break between nested blocks, docs/editor-spikes/structure.md) and
 * editable-table rewrites as it starts. White space between words and
 * inline elements, and in pre, stays. What "changed" means for undo and
 * unsaved changes.
 */
export function normalizedHtml(html) {
  const t = globalThis.document.createElement("template");
  t.innerHTML = html;
  for (const el of t.content.querySelectorAll("*")) {
    if (el.localName === "fake-hax-body-end") {
      el.remove();
      continue;
    }
    const skip = unsaved(el.localName);
    for (const a of [...el.attributes]) {
      if (a.name.startsWith("data-hax-") || a.name === "contenteditable" || a.name === "draggable" || a.name === "element-visible" || skip.includes(a.name)) el.removeAttribute(a.name);
    }
    if (answersInLightDom(el.localName)) for (const input of el.querySelectorAll(":scope > input:not([slot])")) input.remove();
    if (el.getAttribute("role") === "textbox") el.removeAttribute("role");
    if (el.hasAttribute("class")) {
      const kept = [...el.classList].filter((c) => !c.startsWith("hax-"));
      if (kept.length) el.setAttribute("class", kept.join(" "));
      else el.removeAttribute("class");
    }
  }
  const walk = globalThis.document.createTreeWalker(t.content, NodeFilter.SHOW_TEXT);
  const blank = [];
  for (let n = walk.nextNode(); n; n = walk.nextNode()) {
    if (!BLANK.test(n.data) || n.parentElement?.closest("pre")) continue;
    if (n.parentNode === t.content || isBlock(n.previousSibling) || isBlock(n.nextSibling) || (!n.previousSibling && !n.nextSibling && isBlock(n.parentNode))) blank.push(n);
  }
  for (const n of blank) n.remove();
  return t.innerHTML.trim();
}

/**
 * Write each question's answers back into its light DOM, as saving does,
 * so the copies undo keeps hold them: a question put back from a copy
 * without them had no answers left (one Undo after typing on a quiz page
 * emptied every question, and saving then saved them empty). Before each
 * snapshot.
 */
function keepAnswers(body) {
  for (const el of body.querySelectorAll("*")) {
    if (!answersInLightDom(el.localName) || !el.answers?.length || typeof el.haxpreProcessNodeToContent !== "function") continue;
    if (!el.querySelector(":scope > input:not([slot])")) el.haxpreProcessNodeToContent(el);
  }
}

/* ---------- what the undo position stands for ---------- */

// the last state compared, per body: { raw, blocks, normalized }
const recordedCache = new WeakMap();

// the content the undo position stands for, as HAX keeps it: the last step
// recorded, or what Undo or Redo put back (the step before's, or HAX's
// starting copy)
function recordedRaw(body) {
  const stack = body.undoStack;
  const step = stack?.commands?.[stack.undoStackPosition];
  return step ? step.newValue : stack?.undoStackPosition === -1 ? body.undoStackInitialValue : body.undoStackPrevValue;
}

// the same, normalized
function recorded(body) {
  const raw = recordedRaw(body);
  // (normalizing depends on the blocks HAX knows, which can grow)
  const blocks = Object.keys(haxStore()?.elementList ?? {}).length;
  let cached = recordedCache.get(body);
  if (cached?.raw !== raw || cached.blocks !== blocks) recordedCache.set(body, (cached = { raw, blocks, normalized: normalizedHtml(raw ?? "") }));
  return cached.normalized;
}

/** Whether hax-body holds changes no undo step has recorded yet. */
const unrecorded = (body) => normalizedHtml(body.innerHTML) !== recorded(body);

/* ---------- steps ---------- */

// what each step did, for announcing it ("Undid: moved Tools up")
const labels = new WeakMap();

/**
 * Record hax-body's content as an undo step now, if it changed since the
 * last one, rather than when HAX's 300 ms wait ends; label names the step.
 */
export function checkpoint(body, label = "") {
  const stack = body?.undoStack;
  if (!stack) return;
  const before = stack.commands[stack.undoStackPosition];
  if (unrecorded(body)) {
    clearTimeout(body.__StackDebounce);
    // an Undo's own change, not yet seen by HAX's observer, is past
    body.undoStackIgnore = false;
    body.undoManagerStackLogic({});
  }
  const step = stack.commands[stack.undoStackPosition];
  if (label && step && step !== before) labels.set(step, label);
}

/** The name of the step Undo (or Redo) would take back next, or "". */
export function stepLabel(body = activeBody(), { redo: again = false } = {}) {
  const stack = body?.undoStack;
  const step = stack?.commands[again ? stack.undoStackPosition + 1 : stack?.undoStackPosition];
  return (step && labels.get(step)) || "";
}

/* ---------- where the caret goes back to ---------- */

// an element's way down from hax-body: at each level its tag and its place
// among the siblings with that tag, so a section found by it is found
// after moving past others (there's one of each section)
function pathTo(body, el) {
  const path = [];
  for (; el && el !== body; el = el.parentElement) {
    path.unshift([el.localName, [...el.parentElement.children].filter((c) => c.localName === el.localName).indexOf(el)]);
  }
  return path;
}

function follow(body, path) {
  let el = body;
  for (const [tag, i] of path) {
    el = [...el.children].filter((c) => c.localName === tag)[i];
    if (!el) return null;
  }
  return el;
}

/**
 * Where the author is in the content, to go back to once Undo or Redo has
 * put back a copy of it (new elements throughout): the field the caret is
 * in, its text and the caret's place in that text; or, with no caret, the
 * block selected as a whole (HAX's active block). Null when there's
 * neither.
 */
export function placeOf(body = activeBody()) {
  if (!body?.editMode) return null;
  const sel = selectionOf(body);
  const range = sel?.rangeCount ? sel.getRangeAt(0) : null;
  const field = range && body.contains(range.startContainer) ? fieldOf(range.startContainer) : null;
  if (field) {
    const before = globalThis.document.createRange();
    before.selectNodeContents(field);
    before.setEnd(range.startContainer, range.startOffset);
    return { path: pathTo(body, field), text: field.textContent, offset: before.toString().length };
  }
  const active = haxStore()?.activeNode;
  return active && active !== body && body.contains(active) ? { path: pathTo(body, active), text: null, offset: 0 } : null;
}

// the place's element in the content as it is now: at the same path, or,
// when that holds other text, the one element of its tag that holds the
// place's text (it moved among its own kind)
function findPlace(body, place) {
  const at = follow(body, place.path);
  if (place.text === null || at?.textContent === place.text) return at;
  const same = [...body.querySelectorAll(place.path.at(-1)[0])].filter((el) => el.textContent === place.text);
  return same.length === 1 ? same[0] : at;
}

// where the caret goes in a field whose text changed from before to after:
// the end of what changed (typing taken back: where it began)
function changedAt(before, after) {
  let start = 0;
  while (start < before.length && start < after.length && before[start] === after[start]) start++;
  let end = 0;
  while (end < before.length - start && end < after.length - start && before[before.length - 1 - end] === after[after.length - 1 - end]) end++;
  return after.length - end;
}

// a caret at a character offset in an element's text (its end, past it)
function caretAt(el, offset) {
  const range = globalThis.document.createRange();
  const walk = globalThis.document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let last = null;
  for (let n = walk.nextNode(); n; n = walk.nextNode()) {
    if (offset <= n.data.length) {
      range.setStart(n, offset);
      return range;
    }
    offset -= n.data.length;
    last = n;
  }
  if (last) range.setStart(last, last.data.length);
  else range.setStart(el, 0);
  return range;
}

// focus in the content, and the caret at range (or none: a block selected
// as a whole), with HAX's active block on node
function putCaret(body, range, node) {
  if (deepActive() !== body) body.focus({ preventScroll: true });
  const sel = selectionOf(body);
  sel.removeAllRanges();
  if (range) {
    range.collapse(true);
    sel.addRange(range);
    body.__focusLogic(node, false);
  } else if (haxStore().activeNode !== node) haxStore().activeNode = node;
}

/**
 * Go back to a place placeOf() took, in the content as it is now: the caret
 * where it was in its field (at the end of what changed, if its text did),
 * or the block selected again with no caret. Focus goes back into the
 * content. False when the place is gone.
 */
export function returnTo(body, place) {
  const el = place && body?.editMode ? findPlace(body, place) : null;
  if (!el) return false;
  if (place.text === null) {
    putCaret(body, null, el);
    return true;
  }
  const text = el.textContent;
  putCaret(body, caretAt(el, text === place.text ? place.offset : changedAt(place.text, text)), el);
  return true;
}

// the place is gone (Undo took back what held it): the block HAX made
// active again from the copy, with the caret at the end of its text, or
// selected as a whole
function returnToActive(body) {
  const hax = haxStore();
  const active = hax.activeNode;
  if (!active || !body.contains(active)) return;
  putCaret(body, hax.isTextElement?.(active) ? caretAt(active, active.textContent.length) : null, active);
}

async function step(again, { place } = {}) {
  const body = activeBody();
  if (!body?.undoStack || !body.editMode) return false;
  checkpoint(body);
  // where to go back to: the place given (a toast's Undo, where focus was on
  // the toast), or where the author is when focus is in the content; from
  // the editor's own buttons, focus stays on the button
  const inContent = deepActive() === body;
  place ??= inContent ? placeOf(body) : null;
  const label = stepLabel(body, { redo: again });
  const stack = body.undoStack;
  const possible = again ? stack.canRedo() : stack.canUndo();
  if (again) body.redo();
  else body.undo();
  if (!possible) return false;
  body.dispatchEvent(new CustomEvent("oer-undo", { bubbles: true, composed: true, detail: { redo: again, label } }));
  // HAX makes the copy's active block active again a task later, and puts
  // the caret at its start a task after that (hax-body.js undo 4237,
  // __focusLogic 4064)
  await sleep(0);
  await sleep(0);
  await frame();
  if (!body.editMode) return true;
  const lost = !deepActive() || deepActive() === globalThis.document.body;
  if (!returnTo(body, place) && (place || inContent || lost)) returnToActive(body);
  return true;
}

/** HAX's Undo, after recording any typing not yet in a step; then back to place (placeOf()), or where the caret was. */
export const undo = (options) => step(false, options);
/** HAX's Redo. */
export const redo = (options) => step(true, options);

/* ---------- keys ---------- */

const FORM_FIELDS = "input, textarea, select, [contenteditable='plaintext-only']";
// the editor's own controls, where Mod+Z means the page's undo
const CHROME = "hax-body, oer-block-rail, oer-block-frame, oer-block-inserter, oer-edit-bar, header.editing";

// whether a key or input came from the content or the editor's controls,
// and not from a form field (which keeps its own undo)
function forThePage(e) {
  const path = e.composedPath();
  const origin = path[0];
  const doc = globalThis.document;
  if (!origin || origin === globalThis || origin === doc || origin === doc.body || origin === doc.documentElement) return true;
  if (origin.matches?.(FORM_FIELDS)) return false;
  return path.some((n) => n.matches?.(CHROME));
}

function undoKeys(e) {
  const body = activeBody();
  if (!body?.editMode || e.defaultPrevented || e.altKey) return;
  const key = e.key?.toLowerCase();
  // ⌘ on a Mac (and HAX's own Ctrl), Ctrl elsewhere
  const mod = isMac ? e.metaKey !== e.ctrlKey : e.ctrlKey && !e.metaKey;
  const again = (mod && key === "z" && e.shiftKey) || (!isMac && e.ctrlKey && !e.shiftKey && key === "y");
  if (!again && !(mod && key === "z" && !e.shiftKey)) return;
  if (!forThePage(e)) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  step(again);
}

// the browser's own Undo and Redo (the Edit menu), sent as beforeinput
function historyInput(e) {
  if (!/^history(Undo|Redo)$/.test(e.inputType)) return;
  const body = activeBody();
  if (!body?.editMode || !e.composedPath().includes(body) || !forThePage(e)) return;
  e.preventDefault();
  step(e.inputType === "historyRedo");
}

/* ---------- how the page began ---------- */

// a block upgraded itself as editing began: HAX's starting copy is the
// page as it is now, while there's no step yet
function upgraded(e) {
  const body = activeBody();
  const stack = body?.undoStack;
  if (!body?.editMode || !stack || !e.composedPath().includes(body)) return;
  if (stack.commands.length || stack.undoStackPosition !== -1) return;
  body.undoStackInitialValue = body.innerHTML;
  body.undoStackPrevValue = body.innerHTML;
}

/* ---------- installing ---------- */

let installed = false;
export function installUndo() {
  if (installed) return;
  installed = true;
  onDefined("hax-body", (HaxBody) => {
    pinned(
      { fix: "selecting isn't an undo step", owner: "hax-body", target: HaxBody.prototype, method: "undoManagerStackLogic", marker: "__dragMoving", file: "editor/undo.js" },
      (original) =>
        function (mutations) {
          if (!this.editMode || this.__dragMoving || !this.undoStack) return original.call(this, mutations);
          keepAnswers(this);
          if (unrecorded(this)) {
            // a step starts from what the undo position stands for. HAX
            // starts it from the content it last snapshotted, which Undo
            // doesn't update, and records nothing when the content is that
            // again: a section removed, put back with Undo and removed again
            // made no step, and Undo then took back the step before
            this.undoStackPrevValue = recordedRaw(this);
            return original.call(this, mutations);
          }
          // only what editing changes changed (attributes, white space
          // between blocks): the next step starts from here,
          // and until there is one, so does the way back (HAX's starting
          // copy is taken after it imports the page, which takes the
          // questions' answers out again, and before anything puts them back:
          // hax-body.js 4400–4411)
          this.undoStackPrevValue = this.innerHTML;
          if (this.undoStack.undoStackPosition === -1 && !this.undoStack.commands.length) this.undoStackInitialValue = this.innerHTML;
        },
    );
  });
  // capture, on the window: before the rail and HAX see the keys
  globalThis.addEventListener("keydown", undoKeys, true);
  globalThis.addEventListener("beforeinput", historyInput, true);
  globalThis.addEventListener("cs-upgraded", upgraded);
}
