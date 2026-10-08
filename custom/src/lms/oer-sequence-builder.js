/**
 * `oer-sequence-builder` — build a course sequence (oer:sequence page) in
 * the outline builder's UI: the outline on the left, the selected item on
 * the right (how it works in the LMS, then the page itself), and the
 * sequence's course settings in a sheet from the right.
 *
 * The outline: modules at the top level, their items below. An item's depth
 * under its module is its indent in the LMS, so Tab / Shift+Tab and dragging
 * sideways set it. Everything else works as in the outline builder
 * (outline/oer-outline-builder.js, which this extends): drag and drop,
 * Alt+↑/↓ (an item at a module's edge moves into the next module), ↑/↓,
 * ←/→, Enter (rename modules, headers and links), Delete (take it out of the
 * sequence; pages are never deleted), T (the item's role). Add rows close
 * every level: Add module at the top; Add pages (the page picker, with a
 * page's sub-pages indented under it if you like), Add header and Add link
 * inside modules. An item keeps its due date relative to its module: move
 * it to a module two weeks later (or move the module) and it's due two weeks
 * later too.
 *
 * Items: a page (the live page, embedded), an assignment (due week and day,
 * points, submissions, rubric, grade group, peer reviews, group work), a
 * discussion (an open thread; graded ones with points, a due date,
 * requirements and a rubric), a quiz, a link, a file; text headers and links
 * to any address. Course settings: length, delivery, grade groups and
 * weights, the rubric point scale. Term dates come at export
 * (lms/oer-sequence-export.js).
 *
 *   sequenceBuilder().show(pageId)
 * @element oer-sequence-builder
 */
