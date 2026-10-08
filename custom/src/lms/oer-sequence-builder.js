/**
 * `oer-sequence-builder` — build a course sequence (oer:sequence page):
 * its modules (weeks or units) and what's in each, picked from the site's
 * pages, and how each item works in an LMS: a page (the live page,
 * embedded), an assignment (due week and day, points, submission types,
 * allowed files, rubric, grade group, peer reviews, group work), a
 * discussion (an open thread; graded ones with points, a due date,
 * requirements and a rubric), a quiz, a link or a file; plus links to any
 * address and text headers, each item with an indent level. With nothing
 * selected, the sequence's grade groups and weights and
 * its rubric point scale. Problems to fix before exporting show at the
 * bottom. Term dates come at export (lms/oer-sequence-export.js).
 *
 *   sequenceBuilder().show(pageId)
 * @element oer-sequence-builder
 */
import { html, css, LitElement } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { contentTypes } from "../types/content-types.js";
import { saveOutline } from "../outline/outline-model.js";
import { isSnapshot } from "../versions/versioning.js";
import { SEQUENCE_TYPE, ROLES, SUBMISSION_TYPES, sequenceOf, sequenceCourses, newItem, readiness, indentOf, attachmentsOf } from "./sequence-model.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

const DAYS = [
  ["", "The term's usual day"],
  ["first-class", "First class of the week"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"],
  ["Sun", "Sunday"],
];
const DELIVERY = ["In person", "Hybrid", "Online (synchronous)", "Online (asynchronous)"];
const LIBRARY_TYPES = ["oer:lesson", "oer:lecture", "oer:tutorial", "oer:article", "oer:exercise", "oer:project", "oer:activity", "oer:quiz", "oer:resource", "oer:book", "oer:course"];

const clone = (o) => JSON.parse(JSON.stringify(o));
const items = () => toJS(store.manifest?.items) || [];
const uid = () => `m${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

class OerSequenceBuilder extends LitElement {
  static get tag() {
    return "oer-sequence-builder";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      _seq: { state: true },
      _fields: { state: true },
      _sel: { state: true },
      _query: { state: true },
      _typeFilter: { state: true },
      _confirmDiscard: { state: true },
      _showChecks: { state: true },
      _saving: { state: true },
    };
  }

  constructor() {
    super();
    this.open = false;
    this._seq = null;
    this._sel = null;
    this._query = "";
    this._typeFilter = "";
    this._rubrics = [];
    this.__keys = (e) => {
      if (this.open && e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        this._requestClose();
      }
    };
  }

  async show(pageId) {
    const page = items().find((i) => i.id === pageId);
    if (!page) return;
    this._pageId = pageId;
    this._seq = clone(sequenceOf(page));
    const f = page.metadata?.oerFields || {};
    this._fields = { weeks: Number(f.weeks) || Math.max(0, ...this._seq.modules.map((m) => m.week || 0)) || 15, delivery: f.delivery || "In person" };
    this._snapshot = JSON.stringify([this._seq, this._fields]);
    this._sel = null;
    this._confirmDiscard = false;
    this._showChecks = false;
    this.open = true;
    globalThis.addEventListener("keydown", this.__keys, true);
    try {
      const res = await fetch(new URL("files/data/rubrics.json", globalThis.document.baseURI), { cache: "no-cache" });
      const data = res.ok ? await res.json() : [];
      this._rubrics = Array.isArray(data) ? data : data.rubrics || [];
    } catch {
      this._rubrics = [];
    }
    this.requestUpdate();
    this.updateComplete.then(() => this.shadowRoot.querySelector("#q")?.focus());
  }

  get _page() {
    return items().find((i) => i.id === this._pageId);
  }

  get _dirty() {
    return JSON.stringify([this._seq, this._fields]) !== this._snapshot;
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
    globalThis.removeEventListener("keydown", this.__keys, true);
  }

  async _save() {
    const page = this._page;
    if (!page) return;
    this._saving = true;
    const out = {
      ...page,
      metadata: {
        ...page.metadata,
        oerSequence: this._seq,
        oerFields: { ...(page.metadata?.oerFields || {}), weeks: Number(this._fields.weeks) || "", delivery: this._fields.delivery },
      },
      modified: true,
    };
    await saveOutline([out]);
    this._saving = false;
    this._close();
  }

  /* ---------- editing ---------- */

  _change(fn) {
    const seq = clone(this._seq);
    fn(seq);
    this._seq = seq;
  }

  _addModule() {
    const week = Math.max(0, ...this._seq.modules.map((m) => Number(m.week) || 0)) + 1;
    this._change((s) => s.modules.push({ id: uid(), title: `Week ${week}`, week, items: [] }));
    this._sel = { m: this._seq.modules.length - 1, i: null };
  }

  _moveModule(m, by) {
    const to = m + by;
    if (to < 0 || to >= this._seq.modules.length) return;
    this._change((s) => s.modules.splice(to, 0, s.modules.splice(m, 1)[0]));
    this._sel = { m: to, i: null };
  }

  _removeModule(m) {
    this._change((s) => s.modules.splice(m, 1));
    this._sel = null;
  }

  _addPage(page) {
    if (!this._seq.modules.length) this._addModule();
    const m = this._sel?.m ?? this._seq.modules.length - 1;
    const mod = this._seq.modules[m];
    this._change((s) => s.modules[m].items.push(newItem(page, Number(mod.week) || 1)));
    this._sel = { m, i: this._seq.modules[m].items.length - 1 };
  }

  _addLink(m) {
    this._change((s) => s.modules[m].items.push({ as: "url", title: "", url: "", newTab: true }));
    this._sel = { m, i: this._seq.modules[m].items.length - 1 };
  }

  _indent(m, i, by) {
    this._change((s) => {
      const it = s.modules[m].items[i];
      it.indent = Math.max(0, Math.min(5, indentOf(it) + by));
    });
  }

  // a new role keeps what still applies and fills in the rest
  _setRole(as) {
    const { m, i } = this._sel;
    const week = Number(this._seq.modules[m].week) || 1;
    this._change((s) => {
      const it = s.modules[m].items[i];
      it.as = as;
      if (as === "assignment" || as === "discussion") {
        it.due ||= { week };
        if (it.points === undefined) it.points = 20;
      }
      if (as === "discussion") {
        if (it.replies === undefined) it.replies = 2;
        it.requirements ||= [];
        it.rubric ??= "task";
      }
      if (as === "file" && !it.file) it.file = attachmentsOf(items().find((x) => x.id === it.page))[0]?.url || "";
    });
  }

  _addHeader(m) {
    this._change((s) => s.modules[m].items.push({ header: "Readings" }));
    this._sel = { m, i: this._seq.modules[m].items.length - 1 };
  }

  _moveItem(m, i, by) {
    const list = this._seq.modules[m].items;
    const to = i + by;
    if (to >= 0 && to < list.length) {
      this._change((s) => s.modules[m].items.splice(to, 0, s.modules[m].items.splice(i, 1)[0]));
      this._sel = { m, i: to };
      return;
    }
    // past either end: into the neighbouring module
    const target = m + by;
    if (target < 0 || target >= this._seq.modules.length) return;
    this._change((s) => {
      const [it] = s.modules[m].items.splice(i, 1);
      if (by < 0) s.modules[target].items.push(it);
      else s.modules[target].items.unshift(it);
    });
    this._sel = { m: target, i: by < 0 ? this._seq.modules[target].items.length - 1 : 0 };
  }

  _removeItem(m, i) {
    this._change((s) => s.modules[m].items.splice(i, 1));
    this._sel = { m, i: null };
  }

  _setItem(patch) {
    const { m, i } = this._sel;
    this._change((s) => Object.assign(s.modules[m].items[i], patch));
  }

  _setModule(m, patch) {
    this._change((s) => Object.assign(s.modules[m], patch));
  }

  /* ---------- library ---------- */

  _library() {
    const all = items().filter((i) => !isSnapshot(i) && !i.metadata?.oerRef?.page && LIBRARY_TYPES.includes(i.metadata?.pageType));
    const page = this._page;
    const courseIds = new Set(sequenceCourses(page, items()).map((c) => c.id));
    const inCourse = (i) => [].concat(i.metadata?.oerFields?.courses || []).some((c) => courseIds.has(typeof c === "string" ? c : c?.page));
    const q = this._query.trim().toLowerCase();
    return all
      .filter((i) => (!this._typeFilter || i.metadata?.pageType === this._typeFilter) && (!q || i.title.toLowerCase().includes(q)))
      .map((i) => ({ item: i, course: inCourse(i) }))
      .sort((a, b) => Number(b.course) - Number(a.course) || a.item.title.localeCompare(b.item.title))
      .slice(0, 200);
  }

  _placement(pageId) {
    for (const m of this._seq.modules) if ((m.items || []).some((it) => it.page === pageId)) return m.title;
    return "";
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
        text-align: start;
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
      button,
      input,
      select {
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
      .lucide.sm {
        width: 0.875rem;
        height: 0.875rem;
      }
      header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.75rem;
        padding: 0.875rem 0.75rem 0.875rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      .heading {
        flex: 1 1 18rem;
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
      .sub {
        margin: 0.125rem 0 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .headfields {
        display: flex;
        align-items: flex-end;
        gap: 0.75rem;
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
      .icon.sm {
        width: 1.75rem;
        height: 1.75rem;
      }
      .icon[disabled] {
        opacity: 0.35;
        cursor: default;
      }
      .x:hover,
      .icon:not([disabled]):hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .body {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: 19rem minmax(0, 1fr) 21rem;
      }
      .col {
        min-height: 0;
        overflow-y: auto;
        padding: 1rem;
      }
      .col + .col {
        border-left: 1px solid var(--border);
      }
      h3 {
        margin: 0 0 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
      }
      label.field {
        display: flex;
        flex-direction: column;
        gap: 0.3125rem;
        font-size: 0.8125rem;
        font-weight: 500;
      }
      .input,
      select {
        box-sizing: border-box;
        width: 100%;
        height: 2.125rem;
        padding: 0 0.625rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        font-size: 0.875rem;
      }
      .input.num {
        width: 5rem;
      }
      .hint {
        margin: 0;
        font-size: 0.75rem;
        font-weight: 400;
        color: var(--muted-foreground);
      }
      /* library */
      .search {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }
      .lib {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
      }
      .lib li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.375rem 0.25rem;
        border-bottom: 1px solid var(--border);
      }
      .lib .t {
        flex: 1;
        min-width: 0;
        font-size: 0.8125rem;
      }
      .lib .t small {
        display: block;
        color: var(--muted-foreground);
        font-size: 0.6875rem;
      }
      .lib .course {
        color: var(--primary);
      }
      /* modules */
      .module {
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        margin-bottom: 0.75rem;
        background: var(--card, var(--background));
      }
      .module[aria-current="true"] {
        border-color: var(--ring);
      }
      .mhead {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.375rem;
        padding: 0.5rem 0.5rem 0.5rem 0.75rem;
        border-bottom: 1px solid var(--border);
      }
      .mhead .title {
        flex: 1 1 14rem;
        min-width: 0;
        height: 2rem;
        font-weight: 600;
      }
      .mhead .week {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .mhead .week .input {
        width: 3.75rem;
        height: 2rem;
      }
      .rows {
        list-style: none;
        margin: 0;
        padding: 0.25rem;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.125rem 0.25rem 0.125rem 0.5rem;
        border-radius: var(--radius-md);
      }
      .row[aria-selected="true"] {
        background: var(--accent);
      }
      .row .pick {
        all: unset;
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: baseline;
        gap: 0.5rem;
        padding: 0.375rem 0;
        cursor: pointer;
        font-size: 0.8125rem;
      }
      .row .pick .name {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .row .pick small {
        flex: none;
        color: var(--muted-foreground);
        font-size: 0.75rem;
      }
      .row.header .pick {
        font-weight: 600;
        color: var(--muted-foreground);
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .row .tools {
        display: none;
        gap: 0.125rem;
      }
      .row:hover .tools,
      .row:focus-within .tools,
      .row[aria-selected="true"] .tools {
        display: flex;
      }
      .madd {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        padding: 0.25rem 0.5rem 0.5rem;
      }
      .btn {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2.125rem;
        padding: 0 0.75rem;
        border-radius: var(--radius-md);
        font-size: 0.8125rem;
        font-weight: 500;
        cursor: pointer;
        white-space: nowrap;
      }
      .btn.small {
        height: 1.875rem;
        padding: 0 0.5rem;
        font-size: 0.75rem;
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .btn.primary[aria-disabled="true"] {
        opacity: 0.55;
        cursor: default;
      }
      .btn.outline {
        border: 1px solid var(--input-border, var(--border));
      }
      .btn.ghost {
        color: var(--muted-foreground);
      }
      .btn.outline:hover,
      .btn.ghost:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .btn.destructive {
        background: var(--destructive);
        color: var(--destructive-foreground, #fff);
      }
      .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        padding: 3rem 1rem;
        color: var(--muted-foreground);
        text-align: center;
      }
      /* settings */
      .settings {
        display: flex;
        flex-direction: column;
        gap: 0.875rem;
      }
      .settings .pagelink {
        font-size: 0.8125rem;
        color: var(--link, var(--primary));
      }
      .pair {
        display: flex;
        gap: 0.5rem;
      }
      .pair > * {
        flex: 1;
      }
      .checks {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .check {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.8125rem;
        font-weight: 400;
      }
      .check input {
        accent-color: var(--primary);
      }
      .groups {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      .group {
        display: flex;
        align-items: center;
        gap: 0.375rem;
      }
      .group .input:first-child {
        flex: 1;
      }
      .group .num {
        width: 4.25rem;
      }
      .total {
        font-size: 0.75rem;
        color: var(--muted-foreground);
        font-variant-numeric: tabular-nums;
      }
      .total.off {
        color: var(--destructive);
      }
      /* footer */
      footer {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-top: 1px solid var(--border);
      }
      footer .status {
        flex: 1;
        min-width: 0;
        font-size: 0.8125rem;
      }
      .warn {
        color: var(--foreground);
      }
      .checklist {
        max-height: 9rem;
        overflow-y: auto;
        margin: 0;
        padding: 0.5rem 1.25rem 0.75rem 2.5rem;
        border-top: 1px solid var(--border);
        font-size: 0.8125rem;
        background: var(--muted);
      }
      .checklist li + li {
        margin-top: 0.25rem;
      }
      .linkbtn {
        all: unset;
        color: var(--link, var(--primary));
        text-decoration: underline;
        cursor: pointer;
      }
      @media (max-width: 1000px) {
        .body {
          grid-template-columns: minmax(0, 1fr);
          grid-auto-rows: minmax(14rem, auto);
          overflow-y: auto;
        }
        .col {
          overflow: visible;
        }
        .col + .col {
          border-left: 0;
          border-top: 1px solid var(--border);
        }
      }
    `;
  }

  _renderLibrary() {
    const types = contentTypes(items()).types;
    const label = (id) => types.find((t) => t.id === id)?.label || id;
    const list = this._library();
    const target = this._seq.modules[this._sel?.m ?? this._seq.modules.length - 1];
    return html`<section class="col" aria-labelledby="lib-h">
      <h3 id="lib-h">Add pages</h3>
      <div class="search">
        <input id="q" class="input" type="search" placeholder="Search pages" aria-label="Search pages" .value="${this._query}" @input="${(e) => (this._query = e.target.value)}" />
        <select aria-label="Type" .value="${this._typeFilter}" @change="${(e) => (this._typeFilter = e.target.value)}">
          <option value="">All types</option>
          ${LIBRARY_TYPES.map((t) => html`<option value="${t}" ?selected="${this._typeFilter === t}">${label(t)}</option>`)}
        </select>
        <p class="hint">${target ? html`Adds to <b>${target.title}</b>. Select a module to add there.` : "Adds a first module."} This course's pages come first.</p>
      </div>
      <ul class="lib" role="list">
        ${list.map(({ item, course }) => {
          const placed = this._placement(item.id);
          return html`<li>
            <span class="t">${item.title}<small>${label(item.metadata?.pageType)}${course ? html` · <span class="course">this course</span>` : ""}${placed ? ` · in ${placed}` : ""}</small></span>
            <button class="icon sm" aria-label="Add ${item.title}" title="Add" @click="${() => this._addPage(item)}">${lucide("oer:plus", "sm")}</button>
          </li>`;
        })}
      </ul>
    </section>`;
  }

  _summary(it) {
    const graded = it.graded !== false;
    if (it.as === "assignment") return [graded ? `${it.points || 0} pts` : "Ungraded", it.due?.week ? `week ${it.due.week}` : "no due week", it.peerReviews ? "peer review" : "", it.groupSet ? "group" : ""].filter(Boolean).join(" · ");
    if (it.as === "discussion") return ["Discussion", graded ? `${it.points || 0} pts` : "", it.due?.week ? `week ${it.due.week}` : ""].filter(Boolean).join(" · ");
    if (it.as === "quiz") return it.quizType === "graded" ? "Graded quiz" : "Practice quiz";
    if (it.as === "url") return "Link";
    return ROLES[it.as]?.label || "Page";
  }

  _renderModules() {
    const byId = new Map(items().map((i) => [i.id, i]));
    const mods = this._seq.modules;
    return html`<section class="col" aria-labelledby="mods-h">
      <h3 id="mods-h">Modules</h3>
      ${mods.length
        ? mods.map(
            (m, mi) => html`<div class="module" aria-current="${this._sel?.m === mi ? "true" : "false"}">
              <div class="mhead" @click="${(e) => e.target === e.currentTarget && (this._sel = { m: mi, i: null })}">
                <input class="input title" aria-label="Module title" .value="${m.title}" @focus="${() => (this._sel = { m: mi, i: null })}" @input="${(e) => this._setModule(mi, { title: e.target.value })}" />
                <label class="week">Week<input class="input" type="number" min="1" aria-label="Week of ${m.title}" .value="${String(m.week || "")}" @input="${(e) => this._setModule(mi, { week: Number(e.target.value) || "" })}" /></label>
                <button class="icon sm" aria-label="Move ${m.title} up" title="Move up" @click="${() => this._moveModule(mi, -1)}">${lucide("oer:arrow-up", "sm")}</button>
                <button class="icon sm" aria-label="Move ${m.title} down" title="Move down" @click="${() => this._moveModule(mi, 1)}">${lucide("oer:arrow-down", "sm")}</button>
                <button class="icon sm" aria-label="Remove ${m.title}" title="Remove module" @click="${() => this._removeModule(mi)}">${lucide("icons:delete", "sm")}</button>
              </div>
              <ul class="rows" role="listbox" aria-label="${m.title}">
                ${(m.items || []).map((it, ii) => {
                  const selected = this._sel?.m === mi && this._sel?.i === ii;
                  const page = byId.get(it.page);
                  const name = it.header || (it.as === "url" ? it.title || it.url || "New link" : page?.title) || "(missing page)";
                  const level = indentOf(it);
                  return html`<li class="row ${it.header ? "header" : ""}" role="option" aria-selected="${selected ? "true" : "false"}" style="padding-left: ${0.5 + level * 1.25}rem">
                    <button class="pick" @click="${() => (this._sel = { m: mi, i: ii })}"><span class="name">${name}</span>${it.header ? "" : html`<small>${this._summary(it)}</small>`}</button>
                    <span class="tools">
                      <button class="icon sm" aria-label="Outdent ${name}" title="Outdent" ?disabled="${level === 0}" @click="${() => this._indent(mi, ii, -1)}">${lucide("oer:indent-decrease", "sm")}</button>
                      <button class="icon sm" aria-label="Indent ${name}" title="Indent" ?disabled="${level >= 5}" @click="${() => this._indent(mi, ii, 1)}">${lucide("oer:indent-increase", "sm")}</button>
                      <button class="icon sm" aria-label="Move ${name} up" title="Move up" @click="${() => this._moveItem(mi, ii, -1)}">${lucide("oer:arrow-up", "sm")}</button>
                      <button class="icon sm" aria-label="Move ${name} down" title="Move down" @click="${() => this._moveItem(mi, ii, 1)}">${lucide("oer:arrow-down", "sm")}</button>
                      <button class="icon sm" aria-label="Remove ${name}" title="Remove" @click="${() => this._removeItem(mi, ii)}">${lucide("oer:x", "sm")}</button>
                    </span>
                  </li>`;
                })}
              </ul>
              <div class="madd">
                <button class="btn ghost small" @click="${() => (this._sel = { m: mi, i: null })}">${lucide("oer:plus", "sm")}Add pages here</button>
                <button class="btn ghost small" @click="${() => this._addHeader(mi)}">${lucide("editor:title", "sm")}Add a header</button>
                <button class="btn ghost small" @click="${() => this._addLink(mi)}">${lucide("oer:link", "sm")}Add a link</button>
              </div>
            </div>`,
          )
        : html`<div class="empty"><p>No modules yet. Add one per week or unit, then add pages to it.</p></div>`}
      <button class="btn outline" @click="${this._addModule}">${lucide("oer:plus", "sm")}Add a module</button>
    </section>`;
  }

  _renderItemSettings(it) {
    const page = items().find((i) => i.id === it.page);
    if (it.header) {
      return html`<div class="settings">
        <h3>Header</h3>
        <label class="field">Text<input class="input" .value="${it.header}" @input="${(e) => this._setItem({ header: e.target.value })}" /></label>
        <p class="hint">A text header in the Canvas module, grouping the items under it. Indent items beneath it to show they belong to it.</p>
      </div>`;
    }
    if (it.as === "url") {
      return html`<div class="settings">
        <h3>Link</h3>
        <label class="field">Title<input class="input" placeholder="Live session (Zoom)" .value="${it.title || ""}" @input="${(e) => this._setItem({ title: e.target.value })}" /></label>
        <label class="field">Web address<input class="input" type="url" placeholder="https://…" .value="${it.url || ""}" @input="${(e) => this._setItem({ url: e.target.value.trim() })}" /></label>
        <label class="check"><input type="checkbox" .checked="${it.newTab !== false}" @change="${(e) => this._setItem({ newTab: e.target.checked })}" />Open in a new tab</label>
        <p class="hint">For anything that isn't a page on this site: a video call, a tool, another site.</p>
      </div>`;
    }
    const due = it.due || {};
    const dayValue = due.day || (due.rule === "first-class" ? "first-class" : "");
    const setDue = (patch) => this._setItem({ due: { ...due, ...patch } });
    return html`<div class="settings">
      <h3>${page?.title || "Missing page"}</h3>
      ${page ? html`<a class="pagelink" href="${page.slug}" target="_blank">Open the page</a>` : ""}
      <label class="field">Becomes
        <select @change="${(e) => this._setRole(e.target.value)}">
          ${Object.entries(ROLES).map(([v, r]) => html`<option value="${v}" ?selected="${it.as === v}">${r.label}</option>`)}
        </select>
        <span class="hint">${ROLES[it.as]?.note ? `${ROLES[it.as].note[0].toUpperCase()}${ROLES[it.as].note.slice(1)}.` : ""}</span>
      </label>
      ${it.as === "assignment"
        ? html`<label class="check"><input type="checkbox" .checked="${it.graded !== false}" @change="${(e) => this._setItem({ graded: e.target.checked })}" />Graded</label>
            ${it.graded !== false
              ? html`<div class="pair">
                    <label class="field">Points<input class="input" type="number" min="0" .value="${String(it.points ?? "")}" @input="${(e) => this._setItem({ points: Number(e.target.value) || 0 })}" /></label>
                    <label class="field">Grade group
                      <select @change="${(e) => this._setItem({ group: e.target.value })}">
                        <option value="" ?selected="${!it.group}">None</option>
                        ${this._seq.groups.map((g) => html`<option value="${g.id}" ?selected="${it.group === g.id}">${g.name}</option>`)}
                      </select>
                    </label>
                  </div>
                  <label class="field">Rubric
                    <select @change="${(e) => this._setItem({ rubric: e.target.value })}">
                      <option value="" ?selected="${!it.rubric}">None</option>
                      ${this._rubrics.map((r) => html`<option value="${r.slug}" ?selected="${it.rubric === r.slug}">${r.name} (${r.criteria?.length || 0} criteria)</option>`)}
                    </select>
                  </label>`
              : ""}
            <div class="pair">
              <label class="field">Due week<input class="input" type="number" min="1" .value="${String(due.week ?? "")}" @input="${(e) => setDue({ week: Number(e.target.value) || "" })}" /></label>
              <label class="field">Time <span class="hint">optional</span><input class="input" type="time" .value="${due.time || ""}" @input="${(e) => setDue({ time: e.target.value || undefined })}" /></label>
            </div>
            <label class="field">Due on
              <select @change="${(e) => (e.target.value === "first-class" ? setDue({ day: undefined, rule: "first-class" }) : setDue({ day: e.target.value || undefined, rule: undefined }))}">
                ${DAYS.map(([v, l]) => html`<option value="${v}" ?selected="${dayValue === v}">${l}</option>`)}
              </select>
              <span class="hint">The term's usual day and time are chosen at export, Sunday 11:59 pm unless changed.</span>
            </label>
            <fieldset class="checks" style="border:0;margin:0;padding:0">
              <legend class="field" style="font-size:0.8125rem;font-weight:500;margin-bottom:0.25rem">Students submit</legend>
              ${Object.entries(SUBMISSION_TYPES).map(
                ([v, l]) => html`<label class="check"><input type="checkbox" .checked="${(it.submission || []).includes(v)}" @change="${(e) => this._setItem({ submission: e.target.checked ? [...new Set([...(it.submission || []), v])] : (it.submission || []).filter((x) => x !== v) })}" />${l}</label>`,
              )}
            </fieldset>
            ${(it.submission || []).includes("online_upload")
              ? html`<label class="field">Allowed file types <span class="hint">optional, comma-separated</span><input class="input" placeholder="pdf, jpg, stl" .value="${(it.extensions || []).join(", ")}" @input="${(e) => this._setItem({ extensions: e.target.value.split(/[\s,]+/).map((x) => x.replace(/^\./, "").toLowerCase()).filter(Boolean) })}" /></label>`
              : ""}
            ${it.graded !== false
              ? html`<label class="check"><input type="checkbox" .checked="${!!it.peerReviews}" @change="${(e) => this._setItem({ peerReviews: e.target.checked ? { count: 2, anonymous: false } : undefined })}" />Peer reviews</label>
                  ${it.peerReviews
                    ? html`<div class="pair">
                        <label class="field">Reviews each<input class="input" type="number" min="1" .value="${String(it.peerReviews.count ?? 2)}" @input="${(e) => this._setItem({ peerReviews: { ...it.peerReviews, count: Math.max(1, Number(e.target.value) || 1) } })}" /></label>
                        <label class="check" style="align-self:end;padding-bottom:0.5rem"><input type="checkbox" .checked="${!!it.peerReviews.anonymous}" @change="${(e) => this._setItem({ peerReviews: { ...it.peerReviews, anonymous: e.target.checked } })}" />Anonymous</label>
                      </div>
                      <p class="hint">Canvas assigns reviewers automatically when the assignment is due.</p>`
                    : ""}`
              : ""}
            <label class="check"><input type="checkbox" .checked="${!!it.groupSet}" @change="${(e) => this._setItem({ groupSet: e.target.checked ? "Project groups" : undefined, gradeIndividually: undefined })}" />Group assignment</label>
            ${it.groupSet
              ? html`<label class="field">Group set<input class="input" .value="${it.groupSet}" @input="${(e) => this._setItem({ groupSet: e.target.value })}" /><span class="hint">Canvas makes this group set if the course doesn't have it; put students in groups there.</span></label>
                  <label class="check"><input type="checkbox" .checked="${!!it.gradeIndividually}" @change="${(e) => this._setItem({ gradeIndividually: e.target.checked })}" />Grade each student individually</label>`
              : ""}`
        : ""}
      ${it.as === "discussion" ? this._renderDiscussionSettings(it, due, dayValue, setDue) : ""}
      ${it.as === "file" ? this._renderFileSettings(it, page) : ""}
      ${it.as === "quiz"
        ? html`<label class="field">Quiz
              <select @change="${(e) => this._setItem({ quizType: e.target.value })}">
                <option value="practice" ?selected="${it.quizType !== "graded"}">Practice (not graded)</option>
                <option value="graded" ?selected="${it.quizType === "graded"}">Graded</option>
              </select>
            </label>
            ${it.quizType === "graded"
              ? html`<div class="pair">
                  <label class="field">Due week<input class="input" type="number" min="1" .value="${String(due.week ?? "")}" @input="${(e) => setDue({ week: Number(e.target.value) || "" })}" /></label>
                  <label class="field">Grade group
                    <select @change="${(e) => this._setItem({ group: e.target.value })}">
                      <option value="" ?selected="${!it.group}">None</option>
                      ${this._seq.groups.map((g) => html`<option value="${g.id}" ?selected="${it.group === g.id}">${g.name}</option>`)}
                    </select>
                  </label>
                </div>`
              : ""}
            <p class="hint">Built from the page's multiple-choice and true/false questions (a point each); self-checks become ungraded questions with their answer as feedback. Draft questions stay out until published.</p>`
        : ""}
      ${it.as === "page" ? html`<p class="hint">Shows the live page in Canvas, so edits on the site appear there.</p>` : ""}
      ${it.as === "link" ? html`<p class="hint">Opens the page, or for a resource its source, in a new tab.</p>` : ""}
    </div>`;
  }

  _renderDiscussionSettings(it, due, dayValue, setDue) {
    const graded = it.graded !== false;
    return html`<label class="check"><input type="checkbox" .checked="${graded}" @change="${(e) => this._setItem({ graded: e.target.checked })}" />Graded</label>
      ${graded
        ? html`<div class="pair">
              <label class="field">Points<input class="input" type="number" min="0" .value="${String(it.points ?? "")}" @input="${(e) => this._setItem({ points: Number(e.target.value) || 0 })}" /></label>
              <label class="field">Grade group
                <select @change="${(e) => this._setItem({ group: e.target.value })}">
                  <option value="" ?selected="${!it.group}">None</option>
                  ${this._seq.groups.map((g) => html`<option value="${g.id}" ?selected="${it.group === g.id}">${g.name}</option>`)}
                </select>
              </label>
            </div>
            <label class="field">Rubric
              <select @change="${(e) => this._setItem({ rubric: e.target.value })}">
                <option value="" ?selected="${!it.rubric}">None</option>
                ${this._rubrics.map((r) => html`<option value="${r.slug}" ?selected="${it.rubric === r.slug}">${r.name} (${r.criteria?.length || 0} criteria)</option>`)}
              </select>
            </label>`
        : ""}
      <div class="pair">
        <label class="field">${graded ? "Posts due week" : "Week"}<input class="input" type="number" min="1" .value="${String(due.week ?? "")}" @input="${(e) => setDue({ week: Number(e.target.value) || "" })}" /></label>
        <label class="field">Time <span class="hint">optional</span><input class="input" type="time" .value="${due.time || ""}" @input="${(e) => setDue({ time: e.target.value || undefined })}" /></label>
      </div>
      <label class="field">Due on
        <select @change="${(e) => (e.target.value === "first-class" ? setDue({ day: undefined, rule: "first-class" }) : setDue({ day: e.target.value || undefined, rule: undefined }))}">
          ${DAYS.map(([v, l]) => html`<option value="${v}" ?selected="${dayValue === v}">${l}</option>`)}
        </select>
      </label>
      <label class="field">Replies required<input class="input num" type="number" min="0" .value="${String(it.replies ?? 0)}" @input="${(e) => this._setItem({ replies: Math.max(0, Number(e.target.value) || 0) })}" /></label>
      <label class="field">More requirements <span class="hint">one per line</span>
        <textarea class="input" rows="3" style="height:auto;padding:0.5rem 0.625rem" placeholder="Name what's working and one change you'd try" .value="${(it.requirements || []).join("\n")}" @input="${(e) => this._setItem({ requirements: e.target.value.split("\n").map((l) => l.trim()).filter(Boolean) })}"></textarea>
      </label>
      <label class="check"><input type="checkbox" .checked="${!!it.requireInitialPost}" @change="${(e) => this._setItem({ requireInitialPost: e.target.checked })}" />Students post before they see others' replies</label>
      <label class="check"><input type="checkbox" .checked="${!!it.groupSet}" @change="${(e) => this._setItem({ groupSet: e.target.checked ? "Critique groups" : undefined })}" />Group discussion</label>
      ${it.groupSet ? html`<label class="field">Group set<input class="input" .value="${it.groupSet}" @input="${(e) => this._setItem({ groupSet: e.target.value })}" /></label>` : ""}
      <p class="hint">The prompt shows the requirements (posting by the due date, the replies, these lines, the rubric), then the page's instructions, embedded.</p>`;
  }

  _renderFileSettings(it, page) {
    const files = attachmentsOf(page);
    if (!files.length) return html`<p class="hint">This page has no attachments. Add files to its Attachments field in Page details, then choose one here.</p>`;
    return html`<label class="field">File
        <select @change="${(e) => this._setItem({ file: e.target.value })}">
          ${files.map((f) => html`<option value="${f.url}" ?selected="${it.file === f.url}">${f.title || f.url.split("/").pop()}</option>`)}
        </select>
      </label>
      <p class="hint">Copied into the Canvas course's files. A file on another site that can't be copied becomes a link to it.</p>`;
  }

  _renderSequenceSettings() {
    const total = this._seq.groups.reduce((s, g) => s + (Number(g.weight) || 0), 0);
    return html`<div class="settings">
      <h3>Grade groups</h3>
      <div class="groups">
        ${this._seq.groups.map(
          (g, gi) => html`<div class="group">
            <input class="input" aria-label="Group name" .value="${g.name}" @input="${(e) => this._change((s) => (s.groups[gi].name = e.target.value))}" />
            <input class="input num" type="number" min="0" max="100" aria-label="${g.name} weight (%)" .value="${String(g.weight ?? "")}" @input="${(e) => this._change((s) => (s.groups[gi].weight = Number(e.target.value) || 0))}" />
            <span class="hint">%</span>
            <button class="icon sm" aria-label="Remove ${g.name}" title="Remove" @click="${() => this._change((s) => s.groups.splice(gi, 1))}">${lucide("oer:x", "sm")}</button>
          </div>`,
        )}
      </div>
      <p class="total ${this._seq.groups.length && Math.round(total) !== 100 ? "off" : ""}">Total ${Math.round(total * 10) / 10}%</p>
      <button class="btn outline small" style="align-self:flex-start" @click="${() => this._change((s) => s.groups.push({ id: uid(), name: "New group", weight: 0 }))}">${lucide("oer:plus", "sm")}Add a group</button>
      <p class="hint">Canvas weights groups, not single assignments. Within a group, points set each assignment's share.</p>
      <h3>Rubric point scale</h3>
      <div class="groups">
        ${this._seq.rubricScale.map(
          (l, li) => html`<div class="group">
            <input class="input" aria-label="Level name" .value="${l.name}" @input="${(e) => this._change((s) => (s.rubricScale[li].name = e.target.value))}" />
            <input class="input num" type="number" min="0" max="100" aria-label="${l.name} (% of the criterion's points)" .value="${String(Math.round((l.share ?? 0) * 100))}" @input="${(e) => this._change((s) => (s.rubricScale[li].share = (Number(e.target.value) || 0) / 100))}" />
            <span class="hint">%</span>
            <button class="icon sm" aria-label="Remove ${l.name}" title="Remove" @click="${() => this._change((s) => s.rubricScale.splice(li, 1))}">${lucide("oer:x", "sm")}</button>
          </div>`,
        )}
      </div>
      <button class="btn outline small" style="align-self:flex-start" @click="${() => this._change((s) => s.rubricScale.push({ name: "New level", share: 0.5 }))}">${lucide("oer:plus", "sm")}Add a level</button>
      <p class="hint">Every rubric criterion gets these ratings, as a share of its points (an assignment's points are split evenly across its rubric's criteria).</p>
    </div>`;
  }

  render() {
    if (!this.open || !this._seq) return html``;
    const page = this._page;
    const dirty = this._dirty;
    const sel = this._sel;
    const item = sel && sel.i !== null && sel.i !== undefined ? this._seq.modules[sel.m]?.items?.[sel.i] : null;
    const draft = page ? { ...page, metadata: { ...page.metadata, oerSequence: this._seq, oerFields: { ...(page.metadata?.oerFields || {}), weeks: this._fields.weeks } } } : null;
    const checks = draft ? readiness(draft, items()) : [];
    return html`
      <div class="backdrop" @click="${this._requestClose}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${lucide("icons:date-range")}${page?.title || "Course sequence"}</h2>
            <p class="sub">Modules, what's in them, and how each works in an LMS. Term dates are chosen at export.</p>
          </div>
          <div class="headfields">
            <label class="field">Length (weeks)<input class="input num" type="number" min="1" .value="${String(this._fields.weeks)}" @input="${(e) => (this._fields = { ...this._fields, weeks: Number(e.target.value) || "" })}" /></label>
            <label class="field">Delivery
              <select @change="${(e) => (this._fields = { ...this._fields, delivery: e.target.value })}">
                ${DELIVERY.map((d) => html`<option value="${d}" ?selected="${this._fields.delivery === d}">${d}</option>`)}
              </select>
            </label>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._requestClose}">${lucide("oer:x")}</button>
        </header>
        <div class="body">
          ${this._renderLibrary()}
          ${this._renderModules()}
          <section class="col" aria-label="Settings">
            ${item ? this._renderItemSettings(item) : this._renderSequenceSettings()}
            ${item ? html`<p style="margin-top:1rem"><button class="linkbtn" @click="${() => (this._sel = null)}">Grade groups and rubric scale</button></p>` : ""}
          </section>
        </div>
        ${this._showChecks && checks.length ? html`<ul class="checklist">${checks.map((c) => html`<li>${c.text}</li>`)}</ul>` : ""}
        <footer>
          ${this._confirmDiscard
            ? html`<span class="status warn">Discard your changes to this sequence?</span>
                <button class="btn outline" @click="${() => (this._confirmDiscard = false)}">Keep editing</button>
                <button class="btn destructive" @click="${this._close}">Discard</button>`
            : html`<span class="status">
                  ${checks.length
                    ? html`<button class="linkbtn" aria-expanded="${this._showChecks ? "true" : "false"}" @click="${() => (this._showChecks = !this._showChecks)}">${checks.length} thing${checks.length === 1 ? "" : "s"} to check before exporting</button>`
                    : html`${lucide("oer:check", "sm")} Ready to export`}
                </span>
                <button class="btn outline" @click="${this._requestClose}">Cancel</button>
                <button class="btn primary" aria-disabled="${dirty && !this._saving ? "false" : "true"}" @click="${() => dirty && !this._saving && this._save()}">${this._saving ? "Saving…" : "Save sequence"}</button>`}
        </footer>
      </div>
    `;
  }
}
customElements.define(OerSequenceBuilder.tag, OerSequenceBuilder);

/** The page-wide sequence builder, created on first use. */
export function sequenceBuilder() {
  const doc = globalThis.document;
  return doc.querySelector(OerSequenceBuilder.tag) || doc.body.appendChild(doc.createElement(OerSequenceBuilder.tag));
}

export { SEQUENCE_TYPE };
