/**
 * `oer-toast` — Sonner-style notifications replacing haxcms-toast.
 * Bottom-right stack of cards, polite live region, no motion. duration 0
 * means the toast stays until dismissed (HAX uses that for "exit preview").
 * @element oer-toast
 */
import { html, css, LitElement } from "../lit.js";

const DEFAULT_DURATION = 4000;
let seq = 0;

class OerToast extends LitElement {
  static get tag() {
    return "oer-toast";
  }

  static get properties() {
    return { _items: { state: true } };
  }

  constructor() {
    super();
    this._items = [];
    this.__timers = new Map();
  }

  show({ text = "", duration = DEFAULT_DURATION, closeText = "Close", slot = null, onClose = null }) {
    const id = ++seq;
    // HAX sometimes passes a DOM node to show alongside the text (e.g. an
    // "exit preview" button); keep it live rather than cloning it
    this._items = [...this._items, { id, text, closeText, slot, onClose }].slice(-4);
    if (duration && duration > 0) {
      this.__timers.set(id, setTimeout(() => this.dismiss(id), Math.max(duration, 2000)));
    }
  }

  dismiss(id) {
    const item = this._items.find((i) => i.id === id);
    clearTimeout(this.__timers.get(id));
    this.__timers.delete(id);
    this._items = this._items.filter((i) => i.id !== id);
    item?.onClose?.();
  }

  clear() {
    for (const { id } of this._items) this.dismiss(id);
  }

  static get styles() {
    return css`
      :host {
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        z-index: 100001;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: min(22rem, calc(100vw - 2rem));
        font-family: var(--font-sans, system-ui, sans-serif);
        pointer-events: none;
      }
      .toast {
        pointer-events: auto;
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.875rem 1rem;
        background: var(--popover, #fff);
        color: var(--popover-foreground, #111);
        border: 1px solid var(--border, #e5e7eb);
        border-radius: var(--radius-lg, 0.625rem);
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.08);
        font-size: 0.875rem;
        line-height: 1.4;
      }
      .text {
        flex: 1;
        min-width: 0;
        padding-top: 0.125rem;
      }
      .slot:empty {
        display: none;
      }
      .slot {
        margin-top: 0.5rem;
      }
      button.close {
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        padding: 0;
        border: 0;
        border-radius: var(--radius-sm, 0.25rem);
        background: transparent;
        color: var(--muted-foreground, #555);
        cursor: pointer;
      }
      button.close:hover {
        background: var(--accent, #eee);
        color: var(--accent-foreground, #111);
      }
      button.close:focus-visible {
        outline: 2px solid var(--ring, #2563eb);
        outline-offset: 2px;
      }
      svg {
        width: 1rem;
        height: 1rem;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    `;
  }

  render() {
    return html`
      <div role="status" aria-live="polite" aria-atomic="false">
        ${this._items.map(
          (t) => html`
            <div class="toast">
              <div class="text">
                ${t.text}
                <div class="slot">${t.slot ?? ""}</div>
              </div>
              <button class="close" aria-label="${t.closeText || "Close"}" @click="${() => this.dismiss(t.id)}">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
          `,
        )}
      </div>
    `;
  }
}
customElements.define(OerToast.tag, OerToast);

export function toaster() {
  let el = globalThis.document.querySelector(OerToast.tag);
  if (!el) {
    el = globalThis.document.createElement(OerToast.tag);
    globalThis.document.body.appendChild(el);
  }
  return el;
}
