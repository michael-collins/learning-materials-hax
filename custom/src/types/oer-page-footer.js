/**
 * `oer-page-footer` — the attribution block under a typed page, as at the
 * foot of every item in learning-materials-decapcms:
 *
 * - License line: “<Title> by <authors> is licensed under CC BY 4.0”,
 *   with the Creative Commons badge icons
 * - AI usage: the page's AIUL licence(s), named, linked and badged from the
 *   AIUL definitions HAX ships (@haxtheweb/ai-usage-license/lib/v1.json)
 * - Cite: APA, MLA, Chicago and BibTeX, copied to the clipboard
 * - OER Schema: the page as JSON-LD (oerschema.org + schema.org) in the
 *   document head for search engines and harvesters, viewable via a chip
 *
 * Values come from the page's type fields (license, aiLicense, authors /
 * author) and the site; ?hideAILicense=true leaves the AI block out (embed
 * option, as in Decap).
 * @element oer-page-footer
 */
import { html, css, LitElement } from "../lit.js";
import { store, autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { contentTypes, SYSTEM_TYPE } from "./content-types.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

// "CC BY-NC-SA 4.0" → url + badge parts
function ccLicense(code) {
  const c = String(code || "").trim();
  if (!c || /all rights reserved/i.test(c)) return null;
  if (/^cc0/i.test(c)) return { name: "CC0 1.0", url: "https://creativecommons.org/publicdomain/zero/1.0/", parts: ["cc", "zero"] };
  const m = c.match(/^CC\s+([A-Z-]+)\s+(\d\.\d)$/i);
  if (!m) return { name: c, url: "", parts: [] };
  const terms = m[1].toLowerCase();
  return { name: c, url: `https://creativecommons.org/licenses/${terms}/${m[2]}/`, parts: ["cc", ...terms.split("-")] };
}
const ccIcon = (part) => `https://mirrors.creativecommons.org/presskit/icons/${part}.svg`;

// OER Schema class per type (the Decap site's schema builders)
const SCHEMA_TYPES = {
  lesson: "oer:LearningComponent",
  exercise: "oer:Practice",
  project: "oer:Assessment",
  pathway: "oer:Course",
  specialization: "oer:InstructionalPattern",
  article: "oer:SupportingMaterial",
  tutorial: "oer:SupportingMaterial",
  lecture: "oer:SupportingMaterial",
  rubric: "oer:Rubric",
  book: "schema:Book",
  section: "oer:Unit",
};

let aiulData = null;
function loadAiul() {
  if (!aiulData) {
    const base = globalThis.WCGlobalBasePath || new URL("build/es6/node_modules/", globalThis.document.baseURI).href;
    aiulData = fetch(`${base}@haxtheweb/ai-usage-license/lib/v1.json`)
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);
  }
  return aiulData;
}

const toList = (v) => (Array.isArray(v) ? v : v ? [v] : []).map((x) => String(x).trim()).filter(Boolean);

class OerPageFooter extends LitElement {
  static get tag() {
    return "oer-page-footer";
  }

  static get properties() {
    return { _item: { state: true }, _aiul: { state: true }, _cite: { state: true }, _copied: { state: true }, _schemaOpen: { state: true } };
  }

  connectedCallback() {
    super.connectedCallback();
    this.__dispose = autorun(() => {
      const active = toJS(store.activeItem);
      const items = toJS(store.manifest?.items) || [];
      const manifest = toJS(store.manifest);
      Promise.resolve().then(() => {
        this._items = items;
        this._site = manifest;
        const fresh = active && items.find((i) => i.id === active.id);
        // linked chapters credit their source
        const ref = fresh?.metadata?.oerRef?.page && items.find((i) => i.id === fresh.metadata.oerRef.page);
        this._item = ref ? { ...fresh, metadata: { ...fresh.metadata, oerFields: ref.metadata?.oerFields || {} } } : fresh || active;
        this._cite = false;
        this._schemaOpen = false;
        this._writeJsonLd();
      });
    });
    loadAiul().then((d) => (this._aiul = d));
  }

