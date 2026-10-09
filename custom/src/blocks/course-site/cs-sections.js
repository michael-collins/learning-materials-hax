/**
 * The course site's sections, as HAX blocks: a course site page is made of
 * them (types/course-site.js COURSE_SITE_STARTER), and authors move,
 * remove and repeat them and put any other block between them.
 *
 * Generated sections draw from the course and its plan (the facts, the
 * semester, the projects, the instructors). Written ones hold what the
 * author types inside them, as ordinary blocks: the hero's tagline, what
 * you'll learn (a list), the instructor's note, the tools (a list) and the
 * questions (each a heading with its answer under it). While editing,
 * written sections show that text where it's typed; readers see it
 * arranged (cards, chips, an accordion).
 *
 *   <oer-cs-learn heading="What you'll learn"><ul><li>Cut with confidence: …</li></ul></oer-cs-learn>
 */
import { html, css } from "../../lit.js";
import { registerBlocks } from "../register.js";
import { SiteSection, csStyles, icon, hasContent, listItems, questions } from "./cs-shared.js";
import "../../ui/oer-image-field.js";

// outcomes cycle through these
const OUTCOME_ICONS = ["target", "sparkles", "layers", "wrench", "book", "users"];
// how sequence items read in the roadmap
const AS = { assignment: "Assignment", discussion: "Discussion", quiz: "Quiz" };

const gizmo = (title, description, icon) => ({ title, description, icon, color: "blue", tags: ["Course site", "course", "landing"], meta: { author: "Michael Collins" } });

// where a written section's text is typed, while editing
const typing = (hint) => html`<div class="typing">
  <p class="typing-hint">${icon("pencil")}<span>${hint}</span></p>
  <div class="typing-area"><slot></slot></div>
</div>`;

const slotted = css`
  ::slotted(*) {
    margin: 0.375rem 0;
  }
  ::slotted(ul),
  ::slotted(ol) {
    padding-left: 1.25rem;
  }
`;

/* ---------- the hero: the course's name, the tagline, enroll ---------- */

export class OerCsHero extends SiteSection {
  static get tag() {
    return "oer-cs-hero";
  }
  static get properties() {
    return { image: { type: String }, alt: { type: String } };
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
          ${this._editing
            ? html`<div class="tagline">${typing(`The line under the title.${d.tagline ? ` If it's empty, the page's description is used: “${d.tagline}”` : ""}`)}</div>`
            : typed
              ? html`<div class="tagline"><slot></slot></div>`
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
            ? html`<div
                class="image-edit"
                @pointerdown="${(e) => this.claim(e)}"
                @mousedown="${SiteSection.keep}"
                @click="${SiteSection.keep}"
                @keydown="${SiteSection.keep}"
                @paste="${SiteSection.keep}"
                @input="${SiteSection.keep}"
              >
                <span class="typing-hint">${icon("pencil")}<span>${this.image ? "Hero image" : image ? "A project's image is shown. Choose a hero image of your own:" : "Choose a hero image: a wide picture, such as student work or the studio."}</span></span>
                <oer-image-field
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
          border: 1px dashed color-mix(in oklab, var(--primary) 45%, var(--border));
          border-radius: var(--radius-md);
          background: var(--background);
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
      gizmo: gizmo("Course site: facts", "Credits, length, format, projects and terms, from the course and its plan.", "icons:dashboard"),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-cs-facts", properties: {}, content: "" }],
    };
  }
}

/* ---------- what you'll learn: a list, shown as cards ---------- */

export class OerCsLearn extends SiteSection {
  static get tag() {
    return "oer-cs-learn";
  }
  static get properties() {
    return { heading: { type: String } };
  }
  get shown() {
    return listItems(this).length > 0;
  }
  renderSection() {
    const items = listItems(this);
    if (!this._editing && !items.length && !this._author) return html``;
    return html`<section class="section">
      <div class="wrap">
        ${this.headingEl("What you'll learn")}
        ${this._editing
          ? typing("A list, one outcome a row: a short title, a colon, then a sentence. Readers see each row as a card.")
          : items.length
            ? html`<ul class="cards" role="list">
                ${items.map(
                  (o, n) => html`<li class="card">
                    <span class="tile">${icon(OUTCOME_ICONS[n % OUTCOME_ICONS.length])}</span>
                    <h3>${o.title}</h3>
                    ${o.text ? html`<p>${o.text}</p>` : ""}
                  </li>`,
                )}
              </ul>`
            : this.todo("Add what students will learn: Edit content and type a list here, one outcome a row.")}
      </div>
    </section>`;
  }
  static get styles() {
    return [
      csStyles,
      slotted,
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
      `,
    ];
  }
  static get haxProperties() {
    return {
      type: "grid",
      canScale: false,
      canEditSource: true,
      gizmo: gizmo("Course site: what you'll learn", "A list you write, one outcome a row, shown as cards.", "icons:list"),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-cs-learn", properties: {}, content: "<ul><li></li></ul>" }],
    };
  }
}

