/**
 * The course site's sections, as HAX blocks: a course site page is made of
 * them (types/course-site.js COURSE_SITE_STARTER), and authors move,
 * remove and repeat them and put any other block between them.
 *
 * Generated sections draw from the course and its plan (the facts, the
 * semester, the projects, the instructors). Written ones hold what the
 * author types inside them, as ordinary blocks: the hero's tagline, what
 * you'll learn (outcomes, cs-items.js), the instructor's note, the tools
 * (a list) and the questions (each a heading with its answer under it).
 * Each section draws what readers see in both modes, with what's typed in
 * it in place (cs-shared.js SiteSection): its heading, and its outcomes as
 * cards. (The tools and the questions are typed as a list and as headings
 * and answers until they have items of their own, editor-redesign WP-08;
 * readers see them as chips and an accordion.)
 *
 *   <oer-cs-learn><h2>What you'll be able to do</h2><oer-cs-outcome><h3>Cut with confidence</h3><p>…</p></oer-cs-outcome></oer-cs-learn>
 *
 * What the editor may do with each is its static oerEditor (editor/
 * policy.js): its name, where it stays, the pages it belongs on, what it
 * takes, and where a generated one's content comes from.
 */
import { html, css } from "../../lit.js";
import { registerBlocks } from "../register.js";
import { SiteSection, csStyles, icon, hasContent, listItems, questions, OUTCOME_ICONS } from "./cs-shared.js";
import { rowsToItems } from "./cs-normalize.js";
import "./cs-items.js";
import "../../ui/oer-image-field.js";
import { editorControl } from "../../ui/editor-control.js";
import { siteForBook, bookSiteIsOn } from "../../types/book-site.js";
import { COURSE_SITE_TYPE } from "../../types/course-site.js";

// how sequence items read in the roadmap
const AS = { assignment: "Assignment", discussion: "Discussion", quiz: "Quiz" };

const gizmo = (title, description, icon) => ({ title, description, icon, color: "blue", tags: ["Course site", "course", "landing"], meta: { author: "Michael Collins" } });

// what a section is to the editor (editor/policy.js): the course site's pages
const COURSE = [COURSE_SITE_TYPE];
const FROM_COURSE = { label: "From the course page", kind: "course", section: "details" };
const FROM_PLAN = { label: "From the course plan", kind: "plan", section: "details" };
const written = (more) => ({ kind: "section", pageTypes: COURSE, attrs: ["heading"], ...more });
const generated = (source, more) => ({ kind: "section", pageTypes: COURSE, accepts: ["h2"], source, ...more });

// the text typed in a section (a tagline, a note), as readers see it
const slotted = css`
  .text-cell ::slotted(*) {
    margin: 0.375rem 0;
  }
  .text-cell ::slotted(ul),
  .text-cell ::slotted(ol) {
    padding-left: 1.25rem;
  }
  .rows .ph {
    padding-left: 1.25rem;
  }
`;

/* ---------- the hero: the course's name, the tagline, enroll ---------- */

