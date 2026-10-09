/**
 * `oer-page-details` — everything about a page that isn't its content, in
 * one dialog with its sections listed down the left:
 * - General: title, address, icon, content type, description, tags
 * - the type's details: the form generated from the type's definition
 *   (switching type keeps values whose keys both types share; the type list
 *   only offers types the parent page may contain)
 * - Media: the images, video, embeds and files in the page, and which
 *   images have no description
 * - Structure: where the page sits and its sub-pages
 * - History: its released versions and saved revisions
 * - Report: words, reading time, headings and links
 * General and the details save together; the rest are views with their
 * own actions.
 *
 *   pageDetails().show(itemId, { section: "media" })
 * @element oer-page-details
 */
import { html, css, LitElement } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { contentTypes, allowedChildTypes, savePageDetails, peopleOf, tagsOf, institutionsOf } from "./content-types.js";
import { resolveLinks, uploadFile, isImage } from "./relations.js";
import { pagePicker } from "../books/oer-page-picker.js";
import { versionsOf } from "../versions/versioning.js";
import { loadAiul, aiulInfo } from "./aiul.js";
import { valuesInUse } from "../ui/oer-choice-field.js";
import { formControls } from "../ui/form-controls.js";
import "../ui/oer-image-field.js";
import { iconPicker } from "../ui/oer-icon-picker.js";
import { pageIcon } from "./page-icon.js";
import { pageHtml, parsePage, pageReport } from "./page-report.js";
import { versionsDialog } from "../versions/oer-versions-dialog.js";
import { outlineBuilder } from "../outline/oer-outline-builder.js";
import { newPage } from "../ui/oer-new-page.js";

// the dialog's sections, in order ("details" is named after the page's type)
const SECTIONS = [
  ["general", "General", "oer:sliders-horizontal"],
  ["details", "Details", "oer:file-text"],
  ["media", "Media", "oer:files"],
  ["structure", "Structure", "oer:list"],
  ["history", "History", "oer:clock"],
  ["report", "Report", "oer:check"],
];
const slugify = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const day = (secondsOrIso) => {
  const d = typeof secondsOrIso === "number" ? new Date(secondsOrIso * 1000) : new Date(secondsOrIso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};
// HAX's commit messages, read as sentences: "'Page details updated: X (item-…)'" → "Page details updated"
const revisionText = (m) => String(m || "").replace(/^'|'$/g, "").replace(/\s*\(item-[^)]+\)\s*$/, "").replace(/:\s.*$/, "").trim() || "Saved";

// a multiple choice whose options are AI Usage License codes gets the AIUL
// picker (licence + optional media) instead of one checkbox per code
const isAiulField = (f) => f.kind === "select" && f.multiple && (f.options || []).length > 0 && f.options.every((o) => /^AIUL-/i.test(o.value));
const AIUL_CODE = /^AIUL-([A-Z]+)(?:-([A-Z0-9]+))?$/i;

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

const empty = (v) => v === undefined || v === null || v === "" || (Array.isArray(v) && !v.filter((x) => String(x).trim()).length);

// the form's fields: an image's description field is drawn with its image
const shownFields = (fields) => fields.filter((f) => !(/Alt$/.test(f.name) && fields.some((g) => g.kind === "image" && `${g.name}Alt` === f.name)));

// a multiple choice's values; older imports stored them joined ("A, B")
const toArray = (v) => (Array.isArray(v) ? v : v ? String(v).split(",").map((s) => s.trim()).filter(Boolean) : []);

