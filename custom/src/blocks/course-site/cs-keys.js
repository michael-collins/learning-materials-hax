/**
 * Keys and pastes in the fields of the course site's sections and items
 * (nu-hax docs/editor-redesign/spec.md §5.3, §5.4): a section's heading, an
 * outcome's title and sentence, a tool, a question and its answer. Blocks
 * never import HAX or the editor: the editor hears every key in the content
 * (they all go to hax-body, docs/editor-spikes/structure.md S1) and asks
 * the section or item holding the caret's field (its oerFieldKey()), which
 * answers here. Structural changes (an item added or removed, one selected
 * as a whole) are asked of the editor with `oer-edit-request`, as the
 * blocks' buttons ask; the caret moves within the block's own fields here.
 *
 *   key                heading          title, tool, question   sentence         answer
 *   Enter              the first field  the next field          a new item       HAX (a new paragraph)
 *                      (or a first item) (made if missing)      after            ; on an empty last
 *                                                                                  one, a new question
 *   Shift+Enter        –                –                       a line break     a line break
 *   Mod+Enter          a new first item a new item after
 *   Backspace at start –                an empty item goes; else to the end of the field before
 *   Delete at the end  –
 *   Tab, Shift+Tab     the next or previous field on the page (in an answer's list, HAX indents);
 *                      from the last field (or back from the first), on out of the content
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
 * shortcut in a setTimeout after each key). Answers keep HAX's shortcuts.
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

// the fields in a block (or the page), in reading order: not a list or a
// quote holding fields of its own, and not one of a section folded away
function fieldsIn(root) {
  return [...root.querySelectorAll(FIELDS)].filter((el) => !el.querySelector(FIELDS) && el.getClientRects().length > 0);
}

// the field before (back) or after a field within root
function besideField(root, field, back) {
  const all = fieldsIn(root);
  const at = all.indexOf(field);
  return at < 0 ? null : all[at + (back ? -1 : 1)] || null;
}

// the page's content, where Tab goes on to the next field
const contentOf = (el) => el.closest("hax-body") || el.getRootNode();

// Tab on from the last field on the page (or back from the first): focus
// leaves the content for what follows it (or comes before it), as the
// browser's own Tab does from a stand-in just outside the content, which
// takes focus for the key and goes once focus moves on. (Outside the
// element whose shadow DOM holds the content, HAX's h-a-x: from beside the
// content in there, Tab came back to it.)
function leaveContent(field, back) {
  const content = field.closest("hax-body");
  if (!content) return;
  const outside = content.getRootNode().host || content;
  const mark = content.ownerDocument.createElement("span");
  mark.tabIndex = -1;
  outside[back ? "before" : "after"](mark);
  mark.addEventListener("blur", () => mark.remove(), { once: true });
  mark.focus({ preventScroll: true });
}

// ask the editor for a change to a unit (ops.js oer-edit-request)
const ask = (unit, action, detail = {}) => unit.dispatchEvent(new CustomEvent("oer-edit-request", { bubbles: true, composed: true, detail: { action, unit, ...detail } }));

/**
 * What a field is to its unit: "heading" (a section's own heading),
 * "title" (an item's one-line first field: an outcome's title, a tool, a
 * question), "sentence" (an outcome's sentence) or "answer"; null for
 * fields these keys leave to HAX (the hero's tagline, until its section
 * moves on to the section model).
 */
export function roleOf(unit, field) {
  const own = unit.constructor?.oerEditor || {};
  if (own.kind === "section") return field === unit.headingElement ? "heading" : null;
  if (own.kind !== "item") return null;
  // the item's field the caret's field is (a list item's list in an answer)
  let top = field;
  while (top.parentElement && top.parentElement !== unit) top = top.parentElement;
  if (top === unit.titleElement) return "title";
  return unit.constructor.textRole || "sentence";
}

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
  const done = () => {
    e.preventDefault();
    return true;
  };
  switch (e.key) {
    case "Enter":
      return enter(unit, e, field, role, range, mod, done);
    case "Backspace":
      if (!atEdge(range, field, true) || mod || e.altKey) return role !== "answer";
      return backspace(unit, field, role, done);
    case "Delete":
      if (!atEdge(range, field, false) || mod || e.altKey) return role !== "answer";
      // never joins the next field (or the next item) into this one
      if (role !== "answer" || field === fieldsIn(unit).at(-1)) return done();
      return false;
    case "Tab": {
      if (mod || e.altKey) return false;
      // a list's items in an answer indent (HAX)
      if (role === "answer" && field.localName === "li") return false;
      const next = besideField(contentOf(unit), field, e.shiftKey);
      if (next) {
        placeCaret(next, { atEnd: e.shiftKey });
        return done();
      }
      leaveContent(field, e.shiftKey);
      return true;
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
  return role !== "answer" && e.key.length === 1 && !mod;
}

function enter(unit, e, field, role, range, mod, done) {
  const section = ownSection(unit);
  if (e.shiftKey && !mod) {
    // a line break in a sentence or an answer (the browser's); none in one-line fields
    return role === "sentence" || role === "answer" ? true : done();
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
  if (field.localName === "p" && isEmpty(field) && field === unit.lastElementChild) {
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
  // a sentence, or the first block of an answer: on to the title's end
  const first = fieldsIn(unit)[1];
  if (role === "sentence" || field === first) {
    const before = besideField(unit, field, true);
    if (before) placeCaret(before, { atEnd: true });
    return done();
  }
  return false;
}

// this field's text selected, and no more
function selectField(field) {
  const sel = field.getRootNode().getSelection?.() || globalThis.document.getSelection();
  const range = globalThis.document.createRange();
  range.selectNodeContents(field);
  sel.removeAllRanges();
  sel.addRange(range);
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

