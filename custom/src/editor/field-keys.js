/**
 * Keys and pastes in the fields of sections and items, handed to the block
 * that holds the field (nu-hax docs/editor-redesign/spec.md §5.3, §5.4, as
 * docs/editor-spikes/structure.md S1 changed them). A key typed in the
 * content goes to hax-body, the element being edited, never to the section
 * or item the caret is in, so a block can't listen for its own keys: one
 * listener on hax-body, in the capture phase (before HAX's own, on the
 * window), finds the field the caret is in and asks the block holding it
 * (its oerFieldKey(), oerFieldKeyup() or oerFieldPaste(), for course sites
 * blocks/course-site/cs-keys.js). When the block says it handled the
 * event, HAX never hears it, nor do the editor's listeners after this one
 * (the deletion guard's, boundary-guard.js, which is installed after it).
 *
 * Keys outside such fields (an ordinary paragraph, a list) are left to HAX
 * and the guard, as are keys in a block's own controls (its shadow DOM).
 *
 *   installFieldKeys()   // from installEditorChrome (editor/index.js), before installBoundaryGuard()
 */
import { onEditEntry } from "./hax-fixes.js";
import { fieldOf } from "./policy.js";
import { getEditRange } from "../ui/edit-selection.js";

// the field the caret (or the selection's start) is in, for an event from
// the content (not from a block's own controls), and the block holding it
function target(e, body) {
  const origin = e.composedPath()[0];
  if (!body.editMode || !(origin === body || body.contains(origin))) return null;
  const node = getEditRange(body)?.startContainer;
  const field = node && body.contains(node) ? fieldOf(node) : null;
  if (!field) return null;
  for (let el = field.parentElement; el && el !== body; el = el.parentElement) {
    if (typeof el.oerFieldKey === "function") return { field, block: el };
  }
  return null;
}

const ASK = { keydown: "oerFieldKey", keyup: "oerFieldKeyup", paste: "oerFieldPaste" };

function onField(e) {
  const body = e.currentTarget;
  const at = target(e, body);
  if (!at || (e.type !== "paste" && e.isComposing)) return;
  if (at.block[ASK[e.type]]?.(e, at.field)) e.stopImmediatePropagation();
}

const listening = new WeakSet();
function listen(body) {
  if (listening.has(body)) return;
  listening.add(body);
  for (const type of Object.keys(ASK)) body.addEventListener(type, onField, true);
}

let installed = false;
export function installFieldKeys() {
  if (installed) return;
  installed = true;
  onEditEntry(listen);
}
