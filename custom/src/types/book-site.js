/**
 * Book sites: a book on its own, at a short address (/book/dmd-100), to
 * send to readers without the rest of the OER site: its chapters to move
 * through, the page set in the reader's own type (Reader mode's Text
 * settings), and PDF and EPUB downloads. blocks/oer-book-site.js draws it;
 * the theme shows it full page. A book's site is switched on and off from
 * the Book site card on the book's page; off unpublishes it.
 */
import { saveOutline, newItemId, flatten } from "../outline/outline-model.js";

export const BOOK_SITE_TYPE = "oer:book-site";
const BOOK_TYPE = "oer:book";
const HEADING_TYPE = "oer:heading";

/** The type's definition, as the site's content types hold it. */
export const BOOK_SITE_DEF = {
  id: BOOK_SITE_TYPE,
  label: "Book site",
  icon: "oer:book-a",
  description: "A book on its own, at a short address, for readers: its chapters, reading settings, and PDF and EPUB downloads.",
  children: [],
  nav: false,
  fields: [{ name: "book", label: "Book", kind: "relation", types: [BOOK_TYPE], header: true, required: true, help: "The book this site shows." }],
};

const refIds = (v) => (Array.isArray(v) ? v : v ? [v] : []).map((r) => (typeof r === "string" ? r : r?.page)).filter(Boolean);
const isSnap = (i) => !!i?.metadata?.oerSnapshotOf;
const slugify = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** A book's short name: its title before a colon ("DMD 100: …" → "dmd-100"), else its title. */
export const bookShortName = (book) => slugify(String(book?.title || "book").split(":")[0]) || "book";

/** The address a book's site gets: /book/<short name>. */
export const bookSiteSlug = (book) => `book/${bookShortName(book)}`;

/** A book's site, if it has one. */
export function siteForBook(book, items) {
  return (items || []).find((i) => i.metadata?.pageType === BOOK_SITE_TYPE && !isSnap(i) && refIds(i.metadata?.oerFields?.book).includes(book?.id)) || null;
}

/** The book a book site shows. */
export function bookOfSite(site, items) {
  const id = refIds(site?.metadata?.oerFields?.book)[0];
  return (items || []).find((i) => i.id === id) || null;
}

/**
 * A book's chapters readers can see, in reading order: [{ item, depth, rel,
 * heading }] (rel: its address inside the book; heading: a label that
 * groups the chapters after it, with no page of its own to read).
 */
export function bookOutline(book, items) {
  if (!book) return [];
  const visible = (items || []).filter((i) => !isSnap(i) && i.metadata?.published !== false && i.metadata?.pageType !== "oer:system");
  return flatten(visible, book.id).map(({ item, depth }) => ({
    item,
    depth,
    heading: item.metadata?.pageType === HEADING_TYPE,
    rel: String(item.slug || "").startsWith(`${book.slug}/`) ? item.slug.slice(book.slug.length + 1) : item.id,
  }));
}

export const bookSiteIsOn = (site) => !!site && site.metadata?.published !== false;

/**
 * Turn a book's site on or off. The first time on makes it at
 * /book/<short name>, out of the navigation, without leaving the book's
 * page; after that on and off publish and unpublish it. Resolves once saved.
 */
export async function setBookSite(book, on, items) {
  const site = siteForBook(book, items);
  if (site) {
    if (bookSiteIsOn(site) === !!on) return true;
    return saveOutline([{ ...site, metadata: { ...(site.metadata || {}), published: !!on, overridePathauto: true }, modified: true }]);
  }
  if (!on) return true;
  return saveOutline([
    {
      id: newItemId(),
      title: book.title,
      parent: null,
      indent: 0,
      order: items.filter((i) => !i.parent).length,
      slug: bookSiteSlug(book),
      location: "",
      description: "",
      metadata: { pageType: BOOK_SITE_TYPE, published: true, hideInMenu: true, overridePathauto: true, oerFields: { book: [{ page: book.id, version: "" }] } },
      contents: "<p></p>",
      new: true,
    },
  ]);
}
