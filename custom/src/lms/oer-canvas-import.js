/**
 * `oer-canvas-import` — import a Canvas course export (.imscc) into the
 * site. Three steps:
 * 1. Choose the file. It's read in the browser (lms/canvas-reader.js) and
 *    analysed against the site (lms/canvas-import-plan.js).
 * 2. Review. The modules and their items on the left, each with what it
 *    becomes: Link (the site has it), Create (a new draft page of a type),
 *    In sequence (a page the sequence keeps: welcome, syllabus), Overview
 *    (the module's to-do page), Skip, or a link or header in the sequence. The selected item on the
 *    right: its action, type or matching page, the reasons, its place in the
 *    sequence, and a preview. Rubrics (merged and reused where they can be),
 *    files (none come over unless ticked: course files can include student
 *    work, and uploaded files are public once the site is published) and the
 *    sequence's settings have their own rows. "Refine with Claude" asks the
 *    local AI helper (nu-hax/scripts/ai-bridge.mjs, with the API key in
 *    .env.local) to check the types, matches and skips; without it the
 *    wizard works on its rules alone.
 * 3. Import (lms/canvas-import-apply.js): draft pages, rubrics, files, and a
 *    draft course sequence linked to the course.
 *
 *   canvasImport().show()
 * @element oer-canvas-import
 */
import { html, css, LitElement } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { contentTypes } from "../types/content-types.js";
import { pagePicker } from "../books/oer-page-picker.js";
import { readCanvasPackage } from "./canvas-reader.js";
import { planImport, planCounts } from "./canvas-import-plan.js";
import { applyImport } from "./canvas-import-apply.js";
import { saveOutline } from "../outline/outline-model.js";
import { uploadFile } from "../types/relations.js";
import { rubricPages, rubricOf } from "../rubrics/rubric-model.js";
import { moduleWeekLabel } from "./sequence-model.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

export const AI_BRIDGE = "http://127.0.0.1:3110";
const TYPES = ["oer:lesson", "oer:lecture", "oer:tutorial", "oer:article", "oer:resource", "oer:exercise", "oer:activity", "oer:project", "oer:quiz"];
const ACTION_LABEL = { create: "Create", link: "Link", skip: "Skip", url: "Link only", header: "Header", overview: "Overview", text: "In sequence" };
const ROLE_LABEL = { page: "Page", assignment: "Assignment", discussion: "Discussion", quiz: "Quiz", file: "File", url: "Link" };

