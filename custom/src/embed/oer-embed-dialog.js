/**
 * `oer-embed-dialog` — embed a page in an LMS or another site, like the
 * Embed modal of learning-materials-decapcms: choose what to leave out, set
 * a starting height, copy the iframe code (or the plain link), and check
 * the live preview.
 *
 *   embedDialog().show(item)
 * @element oer-embed-dialog
 */
import { html, css, LitElement } from "../lit.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { embedUrl } from "./embed-mode.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

// what can be left out of the embedded page (query flags read by the page)
const OPTIONS = [
  { key: "hideRubric", label: "Rubric", hint: "Assessment rubrics on the page." },
  { key: "hideHeader", label: "Page header", hint: "Type, description and details under the title." },
  { key: "hideTitle", label: "Title", hint: "The page title." },
];

class OerEmbedDialog extends LitElement {
  static get tag() {
    return "oer-embed-dialog";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      _hide: { state: true },
      _height: { state: true },
      _copied: { state: true },
    };
  }

  constructor() {
    super();
    this.open = false;
    this._hide = {};
    this._height = 600;
    this._copied = "";
    this.__keys = (e) => {
      if (this.open && e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        this._close();
      }
    };
  }

  show(item) {
    this._item = item;
    this._hide = {};
    this._copied = "";
    this.open = true;
    globalThis.addEventListener("keydown", this.__keys, true);
    this.updateComplete.then(() => this.shadowRoot.querySelector("input")?.focus());
  }

  _close() {
    this.open = false;
    globalThis.removeEventListener("keydown", this.__keys, true);
  }

  get _url() {
    return embedUrl(this._item?.slug, this._hide);
  }

  get _code() {
    const title = (this._item?.title || "Embedded page").replace(/"/g, "&quot;");
    return `<iframe src="${this._url}" title="${title}" width="100%" height="${this._height}" style="border:0" allowfullscreen></iframe>`;
  }

  async _copy(what) {
    try {
      await globalThis.navigator.clipboard.writeText(what === "link" ? this._url : this._code);
      this._copied = what;
      setTimeout(() => (this._copied = ""), 2000);
    } catch {
      this.shadowRoot.querySelector("textarea")?.select();
    }
  }

  static get styles() {
    return css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: none;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      :host([open]) {
        display: grid;
        place-items: center;
      }
      .backdrop {
        position: absolute;
        inset: 0;
        background: rgb(0 0 0 / 0.5);
      }
      .dialog {
        position: relative;
        display: flex;
        flex-direction: column;
        width: min(64rem, calc(100vw - 2rem));
        height: min(44rem, calc(100dvh - 2rem));
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        overflow: hidden;
      }
      button,
      input,
      textarea {
        font: inherit;
        color: inherit;
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
      header {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        padding: 1rem 0.75rem 1rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      .heading {
        flex: 1;
      }
      h2 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
      }
      .sub {
        margin: 0.125rem 0 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .x {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .x:hover {
        background: var(--accent);
      }
      .body {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: 20rem minmax(0, 1fr);
      }
      .side {
        overflow-y: auto;
        padding: 1.25rem;
        border-right: 1px solid var(--border);
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
      h3 {
        margin: 0 0 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
      }
      .opt {
        display: flex;
        gap: 0.625rem;
        padding: 0.375rem 0;
        cursor: pointer;
      }
      .opt input {
        margin-top: 0.1875rem;
        accent-color: var(--primary);
      }
      .opt b {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
      }
      .opt span {
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      label.field {
        display: block;
        margin-bottom: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
      }
      .input {
        box-sizing: border-box;
        width: 100%;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        font-size: 0.875rem;
      }
      textarea {
        box-sizing: border-box;
        width: 100%;
        min-height: 7rem;
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--muted);
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.75rem;
        resize: vertical;
      }
      .row {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;
      }
      .btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2.25rem;
        padding: 0 0.875rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .btn.outline {
        border: 1px solid var(--input-border, var(--border));
      }
      .btn.outline:hover {
        background: var(--accent);
      }
      .hint {
        margin: 0.375rem 0 0;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .preview {
        display: flex;
        flex-direction: column;
        min-height: 0;
        padding: 1.25rem;
        background: var(--muted);
      }
      .preview iframe {
        flex: 1;
        width: 100%;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        background: var(--background);
      }
      @media (max-width: 760px) {
        .body {
          grid-template-columns: minmax(0, 1fr);
          grid-template-rows: auto minmax(16rem, 1fr);
        }
        .side {
          border-right: 0;
          border-bottom: 1px solid var(--border);
        }
      }
    `;
  }

  render() {
    if (!this.open) return html``;
    return html`
      <div class="backdrop" @click="${this._close}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${lucide("icons:open-in-new")}Embed this page</h2>
            <p class="sub">${this._item?.title} — for an LMS (Canvas resizes the frame to fit) or any website.</p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._close}">${lucide("oer:x")}</button>
        </header>
        <div class="body">
          <div class="side">
            <div>
              <h3>Leave out</h3>
              ${OPTIONS.map(
                (o) => html`<label class="opt">
                  <input type="checkbox" .checked="${!!this._hide[o.key]}" @change="${(e) => (this._hide = { ...this._hide, [o.key]: e.target.checked })}" />
                  <span><b>${o.label}</b><span>${o.hint}</span></span>
                </label>`,
              )}
            </div>
            <div>
              <label class="field" for="h">Starting height (px)</label>
              <input id="h" class="input" type="number" min="200" step="50" .value="${String(this._height)}" @input="${(e) => (this._height = Number(e.target.value) || 600)}" />
              <p class="hint">Canvas and other LTI hosts adjust it to the content automatically.</p>
            </div>
            <div>
              <label class="field" for="code">Embed code</label>
              <textarea id="code" readonly .value="${this._code}" @focus="${(e) => e.target.select()}"></textarea>
              <div class="row">
                <button class="btn primary" @click="${() => this._copy("code")}">${lucide(this._copied === "code" ? "oer:check" : "icons:content-copy")}${this._copied === "code" ? "Copied" : "Copy code"}</button>
                <button class="btn outline" @click="${() => this._copy("link")}">${lucide(this._copied === "link" ? "oer:check" : "icons:link")}${this._copied === "link" ? "Copied" : "Copy link"}</button>
              </div>
            </div>
          </div>
          <div class="preview">
            <h3>Preview</h3>
            <iframe src="${this._url}" title="Preview of the embedded page"></iframe>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define(OerEmbedDialog.tag, OerEmbedDialog);

export function embedDialog() {
  const doc = globalThis.document;
  return doc.querySelector(OerEmbedDialog.tag) || doc.body.appendChild(doc.createElement(OerEmbedDialog.tag));
}
