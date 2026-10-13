/**
 * `oer-welcome` — the welcome for signed-in authors, in place of HAX's
 * (Merlin opening by itself with a list of commands): where to start, as
 * cards that each say where that action lives, and a six-stop tour of how
 * the site fits together, drawn with the overview page's schematics.
 *
 *   welcome().show()                // the start
 *   welcome().show({ stop: 0 })     // the tour, at a stop
 *
 * installWelcome() keeps HAX's welcome from opening and opens this one the
 * first time an author loads the site in a browser (remembered in
 * localStorage); after that it's in the account menu (Welcome and tour).
 * A native modal dialog: focus stays inside, Esc closes and focus goes back
 * where it was.
 * @element oer-welcome
 */
import { html, css, LitElement } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { editPage, stockUI } from "../editor/stock.js";
import { newPage } from "./oer-new-page.js";
import { pagesBrowser } from "../outline/oer-pages-browser.js";
import { canvasImport } from "../lms/oer-canvas-import.js";
import "../blocks/oer-schematic.js";

const lucide = (name) => html`<span class="lucide" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;
const SEEN_KEY = "oer-welcome-seen";
const items = () => toJS(store.manifest?.items) || [];
const topPage = (title) => items().find((i) => !i.parent && i.title === title && !i.metadata?.oerSnapshotOf);
const go = (slug) => {
  globalThis.history.pushState({}, "", slug);
  globalThis.dispatchEvent(new PopStateEvent("popstate"));
};

// the tour: one stop per idea, each with the overview page's drawing of it
const STOPS = [
  {
    title: "Getting around",
    preset: "sidebar",
    alt: "Diagram of the sidebar: the Navigation and Site tabs, headings with pages under them, and a collection's arrow.",
    text: html`<p>The sidebar has two tabs for authors. <b>Navigation</b> is the site's outline, grouped under headings such as Library and Curriculum. <b>Site</b> holds Browse pages, Content types, Import from Canvas and the site's settings.</p>
      <p>Collections with hundreds of pages, such as Exercises, open from their arrow instead of filling the sidebar. The magnifier, or <kbd>⌘K</kbd>, searches the site.</p>`,
    where: "The sidebar, and search in the top bar",
  },
  {
    title: "Editing a page",
    preset: "editor",
    alt: "Diagram of the editor: the editing bar with Save, and a selected block with its rail of menus on the left.",
    text: html`<p>Choose <b>Edit content</b> in the page menu, the ⌄ beside a page's title. The editing bar takes the top bar's place, with Undo, Redo, Exit and Save.</p>
      <p>The selected block has a rail at its left with Block, Text, Format and Insert menus. Hover the space between blocks to add one from a searchable list.</p>`,
    where: "Page menu ⌄ → Edit content",
  },
  {
    title: "Page details and content types",
    preset: "page-details",
    alt: "Diagram of the Page details dialog over a page: its type, description and fields.",
    text: html`<p>Every page has a type, such as Lesson, Exercise or Tutorial, with its own fields: authors, courses, difficulty, prerequisites, files. Set them in <b>Page details</b>; fields marked for the header show at the top of the page.</p>
      <p>Types and their fields are defined in Site → Content types.</p>`,
    where: "Page menu ⌄ → Page details",
  },
  {
    title: "Courses and sequences",
    preset: "sequence",
    alt: "Diagram of the sequence builder: weekly modules with their items on the left, the selected item's settings on the right.",
    text: html`<p>Each course has a page under Curriculum → Courses listing everything taught in it.</p>
      <p>A <b>course sequence</b> plans one way to run it, week by week: modules, assignments, points and due weeks. It's edited in the sequence builder and exports to Canvas.</p>`,
    where: "Curriculum → Courses and Sequences",
  },
  {
    title: "Projects, tutorials and the viewer",
    preset: "project",
    alt: "Diagram of a project page: its steps, numbered and grouped by stage.",
    text: html`<p>A project keeps its deliverables as numbered steps, grouped by stage. Exercises and projects can show a <b>tutorial series</b>: the videos as a playlist, each part's written tutorial beside it, and full screen.</p>
      <p>The <b>Viewer</b> opens a lesson, project or pathway in a two-column window without leaving the page.</p>`,
    where: "A project or exercise page; Viewer in a page's header",
  },
  {
    title: "Books, versions and sharing",
    preset: "versions",
    alt: "Diagram of the Versions dialog over a page, listing its releases with a Publish button.",
    text: html`<p>Release a page as a <b>version</b> (1.2.0) from Versions… in the page menu; earlier versions stay readable, and links can point to one.</p>
      <p>Books read chapter by chapter in Reader mode and export to PDF, HTML and Common Cartridge. <b>Embed…</b> gives the code to place a page in Canvas.</p>`,
    where: "Page menu ⌄ → Versions… and Embed…",
  },
];

