/**
 * Fixes to HAX's editor, made from the theme: HAX's own files are never
 * edited. Each wraps (or relies on) a method of HAX 26.8.1 and is pinned to
 * it: pinned() checks the method is there and its source still holds a
 * marker from that version, and otherwise leaves the fix off with one
 * console warning naming it, so a HAX update can't run a fix against code
 * it wasn't written for. Each names the lines of HAX's source it relies on
 * (paths under @haxtheweb/), to check when HAX is updated and to offer
 * upstream.
 *
 * - Keys outside the content: hax-body acts on keys pressed anywhere in the
 *   window, at the last caret in the content (Enter on our toolbar split a
 *   paragraph; ↑↑ on a button added a paragraph above the hero). It now
 *   ignores keys from outside itself; Undo and Redo are undo.js's.
 *   hax-body/hax-body.js _onKeyDown 1407–1432, _onKeyUp 1310; bound on
 *   entering edit mode (4456), so patching the prototype before then is
 *   enough.
 * - Pastes outside the content: HAX's store pastes into the active block
 *   whatever is pasted in the window (a paste in Page details added a
 *   paragraph to a section). Its window listener is bound when the store
 *   connects, so it's taken off once, wrapped, and put back.
 *   hax-body/lib/hax-store.js _onPaste 2072, bound by utils/utils.js
 *   winEventsElement 1850–1873.
 * - The text toolbar made every active block its target: a section got
 *   role="textbox" (announced as a text box) and contenteditable from it.
 *   Units whose policy says textTarget: false (policy.js) are passed over,
 *   and the field before them stops being the target.
 *   rich-text-editor/lib/toolbars/rich-text-editor-toolbar.js setTarget
 *   1593–1630, enableEditing 1387; hax-body/lib/hax-text-editor-toolbar.js
 *   updated 754.
 * - Drops onto sections: a file dropped on a section landed inside it.
 *   Sections and items take only their own fields and items, so drops
 *   there are refused. hax-body.js dropEvent 5455.
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
 * - HAX's hidden context menus sit in #topcontextmenu, an invisible box over
 *   the active block that took clicks meant for the block above it.
 *   hax-body.js #topcontextmenu 213, 1069.
 *
 *   installHaxFixes()   // from installEditorChrome (editor/index.js)
 *   pinned({ fix, owner, target, method, marker }, (original) => wrapper)
 *   onEditEntry((body) => …)   // each time editing starts
 */
import { css } from "../lit.js";
import { cancelEdit, isMac } from "./stock.js";
import { registerShadowStyles } from "./shadow-styles.js";
import { policyOf } from "./policy.js";

export function onDefined(tag, fn) {
  const cls = customElements.get(tag);
  if (cls) fn(cls);
  else customElements.whenDefined(tag).then(() => fn(customElements.get(tag)));
}

const haxStore = () => globalThis.HaxStore?.requestAvailability?.();

/* ---------- pinning ---------- */

const warned = new Set();

/**
 * Whether target[method] (owner names it: "hax-body") is still HAX
 * 26.8.1's: there, and its source holding marker (a property name or a
 * string, which survive HAX's minified build). If not, warns once that the
 * fix is off.
 */
export function matches({ fix, owner, target, method, marker }) {
  const fn = target?.[method];
  if (typeof fn === "function" && String(fn).includes(marker)) return true;
  if (!warned.has(fix)) {
    warned.add(fix);
    console.warn(`Editor fix off: ${fix}. ${owner} ${method}() isn't HAX 26.8.1's any more; check the fix in editor/hax-fixes.js against it.`);
  }
  return false;
}

/**
 * Wrap a method of HAX's with wrap(original), once, if it still matches
 * (see matches()). Returns whether the fix is on; the wrapper carries the
 * fix's name as __oerFix.
 */
export function pinned(spec, wrap) {
  const { target, method } = spec;
  if (!matches(spec)) return false;
  if (target[method].__oerFix) return true;
  const wrapped = wrap(target[method]);
  wrapped.__oerFix = spec.fix;
  target[method] = wrapped;
  return true;
}

/* ---------- editing starts ---------- */

const onEntry = new Set();

/**
 * Run fn(body) each time editing starts, with the hax-body being edited
 * (also now, if it already is). For adding listeners to hax-body: fn
 * should do that once per body.
 */
export function onEditEntry(fn) {
  onEntry.add(fn);
  const body = haxStore()?.activeHaxBody;
  if (body?.editMode) fn(body);
}

/* ---------- listeners on hax-body ---------- */

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

/* ---------- drops ---------- */

// a drop onto a section or item (or anything inside one), which takes
// only its own fields and items, not blocks
function refusesDrop(e, body) {
  for (const el of e.composedPath()) {
    if (el === body) return false;
    // its shadow parts are retargeted to it further along
    if (el.nodeType !== 1 || !body.contains(el)) continue;
    const { kind, accepts } = policyOf(el);
    if ((kind === "section" || kind === "item") && !accepts.includes("*")) return true;
  }
  return false;
}

