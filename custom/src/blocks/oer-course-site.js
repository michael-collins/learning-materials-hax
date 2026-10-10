/**
 * `oer-course-site` — the frame around a course's microsite
 * (types/course-site.js), shown full width by the theme while reading: a
 * bar with the course, links to its sections and Enroll (and Edit content,
 * Page details and Style for authors), the page itself, and a footer. The
 * page is made of the course site's section blocks (course-site/
 * cs-sections.js) and any other blocks; a page without sections yet shows
 * the standard ones around what it has. The bar's brand goes to OER
 * Courses, the students' hub of course sites (course-site/cs-hub.js), which
 * this frames too: its bar links to each degree program's courses.
 *
 * While editing, the theme shows the page in HAX's editor instead, at the
 * same width and in the same style, so it looks as readers will see it,
 * with the editing bar (editor/oer-edit-bar.js) where this bar is, and
 * this frame's "off" notice above the page (view "notice") and its footer
 * below it (view "footer").
 *
 * For authors the bar has Edit content (off, saying why, on a locked
 * page), Page details, Style and the page menu, which the theme puts in its
 * page-menu slot (Publish, Lock, Versions…: the same menu as on every
 * page). They keep their names at phone width: there, Page details and
 * Style are in the page menu. When a reload left unsaved edits behind
 * (editor/recovery.js), the bar says so.
 *
 *   <oer-course-site .site=${item}><slot id="cs-slot"></slot><div slot="page-menu">…</div></oer-course-site>
 *   <oer-course-site .site=${item} view="footer"></oer-course-site>
 * @element oer-course-site
 */
