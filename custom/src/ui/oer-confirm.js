/**
 * `oer-confirm` — a question the editor needs answered before it goes on
 * (shadcn AlertDialog): a title, a line saying what will happen, and
 * buttons that say what they do.
 *
 *   const choice = await confirmDialog().ask({
 *     title: "Leave without saving?",
 *     text: "Your changes to “DART 413” will be lost.",
 *     actions: [
 *       { id: "keep", label: "Keep editing" },
 *       { id: "discard", label: "Discard changes", kind: "destructive" },
 *     ],
 *   });
 *
 * Resolves to the chosen action's id. The first action is the safe one:
 * it has focus when the dialog opens, and Esc chooses it. Kinds: "outline"
 * (the default), "primary" and "destructive". A native modal dialog: focus
 * stays inside and goes back where it was when it closes; a click outside
 * doesn't close it.
 * @element oer-confirm
 */
import { html, css, LitElement } from "../lit.js";

// focus as the person sees it, inside shadow roots
function deepActive() {
  let el = globalThis.document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el;
}

class OerConfirm extends LitElement {
  static get tag() {
    return "oer-confirm";
  }

  static get properties() {
    return {
      _q: { state: true },
    };
  }

  constructor() {
    super();
    this._q = null; // { title, text, actions }
  }

  /** Ask; resolves to the chosen action's id (the first action's on Esc). */
  ask({ title, text = "", actions }) {
    // a question still open is answered safely first
    this._answer(this._q?.actions[0]?.id);
    this.__opener = deepActive();
    this._q = { title, text, actions };
    return new Promise((resolve) => (this.__resolve = resolve));
  }

  updated(changed) {
    if (!changed.has("_q")) return;
    const dialog = this.shadowRoot.querySelector("dialog");
    if (this._q && !dialog.open) {
      dialog.showModal();
      this.shadowRoot.querySelector("footer button")?.focus();
    }
    if (!this._q && dialog.open) {
      dialog.close();
      // back where focus was, if that's still on the page
      if (this.__opener?.isConnected) this.__opener.focus();
    }
  }

  _answer(id) {
    const resolve = this.__resolve;
    if (!resolve) return;
    this.__resolve = null;
    this._q = null;
    resolve(id);
  }

  render() {
    const q = this._q;
    return html`<dialog
      role="alertdialog"
      aria-labelledby="t"
      aria-describedby="what"
      @cancel="${(e) => {
        e.preventDefault();
        this._answer(q?.actions[0]?.id);
      }}"
    >
      ${q
        ? html`<div class="panel">
            <h2 id="t">${q.title}</h2>
            <p id="what">${q.text}</p>
            <footer>
              ${q.actions.map((a) => html`<button class="btn ${a.kind || "outline"}" @click="${() => this._answer(a.id)}">${a.label}</button>`)}
            </footer>
          </div>`
        : ""}
    </dialog>`;
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      dialog {
        width: min(32rem, calc(100vw - 2rem));
        padding: 0;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg, 0.75rem);
        background: var(--popover, var(--background));
        color: var(--popover-foreground, var(--foreground));
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
      }
      dialog::backdrop {
        background: rgb(0 0 0 / 0.5);
      }
      .panel {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1.25rem;
      }
      h2 {
        margin: 0;
        font-size: 1.0625rem;
        font-weight: 600;
      }
      p {
        margin: 0;
        font-size: 0.875rem;
        line-height: 1.5;
        color: var(--muted-foreground);
      }
      footer {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 0.5rem;
        margin-top: 0.75rem;
      }
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2.25rem;
        padding: 0 0.875rem;
        border: 1px solid transparent;
        border-radius: var(--radius-md, 0.5rem);
        background: none;
        color: var(--foreground);
        font: inherit;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      .btn:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
      .btn.outline {
        border-color: var(--input-border, var(--border));
      }
      .btn.outline:hover {
        background: var(--accent);
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .btn.primary:hover {
        background: color-mix(in oklab, var(--primary) 88%, var(--foreground));
      }
      .btn.destructive {
        background: var(--destructive);
        color: var(--destructive-foreground, #fff);
      }
      /* darker in both modes: its text is white in both (mixing toward
         --foreground lightened it in dark mode, below 4.5:1) */
      .btn.destructive:hover {
        background: color-mix(in oklab, var(--destructive) 88%, black);
      }
      /* phones: one button a row, the safe one at the bottom */
      @media (max-width: 30rem) {
        footer {
          flex-direction: column-reverse;
        }
        .btn {
          justify-content: center;
        }
      }
    `;
  }
}

if (!customElements.get(OerConfirm.tag)) customElements.define(OerConfirm.tag, OerConfirm);

export function confirmDialog() {
  const doc = globalThis.document;
  return doc.querySelector(OerConfirm.tag) || doc.body.appendChild(doc.createElement(OerConfirm.tag));
}
