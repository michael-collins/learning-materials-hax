/**
 * Keys and pastes in the fields of the course site's sections and items
 * (nu-hax docs/editor-redesign/spec.md §5.3, §5.4): a section's heading and
 * its text (the hero's tagline, the instructor's note, the hub's intro), an
 * outcome's title and sentence, a tool, a question and its answer. Blocks
 * never import HAX or the editor: the editor hears every key in the content
 * (they all go to hax-body, docs/editor-spikes/structure.md S1) and asks
 * the section or item holding the caret's field (its oerFieldKey()), which
 * answers here. Structural changes (an item added or removed, one selected
 * as a whole) are asked of the editor with `oer-edit-request`, as the
 * blocks' buttons ask; the caret moves within the block's own fields here.
 *
 *   key                heading          title, tool, question   sentence         answer, text
 *   Enter              the first field  the next field          a new item       HAX (a new paragraph)
 *                      (or a first item) (made if missing)      after            ; on an empty last
 *                                                                                  answer, a new question
 *   Shift+Enter        –                –                       a line break     a line break
 *   Mod+Enter          a new first item a new item after
 *   Backspace at start –                an empty item goes; else to the end of the field before
 *                                                                                (text: HAX's, but at its
 *                                                                                first block's start, to
 *                                                                                the heading's end)
 *   Delete at the end  –                                                         (HAX's, but nothing at
 *                                                                                the last field's end)
 *   Tab, Shift+Tab     the next or previous field on the page, or control a section draws
 *                      (Change image, a callout's button, Add a tool: stopsIn); from the last
 *                      (or back from the first), on out of the content. In a list in an answer
 *                      or a section's text, Tab puts an item under the one before it and
 *                      Shift+Tab takes it back out, where there's one to go under or out of
 *   Mod+A              this field only
 *   Escape             selects the section, or the item
 *
 * Mod is ⌘ on a Mac (where Ctrl keeps its own meanings: Ctrl+A goes to the
 * line's start) and Ctrl elsewhere. In a section that holds no items (the
 * semester, the hub's intro), Enter and Mod+Enter add nothing.
 *
 * Every other key typed in a heading, title, tool or sentence is the
 * browser's to type and HAX never sees it: HAX's shortcuts ("/" for its
 * command palette, "- " for a list) don't run there, as a key stopped
 * after the one before it has gone through is too late (HAX checks a
 * shortcut in a setTimeout after each key). Answers and a section's text
 * (its blocks of text, as many as the author likes) keep HAX's shortcuts.
 *
 * Tab and Shift+Tab on those controls go on the same way (controlKeydown(),
 * which the section calls from its shadow root).
 *
 * Pastes: several lines in a title or a tool, or in an empty item, are one
 * item a line; anything else is the deletion guard's or HAX's to paste
 * (editor/boundary-guard.js pastes one line of plain text into one-line
 * fields).
 *
 * Each function returns true when it handled the event: the editor then
 * keeps it from HAX (and from its own listeners after this one). Whether the
 * browser's own action still happens is up to preventDefault() here.
 */

import { isEditorControl } from "../../ui/editor-control.js";

// a block's text fields, where a caret goes (editor/policy.js TEXT_FIELDS)
const FIELDS = "p,h1,h2,h3,h4,h5,h6,li,blockquote,pre,dt,dd,figcaption,td,th,summary";
const MEDIA = "img, video, audio, iframe";
// (cs-shared.js isEmpty, which imports this file)
const isEmpty = (el) => !el.textContent.trim() && !el.querySelector(MEDIA);
const MAC = /Mac|iPhone|iPad/.test(globalThis.navigator?.platform ?? "");

/** The selection where a node is, from its own (shadow) root: the content's own, as editing sees it. */
export function getEditRange(node) {
  const root = node.getRootNode();
  const sel = root.getSelection?.() || globalThis.document.getSelection();
  if (sel?.rangeCount && root.contains?.(sel.getRangeAt(0).startContainer)) return sel.getRangeAt(0);
  // (browsers whose shadow roots don't give their selection)
  const [composed] = globalThis.document.getSelection()?.getComposedRanges?.({ shadowRoots: root instanceof ShadowRoot ? [root] : [] }) || [];
  if (!composed) return null;
  const range = globalThis.document.createRange();
  range.setStart(composed.startContainer, composed.startOffset);
  range.setEnd(composed.endContainer, composed.endOffset);
  return range;
}

/** Put the caret at the start (or end) of a field, in the selection of the field's root. */
export function placeCaret(field, { atEnd = false } = {}) {
  const sel = field.getRootNode().getSelection?.() || globalThis.document.getSelection();
  const range = globalThis.document.createRange();
  range.selectNodeContents(field);
  range.collapse(!atEnd);
  sel.removeAllRanges();
  sel.addRange(range);
}

