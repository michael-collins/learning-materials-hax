/**
 * The course site's sections, as HAX blocks: a course site page is made of
 * them (types/course-site.js COURSE_SITE_STARTER), and authors move,
 * remove and repeat them and put any other block between them.
 *
 * Generated sections draw from the course and its plan (the facts, the
 * semester, the projects, the books, the instructors, the last call to
 * enroll); only their heading is typed, and with nothing to show they tell
 * authors where it comes from, with a button that goes there
 * (SiteSection.fromElsewhere). Written ones hold what the author types
 * inside them, as ordinary blocks: the hero's tagline, the instructor's
 * note, and items (cs-items.js): what you'll learn's outcomes, the tools
 * and the questions. Each section draws what readers see in both modes,
 * with what's typed in it in place (cs-shared.js SiteSection): its
 * heading, its text, and its items as cards, chips or an accordion.
 *
 *   <oer-cs-learn><h2>What you'll be able to do</h2><oer-cs-outcome><h3>Cut with confidence</h3><p>…</p></oer-cs-outcome></oer-cs-learn>
 *   <oer-cs-tools><oer-cs-tool><p>Epilog Fusion Pro laser cutter</p></oer-cs-tool></oer-cs-tools>
 *   <oer-cs-faq><h2>Questions</h2><oer-cs-question><h3>Do I need experience?</h3><p>No.</p></oer-cs-question></oer-cs-faq>
 *   <oer-cs-semester><h2>Fifteen weeks, three projects</h2></oer-cs-semester>
 *
 * Sections written before they had items (a list, questions as headings
 * and answers) read as before, and become items as editing begins
 * (cs-normalize.js; nu-hax scripts/course-site-structure.mjs does the same
 * to saved pages).
 *
 * What the editor may do with each is its static oerEditor (editor/
 * policy.js): its name, where it stays, the pages it belongs on, what it
 * takes, and where a generated one's content comes from. Each demoSchema
 * (what HAX inserts while editing) is its part of COURSE_SITE_STARTER with
 * its heading to type in, which isn't saved while empty.
 */
