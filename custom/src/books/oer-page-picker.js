/**
 * `oer-page-picker` — choose an existing page to reuse (learning-materials-
 * decapcms' outline "Add existing" content picker): search by title,
 * filter by type, pick the latest content or a released version, and
 * optionally bring in its sub-pages too.
 *
 *   const choice = await pagePicker().pick({ exclude: [ids] });
 *   // { page, version, withChildren } or null
 * @element oer-page-picker
 */
import { html, css, LitElement } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { contentTypes, isSystemItem } from "../types/content-types.js";
import { versionsOf, isSnapshot } from "../versions/versioning.js";
import { formControls } from "../ui/form-controls.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

class OerPagePicker extends LitElement {
  static get tag() {
    return "oer-page-picker";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      _q: { state: true },
      _type: { state: true },
      _versions: { state: true },
      _children: { state: true },
    };
  }

  constructor() {
    super();
    this.open = false;
    this._q = "";
    this._type = "";
    this._versions = {};
    this._children = false;
    this.__keys = (e) => {
      if (this.open && e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        this._done(null);
      }
    };
  }

  /**
   * types: limit to these content type ids; children: offer "Also add its
   * sub-pages"; title: dialog heading; hint: the line under it; action: the
   * button's word ("Add", or "Choose" when picking a page to point at);
   * versions: offer a released version of each page.
   */
  pick({ exclude = [], types = null, children = true, title = "Add an existing page", hint = null, action = "Add", versions = true } = {}) {
    this._action = action;
    this._offerVersions = versions;
    this._exclude = new Set(exclude);
    this._only = types && types.length ? new Set(types) : null;
    this._offerChildren = children;
    this._title = title;
    this._hint = hint;
    this._q = "";
    this._type = "";
    this._versions = {};
    this._children = false;
    this.open = true;
    globalThis.addEventListener("keydown", this.__keys, true);
    this.updateComplete.then(() => this.shadowRoot.querySelector("input")?.focus());
    return new Promise((resolve) => (this.__resolve = resolve));
  }

  _done(value) {
    this.open = false;
    globalThis.removeEventListener("keydown", this.__keys, true);
    this.__resolve?.(value);
    this.__resolve = null;
  }

  get _items() {
    return (toJS(store.manifest?.items) || []).filter(
      (i) => !isSystemItem(i) && !isSnapshot(i) && !this._exclude?.has(i.id) && (!this._only || this._only.has(i.metadata?.pageType)),
    );
  }

  static get styles() {
    return [formControls, css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10010;
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
        background: rgb(0 0 0 / 0.35);
      }
      .box {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        width: min(40rem, calc(100vw - 2rem));
        max-height: min(40rem, calc(100dvh - 2rem));
        padding: 1.25rem;
        box-sizing: border-box;
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 8px 24px rgb(0 0 0 / 0.18);
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
      h2 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
      }
      .sub {
        margin: -0.5rem 0 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .bar {
        display: flex;
        gap: 0.5rem;
      }
      .search {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        color: var(--muted-foreground);
      }
      .search input {
        flex: 1;
        min-width: 0;
        border: 0;
        outline: none;
        background: transparent;
        color: var(--foreground);
        font-size: 0.875rem;
      }
      select {
        height: 2.25rem;
        padding: 0 0.5rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        font-size: 0.875rem;
      }
      ul {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        list-style: none;
        margin: 0;
        padding: 0;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
      }
      li {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        padding: 0.5rem 0.75rem;
        --simple-icon-height: 1rem;
        --simple-icon-width: 1rem;
      }
      li + li {
        border-top: 1px solid var(--border);
      }
      .info {
        flex: 1;
        min-width: 0;
      }
      .title {
        font-size: 0.875rem;
        font-weight: 500;
      }
      .meta {
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      li select {
        height: 2rem;
        font-size: 0.8125rem;
      }
      .ver {
        font-size: 0.75rem;
        color: var(--muted-foreground);
        white-space: nowrap;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
      }
      .add {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        height: 2rem;
        padding: 0 0.75rem;
        border-radius: var(--radius-md);
        background: var(--primary);
        color: var(--primary-foreground);
        font-size: 0.8125rem;
        font-weight: 500;
        cursor: pointer;
      }
      .empty {
        padding: 2rem;
        text-align: center;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      .foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        font-size: 0.875rem;
      }
      .foot label {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
      }
      input[type="checkbox"] {
        accent-color: var(--primary);
      }
      .cancel {
        all: unset;
        height: 2.25rem;
        padding: 0 1rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        font-weight: 500;
        cursor: pointer;
      }
    `];
  }

  render() {
    if (!this.open) return html``;
    const types = contentTypes().types.filter((t) => !this._only || this._only.has(t.id));
    const q = this._q.trim().toLowerCase();
    const all = toJS(store.manifest?.items) || [];
    const byId = new Map(all.map((i) => [i.id, i]));
    const results = this._items
      .filter((i) => (!this._type || i.metadata?.pageType === this._type) && (!q || i.title.toLowerCase().includes(q)))
      .sort((a, b) => a.title.localeCompare(b.title))
      .slice(0, 60);
    return html`
      <div class="backdrop" @click="${() => this._done(null)}"></div>
      <div class="box" role="dialog" aria-modal="true" aria-labelledby="t">
        <h2 id="t">${this._title}</h2>
        <p class="sub">${this._hint ?? "It is shown here, not copied: changes to the original appear here, unless you pin a released version."}</p>
        <div class="bar">
          <label class="search">${lucide("icons:search")}<input type="search" placeholder="Search pages…" aria-label="Search pages" .value="${this._q}" @input="${(e) => (this._q = e.target.value)}" /></label>
          <select aria-label="Content type" @change="${(e) => (this._type = e.target.value)}">
            <option value="">All types</option>
            ${types.map((t) => html`<option value="${t.id}">${t.label}</option>`)}
          </select>
        </div>
        ${results.length
          ? html`<ul aria-label="Pages">
              ${results.map((i) => {
                const type = types.find((t) => t.id === i.metadata?.pageType);
                // only versions with a frozen snapshot can be pinned; the
                // current one is what "Latest" shows
                const releases = versionsOf(i.id, all).filter((r) => r.snapshot);
                const parent = byId.get(i.parent);
                return html`<li>
                  ${type?.icon ? html`<simple-icon-lite icon="${type.icon}"></simple-icon-lite>` : lucide("lrn:page")}
                  <div class="info">
                    <div class="title">${i.title}</div>
                    <div class="meta">${[type?.label, i.metadata?.oerFields?.institution, i.metadata?.oerFields?.campus, parent ? `in ${parent.title}` : ""].filter(Boolean).join(" · ")}</div>
                  </div>
                  ${releases.length && this._offerVersions !== false
                    ? html`<select aria-label="Version of ${i.title}" @change="${(e) => (this._versions = { ...this._versions, [i.id]: e.target.value })}">
                        <option value="">Latest${i.metadata?.version ? ` (v${i.metadata.version})` : ""}</option>
                        ${releases.map((r) => html`<option value="${r.version}">v${r.version}</option>`)}
                      </select>`
                    : i.metadata?.version
                      ? html`<span class="ver">v${i.metadata.version}</span>`
                      : ""}
                  <button class="add" @click="${() => this._done({ page: i, version: this._versions[i.id] || "", withChildren: this._children })}">
                    ${this._action === "Add" ? lucide("oer:plus", "sm") : ""}${this._action || "Add"}<span class="sr"> ${i.title}</span>
                  </button>
                </li>`;
              })}
            </ul>`
          : html`<div class="empty">No pages match.</div>`}
        <div class="foot">
          ${this._offerChildren
            ? html`<label><input type="checkbox" .checked="${this._children}" @change="${(e) => (this._children = e.target.checked)}" />Also add its sub-pages</label>`
            : html`<span></span>`}
          <button class="cancel" @click="${() => this._done(null)}">Cancel</button>
        </div>
      </div>
    `;
  }
}
customElements.define(OerPagePicker.tag, OerPagePicker);

export function pagePicker() {
  const doc = globalThis.document;
  return doc.querySelector(OerPagePicker.tag) || doc.body.appendChild(doc.createElement(OerPagePicker.tag));
}
