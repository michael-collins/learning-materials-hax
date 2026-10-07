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
import { pagesBrowser } from "./outline/oer-pages-browser.js";
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
import { learningSkin, installLearningBlocks } from "./learning-skin.js";
import { installEditorChrome } from "./editor/index.js";
import { installLayoutBreakpoints } from "./layout-breakpoints.js";
import { installFootnotes } from "./ui/footnotes.js";
import { followPermalink } from "./ui/permalinks.js";
import { openViewerFromUrl } from "./ui/oer-outline-viewer.js";
import { loadReaderSettings, saveReaderSettings, readerVars } from "./ui/oer-reader.js";

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
  bookOpen: html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>`,
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
  files: lucide("oer:files"),
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
      // Reader mode (ui/oer-reader.js): a quieter layout for reading a book
      reader: { type: Boolean, reflect: true },
      readerColour: { type: String, reflect: true, attribute: "reader-colour" },
      _readerSettings: { state: true },
      _readerPos: { state: true },
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
    this.reader = false;
    this.readerColour = "";
    this._readerSettings = loadReaderSettings();
    this._readerPos = null;
    // reading a book in Reader mode lasts the visit: following a link out of
    // the book shows the site as usual, and coming back resumes it
    try {
      this.__readerBook = globalThis.sessionStorage.getItem("oer-reader-book") || "";
    } catch {
      this.__readerBook = "";
    }
    this.__onReader = () => this._enterReader();
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
    // permanent links (?p=<page id>): go to wherever the page lives now
    this.__disposer.push(
      autorun(() => {
        const items = toJS(store.manifest?.items) || [];
        if (items.length && new URLSearchParams(globalThis.location.search).has("p")) Promise.resolve().then(() => followPermalink(items));
      }),
    );
    // a linked outline viewer (?view=<page>&item=<entry>): open it once
    this.__disposer.push(
      autorun(() => {
        const items = toJS(store.manifest?.items) || [];
        if (this.__viewerOpened || !items.length || !new URLSearchParams(globalThis.location.search).has("view")) return;
        this.__viewerOpened = true;
        Promise.resolve().then(() => openViewerFromUrl(items));
      }),
    );
    // HAX's site builder can miss loading an unpublished page opened
    // directly by its address (the page resolves only once sign-in is
    // known, after the builder's load check ran). If the active page's
    // content hasn't arrived shortly after the route settles, load it.
    this.__disposer.push(
      autorun(() => {
        const active = toJS(store.activeId);
        const loggedIn = !!store.isLoggedIn;
        if (!active) return;
        clearTimeout(this.__contentCheck);
        this.__contentCheck = setTimeout(() => {
          const sb = globalThis.document.querySelector("haxcms-site-builder");
          if (!sb || sb.loading || !sb.activeItemLocation || sb.__pageContentOwner === active) return;
          if (store.activeId === active) sb.loadPageData?.();
        }, loggedIn ? 1200 : 2000);
      }),
    );
    // scroll on navigation. On desktop the page scrolls inside <main>, which
    // HAX's router doesn't know about, so a new page kept the last one's
    // scroll. Following a link starts the new page at the top (or at its
    // #anchor); Back and Forward return to where you were on that page.
    this.__scrollPositions = new Map();
    // HAX's router switches pages while the popstate event is still being
    // dispatched, before this listener runs: note when it happened, and
    // decide once the event is over
    this.__onPopState = () => (this.__historyNavAt = Date.now());
    globalThis.addEventListener("popstate", this.__onPopState, true);
    this.__disposer.push(
      autorun(() => {
        const active = toJS(store.activeId);
        if (!active) return;
        const previous = this.__scrolledFor;
        this.__scrolledFor = active;
        // where the reader was on the page they're leaving
        if (previous && previous !== active) this.__scrollPositions.set(previous, this._scrollTop());
        if (!previous || previous === active) return;
        setTimeout(() => {
          if (store.activeId !== active) return;
          const back = Date.now() - (this.__historyNavAt || 0) < 1000;
          this.__historyNavAt = 0;
          if (back && this.__scrollPositions.has(active)) this._restoreScroll(this.__scrollPositions.get(active));
          else if (!globalThis.location.hash) this._scrollTo(0);
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
        // pages removed from the navigation aren't stops either
        const loggedIn = !!store.isLoggedIn;
        let items = (toJS(store.routerManifest?.items) || []).filter((i) => !isSystemItem(i) && !isSnapshot(i) && !isHeading(i) && !i.metadata?.hideInMenu && (loggedIn || i.metadata?.published !== false));
        if (book) {
          const inBook = new Set([book.id, ...flatten(all, book.id).map((x) => x.item.id)]);
          items = items.filter((i) => inBook.has(i.id));
        }
        // on the release an item is pinned to, the pager goes on from that item
        const activeItem = all.find((i) => i.id === active);
        const pinnedTo = activeItem?.metadata?.oerSnapshotOf;
        const here = pinnedTo && all.find((i) => i.id === pinnedTo)?.metadata?.oerNavVersion === activeItem.metadata.version ? pinnedTo : active;
        const idx = items.findIndex((i) => i.id === here);
        // an item pinned to a release (metadata.oerNavVersion) links to it
        const stop = (item) => {
          const v = item?.metadata?.oerNavVersion;
          const snap = v && all.find((i) => i.metadata?.oerSnapshotOf === item.id && i.metadata?.version === v);
          return item && snap ? { ...item, slug: snap.slug } : item;
        };
        Promise.resolve().then(() => {
          this.mobileOpen = false;
          if (book?.id !== this._book?.id) this._bookFilter = "";
          this._book = book;
          this._readerPos = book ? { index: Math.max(0, idx), total: items.length } : null;
          this.reader = !!book && !this.embed && !this.editMode && book.id === this.__readerBook;
          this._followVersionParam(active);
          this._prev = idx > 0 ? stop(items[idx - 1]) : null;
          this._next = idx >= 0 && idx < items.length - 1 ? stop(items[idx + 1]) : null;
        });
      }),
    );
  }

  connectedCallback() {
    super.connectedCallback();
    installEditorChrome();
    installLayoutBreakpoints();
    installFootnotes();
    if (!themeSkinRegistered) {
      themeSkinRegistered = true;
      registerShadowStyles(themeSkin);
      registerShadowStyles(learningSkin);
      installLearningBlocks();
    }
    globalThis.addEventListener("keydown", this.__keyHandler);
    globalThis.addEventListener("pointerdown", this.__outsideMenu);
    globalThis.addEventListener("oer-reader", this.__onReader);
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

  // the page's scroll: <main> on desktop, the window on narrow screens
  _scroller() {
    const main = this.shadowRoot?.querySelector("main");
    return main && main.scrollHeight > main.clientHeight && getComputedStyle(main).overflowY !== "visible" ? main : null;
  }

  _scrollTop() {
    return this._scroller()?.scrollTop ?? globalThis.scrollY;
  }

  _scrollTo(top) {
    const main = this.shadowRoot?.querySelector("main");
    if (main) main.scrollTop = top;
    if (globalThis.scrollY) globalThis.scrollTo(0, top);
  }

  // back to a position once the page is long enough to have it again
  // (its content and collections arrive after the route changes)
  _restoreScroll(top) {
    const started = Date.now();
    const attempt = () => {
      const el = this._scroller();
      const room = el ? el.scrollHeight - el.clientHeight : globalThis.document.documentElement.scrollHeight - globalThis.innerHeight;
      if (room >= top || Date.now() - started > 2000) return this._scrollTo(Math.min(top, Math.max(0, room)));
      setTimeout(attempt, 100);
    };
    requestAnimationFrame(attempt);
  }

  disconnectedCallback() {
    globalThis.removeEventListener("popstate", this.__onPopState, true);
    this.__editorBarObserver.disconnect();
    this.__bodyObserver.disconnect();
    globalThis.removeEventListener("keydown", this.__keyHandler);
    globalThis.removeEventListener("pointerdown", this.__outsideMenu);
    globalThis.removeEventListener("oer-reader", this.__onReader);
    super.disconnectedCallback();
  }

  /**
   * Light-DOM styles: tokens + DDD bridge must live outside the shadow root so
   * every HAX element (and the editor chrome) inherits them. Page content
   * rules also cover .oer-reading, the outline viewer's reading pane.
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
        :is(custom-oer-docs-theme, .oer-reading) {
          line-height: 1.7;
        }
        /* Reader mode: the page's text in the reader's type (DDD sizes p, li
           and headings itself); headings, tables and code scale with it */
        custom-oer-docs-theme[reader] :is(p, li, dd, dt, blockquote) {
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
        }
        custom-oer-docs-theme[reader] :is(h2, h3, h4, h5, h6) {
          font-family: inherit;
          line-height: 1.3;
        }
        custom-oer-docs-theme[reader] h2 {
          font-size: 1.5em;
        }
        custom-oer-docs-theme[reader] h3 {
          font-size: 1.25em;
        }
        custom-oer-docs-theme[reader] :is(h4, h5, h6) {
          font-size: 1.05em;
        }
        custom-oer-docs-theme[reader] .lead {
          font-size: 1.1em;
        }
        custom-oer-docs-theme[reader] table {
          font-size: 0.85em;
        }
        custom-oer-docs-theme[reader] pre {
          font-size: 0.8em;
        }
        custom-oer-docs-theme[reader] :is(figcaption, .footnotes) {
          font-size: 0.8em;
        }
        /* HAX's editor bar would sit above the reader; editing leaves Reader mode */
        body:has(custom-oer-docs-theme[reader]) haxcms-site-editor-ui {
          display: none;
        }
        :is(custom-oer-docs-theme, .oer-reading) :is(p, li) {
          text-align: start;
        }
        /* screenshots and other figures in page content */
        :is(custom-oer-docs-theme, .oer-reading) figure {
          margin: 1.5rem 0;
        }
        :is(custom-oer-docs-theme, .oer-reading) figure img {
          display: block;
          max-width: 100%;
          height: auto;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
        }
        /* footnotes (scripts/lib/footnotes.mjs): citations and references */
        :is(custom-oer-docs-theme, .oer-reading) sup.fn-ref {
          line-height: 0;
        }
        :is(custom-oer-docs-theme, .oer-reading) sup.fn-ref a {
          padding: 0 0.15em;
          font-size: 0.75em;
          font-weight: 600;
          text-decoration: none;
          color: var(--link);
        }
        :is(custom-oer-docs-theme, .oer-reading) sup.fn-ref a:hover {
          text-decoration: underline;
        }
        :is(custom-oer-docs-theme, .oer-reading) .footnotes {
          margin-top: 2.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--muted-foreground);
        }
        :is(custom-oer-docs-theme, .oer-reading) .footnotes h2 {
          margin: 0 0 0.5rem;
          font-size: 1rem;
          color: var(--foreground);
        }
        :is(custom-oer-docs-theme, .oer-reading) .footnotes ol {
          margin: 0;
          padding-left: 1.5rem;
        }
        :is(custom-oer-docs-theme, .oer-reading) .footnotes li + li {
          margin-top: 0.375rem;
        }
        :is(custom-oer-docs-theme, .oer-reading) .footnotes li:target,
        :is(custom-oer-docs-theme, .oer-reading) sup.fn-ref:target {
          background: color-mix(in srgb, var(--primary) 12%, transparent);
          border-radius: var(--radius-sm);
        }
        :is(custom-oer-docs-theme, .oer-reading) .footnotes a.fn-back {
          text-decoration: none;
          color: var(--link);
        }
        .oer-fn-tip {
          position: fixed;
          z-index: 10002;
          max-width: min(26rem, calc(100vw - 1rem));
          padding: 0.625rem 0.75rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--popover, var(--background));
          color: var(--popover-foreground, var(--foreground));
          box-shadow: 0 8px 24px rgb(0 0 0 / 0.16);
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          line-height: 1.5;
          text-align: start;
        }
        .oer-fn-tip[hidden] {
          display: none;
        }
        .oer-fn-tip a {
          color: var(--link);
        }
        .oer-fn-num {
          font-weight: 600;
          color: var(--muted-foreground);
        }
        :is(custom-oer-docs-theme, .oer-reading) figcaption {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          line-height: 1.5;
          color: var(--muted-foreground);
        }
        :is(custom-oer-docs-theme, .oer-reading) .lead {
          font-size: 1.125rem;
          color: var(--muted-foreground);
        }
        :is(custom-oer-docs-theme, .oer-reading) :is(h2, h3, h4) {
          letter-spacing: -0.015em;
          scroll-margin-top: calc(var(--topbar-height) + 1rem);
        }
        /* DDD's global "a" rule gives every link an accent background and
           bold text; links in page content read as plain links */
        :is(custom-oer-docs-theme, .oer-reading) a:any-link {
          background: transparent;
          font-weight: inherit;
          color: var(--link);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        /* code, after shadcn's typography. DDD styles every code element
           as an inline-block box with a groove border, tight line height,
           margins and a transition; reset all of it here */
        :is(custom-oer-docs-theme, .oer-reading) :not(pre) > code {
          display: inline;
          margin: 0;
          border: 0;
          padding: 0.125rem 0.375rem;
          border-radius: var(--radius-sm);
          background: var(--muted);
          color: var(--foreground);
          font-family: var(--font-mono);
          font-size: 0.875em;
          line-height: inherit;
          transition: none;
          /* long snippets wrap at spaces, each line keeping its padding and
             corners; a word breaks only when it can't fit at all */
          overflow-wrap: break-word;
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
        }
        /* tables in page content, after shadcn's: an outer rounded border,
           lines between rows only, a quiet header, room in each cell, a faint
           stripe to follow a row across; wide tables scroll sideways. DDD
           gives every cell a border on all sides (its color !important,
           inherited: set on the table), no padding and middle alignment. */
        :is(custom-oer-docs-theme, .oer-reading) table {
          display: block;
          box-sizing: border-box;
          width: auto;
          max-width: 100%;
          margin: 1.5rem 0;
          overflow-x: auto;
          border: 1px solid var(--border);
          border-color: var(--border);
          border-radius: var(--radius-lg);
          border-collapse: separate;
          border-spacing: 0;
          font-size: 0.9375rem;
          line-height: 1.55;
        }
        :is(custom-oer-docs-theme, .oer-reading) :is(th, td) {
          padding: 0.625rem 0.875rem;
          border: 0;
          border-bottom: 1px solid;
          font-family: inherit;
          font-size: inherit;
          text-align: start;
          vertical-align: top;
        }
        :is(custom-oer-docs-theme, .oer-reading) th {
          background: color-mix(in srgb, var(--muted) 45%, transparent);
          color: var(--muted-foreground);
          font-size: 0.875rem;
          font-weight: 500;
          white-space: nowrap;
        }
        :is(custom-oer-docs-theme, .oer-reading) tbody tr:nth-child(even) > * {
          background: color-mix(in srgb, var(--muted) 30%, transparent);
        }
        :is(custom-oer-docs-theme, .oer-reading) tr:last-child > td {
          border-bottom: 0;
        }
        /* a cell that's only a name in code (a model, a command) keeps it whole */
        :is(custom-oer-docs-theme, .oer-reading) :is(th, td) > code:only-child {
          white-space: nowrap;
        }
        :is(custom-oer-docs-theme, .oer-reading) caption {
          caption-side: bottom;
          padding: 0.5rem 0.875rem;
          font-size: 0.875rem;
          color: var(--muted-foreground);
          text-align: start;
        }
        :is(custom-oer-docs-theme, .oer-reading) pre {
          /* DDD makes pre an inline box sized to its text */
          display: block;
          box-sizing: border-box;
          width: auto;
          max-width: 100%;
          margin: 1rem 0;
          padding: 0.875rem 1rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--muted);
          color: var(--foreground);
          font-family: var(--font-mono);
          font-size: 0.875rem;
          line-height: 1.6;
          overflow-x: auto;
          tab-size: 2;
        }
        :is(custom-oer-docs-theme, .oer-reading) pre > code {
          display: block;
          margin: 0;
          border: 0;
          padding: 0;
          background: transparent;
          color: inherit;
          font: inherit;
          line-height: inherit;
          white-space: pre;
          transition: none;
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
          line-height: 1.35;
          text-align: start;
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
          :host([reader]) .main-col {
            height: 100vh;
            height: 100dvh;
          }
          /* the page scrolls inside <main>: its paper moves with the text */
          :host([reader]) main {
            background-image: var(--reader-texture, none);
            background-attachment: local;
          }
          oer-reader-bar {
            position: relative;
            top: 0;
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

        /* sidebar footer: the account menu, then the light/dark switch */
        .footer-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.25rem;
        }
        .footer-row .user-wrap {
          flex: 1;
          min-width: 0;
        }
        .theme-toggle {
          flex: none;
        }
        .reader-btn {
          flex: none;
        }
        @media (max-width: 479px) {
          .reader-btn {
            padding: 0 0.5rem;
          }
          .reader-label {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip-path: inset(50%);
          }
        }

        /* Reader mode (ui/oer-reader.js): no sidebar or site chrome, the
           page in one column set in the reader's type, at their size, line
           width and spacing (--reader-*, set on the host), on their page
           colour. Light and dark resolve the site's tokens in that scheme;
           dark and paper have their own palettes; paper adds a texture
           (--reader-texture, ui/oer-reader.js) on the page and the bar */
        :host([reader]) {
          background-color: var(--background);
          background-image: var(--reader-texture, none);
          /* for blocks with their own type styles (oer-include) */
          --reader-h2: 1.5em;
          --reader-h3: 1.25em;
          --reader-h4: 1.05em;
          --reader-gap: 1em;
          --reader-table: 0.85em;
          --oer-include-source: none;
        }
        :host([reader]) .shell,
        :host([reader][collapsed]) .shell {
          grid-template-columns: minmax(0, 1fr);
        }
        :host([reader]) .sidebar,
        :host([reader]) .scrim,
        :host([reader]) oer-page-header {
          display: none;
        }
        :host([reader]) .main-col {
          margin: 0;
          border-radius: 0;
          box-shadow: none;
          background: transparent;
        }
        :host([reader]) main {
          padding-top: 3rem;
          padding-bottom: 5rem;
        }
        :host([reader]) article {
          max-width: var(--reader-measure, 68ch);
          font-family: var(--reader-font, var(--font-sans));
          font-size: var(--reader-size, 19px);
          line-height: var(--reader-leading, 1.7);
        }
        :host([reader]) :is(.pager, oer-page-footer) {
          font-family: var(--font-sans);
          line-height: 1.5;
        }
        :host([reader]) site-active-title h1 {
          font-family: var(--reader-font, var(--font-sans));
          font-size: 1.85em;
          letter-spacing: -0.01em;
        }
        oer-reader-bar {
          position: sticky;
          top: var(--editor-bar-height, 0px);
        }
        @media (max-width: 767px) {
          :host([reader]) main {
            padding-top: 2rem;
          }
          :host([reader]) site-active-title h1 {
            font-size: 1.5em;
          }
        }
        :host([reader-colour="light"]) {
          color-scheme: only light;
        }
        /* a softer dark than the site's black, easier over long reading
           (AA: text 13.6:1, muted 7.4:1, links 8.2:1) */
        :host([reader-colour="dark"]) {
          color-scheme: only dark;
          --background: #16181d;
          --foreground: #e3e1dc;
          --card: #1d2026;
          --card-foreground: #e3e1dc;
          --popover: #1d2026;
          --popover-foreground: #e3e1dc;
          --muted: #23262d;
          --muted-foreground: #a3a7ae;
          --accent: #262a31;
          --accent-foreground: #e3e1dc;
          --border: #30343c;
          --input-border: #6b717b;
          --primary: #7cb4f0;
          --primary-foreground: #0b1a2b;
          --link: #7cb4f0;
          --ring: #5b8fd0;
        }
        /* warm white under ink-blue links (AA on the texture's darkest
           pixel: text 10.6:1, muted 5.0:1, links 6.1:1, focus ring 3.8:1) */
        :host([reader-colour="paper"]) {
          color-scheme: only light;
          --background: #f8f5ec;
          --foreground: #2f2a22;
          --card: #f1ece0;
          --card-foreground: #2f2a22;
          --popover: #fcfaf5;
          --popover-foreground: #2f2a22;
          --muted: #ede6d8;
          --muted-foreground: #645a4a;
          --accent: #ece4d4;
          --accent-foreground: #2f2a22;
          --border: #ddd4c2;
          --input-border: #8c8270;
          --primary: #1d4f91;
          --primary-foreground: #ffffff;
          --link: #1d4f91;
          --ring: #4a6fa5;
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
        ?inert="${!drawerOpen || this.editMode || this.reader}"
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
              <button class="site-action" @click="${() => pagesBrowser().show()}">${icon.files}Browse pages</button>
              <button class="site-action" @click="${() => typeEditor().show()}">${icon.types}Content types</button>
              <button class="site-action" @click="${openSiteSettings}">${icon.settings}Settings</button>
            </div>`
          : ""}
        <div class="sidebar-footer">
          <div class="footer-row">
            ${this._loggedIn ? this.renderUser() : ""}
            <button
              class="icon-btn theme-toggle"
              @click="${this.toggleDark}"
              aria-label="Dark mode"
              title="${this.dark ? "Switch to light mode" : "Switch to dark mode"}"
              aria-pressed="${this.dark}"
            >
              ${this.dark ? icon.sun : icon.moon}
            </button>
          </div>
        </div>
      </aside>
      <div class="scrim" role="presentation" @click="${this._closeMobile}"></div>

      <div class="main-col">
        ${this.editMode
          ? this.renderEditorHeader(drawerOpen)
          : this.reader
            ? html`<oer-reader-bar
                .book="${this._book}"
                .position="${this._readerPos}"
                .prev="${this._prev}"
                .next="${this._next}"
                .settings="${this._effectiveReaderSettings()}"
                @reader-exit="${() => this._exitReader()}"
                @reader-settings="${(e) => this._setReaderSettings(e.detail)}"
              ></oer-reader-bar>`
            : this.renderTopbar(drawerOpen)}

        <main id="main">
          <article id="contentcontainer">
            ${this._banner ? html`<img class="page-banner" src="${this._banner.src}" alt="${this._banner.alt}" />` : ""}
            <div class="page-header">
              <site-active-title part="page-title"></site-active-title>
              ${!this.editMode && !this.reader && (this._loggedIn || this._canEmbed) ? this.renderPageMenu() : ""}
            </div>
            <oer-page-header></oer-page-header>
            <section id="slot"><slot></slot></section>
            ${this.editMode ? "" : html`<oer-page-footer ?compact="${this.reader}"></oer-page-footer>`}
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
        ${this._book
          ? html`<button class="btn btn-outline reader-btn" @click="${() => this._enterReader()}" title="Read this book in Reader mode">
              ${icon.bookOpen}<span class="reader-label">Reader</span>
            </button>`
          : ""}
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

  // Reader mode: for the book being read, until Exit
  _enterReader() {
    if (!this._book || this.editMode || this.embed) return;
    this.__readerBook = this._book.id;
    try {
      globalThis.sessionStorage.setItem("oer-reader-book", this._book.id);
    } catch {
      // without storage it lasts until the page reloads
    }
    this.reader = true;
    // the button pressed is gone with the top bar: Exit takes its place
    this.updateComplete.then(() => this.shadowRoot.querySelector("oer-reader-bar")?.updateComplete).then(() => {
      this.shadowRoot.querySelector("oer-reader-bar")?.shadowRoot?.querySelector(".exit")?.focus();
    });
  }

  _exitReader() {
    this.__readerBook = "";
    try {
      globalThis.sessionStorage.removeItem("oer-reader-book");
    } catch {
      // nothing stored
    }
    const wasReading = this.reader;
    this.reader = false;
    if (wasReading) this.updateComplete.then(() => this.shadowRoot.querySelector(".reader-btn")?.focus());
  }

  // a page colour not chosen yet follows the site's light or dark mode
  _effectiveReaderSettings() {
    const s = this._readerSettings;
    return { ...s, colour: s.colour || (this.dark ? "dark" : "light") };
  }

  _setReaderSettings(settings) {
    this._readerSettings = settings;
    saveReaderSettings(settings);
  }

  updated(changed) {
    super.updated?.(changed);
    // editing a page leaves Reader mode (it comes back on the next visit to the book)
    if (changed.has("editMode") && this.editMode && this.reader) this.reader = false;
    if (changed.has("reader") || changed.has("_readerSettings") || changed.has("dark")) {
      const vars = this.reader ? readerVars(this._readerSettings) : {};
      for (const name of ["--reader-size", "--reader-measure", "--reader-leading", "--reader-font", "--reader-texture"]) {
        if (vars[name]) this.style.setProperty(name, vars[name]);
        else this.style.removeProperty(name);
      }
      this.readerColour = this.reader ? this._effectiveReaderSettings().colour : "";
    }
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
    } else if (this.reader && (e.key === "ArrowLeft" || e.key === "ArrowRight") && !e.altKey && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.defaultPrevented) {
      // ← and → turn the page, unless the keys belong to something focused
      // (a field, a control, a scrolling table or code block)
      const owns = 'input, textarea, select, dialog, audio, video, pre, table, [role="slider"], [role="tablist"], [role="radiogroup"], [role="menu"], [role="listbox"], [role="dialog"]';
      if (e.composedPath().some((el) => el.isContentEditable || el.matches?.(owns))) return;
      const link = this.shadowRoot.querySelector(e.key === "ArrowLeft" ? ".pager-link.prev" : ".pager-link.next");
      if (!link) return;
      e.preventDefault();
      link.click();
    }
  }
}
customElements.define(CustomOerDocsTheme.tag, CustomOerDocsTheme);
export { CustomOerDocsTheme };
