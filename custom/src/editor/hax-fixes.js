/**
 * Fixes to HAX's editor, made from the theme: HAX's own files are never
 * edited. Each patches a method of HAX 26.8.1 once its element is defined,
 * and names the lines of HAX's source it relies on (paths under
 * @haxtheweb/), so it can be checked when HAX is updated and offered
 * upstream.
 *
 * - Keys outside the content: hax-body acts on keys pressed anywhere in the
 *   window, at the last caret in the content (Enter on our toolbar split a
 *   paragraph). It now ignores keys from outside itself.
 *   hax-body/hax-body.js _onKeyDown 1407–1432, _onKeyUp 1310; bound on
 *   entering edit mode (4456), so patching the prototype before then is
 *   enough.
 * - Undo and Redo keys run HAX's undo, never the browser's (see undoKeys).
 * - The settings form took focus each time a block became active.
 *   hax-body/lib/hax-tray.js #settingsform 993; simple-fields/lib/simple-fields-lite.js 583.
 * - A source view left open (Edit HTML, then selecting another block) kept
 *   hax-body's viewSourceToggle on, which switches off Duplicate, Remove and
 *   Insert for every block. It ends when the selection moves.
 *   hax-body.js hax-source-view-toggle 3797–3891, _activeNodeChanged 6282;
 *   hax-body/lib/hax-plate-context.js 362–410.
 * - Double- and triple-click select a word or a paragraph again: HAX's
 *   mousedown handling made the block active anew and put the caret back.
 *   A triple click selects just the paragraph's text.
 *   hax-body.js _mouseDown 936, __focusLogic 4064–4201.
 * - Links in the content don't leave the page mid-edit (losing the edit);
 *   Mod+click opens them in a new tab. The router skips a click whose
 *   default is prevented: haxcms-elements/lib/core/hax-router.js 43.
 * - Leaving the editor asks our question (stock.js cancelEdit), also from
 *   its keyboard shortcut. haxcms-elements/lib/core/haxcms-site-editor-ui.js
 *   _cancelButtonTap 6707, shortcut 5551; and its "nothing changed" copy is
 *   taken once the page has arrived (stock.js watchBaseline).
 * - HAX finds the caret in Safari's engine too (see contentSelection), and
 *   never makes something outside the content its active block.
 * - After HAX's Undo or Redo the caret is back where it was (see
 *   keepCaretThroughUndo), and HAX can always save (see saveLooseText).
 * - What the browser does to the content as an author types, deletes or
 *   cuts is guarded in content-guards.js (the page-break, a course site's
 *   sections, joining blocks); a paste lands once and where it was pasted
 *   (see takePastes).
 * - After Enter, letters typed straight away stay in order (see
 *   quietSplit).
 *
 *   installHaxFixes()   // from installEditorChrome (editor/index.js)
 */
import { sanitizeHTMLString } from "@haxtheweb/utils/utils.js";
import { cancelEdit, isMac, watchBaseline } from "./stock.js";
import { editSelection, getEditRange, setEditRange } from "../ui/edit-selection.js";
import { guardInput, deletable, caretInBlock, wrapLooseText } from "./content-guards.js";

function onDefined(tag, fn) {
  const cls = customElements.get(tag);
  if (cls) fn(cls);
  else customElements.whenDefined(tag).then(() => fn(customElements.get(tag)));
}

/**
 * Wrap a method once, if its source still holds every marker given (the
 * code the patch makes up for, as HAX 26.8.1 has it, minified or not);
 * otherwise leave it as it is and say so in the console.
 */
function pinned(target, name, markers, wrap) {
  const original = target?.[name];
  if (original?.__oerPinned) return;
  if (typeof original !== "function" || ![markers].flat().every((m) => String(original).includes(m))) {
    console.warn(`hax-fixes: ${name} isn't HAX 26.8.1's; left alone`);
    return;
  }
  const wrapped = wrap(original);
  wrapped.__oerPinned = true;
  target[name] = wrapped;
}

