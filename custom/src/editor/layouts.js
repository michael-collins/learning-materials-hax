/**
 * Columns (grid-plate) in the editor (nu-hax docs/editor-redesign/spec.md
 * §6.3): one name, "Columns", presets named by their ratios ("1 : 1",
 * "2 : 1"), and the Columns menu, opened from the rail's Block ▾ →
 * Columns… and the selection frame's Columns button:
 *
 *   ┌ Columns ─────────────────────────┐
 *   │ [▮▮]    [▮▮▯]   [▯▮▮]            │  presets: 1 : 1, 2 : 1, 1 : 2…
 *   │ [▮▮▮▯]  [▯▮▮▮]  [▮▮▮]  …         │
 *   │ Width   ◉ Reading  ○ Section     │  course sites and the hub
 *   │ Select columns                   │
 *   │ Remove columns, keep blocks      │
 *   └──────────────────────────────────┘
 *
 * It's a menu with a roving tabindex: focus moves into it (the preset in
 * use, or the first), arrows move between its items (↑ ↓ by rows), Home
 * and End go to the first and last, Enter or Space applies one, and Escape
 * (or Tab) closes it and gives focus back to what opened it. A block not
 * yet in columns goes into column 1 of the preset chosen, the others
 * starting with an empty paragraph, and stays selected; a preset with fewer
 * columns moves the blocks of the columns it drops into its last. Width:
 * Section sets width="wide" (72rem, as wide as the sections; the theme's
 * blocks/course-site/cs-content.js). Each change is one undo step, said in
 * the live region.
 *
 * Never for or inside sections and items (the policy's columns: false):
 * whyNoColumns(node) says why, and wrapInColumns refuses, changing nothing.
 *
 *   columnsMenu().open(block, { opener })   // opener: the control, or a function giving focus back
 *
 * grid-plate always renders six column slots (col-1 … col-6); its `layout`
 * ("1-1", "2-1", "1-1-1", …) says how many are used and their ratio.
 */
import { html, css, LitElement } from "../lit.js";
import { LUCIDE_ICONS } from "./lucide-icons.generated.js";
import { clearStraySlots } from "./slots.js";
import { policyOf, phraseOf } from "./policy.js";
import { editorState } from "./editor-state.js";
import { checkpoint } from "./undo.js";
import { announce } from "./announce.js";

const isLayoutEl = (el) => policyOf(el).kind === "layout";
const haxStore = () => globalThis.HaxStore?.requestAvailability?.() ?? null;
const NUMBERS = ["", "One", "Two", "Three", "Four", "Five", "Six"];

/** The closest column layout containing `node` (or `node` itself). */
export function layoutOf(body, node, { self = true } = {}) {
  let el = self ? node : node?.parentElement;
  while (el && el !== body) {
    if (isLayoutEl(el)) return el;
    el = el.parentElement;
  }
  return null;
}

export const columnCount = (grid) => (typeof grid?.layout === "string" ? grid.layout.split("-").length : 1);

/** Rects of a layout's used columns. */
export function columnRects(grid) {
  const cols = [...(grid.shadowRoot?.querySelectorAll("[id^='col']") || [])].slice(0, columnCount(grid));
  return cols.map((c) => c.getBoundingClientRect()).filter((r) => r.width > 0);
}

/** "2 columns", "1 column". */
export const columnsWord = (n) => `${n} column${n === 1 ? "" : "s"}`;

/**
 * The presets grid-plate offers that make columns (not its one-column
 * layout), as [{ key, label: "2 : 1", name: "Two columns, 2 : 1", ratios }].
 */
export function layoutPresets(grid) {
  const layouts = grid?.layouts || globalThis.document.createElement("grid-plate").layouts || {};
  return Object.keys(layouts)
    .map((key) => key.split("-").map(Number))
    .filter((ratios) => ratios.length > 1)
    .map((ratios) => ({ key: ratios.join("-"), label: ratios.join(" : "), name: `${NUMBERS[ratios.length]} columns, ${ratios.join(" : ")}`, ratios }));
}