export class OerCsHero extends SiteSection {
  static get tag() {
    return "oer-cs-hero";
  }
  static get properties() {
    // reflected: HAX's undo and Edit HTML work from the markup
    return { ...super.properties, image: { type: String, reflect: true }, alt: { type: String, reflect: true } };
  }
  static get headingTag() {
    // (its heading is the course's name)
    return null;
  }
  static get oerEditor() {
    return written({ label: "Hero", called: "the hero", pin: "first", accepts: ["p"], fields: { p: { name: "tagline" } }, attrs: ["image", "alt"] });
  }
  get shown() {
    return true;
  }
  renderSection(d) {
    const image = this.image || d.projects.map((p) => p.page.metadata?.oerFields?.image).find(Boolean) || d.work.map((w) => w.image).find(Boolean) || "";
    const alt = this.image ? this.alt || "" : "";
    const typed = hasContent(this);
    return html`<section class="hero">
      <div class="wrap hero-in">
        <div class="hero-text">
          <p class="kicker">${[d.code, d.institution, d.campus].filter(Boolean).join(" · ")}</p>
          <h1>${d.title.replace(new RegExp(`^${d.code}\\s*[:–—-]\\s*`), "")}</h1>
          ${this._editing || typed
            ? // (empty, readers see the page's description instead)
              this.textCell("Write the line under the title", "tagline")
            : d.tagline
              ? html`<p class="tagline">${d.tagline}</p>`
              : this.todo("Add a tagline: the line under the title. Edit content and type it there.")}
          <div class="ctas">
            ${d.enrollUrl ? html`<a class="btn primary" href="${d.enrollUrl}" target="_blank" rel="noopener">Enroll${icon("arrowUpRight")}</a>` : ""}
            ${d.weeks.length ? html`<button class="btn outline" @click="${() => this.go("oer-cs-semester")}">See the semester</button>` : ""}
          </div>
        </div>
        <div class="hero-art">
          ${image ? html`<img src="${image}" alt="${alt}" />` : html`<div class="art-fallback" aria-hidden="true"><span>${d.code || d.title}</span></div>`}
          ${this._editing
            ? html`<div class="image-edit">
                <span class="hint">${icon("pencil")}<span>${this.image ? "Hero image" : image ? "A project's image is shown. Choose a hero image of your own:" : "Choose a hero image: a wide picture, such as student work or the studio."}</span></span>
                <oer-image-field
                  ${editorControl()}
                  compact
                  label="Hero image"
                  .value="${this.image || ""}"
                  .alt="${this.alt || ""}"
                  @image-change="${(e) => {
                    this.image = e.detail.value || undefined;
                    this.alt = e.detail.alt || undefined;
                    if (!this.image) this.removeAttribute("image");
                    if (!this.alt) this.removeAttribute("alt");
                  }}"
                ></oer-image-field>
              </div>`
            : ""}
        </div>
      </div>
    </section>`;
  }
  static get styles() {
    return [
      csStyles,
      slotted,
      css`
        .hero {
          padding: 4rem 0 1.5rem;
        }
        .hero-in {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
          gap: 3rem;
          align-items: center;
        }
        h1 {
          margin: 0;
          font-size: clamp(2.25rem, 5vw, 3.75rem);
          line-height: 1.05;
          letter-spacing: -0.025em;
        }
        .tagline {
          max-width: 38ch;
          margin: 1.25rem 0 0;
          font-size: 1.25rem;
          line-height: 1.5;
          color: var(--muted-foreground);
          text-wrap: pretty;
        }
        .hero-art {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .image-edit {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--card);
        }
        .hint {
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
          font-size: 0.8125rem;
          line-height: 1.5;
          color: var(--muted-foreground);
        }
        .hint .i {
          margin-top: 0.125rem;
        }
        .hero-art img,
        .art-fallback {
          display: block;
          width: 100%;
          max-width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          border: 1px solid var(--border);
          border-radius: calc(var(--radius-lg) + 0.25rem);
        }
        .art-fallback {
          display: grid;
          place-items: center;
          background-color: var(--card);
          background-image:
            repeating-linear-gradient(0deg, transparent 0 23px, var(--border) 23px 24px),
            repeating-linear-gradient(90deg, transparent 0 23px, var(--border) 23px 24px);
        }
        .art-fallback span {
          font-family: var(--cs-font-display, inherit);
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: var(--cs-display-weight, 700);
          letter-spacing: -0.03em;
          color: var(--muted-foreground);
        }
        @media (max-width: 900px) {
          .hero-in {
            grid-template-columns: minmax(0, 1fr);
            gap: 2rem;
          }
          .hero {
            padding-top: 2.5rem;
          }
        }
      `,
    ];
  }
  static get haxProperties() {
    return {
      type: "grid",
      canScale: false,
      canEditSource: true,
      contentEditable: true,
      hideDefaultSettings: true,
      designSystem: false,
      gizmo: gizmo("Course site: hero", "The course's name, a tagline you write, the Enroll button and an image.", "icons:flag"),
      settings: {
        // the image is chosen on the hero itself while editing
        configure: [],
        advanced: [],
      },
      demoSchema: [{ tag: "oer-cs-hero", properties: {}, content: "<p></p>" }],
    };
  }
}

/* ---------- the facts: credits, length, format, projects, terms ---------- */

