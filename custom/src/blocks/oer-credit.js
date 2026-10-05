/**
 * oer-credit: attribution for one piece of third-party material on the page
 * (an image, an excerpt, an adapted diagram), placed under it. It reads as
 * Creative Commons recommends (title, author, source, licence):
 *
 *   “Title” by Creator, CC BY 4.0. Adapted: cropped.
 *
 * Credits are also listed in the page footer and published in the page's
 * structured data.
 *
 *   <oer-credit title="…" creator="…" creator-url="…" source="…" license="CC BY 4.0" note="Cropped"></oer-credit>
 */
import { html, css, LitElement } from "../lit.js";
import { registerBlocks } from "./register.js";
import { LICENSE_OPTIONS, ccLicense, ccIcon } from "../types/licenses.js";

export class OerCredit extends LitElement {
  static get tag() {
    return "oer-credit";
  }

  static get properties() {
    return {
      title: { type: String, reflect: true },
      creator: { type: String, reflect: true },
      creatorUrl: { type: String, attribute: "creator-url", reflect: true },
      source: { type: String, reflect: true },
      license: { type: String, reflect: true },
      note: { type: String, reflect: true },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin: -0.75rem 0 1.5rem;
        font-size: 0.875rem;
        line-height: 1.5;
        color: var(--muted-foreground, #555);
      }
      a {
        color: var(--link, var(--primary, #0060a8));
      }
      .license {
        white-space: nowrap;
      }
      .license img {
        width: 1em;
        height: 1em;
        margin-right: 0.125em;
        vertical-align: -0.125em;
      }
      .license img:last-of-type {
        margin-right: 0.3em;
      }
      .empty {
        font-style: italic;
      }
    `;
  }

  render() {
    const link = (text, url) => (url ? html`<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>` : text);
    const cc = ccLicense(this.license);
    const license = this.license
      ? cc?.url
        ? html`<a class="license" href="${cc.url}" target="_blank" rel="license noopener noreferrer">${cc.parts.map((p) => html`<img src="${ccIcon(p)}" alt="" />`)}${cc.name}</a>`
        : html`<span class="license">${this.license}</span>`
      : "";
    if (!this.title && !this.creator && !this.license) {
      return html`<p class="empty">Credit: add the title, creator and licence in the block settings.</p>`;
    }
    const parts = [];
    if (this.title) parts.push(html`“${link(this.title, this.source)}”`);
    if (this.creator) parts.push(html`${this.title ? " by " : "By "}${link(this.creator, this.creatorUrl)}`);
    return html`<p>
      ${parts}${parts.length && license ? ", " : ""}${license}${parts.length || license ? "." : ""}${this.note ? html` ${this.note.replace(/\.?$/, ".")}` : ""}
    </p>`;
  }

  static get haxProperties() {
    return {
      canScale: false,
      canEditSource: true,
      gizmo: {
        title: "Credit",
        description: "Attribution for third-party material placed above it: title, creator, source and licence.",
        icon: "icons:copyright",
        color: "blue",
        tags: ["Text", "credit", "attribution", "license", "creative commons", "copyright", "source"],
        meta: { author: "Michael Collins" },
      },
      settings: {
        configure: [
          { property: "title", title: "Title of the work", inputMethod: "textfield" },
          { property: "source", title: "Source link", description: "Where the original is published.", inputMethod: "textfield", validationType: "url" },
          { property: "creator", title: "Creator", inputMethod: "textfield" },
          { property: "creatorUrl", title: "Creator link", inputMethod: "textfield", validationType: "url" },
          { property: "license", title: "License", inputMethod: "select", options: LICENSE_OPTIONS },
          { property: "note", title: "Changes", description: "How you adapted it, e.g. “Cropped and recoloured”.", inputMethod: "textfield" },
        ],
        advanced: [],
      },
      demoSchema: [{ tag: "oer-credit", properties: { title: "Title of the work", creator: "Creator", license: "CC BY 4.0" }, content: "" }],
    };
  }
}

if (!customElements.get(OerCredit.tag)) customElements.define(OerCredit.tag, OerCredit);
registerBlocks(OerCredit);
