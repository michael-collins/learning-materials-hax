/**
 * A text value picked from the values already in use, or a new one:
 * a select listing `options`, whose last choice ("New kind…") swaps in a
 * text box. Renders in the host's DOM (no shadow root), so the host's
 * label (for = the `field-id`) and form styles apply.
 *
 *   <oer-choice-field field-id="f-kind" new-label="New kind…" .options="${kinds}"
 *     .value="${v}" @value-changed="${(e) => set(e.detail.value)}"></oer-choice-field>
 */
import { LitElement, html } from "../lit.js";

const NEW = "\u0000new";

export class OerChoiceField extends LitElement {
  static get tag() {
    return "oer-choice-field";
  }

  static get properties() {
    return {
      value: { type: String },
      options: { type: Array },
      fieldId: { type: String, attribute: "field-id" },
      newLabel: { type: String, attribute: "new-label" },
      invalid: { type: Boolean },
      _adding: { state: true },
    };
  }

  constructor() {
    super();
    this.value = "";
    this.options = [];
    this.fieldId = "";
    this.newLabel = "New…";
    this.invalid = false;
    this._adding = false;
  }

  createRenderRoot() {
    return this;
  }

  get _known() {
    return (this.options || []).includes(this.value);
  }

  _emit(value) {
    this.value = value;
    this.dispatchEvent(new CustomEvent("value-changed", { detail: { value }, bubbles: true, composed: true }));
  }

  _pick(e) {
    if (e.target.value === NEW) {
      this._adding = true;
      this._emit("");
      this.updateComplete.then(() => this.querySelector("input")?.focus());
      return;
    }
    this._adding = false;
    this._emit(e.target.value);
  }

  render() {
    // a value nobody else uses (or one being typed) shows in the text box
    const typing = this._adding || (!!this.value && !this._known);
    const cls = this.invalid ? "invalid" : "";
    return html`<span class="choice-field" style="display:flex;flex-wrap:wrap;gap:0.5rem">
      <select id="${this.fieldId}" class="${cls}" style="flex:1 1 10rem;min-width:0" @change="${this._pick}">
        <option value="" ?selected="${!typing && !this.value}">—</option>
        ${(this.options || []).map((o) => html`<option value="${o}" ?selected="${!typing && o === this.value}">${o}</option>`)}
        <option value="${NEW}" ?selected="${typing}">${this.newLabel}</option>
      </select>
      ${typing
        ? html`<input
            class="input ${cls}"
            style="flex:1 1 10rem;min-width:0"
            aria-label="${this.newLabel.replace(/…$/, "")}"
            .value="${this.value || ""}"
            @input="${(e) => this._emit(e.target.value)}"
          />`
        : ""}
    </span>`;
  }
}

if (!customElements.get(OerChoiceField.tag)) customElements.define(OerChoiceField.tag, OerChoiceField);

/** The values a field holds across pages of a type, most used first. */
export function valuesInUse(items, pageType, name, extra = []) {
  const count = new Map();
  for (const i of items || []) {
    if (i.metadata?.pageType !== pageType || i.metadata?.oerSnapshotOf) continue;
    const v = String(i.metadata?.oerFields?.[name] ?? "").trim();
    if (v) count.set(v, (count.get(v) || 0) + 1);
  }
  for (const v of extra) if (!count.has(v)) count.set(v, 0);
  return [...count.keys()].sort((a, b) => count.get(b) - count.get(a) || a.localeCompare(b));
}
