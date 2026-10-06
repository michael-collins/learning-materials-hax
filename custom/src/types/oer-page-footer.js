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
import { permalinkFor } from "../ui/permalinks.js";
import { versionsOf } from "../versions/versioning.js";
import { projectParts, activityContext, PROJECT_TYPE } from "../projects/project-model.js";

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
  activity: "oer:Activity",
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
    if (content) this.__credits.observe(content, { childList: true, subtree: true, attributes: true, attributeFilter: ["credit", "credit-url", "license", "title", "creator", "creator-url", "source", "note", "caption", "data-resource", "data-cite"] });
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
    // the page's References (footnotes): structured when a reference points
    // to a Resource page or was entered with fields, plain text otherwise
    const citations = [...(root?.querySelectorAll("section.footnotes li[id^='fn-']") || [])].map((li) => {
      const copy = li.cloneNode(true);
      copy.querySelectorAll("a.fn-back").forEach((b) => b.remove());
      let data = null;
      try {
        data = li.dataset.cite ? JSON.parse(li.dataset.cite) : null;
      } catch {
        data = null;
      }
      return { text: copy.textContent.trim(), resource: li.dataset.resource || "", data, url: copy.querySelector("a[href^='http']")?.href || "" };
    });
    if (JSON.stringify(credits) === JSON.stringify(this._credits || []) && JSON.stringify(citations) === JSON.stringify(this._citations || [])) return;
    this._credits = credits;
    this._citations = citations;
    this.requestUpdate();
    this._writeJsonLd();
  }

  disconnectedCallback() {
    this.__dispose?.();
    this.__credits?.disconnect();
    globalThis.document.getElementById("oer-schema-jsonld")?.remove();
    globalThis.document.head.querySelectorAll("meta[data-oer-cite]").forEach((m) => m.remove());
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
    // projects and their activities (step and stage come from the outline)
    const all = this._items || [];
    const typeOf = (c) => {
      const t = contentTypes(all).types.find((x) => x.id === c.metadata?.pageType);
      return t?.schemaType || SCHEMA_TYPES[String(c.metadata?.pageType || "").replace(/^oer:/, "")] || "schema:CreativeWork";
    };
    const ref = (c) => ({ "@type": typeOf(c), "schema:name": c.title, "schema:url": new URL(c.slug, globalThis.document.baseURI).href });
    if (typeId === PROJECT_TYPE) {
      const parts = projectParts(item.id, all).filter((p) => p.item.metadata?.published !== false);
      const acts = parts.filter((p) => p.activity);
      const support = parts.filter((p) => !p.activity);
      if (acts.length) data["oer:hasActivity"] = acts.map((p) => ({ ...ref(p.item), "oer:step": p.step, ...(p.stage ? { "oer:stage": p.stage } : {}) }));
      if (support.length) data["oer:material"] = support.map((p) => ref(p.item));
    }
    const step = activityContext(item, all);
    if (step) {
      data["oer:activityOf"] = ref(step.project);
      data["oer:step"] = step.step;
      if (step.stage) data["oer:stage"] = step.stage;
    }
    // what to do first
    const before = (Array.isArray(f.prerequisites) ? f.prerequisites : [])
      .map((x) => all.find((i) => i.id === (x?.page || x)))
      .filter((c) => c && c.metadata?.published !== false);
    if (before.length) data["oer:prerequisite"] = before.map(ref);
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
    // works the page cites (its References)
    if (this._citations?.length) {
      const items = this._items || [];
      data["schema:citation"] = this._citations.map((c) => {
        const r = c.resource && items.find((i) => i.id === c.resource);
        const rf = r?.metadata?.oerFields || {};
        const d = c.data || {};
        const name = r?.title || d.title || "";
        const authors = r ? peopleOf(rf.authors).map((p) => p.name) : d.authors || [];
        return {
          "@type": "schema:CreativeWork",
          ...(name ? { "schema:name": name } : { "schema:description": c.text }),
          ...(authors.length ? { "schema:author": authors.map((a) => ({ "@type": "schema:Person", "schema:name": a })) } : {}),
          ...((r ? rf.date : d.year) ? { "schema:datePublished": String(r ? rf.date : d.year) } : {}),
          ...((r ? rf.container : d.container) ? { "schema:isPartOf": { "@type": "schema:CreativeWork", "schema:name": r ? rf.container : d.container } } : {}),
          ...((r ? rf.publisher : d.publisher) ? { "schema:publisher": r ? rf.publisher : d.publisher } : {}),
          ...((r ? rf.url : d.url) || c.url ? { "schema:url": (r ? rf.url : d.url) || c.url } : {}),
        };
      });
    }
    return data;
  }

  _writeJsonLd() {
    const doc = globalThis.document;
    let el = doc.getElementById("oer-schema-jsonld");
    const data = this._item?.metadata?.pageType && this._item.metadata.pageType !== SYSTEM_TYPE ? this._schema() : null;
    this._writeCitationMeta(!!this._item && this._item.metadata?.pageType !== SYSTEM_TYPE);
    if (!data) return el?.remove();
    if (!el) {
      el = Object.assign(doc.createElement("script"), { id: "oer-schema-jsonld", type: "application/ld+json" });
      doc.head.append(el);
    }
    el.textContent = JSON.stringify(data);
  }

  // what a citation of this page names: the release it shows (an archived
  // copy is that release; a live page cites its current release when a
  // frozen copy of it exists), the date of that release, and a permanent link
  get _citeInfo() {
    const item = this._item;
    const isSnapshot = !!item?.metadata?.oerSnapshotOf;
    const pageId = item?.metadata?.oerSnapshotOf || item?.id;
    const version = item?.metadata?.version || "";
    const release = version ? versionsOf(pageId, this._items || []).find((v) => v.version === version) : null;
    const pinned = isSnapshot || !!release?.snapshot;
    // the release's date, else the page's own Date field, else when it was last updated
    const fieldDate = this._fields?.date ? new Date(this._fields.date) : null;
    const issued =
      release?.date && Number(release.date)
        ? new Date(Number(release.date) * 1000)
        : fieldDate && !Number.isNaN(fieldDate.getTime())
          ? fieldDate
          : new Date((item?.metadata?.updated || item?.metadata?.created || Date.now() / 1000) * 1000);
    const title = item?.metadata?.oerSnapshotTitle || item?.title || "";
    return {
      title,
      version,
      issued,
      url: pinned ? permalinkFor(pageId, version) : permalinkFor(pageId),
      site: this._site?.title || "",
      authors: this._authors,
      accessed: new Date(),
      pinned,
    };
  }

  _citation(style) {
    const c = this._citeInfo;
    const year = c.issued.getFullYear();
    const authors = c.authors;
    // "Michael Collins" → { family: "Collins", given: "Michael" } (a single word stays as is)
    const split = (n) => {
      const parts = String(n).trim().split(/\s+/);
      return parts.length > 1 ? { family: parts.at(-1), given: parts.slice(0, -1).join(" ") } : { family: parts[0], given: "" };
    };
    const initials = (g) => g.split(/[\s-]+/).filter(Boolean).map((w) => `${w[0]}.`).join(" ");
    const inverted = (n) => {
      const { family, given } = split(n);
      return given ? `${family}, ${given}` : family;
    };
    const apaName = (n) => {
      const { family, given } = split(n);
      return given ? `${family}, ${initials(given)}` : family;
    };
    // APA: everyone "Family, I."; MLA and Chicago: the first author inverted
    const names = style === "APA" ? authors.map(apaName) : authors.map((n, i) => (i === 0 ? inverted(n) : n));
    const list = (sep, last) => (names.length > 1 ? `${names.slice(0, -1).join(sep)}${last}${names.at(-1)}` : names[0] || c.site);
    const v = c.version;
    const long = (d) => d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const mla = (d) => `${d.getDate()} ${d.toLocaleDateString("en-US", { month: "short" })}${d.getMonth() === 4 ? "" : "."} ${d.getFullYear()}`;
    switch (style) {
      case "APA":
        // APA 7: content that changes gets a retrieval date; a fixed version doesn't
        return `${list(", ", ", & ")} (${year}). ${c.title}${v ? ` (Version ${v})` : ""}. ${c.site}. ${c.pinned ? c.url : `Retrieved ${long(c.accessed)}, from ${c.url}`}`;
      case "MLA":
        return `${list(", ", ", and ")}. "${c.title}." ${c.site}${v ? `, version ${v}` : ""}, ${mla(c.issued)}, ${c.url}. Accessed ${mla(c.accessed)}.`;
      case "Chicago":
        return `${list(", ", ", and ")}. "${c.title}." ${c.site}${v ? `, version ${v}` : ""}. ${long(c.issued)}. Accessed ${long(c.accessed)}. ${c.url}.`;
      default: {
        const key = `${(authors[0] || c.site).split(/\s+/).pop()}${year}`.replace(/[^A-Za-z0-9]/g, "");
        return `@misc{${key},\n  author = {${authors.map(inverted).join(" and ") || c.site}},\n  title = {${c.title}},\n  year = {${year}},\n  publisher = {${c.site}},${v ? `\n  version = {${v}},` : ""}\n  url = {${c.url}},\n  urldate = {${c.accessed.toISOString().slice(0, 10)}}\n}`;
      }
    }
  }

  // reference-manager files: RIS and CSL-JSON
  _ris() {
    const c = this._citeInfo;
    const d = c.issued;
    const pad = (n) => String(n).padStart(2, "0");
    return [
      "TY  - ELEC",
      `TI  - ${c.title}`,
      ...(c.authors.length ? c.authors.map((a) => `AU  - ${a}`) : [`AU  - ${c.site}`]),
      `PY  - ${d.getFullYear()}`,
      `DA  - ${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}`,
      `PB  - ${c.site}`,
      ...(c.version ? [`ET  - ${c.version}`] : []),
      `UR  - ${c.url}`,
      `Y2  - ${c.accessed.toISOString().slice(0, 10)}`,
      "ER  - ",
      "",
    ].join("\r\n");
  }

  _csl() {
    const c = this._citeInfo;
    const parts = (d) => [[d.getFullYear(), d.getMonth() + 1, d.getDate()]];
    return JSON.stringify(
      [
        {
          id: this._item?.metadata?.oerSnapshotOf || this._item?.id,
          type: "webpage",
          title: c.title,
          author: (c.authors.length ? c.authors : [c.site]).map((literal) => ({ literal })),
          issued: { "date-parts": parts(c.issued) },
          accessed: { "date-parts": parts(c.accessed) },
          publisher: c.site,
          "container-title": c.site,
          ...(c.version ? { version: c.version } : {}),
          URL: c.url,
        },
      ],
      null,
      2,
    );
  }

  _download(kind) {
    const text = kind === "ris" ? this._ris() : kind === "csl" ? this._csl() : this._citation("BibTeX");
    const ext = { ris: "ris", csl: "json", bib: "bib" }[kind];
    const type = { ris: "application/x-research-info-systems", csl: "application/vnd.citationstyles.csl+json", bib: "application/x-bibtex" }[kind];
    const slug = String(this._citeInfo.title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "citation";
    const a = Object.assign(globalThis.document.createElement("a"), { href: URL.createObjectURL(new Blob([text], { type })), download: `${slug}.${ext}` });
    globalThis.document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  // citation meta tags (Highwire Press "citation_*", read by Google Scholar
  // and reference managers, plus Dublin Core), kept in step with the page
  _writeCitationMeta(enabled) {
    const doc = globalThis.document;
    doc.head.querySelectorAll("meta[data-oer-cite]").forEach((m) => m.remove());
    if (!enabled) return;
    const c = this._citeInfo;
    const f = this._fields;
    const cc = ccLicense(f.license);
    const d = c.issued;
    const pad = (n) => String(n).padStart(2, "0");
    const ymd = `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}`;
    const updated = this._item?.metadata?.updated ? new Date(this._item.metadata.updated * 1000) : null;
    const tags = String(this._item?.metadata?.tags || "").split(",").map((t) => t.trim()).filter(Boolean);
    const pairs = [
      ["citation_title", c.title],
      ...(c.authors.length ? c.authors : [c.site]).map((a) => ["citation_author", a]),
      ["citation_publication_date", ymd],
      ...(updated ? [["citation_online_date", `${updated.getFullYear()}/${pad(updated.getMonth() + 1)}/${pad(updated.getDate())}`]] : []),
      ["citation_publisher", c.site],
      ["citation_public_url", c.url],
      ["citation_abstract_html_url", this._url()],
      ["citation_language", "en"],
      ...(tags.length ? [["citation_keywords", tags.join("; ")]] : []),
      ...(f.doi ? [["citation_doi", String(f.doi)]] : []),
      ["DC.title", c.title],
      ...(c.authors.length ? c.authors : [c.site]).map((a) => ["DC.creator", a]),
      ["DC.date", ymd.replace(/\//g, "-")],
      ["DC.publisher", c.site],
      ["DC.identifier", c.url],
      ["DC.language", "en"],
      ["DC.type", "Text"],
      ...(cc?.url ? [["DC.rights", cc.url]] : f.license ? [["DC.rights", String(f.license)]] : []),
      ...(this._item?.description ? [["DC.description", this._item.description]] : []),
    ];
    for (const [name, content] of pairs) {
      if (!content) continue;
      const m = doc.createElement("meta");
      m.name = name;
      m.content = String(content);
      m.dataset.oerCite = "";
      doc.head.append(m);
    }
  }

  async _copyText(key, text) {
    try {
      await globalThis.navigator.clipboard.writeText(text);
      this._copied = key;
      setTimeout(() => (this._copied = ""), 2000);
    } catch {
      this._copied = "";
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
      .cite-note {
        margin: -0.25rem 0 0.625rem;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .cite-dl {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.25rem 0.875rem;
        margin-top: 0.75rem;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
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
        text-align: start;
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
    // pages whose References cite this page (a Resource), from the
    // oerCites each page records when it's saved
    const citing = (this._items || []).filter(
      (i) => !i.metadata?.oerSnapshotOf && (i.metadata?.oerCites || []).includes(id) && (store.isLoggedIn || i.metadata?.published !== false),
    );
    if (!refs.length && !citing.length) return "";
    const groups = new Map();
    for (const r of refs) groups.set(r.via, [...(groups.get(r.via) || []), r.item]);
    if (citing.length) groups.set("Cited by", citing);
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
            <div class="cite-row">
              <b>Link</b><code>${this._citeInfo.url}</code>
              <button class="copy" @click="${() => this._copyText("link", this._citeInfo.url)}">
                ${lucide(this._copied === "link" ? "oer:check" : "icons:content-copy")}${this._copied === "link" ? "Copied" : "Copy"}
              </button>
            </div>
            <p class="cite-note">
              ${this._citeInfo.pinned
                ? `A permanent link to version ${this._citeInfo.version} as released: it keeps working if the page is renamed or moved.`
                : "A permanent link: it keeps working if the page is renamed or moved."}
            </p>
            ${["APA", "MLA", "Chicago", "BibTeX"].map(
              (s) => html`<div class="cite-row">
                <b>${s}</b><code>${this._citation(s)}</code>
                <button class="copy" @click="${() => this._copy(s)}">${lucide(this._copied === s ? "oer:check" : "icons:content-copy")}${this._copied === s ? "Copied" : "Copy"}</button>
              </div>`,
            )}
            <div class="cite-dl">
              <span>Save to a reference manager:</span>
              <button class="link" @click="${() => this._download("ris")}">RIS (Zotero, EndNote, Mendeley)</button>
              <button class="link" @click="${() => this._download("csl")}">CSL-JSON</button>
              <button class="link" @click="${() => this._download("bib")}">BibTeX</button>
            </div>
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
