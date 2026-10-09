/**
 * `oer-type-editor` — define the site's content types in a dialog.
 *
 *   ┌ Content types ──────────────────────────────────────────── ✕ ┐
 *   │ ◎ Lesson      12 │ Name [Lesson      ]  ID lesson   Icon [◎] │
 *   │ ▤ Article     30 │ Description [……………………………………………]          │
 *   │ …                │ Can contain  ○ Any  ● Only  ○ Nothing      │
 *   │ + New type       │   [✓ Section] [✓ Article] [ Lesson] …      │
 *   │                  │ Fields                                      │
 *   │                  │ ⠿ Estimated duration  Text   ☐req ☑header ✕ │
 *   │                  │ + Add field                                 │
 *   └──────────────────────────────── Cancel  [Save content types] ┘
 *
 * Nothing is written until Save, which stores every definition at once
 * (see content-types.js). A type's ID is fixed once pages use it, and a
 * type in use cannot be deleted. Import / export JSON moves definitions
 * between sites.
 * @element oer-type-editor
 */
import { html, css, LitElement } from "../lit.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { iconPicker } from "../ui/oer-icon-picker.js";
import { contentTypes, typeUsage, saveContentTypes, typeIdFrom, fieldNameFrom, FIELD_KINDS } from "./content-types.js";
import { formControls } from "../ui/form-controls.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

const clone = (x) => JSON.parse(JSON.stringify(x));

// one-click starter blocks (oer-collection views of the page's sub-pages)
const STARTERS = [
  { label: "Paragraph", html: "<p></p>" },
  { label: "Sub-page outline", html: '<h2>In this lesson</h2>\n<oer-collection scope="children" view="outline" sort="order"></oer-collection>' },
  { label: "Sub-page table", html: '<oer-collection scope="children" view="table" sort="order" controls="full"></oer-collection>' },
  { label: "Sub-page cards", html: '<oer-collection scope="children" view="cards" sort="order" controls="none"></oer-collection>' },
  { label: "Callout", html: '<oer-callout type="objective" title="What you will learn"><p></p></oer-callout>' },
];

