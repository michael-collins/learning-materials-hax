/**
 * `oer-outline-builder` — edit the site's page tree (or one page's
 * sub-pages, e.g. a lesson or book) in a dialog. A port of the interaction
 * design of learning-materials-decapcms' CmsOutlineEditor: a tree with
 * connector lines, "add" rows closing every level, native drag and drop with
 * horizontal indent, full keyboard control, inline renaming and an icon
 * picker. Nothing is written until "Save outline", which sends the whole
 * outline to HAXcms in one request (new, changed and deleted pages).
 *
 * Keyboard (row focused): Enter/F2 rename · Tab / Shift+Tab indent /
 * outdent · Alt+↑/↓ move with sub-pages · ↑/↓ previous/next row · ←/→
 * collapse/expand · Delete remove from the navigation (the page stays, in
 * Browse pages) · Shift+Delete delete the page · T content type · L level
 * (inside a pathway with several levels) · V version: the one a linked page
 * shows, or the release the navigation links to. Drag a row: top third = before, middle =
 * make child, bottom third = after; drag left/right to change level. Hold a
 * parent for 2 s to collapse it before dragging.
 * @element oer-outline-builder
 */
import { html, css, LitElement } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { flatten, saveOutline, newItemId, starterContent, childrenMap, deletionSet } from "./outline-model.js";
import { isSystemItem, systemItem, contentTypes, navIconsOn, HEADING_TYPE, HEADING_DEF } from "../types/content-types.js";
import { pageIcon } from "../types/page-icon.js";
import { isSnapshot, versionsOf } from "../versions/versioning.js";
import { iconPicker } from "../ui/oer-icon-picker.js";
import { pagePicker } from "../books/oer-page-picker.js";
import { PATHWAY_TYPE, pathwayOf, pathwayLevels, levelChip, pathwayChipStyles } from "../pathways/pathway-model.js";

const INDENT_PX = 20;

const includeHtml = (ref) => `<oer-include page="${ref.page}"${ref.version ? ` version="${ref.version}"` : ""}></oer-include>`;
const MAX_DEPTH = 6;
const LONG_PRESS_MS = 2000;

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;


