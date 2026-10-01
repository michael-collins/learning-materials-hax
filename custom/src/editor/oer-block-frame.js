/**
 * `oer-block-frame` — the selection frame around the active block, with a
 * drag handle built into its left edge and the block's name on its top
 * right:
 *
 *        ┌────────────────────────── Paragraph ┐
 *      ╭─┤                                     │
 *      │↑│  selected block                     │
 *      │⠿│                                     │
 *      │↓│                                     │
 *      ╰─┴─────────────────────────────────────╯
 *
 * The handle is the frame's left side: rounded on its outer corners and
 * flush with the ring, which is square everywhere except bottom-right (the
 * label sits on the top-right). ↑ / ↓ move the block one step (HAX's own
 * move commands); dragging the grip moves it to any slot on the page,
 * including layout columns, shown with the same slot highlight the inserter
 * uses. Escape cancels a drag. The frame never takes pointer events except
 * on the handle, so the block stays editable.
 *
 * Layouts: when the block is inside a column layout (or is one), that
 * layout gets a dashed outline with a "Columns · n" tab and its columns are
 * outlined; while dragging, every layout is. The label becomes a
 * breadcrumb (▥ Columns › Paragraph): "Columns" selects the layout and ▥
 * opens the layout menu (presets, select, remove; or "put in columns" for
 * a block outside any layout).
 *
 * Replaces HAX's outline on [data-hax-active] (see editor-skin.js) and the
 * floating drag menu in hax-plate-context.
 * @element oer-block-frame
 */
import { html, css, LitElement } from "../lit.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { LUCIDE_ICONS } from "./lucide-icons.generated.js";
import { contentViewport, pressPlate } from "./stock.js";
import { HANDLE_WIDTH, frameRect, computeSlots, nearestSlot, placeInSlot, sameSlot } from "./slots.js";
import { layoutOf, columnRects, columnCount, layoutPresets, setLayout, wrapInColumns, removeLayout } from "./layouts.js";

const icon = (name) =>
  html`<span class="icon" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[`oer:${name}`] || ""}&quot;)"></span>`;

const DRAG_THRESHOLD = 4;
const SCROLL_EDGE = 48;

class OerBlockFrame extends LitElement {
  static get tag() {
    return "oer-block-frame";
  }

  static get properties() {
    return {
      _label: { state: true },
      _drag: { state: true },
      _layout: { state: true },
      _guides: { state: true },
      _menu: { state: true },
    };
  }