export class OerCsFacts extends SiteSection {
  static get tag() {
    return "oer-cs-facts";
  }
  static get headingTag() {
    return null;
  }
  static get oerEditor() {
    return generated(FROM_COURSE, { label: "Facts", accepts: [] });
  }
  facts(d) {
    return [
      d.credits && ["cap", `${d.credits} credit${d.credits === "1" ? "" : "s"}`, "Credits"],
      d.weekCount && ["calendar", `${d.weekCount} weeks`, "Length"],
      d.delivery && ["monitor", d.delivery, "Format"],
      d.projects.length && ["hammer", `${d.projects.length} project${d.projects.length === 1 ? "" : "s"}`, "You'll make"],
      d.terms.length && ["clock", d.terms.join(", "), "Offered"],
    ].filter(Boolean);
  }
  get shown() {
    return !!this._d && (this.facts(this._d).length > 0 || this._d.prerequisites.length > 0 || !!this._d.prerequisiteNote);
  }
  renderSection(d) {
    const facts = this.facts(d);
    if (!this.shown) return this.todo("The course's facts (credits, length, format) show here once the course page has them.");
    return html`<div class="wrap facts-wrap">
      ${facts.length ? html`<dl class="facts">${facts.map(([i, value, label]) => html`<div class="fact"><span class="fact-icon">${icon(i)}</span><dt>${label}</dt><dd>${value}</dd></div>`)}</dl>` : ""}
      ${d.prerequisites.length || d.prerequisiteNote
        ? html`<p class="prereq">
            <b>Before you take it:</b>
            ${d.prerequisites.map((c, n) => html`${n ? ", " : " "}<a href="${c.slug}">${c.metadata?.oerFields?.code || c.title}</a>`)}${d.prerequisiteNote ? html`<span class="muted"> ${d.prerequisiteNote}</span>` : ""}
          </p>`
        : ""}
    </div>`;
  }
  static get styles() {
    return [
      csStyles,
      css`
        .facts-wrap {
          padding-block: 1.5rem 2.5rem;
        }
        .facts {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
          gap: 0.75rem;
          margin: 0;
        }
        .fact {
          display: grid;
          grid-template-columns: auto 1fr;
          grid-template-rows: auto auto;
          column-gap: 0.75rem;
          align-items: center;
          padding: 1rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--card);
        }
        .fact-icon {
          grid-row: span 2;
          display: inline-grid;
          place-items: center;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: var(--radius-md);
          background: var(--muted);
        }
        .fact dt {
          font-size: 0.75rem;
          color: var(--muted-foreground);
        }
        .fact dd {
          margin: 0;
          font-weight: 600;
        }
        .prereq {
          margin: 1rem 0 0;
          font-size: 0.875rem;
        }
      `,
    ];
  }
  static get haxProperties() {
    return {
      type: "element",
      canScale: false,
      canEditSource: false,
      hideDefaultSettings: true,
      designSystem: false,
      gizmo: gizmo("Course site: facts", "Credits, length, format, projects and terms, from the course and its plan.", "icons:dashboard"),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-cs-facts", properties: {}, content: "" }],
    };
  }
}

/* ---------- what you'll learn: outcomes, shown as cards ---------- */

export class OerCsLearn extends SiteSection {
  static get tag() {
    return "oer-cs-learn";
  }
  static get properties() {
    // (the heading attribute of pages written before headings were typed in place)
    return { ...super.properties, heading: { type: String, reflect: true } };
  }
  static get oerEditor() {
    return written({ label: "What you'll learn", accepts: ["h2", "oer-cs-outcome"], flow: "cards" });
  }
  get shown() {
    return this.items.some((item) => item.hasText) || listItems(this).length > 0;
  }
  // a list written before outcomes: one outcome a row
  upgradeItems() {
    return rowsToItems(this, "oer-cs-outcome");
  }
  renderSection() {
    const outcomes = this.items.some((item) => item.hasText);
    // (a list written before outcomes, as readers still see it)
    const rows = outcomes ? [] : listItems(this);
    if (!this._editing && !outcomes && !rows.length && !this._author) return html``;
    return html`<section class="section">
      <div class="wrap">
        ${this.headingCell("What you'll learn")}
        ${this._editing
          ? this._editingCards()
          : outcomes
            ? html`<div class="cards" role="list"><slot name="items"></slot></div>`
            : rows.length
              ? html`<ul class="cards" role="list">
                  ${rows.map(
                    (o, n) => html`<li class="card">
                      <span class="tile">${icon(OUTCOME_ICONS[n % OUTCOME_ICONS.length])}</span>
                      <h3>${o.title}</h3>
                      ${o.text ? html`<p>${o.text}</p>` : ""}
                    </li>`,
                  )}
                </ul>`
              : this.todo("Add what students will learn: Edit content and add an outcome for each.")}
      </div>
    </section>`;
  }
  // while editing: the outcomes as cards, and a card to add one; with none
  // yet, faint cards showing what goes there
  _editingCards() {
    const last = this.items.at(-1);
    const add = (unit) => this.request("add-item", unit ? { unit } : {});
    return html`<div class="cards">
      <div class="list" role="list"><slot name="items"></slot></div>
      <button class="add-card ${last ? "" : "first"}" ${editorControl()} @click="${() => add(last)}">${icon("plus")}<span>Add an outcome</span></button>
      ${last ? "" : html`<div class="ghost" aria-hidden="true"><span></span><span></span></div><div class="ghost" aria-hidden="true"><span></span><span></span></div>`}
    </div>`;
  }
  static get styles() {
    return [
      csStyles,
      css`
        .tile {
          display: inline-grid;
          place-items: center;
          width: 2.5rem;
          height: 2.5rem;
          margin-bottom: 0.25rem;
          border-radius: var(--radius-md);
          background: color-mix(in oklab, var(--primary) 14%, transparent);
          color: var(--primary);
        }
        .tile .i {
          width: 1.25rem;
          height: 1.25rem;
        }
        /* while editing, the cards (the list's items) and the cards to add
           one share the grid */
        .list {
          display: contents;
        }
        .add-card,
        .ghost {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-height: 9rem;
          padding: 1.25rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
        }
        .add-card {
          align-items: center;
          justify-content: center;
          background: transparent;
          color: var(--muted-foreground);
          font-weight: 500;
          cursor: pointer;
        }
        .add-card.first {
          background: color-mix(in oklab, var(--primary) 6%, var(--background));
          color: var(--foreground);
        }
        .add-card:hover {
          background: var(--accent);
          color: var(--foreground);
        }
        .add-card:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
        }
        .ghost {
          opacity: 0.5;
          background: var(--background);
        }
        .ghost span {
          display: block;
          height: 0.75rem;
          border-radius: 999px;
          background: var(--muted);
        }
        .ghost span:first-child {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: var(--radius-md);
        }
      `,
    ];
  }
  static get haxProperties() {
    return {
      type: "grid",
      canScale: false,
      canEditSource: true,
      contentEditable: true,
      hideDefaultSettings: true,
      designSystem: false,
      gizmo: gizmo("Course site: what you'll learn", "Outcomes you write, each a title and a sentence, shown as cards.", "icons:list"),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-cs-learn", properties: {}, content: "<h2></h2><oer-cs-outcome><h3></h3><p></p></oer-cs-outcome>" }],
    };
  }
}

