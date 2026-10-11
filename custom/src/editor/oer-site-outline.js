/**
 * `oer-site-outline` — the Sections sheet (nu-hax docs/editor-redesign/
 * spec.md §4.9, §7.1–7.3): every section of a course site (or OER Courses)
 * and the items in it, with their state, in a sheet over the page's left
 * side that never narrows <main> (a modal sheet on phones, below 48rem).
 *
 *   ┌ Page sections ──────────────── ✕ ┐
 *   │   Hero                           │
 *   │   Facts · From the course page   │
 *   │ ▾ What you'll learn · 3 outcomes │
 *   │     Cut with confidence          │
 *   │   Books · Hidden from readers    │
 *   │ ──────────────────────────────── │
 *   │ Not on this page                 │
 *   │   What you'll make   [Add back]  │
 *   │ [+ Add section…]                 │
 *   └──────────────────────────────────┘
 *
 * - An APG tree (role="tree", aria-level, aria-posinset, aria-setsize,
 *   aria-expanded on sections with items), its rows named with their
 *   state ("Books, hidden from readers"), the selected unit's row
 *   aria-selected. One row takes Tab (roving tabindex). ↑ ↓ Home End and
 *   type-ahead move; → ← open and close a section's items (and go to its
 *   first item, or back to the section); Enter goes to the row on the page
 *   (focus on its name tag); Space, or a click, selects it there and keeps
 *   focus here; Alt+Shift+↑ ↓ move it, Delete removes it and Shift+F10 (or
 *   the row's ⋯, for the pointer) shows its actions, the rail's verbs in
 *   the rail's order, all through editor/ops.js, so the sheet and the page
 *   can't differ. Focus stays on the row (Remove: the row of what's
 *   selected after it).
 * - Not on this page: the standard sections the page lacks, each with Add
 *   back; and Add section…. Both ask the block inserter with a window
 *   `oer-insert-request` { kind: "section", tag?, near? } (Add back: the
 *   tag, in its standard place; Add section…: the inserter's list for the
 *   place after near).
 * - Follows the page: hax-body's changes (a mutation observer), the
 *   sections' cs-items-change and cs-section-change, and the editor's state
 *   (what's selected, Preview, which hides it).
 * - Opened and closed by the editing bar's Sections (`oer-sections-toggle`
 *   { opener }, which it answers with `oer-sections-state` { open }); Esc
 *   or ✕ closes it with focus back on Sections. Open or closed is each
 *   viewer's own (localStorage oer-sections-open): open, it opens again as
 *   the next editing of a microsite begins, without taking focus (not on a
 *   phone, where it would cover the page; closing it there to go to a
 *   section isn't a choice to remember). Ctrl+` reaches it
 *   (oer-block-frame calls focusTree()).
 *
 *   installSiteOutline()   // from installEditBar (editor/oer-edit-bar.js)
 *   siteOutline().toggle({ opener })
 * @element oer-site-outline
 */
import { html, css, LitElement } from "../lit.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { LUCIDE_ICONS } from "./lucide-icons.generated.js";
import { editorState } from "./editor-state.js";
import { ops, HIDDEN } from "./ops.js";
import { policyOf, policyOfTag, labelOf, phraseOf, TEXT_FIELDS } from "./policy.js";
import { isMac } from "./stock.js";
import { COURSE_SITE_STARTER, HUB_STARTER, COURSE_SITE_TYPE, COURSE_HUB_TYPE } from "../types/course-site.js";

// (a Lucide name, or a HAX icon name mapped to one: "icons:more-horiz")
const lucide = (name) => html`<span class="lucide" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name.includes(":") ? name : `oer:${name}`] || ""}&quot;)"></span>`;
const frame = () => new Promise((r) => requestAnimationFrame(r));
const plural = (n, noun) => `${n} ${noun}${n === 1 ? "" : "s"}`;
const lower = (s) => (s ? s[0].toLowerCase() + s.slice(1) : s);
const withArticle = (noun) => `${/^[aeiou]/i.test(noun) ? "an" : "a"} ${noun}`;
const haxStore = () => globalThis.HaxStore?.requestAvailability?.() ?? null;

const OPEN_KEY = "oer-sections-open";
// the phone layout: a window below 48rem (a phone, or 200% zoom on a laptop)
const PHONE = globalThis.matchMedia("(width < 48rem)");
// a microsite's standard sections, in order, by its page type
const STANDARD = {
  [COURSE_SITE_TYPE]: COURSE_SITE_STARTER,
  [COURSE_HUB_TYPE]: HUB_STARTER,
};
const standardTags = (type) => (STANDARD[type] || "").split("\n").map((line) => /^<([a-z][\w-]*)/.exec(line)?.[1]).filter(Boolean);

function remembered() {
  try {
    return globalThis.localStorage.getItem(OPEN_KEY) === "true";
  } catch {
    return false;
  }
}
function remember(open) {
  try {
    globalThis.localStorage.setItem(OPEN_KEY, open ? "true" : "false");
  } catch {
    // (private windows: open just this once)
  }
}

