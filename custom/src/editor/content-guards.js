/**
 * Guards on what the browser does to the page's content (hax-body) as an
 * author types, deletes, cuts or pastes, judged on its beforeinput event,
 * which every way of editing goes through: keys (Backspace, Delete, the
 * Mac's Ctrl+H, Ctrl+D and Ctrl+K, Option+Backspace), Cut, dragging text
 * out, an input method, the Edit menu. Installed by hax-fixes.js when
 * hax-body starts editing.
 *
 * - The page-break (HAX's record of the page's title and details, the
 *   first block) stays: nothing deletes or types over a selection that
 *   reaches it.
 * - A course site's sections stay whole: nothing deletes or types over a
 *   selection that takes in part of a section and goes past it, and
 *   Backspace at the start of a section's first block (or Delete at the
 *   end of its last) does nothing. The same goes for the other blocks
 *   drawn by an element of their own (a quiz question, columns): nothing
 *   reaches into one from outside, and Backspace or Delete next to one
 *   leaves it alone.
 * - Two text blocks side by side are joined here, not by the browser:
 *   Safari's engine (WebKit) copied the theme's own elements around the
 *   content (its shell, hax-body and all) into the page when the two were
 *   styled differently, and HAX then reloaded the saved page over the
 *   author's edits; from an empty paragraph that has no box it deleted
 *   past the section the paragraph was in. Chrome wrapped the joined text
 *   in spans copying its old style. That's Backspace and Delete at a
 *   block's edge, and anything that deletes or types over a selection
 *   from one block into another: typing, Enter and Shift+Enter, Cut, a
 *   drag, an input method (guardComposition). A word deletion the browser
 *   would run on into the next block (past a picture) stops at the
 *   block's edge.
 * - Typing with the caret between blocks (straight in hax-body, a section
 *   or a list, where a stray Undo or arrow key can leave it) goes into the
 *   nearest text block instead: loose text there stopped HAX saving.
 * - Typing at the end of a citation's number goes after the citation, not
 *   into its superscript (Chrome and Safari keep the caret inside it).
 *
 *   body.addEventListener("beforeinput", guardInput);
 *   body.addEventListener("compositionstart", guardComposition);
 */
import { getEditRange, setEditRange } from "../ui/edit-selection.js";
import { isSection, sectionOf } from "../blocks/course-site/cs-shared.js";

// blocks of text that can be joined (not code: its white space shows, and
// the browsers join a code block one line at a time), and what makes one
// hold blocks instead
const JOINABLE = "p, h1, h2, h3, h4, h5, h6, blockquote";
const HOLDS_BLOCKS = /^(p|div|h[1-6]|ul|ol|li|pre|blockquote|table|figure|hr|section|article|aside|header|footer|nav|details|dl)$/;
// what a block of text can be when typing finds the nearest one
const TEXT_BLOCKS = "p, h1, h2, h3, h4, h5, h6, li, pre, blockquote";
// what counts as content when looking for a block's start or end
const SOLID = "img, video, iframe, svg, object, embed, input, hr";

const haxStore = () => globalThis.HaxStore?.requestAvailability?.();

/** A block of text that can be joined with another: one that holds no blocks. */
function joinable(el) {
  return !!el?.matches?.(JOINABLE) && ![...el.children].some((c) => HOLDS_BLOCKS.test(c.localName));
}

/** The element a boundary point is in (the node itself if it's an element). */
const elementAt = (node) => (node?.nodeType === 1 ? node : node?.parentElement);

/** A live Range copy of a Range or StaticRange, or null if it can't be made. */
function liveRange(r) {
  try {
    const range = globalThis.document.createRange();
    range.setStart(r.startContainer, r.startOffset);
    range.setEnd(r.endContainer, r.endOffset);
    return range;
  } catch {
    return null;
  }
}

/** What the input would change: the browser's target ranges and the selection, where not collapsed. */
function reach(e, body) {
  const ranges = (e.getTargetRanges?.() || []).map(liveRange);
  const sel = getEditRange(body);
  if (sel && !sel.collapsed) ranges.push(sel);
  return ranges.filter((r) => r && !r.collapsed);
}

