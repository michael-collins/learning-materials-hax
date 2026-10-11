/**
 * `oer-image-field` — an image field for forms such as Page details: a
 * preview, Upload (or drop a file on it), Choose one of the site's images,
 * or paste an address; and the image's description (alt text), which every
 * image field keeps beside it (`image` + `imageAlt`).
 *
 *   <oer-image-field field-id="f-image" label="Image" .value="${url}" .alt="${alt}"
 *     @image-change="${(e) => set(e.detail.value, e.detail.alt)}"></oer-image-field>
 *
 * The label is the host's (a <label> or span pointing at `field-id`); this
 * draws the control under it. `compact` leaves out the preview, for places
 * that show the image themselves. `decoration` adds "It's decoration" under
 * the description (`decorative`, in image-change's detail too), for images
 * that readers' screen readers should pass over.
 *
 * Every control is a button the keyboard reaches (Upload opens the file
 * picker). Choose from site and Use an address open their panel with focus
 * in it, scrolled into view; Esc closes it again, focus back on the button
 * that opened it (and goes no further, so a popover or dialog around the
 * field stays open). flush() puts an address typed and not yet committed
 * (it commits on change: Enter, or focus leaving it) into the value.
 * @element oer-image-field
 */
import { html, css, LitElement } from "../lit.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { uploadFile } from "../types/relations.js";
import { formControls } from "./form-controls.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