// whether a collapsed range is at the start (back) or end of a field: nothing
// but white space between, and no picture
function atEdge(range, field, back) {
  if (!range.collapsed) return false;
  const rest = globalThis.document.createRange();
  rest.selectNodeContents(field);
  if (back) rest.setEnd(range.startContainer, range.startOffset);
  else rest.setStart(range.endContainer, range.endOffset);
  return /^[ \t\n\r]*$/.test(rest.toString()) && !rest.cloneContents().querySelector(MEDIA);
}

// whether a field holding fields of its own has words of its own too (a
// list's item before its sub-list)
const ownWords = (el) => [...el.childNodes].some((n) => (n.nodeType === 3 ? !!n.data.trim() : n.nodeType === 1 && !/^(ul|ol)$/.test(n.localName) && !n.matches(FIELDS) && !n.querySelector(FIELDS) && !!n.textContent.trim()));

// the fields in a block (or the page), in reading order: not a list or a
// quote holding fields of its own (but a list's item with words before its
// sub-list), and not one of a section folded away
function fieldsIn(root) {
  return [...root.querySelectorAll(FIELDS)].filter((el) => (!el.querySelector(FIELDS) || ownWords(el)) && el.getClientRects().length > 0);
}

// the field before (back) or after a field within root
function besideField(root, field, back) {
  const all = fieldsIn(root);
  const at = all.indexOf(field);
  return at < 0 ? null : all[at + (back ? -1 : 1)] || null;
}

// the page's content (hax-body) a field, or a control a block draws in its
// shadow DOM, is in; or null
function contentOf(el) {
  for (let n = el; n; n = n.getRootNode().host) {
    const body = n.closest?.("hax-body");
    if (body) return body;
  }
  return null;
}

// what takes focus in a control a block draws: itself, or the controls in
// its own shadow DOM (the image field's)
const FOCUSABLE = "button, a[href], input:not([type=hidden]), select, textarea, [tabindex]";
const controlsIn = (control) => (control.shadowRoot ? [...control.shadowRoot.querySelectorAll(FOCUSABLE)] : control.matches(FOCUSABLE) ? [control] : []);

// a block's stops, in the order it draws them: its fields, and the
// controls in its shadow DOM, with the fields slotted among them
function stopsOf(block) {
  if (!block.shadowRoot) return [...(block.matches(FIELDS) && (!block.querySelector(FIELDS) || ownWords(block)) ? [block] : []), ...fieldsIn(block)];
  const out = [];
  const walk = (parent) => {
    for (const el of parent.children) {
      if (el.localName === "slot") for (const slotted of el.assignedElements()) out.push(...stopsOf(slotted));
      else if (isEditorControl(el)) out.push(...controlsIn(el));
      else walk(el);
    }
  };
  walk(block.shadowRoot);
  return out;
}

/**
 * Where Tab stops in the page's content (body), in the order it's drawn:
 * each field, and each control a section or item draws while editing
 * (editorControl(): Change image, a callout's button, Add a tool), those
 * the image field draws among them; what's drawn and not switched off.
 */
export const stopsIn = (body) =>
  [...body.children].flatMap(stopsOf).filter((el) => el.getClientRects().length > 0 && !el.disabled && el.getAttribute("tabindex") !== "-1" && el.getAttribute("aria-disabled") !== "true");

// Tab on from a field or a control (back: Shift+Tab) to the place after
// it among stops: the caret into a field, or focus on a control; from the
// last (or back from the first), out of the content. Returns whether it
// moved within the content.
function tabFrom(from, stops, body, back) {
  const at = stops.indexOf(from);
  const fields = stops.filter((s) => s.matches(FIELDS));
  const next =
    at >= 0
      ? stops[at + (back ? -1 : 1)]
      : // (a field that isn't a stop of its own: the nearest field after it, or before)
        back
        ? fields.findLast((s) => from.compareDocumentPosition(s) & Node.DOCUMENT_POSITION_PRECEDING)
        : fields.find((s) => from.compareDocumentPosition(s) & Node.DOCUMENT_POSITION_FOLLOWING);
  if (!next) {
    leaveContent(body, back);
    return false;
  }
  if (!next.matches(FIELDS)) {
    next.focus();
    return true;
  }
  if (body.getRootNode().activeElement !== body) body.focus({ preventScroll: true });
  placeCaret(next, { atEnd: back });
  return true;
}

// Tab on from the last place on the page (or back from the first): focus
// leaves the content for what follows it (or comes before it), as the
// browser's own Tab does from a stand-in just outside the content, which
// takes focus for the key and goes once focus moves on. (Outside the
// element whose shadow DOM holds the content, HAX's h-a-x: from beside the
// content in there, Tab came back to it.)
function leaveContent(content, back) {
  const outside = content.getRootNode().host || content;
  const mark = content.ownerDocument.createElement("span");
  mark.tabIndex = -1;
  outside[back ? "before" : "after"](mark);
  mark.addEventListener("blur", () => mark.remove(), { once: true });
  mark.focus({ preventScroll: true });
}