class OerPageDetails extends LitElement {
  static get tag() {
    return "oer-page-details";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      _type: { state: true },
      _desc: { state: true },
      _tags: { state: true },
      _tagDraft: { state: true },
      _values: { state: true },
      _saving: { state: true },
      _tried: { state: true },
      _section: { state: true },
      _title: { state: true },
      _slugTail: { state: true },
      _slugEdited: { state: true },
      _icon: { state: true },
      _report: { state: true }, // what's in the page (page-report.js), once read
      _revisions: { state: true },
    };
  }

  constructor() {
    super();
    this.open = false;
    this._values = {};
    this.__keys = (e) => {
      // Esc in the icon picker closes the picker, not this
      if (this.open && e.key === "Escape" && !globalThis.document.querySelector("oer-icon-picker[open]")) {
        e.preventDefault();
        e.stopPropagation();
        this._close();
      }
    };
  }

  /** `onSaved({ pageType, description, fields })` runs after a save; `section` opens one (general, details, media…). */
  show(id, { onSaved = null, section = "general" } = {}) {
    this._onSaved = onSaved;
    const items = toJS(store.manifest?.items) || [];
    const item = items.find((i) => i.id === id);
    if (!item) return;
    this._item = item;
    this._items = items;
    this._section = SECTIONS.some(([k]) => k === section) ? section : "general";
    this._title = item.title || "";
    this._slugTail = String(item.slug || "").split("/").pop();
    this._slugEdited = false;
    this._icon = pageIcon(item);
    this._report = null;
    this._revisions = null;
    pageHtml(item).then((text) => {
      if (this._item?.id === id) this._report = pageReport(parsePage(text));
    });
    this._loadRevisions(id);
    const parent = item.parent ? items.find((i) => i.id === item.parent) : null;
    this._allowed = allowedChildTypes(parent?.metadata?.pageType || null, items);
    this._allTypes = contentTypes(items).types;
    this._type = item.metadata?.pageType || "";
    this._desc = item.description || "";
    this._tags = tagsOf(item);
    this._tagDraft = "";
    // tags used across the site, most used first (suggestions)
    const count = new Map();
    for (const i of items) for (const t of tagsOf(i)) count.set(t, (count.get(t) || 0) + 1);
    this._tagsInUse = [...count.keys()].sort((a, b) => count.get(b) - count.get(a) || a.localeCompare(b));
    this._values = { ...(item.metadata?.oerFields || {}) };
    // empty fields start from their type's defaults
    const def = contentTypes(items).types.find((t) => t.id === item.metadata?.pageType);
    for (const f of def?.fields || []) {
      if (f.default !== undefined && f.default !== "" && (this._values[f.name] === undefined || this._values[f.name] === "")) {
        this._values[f.name] = f.kind === "list" || (f.kind === "select" && f.multiple) ? String(f.default).split(",").map((s) => s.trim()) : f.default;
      }
    }
    this._tried = false;
    this._saving = false;
    // licence and media names for the AIUL picker
    loadAiul().then((d) => {
      this._aiul = d;
      this.requestUpdate();
    });
    this.open = true;
    globalThis.addEventListener("keydown", this.__keys, true);
    this.updateComplete.then(() => this.shadowRoot.querySelector("select, input, textarea")?.focus());
  }

  _close() {
    this.open = false;
    globalThis.removeEventListener("keydown", this.__keys, true);
  }

  get _typeDef() {
    return this._allTypes?.find((t) => t.id === this._type) || null;
  }

  _set(name, value) {
    this._values = { ...this._values, [name]: value };
  }

  // add a tag, in the spelling the site already uses if it has one
  // ("blender" → "Blender"), never twice
  _addTag(raw) {
    const t = String(raw || "").replace(/,/g, " ").replace(/\s+/g, " ").trim();
    this._tagDraft = "";
    // the box's value, too (lit sees "" → "" as no change)
    const box = this.shadowRoot?.getElementById("ptags");
    if (box) box.value = "";
    if (!t) return;
    const known = (this._tagsInUse || []).find((x) => x.toLowerCase() === t.toLowerCase()) || t;
    if (!this._tags.some((x) => x.toLowerCase() === known.toLowerCase())) this._tags = [...this._tags, known];
  }

  _removeTag(t) {
    this._tags = this._tags.filter((x) => x !== t);
    this.shadowRoot.getElementById("ptags")?.focus();
  }

  _renderTags() {
    const lower = new Set(this._tags.map((t) => t.toLowerCase()));
    return html`<div>
      <label for="ptags">Tags</label>
      ${this._tags.length
        ? html`<ul class="tags" aria-label="Tags on this page">
            ${this._tags.map(
              (t) => html`<li class="tag">
                <span>${t}</span
                ><button type="button" class="tag-x" aria-label="Remove tag ${t}" title="Remove" @click="${() => this._removeTag(t)}">${lucide("oer:x", "sm")}</button>
              </li>`,
            )}
          </ul>`
        : ""}
      <input
        id="ptags"
        class="input"
        list="ptags-used"
        autocomplete="off"
        aria-describedby="ptags-help"
        placeholder="${this._tags.length ? "Add another tag" : "Add a tag"}"
        .value="${this._tagDraft}"
        @input="${(e) => {
          const v = e.target.value;
          // a suggestion picked from the list arrives whole: add it
          if (!e.inputType || e.inputType === "insertReplacementText") {
            if ((this._tagsInUse || []).includes(v)) return this._addTag(v);
          }
          if (v.includes(",")) return v.split(",").forEach((t) => this._addTag(t));
          this._tagDraft = v;
        }}"
        @keydown="${(e) => {
          if (e.key === "Enter" && this._tagDraft.trim()) {
            e.preventDefault();
            e.stopPropagation();
            this._addTag(this._tagDraft);
          }
        }}"
      />
      <datalist id="ptags-used">${(this._tagsInUse || []).filter((t) => !lower.has(t.toLowerCase())).map((t) => html`<option value="${t}"></option>`)}</datalist>
      <p class="hint" id="ptags-help">Press Enter or type a comma to add a tag. Suggestions are tags other pages use. Used for filtering collections and in search.</p>
    </div>`;
  }

  _missing() {
    return (this._typeDef?.fields || []).filter((f) => f.required && empty(this._values[f.name]));
  }

  async _save() {
    this._tried = true;
    if (this._missing().length) this._section = "details";
    if (!this._title.trim()) this._section = "general";
    if (this._missing().length || !this._title.trim() || this._saving) return;
    this._saving = true;
    // keep only this type's fields; tidy list entries
    const fields = {};
    for (const f of this._typeDef?.fields || []) {
      let v = this._values[f.name];
      if (f.kind === "list") v = (v || []).map((x) => String(x).trim()).filter(Boolean);
      if (f.kind === "select" && f.multiple) v = (f.options || []).map((o) => o.value).filter((x) => toArray(v).includes(x));
      if (f.kind === "relation") v = (Array.isArray(v) ? v : []).filter((x) => x?.page).map((x) => ({ page: x.page, version: x.version || "" }));
      if (f.kind === "files") {
        v = (Array.isArray(v) ? v : [])
          .map((x) => ({ title: (x.title || "").trim(), url: (x.url || "").trim(), description: (x.description || "").trim(), alt: (x.alt || "").trim() }))
          .filter((x) => x.url || x.title);
      }
      if (f.kind === "people") {
        v = peopleOf(v)
          .map((x) => ({ name: x.name.trim(), url: (x.url || "").trim(), ...(x.affiliation?.trim() ? { affiliation: x.affiliation.trim() } : {}) }))
          .filter((x) => x.name);
      }
      if (f.kind === "number" && v !== "" && v !== undefined) v = Number(v);
      if (!empty(v) || f.kind === "boolean") fields[f.name] = f.kind === "boolean" ? !!v : v;
    }
    // a tag typed but not yet added still counts
    this._addTag(this._tagDraft);
    const tags = this._tags;
    // the address, when set by hand: its parent's part, then the new end
    const prefix = String(this._item.slug || "").split("/").slice(0, -1).join("/");
    const tail = slugify(this._slugTail);
    const slug = this._slugEdited && tail && tail !== String(this._item.slug || "").split("/").pop() ? (prefix ? `${prefix}/${tail}` : tail) : "";
    await savePageDetails(this._item.id, { pageType: this._type, description: this._desc.trim(), fields, tags, title: this._title.trim(), slug, icon: this._icon });
    this._onSaved?.({ pageType: this._type, description: this._desc.trim(), fields, tags });
    this._saving = false;
    this._close();
  }

  static get styles() {
    return [formControls, css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10000;
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
        background: rgb(0 0 0 / 0.5);
      }
      .dialog {
        position: relative;
        display: flex;
        flex-direction: column;
        width: min(60rem, calc(100vw - 2rem));
        height: min(44rem, calc(100dvh - 2rem));
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        overflow: hidden;
      }
      button,
      input,
      select,
      textarea {
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
      .sm {
        width: 0.875rem;
        height: 0.875rem;
      }
      header {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        padding: 1rem 0.75rem 1rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      .heading {
        flex: 1;
      }
      h2 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
      }
      .sub {
        margin: 0.125rem 0 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .x {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .x:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      /* sections down the left, the open one on the right */
      .split {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: 12rem minmax(0, 1fr);
      }
      .sections {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        padding: 0.75rem 0.5rem;
        border-right: 1px solid var(--border);
        background: var(--card, var(--background));
        overflow-y: auto;
      }
      .sections [role="tab"] {
        all: unset;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.625rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .sections [role="tab"]:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .sections [role="tab"][aria-selected="true"] {
        background: var(--background);
        color: var(--foreground);
        font-weight: 500;
        box-shadow: 0 0 0 1px var(--border);
      }
      .sections [role="tab"]:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .sections span:not(.lucide) {
        flex: 1;
      }
      .dot-warn {
        flex: none !important;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 999px;
        background: var(--destructive);
      }
      .count {
        flex: none !important;
        min-width: 1.25rem;
        padding: 0 0.375rem;
        border-radius: 999px;
        background: color-mix(in oklab, var(--destructive) 14%, transparent);
        color: var(--destructive);
        font-size: 0.75rem;
        font-weight: 600;
        text-align: center;
      }
      .body {
        overflow-y: auto;
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 1.125rem;
      }
      .muted {
        margin: 0;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      .hint.tight {
        margin-top: -0.75rem;
      }
      .address {
        display: flex;
        align-items: center;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
      }
      .address:focus-within {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .prefix {
        flex: 0 0 auto;
        padding-left: 0.75rem;
        font-size: 0.875rem;
        color: var(--muted-foreground);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 45%;
      }
      .status.info {
        color: var(--muted-foreground);
      }
      .address .input {
        border: 0;
        padding-left: 0.125rem;
        box-shadow: none;
        outline: none;
      }
      .row {
        display: flex;
        gap: 0.75rem;
        align-items: flex-end;
      }
      .row .grow {
        flex: 1;
      }
      .icon-choice {
        display: inline-grid;
        place-items: center;
        width: 2.25rem;
        height: 2.25rem;
        padding: 0;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        cursor: pointer;
        --simple-icon-width: 1.125rem;
        --simple-icon-height: 1.125rem;
      }
      .icon-choice:hover {
        background: var(--accent);
      }
      .icon-choice .none {
        font-size: 0.6875rem;
        color: var(--muted-foreground);
      }
      .summary-line {
        margin: 0;
        font-size: 0.875rem;
      }
      .warn-text {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        color: var(--destructive);
      }
      .media,
      .kids,
      .rows,
      .outline {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .media li {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--border);
      }
      .thumb {
        flex: none;
        display: grid;
        place-items: center;
        width: 3.5rem;
        height: 2.625rem;
        overflow: hidden;
        border: 1px solid var(--border);
        border-radius: var(--radius-sm, 0.375rem);
        background: var(--muted);
        color: var(--muted-foreground);
      }
      .thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .media-text {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .media-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.875rem;
        font-weight: 500;
      }
      .media-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem 0.75rem;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .kind {
        font-size: 0.75rem;
        color: var(--muted-foreground);
        text-transform: capitalize;
      }
      .trail {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.375rem;
        margin: 0;
        font-size: 0.875rem;
      }
      .trail a,
      .kids a,
      .rows a {
        color: var(--link);
      }
      .kids li,
      .rows li {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.25rem 0.625rem;
        padding: 0.4375rem 0;
        border-bottom: 1px solid var(--border);
        font-size: 0.875rem;
        --simple-icon-width: 1rem;
        --simple-icon-height: 1rem;
      }
      .kids .dot {
        width: 1rem;
      }
      .row-note {
        flex-basis: 100%;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .badge {
        padding: 0 0.4375rem;
        border-radius: 999px;
        border: 1px solid var(--border);
        font-size: 0.6875rem;
        color: var(--muted-foreground);
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.625rem;
      }
      .actions .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
      }
      .metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
        gap: 0.75rem;
        margin: 0;
      }
      .metrics div {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        padding: 0.75rem 0.875rem;
        border-radius: var(--radius-md);
        background: var(--muted);
      }
      .metrics dt {
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .metrics dd {
        margin: 0;
        font-size: 1.375rem;
        font-weight: 600;
      }
      .metric-note {
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .outline li {
        display: flex;
        gap: 0.5rem;
        align-items: baseline;
        padding: 0.25rem 0;
        font-size: 0.875rem;
      }
      .lvl {
        flex: none;
        font-size: 0.6875rem;
        font-weight: 600;
        color: var(--muted-foreground);
      }
      @media (max-width: 700px) {
        .split {
          grid-template-columns: minmax(0, 1fr);
          grid-template-rows: auto minmax(0, 1fr);
        }
        .sections {
          flex-direction: row;
          overflow-x: auto;
          border-right: 0;
          border-bottom: 1px solid var(--border);
        }
        .sections [role="tab"] {
          flex: none;
        }
      }
      label,
      .label {
        display: block;
        margin-bottom: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
      }
      .req {
        color: var(--destructive);
      }
      .hint {
        margin: 0.375rem 0 0;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      oer-image-field {
        margin-top: 0.5rem;
      }
      .err {
        margin: 0.375rem 0 0;
        font-size: 0.75rem;
        color: var(--destructive);
      }
      .input,
      select,
      textarea {
        box-sizing: border-box;
        width: 100%;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        font-size: 0.875rem;
      }
      textarea {
        height: auto;
        min-height: 5rem;
        padding: 0.5rem 0.75rem;
        resize: vertical;
      }
      .invalid {
        border-color: var(--destructive);
      }
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        margin: 0 0 0.5rem;
        padding: 0;
        list-style: none;
      }
      .tag {
        display: inline-flex;
        align-items: center;
        gap: 0.125rem;
        padding: 0.125rem 0.125rem 0.125rem 0.625rem;
        border: 1px solid var(--border);
        border-radius: 999px;
        background: var(--muted);
        color: var(--foreground);
        font-size: 0.8125rem;
        line-height: 1.5;
      }
      .tag-x {
        display: inline-grid;
        place-items: center;
        width: 1.5rem;
        height: 1.5rem;
        padding: 0;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .tag-x:hover {
        background: var(--accent, var(--muted));
        color: var(--foreground);
      }
      .choices {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem 1.25rem;
        margin-top: 0.25rem;
      }
      .check {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      input[type="checkbox"] {
        width: 1rem;
        height: 1rem;
        margin: 0;
        accent-color: var(--primary);
      }
      .sep {
        height: 1px;
        background: var(--border);
      }
      .list {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      .aiul-picker {
        display: flex;
        flex-direction: column;
        gap: 0.625rem;
        margin-top: 0.25rem;
      }
      .aiul-selects {
        display: grid;
        grid-template-columns: minmax(0, 3fr) minmax(0, 2fr) auto;
        gap: 0.375rem;
        align-items: center;
      }
      @media (max-width: 480px) {
        .aiul-selects {
          grid-template-columns: minmax(0, 1fr) auto;
        }
        .aiul-selects select + select {
          grid-row: 2;
        }
      }
      .aiul-hint {
        margin: 0.25rem 0 0 !important;
      }
      .aiul-hint code {
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.6875rem;
        font-weight: 600;
        color: var(--foreground);
      }
      .err-inline {
        color: var(--destructive);
      }
      .list-row {
        display: flex;
        gap: 0.375rem;
      }
      .list-row oer-choice-field {
        flex: 1;
        min-width: 0;
      }
      .icon-act {
        all: unset;
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.25rem;
        height: 2.25rem;
        border-radius: var(--radius-md);
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .icon-act:hover {
        background: var(--accent);
        color: var(--destructive);
      }
      .links,
      .files {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      .link-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.375rem 0.375rem 0.375rem 0.625rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        --simple-icon-height: 1rem;
        --simple-icon-width: 1rem;
      }
      .link-title {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        font-size: 0.875rem;
        font-weight: 500;
      }
      .link-title small {
        font-size: 0.75rem;
        font-weight: 400;
        color: var(--muted-foreground);
      }
      .link-row select {
        width: auto;
        height: 2rem;
        font-size: 0.8125rem;
      }
      .icon-act[disabled] {
        opacity: 0.35;
        cursor: default;
      }
      .file-row {
        display: flex;
        gap: 0.375rem;
        margin: 0;
        padding: 0.625rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
      }
      .file-grid {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        min-width: 0;
      }
      .url-row {
        display: flex;
        gap: 0.375rem;
      }
      .upload {
        flex: none;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2.25rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        font-size: 0.8125rem;
        font-weight: 500;
        cursor: pointer;
      }
      .upload:hover {
        background: var(--accent);
      }
      .upload:focus-within {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .upload input {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
      }
      .add-item {
        all: unset;
        align-self: flex-start;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2rem;
        padding: 0 0.625rem;
        border-radius: var(--radius-md);
        font-size: 0.8125rem;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .add-item:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .notype {
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      footer {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-top: 1px solid var(--border);
      }
      .status {
        flex: 1;
        font-size: 0.8125rem;
        color: var(--destructive);
      }
      .btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        height: 2.25rem;
        padding: 0 1rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      .people {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      .person-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto auto;
        gap: 0.375rem;
        align-items: center;
      }
      /* the affiliation sits under the name and link */
      .person-row .affiliation {
        grid-column: 1 / 3;
      }
      @media (max-width: 480px) {
        .person-row {
          grid-template-columns: minmax(0, 1fr) auto auto;
        }
        .person-row input[type="url"] {
          grid-column: 1;
          grid-row: 2;
        }
        .person-row .affiliation {
          grid-column: 1;
          grid-row: 3;
        }
      }
      .btn.outline {
        border: 1px solid var(--input-border, var(--border));
      }
      .btn.outline:hover {
        background: var(--accent);
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .btn[aria-disabled="true"] {
        opacity: 0.5;
        cursor: default;
      }
    `];
  }

  // a list field's choices: values other pages use, plus a source field's
  // values (suggestFrom "oer:course:code": the codes of the Course pages)
  _listChoices(f) {
    const items = toJS(store.manifest?.items) || [];
    const extra = [];
    if (f.suggestFrom) {
      const at = f.suggestFrom.lastIndexOf(":");
      extra.push(...valuesInUse(items, f.suggestFrom.slice(0, at), f.suggestFrom.slice(at + 1)));
    }
    return [...new Set([...extra, ...valuesInUse(items, "", f.name)])];
  }

  _renderField(f) {
    const id = `f-${f.name}`;
    const v = this._values[f.name];
    const invalid = this._tried && f.required && empty(v);
    const label = html`<label for="${id}">${f.label}${f.required ? html` <span class="req" aria-hidden="true">*</span>` : ""}</label>`;
    const help = f.help ? html`<p class="hint" id="${id}-help">${f.help}</p>` : "";
    const err = invalid ? html`<p class="err">${f.label} is required.</p>` : "";
    const common = { id, invalid };
    let control;
    switch (f.kind) {
      case "image":
        // the image with its description (the type's `<name>Alt` field, drawn here, not on its own)
        return html`<div>
          <span class="label" id="${id}-l">${f.label}${f.required ? html` <span class="req">*</span>` : ""}</span>
          ${help}
          <oer-image-field
            field-id="${id}"
            label="${f.label}"
            aria-labelledby="${id}-l"
            .value="${v || ""}"
            .alt="${this._values[`${f.name}Alt`] || ""}"
            @image-change="${(e) => {
              this._set(f.name, e.detail.value);
              this._set(`${f.name}Alt`, e.detail.alt);
            }}"
          ></oer-image-field>
          ${err}
        </div>`;
      case "longtext":
        control = html`<textarea id="${id}" class="${invalid ? "invalid" : ""}" .value="${v || ""}" @input="${(e) => this._set(f.name, e.target.value)}"></textarea>`;
        break;
      case "select":
        if (isAiulField(f)) {
          return html`<div>
            <span class="label" id="${id}-l">${f.label}${f.required ? html` <span class="req" aria-hidden="true">*</span>` : ""}</span>
            ${this._renderAiulPicker(f)}${help}${err}
          </div>`;
        }
        if (f.multiple) {
          const on = toArray(v);
          return html`<div>
            <span class="label" id="${id}-l">${f.label}${f.required ? html` <span class="req" aria-hidden="true">*</span>` : ""}</span>
            <div class="choices" role="group" aria-labelledby="${id}-l">
              ${(f.options || []).map(
                (o) => html`<label class="check"
                  ><input
                    type="checkbox"
                    .checked="${on.includes(o.value)}"
                    @change="${(e) => this._set(f.name, e.target.checked ? [...on, o.value] : on.filter((x) => x !== o.value))}"
                  />${o.label}</label
                >`,
              )}
            </div>
            ${help}${err}
          </div>`;
        }
        control = html`<select id="${id}" class="${invalid ? "invalid" : ""}" @change="${(e) => this._set(f.name, e.target.value)}">
          <option value="" ?selected="${!v}">—</option>
          ${(f.options || []).map((o) => html`<option value="${o.value}" ?selected="${o.value === v}">${o.label}</option>`)}
        </select>`;
        break;
      case "boolean":
        return html`<div>
          <label class="check"><input id="${id}" type="checkbox" .checked="${!!v}" @change="${(e) => this._set(f.name, e.target.checked)}" />${f.label}</label>
          ${help}
        </div>`;
      case "relation":
        return html`<div><span class="label" id="${id}-l">${f.label}${f.required ? html` <span class="req">*</span>` : ""}</span>${this._renderRelation(f)}${help}${err}</div>`;
      case "people":
        return html`<div><span class="label" id="${id}-l">${f.label}${f.required ? html` <span class="req">*</span>` : ""}</span>${this._renderPeople(f)}${help}${err}</div>`;
      case "files":
        return html`<div><span class="label" id="${id}-l">${f.label}${f.required ? html` <span class="req">*</span>` : ""}</span>${this._renderFiles(f)}${help}${err}</div>`;
      case "list": {
        const list = Array.isArray(v) ? v : v ? [v] : [];
        const rows = list.length ? list : [""];
        // "pick from values other pages use": each entry is a dropdown
        const choices = f.suggest ? this._listChoices(f) : null;
        control = html`<div class="list" role="group" aria-labelledby="${id}-l">
          ${rows.map(
            (x, i) => html`<div class="list-row">
              ${choices
                ? html`<oer-choice-field
                    field-id="${i === 0 ? id : `${id}-${i}`}"
                    label="${f.label} ${i + 1}"
                    new-label="New ${f.label.toLowerCase().replace(/s$/, "")}…"
                    .options="${choices}"
                    .value="${x}"
                    @value-changed="${(e) => {
                      const next = [...rows];
                      next[i] = e.detail.value;
                      this._set(f.name, next);
                    }}"
                  ></oer-choice-field>`
                : html`<input
                class="input ${invalid ? "invalid" : ""}"
                id="${i === 0 ? id : `${id}-${i}`}"
                aria-label="${f.label} ${i + 1}"
                .value="${x}"
                @input="${(e) => {
                  const next = [...rows];
                  next[i] = e.target.value;
                  this._set(f.name, next);
                }}"
                @keydown="${(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const next = [...rows];
                    next.splice(i + 1, 0, "");
                    this._set(f.name, next);
                    this.updateComplete.then(() => this.shadowRoot.getElementById(`${id}-${i + 1}`)?.focus());
                  }
                }}"
              />`}
              <button
                class="icon-act"
                title="Remove"
                aria-label="Remove ${f.label} ${i + 1}"
                @click="${() => this._set(f.name, rows.filter((_, j) => j !== i))}"
              >
                ${lucide("oer:x", "sm")}
              </button>
            </div>`,
          )}
          <button class="add-item" @click="${() => this._set(f.name, [...rows, ""])}">${lucide("oer:plus", "sm")}Add ${f.label.toLowerCase()}</button>
        </div>`;
        return html`<div><span class="label" id="${id}-l">${f.label}${f.required ? html` <span class="req">*</span>` : ""}</span>${control}${help}${err}</div>`;
      }
      case "text":
        if (f.suggest) {
          control = html`<oer-choice-field
            field-id="${id}"
            new-label="New ${f.label.toLowerCase()}…"
            .options="${valuesInUse(toJS(store.manifest?.items), this._type, f.name)}"
            .value="${v ?? ""}"
            ?invalid="${common.invalid}"
            @value-changed="${(e) => this._set(f.name, e.detail.value)}"
          ></oer-choice-field>`;
          break;
        }
      // falls through
      default: {
        const type = { number: "number", date: "date", url: "url" }[f.kind] || "text";
        const val = f.kind === "date" && v ? String(v).slice(0, 10) : (v ?? "");
        control = html`<input id="${id}" class="input ${common.invalid ? "invalid" : ""}" type="${type}" .value="${val}" @input="${(e) => this._set(f.name, e.target.value)}" />`;
      }
    }
    return html`<div>${label}${control}${help}${err}</div>`;
  }

  /* ---------- AI Usage Licenses: licence + optional media per row ---------- */

  _renderAiulPicker(f) {
    const id = `f-${f.name}`;
    const codes = toArray(this._values[f.name]);
    const valid = new Set((f.options || []).map((o) => o.value));
    // the licences and media the field's options allow, in option order
    const lics = [];
    const mods = [];
    for (const o of f.options) {
      const [, l, m] = o.value.match(AIUL_CODE) || [];
      if (l && !lics.includes(l.toUpperCase())) lics.push(l.toUpperCase());
      if (m && !mods.includes(m.toUpperCase())) mods.push(m.toUpperCase());
    }
    const licName = (l) => aiulInfo(`AIUL-${l}`, this._aiul).name;
    const modName = (m) => this._aiul?.modifiers?.find((x) => x.code === m)?.title || m;
    const set = (next) => this._set(f.name, next);
    const rows = codes.map((code) => {
      const [, l = "", m = ""] = code.match(AIUL_CODE) || [];
      return { code, l: l.toUpperCase(), m: m.toUpperCase() };
    });
    const build = (l, m) => `AIUL-${l}${m ? `-${m}` : ""}`;
    const update = (i, l, m) => {
      const next = [...codes];
      next[i] = valid.has(build(l, m)) ? build(l, m) : build(l, "");
      set(next);
    };
    const firstFree = () => {
      for (const l of lics) if (!codes.includes(build(l, ""))) return build(l, "");
      return build(lics[0], mods[0] || "");
    };
    return html`<div class="aiul-picker" role="group" aria-labelledby="${id}-l">
      ${rows.map((r, i) => {
        const info = aiulInfo(r.code, this._aiul);
        const dup = codes.indexOf(r.code) !== i;
        return html`<div class="aiul-row">
          <div class="aiul-selects">
            <select
              id="${i === 0 ? id : `${id}-${i}`}"
              aria-label="${f.label} ${i + 1}: license"
              @change="${(e) => update(i, e.target.value, r.m)}"
            >
              ${lics.map((l) => html`<option value="${l}" ?selected="${l === r.l}">AIUL-${l}${licName(l) ? ` · ${licName(l)}` : ""}</option>`)}
            </select>
            <select aria-label="${f.label} ${i + 1}: media" @change="${(e) => update(i, r.l, e.target.value)}">
              <option value="" ?selected="${!r.m}">All media</option>
              ${mods.filter((m) => valid.has(build(r.l, m))).map((m) => html`<option value="${m}" ?selected="${m === r.m}">${modName(m)} only</option>`)}
            </select>
            <button class="icon-act" title="Remove" aria-label="Remove ${r.code}" @click="${() => set(codes.filter((_, j) => j !== i))}">${lucide("oer:x", "sm")}</button>
          </div>
          <p class="hint aiul-hint">
            <code>${r.code}</code> ${info.description}${dup ? html` <span class="err-inline">Listed twice.</span>` : ""}
          </p>
        </div>`;
      })}
      <button
        class="add-item"
        @click="${() => {
          set([...codes, firstFree()]);
          this.updateComplete.then(() => this.shadowRoot.getElementById(`${id}-${codes.length}`)?.focus() || this.shadowRoot.getElementById(id)?.focus());
        }}"
      >
        ${lucide("oer:plus", "sm")}Add AI usage license
      </button>
    </div>`;
  }

  /* ---------- relation: links to other pages ---------- */

  async _addLinks(f) {
    const current = Array.isArray(this._values[f.name]) ? this._values[f.name] : [];
    const typeLabels = (f.types || []).map((t) => this._allTypes.find((x) => x.id === t)?.label).filter(Boolean);
    const choice = await pagePicker().pick({
      exclude: [this._item.id, ...current.map((c) => c.page)],
      types: f.types,
      children: false,
      title: `Add to ${f.label}`,
      hint: typeLabels.length ? `Choose a page: ${typeLabels.join(", ")}.` : "Choose any page. Pin a released version to keep linking to it as it is now.",
    });
    if (choice) this._set(f.name, [...current, { page: choice.page.id, version: choice.version || "" }]);
  }

  _renderRelation(f) {
    const value = Array.isArray(this._values[f.name]) ? this._values[f.name] : [];
    const links = resolveLinks(value);
    const update = (fn) => {
      const next = [...value];
      fn(next);
      this._set(f.name, next);
    };
    return html`<div class="links" role="list">
      ${links.map((l, i) => {
        const type = this._allTypes.find((t) => t.id === l.item?.metadata?.pageType);
        const releases = l.item ? versionsOf(l.item.id) : [];
        return html`<div class="link-row" role="listitem">
          ${type?.icon ? html`<simple-icon-lite icon="${type.icon}"></simple-icon-lite>` : lucide("lrn:page", "sm")}
          <span class="link-title">${l.item ? l.item.title : html`<em>Missing page</em>`}<small>${type?.label || ""}</small></span>
          ${releases.length
            ? html`<select aria-label="Version of ${l.item.title}" @change="${(e) => update((n) => (n[i] = { ...n[i], version: e.target.value }))}">
                <option value="" ?selected="${!l.version}">Latest</option>
                ${releases.map((r) => html`<option value="${r.version}" ?selected="${r.version === l.version}">v${r.version}</option>`)}
              </select>`
            : ""}
          <button class="icon-act" title="Move up" aria-label="Move ${l.item?.title || "link"} up" ?disabled="${i === 0}" @click="${() => update((n) => n.splice(i - 1, 0, n.splice(i, 1)[0]))}">
            ${lucide("icons:arrow-upward", "sm")}
          </button>
          <button class="icon-act" title="Remove" aria-label="Remove ${l.item?.title || "link"}" @click="${() => update((n) => n.splice(i, 1))}">${lucide("oer:x", "sm")}</button>
        </div>`;
      })}
      <button class="add-item" @click="${() => this._addLinks(f)}">${lucide("oer:plus", "sm")}Add ${f.label.toLowerCase()}</button>
    </div>`;
  }

  /* ---------- people: name and optional link, in order ---------- */

  _renderPeople(f) {
    const id = `f-${f.name}`;
    const stored = peopleOf(this._values[f.name]);
    const rows = stored.length ? stored : [{ name: "", url: "" }];
    // optional, for materials contributed from more than one university
    const institutions = institutionsOf(toJS(store.manifest?.items) || []);
    const update = (fn) => {
      const next = rows.map((r) => ({ ...r }));
      fn(next);
      this._set(f.name, next);
    };
    return html`<div class="people" role="group" aria-labelledby="${id}-l">
      ${rows.map(
        (r, i) => html`<div class="person-row">
          <input
            class="input"
            id="${i === 0 ? id : `${id}-${i}`}"
            placeholder="Name"
            aria-label="${f.label} ${i + 1}: name"
            .value="${r.name}"
            @input="${(e) => update((n) => (n[i].name = e.target.value))}"
          />
          <input
            class="input"
            type="url"
            placeholder="Link (optional)"
            aria-label="${f.label} ${i + 1}: link"
            .value="${r.url || ""}"
            @input="${(e) => update((n) => (n[i].url = e.target.value))}"
          />
          <button class="icon-act" title="Move up" aria-label="Move ${r.name || `person ${i + 1}`} up" ?disabled="${i === 0}" @click="${() => update((n) => n.splice(i - 1, 0, n.splice(i, 1)[0]))}">
            ${lucide("icons:arrow-upward", "sm")}
          </button>
          <button class="icon-act" title="Remove" aria-label="Remove ${r.name || `person ${i + 1}`}" @click="${() => update((n) => n.splice(i, 1))}">${lucide("oer:x", "sm")}</button>
          <oer-choice-field
            class="affiliation"
            label="${f.label} ${i + 1}: university or affiliation"
            new-label="Other university…"
            empty-label="University (optional)"
            .options="${institutions}"
            .value="${r.affiliation || ""}"
            @value-changed="${(e) => update((n) => (n[i].affiliation = e.detail.value))}"
          ></oer-choice-field>
        </div>`,
      )}
      <button
        class="add-item"
        @click="${() => {
          update((n) => n.push({ name: "", url: "" }));
          this.updateComplete.then(() => this.shadowRoot.getElementById(`${id}-${rows.length}`)?.focus());
        }}"
      >
        ${lucide("oer:plus", "sm")}Add person
      </button>
    </div>`;
  }

  /* ---------- files: attachments (file or external link) ---------- */

  async _upload(f, i, input) {
    const file = input.files?.[0];
    if (!file) return;
    const rows = [...(this._values[f.name] || [])];
    rows[i] = { ...rows[i], uploading: true };
    this._set(f.name, rows);
    try {
      const url = await uploadFile(file);
      const next = [...(this._values[f.name] || [])];
      next[i] = { ...next[i], url, title: next[i].title || file.name.replace(/\.[^.]+$/, ""), uploading: false, error: "" };
      this._set(f.name, next);
    } catch (err) {
      const next = [...(this._values[f.name] || [])];
      next[i] = { ...next[i], uploading: false, error: err.message };
      this._set(f.name, next);
    }
    input.value = "";
  }

  _renderFiles(f) {
    const rows = Array.isArray(this._values[f.name]) ? this._values[f.name] : [];
    const set = (i, patch) => {
      const next = [...rows];
      next[i] = { ...next[i], ...patch };
      this._set(f.name, next);
    };
    return html`<div class="files">
      ${rows.map(
        (r, i) => html`<fieldset class="file-row">
          <legend class="sr">${f.label} ${i + 1}</legend>
          <div class="file-grid">
            <input class="input" placeholder="Title" aria-label="Title" .value="${r.title || ""}" @input="${(e) => set(i, { title: e.target.value })}" />
            <div class="url-row">
              <input class="input" placeholder="File or link address" aria-label="File or link address" .value="${r.url || ""}" @input="${(e) => set(i, { url: e.target.value })}" />
              <label class="upload">
                ${lucide("icons:file-upload", "sm")}${r.uploading ? "Uploading…" : "Upload"}
                <input type="file" @change="${(e) => this._upload(f, i, e.target)}" />
              </label>
            </div>
            <input class="input" placeholder="Description (optional)" aria-label="Description" .value="${r.description || ""}" @input="${(e) => set(i, { description: e.target.value })}" />
            ${isImage(r.url)
              ? html`<input class="input" placeholder="Alt text for the image" aria-label="Alt text" .value="${r.alt || ""}" @input="${(e) => set(i, { alt: e.target.value })}" />`
              : ""}
            ${r.error ? html`<p class="err">${r.error}</p>` : ""}
          </div>
          <button class="icon-act" title="Remove" aria-label="Remove ${r.title || "file"}" @click="${() => this._set(f.name, rows.filter((_, j) => j !== i))}">${lucide("oer:x", "sm")}</button>
        </fieldset>`,
      )}
      <button class="add-item" @click="${() => this._set(f.name, [...rows, { title: "", url: "", description: "", alt: "" }])}">
        ${lucide("oer:plus", "sm")}Add file or link
      </button>
    </div>`;
  }

  async _loadRevisions(id) {
    try {
      const headers = store.jwt ? { Authorization: `Bearer ${store.jwt}` } : {};
      const res = await fetch(new URL(`x/api/v1/items/${encodeURIComponent(id)}/revisions?page.limit=8`, globalThis.document.baseURI), { headers, credentials: "same-origin" });
      const json = await res.json().catch(() => null);
      if (this._item?.id === id) this._revisions = res.ok ? json?.data || { revisions: [], total: 0 } : { revisions: [], total: 0, error: true };
    } catch {
      if (this._item?.id === id) this._revisions = { revisions: [], total: 0, error: true };
    }
  }

  // leave the dialog for another tool (the outline builder, Versions…)
  _then(fn) {
    this._close();
    fn();
  }

  async _pickIcon() {
    const name = await iconPicker().pick(this._icon);
    if (name !== null) this._icon = name;
  }

  // arrow keys move between sections, as in a tab list
  _navKeys(e) {
    const keys = { ArrowDown: 1, ArrowUp: -1, ArrowRight: 1, ArrowLeft: -1, Home: -99, End: 99 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const ids = SECTIONS.map(([k]) => k);
    const i = ids.indexOf(this._section);
    const next = keys[e.key] === -99 ? 0 : keys[e.key] === 99 ? ids.length - 1 : (i + keys[e.key] + ids.length) % ids.length;
    this._section = ids[next];
    this.updateComplete.then(() => this.shadowRoot.querySelector(`#tab-${ids[next]}`)?.focus());
  }

  /* ---------- General ---------- */

  _renderGeneral(options, def) {
    const prefix = String(this._item.slug || "").split("/").slice(0, -1).join("/");
    const custom = !!this._item.metadata?.overridePathauto;
    const noTitle = this._tried && !this._title.trim();
    return html`
      <div>
        <label for="ptitle">Title <span class="req" aria-hidden="true">*</span></label>
        <input id="ptitle" class="input ${noTitle ? "invalid" : ""}" .value="${this._title}" @input="${(e) => (this._title = e.target.value)}" />
        ${noTitle ? html`<p class="err">The page needs a title.</p>` : ""}
      </div>
      <div>
        <label for="pslug">Address</label>
        <div class="address">
          <span class="prefix">/${prefix ? `${prefix}/` : ""}</span>
          <input
            id="pslug"
            class="input"
            aria-describedby="pslug-help"
            .value="${this._slugTail}"
            @input="${(e) => {
              this._slugTail = e.target.value;
              this._slugEdited = true;
            }}"
          />
        </div>
        <p class="hint" id="pslug-help">
          ${this._slugEdited
            ? html`Saved as <b>/${prefix ? `${prefix}/` : ""}${slugify(this._slugTail) || "…"}</b>, and kept when the title changes. Links to the old address stop working.`
            : custom
              ? "Set by hand, so it stays when the title changes."
              : "Made from the title: changing the title changes it, unless you set it here."}
        </p>
      </div>
      <div class="row">
        <div>
          <span class="label" id="picon-l">Icon</span>
          <button class="icon-choice" aria-labelledby="picon-l picon-v" @click="${this._pickIcon}">
            ${this._icon ? html`<simple-icon-lite icon="${this._icon}"></simple-icon-lite>` : html`<span class="none">None</span>`}
            <span class="sr" id="picon-v">${this._icon || "none"}, change</span>
          </button>
        </div>
        <div class="grow">
          <label for="ptype">Content type</label>
          <select id="ptype" @change="${(e) => (this._type = e.target.value)}">
            <option value="" ?selected="${!this._type}">No type</option>
            ${options.map((t) => html`<option value="${t.id}" ?selected="${t.id === this._type}">${t.label}</option>`)}
          </select>
        </div>
      </div>
      ${def?.description ? html`<p class="hint tight">${def.description}</p>` : ""}
      <div>
        <label for="pdesc">Description</label>
        <textarea id="pdesc" .value="${this._desc}" @input="${(e) => (this._desc = e.target.value)}"></textarea>
        <p class="hint">Shown under the title and in search results.</p>
      </div>
      ${this._renderTags()}
    `;
  }

  /* ---------- Media ---------- */

  _renderMedia() {
    const r = this._report;
    if (!r) return html`<p class="muted">Reading the page…</p>`;
    const images = r.media.filter((m) => m.kind === "image");
    if (!r.media.length) return html`<p class="muted">This page has no images, video, embeds or files in its content.</p>`;
    return html`
      <p class="summary-line">
        ${[images.length && `${images.length} image${images.length === 1 ? "" : "s"}`, r.media.length - images.length && `${r.media.length - images.length} other`].filter(Boolean).join(", ")}${r.missingAlt
          ? html`; <b class="warn-text">${r.missingAlt} without a description</b>`
          : images.length
            ? "; every image has a description"
            : ""}.
      </p>
      <ul class="media" aria-label="Media in this page">
        ${r.media.map(
          (m) => html`<li>
            <span class="thumb">${m.kind === "image" ? html`<img src="${m.src}" alt="" loading="lazy" />` : lucide(m.kind === "file" ? "oer:files" : m.kind === "video" ? "oer:eye" : "oer:link")}</span>
            <span class="media-text">
              <span class="media-name" title="${m.src}">${m.label || m.name}</span>
              <span class="media-meta">
                <span class="kind">${m.kind}</span>
                ${m.kind === "image"
                  ? m.needsAlt
                    ? html`<span class="warn-text">${lucide("oer:circle-alert", "sm")}No description</span>`
                    : html`<span>“${m.alt}”</span>`
                  : ""}
              </span>
            </span>
          </li>`,
        )}
      </ul>
      <p class="hint">To change one, use Edit content and choose its block. Images in this page's fields (such as a cover image) are under ${this._typeDef ? `${this._typeDef.label} details` : "Details"}.</p>
    `;
  }

  /* ---------- Structure ---------- */

  _renderStructure() {
    const items = this._items || [];
    const byId = new Map(items.map((i) => [i.id, i]));
    const trail = [];
    for (let p = byId.get(this._item.parent); p; p = byId.get(p.parent)) trail.unshift(p);
    const kids = items.filter((i) => i.parent === this._item.id && !i.metadata?.oerSnapshotOf).sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
    const typeLabel = (i) => this._allTypes?.find((t) => t.id === i.metadata?.pageType)?.label || "";
    return html`
      <div>
        <span class="label">Where it is</span>
        <p class="trail">
          ${trail.length ? trail.map((p) => html`<a href="${p.slug}" @click="${() => this._close()}">${p.title}</a><span aria-hidden="true">›</span>`) : html`<span class="muted">Top level</span><span aria-hidden="true">›</span>`}
          <b>${this._item.title}</b>
        </p>
        ${this._item.metadata?.hideInMenu ? html`<p class="hint">Not in the navigation: it's listed in Browse pages.</p>` : ""}
      </div>
      <div>
        <span class="label">${kids.length ? `${kids.length} sub-page${kids.length === 1 ? "" : "s"}` : "Sub-pages"}</span>
        ${kids.length
          ? html`<ul class="kids">
              ${kids.map(
                (k) => html`<li>
                  ${pageIcon(k) ? html`<simple-icon-lite icon="${pageIcon(k)}"></simple-icon-lite>` : html`<span class="dot" aria-hidden="true"></span>`}
                  <a href="${k.slug}" @click="${() => this._close()}">${k.title}</a>
                  ${typeLabel(k) ? html`<span class="kind">${typeLabel(k)}</span>` : ""}
                  ${k.metadata?.published === false ? html`<span class="badge">Draft</span>` : ""}
                </li>`,
              )}
            </ul>`
          : html`<p class="muted">None yet.</p>`}
      </div>
      <div class="actions">
        <button class="btn outline" @click="${() => this._then(() => outlineBuilder().show(this._item.id))}">${lucide("oer:list")}Edit page outline</button>
        <button class="btn outline" @click="${() => this._then(() => newPage().show({ parent: this._item.id }))}">${lucide("oer:plus")}Add a sub-page</button>
      </div>
      <p class="hint">Edit page outline arranges, renames and moves this page's sub-pages. To move this page itself, use Edit navigation or Site › Page tree.</p>
    `;
  }

  /* ---------- History ---------- */

  _renderHistory() {
    const versions = versionsOf(this._item.id, this._items || []);
    const rev = this._revisions;
    return html`
      <div>
        <span class="label">Versions</span>
        ${versions.length
          ? html`<ul class="rows">
              ${versions.slice(0, 5).map(
                (v) => html`<li>
                  <b>${v.version}</b><span class="muted">${day(v.date)}</span>${v.notes ? html`<span class="row-note">${v.notes}</span>` : ""}
                  ${v.snapshot ? html`<a href="${v.snapshot.slug}" @click="${() => this._close()}">Open</a>` : ""}
                </li>`,
              )}
            </ul>`
          : html`<p class="muted">No released versions. Releasing one freezes the page as it is, for pages and books that link to it.</p>`}
        <div class="actions">
          <button class="btn outline" @click="${() => this._then(() => versionsDialog().show(this._item.id, { publish: true }))}">${lucide("oer:clock")}Versions…</button>
        </div>
      </div>
      <div class="sep" role="separator"></div>
      <div>
        <span class="label">Revisions</span>
        <p class="hint tight">Every save, kept by the site's history.</p>
        ${!rev
          ? html`<p class="muted">Loading…</p>`
          : rev.error
            ? html`<p class="muted">The revisions couldn't be listed here.</p>`
            : rev.revisions?.length
              ? html`<ul class="rows">
                  ${rev.revisions.map((r) => html`<li><b>${day(r.date || r.timestamp)}</b><span>${revisionText(r.message)}</span><span class="muted">${r.author || ""}</span></li>`)}
                </ul>
                ${rev.total > rev.revisions.length ? html`<p class="hint">${rev.total - rev.revisions.length} older.</p>` : ""}`
              : html`<p class="muted">No revisions yet.</p>`}
        <div class="actions">
          <button
            class="btn outline"
            @click="${() =>
              this._then(() =>
                globalThis.dispatchEvent(new CustomEvent("haxcms-open-page-revisions", { bubbles: true, composed: true, cancelable: true, detail: { nodeId: this._item.id, nodeTitle: this._item.title, source: "page-details" } })),
              )}"
          >
            ${lucide("oer:copy")}Compare and restore…
          </button>
        </div>
      </div>
    `;
  }

  /* ---------- Report ---------- */

  _renderReport() {
    const r = this._report;
    if (!r) return html`<p class="muted">Reading the page…</p>`;
    const m = this._item.metadata || {};
    const active = store.activeId === this._item.id;
    return html`
      <dl class="metrics">
        <div><dt>Words</dt><dd>${r.words.toLocaleString()}</dd></div>
        <div><dt>Reading time</dt><dd>${r.minutes ? `${r.minutes} min` : "—"}</dd></div>
        <div><dt>Links</dt><dd>${r.links.internal + r.links.external}</dd><span class="metric-note">${r.links.external} to other sites</span></div>
        <div><dt>Images</dt><dd>${r.media.filter((x) => x.kind === "image").length}</dd>${r.missingAlt ? html`<span class="metric-note warn-text">${r.missingAlt} without a description</span>` : ""}</div>
      </dl>
      <div>
        <span class="label">Headings</span>
        ${r.headings.length
          ? html`<ul class="outline">${r.headings.map((h) => html`<li style="padding-left:${(h.level - 2) * 1}rem"><span class="lvl">H${h.level}</span>${h.text}</li>`)}</ul>
              ${r.skipped ? html`<p class="hint warn-text">${r.skipped} heading${r.skipped === 1 ? " skips" : "s skip"} a level, which makes the page harder to follow with a screen reader.</p>` : ""}`
          : html`<p class="muted">No headings. Long pages are easier to scan with a few.</p>`}
      </div>
      <p class="hint">Created ${day(m.created) || "—"} · last saved ${day(m.updated) || "—"}</p>
      ${active
        ? html`<div class="actions">
            <button class="btn outline" @click="${() => this._then(() => globalThis.document.querySelector("custom-oer-docs-theme > page-break")?._openPageReport?.())}">${lucide("oer:check")}HAX's full report</button>
          </div>`
        : ""}
    `;
  }

  render() {
    if (!this.open) return html``;
    const def = this._typeDef;
    const missing = this._tried ? this._missing() : [];
    const allowedHere = this._allowed || [];
    // a page whose current type is not allowed here keeps it as an option
    const options = def && !allowedHere.some((t) => t.id === def.id) ? [...allowedHere, def] : allowedHere;
    const label = (k, l) => (k === "details" ? (def ? `${def.label} details` : "Details") : l);
    const panel = {
      general: () => this._renderGeneral(options, def),
      details: () =>
        def
          ? def.fields.length
            ? shownFields(def.fields).map((f) => this._renderField(f))
            : html`<p class="notype">${def.label} has no fields of its own.</p>`
          : html`<p class="notype">Choose a content type in General to give this page its fields.</p>`,
      media: () => this._renderMedia(),
      structure: () => this._renderStructure(),
      history: () => this._renderHistory(),
      report: () => this._renderReport(),
    }[this._section];
    return html`
      <div class="backdrop" @click="${this._close}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">Page details</h2>
            <p class="sub">${this._item.title}</p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._close}">${lucide("oer:x")}</button>
        </header>
        <div class="split">
          <nav class="sections" role="tablist" aria-orientation="vertical" aria-label="Sections" @keydown="${this._navKeys}">
            ${SECTIONS.map(
              ([k, l, i]) => html`<button
                id="tab-${k}"
                role="tab"
                aria-selected="${this._section === k ? "true" : "false"}"
                aria-controls="panel"
                tabindex="${this._section === k ? "0" : "-1"}"
                @click="${() => (this._section = k)}"
              >
                ${lucide(i)}<span>${label(k, l)}</span>${k === "details" && missing.length ? html`<span class="dot-warn" aria-label="has required fields to fill in"></span>` : ""}${k === "media" && this._report?.missingAlt
                  ? html`<span class="count" aria-label="${this._report.missingAlt} images without a description">${this._report.missingAlt}</span>`
                  : ""}
              </button>`,
            )}
          </nav>
          <div class="body" id="panel" role="tabpanel" aria-labelledby="tab-${this._section}">${panel()}</div>
        </div>
        <footer>
          ${missing.length
            ? html`<span class="status">Fill in: ${missing.map((f) => f.label).join(", ")}</span>`
            : html`<span class="status info">${["media", "structure", "history", "report"].includes(this._section) ? "Save details keeps what you change under General and Details." : ""}</span>`}
          <button class="btn outline" @click="${this._close}">Cancel</button>
          <button class="btn primary" aria-disabled="${this._saving ? "true" : "false"}" @click="${this._save}">${this._saving ? "Saving…" : "Save details"}</button>
        </footer>
      </div>
    `;
  }
}
customElements.define(OerPageDetails.tag, OerPageDetails);

export function pageDetails() {
  const doc = globalThis.document;
  return doc.querySelector(OerPageDetails.tag) || doc.body.appendChild(doc.createElement(OerPageDetails.tag));
}