import { html, css } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { OerOutlineBuilder, MAX_DEPTH } from "../outline/oer-outline-builder.js";
import { saveOutline, newItemId, childrenMap } from "../outline/outline-model.js";
import { isSystemItem, contentTypes, HEADING_TYPE } from "../types/content-types.js";
import { isSnapshot, versionsOf } from "../versions/versioning.js";
import { pagePicker } from "../books/oer-page-picker.js";
import { embedUrl } from "../embed/embed-mode.js";
import { SEQUENCE_TYPE, ROLES, SUBMISSION_TYPES, sequenceOf, newItem, readiness, indentOf, attachmentsOf } from "./sequence-model.js";

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
const PREVIEW_DELAY_MS = 300;
const clone = (o) => JSON.parse(JSON.stringify(o));
const uid = () => `m${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
const isHeader = (item) => item?.header !== undefined;
const isUrl = (item) => item?.as === "url";

class OerSequenceBuilder extends OerOutlineBuilder {
  static get tag() {
    return "oer-sequence-builder";
  }

  static get properties() {
    return {
      ...super.properties,
      _selId: { state: true },
      _previewId: { state: true },
      _groups: { state: true },
      _scale: { state: true },
      _fields: { state: true },
      _sheet: { state: true },
      _showChecks: { state: true },
      _saving: { state: true },
    };
  }

  constructor() {
    super();
    this._showIcons = false;
    this._selId = null;
    this._previewId = null;
    this._sheet = false;
    this._rubrics = [];
    this._groups = [];
    this._scale = [];
    this._fields = { weeks: 15, delivery: "In person" };
  }

  /* ---------- open / save ---------- */

  async show(pageId) {
    const items = toJS(store.manifest?.items) || [];
    const page = items.find((i) => i.id === pageId);
    if (!page) return;
    this._items = items;
    this._byId = new Map(items.map((i) => [i.id, i]));
    this._pageId = pageId;
    this._root = null;
    this._rootItem = null;
    this._types = [];
    const seq = sequenceOf(page);
    this._groups = clone(seq.groups);
    this._scale = clone(seq.rubricScale);
    const f = page.metadata?.oerFields || {};
    this._fields = { weeks: Number(f.weeks) || Math.max(0, ...seq.modules.map((m) => Number(m.week) || 0)) || 15, delivery: f.delivery || "In person" };
    this._rows = this._rowsOf(seq);
    this._deleted = new Map();
    this._hidden = new Map();
    this._collapsed = new Set();
    this._editing = null;
    this._typeMenu = null;
    this._confirmDiscard = false;
    this._sheet = false;
    this._showChecks = false;
    this._saving = false;
    this._selId = this._previewId = this._rows[0]?.id || null;
    this._snapshot = this._signature();
    this.open = true;
    globalThis.addEventListener("keydown", this.__keys, true);
    this.updateComplete.then(() => this.shadowRoot.querySelector("[role=treeitem], .empty button")?.focus());
    try {
      const res = await fetch(new URL("files/data/rubrics.json", globalThis.document.baseURI), { cache: "no-cache" });
      const data = res.ok ? await res.json() : [];
      this._rubrics = Array.isArray(data) ? data : data.rubrics || [];
    } catch {
      this._rubrics = [];
    }
    this.requestUpdate();
  }

  // the sequence as outline rows: modules at depth 0, items at 1 + indent
  _rowsOf(seq) {
    const rows = [];
    for (const m of seq.modules) {
      rows.push({ id: m.id || uid(), kind: "module", title: m.title || "", week: Number(m.week) || "", depth: 0, orig: true });
      for (const it of m.items || []) {
        const { indent, ...item } = it;
        rows.push(this._itemRow(item, 1 + indentOf(it), true));
      }
    }
    return rows;
  }

  _itemRow(item, depth, orig = null) {
    const title = isHeader(item) ? item.header : isUrl(item) ? item.title || "" : this._byId?.get(item.page)?.title || "";
    return { id: newItemId(), kind: "item", item, title, type: isHeader(item) ? HEADING_TYPE : "", depth: Math.min(depth, MAX_DEPTH), orig };
  }

  // rows back into the sequence's modules (blank headers are dropped)
  _toModules(rows = this._rows) {
    const modules = [];
    for (const r of rows) {
      if (r.kind === "module") modules.push({ id: r.id, title: r.title, week: Number(r.week) || "", items: [] });
      else if (modules.length) {
        const item = clone(r.item);
        if (isHeader(item)) {
          if (!r.title.trim()) continue;
          item.header = r.title.trim();
        }
        if (isUrl(item)) item.title = r.title;
        modules.at(-1).items.push({ ...item, indent: Math.max(0, r.depth - 1) });
      }
    }
    return modules;
  }

  _sequence() {
    return { version: 1, modules: this._toModules(), groups: this._groups, rubricScale: this._scale };
  }

  _signature() {
    return JSON.stringify([this._sequence(), this._fields]);
  }

  get _page() {
    return this._byId?.get(this._pageId);
  }

  _requestClose() {
    if (this._sheet) this._closeSheet();
    else super._requestClose();
  }

  _close() {
    clearTimeout(this.__preview);
    this._sheet = false;
    super._close();
  }

  async _save() {
    const page = (toJS(store.manifest?.items) || []).find((i) => i.id === this._pageId);
    if (!page) return;
    this._saving = true;
    await saveOutline([
      {
        ...page,
        metadata: {
          ...page.metadata,
          oerSequence: this._sequence(),
          oerFields: { ...(page.metadata?.oerFields || {}), weeks: Number(this._fields.weeks) || "", delivery: this._fields.delivery },
        },
        modified: true,
      },
    ]);
    this._saving = false;
    this._close();
  }

  /* ---------- the outline's rules ---------- */

  // modules stay at the top; items stay inside a module, at most one level
  // deeper than the row above; items above the first module join it
  _normalize(rows) {
    const out = [];
    const leading = [];
    const place = (r) => {
      const depth = Math.max(1, Math.min(r.depth, out.at(-1).depth + 1, MAX_DEPTH));
      out.push(depth === r.depth ? r : { ...r, depth });
    };
    for (const r of rows) {
      if (r.kind === "module") {
        out.push(r.depth === 0 ? r : { ...r, depth: 0 });
        leading.splice(0).forEach(place);
      } else if (out.length) place(r);
      else leading.push(r);
    }
    return [...out, ...leading];
  }

  // each item's module week
  _weeksOf(rows) {
    const out = new Map();
    let week = null;
    for (const r of rows) {
      if (r.kind === "module") week = Number(r.week) || null;
      else out.set(r.id, week);
    }
    return out;
  }

  // an item keeps its due week relative to its module's week, when it moves
  // to another module or the module's week changes
  _commit(rows = [...this._rows]) {
    const next = this._normalize(rows);
    const before = this._weeksOf(this._rows);
    const after = this._weeksOf(next);
    super._commit(
      next.map((r) => {
        const was = before.get(r.id);
        const now = after.get(r.id);
        const due = Number(r.item?.due?.week);
        if (r.kind !== "item" || !due || !was || !now || was === now) return r;
        return { ...r, item: { ...r.item, due: { ...r.item.due, week: Math.max(1, due + now - was) } } };
      }),
    );
  }

  _indent(id) {
    if (this._rows[this._index(id)]?.kind === "item") super._indent(id);
  }

  _outdent(id) {
    const row = this._rows[this._index(id)];
    if (row?.kind === "item" && row.depth > 1) super._outdent(id);
  }

  // a dragged module stays at the top; an item stays inside a module
  _previewDepth(d, targetId) {
    const depth = super._previewDepth(d, targetId);
    return this._rows[this._index(d.id)]?.kind === "module" ? 0 : Math.max(1, depth);
  }

  // Alt+↑ on a module's first item moves it to the end of the module before
  _moveUp(id) {
    const idx = this._index(id);
    const row = this._rows[idx];
    if (row?.kind === "item" && row.depth === 1 && this._rows[idx - 1]?.kind === "module") {
      if (!this._rows.slice(0, idx - 1).some((r) => r.kind === "module")) return;
      const rows = [...this._rows];
      const { start, end } = this._subtree(idx);
      const sub = rows.splice(start, end - start);
      rows.splice(idx - 1, 0, ...sub);
      this._commit(rows);
      this._focusRow(id);
      return;
    }
    super._moveUp(id);
  }

  // Alt+↓ on a module's last item moves it to the start of the next module
  _moveDown(id) {
    const idx = this._index(id);
    const row = this._rows[idx];
    if (row?.kind === "item" && row.depth === 1) {
      const { start, end } = this._subtree(idx);
      if (end < this._rows.length && this._rows[end].kind === "module") {
        const rows = [...this._rows];
        const sub = rows.splice(start, end - start);
        rows.splice(start + 1, 0, ...sub);
        const c = new Set(this._collapsed);
        c.delete(rows[start].id);
        this._collapsed = c;
        this._commit(rows);
        this._focusRow(id);
        return;
      }
    }
    super._moveDown(id);
  }

  _invalid(idx) {
    const r = this._rows[idx];
    return r?.kind === "item" && !!r.item.page && !this._byId?.get(r.item.page);
  }

  _levelsFor() {
    return [];
  }

  _pinnable() {
    return [];
  }

  _canRename(row) {
    return row.kind === "module" || isHeader(row.item) || isUrl(row.item);
  }

  _placeholder(row) {
    if (row.kind === "module") return "Module title…";
    if (isHeader(row.item)) return "Header…";
    return "Link title…";
  }

  _rowCurrent(row) {
    return row.id === this._selId;
  }

  // the panel follows the focused row; the page preview catches up once
  // the focus settles, so arrowing through the outline doesn't load each page
  _select(id) {
    this._selId = id;
    clearTimeout(this.__preview);
    this.__preview = setTimeout(() => (this._previewId = id), PREVIEW_DELAY_MS);
  }

  _rowFocused(row) {
    if (row.id !== this._selId) this._select(row.id);
  }

  // Delete takes rows out of the sequence; a page is never deleted
  _remove(id) {
    const idx = this._index(id);
    if (idx < 0) return;
    const { start, end } = this._subtree(idx);
    const rows = [...this._rows];
    const prev = idx > 0 ? rows[idx - 1].id : rows[end]?.id || null;
    rows.splice(start, end - start);
    this._commit(rows);
    if (!this._rows.some((r) => r.id === this._selId)) this._select(prev);
    if (prev) this._focusRow(prev);
  }

  // the week of the module a row is in
  _weekAt(index) {
    for (let i = Math.min(index, this._rows.length - 1); i >= 0; i--) if (this._rows[i].kind === "module") return Number(this._rows[i].week) || 1;
    return 1;
  }

  _insertAfter(afterId, rows) {
    const list = [...this._rows];
    const idx = this._index(afterId);
    list.splice(idx < 0 ? list.length : this._subtree(idx).end, 0, ...rows);
    this._commit(list);
  }

  _addModule(afterId) {
    const week = Math.max(0, ...this._rows.filter((r) => r.kind === "module").map((r) => Number(r.week) || 0)) + 1;
    const row = { id: uid(), kind: "module", title: `Week ${week}`, week, depth: 0, orig: null };
    this._insertAfter(afterId, [row]);
    this._select(row.id);
    this._startEdit(row.id);
  }

  async _addPages(afterId, depth) {
    const choice = await pagePicker().pick({ exclude: [this._pageId], title: "Add pages to the sequence" });
    if (!choice) {
      this._focusRow(afterId);
      return;
    }
    const all = toJS(store.manifest?.items) || [];
    this._items = all;
    this._byId = new Map(all.map((i) => [i.id, i]));
    const kids = childrenMap(all.filter((i) => !isSystemItem(i) && !isSnapshot(i)));
    const week = this._weekAt(this._index(afterId));
    const row = (page, d, version = "") => {
      const item = newItem(page, week);
      if (version) item.version = version;
      return this._itemRow(item, d);
    };
    const rows = [row(choice.page, depth, choice.version)];
    if (choice.withChildren) {
      const walk = (id, d) => (kids.get(id) || []).forEach((c) => (rows.push(row(c, d)), walk(c.id, d + 1)));
      walk(choice.page.id, depth + 1);
    }
    this._insertAfter(afterId, rows);
    this._select(rows[0].id);
    this._focusRow(rows[0].id);
  }

  _addItem(afterId, depth, item) {
    const row = this._itemRow(item, depth);
    this._insertAfter(afterId, [row]);
    this._select(row.id);
    this._startEdit(row.id);
  }

  _setItem(patch) {
    this._commit(this._rows.map((r) => (r.id === this._selId ? { ...r, item: { ...r.item, ...patch } } : r)));
  }

  _setRow(patch) {
    this._commit(this._rows.map((r) => (r.id === this._selId ? { ...r, ...patch } : r)));
  }

  // a new role keeps what still applies and fills in the rest
  _setRole(id, as, refocus = true) {
    this._typeMenu = null;
    const idx = this._index(id);
    if (idx < 0) return;
    const week = this._weekAt(idx);
    const page = this._byId?.get(this._rows[idx].item.page);
    this._commit(
      this._rows.map((r) => {
        if (r.id !== id) return r;
        const it = { ...r.item, as };
        if (as === "assignment" || as === "discussion") {
          it.due ||= { week };
          if (it.points === undefined) it.points = page?.metadata?.pageType === "oer:project" ? 100 : 20;
        }
        if (as === "assignment") it.submission ||= ["online_upload"];
        if (as === "discussion") {
          if (it.replies === undefined) it.replies = 2;
          it.requirements ||= [];
          it.rubric ??= "task";
        }
        if (as === "quiz") it.quizType ||= "practice";
        if (as === "file" && !it.file) it.file = attachmentsOf(page)[0]?.url || "";
        return { ...r, item: it };
      }),
    );
    if (refocus) this._focusRow(id);
  }

  /* ---------- the outline's rows ---------- */

  _summary(item) {
    const graded = item.graded !== false;
    if (isHeader(item)) return "Header";
    if (isUrl(item)) return "Link";
    if (item.as === "assignment") return graded ? [`${item.points || 0} pts`, item.due?.week ? `wk ${item.due.week}` : "no due week"].join(" · ") : "Ungraded";
    if (item.as === "discussion") return ["Discussion", graded && item.points ? `${item.points} pts` : "", graded && item.due?.week ? `wk ${item.due.week}` : ""].filter(Boolean).join(" · ");
    if (item.as === "quiz") return item.quizType === "graded" ? "Graded quiz" : "Practice quiz";
    return ROLES[item.as]?.label || "Page";
  }

  _renderRowChips(row, index) {
    if (row.kind === "module") {
      const empty = !this._hasChildren(index);
      return html`${empty ? html`<span class="chip quiet">Empty</span>` : ""}<span class="chip week" title="Teaching week">Week ${row.week || "?"}</span>`;
    }
    const item = row.item;
    if (isHeader(item)) return "";
    if (isUrl(item)) return html`<span class="chip quiet">${lucide("icons:link", "sm")}Link</span>`;
    const label = this._summary(item);
    const graded = ["assignment", "discussion"].includes(item.as) || (item.as === "quiz" && item.quizType === "graded");
    return html`${item.version ? html`<span class="chip quiet" title="Pinned to version ${item.version}">v${item.version}</span>` : ""}
      <button
        class="type-chip ${graded ? "graded" : ""}"
        tabindex="-1"
        title="How this works in the LMS. Change (T)"
        aria-label="${ROLES[item.as]?.label || "Page"}: ${label}. Change"
        @mousedown="${(e) => e.preventDefault()}"
        @click="${(e) => {
          e.stopPropagation();
          this._select(row.id);
          this._openMenu(row, index, "type", e.currentTarget);
        }}"
      >
        ${label}
      </button>`;
  }

  _renderRowActions(row) {
    return html`<div class="hover-only">
      <button
        class="act danger"
        tabindex="-1"
        title="${row.kind === "module" ? "Remove the module and its items (Delete)" : "Remove from the sequence (Delete). The page is kept."}"
        aria-label="Remove ${row.title || "item"} from the sequence"
        @click="${(e) => {
          e.stopPropagation();
          this._remove(row.id);
        }}"
      >
        ${lucide("oer:x", "sm")}
      </button>
    </div>`;
  }

  _renderTypeMenu() {
    const m = this._typeMenu;
    const row = this._rows[this._index(m.id)];
    if (!row || row.kind !== "item" || m.kind !== "type" || isHeader(row.item) || isUrl(row.item)) return "";
    const keys = (e) => {
      const items = [...e.currentTarget.querySelectorAll("[role=menuitemradio]")];
      const i = items.indexOf(this.shadowRoot.activeElement);
      if (e.key === "ArrowDown") items[(i + 1) % items.length]?.focus();
      else if (e.key === "ArrowUp") items[(i - 1 + items.length) % items.length]?.focus();
      else if (e.key === "Escape") {
        this._typeMenu = null;
        this._focusRow(row.id);
      } else return;
      e.preventDefault();
      e.stopPropagation();
    };
    return html`<div class="menu-layer" @click="${() => (this._typeMenu = null)}">
      <div class="type-menu" role="menu" aria-label="Becomes" style="left:${m.x}px;top:${m.y}px" @click="${(e) => e.stopPropagation()}" @keydown="${keys}">
        <div class="menu-label">Becomes</div>
        ${Object.entries(ROLES).map(
          ([v, r]) => html`<button role="menuitemradio" aria-checked="${row.item.as === v ? "true" : "false"}" @click="${() => this._setRole(row.id, v)}">
            <span class="check">${row.item.as === v ? lucide("oer:check", "sm") : ""}</span>${r.label}
          </button>`,
        )}
      </div>
    </div>`;
  }

  // add rows: a module at the top level; pages, a header or a link in one
  _renderAddRows(add, vis, vIdx) {
    if (add.depth === 0) {
      return html`<div class="add-wrap">
        ${this._renderAddRow(add, vis, vIdx, { label: "Add module", title: "Add a module: a week or unit", action: () => this._addModule(add.afterId) })}
      </div>`;
    }
    const extra = (icon, label, title, fn) => html`<button
      class="add-existing"
      title="${title}"
      @mouseenter="${() => (this._hoverAdd = { afterId: add.afterId, depth: add.depth })}"
      @mouseleave="${() => (this._hoverAdd = null)}"
      @click="${() => {
        this._hoverAdd = null;
        fn();
      }}"
    >
      ${lucide(icon, "sm")}${label}
    </button>`;
    return html`<div class="add-wrap">
      ${this._renderAddRow(add, vis, vIdx, {
        label: "Add pages",
        title: "Add pages from the site here (with their sub-pages, if you like)",
        action: () => this._addPages(add.afterId, add.depth),
      })}
      ${extra("oer:heading-2", "Add header", "Add a text header to the module", () => this._addItem(add.afterId, add.depth, { header: "" }))}
      ${extra("icons:link", "Add link", "Add a link to any web address, such as a video call", () => this._addItem(add.afterId, add.depth, { as: "url", title: "", url: "", newTab: true }))}
    </div>`;
  }

  _renderEmpty() {
    return html`<div class="empty">
      ${lucide("icons:date-range")}
      <p>No modules yet. Add one for each week or unit, then add pages to it.</p>
      <button class="btn outline" @click="${() => this._addModule(null)}">${lucide("oer:plus", "sm")}Add module</button>
    </div>`;
  }

  /* ---------- the selected item ---------- */

  // the page as the item shows it: its pinned release, else the latest
  _shownPage(item) {
    const page = this._byId?.get(item.page);
    if (!page || !item.version) return page;
    return versionsOf(page.id, this._items || []).find((v) => v.version === item.version)?.snapshot || page;
  }

  _renderDetail() {
    const row = this._rows.find((r) => r.id === this._selId);
    if (!row) return html`<div class="detail-empty">${lucide("icons:date-range")}<p>Select a module or an item to see it here.</p></div>`;
    if (row.kind === "module") return this._renderModuleDetail(row);
    const item = row.item;
    if (isHeader(item)) {
      return html`<div class="detail-pad settings">
        <div>
          <p class="eyebrow">Header</p>
          <h3 class="dtitle">${row.title || "Untitled header"}</h3>
        </div>
        <p class="hint">A text header in the module. Items indented under it are grouped with it in the LMS. Rename it in the outline (Enter).</p>
      </div>`;
    }
    if (isUrl(item)) {
      return html`<div class="detail-pad settings">
        <p class="eyebrow">Link</p>
        <label class="field">Title<input class="input" placeholder="Live session (Zoom)" .value="${row.title || ""}" @input="${(e) => this._setRow({ title: e.target.value })}" /></label>
        <label class="field">Web address<input class="input" type="url" placeholder="https://…" .value="${item.url || ""}" @input="${(e) => this._setItem({ url: e.target.value.trim() })}" /></label>
        <label class="check"><input type="checkbox" .checked="${item.newTab !== false}" @change="${(e) => this._setItem({ newTab: e.target.checked })}" />Open in a new tab</label>
        <p class="hint">For anything that isn't a page on this site: a video call, a tool, another site.</p>
      </div>`;
    }
    const page = this._byId?.get(item.page);
    const type = page ? contentTypes(this._items).types.find((t) => t.id === page.metadata?.pageType) : null;
    return html`<div class="detail-split">
      <div class="detail-pad settings">
        <div>
          <p class="eyebrow">${type?.label || "Page"}${item.version ? ` · pinned to v${item.version}` : ""}</p>
          <h3 class="dtitle">${page?.title || "This page isn't on the site any more"}</h3>
        </div>
        ${page ? this._renderItemSettings(row, item, page) : html`<p class="hint">Remove it from the sequence (Delete), or add the page again.</p>`}
      </div>
      ${page ? this._renderPreview(row, item, page) : ""}
    </div>`;
  }

  _renderPreview(row, item, page) {
    const shown = this._shownPage(item);
    const ready = this._previewId === row.id;
    return html`<div class="preview">
      <div class="preview-bar">
        <span>Page${item.version ? ` (v${item.version})` : ""}</span>
        <a href="${shown.slug}" target="_blank">${lucide("icons:open-in-new", "sm")}Open in a new tab</a>
      </div>
      ${ready ? html`<iframe src="${embedUrl(shown.slug)}" title="${page.title}"></iframe>` : html`<div class="frame-wait"></div>`}
    </div>`;
  }

  _renderModuleDetail(row) {
    const idx = this._index(row.id);
    const items = this._rows.slice(idx + 1, this._subtree(idx).end);
    const graded = items.filter((r) => ["assignment", "discussion"].includes(r.item.as) && r.item.graded !== false);
    const points = graded.reduce((s, r) => s + (Number(r.item.points) || 0), 0);
    return html`<div class="detail-pad settings">
      <p class="eyebrow">Module</p>
      <label class="field">Title<input class="input" .value="${row.title}" @input="${(e) => this._setRow({ title: e.target.value })}" /></label>
      <label class="field"
        >Teaching week
        <input
          class="input num"
          type="number"
          min="1"
          .value="${String(row.week || "")}"
          @change="${(e) => Number(e.target.value) > 0 && this._setRow({ week: Number(e.target.value) })}"
        />
        <span class="hint">Its items' due weeks move with it. Asynchronous courses open the module on this week's Monday.</span>
      </label>
      <p class="stat">${items.length} item${items.length === 1 ? "" : "s"}${graded.length ? `, ${graded.length} graded (${points} points)` : ""}</p>
      ${graded.length
        ? html`<ul class="due-list">
            ${graded.map((r) => html`<li><span>${r.title}</span><small>${this._summary(r.item)}</small></li>`)}
          </ul>`
        : ""}
    </div>`;
  }

  _group(item) {
    return html`<label class="field"
      >Grade group
      <select @change="${(e) => this._setItem({ group: e.target.value })}">
        <option value="" ?selected="${!item.group}">None</option>
        ${this._groups.map((g) => html`<option value="${g.id}" ?selected="${item.group === g.id}">${g.name}</option>`)}
      </select>
    </label>`;
  }

  _rubric(item) {
    return html`<label class="field"
      >Rubric
      <select @change="${(e) => this._setItem({ rubric: e.target.value })}">
        <option value="" ?selected="${!item.rubric}">None</option>
        ${this._rubrics.map((r) => html`<option value="${r.slug}" ?selected="${item.rubric === r.slug}">${r.name} (${r.criteria?.length || 0} criteria)</option>`)}
      </select>
    </label>`;
  }

  _due(item, label = "Due week") {
    const due = item.due || {};
    const dayValue = due.day || (due.rule === "first-class" ? "first-class" : "");
    const setDue = (patch) => this._setItem({ due: { ...due, ...patch } });
    return html`<div class="pair">
        <label class="field">${label}<input class="input" type="number" min="1" .value="${String(due.week ?? "")}" @input="${(e) => setDue({ week: Number(e.target.value) || "" })}" /></label>
        <label class="field">Time <span class="hint">optional</span><input class="input" type="time" .value="${due.time || ""}" @input="${(e) => setDue({ time: e.target.value || undefined })}" /></label>
      </div>
      <label class="field"
        >Due on
        <select @change="${(e) => (e.target.value === "first-class" ? setDue({ day: undefined, rule: "first-class" }) : setDue({ day: e.target.value || undefined, rule: undefined }))}">
          ${DAYS.map(([v, l]) => html`<option value="${v}" ?selected="${dayValue === v}">${l}</option>`)}
        </select>
        <span class="hint">The term's usual day and time are chosen at export (Sunday 11:59 pm unless changed).</span>
      </label>`;
  }

  _renderItemSettings(row, item, page) {
    const graded = item.graded !== false;
    const note = ROLES[item.as]?.note || "";
    return html`<label class="field"
        >Becomes
        <select @change="${(e) => this._setRole(row.id, e.target.value, false)}">
          ${Object.entries(ROLES).map(([v, r]) => html`<option value="${v}" ?selected="${item.as === v}">${r.label}</option>`)}
        </select>
        <span class="hint">${note ? `${note[0].toUpperCase()}${note.slice(1)}.` : ""}</span>
      </label>
      ${item.as === "assignment" ? this._renderAssignment(item, graded) : ""}
      ${item.as === "discussion" ? this._renderDiscussion(item, graded) : ""}
      ${item.as === "quiz"
        ? html`<label class="field"
              >Quiz
              <select @change="${(e) => this._setItem({ quizType: e.target.value })}">
                <option value="practice" ?selected="${item.quizType !== "graded"}">Practice (not graded)</option>
                <option value="graded" ?selected="${item.quizType === "graded"}">Graded</option>
              </select>
            </label>
            ${item.quizType === "graded" ? html`${this._due(item)}${this._group(item)}` : ""}
            <p class="hint">Built from the page's multiple-choice and true/false questions (a point each); self-checks become ungraded questions with their answer as feedback. Draft questions stay out until they're published.</p>`
        : ""}
      ${item.as === "file"
        ? attachmentsOf(page).length
          ? html`<label class="field"
              >File
              <select @change="${(e) => this._setItem({ file: e.target.value })}">
                ${attachmentsOf(page).map((f) => html`<option value="${f.url}" ?selected="${item.file === f.url}">${f.title || f.url.split("/").pop()}</option>`)}
              </select>
              <span class="hint">Copied into the course's files.</span>
            </label>`
          : html`<p class="hint">This page has no attachments. Add files to its Attachments field in Page details, then choose one here.</p>`
        : ""}`;
  }

  _renderAssignment(item, graded) {
    const subs = item.submission || [];
    return html`<label class="check"><input type="checkbox" .checked="${graded}" @change="${(e) => this._setItem({ graded: e.target.checked })}" />Graded</label>
      ${graded
        ? html`<div class="pair">
              <label class="field">Points<input class="input" type="number" min="0" .value="${String(item.points ?? "")}" @input="${(e) => this._setItem({ points: Number(e.target.value) || 0 })}" /></label>
              ${this._group(item)}
            </div>
            ${this._rubric(item)}`
        : ""}
      ${this._due(item)}
      <fieldset class="checks">
        <legend>Students submit</legend>
        ${Object.entries(SUBMISSION_TYPES).map(
          ([v, l]) =>
            html`<label class="check"
              ><input type="checkbox" .checked="${subs.includes(v)}" @change="${(e) => this._setItem({ submission: e.target.checked ? [...new Set([...subs, v])] : subs.filter((x) => x !== v) })}" />${l}</label
            >`,
        )}
      </fieldset>
      ${subs.includes("online_upload")
        ? html`<label class="field"
            >Allowed file types <span class="hint">optional, separated by commas</span
            ><input
              class="input"
              placeholder="pdf, jpg, stl"
              .value="${(item.extensions || []).join(", ")}"
              @change="${(e) => this._setItem({ extensions: e.target.value.split(/[\s,]+/).map((x) => x.replace(/^\./, "").toLowerCase()).filter(Boolean) })}"
          /></label>`
        : ""}
      ${graded
        ? html`<label class="check"><input type="checkbox" .checked="${!!item.peerReviews}" @change="${(e) => this._setItem({ peerReviews: e.target.checked ? { count: 2, anonymous: false } : undefined })}" />Peer reviews</label>
            ${item.peerReviews
              ? html`<div class="pair">
                  <label class="field"
                    >Reviews each<input class="input" type="number" min="1" .value="${String(item.peerReviews.count ?? 2)}" @input="${(e) => this._setItem({ peerReviews: { ...item.peerReviews, count: Math.max(1, Number(e.target.value) || 1) } })}"
                  /></label>
                  <label class="check end"><input type="checkbox" .checked="${!!item.peerReviews.anonymous}" @change="${(e) => this._setItem({ peerReviews: { ...item.peerReviews, anonymous: e.target.checked } })}" />Anonymous</label>
                </div>`
              : ""}`
        : ""}
      <label class="check"><input type="checkbox" .checked="${!!item.groupSet}" @change="${(e) => this._setItem({ groupSet: e.target.checked ? "Project groups" : undefined, gradeIndividually: undefined })}" />Group assignment</label>
      ${item.groupSet
        ? html`<label class="field">Group set<input class="input" .value="${item.groupSet}" @input="${(e) => this._setItem({ groupSet: e.target.value })}" /></label>
            <label class="check"><input type="checkbox" .checked="${!!item.gradeIndividually}" @change="${(e) => this._setItem({ gradeIndividually: e.target.checked })}" />Grade each student individually</label>`
        : ""}`;
  }

  _renderDiscussion(item, graded) {
    return html`<label class="check"><input type="checkbox" .checked="${graded}" @change="${(e) => this._setItem({ graded: e.target.checked })}" />Graded</label>
      ${graded
        ? html`<div class="pair">
              <label class="field">Points<input class="input" type="number" min="0" .value="${String(item.points ?? "")}" @input="${(e) => this._setItem({ points: Number(e.target.value) || 0 })}" /></label>
              ${this._group(item)}
            </div>
            ${this._rubric(item)}`
        : ""}
      ${this._due(item, graded ? "Posts due week" : "Week")}
      <label class="field"
        >Replies required<input class="input num" type="number" min="0" .value="${String(item.replies ?? 0)}" @input="${(e) => this._setItem({ replies: Math.max(0, Number(e.target.value) || 0) })}"
      /></label>
      <label class="field"
        >More requirements <span class="hint">one per line</span>
        <textarea
          class="input"
          rows="3"
          placeholder="Name what's working and one change you'd try"
          .value="${(item.requirements || []).join("\n")}"
          @change="${(e) => this._setItem({ requirements: e.target.value.split("\n").map((l) => l.trim()).filter(Boolean) })}"
        ></textarea>
      </label>
      <label class="check"><input type="checkbox" .checked="${!!item.requireInitialPost}" @change="${(e) => this._setItem({ requireInitialPost: e.target.checked })}" />Students post before they see others' replies</label>
      <label class="check"><input type="checkbox" .checked="${!!item.groupSet}" @change="${(e) => this._setItem({ groupSet: e.target.checked ? "Critique groups" : undefined })}" />Group discussion</label>
      ${item.groupSet ? html`<label class="field">Group set<input class="input" .value="${item.groupSet}" @input="${(e) => this._setItem({ groupSet: e.target.value })}" /></label>` : ""}
      <p class="hint">The prompt opens with the requirements (posting by the due date, the replies, these lines, the rubric), then the page.</p>`;
  }

  /* ---------- course settings: a sheet from the right ---------- */

  _openSheet() {
    this._typeMenu = null;
    this._sheet = true;
    this.updateComplete.then(() => this.shadowRoot.querySelector(".sheet input, .sheet select")?.focus());
  }

  _closeSheet() {
    this._sheet = false;
    this.updateComplete.then(() => this.shadowRoot.querySelector(".settings-btn")?.focus());
  }

  // Tab stays inside the sheet while it's open
  _sheetKeys(e) {
    if (e.key !== "Tab") return;
    const all = [...e.currentTarget.querySelectorAll("button, input, select, textarea")].filter((el) => !el.disabled);
    const first = all[0];
    const last = all.at(-1);
    const active = this.shadowRoot.activeElement;
    if (e.shiftKey && active === first) {
      last?.focus();
      e.preventDefault();
    } else if (!e.shiftKey && active === last) {
      first?.focus();
      e.preventDefault();
    }
  }

  _renderSheet() {
    const total = this._groups.reduce((s, g) => s + (Number(g.weight) || 0), 0);
    const setGroups = (fn) => {
      const g = clone(this._groups);
      fn(g);
      this._groups = g;
    };
    const setScale = (fn) => {
      const s = clone(this._scale);
      fn(s);
      this._scale = s;
    };
    return html`<div class="sheet-layer" @click="${this._closeSheet}">
      <aside class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-t" @click="${(e) => e.stopPropagation()}" @keydown="${this._sheetKeys}">
        <header class="sheet-head">
          <div>
            <h3 id="sheet-t">Course settings</h3>
            <p class="sub">For every term this sequence runs. Term dates are chosen at export.</p>
          </div>
          <button class="x" aria-label="Close course settings" title="Close (Esc)" @click="${this._closeSheet}">${lucide("oer:x")}</button>
        </header>
        <div class="sheet-body settings">
          <div class="pair">
            <label class="field"
              >Length (weeks)<input class="input" type="number" min="1" .value="${String(this._fields.weeks)}" @input="${(e) => (this._fields = { ...this._fields, weeks: Number(e.target.value) || "" })}"
            /></label>
            <label class="field"
              >Delivery
              <select @change="${(e) => (this._fields = { ...this._fields, delivery: e.target.value })}">
                ${DELIVERY.map((d) => html`<option value="${d}" ?selected="${this._fields.delivery === d}">${d}</option>`)}
              </select>
            </label>
          </div>
          <section aria-labelledby="groups-t">
            <h4 id="groups-t">Grade groups</h4>
            <div class="rows">
              ${this._groups.map(
                (g, gi) => html`<div class="entry">
                  <input class="input" aria-label="Group name" .value="${g.name}" @input="${(e) => setGroups((x) => (x[gi].name = e.target.value))}" />
                  <input class="input num" type="number" min="0" max="100" aria-label="${g.name} weight (%)" .value="${String(g.weight ?? "")}" @input="${(e) => setGroups((x) => (x[gi].weight = Number(e.target.value) || 0))}" />
                  <span class="unit">%</span>
                  <button class="icon" aria-label="Remove ${g.name}" title="Remove" @click="${() => setGroups((x) => x.splice(gi, 1))}">${lucide("oer:x", "sm")}</button>
                </div>`,
              )}
            </div>
            <p class="total ${this._groups.length && Math.round(total) !== 100 ? "off" : ""}">Total ${Math.round(total * 10) / 10}%${this._groups.length && Math.round(total) !== 100 ? " (should be 100%)" : ""}</p>
            <button class="btn outline small" @click="${() => setGroups((x) => x.push({ id: uid(), name: "New group", weight: 0 }))}">${lucide("oer:plus", "sm")}Add group</button>
            <p class="hint">The LMS weights groups, not single assignments. Within a group, points set each assignment's share.</p>
          </section>
          <section aria-labelledby="scale-t">
            <h4 id="scale-t">Rubric point scale</h4>
            <div class="rows">
              ${this._scale.map(
                (l, li) => html`<div class="entry">
                  <input class="input" aria-label="Rating name" .value="${l.name}" @input="${(e) => setScale((x) => (x[li].name = e.target.value))}" />
                  <input
                    class="input num"
                    type="number"
                    min="0"
                    max="100"
                    aria-label="${l.name} (% of the criterion's points)"
                    .value="${String(Math.round((l.share ?? 0) * 100))}"
                    @input="${(e) => setScale((x) => (x[li].share = (Number(e.target.value) || 0) / 100))}"
                  />
                  <span class="unit">%</span>
                  <button class="icon" aria-label="Remove ${l.name}" title="Remove" @click="${() => setScale((x) => x.splice(li, 1))}">${lucide("oer:x", "sm")}</button>
                </div>`,
              )}
            </div>
            <button class="btn outline small" @click="${() => setScale((x) => x.push({ name: "New rating", share: 0.5 }))}">${lucide("oer:plus", "sm")}Add rating</button>
            <p class="hint">Every rubric criterion gets these ratings, as a share of its points. An assignment's points are split evenly across its rubric's criteria.</p>
          </section>
        </div>
        <footer class="sheet-foot"><button class="btn primary" @click="${this._closeSheet}">Done</button></footer>
      </aside>
    </div>`;
  }

  /* ---------- render ---------- */

  static get styles() {
    return [
      super.styles,
      css`
        .dialog {
          width: min(90rem, calc(100vw - 1.5rem));
          height: calc(100dvh - 1.5rem);
        }
        .headtools {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .split {
          flex: 1;
          min-height: 0;
          display: grid;
          grid-template-columns: minmax(22rem, 1fr) minmax(24rem, 1.2fr);
        }
        .left {
          display: flex;
          flex-direction: column;
          min-height: 0;
          border-right: 1px solid var(--border);
        }
        .right {
          min-height: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        /* the item shown on the right */
        .row.current {
          background: color-mix(in oklch, var(--primary) 9%, transparent);
          box-shadow: inset 3px 0 0 var(--primary);
          color: var(--foreground);
        }
        .row.current:focus-visible {
          box-shadow:
            inset 3px 0 0 var(--primary),
            inset 0 0 0 2px var(--ring);
        }
        .chip {
          flex: none;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          height: 1.25rem;
          margin-right: 0.25rem;
          padding: 0 0.5rem;
          border-radius: 999px;
          font-size: 0.6875rem;
          font-weight: 500;
          white-space: nowrap;
          color: var(--muted-foreground);
        }
        .chip.week {
          background: var(--muted);
          color: var(--foreground);
        }
        .chip.quiet {
          border: 1px dashed var(--border);
        }
        .type-chip {
          white-space: nowrap;
        }
        .type-chip.graded {
          color: var(--foreground);
          background: transparent;
          box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--primary) 50%, var(--border));
        }
        .detail-empty {
          margin: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 2rem;
          color: var(--muted-foreground);
          font-size: 0.875rem;
          text-align: center;
        }
        .detail-empty .lucide {
          width: 1.5rem;
          height: 1.5rem;
          opacity: 0.5;
        }
        .detail-split {
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }
        .detail-pad {
          padding: 1rem 1.25rem 1.25rem;
          overflow-y: auto;
        }
        .detail-split > .detail-pad {
          flex: 0 1 auto;
          max-height: 50%;
          border-bottom: 1px solid var(--border);
        }
        .eyebrow {
          margin: 0;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--muted-foreground);
        }
        .dtitle {
          margin: 0.125rem 0 0;
          font-size: 1rem;
          font-weight: 600;
        }
        .settings {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }
        label.field {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          font-size: 0.8125rem;
          font-weight: 500;
        }
        .input,
        .settings select {
          box-sizing: border-box;
          width: 100%;
          height: 2.25rem;
          padding: 0 0.75rem;
          border: 1px solid var(--input-border, var(--border));
          border-radius: var(--radius-md);
          background: var(--background);
          color: inherit;
          font: inherit;
          font-size: 0.875rem;
        }
        .input:focus-visible,
        .settings select:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 1px;
        }
        textarea.input {
          height: auto;
          padding: 0.5rem 0.75rem;
          resize: vertical;
        }
        .input.num {
          width: 5.5rem;
          flex: none;
        }
        .hint {
          margin: 0;
          font-size: 0.75rem;
          font-weight: 400;
          color: var(--muted-foreground);
        }
        .pair {
          display: flex;
          gap: 0.75rem;
        }
        .pair > * {
          flex: 1;
          min-width: 0;
        }
        .check {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
        }
        .check.end {
          align-self: end;
          padding-bottom: 0.5rem;
        }
        .check input {
          width: 1rem;
          height: 1rem;
          margin: 0;
          accent-color: var(--primary);
        }
        fieldset.checks {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          margin: 0;
          padding: 0;
          border: 0;
        }
        fieldset.checks legend {
          margin-bottom: 0.375rem;
          padding: 0;
          font-size: 0.8125rem;
          font-weight: 500;
        }
        .stat {
          margin: 0;
          font-size: 0.875rem;
        }
        .due-list {
          margin: 0;
          padding: 0;
          list-style: none;
          font-size: 0.875rem;
        }
        .due-list li {
          display: flex;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 0.375rem 0;
          border-bottom: 1px solid var(--border);
        }
        .due-list small {
          font-size: 0.75rem;
          color: var(--muted-foreground);
          white-space: nowrap;
        }
        .preview {
          flex: 1 1 0;
          min-height: 14rem;
          display: flex;
          flex-direction: column;
          background: var(--muted);
        }
        .preview-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding: 0.5rem 1.25rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--muted-foreground);
        }
        .preview-bar a {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          color: var(--link, var(--primary));
        }
        .preview iframe,
        .frame-wait {
          flex: 1;
          margin: 0 1.25rem 1.25rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--background);
        }
        /* shadcn Sheet: course settings, from the right */
        .settings-btn {
          height: 2rem;
          padding: 0 0.75rem;
          font-size: 0.8125rem;
        }
        .sheet-layer {
          position: absolute;
          inset: 0;
          z-index: 20;
          background: rgb(0 0 0 / 0.35);
        }
        .sheet {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(28rem, 100%);
          display: flex;
          flex-direction: column;
          background: var(--background);
          border-left: 1px solid var(--border);
          box-shadow: -16px 0 40px rgb(0 0 0 / 0.18);
        }
        .sheet-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.5rem;
          padding: 1rem 0.75rem 1rem 1.25rem;
          border-bottom: 1px solid var(--border);
        }
        .sheet-head h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }
        .sheet-body {
          flex: 1;
          overflow-y: auto;
          padding: 1.25rem;
          gap: 1.5rem;
        }
        .sheet-body section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .sheet-body h4 {
          margin: 0;
          font-size: 0.875rem;
          font-weight: 600;
        }
        .sheet-body .rows {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }
        .sheet-body .entry {
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }
        .sheet-body .entry .input:first-child {
          flex: 1;
          min-width: 0;
        }
        .unit {
          font-size: 0.8125rem;
          color: var(--muted-foreground);
        }
        .btn.small {
          align-self: flex-start;
          height: 2rem;
          padding: 0 0.75rem;
          font-size: 0.8125rem;
        }
        .sheet-foot {
          justify-content: flex-end;
        }
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
        .icon:hover {
          background: var(--accent);
          color: var(--foreground);
        }
        .icon:focus-visible,
        .x:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 1px;
        }
        .total {
          margin: 0;
          font-size: 0.8125rem;
          color: var(--muted-foreground);
          font-variant-numeric: tabular-nums;
        }
        .total.off {
          color: var(--destructive);
        }
        /* things to check before exporting */
        .checklist {
          flex: none;
          max-height: 10rem;
          overflow-y: auto;
          margin: 0;
          padding: 0.625rem 1.25rem 0.75rem 2.5rem;
          border-top: 1px solid var(--border);
          background: var(--muted);
          font-size: 0.8125rem;
        }
        .checklist li + li {
          margin-top: 0.25rem;
        }
        .status {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.8125rem;
          white-space: nowrap;
        }
        .linkbtn {
          all: unset;
          color: var(--link, var(--primary));
          text-decoration: underline;
          text-underline-offset: 2px;
          cursor: pointer;
        }
        .linkbtn:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
        }
        @media (max-width: 960px) {
          .split {
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: minmax(14rem, 1fr) minmax(18rem, 1.2fr);
          }
          .left {
            border-right: 0;
            border-bottom: 1px solid var(--border);
          }
          .hints {
            display: none;
          }
        }
      `,
    ];
  }

  render() {
    if (!this.open) return html``;
    const vis = this._visible();
    const page = this._page;
    const dirty = this._dirty;
    const draft = page
      ? { ...page, metadata: { ...page.metadata, oerSequence: this._sequence(), oerFields: { ...(page.metadata?.oerFields || {}), weeks: this._fields.weeks } } }
      : null;
    const checks = draft ? readiness(draft, this._items || []) : [];
    const modules = this._rows.filter((r) => r.kind === "module").length;
    const itemCount = this._rows.length - modules;
    const anyKids = this._rows.some((_, i) => this._hasChildren(i));
    return html`
      <div class="backdrop" @click="${this._requestClose}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${lucide("icons:date-range")}${page?.title || "Course sequence"}</h2>
            <p class="sub">${this._fields.weeks || "?"} weeks, ${String(this._fields.delivery).toLowerCase()}. Changes apply when you save.</p>
          </div>
          <div class="headtools">
            <button class="btn outline settings-btn" aria-haspopup="dialog" aria-expanded="${this._sheet ? "true" : "false"}" @click="${this._openSheet}">
              ${lucide("oer:sliders-horizontal", "sm")}Course settings
            </button>
            <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._requestClose}">${lucide("oer:x")}</button>
          </div>
        </header>
        <div class="split">
          <section class="left" aria-label="Outline">
            <div class="tools">
              ${anyKids
                ? html`<button class="tool" @click="${this._collapseAll}">${lucide("oer:chevron-right", "sm")}Collapse all</button>
                    <button class="tool" @click="${() => (this._collapsed = new Set())}">${lucide("oer:chevron-down", "sm")}Expand all</button>`
                : ""}
              <span class="count">${modules} module${modules === 1 ? "" : "s"} · ${itemCount} item${itemCount === 1 ? "" : "s"}</span>
            </div>
            <div class="body">${this._renderTree(vis, "Modules")}</div>
          </section>
          <section class="right" aria-label="Selected item">${this._renderDetail()}</section>
        </div>
        ${this._showChecks && checks.length ? html`<ul class="checklist" id="checks">${checks.map((c) => html`<li>${c.text}</li>`)}</ul>` : ""}
        <footer>
          ${this._confirmDiscard
            ? html`<span class="warn">Discard your changes to this sequence?</span>
                <button class="btn outline" @click="${() => (this._confirmDiscard = false)}">Keep editing</button>
                <button class="btn destructive" @click="${this._close}">Discard</button>`
            : html`<span class="status">
                  ${checks.length
                    ? html`${lucide("oer:circle-alert", "sm")}<button class="linkbtn" aria-expanded="${this._showChecks ? "true" : "false"}" aria-controls="checks" @click="${() => (this._showChecks = !this._showChecks)}">
                          ${checks.length} thing${checks.length === 1 ? "" : "s"} to check before exporting
                        </button>`
                    : html`${lucide("oer:check", "sm")}Ready to export`}
                </span>
                <div class="hints" aria-hidden="true">
                  <span><kbd>↵</kbd> rename</span><span><kbd>⇥</kbd> indent</span><span><kbd>⇧⇥</kbd> outdent</span><span><kbd>⌥↑↓</kbd> move</span><span><kbd>↑↓</kbd> navigate</span><span><kbd>T</kbd> role</span><span><kbd>Del</kbd> remove</span>
                  <span>drag ↔ to indent</span>
                </div>
                <button class="btn outline" @click="${this._requestClose}">Cancel</button>
                <button class="btn primary" aria-disabled="${dirty && !this._saving ? "false" : "true"}" @click="${() => dirty && !this._saving && this._save()}">
                  ${this._saving ? "Saving…" : "Save sequence"}
                </button>`}
        </footer>
        ${this._typeMenu ? this._renderTypeMenu() : ""}
        ${this._sheet ? this._renderSheet() : ""}
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
