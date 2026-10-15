/**
 * `oer-outcome-picker` — choose learning outcomes for a page from the shared
 * bank (a Learning outcomes field's "Add"). The bank is grouped nearest
 * first: the outcomes of the page's courses (its Courses field, its parent
 * project's, or the sequences that use it), then those of their programs and
 * pathways, then every other outcome, folded away until searched. Search
 * matches code or statement; several can be ticked at once; a new outcome
 * can be written and added without leaving.
 *
 *   const ids = await outcomePicker().pick({ page, courses, linked });
 *   // [outcome page id…], or null if cancelled
 *
 * A native modal dialog (shadcn Dialog): focus starts in the search, stays
 * inside, and goes back to the opener; Esc and Cancel close it.
 * @element oer-outcome-picker
 */
import { html, css, LitElement } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { formControls } from "./form-controls.js";
import { saveOutline, newItemId } from "../outline/outline-model.js";
import { homeOf } from "../types/type-homes.js";
import { OUTCOME_TYPE, OUTCOME_DEF, LEVELS, outcomeGroups } from "../types/outcome.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;
const slugify = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

// focus as the person sees it, inside shadow roots
function deepActive() {
  let el = globalThis.document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el;
}

class OerOutcomePicker extends LitElement {
  static get tag() {
    return "oer-outcome-picker";
  }

  static get properties() {
    return {
      _open: { state: true },
      _q: { state: true },
      _sel: { state: true },
      _showOther: { state: true },
      _step: { state: true },
      _draft: { state: true },
      _busy: { state: true },
      _error: { state: true },
    };
  }

  constructor() {
    super();
    this._open = false;
    this._q = "";
    this._sel = new Set();
    this._showOther = false;
    this._step = "choose";
    this._draft = null;
    this._busy = false;
    this._error = "";
  }

  /**
   * page: the page being linked (its courses and sequences set the groups);
   * courses: its Courses field as being edited, if not yet saved; linked:
   * outcome ids it names already; title: the dialog's heading.
   */
  pick({ page = null, courses = null, linked = [], title = "Add learning outcomes" } = {}) {
    this._done(null);
    this.__opener = deepActive();
    this._page = page;
    this._courses = Array.isArray(courses) ? courses : null;
    this._linked = new Set(linked);
    this._title = title;
    this._q = "";
    this._sel = new Set();
    this._showOther = false;
    this._step = "choose";
    this._error = "";
    this._open = true;
    return new Promise((resolve) => (this.__resolve = resolve));
  }

  _done(value) {
    const resolve = this.__resolve;
    this.__resolve = null;
    this._open = false;
    resolve?.(value);
  }

  updated(changed) {
    // for dialogs under it that close on Esc (Page details)
    this.toggleAttribute("open", this._open);
    const dialog = this.shadowRoot.querySelector("dialog");
    if (changed.has("_open")) {
      if (this._open && !dialog.open) {
        dialog.showModal();
        this.shadowRoot.querySelector("input[type=search]")?.focus();
      }
      if (!this._open && dialog.open) {
        dialog.close();
        if (this.__opener?.isConnected) this.__opener.focus();
      }
    }
    if (changed.has("_step") && this._open) this.shadowRoot.querySelector(this._step === "create" ? "#st" : "input[type=search]")?.focus();
  }

  get _items() {
    return toJS(store.manifest?.items) || [];
  }

  _toggle(id, on) {
    const next = new Set(this._sel);
    if (on) next.add(id);
    else next.delete(id);
    this._sel = next;
  }

  _matches(o) {
    const words = this._q.toLowerCase().split(/\s+/).filter(Boolean);
    const text = `${o.metadata?.oerFields?.code || ""} ${o.title}`.toLowerCase();
    return words.every((w) => text.includes(w));
  }

  /* ---------- a new outcome ---------- */