const haxStore = () => globalThis.HaxStore?.requestAvailability?.();

// a double or triple click on the text being edited: the browser's word
// selection stands, and a triple click selects the paragraph clicked
function keepClickSelection(e) {
  const hax = haxStore();
  const active = hax?.activeNode;
  const path = e.composedPath();
  if (e.detail < 2 || !e.currentTarget.editMode || !active || !hax.isTextElement(active) || !path.includes(active)) return;
  e.stopPropagation();
  if (e.detail < 3) return;
  // Chrome's paragraph selection runs on to the start of the next block
  // (typing over it pulls that block in), and in a section's typing box it
  // holds no text at all: once it's made, it becomes the paragraph's text
  const block = path.slice(0, path.indexOf(active) + 1).find((n) => n.nodeType === 1 && !getComputedStyle(n).display.startsWith("inline"));
  setTimeout(() => {
    if (!block?.isConnected) return;
    const range = globalThis.document.createRange();
    range.selectNodeContents(block);
    setEditRange(range);
  });
}

// a link in the content (typed, or drawn by a block) stays put while editing
function holdLinks(e) {
  const body = e.currentTarget;
  if (!body.editMode) return;
  const path = e.composedPath();
  const link = path.slice(0, path.indexOf(body)).find((el) => el.localName === "a" && el.hasAttribute("href"));
  if (!link) return;
  e.preventDefault();
  if (isMac ? e.metaKey : e.ctrlKey) globalThis.open(link.href, "_blank", "noopener");
}

/* ---------- Undo and Redo ---------- */

// focus as the person sees it, inside shadow roots
function deepActive() {
  let el = globalThis.document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el;
}

// whether el is inside an open dialog, across shadow roots
function inDialog(el) {
  for (let n = el; n; n = n.parentElement || n.getRootNode().host) if (n.localName === "dialog" && n.open) return true;
  return false;
}

/**
 * ⌘Z and ⌘⇧Z on a Mac, Ctrl+Z, Ctrl+Shift+Z and Ctrl+Y elsewhere (and HAX's
 * own Ctrl+Z and Ctrl+Shift+Z on a Mac too) run HAX's undo and redo, never
 * the browser's: Firefox and Safari ran their own undo on ⌘Z, which HAX
 * doesn't track, so a later Undo put the text back. HAX's own key handling
 * takes only Ctrl, and only while it sees a caret (hax-body.js _onKeyDown
 * 1430–1451). Taken from the content and the editor's own controls (the
 * toolbar's Undo says ⌘Z), but not in a field with an undo of its own (a
 * section's heading, a form field) or a dialog.
 */
function undoKeys(e) {
  const body = haxStore()?.activeHaxBody;
  if (!body?.editMode || e.defaultPrevented || e.altKey) return;
  const key = e.key?.toLowerCase();
  const mod = (isMac && e.metaKey && !e.ctrlKey) || (e.ctrlKey && !e.metaKey);
  const undo = mod && key === "z" && !e.shiftKey;
  const redo = (mod && key === "z" && e.shiftKey) || (!isMac && e.ctrlKey && !e.metaKey && key === "y" && !e.shiftKey);
  if ((!undo && !redo) || ownUndo(body)) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  if (redo) body.redo();
  else body.undo();
}

// whether focus is somewhere with an undo of its own: a field outside the
// content (a section's heading, a form field), or a dialog
function ownUndo(body) {
  const focus = deepActive();
  const field = focus?.matches?.("input, textarea, select") || (focus?.isContentEditable && !body.contains(focus));
  return !!(field || inDialog(focus) || globalThis.SimpleModal?.instance?.opened);
}

/**
 * The browser's own Undo and Redo in the content (its Edit menu): HAX's
 * instead, once a command (Safari asks again for each step it would undo
 * when one is refused). From a field with an undo of its own, Safari's
 * undo reaches into the content as well (one undo stack for the page):
 * that part is refused, and HAX's isn't run.
 */