/* ---------- the semester, week by week, from the course plan ---------- */

export class OerCsSemester extends SiteSection {
  static get tag() {
    return "oer-cs-semester";
  }
  static get properties() {
    return { ...super.properties, heading: { type: String, reflect: true } };
  }
  static get oerEditor() {
    return generated(FROM_PLAN, { label: "The semester", called: "the semester" });
  }
  get shown() {
    return !!this._d?.weeks.length;
  }
  renderSection(d) {
    if (!d.weeks.length) return this._author ? html`<section class="section"><div class="wrap">${this.headingCell("The semester")}${this.todo("Link a course plan (a sequence) in Page details to show the semester week by week.")}</div></section>` : html``;
    return html`<section class="section alt">
      <div class="wrap">
        ${this.headingCell("The semester, week by week")}
        <p class="lede">${d.weekCount} weeks${d.projects.length ? `, building to ${d.projects.length} project${d.projects.length === 1 ? "" : "s"}` : ""}.</p>
        <ol class="weeks" role="list">
          ${d.weeks.map((w) => {
            const project = w.items.find((it) => it.page.metadata?.pageType === "oer:project");
            const shown = w.items.slice(0, 4);
            const more = w.items.length - shown.length;
            return html`<li class="week">
              <span class="week-n">Week ${w.week}</span>
              <div>
                <h3>${w.title}${project ? html`<span class="badge">Project</span>` : ""}</h3>
                ${shown.length
                  ? html`<p class="week-items">
                      ${shown.map((it, n) => html`${n ? html`<span class="dot" aria-hidden="true">·</span>` : ""}<a href="${it.page.slug}">${it.title || it.page.title}</a>${AS[it.as] ? html`<span class="as">${AS[it.as]}</span>` : ""}`)}${more
                        ? html`<span class="dot" aria-hidden="true">·</span><span class="muted">${more} more</span>`
                        : ""}
                    </p>`
                  : ""}
              </div>
            </li>`;
          })}
        </ol>
      </div>
    </section>`;
  }
  static get styles() {
    return [
      csStyles,
      css`
        .weeks {
          display: flex;
          flex-direction: column;
          margin: 0;
          padding: 0;
          list-style: none;
          border-top: 1px solid var(--border);
        }
        .week {
          display: grid;
          grid-template-columns: 6rem minmax(0, 1fr);
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border);
        }
        .week-n {
          padding-top: 0.125rem;
          font-size: 0.8125rem;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--muted-foreground);
        }
        .week h3 {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
        }
        .badge {
          padding: 0.0625rem 0.5rem;
          border-radius: 999px;
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--primary-foreground);
          background: var(--primary);
        }
        .week-items {
          margin: 0.375rem 0 0;
          font-size: 0.875rem;
          line-height: 1.6;
        }
        .week-items a {
          color: var(--foreground);
          text-decoration: none;
        }
        .week-items a:hover {
          text-decoration: underline;
        }
        .dot {
          margin: 0 0.375rem;
          color: var(--muted-foreground);
        }
        .as {
          margin-left: 0.25rem;
          font-size: 0.75rem;
          color: var(--muted-foreground);
        }
        @media (max-width: 600px) {
          .week {
            grid-template-columns: minmax(0, 1fr);
            gap: 0.25rem;
          }
        }
      `,
    ];
  }
  static get haxProperties() {
    return {
      // a grid holding only its heading, which is typed in place
      type: "grid",
      canScale: false,
      canEditSource: false,
      contentEditable: true,
      hideDefaultSettings: true,
      designSystem: false,
      gizmo: gizmo("Course site: the semester", "The course plan week by week, with its projects.", "icons:date-range"),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-cs-semester", properties: {}, content: "<h2></h2>" }],
    };
  }
}

