/**
 * `oer-text-editor` — a small rich text editor for text the site keeps in
 * data rather than pages: a course sequence's own pages and its module
 * overviews. Headings, bold, italic, lists and links; the value is clean
 * HTML with only those elements (pasted styling is dropped).
 *
 *   <oer-text-editor label="Overview" .value=${html}
 *     @change=${(e) => save(e.detail.value)}></oer-text-editor>
 *
 * Keyboard: ⌘/Ctrl+B bold, ⌘/Ctrl+I italic, ⌘/Ctrl+K link.
 * @element oer-text-editor
 */
import { html, css, LitElement } from "../lit.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { formControls } from "./form-controls.js";

const lucide = (name) => html`<span class="lucide" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

const BLOCKS = new Set(["P", "H3", "H4", "UL", "OL", "LI", "BLOCKQUOTE"]);
const INLINE = { STRONG: "strong", B: "strong", EM: "em", I: "em", A: "a", BR: "br", CODE: "code" };

/** Clean HTML down to paragraphs, headings, lists, links, bold and italic. */
export function cleanRichText(input) {
  const doc = new DOMParser().parseFromString(`<body>${input || ""}</body>`, "text/html");
  const out = doc.createElement("div");
  const copy = (node, into) => {
    for (const n of [...node.childNodes]) {
      if (n.nodeType === 3) {
        into.appendChild(doc.createTextNode(n.textContent));
        continue;
      }
      if (n.nodeType !== 1) continue;
      const tag = n.tagName;
      if (/^(SCRIPT|STYLE|IFRAME|OBJECT|EMBED|NOSCRIPT|TEMPLATE)$/.test(tag)) continue;
      let el = null;
      if (BLOCKS.has(tag)) el = doc.createElement(tag.toLowerCase());
      else if (tag === "H1" || tag === "H2") el = doc.createElement("h3");
      else if (/^H[5-6]$/.test(tag)) el = doc.createElement("h4");
      else if (tag === "DIV" && n.closest && into === out) el = doc.createElement("p");
      else if (INLINE[tag]) el = doc.createElement(INLINE[tag]);
      if (el && el.tagName === "A") {
        const href = n.getAttribute("href") || "";
        if (/^(https?:|mailto:|\/|[a-z0-9][\w./-]*$)/i.test(href) && !/^javascript:/i.test(href)) el.setAttribute("href", href);
        else el = null;
      }
      if (el) {
        if (el.tagName !== "BR") copy(n, el);
        into.appendChild(el);
      } else copy(n, into);
    }
  };
  copy(doc.body, out);
  // loose text at the top level goes in paragraphs; empty blocks go
  for (const n of [...out.childNodes]) {
    if (n.nodeType === 3 && n.textContent.trim()) {
      const p = doc.createElement("p");
      out.replaceChild(p, n);
      p.appendChild(n);
    } else if (n.nodeType === 3) n.remove();
  }
  for (const el of out.querySelectorAll("p, h3, h4, li")) if (!el.textContent.trim() && !el.querySelector("br")) el.remove();
  return out.innerHTML.trim();
}

class OerTextEditor extends LitElement {
  static get tag() {
    return "oer-text-editor";
  }

  static get properties() {
    return {
      value: { type: String },
      label: { type: String },
      placeholder: { type: String },
      _linking: { state: true },
    };
  }

  constructor() {
    super();
    this.value = "";
    this.label = "Text";
    this.placeholder = "";
    this._linking = false;
  }

  get _area() {
    return this.shadowRoot?.querySelector(".area");
  }

  updated(changed) {
    // take an outside value (another module, say) unless it's what's shown
    if (changed.has("value") && this._area && cleanRichText(this._area.innerHTML) !== (this.value || "")) {
      clearTimeout(this.__t);
      this._area.innerHTML = this.value || "";
    }
  }

  firstUpdated() {
    this._area.innerHTML = this.value || "";
  }

  _emit() {
    clearTimeout(this.__t);
    const value = cleanRichText(this._area.innerHTML);
    if (value === this.value) return;
    this.value = value;
    this.dispatchEvent(new CustomEvent("change", { detail: { value }, bubbles: true, composed: true }));
  }

  _input() {
    clearTimeout(this.__t);
    this.__t = setTimeout(() => this._emit(), 300);
  }

  _do(command, arg = null) {
    this._area.focus();
    globalThis.document.execCommand(command, false, arg);
    this._input();
  }

  _paste(e) {
    e.preventDefault();
    const data = e.clipboardData;
    const htmlText = data.getData("text/html");
    const clean = htmlText ? cleanRichText(htmlText) : data.getData("text/plain").split(/\n{2,}/).map((p) => `<p>${p.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>")}</p>`).join("");
    globalThis.document.execCommand("insertHTML", false, clean);
    this._input();
  }

  _keys(e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      this._startLink();
    }
  }

  _startLink() {
    const sel = this.shadowRoot.getSelection ? this.shadowRoot.getSelection() : globalThis.getSelection();
    this.__range = sel && sel.rangeCount ? sel.getRangeAt(0).cloneRange() : null;
    this._linking = true;
    this.updateComplete.then(() => this.shadowRoot.querySelector(".link-input")?.focus());
  }

  _applyLink(url) {
    this._linking = false;
    const sel = this.shadowRoot.getSelection ? this.shadowRoot.getSelection() : globalThis.getSelection();
    this._area.focus();
    if (this.__range && sel) {
      sel.removeAllRanges();
      sel.addRange(this.__range);
    }
    if (url.trim()) globalThis.document.execCommand("createLink", false, url.trim());
    this._input();
  }

  static get styles() {
    return [formControls, css`
      :host {
        display: block;
      }
      .wrap {
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        overflow: hidden;
      }
      .wrap:focus-within {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .bar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.125rem;
        padding: 0.25rem;
        border-bottom: 1px solid var(--border);
        background: var(--muted);
      }
      .bar button {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 1.875rem;
        height: 1.875rem;
        padding: 0 0.375rem;
        border-radius: var(--radius-sm);
        font-size: 0.8125rem;
        font-weight: 600;
        color: var(--foreground);
        cursor: pointer;
      }
      .bar button:hover {
        background: var(--background);
      }
      .bar button:focus-visible {
        outline: 2px solid var(--ring);
      }
      .sep {
        width: 1px;
        height: 1.25rem;
        margin: 0 0.25rem;
        background: var(--border);
      }
      .lucide {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      .link-input {
        flex: 1;
        min-width: 10rem;
        height: 1.75rem;
        padding: 0 0.5rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-sm);
        font: inherit;
        font-size: 0.8125rem;
        background: var(--background);
        color: inherit;
      }
      .area {
        min-height: 8rem;
        max-height: 28rem;
        overflow-y: auto;
        padding: 0.625rem 0.875rem;
        font-size: 0.9375rem;
        line-height: 1.55;
        outline: none;
      }
      .area:empty::before {
        content: attr(data-placeholder);
        color: var(--muted-foreground);
      }
      .area :is(h3, h4) {
        margin: 0.75rem 0 0.25rem;
      }
      .area p {
        margin: 0 0 0.5rem;
      }
      .area a {
        color: var(--link, var(--primary));
      }
    `];
  }

  render() {
    const b = (label, title, fn, content) => html`<button type="button" aria-label="${title}" title="${title}" @mousedown="${(e) => e.preventDefault()}" @click="${fn}">${content || label}</button>`;
    return html`<div class="wrap">
      <div class="bar" role="toolbar" aria-label="${this.label}: formatting">
        ${this._linking
          ? html`<input class="link-input" type="url" placeholder="https://… or a page's address" aria-label="Link address" @keydown="${(e) => {
                if (e.key === "Enter") this._applyLink(e.target.value);
                if (e.key === "Escape") {
                  e.stopPropagation();
                  this._linking = false;
                }
              }}" />
              ${b("Add", "Add the link", (e) => this._applyLink(e.currentTarget.previousElementSibling.value))} ${b("Cancel", "Cancel", () => (this._linking = false))}`
          : html`${b("P", "Paragraph", () => this._do("formatBlock", "p"))}${b("H3", "Heading", () => this._do("formatBlock", "h3"))}${b("H4", "Subheading", () => this._do("formatBlock", "h4"))}
              <span class="sep"></span>
              ${b("B", "Bold (⌘B)", () => this._do("bold"))}${b("I", "Italic (⌘I)", () => this._do("italic"), html`<i>I</i>`)}
              <span class="sep"></span>
              ${b("", "Bulleted list", () => this._do("insertUnorderedList"), lucide("oer:list"))}${b("", "Numbered list", () => this._do("insertOrderedList"), lucide("oer:list-ordered"))}
              <span class="sep"></span>
              ${b("", "Link (⌘K)", () => this._startLink(), lucide("icons:link"))}${b("", "Remove the link", () => this._do("unlink"), lucide("oer:unlink"))}`}
      </div>
      <div
        class="area"
        contenteditable="true"
        role="textbox"
        aria-multiline="true"
        aria-label="${this.label}"
        data-placeholder="${this.placeholder}"
        @input="${this._input}"
        @blur="${this._emit}"
        @paste="${this._paste}"
        @keydown="${this._keys}"
      ></div>
    </div>`;
  }
}
customElements.define(OerTextEditor.tag, OerTextEditor);