function refuse(e) {
  e.preventDefault();
  e.stopImmediatePropagation();
}

/* ---------- the page-break, sections and blocks ---------- */

const pageBreaks = (body) => [...body.querySelectorAll(":scope > page-break")];

/** A block drawn by an element of its own (a quiz question, columns, a video, a section). */
const isBlock = (el) => !!el?.localName?.includes("-");
/** Where in its block a text block is shown (a column, a question's answer). */
const slotOf = (el) => el.getAttribute("slot") || "";

/**
 * Whether a range takes in part of a course site's section and goes past
 * it (a section the range reaches has to hold both its ends), or has one
 * end inside another block of its own and the other outside it (a quiz
 * question, columns): what's left would lose the block's structure.
 */
function crossesSection(body, range) {
  for (const el of body.querySelectorAll("*")) {
    if (!isBlock(el) || el.localName === "page-break" || !range.intersectsNode(el)) continue;
    const ends = Number(el.contains(range.startContainer)) + Number(el.contains(range.endContainer));
    if (isSection(el) ? ends < 2 : ends === 1) return true;
  }
  return false;
}

/** Whether a selection can be deleted (by Backspace, or before a paste over it). */
export function deletable(body, range) {
  return !pageBreaks(body).some((b) => range.intersectsNode(b)) && !crossesSection(body, range);
}

/**
 * Deleting, or typing over, a selection that reaches the page-break does
 * nothing: in Firefox, Select All then Backspace emptied the page,
 * page-break and all, and Backspace at the start of the first block
 * deleted from inside the page-break. Judged on the browser's target
 * ranges and on the selection itself (Chrome's and Safari's ranges for
 * Select All leave the page-break out, Firefox's take it in).
 */
function keepPageBreak(e, body) {
  const breaks = pageBreaks(body);
  if (!breaks.length) return false;
  if (reach(e, body).some((r) => breaks.some((b) => r.intersectsNode(b)))) return true;
  // a deletion from the very start of the first block reaches back into it
  const ranges = e.getTargetRanges?.() || [];
  return /^delete/.test(e.inputType) && ranges.some((r) => breaks.some((b) => b.contains(r.startContainer) || b.contains(r.endContainer)));
}

/**
 * Deleting or typing over a selection that takes in part of a section and
 * goes past it, or reaches into a block from outside it, does nothing (a
 * cut, a drag, an input method or Safari's Ctrl+K as well as keys): the
 * section would go with it, a quiz question lost its question or answers,
 * and in Firefox Select All then Backspace emptied the whole page.
 */
function keepSections(e, body) {
  return reach(e, body).some((r) => crossesSection(body, r));
}

/* ---------- joining blocks ---------- */

/**
 * Whether nothing an author would see lies between the caret and the
 * block's start (backward) or its end: only white space, and at the end
 * the line break Firefox keeps there.
 */
function atEdge(block, at, backward) {
  const rest = globalThis.document.createRange();
  rest.selectNodeContents(block);
  if (backward) rest.setEnd(at.startContainer, at.startOffset);
  else rest.setStart(at.endContainer, at.endOffset);
  if (!/^[ \t\n\r]*$/.test(rest.toString())) return false;
  const between = rest.cloneContents();
  if (between.querySelector(SOLID)) return false;
  const breaks = between.querySelectorAll("br").length;
  return !breaks || (!backward && breaks === 1 && block.lastChild?.nodeName === "BR");
}

/** Whether a block holds nothing but white space and placeholder line breaks. */
const empty = (el) => !el.textContent.trim() && !el.querySelector(`${SOLID}, br + br`);

/**
 * Put second's content at the end of first and remove second, as the
 * browser would; returns where the two meet, for the caret.
 */
function join(first, second) {
  // a placeholder line break goes when there's text to follow it
  if (first.lastChild?.nodeName === "BR" && !empty(second)) first.lastChild.remove();
  const meet = globalThis.document.createRange();
  const last = first.lastChild;
  if (last?.nodeType === 3) meet.setStart(last, last.length);
  else meet.setStart(first, first.childNodes.length);
  meet.collapse(true);
  if (!empty(second) || !first.firstChild) {
    const moved = [...second.childNodes].filter((n) => !(n.nodeName === "BR" && empty(second)));
    first.append(...moved);
  }
  second.remove();
  return meet;
}