/* ---------- the semester, week by week, from the course plan ---------- */

export class OerCsSemester extends SiteSection {
  static get tag() {
    return "oer-cs-semester";
  }
  static get properties() {
    return { heading: { type: String } };
  }
  get shown() {
    return !!this._d?.weeks.length;
  }
  renderSection(d) {
    if (!d.weeks.length) return this._author ? html`<section class="section"><div class="wrap">${this.headingEl("The semester")}${this.todo("Link a course plan (a sequence) in Edit details to show the semester week by week.")}</div></section>` : html``;
    return html`<section class="section alt">
      <div class="wrap">
        ${this.headingEl("The semester, week by week")}
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
      type: "element",
      canScale: false,
      canEditSource: false,
      gizmo: gizmo("Course site: the semester", "The course plan week by week, with its projects.", "icons:date-range"),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-cs-semester", properties: {}, content: "" }],
    };
  }
}

/* ---------- what you'll make: the plan's projects and student work ---------- */

export class OerCsMake extends SiteSection {
  static get tag() {
    return "oer-cs-make";
  }
  static get properties() {
    return { heading: { type: String } };
  }
  get shown() {
    return !!(this._d?.projects.length || this._d?.work.length);
  }
  renderSection(d) {
    if (!this.shown) return this._author ? html`<section class="section"><div class="wrap">${this.headingEl("What you'll make")}${this.todo("Projects in the course plan, and student work on the course page, show here.")}</div></section>` : html``;
    return html`<section class="section">
      <div class="wrap">
        ${this.headingEl("What you'll make")}
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
      type: "element",
      canScale: false,
      canEditSource: false,
      gizmo: gizmo("Course site: what you'll make", "The course plan's projects and the course's student work.", "icons:build"),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-cs-make", properties: {}, content: "" }],
    };
  }
}

/* ---------- who teaches it: the course's instructors and a note ---------- */

export class OerCsPeople extends SiteSection {
  static get tag() {
    return "oer-cs-people";
  }
  static get properties() {
    return { heading: { type: String } };
  }
  get shown() {
    return !!this._d?.instructors.length || hasContent(this);
  }
  renderSection(d) {
    const note = hasContent(this);
    if (!this._editing && !this.shown && !this._author) return html``;
    return html`<section class="section alt">
      <div class="wrap narrow">
        ${this.headingEl("Who teaches it")}
        ${d.instructors.map(
          (p) => html`<p class="person">
            <span class="avatar" aria-hidden="true">${p.name.split(/\s+/).map((s) => s[0]).slice(0, 2).join("")}</span>
            ${p.url ? html`<a href="${p.url}" target="_blank" rel="noopener">${p.name}</a>` : html`<span>${p.name}</span>`}
          </p>`,
        )}
        ${!d.instructors.length && this._author ? this.todo("Instructors come from the course page: add them in its Page details.") : ""}
        ${this._editing
          ? typing("A note from the instructor, in their own words.")
          : note
            ? html`<blockquote class="note"><slot></slot></blockquote>`
            : ""}
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
        .typing {
          margin-top: 1rem;
        }
      `,
    ];
  }
  static get haxProperties() {
    return {
      type: "grid",
      canScale: false,
      canEditSource: true,
      gizmo: gizmo("Course site: who teaches it", "The course's instructors, and a note from them you write.", "social:people"),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-cs-people", properties: {}, content: "<p></p>" }],
    };
  }
}

