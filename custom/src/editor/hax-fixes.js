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
 * - Deleting a selection that reaches the page-break does nothing (see
 *   keepPageBreak), and an HTML paste lands once (see takePastes).
 *
 *   installHaxFixes()   // from installEditorChrome (editor/index.js)
 */
import { sanitizeHTMLString } from "@haxtheweb/utils/utils.js";
import { cancelEdit, isMac, watchBaseline } from "./stock.js";
import { editSelection, getEditRange, setEditRange } from "../ui/edit-selection.js";

function onDefined(tag, fn) {
  const cls = customElements.get(tag);
  if (cls) fn(cls);
  else customElements.whenDefined(tag).then(() => fn(customElements.get(tag)));
}

/**
 * Wrap a method once, if its source still holds a marker from HAX 26.8.1;
 * otherwise leave it as it is and say so in the console.
 */
function pinned(target, name, marker, wrap) {
  const original = target?.[name];
  if (original?.__oerPinned) return;
  if (typeof original !== "function" || !String(original).includes(marker)) {
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

/* ---------- the page-break ---------- */

/**
 * Deleting, or typing over, a selection that reaches the page-break (HAX's
 * record of the page's title and details, the first block) does nothing:
 * in Firefox, Select All then Backspace emptied the page, page-break and
 * all, and Backspace at the start of the first block deleted from inside
 * the page-break. Judged on the browser's own target ranges, or the
 * selection when it gives none.
 */
function keepPageBreak(e) {
  const body = e.currentTarget;
  const deletes = /^delete/.test(e.inputType);
  if (!body.editMode || (!deletes && !/^insert/.test(e.inputType))) return;
  const breaks = [...body.querySelectorAll(":scope > page-break")];
  if (!breaks.length) return;
  let ranges = e.getTargetRanges?.() || [];
  if (!ranges.length) ranges = [getEditRange(body)].filter(Boolean);
  const reaches = (r) => {
    if (!deletes && r.collapsed) return false;
    try {
      const range = globalThis.document.createRange();
      range.setStart(r.startContainer, r.startOffset);
      range.setEnd(r.endContainer, r.endOffset);
      return breaks.some((b) => range.intersectsNode(b));
    } catch {
      return false;
    }
  };
  if (ranges.some(reaches)) e.preventDefault();
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
 * There (no getSelection on shadow roots, getComposedRanges on the
 * selection), HAX gets a stand-in for the document's selection: where the
 * caret is in the content, its nodes come from the composed range
 * (ui/edit-selection.js), and where it isn't, it holds no range; addRange
 * places the caret with setBaseAndExtent. Chrome and Firefox get HAX's own.
 */
function contentSelection(store, sel) {
  const body = store.activeHaxBody;
  const root = body?.getRootNode();
  if (!root || root.getSelection || !sel?.getComposedRanges) return sel;
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
  pinned(proto, "getSelection", "globalThis.getSelection()", (original) =>
    function () {
      return contentSelection(this, original.call(this));
    },
  );
  pinned(proto, "getRange", "getRangeAt(0)", (original) =>
    function () {
      const body = this.activeHaxBody;
      const root = body?.getRootNode();
      // Safari's engine: the composed range in the content, if it's there
      const range = root && !root.getSelection && editSelection(body)?.getComposedRanges ? getEditRange(body) : null;
      return range || original.call(this);
    },
  );
}

/* ---------- pastes ---------- */

/**
 * HAX takes a paste of HTML itself, but cancels the browser's own paste
 * only after an await (hax-store.js _onPaste 2072–2808: htmlToHaxElements
 * at 2333, preventDefault at 2587 and before), too late in Firefox, where
 * both landed: a paragraph got the pasted text twice. When HAX will look at
 * an HTML paste into the content (its own test, 2073–2083), the browser's
 * is cancelled at once. If HAX then leaves it to the browser (a table, say), or takes it
 * but puts nothing in (its loop over the pasted blocks throws when it
 * removes an empty one, 2600–2609, caught at 2803: a table copied with the
 * block around it), the HTML goes in as the browser would have put it,
 * cleaned as HAX cleans imported HTML; but not when HAX offers to make a
 * link of it instead (2421–2480, 2503–2556).
 * HAX's window listener is the bound copy it makes on connecting
 * (utils/utils.js winEventsElement 1863–1872), so it's replaced in place.
 *
 * Pasted blocks with the caret inside a paragraph: HAX splits the
 * paragraph (execCommand insertParagraph, 2683–2690), then puts the first
 * block in place of the block before the one its range ends in
 * (haxReplaceNode, 2711–2716). That's the empty half when the caret was
 * at the paragraph's start; from its middle it was the paragraph's first
 * half in Chrome and Safari, and in Firefox the block before the
 * paragraph (the page-break, say), all lost. The first block goes in
 * between the two halves instead (see splitPaste).
 */
function takePastes(store) {
  if (store._onPaste?.__oerPinned) return;
  if (!String(Object.getPrototypeOf(store)._onPaste).includes("htmlToHaxElements")) {
    console.warn("hax-fixes: _onPaste isn't HAX 26.8.1's; left alone");
    return;
  }
  const original = store._onPaste;
  const paste = async (e) => {
    const body = store.activeHaxBody;
    // into the content (not a field a block draws), with HTML to clean
    const into = e instanceof Event && e.cancelable && !e.defaultPrevented && !!body?.contains(e.composedPath()[0]);
    const html = into ? e.clipboardData?.getData("text/html") : "";
    const active = globalThis.document.activeElement?.tagName;
    const looks = html && store.editMode && !["HAX-TRAY", "BODY", "SIMPLE-MODAL", "SUPER-DAEMON"].includes(active) && store.activeNode && store.activeNode.tagName !== "EDITABLE-TABLE";
    if (!looks) return original(e);
    e.preventDefault();
    // HAX cancels the paste when it takes it
    let taken = false;
    e.preventDefault = () => (taken = true);
    const split = (ev) => {
      if (ev.inputType === "insertParagraph") body.__oerPasteSplit = true;
    };
    body?.addEventListener("input", split);
    let changed = false;
    const watch = new MutationObserver(() => (changed = true));
    if (body) watch.observe(body, { childList: true, subtree: true, characterData: true });
    const link = /^\s*(<meta[^>]*>\s*)*<a\s[^>]*>[^<]*<\/a>\s*$/i.test(html) || /^\s*https?:\/\/\S+\s*$/i.test(e.clipboardData?.getData("text/plain") || "");
    try {
      return await original(e);
    } finally {
      changed ||= watch.takeRecords().length > 0;
      watch.disconnect();
      body?.removeEventListener("input", split);
      if (body) body.__oerPasteSplit = false;
      if (!taken || (!changed && !link)) globalThis.document.execCommand("insertHTML", false, sanitizeHTMLString(html));
    }
  };
  paste.__oerPinned = true;
  globalThis.removeEventListener("paste", original);
  store._onPaste = paste;
  globalThis.addEventListener("paste", paste);
}

const TEXT_BLOCKS = "p, h1, h2, h3, h4, h5, h6, li, blockquote, pre";

/**
 * hax-body's haxReplaceNode as HAX's paste calls it right after splitting
 * a paragraph (takePastes): the first pasted block takes the place of the
 * empty half the split left before the caret, or goes in just before the
 * half the caret went into. Otherwise it's HAX's own.
 */
function splitPaste(original) {
  return function (node, replacement) {
    if (this.__oerPasteSplit) {
      this.__oerPasteSplit = false;
      const at = getEditRange(this);
      const start = at && (at.startContainer.nodeType === 1 ? at.startContainer : at.startContainer.parentElement);
      const second = start?.closest(TEXT_BLOCKS);
      if (second && second !== this && this.contains(second)) {
        const first = second.previousElementSibling;
        const empty = first?.matches(TEXT_BLOCKS) && !first.textContent.trim() && !first.querySelector("img, video, iframe");
        if (empty) node = first;
        else {
          node = globalThis.document.createElement(replacement.localName || "p");
          second.before(node);
        }
      }
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

    pinned(proto, "haxReplaceNode", "replaceWith(", splitPaste);

    // never a block outside the content (the theme's host, the page's body)
    pinned(proto, "__focusLogic", "ignore-activation", (original) =>
      function (target, ...rest) {
        if (target && target !== this && !this.contains(target)) return false;
        return original.call(this, target, ...rest);
      },
    );

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
        this.addEventListener("beforeinput", keepPageBreak);
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
