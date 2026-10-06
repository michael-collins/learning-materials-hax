/**
 * Best-effort citation parts from a reference written as free text (most
 * imported references are, in whatever style their author used):
 *
 *   McDonough, William; Braungart, Michael (2002). Cradle to Cradle. North Point Press.
 *   Sennett, R, <em>The Craftsman</em>. London, Penguin Books, 2009.
 *   James A. Lawrence and Earl N. Steck, Overview of Management Theory (Carlisle Barracks, PA: U.S. Army War College, 1991)
 *
 * Returns { authors: ["First Last"], year, title, container, url, publisher },
 * container being the journal, magazine or book it appeared in, with
 * blanks for what it can't find; the author checks the form before saving.
 * References added through the Cite dialog carry their parts in data-cite.
 */
const YEAR = /\b(1[5-9]\d\d|20\d\d)\b/;
const PUBLISHER = /\b(Press|Books|Publish\w*|University|College|Institute|Foundation|Society|Media|Inc|Ltd|ACM|IEEE|MIT|Wiley|Penguin|Routledge|Springer|Elsevier|Sage|O'Reilly)\b/;
const LABEL = /^(see|as discussed in|(?:condensed and )?adapted from|source|link|cited in|cf\.)\s*:?\s*/i;
// access dates aren't publication years
const ACCESSED = /\(?\b(retrieved|accessed)( on)?\b[^)]*?\b(1[5-9]\d\d|20\d\d)\b\)?/gi;
const NOT_PUBLISHER = /^(retrieved|accessed|available|url|isbn|doi|pp?\b|vol|page|dir\b)/i;

