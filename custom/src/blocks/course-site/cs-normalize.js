/**
 * A course site section's legacy markup, upgraded to the section model
 * (nu-hax docs/editor-redesign/spec.md §5.1, §5.9): pure DOM conversions,
 * with nothing of HAX or the editor in them. A section runs them on itself
 * as editing begins (SiteSection.upgrade()); readers still read the old
 * markup with listItems() and questions() (cs-shared.js).
 *
 * - headingFromAttribute: the heading attribute becomes the section's own
 *   heading element (<h2>, or <h1> for the hub's intro).
 * - ensureHeading: the heading first, or an empty one to type into when
 *   there's none (an item's title too).
 * - rowsToItems: each row of the section's lists becomes an item (a row's
 *   own sub-list, the rows after it). An outcome's title is the row's bold
 *   start, or its words before a colon or a dash, and its sentence the rest
 *   (as listItems() reads it); a tool is the whole row. Links and emphasis
 *   are kept; paragraphs in a row are unwrapped to its words.
 * - runsToQuestions: each question (a heading, or a paragraph ending with
 *   "?") and the blocks after it, up to the next, become a question item.
 * - questionsToItems: the questions section's own upgrade (questions
 *   written as h2s first become h3s); faqHeading says which h2 is its
 *   heading.
 * - retag: an element as another tag (a heading of another level).
 * Each returns whether it changed anything, retag the new element.
 * ITEMS_FROM says which a section of items runs (the sections run it as
 * editing begins, and nu-hax scripts/course-site-structure.mjs on saved
 * pages).
 *
 *   <oer-cs-learn heading="Skills"><ul><li><b>Cut</b>: plan parts.</li></ul></oer-cs-learn>
 *   → <oer-cs-learn><h2>Skills</h2><oer-cs-outcome><h3>Cut</h3><p>Plan parts.</p></oer-cs-outcome></oer-cs-learn>
 */

const make = (parent, tag) => parent.ownerDocument.createElement(tag);

/**
 * The section's heading attribute as its heading element: filling heading
 * (the section's own, as it reads it, or null) if that's empty, or else a
 * new one first.
 */
export function headingFromAttribute(section, tag = "h2", heading = null) {
  const text = section.getAttribute("heading");
  if (text === null) return false;
  section.removeAttribute("heading");
  if (!text.trim()) return true;
  if (heading) {
    if (!heading.textContent.trim()) heading.textContent = text.trim();
  } else {
    const made = make(section, tag);
    made.textContent = text.trim();
    section.prepend(made);
  }
  return true;
}

/**
 * The heading first in the section (heading: its own, as it reads it, or
 * null), where it's drawn and where the keys go first; or, with none, an
 * empty one to type into.
 */
export function ensureHeading(section, tag = "h2", heading = null) {
  if (heading && section.firstElementChild === heading) return false;
  section.prepend(heading || make(section, tag));
  return true;
}

/** An element as another tag, in its place, with its contents. Returns the new element. */
export function retag(el, tag) {
  const made = make(el, tag);
  made.append(...el.childNodes);
  el.replaceWith(made);
  return made;
}

/* ---------- list rows ---------- */

// where a row's title ends: a colon or a dash between words
const SEPARATOR = /\s*[:–—]\s+|\s+-\s+/;

// copies of nodes, into a fragment
function copies(doc, nodes) {
  const out = doc.createDocumentFragment();
  for (const n of nodes) out.append(typeof n === "string" ? n : n.cloneNode(true));
  return out;
}

// a fragment without white space (or what pattern matches) at its start, or at its end
function trimEdge(fragment, end = false, pattern = end ? /\s+$/ : /^\s+/) {
  const walk = fragment.ownerDocument.createTreeWalker(fragment, NodeFilter.SHOW_TEXT);
  const texts = [];
  for (let n = walk.nextNode(); n; n = walk.nextNode()) texts.push(n);
  for (const n of end ? texts.reverse() : texts) {
    n.data = n.data.replace(pattern, "");
    if (n.data) break;
  }
}

/**
 * A row of a list as an outcome's title and sentence (fragments): its bold
 * start, or its words before the first colon or dash in its own text; or
 * the whole row as the title.
 */
