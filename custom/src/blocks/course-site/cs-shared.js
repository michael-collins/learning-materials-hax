/**
 * What the course site's section blocks (cs-sections.js) share: Lucide
 * icons, styles, a base class that finds the course site the block is on
 * and its data (types/course-site.js siteData), and helpers that read what
 * an author typed inside a section (a list, questions and answers).
 *
 * Sections are the full width of the page they're on: the theme draws a
 * course site's page full width, reading and editing, and ordinary blocks
 * between sections keep a readable width (cs-content.js).
 *
 * A section draws the same layout for readers and for authors, with what's
 * typed in it (its heading, its items, its text) slotted in where readers
 * see it (nu-hax docs/editor-redesign/spec.md §5): see SiteSection.
 */
import { html, css, LitElement, svg } from "../../lit.js";
import { store, autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { siteData, COURSE_SITE_TYPE } from "../../types/course-site.js";
import { editorControl } from "../../ui/editor-control.js";
import { headingFromAttribute, ensureHeading, listRows, ITEMS_FROM } from "./cs-normalize.js";
import { fieldKeydown, fieldKeyup, fieldPaste, controlKeydown } from "./cs-keys.js";

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
  plus: svg`<path d="M5 12h14"/><path d="M12 5v14"/>`,
  link: svg`<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>`,
  image: svg`<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>`,
};
export const icon = (name) => html`<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;

// an outcome's icon, when none is chosen: by its place among the outcomes
export const OUTCOME_ICONS = ["target", "sparkles", "layers", "wrench", "book", "users"];

// the section blocks, in the order a new course site has them
export const SECTION_TAGS = ["oer-cs-hero", "oer-cs-facts", "oer-cs-learn", "oer-cs-semester", "oer-cs-make", "oer-cs-books", "oer-cs-people", "oer-cs-tools", "oer-cs-faq", "oer-cs-closing", "oer-courses-intro", "oer-courses-catalog"];
export const isSection = (el) => SECTION_TAGS.includes(el?.localName);

/** The section a block is, or is inside (up to the page's body), or null. */
export function sectionOf(el) {
  for (let n = el; n && n.localName !== "hax-body"; n = n.parentElement) if (isSection(n)) return n;
  return null;
}

/* ---------- what authors typed inside a section ---------- */

const MEDIA = "img, video, audio, iframe";
/** Whether a field (or any block) holds no text and no picture. */
export const isEmpty = (el) => !el.textContent.trim() && !el.matches(MEDIA) && !el.querySelector(MEDIA);

/**
 * The blocks of text a written section shows readers as they're typed (a
 * tagline, a note, a question's answer): what HAX makes of a field, its
 * Markdown shortcuts and its Format menu included.
 */
export const TEXT_BLOCKS = ["p", "ul", "ol", "blockquote", "h3", "h4", "h5", "h6", "pre", "figure"];

/** A section's own heading element (its first h2, the hub intro's h1: SiteSection.headingIn), or null. */
export function headingOf(el) {
  return el.constructor?.headingIn?.(el) ?? null;
}

/** A section's own blocks: not HAX's page-break, nor its heading. */
export const ownBlocks = (el) => {
  const heading = headingOf(el);
  return [...el.children].filter((c) => c.localName !== "page-break" && c !== heading);
};

/** Whether a section holds text or a picture where readers see it: in the blocks it takes (its heading aside). */
export const hasContent = (el) => (el.sortChildren?.().text ?? ownBlocks(el)).some((c) => !isEmpty(c));

/**
 * A section's list as items, a row's sub-list's rows after it: each row's
 * bold start, or the words before a colon or dash, is its title ("Cut with
 * confidence: plan, cut and finish…").
 * How readers see a section written before it had items (cs-normalize.js
 * rowsToItems makes items the same way).
 */
export function listItems(el) {
  return listRows(el)
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
 * copies of the author's blocks so links and emphasis stay. (The section's
 * own heading isn't a question.)
 */
export function questions(el) {
  const out = [];
  const blocks = ownBlocks(el);
  const headed = blocks.some((b) => /^h[2-6]$/.test(b.localName));
  for (const b of blocks) {
    const isQ = headed ? /^h[2-6]$/.test(b.localName) : b.localName === "p" && /\?\s*$/.test(b.textContent);
    if (isQ && b.textContent.trim()) out.push({ q: b.textContent.trim(), a: [] });
    else if (out.length && !isEmpty(b)) out[out.length - 1].a.push(b.cloneNode(true));
  }
  return out;
}

// "an outcome", "a tool"
const withArticle = (noun) => `${/^[aeiou]/i.test(noun) ? "an" : "a"} ${noun}`;
// an element without what HAX adds while editing, which it never saves
function withoutEditing(el) {
  for (const a of [...el.attributes]) if (a.name.startsWith("data-hax-") || a.name === "contenteditable" || a.name === "draggable") el.removeAttribute(a.name);
  if (el.getAttribute("role") === "textbox") el.removeAttribute("role");
}
// what a stray block is, in words
const kindOf = (el) => (el.localName === "p" ? "paragraph" : /^h[1-6]$/.test(el.localName) ? "heading" : /^(ul|ol)$/.test(el.localName) ? "list" : "block");

/* ---------- the base class ---------- */

/**
 * A course site section. It finds its data from the page it's on (a course
 * site, the active page) and follows the manifest, sign-in and edit mode.
 * Internal state lives in plain fields: HAX saves a block's declared
 * properties into the page.
 *
 * It draws the reader's layout in both modes, with what's typed in it
 * slotted in by hand (slotAssignment "manual", done again after every
 * render and every change to its children, since HAX's undo, Edit HTML
 * and imports make new elements): its heading (the first h2, the intro's
 * h1) in "heading", its items (outcomes…) in "items" inside the list
 * readers see, the other blocks it takes (its policy's accepts) in "text",
 * and anything else in "stray", drawn only while editing with a note that
 * readers won't see it and a way to fix that. A section without its own
 * heading shows the default one from its shadow DOM, so the page's HTML
 * holds only what the author wrote. While editing, an empty field shows
 * what goes there underneath it (aria-hidden, in its shadow DOM), and
 * nothing the section draws can be selected as text.
 *
 * - hidden-from-readers (hiddenFromReaders): readers get nothing (and
 *   theme/theme.css hides it before it loads); while editing it's a strip
 *   saying so, which opens while it (or something in it) is selected.
 * - Editing begins (HAX's editModeChanged): its old markup is upgraded
 *   (cs-normalize.js), with an empty heading to type into; saving leaves an
 *   empty heading out (postProcessNodeToContent, from the HTML written for
 *   it: the page being edited keeps it), and its own Edit HTML shows it
 *   without what editing adds (preProcessNodeToContent).
 * - Its heading is its first h2 (headingIn(), which a section whose
 *   headings meant something else before can change).
 * - Its HAX menu (inlineContextMenu) offers Hide from readers or Show to
 *   readers, and Add for a section of items, each asked of the editor with
 *   `oer-edit-request`.
 * - Preview (the oer-preview event, with data-oer-preview on hax-body) draws
 *   it as readers see it. The theme's own copy of the page rests while the
 *   page is edited (oer-reader-copy-idle).
 * - It sends cs-section-change when readers would start or stop seeing it,
 *   cs-items-change when its items change, and cs-upgraded once upgraded.
 * - Empty, it shows authors one of two things that never look alike: what
 *   goes in a field, faintly in the field, or, for what comes from
 *   elsewhere (fromElsewhere()), a callout with a button that sends
 *   cs-edit-source for the theme to open the source.
 */
export class SiteSection extends LitElement {
  static get shadowRootOptions() {
    return { ...LitElement.shadowRootOptions, slotAssignment: "manual" };
  }

  static get properties() {
    return {
      // reflected: HAX saves (and undoes) what's in the markup
      hiddenFromReaders: { type: Boolean, reflect: true, attribute: "hidden-from-readers" },
    };
  }

  /** What the editor may do with it (editor/policy.js): each section says. */
  static get oerEditor() {
    return { kind: "section" };
  }

  /** Its heading's tag: "h2" ("h1" for the hub's intro), or null for one without a heading of its own. */
  static get headingTag() {
    return "h2";
  }

  /** The heading of a section of this kind (el): its first child of headingTag, or null. */
  static headingIn(el) {
    const tag = this.headingTag;
    return tag ? [...el.children].find((c) => c.localName === tag) || null : null;
  }

  constructor() {
    super();
    this.hiddenFromReaders = false;
    this._editing = false;
    this._sorted = { heading: null, items: [], text: [], stray: [] };
    this._empty = { heading: false, text: false };
    this._open = false;
  }

  connectedCallback() {
    super.connectedCallback();
    // in HAX's editor, or a copy for readers (the theme's, or the frame's)
    this._inEditor = !!this.closest("hax-body");
    this.__children ??= new MutationObserver(() => {
      this.assignSlots();
      this.requestUpdate();
    });
    this.__resting = () => this._follow();
    this.__previewed = () => this._modeChanged();
    globalThis.addEventListener("oer-reader-copy-idle", this.__resting);
    globalThis.addEventListener("oer-preview", this.__previewed);
    // Tab on its controls goes on through the content (before the control,
    // which keeps its keys from HAX)
    if (!this.__controlKeys) {
      this.__controlKeys = (e) => controlKeydown(this, e);
      this.renderRoot.addEventListener("keydown", this.__controlKeys, true);
    }
    this._follow();
  }

  disconnectedCallback() {
    this.__stop?.();
    this.__stop = null;
    this.__children?.disconnect();
    globalThis.removeEventListener("oer-reader-copy-idle", this.__resting);
    globalThis.removeEventListener("oer-preview", this.__previewed);
    super.disconnectedCallback();
  }

  // follow the page, sign-in and edit mode, and what's typed in it; but
  // the theme's own copy of the page rests while the page is edited, as it
  // isn't shown
  _follow() {
    this.__idle = !this._inEditor && !!this.closest("[reader-copy-idle]");
    if (this.__idle) {
      this.__stop?.();
      this.__stop = null;
      this.__children.disconnect();
      return;
    }
    // (HAX marks its active block: a hidden section opens while it, or
    // something in it, is the one)
    this.__children.observe(this, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["data-hax-active"] });
    if (this.__stop) return;
    this.__stop = autorun(() => {
      const item = toJS(store.activeItem);
      const items = toJS(store.manifest?.items) || [];
      const author = !!store.isLoggedIn;
      const editMode = !!store.editMode;
      Promise.resolve().then(() => {
        const site = (item && items.find((i) => i.id === item.id)) || item;
        // the page it's on, whatever it is, and the whole site (the hub's blocks read those)
        this._page = site;
        this._items = items;
        this._site = site?.metadata?.pageType === COURSE_SITE_TYPE ? site : null;
        this._d = this._site ? siteData(this._site, items) : null;
        this._author = author;
        this._editMode = editMode;
        this._modeChanged();
        this.requestUpdate();
      });
    });
  }

  // drawn for editing only in HAX's editor, in edit mode, and not in Preview
  _modeChanged() {
    const body = this._inEditor ? this.closest("hax-body") : null;
    const editing = !!body && !!this._editMode && !body.hasAttribute("data-oer-preview");
    if (editing === this._editing) return;
    this._editing = editing;
    this.requestUpdate();
  }

  shouldUpdate() {
    return !this.__idle;
  }

  /* ---------- what's typed in it ---------- */

  /** Its heading element (see headingOf), or null. */
  get headingElement() {
    return headingOf(this);
  }

  /** The tag of the items it holds (its policy's accepts), or "". */
  get itemTag() {
    return (this.constructor.oerEditor.accepts || []).find((tag) => globalThis.customElements.get(tag)?.oerEditor?.kind === "item") || "";
  }

  /** Its items, as they are now. */
  get items() {
    return [...this.children].filter((c) => c.localName === this.itemTag);
  }

  /**
   * Its children, for its slots: its heading (one), its items, the other
   * blocks it takes (its policy's accepts), and the rest, stray.
   */
  sortChildren() {
    const accepts = this.constructor.oerEditor.accepts || [];
    const tag = this.constructor.headingTag;
    const itemTag = this.itemTag;
    const out = { heading: this.headingElement, items: [], text: [], stray: [] };
    for (const el of this.children) {
      if (el === out.heading) continue;
      else if (itemTag && el.localName === itemTag) out.items.push(el);
      // (one heading, and one only)
      else if (accepts.includes(el.localName) && el.localName !== tag) out.text.push(el);
      else out.stray.push(el);
    }
    return out;
  }

  willUpdate(changed) {
    super.willUpdate?.(changed);
    this._sorted = this.sortChildren();
    const { heading, text } = this._sorted;
    this._empty = { heading: !!heading && isEmpty(heading), text: text.every(isEmpty) };
    this._open = this.hasAttribute("data-hax-active") || !!this.querySelector("[data-hax-active]");
  }

  /**
   * Put its children in its slots: by hand, after every render and change
   * (an unassigned child isn't drawn). Readers get only what has text: an
   * empty heading gives way to the section's own.
   */
  assignSlots() {
    const root = this.shadowRoot;
    if (!root) return;
    const sorted = this.sortChildren();
    const editing = this._editing;
    const kept = (els) => (editing ? els : els.filter((el) => !isEmpty(el)));
    const slot = (name) => root.querySelector(`slot[name="${name}"]`);
    slot("heading")?.assign(...kept(sorted.heading ? [sorted.heading] : []));
    slot("items")?.assign(...(editing ? sorted.items : sorted.items.filter((i) => i.hasText)));
    // (the first of them shares its cell with what goes there, while empty)
    const text = kept(sorted.text);
    slot("text-first")?.assign(...text.slice(0, 1));
    slot("text")?.assign(...text.slice(1));
    slot("stray")?.assign(...(editing ? sorted.stray : []));
    sorted.items.forEach((item, i) => item.setEditing?.(editing, i));
  }

  /** Whether readers see this section (the course site's bar lists those). */
  get shown() {
    return true;
  }

  updated(changed) {
    super.updated?.(changed);
    this.assignSlots();
    // tell the course site's bar when a section appears or empties
    if (this.__wasShown !== this.shown) {
      this.__wasShown = this.shown;
      this.dispatchEvent(new CustomEvent("cs-section-change", { bubbles: true, composed: true }));
    }
    // and the Sections sheet when its items change
    const items = this._sorted.items.map((i) => i.titleElement?.textContent ?? "").join("\n") + `#${this._sorted.items.length}`;
    if (this.__items !== undefined && this.__items !== items) this.dispatchEvent(new CustomEvent("cs-items-change", { bubbles: true, composed: true }));
    this.__items = items;
  }

  /** Scroll to another section of this course site. */
  go(tag) {
    const target = this.getRootNode().querySelector?.(tag) || globalThis.document.querySelector(tag);
    target?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }

  /** Ask the editor for a change to this section (editor/ops.js), as its controls do. */
  request(action, detail = {}) {
    this.dispatchEvent(new CustomEvent("oer-edit-request", { bubbles: true, composed: true, detail: { action, unit: this, ...detail } }));
  }

  /* ---------- drawing ---------- */

  /**
   * Its heading: the one typed in it, or else fallback, the section's own
   * (or a heading attribute, written before headings were typed in place).
   * While editing, an empty heading shows fallback under it.
   */
  headingCell(fallback) {
    const tag = this.constructor.headingTag;
    const text = this.heading || fallback;
    const empty = this._editing && this._empty.heading;
    return html`<div class="field heading-cell ${empty ? "empty" : ""}">
      <slot name="heading" class="first">${tag === "h1" ? html`<h1>${text}</h1>` : html`<h2>${text}</h2>`}</slot>${empty ? html`<span class="ph ph-${tag}" aria-hidden="true">${fallback}</span>` : ""}
    </div>`;
  }

  /** The other blocks it takes, where readers see them; while editing, empty ones show placeholder. */
  textCell(placeholder, classes = "") {
    const empty = this._editing && this._sorted.text.length > 0 && this._empty.text;
    return html`<div class="field text-cell ${classes} ${empty ? "empty" : ""}">
      <slot name="text-first" class="first"></slot>${empty ? html`<span class="ph" aria-hidden="true">${placeholder}</span>` : ""}<slot name="text"></slot>
    </div>`;
  }

  // while editing: what readers won't see (blocks the section doesn't take), and the ways to fix it
  _strayNote() {
    const strays = this._sorted.stray;
    const n = strays.length;
    const one = n === 1;
    const itemTag = this.itemTag;
    const noun = itemTag ? (globalThis.customElements.get(itemTag).oerEditor.label || "item").toLowerCase() : "";
    return html`<div class="wrap stray-wrap" ?hidden="${!n}">
      <div class="stray">
        <p class="stray-note">
          ${icon("eyeOff")}<span>Readers won't see ${one ? `this ${kindOf(strays[0])}` : `these ${n} blocks`}.</span>
          ${itemTag
            ? html`<button class="link" ${editorControl()} @click="${() => this.request("stray-to-items")}">Make ${one ? `it ${withArticle(noun)}` : `them ${noun}s`}</button><span aria-hidden="true">·</span>`
            : ""}
          <button class="link" ${editorControl()} @click="${() => this.request("move-out")}">Move ${one ? "it" : "them"} below the section</button>
        </p>
        <slot name="stray"></slot>
      </div>
    </div>`;
  }

  /**
   * While editing a section of items, the button that adds one after the
   * last (or the first), in the shape of its items (cls: "add-card",
   * "add-chip", "add-row", which the section styles; "first" while it has
   * none, to start with).
   */
  addCell(cls) {
    const last = this.items.at(-1);
    const noun = (globalThis.customElements.get(this.itemTag)?.oerEditor.label || "item").toLowerCase();
    return html`<button class="${cls} ${last ? "" : "first"}" ${editorControl()} @click="${() => this.request("add-item", last ? { unit: last } : {})}">
      ${icon("plus")}<span>Add ${withArticle(noun)}</span>
    </button>`;
  }

  // while editing a section hidden from readers: a strip saying so, with the way back
  _strip() {
    const label = this.constructor.oerEditor.label || "This section";
    return html`<div class="strip">
      <div class="wrap strip-in">
        <span class="strip-label">${icon("eyeOff")}<b>${label}</b><span aria-hidden="true">·</span><span>Hidden from readers</span></span>
        <button class="btn outline sm" ${editorControl()} @click="${() => this.request("show")}">Show to readers</button>
      </div>
    </div>`;
  }

  /** For authors: what an empty section needs. */
  todo(text) {
    return this._author ? html`<p class="todo">${icon("pencil")}<span>${text}</span></p>` : "";
  }

  /**
   * For authors, where what a generated section shows comes from, when it
   * has nothing to show: an information callout (never a field's faint
   * words) with one button that goes there (editSource(kind, field, page);
   * no button without a label). kind is its policy's source by default.
   */
  fromElsewhere(text, label = "", { kind = this.constructor.oerEditor.source?.kind, field = "", page = "" } = {}) {
    if (!this._author) return "";
    return html`<div class="source" role="note">
      ${icon("info")}<p class="source-text">${text}</p>
      ${label ? html`<button class="btn outline sm" ${editorControl()} @click="${() => this.editSource(kind, field, page)}">${label}</button>` : ""}
    </div>`;
  }

  /**
   * Open where a generated section's content comes from: a cs-edit-source
   * event, { kind, field, page }, which the theme answers while reading and
   * editing alike: "course" the course page's Page details at that field,
   * "site" the course site's own, "plan" the course plan (in a new tab), or
   * with a field, the site's Page details at it; "page" a page of the site
   * by its id (a course page, Courses) in a new tab.
   */
  editSource(kind, field = "", page = "") {
    this.dispatchEvent(new CustomEvent("cs-edit-source", { bubbles: true, composed: true, detail: { kind, field, page } }));
  }

  /** What the section draws for its page: renderSection(d) on a course site. */
  renderContent() {
    if (!this._d) {
      return this._author
        ? html`<div class="wrap"><p class="todo">${icon("info")}<span>This block shows part of a course site, so it only works on a course site page.</span></p></div>`
        : html``;
    }
    return this.renderSection(this._d);
  }

  render() {
    // readers (and Preview) never see a section hidden from them
    if (this.hiddenFromReaders && !this._editing) return html``;
    const content = this.renderContent();
    if (!this._editing) return content;
    // folded to its strip unless it (or something in it) is selected
    const folded = this.hiddenFromReaders && !this._open;
    return html`<div class="editing ${this.hiddenFromReaders ? "hidden-section" : ""}">
      ${this.hiddenFromReaders ? this._strip() : ""}${folded ? "" : content}${folded ? "" : this._strayNote()}
    </div>`;
  }

  /* ---------- keys, for the editor (cs-keys.js) ---------- */

  oerFieldKey(e, field) {
    return fieldKeydown(this, e, field);
  }

  oerFieldKeyup(e, field) {
    return fieldKeyup(this, e, field);
  }

  oerFieldPaste(e, field) {
    return fieldPaste(this, e, field);
  }

  /* ---------- HAX ---------- */

  haxHooks() {
    return {
      editModeChanged: "haxeditModeChanged",
      activeElementChanged: "haxactiveElementChanged",
      inlineContextMenu: "haxinlineContextMenu",
      preProcessNodeToContent: "haxpreProcessNodeToContent",
      postProcessNodeToContent: "haxpostProcessNodeToContent",
    };
  }

  /**
   * Editing begins: what was written before the section model is upgraded
   * (upgradeItems() for items; a heading attribute becomes its heading),
   * its heading goes first (an empty one is made to type into) and each
   * item gets a title to type into, all before HAX takes its starting copy
   * of the page (or, should it come after, as part of it: editor/undo.js
   * hears cs-upgraded), so none of it is a change.
   */
  haxeditModeChanged(on) {
    if (on) this.upgrade();
  }

  /** See haxeditModeChanged(). Returns whether anything changed. */
  upgrade() {
    const tag = this.constructor.headingTag;
    // (items first: what an old section's headings were is read before its
    // heading attribute goes)
    let changed = this.upgradeItems();
    if (tag) changed = headingFromAttribute(this, tag, this.headingElement) || changed;
    if (tag) changed = ensureHeading(this, tag, this.headingElement) || changed;
    for (const item of this.items) changed = item.upgrade?.() || changed;
    if (changed) this.dispatchEvent(new CustomEvent("cs-upgraded", { bubbles: true, composed: true }));
    return changed;
  }

  /** A section of items makes them from what was written before (cs-normalize.js ITEMS_FROM). */
  upgradeItems() {
    return ITEMS_FROM[this.localName]?.(this) ?? false;
  }

  /**
   * Blocks made into this section's items as its upgrade makes them (a
   * question and its answer, one question; a list's rows, a tool each),
   * for the editor to put in (editor/ops.js strayToItems): copies, with
   * any block it can't make an item of left as it is; or null for a
   * section that makes none this way.
   */
  itemsFrom(blocks) {
    const from = ITEMS_FROM[this.localName];
    if (!from || !this.itemTag) return null;
    const holder = this.ownerDocument.createElement("div");
    holder.append(...blocks.map((b) => b.cloneNode(true)));
    from(holder);
    for (const item of holder.children) item.upgrade?.();
    return [...holder.children];
  }

  /** It, or something in it, became the active block: a hidden section opens. */
  haxactiveElementChanged() {
    this.requestUpdate();
    return false;
  }

  /** Its own commands in HAX's block menu, each asked of the editor. */
  haxinlineContextMenu(plate) {
    const buttons = [];
    const itemTag = this.itemTag;
    if (itemTag) buttons.push({ icon: "icons:add", label: `Add ${withArticle((globalThis.customElements.get(itemTag).oerEditor.label || "item").toLowerCase())}`, callback: "haxAddItem" });
    buttons.push(
      this.hiddenFromReaders
        ? { icon: "icons:visibility", label: "Show to readers", callback: "haxShowToReaders" }
        : { icon: "icons:visibility-off", label: "Hide from readers", callback: "haxHideFromReaders" },
    );
    plate.ceButtons = buttons;
  }

  haxAddItem() {
    this.request("add-item");
  }

  haxHideFromReaders() {
    this.request("hide");
  }

  haxShowToReaders() {
    this.request("show");
  }

  /**
   * HAX's own Edit HTML of the section (its source view, which shows the
   * section element itself, and makes a new one of what's typed there):
   * without what editing adds to it and its fields, as saving leaves them
   * out. HAX takes the section out of editing for it anyway (and makes it
   * what preProcessNodeToContent returns, so it's the section, not a copy).
   * hax-body.js hax-source-view-toggle 3797–3826.
   */
  haxpreProcessNodeToContent(node) {
    if (node.__haxSourceView) for (const el of [node, ...node.querySelectorAll("*")]) withoutEditing(el);
    return node;
  }

  /**
   * Saving (and Edit HTML of the page): an empty heading, first in the HTML
   * HAX wrote for the section, is left out of it. (Not from the section
   * itself, which keeps it to type into.)
   */
  haxpostProcessNodeToContent(content) {
    const tag = this.constructor.headingTag;
    if (!tag) return content;
    return content.replace(new RegExp(`^(<${this.localName}(?:\\s[^>]*)?>\\s*)<${tag}(?:\\s[^>]*)?>\\s*(?:<br\\s*/?>)?\\s*</${tag}>\\s*`), "$1");
  }
}

