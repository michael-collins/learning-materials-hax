/**
 * Copyright 2026 Michael Collins
 * @license Apache-2.0, see License.md for full text.
 *
 * `oer-rubric`
 * Port of learning-materials-decapcms components/content/RubricComponent.vue.
 * Looks up a rubric by slug in the site's files/data/rubrics.json (the same
 * data file the Nuxt site uses) and renders its criteria as a table. Hidden
 * when the page URL has ?hideRubric=true, as in the original.
 *
 * Authors pick the rubric from a dropdown in the HAX block settings; the
 * options come from haxProperties below.
 * @element oer-rubric
 */
import { html, css } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";

const DATA_URL = "files/data/rubrics.json";
let rubricsPromise;
function loadRubrics() {
  if (!rubricsPromise) {
    rubricsPromise = fetch(new URL(DATA_URL, globalThis.document.baseURI))
      .then((r) => (r.ok ? r.json() : []))
      .catch(() => []);
  }
  return rubricsPromise;
}

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
    this.__rubric = null;
    this.__loaded = false;
  }

  updated(changed) {
    super.updated?.(changed);
    if (changed.has("rubricId")) this._load();
  }

  async _load() {
    const rubrics = await loadRubrics();
    this.__rubric = rubrics.find((r) => r.slug === this.rubricId) ?? null;
    this.__loaded = true;
    this.requestUpdate();
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
          padding: 1rem;
        }
        h3 {
          margin: 1rem 1rem 0;
          font-size: 1.125rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        .desc {
          text-align: start;
          margin: 0.5rem 1rem 1.5rem;
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
        table tbody tr:not(:last-child) td {
          border-bottom: 1px solid var(--border, var(--ddd-theme-default-limestoneLight)) !important;
        }
        th {
          color: var(--muted-foreground, inherit);
        }
        th {
          font-weight: 500;
        }
        td:first-child {
          font-weight: 500;
          white-space: nowrap;
        }
        td:last-child {
          color: var(--muted-foreground, var(--ddd-theme-default-coalyGray));
        }
        .missing {
          padding: 1rem;
          border: 1px dashed var(--border, currentColor);
          border-radius: var(--radius-lg, var(--ddd-radius-md));
          color: var(--muted-foreground, inherit);
          background: color-mix(in oklch, var(--muted, #eee) 30%, transparent);
        }
      `,
    ];
  }

  render() {
    if (this._hidden || !this.__loaded) return html``;
    const r = this.__rubric;
    if (!r) {
      return html`<div class="missing">
        Rubric not found${this.rubricId ? html`: <code>${this.rubricId}</code>` : ""}
      </div>`;
    }
    return html`
      <section class="card" aria-labelledby="title">
        <h3 id="title">${r.name} Rubric</h3>
        ${r.description ? html`<p class="desc">${r.description}</p>` : ""}
        ${r.criteria?.length
          ? html`<div class="table-wrap">
              <table>
                <thead>
                  <tr><th scope="col">Criterion</th><th scope="col">Description</th></tr>
                </thead>
                <tbody>
                  ${r.criteria.map(
                    (c) => html`<tr><td>${c.name}</td><td>${c.description}</td></tr>`,
                  )}
                </tbody>
              </table>
            </div>`
          : ""}
      </section>
    `;
  }

  static get haxProperties() {
    return {
      canScale: false,
      canEditSource: true,
      gizmo: {
        title: "Rubric",
        description: "Assessment rubric from the site's rubrics data file.",
        icon: "icons:assignment-turned-in",
        color: "blue",
        tags: ["Education", "assessment", "rubric", "grading"],
        meta: { author: "Michael Collins" },
      },
      settings: {
        configure: [
          {
            property: "rubricId",
            title: "Rubric",
            description: "Which rubric to show (slug in files/data/rubrics.json).",
            inputMethod: "select",
            options: {
              exercise: "Exercise",
              "exercise-low-poly": "Exercise (low poly)",
              project: "Project",
              task: "Task",
              "written-statement": "Written statement",
            },
          },
        ],
        advanced: [],
      },
      demoSchema: [
        {
          tag: OerRubric.tag,
          properties: { rubricId: "exercise" },
          content: "",
        },
      ],
    };
  }
}
customElements.define(OerRubric.tag, OerRubric);
