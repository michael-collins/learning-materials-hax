/**
 * `oer-icon-picker` — choose an icon (shadcn Dialog with a searchable grid).
 * Offers the HAX icon names this site maps to Lucide, so a choice renders
 * the same everywhere (simple-icon-lite, nav, outline builder).
 *
 *   const name = await iconPicker().pick(currentName);
 *   // "" = remove icon, null = cancelled
 *
 * Or a short list of its caller's own, without the search, beside the
 * control that opened it (an outcome's Change icon, editor/ops.js): each
 * choice { value, label, render() (its picture) }; arrow keys, Home and End
 * go between them, Enter or Space chooses, Esc cancels.
 *
 *   const value = await iconPicker().pick(current, { choices, title: "Choose an icon", anchor });
 * @element oer-icon-picker
 */
import { html, css, LitElement } from "../lit.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { formControls } from "./form-controls.js";

const CHOICES = Object.keys(LUCIDE_ICONS).filter((k) => !k.startsWith("oer:"));

const lucide = (name) =>
  html`<span class="lucide" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

class OerIconPicker extends LitElement {
  static get tag() {
    return "oer-icon-picker";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      anchored: { type: Boolean, reflect: true },
      _query: { state: true },
      _current: { state: true },
      _choices: { state: true },
      _title: { state: true },
    };
  }

  constructor() {
    super();
    this.open = false;
    this._query = "";
    this._current = "";
    this._choices = null;
    this._title = "Choose icon";
    this.anchored = false;
    this.__keys = (e) => {
      if (this.open && e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        this._done(null);
      }
    };
  }

  pick(current = "", { choices = null, title = "Choose icon", anchor = null } = {}) {
    this._current = current;
    this._query = "";
    this._choices = choices?.length ? choices : null;
    this._title = title;
    this.anchored = !!(this._choices && anchor);
    this.open = true;
    globalThis.addEventListener("keydown", this.__keys, true);
    this.updateComplete.then(() => {
      if (!this._choices) {
        this.shadowRoot.querySelector("input")?.focus();
        return;
      }
      this._placeBy(anchor);
      const buttons = [...this.shadowRoot.querySelectorAll(".choices button")];
      (buttons.find((b) => b.getAttribute("aria-pressed") === "true") || buttons[0])?.focus();
    });
    return new Promise((resolve) => (this.__resolve = resolve));
  }

  // beside the control that opened it (under it, or over it with no room below)
  _placeBy(anchor) {
    const box = this.shadowRoot.querySelector(".box");
    if (!box) return;
    box.style.removeProperty("left");
    box.style.removeProperty("top");
    if (!this.anchored || !anchor?.isConnected) return;
    const a = anchor.getBoundingClientRect();
    const w = box.offsetWidth;
    const h = box.offsetHeight;
    const below = innerHeight - a.bottom - 14;
    const top = h <= below || below >= a.top - 14 ? a.bottom + 6 : a.top - 6 - h;
    box.style.left = `${Math.round(Math.max(8, Math.min(a.left, innerWidth - w - 8)))}px`;
    box.style.top = `${Math.round(Math.max(8, Math.min(top, innerHeight - h - 8)))}px`;
  }

  // arrows, Home and End among the choices: ← → in order, ↑ ↓ to the
  // nearest in the row above or below (the first choice has a row of its own)
  _choiceKeys(e) {
    const buttons = [...this.shadowRoot.querySelectorAll(".choices button")];
    const from = e.composedPath()[0];
    const at = buttons.indexOf(from);
    if (at < 0) return;
    let to = { ArrowRight: buttons[at + 1], ArrowLeft: buttons[at - 1], Home: buttons[0], End: buttons[buttons.length - 1] }[e.key];
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const down = e.key === "ArrowDown";
      const r = from.getBoundingClientRect();
      const mid = (q) => Math.abs(q.left + q.width / 2 - (r.left + r.width / 2));
      to = buttons
        .map((b) => [b, b.getBoundingClientRect()])
        .filter(([, q]) => (down ? q.top >= r.bottom - 1 : q.bottom <= r.top + 1))
        .sort(([, a], [, b]) => (down ? a.top - b.top : b.bottom - a.bottom) || mid(a) - mid(b))[0]?.[0];
    } else if (!(e.key in { ArrowRight: 1, ArrowLeft: 1, Home: 1, End: 1 })) return;
    e.preventDefault();
    to?.focus();
  }

  _done(value) {
    this.open = false;
    globalThis.removeEventListener("keydown", this.__keys, true);
    this.__resolve?.(value);
    this.__resolve = null;
  }

  static get styles() {
    return [formControls, css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10010;
        display: none;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      :host([open]) {
        display: grid;
        place-items: center;
      }
      :host([anchored]) {
        place-items: start;
      }
      :host([anchored]) .backdrop {
        background: none;
      }
      :host([anchored]) .box {
        position: fixed;
        width: min(22rem, calc(100vw - 1rem));
        gap: 0.5rem;
        padding: 0.75rem;
        box-shadow:
          0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -4px rgb(0 0 0 / 0.1);
      }
      .choices {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.25rem;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .choices button {
        all: unset;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        width: 100%;
        padding: 0.5rem 0.25rem;
        border-radius: var(--radius-md);
        font-size: 0.75rem;
        text-align: center;
        cursor: pointer;
      }
      .choices button:hover,
      .choices button:focus-visible {
        background: var(--accent);
      }
      .choices button:focus-visible {
        outline: 2px solid var(--ring);
      }
      .choices button[aria-pressed="true"] {
        background: color-mix(in oklab, var(--primary) 12%, transparent);
        color: var(--primary);
      }
      /* (the first, Automatic, in a row of its own) */
      .choices li:first-child {
        grid-column: 1 / -1;
      }
      .choices li:first-child button {
        flex-direction: row;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        font-size: 0.8125rem;
      }
      .choices svg {
        width: 1.25rem;
        height: 1.25rem;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      @media (forced-colors: active) {
        .choices button[aria-pressed="true"] {
          outline: 2px solid Highlight;
        }
      }
      .backdrop {
        position: absolute;
        inset: 0;
        background: rgb(0 0 0 / 0.35);
      }
      .box {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        width: min(30rem, calc(100vw - 2rem));
        max-height: min(36rem, calc(100dvh - 2rem));
        padding: 1.25rem;
        box-sizing: border-box;
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 8px 24px rgb(0 0 0 / 0.18);
      }
      h2 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
      }
      .lucide {
        flex: none;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      .search {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        color: var(--muted-foreground);
      }
      .search:focus-within {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      input {
        flex: 1;
        min-width: 0;
        border: 0;
        outline: none;
        background: transparent;
        color: var(--foreground);
        font: inherit;
        font-size: 0.875rem;
      }
      .grid {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 0.25rem;
      }
      .grid button {
        all: unset;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem 0.25rem;
        border-radius: var(--radius-md);
        cursor: pointer;
      }
      .grid button:hover,
      .grid button:focus-visible {
        background: var(--accent);
      }
      .grid button:focus-visible {
        outline: 2px solid var(--ring);
      }
      .grid button[aria-pressed="true"] {
        background: color-mix(in oklch, var(--primary) 12%, transparent);
        color: var(--primary);
      }
      .grid .lucide {
        width: 1.25rem;
        height: 1.25rem;
      }
      small {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        font-size: 0.5625rem;
        color: var(--muted-foreground);
      }
      .empty {
        padding: 2rem 0;
        text-align: center;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      .foot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 0.75rem;
        border-top: 1px solid var(--border);
      }
      .remove {
        all: unset;
        font-size: 0.75rem;
        color: var(--destructive);
        cursor: pointer;
      }
      .remove:hover {
        text-decoration: underline;
      }
      .cancel {
        all: unset;
        height: 2.25rem;
        padding: 0 1rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      .cancel:hover {
        background: var(--accent);
      }
      .remove:focus-visible,
      .cancel:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
    `];
  }

  render() {
    if (!this.open) return html``;
    if (this._choices) return this._renderChoices();
    const q = this._query.trim().toLowerCase();
    const icons = (q ? CHOICES.filter((n) => n.toLowerCase().includes(q)) : CHOICES).slice(0, 120);
    return html`
      <div class="backdrop" @click="${() => this._done(null)}"></div>
      <div class="box" role="dialog" aria-modal="true" aria-labelledby="t">
        <h2 id="t">Choose icon</h2>
        <div class="search">
          ${lucide("icons:search")}
          <input
            type="text"
            placeholder="Search icons…"
            aria-label="Search icons"
            .value="${this._query}"
            @input="${(e) => (this._query = e.target.value)}"
          />
        </div>
        ${icons.length
          ? html`<div class="grid">
              ${icons.map(
                (name) => html`<button title="${name}" aria-pressed="${name === this._current ? "true" : "false"}" @click="${() => this._done(name)}">
                  ${lucide(name)}<small>${name.split(":").pop()}</small>
                </button>`,
              )}
            </div>`
          : html`<div class="empty">No icons match “${this._query}”</div>`}
        <div class="foot">
          <button class="remove" @click="${() => this._done("")}">Remove icon</button>
          <button class="cancel" @click="${() => this._done(null)}">Cancel</button>
        </div>
      </div>
    `;
  }

  _renderChoices() {
    return html`
      <div class="backdrop" @click="${() => this._done(null)}"></div>
      <div class="box" role="dialog" aria-modal="true" aria-labelledby="t">
        <h2 id="t">${this._title}</h2>
        <ul class="choices" role="list" @keydown="${this._choiceKeys}">
          ${this._choices.map(
            (c) => html`<li>
              <button aria-pressed="${c.value === this._current ? "true" : "false"}" @click="${() => this._done(c.value)}">${c.render?.() ?? ""}<span>${c.label}</span></button>
            </li>`,
          )}
        </ul>
        <div class="foot">
          <span></span>
          <button class="cancel" @click="${() => this._done(null)}">Cancel</button>
        </div>
      </div>
    `;
  }
}
customElements.define(OerIconPicker.tag, OerIconPicker);

export function iconPicker() {
  const doc = globalThis.document;
  return doc.querySelector(OerIconPicker.tag) || doc.body.appendChild(doc.createElement(OerIconPicker.tag));
}
