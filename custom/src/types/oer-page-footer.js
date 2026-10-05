/**
 * `oer-page-footer` — the attribution block under a typed page, as at the
 * foot of every item in learning-materials-decapcms. Two parts:
 *
 * 1. A license line, “<Title> by <authors> is licensed under CC BY 4.0”
 *    with the Creative Commons icons, beside the Cite and OER Schema actions
 *    (citations in APA, MLA, Chicago and BibTeX; the page's JSON-LD)
 * 2. A short labelled list:
 *    - AI use: the page's AIUL licence(s) as badge buttons (names and
 *      badges from the AIUL API) that open what each one means (aiul.js)
 *    - Version: the released version, last update and all versions
 *    - Used in: pages that link here, grouped by how (Before you start,
 *      Includes it…), the first few shown with the rest a click away
 *
 * The page's OER Schema JSON-LD is always written to the document head for
 * search engines and harvesters.
 *
 * Values come from the page's type fields (license, aiLicense, authors /
 * author) and the site; ?hideAILicense=true leaves the AI block out (embed
 * option, as in Decap).
 * @element oer-page-footer
 */
import { html, css, LitElement } from "../lit.js";
import { store, autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { contentTypes, SYSTEM_TYPE, peopleOf } from "./content-types.js";
import { usedIn } from "./relations.js";
import { versionsDialog } from "../versions/oer-versions-dialog.js";
import { ccLicense, ccIcon } from "./licenses.js";
import { loadAiul, aiulInfo, AIUL_GUIDE } from "./aiul.js";

// the OER Schema logo, as the Decap site's OERSchemaBadge uses it
const OER_LOGO = {
  light: "https://cdn.jsdelivr.net/gh/open-curriculum/oerschema@master/public/oerschema-logo-black.png",
  dark: "https://cdn.jsdelivr.net/gh/open-curriculum/oerschema@master/public/oerschema-logo-white.png",
};

// blocks that credit third-party material (media blocks with a credit or
// licence, and credit blocks), listed under "Credits"
const MEDIA_TAGS = ["oer-iframe", "oer-video", "oer-google-slides", "oer-sketchfab", "oer-3d-viewer", "oer-code-embed"];
const CREDIT_SELECTOR = ["oer-credit", ...MEDIA_TAGS.flatMap((t) => [`${t}[credit]`, `${t}[license]`])].join(", ");

// "Used in" shows this many pages per group before "and N more"
const USED_PREVIEW = 3;

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

// OER Schema class per type (the Decap site's schema builders)
const SCHEMA_TYPES = {
  lesson: "oer:LearningComponent",
  exercise: "oer:Practice",
  project: "oer:Project",
  quiz: "oer:Quiz",
  unit: "oer:Unit",
  pathway: "oer:Course",
  specialization: "oer:InstructionalPattern",
  article: "oer:SupportingMaterial",
  tutorial: "oer:SupportingMaterial",
  lecture: "oer:SupportingMaterial",
  rubric: "oer:Rubric",
  book: "schema:Book",
  section: "oer:Unit",
};


const toList = (v) => (Array.isArray(v) ? v : v ? [v] : []).map((x) => String(x).trim()).filter(Boolean);

class OerPageFooter extends LitElement {
  static get tag() {
    return "oer-page-footer";
  }

  static get properties() {
    return {
      _item: { state: true },
      _aiul: { state: true },
      _aiulOpen: { state: true },
      _cite: { state: true },
      _copied: { state: true },
      _schemaOpen: { state: true },
      _usedAll: { state: true },
      _dark: { state: true },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.__dispose = autorun(() => {
      const active = toJS(store.activeItem);
      const items = toJS(store.manifest?.items) || [];
      const manifest = toJS(store.manifest);
      const dark = !!toJS(store.darkMode);
      Promise.resolve().then(() => {
        this._dark = dark;
        this._items = items;
        this._site = manifest;
        const fresh = active && items.find((i) => i.id === active.id);
        // linked chapters credit their source
        const ref = fresh?.metadata?.oerRef?.page && items.find((i) => i.id === fresh.metadata.oerRef.page);
        this._item = ref ? { ...fresh, metadata: { ...fresh.metadata, oerFields: ref.metadata?.oerFields || {} } } : fresh || active;
        this._cite = false;
        this._schemaOpen = false;
        this._usedAll = false;
        this._aiulOpen = null;
        this._writeJsonLd();
      });
    });
    loadAiul().then((d) => (this._aiul = d));
    // credits follow the page content as it renders or changes
    this.__credits = new MutationObserver(() => {
      clearTimeout(this.__creditsTimer);
      this.__creditsTimer = setTimeout(() => this._refreshCredits(), 150);
    });
    const content = this._contentRoot();
    if (content) this.__credits.observe(content, { childList: true, subtree: true, attributes: true, attributeFilter: ["credit", "credit-url", "license", "title", "creator", "creator-url", "source", "note", "caption"] });
    this._refreshCredits();
  }

  // the theme element: page content is in its light DOM
  _contentRoot() {
    return this.getRootNode()?.host || null;
  }

  _refreshCredits() {
    const root = this._contentRoot();
    const els = root ? [...root.querySelectorAll(CREDIT_SELECTOR)] : [];
    const credits = els.map((el) =>
      el.localName === "oer-credit"
        ? { title: el.title || "", creator: el.creator || "", creatorUrl: el.creatorUrl || "", source: el.source || "", license: el.license || "" }
        : { title: el.caption || el.title || "", creator: el.credit || "", creatorUrl: "", source: el.creditUrl || "", license: el.license || "" },
    );
    if (JSON.stringify(credits) === JSON.stringify(this._credits || [])) return;
    this._credits = credits;
    this.requestUpdate();
    this._writeJsonLd();
  }

  disconnectedCallback() {
    this.__dispose?.();
    this.__credits?.disconnect();
    globalThis.document.getElementById("oer-schema-jsonld")?.remove();
    super.disconnectedCallback();
  }

  // the page's values, falling back to its type's field defaults
  get _fields() {
    const values = { ...(this._item?.metadata?.oerFields || {}) };
    for (const f of this._type?.fields || []) {
      if ((values[f.name] === undefined || values[f.name] === "") && f.default) values[f.name] = f.default;
    }
    return values;
  }

  // [{ name, url }]: the page's Authors (a People field), an older single
  // author text field with its authorUrl, or the site's author
  get _people() {
    const f = this._fields;
    const list = peopleOf(f.authors);
    if (list.length) return list;
    if (f.author) return [{ name: String(f.author), url: String(f.authorUrl || "") }];
    const site = this._site?.author || this._site?.metadata?.author?.name;
    return site ? [{ name: String(site), url: "" }] : [];
  }

  get _authors() {
    return this._people.map((p) => p.name);
  }

  get _type() {
    return contentTypes(this._items).types.find((t) => t.id === this._item?.metadata?.pageType) || null;
  }

  _url() {
    return new URL(this._item?.slug || "", globalThis.document.baseURI).href;
  }

  _schema() {
    const item = this._item;
    if (!item) return null;
    const f = this._fields;
    const cc = ccLicense(f.license);
    const typeId = item.metadata?.pageType;
    const data = {
      "@context": { oer: "https://oerschema.org/", schema: "https://schema.org/" },
      "@type": this._type?.schemaType || SCHEMA_TYPES[String(typeId || "").replace(/^oer:/, "")] || "schema:CreativeWork",
      "@id": this._url(),
      "schema:name": item.title,
      "schema:url": this._url(),
    };
    if (item.description) data["schema:description"] = item.description;
    if (cc?.url) data["schema:license"] = cc.url;
    const authors = this._authors;
    if (authors.length) data["schema:author"] = this._people.map((p) => ({ "@type": "schema:Person", "schema:name": p.name, ...(p.url ? { "schema:url": p.url } : {}) }));
    if (item.metadata?.updated) data["schema:dateModified"] = new Date(item.metadata.updated * 1000).toISOString();
    if (item.metadata?.version) data["schema:version"] = item.metadata.version;
    if (f.difficulty) data["schema:educationalLevel"] = f.difficulty;
    if (f.estimatedDuration) data["schema:timeRequired"] = f.estimatedDuration;
    const objectives = toList(f.learningObjectives);
    if (objectives.length) data["oer:hasLearningObjective"] = objectives.map((o) => ({ "@type": "oer:LearningObjective", "schema:description": o }));
    // a lesson's materials and quiz (published ones)
    const components = (f.components || [])
      .map((c) => (this._items || []).find((i) => i.id === c?.page))
      .filter((c) => c && c.metadata?.published !== false);
    if (components.length) {
      const types = contentTypes(this._items || []).types;
      data["oer:hasComponent"] = components.map((c) => {
        const t = types.find((x) => x.id === c.metadata?.pageType);
        return {
          "@type": t?.schemaType || SCHEMA_TYPES[String(c.metadata?.pageType || "").replace(/^oer:/, "")] || "oer:LearningComponent",
          "schema:name": c.title,
          "schema:url": new URL(c.slug, globalThis.document.baseURI).href,
        };
      });
    }
    const tags = toList(String(item.metadata?.tags || "").split(","));
    if (tags.length) data["schema:keywords"] = tags.join(", ");
    // third-party material on the page, each with its own credit and licence
    const parts = (this._credits || []).filter((c) => c.title || c.creator || c.license);
    if (parts.length) {
      data["schema:hasPart"] = parts.map((c) => ({
        "@type": "schema:CreativeWork",
        ...(c.title ? { "schema:name": c.title } : {}),
        ...(c.creator ? { "schema:creator": { "@type": "schema:Person", "schema:name": c.creator, ...(c.creatorUrl ? { "schema:url": c.creatorUrl } : {}) } } : {}),
        ...(c.source ? { "schema:url": c.source } : {}),
        ...(c.license ? { "schema:license": ccLicense(c.license)?.url || c.license } : {}),
      }));
    }
    return data;
  }

  _writeJsonLd() {
    const doc = globalThis.document;
    let el = doc.getElementById("oer-schema-jsonld");
    const data = this._item?.metadata?.pageType && this._item.metadata.pageType !== SYSTEM_TYPE ? this._schema() : null;
    if (!data) return el?.remove();
    if (!el) {
      el = Object.assign(doc.createElement("script"), { id: "oer-schema-jsonld", type: "application/ld+json" });
      doc.head.append(el);
    }
    el.textContent = JSON.stringify(data);
  }

  _citation(style) {
    const item = this._item;
    const authors = this._authors;
    const year = new Date((item.metadata?.updated || item.metadata?.created || Date.now() / 1000) * 1000).getFullYear();
    const site = this._site?.title || "";
    const url = this._url();
    const list = (sep, last) => (authors.length > 1 ? `${authors.slice(0, -1).join(sep)}${last}${authors.at(-1)}` : authors[0] || site);
    switch (style) {
      case "APA":
        return `${list(", ", ", & ")} (${year}). ${item.title}. ${site}. ${url}`;
      case "MLA":
        return `${list(", ", ", and ")}. "${item.title}." ${site}, ${year}, ${url}.`;
      case "Chicago":
        return `${list(", ", ", and ")}. "${item.title}." ${site}, ${year}. ${url}.`;
      default: {
        const key = `${(authors[0] || site).split(/\s+/).pop()}${year}`.replace(/[^A-Za-z0-9]/g, "");
        return `@misc{${key},\n  author = {${authors.join(" and ") || site}},\n  title = {${item.title}},\n  year = {${year}},\n  publisher = {${site}},\n  url = {${url}}\n}`;
      }
    }
  }

  async _copy(style) {
    try {
      await globalThis.navigator.clipboard.writeText(this._citation(style));
      this._copied = style;
      setTimeout(() => (this._copied = ""), 2000);
    } catch {
      // clipboard blocked: the text is visible to copy by hand
      this._copied = "";
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin-top: 3rem;
        padding-top: 1.25rem;
        border-top: 1px solid var(--border);
        font-size: 0.8125rem;
        line-height: 1.6;
        color: var(--muted-foreground);
      }
      :host([hidden]) {
        display: none;
      }
      a {
        color: var(--link, var(--primary));
      }
      button {
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
        width: 0.875rem;
        height: 0.875rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      /* 1. license line with the actions beside it */
      .top {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem 1.5rem;
      }
      .license {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        min-width: 0;
        margin: 0;
      }
      .license b {
        color: var(--foreground);
        font-weight: 600;
      }
      .cc {
        display: inline-flex;
        flex: none;
        gap: 0.125rem;
      }
      .cc img {
        width: 1.25rem;
        height: 1.25rem;
      }
      .actions {
        display: inline-flex;
        flex: none;
        gap: 0.375rem;
      }
      /* shadcn Button, variant outline, size sm */
      .btn {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.75rem;
        padding: 0 0.625rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--foreground);
        cursor: pointer;
      }
      .btn:hover {
        background: var(--accent);
      }
      .btn.badge img {
        display: block;
        height: 1rem;
        width: auto;
      }
      .btn[aria-expanded="true"] {
        border-color: var(--primary);
        color: var(--primary);
      }

      /* 2. labelled list */
      dl {
        display: grid;
        grid-template-columns: max-content minmax(0, 1fr);
        gap: 0.625rem 1.25rem;
        margin: 1rem 0 0;
      }
      dt {
        padding-top: 0.125rem;
        font-size: 0.6875rem;
        font-weight: 500;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--muted-foreground);
      }
      dd {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.375rem 0.75rem;
        margin: 0;
        color: var(--foreground);
      }
      @media (max-width: 480px) {
        dl {
          grid-template-columns: minmax(0, 1fr);
          gap: 0.125rem;
        }
        dd + dt {
          margin-top: 0.625rem;
        }
      }
      .pill {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.5rem;
        padding: 0 0.5rem;
        border: 1px solid var(--border);
        border-radius: 999px;
        color: var(--foreground);
        text-decoration: none;
        white-space: nowrap;
      }
      a.pill:hover {
        background: var(--accent);
      }
      .pill code {
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.6875rem;
        font-weight: 600;
      }
      .sep,
      .muted {
        color: var(--muted-foreground);
      }
      /* the version chip opens the page's releases */
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
      .pill.version .lucide {
        width: 0.875rem;
        height: 0.875rem;
      }
      .link {
        all: unset;
        color: var(--link, var(--primary));
        text-decoration: underline;
        text-underline-offset: 2px;
        cursor: pointer;
      }
      .aiul {
        display: block;
      }
      .aiul-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
      }
      .aiul-tag {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        min-height: 1.75rem;
        padding: 0.125rem 0.5rem 0.125rem 0.25rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        font-size: 0.8125rem;
        color: var(--foreground);
        cursor: pointer;
      }
      .aiul-tag:hover,
      .aiul-tag[aria-expanded="true"] {
        background: var(--accent);
      }
      .aiul-tag:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .aiul-tag img {
        height: 1.375rem;
        width: auto;
        border-radius: 3px;
      }
      .aiul-tag code {
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.6875rem;
        font-weight: 600;
        padding-left: 0.25rem;
      }
      .aiul-tag .lucide {
        color: var(--muted-foreground);
      }
      .aiul-mod {
        color: var(--muted-foreground);
      }
      .aiul-panel {
        margin-top: 0.625rem;
        padding: 0.875rem 1rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        background: color-mix(in srgb, var(--muted) 45%, transparent);
        font-size: 0.875rem;
        line-height: 1.55;
        text-align: start;
      }
      .aiul-panel p {
        margin: 0;
      }
      .aiul-panel h3 {
        margin: 0.875rem 0 0.25rem;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--muted-foreground);
      }
      .aiul-panel ul {
        margin: 0;
        padding-left: 1.125rem;
      }
      .aiul-panel li + li {
        margin-top: 0.125rem;
      }
      .aiul-links {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem 1rem;
        margin-top: 0.875rem !important;
      }
      .aiul-links a {
        color: var(--link, var(--primary));
      }
      .credits {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .credits li + li {
        margin-top: 0.25rem;
      }
      .used-group {
        display: inline;
      }
      .used-group + .used-group::before {
        content: "";
        display: block;
        height: 0.25rem;
      }
      .via {
        margin-right: 0.375rem;
        color: var(--muted-foreground);
      }
      .panel {
        margin-top: 0.75rem;
        padding: 0.75rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        background: color-mix(in srgb, var(--muted) 50%, transparent);
      }
      .cite-row {
        display: flex;
        gap: 0.75rem;
        align-items: flex-start;
      }
      .cite-row + .cite-row {
        margin-top: 0.5rem;
      }
      .cite-row b {
        flex: none;
        width: 4.5rem;
        color: var(--foreground);
      }
      .cite-row code,
      pre {
        flex: 1;
        min-width: 0;
        margin: 0;
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.75rem;
        white-space: pre-wrap;
        word-break: break-word;
        color: var(--foreground);
      }
      .copy {
        all: unset;
        flex: none;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0 0.5rem;
        height: 1.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.75rem;
        cursor: pointer;
        color: var(--foreground);
      }
      .copy:hover {
        background: var(--accent);
      }
    `;
  }

  // each licence is a button (badge + name) that opens what it means:
  // the short description, requirements and guidelines for students
  _renderAiul(codes) {
    if (!codes.length) return "";
    const infos = codes.map((code) => aiulInfo(code, this._aiul));
    const open = infos.find((i) => i.code === this._aiulOpen);
    const toggle = (code) => (this._aiulOpen = this._aiulOpen === code ? null : code);
    return html`<dt>AI use</dt>
      <dd class="aiul">
        <div class="aiul-tags">
          ${infos.map(
            (i, n) => html`<button
              class="aiul-tag"
              aria-expanded="${open === i ? "true" : "false"}"
              aria-controls="aiul-panel"
              @click="${() => toggle(i.code)}"
            >
              ${i.image ? html`<img src="${i.image}" alt="" loading="lazy" @error="${(e) => e.target.remove()}" />` : html`<code>${i.title}</code>`}
              <span class="aiul-name">${i.name || i.title}${i.modifier ? html`<span class="aiul-mod"> · ${i.modifier}</span>` : ""}</span>
              ${lucide(open === i ? "oer:chevron-up" : "oer:chevron-down", "sm")}
            </button>`,
          )}
        </div>
        ${open
          ? html`<div class="aiul-panel" id="aiul-panel" role="region" aria-label="${open.title}${open.name ? ` (${open.name})` : ""}">
              <p class="aiul-desc"><b>${open.title}${open.name ? ` · ${open.name}` : ""}.</b> ${open.description}${open.modifier ? html` Applies to <b>${open.modifier}</b> work.` : ""}</p>
              ${open.requirements.length
                ? html`<h3>Requirements</h3>
                    <ul>
                      ${open.requirements.map((r) => html`<li>${r}</li>`)}
                    </ul>`
                : ""}
              ${open.students.length
                ? html`<h3>Guidelines for students</h3>
                    <ul>
                      ${open.students.map((r) => html`<li>${r}</li>`)}
                    </ul>`
                : ""}
              <p class="aiul-links">
                ${open.url ? html`<a href="${open.url}" target="_blank" rel="noopener noreferrer">Full ${open.title} license</a>` : ""}
                <a href="${AIUL_GUIDE}" target="_blank" rel="noopener noreferrer">About AI Usage Licenses</a>
              </p>
            </div>`
          : ""}
      </dd>`;
  }

  // third-party material on the page: "Title — Creator, CC BY 4.0"
  _renderCredits() {
    const credits = (this._credits || []).filter((c) => c.title || c.creator || c.license);
    if (!credits.length) return "";
    const link = (text, url) => (url ? html`<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>` : text);
    return html`<dt>Credits</dt>
      <dd>
        <ul class="credits">
          ${credits.map((c) => {
            const cc = ccLicense(c.license);
            return html`<li>
              ${c.title ? link(c.title, c.source) : ""}${c.title && c.creator ? " — " : ""}${c.creator ? link(c.creator, c.creatorUrl || (c.title ? "" : c.source)) : ""}${(c.title || c.creator) && c.license ? ", " : ""}${c.license
                ? cc?.url
                  ? html`<a href="${cc.url}" target="_blank" rel="license noopener noreferrer">${cc.name}</a>`
                  : c.license
                : ""}
            </li>`;
          })}
        </ul>
      </dd>`;
  }

  // "A", "A and B", "A, B, and C", each linked when it has a link
  _renderPeople() {
    const people = this._people;
    return people.map((p, i) => {
      const last = i === people.length - 1;
      const sep = i === 0 ? "" : last ? (people.length > 2 ? ", and " : " and ") : ", ";
      return html`${sep}${p.url ? html`<a href="${p.url}" target="_blank" rel="noopener noreferrer">${p.name}</a>` : p.name}`;
    });
  }

  _renderVersion() {
    const item = this._item;
    const version = item?.metadata?.version;
    const updated = item?.metadata?.updated ? new Date(item.metadata.updated * 1000) : null;
    if (!version && !updated) return "";
    const date = updated ? updated.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "";
    return html`<dt>${version ? "Version" : "Updated"}</dt>
      <dd>
        ${version
          ? html`<button
              class="pill version"
              title="All versions"
              aria-label="Version ${version}${item.metadata?.oerSnapshotOf ? ", archived" : ""}. All versions"
              @click="${() => versionsDialog().show(item.metadata?.oerSnapshotOf || item.id)}"
            >
              ${lucide("icons:history")}v${version}${item.metadata?.oerSnapshotOf ? " · archived" : ""}
            </button>`
          : ""}
        ${date ? html`<span class="${version ? "muted" : ""}">${version ? `Updated ${date}` : date}</span>` : ""}
      </dd>`;
  }

  // pages that link here (Decap's "Part of"), grouped by how they link: a
  // relation field (its label) or including this page as a chapter
  _renderUsedIn() {
    const id = this._item?.metadata?.oerRef?.page ? null : this._item?.id;
    if (!id) return "";
    const refs = usedIn(id, contentTypes(this._items).types, this._items);
    if (!refs.length) return "";
    const groups = new Map();
    for (const r of refs) groups.set(r.via, [...(groups.get(r.via) || []), r.item]);
    const hidden = [...groups.values()].reduce((n, list) => n + Math.max(0, list.length - USED_PREVIEW), 0);
    return html`<dt>Used in</dt>
      <dd>
        <span>
          ${[...groups].map(([via, list]) => {
            const shown = this._usedAll ? list : list.slice(0, USED_PREVIEW);
            return html`<span class="used-group"
              ><span class="via">${via}:</span>${shown.map((p, n) => html`${n ? ", " : ""}<a href="${p.slug}">${p.title}</a>`)}${!this._usedAll && list.length > USED_PREVIEW
                ? html`, and ${list.length - USED_PREVIEW} more`
                : ""}</span
            >`;
          })}
          ${hidden
            ? html` <button class="link" aria-expanded="${this._usedAll ? "true" : "false"}" @click="${() => (this._usedAll = !this._usedAll)}">
                ${this._usedAll ? "Show fewer" : "Show all"}
              </button>`
            : ""}
        </span>
      </dd>`;
  }

  render() {
    const item = this._item;
    if (item?.metadata?.pageType === SYSTEM_TYPE) return html``;
    // an untyped page has no licence block, but a released one shows its version
    if (!item?.metadata?.pageType) return item?.metadata?.version ? html`<dl>${this._renderVersion()}</dl>` : html``;
    const f = this._fields;
    const cc = ccLicense(f.license);
    const authors = this._authors;
    const hideAi = new URLSearchParams(globalThis.location.search).get("hideAILicense") === "true";
    // one code each; older imports stored them joined ("AIUL-WA, AIUL-NA-3D")
    const aiCodes = hideAi ? [] : toList(f.aiLicense).flatMap((c) => c.split(",")).map((c) => c.trim()).filter(Boolean);
    return html`
      <div class="top">
        <p class="license">
          ${cc?.parts?.length
            ? html`<a class="cc" href="${cc.url}" target="_blank" rel="license noopener noreferrer" aria-label="${cc.name}">
                ${cc.parts.map((p) => html`<img src="${ccIcon(p)}" alt="" loading="lazy" />`)}
              </a>`
            : ""}
          <span>
            <b>${item.title}</b>${authors.length ? html` by ${this._renderPeople()}` : ""}${cc
              ? html` is licensed under ${cc.url ? html`<a href="${cc.url}" target="_blank" rel="license noopener noreferrer">${cc.name}</a>` : cc.name}.`
              : f.license
                ? html` — ${f.license}.`
                : ""}
          </span>
        </p>
        <span class="actions">
          <button class="btn" aria-expanded="${this._cite ? "true" : "false"}" @click="${() => ((this._cite = !this._cite), (this._schemaOpen = false))}">
            ${lucide("editor:format-quote")}Cite
          </button>
          <button
            class="btn badge"
            aria-label="OER Schema: view this page's structured data"
            title="OER Schema: view this page's structured data"
            aria-expanded="${this._schemaOpen ? "true" : "false"}"
            @click="${() => ((this._schemaOpen = !this._schemaOpen), (this._cite = false))}"
          >
            <img src="${this._dark ? OER_LOGO.dark : OER_LOGO.light}" alt="OER Schema" @error="${(e) => (e.target.replaceWith(globalThis.document.createTextNode("OER Schema")))}" />
          </button>
        </span>
      </div>
      ${this._cite
        ? html`<div class="panel">
            ${["APA", "MLA", "Chicago", "BibTeX"].map(
              (s) => html`<div class="cite-row">
                <b>${s}</b><code>${this._citation(s)}</code>
                <button class="copy" @click="${() => this._copy(s)}">${lucide(this._copied === s ? "oer:check" : "icons:content-copy")}${this._copied === s ? "Copied" : "Copy"}</button>
              </div>`,
            )}
          </div>`
        : ""}
      ${this._schemaOpen
        ? html`<div class="panel">
            <pre>${JSON.stringify(this._schema(), null, 2)}</pre>
            <p style="margin:0.5rem 0 0">Published in the page as JSON-LD (<a href="https://oerschema.org/" target="_blank" rel="noopener noreferrer">OER Schema</a> and schema.org) for search engines and repositories.</p>
          </div>`
        : ""}
      <dl>${this._renderAiul(aiCodes)}${this._renderVersion()}${this._renderUsedIn()}${this._renderCredits()}</dl>
    `;
  }
}
customElements.define(OerPageFooter.tag, OerPageFooter);
