/**
 * `oer-block-inserter` — insert blocks where you can see them land.
 *
 * While editing, hovering the empty slot between two blocks highlights it
 * with a "+" at its left edge; clicking anywhere in the slot opens the block
 * list, and the slot stays highlighted while the list is open so the target
 * is always visible. A persistent "Add block" row follows the last block. Either opens a flyout listing every block from HAX's Insert panel
 * (search, Recent, Popular, then categories), with a preview card beside it
 * for the hovered or highlighted block. The rail's "Insert block above /
 * below" opens the same flyout, which is the keyboard route.
 *
 * Inserting goes through hax-body's haxInsert with the stock panel's block
 * template, so undo and the Block panel behave as with the stock panel;
 * haxInsert takes the node to insert after, which pins the block to the
 * chosen slot.
 * The block list and categories come from the stock hax-gizmo-browser so
 * they stay in step with whatever HAX allows.
 * @element oer-block-inserter
 */
import { html, css, LitElement } from "../lit.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { LUCIDE_ICONS } from "./lucide-icons.generated.js";
import { contentViewport } from "./stock.js";

const MIN_SLOT = 16; // px; slots narrower than this are padded around their centre
const PANEL_W = 288;
const PREVIEW_W = 288;

const icon = (name) =>
  html`<span class="icon" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[`oer:${name}`] || ""}&quot;)"></span>`;

class OerBlockInserter extends LitElement {
  static get tag() {
    return "oer-block-inserter";
  }

  static get properties() {
    return {
      _hover: { state: true },
      _end: { state: true },
      _open: { state: true },
      _query: { state: true },
      _active: { state: true },
    };
  }

  constructor() {
    super();
    this._hover = null; // { gap, top, height, left, width }
    this._end = null; // { y, left }
    this._open = null; // { gap, x, y }
    this._query = "";
    this._active = 0;
    this.__tick = this._tick.bind(this);
    this.__move = (e) => {
      this.__pointer = { x: e.clientX, y: e.clientY };
    };
    this.__outside = (e) => {
      if (this._open && !e.composedPath().includes(this)) this.close();
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.__raf = requestAnimationFrame(this.__tick);
    globalThis.addEventListener("pointermove", this.__move, { passive: true });
    globalThis.addEventListener("pointerdown", this.__outside, true);
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.__raf);
    globalThis.removeEventListener("pointermove", this.__move);
    globalThis.removeEventListener("pointerdown", this.__outside, true);
    super.disconnectedCallback();
  }

  get _hax() {
    return globalThis.HaxStore?.requestAvailability?.();
  }

  // top-level blocks of the page body (the page-break holds page metadata)
  _blocks() {
    const body = this._hax?.activeHaxBody;
    if (!body) return [];
    return [...body.children].filter((el) => el.localName !== "page-break" && el.getClientRects().length);
  }

  /* ---------- markers ---------- */

  _tick() {
    this.__raf = requestAnimationFrame(this.__tick);
    const body = store.editMode ? this._hax?.activeHaxBody : null;
    if (!body || !body.isConnected) {
      if (this._hover || this._end || this._open) {
        this._hover = this._end = null;
        this.close();
      }
      return;
    }
    const b = body.getBoundingClientRect();
    const view = contentViewport();
    const inView = (y) => y > view.top + 4 && y < view.bottom - 4;
    const blocks = this._blocks();
    const rects = blocks.map((el) => el.getBoundingClientRect());

    // the persistent row after the last block (or on an empty page)
    const lastBottom = rects.length ? rects[rects.length - 1].bottom : b.top;
    let end = { y: Math.round(lastBottom + 8), left: Math.round(b.left), width: Math.round(b.width) };
    if (!inView(end.y) || !inView(end.y + 36)) end = null;
    const sameEnd =
      end && this._end && this._end.y === end.y && this._end.left === end.left && this._end.width === end.width;
    if (!sameEnd && (end || this._end)) this._end = end;

    // the empty slot in front of each block (the margin between blocks)
    const slot = (i) => {
      let top = i === 0 ? rects[0].top - MIN_SLOT : rects[i - 1].bottom;
      let bottom = rects[i].top;
      if (bottom - top < MIN_SLOT) {
        const mid = (top + bottom) / 2;
        top = mid - MIN_SLOT / 2;
        bottom = mid + MIN_SLOT / 2;
      }
      return { gap: i, top: Math.round(top), height: Math.round(bottom - top), left: Math.round(b.left), width: Math.round(b.width) };
    };

    let hover = null;
    if (this._open) {
      // keep the chosen slot marked while choosing a block
      if (this._open.gap < rects.length) hover = slot(this._open.gap);
    } else {
      const p = this.__pointer;
      if (p && p.x > b.left - 72 && p.x < b.right + 8) {
        for (let i = 0; i < rects.length; i++) {
          const s = slot(i);
          if (p.y >= s.top && p.y <= s.top + s.height && inView(s.top + s.height / 2)) {
            hover = s;
            break;
          }
        }
      }
    }
    const same =
      hover &&
      this._hover &&
      ["gap", "top", "height", "left", "width"].every((k) => hover[k] === this._hover[k]);
    if (!same && (hover || this._hover)) this._hover = hover;
  }

