/**
 * `oer-site-nav` — the sidebar's page tree (shadcn Sidebar menu), replacing
 * HAX's site-menu so it can carry an "Add page" row at the end of every
 * level for signed-in authors.
 *
 *   ◎ Lessons                 ⌄
 *   │  Animation Principles
 *   │  Lighting
 *   │  + Add page             ← creates a page in Lessons
 *   ◎ Exercises               ›
 *   + Add page                ← creates a top-level page
 *
 * Clicking "Add page" turns the row into a content-type choice (only the
 * types the parent page may contain) and a title field: Enter creates the
 * page there (HAXcms then opens it), Escape cancels. Levels whose type may
 * contain nothing have no "Add page" row. Top-level rows show
 * the page icon; nested rows sit beside a vertical rule. Parents expand and
 * collapse with their chevron; the active page's ancestors open by
 * default, and the open state is remembered per browser.
 * @element oer-site-nav
 */
import { html, css, LitElement } from "../lit.js";
import { store, autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { childrenMap, ancestors, createPage } from "./outline-model.js";
import { allowedChildTypes, contentTypes, isHeading, navIconsOn } from "../types/content-types.js";

const STORAGE_KEY = "oer-site-nav-open";

const lucide = (name) =>
  html`<span class="lucide" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

function readOpen() {
  try {
    return new Set(JSON.parse(globalThis.localStorage.getItem(STORAGE_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

class OerSiteNav extends LitElement {
  static get tag() {
    return "oer-site-nav";
  }

  static get properties() {
    return {
      // authors get the "Add page" rows (set by the theme)
      editable: { type: Boolean, reflect: true },
      // show only the pages under this one (a book's chapters)
      root: { type: String },
      filter: { type: String },
      _items: { state: true },
      _activeId: { state: true },
      _open: { state: true },
      _adding: { state: true }, // parent id (or "root") being added to
      _addType: { state: true },
    };
  }

  constructor() {
    super();
    this.editable = false;
    this._items = [];
    this._activeId = null;
    this._open = readOpen();
    this._adding = null;
    this.__disposers = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.__disposers.push(
      autorun(() => {
        const loggedIn = !!store.isLoggedIn;
        // unpublished pages are listed for authors only
        const items = (toJS(store.manifest?.items) || []).filter((i) => loggedIn || i.metadata?.published !== false);
        const active = toJS(store.activeId);
        Promise.resolve().then(() => {
          this._all = items;
          // headings are hidden from menus (stock themes skip them) but
          // label groups here
          this._items = items.filter((i) => !i.metadata?.hideInMenu || isHeading(i));
          if (active !== this._activeId) {
            this._activeId = active;
            // reveal the active page
            const open = new Set(this._open);
            for (const id of ancestors(items, active)) open.add(id);
            this._setOpen(open);
          }
        });
      }),
    );
  }

  disconnectedCallback() {
    for (const d of this.__disposers) d?.();
    this.__disposers = [];
    super.disconnectedCallback();
  }

  _setOpen(open) {
    this._open = open;
    try {
      globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify([...open]));
    } catch {
      // storage unavailable: open state just isn't remembered
    }
  }

  _toggle(id) {
    const open = new Set(this._open);
    if (open.has(id)) open.delete(id);
    else open.add(id);
    this._setOpen(open);
  }

  // content types allowed under `parent` (and whether untyped is allowed)
  _choices(parent) {
    const all = this._all || [];
    const parentType = parent ? all.find((i) => i.id === parent)?.metadata?.pageType : null;
    const types = allowedChildTypes(parentType || null, all);
    const known = parentType && contentTypes(all).types.find((t) => t.id === parentType);
    const restricted = !!known && Array.isArray(known.children);
    return { types, untyped: !restricted };
  }

  _startAdd(parent) {
    const { types, untyped } = this._choices(parent);
    this._addType = untyped ? "" : types[0]?.id || "";
    this._adding = parent ?? "root";
    this.updateComplete.then(() => this.shadowRoot.querySelector(".add-input")?.focus());
  }

  _addKeys(e, parent) {
    if (e.key === "Enter") {
      e.preventDefault();
      const title = (this.shadowRoot.querySelector(".add-input")?.value || "").trim();
      if (!title) {
        this.shadowRoot.querySelector(".add-input")?.focus();
        return;
      }
      this._adding = null;
      if (title) createPage(title, parent, this._addType);
    } else if (e.key === "Escape") {
      e.preventDefault();
      this._adding = null;
      this.updateComplete.then(() => this.shadowRoot.querySelector(`[data-add="${parent ?? "root"}"]`)?.focus());
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: var(--font-sans, system-ui, sans-serif);
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
      }
      /* shadcn SidebarMenuSub: rule on the left (mx-3.5 px-2.5) */
      ul ul {
        margin: 0.125rem 0 0.25rem 0.875rem;
        padding-left: 0.625rem;
        border-left: 1px solid color-mix(in oklch, var(--foreground) 22%, transparent);
      }
      .row {
        position: relative;
        display: flex;
        align-items: center;
      }
      a,
      .add,
      .add-field {
        box-sizing: border-box;
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 2rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: var(--muted-foreground);
        text-decoration: none;
      }
      ul ul a,
      ul ul .add,
      ul ul .add-field {
        height: 1.75rem;
      }
      .has-kids > .row > a {
        padding-right: 2rem;
      }
      a:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      a[aria-current="page"],
      a[aria-current="location"] {
        background: var(--accent);
        color: var(--foreground);
        font-weight: 500;
      }
      a.draft .title::after {
        content: " · Draft";
        font-weight: 400;
        color: var(--muted-foreground);
      }
      a:focus-visible,
      button:focus-visible,
      input:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: -2px;
      }
      .title {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      simple-icon-lite,
      .no-icon {
        flex: none;
        width: 1rem;
        height: 1rem;
        --simple-icon-height: 1rem;
        --simple-icon-width: 1rem;
        color: var(--muted-foreground);
      }
      .chev {
        all: unset;
        position: absolute;
        right: 0.25rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: var(--radius-sm);
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .chev:hover {
        background: color-mix(in oklch, var(--foreground) 8%, transparent);
        color: var(--foreground);
      }
      .chev .lucide {
        transform: rotate(-90deg);
      }
      .chev[aria-expanded="true"] .lucide {
        transform: none;
      }
      .lucide {
        flex: none;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      /* "Add page" rows */
      .add {
        all: unset;
        box-sizing: border-box;
        flex: 1;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 2rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-md);
        font-size: 0.8125rem;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      ul ul .add {
        height: 1.75rem;
      }
      .add:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      /* outline headings: a label over the pages after them */
      li.heading {
        list-style: none;
      }
      /* group label, after the Decap sidebar's: small, uppercase, tracked.
         Full muted colour (Decap's 60% opacity fails AA at this size) */
      li.heading:not(:first-child) {
        margin-top: 1rem;
      }
      .group-label {
        display: flex;
        align-items: center;
        min-height: 1.5rem;
        padding: 0 0.5rem;
        font-size: 0.6875rem;
        font-weight: 500;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--muted-foreground);
      }

      /* icons off: the Decap sidebar's hierarchy, with text alone doing the
         work. Roomier rows, medium-weight top level, regular sub-pages,
         wider gaps between groups */
      :host([no-icons]) ul {
        gap: 0.25rem;
      }
      :host([no-icons]) a,
      :host([no-icons]) .add {
        height: auto;
        min-height: 2.25rem;
        padding: 0.5rem 0.75rem;
      }
      :host([no-icons]) > ul > li > .row > a {
        font-weight: 500;
      }
      :host([no-icons]) ul ul {
        margin: 0.125rem 0 0.25rem 1rem;
        padding-left: 0.5rem;
      }
      :host([no-icons]) ul ul a,
      :host([no-icons]) ul ul .add {
        min-height: 2rem;
        padding: 0.375rem 0.75rem;
        font-weight: 400;
      }
      :host([no-icons]) ul ul a[aria-current="page"] {
        font-weight: 500;
      }
      :host([no-icons]) .group-label {
        padding: 0 0.75rem;
      }
      /* pages under a heading sit one step in from its label */
      :host([no-icons]) li.grouped {
        margin-left: 0.75rem;
      }
      :host([no-icons]) li.heading:not(:first-child) {
        margin-top: 1.5rem;
      }
      :host([no-icons]) .has-kids > .row > a {
        padding-right: 2rem;
      }
      .none {
        margin: 0.5rem;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .add .lucide {
        width: 0.875rem;
        height: 0.875rem;
      }
      .add-field {
        flex-direction: column;
        align-items: stretch;
        gap: 0.25rem;
        height: auto !important;
        padding: 0.25rem;
      }
      .add-type {
        box-sizing: border-box;
        height: 1.75rem;
        padding: 0 0.375rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        color: var(--foreground);
        font: inherit;
        font-size: 0.8125rem;
      }
      .add-input {
        flex: 1;
        min-width: 0;
        height: 1.75rem;
        box-sizing: border-box;
        padding: 0 0.5rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        color: var(--foreground);
        font: inherit;
        font-size: 0.875rem;
      }
    `;
  }

  // grouped: the list has headings, so a new page lands in the last group
  _renderAdd(parent, grouped = false) {
    if (!this.editable) return "";
    const key = parent ?? "root";
    const { types, untyped } = this._choices(parent);
    if (!types.length && !untyped) return "";
    if (this._adding === key) {
      return html`<li class="add-field ${grouped ? "grouped" : ""}">
        ${types.length
          ? html`<select
              class="add-type"
              aria-label="Content type of the new page"
              @change="${(e) => (this._addType = e.target.value)}"
              @keydown="${(e) => this._addKeys(e, parent)}"
            >
              ${untyped ? html`<option value="" ?selected="${!this._addType}">No type</option>` : ""}
              ${types.map((t) => html`<option value="${t.id}" ?selected="${t.id === this._addType}">${t.label}</option>`)}
            </select>`
          : ""}
        <input
          class="add-input"
          type="text"
          placeholder="Page title, then Enter"
          aria-label="New page title"
          @keydown="${(e) => this._addKeys(e, parent)}"
          @blur="${(e) => {
            // moving to the type choice is not leaving the row
            if (!e.target.value.trim() && !e.relatedTarget?.classList?.contains("add-type")) this._adding = null;
          }}"
        />
      </li>`;
    }
    return html`<li class="row ${grouped ? "grouped" : ""}">
      <button class="add" data-add="${key}" @click="${() => this._startAdd(parent)}">
        ${lucide("oer:plus")}Add page
      </button>
    </li>`;
  }

  _renderLevel(kids, parent, depth) {
    const list = kids.get(parent) || [];
    // items after a heading belong to its group (indented when icons are off)
    let grouped = false;
    return html`<ul role="list">
      ${list.map((item) => {
        if (isHeading(item)) {
          grouped = true;
          return html`<li class="heading"><span class="group-label" role="heading" aria-level="2">${item.title}</span></li>`;
        }
        const children = kids.get(item.id) || [];
        const hasKids = children.length > 0;
        const open = this.__forceOpen || this._open.has(item.id);
        const iconName = item.metadata?.icon;
        return html`<li class="${[hasKids ? "has-kids" : "", grouped ? "grouped" : ""].join(" ")}">
          <div class="row">
            <a
              href="${this._href(item)}"
              class="${item.metadata?.published === false ? "draft" : ""}"
              aria-current="${item.id === this._activeId || item.id === this.__pinnedActive ? "page" : item.id === this.__location ? "location" : "false"}"
            >
              ${depth === 0 && navIconsOn(this._all)
                ? iconName
                  ? html`<simple-icon-lite icon="${iconName}"></simple-icon-lite>`
                  : html`<span class="no-icon"></span>`
                : ""}
              <span class="title">${item.title}</span>
            </a>
            ${hasKids
              ? html`<button
                  class="chev"
                  aria-expanded="${open ? "true" : "false"}"
                  aria-label="${open ? "Collapse" : "Expand"} ${item.title}"
                  @click="${() => this._toggle(item.id)}"
                >
                  ${lucide("oer:chevron-down")}
                </button>`
              : ""}
          </div>
          ${hasKids && open ? this._renderLevel(kids, item.id, depth + 1) : ""}
        </li>`;
      })}
      ${this._renderAdd(parent, list.some(isHeading))}
    </ul>`;
  }

  // an item pinned to a release (outline builder, metadata.oerNavVersion)
  // links to that release's archived copy
  _href(item) {
    const v = item.metadata?.oerNavVersion;
    if (!v) return item.slug;
    const snap = (this._all || []).find((i) => i.metadata?.oerSnapshotOf === item.id && i.metadata?.version === v);
    return snap ? snap.slug : item.slug;
  }

  // types whose pages stay out of the site nav (as Decap lists only its
  // collections): their pages and everything under them
  _navItems() {
    if (this.root) return this._items;
    const hidden = new Set(contentTypes(this._all).types.filter((t) => t.nav === false).map((t) => t.id));
    return hidden.size ? this._items.filter((i) => !hidden.has(i.metadata?.pageType)) : this._items;
  }

  render() {
    // the site's "Icons in navigation" setting switches the layout
    this.toggleAttribute("no-icons", !navIconsOn(this._all));
    let items = this._navItems();
    // a hidden page's nearest listed ancestor marks where the reader is
    const shown = new Set(items.map((i) => i.id));
    const byId = new Map((this._all || []).map((i) => [i.id, i]));
    let here = byId.get(this._activeId);
    while (here && !shown.has(here.id)) here = byId.get(here.parent);
    this.__location = here && here.id !== this._activeId ? here.id : null;
    // an item pinned to a release is the current page on that release
    const active = byId.get(this._activeId);
    if (here && active?.metadata?.oerSnapshotOf === here.id && active.metadata.version === here.metadata?.oerNavVersion) {
      this.__location = null;
      this.__pinnedActive = here.id;
    } else this.__pinnedActive = null;
    const q = (this.filter || "").trim().toLowerCase();
    if (q) {
      // matches plus their ancestors, so the tree still reads
      const byId = new Map(items.map((i) => [i.id, i]));
      const keep = new Set();
      for (const i of items) {
        if (!i.title.toLowerCase().includes(q)) continue;
        for (let cur = i; cur && !keep.has(cur.id); cur = byId.get(cur.parent)) keep.add(cur.id);
      }
      items = items.filter((i) => keep.has(i.id));
      this.__forceOpen = true;
    } else this.__forceOpen = false;
    const kids = childrenMap(items);
    if (q && !items.length) return html`<p class="none">No pages match “${this.filter}”.</p>`;
    return this._renderLevel(kids, this.root || null, 0);
  }
}
customElements.define(OerSiteNav.tag, OerSiteNav);
