/**
 * `oer-block-inserter` — adding sections and blocks where you can see them
 * land (nu-hax docs/editor-redesign/spec.md §4.5).
 *
 * Seams: between the page's top-level units, a line as wide as the content
 * with a centred 28px "+ Add" pill, shown when the pointer is within 12px
 * of the boundary (or in the gap), when the pill has keyboard focus, and
 * always above and below the selected section. None above a unit pinned
 * first (the hero) or below one pinned last (Ready to start). Between the
 * blocks of a column, the same, as wide as the column. After the page's
 * last unit, unless it's pinned last, an "Add block" row stays.
 *
 *   ─────────────────────────── ( + Add ) ───────────────────────────
 *
 * The flyout (a shadcn Command in a Popover) offers, in order:
 *
 *   Not on this page   the page type's standard sections it doesn't have
 *                      (What you'll make), each Add back: in its standard
 *                      place, wherever the flyout was opened (ops.js
 *                      addSection)
 *   On this page       the ones it has, off, each Go to it
 *   Blocks             about 15, plainly named (BLOCKS), each starting
 *                      empty: a paragraph with the caret in it, empty
 *                      columns, an image that asks for its picture
 *   All blocks…        every block HAX offers, by category, searchable
 *
 * Only what may go where it was opened (slots.js refusal): course-site
 * sections only on course sites and hub blocks only on the hub (their
 * pageTypes), inside a section with items only its own item, nothing in
 * columns that never goes in them. Typing searches all of it. Inserting is
 * one undo step through ops.js; the new block scrolls to the centre.
 *
 * Opened from a seam, from the rail's Add above / below… and Insert block
 * above / below… (openFor), from Mod+Enter on a name tag, and by a window
 * `oer-insert-request` event { kind: "section", tag?, near?, opener? } (the
 * Sections sheet's "+ Add section…" and Add back): with tag it adds that
 * standard section back; otherwise it opens below near (a section, or its
 * tag), or below the selected section, with the sections only. Escape
 * closes it and gives focus back to what opened it (the opener, when one
 * is known: an element, or a function that gives focus back).
 *
 * It follows the editor's state (editor-state.js) and the pointer, and
 * measures only when one of them changes or the page scrolls.
 * @element oer-block-inserter
 */
import { html, css, LitElement } from "../lit.js";
import { editorState, contentView } from "./editor-state.js";
import { computeSlots, sameSlot, insertInSlot, refusal, standardSections, standardSlot } from "./slots.js";
import { policyOf, policyOfTag, labelOf, phraseOf } from "./policy.js";
import { ops } from "./ops.js";
import { checkpoint } from "./undo.js";
import { announce } from "./announce.js";

const PANEL_W = 288;
const PREVIEW_W = 288;
// how near a seam the pointer shows it, above and below
const NEAR = 12;
const PILL = 28;

/**
 * The Blocks group, in order: what authors call each, its icon, and what a
 * new one starts as ({ content, properties }), where HAX's demo would need
 * deleting first (no "Deep thoughts", no cat photo). `image` ones ask for
 * their picture once in (the image popover answers oer-edit-request
 * { action: "image" }).
 */
const BLOCKS = [
  { tag: "p", label: "Paragraph", icon: "oer:pilcrow" },
  { tag: "h2", label: "Heading 2", icon: "oer:heading-2" },
  { tag: "h3", label: "Heading 3", icon: "oer:heading-3" },
  { tag: "h4", label: "Heading 4", icon: "oer:heading-4" },
  { tag: "ul", label: "List", icon: "oer:list", content: "<li></li>" },
  { tag: "blockquote", label: "Quote", icon: "oer:quote" },
  { tag: "img", label: "Image", icon: "image:image", properties: { loading: "lazy" }, image: true },
  { tag: "oer-video", label: "Video", icon: "hax:video" },
  { tag: "oer-iframe", label: "Embed", icon: "hax:iframe" },
  { tag: "grid-plate", label: "Columns", icon: "oer:columns-2", content: '<p slot="col-1"></p><p slot="col-2"></p>', properties: { layout: "1-1", itemMargin: 16, itemPadding: 16 } },
  { tag: "hr", label: "Divider", icon: "hax:hr" },
  { tag: "oer-spacer", label: "Spacer", icon: "icons:swap-vert", properties: { size: "md" } },
  { tag: "oer-callout", label: "Callout", icon: "icons:info", properties: { type: "info" }, content: "<p></p>" },
  { tag: "self-check", label: "Self check", icon: "oer:circle-check", content: '<p slot="question"></p><p></p>' },
  { tag: "stop-note", label: "Stop note", icon: "icons:warning", content: '<p slot="message"></p>' },
];
const BLOCK_OF = new Map(BLOCKS.map((b) => [b.tag, b]));
// and other blocks whose demo borrows a picture (All blocks…)
const STARTERS = { ...Object.fromEntries(BLOCK_OF), "media-image": { image: true }, figure: { content: "<img /><figcaption><p></p></figcaption>", image: true } };
// HAX's names that say less than ours ("Heading" four times)
const NAMES = { h1: "Heading 1", ...Object.fromEntries(BLOCKS.map((b) => [b.tag, b.label])) };