class OerWelcome extends LitElement {
  static get tag() {
    return "oer-welcome";
  }

  static get properties() {
    return { open: { type: Boolean, reflect: true }, _stop: { state: true } };
  }

  constructor() {
    super();
    this.open = false;
    this._stop = -1; // -1: the start; 0…: a tour stop
  }

  show({ stop = -1 } = {}) {
    this._opener = globalThis.document.activeElement;
    this._stop = stop;
    this.open = true;
    this.updateComplete.then(() => {
      const dialog = this.renderRoot.querySelector("dialog");
      if (!dialog.open) dialog.showModal();
      this._focusFirst();
    });
  }

  close() {
    this.renderRoot.querySelector("dialog")?.close();
  }

  _closed() {
    this.open = false;
    this._opener?.focus?.();
  }

  // the start's first card, or a stop's Next
  _focusFirst() {
    this.updateComplete.then(() => this.renderRoot.querySelector(this._stop < 0 ? ".card" : "footer .btn.primary")?.focus());
  }

  _to(stop) {
    this._stop = stop;
    this.renderRoot.querySelector(".body")?.scrollTo?.(0, 0);
    this._focusFirst();
  }

  // close, then do it (the dialog would sit over what it opens)
  _then(fn) {
    this.close();
    setTimeout(fn, 0);
  }

  get _cards() {
    const active = items().find((i) => i.id === store.activeId);
    const sequences = topPage("Sequences");
    return [
      active && !active.metadata?.locked
        ? { icon: "oer:pencil", title: "Edit this page", hint: "Change what it says and add blocks, then save.", where: "Page menu ⌄ → Edit content", run: () => this._then(editPage) }
        : null,
      { icon: "oer:file-plus", title: "Add a page", hint: "A lesson, exercise, tutorial or any other type.", where: "Sidebar → New page", run: () => this._then(() => newPage().show()) },
      { icon: "oer:files", title: "Find a page", hint: "Search and filter every page on the site.", where: "Sidebar → Site → Browse pages", run: () => this._then(() => pagesBrowser().show()) },
      sequences
        ? { icon: "oer:school", title: "Plan a course", hint: "Weekly modules, assignments and due dates, ready for Canvas.", where: "Curriculum → Sequences", run: () => this._then(() => go(sequences.slug)) }
        : null,
      { icon: "oer:upload", title: "Import from Canvas", hint: "Turn a Canvas course export into draft pages.", where: "Sidebar → Site → Import from Canvas", run: () => this._then(() => canvasImport().show()) },
    ].filter(Boolean);
  }