/**
 * Why a block can't be put in columns, or "": a section or an item (or
 * anything inside one), or a layout itself.
 */
export function whyNoColumns(node) {
  if (!node?.isConnected) return "Nothing selected";
  for (let el = node.parentElement; el && el.localName !== "hax-body"; el = el.parentElement) {
    const { kind } = policyOf(el);
    if (kind === "section" || kind === "item") return `Not inside ${phraseOf(el)}`;
  }
  const { kind, columns } = policyOf(node);
  if (kind === "section") return "Sections don't go in columns";
  if (kind === "layout") return "Already in columns";
  if (!columns) return `${phraseOf(node, { start: true })} doesn't go in columns`;
  return "";
}

const settle = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

// an empty paragraph or heading, as a new column starts with
const isEmptyText = (el) => /^(p|h[1-6])$/.test(el.localName) && !el.textContent.trim() && !el.querySelector("img, video, iframe, audio, embed, object");

/**
 * Change a layout's preset. Blocks in columns the new preset drops move to
 * its last column instead of disappearing (empty paragraphs just go).
 */
export function setLayout(grid, key) {
  const count = key.split("-").length;
  const last = `col-${count}`;
  for (const child of [...grid.children]) {
    const n = Number((child.getAttribute("slot") || "col-1").replace("col-", ""));
    if (n <= count) continue;
    if (isEmptyText(child)) child.remove();
    else child.setAttribute("slot", last);
  }
  grid.layout = key;
}

/**
 * Wrap a block in a new column layout; the block becomes column 1, and
 * each other column gets an empty paragraph to type in. Refuses (null,
 * changing nothing) for or inside a section or an item (whyNoColumns).
 */
export async function wrapInColumns(hax, node, key) {
  if (whyNoColumns(node)) return null;
  const body = hax.activeHaxBody;
  const parent = node.parentElement;
  const before = new Set(parent.children);
  body.__addAbove = false;
  body.haxInsert("grid-plate", "", { layout: key }, node);
  await settle();
  const grid = [...parent.children].find((el) => !before.has(el) && isLayoutEl(el));
  if (!grid) return null;
  grid.append(node);
  node.setAttribute("slot", "col-1");
  for (let n = 2; n <= key.split("-").length; n++) {
    const p = globalThis.document.createElement("p");
    p.setAttribute("slot", `col-${n}`);
    grid.append(p);
  }
  return grid;
}

/**
 * Remove a layout, keeping its blocks (column by column) where it was;
 * empty paragraphs go, unless that would leave nothing.
 */
export function removeLayout(grid) {
  // a nested layout hands its column to its blocks; at page level they
  // carry no slot (a stray slot attribute can be left on the grid itself)
  const ownSlot = isLayoutEl(grid.parentElement) ? grid.getAttribute("slot") : null;
  const order = (el) => Number((el.getAttribute("slot") || "col-1").replace("col-", ""));
  let kids = [...grid.children].sort((a, b) => order(a) - order(b));
  if (kids.some((kid) => !isEmptyText(kid))) kids = kids.filter((kid) => !isEmptyText(kid));
  for (const kid of kids) {
    grid.before(kid);
    if (ownSlot) kid.setAttribute("slot", ownSlot);
    else kid.removeAttribute("slot");
  }
  grid.remove();
  if (!ownSlot) clearStraySlots(kids);
  return kids[0] || null;
}

/** Whether a layout runs as wide as a course site's sections (width="wide"). */
export const isWide = (grid) => grid?.getAttribute("width") === "wide";

/**
 * Whether a layout can be set wider than the text: on a course site or the
 * hub (a microsite), between sections.
 */
export const canWiden = (grid) => !!grid?.parentElement?.matches("hax-body[data-oer-microsite]");

/* ---------- the Columns menu ---------- */

const icon = (name) =>
  html`<span class="icon" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[`oer:${name}`] || ""}&quot;)"></span>`;

// focus back to what opened a menu: a control, or a function that puts it back
function giveBack(opener) {
  if (typeof opener === "function") opener();
  else if (opener?.isConnected) opener.focus({ preventScroll: true });
}

