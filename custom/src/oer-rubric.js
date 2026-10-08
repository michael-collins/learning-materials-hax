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
 * here. Hidden when the page URL has ?hideRubric=true (embeds that leave
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
import { findRubric, rubricOf, rubricPages, hasDescriptors, percent } from "./rubrics/rubric-model.js";
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
    };
  }

  constructor() {
    super();
    this.rubricId = "";
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
        }
        .card {
          border: 1px solid var(--border, var(--ddd-theme-default-limestoneLight));
          border-radius: var(--radius-lg, var(--ddd-radius-md));
          padding: 1rem 0 0.25rem;
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
        .grid td {
          min-width: 9rem;
        }
        .grid tbody th {
          min-width: 11rem;
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
    return html`<div class="table-wrap">
      <table class="grid">
        <thead>
          <tr>
            <th scope="col">Criterion</th>
            ${r.levels.map((l) => html`<th scope="col">${l.name}<small>${percent(l.share)} of its points</small></th>`)}
          </tr>
        </thead>
        <tbody>
          ${r.criteria.map(
            (c) => html`<tr>
              <th scope="row">${c.name}<small class="weight">${c.weight}% of the grade</small>${c.description ? html`<p>${c.description}</p>` : ""}</th>
              ${r.levels.map((l) => (c.descriptors?.[l.id] ? html`<td>${c.descriptors[l.id]}</td>` : html`<td class="none"><span aria-label="Not described">–</span></td>`))}
            </tr>`,
          )}
        </tbody>
      </table>
    </div>`;
  }

  _renderList(r) {
    return html`<div class="table-wrap">
        <table>
          <thead>
            <tr><th scope="col">Criterion</th><th scope="col">Description</th><th scope="col">Weight</th></tr>
          </thead>
          <tbody>
            ${r.criteria.map((c) => html`<tr><th scope="row">${c.name}</th><td>${c.description}</td><td class="weight">${c.weight}%</td></tr>`)}
          </tbody>
        </table>
      </div>
      <p class="ratings">Each criterion is rated ${r.levels.map((l) => html`<span class="pill">${l.name} ${percent(l.share)}</span>`)}</p>`;
  }

  render() {
    if (this._hidden || !this.__items) return html``;
    const page = findRubric(this.__items, this.rubricId);
    if (!page) {
      return html`<div class="missing">Rubric not found${this.rubricId ? html`: <code>${this.rubricId}</code>` : ""}</div>`;
    }
    const r = rubricOf(page);
    // on the rubric's own page the page header has the description and
    // the Edit rubric button
    const onOwnPage = this.__activeId === page.id;
    return html`
      <section class="card" aria-labelledby="title">
        <div class="head">
          <h3 id="title">${onOwnPage ? heading(r.name) : html`<a href="${page.slug}">${heading(r.name)}</a>`}</h3>
          ${this.__signedIn && !this.__editing && !onOwnPage && !page.metadata?.oerSnapshotOf
            ? html`<button class="edit" @click="${() => rubricEditor().show(page.id)}">${lucide("icons:create")}Edit rubric</button>`
            : ""}
        </div>
        ${r.description && !onOwnPage ? html`<p class="desc">${r.description}</p>` : html`<div style="height:0.75rem"></div>`}
        ${!r.criteria.length
          ? html`<p class="empty">No criteria yet.${this.__signedIn ? " Use Edit rubric to add them." : ""}</p>`
          : hasDescriptors(r)
            ? this._renderGrid(r)
            : this._renderList(r)}
      </section>
    `;
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