function historyInput(e) {
  const body = e.currentTarget;
  if (!body.editMode || !/^history(Undo|Redo)$/.test(e.inputType) || !body.contains(e.composedPath()[0])) return;
  e.preventDefault();
  if (body.__oerHistory || ownUndo(body)) return;
  body.__oerHistory = true;
  setTimeout(() => (body.__oerHistory = false));
  if (e.inputType === "historyRedo") body.redo();
  else body.undo();
}

const TEXT_BLOCKS = "p, h1, h2, h3, h4, h5, h6, li, blockquote, pre";

/**
 * Where the caret is as a block's place in hax-body and how far into that
 * block's text, and whether the content has focus: what can be found again
 * once HAX's undo has put back a copy of the whole content.
 */
function caretPlace(body) {
  const at = getEditRange(body);
  if (!at || !body.contains(at.startContainer)) return null;
  let top = at.startContainer;
  if (top === body) top = body.childNodes[at.startOffset] || body.lastChild;
  while (top && top.parentNode !== body) top = top.parentNode;
  const index = [...body.children].indexOf(top);
  if (index < 0) return null;
  const before = globalThis.document.createRange();
  before.setStart(top, 0);
  if (top.contains(at.startContainer)) before.setEnd(at.startContainer, at.startOffset);
  const focus = deepActive();
  return { index, offset: before.toString().length, text: top.textContent, focused: focus === body || body.contains(focus) };
}

/**
 * The caret back at a place from caretPlace, in the block now there: at
 * the end of what the undo changed in its text, as the browser's own undo
 * leaves it, or where it was when its text is the same.
 */
function putCaret(body, place) {
  const blocks = [...body.children];
  let top = blocks[Math.min(place.index, blocks.length - 1)];
  if (top?.localName === "page-break") top = top.nextElementSibling;
  if (!top) return;
  const range = globalThis.document.createRange();
  const walker = globalThis.document.createTreeWalker(top, NodeFilter.SHOW_TEXT);
  const was = place.text;
  const now = top.textContent;
  let left = place.offset;
  if (now !== was) {
    let same = 0;
    while (same < now.length && same < was.length && now[same] === was[same]) same++;
    let end = 0;
    while (end < now.length - same && end < was.length - same && now[now.length - 1 - end] === was[was.length - 1 - end]) end++;
    left = now.length - end;
  }
  let last = null;
  let found = null;
  for (let t = walker.nextNode(); t && !found; t = walker.nextNode()) {
    last = t;
    if (left <= t.length) found = t;
    else left -= t.length;
  }
  if (found) range.setStart(found, left);
  else if (last) range.setStart(last, last.length);
  else {
    const text = top.matches(TEXT_BLOCKS) ? top : top.querySelector(TEXT_BLOCKS);
    if (!text) return;
    range.setStart(text, 0);
  }
  range.collapse(true);
  const block = (range.startContainer.nodeType === 1 ? range.startContainer : range.startContainer.parentElement).closest(TEXT_BLOCKS) || top;
  body.__focusLogic(block, false);
  if (!place.focused) return;
  body.focus({ preventScroll: true });
  setEditRange(range);
}

/**
 * HAX's Undo and Redo put back a copy of the whole content (innerHTML,
 * undo-manager.js), then make whatever was the active block in that copy
 * the active block again, with the caret at its start (hax-body.js undo
 * and redo 4237–4260). The caret was left between blocks or nowhere, HAX's
 * active block could be a picture or a removed paragraph, and the content
 * stopped taking typing (Firefox and Safari put typed text loose in
 * hax-body, where HAX couldn't save it). Once HAX is done, the caret goes
 * back to the same place in the block now in its place, which is also
 * HAX's active block; the content gets focus back if it had it.
 */
function keepCaretThroughUndo(original) {
  return function (...args) {
    const place = caretPlace(this);
    const result = original.apply(this, args);
    // after HAX's own timeout, and the one that starts for the caret
    setTimeout(() =>
      setTimeout(() => {
        if (!this.editMode) return;
        if (place) putCaret(this, place);
        else if (!haxStore()?.activeNode?.isConnected) {
          const first = this.querySelector(`:scope > :not(page-break)`);
          if (first) this.__focusLogic(first, false);
        }
      }),
    );
    return result;
  };
}

