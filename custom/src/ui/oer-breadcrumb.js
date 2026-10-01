/**
 * `oer-breadcrumb` — the page's place in the site, after shadcn/ui's
 * Breadcrumb with its collapsed (BreadcrumbEllipsis + DropdownMenu) pattern.
 *
 * - Wide: the whole trail, or first · … · last two when it is long.
 * - Narrow (the element's own width): … · current page, on one line.
 * Hidden levels open from the … button as a menu of links. Labels never
 * wrap; long ones are truncated with their full title on hover.
 * @element oer-breadcrumb
 */
import { html, css, LitElement } from "../lit.js";
import { store, autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { isSystemItem } from "../types/content-types.js";

const NARROW = 480; // px of the element's own width
const MAX_FULL = 4; // longer trails collapse their middle

const chevron = html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>`;
const dots = html`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>`;

class OerBreadcrumb extends LitElement {
  static get tag() {
    return "oer-breadcrumb";
  }

  static get properties() {
    return {
      _trail: { state: true },
      _narrow: { state: true },
      _open: { state: true },
    };
  }

  constructor() {
    super();
    this._trail = [];
    this._narrow = false;
    this._open = false;
    this.__outside = (e) => {
      if (this._open && !e.composedPath().includes(this)) this._open = false;
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.__dispose = autorun(() => {
      const items = toJS(store.manifest?.items) || [];
      const active = toJS(store.activeId);
      Promise.resolve().then(() => {
        const byId = new Map(items.map((i) => [i.id, i]));
        const trail = [];
        for (let cur = byId.get(active); cur && !isSystemItem(cur); cur = byId.get(cur.parent)) trail.unshift(cur);
        this._trail = trail.map((i) => ({ id: i.id, title: i.title, slug: i.slug }));
        this._open = false;
      });
    });
    this.__resize = new ResizeObserver(([entry]) => {
      this._narrow = entry.contentRect.width < NARROW;
    });
    this.__resize.observe(this);
    globalThis.addEventListener("pointerdown", this.__outside, true);
  }

  disconnectedCallback() {
    this.__dispose?.();
    this.__resize?.disconnect();
    globalThis.removeEventListener("pointerdown", this.__outside, true);
    super.disconnectedCallback();
  }

  static get styles() {
    return css`
      :host {
        display: block;
        min-width: 0;
        font-family: var(--font-sans, system-ui, sans-serif);
        font-size: 0.875rem;
        color: var(--muted-foreground, #555);
      }
      nav {
        min-width: 0;
      }
      ol {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        gap: 0.375rem;
        margin: 0;
        padding: 0;
        list-style: none;
        min-width: 0;
      }
      li {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        min-width: 0;
      }
      li.crumb {
        flex: 0 1 auto;
      }
      li.current {
        flex: 1 1 auto;
      }
      a,
      span.page {
        overflow: hidden;
        max-width: 14rem;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .narrow a,
      .narrow span.page {
        max-width: none;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      a:hover {
        color: var(--foreground, #111);
      }
      span.page {
        color: var(--foreground, #111);
        font-weight: 400;
      }
      .sep {
        display: inline-flex;
        flex: none;
      }
      svg {
        width: 0.875rem;
        height: 0.875rem;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      :focus-visible {
        outline: 2px solid var(--ring, #2563eb);
        outline-offset: 2px;
        border-radius: var(--radius-sm, 0.25rem);
      }
      .ellipsis-wrap {
        position: relative;
        flex: none;
      }
      button.ellipsis {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-md, 0.5rem);
        color: inherit;
        cursor: pointer;
      }
      button.ellipsis:hover,
      button.ellipsis[aria-expanded="true"] {
        background: var(--accent, #f4f4f5);
        color: var(--foreground, #111);
      }
      button.ellipsis svg {
        width: 1rem;
        height: 1rem;
      }
      .menu {
        position: absolute;
        top: calc(100% + 0.25rem);
        left: 0;
        z-index: 50;
        min-width: 10rem;
        max-width: min(18rem, calc(100vw - 2rem));
        padding: 0.25rem;
        border: 1px solid var(--border, #e5e5e5);
        border-radius: var(--radius-md, 0.5rem);
        background: var(--popover, var(--background, #fff));
        color: var(--popover-foreground, var(--foreground, #111));
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
      }
      .menu a {
        display: block;
        max-width: none;
        padding: 0.375rem 0.5rem;
        border-radius: var(--radius-sm, 0.25rem);
        color: inherit;
        white-space: normal;
      }
      .menu a:hover,
      .menu a:focus-visible {
        background: var(--accent, #f4f4f5);
        outline: none;
      }
    `;
  }

  _toggle() {
    this._open = !this._open;
    if (this._open) this.updateComplete.then(() => this.shadowRoot.querySelector(".menu a")?.focus());
  }

  _menuKeys(e) {
    const links = [...this.shadowRoot.querySelectorAll(".menu a")];
    const i = links.indexOf(this.shadowRoot.activeElement);
    if (e.key === "ArrowDown") links[(i + 1) % links.length]?.focus();
    else if (e.key === "ArrowUp") links[(i - 1 + links.length) % links.length]?.focus();
    else if (e.key === "Home") links[0]?.focus();
    else if (e.key === "End") links[links.length - 1]?.focus();
    else if (e.key === "Escape" || e.key === "Tab") {
      this._open = false;
      if (e.key === "Escape") this.shadowRoot.querySelector("button.ellipsis")?.focus();
      if (e.key === "Tab") return;
    } else return;
    e.preventDefault();
  }

  render() {
    const trail = this._trail;
    if (!trail.length) return html``;
    const current = trail[trail.length - 1];
    const above = trail.slice(0, -1);
    let shown;
    let hidden;
    if (this._narrow) {
      shown = [];
      hidden = above;
    } else if (trail.length > MAX_FULL) {
      shown = [above[0], "…", ...above.slice(-1)];
      hidden = above.slice(1, -1);
    } else {
      shown = above;
      hidden = [];
    }
    if (!this._narrow && hidden.length === 0) shown = shown.filter((x) => x !== "…");
    const sep = html`<span class="sep" aria-hidden="true">${chevron}</span>`;
    const ellipsis = html`<li class="ellipsis-wrap">
      <button
        class="ellipsis"
        aria-label="Show ${hidden.length} more level${hidden.length === 1 ? "" : "s"}"
        aria-haspopup="menu"
        aria-expanded="${this._open ? "true" : "false"}"
        @click="${this._toggle}"
      >
        ${dots}
      </button>
      ${this._open
        ? html`<div class="menu" role="menu" @keydown="${this._menuKeys}">
            ${hidden.map((i) => html`<a role="menuitem" href="${i.slug}" @click="${() => (this._open = false)}">${i.title}</a>`)}
          </div>`
        : ""}
    </li>`;
    const crumbs = this._narrow ? (hidden.length ? [ellipsis] : []) : shown.map((x) => (x === "…" ? ellipsis : html`<li class="crumb"><a href="${x.slug}" title="${x.title}">${x.title}</a></li>`));
    return html`<nav aria-label="Breadcrumb" class="${this._narrow ? "narrow" : ""}">
      <ol>
        ${crumbs.map((c) => html`${c}<li class="sep-item" aria-hidden="true">${sep}</li>`)}
        <li class="current"><span class="page" aria-current="page" title="${current.title}">${current.title}</span></li>
      </ol>
    </nav>`;
  }
}
customElements.define(OerBreadcrumb.tag, OerBreadcrumb);
