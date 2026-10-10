/**
 * The editor's state, in one store (nu-hax docs/editor-redesign/spec.md
 * §3.3, §4.1, §6.1): what's selected and how, where it is on screen,
 * whether the page has unsaved changes, and whether it's saving or in
 * Preview. The selection frame, the rail, the inserter, the editing bar and
 * the Sections sheet read it rather than each following HAX on its own.
 *
 *   activeNode  HAX's active block (a field while typing in one)
 *   unit        the section, item or block it's in (policy.js unitOf)
 *   field       the text field holding the caret, while typing
 *   level       "section", "item", "block", or "field" while typing
 *   mode        "typing" (the caret in a field, focus in the content) or
 *               "selected" (a unit as a whole), or null
 *   geometry    where the unit is: { view, unit, visible, gutter, dock,
 *               scroller }. view is the content viewport (below the bar,
 *               inside the scrollbar); unit the unit's rect and visible the
 *               part of it in the view (null when none is); gutter the
 *               empty margin left of the content's text column, and dock
 *               whether it's too narrow for the rail beside it, or the
 *               window is phone-width (below 48rem): then the selection's
 *               tools sit in a dock at the bottom; scroller
 *               "main" (desktop) or "window" (phones). Viewport pixels.
 *   dirty       the page differs from when editing began (or was last saved)
 *   saving, preview   set by the editing bar
 *
 * It changes in one requestAnimationFrame loop, run only while editing,
 * and sends `change` with detail.changed (a Set of the names that
 * changed). `focusrequest` (cancelable, detail.unit) asks whoever draws the
 * selection to put focus on a unit selected as a whole (its name tag).
 *
 * Unsaved changes come from a baseline, not from HAX's undo position (which
 * no event follows): hax-body's HTML without what editing adds
 * (contentKey()), compared by a debounced MutationObserver. So undoing back
 * to the start reads "no changes". The baseline is HAX's own copy of the
 * page as editing began (undoStackInitialValue, which the undo stack goes
 * back to), not the page as it is once HAX has settled: HAX can put the
 * caret in the first paragraph at once, and anything typed before the
 * baseline was taken read as no change. It's taken once HAX's import and
 * insert have ended and past the stock editor's own copy (100 ms after
 * entry), not on isContentBusy(), which never clears in 26.8.1
 * (docs/editor-spikes/lifecycle.md).
 *
 * And it keeps HAX on the field being typed in: when the caret goes into
 * another field without a click (the keyboard, or the editor placing it),
 * HAX's active block follows (__focusLogic(field, false)), so its toolbar
 * and our frame work on the right element. A click is left to HAX, and so
 * is the caret Undo puts back (undo.js). A click on a unit's padding
 * selects the unit as a whole: no caret is left in its fields.
 *
 *   editorState.addEventListener("change", (e) => e.detail.changed.has("unit") && …)
 *   editorState.set({ saving: true })
 *   editorState.resetBaseline()   // after a save
 *   installEditorState()          // from installEditorChrome (editor/index.js)
 */
import { normalizedHtml } from "./undo.js";
import { unitOf, fieldOf, policyOf } from "./policy.js";

const haxStore = () => globalThis.HaxStore?.requestAvailability?.() ?? null;
const activeBody = () => haxStore()?.activeHaxBody ?? null;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const frames = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

// how long typing settles before unsaved changes are measured
const DIRTY_DEBOUNCE = 150;
// the rail's width with its icons alone (2rem buttons in a 0.25rem frame)
const RAIL_WIDTH = 42;

/* ---------- what counts as a change ---------- */

/**
 * hax-body's HTML as it counts for unsaved changes: normalizedHtml()
 * (undo.js, which also leaves out the white space between blocks that HAX
 * changes when it imports the page again), without the page-break, which
 * gets a new resource id on an import (Edit HTML) and writes its
 * properties out as attributes. The page-break holds the page's details,
 * which are changed in Page details and saved there, not typed on the page.
 */