const haxStore = () => globalThis.HaxStore?.requestAvailability?.() ?? null;
const theme = () => globalThis.document.querySelector("custom-oer-docs-theme");
const frame = () => new Promise((r) => requestAnimationFrame(r));
const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;

// the page's top-level unit holding el (a section, or a block between them)
function topUnit(el, body) {
  while (el && el.parentElement && el.parentElement !== body) el = el.parentElement;
  return el?.parentElement === body ? el : null;
}

// bring a point of the content (a slot's y) a third of the way down the
// view when it's near an edge or off it, with room for the flyout below it
function intoView(y) {
  const view = contentView();
  if (y > view.top + 48 && y < view.bottom - 48) return;
  const by = Math.round(y - (view.top + (view.bottom - view.top) / 3));
  const main = theme()?.shadowRoot?.querySelector("main");
  if (view.scroller === "main" && main) main.scrollBy({ top: by, behavior: "instant" });
  else globalThis.scrollBy({ top: by, behavior: "instant" });
}

// a seam may not go above a unit pinned first or below one pinned last
const pinnedAway = (slot) => (slot.before && policyOf(slot.before).pin === "first") || (slot.after && policyOf(slot.after).pin === "last");

class OerBlockInserter extends LitElement {
  static get tag() {
    return "oer-block-inserter";
  }

  static get properties() {
    return {
      _seams: { state: true },
      _end: { state: true },
      _open: { state: true },
      _query: { state: true },
      _active: { state: true },
      _all: { state: true },
    };
  }

  constructor() {
    super();
    this._seams = []; // [{ slot, y, left, width, why: "selected" | "near" | "chosen" | "focus" }]
    this._end = null; // { y, left, width }
    this._open = null; // { slot, x, y, sections, opener }
    this._query = "";
    this._active = 0;
    this._all = false;
    this.__pointer = null;
    this.__frame = 0;
    this.__schedule = () => {
      if (!this.__frame) this.__frame = requestAnimationFrame(() => this._measure());
    };
    this.__move = (e) => {
      this.__pointer = { x: e.clientX, y: e.clientY };
      this.__schedule();
    };
    this.__leave = (e) => {
      if (e.relatedTarget) return;
      this.__pointer = null;
      this.__schedule();
    };
    this.__outside = (e) => {
      if (this._open && !e.composedPath().includes(this)) this.close();
    };
    this.__request = (e) => this._request(e);
    // keys stop here (HAX acts on keys anywhere in the window),
    // but chords with Ctrl or ⌘ (Save, Undo…)
    const stop = (e) => {
      if (!e.ctrlKey && !e.metaKey) e.stopPropagation();
    };
    this.addEventListener("keydown", stop);
    this.addEventListener("keyup", stop);
    this.addEventListener("focusin", this.__schedule);
    this.addEventListener("focusout", this.__schedule);
  }

  connectedCallback() {
    super.connectedCallback();
    editorState.addEventListener("change", this.__schedule);
    globalThis.addEventListener("pointermove", this.__move, { passive: true });
    globalThis.addEventListener("pointerout", this.__leave, { passive: true });
    globalThis.addEventListener("pointerdown", this.__outside, true);
    globalThis.addEventListener("scroll", this.__schedule, { capture: true, passive: true });
    globalThis.addEventListener("resize", this.__schedule, { passive: true });
    globalThis.addEventListener("oer-insert-request", this.__request);
    this.__schedule();
  }

  disconnectedCallback() {
    editorState.removeEventListener("change", this.__schedule);
    globalThis.removeEventListener("pointermove", this.__move);
    globalThis.removeEventListener("pointerout", this.__leave);
    globalThis.removeEventListener("pointerdown", this.__outside, true);
    globalThis.removeEventListener("scroll", this.__schedule, { capture: true });
    globalThis.removeEventListener("resize", this.__schedule);
    globalThis.removeEventListener("oer-insert-request", this.__request);
    this.__main?.removeEventListener("scroll", this.__schedule);
    cancelAnimationFrame(this.__frame);
    super.disconnectedCallback();
  }

  get _hax() {
    return haxStore();
  }

  get _body() {
    return editorState.body || this._hax?.activeHaxBody || null;
  }