// ask the editor for a change to a unit (ops.js oer-edit-request)
const ask = (unit, action, detail = {}) => unit.dispatchEvent(new CustomEvent("oer-edit-request", { bubbles: true, composed: true, detail: { action, unit, ...detail } }));

// the block of a unit a field is in (a list item's list)
function topOf(unit, field) {
  let top = field;
  while (top.parentElement && top.parentElement !== unit) top = top.parentElement;
  return top;
}

/**
 * What a field is to its unit: "heading" (a section's own heading), "text"
 * (a section's text: the hero's tagline, the instructor's note), "title"
 * (an item's one-line first field: an outcome's title, a tool, a question),
 * "sentence" (an outcome's sentence) or "answer"; null for fields these
 * keys leave to HAX (a block the section doesn't take).
 */
export function roleOf(unit, field) {
  const own = unit.constructor?.oerEditor || {};
  if (own.kind === "section") {
    if (field === unit.headingElement) return "heading";
    return unit.sortChildren?.().text.includes(topOf(unit, field)) ? "text" : null;
  }
  if (own.kind !== "item") return null;
  if (topOf(unit, field) === unit.titleElement) return "title";
  return unit.constructor.textRole || "sentence";
}

// the fields of a section's text, in order
const textFields = (unit) => (unit.sortChildren?.().text ?? []).flatMap((block) => (block.matches(FIELDS) && !block.querySelector(FIELDS) ? [block] : fieldsIn(block)));

// the section a unit is in (itself, for a section), and whether it holds items
const ownSection = (unit) => (unit.constructor?.oerEditor?.kind === "item" ? unit.parentElement : unit);
const holdsItems = (section) => !!section?.itemTag;

/* ---------- keys ---------- */

/** keydown in one of a unit's fields; true when handled (see the top of this file). */
export function fieldKeydown(unit, e, field) {
  const role = roleOf(unit, field);
  if (!role || e.isComposing) return false;
  const range = getEditRange(field);
  if (!range) return false;
  const mod = MAC ? e.metaKey : e.ctrlKey;
  // blocks of text, as many as the author likes, which HAX types
  const rich = role === "answer" || role === "text";
  const done = () => {
    e.preventDefault();
    return true;
  };
  switch (e.key) {
    case "Enter":
      return enter(unit, e, field, role, range, mod, done);
    case "Backspace":
      if (!atEdge(range, field, true) || mod || e.altKey) return !rich;
      return backspace(unit, field, role, done);
    case "Delete":
      if (!atEdge(range, field, false) || mod || e.altKey) return !rich;
      // never joins the next field (or the next item) into this one
      if (!rich || field === (role === "text" ? textFields(unit) : fieldsIn(unit)).at(-1)) return done();
      return false;
    case "Tab": {
      if (mod || e.altKey) return false;
      // a list's item in an answer or a section's text goes under the one
      // before it, or back out (never HAX's, which wraps it in a list of
      // its own each time, and never ends)
      if (rich && field.localName === "li" && (e.shiftKey ? outdent(field, range) : indent(field, range))) return done();
      const body = contentOf(field);
      if (!body) return false;
      return tabFrom(field, stopsIn(body), body, e.shiftKey) ? done() : true;
    }
    case "Escape":
      ask(unit, "select");
      return done();
    case "a":
    case "A":
      if (!mod || e.altKey || e.shiftKey) break;
      selectField(field);
      return done();
    default:
      break;
  }
  // a key typed in a plain field: the browser types it, HAX never sees it
  return !rich && e.key.length === 1 && !mod;
}

function enter(unit, e, field, role, range, mod, done) {
  const section = ownSection(unit);
  if (e.shiftKey && !mod) {
    // a line break in a sentence, an answer or text (the browser's); none in one-line fields
    return ["sentence", "answer", "text"].includes(role) ? true : done();
  }
  if (mod) {
    if (holdsItems(section)) ask(role === "heading" ? section : unit, "add-item");
    return done();
  }
  if (role === "heading") {
    const next = besideField(section, field, false);
    if (next) placeCaret(next);
    else if (holdsItems(section)) ask(section, "add-item");
    return done();
  }
  if (role === "title") {
    let next = besideField(unit, field, false);
    if (!next && unit.constructor.textTag) {
      // an outcome without its sentence (or a question without an answer): made
      next = unit.ownerDocument.createElement(unit.constructor.textTag);
      unit.append(next);
    }
    if (next) placeCaret(next);
    else ask(unit, "add-item");
    return done();
  }
  if (role === "sentence") {
    ask(unit, "add-item");
    return done();
  }
  // an answer: an empty last paragraph ends it, and a new question follows
  // (a section's text: HAX's new paragraph)
  if (role === "answer" && field.localName === "p" && isEmpty(field) && field === unit.lastElementChild) {
    field.remove();
    ask(unit, "add-item");
    return done();
  }
  return false;
}

