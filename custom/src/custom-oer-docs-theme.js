/**
 * Copyright 2026 Michael Collins
 * @license Apache-2.0, see License.md for full text.
 *
 * `custom-oer-docs-theme`
 * A shadcn-style docs layout for HAXcms, modelled on the learning-materials
 * Nuxt site (layouts/docs.vue): sticky collapsible sidebar with the site
 * outline, sticky blurred top bar with breadcrumbs, a ⌘K search button,
 * sun/moon dark-mode toggle, and prev/next pager.
 *
 * Colours come from ./tokens/shadcn-tokens.js; ./tokens/ddd-bridge.js points
 * HAX's DDD tokens at them so stock blocks and the editor follow along.
 * @element custom-oer-docs-theme
 */
import {
  HAXCMSLitElementTheme,
  css,
  html,
  store,
  autorun,
  toJS,
} from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import "./outline/oer-site-nav.js";
import "./ui/oer-breadcrumb.js";
import "@haxtheweb/haxcms-elements/lib/ui-components/active-item/site-active-title.js";
import "@haxtheweb/haxcms-elements/lib/ui-components/layout/site-modal.js";
import { shadcnTokens } from "./tokens/shadcn-tokens.js";
import { dddBridge } from "./tokens/ddd-bridge.js";
import { registerShadowStyles } from "./editor/shadow-styles.js";
import { LUCIDE_ICONS } from "./editor/lucide-icons.generated.js";
import "./editor/oer-command-search.js";
import {
  stockUI,
  editPage,
  savePage,
  cancelEdit,
  toggleLock,
  logout,
  undo,
  redo,
  openSiteSettings,
  MOD,
} from "./editor/stock.js";
import { settingsDialog } from "./editor/oer-settings-dialog.js";
import { outlineBuilder } from "./outline/oer-outline-builder.js";
import { typeEditor } from "./types/oer-type-editor.js";
import { pageDetails } from "./types/oer-page-details.js";
import { isSystemItem, contentTypes, isHeading } from "./types/content-types.js";
import { flatten } from "./outline/outline-model.js";
import "./types/oer-page-header.js";
import "./types/oer-page-footer.js";
import { isEmbedded, startEmbedReporting } from "./embed/embed-mode.js";
import { embedDialog } from "./embed/oer-embed-dialog.js";
import { isSnapshot, versionsOf } from "./versions/versioning.js";
import { versionsDialog } from "./versions/oer-versions-dialog.js";
import { themeSkin } from "./theme-skin.js";
import { installEditorChrome } from "./editor/index.js";
import { installLayoutBreakpoints } from "./layout-breakpoints.js";

// skins for shared site elements (menu, breadcrumb, collapse) apply only
// while this theme is active: the bundle also loads under stock themes
let themeSkinRegistered = false;

const MOBILE_QUERY = "(max-width: 767px)";

function lucide(name) {
  return html`<span
    class="lucide"
    aria-hidden="true"
    style="--src:url(&quot;${LUCIDE_ICONS[name]}&quot;)"
  ></span>`;
}

// Lucide icons (ISC), inlined so the theme has no icon-font dependency
const icon = {
  share: html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`,
  panelLeft: html`<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>`,
  search: html`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  sun: html`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-2.93 1.41-1.41m11.32-11.32 1.41-1.41M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41"/></svg>`,
  moon: html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  // editor/admin controls reuse the generated Lucide set
  undo: lucide("icons:undo"),
  redo: lucide("icons:redo"),
  save: lucide("icons:save"),
  chevronDown: lucide("icons:expand-more"),
  pencil: lucide("icons:create"),
  lock: lucide("icons:lock"),
  user: lucide("social:person"),
  layoutDashboard: lucide("hax:home-edit"),
  logOut: lucide("icons:exit-to-app"),
  type: lucide("editor:title"),
  shapes: lucide("hax:hax2022"),
  image: lucide("image:photo-library"),
  tag: lucide("icons:label"),
  history: lucide("icons:history"),
  chart: lucide("hax:graph"),
  eye: lucide("icons:visibility"),
  eyeOff: lucide("icons:visibility-off"),
  lockOpen: lucide("icons:lock-open"),
  trash: lucide("icons:delete"),
  book: lucide("lrn:book"),
  siteMap: lucide("hax:site-map"),
  settings: lucide("icons:settings"),
  types: lucide("hax:templates"),
  details: lucide("image:tune"),
  code: lucide("icons:code"),
  chevronLeft: html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>`,
  chevronRight: html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`,
};

class CustomOerDocsTheme extends HAXCMSLitElementTheme {
  static get tag() {
    return "custom-oer-docs-theme";
  }

  static get properties() {
    return {
      ...super.properties,
      collapsed: { type: Boolean, reflect: true },
      mobileOpen: { type: Boolean, reflect: true, attribute: "mobile-open" },
      dark: { type: Boolean, reflect: true },
      siteTitle: { type: String },
      _prev: { state: true },
      _next: { state: true },
      _loggedIn: { state: true },
      _userName: { state: true },
      _activeTitle: { state: true },
      _locked: { state: true },
      _published: { state: true },
      _pageMenuOpen: { state: true },
      _banner: { state: true },
      _canEmbed: { state: true },
      _sidebarTab: { state: true },
      _userMenuOpen: { state: true },
      _book: { state: true },
      _bookFilter: { state: true },
      embed: { type: Boolean, reflect: true },
      hideHeader: { type: Boolean, reflect: true, attribute: "hide-header" },
      hideTitle: { type: Boolean, reflect: true, attribute: "hide-title" },
      _siteDescription: { state: true },
    };
  }

