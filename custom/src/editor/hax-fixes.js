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
 *   ignores keys from outside its light DOM, a block's own shadow controls
 *   included (↑↑ on the hero's Choose from site did the same); Undo and
 *   Redo are undo.js's.
 *   hax-body/hax-body.js _onKeyDown 1407–1432, _onKeyUp 1310; bound on
 *   entering edit mode (4456), so patching the prototype before then is
 *   enough.
 * - Pastes outside the content: HAX's store pastes into the active block
 *   whatever is pasted in the window (a paste in Page details added a
 *   paragraph to a section). Its window listener is bound when the store
 *   connects (under the name its __winEvents give), so it's taken off once,
 *   wrapped, and put back. hax-body/lib/hax-store.js _onPaste 2072,
 *   __winEvents 3145; utils/utils.js winEventsElement 1850–1873.
 * - The text toolbar made every active block its target: a section got
 *   role="textbox" (announced as a text box) and contenteditable from it.
 *   Units whose policy says textTarget: false (policy.js) are passed over,
 *   and the field before them stops being the target.
 *   rich-text-editor/lib/toolbars/rich-text-editor-toolbar.js setTarget
 *   1593–1630, enableEditing 1387; hax-body/lib/hax-text-editor-toolbar.js
 *   updated 754.
 * - Drops onto sections: a file dropped on a section landed inside it.
 *   Sections and items take only their own fields and items, so a file or
 *   a block dropped there is refused, cleaning up as HAX's own drop does;
 *   dragged text is left to the deletion guard. hax-body.js dropEvent
 *   5455–6001, dragEnterBody 1021, dragEndBody 851.
 * - The settings form took focus each time a block became active.
 *   hax-body/lib/hax-tray.js #settingsform 993; simple-fields/lib/simple-fields-lite.js 583.
 * - Selecting a block doesn't change it. Filling the settings form in for
 *   the newly selected block fires value-changed, as editing a field does,
 *   and the tray wrote every value back to the block: a quiz got
 *   single-option="single-option" and quiz-name="default", a self-check's
 *   paragraphs turned into spans, and each was an undo step and an
 *   unsaved change. Until the author touches the form, its value-changed
 *   stops before the tray's listener. hax-tray.js _setupForm 1396,
 *   __valueChangedEvent 1843 (bound 1319), the writes 1870–2079.
 * - A source view left open (Edit HTML, then selecting another block) kept
 *   hax-body's viewSourceToggle on, which switches off Duplicate, Remove and
 *   Insert for every block. It ends when the selection moves.
 *   hax-body.js hax-source-view-toggle 3797–3891, _activeNodeChanged 6282;
 *   hax-body/lib/hax-plate-context.js 362–410.
 * - A block's own Edit HTML shows it as saved, without the editing
 *   attributes on it and its fields (a section leaves them out,
 *   blocks/course-site/cs-shared.js): HAX takes contenteditable off the
 *   block it shows, but the click that opened it put it back; and the block
 *   HAX makes of the source once it closes (by the toggle, or as another
 *   block is selected) gets its fields made editable, which the source no
 *   longer carries. hax-body.js positionContextMenus 2902–2917,
 *   hax-source-view-toggle 3837–3891, _activeNodeChanged 6369–6417,
 *   __rehydrateLayoutDescendants 5039.
 * - Double- and triple-click select a word or a paragraph again: HAX's
 *   mousedown handling made the block active anew and put the caret back.
 *   A triple click selects just the paragraph's text.
 *   hax-body.js _mouseDown 936, __focusLogic 4064–4201.
 * - …and don't delete it. The text toolbar's emoji and symbol pickers (kept
 *   hidden, and driven by the rail) empty their value as the selection
 *   moves, and an emptied value counted as a pick: "" was inserted over
 *   the selection, so a double click on a word in a field not yet being
 *   edited (an outcome's title) deleted the word. A value of nothing is
 *   never a pick there. rich-text-editor/lib/buttons/rich-text-editor-
 *   picker.js _setRangeValue 214–224, _pickerChange 260–268.
 * - Links in the content don't leave the page mid-edit (losing the edit);
 *   Mod+click opens them in a new tab, and a click shows the link popover's
 *   bubble (Open in new tab, and Edit link and Remove link for a link in
 *   what's typed: oer-link-popover.js, told with `oer-link-click`). The
 *   router skips a click whose default is prevented:
 *   haxcms-elements/lib/core/hax-router.js 43.
 * - Leaving the editor asks our question (stock.js cancelEdit), also from
 *   its keyboard shortcut. haxcms-elements/lib/core/haxcms-site-editor-ui.js
 *   _cancelButtonTap 6707, shortcut 5551.
 * - HAX's hidden context menus sit in #topcontextmenu, an invisible box over
 *   the active block that took clicks meant for the block above it.
 *   hax-body.js #topcontextmenu 213, 1069.
 * - HAX finds the caret in Safari's engine too (see contentSelection), and
 *   never makes something outside the content (the theme's host, the
 *   page's body) its active block. hax-body.js __focusLogic 4064.
 *
 *   installHaxFixes()   // from installEditorChrome (editor/index.js)
 *   pinned({ fix, owner, target, method, marker, file }, (original) => wrapper)
 *   onEditEntry((body) => …)   // each time editing starts
 */
import { css } from "../lit.js";
import { cancelEdit, isMac } from "./stock.js";
import { registerShadowStyles } from "./shadow-styles.js";
import { policyOf, closedUnitOf } from "./policy.js";
import { curate, curatedValue } from "./block-settings.js";
import { editSelection, getEditRange, setEditRange } from "../ui/edit-selection.js";

export function onDefined(tag, fn) {
  const cls = customElements.get(tag);
  if (cls) fn(cls);
  else customElements.whenDefined(tag).then(() => fn(customElements.get(tag)));
}

const haxStore = () => globalThis.HaxStore?.requestAvailability?.();

/* ---------- pinning ---------- */

const warned = new Set();

/**
 * Warn, once per fix, that it's off: why (by default, that owner's method()
 * has changed), and the file to check it in (spec.file, which defaults to
 * this one). Returns false.
 */
export function fixOff({ fix, owner, method, file = "editor/hax-fixes.js" }, why = `${owner} ${method}() isn't HAX 26.8.1's any more`) {
  if (!warned.has(fix)) {
    warned.add(fix);
    console.warn(`Editor fix off: ${fix}. ${why}; check the fix in ${file} against it.`);
  }
  return false;
}

// HAX's own method, under any fixes already wrapped round it
function haxOwn(fn) {
  while (fn?.__oerOriginal) fn = fn.__oerOriginal;
  return fn;
}

/**
 * Whether target[method] (owner names it: "hax-body") is still HAX
 * 26.8.1's: there, and its source holding marker (a property name or a
 * string, which survive HAX's minified build). If not, warns once that the
 * fix is off (see fixOff).
 */
export function matches(spec) {
  const fn = haxOwn(spec.target?.[spec.method]);
  if (typeof fn === "function" && String(fn).includes(spec.marker)) return true;
  return fixOff(spec);
}

/**
 * Wrap a method of HAX's with wrap(original), once, if it still matches
 * (see matches()). Returns whether the fix is on; the wrapper carries the
 * fix's name as __oerFix, and what it wraps as __oerOriginal.
 */
export function pinned(spec, wrap) {
  const { target, method, fix } = spec;
  for (let fn = target?.[method]; fn?.__oerOriginal; fn = fn.__oerOriginal) if (fn.__oerFix === fix) return true;
  if (!matches(spec)) return false;
  const original = target[method];
  const wrapped = wrap(original);
  wrapped.__oerFix = fix;
  wrapped.__oerOriginal = original;
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
  if (isMac ? e.metaKey : e.ctrlKey) {
    globalThis.open(link.href, "_blank", "noopener");
    return;
  }
  // (a link a block draws in its own shadow DOM can be opened, not edited)
  const editable = body.contains(link) && link.isContentEditable;
  globalThis.dispatchEvent(new CustomEvent("oer-link-click", { detail: { link, editable } }));
}

/* ---------- source views ---------- */

// a source view (Edit HTML) about to close: returns what to run once it has,
// which makes the fields of the block HAX made of it editable, found where
// the source view was
function afterSource(body) {
  const source = haxStore()?.activeEditingElement;
  if (source?.localName !== "code-editor" || !body.contains(source)) return null;
  const parent = source.parentNode;
  const next = source.nextSibling;
  return async () => {
    const made = next?.isConnected ? next.previousElementSibling : parent.lastElementChild;
    if (made && made !== source && body.contains(made)) await body.__rehydrateLayoutDescendants?.(made, body.editMode);
  };
}

/* ---------- drops ---------- */

// a file or a block dropped onto a section or item (or anything inside
// one), which takes only its own fields and items; dragged text is the
// deletion guard's to judge
function refusesDrop(e, body) {
  const file = [...(e.dataTransfer?.items || [])].some((item) => item.kind === "file");
  if (!haxStore()?.__dragTarget && !file) return false;
  // the first element in the content: a block's shadow parts come before it
  const target = e.composedPath().find((el) => el === body || (el.nodeType === 1 && body.contains(el)));
  return !!target && target !== body && !!closedUnitOf(target);
}

/* ---------- the settings form ---------- */

// settings forms being filled in for a newly selected block, not yet
// touched by the author
const filling = new WeakSet();
const watchedForms = new WeakSet();

// filling the form in fires value-changed, as editing a field does, and
// the tray wrote every value back to the block: these stop it, until the
// author touches the form
function watchFilling(form) {
  if (watchedForms.has(form)) return;
  watchedForms.add(form);
  // capture, at the form itself: before the tray's own listener
  form.addEventListener(
    "value-changed",
    (e) => {
      if (filling.has(form) && e.composedPath()[0] === form) e.stopImmediatePropagation();
    },
    true,
  );
  for (const type of ["pointerdown", "keydown", "input", "paste", "drop"]) {
    form.addEventListener(type, (e) => e.isTrusted && filling.delete(form), true);
  }
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

function pinSelection(Store) {
  const at = (method, marker) => ({ fix: `the caret in Safari (${method})`, owner: "hax-store", target: Store.prototype, method, marker });
  pinned(
    at("getSelection", "activeHaxBody"),
    (original) =>
      function () {
        return contentSelection(this, original.call(this));
      },
  );
  pinned(
    at("getRange", "rangeCount"),
    (original) =>
      function () {
        // Safari's engine: the composed range in the content, if it's there
        const range = standIn(this.activeHaxBody) ? getEditRange(this.activeHaxBody) : null;
        return range || original.call(this);
      },
  );
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
            // typed in the content's light DOM: not outside hax-body, nor in
            // a block's own (shadow) controls, which only pass through it
            const origin = e.composedPath?.()[0];
            if (!origin || !(origin === this || this.contains(origin))) return;
            return original.call(this, e);
          },
      );
    }

    pinned(
      at("_activeNodeChanged", "data-hax-active", "a source view left open"),
      (original) =>
        async function (newValue, oldValue) {
          const closing = oldValue && oldValue.parentNode === haxStore()?.activeEditingElement ? afterSource(this) : null;
          const result = await original.call(this, newValue, oldValue);
          await closing?.();
          // HAX unwrapped the old block's source view, but left the toggle on
          if (newValue !== oldValue && this.viewSourceToggle && !haxStore()?.activeEditingElement) {
            this.viewSourceToggle = false;
            if (oldValue) oldValue.__haxSourceView = false;
          }
          return result;
        },
    );

    pinned(
      at("positionContextMenus", "__positionContextTimer", "a block shown as its source isn't editable"),
      (original) =>
        function (node = this.activeNode) {
          const result = original.call(this, node);
          if (node?.__haxSourceView) node.removeAttribute("contenteditable");
          return result;
        },
    );

    pinned(
      at("_haxContextOperation", "hax-source-view-toggle", "a block made from its source is editable"),
      (original) =>
        async function (e) {
          const closing = e.detail?.eventName === "hax-source-view-toggle" && this.activeNode?.__haxSourceView ? afterSource(this) : null;
          const result = await original.call(this, e);
          await closing?.();
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
          // what HAX clears after any drop (dropEvent 5457, 6000–6001): the
          // drag, the drop marks and the end cap a file brought in
          // (dragEnterBody 1021), and the scrolling near the window's edge
          this.__dragMoving = false;
          const hax = haxStore();
          if (hax) hax.__dragTarget = null;
          this.dragEndBody?.(e);
          this.scrollerFixclickEvent?.(e);
          this.dispatchEvent(new CustomEvent("oer-edit-refused", { bubbles: true, composed: true, detail: { inputType: "drop", reason: "drops into a section" } }));
          return false;
        },
    );

    // never a block outside the content (the theme's host, the page's body)
    pinned(
      at("__focusLogic", "ignore-activation", "nothing outside the content is the active block"),
      (original) =>
        function (target, ...rest) {
          if (target && target !== this && !this.contains(target)) return false;
          return original.call(this, target, ...rest);
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

  onDefined("hax-store", pinSelection);

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

  for (const tag of ["rich-text-editor-emoji-picker", "rich-text-editor-symbol-picker"]) {
    onDefined(tag, (Picker) => {
      pinned(
        { fix: `a picker emptied isn't a pick (${tag})`, owner: tag, target: Picker.prototype, method: "_pickerChange", marker: "commandVal" },
        (original) =>
          function (e) {
            if (!e?.detail?.value) return;
            return original.call(this, e);
          },
      );
    });
  }

  onDefined("hax-tray", (Tray) => {
    pinned(
      { fix: "selecting a block doesn't change it", owner: "hax-tray", target: Tray.prototype, method: "_setupForm", marker: "setupActiveElementForm" },
      (original) =>
        function (...args) {
          const form = this.shadowRoot?.querySelector("#settingsform");
          if (form) {
            watchFilling(form);
            filling.add(form);
          }
          return original.apply(this, args);
        },
    );
  });

  // HAX's own paste listener on the window, put back to act only on pastes
  // in the content (not those in a block's own fields, either)
  const quietPaste = () => {
    const hax = haxStore();
    if (!hax || hax.__oerPaste) return;
    const spec = { fix: "pastes outside the content", owner: "hax-store", target: hax.constructor.prototype, method: "_onPaste", marker: "EDITABLE-TABLE" };
    if (!matches(spec)) return;
    // the listener is the method bound to the store (which hides its
    // source), under the name the store's window events give
    if (hax.__winEvents?.paste !== "_onPaste" || !Object.hasOwn(hax, "_onPaste")) {
      fixOff(spec, "hax-store's window paste listener isn't its bound _onPaste() any more");
      return;
    }
    hax.__oerPaste = true;
    const original = hax._onPaste;
    globalThis.removeEventListener("paste", original);
    hax._onPaste = function (e) {
      const body = hax.activeHaxBody;
      const origin = e.composedPath()[0];
      if (!body || !(origin === body || body.contains(origin))) return;
      return original.call(this, e);
    };
    hax._onPaste.__oerFix = spec.fix;
    hax._onPaste.__oerOriginal = original;
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

  curateSettingsForms();
}

/* ---------- block settings, curated (WP-13) ---------- */

/**
 * Every block's settings form is cut down to what block-settings.js keeps,
 * as the tray builds it: HAX's setupActiveElementForm hook, which a block
 * can declare to change its own form, runs for every block, and after the
 * block's own, the form is curated (curate(), new arrays and fields) and
 * filled in with the block's values for the fields it kept. Only the
 * tray's forms: the text toolbar's prompts run the hook too, on a block
 * made for the purpose and HAX's shared registration, which are left
 * alone. hax-body/lib/hax-store.js testHook 68, runHook 84; hax-tray.js
 * _setupForm 1396 (the hook 1697, the form's value 1706).
 *
 * And HAX's block list stays as it was: the tray's form shares its arrays
 * and fields with HAXStore.elementList, and HAX writes each top-level
 * field's property onto them (hax-tray.js 1617–1646). While a form is set
 * up, the tray reads a copy of the block's registration instead (all of
 * that happens before the hook, as _setupForm's first await). Selecting a
 * block with slots (a callout) wrote the block itself, its children and
 * more onto its registered slot fields the same way (hax-store.js
 * slotsSchemaFromNode 1257–1283): slotsFromSchema (4507) now hands out
 * copies of them.
 */
function curateSettingsForms() {
  // the tray's form for a block in the page (not a prompt's made-up one)
  const traysForm = (store, el, props) => !!el?.isConnected && !!props?.settings && props.settings !== store.elementList?.[el.localName]?.settings;

  onDefined("hax-store", (Store) => {
    const proto = Store.prototype;
    const at = (method, marker) => ({ fix: `block settings curated (${method})`, owner: "hax-store", target: proto, method, marker });
    let ownHook = null;
    pinned(at("testHook", "primativeHooks"), (original) => {
      ownHook = original;
      return function (el, op) {
        if (op === "setupActiveElementForm" && el?.isConnected && el.closest?.("hax-body")) return true;
        return original.call(this, el, op);
      };
    });
    pinned(at("runHook", "testHook"), (original) =>
      async function (el, op, data = []) {
        const [props] = data;
        if (op !== "setupActiveElementForm" || !ownHook || !traysForm(this, el, props)) return original.call(this, el, op, data);
        const result = ownHook.call(this, el, op) ? await original.call(this, el, op, data) : false;
        const curated = curate(el.localName, props.settings);
        Object.assign(props.settings, curated);
        const tray = this.haxTray;
        if (tray?.activeNode === el && tray.activeValue) tray.activeValue = curatedValue(curated.configure, tray.activeHaxElement?.properties, tray.activeValue);
        return result;
      },
    );
    pinned(
      { fix: "a block's slots leave HAX's block list as it was", owner: "hax-store", target: proto, method: "slotsFromSchema", marker: ".required" },
      (original) =>
        function (...args) {
          return original.apply(this, args).map((slot) => (slot && typeof slot === "object" ? { ...slot } : slot));
        },
    );
  });

  onDefined("hax-tray", (Tray) => {
    pinned(
      { fix: "block settings leave HAX's block list as it was", owner: "hax-tray", target: Tray.prototype, method: "_setupForm", marker: "setupActiveElementForm" },
      (original) =>
        function (...args) {
          const list = haxStore()?.elementList;
          const tag = this.activeNode?.localName;
          const entry = tag && list?.[tag];
          if (!entry?.settings) return original.apply(this, args);
          const settings = Object.fromEntries(Object.entries(entry.settings).map(([key, fields]) => [key, Array.isArray(fields) ? fields.map((f) => (f && typeof f === "object" ? { ...f } : f)) : fields]));
          list[tag] = { ...entry, settings };
          try {
            return original.apply(this, args);
          } finally {
            list[tag] = entry;
          }
        },
    );
  });
}
