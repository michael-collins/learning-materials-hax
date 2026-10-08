/**
 * `oer-sequence-export` — export a course sequence to Canvas for a term:
 * the term's start and end dates, its breaks, when assignments are
 * usually due (a day and time, or the start of the week's first class),
 * class meetings (optional), the time zone and the site's public address.
 * Builds a Canvas Course Export Package (lms/canvas-package.js) and
 * downloads it. The answers are remembered per sequence in this browser.
 *
 *   sequenceExport().show(page)
 * @element oer-sequence-export
 */
import { html, css, LitElement } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { buildCanvasPackage } from "./canvas-package.js";
import { zipBytes } from "./zip.js";
import { download } from "../books/book-export.js";
import { toOffering, readiness, sequenceWeeks, sequenceOf } from "./sequence-model.js";
import { DELIVERY_MODES, deliveryFromCourse, weeksAvailable } from "./offering-schedule.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

const DAYS = [
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"],
  ["Sun", "Sunday"],
];
const ZONES = ["America/New_York", "America/Chicago", "America/Denver", "America/Phoenix", "America/Los_Angeles", "America/Anchorage", "Pacific/Honolulu", "Europe/London", "UTC"];
const STORE_KEY = "oer-sequence-export";

const items = () => toJS(store.manifest?.items) || [];
const blankRun = () => ({
  term: "",
  start: "",
  end: "",
  breaks: [],
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York",
  defaults: { dueRule: "day", dueDay: "Sun", dueTime: "23:59" },
  meetings: [],
  siteUrl: "",
  publish: true,
});

