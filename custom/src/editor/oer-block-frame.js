/**
 * `oer-block-frame` — the selection frame (nu-hax docs/editor-redesign/
 * spec.md §4.1, §4.2, §7.1): a ring around the selected unit (a section,
 * an item, or a block), a handle that moves it, and a label naming it.
 *
 *                       ┌──────────────────────── What you'll learn › Outcome 2 of 3 ┐
 *      ╭─╮  ╔════════════════════════════════════════════════════════════════════════╗
 *      │↑│  ║  selected unit                                                         ║
 *      │⠿│  ║                                                                        ║
 *      │↓│  ║                                                                        ║
 *      ╰─╯  ╚════════════════════════════════════════════════════════════════════════╝
 *
 * - The ring is two-tone (2px --primary between 1px halos of --background),
 *   so it shows on any section's colour. A unit as wide as the page (a
 *   course site's section) has it inside its edges, label included.
 * - While typing in a field of the unit (an outcome's title), the field has
 *   the focus ring.
 * - The handle [↑ ⠿ ↓] follows the visible middle of the unit; cards and
 *   chips have ← →, and no grip (they stay in their section). ↑ and ↓
 *   move it through ops.js; the grip drags it to the slots it may go to
 *   (never into columns for a section, never past the hero or Ready to
 *   start); Escape cancels a drag. A unit that stays put (the hero) has
 *   them off, with the reason.
 * - The label is a toolbar ("Selection"): the levels around the unit
 *   (each selects its level), the unit's name tag, its state (Hidden,
 *   Empty: readers won't see it, and where a generated section's content
 *   comes from, which opens it), and for an ordinary block Block settings
 *   (only when it has settings) and Layout (columns). A block can add its
 *   own button with a static `frameAction`: { label, icon (an oer: Lucide
 *   name), run(node) }, e.g. the rubric block's Edit rubric.
 * - The name tag holds focus while a unit is selected as a whole: ops.js
 *   asks for it (editorState `focusrequest`: Escape from a field, a unit
 *   selected by a key), and a click on a unit's padding gives it. Its keys
 *   are selection-label.js nameTagKeydown (Enter, Escape, arrows, Home,
 *   End, Alt+Shift+arrows, Mod+Shift+D, Delete, Shift+F10).
 * - Everything is clipped to the content view (below the editing bar,
 *   above the phone dock) and drawn under the editor's menus and flyouts.
 *   Where the margin beside the text is too narrow for the rail (narrow
 *   windows, phones), the label and the handle go into the rail's dock
 *   and the frame draws the ring alone.
 *
 * And the regions: Ctrl+` (and F6, where the browser passes it) goes to
 * the next region, Ctrl+Shift+` (Shift+F6) to the one before: the editing
 * bar, the Sections sheet, the selection (its name tag), the content (the
 * caret where it was). Escape in an ordinary block's text selects the
 * block, as it does in a section's fields (blocks/course-site/cs-keys.js).
 *
 * It follows the editor's state (editor-state.js), changing as it changes.
 * Replaces HAX's outline on [data-hax-active] (see editor-skin.js) and the
 * floating drag menu in hax-plate-context.
 * @element oer-block-frame
 */
import { html, css, LitElement } from "../lit.js";
import { LUCIDE_ICONS } from "./lucide-icons.generated.js";
import { editorState, contentView } from "./editor-state.js";
import { computeSlots, nearestSlot, placeInSlot, sameSlot } from "./slots.js";
import { settingsDialog } from "./oer-settings-dialog.js";
import { layoutOf, columnRects, columnCount, layoutPresets, setLayout, wrapInColumns, removeLayout } from "./layouts.js";
import { policyOf, phraseOf, TEXT_FIELDS } from "./policy.js";
import { ops } from "./ops.js";
import { checkpoint } from "./undo.js";
import { announce } from "./announce.js";
import { onEditEntry } from "./hax-fixes.js";
import { getEditRange, setEditRange } from "../ui/edit-selection.js";
import { describeUnit, nameTagKeydown, runsAlong, ringOf, railTopOf, RAIL_X } from "./selection-label.js";

const icon = (name) =>
  html`<span class="icon" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[`oer:${name}`] || ""}&quot;)"></span>`;

const DRAG_THRESHOLD = 4;
const SCROLL_EDGE = 48;
// the handle's buttons: 24px targets (spec §7.4)
const STEP = 24;
// how long after a click in the content a unit selected as a whole takes
// focus on its name tag
const CLICK_WINDOW = 1500;

const haxStore = () => globalThis.HaxStore?.requestAvailability?.() ?? null;
const rail = () => globalThis.document.querySelector("oer-block-rail");

// focus as the person sees it, inside shadow roots
function deepActive() {
  let el = globalThis.document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el;
}

// whether a block has settings to show: HAX's fields for it (until
// editor-redesign WP-13's block-settings.js hasSettings, which curates them,
// takes this one's place)
function hasSettings(node) {
  const settings = haxStore()?.haxSchemaFromTag?.(node.localName)?.settings || {};
  return [...(settings.configure || []), ...(settings.advanced || [])].length > 0;
}

