/**
 * `oer-editor-bar` — shadcn-style admin bar that stands in for the stock
 * haxcms-site-editor-ui top bar.
 *
 * The stock element stays mounted (invisible and inert, see index.js) because
 * it owns keyboard shortcuts, Merlin programs, dialog wiring and save logic.
 * Every control here delegates to it, so behaviour stays identical to stock
 * HAX; only the presentation changes.
 * @element oer-editor-bar
 */
import { html, css, LitElement } from "../lit.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "./lucide-icons.generated.js";

const isMac = /Mac|iPhone|iPad/.test(globalThis.navigator?.platform ?? "");
const MOD = isMac ? "⌘" : "Ctrl";
const DAEMON = isMac ? "⌘⇧" : "Alt⇧";

function icon(name) {
  const src = LUCIDE_ICONS[name];
  return html`<span class="icon" aria-hidden="true" style="--src:url(&quot;${src}&quot;)"></span>`;
}

class OerEditorBar extends LitElement {
  static get tag() {
    return "oer-editor-bar";
  }

  static get properties() {
    return {
      editMode: { type: Boolean, reflect: true, attribute: "edit-mode" },
      pageAllowed: { type: Boolean },
      locked: { type: Boolean },
      trayDetail: { type: String },
      trayOpen: { type: Boolean },
      userName: { type: String },
      menuOpen: { type: Boolean },
      searchOpen: { type: Boolean, reflect: true, attribute: "search-open" },
    };
  }

  constructor() {
    super();
    this.editMode = false;
    this.pageAllowed = false;
    this.locked = false;
    this.trayDetail = "";
    this.trayOpen = false;
    this.userName = "";
    this.menuOpen = false;
    this.searchOpen = false;
    this.__disposers = [
      autorun(() => {
        const edit = toJS(store.editMode);
        const allowed = toJS(store.pageAllowed);
        const item = toJS(store.activeItem);
        Promise.resolve().then(() => {
          this.editMode = !!edit;
          this.pageAllowed = !!allowed;
          this.locked = !!item?.metadata?.locked;
          this._syncTray();
        });
      }),
    ];
    this.__outside = (e) => {
      const path = e.composedPath();
      if (this.menuOpen && !path.includes(this)) this.menuOpen = false;
      if (this.searchOpen && !path.includes(this.shadowRoot.querySelector(".search"))) {
        this.searchOpen = false;
      }
    };
    this.__trayPoll = null;
  }

  connectedCallback() {
    super.connectedCallback();
    globalThis.addEventListener("pointerdown", this.__outside);
    // tray state lives on hax-tray (not in the mobx store); sample it while
    // editing so the active toggle stays in sync with keyboard shortcuts
    this.__trayPoll = setInterval(() => this.editMode && this._syncTray(), 400);
  }

  disconnectedCallback() {
    globalThis.removeEventListener("pointerdown", this.__outside);
    clearInterval(this.__trayPoll);
    this.__disposers.forEach((d) => d());
    super.disconnectedCallback();
  }

  get stock() {
    return store.cmsSiteEditor?.haxCmsSiteEditorUIElement ?? null;
  }

  _syncTray() {
    const tray = globalThis.HaxStore?.requestAvailability?.()?.haxTray;
    this.trayDetail = tray?.trayDetail ?? "";
    this.trayOpen = tray ? !tray.collapsed : false;
    this.userName = store.userData?.userName || this.stock?.userName || "";
  }

  /**
   * Run a stock handler. simple-toolbar-button overrides click(), so a
   * synthetic click never reaches the @click listener; call the method the
   * stock template binds instead, passing the stock button as the target.
   */
  _callStock(method, selector) {
    const ui = this.stock;
    if (!ui) return;
    const target = selector ? ui.shadowRoot?.querySelector(selector) : null;
    if (method === "addPage") {
      target?.HAXCMSButtonClick?.({ target, preventDefault() {}, stopPropagation() {} });
    } else {
      ui[method]?.({ target, preventDefault() {}, stopPropagation() {} });
    }
    setTimeout(() => this._syncTray(), 50);
  }

  _op(event) {
    this.stock?.haxButtonOp({ target: { getAttribute: () => event }, type: "click" });
    setTimeout(() => this._syncTray(), 50);
  }

  _trayActive(name) {
    return this.trayOpen && this.trayDetail === name;
  }