  _startCreate(courses) {
    this._draft = { statement: this._q.trim(), code: "", level: "", for: new Set(courses.slice(0, 1).map((c) => c.id)) };
    this._error = "";
    this._step = "create";
  }

  async _create() {
    const d = this._draft;
    if (!d.statement.trim()) {
      this._error = "Write the outcome's statement first.";
      this.shadowRoot.querySelector("#st")?.focus();
      return;
    }
    if (this._busy) return;
    this._busy = true;
    this._error = "";
    try {
      const all = this._items;
      const home = homeOf(OUTCOME_TYPE, all);
      if (!home) throw new Error("There's no Learning outcomes section to put it in. Add one under Curriculum first.");
      const prefix = home.slug || "learning-outcomes";
      const base = slugify(d.code || d.statement) || "outcome";
      let tail = base;
      for (let k = 2; all.some((i) => i.slug === `${prefix}/${tail}`); k++) tail = `${base}-${k}`;
      const order = Math.max(-1, ...all.filter((i) => i.parent === home.id).map((i) => Number(i.order) || 0)) + 1;
      const item = {
        id: newItemId(),
        title: d.statement.trim(),
        parent: home.id,
        indent: (Number(home.indent) || 0) + 1,
        order,
        slug: `${prefix}/${tail}`,
        location: "",
        description: "",
        metadata: {
          pageType: OUTCOME_TYPE,
          published: false,
          overridePathauto: true,
          oerFields: { code: d.code.trim(), level: d.level, courses: [...d.for].map((page) => ({ page, version: "" })), pathways: [], programs: [], partOf: [] },
        },
        contents: OUTCOME_DEF.template,
        new: true,
      };
      await saveOutline([item]);
      // HAX gives a new page its id as it saves it
      const saved = this._items.find((i) => i.slug === item.slug);
      if (!saved) throw new Error("The outcome was saved, but couldn't be found to add. Add it from the list.");
      this._busy = false;
      this._done([...this._sel, saved.id]);
    } catch (err) {
      this._busy = false;
      this._error = err.message;
    }
  }

  /* ---------- render ---------- */

  _row(o) {
    const linked = this._linked.has(o.id);
    const f = o.metadata?.oerFields || {};
    return html`<li>
      <label class="row ${linked ? "linked" : ""}">
        <input type="checkbox" .checked="${linked || this._sel.has(o.id)}" ?disabled="${linked}" @change="${(e) => this._toggle(o.id, e.target.checked)}" />
        <span class="text">
          <span class="statement">${f.code ? html`<span class="code">${f.code}</span>` : ""}${o.title}</span>
          <span class="meta">${[f.level, linked ? "Already linked" : "", o.metadata?.published === false ? "Draft" : ""].filter(Boolean).join(" · ")}</span>
        </span>
      </label>
    </li>`;
  }