  _renderStart() {
    const site = store.manifest?.title || "the site";
    const overview = topPage("D.Arts OER Overview");
    return html`
      <header>
        <div>
          <h2 id="t">Welcome to ${site}</h2>
          <p class="sub">Here's where to start. The tour shows how the site fits together.</p>
        </div>
        <button class="icon-btn" aria-label="Close" @click="${this.close}">${lucide("oer:x")}</button>
      </header>
      <div class="body">
        <ul class="cards" role="list">
          ${this._cards.map(
            (c) => html`<li>
              <button class="card" @click="${c.run}">
                <span class="card-icon">${lucide(c.icon)}</span>
                <span class="card-text">
                  <span class="card-title">${c.title}</span>
                  <span class="card-hint">${c.hint}</span>
                  <span class="card-where">${c.where}</span>
                </span>
              </button>
            </li>`,
          )}
          <li>
            <button class="card tour" @click="${() => this._to(0)}">
              <span class="card-icon">${lucide("oer:map")}</span>
              <span class="card-text">
                <span class="card-title">Take the tour</span>
                <span class="card-hint">${STOPS.length} stops, a minute each: how the site fits together.</span>
                <span class="card-where">Start the tour ${lucide("oer:arrow-right")}</span>
              </span>
            </button>
          </li>
        </ul>
      </div>
      <footer>
        <span class="note">You can open this again from your account menu.</span>
        <span class="spacer"></span>
        ${overview ? html`<a class="btn outline" href="${overview.slug}" @click="${(e) => (e.preventDefault(), this._then(() => go(overview.slug)))}">Read the overview</a>` : ""}
        <button class="btn primary" @click="${this.close}">Get started</button>
      </footer>
    `;
  }

  _renderStop() {
    const n = this._stop;
    const stop = STOPS[n];
    const next = STOPS[n + 1];
    return html`
      <header>
        <div>
          <h2 id="t">${stop.title}</h2>
          <p class="sub">Tour · ${n + 1} of ${STOPS.length}</p>
        </div>
        <button class="icon-btn" aria-label="Close" @click="${this.close}">${lucide("oer:x")}</button>
      </header>
      <div class="body">
        <div class="stop">
          <oer-schematic preset="${stop.preset}" alt="${stop.alt}"></oer-schematic>
          <div class="stop-text">
            ${stop.text}
            <p class="where"><span>Where</span>${stop.where}</p>
          </div>
        </div>
      </div>
      <footer>
        <span class="dots" aria-hidden="true">${STOPS.map((s, i) => html`<span class="${i === n ? "on" : ""}"></span>`)}</span>
        <span class="spacer"></span>
        <button class="btn outline" @click="${() => this._to(n - 1)}">${lucide("oer:chevron-left")}${n === 0 ? "Welcome" : "Back"}</button>
        ${next
          ? html`<button class="btn primary" @click="${() => this._to(n + 1)}">Next: ${next.title}${lucide("oer:chevron-right")}</button>`
          : html`<button class="btn primary" @click="${this.close}">Finish the tour</button>`}
      </footer>
    `;
  }

