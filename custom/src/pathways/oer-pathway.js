/**
 * `oer-pathway` — the body of a pathway page, after learning-materials-
 * decapcms' pathway templates: the facts a student needs before choosing
 * (course, length, levels, what comes first), the route through the
 * modules, what you'll learn, and how to test out.
 *
 * Layouts (block setting, as Decap's `template`):
 * - matrix (default): modules as rows, levels as columns; a single-level
 *   pathway shows its modules as a grid of cards
 * - syllabus: one column, with a level switcher over the module list
 * - sidebar: the route in the main column, facts and test-out beside it
 *
 * The page's own header shows the title, description and target role; the
 * data comes from the pathway's fields and sub-pages (pathway-model.js).
 * @element oer-pathway
 */
import { html, css, LitElement } from "../lit.js";
import { store, autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { registerBlocks } from "../blocks/register.js";
import { contentTypes } from "../types/content-types.js";
import { resolvePathway, pathwayOf, filterModulesByLevel, levelChip, inDevelopmentBadge, pathwayChipStyles } from "./pathway-model.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

const LAYOUTS = { matrix: "Level matrix", syllabus: "Syllabus (one column)", sidebar: "Sidebar (facts beside the route)" };

export class OerPathway extends LitElement {
  static get tag() {
    return "oer-pathway";
  }

  static get properties() {
    return {
      layout: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.layout = "matrix";
    this._data = null;
    this._level = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.__dispose = autorun(() => {
      const list = toJS(store.manifest?.items) || [];
      const active = toJS(store.activeId);
      // read so the view follows sign-in (drafts show to authors only)
      store.isLoggedIn;
      Promise.resolve().then(() => {
        const pathway = pathwayOf(active, list);
        this._data = pathway ? resolvePathway(pathway, list, contentTypes(list).types) : null;
      });
    });
  }

  disconnectedCallback() {
    this.__dispose?.();
    super.disconnectedCallback();
  }

  static get styles() {
    return [
      pathwayChipStyles,
      css`
        :host {
          display: block;
          text-align: start;
          margin: 1.5rem 0 2rem;
          font-family: var(--font-sans, system-ui, sans-serif);
          color: var(--foreground, #111);
          --simple-icon-height: 0.875rem;
          --simple-icon-width: 0.875rem;
        }
        :host([data-hax-ray]) a {
          pointer-events: none;
        }
        button {
          font: inherit;
          color: inherit;
        }
        :focus-visible {
          outline: 2px solid var(--ring, #2563eb);
          outline-offset: 2px;
        }
        a {
          color: inherit;
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
        .xs {
          width: 0.75rem;
          height: 0.75rem;
        }
        .sm {
          width: 0.875rem;
          height: 0.875rem;
        }
        h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.3;
        }
        h2.small {
          font-size: 1.25rem;
        }
        .intro {
          margin: 0.25rem 0 1rem;
          color: var(--muted-foreground, #555);
        }
        section + section,
        .split {
          margin-top: 2.5rem;
        }
        .card {
          border: 1px solid var(--border, #e5e5e5);
          border-radius: var(--radius-lg, 0.75rem);
          background: var(--card, var(--background, #fff));
        }
        .muted {
          color: var(--muted-foreground, #555);
        }

        /* facts */
        .facts-card {
          padding: 1.25rem;
        }
        .facts-card + section {
          margin-top: 2.5rem;
        }
        dl {
          display: grid;
          gap: 1rem 2rem;
          margin: 0;
          font-size: 0.875rem;
        }
        dl.row {
          grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
        }
        dt {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--muted-foreground, #555);
        }
        dd {
          margin: 0.25rem 0 0;
          font-weight: 500;
        }
        dd.chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }
        dd a {
          color: var(--primary, #0071b6);
          text-decoration: none;
        }
        dd a:hover {
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        /* level switcher */
        .switch-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .switch-bar p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--muted-foreground, #555);
        }
        .switcher {
          display: inline-flex;
          flex-wrap: wrap;
          gap: 0.25rem;
          padding: 0.25rem;
          border: 1px solid var(--border, #e5e5e5);
          border-radius: var(--radius-lg, 0.75rem);
          background: color-mix(in srgb, var(--muted, #f4f4f5) 40%, transparent);
        }
        .switcher button {
          all: unset;
          display: inline-flex;
          align-items: center;
          padding: 0.375rem 0.75rem;
          border-radius: var(--radius-md, 0.5rem);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--muted-foreground, #555);
          cursor: pointer;
        }
        .switcher button:hover {
          color: var(--foreground, #111);
        }
        .switcher button:focus-visible {
          outline: 2px solid var(--ring, #2563eb);
        }
        .switcher button[aria-checked="true"] {
          background: var(--background, #fff);
          color: var(--foreground, #111);
          box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
        }
        .switcher .level {
          padding: 0;
          border: 0;
          background: transparent;
          font-size: 0.875rem;
          color: inherit;
        }

        /* modules */
        ol.modules {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .module-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
          gap: 1rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .module {
          overflow: hidden;
        }
        .module-head {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--border, #e5e5e5);
        }
        .num {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 0.75rem;
          color: var(--muted-foreground, #555);
        }
        .module-head h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }
        .module-head h3 a {
          text-decoration: none;
        }
        .module-head h3 a:hover {
          color: var(--primary, #0071b6);
          text-decoration: underline;
        }
        .count {
          margin-left: auto;
          font-size: 0.75rem;
          color: var(--muted-foreground, #555);
          white-space: nowrap;
        }
        .rows {
          padding: 0 1rem;
        }

        /* item row */
        .item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.625rem 0;
        }
        .item + .item {
          border-top: 1px solid var(--border, #e5e5e5);
        }
        .icon {
          display: flex;
          flex: none;
          align-items: center;
          justify-content: center;
          width: 1.75rem;
          height: 1.75rem;
          margin-top: 0.125rem;
          border: 1px solid var(--border, #e5e5e5);
          border-radius: var(--radius-md, 0.5rem);
          background: color-mix(in srgb, var(--muted, #f4f4f5) 40%, transparent);
          color: var(--muted-foreground, #555);
        }
        .icon.bad {
          border-color: color-mix(in srgb, var(--destructive, #b91c1c) 40%, transparent);
          background: transparent;
          color: var(--destructive, #b91c1c);
        }
        .item-body {
          flex: 1;
          min-width: 0;
        }
        .item-title {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.25rem 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .item-title a {
          text-decoration: none;
        }
        .item-title a:hover {
          color: var(--primary, #0071b6);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .item-title .planned {
          color: var(--muted-foreground, #555);
        }
        .item-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0 0.5rem;
          margin: 0.125rem 0 0;
          font-size: 0.75rem;
          color: var(--muted-foreground, #555);
        }
        .components {
          list-style: none;
          margin: 0.375rem 0 0;
          padding: 0 0 0 0.75rem;
          border-left: 1px solid var(--border, #e5e5e5);
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          font-size: 0.8125rem;
          --simple-icon-height: 0.875rem;
          --simple-icon-width: 0.875rem;
          --simple-icon-color: var(--muted-foreground, #555);
        }
        .components li {
          display: flex;
          align-items: baseline;
          gap: 0.375rem;
          min-width: 0;
        }
        .components simple-icon-lite,
        .components .lucide {
          flex: none;
          align-self: center;
        }
        .components a {
          color: inherit;
          text-decoration: none;
        }
        .components a:hover {
          color: var(--primary, #0071b6);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .components .ctype {
          color: var(--muted-foreground, #555);
          font-size: 0.75rem;
          white-space: nowrap;
        }
        .item-meta .bad {
          color: var(--destructive, #b91c1c);
        }
        .item-meta .dur {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        /* matrix */
        .matrix-wrap {
          overflow-x: auto;
          border: 1px solid var(--border, #e5e5e5);
          border-radius: var(--radius-lg, 0.75rem);
        }
        table {
          width: 100%;
          min-width: 45rem;
          border-collapse: collapse;
          font-size: 0.875rem;
        }
        thead tr {
          border-bottom: 1px solid var(--border, #e5e5e5);
          background: color-mix(in srgb, var(--muted, #f4f4f5) 40%, transparent);
        }
        thead th {
          padding: 0.75rem 1rem;
          text-align: left;
        }
        thead th:first-child {
          width: 12rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--muted-foreground, #555);
        }
        tbody tr {
          vertical-align: top;
        }
        tbody tr + tr {
          border-top: 1px solid var(--border, #e5e5e5);
        }
        tbody th {
          padding: 0.75rem 1rem;
          text-align: left;
          font-weight: 600;
        }
        tbody td {
          padding: 0.25rem 1rem;
        }

        /* empty route */
        .planned-box {
          padding: 1.25rem;
          border: 1px dashed var(--border, #d4d4d8);
          border-radius: var(--radius-lg, 0.75rem);
        }
        .planned-box p {
          margin: 0;
        }
        .planned-box .muted {
          margin-top: 0.25rem;
          font-size: 0.875rem;
        }
        .planned-box ul {
          margin: 0.75rem 0 0;
          padding: 0;
          list-style: none;
          font-size: 0.875rem;
        }
        .planned-box li + li {
          margin-top: 0.375rem;
        }
        .planned-box a {
          color: var(--primary, #0071b6);
          font-weight: 500;
          text-decoration: none;
        }

        /* objectives and test-out */
        .objectives {
          display: grid;
          gap: 0.625rem 2rem;
          margin: 0.75rem 0 0;
          padding: 0;
          list-style: none;
        }
        .objectives.two {
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
        }
        .objectives li {
          display: flex;
          align-items: flex-start;
          gap: 0.625rem;
          font-size: 0.875rem;
          line-height: 1.5rem;
        }
        .objectives .lucide {
          margin-top: 0.25rem;
          color: var(--primary, #0071b6);
        }
        .testout {
          padding: 1.25rem;
          border: 1px dashed var(--border, #d4d4d8);
          border-radius: var(--radius-lg, 0.75rem);
          align-self: start;
        }
        .testout h2 {
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0;
        }
        .testout p {
          margin: 0.25rem 0 0;
          font-size: 0.875rem;
          color: var(--muted-foreground, #555);
        }
        .testout ul {
          display: grid;
          gap: 0.5rem 1.5rem;
          margin: 1rem 0 0;
          padding: 0;
          list-style: none;
        }
        .testout.wide ul {
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
        }
        .testout li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.875rem;
        }
        .testout .lucide {
          margin-top: 0.125rem;
          color: var(--muted-foreground, #555);
        }
        .split {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
          gap: 1.5rem;
        }
        .split > section + section {
          margin-top: 0;
        }

        /* sidebar layout */
        .with-aside {
          display: grid;
          gap: 2.5rem;
        }
        .with-aside aside {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        @media (min-width: 64rem) {
          .with-aside {
            grid-template-columns: minmax(0, 1fr) 17rem;
          }
          .with-aside aside {
            position: sticky;
            top: 5rem;
            align-self: start;
          }
        }
        .empty {
          padding: 1.5rem;
          border: 1px dashed var(--border, #d4d4d8);
          border-radius: var(--radius-lg, 0.75rem);
          font-size: 0.875rem;
          color: var(--muted-foreground, #555);
        }
      `,
    ];
  }

  /* ---------- pieces ---------- */

  _facts(p, stacked) {
    const levelsText = p.levels.length ? "" : p.placeholder && !p.modules.length ? "To be decided" : "One level";
    return html`<dl class="${stacked ? "" : "row"}">
      <div>
        <dt>Course</dt>
        <dd>${p.courses.join(" or ") || "—"}</dd>
      </div>
      ${p.duration
        ? html`<div>
            <dt>Length</dt>
            <dd>${p.duration}</dd>
          </div>`
        : ""}
      <div>
        <dt>Levels</dt>
        <dd class="chips">${levelsText || p.levels.map((l) => levelChip(l))}</dd>
      </div>
      <div>
        <dt>Before you start</dt>
        <dd>
          ${p.prerequisites.length
            ? p.prerequisites.map(
                (r, i) => html`${i ? ", " : ""}${r.missing ? html`<span>Missing page</span>` : html`<a href="${r.href}">${r.item.title}</a>`}${r.version ? ` (v${r.version})` : ""}`,
              )
            : "Nothing — start here"}
        </dd>
      </div>
      ${p.readiness?.length
        ? html`<div>
            <dt>Ready?</dt>
            <dd>
              ${p.readiness.map(
                (r, n) => html`${n ? ", " : ""}<a href="${r.href}">${r.item.title}</a>${r.item.metadata?.published === false ? " (unpublished)" : ""}`,
              )}
            </dd>
          </div>`
        : ""}
    </dl>`;
  }

  _itemRow(item, showLevel) {
    const icon = item.missing
      ? html`<span class="icon bad">${lucide("oer:circle-alert", "sm")}</span>`
      : item.planned
        ? html`<span class="icon">${lucide("oer:circle-dashed", "sm")}</span>`
        : html`<span class="icon">${item.type?.icon ? html`<simple-icon-lite icon="${item.type.icon}"></simple-icon-lite>` : lucide("lrn:page", "sm")}</span>`;
    return html`<div class="item">
      ${icon}
      <div class="item-body">
        <div class="item-title">
          ${item.href ? html`<a href="${item.href}">${item.title}</a>` : html`<span class="planned">${item.title}</span>`}
          ${showLevel && item.level ? levelChip(item.level) : ""} ${item.placeholder && !item.missing ? inDevelopmentBadge() : ""}
        </div>
        <p class="item-meta">
          ${item.missing ? html`<span class="bad">Linked content not found</span>` : html`<span>${item.planned ? "Planned" : item.typeLabel || "Page"}</span>`}
          ${item.duration ? html`<span class="dur">${lucide("oer:clock", "xs")}${item.duration}</span>` : ""}
        </p>
        ${item.components?.length
          ? html`<ul class="components" aria-label="In ${item.title}">
              ${item.components.map(
                (c) => html`<li>
                  ${c.type?.icon ? html`<simple-icon-lite icon="${c.type.icon}"></simple-icon-lite>` : lucide("lrn:page", "xs")}
                  <a href="${c.href}">${c.title}</a><span class="ctype">${c.typeLabel}${c.draft ? " · unpublished" : ""}</span>
                </li>`,
              )}
            </ul>`
          : ""}
      </div>
    </div>`;
  }

  _module(m, i, { numbered = true, level = null } = {}) {
    return html`<li class="card module">
      <div class="module-head">
        ${numbered ? html`<span class="num">${String(i + 1).padStart(2, "0")}</span>` : ""}
        <h3>${m.href ? html`<a href="${m.href}">${m.title}</a>` : m.title}</h3>
        <span class="count">${m.items.length} ${m.items.length === 1 ? "item" : "items"}</span>
      </div>
      <div class="rows">${m.items.map((item) => this._itemRow(item, !level))}</div>
    </li>`;
  }

  _outline(modules, level) {
    return html`<ol class="modules">
      ${filterModulesByLevel(modules, level).map((m, i) => this._module(m, i, { level }))}
    </ol>`;
  }

  _switcher(levels) {
    const options = [{ value: null, label: "All levels" }, ...levels.map((l) => ({ value: l, label: l }))];
    const keys = (e, i) => {
      const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!step) return;
      e.preventDefault();
      const next = (i + step + options.length) % options.length;
      this._level = options[next].value;
      this.updateComplete.then(() => this.shadowRoot.querySelectorAll(".switcher button")[next]?.focus());
    };
    return html`<div class="switcher" role="radiogroup" aria-label="Level">
      ${options.map((o, i) => {
        const on = this._level === o.value;
        return html`<button role="radio" aria-checked="${on ? "true" : "false"}" tabindex="${on ? 0 : -1}" @click="${() => (this._level = o.value)}" @keydown="${(e) => keys(e, i)}">
          ${o.value ? levelChip(o.value) : o.label}
        </button>`;
      })}
    </div>`;
  }

  _matrix(modules, levels) {
    return html`<div class="matrix-wrap">
      <table>
        <thead>
          <tr>
            <th scope="col">Module</th>
            ${levels.map((l) => html`<th scope="col">${levelChip(l)}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${modules.map((m) => {
            const shared = m.items.filter((i) => !i.level);
            const byLevel = levels.map((l) => m.items.filter((i) => i.level === l));
            return html`<tr>
              <th scope="row">${m.href ? html`<a href="${m.href}">${m.title}</a>` : m.title}</th>
              ${shared.length && byLevel.every((c) => !c.length)
                ? html`<td colspan="${levels.length}">${shared.map((i) => this._itemRow(i, false))}</td>`
                : byLevel.map((cell) => html`<td>${[...shared, ...cell].map((i) => this._itemRow(i, false))}</td>`)}
            </tr>`;
          })}
        </tbody>
      </table>
    </div>`;
  }

  _route(p, display) {
    if (!p.modules.length) {
      return html`<div class="planned-box">
        <p><strong>This pathway is still being planned.</strong></p>
        <p class="muted">
          Its modules haven't been written yet.${p.specializations.length ? " These specializations show the areas it will cover:" : ""}
        </p>
        ${p.specializations.length ? html`<ul>${p.specializations.map((s) => html`<li><a href="${s.slug}">${s.title}</a></li>`)}</ul>` : ""}
      </div>`;
    }
    const multi = p.levels.length > 1;
    if (display === "matrix" && multi) return this._matrix(p.modules, p.levels);
    return html`${multi
        ? html`<div class="switch-bar">
            ${this._switcher(p.levels)}
            <p>Items without a level are part of every level.</p>
          </div>`
        : ""}${this._outline(p.modules, multi ? this._level : null)}`;
  }

  _objectives(p, two) {
    return p.objectives.length
      ? html`<ul class="objectives ${two ? "two" : ""}">
          ${p.objectives.map((o) => html`<li>${lucide("oer:check")}<span>${o}</span></li>`)}
        </ul>`
      : "";
  }

  _testOut(p, wide) {
    return p.testOut.length
      ? html`<section class="testout ${wide ? "wide" : ""}" aria-labelledby="testout">
          <h2 id="testout">Already know this?</h2>
          <p>You can ask your instructor to test out. You'll need to show work that meets these criteria:</p>
          <ul>
            ${p.testOut.map((c) => html`<li>${lucide("oer:circle-check")}<span>${c}</span></li>`)}
          </ul>
        </section>`
      : "";
  }

  /* ---------- layouts ---------- */

  _renderMatrix(p) {
    const multi = p.levels.length > 1;
    return html`
      <div class="card facts-card">${this._facts(p, false)}</div>
      <section>
        <h2>${multi ? "Choose your level" : "The route"}</h2>
        <p class="intro">
          ${multi
            ? `Same pathway, ${p.levels.length} depths. Take it again at a higher level on a repeat run.`
            : p.modules.length
              ? "Every student takes the same route. Lessons cover the ideas; exercises and projects are what you submit."
              : ""}
        </p>
        ${multi || !p.modules.length
          ? this._route(p, "matrix")
          : html`<ul class="module-grid">${p.modules.map((m, i) => this._module(m, i, { numbered: false }))}</ul>`}
      </section>
      ${p.objectives.length || p.testOut.length
        ? html`<div class="split">
            ${p.objectives.length
              ? html`<section>
                  <h2 class="small">What you'll learn</h2>
                  ${this._objectives(p, false)}
                </section>`
              : ""}
            ${this._testOut(p, false)}
          </div>`
        : ""}
    `;
  }

  _renderSyllabus(p) {
    return html`
      <div class="card facts-card">${this._facts(p, false)}</div>
      ${p.objectives.length
        ? html`<section>
            <h2>What you'll learn</h2>
            ${this._objectives(p, true)}
          </section>`
        : ""}
      <section>
        <h2>The route</h2>
        <p class="intro">${p.modules.length ? "Work through the modules in order. Lessons cover the ideas; exercises and projects are what you submit." : ""}</p>
        ${this._route(p, "list")}
      </section>
      ${p.testOut.length ? html`<section>${this._testOut(p, true)}</section>` : ""}
    `;
  }

  _renderSidebar(p) {
    return html`<div class="with-aside">
      <div>
        <section>
          <h2>The route</h2>
          <p class="intro">${p.modules.length ? "Modules in order. Lessons cover the ideas; exercises and projects are what you submit." : ""}</p>
          ${this._route(p, "list")}
        </section>
        ${p.objectives.length
          ? html`<section>
              <h2>What you'll learn</h2>
              ${this._objectives(p, false)}
            </section>`
          : ""}
      </div>
      <aside aria-label="Pathway facts">
        <div class="card facts-card">${this._facts(p, true)}</div>
        ${this._testOut(p, false)}
      </aside>
    </div>`;
  }

  render() {
    const p = this._data;
    if (!p) return html`<div class="empty">This block shows a pathway. Place it on a page of type Pathway (or one of its sub-pages).</div>`;
    if (this.layout === "syllabus") return this._renderSyllabus(p);
    if (this.layout === "sidebar") return this._renderSidebar(p);
    return this._renderMatrix(p);
  }

  static get haxProperties() {
    return {
      canScale: false,
      canEditSource: true,
      gizmo: {
        title: "Pathway",
        description: "A pathway's facts, route through its modules by level, objectives and test-out criteria.",
        icon: "hax:unit",
        color: "blue",
        tags: ["Layout", "pathway", "course", "levels", "matrix", "outline"],
        meta: { author: "Michael Collins" },
      },
      settings: {
        configure: [{ property: "layout", title: "Layout", inputMethod: "select", options: LAYOUTS }],
        advanced: [],
      },
      demoSchema: [{ tag: "oer-pathway", properties: { layout: "matrix" }, content: "" }],
    };
  }
}

// Internal state is kept out of `properties`: HAX writes every declared
// property into the saved page, so these re-render via requestUpdate instead
for (const name of ["_data", "_level"]) {
  Object.defineProperty(OerPathway.prototype, name, {
    get() {
      return this[`__${name}`];
    },
    set(value) {
      this[`__${name}`] = value;
      this.requestUpdate();
    },
  });
}

if (!customElements.get(OerPathway.tag)) customElements.define(OerPathway.tag, OerPathway);
registerBlocks(OerPathway);

/**
 * `oer-unit` — the body of a unit page: the unit's lessons with their
 * materials and quiz, and its unit project, as the pathway lists them.
 * Units are a pathway's modules, so it reuses the pathway's rows.
 * @element oer-unit
 */
export class OerUnit extends OerPathway {
  static get tag() {
    return "oer-unit";
  }

  static get properties() {
    return {};
  }

  // the unit is the active page, or the nearest ancestor that is a module
  _module() {
    const p = this._data;
    if (!p) return null;
    const list = toJS(store.manifest?.items) || [];
    const byId = new Map(list.map((i) => [i.id, i]));
    for (let cur = byId.get(toJS(store.activeId)); cur; cur = byId.get(cur.parent)) {
      const m = p.modules.find((x) => x.id === cur.id);
      if (m) return m;
    }
    return null;
  }

  render() {
    const m = this._module();
    if (!m) return html`<div class="empty">This block lists a unit's lessons. Place it on a unit page inside a pathway.</div>`;
    return html`<section aria-label="In this unit">
      <div class="card module">
        <div class="module-head">
          <h3>In this unit</h3>
          <span class="count">${m.items.length} ${m.items.length === 1 ? "item" : "items"}</span>
        </div>
        <div class="rows">${m.items.map((item) => this._itemRow(item, true))}</div>
      </div>
    </section>`;
  }

  static get haxProperties() {
    return {
      canScale: false,
      canEditSource: true,
      gizmo: {
        title: "Unit outline",
        description: "A unit's lessons, their materials and quiz, and the unit project.",
        icon: "icons:view-module",
        color: "blue",
        tags: ["Layout", "unit", "pathway", "outline"],
        meta: { author: "Michael Collins" },
      },
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-unit", properties: {}, content: "" }],
    };
  }
}

if (!customElements.get(OerUnit.tag)) customElements.define(OerUnit.tag, OerUnit);
registerBlocks(OerUnit);