/**
 * Backspace at the very start of a text block, or Delete at the very end
 * of one (and the deletions by word or line, and the Mac's Ctrl+H, Ctrl+D
 * and Ctrl+K there): joined with the text block next to it here. Where
 * there's no block next to it in the same place (the first or last block
 * of a section, of a quiz question or a column, the first after the
 * page-break), or what's next to it is a block of its own (a quiz
 * question, columns, a video) or a text block shown elsewhere (the next
 * column, a question's answer), nothing happens: the browsers moved the
 * text into the question's markup, where it wasn't shown, deleted whole
 * questions, or moved a column's text into the one beside it. (An empty
 * paragraph of the page's own there goes: see dropEmpty.) Anything else
 * (lists, code, other blocks) is left to the browser and HAX.
 */
function joinAtCaret(e, body, at) {
  const block = elementAt(at.startContainer)?.closest(JOINABLE);
  if (!block || block === body || !body.contains(block) || !joinable(block)) return false;
  const backward = e.inputType.endsWith("Backward");
  if (!atEdge(block, at, backward)) return false;
  const next = backward ? block.previousElementSibling : block.nextElementSibling;
  const parent = block.parentElement;
  if (!next) return parent === body || sectionOf(block) === parent || isBlock(parent) ? "refuse" : false;
  if (next.localName === "page-break") return "refuse";
  if (isBlock(next) || slotOf(next) !== slotOf(block)) return parent === body && empty(block) ? dropEmpty(block, backward) : "refuse";
  if (!joinable(next)) return false;
  return backward ? [next, join(next, block)] : [block, join(block, next)];
}

/**
 * An empty paragraph of the page's own beside a block of its own (after a
 * video, say): Backspace or Delete there removes the paragraph, and the
 * caret goes to the nearest text before it (Backspace) or after it
 * (Delete), past the block. Nothing happens when there's no text to go to.
 */
function dropEmpty(block, backward) {
  // a text block, or the first or last text in a list or quote
  const textOf = (el, last) => (el.matches(TEXT_BLOCKS) ? el : el.matches("ul, ol, blockquote") ? (last ? [...el.querySelectorAll(TEXT_BLOCKS)].pop() : el.querySelector(TEXT_BLOCKS)) : null);
  const find = (back) => {
    for (let n = back ? block.previousElementSibling : block.nextElementSibling; n; n = back ? n.previousElementSibling : n.nextElementSibling) {
      if (n.localName === "page-break") return null;
      const text = textOf(n, back);
      if (text) return text;
    }
    return null;
  };
  let to = find(backward);
  let atEnd = backward;
  if (!to) {
    to = find(!backward);
    atEnd = !backward;
  }
  if (!to) return "refuse";
  block.remove();
  const meet = globalThis.document.createRange();
  meet.selectNodeContents(to);
  meet.collapse(!atEnd);
  return [to, meet];
}

/**
 * Deleting (or typing over, or cutting) a range from one text block into
 * another beside it, in the same place: what's selected goes, and the two
 * blocks' ends are joined here, as above. Each block's part and the blocks
 * between are deleted separately: one Range.deleteContents() across a
 * block with a shadow root of its own (columns, a video, slides, a table)
 * crashed Safari's engine (WebKit 18.4, Range::processContents), losing
 * every unsaved edit. Not a range that Backspace wouldn't delete (see
 * deletable), nor one between blocks shown in different places.
 */
function joinAcross(body, at) {
  const first = elementAt(at.startContainer)?.closest(JOINABLE);
  const last = elementAt(at.endContainer)?.closest(JOINABLE);
  if (!first || !last || first === last || first.parentElement !== last.parentElement || !body.contains(first) || first === body) return false;
  if (!joinable(first) || !joinable(last) || !deletable(body, at)) return false;
  if (slotOf(first) !== slotOf(last)) return "refuse";
  const tail = globalThis.document.createRange();
  tail.setStart(at.startContainer, at.startOffset);
  tail.setEnd(first, first.childNodes.length);
  const head = globalThis.document.createRange();
  head.setStart(last, 0);
  head.setEnd(at.endContainer, at.endOffset);
  for (let n = first.nextSibling; n && n !== last; ) {
    const next = n.nextSibling;
    n.remove();
    n = next;
  }
  head.deleteContents();
  tail.deleteContents();
  return [first, join(first, last)];
}

