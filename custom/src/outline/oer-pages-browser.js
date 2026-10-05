/**
 * `oer-pages-browser` — every page in the site, including the ones the
 * navigation doesn't list: pages removed from the outline, archived
 * versions and linked copies. Authors can open a page, put a page back in
 * the navigation (where it was), or delete it with its sub-pages and
 * archived versions. Pages can be selected (the selection survives search
 * and filters) and appended to the end of the navigation together.
 *
 *   pagesBrowser().show()
 * @element oer-pages-browser
 */
import { html, css, LitElement } from "../lit.js";
import { store, autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { isSystemItem, isHeading, contentTypes } from "../types/content-types.js";
import { saveOutline, deletionSet, ancestors, newItemId } from "./outline-model.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

const FILTERS = [
  { id: "all", label: "All" },
  { id: "hidden", label: "Not in navigation" },
  { id: "versions", label: "Archived versions" },
];

class OerPagesBrowser extends LitElement {
  static get tag() {
    return "oer-pages-browser";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      _filter: { state: true },
      _query: { state: true },
      _confirm: { state: true },
      _busy: { state: true },
      _selected: { state: true },
      _status: { state: true },
    };
  }

  constructor() {
    super();
    this.open = false;
    this._filter = "all";
    this._query = "";
    this._selected = new Set();
    this._status = "";
    this.__keys = (e) => {
      if (!this.open || e.key !== "Escape" || this._busy) return;
      e.preventDefault();
      e.stopPropagation();
      if (this._confirm) this._confirm = null;
      else this._close();
    };
  }

  show(filter = "all") {
    this._filter = filter;
    this._query = "";
    this._confirm = null;
    this._busy = false;
    this._selected = new Set();
    this._status = "";
    this.open = true;
    // follow the manifest while open (saves here and elsewhere replace it)
    this.__stop?.();
    this.__stop = autorun(() => {
      this._list = toJS(store.manifest?.items) || [];
      this.requestUpdate();
    });
    globalThis.addEventListener("keydown", this.__keys, true);
    this.updateComplete.then(() => this.shadowRoot.querySelector("input")?.focus());
  }

  _close() {
    this.open = false;
    this.__stop?.();
    this.__stop = null;
    globalThis.removeEventListener("keydown", this.__keys, true);
  }

  get _items() {
    return this._list || [];
  }

  // why the navigation doesn't list a page ("" when it does)
  _whyHidden(item, byId, hiddenTypes) {
    if (item.metadata?.oerSnapshotOf) return "archived";
    for (let cur = item; cur; cur = byId.get(cur.parent)) {
      if (cur.metadata?.hideInMenu && !isHeading(cur)) return cur === item ? "removed" : "parent";
      if (hiddenTypes.has(cur.metadata?.pageType) && cur === item) return "type";
    }
    return "";
  }

  _go(slug) {
    this._close();
    globalThis.history.pushState({}, "", slug);
    globalThis.dispatchEvent(new PopStateEvent("popstate"));
  }

  async _showInNav(item) {
    this._busy = true;
    const all = this._items.map((i) => (i.id === item.id ? { ...i, metadata: { ...i.metadata, hideInMenu: false }, modified: true } : i));
    await saveOutline(all);
    this._busy = false;
  }

  _toggleSelect(id, on) {
    const next = new Set(this._selected);
    if (on) next.add(id);
    else next.delete(id);
    this._selected = next;
    this._status = "";
  }

  /**
   * Append the selected pages to the end of the top level of the navigation,
   * in the order shown. A page that is out of the navigation moves there
   * itself (with its sub-pages); a page already listed, an archived version
   * or a page of a type the navigation hides gets a link that shows it.
   */
  async _appendSelected(order) {
    const items = this._items;
    const byId = new Map(items.map((i) => [i.id, i]));
    const { types } = contentTypes(items);
    const hiddenTypes = new Set(types.filter((t) => t.nav === false).map((t) => t.id));
    let next = Math.max(-1, ...items.filter((i) => !i.parent).map((i) => Number(i.order) || 0)) + 1;
    const changed = new Map();
    const added = [];
    for (const item of order) {
      const why = this._whyHidden(item, byId, hiddenTypes);
      if (why === "removed" || why === "parent") {
        changed.set(item.id, { ...item, parent: null, order: next++, indent: 0, metadata: { ...item.metadata, hideInMenu: false }, modified: true });
        continue;
      }
      const snapOf = item.metadata?.oerSnapshotOf;
      const ref = snapOf ? { page: snapOf, version: item.metadata.version || "" } : item.metadata?.oerRef?.page ? item.metadata.oerRef : { page: item.id, version: "" };
      const source = byId.get(ref.page) || item;
      const type = source.metadata?.pageType || "";
      added.push({
        id: newItemId(),
        title: source.title,
        parent: null,
        order: next++,
        indent: 0,
        location: "",
        description: "",
        metadata: {
          ...(source.metadata?.icon ? { icon: source.metadata.icon } : {}),
          // a type the navigation hides would hide the link too
          ...(type && !hiddenTypes.has(type) ? { pageType: type } : {}),
          oerRef: ref,
        },
        contents: `<oer-include page="${ref.page}"${ref.version ? ` version="${ref.version}"` : ""}></oer-include>`,
        new: true,
      });
    }
    this._busy = true;
    await saveOutline([...items.map((i) => changed.get(i.id) || i), ...added]);
    this._busy = false;
    const n = order.length;
    this._selected = new Set();
    this._status = `Appended ${n} page${n === 1 ? "" : "s"} to the navigation.`;
  }

  async _delete(ids) {
    this._busy = true;
    // HAX reload-loops on the URL of a page that no longer exists
    if (ids.has(store.activeId)) {
      globalThis.history.pushState({}, "", store.homeLink || "./");
      globalThis.dispatchEvent(new PopStateEvent("popstate"));
    }
    await saveOutline(this._items.map((i) => (ids.has(i.id) ? { ...i, delete: true } : i)));
    this._selected = new Set([...this._selected].filter((id) => !ids.has(id)));
    this._confirm = null;
    this._busy = false;
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
        height: min(44rem, calc(100dvh - 2rem));
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        overflow: hidden;
      }
      button,
      input {
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
      .tools {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      .search {
        flex: 1 1 12rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 2.25rem;
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
      .seg {
        display: inline-flex;
        padding: 0.1875rem;
        border-radius: var(--radius-md);
        background: var(--muted);
      }
      .seg button {
        all: unset;
        padding: 0.25rem 0.625rem;
        border-radius: calc(var(--radius-md) - 2px);
        font-size: 0.8125rem;
        font-weight: 500;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .seg button[aria-pressed="true"] {
        background: var(--background);
        color: var(--foreground);
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
      }
      .seg button:focus-visible {
        outline: 2px solid var(--ring);
      }
      .body {
        flex: 1;
        overflow-y: auto;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      li {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.25rem 0.75rem;
        padding: 0.625rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      li.selected {
        background: color-mix(in srgb, var(--primary) 6%, transparent);
      }
      .pick {
        flex: none;
        width: 1rem;
        height: 1rem;
        margin: 0;
        accent-color: var(--primary);
        cursor: pointer;
      }
      .selbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1.25rem;
        border-bottom: 1px solid var(--border);
        font-size: 0.8125rem;
        background: color-mix(in srgb, var(--muted) 50%, transparent);
      }
      .selbar .count {
        flex: 1;
        color: var(--muted-foreground);
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .main {
        flex: 1 1 16rem;
        min-width: 0;
      }
      .title {
        all: unset;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      .title:hover {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .path {
        margin: 0.125rem 0 0;
        font-size: 0.75rem;
        color: var(--muted-foreground);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .badges {
        display: inline-flex;
        flex-wrap: wrap;
        gap: 0.25rem;
        margin-left: 0.375rem;
        vertical-align: 1px;
      }
      .badge {
        padding: 0 0.4375rem;
        border-radius: 999px;
        font-size: 0.6875rem;
        font-weight: 500;
        line-height: 1.125rem;
        border: 1px solid var(--border);
        color: var(--muted-foreground);
      }
      .badge.hi {
        border-color: transparent;
        color: var(--primary);
        background: color-mix(in srgb, var(--primary) 10%, transparent);
      }
      .actions {
        display: inline-flex;
        gap: 0.25rem;
      }
      .btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.875rem;
        padding: 0 0.625rem;
        border-radius: var(--radius-md);
        font-size: 0.8125rem;
        font-weight: 500;
        cursor: pointer;
      }
      .btn:focus-visible {
        outline: 2px solid var(--ring);
      }
      .btn.outline {
        border: 1px solid var(--input-border, var(--border));
      }
      .btn.outline:hover,
      .btn.ghost:hover {
        background: var(--accent);
      }
      .btn.ghost.danger {
        color: var(--destructive);
      }
      .btn.destructive {
        background: var(--destructive);
        color: var(--destructive-foreground, #fff);
      }
      .btn[aria-disabled="true"] {
        opacity: 0.5;
        cursor: default;
      }
      .confirm {
        flex-basis: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        padding: 0.625rem 0.75rem;
        border-radius: var(--radius-md);
        background: color-mix(in srgb, var(--destructive) 8%, transparent);
        font-size: 0.8125rem;
      }
      .confirm span {
        flex: 1 1 14rem;
      }
      .empty {
        padding: 2.5rem 1.25rem;
        text-align: center;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      footer {
        padding: 0.625rem 1.25rem;
        border-top: 1px solid var(--border);
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
    `;
  }

  _renderRow(item, ctx) {
    const { byId, hiddenTypes, types, items } = ctx;
    const why = this._whyHidden(item, byId, hiddenTypes);
    const snapOf = item.metadata?.oerSnapshotOf ? byId.get(item.metadata.oerSnapshotOf) : null;
    const linkOf = item.metadata?.oerRef?.page ? byId.get(item.metadata.oerRef.page) : null;
    const type = types.find((t) => t.id === item.metadata?.pageType);
    const path = ancestors(items, item.id)
      .reverse()
      .map((id) => byId.get(id)?.title)
      .filter(Boolean)
      .join(" › ");
    const title = snapOf ? `${item.metadata?.oerSnapshotTitle || snapOf.title} v${item.metadata.version}` : item.title;
    const confirming = this._confirm === item.id;
    const busy = this._busy ? "true" : "false";
    let doomed = null;
    if (confirming) doomed = deletionSet(items, [item.id]);
    const extra = doomed ? doomed.size - 1 : 0;
    const links = doomed ? items.filter((i) => !doomed.has(i.id) && doomed.has(i.metadata?.oerRef?.page)).length : 0;
    const checked = this._selected.has(item.id);
    return html`<li class="${checked ? "selected" : ""}">
      <input type="checkbox" class="pick" aria-label="Select ${title}" .checked="${checked}" @change="${(e) => this._toggleSelect(item.id, e.target.checked)}" />
      <div class="main">
        <button class="title" @click="${() => this._go(item.slug)}">${title}</button>
        <span class="badges">
          ${type ? html`<span class="badge">${type.label}</span>` : ""}
          ${why === "removed" ? html`<span class="badge hi">Not in navigation</span>` : ""}
          ${why === "parent" ? html`<span class="badge">Under a page not in navigation</span>` : ""}
          ${why === "type" ? html`<span class="badge">Type not listed in navigation</span>` : ""}
          ${snapOf ? html`<span class="badge">Archived version</span>` : ""}
          ${linkOf ? html`<span class="badge">Shows “${linkOf.title}”${item.metadata.oerRef.version ? ` v${item.metadata.oerRef.version}` : ""}</span>` : ""}
          ${item.metadata?.published === false ? html`<span class="badge">Draft</span>` : ""}
        </span>
        <p class="path">${path || "Top level"}</p>
      </div>
      <div class="actions">
        ${why === "removed"
          ? html`<button class="btn outline" aria-disabled="${busy}" @click="${() => !this._busy && this._showInNav(item)}">
              ${lucide("oer:eye", "sm")}Show in navigation
            </button>`
          : ""}
        <button class="btn ghost danger" aria-label="Delete ${title}" title="Delete" aria-disabled="${busy}" @click="${() => !this._busy && (this._confirm = item.id)}">
          ${lucide("oer:trash-2", "sm")}
        </button>
      </div>
      ${confirming
        ? html`<div class="confirm" role="alert">
            <span
              >Delete “${title}”${extra ? ` and ${extra} sub-page${extra === 1 ? "" : "s"} or archived version${extra === 1 ? "" : "s"}` : ""}?
              ${links ? `${links} link${links === 1 ? "" : "s"} to ${extra ? "them" : "it"} will break. ` : ""}This can't be undone here.</span
            >
            <button class="btn outline" @click="${() => (this._confirm = null)}">Cancel</button>
            <button class="btn destructive" aria-disabled="${busy}" @click="${() => !this._busy && this._delete(doomed)}">
              ${this._busy ? "Deleting…" : "Delete"}
            </button>
          </div>`
        : ""}
    </li>`;
  }

  _renderSelectionBar(pages, shown) {
    const n = this._selected.size;
    const shownSelected = shown.filter((i) => this._selected.has(i.id)).length;
    const allShown = shown.length > 0 && shownSelected === shown.length;
    const offscreen = n - shownSelected;
    const byTitle = (a, b) => (a.metadata?.oerSnapshotTitle || a.title).localeCompare(b.metadata?.oerSnapshotTitle || b.title);
    const busy = this._busy ? "true" : "false";
    return html`<div class="selbar">
      <input
        type="checkbox"
        class="pick"
        aria-label="Select all shown"
        title="Select all shown"
        .checked="${allShown}"
        .indeterminate="${shownSelected > 0 && !allShown}"
        @change="${(e) => {
          const next = new Set(this._selected);
          for (const i of shown) e.target.checked ? next.add(i.id) : next.delete(i.id);
          this._selected = next;
          this._status = "";
        }}"
      />
      <span class="count" aria-live="polite">
        ${this._status || (n ? `${n} selected${offscreen ? ` (${offscreen} not shown)` : ""}` : "Select pages to append them to the navigation.")}
      </span>
      ${n
        ? html`<button class="btn ghost" @click="${() => (this._selected = new Set())}">Clear</button>
            <button
              class="btn primary"
              aria-disabled="${busy}"
              @click="${() => !this._busy && this._appendSelected(pages.filter((i) => this._selected.has(i.id)).sort(byTitle))}"
            >
              ${lucide("oer:plus", "sm")}${this._busy ? "Appending…" : "Append to navigation"}
            </button>`
        : ""}
    </div>`;
  }

  render() {
    if (!this.open) return html``;
    const items = this._items;
    const byId = new Map(items.map((i) => [i.id, i]));
    const { types } = contentTypes(items);
    const hiddenTypes = new Set(types.filter((t) => t.nav === false).map((t) => t.id));
    const ctx = { byId, hiddenTypes, types, items };
    const pages = items.filter((i) => !isSystemItem(i) && !isHeading(i));
    const q = this._query.trim().toLowerCase();
    const shown = pages
      .filter((i) => {
        const why = this._whyHidden(i, byId, hiddenTypes);
        if (this._filter === "hidden") return why === "removed" || why === "parent";
        if (this._filter === "versions") return why === "archived";
        return true;
      })
      .filter((i) => !q || i.title.toLowerCase().includes(q) || `${i.metadata?.oerSnapshotTitle || ""} v${i.metadata?.version || ""}`.toLowerCase().includes(q))
      .sort((a, b) => (a.metadata?.oerSnapshotTitle || a.title).localeCompare(b.metadata?.oerSnapshotTitle || b.title));
    return html`
      <div class="backdrop" @click="${() => !this._busy && this._close()}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${lucide("oer:files")}Browse pages</h2>
            <p class="sub">Every page in the site, including pages the navigation doesn't list.</p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._close}">${lucide("oer:x")}</button>
        </header>
        <div class="tools">
          <label class="search">
            ${lucide("icons:search", "sm")}
            <input type="search" placeholder="Search pages" aria-label="Search pages" .value="${this._query}" @input="${(e) => (this._query = e.target.value)}" />
          </label>
          <div class="seg" role="group" aria-label="Show">
            ${FILTERS.map(
              (f) => html`<button aria-pressed="${this._filter === f.id ? "true" : "false"}" @click="${() => (this._filter = f.id)}">${f.label}</button>`,
            )}
          </div>
        </div>
        ${this._renderSelectionBar(pages, shown)}
        <div class="body">
          ${shown.length
            ? html`<ul aria-label="Pages">
                ${shown.map((i) => this._renderRow(i, ctx))}
              </ul>`
            : html`<p class="empty">${q ? "No pages match." : this._filter === "hidden" ? "Every page is in the navigation." : this._filter === "versions" ? "No archived versions yet." : "No pages yet."}</p>`}
        </div>
        <footer>${shown.length} of ${pages.length} pages. To put a page somewhere specific, use Add existing in the outline builder.</footer>
      </div>
    `;
  }
}
customElements.define(OerPagesBrowser.tag, OerPagesBrowser);

export function pagesBrowser() {
  const doc = globalThis.document;
  return doc.querySelector(OerPagesBrowser.tag) || doc.body.appendChild(doc.createElement(OerPagesBrowser.tag));
}