  render() {
    return html`<dialog aria-labelledby="t" @close="${this._closed}" @click="${(e) => e.target.localName === "dialog" && this.close()}">
      <div class="panel">${this.open ? (this._stop < 0 ? this._renderStart() : this._renderStop()) : ""}</div>
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
        max-height: min(44rem, calc(100dvh - 2rem));
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
        max-height: min(44rem, calc(100dvh - 2rem));
      }
      button,
      a {
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
        padding: 1rem 0.75rem 0.75rem 1.25rem;
      }
      header > div {
        flex: 1;
        min-width: 0;
      }
      h2 {
        margin: 0;
        font-size: 1.0625rem;
        font-weight: 600;
        letter-spacing: normal;
      }
      .sub {
        margin: 0.25rem 0 0;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      .icon-btn {
        all: unset;
        display: inline-grid;
        place-items: center;
        flex: none;
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
        padding: 0.25rem 1.25rem 1.25rem;
      }
      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(13.5rem, 1fr));
        gap: 0.5rem;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .cards li {
        display: flex;
      }
      .card {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md, 0.5rem);
        background: var(--card, var(--background));
        text-align: start;
        cursor: pointer;
      }
      .card:hover {
        border-color: var(--input-border, var(--border));
        background: var(--accent);
      }
      .card.tour {
        border-color: color-mix(in oklab, var(--primary) 45%, transparent);
        background: color-mix(in oklab, var(--primary) 12%, var(--popover, var(--background)));
      }
      .card.tour:hover {
        background: color-mix(in oklab, var(--primary) 18%, var(--popover, var(--background)));
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
      .card.tour .card-icon {
        background: var(--primary);
        color: var(--primary-foreground);
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
      .card-where {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        margin-top: 0.25rem;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .card.tour .card-where {
        color: var(--foreground);
        font-weight: 500;
      }
      .stop {
        display: grid;
        grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
        gap: 1.25rem;
        align-items: start;
      }
      oer-schematic {
        margin: 0;
      }
      .stop-text {
        font-size: 0.9375rem;
        line-height: 1.6;
      }
      .stop-text p {
        margin: 0 0 0.75rem;
      }
      .stop-text b {
        font-weight: 600;
      }
      kbd {
        padding: 0 0.3125rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-sm, 0.25rem);
        background: var(--muted);
        font-family: var(--font-mono);
        font-size: 0.8125em;
      }
      .where {
        display: inline-flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 0.375rem;
        padding: 0.375rem 0.625rem;
        border-radius: var(--radius-md, 0.5rem);
        background: var(--muted);
        font-size: 0.8125rem;
        line-height: 1.4;
      }
      .where span {
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--muted-foreground);
      }
      footer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-top: 1px solid var(--border);
      }
      .spacer {
        flex: 1;
      }
      .note {
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .dots {
        display: inline-flex;
        align-items: center;
        gap: 0.3125rem;
      }
      .dots span {
        width: 0.4375rem;
        height: 0.4375rem;
        border-radius: 999px;
        background: var(--input-border, var(--border));
      }
      .dots span.on {
        width: 1rem;
        background: var(--primary);
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
        text-decoration: none;
        cursor: pointer;
        white-space: nowrap;
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .btn.outline {
        border-color: var(--input-border, var(--border));
        background: transparent;
      }
      .btn.outline:hover {
        background: var(--accent);
      }
      @media (max-width: 40rem) {
        .stop {
          grid-template-columns: minmax(0, 1fr);
        }
        .note {
          flex-basis: 100%;
          order: 2;
        }
      }
    `;
  }
}
if (!customElements.get(OerWelcome.tag)) customElements.define(OerWelcome.tag, OerWelcome);

export function welcome() {
  const doc = globalThis.document;
  return doc.querySelector(OerWelcome.tag) || doc.body.appendChild(doc.createElement(OerWelcome.tag));
}

const seen = () => {
  try {
    return globalThis.localStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return true;
  }
};
const markSeen = () => {
  try {
    globalThis.localStorage.setItem(SEEN_KEY, "1");
  } catch {}
};

let installed = false;
/**
 * HAX's own welcome (Merlin opening by itself, with a chime) stays shut;
 * this one opens once per browser for a signed-in author, when the site has
 * loaded and nothing else is going on (not editing, not embedded, no dialog
 * open).
 */
export function installWelcome() {
  if (installed) return;
  installed = true;
  // HAX checks UserScaffold's memory before running its welcome program
  const hush = () => globalThis.UserScaffold?.requestAvailability?.()?.writeMemory?.("hasSeenHaxWelcome", true, "long");
  hush();
  customElements.whenDefined("haxcms-site-editor-ui").then((cls) => {
    cls.prototype.checkAndTriggerWelcomeProgram = function () {};
    hush();
  });
  const params = new URLSearchParams(globalThis.location.search);
  if (seen() || params.has("embed") || params.has("view")) return;
  const tryOpen = (tries = 0) => {
    if (seen() || tries > 40) return;
    const busy = !store.isLoggedIn || !store.manifest?.items?.length || store.editMode || !stockUI() || globalThis.document.querySelector("dialog[open]");
    if (busy) {
      // signed out: nothing to welcome; otherwise wait for the site to settle
      if (store.manifest?.items?.length && !store.isLoggedIn && tries > 10) return;
      setTimeout(() => tryOpen(tries + 1), 500);
      return;
    }
    markSeen();
    welcome().show();
  };
  setTimeout(() => tryOpen(), 1500);
}