import { html, css } from "../../lit.js";
import { registerBlocks } from "../register.js";
import { SiteSection, csStyles, icon, hasContent, listItems, questions, OUTCOME_ICONS, TEXT_BLOCKS } from "./cs-shared.js";
import { faqHeading } from "./cs-normalize.js";
import "./cs-items.js";
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
`;

/* ---------- the hero: the course's name, the tagline, enroll ---------- */

export class OerCsHero extends SiteSection {
  static get tag() {
    return "oer-cs-hero";
  }
  static get properties() {
    // reflected: HAX's undo and Edit HTML work from the markup (and the
    // OER Courses catalog reads them from the saved page)
    return { ...super.properties, image: { type: String, reflect: true }, alt: { type: String, reflect: true }, decorative: { type: Boolean, reflect: true } };
  }
  static get headingTag() {
    // (its heading is the course's name)
    return null;
  }
  static get oerEditor() {
    return written({ label: "Hero", called: "the hero", pin: "first", accepts: ["h2", ...TEXT_BLOCKS], fields: { p: { name: "tagline" } }, attrs: ["image", "alt"] });
  }
  constructor() {
    super();
    this.decorative = false;
  }
  get shown() {
    return true;
  }
  /**
   * Change image: asked of the editor (an `oer-edit-request` { action:
   * "image" }), whose image popover (editor/oer-image-popover.js) sets
   * image, alt and decorative as one undo step; focus comes back to opener
   * (the button: Safari doesn't focus a clicked button).
   */
  changeImage(opener = null) {
    this.request("image", { opener });
  }

  renderSection(d) {
    const image = this.image || d.projects.map((p) => p.page.metadata?.oerFields?.image).find(Boolean) || d.work.map((w) => w.image).find(Boolean) || "";
    const alt = this.image && !this.decorative ? this.alt || "" : "";
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
          <div class="art">
            ${image ? html`<img src="${image}" alt="${alt}" />` : html`<div class="art-fallback" aria-hidden="true"><span>${d.code || d.title}</span></div>`}
            ${this._editing
              ? html`<button class="btn outline sm change-image" ${editorControl()} aria-haspopup="dialog" @click="${(e) => this.changeImage(e.currentTarget)}">
                  ${icon("image")}<span>Change image</span>
                </button>`
              : ""}
          </div>
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
        /* (the text at the top, so nothing under the picture moves it) */
        .hero-in {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
          gap: 3rem;
          align-items: start;
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
        .art {
          position: relative;
        }
        /* while editing, on the picture's corner */
        .change-image {
          position: absolute;
          right: 0.75rem;
          bottom: 0.75rem;
          background: var(--background);
        }
        .change-image:hover {
          background: var(--accent);
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
    if (!this.shown) {
      return this._author ? html`<div class="wrap facts-wrap">${this.fromElsewhere("The course's facts (credits, length, format) come from the course page.", "Edit course details", { field: "credits" })}</div>` : html``;
    }
    return html`<div class="wrap facts-wrap">
      ${facts.length
        ? html`<dl class="facts">${facts.map(([i, value, label]) => html`<div class="fact"><dt><span class="fact-icon">${icon(i)}</span>${label}</dt><dd>${value}</dd></div>`)}</dl>`
        : ""}
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
        /* the icon beside the label and the value, out of the list's flow
           (a dl's groups hold only dt and dd) */
        .fact {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 2.25rem;
          padding: 1rem 1rem 1rem 4rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--card);
        }
        .fact-icon {
          position: absolute;
          top: 50%;
          left: 1rem;
          display: inline-grid;
          place-items: center;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: var(--radius-md);
          background: var(--muted);
          translate: 0 -50%;
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
    return html`<div class="cards">
      <div class="list" role="list"><slot name="items"></slot></div>
      ${this.addCell("add-card")}
      ${this.items.length ? "" : html`<div class="ghost" aria-hidden="true"><span></span><span></span></div><div class="ghost" aria-hidden="true"><span></span><span></span></div>`}
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
    if (!d.weeks.length) {
      if (!this._author) return html``;
      const where = d.sequence
        ? this.fromElsewhere("The semester comes from the course plan, which has no weeks yet.", "Open the course plan")
        : this.fromElsewhere("The semester comes from a course plan.", "Choose a course plan", { field: "sequence" });
      return html`<section class="section"><div class="wrap">${this.headingCell("The semester, week by week")}${where}</div></section>`;
    }
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
    if (!this.shown) {
      if (!this._author) return html``;
      const where = d.sequence
        ? this.fromElsewhere("Projects come from the course plan, which has none yet, and student work from the course page.", "Add student work", { kind: "course", field: "studentWork" })
        : this.fromElsewhere("Projects come from a course plan, and student work from the course page.", "Choose a course plan", { field: "sequence" });
      return html`<section class="section"><div class="wrap">${this.headingCell("What you'll make")}${where}</div></section>`;
    }
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
    if (!shown.length) {
      return this._author
        ? html`<section class="section"><div class="wrap">${this.headingCell("Read the book")}${this.fromElsewhere("Books come from the course page. Each shows here once its book site is on.", "Add books", { field: "books" })}</div></section>`
        : html``;
    }
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
    return written({ label: "Who teaches it", accepts: ["h2", ...TEXT_BLOCKS], fields: { p: { name: "note" } } });
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
        ${!d.instructors.length ? this.fromElsewhere("Instructors come from the course page.", "Add instructors", { kind: "course", field: "instructors" }) : ""}
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

/* ---------- tools: shown as chips ---------- */

export class OerCsTools extends SiteSection {
  static get tag() {
    return "oer-cs-tools";
  }
  static get properties() {
    // (the heading attribute of pages written before headings were typed in place)
    return { ...super.properties, heading: { type: String, reflect: true } };
  }
  static get oerEditor() {
    return written({ label: "Tools", accepts: ["h2", "oer-cs-tool"], flow: "chips" });
  }
  get shown() {
    return this.items.some((item) => item.hasText) || listItems(this).length > 0;
  }
  renderSection() {
    const typed = this.items.some((item) => item.hasText);
    // (a list written before tools, as readers still see it)
    const rows = typed ? [] : listItems(this).map((t) => [t.title, t.text].filter(Boolean).join(": "));
    if (!this._editing && !typed && !rows.length && !this._author) return html``;
    return html`<section class="section">
      <div class="wrap">
        ${this.headingCell("Tools you'll use")}
        ${this._editing
          ? // the tools as chips, and a chip to add one; with none yet, a faint chip too
            html`<div class="chips">
              <div class="list" role="list"><slot name="items"></slot></div>
              ${this.addCell("add-chip")}${this.items.length ? "" : html`<span class="ghost-chip" aria-hidden="true"></span>`}
            </div>`
          : typed
            ? html`<div class="chips" role="list"><slot name="items"></slot></div>`
            : rows.length
              ? html`<ul class="chips" role="list">${rows.map((t) => html`<li>${t}</li>`)}</ul>`
              : this.todo("Add the tools students use: Edit content and add a tool for each.")}
      </div>
    </section>`;
  }
  static get styles() {
    return [
      csStyles,
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
        /* while editing, the chips (the list's items) and the chip to add
           one share the row */
        .list {
          display: contents;
        }
        .add-chip,
        .ghost-chip {
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          min-height: 2.125rem;
          padding: 0 0.75rem;
          border: 1px solid var(--border);
          border-radius: 999px;
          font-size: 0.875rem;
        }
        .add-chip {
          background: transparent;
          color: var(--muted-foreground);
          font-weight: 500;
          cursor: pointer;
        }
        .add-chip.first {
          background: color-mix(in oklab, var(--primary) 6%, var(--background));
          color: var(--foreground);
        }
        .add-chip:hover {
          background: var(--accent);
          color: var(--foreground);
        }
        .ghost-chip {
          width: 9rem;
          opacity: 0.5;
          background: var(--card);
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
      gizmo: gizmo("Course site: tools", "The software, machines and materials students use, each one you write shown as a chip.", "icons:extension"),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-cs-tools", properties: {}, content: "<h2></h2><oer-cs-tool><p></p></oer-cs-tool>" }],
    };
  }
}

/* ---------- questions: each with its answer, as an accordion ---------- */

export class OerCsFaq extends SiteSection {
  static get tag() {
    return "oer-cs-faq";
  }
  static get properties() {
    return { ...super.properties, heading: { type: String, reflect: true } };
  }
  static get oerEditor() {
    return written({ label: "Questions", accepts: ["h2", "oer-cs-question"], flow: "stack" });
  }
  /** Its heading: see cs-normalize.js faqHeading (its h2s were once its questions). */
  static headingIn(el) {
    return faqHeading(el);
  }
  get shown() {
    return this.items.some((item) => item.hasText) || questions(this).length > 0;
  }
  renderSection() {
    const typed = this.items.some((item) => item.hasText);
    // (questions written before they were items, as readers still see them)
    const qs = typed ? [] : questions(this);
    if (!this._editing && !typed && !qs.length && !this._author) return html``;
    return html`<section class="section">
      <div class="wrap narrow">
        ${this.headingCell("Questions")}
        ${this._editing
          ? html`<div class="faq">
              <div class="list" role="list"><slot name="items"></slot></div>
              ${this.addCell("add-row")}
            </div>`
          : typed
            ? html`<div class="faq" role="list"><slot name="items"></slot></div>`
            : qs.length
              ? html`<div class="faq">
                  ${qs.map(
                    (f) => html`<details>
                      <summary>${f.q}${icon("chevron")}</summary>
                      <div class="answer">${f.a}</div>
                    </details>`,
                  )}
                </div>`
              : this.todo("Add the questions students ask: Edit content and add a question for each, with its answer.")}
      </div>
    </section>`;
  }
  static get styles() {
    return [
      csStyles,
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
        /* while editing, a row to add a question after the last */
        .list {
          display: contents;
        }
        .add-row {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 1rem 0.5rem;
          border: 0;
          border-bottom: 1px solid var(--border);
          background: transparent;
          color: var(--muted-foreground);
          font-weight: 500;
          text-align: start;
          cursor: pointer;
        }
        .add-row.first {
          background: color-mix(in oklab, var(--primary) 6%, var(--background));
          color: var(--foreground);
        }
        .add-row:hover {
          background: var(--accent);
          color: var(--foreground);
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
      gizmo: gizmo("Course site: questions", "Questions students ask, each with the answer you write, shown as an accordion.", "icons:help"),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-cs-faq", properties: {}, content: "<h2></h2><oer-cs-question><h3></h3><p></p></oer-cs-question>" }],
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
        ${!d.enrollUrl ? this.fromElsewhere("The Enroll button goes to the course site's enroll link, or the course's bulletin entry.", "Add an enroll link", { kind: "site", field: "enrollUrl" }) : ""}
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
        .closing .source {
          margin-top: 1.5rem;
          text-align: start;
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
