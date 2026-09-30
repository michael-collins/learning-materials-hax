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
import "@haxtheweb/haxcms-elements/lib/ui-components/navigation/site-menu.js";
import "@haxtheweb/haxcms-elements/lib/ui-components/navigation/site-breadcrumb.js";
import "@haxtheweb/haxcms-elements/lib/ui-components/navigation/site-menu-button.js";
import "@haxtheweb/haxcms-elements/lib/ui-components/active-item/site-active-title.js";
import "@haxtheweb/haxcms-elements/lib/ui-components/layout/site-modal.js";
import { shadcnTokens } from "./tokens/shadcn-tokens.js";
import { dddBridge } from "./tokens/ddd-bridge.js";

const MOBILE_QUERY = "(max-width: 767px)";

// Lucide icons (ISC), inlined so the theme has no icon-font dependency
const icon = {
  panelLeft: html`<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>`,
  search: html`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  sun: html`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-2.93 1.41-1.41m11.32-11.32 1.41-1.41M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41"/></svg>`,
  moon: html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
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
    // close the mobile drawer whenever the route changes
    this.__disposer.push(
      autorun(() => {
        toJS(store.activeId);
        Promise.resolve().then(() => {
          this.mobileOpen = false;
        });
      }),
    );
  }

  connectedCallback() {
    super.connectedCallback();
    globalThis.addEventListener("keydown", this.__keyHandler);
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
        .sidebar-header {
          height: var(--topbar-height);
          display: flex;
          align-items: center;
          padding: 0 1rem;
          border-bottom: 1px solid var(--border);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted-foreground);
        }
        .sidebar-header a {
          color: inherit;
          text-decoration: none;
        }
        .sidebar nav {
          flex: 1;
          overflow-y: auto;
          padding: 0.75rem 0.5rem;
        }
        site-menu {
          height: auto;
          --site-menu-font-size: 0.875rem;
        }
        .sidebar-footer {
          padding: 0.75rem;
          border-top: 1px solid var(--border);
        }
        .search-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          font: inherit;
          font-size: 0.875rem;
          color: var(--muted-foreground);
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          cursor: pointer;
        }
        .search-btn:hover {
          background: var(--accent);
          color: var(--accent-foreground);
        }
        .search-btn span {
          flex: 1;
          text-align: left;
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
        .icon-btn:focus-visible,
        .search-btn:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
        }
        site-breadcrumb {
          flex: 1;
          min-width: 0;
          font-size: 0.875rem;
          --site-breadcrumb-margin: 0;
          color: var(--muted-foreground);
        }
        .separator {
          width: 1px;
          height: 1rem;
          background: var(--border);
        }

        main {
          padding: 2.5rem 1.5rem 4rem;
        }
        article {
          max-width: 48rem;
          margin: 0 auto;
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
        site-menu-button {
          --site-menu-button-link-color: var(--foreground);
          --site-menu-button-button-hover-color: var(--accent);
          --site-menu-button-button-border-radius: var(--radius-md);
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
        ?inert="${!drawerOpen}"
      >
        <div class="sidebar-header">
          <a href="${store.homeLink || "./"}">${this.siteTitle}</a>
        </div>
        <nav aria-label="Course outline">
          <site-menu part="site-menu"></site-menu>
        </nav>
        <div class="sidebar-footer">
          <button class="search-btn" @click="${this.openSearch}" ?disabled="${this.editMode}">
            ${icon.search}<span>Search…</span><kbd>⌘K</kbd>
          </button>
          <site-modal
            icon="icons:search"
            title="Search site"
            button-label="Search"
            @site-modal-click="${this._loadSearch}"
          >
            <site-search></site-search>
          </site-modal>
        </div>
      </aside>
      <div class="scrim" role="presentation" @click="${this._closeMobile}"></div>

      <div class="main-col">
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
          <site-breadcrumb part="breadcrumb"></site-breadcrumb>
          <button
            class="icon-btn"
            @click="${this.toggleDark}"
            title="${this.dark ? "Switch to light mode" : "Switch to dark mode"}"
            aria-pressed="${this.dark}"
          >
            ${this.dark ? icon.sun : icon.moon}
          </button>
        </header>

        <main id="main">
          <article id="contentcontainer">
            <site-active-title part="page-title"></site-active-title>
            <section id="slot"><slot></slot></section>
            <nav class="pager" aria-label="Previous and next page">
              <site-menu-button type="prev" position="right"></site-menu-button>
              <site-menu-button type="next" position="left"></site-menu-button>
            </nav>
          </article>
        </main>
      </div>
      </div>
    `;
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