/* ---------- what you'll make: the plan's projects and student work ---------- */

export class OerCsMake extends SiteSection {
  static get tag() {
    return "oer-cs-make";
  }
  static get properties() {
    return { ...super.properties, heading: { type: String, reflect: true } };
  }
  static get oerEditor() {
    return generated(FROM_PLAN, { label: "What you'll make" });
  }
  get shown() {
    return !!(this._d?.projects.length || this._d?.work.length);
  }
  renderSection(d) {
    if (!this.shown) return this._author ? html`<section class="section"><div class="wrap">${this.headingCell("What you'll make")}${this.todo("Projects in the course plan, and student work on the course page, show here.")}</div></section>` : html``;
    return html`<section class="section">
      <div class="wrap">
        ${this.headingCell("What you'll make")}
        ${d.projects.length
          ? html`<ul class="cards" role="list">
              ${d.projects.map(({ page, week }) => {
                const pf = page.metadata?.oerFields || {};
                return html`<li class="card media">
                  ${pf.image ? html`<img src="${pf.image}" alt="${pf.imageAlt || ""}" />` : ""}
                  <div class="card-body">
                    <p class="kicker">Week ${week}</p>
                    <h3><a href="${page.slug}">${page.title}</a></h3>
                    ${page.description ? html`<p>${page.description}</p>` : ""}
                  </div>
                </li>`;
              })}
            </ul>`
          : ""}
        ${d.work.length
          ? html`<h3 class="sub-h">Student work</h3>
              <ul class="cards" role="list">
                ${d.work.map(
                  (w) => html`<li class="card media">
                    ${w.image ? html`<img src="${w.image}" alt="${w.alt || w.title || ""}" />` : ""}
                    <div class="card-body">
                      <h3>${w.url ? html`<a class="out" href="${w.url}" target="_blank" rel="noopener">${w.title || w.url}${icon("arrowUpRight")}</a>` : w.title}</h3>
                      ${w.description ? html`<p>${w.description}</p>` : ""}
                    </div>
                  </li>`,
                )}
              </ul>`
          : ""}
      </div>
    </section>`;
  }
  static get styles() {
    return [
      csStyles,
      css`
        .sub-h {
          margin: 2.5rem 0 1rem;
          font-size: 1.125rem;
        }
        .card.media {
          padding: 0;
        }
        .card img {
          display: block;
          width: 100%;
          max-width: 100%;
          aspect-ratio: 16 / 10;
          object-fit: cover;
          border-bottom: 1px solid var(--border);
        }
        .card-body {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          padding: 1.25rem;
        }
        .card-body .kicker {
          margin: 0;
          font-size: 0.75rem;
        }
        .card h3 a {
          color: inherit;
          text-decoration: none;
        }
        .card h3 a:hover {
          text-decoration: underline;
        }
        .out {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }
      `,
    ];
  }
  static get haxProperties() {
    return {
      // a grid holding only its heading, which is typed in place
      type: "grid",
      canScale: false,
      canEditSource: false,
      contentEditable: true,
      hideDefaultSettings: true,
      designSystem: false,
      gizmo: gizmo("Course site: what you'll make", "The course plan's projects and the course's student work.", "icons:build"),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-cs-make", properties: {}, content: "<h2></h2>" }],
    };
  }
}

/* ---------- the course's books, linking to their book sites ---------- */