  static get styles() {
    return css`
      :host {
        position: fixed;
        inset: 0 0 auto 0;
        z-index: 10001;
        display: block;
        height: 3.5rem;
        font-family: var(--font-sans, system-ui, sans-serif);
        font-size: 0.875rem;
        color: var(--foreground);
        background: var(--background);
        border-bottom: 1px solid var(--border);
      }
      .bar {
        height: 100%;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0 0.75rem;
      }
      .group {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .sep {
        width: 1px;
        height: 1.25rem;
        margin: 0 0.375rem;
        background: var(--border);
      }
      .spacer {
        flex: 1;
      }
      .icon {
        display: inline-block;
        flex: none;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }

      /* shadcn Button: ghost / outline / default, size sm (h-8) */
      button,
      a.btn {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        height: 2rem;
        padding: 0 0.75rem;
        border-radius: var(--radius-md);
        font-weight: 500;
        white-space: nowrap;
        cursor: pointer;
        color: var(--foreground);
      }
      button.icon-only,
      a.btn.icon-only {
        width: 2rem;
        padding: 0;
      }
      button:hover,
      a.btn:hover,
      button[aria-pressed="true"] {
        background: var(--accent);
        color: var(--accent-foreground);
      }
      button:focus-visible,
      a.btn:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
      button:disabled {
        opacity: 0.5;
        pointer-events: none;
      }
      button.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      button.primary:hover {
        background: color-mix(in oklch, var(--primary) 90%, black);
        color: var(--primary-foreground);
      }
      button.outline {
        border: 1px solid var(--input-border);
        background: var(--background);
      }
      button.outline:hover {
        background: var(--accent);
      }

      /* collapsible search: an icon that expands into a field */
      .search {
        position: relative;
        display: flex;
        align-items: center;
        width: 2rem;
        height: 2rem;
        border: 1px solid transparent;
        border-radius: var(--radius-md);
        overflow: hidden;
        transition: width 180ms ease-out, border-color 180ms ease-out;
      }
      :host([search-open]) .search {
        width: min(18rem, 40vw);
        border-color: var(--input-border);
        background: var(--background);
      }
      .search-toggle {
        flex: none;
      }
      :host([search-open]) .search-toggle {
        color: var(--muted-foreground);
        background: transparent;
      }
      .search input {
        flex: 1;
        min-width: 0;
        height: 100%;
        padding: 0 0.5rem 0 0;
        border: 0;
        outline: none;
        background: transparent;
        color: var(--foreground);
        font: inherit;
        font-size: 0.875rem;
        opacity: 0;
      }
      :host([search-open]) .search input {
        opacity: 1;
      }
      .search input::placeholder {
        color: var(--muted-foreground);
      }
      .search:focus-within {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
      /* honour the OS "reduce motion" setting */
      @media (prefers-reduced-motion: reduce) {
        .search {
          transition: none;
        }
      }
      kbd {
        font-family: var(--font-mono, monospace);
        font-size: 0.6875rem;
        padding: 0.0625rem 0.375rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        background: var(--muted);
        color: var(--muted-foreground);
      }

      .status {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.5rem;
        padding: 0 0.5rem;
        margin-right: 0.25rem;
        border: 1px solid var(--border);
        border-radius: 999px;
        color: var(--foreground);
        font-size: 0.75rem;
        font-weight: 500;
      }
      .dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 999px;
        background: var(--primary);
      }

      /* segmented control (shadcn TabsList) */
      .segmented {
        display: inline-flex;
        align-items: center;
        gap: 0.125rem;
        height: 2.25rem;
        padding: 0.1875rem;
        border-radius: var(--radius-md);
        background: var(--muted);
      }
      button.seg {
        height: 1.875rem;
        padding: 0 0.625rem;
        gap: 0.375rem;
        border-radius: calc(var(--radius-md) - 2px);
        color: var(--muted-foreground);
        font-weight: 500;
      }
      button.seg:hover {
        background: transparent;
        color: var(--foreground);
      }
      button.seg[aria-selected="true"] {
        background: var(--background);
        color: var(--foreground);
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.12), 0 0 0 1px var(--border);
      }

      /* user menu (shadcn DropdownMenu) */
      .menu-wrap {
        position: relative;
      }
      .avatar {
        width: 2rem;
        height: 2rem;
        padding: 0;
        border-radius: 999px;
        background: var(--muted);
        color: var(--foreground);
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
      }
      [role="menu"] {
        position: absolute;
        right: 0;
        top: calc(100% + 0.375rem);
        min-width: 13rem;
        padding: 0.25rem;
        background: var(--popover);
        color: var(--popover-foreground);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.08);
      }
      .menu-label {
        padding: 0.375rem 0.5rem;
        font-weight: 600;
      }
      .menu-sep {
        height: 1px;
        margin: 0.25rem -0.25rem;
        background: var(--border);
      }
      [role="menuitem"] {
        width: 100%;
        justify-content: flex-start;
        height: auto;
        padding: 0.375rem 0.5rem;
        border-radius: var(--radius-sm);
        font-weight: 400;
      }

      @media (max-width: 1100px) {
        .seg-label {
          display: none;
        }
        button.seg {
          width: 2rem;
          padding: 0;
        }
      }
      @media (max-width: 900px) {
        .label-md {
          display: none;
        }
      }
    `;
  }