export function contentKey(html) {
  const t = globalThis.document.createElement("template");
  t.innerHTML = normalizedHtml(html);
  for (const el of t.content.querySelectorAll("page-break")) el.remove();
  return t.innerHTML.trim();
}

/* ---------- where things are on screen ---------- */

const theme = () => globalThis.document.querySelector("custom-oer-docs-theme");
// the phone layout (below 48rem, or 200% zoom on a laptop)
const PHONE = globalThis.matchMedia("(width < 48rem)");
const round = (r) => (r ? { top: Math.round(r.top), right: Math.round(r.right), bottom: Math.round(r.bottom), left: Math.round(r.left) } : null);

/**
 * The content viewport, for both scrollers: on desktop <main> scrolls
 * under the bar, so it's main's box inside its scrollbar; on phones the
 * window scrolls, so it's the window below the sticky bar. Viewport
 * pixels, and which scrolls: { top, right, bottom, left, scroller }. What
 * the selection frame, the rail and the inserter clip to as well.
 */
export function contentView() {
  const root = theme()?.shadowRoot;
  const main = root?.querySelector("main");
  const vv = globalThis.visualViewport;
  const height = vv ? vv.offsetTop + vv.height : globalThis.innerHeight;
  if (!main) return { top: 0, right: globalThis.innerWidth, bottom: height, left: 0, scroller: "window" };
  const r = main.getBoundingClientRect();
  const left = r.left + main.clientLeft;
  const right = left + main.clientWidth;
  if (main.scrollHeight > main.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(main).overflowY)) {
    return { top: r.top + main.clientTop, right, bottom: r.top + main.clientTop + main.clientHeight, left, scroller: "main" };
  }
  // the bar sticks to the top of the window
  const bar = root.querySelector("header.topbar, oer-edit-bar");
  const barBottom = bar ? bar.getBoundingClientRect().bottom : 0;
  return { top: Math.max(r.top, barBottom, 0), right, bottom: Math.min(r.bottom, height), left, scroller: "window" };
}

// the left edge of the content's text: a course site's sections centre
// theirs in a wrapper (cs-shared.js .wrap); other pages edit in a column
function textLeft(body) {
  if (body.hasAttribute("data-oer-microsite")) {
    for (const el of body.children) {
      const wrap = el.shadowRoot?.querySelector(".wrap");
      if (!wrap) continue;
      return wrap.getBoundingClientRect().left + parseFloat(getComputedStyle(wrap).paddingLeft || "0");
    }
  }
  return body.getBoundingClientRect().left;
}

function geometryOf(unit, body, railWidth) {
  const v = contentView();
  const view = { top: v.top, right: v.right, bottom: v.bottom, left: v.left };
  const gutter = Math.max(0, Math.round(textLeft(body) - view.left));
  const r = unit?.isConnected ? unit.getBoundingClientRect() : null;
  const visible =
    r && r.width && r.bottom > view.top && r.top < view.bottom
      ? { top: Math.max(r.top, view.top), right: Math.min(r.right, view.right), bottom: Math.min(r.bottom, view.bottom), left: Math.max(r.left, view.left) }
      : null;
  // (the phone layout always docks)
  const dock = gutter < railWidth + 16 || PHONE.matches;
  return { view: round(view), unit: round(r), visible: round(visible), gutter, dock, scroller: v.scroller };
}

/* ---------- the store ---------- */

// focus as the person sees it, inside shadow roots
function deepActive() {
  let el = globalThis.document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el;
}
const selectionOf = (body) => body.getRootNode().getSelection?.() || globalThis.document.getSelection();

// the node the caret is at, in hax-body's light DOM, or null
function caretNode(body) {
  const sel = selectionOf(body);
  const node = sel?.rangeCount ? sel.getRangeAt(0).startContainer : null;
  return node && body.contains(node) ? node : null;
}
// the field the caret is in, or null
const caretField = (body) => fieldOf(caretNode(body));

const busy = (body) => !!(body._contentState?.getState("importing") || body._contentState?.getState("inserting"));