  _renderChoose() {
    const { groups, courses } = outcomeGroups(this._page, this._items, this._courses);
    const searching = !!this._q.trim();
    const shown = groups.map((g) => ({ ...g, list: g.outcomes.filter((o) => this._matches(o)) }));
    const total = shown.reduce((n, g) => n + g.list.length, 0);
    const n = this._sel.size;
    return html`<header>
        <h2 id="t">${this._title}</h2>
        <p class="sub">${courses.length ? `Outcomes for ${courses.map((c) => c.metadata?.oerFields?.code || c.title).join(" and ")} first.` : "This page isn't linked to a course yet, so every outcome is listed together."}</p>
        <button class="x" aria-label="Close" title="Close (Esc)" @click="${() => this._done(null)}">${lucide("oer:x")}</button>
      </header>
      <div class="search">
        ${lucide("icons:search")}<input type="search" placeholder="Search by code or statement…" aria-label="Search outcomes" .value="${this._q}" @input="${(e) => (this._q = e.target.value)}" />
      </div>
      <p class="count" role="status">${searching ? `${plural(total, "outcome")} found` : ""}</p>
      <div class="body">
        ${shown.map((g) => {
          const other = g.id === "other";
          if (!g.list.length && (other || searching || !courses.some((c) => c.id === g.id))) return "";
          if (other && !searching && courses.length) {
            return html`<section class="group">
              <button class="fold" aria-expanded="${this._showOther ? "true" : "false"}" @click="${() => (this._showOther = !this._showOther)}">
                ${lucide(this._showOther ? "oer:chevron-down" : "oer:chevron-right", "sm")}${g.label}<span class="n">${g.list.length}</span>
              </button>
              ${this._showOther ? html`<ul aria-label="${g.label}">${g.list.map((o) => this._row(o))}</ul>` : ""}
            </section>`;
          }
          return html`<section class="group" aria-labelledby="g-${g.id}">
            <h3 id="g-${g.id}">${g.label}<span class="n">${g.list.length}</span></h3>
            ${g.list.length ? html`<ul>${g.list.map((o) => this._row(o))}</ul>` : html`<p class="empty">No outcomes for ${g.label} yet.</p>`}
          </section>`;
        })}
        ${searching && !total ? html`<p class="empty">No outcome matches “${this._q.trim()}”.</p>` : ""}
      </div>
      <footer>
        <button class="btn ghost new" @click="${() => this._startCreate(courses)}">${lucide("oer:plus", "sm")}Create a new outcome</button>
        <span class="grow"></span>
        <button class="btn outline" @click="${() => this._done(null)}">Cancel</button>
        <button class="btn primary" aria-disabled="${n ? "false" : "true"}" @click="${() => n && this._done([...this._sel])}">${n ? `Add ${plural(n, "outcome")}` : "Add outcomes"}</button>
      </footer>`;
  }

  _renderCreate() {
    const d = this._draft;
    const { courses } = outcomeGroups(this._page, this._items, this._courses);
    // from the draft as it is now, not as this render saw it
    const set = (patch) => (this._draft = { ...this._draft, ...patch });
    const forNames = courses.filter((c) => d.for.has(c.id)).map((c) => c.metadata?.oerFields?.code || c.title);
    return html`<header>
        <h2 id="t">Create a learning outcome</h2>
        <p class="sub">It joins the shared list under Learning outcomes and is added to this page.</p>
        <button class="x" aria-label="Close" title="Close (Esc)" @click="${() => this._done(null)}">${lucide("oer:x")}</button>
      </header>
      <div class="body form">
        <label class="field" for="st">Statement
          <textarea id="st" class="input" rows="2" placeholder="What students can do, e.g. Prepare files for laser cutting and 3D printing" aria-invalid="${this._error && !d.statement.trim() ? "true" : "false"}" .value="${d.statement}" @input="${(e) => set({ statement: e.target.value })}"></textarea>
        </label>
        <div class="pair">
          <label class="field"><span>Code <span class="hint">optional</span></span><input class="input" placeholder="e.g. DMD 400 CLO.6" .value="${d.code}" @input="${(e) => set({ code: e.target.value })}" /></label>
          <label class="field">Level
            <select class="input" @change="${(e) => set({ level: e.target.value })}">
              <option value="" ?selected="${!d.level}">Not set</option>
              ${LEVELS.map((l) => html`<option value="${l}" ?selected="${d.level === l}">${l}</option>`)}
            </select>
          </label>
        </div>
        ${courses.length
          ? html`<fieldset class="field">
              <legend>Courses</legend>
              ${courses.map(
                (c) => html`<label class="check"><input type="checkbox" .checked="${d.for.has(c.id)}" @change="${(e) => {
                  const next = new Set(this._draft.for);
                  if (e.target.checked) next.add(c.id);
                  else next.delete(c.id);
                  set({ for: next });
                }}" />${c.title}</label>`,
              )}
            </fieldset>`
          : ""}
        <div class="callout" role="note">
          ${lucide("oer:circle-alert", "sm")}
          <p>Creates a draft outcome${forNames.length ? ` for ${forNames.join(" and ")}` : ""} and adds it to this page. Only signed-in authors see it until it's published; open it later to add programs, pathways or what it's measured by.</p>
        </div>
        ${this._error ? html`<p class="error" role="alert">${this._error}</p>` : ""}
      </div>
      <footer>
        <button class="btn outline" @click="${() => (this._step = "choose")}">Back</button>
        <span class="grow"></span>
        <button class="btn primary" aria-disabled="${this._busy ? "true" : "false"}" @click="${this._create}">${this._busy ? "Creating…" : "Create and add"}</button>
      </footer>`;
  }

