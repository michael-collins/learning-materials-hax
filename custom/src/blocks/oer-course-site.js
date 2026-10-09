/**
 * `oer-course-site` — the frame around a course's microsite
 * (types/course-site.js), shown full width by the theme while reading: a
 * bar with the course, links to its sections and Enroll (and Edit content,
 * Edit details and Style for authors), the page itself, and a footer. The
 * page is made of the course site's section blocks (course-site/
 * cs-sections.js) and any other blocks; a page without sections yet shows
 * the standard ones around what it has.
 *
 * While editing, the theme shows the page in HAX's editor instead, at the
 * same width and in the same style, so it looks as readers will see it.
 *
 *   <oer-course-site .site=${item}><slot id="cs-slot"></slot></oer-course-site>
 * @element oer-course-site
 */
import { html, css, LitElement } from "../lit.js";
import { store, autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { siteData, siteIsOn } from "../types/course-site.js";
import { pageDetails } from "../types/oer-page-details.js";
import { editPage } from "../editor/stock.js";
import { siteStyle } from "../ui/oer-site-style.js";
import { icon, isSection } from "./course-site/cs-shared.js";
import "./course-site/cs-sections.js";

// the sections the bar links to, in order
const NAV = [
  ["oer-cs-learn", "What you'll learn"],
  ["oer-cs-semester", "The semester"],
  ["oer-cs-make", "What you'll make"],
  ["oer-cs-faq", "Questions"],
];

class OerCourseSite extends LitElement {
  static get tag() {
    return "oer-course-site";
  }

  static get properties() {
    return {
      site: { type: Object },
      _data: { state: true },
      _signedIn: { state: true },
      _dark: { state: true },
      _hasSections: { state: true },
    };
  }

  constructor() {
    super();
    this.site = null;
    this._data = null;
    this._signedIn = false;
    this._dark = false;
    this._hasSections = true;
    // a section appeared or emptied: the bar's links change
    this.addEventListener("cs-section-change", () => this.requestUpdate());
  }

  connectedCallback() {
    super.connectedCallback();
    this.__stop = autorun(() => {
      const items = toJS(store.manifest?.items) || [];
      const signedIn = !!store.isLoggedIn;
      const dark = !!store.darkMode;
      Promise.resolve().then(() => {
        this._items = items;
        this._signedIn = signedIn;
        this._dark = dark;
        this._recompute();
      });
    });
  }

  disconnectedCallback() {
    this.__stop?.();
    super.disconnectedCallback();
  }

  updated(changed) {
    if (changed.has("site")) this._recompute();
  }

  _recompute() {
    const site = (this._items || []).find((i) => i.id === this.site?.id) || this.site;
    this._site = site;
    this._data = site ? siteData(site, this._items || []) : null;
  }

  // the page's blocks, through the theme's slot
  _pageBlocks() {
    const slot = this.shadowRoot?.querySelector("main > slot");
    return slot ? slot.assignedElements({ flatten: true }) : [];
  }

  // the page's blocks arrived or changed: whether it has sections, and the
  // bar's links (sections there before the frame couldn't tell it)
  _slotChanged() {
    this._hasSections = this._pageBlocks().some(isSection);
    this.requestUpdate();
  }

  firstUpdated() {
    this._slotChanged();
  }

  // a section on the page, or among the standard ones shown for a page without any
  _section(tag) {
    return this._pageBlocks().find((el) => el.localName === tag) || this.shadowRoot?.querySelector(tag) || null;
  }

  _go(tag) {
    this._section(tag)?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }

  _renderBar(d) {
    const links = NAV.filter(([tag]) => this._section(tag)?.shown);
    return html`<header class="bar">
      <div class="wrap bar-in">
        <a class="brand" href="./" title="Digital Arts OER home"><span class="mark" aria-hidden="true">${icon("book")}</span><span class="brand-name">Digital Arts OER</span></a>
        ${d.code ? html`<span class="crumb" aria-hidden="true">/</span><span class="code">${d.code}</span>` : ""}
        <nav class="links" aria-label="On this page">${links.map(([tag, label]) => html`<button @click="${() => this._go(tag)}">${label}</button>`)}</nav>
        <span class="spacer"></span>
        ${this._signedIn
          ? html`<button class="btn ghost sm" @click="${editPage}">${icon("pencil")}<span class="lbl">Edit content</span></button>
              <button class="btn ghost sm" @click="${() => pageDetails().show(this.site.id)}">${icon("sliders")}<span class="lbl">Edit details</span></button>
              <button class="btn ghost sm" @click="${() => siteStyle().show(this._site)}">${icon("palette")}<span class="lbl">Style</span></button>`
          : ""}
        ${d.enrollUrl ? html`<a class="btn primary sm" href="${d.enrollUrl}" target="_blank" rel="noopener">Enroll</a>` : ""}
      </div>
    </header>`;
  }

  render() {
    const d = this._data;
    if (!d) return html``;
    // a page without sections yet: the standard ones around what it has
    const before = this._hasSections ? "" : html`<oer-cs-hero></oer-cs-hero><oer-cs-facts></oer-cs-facts>`;
    const after = this._hasSections
      ? ""
      : html`<oer-cs-learn></oer-cs-learn><oer-cs-semester></oer-cs-semester><oer-cs-make></oer-cs-make><oer-cs-people></oer-cs-people><oer-cs-faq></oer-cs-faq><oer-cs-closing></oer-cs-closing>`;
    return html`<div class="ms">
      ${this._renderBar(d)}
      ${this._signedIn && !siteIsOn(this._site)
        ? html`<p class="off-note" role="status">
            <span class="wrap"
              >${icon("eyeOff")}<span
                >This course site is off, so readers can't see it.
                ${d.course ? html`Turn it on from <a href="${d.course.slug}">the course page</a>.` : "Turn it on from its course page."}</span
              ></span
            >
          </p>`
        : ""}
      <main>${before}<slot @slotchange="${this._slotChanged}"></slot>${after}</main>
      <footer class="foot">
        <div class="wrap foot-in">
          <span>${d.institutionUrl ? html`<a href="${d.institutionUrl}" target="_blank" rel="noopener">${d.institution}</a>` : d.institution}</span>
          ${d.course ? html`<a href="${d.course.slug}">Course details</a>` : ""}
          <a href="./">Digital Arts OER</a>
          ${d.license ? html`<span class="muted">${d.license}</span>` : ""}
          <button class="theme-btn" aria-pressed="${this._dark ? "true" : "false"}" @click="${() => (store.darkMode = !store.darkMode)}">
            ${icon(this._dark ? "sun" : "moon")}${this._dark ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </footer>
    </div>`;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        color: var(--foreground);
        font-family: var(--cs-font-body, var(--font-sans, system-ui, sans-serif));
        /* DDD justifies the theme's text */
        text-align: start;
        --wrap: 72rem;
      }
      a {
        color: var(--link);
      }
      button {
        font: inherit;
        color: inherit;
      }
      :focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
      .i {
        flex: none;
        width: 1rem;
        height: 1rem;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .wrap {
        box-sizing: border-box;
        width: 100%;
        max-width: var(--wrap);
        margin: 0 auto;
        padding: 0 1.5rem;
      }
      .muted {
        color: var(--muted-foreground);
      }
      main {
        display: block;
      }

      /* the bar */
      .bar {
        position: sticky;
        top: 0;
        z-index: 20;
        border-bottom: 1px solid var(--border);
        background: color-mix(in oklch, var(--background) 88%, transparent);
        backdrop-filter: blur(8px);
      }
      .bar-in {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 3.5rem;
      }
      .bar-in > *,
      .links button {
        white-space: nowrap;
      }
      .brand {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: inherit;
        text-decoration: none;
        font-weight: 600;
        font-size: 0.875rem;
      }
      .mark {
        display: inline-grid;
        place-items: center;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-md);
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .crumb {
        color: var(--muted-foreground);
      }
      .code {
        font-size: 0.875rem;
        font-weight: 600;
      }
      .links {
        display: flex;
        gap: 0.125rem;
        margin-left: 1rem;
      }
      .links button {
        all: unset;
        padding: 0.375rem 0.625rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .links button:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .links button:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
      .spacer {
        flex: 1;
      }
      .btn {
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.375rem;
        height: 2rem;
        padding: 0 0.75rem;
        border: 1px solid transparent;
        border-radius: var(--radius-md);
        background: none;
        font-size: 0.8125rem;
        font-weight: 500;
        text-decoration: none;
        white-space: nowrap;
        cursor: pointer;
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .btn.primary:hover {
        background: color-mix(in oklab, var(--primary) 88%, var(--foreground));
      }
      .btn.ghost {
        color: var(--foreground);
      }
      .btn.ghost:hover {
        background: var(--accent);
      }
      .off-note {
        margin: 0;
        padding: 0.625rem 0;
        border-bottom: 1px solid var(--border);
        background: var(--muted);
        font-size: 0.875rem;
      }
      .off-note .wrap {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      /* the footer */
      .foot {
        padding: 1.5rem 0;
        border-top: 1px solid var(--border);
        font-size: 0.8125rem;
      }
      .foot-in {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem 1.5rem;
        color: var(--muted-foreground);
      }
      .foot a {
        color: var(--muted-foreground);
      }
      .theme-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        margin-left: auto;
        padding: 0.25rem 0.5rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: none;
        cursor: pointer;
        color: var(--foreground);
      }
      .theme-btn:hover {
        background: var(--accent);
      }

      @media (max-width: 900px) {
        .links {
          display: none;
        }
      }
      @media (max-width: 600px) {
        .wrap {
          padding: 0 1rem;
        }
        .brand-name,
        .lbl {
          display: none;
        }
      }
    `;
  }
}

if (!customElements.get(OerCourseSite.tag)) customElements.define(OerCourseSite.tag, OerCourseSite);