/* ---------- styles ---------- */

export const csStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    /* the full width of the course site, which the theme draws full width */
    width: 100%;
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
  /* for authors, what an empty section needs: an information callout */
  .todo {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    margin: 0;
    padding: 0.75rem 1rem;
    border: 1px solid color-mix(in oklab, var(--primary) 45%, transparent);
    border-radius: var(--radius-md);
    background: color-mix(in oklab, var(--primary) 12%, var(--background));
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--foreground);
  }
  .todo .i {
    margin-top: 0.1875rem;
    color: var(--primary);
  }
  /* for authors, where a generated section's content comes from: the same
     callout, with the button that goes there */
  .source {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 0.75rem;
    padding: 0.75rem 1rem;
    border: 1px solid color-mix(in oklab, var(--primary) 45%, transparent);
    border-radius: var(--radius-md);
    background: color-mix(in oklab, var(--primary) 12%, var(--background));
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--foreground);
  }
  .source > .i {
    color: var(--primary);
  }
  /* (whatever a section's own rules for p say) */
  .source .source-text {
    flex: 1 1 16rem;
    margin: 0;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
  }
  /* (its border 3:1 against the callout's tint, which --input-border isn't) */
  .source .btn {
    border-color: color-mix(in oklab, var(--input-border) 80%, var(--foreground));
    background: var(--background);
  }
  .source .btn:hover {
    background: var(--accent);
  }
  .btn.sm {
    height: 2rem;
    padding: 0 0.75rem;
    font-size: 0.8125rem;
  }
  button.link {
    padding: 0;
    border: 0;
    background: none;
    color: var(--link);
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }

  /* ---------- while editing ---------- */

  /* nothing the section draws is part of the text: the caret and the
     selection go from field to field past it */
  .editing,
  .editing * {
    -webkit-user-select: none;
    user-select: none;
  }
  /* a field typed in the section, and (while it's empty) what goes there,
     under it in the same cell, where a click lands in the field */
  .field.empty {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }
  .field.empty .first::slotted(*),
  .field.empty .ph {
    grid-area: 1 / 1;
  }
  .ph {
    pointer-events: none;
    color: var(--muted-foreground);
  }
  .ph-h1,
  .ph-h2 {
    font-family: var(--cs-font-display, inherit);
    font-weight: var(--cs-display-weight, 700);
    text-wrap: balance;
  }
  .ph-h2 {
    font-size: clamp(1.5rem, 3vw, 2rem);
    line-height: 1.2;
    letter-spacing: -0.015em;
  }
  /* a section hidden from readers: a strip, which opens while selected */
  .strip {
    display: flex;
    align-items: center;
    min-block-size: 3rem;
    background: repeating-linear-gradient(135deg, var(--muted) 0 0.5rem, transparent 0.5rem 1rem);
    border-block: 1px solid var(--border);
  }
  .strip-in {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem 1rem;
    padding-block: 0.375rem;
  }
  .strip-label {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.375rem;
    padding: 0.25rem 0.625rem;
    border-radius: var(--radius-md);
    background: var(--background);
    font-size: 0.875rem;
    color: var(--foreground);
  }
  .strip .btn {
    background: var(--background);
  }
  /* blocks the section doesn't take, which readers won't see */
  .stray-wrap {
    padding-block: 0 2rem;
  }
  .stray {
    padding: 0.75rem 1rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--card);
  }
  .stray-note {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.375rem;
    margin: 0 0 0.5rem;
    font-size: 0.8125rem;
    color: var(--muted-foreground);
  }
  @media (forced-colors: active) {
    /* what goes in an empty field, unlike what's typed */
    .ph {
      color: GrayText;
    }
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