  render() {
    return html`
      <div class="bar" role="toolbar" aria-label="Site editor">
        <div class="group">
          <a class="btn icon-only" href="${this.stock?.backLink ?? "/"}" title="Site dashboard" aria-label="Site dashboard">
            ${icon("hax:home-edit")}
          </a>
          <div class="sep" aria-hidden="true"></div>
          ${this.editMode ? this.renderEditTools() : this.renderSiteTools()}
        </div>

        <div class="spacer"></div>

        <div class="group">
          <div class="search" role="search">
            <button
              class="icon-only search-toggle"
              aria-expanded="${this.searchOpen}"
              aria-controls="search-input"
              title="Search or run a command (${DAEMON})"
              aria-label="Search or run a command"
              @click="${this._toggleSearch}"
            >
              ${icon("icons:search")}
            </button>
            <input
              id="search-input"
              type="search"
              placeholder="Search or run a command…"
              aria-label="Search or run a command"
              tabindex="${this.searchOpen ? 0 : -1}"
              @input="${this._searchInput}"
              @keydown="${this._searchKeydown}"
            />
          </div>
          <div class="sep" aria-hidden="true"></div>
          ${this.editMode
            ? html`
                <span class="status" role="status"><span class="dot" aria-hidden="true"></span>Editing</span>
                <button class="outline" @click="${() => this._callStock("_cancelButtonTap", "#cancelbutton")}" title="Discard changes (${MOD}⇧/)">
                  Cancel
                </button>
                <button class="primary" @click="${() => this._callStock("_editButtonTap", "#editbutton")}" title="Save (${MOD}⇧S)">
                  ${icon("icons:save")}<span>Save</span>
                </button>
              `
            : html`
                ${this.locked
                  ? html`<button class="outline" @click="${() => this._callStock("_toggleLockedStatus", "#lockbutton")}">
                      ${icon("icons:lock")}<span class="label-md">Unlock page</span>
                    </button>`
                  : ""}
                <button
                  class="primary"
                  ?disabled="${!this.pageAllowed || this.locked}"
                  @click="${() => this._callStock("_editButtonTap", "#editbutton")}"
                  title="Edit page (${MOD}⇧E)"
                >
                  ${icon("icons:create")}<span>Edit page</span>
                </button>
              `}
          <div class="sep" aria-hidden="true"></div>
          <div class="menu-wrap">
            <button
              class="avatar"
              aria-haspopup="menu"
              aria-expanded="${this.menuOpen}"
              aria-label="${this.userName ? `Account menu for ${this.userName}` : "Account menu"}"
              @click="${() => (this.menuOpen = !this.menuOpen)}"
            >
              ${this.userName ? this.userName.slice(0, 2) : icon("social:person")}
            </button>
            ${this.menuOpen
              ? html`<div role="menu" @keydown="${this._menuKeys}">
                  ${this.userName
                    ? html`<div class="menu-label">${this.userName}</div>
                        <div class="menu-sep"></div>`
                    : ""}
                  <a class="btn" role="menuitem" href="${this.stock?.backLink ?? "/"}">
                    ${icon("hax:hax2022")}Site dashboard
                  </a>
                  <button role="menuitem" @click="${() => this._callStock("_manifestButtonTap", "#manifestbtn")}">
                    ${icon("icons:settings")}Site settings
                  </button>
                  <div class="menu-sep"></div>
                  <button role="menuitem" @click="${() => this.stock?._logout()}">
                    ${icon("icons:exit-to-app")}Log out
                  </button>
                </div>`
              : ""}
          </div>
        </div>
      </div>
    `;
  }

