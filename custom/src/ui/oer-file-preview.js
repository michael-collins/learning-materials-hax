/**
 * `oer-file-preview` — look at a page's files before downloading them: a
 * lightbox for images, and in-page viewers for PDF, video, audio, text, 3D
 * models (model-viewer) and Word documents (converted to HTML). Other files
 * get a plain panel with the download button. ←/→ step through the list,
 * Esc closes.
 *
 *   filePreview().show(files, index)   // files: [{ title, url, description, alt }]
 * @element oer-file-preview
 */
import { html, css, LitElement } from "../lit.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { loadModelViewer } from "../blocks/oer-embed-blocks.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

const KINDS = {
  image: ["png", "jpg", "jpeg", "gif", "webp", "svg", "avif"],
  pdf: ["pdf"],
  video: ["mp4", "webm", "mov", "m4v", "ogv"],
  audio: ["mp3", "wav", "ogg", "oga", "m4a", "aac", "flac"],
  text: ["txt", "md", "csv", "tsv", "json", "xml", "yml", "yaml", "js", "mjs", "ts", "css", "html", "py", "c", "cpp", "h", "java", "glsl", "srt", "vtt"],
  model: ["glb", "gltf"],
  docx: ["docx"],
};
const TEXT_LIMIT = 200_000; // characters shown for text files
const MAMMOTH = "https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js";

