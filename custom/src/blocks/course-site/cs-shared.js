/**
 * What the course site's section blocks (cs-sections.js) share: Lucide
 * icons, styles, a base class that finds the course site the block is on
 * and its data (types/course-site.js siteData), and helpers that read what
 * an author typed inside a section (a list, questions and answers).
 *
 * Sections are full width wherever they sit: the theme makes the course
 * site's scrolling area a container, and each section spans it
 * (100cqw), so ordinary blocks between sections keep a readable width.
 */
import { html, css, LitElement, svg } from "../../lit.js";
import { store, autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { siteData, COURSE_SITE_TYPE } from "../../types/course-site.js";

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
  palette: svg`<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>`,
  sun: svg`<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-2.93 1.41-1.41m11.32-11.32 1.41-1.41M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41"/>`,
  moon: svg`<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`,
  chevron: svg`<path d="m6 9 6 6 6-6"/>`,
  eyeOff: svg`<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>`,
  info: svg`<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>`,
  link: svg`<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>`,
};
export const icon = (name) => html`<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;

// the section blocks, in the order a new course site has them
export const SECTION_TAGS = ["oer-cs-hero", "oer-cs-facts", "oer-cs-learn", "oer-cs-semester", "oer-cs-make", "oer-cs-books", "oer-cs-people", "oer-cs-tools", "oer-cs-faq", "oer-cs-closing", "oer-courses-intro", "oer-courses-catalog"];
export const isSection = (el) => SECTION_TAGS.includes(el?.localName);

/* ---------- what authors typed inside a section ---------- */

/** A section's own blocks (HAX's page-break aside). */
export const ownBlocks = (el) => [...el.children].filter((c) => c.localName !== "page-break");

/** Whether a section holds any text or media. */
export const hasContent = (el) => ownBlocks(el).some((c) => c.textContent.trim() || /^(img|video|iframe|figure)$/.test(c.localName) || c.querySelector?.("img, video, iframe"));

/**
 * A section's list as items: each row's bold start, or the words before a
 * colon or dash, is its title ("Cut with confidence: plan, cut and finish…").
 */
export function listItems(el) {
  const rows = [...el.querySelectorAll(":scope > ul > li, :scope > ol > li")];
  return rows
    .map((li) => {
      const lead = li.firstElementChild && /^(strong|b)$/.test(li.firstElementChild.localName) && li.textContent.trim().startsWith(li.firstElementChild.textContent.trim()) ? li.firstElementChild.textContent.trim() : "";
      const all = li.textContent.replace(/\s+/g, " ").trim();
      if (lead) return { title: lead.replace(/[:–—-]\s*$/, ""), text: all.slice(lead.length).replace(/^\s*[:–—-]\s*/, "") };
      const at = all.search(/[:—–]\s|\s-\s/);
      return at > 0 ? { title: all.slice(0, at).trim(), text: all.slice(at + 1).replace(/^[\s-]+/, "") } : { title: all, text: "" };
    })
    .filter((r) => r.title || r.text)
    .map((r) => ({ ...r, text: r.text.charAt(0).toUpperCase() + r.text.slice(1) }));
}

/**
 * Questions and answers: each heading (or a paragraph ending with "?") is a
 * question, and what follows it until the next one is its answer, kept as
 * copies of the author's blocks so links and emphasis stay.
 */
export function questions(el) {
  const out = [];
  const blocks = ownBlocks(el);
  const headed = blocks.some((b) => /^h[2-6]$/.test(b.localName));
  for (const b of blocks) {
    const isQ = headed ? /^h[2-6]$/.test(b.localName) : b.localName === "p" && /\?\s*$/.test(b.textContent);
    if (isQ && b.textContent.trim()) out.push({ q: b.textContent.trim(), a: [] });
    else if (out.length && b.textContent.trim()) out[out.length - 1].a.push(b.cloneNode(true));
  }
  return out;
}

/* ---------- the base class ---------- */

/**
 * A course site section. It finds its data from the page it's on (a course
 * site, the active page), follows the manifest, sign-in and edit mode, and
 * re-reads what's typed inside it as an author types. Internal state lives
 * in plain fields: HAX saves a block's declared properties into the page.
 */
export class SiteSection extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.__stop = autorun(() => {
      const item = toJS(store.activeItem);
      const items = toJS(store.manifest?.items) || [];
      const author = !!store.isLoggedIn;
      const editing = !!store.editMode;
      Promise.resolve().then(() => {
        const site = (item && items.find((i) => i.id === item.id)) || item;
        // the page it's on, whatever it is, and the whole site (the hub's blocks read those)
        this._page = site;
        this._items = items;
        this._site = site?.metadata?.pageType === COURSE_SITE_TYPE ? site : null;
        this._d = this._site ? siteData(this._site, items) : null;
        this._author = author;
        this._editing = editing;
        this.requestUpdate();
      });
    });
    this.__typed = new MutationObserver(() => {
      cancelAnimationFrame(this.__raf);
      this.__raf = requestAnimationFrame(() => this.requestUpdate());
    });
    this.__typed.observe(this, { childList: true, subtree: true, characterData: true });
    // HAX moves focus when a block becomes active (to its toolbar, then its
    // settings form): a control the author just clicked here gets it back,
    // unless they've clicked somewhere else since
    this.__refocus = (e) => {
      const c = this.__claim;
      if (!c || performance.now() > c.until || !e.composedPath().includes(c.el)) return;
      requestAnimationFrame(() => {
        if (this.__claim !== c || performance.now() > c.until) return;
        c.el.focus();
        if (c.el.isContentEditable) {
          const range = globalThis.document.createRange();
          range.selectNodeContents(c.el);
          range.collapse(false);
          const sel = c.el.getRootNode().getSelection?.() || globalThis.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        }
      });
    };
    this.__elsewhere = (e) => {
      if (this.__claim && !e.composedPath().includes(this.__claim.el)) this.__claim = null;
    };
    this.addEventListener("focusout", this.__refocus, true);
    globalThis.document.addEventListener("pointerdown", this.__elsewhere, true);
  }

  disconnectedCallback() {
    this.__stop?.();
    this.__typed?.disconnect();
    this.removeEventListener("focusout", this.__refocus, true);
    globalThis.document.removeEventListener("pointerdown", this.__elsewhere, true);
    super.disconnectedCallback();
  }

  /** Whether readers see this section (the course site's bar lists those). */
  get shown() {
    return true;
  }

  updated() {
    // tell the course site's bar when a section appears or empties
    if (this.__wasShown !== this.shown) {
      this.__wasShown = this.shown;
      this.dispatchEvent(new CustomEvent("cs-section-change", { bubbles: true, composed: true }));
    }
  }

  /** Scroll to another section of this course site. */
  go(tag) {
    const target = this.getRootNode().querySelector?.(tag) || globalThis.document.querySelector(tag);
    target?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }

  /**
   * A section's heading: typed in place while editing (Enter or leaving
   * keeps it, Esc puts it back; empty goes back to `fallback`), so authors
   * never need the block's settings for it. Saved as the block's `heading`.
   */
  headingEl(fallback, tag = "h2") {
    const text = this.heading || fallback;
    if (!this._editing) return tag === "h1" ? html`<h1>${text}</h1>` : html`<h2>${text}</h2>`;
    const commit = (e) => {
      const v = e.target.textContent.replace(/\s+/g, " ").trim();
      this.heading = v && v !== fallback ? v : undefined;
      if (!this.heading) this.removeAttribute("heading");
      e.target.textContent = this.heading || fallback;
    };
    const keys = (e) => {
      // the editor's own keys (Enter adds a block, Backspace deletes one) stay out
      e.stopPropagation();
      if (e.key === "Enter") {
        e.preventDefault();
        e.target.blur();
      } else if (e.key === "Escape") {
        e.target.textContent = this.heading || fallback;
        e.target.blur();
      }
    };
    const attrs = { contenteditable: "plaintext-only", spellcheck: "true", role: "textbox", "aria-label": `Heading (empty for “${fallback}”)`, title: "Type to change the heading" };
    // HAX takes clicks inside blocks for itself: this one is ours
    const take = (e) => this.claim(e);
    return tag === "h1"
      ? html`<h1 class="edit-heading" contenteditable="${attrs.contenteditable}" role="textbox" aria-label="${attrs["aria-label"]}" title="${attrs.title}" .textContent="${text}" @pointerdown="${take}" @mousedown="${take}" @click="${take}" @keydown="${keys}" @paste="${(e) => e.stopPropagation()}" @blur="${commit}"></h1>`
      : html`<h2 class="edit-heading" contenteditable="${attrs.contenteditable}" role="textbox" aria-label="${attrs["aria-label"]}" title="${attrs.title}" .textContent="${text}" @pointerdown="${take}" @mousedown="${take}" @click="${take}" @keydown="${keys}" @paste="${(e) => e.stopPropagation()}" @blur="${commit}"></h2>`;
  }

  /**
   * A click on an in-place control (a heading, the hero's image field):
   * kept from HAX, and the control keeps focus for a moment while HAX
   * moves it about (see connectedCallback).
   */
  claim(e) {
    e.stopPropagation();
    const el = e.composedPath()[0];
    if (e.type === "pointerdown" && el instanceof HTMLElement) this.__claim = { el, until: performance.now() + 1500 };
  }

  /** Events an in-place control keeps from HAX (which takes clicks and keys inside blocks for itself). */
  static keep(e) {
    e.stopPropagation();
  }

  /** For authors: what an empty section needs. */
  todo(text) {
    return this._author ? html`<p class="todo">${icon("pencil")}<span>${text}</span></p>` : "";
  }

  render() {
    if (!this._d) {
      return this._author
        ? html`<div class="wrap"><p class="todo">${icon("info")}<span>This block shows part of a course site, so it only works on a course site page.</span></p></div>`
        : html``;
    }
    return this.renderSection(this._d);
  }
}

/* ---------- styles ---------- */

export const csStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    /* the full width of the course site, wherever the block sits */
    width: 100cqw;
    max-width: 100cqw;
    margin-inline: calc(50% - 50cqw);
    color: var(--foreground);
    font-family: var(--cs-font-body, var(--font-sans, system-ui, sans-serif));
    /* DDD justifies the theme's text */
    text-align: start;
    --wrap: 72rem;
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
  .section {
    padding: 4rem 0;
  }
  .section.alt {
    background: var(--card);
    border-block: 1px solid var(--border);
  }
  h1,
  h2 {
    font-family: var(--cs-font-display, inherit);
    font-weight: var(--cs-display-weight, 700);
    text-wrap: balance;
  }
  h2 {
    margin: 0 0 1.5rem;
    font-size: clamp(1.5rem, 3vw, 2rem);
    line-height: 1.2;
    letter-spacing: -0.015em;
  }
  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }
  .lede {
    margin: -0.75rem 0 1.5rem;
    color: var(--muted-foreground);
  }
  .kicker {
    margin: 0 0 0.75rem;
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted-foreground);
  }
  .btn {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    height: 2.75rem;
    padding: 0 1.25rem;
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    background: none;
    font-size: 0.9375rem;
    font-weight: 500;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
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
  .btn.outline:hover {
    background: var(--accent);
  }
  .ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 2rem;
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
  .todo {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    margin: 0;
    padding: 0.75rem 1rem;
    border: 1px dashed var(--input-border, var(--border));
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--muted-foreground);
  }
  .todo .i {
    margin-top: 0.1875rem;
  }
  /* while editing: where the author types, and how it will be used */
  .typing {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .typing-hint {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    margin: 0;
    font-size: 0.8125rem;
    line-height: 1.5;
    color: var(--muted-foreground);
  }
  .typing-hint .i {
    margin-top: 0.125rem;
  }
  /* a heading typed in place while editing */
  .edit-heading {
    border-radius: var(--radius-sm, 0.375rem);
    outline: 1px dashed color-mix(in oklab, var(--primary) 45%, var(--border));
    outline-offset: 0.25rem;
    cursor: text;
  }
  .edit-heading:focus {
    outline: 2px solid var(--ring);
  }
  .typing-area {
    padding: 0.75rem 1rem;
    border: 1px dashed color-mix(in oklab, var(--primary) 45%, var(--border));
    border-radius: var(--radius-md);
    background: var(--background);
  }
  @media (max-width: 600px) {
    .wrap {
      padding: 0 1rem;
    }
    .section {
      padding: 3rem 0;
    }
  }
`;
