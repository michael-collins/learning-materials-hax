/**
 * Reader mode: a quieter way to read through a book. The theme hides its
 * sidebar and site chrome, sets the chapter in a comfortable column, and
 * shows this bar instead of the top bar: Exit, the book and where you are
 * in it, Contents (the book's outline) and Text (size, typeface, line
 * width, line spacing, page colour, texture). Each chapter is still a real page, so
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

export const READER_DEFAULTS = { size: 1, font: "serif", width: "medium", spacing: "normal", colour: "light", texture: false, textureStrength: 1 };
const SIZES = [17, 19, 21, 24]; // px
const WIDTHS = { narrow: "60ch", medium: "68ch", wide: "80ch" };
const SPACINGS = { normal: 1.7, relaxed: 1.95 };
const FONTS = {
  serif: '"Source Serif 4", "Source Serif Pro", Georgia, Cambria, "Times New Roman", serif',
  sans: 'var(--font-sans, "Inter", system-ui, sans-serif)',
};
const SERIF_CSS = "https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400..700;1,8..60,400..700&display=swap";
const KEY = "oer-reader-settings";

// Texture: a fine paper grain over any page colour, drawn by SVG noise (no
// image file), each page with its own: a cool grain on Light, neutral on
// Paper, warm on Sepia, light specks on Dark (tuned in nu-hax's
// tools/reader-grain-tuner.html). Readers can make it fainter or stronger
// for their screen, up to the strength where every page still keeps AA
// contrast on the grain's worst pixel, measured at 1x, 2x and 3x: 150% on
// the light pages, and Dark only fainter (its muted text is at 4.6:1 at full
// strength on a phone)
const FILTERS = {
  light: { rgb: [0.235, 0.282, 0.349], alpha: 0.27, offset: -0.119, baseFrequency: 0.61, numOctaves: 3 },
  paper: { rgb: [0.302, 0.302, 0.302], alpha: 0.34, offset: -0.167, baseFrequency: 0.66, numOctaves: 4 },
  sepia: { rgb: [0.361, 0.302, 0.2], alpha: 0.34, offset: -0.115, baseFrequency: 0.75, numOctaves: 2 },
  dark: { rgb: [0.922, 0.902, 0.859], alpha: 0.32, offset: -0.16, baseFrequency: 0.88, numOctaves: 3 },
};
const STRENGTH_MIN = 0.25;
export const STRENGTH_MAX = { light: 1.5, paper: 1.5, sepia: 1.5, dark: 1 };
const grain = ({ rgb, alpha, offset, baseFrequency, numOctaves }) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>" +
      `<filter id='g' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='${numOctaves}' seed='5' stitchTiles='stitch'/>` +
      `<feColorMatrix values='0 0 0 0 ${rgb[0]} 0 0 0 0 ${rgb[1]} 0 0 0 0 ${rgb[2]} ${alpha} 0 0 0 ${offset}'/></filter>` +
      "<rect width='100%' height='100%' filter='url(#g)'/></svg>",
  )}")`;

/** A page colour's strength, kept within its limits. */
export const textureStrength = (colour, strength = 1) => Math.min(Math.max(Number(strength) || 1, STRENGTH_MIN), STRENGTH_MAX[colour] ?? 1);

// strength scales the specks' opacity (alpha and offset together)
const textureCache = new Map();
export function textureFor(colour, strength = 1) {
  const f = FILTERS[colour];
  if (!f) return "";
  const m = textureStrength(colour, strength);
  const key = `${colour}:${m}`;
  if (!textureCache.has(key)) textureCache.set(key, grain({ ...f, alpha: +(f.alpha * m).toFixed(4), offset: +(f.offset * m).toFixed(4) }));
  return textureCache.get(key);
}