class OerColumnsMenu extends LitElement {
  static get tag() {
    return "oer-columns-menu";
  }

  static get properties() {
    return {
      _node: { state: true },
      _grid: { state: true },
      _at: { state: true },
      _focus: { state: true },
    };
  }

  constructor() {
    super();
    this._node = null;
    this._grid = null;
    this._at = null;
    this._focus = 0;
    this.__opener = null;
    this.__outside = (e) => {
      if (this._node && !e.composedPath().includes(this)) this.close();
    };
    // (and when editing ends, or saving or Preview starts)
    this.__state = () => {
      if (!editorState.editing || editorState.saving || editorState.preview) this.close();
    };
    // keys stop here (HAX acts on keys anywhere in the window), but chords
    // with Ctrl or ⌘ (Save, Undo…)
    this.addEventListener("keydown", (e) => {
      this._keys(e);
      if (!e.ctrlKey && !e.metaKey) e.stopPropagation();
    });
    this.addEventListener("keyup", (e) => !e.ctrlKey && !e.metaKey && e.stopPropagation());
  }

  connectedCallback() {
    super.connectedCallback();
    this.hidden = true;
    globalThis.addEventListener("pointerdown", this.__outside, true);
    editorState.addEventListener("change", this.__state);
  }

  disconnectedCallback() {
    globalThis.removeEventListener("pointerdown", this.__outside, true);
    editorState.removeEventListener("change", this.__state);
    super.disconnectedCallback();
  }

  /**
   * Open for a block (in columns, or to put in them) or a layout. opener:
   * the control that opened it, which focus goes back to, or a function
   * that gives focus back; anchor: an element or rect to open beside
   * (the opener, by default).
   */
  open(node, { opener = null, anchor = null } = {}) {
    const body = editorState.body || haxStore()?.activeHaxBody;
    const grid = layoutOf(body, node);
    if (!grid && whyNoColumns(node)) {
      announce(whyNoColumns(node));
      return false;
    }
    this.__opener = opener;
    this._node = node;
    this._grid = grid;
    const from = anchor || (opener instanceof Element ? opener : null);
    const r = from?.getBoundingClientRect?.() || from || editorState.geometry?.visible || { left: 16, bottom: 64 };
    this._at = { x: r.left, y: r.bottom + 4, top: r.top };
    const presets = layoutPresets(grid);
    this._focus = Math.max(0, presets.findIndex((p) => p.key === grid?.layout));
    this.hidden = false;
    this.updateComplete.then(() => {
      this._fit();
      this._items()[this._focus]?.focus();
    });
    return true;
  }

  /** Close it; with { back }, focus goes back to what opened it. */
  close({ back = false } = {}) {
    if (!this._node) return;
    const opener = this.__opener;
    this._node = this._grid = this.__opener = null;
    this.hidden = true;
    if (back) giveBack(opener);
  }

  get isOpen() {
    return !!this._node;
  }

  _items() {
    return [...this.shadowRoot.querySelectorAll("[role^=menuitem]")];
  }

  // kept on screen: below the anchor, or above it when there's no room
  _fit() {
    const menu = this.shadowRoot.querySelector(".menu");
    if (!menu || !this._at) return;
    const r = menu.getBoundingClientRect();
    const vw = globalThis.innerWidth;
    const vh = globalThis.visualViewport?.height || globalThis.innerHeight;
    const left = Math.max(8, Math.min(this._at.x, vw - r.width - 8));
    let top = this._at.y;
    if (top + r.height > vh - 8) top = Math.max(8, Math.min(this._at.top - r.height - 4, vh - r.height - 8));
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
  }

  // ← → previous and next; ↑ ↓ the nearest item in the row above or below;
  // Home End; Enter and Space apply (a button's own); Escape and Tab close
  _keys(e) {
    if (!this._node || e.ctrlKey || e.metaKey || e.altKey) return;
    const items = this._items();
    const i = items.indexOf(e.composedPath()[0]);
    if (e.key === "Escape" || e.key === "Tab") {
      e.preventDefault();
      this.close({ back: true });
      return;
    }
    let to = null;
    if (e.key === "ArrowRight") to = Math.min(items.length - 1, i + 1);
    else if (e.key === "ArrowLeft") to = Math.max(0, i - 1);
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = items.length - 1;
    else if (e.key === "ArrowDown" || e.key === "ArrowUp") to = this._row(items, i, e.key === "ArrowDown" ? 1 : -1);
    if (to === null) return;
    e.preventDefault();
    this._focus = to;
    items[to]?.focus();
  }

