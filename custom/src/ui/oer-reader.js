/**
 * Reader mode: a quieter way to read through a book. The theme hides its
 * sidebar and site chrome, sets the chapter in a comfortable column, and
 * shows this bar instead of the top bar: Exit, the book and where you are
 * in it, Contents (the book's outline) and Text (size, typeface, line
 * width, line spacing, page colour). Each chapter is still a real page, so
 * links, Back, footnotes and quizzes work as usual.
 *
 *   <oer-reader-bar .book=${item} .position=${{ index, total }} .prev=${item} .next=${item}
 *     .settings=${s} @reader-exit=… @reader-settings=…></oer-reader-bar>
 *
 * Settings are each reader's own, remembered in their browser.
 * @element oer-reader-bar
 */
import { html, css, unsafeCSS, LitElement } from "../lit.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import "../outline/oer-site-nav.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

export const READER_DEFAULTS = { size: 1, font: "serif", width: "medium", spacing: "normal", colour: "light" };
const SIZES = [17, 19, 21, 24]; // px
const WIDTHS = { narrow: "60ch", medium: "68ch", wide: "80ch" };
const SPACINGS = { normal: 1.7, relaxed: 1.95 };
const FONTS = {
  serif: '"Source Serif 4", "Source Serif Pro", Georgia, Cambria, "Times New Roman", serif',
  sans: 'var(--font-sans, "Inter", system-ui, sans-serif)',
};
const SERIF_CSS = "https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400..700;1,8..60,400..700&display=swap";
const KEY = "oer-reader-settings";

export function loadReaderSettings() {
  try {
    return { ...READER_DEFAULTS, ...JSON.parse(globalThis.localStorage.getItem(KEY) || "{}") };
  } catch {
    return { ...READER_DEFAULTS };
  }
}

export function saveReaderSettings(settings) {
  try {
    globalThis.localStorage.setItem(KEY, JSON.stringify(settings));
  } catch {
    /* private window: settings last this visit */
  }
}

/** The theme's reader variables for a set of settings. */
export function readerVars(s) {
  if (s.font === "serif" && !globalThis.document.getElementById("oer-reader-serif")) {
    const link = Object.assign(globalThis.document.createElement("link"), { id: "oer-reader-serif", rel: "stylesheet", href: SERIF_CSS });
    globalThis.document.head.append(link);
  }
  return {
    "--reader-size": `${SIZES[s.size] ?? SIZES[1]}px`,
    "--reader-measure": WIDTHS[s.width] || WIDTHS.medium,
    "--reader-leading": String(SPACINGS[s.spacing] || SPACINGS.normal),
    "--reader-font": FONTS[s.font] || FONTS.serif,
  };
}

class OerReaderBar extends LitElement {
  static get tag() {
    return "oer-reader-bar";
  }

  static get properties() {
    return {
      book: { type: Object },
      position: { type: Object },
      prev: { type: Object },
      next: { type: Object },
      settings: { type: Object },
      _panel: { state: true },
    };
  }