  /* ---------- seams ---------- */

  // the content's own scroller (main, in the theme's shadow root) sends no
  // scroll events past its root: listen on it
  _followScroll() {
    const main = theme()?.shadowRoot?.querySelector("main") || null;
    if (main === this.__main) return;
    this.__main?.removeEventListener("scroll", this.__schedule);
    this.__main = main;
    main?.addEventListener("scroll", this.__schedule, { passive: true });
  }

  _measure() {
    this.__frame = 0;
    const s = editorState;
    const body = s.editing && !s.preview && !s.saving && !s.dragging && !s.body?.hasAttribute("data-oer-preview") ? s.body : null;
    if (!body) {
      if (this._seams.length) this._seams = [];
      if (this._end) this._end = null;
      if (!s.editing || s.preview || s.saving) this.close();
      return;
    }
    this._followScroll();
    const view = contentView();
    const slots = computeSlots(body);
    const seams = [];
    const add = (slot, why) => {
      if (slot.end || pinnedAway(slot) || seams.some((m) => sameSlot(m.slot, slot))) return;
      const y = Math.round(slot.top + slot.height / 2);
      if (y < view.top + PILL / 2 || y > view.bottom - PILL / 2) return;
      const left = Math.round(slot.nested ? slot.left : view.left);
      const width = Math.round(slot.nested ? slot.width : view.right - view.left);
      seams.push({ slot, y, left, width, why });
    };
    // the flyout's, while it's open; the one with focus
    if (this._open) {
      const chosen = slots.find((sl) => sameSlot(sl, this._open.slot));
      if (chosen) add(chosen, "chosen");
    }
    const focused = this.shadowRoot?.activeElement?.closest?.(".slot");
    const was = focused && this._seams[Number(focused.dataset.i)];
    if (was) add(slots.find((sl) => sameSlot(sl, was.slot)) || was.slot, "focus");
    // above and below the selected section
    const section = topUnit(s.unit, body);
    if (section && policyOf(section).kind === "section") {
      for (const sl of slots) if (!sl.nested && (sl.after === section || sl.before === section)) add(sl, "selected");
    }
    // near the pointer: in a column first, then between the page's units
    const p = !this._open && this.__pointer;
    if (p && p.x >= view.left && p.x <= view.right && p.y > view.top && p.y < view.bottom) {
      // (from the edges of the gap between its units, or its line where they abut)
      const near = (sl) => {
        const mid = sl.top + sl.height / 2;
        const top = sl.after ? Math.min(mid, sl.after.getBoundingClientRect().bottom) : mid;
        const bottom = sl.before ? Math.max(mid, sl.before.getBoundingClientRect().top) : mid;
        return p.y > top - NEAR && p.y < bottom + NEAR;
      };
      const nested = slots.find((sl) => sl.nested && near(sl) && p.x >= sl.left && p.x <= sl.left + sl.width);
      const hit = nested || slots.find((sl) => !sl.nested && near(sl));
      if (hit) add(hit, "near");
    }
    // (in page order, so each pill stays the same element as others come and go)
    seams.sort((a, b) => a.y - b.y || a.left - b.left);
    if (JSON.stringify(seams.map(this._key)) !== JSON.stringify(this._seams.map(this._key))) this._seams = seams;
    else this._seams.forEach((m, i) => (m.slot = seams[i].slot));

    // the row after the last unit, unless it's pinned last
    const last = slots.find((sl) => sl.end);
    let end = null;
    if (last && !pinnedAway(last)) {
      const y = Math.round((last.after ? last.after.getBoundingClientRect().bottom : last.top) + 8);
      if (y > view.top + 4 && y + 36 < view.bottom - 4) end = { y, left: Math.round(last.left), width: Math.round(last.width) };
    }
    if (JSON.stringify(end) !== JSON.stringify(this._end)) this._end = end;
  }

  _key(m) {
    return [m.y, m.left, m.width, m.why, m.slot.nested];
  }

  /* ---------- the flyout ---------- */

  /**
   * Open the flyout for a slot (slots.js), from anchor {x, y}. sections:
   * offer the sections only; opener: what focus goes back to on Escape (an
   * element, or a function that gives it back).
   */
  openAt(slot, anchor, { sections = false, opener = null } = {}) {
    this._query = "";
    this._all = false;
    this._open = { slot, x: anchor.x, y: anchor.y, sections, opener };
    this._active = this._firstOn();
    this.__schedule();
    this.updateComplete.then(() => this.shadowRoot.querySelector(".panel input")?.focus());
    return true;
  }

