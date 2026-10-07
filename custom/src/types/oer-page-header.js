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
import { contentTypes, SYSTEM_TYPE, peopleOf, joinNames } from "./content-types.js";
import { isSnapshot, latestOf } from "../versions/versioning.js";
import { bookPrint } from "../books/oer-book-print.js";
import { exportHtmlZip, exportCommonCartridge } from "../books/book-export.js";
import { resolveLinks, isImage, fileLabel } from "./relations.js";
import { filePreview, previewKind } from "../ui/oer-file-preview.js";
import { inDevelopmentBadge, pathwayChipStyles } from "../pathways/pathway-model.js";
import { projectParts, activityContext, PROJECT_TYPE } from "../projects/project-model.js";
import { outlineViewer, canView } from "../ui/oer-outline-viewer.js";

const lucide = (name) =>
  html`<span class="lucide" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

const hasValue = (v) => v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && !v.length);

class OerPageHeader extends LitElement {
  static get tag() {
    return "oer-page-header";
  }

  static get properties() {
    return {
      _item: { state: true },
      _types: { state: true },
      _exportOpen: { state: true },
      _exporting: { state: true },
    };
  }

  constructor() {
    super();
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
    return [pathwayChipStyles, css`
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
      .edit.start {
        background: var(--primary);
        color: var(--primary-foreground);
        font-weight: 500;
        text-decoration: none;
      }
      .edit.start:hover {
        background: color-mix(in srgb, var(--primary) 88%, black);
        color: var(--primary-foreground);
      }
      .rel,
      .att {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .rel li,
      .att li {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        --simple-icon-height: 1rem;
        --simple-icon-width: 1rem;
      }
      .rel simple-icon-lite,
      .noicon {
        flex: none;
        width: 1rem;
        color: var(--muted-foreground);
      }
      .rel-text {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        font-size: 0.9375rem;
        line-height: 1.4;
      }
      .rel-text small {
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .att img,
      .att .kind {
        flex: none;
        width: 4rem;
        height: 2.75rem;
        object-fit: cover;
        border-radius: var(--radius-sm);
        border: 1px solid var(--border);
        background: var(--muted);
      }
      .thumb {
        all: unset;
        flex: none;
        display: inline-flex;
        border-radius: var(--radius-sm);
        cursor: zoom-in;
      }
      .thumb:focus-visible,
      .name:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
      .thumb:hover img,
      .thumb:hover .kind {
        border-color: var(--ring);
      }
      .name {
        all: unset;
        cursor: pointer;
        text-align: start;
      }
      .name:hover b {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .att .kind {
        display: grid;
        place-items: center;
        font-size: 0.6875rem;
        font-weight: 600;
        color: var(--muted-foreground);
      }
      .dl {
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        color: var(--foreground);
      }
      .dl:hover {
        background: var(--accent);
      }
      .menu-wrap {
        position: relative;
      }
      .menu {
        position: absolute;
        right: 0;
        top: calc(100% + 0.25rem);
        z-index: 5;
        min-width: 14rem;
        padding: 0.25rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        background: var(--popover, var(--background));
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
      }
      .menu button {
        all: unset;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        height: 2rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
        cursor: pointer;
      }
      .menu button:hover,
      .menu button:focus-visible {
        background: var(--accent);
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
        /* the page body may be justified; card lists read ragged-right */
        text-align: start;
      }
      .block h2 {
        margin: 0 0 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        letter-spacing: normal;
      }
      .steps h3 {
        margin: 0.75rem 0 0.25rem;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--muted-foreground);
      }
      .steps h2 + h3 {
        margin-top: 0;
      }
      .steps ul {
        list-style: none;
        padding: 0;
      }
      .steps li {
        display: flex;
        align-items: baseline;
        gap: 0.5rem;
        padding: 0.125rem 0;
      }
      .steps .num {
        flex: none;
        display: inline-grid;
        place-items: center;
        min-width: 1.375rem;
        height: 1.375rem;
        border: 1px solid var(--border);
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }
      .steps simple-icon-lite,
      .steps .noicon {
        flex: none;
        width: 1.375rem;
        --simple-icon-width: 0.875rem;
        --simple-icon-height: 0.875rem;
        color: var(--muted-foreground);
        align-self: center;
      }
      .steps small {
        color: var(--muted-foreground);
        font-size: 0.75rem;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
      .pill a {
        font-weight: 600;
        color: inherit;
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
    `];
  }

  // linked pages (prerequisites, resources…): type icon, title, type, version
  _renderLinks(value) {
    // unpublished pages (e.g. a quiz under review) are listed for authors only
    const links = resolveLinks(value, this._allItems || []).filter((l) => store.isLoggedIn || l.item?.metadata?.published !== false);
    return html`<ul class="rel">
      ${links.map((l) => {
        const type = this._types.find((t) => t.id === l.item?.metadata?.pageType);
        return html`<li>
          ${type?.icon ? html`<simple-icon-lite icon="${type.icon}"></simple-icon-lite>` : html`<span class="noicon"></span>`}
          <span class="rel-text">
            ${l.item ? html`<a href="${l.href}">${l.item.title}</a>` : html`<em>Missing page</em>`}
            <small>${[type?.label, l.version ? `v${l.version}` : ""].filter(Boolean).join(" · ")}</small>
          </span>
        </li>`;
      })}
    </ul>`;
  }

  // a project's steps, grouped by stage, with its supporting pages in place
  _renderSteps(projectId) {
    const parts = projectParts(projectId, this._allItems || []).filter((p) => store.isLoggedIn || p.item.metadata?.published !== false);
    if (!parts.some((p) => p.activity)) return "";
    const groups = [];
    for (const p of parts) {
      if (!groups.length || groups.at(-1).stage !== p.stage) groups.push({ stage: p.stage, parts: [] });
      groups.at(-1).parts.push(p);
    }
    return html`<section class="block steps" aria-labelledby="steps-h">
      <h2 id="steps-h">Project steps</h2>
      ${groups.map(
        (g) => html`${g.stage ? html`<h3>${g.stage}</h3>` : ""}
          <ul role="list">
            ${g.parts.map((p) => {
              const type = this._types.find((t) => t.id === p.item.metadata?.pageType);
              return html`<li class="${p.activity ? "" : "support"}">
                ${p.activity
                  ? html`<span class="num" aria-hidden="true">${p.step}</span><span class="sr">Step ${p.step}: </span>`
                  : type?.icon
                    ? html`<simple-icon-lite icon="${type.icon}"></simple-icon-lite>`
                    : html`<span class="noicon"></span>`}
                <a href="${p.item.slug}">${p.item.title}</a>
                ${p.activity ? "" : html`<small>${type?.label || "Page"}</small>`}
              </li>`;
            })}
          </ul>`,
      )}
    </section>`;
  }

  // attachments: thumbnail or file kind, title, description, download / open
  // the thumbnail and title open a preview (lightbox for images; PDF,
  // video, audio, text, 3D and Word viewers) when the file type has one
  _renderFiles(value) {
    const rows = (Array.isArray(value) ? value : []).filter((r) => r?.url);
    const previewable = rows.filter((r) => previewKind(r.url));
    return html`<ul class="att">
      ${rows.map((r) => {
        const external = /^https?:\/\//i.test(r.url) && !r.url.startsWith(globalThis.location.origin);
        const name = r.title || r.url.split("/").pop();
        const thumb = isImage(r.url) ? html`<img src="${r.url}" alt="" loading="lazy" />` : html`<span class="kind">${fileLabel(r.url)}</span>`;
        const preview = previewKind(r.url) ? () => filePreview().show(previewable, previewable.indexOf(r)) : null;
        return html`<li>
          ${preview
            ? html`<button class="thumb" aria-label="Preview ${name}" title="Preview" @click="${preview}">${thumb}</button>`
            : thumb}
          <span class="rel-text"
            >${preview ? html`<button class="name" @click="${preview}"><b>${name}</b></button>` : html`<b>${name}</b>`}${r.description
              ? html`<small>${r.description}</small>`
              : ""}</span
          >
          <a class="dl" href="${r.url}" ?download="${!external}" target="${external ? "_blank" : ""}" rel="${external ? "noopener noreferrer" : ""}" aria-label="${external ? "Open" : "Download"} ${r.title || "file"}">
            ${lucide(external ? "icons:open-in-new" : "icons:file-download")}
          </a>
        </li>`;
      })}
    </ul>`;
  }

  async _export(kind, item) {
    this._exportOpen = false;
    if (kind === "print") return bookPrint().show(item.id);
    this._exporting = true;
    try {
      if (kind === "html") await exportHtmlZip(item.id);
      else await exportCommonCartridge(item.id);
    } finally {
      this._exporting = false;
    }
  }

  _short(f, v) {
    if (f.kind === "people") return joinNames(peopleOf(v).map((p) => p.name));
    if (Array.isArray(v)) return v.map((x) => this._short(f, x)).join(", ");
    if (f.kind === "boolean") return v ? "Yes" : "No";
    if (f.kind === "select") return (f.options || []).find((o) => o.value === v)?.label || v;
    if (f.kind === "date") {
      const d = new Date(v);
      return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString();
    }
    return v;
  }

  render() {
    // a linked chapter (oer-include page in a book) shows its source's
    // description and fields
    const own = this._item;
    const refId = own?.metadata?.oerRef?.page;
    const source = refId ? (this._allItems || []).find((i) => i.id === refId) : null;
    const item = source ? { ...own, description: own.description || source.description, metadata: { ...own.metadata, oerFields: source.metadata?.oerFields || {} } } : own;
    const typeId = item?.metadata?.pageType;
    if (!item || typeId === SYSTEM_TYPE) return html``;
    const type = this._types.find((t) => t.id === typeId);
    const values = item.metadata?.oerFields || {};
    const shown = (type?.fields || []).filter((f) => f.header && hasValue(values[f.name]));
    // short values become pills beside the type; lists, long text and
    // images get their own card
    const pills = shown.filter((f) => ["text", "number", "select", "boolean", "date", "people"].includes(f.kind));
    const blocks = shown.filter((f) => !pills.includes(f));
    const snapshot = isSnapshot(item);
    const latest = snapshot ? latestOf(item, this._allItems) : null;
    const version = item.metadata?.version;
    // books: the first chapter, for "Start reading"
    const firstChild = (this._allItems || [])
      .filter((i) => i.parent === item.id && !i.metadata?.oerSnapshotOf && !i.metadata?.hideInMenu)
      .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))[0];
    // Embed and Page details live in the theme's page menu
    // the version is shown in the page footer; an archived copy still says
    // so up here
    if (!type && !snapshot) return html``;
    // an activity: its place in its project; a project: its steps
    const subject = source || own;
    const step = activityContext(subject, this._allItems);
    const steps = typeId === PROJECT_TYPE ? this._renderSteps(subject.id) : "";
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
        ${values.placeholder ? inDevelopmentBadge("md") : ""}
        ${step
          ? html`<span class="pill">Step <b>${step.step} of ${step.total}</b></span>
              ${step.stage ? html`<span class="pill">Stage <b>${step.stage}</b></span>` : ""}
              <span class="pill">Part of <a href="${step.project.slug}">${step.project.title}</a></span>`
          : ""}
        ${pills.map((f) => html`<span class="pill">${f.kind === "people" && f.name === "authors" ? "By" : f.label} <b>${this._short(f, values[f.name])}</b></span>`)}
        <span class="actions">
          ${canView(own, this._allItems)
            ? html`<button class="edit" aria-label="Open ${item.title} in the viewer" @click="${() => outlineViewer().show(own.id)}">${lucide("oer:eye")}Viewer</button>`
            : ""}
          ${type?.reader && firstChild
            ? html`<a class="edit start" href="${firstChild.slug}">${lucide("hax:lesson")}Start reading</a>
                <span class="menu-wrap">
                  <button class="edit" aria-haspopup="menu" aria-expanded="${!!this._exportOpen}" @click="${() => (this._exportOpen = !this._exportOpen)}">
                    ${lucide("icons:file-download")}${this._exporting ? "Exporting…" : "Export"}
                  </button>
                  ${this._exportOpen
                    ? html`<div class="menu" role="menu" @keydown="${(e) => e.key === "Escape" && (this._exportOpen = false)}">
                        <button role="menuitem" @click="${() => this._export("print", item)}">${lucide("icons:print")}Print / PDF</button>
                        <button role="menuitem" @click="${() => this._export("html", item)}">${lucide("hax:file-html")}HTML (.zip)</button>
                        <button role="menuitem" @click="${() => this._export("cc", item)}">${lucide("hax:module")}Common Cartridge (.imscc)</button>
                      </div>`
                    : ""}
                </span>`
            : ""}
        </span>
      </div>
      ${type && item.description ? html`<p class="desc">${item.description}</p>` : ""}
      ${steps ? html`<div class="blocks">${steps}</div>` : ""}
      ${blocks.length
        ? html`<div class="blocks">
            ${blocks.map((f) => {
              const v = values[f.name];
              return html`<section class="block">
                <h2>${f.label}</h2>
                ${f.kind === "relation"
                  ? this._renderLinks(v)
                  : f.kind === "files"
                    ? this._renderFiles(v)
                    : f.kind === "list"
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