/* ---------- installing ---------- */

let installed = false;
export function installHaxFixes() {
  if (installed) return;
  installed = true;

  globalThis.addEventListener("haxcms-edit-mode-changed", (e) => {
    const body = haxStore()?.activeHaxBody;
    if (e.detail && body) for (const fn of onEntry) fn(body);
  });

  onDefined("hax-body", (HaxBody) => {
    const proto = HaxBody.prototype;
    const at = (method, marker, fix) => ({ fix, owner: "hax-body", target: proto, method, marker });

    for (const [method, marker] of [
      ["_onKeyDown", "RICH-TEXT-EDITOR-PROMPT"],
      ["_onKeyUp", "timesClicked"],
    ]) {
      pinned(
        at(method, marker, `keys outside the content (${method})`),
        (original) =>
          function (e) {
            if (!e.composedPath?.().includes(this)) return;
            return original.call(this, e);
          },
      );
    }

    pinned(
      at("_activeNodeChanged", "data-hax-active", "a source view left open"),
      (original) =>
        async function (newValue, oldValue) {
          const result = await original.call(this, newValue, oldValue);
          // HAX unwrapped the old block's source view, but left the toggle on
          if (newValue !== oldValue && this.viewSourceToggle && !haxStore()?.activeEditingElement) {
            this.viewSourceToggle = false;
            if (oldValue) oldValue.__haxSourceView = false;
          }
          return result;
        },
    );

    pinned(
      at("dropEvent", "place-holder-file-drop", "drops onto sections"),
      (original) =>
        function (e) {
          if (!this.editMode || !refusesDrop(e, this)) return original.call(this, e);
          e.preventDefault();
          e.stopPropagation();
          // what HAX would have cleared after the drop
          this.__dragMoving = false;
          for (const el of this.querySelectorAll(".hax-hovered, .hax-drop-above, .hax-drop-below")) el.classList.remove("hax-hovered", "hax-drop-above", "hax-drop-below");
          return false;
        },
    );

    // capture: before hax-body's own mousedown handler and the router
    const clicks = matches(at("_mouseDown", "__mouseDown", "double- and triple-click"));
    const listening = new WeakSet();
    onEditEntry((body) => {
      if (listening.has(body)) return;
      listening.add(body);
      if (clicks) body.addEventListener("mousedown", keepClickSelection, true);
      body.addEventListener("click", holdLinks, true);
    });
  });

  onDefined("hax-text-editor-toolbar", (Toolbar) => {
    pinned(
      { fix: "sections as text boxes", owner: "hax-text-editor-toolbar", target: Toolbar.prototype, method: "setTarget", marker: "textbox" },
      (original) =>
        function (target) {
          if (!target || policyOf(target).textTarget !== false) return original.call(this, target);
          // not a text box: the field before it stops being one, and the
          // toolbar has no target (its buttons off) until a field is active
          const old = this.target;
          if (old) {
            if (old.getAttribute?.("role") === "textbox") old.removeAttribute("role");
            this.unsetTarget(old);
          }
          return original.call(this, undefined);
        },
    );
  });

  // HAX's own paste listener on the window, put back to act only on pastes
  // in the content (not those in a block's own fields, either)
  const quietPaste = () => {
    const hax = haxStore();
    if (!hax || hax.__oerPaste) return;
    // (the listener is the method bound to the store, which hides its source)
    if (!Object.hasOwn(hax, "_onPaste") || !matches({ fix: "pastes outside the content", owner: "hax-store", target: hax.constructor.prototype, method: "_onPaste", marker: "EDITABLE-TABLE" })) return;
    hax.__oerPaste = true;
    const original = hax._onPaste;
    globalThis.removeEventListener("paste", original);
    hax._onPaste = function (e) {
      const body = hax.activeHaxBody;
      const origin = e.composedPath()[0];
      if (!body || !(origin === body || body.contains(origin))) return;
      return original.call(this, e);
    };
    hax._onPaste.__oerFix = "pastes outside the content";
    globalThis.addEventListener("paste", hax._onPaste);
  };

  const quietForm = () => {
    const tray = haxStore()?.haxTray;
    tray?.updateComplete?.then(() => {
      const form = tray.shadowRoot?.querySelector("#settingsform");
      if (form) form.disableAutofocus = true;
    });
  };
  const storeReady = () => {
    quietPaste();
    quietForm();
  };
  globalThis.addEventListener("hax-store-ready", storeReady);
  if (haxStore()?.ready) storeReady();

  onDefined("haxcms-site-editor-ui", (EditorUI) => {
    pinned({ fix: "leaving the editor asks first", owner: "haxcms-site-editor-ui", target: EditorUI.prototype, method: "_cancelButtonTap", marker: "_confirmCancelEditing" }, () => () => cancelEdit());
  });

  registerShadowStyles({
    "hax-body": css`
      #topcontextmenu {
        pointer-events: none;
      }
    `,
  });
}