/* ---------- tools: a list, shown as chips ---------- */

export class OerCsTools extends SiteSection {
  static get tag() {
    return "oer-cs-tools";
  }
  static get properties() {
    return { heading: { type: String } };
  }
  get shown() {
    return listItems(this).length > 0;
  }
  renderSection() {
    const tools = listItems(this).map((t) => [t.title, t.text].filter(Boolean).join(": "));
    if (!this._editing && !tools.length && !this._author) return html``;
    return html`<section class="section">
      <div class="wrap">
        ${this.headingEl("Tools you'll use")}
        ${this._editing
          ? typing("A list of the software, machines and materials students use, one a row.")
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
      gizmo: gizmo("Course site: tools", "A list you write of software, machines and materials, shown as chips.", "icons:extension"),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-cs-tools", properties: {}, content: "<ul><li></li></ul>" }],
    };
  }
}

/* ---------- questions: each a heading with its answer, as an accordion ---------- */

export class OerCsFaq extends SiteSection {
  static get tag() {
    return "oer-cs-faq";
  }
  static get properties() {
    return { heading: { type: String } };
  }
  get shown() {
    return questions(this).length > 0;
  }
  renderSection() {
    const qs = questions(this);
    if (!this._editing && !qs.length && !this._author) return html``;
    return html`<section class="section">
      <div class="wrap narrow">
        ${this.headingEl("Questions")}
        ${this._editing
          ? typing("Each question as a heading, with its answer under it.")
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
      gizmo: gizmo("Course site: questions", "Questions you write, each a heading with its answer, shown as an accordion.", "icons:help"),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-cs-faq", properties: {}, content: "<h3></h3><p></p>" }],
    };
  }
}

/* ---------- the last call to enroll ---------- */

export class OerCsClosing extends SiteSection {
  static get tag() {
    return "oer-cs-closing";
  }
  static get properties() {
    return { heading: { type: String } };
  }
  renderSection(d) {
    return html`<section class="closing">
      <div class="wrap closing-in">
        ${this.headingEl("Ready to start?")}
        <p>${d.title}${d.terms.length ? `, offered ${d.terms.join(" and ").toLowerCase()}` : ""}.</p>
        <div class="ctas">
          ${d.enrollUrl ? html`<a class="btn primary" href="${d.enrollUrl}" target="_blank" rel="noopener">Enroll${icon("arrowUpRight")}</a>` : ""}
          ${d.bulletin && d.bulletin !== d.enrollUrl ? html`<a class="btn outline" href="${d.bulletin}" target="_blank" rel="noopener">Bulletin entry</a>` : ""}
        </div>
        ${!d.enrollUrl && this._author ? html`<p class="hint">Add the enroll link in Edit details to show an Enroll button.</p>` : ""}
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
      type: "element",
      canScale: false,
      canEditSource: false,
      gizmo: gizmo("Course site: ready to start", "A last call to enroll, with the bulletin entry.", "icons:send"),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-cs-closing", properties: {}, content: "" }],
    };
  }
}

const SECTIONS = [OerCsHero, OerCsFacts, OerCsLearn, OerCsSemester, OerCsMake, OerCsPeople, OerCsTools, OerCsFaq, OerCsClosing];
for (const cls of SECTIONS) if (!customElements.get(cls.tag)) customElements.define(cls.tag, cls);
registerBlocks(...SECTIONS);