  constructor() {
    super();
    this.HAXCMSThemeSettings.autoScroll = true;
    this.collapsed = false;
    this.mobileOpen = false;
    this.dark = false;
    this.siteTitle = "";
    this.__mq = globalThis.matchMedia(MOBILE_QUERY);
    this.__keyHandler = this._onKeydown.bind(this);
    this._loggedIn = false;
    this._pageMenuOpen = false;
    // ?embed=1: chrome-less page for LMS iframes; decided once, so following
    // links inside the frame stays embedded
    const params = new URLSearchParams(globalThis.location.search);
    this.embed = isEmbedded();
    this.hideHeader = this.embed && params.get("hideHeader") === "true";
    this.hideTitle = this.embed && params.get("hideTitle") === "true";
    try {
      this._sidebarTab = globalThis.localStorage.getItem("oer-sidebar-tab") === "site" ? "site" : "nav";
    } catch {
      this._sidebarTab = "nav";
    }
    this.__outsideMenu = (e) => {
      const path = e.composedPath();
      if (this._userMenuOpen && !path.includes(this.shadowRoot.querySelector(".user-wrap"))) {
        this._userMenuOpen = false;
      }
      if (this._pageMenuOpen && !path.includes(this.shadowRoot.querySelector(".page-header .menu-wrap"))) {
        this._pageMenuOpen = false;
      }
    };
    this.__disposer.push(
      autorun(() => {
        const loggedIn = toJS(store.isLoggedIn);
        const user = toJS(store.userData);
        const item = toJS(store.activeItem);
        const manifest = toJS(store.manifest);
        Promise.resolve().then(() => {
          this._siteDescription = manifest?.description || "";
          this._loggedIn = !!loggedIn;
          this._userName = user?.userName || "";
          this._activeTitle = item?.title || "";
          this._locked = !!item?.metadata?.locked;
          this._published = item?.metadata?.published !== false;
          // a linked chapter shows its source's fields (as oer-page-header does)
          const refId = item?.metadata?.oerRef?.page;
          const source = refId ? (manifest?.items || []).find((i) => i.id === refId) : null;
          const fields = (source || item)?.metadata?.oerFields || {};
          this._banner = fields.image ? { src: fields.image, alt: fields.imageAlt || "" } : null;
          this._embedItem = item;
          this._canEmbed = !!item && !isEmbedded() && fields.allowEmbed !== false && item.metadata?.published !== false;
        });
      }),
    );
    // the HAX editor bar is appended to <body> after login: a 64px in-flow
    // spacer whose visible bar is position:fixed. Track its height so the
    // sticky sidebar/top bar stick below it and the sidebar still fits
    this.__editorBarObserver = new ResizeObserver(() => this._measureEditorBar());
    this.__bodyObserver = new MutationObserver(() => this._watchEditorBar());
    this.__disposer.push(
      autorun(() => {
        const dark = toJS(store.darkMode);
        Promise.resolve().then(() => {
          this.dark = !!dark;
        });
      }),
    );
    this.__disposer.push(
      autorun(() => {
        const title = toJS(store.siteTitle);
        Promise.resolve().then(() => {
          this.siteTitle = title || "";
        });
      }),
    );
    // on every route change: close the mobile drawer, recompute prev/next
    this.__disposer.push(
      autorun(() => {
        const active = toJS(store.activeId);
        const all = toJS(store.manifest?.items) || [];
        const book = this._bookOf(active, all);
        // the hidden content-types page is configuration, never a stop;
        // inside a book, Previous / Next stay within the book
        let items = (toJS(store.routerManifest?.items) || []).filter((i) => !isSystemItem(i) && !isSnapshot(i) && !isHeading(i));
        if (book) {
          const inBook = new Set([book.id, ...flatten(all, book.id).map((x) => x.item.id)]);
          items = items.filter((i) => inBook.has(i.id));
        }
        const idx = items.findIndex((i) => i.id === active);
        Promise.resolve().then(() => {
          this.mobileOpen = false;
          if (book?.id !== this._book?.id) this._bookFilter = "";
          this._book = book;
          this._followVersionParam(active);
          this._prev = idx > 0 ? items[idx - 1] : null;
          this._next = idx >= 0 && idx < items.length - 1 ? items[idx + 1] : null;
        });
      }),
    );
  }

  connectedCallback() {
    super.connectedCallback();
    installEditorChrome();
    installLayoutBreakpoints();
    if (!themeSkinRegistered) {
      themeSkinRegistered = true;
      registerShadowStyles(themeSkin);
    }
    globalThis.addEventListener("keydown", this.__keyHandler);
    globalThis.addEventListener("pointerdown", this.__outsideMenu);
    this.__bodyObserver.observe(globalThis.document.body, { childList: true });
    this._watchEditorBar();
    // fonts can't be @import-ed from constructable stylesheets
    if (!globalThis.document.getElementById("oer-docs-fonts")) {
      const link = globalThis.document.createElement("link");
      link.id = "oer-docs-fonts";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
      globalThis.document.head.appendChild(link);
    }
  }

  _watchEditorBar() {
    const bar = globalThis.document.querySelector("haxcms-site-editor-ui");
    if (bar === this.__editorBar) return;
    this.__editorBar = bar;
    this.__editorBarObserver.disconnect();
    if (bar) this.__editorBarObserver.observe(bar);
    this._measureEditorBar();
  }

  _measureEditorBar() {
    const bar = globalThis.document.querySelector("haxcms-site-editor-ui");
    const h = bar ? bar.getBoundingClientRect().height : 0;
    this.style.setProperty("--editor-bar-height", `${Math.round(h)}px`);
  }