/**
 * Text left straight in hax-body goes into a paragraph before HAX reads
 * the content to save it, or to compare it on Cancel: HAX's haxToContent
 * threw on it (hax-body.js 2738), so Save closed the editor without
 * saving and Cancel did nothing. (content-guards.js keeps typing out of
 * there; this is for any other way in.)
 */
function saveLooseText(original) {
  return function (...args) {
    wrapLooseText(this);
    return original.apply(this, args);
  };
}

/**
 * Enter splits a paragraph and HAX puts the caret in the new one at once
 * (hax-body.js __splitTextBlockAtSelection 2142–2198), then again at its
 * start a moment later (__focusLogic's timeout, 4170–4196), after any
 * letters typed straight away: "Next" came out "extN" in Chrome. The
 * second placing is skipped.
 */
function quietSplit(original) {
  return function (...args) {
    this.__oerSplitting = true;
    try {
      return original.apply(this, args);
    } finally {
      this.__oerSplitting = false;
    }
  };
}

/* ---------- the caret in Safari ---------- */

/**
 * HAX reads the caret with HAXStore.getSelection() and getRange()
 * (hax-body/lib/hax-store.js 97–124): the selection of the content's shadow
 * root where there is one (Chrome), else the document's, which holds the
 * nodes inside shadow roots in Firefox but in Safari's engine (WebKit)
 * stops at the outermost shadow host, haxcms-site-builder, at offset 0.
 * hax-body's arrow-key, Backspace and Delete handlers (hax-body.js
 * _onKeyDown 1696–1790, 1861–1900) and its paste (hax-store.js _onPaste)
 * then took that host for the caret's block: the caret left the content,
 * HAX made the host its active block, and the editor re-imported the saved
 * page over unsaved edits. HAX also places the caret with addRange (in
 * __focusLogic 4170–4176), which WebKit ignores inside shadow roots.
 *
 * There (no getSelection on shadow roots, and a document selection that
 * doesn't reach into them, though getComposedRanges does), HAX gets a
 * stand-in for the document's selection: where the caret is in the
 * content, its nodes come from the composed range (ui/edit-selection.js),
 * and where it isn't, it holds no range; addRange places the caret with
 * setBaseAndExtent. Chrome gets HAX's own, and so does Firefox while the
 * caret is in the content, where its document selection holds the nodes
 * themselves (Firefox 142 and later have getComposedRanges too, so that
 * alone doesn't tell the engines apart).
 */
function standIn(body) {
  const root = body?.getRootNode();
  const sel = editSelection(body);
  if (!root || root.getSelection || !sel?.getComposedRanges) return false;
  return !(sel.rangeCount && sel.getRangeAt(0).startContainer.getRootNode() === root);
}

function contentSelection(store, sel) {
  const body = store.activeHaxBody;
  if (!sel || !standIn(body)) return sel;
  const range = getEditRange(body);
  const backward = !!range && sel.direction === "backward";
  const [anchor, focus] = backward ? ["end", "start"] : ["start", "end"];
  const own = range
    ? {
        anchorNode: range[`${anchor}Container`],
        anchorOffset: range[`${anchor}Offset`],
        focusNode: range[`${focus}Container`],
        focusOffset: range[`${focus}Offset`],
        rangeCount: 1,
        isCollapsed: range.collapsed,
        type: range.collapsed ? "Caret" : "Range",
        getRangeAt: () => range,
        toString: () => range.toString(),
      }
    : {
        anchorNode: null,
        anchorOffset: 0,
        focusNode: null,
        focusOffset: 0,
        rangeCount: 0,
        isCollapsed: true,
        type: "None",
        getRangeAt: () => {
          throw new DOMException("The selection is outside the content", "IndexSizeError");
        },
        toString: () => "",
      };
  own.addRange = (r) => setEditRange(r);
  return new Proxy(sel, {
    get: (target, key) => (Object.hasOwn(own, key) ? own[key] : typeof target[key] === "function" ? target[key].bind(target) : target[key]),
  });
}

