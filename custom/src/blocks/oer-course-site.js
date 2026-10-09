/**
 * `oer-course-site` — a course's microsite (types/course-site.js), shown
 * full width by the theme in place of the docs layout: a bar with the
 * sections and Enroll, the hero and the course's facts, the page's own text
 * (slot "about"), what students learn, the semester week by week, what they
 * make, who teaches it, the tools, questions, and a last call to enroll.
 * Sections with nothing to show are left out for readers; signed-in authors
 * see what to fill in, and Edit details / Edit page in the bar.
 *
 *   <oer-course-site .site=${item}><slot slot="about"></slot></oer-course-site>
 * @element oer-course-site
 */
import { html, css, LitElement, svg } from "../lit.js";
import { store, autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { siteData, siteIsOn } from "../types/course-site.js";
import { pageDetails } from "../types/oer-page-details.js";
import { editPage } from "../editor/stock.js";

// Lucide (ISC), inline
const ICONS = {
  arrowRight: svg`<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>`,
  arrowUpRight: svg`<path d="M7 7h10v10"/><path d="M7 17 17 7"/>`,
  cap: svg`<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>`,
  calendar: svg`<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>`,
  monitor: svg`<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>`,
  hammer: svg`<path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9"/><path d="m18 15 4-4"/><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-1.26a6 6 0 0 0-7.48 1.05L9 7"/>`,
  clock: svg`<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>`,
  target: svg`<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>`,
  sparkles: svg`<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>`,
  layers: svg`<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>`,
  wrench: svg`<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>`,
  users: svg`<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
  book: svg`<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>`,
  pencil: svg`<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>`,
  sliders: svg`<path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>`,
  sun: svg`<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-2.93 1.41-1.41m11.32-11.32 1.41-1.41M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41"/>`,
  moon: svg`<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`,
  chevron: svg`<path d="m6 9 6 6 6-6"/>`,
  eyeOff: svg`<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>`,
};
const icon = (name) => html`<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;
// outcomes cycle through these
const OUTCOME_ICONS = ["target", "sparkles", "layers", "wrench", "book", "users"];
// how sequence items read in the roadmap
const AS = { assignment: "Assignment", discussion: "Discussion", quiz: "Quiz" };

class OerCourseSite extends LitElement {
  static get tag() {
    return "oer-course-site";
  }

  static get properties() {
    return {
      site: { type: Object },
      _data: { state: true },
      _signedIn: { state: true },
      _dark: { state: true },
      _hasAbout: { state: true },
    };
  }

  constructor() {
    super();
    this.site = null;
    this._data = null;
    this._signedIn = false;
    this._dark = false;
    this._hasAbout = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.__stop = autorun(() => {
      const items = toJS(store.manifest?.items) || [];
      const signedIn = !!store.isLoggedIn;
      const dark = !!store.darkMode;
      Promise.resolve().then(() => {
        this._items = items;
        this._signedIn = signedIn;
        this._dark = dark;
        this._recompute();
      });
    });
  }

  disconnectedCallback() {
    this.__stop?.();
    super.disconnectedCallback();
  }

  updated(changed) {
    if (changed.has("site")) this._recompute();
  }

  _recompute() {
    const site = (this._items || []).find((i) => i.id === this.site?.id) || this.site;
    this._site = site;
    this._data = site ? siteData(site, this._items || []) : null;
  }

  // the page's own text, if it has any
  _aboutChanged(e) {
    const nodes = e.target.assignedElements({ flatten: true });
    this._hasAbout = nodes.some((n) => n.localName !== "page-break" && (n.textContent.trim() || n.querySelector?.("img, video, iframe")));
  }

  _go(id) {
    this.shadowRoot.getElementById(id)?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }

  // for authors: what a section needs, when it's empty
  _todo(text) {
    return this._signedIn ? html`<p class="todo">${icon("pencil")}<span>${text} <button class="link" @click="${() => pageDetails().show(this.site.id)}">Edit details</button></span></p>` : "";
  }

  _renderBar(d) {
    const sections = [
      ["learn", "What you'll learn", d.outcomes.length || this._signedIn],
      ["semester", "The semester", d.weeks.length],
      ["make", "What you'll make", d.projects.length || d.work.length],
      ["questions", "Questions", d.faq.length || this._signedIn],
    ].filter(([, , show]) => show);
    return html`<header class="bar">
      <div class="wrap bar-in">
        <a class="brand" href="./" title="Digital Arts OER home"><span class="mark" aria-hidden="true">${icon("book")}</span><span class="brand-name">Digital Arts OER</span></a>
        ${d.code ? html`<span class="crumb" aria-hidden="true">/</span><span class="code">${d.code}</span>` : ""}
        <nav class="links" aria-label="On this page">${sections.map(([id, label]) => html`<button @click="${() => this._go(id)}">${label}</button>`)}</nav>
        <span class="spacer"></span>
        ${this._signedIn
          ? html`<button class="btn ghost sm" @click="${() => pageDetails().show(this.site.id)}">${icon("sliders")}<span class="lbl">Edit details</span></button>
              <button class="btn ghost sm" @click="${editPage}">${icon("pencil")}<span class="lbl">Edit page</span></button>`
          : ""}
        ${d.enrollUrl ? html`<a class="btn primary sm" href="${d.enrollUrl}" target="_blank" rel="noopener">Enroll</a>` : ""}
      </div>
    </header>`;
  }

  _renderHero(d) {
    const image = d.heroImage || d.projects.map((p) => p.page.metadata?.oerFields?.image).find(Boolean) || d.work.map((w) => w.image).find(Boolean) || "";
    const alt = d.heroImage ? d.heroImageAlt : "";
    return html`<section class="hero">
      <div class="wrap hero-in">
        <div class="hero-text">
          <p class="kicker">${[d.code, d.institution].filter(Boolean).join(" · ")}</p>
          <h1>${d.title.replace(new RegExp(`^${d.code}\\s*[:–—-]\\s*`), "")}</h1>
          ${d.tagline ? html`<p class="tagline">${d.tagline}</p>` : this._todo("Add a tagline: the page's description is the line under the title.")}
          <div class="ctas">
            ${d.enrollUrl ? html`<a class="btn primary lg" href="${d.enrollUrl}" target="_blank" rel="noopener">Enroll${icon("arrowUpRight")}</a>` : ""}
            ${d.weeks.length ? html`<button class="btn outline lg" @click="${() => this._go("semester")}">See the semester</button>` : ""}
          </div>
        </div>
        <div class="hero-art">
          ${image
            ? html`<img src="${image}" alt="${alt}" />`
            : html`<div class="art-fallback" aria-hidden="true"><span>${d.code || d.title}</span></div>`}
        </div>
      </div>
      ${this._renderFacts(d)}
    </section>`;
  }

  _renderFacts(d) {
    const facts = [
      d.credits && ["cap", `${d.credits} credit${d.credits === "1" ? "" : "s"}`, "Credits"],
      d.weekCount && ["calendar", `${d.weekCount} weeks`, "Length"],
      d.delivery && ["monitor", d.delivery, "Format"],
      d.projects.length && ["hammer", `${d.projects.length} project${d.projects.length === 1 ? "" : "s"}`, "You'll make"],
      d.terms.length && ["clock", d.terms.join(", "), "Offered"],
    ].filter(Boolean);
    return html`<div class="wrap">
      ${facts.length
        ? html`<dl class="facts">
            ${facts.map(([i, value, label]) => html`<div class="fact"><span class="fact-icon">${icon(i)}</span><dt>${label}</dt><dd>${value}</dd></div>`)}
          </dl>`
        : ""}
      ${d.prerequisites.length || d.prerequisiteNote
        ? html`<p class="prereq">
            <b>Before you take it:</b>
            ${d.prerequisites.map((c, n) => html`${n ? ", " : " "}<a href="${c.slug}">${c.metadata?.oerFields?.code || c.title}</a>`)}${d.prerequisiteNote
              ? html`<span class="muted"> ${d.prerequisiteNote}</span>`
              : ""}
          </p>`
        : ""}
    </div>`;
  }

  _renderLearn(d) {
    if (!d.outcomes.length && !this._signedIn) return "";
    return html`<section id="learn" class="section">
      <div class="wrap">
        <h2>What you'll learn</h2>
        ${d.outcomes.length
          ? html`<ul class="cards outcomes" role="list">
              ${d.outcomes.map(
                (o, n) => html`<li class="card">
                  <span class="tile">${icon(OUTCOME_ICONS[n % OUTCOME_ICONS.length])}</span>
                  <h3>${o.title}</h3>
                  ${o.text ? html`<p>${o.text}</p>` : ""}
                </li>`,
              )}
            </ul>`
          : this._todo("Add what students will learn, one outcome a row.")}
      </div>
    </section>`;
  }

  _renderSemester(d) {
    if (!d.weeks.length) return this._signedIn ? html`<section id="semester" class="section"><div class="wrap"><h2>The semester</h2>${this._todo("Link a course plan (a sequence) to show the semester week by week.")}</div></section>` : "";
    return html`<section id="semester" class="section alt">
      <div class="wrap">
        <h2>The semester, week by week</h2>
        <p class="lede">${d.weekCount} weeks${d.projects.length ? `, building to ${d.projects.length} project${d.projects.length === 1 ? "" : "s"}` : ""}.</p>
        <ol class="weeks" role="list">
          ${d.weeks.map((w) => {
            const project = w.items.find((it) => it.page.metadata?.pageType === "oer:project");
            const shown = w.items.slice(0, 4);
            const more = w.items.length - shown.length;
            return html`<li class="week">
              <span class="week-n">Week ${w.week}</span>
              <div class="week-body">
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

  _renderMake(d) {
    if (!d.projects.length && !d.work.length) return "";
    return html`<section id="make" class="section">
      <div class="wrap">
        <h2>What you'll make</h2>
        ${d.projects.length
          ? html`<ul class="cards projects" role="list">
              ${d.projects.map(({ page, week }) => {
                const pf = page.metadata?.oerFields || {};
                return html`<li class="card project">
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
              <ul class="cards work" role="list">
                ${d.work.map(
                  (w) => html`<li class="card">
                    ${w.image ? html`<img src="${w.image}" alt="${w.alt || w.title || ""}" />` : ""}
                    <div class="card-body">
                      <h3>${w.url ? html`<a href="${w.url}" target="_blank" rel="noopener">${w.title || w.url}${icon("arrowUpRight")}</a>` : w.title}</h3>
                      ${w.description ? html`<p>${w.description}</p>` : ""}
                    </div>
                  </li>`,
                )}
              </ul>`
          : ""}
      </div>
    </section>`;
  }

  _renderPeople(d) {
    if (!d.instructors.length && !d.instructorNote && !d.tools.length) return this._signedIn ? html`<section class="section"><div class="wrap"><h2>Who teaches it</h2>${this._todo("Add instructors on the course page, and a note and the tools here.")}</div></section>` : "";
    return html`<section id="people" class="section alt">
      <div class="wrap two">
        ${d.instructors.length || d.instructorNote
          ? html`<div>
              <h2>Who teaches it</h2>
              ${d.instructors.map(
                (p) => html`<p class="person">
                  <span class="avatar" aria-hidden="true">${p.name.split(/\s+/).map((s) => s[0]).slice(0, 2).join("")}</span>
                  ${p.url ? html`<a href="${p.url}" target="_blank" rel="noopener">${p.name}</a>` : html`<span>${p.name}</span>`}
                </p>`,
              )}
              ${d.instructorNote ? html`<blockquote class="note">${d.instructorNote}</blockquote>` : ""}
            </div>`
          : ""}
        ${d.tools.length
          ? html`<div>
              <h2>Tools you'll use</h2>
              <ul class="chips" role="list">${d.tools.map((t) => html`<li>${t}</li>`)}</ul>
            </div>`
          : ""}
      </div>
    </section>`;
  }

  _renderFaq(d) {
    if (!d.faq.length && !this._signedIn) return "";
    return html`<section id="questions" class="section">
      <div class="wrap narrow">
        <h2>Questions</h2>
        ${d.faq.length
          ? html`<div class="faq">
              ${d.faq.map(
                (f) => html`<details>
                  <summary>${f.q}${icon("chevron")}</summary>
                  <p>${f.a}</p>
                </details>`,
              )}
            </div>`
          : this._todo("Add the questions students ask, each with its answer.")}
      </div>
    </section>`;
  }

  render() {
    const d = this._data;
    if (!d) return html``;
    return html`<div class="ms">
      ${this._renderBar(d)}
      ${this._signedIn && !siteIsOn(this._site)
        ? html`<p class="off-note" role="status">
            <span class="wrap"
              >${icon("eyeOff")}<span
                >This course site is off, so readers can't see it.
                ${d.course ? html`Turn it on from <a href="${d.course.slug}">the course page</a>.` : "Turn it on from its course page."}</span
              ></span
            >
          </p>`
        : ""}
      <main>
        ${this._renderHero(d)}
        <section class="section about" ?hidden="${!this._hasAbout}">
          <div class="wrap narrow prose"><slot name="about" @slotchange="${this._aboutChanged}"></slot></div>
        </section>
        ${this._renderLearn(d)} ${this._renderSemester(d)} ${this._renderMake(d)} ${this._renderPeople(d)} ${this._renderFaq(d)}
        <section class="closing">
          <div class="wrap closing-in">
            <h2>Ready to start?</h2>
            <p>${d.title}${d.terms.length ? `, offered ${d.terms.join(" and ").toLowerCase()}` : ""}.</p>
            <div class="ctas">
              ${d.enrollUrl ? html`<a class="btn primary lg" href="${d.enrollUrl}" target="_blank" rel="noopener">Enroll${icon("arrowUpRight")}</a>` : ""}
              ${d.bulletin && d.bulletin !== d.enrollUrl ? html`<a class="btn outline lg" href="${d.bulletin}" target="_blank" rel="noopener">Bulletin entry</a>` : ""}
            </div>
          </div>
        </section>
      </main>
      <footer class="foot">
        <div class="wrap foot-in">
          <span>${d.institutionUrl ? html`<a href="${d.institutionUrl}" target="_blank" rel="noopener">${d.institution}</a>` : d.institution}</span>
          ${d.course ? html`<a href="${d.course.slug}">Course details</a>` : ""}
          <a href="./">Digital Arts OER</a>
          ${d.license ? html`<span class="muted">${d.license}</span>` : ""}
          <button class="theme-btn" aria-pressed="${this._dark ? "true" : "false"}" @click="${() => (store.darkMode = !store.darkMode)}">
            ${icon(this._dark ? "sun" : "moon")}${this._dark ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </footer>
    </div>`;
  }

  static get styles() {
    return css`
      /* its own scroller: on wide screens the theme keeps the document
         still (the docs layout scrolls inside its card) */
      :host {
        display: block;
        box-sizing: border-box;
        height: calc(100dvh - var(--editor-bar-height, 0px));
        overflow-y: auto;
        overscroll-behavior: contain;
        background: var(--background);
        color: var(--foreground);
        font-family: var(--font-sans, system-ui, sans-serif);
        /* DDD justifies the theme's text */
        text-align: start;
        --wrap: 72rem;
      }
      .bar-in > *,
      .links button {
        white-space: nowrap;
      }
      [hidden] {
        display: none !important;
      }
      a {
        color: var(--link);
      }
      button {
        font: inherit;
        color: inherit;
      }
      :focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
      .i {
        flex: none;
        width: 1rem;
        height: 1rem;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .wrap {
        box-sizing: border-box;
        width: 100%;
        max-width: var(--wrap);
        margin: 0 auto;
        padding: 0 1.5rem;
      }
      .wrap.narrow {
        max-width: 48rem;
      }
      .muted {
        color: var(--muted-foreground);
      }

      /* the bar */
      .bar {
        position: sticky;
        top: 0;
        z-index: 20;
        border-bottom: 1px solid var(--border);
        background: color-mix(in oklch, var(--background) 88%, transparent);
        backdrop-filter: blur(8px);
      }
      .bar-in {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 3.5rem;
      }
      .brand {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: inherit;
        text-decoration: none;
        font-weight: 600;
        font-size: 0.875rem;
      }
      .mark {
        display: inline-grid;
        place-items: center;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-md);
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .crumb {
        color: var(--muted-foreground);
      }
      .code {
        font-size: 0.875rem;
        font-weight: 600;
      }
      .links {
        display: flex;
        gap: 0.125rem;
        margin-left: 1rem;
      }
      .links button,
      .link {
        all: unset;
        cursor: pointer;
      }
      .links button {
        padding: 0.375rem 0.625rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      .links button:hover {
        background: var(--accent);
        color: var(--foreground);
      }
      .link {
        color: var(--link);
        text-decoration: underline;
      }
      .spacer {
        flex: 1;
      }
      .off-note {
        margin: 0;
        padding: 0.625rem 0;
        border-bottom: 1px solid var(--border);
        background: var(--muted);
        font-size: 0.875rem;
      }
      .off-note .wrap {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .btn {
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.375rem;
        height: 2.25rem;
        padding: 0 1rem;
        border: 1px solid transparent;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        font-weight: 500;
        text-decoration: none;
        white-space: nowrap;
        cursor: pointer;
        background: none;
      }
      .btn.sm {
        height: 2rem;
        padding: 0 0.75rem;
        font-size: 0.8125rem;
      }
      .btn.lg {
        height: 2.75rem;
        padding: 0 1.25rem;
        font-size: 0.9375rem;
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .btn.primary:hover {
        background: color-mix(in oklab, var(--primary) 88%, var(--foreground));
      }
      .btn.outline {
        border-color: var(--input-border, var(--border));
        color: var(--foreground);
      }
      .btn.ghost {
        color: var(--foreground);
      }
      .btn.outline:hover,
      .btn.ghost:hover {
        background: var(--accent);
      }

      /* the hero */
      .hero {
        padding: 4rem 0 2.5rem;
      }
      .hero-in {
        display: grid;
        grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
        gap: 3rem;
        align-items: center;
      }
      .kicker {
        margin: 0 0 0.75rem;
        font-size: 0.8125rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--muted-foreground);
      }
      h1 {
        margin: 0;
        font-size: clamp(2.25rem, 5vw, 3.75rem);
        line-height: 1.05;
        font-weight: 700;
        letter-spacing: -0.025em;
        text-wrap: balance;
      }
      .tagline {
        max-width: 38ch;
        margin: 1.25rem 0 0;
        font-size: 1.25rem;
        line-height: 1.5;
        color: var(--muted-foreground);
        text-wrap: pretty;
      }
      .ctas {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-top: 2rem;
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
        font-size: clamp(2rem, 6vw, 4rem);
        font-weight: 700;
        letter-spacing: -0.03em;
        color: var(--muted-foreground);
      }
      .facts {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
        gap: 0.75rem;
        margin: 3rem 0 0;
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

      /* sections */
      .section {
        padding: 4rem 0;
      }
      .section.alt {
        background: var(--card);
        border-block: 1px solid var(--border);
      }
      h2 {
        margin: 0 0 1.5rem;
        font-size: clamp(1.5rem, 3vw, 2rem);
        line-height: 1.2;
        font-weight: 700;
        letter-spacing: -0.015em;
        text-wrap: balance;
      }
      .lede {
        margin: -0.75rem 0 1.5rem;
        color: var(--muted-foreground);
      }
      h3 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
      }
      .sub-h {
        margin: 2.5rem 0 1rem;
        font-size: 1.125rem;
      }
      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
        gap: 1rem;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .card {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1.25rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        background: var(--background);
        overflow: hidden;
      }
      .card p {
        margin: 0;
        font-size: 0.9375rem;
        line-height: 1.55;
        color: var(--muted-foreground);
      }
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
      .card.project,
      .work .card {
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
      .work h3 a {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
      }

      /* the semester */
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
        font-size: 0.8125rem;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
        color: var(--muted-foreground);
        padding-top: 0.125rem;
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

      /* people and tools */
      .two {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
        gap: 3rem;
      }
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
        font-size: 1rem;
        line-height: 1.6;
        color: var(--muted-foreground);
        white-space: pre-line;
      }
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
        background: var(--background);
        font-size: 0.875rem;
      }

      /* questions */
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
      .faq p {
        margin: 0 0 1rem;
        line-height: 1.6;
        color: var(--muted-foreground);
      }

      /* the page's own text */
      .prose {
        font-size: 1.0625rem;
        line-height: 1.7;
      }

      /* closing and footer */
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
      .foot {
        padding: 1.5rem 0;
        border-top: 1px solid var(--border);
        font-size: 0.8125rem;
      }
      .foot-in {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem 1.5rem;
        color: var(--muted-foreground);
      }
      .foot a {
        color: var(--muted-foreground);
      }
      .theme-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        margin-left: auto;
        padding: 0.25rem 0.5rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: none;
        font: inherit;
        color: var(--foreground);
        cursor: pointer;
      }
      .theme-btn:hover {
        background: var(--accent);
      }
      .theme-btn:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
      .off-note a {
        color: var(--link, var(--primary));
      }
      .todo {
        display: flex;
        gap: 0.5rem;
        align-items: flex-start;
        margin: 0;
        padding: 0.75rem 1rem;
        border: 1px dashed var(--input-border, var(--border));
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      .todo .i {
        margin-top: 0.1875rem;
      }

      @media (max-width: 900px) {
        .links {
          display: none;
        }
        .hero-in {
          grid-template-columns: minmax(0, 1fr);
          gap: 2rem;
        }
        .hero {
          padding-top: 2.5rem;
        }
      }
      @media (max-width: 600px) {
        .wrap {
          padding: 0 1rem;
        }
        .brand-name,
        .lbl {
          display: none;
        }
        .week {
          grid-template-columns: minmax(0, 1fr);
          gap: 0.25rem;
        }
        .section {
          padding: 3rem 0;
        }
      }
    `;
  }
}

if (!customElements.get(OerCourseSite.tag)) customElements.define(OerCourseSite.tag, OerCourseSite);