const theme = () => globalThis.document.querySelector("custom-oer-docs-theme");
// the editing bar's Sections, or ⋯ More when it has moved there
function sectionsButton() {
  const root = theme()?.shadowRoot?.querySelector("oer-edit-bar")?.shadowRoot;
  const shown = (el) => !!el && el.checkVisibility();
  const own = root?.querySelector('[data-id="sections"]');
  return shown(own) ? own : root?.querySelector('[data-id="more"]') || null;
}

// a unit's own commands, as it declares them to HAX's block toolbar
// (inlineContextMenu: plate.ceButtons), as the rail runs them
async function ceButtonsOf(unit) {
  const hax = haxStore();
  const proxy = { ceButtons: [], activeNode: unit };
  if (unit && hax?.testHook?.(unit, "inlineContextMenu")) await hax.runHook(unit, "inlineContextMenu", [proxy]);
  return (proxy.ceButtons || []).map((b) => ({ ...b, run: () => typeof unit[b.callback] === "function" && unit[b.callback]() }));
}

/* ---------- the rows ---------- */

const sectionsOf = (body) => [...body.children].filter((el) => policyOf(el).kind === "section");
const itemsOf = (section) => [...section.children].filter((el) => policyOf(el).kind === "item");

// what a section's row says: its name, and its count or state as words
function sectionRow(section, items) {
  const policy = policyOf(section);
  const label = policy.label || labelOf(section);
  const meta = [];
  if (items.length) meta.push(plural(items.length, (policyOf(items[0]).label || "item").toLowerCase()));
  if (section.hasAttribute(HIDDEN)) meta.push("Hidden from readers");
  else if (section.shown === false) meta.push("Empty: readers won't see it");
  if (policy.source) meta.push(policy.source.label);
  return { label, meta, hidden: section.hasAttribute(HIDDEN) };
}

// an item's row: its title (or "Outcome 2" until it has one)
function itemRow(item, index) {
  const field = item.querySelector(TEXT_FIELDS);
  const title = field?.textContent.replace(/\s+/g, " ").trim() || "";
  const label = title || `${policyOf(item).label || labelOf(item)} ${index + 1}`;
  return { label, meta: item.hasText === false ? ["Empty: readers won't see it"] : [], hidden: false };
}

function rowsOf(body, expanded) {
  const rows = [];
  if (!body) return rows;
  const sections = sectionsOf(body);
  sections.forEach((section, i) => {
    const items = itemsOf(section);
    const key = section.localName;
    const open = items.length > 0 && expanded.has(key);
    rows.push({ key, unit: section, level: 1, pos: i + 1, size: sections.length, parentKey: null, expandable: items.length > 0, expanded: open, ...sectionRow(section, items) });
    if (open) items.forEach((item, j) => rows.push({ key: `${key}/${j}`, unit: item, level: 2, pos: j + 1, size: items.length, parentKey: key, expandable: false, expanded: false, ...itemRow(item, j) }));
  });
  return rows;
}

// the row's accessible name: "Books, hidden from readers"
const nameOf = (row) => [row.label, ...row.meta.map(lower)].join(", ");

/* ---------- the sheet ---------- */