  // the item nearest in x in the next row up or down, or i
  _row(items, i, dir) {
    const rects = items.map((el) => el.getBoundingClientRect());
    const here = rects[i];
    if (!here) return 0;
    const cx = here.left + here.width / 2;
    let best = i;
    let score = Infinity;
    rects.forEach((r, j) => {
      const dy = dir > 0 ? r.top - here.bottom : here.top - r.bottom;
      if (dy < -1) return;
      const s = dy * 1000 + Math.abs(r.left + r.width / 2 - cx);
      if (j !== i && s < score) {
        score = s;
        best = j;
      }
    });
    return best;
  }

  // one undo step, said in the live region; then focus goes back to what
  // opened the menu, and what fn returns is selected
  async _change(step, said, fn) {
    const hax = haxStore();
    const body = hax?.activeHaxBody;
    const node = this._node;
    const opener = this.__opener;
    this.close();
    if (!body?.editMode || !node?.isConnected) return;
    if (editorState.saving) {
      announce("Wait until the page is saved");
      giveBack(opener);
      return;
    }
    checkpoint(body);
    const selected = await fn(hax, node);
    await settle();
    checkpoint(body, step);
    giveBack(opener);
    if (selected?.isConnected) hax.activeNode = selected;
    announce(said);
  }

  _preset(p) {
    const grid = this._grid;
    if (grid) {
      this._change(`changed columns to ${p.label}`, `Columns: ${p.label}`, (hax, node) => {
        setLayout(grid, p.key);
        // (an empty paragraph in a column that went goes with it)
        return node.isConnected ? node : grid;
      });
    } else {
      this._change(`put ${phraseOf(this._node)} in columns`, `In ${columnsWord(p.ratios.length)}, ${p.label}`, async (hax, node) => ((await wrapInColumns(hax, node, p.key)) ? node : null));
    }
  }

  _width(wide) {
    const grid = this._grid;
    if (isWide(grid) === wide) {
      this.close({ back: true });
      return;
    }
    const what = wide ? "section" : "reading";
    this._change(`set columns to ${what} width`, `Columns: ${what} width`, (hax, node) => {
      if (wide) grid.setAttribute("width", "wide");
      else grid.removeAttribute("width");
      return node;
    });
  }

  _remove() {
    const grid = this._grid;
    this._change("removed columns", "Columns removed, blocks kept", (hax, node) => {
      const keep = node === grid ? null : node;
      const first = removeLayout(grid);
      return keep?.isConnected ? keep : first;
    });
  }

  _select() {
    const grid = this._grid;
    this.close();
    // (ops.js selects it, and the frame gives its name tag focus)
    grid?.dispatchEvent(new CustomEvent("oer-edit-request", { bubbles: true, composed: true, detail: { action: "select", unit: grid } }));
  }

