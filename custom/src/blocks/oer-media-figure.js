/**
 * Base class for embedded-media blocks (iframe, slides, Sketchfab, 3D,
 * video): a figure with a rounded media box and the shared caption line of
 * learning-materials-decapcms' MediaCaption, "Caption — Credit", where the
 * credit links to its source.
 *
 * Subclasses implement `renderMedia()` and may set `aspect` (CSS
 * aspect-ratio) or rely on the `height` property. While editing, a shield
 * covers the media so a click selects the block instead of driving the
 * embedded page.
 */
import { html, css, LitElement } from "../lit.js";

export const SIZES = { small: "Small", medium: "Medium", large: "Large (full column)" };

export class OerMediaFigure extends LitElement {
  static get properties() {
    return {
      title: { type: String, reflect: true },
      caption: { type: String, reflect: true },
      credit: { type: String, reflect: true },
      creditUrl: { type: String, attribute: "credit-url", reflect: true },
      size: { type: String, reflect: true },
    };
  }

  // unset settings stay undefined so they are not written into the page
  constructor() {
    super();
    this.size = "large";
  }

  /** The shared HAX settings: title, caption, credit, size. */
  static figureSettings() {
    return [
      { property: "title", title: "Title", description: "Describes the media for screen readers.", inputMethod: "textfield" },
      { property: "caption", title: "Caption", inputMethod: "textarea" },
      { property: "credit", title: "Credit", description: "Who made it, shown after the caption.", inputMethod: "textfield" },
      { property: "creditUrl", title: "Credit link", description: "Link to the original source.", inputMethod: "textfield", validationType: "url" },
      { property: "size", title: "Size", inputMethod: "select", options: SIZES },
    ];
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin: 2rem auto;
        max-width: 100%;
      }
      :host([size="small"]) {
        max-width: 28rem;
      }
      :host([size="medium"]) {
        max-width: 40rem;
      }
      figure {
        margin: 0;
      }
      .media {
        position: relative;
        overflow: hidden;
        border: 1px solid var(--border, #e5e5e5);
        border-radius: var(--radius-lg, 0.75rem);
        background: color-mix(in oklch, var(--muted, #f4f4f5) 30%, transparent);
      }
      .media iframe,
      .media model-viewer {
        display: block;
        width: 100%;
        height: 100%;
        border: 0;
      }
      .ratio iframe,
      .ratio model-viewer {
        position: absolute;
        inset: 0;
      }
      /* editing: clicks select the block, not the embedded page */
      :host([data-hax-ray]) .media::after {
        content: "";
        position: absolute;
        inset: 0;
      }
      figcaption {
        margin-top: 0.5rem;
        text-align: center;
        font-size: 0.875rem;
        line-height: 1.5;
        color: var(--muted-foreground, #555);
      }
      figcaption a {
        color: var(--link, var(--primary, #0060a8));
      }
      .empty {
        display: grid;
        place-items: center;
        gap: 0.25rem;
        min-height: 10rem;
        padding: 2rem;
        text-align: center;
        font-size: 0.875rem;
        color: var(--muted-foreground, #555);
      }
      .empty strong {
        color: var(--foreground, #111);
      }
    `;
  }

  renderEmpty(what, hint) {
    return html`<div class="empty"><strong>No ${what} yet</strong><span>${hint}</span></div>`;
  }

  renderCaption() {
    if (!this.caption && !this.credit) return "";
    const credit = this.credit
      ? this.creditUrl
        ? html`<a href="${this.creditUrl}" target="_blank" rel="noopener noreferrer">${this.credit}</a>`
        : this.credit
      : "";
    return html`<figcaption>${this.caption}${this.caption && credit ? html` &mdash; ` : ""}${credit}</figcaption>`;
  }

  // subclasses: the iframe / viewer
  renderMedia() {
    return "";
  }

  /** "16 / 9"-style ratio, or null to size by `height`. */
  get aspect() {
    return null;
  }

  render() {
    const ratio = this.aspect;
    const height = this.height ? (/^\d+$/.test(String(this.height)) ? `${this.height}px` : this.height) : "";
    return html`<figure>
      <div class="media ${ratio ? "ratio" : ""}" style="${ratio ? `aspect-ratio:${ratio}` : height ? `height:${height}` : ""}">
        ${this.renderMedia()}
      </div>
      ${this.renderCaption()}
    </figure>`;
  }
}
