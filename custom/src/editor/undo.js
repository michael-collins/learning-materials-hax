/**
 * Undo that follows the content, not the editor's bookkeeping (nu-hax
 * docs/editor-redesign/spec.md §6.2 #3 and #4, docs/editor-spikes/lifecycle.md).
 *
 * - Selecting isn't an undo step. HAX snapshots hax-body's HTML 300 ms after
 *   any change to it, and selecting a block changes attributes (data-hax-*,
 *   contenteditable, role, element-visible as blocks scroll in and out), so
 *   five clicks were five steps of nothing. Blocks change their own markup
 *   too, as they start and as Undo puts them back (grid-plate adds ready, a
 *   question takes its answer inputs out), which made entering edit mode
 *   a step and cost the Redo; normalizedHtml() leaves out what HAX never
 *   saves of them. A snapshot whose normalizedHtml() is that of the state
 *   the undo position stands for (the last step, or what Undo or Redo put
 *   back) is skipped, which also keeps Redo after a click (and after the
 *   blocks Undo put back redraw). Snapshots stay raw, so undoing still
 *   restores which block was active. hax-body/hax-body.js undoManagerStackLogic
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
 * - checkpoint(body, label) records the content as one step now, named for
 *   announcing ("moved Tools up"); ops.js puts one before and one after
 *   each change it makes. undo() and redo() send `oer-undo` from hax-body
 *   with { redo, label }.
 *
 *   installUndo()          // from installEditorChrome (editor/index.js)
 *   undo(); redo()         // the editing bar's buttons
 *   checkpoint(body, "moved Tools up")
 */
import { isMac } from "./stock.js";
import { onDefined, pinned } from "./hax-fixes.js";

const haxStore = () => globalThis.HaxStore?.requestAvailability?.() ?? null;
const activeBody = () => haxStore()?.activeHaxBody ?? null;

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

/**
 * HTML without what HAX changes while editing: data-hax-* attributes,
 * contenteditable, draggable, element-visible, role="textbox", hax-*
 * classes and the end cap a drag adds; and without what blocks change in
 * their own markup that HAX never saves: attributes their haxProperties
 * leave unsaved, and a question's answer inputs. What "changed" means for
 * undo and unsaved changes.
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

// the content the undo position stands for: the last step recorded, or
// what Undo or Redo put back (the step before's, or HAX's starting copy)
function recorded(body) {
  const stack = body.undoStack;
  const step = stack?.commands?.[stack.undoStackPosition];
  const raw = step ? step.newValue : stack?.undoStackPosition === -1 ? body.undoStackInitialValue : body.undoStackPrevValue;
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

function step(again) {
  const body = activeBody();
  if (!body?.undoStack || !body.editMode) return;
  checkpoint(body);
  const label = stepLabel(body, { redo: again });
  const stack = body.undoStack;
  const possible = again ? stack.canRedo() : stack.canUndo();
  if (again) body.redo();
  else body.undo();
  if (possible) body.dispatchEvent(new CustomEvent("oer-undo", { bubbles: true, composed: true, detail: { redo: again, label } }));
}

/** HAX's Undo, after recording any typing not yet in a step. */
export const undo = () => step(false);
/** HAX's Redo. */
export const redo = () => step(true);

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
          if (unrecorded(this)) return original.call(this, mutations);
          // only editing attributes changed: the next step starts from here,
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
}