  constructor() {
    super();
    this.book = null;
    this.position = { index: 0, total: 0 };
    this.prev = null;
    this.next = null;
    this.settings = { ...READER_DEFAULTS };
    this._panel = "";
    this.__outside = (e) => {
      if (this._panel && !e.composedPath().includes(this)) this._panel = "";
    };
    this.__keys = (e) => {
      if (e.key === "Escape" && this._panel) {
        e.stopPropagation();
        const opener = this.shadowRoot.querySelector(`[aria-controls="panel-${this._panel}"]`);
        this._panel = "";
        opener?.focus();
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    globalThis.addEventListener("pointerdown", this.__outside, true);
    globalThis.addEventListener("keydown", this.__keys, true);
  }

  disconnectedCallback() {
    globalThis.removeEventListener("pointerdown", this.__outside, true);
    globalThis.removeEventListener("keydown", this.__keys, true);
    super.disconnectedCallback();
  }

  // a chapter link in Contents closes the panel
  updated(changed) {
    if (changed.has("position") && changed.get("position")?.index !== this.position?.index) this._panel = "";
  }

  _toggle(name) {
    this._panel = this._panel === name ? "" : name;
    if (this._panel) this.updateComplete.then(() => this.shadowRoot.querySelector(`#panel-${name} [tabindex], #panel-${name} button, #panel-${name} oer-site-nav`)?.focus?.());
  }

  _set(key, value) {
    const settings = { ...this.settings, [key]: value };
    this.dispatchEvent(new CustomEvent("reader-settings", { detail: settings, bubbles: true, composed: true }));
  }

  _seg(label, key, options) {
    return html`<div class="setting">
      <span class="setting-label" id="lbl-${key}">${label}</span>
      <div class="seg" role="group" aria-labelledby="lbl-${key}">
        ${options.map(
          ([value, text, extra]) =>
            html`<button aria-pressed="${this.settings[key] === value ? "true" : "false"}" class="${extra || ""}" @click="${() => this._set(key, value)}">${text}</button>`,
        )}
      </div>
    </div>`;
  }

  // a page turn: a link to the page (the router, Back and new tabs work),
  // or a disabled button at either end of the book, so nothing moves
  _arrow(page, label, iconName) {
    return page
      ? html`<a class="arrow" href="${page.slug}" aria-label="${label}: ${page.title}" title="${label}: ${page.title}">${lucide(iconName)}</a>`
      : html`<button class="arrow" disabled aria-label="${label}">${lucide(iconName)}</button>`;
  }

  render() {
    const { index = 0, total = 0 } = this.position || {};
    const pct = total ? Math.round(((index + 1) / total) * 100) : 0;
    return html`<header class="bar" part="reader-bar">
        <div class="tools">
          <button class="btn" aria-controls="panel-contents" aria-expanded="${this._panel === "contents" ? "true" : "false"}" @click="${() => this._toggle("contents")}">
            ${lucide("oer:list")}<span class="label">Contents</span>
          </button>
          <button class="btn" aria-controls="panel-text" aria-expanded="${this._panel === "text" ? "true" : "false"}" @click="${() => this._toggle("text")}">
            <span class="aa" aria-hidden="true">Aa</span><span class="label">Text</span>
          </button>
        </div>
        <div class="where">
          ${this.book ? html`<a class="book" href="${this.book.slug}">${this.book.title}</a>` : ""}
          <nav class="turn" aria-label="Previous and next page">
            ${this._arrow(this.prev, "Previous", "oer:chevron-left")}
            ${total ? html`<span class="pos"><span class="sr">Page </span>${index + 1}<span aria-hidden="true"> / </span><span class="sr"> of </span>${total}</span>` : ""}
            ${this._arrow(this.next, "Next", "oer:chevron-right")}
          </nav>
        </div>
        <div class="tools end">
          <button class="btn exit" @click="${() => this.dispatchEvent(new CustomEvent("reader-exit", { bubbles: true, composed: true }))}">
            ${lucide("oer:x")}<span class="label">Exit reader</span>
          </button>
        </div>
        <div class="progress" role="progressbar" aria-label="How far through the book" aria-valuemin="1" aria-valuemax="${total || 1}" aria-valuenow="${index + 1}">
          <span style="width:${pct}%"></span>
        </div>
      </header>
      ${this._panel === "contents"
        ? html`<div class="panel contents" id="panel-contents" role="dialog" aria-label="Contents">
            <oer-site-nav .root="${this.book?.id || null}" .filter="${""}"></oer-site-nav>
          </div>`
        : ""}
      ${this._panel === "text"
        ? html`<div class="panel text" id="panel-text" role="dialog" aria-label="Text settings">
            ${this._seg("Text size", "size", [
              [0, "A", "s0"],
              [1, "A", "s1"],
              [2, "A", "s2"],
              [3, "A", "s3"],
            ])}
            ${this._seg("Typeface", "font", [
              ["serif", "Serif", "serif"],
              ["sans", "Sans", "sans"],
            ])}
            ${this._seg("Line width", "width", [
              ["narrow", "Narrow"],
              ["medium", "Medium"],
              ["wide", "Wide"],
            ])}
            ${this._seg("Line spacing", "spacing", [
              ["normal", "Normal"],
              ["relaxed", "Relaxed"],
            ])}
            ${this._seg("Page", "colour", [
              ["light", "Light", "c-light"],
              ["sepia", "Sepia", "c-sepia"],
              ["dark", "Dark", "c-dark"],
            ])}
            <p class="hint">Turn pages with <kbd>←</kbd> and <kbd>→</kbd>. Settings are remembered on this device.</p>
          </div>`
        : ""}`;
  }

  static get styles() {
    return css`
      :host {
        position: relative;
        display: block;
        flex: none;
        z-index: 20;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
        /* DDD justifies the theme */
        text-align: start;
      }
      .bar {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: var(--topbar-height, 3.5rem);
        padding: 0 1rem;
        border-bottom: 1px solid var(--border);
        background: var(--background);
      }
      /* the tools either side take equal room, so the book stays centred */
      .tools {
        flex: 1 1 0;
        display: flex;
        gap: 0.5rem;
      }
      .tools.end {
        justify-content: flex-end;
      }
      .where {
        flex: 0 1 auto;
        min-width: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        font-size: 0.875rem;
      }
      .book {
        overflow: hidden;
        color: inherit;
        font-weight: 600;
        text-decoration: none;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .book:hover {
        text-decoration: underline;
      }
      .turn {
        flex: none;
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .pos {
        min-width: 3.5rem;
        color: var(--muted-foreground);
        font-variant-numeric: tabular-nums;
        text-align: center;
      }
      .arrow {
        display: inline-grid;
        place-items: center;
        box-sizing: border-box;
        width: 2rem;
        height: 2rem;
        padding: 0;
        border: 1px solid var(--border);
        border-radius: var(--radius-md, 0.5rem);
        background: var(--background);
        color: inherit;
        cursor: pointer;
      }
      a.arrow:hover {
        background: var(--accent, var(--muted));
      }
      .arrow:disabled {
        color: var(--muted-foreground);
        opacity: 0.5;
        cursor: default;
      }
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        box-sizing: border-box;
        height: 2rem;
        padding: 0 0.75rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md, 0.5rem);
        background: var(--background);
        color: inherit;
        font: inherit;
        font-size: 0.875rem;
        font-weight: 500;
        white-space: nowrap;
        cursor: pointer;
      }
      .btn:hover,
      .btn[aria-expanded="true"] {
        background: var(--accent, var(--muted));
      }
      .aa {
        font-family: Georgia, serif;
        font-weight: 600;
      }
      /* how far through the book: a thin line under the bar, not animated */
      .progress {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -1px;
        height: 2px;
      }
      .progress span {
        display: block;
        height: 100%;
        background: var(--primary);
      }
      .panel {
        position: absolute;
        top: calc(var(--topbar-height, 3.5rem) + 0.5rem);
        z-index: 30;
        box-sizing: border-box;
        max-height: calc(100dvh - var(--topbar-height, 3.5rem) - 2rem);
        overflow-y: auto;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg, 0.75rem);
        background: var(--popover, var(--background));
        color: var(--popover-foreground, var(--foreground));
        box-shadow: 0 12px 32px rgb(0 0 0 / 0.18);
      }
      /* both open under their buttons, at the bar's left */
      .panel.contents {
        left: 1rem;
        width: min(24rem, calc(100vw - 2rem));
        padding: 0.5rem;
      }
      .panel.text {
        left: 1rem;
        width: min(21rem, calc(100vw - 2rem));
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.875rem;
      }
      .setting {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      .setting-label {
        font-size: 0.875rem;
        font-weight: 500;
      }
      .seg {
        display: flex;
        box-sizing: border-box;
        height: 2.25rem;
        padding: 0.1875rem;
        gap: 0.125rem;
        border-radius: var(--radius-md, 0.5rem);
        background: var(--muted);
      }
      .seg button {
        flex: 1;
        display: inline-grid;
        place-items: center;
        border: 0;
        border-radius: calc(var(--radius-md, 0.5rem) - 2px);
        background: transparent;
        color: var(--muted-foreground);
        font: inherit;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      .seg button[aria-pressed="true"] {
        background: var(--background);
        color: var(--foreground);
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
      }
      .seg .s0 {
        font-size: 0.75rem;
      }
      .seg .s1 {
        font-size: 0.9375rem;
      }
      .seg .s2 {
        font-size: 1.125rem;
      }
      .seg .s3 {
        font-size: 1.375rem;
      }
      .seg .serif {
        font-family: ${unsafeCSS(FONTS.serif)};
      }
      /* page colours show as themselves */
      .seg .c-light {
        background: #fff;
        color: #1f2328;
      }
      .seg .c-sepia {
        background: #f5ecdc;
        color: #3d2f1f;
      }
      .seg .c-dark {
        background: #16181d;
        color: #e8e6e3;
      }
      .seg .c-light,
      .seg .c-sepia,
      .seg .c-dark {
        margin: 0 0.0625rem;
        outline: 1px solid rgb(0 0 0 / 0.08);
      }
      .seg .c-light[aria-pressed="true"],
      .seg .c-sepia[aria-pressed="true"],
      .seg .c-dark[aria-pressed="true"] {
        outline: 2px solid var(--primary);
      }
      .hint {
        margin: 0;
        font-size: 0.8125rem;
        line-height: 1.5;
        color: var(--muted-foreground);
      }
      kbd {
        padding: 0 0.3125rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-sm, 0.25rem);
        background: var(--muted);
        font-family: var(--font-mono, monospace);
        font-size: 0.75rem;
      }
      :focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .lucide {
        flex: none;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
      @media (max-width: 600px) {
        .label {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip-path: inset(50%);
        }
        .btn {
          padding: 0 0.5rem;
        }
        /* the counter and arrows stay; the book's title is in Contents */
        .where .book {
          display: none;
        }
      }
    `;
  }
}

if (!customElements.get(OerReaderBar.tag)) customElements.define(OerReaderBar.tag, OerReaderBar);
