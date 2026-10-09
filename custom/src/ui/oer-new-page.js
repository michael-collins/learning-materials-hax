/**
 * `oer-new-page` — add a page, guided: what it is (the site's content
 * types, grouped and explained), then its title, where it goes, its course
 * and whether readers see it yet. Creating opens the page in the editor.
 *
 *   newPage().show()                             // from scratch
 *   newPage().show({ parent: id })                // an "Add page" row: types that level takes
 *   newPage().show({ type: "oer:lesson", parent }) // a listing page's New lesson button
 *
 * A native modal dialog: focus stays inside, Esc closes.
 * @element oer-new-page
 */
import { html, css, LitElement } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { contentTypes, allowedChildTypes, canContain, isSystemItem, isHeading, COURSE_TYPE } from "../types/content-types.js";
import { groupedTypes, typeHint, homeOf, HOME_TITLES } from "../types/type-homes.js";
import { createPage } from "../outline/outline-model.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

const noun = (type) => (type?.label || "page").toLowerCase();
const plural = (word) => (/[^aeiou]y$/.test(word) ? `${word.slice(0, -1)}ies` : /(s|x|z|ch|sh)$/.test(word) ? `${word}${word.endsWith("z") ? "z" : ""}es` : `${word}s`);
const article = (word) => (/^[aeiou]/.test(word) ? "an" : "a");