class OerSequenceExport extends LitElement {
  static get tag() {
    return "oer-sequence-export";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      _run: { state: true },
      _busy: { state: true },
      _done: { state: true },
      _error: { state: true },
    };
  }

  constructor() {
    super();
    this.open = false;
    this._run = blankRun();
    this.__keys = (e) => {
      if (this.open && e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        this._close();
      }
    };
  }

  show(page) {
    this._page = page;
    this._done = null;
    this._error = "";
    let saved = null;
    try {
      saved = JSON.parse(globalThis.localStorage.getItem(`${STORE_KEY}:${page.id}`) || "null");
    } catch {
      saved = null;
    }
    const domain = toJS(store.manifest?.metadata?.site?.domain) || "";
    this._run = { ...blankRun(), siteUrl: domain || new URL(".", globalThis.document.baseURI).href, ...(saved || {}) };
    this.open = true;
    globalThis.addEventListener("keydown", this.__keys, true);
    this.updateComplete.then(() => this.shadowRoot.querySelector("#start")?.focus());
  }

  _close() {
    this.open = false;
    globalThis.removeEventListener("keydown", this.__keys, true);
  }

  _set(patch) {
    this._run = { ...this._run, ...patch };
    this._done = null;
    try {
      globalThis.localStorage.setItem(`${STORE_KEY}:${this._page.id}`, JSON.stringify(this._run));
    } catch {
      // remembered for this visit only
    }
  }

  _setRow(key, i, patch) {
    this._set({ [key]: this._run[key].map((r, n) => (n === i ? { ...r, ...patch } : r)) });
  }

  get _delivery() {
    return deliveryFromCourse(this._page?.metadata?.oerFields?.delivery) || "in-person";
  }

  async _export() {
    this._busy = true;
    this._error = "";
    try {
      const all = items();
      const page = all.find((i) => i.id === this._page.id) || this._page;
      const offering = toOffering(page, all, this._run);
      const base = globalThis.document.baseURI;
      const htmlOf = async (item) => {
        const res = await fetch(new URL(item.location, base), { cache: "no-cache" });
        return res.ok ? res.text() : "";
      };
      // attachments for File items: copied in when this browser can read them
      const fileOf = async (url) => {
        try {
          const res = await fetch(new URL(url, base));
          return res.ok ? new Uint8Array(await res.arrayBuffer()) : null;
        } catch {
          return null;
        }
      };
      const { files, report } = await buildCanvasPackage({ offering, items: all, htmlOf, fileOf });
      const name = `${(page.slug.split("/").pop() || "sequence").replace(/[^a-z0-9-]+/gi, "-")}${this._run.term ? `-${this._run.term.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}` : ""}.imscc`;
      download(new Blob([zipBytes(files)], { type: "application/zip" }), name);
      this._done = { name, ...report };
    } catch (err) {
      this._error = `The export didn't finish: ${err?.message || err}`;
    } finally {
      this._busy = false;
    }
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
        width: min(44rem, calc(100vw - 2rem));
        max-height: calc(100dvh - 2rem);
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
      }
      .body {
        overflow-y: auto;
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
      fieldset {
        margin: 0;
        padding: 0;
        border: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      legend,
      h3 {
        margin: 0 0 0.25rem;
        padding: 0;
        font-size: 0.875rem;
        font-weight: 600;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
        gap: 0.75rem;
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
        font-size: 0.875rem;
      }
      .rows {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .rowline {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
      }
      .rowline > * {
        flex: 1 1 7rem;
        min-width: 0;
      }
      .rowline > .icon {
        flex: none;
      }
      .choice {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
      }
      .choice input {
        accent-color: var(--primary);
      }
      .btn {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2.25rem;
        padding: 0 0.875rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .btn.primary[aria-disabled="true"] {
        opacity: 0.6;
        cursor: default;
      }
      .btn.outline {
        border: 1px solid var(--input-border, var(--border));
      }
      .btn.outline:hover,
      .icon:hover {
        background: var(--accent);
      }
      .btn.small {
        height: 2rem;
        padding: 0 0.625rem;
        font-size: 0.8125rem;
        align-self: flex-start;
      }
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
      .hint {
        margin: 0;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .checks {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        font-size: 0.8125rem;
      }
      .checks li {
        display: flex;
        gap: 0.5rem;
        align-items: flex-start;
      }
      .checks .lucide {
        margin-top: 0.125rem;
      }
      .warn {
        color: var(--foreground);
      }
      .warn .lucide {
        color: var(--muted-foreground);
      }
      .ok .lucide {
        color: var(--primary);
      }
      .error {
        color: var(--destructive);
      }
      footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.5rem;
        padding: 0.875rem 1.25rem;
        border-top: 1px solid var(--border);
      }
      .done {
        padding: 0.875rem 1rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        background: var(--muted);
        font-size: 0.8125rem;
      }
      .done p {
        margin: 0 0 0.375rem;
      }
      .done ol {
        margin: 0.375rem 0 0;
        padding-left: 1.25rem;
      }
    `;
  }

  _renderBreaks() {
    return html`<fieldset>
      <legend>Breaks</legend>
      <div class="rows">
        ${this._run.breaks.map(
          (b, i) => html`<div class="rowline">
            <input class="input" aria-label="Break name" placeholder="Spring break" .value="${b.label || ""}" @input="${(e) => this._setRow("breaks", i, { label: e.target.value })}" />
            <input class="input" type="date" aria-label="First day of break" .value="${b.start || ""}" @input="${(e) => this._setRow("breaks", i, { start: e.target.value })}" />
            <input class="input" type="date" aria-label="Last day of break" .value="${b.end || ""}" @input="${(e) => this._setRow("breaks", i, { end: e.target.value })}" />
            <button class="icon" aria-label="Remove ${b.label || "this break"}" title="Remove" @click="${() => this._set({ breaks: this._run.breaks.filter((_, n) => n !== i) })}">${lucide("oer:x")}</button>
          </div>`,
        )}
      </div>
      <button class="btn outline small" @click="${() => this._set({ breaks: [...this._run.breaks, { label: "", start: "", end: "" }] })}">${lucide("oer:plus")}Add a break</button>
      <p class="hint">A break of three or more weekdays moves the weeks after it; a holiday cancels class that day and moves anything due on it.</p>
    </fieldset>`;
  }

  _renderMeetings() {
    const hybrid = this._delivery === "hybrid";
    const online = this._delivery === "online-sync";
    return html`<fieldset>
      <legend>Class meetings <span class="hint">(optional)</span></legend>
      <div class="rows">
        ${this._run.meetings.map(
          (m, i) => html`<div class="rowline">
            <select aria-label="Day" .value="${m.day || "Tue"}" @change="${(e) => this._setRow("meetings", i, { day: e.target.value })}">
              ${DAYS.map(([v, l]) => html`<option value="${v}" ?selected="${(m.day || "Tue") === v}">${l}</option>`)}
            </select>
            <input class="input" type="time" aria-label="Starts" .value="${m.start || ""}" @input="${(e) => this._setRow("meetings", i, { start: e.target.value })}" />
            <input class="input" type="time" aria-label="Ends" .value="${m.end || ""}" @input="${(e) => this._setRow("meetings", i, { end: e.target.value })}" />
            ${hybrid
              ? html`<select aria-label="Where" .value="${m.mode || "in-person"}" @change="${(e) => this._setRow("meetings", i, { mode: e.target.value })}">
                  <option value="in-person" ?selected="${(m.mode || "in-person") === "in-person"}">In person</option>
                  <option value="online" ?selected="${m.mode === "online"}">Online</option>
                </select>`
              : ""}
            ${online || (hybrid && m.mode === "online")
              ? html`<input class="input" type="url" aria-label="Video link" placeholder="https://…" .value="${m.link || ""}" @input="${(e) => this._setRow("meetings", i, { link: e.target.value })}" />`
              : html`<input class="input" aria-label="Room" placeholder="Room" .value="${m.location || ""}" @input="${(e) => this._setRow("meetings", i, { location: e.target.value })}" />`}
            <button class="icon" aria-label="Remove this meeting" title="Remove" @click="${() => this._set({ meetings: this._run.meetings.filter((_, n) => n !== i) })}">${lucide("oer:x")}</button>
          </div>`,
        )}
      </div>
      <button class="btn outline small" @click="${() => this._set({ meetings: [...this._run.meetings, { day: "Tue", start: "", end: "", location: "", link: "" }] })}">${lucide("oer:plus")}Add a meeting</button>
      <p class="hint">Each meeting goes on the Canvas calendar for every teaching week, with its room or link.</p>
    </fieldset>`;
  }

  render() {
    if (!this.open) return html``;
    const r = this._run;
    const all = items();
    const page = all.find((i) => i.id === this._page?.id) || this._page;
    const weeks = sequenceWeeks(page);
    const meets = DELIVERY_MODES[this._delivery]?.meets;
    const missing = !r.start || !r.end;
    const checks = missing ? [] : readiness(page, all, r);
    const available = r.start && r.end ? weeksAvailable({ ...r, weeks }) : 0;
    const local = /\/\/(localhost|127\.0\.0\.1)/.test(r.siteUrl || "");
    const modules = sequenceOf(page).modules.length;
    return html`
      <div class="backdrop" @click="${this._close}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${lucide("hax:module")}Export to Canvas</h2>
            <p class="sub">${page?.title}: ${weeks} weeks, ${modules} modules, ${DELIVERY_MODES[this._delivery]?.label.toLowerCase()}. Choose the term's dates.</p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._close}">${lucide("oer:x")}</button>
        </header>
        <div class="body">
          <div class="grid">
            <label class="field">Term <span class="hint">optional</span><input class="input" placeholder="Spring 2027" .value="${r.term}" @input="${(e) => this._set({ term: e.target.value })}" /></label>
            <label class="field" for="start">First day of the term<input id="start" class="input" type="date" required .value="${r.start}" @input="${(e) => this._set({ start: e.target.value })}" /></label>
            <label class="field">Last day of the term<input class="input" type="date" required .value="${r.end}" @input="${(e) => this._set({ end: e.target.value })}" /></label>
          </div>
          ${available ? html`<p class="hint">${available} teaching week${available === 1 ? "" : "s"} between these dates, breaks left out; the sequence runs ${weeks}.</p>` : ""}
          ${this._renderBreaks()}
          <fieldset>
            <legend>When assignments are due</legend>
            <label class="choice"><input type="radio" name="due" .checked="${r.defaults.dueRule !== "first-class"}" @change="${() => this._set({ defaults: { ...r.defaults, dueRule: "day" } })}" />On the due week's</label>
            <div class="rowline" style="padding-left: 1.5rem">
              <select aria-label="Day" .value="${r.defaults.dueDay}" @change="${(e) => this._set({ defaults: { ...r.defaults, dueDay: e.target.value, dueRule: "day" } })}">
                ${DAYS.map(([v, l]) => html`<option value="${v}" ?selected="${r.defaults.dueDay === v}">${l}</option>`)}
              </select>
              <input class="input" type="time" aria-label="Time" .value="${r.defaults.dueTime}" @input="${(e) => this._set({ defaults: { ...r.defaults, dueTime: e.target.value || "23:59", dueRule: "day" } })}" />
            </div>
            ${meets
              ? html`<label class="choice"><input type="radio" name="due" .checked="${r.defaults.dueRule === "first-class"}" @change="${() => this._set({ defaults: { ...r.defaults, dueRule: "first-class" } })}" />At the start of the due week's first class</label>`
              : ""}
            <p class="hint">Assignments that set their own day or time in the sequence keep it.</p>
          </fieldset>
          ${meets ? this._renderMeetings() : ""}
          <div class="grid">
            <label class="field">Time zone
              <select .value="${r.timeZone}" @change="${(e) => this._set({ timeZone: e.target.value })}">
                ${[...new Set([r.timeZone, ...ZONES])].map((z) => html`<option value="${z}" ?selected="${z === r.timeZone}">${z.replace(/_/g, " ")}</option>`)}
              </select>
            </label>
            <label class="field">Site address<input class="input" type="url" .value="${r.siteUrl}" @input="${(e) => this._set({ siteUrl: e.target.value })}" /></label>
          </div>
          ${local ? html`<p class="hint">This is a local address: embedded pages only load in Canvas from the site's public address.</p>` : ""}
          <label class="choice"><input type="checkbox" .checked="${r.publish !== false}" @change="${(e) => this._set({ publish: e.target.checked })}" />Publish modules, pages and assignments on import</label>
          <div>
            <h3>Before you export</h3>
            ${missing
              ? html`<p class="hint">Choose the first and last days of the term.</p>`
              : html`<ul class="checks">
                  ${checks.length
                    ? checks.map((c) => html`<li class="${c.level === "error" ? "error" : "warn"}">${lucide("oer:circle-alert")}<span>${c.text}</span></li>`)
                    : html`<li class="ok">${lucide("oer:check")}<span>Ready to export.</span></li>`}
                </ul>`}
          </div>
          ${this._done
            ? html`<div class="done" role="status">
                <p><b>Downloaded ${this._done.name}</b>: ${this._done.counts.modules} modules, ${this._done.counts.assignments} assignments, ${this._done.counts.discussions} discussions, ${this._done.counts.quizzes} quizzes, ${this._done.counts.pages} pages, ${this._done.counts.files} files, ${this._done.counts.events} class meetings.</p>
                ${this._done.warnings.length ? html`<ul class="checks">${this._done.warnings.map((w) => html`<li class="warn">${lucide("oer:circle-alert")}<span>${w}</span></li>`)}</ul>` : ""}
                <ol>
                  <li>In Canvas: Settings → Import Course Content → Canvas Course Export Package.</li>
                  <li>Choose the file and "All content". Tick "Import existing quizzes as New Quizzes" if it's offered.</li>
                  <li>Leave "Adjust events and due dates" unticked: the dates are already this term's.</li>
                </ol>
              </div>`
            : ""}
          ${this._error ? html`<p class="error" role="alert">${this._error}</p>` : ""}
        </div>
        <footer>
          <button class="btn outline" @click="${this._close}">Close</button>
          <button class="btn primary" aria-disabled="${missing || this._busy ? "true" : "false"}" @click="${() => !missing && !this._busy && this._export()}">${lucide("icons:file-download")}${this._busy ? "Building…" : "Download for Canvas"}</button>
        </footer>
      </div>
    `;
  }
}
customElements.define(OerSequenceExport.tag, OerSequenceExport);

export function sequenceExport() {
  const doc = globalThis.document;
  return doc.querySelector(OerSequenceExport.tag) || doc.body.appendChild(doc.createElement(OerSequenceExport.tag));
}
