/**
 * `oer-collection` — a logic-based view of the site's pages, placed on any
 * page: "all Lessons", "this pathway's modules", "every exercise under this
 * course". A port of learning-materials-decapcms' CollectionListing (table)
 * plus a card grid and the module outline used by its lesson and pathway
 * layouts.
 *
 * What it shows (block settings): content types, scope (whole site / this
 * page's sub-pages / everything under this page), view (table / cards /
 * outline), default sort, page size, and whether readers may switch view,
 * search and filter.
 *
 * Readers get (table and cards): search over title, description, tags and
 * text fields; a filter for every choice field with 2+ values and for
 * tags; removable active-filter chips with "N of M"; sortable columns;
 * group by type or any choice field; a column picker; pagination. Their
 * choices are remembered per browser, as in the Decap site.
 *
 * Data comes from the site outline: title, description, tags, image and
 * each page's content-type fields (metadata.oerFields).
 * @element oer-collection
 */
import { html, css, LitElement } from "../lit.js";
import { store, autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { registerBlocks } from "./register.js";
import { contentTypes, isSystemItem } from "../types/content-types.js";
import { childrenMap } from "../outline/outline-model.js";
import { resolveLinks } from "../types/relations.js";
import { sortLevels, levelChip, inDevelopmentBadge, pathwayChipStyles, PATHWAY_TYPE } from "../pathways/pathway-model.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

const VIEWS = { table: "Table", cards: "Cards", outline: "Outline (modules)", pathways: "Pathways (start here, next, in development)" };
const SCOPES = { site: "Whole site", children: "This page's sub-pages", descendants: "Everything under this page" };
const SORTS = { title: "Title", updated: "Recently updated", created: "Newest", order: "Outline order" };
const DIFFICULTY_ORDER = ["beginner", "intermediate", "advanced"];

const toList = (v) => (Array.isArray(v) ? v : typeof v === "string" && v ? v.split(",").map((s) => s.trim()).filter(Boolean) : []);
const toFiles = (v) => (Array.isArray(v) ? v : []).filter((f) => f && (f.url || f.title));
const fileName = (url) => String(url).split(/[?#]/)[0].split("/").pop();

function readStore(key) {
  try {
    return JSON.parse(globalThis.localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}
function writeStore(key, value) {
  try {
    globalThis.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable: choices just aren't remembered
  }
}

export class OerCollection extends LitElement {
  static get tag() {
    return "oer-collection";
  }

  static get properties() {
    return {
      heading: { type: String, reflect: true },
      types: { type: String, reflect: true }, // comma-separated type ids; empty = any typed page
      scope: { type: String, reflect: true },
      view: { type: String, reflect: true },
      sort: { type: String, reflect: true },
      perPage: { type: Number, attribute: "per-page", reflect: true },
      controls: { type: String, reflect: true }, // "full" | "none"
    };
  }

  constructor() {
    super();
    this.scope = "site";
    this.view = "table";
    this.sort = "title";
    this.perPage = 20;
    this.controls = "full";
    this._items = [];
    this._defs = [];
    this._state = { q: "", filters: {}, tags: [], sortKey: null, sortDir: 1, groupBy: "", page: 1, view: null, hidden: [] };
    this._columnsOpen = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.__dispose = autorun(() => {
      const items = toJS(store.manifest?.items) || [];
      const active = toJS(store.activeId);
      Promise.resolve().then(() => {
        this._all = items;
        this._defs = contentTypes(items).types;
        this._pageId = this._ownerPageId(items, active);
        this._items = this._select(items);
        this._restore();
      });
    });
  }

  disconnectedCallback() {
    this.__dispose?.();
    super.disconnectedCallback();
  }

  updated(changed) {
    if (["types", "scope", "sort"].some((k) => changed.has(k)) && this._all) this._items = this._select(this._all);
  }

  // the page this block sits on (the active page while it is displayed)
  _ownerPageId(items, active) {
    return active || null;
  }

  get _storageKey() {
    const index = [...(this.parentNode?.querySelectorAll?.("oer-collection") || [])].indexOf(this);
    return `oer-collection:${this._pageId || "site"}:${index}`;
  }

  _restore() {
    if (this.__restored === this._storageKey) return;
    this.__restored = this._storageKey;
    const saved = readStore(this._storageKey);
    if (saved) this._state = { ...this._state, ...saved, page: 1 };
  }

  _setState(patch) {
    this._state = { ...this._state, ...patch };
    const { q, filters, tags, sortKey, sortDir, groupBy, view, hidden } = this._state;
    writeStore(this._storageKey, { q, filters, tags, sortKey, sortDir, groupBy, view, hidden });
  }

  /* ---------- data ---------- */

  get _typeIds() {
    return toList(this.types);
  }

  _select(all) {
    const wanted = new Set(this._typeIds);
    // configuration and frozen version snapshots are never listed
    let pool = all.filter((i) => !isSystemItem(i) && !i.metadata?.oerSnapshotOf && !i.metadata?.hideInMenu);
    // readers do not see drafts
    if (!store.isLoggedIn) pool = pool.filter((i) => i.metadata?.published !== false);
    // site-wide, a book's linked chapter is a copy of a page already listed
    if (this.scope === "site") pool = pool.filter((i) => !i.metadata?.oerRef?.page);
    if (this.scope !== "site" && this._pageId) {
      if (this.scope === "children") pool = pool.filter((i) => i.parent === this._pageId);
      else {
        const kids = childrenMap(all);
        const under = new Set();
        const walk = (id) => (kids.get(id) || []).forEach((c) => (under.add(c.id), walk(c.id)));
        walk(this._pageId);
        pool = pool.filter((i) => under.has(i.id));
      }
    }
    if (wanted.size) pool = pool.filter((i) => wanted.has(i.metadata?.pageType));
    else if (this.view === "pathways") pool = pool.filter((i) => i.metadata?.pageType === PATHWAY_TYPE);
    else if (this.view !== "outline" && this.scope === "site") pool = pool.filter((i) => i.metadata?.pageType);
    return pool;
  }

  _type(item) {
    return this._defs.find((t) => t.id === item.metadata?.pageType) || null;
  }

  _value(item, name) {
    if (name === "tags") return toList(item.metadata?.tags);
    return item.metadata?.oerFields?.[name];
  }

  // a field value as words: linked page titles, file titles, choice labels
  _plain(value, field = null) {
    if (field?.kind === "people" || (value && typeof value === "object" && "name" in value)) return toList(value).map((p) => (typeof p === "object" ? p.name : p)).filter(Boolean).join(", ");
    if (Array.isArray(value)) return value.map((v) => this._plain(v, field)).filter(Boolean).join(", ");
    if (value && typeof value === "object") {
      if (value.page) return resolveLinks([value], this._all || [])[0]?.item?.title || "";
      return value.title || value.url || "";
    }
    return value == null ? "" : String(this._label(field, value));
  }

  _image(item) {
    const f = item.metadata?.oerFields || {};
    return f.image || f.coverImage || item.metadata?.image || "";
  }

  // fields shared by the shown types, by name (first definition wins)
  get _fields() {
    const ids = this._typeIds.length ? this._typeIds : [...new Set(this._items.map((i) => i.metadata?.pageType).filter(Boolean))];
    const out = new Map();
    for (const id of ids) {
      for (const f of this._defs.find((t) => t.id === id)?.fields || []) if (!out.has(f.name)) out.set(f.name, f);
    }
    return [...out.values()];
  }

  // choice fields with 2+ values among the items: offered as filters
  get _filterFields() {
    return this._fields.filter((f) => (f.kind === "select" || f.kind === "list") && this._distinct(f.name).length > 1 && f.name !== "learningObjectives");
  }

  _distinct(name) {
    const set = new Set();
    for (const i of this._items) for (const v of toList(this._value(i, name))) set.add(v);
    if (name === "difficulty") return [...set].sort((a, b) => DIFFICULTY_ORDER.indexOf(String(a).toLowerCase()) - DIFFICULTY_ORDER.indexOf(String(b).toLowerCase()));
    return [...set].sort((a, b) => String(a).localeCompare(String(b)));
  }

  _label(field, value) {
    return (field?.options || []).find((o) => o.value === value)?.label || value;
  }

  // columns: image, title, type (when mixed), tags, header fields
  get _columns() {
    const cols = [];
    if (this._items.some((i) => this._image(i))) cols.push({ key: "image", label: "Image" });
    cols.push({ key: "title", label: "Title", fixed: true, sortable: true });
    if (new Set(this._items.map((i) => i.metadata?.pageType)).size > 1) cols.push({ key: "type", label: "Type", sortable: true });
    if (this._distinct("tags").length) cols.push({ key: "tags", label: "Tags" });
    for (const f of this._fields) {
      if (!f.header || f.kind === "list" || f.kind === "longtext" || f.kind === "image") continue;
      if (!this._items.some((i) => this._value(i, f.name) !== undefined && this._value(i, f.name) !== "")) continue;
      cols.push({ key: f.name, label: f.label, field: f, sortable: f.kind !== "relation" && f.kind !== "files" });
    }
    return cols;
  }

  get _filtered() {
    const { q, filters, tags } = this._state;
    const needle = q.trim().toLowerCase();
    return this._items.filter((i) => {
      if (needle) {
        const hay = [i.title, i.description, ...toList(i.metadata?.tags), ...Object.values(i.metadata?.oerFields || {}).map((v) => this._plain(v))].join(" ").toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      for (const [name, value] of Object.entries(filters)) {
        if (value && !toList(this._value(i, name)).includes(value)) return false;
      }
      if (tags.length && !toList(i.metadata?.tags).some((t) => tags.includes(t))) return false;
      return true;
    });
  }

  _sorted(list) {
    const key = this._state.sortKey || this.sort || "title";
    const dir = this._state.sortDir || 1;
    const order = new Map(this._all.map((i, n) => [i.id, n]));
    const val = (i) => {
      if (key === "title") return i.title || "";
      if (key === "type") return this._type(i)?.label || "";
      if (key === "updated") return -(i.metadata?.updated || 0);
      if (key === "created") return -(i.metadata?.created || 0);
      if (key === "order") return Number(i.order) || 0;
      if (key === "difficulty") {
        const n = DIFFICULTY_ORDER.indexOf(String(this._value(i, key) || "").toLowerCase());
        return n < 0 ? 99 : n;
      }
      return this._plain(this._value(i, key));
    };
    return [...list].sort((a, b) => {
      const x = val(a);
      const y = val(b);
      const c = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y), undefined, { numeric: true });
      return (c || order.get(a.id) - order.get(b.id)) * dir;
    });
  }

  _groups(list) {
    const by = this._state.groupBy;
    if (!by) return [{ key: "", items: list }];
    const map = new Map();
    for (const i of list) {
      const keys = by === "type" ? [this._type(i)?.label || "No type"] : toList(this._value(i, by));
      for (const k of keys.length ? keys : ["—"]) {
        if (!map.has(k)) map.set(k, []);
        map.get(k).push(i);
      }
    }
    return [...map.entries()].map(([key, items]) => ({ key, items }));
  }

  /* ---------- actions ---------- */

  _toggleSort(key) {
    const { sortKey, sortDir } = this._state;
    const current = sortKey || this.sort;
    this._setState({ sortKey: key, sortDir: current === key ? -sortDir : 1, page: 1 });
  }

  _setFilter(name, value) {
    const filters = { ...this._state.filters };
    if (filters[name] === value || !value) delete filters[name];
    else filters[name] = value;
    this._setState({ filters, page: 1 });
  }

  _toggleTag(tag) {
    const tags = this._state.tags.includes(tag) ? this._state.tags.filter((t) => t !== tag) : [...this._state.tags, tag];
    this._setState({ tags, page: 1 });
  }

  _clear() {
    this._setState({ q: "", filters: {}, tags: [], page: 1 });
  }

  _go(item) {
    // let HAXcms's router handle it like any internal link
    globalThis.history.pushState({}, "", item.slug);
    globalThis.dispatchEvent(new PopStateEvent("popstate"));
  }

  /* ---------- render ---------- */

  static get styles() {
    return [pathwayChipStyles, css`
      :host {
        display: block;
        text-align: start;
        margin: 2rem 0;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground, #111);
      }
      button,
      input,
      select {
        font: inherit;
        color: inherit;
      }
      :focus-visible {
        outline: 2px solid var(--ring, #2563eb);
        outline-offset: 1px;
      }
      :host([data-hax-ray]) a {
        pointer-events: none;
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
      .xs {
        width: 0.75rem;
        height: 0.75rem;
      }
      h2.heading {
        margin: 0 0 1rem;
        font-size: 1.5rem;
        font-weight: 700;
        letter-spacing: -0.02em;
      }
      .bar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }
      .search {
        flex: 1 1 14rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border, #ddd));
        border-radius: var(--radius-md, 0.5rem);
        background: var(--background, #fff);
        color: var(--muted-foreground, #555);
      }
      .search:focus-within {
        outline: 2px solid var(--ring, #2563eb);
        outline-offset: 1px;
      }
      .search input {
        flex: 1;
        min-width: 0;
        border: 0;
        outline: none;
        background: transparent;
        color: var(--foreground, #111);
        font-size: 0.875rem;
      }
      select.filter {
        height: 2.25rem;
        padding: 0 2rem 0 0.75rem;
        border: 1px solid var(--input-border, var(--border, #ddd));
        border-radius: var(--radius-md, 0.5rem);
        background: var(--background, #fff);
        font-size: 0.875rem;
      }
      .btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border, #ddd));
        border-radius: var(--radius-md, 0.5rem);
        background: var(--background, #fff);
        font-size: 0.875rem;
        cursor: pointer;
        white-space: nowrap;
      }
      .btn:hover {
        background: var(--accent, #f4f4f5);
      }
      .seg {
        display: inline-flex;
        padding: 0.1875rem;
        gap: 0.125rem;
        border-radius: var(--radius-md, 0.5rem);
        background: var(--muted, #f4f4f5);
      }
      .seg button {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.75rem;
        padding: 0 0.625rem;
        border-radius: calc(var(--radius-md, 0.5rem) - 2px);
        font-size: 0.8125rem;
        color: var(--muted-foreground, #555);
        cursor: pointer;
      }
      .seg button[aria-pressed="true"] {
        background: var(--background, #fff);
        color: var(--foreground, #111);
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        margin-bottom: 0.75rem;
      }
      .chip {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        height: 1.5rem;
        padding: 0 0.5rem;
        border: 1px solid var(--border, #e5e5e5);
        border-radius: 999px;
        font-size: 0.75rem;
        color: var(--muted-foreground, #555);
        cursor: pointer;
      }
      .chip[aria-pressed="true"],
      .chip.active {
        border-color: var(--primary, #2563eb);
        color: var(--primary, #2563eb);
        background: color-mix(in srgb, var(--primary, #2563eb) 10%, transparent);
        font-weight: 500;
      }
      .status {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.375rem;
        margin-bottom: 0.75rem;
        font-size: 0.8125rem;
        color: var(--muted-foreground, #555);
      }
      .link {
        all: unset;
        color: var(--link, var(--primary, #2563eb));
        cursor: pointer;
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .cols-wrap {
        position: relative;
      }
      .cols-pop {
        position: absolute;
        right: 0;
        top: calc(100% + 0.25rem);
        z-index: 5;
        min-width: 12rem;
        padding: 0.375rem;
        border: 1px solid var(--border, #e5e5e5);
        border-radius: var(--radius-md, 0.5rem);
        background: var(--popover, var(--background, #fff));
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
      }
      .cols-pop label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 1.75rem;
        padding: 0 0.375rem;
        border-radius: var(--radius-sm, 0.25rem);
        font-size: 0.8125rem;
        cursor: pointer;
      }
      .cols-pop label:hover {
        background: var(--accent, #f4f4f5);
      }
      input[type="checkbox"] {
        accent-color: var(--primary, #2563eb);
      }

      /* table */
      .table-wrap {
        overflow-x: auto;
        border: 1px solid var(--border, #e5e5e5);
        border-radius: var(--radius-lg, 0.75rem);
      }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.875rem;
      }
      th {
        height: 2.5rem;
        padding: 0 0.75rem;
        text-align: start;
        font-weight: 500;
        color: var(--muted-foreground, #555);
        border-bottom: 1px solid var(--border, #e5e5e5);
        white-space: nowrap;
      }
      th button {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        cursor: pointer;
      }
      th button:hover {
        color: var(--foreground, #111);
      }
      td {
        padding: 0.625rem 0.75rem;
        vertical-align: middle;
        border-bottom: 1px solid var(--border, #e5e5e5);
      }
      tr:last-child td {
        border-bottom: 0;
      }
      tbody tr:hover {
        background: color-mix(in srgb, var(--muted, #f4f4f5) 50%, transparent);
      }
      .thumb {
        display: block;
        width: 6rem;
        height: 3.5rem;
        border-radius: var(--radius-sm, 0.25rem);
        object-fit: cover;
        background: var(--muted, #f4f4f5);
      }
      .title a {
        font-weight: 500;
        color: var(--foreground, #111);
        text-decoration: none;
      }
      .title a:hover {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .desc {
        text-align: start;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-top: 0.125rem;
        font-size: 0.8125rem;
        color: var(--muted-foreground, #555);
      }
      .pill {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        height: 1.375rem;
        margin: 0.125rem 0.25rem 0.125rem 0;
        padding: 0 0.5rem;
        border-radius: 999px;
        font-size: 0.75rem;
        background: color-mix(in srgb, var(--primary, #2563eb) 10%, transparent);
        color: var(--primary, #2563eb);
        cursor: pointer;
        white-space: nowrap;
        --simple-icon-height: 0.75rem;
        --simple-icon-width: 0.75rem;
      }
      .cell-link {
        color: var(--primary, #0071b6);
        text-decoration: none;
      }
      .cell-link:hover {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .pill.muted {
        background: var(--muted, #f4f4f5);
        color: var(--muted-foreground, #555);
      }
      .draft {
        margin-left: 0.375rem;
        font-size: 0.6875rem;
        font-weight: 500;
        color: var(--muted-foreground, #555);
      }

      /* groups */
      .group + .group {
        margin-top: 1.25rem;
      }
      .group h3 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0 0 0.5rem;
        font-size: 1rem;
        font-weight: 600;
      }
      .count {
        padding: 0 0.5rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 500;
        background: var(--muted, #f4f4f5);
        color: var(--muted-foreground, #555);
      }

      /* cards */
      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
        gap: 1rem;
      }
      .card {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid var(--border, #e5e5e5);
        border-radius: var(--radius-lg, 0.75rem);
        background: var(--card, var(--background, #fff));
        color: inherit;
        text-decoration: none;
      }
      .card:hover {
        border-color: color-mix(in srgb, var(--primary, #2563eb) 50%, var(--border, #e5e5e5));
      }
      .card img,
      .card .ph {
        display: block;
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        background: var(--muted, #f4f4f5);
      }
      .card .ph {
        display: grid;
        place-items: center;
        color: var(--muted-foreground, #555);
        --simple-icon-height: 2rem;
        --simple-icon-width: 2rem;
      }
      .card-body {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        padding: 0.875rem 1rem 1rem;
      }
      .card-title {
        font-weight: 600;
        line-height: 1.4;
      }
      .eyebrow {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--muted-foreground, #555);
        --simple-icon-height: 0.875rem;
        --simple-icon-width: 0.875rem;
      }

      /* outline (modules) */
      .modules {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .module {
        border: 1px solid var(--border, #e5e5e5);
        border-radius: var(--radius-lg, 0.75rem);
        overflow: hidden;
      }
      .module-head {
        display: flex;
        align-items: baseline;
        gap: 0.75rem;
        padding: 0.875rem 1rem;
        background: color-mix(in srgb, var(--muted, #f4f4f5) 50%, transparent);
        border-bottom: 1px solid var(--border, #e5e5e5);
      }
      .num {
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--primary, #2563eb);
      }
      .module-title {
        flex: 1;
        font-weight: 600;
      }
      .module-title a {
        color: inherit;
        text-decoration: none;
      }
      .module-meta {
        font-size: 0.75rem;
        color: var(--muted-foreground, #555);
      }
      .rows {
        list-style: none;
        margin: 0;
        padding: 0.25rem 0;
      }
      .rows li {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        min-height: 2.5rem;
        padding: 0.25rem 1rem;
        font-size: 0.875rem;
        --simple-icon-height: 1rem;
        --simple-icon-width: 1rem;
      }
      .rows li + li {
        border-top: 1px solid color-mix(in srgb, var(--border, #e5e5e5) 60%, transparent);
      }
      .rows simple-icon-lite,
      .rows .noicon {
        flex: none;
        width: 1rem;
        color: var(--muted-foreground, #555);
      }
      .rows a {
        flex: 1;
        color: var(--foreground, #111);
        text-decoration: none;
      }
      .rows a:hover {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .rows .kind {
        font-size: 0.75rem;
        color: var(--muted-foreground, #555);
      }

      /* pagination */
      .pager {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        margin-top: 0.75rem;
        font-size: 0.8125rem;
        color: var(--muted-foreground, #555);
      }
      .pages {
        display: flex;
        gap: 0.25rem;
      }
      .pages button {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md, 0.5rem);
        cursor: pointer;
      }
      .pages button:hover {
        background: var(--accent, #f4f4f5);
      }
      .pages button[aria-current="page"] {
        border: 1px solid var(--border, #e5e5e5);
        color: var(--foreground, #111);
        font-weight: 500;
      }
      .pages button[disabled] {
        opacity: 0.4;
        cursor: default;
      }
      .empty {
        padding: 2.5rem 1rem;
        text-align: center;
        border: 1px dashed var(--border, #e5e5e5);
        border-radius: var(--radius-lg, 0.75rem);
        font-size: 0.875rem;
        color: var(--muted-foreground, #555);
      }

      /* pathways index */
      .pw-section + .pw-section {
        margin-top: 2.5rem;
      }
      .pw-section h3 {
        margin: 0;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--muted-foreground, #555);
      }
      .pw-section > p {
        margin: 0.25rem 0 0;
        font-size: 0.875rem;
        color: var(--muted-foreground, #555);
      }
      .pw-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 16rem), 1fr));
        gap: 1rem;
        margin-top: 0.75rem;
      }
      .pw-grid.featured {
        grid-template-columns: 1fr;
      }
      .pw-card {
        display: flex;
        flex-direction: column;
        height: 100%;
        box-sizing: border-box;
        padding: 1.25rem;
        border: 1px solid var(--border, #e5e5e5);
        border-radius: var(--radius-lg, 0.75rem);
        background: var(--card, var(--background, #fff));
        color: inherit;
        text-decoration: none;
      }
      .featured .pw-card {
        padding: 1.5rem 2rem;
      }
      .pw-card:hover {
        border-color: color-mix(in srgb, var(--primary, #0071b6) 50%, var(--border, #e5e5e5));
      }
      .pw-title {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
      }
      .pw-title strong {
        font-size: 1.125rem;
        font-weight: 600;
        letter-spacing: -0.01em;
      }
      .featured .pw-title strong {
        font-size: 1.5rem;
      }
      .pw-card:hover .pw-title strong {
        color: var(--primary, #0071b6);
      }
      .pw-desc {
        display: -webkit-box;
        margin: 0.5rem 0 0;
        overflow: hidden;
        font-size: 0.875rem;
        line-height: 1.5;
        color: var(--muted-foreground, #555);
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
      .featured .pw-desc {
        display: block;
        max-width: 42rem;
        font-size: 1rem;
      }
      .pw-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem 1rem;
        margin-top: auto;
        padding-top: 1rem;
        font-size: 0.75rem;
        color: var(--muted-foreground, #555);
      }
      .pw-meta .chips {
        display: inline-flex;
        flex-wrap: wrap;
        gap: 0.25rem;
      }
      .pw-meta .go {
        margin-left: auto;
      }
      .pw-card:hover .go {
        color: var(--primary, #0071b6);
      }
    `];
  }

  _typeIcon(item) {
    const t = this._type(item);
    return t?.icon ? html`<simple-icon-lite icon="${t.icon}"></simple-icon-lite>` : html`<span class="noicon"></span>`;
  }

  _pills(item, limit = 3) {
    const out = [];
    for (const f of this._fields) {
      if (!f.header || !["select", "text", "number"].includes(f.kind)) continue;
      const raw = this._value(item, f.name);
      if (raw === undefined || raw === "" || raw === null) continue;
      // a choice field that allows several values gives one pill per value
      for (const v of f.kind === "select" ? toList(raw) : [raw]) {
        out.push(
          f.kind === "select" && this._filterFields.includes(f)
            ? html`<button class="pill" title="Filter by ${f.label}" @click="${(e) => (e.preventDefault(), this._setFilter(f.name, v))}">${this._label(f, v)}</button>`
            : html`<span class="pill muted">${f.kind === "text" && /duration|time/i.test(f.name) ? lucide("device:access-time", "xs") : ""}${this._label(f, v)}</span>`,
        );
      }
      if (out.length >= limit) break;
    }
    return out;
  }

  _cell(col, item) {
    switch (col.key) {
      case "image": {
        const src = this._image(item);
        return src ? html`<img class="thumb" src="${src}" alt="" loading="lazy" />` : html`<span class="thumb"></span>`;
      }
      case "title":
        return html`<div class="title">
            <a href="${item.slug}">${item.title}</a>${item.metadata?.published === false ? html`<span class="draft">Draft</span>` : ""}
          </div>
          ${item.description ? html`<div class="desc">${item.description}</div>` : ""}`;
      case "type": {
        const t = this._type(item);
        return t ? html`<span class="eyebrow">${this._typeIcon(item)}${t.label}</span>` : "";
      }
      case "tags":
        return toList(item.metadata?.tags).map(
          (t) => html`<button class="pill muted" title="Filter by tag" @click="${() => this._toggleTag(t)}">${t}</button>`,
        );
      default: {
        const v = this._value(item, col.key);
        if (v === undefined || v === "" || (Array.isArray(v) && !v.length)) return "";
        const kind = col.field?.kind;
        if (kind === "relation") {
          return resolveLinks(v, this._all || [])
            .filter((r) => !r.missing)
            .map((r, n) => html`${n ? ", " : ""}<a class="cell-link" href="${r.href}">${r.item.title}</a>${r.version ? ` v${r.version}` : ""}`);
        }
        if (kind === "files") {
          return toFiles(v).map(
            (f, n) => html`${n ? ", " : ""}${f.url ? html`<a class="cell-link" href="${f.url}" download>${f.title || fileName(f.url)}</a>` : f.title}`,
          );
        }
        if (kind === "select" && this._filterFields.includes(col.field)) {
          return toList(v).map(
            (x) => html`<button class="pill" title="Filter by ${col.label}" @click="${() => this._setFilter(col.key, x)}">${this._label(col.field, x)}</button>`,
          );
        }
        if (kind === "boolean") return v ? "Yes" : "No";
        return this._plain(v, col.field);
      }
    }
  }

  _renderTable(items) {
    const cols = this._columns.filter((c) => c.fixed || !this._state.hidden.includes(c.key));
    const key = this._state.sortKey || this.sort;
    return html`<div class="table-wrap">
      <table>
        <thead>
          <tr>
            ${cols.map((c) => {
              if (!c.sortable) return html`<th scope="col">${c.key === "image" ? html`<span class="sr" style="position:absolute;clip-path:inset(50%)">Image</span>` : c.label}</th>`;
              const on = key === c.key;
              return html`<th scope="col" aria-sort="${on ? (this._state.sortDir > 0 ? "ascending" : "descending") : "none"}">
                <button @click="${() => this._toggleSort(c.key)}">
                  ${c.label}${lucide(on ? (this._state.sortDir > 0 ? "icons:arrow-upward" : "icons:arrow-downward") : "icons:swap-vert", "xs")}
                </button>
              </th>`;
            })}
          </tr>
        </thead>
        <tbody>
          ${items.map((i) => html`<tr>${cols.map((c) => html`<td>${this._cell(c, i)}</td>`)}</tr>`)}
        </tbody>
      </table>
    </div>`;
  }

  _renderCards(items) {
    return html`<div class="cards">
      ${items.map((i) => {
        const src = this._image(i);
        const t = this._type(i);
        return html`<a class="card" href="${i.slug}">
          ${src ? html`<img src="${src}" alt="" loading="lazy" />` : html`<div class="ph">${this._typeIcon(i)}</div>`}
          <div class="card-body">
            ${t ? html`<span class="eyebrow">${this._typeIcon(i)}${t.label}</span>` : ""}
            <span class="card-title">${i.title}${i.metadata?.published === false ? html`<span class="draft">Draft</span>` : ""}</span>
            ${i.description ? html`<span class="desc">${i.description}</span>` : ""}
            <span>${this._pills(i)}</span>
          </div>
        </a>`;
      })}
    </div>`;
  }

  // pathways index, as learning-materials-decapcms' /pathways: where to
  // start, what builds on it, and what is still being written
  _renderPathways(items) {
    if (!items.length) return html`<div class="empty">Nothing here yet.</div>`;
    const sorted = [...items].sort((a, b) => a.title.localeCompare(b.title));
    const f = (i) => i.metadata?.oerFields || {};
    const prereqs = (i) => resolveLinks(f(i).prerequisites, this._all).filter((r) => !r.missing);
    const inDev = sorted.filter((i) => f(i).placeholder);
    const ready = sorted.filter((i) => !f(i).placeholder);
    const start = ready.filter((i) => !prereqs(i).length);
    const next = ready.filter((i) => prereqs(i).length);
    // "After Foundations" when everything else builds on the same pathway
    const firsts = new Set(next.map((i) => prereqs(i).map((r) => r.page).join()));
    const only = firsts.size === 1 ? prereqs(next[0]) : [];
    const nextLabel = only.length === 1 ? `After ${only[0].item.title.replace(/ pathway$/i, "")}` : "Next steps";
    const card = (i) => {
      const v = f(i);
      const levels = sortLevels(v.levels);
      const courses = toList(v.courses);
      return html`<a class="pw-card" href="${i.slug}">
        <span class="pw-title"><strong>${i.title}</strong>${v.placeholder ? inDevelopmentBadge() : ""}${i.metadata?.published === false ? html`<span class="draft">Draft</span>` : ""}</span>
        ${i.description ? html`<p class="pw-desc">${i.description}</p>` : ""}
        <span class="pw-meta">
          ${courses.length ? html`<span>${courses.join(" or ")}</span>` : ""}
          ${levels.length ? html`<span class="chips">${levels.map((l) => levelChip(l))}</span>` : v.placeholder ? "" : html`<span>One level</span>`}
          ${v.targetRole ? html`<span>Leads toward ${v.targetRole}</span>` : ""}
          ${lucide("oer:arrow-right", "go")}
        </span>
      </a>`;
    };
    const section = (title, list, { featured = false, intro = "" } = {}) =>
      list.length
        ? html`<section class="pw-section">
            <h3>${title}</h3>
            ${intro ? html`<p>${intro}</p>` : ""}
            <div class="pw-grid ${featured ? "featured" : ""}">${list.map(card)}</div>
          </section>`
        : "";
    return html`${section("Start here", start, { featured: true })}${section(nextLabel, next)}${section("In development", inDev, {
      intro: "Planned pathways. Their modules are still being written, so they can't be taken yet.",
    })}`;
  }

  // modules: each item is a module; its own sub-pages are the rows
  _renderOutline(items) {
    const kids = childrenMap((this._all || []).filter((i) => !i.metadata?.hideInMenu && (store.isLoggedIn || i.metadata?.published !== false)));
    const modules = this._sorted(items);
    if (!modules.length) return html`<div class="empty">Nothing here yet.</div>`;
    return html`<div class="modules">
      ${modules.map((m, n) => {
        const rows = kids.get(m.id) || [];
        return html`<section class="module">
          <div class="module-head">
            <span class="num">${String(n + 1).padStart(2, "0")}</span>
            <span class="module-title"><a href="${m.slug}">${m.title}</a></span>
            <span class="module-meta">${rows.length ? `${rows.length} item${rows.length === 1 ? "" : "s"}` : ""}</span>
          </div>
          ${rows.length
            ? html`<ul class="rows">
                ${rows.map(
                  (r) => html`<li>
                    ${this._typeIcon(r)}
                    <a href="${r.slug}">${r.title}</a>
                    ${this._pills(r, 2)}
                    <span class="kind">${this._type(r)?.label || ""}</span>
                  </li>`,
                )}
              </ul>`
            : m.description
              ? html`<p class="desc" style="margin:0;padding:0.75rem 1rem">${m.description}</p>`
              : ""}
        </section>`;
      })}
    </div>`;
  }

  _renderControls(total, shown) {
    const s = this._state;
    const view = s.view || this.view;
    const filterFields = this._filterFields;
    const tags = this._distinct("tags");
    const groupable = [
      ...(new Set(this._items.map((i) => i.metadata?.pageType)).size > 1 ? [{ key: "type", label: "Type" }] : []),
      ...filterFields.filter((f) => f.kind === "select").map((f) => ({ key: f.name, label: f.label })),
      ...(tags.length ? [{ key: "tags", label: "Tag" }] : []),
    ];
    const active = [
      ...Object.entries(s.filters).map(([name, v]) => ({ label: `${filterFields.find((f) => f.name === name)?.label || name}: ${this._label(filterFields.find((f) => f.name === name), v)}`, clear: () => this._setFilter(name, null) })),
      ...s.tags.map((t) => ({ label: `Tag: ${t}`, clear: () => this._toggleTag(t) })),
    ];
    return html`
      <div class="bar">
        <label class="search">
          ${lucide("icons:search", "sm")}
          <input type="search" placeholder="Search…" aria-label="Search" .value="${s.q}" @input="${(e) => this._setState({ q: e.target.value, page: 1 })}" />
        </label>
        ${filterFields.map(
          (f) => html`<select class="filter" aria-label="${f.label}" @change="${(e) => this._setFilter(f.name, e.target.value)}">
            <option value="" ?selected="${!s.filters[f.name]}">${f.label}: all</option>
            ${this._distinct(f.name).map((v) => html`<option value="${v}" ?selected="${s.filters[f.name] === v}">${this._label(f, v)}</option>`)}
          </select>`,
        )}
        ${view === "table"
          ? html`<div class="cols-wrap">
              <button class="btn" aria-expanded="${this._columnsOpen}" @click="${() => (this._columnsOpen = !this._columnsOpen)}">${lucide("oer:columns-2", "sm")}Columns</button>
              ${this._columnsOpen
                ? html`<div class="cols-pop" role="group" aria-label="Columns">
                    ${this._columns
                      .filter((c) => !c.fixed)
                      .map(
                        (c) => html`<label
                          ><input
                            type="checkbox"
                            .checked="${!s.hidden.includes(c.key)}"
                            @change="${(e) => this._setState({ hidden: e.target.checked ? s.hidden.filter((h) => h !== c.key) : [...s.hidden, c.key] })}"
                          />${c.label}</label
                        >`,
                      )}
                  </div>`
                : ""}
            </div>`
          : ""}
        <div class="seg" role="group" aria-label="View">
          <button aria-pressed="${view === "table"}" @click="${() => this._setState({ view: "table" })}">${lucide("editor:border-all", "sm")}Table</button>
          <button aria-pressed="${view === "cards"}" @click="${() => this._setState({ view: "cards" })}">${lucide("icons:view-module", "sm")}Cards</button>
        </div>
      </div>
      ${tags.length > 1
        ? html`<div class="chips" role="group" aria-label="Tags">
            ${tags.map((t) => html`<button class="chip" aria-pressed="${s.tags.includes(t)}" @click="${() => this._toggleTag(t)}">${t}</button>`)}
          </div>`
        : ""}
      ${groupable.length
        ? html`<div class="bar">
            <span class="status" style="margin:0">${lucide("icons:view-module", "xs")}Group by</span>
            <div class="seg" role="group" aria-label="Group by">
              <button aria-pressed="${!s.groupBy}" @click="${() => this._setState({ groupBy: "", page: 1 })}">None</button>
              ${groupable.map((g) => html`<button aria-pressed="${s.groupBy === g.key}" @click="${() => this._setState({ groupBy: g.key, page: 1 })}">${g.label}</button>`)}
            </div>
          </div>`
        : ""}
      <div class="status" aria-live="polite">
        ${active.map((a) => html`<button class="chip active" @click="${a.clear}" aria-label="Remove filter ${a.label}">${lucide("image:tune", "xs")}${a.label}${lucide("oer:x", "xs")}</button>`)}
        <span>${shown === total ? `${total} item${total === 1 ? "" : "s"}` : `${shown} of ${total}`}</span>
        ${active.length || s.q ? html`<button class="link" @click="${this._clear}">Clear all</button>` : ""}
      </div>
    `;
  }

  _renderPager(total) {
    const per = Math.max(1, Number(this.perPage) || 20);
    const pages = Math.ceil(total / per);
    if (pages <= 1) return "";
    const page = Math.min(this._state.page, pages);
    const go = (p) => {
      this._setState({ page: p });
      this.scrollIntoView({ block: "start", behavior: "auto" });
    };
    return html`<nav class="pager" aria-label="Pages">
      <span>Showing ${(page - 1) * per + 1} to ${Math.min(page * per, total)} of ${total}</span>
      <div class="pages">
        <button ?disabled="${page === 1}" aria-label="Previous page" @click="${() => go(page - 1)}">${lucide("icons:chevron-left", "sm")}</button>
        ${Array.from({ length: pages }, (_, i) => i + 1).map(
          (p) => html`<button aria-current="${p === page ? "page" : "false"}" @click="${() => go(p)}">${p}</button>`,
        )}
        <button ?disabled="${page === pages}" aria-label="Next page" @click="${() => go(page + 1)}">${lucide("icons:chevron-right", "sm")}</button>
      </div>
    </nav>`;
  }

  render() {
    const heading = this.heading ? html`<h2 class="heading">${this.heading}</h2>` : "";
    if (this.view === "outline") return html`${heading}${this._renderOutline(this._items)}`;
    if (this.view === "pathways") return html`${heading}${this._renderPathways(this._items)}`;
    const view = this.controls === "full" ? this._state.view || this.view : this.view;
    const filtered = this.controls === "full" ? this._filtered : this._items;
    const sorted = this._sorted(filtered);
    const per = Math.max(1, Number(this.perPage) || 20);
    const groups = this._groups(sorted);
    const paged = (list) => {
      const page = Math.min(this._state.page, Math.max(1, Math.ceil(list.length / per)));
      return list.slice((page - 1) * per, page * per);
    };
    const body = (list) => (view === "cards" ? this._renderCards(list) : this._renderTable(list));
    return html`
      ${heading}
      ${this.controls === "full" ? this._renderControls(this._items.length, filtered.length) : ""}
      ${!sorted.length
        ? html`<div class="empty">
            ${this._items.length ? html`Nothing matches. <button class="link" @click="${this._clear}">Clear filters</button>` : "Nothing here yet."}
          </div>`
        : groups.length > 1 || this._state.groupBy
          ? groups.map(
              (g) => html`<section class="group">
                <h3>${g.key}<span class="count">${g.items.length}</span></h3>
                ${body(g.items.slice(0, per))}
              </section>`,
            )
          : html`${body(paged(sorted))}${this._renderPager(sorted.length)}`}
    `;
  }

  static get haxProperties() {
    const types = Object.fromEntries([["", "Any type"], ...contentTypes().types.map((t) => [t.id, t.label])]);
    return {
      canScale: false,
      canEditSource: true,
      gizmo: {
        title: "Page collection",
        description: "List pages by content type and place: a filterable table, cards, or a module outline.",
        icon: "icons:view-module",
        color: "blue",
        tags: ["Layout", "collection", "index", "listing", "table", "outline"],
        meta: { author: "Michael Collins" },
      },
      settings: {
        configure: [
          { property: "heading", title: "Heading", description: "Optional, shown above the list.", inputMethod: "textfield" },
          {
            property: "types",
            title: "Content type",
            description: "Which pages to list. For several, edit the source and separate IDs with commas.",
            inputMethod: "select",
            options: types,
          },
          { property: "scope", title: "From", inputMethod: "select", options: SCOPES },
          { property: "view", title: "View", inputMethod: "select", options: VIEWS },
          { property: "sort", title: "Sort by", inputMethod: "select", options: SORTS },
          { property: "perPage", title: "Items per page", inputMethod: "number" },
          { property: "controls", title: "Search and filters", inputMethod: "select", options: { full: "Show (readers can switch table / cards)", none: "Hide" } },
        ],
        advanced: [],
      },
      demoSchema: [{ tag: "oer-collection", properties: { types: "oer:lesson", scope: "site", view: "table", sort: "title", perPage: 20, controls: "full" }, content: "" }],
    };
  }
}

// Internal state is kept out of `properties`: HAX writes every declared
// property into the saved page, so these re-render via requestUpdate instead
for (const name of ["_items", "_defs", "_state", "_columnsOpen"]) {
  Object.defineProperty(OerCollection.prototype, name, {
    get() {
      return this[`__${name}`];
    },
    set(value) {
      this[`__${name}`] = value;
      this.requestUpdate();
    },
  });
}

if (!customElements.get(OerCollection.tag)) customElements.define(OerCollection.tag, OerCollection);
registerBlocks(OerCollection);