  disconnectedCallback() {
    this.__editorBarObserver.disconnect();
    this.__bodyObserver.disconnect();
    globalThis.removeEventListener("keydown", this.__keyHandler);
    globalThis.removeEventListener("pointerdown", this.__outsideMenu);
    super.disconnectedCallback();
  }

  /**
   * Light-DOM styles: tokens + DDD bridge must live outside the shadow root so
   * every HAX element (and the editor chrome) inherits them.
   */
  HAXCMSGlobalStyleSheetContent() {
    return [
      ...super.HAXCMSGlobalStyleSheetContent(),
      shadcnTokens,
      dddBridge,
      css`
        /* desktop uses the inset layout, which scrolls inside its card;
           the document itself must not scroll. (HAX appends a row of inline
           "manager" elements after the site, adding a ~20px line box.)
           overflow: hidden still lets scrollIntoView / focus scroll the body,
           which slid the layout up and showed that line as a gap at the
           bottom; clip allows no scrolling at all */
        @media (min-width: 768px) {
          html,
          body {
            height: 100%;
            overflow: hidden;
            overflow: clip;
          }
        }
        custom-oer-docs-theme {
          line-height: 1.7;
        }
        custom-oer-docs-theme :is(p, li) {
          text-align: start;
        }
        custom-oer-docs-theme .lead {
          font-size: 1.125rem;
          color: var(--muted-foreground);
        }
        custom-oer-docs-theme :is(h2, h3, h4) {
          letter-spacing: -0.015em;
          scroll-margin-top: calc(var(--topbar-height) + 1rem);
        }
        custom-oer-docs-theme a:any-link {
          color: var(--link);
          text-underline-offset: 3px;
        }
        custom-oer-docs-theme :not(pre) > code {
          font-family: var(--font-mono);
          font-size: 0.875em;
          background: var(--muted);
          border-radius: var(--radius-sm);
          padding: 0.125rem 0.375rem;
        }
      `,
    ];
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          min-height: 100vh;
          background: var(--background);
          color: var(--foreground);
          font-family: var(--font-sans);
        }
        svg {
          width: 1rem;
          height: 1rem;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* grid shell; the sidebar is sticky rather than fixed so the HAX
           editor bar (in normal flow above the theme when logged in) pushes
           it down instead of covering it */
        .shell {
          display: grid;
          grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
          transition: grid-template-columns 200ms ease;
        }
        :host([collapsed]) .shell {
          grid-template-columns: 0 minmax(0, 1fr);
        }
        .sidebar {
          position: sticky;
          top: var(--editor-bar-height, 0px);
          z-index: 30;
          height: calc(100vh - var(--editor-bar-height, 0px));
          height: calc(100dvh - var(--editor-bar-height, 0px));
          width: var(--sidebar-width);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: var(--card);
          border-right: 1px solid var(--border);
          transition: transform 200ms ease;
        }
        :host([collapsed]) .sidebar {
          transform: translateX(-100%);
        }
        /* shadcn SidebarHeader: brand row at the page header's height */
        .sidebar-header {
          height: var(--topbar-height);
          display: flex;
          align-items: center;
          padding: 0 0.5rem;
          border-bottom: 1px solid var(--border);
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.375rem 0.5rem;
          border-radius: var(--radius-md);
          color: var(--foreground);
          text-decoration: none;
        }
        .brand:hover {
          background: var(--accent);
        }
        .brand-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: none;
          width: 2rem;
          height: 2rem;
          border-radius: var(--radius-lg);
          background: var(--primary);
          color: var(--primary-foreground);
        }
        .brand-text {
          display: flex;
          flex-direction: column;
          min-width: 0;
          line-height: 1.25;
        }
        .brand-title {
          font-size: 0.875rem;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .brand-sub {
          font-size: 0.75rem;
          color: var(--muted-foreground);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        /* Nav / Site tabs (shadcn TabsList), signed-in authors only */
        .sidebar-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.125rem;
          margin: 0.75rem 0.75rem 0.25rem;
          padding: 0.1875rem;
          border-radius: var(--radius-md);
          background: var(--muted);
        }
        .sidebar-tabs button {
          all: unset;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 1.75rem;
          border-radius: calc(var(--radius-md) - 2px);
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--muted-foreground);
          cursor: pointer;
        }
        .sidebar-tabs button[aria-selected="true"] {
          background: var(--background);
          color: var(--foreground);
          box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
        }
        .sidebar-tabs button:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 1px;
        }
        .site-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          padding: 0.5rem;
        }
        nav[hidden] {
          display: none;
        }
        .sidebar nav {
          flex: 1;
          overflow-y: auto;
          padding: 0.5rem;
          scrollbar-width: thin;
          scrollbar-color: var(--border) transparent;
        }
        .sidebar-footer {
          padding: 0.75rem;
          border-top: 1px solid var(--border);
        }
        kbd {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          padding: 0.125rem 0.375rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          background: var(--muted);
          color: var(--muted-foreground);
        }
        /* site-modal renders its own icon button; we trigger it from ours */
        site-modal {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip-path: inset(50%);
        }

        /* main column */
        .main-col {
          min-width: 0;
        }
        .topbar {
          position: sticky;
          top: var(--editor-bar-height, 0px);
          z-index: 20;
          height: var(--topbar-height);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0 1rem;
          border-bottom: 1px solid var(--border);
          background: color-mix(in oklch, var(--background) 80%, transparent);
          backdrop-filter: blur(8px);
        }
        .icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          padding: 0;
          color: var(--foreground);
          background: transparent;
          border: 0;
          border-radius: var(--radius-md);
          cursor: pointer;
        }
        .icon-btn:hover {
          background: var(--accent);
          color: var(--accent-foreground);
        }
        .icon-btn:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
        }
        oer-breadcrumb {
          flex: 1;
          min-width: 0;
        }
        .separator {
          width: 1px;
          height: 1rem;
          background: var(--border);
        }

        main {
          padding: 2.5rem 1.5rem 4rem;
        }
        /* gutter for oer-block-rail, which sits left of the selected block */
        :host([edit-mode]) main {
          padding-left: 5.5rem;
        }
        article {
          max-width: 48rem;
          margin: 0 auto;
        }
        .page-banner {
          display: block;
          width: 100%;
          max-height: 22rem;
          margin: 0 0 1.5rem;
          object-fit: cover;
          border-radius: var(--radius-lg);
        }
        site-active-title {
          display: block;
          margin: 0 0 1.5rem;
        }
        site-active-title h1 {
          font-family: var(--font-sans);
          font-size: 2.25rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.2;
        }
        site-active-title h1 .site-active-title-icon {
          --simple-icon-height: 1.5rem;
          --simple-icon-width: 1.5rem;
          color: var(--muted-foreground);
        }
        :host([edit-mode]) #slot {
          display: none;
        }
        .pager {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }
        /* shadcn-style prev/next cards */
        .pager[hidden] {
          display: none;
        }
        .pager-link {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          min-width: 0;
          max-width: 50%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          color: var(--foreground);
          text-decoration: none;
        }
        .pager-link.next {
          margin-left: auto;
          align-items: flex-end;
          text-align: end;
        }
        .pager-link:hover {
          background: var(--accent);
        }
        .pager-link:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
        }
        .pager-label {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8125rem;
          color: var(--muted-foreground);
        }
        .pager-title {
          font-size: 0.875rem;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 100%;
        }

        .lucide {
          display: inline-block;
          flex: none;
          width: 1rem;
          height: 1rem;
          background: currentColor;
          -webkit-mask: var(--src) center / contain no-repeat;
          mask: var(--src) center / contain no-repeat;
        }

        /* shadcn Button (sm) */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          height: 2rem;
          padding: 0 0.75rem;
          font: inherit;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: var(--radius-md);
          border: 1px solid transparent;
          cursor: pointer;
          white-space: nowrap;
        }
        .btn:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
        }
        .btn-primary {
          background: var(--primary);
          color: var(--primary-foreground);
        }
        .btn-primary:hover {
          background: color-mix(in oklch, var(--primary) 90%, black);
        }
        .btn-outline {
          background: var(--background);
          color: var(--foreground);
          border-color: var(--input-border);
        }
        .btn-outline:hover {
          background: var(--accent);
        }
        .icon-btn.sm {
          width: 1.75rem;
          height: 1.75rem;
          color: var(--muted-foreground);
        }
        .icon-btn.danger:hover {
          color: var(--destructive);
          background: color-mix(in oklch, var(--destructive) 10%, transparent);
        }

        /* sidebar: site admin group + user row (learning-materials CMS) */
        .sidebar-footer {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        /* shadcn SidebarGroupLabel: h-8, text-xs, medium, muted */
        .nav-group-label {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          height: 2rem;
          padding: 0 0.5rem;
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted-foreground);
        }
        /* breathing room between the sidebar tabs (or brand) and the outline */
        #panel-nav > oer-site-nav {
          margin-top: 1rem;
        }
        .nav-actions {
          display: flex;
          justify-content: center;
          padding: 0.75rem 0.25rem 0.5rem;
        }
        /* shadcn Button, variant "outline", size "sm" */
        .label-action {
          all: unset;
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          gap: 0.3125rem;
          height: 1.625rem;
          padding: 0 0.5rem;
          border: 1px solid var(--input-border, var(--border));
          border-radius: var(--radius-md);
          background: transparent;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--foreground);
          cursor: pointer;
        }
        .label-action:hover {
          background: var(--accent);
          color: var(--foreground);
        }
        .label-action:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 1px;
        }
        .label-action svg {
          width: 0.75rem;
          height: 0.75rem;
        }
        /* account menu (shadcn NavUser) */
        .user-wrap {
          position: relative;
        }
        .user-row {
          all: unset;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          height: 2.5rem;
          padding: 0 0.5rem;
          border-radius: var(--radius-md);
          cursor: pointer;
        }
        .user-row:hover,
        .user-row[aria-expanded="true"] {
          background: var(--sidebar-accent, var(--accent));
        }
        .user-row:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: -2px;
        }
        .user-row > .lucide:last-child {
          width: 1rem;
          height: 1rem;
          color: var(--muted-foreground);
          transform: rotate(180deg);
        }
        .menu.user-menu {
          top: auto;
          bottom: calc(100% + 0.25rem);
          left: 0;
          right: 0;
          min-width: 0;
        }
        .menu-label {
          padding: 0.375rem 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--muted-foreground);
        }
        .avatar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: none;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 999px;
          background: var(--muted);
          color: var(--foreground);
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .avatar .lucide {
          width: 0.875rem;
          height: 0.875rem;
        }
        .user-name {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.75rem;
          font-weight: 500;
        }
        /* page header: title + page options menu */
        .page-header {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        .page-header site-active-title {
          flex: 1;
          min-width: 0;
        }
        .menu-wrap {
          position: relative;
          flex: none;
          margin-top: 0.375rem;
        }
        .menu {
          position: absolute;
          right: 0;
          top: calc(100% + 0.25rem);
          z-index: 40;
          min-width: 14rem;
          padding: 0.25rem;
          background: var(--popover);
          color: var(--popover-foreground);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: 0 8px 24px rgb(0 0 0 / 0.12);
        }
        .menu [role="menuitem"] {
          all: unset;
          color: var(--popover-foreground);
          box-sizing: border-box;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          cursor: pointer;
        }
        .menu [role="menuitem"]:hover,
        .menu [role="menuitem"]:focus-visible {
          background: var(--accent);
          color: var(--accent-foreground);
        }
        .menu kbd {
          margin-left: auto;
        }
        .menu [role="menuitem"] .lucide {
          color: var(--muted-foreground);
        }
        .menu [role="menuitem"][disabled] {
          opacity: 0.5;
          pointer-events: none;
        }
        .menu [role="menuitem"].danger,
        .menu [role="menuitem"].danger .lucide {
          color: var(--destructive);
        }
        .menu [role="menuitem"].danger:hover {
          background: color-mix(in oklch, var(--destructive) 10%, transparent);
          color: var(--destructive);
        }
        .menu-sep {
          height: 1px;
          margin: 0.25rem -0.25rem;
          background: var(--border);
        }

        /* edit mode: the breadcrumb bar becomes the editor header */
        .topbar.editing {
          gap: 0.5rem;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          height: 1.5rem;
          padding: 0 0.5rem;
          border: 1px solid var(--border);
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 500;
          white-space: nowrap;
        }
        .dot {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 999px;
          background: var(--primary);
        }
        .editing-title {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.875rem;
          font-weight: 600;
        }
        .toolbar-group {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        /* edit mode: the sidebar stays, but navigating away would drop
           unsaved edits, so it is inert (see render) and dimmed */
        :host([edit-mode]) .sidebar nav {
          opacity: 0.6;
        }

        /* reader layout: the book's own header above its chapters */
        .book-head {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          padding: 0.75rem 0.75rem 0.25rem;
        }
        .book-back {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: var(--muted-foreground);
          text-decoration: none;
        }
        .book-back:hover {
          color: var(--foreground);
        }
        .book-back svg {
          width: 0.875rem;
          height: 0.875rem;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
        }
        .book-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 0.5rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.9375rem;
          color: var(--foreground);
          text-decoration: none;
        }
        .book-title:hover,
        .book-title[aria-current="page"] {
          background: var(--accent);
        }
        .book-title .lucide {
          width: 1rem;
          height: 1rem;
          color: var(--primary);
        }
        .book-filter {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          height: 2rem;
          padding: 0 0.625rem;
          border: 1px solid var(--input-border, var(--border));
          border-radius: var(--radius-md);
          background: var(--background);
          color: var(--muted-foreground);
        }
        .book-filter:focus-within {
          outline: 2px solid var(--ring);
          outline-offset: 1px;
        }
        .book-filter svg {
          width: 0.875rem;
          height: 0.875rem;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
        }
        .book-filter input {
          flex: 1;
          min-width: 0;
          border: 0;
          outline: none;
          background: transparent;
          color: var(--foreground);
          font: inherit;
          font-size: 0.8125rem;
        }

        /* Site tab rows: shadcn SidebarMenuButton */
        .site-action {
          all: unset;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          height: 2rem;
          padding: 0 0.5rem;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          color: var(--sidebar-foreground, var(--foreground));
          cursor: pointer;
        }
        .site-action:hover {
          background: var(--sidebar-accent, var(--accent));
          color: var(--sidebar-accent-foreground, var(--accent-foreground));
        }
        .site-action:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: -2px;
        }
        .site-action .lucide {
          width: 1rem;
          height: 1rem;
          color: var(--muted-foreground);
        }

        /* shadcn sidebar-08 "inset" variant: the page takes the sidebar's
           colour and the content sits in a rounded card that scrolls on its
           own, so the sticky header keeps its rounded top */
        @media (min-width: 768px) {
          :host {
            background: var(--card);
          }
          .shell {
            height: 100vh;
            height: 100dvh;
          }
          .sidebar {
            border-right: 0;
            background: transparent;
          }
          .sidebar-header {
            border-bottom: 0;
          }
          /* the card is a column: fixed header, scrolling body below it,
             so the scrollbar never runs up beside the header */
          .main-col {
            display: flex;
            flex-direction: column;
            /* gap on all sides so the card's outline never sits under the
               sidebar or the docked editor panel */
            margin: 0.5rem;
            height: calc(100vh - 1rem);
            height: calc(100dvh - 1rem);
            overflow: hidden;
            border-radius: 0.75rem;
            background: var(--background);
            /* shadow-sm plus a faint outline, so the card edge stays
               perceivable on the near-white page background */
            box-shadow:
              0 1px 2px rgb(0 0 0 / 0.06),
              0 0 0 1px color-mix(in oklch, var(--foreground) 9%, transparent);
          }
          .topbar {
            position: relative;
            top: 0;
            flex: none;
          }
          main {
            flex: 1;
            min-height: 0;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: var(--border) transparent;
          }
        }

        /* mobile: sidebar becomes an overlay drawer */
        .scrim {
          display: none;
        }
        @media (max-width: 767px) {
          .shell,
          :host([collapsed]) .shell {
            grid-template-columns: minmax(0, 1fr);
          }
          .sidebar {
            position: fixed;
            inset: 0 auto 0 0;
            height: auto;
            transform: translateX(-100%);
            box-shadow: 0 10px 30px rgb(0 0 0 / 0.2);
          }
          :host([mobile-open]) .sidebar {
            transform: none;
          }
          :host([mobile-open]) .scrim {
            display: block;
            position: fixed;
            inset: 0;
            z-index: 25;
            background: rgb(0 0 0 / 0.4);
          }
          main {
            padding: 1.5rem 1rem 3rem;
          }
          site-active-title h1 {
            font-size: 1.75rem;
          }
        }

        /* embed mode (?embed=1): only the page itself */
        :host([embed]) {
          background: var(--background);
        }
        :host([embed]) .shell {
          display: block;
        }
        :host([embed]) .sidebar,
        :host([embed]) .scrim,
        :host([embed]) .topbar,
        :host([embed]) .pager,
        :host([embed]) .page-header .menu-wrap,
        :host([embed]) .skip-link,
        :host([hide-header]) oer-page-header,
        :host([hide-header]) .page-banner,
        :host([hide-title]) site-active-title {
          display: none !important;
        }
        :host([embed]) .main-col {
          margin: 0 !important;
          height: auto !important;
          overflow: visible !important;
          border: 0 !important;
          border-radius: 0 !important;
          box-shadow: none !important;
        }
        :host([embed]) main {
          overflow: visible !important;
          padding: 1rem 1.25rem 1.5rem !important;
        }
        .skip-link:focus {
          z-index: 50;
        }
        @media (prefers-reduced-motion: reduce) {
          .sidebar,
          .shell {
            transition: none;
          }
        }
      `,
    ];
  }

  render() {
    const drawerOpen = this.__mq.matches ? this.mobileOpen : !this.collapsed;
    return html`
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="shell">
      <aside
        id="sidebar"
        class="sidebar"
        aria-label="Site navigation"
        part="sidebar"
        ?inert="${!drawerOpen || this.editMode}"
      >
        <div class="sidebar-header">
          <a class="brand" href="${store.homeLink || "./"}">
            <span class="brand-mark" aria-hidden="true">${icon.book}</span>
            <span class="brand-text">
              <span class="brand-title">${this.siteTitle}</span>
              <span class="brand-sub">${this._siteDescription || "Learning materials"}</span>
            </span>
          </a>
        </div>
        ${this._loggedIn ? this.renderSidebarTabs() : ""}
        ${this._book && !this.editMode && this._sidebarTab !== "site" ? this.renderBookHeader() : ""}
        <nav
          aria-label="${this._book ? "Book contents" : "Course outline"}"
          id="panel-nav"
          role="${this._loggedIn ? "tabpanel" : "navigation"}"
          aria-labelledby="${this._loggedIn ? "tab-nav" : ""}"
          ?hidden="${this._loggedIn && this._sidebarTab === "site"}"
        >
          <oer-site-nav
            part="site-menu"
            ?editable="${this._loggedIn && !this.editMode}"
            .root="${this._book?.id || null}"
            .filter="${this._book ? this._bookFilter || "" : ""}"
          ></oer-site-nav>
          ${!this._book && this._loggedIn && !this.editMode
            ? html`<div class="nav-actions">
                <button class="label-action" @click="${() => outlineBuilder().show()}">${icon.pencil}Edit outline</button>
              </div>`
            : ""}
        </nav>
        ${this._loggedIn && this._sidebarTab === "site"
          ? html`<div class="site-panel" id="panel-site" role="tabpanel" aria-labelledby="tab-site">
              <div class="nav-group-label">Site</div>
              <button class="site-action" @click="${() => typeEditor().show()}">${icon.types}Content types</button>
              <button class="site-action" @click="${openSiteSettings}">${icon.settings}Settings</button>
            </div>`
          : ""}
        ${this._loggedIn
          ? html`<div class="sidebar-footer">${this.renderUser()}</div>`
          : ""}
      </aside>
      <div class="scrim" role="presentation" @click="${this._closeMobile}"></div>

      <div class="main-col">
        ${this.editMode ? this.renderEditorHeader(drawerOpen) : this.renderTopbar(drawerOpen)}

        <main id="main">
          <article id="contentcontainer">
            ${this._banner ? html`<img class="page-banner" src="${this._banner.src}" alt="${this._banner.alt}" />` : ""}
            <div class="page-header">
              <site-active-title part="page-title"></site-active-title>
              ${!this.editMode && (this._loggedIn || this._canEmbed) ? this.renderPageMenu() : ""}
            </div>
            <oer-page-header></oer-page-header>
            <section id="slot"><slot></slot></section>
            ${this.editMode ? "" : html`<oer-page-footer></oer-page-footer>`}
            <nav class="pager" aria-label="Previous and next page" ?hidden="${this.editMode}">
              ${this._prev
                ? html`<a class="pager-link prev" href="${this._prev.slug}">
                    <span class="pager-label">${icon.chevronLeft} Previous</span>
                    <span class="pager-title">${this._prev.title}</span>
                  </a>`
                : html`<span></span>`}
              ${this._next
                ? html`<a class="pager-link next" href="${this._next.slug}">
                    <span class="pager-label">Next ${icon.chevronRight}</span>
                    <span class="pager-title">${this._next.title}</span>
                  </a>`
                : ""}
            </nav>
          </article>
        </main>
      </div>
      </div>
    `;
  }

  renderTopbar(drawerOpen) {
    return html`
      <header class="topbar" part="topbar">
        <button
          class="icon-btn"
          @click="${this.toggleSidebar}"
          aria-controls="sidebar"
          aria-expanded="${drawerOpen}"
          title="Toggle sidebar"
        >
          ${icon.panelLeft}
        </button>
        <div class="separator" aria-hidden="true"></div>
        <oer-breadcrumb part="breadcrumb"></oer-breadcrumb>
        <button class="icon-btn" @click="${this.openSearch}" title="Search the site (⌘K)" aria-label="Search the site">
          ${icon.search}
        </button>
        <site-modal icon="icons:search" title="Search site" button-label="Search" @site-modal-click="${this._loadSearch}">
          <site-search></site-search>
        </site-modal>
        ${this._loggedIn ? html`<oer-command-search></oer-command-search>` : ""}
        <button
          class="icon-btn"
          @click="${this.toggleDark}"
          title="${this.dark ? "Switch to light mode" : "Switch to dark mode"}"
          aria-pressed="${this.dark}"
        >
          ${this.dark ? icon.sun : icon.moon}
        </button>
      </header>
    `;
  }

  // Decap-style edit header: what you are editing on the left, history and
  // the commit actions on the right
  renderEditorHeader() {
    return html`
      <header class="topbar editing" part="topbar">
        <span class="badge"><span class="dot" aria-hidden="true"></span>Editing</span>
        <span class="editing-title">${this._activeTitle}</span>
        <div class="toolbar-group">
          <button class="icon-btn" @click="${undo}" title="Undo (${MOD}Z)" aria-label="Undo">
            ${icon.undo}
          </button>
          <button class="icon-btn" @click="${redo}" title="Redo (${MOD}⇧Z)" aria-label="Redo">
            ${icon.redo}
          </button>
          <div class="separator" aria-hidden="true"></div>
          <button
            class="icon-btn"
            @click="${() => settingsDialog().open("source")}"
            title="Edit HTML source"
            aria-label="Edit HTML source"
          >
            ${icon.code}
          </button>
          <oer-command-search></oer-command-search>
          <div class="separator" aria-hidden="true"></div>
          <button class="btn btn-outline" @click="${cancelEdit}" title="Discard changes (${MOD}⇧/)">
            Cancel
          </button>
          <button class="btn btn-primary" @click="${savePage}" title="Save (${MOD}⇧S)">
            ${icon.save}Save
          </button>
        </div>
      </header>
    `;
  }

  // page-level actions, as in learning-materials' "more" menu. Everything
  // but "Edit page" proxies the active page-break's own action handlers
  // (its stock pencil menu is hidden by the editor skin).
  renderPageMenu() {
    const pb = (method) => this._menuAction(() => this.querySelector("page-break")?.[method]?.());
    const item = (fn, iconTpl, label, extra = "") =>
      html`<button role="menuitem" class="${extra}" @click="${fn}">${iconTpl}${label}</button>`;
    return html`
      <div class="menu-wrap">
        <button
          class="icon-btn"
          aria-haspopup="menu"
          aria-expanded="${this._pageMenuOpen}"
          aria-label="Page options"
          title="Page options"
          @click="${this._togglePageMenu}"
        >
          ${icon.chevronDown}
        </button>
        ${this._pageMenuOpen && !this._loggedIn
          ? html`<div class="menu" role="menu" @keydown="${this._menuKeys}">
              ${item(this._menuAction(() => embedDialog().show(this._embedItem)), icon.share, "Embed…")}
            </div>`
          : ""}
        ${this._pageMenuOpen && this._loggedIn
          ? html`<div class="menu" role="menu" @keydown="${this._menuKeys}">
              <button role="menuitem" ?disabled="${this._locked}" @click="${this._menuAction(editPage)}">
                ${icon.pencil}Edit page<kbd>${MOD}⇧E</kbd>
              </button>
              <div class="menu-sep" role="separator"></div>
              ${item(pb("_editTitle"), icon.type, "Rename page")}
              ${item(pb("_editIcon"), icon.shapes, "Change icon")}
              ${item(pb("_editMedia"), icon.image, "Page media")}
              ${item(this._menuAction(() => pageDetails().show(store.activeId)), icon.details, "Page details")}
              ${item(pb("_editTags"), icon.tag, "Tags")}
              ${item(this._menuAction(() => outlineBuilder().show(store.activeId)), icon.siteMap, "Edit page outline")}
              ${this._canEmbed ? item(this._menuAction(() => embedDialog().show(this._embedItem)), icon.share, "Embed…") : ""}
              <div class="menu-sep" role="separator"></div>
              ${item(this._menuAction(() => versionsDialog().show(store.activeId, { publish: true })), icon.history, "Versions…")}
              ${item(pb("_openRevisions"), icon.history, "Revisions")}
              ${item(pb("_openPageReport"), icon.chart, "Page report")}
              <div class="menu-sep" role="separator"></div>
              ${item(pb("_togglePublished"), this._published ? icon.eyeOff : icon.eye, this._published ? "Unpublish" : "Publish")}
              ${item(pb("_toggleLocked"), this._locked ? icon.lockOpen : icon.lock, this._locked ? "Unlock page" : "Lock page")}
              <div class="menu-sep" role="separator"></div>
              ${item(pb("_deletePage"), icon.trash, "Delete page", "danger")}
            </div>`
          : ""}
      </div>
    `;
  }

  // ?version=1.2.0 (links from the Decap site) opens that release's snapshot
  _followVersionParam(activeId) {
    const wanted = new URLSearchParams(globalThis.location.search).get("version");
    if (!wanted || !activeId) return;
    const release = versionsOf(activeId).find((v) => v.version === wanted);
    if (release?.snapshot) {
      globalThis.history.replaceState({}, "", release.snapshot.slug);
      globalThis.dispatchEvent(new PopStateEvent("popstate"));
    }
  }

  // the nearest page (the active one or an ancestor) whose type reads as a book
  _bookOf(activeId, items) {
    const types = contentTypes(items).types;
    const byId = new Map(items.map((i) => [i.id, i]));
    for (let cur = byId.get(activeId); cur; cur = byId.get(cur.parent)) {
      if (types.find((t) => t.id === cur.metadata?.pageType)?.reader) return cur;
    }
    return null;
  }

  renderBookHeader() {
    const b = this._book;
    return html`<div class="book-head">
      <a class="book-back" href="${store.homeLink || "./"}">${icon.chevronLeft}All pages</a>
      <a class="book-title" href="${b.slug}" aria-current="${store.activeId === b.id ? "page" : "false"}">${icon.book}<span>${b.title}</span></a>
      <label class="book-filter">
        ${icon.search}
        <input
          type="search"
          placeholder="Filter chapters…"
          aria-label="Filter chapters"
          .value="${this._bookFilter || ""}"
          @input="${(e) => (this._bookFilter = e.target.value)}"
        />
      </label>
    </div>`;
  }

  firstUpdated(changed) {
    super.firstUpdated?.(changed);
    // the host itself: it persists across re-renders and, embedded, is
    // exactly as tall as the page content
    if (this.embed) startEmbedReporting(this);
  }

  // Nav (page list) / Site (site-wide tools) tabs at the top of the sidebar
  renderSidebarTabs() {
    const tab = (id, label) => html`<button
      role="tab"
      id="tab-${id}"
      aria-selected="${this._sidebarTab === id}"
      aria-controls="panel-${id}"
      tabindex="${this._sidebarTab === id ? 0 : -1}"
      @click="${() => this._setSidebarTab(id)}"
    >
      ${label}
    </button>`;
    return html`<div
      class="sidebar-tabs"
      role="tablist"
      aria-label="Sidebar"
      @keydown="${(e) => {
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
        e.preventDefault();
        const next = this._sidebarTab === "nav" ? "site" : "nav";
        this._setSidebarTab(next);
        this.updateComplete.then(() => this.shadowRoot.getElementById(`tab-${next}`)?.focus());
      }}"
    >
      ${tab("nav", "Navigation")}${tab("site", "Site")}
    </div>`;
  }

  _setSidebarTab(id) {
    this._sidebarTab = id;
    try {
      globalThis.localStorage.setItem("oer-sidebar-tab", id);
    } catch {
      // not remembered without storage
    }
  }

  // the account is a menu (shadcn NavUser): dashboard and log out
  renderUser() {
    const name = this._userName || "Signed in";
    return html`
      <div class="user-wrap">
        <button
          class="user-row"
          aria-haspopup="menu"
          aria-expanded="${!!this._userMenuOpen}"
          @click="${() => (this._userMenuOpen = !this._userMenuOpen)}"
        >
          <span class="avatar" aria-hidden="true">${this._userName ? name.slice(0, 2) : icon.user}</span>
          <span class="user-name">${name}</span>
          ${icon.chevronDown}
        </button>
        ${this._userMenuOpen
          ? html`<div class="menu user-menu" role="menu" aria-label="Account" @keydown="${this._userMenuKeys}">
              <div class="menu-label">${name}</div>
              <a role="menuitem" href="${stockUI()?.backLink ?? "/"}">${icon.layoutDashboard}Site dashboard</a>
              <div class="menu-sep" role="separator"></div>
              <button role="menuitem" class="danger" @click="${() => ((this._userMenuOpen = false), logout())}">${icon.logOut}Log out</button>
            </div>`
          : ""}
      </div>
    `;
  }

  _userMenuKeys(e) {
    const items = [...this.shadowRoot.querySelectorAll('.user-menu [role="menuitem"]')];
    const i = items.indexOf(this.shadowRoot.activeElement);
    if (e.key === "Escape") {
      this._userMenuOpen = false;
      this.shadowRoot.querySelector(".user-row")?.focus();
    } else if (e.key === "ArrowDown") items[(i + 1) % items.length]?.focus();
    else if (e.key === "ArrowUp") items[(i - 1 + items.length) % items.length]?.focus();
    else return;
    e.preventDefault();
  }

  _togglePageMenu() {
    this._pageMenuOpen = !this._pageMenuOpen;
  }

  _menuAction(fn) {
    return () => {
      this._pageMenuOpen = false;
      fn();
    };
  }

  _menuKeys(e) {
    const items = [...this.shadowRoot.querySelectorAll('.menu [role="menuitem"]')];
    const i = items.indexOf(this.shadowRoot.activeElement);
    if (e.key === "Escape") {
      this._pageMenuOpen = false;
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      items[(i + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]?.focus();
    }
  }

  toggleSidebar() {
    if (this.__mq.matches) {
      this.mobileOpen = !this.mobileOpen;
    } else {
      this.collapsed = !this.collapsed;
    }
  }

  _closeMobile() {
    this.mobileOpen = false;
  }

  toggleDark() {
    store.darkMode = !store.darkMode;
  }

  async _loadSearch() {
    await import("@haxtheweb/haxcms-elements/lib/ui-components/site/site-search.js");
    setTimeout(() => {
      const field = globalThis.SimpleModal?.requestAvailability()
        ?.querySelector("site-search")
        ?.shadowRoot?.querySelector("simple-fields-field");
      field?.focus();
    }, 50);
  }

  openSearch() {
    this.shadowRoot.querySelector("site-modal")?.shadowRoot?.querySelector("#btn")?.click();
  }

  _onKeydown(e) {
    if (this.editMode) return;
    if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key.toLowerCase() === "k") {
      e.preventDefault();
      this.openSearch();
    } else if (e.key === "Escape" && this.mobileOpen) {
      this.mobileOpen = false;
    }
  }
}
customElements.define(CustomOerDocsTheme.tag, CustomOerDocsTheme);
export { CustomOerDocsTheme };