/**
 * A browser's own range for a deletion, when it runs from one text block
 * into another.
 */
function targetAcross(e, body) {
  for (const r of (e.getTargetRanges?.() || []).map(liveRange)) {
    if (!r || r.collapsed || !body.contains(r.startContainer) || !body.contains(r.endContainer)) continue;
    const a = elementAt(r.startContainer)?.closest(JOINABLE);
    const b = elementAt(r.endContainer)?.closest(JOINABLE);
    if (a !== b) return r;
  }
  return null;
}

/**
 * A word or line deletion at a collapsed caret that the browser would run
 * on into the block before or after (Safari's engine, Option+Backspace
 * after a picture or a quotation mark at a paragraph's start: it took the
 * blocks between, a picture's paragraph, and copied the theme into the
 * page): only what's between the caret and its own block's edge goes, as
 * in Chrome. (At the edge itself, joinAtCaret has joined the blocks.)
 */
function deleteToEdge(e, body, at) {
  const block = elementAt(at.startContainer)?.closest(JOINABLE);
  if (!block || block === body || !body.contains(block) || !targetAcross(e, body)) return false;
  const part = globalThis.document.createRange();
  part.selectNodeContents(block);
  if (e.inputType.endsWith("Backward")) part.setEnd(at.startContainer, at.startOffset);
  else part.setStart(at.endContainer, at.endOffset);
  if (part.collapsed) return false;
  part.deleteContents();
  return [block, part];
}

/**
 * Delete a selection the way Backspace would here: joined across text
 * blocks (see joinAcross), or else by the browser. Returns the caret's
 * block when it's done, "refuse" when it can't be deleted, false when
 * nothing was selected. For a paste over a selection (hax-fixes.js).
 */
export function deleteSelection(body, range) {
  if (range.collapsed) return false;
  if (!deletable(body, range)) return "refuse";
  const done = joinAcross(body, range);
  if (done === "refuse") return done;
  if (done) {
    setEditRange(done[1]);
    return done[0];
  }
  setEditRange(range);
  globalThis.document.execCommand("delete");
  return caretInBlock(body) || true;
}

// what the guard does itself over a range from one text block into another
// (the rest, a list, a link or a drop say, is left to the browser)
const ACROSS = /^(delete.*|insertText|insertReplacementText|insertFromYank|insertParagraph|insertLineBreak)$/;

function joinBlocks(e, body) {
  const type = e.inputType;
  if (!ACROSS.test(type)) return false;
  const at = getEditRange(body);
  if (!at || !body.contains(at.startContainer) || !body.contains(at.endContainer)) return false;
  let done = false;
  if (!at.collapsed && type !== "deleteByDrag") done = joinAcross(body, at);
  else if (at.collapsed && /^delete(Content|Word|SoftLine|HardLine)(Backward|Forward)$/.test(type)) {
    done = joinAtCaret(e, body, at) || deleteToEdge(e, body, at);
  } else if (type === "deleteByDrag") {
    const across = targetAcross(e, body);
    if (across) done = joinAcross(body, across);
  }
  if (!done || done === "refuse") return done;
  const [kept, meet] = done;
  haxStore()?.activeHaxBody?.__focusLogic?.(kept, false);
  const text = /^insert(Text|ReplacementText|FromYank)$/.test(type) ? (e.data ?? e.dataTransfer?.getData("text/plain") ?? "") : "";
  if (text) insertText(meet, text);
  else setEditRange(meet);
  // Enter: the joined block split there, as HAX splits it (Shift+Enter: a line break)
  if (type === "insertParagraph" && /^(p|h[1-6])$/.test(kept.localName)) body.__splitTextBlockAtSelection?.(kept);
  if (type === "insertLineBreak") lineBreak(meet);
  return true;
}