export function loadReaderSettings() {
  try {
    const stored = JSON.parse(globalThis.localStorage.getItem(KEY) || "{}");
    // Paper came textured before Texture was its own setting
    if (stored.colour === "paper" && !("texture" in stored)) stored.texture = true;
    return { ...READER_DEFAULTS, ...stored };
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

/** The theme's reader variables for a set of settings (page colour resolved). */
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
    "--reader-texture": s.texture ? textureFor(s.colour, s.textureStrength) : "",
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

  _seg(label, key, options, cls = "") {
    return html`<div class="setting">
      <span class="setting-label" id="lbl-${key}">${label}</span>
      <div class="seg ${cls}" role="group" aria-labelledby="lbl-${key}">
        ${options.map(
          ([value, text, extra, style]) =>
            html`<button aria-pressed="${this.settings[key] === value ? "true" : "false"}" class="${extra || ""}" style="${style || ""}" @click="${() => this._set(key, value)}">${text}</button>`,
        )}
      </div>
    </div>`;
  }

  // texture strength, for screens that show the grain lighter or heavier:
  // up to the page's limit for AA contrast (Dark only fainter)
  _renderStrength() {
    const colour = this.settings.colour;
    const max = Math.round((STRENGTH_MAX[colour] ?? 1) * 100);
    const value = Math.round(textureStrength(colour, this.settings.textureStrength) * 100);
    return html`<div class="setting">
      <span class="setting-label row"><label for="texture-strength">Texture strength</label><output for="texture-strength">${value}%</output></span>
      <input
        id="texture-strength"
        class="range"
        type="range"
        min="25"
        max="${max}"
        step="5"
        .value="${String(value)}"
        aria-valuetext="${value}%"
        @input="${(e) => this._set("textureStrength", Number(e.target.value) / 100)}"
      />
      ${max <= 100 ? html`<span class="hint">On Dark it can only be fainter, so text keeps its contrast.</span>` : ""}
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
            ${this._seg(
              "Page",
              "colour",
              // each swatch shows its page's grain, at the reader's strength
              ["light", "paper", "sepia", "dark"].map((c) => [
                c,
                c[0].toUpperCase() + c.slice(1),
                `c-${c}`,
                this.settings.texture ? `background-image: ${textureFor(c, this.settings.textureStrength)}` : "",
              ]),
            )}
            <div class="setting row">
              <span class="setting-label" id="lbl-texture">Texture</span>
              <button
                class="switch"
                role="switch"
                aria-checked="${this.settings.texture ? "true" : "false"}"
                aria-labelledby="lbl-texture"
                @click="${() => this._set("texture", !this.settings.texture)}"
              >
                <span class="knob"></span>
              </button>
            </div>
            ${this.settings.texture ? this._renderStrength() : ""}
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
        background-color: var(--background);
        background-image: var(--reader-texture, none);
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
      /* page colours show as themselves, with the texture when it's on */
      .seg .c-light {
        background: #fff;
        color: #1f2328;
      }
      .seg .c-paper {
        background: #f8f5ec;
        color: #2f2a22;
      }
      .seg .c-sepia {
        background: #f6efe1;
        color: #3a2e20;
      }
      .seg .c-dark {
        background: #16181d;
        color: #e3e1dc;
      }
      .seg :is(.c-light, .c-paper, .c-sepia, .c-dark) {
        margin: 0 0.0625rem;
        outline: 1px solid rgb(0 0 0 / 0.08);
      }
      .seg :is(.c-light, .c-paper, .c-sepia, .c-dark)[aria-pressed="true"] {
        outline: 2px solid var(--primary);
      }
      .setting-label.row {
        display: flex;
        justify-content: space-between;
        gap: 0.5rem;
      }
      .setting-label output {
        color: var(--muted-foreground);
        font-variant-numeric: tabular-nums;
      }
      .range {
        width: 100%;
        margin: 0;
        accent-color: var(--primary);
      }
      /* Texture: shadcn Switch; the track's outline meets 3:1 when off */
      .setting.row {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
      .switch {
        position: relative;
        flex: none;
        box-sizing: border-box;
        width: 2.25rem;
        height: 1.25rem;
        padding: 0;
        border: 1px solid var(--input-border, var(--border));
        border-radius: 999px;
        background: var(--muted);
        cursor: pointer;
      }
      .switch[aria-checked="true"] {
        border-color: var(--primary);
        background: var(--primary);
      }
      .switch .knob {
        position: absolute;
        top: 0.0625rem;
        left: 0.0625rem;
        width: 1rem;
        height: 1rem;
        border-radius: 999px;
        background: var(--background);
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.2);
      }
      .switch[aria-checked="true"] .knob {
        left: auto;
        right: 0.0625rem;
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