function pinSelection(HaxStore) {
  const proto = HaxStore.prototype;
  pinned(proto, "getSelection", ["activeHaxBody.getRootNode()", ".getSelection()", "globalThis.getSelection()"], (original) =>
    function () {
      return contentSelection(this, original.call(this));
    },
  );
  pinned(proto, "getRange", ["this.getSelection()", "rangeCount", "getRangeAt(0)"], (original) =>
    function () {
      // Safari's engine: the composed range in the content, if it's there
      const range = standIn(this.activeHaxBody) ? getEditRange(this.activeHaxBody) : null;
      return range || original.call(this);
    },
  );
}

/* ---------- pastes ---------- */

/**
 * HAX takes a paste itself (HTML, Markdown, a link, text it reads as
 * blocks), but cancels the browser's own paste only after an await
 * (hax-store.js _onPaste 2072–2808: htmlToHaxElements at 2333,
 * preventDefault at 2587 and before), too late in Firefox, where both
 * landed: a paragraph got the pasted text twice. When HAX will look at a
 * paste into the content (its own test, 2073–2083), the browser's is
 * cancelled at once. If HAX then leaves it to the browser (a table, plain
 * text), or takes it but puts nothing in (its loop over the pasted blocks
 * throws when it removes an empty one, 2600–2609, caught at 2803: a table
 * copied with the block around it), it goes in as the browser would have
 * put it, HTML cleaned as HAX cleans imported HTML; but not when HAX
 * offers to make a link of it instead (2421–2480, 2503–2556).
 * HAX's window listener is the bound copy it makes on connecting
 * (utils/utils.js winEventsElement 1863–1872), so it's replaced in place.
 *
 * Over a selection: HAX splits the paragraph there, which deletes the
 * selection (2683–2690), and puts its blocks after the selection's common
 * ancestor; with whole blocks selected (Select All, a triple click) that
 * was hax-body or a removed block, so it deleted the page-break, put the
 * blocks in backwards, or never finished (Firefox froze). The selection is
 * deleted first, as Backspace would delete it, and nothing is pasted over
 * one that Backspace wouldn't delete (one reaching the page-break, or past
 * a section). A link pasted over words still makes them a link.
 *
 * Pasted blocks with the caret inside a paragraph: HAX splits the
 * paragraph, then puts the first block in place of the block before the
 * one its range ends in (haxReplaceNode, 2711–2716). That's the empty half
 * when the caret was at the paragraph's start; from its middle it was the
 * paragraph's first half in Chrome and Safari, and in Firefox the block
 * before the paragraph (the page-break, say), all lost. The first block
 * goes in between the two halves instead (see splitPaste).
 */