  /**
   * Open for the slot above or below a unit (the rail, a name tag's
   * Mod+Enter): an item's among its section's items, anything else's on the
   * page or in its column. Says why not where nothing may go (above the
   * hero).
   */
  openFor(node, where, { opener = null } = {}) {
    const body = this._body;
    if (!body || !node) return false;
    const item = policyOf(node).kind === "item";
    let unit = node;
    if (!item) while (unit.parentElement && unit.parentElement !== body && policyOf(unit.parentElement).kind !== "layout") unit = unit.parentElement;
    const slot = computeSlots(body, { items: item }).find((sl) => (where === "below" ? sl.after === unit : sl.before === unit) && (!item || sl.kind === "items"));
    if (!slot) return false;
    if (pinnedAway(slot)) {
      announce(refusal(slot, "p"));
      return false;
    }
    intoView(where === "below" ? unit.getBoundingClientRect().bottom : unit.getBoundingClientRect().top);
    const view = contentView();
    const r = unit.getBoundingClientRect();
    return this.openAt(slot, { x: item ? r.left + r.width / 2 : (view.left + view.right) / 2, y: where === "below" ? r.bottom : r.top }, { opener });
  }

  close({ back = false } = {}) {
    if (!this._open) return;
    const { opener } = this._open;
    this._open = null;
    this.__schedule();
    if (!back) return;
    if (typeof opener === "function") opener();
    else if (opener?.isConnected) opener.focus({ preventScroll: true });
  }

  // focus back on a seam's pill (drawn again for its focus once the flyout has gone)
  _focusSeam(slot) {
    const i = this._seams.findIndex((m) => sameSlot(m.slot, slot));
    this.shadowRoot.querySelectorAll(".slot .plus")[i]?.focus({ preventScroll: true });
  }

  // the Sections sheet's "+ Add section…" and Add back (WP-12)
  async _request(e) {
    const d = e.detail || {};
    const body = this._body;
    if (!body?.editMode || (d.kind && d.kind !== "section" && d.kind !== "block")) return;
    e.preventDefault();
    if (d.tag) {
      ops.addSection(d.tag);
      return;
    }
    const opener = d.opener || e.composedPath().find((n) => n instanceof Element) || null;
    let near = typeof d.near === "string" ? body.querySelector(`:scope > ${d.near}`) : d.near;
    near = topUnit(near, body) || topUnit(editorState.unit, body);
    const slots = computeSlots(body);
    // below it, or else the last place on the page something may go
    const slot = (near && slots.find((sl) => sl.after === near && !sl.nested && !pinnedAway(sl))) || slots.filter((sl) => !sl.nested && !pinnedAway(sl)).pop();
    if (!slot) return;
    const edge = () => (slot.after ? slot.after.getBoundingClientRect().bottom : (slot.before?.getBoundingClientRect().top ?? contentView().top));
    intoView(edge());
    await frame();
    const view = contentView();
    const y = edge();
    this.openAt(slot, { x: (view.left + view.right) / 2, y }, { sections: d.kind === "section", opener });
  }

  // what HAX offers to insert, deduplicated by tag, and its templates
  _gizmos() {
    const hax = this._hax;
    const browser = hax?.haxTray?.shadowRoot?.querySelector("hax-gizmo-browser");
    const allowed = (g) => (browser?._gizmoAllowedInTray ? browser._gizmoAllowedInTray(g) : !!g?.tag);
    const seen = new Set();
    const gizmos = (hax?.gizmoList || []).filter((g) => allowed(g) && !seen.has(g.tag) && seen.add(g.tag));
    const templates =
      hax?.platformAllows?.("blockTemplates") === false
        ? []
        : (hax?.staxList || [])
            .filter((t) => t?.stax?.length)
            .map((t) => ({ kind: "stax", stax: t.stax, label: t.details?.title || "Template", description: t.details?.description || "", image: t.details?.image || "", icon: t.details?.icon || "hax:templates", tags: t.details?.tags || [] }));
    return { gizmos, templates, categories: browser?.updateCategories ? browser.updateCategories(gizmos) : [] };
  }