class OerSiteOutline extends LitElement {
  static get tag() {
    return "oer-site-outline";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      // under the block list while it has focus (Add section…)
      under: { type: Boolean, reflect: true },
      _phone: { state: true },
      _menu: { state: true },
      _tick: { state: true },
    };
  }

  constructor() {
    super();
    this.open = false;
    this.under = false;
    this._phone = PHONE.matches;
    this._menu = null;
    this._tick = 0;
    // the sections whose items show, by tag (one of each per page)
    this.__expanded = new Set();
    // the row with focus (or to take it): its unit, and its key for when
    // the unit is replaced (Undo puts back a copy of the content)
    this.__focusUnit = null;
    this.__focusKey = "";
    this.__typed = "";
    this.__typedAt = 0;
    this.__rows = [];
    this.__observer = new MutationObserver(() => this._soon());
    this.__soon = () => this._soon();
    this.__onState = (e) => this._followState(e.detail.changed);
    this.__onPhone = () => {
      this._phone = PHONE.matches;
    };
    this.__onFocusIn = (e) => {
      const path = e.composedPath();
      if (path.includes(this)) this.under = false;
      else if (path.some((n) => n.localName === "oer-block-inserter")) this.under = true;
    };
    this.__outside = (e) => {
      if (this._menu && !e.composedPath().includes(this.shadowRoot.querySelector(".menu"))) this._closeMenu({ focus: false });
    };
  }

  /* ---------- open and close ---------- */

  /** Open it; with focus, on the row of what's selected (or the first). */
  show({ opener = null, focus = true } = {}) {
    if (!editorState.editing) return;
    if (opener) this.__opener = opener;
    if (!this.open) {
      this.open = true;
      this._watch(true);
      remember(true);
      this._say();
    }
    this._sync();
    if (focus) this.updateComplete.then(() => this.focusTree());
  }

  /** Close it, focus back on Sections when it was here; remember: as this viewer's choice. */
  close({ remember: keep = true, focus = true } = {}) {
    if (!this.open) return;
    const had = this._hasFocus() || this._phone;
    this._closeMenu({ focus: false });
    this.open = false;
    this.under = false;
    this._watch(false);
    if (keep) remember(false);
    this._say();
    const opener = this.__opener?.isConnected && this.__opener.checkVisibility() ? this.__opener : sectionsButton();
    if (focus && had && opener) opener.focus({ preventScroll: true });
  }

  toggle({ opener = null } = {}) {
    if (this.open) this.close();
    else this.show({ opener });
  }

  /** Focus on the tree: the row that has it last, else what's selected, else the first. */
  focusTree() {
    if (!this.open) return false;
    const row = this._rowEl(this._rovingKey());
    row?.focus({ preventScroll: false });
    return !!row;
  }

  _say() {
    globalThis.dispatchEvent(new CustomEvent("oer-sections-state", { detail: { open: this.open } }));
  }

  _hasFocus() {
    return !!this.shadowRoot?.activeElement;
  }

  _watch(on) {
    this.__observer.disconnect();
    for (const type of ["cs-items-change", "cs-section-change"]) globalThis.removeEventListener(type, this.__soon);
    editorState.removeEventListener("change", this.__onState);
    PHONE.removeEventListener("change", this.__onPhone);
    globalThis.removeEventListener("focusin", this.__onFocusIn, true);
    if (!on) return;
    for (const type of ["cs-items-change", "cs-section-change"]) globalThis.addEventListener(type, this.__soon);
    editorState.addEventListener("change", this.__onState);
    PHONE.addEventListener("change", this.__onPhone);
    globalThis.addEventListener("focusin", this.__onFocusIn, true);
    this._observe();
  }

  _observe() {
    this.__observer.disconnect();
    this.__observed = editorState.body;
    if (this.__observed) this.__observer.observe(this.__observed, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: [HIDDEN] });
  }

  _followState(changed) {
    if (changed.has("editing") && !editorState.editing) return this.close({ remember: false, focus: false });
    if (changed.has("body")) this._observe();
    if (changed.has("unit")) {
      this._expandFor(editorState.unit);
      // (chosen on the page: the sheet's focus comes back to it there)
      if (!this._hasFocus()) this.__focusUnit = this.__focusKey = null;
    }
    if (changed.has("unit") || changed.has("preview") || changed.has("body")) this._soon();
  }

  // the page changed: drawn again on the next frame
  _soon() {
    if (this.__pending) return;
    this.__pending = requestAnimationFrame(() => {
      this.__pending = 0;
      this._sync();
    });
  }

  _sync() {
    this._tick++;
  }

  // an item selected on the page: its section's items show
  _expandFor(unit) {
    if (policyOf(unit).kind === "item" && unit.parentElement) this.__expanded.add(unit.parentElement.localName);
  }

  /* ---------- rows and focus ---------- */

  _rowEl(key) {
    return key ? this.shadowRoot?.querySelector(`[role="treeitem"][data-key="${CSS.escape(key)}"]`) : null;
  }

  // the row of what's selected on the page: its unit, or what it's in
  _currentKey() {
    const unit = editorState.unit;
    if (!unit) return "";
    const hit = this.__rows.filter((r) => r.unit === unit || r.unit.contains(unit));
    return hit.at(-1)?.key || "";
  }

  // the row that takes Tab
  _rovingKey() {
    const rows = this.__rows;
    const by = (unit) => rows.find((r) => r.unit === unit)?.key;
    return by(this.__focusUnit) || rows.find((r) => r.key === this.__focusKey)?.key || this._currentKey() || rows[0]?.key || "";
  }

  _focusRow(row) {
    if (!row) return;
    this.__focusUnit = row.unit;
    this.__focusKey = row.key;
    this.requestUpdate();
    this.updateComplete.then(() => this._rowEl(row.key)?.focus());
  }

  _rowOf(el) {
    return this.__rows.find((r) => r.key === el?.dataset?.key) || null;
  }

  updated() {
    // (a move or an Undo redrew the rows under focus: it stays with its unit)
    const active = this.shadowRoot.activeElement;
    if (active?.getAttribute?.("role") === "treeitem") {
      const key = this._rovingKey();
      if (active.dataset.key !== key) this._rowEl(key)?.focus({ preventScroll: true });
    }
    const dialog = this.shadowRoot.querySelector("dialog");
    if (dialog && !dialog.open) {
      dialog.showModal();
      this.focusTree();
    }
  }

  /* ---------- keys ---------- */

  _treeKeys(e) {
    const row = this._rowOf(e.target.closest?.('[role="treeitem"]'));
    if (!row || e.isComposing) return;
    const rows = this.__rows;
    const at = rows.indexOf(row);
    const mod = e.ctrlKey || e.metaKey;
    let handled = true;
    if (e.altKey && e.shiftKey && !mod && (e.key === "ArrowUp" || e.key === "ArrowDown")) this._act(row, () => ops.move(row.unit, e.key === "ArrowUp" ? -1 : 1));
    else if ((e.shiftKey && e.key === "F10" && !mod && !e.altKey) || e.key === "ContextMenu") this._openMenu(row);
    else if (e.altKey || mod || e.shiftKey) handled = false;
    else if (e.key === "ArrowDown") this._focusRow(rows[at + 1]);
    else if (e.key === "ArrowUp") this._focusRow(rows[at - 1]);
    else if (e.key === "Home") this._focusRow(rows[0]);
    else if (e.key === "End") this._focusRow(rows.at(-1));
    else if (e.key === "ArrowRight") {
      if (row.expandable && !row.expanded) this._setExpanded(row, true);
      else if (row.expanded) this._focusRow(rows[at + 1]);
    } else if (e.key === "ArrowLeft") {
      if (row.expanded) this._setExpanded(row, false);
      else if (row.parentKey) this._focusRow(rows.find((r) => r.key === row.parentKey));
    } else if (e.key === "Enter") this._goTo(row);
    else if (e.key === " ") this._select(row);
    else if (e.key === "Delete" || e.key === "Backspace") this._act(row, () => ops.remove(row.unit), { removing: true });
    else if (e.key.length === 1) this._typeAhead(e.key, at);
    else handled = false;
    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  // Esc anywhere in the sheet closes it (the actions menu takes its own first)
  _sheetKeys(e) {
    if (e.key !== "Escape" || e.defaultPrevented || e.isComposing || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    e.stopPropagation();
    this.close();
  }

  // type-ahead: the next row whose name starts with what's typed
  _typeAhead(key, at) {
    const now = performance.now();
    this.__typed = now - this.__typedAt < 700 ? this.__typed + key.toLowerCase() : key.toLowerCase();
    this.__typedAt = now;
    const rows = this.__rows;
    // (one letter again: the next of them, not the same)
    const from = this.__typed.length === 1 ? at + 1 : at;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[(from + i) % rows.length];
      if (row.label.toLowerCase().startsWith(this.__typed)) return this._focusRow(row);
    }
  }

  _setExpanded(row, open) {
    if (open) this.__expanded.add(row.key);
    else this.__expanded.delete(row.key);
    this._focusRow(row);
  }

  // Enter: to the row on the page, focus on its name tag (on a phone the
  // sheet closes first: it's modal there)
  _goTo(row) {
    if (!row.unit.isConnected) return;
    this.__focusUnit = row.unit;
    if (this._phone) this.close({ remember: false, focus: false });
    ops.select(row.unit);
  }

  // Space or a click: selected on the page, focus staying here
  _select(row) {
    if (!row.unit.isConnected) return;
    this.__focusUnit = row.unit;
    this.__focusKey = row.key;
    ops.select(row.unit, { focus: false });
    editorState.update?.();
    this._sync();
  }

  // a click selects it on the page (a tap on a phone, where the sheet
  // covers the page, goes to it)
  _click(e, row) {
    if (e.button !== 0) return;
    if (this._phone) return this._goTo(row);
    this._select(row);
    this._focusRow(row);
  }

  // a change from here, through ops.js: focus comes back to the row (of
  // what's selected after a removal), whatever the change did with it
  async _act(row, run, { removing = false } = {}) {
    const index = this.__rows.indexOf(row);
    this.__focusUnit = row.unit;
    this.__focusKey = row.key;
    await run();
    await frame();
    await frame();
    if (!this.open || globalThis.document.querySelector("oer-confirm")?.shadowRoot?.querySelector("dialog[open]")) return;
    // (a field the change put the caret in keeps it)
    if (editorState.mode === "typing" && !this._hasFocus()) return;
    this._sync();
    await this.updateComplete;
    let target = this.__rows.find((r) => r.unit === row.unit);
    if (removing && !target) target = this.__rows.find((r) => r.key === this._currentKey()) || this.__rows[Math.min(index, this.__rows.length - 1)];
    this._focusRow(target || this.__rows.find((r) => r.key === row.key) || this.__rows[0]);
  }

  /* ---------- a row's actions (Shift+F10, ⋯) ---------- */

  async _openMenu(row, anchor = null) {
    const items = policyOf(row.unit).kind === "item" ? await this._itemActions(row) : await this._sectionActions(row);
    const el = anchor || this._rowEl(row.key);
    const r = el?.getBoundingClientRect();
    const sheet = this.shadowRoot.querySelector(".sheet")?.getBoundingClientRect();
    this._menu = { row, items, x: r ? Math.round((sheet?.right ?? r.right) + 4) : 0, y: r ? Math.round(r.top) : 0 };
    await this.updateComplete;
    const menu = this.shadowRoot.querySelector(".menu");
    if (!menu) return;
    menu.showPopover?.();
    // (kept inside the window: beside the sheet when there's room, else over it)
    const m = menu.getBoundingClientRect();
    const x = m.right > innerWidth - 8 ? Math.max(8, (r?.left ?? 8) + 24) : m.left;
    const y = Math.max(8, Math.min(m.top, innerHeight - m.height - 8));
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
    globalThis.addEventListener("pointerdown", this.__outside, true);
    menu.querySelector('[role="menuitem"]:not([aria-disabled="true"])')?.focus();
  }

  _closeMenu({ focus = true } = {}) {
    if (!this._menu) return;
    const { row } = this._menu;
    this.shadowRoot.querySelector(".menu")?.hidePopover?.();
    this._menu = null;
    globalThis.removeEventListener("pointerdown", this.__outside, true);
    if (focus) this._focusRow(this.__rows.find((r) => r.unit === row.unit) || row);
  }

  _menuKeys(e) {
    const items = [...e.currentTarget.querySelectorAll('[role="menuitem"]')];
    const at = items.indexOf(e.target);
    const go = (i) => items[(i + items.length) % items.length]?.focus();
    const keys = {
      ArrowDown: () => go(at + 1),
      ArrowUp: () => go(at - 1),
      Home: () => go(0),
      End: () => go(items.length - 1),
      Escape: () => this._closeMenu(),
      Tab: () => this._closeMenu(),
    };
    const run = keys[e.key];
    if (!run) return;
    e.preventDefault();
    e.stopPropagation();
    run();
  }

  _runItem(item) {
    if (item.disabled) return;
    const { row } = this._menu;
    this._closeMenu({ focus: !item.leaves });
    if (item.leaves && this._phone) this.close({ remember: false, focus: false });
    if (item.leaves) item.run();
    else this._act(row, item.run, { removing: item.removes });
  }

  // a verb, switched off with ops.js's reason where it can't be done
  _verb(unit, label, icon, action, run, { dir = 1, danger = false, removes = false } = {}) {
    const why = ops.whyNot(action, unit, { dir });
    return { label, icon, danger, removes, disabled: !!why, hint: why, run };
  }

  // a section's: where its content comes from, Move, Add, Duplicate, Hide
  // or Show, Remove; then its own (Add an outcome) (as the rail's Section ▾)
  async _sectionActions(row) {
    const section = row.unit;
    const ce = await ceButtonsOf(section);
    const take = (...callbacks) => {
      const i = ce.findIndex((b) => callbacks.includes(b.callback));
      return i < 0 ? null : ce.splice(i, 1)[0];
    };
    const source = take("haxEditSource");
    const hide = take("haxHideFromReaders", "haxShowToReaders");
    const add = take("haxAddItem");
    const { pin } = policyOf(section);
    const stays = pin && `${phraseOf(section, { start: true })} stays at the ${pin === "first" ? "top" : "end"}`;
    const sections = sectionsOf(section.parentElement);
    const before = sections[sections.indexOf(section) - 1];
    const out = [];
    if (source) out.push({ label: source.label, icon: "arrow-right", run: source.run, leaves: true }, null);
    out.push(
      this._verb(section, "Move up", "arrow-up", "move", () => ops.move(section, -1), { dir: -1 }),
      this._verb(section, "Move down", "arrow-down", "move", () => ops.move(section, 1), { dir: 1 }),
      null,
      { label: "Add above…", icon: "arrow-up-to-line", disabled: pin === "first" || !before, hint: pin === "first" ? stays : "", leaves: true, run: () => insertRequest({ near: before }) },
      { label: "Add below…", icon: "arrow-down-to-line", disabled: pin === "last", hint: pin === "last" ? stays : "", leaves: true, run: () => insertRequest({ near: section }) },
      this._verb(section, "Duplicate", "copy", "duplicate", () => ops.duplicate(section)),
    );
    if (hide) {
      const hiding = hide.callback === "haxHideFromReaders";
      out.push(this._verb(section, hiding ? "Hide from readers" : "Show to readers", hiding ? "eye-off" : "eye", hiding ? "hide" : "show", () => (hiding ? ops.hide(section) : ops.show(section))));
    }
    out.push(this._verb(section, "Remove section", "trash-2", "remove", () => ops.remove(section), { danger: true, removes: true }));
    const own = [add, ...ce].filter(Boolean).map((b) => ({ label: b.label, icon: b.callback === "haxAddItem" ? "plus" : "arrow-right", run: b.run, leaves: true }));
    if (own.length) out.push(null, ...own);
    return out;
  }

  // an item's: Move (earlier and later for cards and chips), Add,
  // Duplicate, Remove; then its own (as the rail's item menu)
  async _itemActions(row) {
    const item = row.unit;
    const ce = await ceButtonsOf(item);
    const noun = (policyOf(item).label || "item").toLowerCase();
    const along = ["cards", "chips"].includes(policyOf(item.parentElement).flow);
    const addWhy = ops.whyNot("add-item", item);
    const add = (where, above) => ({ label: `Add ${withArticle(noun)} ${where}`, icon: above ? "arrow-up-to-line" : "arrow-down-to-line", disabled: !!addWhy, hint: addWhy, leaves: true, run: () => ops.addItem(item, { above }) });
    const out = [
      this._verb(item, along ? "Move earlier" : "Move up", "arrow-up", "move", () => ops.move(item, -1), { dir: -1 }),
      this._verb(item, along ? "Move later" : "Move down", "arrow-down", "move", () => ops.move(item, 1), { dir: 1 }),
      null,
      add(along ? "before" : "above", true),
      add(along ? "after" : "below", false),
      { ...this._verb(item, "Duplicate", "copy", "duplicate", () => ops.duplicate(item)), leaves: true },
      this._verb(item, `Remove ${noun}`, "trash-2", "remove", () => ops.remove(item), { danger: true, removes: true }),
    ];
    if (ce.length) out.push(null, ...ce.map((b) => ({ label: b.label, icon: "arrow-right", run: b.run, leaves: true })));
    return out;
  }

  /* ---------- not on this page ---------- */

  // the standard sections this page lacks, in their standard order
  _missing(body) {
    if (!body) return [];
    const type = store.activeItem?.metadata?.pageType;
    const here = new Set(sectionsOf(body).map((s) => s.localName));
    return standardTags(type).filter((tag) => !here.has(tag) && globalThis.customElements.get(tag) && policyOfTag(tag).kind === "section");
  }

  _addBack(tag) {
    if (this._phone) this.close({ remember: false, focus: false });
    insertRequest({ tag });
  }

  // Add section…: the inserter's list after what's selected (else before
  // the section pinned last, else at the end)
  _addSection() {
    const sections = sectionsOf(editorState.body);
    const current = this.__rows.find((r) => r.key === this._currentKey());
    const section = current && (current.level === 1 ? current.unit : current.unit.parentElement);
    const unpinned = sections.filter((s) => policyOf(s).pin !== "last");
    const near = section && policyOf(section).pin !== "last" ? section : unpinned.at(-1) || null;
    if (this._phone) this.close({ remember: false, focus: false });
    insertRequest({ near });
  }

  /* ---------- render ---------- */

  render() {
    if (!this.open || !editorState.editing || editorState.preview) return html``;
    void this._tick;
    const body = editorState.body;
    this.__rows = rowsOf(body, this.__expanded);
    const roving = this._rovingKey();
    const current = this._currentKey();
    const missing = this._missing(body);
    const keys = isMac ? "Option+Shift+Up or Down" : "Alt+Shift+Up or Down";
    const nav = html`<nav class="sheet" aria-labelledby="t" @keydown="${this._sheetKeys}">
      <header>
        <h2 id="t">Page sections</h2>
        <button class="x" aria-label="Close" title="Close (Esc)" @click="${() => this.close()}">${lucide("x")}</button>
      </header>
      <div class="scroll">
        <div role="tree" aria-labelledby="t" aria-describedby="hint" @keydown="${this._treeKeys}">
          ${this.__rows.map((row) => this._renderRow(row, row.key === roving, row.key === current))}
        </div>
        ${missing.length
          ? html`<section class="missing" aria-labelledby="m">
              <h3 id="m">Not on this page</h3>
              <ul>
                ${missing.map((tag) => {
                  const label = policyOfTag(tag).label || labelOf(tag);
                  return html`<li><span class="name">${label}</span><button class="btn outline sm" aria-label="Add back ${label}" @click="${() => this._addBack(tag)}">Add back</button></li>`;
                })}
              </ul>
            </section>`
          : ""}
        <button class="btn outline add" @click="${() => this._addSection()}">${lucide("plus")}Add section…</button>
      </div>
      <p class="hint" id="hint">Enter goes to it on the page. ${keys} moves it; Shift+F10 shows what else you can do.</p>
      ${this._renderMenu()}
    </nav>`;
    if (!this._phone) return nav;
    return html`<dialog aria-labelledby="t" @cancel="${(e) => (e.preventDefault(), this.close())}" @click="${(e) => e.target === e.currentTarget && this.close()}">${nav}</dialog>`;
  }

  _renderRow(row, tabbable, current) {
    const icon = row.expandable ? (row.expanded ? "chevron-down" : "chevron-right") : "";
    return html`<div
      role="treeitem"
      class="row level-${row.level} ${row.hidden ? "hidden" : ""}"
      data-key="${row.key}"
      aria-level="${row.level}"
      aria-posinset="${row.pos}"
      aria-setsize="${row.size}"
      .ariaExpanded="${row.expandable ? String(row.expanded) : null}"
      aria-selected="${current ? "true" : "false"}"
      aria-label="${nameOf(row)}"
      aria-keyshortcuts="Enter Space Alt+Shift+ArrowUp Alt+Shift+ArrowDown Delete Shift+F10"
      tabindex="${tabbable ? "0" : "-1"}"
      @focus="${() => ((this.__focusUnit = row.unit), (this.__focusKey = row.key))}"
      @click="${(e) => this._click(e, row)}"
      @contextmenu="${(e) => (e.preventDefault(), this._openMenu(row))}"
    >
      <span class="twist" aria-hidden="true" @click="${(e) => (e.stopPropagation(), this._setExpanded(row, !row.expanded))}">${icon ? lucide(icon) : ""}</span>
      <span class="label">${row.hidden ? lucide("eye-off") : ""}${row.label}</span>
      ${row.meta.length ? html`<span class="meta" aria-hidden="true">${row.meta.join(" · ")}</span>` : ""}
      <button class="more" tabindex="-1" aria-hidden="true" title="Actions (Shift+F10)" @click="${(e) => (e.stopPropagation(), this._openMenu(row, e.currentTarget))}">${lucide("icons:more-horiz")}</button>
    </div>`;
  }

  _renderMenu() {
    const menu = this._menu;
    if (!menu) return "";
    return html`<div class="menu" popover="manual" role="menu" aria-label="Actions for ${menu.row.label}" style="left:${menu.x}px;top:${menu.y}px" @keydown="${this._menuKeys}">
      ${menu.items.map((item) =>
        item
          ? html`<button role="menuitem" tabindex="-1" class="${item.danger ? "danger" : ""}" aria-disabled="${item.disabled ? "true" : "false"}" @click="${() => this._runItem(item)}">
              ${lucide(item.icon)}<span>${item.label}</span>${item.hint ? html`<span class="why">${item.hint}</span>` : ""}
            </button>`
          : html`<div role="separator"></div>`,
      )}
    </div>`;
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--popover-foreground, var(--foreground));
      }
      /* over the page's left side, its selection chrome included
         (oer-block-frame 9985, oer-block-rail 9991), and under dialogs; under
         the block list while that has focus (Add section…) */
      .sheet {
        position: fixed;
        z-index: 9997;
        top: calc(var(--editor-bar-height, 0px) + 0.5rem);
        left: 0.5rem;
        bottom: 0.5rem;
        display: flex;
        flex-direction: column;
        width: min(20rem, calc(100vw - 1rem));
        box-sizing: border-box;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg, 0.75rem);
        background: var(--popover, var(--background));
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
      }
      :host([under]) .sheet {
        z-index: 9987;
      }
      dialog {
        padding: 0;
        border: 0;
        background: none;
        max-width: none;
        max-height: none;
      }
      dialog::backdrop {
        background: rgb(0 0 0 / 0.4);
      }
      dialog .sheet {
        top: 0.5rem;
        width: min(22rem, calc(100vw - 2.5rem));
      }
      header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.625rem 0.5rem 0.625rem 1rem;
        border-bottom: 1px solid var(--border);
      }
      h2 {
        margin: 0;
        font-size: 0.9375rem;
        font-weight: 600;
      }
      .x {
        all: unset;
        display: inline-grid;
        place-items: center;
        width: 2rem;
        height: 2rem;
        margin-left: auto;
        border-radius: var(--radius-md);
        cursor: pointer;
      }
      .x:hover {
        background: var(--accent);
      }
      .x:focus-visible,
      .btn:focus-visible,
      [role="menuitem"]:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
      .scroll {
        flex: 1;
        overflow-y: auto;
        padding: 0.375rem;
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
      [role="tree"] {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }
      .row {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.375rem;
        min-height: 2rem;
        padding: 0.25rem 0.25rem 0.25rem 0.25rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        line-height: 1.3;
        cursor: pointer;
        outline: none;
      }
      .row.level-2 {
        padding-left: 1.75rem;
        font-size: 0.8125rem;
      }
      .row:hover {
        background: var(--accent);
      }
      .row[aria-selected="true"] {
        background: var(--accent);
        box-shadow: inset 3px 0 0 var(--primary);
      }
      .row:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: -2px;
      }
      .twist {
        display: inline-grid;
        place-items: center;
        flex: none;
        width: 1.25rem;
        height: 1.5rem;
        color: var(--muted-foreground);
      }
      .label {
        flex: 0 1 auto;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        min-width: 2.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 500;
      }
      .level-2 .label {
        font-weight: 400;
        display: block;
      }
      .meta {
        flex: 1 1 0%;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .label + .meta::before {
        content: "·";
        margin: 0 0.3125rem;
      }
      .row:not(:has(.meta)) .label {
        flex: 1 1 auto;
      }
      .row.hidden .label {
        color: var(--muted-foreground);
      }
      .more {
        all: unset;
        flex: none;
        display: inline-grid;
        place-items: center;
        width: 1.75rem;
        height: 1.75rem;
        margin-left: auto;
        border-radius: var(--radius-sm);
        color: var(--muted-foreground);
        cursor: pointer;
        visibility: hidden;
      }
      .row:hover .more,
      .row:focus-within .more,
      .row[aria-selected="true"] .more {
        visibility: visible;
      }
      .more:hover {
        background: var(--background);
        color: var(--foreground);
      }
      .missing {
        margin-top: 0.75rem;
        padding-top: 0.75rem;
        border-top: 1px solid var(--border);
      }
      h3 {
        margin: 0 0 0.25rem 0.5rem;
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--muted-foreground);
      }
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        min-height: 2rem;
        padding: 0.125rem 0.25rem 0.125rem 0.5rem;
        font-size: 0.875rem;
      }
      li .name {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2rem;
        padding: 0 0.75rem;
        border: 1px solid transparent;
        border-radius: var(--radius-md);
        background: none;
        font: inherit;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--foreground);
        cursor: pointer;
      }
      .btn.sm {
        height: 1.75rem;
        padding: 0 0.625rem;
        font-size: 0.8125rem;
      }
      .btn.outline {
        border-color: var(--input-border, var(--border));
        background: var(--background);
      }
      .btn.outline:hover {
        background: var(--accent);
      }
      .btn.add {
        width: 100%;
        justify-content: center;
        margin-top: 0.75rem;
      }
      .hint {
        margin: 0;
        padding: 0.5rem 1rem 0.625rem;
        border-top: 1px solid var(--border);
        font-size: 0.75rem;
        line-height: 1.45;
        color: var(--muted-foreground);
      }
      .menu {
        position: fixed;
        inset: auto;
        margin: 0;
        min-width: 14rem;
        max-width: min(22rem, calc(100vw - 1rem));
        max-height: min(28rem, calc(100dvh - 2rem));
        overflow-y: auto;
        box-sizing: border-box;
        padding: 0.25rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        background: var(--popover, var(--background));
        color: var(--popover-foreground, var(--foreground));
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
        font-family: var(--font-sans, system-ui, sans-serif);
      }
      [role="menuitem"] {
        all: unset;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        min-height: 2rem;
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
        cursor: pointer;
      }
      [role="menuitem"]:hover,
      [role="menuitem"]:focus {
        background: var(--accent);
      }
      [role="menuitem"].danger {
        color: var(--destructive);
      }
      [role="menuitem"][aria-disabled="true"] {
        color: var(--muted-foreground);
        cursor: default;
      }
      .why {
        margin-left: auto;
        padding-left: 0.75rem;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      [role="separator"] {
        height: 1px;
        margin: 0.25rem 0;
        background: var(--border);
      }
      @media (forced-colors: active) {
        .row[aria-selected="true"] {
          outline: 2px solid Highlight;
          outline-offset: -2px;
        }
      }
    `;
  }
}

if (!customElements.get(OerSiteOutline.tag)) customElements.define(OerSiteOutline.tag, OerSiteOutline);

// ask the block inserter (editor/oer-block-inserter.js) for a section:
// tag, added back in its standard place; or near, its list after that one
function insertRequest({ tag = "", near = null } = {}) {
  const detail = { kind: "section" };
  if (tag) detail.tag = tag;
  if (near) detail.near = near;
  globalThis.dispatchEvent(new CustomEvent("oer-insert-request", { detail }));
}

/** The Sections sheet (one, under <body>). */
export function siteOutline() {
  const doc = globalThis.document;
  return doc.querySelector(OerSiteOutline.tag) || doc.body.appendChild(doc.createElement(OerSiteOutline.tag));
}

// a microsite being edited (a course site or OER Courses): its sections
const microsite = () => [COURSE_SITE_TYPE, COURSE_HUB_TYPE].includes(store.activeItem?.metadata?.pageType);

let installed = false;
/**
 * The editing bar's Sections opens and closes the sheet; as the editing of
 * a microsite begins, the sheet opens again for a viewer who left it open.
 */
export function installSiteOutline() {
  if (installed) return;
  installed = true;
  globalThis.addEventListener("oer-sections-toggle", (e) => {
    e.preventDefault();
    siteOutline().toggle({ opener: e.detail?.opener ?? null });
  });
  globalThis.addEventListener("haxcms-edit-mode-changed", async (e) => {
    if (!e.detail) {
      globalThis.document.querySelector(OerSiteOutline.tag)?.close({ remember: false, focus: false });
      return;
    }
    if (!remembered()) return;
    // (once the editor has the page: what the editing bar waits for too)
    const start = performance.now();
    while (store.editMode && !(editorState.editing && editorState.tracking) && performance.now() - start < 5000) await frame();
    if (store.editMode && editorState.editing && microsite() && !PHONE.matches) siteOutline().show({ focus: false });
  });
}