/** A line break at a collapsed range, and the caret after it. */
function lineBreak(range) {
  const br = globalThis.document.createElement("br");
  range.insertNode(br);
  // one at the very end of a block shows no new line without another after it
  let next = br.nextSibling;
  while (next?.nodeType === 3 && !next.data) next = next.nextSibling;
  if (!next) br.after(globalThis.document.createElement("br"));
  const caret = globalThis.document.createRange();
  caret.setStartAfter(br);
  setEditRange(caret);
}

/**
 * An input method starting over a selection from one text block into
 * another (its text can't be refused, insertCompositionText): the
 * selection is deleted here first, as Backspace would; over one Backspace
 * wouldn't delete, the composition starts at the selection's start
 * instead.
 */
export function guardComposition(e) {
  const body = e.currentTarget;
  if (!body.editMode) return;
  const at = getEditRange(body);
  if (!at || at.collapsed || !body.contains(at.startContainer) || !body.contains(at.endContainer)) return;
  if (!deletable(body, at)) {
    at.collapse(true);
    setEditRange(at);
    return;
  }
  const done = joinAcross(body, at);
  if (!Array.isArray(done)) return;
  body.__oerEdited = true;
  haxStore()?.activeHaxBody?.__focusLogic?.(done[0], false);
  setEditRange(done[1]);
}

/* ---------- typing between blocks ---------- */

/**
 * Where typing should go when the caret is between blocks (in hax-body
 * itself, a section, or a list): the text block just after it, or else
 * the one just before (never before the page-break), or a new paragraph
 * there. Returns a collapsed Range, or null when the caret is in a block.
 */
function intoBlock(at, body) {
  const node = at.startContainer;
  // the element the caret is straight in (a text node's parent)
  const holder = node.nodeType === 3 ? node.parentElement : node;
  if (!(holder === body || (body.contains(holder) && (/^(ul|ol)$/.test(holder.localName) || isSection(holder))))) return null;
  const kids = [...holder.childNodes];
  const index = node === holder ? at.startOffset : kids.indexOf(node) + 1;
  let after = kids.slice(index).find((n) => n.nodeType === 1) || null;
  const before = kids.slice(0, index).reverse().find((n) => n.nodeType === 1 && n.localName !== "page-break");
  // never before the page-break
  if (after?.localName === "page-break") after = after.nextElementSibling;
  // the first text block in the one after, the last in the one before
  const textIn = (el, first) => (el.matches(TEXT_BLOCKS) ? el : first ? el.querySelector(TEXT_BLOCKS) : [...el.querySelectorAll(TEXT_BLOCKS)].pop());
  // the block HAX has just added or selected first (a new list, say), then the one after
  const active = haxStore()?.activeNode;
  const order = before && active && (before === active || before.contains(active)) ? [[before, false], [after, true]] : [[after, true], [before, false]];
  const range = globalThis.document.createRange();
  for (const [el, atStart] of order) {
    const text = el && textIn(el, atStart);
    if (!text) continue;
    range.selectNodeContents(text);
    range.collapse(atStart);
    return range;
  }
  // nothing to type into: a new paragraph (a list item in a list)
  const p = globalThis.document.createElement(/^(ul|ol)$/.test(holder.localName) ? "li" : "p");
  if (after) after.before(p);
  else holder.append(p);
  range.setStart(p, 0);
  return range;
}

/** The caret's text block, for HAX's active block. */
const blockAt = (range) => elementAt(range.startContainer)?.closest(TEXT_BLOCKS);

/**
 * The text block the caret is in, after moving it into the nearest one
 * when it's between blocks (see intoBlock); null when there's no caret
 * in the content.
 */
export function caretInBlock(body) {
  const at = getEditRange(body);
  if (!at || !body.contains(at.startContainer)) return null;
  const moved = at.collapsed ? intoBlock(at, body) : null;
  if (moved) setEditRange(moved);
  const block = blockAt(moved || at);
  return block && block !== body && body.contains(block) ? block : null;
}

/**
 * Typing with the caret between blocks: the text goes into the nearest
 * text block (see intoBlock), where HAX can save it. The caret was left
 * there by HAX's Undo (hax-body.js undo 4237), an arrow key from an empty
 * box (Firefox), a new list from the block list, or a section left with
 * no block; the text became loose in hax-body, a section or a list, and
 * HAX's haxToContent (hax-body.js 2712–2780) threw on it, so Save and
 * Cancel stopped working.
 */