const clean = (s) => String(s || "").replace(/\s+/g, " ").trim();
const trimPunct = (s) => clean(s).replace(/^[\s,.;:(\[]+|[\s,.;:(\[]+$/g, "");
const looksLikeUrl = (s) => /^(https?:\/\/|www\.)|^[\w-]+(\.[\w-]+)+\/?\S*$/i.test(clean(s));

// trims a name, keeping the period of a final initial ("Papanek, V. J.")
const trimName = (s) => trimPunct(s) + (/\b\p{Lu}\.[\s,;]*$/u.test(s) ? "." : "");

// ECO, UMBERTO → Eco, Umberto
// (two shouted words at least, so acronyms such as "CHI 2009" stay)
const unshout = (s) => (s === s.toUpperCase() && (s.match(/\p{Lu}{2,}/gu) || []).length > 1 ? s.toLowerCase().replace(/(^|[\s'’-])\p{L}/gu, (m) => m.toUpperCase()) : s);

const NAME_WORD = /^(\p{Lu}[\p{L}'’.-]*|de|van|von|der|da|di|la|le)$/u;
function isName(s) {
  const words = clean(s).split(" ").filter(Boolean);
  return words.length >= 1 && words.length <= 5 && words.every((w) => NAME_WORD.test(w)) && /\p{Lu}/u.test(s);
}

/** "Last, First; Last, F and First Last" → ["First Last", "F Last", "First Last"], or null. */
export function splitAuthors(raw) {
  let s = unshout(trimName(raw).replace(/\bet al\.?$/i, "").replace(/^(see|as discussed in|adapted from|cf\.)\s+/i, ""));
  if (!s) return null;
  let parts;
  if (s.includes(";")) parts = s.split(/\s*;\s*/);
  else {
    parts = s.split(/\s*,?\s+(?:and|&)\s+/);
    // "Burke, James, and Robert Ornstein" / "Hummels, C and Frens, J": a
    // comma inside one part inverts that name
  }
  const names = [];
  for (const p of parts.map(trimName).filter(Boolean)) {
    const bits = p.split(/\s*,\s*/).map(trimName);
    if (bits.length === 2 && isName(bits[0]) && isName(bits[1])) names.push(`${bits[1]} ${bits[0]}`);
    else if (bits.length === 1 && isName(p) && p.split(" ").length >= 2) names.push(p);
    else if (bits.length === 1 && isName(p) && names.length && parts.length > 1) names.push(p);
    else return null;
  }
  return names.length ? names : null;
}

function publisherIn(rest) {
  // "New York: Putnam" / "(Carlisle Barracks, PA: U.S. Army War College, 1991)"
  const colon = rest.match(/(?:^|[\s(,.])\p{Lu}[\p{L} .]*:\s*([^,;()\d:]+?)\s*(?:[,;()]|(?<!\b\p{Lu})\.\s|$|\d)/u);
  if (colon && !NOT_PUBLISHER.test(colon[1]) && !looksLikeUrl(colon[1])) return trimPunct(colon[1]);
  const seg = rest
    .split(/,|\.\s|\(|\)/)
    .map(trimPunct)
    .find((p) => p && PUBLISHER.test(p) && !NOT_PUBLISHER.test(p) && !looksLikeUrl(p) && !/\d{3}/.test(p) && p.split(" ").length <= 6);
  return seg || "";
}

// "Published in": what follows an article's title, e.g. ‘Title’, Information
// Systems Journal, 19(4) / “Title” in_Vision and Design_ / Title. The New
// York Times Magazine. October 27
function containerIn(rest, publisher) {
  let r = rest.replace(/_/g, " ").replace(/^[\s’”"»'.,;:]+/, "");
  if (/^[(\[\d]/.test(r)) return "";
  // "in Smith, T, French Gardening" / "in Louis Hébert (dir.), Signo"
  r = r.replace(/^in\b\s*/i, "").replace(/^[^,()]+\((?:dir|eds?)\.?\)\s*,\s*/i, "");
  const editor = r.match(/^([^,]+,\s*\p{Lu}\.?)\s*,\s*(.+)$/u);
  if (editor && splitAuthors(editor[1])) r = editor[2];
  const seg = trimPunct(r.split(/,\s|(?<!\b\p{Lu})\.\s|\(|\[/u)[0])
    .replace(/\s*\b(vol\.?\s*)?\d+\s*\(\d+\)$/i, "")
    .trim();
  if (!seg || seg.length > 120 || !/^\p{Lu}/u.test(seg) || NOT_PUBLISHER.test(seg) || /dissertation|thesis/i.test(seg)) return "";
  if (seg.includes(":") || looksLikeUrl(seg) || seg === publisher || seg.split(" ").length < 2) return "";
  return unshout(seg);
}

export function parseReference(li) {
  const empty = { authors: [], year: "", title: "", container: "", url: "", publisher: "" };
  if (!li) return empty;
  if (li.dataset?.cite) {
    try {
      return { ...empty, ...JSON.parse(li.dataset.cite) };
    } catch {
      /* fall through to the text */
    }
  }
  const copy = li.cloneNode(true);
  copy.querySelectorAll("a.fn-back, a[href^='#']").forEach((b) => b.remove());
  const text = clean(copy.textContent).replace(/\s*↩\s*/g, " ").trim().replace(LABEL, "");
  const link = [...copy.querySelectorAll("a[href^='http']")].find((a) => !/wikipedia\.org\/wiki\/(International_Standard_Book_Number|Special:BookSources)/.test(a.href));
  const url = link?.getAttribute("href") || "";
  const linkText = clean(link?.textContent);
  const dated = text.replace(/\S*(https?:|www\.)\S*/g, "").replace(ACCESSED, "");
  const year = (dated.match(new RegExp(`\\((?:[^)]*?)${YEAR.source}\\)`)) ||
    dated.match(YEAR) || [])[1] || "";

  // the title: italics or quotes (whichever comes first: a quoted article
  // before its italic journal is the work cited), then a link with words,
  // then by position
  const italic = clean(copy.querySelector("em, i, cite")?.textContent);
  const quoted = clean((text.replace(/\([^)]*\)/g, (m) => " ".repeat(m.length)).match(/[‘“"«]\s*([^’”"»]{3,}?)\s*[’”"»]/) || [])[1]);
  let title = italic && quoted ? (text.indexOf(quoted) < text.indexOf(italic) ? quoted : italic) : italic || quoted;
  // an italic title is the book or journal itself; a quoted one is a part
  // of something, and an italic after it is what it's part of
  const isPart = !!title && title !== italic;
  let container = isPart && italic && text.indexOf(italic) > text.indexOf(title) ? italic.replace(/\s*\d+\s*\(\d+\)$/, "") : "";
  if (!title && linkText && !looksLikeUrl(linkText)) title = linkText;
  let authors = null;
  let rest = text;
  const at = title ? text.indexOf(title) : -1;
  if (at > 0) {
    authors = splitAuthors(text.slice(0, at).replace(/\(\s*\d{4}[a-z]?\s*\)/, "").replace(/[‘“"]\s*$/, ""));
    rest = text.slice(at + title.length);
  } else if (at === 0) {
    rest = text.slice(title.length);
  } else {
    const firstSentence = (s) => trimPunct(s.split(/(?<!\b\p{Lu})\.\s+|\s*\[/u)[0]);
    // APA: "Papanek, V. J. (1984). Design for the real world…"
    const apa = text.match(/^(.+?)\s*\(\s*\d{4}[a-z]?\s*\)[.,]?\s*(.+)$/);
    // "Jefferson, T. Letter to…" (initials end in a period, not the sentence)
    const initials = text.match(/^(\p{Lu}[\p{L}'’-]+,(?:\s?\p{Lu}\.)+)\s+(.+)$/u);
    // "Benkler, Y, Coase’s Penguin…" / "Hogue, David M., Interaction…"
    const inverted = text.match(/^([^,]+,\s*[^,]+?),\s*(.+)$/);
    // "Bernays, Edward. Propaganda. 1928" (inverted first author, then a sentence)
    const sentences = text.split(/(?<!\b\p{Lu})\.\s+/u);
    const comma = text.match(/^([^,.]+(?:\.\s?\p{Lu}\.?[^,.]*)*?),\s*(.+)$/u);
    let m;
    if ((m = apa || initials) && (authors = splitAuthors(m[1]))) {
      title = firstSentence(m[2]);
      rest = m[2].slice(title.length);
    } else if (sentences.length > 1 && sentences[0].includes(",") && (authors = splitAuthors(sentences[0]))) {
      title = trimPunct(sentences[1].split(/\s*\[|\s+\d{4}/)[0]);
      rest = sentences.slice(2).join(". ");
    } else if (inverted && inverted[1].includes(",") && (authors = splitAuthors(inverted[1]))) {
      title = firstSentence(inverted[2]);
      rest = inverted[2].slice(title.length);
    } else if (comma && (authors = splitAuthors(comma[1]))) {
      // "Richard Paul and Linda Elder, The Miniature Guide…, Foundation…, 2008"
      const after = comma[2];
      title = trimPunct(after.split(/\s*\(|,\s|\.\s/)[0]);
      rest = after.slice(after.indexOf(title) + title.length);
    } else {
      title = trimPunct(text.split(/\.\s/)[0]);
      rest = text.slice(title.length);
    }
  }
  // an unclosed parenthesis is an edition note cut short: "(2nd, rev"
  title = unshout(trimPunct(title.replace(/\s*\([^)]*$/, "")));
  if (looksLikeUrl(title)) title = "";
  if (title.length > 200) title = `${title.slice(0, 197)}…`;
  const plain = rest.replace(/\S*(https?:|www\.)\S*/g, "");
  const publisher = publisherIn(plain);
  // only when the title was found for sure (quoted, or after its authors)
  if (!container && title && title !== italic && (isPart || authors)) container = containerIn(plain, publisher);
  return { authors: authors || [], year, title: title || (looksLikeUrl(linkText) ? "" : linkText), container, url, publisher };
}