function takePastes(store) {
  if (store._onPaste?.__oerPinned) return;
  const source = String(Object.getPrototypeOf(store)._onPaste);
  if (!["htmlToHaxElements", "insertParagraph", "previousElementSibling", "haxReplaceNode"].every((m) => source.includes(m))) {
    console.warn("hax-fixes: _onPaste isn't HAX 26.8.1's; left alone");
    return;
  }
  const original = store._onPaste;
  const paste = async (e) => {
    const body = store.activeHaxBody;
    // into the content (not a field a block draws), as HAX will look at it
    const into = e instanceof Event && e.cancelable && !e.defaultPrevented && !!body?.contains(e.composedPath()[0]);
    const active = globalThis.document.activeElement?.tagName;
    const looks = into && store.editMode && !["HAX-TRAY", "BODY", "SIMPLE-MODAL", "SUPER-DAEMON"].includes(active) && store.activeNode && store.activeNode.tagName !== "EDITABLE-TABLE";
    const html = looks ? e.clipboardData?.getData("text/html") || "" : "";
    const text = looks ? e.clipboardData?.getData("text/plain") || "" : "";
    // files and pictures alone: HAX's own, cancelled at once already
    if (!html && !text) return original(e);
    e.preventDefault();
    const link = /^\s*(<meta[^>]*>\s*)*<a\s[^>]*>[^<]*<\/a>\s*$/i.test(html) || /^\s*https?:\/\/\S+\s*$/i.test(text);
    const over = getEditRange(body);
    let emptied = null;
    if (over && !over.collapsed && !link) {
      if (!deletable(body, over)) return;
      globalThis.document.execCommand("delete");
      // the block the caret is left in (Safari can leave it between
      // blocks) is the one HAX pastes at; left empty, it goes once the
      // pasted blocks are in after it (HAX puts them after a paragraph
      // holding an empty text, as Safari leaves it)
      const block = caretInBlock(body);
      if (block) body.__focusLogic(block, false);
      if (block && !block.textContent.trim()) emptied = block;
    }
    // HAX cancels the paste when it takes it
    let taken = false;
    e.preventDefault = () => (taken = true);
    const split = (ev) => {
      if (ev.inputType === "insertParagraph") body.__oerPasteSplit = true;
    };
    body.addEventListener("input", split);
    let changed = false;
    const watch = new MutationObserver(() => (changed = true));
    watch.observe(body, { childList: true, subtree: true, characterData: true });
    body.__oerPasting = true;
    try {
      return await original(e);
    } finally {
      changed ||= watch.takeRecords().length > 0;
      watch.disconnect();
      body.removeEventListener("input", split);
      body.__oerPasteSplit = false;
      body.__oerPasting = false;
      if (!taken || (!changed && !link)) {
        if (html) globalThis.document.execCommand("insertHTML", false, cleanPaste(html));
        else globalThis.document.execCommand("insertText", false, text);
      }
      if (emptied?.isConnected && !emptied.textContent.trim() && !emptied.querySelector("img, video, iframe") && emptied.nextElementSibling && changed) {
        emptied.remove();
        // HAX's active block, where its caret goes once the blocks are in
        setTimeout(() => {
          const block = caretInBlock(body);
          if (block) body.__focusLogic(block, false);
        });
      }
    }
  };
  paste.__oerPinned = true;
  globalThis.removeEventListener("paste", original);
  store._onPaste = paste;
  globalThis.addEventListener("paste", paste);
}

/**
 * Pasted HTML that HAX leaves to the browser, cleaned as HAX cleans
 * imported HTML, without the clipboard's wrappers (a div around what was
 * copied, the page's meta and styles) or ids.
 */
function cleanPaste(html) {
  const t = globalThis.document.createElement("template");
  t.innerHTML = sanitizeHTMLString(html);
  for (const el of t.content.querySelectorAll("meta, style, script, link, title")) el.remove();
  for (const div of t.content.querySelectorAll("div")) div.replaceWith(...div.childNodes);
  for (const el of t.content.querySelectorAll("[id]")) el.removeAttribute("id");
  return t.innerHTML;
}

/**
 * hax-body's haxReplaceNode as HAX's paste calls it right after splitting
 * a paragraph (takePastes): the first pasted block takes the place of the
 * empty half the split left before the caret, or goes in just before the
 * half the caret went into. And during a paste, a block HAX would put in
 * place of nothing (no block, one already removed, one outside the
 * content) or of the page-break goes after the caret's block: it stayed
 * in HAX's holder, and HAX's loop over the pasted blocks never ended.
 * Otherwise it's HAX's own.
 */
