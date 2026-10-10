/**
 * What the editor may do with each kind of block, in one place: the guards
 * here ask policyOf(el) rather than keeping their own lists of sections, and
 * the frame, rail, inserter, slots and the Sections sheet move onto it as
 * they are rebuilt (nu-hax docs/editor-redesign/spec.md §6.1).
 *
 * A block class can say it in `static oerEditor`; HAX's own tags, and the
 * course-site sections until the section model gives them their own
 * (editor-redesign WP-07), come from the table below. policyOf(el) merges
 * the class's over the table's over the defaults for its kind.
 *
 *   kind        "section", "item", "text", "inline", "layout", "media",
 *               "break" (the page-break) or "block" (any other block)
 *   limit       how many a page may hold (1 for sections), or null
 *   pin         "first" or "last": where a section stays, or null
 *   pageTypes   the page types it belongs on, or null for any page
 *   accepts     the tags it takes as children: ["*"] any block, [] none
 *   flow        how its own units run: "page", "cards", "chips" or "stack"
 *   fields      its own text fields, by tag: { name, single, paste }.
 *               single: one line, which deletions and joins don't cross;
 *               paste "line": pasted as plain text on one line
 *   source      where a generated section's content comes from:
 *               { label, kind, section }
 *   attrs       the attributes that hold what the author wrote or chose (a
 *               section's heading, the hero's image), which removing it
 *               would lose as much as its text
 *   fullBleed   drawn edge to edge
 *   columns     can be put in columns
 *   textTarget  HAX's text toolbar may make it its target (role="textbox");
 *               undefined leaves HAX's own way
 *   insertable  offered in the block list
 *   label       what authors call it, in the editor's messages ("Tools
 *               moved to 6 of 9"); blocks HAX knows take its name for them
 *   called      how a sentence names it, when not by its label ("the hero":
 *               "The hero stays at the top", "Undid: removed the hero")
 *   starter     the HTML a new one starts with (an item's empty fields)
 *
 * policyOfTag(tag) is the same for a tag, labelOf(el) what authors call it,
 * and phraseOf(el) how a sentence names it.
 *
 * And for the guards: unitOf (the section, item or block a node is in),
 * fieldOf (its text field), boundaryOf (what an edit there must stay
 * inside: a section, an item or another block, a column, or the page),
 * isSingleLine and closedUnitOf (the section or item that takes no blocks).
 *
 *   policyOf(el).kind === "section"
 *   sameBoundary(boundaryOf(range.startContainer), boundaryOf(range.endContainer))
 */
import { COURSE_SITE_TYPE, COURSE_HUB_TYPE } from "../types/course-site.js";

