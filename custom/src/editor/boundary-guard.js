/**
 * The deletion guard: typing never takes a section, an item or a column
 * apart (nu-hax docs/editor-redesign/spec.md §6.2 #2, with the rules
 * docs/editor-spikes/lifecycle.md added). The browser edits hax-body itself,
 * and at a block's edge it joins, splits and removes blocks: Backspace at
 * the start of a question merged it into the paragraph before, a selection
 * across two sections took the sections between with it, and Backspace in
 * the hub's empty intro emptied the whole page.
 *
 * Listeners on hax-body, added when editing starts, in the capture phase:
 * - beforeinput: a deletion, split, paste, drop or typing is cancelled when
 *   its target range crosses a boundary (policy.js boundaryOf: a section,
 *   an item or another block, a column), takes in a section, an item or the
 *   page-break, or reaches into or out of a one-line field; so is a deletion
 *   with nothing to delete inside a section (Chrome then removes the field
 *   and what's around it), and typing into a section outside its fields.
 *   Two paragraphs of an ordinary page still join as before.
 * - compositionstart: an input method's text can't be cancelled, so a
 *   selection the guard would refuse is collapsed before composing over it.
 * - paste: HAX's own paste handler deletes the selection and places blocks
 *   itself, with no beforeinput to refuse. A refused selection is collapsed
 *   first, and in a section's one-line fields a paste is plain text on one
 *   line (two paragraphs pasted into a Tools row replaced the hero).
 * - keydown, the backup: Backspace at the start of a field, or Delete at
 *   its end, does nothing where the field it would join is across a
 *   boundary or one line, or there's none (as when Chrome gives no target
 *   range). This also keeps HAX's own Backspace handling out.
 * Inputs in a block's own controls (its shadow DOM) are the block's. Each
 * refusal sends `oer-edit-refused` from hax-body with { inputType, reason }.
 *
 *   installBoundaryGuard()   // from installEditorChrome (editor/index.js)
 */
import { onEditEntry } from "./hax-fixes.js";
import { policyOf, fieldOf, boundaryOf, sameBoundary, isContained, isSingleLine, fieldPolicy, elementOf, TEXT_FIELDS } from "./policy.js";

// what removes or rearranges content when it reaches across a boundary
const STRUCTURAL = /^(delete|insertParagraph|insertLineBreak|insertFromPaste|insertFromDrop|insertReplacementText|insertText|insertFromYank|insertTranspose|formatBlock)/;
const MEDIA = "img, video, audio, iframe";

const isBody = (el) => el?.localName === "hax-body";
const selectionOf = (body) => body.getRootNode().getSelection?.() || globalThis.document.getSelection();
// typed in the content, not in a block's own (shadow) controls
function fromContent(e, body) {
  const origin = e.composedPath()[0];
  return origin === body || body.contains(origin);
}
function refused(body, inputType, reason) {
  body.dispatchEvent(new CustomEvent("oer-edit-refused", { bubbles: true, composed: true, detail: { inputType, reason } }));
}

/* ---------- what a range may not do ---------- */

// what no edit may take in whole: sections, items and the page-break
const kept = (el) => ["section", "item", "break"].includes(policyOf(el).kind);

/** Whether a range takes in a section, an item or the page-break among a boundary's blocks. */
function takesInUnit(range, { host, slot }) {
  // target ranges are StaticRanges, which can't be asked
  const live = globalThis.document.createRange();
  live.setStart(range.startContainer, range.startOffset);
  live.setEnd(range.endContainer, range.endOffset);
  const blocks = [...host.children].filter((c) => slot === null || (c.getAttribute("slot") || "") === slot);
  return blocks.some((el) => kept(el) && live.intersectsNode(el));
}

/** Why an input over this range must not happen natively, or "". */
function refusal(range, inputType, body) {
  const { startContainer: a, endContainer: b } = range;
  if (range.collapsed) {
    // a deletion with nothing to delete takes blocks apart: in an empty
    // field Chrome removes the field, and with it what's around it
    if (/^delete/.test(inputType)) return isBody(elementOf(a)) || isContained(boundaryOf(a)) ? "deletes a block's edge" : "";
    if (/^insert/.test(inputType) && !isBody(elementOf(a)) && isContained(boundaryOf(a)) && !fieldOf(a)) return "types outside the fields";
    return "";
  }
  if (isBody(elementOf(a)) || isBody(elementOf(b))) return "reaches whole blocks";
  const boundary = boundaryOf(a);
  if (!sameBoundary(boundary, boundaryOf(b))) return "crosses a section, item or column";
  if (takesInUnit(range, boundary)) return "takes in a section";
  const fa = fieldOf(a);
  const fb = fieldOf(b);
  if (fa !== fb && ((fa && isSingleLine(fa)) || (fb && isSingleLine(fb)) || (isContained(boundary) && (!fa || !fb)))) return "crosses a one-line field";
  return "";
}

/* ---------- Backspace and Delete at a field's edge ---------- */

// whether the caret is at the start (back) or end of a field: nothing but
// white space between, and no image
function atEdge(range, field, back) {
  const rest = globalThis.document.createRange();
  rest.selectNodeContents(field);
  if (back) rest.setEnd(range.startContainer, range.startOffset);
  else rest.setStart(range.endContainer, range.endOffset);
  return /^[ \t\n\r]*$/.test(rest.toString()) && !rest.cloneContents().querySelector(MEDIA);
}