class EditorState extends EventTarget {
  constructor() {
    super();
    this.editing = false;
    this.body = null;
    this.activeNode = null;
    this.unit = null;
    this.field = null;
    this.level = null;
    this.mode = null;
    this.geometry = null;
    this.dirty = false;
    this.saving = false;
    this.preview = false;
    // the rail's width, which it sets when it shows its labels
    this.railWidth = RAIL_WIDTH;
    // whether unsaved changes are being followed (a baseline is taken)
    this.tracking = false;
    this.__baseline = null;
    this.__entry = 0;
    this.__raf = 0;
    // where the caret was, and in which field, when last seen
    this.__caretAt = null;
    this.__fieldAt = null;
    this.__tick = () => this._tick();
  }

  /** Change some of the state; sends `change` naming what changed. */
  set(values) {
    const changed = new Set();
    for (const [key, value] of Object.entries(values)) {
      const same = key === "geometry" ? JSON.stringify(value) === JSON.stringify(this[key]) : value === this[key];
      if (same) continue;
      this[key] = value;
      changed.add(key);
    }
    if (changed.size) this.dispatchEvent(new CustomEvent("change", { detail: { changed } }));
    return changed;
  }

  /**
   * Ask for focus on a unit selected as a whole (its name tag, which the
   * selection frame draws). Returns whether anything took it.
   */
  requestFocus(unit) {
    const e = new CustomEvent("focusrequest", { cancelable: true, detail: { unit } });
    this.dispatchEvent(e);
    return e.defaultPrevented;
  }

  /* ---------- the loop ---------- */

  _start() {
    if (!this.__raf) this.__raf = requestAnimationFrame(this.__tick);
  }

  _stop() {
    cancelAnimationFrame(this.__raf);
    this.__raf = 0;
  }

  // what's selected and where, each frame while editing
  _tick() {
    this.__raf = requestAnimationFrame(this.__tick);
    const body = activeBody();
    const editing = !!body?.editMode;
    const node = editing ? haxStore().activeNode : null;
    const activeNode = node?.isConnected && body.contains(node) ? node : null;
    const typingIn = editing && deepActive() === body ? caretField(body) : null;
    const unit = unitOf(typingIn || activeNode);
    const kind = policyOf(unit).kind;
    const mode = typingIn ? "typing" : unit ? "selected" : null;
    const level = typingIn ? "field" : !unit ? null : kind === "section" || kind === "item" ? kind : "block";
    this.set({
      editing,
      body: editing ? body : null,
      activeNode,
      unit,
      field: typingIn,
      level,
      mode,
      geometry: editing ? geometryOf(unit, body, this.railWidth) : null,
    });
  }

  /* ---------- unsaved changes ---------- */

  /**
   * Take the baseline once HAX has finished entering edit mode (its
   * import, its undo reset in a setTimeout(0), and the stock editor's own
   * copy 100 ms after entry): HAX's copy of the page as editing began,
   * which its undo reset took and the undo stack goes back to. What's been
   * typed by then is a change.
   */
  async _takeBaseline(body) {
    const entry = ++this.__entry;
    this.tracking = false;
    await sleep(0);
    for (let i = 0; i < 200 && busy(body); i++) await sleep(25);
    await sleep(150);
    await frames();
    if (entry !== this.__entry || !body.editMode) return;
    this._baseline(body, body.undoStackInitialValue || body.innerHTML);
    this.__observer?.disconnect();
    this.__observer = new MutationObserver(() => {
      clearTimeout(this.__measuring);
      this.__measuring = setTimeout(() => this._measure(), DIRTY_DEBOUNCE);
    });
    this.__observer.observe(body, { subtree: true, childList: true, attributes: true, characterData: true });
  }

  /** The page as it is now is what "no changes" means (after a save). */
  resetBaseline(body = activeBody()) {
    if (body) this._baseline(body, body.innerHTML);
  }

  _baseline(body, html) {
    this.__baseline = contentKey(html);
    this.tracking = true;
    this.set({ dirty: contentKey(body.innerHTML) !== this.__baseline });
  }