// the first control that takes focus in an element, through its shadow root
function firstFocusable(el) {
  if (!el) return null;
  const pick = (root) => root?.querySelector?.('[tabindex="0"], button:not([disabled]):not([tabindex="-1"]), a[href], input:not([type=hidden])');
  const found = pick(el.shadowRoot) || pick(el);
  return found?.shadowRoot ? firstFocusable(found) || found : found;
}

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
// what of a unit's description the label draws (not the elements)
const drawn = (info) => info && { name: info.name, said: info.said, crumbs: info.crumbs.map((c) => c.label), chips: info.chips.map((c) => c.id + c.label) };

class OerBlockFrame extends LitElement {
  static get tag() {
    return "oer-block-frame";
  }

  static get properties() {
    return {
      _info: { state: true }, // the selected unit's name, levels and state (selection-label.js)
      _action: { state: true }, // the block's own button, if its class has a frameAction
      _drag: { state: true },
      _layout: { state: true },
      _guides: { state: true },
      _menu: { state: true },
      _tools: { state: true }, // { settings, layout }: the label's buttons for an ordinary block
      _handle: { state: true }, // { up, down, grip, along, upWhy, downWhy, gripWhy }
      _field: { state: true }, // the typed field's ring, or null
    };
  }

  constructor() {
    super();
    this._info = null;
    this._drag = null; // { x, y, slot, valid }
    this._layout = null; // the grid-plate around (or being) the selected unit
    this._guides = []; // outlines for layouts and their columns
    this._menu = false;
    this._tools = { settings: false, layout: false };
    this._handle = null;
    this._field = null;
    this.__unit = null;
    this.__labelSize = { width: 0, height: 24 };
    this.__changed = () => this._sync();
    this.__focusRequest = (e) => {
      if (this._focusTag(e.detail?.unit)) e.preventDefault();
    };
    this.__outside = (e) => {
      if (this._menu && !e.composedPath().includes(this)) this._menu = false;
    };
    this.__pointer = (e) => {
      const body = haxStore()?.activeHaxBody;
      if (e.button === 0 && body && e.composedPath().includes(body)) this.__clicked = performance.now();
    };
    this.__keys = (e) => this._windowKeys(e);
    this.__escape = (e) => this._escapeInText(e);
    this.__listening = new WeakSet();
  }

  connectedCallback() {
    super.connectedCallback();
    this.hidden = true;
    editorState.addEventListener("change", this.__changed);
    editorState.addEventListener("focusrequest", this.__focusRequest);
    globalThis.addEventListener("keydown", this.__keys, true);
    globalThis.addEventListener("pointerdown", this.__outside, true);
    globalThis.addEventListener("pointerdown", this.__pointer, true);
    // (after the fields' own keys, editor/field-keys.js, which take Escape
    // in a section's fields)
    onEditEntry((body) => {
      if (this.__listening.has(body)) return;
      this.__listening.add(body);
      body.addEventListener("keydown", (e) => this.isConnected && this.__escape(e), true);
    });
    this._sync();
  }

  disconnectedCallback() {
    editorState.removeEventListener("change", this.__changed);
    editorState.removeEventListener("focusrequest", this.__focusRequest);
    globalThis.removeEventListener("keydown", this.__keys, true);
    globalThis.removeEventListener("pointerdown", this.__outside, true);
    globalThis.removeEventListener("pointerdown", this.__pointer, true);
    super.disconnectedCallback();
  }

  /* ---------- following the editor's state ---------- */

  _sync() {
    const s = editorState;
    const unit = s.unit;
    const off = !s.editing || !s.geometry || !unit?.isConnected || s.preview || s.saving || policyOf(unit).kind === "break" || !!s.body?.hasAttribute("data-oer-preview");
    if (off && !this._drag) {
      this._clear();
      return;
    }
    if (!off) this._place(unit, s.geometry, s.mode);
    if (this._drag) this._dragFrame();
    this._clickedSelect(unit, s.mode);
  }

  _clear() {
    if (this.hidden && !this.__unit) return;
    this.hidden = true;
    this.__unit = null;
    this._info = null;
    this._menu = false;
    this._field = null;
    this._guides = [];
    this.__guideKey = "";
  }

  // a click in the content that selected a unit as a whole: focus goes to
  // its name tag (spec §4.1), unless the click gave it to a control
  _clickedSelect(unit, mode) {
    const was = this.__seen;
    this.__seen = { unit, mode };
    if (mode !== "selected" || !unit || (was?.unit === unit && was?.mode === mode)) return;
    if (!this.__clicked || performance.now() - this.__clicked > CLICK_WINDOW) return;
    this.__clicked = 0;
    const focus = deepActive();
    if (!focus || focus === globalThis.document.body || focus === editorState.body) this._focusTag(unit);
  }

