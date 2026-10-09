/**
 * OER Courses, the students' hub of course sites (types/course-site.js
 * COURSE_HUB_TYPE, at /oer-courses), as two HAX blocks: an intro the
 * author writes, and the catalog of the course sites that are on, grouped
 * by degree program (a course in two degrees under both). Course sites'
 * bars link here, so students browse courses without the OER repository.
 *
 *   <oer-courses-intro><p>…</p></oer-courses-intro>
 *   <oer-courses-catalog></oer-courses-catalog>
 */
import { html, css } from "../../lit.js";
import { registerBlocks } from "../register.js";
import { SiteSection, csStyles, icon, hasContent } from "./cs-shared.js";
import { COURSE_HUB_TYPE, catalog } from "../../types/course-site.js";
import { contentTypes } from "../../types/content-types.js";
import { pageHtml, parsePage } from "../../types/page-report.js";

const gizmo = (title, description, icon) => ({ title, description, icon, color: "blue", tags: ["Course site", "course", "catalog"], meta: { author: "Michael Collins" } });
const onHub = (el) => el._page?.metadata?.pageType === COURSE_HUB_TYPE;
// the degrees courses choose from, in the course type's order
const programOrder = (items) => (contentTypes(items).types.find((t) => t.id === "oer:course")?.fields || []).find((f) => f.name === "programs")?.options?.map((o) => o.value) || [];
const wrongPage = (el) =>
  el._author ? html`<div class="wrap"><p class="todo">${icon("info")}<span>This block lists the course sites, so it only works on the OER Courses page.</span></p></div>` : html``;

/* ---------- the intro ---------- */

export class OerCoursesIntro extends SiteSection {
  static get tag() {
    return "oer-courses-intro";
  }
  static get properties() {
    return { heading: { type: String } };
  }
  render() {
    if (!onHub(this)) return wrongPage(this);
    const { count, groups } = catalog(this._items, programOrder(this._items));
    const degrees = groups.filter((g) => g.program).length;
    const typed = hasContent(this);
    return html`<section class="intro">
      <div class="wrap">
        <p class="kicker">${count ? `${count} course${count === 1 ? "" : "s"}${degrees ? ` in ${degrees} degree program${degrees === 1 ? "" : "s"}` : ""}` : "Courses"}</p>
        ${this.headingEl("OER Courses", "h1")}
        ${this._editing
          ? html`<div class="lede typing">
              <p class="typing-hint">${icon("pencil")}<span>A few lines for students: what these courses are and who they're for.</span></p>
              <div class="typing-area"><slot></slot></div>
            </div>`
          : typed
            ? html`<div class="lede"><slot></slot></div>`
            : this.todo("Add a few lines for students: Edit content and type them under the title.")}
      </div>
    </section>`;
  }
  static get styles() {
    return [
      csStyles,
      css`
        .intro {
          padding: 4.5rem 0 2rem;
        }
        h1 {
          margin: 0;
          font-size: clamp(2.5rem, 6vw, 4.25rem);
          line-height: 1.02;
          letter-spacing: -0.03em;
        }
        .lede {
          max-width: 46ch;
          margin-top: 1.25rem;
          font-size: 1.25rem;
          line-height: 1.5;
          color: var(--muted-foreground);
        }
        ::slotted(*) {
          margin: 0.375rem 0;
        }
        .todo {
          margin-top: 1.25rem;
          max-width: 46ch;
        }
      `,
    ];
  }
  static get haxProperties() {
    return {
      type: "grid",
      canScale: false,
      canEditSource: true,
      gizmo: gizmo("OER Courses: intro", "The hub's title and a few lines you write for students.", "icons:flag"),
      // the heading is typed in place while editing
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-courses-intro", properties: {}, content: "<p></p>" }],
    };
  }
}

/* ---------- the catalog ---------- */

export class OerCoursesCatalog extends SiteSection {
  constructor() {
    super();
    // what each site's own page says: its hero image and tagline
    this.__pages = new Map();
  }
  static get tag() {
    return "oer-courses-catalog";
  }

  get shown() {
    return onHub(this) && catalog(this._items, programOrder(this._items)).count > 0;
  }

  /** The degree groups, for the hub's bar. */
  get groups() {
    if (!onHub(this)) return [];
    return catalog(this._items, programOrder(this._items)).groups.map((g, n) => ({ id: `group-${n}`, label: g.program || "Other courses" }));
  }

  go(id) {
    this.shadowRoot.getElementById(id)?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }

  // a site's hero image and typed tagline, read once from its page
  _ownPage(site) {
    const key = `${site.id}:${site.metadata?.updated || ""}`;
    if (!this.__pages.has(key)) {
      this.__pages.set(key, null);
      pageHtml(site).then((text) => {
        const hero = parsePage(text).querySelector("oer-cs-hero");
        this.__pages.set(key, { image: hero?.getAttribute("image") || "", alt: hero?.getAttribute("alt") || "", tagline: hero?.textContent.replace(/\s+/g, " ").trim() || "" });
        this.requestUpdate();
      });
    }
    return this.__pages.get(key) || {};
  }

