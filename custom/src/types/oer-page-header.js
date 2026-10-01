/**
 * `oer-page-header` — the typed header under a page's title: the page's
 * type, its description, and every field its type marks "In header"
 * (difficulty, duration, learning objectives, prerequisites…), like the
 * item headers of learning-materials-decapcms. Signed-in authors also get
 * "Edit details", which opens oer-page-details.
 * @element oer-page-header
 */
import { html, css, LitElement } from "../lit.js";
import { store, autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { contentTypes, SYSTEM_TYPE } from "./content-types.js";
import { pageDetails } from "./oer-page-details.js";
import { embedDialog } from "../embed/oer-embed-dialog.js";
import { isEmbedded } from "../embed/embed-mode.js";
import { isSnapshot, latestOf } from "../versions/versioning.js";
import { versionsDialog } from "../versions/oer-versions-dialog.js";

const lucide = (name) =>
  html`<span class="lucide" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

const hasValue = (v) => v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && !v.length);

class OerPageHeader extends LitElement {
  static get tag() {
    return "oer-page-header";
  }

  static get properties() {
    return {
      editable: { type: Boolean },
      _item: { state: true },
      _types: { state: true },
    };
  }

  constructor() {
    super();
    this.editable = false;
    this._item = null;
    this._types = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.__dispose = autorun(() => {
      const item = toJS(store.activeItem);
      const items = toJS(store.manifest?.items) || [];
      Promise.resolve().then(() => {
        this._allItems = items;
        // the active item can lag a manifest reload; prefer the fresh copy
        this._item = (item && items.find((i) => i.id === item.id)) || item;
        this._types = contentTypes(items).types;
      });
    });
  }

  disconnectedCallback() {
    this.__dispose?.();
    super.disconnectedCallback();
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none;
      }
      .meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        margin: 0 0 1rem;
      }
      .type {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.5rem;
        padding: 0 0.625rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--primary);
        background: color-mix(in oklch, var(--primary) 10%, transparent);
        --simple-icon-height: 0.875rem;
        --simple-icon-width: 0.875rem;
      }
      .pill {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.5rem;
        padding: 0 0.625rem;
        border: 1px solid var(--border);
        border-radius: 999px;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .pill.version {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.5rem;
        padding: 0 0.625rem;
        border: 1px solid var(--border);
        border-radius: 999px;
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.75rem;
        color: var(--foreground);
        cursor: pointer;
      }
      .pill.version:hover {
        background: var(--accent);
      }
      .pill.version:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .archived {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        margin: 0 0 1rem;
        padding: 0.75rem 1rem;
        border: 1px solid color-mix(in srgb, oklch(0.62 0.15 70) 45%, transparent);
        border-radius: var(--radius-md);
        background: color-mix(in srgb, oklch(0.62 0.15 70) 10%, var(--background));
        font-size: 0.875rem;
      }
      .archived a {
        margin-left: auto;
        font-weight: 500;
        color: var(--link, var(--primary));
      }
      .pill b {
        font-weight: 500;
        color: var(--foreground);
      }
      .actions {
        margin-left: auto;
        display: inline-flex;
        gap: 0.25rem;
      }
      .edit {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.75rem;
        padding: 0 0.625rem;
        border-radius: var(--radius-md);
        font-size: 0.8125rem;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .edit:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .edit:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .lucide {
        flex: none;
        width: 0.875rem;
        height: 0.875rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      .desc {
        margin: 0 0 1.25rem;
        text-align: start;
        font-size: 1.125rem;
        line-height: 1.6;
        color: var(--muted-foreground);
      }
      .blocks {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
        gap: 1rem;
        margin: 0 0 1.5rem;
      }
      .block {
        padding: 1rem 1.25rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        background: var(--card, var(--background));
      }
      .block h2 {
        margin: 0 0 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        letter-spacing: normal;
      }
      .block ul {
        margin: 0;
        padding-left: 1.125rem;
        font-size: 0.9375rem;
        line-height: 1.6;
      }
      .block p {
        margin: 0;
        font-size: 0.9375rem;
        line-height: 1.6;
      }
      img {
        display: block;
        max-width: 100%;
        border-radius: var(--radius-md);
      }
      a {
        color: var(--link, var(--primary));
      }
    `;
  }

  _short(f, v) {
    if (f.kind === "boolean") return v ? "Yes" : "No";
    if (f.kind === "select") return (f.options || []).find((o) => o.value === v)?.label || v;
    if (f.kind === "date") {
      const d = new Date(v);
      return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString();
    }
    return v;
  }

  render() {
    const item = this._item;
    const typeId = item?.metadata?.pageType;
    if (!item || typeId === SYSTEM_TYPE) return html``;
    const type = this._types.find((t) => t.id === typeId);
    const values = item.metadata?.oerFields || {};
    const shown = (type?.fields || []).filter((f) => f.header && hasValue(values[f.name]));
    // short values become pills beside the type; lists, long text and
    // images get their own card
    const pills = shown.filter((f) => ["text", "number", "select", "boolean", "date"].includes(f.kind));
    const blocks = shown.filter((f) => !pills.includes(f));
    // embedding is on unless the page's "Allow embedding" field says no
    const canEmbed = !isEmbedded() && values.allowEmbed !== false && item.metadata?.published !== false;
    const snapshot = isSnapshot(item);
    const latest = snapshot ? latestOf(item, this._allItems) : null;
    const version = item.metadata?.version;
    if (!type && !this.editable && !canEmbed && !version) return html``;
    const versionPill = version
      ? html`<button class="pill version" title="Versions" @click="${() => versionsDialog().show(snapshot ? latest?.id : item.id)}">
          ${lucide("icons:history")}v${version}${snapshot ? " · archived" : ""}
        </button>`
      : "";
    return html`
      ${snapshot && latest
        ? html`<div class="archived" role="status">
            ${lucide("icons:history")}
            <span>You're viewing version ${version} of <b>${latest.title}</b>, as released.</span>
            <a href="${latest.slug}">See the latest version</a>
          </div>`
        : ""}
      <div class="meta">
        ${type ? html`<span class="type">${type.icon ? html`<simple-icon-lite icon="${type.icon}"></simple-icon-lite>` : ""}${type.label}</span>` : ""}
        ${versionPill}
        ${pills.map((f) => html`<span class="pill">${f.label} <b>${this._short(f, values[f.name])}</b></span>`)}
        <span class="actions">
          ${canEmbed ? html`<button class="edit" @click="${() => embedDialog().show(item)}">${lucide("icons:open-in-new")}Embed</button>` : ""}
          ${this.editable
            ? html`<button class="edit" @click="${() => pageDetails().show(item.id)}">${lucide("image:tune")}${type ? "Edit details" : "Set page type"}</button>`
            : ""}
        </span>
      </div>
      ${type && item.description ? html`<p class="desc">${item.description}</p>` : ""}
      ${blocks.length
        ? html`<div class="blocks">
            ${blocks.map((f) => {
              const v = values[f.name];
              return html`<section class="block">
                <h2>${f.label}</h2>
                ${f.kind === "list"
                  ? html`<ul>${(Array.isArray(v) ? v : [v]).map((x) => html`<li>${x}</li>`)}</ul>`
                  : f.kind === "image"
                    ? html`<img src="${v}" alt="" />`
                    : f.kind === "url"
                      ? html`<p><a href="${v}">${v}</a></p>`
                      : html`<p>${v}</p>`}
              </section>`;
            })}
          </div>`
        : ""}
    `;
  }
}
customElements.define(OerPageHeader.tag, OerPageHeader);