  // where everything goes, for unit at geometry g (the store's, or measured now)
  _place(unit, g, mode) {
    // (a block put in columns stays the same block in a new place)
    if (unit !== this.__unit || unit.parentElement !== this.__parent) {
      this.__unit = unit;
      this.__parent = unit.parentElement;
      this._menu = false;
      const policy = policyOf(unit);
      const block = policy.kind !== "section" && policy.kind !== "item";
      this._layout = layoutOf(editorState.body, unit);
      this._action = unit.constructor?.frameAction || null;
      // an ordinary block's own settings and columns; a section, its items
      // and what they hold have neither (nothing of theirs is set in settings,
      // and sections never go in columns)
      this._tools = { settings: block && hasSettings(unit), layout: block };
      this._handle = this._handleFor(unit);
    }
    const info = describeUnit(unit);
    if (!same(drawn(info), drawn(this._info))) {
      this._info = info;
      // (its place among the others changes the reasons)
      this._handle = this._handleFor(unit);
    }
    this.hidden = false;
    this.toggleAttribute("docked", !!g.dock);
    const view = g.view;
    const ring = ringOf(unit, g);
    const s = this.style;
    const px = (name, v) => s.setProperty(name, `${Math.round(v)}px`);
    // clipped to the content view
    s.setProperty("--clip", `${Math.round(view.top)}px ${Math.round(globalThis.innerWidth - view.right)}px ${Math.round(globalThis.innerHeight - view.bottom)}px ${Math.round(view.left)}px`);
    px("--top", ring.top);
    px("--left", ring.left);
    px("--width", ring.right - ring.left);
    px("--height", ring.bottom - ring.top);
    this.toggleAttribute("inset", ring.inset);
    // the field being typed in, ringed for focus (spec §4.7)
    const field = mode === "typing" && g.field ? g.field : null;
    if (!same(field, this._field)) this._field = field;

    // the label: on the ring's top-right, outside it when there's room above
    // (inside for a unit as wide as the page), and kept in the view
    const { width: lw, height: lh } = this.__labelSize;
    const visTop = Math.max(ring.top, view.top);
    const outside = !ring.inset && ring.top - lh >= view.top;
    const labelTop = outside ? ring.top - lh : Math.min(visTop, Math.max(ring.top, ring.bottom - lh));
    px("--label-top", labelTop);
    px("--label-left", Math.max(view.left + 4, ring.right - lw));
    this.toggleAttribute("label-inside", !outside);

    // the handle, at the visible middle of the unit, beside the ring
    const h = this._handle;
    const count = h ? (h.grip ? 1 : 0) + (h.steps ? 2 : 0) : 0;
    const height = count * STEP + 4;
    const visBottom = Math.min(ring.bottom, view.bottom);
    let top = (visTop + visBottom) / 2 - height / 2;
    top = Math.max(visTop, Math.min(top, visBottom - height));
    let left = ring.inset ? ring.left + 2 : ring.left - STEP + 2;
    // a unit as wide as the page has its handle inside its left edge, where
    // the rail is too: below the rail, or beside it when there's no room
    const r = rail()?.railSize;
    if (ring.inset && r && !g.dock) {
      const railTop = railTopOf(ring, view, r.height);
      const railBottom = railTop + r.height;
      if (top < railBottom + 6 && top + height > railTop - 6) {
        if (railBottom + 6 + height <= visBottom) top = railBottom + 6;
        else left = view.left + RAIL_X + r.width + 6;
      }
    }
    px("--handle-top", top);
    px("--handle-left", left);
    this.toggleAttribute("offscreen", !g.visible);

    this._updateGuides();
  }

  // what the handle offers for a unit: its steps (with the reasons they're
  // off) and its grip (not for an item, which stays in its section)
  _handleFor(unit) {
    const policy = policyOf(unit);
    const along = runsAlong(unit);
    const upWhy = ops.whyNot("move", unit, { dir: -1 });
    const downWhy = ops.whyNot("move", unit, { dir: 1 });
    const draggable = policy.kind !== "item";
    return {
      along,
      steps: true,
      grip: draggable,
      gripWhy: policy.pin ? upWhy || downWhy : "",
      upWhy,
      downWhy,
    };
  }