export function splitRow(li) {
  const doc = li.ownerDocument;
  const nodes = [...li.childNodes];
  const lead = li.firstElementChild;
  let title;
  let text;
  if (lead && /^(strong|b)$/.test(lead.localName) && lead.textContent.trim() && li.textContent.trim().startsWith(lead.textContent.trim())) {
    title = copies(doc, [lead.textContent.trim().replace(/[:–—-]\s*$/, "")]);
    text = copies(doc, nodes.slice(nodes.indexOf(lead) + 1));
    trimEdge(text, false, /^\s*[:–—-]?\s*/);
  } else {
    const at = nodes.findIndex((n) => n.nodeType === 3 && SEPARATOR.test(n.data));
    const match = at < 0 ? null : nodes[at].data.match(SEPARATOR);
    // (not a dash the row starts with)
    if (!match || (at === 0 && !nodes[0].data.slice(0, match.index).trim())) {
      title = copies(doc, nodes);
      text = doc.createDocumentFragment();
    } else {
      const n = nodes[at];
      title = copies(doc, [...nodes.slice(0, at), n.data.slice(0, match.index)]);
      text = copies(doc, [n.data.slice(match.index + match[0].length), ...nodes.slice(at + 1)]);
    }
  }
  for (const f of [title, text]) {
    trimEdge(f);
    trimEdge(f, true);
  }
  // a sentence starts with a capital, as listItems() shows it
  const first = doc.createTreeWalker(text, NodeFilter.SHOW_TEXT).nextNode();
  if (first) first.data = first.data.charAt(0).toUpperCase() + first.data.slice(1);
  return { title, text };
}

const isList = (el) => el.localName === "ul" || el.localName === "ol";

// the blocks a row can hold its words in (a paragraph, as some editors
// write every row), which an item's one-line field can't hold
const ROW_BLOCKS = "p, div, h1, h2, h3, h4, h5, h6, blockquote, pre, figure, figcaption, address, section, article, header, footer";

// a row's words out of the blocks they're in, a space between each
// block's: an item's field holds a line, never a block
function unwrapBlocks(row) {
  const blocks = [...row.querySelectorAll(ROW_BLOCKS)];
  if (!blocks.length) return;
  // (the innermost first)
  for (const block of blocks.reverse()) block.replaceWith(" ", ...block.childNodes, " ");
  row.normalize();
  const walk = row.ownerDocument.createTreeWalker(row, NodeFilter.SHOW_TEXT);
  for (let n = walk.nextNode(); n; n = walk.nextNode()) n.data = n.data.replace(/\s{2,}/g, " ");
}

// a list's rows, each without its own sub-lists (and its words out of any
// blocks), whose rows follow it (a row holding only a sub-list gives just
// those)
function rowsOf(list) {
  return [...list.children]
    .filter((li) => li.localName === "li")
    .flatMap((li) => {
      const subs = [...li.children].filter(isList);
      const row = li.cloneNode(true);
      for (const sub of [...row.children]) if (isList(sub)) sub.remove();
      unwrapBlocks(row);
      const empty = !row.textContent.trim() && !row.querySelector("img, video, audio, iframe");
      return [...(subs.length && empty ? [] : [row]), ...subs.flatMap(rowsOf)];
    });
}

/** The rows of a section's own lists, in order, as copies: a row's sub-list's rows after it (as listItems() reads them too). */
export const listRows = (section) => [...section.children].filter(isList).flatMap(rowsOf);

/**
 * Each row of the section's own lists (ul, ol) as an item of tag, in the
 * list's place: as an outcome (a title and a sentence) or, with whole, the
 * row in one paragraph (a tool). A row's sub-list gives items of its own,
 * after it (Tab made one in a row). An empty row is an empty item.
 */
export function rowsToItems(section, tag, { whole = false } = {}) {
  const lists = [...section.children].filter(isList);
  for (const list of lists) {
    const items = rowsOf(list)
      .map((li) => {
        const item = make(section, tag);
        if (whole) {
          const p = make(section, "p");
          p.append(copies(li.ownerDocument, li.childNodes));
          trimEdge(p);
          trimEdge(p, true);
          item.append(p);
          return item;
        }
        const { title, text } = splitRow(li);
        const h3 = make(section, "h3");
        const p = make(section, "p");
        h3.append(title);
        p.append(text);
        item.append(h3, p);
        return item;
      });
    list.replaceWith(...items);
  }
  return lists.length > 0;
}