  render() {
    return html`<dialog
      class="${this._step}"
      aria-labelledby="t"
      @cancel="${(e) => {
        e.preventDefault();
        if (!this._busy) this._done(null);
      }}"
    >
      ${this._open ? html`<div class="panel">${this._step === "create" ? this._renderCreate() : this._renderChoose()}</div>` : ""}
    </dialog>`;
  }

  static get styles() {
    return [
      formControls,
      css`
        :host {
          font-family: var(--font-sans, system-ui, sans-serif);
          color: var(--foreground);
        }
        dialog {
          width: min(40rem, calc(100vw - 2rem));
          max-height: min(44rem, calc(100dvh - 2rem));
          padding: 0;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg, 0.75rem);
          background: var(--popover, var(--background));
          color: var(--popover-foreground, var(--foreground));
          box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
          overflow: hidden;
        }
        dialog[open] {
          display: flex;
        }
        /* the same height as the list narrows, so it doesn't jump */
        dialog.choose {
          height: min(36rem, calc(100dvh - 2rem));
        }
        dialog::backdrop {
          background: rgb(0 0 0 / 0.5);
        }
        .panel {
          display: flex;
          flex-direction: column;
          width: 100%;
          min-height: 0;
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
          mask: var(--src) center / contain no-repeat;
          -webkit-mask: var(--src) center / contain no-repeat;
        }
        .lucide.sm {
          width: 0.875rem;
          height: 0.875rem;
        }
        header {
          position: relative;
          padding: 1.25rem 3rem 0.75rem 1.25rem;
        }
        h2 {
          margin: 0;
          font-size: 1.0625rem;
          font-weight: 600;
        }
        .sub {
          margin: 0.25rem 0 0;
          font-size: 0.8125rem;
          color: var(--muted-foreground);
        }
        .x {
          position: absolute;
          top: 0.875rem;
          right: 0.875rem;
          display: grid;
          place-items: center;
          width: 2rem;
          height: 2rem;
          border: 0;
          border-radius: var(--radius-md, 0.5rem);
          background: none;
          color: var(--muted-foreground);
          cursor: pointer;
        }
        .x:hover {
          background: var(--accent);
          color: var(--foreground);
        }
        .search {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0 1.25rem;
          padding: 0 0.75rem;
          height: 2.25rem;
          border: 1px solid var(--input-border, var(--border));
          border-radius: var(--radius-md, 0.5rem);
          background: var(--background);
          color: var(--muted-foreground);
        }
        .search:focus-within {
          outline: 2px solid var(--ring);
          outline-offset: 1px;
        }
        .search input {
          flex: 1;
          min-width: 0;
          border: 0;
          background: none;
          color: var(--foreground);
          font-size: 0.875rem;
          outline: none;
        }
        .count {
          margin: 0.375rem 1.25rem 0;
          min-height: 1rem;
          font-size: 0.75rem;
          color: var(--muted-foreground);
        }
        .body {
          flex: 1;
          min-height: 6rem;
          overflow: auto;
          padding: 0.25rem 1.25rem 1rem;
        }
        .group + .group {
          margin-top: 0.75rem;
        }
        h3,
        .fold {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          margin: 0 0 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--muted-foreground);
        }
        .fold {
          width: 100%;
          height: 2rem;
          padding: 0 0.25rem;
          border: 0;
          border-radius: var(--radius-md, 0.5rem);
          background: none;
          cursor: pointer;
          text-align: left;
        }
        .fold:hover {
          background: var(--accent);
          color: var(--foreground);
        }
        .n {
          font-weight: 500;
          letter-spacing: 0;
        }
        .n::before {
          content: "· ";
        }
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .row {
          display: flex;
          align-items: flex-start;
          gap: 0.625rem;
          padding: 0.5rem;
          border-radius: var(--radius-md, 0.5rem);
          cursor: pointer;
        }
        .row:not(.linked):hover {
          background: var(--accent);
        }
        .row.linked {
          cursor: default;
        }
        .row input {
          margin-top: 0.1875rem;
        }
        .text {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          min-width: 0;
        }
        .statement {
          font-size: 0.875rem;
          line-height: 1.4;
        }
        .code {
          display: inline-block;
          margin-right: 0.375rem;
          padding: 0 0.375rem;
          border-radius: 999px;
          background: var(--muted);
          font-size: 0.75rem;
          font-weight: 500;
          white-space: nowrap;
        }
        .meta {
          font-size: 0.75rem;
          color: var(--muted-foreground);
        }
        .meta:empty {
          display: none;
        }
        .empty {
          margin: 0.25rem 0.5rem;
          font-size: 0.8125rem;
          color: var(--muted-foreground);
        }
        footer {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-top: 1px solid var(--border);
        }
        .grow {
          flex: 1;
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
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
        }
        .btn.outline {
          border-color: var(--input-border, var(--border));
        }
        .btn.outline:hover,
        .btn.ghost:hover {
          background: var(--accent);
        }
        .btn.primary {
          background: var(--primary);
          color: var(--primary-foreground);
        }
        .btn.primary:hover {
          background: color-mix(in oklab, var(--primary) 88%, var(--foreground));
        }
        .btn[aria-disabled="true"] {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-top: 0.25rem;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 0.8125rem;
          font-weight: 500;
        }
        legend {
          margin-bottom: 0.375rem;
          padding: 0;
        }
        .hint {
          font-weight: 400;
          color: var(--muted-foreground);
        }
        .input {
          box-sizing: border-box;
          width: 100%;
          min-height: 2.25rem;
          padding: 0 0.75rem;
          border: 1px solid var(--input-border, var(--border));
          border-radius: var(--radius-md, 0.5rem);
          background: var(--background);
          font-size: 0.875rem;
          font-weight: 400;
        }
        textarea.input {
          padding: 0.5rem 0.75rem;
          resize: vertical;
        }
        .pair {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .check {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 400;
          font-size: 0.875rem;
        }
        .callout {
          display: flex;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 1px solid color-mix(in oklab, var(--primary) 30%, var(--border));
          border-radius: var(--radius-md, 0.5rem);
          background: color-mix(in oklab, var(--primary) 8%, var(--background));
          color: var(--foreground);
        }
        .callout p {
          margin: 0;
          font-size: 0.8125rem;
          line-height: 1.5;
        }
        .callout .lucide {
          margin-top: 0.125rem;
          color: var(--primary);
        }
        .error {
          margin: 0;
          font-size: 0.8125rem;
          color: var(--destructive);
        }
        @media (max-width: 30rem) {
          .pair {
            grid-template-columns: 1fr;
          }
          .new {
            width: 100%;
            justify-content: center;
          }
        }
      `,
    ];
  }
}

if (!customElements.get(OerOutcomePicker.tag)) customElements.define(OerOutcomePicker.tag, OerOutcomePicker);

export function outcomePicker() {
  const doc = globalThis.document;
  return doc.querySelector(OerOutcomePicker.tag) || doc.body.appendChild(doc.createElement(OerOutcomePicker.tag));
}