export class OerCsBooks extends SiteSection {
  static get tag() {
    return "oer-cs-books";
  }
  static get properties() {
    return { ...super.properties, heading: { type: String, reflect: true } };
  }
  static get oerEditor() {
    return generated(FROM_COURSE, { label: "Books" });
  }
  // the course's books (its Books field), each with its book site if it has one on
  books() {
    const course = this._d?.course;
    const ids = (Array.isArray(course?.metadata?.oerFields?.books) ? course.metadata.oerFields.books : []).map((r) => (typeof r === "string" ? r : r?.page)).filter(Boolean);
    return ids
      .map((id) => (this._items || []).find((i) => i.id === id))
      .filter((b) => b && b.metadata?.published !== false)
      .map((book) => {
        const site = siteForBook(book, this._items);
        return { book, site, on: bookSiteIsOn(site) };
      });
  }
  get shown() {
    return this.books().some((b) => b.on);
  }
  renderSection() {
    const all = this.books();
    const shown = this._author ? all : all.filter((b) => b.on);
    if (!shown.length) return this._author ? html`<section class="section"><div class="wrap">${this.headingCell("Read the book")}${this.todo("The course's books show here: add them in the course page's Books field, and turn on each book's site from its page.")}</div></section>` : html``;
    return html`<section class="section">
      <div class="wrap">
        ${this.headingCell(shown.length > 1 ? "Read the books" : "Read the book")}
        <ul class="books" role="list">
          ${shown.map(({ book, site, on }) => {
            const f = book.metadata?.oerFields || {};
            return html`<li class="book">
              ${f.coverImage ? html`<img src="${f.coverImage}" alt="${f.coverImageAlt || ""}" loading="lazy" />` : html`<div class="cover-art" aria-hidden="true"><span>${book.title.split(":")[0]}</span></div>`}
              <div>
                <h3>${on ? html`<a class="stretch" href="${site.slug}">${book.title}</a>` : book.title}</h3>
                ${book.description ? html`<p>${book.description}</p>` : ""}
                ${on
                  ? html`<span class="go">Read it online, or download it${icon("arrowRight")}</span>`
                  : html`<p class="note">${icon("eyeOff")}<span>Readers don't see this book yet: turn on its book site from <a href="${book.slug}">the book's page</a>.</span></p>`}
              </div>
            </li>`;
          })}
        </ul>
      </div>
    </section>`;
  }
  static get styles() {
    return [
      csStyles,
      css`
        .books {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
          gap: 1.25rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .book {
          position: relative;
          display: grid;
          grid-template-columns: 7rem minmax(0, 1fr);
          gap: 1.25rem;
          align-items: start;
          padding: 1.25rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--background);
        }
        .book:focus-within {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
        }
        .book img,
        .cover-art {
          width: 7rem;
          aspect-ratio: 3 / 4;
          object-fit: cover;
          border-radius: var(--radius-sm, 0.375rem);
          box-shadow: 0 6px 16px rgb(0 0 0 / 0.15);
        }
        .cover-art {
          display: grid;
          place-items: center;
          background: color-mix(in oklab, var(--primary) 14%, var(--card));
          color: var(--primary);
          font-family: var(--cs-font-display, inherit);
          font-weight: var(--cs-display-weight, 700);
          text-align: center;
        }
        h3 {
          margin: 0 0 0.375rem;
          font-family: var(--cs-font-display, inherit);
          font-size: 1.125rem;
          font-weight: var(--cs-display-weight, 700);
          line-height: 1.3;
        }
        h3 a {
          color: inherit;
          text-decoration: none;
        }
        .stretch::after {
          content: "";
          position: absolute;
          inset: 0;
        }
        .stretch:focus-visible {
          outline: none;
        }
        p {
          margin: 0 0 0.5rem;
          font-size: 0.9375rem;
          line-height: 1.5;
          color: var(--muted-foreground);
        }
        .go {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--link);
        }
        .note {
          display: flex;
          gap: 0.375rem;
          align-items: flex-start;
          font-size: 0.8125rem;
        }
        .note .i {
          margin-top: 0.125rem;
        }
        @media (max-width: 520px) {
          .books {
            grid-template-columns: minmax(0, 1fr);
          }
          .book {
            grid-template-columns: 5rem minmax(0, 1fr);
          }
          .book img,
          .cover-art {
            width: 5rem;
          }
        }
      `,
    ];
  }
  static get haxProperties() {
    return {
      // a grid holding only its heading, which is typed in place
      type: "grid",
      canScale: false,
      canEditSource: false,
      contentEditable: true,
      hideDefaultSettings: true,
      designSystem: false,
      gizmo: gizmo("Course site: the books", "The course's books, each linking to its book site to read online or download.", "icons:book"),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-cs-books", properties: {}, content: "<h2></h2>" }],
    };
  }
}

/* ---------- who teaches it: the course's instructors and a note ---------- */