  /**
   * The flyout's groups for where it's open: [{ label, items }], each item
   * { kind, label, icon, tag, hint, off }.
   */
  _groups() {
    const o = this._open;
    const hax = this._hax;
    const body = this._body;
    if (!o || !hax || !body) return [];
    const slot = o.slot;
    const fits = (tag) => !refusal(slot, tag);
    // what's offered as a block: one HAX knows, and that isn't a section,
    // an item or inline (those come their own way)
    const offered = (tag) => policyOfTag(tag).insertable && policyOfTag(tag).kind !== "section" && fits(tag);
    const groups = [];
    const q = this._query.trim().toLowerCase();
    const match = (...words) => !q || words.join(" ").toLowerCase().includes(q);
    // the page's sections, on the page itself
    const standard = slot.kind === "page" ? standardSections() : [];
    const has = (tag) => !!body.querySelector(`:scope > ${tag}`);
    const back = standard
      .filter((tag) => !has(tag) && customElements.get(tag) && !refusal(standardSlot(body, tag), tag))
      .map((tag) => ({ kind: "back", tag, label: labelOf(tag), icon: hax.haxSchemaFromTag(tag)?.gizmo?.icon, hint: "Add back" }));
    const here = standard.filter(has).map((tag) => ({ kind: "here", tag, label: labelOf(tag), icon: hax.haxSchemaFromTag(tag)?.gizmo?.icon, hint: "Go to it", off: true }));
    if (this._all && !q) {
      const { gizmos, templates, categories } = this._gizmos();
      groups.push({ label: "", items: [{ kind: "suggested", label: "Suggested blocks", icon: "oer:arrow-left" }] });
      const all = gizmos.filter((g) => offered(g.tag)).map((g) => ({ kind: "gizmo", tag: g.tag, label: NAMES[g.tag] || g.title, icon: g.icon, gizmo: g }));
      for (const cat of categories) {
        const items = all.filter((g) => (g.gizmo.tags?.[0] || "Other") === cat).sort((a, b) => a.label.localeCompare(b.label));
        if (items.length) groups.push({ label: cat, items });
      }
      if (slot.kind !== "items" && templates.length) groups.push({ label: "Templates", items: templates });
      return groups;
    }
    if (back.length) groups.push({ label: "Not on this page", items: back.filter((b) => match(b.label, b.tag)) });
    if (here.length) groups.push({ label: "On this page", items: here.filter((h) => match(h.label, h.tag)) });
    if (o.sections && standard.length) {
      if (!back.length) groups.unshift({ label: "", items: [], note: "Every section is on this page" });
      return groups.filter((g) => g.items.length || g.note);
    }
    if (slot.kind === "items") {
      // a section's items: only its own
      const own = policyOf(slot.container).accepts.filter((tag) => policyOfTag(tag).kind === "item" && fits(tag));
      groups.push({ label: "Add", items: own.map((tag) => ({ kind: "item", tag, label: labelOf(tag), icon: "oer:plus" })).filter((i) => match(i.label)) });
      return groups.filter((g) => g.items.length);
    }
    const known = (tag) => !!hax.haxSchemaFromTag(tag);
    // (found by HAX's name for them too: "Basic Image")
    const blocks = BLOCKS.filter((b) => known(b.tag) && offered(b.tag)).map((b) => ({ kind: "block", tag: b.tag, label: b.label, icon: b.icon, also: hax.haxSchemaFromTag(b.tag)?.gizmo?.title || "" }));
    if (!q) {
      groups.push({ label: "Blocks", items: blocks });
      groups.push({ label: "", items: [{ kind: "all", label: "All blocks…", icon: "hax:add-brick" }] });
      return groups.filter((g) => g.items.length);
    }
    // typing searches every block HAX offers too
    const { gizmos, templates } = this._gizmos();
    const more = gizmos
      .filter((g) => !BLOCK_OF.has(g.tag) && offered(g.tag) && match(NAMES[g.tag] || g.title, g.tag, g.description || "", ...(g.tags || [])))
      .map((g) => ({ kind: "gizmo", tag: g.tag, label: NAMES[g.tag] || g.title, icon: g.icon, gizmo: g }));
    groups.push({ label: "Blocks", items: [...blocks.filter((b) => match(b.label, b.tag, b.also)), ...more] });
    if (slot.kind !== "items") groups.push({ label: "Templates", items: templates.filter((t) => match(t.label, t.description, ...t.tags)) });
    return groups.filter((g) => g.items.length);
  }

  async _choose(item) {
    const o = this._open;
    if (!item || !o) return;
    if (item.kind === "all" || item.kind === "suggested") {
      this._all = item.kind === "all";
      this._active = this._firstOn();
      this.updateComplete.then(() => this.shadowRoot.querySelector(".panel input")?.focus());
      return;
    }
    const slot = o.slot;
    this.close();
    if (item.kind === "here") {
      ops.select(this._body?.querySelector(`:scope > ${item.tag}`));
      return;
    }
    if (item.kind === "back") {
      await ops.addSection(item.tag);
      return;
    }
    if (item.kind === "item") {
      // after the item before, or before the first, or in the empty section
      if (slot.after) ops.addItem(slot.after);
      else if (slot.before) ops.addItem(slot.before, { above: true });
      else ops.addItem(slot.container);
      return;
    }
    if (item.kind === "stax") {
      await this._template(slot, item);
      return;
    }
    // our starter, or the template HAX's own Insert panel uses (its demo)
    const hax = this._hax;
    const own = STARTERS[item.tag];
    const schema = hax.haxSchemaFromTag(item.tag);
    const start = own ? { content: own.content || "", properties: own.properties || {} } : schema?.demoSchema?.[0] || hax.haxElementPrototype({ tag: item.tag }, {}, "");
    hax.recentGizmoList?.push?.(schema?.gizmo || item.gizmo);
    const added = await ops.insertBlock(slot, item.tag, { content: start.content || "", properties: start.properties || {} });
    // an image asks for its picture (editor/oer-image-popover.js)
    if (added && own?.image) added.dispatchEvent(new CustomEvent("oer-edit-request", { bubbles: true, composed: true, detail: { action: "image", unit: added } }));
  }

