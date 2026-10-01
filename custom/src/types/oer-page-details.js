/**
 * `oer-page-details` — edit a page's type, description and type fields in
 * a dialog. The form is generated from the type's definition; switching
 * type keeps values whose keys both types share. The type list only offers
 * types the parent page may contain.
 *
 *   pageDetails().show(itemId)
 * @element oer-page-details
 */
import { html, css, LitElement } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { contentTypes, allowedChildTypes, savePageDetails } from "./content-types.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

const empty = (v) => v === undefined || v === null || v === "" || (Array.isArray(v) && !v.filter((x) => String(x).trim()).length);

class OerPageDetails extends LitElement {
  static get tag() {
    return "oer-page-details";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      _type: { state: true },
      _desc: { state: true },
      _values: { state: true },
      _saving: { state: true },
      _tried: { state: true },
    };
  }

  constructor() {
    super();
    this.open = false;
    this._values = {};
    this.__keys = (e) => {
      if (this.open && e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        this._close();
      }
    };
  }

  show(id) {
    const items = toJS(store.manifest?.items) || [];
    const item = items.find((i) => i.id === id);
    if (!item) return;
    this._item = item;
    const parent = item.parent ? items.find((i) => i.id === item.parent) : null;
    this._allowed = allowedChildTypes(parent?.metadata?.pageType || null, items);
    this._allTypes = contentTypes(items).types;
    this._type = item.metadata?.pageType || "";
    this._desc = item.description || "";
    this._values = { ...(item.metadata?.oerFields || {}) };
    this._tried = false;
    this._saving = false;
    this.open = true;
    globalThis.addEventListener("keydown", this.__keys, true);
    this.updateComplete.then(() => this.shadowRoot.querySelector("select, input, textarea")?.focus());
  }

  _close() {
    this.open = false;
    globalThis.removeEventListener("keydown", this.__keys, true);
  }

  get _typeDef() {
    return this._allTypes?.find((t) => t.id === this._type) || null;
  }

  _set(name, value) {
    this._values = { ...this._values, [name]: value };
  }

  _missing() {
    return (this._typeDef?.fields || []).filter((f) => f.required && empty(this._values[f.name]));
  }

  async _save() {
    this._tried = true;
    if (this._missing().length || this._saving) return;
    this._saving = true;
    // keep only this type's fields; tidy list entries
    const fields = {};
    for (const f of this._typeDef?.fields || []) {
      let v = this._values[f.name];
      if (f.kind === "list") v = (v || []).map((x) => String(x).trim()).filter(Boolean);
      if (f.kind === "number" && v !== "" && v !== undefined) v = Number(v);
      if (!empty(v) || f.kind === "boolean") fields[f.name] = f.kind === "boolean" ? !!v : v;
    }
    await savePageDetails(this._item.id, { pageType: this._type, description: this._desc.trim(), fields });
    this._saving = false;
    this._close();
  }

  static get styles() {
    return css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: none;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      :host([open]) {
        display: grid;
        place-items: center;
      }
      .backdrop {
        position: absolute;
        inset: 0;
        background: rgb(0 0 0 / 0.5);
      }
      .dialog {
        position: relative;
        display: flex;
        flex-direction: column;
        width: min(40rem, calc(100vw - 2rem));
        max-height: min(46rem, calc(100dvh - 2rem));
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        overflow: hidden;
      }
      button,
      input,
      select,
      textarea {
        font: inherit;
        color: inherit;
      }
      :focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
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
      .sm {
        width: 0.875rem;
        height: 0.875rem;
      }
      header {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        padding: 1rem 0.75rem 1rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      .heading {
        flex: 1;
      }
      h2 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
      }
      .sub {
        margin: 0.125rem 0 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .x {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .x:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .body {
        overflow-y: auto;
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 1.125rem;
      }
      label,
      .label {
        display: block;
        margin-bottom: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
      }
      .req {
        color: var(--destructive);
      }
      .hint {
        margin: 0.375rem 0 0;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .err {
        margin: 0.375rem 0 0;
        font-size: 0.75rem;
        color: var(--destructive);
      }
      .input,
      select,
      textarea {
        box-sizing: border-box;
        width: 100%;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        font-size: 0.875rem;
      }
      textarea {
        height: auto;
        min-height: 5rem;
        padding: 0.5rem 0.75rem;
        resize: vertical;
      }
      .invalid {
        border-color: var(--destructive);
      }
      .check {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      input[type="checkbox"] {
        width: 1rem;
        height: 1rem;
        margin: 0;
        accent-color: var(--primary);
      }
      .sep {
        height: 1px;
        background: var(--border);
      }
      .list {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      .list-row {
        display: flex;
        gap: 0.375rem;
      }
      .icon-act {
        all: unset;
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.25rem;
        height: 2.25rem;
        border-radius: var(--radius-md);
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .icon-act:hover {
        background: var(--accent);
        color: var(--destructive);
      }
      .add-item {
        all: unset;
        align-self: flex-start;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2rem;
        padding: 0 0.625rem;
        border-radius: var(--radius-md);
        font-size: 0.8125rem;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .add-item:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .notype {
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      footer {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-top: 1px solid var(--border);
      }
      .status {
        flex: 1;
        font-size: 0.8125rem;
        color: var(--destructive);
      }
      .btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        height: 2.25rem;
        padding: 0 1rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      .btn.outline {
        border: 1px solid var(--input-border, var(--border));
      }
      .btn.outline:hover {
        background: var(--accent);
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .btn[aria-disabled="true"] {
        opacity: 0.5;
        cursor: default;
      }
    `;
  }

  _renderField(f) {
    const id = `f-${f.name}`;
    const v = this._values[f.name];
    const invalid = this._tried && f.required && empty(v);
    const label = html`<label for="${id}">${f.label}${f.required ? html` <span class="req" aria-hidden="true">*</span>` : ""}</label>`;
    const help = f.help ? html`<p class="hint" id="${id}-help">${f.help}</p>` : "";
    const err = invalid ? html`<p class="err">${f.label} is required.</p>` : "";
    const common = { id, invalid };
    let control;
    switch (f.kind) {
      case "longtext":
        control = html`<textarea id="${id}" class="${invalid ? "invalid" : ""}" .value="${v || ""}" @input="${(e) => this._set(f.name, e.target.value)}"></textarea>`;
        break;
      case "select":
        control = html`<select id="${id}" class="${invalid ? "invalid" : ""}" @change="${(e) => this._set(f.name, e.target.value)}">
          <option value="" ?selected="${!v}">—</option>
          ${(f.options || []).map((o) => html`<option value="${o.value}" ?selected="${o.value === v}">${o.label}</option>`)}
        </select>`;
        break;
      case "boolean":
        return html`<div>
          <label class="check"><input id="${id}" type="checkbox" .checked="${!!v}" @change="${(e) => this._set(f.name, e.target.checked)}" />${f.label}</label>
          ${help}
        </div>`;
      case "list": {
        const list = Array.isArray(v) ? v : v ? [v] : [];
        const rows = list.length ? list : [""];
        control = html`<div class="list" role="group" aria-labelledby="${id}-l">
          ${rows.map(
            (x, i) => html`<div class="list-row">
              <input
                class="input ${invalid ? "invalid" : ""}"
                id="${i === 0 ? id : `${id}-${i}`}"
                aria-label="${f.label} ${i + 1}"
                .value="${x}"
                @input="${(e) => {
                  const next = [...rows];
                  next[i] = e.target.value;
                  this._set(f.name, next);
                }}"
                @keydown="${(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const next = [...rows];
                    next.splice(i + 1, 0, "");
                    this._set(f.name, next);
                    this.updateComplete.then(() => this.shadowRoot.getElementById(`${id}-${i + 1}`)?.focus());
                  }
                }}"
              />
              <button
                class="icon-act"
                title="Remove"
                aria-label="Remove ${f.label} ${i + 1}"
                @click="${() => this._set(f.name, rows.filter((_, j) => j !== i))}"
              >
                ${lucide("oer:x", "sm")}
              </button>
            </div>`,
          )}
          <button class="add-item" @click="${() => this._set(f.name, [...rows, ""])}">${lucide("oer:plus", "sm")}Add ${f.label.toLowerCase()}</button>
        </div>`;
        return html`<div><span class="label" id="${id}-l">${f.label}${f.required ? html` <span class="req">*</span>` : ""}</span>${control}${help}${err}</div>`;
      }
      default: {
        const type = { number: "number", date: "date", url: "url", image: "url" }[f.kind] || "text";
        const val = f.kind === "date" && v ? String(v).slice(0, 10) : (v ?? "");
        control = html`<input id="${id}" class="input ${common.invalid ? "invalid" : ""}" type="${type}" .value="${val}" @input="${(e) => this._set(f.name, e.target.value)}" />`;
      }
    }
    return html`<div>${label}${control}${help}${err}</div>`;
  }

  render() {
    if (!this.open) return html``;
    const def = this._typeDef;
    const missing = this._tried ? this._missing() : [];
    const allowedHere = this._allowed || [];
    // a page whose current type is not allowed here keeps it as an option
    const options = def && !allowedHere.some((t) => t.id === def.id) ? [...allowedHere, def] : allowedHere;
    return html`
      <div class="backdrop" @click="${this._close}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">Page details</h2>
            <p class="sub">${this._item.title}</p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._close}">${lucide("oer:x")}</button>
        </header>
        <div class="body">
          <div>
            <label for="ptype">Content type</label>
            <select id="ptype" @change="${(e) => (this._type = e.target.value)}">
              <option value="" ?selected="${!this._type}">No type</option>
              ${options.map((t) => html`<option value="${t.id}" ?selected="${t.id === this._type}">${t.label}</option>`)}
            </select>
            ${def?.description ? html`<p class="hint">${def.description}</p>` : ""}
          </div>
          <div>
            <label for="pdesc">Description</label>
            <textarea id="pdesc" .value="${this._desc}" @input="${(e) => (this._desc = e.target.value)}"></textarea>
            <p class="hint">Shown under the title and in search results.</p>
          </div>
          ${def
            ? html`<div class="sep" role="separator"></div>
                ${def.fields.length ? def.fields.map((f) => this._renderField(f)) : html`<p class="notype">${def.label} has no fields of its own.</p>`}`
            : ""}
        </div>
        <footer>
          <span class="status">${missing.length ? `Fill in: ${missing.map((f) => f.label).join(", ")}` : ""}</span>
          <button class="btn outline" @click="${this._close}">Cancel</button>
          <button class="btn primary" aria-disabled="${this._saving ? "true" : "false"}" @click="${this._save}">${this._saving ? "Saving…" : "Save details"}</button>
        </footer>
      </div>
    `;
  }
}
customElements.define(OerPageDetails.tag, OerPageDetails);

export function pageDetails() {
  const doc = globalThis.document;
  return doc.querySelector(OerPageDetails.tag) || doc.body.appendChild(doc.createElement(OerPageDetails.tag));
}
