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
import { contentTypes, allowedChildTypes, savePageDetails, peopleOf } from "./content-types.js";
import { resolveLinks, uploadFile, isImage } from "./relations.js";
import { pagePicker } from "../books/oer-page-picker.js";
import { versionsOf } from "../versions/versioning.js";
import { loadAiul, aiulInfo } from "./aiul.js";
import { valuesInUse } from "../ui/oer-choice-field.js";

// a multiple choice whose options are AI Usage License codes gets the AIUL
// picker (licence + optional media) instead of one checkbox per code
const isAiulField = (f) => f.kind === "select" && f.multiple && (f.options || []).length > 0 && f.options.every((o) => /^AIUL-/i.test(o.value));
const AIUL_CODE = /^AIUL-([A-Z]+)(?:-([A-Z0-9]+))?$/i;

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

const empty = (v) => v === undefined || v === null || v === "" || (Array.isArray(v) && !v.filter((x) => String(x).trim()).length);

// a multiple choice's values; older imports stored them joined ("A, B")
const toArray = (v) => (Array.isArray(v) ? v : v ? String(v).split(",").map((s) => s.trim()).filter(Boolean) : []);

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

  /** `onSaved({ pageType, description, fields })` runs after a save. */
  show(id, { onSaved = null } = {}) {
    this._onSaved = onSaved;
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
    // empty fields start from their type's defaults
    const def = contentTypes(items).types.find((t) => t.id === item.metadata?.pageType);
    for (const f of def?.fields || []) {
      if (f.default !== undefined && f.default !== "" && (this._values[f.name] === undefined || this._values[f.name] === "")) {
        this._values[f.name] = f.kind === "list" || (f.kind === "select" && f.multiple) ? String(f.default).split(",").map((s) => s.trim()) : f.default;
      }
    }
    this._tried = false;
    this._saving = false;
    // licence and media names for the AIUL picker
    loadAiul().then((d) => {
      this._aiul = d;
      this.requestUpdate();
    });
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
      if (f.kind === "select" && f.multiple) v = (f.options || []).map((o) => o.value).filter((x) => toArray(v).includes(x));
      if (f.kind === "relation") v = (Array.isArray(v) ? v : []).filter((x) => x?.page).map((x) => ({ page: x.page, version: x.version || "" }));
      if (f.kind === "files") {
        v = (Array.isArray(v) ? v : [])
          .map((x) => ({ title: (x.title || "").trim(), url: (x.url || "").trim(), description: (x.description || "").trim(), alt: (x.alt || "").trim() }))
          .filter((x) => x.url || x.title);
      }
      if (f.kind === "people") v = peopleOf(v).map((x) => ({ name: x.name.trim(), url: (x.url || "").trim() })).filter((x) => x.name);
      if (f.kind === "number" && v !== "" && v !== undefined) v = Number(v);
      if (!empty(v) || f.kind === "boolean") fields[f.name] = f.kind === "boolean" ? !!v : v;
    }
    await savePageDetails(this._item.id, { pageType: this._type, description: this._desc.trim(), fields });
    this._onSaved?.({ pageType: this._type, description: this._desc.trim(), fields });
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
      .choices {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem 1.25rem;
        margin-top: 0.25rem;
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
      .aiul-picker {
        display: flex;
        flex-direction: column;
        gap: 0.625rem;
        margin-top: 0.25rem;
      }
      .aiul-selects {
        display: grid;
        grid-template-columns: minmax(0, 3fr) minmax(0, 2fr) auto;
        gap: 0.375rem;
        align-items: center;
      }
      @media (max-width: 480px) {
        .aiul-selects {
          grid-template-columns: minmax(0, 1fr) auto;
        }
        .aiul-selects select + select {
          grid-row: 2;
        }
      }
      .aiul-hint {
        margin: 0.25rem 0 0 !important;
      }
      .aiul-hint code {
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.6875rem;
        font-weight: 600;
        color: var(--foreground);
      }
      .err-inline {
        color: var(--destructive);
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
      .links,
      .files {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      .link-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.375rem 0.375rem 0.375rem 0.625rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        --simple-icon-height: 1rem;
        --simple-icon-width: 1rem;
      }
      .link-title {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        font-size: 0.875rem;
        font-weight: 500;
      }
      .link-title small {
        font-size: 0.75rem;
        font-weight: 400;
        color: var(--muted-foreground);
      }
      .link-row select {
        width: auto;
        height: 2rem;
        font-size: 0.8125rem;
      }
      .icon-act[disabled] {
        opacity: 0.35;
        cursor: default;
      }
      .file-row {
        display: flex;
        gap: 0.375rem;
        margin: 0;
        padding: 0.625rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
      }
      .file-grid {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        min-width: 0;
      }
      .url-row {
        display: flex;
        gap: 0.375rem;
      }
      .upload {
        flex: none;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        font-size: 0.8125rem;
        font-weight: 500;
        cursor: pointer;
      }
      .upload:hover {
        background: var(--accent);
      }
      .upload:focus-within {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .upload input {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
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
      .people {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      .person-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto auto;
        gap: 0.375rem;
        align-items: center;
      }
      @media (max-width: 480px) {
        .person-row {
          grid-template-columns: minmax(0, 1fr) auto auto;
        }
        .person-row input[type="url"] {
          grid-column: 1;
          grid-row: 2;
        }
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
        if (isAiulField(f)) {
          return html`<div>
            <span class="label" id="${id}-l">${f.label}${f.required ? html` <span class="req" aria-hidden="true">*</span>` : ""}</span>
            ${this._renderAiulPicker(f)}${help}${err}
          </div>`;
        }
        if (f.multiple) {
          const on = toArray(v);
          return html`<div>
            <span class="label" id="${id}-l">${f.label}${f.required ? html` <span class="req" aria-hidden="true">*</span>` : ""}</span>
            <div class="choices" role="group" aria-labelledby="${id}-l">
              ${(f.options || []).map(
                (o) => html`<label class="check"
                  ><input
                    type="checkbox"
                    .checked="${on.includes(o.value)}"
                    @change="${(e) => this._set(f.name, e.target.checked ? [...on, o.value] : on.filter((x) => x !== o.value))}"
                  />${o.label}</label
                >`,
              )}
            </div>
            ${help}${err}
          </div>`;
        }
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
      case "relation":
        return html`<div><span class="label" id="${id}-l">${f.label}${f.required ? html` <span class="req">*</span>` : ""}</span>${this._renderRelation(f)}${help}${err}</div>`;
      case "people":
        return html`<div><span class="label" id="${id}-l">${f.label}${f.required ? html` <span class="req">*</span>` : ""}</span>${this._renderPeople(f)}${help}${err}</div>`;
      case "files":
        return html`<div><span class="label" id="${id}-l">${f.label}${f.required ? html` <span class="req">*</span>` : ""}</span>${this._renderFiles(f)}${help}${err}</div>`;
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
      case "text":
        if (f.suggest) {
          control = html`<oer-choice-field
            field-id="${id}"
            new-label="New ${f.label.toLowerCase()}…"
            .options="${valuesInUse(toJS(store.manifest?.items), this._type, f.name)}"
            .value="${v ?? ""}"
            ?invalid="${common.invalid}"
            @value-changed="${(e) => this._set(f.name, e.detail.value)}"
          ></oer-choice-field>`;
          break;
        }
      // falls through
      default: {
        const type = { number: "number", date: "date", url: "url", image: "url" }[f.kind] || "text";
        const val = f.kind === "date" && v ? String(v).slice(0, 10) : (v ?? "");
        control = html`<input id="${id}" class="input ${common.invalid ? "invalid" : ""}" type="${type}" .value="${val}" @input="${(e) => this._set(f.name, e.target.value)}" />`;
      }
    }
    return html`<div>${label}${control}${help}${err}</div>`;
  }

  /* ---------- AI Usage Licenses: licence + optional media per row ---------- */

  _renderAiulPicker(f) {
    const id = `f-${f.name}`;
    const codes = toArray(this._values[f.name]);
    const valid = new Set((f.options || []).map((o) => o.value));
    // the licences and media the field's options allow, in option order
    const lics = [];
    const mods = [];
    for (const o of f.options) {
      const [, l, m] = o.value.match(AIUL_CODE) || [];
      if (l && !lics.includes(l.toUpperCase())) lics.push(l.toUpperCase());
      if (m && !mods.includes(m.toUpperCase())) mods.push(m.toUpperCase());
    }
    const licName = (l) => aiulInfo(`AIUL-${l}`, this._aiul).name;
    const modName = (m) => this._aiul?.modifiers?.find((x) => x.code === m)?.title || m;
    const set = (next) => this._set(f.name, next);
    const rows = codes.map((code) => {
      const [, l = "", m = ""] = code.match(AIUL_CODE) || [];
      return { code, l: l.toUpperCase(), m: m.toUpperCase() };
    });
    const build = (l, m) => `AIUL-${l}${m ? `-${m}` : ""}`;
    const update = (i, l, m) => {
      const next = [...codes];
      next[i] = valid.has(build(l, m)) ? build(l, m) : build(l, "");
      set(next);
    };
    const firstFree = () => {
      for (const l of lics) if (!codes.includes(build(l, ""))) return build(l, "");
      return build(lics[0], mods[0] || "");
    };
    return html`<div class="aiul-picker" role="group" aria-labelledby="${id}-l">
      ${rows.map((r, i) => {
        const info = aiulInfo(r.code, this._aiul);
        const dup = codes.indexOf(r.code) !== i;
        return html`<div class="aiul-row">
          <div class="aiul-selects">
            <select
              id="${i === 0 ? id : `${id}-${i}`}"
              aria-label="${f.label} ${i + 1}: license"
              @change="${(e) => update(i, e.target.value, r.m)}"
            >
              ${lics.map((l) => html`<option value="${l}" ?selected="${l === r.l}">AIUL-${l}${licName(l) ? ` · ${licName(l)}` : ""}</option>`)}
            </select>
            <select aria-label="${f.label} ${i + 1}: media" @change="${(e) => update(i, r.l, e.target.value)}">
              <option value="" ?selected="${!r.m}">All media</option>
              ${mods.filter((m) => valid.has(build(r.l, m))).map((m) => html`<option value="${m}" ?selected="${m === r.m}">${modName(m)} only</option>`)}
            </select>
            <button class="icon-act" title="Remove" aria-label="Remove ${r.code}" @click="${() => set(codes.filter((_, j) => j !== i))}">${lucide("oer:x", "sm")}</button>
          </div>
          <p class="hint aiul-hint">
            <code>${r.code}</code> ${info.description}${dup ? html` <span class="err-inline">Listed twice.</span>` : ""}
          </p>
        </div>`;
      })}
      <button
        class="add-item"
        @click="${() => {
          set([...codes, firstFree()]);
          this.updateComplete.then(() => this.shadowRoot.getElementById(`${id}-${codes.length}`)?.focus() || this.shadowRoot.getElementById(id)?.focus());
        }}"
      >
        ${lucide("oer:plus", "sm")}Add AI usage license
      </button>
    </div>`;
  }

  /* ---------- relation: links to other pages ---------- */

  async _addLinks(f) {
    const current = Array.isArray(this._values[f.name]) ? this._values[f.name] : [];
    const typeLabels = (f.types || []).map((t) => this._allTypes.find((x) => x.id === t)?.label).filter(Boolean);
    const choice = await pagePicker().pick({
      exclude: [this._item.id, ...current.map((c) => c.page)],
      types: f.types,
      children: false,
      title: `Add to ${f.label}`,
      hint: typeLabels.length ? `Choose a page: ${typeLabels.join(", ")}.` : "Choose any page. Pin a released version to keep linking to it as it is now.",
    });
    if (choice) this._set(f.name, [...current, { page: choice.page.id, version: choice.version || "" }]);
  }

  _renderRelation(f) {
    const value = Array.isArray(this._values[f.name]) ? this._values[f.name] : [];
    const links = resolveLinks(value);
    const update = (fn) => {
      const next = [...value];
      fn(next);
      this._set(f.name, next);
    };
    return html`<div class="links" role="list">
      ${links.map((l, i) => {
        const type = this._allTypes.find((t) => t.id === l.item?.metadata?.pageType);
        const releases = l.item ? versionsOf(l.item.id) : [];
        return html`<div class="link-row" role="listitem">
          ${type?.icon ? html`<simple-icon-lite icon="${type.icon}"></simple-icon-lite>` : lucide("lrn:page", "sm")}
          <span class="link-title">${l.item ? l.item.title : html`<em>Missing page</em>`}<small>${type?.label || ""}</small></span>
          ${releases.length
            ? html`<select aria-label="Version of ${l.item.title}" @change="${(e) => update((n) => (n[i] = { ...n[i], version: e.target.value }))}">
                <option value="" ?selected="${!l.version}">Latest</option>
                ${releases.map((r) => html`<option value="${r.version}" ?selected="${r.version === l.version}">v${r.version}</option>`)}
              </select>`
            : ""}
          <button class="icon-act" title="Move up" aria-label="Move ${l.item?.title || "link"} up" ?disabled="${i === 0}" @click="${() => update((n) => n.splice(i - 1, 0, n.splice(i, 1)[0]))}">
            ${lucide("icons:arrow-upward", "sm")}
          </button>
          <button class="icon-act" title="Remove" aria-label="Remove ${l.item?.title || "link"}" @click="${() => update((n) => n.splice(i, 1))}">${lucide("oer:x", "sm")}</button>
        </div>`;
      })}
      <button class="add-item" @click="${() => this._addLinks(f)}">${lucide("oer:plus", "sm")}Add ${f.label.toLowerCase()}</button>
    </div>`;
  }

  /* ---------- people: name and optional link, in order ---------- */

  _renderPeople(f) {
    const id = `f-${f.name}`;
    const stored = peopleOf(this._values[f.name]);
    const rows = stored.length ? stored : [{ name: "", url: "" }];
    const update = (fn) => {
      const next = rows.map((r) => ({ ...r }));
      fn(next);
      this._set(f.name, next);
    };
    return html`<div class="people" role="group" aria-labelledby="${id}-l">
      ${rows.map(
        (r, i) => html`<div class="person-row">
          <input
            class="input"
            id="${i === 0 ? id : `${id}-${i}`}"
            placeholder="Name"
            aria-label="${f.label} ${i + 1}: name"
            .value="${r.name}"
            @input="${(e) => update((n) => (n[i].name = e.target.value))}"
          />
          <input
            class="input"
            type="url"
            placeholder="Link (optional)"
            aria-label="${f.label} ${i + 1}: link"
            .value="${r.url || ""}"
            @input="${(e) => update((n) => (n[i].url = e.target.value))}"
          />
          <button class="icon-act" title="Move up" aria-label="Move ${r.name || `person ${i + 1}`} up" ?disabled="${i === 0}" @click="${() => update((n) => n.splice(i - 1, 0, n.splice(i, 1)[0]))}">
            ${lucide("icons:arrow-upward", "sm")}
          </button>
          <button class="icon-act" title="Remove" aria-label="Remove ${r.name || `person ${i + 1}`}" @click="${() => update((n) => n.splice(i, 1))}">${lucide("oer:x", "sm")}</button>
        </div>`,
      )}
      <button
        class="add-item"
        @click="${() => {
          update((n) => n.push({ name: "", url: "" }));
          this.updateComplete.then(() => this.shadowRoot.getElementById(`${id}-${rows.length}`)?.focus());
        }}"
      >
        ${lucide("oer:plus", "sm")}Add person
      </button>
    </div>`;
  }

  /* ---------- files: attachments (file or external link) ---------- */

  async _upload(f, i, input) {
    const file = input.files?.[0];
    if (!file) return;
    const rows = [...(this._values[f.name] || [])];
    rows[i] = { ...rows[i], uploading: true };
    this._set(f.name, rows);
    try {
      const url = await uploadFile(file);
      const next = [...(this._values[f.name] || [])];
      next[i] = { ...next[i], url, title: next[i].title || file.name.replace(/\.[^.]+$/, ""), uploading: false, error: "" };
      this._set(f.name, next);
    } catch (err) {
      const next = [...(this._values[f.name] || [])];
      next[i] = { ...next[i], uploading: false, error: err.message };
      this._set(f.name, next);
    }
    input.value = "";
  }

  _renderFiles(f) {
    const rows = Array.isArray(this._values[f.name]) ? this._values[f.name] : [];
    const set = (i, patch) => {
      const next = [...rows];
      next[i] = { ...next[i], ...patch };
      this._set(f.name, next);
    };
    return html`<div class="files">
      ${rows.map(
        (r, i) => html`<fieldset class="file-row">
          <legend class="sr">${f.label} ${i + 1}</legend>
          <div class="file-grid">
            <input class="input" placeholder="Title" aria-label="Title" .value="${r.title || ""}" @input="${(e) => set(i, { title: e.target.value })}" />
            <div class="url-row">
              <input class="input" placeholder="File or link address" aria-label="File or link address" .value="${r.url || ""}" @input="${(e) => set(i, { url: e.target.value })}" />
              <label class="upload">
                ${lucide("icons:file-upload", "sm")}${r.uploading ? "Uploading…" : "Upload"}
                <input type="file" @change="${(e) => this._upload(f, i, e.target)}" />
              </label>
            </div>
            <input class="input" placeholder="Description (optional)" aria-label="Description" .value="${r.description || ""}" @input="${(e) => set(i, { description: e.target.value })}" />
            ${isImage(r.url)
              ? html`<input class="input" placeholder="Alt text for the image" aria-label="Alt text" .value="${r.alt || ""}" @input="${(e) => set(i, { alt: e.target.value })}" />`
              : ""}
            ${r.error ? html`<p class="err">${r.error}</p>` : ""}
          </div>
          <button class="icon-act" title="Remove" aria-label="Remove ${r.title || "file"}" @click="${() => this._set(f.name, rows.filter((_, j) => j !== i))}">${lucide("oer:x", "sm")}</button>
        </fieldset>`,
      )}
      <button class="add-item" @click="${() => this._set(f.name, [...rows, { title: "", url: "", description: "", alt: "" }])}">
        ${lucide("oer:plus", "sm")}Add file or link
      </button>
    </div>`;
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