  // a template: its blocks in order, each after the one before, as one undo step
  async _template(slot, t) {
    const hax = this._hax;
    const body = this._body;
    if (!body?.editMode) return;
    if (editorState.saving) {
      announce("Wait until the page is saved");
      return;
    }
    checkpoint(body);
    let first = null;
    let target = slot;
    for (const block of t.stax) {
      const el = await insertInSlot(hax, target, block);
      if (!el) break;
      first = first || el;
      target = { ...slot, after: el, before: null };
    }
    await ops.settled(body);
    checkpoint(body, `added ${t.label}`);
    if (!first) return;
    ops.select(first);
    first.scrollIntoView({ block: "center" });
    announce(`${t.label} added, ${plural(t.stax.length, "block")}`);
  }

  _flat() {
    return this._groups().flatMap((g) => g.items);
  }

  // the first option that adds something (not a section that's on the page)
  _firstOn() {
    return Math.max(0, this._flat().findIndex((item) => !item.off));
  }

  _panelKeys(e) {
    const flat = this._flat();
    const typing = e.target.localName === "input";
    if (e.key === "ArrowDown") this._active = Math.min(this._active + 1, flat.length - 1);
    else if (e.key === "ArrowUp") this._active = Math.max(this._active - 1, 0);
    else if (e.key === "Home" && !typing) this._active = 0;
    else if (e.key === "End" && !typing) this._active = flat.length - 1;
    else if (e.key === "Enter") this._choose(flat[this._active]);
    else if (e.key === "Escape") this.close({ back: true });
    else if (e.key === "Backspace" && typing && !this._query && this._all) this._all = false;
    else return;
    e.preventDefault();
    this.updateComplete.then(() => this.shadowRoot.querySelector(`[data-i="${this._active}"]`)?.scrollIntoView({ block: "nearest" }));
  }

  /* ---------- render ---------- */

