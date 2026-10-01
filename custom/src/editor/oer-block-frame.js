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
 * Replaces HAX's outline on [data-hax-active] (see editor-skin.js) and the
 * floating drag menu in hax-plate-context.
 * @element oer-block-frame
 */
import { html, css, LitElement } from "../lit.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { LUCIDE_ICONS } from "./lucide-icons.generated.js";
import { contentViewport, pressPlate } from "./stock.js";
import { HANDLE_WIDTH, frameRect, computeSlots, nearestSlot, placeInSlot, sameSlot } from "./slots.js";

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
    };
  }

  constructor() {
    super();
    this._label = "";
    this._drag = null; // { x, y, slot, valid }
    this.__tick = this._tick.bind(this);
    this.__keys = (e) => {
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
  }

  disconnectedCallback() {
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
      return;
    }
    if (node !== this.__node) {
      this.__node = node;
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

    if (this._drag) this._dragFrame();
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
      .label {
        top: var(--top);
        left: calc(var(--left) + var(--width));
        transform: translate(-100%, -100%);
        padding: 0.125rem 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1.25rem;
        white-space: nowrap;
        color: var(--primary-foreground);
        background: var(--primary);
        border-radius: var(--radius-sm) var(--radius-sm) 0 0;
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
  }

  render() {
    const d = this._drag;
    return html`
      <div class="ring"></div>
      <div class="label">${this._label}</div>
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