/* ---------- questions ---------- */

const hasText = (el) => !!el.textContent.trim() || !!el.querySelector("img, video, audio, iframe");

/**
 * Questions and their answers as question items of tag: each heading (or,
 * with none, each paragraph ending with "?") starts one, and the blocks
 * after it are its answer: those with text, or else its first, to type
 * into. An empty heading starts one only before any question has words
 * (an empty question, as a new section's): after one, readers read past
 * it, so it's an empty block in that answer. Empty blocks before the first
 * question go; anything else there stays (readers never saw it). The
 * section's own heading (heading) isn't a question.
 *
 *   <h3></h3><p></p>               → <oer-cs-question><h3></h3><p></p></oer-cs-question>
 *   <h3>Why?</h3><p></p><p>So.</p> → <oer-cs-question><h3>Why?</h3><p>So.</p></oer-cs-question>
 */
export function runsToQuestions(section, tag, { heading = null } = {}) {
  const blocks = [...section.children].filter((c) => c !== heading && c.localName !== "page-break" && !c.localName.includes("-"));
  const headed = blocks.some((b) => /^h[2-6]$/.test(b.localName));
  let asked = false;
  const isQuestion = (b) => (headed ? /^h[2-6]$/.test(b.localName) && (hasText(b) || !asked) : b.localName === "p" && /\?\s*$/.test(b.textContent));
  let item = null;
  let changed = false;
  for (const b of blocks) {
    if (isQuestion(b)) {
      asked ||= hasText(b);
      item = make(section, tag);
      const h3 = make(section, "h3");
      h3.append(...b.childNodes);
      item.append(h3);
      b.replaceWith(item);
      changed = true;
    } else if (item) {
      // (an empty block in an answer is left out, unless it's all there is)
      if (hasText(b)) {
        if (item.children.length > 1 && !hasText(item.lastElementChild)) item.lastElementChild.remove();
        item.append(b);
      } else if (item.children.length === 1) item.append(b);
      else b.remove();
    } else if (!hasText(b)) {
      b.remove();
      changed = true;
    }
  }
  return changed;
}

/**
 * The questions section's heading: its first h2, except in questions
 * written before it had a heading of its own (a heading attribute then),
 * when each h2 was a question: with a heading attribute, with more than
 * one h2, or with one asking something, an answer after it and no other
 * headings. Once it holds question items, its h2 is its heading, and an
 * h2 with nothing after it is one too ("Got questions?" over questions
 * left empty, which aren't saved).
 */
export function faqHeading(section) {
  const kids = [...section.children];
  const h2s = kids.filter((c) => c.localName === "h2");
  if (!h2s.length) return null;
  if (kids.some((c) => c.localName === "oer-cs-question")) return h2s[0];
  if (section.hasAttribute("heading") || h2s.length > 1) return null;
  const lower = kids.some((c) => /^h[3-6]$/.test(c.localName));
  const answered = kids.some((c) => c !== h2s[0] && c.localName !== "page-break" && !c.localName.includes("-") && hasText(c));
  return !lower && answered && /\?\s*$/.test(h2s[0].textContent) ? null : h2s[0];
}

/**
 * A questions section's questions and answers as question items of tag,
 * questions written as h2s (before it had a heading of its own) as h3s
 * first, under the heading from its attribute (headingFromAttribute, after).
 */
export function questionsToItems(section, tag) {
  const heading = faqHeading(section);
  const old = heading ? [] : [...section.children].filter((c) => c.localName === "h2");
  for (const h2 of old) retag(h2, "h3");
  return runsToQuestions(section, tag, { heading }) || old.length > 0;
}

/* ---------- each section ---------- */

/**
 * How each section of items makes them from what was written before it had
 * them: What you'll learn's list rows become outcomes, the tools' rows tools
 * (each row whole), and the questions' runs questions.
 */
export const ITEMS_FROM = {
  "oer-cs-learn": (section) => rowsToItems(section, "oer-cs-outcome"),
  "oer-cs-tools": (section) => rowsToItems(section, "oer-cs-tool", { whole: true }),
  "oer-cs-faq": (section) => questionsToItems(section, "oer-cs-question"),
};