  renderSiteTools() {
    return html`
      ${store.platformAllows("addPage")
        ? html`<button @click="${() => this._callStock("addPage", "#addpagebutton")}" title="Add page">
            ${icon("hax:add-page")}<span class="label-md">Add page</span>
          </button>`
        : ""}
      ${store.platformAllows("outlineDesigner")
        ? html`<button @click="${() => this._callStock("_outlineButtonTap", "#outlinebutton")}" title="Site outline">
            ${icon("hax:site-map")}<span class="label-md">Outline</span>
          </button>`
        : ""}
      <button @click="${() => this._callStock("_manifestButtonTap", "#manifestbtn")}" title="Site settings">
        ${icon("icons:settings")}<span class="label-md">Settings</span>
      </button>
    `;
  }

  renderEditTools() {
    // Right-panel modes as a labelled segmented control (shadcn Tabs look),
    // so the open panel is always visible as text, not just a tinted icon.
    const seg = (name, iconName, label, shortcut, feature) =>
      !feature || store.platformAllows(feature)
        ? html`<button
            role="tab"
            class="seg"
            aria-selected="${this._trayActive(name)}"
            @click="${() => this._op(name)}"
            title="${label} panel (${shortcut})"
          >
            ${icon(iconName)}<span class="seg-label">${label}</span>
          </button>`
        : "";
    return html`
      <button class="icon-only" @click="${() => this._op("undo")}" title="Undo (${MOD}Z)" aria-label="Undo">
        ${icon("icons:undo")}
      </button>
      <button class="icon-only" @click="${() => this._op("redo")}" title="Redo (${MOD}⇧Z)" aria-label="Redo">
        ${icon("icons:redo")}
      </button>
      <div class="sep" aria-hidden="true"></div>
      <div class="segmented" role="tablist" aria-label="Editor panel">
        ${seg("content-add", "hax:add-brick", "Insert", `${MOD}⇧3`, "addBlock")}
        ${seg("content-edit", "image:tune", "Block", `${MOD}⇧4`)}
        ${seg("content-map", "icons:toc", "Outline", `${MOD}⇧2`, "contentMap")}
        ${seg("view-source", "hax:html-code", "Source", `${MOD}⇧1`, "viewSource")}
      </div>
    `;
  }

  _toggleSearch() {
    this.searchOpen = !this.searchOpen;
  }

  // hand the typed text to Merlin, which opens as the command dialog with
  // the query filled in; the inline field collapses back to its icon
  _searchInput(e) {
    const value = e.target.value;
    if (!value) return;
    const daemon = globalThis.SuperDaemonManager?.requestAvailability?.();
    if (daemon) {
      // runProgram + open() rather than waveWand(): waveWand renders the
      // mini popup first, and switching it to the dialog mid-filter leaves
      // the results list stuck on "Loading"
      daemon.runProgram(value, "*");
      daemon.mini = false;
      daemon.wand = false;
      daemon.open();
    }
    e.target.value = "";
    this.searchOpen = false;
  }

  _searchKeydown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      this.searchOpen = false;
      this.shadowRoot.querySelector(".search-toggle")?.focus();
    } else if (e.key === "Enter" && !e.target.value) {
      e.preventDefault();
      this.searchOpen = false;
      this._op("super-daemon-modal");
    }
  }

  _menuKeys(e) {
    const items = [...this.shadowRoot.querySelectorAll('[role="menuitem"]')];
    const i = items.indexOf(this.shadowRoot.activeElement);
    if (e.key === "Escape") {
      this.menuOpen = false;
      this.shadowRoot.querySelector(".avatar")?.focus();
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = (i + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      items[next]?.focus();
    }
  }

  updated(changed) {
    if (changed.has("searchOpen") && this.searchOpen) {
      this.shadowRoot.querySelector("#search-input")?.focus();
    }
    if (changed.has("menuOpen") && this.menuOpen) {
      this.shadowRoot.querySelector('[role="menuitem"]')?.focus();
    }
  }
}
customElements.define(OerEditorBar.tag, OerEditorBar);
export { OerEditorBar };
