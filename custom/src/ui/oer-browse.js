/**
 * `oer-browse` — the pages a collection lists (Lessons, Exercises…),
 * opened from its arrow in the sidebar: a filter, then every page A to Z
 * with a line about it; choosing one goes to it. Collections can hold
 * hundreds of pages, so they open here rather than in the sidebar.
 *
 *   browse().show({ parent: id })
 *
 * A native modal dialog: focus stays inside, Esc closes.
 * @element oer-browse
 */
import { html, css, LitElement } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { contentTypes, isHeading } from "../types/content-types.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

const plainText = (s) => String(s || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

class OerBrowse extends LitElement {
  static get tag() {
    return "oer-browse";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      _query: { state: true },
    };
  }

  constructor() {
    super();
    this.open = false;
    this._query = "";
    this._pages = [];
  }

  show({ parent } = {}) {
    const site = toJS(store.manifest?.items) || [];
    const signedIn = !!store.isLoggedIn;
    const visible = (i) => (signedIn || i.metadata?.published !== false) && !i.metadata?.oerSnapshotOf && !isHeading(i) && !i.metadata?.hideInMenu;
    this._parent = site.find((i) => i.id === parent) || null;
    this._types = new Map(contentTypes(site).types.map((t) => [t.id, t]));
    const byParent = new Map();
    for (const i of site) if (visible(i)) byParent.set(i.parent || null, [...(byParent.get(i.parent || null) || []), i]);
    // the pages it lists, A to Z, each with what sits under it for searching
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
    this._pages = (byParent.get(parent) || [])
      .map((i) => ({ item: i, under: (byParent.get(i.id) || []).map((c) => c.title) }))
      .sort((a, b) => collator.compare(a.item.title, b.item.title));
    this._mixed = new Set(this._pages.map((p) => p.item.metadata?.pageType)).size > 1;
    this._query = "";
    this.open = true;
  }

  updated(changed) {
    if (changed.has("open")) {
      const dialog = this.shadowRoot.querySelector("dialog");
      if (this.open && !dialog.open) {
        dialog.showModal();
        this.shadowRoot.querySelector("#filter")?.focus();
      }
      if (!this.open && dialog.open) dialog.close();
    }
  }

  _close() {
    this.open = false;
  }

  _shown() {
    const q = this._query.trim().toLowerCase();
    if (!q) return this._pages;
    return this._pages.filter(({ item, under }) => `${item.title} ${plainText(item.description)} ${under.join(" ")}`.toLowerCase().includes(q));
  }

  // ↓ from the filter into the list, ↑ / ↓ along it
  _keys(e) {
    const links = [...this.shadowRoot.querySelectorAll(".item")];
    const at = links.indexOf(this.shadowRoot.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      links[Math.min(at + 1, links.length - 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (at <= 0) this.shadowRoot.querySelector("#filter")?.focus();
      else links[at - 1]?.focus();
    } else if (e.key === "Enter" && e.target.id === "filter") {
      links[0]?.click();
    }
  }

  render() {
    const shown = this.open ? this._shown() : [];
    const total = this._pages.length;
    const title = this._parent?.title || "Pages";
    return html`<dialog aria-labelledby="t" @close="${() => (this.open = false)}" @click="${(e) => e.target.localName === "dialog" && this._close()}" @keydown="${this._keys}">
      <div class="panel">
        <header>
          <div>
            <h2 id="t">${title}</h2>
            <p class="sub">${shown.length === total ? `${total} page${total === 1 ? "" : "s"}` : `${shown.length} of ${total}`}</p>
          </div>
          <button class="icon-btn" aria-label="Close" @click="${this._close}">${lucide("oer:x")}</button>
        </header>
        <div class="search">
          ${lucide("icons:search")}
          <input id="filter" type="search" placeholder="Filter ${title.toLowerCase()}" aria-label="Filter ${title}" .value="${this._query}" @input="${(e) => (this._query = e.target.value)}" />
        </div>
        <ul class="list" role="list">
          ${shown.map(({ item }) => {
            const type = this._mixed ? this._types.get(item.metadata?.pageType)?.label : "";
            const about = plainText(item.description);
            return html`<li>
              <a class="item" href="${item.slug}" @click="${this._close}">
                <span class="item-title">${item.title}${item.metadata?.published === false ? html`<span class="draft">Draft</span>` : ""}${type ? html`<span class="type">${type}</span>` : ""}</span>
                ${about && about !== item.title ? html`<span class="item-about">${about}</span>` : ""}
              </a>
            </li>`;
          })}
        </ul>
        ${this.open && !shown.length ? html`<p class="empty">Nothing in ${title} matches “${this._query}”.</p>` : ""}
        ${this._parent
          ? html`<footer>
              <a class="all" href="${this._parent.slug}" @click="${this._close}">Open the ${title} page${lucide("oer:chevron-right")}</a>
            </footer>`
          : ""}
      </div>
    </dialog>`;
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      dialog {
        width: min(36rem, calc(100vw - 2rem));
        max-height: min(40rem, calc(100dvh - 2rem));
        padding: 0;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg, 0.75rem);
        background: var(--popover, var(--background));
        color: var(--popover-foreground, var(--foreground));
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        overflow: hidden;
      }
      dialog::backdrop {
        background: rgb(0 0 0 / 0.5);
      }
      .panel {
        display: flex;
        flex-direction: column;
        max-height: min(40rem, calc(100dvh - 2rem));
      }
      button,
      input {
        font: inherit;
        color: inherit;
      }
      :focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: -2px;
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
        gap: 0.75rem;
        padding: 1rem 0.75rem 0.75rem 1.25rem;
      }
      header > div {
        flex: 1;
      }
      h2 {
        margin: 0;
        font-size: 1.0625rem;
        font-weight: 600;
      }
      .sub {
        margin: 0.125rem 0 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .icon-btn {
        all: unset;
        display: inline-grid;
        place-items: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md, 0.5rem);
        cursor: pointer;
        color: var(--muted-foreground);
      }
      .icon-btn:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .search {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0 1.25rem 0.5rem;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md, 0.5rem);
        background: var(--background);
        color: var(--muted-foreground);
      }
      .search:focus-within {
        border-color: var(--ring);
        box-shadow: 0 0 0 3px color-mix(in oklch, var(--ring) 35%, transparent);
      }
      .search input {
        flex: 1;
        min-width: 0;
        border: 0;
        background: none;
        color: var(--foreground);
        outline: none;
      }
      .list {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        margin: 0;
        padding: 0 0.5rem 0.5rem;
        list-style: none;
      }
      .item {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-md, 0.5rem);
        color: inherit;
        text-decoration: none;
      }
      .item:hover,
      .item:focus-visible {
        background: var(--accent);
      }
      .item-title {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.375rem;
        font-size: 0.9375rem;
        font-weight: 500;
      }
      .item-about {
        overflow: hidden;
        font-size: 0.8125rem;
        line-height: 1.4;
        color: var(--muted-foreground);
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .draft,
      .type {
        padding: 0 0.375rem;
        border-radius: 999px;
        font-size: 0.6875rem;
        font-weight: 500;
        color: var(--muted-foreground);
        background: var(--muted);
      }
      .empty {
        margin: 0;
        padding: 0.5rem 1.25rem 1rem;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      footer {
        padding: 0.75rem 1.25rem;
        border-top: 1px solid var(--border);
      }
      .all {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--link, var(--primary));
        text-decoration: none;
      }
      .all:hover {
        text-decoration: underline;
      }
    `;
  }
}

if (!customElements.get(OerBrowse.tag)) customElements.define(OerBrowse.tag, OerBrowse);

export function browse() {
  const doc = globalThis.document;
  return doc.querySelector(OerBrowse.tag) || doc.body.appendChild(doc.createElement(OerBrowse.tag));
}
