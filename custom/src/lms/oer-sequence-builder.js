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
 * The right column shows the selected item's Settings or its page's Preview
 * (tabs, with buttons to step through the sequence); the header's Outline
 * and Item buttons hide either column to give the other the whole width.
 * The layout and tab are remembered in this browser.
 *
 * Items: a page (the live page, embedded), an assignment (due week and day,
 * points, submissions, rubric, grade group, peer reviews, group work), a
 * discussion (an open thread; graded ones with points, a due date,
 * requirements and a rubric), a quiz, a link, a file; text headers and links
 * to any address. Course settings: length, delivery, grade groups and
 * weights. Rubrics are the site's rubric pages, each with its own levels. Term dates come at export
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
import { findRubric, rubricPages, rubricOf, rubricAt, itemRubric, rubricDiffers, isGradedItem, criterionPoints } from "../rubrics/rubric-model.js";
import { rubricEditor } from "../rubrics/oer-rubric-editor.js";
import { moduleWeekLabel } from "./sequence-model.js";
import "../ui/oer-text-editor.js";
import { formControls } from "../ui/form-controls.js";

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
const LAYOUT_KEY = "oer-sequence-builder:layout";
const clone = (o) => JSON.parse(JSON.stringify(o));
const uid = () => `m${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
const isHeader = (item) => item?.header !== undefined;
const isUrl = (item) => item?.as === "url";
const isText = (item) => item?.as === "text";

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
      _fields: { state: true },
      _sheet: { state: true },
      _layout: { state: true }, // { outline, detail }: which columns show
      _tab: { state: true }, // "settings" | "preview"
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
    this._groups = [];
    this._fields = { weeks: 15, delivery: "In person" };
    this._layout = { outline: true, detail: true };
    this._tab = "settings";
    try {
      const saved = JSON.parse(globalThis.localStorage.getItem(LAYOUT_KEY) || "{}");
      if (saved.outline === false || saved.detail === false) this._layout = { outline: saved.outline !== false, detail: saved.detail !== false };
      if (saved.tab === "preview") this._tab = "preview";
    } catch {
      // no storage: the default layout
    }
  }

  /* ---------- layout: columns and tabs ---------- */

  _saveLayout() {
    try {
      globalThis.localStorage.setItem(LAYOUT_KEY, JSON.stringify({ ...this._layout, tab: this._tab }));
    } catch {
      // not remembered
    }
  }

  // hide or show a column; hiding the only one left shows the other
  _togglePanel(name) {
    const next = { ...this._layout, [name]: !this._layout[name] };
    if (!next.outline && !next.detail) next[name === "outline" ? "detail" : "outline"] = true;
    this._layout = next;
    this._saveLayout();
  }

  _setTab(tab) {
    this._tab = tab;
    this._saveLayout();
  }

  // the previous or next row, for moving through the sequence from the
  // right column (with the outline hidden, say)
  _step(delta) {
    const next = this._rows[this._index(this._selId) + delta];
    if (!next) return;
    this._select(next.id);
    this.updateComplete.then(() => this.shadowRoot.querySelector(`[role=treeitem][data-id="${next.id}"]`)?.scrollIntoView({ block: "nearest" }));
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
    this._moduleRules = seq.moduleRules || "";
    this._hadRules = !!seq.moduleRules;
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
  }

  // the sequence as outline rows: modules at depth 0, items at 1 + indent
  _rowsOf(seq) {
    const rows = [];
    for (const m of seq.modules) {
      // spans, overviews, order rules, prerequisites… ride along
      const { id, title, week, items, ...mod } = m;
      const moduleId = id || uid();
      rows.push({ id: moduleId, kind: "module", title: title || "", week: Number(week) || "", mod: clone(mod), depth: 0, orig: true });
      // the module's overview: its first row, as its to-do page is in the LMS
      if (mod.overview) rows.push({ id: `ov-${moduleId}`, kind: "overview", moduleId, title: mod.overview.title || "", depth: 1, orig: true });
      for (const it of m.items || []) {
        const { indent, ...item } = it;
        rows.push(this._itemRow(item, 1 + indentOf(it), true));
      }
    }
    return rows;
  }

  _itemRow(item, depth, orig = null) {
    // a page's row shows the title it's listed under in the LMS, if it has one
    const title = isHeader(item) ? item.header : isUrl(item) || isText(item) ? item.title || "" : item.title || this._byId?.get(item.page)?.title || "";
    return { id: newItemId(), kind: "item", item, title, type: isHeader(item) ? HEADING_TYPE : "", depth: Math.min(depth, MAX_DEPTH), orig };
  }

  // rows back into the sequence's modules (blank headers are dropped)
  _toModules(rows = this._rows) {
    const modules = [];
    for (const r of rows) {
      if (r.kind === "module") modules.push({ id: r.id, title: r.title, week: Number(r.week) || "", ...(r.mod || {}), items: [] });
      else if (r.kind === "overview") {
        const m = modules.at(-1);
        if (m?.overview) {
          const { title, ...rest } = m.overview;
          m.overview = r.title.trim() ? { ...rest, title: r.title.trim() } : rest;
        }
      } else if (modules.length) {
        const item = clone(r.item);
        if (isHeader(item)) {
          if (!r.title.trim()) continue;
          item.header = r.title.trim();
        }
        if (isUrl(item) || isText(item)) item.title = r.title;
        modules.at(-1).items.push({ ...item, indent: Math.max(0, r.depth - 1) });
      }
    }
    return modules;
  }

  _sequence() {
    return { version: 1, modules: this._toModules(), groups: this._groups, ...(this._moduleRules ? { moduleRules: this._moduleRules } : {}) };
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

  // modules stay at the top; items stay inside a module; items above the
  // first module join it
  _normalize(rows) {
    // a module with an overview has its overview row first, at depth 1
    // (dragged elsewhere, it goes back; made or removed with the overview)
    const overviews = new Map(rows.filter((r) => r.kind === "overview").map((r) => [r.moduleId, r]));
    const out = [];
    const leading = [];
    // items stay inside a module; their indent is their own (an LMS indents
    // any item, so an imported course's first item can sit one level in)
    const place = (r) => {
      const depth = Math.max(1, Math.min(r.depth, MAX_DEPTH));
      out.push(depth === r.depth ? r : { ...r, depth });
    };
    for (const r of rows) {
      if (r.kind === "overview") continue;
      if (r.kind === "module") {
        out.push(r.depth === 0 ? r : { ...r, depth: 0 });
        if (r.mod?.overview) {
          const ov = overviews.get(r.id) || { id: `ov-${r.id}`, kind: "overview", moduleId: r.id, title: r.mod.overview.title || "", depth: 1, orig: null };
          out.push(ov.depth === 1 ? ov : { ...ov, depth: 1 });
        }
        leading.splice(0).forEach(place);
      } else if (out.length) place(r);
      else leading.push(r);
    }
    return [...out, ...leading];
  }

  // change a module's settings (spans, overview, order…)
  _setModuleMod(moduleId, patch) {
    this._commit(this._rows.map((r) => (r.id === moduleId ? { ...r, mod: { ...(r.mod || {}), ...patch } } : r)));
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
    const kind = this._rows[this._index(d.id)]?.kind;
    return kind === "module" ? 0 : kind === "overview" ? 1 : Math.max(1, depth);
  }

  // Alt+↑ on a module's first item moves it to the end of the module before
  _moveUp(id) {
    if (this._rows[this._index(id)]?.kind === "overview") return;
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
    if (this._rows[this._index(id)]?.kind === "overview") return;
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
    return row.kind === "module" || row.kind === "overview" || isHeader(row.item) || isUrl(row.item) || isText(row.item);
  }

  _placeholder(row) {
    if (row.kind === "module") return "Module title…";
    if (row.kind === "overview") return `${this._rows.find((r) => r.id === row.moduleId)?.title || "Module"}: To do`;
    if (isHeader(row.item)) return "Header…";
    if (isText(row.item)) return "Page title…";
    return "Link title…";
  }

  _setMod(patch) {
    const row = this._rows.find((r) => r.id === this._selId);
    if (row) this._setRow({ mod: { ...(row.mod || {}), ...patch } });
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
    // removing the overview row removes the overview (its items stay)
    if (this._rows[idx].kind === "overview") {
      const moduleId = this._rows[idx].moduleId;
      this._commit(this._rows.filter((r) => r.id !== id).map((r) => (r.id === moduleId ? { ...r, mod: { ...(r.mod || {}), overview: undefined } } : r)));
      this._select(moduleId);
      this._focusRow(moduleId);
      return;
    }
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
    if (isText(item)) return "Sequence page";
    if (item.as === "assignment") return graded ? [`${item.points || 0} pts`, item.due?.week ? `wk ${item.due.week}` : "no due week"].join(" · ") : "Ungraded";
    if (item.as === "discussion") return ["Discussion", graded && item.points ? `${item.points} pts` : "", graded && item.due?.week ? `wk ${item.due.week}` : ""].filter(Boolean).join(" · ");
    if (item.as === "quiz") return item.quizType === "graded" ? "Graded quiz" : "Practice quiz";
    return ROLES[item.as]?.label || "Page";
  }

  _renderRowChips(row, index) {
    if (row.kind === "module") {
      const empty = !this._hasChildren(index);
      const label = moduleWeekLabel({ week: row.week, weeks: row.mod?.weeks });
      return html`${empty ? html`<span class="chip quiet">Empty</span>` : ""}<span class="chip week" title="When it runs">${label}</span>`;
    }
    if (row.kind === "overview") {
      const ov = this._rows.find((r) => r.id === row.moduleId)?.mod?.overview;
      return html`<span class="chip quiet" title="The module's overview page">${lucide("oer:file-text", "sm")}${ov?.mode === "list" ? "Overview: note + to-do list" : "Overview"}</span>`;
    }
    const item = row.item;
    if (isHeader(item)) return "";
    if (isUrl(item)) return html`<span class="chip quiet">${lucide("icons:link", "sm")}Link</span>`;
    if (isText(item)) return html`<span class="chip quiet" title="A page the sequence holds: exported as an LMS page, not in the library">${lucide("oer:file-text", "sm")}Sequence page</span>`;
    const label = this._summary(item);
    const graded = ["assignment", "discussion"].includes(item.as) || (item.as === "quiz" && item.quizType === "graded");
    // the rubric it's graded with (its own, or its page's)
    let rubricChip = "";
    if (isGradedItem(item)) {
      const info = this._rubricInfo(item);
      const name = info.rubric ? info.rubric.title.replace(/\s*rubric$/i, "") : "";
      rubricChip = info.rubric
        ? html`<span class="chip rubric ${info.differs ? "warn" : ""}" title="${info.differs ? `Graded with ${info.rubric.title}; its page shows ${info.pageRubric.title}` : `Graded with ${info.rubric.title}${info.r.from === "page" ? " (its page's rubric)" : ""}`}"
            >${lucide("icons:assignment-turned-in", "sm")}<span class="chip-text">${name}</span></span
          >`
        : Number(item.points) > 0
          ? html`<span class="chip rubric warn" title="Graded with points only: no rubric">${lucide("icons:assignment-turned-in", "sm")}No rubric</span>`
          : "";
    }
    return html`${item.version ? html`<span class="chip quiet" title="Pinned to version ${item.version}">v${item.version}</span>` : ""}${rubricChip}
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
        title="${row.kind === "module" ? "Remove the module and its items (Delete)" : row.kind === "overview" ? "Remove the overview (Delete). Its items stay." : "Remove from the sequence (Delete). The page is kept."}"
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
    if (!row || row.kind !== "item" || m.kind !== "type" || isHeader(row.item) || isUrl(row.item) || isText(row.item)) return "";
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
      ${extra("oer:file-text", "Add sequence page", "A page this sequence holds (welcome, syllabus, policies): exported as an LMS page, not in the library", () => this._addItem(add.afterId, add.depth, { as: "text", title: "", html: "" }))}
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

  // the selected row: its settings, or its page's preview, one tab at a time
  _renderDetail() {
    const row = this._rows.find((r) => r.id === this._selId);
    const page = row?.kind === "item" && row.item.page ? this._byId?.get(row.item.page) : null;
    const tab = page && this._tab === "preview" ? "preview" : "settings";
    const shown = page ? this._shownPage(row.item) : null;
    const at = row ? this._index(row.id) : -1;
    // arrow keys move between the tabs (and choose them)
    const tabKeys = (e) => {
      if (!page || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
      e.preventDefault();
      const next = e.key === "Home" ? "settings" : e.key === "End" ? "preview" : tab === "settings" ? "preview" : "settings";
      this._setTab(next);
      this.updateComplete.then(() => this.shadowRoot.getElementById(`tab-${next}`)?.focus());
    };
    const tabButton = (id, label, disabled = false) => html`<button
      role="tab"
      id="tab-${id}"
      class="tab"
      aria-selected="${tab === id ? "true" : "false"}"
      aria-controls="panel-${id}"
      aria-disabled="${disabled ? "true" : "false"}"
      tabindex="${tab === id ? "0" : "-1"}"
      title="${disabled ? "Only pages have a preview" : ""}"
      @click="${() => !disabled && this._setTab(id)}"
    >
      ${label}
    </button>`;
    return html`<div class="detail-bar">
        <div class="tabs" role="tablist" aria-label="Selected item" @keydown="${tabKeys}">${tabButton("settings", "Settings")}${tabButton("preview", "Preview", !page)}</div>
        <div class="stepper">
          <button class="icon" aria-label="Previous item" title="Previous item" ?disabled="${at <= 0}" @click="${() => this._step(-1)}">${lucide("oer:chevron-left", "sm")}</button>
          <button class="icon" aria-label="Next item" title="Next item" ?disabled="${at < 0 || at >= this._rows.length - 1}" @click="${() => this._step(1)}">${lucide("oer:chevron-right", "sm")}</button>
        </div>
        ${tab === "preview" ? html`<a class="open-link" href="${shown.slug}" target="_blank">${lucide("icons:open-in-new", "sm")}Open in a new tab</a>` : ""}
      </div>
      <div class="tabpanel" role="tabpanel" id="panel-settings" aria-labelledby="tab-settings" ?hidden="${tab !== "settings"}">${this._renderSettings(row, page)}</div>
      ${page
        ? html`<div class="tabpanel preview" role="tabpanel" id="panel-preview" aria-labelledby="tab-preview" ?hidden="${tab !== "preview"}">
            ${this._renderPreview(row, page, shown, tab === "preview")}
          </div>`
        : ""}`;
  }

  _renderSettings(row, page) {
    if (!row) return html`<div class="detail-empty">${lucide("icons:date-range")}<p>Select a module or an item to see it here.</p></div>`;
    if (row.kind === "module") return this._renderModuleDetail(row);
    if (row.kind === "overview") return this._renderOverviewDetail(row);
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
    if (isText(item)) {
      return html`<div class="detail-pad settings">
        <p class="eyebrow">Sequence page</p>
        <label class="field">Title<input class="input" placeholder="Welcome to the course" .value="${row.title || ""}" @input="${(e) => this._setRow({ title: e.target.value })}" /></label>
        <div class="field-block">
          <p class="field-label" id="text-l">Page</p>
          <oer-text-editor label="Page text" placeholder="What students read on this page" .value="${item.html || ""}" @change="${(e) => this._setItem({ html: e.detail.value })}"></oer-text-editor>
        </div>
        <p class="hint">A page this sequence holds, for running the course: a welcome, the syllabus, policies. It's exported to the LMS as a page of its own and stays out of the site's library.</p>
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
    const type = page ? contentTypes(this._items).types.find((t) => t.id === page.metadata?.pageType) : null;
    return html`<div class="detail-pad settings">
      <div>
        <p class="eyebrow">${type?.label || "Page"}${item.version ? ` · pinned to v${item.version}` : ""}</p>
        <h3 class="dtitle">${page?.title || "This page isn't on the site any more"}</h3>
      </div>
      ${page ? this._renderItemSettings(row, item, page) : html`<p class="hint">Remove it from the sequence (Delete), or add the page again.</p>`}
    </div>`;
  }

  // the page loads once its tab is opened (and stays loaded while the item
  // is selected), after the selection settles
  _renderPreview(row, page, shown, active) {
    const settled = this._previewId === row.id;
    if (active && settled) this._framed = row.id;
    return settled && this._framed === row.id ? html`<iframe src="${embedUrl(shown.slug)}" title="${page.title}"></iframe>` : html`<div class="frame-wait"></div>`;
  }

  _renderModuleDetail(row) {
    const idx = this._index(row.id);
    const items = this._rows.slice(idx + 1, this._subtree(idx).end).filter((r) => r.kind === "item");
    const graded = items.filter((r) => ["assignment", "discussion"].includes(r.item.as) && r.item.graded !== false);
    const points = graded.reduce((s, r) => s + (Number(r.item.points) || 0), 0);
    return html`<div class="detail-pad settings">
      <p class="eyebrow">Module</p>
      <label class="field">Title<input class="input" .value="${row.title}" @input="${(e) => this._setRow({ title: e.target.value })}" /></label>
      ${this._renderModuleWeeks(row)}
      <label class="field"
        >Overview page
        <select @change="${(e) => this._setModuleMod(row.id, { overview: e.target.value ? { ...(row.mod?.overview || {}), mode: e.target.value } : undefined })}">
          <option value="" ?selected="${!row.mod?.overview}">None</option>
          <option value="list" ?selected="${row.mod?.overview?.mode === "list"}">A note and the module's to-do list</option>
          <option value="written" ?selected="${row.mod?.overview?.mode === "written"}">A page as written</option>
        </select>
        ${row.mod?.overview ? html`<span class="hint"><button class="linkbtn" @click="${() => this._select(`ov-${row.id}`)}">Edit the overview</button>: it's the module's first row.</span>` : ""}
      </label>
      <label class="check"><input type="checkbox" .checked="${!!row.mod?.sequential}" @change="${(e) => this._setMod({ sequential: e.target.checked || undefined })}" />Students work through it in order</label>
      ${(row.mod?.prerequisites || []).length
        ? html`<p class="hint">Opens after ${row.mod.prerequisites.map((id) => this._rows.find((r) => r.id === id)?.title || "a module that's gone").join(", ")} (from the course it was imported from).</p>`
        : ""}
      ${row.mod?.unlock ? html`<p class="hint">Opens in week ${row.mod.unlock.week}${row.mod.unlock.day ? `, ${row.mod.unlock.day}` : ""}.</p>` : ""}
      <p class="stat">${items.length} item${items.length === 1 ? "" : "s"}${graded.length ? `, ${graded.length} graded (${points} points)` : ""}</p>
      ${graded.length
        ? html`<ul class="due-list">
            ${graded.map((r) => html`<li><span>${r.title}</span><small>${this._summary(r.item)}</small></li>`)}
          </ul>`
        : ""}
    </div>`;
  }

  // when the module runs: a week, a span of weeks, or all term
  _renderModuleWeeks(row) {
    const allTerm = !Number(row.week);
    const start = Number(row.week) || 1;
    const end = start + Math.max(1, Number(row.mod?.weeks) || 1) - 1;
    return html`<fieldset class="checks">
      <legend>When it runs</legend>
      <label class="check"><input type="checkbox" .checked="${allTerm}" @change="${(e) => (e.target.checked ? this._setRow({ week: "" }) : this._setRow({ week: 1 }))}" />All term (no week: "Start here", "Resources")</label>
      ${allTerm
        ? ""
        : html`<div class="pair">
              <label class="field"
                >From week<input class="input num" type="number" min="1" .value="${String(start)}" @change="${(e) => Number(e.target.value) > 0 && this._setRow({ week: Number(e.target.value) })}"
              /></label>
              <label class="field"
                >To week<input
                  class="input num"
                  type="number"
                  min="${start}"
                  .value="${String(end)}"
                  @change="${(e) => {
                    const to = Math.max(start, Number(e.target.value) || start);
                    this._setMod({ weeks: to > start ? to - start + 1 : undefined });
                  }}"
              /></label>
            </div>
            <span class="hint">Its items' due weeks move with it. Asynchronous courses open the module on its first week's Monday.</span>`}
    </fieldset>`;
  }

  // the module's overview (its first row): a note with its to-do list
  // (made at export), or a page as written (an imported to-do page)
  _renderOverviewDetail(row) {
    const moduleRow = this._rows.find((r) => r.id === row.moduleId);
    const ov = moduleRow?.mod?.overview || {};
    const set = (patch) => this._setModuleMod(row.moduleId, { overview: { ...ov, ...patch } });
    return html`<div class="detail-pad settings">
      <p class="eyebrow">Overview of ${moduleRow?.title || "the module"}</p>
      <label class="field">Title<input class="input" placeholder="${this._placeholder(row)}" .value="${row.title || ""}" @input="${(e) => this._setRow({ title: e.target.value })}" /></label>
      <label class="field"
        >It shows
        <select @change="${(e) => set({ mode: e.target.value })}">
          <option value="list" ?selected="${ov.mode === "list"}">A note and the module's to-do list</option>
          <option value="written" ?selected="${ov.mode !== "list"}">A page as written</option>
        </select>
      </label>
      ${ov.mode === "list"
        ? html`<oer-text-editor label="Note" placeholder="Anything to say about the week (optional)" .value="${ov.note || ""}" @change="${(e) => set({ note: e.detail.value })}"></oer-text-editor>
            <span class="hint">At export, the module's items are listed under the note, each linked, with that term's due dates.</span>`
        : html`<oer-text-editor label="Overview page" .value="${ov.html || ""}" @change="${(e) => set({ html: e.detail.value })}"></oer-text-editor>
            <span class="hint">Exported as written. Choose “A note and the module's to-do list” to have the list made for each term.</span>`}
      <p class="hint">It comes first in the module; items indented under it are listed under it in the LMS. Delete removes the overview, not the items.</p>
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

  /* ---------- rubrics ---------- */

  // an item's rubric, as the sequence will grade it: { r (itemRubric),
  // page (its page), rubric (the rubric page), shown (the release shown),
  // differs (its own differs from its page's) }
  _rubricInfo(item) {
    const items = this._items || [];
    const page = this._byId?.get(item.page) || null;
    const r = itemRubric(item, page);
    const { page: rubric, shown } = r.ref ? rubricAt(items, r.ref, r.version) : { page: null, shown: null };
    return { r, page, rubric, shown, differs: rubricDiffers(item, page, items), pageRubric: r.pageShows ? findRubric(items, r.pageShows.ref) : null };
  }

  // the choice: its page's rubric (when the page shows one), none, or any
  // of the site's rubric pages (by key, as older items name them, or id)
  _rubricSelect(item, onChange, label = "") {
    const info = this._rubricInfo(item);
    const value = info.r.from === "page" ? "__page" : info.r.from === "item" ? (info.rubric ? info.rubric.metadata?.oerRubric?.key || info.rubric.id : item.rubric) : "";
    const change = (v) => onChange(v === "__page" ? { rubric: undefined, rubricVersion: undefined } : { rubric: v, rubricVersion: undefined });
    return html`<select aria-label="${label || "Rubric"}" @change="${(e) => change(e.target.value)}">
      ${info.pageRubric ? html`<option value="__page" ?selected="${value === "__page"}">Its page's: ${info.pageRubric.title}</option>` : ""}
      <option value="" ?selected="${value === ""}">No rubric</option>
      ${rubricPages(this._items || []).map((p) => {
        const r = rubricOf(p);
        const v = r.key || p.id;
        return html`<option value="${v}" ?selected="${value === v}">${p.title} (${r.criteria.length} criteri${r.criteria.length === 1 ? "on" : "a"})</option>`;
      })}
      ${info.r.from === "item" && !info.rubric ? html`<option value="${item.rubric}" selected>Not found: ${item.rubric}</option>` : ""}
    </select>`;
  }

  // "Concept 3.33 · Craft 3.33 · Presentation 3.34" for this item's points
  _pointSplit(item, shown) {
    const points = Number(item.points) || 0;
    if (!shown || !points) return "";
    const r = rubricOf(shown);
    const pts = criterionPoints(r, points);
    return r.criteria.map((c, i) => `${c.name} ${pts[i]}`).join(" · ");
  }

  _rubric(item) {
    const info = this._rubricInfo(item);
    const split = this._pointSplit(item, info.shown);
    return html`<label class="field"
      >Rubric ${this._rubricSelect(item, (patch) => this._setItem(patch))}
      <span class="hint">
        ${info.differs ? html`<span class="warn-text">Its page shows ${info.pageRubric.title}. </span><button type="button" class="linkbtn" @click="${() => this._setItem({ rubric: undefined, rubricVersion: undefined })}">Use the page's</button>. ` : ""}
        ${info.rubric
          ? html`${info.r.from === "page" ? "The rubric its page shows. " : ""}${split ? html`${item.points} points: ${split}. ` : ""}${info.r.version
                ? html`Pinned to v${info.r.version}.${info.r.from === "item" ? html` <button type="button" class="linkbtn" @click="${() => this._setItem({ rubricVersion: undefined })}">Use the latest</button>.` : ""} `
                : ""}<a href="${info.rubric.slug}" target="_blank">Open the rubric</a>`
          : info.r.from === "item"
            ? "That rubric isn't on the site."
            : "Rubrics are pages under Assessments → Rubrics. See them all under Rubrics, above."}
      </span>
    </label>`;
  }

  // the graded items, each with its rubric: [{ row, item, info, module }]
  _gradedRows() {
    let module = null;
    const out = [];
    for (const row of this._rows) {
      if (row.kind === "module") module = row;
      if (row.kind !== "item" || !isGradedItem(row.item)) continue;
      out.push({ row, item: row.item, info: this._rubricInfo(row.item), module });
    }
    return out;
  }

  // change items by row id (the Rubrics panel)
  _setItems(ids, patch) {
    const set = new Set(ids);
    this._commit(this._rows.map((r) => (set.has(r.id) ? { ...r, item: { ...r.item, ...patch } } : r)));
  }

  // show an item in the outline (its module opened), its settings beside it
  _showRow(id) {
    const idx = this._index(id);
    if (idx < 0) return;
    for (let i = idx - 1; i >= 0; i--) {
      if (this._rows[i].kind === "module") {
        if (this._collapsed?.has(this._rows[i].id)) this._collapsed = new Set([...this._collapsed].filter((x) => x !== this._rows[i].id));
        break;
      }
    }
    this._sheet = false;
    this._tab = "settings";
    this._select(id);
    this._focusRow(id);
  }

  _editRubric(rubric) {
    // over the builder: the editor is moved to the end of the page
    const editor = rubricEditor();
    globalThis.document.body.appendChild(editor);
    editor.show(rubric.id);
  }

  _renderRubricsSheet() {
    const graded = this._gradedRows();
    const groups = new Map();
    for (const g of graded) {
      const k = g.info.rubric?.id || (g.info.r.ref ? `missing:${g.info.r.ref}` : "");
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(g);
    }
    const none = groups.get("") || [];
    groups.delete("");
    const ordered = [...groups.entries()].sort(([, a], [, b]) => String(a[0].info.rubric?.title || "").localeCompare(String(b[0].info.rubric?.title || "")));
    const differs = graded.filter((g) => g.info.differs);
    const setAll = (list, v) => this._setItems(list.map((g) => g.row.id), v === "__page" ? { rubric: undefined, rubricVersion: undefined } : { rubric: v, rubricVersion: undefined });
    const bulk = (list, label) =>
      html`<label class="bulk"
        ><span>${label}</span>
        <select
          @change="${(e) => {
            if (e.target.value) setAll(list, e.target.value === "__none" ? "" : e.target.value);
            e.target.value = "";
          }}"
        >
          <option value="" selected>Choose…</option>
          ${list.some((g) => g.info.pageRubric) ? html`<option value="__page">Each one's page rubric</option>` : ""}
          ${rubricPages(this._items || []).map((p) => html`<option value="${p.metadata?.oerRubric?.key || p.id}">${p.title}</option>`)}
          <option value="__none">No rubric</option>
        </select></label
      >`;
    const itemRow = (g) => {
      const split = this._pointSplit(g.item, g.info.shown);
      return html`<li class="rb-item">
        <div class="rb-main">
          <button type="button" class="rb-title" title="Show it in the outline" @click="${() => this._showRow(g.row.id)}">${g.row.title || g.info.page?.title || "Untitled"}</button>
          <span class="rb-meta">${[g.module?.title, this._summary(g.item)].filter(Boolean).join(" · ")}${g.info.r.from === "page" ? " · its page's rubric" : ""}</span>
          ${split ? html`<span class="rb-split">${split}</span>` : ""}
          ${g.info.differs
            ? html`<span class="rb-warn">Its page shows ${g.info.pageRubric.title}. <button type="button" class="linkbtn" @click="${() => this._setItems([g.row.id], { rubric: undefined, rubricVersion: undefined })}">Use the page's</button></span>`
            : ""}
        </div>
        ${this._rubricSelect(g.item, (patch) => this._setItems([g.row.id], patch), `Rubric for ${g.row.title || "this item"}`)}
      </li>`;
    };
    return html`<div class="sheet-layer" @click="${this._closeSheet}">
      <aside class="sheet wide" role="dialog" aria-modal="true" aria-labelledby="sheet-t" @click="${(e) => e.stopPropagation()}" @keydown="${this._sheetKeys}">
        <header class="sheet-head">
          <div>
            <h3 id="sheet-t">Rubrics</h3>
            <p class="sub">What each graded item is scored with. An item uses the rubric its page shows, unless you choose another here or in its settings.</p>
          </div>
          <button class="x" aria-label="Close rubrics" title="Close (Esc)" @click="${this._closeSheet}">${lucide("oer:x")}</button>
        </header>
        <div class="sheet-body rubrics">
          <p class="rb-summary">
            ${graded.length} graded item${graded.length === 1 ? "" : "s"}, ${ordered.length} rubric${ordered.length === 1 ? "" : "s"}${none.length ? html`, <b>${none.length} with no rubric</b>` : ""}${differs.length ? html`, <b>${differs.length} not using their page's</b>` : ""}.
          </p>
          ${none.length
            ? html`<section class="rb-group attention" aria-labelledby="rb-none">
                <div class="rb-head">
                  <h4 id="rb-none">${lucide("oer:circle-alert", "sm")}No rubric<span class="count">${none.length}</span></h4>
                  ${bulk(none, `Give all ${none.length}`)}
                </div>
                <p class="hint">Graded with points only. Canvas shows no criteria to students.</p>
                <ul class="rb-list">
                  ${none.map(itemRow)}
                </ul>
              </section>`
            : ""}
          ${ordered.map(([k, list]) => {
            const rubric = list[0].info.rubric;
            const r = rubric ? rubricOf(rubric) : null;
            return html`<section class="rb-group" aria-label="${rubric?.title || "Missing rubric"}">
              <div class="rb-head">
                <h4>${rubric ? html`<a href="${rubric.slug}" target="_blank" rel="noopener">${rubric.title}</a>` : `Not on the site: ${list[0].info.r.ref}`}<span class="count">${list.length}</span></h4>
                ${rubric ? html`<button class="btn outline small" @click="${() => this._editRubric(rubric)}">${lucide("icons:create", "sm")}Edit rubric</button>` : ""}
                ${bulk(list, `Change all ${list.length} to`)}
              </div>
              ${r ? html`<p class="hint">${r.criteria.length} criteri${r.criteria.length === 1 ? "on" : "a"}: ${r.criteria.map((c) => c.name).join(", ") || "none yet"}. Levels: ${r.levels.map((l) => l.name).join(", ")}.</p>` : ""}
              <ul class="rb-list">
                ${list.map(itemRow)}
              </ul>
            </section>`;
          })}
          ${graded.length ? "" : html`<p class="hint">No graded items yet. Assignments and discussions with points appear here.</p>`}
        </div>
        <footer class="sheet-foot"><button class="btn primary" @click="${this._closeSheet}">Done</button></footer>
      </aside>
    </div>`;
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

  // kind: "settings" (Course settings) or "rubrics"
  _openSheet(kind = "settings") {
    this._typeMenu = null;
    this._sheet = typeof kind === "string" ? kind : "settings";
    this.updateComplete.then(() => this.shadowRoot.querySelector(".sheet .x")?.focus());
  }

  _closeSheet() {
    const kind = this._sheet;
    this._sheet = false;
    this.updateComplete.then(() => this.shadowRoot.querySelector(kind === "rubrics" ? ".rubrics-btn" : ".settings-btn")?.focus());
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
            ${this._hadRules
              ? html`<label class="field"
                  >How modules open
                  <select
                    @change="${(e) => {
                      this._moduleRules = e.target.value === "own" ? "own" : "";
                      this.requestUpdate();
                    }}"
                  >
                    <option value="own" ?selected="${this._moduleRules === "own"}">As each module says (its order, prerequisites and opening date)</option>
                    <option value="delivery" ?selected="${this._moduleRules !== "own"}">By delivery: weekly and in order when asynchronous</option>
                  </select>
                  <span class="hint">An imported course keeps its modules' own settings.</span>
                </label>`
              : ""}
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
        </div>
        <footer class="sheet-foot"><button class="btn primary" @click="${this._closeSheet}">Done</button></footer>
      </aside>
    </div>`;
  }

  /* ---------- render ---------- */

  static get styles() {
    return [formControls, 
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
        .split.one {
          grid-template-columns: minmax(0, 1fr);
        }
        .split.one .left {
          border-right: 0;
        }
        /* Outline | Item: which columns show */
        .panels {
          display: inline-flex;
          border: 1px solid var(--input-border, var(--border));
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .seg {
          all: unset;
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          height: 2rem;
          padding: 0 0.75rem;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--muted-foreground);
          cursor: pointer;
        }
        .seg + .seg {
          border-left: 1px solid var(--input-border, var(--border));
        }
        .seg[aria-pressed="true"] {
          background: var(--accent);
          color: var(--foreground);
        }
        .seg:hover {
          color: var(--foreground);
        }
        .seg:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: -2px;
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
        .chip.rubric {
          max-width: 6.5rem;
          background: var(--muted);
        }
        .chip.rubric .chip-text {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .chip.rubric.warn {
          background: color-mix(in oklch, var(--destructive) 12%, transparent);
          color: var(--destructive);
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
        .detail-pad {
          padding: 1rem 1.25rem 1.25rem;
          overflow-y: auto;
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
        .field-block {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }
        .field-label {
          margin: 0;
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
        /* the right column: shadcn Tabs, then the tab's panel */
        .detail-bar {
          flex: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-bottom: 1px solid var(--border);
        }
        .tabs {
          display: inline-flex;
          padding: 3px;
          border-radius: var(--radius-md);
          background: var(--muted);
        }
        .tab {
          all: unset;
          display: inline-flex;
          align-items: center;
          height: 1.75rem;
          padding: 0 0.875rem;
          border-radius: calc(var(--radius-md) - 2px);
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--muted-foreground);
          cursor: pointer;
        }
        .tab[aria-selected="true"] {
          background: var(--background);
          color: var(--foreground);
          box-shadow: 0 1px 2px rgb(0 0 0 / 0.1);
        }
        .tab[aria-disabled="true"] {
          opacity: 0.5;
          cursor: default;
        }
        .tab:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 1px;
        }
        .stepper {
          display: flex;
          gap: 0.125rem;
        }
        .stepper .icon:disabled {
          opacity: 0.4;
          cursor: default;
          background: none;
        }
        .open-link {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8125rem;
          color: var(--link, var(--primary));
        }
        .tabpanel {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
        }
        .tabpanel.preview {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: var(--muted);
        }
        .tabpanel[hidden],
        .left[hidden],
        .right[hidden] {
          display: none;
        }
        .preview iframe,
        .frame-wait {
          flex: 1;
          margin: 1rem;
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
        .sheet.wide {
          width: min(44rem, 100%);
        }
        /* the Rubrics panel */
        .sheet-body.rubrics {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .rb-summary {
          margin: 0;
          font-size: 0.875rem;
        }
        .rb-head {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem 0.75rem;
        }
        .rb-head h4 {
          flex: 1;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 12rem;
          margin: 0;
          font-size: 0.9375rem;
          font-weight: 600;
        }
        .rb-head h4 a {
          color: inherit;
          text-decoration: none;
        }
        .rb-head h4 a:hover {
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .rb-group.attention h4 {
          color: var(--destructive);
        }
        .rb-group .count {
          margin: 0;
          display: inline-grid;
          place-items: center;
          min-width: 1.25rem;
          height: 1.25rem;
          padding: 0 0.375rem;
          border-radius: 999px;
          background: var(--muted);
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--muted-foreground);
        }
        .rb-group > .hint {
          margin: 0.25rem 0 0;
        }
        .bulk {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.8125rem;
          color: var(--muted-foreground);
        }
        .bulk select {
          width: auto;
          max-width: 12rem;
          height: 2rem;
        }
        .rb-list {
          margin: 0.5rem 0 0;
          padding: 0;
          list-style: none;
          border-top: 1px solid var(--border);
        }
        .rb-item {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(11rem, 15rem);
          gap: 0.75rem;
          align-items: start;
          padding: 0.625rem 0;
          border-bottom: 1px solid var(--border);
        }
        .rb-main {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          font-size: 0.8125rem;
        }
        .rb-title {
          all: unset;
          width: fit-content;
          max-width: 100%;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--foreground);
          cursor: pointer;
          overflow-wrap: anywhere;
        }
        .rb-title:hover {
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .rb-title:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
          border-radius: 2px;
        }
        .rb-meta,
        .rb-split {
          color: var(--muted-foreground);
        }
        .rb-warn,
        .warn-text {
          color: var(--destructive);
        }
        .rb-item select {
          height: 2rem;
        }
        @media (max-width: 640px) {
          .rb-item {
            grid-template-columns: minmax(0, 1fr);
          }
        }
        .btn .badge {
          display: inline-grid;
          place-items: center;
          min-width: 1.125rem;
          height: 1.125rem;
          padding: 0 0.3rem;
          border-radius: 999px;
          background: var(--destructive);
          color: var(--destructive-foreground, #fff);
          font-size: 0.6875rem;
          font-weight: 600;
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
          .split.one {
            grid-template-rows: minmax(0, 1fr);
          }
          .left {
            border-right: 0;
            border-bottom: 1px solid var(--border);
          }
          .split.one .left {
            border-bottom: 0;
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
            <div class="panels" role="group" aria-label="Columns">
              <button class="seg" aria-pressed="${this._layout.outline ? "true" : "false"}" title="${this._layout.outline ? "Hide" : "Show"} the outline" @click="${() => this._togglePanel("outline")}">
                ${lucide(this._layout.outline ? "oer:panel-left-close" : "oer:panel-left-open", "sm")}Outline
              </button>
              <button class="seg" aria-pressed="${this._layout.detail ? "true" : "false"}" title="${this._layout.detail ? "Hide" : "Show"} the selected item" @click="${() => this._togglePanel("detail")}">
                Item${lucide(this._layout.detail ? "oer:panel-right-close" : "oer:panel-right-open", "sm")}
              </button>
            </div>
            <button class="btn outline rubrics-btn" aria-haspopup="dialog" aria-expanded="${this._sheet === "rubrics" ? "true" : "false"}" @click="${() => this._openSheet("rubrics")}">
              ${lucide("icons:assignment-turned-in", "sm")}Rubrics${(() => {
                const missing = this._gradedRows().filter((g) => !g.info.r.ref && Number(g.item.points) > 0).length;
                return missing ? html`<span class="badge" title="${missing} graded item${missing === 1 ? "" : "s"} with no rubric">${missing}</span>` : "";
              })()}
            </button>
            <button class="btn outline settings-btn" aria-haspopup="dialog" aria-expanded="${this._sheet === "settings" ? "true" : "false"}" @click="${() => this._openSheet("settings")}">
              ${lucide("oer:sliders-horizontal", "sm")}Course settings
            </button>
            <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._requestClose}">${lucide("oer:x")}</button>
          </div>
        </header>
        <div class="split ${this._layout.outline && this._layout.detail ? "" : "one"}">
          <section class="left" aria-label="Outline" ?hidden="${!this._layout.outline}">
            <div class="tools">
              ${anyKids
                ? html`<button class="tool" @click="${this._collapseAll}">${lucide("oer:chevron-right", "sm")}Collapse all</button>
                    <button class="tool" @click="${() => (this._collapsed = new Set())}">${lucide("oer:chevron-down", "sm")}Expand all</button>`
                : ""}
              <span class="count">${modules} module${modules === 1 ? "" : "s"} · ${itemCount} item${itemCount === 1 ? "" : "s"}</span>
            </div>
            <div class="body">${this._renderTree(vis, "Modules")}</div>
          </section>
          <section class="right" aria-label="Selected item" ?hidden="${!this._layout.detail}">${this._renderDetail()}</section>
        </div>
        ${this._showChecks && checks.length
          ? html`<ul class="checklist" id="checks">
              ${checks.map((c) => html`<li>${c.text}${c.fix === "rubrics" ? html` <button class="linkbtn" @click="${() => this._openSheet("rubrics")}">Open Rubrics</button>` : ""}</li>`)}
            </ul>`
          : ""}
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
        ${this._sheet === "rubrics" ? this._renderRubricsSheet() : this._sheet ? this._renderSheet() : ""}
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
