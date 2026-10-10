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
 *   end of its last) does nothing.
 * - Two text blocks side by side are joined here, not by the browser:
 *   Safari's engine (WebKit) copied the theme's own elements around the
 *   content (its shell, hax-body and all) into the page when the two were
 *   styled differently, and HAX then reloaded the saved page over the
 *   author's edits; from an empty paragraph that has no box it deleted
 *   past the section the paragraph was in. Chrome wrapped the joined text
 *   in spans copying its old style.
 * - Typing with the caret between blocks (straight in hax-body, a section
 *   or a list, where a stray Undo or arrow key can leave it) goes into the
 *   nearest text block instead: loose text there stopped HAX saving.
 * - Typing at the end of a citation's number goes after the citation, not
 *   into its superscript (Chrome and Safari keep the caret inside it).
 *
 *   body.addEventListener("beforeinput", guardInput);
 */
import { getEditRange, setEditRange } from "../ui/edit-selection.js";
import { SECTION_TAGS, isSection, sectionOf } from "../blocks/course-site/cs-shared.js";

// blocks of text that can be joined, and what makes one hold blocks instead
const JOINABLE = "p, h1, h2, h3, h4, h5, h6, pre, blockquote";
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

/* ---------- the page-break and sections ---------- */

const pageBreaks = (body) => [...body.querySelectorAll(":scope > page-break")];

/**
 * Whether a range takes in part of a course site's section and goes past
 * it: a section the range reaches has to hold both its ends.
 */
function crossesSection(body, range) {
  const sections = body.querySelectorAll(SECTION_TAGS.join(", "));
  return [...sections].some((s) => range.intersectsNode(s) && !(s.contains(range.startContainer) && s.contains(range.endContainer)));
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
 * goes past it does nothing (a cut, a drag, an input method or Safari's
 * Ctrl+K as well as keys): the section would go with it, and in Firefox
 * Select All then Backspace emptied the whole page.
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
 * of a section, the first after the page-break) nothing happens. Anything
 * else (lists, other blocks) is left to the browser and HAX.
 */
function joinAtCaret(e, body, at) {
  const block = elementAt(at.startContainer)?.closest(JOINABLE);
  if (!block || block === body || !body.contains(block) || !joinable(block)) return false;
  const backward = e.inputType.endsWith("Backward");
  if (!atEdge(block, at, backward)) return false;
  const next = backward ? block.previousElementSibling : block.nextElementSibling;
  const parent = block.parentElement;
  if (!next) return parent === body || sectionOf(block) === parent ? "refuse" : false;
  if (next.localName === "page-break") return "refuse";
  if (!joinable(next)) return false;
  return backward ? [next, join(next, block)] : [block, join(block, next)];
}

/**
 * Deleting (or typing over, or cutting) a selection from one text block
 * into another beside it, in the same place: what's selected goes, and
 * the two blocks' ends are joined here, as above. Not a selection that
 * Backspace wouldn't delete (see deletable).
 */
function joinAcross(e, body, at) {
  const first = elementAt(at.startContainer)?.closest(JOINABLE);
  const last = elementAt(at.endContainer)?.closest(JOINABLE);
  if (!first || !last || first === last || first.parentElement !== last.parentElement || !body.contains(first) || first === body) return false;
  if (!joinable(first) || !joinable(last) || !deletable(body, at)) return false;
  const range = at.cloneRange();
  range.deleteContents();
  return [first, last.isConnected ? join(first, last) : range];
}

const JOINS = /^(delete(Content|Word|SoftLine|HardLine)(Backward|Forward)|deleteByCut|insertText)$/;

function joinBlocks(e, body) {
  if (!JOINS.test(e.inputType)) return false;
  const at = getEditRange(body);
  if (!at || !body.contains(at.startContainer) || !body.contains(at.endContainer)) return false;
  if (at.collapsed && e.inputType.startsWith("insert")) return false;
  if (at.collapsed && e.inputType === "deleteByCut") return false;
  const done = at.collapsed ? joinAtCaret(e, body, at) : joinAcross(e, body, at);
  if (!done || done === "refuse") return done;
  const [kept, meet] = done;
  haxStore()?.activeHaxBody?.__focusLogic?.(kept, false);
  if (e.inputType === "insertText" && e.data) insertText(meet, e.data);
  else setEditRange(meet);
  return true;
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
  const textIn = (el) => (el.matches(TEXT_BLOCKS) ? el : el.querySelector(TEXT_BLOCKS));
  // the block HAX has just added or selected first (a new list, say), then the one after
  const active = haxStore()?.activeNode;
  const order = before && active && (before === active || before.contains(active)) ? [[before, false], [after, true]] : [[after, true], [before, false]];
  const range = globalThis.document.createRange();
  for (const [el, atStart] of order) {
    const text = el && textIn(el);
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
  if (joined) return refuse(e);
  if (keepSections(e, body)) return refuse(e);
  if (typeOutsideCitations(e, body) || typeInBlocks(e, body)) return refuse(e);
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