class OerNewPage extends LitElement {
  static get tag() {
    return "oer-new-page";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      _step: { state: true },
      _type: { state: true },
      _query: { state: true },
      _title: { state: true },
      _place: { state: true },
      _placeQuery: { state: true },
      _course: { state: true },
      _publish: { state: true },
    };
  }

  constructor() {
    super();
    this.open = false;
    this._step = "type";
    this._type = null;
    this._query = "";
    this._title = "";
    this._place = undefined;
    this._placeQuery = "";
    this._course = "";
    this._publish = false;
  }

  /** Open the dialog. `type`: start at the details; `parent`: where it was opened (undefined: anywhere). */
  show({ type = "", parent = undefined } = {}) {
    this._items = toJS(store.manifest?.items) || [];
    this._byId = new Map(this._items.map((i) => [i.id, i]));
    this._context = parent;
    const parentType = parent ? this._byId.get(parent)?.metadata?.pageType || null : null;
    // an "Add page" row offers what that level may hold
    this._allowed = parent !== undefined ? allowedChildTypes(parentType, this._items) : contentTypes(this._items).types;
    this._query = "";
    this._title = "";
    this._placeQuery = "";
    this._course = "";
    this._publish = false;
    this._fixedType = !!type;
    const only = !type && this._allowed.length === 1 ? this._allowed[0].id : "";
    this._pick(type || only || null);
    this.open = true;
  }

  updated(changed) {
    if (changed.has("open")) {
      const dialog = this.shadowRoot.querySelector("dialog");
      if (this.open && !dialog.open) dialog.showModal();
      if (!this.open && dialog.open) dialog.close();
    }
    if (changed.has("_step") && this.open) {
      this.updateComplete.then(() => this.shadowRoot.querySelector(this._step === "type" ? "#type-search" : "#title")?.focus());
    }
  }

  _close() {
    this.open = false;
  }

  _types() {
    return contentTypes(this._items).types;
  }

  _pick(typeId) {
    this._type = typeId ? this._types().find((t) => t.id === typeId) || null : null;
    if (!this._type) {
      this._step = "type";
      return;
    }
    // where it goes first: where it was opened, else where its kind is listed
    const places = this._places();
    this._place = places[0] ? places[0].id : null;
    this._step = "details";
  }

  /* ---------- where it can go ---------- */

  _label(id) {
    if (id === null) return "Top level of the site";
    return this._byId.get(id)?.title || "Untitled page";
  }

  _path(item) {
    const out = [];
    for (let p = this._byId.get(item.parent); p && out.length < 4; p = this._byId.get(p.parent)) out.unshift(p.title);
    return out.join(" › ");
  }

  // suggested places: where "Add page" was used, and where the type is listed
  _places() {
    const type = this._type;
    const out = [];
    const add = (id, why) => {
      if (out.some((o) => o.id === id)) return;
      const ptype = id ? this._byId.get(id)?.metadata?.pageType || null : null;
      if (!canContain(ptype, type.id, this._items)) return;
      out.push({ id, label: this._label(id), why });
    };
    if (this._context !== undefined) add(this._context, "where you clicked Add page");
    const home = homeOf(type.id, this._items);
    if (home) add(home.id, `where ${plural(noun(type))} are listed`);
    if (!out.length) add(null, "the top level of the navigation");
    return out;
  }

  // anywhere else it may go, matching the search (whole pages, not versions or chapters)
  _otherPlaces() {
    const q = this._placeQuery.trim().toLowerCase();
    if (!q) return [];
    return this._items
      .filter((i) => !isSystemItem(i) && !isHeading(i) && !i.metadata?.oerSnapshotOf && !i.metadata?.oerRef?.page)
      .filter((i) => i.title.toLowerCase().includes(q) && canContain(i.metadata?.pageType || null, this._type.id, this._items))
      .slice(0, 8);
  }

  _hasField(name) {
    return (this._type?.fields || []).some((f) => f.name === name);
  }

  /* ---------- create ---------- */

  async _create(e) {
    e?.preventDefault();
    const title = this._title.trim();
    if (!title || !this._type) {
      this.shadowRoot.querySelector("#title")?.focus();
      return;
    }
    const metadata = { published: this._publish };
    if (this._course && this._hasField("courses")) metadata.oerFields = { courses: [{ page: this._course, version: "" }] };
    const parent = this._place === undefined ? null : this._place;
    this._close();
    await createPage(title, parent, this._type.id, { metadata, edit: true });
  }

  /* ---------- render ---------- */

  _renderTypes() {
    const q = this._query.trim().toLowerCase();
    const groups = groupedTypes(this._items, this._allowed)
      .map((g) => ({ ...g, types: g.types.filter((t) => !q || `${t.label} ${typeHint(t)}`.toLowerCase().includes(q)) }))
      .filter((g) => g.types.length);
    const first = groups[0]?.types[0];
    const restricted = this._context !== undefined && this._allowed.length < this._types().length;
    return html`
      <div class="search">
        ${lucide("icons:search")}
        <input
          id="type-search"
          type="search"
          placeholder="Search types, e.g. quiz or reading"
          aria-label="Search page types"
          .value="${this._query}"
          @input="${(e) => (this._query = e.target.value)}"
          @keydown="${(e) => e.key === "Enter" && first && this._pick(first.id)}"
        />
      </div>
      ${restricted ? html`<p class="note">Showing what ${this._label(this._context)} can hold.</p>` : ""}
      <div class="groups">
        ${groups.length
          ? groups.map(
              (g) => html`<section class="group" aria-labelledby="g-${g.label.replace(/\W+/g, "-")}">
                <h3 id="g-${g.label.replace(/\W+/g, "-")}">${g.label}<span>${g.hint}</span></h3>
                <div class="cards">
                  ${g.types.map((t) => {
                    const home = HOME_TITLES[t.id];
                    return html`<button class="card" @click="${() => this._pick(t.id)}">
                      <span class="card-icon">${lucide(t.icon || "oer:file-text")}</span>
                      <span class="card-text">
                        <span class="card-title">${t.label}</span>
                        <span class="card-hint">${typeHint(t)}</span>
                        ${home ? html`<span class="card-home">Listed on ${home}</span>` : ""}
                      </span>
                    </button>`;
                  })}
                </div>
              </section>`,
            )
          : html`<p class="note">No type matches “${this._query}”.</p>`}
      </div>
    `;
  }

  _renderDetails() {
    const t = this._type;
    const places = this._places();
    const others = this._otherPlaces();
    const elsewhere = this._place !== undefined && !places.some((p) => p.id === this._place);
    const courses = this._hasField("courses") ? this._items.filter((i) => i.metadata?.pageType === COURSE_TYPE && !i.metadata?.oerSnapshotOf) : [];
    const title = this._title.trim();
    const where = this._label(this._place === undefined ? null : this._place);
    return html`
      <form @submit="${this._create}">
        <div class="chosen">
          <span class="card-icon">${lucide(t.icon || "oer:file-text")}</span>
          <span class="card-text">
            <span class="card-title">${t.label}</span>
            <span class="card-hint">${typeHint(t)}</span>
          </span>
          <button type="button" class="btn ghost" @click="${() => (this._step = "type")}">Change type</button>
        </div>

        <label class="field">
          <span class="label">Title</span>
          <input id="title" required autocomplete="off" .value="${this._title}" @input="${(e) => (this._title = e.target.value)}" placeholder="What readers will see at the top of the page" />
        </label>

        <fieldset class="field">
          <legend class="label">Where it goes</legend>
          ${places.map(
            (p) => html`<label class="choice">
              <input type="radio" name="place" .checked="${this._place === p.id}" @change="${() => (this._place = p.id)}" />
              <span><b>${p.label}</b><span class="muted"> — ${p.why}</span></span>
            </label>`,
          )}
          ${elsewhere
            ? html`<label class="choice">
                <input type="radio" name="place" checked />
                <span><b>${this._label(this._place)}</b></span>
              </label>`
            : ""}
          <div class="search small">
            ${lucide("icons:search")}
            <input type="search" placeholder="Somewhere else: search for a page" aria-label="Search for another place" .value="${this._placeQuery}" @input="${(e) => (this._placeQuery = e.target.value)}" />
          </div>
          ${others.length
            ? html`<ul class="results" role="list">
                ${others.map(
                  (i) => html`<li>
                    <button type="button" class="result" @click="${() => ((this._place = i.id), (this._placeQuery = ""))}">
                      <span>${i.title}</span>${this._path(i) ? html`<span class="muted">${this._path(i)}</span>` : ""}
                    </button>
                  </li>`,
                )}
              </ul>`
            : this._placeQuery.trim()
              ? html`<p class="note">No page with that title can hold ${article(noun(t))} ${noun(t)}.</p>`
              : ""}
        </fieldset>

        ${courses.length
          ? html`<label class="field">
              <span class="label">Course <span class="muted">(optional)</span></span>
              <select .value="${this._course}" @change="${(e) => (this._course = e.target.value)}">
                <option value="">None yet</option>
                ${courses.map((c) => html`<option value="${c.id}" ?selected="${this._course === c.id}">${c.title}</option>`)}
              </select>
              <span class="hint">It's listed on that course's page under Taught in this course.</span>
            </label>`
          : ""}

        <label class="choice publish">
          <input type="checkbox" .checked="${this._publish}" @change="${(e) => (this._publish = e.target.checked)}" />
          <span><b>Publish now</b><span class="muted"> — otherwise it starts as a draft only signed-in authors see.</span></span>
        </label>

        <p class="summary" aria-live="polite">
          ${title
            ? html`Creates <b>“${title}”</b>, ${article(noun(t))} ${noun(t)} in <b>${where}</b>, ${this._publish ? "published" : "as a draft"}, and opens it in the editor.`
            : html`Give it a title to create it.`}
        </p>
        <footer>
          ${this._fixedType ? html`<span></span>` : html`<button type="button" class="btn outline" @click="${() => (this._step = "type")}">${lucide("oer:chevron-left")}Back</button>`}
          <span class="spacer"></span>
          <button type="button" class="btn outline" @click="${this._close}">Cancel</button>
          <button type="submit" class="btn primary" aria-disabled="${title ? "false" : "true"}">${lucide("oer:plus")}Create and edit</button>
        </footer>
      </form>
    `;
  }

  render() {
    const t = this._type;
    return html`<dialog aria-labelledby="t" @close="${() => (this.open = false)}" @click="${(e) => e.target.localName === "dialog" && this._close()}">
      <div class="panel">
        <header>
          <div>
            <h2 id="t">${this._step === "type" ? "New page" : `New ${noun(t)}`}</h2>
            <p class="sub">${this._step === "type" ? "What are you making? Pick the kind of page; you can change it later." : "Name it and choose where it goes. Everything else you fill in on the page."}</p>
          </div>
          <ol class="steps" aria-label="Steps">
            <li aria-current="${this._step === "type" ? "step" : "false"}">1 Type</li>
            <li aria-current="${this._step === "details" ? "step" : "false"}">2 Details</li>
          </ol>
          <button class="icon-btn" aria-label="Close" @click="${this._close}">${lucide("oer:x")}</button>
        </header>
        <div class="body">${this.open ? (this._step === "type" ? this._renderTypes() : this._renderDetails()) : ""}</div>
      </div>
    </dialog>`;
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      dialog {
        width: min(46rem, calc(100vw - 2rem));
        max-height: min(46rem, calc(100dvh - 2rem));
        padding: 0;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg, 0.75rem);
        background: var(--popover, var(--background));
        color: var(--popover-foreground, var(--foreground));
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        overflow: hidden;
      }
      dialog::backdrop {
        background: rgb(0 0 0 / 0.5);
      }
      .panel {
        display: flex;
        flex-direction: column;
        max-height: min(46rem, calc(100dvh - 2rem));
      }
      button,
      input,
      select {
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
      header {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 1rem 0.75rem 1rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      header > div {
        flex: 1;
        min-width: 0;
      }
      h2 {
        margin: 0;
        font-size: 1.0625rem;
        font-weight: 600;
      }
      .sub {
        margin: 0.25rem 0 0;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      .steps {
        display: flex;
        gap: 0.25rem;
        margin: 0.125rem 0 0;
        padding: 0;
        list-style: none;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .steps li {
        padding: 0.125rem 0.5rem;
        border-radius: 999px;
        white-space: nowrap;
      }
      .steps li[aria-current="step"] {
        background: var(--muted);
        color: var(--foreground);
        font-weight: 500;
      }
      .icon-btn {
        all: unset;
        display: inline-grid;
        place-items: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md, 0.5rem);
        cursor: pointer;
        color: var(--muted-foreground);
      }
      .icon-btn:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .body {
        overflow-y: auto;
        padding: 1rem 1.25rem 1.25rem;
      }
      .search {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 2.5rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md, 0.5rem);
        background: var(--background);
        color: var(--muted-foreground);
      }
      .search.small {
        height: 2.25rem;
        margin-top: 0.25rem;
      }
      .search input {
        flex: 1;
        min-width: 0;
        border: 0;
        background: none;
        color: var(--foreground);
        outline: none;
      }
      .search:focus-within {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .note,
      .hint {
        margin: 0.5rem 0 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .groups {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        margin-top: 1rem;
      }
      h3 {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 0.25rem 0.5rem;
        margin: 0 0 0.5rem;
        font-size: 0.8125rem;
        font-weight: 600;
      }
      h3 span {
        font-weight: 400;
        color: var(--muted-foreground);
      }
      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
        gap: 0.5rem;
      }
      .card,
      .chosen {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.75rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md, 0.5rem);
        background: var(--card, var(--background));
        text-align: start;
      }
      .card {
        cursor: pointer;
      }
      .card:hover {
        border-color: var(--input-border, var(--border));
        background: var(--accent);
      }
      .card-icon {
        display: inline-grid;
        place-items: center;
        flex: none;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md, 0.5rem);
        background: var(--muted);
        color: var(--foreground);
      }
      .card-text {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        min-width: 0;
        flex: 1;
      }
      .card-title {
        font-weight: 600;
        font-size: 0.9375rem;
      }
      .card-hint {
        font-size: 0.8125rem;
        line-height: 1.4;
        color: var(--muted-foreground);
      }
      .card-home {
        margin-top: 0.125rem;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .chosen {
        align-items: center;
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        margin: 0;
        padding: 0;
        border: 0;
      }
      .label {
        padding: 0;
        font-size: 0.875rem;
        font-weight: 500;
      }
      .muted {
        color: var(--muted-foreground);
        font-weight: 400;
      }
      #title,
      select {
        height: 2.5rem;
        padding: 0 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md, 0.5rem);
        background: var(--background);
      }
      #title {
        font-size: 1rem;
      }
      .choice {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        font-size: 0.875rem;
        line-height: 1.4;
        cursor: pointer;
      }
      .choice input {
        margin: 0.1875rem 0 0;
        accent-color: var(--primary);
      }
      .results {
        margin: 0.25rem 0 0;
        padding: 0;
        list-style: none;
        border: 1px solid var(--border);
        border-radius: var(--radius-md, 0.5rem);
        overflow: hidden;
      }
      .result {
        all: unset;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
        cursor: pointer;
      }
      .result:hover,
      .result:focus-visible {
        background: var(--accent);
      }
      .result .muted {
        font-size: 0.75rem;
      }
      li + li .result {
        border-top: 1px solid var(--border);
      }
      .summary {
        margin: 0;
        padding: 0.625rem 0.75rem;
        border-radius: var(--radius-md, 0.5rem);
        background: var(--muted);
        font-size: 0.875rem;
      }
      footer {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .spacer {
        flex: 1;
      }
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2.25rem;
        padding: 0 0.875rem;
        border: 1px solid transparent;
        border-radius: var(--radius-md, 0.5rem);
        font-weight: 500;
        font-size: 0.875rem;
        cursor: pointer;
        white-space: nowrap;
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .btn.primary[aria-disabled="true"] {
        opacity: 0.55;
        cursor: default;
      }
      .btn.outline {
        border-color: var(--input-border, var(--border));
        background: transparent;
      }
      .btn.outline:hover,
      .btn.ghost:hover {
        background: var(--accent);
      }
      .btn.ghost {
        height: 2rem;
        padding: 0 0.625rem;
        background: transparent;
        color: var(--foreground);
      }
      @media (max-width: 560px) {
        .steps {
          display: none;
        }
      }
    `;
  }
}

if (!customElements.get(OerNewPage.tag)) customElements.define(OerNewPage.tag, OerNewPage);

export function newPage() {
  const doc = globalThis.document;
  return doc.querySelector(OerNewPage.tag) || doc.body.appendChild(doc.createElement(OerNewPage.tag));
}
