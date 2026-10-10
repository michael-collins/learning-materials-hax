/**
 * Fixes to HAX's editor, made from the theme: HAX's own files are never
 * edited. Each patches a method of HAX 26.8.1 once its element is defined,
 * and names the lines of HAX's source it relies on (paths under
 * @haxtheweb/), so it can be checked when HAX is updated and offered
 * upstream.
 *
 * - Keys outside the content: hax-body acts on keys pressed anywhere in the
 *   window, at the last caret in the content (Enter on our toolbar split a
 *   paragraph). It now ignores keys from outside itself, except Undo and
 *   Redo (Ctrl+Z, Ctrl+Shift+Z), which work from the editor's buttons too.
 *   hax-body/hax-body.js _onKeyDown 1407–1432 (undo 1433–1451), _onKeyUp
 *   1310; bound on entering edit mode (4456), so patching the prototype
 *   before then is enough.
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
 *   _cancelButtonTap 6707, shortcut 5551.
 *
 *   installHaxFixes()   // from installEditorChrome (editor/index.js)
 */
import { cancelEdit, isMac } from "./stock.js";

function onDefined(tag, fn) {
  const cls = customElements.get(tag);
  if (cls) fn(cls);
  else customElements.whenDefined(tag).then(() => fn(customElements.get(tag)));
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
    const sel = block.getRootNode().getSelection?.() || globalThis.getSelection();
    sel.selectAllChildren(block);
  });
}

// Undo and Redo (Ctrl+Z, Ctrl+Shift+Z, as HAX checks them): taken from
// anywhere in the window, the editor's Undo button included, but not from
// a field with an undo of its own
const isUndoKey = (e) => e.ctrlKey && /^z$/i.test(e.key) && !e.composedPath()[0]?.closest?.("input, textarea, select, [contenteditable]");

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

let installed = false;
export function installHaxFixes() {
  if (installed) return;
  installed = true;

  onDefined("hax-body", (HaxBody) => {
    const proto = HaxBody.prototype;
    for (const name of ["_onKeyDown", "_onKeyUp"]) {
      const original = proto[name];
      proto[name] = function (e) {
        if (!e.composedPath?.().includes(this) && !isUndoKey(e)) return;
        return original.call(this, e);
      };
    }

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
      }
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
