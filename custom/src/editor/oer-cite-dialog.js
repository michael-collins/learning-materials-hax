/**
 * `oer-cite-dialog` — choose what to cite: a reference already on the page,
 * one of the site's Resource pages, or a new source (author, year, title,
 * link, publisher, or free text), optionally saved as a Resource page.
 *
 *   const choice = await citeDialog().pick({ references });
 *   // { id } | { html, resource } | { html, data, saveAsResource } | null
 * @element oer-cite-dialog
 */
import { html, css, LitElement } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "./lucide-icons.generated.js";
import { formatCitation } from "./citations.js";
import { peopleOf } from "../types/content-types.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const TABS = [
  { id: "page", label: "On this page" },
  { id: "resources", label: "Resources" },
  { id: "new", label: "New source" },
];

// a Resource page's fields as citation parts
export function resourceCitation(item) {
  const f = item?.metadata?.oerFields || {};
  return { authors: peopleOf(f.authors).map((p) => p.name), year: f.date || "", title: item.title, url: f.url || "", publisher: f.publisher || "" };
}

class OerCiteDialog extends LitElement {
  static get tag() {
    return "oer-cite-dialog";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      _tab: { state: true },
      _query: { state: true },
      _chosen: { state: true },
      _form: { state: true },
      _free: { state: true },
      _save: { state: true },
    };
  }

  constructor() {
    super();
    this.open = false;
    this.__keys = (e) => {
      if (this.open && e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        this._finish(null);
      }
    };
  }

  /** Resolves with the choice, or null when cancelled. */
  pick({ references = [] } = {}) {
    this._references = references;
    this._tab = references.length ? "page" : "resources";
    this._query = "";
    this._chosen = null;
    this._form = { authors: "", year: "", title: "", url: "", publisher: "" };
    this._free = "";
    this._save = true;
    this._returnFocus = globalThis.document.activeElement;
    this.open = true;
    globalThis.addEventListener("keydown", this.__keys, true);
    this.updateComplete.then(() => this.shadowRoot.querySelector(".tabs button[aria-selected='true']")?.focus());
    return new Promise((resolve) => (this._resolve = resolve));
  }

  _finish(value) {
    this.open = false;
    globalThis.removeEventListener("keydown", this.__keys, true);
    this._resolve?.(value);
    this._resolve = null;
  }

  get _resources() {
    const q = this._query.trim().toLowerCase();
    return (toJS(store.manifest?.items) || [])
      .filter((i) => i.metadata?.pageType === "oer:resource" && !i.metadata?.oerSnapshotOf)
      .filter((i) => !q || `${i.title} ${i.metadata?.oerFields?.kind || ""} ${peopleOf(i.metadata?.oerFields?.authors).map((p) => p.name).join(" ")}`.toLowerCase().includes(q))
      .sort((a, b) => a.title.localeCompare(b.title));
  }

  get _newParts() {
    const f = this._form;
    return { authors: f.authors.split(/;|\band\b|,(?=\s*[A-Z][a-z]+\s+[A-Z])/).map((s) => s.trim()).filter(Boolean), year: f.year.trim(), title: f.title.trim(), url: f.url.trim(), publisher: f.publisher.trim() };
  }

  get _canCite() {
    if (this._tab === "new") return !!(this._free.trim() || this._form.title.trim() || this._form.url.trim());
    return !!this._chosen;
  }

  _cite() {
    if (!this._canCite) return;
    if (this._tab === "page") return this._finish({ id: this._chosen });
    if (this._tab === "resources") {
      const item = this._resources.find((i) => i.id === this._chosen) || (toJS(store.manifest?.items) || []).find((i) => i.id === this._chosen);
      return this._finish({ html: formatCitation(resourceCitation(item)), resource: item.id });
    }
    if (this._free.trim()) return this._finish({ html: esc(this._free.trim()) });
    const parts = this._newParts;
    return this._finish({ html: formatCitation(parts), data: parts, saveAsResource: this._save && !!parts.title });
  }

  static get styles() {
    return css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10002;
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
        width: min(36rem, calc(100vw - 2rem));
        max-height: min(40rem, calc(100dvh - 2rem));
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        overflow: hidden;
      }
      button,
      input,
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
      header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem 0.75rem 0.75rem 1.25rem;
      }
      h2 {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
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
      .tabs {
        display: flex;
        gap: 0.25rem;
        margin: 0 1.25rem;
        padding: 0.1875rem;
        border-radius: var(--radius-md);
        background: var(--muted);
      }
      .tabs button {
        all: unset;
        flex: 1;
        padding: 0.375rem 0.5rem;
        border-radius: calc(var(--radius-md) - 2px);
        font-size: 0.8125rem;
        font-weight: 500;
        text-align: center;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .tabs button[aria-selected="true"] {
        background: var(--background);
        color: var(--foreground);
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
      }
      .tabs button:focus-visible {
        outline: 2px solid var(--ring);
      }
      .body {
        flex: 1;
        overflow-y: auto;
        padding: 1rem 1.25rem;
      }
      .search {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 2.25rem;
        margin-bottom: 0.75rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
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
        outline: 0;
        background: transparent;
        font-size: 0.875rem;
        color: var(--foreground);
      }
      .options {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      .option {
        display: flex;
        gap: 0.625rem;
        align-items: flex-start;
        padding: 0.625rem 0.75rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        line-height: 1.5;
        cursor: pointer;
      }
      .option:hover {
        background: var(--accent);
      }
      .option:has(input:checked) {
        border-color: var(--primary);
        box-shadow: inset 0 0 0 1px var(--primary);
      }
      .option input {
        margin: 0.25rem 0 0;
        accent-color: var(--primary);
      }
      .option small {
        display: block;
        color: var(--muted-foreground);
        font-size: 0.75rem;
      }
      .option a {
        color: var(--link);
        pointer-events: none;
      }
      .empty {
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      .grid {
        display: grid;
        grid-template-columns: 1fr 6rem;
        gap: 0.625rem 0.75rem;
      }
      .full {
        grid-column: 1 / -1;
      }
      label {
        display: block;
        margin-bottom: 0.25rem;
        font-size: 0.8125rem;
        font-weight: 500;
      }
      .field input,
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
        min-height: 4rem;
        padding: 0.5rem 0.75rem;
        resize: vertical;
      }
      .hint {
        margin: 0.25rem 0 0;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .or {
        margin: 1rem 0 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--muted-foreground);
      }
      .preview {
        margin-top: 0.875rem;
        padding: 0.625rem 0.75rem;
        border-radius: var(--radius-md);
        background: color-mix(in srgb, var(--muted) 60%, transparent);
        font-size: 0.875rem;
        line-height: 1.5;
      }
      .preview a {
        color: var(--link);
      }
      .check {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.75rem;
        font-size: 0.875rem;
        font-weight: 400;
      }
      .check input {
        accent-color: var(--primary);
      }
      footer {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-top: 1px solid var(--border);
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
      .btn:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
    `;
  }

  _option(id, title, sub, inner) {
    return html`<label class="option">
      <input type="radio" name="cite" .checked="${this._chosen === id}" @change="${() => (this._chosen = id)}" @dblclick="${() => this._cite()}" />
      <span>${inner ?? title}${sub ? html`<small>${sub}</small>` : ""}</span>
    </label>`;
  }

  _renderPage() {
    const refs = this._references || [];
    if (!refs.length) return html`<p class="empty">This page has no references yet.</p>`;
    return html`<div class="options" role="radiogroup" aria-label="References on this page">
      ${refs.map((r, i) => {
        const span = globalThis.document.createElement("span");
        span.innerHTML = r.html;
        return this._option(r.id, "", "", html`<b>${i + 1}.</b> ${span}`);
      })}
    </div>`;
  }

  _renderResources() {
    const list = this._resources;
    return html`<label class="search">
        ${lucide("icons:search")}
        <input type="search" placeholder="Search resources" aria-label="Search resources" .value="${this._query}" @input="${(e) => (this._query = e.target.value)}" />
      </label>
      ${list.length
        ? html`<div class="options" role="radiogroup" aria-label="Resources">
            ${list.map((i) => {
              const f = i.metadata?.oerFields || {};
              const sub = [f.kind, peopleOf(f.authors).map((p) => p.name).join(", "), f.date, f.url].filter(Boolean).join(" · ");
              return this._option(i.id, i.title, sub);
            })}
          </div>`
        : html`<p class="empty">${this._query ? "No resources match." : "No resources yet. Add a new source and save it to Resources."}</p>`}`;
  }

  _renderNew() {
    const f = this._form;
    const set = (k) => (e) => (this._form = { ...this._form, [k]: e.target.value });
    const preview = this._free.trim() ? esc(this._free.trim()) : formatCitation(this._newParts);
    const div = globalThis.document.createElement("div");
    div.innerHTML = preview;
    return html`<div class="grid">
        <div class="field full"><label for="c-title">Title</label><input id="c-title" .value="${f.title}" @input="${set("title")}" /></div>
        <div class="field"><label for="c-authors">Authors</label><input id="c-authors" .value="${f.authors}" @input="${set("authors")}" placeholder="e.g. William McDonough; Michael Braungart" /></div>
        <div class="field"><label for="c-year">Year</label><input id="c-year" .value="${f.year}" @input="${set("year")}" inputmode="numeric" /></div>
        <div class="field full"><label for="c-url">Link</label><input id="c-url" type="url" .value="${f.url}" @input="${set("url")}" placeholder="https://" /></div>
        <div class="field full"><label for="c-pub">Publisher</label><input id="c-pub" .value="${f.publisher}" @input="${set("publisher")}" /></div>
      </div>
      <p class="hint">Separate authors with a semicolon.</p>
      <p class="or">Or write it yourself</p>
      <textarea aria-label="Citation text" .value="${this._free}" @input="${(e) => (this._free = e.target.value)}" placeholder="Rittel, Horst. “Dilemmas in a General Theory of Planning.” Policy Sciences, 1973: 155–169."></textarea>
      ${preview ? html`<div class="preview" aria-live="polite">${div}</div>` : ""}
      ${!this._free.trim()
        ? html`<label class="check"
            ><input type="checkbox" .checked="${this._save}" @change="${(e) => (this._save = e.target.checked)}" />Also add it to Resources, so other pages can cite it</label
          >`
        : ""}`;
  }

  render() {
    if (!this.open) return html``;
    const body = this._tab === "page" ? this._renderPage() : this._tab === "resources" ? this._renderResources() : this._renderNew();
    return html`
      <div class="backdrop" @click="${() => this._finish(null)}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <h2 id="t">${lucide("oer:quote")}Cite a source</h2>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${() => this._finish(null)}">${lucide("oer:x")}</button>
        </header>
        <div class="tabs" role="tablist" aria-label="Source">
          ${TABS.map(
            (t) => html`<button
              role="tab"
              aria-selected="${this._tab === t.id ? "true" : "false"}"
              @click="${() => {
                this._tab = t.id;
                this._chosen = null;
              }}"
            >
              ${t.label}${t.id === "page" && this._references?.length ? ` (${this._references.length})` : ""}
            </button>`,
          )}
        </div>
        <div class="body" role="tabpanel">${body}</div>
        <footer>
          <button class="btn outline" @click="${() => this._finish(null)}">Cancel</button>
          <button class="btn primary" aria-disabled="${this._canCite ? "false" : "true"}" @click="${this._cite}">Cite</button>
        </footer>
      </div>
    `;
  }
}
customElements.define(OerCiteDialog.tag, OerCiteDialog);

export function citeDialog() {
  const doc = globalThis.document;
  return doc.querySelector(OerCiteDialog.tag) || doc.body.appendChild(doc.createElement(OerCiteDialog.tag));
}
