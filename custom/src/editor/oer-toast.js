/**
 * `oer-toast` — Sonner-style notifications replacing haxcms-toast.
 * Bottom-right stack of cards, no motion. Each is said in the editor's
 * polite live region (announce.js), which it shares, rather than one of
 * its own. duration 0 means the toast stays until dismissed (HAX uses that
 * for "exit preview"); a toast waits while the pointer is over it or focus
 * is in it, and its time starts again once neither is.
 *
 * A toast can offer one action, as a button beside its text:
 *
 *   toaster().show({ text: "Books removed", action: { label: "Undo", run: () => … } })
 *
 * `said` is what screen readers hear, when it should differ from the text
 * ("Books removed. Undo with ⌘Z").
 * @element oer-toast
 */
import { html, css, LitElement } from "../lit.js";
import { announce } from "./announce.js";

const DEFAULT_DURATION = 4000;
// time to reach an action
const ACTION_DURATION = 8000;
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
    // what holds each toast open: "pointer", "focus"
    this.__holds = new Map();
  }

  show({ text = "", duration, closeText = "Close", slot = null, onClose = null, action = null, said = "" }) {
    const id = ++seq;
    duration ??= action ? ACTION_DURATION : DEFAULT_DURATION;
    // HAX sometimes passes a DOM node to show alongside the text (e.g. an
    // "exit preview" button); keep it live rather than cloning it
    this._items = [...this._items, { id, text, closeText, slot, onClose, action, duration }].slice(-4);
    this._wait(id);
    announce(said || text);
    return id;
  }

  // dismiss after the toast's duration (from now)
  _wait(id) {
    const item = this._items.find((i) => i.id === id);
    clearTimeout(this.__timers.get(id));
    if (item?.duration > 0) this.__timers.set(id, setTimeout(() => this.dismiss(id), Math.max(item.duration, 2000)));
  }

  // while the pointer is over a toast or focus is in it, it stays; its
  // time starts again when both have left
  _hold(id, by, held) {
    // (focus leaves a toast's button as the toast goes)
    if (!this._items.some((i) => i.id === id)) return;
    const holds = this.__holds.get(id) ?? new Set();
    if (held) holds.add(by);
    else holds.delete(by);
    this.__holds.set(id, holds);
    if (holds.size) clearTimeout(this.__timers.get(id));
    else this._wait(id);
  }

  _act(t) {
    this.dismiss(t.id);
    t.action?.run?.();
  }

  dismiss(id) {
    const item = this._items.find((i) => i.id === id);
    clearTimeout(this.__timers.get(id));
    this.__timers.delete(id);
    this.__holds.delete(id);
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
      .stack {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
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
      /* Sonner's action button */
      button.action {
        flex: none;
        align-self: center;
        height: 2rem;
        padding: 0 0.75rem;
        border: 0;
        border-radius: var(--radius-md, 0.5rem);
        background: var(--primary, #111);
        color: var(--primary-foreground, #fff);
        font: inherit;
        font-size: 0.8125rem;
        font-weight: 500;
        cursor: pointer;
      }
      button.action:hover {
        background: color-mix(in oklab, var(--primary, #111) 88%, var(--foreground, #000));
      }
      button.action:focus-visible {
        outline: 2px solid var(--ring, #2563eb);
        outline-offset: 2px;
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
      <div class="stack">
        ${this._items.map(
          (t) => html`
            <div
              class="toast"
              @pointerenter="${() => this._hold(t.id, "pointer", true)}"
              @pointerleave="${() => this._hold(t.id, "pointer", false)}"
              @focusin="${() => this._hold(t.id, "focus", true)}"
              @focusout="${(e) => !e.currentTarget.contains(e.relatedTarget) && this._hold(t.id, "focus", false)}"
            >
              <div class="text">
                ${t.text}
                <div class="slot">${t.slot ?? ""}</div>
              </div>
              ${t.action ? html`<button class="action" @click="${() => this._act(t)}">${t.action.label}</button>` : ""}
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