export class OerCsPeople extends SiteSection {
  static get tag() {
    return "oer-cs-people";
  }
  static get properties() {
    return { ...super.properties, heading: { type: String, reflect: true } };
  }
  static get oerEditor() {
    return written({ label: "Who teaches it", accepts: ["h2", "p"], fields: { p: { name: "note" } } });
  }
  get shown() {
    return !!this._d?.instructors.length || hasContent(this);
  }
  renderSection(d) {
    const note = hasContent(this);
    if (!this._editing && !this.shown && !this._author) return html``;
    return html`<section class="section alt">
      <div class="wrap narrow">
        ${this.headingCell("Who teaches it")}
        ${d.instructors.map(
          (p) => html`<p class="person">
            <span class="avatar" aria-hidden="true">${p.name.split(/\s+/).map((s) => s[0]).slice(0, 2).join("")}</span>
            ${p.url ? html`<a href="${p.url}" target="_blank" rel="noopener">${p.name}</a>` : html`<span>${p.name}</span>`}
          </p>`,
        )}
        ${!d.instructors.length && this._author ? this.todo("Instructors come from the course page: add them in its Page details.") : ""}
        ${this._editing || note ? html`<blockquote class="note">${this.textCell("A note from the instructor, in their own words")}</blockquote>` : ""}
      </div>
    </section>`;
  }
  static get styles() {
    return [
      csStyles,
      slotted,
      css`
        .person {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 0 0 0.75rem;
          font-weight: 600;
        }
        .avatar {
          display: inline-grid;
          place-items: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background: var(--muted);
          font-size: 0.875rem;
          text-transform: uppercase;
        }
        .note {
          margin: 1rem 0 0;
          padding: 0 0 0 1rem;
          border-left: 2px solid var(--border);
          font-size: 1.0625rem;
          line-height: 1.6;
          color: var(--muted-foreground);
        }
      `,
    ];
  }
  static get haxProperties() {
    return {
      type: "grid",
      canScale: false,
      canEditSource: true,
      contentEditable: true,
      hideDefaultSettings: true,
      designSystem: false,
      gizmo: gizmo("Course site: who teaches it", "The course's instructors, and a note from them you write.", "social:people"),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-cs-people", properties: {}, content: "<h2></h2><p></p>" }],
    };
  }
}

/* ---------- tools: a list, shown as chips ---------- */

export class OerCsTools extends SiteSection {
  static get tag() {
    return "oer-cs-tools";
  }
  static get properties() {
    return { ...super.properties, heading: { type: String, reflect: true } };
  }
  static get oerEditor() {
    return written({ label: "Tools", accepts: ["h2", "ul", "ol"], flow: "chips", fields: { li: { name: "tool", paste: "line" } } });
  }
  get shown() {
    return listItems(this).length > 0;
  }
  renderSection() {
    const tools = listItems(this).map((t) => [t.title, t.text].filter(Boolean).join(": "));
    if (!this._editing && !tools.length && !this._author) return html``;
    return html`<section class="section">
      <div class="wrap">
        ${this.headingCell("Tools you'll use")}
        ${this._editing
          ? this.textCell("The software, machines and materials students use, one a row", "rows")
          : tools.length
            ? html`<ul class="chips" role="list">${tools.map((t) => html`<li>${t}</li>`)}</ul>`
            : this.todo("Add the tools students use: Edit content and type a list here.")}
      </div>
    </section>`;
  }
  static get styles() {
    return [
      csStyles,
      slotted,
      css`
        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .chips li {
          padding: 0.375rem 0.75rem;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: var(--card);
          font-size: 0.875rem;
        }
      `,
    ];
  }
  static get haxProperties() {
    return {
      type: "grid",
      canScale: false,
      canEditSource: true,
      contentEditable: true,
      hideDefaultSettings: true,
      designSystem: false,
      gizmo: gizmo("Course site: tools", "A list you write of software, machines and materials, shown as chips.", "icons:extension"),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-cs-tools", properties: {}, content: "<h2></h2><ul><li></li></ul>" }],
    };
  }
}

/* ---------- questions: each a heading with its answer, as an accordion ---------- */