/** Text fields: where the caret goes. */
export const TEXT_FIELDS = "p,h1,h2,h3,h4,h5,h6,li,blockquote,pre,dt,dd,figcaption,td,th,summary";
const TEXT_TAGS = new Set(["p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "dl", "dt", "dd", "blockquote", "pre", "div", "table", "thead", "tbody", "tr", "td", "th"]);
const MEDIA_TAGS = new Set(["img", "video", "audio", "iframe", "picture", "svg", "figure", "media-image", "video-player", "audio-player"]);

const DEFAULTS = {
  section: { limit: 1, accepts: [], flow: "page", fullBleed: true, columns: false, textTarget: false, insertable: true },
  item: { accepts: [], columns: false, textTarget: false, insertable: false, starter: "<h3></h3><p></p>" },
  text: { accepts: [], columns: true, textTarget: true, insertable: true },
  inline: { accepts: [], columns: false, insertable: false },
  layout: { accepts: ["*"], flow: "page", columns: false, textTarget: false, insertable: true },
  media: { accepts: [], columns: true, textTarget: false, insertable: true },
  break: { limit: 1, pin: "first", accepts: [], columns: false, textTarget: false, insertable: false },
  block: { accepts: [], columns: true, insertable: true },
};
const BASE = { kind: "block", limit: null, pin: null, pageTypes: null, accepts: [], flow: null, fields: {}, source: null, attrs: [], fullBleed: false, columns: true, textTarget: undefined, insertable: true, label: null, called: null, starter: "" };

// a section's or item's headings are one line, pasted as plain text
const HEADINGS = Object.fromEntries(["h1", "h2", "h3", "h4", "h5", "h6"].map((h) => [h, { name: "heading", single: true, paste: "line" }]));

/* ---------- the course-site sections, until they declare their own ---------- */

const COURSE = [COURSE_SITE_TYPE];
const HUB = [COURSE_HUB_TYPE];
const FROM_COURSE = { label: "From the course page", kind: "course", section: "details" };
const FROM_PLAN = { label: "From the course plan", kind: "plan", section: "details" };
// written sections hold what the author types (today: paragraphs and lists,
// and the heading in an attribute)
const written = (fields, accepts, more = {}) => ({ kind: "section", pageTypes: COURSE, fields, accepts, attrs: ["heading"], ...more });
// generated ones draw from other pages and hold nothing typed
const generated = (source, more = {}) => ({ kind: "section", pageTypes: COURSE, accepts: [], source, ...more });
const ROWS = ["ul", "ol"];

const TABLE = {
  // HAX's tags
  p: { kind: "text" },
  ul: { kind: "text" },
  ol: { kind: "text" },
  blockquote: { kind: "text" },
  "grid-plate": { kind: "layout" },
  "media-image": { kind: "media" },
  img: { kind: "media" },
  figure: { kind: "media" },
  "page-break": { kind: "break" },
  ...Object.fromEntries(["h1", "h2", "h3", "h4", "h5", "h6"].map((h) => [h, { kind: "text" }])),

  // the course site, in the order a new one has them
  "oer-cs-hero": written({ p: { name: "tagline" } }, ["p"], { pin: "first", attrs: ["image", "alt"], label: "Hero", called: "the hero" }),
  "oer-cs-facts": generated(FROM_COURSE, { label: "Facts" }),
  "oer-cs-learn": written({ li: { name: "outcome", paste: "line" } }, ROWS, { flow: "cards", label: "What you'll learn" }),
  "oer-cs-semester": generated(FROM_PLAN, { label: "The semester", called: "the semester" }),
  "oer-cs-make": generated(FROM_PLAN, { label: "What you'll make" }),
  "oer-cs-books": generated(FROM_COURSE, { label: "Books" }),
  "oer-cs-people": written({ p: { name: "note" } }, ["p"], { label: "Who teaches it" }),
  "oer-cs-tools": written({ li: { name: "tool", paste: "line" } }, ROWS, { flow: "chips", label: "Tools" }),
  "oer-cs-faq": written({ h3: { name: "question", single: true, paste: "line" }, p: { name: "answer" }, li: { name: "answer" } }, ["h2", "h3", "h4", "h5", "h6", "p", ...ROWS], { flow: "stack", label: "Questions" }),
  "oer-cs-closing": generated(FROM_COURSE, { pin: "last", label: "Ready to start" }),
  // OER Courses
  "oer-courses-intro": written({ p: { name: "intro" } }, ["p"], { pageTypes: HUB, pin: "first", label: "Intro", called: "the intro" }),
  "oer-courses-catalog": generated({ label: "From the course sites", kind: "sites", section: null }, { pageTypes: HUB, pin: "last", label: "Catalog", called: "the catalog" }),
};

/* ---------- descriptors ---------- */

const hax = () => globalThis.HaxStore?.requestAvailability?.() ?? null;

// a tag's kind when nothing declares one: HAX says which custom elements are
// inline (a term, a citation); native tags go by what they hold
function kindOf(tag) {
  if (TEXT_TAGS.has(tag)) return "text";
  if (MEDIA_TAGS.has(tag)) return "media";
  if (!tag.includes("-")) return "inline";
  return hax()?.isInlineElement?.(tag) ? "inline" : "block";
}

const cache = new Map();

/** The editor's descriptor for an element (see the top of this file). */
export function policyOf(el) {
  return policyOfTag(el?.localName);
}

/** The descriptor for a tag, as for an element of it. */
export function policyOfTag(tag) {
  if (!tag) return Object.freeze({ ...BASE, kind: null });
  let policy = cache.get(tag);
  if (policy) return policy;
  const cls = globalThis.customElements.get(tag);
  const own = cls?.oerEditor || {};
  const table = TABLE[tag] || {};
  const kind = own.kind || table.kind || kindOf(tag);
  const fields = kind === "section" || kind === "item" ? { ...HEADINGS, ...table.fields, ...own.fields } : { ...table.fields, ...own.fields };
  policy = Object.freeze({ ...BASE, ...DEFAULTS[kind], ...table, ...own, kind, fields });
  // a custom element may be defined (or registered with HAX) later, with its own
  if (!tag.includes("-") || (cls && (table.kind || own.kind || hax()?.elementList?.[tag]))) cache.set(tag, policy);
  return policy;
}

/**
 * What authors call an element (or a tag) in the editor's messages: its
 * policy's label ("Tools"), HAX's name for the block ("Paragraph"), or its
 * tag.
 */
export function labelOf(el) {
  const tag = typeof el === "string" ? el : el?.localName;
  const { label } = policyOfTag(tag);
  if (label || !tag) return label || "";
  return hax()?.haxSchemaFromTag?.(tag)?.gizmo?.title || tag;
}

/**
 * How the editor's sentences name an element (or a tag): a section by its
 * name ("Tools", "the hero"), anything else as a word in the sentence
 * ("paragraph", "outcome"); with a capital to start a sentence (start):
 * "The hero stays at the top", "Undid: duplicated paragraph".
 */
export function phraseOf(el, { start = false } = {}) {
  const tag = typeof el === "string" ? el : el?.localName;
  const { kind, called } = policyOfTag(tag);
  const label = labelOf(tag);
  // (not a name that starts with an abbreviation: "HTML")
  const phrase = called || (kind === "section" || !/^[A-Z][a-z]/.test(label) ? label : label[0].toLowerCase() + label.slice(1));
  return start && phrase ? phrase[0].toUpperCase() + phrase.slice(1) : phrase;
}

/* ---------- where a node is ---------- */

export const elementOf = (node) => (node?.nodeType === 1 ? node : (node?.parentElement ?? null));
const isBody = (el) => el?.localName === "hax-body";
// what a deletion may join across: text and inline formatting
const OPEN = new Set(["text", "inline"]);

/**
 * The unit a node is in: the innermost section or item around it, or else
 * the block it's in (a child of hax-body, or of a column). Null for
 * hax-body itself and for nodes outside it.
 */
export function unitOf(node) {
  for (let el = elementOf(node); el && !isBody(el); el = el.parentElement) {
    const { kind } = policyOf(el);
    if (kind === "section" || kind === "item") return el;
    const parent = el.parentElement;
    if (isBody(parent) || policyOf(parent).kind === "layout") return el;
  }
  return null;
}

/** The text field holding a node (a paragraph, heading, list item…) inside hax-body, or null. */
export function fieldOf(node) {
  const el = elementOf(node)?.closest(TEXT_FIELDS);
  return el && el.closest("hax-body") ? el : null;
}

/**
 * What an edit at node must stay inside, as { host, slot }: the innermost
 * section, item or other block around it ({ host }), the column of a layout
 * ({ host: the grid-plate, slot: "col-2" }), or the page ({ host: hax-body }).
 * Text and inline formatting don't count: two paragraphs of a page share
 * the page. Null outside hax-body.
 */
export function boundaryOf(node) {
  for (let el = elementOf(node); el; el = el.parentElement) {
    if (isBody(el)) return { host: el, slot: null };
    // a block in a column (a callout) is its own boundary, as on the page
    if (!OPEN.has(policyOf(el).kind)) return { host: el, slot: null };
    const parent = el.parentElement;
    if (parent && policyOf(parent).kind === "layout") return { host: parent, slot: el.getAttribute("slot") || "" };
  }
  return null;
}

export const sameBoundary = (a, b) => !!a && !!b && a.host === b.host && a.slot === b.slot;

/**
 * Whether a boundary holds its own content (a section, an item, or a
 * block such as a callout): not the page, and not a column, whose blocks
 * are ordinary content.
 */
export const isContained = (boundary) => !!boundary && !isBody(boundary.host) && boundary.slot === null;

/** A field's descriptor from the section or item it belongs to ({ name, single, paste }), or null for ordinary text. */
export function fieldPolicy(field) {
  const boundary = boundaryOf(field);
  if (!isContained(boundary)) return null;
  return policyOf(boundary.host).fields?.[field.localName] ?? null;
}

/** Whether a field is one line (a heading or title in a section or item): deletions and joins don't cross it. */
export const isSingleLine = (field) => !!fieldPolicy(field)?.single;

/**
 * The innermost section or item around a node that takes only its own
 * fields and items, not blocks, or null: where dropped and pasted files and
 * pictures don't go.
 */
export function closedUnitOf(node) {
  for (let el = elementOf(node); el && !isBody(el); el = el.parentElement) {
    const { kind, accepts } = policyOf(el);
    if ((kind === "section" || kind === "item") && !accepts.includes("*")) return el;
  }
  return null;
}