  _card(e) {
    const own = this._ownPage(e.site);
    const image = own.image || e.image;
    const facts = [e.credits && `${e.credits} credit${e.credits === "1" ? "" : "s"}`, e.delivery, e.weekCount && `${e.weekCount} weeks`].filter(Boolean);
    return html`<li class="card">
      ${image ? html`<img src="${image}" alt="${own.image ? own.alt : ""}" loading="lazy" />` : html`<div class="art" aria-hidden="true"><span>${e.code}</span></div>`}
      <div class="card-body">
        <p class="kicker">${[e.code, e.campus].filter(Boolean).join(" · ")}</p>
        <h3><a class="stretch" href="${e.site.slug}">${e.title.replace(new RegExp(`^${e.code}\\s*[:–—-]\\s*`), "")}</a></h3>
        ${own.tagline || e.tagline ? html`<p>${own.tagline || e.tagline}</p>` : ""}
        ${facts.length ? html`<p class="facts">${facts.join(" · ")}</p>` : ""}
        <span class="go">Visit the course site${icon("arrowRight")}</span>
      </div>
    </li>`;
  }

  render() {
    if (!onHub(this)) return wrongPage(this);
    const { groups, count, off } = catalog(this._items, programOrder(this._items));
    const offNote = this._author && off.length
      ? html`<p class="todo">${icon("eyeOff")}<span>${off.length === 1 ? "One course site is off, so it isn't listed" : `${off.length} course sites are off, so they aren't listed`}: ${off.map((s, n) => html`${n ? ", " : ""}${s.title}`)}. Turn a site on from its course page.</span></p>`
      : "";
    if (!count) {
      return html`<section class="section"><div class="wrap">${this._author ? this.todo("No course sites are on yet. Turn one on from its course page (the Course site card).") : html`<p class="muted">Course sites will be listed here.</p>`}${offNote}</div></section>`;
    }
    return html`${groups.map(
      (g, n) => html`<section class="section ${n % 2 ? "alt" : ""}" aria-labelledby="group-${n}">
        <div class="wrap">
          <h2 id="group-${n}">${g.program || "Other courses"}</h2>
          <p class="lede">${g.entries.length} course${g.entries.length === 1 ? "" : "s"}</p>
          <ul class="cards" role="list">${g.entries.map((e) => this._card(e))}</ul>
        </div>
      </section>`,
    )}
    ${offNote ? html`<div class="wrap off">${offNote}</div>` : ""}`;
  }

  static get styles() {
    return [
      csStyles,
      css`
        .cards {
          grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
          gap: 1.25rem;
        }
        .card {
          position: relative;
          padding: 0;
          transition: border-color 0.15s;
        }
        .card:hover {
          border-color: color-mix(in oklab, var(--primary) 55%, var(--border));
        }
        .card:focus-within {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
        }
        .card img,
        .art {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 10;
          object-fit: cover;
          border-bottom: 1px solid var(--border);
        }
        .art {
          display: grid;
          place-items: center;
          background-color: var(--card);
          background-image:
            repeating-linear-gradient(0deg, transparent 0 23px, var(--border) 23px 24px),
            repeating-linear-gradient(90deg, transparent 0 23px, var(--border) 23px 24px);
        }
        .art span {
          font-family: var(--cs-font-display, inherit);
          font-size: 2rem;
          font-weight: var(--cs-display-weight, 700);
          color: var(--muted-foreground);
        }
        .card-body {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          padding: 1.25rem;
          flex: 1;
        }
        .card-body .kicker {
          margin: 0;
          font-size: 0.75rem;
        }
        h3 {
          font-family: var(--cs-font-display, inherit);
          font-size: 1.25rem;
          font-weight: var(--cs-display-weight, 700);
          line-height: 1.25;
        }
        h3 a {
          color: inherit;
          text-decoration: none;
        }
        /* the whole card opens the course site */
        .stretch::after {
          content: "";
          position: absolute;
          inset: 0;
        }
        .stretch:focus-visible {
          outline: none;
        }
        .facts {
          font-size: 0.8125rem !important;
        }
        .go {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          margin-top: auto;
          padding-top: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--link);
        }
        .off {
          padding-bottom: 3rem;
        }
        @media (prefers-reduced-motion: reduce) {
          .card {
            transition: none;
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
      gizmo: gizmo("OER Courses: catalog", "The course sites that are on, by degree program.", "icons:view-module"),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-courses-catalog", properties: {}, content: "" }],
    };
  }
}

for (const cls of [OerCoursesIntro, OerCoursesCatalog]) if (!customElements.get(cls.tag)) customElements.define(cls.tag, cls);
registerBlocks(OerCoursesIntro, OerCoursesCatalog);