class OerOutlineBuilder extends LitElement {
  static get tag() {
    return "oer-outline-builder";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      _rows: { state: true },
      _collapsed: { state: true },
      _editing: { state: true },
      _showIcons: { state: true },
      _navIcons: { state: true }, // site setting: icons in the navigation
      _hoverAdd: { state: true },
      _drag: { state: true },
      _longPress: { state: true },
      _typeMenu: { state: true }, // { id, x, y, kind: "type" | "level" } while choosing a row's type or level
      _confirmDiscard: { state: true },
    };
  }

  constructor() {
    super();
    this.open = false;
    this._rows = []; // [{ id, title, icon, depth, orig }]
    this._navMode = false;
    this._navHidden = new Set();
    this._listed = new Map();
    this._deleted = new Map(); // id -> original item, deleted on save
    this._hidden = new Map(); // id -> original item, removed from the nav on save
    this._collapsed = new Set();
    this._editing = null;
    this._showIcons = true;
    this._hoverAdd = null; // { afterId, depth }
    this._drag = null; // { id, overId, position, startX, x, origDepth, previewDepth, droppedOnOther }
    this._longPress = null;
    this._typeMenu = null;
    this._types = [];
    this._confirmDiscard = false;
    this.__keys = (e) => {
      if (!this.open || e.key !== "Escape") return;
      // Esc in a picker opened from here closes the picker, not the builder
      if (globalThis.document.querySelector("oer-icon-picker[open], oer-page-picker[open]")) return;
      if (this._typeMenu) this._typeMenu = null;
      else if (this._editing) this._editing = null;
      else this._requestClose();
      e.preventDefault();
      e.stopPropagation();
    };
  }

  /* ---------- open / close / save ---------- */

  /**
   * Open for the whole site, or for the sub-pages of page `rootId`. With
   * `nav`, the site as the sidebar shows it: pages of types kept out of the
   * navigation (a section's lessons, say) aren't rows; each page lists how
   * many it holds, linked to where they're listed.
   */
  show(rootId = null, { nav = false } = {}) {
    const items = toJS(store.manifest?.items) || [];
    // converting the manifest out of MobX is slow (~3ms); keep one copy per
    // open instead of converting per row while rendering
    this._items = items;
    this._byId = new Map(items.map((i) => [i.id, i]));
    this._root = rootId;
    this._rootItem = rootId ? items.find((i) => i.id === rootId) : null;
    // the hidden content-types page is configuration, not part of the outline
    // pages removed from the navigation (and their sub-pages) are listed in
    // Browse pages instead; headings are hidden from stock menus but shown here
    const outOfNav = (i) => i.metadata?.hideInMenu && i.metadata?.pageType !== HEADING_TYPE;
    this._navMode = !!nav && !rootId;
    this._navHidden = new Set(this._navMode ? contentTypes(items).types.filter((t) => t.nav === false).map((t) => t.id) : []);
    const listedOnly = (i) => this._navHidden.has(i.metadata?.pageType);
    this._rows = flatten(items.filter((i) => !isSystemItem(i) && !isSnapshot(i) && !outOfNav(i) && !listedOnly(i)), rootId).map(({ item, depth }) => ({
      id: item.id,
      title: item.title,
      icon: pageIcon(item),
      type: item.metadata?.pageType || "",
      ref: item.metadata?.oerRef?.page ? item.metadata.oerRef : null,
      navVersion: item.metadata?.oerNavVersion || "",
      level: item.metadata?.oerLevel || "",
      depth,
      orig: item,
    }));
    // headings are built in, not a content type of the site
    this._types = [...contentTypes(items).types, HEADING_DEF];
    // navigation: what each row holds that isn't in the navigation, by type
    this._listed = new Map();
    if (this._navMode) {
      const shown = new Set(this._rows.map((r) => r.id));
      for (const i of items) {
        if (!listedOnly(i) || !shown.has(i.parent) || isSnapshot(i) || outOfNav(i)) continue;
        const counts = this._listed.get(i.parent) || new Map();
        counts.set(i.metadata.pageType, (counts.get(i.metadata.pageType) || 0) + 1);
        this._listed.set(i.parent, counts);
      }
    }
    this._navIcons = navIconsOn(items);
    this._snapshot = this._signature();
    this._deleted = new Map();
    this._hidden = new Map();
    this._collapsed = new Set();
    this._editing = null;
    this._confirmDiscard = false;
    this.open = true;
    globalThis.addEventListener("keydown", this.__keys, true);
    this.updateComplete.then(() => this.shadowRoot.querySelector("[role=treeitem], .empty button")?.focus());
  }

  _close() {
    this.open = false;
    this._typeMenu = null;
    globalThis.removeEventListener("keydown", this.__keys, true);
  }

  _signature() {
    return JSON.stringify([this._navIcons, ...this._rows.map((r) => [r.id, r.title, r.icon, r.type, r.level, r.depth, r.ref?.page, r.ref?.version, r.navVersion, !!r.unhide])]);
  }

  get _dirty() {
    return this._deleted.size > 0 || this._hidden.size > 0 || this._signature() !== this._snapshot;
  }

  _requestClose() {
    if (this._dirty && !this._confirmDiscard) {
      this._confirmDiscard = true;
      return;
    }
    this._close();
  }

  _save() {
    const all = toJS(store.manifest?.items) || [];
    const rootDepth = this._rootItem ? (Number(this._rootItem.indent) || 0) + 1 : 0;
    const out = new Map(all.map((i) => [i.id, { ...i }]));
    const parents = []; // parent id per depth while walking
    const counters = new Map(); // parent id -> next order
    for (const row of this._rows) {
      const parent = row.depth === 0 ? this._root : parents[row.depth - 1];
      parents[row.depth] = row.id;
      parents.length = row.depth + 1;
      const key = parent ?? "__root";
      const order = counters.get(key) ?? 0;
      counters.set(key, order + 1);
      const title = row.title.trim() || "Untitled page";
      const indent = rootDepth + row.depth;
      if (row.orig) {
        const o = row.orig;
        const item = out.get(row.id);
        // (a change of order is worked out below, with the pages not shown)
        const changed =
          (o.parent || null) !== (parent || null) ||
          Number(o.indent) !== indent ||
          o.title !== title ||
          pageIcon(o) !== row.icon ||
          (o.metadata?.pageType || "") !== row.type ||
          (o.metadata?.oerLevel || "") !== (row.level || "") ||
          (o.metadata?.oerRef?.version || "") !== (row.ref?.version || "") ||
          (o.metadata?.oerNavVersion || "") !== (row.navVersion || "") ||
          !!row.unhide;
        Object.assign(item, { parent: parent || null, order, indent, title });
        item.metadata = { ...(o.metadata || {}) };
        // HAXcms merges metadata on outline saves: clear with "", not delete
        item.metadata.icon = row.icon || "";
        item.metadata.pageType = row.type || "";
        if (row.type === HEADING_TYPE) item.metadata.hideInMenu = true;
        else if (o.metadata?.pageType === HEADING_TYPE || row.unhide) item.metadata.hideInMenu = false;
        if (row.level || o.metadata?.oerLevel) item.metadata.oerLevel = row.level || "";
        // the release the navigation links to (empty: the latest)
        if (row.navVersion || o.metadata?.oerNavVersion) item.metadata.oerNavVersion = row.navVersion || "";
        // a linked page pinned to another version: the link and the page's
        // oer-include both change (outline saves write contents when given)
        if (row.ref && (o.metadata?.oerRef?.version || "") !== (row.ref.version || "")) {
          item.metadata.oerRef = { page: row.ref.page, version: row.ref.version || "" };
          item.contents = includeHtml(row.ref);
        }
        if (changed) item.modified = true;
      } else {
        out.set(row.id, {
          id: row.id,
          title,
          parent: parent || null,
          order,
          indent,
          location: "",
          description: "",
          metadata: {
            ...(row.icon ? { icon: row.icon } : {}),
            ...(row.type ? { pageType: row.type } : {}),
            ...(row.ref ? { oerRef: row.ref } : {}),
            ...(row.level ? { oerLevel: row.level } : {}),
            ...(row.type === HEADING_TYPE ? { hideInMenu: true } : {}),
          },
          // a linked page shows the original instead of starter content
          contents: row.ref ? includeHtml(row.ref) : starterContent(row.type),
          new: true,
        });
      }
    }
    // removed rows stay as pages, out of the navigation; their sub-pages
    // keep their place under them
    for (const id of this._hidden.keys()) {
      const item = out.get(id);
      if (!item || this._deleted.has(id)) continue;
      item.metadata = { ...(item.metadata || {}), hideInMenu: true };
      item.modified = true;
    }
    // deleting a page also deletes its archived versions
    for (const id of this._deletedWithVersions()) {
      const item = out.get(id);
      if (item) item.delete = true;
    }
    this._numberChildren(all, out);
    // the site-wide "Icons in navigation" setting lives on the system page
    const sys = systemItem(all);
    if (sys && (sys.metadata?.oerNavIcons !== false) !== this._navIcons) {
      const item = out.get(sys.id);
      item.metadata = { ...(item.metadata || {}), oerNavIcons: this._navIcons };
      item.modified = true;
    }
    saveOutline([...out.values()]);
    this._close();
  }

  /**
   * Number each parent's children as one list, as HAX numbers them (0, 1,
   * 2…; outline-model.js saves that in site.json's own numbers): the rows
   * as arranged, with the pages the builder doesn't show (removed from the
   * navigation, archived versions, the system page) where they were, each
   * after the shown page that was before it. Only pages whose place
   * changes are marked to save.
   */
  _numberChildren(all, out) {
    const rowIds = new Set(this._rows.map((r) => r.id));
    const was = childrenMap(all);
    const parents = new Set();
    for (const r of this._rows) {
      parents.add(out.get(r.id)?.parent || null);
      if (r.orig) parents.add(r.orig.parent || null);
    }
    for (const parent of parents) {
      const rows = [...out.values()].filter((i) => rowIds.has(i.id) && !i.delete && (i.parent || null) === parent).sort((a, b) => a.order - b.order);
      const here = new Set(rows.map((i) => i.id));
      const before = was.get(parent) || [];
      const after = new Map([["", []]]);
      for (const [k, item] of before.entries()) {
        if (rowIds.has(item.id) || out.get(item.id)?.delete) continue;
        let anchor = "";
        for (let j = k - 1; j >= 0; j--) {
          if (here.has(before[j].id)) {
            anchor = before[j].id;
            break;
          }
        }
        if (!after.has(anchor)) after.set(anchor, []);
        after.get(anchor).push(out.get(item.id));
      }
      const list = [...after.get(""), ...rows.flatMap((r) => [r, ...(after.get(r.id) || [])])];
      list.forEach((item, order) => {
        const orig = this._byId.get(item.id);
        item.order = order;
        if (orig && ((orig.parent || null) !== parent || Number(orig.order) !== order)) item.modified = true;
      });
    }
  }

  /* ---------- tree helpers (flat list with depths) ---------- */

  _index(id) {
    return this._rows.findIndex((r) => r.id === id);
  }

  _subtree(idx) {
    const depth = this._rows[idx].depth;
    let end = idx + 1;
    while (end < this._rows.length && this._rows[end].depth > depth) end++;
    return { start: idx, end };
  }

  _hasChildren(idx) {
    return idx + 1 < this._rows.length && this._rows[idx + 1].depth > this._rows[idx].depth;
  }

  _visible() {
    const out = [];
    let skip = -1;
    this._rows.forEach((row, index) => {
      if (skip >= 0) {
        if (row.depth > skip) return;
        skip = -1;
      }
      out.push({ row, index });
      if (this._collapsed.has(row.id) && this._hasChildren(index)) skip = row.depth;
    });
    return out;
  }

  _nextSiblingAtDepth(idx, depth) {
    const { end } = this._subtree(idx);
    for (let i = end; i < this._rows.length; i++) {
      if (this._rows[i].depth < depth) return false;
      if (this._rows[i].depth === depth) return true;
    }
    return false;
  }

  // levels that close after visible row vIdx, deepest first: one add row each
  _closingRows(vis, vIdx) {
    const { row, index } = vis[vIdx];
    const nextDepth = vIdx + 1 < vis.length ? vis[vIdx + 1].row.depth : -1;
    if (nextDepth >= row.depth) return [];
    const out = [];
    for (let d = row.depth; d > nextDepth; d--) {
      let afterId = row.id;
      if (d < row.depth) {
        for (let i = vIdx - 1; i >= 0; i--) {
          if (vis[i].row.depth === d) {
            afterId = vis[i].row.id;
            break;
          }
          if (vis[i].row.depth < d) break;
        }
      }
      out.push({ depth: d, afterId, index });
    }
    return out;
  }

  _hasClosingAddAtDepth(vis, vIdx, depth) {
    for (let i = vIdx + 1; i < vis.length; i++) {
      const d = vis[i].row.depth;
      if (d < depth) return true;
      if (d === depth) return false;
    }
    return true;
  }

  // the add row hovered, or the drop position of a drag, for highlighting
  _highlight() {
    if (this._hoverAdd) return this._hoverAdd;
    const d = this._drag;
    if (d?.overId && d.position !== "child" && d.previewDepth !== null) return { afterId: d.overId, depth: d.previewDepth };
    return null;
  }

  _isSibling(id) {
    const hl = this._highlight();
    if (!hl) return false;
    const rows = this._rows;
    const row = rows.find((r) => r.id === id);
    if (!row || row.depth !== hl.depth) return false;
    if (hl.depth === 0) return true;
    const afterIdx = this._index(hl.afterId);
    if (afterIdx < 0) return false;
    const scanStart = hl.afterId === this._drag?.id ? afterIdx - 1 : afterIdx;
    let parentIdx = -1;
    for (let i = scanStart; i >= 0; i--) {
      if (rows[i].depth === hl.depth - 1) {
        parentIdx = i;
        break;
      }
      if (rows[i].depth < hl.depth - 1) break;
    }
    if (parentIdx < 0) return false;
    for (let i = parentIdx + 1; i < rows.length; i++) {
      if (rows[i].depth < hl.depth) break;
      if (rows[i].depth === hl.depth && rows[i].id === id) return true;
    }
    return false;
  }

  _columnHighlighted(id, depth) {
    const hl = this._highlight();
    if (!hl || depth !== hl.depth) return false;
    for (let i = this._index(id); i >= 0; i--) {
      if (this._rows[i].depth === depth) return this._isSibling(this._rows[i].id);
      if (this._rows[i].depth < depth) return false;
    }
    return false;
  }

  /* ---------- edits ---------- */

  _commit(rows = [...this._rows]) {
    this._rows = rows;
    this._confirmDiscard = false;
  }

  _newRow(depth, parentType = null) {
    return { id: newItemId(), title: "", icon: "", type: this._defaultType(parentType), depth, orig: null };
  }

  _addAfter(afterId, depth) {
    const rows = [...this._rows];
    const idx = this._index(afterId);
    const at = idx < 0 ? rows.length : this._subtree(idx).end;
    // parent of the new row: the nearest row above it that is shallower
    let parentType = this._rootItem?.metadata?.pageType || null;
    for (let i = at - 1; i >= 0; i--) {
      if (rows[i].depth < depth) {
        parentType = rows[i].type || null;
        break;
      }
    }
    const row = this._newRow(depth, parentType);
    rows.splice(at, 0, row);
    this._commit(rows);
    this._startEdit(row.id);
  }

  /** Link existing pages (learning-materials-decapcms "Add existing"). */
  async _addExisting(afterId, depth) {
    const choice = await pagePicker().pick({ exclude: this._root ? [this._root] : [] });
    if (!choice) return;
    const all = toJS(store.manifest?.items) || [];
    const kids = childrenMap(all.filter((i) => !isSystemItem(i) && !isSnapshot(i)));
    const linked = (page, d, version = "") => ({
      id: newItemId(),
      title: page.title,
      icon: pageIcon(page),
      type: page.metadata?.pageType || "",
      ref: { page: page.id, version },
      depth: Math.min(d, MAX_DEPTH),
      orig: null,
    });
    // a page that is out of the navigation moves back in here itself, with
    // its sub-pages, instead of being linked
    const page = choice.page;
    const outOfNav = this._hidden.has(page.id) || (page.metadata?.hideInMenu && page.metadata?.pageType !== HEADING_TYPE && this._index(page.id) < 0);
    if (outOfNav) {
      this._hidden.delete(page.id);
      const own = (item, d) => ({
        id: item.id,
        title: item.title,
        icon: pageIcon(item),
        type: item.metadata?.pageType || "",
        ref: item.metadata?.oerRef?.page ? item.metadata.oerRef : null,
        navVersion: item.id === page.id ? choice.version || "" : item.metadata?.oerNavVersion || "",
        level: item.metadata?.oerLevel || "",
        depth: Math.min(d, MAX_DEPTH),
        orig: item,
        unhide: item.id === page.id,
      });
      const rows = [own(page, depth)];
      const walk = (id, d) =>
        (kids.get(id) || []).forEach((c) => {
          if (c.metadata?.hideInMenu && c.metadata?.pageType !== HEADING_TYPE) return;
          rows.push(own(c, d));
          walk(c.id, d + 1);
        });
      walk(page.id, depth + 1);
      const list = [...this._rows];
      const idx = this._index(afterId);
      list.splice(idx < 0 ? list.length : this._subtree(idx).end, 0, ...rows);
      this._commit(list);
      this._focusRow(page.id);
      return;
    }
    const rows = [linked(choice.page, depth, choice.version)];
    if (choice.withChildren) {
      const walk = (id, d) => (kids.get(id) || []).forEach((c) => (rows.push(linked(c, d)), walk(c.id, d + 1)));
      walk(choice.page.id, depth + 1);
    }
    const list = [...this._rows];
    const idx = this._index(afterId);
    list.splice(idx < 0 ? list.length : this._subtree(idx).end, 0, ...rows);
    this._commit(list);
    this._focusRow(rows[0].id);
  }

  _addHeading(afterId, depth) {
    const rows = [...this._rows];
    const idx = this._index(afterId);
    const at = idx < 0 ? rows.length : this._subtree(idx).end;
    const row = { ...this._newRow(depth), type: HEADING_TYPE };
    rows.splice(at, 0, row);
    this._commit(rows);
    this._startEdit(row.id);
  }

  _addChild(parentId) {
    const idx = this._index(parentId);
    if (idx < 0) return;
    const rows = [...this._rows];
    const row = this._newRow(Math.min(rows[idx].depth + 1, MAX_DEPTH), rows[idx].type || null);
    rows.splice(this._subtree(idx).end, 0, row);
    const c = new Set(this._collapsed);
    c.delete(parentId);
    this._collapsed = c;
    this._commit(rows);
    this._startEdit(row.id);
  }

  _addFirst() {
    const row = this._newRow(0, this._rootItem?.metadata?.pageType || null);
    this._commit([...this._rows, row]);
    this._startEdit(row.id);
  }

  /**
   * Take a row and its sub-pages out of the outline. By default the page is
   * only removed from the navigation (it stays in Browse pages); with
   * `deletePage` it and its sub-pages are deleted when the outline is saved.
   */
  _remove(id, { deletePage = false } = {}) {
    const idx = this._index(id);
    if (idx < 0) return;
    const { start, end } = this._subtree(idx);
    const rows = [...this._rows];
    if (deletePage) {
      for (const r of rows.slice(start, end)) if (r.orig) this._deleted.set(r.id, r.orig);
    } else if (rows[idx].orig) this._hidden.set(id, rows[idx].orig);
    const prev = idx > 0 ? rows[idx - 1].id : null;
    rows.splice(start, end - start);
    this._commit(rows);
    if (prev) this._focusRow(prev);
  }

  // ids deleted on save: the deleted pages plus their archived versions
  _deletedWithVersions() {
    return this._deleted.size ? deletionSet(this._items, this._deleted.keys()) : new Set();
  }

  // links elsewhere in the site that show a page being deleted
  _linksToDeleted() {
    const ids = this._deletedWithVersions();
    return (this._items || []).filter((i) => !ids.has(i.id) && ids.has(i.metadata?.oerRef?.page)).length;
  }

  _rename(id, title) {
    const rows = this._rows.map((r) => (r.id === id ? { ...r, title } : r));
    this._commit(rows);
  }

  // indent / outdent carry the page's sub-pages with it
  _shiftSubtree(idx, delta) {
    const { start, end } = this._subtree(idx);
    this._commit(this._rows.map((r, i) => (i >= start && i < end ? { ...r, depth: r.depth + delta } : r)));
  }

  _indent(id) {
    const idx = this._index(id);
    if (idx <= 0) return;
    const row = this._rows[idx];
    if (row.depth > this._rows[idx - 1].depth) return;
    const { start, end } = this._subtree(idx);
    const deepest = Math.max(...this._rows.slice(start, end).map((r) => r.depth));
    if (deepest >= MAX_DEPTH) return;
    this._shiftSubtree(idx, 1);
  }

  _outdent(id) {
    const idx = this._index(id);
    if (idx < 0 || this._rows[idx].depth <= 0) return;
    this._shiftSubtree(idx, -1);
  }

  // move past the previous / next sibling (with sub-pages); never out of the
  // parent
  _moveUp(id) {
    const idx = this._index(id);
    if (idx <= 0) return;
    const rows = [...this._rows];
    const depth = rows[idx].depth;
    let prev = idx - 1;
    while (prev >= 0 && rows[prev].depth > depth) prev--;
    if (prev < 0 || rows[prev].depth < depth) return;
    const { start, end } = this._subtree(idx);
    const sub = rows.splice(start, end - start);
    rows.splice(prev, 0, ...sub);
    this._commit(rows);
    this._focusRow(id);
  }

  _moveDown(id) {
    const idx = this._index(id);
    if (idx < 0) return;
    const depth = this._rows[idx].depth;
    const { start, end } = this._subtree(idx);
    if (end >= this._rows.length || this._rows[end].depth !== depth) return;
    const nextEnd = this._subtree(end).end;
    const rows = [...this._rows];
    const sub = rows.splice(start, end - start);
    rows.splice(nextEnd - sub.length, 0, ...sub);
    this._commit(rows);
    this._focusRow(id);
  }

  _toggle(id) {
    const c = new Set(this._collapsed);
    if (c.has(id)) c.delete(id);
    else c.add(id);
    this._collapsed = c;
  }

  _collapseAll() {
    this._collapsed = new Set(this._rows.filter((_, i) => this._hasChildren(i)).map((r) => r.id));
  }

  _startEdit(id) {
    this._editing = id;
    this.updateComplete.then(() => {
      const input = this.shadowRoot.querySelector(`[data-edit="${id}"]`);
      input?.focus();
      if (input) input.selectionStart = input.selectionEnd = input.value.length;
    });
  }

  _stopEdit(refocus = true) {
    const id = this._editing;
    this._editing = null;
    if (refocus && id) this._focusRow(id);
  }

  _focusRow(id) {
    this.updateComplete.then(() => this.shadowRoot.querySelector(`[role=treeitem][data-id="${id}"]`)?.focus());
  }

  /* ---------- keyboard ---------- */

  _editKeys(e, row) {
    if (e.key === "Enter") {
      e.preventDefault();
      this._stopEdit();
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (e.shiftKey) this._outdent(row.id);
      else this._indent(row.id);
    } else if (e.key === "Backspace" && !e.target.value) {
      e.preventDefault();
      this._editing = null;
      this._remove(row.id);
    } else if (e.altKey && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
      e.preventDefault();
      if (e.key === "ArrowUp") this._moveUp(row.id);
      else this._moveDown(row.id);
      this._startEdit(row.id);
    }
    e.stopPropagation();
  }

  _rowKeys(e, row, index, vis) {
    if (this._editing === row.id) return;
    const v = vis.findIndex((x) => x.row.id === row.id);
    const go = (n) => vis[n] && this._focusRow(vis[n].row.id);
    if (e.key === "Tab") {
      if (e.shiftKey) this._outdent(row.id);
      else this._indent(row.id);
      this._focusRow(row.id);
    } else if (e.key === "Enter" || e.key === "F2") {
      if (this._canRename(row)) this._startEdit(row.id);
    }
    else if (e.altKey && e.key === "ArrowUp") this._moveUp(row.id);
    else if (e.altKey && e.key === "ArrowDown") this._moveDown(row.id);
    else if (e.key === "ArrowUp") go(v - 1);
    else if (e.key === "ArrowDown") go(v + 1);
    else if (e.key === "ArrowRight" && this._hasChildren(index) && this._collapsed.has(row.id)) this._toggle(row.id);
    else if (e.key === "ArrowLeft" && this._hasChildren(index) && !this._collapsed.has(row.id)) this._toggle(row.id);
    else if (e.key === "Delete" && e.shiftKey) this._remove(row.id, { deletePage: true });
    else if (e.key === "Delete" || (e.key === "Backspace" && !row.title)) this._remove(row.id);
    else if ((e.key === "t" || e.key === "l" || e.key === "v") && !e.metaKey && !e.ctrlKey && !e.altKey) {
      // levels have no chip on the row: L opens the menu at the title, and
      // only inside a pathway with several levels (or on a tagged item)
      if (e.key === "l" && this._levelsFor(index).length < 2 && !row.level) return;
      const sel = { t: ".type-chip", l: ".title", v: ".ref" }[e.key];
      const chip = e.currentTarget.querySelector(sel);
      if (!chip) return;
      this._openMenu(row, index, { t: "type", l: "level", v: "version" }[e.key], chip);
    } else return;
    e.preventDefault();
  }

  /* ---------- drag and drop (native, with horizontal indent) ---------- */

  _pointerDown(row, index) {
    if (!this._hasChildren(index) || this._collapsed.has(row.id)) return;
    this._longPress = row.id;
    clearTimeout(this.__lpTimer);
    this.__lpTimer = setTimeout(() => {
      if (this._longPress === row.id) {
        this._collapsed = new Set([...this._collapsed, row.id]);
        this._longPress = null;
      }
    }, LONG_PRESS_MS);
  }

  _cancelLongPress() {
    clearTimeout(this.__lpTimer);
    this._longPress = null;
  }

  _previewDepth(d, targetId) {
    const delta = Math.round((d.x - d.startX) / INDENT_PX);
    let depth = Math.max(0, Math.min(MAX_DEPTH, d.origDepth + delta));
    const ti = this._index(targetId);
    if (targetId && targetId !== d.id && ti >= 0) {
      if (d.position === "child") depth = Math.min(MAX_DEPTH, this._rows[ti].depth + 1);
      else {
        const ref = d.position === "before" ? Math.max(0, ti - 1) : ti;
        depth = Math.min(depth, this._rows[ref].depth + 1);
      }
    } else if (targetId === d.id && ti > 0) {
      depth = Math.min(depth, this._rows[ti - 1].depth + 1);
    }
    return depth;
  }

  _dragStart(e, row) {
    this._cancelLongPress();
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", row.id);
    this._drag = { id: row.id, overId: null, position: "after", startX: e.clientX, x: e.clientX, origDepth: row.depth, previewDepth: null, droppedOnOther: false };
  }

  _dragOver(e, row) {
    const d = this._drag;
    if (!d) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const next = { ...d, x: e.clientX, overId: row.id };
    if (row.id !== d.id) {
      const r = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientY - r.top) / r.height;
      next.position = pct < 0.3 ? "before" : pct > 0.7 ? "after" : row.depth < MAX_DEPTH ? "child" : "after";
    }
    next.previewDepth = this._previewDepth(next, row.id);
    if (next.overId !== d.overId || next.position !== d.position || next.previewDepth !== d.previewDepth) this._drag = next;
    else this._drag.x = next.x;
  }

  _dragLeave(e, row) {
    if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
      if (this._drag?.overId === row.id) this._drag = { ...this._drag, overId: null };
    }
  }

  _drop(e, target) {
    e.preventDefault();
    const d = this._drag;
    if (!d || d.id === target.id) return;
    const rows = [...this._rows];
    const from = this._index(d.id);
    if (from < 0) return;
    const { start, end } = this._subtree(from);
    let moved = rows.splice(start, end - start);
    const shift = (delta) => (moved = moved.map((m) => ({ ...m, depth: Math.max(0, Math.min(MAX_DEPTH, m.depth + delta)) })));
    if (d.position === "child") {
      const ti = rows.findIndex((r) => r.id === target.id);
      if (ti < 0) rows.push(...moved);
      else {
        shift(Math.min(rows[ti].depth + 1, MAX_DEPTH) - moved[0].depth);
        let tEnd = ti + 1;
        while (tEnd < rows.length && rows[tEnd].depth > rows[ti].depth) tEnd++;
        rows.splice(tEnd, 0, ...moved);
        const c = new Set(this._collapsed);
        c.delete(target.id);
        this._collapsed = c;
      }
    } else {
      if (d.previewDepth !== null) shift(d.previewDepth - moved[0].depth);
      let at = rows.findIndex((r) => r.id === target.id);
      if (at < 0) at = rows.length;
      if (d.position === "after") at++;
      rows.splice(at, 0, ...moved);
    }
    this._drag = { ...d, droppedOnOther: true };
    this._commit(rows);
  }

  _dragEnd() {
    const d = this._drag;
    // dropped on itself: a level change only
    if (d && !d.droppedOnOther && d.previewDepth !== null) {
      const idx = this._index(d.id);
      if (idx >= 0 && this._rows[idx].depth !== d.previewDepth) {
        this._commit(this._rows.map((r, i) => (i === idx ? { ...r, depth: d.previewDepth } : r)));
      }
    }
    this._drag = null;
  }

  /* ---------- icons ---------- */

  async _chooseIcon(row) {
    const name = await iconPicker().pick(row.icon);
    if (name === null) return;
    this._commit(this._rows.map((r) => (r.id === row.id ? { ...r, icon: name } : r)));
    this._focusRow(row.id);
  }

  /* ---------- content types ---------- */

  // the row's parent row (nearest shallower row above), or null at the top
  _parentRow(idx) {
    const depth = this._rows[idx].depth;
    for (let i = idx - 1; i >= 0; i--) if (this._rows[i].depth < depth) return this._rows[i];
    return null;
  }

  // types allowed under a parent type id (null = top level / untyped)
  _allowedUnder(parentType) {
    // the navigation adds only what it shows
    const types = this._navMode ? this._types.filter((t) => !this._navHidden.has(t.id)) : this._types;
    const parent = parentType ? types.find((t) => t.id === parentType) : null;
    const restricted = !!parent && Array.isArray(parent.children);
    const allowed = restricted ? types.filter((t) => parent.children.includes(t.id)) : types;
    return {
      types: allowed,
      untyped: !restricted,
      none: restricted && !allowed.length,
    };
  }

  _rowAllowed(idx) {
    const parent = this._parentRow(idx);
    const rootType = parent ? null : this._rootItem?.metadata?.pageType || null;
    return this._allowedUnder(parent ? parent.type : rootType);
  }

  _invalid(idx) {
    const row = this._rows[idx];
    // a heading may label any level (it holds no pages itself)
    if (row.type === HEADING_TYPE) return false;
    const { types, untyped } = this._rowAllowed(idx);
    return row.type ? !types.some((t) => t.id === row.type) : !untyped;
  }

  _defaultType(parentType) {
    const { types, untyped } = this._allowedUnder(parentType);
    return untyped ? "" : types[0]?.id || "";
  }

  // levels offered for a row: those of the pathway it sits in (2+ only)
  _levelsFor(idx) {
    for (let i = idx, r = this._parentRow(idx); r; r = this._parentRow(i)) {
      i = this._index(r.id);
      if (r.type === PATHWAY_TYPE) return pathwayLevels(r.orig);
    }
    const root = this._root ? pathwayOf(this._root, this._items || []) : null;
    return root ? pathwayLevels(root) : [];
  }

  _setLevel(id, level) {
    this._typeMenu = null;
    this._commit(this._rows.map((r) => (r.id === id ? { ...r, level } : r)));
    this._focusRow(id);
  }

  _openMenu(row, index, kind, chip) {
    const r = chip.getBoundingClientRect();
    const box = this.shadowRoot.querySelector(".dialog").getBoundingClientRect();
    this._typeMenu = { id: row.id, index, kind, x: r.right - box.left, y: r.bottom - box.top + 4 };
  }

  _setType(id, type) {
    this._typeMenu = null;
    this._commit(this._rows.map((r) => (r.id === id ? { ...r, type } : r)));
    this._focusRow(id);
  }

  /* ---------- render ---------- */

  static get styles() {
    return [pathwayChipStyles, css`
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
        width: min(46rem, calc(100vw - 2rem));
        height: min(44rem, calc(100dvh - 2rem));
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        overflow: hidden;
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
        width: 0.75rem;
        height: 0.75rem;
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
      .tools {
        flex: none;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem 1rem 0;
      }
      .tool {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        height: 1.75rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.75rem;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .tool.switch input {
        width: 0.875rem;
        height: 0.875rem;
        margin: 0;
        accent-color: var(--primary);
        cursor: pointer;
      }
      .tool.switch:focus-within {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .tool:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .tool[aria-pressed="true"] {
        color: var(--primary);
        background: color-mix(in oklch, var(--primary) 10%, transparent);
      }
      .count {
        margin-left: auto;
        padding: 0 0.25rem 0 0.5rem;
        font-size: 0.75rem;
        color: var(--muted-foreground);
        white-space: nowrap;
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
        color: var(--foreground);
      }
      .body {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        padding: 0.5rem 1.25rem 1rem;
      }
      .tree {
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        background: var(--background);
        overflow: hidden;
      }

      /* rows */
      .row {
        position: relative;
        display: flex;
        align-items: center;
        height: 2rem;
        padding: 0 0.5rem;
        outline: none;
      }
      .row:hover,
      .row:focus-within {
        background: color-mix(in oklch, var(--accent) 60%, transparent);
      }
      .row:focus-visible {
        box-shadow: inset 0 0 0 2px var(--ring);
      }
      .row.dragging {
        opacity: 0.4;
      }
      .row.child-target {
        background: color-mix(in oklch, var(--primary) 10%, transparent);
        box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--primary) 40%, transparent);
      }
      .row.pressing {
        box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--primary) 60%, transparent);
      }
      .dropline {
        position: absolute;
        left: 0;
        right: 0;
        z-index: 2;
        pointer-events: none;
      }
      .dropline.before {
        top: -1px;
      }
      .dropline.after {
        bottom: -1px;
      }
      .dropline .bar {
        height: 2px;
        border-radius: 1px;
        background: var(--primary);
      }
      .dropline .dot {
        position: absolute;
        top: -4px;
        width: 10px;
        height: 10px;
        box-sizing: border-box;
        border: 2px solid var(--primary);
        border-radius: 999px;
        background: var(--background);
      }
      .indent {
        display: flex;
        flex: none;
        height: 100%;
      }
      .col {
        position: relative;
        flex: none;
        width: ${INDENT_PX}px;
        height: 100%;
      }
      .line {
        position: absolute;
        left: 8px;
        width: 1px;
        background: var(--border);
      }
      .line.full {
        top: 0;
        bottom: 0;
      }
      .line.top {
        top: 0;
        height: 50%;
      }
      .line.bottom {
        top: 50%;
        bottom: 0;
      }
      .hline {
        position: absolute;
        left: 8px;
        right: -10px;
        top: 50%;
        height: 1px;
        background: var(--border);
      }
      .hl {
        background: var(--primary);
      }
      .toggle {
        position: relative;
        flex: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: ${INDENT_PX}px;
        height: 100%;
      }
      .chev {
        all: unset;
        position: relative;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1rem;
        height: 1rem;
        border-radius: 3px;
        background: var(--card, var(--background));
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .chev:hover {
        background: var(--accent);
      }
      .chev.hl-ring {
        box-shadow: 0 0 0 1px var(--primary);
        color: var(--primary);
      }
      .leaf {
        position: relative;
        z-index: 1;
        width: 6px;
        height: 6px;
        border-radius: 999px;
        background: var(--border);
      }
      .leaf.hl {
        background: var(--primary);
      }
      .icon-btn {
        all: unset;
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 4px;
        cursor: pointer;
        color: var(--primary);
        --simple-icon-height: 0.875rem;
        --simple-icon-width: 0.875rem;
      }
      .icon-btn:hover {
        background: var(--accent);
      }
      .icon-btn.unset {
        color: var(--muted-foreground);
        opacity: 0;
      }
      .row:hover .icon-btn.unset,
      .row:focus-within .icon-btn.unset {
        opacity: 0.6;
      }
      .title {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        height: 100%;
        cursor: grab;
        user-select: none;
      }
      .title span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 0.375rem;
        font-size: 0.875rem;
      }
      .title .top {
        font-weight: 500;
      }
      .title .nested {
        color: var(--muted-foreground);
      }
      .title .placeholder {
        color: var(--muted-foreground);
        font-style: italic;
        opacity: 0.7;
      }
      .title .new-badge {
        flex: none;
        padding: 0 0.375rem;
        margin-left: 0.25rem;
        font-size: 0.625rem;
        font-weight: 600;
        line-height: 1rem;
        color: var(--primary);
        border: 1px solid color-mix(in oklch, var(--primary) 40%, transparent);
        border-radius: 999px;
      }
      .edit {
        flex: 1;
        min-width: 0;
        height: 1.5rem;
        box-sizing: border-box;
        padding: 0 0.375rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-sm);
        background: var(--background);
        color: var(--foreground);
        font: inherit;
        font-size: 0.875rem;
        outline: none;
      }
      .edit:focus {
        box-shadow: 0 0 0 2px color-mix(in oklch, var(--ring) 40%, transparent);
      }
      .badge {
        flex: none;
        margin-right: 0.25rem;
        padding: 0 0.375rem;
        font-size: 0.625rem;
        font-weight: 500;
        line-height: 1rem;
        color: var(--muted-foreground);
        background: var(--muted);
        border-radius: 999px;
      }
      .act {
        all: unset;
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 4px;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .act:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .act.danger:hover {
        color: var(--destructive);
      }
      .hover-only {
        display: flex;
        opacity: 0;
      }
      .row:hover .hover-only,
      .row:focus-within .hover-only,
      .act.always {
        opacity: 1;
      }
      .act:focus-visible,
      .chev:focus-visible,
      .icon-btn:focus-visible,
      .add:focus-visible,
      .tool:focus-visible,
      .x:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
        opacity: 1;
      }

      /* linked pages + "Add existing" */
      .ref {
        all: unset;
        box-sizing: border-box;
        cursor: pointer;
        flex: none;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        max-width: 14rem;
        height: 1.25rem;
        margin-right: 0.25rem;
        padding: 0 0.5rem;
        overflow: hidden;
        border-radius: 999px;
        font-size: 0.6875rem;
        color: var(--primary);
        background: color-mix(in srgb, var(--primary) 8%, transparent);
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .ref:hover {
        background: color-mix(in srgb, var(--primary) 16%, transparent);
      }
      .ref .ref-title {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .ref b {
        flex: none;
        font-weight: 600;
      }
      /* a pinned link reads as fixed: solid outline around the chip */
      .ref.pinned {
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary) 55%, transparent);
      }
      .menu-hint {
        margin-left: auto;
        padding-left: 1rem;
        font-size: 0.6875rem;
        color: var(--muted-foreground);
      }
      .ref b {
        font-family: var(--font-mono, ui-monospace, monospace);
        font-weight: 600;
      }
      /* add row: Add page · Add existing · Add heading, side by side */
      .add-wrap {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.125rem;
      }
      .add-wrap .add {
        flex: none;
        width: auto;
        padding-right: 0.5rem;
        border-radius: var(--radius-sm);
      }
      .add-wrap:hover .add .label,
      .add-wrap:focus-within .add .label {
        opacity: 1;
      }
      /* "Add page" gets the same pill hover as Add existing / Add heading;
         the tree's plus and connector still light up */
      .add-wrap .add:hover,
      .add-wrap .add:focus-visible {
        background: none;
      }
      .add-wrap .add .label {
        display: inline-flex;
        align-items: center;
        height: 1.375rem;
        margin-left: 0.25rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-sm);
      }
      .add-wrap .add:hover .label,
      .add-wrap .add:focus-visible .label {
        background: var(--accent);
        color: var(--foreground);
      }
      .add-existing {
        all: unset;
        flex: none;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        height: 1.375rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--muted-foreground);
        opacity: 0;
        cursor: pointer;
      }
      .add-wrap:hover .add-existing,
      .add-wrap:focus-within .add-existing {
        opacity: 1;
      }
      .add-existing:hover,
      .add-existing:focus-visible {
        background: var(--accent);
        color: var(--foreground);
        opacity: 1;
      }

      /* content type chip + menu */
      /* navigation: what a row lists rather than shows */
      .listed {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        flex: none;
        padding: 0 0.5rem;
        height: 1.375rem;
        border-radius: 999px;
        background: var(--muted);
        color: var(--muted-foreground);
        font-size: 0.75rem;
        text-decoration: none;
        white-space: nowrap;
      }
      .listed:hover {
        color: var(--foreground);
        background: var(--accent);
      }
      .listed:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .type-chip {
        all: unset;
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
        color: var(--muted-foreground);
        background: var(--muted);
        cursor: pointer;
        --simple-icon-height: 0.75rem;
        --simple-icon-width: 0.75rem;
      }
      .type-chip:hover {
        color: var(--foreground);
        background: var(--accent);
      }
      .type-menu .level {
        border: 0;
        padding: 0;
        background: transparent;
        font-size: inherit;
      }
      .heading-title {
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--muted-foreground);
      }
      .type-chip.untyped {
        background: transparent;
        opacity: 0;
      }
      .row:hover .type-chip.untyped,
      .row:focus-within .type-chip.untyped {
        opacity: 1;
      }
      .type-chip.bad {
        opacity: 1;
        color: var(--destructive);
        background: color-mix(in oklch, var(--destructive) 10%, transparent);
        box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--destructive) 40%, transparent);
      }
      .row.invalid {
        background: color-mix(in oklch, var(--destructive) 5%, transparent);
      }
      .menu-layer {
        position: absolute;
        inset: 0;
        z-index: 6;
      }
      .type-menu {
        position: absolute;
        transform: translateX(-100%);
        min-width: 12rem;
        max-height: 20rem;
        overflow-y: auto;
        padding: 0.25rem;
        box-sizing: border-box;
        background: var(--popover, var(--background));
        color: var(--popover-foreground, var(--foreground));
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
      }
      .menu-label {
        padding: 0.375rem 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--muted-foreground);
      }
      .type-menu button {
        all: unset;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        height: 2rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
        cursor: pointer;
        --simple-icon-height: 1rem;
        --simple-icon-width: 1rem;
      }
      .type-menu button:hover,
      .type-menu button:focus-visible {
        background: var(--accent);
        color: var(--accent-foreground, var(--foreground));
      }
      .type-menu .check,
      .type-menu .ph {
        display: inline-flex;
        width: 1rem;
        flex: none;
      }
      .menu-empty {
        padding: 0.5rem;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }

      /* add rows closing each level */
      .add {
        all: unset;
        box-sizing: border-box;
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 1.75rem;
        padding: 0 0.5rem;
        cursor: pointer;
      }
      .add:hover,
      .add:focus-visible {
        background: color-mix(in oklch, var(--accent) 60%, transparent);
      }
      .add .plus {
        position: absolute;
        display: none;
        align-items: center;
        justify-content: center;
        width: 1rem;
        height: 1rem;
        border-radius: 3px;
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .add:hover .plus,
      .add:focus-visible .plus {
        display: inline-flex;
      }
      .add:hover .leaf,
      .add:focus-visible .leaf {
        visibility: hidden;
      }
      .add:hover .line,
      .add:hover .hline,
      .add:focus-visible .line,
      .add:focus-visible .hline {
        background: var(--primary);
      }
      .add .label {
        padding-left: 0.375rem;
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--muted-foreground);
        opacity: 0;
      }
      .add:hover .label,
      .add:focus-visible .label {
        opacity: 1;
        color: var(--foreground);
      }

      .empty {
        padding: 2.5rem 1rem;
        text-align: center;
        border: 1px dashed var(--border);
        border-radius: var(--radius-lg);
        color: var(--muted-foreground);
        font-size: 0.875rem;
      }
      .empty .lucide {
        width: 1.5rem;
        height: 1.5rem;
        margin: 0 auto 0.5rem;
        display: block;
        opacity: 0.5;
      }

      footer {
        flex: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-top: 1px solid var(--border);
      }
      .hints {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        gap: 0.125rem 0.75rem;
        font-size: 0.6875rem;
        color: var(--muted-foreground);
      }
      kbd {
        font-family: var(--font-mono, ui-monospace, monospace);
      }
      .warn {
        flex: 1;
        font-size: 0.8125rem;
        color: var(--destructive);
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
      .btn:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
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
      .btn.primary[aria-disabled="true"] {
        opacity: 0.5;
        cursor: default;
      }
      .btn.destructive {
        background: var(--destructive);
        color: var(--destructive-foreground, white);
      }

    `];
  }

  // an add row's level is closed when its parent's type may contain nothing
  _levelClosed(add) {
    const idx = this._index(add.afterId);
    if (idx < 0) return false;
    const parent = this._parentRow(idx);
    const parentType = parent ? parent.type : this._rootItem?.metadata?.pageType || null;
    return this._allowedUnder(parentType || null).none;
  }

  // released versions a link can be pinned to (those with a frozen snapshot)
  _pinnable(pageId) {
    return versionsOf(pageId, this._items || []).filter((r) => r.snapshot);
  }

  // a link shows that version of its page; a page's own row makes the
  // navigation link to that release
  _setVersion(id, version) {
    this._typeMenu = null;
    this._commit(this._rows.map((r) => (r.id === id ? (r.ref ? { ...r, ref: { ...r.ref, version } } : { ...r, navVersion: version }) : r)));
    this._focusRow(id);
  }

  _renderRef(row, index) {
    const target = this._byId?.get(row.ref.page);
    const pinned = row.ref.version;
    const label = target
      ? `Shows “${target.title}”, ${pinned ? `pinned to v${pinned}` : "latest version"}. Change version (V)`
      : "Linked page not found";
    return html`<button
      class="ref ${pinned ? "pinned" : ""}"
      tabindex="-1"
      title="${label}"
      aria-label="${label}"
      @mousedown="${(e) => e.preventDefault()}"
      @click="${(e) => {
        e.stopPropagation();
        if (target) this._openMenu(row, index, "version", e.currentTarget);
      }}"
    >
      ${lucide("icons:link", "sm")}<span class="ref-title">${target ? target.title : "missing"}</span><b>${pinned ? `v${pinned}` : "latest"}</b>
    </button>`;
  }

  _renderNavVersion(row, index) {
    const pinned = row.navVersion;
    const label = `The navigation links to ${pinned ? `v${pinned} as released` : "the latest version"}. Change version (V)`;
    return html`<button
      class="ref ${pinned ? "pinned" : ""}"
      tabindex="-1"
      title="${label}"
      aria-label="${label}"
      @mousedown="${(e) => e.preventDefault()}"
      @click="${(e) => {
        e.stopPropagation();
        this._openMenu(row, index, "version", e.currentTarget);
      }}"
    >
      ${lucide("icons:history", "sm")}<b>${pinned ? `v${pinned}` : "latest"}</b>
    </button>`;
  }

  _renderTypeChip(row, index) {
    if (!this._types.length) return "";
    const type = this._types.find((t) => t.id === row.type);
    const invalid = this._invalid(index);
    return html`<button
      class="type-chip ${type ? "" : "untyped"} ${invalid ? "bad" : ""}"
      tabindex="-1"
      title="${invalid ? "This type is not allowed here. Click to change." : "Content type (click to change)"}"
      aria-label="Content type: ${type ? type.label : "none"}${invalid ? ", not allowed here" : ""}. Change"
      @mousedown="${(e) => e.preventDefault()}"
      @click="${(e) => {
        e.stopPropagation();
        this._openMenu(row, index, "type", e.currentTarget);
      }}"
    >
      ${type?.icon ? html`<simple-icon-lite icon="${type.icon}"></simple-icon-lite>` : ""}${type ? type.label : "No type"}
    </button>`;
  }



  _renderTypeMenu() {
    const m = this._typeMenu;
    const idx = this._index(m.id);
    if (idx < 0) return "";
    const row = this._rows[idx];
    const menuKeys = (e) => {
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
    if (m.kind === "version") {
      const pageId = row.ref ? row.ref.page : row.id;
      const chosen = (row.ref ? row.ref.version : row.navVersion) || "";
      const target = this._byId?.get(pageId);
      const releases = this._pinnable(pageId);
      const current = target?.metadata?.version;
      const opt = (value, label, hint = "") => html`<button role="menuitemradio" aria-checked="${chosen === value ? "true" : "false"}" @click="${() => this._setVersion(row.id, value)}">
        <span class="check">${chosen === value ? lucide("oer:check", "sm") : ""}</span>${label}${hint ? html`<span class="menu-hint">${hint}</span>` : ""}
      </button>`;
      return html`<div class="menu-layer" @click="${() => (this._typeMenu = null)}">
        <div class="type-menu" role="menu" aria-label="Version" style="left:${m.x}px;top:${m.y}px" @click="${(e) => e.stopPropagation()}" @keydown="${menuKeys}">
          <div class="menu-label">${row.ref ? "Version shown" : "Navigation links to"}</div>
          ${opt("", "Latest", current ? `v${current}, follows changes` : "follows changes")}
          ${releases.map((r) => opt(r.version, `v${r.version}`, "as released"))}
          ${releases.length ? "" : html`<div class="menu-empty">No earlier versions released yet.</div>`}
        </div>
      </div>`;
    }
    if (m.kind === "level") {
      const levels = this._levelsFor(idx);
      const opt = (value, label) => html`<button role="menuitemradio" aria-checked="${row.level === value ? "true" : "false"}" @click="${() => this._setLevel(row.id, value)}">
        <span class="check">${row.level === value ? lucide("oer:check", "sm") : ""}</span>${label}
      </button>`;
      return html`<div class="menu-layer" @click="${() => (this._typeMenu = null)}">
        <div class="type-menu" role="menu" aria-label="Level" style="left:${m.x}px;top:${m.y}px" @click="${(e) => e.stopPropagation()}" @keydown="${menuKeys}">
          <div class="menu-label">Level</div>
          ${opt("", "Every level")}
          ${[...new Set([...levels, ...(row.level ? [row.level] : [])])].map((l) => opt(l, levelChip(l)))}
        </div>
      </div>`;
    }
    const allowed = this._rowAllowed(idx);
    const untyped = allowed.untyped;
    // a heading can go anywhere, whatever the parent allows
    const types = allowed.types.some((t) => t.id === HEADING_TYPE) ? allowed.types : [...allowed.types, HEADING_DEF];
    return html`<div class="menu-layer" @click="${() => (this._typeMenu = null)}">
      <div
        class="type-menu"
        role="menu"
        aria-label="Content type"
        style="left:${m.x}px;top:${m.y}px"
        @click="${(e) => e.stopPropagation()}"
        @keydown="${(e) => {
          const items = [...e.currentTarget.querySelectorAll("[role=menuitemradio]")];
          const i = items.indexOf(this.shadowRoot.activeElement);
          if (e.key === "ArrowDown") items[(i + 1) % items.length]?.focus();
          else if (e.key === "ArrowUp") items[(i - 1 + items.length) % items.length]?.focus();
          else if (e.key === "Escape") this._typeMenu = null;
          else return;
          e.preventDefault();
          e.stopPropagation();
        }}"
      >
        <div class="menu-label">Content type</div>
        ${untyped
          ? html`<button role="menuitemradio" aria-checked="${!row.type ? "true" : "false"}" @click="${() => this._setType(row.id, "")}">
              <span class="check">${!row.type ? lucide("oer:check", "sm") : ""}</span>No type
            </button>`
          : ""}
        ${types.map(
          (t) => html`<button role="menuitemradio" aria-checked="${t.id === row.type ? "true" : "false"}" @click="${() => this._setType(row.id, t.id)}">
            <span class="check">${t.id === row.type ? lucide("oer:check", "sm") : ""}</span>
            ${t.icon ? html`<simple-icon-lite icon="${t.icon}"></simple-icon-lite>` : html`<span class="ph"></span>`}${t.label}
          </button>`,
        )}
        ${!types.length && !untyped ? html`<div class="menu-empty">Nothing is allowed here.</div>` : ""}
      </div>
    </div>`;
  }

  updated(changed) {
    if (changed.has("_typeMenu") && this._typeMenu) {
      const menu = this.shadowRoot.querySelector(".type-menu");
      if (!menu) return;
      // keep the menu inside the dialog; open upwards near the bottom
      const box = this.shadowRoot.querySelector(".dialog").getBoundingClientRect();
      const r = menu.getBoundingClientRect();
      if (r.bottom > box.bottom - 8) menu.style.top = `${Math.max(8, this._typeMenu.y - r.height - 36)}px`;
      (menu.querySelector("[aria-checked=true]") || menu.querySelector("[role=menuitemradio]"))?.focus();
    }
  }

  _renderIndent(row, index, vis, vIdx) {
    const cols = [];
    const closing = this._closingRows(vis, vIdx);
    for (let d = 1; d <= row.depth; d++) {
      if (d < row.depth) {
        const show = this._nextSiblingAtDepth(index, d) || this._hasClosingAddAtDepth(vis, vIdx, d);
        cols.push(html`<div class="col">${show ? html`<div class="line full ${this._columnHighlighted(row.id, d) ? "hl" : ""}"></div>` : ""}</div>`);
      } else {
        const hl = this._isSibling(row.id) ? "hl" : "";
        const below = this._nextSiblingAtDepth(index, d) || closing.some((c) => c.depth === d);
        cols.push(html`<div class="col">
          <div class="line top ${hl}"></div>
          ${below ? html`<div class="line bottom ${hl}"></div>` : ""}
          <div class="hline ${hl}"></div>
        </div>`);
      }
    }
    const d = this._drag;
    const depth = d?.id === row.id && d.previewDepth !== null ? d.previewDepth : row.depth;
    return html`<div class="indent" style="width:${depth * INDENT_PX}px">${cols}</div>`;
  }

  _renderRow(row, index, vis, vIdx) {
    const d = this._drag;
    const hasKids = this._hasChildren(index);
    const collapsed = this._collapsed.has(row.id);
    const sib = this._isSibling(row.id);
    const editing = this._editing === row.id;
    const kidsCount = collapsed ? this._subtree(index).end - index - 1 : 0;
    const classes = [
      "row",
      d?.id === row.id ? "dragging" : "",
      d?.overId === row.id && d.id !== row.id && d.position === "child" ? "child-target" : "",
      this._longPress === row.id ? "pressing" : "",
      this._invalid(index) ? "invalid" : "",
      this._rowCurrent(row) ? "current" : "",
    ].join(" ");
    return html`<div
      class="${classes}"
      role="treeitem"
      tabindex="0"
      data-id="${row.id}"
      aria-current="${this._rowCurrent(row) ? "true" : "false"}"
      aria-level="${row.depth + 1}"
      aria-expanded="${hasKids ? String(!collapsed) : ""}"
      aria-label="${row.title || "Untitled page"}"
      draggable="${editing ? "false" : "true"}"
      @keydown="${(e) => this._rowKeys(e, row, index, vis)}"
      @focus="${() => this._rowFocused(row, index)}"
      @pointerdown="${() => this._pointerDown(row, index)}"
      @pointerup="${this._cancelLongPress}"
      @pointerleave="${this._cancelLongPress}"
      @dragstart="${(e) => this._dragStart(e, row)}"
      @dragend="${this._dragEnd}"
      @dragover="${(e) => this._dragOver(e, row)}"
      @dragleave="${(e) => this._dragLeave(e, row)}"
      @drop="${(e) => this._drop(e, row)}"
    >
      ${d?.overId === row.id && d.id !== row.id && d.position !== "child"
        ? html`<div class="dropline ${d.position}">
            <div class="bar"></div>
            <div class="dot" style="left:${13 + (d.previewDepth ?? 0) * INDENT_PX}px"></div>
          </div>`
        : ""}
      ${this._renderIndent(row, index, vis, vIdx)}
      <div class="toggle">
        ${hasKids
          ? html`<button
              class="chev ${sib ? "hl-ring" : ""}"
              tabindex="-1"
              aria-label="${collapsed ? "Expand" : "Collapse"}"
              @click="${(e) => {
                e.stopPropagation();
                this._toggle(row.id);
              }}"
            >
              ${lucide(collapsed ? "oer:chevron-right" : "oer:chevron-down", "sm")}
            </button>`
          : html`<div class="leaf ${sib ? "hl" : ""}"></div>`}
      </div>
      ${this._showIcons
        ? html`<button
            class="icon-btn ${row.icon ? "" : "unset"}"
            tabindex="-1"
            title="${row.icon ? `Icon: ${row.icon} (click to change)` : "Set icon"}"
            aria-label="${row.icon ? "Change icon" : "Set icon"}"
            @click="${(e) => {
              e.stopPropagation();
              this._chooseIcon(row);
            }}"
          >
            ${row.icon ? html`<simple-icon-lite icon="${row.icon}"></simple-icon-lite>` : lucide("oer:smile-plus", "sm")}
          </button>`
        : ""}
      ${editing
        ? html`<input
            class="edit"
            data-edit="${row.id}"
            .value="${row.title}"
            placeholder="${this._placeholder(row)}"
            aria-label="Page title"
            @input="${(e) => this._rename(row.id, e.target.value)}"
            @keydown="${(e) => this._editKeys(e, row)}"
            @blur="${() => this._editing === row.id && this._stopEdit(false)}"
          />`
        : html`<div class="title" @dblclick="${() => this._canRename(row) && this._startEdit(row.id)}">
            ${row.title
              ? html`<span class="${row.type === HEADING_TYPE ? "heading-title" : row.depth === 0 ? "top" : "nested"}">${row.title}</span>`
              : html`<span class="placeholder">${this._placeholder(row)}</span>`}
            ${row.orig ? "" : html`<span class="new-badge">New</span>`}
          </div>`}
      ${this._canRename(row)
        ? html`<button
        class="act ${editing ? "always" : "hover-only"}"
        tabindex="-1"
        title="${editing ? "Done" : "Rename"}"
        aria-label="${editing ? "Done renaming" : "Rename"}"
        @mousedown="${(e) => e.preventDefault()}"
        @click="${(e) => {
          e.stopPropagation();
          if (editing) this._stopEdit();
          else this._startEdit(row.id);
        }}"
      >
        ${lucide(editing ? "oer:check" : "icons:create", "sm")}
      </button>`
        : ""}
      ${this._renderRowChips(row, index)}
      ${kidsCount > 0 ? html`<span class="badge">${kidsCount}</span>` : ""}
      ${this._renderRowActions(row, index)}
    </div>`;
  }

  /* ---------- row hooks (a subclass, like the sequence builder, overrides these) ---------- */

  // a page's version link or pin, and its content type
  _renderRowChips(row, index) {
    return html`${this._renderListed(row)}${row.ref ? this._renderRef(row, index) : this._pinnable(row.id).length ? this._renderNavVersion(row, index) : ""}
      ${this._renderTypeChip(row, index)}`;
  }

  // navigation: the pages a row holds that are listed on it, not in the
  // navigation ("47 lessons"), linked to that page
  _renderListed(row) {
    const counts = this._listed?.get(row.id);
    if (!counts || !row.orig?.slug) return "";
    const text = [...counts].map(([type, n]) => `${n} ${this._typeNoun(type, n)}`).join(", ");
    return html`<a
      class="listed"
      tabindex="-1"
      href="${row.orig.slug}"
      title="Listed on ${row.title}, not in the navigation"
      @click="${(e) => {
        e.stopPropagation();
        if (this._dirty) {
          e.preventDefault();
          this._requestClose();
        } else this._close();
      }}"
      >${text}${lucide("oer:arrow-right", "sm")}</a
    >`;
  }

  _typeNoun(type, n) {
    const word = (this._types.find((t) => t.id === type)?.label || "page").toLowerCase();
    if (n === 1) return word;
    if (/[^aeiou]y$/.test(word)) return `${word.slice(0, -1)}ies`;
    if (/(s|x|z|ch|sh)$/.test(word)) return `${word}${word.endsWith("z") ? "z" : ""}es`;
    return `${word}s`;
  }

  _placeholder(row) {
    return row.type === HEADING_TYPE ? "Heading…" : row.depth === 0 ? "Page title…" : "Sub-page title…";
  }

  _canRename() {
    return true;
  }

  // a row took focus (keyboard or click)
  _rowFocused() {}

  // the row shown beside the outline, if the builder has such a panel
  _rowCurrent() {
    return false;
  }

  _renderRowActions(row) {
    return html`<div class="hover-only">
        ${row.depth < MAX_DEPTH && !this._allowedUnder(row.type || null).none
          ? html`<button
              class="act"
              tabindex="-1"
              title="Add sub-page"
              aria-label="Add sub-page"
              @click="${(e) => {
                e.stopPropagation();
                this._addChild(row.id);
              }}"
            >
              ${lucide("oer:plus", "sm")}
            </button>`
          : ""}
        <button
          class="act"
          tabindex="-1"
          title="Remove from navigation (Delete). The page is kept."
          aria-label="Remove from navigation"
          @click="${(e) => {
            e.stopPropagation();
            this._remove(row.id);
          }}"
        >
          ${lucide("oer:eye-off", "sm")}
        </button>
        <button
          class="act danger"
          tabindex="-1"
          title="Delete page (Shift+Delete)"
          aria-label="Delete page"
          @click="${(e) => {
            e.stopPropagation();
            this._remove(row.id, { deletePage: true });
          }}"
        >
          ${lucide("oer:trash-2", "sm")}
        </button>
      </div>`;
  }

  _renderAddRow(add, vis, vIdx, { label = "Add page", title = "Add a page here", action = () => this._addAfter(add.afterId, add.depth) } = {}) {
    const closing = this._closingRows(vis, vIdx);
    const cols = [];
    for (let d = 1; d <= add.depth; d++) {
      if (d < add.depth) {
        const show = this._nextSiblingAtDepth(add.index, d) || closing.some((c) => c.depth === d);
        cols.push(html`<div class="col">${show ? html`<div class="line full ${this._columnHighlighted(add.afterId, d) ? "hl" : ""}"></div>` : ""}</div>`);
      } else {
        cols.push(html`<div class="col"><div class="line top"></div><div class="hline"></div></div>`);
      }
    }
    return html`<button
      class="add"
      title="${title}"
      @mouseenter="${() => (this._hoverAdd = { afterId: add.afterId, depth: add.depth })}"
      @mouseleave="${() => (this._hoverAdd = null)}"
      @focus="${() => (this._hoverAdd = { afterId: add.afterId, depth: add.depth })}"
      @blur="${() => (this._hoverAdd = null)}"
      @click="${() => {
        this._hoverAdd = null;
        action();
      }}"
    >
      <div class="indent" style="width:${add.depth * INDENT_PX}px">${cols}</div>
      <div class="toggle">
        <div class="leaf"></div>
        <span class="plus">${lucide("oer:plus", "sm")}</span>
      </div>
      <span class="label">${label}</span>
    </button>`;
  }

  _renderAddRows(add, vis, vIdx) {
    return html`<div class="add-wrap">
      ${this._renderAddRow(add, vis, vIdx)}
      <button
        class="add-existing"
        title="Show an existing page here (not a copy)"
        @mouseenter="${() => (this._hoverAdd = { afterId: add.afterId, depth: add.depth })}"
        @mouseleave="${() => (this._hoverAdd = null)}"
        @click="${() => {
          this._hoverAdd = null;
          this._addExisting(add.afterId, add.depth);
        }}"
      >
        ${lucide("icons:link", "sm")}Add existing
      </button>
      <button
        class="add-existing"
        title="Add a heading that labels the pages after it in the navigation"
        @mouseenter="${() => (this._hoverAdd = { afterId: add.afterId, depth: add.depth })}"
        @mouseleave="${() => (this._hoverAdd = null)}"
        @click="${() => {
          this._hoverAdd = null;
          this._addHeading(add.afterId, add.depth);
        }}"
      >
        ${lucide("oer:heading-2", "sm")}Add heading
      </button>
    </div>`;
  }

  // the tree with its add rows, or the empty state
  _renderTree(vis = this._visible(), label = "Pages") {
    return this._rows.length
      ? html`<div class="tree" role="tree" aria-label="${label}">
          ${vis.map(
            ({ row, index }, vIdx) => html`${this._renderRow(row, index, vis, vIdx)}
            ${this._closingRows(vis, vIdx)
              .filter((add) => !this._levelClosed(add))
              .map((add) => this._renderAddRows(add, vis, vIdx))}`,
          )}
        </div>`
      : this._renderEmpty();
  }

  _renderEmpty() {
    return html`<div class="empty">
      ${lucide("hax:site-map")}
      <p>No pages yet</p>
      <button class="btn outline" @click="${this._addFirst}">${lucide("oer:plus", "sm")}Add page</button>
      <button class="btn outline" @click="${() => this._addExisting(null, 0)}">${lucide("icons:link", "sm")}Add existing</button>
    </div>`;
  }

  render() {
    if (!this.open) return html``;
    const vis = this._visible();
    const top = this._rows.filter((r) => r.depth === 0).length;
    const anyKids = this._rows.some((_, i) => this._hasChildren(i));
    const dirty = this._dirty;
    const deleting = this._deletedWithVersions().size;
    const hiding = [...this._hidden.keys()].filter((id) => !this._deleted.has(id)).length;
    const brokenLinks = deleting ? this._linksToDeleted() : 0;
    const invalidCount = this._rows.filter((_, i) => this._invalid(i)).length;
    return html`
      <div class="backdrop" @click="${this._requestClose}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${lucide("hax:site-map")}${this._rootItem ? `${this._rootItem.title} outline` : this._navMode ? "Navigation" : "Page tree"}</h2>
            <p class="sub">
              ${this._rootItem
                ? "Sub-pages of this page."
                : this._navMode
                  ? "The sidebar, as readers see it. Pages in collections are listed on their collection's page, so they show as a count."
                  : "Every page in the site, including the pages collections list, which the navigation leaves out."}
              Changes apply when you save.
            </p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._requestClose}">${lucide("oer:x")}</button>
        </header>
        <div class="tools">
            ${anyKids
              ? html`<button class="tool" @click="${this._collapseAll}">${lucide("oer:chevron-right", "sm")}Collapse all</button>
                  <button class="tool" @click="${() => (this._collapsed = new Set())}">${lucide("oer:chevron-down", "sm")}Expand all</button>`
              : ""}
            <button
              class="tool"
              aria-pressed="${this._showIcons ? "true" : "false"}"
              title="Show the icon column here, to change or remove a page's icon"
              @click="${() => (this._showIcons = !this._showIcons)}"
            >
              ${lucide(this._showIcons ? "icons:visibility" : "icons:visibility-off", "sm")}Edit icons
            </button>
            ${this._root
              ? ""
              : html`<label class="tool switch" title="Site setting: show page icons in the sidebar (saved with the outline)">
                  <input type="checkbox" role="switch" .checked="${this._navIcons}" @change="${(e) => (this._navIcons = e.target.checked)}" />
                  Icons in navigation
                </label>`}
            <span class="count">${top} top-level · ${this._rows.length} page${this._rows.length === 1 ? "" : "s"}</span>
        </div>
        <div class="body">${this._renderTree(vis)}</div>
        <footer>
          ${this._confirmDiscard
            ? html`<span class="warn">Discard your outline changes?</span>
                <button class="btn outline" @click="${() => (this._confirmDiscard = false)}">Keep editing</button>
                <button class="btn destructive" @click="${this._close}">Discard</button>`
            : html`${invalidCount
                  ? html`<span class="warn">${invalidCount} page${invalidCount === 1 ? " is" : "s are"} in a place ${invalidCount === 1 ? "its" : "their"} type isn't allowed. Change the type or move ${invalidCount === 1 ? "it" : "them"}.</span>`
                  : deleting || hiding
                  ? html`<span class="warn">
                      ${[
                        deleting ? `${deleting} page${deleting === 1 ? "" : "s"}${deleting > this._deleted.size ? " (with sub-pages and archived versions)" : ""} will be deleted${brokenLinks ? `, breaking ${brokenLinks} link${brokenLinks === 1 ? "" : "s"} to ${deleting === 1 ? "it" : "them"}` : ""}.` : "",
                        hiding ? `${hiding} page${hiding === 1 ? "" : "s"} will leave the navigation and stay in Browse pages.` : "",
                      ].join(" ")}
                    </span>`
                  : html`<div class="hints" aria-hidden="true">
                      <span><kbd>↵</kbd> rename</span><span><kbd>⇥</kbd> indent</span><span><kbd>⇧⇥</kbd> outdent</span>
                      <span><kbd>⌥↑↓</kbd> move</span><span><kbd>↑↓</kbd> navigate</span><span><kbd>←→</kbd> collapse</span><span><kbd>T</kbd> type</span><span><kbd>L</kbd> level</span><span><kbd>V</kbd> version</span><span><kbd>Del</kbd> remove</span><span><kbd>⇧Del</kbd> delete</span>
                      <span>drag ↔ to change level</span>
                    </div>`}
                <button class="btn outline" @click="${this._requestClose}">Cancel</button>
                <button
                  class="btn primary"
                  aria-disabled="${dirty && !invalidCount ? "false" : "true"}"
                  @click="${() => dirty && !invalidCount && this._save()}"
                >
                  Save outline
                </button>`}
        </footer>
        ${this._typeMenu ? this._renderTypeMenu() : ""}
      </div>
    `;
  }
}
customElements.define(OerOutlineBuilder.tag, OerOutlineBuilder);
export { OerOutlineBuilder, INDENT_PX, MAX_DEPTH };

/** The page-wide outline builder, created on first use. */
export function outlineBuilder() {
  const doc = globalThis.document;
  return doc.querySelector(OerOutlineBuilder.tag) || doc.body.appendChild(doc.createElement(OerOutlineBuilder.tag));
}