  // the selected unit's layout and its columns; every layout while dragging
  _updateGuides() {
    const body = editorState.body;
    const grids = this._drag ? [...(body?.querySelectorAll("grid-plate") || [])] : this._layout?.isConnected ? [this._layout] : [];
    const round = (r) => ({ top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) });
    const guides = grids
      .filter((g) => g.getClientRects().length)
      .map((g) => {
        const box = round(g.getBoundingClientRect());
        const cols = columnRects(g).map(round);
        // a dashed divider between neighbouring columns: vertical when they
        // sit side by side, horizontal when the layout has stacked them
        const dividers = [];
        for (let i = 1; i < cols.length; i++) {
          const a = cols[i - 1];
          const b = cols[i];
          if (b.left >= a.left + a.width - 1) {
            dividers.push({ left: Math.round((a.left + a.width + b.left) / 2), top: box.top, width: 0, height: box.height });
          } else {
            dividers.push({ left: box.left, top: Math.round((a.top + a.height + b.top) / 2), width: box.width, height: 0 });
          }
        }
        return { ...box, count: columnCount(g), cols, dividers };
      });
    const key = JSON.stringify(guides);
    if (key !== this.__guideKey) {
      this.__guideKey = key;
      this._guides = guides;
    }
  }

  /* ---------- the name tag ---------- */

  /**
   * Focus on a unit's name tag (in the dock, the rail's): drawn for it now,
   * as the editor's state may not have caught up with a selection just
   * made. Returns whether one takes it.
   */
  _focusTag(unit) {
    if (!unit?.isConnected || !editorState.editing) return false;
    if (editorState.geometry?.dock) return !!rail()?.focusTag?.(unit);
    const r = unit.getBoundingClientRect();
    const view = contentView();
    const visible = r.bottom > view.top && r.top < view.bottom ? r : null;
    this._place(unit, { view, unit: r, visible, field: null, dock: false }, "selected");
    this.updateComplete.then(() => this.shadowRoot.querySelector(".tag")?.focus({ preventScroll: true }));
    return true;
  }

  // the unit's actions (Shift+F10): the rail's menu for it, focus back here
  _actions() {
    const unit = this.__unit;
    rail()?.openActions?.(unit, () => this._focusTag(unit));
  }

  _tagKeys(e) {
    if (nameTagKeydown(e, this.__unit, { actions: () => this._actions() })) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  /* ---------- keys ---------- */

  _windowKeys(e) {
    if (this._menu && e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      this._menu = false;
      this.updateComplete.then(() => this.shadowRoot.querySelector(".lay[aria-haspopup=menu]")?.focus());
      return;
    }
    if (this._drag && e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      this._endDrag(false);
      return;
    }
    this._regionKeys(e);
  }

  // Escape while typing in an ordinary block's text: the block, selected
  // as a whole (a section's fields have their own, cs-keys.js)
  _escapeInText(e) {
    if (e.key !== "Escape" || e.defaultPrevented || e.isComposing || e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) return;
    const { mode, unit, editing } = editorState;
    if (!editing || mode !== "typing" || !unit?.isConnected) return;
    // (HAX's command palette takes it first)
    if (globalThis.SuperDaemonManager?.requestAvailability?.()?.opened) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    ops.select(unit);
  }

  // Ctrl+` (or F6): the next region; with Shift, the one before
  _regionKeys(e) {
    const chord = e.code === "Backquote" && e.ctrlKey && !e.metaKey && !e.altKey;
    const f6 = e.key === "F6" && !e.ctrlKey && !e.metaKey && !e.altKey;
    if ((!chord && !f6) || !editorState.editing || e.defaultPrevented) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    const path = e.composedPath();
    const body = editorState.body;
    const theme = globalThis.document.querySelector("custom-oer-docs-theme");
    const bar = theme?.shadowRoot?.querySelector("oer-edit-bar") || theme?.shadowRoot?.querySelector("header.topbar");
    const sheet = globalThis.document.querySelector("oer-site-outline") || theme?.shadowRoot?.querySelector("oer-site-outline");
    const shown = (el) => !!el?.isConnected && !el.hidden && el.checkVisibility?.() !== false && !el.hasAttribute("inert");
    const unit = editorState.unit;
    const regions = [
      { id: "bar", here: (n) => n === bar, go: () => firstFocusable(bar)?.focus(), can: () => shown(bar) && !!firstFocusable(bar) },
      { id: "sheet", here: (n) => n === sheet, go: () => (typeof sheet.focusTree === "function" ? sheet.focusTree() : firstFocusable(sheet)?.focus()), can: () => shown(sheet) && !!firstFocusable(sheet) },
      { id: "selection", here: (n) => n === this || n === rail(), go: () => this._focusTag(unit), can: () => !!unit?.isConnected },
      { id: "content", here: (n) => n === body, go: () => this._toContent(unit), can: () => !!body },
    ];
    const at = regions.findIndex((r) => path.some((n) => r.here(n)));
    // leaving the content: where the caret was, to come back to
    if (regions[at]?.id === "content") this.__caret = getEditRange(body);
    // (from outside them all: the first, or with Shift the last)
    const step = e.shiftKey ? -1 : 1;
    const n = regions.length;
    const from = at >= 0 ? at : step > 0 ? -1 : n;
    for (let i = 1; i <= n; i++) {
      const next = regions[(((from + step * i) % n) + n) % n];
      if (next.can()) {
        next.go();
        return;
      }
    }
  }

  // back into the content: the caret where it was, or into the unit's first field
  _toContent(unit) {
    const body = editorState.body;
    if (!body) return;
    const at = this.__caret;
    this.__caret = null;
    if (at?.startContainer.isConnected && body.contains(at.startContainer)) {
      body.focus({ preventScroll: true });
      setEditRange(at);
      return;
    }
    const field = unit && (unit.matches(TEXT_FIELDS) ? unit : unit.querySelector(TEXT_FIELDS));
    if (field) ops.caretInto(field);
    else body.focus({ preventScroll: true });
  }

  /* ---------- layouts ---------- */

  // actions re-read the layout rather than trusting the copy drawn
  _currentLayout() {
    const node = this.__unit;
    return node ? layoutOf(editorState.body, node) : null;
  }

  _selectLayout() {
    const grid = this._currentLayout();
    this._menu = false;
    if (grid) ops.select(grid);
  }

  async _chooseLayout(key) {
    const hax = haxStore();
    const node = this.__unit;
    this._menu = false;
    if (!hax || !node) return;
    const layout = this._currentLayout();
    if (layout) {
      setLayout(layout, key);
      // an empty paragraph in a column that went goes with it
      if (!node.isConnected) hax.activeNode = layout;
    } else {
      const grid = await wrapInColumns(hax, node, key);
      if (grid) {
        this.__unit = null; // the layout is read again
        hax.activeNode = node;
      }
    }
  }

  _removeLayout() {
    const hax = haxStore();
    const grid = this._currentLayout();
    this._menu = false;
    if (!hax || !grid) return;
    const keep = this.__unit === grid ? null : this.__unit;
    const first = removeLayout(grid);
    this.__unit = null;
    // (an empty paragraph goes with the layout)
    hax.activeNode = keep?.isConnected ? keep : first;
  }

  /* ---------- moving ---------- */

  _move(dir) {
    const unit = this.__unit;
    if (unit) ops.move(unit, dir);
  }

  _gripKeys(e) {
    const along = this._handle?.along;
    const back = e.key === "ArrowUp" || (along && e.key === "ArrowLeft");
    const on = e.key === "ArrowDown" || (along && e.key === "ArrowRight");
    if (back || on) {
      e.preventDefault();
      e.stopPropagation();
      this._move(back ? -1 : 1);
    }
  }

  _pointerDown(e) {
    if (e.button !== 0 || this._handle?.gripWhy) return;
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // synthetic events have no active pointer to capture
    }
    this.__press = { x: e.clientX, y: e.clientY, id: e.pointerId };
  }

  _pointerMove(e) {
    if (!this.__press) return;
    const moved = Math.hypot(e.clientX - this.__press.x, e.clientY - this.__press.y);
    if (!this._drag && moved < DRAG_THRESHOLD) return;
    if (!this._drag) editorState.set({ dragging: true });
    this._drag = { ...(this._drag || {}), x: e.clientX, y: e.clientY };
    this._dragFrame();
  }

  _pointerUp(e) {
    if (!this.__press) return;
    this.__press = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // already released
    }
    if (this._drag) this._endDrag(true);
  }

  // the slots a unit may be dropped in: not inside itself, nor the two
  // beside it; not in columns for one that never goes in them (a section);
  // never before a unit pinned first or after one pinned last
  _slotsFor(node) {
    const { columns } = policyOf(node);
    return computeSlots(editorState.body).filter(
      (s) => !node.contains(s.container) && (columns || !s.nested) && !(s.before && policyOf(s.before).pin === "first") && !(s.after && policyOf(s.after).pin === "last"),
    );
  }

  // as the pointer moves, and as the page scrolls under it: auto-scroll
  // near the edges, and pick the drop slot
  _dragFrame() {
    const d = this._drag;
    const node = this.__unit;
    if (!d || !node?.isConnected) return;
    const view = contentView();
    const step = d.y < view.top + SCROLL_EDGE ? -Math.ceil((view.top + SCROLL_EDGE - d.y) / 4) : d.y > view.bottom - SCROLL_EDGE ? Math.ceil((d.y - view.bottom + SCROLL_EDGE) / 4) : 0;
    if (step) {
      const main = globalThis.document.querySelector("custom-oer-docs-theme")?.shadowRoot?.querySelector("main");
      if (editorState.geometry?.scroller === "main" && main) main.scrollTop += step;
      else globalThis.scrollBy(0, step);
    }
    const slot = nearestSlot(this._slotsFor(node), d.x, d.y);
    const valid = !!slot && slot.before !== node && slot.after !== node;
    if (!sameSlot(slot, d.slot) || valid !== d.valid || !d.rect || d.rect.top !== Math.round(slot?.top)) {
      this._drag = {
        ...d,
        slot,
        valid,
        rect: slot && { top: Math.round(slot.top), left: Math.round(slot.left), width: Math.round(slot.width), height: Math.round(slot.height) },
      };
    }
    this._updateGuides();
  }

  async _endDrag(drop) {
    const d = this._drag;
    this._drag = null;
    editorState.set({ dragging: false });
    const node = this.__unit;
    const body = editorState.body;
    if (!drop || !d?.slot || !d.valid || !node || !body) return;
    // one undo step, named
    checkpoint(body);
    body.___moveLock = true;
    placeInSlot(node, d.slot);
    await ops.settled(body);
    body.___moveLock = false;
    checkpoint(body, `moved ${phraseOf(node)}`);
    const hax = haxStore();
    if (hax) hax.activeNode = node;
    node.scrollIntoView?.({ block: "nearest" });
    announce(`${phraseOf(node, { start: true })} moved`);
  }

  /* ---------- render ---------- */

  static get styles() {
    return css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 9985;
        pointer-events: none;
        font-family: var(--font-sans, system-ui, sans-serif);
        /* everything stays in the content view: below the editing bar, above the dock */
        clip-path: inset(var(--clip, 0 0 0 0));
        --r: var(--radius-md, 0.5rem);
      }
      :host([hidden]) {
        display: none;
      }
      .ring,
      .field-ring,
      .handle,
      .label {
        position: fixed;
        box-sizing: border-box;
      }
      /* two-tone: the primary ring between halos of the page's background,
         so it shows on any section's colour */
      .ring {
        top: var(--top);
        left: var(--left);
        width: var(--width);
        height: var(--height);
        border: 2px solid var(--primary);
        border-radius: var(--r);
        box-shadow:
          0 0 0 1px var(--background),
          inset 0 0 0 1px var(--background);
      }
      :host([inset]) .ring {
        border-radius: var(--radius-sm);
      }
      .field-ring {
        border-radius: var(--radius-sm);
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
      .handle {
        pointer-events: auto;
        top: var(--handle-top);
        left: var(--handle-left);
        width: ${STEP}px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2px 0;
        background: var(--primary);
        color: var(--primary-foreground);
        border-radius: var(--r);
        box-shadow: 0 0 0 1px var(--background);
      }
      :host([docked]) .handle,
      :host([docked]) .label,
      :host([docked]) .menu,
      :host([offscreen]) .handle {
        display: none;
      }
      button {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: var(--radius-sm);
      }
      button:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .handle button {
        width: ${STEP}px;
        height: ${STEP}px;
      }
      .handle button:hover {
        background: color-mix(in oklab, var(--primary-foreground) 18%, transparent);
      }
      .handle button[aria-disabled="true"] {
        cursor: default;
        opacity: 0.55;
        background: transparent;
      }
      .grip {
        cursor: grab;
        touch-action: none;
      }
      :host([dragging]) .grip {
        cursor: grabbing;
      }
      .icon {
        width: 0.875rem;
        height: 0.875rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      /* the label: [settings] What you'll learn › Outcome 2 of 3 [chips] */
      .label {
        pointer-events: auto;
        top: var(--label-top);
        left: var(--label-left);
        display: flex;
        align-items: center;
        gap: 0.125rem;
        max-width: calc(100vw - 1rem);
        height: 1.75rem;
        padding: 0 0.125rem;
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1.25rem;
        white-space: nowrap;
        color: var(--primary-foreground);
        background: var(--primary);
        border-radius: var(--radius-sm) var(--radius-sm) 0 0;
      }
      :host([label-inside]) .label {
        border-radius: 0 0 var(--radius-sm) var(--radius-sm);
      }
      .label button {
        height: 1.5rem;
        padding: 0 0.375rem;
        font: inherit;
        color: inherit;
      }
      .label button:hover {
        background: color-mix(in oklab, var(--primary-foreground) 18%, transparent);
      }
      .label button:focus-visible {
        outline-color: var(--primary-foreground);
        outline-offset: -2px;
      }
      .label button.chip:focus-visible {
        outline-color: var(--primary);
      }
      .label .lay {
        width: 1.5rem;
        padding: 0;
      }
      .label .crumb {
        font-weight: 500;
      }
      .label .sep {
        padding: 0 0.125rem;
      }
      /* state chips: the label's colours the other way round */
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        height: 1.25rem;
        margin: 0 0.125rem 0 0.25rem;
        padding: 0 0.5rem;
        border-radius: 999px;
        font-weight: 500;
        color: var(--primary);
        background: var(--primary-foreground);
      }
      .label button.chip {
        height: 1.5rem;
        padding: 0 0.5rem;
        border-radius: 999px;
        color: var(--primary);
      }
      .label button.chip:hover {
        background: color-mix(in oklab, var(--primary) 12%, var(--primary-foreground));
      }
      .chip .icon,
      .label .act .icon {
        width: 0.75rem;
        height: 0.75rem;
      }
      .label .act {
        gap: 0.25rem;
      }

      /* layout guides: the layout around the selection, and its columns */
      .guide,
      .col {
        position: fixed;
        box-sizing: border-box;
        border-radius: var(--radius-sm);
      }
      .guide {
        border: 1px dashed color-mix(in oklab, var(--primary) 70%, transparent);
      }
      .col {
        background: color-mix(in oklab, var(--primary) 4%, transparent);
      }
      .divider {
        position: fixed;
        box-sizing: border-box;
        border-left: 1px dashed color-mix(in oklab, var(--primary) 60%, transparent);
        border-top: 1px dashed color-mix(in oklab, var(--primary) 60%, transparent);
      }
      .divider.v {
        border-top: 0;
      }
      .divider.h {
        border-left: 0;
      }
      .tab {
        position: absolute;
        top: 0;
        left: 0.5rem;
        transform: translateY(-50%);
        padding: 0 0.375rem;
        font-size: 0.6875rem;
        font-weight: 600;
        line-height: 1.125rem;
        white-space: nowrap;
        color: var(--primary);
        background: var(--background);
        border: 1px solid color-mix(in oklab, var(--primary) 70%, transparent);
        border-radius: 999px;
      }

      /* layout menu (shadcn DropdownMenu) */
      .menu {
        pointer-events: auto;
        position: fixed;
        top: calc(var(--label-top) + 1.5rem);
        left: max(0.5rem, calc(var(--left) + var(--width) - 16rem));
        width: 16rem;
        box-sizing: border-box;
        padding: 0.25rem;
        color: var(--popover-foreground);
        background: var(--popover);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
      }
      .menu .head {
        padding: 0.375rem 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--muted-foreground);
      }
      .presets {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.25rem;
        padding: 0.25rem;
      }
      .menu .presets button {
        height: 2.25rem;
        padding: 0.375rem;
        border: 1px solid var(--border);
        display: flex;
        gap: 2px;
      }
      .menu .presets button:hover {
        border-color: var(--primary);
        background: var(--accent);
      }
      .menu .presets button[aria-checked="true"] {
        border-color: var(--primary);
        box-shadow: inset 0 0 0 1px var(--primary);
      }
      .bar {
        height: 100%;
        border-radius: 2px;
        background: color-mix(in oklab, var(--foreground) 35%, transparent);
      }
      .menu .presets button[aria-checked="true"] .bar {
        background: var(--primary);
      }
      .menu .sepline {
        height: 1px;
        margin: 0.25rem -0.25rem;
        background: var(--border);
      }
      .menu .item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        height: 2rem;
        padding: 0 0.5rem;
        font-size: 0.875rem;
        justify-content: flex-start;
      }
      .menu .item:hover {
        background: var(--accent);
        color: var(--accent-foreground);
      }
      .menu .icon {
        width: 1rem;
        height: 1rem;
      }
      /* while dragging: the unit's ring goes quiet, the target slot lights up */
      :host([dragging]) .ring {
        border-style: dashed;
        background: color-mix(in oklab, var(--primary) 6%, transparent);
      }
      .drop {
        position: fixed;
        box-sizing: border-box;
        border: 2px solid var(--primary);
        border-radius: var(--radius-sm);
        background: color-mix(in oklab, var(--primary) 14%, transparent);
      }
      .ghost {
        position: fixed;
        transform: translate(12px, 12px);
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--popover-foreground);
        background: var(--popover);
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
        white-space: nowrap;
      }
      @media (forced-colors: active) {
        .ring,
        .drop {
          border-color: Highlight;
        }
        .field-ring {
          outline-color: Highlight;
        }
        .handle,
        .label {
          border: 1px solid ButtonText;
        }
      }
    `;
  }

  updated(changed) {
    if (changed.has("_drag")) this.toggleAttribute("dragging", !!this._drag);
    // the label's size, for placing it (it's drawn before it's measured)
    const label = this.shadowRoot.querySelector(".label");
    if (label && label.offsetWidth) {
      const size = { width: label.offsetWidth, height: label.offsetHeight };
      if (!same(size, this.__labelSize)) {
        this.__labelSize = size;
        this._sync();
      }
    }
    // the layout menu opens below the label; lift it if it runs off-screen
    const menu = this.shadowRoot.querySelector(".menu");
    if (menu) {
      menu.style.marginTop = "0px";
      const r = menu.getBoundingClientRect();
      const over = r.bottom - (globalThis.innerHeight - 8);
      if (over > 0) menu.style.marginTop = `${-Math.min(over, r.top - 8)}px`;
    }
  }

  _renderLabel() {
    const info = this._info;
    if (!info) return "";
    const unit = this.__unit;
    const inLayout = this._layout && this._layout !== unit;
    return html`<div class="label" role="toolbar" aria-label="Selection" @mousedown="${(e) => e.preventDefault()}">
      ${info.crumbs.map(
        (c) => html`<button class="crumb" tabindex="-1" title="Select ${c.label}" @click="${() => ops.select(c.unit)}">${c.label}</button
          ><span class="sep" aria-hidden="true">›</span>`,
      )}
      <button class="tag" aria-label="${info.said}" title="${info.name}: Enter edits it, arrows go to others, Shift+F10 for its actions" @keydown="${this._tagKeys}">
        ${info.name}
      </button>
      ${info.chips.map((c) =>
        c.run
          ? html`<button class="chip" tabindex="-1" title="${c.label}: open it" @click="${() => c.run()}">${c.label}${icon("arrow-right")}</button>`
          : html`<span class="chip">${c.label}</span>`,
      )}
      ${this._tools.settings
        ? html`<button
            class="lay"
            tabindex="-1"
            title="Block settings"
            aria-label="Block settings"
            aria-haspopup="dialog"
            @click="${(e) => {
              this._menu = false;
              // (the button to give focus back to: Safari doesn't focus a clicked button)
              settingsDialog().open("settings", e.currentTarget);
            }}"
          >
            ${icon("sliders-horizontal")}
          </button>`
        : ""}
      ${this._tools.layout
        ? html`<button
            class="lay"
            tabindex="-1"
            title="Layout options"
            aria-label="Layout options"
            aria-haspopup="menu"
            aria-expanded="${this._menu ? "true" : "false"}"
            @click="${() => (this._menu = !this._menu)}"
          >
            ${icon("columns-2")}
          </button>`
        : ""}
      ${inLayout && !info.crumbs.some((c) => c.unit === this._layout)
        ? html`<button class="crumb" tabindex="-1" title="Select the column layout" @click="${this._selectLayout}">Columns</button>`
        : ""}
      ${this._action
        ? html`<button
            class="act"
            tabindex="-1"
            @click="${() => {
              this._menu = false;
              this._action.run(unit);
            }}"
          >
            ${icon(this._action.icon)}${this._action.label}
          </button>`
        : ""}
    </div>`;
  }

  _renderMenu() {
    const grid = this._layout;
    const presets = layoutPresets(grid).filter((p) => grid || p.key !== "1");
    return html`<div class="menu" role="menu" aria-label="Layout" @mousedown="${(e) => e.preventDefault()}">
      <div class="head" aria-hidden="true">${grid ? "Column layout" : "Put in columns"}</div>
      <div class="presets" role="group" aria-label="Column presets">
        ${presets.map(
          (p) => html`<button
            role="menuitemradio"
            aria-checked="${grid?.layout === p.key ? "true" : "false"}"
            title="${p.label}"
            aria-label="${p.ratios.length} columns: ${p.label}"
            @click="${() => this._chooseLayout(p.key)}"
          >
            ${p.ratios.map((r) => html`<span class="bar" style="flex:${r}"></span>`)}
          </button>`,
        )}
      </div>
      ${grid
        ? html`<div class="sepline" role="separator"></div>
            ${grid !== this.__unit ? html`<button class="item" role="menuitem" @click="${this._selectLayout}">${icon("box")} Select layout</button>` : ""}
            <button class="item" role="menuitem" @click="${this._removeLayout}">${icon("panel-right-close")} Remove layout, keep blocks</button>`
        : ""}
    </div>`;
  }

  _renderHandle() {
    const h = this._handle;
    if (!h) return "";
    const [back, on] = h.along ? ["Move earlier", "Move later"] : ["Move up", "Move down"];
    const step = (label, why, dir, name) =>
      html`<button
        class="step"
        tabindex="-1"
        aria-label="${label}"
        title="${why ? `${label}: ${why}` : label}"
        aria-disabled="${why ? "true" : "false"}"
        @click="${() => !why && this._move(dir)}"
      >
        ${icon(name)}
      </button>`;
    return html`<div class="handle" role="group" aria-label="Move ${this._info?.name || "it"}" @mousedown="${(e) => e.preventDefault()}">
      ${step(back, h.upWhy, -1, h.along ? "chevron-left" : "chevron-up")}
      ${h.grip
        ? html`<button
            class="grip"
            tabindex="-1"
            title="${h.gripWhy ? `Drag to move: ${h.gripWhy}` : "Drag to move (or use the arrow keys)"}"
            aria-label="Drag to move, or press the arrow keys"
            aria-disabled="${h.gripWhy ? "true" : "false"}"
            @pointerdown="${this._pointerDown}"
            @pointermove="${this._pointerMove}"
            @pointerup="${this._pointerUp}"
            @pointercancel="${() => this._endDrag(false)}"
            @keydown="${this._gripKeys}"
          >
            ${icon("grip-vertical")}
          </button>`
        : ""}
      ${step(on, h.downWhy, 1, h.along ? "chevron-right" : "chevron-down")}
    </div>`;
  }

  render() {
    const d = this._drag;
    const f = this._field;
    return html`
      ${this._guides.map(
        (g) => html`${g.cols.map((c) => html`<div class="col" style="top:${c.top}px;left:${c.left}px;width:${c.width}px;height:${c.height}px"></div>`)}
          ${g.dividers.map((v) => html`<div class="divider ${v.width ? "h" : "v"}" style="top:${v.top}px;left:${v.left}px;width:${v.width}px;height:${v.height}px"></div>`)}
          <div class="guide" style="top:${g.top - 6}px;left:${g.left - 6}px;width:${g.width + 12}px;height:${g.height + 12}px">
            <span class="tab">Columns · ${g.count}</span>
          </div>`,
      )}
      <div class="ring"></div>
      ${f ? html`<div class="field-ring" style="top:${f.top}px;left:${f.left}px;width:${f.right - f.left}px;height:${f.bottom - f.top}px"></div>` : ""}
      ${this._renderLabel()} ${this._menu && this._tools.layout ? this._renderMenu() : ""} ${this._renderHandle()}
      ${d?.valid && d.rect ? html`<div class="drop" style="top:${d.rect.top}px;left:${d.rect.left}px;width:${d.rect.width}px;height:${d.rect.height}px"></div>` : ""}
      ${d ? html`<div class="ghost" style="left:${d.x}px;top:${d.y}px">${this._info?.name || ""}</div>` : ""}
    `;
  }
}
customElements.define(OerBlockFrame.tag, OerBlockFrame);