function splitPaste(original) {
  return function (node, replacement) {
    const at = this.__oerPasting ? getEditRange(this) : null;
    const start = at && (at.startContainer.nodeType === 1 ? at.startContainer : at.startContainer.parentElement);
    const block = start?.closest(TEXT_BLOCKS);
    const caretBlock = block && block !== this && this.contains(block) ? block : null;
    if (this.__oerPasteSplit) {
      this.__oerPasteSplit = false;
      if (caretBlock) {
        const first = caretBlock.previousElementSibling;
        const empty = first?.matches(TEXT_BLOCKS) && !first.textContent.trim() && !first.querySelector("img, video, iframe");
        if (empty) node = first;
        else {
          node = globalThis.document.createElement(replacement.localName || "p");
          caretBlock.before(node);
        }
      }
    }
    if (this.__oerPasting && !(node?.isConnected && node !== this && this.contains(node) && node.localName !== "page-break")) {
      const after = caretBlock || (haxStore()?.activeNode?.isConnected && this.contains(haxStore().activeNode) ? haxStore().activeNode : null);
      node = globalThis.document.createElement(replacement.localName || "p");
      if (after) after.after(node);
      else this.append(node);
    }
    return original.call(this, node, replacement);
  };
}

let installed = false;
export function installHaxFixes() {
  if (installed) return;
  installed = true;

  // before hax-body's own keydown listener and anything in the page
  globalThis.addEventListener("keydown", undoKeys, true);
  watchBaseline();

  onDefined("hax-store", pinSelection);

  onDefined("hax-body", (HaxBody) => {
    const proto = HaxBody.prototype;
    for (const name of ["_onKeyDown", "_onKeyUp"]) {
      const original = proto[name];
      proto[name] = function (e) {
        if (!e.composedPath?.().includes(this)) return;
        return original.call(this, e);
      };
    }

    pinned(proto, "haxReplaceNode", ["__oldActiveNode", "replaceWith("], splitPaste);

    // never a block outside the content (the theme's host, the page's
    // body); and no second placing of the caret after Enter (quietSplit)
    pinned(proto, "__focusLogic", ["ignore-activation", "_validElementTest", "addRange"], (original) =>
      function (target, autoFocus = true, ...rest) {
        if (target && target !== this && !this.contains(target)) return false;
        return original.call(this, target, autoFocus && !this.__oerSplitting, ...rest);
      },
    );
    pinned(proto, "__splitTextBlockAtSelection", ["__focusLogic(", "_positionCursorInNode("], quietSplit);

    for (const name of ["undo", "redo"]) pinned(proto, name, [`super.${name}()`, "[data-hax-active]"], keepCaretThroughUndo);
    pinned(proto, "haxToContent", ["assignedNodes", "fake-hax-list-break"], saveLooseText);

    const activeNodeChanged = proto._activeNodeChanged;
    proto._activeNodeChanged = async function (newValue, oldValue) {
      const result = await activeNodeChanged.call(this, newValue, oldValue);
      // HAX unwrapped the old block's source view, but left the toggle on
      if (newValue !== oldValue && this.viewSourceToggle && !haxStore()?.activeEditingElement) {
        this.viewSourceToggle = false;
        if (oldValue) oldValue.__haxSourceView = false;
      }
      return result;
    };

    const editModeChanged = proto._editModeChanged;
    proto._editModeChanged = function (newValue, oldValue) {
      if (newValue && !this.__oerGuards) {
        this.__oerGuards = true;
        // capture: before hax-body's own mousedown handler and the router
        this.addEventListener("mousedown", keepClickSelection, true);
        this.addEventListener("click", holdLinks, true);
        this.addEventListener("beforeinput", historyInput);
        this.addEventListener("beforeinput", guardInput);
      }
      if (newValue && haxStore()) takePastes(haxStore());
      return editModeChanged.call(this, newValue, oldValue);
    };
  });

  const quietForm = () => {
    const tray = haxStore()?.haxTray;
    tray?.updateComplete?.then(() => {
      const form = tray.shadowRoot?.querySelector("#settingsform");
      if (form) form.disableAutofocus = true;
    });
  };
  globalThis.addEventListener("hax-store-ready", quietForm);
  if (haxStore()?.ready) quietForm();

  onDefined("haxcms-site-editor-ui", (EditorUI) => {
    EditorUI.prototype._cancelButtonTap = () => cancelEdit();
  });
}