  /* ---------- flyout ---------- */

  /**
   * Open the block list for the gap in front of block `gap` (blocks.length
   * = after the last block). `anchor` is the {x, y} the flyout starts from.
   */
  openAt(gap, anchor) {
    this._query = "";
    this._active = 0;
    this._open = { gap, x: anchor.x, y: anchor.y };
    this.updateComplete.then(() => this.shadowRoot.querySelector(".panel input")?.focus());
  }

  /** Open for the gap above or below a block (used by oer-block-rail). */
  openFor(node, where) {
    const blocks = this._blocks();
    let top = node;
    while (top && top.parentNode !== this._hax?.activeHaxBody) top = top.parentNode;
    const i = blocks.indexOf(top);
    if (i < 0) return;
    const r = top.getBoundingClientRect();
    const gap = where === "below" ? i + 1 : i;
    this.openAt(gap, { x: r.left + 12, y: where === "below" ? r.bottom : r.top });
  }

  close() {
    if (!this._open) return;
    this._open = null;
  }

  _gizmos() {
    const hax = this._hax;
    const browser = hax?.haxTray?.shadowRoot?.querySelector("hax-gizmo-browser");
    const allowed = (g) => (browser?._gizmoAllowedInTray ? browser._gizmoAllowedInTray(g) : !!g?.tag);
    const all = (hax?.gizmoList || []).filter(allowed);
    const q = this._query.trim().toLowerCase();
    if (q) {
      const hits = all.filter((g) =>
        [g.title, g.tag, g.description, ...(g.tags || [])].join(" ").toLowerCase().includes(q),
      );
      return [{ label: `Results`, items: hits }];
    }
    const sections = [];
    const recent = (browser?.recentGizmoList || []).filter(allowed).slice().reverse();
    if (recent.length) sections.push({ label: "Recent", items: recent });
    const popular = (browser?.popularGizmoList || []).filter(allowed);
    if (popular.length) sections.push({ label: "Popular", items: popular });
    const cats = browser?.updateCategories ? browser.updateCategories(all) : [];
    for (const cat of cats) {
      const items = all.filter((g) => (g.tags?.[0] || "Other") === cat).sort((a, b) => a.title.localeCompare(b.title));
      if (items.length) sections.push({ label: cat, items });
    }
    return sections;
  }

  async _insert(gizmo) {
    const hax = this._hax;
    const body = hax?.activeHaxBody;
    if (!body || !gizmo) return;
    const gap = this._open?.gap ?? 0;
    this.close();
    const blocks = this._blocks();
    const before = new Set(body.children);
    // haxInsert places the new block after the given node; the top slot
    // goes after the page-break that opens every page
    const after =
      gap > 0 ? blocks[Math.min(gap, blocks.length) - 1] : [...body.children].find((el) => el.localName === "page-break");

    // same template the stock Insert panel uses (data-demo-schema)
    const schema = hax.haxSchemaFromTag(gizmo.tag);
    const detail = schema?.demoSchema?.[0] || hax.haxElementPrototype({ tag: gizmo.tag }, {}, "");
    hax.recentGizmoList?.push?.(schema?.gizmo || gizmo);
    body.__addAbove = false;
    body.haxInsert(detail.tag, detail.content || "", detail.properties || {}, after || null);

    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const added = [...body.children].find((el) => !before.has(el));
    if (!added) return;
    hax.activeNode = added;
    added.focus?.();
    added.scrollIntoView?.({ block: "nearest" });
  }

  _flat() {
    return this._gizmos().flatMap((s) => s.items);
  }

  _panelKeys(e) {
    const flat = this._flat();
    if (e.key === "ArrowDown") this._active = Math.min(this._active + 1, flat.length - 1);
    else if (e.key === "ArrowUp") this._active = Math.max(this._active - 1, 0);
    else if (e.key === "Home" && e.target.localName !== "input") this._active = 0;
    else if (e.key === "End" && e.target.localName !== "input") this._active = flat.length - 1;
    else if (e.key === "Enter") this._insert(flat[this._active]);
    else if (e.key === "Escape") this.close();
    else return;
    e.preventDefault();
    this.updateComplete.then(() =>
      this.shadowRoot.querySelector(`[data-i="${this._active}"]`)?.scrollIntoView({ block: "nearest" }),
    );
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
        outline-offset: 1px;
      }
      .icon {
        flex: none;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }

      /* the empty slot between blocks, highlighted on hover / while chosen */
      .slot {
        pointer-events: auto;
        position: fixed;
        box-sizing: border-box;
        border: 1px dashed var(--primary);
        border-radius: var(--radius-sm);
        background: color-mix(in oklch, var(--primary) 8%, transparent);
      }
      .slot.chosen {
        border-style: solid;
        background: color-mix(in oklch, var(--primary) 14%, transparent);
      }
      .plus {
        position: absolute;
        left: -0.75rem;
        top: 50%;
        margin-top: -0.75rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 999px;
        background: var(--primary);
        color: var(--primary-foreground);
        box-shadow: 0 0 0 2px var(--background);
      }
      .plus .icon {
        width: 0.875rem;
        height: 0.875rem;
      }

      /* persistent "Add block" row after the last block */
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
      }
      .end.chosen,
      .end:hover {
        border-color: var(--primary);
        color: var(--foreground);
        background: var(--accent);
      }

      /* flyout: shadcn Command in a Popover */
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
        color: var(--muted-foreground);
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
      .heading {
        padding: 0.375rem 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--muted-foreground);
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      [role="option"][aria-selected="true"] {
        background: var(--accent);
        color: var(--accent-foreground);
      }
      simple-icon-lite {
        flex: none;
        --simple-icon-height: 1rem;
        --simple-icon-width: 1rem;
        color: var(--muted-foreground);
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
    `;
  }

  _renderPanel() {
    const o = this._open;
    const sections = this._gizmos();
    const flat = sections.flatMap((s) => s.items);
    const active = flat[Math.min(this._active, flat.length - 1)];
    const vw = globalThis.innerWidth;
    const vh = globalThis.innerHeight;
    // beside the anchor, kept on screen; the preview goes right of the
    // panel, or left of it when there is no room
    const x = Math.max(8, Math.min(o.x + 16, vw - PANEL_W - 8));
    const y = Math.max(8, Math.min(o.y - 20, vh - Math.min(480, vh - 16) - 8));
    const previewLeft = x + PANEL_W + 8 + PREVIEW_W <= vw - 8 ? x + PANEL_W + 8 : x - PREVIEW_W - 8;
    let i = -1;
    return html`
      <div class="panel" style="left:${x}px;top:${y}px" @keydown="${this._panelKeys}">
        <div class="search">
          <simple-icon-lite icon="icons:search"></simple-icon-lite>
          <input
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="blocks"
            aria-activedescendant="${active ? `b${this._active}` : ""}"
            aria-label="Search blocks"
            placeholder="Search blocks…"
            .value="${this._query}"
            @input="${(e) => {
              this._query = e.target.value;
              this._active = 0;
            }}"
          />
        </div>
        <div class="list" id="blocks" role="listbox" aria-label="Blocks">
          ${flat.length
            ? sections.map(
                (s) => html`<div class="group" role="group" aria-label="${s.label}">
                  <div class="heading" aria-hidden="true">${s.label}</div>
                  ${s.items.map((g) => {
                    i += 1;
                    const n = i;
                    return html`<button
                      id="b${n}"
                      data-i="${n}"
                      role="option"
                      tabindex="-1"
                      aria-selected="${n === this._active ? "true" : "false"}"
                      @mouseenter="${() => (this._active = n)}"
                      @mousedown="${(e) => e.preventDefault()}"
                      @click="${() => this._insert(g)}"
                    >
                      <simple-icon-lite icon="${g.icon || "hax:add-brick"}"></simple-icon-lite>
                      <span>${g.title}</span>
                    </button>`;
                  })}
                </div>`,
              )
            : html`<div class="empty">No blocks found</div>`}
        </div>
      </div>
      ${active
        ? html`<div class="preview" style="left:${previewLeft}px;top:${y}px" aria-hidden="true">
            <hax-element-demo
              .renderTag="${active.tag}"
              .gizmoTitle="${active.title}"
              .gizmoIcon="${active.icon}"
              .gizmoDescription="${active.description || ""}"
            ></hax-element-demo>
          </div>`
        : ""}
    `;
  }

  render() {
    const h = this._hover;
    const e = this._end;
    return html`
      ${h
        ? html`<button
            class="slot ${this._open ? "chosen" : ""}"
            style="left:${h.left}px;top:${h.top}px;width:${h.width}px;height:${h.height}px"
            tabindex="-1"
            title="Insert block here"
            aria-label="Insert block here"
            @click="${() => this.openAt(h.gap, { x: h.left, y: h.top + h.height / 2 })}"
          >
            <span class="plus">${icon("plus")}</span>
          </button>`
        : ""}
      ${e
        ? html`<button
            class="end ${this._open && this._open.gap >= this._blocks().length ? "chosen" : ""}"
            style="left:${e.left}px;top:${e.y}px;width:${e.width}px"
            aria-haspopup="listbox"
            @click="${() => this.openAt(this._blocks().length, { x: e.left, y: e.y })}"
          >
            ${icon("plus")} Add block
          </button>`
        : ""}
      ${this._open ? this._renderPanel() : ""}
    `;
  }
}
customElements.define(OerBlockInserter.tag, OerBlockInserter);