class OerCanvasImport extends LitElement {
  static get tag() {
    return "oer-canvas-import";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      _step: { state: true }, // pick | reading | review | applying | done
      _plan: { state: true },
      _sel: { state: true }, // an entry id, a module id, or "rubrics" | "files" | "settings"
      _error: { state: true },
      _log: { state: true },
      _result: { state: true },
      _ai: { state: true }, // { up, model, busy, note }
      _confirmClose: { state: true },
    };
  }

  constructor() {
    super();
    this.open = false;
    this._step = "pick";
    this._ai = { up: false };
    this.__keys = (e) => {
      if (!this.open || e.key !== "Escape" || globalThis.document.querySelector("oer-page-picker[open]")) return;
      e.preventDefault();
      e.stopPropagation();
      this._requestClose();
    };
  }

  /* ---------- open / close ---------- */

  show() {
    this._step = "pick";
    this._plan = null;
    this._course = null;
    this._sel = null;
    this._error = "";
    this._log = [];
    this._result = null;
    this._confirmClose = false;
    this.open = true;
    globalThis.addEventListener("keydown", this.__keys, true);
    this._checkAi();
    this.updateComplete.then(() => this.shadowRoot.querySelector(".drop button, .x")?.focus());
  }

  _requestClose() {
    if (this._step === "applying") return;
    if (this._step === "review" && !this._confirmClose) {
      this._confirmClose = true;
      return;
    }
    this.open = false;
    this._course = null;
    globalThis.removeEventListener("keydown", this.__keys, true);
  }

  /* ---------- 1. the file ---------- */

  async _read(file) {
    if (!file) return;
    this._error = "";
    this._step = "reading";
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      this._course = await readCanvasPackage(bytes);
      this._plan = planImport(this._course, toJS(store.manifest?.items) || []);
      this._sel = "settings";
      this._step = "review";
    } catch (err) {
      this._error = err.message || String(err);
      this._step = "pick";
    }
  }

  /* ---------- 2. review ---------- */

  get _entries() {
    return this._plan ? [...this._plan.modules.flatMap((m) => m.items), ...this._plan.unplaced] : [];
  }

  _entry(id) {
    return this._entries.find((e) => e.id === id) || null;
  }

  _module(id) {
    return this._plan?.modules.find((m) => m.id === id) || null;
  }

  // change an entry (the plan is replaced so the view updates)
  _set(id, patch) {
    const fix = (e) => (e.id === id ? { ...e, ...patch } : e);
    this._plan = { ...this._plan, modules: this._plan.modules.map((m) => ({ ...m, items: m.items.map(fix) })), unplaced: this._plan.unplaced.map(fix) };
  }

  // a module has one overview: choosing one makes any other a sequence page
  _setOverview(e) {
    const m = this._plan.modules.find((x) => x.items.some((i) => i.id === e.id));
    for (const other of m?.items || []) if (other.id !== e.id && other.action === "overview") this._set(other.id, { action: "text" });
    this._set(e.id, { action: "overview" });
  }

  _setModule(id, patch) {
    this._plan = { ...this._plan, modules: this._plan.modules.map((m) => (m.id === id ? { ...m, ...patch } : m)) };
  }

  _setPlan(patch) {
    this._plan = { ...this._plan, ...patch };
  }

  async _pickPage(e) {
    const choice = await pagePicker().pick({ title: `The site's page for “${e.title}”`, children: false });
    if (choice) this._set(e.id, { action: "link", match: { id: choice.page.id, title: choice.page.title, slug: choice.page.slug, type: choice.page.metadata?.pageType || "", score: 1, why: "you chose it" } });
  }

  /* ---------- Claude (the local helper) ---------- */

  async _checkAi() {
    try {
      const res = await fetch(`${AI_BRIDGE}/status`, { signal: AbortSignal.timeout(1200) });
      const data = await res.json();
      this._ai = { up: !!data.ok, model: data.model || "" };
    } catch {
      this._ai = { up: false };
    }
  }

  async _refine() {
    if (!this._ai.up || this._ai.busy) return;
    this._ai = { ...this._ai, busy: true, note: "" };
    const types = contentTypes(toJS(store.manifest?.items) || []).types.filter((t) => TYPES.includes(t.id)).map((t) => ({ id: t.id, label: t.label, description: t.description || "" }));
    const items = this._entries
      .filter((e) => !["header"].includes(e.action))
      .map((e) => ({
        id: e.id,
        kind: e.kind,
        title: e.title,
        module: this._plan.modules.find((m) => m.items.some((x) => x.id === e.id))?.title || "(not in a module)",
        text: (e.html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 1200),
        current: { action: e.action, type: e.type, match: e.match ? { id: e.match.id, title: e.match.title } : null, reason: e.reasons[0] || "" },
        candidates: e.candidates.map((c) => ({ id: c.id, title: c.title, type: c.type, score: c.score })),
      }));
    try {
      let changed = 0;
      for (let i = 0; i < items.length; i += 20) {
        this._ai = { ...this._ai, note: `Checking ${Math.min(i + 20, items.length)} of ${items.length}…` };
        const res = await fetch(`${AI_BRIDGE}/canvas/refine`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ course: { title: this._plan.course.title, code: this._plan.course.code }, types, items: items.slice(i, i + 20) }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || `The helper answered ${res.status}`);
        for (const s of data.items || []) {
          const e = this._entry(s.id);
          if (!e) continue;
          const patch = { ai: { reason: s.reason || "", description: s.description || "" } };
          if (s.action && s.action !== e.action && ["create", "link", "skip", "url"].includes(s.action)) patch.action = s.action;
          if (s.type && TYPES.includes(s.type) && s.type !== e.type) patch.type = s.type;
          if ((s.action || e.action) === "link" && s.matchId && s.matchId !== e.match?.id) {
            const c = e.candidates.find((x) => x.id === s.matchId);
            if (c) patch.match = { ...c, why: "Claude chose it" };
            else if (s.action === "link" && !e.match) delete patch.action;
          }
          if (patch.action || patch.type || patch.match) changed++;
          this._set(e.id, patch);
        }
      }
      this._ai = { ...this._ai, busy: false, note: `Claude checked ${items.length} items and changed ${changed}.` };
    } catch (err) {
      this._ai = { ...this._ai, busy: false, note: `Claude couldn't help: ${err.message}` };
    }
  }

  /* ---------- 3. import ---------- */

  async _apply() {
    this._step = "applying";
    this._log = [];
    try {
      // the site, through the HAX editor
      const io = {
        items: () => toJS(store.manifest?.items) || [],
        save: (list) => saveOutline(list),
        describe: (id, description) => store.cmsSiteEditor?.instance?.saveNodeDetails?.({ detail: { id, operation: "setDescription", description } }),
        upload: (name, bytes) => uploadFile(new File([bytes], name)),
      };
      this._result = await applyImport(this._plan, this._course, { io, onStep: (t) => (this._log = [...this._log, t]) });
      this._step = "done";
    } catch (err) {
      this._error = err.message || String(err);
      this._step = "review";
    }
  }

  _go(slug) {
    this.open = false;
    globalThis.removeEventListener("keydown", this.__keys, true);
    globalThis.history.pushState({}, "", slug);
    globalThis.dispatchEvent(new PopStateEvent("popstate"));
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
      .dialog.small {
        height: auto;
        width: min(36rem, calc(100vw - 2rem));
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
      :is(.x, .btn, .row, .seg, .chip-btn):focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
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
      .warn {
        flex: 1;
        font-size: 0.875rem;
        color: var(--destructive);
      }
      /* step 1 */
      .pick {
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .drop {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        padding: 2rem 1rem;
        border: 2px dashed var(--border);
        border-radius: var(--radius-lg);
        text-align: center;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      .drop.over {
        border-color: var(--primary);
        background: color-mix(in oklch, var(--primary) 6%, transparent);
      }
      .drop .lucide {
        width: 1.75rem;
        height: 1.75rem;
      }
      .steps {
        margin: 0;
        padding-left: 1.25rem;
        font-size: 0.875rem;
        line-height: 1.6;
      }
      .error {
        margin: 0;
        font-size: 0.875rem;
        color: var(--destructive);
      }
      /* step 2 */
      .split {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: minmax(20rem, 0.9fr) minmax(24rem, 1.1fr);
      }
      .list {
        min-height: 0;
        overflow-y: auto;
        border-right: 1px solid var(--border);
        padding: 0.5rem 0.5rem 1rem;
      }
      .group-label {
        margin: 0.75rem 0.5rem 0.25rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--muted-foreground);
      }
      .row {
        all: unset;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        min-height: 2rem;
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
        cursor: pointer;
      }
      .row:hover {
        background: color-mix(in oklch, var(--accent) 60%, transparent);
      }
      .row[aria-current="true"] {
        background: color-mix(in oklch, var(--primary) 9%, transparent);
        box-shadow: inset 3px 0 0 var(--primary);
      }
      .row.module {
        margin-top: 0.375rem;
        font-weight: 600;
      }
      .row.skipped .title {
        color: var(--muted-foreground);
        text-decoration: line-through;
        text-decoration-color: color-mix(in oklch, var(--muted-foreground) 60%, transparent);
      }
      .row .title {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .chip {
        flex: none;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        height: 1.25rem;
        padding: 0 0.5rem;
        border-radius: 999px;
        font-size: 0.6875rem;
        font-weight: 600;
        white-space: nowrap;
        background: var(--muted);
        color: var(--muted-foreground);
      }
      .chip.link {
        background: color-mix(in oklch, var(--primary) 14%, transparent);
        color: var(--foreground);
      }
      .chip.create {
        box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--primary) 50%, var(--border));
        background: transparent;
        color: var(--foreground);
      }
      .chip.ai {
        background: transparent;
        box-shadow: inset 0 0 0 1px var(--border);
      }
      .type {
        flex: none;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .detail {
        min-height: 0;
        overflow-y: auto;
        padding: 1rem 1.25rem 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .eyebrow {
        margin: 0;
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--muted-foreground);
      }
      h3 {
        margin: 0.125rem 0 0;
        font-size: 1rem;
        font-weight: 600;
      }
      label.field {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        font-size: 0.8125rem;
        font-weight: 500;
      }
      .input,
      select {
        box-sizing: border-box;
        width: 100%;
        height: 2.25rem;
        padding: 0 0.625rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        color: inherit;
        font: inherit;
        font-size: 0.875rem;
      }
      .input:focus-visible,
      select:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .segs.wrap {
        flex-wrap: wrap;
      }
      .chip.overview,
      .chip.text {
        background: transparent;
        box-shadow: inset 0 0 0 1px var(--border);
        color: var(--foreground);
      }
      .segs {
        display: inline-flex;
        padding: 3px;
        border-radius: var(--radius-md);
        background: var(--muted);
        gap: 2px;
        align-self: flex-start;
      }
      .seg {
        all: unset;
        height: 1.75rem;
        padding: 0 0.875rem;
        border-radius: calc(var(--radius-md) - 2px);
        font-size: 0.8125rem;
        font-weight: 500;
        color: var(--muted-foreground);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
      }
      .seg[aria-pressed="true"] {
        background: var(--background);
        color: var(--foreground);
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.1);
      }
      .seg[aria-disabled="true"] {
        opacity: 0.45;
        cursor: default;
      }
      .reasons {
        margin: 0;
        padding-left: 1.125rem;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .facts {
        display: grid;
        grid-template-columns: max-content 1fr;
        gap: 0.25rem 1rem;
        margin: 0;
        font-size: 0.8125rem;
      }
      .facts dt {
        color: var(--muted-foreground);
      }
      .facts dd {
        margin: 0;
      }
      .hint {
        margin: 0;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .note {
        margin: 0;
        padding: 0.625rem 0.75rem;
        border-radius: var(--radius-md);
        background: var(--muted);
        font-size: 0.8125rem;
      }
      .note.warning {
        background: color-mix(in oklch, var(--destructive) 8%, transparent);
      }
      .preview {
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        min-height: 16rem;
        width: 100%;
        background: var(--background);
      }
      .files li,
      .rubric-list li {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--border);
        font-size: 0.875rem;
      }
      .files,
      .rubric-list {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .files input {
        margin-top: 0.2rem;
        accent-color: var(--primary);
      }
      .files small,
      .rubric-list small {
        display: block;
        color: var(--muted-foreground);
        font-size: 0.75rem;
      }
      .log {
        margin: 0;
        padding: 1.25rem 1.25rem 1.25rem 2.5rem;
        font-size: 0.875rem;
        line-height: 1.7;
      }
      .done {
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        font-size: 0.875rem;
      }
      .done a {
        color: var(--link, var(--primary));
      }
      @media (max-width: 900px) {
        .split {
          grid-template-columns: minmax(0, 1fr);
          grid-template-rows: minmax(12rem, 0.9fr) minmax(16rem, 1.1fr);
        }
        .list {
          border-right: 0;
          border-bottom: 1px solid var(--border);
        }
      }
    `;
  }

  _renderPick() {
    const over = (on) => (e) => {
      e.preventDefault();
      e.currentTarget.classList.toggle("over", on);
    };
    return html`<div class="pick">
      <div
        class="drop"
        @dragover="${over(true)}"
        @dragleave="${over(false)}"
        @drop="${(e) => {
          over(false)(e);
          this._read(e.dataTransfer.files?.[0]);
        }}"
      >
        ${lucide("icons:file-download")}
        <span>${this._step === "reading" ? "Reading the course…" : "Drop a Canvas course export (.imscc) here, or"}</span>
        ${this._step === "reading"
          ? ""
          : html`<button class="btn outline" @click="${() => this.shadowRoot.querySelector("#file").click()}">Choose a file</button>
              <input id="file" type="file" accept=".imscc,.zip" hidden @change="${(e) => this._read(e.target.files?.[0])}" />`}
      </div>
      ${this._error ? html`<p class="error" role="alert">${this._error}</p>` : ""}
      <ol class="steps">
        <li>In Canvas: <b>Settings → Export Course Content → Course</b>, then download the export.</li>
        <li>Review what each item becomes: linked to a page the site has, a new draft page, or skipped.</li>
        <li>Import. Everything new arrives as a draft for authors only, with a draft course sequence for the course.</li>
      </ol>
      <p class="hint">The file is read in this browser. Nothing is saved until you import.</p>
    </div>`;
  }

  _chipFor(e) {
    return html`<span class="chip ${e.action}">${ACTION_LABEL[e.action] || e.action}</span>`;
  }

  _renderList() {
    const p = this._plan;
    const row = (id, content, extra = "") => html`<button class="row ${extra}" aria-current="${this._sel === id ? "true" : "false"}" @click="${() => (this._sel = id)}">${content}</button>`;
    const typeLabel = (t) => contentTypes(toJS(store.manifest?.items) || []).types.find((x) => x.id === t)?.label || "";
    const entryRow = (e, moduleSkip) =>
      row(
        e.id,
        html`<span class="title" style="padding-left:${0.75 + Math.min(e.indent || 0, 3) * 0.75}rem">${e.title}</span>
          ${e.ai && (e.ai.reason || e.ai.description) ? html`<span class="chip ai" title="Claude: ${e.ai.reason}">AI</span>` : ""}
          ${e.action === "create" ? html`<span class="type">${typeLabel(e.type)}</span>` : ""}${moduleSkip ? html`<span class="chip skip">Skip</span>` : this._chipFor(e)}`,
        moduleSkip || e.action === "skip" ? "skipped" : "",
      );
    return html`<nav class="list" aria-label="What the import does">
      ${row("settings", html`${lucide("oer:sliders-horizontal", "sm")}<span class="title">Sequence and course</span>`)}
      ${row("rubrics", html`${lucide("icons:assignment-turned-in", "sm")}<span class="title">Rubrics</span><span class="chip">${p.rubrics.filter((r) => r.uses).length}</span>`)}
      ${row("files", html`${lucide("icons:insert-drive-file", "sm")}<span class="title">Files</span><span class="chip">${p.files.filter((f) => f.import).length} of ${p.files.length}</span>`)}
      <p class="group-label">Modules</p>
      ${p.modules.map((m) => html`${row(m.id, html`<span class="title">${m.title}</span><span class="type">${moduleWeekLabel(m)}</span>${m.skip ? html`<span class="chip skip">Skip</span>` : ""}`, `module ${m.skip ? "skipped" : ""}`)}
        ${m.items.map((e) => entryRow(e, m.skip))}`)}
      ${p.unplaced.length ? html`<p class="group-label">Not in a module</p>${p.unplaced.map((e) => entryRow(e, false))}` : ""}
    </nav>`;
  }

  _renderEntry(e) {
    const site = toJS(store.manifest?.items) || [];
    const types = contentTypes(site).types.filter((t) => TYPES.includes(t.id));
    const module = this._plan.modules.find((m) => m.items.some((x) => x.id === e.id));
    const fixed = e.action === "header";
    const role = e.role || {};
    const group = this._plan.groups.find((g) => g.id === role.group);
    const rubric = this._plan.rubrics.find((r) => r.id === role.rubric);
    const due = role.due ? `week ${role.due.week}${role.due.day ? `, ${role.due.day} ${role.due.time}` : ""}` : "";
    const seg = (action, label, disabled = false) =>
      html`<button class="seg" aria-pressed="${e.action === action ? "true" : "false"}" aria-disabled="${disabled ? "true" : "false"}" @click="${() => !disabled && (action === "overview" ? this._setOverview(e) : this._set(e.id, { action }))}">${label}</button>`;
    const inModule = this._plan.modules.some((m) => m.items.some((x) => x.id === e.id));
    const preview = `<!doctype html><meta charset="utf-8"><style>body{font:15px/1.55 system-ui,sans-serif;margin:16px;color:#111}img{max-width:100%}oer-iframe,iframe{display:block;border:1px dashed #999;padding:8px;margin:8px 0;font-size:13px;color:#555}oer-iframe::before{content:"Embedded: " attr(src)}multiple-choice,true-false-question,self-check{display:block;border:1px solid #ccc;border-radius:6px;padding:8px 12px;margin:8px 0}multiple-choice::before,true-false-question::before{content:attr(question);display:block;font-weight:600}input{display:block}input::after{content:attr(value)}</style>${e.html || "<p><i>No text.</i></p>"}`;
    return html`<div>
        <p class="eyebrow">${ROLE_LABEL[role.as] || (fixed ? "Header" : "Item")} in ${module?.title || "no module"}</p>
        <h3>${e.title}</h3>
      </div>
      ${fixed
        ? html`<p class="hint">A text header in the module.</p>`
        : html`<div class="segs wrap" role="group" aria-label="What it becomes">
              ${seg("link", "Link to the site's page", !e.match)}${e.kind === "link" ? seg("url", "Link only") : seg("create", "Create a draft", !e.type)}
              ${e.kind === "page" ? html`${seg("text", "Keep in the sequence")}${inModule ? seg("overview", "The module's overview") : ""}` : ""}${seg("skip", "Skip")}
            </div>
            ${e.action === "text" ? html`<p class="hint">The sequence keeps it as one of its own pages, exported as an LMS page, not in the site's library: right for a welcome, a syllabus or course policies.</p>` : ""}
            ${e.action === "overview" ? html`<p class="hint">The module's overview, kept as written. You can switch it to a note plus a to-do list made for each term in the sequence builder.</p>` : ""}`}
      ${e.action === "create"
        ? html`<label class="field"
              >Title<input class="input" .value="${e.title}" @input="${(ev) => this._set(e.id, { title: ev.target.value })}"
            /></label>
            <label class="field"
              >Type
              <select @change="${(ev) => this._set(e.id, { type: ev.target.value })}">
                ${types.map((t) => html`<option value="${t.id}" ?selected="${t.id === e.type}">${t.label}</option>`)}
              </select>
            </label>`
        : ""}
      ${!fixed && e.kind !== "link"
        ? html`<label class="field"
            >The site's page
            <select
              @change="${(ev) => {
                const c = e.candidates.find((x) => x.id === ev.target.value);
                if (ev.target.value === "__pick") this._pickPage(e);
                else if (c) this._set(e.id, { match: c, action: "link" });
              }}"
            >
              <option value="" ?selected="${!e.match}">${e.candidates.length ? "Choose a match…" : "No likely match"}</option>
              ${(e.match && !e.candidates.some((c) => c.id === e.match.id) ? [e.match, ...e.candidates] : e.candidates).map(
                (c) => html`<option value="${c.id}" ?selected="${e.match?.id === c.id}">${c.title} (${Math.round(c.score * 100)}%)</option>`,
              )}
              <option value="__pick">Another page…</option>
            </select>
            ${e.match ? html`<span class="hint"><a href="${e.match.slug}" target="_blank">Open “${e.match.title}”</a></span>` : ""}
          </label>`
        : ""}
      ${e.reasons.length ? html`<ul class="reasons">${e.reasons.map((r) => html`<li>${r[0].toUpperCase()}${r.slice(1)}</li>`)}</ul>` : ""}
      ${e.ai?.reason ? html`<p class="note"><b>Claude:</b> ${e.ai.reason}${e.ai.description ? html`<br />${e.ai.description}` : ""}</p>` : ""}
      ${role.as && role.as !== "page" && role.as !== "url"
        ? html`<dl class="facts">
            <dt>In the sequence</dt>
            <dd>${ROLE_LABEL[role.as]}${role.as === "quiz" ? ` (${role.quizType})` : ""}${role.graded === false ? ", ungraded" : role.points ? `, ${role.points} points` : ""}</dd>
            ${due ? html`<dt>Due</dt><dd>${due}</dd>` : ""} ${group ? html`<dt>Grade group</dt><dd>${group.name}</dd>` : ""} ${rubric ? html`<dt>Rubric</dt><dd>${rubric.title}</dd>` : ""}
            ${role.submission ? html`<dt>Students submit</dt><dd>${role.submission.join(", ").replace(/_/g, " ")}</dd>` : ""}
          </dl>`
        : ""}
      ${e.kind === "link" ? html`<p class="hint">${e.url}</p>` : ""}
      ${e.skipped?.length ? html`<p class="note warning">${e.skipped.length} question${e.skipped.length === 1 ? "" : "s"} can't come over (${[...new Set(e.skipped.map((q) => q.type.replace(/_question$/, "").replace(/_/g, " ")))].join(", ")}).</p>` : ""}
      ${e.files?.length && e.action === "create"
        ? html`<p class="note">Uses ${e.files.length} file${e.files.length === 1 ? "" : "s"}: ${e.files.join(", ")}. ${e.files.some((f) => this._plan.files.find((x) => x.path === f)?.import) ? "" : "Tick them under Files to bring them; otherwise their links are dropped."}</p>`
        : ""}
      ${e.action !== "header" && e.kind !== "link"
        ? html`<div>
            <p class="eyebrow">${e.action === "create" ? "Preview of the new page" : "The Canvas content"}</p>
            <iframe class="preview" title="Preview of ${e.title}" sandbox="" srcdoc="${preview}"></iframe>
          </div>`
        : ""}`;
  }

  _renderModule(m) {
    return html`<div>
        <p class="eyebrow">Module</p>
        <h3>${m.title}</h3>
      </div>
      <div class="segs" role="group" aria-label="The module">
        <button class="seg" aria-pressed="${!m.skip ? "true" : "false"}" @click="${() => this._setModule(m.id, { skip: false })}">Import</button>
        <button class="seg" aria-pressed="${m.skip ? "true" : "false"}" @click="${() => this._setModule(m.id, { skip: true, reason: m.reason || "you skipped it" })}">Skip</button>
      </div>
      ${m.reason ? html`<p class="hint">Suggested: skip, because ${m.reason}.</p>` : ""}
      <label class="check" style="display:flex;gap:0.5rem;align-items:center;font-size:0.875rem"
        ><input type="checkbox" .checked="${!Number(m.week)}" @change="${(ev) => this._setModule(m.id, ev.target.checked ? { week: "", weeks: 1 } : { week: 1, weeks: 1 })}" />All term (no week)</label
      >
      ${Number(m.week)
        ? html`<div style="display:flex;gap:0.75rem">
            <label class="field"
              >From week<input class="input" type="number" min="1" style="width:6rem" .value="${String(m.week)}" @change="${(ev) => Number(ev.target.value) > 0 && this._setModule(m.id, { week: Number(ev.target.value) })}"
            /></label>
            <label class="field"
              >To week<input
                class="input"
                type="number"
                min="${m.week}"
                style="width:6rem"
                .value="${String(Number(m.week) + (m.weeks || 1) - 1)}"
                @change="${(ev) => this._setModule(m.id, { weeks: Math.max(1, (Number(ev.target.value) || m.week) - m.week + 1) })}"
            /></label>
          </div>`
        : ""}
      <p class="hint">${m.items.length} item${m.items.length === 1 ? "" : "s"}.</p>`;
  }

  _renderRubrics() {
    const site = rubricPages(toJS(store.manifest?.items) || []);
    const list = this._plan.rubrics.filter((r) => r.uses);
    const setR = (id, patch) => this._setPlan({ rubrics: this._plan.rubrics.map((r) => (r.id === id ? { ...r, ...patch } : r)) });
    return html`<div>
        <p class="eyebrow">Rubrics</p>
        <h3>${list.length} rubric${list.length === 1 ? "" : "s"} the imported items grade with</h3>
      </div>
      <p class="hint">Rubrics that are the same in Canvas are merged. Each becomes a draft rubric page, or uses one of the site's.</p>
      <ul class="rubric-list">
        ${list.map(
          (r) => html`<li>
            <div style="flex:1">
              <b>${r.title}</b>
              <small>${r.data.criteria.length} criteria (${r.data.criteria.map((c) => c.name).join(", ")}); levels ${r.data.levels.map((l) => l.name).join(", ")}; used ${r.uses} time${r.uses === 1 ? "" : "s"}${r.canvas.length > 1 ? `, merged from ${r.canvas.length} Canvas rubrics` : ""}</small>
            </div>
            <select
              aria-label="${r.title}: create or use the site's"
              style="width:auto;max-width:14rem"
              @change="${(ev) => {
                const page = site.find((x) => x.id === ev.target.value);
                setR(r.id, page ? { action: "reuse", match: { id: page.id, title: page.title, key: page.metadata?.oerRubric?.key || page.id } } : { action: "create", match: null });
              }}"
            >
              <option value="" ?selected="${r.action === "create"}">Create a draft rubric</option>
              ${site.map((p) => html`<option value="${p.id}" ?selected="${r.match?.id === p.id}">Use “${p.title}” (${rubricOf(p).criteria.length} criteria)</option>`)}
            </select>
          </li>`,
        )}
      </ul>`;
  }

  _renderFiles() {
    const files = this._plan.files;
    const setF = (path, on) => this._setPlan({ files: files.map((f) => (f.path === path ? { ...f, import: on } : f)) });
    return html`<div>
        <p class="eyebrow">Files</p>
        <h3>${files.length} file${files.length === 1 ? "" : "s"} in the export</h3>
      </div>
      <p class="note warning">
        Files come over only when ticked. A course's files can include student work and other private documents, and files uploaded to the site are public once the site is published, even if
        their pages are drafts.
      </p>
      <ul class="files">
        ${files.map((f) => {
          const used = f.usedBy.length;
          return html`<li>
            <input type="checkbox" id="f-${f.path}" .checked="${f.import}" @change="${(ev) => setF(f.path, ev.target.checked)}" />
            <label for="f-${f.path}" style="flex:1">${f.path}<small>${used ? `Used by ${used} imported item${used === 1 ? "" : "s"}` : "Not used by anything being imported"}</small></label>
          </li>`;
        })}
      </ul>`;
  }

  _renderSettings() {
    const p = this._plan;
    const courses = (toJS(store.manifest?.items) || []).filter((i) => i.metadata?.pageType === "oer:course" && !i.metadata?.oerSnapshotOf);
    const c = planCounts(p);
    return html`<div>
        <p class="eyebrow">From Canvas</p>
        <h3>${p.course.title}</h3>
      </div>
      <dl class="facts">
        <dt>Started</dt>
        <dd>${p.course.start || "not given"} (${p.course.timeZone})</dd>
        <dt>Modules</dt>
        <dd>${p.modules.length} (${p.modules.filter((m) => m.skip).length} suggested to skip)</dd>
        <dt>The import</dt>
        <dd>${c.link} linked to the site's pages, ${c.create} new draft pages, ${c.texts} kept in the sequence, ${c.overviews} module overviews, ${c.urls} links, ${c.skip} skipped; ${c.rubricsNew} new rubric${c.rubricsNew === 1 ? "" : "s"}, ${c.rubricsReused} reused</dd>
      </dl>
      <label class="field">Sequence title<input class="input" .value="${p.sequenceTitle}" @input="${(ev) => this._setPlan({ sequenceTitle: ev.target.value })}" /></label>
      <label class="field"
        >Course
        <select
          @change="${(ev) => {
            const page = courses.find((x) => x.id === ev.target.value);
            this._setPlan({ coursePage: page ? { id: page.id, title: page.title } : null });
          }}"
        >
          <option value="" ?selected="${!p.coursePage}">None</option>
          ${courses.map((x) => html`<option value="${x.id}" ?selected="${p.coursePage?.id === x.id}">${x.title}</option>`)}
        </select>
        <span class="hint">The sequence and new pages are linked to it.</span>
      </label>
      <dl class="facts">
        <dt>Length</dt>
        <dd>${p.course.weeks} weeks (from the modules and due dates)</dd>
        <dt>Grade groups</dt>
        <dd>${p.groups.map((g) => `${g.name} ${g.weight}%`).join(", ") || "none"}</dd>
      </dl>
      ${p.problems.length ? html`<div><p class="eyebrow">To know</p><ul class="reasons">${p.problems.map((x) => html`<li>${x.text}</li>`)}</ul></div>` : ""}
      <div>
        <p class="eyebrow">Claude</p>
        ${this._ai.up
          ? html`<p class="hint">The local helper is running${this._ai.model ? ` (${this._ai.model})` : ""}. It can check the suggested types, matches and skips; you still review every change.</p>
              <div style="margin-top:0.5rem"><button class="btn outline small" aria-disabled="${this._ai.busy ? "true" : "false"}" @click="${this._refine}">${lucide("oer:sparkles", "sm")}${this._ai.busy ? "Checking…" : "Refine with Claude"}</button></div>`
          : html`<p class="hint">
              To have Claude check the suggestions, start the local helper: <code>node --env-file=.env.local scripts/ai-bridge.mjs</code> in nu-hax (it reads ANTHROPIC_API_KEY from .env.local), then
              <button class="btn outline small" style="display:inline-flex;margin-left:0.25rem" @click="${this._checkAi}">check again</button>.
            </p>`}
        ${this._ai.note ? html`<p class="hint" role="status">${this._ai.note}</p>` : ""}
      </div>`;
  }

  _renderDetail() {
    const sel = this._sel;
    if (sel === "settings") return this._renderSettings();
    if (sel === "rubrics") return this._renderRubrics();
    if (sel === "files") return this._renderFiles();
    const m = this._module(sel);
    if (m) return this._renderModule(m);
    const e = this._entry(sel);
    return e ? this._renderEntry(e) : html`<p class="hint">Choose an item.</p>`;
  }

  render() {
    if (!this.open) return html``;
    const step = this._step;
    const small = step === "pick" || step === "reading" || step === "applying" || step === "done";
    const c = this._plan ? planCounts(this._plan) : null;
    return html`
      <div class="backdrop" @click="${this._requestClose}"></div>
      <div class="dialog ${small ? "small" : ""}" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${lucide("hax:module")}Import from Canvas</h2>
            <p class="sub">${this._plan ? this._plan.course.title : "A Canvas course export becomes draft pages and a draft course sequence."}</p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._requestClose}">${lucide("oer:x")}</button>
        </header>
        ${step === "pick" || step === "reading" ? this._renderPick() : ""}
        ${step === "review"
          ? html`<div class="split">
                ${this._renderList()}
                <section class="detail" aria-label="Selected">${this._renderDetail()}</section>
              </div>
              <footer>
                ${this._confirmClose
                  ? html`<span class="warn">Close without importing? Your review is lost.</span>
                      <button class="btn outline" @click="${() => (this._confirmClose = false)}">Keep reviewing</button>
                      <button class="btn outline" @click="${() => ((this._confirmClose = true), this._requestClose())}">Close</button>`
                  : html`<span class="status">${this._error ? html`<span class="error">${this._error}</span>` : html`${c.link} linked, ${c.create} new drafts, ${c.texts + c.overviews} kept in the sequence, ${c.urls} links, ${c.skip} skipped${c.files ? `, ${c.files} files` : ""}`}</span>
                      <button class="btn outline" @click="${this._requestClose}">Cancel</button>
                      <button class="btn primary" @click="${this._apply}">Import as drafts</button>`}
              </footer>`
          : ""}
        ${step === "applying" ? html`<ol class="log" aria-live="polite">${this._log.map((t, i) => html`<li>${t}${i === this._log.length - 1 ? "…" : ""}</li>`)}</ol>` : ""}
        ${step === "done"
          ? html`<div class="done" role="status">
                <p><b>Imported.</b> ${this._result.pages.length} draft page${this._result.pages.length === 1 ? "" : "s"}, ${this._result.rubrics} rubric${this._result.rubrics === 1 ? "" : "s"}, ${this._result.files} file${this._result.files === 1 ? "" : "s"}, and the course sequence.</p>
                ${this._result.sequence ? html`<p><a href="${this._result.sequence.slug}" @click="${(ev) => (ev.preventDefault(), this._go(this._result.sequence.slug))}">Open “${this._result.sequence.title}”</a> to check each week, then export it to Canvas with your term's dates.</p>` : ""}
                <p class="hint">New pages are drafts: only signed-in authors see them until they're published.</p>
              </div>
              <footer><span class="status"></span><button class="btn primary" @click="${() => ((this._step = "pick"), this._requestClose())}">Close</button></footer>`
          : ""}
      </div>
    `;
  }
}
customElements.define(OerCanvasImport.tag, OerCanvasImport);

/** The page-wide Canvas import, created on first use. */
export function canvasImport() {
  const doc = globalThis.document;
  return doc.querySelector(OerCanvasImport.tag) || doc.body.appendChild(doc.createElement(OerCanvasImport.tag));
}