function backspace(unit, field, role, done) {
  const section = ownSection(unit);
  // never deletes the heading, or the section
  if (role === "heading") return done();
  if (role === "title") {
    if ([...unit.children].every(isEmpty)) {
      ask(unit, "remove", { ask: false, caret: "before" });
      return done();
    }
    const before = besideField(section, field, true);
    if (before) placeCaret(before, { atEnd: true });
    return done();
  }
  // a section's text: HAX's, except at its first field's start, which goes
  // on to the heading's end (or nowhere)
  if (role === "text") {
    if (field !== textFields(unit)[0]) return false;
    const before = besideField(unit, field, true);
    if (before && before === unit.headingElement) placeCaret(before, { atEnd: true });
    return done();
  }
  // a sentence, or the first block of an answer: on to the title's end
  const first = fieldsIn(unit)[1];
  if (role === "sentence" || field === first) {
    const before = besideField(unit, field, true);
    if (before) placeCaret(before, { atEnd: true });
    return done();
  }
  return false;
}

/* ---------- a list's items, in and out ---------- */

// put the caret (a range) back where it was once its nodes have moved
function keepRange(range, move) {
  const { startContainer, startOffset, endContainer, endOffset } = range;
  move();
  const sel = startContainer.getRootNode().getSelection?.() || globalThis.document.getSelection();
  const back = globalThis.document.createRange();
  back.setStart(startContainer, startOffset);
  back.setEnd(endContainer, endOffset);
  sel.removeAllRanges();
  sel.addRange(back);
}

// a list item under the one before it, in that one's own sub-list (made, of
// its list's kind, if it has none); false for the first, which has none
function indent(li, range) {
  const before = li.previousElementSibling;
  if (before?.localName !== "li") return false;
  keepRange(range, () => {
    let sub = before.lastElementChild;
    if (sub?.localName !== li.parentElement.localName) {
      sub = li.ownerDocument.createElement(li.parentElement.localName);
      before.append(sub);
    }
    sub.append(li);
  });
  return true;
}

// a list item in a sub-list back out, after the item that holds it, with
// the items after it in the sub-list under it now; false at the top level
function outdent(li, range) {
  const list = li.parentElement;
  const holder = list?.parentElement;
  if (holder?.localName !== "li") return false;
  keepRange(range, () => {
    const after = [...list.children].slice([...list.children].indexOf(li) + 1);
    if (after.length) {
      const sub = li.ownerDocument.createElement(list.localName);
      sub.append(...after);
      li.append(sub);
    }
    holder.after(li);
    if (!list.children.length) list.remove();
  });
  return true;
}

// this field's text selected, and no more
function selectField(field) {
  const sel = field.getRootNode().getSelection?.() || globalThis.document.getSelection();
  const range = globalThis.document.createRange();
  range.selectNodeContents(field);
  sel.removeAllRanges();
  sel.addRange(range);
}

/**
 * keydown on a control a section (or an item in it) draws while editing,
 * heard on the section's shadow root before the control (which keeps its
 * keys from HAX): Tab and Shift+Tab go on to the next place in the
 * content, as from a field. true when handled.
 */
export function controlKeydown(section, e) {
  if (e.key !== "Tab" || e.ctrlKey || e.metaKey || e.altKey || e.isComposing || !section._editing) return false;
  const from = e.composedPath()[0];
  const body = contentOf(section);
  const stops = body ? stopsIn(body) : [];
  if (!stops.includes(from)) return false;
  if (tabFrom(from, stops, body, e.shiftKey)) e.preventDefault();
  e.stopPropagation();
  return true;
}

/** keyup in a unit's field: ↑ and ↓ are kept from HAX, whose double ↑ (or ↓) adds a paragraph outside the sections. */
export function fieldKeyup(unit, e) {
  return e.key === "ArrowUp" || e.key === "ArrowDown";
}

/* ---------- pastes ---------- */

/** A paste in one of a unit's fields; true when handled. */
export function fieldPaste(unit, e, field) {
  const role = roleOf(unit, field);
  if (role !== "title" && role !== "sentence") return false;
  const lines = (e.clipboardData?.getData("text/plain") || "")
    .split(/\r?\n/)
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  if (lines.length < 2 || (role === "sentence" && ![...unit.children].every(isEmpty))) return false;
  e.preventDefault();
  ask(unit, "paste-items", { lines });
  return true;
}