function typeInBlocks(e, body) {
  if (e.inputType !== "insertText" || !e.data) return false;
  const at = getEditRange(body);
  if (!at?.collapsed || !body.contains(at.startContainer)) return false;
  const range = intoBlock(at, body);
  if (!range) return false;
  insertText(range, e.data);
  const block = blockAt(range);
  if (block) haxStore()?.activeHaxBody?.__focusLogic?.(block, false);
  return true;
}

/** Put text at a collapsed range and the caret after it. */
function insertText(range, data) {
  let node = range.startContainer;
  let offset = range.startOffset;
  if (node.nodeType === 3) node.insertData(offset, data);
  else {
    const text = globalThis.document.createTextNode(data);
    const before = node.childNodes[offset] || null;
    // a placeholder line break goes once there's text
    if (before?.nodeName === "BR" && !node.textContent.trim()) before.replaceWith(text);
    else node.insertBefore(text, before);
    node = text;
    offset = 0;
  }
  const caret = globalThis.document.createRange();
  caret.setStart(node, offset + data.length);
  setEditRange(caret);
}

/* ---------- citations ---------- */

/**
 * Typing at the end of a citation's number (sup.fn-ref, citations.js)
 * goes after the citation: Chrome and Safari keep the caret inside the
 * superscript even when it's put after it, so the author's next words
 * were saved as part of the citation. Typed at its start, they go before it.
 */
function typeOutsideCitations(e, body) {
  if (e.inputType !== "insertText" || !e.data) return false;
  const at = getEditRange(body);
  if (!at?.collapsed) return false;
  // in the citation, or just after it (where Safari still types into it)
  const node = at.startContainer;
  const before = node.nodeType === 1 ? node.childNodes[at.startOffset - 1] : at.startOffset === 0 ? node.previousSibling : null;
  const sup = elementAt(node)?.closest("sup.fn-ref") || (before?.matches?.("sup.fn-ref") ? before : null);
  if (!sup || !body.contains(sup)) return false;
  const end = !sup.contains(node) || atEdge(sup, at, false);
  if (!end && !atEdge(sup, at, true)) return false;
  const range = globalThis.document.createRange();
  const beside = end ? sup.nextSibling : sup.previousSibling;
  if (beside?.nodeType === 3) range.setStart(beside, end ? 0 : beside.length);
  else if (end) range.setStartAfter(sup);
  else range.setStartBefore(sup);
  insertText(range, e.data);
  return true;
}

/* ---------- all together ---------- */

/**
 * hax-body's beforeinput, while editing: refused, done here, or left to
 * the browser, in that order of guards.
 */
export function guardInput(e) {
  const body = e.currentTarget;
  if (!body.editMode || e.defaultPrevented || !/^(delete|insert)/.test(e.inputType) || !body.contains(e.composedPath()[0])) return;
  if (keepPageBreak(e, body)) return refuse(e);
  const joined = joinBlocks(e, body);
  // (what's done here is a change for HAX's undo too: hax-fixes.js recordTyping)
  if (joined === true) body.__oerEdited = true;
  if (joined) return refuse(e);
  if (keepSections(e, body)) return refuse(e);
  if (typeOutsideCitations(e, body) || typeInBlocks(e, body)) {
    body.__oerEdited = true;
    return refuse(e);
  }
}

/**
 * Text left straight in hax-body (by a path the guards above don't see)
 * goes into a paragraph of its own, after the page-break, and white space
 * between blocks goes: HAX's haxToContent throws on any text there
 * (hax-body.js 2738, a text node has no querySelector).
 */
export function wrapLooseText(body) {
  const pageBreak = body.querySelector(":scope > page-break");
  for (const node of [...body.childNodes]) {
    if (node.nodeType !== 3) continue;
    if (!node.data.trim()) {
      node.remove();
      continue;
    }
    const p = globalThis.document.createElement("p");
    if (pageBreak && pageBreak.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_PRECEDING) pageBreak.after(p);
    else node.before(p);
    p.append(node);
  }
}