  _measure() {
    const body = activeBody();
    if (!body?.editMode || this.__baseline === null) return;
    this.set({ dirty: contentKey(body.innerHTML) !== this.__baseline });
  }

  _editMode(on) {
    const body = activeBody();
    if (on && body) {
      this.__caretAt = this.__fieldAt = null;
      this._start();
      this._takeBaseline(body);
      return;
    }
    this.__entry++;
    this.__observer?.disconnect();
    clearTimeout(this.__measuring);
    this.__baseline = null;
    this.tracking = false;
    this._stop();
    this.set({ editing: false, body: null, activeNode: null, unit: null, field: null, level: null, mode: null, geometry: null, dirty: false, preview: false });
  }

  /* ---------- the caret and HAX's active block ---------- */

  // where the caret is now becomes where it was (after a click, whose caret
  // HAX's own mousedown handled)
  _caretSeen() {
    const body = activeBody();
    this.__caretAt = body?.editMode ? caretNode(body) : null;
    this.__fieldAt = fieldOf(this.__caretAt);
  }

  // the caret went into another field without a click (the keyboard, or
  // the editor placing it): HAX's active block follows it. A click or a drag
  // is HAX's own mousedown's to handle: a click on a section's padding
  // selects the section, though the browser puts the caret in a field
  _followCaret() {
    const body = activeBody();
    const hax = haxStore();
    if (!body?.editMode) return;
    const before = this.__caretAt;
    const moved = fieldOf(caretNode(body)) !== this.__fieldAt;
    this._caretSeen();
    if (!moved || this.__pointerDown || busy(body) || deepActive() !== body) return;
    // the caret's node went with content HAX replaced (Undo, Redo, Edit
    // HTML): the browser put the caret in the first field it found, and HAX
    // puts its active block back itself (hax-body.js undo 4237; an Undo's
    // change is pending until undoStackIgnore is cleared)
    if ((before && !before.isConnected) || body.undoStackIgnore) return;
    const field = this.__fieldAt;
    const active = hax.activeNode;
    // a list's items are its own (HAX activates the list), and inline
    // formatting is the field's
    if (!field || active === field || (active?.contains(field) && hax.isTextElement?.(active))) return;
    body.__focusLogic(field, false);
  }

  // after a click: when it made a section or item HAX's active block (a
  // click on its padding), the browser has still put the caret in one of
  // its fields, where the next key would go. Selected means no caret (spec
  // §4.1)
  _clicked() {
    const body = activeBody();
    if (!body?.editMode || deepActive() !== body) return;
    const unit = haxStore().activeNode;
    const { kind } = policyOf(unit);
    if ((kind !== "section" && kind !== "item") || !body.contains(unit)) return;
    const sel = selectionOf(body);
    const field = sel?.rangeCount && sel.isCollapsed ? caretField(body) : null;
    if (field && unit.contains(field)) sel.removeAllRanges();
    this._caretSeen();
  }
}

/** The editor's state: one for the page. */
export const editorState = new EditorState();

let installed = false;
export function installEditorState() {
  if (installed) return;
  installed = true;
  globalThis.addEventListener("haxcms-edit-mode-changed", (e) => editorState._editMode(!!e.detail));
  // (once a frame at most: the caret moves a character at a time)
  let pending = 0;
  globalThis.document.addEventListener("selectionchange", () => {
    if (!editorState.editing || pending) return;
    pending = requestAnimationFrame(() => {
      pending = 0;
      editorState._followCaret();
    });
  });
  globalThis.addEventListener("pointerdown", () => (editorState.__pointerDown = true), true);
  for (const type of ["pointerup", "pointercancel"]) {
    globalThis.addEventListener(
      type,
      () => {
        editorState.__pointerDown = false;
        editorState._caretSeen();
      },
      true,
    );
  }
  // (after HAX's own click handling)
  globalThis.addEventListener("click", () => editorState.editing && setTimeout(() => editorState._clicked()), true);
  if (activeBody()?.editMode) editorState._editMode(true);
}
