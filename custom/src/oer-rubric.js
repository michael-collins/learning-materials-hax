/**
 * Copyright 2026 Michael Collins
 * @license Apache-2.0, see License.md for full text.
 *
 * `oer-rubric`
 * Shows a rubric on a page: one of the site's rubric pages (type Rubric,
 * rubrics/rubric-model.js), found by its page id or key. With level
 * descriptions it's a grid, criteria by rating levels; without, a list of
 * criteria with their weights and the ratings they share. The title links
 * to the rubric's page; signed-in authors can open the rubric editor from
 * here. With a version (an archived page's rubric is pinned to the release
 * that went with it) it shows that release, as it was. Hidden when the page URL has ?hideRubric=true (embeds that leave
 * the rubric out).
 *
 * Authors pick the rubric from a dropdown in the HAX block settings; the
 * options are the site's rubric pages.
 * @element oer-rubric
 */
import { html, css, store, autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { registerBlocks } from "./blocks/register.js";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import { LUCIDE_ICONS } from "./editor/lucide-icons.generated.js";
import { findRubric, rubricAt, rubricOf, rubricPages, hasDescriptors, percent, shareLabel, weightTotal } from "./rubrics/rubric-model.js";
import { rubricEditor } from "./rubrics/oer-rubric-editor.js";

const lucide = (name) => html`<span class="lucide" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

// "Exercise" -> "Exercise rubric"; a name that already says rubric stays
const heading = (name) => (/rubric/i.test(name) ? name : `${name} rubric`);

export class OerRubric extends DDD {
  static get tag() {
    return "oer-rubric";
  }

  static get properties() {
    return {
      ...super.properties,
      rubricId: { type: String, attribute: "rubric-id", reflect: true },
      // a release of the rubric ("1.0.0"); empty: the latest
      version: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.rubricId = "";
    this.version = "";
    // Internal state is kept out of the declared properties on purpose:
    // HAX serializes every declared property into the saved page HTML.
    this.__items = null;
    this.__signedIn = false;
    this.__editing = false;
    this.__activeId = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.__dispose = autorun(() => {
      const items = toJS(store.manifest?.items) || null;
      const signedIn = !!store.isLoggedIn;
      const editing = !!store.editMode;
      const activeId = toJS(store.activeId) || "";
      Promise.resolve().then(() => {
        this.__activeId = activeId;
        this.__items = items;
        this.__signedIn = signedIn;
        this.__editing = editing;
        this.requestUpdate();
      });
    });
  }

  disconnectedCallback() {
    this.__dispose?.();
    super.disconnectedCallback();
  }

  get _hidden() {
    return new URLSearchParams(globalThis.location.search).get("hideRubric") === "true";
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          margin: 2rem 0;
          text-align: start;
        }
        .card {
          container-type: inline-size;
          border: 1px solid var(--border, var(--ddd-theme-default-limestoneLight));
          border-radius: var(--radius-lg, var(--ddd-radius-md));
          padding: 1rem 0 0.25rem;
        }
        /* narrow: each criterion with its levels listed under it, instead
           of a grid that scrolls sideways */
        .stacked {
          display: none;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        /* the grid needs about 10rem for criteria and 7rem a level */
        @container (max-width: 31rem) {
          .n2 .grid-wrap { display: none; }
          .n2 .stacked { display: block; }
        }
        @container (max-width: 38rem) {
          .n3 .grid-wrap { display: none; }
          .n3 .stacked { display: block; }
        }
        @container (max-width: 45rem) {
          .n4 .grid-wrap { display: none; }
          .n4 .stacked { display: block; }
        }
        @container (max-width: 47rem) {
          .n5 .grid-wrap { display: none; }
          .n5 .stacked { display: block; }
        }
        @container (max-width: 54rem) {
          .n6 .grid-wrap { display: none; }
          .n6 .stacked { display: block; }
        }
        @container (max-width: 61rem) {
          .n7 .grid-wrap { display: none; }
          .n7 .stacked { display: block; }
        }
        .stacked > li {
          padding: 0.75rem 1rem;
          border-top: 1px solid var(--border, var(--ddd-theme-default-limestoneLight));
          font-size: 0.875rem;
        }
        .stacked h4 {
          margin: 0;
          font-size: 0.9375rem;
          font-weight: 600;
        }
        .stacked .cdesc {
          margin: 0.25rem 0 0.5rem;
          color: var(--muted-foreground, inherit);
        }
        /* DDD sizes and pads definition lists; these are compact */
        .stacked dl {
          display: grid;
          grid-template-columns: minmax(7rem, max-content) 1fr;
          gap: 0.375rem 0.75rem;
          margin: 0 !important;
          padding: 0 !important;
        }
        .stacked dt,
        .stacked dd {
          margin: 0 !important;
          padding: 0 !important;
          font-size: 0.875rem !important;
          line-height: 1.45;
        }
        .stacked dt {
          font-weight: 500;
        }
        .stacked dt small {
          display: inline;
          margin-left: 0.25rem;
        }

        .head {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin: 0 1rem;
        }
        h3 {
          flex: 1;
          margin: 0;
          font-size: 1.125rem;
          font-weight: 600;
        }
        h3 a {
          color: inherit;
          text-decoration: none;
        }
        h3 a:hover {
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .edit {
          all: unset;
          flex: none;
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          height: 2rem;
          padding: 0 0.75rem;
          border: 1px solid var(--input-border, var(--border));
          border-radius: var(--radius-md, 6px);
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
        }
        .edit:hover {
          background: var(--accent);
        }
        .edit:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
        }
        .lucide {
          display: inline-block;
          width: 0.875rem;
          height: 0.875rem;
          background: currentColor;
          -webkit-mask: var(--src) center / contain no-repeat;
          mask: var(--src) center / contain no-repeat;
        }
        .desc {
          text-align: start;
          margin: 0.5rem 1rem 1rem;
          color: var(--muted-foreground, var(--ddd-theme-default-coalyGray));
        }
        .table-wrap {
          overflow-x: auto;
        }
        /* DDD ships a bordered-grid table style with enough weight that the
           reset needs !important; shadcn tables only rule between rows */
        table,
        table thead,
        table tbody,
        table tr,
        table th,
        table td {
          border: 0 !important;
          outline: 0 !important;
          background: transparent !important;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }
        th,
        td {
          text-align: start;
          vertical-align: top;
          padding: 0.75rem 1rem !important;
        }
        table thead th,
        table tbody tr:not(:last-child) > * {
          border-bottom: 1px solid var(--border, var(--ddd-theme-default-limestoneLight)) !important;
        }
        thead th {
          font-weight: 500;
          color: var(--muted-foreground, inherit);
        }
        tbody th {
          font-weight: 500;
        }
        tbody th p {
          margin: 0.25rem 0 0;
          font-weight: 400;
          color: var(--muted-foreground, inherit);
        }
        small {
          display: block;
          margin-top: 0.125rem;
          font-size: 0.75rem;
          font-weight: 400;
          color: var(--muted-foreground, inherit);
        }
        .grid th,
        .grid td {
          padding: 0.75rem 0.625rem !important;
        }
        .grid tr > :first-child {
          padding-left: 1rem !important;
        }
        .grid tr > :last-child {
          padding-right: 1rem !important;
        }
        .grid td {
          min-width: 5.5rem;
        }
        .grid tbody th {
          min-width: 8.5rem;
        }
        .sr {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip-path: inset(50%);
          white-space: nowrap;
        }
        .weight {
          white-space: nowrap;
          font-variant-numeric: tabular-nums;
        }
        td.none {
          color: var(--muted-foreground, inherit);
        }
        .ratings {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.375rem;
          margin: 0.5rem 1rem 0.75rem;
          font-size: 0.8125rem;
          color: var(--muted-foreground, inherit);
        }
        .pill {
          padding: 0.125rem 0.5rem;
          border: 1px solid var(--border, currentColor);
          border-radius: 999px;
          color: var(--foreground, inherit);
        }
        .pin {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.375rem;
          margin: 0.5rem 1rem 0;
          font-size: 0.8125rem;
          color: var(--muted-foreground, inherit);
        }
        .pin a {
          color: var(--link, var(--primary));
        }
        .missing {
          padding: 1rem;
          border: 1px dashed var(--border, currentColor);
          border-radius: var(--radius-lg, var(--ddd-radius-md));
          color: var(--muted-foreground, inherit);
          background: color-mix(in oklch, var(--muted, #eee) 30%, transparent);
        }
        .empty {
          margin: 0 1rem 1rem;
          color: var(--muted-foreground, inherit);
        }
      `,
    ];
  }

  _renderGrid(r) {
    const total = weightTotal(r);
    return html`<div class="n${Math.max(2, Math.min(7, r.levels.length))}"><div class="table-wrap grid-wrap">
      <table class="grid">
        <thead>
          <tr>
            <th scope="col">Criterion</th>
            ${r.levels.map((l) => html`<th scope="col">${l.name}<small>${percent(l.share)}<span class="sr"> of each criterion's points</span></small></th>`)}
          </tr>
        </thead>
        <tbody>
          ${r.criteria.map(
            (c) => html`<tr>
              <th scope="row">${c.name}<small class="weight">${shareLabel(c.weight, total)} of the grade</small>${c.description ? html`<p>${c.description}</p>` : ""}</th>
              ${r.levels.map((l) => (c.descriptors?.[l.id] ? html`<td>${c.descriptors[l.id]}</td>` : html`<td class="none"><span aria-label="Not described">–</span></td>`))}
            </tr>`,
          )}
        </tbody>
      </table>
    </div>
    <ul class="stacked" role="list">
      ${r.criteria.map(
        (c) => html`<li>
          <h4>${c.name}<small class="weight">${shareLabel(c.weight, total)} of the grade</small></h4>
          ${c.description ? html`<p class="cdesc">${c.description}</p>` : ""}
          <dl>
            ${r.levels.map((l) => html`<dt>${l.name}<small>${percent(l.share)}</small></dt><dd>${c.descriptors?.[l.id] || "–"}</dd>`)}
          </dl>
        </li>`,
      )}
    </ul></div>`;
  }

  _renderList(r) {
    const total = weightTotal(r);
    return html`<div class="table-wrap">
        <table>
          <thead>
            <tr><th scope="col">Criterion</th><th scope="col">Description</th><th scope="col">Share of the grade</th></tr>
          </thead>
          <tbody>
            ${r.criteria.map((c) => html`<tr><th scope="row">${c.name}</th><td>${c.description}</td><td class="weight">${shareLabel(c.weight, total)}</td></tr>`)}
          </tbody>
        </table>
      </div>
      <p class="ratings">Each criterion is rated ${r.levels.map((l) => html`<span class="pill">${l.name} ${percent(l.share)}</span>`)}</p>`;
  }

  render() {
    if (this._hidden || !this.__items) return html``;
    const { page, shown, missing } = rubricAt(this.__items, this.rubricId, this.version);
    if (!page) {
      return html`<div class="missing">Rubric not found${this.rubricId ? html`: <code>${this.rubricId}</code>` : ""}</div>`;
    }
    const r = rubricOf(shown);
    const pinned = shown !== page;
    // on the rubric's own page the page header has the description and
    // the Edit rubric button
    const onOwnPage = this.__activeId === page.id;
    return html`
      <section class="card" aria-labelledby="title">
        <div class="head">
          <h3 id="title">${onOwnPage ? heading(r.name) : html`<a href="${shown.slug}">${heading(r.name)}</a>`}</h3>
          ${this.__signedIn && !this.__editing && !onOwnPage && !pinned && !page.metadata?.oerSnapshotOf
            ? html`<button class="edit" @click="${() => rubricEditor().show(page.id)}">${lucide("icons:create")}Edit rubric</button>`
            : ""}
        </div>
        ${pinned || missing
          ? html`<p class="pin">
              ${missing ? html`Version ${this.version} isn't on the site; this is the latest.` : html`<span class="pill">v${this.version}</span> as released.`}
              <a href="${page.slug}">See the latest</a>
            </p>`
          : ""}
        ${r.description && !onOwnPage ? html`<p class="desc">${r.description}</p>` : html`<div style="height:0.75rem"></div>`}
        ${!r.criteria.length
          ? html`<p class="empty">No criteria yet.${this.__signedIn ? " Use Edit rubric to add them." : ""}</p>`
          : hasDescriptors(r)
            ? this._renderGrid(r)
            : this._renderList(r)}
      </section>
    `;
  }

  // in edit mode, an Edit rubric button on the selected block's label
  // (editor/oer-block-frame.js)
  static get frameAction() {
    return {
      label: "Edit rubric",
      icon: "pencil",
      run: (node) => {
        const page = findRubric(toJS(store.manifest?.items) || [], node.rubricId);
        if (page) rubricEditor().show(page.id);
      },
    };
  }

  // the rubric dropdown: the site's rubric pages, by key (older pages use
  // keys such as "exercise") or page id
  static get haxProperties() {
    const items = toJS(store.manifest?.items) || [];
    const options = Object.fromEntries(rubricPages(items).map((p) => [p.metadata?.oerRubric?.key || p.id, p.title]));
    return {
      canScale: false,
      canEditSource: true,
      gizmo: {
        title: "Rubric",
        description: "One of the site's rubrics: its criteria, weights and rating levels.",
        icon: "icons:assignment-turned-in",
        color: "blue",
        tags: ["Instructional", "assessment", "rubric", "grading"],
        meta: { author: "Michael Collins" },
      },
      settings: {
        configure: [
          {
            property: "rubricId",
            title: "Rubric",
            description: "Which rubric to show. Rubrics are pages under Assessments → Rubrics.",
            inputMethod: "select",
            options,
          },
          {
            property: "version",
            title: "Version",
            description: "Leave empty for the latest. A release (such as 1.0.0) keeps this page on the rubric as it was then.",
            inputMethod: "textfield",
          },
        ],
        advanced: [],
      },
      demoSchema: [
        {
          tag: OerRubric.tag,
          properties: { rubricId: Object.keys(options)[0] || "exercise" },
          content: "",
        },
      ],
    };
  }
}
customElements.define(OerRubric.tag, OerRubric);
registerBlocks(OerRubric);
