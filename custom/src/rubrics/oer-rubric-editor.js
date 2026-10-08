/**
 * `oer-rubric-editor` — edit a rubric page (type Rubric) as a grid: its
 * criteria down the side, each with a description and a weight (% of the
 * grade), its rating levels across the top, each worth a share of a
 * criterion's points, and in each cell what that level looks like for that
 * criterion. Nothing is written until "Save rubric"; every page and course
 * sequence that uses the rubric shows the change (rubrics/rubric-model.js).
 *
 * Saving a rubric that pages or course sequences use first says how many
 * will change, with the choice to save it as a new rubric instead; "Save as
 * new rubric" makes a copy with the changes and leaves the original as it
 * was.
 *
 * Keyboard: Tab moves through the grid; Alt+↑/↓ in a criterion's row moves
 * the criterion, Alt+←/→ in a level's heading moves the level. Esc asks
 * before discarding changes.
 *
 *   rubricEditor().show(pageId)
 * @element oer-rubric-editor
 */
import { html, css, LitElement } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { saveOutline, newItemId } from "../outline/outline-model.js";
import { RUBRIC_TYPE, isRubric, rubricOf, rubricUsage, evenWeights, weightTotal } from "./rubric-model.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;
const uid = (p) => `${p}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
const clone = (o) => JSON.parse(JSON.stringify(o));
const sameWeights = (a, b) => a.length === b.length && a.every((x, i) => Number(x) === b[i]);
const slugify = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

class OerRubricEditor extends LitElement {
  static get tag() {
    return "oer-rubric-editor";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      _draft: { state: true },
      _confirmDiscard: { state: true },
      _confirm: { state: true }, // null | "save" (what changes) | "saveas" (the copy's name)
      _newName: { state: true },
      _saving: { state: true },
    };
  }

  constructor() {
    super();
    this.open = false;
    this._draft = null;
    this.__keys = (e) => {
      if (!this.open || e.key !== "Escape") return;
      e.preventDefault();
      e.stopPropagation();
      if (this._confirm) this._closeConfirm();
      else this._requestClose();
    };
  }

  /* ---------- open / close / save ---------- */

  show(pageId) {
    const page = (toJS(store.manifest?.items) || []).find((i) => i.id === pageId);
    if (!page) return;
    this._pageId = pageId;
    const r = rubricOf(page);
    this._draft = { name: r.name, description: r.description, key: r.key, levels: r.levels, criteria: r.criteria };
    this._snapshot = JSON.stringify(this._draft);
    this._confirmDiscard = false;
    this._confirm = null;
    this._saving = false;
    this.open = true;
    globalThis.addEventListener("keydown", this.__keys, true);
    this.updateComplete.then(() => this.shadowRoot.querySelector("#name")?.focus());
  }

  get _dirty() {
    return JSON.stringify(this._draft) !== this._snapshot;
  }

  _requestClose() {
    if (this._dirty && !this._confirmDiscard) {
      this._confirmDiscard = true;
      return;
    }
    this._close();
  }

  _close() {
    this.open = false;
    this._confirmDiscard = false;
    this._confirm = null;
    globalThis.removeEventListener("keydown", this.__keys, true);
  }

  // the draft as stored: trimmed, without descriptions of removed levels
  _stored(key) {
    const d = this._draft;
    const levelIds = new Set(d.levels.map((l) => l.id));
    return {
      version: 1,
      key,
      levels: d.levels.map((l) => ({ id: l.id, name: l.name.trim(), share: Math.max(0, Math.min(1, Number(l.share) || 0)) })),
      criteria: d.criteria.map((c) => ({
        id: c.id,
        name: c.name.trim(),
        description: c.description.trim(),
        weight: Math.max(0, Number(c.weight) || 0),
        descriptors: Object.fromEntries(Object.entries(c.descriptors || {}).filter(([k, v]) => levelIds.has(k) && String(v).trim()).map(([k, v]) => [k, String(v).trim()])),
      })),
    };
  }

  get _page() {
    return (toJS(store.manifest?.items) || []).find((i) => i.id === this._pageId);
  }

  // where the rubric is used: pages, archived versions, course sequences
  _usage() {
    const page = this._page;
    return page ? rubricUsage(toJS(store.manifest?.items) || [], page) : { pages: [], versions: [], sequences: [] };
  }

  // straight away when nothing else uses the rubric; otherwise say what
  // will change first
  _requestSave() {
    if (!this._dirty || this._saving) return;
    const u = this._usage();
    if (u.pages.length || u.versions.length || u.sequences.length) {
      this._confirm = "save";
      this._focus(".confirm .btn.primary");
    } else this._save();
  }

  _openSaveAs() {
    const name = this._draft.name.trim();
    const original = JSON.parse(this._snapshot).name;
    this._newName = name && name !== original ? name : `${name || original} (copy)`;
    this._confirm = "saveas";
    this._focus("#new-name");
  }

  _closeConfirm() {
    const was = this._confirm;
    this._confirm = null;
    this._focus(was === "saveas" ? ".save-as" : ".save");
  }

  async _save() {
    const page = this._page;
    if (!page) return;
    const d = this._draft;
    // the key is set once, so references made with it keep working
    const oerRubric = this._stored(d.key || String(page.slug || "").split("/").filter(Boolean).pop() || page.id);
    this._saving = true;
    await saveOutline([{ ...page, title: d.name.trim() || page.title, metadata: { ...page.metadata, oerRubric }, modified: true }]);
    // HAX keeps descriptions out of outline saves
    const description = d.description.trim();
    if (description !== (page.description || "")) {
      await store.cmsSiteEditor?.instance?.saveNodeDetails?.({ detail: { id: page.id, operation: "setDescription", description } });
    }
    this._saving = false;
    this._close();
  }

  // a new rubric page beside this one, with the changes; the original stays
  // as it was. Then go to it.
  async _saveAs() {
    const name = String(this._newName || "").trim();
    const page = this._page;
    if (!name || !page || this._saving) return;
    const items = toJS(store.manifest?.items) || [];
    const keys = new Set(items.filter(isRubric).map((i) => i.metadata?.oerRubric?.key));
    const base = slugify(name) || "rubric";
    let key = base;
    for (let n = 2; keys.has(key); n++) key = `${base}-${n}`;
    this._saving = true;
    await saveOutline([
      {
        id: newItemId(),
        title: name,
        parent: page.parent || null,
        order: items.filter((i) => (i.parent || null) === (page.parent || null)).length,
        indent: Number(page.indent) || 0,
        location: "",
        description: "",
        metadata: { pageType: RUBRIC_TYPE, published: page.metadata?.published !== false, oerFields: { ...(page.metadata?.oerFields || {}) }, oerRubric: this._stored(key) },
        contents: "",
        new: true,
      },
    ]);
    const created = (toJS(store.manifest?.items) || []).find((i) => isRubric(i) && i.metadata?.oerRubric?.key === key);
    const description = this._draft.description.trim();
    if (created && description) await store.cmsSiteEditor?.instance?.saveNodeDetails?.({ detail: { id: created.id, operation: "setDescription", description } });
    this._saving = false;
    this._close();
    if (created) {
      globalThis.history.pushState({}, "", created.slug);
      globalThis.dispatchEvent(new PopStateEvent("popstate"));
    }
  }

  /* ---------- edits ---------- */

  _edit(fn) {
    const d = clone(this._draft);
    fn(d);
    this._draft = d;
    this._confirmDiscard = false;
  }

  // weights still split evenly stay even when criteria come and go
  _reweigh(d, before) {
    if (sameWeights(before, evenWeights(before.length))) {
      const even = evenWeights(d.criteria.length);
      d.criteria.forEach((c, i) => (c.weight = even[i]));
    }
  }

  _addCriterion() {
    const id = uid("criterion");
    this._edit((d) => {
      const before = d.criteria.map((c) => c.weight);
      d.criteria.push({ id, name: "", description: "", weight: 0, descriptors: {} });
      this._reweigh(d, before);
    });
    this._focus(`[data-criterion="${id}"] .cname`);
  }

  _removeCriterion(i) {
    this._edit((d) => {
      const before = d.criteria.map((c) => c.weight);
      d.criteria.splice(i, 1);
      this._reweigh(d, before);
    });
    this._focus(".add-criterion");
  }

  _moveCriterion(i, delta, focusSel) {
    const j = i + delta;
    if (j < 0 || j >= this._draft.criteria.length) return;
    const id = this._draft.criteria[i].id;
    this._edit((d) => d.criteria.splice(j, 0, ...d.criteria.splice(i, 1)));
    if (focusSel) this._focus(`[data-criterion="${id}"] ${focusSel}`);
  }

  _addLevel() {
    const id = uid("level");
    this._edit((d) => d.levels.push({ id, name: "", share: 0 }));
    this._focus(`[data-level="${id}"] .lname`);
  }

  _removeLevel(i) {
    this._edit((d) => d.levels.splice(i, 1));
    this._focus(".add-level");
  }

  _moveLevel(i, delta, focusSel) {
    const j = i + delta;
    if (j < 0 || j >= this._draft.levels.length) return;
    const id = this._draft.levels[i].id;
    this._edit((d) => d.levels.splice(j, 0, ...d.levels.splice(i, 1)));
    if (focusSel) this._focus(`[data-level="${id}"] ${focusSel}`);
  }

  _evenOut() {
    this._edit((d) => {
      const even = evenWeights(d.criteria.length);
      d.criteria.forEach((c, i) => (c.weight = even[i]));
    });
  }

  _focus(sel) {
    this.updateComplete.then(() => this.shadowRoot.querySelector(sel)?.focus());
  }

  // Alt+arrows move the criterion (row) or level (column) being edited
  _rowKeys(e, i) {
    if (!e.altKey || !["ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    const t = e.target;
    const sel = t.dataset.levelCell ? `[data-level-cell="${t.dataset.levelCell}"]` : t.classList.contains("cname") ? ".cname" : t.classList.contains("weight") ? ".weight" : ".cdesc";
    this._moveCriterion(i, e.key === "ArrowUp" ? -1 : 1, sel);
  }

  _levelKeys(e, i) {
    if (!e.altKey || !["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    e.preventDefault();
    this._moveLevel(i, e.key === "ArrowLeft" ? -1 : 1, e.target.classList.contains("share") ? ".share" : ".lname");
  }

  /* ---------- render ---------- */

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
        width: min(84rem, calc(100vw - 1.5rem));
        height: calc(100dvh - 1.5rem);
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        overflow: hidden;
      }
      button {
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
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0;
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
      .x,
      .icon {
        all: unset;
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .icon {
        width: 1.75rem;
        height: 1.75rem;
      }
      .x:hover,
      .icon:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .icon.danger:hover {
        color: var(--destructive);
      }
      .icon:disabled {
        opacity: 0.35;
        cursor: default;
        background: none;
      }
      .x:focus-visible,
      .icon:focus-visible,
      .btn:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .body {
        flex: 1;
        min-height: 0;
        overflow: auto;
        padding: 1.25rem;
      }
      .about {
        display: grid;
        grid-template-columns: minmax(12rem, 22rem) minmax(16rem, 1fr);
        gap: 1rem;
        max-width: 64rem;
        margin-bottom: 1.5rem;
      }
      label.field {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        font-size: 0.8125rem;
        font-weight: 500;
      }
      .input {
        box-sizing: border-box;
        width: 100%;
        min-height: 2.25rem;
        padding: 0.375rem 0.625rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        color: inherit;
        font: inherit;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.4;
      }
      textarea.input {
        resize: vertical;
        field-sizing: content;
        min-height: 4.5rem;
      }
      .input:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .num {
        width: 4.5rem;
        flex: none;
        text-align: end;
      }
      h3 {
        margin: 0 0 0.25rem;
        font-size: 0.9375rem;
        font-weight: 600;
      }
      .hint {
        margin: 0 0 0.75rem;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      /* the grid: criteria down, levels across; the criterion column stays
         in view while the levels scroll */
      .grid-wrap {
        overflow-x: auto;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
      }
      table {
        border-collapse: separate;
        border-spacing: 0;
        min-width: 100%;
      }
      th,
      td {
        vertical-align: top;
        padding: 0.625rem;
        border-bottom: 1px solid var(--border);
        border-right: 1px solid var(--border);
        text-align: start;
        background: var(--background);
      }
      tr > :last-child {
        border-right: 0;
      }
      tbody tr:last-child > * {
        border-bottom: 0;
      }
      th {
        font-weight: 500;
      }
      thead th {
        background: var(--muted);
      }
      .crit-col {
        position: sticky;
        left: 0;
        z-index: 1;
        width: 18rem;
        min-width: 18rem;
        box-shadow: 1px 0 0 var(--border);
      }
      thead .crit-col {
        z-index: 2;
        font-size: 0.8125rem;
        vertical-align: middle;
      }
      .level-col {
        min-width: 12rem;
        width: 13rem;
      }
      .add-col {
        width: 1%;
        white-space: nowrap;
        vertical-align: middle;
      }
      .stack {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      .line {
        display: flex;
        align-items: center;
        gap: 0.375rem;
      }
      .line .input:not(.num) {
        flex: 1;
        min-width: 0;
      }
      .unit {
        font-size: 0.8125rem;
        font-weight: 400;
        color: var(--muted-foreground);
      }
      .tools {
        display: flex;
        gap: 0.125rem;
        margin-left: auto;
      }
      td textarea.input {
        min-height: 5.5rem;
      }
      .cdesc {
        min-height: 3.5rem !important;
      }
      .below {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.75rem;
        margin-top: 0.75rem;
      }
      .total {
        font-size: 0.8125rem;
        font-variant-numeric: tabular-nums;
        color: var(--muted-foreground);
      }
      .total.off {
        color: var(--destructive);
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
        cursor: pointer;
        white-space: nowrap;
      }
      .btn.small {
        height: 2rem;
        padding: 0 0.75rem;
        font-size: 0.8125rem;
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
      .btn.primary[aria-disabled="true"] {
        opacity: 0.5;
        cursor: default;
      }
      .btn.destructive {
        background: var(--destructive);
        color: var(--destructive-foreground, white);
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
      .warn {
        flex: 1;
        font-size: 0.8125rem;
        color: var(--destructive);
      }
      kbd {
        font-family: var(--font-mono, ui-monospace, monospace);
      }
      .btn:disabled {
        opacity: 0.5;
        cursor: default;
      }
      .confirm-layer {
        position: absolute;
        inset: 0;
        z-index: 10;
        display: grid;
        place-items: center;
        padding: 1rem;
        background: rgb(0 0 0 / 0.35);
      }
      .confirm {
        box-sizing: border-box;
        width: min(32rem, 100%);
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: 1.5rem;
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
      }
      .confirm h3 {
        margin: 0;
        font-size: 1.0625rem;
      }
      .confirm p {
        margin: 0;
        font-size: 0.875rem;
        line-height: 1.5;
        color: var(--muted-foreground);
      }
      .confirm .used {
        max-height: 10rem;
        overflow-y: auto;
        margin: 0;
        padding: 0.5rem 0.75rem 0.5rem 1.75rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        font-size: 0.875rem;
      }
      .confirm .used a {
        color: var(--link, var(--primary));
      }
      .confirm .used .more {
        list-style: none;
        color: var(--muted-foreground);
      }
      .confirm .actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 0.5rem;
        margin-top: 0.25rem;
      }
      @media (max-width: 720px) {
        .about {
          grid-template-columns: minmax(0, 1fr);
        }
        .crit-col {
          position: static;
          min-width: 14rem;
          width: 14rem;
        }
      }
    `;
  }

  _renderLevelHead(l, i, n) {
    const set = (patch) => this._edit((d) => Object.assign(d.levels[i], patch));
    return html`<th class="level-col" scope="col" data-level="${l.id}" @keydown="${(e) => this._levelKeys(e, i)}">
      <div class="stack">
        <input class="input lname" aria-label="Level ${i + 1} name" placeholder="Level name" .value="${l.name}" @input="${(e) => set({ name: e.target.value })}" />
        <div class="line">
          <input
            class="input num share"
            type="number"
            min="0"
            max="100"
            aria-label="${l.name || `Level ${i + 1}`}: share of a criterion's points (%)"
            .value="${String(Math.round(l.share * 1000) / 10)}"
            @input="${(e) => set({ share: Math.max(0, Math.min(100, Number(e.target.value) || 0)) / 100 })}"
          />
          <span class="unit" title="Share of a criterion's points">%</span>
          <span class="tools">
            <button class="icon" title="Move left (Alt+←)" aria-label="Move ${l.name || "level"} left" ?disabled="${i === 0}" @click="${() => this._moveLevel(i, -1)}">${lucide("oer:chevron-left", "sm")}</button>
            <button class="icon" title="Move right (Alt+→)" aria-label="Move ${l.name || "level"} right" ?disabled="${i === n - 1}" @click="${() => this._moveLevel(i, 1)}">${lucide("oer:chevron-right", "sm")}</button>
            <button class="icon danger" title="Remove level" aria-label="Remove ${l.name || "level"}" ?disabled="${n <= 1}" @click="${() => this._removeLevel(i)}">${lucide("oer:x", "sm")}</button>
          </span>
        </div>
      </div>
    </th>`;
  }

  _renderCriterion(c, i, n) {
    const d = this._draft;
    const set = (patch) => this._edit((x) => Object.assign(x.criteria[i], patch));
    const name = c.name || `Criterion ${i + 1}`;
    return html`<tr data-criterion="${c.id}" @keydown="${(e) => this._rowKeys(e, i)}">
      <th class="crit-col" scope="row">
        <div class="stack">
          <input class="input cname" aria-label="Criterion ${i + 1} name" placeholder="Criterion" .value="${c.name}" @input="${(e) => set({ name: e.target.value })}" />
          <textarea class="input cdesc" aria-label="${name}: description" placeholder="What it assesses" .value="${c.description}" @input="${(e) => set({ description: e.target.value })}"></textarea>
          <div class="line">
            <input
              class="input num weight"
              type="number"
              min="0"
              max="100"
              aria-label="${name}: weight (% of the grade)"
              .value="${String(c.weight)}"
              @input="${(e) => set({ weight: Math.max(0, Number(e.target.value) || 0) })}"
            />
            <span class="unit">% of the grade</span>
            <span class="tools">
              <button class="icon" title="Move up (Alt+↑)" aria-label="Move ${name} up" ?disabled="${i === 0}" @click="${() => this._moveCriterion(i, -1)}">${lucide("oer:chevron-up", "sm")}</button>
              <button class="icon" title="Move down (Alt+↓)" aria-label="Move ${name} down" ?disabled="${i === n - 1}" @click="${() => this._moveCriterion(i, 1)}">${lucide("oer:chevron-down", "sm")}</button>
              <button class="icon danger" title="Remove criterion" aria-label="Remove ${name}" @click="${() => this._removeCriterion(i)}">${lucide("oer:x", "sm")}</button>
            </span>
          </div>
        </div>
      </th>
      ${d.levels.map(
        (l) => html`<td class="level-col">
          <textarea
            class="input"
            data-level-cell="${l.id}"
            aria-label="${name} at ${l.name || "this level"}"
            placeholder="What ${l.name ? l.name.toLowerCase() : "this level"} work looks like (optional)"
            .value="${c.descriptors?.[l.id] || ""}"
            @input="${(e) => set({ descriptors: { ...(c.descriptors || {}), [l.id]: e.target.value } })}"
          ></textarea>
        </td>`,
      )}
      <td class="add-col"></td>
    </tr>`;
  }

  // shadcn AlertDialog inside the editor: what saving changes, or the
  // copy's name
  _renderConfirm() {
    const keys = (e) => {
      if (e.key !== "Tab") return;
      const all = [...e.currentTarget.querySelectorAll("button, input, a[href]")];
      const active = this.shadowRoot.activeElement;
      if (e.shiftKey && active === all[0]) {
        all.at(-1).focus();
        e.preventDefault();
      } else if (!e.shiftKey && active === all.at(-1)) {
        all[0].focus();
        e.preventDefault();
      }
    };
    if (this._confirm === "saveas") {
      return html`<div class="confirm-layer" @click="${this._closeConfirm}">
        <form class="confirm" role="alertdialog" aria-modal="true" aria-labelledby="c-t" aria-describedby="c-d" @click="${(e) => e.stopPropagation()}" @keydown="${keys}" @submit="${(e) => (e.preventDefault(), this._saveAs())}">
          <h3 id="c-t">Save as a new rubric</h3>
          <p id="c-d">A copy with your changes, beside this one under Rubrics. “${JSON.parse(this._snapshot).name}” stays as it was, and so do the pages that use it.</p>
          <label class="field">Name<input id="new-name" class="input" required .value="${this._newName}" @input="${(e) => (this._newName = e.target.value)}" /></label>
          <div class="actions">
            <button type="button" class="btn outline" @click="${this._closeConfirm}">Cancel</button>
            <button type="submit" class="btn primary" aria-disabled="${String(this._newName || "").trim() && !this._saving ? "false" : "true"}">${this._saving ? "Saving…" : "Create rubric"}</button>
          </div>
        </form>
      </div>`;
    }
    const u = this._usage();
    const parts = [
      u.pages.length ? plural(u.pages.length, "page") : "",
      u.sequences.length ? `${plural(u.sequences.length, "course sequence")} (${plural(u.sequences.reduce((s, x) => s + x.items, 0), "graded item")})` : "",
      u.versions.length ? plural(u.versions.length, "archived version") : "",
    ].filter(Boolean);
    const listed = [...u.pages, ...u.sequences.map((x) => x.page)];
    const name = JSON.parse(this._snapshot).name;
    return html`<div class="confirm-layer" @click="${this._closeConfirm}">
      <div class="confirm" role="alertdialog" aria-modal="true" aria-labelledby="c-t" aria-describedby="c-d" @click="${(e) => e.stopPropagation()}" @keydown="${keys}">
        <h3 id="c-t">Change “${name}” everywhere it's used?</h3>
        <p id="c-d">
          It's used by ${parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts.at(-1)}` : parts[0]}. They'll all show the changed rubric${u.sequences.length ? ", and the next Canvas export grades with it" : ""}.
          To change it for one piece of work only, save it as a new rubric instead.
        </p>
        ${listed.length
          ? html`<ul class="used" role="list">
              ${listed.slice(0, 8).map((p) => html`<li><a href="${p.slug}" target="_blank">${p.title}</a></li>`)}
              ${listed.length > 8 ? html`<li class="more">and ${listed.length - 8} more</li>` : ""}
            </ul>`
          : ""}
        <div class="actions">
          <button class="btn outline" @click="${this._closeConfirm}">Keep editing</button>
          <button class="btn outline" @click="${this._openSaveAs}">Save as new rubric…</button>
          <button class="btn primary" aria-disabled="${this._saving ? "true" : "false"}" @click="${() => !this._saving && this._save()}">${this._saving ? "Saving…" : `Change ${plural(u.pages.length + u.sequences.length + u.versions.length, "use")}`}</button>
        </div>
      </div>
    </div>`;
  }

  render() {
    if (!this.open || !this._draft) return html``;
    const d = this._draft;
    const total = weightTotal(d);
    const off = d.criteria.length > 0 && Math.round(total * 10) / 10 !== 100;
    const unnamed = d.criteria.filter((c) => !c.name.trim()).length + d.levels.filter((l) => !l.name.trim()).length;
    const dirty = this._dirty;
    return html`
      <div class="backdrop" @click="${this._requestClose}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${lucide("icons:assignment-turned-in")}Edit rubric</h2>
            <p class="sub">Changes apply when you save, everywhere this rubric is used.</p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._requestClose}">${lucide("oer:x")}</button>
        </header>
        <div class="body">
          <div class="about">
            <label class="field">Name<input id="name" class="input" .value="${d.name}" @input="${(e) => this._edit((x) => (x.name = e.target.value))}" /></label>
            <label class="field"
              >Description
              <textarea class="input" placeholder="What kind of work it's for" .value="${d.description}" @input="${(e) => this._edit((x) => (x.description = e.target.value))}"></textarea>
            </label>
          </div>
          <h3>Criteria and levels</h3>
          <p class="hint">
            Each criterion's weight is its share of the grade, so the rubric fits work of any point value. Each level is worth a share (%) of a criterion's points. The cells say what each level
            looks like (optional). <kbd>Alt</kbd>+arrows move a criterion or level.
          </p>
          <div class="grid-wrap">
            <table>
              <thead>
                <tr>
                  <th class="crit-col" scope="col">Criterion</th>
                  ${d.levels.map((l, i) => this._renderLevelHead(l, i, d.levels.length))}
                  <th class="add-col" scope="col">
                    <button class="btn outline small add-level" @click="${this._addLevel}">${lucide("oer:plus", "sm")}Add level</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                ${d.criteria.map((c, i) => this._renderCriterion(c, i, d.criteria.length))}
              </tbody>
            </table>
          </div>
          <div class="below">
            <button class="btn outline small add-criterion" @click="${this._addCriterion}">${lucide("oer:plus", "sm")}Add criterion</button>
            ${d.criteria.length
              ? html`<span class="total ${off ? "off" : ""}" role="status">Weights add up to ${Math.round(total * 10) / 10}%${off ? ", not 100%" : ""}</span>
                  ${off ? html`<button class="btn outline small" @click="${this._evenOut}">Split evenly</button>` : ""}`
              : ""}
          </div>
        </div>
        <footer>
          ${this._confirmDiscard
            ? html`<span class="warn">Discard your changes to this rubric?</span>
                <button class="btn outline" @click="${() => (this._confirmDiscard = false)}">Keep editing</button>
                <button class="btn destructive" @click="${this._close}">Discard</button>`
            : html`<span class="status">
                  ${d.criteria.length} criteri${d.criteria.length === 1 ? "on" : "a"}, ${d.levels.length} level${d.levels.length === 1 ? "" : "s"}${unnamed ? `. ${unnamed} still need${unnamed === 1 ? "s" : ""} a name.` : ""}
                </span>
                <button class="btn outline" @click="${this._requestClose}">Cancel</button>
                <button class="btn outline save-as" ?disabled="${this._saving}" @click="${this._openSaveAs}">Save as new rubric…</button>
                <button class="btn primary save" aria-disabled="${dirty && !this._saving ? "false" : "true"}" @click="${this._requestSave}">${this._saving ? "Saving…" : "Save rubric"}</button>`}
        </footer>
        ${this._confirm ? this._renderConfirm() : ""}
      </div>
    `;
  }
}
customElements.define(OerRubricEditor.tag, OerRubricEditor);

/** The page-wide rubric editor, created on first use. */
export function rubricEditor() {
  const doc = globalThis.document;
  return doc.querySelector(OerRubricEditor.tag) || doc.body.appendChild(doc.createElement(OerRubricEditor.tag));
}