  constructor() {
    super();
    this._label = "";
    this._drag = null; // { x, y, slot, valid }
    this._layout = null; // the grid-plate around (or being) the active block
    this._guides = []; // outlines for layouts and their columns
    this._menu = false;
    this.__outside = (e) => {
      if (this._menu && !e.composedPath().includes(this)) this._menu = false;
    };
    this.__tick = this._tick.bind(this);
    this.__keys = (e) => {
      if (this._menu && e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        this._menu = false;
        return;
      }
      if (this._drag && e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        this._endDrag(false);
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.hidden = true;
    this.__raf = requestAnimationFrame(this.__tick);
    globalThis.addEventListener("keydown", this.__keys, true);
    globalThis.addEventListener("pointerdown", this.__outside, true);
  }

  disconnectedCallback() {
    globalThis.removeEventListener("pointerdown", this.__outside, true);
    cancelAnimationFrame(this.__raf);
    globalThis.removeEventListener("keydown", this.__keys, true);
    super.disconnectedCallback();
  }

  get _hax() {
    return globalThis.HaxStore?.requestAvailability?.();
  }

  // follow the active block every frame (reflow, scrolling, panel resizes)
  _tick() {
    this.__raf = requestAnimationFrame(this.__tick);
    const hax = this._hax;
    const node = store.editMode ? hax?.activeNode : null;
    if (!node || !node.isConnected || node.localName === "page-break") {
      this.hidden = true;
      this.__node = null;
      this._menu = false;
      return;
    }
    if (node !== this.__node) {
      this.__node = node;
      this._menu = false;
      this._layout = layoutOf(hax.activeHaxBody, node);
      const schema = hax.haxSchemaFromTag?.(node.localName);
      this._label = schema?.gizmo?.title || node.localName;
    }
    const f = frameRect(node);
    const view = contentViewport();
    if ((f.bottom < view.top || f.top > view.bottom || f.block.width === 0) && !this._drag) {
      this.hidden = true;
      return;
    }
    this.hidden = false;
    const s = this.style;
    s.setProperty("--top", `${Math.round(f.top)}px`);
    s.setProperty("--left", `${Math.round(f.left)}px`);
    s.setProperty("--width", `${Math.round(f.right - f.left)}px`);
    s.setProperty("--height", `${Math.round(f.height)}px`);
    // the grip stays in the visible part of a tall block
    const visTop = Math.max(f.top, view.top);
    const visBottom = Math.min(f.bottom, view.bottom);
    s.setProperty("--grip", `${Math.round((visTop + visBottom) / 2 - f.top)}px`);
    this.toggleAttribute("compact", f.compact);

    this._updateGuides();
    if (this._drag) this._dragFrame();
  }

  // the active layout's outline and columns; every layout while dragging
  _updateGuides() {
    const body = this._hax?.activeHaxBody;
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

  /* ---------- layouts ---------- */

  // actions re-read the layout rather than trusting the per-frame copy
  _currentLayout() {
    const hax = this._hax;
    const node = hax?.activeNode;
    return node ? layoutOf(hax.activeHaxBody, node) : null;
  }

  _selectLayout() {
    const hax = this._hax;
    const grid = this._currentLayout();
    if (hax && grid) hax.activeNode = grid;
    this._menu = false;
  }

  async _chooseLayout(key) {
    const hax = this._hax;
    const node = hax?.activeNode;
    this._menu = false;
    if (!hax || !node) return;
    const layout = this._currentLayout();
    if (layout) {
      setLayout(layout, key);
    } else {
      const grid = await wrapInColumns(hax, node, key);
      if (grid) {
        this.__node = null; // re-read the layout on the next frame
        hax.activeNode = node;
      }
    }
  }

  _removeLayout() {
    const hax = this._hax;
    const grid = this._currentLayout();
    this._menu = false;
    if (!hax || !grid) return;
    const keep = hax.activeNode === grid ? null : hax.activeNode;
    const first = removeLayout(grid);
    this.__node = null;
    hax.activeNode = keep || first;
  }

  /* ---------- move ---------- */

  _move(dir) {
    pressPlate(dir === "up" ? "hax-plate-up" : "hax-plate-down");
  }

  _gripKeys(e) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      this._move(e.key === "ArrowUp" ? "up" : "down");
    }
  }

  _pointerDown(e) {
    if (e.button !== 0) return;
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
    if (!this._drag) {
      globalThis.__oerDragging = true;
    }
    this._drag = { ...(this._drag || {}), x: e.clientX, y: e.clientY };
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

  // per frame while dragging: auto-scroll near the edges, pick the drop slot
  _dragFrame() {
    const d = this._drag;
    const view = contentViewport();
    const main = globalThis.document.querySelector("custom-oer-docs-theme")?.shadowRoot?.querySelector("main");
    if (main) {
      if (d.y < view.top + SCROLL_EDGE) main.scrollTop -= Math.ceil((view.top + SCROLL_EDGE - d.y) / 4);
      else if (d.y > view.bottom - SCROLL_EDGE) main.scrollTop += Math.ceil((d.y - view.bottom + SCROLL_EDGE) / 4);
    }
    const node = this.__node;
    // not inside itself, and not the two slots it already sits between
    const slots = computeSlots(this._hax?.activeHaxBody).filter((s) => !node.contains(s.container));
    const slot = nearestSlot(slots, d.x, d.y);
    const valid = !!slot && slot.before !== node && slot.after !== node;
    if (!sameSlot(slot, d.slot) || valid !== d.valid || !d.rect || d.rect.top !== Math.round(slot?.top)) {
      this._drag = {
        ...d,
        slot,
        valid,
        rect: slot && {
          top: Math.round(slot.top),
          left: Math.round(slot.left),
          width: Math.round(slot.width),
          height: Math.round(slot.height),
        },
      };
    }
  }

  _endDrag(drop) {
    const d = this._drag;
    this._drag = null;
    globalThis.__oerDragging = false;
    const node = this.__node;
    if (!drop || !d?.slot || !d.valid || !node) return;
    placeInSlot(node, d.slot);
    const hax = this._hax;
    if (hax) hax.activeNode = node;
    node.scrollIntoView?.({ block: "nearest" });
  }

  /* ---------- render ---------- */

  static get styles() {
    return css`
      :host {
        position: fixed;
        inset: 0 auto auto 0;
        z-index: 9990;
        pointer-events: none;
        font-family: var(--font-sans, system-ui, sans-serif);
        --r: var(--radius-md, 0.5rem);
      }
      :host([hidden]) {
        display: none;
      }
      .ring,
      .handle,
      .label {
        position: fixed;
        box-sizing: border-box;
      }
      /* square except bottom-right: the handle covers the left side and
         the label sits on the top-right */
      .ring {
        top: var(--top);
        left: var(--left);
        width: var(--width);
        height: var(--height);
        border: 2px solid var(--primary);
        border-radius: 0 0 var(--r) 0;
      }
      .handle {
        pointer-events: auto;
        top: var(--top);
        left: calc(var(--left) - ${HANDLE_WIDTH}px + 2px);
        width: ${HANDLE_WIDTH}px;
        height: var(--height);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        background: var(--primary);
        color: var(--primary-foreground);
        border-radius: var(--r) 0 0 var(--r);
      }
      button {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: ${HANDLE_WIDTH}px;
        height: 1.25rem;
        cursor: pointer;
        border-radius: var(--r);
      }
      button:hover {
        background: color-mix(in oklch, var(--primary-foreground) 18%, transparent);
      }
      button:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .grip {
        position: absolute;
        top: var(--grip);
        left: 0;
        margin-top: -0.625rem;
        cursor: grab;
        touch-action: none;
      }
      /* short blocks: just the grip; ↑ / ↓ remain in the rail's Block menu */
      :host([compact]) .step {
        display: none;
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
      /* breadcrumb label: [▥] Columns › Paragraph */
      .label {
        pointer-events: auto;
        top: var(--top);
        left: calc(var(--left) + var(--width));
        transform: translate(-100%, -100%);
        display: flex;
        align-items: center;
        gap: 0.125rem;
        height: 1.5rem;
        padding: 0 0.375rem 0 0.125rem;
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1.25rem;
        white-space: nowrap;
        color: var(--primary-foreground);
        background: var(--primary);
        border-radius: var(--radius-sm) var(--radius-sm) 0 0;
      }
      .label button {
        width: auto;
        height: 1.25rem;
        padding: 0 0.25rem;
        border-radius: var(--radius-sm);
        font: inherit;
        color: inherit;
      }
      .label .lay {
        width: 1.25rem;
        padding: 0;
      }
      .label .crumb {
        font-weight: 500;
        opacity: 0.85;
      }
      .label .sep {
        opacity: 0.7;
      }
      .label .sep .icon {
        width: 0.75rem;
        height: 0.75rem;
      }

      /* layout guides: the layout around the selection, and its columns */
      .guide,
      .col {
        position: fixed;
        box-sizing: border-box;
        border-radius: var(--radius-sm);
      }
      .guide {
        border: 1px dashed color-mix(in oklch, var(--primary) 70%, transparent);
      }
      .col {
        background: color-mix(in oklch, var(--primary) 4%, transparent);
      }
      .divider {
        position: fixed;
        box-sizing: border-box;
        border-left: 1px dashed color-mix(in oklch, var(--primary) 60%, transparent);
        border-top: 1px dashed color-mix(in oklch, var(--primary) 60%, transparent);
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
        border: 1px solid color-mix(in oklch, var(--primary) 70%, transparent);
        border-radius: 999px;
      }

      /* layout menu (shadcn DropdownMenu) */
      .menu {
        pointer-events: auto;
        position: fixed;
        top: var(--top);
        left: calc(var(--left) + var(--width));
        transform: translateX(-100%);
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
        width: auto;
        height: 2.25rem;
        padding: 0.375rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
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
        background: color-mix(in oklch, var(--foreground) 35%, transparent);
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
        border-radius: var(--radius-sm);
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
      /* while dragging: the block's frame goes quiet, the target slot lights up */
      :host([dragging]) .ring {
        border-style: dashed;
        background: color-mix(in oklch, var(--primary) 6%, transparent);
      }
      .drop {
        position: fixed;
        box-sizing: border-box;
        border: 2px solid var(--primary);
        border-radius: var(--radius-sm);
        background: color-mix(in oklch, var(--primary) 14%, transparent);
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
    `;
  }

  updated(changed) {
    if (changed.has("_drag")) this.toggleAttribute("dragging", !!this._drag);
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
    const inLayout = this._layout && this._layout !== this.__node;
    return html`<div class="label" @mousedown="${(e) => e.preventDefault()}">
      <button
        class="lay"
        title="Layout"
        aria-label="Layout options"
        aria-haspopup="menu"
        aria-expanded="${this._menu ? "true" : "false"}"
        @click="${() => (this._menu = !this._menu)}"
      >
        ${icon("columns-2")}
      </button>
      ${inLayout
        ? html`<button class="crumb" title="Select the column layout" @click="${this._selectLayout}">Columns</button>
            <span class="sep" aria-hidden="true">${icon("chevron-right")}</span>`
        : ""}
      <span>${this._label}</span>
    </div>`;
  }

  _renderMenu() {
    const grid = this._layout;
    const presets = layoutPresets(grid).filter((p) => grid || p.key !== "1");
    return html`<div class="menu" role="menu" aria-label="Layout" @mousedown="${(e) => e.preventDefault()}">
      <div class="head">${grid ? "Column layout" : "Put in columns"}</div>
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
        ? html`<div class="sepline"></div>
            ${grid !== this.__node
              ? html`<button class="item" role="menuitem" @click="${this._selectLayout}">${icon("box")} Select layout</button>`
              : ""}
            <button class="item" role="menuitem" @click="${this._removeLayout}">${icon("panel-right-close")} Remove layout, keep blocks</button>`
        : ""}
    </div>`;
  }

  render() {
    const d = this._drag;
    return html`
      ${this._guides.map(
        (g) => html`${g.cols.map(
            (c) => html`<div class="col" style="top:${c.top}px;left:${c.left}px;width:${c.width}px;height:${c.height}px"></div>`,
          )}
          ${g.dividers.map(
            (v) => html`<div
              class="divider ${v.width ? "h" : "v"}"
              style="top:${v.top}px;left:${v.left}px;width:${v.width}px;height:${v.height}px"
            ></div>`,
          )}
          <div class="guide" style="top:${g.top - 6}px;left:${g.left - 6}px;width:${g.width + 12}px;height:${g.height + 12}px">
            <span class="tab">Columns · ${g.count}</span>
          </div>`,
      )}
      <div class="ring"></div>
      ${this._renderLabel()}
      ${this._menu ? this._renderMenu() : ""}
      <div class="handle" @mousedown="${(e) => e.preventDefault()}">
        <button class="step" title="Move up" aria-label="Move block up" @click="${() => this._move("up")}">${icon("chevron-up")}</button>
        <button
          class="grip"
          title="Drag to move (or use the arrow keys)"
          aria-label="Move block: drag, or press the up and down arrow keys"
          @pointerdown="${this._pointerDown}"
          @pointermove="${this._pointerMove}"
          @pointerup="${this._pointerUp}"
          @pointercancel="${() => this._endDrag(false)}"
          @keydown="${this._gripKeys}"
        >
          ${icon("grip-vertical")}
        </button>
        <button class="step" title="Move down" aria-label="Move block down" @click="${() => this._move("down")}">${icon("chevron-down")}</button>
      </div>
      ${d?.valid && d.rect
        ? html`<div class="drop" style="top:${d.rect.top}px;left:${d.rect.left}px;width:${d.rect.width}px;height:${d.rect.height}px"></div>`
        : ""}
      ${d ? html`<div class="ghost" style="left:${d.x}px;top:${d.y}px">${this._label}</div>` : ""}
    `;
  }
}
customElements.define(OerBlockFrame.tag, OerBlockFrame);