import { html, css, LitElement } from "../lit.js";
import { store, autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { siteData, siteIsOn, hubPage, COURSE_HUB_TYPE } from "../types/course-site.js";
import { pageDetails } from "../types/oer-page-details.js";
import { editPage } from "../editor/stock.js";
import { announce } from "../editor/announce.js";
import { pendingEdit, copyTime } from "../editor/recovery.js";
import { siteStyle } from "../ui/oer-site-style.js";
import { icon, isSection } from "./course-site/cs-shared.js";
import "./course-site/cs-sections.js";
import "./course-site/cs-hub.js";

// the control a click came from (Safari doesn't focus a clicked button)
const controlOf = (e) => (e?.currentTarget instanceof HTMLElement ? e.currentTarget : null);

// the sections the bar links to, in order, named by their headings (these
// until one is typed)
const NAV = [
  ["oer-cs-learn", "What you'll learn"],
  ["oer-cs-semester", "The semester"],
  ["oer-cs-make", "What you'll make"],
  ["oer-cs-books", "Books"],
  ["oer-cs-faq", "Questions"],
];

class OerCourseSite extends LitElement {
  static get tag() {
    return "oer-course-site";
  }

  static get properties() {
    return {
      site: { type: Object },
      // "" the whole frame; "notice" its "off" notice, "footer" its footer
      // (around the page while it's edited)
      view: { type: String },
      _data: { state: true },
      _signedIn: { state: true },
      _dark: { state: true },
      _hasSections: { state: true },
    };
  }

  constructor() {
    super();
    this.site = null;
    this.view = "";
    this._data = null;
    this._signedIn = false;
    this._dark = false;
    this._hasSections = true;
    // a section appeared or emptied: the bar's links change
    this.addEventListener("cs-section-change", () => this.requestUpdate());
    // unsaved edits kept or dropped (editor/recovery.js)
    this.__onPending = () => this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    globalThis.addEventListener("oer-pending-edit", this.__onPending);
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
    globalThis.removeEventListener("oer-pending-edit", this.__onPending);
    super.disconnectedCallback();
  }

  updated(changed) {
    if (changed.has("site")) this._recompute();
  }

  _recompute() {
    const site = (this._items || []).find((i) => i.id === this.site?.id) || this.site;
    this._site = site;
    this._hub = site?.metadata?.pageType === COURSE_HUB_TYPE;
    this._hubPage = hubPage(this._items || []);
    this._data = site && !this._hub ? siteData(site, this._items || []) : null;
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

  // the brand: OER Courses, the hub of course sites (readers only once it's published)
  _renderBrand() {
    const hub = this._hubPage;
    const href = hub && (siteIsOn(hub) || this._signedIn) ? hub.slug : "./";
    const name = hub ? hub.title || "OER Courses" : "Digital Arts OER";
    return html`<a class="brand" href="${href}" title="${hub ? `${name}: all the course sites` : `${name} home`}"
      ><span class="mark" aria-hidden="true">${icon("book")}</span><span class="brand-name">${name}</span></a
    >`;
  }

  // authors: open the editor (not on a locked page: it says why), the
  // page's details, its style, and the page menu (the theme's, slotted);
  // at phone width Page details and Style are in the menu. And unsaved
  // edits a reload left behind, when there are some
  _renderAuthorActions() {
    if (!this._signedIn) return "";
    const locked = !!this._site?.metadata?.locked;
    const why = "This page is locked. Unlock it from the page menu to edit it.";
    const pending = pendingEdit(this._site?.id);
    return html`${pending
        ? html`<button class="btn outline sm pending" title="Edit content to restore them" @click="${editPage}">
            ${icon("pencil")}<span>Unsaved edits from ${copyTime(pending)} · Edit content to restore</span>
          </button>`
        : ""}
      <button
        class="btn ghost sm"
        data-edit-content
        aria-disabled="${locked ? "true" : "false"}"
        title="${locked ? why : "Edit content"}"
        @click="${() => (locked ? announce(why) : editPage())}"
      >
        ${icon("pencil")}<span>Edit content</span>
      </button>
      <button class="btn ghost sm wide-only" @click="${(e) => pageDetails().show(this.site.id, { opener: controlOf(e) })}">${icon("sliders")}<span>Page details</span></button>
      <button class="btn ghost sm wide-only" @click="${(e) => siteStyle().show(this._site, { opener: controlOf(e) })}">${icon("palette")}<span>Style</span></button>
      <slot name="page-menu"></slot>`;
  }

  // what the bar calls a section: its typed heading, or its own name
  _linkLabel(tag, label) {
    const heading = this._section(tag)?.headingElement?.textContent.replace(/\s+/g, " ").trim();
    return heading || label;
  }

  _renderBar(d) {
    // (not to a section hidden from readers)
    const links = NAV.filter(([tag]) => this._section(tag)?.shown && !this._section(tag).hasAttribute("hidden-from-readers")).map(([tag, label]) => [tag, this._linkLabel(tag, label)]);
    return html`<header class="bar">
      <div class="wrap bar-in">
        ${this._renderBrand()}
        ${d.code ? html`<span class="crumb" aria-hidden="true">/</span><span class="code">${d.code}</span>` : ""}
        <nav class="links" aria-label="On this page">${links.map(([tag, label]) => html`<button @click="${() => this._go(tag)}">${label}</button>`)}</nav>
        <span class="spacer"></span>
        ${this._renderAuthorActions()}
        ${d.enrollUrl ? html`<a class="btn primary sm" href="${d.enrollUrl}" target="_blank" rel="noopener">Enroll</a>` : ""}
      </div>
    </header>`;
  }

  _themeButton() {
    return html`<button class="theme-btn" aria-pressed="${this._dark ? "true" : "false"}" @click="${() => (store.darkMode = !store.darkMode)}">
      ${icon(this._dark ? "sun" : "moon")}${this._dark ? "Light mode" : "Dark mode"}
    </button>`;
  }

  // the "off" notice, for authors: readers can't see this page yet
  _renderNotice(d) {
    if (!this._signedIn || siteIsOn(this._site)) return "";
    if (this._hub) {
      return html`<p class="off-note" role="status"><span class="wrap">${icon("eyeOff")}<span>This page is a draft, so readers can't see it. Publish it from the page menu.</span></span></p>`;
    }
    return html`<p class="off-note" role="status">
      <span class="wrap"
        >${icon("eyeOff")}<span
          >This course site is off, so readers can't see it.
          ${d?.course ? html`Turn it on from <a href="${d.course.slug}">the course page</a>.` : "Turn it on from its course page."}</span
        ></span
      >
    </p>`;
  }

  _renderFooter(d) {
    if (this._hub) return html`<footer class="foot"><div class="wrap foot-in">${this._themeButton()}</div></footer>`;
    return html`<footer class="foot">
      <div class="wrap foot-in">
        <span>${d.institutionUrl ? html`<a href="${d.institutionUrl}" target="_blank" rel="noopener">${d.institution}</a>` : d.institution}</span>
        ${d.course ? html`<a href="${d.course.slug}">Course details</a>` : ""}
        ${d.license ? html`<span class="muted">${d.license}</span>` : ""}
        ${this._themeButton()}
      </div>
    </footer>`;
  }

  // OER Courses: the hub's bar links to each degree program's courses
  _renderHub() {
    const catalogEl = this._section("oer-courses-catalog");
    const groups = catalogEl?.groups || [];
    const before = this._hasSections ? "" : html`<oer-courses-intro></oer-courses-intro>`;
    const after = this._hasSections ? "" : html`<oer-courses-catalog></oer-courses-catalog>`;
    return html`<div class="ms">
      <header class="bar">
        <div class="wrap bar-in">
          ${this._renderBrand()}
          <nav class="links" aria-label="Degree programs">${groups.map((g) => html`<button @click="${() => catalogEl.go(g.id)}">${g.label}</button>`)}</nav>
          <span class="spacer"></span>
          ${this._renderAuthorActions()}
        </div>
      </header>
      ${this._renderNotice()}
      <main>${before}<slot @slotchange="${this._slotChanged}"></slot>${after}</main>
      ${this._renderFooter()}
    </div>`;
  }

  render() {
    const d = this._data;
    if (this.view === "notice") return this._hub || d ? this._renderNotice(d) : html``;
    if (this.view === "footer") return this._hub || d ? this._renderFooter(d) : html``;
    if (this._hub) return this._renderHub();
    if (!d) return html``;
    // a page without sections yet: the standard ones around what it has
    const before = this._hasSections ? "" : html`<oer-cs-hero></oer-cs-hero><oer-cs-facts></oer-cs-facts>`;
    const after = this._hasSections
      ? ""
      : html`<oer-cs-learn></oer-cs-learn><oer-cs-semester></oer-cs-semester><oer-cs-make></oer-cs-make><oer-cs-books></oer-cs-books><oer-cs-people></oer-cs-people><oer-cs-faq></oer-cs-faq><oer-cs-closing></oer-cs-closing>`;
    return html`<div class="ms">
      ${this._renderBar(d)}
      ${this._renderNotice(d)}
      <main>${before}<slot @slotchange="${this._slotChanged}"></slot>${after}</main>
      ${this._renderFooter(d)}
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
      /* one row of links: when the bar is short of room (an author's
         buttons take some), the ones that don't fit wrap out of sight
         rather than push the page wider */
      .links {
        display: flex;
        flex-wrap: wrap;
        gap: 0.125rem;
        min-width: 0;
        height: 2.25rem;
        overflow: hidden;
        margin-left: 1rem;
      }
      .links button {
        all: unset;
        padding: 0.375rem 0.625rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        line-height: 1.5rem;
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
      .btn.outline {
        border-color: var(--input-border, var(--border));
        color: var(--foreground);
      }
      .btn.outline:hover {
        background: var(--accent);
      }
      .btn[aria-disabled="true"] {
        color: var(--muted-foreground);
        cursor: default;
      }
      .btn[aria-disabled="true"]:hover {
        background: none;
      }
      .btn:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
      /* unsaved edits a reload left behind: said while there's room */
      .pending {
        min-width: 0;
        max-width: 22rem;
      }
      .pending span {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      ::slotted([slot="page-menu"]) {
        flex: none;
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

      @media (max-width: 1100px) {
        .pending {
          display: none;
        }
      }
      @media (max-width: 900px) {
        .links {
          display: none;
        }
        /* the last to give way: the course's code, cut short */
        .code {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      @media (max-width: 600px) {
        .wrap {
          padding: 0 1rem;
        }
        .brand-name,
        .crumb {
          display: none;
        }
        /* an author's buttons keep their names: Page details and Style
           are in the page menu here */
        .wide-only {
          display: none;
        }
        .btn.ghost {
          padding: 0 0.5rem;
        }
      }
      @media (max-width: 400px) {
        .bar-in {
          gap: 0.25rem;
        }
        .btn.primary {
          padding: 0 0.625rem;
        }
      }
    `;
  }
}

if (!customElements.get(OerCourseSite.tag)) customElements.define(OerCourseSite.tag, OerCourseSite);