  static get styles() {
    return css`
      :host {
        position: fixed;
        inset: 0 auto auto 0;
        z-index: 9989;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--popover-foreground);
        pointer-events: none;
      }
      button {
        all: unset;
        box-sizing: border-box;
        cursor: pointer;
      }
      button:focus-visible,
      input:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
      simple-icon-lite {
        flex: none;
        --simple-icon-height: 1rem;
        --simple-icon-width: 1rem;
      }

      /* a seam: a line across the content (or a column) with a centred pill */
      .slot {
        position: fixed;
        height: 0;
        border-top: 1px solid var(--primary);
      }
      .slot.near,
      .slot.selected {
        border-top-color: color-mix(in oklab, var(--primary) 60%, transparent);
      }
      .plus {
        pointer-events: auto;
        position: absolute;
        left: 50%;
        top: ${-PILL / 2}px;
        transform: translateX(-50%);
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        height: ${PILL}px;
        padding: 0 0.75rem 0 0.5rem;
        border-radius: 999px;
        background: var(--primary);
        color: var(--primary-foreground);
        font-size: 0.8125rem;
        font-weight: 500;
        white-space: nowrap;
        box-shadow: 0 0 0 2px var(--background);
        --simple-icon-color: currentColor;
      }
      .plus:hover,
      .slot.chosen .plus {
        background: color-mix(in oklab, var(--primary) 88%, var(--foreground));
      }

      /* the "Add block" row after the last unit */
      .end {
        pointer-events: auto;
        position: fixed;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-sizing: border-box;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px dashed var(--input-border);
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        color: var(--muted-foreground);
        --simple-icon-color: currentColor;
      }
      .end.chosen,
      .end:hover {
        border-color: var(--primary);
        color: var(--foreground);
        background: var(--accent);
      }

      /* the flyout: shadcn Command in a Popover */
      .panel,
      .preview {
        pointer-events: auto;
        position: fixed;
        box-sizing: border-box;
        background: var(--popover);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 8px 24px rgb(0 0 0 / 0.14);
      }
      .panel {
        display: flex;
        flex-direction: column;
        width: ${PANEL_W}px;
        max-height: min(30rem, calc(100dvh - 1rem));
        overflow: hidden;
      }
      .search {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0 0.75rem;
        border-bottom: 1px solid var(--border);
        --simple-icon-color: var(--muted-foreground);
      }
      .search input {
        flex: 1;
        min-width: 0;
        height: 2.5rem;
        border: 0;
        outline: none;
        background: transparent;
        color: var(--foreground);
        font: inherit;
        font-size: 0.875rem;
      }
      .search input::placeholder {
        color: var(--muted-foreground);
      }
      .list {
        overflow-y: auto;
        padding: 0.25rem;
      }
      .group + .group {
        border-top: 1px solid var(--border);
        margin: 0.25rem -0.25rem 0;
        padding: 0.25rem 0.25rem 0;
      }
      .heading,
      .note {
        padding: 0.375rem 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--muted-foreground);
      }
      .note {
        font-weight: 400;
      }
      [role="option"] {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        height: 2rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
        --simple-icon-color: var(--muted-foreground);
      }
      [role="option"] .name {
        flex: 1;
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      [role="option"][aria-disabled="true"] .name {
        color: var(--muted-foreground);
      }
      .hint {
        flex: none;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .back .hint {
        color: var(--foreground);
        font-weight: 500;
      }
      [role="option"][aria-selected="true"] {
        background: var(--accent);
        color: var(--accent-foreground);
      }
      [role="option"][aria-selected="true"] .hint {
        color: var(--accent-foreground);
        text-decoration: underline;
      }
      .empty {
        padding: 1.5rem 0.5rem;
        text-align: center;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      .preview {
        width: ${PREVIEW_W}px;
        overflow: hidden;
      }
      .tpl ol {
        margin: 0;
        padding: 1rem 1rem 1rem 2.25rem;
        background: var(--muted);
        border-bottom: 1px solid var(--border);
        font-size: 0.875rem;
      }
      .tpl img {
        display: block;
        width: 100%;
        max-height: 9rem;
        object-fit: cover;
        border-bottom: 1px solid var(--border);
      }
      .tpl-info {
        padding: 0.75rem 1rem;
      }
      .tpl-title {
        font-size: 0.875rem;
        font-weight: 600;
      }
      .tpl-desc {
        margin-top: 0.25rem;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      @media (forced-colors: active) {
        .slot {
          border-top-color: Highlight;
        }
        .plus {
          border: 1px solid ButtonText;
        }
        [role="option"][aria-selected="true"] {
          outline: 2px solid Highlight;
        }
      }
    `;
  }

  // the seam's name: where it adds
  _seamName(m) {
    const { after, before, kind } = m.slot;
    if (kind === "column") return after ? `Add after ${phraseOf(after)} in this column` : "Add at the top of this column";
    return after ? `Add after ${phraseOf(after)}` : before ? `Add before ${phraseOf(before)}` : "Add here";
  }