// the field before (back) or after a field in hax-body, in reading order
function nextField(field, back, body) {
  const walk = globalThis.document.createTreeWalker(body, NodeFilter.SHOW_ELEMENT);
  walk.currentNode = field;
  for (let el = back ? walk.previousNode() : walk.nextNode(); el; el = back ? walk.previousNode() : walk.nextNode()) {
    if (el.matches(TEXT_FIELDS) && !el.contains(field) && !field.contains(el)) return el;
  }
  return null;
}

/**
 * Whether Backspace (back) or Delete at a collapsed caret would join its
 * field to one across a boundary or a one-line field, take in a section on
 * the way, or (with no field to join) take a block apart.
 */
function joinsAcross(range, back, body) {
  const node = range.startContainer;
  if (isBody(elementOf(node))) {
    // between blocks: the one before (or after) would go whole
    const next = body.childNodes[back ? range.startOffset - 1 : range.startOffset];
    return next?.nodeType === 1 && kept(next);
  }
  const field = fieldOf(node);
  const boundary = boundaryOf(node);
  if (!field) return isContained(boundary);
  if (!atEdge(range, field, back)) return false;
  const other = nextField(field, back, body);
  if (!other) return true;
  if (!sameBoundary(boundary, boundaryOf(other)) || isSingleLine(field) || isSingleLine(other)) return true;
  // the blocks between them, if any, go too
  const between = globalThis.document.createRange();
  between.setStart(back ? other : field, back ? other.childNodes.length : field.childNodes.length);
  between.setEnd(back ? field : other, 0);
  return takesInUnit(between, boundary);
}

/* ---------- the listeners ---------- */

function onBeforeInput(e) {
  const body = e.currentTarget;
  if (!body.editMode || !STRUCTURAL.test(e.inputType) || !fromContent(e, body)) return;
  const ranges = e.getTargetRanges();
  let reason = "";
  for (const range of ranges) reason ||= refusal(range, e.inputType, body);
  if (!ranges.length) {
    // no target range given: judge by the selection
    const sel = selectionOf(body);
    const range = sel?.rangeCount ? sel.getRangeAt(0) : null;
    if (range && body.contains(range.startContainer)) {
      reason = refusal(range, e.inputType, body);
      if (!reason && range.collapsed && /^delete/.test(e.inputType) && joinsAcross(range, /Backward/.test(e.inputType), body)) reason = "joins across a boundary";
    }
  }
  if (!reason) return;
  e.preventDefault();
  refused(body, e.inputType, reason);
}

// before an input method replaces a selection it would refuse
function onCompositionStart(e) {
  const body = e.currentTarget;
  if (!body.editMode || !fromContent(e, body)) return;
  const sel = selectionOf(body);
  if (!sel?.rangeCount || sel.isCollapsed) return;
  const reason = refusal(sel.getRangeAt(0), "insertCompositionText", body);
  if (!reason) return;
  sel.collapseToStart();
  refused(body, "insertCompositionText", reason);
}

// before HAX's paste handler (on the window), which edits the DOM itself
function onPaste(e) {
  const body = e.currentTarget;
  if (!body.editMode || !fromContent(e, body)) return;
  const sel = selectionOf(body);
  if (!sel?.rangeCount || !body.contains(sel.getRangeAt(0).startContainer)) return;
  if (!sel.isCollapsed) {
    const reason = refusal(sel.getRangeAt(0), "insertFromPaste", body);
    if (reason) {
      sel.collapseToStart();
      refused(body, "insertFromPaste", reason);
    }
  }
  const at = sel.getRangeAt(0).startContainer;
  const field = fieldOf(at);
  if (!field) {
    // in a section but outside its fields: HAX would add a paragraph there
    if (!isBody(elementOf(at)) && isContained(boundaryOf(at))) {
      e.preventDefault();
      e.stopImmediatePropagation();
      refused(body, "insertFromPaste", "types outside the fields");
    }
    return;
  }
  if (fieldPolicy(field)?.paste !== "line") return;
  const text = (e.clipboardData?.getData("text/plain") || "").replace(/\s*\n\s*/g, " ").trim();
  e.preventDefault();
  e.stopImmediatePropagation();
  if (text) globalThis.document.execCommand("insertText", false, text);
}

function onKeyDown(e) {
  const body = e.currentTarget;
  if (!body.editMode || (e.key !== "Backspace" && e.key !== "Delete") || !fromContent(e, body)) return;
  const sel = selectionOf(body);
  if (!sel?.rangeCount || !sel.isCollapsed) return;
  const range = sel.getRangeAt(0);
  if (!body.contains(range.startContainer) || !joinsAcross(range, e.key === "Backspace", body)) return;
  e.preventDefault();
  e.stopPropagation();
  refused(body, e.key, "joins across a boundary");
}

const guarded = new WeakSet();
function guard(body) {
  if (guarded.has(body)) return;
  guarded.add(body);
  body.addEventListener("beforeinput", onBeforeInput, true);
  body.addEventListener("compositionstart", onCompositionStart, true);
  body.addEventListener("paste", onPaste, true);
  body.addEventListener("keydown", onKeyDown, true);
}

let installed = false;
export function installBoundaryGuard() {
  if (installed) return;
  installed = true;
  onEditEntry(guard);
}