  static get styles() {
    return css`
      :host {
        position: fixed;
        inset: 0 auto auto 0;
        /* above the rail (9991) and the frame (9985) */
        z-index: 9992;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--popover-foreground);
      }
      :host([hidden]) {
        display: none;
      }
      button {
        all: unset;
        box-sizing: border-box;
        cursor: pointer;
      }
      button:focus-visible {
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
      /* shadcn DropdownMenu */
      .menu {
        position: fixed;
        width: 17rem;
        box-sizing: border-box;
        padding: 0.25rem;
        background: var(--popover);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
      }
      .head {
        padding: 0.375rem 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--muted-foreground);
      }
      .presets {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.25rem;
        padding: 0 0.25rem 0.25rem;
      }
      .preset {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 0.25rem;
        padding: 0.375rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        font-size: 0.75rem;
        text-align: center;
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
      }
      .bars {
        display: flex;
        gap: 2px;
        height: 1rem;
      }
      .bar {
        border-radius: 2px;
        background: color-mix(in oklab, var(--foreground) 35%, transparent);
      }
      .preset:hover {
        border-color: var(--primary);
        background: var(--accent);
        color: var(--accent-foreground);
      }
      .preset[aria-checked="true"] {
        border-color: var(--primary);
        box-shadow: inset 0 0 0 1px var(--primary);
      }
      .preset[aria-checked="true"] .bar {
        background: var(--primary);
      }
      .sep {
        height: 1px;
        margin: 0.25rem -0.25rem;
        background: var(--border);
      }
      .widths {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0 0.25rem 0.25rem 0;
      }
      .widths .head {
        flex: 1;
      }
      .width {
        height: 2rem;
        padding: 0 0.625rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
      }
      .width:hover {
        background: var(--accent);
        color: var(--accent-foreground);
      }
      .width[aria-checked="true"] {
        border-color: var(--primary);
        box-shadow: inset 0 0 0 1px var(--primary);
      }
      .item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        height: 2rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
      }
      .item:hover {
        background: var(--accent);
        color: var(--accent-foreground);
      }
      @media (forced-colors: active) {
        .preset[aria-checked="true"],
        .width[aria-checked="true"] {
          outline: 2px solid Highlight;
        }
        .bar {
          background: CanvasText;
        }
      }
    `;
  }

  render() {
    if (!this._node) return "";
    const grid = this._grid;
    const presets = layoutPresets(grid);
    // a roving tabindex: the item with focus is the one Tab would reach
    let n = -1;
    const tab = () => ((n += 1) === this._focus ? "0" : "-1");
    const wide = isWide(grid);
    return html`<div class="menu" role="menu" aria-label="Columns" @mousedown="${(e) => e.preventDefault()}">
      <div class="head" aria-hidden="true">${grid ? "Columns" : "Put in columns"}</div>
      <div class="presets" role="group" aria-label="Presets">
        ${presets.map(
          (p) => html`<button
            class="preset"
            role="menuitemradio"
            aria-checked="${grid?.layout === p.key ? "true" : "false"}"
            aria-label="${p.name}"
            tabindex="${tab()}"
            @click="${() => this._preset(p)}"
          >
            <span class="bars" aria-hidden="true">${p.ratios.map((r) => html`<span class="bar" style="flex:${r}"></span>`)}</span>
            <span aria-hidden="true">${p.label}</span>
          </button>`,
        )}
      </div>
      ${grid && canWiden(grid)
        ? html`<div class="sep" role="separator"></div>
            <div class="widths" role="group" aria-label="Width">
              <div class="head" aria-hidden="true">Width</div>
              <button class="width" role="menuitemradio" aria-checked="${wide ? "false" : "true"}" aria-label="Width: Reading" title="As wide as the text" tabindex="${tab()}" @click="${() => this._width(false)}">Reading</button>
              <button class="width" role="menuitemradio" aria-checked="${wide ? "true" : "false"}" aria-label="Width: Section" title="As wide as the sections" tabindex="${tab()}" @click="${() => this._width(true)}">Section</button>
            </div>`
        : ""}
      ${grid
        ? html`<div class="sep" role="separator"></div>
            ${grid !== this._node ? html`<button class="item" role="menuitem" tabindex="${tab()}" @click="${this._select}">${icon("box")} Select columns</button>` : ""}
            <button class="item" role="menuitem" tabindex="${tab()}" @click="${this._remove}">${icon("panel-right-close")} Remove columns, keep blocks</button>`
        : ""}
    </div>`;
  }
}
customElements.define(OerColumnsMenu.tag, OerColumnsMenu);

/** The page's Columns menu (one, made on first use). */
export function columnsMenu() {
  const doc = globalThis.document;
  let menu = doc.querySelector(OerColumnsMenu.tag);
  if (!menu) {
    menu = doc.createElement(OerColumnsMenu.tag);
    doc.body.append(menu);
  }
  return menu;
}
