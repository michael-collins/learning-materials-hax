/**
 * `oer-include` — show another page's content here, live or pinned to a
 * released version, without copying it: the building block of books that
 * reuse lessons and articles (learning-materials-decapcms outline nodes
 * with `content: collection/slug` and `version`).
 *
 *   <oer-include page="item-…" version="1.2.0"></oer-include>
 *
 * The content renders inside the block's shadow root, so editing the page
 * that includes it never saves a copy. A source line links to the original
 * (and names the version).
 * @element oer-include
 */
import { html, css, LitElement } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { registerBlocks } from "../blocks/register.js";
import { versionsOf } from "../versions/versioning.js";
import { SYSTEM_TYPE } from "../types/content-types.js";

const cache = new Map(); // location -> Promise<html>

function fetchHtml(location) {
  if (!cache.has(location)) {
    const url = new URL(location, globalThis.document.baseURI);
    cache.set(
      location,
      fetch(url, { cache: "no-cache" })
        .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
        .then((t) => t.replace(/<page-break\b[^>]*>(?:\s*<\/page-break>)?/gi, ""))
        .catch((err) => {
          cache.delete(location);
          throw err;
        }),
    );
  }
  return cache.get(location);
}

export class OerInclude extends LitElement {
  static get tag() {
    return "oer-include";
  }

  static get properties() {
    return {
      page: { type: String, reflect: true },
      version: { type: String, reflect: true },
      source: { type: String, reflect: true }, // "show" | "hide"
    };
  }

  constructor() {
    super();
    this.source = "show";
  }

  // the item to show: the page itself, or the snapshot of a pinned version
  _resolve() {
    const items = toJS(store.manifest?.items) || [];
    const page = items.find((i) => i.id === this.page);
    if (!page) return { page: null, target: null };
    if (!this.version) return { page, target: page };
    const release = versionsOf(page.id, items).find((v) => v.version === this.version);
    return { page, target: release?.snapshot || null };
  }

  updated(changed) {
    if (changed.has("page") || changed.has("version")) this._load();
  }

  async _load() {
    const box = this.shadowRoot.querySelector(".content");
    if (!box) return;
    const { page, target } = this._resolve();
    if (!page || !target) {
      box.innerHTML = "";
      this.__missing = page ? `Version ${this.version} of “${page.title}” was not found.` : "The included page was not found.";
      this.requestUpdate();
      return;
    }
    this.__missing = "";
    try {
      const markup = await fetchHtml(target.location);
      // still the same request?
      if (this._resolve().target?.id === target.id) box.innerHTML = markup;
    } catch {
      this.__missing = `“${page.title}” could not be loaded.`;
    }
    this.requestUpdate();
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      /* the included page reads like the page around it: ragged-right
         (DDD justifies the theme), and in Reader mode at the reader's size
         and spacing (--reader-*, from the theme) */
      .content {
        font-size: var(--reader-size, var(--ddd-theme-body-font-size, 1.125rem));
        line-height: var(--reader-leading, 1.6);
        text-align: start;
      }
      .content > :first-child {
        margin-top: 0;
      }
      .content :is(h2, h3, h4) {
        line-height: 1.3;
      }
      .content h2 {
        margin: 2rem 0 0.75rem;
        font-size: var(--reader-h2, 1.75rem);
        font-weight: 700;
        letter-spacing: -0.02em;
        line-height: 1.25;
      }
      .content h3 {
        margin: 1.5rem 0 0.5rem;
        font-size: var(--reader-h3, 1.375rem);
        font-weight: 600;
      }
      .content h4 {
        margin: 1.25rem 0 0.5rem;
        font-size: var(--reader-h4, 1.125rem);
        font-weight: 600;
      }
      .content p,
      .content ul,
      .content ol {
        margin: 0 0 var(--reader-gap, 1rem);
      }
      .content li {
        margin: 0.25rem 0;
      }
      .content a {
        color: var(--link, var(--primary));
      }
      .content img,
      .content video {
        max-width: 100%;
        height: auto;
        border-radius: var(--radius-md, 0.5rem);
      }
      /* AI Usage License badges (dmd-program.github.io/aiul) sit at badge
         size; their embed's own max-width is an inline style, which HAX
         strips when it saves a page */
      .content img[src*="/aiul/assets/images/licenses/"] {
        width: auto;
        height: 2rem;
        border-radius: 0;
        vertical-align: middle;
      }
      .content table {
        width: 100%;
        border-collapse: collapse;
        margin: 0 0 1rem;
        font-size: var(--reader-table, 0.9375rem);
      }
      .content th,
      .content td {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--border);
        text-align: start;
      }
      .content code {
        padding: 0.125rem 0.375rem;
        border-radius: var(--radius-sm, 0.25rem);
        background: var(--muted);
        font-size: 0.875em;
      }
      .content blockquote {
        margin: 0 0 1rem;
        padding-left: 1rem;
        border-left: 3px solid var(--border);
        color: var(--muted-foreground);
      }
      .source {
        display: var(--oer-include-source, flex);
        flex-wrap: wrap;
        gap: 0.375rem;
        align-items: center;
        margin: 0 0 1.25rem;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .source a {
        color: var(--link, var(--primary));
      }
      .version {
        padding: 0 0.5rem;
        border: 1px solid var(--border);
        border-radius: 999px;
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.75rem;
      }
      .missing {
        padding: 1.5rem;
        border: 1px dashed var(--border);
        border-radius: var(--radius-lg, 0.75rem);
        text-align: center;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
    `;
  }

  render() {
    const { page } = this._resolve();
    return html`
      ${page && this.source !== "hide"
        ? html`<p class="source">
            From <a href="${page.slug}">${page.title}</a>
            ${this.version ? html`<span class="version">v${this.version}</span>` : html`<span>(latest)</span>`}
          </p>`
        : ""}
      ${this.__missing ? html`<div class="missing">${this.__missing}</div>` : ""}
      <div class="content"></div>
    `;
  }

  firstUpdated() {
    this._load();
  }

  static get haxProperties() {
    const pages = Object.fromEntries(
      (toJS(store.manifest?.items) || [])
        .filter((i) => !i.metadata?.oerSnapshotOf && i.metadata?.pageType !== SYSTEM_TYPE)
        .map((i) => [i.id, i.title]),
    );
    return {
      canScale: false,
      canEditSource: true,
      gizmo: {
        title: "Include a page",
        description: "Show another page's content here (latest or a released version) without copying it.",
        icon: "hax:file-link-outline",
        color: "blue",
        tags: ["Layout", "include", "reuse", "book", "embed"],
        meta: { author: "Michael Collins" },
      },
      settings: {
        configure: [
          { property: "page", title: "Page", inputMethod: "select", options: pages },
          { property: "version", title: "Version", description: "A released version like 1.2.0, or empty for the latest.", inputMethod: "textfield" },
          { property: "source", title: "Source line", inputMethod: "select", options: { show: "Show “From …”", hide: "Hide" } },
        ],
        advanced: [],
      },
      demoSchema: [{ tag: "oer-include", properties: { source: "show" }, content: "" }],
    };
  }
}

if (!customElements.get(OerInclude.tag)) customElements.define(OerInclude.tag, OerInclude);
registerBlocks(OerInclude);