export class OerCsFaq extends SiteSection {
  static get tag() {
    return "oer-cs-faq";
  }
  static get properties() {
    return { ...super.properties, heading: { type: String, reflect: true } };
  }
  static get oerEditor() {
    return written({
      label: "Questions",
      accepts: ["h2", "h3", "h4", "h5", "h6", "p", "ul", "ol"],
      flow: "stack",
      fields: { h3: { name: "question", single: true, paste: "line" }, p: { name: "answer" }, li: { name: "answer" } },
    });
  }
  get shown() {
    return questions(this).length > 0;
  }
  renderSection() {
    const qs = questions(this);
    if (!this._editing && !qs.length && !this._author) return html``;
    return html`<section class="section">
      <div class="wrap narrow">
        ${this.headingCell("Questions")}
        ${this._editing
          ? this.textCell("A question students ask, then its answer under it", "questions")
          : qs.length
            ? html`<div class="faq">
                ${qs.map(
                  (f) => html`<details>
                    <summary>${f.q}${icon("chevron")}</summary>
                    <div class="answer">${f.a}</div>
                  </details>`,
                )}
              </div>`
            : this.todo("Add the questions students ask: Edit content and type each as a heading with its answer under it.")}
      </div>
    </section>`;
  }
  static get styles() {
    return [
      csStyles,
      slotted,
      css`
        .faq details {
          border-bottom: 1px solid var(--border);
        }
        .faq summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 0;
          font-weight: 600;
          cursor: pointer;
          list-style: none;
        }
        .faq summary::-webkit-details-marker {
          display: none;
        }
        .faq summary .i {
          color: var(--muted-foreground);
          transition: transform 0.15s;
        }
        .faq details[open] summary .i {
          transform: rotate(180deg);
        }
        .answer {
          padding-bottom: 1rem;
          line-height: 1.6;
          color: var(--muted-foreground);
        }
        .answer > * {
          margin: 0 0 0.5rem;
        }
        @media (prefers-reduced-motion: reduce) {
          .faq summary .i {
            transition: none;
          }
        }
      `,
    ];
  }
  static get haxProperties() {
    return {
      type: "grid",
      canScale: false,
      canEditSource: true,
      contentEditable: true,
      hideDefaultSettings: true,
      designSystem: false,
      gizmo: gizmo("Course site: questions", "Questions you write, each a heading with its answer, shown as an accordion.", "icons:help"),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-cs-faq", properties: {}, content: "<h2></h2><h3></h3><p></p>" }],
    };
  }
}

/* ---------- the last call to enroll ---------- */

export class OerCsClosing extends SiteSection {
  static get tag() {
    return "oer-cs-closing";
  }
  static get properties() {
    return { ...super.properties, heading: { type: String, reflect: true } };
  }
  static get oerEditor() {
    return generated(FROM_COURSE, { label: "Ready to start", pin: "last" });
  }
  renderSection(d) {
    return html`<section class="closing">
      <div class="wrap closing-in">
        ${this.headingCell("Ready to start?")}
        <p>${d.title}${d.terms.length ? `, offered ${d.terms.join(" and ").toLowerCase()}` : ""}.</p>
        <div class="ctas">
          ${d.enrollUrl ? html`<a class="btn primary" href="${d.enrollUrl}" target="_blank" rel="noopener">Enroll${icon("arrowUpRight")}</a>` : ""}
          ${d.bulletin && d.bulletin !== d.enrollUrl ? html`<a class="btn outline" href="${d.bulletin}" target="_blank" rel="noopener">Bulletin entry</a>` : ""}
        </div>
        ${!d.enrollUrl && this._author ? html`<p class="hint">Add the enroll link in Page details to show an Enroll button.</p>` : ""}
      </div>
    </section>`;
  }
  static get styles() {
    return [
      csStyles,
      css`
        .closing {
          padding: 4.5rem 0;
          background: color-mix(in oklab, var(--primary) 10%, var(--background));
          border-top: 1px solid var(--border);
        }
        .closing-in {
          text-align: center;
        }
        .closing p {
          margin: 0;
          color: var(--muted-foreground);
        }
        .closing .ctas {
          justify-content: center;
        }
        .closing .hint {
          margin-top: 1rem;
          font-size: 0.8125rem;
        }
      `,
    ];
  }
  static get haxProperties() {
    return {
      // a grid holding only its heading, which is typed in place
      type: "grid",
      canScale: false,
      canEditSource: false,
      contentEditable: true,
      hideDefaultSettings: true,
      designSystem: false,
      gizmo: gizmo("Course site: ready to start", "A last call to enroll, with the bulletin entry.", "icons:send"),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-cs-closing", properties: {}, content: "<h2></h2>" }],
    };
  }
}

const SECTIONS = [OerCsHero, OerCsFacts, OerCsLearn, OerCsSemester, OerCsMake, OerCsBooks, OerCsPeople, OerCsTools, OerCsFaq, OerCsClosing];
for (const cls of SECTIONS) if (!customElements.get(cls.tag)) customElements.define(cls.tag, cls);
registerBlocks(...SECTIONS);