  _renderPanel() {
    const o = this._open;
    const groups = this._groups();
    const flat = groups.flatMap((g) => g.items);
    const active = flat[Math.min(this._active, flat.length - 1)];
    const vw = globalThis.innerWidth;
    // centred under where it was opened, kept on screen; updated() lifts it
    // above when it runs off the bottom
    const x = Math.max(8, Math.min(o.x - PANEL_W / 2, vw - PANEL_W - 8));
    const y = Math.max(8, o.y + PILL / 2 + 4);
    const preview = this._all && active && (active.gizmo || active.stax);
    const previewLeft = x + PANEL_W + 8 + PREVIEW_W <= vw - 8 ? x + PANEL_W + 8 : x - PREVIEW_W - 8;
    let i = -1;
    return html`
      <div class="panel" style="left:${x}px;top:${y}px" @keydown="${this._panelKeys}" data-anchor="${o.y}">
        <div class="search">
          <simple-icon-lite icon="icons:search"></simple-icon-lite>
          <input
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="blocks"
            aria-autocomplete="list"
            aria-activedescendant="${active ? `b${Math.min(this._active, flat.length - 1)}` : ""}"
            aria-label="${o.sections ? "Search sections" : "Search blocks"}"
            placeholder="${o.sections ? "Search sections…" : this._all ? "Search all blocks…" : "Search blocks…"}"
            .value="${this._query}"
            @input="${(e) => {
              this._query = e.target.value;
              this._active = this._firstOn();
            }}"
          />
        </div>
        <div class="list" id="blocks" role="listbox" aria-label="${o.sections ? "Sections" : "Blocks"}">
          ${flat.length || groups.some((g) => g.note)
            ? groups.map(
                (g) => html`<div class="group" role="group" aria-label="${g.label || g.note || "More"}">
                  ${g.label ? html`<div class="heading" aria-hidden="true">${g.label}</div>` : ""}
                  ${g.note ? html`<div class="note">${g.note}</div>` : ""}
                  ${g.items.map((item) => {
                    i += 1;
                    const n = i;
                    return html`<button
                      id="b${n}"
                      data-i="${n}"
                      class="${item.kind}"
                      data-tag="${item.tag || ""}"
                      role="option"
                      tabindex="-1"
                      aria-selected="${n === this._active ? "true" : "false"}"
                      aria-disabled="${item.off ? "true" : "false"}"
                      aria-description="${item.off ? "On this page. Enter goes to it" : item.hint || ""}"
                      @mouseenter="${() => (this._active = n)}"
                      @mousedown="${(e) => e.preventDefault()}"
                      @click="${() => this._choose(item)}"
                    >
                      <simple-icon-lite icon="${item.icon || "hax:add-brick"}"></simple-icon-lite>
                      <span class="name">${item.label}</span>
                      ${item.hint ? html`<span class="hint" aria-hidden="true">${item.hint}</span>` : ""}
                    </button>`;
                  })}
                </div>`,
              )
            : html`<div class="empty">Nothing found</div>`}
        </div>
      </div>
      ${preview
        ? html`<div class="preview" style="left:${previewLeft}px;top:${y}px" aria-hidden="true">
            ${active.stax
              ? this._renderTemplatePreview(active)
              : html`<hax-element-demo
                  .renderTag="${active.tag}"
                  .gizmoTitle="${active.label}"
                  .gizmoIcon="${active.icon}"
                  .gizmoDescription="${active.gizmo.description || ""}"
                ></hax-element-demo>`}
          </div>`
        : ""}
    `;
  }

  // templates have no live demo: show their image, or the blocks they add
  _renderTemplatePreview(t) {
    const hax = this._hax;
    const names = t.stax.map((b) => NAMES[b.tag] || hax?.haxSchemaFromTag(b.tag)?.gizmo?.title || b.tag);
    return html`<div class="tpl">
      ${t.image ? html`<img src="${t.image}" alt="" />` : html`<ol>${names.map((n) => html`<li>${n}</li>`)}</ol>`}
      <div class="tpl-info">
        <div class="tpl-title">${t.label}</div>
        <div class="tpl-desc">${t.description || plural(names.length, "block")}</div>
      </div>
    </div>`;
  }

  // flyouts are placed before their height is known; once drawn, one that
  // runs past the bottom of the window goes above where it was opened
  updated() {
    const vh = globalThis.visualViewport?.height || globalThis.innerHeight;
    for (const el of this.shadowRoot.querySelectorAll(".panel, .preview")) {
      el.style.removeProperty("margin-top");
      const r = el.getBoundingClientRect();
      if (r.bottom <= vh - 8) continue;
      const above = this._open.y - PILL / 2 - 4 - r.height;
      const top = Math.max(8, Math.min(above, vh - 8 - r.height));
      el.style.marginTop = `${top - r.top}px`;
    }
  }

  render() {
    const e = this._end;
    const o = this._open;
    return html`
      ${this._seams.map(
        (m, i) => html`<div class="slot inside ${m.why}" data-i="${i}" style="top:${m.y}px;left:${m.left}px;width:${m.width}px">
          <button
            class="plus"
            tabindex="${m.why === "selected" || m.why === "focus" ? "0" : "-1"}"
            aria-label="${this._seamName(m)}"
            aria-haspopup="listbox"
            aria-expanded="${m.why === "chosen" ? "true" : "false"}"
            @click="${() => this.openAt(m.slot, { x: m.left + m.width / 2, y: m.y }, { opener: () => this._focusSeam(m.slot) })}"
          >
            <simple-icon-lite icon="oer:plus"></simple-icon-lite>Add
          </button>
        </div>`,
      )}
      ${e
        ? html`<button
            class="end ${o?.slot.end ? "chosen" : ""}"
            style="left:${e.left}px;top:${e.y}px;width:${e.width}px"
            aria-haspopup="listbox"
            @click="${(ev) => {
              const slot = computeSlots(this._body).find((sl) => sl.end);
              if (slot) this.openAt(slot, { x: e.left + PANEL_W / 2, y: e.y + 18 }, { opener: ev.currentTarget });
            }}"
          >
            <simple-icon-lite icon="oer:plus"></simple-icon-lite> Add block
          </button>`
        : ""}
      ${o ? this._renderPanel() : ""}
    `;
  }
}
customElements.define(OerBlockInserter.tag, OerBlockInserter);