class OerTypeEditor extends LitElement {
  static get tag() {
    return "oer-type-editor";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      _types: { state: true },
      _selected: { state: true },
      _expanded: { state: true },
      _confirm: { state: true },
      _io: { state: true }, // null | "import" | "export"
      _ioText: { state: true },
      _ioError: { state: true },
      _saving: { state: true },
      _dragField: { state: true },
    };
  }

  constructor() {
    super();
    this.open = false;
    this._types = [];
    this._selected = 0;
    this._expanded = new Set();
    this._confirm = false;
    this._io = null;
    this._ioText = "";
    this._ioError = "";
    this._saving = false;
    this._dragField = null;
    this.__keys = (e) => {
      if (!this.open || e.key !== "Escape" || iconPickerOpen()) return;
      e.preventDefault();
      e.stopPropagation();
      if (this._io) this._io = null;
      else this._requestClose();
    };
  }

  show() {
    // fields that already exist keep their stored key when relabelled
    this._types = clone(contentTypes().types).map((t) => ({ ...t, fields: t.fields.map((f) => ({ ...f, __saved: true })) }));
    this._usage = typeUsage();
    this._savedIds = new Set(this._types.map((t) => t.id));
    this._snapshot = JSON.stringify(this._clean(this._types));
    this._selected = 0;
    this._expanded = new Set();
    this._confirm = false;
    this._io = null;
    this.open = true;
    globalThis.addEventListener("keydown", this.__keys, true);
    this.updateComplete.then(() => this.shadowRoot.querySelector(".types button")?.focus());
  }

  _close() {
    this.open = false;
    globalThis.removeEventListener("keydown", this.__keys, true);
  }

  get _dirty() {
    return JSON.stringify(this._clean(this._types)) !== this._snapshot;
  }

  _requestClose() {
    if (this._dirty && !this._confirm) {
      this._confirm = true;
      return;
    }
    this._close();
  }

  /* ---------- validation ---------- */

  _problems() {
    const out = [];
    const ids = new Set();
    for (const t of this._types) {
      if (!t.label.trim()) out.push("Every type needs a name.");
      if (ids.has(t.id)) out.push(`Two types share the ID “${t.id}”.`);
      ids.add(t.id);
      const names = new Set();
      for (const f of t.fields) {
        if (!f.label.trim()) out.push(`${t.label || "A type"}: every field needs a label.`);
        if (names.has(f.name)) out.push(`${t.label}: two fields share the key “${f.name}”.`);
        names.add(f.name);
        if (f.kind === "select" && !(f.options || []).length) out.push(`${t.label}: “${f.label}” needs at least one choice.`);
      }
    }
    return [...new Set(out)];
  }

  /* ---------- edits ---------- */

  _update(fn) {
    const types = clone(this._types);
    fn(types[this._selected], types);
    this._types = types;
    this._confirm = false;
  }

  _addType() {
    const types = clone(this._types);
    let id = "new-type";
    for (let n = 2; types.some((t) => t.id === id); n++) id = `new-type-${n}`;
    types.push({ id, label: "New type", icon: "", description: "", children: null, fields: [] });
    this._types = types;
    this._selected = types.length - 1;
    this.updateComplete.then(() => {
      const input = this.shadowRoot.querySelector("#type-label");
      input?.focus();
      input?.select();
    });
  }

  _deleteType() {
    const t = this._types[this._selected];
    if (!t || this._usage.get(t.id)) return;
    const types = clone(this._types).filter((_, i) => i !== this._selected);
    for (const other of types) if (Array.isArray(other.children)) other.children = other.children.filter((c) => c !== t.id);
    this._types = types;
    this._selected = Math.max(0, this._selected - 1);
  }

  _idLocked(t) {
    return this._savedIds.has(t.id) && (this._usage.get(t.id) || 0) > 0;
  }

  _setLabel(value) {
    this._update((t) => {
      // new, unused types follow their name until the ID is edited by hand
      if (!this._idLocked(t) && !t.__idTouched && !this._savedIds.has(t.id)) t.id = typeIdFrom(value);
      t.label = value;
    });
  }

  async _chooseIcon() {
    const t = this._types[this._selected];
    const name = await iconPicker().pick(t.icon);
    if (name !== null) this._update((x) => (x.icon = name));
  }

  _setChildrenMode(mode) {
    this._update((t) => {
      if (mode === "any") t.children = null;
      else if (mode === "none") t.children = [];
      else t.children = Array.isArray(t.children) && t.children.length ? t.children : [];
      t.__only = mode === "only";
    });
  }

  _toggleChild(id) {
    this._update((t) => {
      const set = new Set(t.children || []);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      t.children = [...set];
      t.__only = true;
    });
  }

  _addField() {
    this._update((t) => {
      let name = "newField";
      for (let n = 2; t.fields.some((f) => f.name === name); n++) name = `newField${n}`;
      t.fields.push({ name, label: "", kind: "text" });
    });
    this.updateComplete.then(() => {
      const inputs = this.shadowRoot.querySelectorAll(".field-label");
      inputs[inputs.length - 1]?.focus();
    });
  }

  _setField(i, patch) {
    this._update((t) => {
      const f = t.fields[i];
      if ("label" in patch && !f.__nameTouched && !f.__saved) f.name = fieldNameFrom(patch.label);
      Object.assign(f, patch);
      if (f.kind !== "select") delete f.options;
      if (f.kind !== "relation") delete f.types;
      for (const k of Object.keys(f)) if (f[k] === false || f[k] === "") if (k !== "label" && k !== "name") delete f[k];
    });
  }

  _moveField(i, delta) {
    this._update((t) => {
      const j = i + delta;
      if (j < 0 || j >= t.fields.length) return;
      const [f] = t.fields.splice(i, 1);
      t.fields.splice(j, 0, f);
    });
    this.updateComplete.then(() => this.shadowRoot.querySelectorAll(".grip")[i + delta]?.focus());
  }

  _removeField(i) {
    this._update((t) => t.fields.splice(i, 1));
  }

  _toggleExpanded(key) {
    const s = new Set(this._expanded);
    if (s.has(key)) s.delete(key);
    else s.add(key);
    this._expanded = s;
  }

  /* ---------- save / import / export ---------- */

  _clean(types) {
    // drop editor-only bookkeeping (__idTouched etc.) before storing
    return JSON.parse(JSON.stringify(types, (k, v) => (k.startsWith("__") ? undefined : v)));
  }

  async _save() {
    if (!this._dirty || this._problems().length || this._saving) return;
    this._saving = true;
    await saveContentTypes({ version: 1, types: this._clean(this._types) });
    this._saving = false;
    this._close();
  }

  _openExport() {
    this._ioText = JSON.stringify({ version: 1, types: this._clean(this._types) }, null, 2);
    this._ioError = "";
    this._io = "export";
  }

  _openImport() {
    this._ioText = "";
    this._ioError = "";
    this._io = "import";
  }

  _import() {
    try {
      const data = JSON.parse(this._ioText);
      const types = Array.isArray(data) ? data : data.types;
      if (!Array.isArray(types) || types.some((t) => !t.id || !t.label || !Array.isArray(t.fields))) {
        throw new Error("Expected { types: [{ id, label, fields: [] }, …] }");
      }
      // imported types replace same-ID types and add the rest
      const merged = clone(this._types);
      for (const t of types) {
        const at = merged.findIndex((m) => m.id === t.id);
        if (at >= 0) merged[at] = t;
        else merged.push(t);
      }
      this._types = merged;
      this._io = null;
    } catch (err) {
      this._ioError = err.message;
    }
  }

  /* ---------- render ---------- */

  static get styles() {
    return [formControls, css`
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
        width: min(62rem, calc(100vw - 2rem));
        height: min(46rem, calc(100dvh - 2rem));
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
      :focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      header {
        flex: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.875rem 0.75rem 0.875rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      .heading {
        flex: 1;
        min-width: 0;
      }
      h2 {
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;
        font-weight: 600;
      }
      h2 .lucide {
        color: var(--muted-foreground);
      }
      .sub {
        margin: 0.125rem 0 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .ghost {
        all: unset;
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
      .ghost:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .x {
        width: 2rem;
        padding: 0;
        justify-content: center;
      }
      .body {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: 15rem minmax(0, 1fr);
      }

      /* type list (shadcn sidebar menu) */
      .types {
        overflow-y: auto;
        padding: 0.5rem;
        border-right: 1px solid var(--border);
        background: var(--card, var(--muted));
      }
      .types button {
        all: unset;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        height: 2rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        color: var(--muted-foreground);
        cursor: pointer;
        --simple-icon-height: 1rem;
        --simple-icon-width: 1rem;
      }
      .types button:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .types button[aria-current="true"] {
        background: var(--accent);
        color: var(--foreground);
        font-weight: 500;
      }
      .types .name {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .types .count {
        font-size: 0.75rem;
        color: var(--muted-foreground);
        font-weight: 400;
      }
      .types .new {
        margin-top: 0.25rem;
        font-size: 0.8125rem;
      }
      .no-icon {
        width: 1rem;
        height: 1rem;
        flex: none;
      }

      /* editor */
      .editor {
        overflow-y: auto;
        padding: 1.25rem 1.5rem 2rem;
      }
      section + section {
        margin-top: 1.75rem;
      }
      h3 {
        margin: 0 0 0.75rem;
        font-size: 0.875rem;
        font-weight: 600;
      }
      .row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 12rem auto;
        gap: 0.75rem;
        align-items: end;
      }
      label,
      .label {
        display: block;
        margin-bottom: 0.375rem;
        font-size: 0.8125rem;
        font-weight: 500;
      }
      .hint {
        margin: 0.375rem 0 0;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .input,
      textarea,
      select {
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
        min-height: 4.5rem;
        padding: 0.5rem 0.75rem;
        resize: vertical;
      }
      .mono {
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.8125rem;
      }
      .input[readonly] {
        background: var(--muted);
        color: var(--muted-foreground);
      }
      .icon-choice {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        cursor: pointer;
        --simple-icon-height: 1rem;
        --simple-icon-width: 1rem;
      }
      .icon-choice:hover {
        background: var(--accent);
      }
      .radios {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem 1.25rem;
        font-size: 0.875rem;
      }
      .radios label,
      .check {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0;
        font-weight: 400;
        cursor: pointer;
      }
      input[type="radio"],
      input[type="checkbox"] {
        width: 1rem;
        height: 1rem;
        margin: 0;
        accent-color: var(--primary);
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        margin-top: 0.75rem;
      }
      .chip {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.75rem;
        padding: 0 0.625rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: 999px;
        font-size: 0.8125rem;
        cursor: pointer;
      }
      .chip[aria-pressed="true"] {
        border-color: var(--primary);
        background: color-mix(in oklch, var(--primary) 10%, transparent);
        color: var(--primary);
        font-weight: 500;
      }

      /* fields */
      .fields {
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        overflow: hidden;
      }
      .fhead,
      .field {
        display: grid;
        grid-template-columns: 1.5rem minmax(0, 1fr) 9.5rem 5rem 5rem 4rem;
        gap: 0.5rem;
        align-items: center;
        padding: 0.375rem 0.5rem;
      }
      .fhead {
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--muted-foreground);
        background: var(--muted);
        border-bottom: 1px solid var(--border);
      }
      .field + .field,
      .field + .more,
      .more + .field {
        border-top: 1px solid var(--border);
      }
      .field.over-before {
        box-shadow: inset 0 2px 0 var(--primary);
      }
      .field.over-after {
        box-shadow: inset 0 -2px 0 var(--primary);
      }
      .field .input,
      .field select {
        height: 2rem;
      }
      .grip {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 2rem;
        border-radius: var(--radius-sm);
        color: var(--muted-foreground);
        cursor: grab;
      }
      .center {
        display: flex;
        justify-content: center;
      }
      .acts {
        display: flex;
        justify-content: flex-end;
      }
      .icon-act {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .icon-act:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .icon-act.danger:hover {
        color: var(--destructive);
      }
      .icon-act[aria-expanded="true"] .lucide {
        transform: rotate(90deg);
      }
      .more {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
        padding: 0.75rem 0.75rem 0.875rem 2.5rem;
        background: color-mix(in oklch, var(--muted) 50%, transparent);
      }
      .more .wide {
        grid-column: 1 / -1;
      }
      .add {
        all: unset;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        height: 2.25rem;
        padding: 0 0.75rem;
        border-top: 1px solid var(--border);
        font-size: 0.8125rem;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .add:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .nofields {
        padding: 1rem;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      .danger-zone {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding-top: 1.25rem;
        border-top: 1px solid var(--border);
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2.25rem;
        padding: 0 1rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        font-weight: 500;
        white-space: nowrap;
        cursor: pointer;
      }
      .btn.outline {
        border: 1px solid var(--input-border, var(--border));
        background: var(--background);
      }
      .btn.outline:hover {
        background: var(--accent);
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .btn.destructive {
        background: var(--destructive);
        color: var(--destructive-foreground, white);
      }
      .btn.danger-outline {
        border: 1px solid color-mix(in oklch, var(--destructive) 50%, transparent);
        color: var(--destructive);
      }
      .btn[aria-disabled="true"] {
        opacity: 0.5;
        cursor: default;
      }
      footer {
        flex: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-top: 1px solid var(--border);
      }
      .status {
        flex: 1;
        min-width: 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .status.error {
        color: var(--destructive);
      }

      /* import / export panel */
      .io {
        position: absolute;
        inset: 0;
        z-index: 5;
        display: grid;
        place-items: center;
        background: rgb(0 0 0 / 0.3);
      }
      .io-box {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        width: min(40rem, calc(100% - 2rem));
        height: min(32rem, calc(100% - 2rem));
        padding: 1.25rem;
        box-sizing: border-box;
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
      }
      .io-box textarea {
        flex: 1;
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.75rem;
      }
      .io-foot {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
      }
      .empty-editor {
        display: grid;
        place-items: center;
        height: 100%;
        text-align: center;
        color: var(--muted-foreground);
        font-size: 0.875rem;
      }
    `];
  }

  _renderTypeList() {
    return html`<nav class="types" aria-label="Content types">
      ${this._types.map(
        (t, i) => html`<button aria-current="${i === this._selected ? "true" : "false"}" @click="${() => (this._selected = i)}">
          ${t.icon ? html`<simple-icon-lite icon="${t.icon}"></simple-icon-lite>` : html`<span class="no-icon"></span>`}
          <span class="name">${t.label || "Untitled type"}</span>
          ${this._usage.get(t.id) ? html`<span class="count" title="Pages of this type">${this._usage.get(t.id)}</span>` : ""}
        </button>`,
      )}
      <button class="new" @click="${this._addType}">${lucide("oer:plus", "sm")}New type</button>
    </nav>`;
  }

  _renderField(t, f, i) {
    const key = `${t.id}:${i}`;
    const open = this._expanded.has(key);
    const d = this._dragField;
    const over = d && d.over === i && d.from !== i ? (d.before ? "over-before" : "over-after") : "";
    return html`<div
        class="field ${over}"
        @dragover="${(e) => {
          if (!this._dragField) return;
          e.preventDefault();
          const r = e.currentTarget.getBoundingClientRect();
          this._dragField = { ...this._dragField, over: i, before: e.clientY < r.top + r.height / 2 };
        }}"
        @drop="${(e) => {
          e.preventDefault();
          const dd = this._dragField;
          if (!dd) return;
          this._update((tt) => {
            const [moved] = tt.fields.splice(dd.from, 1);
            let at = dd.over > dd.from ? dd.over - 1 : dd.over;
            if (!dd.before) at++;
            tt.fields.splice(at, 0, moved);
          });
          this._dragField = null;
        }}"
      >
        <button
          class="grip"
          draggable="true"
          title="Drag to reorder (or Alt+↑/↓)"
          aria-label="Reorder ${f.label || "field"}: Alt+Up or Alt+Down"
          @dragstart="${(e) => {
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", String(i));
            this._dragField = { from: i, over: i, before: true };
          }}"
          @dragend="${() => (this._dragField = null)}"
          @keydown="${(e) => {
            if (e.altKey && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
              e.preventDefault();
              this._moveField(i, e.key === "ArrowUp" ? -1 : 1);
            }
          }}"
        >
          ${lucide("oer:grip-vertical", "sm")}
        </button>
        <input
          class="input field-label"
          placeholder="Field label"
          aria-label="Field label"
          .value="${f.label}"
          @input="${(e) => this._setField(i, { label: e.target.value })}"
        />
        <select aria-label="Field kind" @change="${(e) => this._setField(i, { kind: e.target.value })}">
          ${FIELD_KINDS.map((k) => html`<option value="${k.kind}" ?selected="${k.kind === f.kind}">${k.label}</option>`)}
        </select>
        <div class="center">
          <input type="checkbox" aria-label="Required" .checked="${!!f.required}" @change="${(e) => this._setField(i, { required: e.target.checked })}" />
        </div>
        <div class="center">
          <input type="checkbox" aria-label="Show in page header" .checked="${!!f.header}" @change="${(e) => this._setField(i, { header: e.target.checked })}" />
        </div>
        <div class="acts">
          <button class="icon-act" aria-expanded="${open ? "true" : "false"}" title="More settings" aria-label="More settings for ${f.label || "field"}" @click="${() => this._toggleExpanded(key)}">
            ${lucide("oer:chevron-right", "sm")}
          </button>
          <button class="icon-act danger" title="Remove field" aria-label="Remove ${f.label || "field"}" @click="${() => this._removeField(i)}">
            ${lucide("oer:trash-2", "sm")}
          </button>
        </div>
      </div>
      ${open
        ? html`<div class="more">
            <div>
              <label for="key-${i}">Key</label>
              <input
                id="key-${i}"
                class="input mono"
                .value="${f.name}"
                @input="${(e) => this._setField(i, { name: e.target.value.replace(/[^A-Za-z0-9_]/g, ""), __nameTouched: true })}"
              />
              <p class="hint">Stored name of the value. Changing it hides values saved under the old key.</p>
            </div>
            <div>
              <label for="def-${i}">Default</label>
              <input id="def-${i}" class="input" .value="${f.default ?? ""}" @input="${(e) => this._setField(i, { default: e.target.value })}" />
              <p class="hint">Used when a page has no value (e.g. CC BY 4.0).</p>
            </div>
            <div>
              <label for="help-${i}">Help text</label>
              <input id="help-${i}" class="input" .value="${f.help || ""}" @input="${(e) => this._setField(i, { help: e.target.value })}" />
            </div>
            ${f.kind === "relation"
              ? html`<div class="wide">
                  <span class="label">Can link to</span>
                  <div class="chips">
                    ${this._types.map((o) => {
                      const on = (f.types || []).includes(o.id);
                      return html`<button
                        class="chip"
                        aria-pressed="${on ? "true" : "false"}"
                        @click="${() => this._setField(i, { types: on ? (f.types || []).filter((x) => x !== o.id) : [...(f.types || []), o.id] })}"
                      >
                        ${on ? lucide("oer:check", "sm") : ""}${o.label}
                      </button>`;
                    })}
                  </div>
                  <p class="hint">None selected: any page can be linked.</p>
                </div>`
              : ""}
            ${f.kind === "select"
              ? html`<div class="wide">
                  <label for="opts-${i}">Choices</label>
                  <textarea
                    id="opts-${i}"
                    .value="${(f.options || []).map((o) => (o.label && o.label !== o.value ? `${o.value} | ${o.label}` : o.value)).join("\n")}"
                    @change="${(e) =>
                      this._setField(i, {
                        options: e.target.value
                          .split("\n")
                          .map((l) => l.trim())
                          .filter(Boolean)
                          .map((l) => {
                            const [value, label] = l.split("|").map((s) => s.trim());
                            return { value, label: label || value };
                          }),
                      })}"
                  ></textarea>
                  <p class="hint">One per line. Use “value | Label” when the stored value differs from what people see.</p>
                  <label class="check" style="margin-top:0.5rem">
                    <input type="checkbox" .checked="${!!f.multiple}" @change="${(e) => this._setField(i, { multiple: e.target.checked || undefined })}" />
                    Allow several choices
                  </label>
                </div>`
              : ""}
            ${f.kind === "text" || f.kind === "list"
              ? html`<div class="wide">
                  <label class="check">
                    <input type="checkbox" .checked="${!!f.suggest}" @change="${(e) => this._setField(i, { suggest: e.target.checked || undefined })}" />
                    Pick from values other pages use
                  </label>
                  <p class="hint">A dropdown of the values already given, with a choice to add a new one (e.g. a resource's Kind).</p>
                </div>`
              : ""}
          </div>`
        : ""}`;
  }

  _renderEditor() {
    const t = this._types[this._selected];
    if (!t) {
      return html`<div class="empty-editor"><div><p>No content types yet.</p><button class="btn outline" @click="${this._addType}">${lucide("oer:plus", "sm")}New type</button></div></div>`;
    }
    const locked = this._idLocked(t);
    const used = this._usage.get(t.id) || 0;
    const mode = t.children === null || t.children === undefined ? "any" : t.children.length || t.__only ? "only" : "none";
    return html`<div class="editor">
      <section>
        <div class="row">
          <div>
            <label for="type-label">Name</label>
            <input id="type-label" class="input" .value="${t.label}" @input="${(e) => this._setLabel(e.target.value)}" />
          </div>
          <div>
            <label for="type-id">ID</label>
            <input
              id="type-id"
              class="input mono"
              .value="${t.id}"
              ?readonly="${locked}"
              @input="${(e) =>
                this._update((x) => {
                  x.id = typeIdFrom(e.target.value);
                  x.__idTouched = true;
                })}"
            />
          </div>
          <div>
            <span class="label">Icon</span>
            <button class="icon-choice" @click="${this._chooseIcon}" aria-label="Choose icon">
              ${t.icon ? html`<simple-icon-lite icon="${t.icon}"></simple-icon-lite>` : lucide("oer:smile-plus")}${t.icon ? "Change" : "Choose"}
            </button>
          </div>
        </div>
        <div style="margin-top:1rem">
          <label for="type-schema">OER Schema class</label>
          <input
            id="type-schema"
            class="input mono"
            placeholder="e.g. oer:LearningComponent"
            .value="${t.schemaType || ""}"
            @input="${(e) => this._update((x) => (x.schemaType = e.target.value.trim() || undefined))}"
          />
          <p class="hint">How pages of this type describe themselves to search engines and repositories (oerschema.org). Left empty, a sensible default is used.</p>
        </div>
        ${locked ? html`<p class="hint">The ID is fixed because ${used} page${used === 1 ? " uses" : "s use"} this type.</p>` : ""}
        <div style="margin-top:1rem">
          <label for="type-desc">Description</label>
          <textarea id="type-desc" .value="${t.description || ""}" @input="${(e) => this._update((x) => (x.description = e.target.value))}"></textarea>
        </div>
      </section>

      <section>
        <label class="check" style="font-size:0.875rem">
          <input type="checkbox" .checked="${t.nav !== false}" @change="${(e) => this._update((x) => (x.nav = e.target.checked))}" />
          Show in the navigation
        </label>
        <p class="hint">Off: pages of this type (and everything under them) stay out of the sidebar, which then lists only the sections that hold them, as in Decap. Collections, search, links and the outline still find them.</p>
      </section>

      <section>
        <label class="check" style="font-size:0.875rem">
          <input type="checkbox" .checked="${!!t.reader}" @change="${(e) => this._update((x) => (x.reader = e.target.checked || undefined))}" />
          Reader layout
        </label>
        <p class="hint">Pages inside one of these read like a book: the sidebar shows only its chapters (with a filter), Previous / Next stays inside it, and it gets a “Start reading” button.</p>
      </section>

      <section>
        <h3>Can contain</h3>
        <div class="radios" role="radiogroup" aria-label="Can contain">
          <label><input type="radio" name="children" .checked="${mode === "any"}" @change="${() => this._setChildrenMode("any")}" />Any type</label>
          <label><input type="radio" name="children" .checked="${mode === "only"}" @change="${() => this._setChildrenMode("only")}" />Only these types</label>
          <label><input type="radio" name="children" .checked="${mode === "none"}" @change="${() => this._setChildrenMode("none")}" />Nothing</label>
        </div>
        ${mode === "only"
          ? html`<div class="chips">
              ${this._types.map(
                (o) => html`<button class="chip" aria-pressed="${(t.children || []).includes(o.id) ? "true" : "false"}" @click="${() => this._toggleChild(o.id)}">
                  ${(t.children || []).includes(o.id) ? lucide("oer:check", "sm") : ""}${o.label || o.id}
                </button>`,
              )}
            </div>`
          : ""}
        <p class="hint">
          ${mode === "any"
            ? "Pages of this type can hold pages of any type."
            : mode === "none"
              ? "Pages of this type end the outline: no pages can go inside them."
              : "Add page and the outline builder only offer these types inside this one."}
        </p>
      </section>

      <section>
        <h3>Fields</h3>
        <div class="fields">
          <div class="fhead" aria-hidden="true">
            <span></span><span>Label</span><span>Kind</span><span style="text-align:center">Required</span><span style="text-align:center">In header</span><span></span>
          </div>
          ${t.fields.length ? t.fields.map((f, i) => this._renderField(t, f, i)) : html`<div class="nofields">No fields yet. Every page also has a title, description and tags.</div>`}
          <button class="add" @click="${this._addField}">${lucide("oer:plus", "sm")}Add field</button>
        </div>
        <p class="hint">“In header” fields show at the top of each page of this type.</p>
      </section>

      <section>
        <h3>Starter content</h3>
        <textarea
          class="mono"
          style="min-height:7rem"
          aria-label="Starter content (HTML)"
          .value="${t.template || ""}"
          @input="${(e) => this._update((x) => (x.template = e.target.value))}"
        ></textarea>
        <div class="chips">
          ${STARTERS.map(
            (st) => html`<button class="chip" @click="${() => this._update((x) => (x.template = `${(x.template || "").trim()}\n${st.html}`.trim()))}">
              ${lucide("oer:plus", "sm")}${st.label}
            </button>`,
          )}
        </div>
        <p class="hint">What a new page of this type starts with (HTML; any blocks). Existing pages are not changed.</p>
      </section>

      <section class="danger-zone">
        <button class="btn danger-outline" aria-disabled="${used ? "true" : "false"}" @click="${this._deleteType}">${lucide("oer:trash-2", "sm")}Delete type</button>
        <span>${used ? `Used by ${used} page${used === 1 ? "" : "s"}; change their type first.` : "Not used by any page."}</span>
      </section>
    </div>`;
  }

  _renderIO() {
    const importing = this._io === "import";
    return html`<div class="io">
      <div class="io-box" role="dialog" aria-label="${importing ? "Import" : "Export"} content types">
        <h3>${importing ? "Import content types" : "Export content types"}</h3>
        <p class="hint" style="margin:0">
          ${importing
            ? "Paste definitions (JSON). Types with the same ID are replaced; others are added. Nothing is saved until you save the editor."
            : "Copy these definitions to reuse them in another site."}
        </p>
        <textarea .value="${this._ioText}" ?readonly="${!importing}" @input="${(e) => (this._ioText = e.target.value)}"></textarea>
        ${this._ioError ? html`<p class="status error">${this._ioError}</p>` : ""}
        <div class="io-foot">
          <button class="btn outline" @click="${() => (this._io = null)}">${importing ? "Cancel" : "Close"}</button>
          ${importing
            ? html`<button class="btn primary" @click="${this._import}">Import</button>`
            : html`<button class="btn primary" @click="${() => globalThis.navigator.clipboard?.writeText(this._ioText)}">Copy</button>`}
        </div>
      </div>
    </div>`;
  }

  render() {
    if (!this.open) return html``;
    const problems = this._problems();
    const dirty = this._dirty;
    return html`
      <div class="backdrop" @click="${this._requestClose}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${lucide("hax:templates")}Content types</h2>
            <p class="sub">The kinds of page this site uses, their fields, and what each can contain.</p>
          </div>
          <button class="ghost" @click="${this._openImport}">${lucide("icons:file-upload", "sm")}Import</button>
          <button class="ghost" @click="${this._openExport}">${lucide("icons:file-download", "sm")}Export</button>
          <button class="ghost x" aria-label="Close" title="Close (Esc)" @click="${this._requestClose}">${lucide("oer:x")}</button>
        </header>
        <div class="body">${this._renderTypeList()}${this._renderEditor()}</div>
        <footer>
          ${this._confirm
            ? html`<span class="status error">Discard your changes to content types?</span>
                <button class="btn outline" @click="${() => (this._confirm = false)}">Keep editing</button>
                <button class="btn destructive" @click="${this._close}">Discard</button>`
            : html`<span class="status ${problems.length ? "error" : ""}">
                  ${problems.length ? problems[0] : dirty ? "Unsaved changes." : `${this._types.length} type${this._types.length === 1 ? "" : "s"}.`}
                </span>
                <button class="btn outline" @click="${this._requestClose}">Cancel</button>
                <button class="btn primary" aria-disabled="${!dirty || problems.length || this._saving ? "true" : "false"}" @click="${this._save}">
                  ${this._saving ? "Saving…" : "Save content types"}
                </button>`}
        </footer>
        ${this._io ? this._renderIO() : ""}
      </div>
    `;
  }
}
customElements.define(OerTypeEditor.tag, OerTypeEditor);

const iconPickerOpen = () => !!globalThis.document.querySelector("oer-icon-picker[open]");

export function typeEditor() {
  const doc = globalThis.document;
  return doc.querySelector(OerTypeEditor.tag) || doc.body.appendChild(doc.createElement(OerTypeEditor.tag));
}