  disconnectedCallback() {
    this.__dispose?.();
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

  get _authors() {
    const f = this._fields;
    const list = toList(f.authors).map((a) => (typeof a === "object" ? a.name : a));
    if (list.length) return list;
    if (f.author) return [String(f.author)];
    const site = this._site?.author || this._site?.metadata?.author?.name;
    return site ? [String(site)] : [];
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
      "@type": this._type?.schemaType || SCHEMA_TYPES[typeId] || "schema:CreativeWork",
      "@id": this._url(),
      "schema:name": item.title,
      "schema:url": this._url(),
    };
    if (item.description) data["schema:description"] = item.description;
    if (cc?.url) data["schema:license"] = cc.url;
    const authors = this._authors;
    if (authors.length) data["schema:author"] = authors.map((name) => ({ "@type": "schema:Person", "schema:name": name }));
    if (item.metadata?.updated) data["schema:dateModified"] = new Date(item.metadata.updated * 1000).toISOString();
    if (item.metadata?.version) data["schema:version"] = item.metadata.version;
    if (f.difficulty) data["schema:educationalLevel"] = f.difficulty;
    if (f.estimatedDuration) data["schema:timeRequired"] = f.estimatedDuration;
    const objectives = toList(f.learningObjectives);
    if (objectives.length) data["oer:hasLearningObjective"] = objectives.map((o) => ({ "@type": "oer:LearningObjective", "schema:description": o }));
    const tags = toList(String(item.metadata?.tags || "").split(","));
    if (tags.length) data["schema:keywords"] = tags.join(", ");
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
      .row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem 0.75rem;
      }
      .row + .row {
        margin-top: 0.75rem;
      }
      .cc {
        display: inline-flex;
        gap: 0.125rem;
      }
      .cc img {
        width: 1.25rem;
        height: 1.25rem;
      }
      .aiul img {
        height: 1.5rem;
        vertical-align: middle;
      }
      .label {
        font-weight: 600;
        color: var(--foreground);
      }
      .chips {
        display: inline-flex;
        flex-wrap: wrap;
        gap: 0.375rem;
      }
      .chip {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.75rem;
        padding: 0 0.625rem;
        border: 1px solid var(--border);
        border-radius: 999px;
        font-size: 0.75rem;
        color: var(--foreground);
        cursor: pointer;
      }
      .chip:hover {
        background: var(--accent);
      }
      .chip[aria-expanded="true"] {
        border-color: var(--primary);
        color: var(--primary);
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

  _renderAiul(codes) {
    const data = this._aiul;
    if (!codes.length) return "";
    return html`<div class="row aiul">
      <span class="label">AI use</span>
      ${codes.map((code) => {
        const [, lic, mod] = String(code).match(/^AIUL-([A-Z]+)(?:-([A-Z0-9]+))?$/i) || [];
        const license = data?.licenses?.find((l) => l.code === lic?.toUpperCase());
        const modifier = mod && data?.modifiers?.find((m) => m.code === mod.toUpperCase());
        if (!license) return html`<span>${code}</span>`;
        const name = `${license.fullName}${modifier ? ` · ${modifier.title}` : ""}`;
        return html`<a class="aiul-item" href="${license.url}" target="_blank" rel="noopener noreferrer" title="${code}">
          ${license.image ? html`<img src="${license.image}" alt="${license.title}" loading="lazy" />` : ""} ${name}
        </a>`;
      })}
    </div>`;
  }

  render() {
    const item = this._item;
    if (!item?.metadata?.pageType || item.metadata.pageType === SYSTEM_TYPE) return html``;
    const f = this._fields;
    const cc = ccLicense(f.license);
    const authors = this._authors;
    const hideAi = new URLSearchParams(globalThis.location.search).get("hideAILicense") === "true";
    const aiCodes = hideAi ? [] : toList(f.aiLicense);
    return html`
      <div class="row">
        ${cc?.parts?.length
          ? html`<a class="cc" href="${cc.url}" target="_blank" rel="license noopener noreferrer" aria-label="${cc.name}">
              ${cc.parts.map((p) => html`<img src="${ccIcon(p)}" alt="" loading="lazy" />`)}
            </a>`
          : ""}
        <span>
          <b>${item.title}</b>${authors.length ? ` by ${authors.join(", ")}` : ""}
          ${cc
            ? html` is licensed under ${cc.url ? html`<a href="${cc.url}" target="_blank" rel="license noopener noreferrer">${cc.name}</a>` : cc.name}.`
            : f.license
              ? html` — ${f.license}.`
              : ""}
        </span>
      </div>
      ${this._renderAiul(aiCodes)}
      <div class="row">
        <span class="chips">
          <button class="chip" aria-expanded="${!!this._cite}" @click="${() => ((this._cite = !this._cite), (this._schemaOpen = false))}">${lucide("editor:format-quote")}Cite</button>
          <button class="chip" aria-expanded="${!!this._schemaOpen}" @click="${() => ((this._schemaOpen = !this._schemaOpen), (this._cite = false))}">
            ${lucide("hax:code-json")}OER Schema
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
    `;
  }
}
customElements.define(OerPageFooter.tag, OerPageFooter);