const fileName = (url) => decodeURIComponent(String(url || "").split(/[?#]/)[0].split("/").pop() || "");

// the site's images (HAXcms GET /x/api/v1/files), newest first, fetched once a page load
let siteImages = null;
async function loadSiteImages() {
  if (siteImages) return siteImages;
  const headers = {};
  if (store.jwt) headers.Authorization = `Bearer ${store.jwt}`;
  const res = await fetch(new URL("x/api/v1/files?filter.type=image&page.limit=500", globalThis.document.baseURI), { headers, credentials: "same-origin" });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.data?.message || `The site's images couldn't be listed (${res.status}).`);
  siteImages = (json?.data?.files || []).sort((a, b) => (b.dateCreated || 0) - (a.dateCreated || 0));
  return siteImages;
}

class OerImageField extends LitElement {
  static get tag() {
    return "oer-image-field";
  }

  static get properties() {
    return {
      value: { type: String },
      alt: { type: String },
      fieldId: { type: String, attribute: "field-id" },
      label: { type: String },
      compact: { type: Boolean },
      decoration: { type: Boolean },
      decorative: { type: Boolean },
      _uploading: { state: true },
      _error: { state: true },
      _broken: { state: true },
      _choosing: { state: true },
      _images: { state: true },
      _filter: { state: true },
      _byAddress: { state: true },
      _dragging: { state: true },
    };
  }

  constructor() {
    super();
    this.value = "";
    this.alt = "";
    this.fieldId = "";
    this.label = "Image";
    this.compact = false;
    this.decoration = false;
    this.decorative = false;
    this._uploading = false;
    this._error = "";
    this._broken = false;
    this._choosing = false;
    this._images = null;
    this._filter = "";
    this._byAddress = false;
    this._dragging = false;
  }

  willUpdate(changed) {
    if (changed.has("value")) this._broken = false;
  }

  /** Focus its first control (a dialog focusing its field, or a popover opening it). */
  focus(options) {
    this.shadowRoot?.querySelector("button, input:not([type=file]), select, textarea, [tabindex]")?.focus(options);
  }

  /** Focus the image's description (there is one only once there's an image). Returns whether it could. */
  focusDescription(options) {
    const input = this.shadowRoot?.querySelector(".alt input");
    input?.focus(options);
    return !!input;
  }

  /** An address typed and not yet committed (no Enter, focus still in it) goes into the value now. */
  flush() {
    const input = this.shadowRoot?.querySelector("input.address");
    if (input && input.value.trim() !== (this.value || "")) this._emit(input.value.trim());
  }

  // a panel opened (the chooser, the address): focus in it, and in view
  async _reveal(selector) {
    await this.updateComplete;
    const el = this.shadowRoot.querySelector(selector);
    if (!el) return;
    el.focus();
    // (an address there already: typing replaces it)
    if (el.matches("input.address")) el.select();
    (el.closest(".chooser") || el).scrollIntoView({ block: "nearest" });
  }

  // Esc in a panel closes it, focus back on its button, and goes no further
  _panelKeys(e) {
    if (e.key !== "Escape" || e.isComposing) return;
    const inChooser = !!e.composedPath().find((n) => n.classList?.contains("chooser"));
    const inAddress = e.composedPath()[0]?.classList?.contains("address") && this._byAddress;
    if (!inChooser && !inAddress) return;
    e.preventDefault();
    e.stopPropagation();
    if (inChooser) this._choosing = false;
    else this._byAddress = false;
    this.updateComplete.then(() => this.shadowRoot.querySelector(inChooser ? ".choose" : ".by-address")?.focus());
  }

  _toggleAddress() {
    this._byAddress = !this._byAddress;
    if (this._byAddress) this._reveal("input.address");
  }

  // an address typed in: the image, and (the address field giving way to
  // the image's description) focus on to that
  _byAddressChange(e) {
    // (the event's target reads null once it has been dispatched)
    const input = e.target;
    const had = this.shadowRoot.activeElement === input;
    // (an address given: the field gives way to the description)
    if (input.value.trim()) this._byAddress = false;
    this._emit(input.value.trim());
    if (had) this.updateComplete.then(() => !input.isConnected && this.shadowRoot.querySelector(".alt input")?.focus());
  }

  _emit(value, alt = this.alt, decorative = this.decorative) {
    this.value = value;
    this.alt = alt;
    this.decorative = !!decorative;
    this.dispatchEvent(new CustomEvent("image-change", { detail: { value, alt, decorative: this.decorative } }));
  }

  async _upload(file) {
    if (!file) return;
    if (!/^image\//.test(file.type)) {
      this._error = `${file.name} isn't an image. Choose a PNG, JPEG, GIF, WebP, AVIF or SVG file.`;
      return;
    }
    this._uploading = true;
    this._error = "";
    try {
      const url = await uploadFile(file);
      if (!url) throw new Error("The upload didn't return an address.");
      siteImages = null; // the list now has one more
      this._choosing = false;
      this._emit(url);
    } catch (err) {
      this._error = `Upload stopped: ${err.message || err}`;
    } finally {
      this._uploading = false;
    }
  }

  async _openChooser() {
    this._choosing = !this._choosing;
    if (!this._choosing) return;
    this._error = "";
    try {
      this._images = await loadSiteImages();
    } catch (err) {
      this._images = [];
      this._error = err.message;
    }
    this._reveal(".chooser input");
  }

  // a file dropped here is this field's, not the editor's (HAX inserts dropped files as blocks)
  _drop(e) {
    e.preventDefault();
    e.stopPropagation();
    this._dragging = false;
    this._upload(e.dataTransfer?.files?.[0]);
  }

  _renderChooser() {
    const q = this._filter.trim().toLowerCase();
    const list = (this._images || []).filter((f) => !q || f.name.toLowerCase().includes(q));
    return html`<div class="chooser">
      <div class="chooser-head">
        <label class="search">
          ${lucide("icons:search", "sm")}
          <input type="search" placeholder="Search the site's images" aria-label="Search the site's images" .value="${this._filter}" @input="${(e) => (this._filter = e.target.value)}" />
        </label>
        <button type="button" class="btn ghost" @click="${() => (this._choosing = false)}">Close</button>
      </div>
      ${this._images === null
        ? html`<p class="muted">Loading the site's images…</p>`
        : list.length
          ? html`<ul class="grid" aria-label="The site's images">
              ${list.map(
                (f) => html`<li>
                  <button type="button" class="thumb ${f.url === this.value ? "current" : ""}" aria-pressed="${f.url === this.value ? "true" : "false"}" title="${f.name}" @click="${() => ((this._choosing = false), this._emit(f.url))}">
                    <img src="${f.url}" alt="" loading="lazy" />
                    <span class="thumb-name">${f.name}</span>
                  </button>
                </li>`,
              )}
            </ul>`
          : html`<p class="muted">${q ? "No image matches." : "The site has no images yet. Upload one."}</p>`}
    </div>`;
  }

  render() {
    const v = this.value || "";
    const busy = this._uploading;
    // (a button the keyboard reaches, opening the file input's picker)
    const upload = html`<button type="button" class="btn outline" aria-disabled="${busy ? "true" : "false"}" @click="${() => !busy && this.shadowRoot.querySelector("input[type=file]")?.click()}">
        ${lucide("oer:upload", "sm")}${busy ? "Uploading…" : v ? "Replace" : "Upload"}
      </button>
      <input type="file" accept="image/*" hidden tabindex="-1" @change="${(e) => (this._upload(e.target.files?.[0]), (e.target.value = ""))}" />`;
    const choose = html`<button type="button" class="btn outline choose" aria-expanded="${this._choosing ? "true" : "false"}" @click="${this._openChooser}">
      ${lucide("oer:files", "sm")}Choose from site
    </button>`;
    const byAddress = html`<button type="button" class="btn ghost by-address" aria-expanded="${this._byAddress ? "true" : "false"}" @click="${this._toggleAddress}">
      ${lucide("oer:link", "sm")}Use an address
    </button>`;
    const remove = html`<button type="button" class="btn ghost danger" @click="${() => this._emit("", "")}">${lucide("oer:x", "sm")}Remove</button>`;
    return html`
      <div
        class="field ${this._dragging ? "dragging" : ""}"
        @dragover="${(e) => (e.preventDefault(), e.stopPropagation(), (this._dragging = true))}"
        @dragleave="${() => (this._dragging = false)}"
        @drop="${this._drop}"
        @keydown="${this._panelKeys}"
      >
        ${v && this.compact
          ? html`<div class="actions">${upload}${choose}${byAddress}${remove}</div>`
          : v
          ? html`<div class="current">
              <div class="preview">
                ${this._broken
                  ? html`<span class="missing">${lucide("oer:circle-alert")}No image at this address</span>`
                  : html`<img src="${v}" alt="${this.alt || ""}" @error="${() => (this._broken = true)}" />`}
              </div>
              <div class="side">
                <span class="name" title="${v}">${fileName(v)}</span>
                <div class="actions">${upload}${choose}${byAddress}${remove}</div>
              </div>
            </div>`
          : html`<div class="empty">
              <span class="drop-hint">${lucide("oer:upload")}${busy ? "Uploading…" : "Drop an image here, or"}</span>
              <div class="actions">${upload}${choose}${byAddress}</div>
            </div>`}
        ${this._byAddress || this._broken
          ? html`<input
              class="input address"
              id="${this.fieldId}"
              type="text"
              placeholder="files/picture.jpg or https://…"
              aria-label="${this.label} address"
              .value="${v}"
              @change="${(e) => this._byAddressChange(e)}"
            />`
          : ""}
        ${this._choosing ? this._renderChooser() : ""}
        ${this._error ? html`<p class="err" role="alert">${this._error}</p>` : ""}
        ${v
          ? html`<label class="alt">
                <span class="alt-label">Description (alt text)</span>
                <input class="input" type="text" .value="${this.alt || ""}" ?disabled="${this.decoration && this.decorative}" @input="${(e) => this._emit(v, e.target.value)}" />
                <span class="hint"
                  >${this.decoration && this.decorative
                    ? "Screen readers pass over a picture that's decoration."
                    : `What the image shows, for people who can't see it.${this.decoration ? "" : " Leave it empty only if the image is decoration."}`}</span
                >
              </label>
              ${this.decoration
                ? html`<label class="check">
                    <input type="checkbox" .checked="${!!this.decorative}" @change="${(e) => this._emit(v, this.alt, e.target.checked)}" />
                    <span>It's decoration</span>
                  </label>`
                : ""}`
          : ""}
      </div>
    `;
  }

  static get styles() {
    return [
      formControls,
      css`
        :host {
          display: block;
          font-family: var(--font-sans, system-ui, sans-serif);
          color: var(--foreground);
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
          border-radius: var(--radius-md);
        }
        .field.dragging {
          outline: 2px dashed var(--ring);
          outline-offset: 4px;
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
        .lucide.sm {
          width: 0.875rem;
          height: 0.875rem;
        }
        .empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.625rem;
          padding: 1.25rem 1rem;
          border: 1px dashed var(--input-border, var(--border));
          border-radius: var(--radius-md);
          background: var(--muted);
        }
        .drop-hint {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--muted-foreground);
        }
        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }
        .current {
          display: flex;
          gap: 0.875rem;
          align-items: flex-start;
        }
        .preview {
          flex: none;
          display: grid;
          place-items: center;
          width: 9rem;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--muted);
        }
        .preview img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .missing {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 0.5rem;
          font-size: 0.75rem;
          text-align: center;
          color: var(--destructive);
        }
        .side {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 0;
        }
        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.8125rem;
          color: var(--muted-foreground);
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          height: 2rem;
          padding: 0 0.625rem;
          border: 1px solid transparent;
          border-radius: var(--radius-md);
          background: var(--background);
          font: inherit;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--foreground);
          cursor: pointer;
        }
        .btn.outline {
          border-color: var(--input-border, var(--border));
        }
        .btn.ghost {
          background: none;
        }
        .btn:hover {
          background: var(--accent);
        }
        .btn.danger {
          color: var(--destructive);
        }
        .btn[aria-disabled="true"] {
          opacity: 0.6;
          cursor: progress;
        }
        .btn:focus-visible,
        .thumb:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
        }
        .input {
          box-sizing: border-box;
          width: 100%;
          height: 2.25rem;
          padding: 0 0.75rem;
          border: 1px solid var(--input-border, var(--border));
          border-radius: var(--radius-md);
          background: var(--background);
          font: inherit;
          font-size: 0.875rem;
          color: var(--foreground);
        }
        .check {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          cursor: pointer;
        }
        .input:disabled {
          opacity: 0.6;
        }
        .alt {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .alt-label {
          font-size: 0.8125rem;
          font-weight: 500;
        }
        .hint,
        .muted {
          margin: 0;
          font-size: 0.8125rem;
          line-height: 1.5;
          color: var(--muted-foreground);
        }
        .err {
          margin: 0;
          font-size: 0.8125rem;
          color: var(--destructive);
        }
        .chooser {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--popover, var(--background));
        }
        .chooser-head {
          display: flex;
          gap: 0.5rem;
        }
        .search {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          height: 2rem;
          padding: 0 0.625rem;
          border: 1px solid var(--input-border, var(--border));
          border-radius: var(--radius-md);
          color: var(--muted-foreground);
        }
        .search:focus-within {
          outline: 2px solid var(--ring);
          outline-offset: 1px;
        }
        .search input {
          flex: 1;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          font: inherit;
          font-size: 0.8125rem;
          color: var(--foreground);
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(6.5rem, 1fr));
          gap: 0.5rem;
          max-height: 16rem;
          margin: 0;
          padding: 0.125rem;
          overflow-y: auto;
          list-style: none;
        }
        .thumb {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          width: 100%;
          padding: 0.25rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--background);
          font: inherit;
          color: var(--foreground);
          cursor: pointer;
        }
        .thumb:hover {
          background: var(--accent);
        }
        .thumb.current {
          border-color: var(--primary);
          box-shadow: 0 0 0 1px var(--primary);
        }
        .thumb img {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          border-radius: calc(var(--radius-md) - 2px);
          background: var(--muted);
        }
        .thumb-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.6875rem;
          color: var(--muted-foreground);
        }
        @media (max-width: 480px) {
          .current {
            flex-direction: column;
          }
          .preview {
            width: 100%;
          }
        }
      `,
    ];
  }
}

if (!customElements.get(OerImageField.tag)) customElements.define(OerImageField.tag, OerImageField);