export const extOf = (url) => String(url || "").split(/[?#]/)[0].split("/").pop().split(".").slice(1).pop()?.toLowerCase() || "";

/** "image", "pdf", "video", "audio", "text", "model", "docx", or "" (no preview). */
export function previewKind(url) {
  const ext = extOf(url);
  return Object.keys(KINDS).find((k) => KINDS[k].includes(ext)) || "";
}

const isExternal = (url) => /^https?:\/\//i.test(url) && !url.startsWith(globalThis.location.origin);

let mammothLoading = null;
function loadMammoth() {
  if (globalThis.mammoth) return Promise.resolve(globalThis.mammoth);
  mammothLoading ||= new Promise((resolve, reject) => {
    const s = Object.assign(globalThis.document.createElement("script"), { src: MAMMOTH, async: true });
    s.onload = () => resolve(globalThis.mammoth);
    s.onerror = () => {
      mammothLoading = null;
      reject(new Error("Could not load the Word document viewer"));
    };
    globalThis.document.head.append(s);
  });
  return mammothLoading;
}

class OerFilePreview extends LitElement {
  static get tag() {
    return "oer-file-preview";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      _index: { state: true },
      _body: { state: true }, // loaded text / converted HTML / error
    };
  }

  constructor() {
    super();
    this.open = false;
    this._files = [];
    this._index = 0;
    this.__keys = (e) => {
      if (!this.open) return;
      if (e.key === "Escape") this._close();
      else if (e.key === "ArrowRight" && this._files.length > 1 && !this._typing(e)) this._go(1);
      else if (e.key === "ArrowLeft" && this._files.length > 1 && !this._typing(e)) this._go(-1);
      else if (e.key === "Tab") this._trapFocus(e);
      else return;
      if (e.key !== "Tab") {
        e.preventDefault();
        e.stopPropagation();
      }
    };
  }

  show(files, index = 0) {
    this._files = (files || []).filter((f) => f?.url);
    if (!this._files.length) return;
    this._returnFocus = globalThis.document.activeElement;
    this.open = true;
    this._load(Math.max(0, Math.min(index, this._files.length - 1)));
    globalThis.addEventListener("keydown", this.__keys, true);
    this.updateComplete.then(() => this.shadowRoot.querySelector(".x")?.focus());
  }

  _close() {
    this.open = false;
    this._body = null;
    globalThis.removeEventListener("keydown", this.__keys, true);
    this._returnFocus?.focus?.();
  }

  _typing(e) {
    return e.composedPath().some((n) => n?.localName === "model-viewer" || n?.localName === "video" || n?.localName === "audio");
  }

  _trapFocus(e) {
    const items = [...this.shadowRoot.querySelectorAll("button, a[href], video, audio, iframe, model-viewer")].filter((el) => !el.disabled);
    if (!items.length) return;
    const active = this.shadowRoot.activeElement;
    const i = items.indexOf(active);
    if (e.shiftKey && i <= 0) {
      e.preventDefault();
      items.at(-1).focus();
    } else if (!e.shiftKey && i === items.length - 1) {
      e.preventDefault();
      items[0].focus();
    }
  }

  _go(step) {
    this._load((this._index + step + this._files.length) % this._files.length);
  }

  async _load(index) {
    this._index = index;
    this._body = null;
    const file = this._files[index];
    const kind = previewKind(file.url);
    const token = (this.__token = {});
    try {
      if (kind === "model") loadModelViewer();
      if (kind === "text") {
        const res = await fetch(file.url);
        if (!res.ok) throw new Error(`Could not load the file (${res.status})`);
        const text = await res.text();
        if (token === this.__token) this._body = { text: text.length > TEXT_LIMIT ? `${text.slice(0, TEXT_LIMIT)}\n…` : text, cut: text.length > TEXT_LIMIT };
      }
      if (kind === "docx") {
        const [mammoth, buf] = await Promise.all([
          loadMammoth(),
          fetch(file.url).then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(`Could not load the file (${r.status})`)))),
        ]);
        const out = await mammoth.convertToHtml({ arrayBuffer: buf });
        if (token === this.__token) this._body = { html: out.value };
      }
    } catch (err) {
      if (token === this.__token) this._body = { error: err.message || String(err) };
    }
  }

  static get styles() {
    return css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10001;
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
        background: rgb(0 0 0 / 0.75);
      }
      .dialog {
        position: relative;
        display: flex;
        flex-direction: column;
        width: min(72rem, calc(100vw - 2rem));
        height: min(48rem, calc(100dvh - 2rem));
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.3);
        overflow: hidden;
      }
      button,
      a {
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
        align-items: center;
        gap: 0.5rem;
        padding: 0.625rem 0.625rem 0.625rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      .heading {
        flex: 1;
        min-width: 0;
      }
      h2 {
        margin: 0;
        font-size: 0.9375rem;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .sub {
        margin: 0.125rem 0 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btn,
      .x,
      .nav {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.375rem;
        height: 2.25rem;
        border-radius: var(--radius-md);
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 500;
      }
      .btn {
        padding: 0 0.875rem;
        border: 1px solid var(--input-border, var(--border));
      }
      .btn.primary {
        border-color: transparent;
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .x {
        width: 2.25rem;
        color: var(--muted-foreground);
      }
      .btn:not(.primary):hover,
      .x:hover {
        background: var(--accent);
      }
      .btn:focus-visible,
      .x:focus-visible,
      .nav:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .stage {
        position: relative;
        flex: 1;
        min-height: 0;
        display: grid;
        place-items: center;
        background: color-mix(in srgb, var(--muted) 60%, var(--background));
      }
      .stage img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
      .stage iframe,
      .stage model-viewer {
        width: 100%;
        height: 100%;
        border: 0;
        background: var(--background);
      }
      .stage video {
        max-width: 100%;
        max-height: 100%;
      }
      .stage audio {
        width: min(32rem, 90%);
      }
      .doc,
      pre {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        margin: 0;
        overflow: auto;
        background: var(--background);
      }
      pre {
        padding: 1rem 1.25rem;
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.8125rem;
        line-height: 1.55;
        white-space: pre-wrap;
        word-break: break-word;
      }
      .doc {
        padding: 1.5rem clamp(1rem, 6vw, 4rem);
        font-size: 0.9375rem;
        line-height: 1.65;
        text-align: start;
      }
      .doc img {
        max-width: 100%;
        height: auto;
      }
      .doc h1 {
        font-size: 1.25rem;
      }
      .doc h2 {
        font-size: 1.125rem;
      }
      .doc h3,
      .doc h4 {
        font-size: 1rem;
      }
      .doc :is(h1, h2, h3, h4) {
        margin: 1.5em 0 0.5em;
        line-height: 1.3;
      }
      .doc table {
        width: 100%;
        border-collapse: collapse;
        margin: 0.5rem 0 1rem;
      }
      .doc td,
      .doc th {
        border: 1px solid var(--border);
        padding: 0.375rem 0.625rem;
        height: 1.75rem;
        vertical-align: top;
      }
      .note {
        display: grid;
        justify-items: center;
        gap: 0.75rem;
        padding: 2rem;
        text-align: center;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      .note .big {
        width: 2rem;
        height: 2rem;
      }
      .nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 999px;
        background: var(--background);
        border: 1px solid var(--border);
        box-shadow: 0 1px 3px rgb(0 0 0 / 0.15);
      }
      .nav.prev {
        left: 0.75rem;
      }
      .nav.next {
        right: 0.75rem;
      }
      .nav:hover {
        background: var(--accent);
      }
      footer {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.625rem 1.25rem;
        border-top: 1px solid var(--border);
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      footer .desc {
        flex: 1;
        min-width: 0;
      }
      @media (max-width: 480px) {
        header .btn .label {
          display: none;
        }
      }
    `;
  }

  _renderStage(file) {
    const kind = previewKind(file.url);
    const body = this._body;
    const name = file.title || file.url.split("/").pop();
    if (body?.error) return html`<div class="note">${lucide("icons:error", "big")}<span>${body.error}</span></div>`;
    switch (kind) {
      case "image":
        return html`<img src="${file.url}" alt="${file.alt || name}" />`;
      case "pdf":
        return html`<iframe src="${file.url}" title="${name}" credentialless referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
      case "video":
        return html`<video src="${file.url}" controls preload="metadata" aria-label="${name}"></video>`;
      case "audio":
        return html`<audio src="${file.url}" controls preload="metadata" aria-label="${name}"></audio>`;
      case "model":
        return html`<model-viewer src="${file.url}" alt="${file.alt || name}" camera-controls touch-action="pan-y" shadow-intensity="1"></model-viewer>`;
      case "text":
        return body ? html`<pre tabindex="0" aria-label="${name}">${body.text}</pre>` : html`<div class="note">Loading…</div>`;
      case "docx":
        return body
          ? html`<div class="doc" tabindex="0" aria-label="${name}" .innerHTML="${body.html}"></div>`
          : html`<div class="note">Converting the document…</div>`;
      default:
        return html`<div class="note">
          ${lucide("icons:insert-drive-file", "big")}
          <span>No preview for ${extOf(file.url) ? `.${extOf(file.url)} files` : "this link"}. Download it to open it.</span>
        </div>`;
    }
  }

  render() {
    if (!this.open) return html``;
    const file = this._files[this._index];
    if (!file) return html``;
    const name = file.title || file.url.split("/").pop();
    const external = isExternal(file.url);
    const many = this._files.length > 1;
    return html`
      <div class="backdrop" @click="${this._close}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${name}</h2>
            <p class="sub">${extOf(file.url).toUpperCase() || "Link"}${many ? ` · ${this._index + 1} of ${this._files.length}` : ""}</p>
          </div>
          <a class="btn" href="${file.url}" target="_blank" rel="noopener noreferrer" title="Open in a new tab">${lucide("icons:open-in-new")}<span class="label">Open</span></a>
          ${external
            ? ""
            : html`<a class="btn primary" href="${file.url}" download>${lucide("icons:file-download")}<span class="label">Download</span></a>`}
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._close}">${lucide("oer:x")}</button>
        </header>
        <div class="stage">
          ${this._renderStage(file)}
          ${many
            ? html`<button class="nav prev" aria-label="Previous file" title="Previous (←)" @click="${() => this._go(-1)}">${lucide("oer:chevron-left")}</button>
                <button class="nav next" aria-label="Next file" title="Next (→)" @click="${() => this._go(1)}">${lucide("oer:chevron-right")}</button>`
            : ""}
        </div>
        ${file.description || this._body?.cut
          ? html`<footer><span class="desc">${file.description || ""}</span>${this._body?.cut ? html`<span>Showing the start of the file.</span>` : ""}</footer>`
          : ""}
      </div>
    `;
  }
}
customElements.define(OerFilePreview.tag, OerFilePreview);

export function filePreview() {
  const doc = globalThis.document;
  return doc.querySelector(OerFilePreview.tag) || doc.body.appendChild(doc.createElement(OerFilePreview.tag));
}
