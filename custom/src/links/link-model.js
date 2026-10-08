/**
 * Links in the site's content, and in content coming in (a Canvas import):
 * - which point at a previous home of the site's material (the old course
 *   books on dmd-program.github.io, the old Decap site's addresses) and
 *   which page here they mean
 * - which are links to this site that go nowhere
 * - rewriting them: to the page here, a new address, or plain text
 * Whether an outside page still answers is checked by the local helper
 * (nu-hax/scripts/lib/link-check.mjs): a browser can't ask other sites.
 * Plain functions with no browser or HAX dependencies.
 *
 *   const index = addressIndex(siteItems);
 *   const info = analyseLink(url, index, { hint: "dmd400" });
 *   // → { url, kind: "old" | "broken" | "external" | "site", site, candidates, match, fix }
 */

/** Previous homes of the site's material: links to them are matched to pages here. */
export const OLD_SITES = ["https://dmd-program.github.io/"];

// the page types a link can mean (not sections, system pages or sequences)
const NOT_TARGETS = new Set(["oer:system", "oer:heading", "oer:section", "oer:sequence", "oer:rubric"]);
const STOP = new Set("a an and the of to for in on at by with your you is are be this that it as or from into about html htm md index readme page".split(" "));
const CODE = /\b([a-z]{2,5})[-_ ]?(\d{3})(?![\d])/gi;

/** A course code in an address or title: "dmd-400-master" → "dmd400". */
export function courseCode(s) {
  const m = String(s || "").toLowerCase().match(/\b([a-z]{2,5})[-_ ]?(\d{3})(?!\d)/);
  return m ? `${m[1]}${m[2]}` : "";
}

/** Words of an address or title: lower case, course codes joined, plural s off. */
export function tokens(s) {
  return String(s || "")
    .toLowerCase()
    .replace(CODE, "$1$2")
    .replace(/\.(html?|md|php|aspx?)\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((w) => w && !STOP.has(w))
    .map((w) => (w.length > 3 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w));
}

/** How alike two word lists are (0–1): half overlap of the union, half of the shorter. */
export function alike(a, b) {
  const A = new Set(a);
  const B = new Set(b);
  if (!A.size || !B.size) return 0;
  const both = [...A].filter((w) => B.has(w)).length;
  const contain = Math.min(A.size, B.size) >= 2 ? both / Math.min(A.size, B.size) : both / Math.max(A.size, B.size);
  return 0.5 * (both / new Set([...A, ...B]).size) + 0.5 * contain;
}

const decode = (s) => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};
const lastPart = (p) => String(p || "").split("/").filter(Boolean).pop() || "";

/** An address's parts: { absolute, host, origin, segments, hash }. */
export function parseAddress(url) {
  const raw = String(url || "").trim();
  if (/^https?:\/\//i.test(raw)) {
    try {
      const u = new URL(raw);
      return { absolute: true, host: u.hostname.toLowerCase(), origin: u.origin, segments: u.pathname.split("/").filter(Boolean).map(decode), hash: u.hash };
    } catch {
      return { absolute: true, host: "", origin: "", segments: [], hash: "" };
    }
  }
  const [path, hash = ""] = raw.split("#");
  return { absolute: false, host: "", origin: "", segments: path.replace(/[?].*$/, "").split("/").filter((s) => s && s !== ".").map(decode), hash: hash ? `#${hash}` : "" };
}

/**
 * The site's pages as link targets. → { slugs (every address here), pages:
 * [{ page, slug, source, sourceTail, code, words }], domain }
 * A page imported from the Decap site keeps its old address in
 * metadata.oerSource ("projects/dmd400-capstone-project-proposal"); the old
 * course books named pages the same way without the course code
 * (dmd-400-master/capstone-project-proposal.html).
 */
export function addressIndex(items = [], { domain = "" } = {}) {
  const slugs = new Set(items.map((i) => i.slug).filter(Boolean));
  const pages = items
    .filter((i) => i.slug && !i.metadata?.oerSnapshotOf && !i.metadata?.oerRef && !NOT_TARGETS.has(i.metadata?.pageType))
    .map((page) => {
      const source = typeof page.metadata?.oerSource === "string" ? page.metadata.oerSource.replace(/^\/|\/$/g, "") : "";
      return {
        page,
        slug: page.slug,
        source,
        sourceTail: lastPart(source).toLowerCase(),
        type: page.metadata?.pageType || "",
        code: courseCode(source) || courseCode(page.slug) || "",
        words: { source: tokens(lastPart(source)), slug: tokens(lastPart(page.slug)), title: tokens(page.title) },
      };
    });
  return { slugs, pages, domain: String(domain || "").replace(/\/$/, "") };
}

const candidate = (p, score, why) => ({ id: p.page.id, title: p.page.title, slug: p.slug, type: p.type, score: Math.round(Math.min(1, score) * 100) / 100, why });

/**
 * Pages here an address could mean, best first: [{ id, title, slug, type,
 * score, why }]. hint: the course code of the page the link is on (for
 * links relative to an old site).
 */
export function matchAddress(url, index, { hint = "" } = {}) {
  const a = parseAddress(url);
  let segs = a.segments;
  let code = hint;
  // a GitHub Pages project site: the first part is the repository
  // (dmd-400-master), which names the course or nothing
  if (a.host.endsWith(".github.io") && segs.length) {
    code = courseCode(segs[0]);
    segs = segs.slice(1);
  } else if (a.absolute) code = "";
  // a file (a PDF, an image) isn't a page
  if (/\.(?!html?$|md$|php$|aspx?$)[a-z0-9]{2,5}$/i.test(segs[segs.length - 1] || "")) return [];
  segs = segs.map((s) => s.replace(/\.(html?|md|php|aspx?)$/i, "").replace(/_/g, "-").toLowerCase()).filter((s) => s && !["index", "readme"].includes(s));
  const path = segs.join("/");
  const out = [];
  for (const p of index.pages) {
    if (code && p.code && p.code !== code) continue; // another course's page
    let score = 0;
    let why = "";
    if (path && p.source && path === p.source.toLowerCase()) [score, why] = [1, `its address on the old site was /${p.source}`];
    else if (path && p.sourceTail) {
      // the old course book's address: the course code, then the page's path
      for (let k = 0; k < segs.length && !score; k++) {
        if ([code, ...segs.slice(k)].filter(Boolean).join("-") === p.sourceTail) [score, why] = [1 - k * 0.01, "it's the same page as in the old course book"];
      }
    }
    if (!score && path) {
      const w = tokens([p.code ? code : "", ...segs].join(" "));
      const s = Math.max(alike(w, p.words.source), alike(w, p.words.slug));
      const t = alike(tokens(segs.join(" ")), p.words.title);
      const best = Math.max(s, t * 0.95);
      if (best >= 0.6) [score, why] = [best, s >= t * 0.95 ? `its address is like this page's` : `its address is like this page's title`];
    }
    // the root of an old course book: the course's book here, or its course page
    if (!path && code && p.code === code && (p.type === "oer:book" || p.type === "oer:course")) [score, why] = [p.type === "oer:book" ? 0.97 : 0.9, `the old ${p.type === "oer:book" ? "course book" : "course site"} for ${code.toUpperCase().replace(/(\d)/, " $1")}`];
    if (score >= 0.6) out.push(candidate(p, score, why));
  }
  return out.sort((x, y) => y.score - x.score).slice(0, 5);
}

/** An address that's written wrong, made right: "notion.so" → "https://notion.so". */
export function fixAddress(url) {
  const u = decode(String(url || "").trim());
  const md = u.match(/^\[(https?:\/\/[^\]\s]+)\]\((https?:\/\/[^)\s]+)\)$/);
  if (md) return md[2];
  if (/^(www\.)?[a-z0-9-]+(\.[a-z0-9-]+)*\.(com|org|net|edu|gov|io|so|co|app|dev|me|ai|us|uk|ca)(\/\S*)?$/i.test(u)) return `https://${u}`;
  return "";
}

/** Whether an address is on one of the old sites. */
export function isOldSite(url, oldSites = OLD_SITES) {
  const u = String(url || "").toLowerCase();
  return oldSites.some((s) => u.startsWith(String(s).toLowerCase()) || u.replace(/^http:/, "https:").startsWith(String(s).toLowerCase()));
}

/** The address of a page here as content links to it (site-relative). */
export const siteHref = (slug) => String(slug || "");

/**
 * What a link is. → { url, kind, site, candidates, match, fix } or null for
 * links there's nothing to know about (in-page anchors, mail, the import's
 * own placeholders):
 * - site: a page or file here
 * - broken: a link to this site that goes nowhere (an old Decap address, a
 *   course book's relative link, a typo); candidates are pages it may mean
 * - old: an address on an old site; candidates are pages here it may mean
 * - external: anywhere else (checked for dead links by the helper)
 * match is the best candidate when it's clear enough to use without asking.
 */
export function analyseLink(url, index, { hint = "", tag = "a", oldSites = OLD_SITES } = {}) {
  const raw = String(url || "").trim();
  if (!raw || /^(#|mailto:|tel:|javascript:|data:|blob:|canvas-(file|page|object|course):)/i.test(raw)) return null;
  const a = parseAddress(raw);
  let kind;
  let site = "";
  if (a.absolute) {
    const own = index.domain && raw.toLowerCase().startsWith(index.domain.toLowerCase());
    if (own) {
      const path = raw.slice(index.domain.length).replace(/^\//, "").replace(/[?#].*$/, "").replace(/\/$/, "");
      kind = !path || index.slugs.has(decode(path)) || /^(files|pages|assets)\//.test(path) ? "site" : "broken";
    } else if (isOldSite(raw, oldSites)) {
      kind = "old";
      site = `${a.host}${a.host.endsWith(".github.io") && a.segments[0] ? `/${a.segments[0]}` : ""}`;
    } else kind = "external";
  } else {
    const path = a.segments.join("/");
    kind = !path || index.slugs.has(path) || /^(files|pages|assets|custom|build)\//.test(path) || /^(x|login|logout)$/.test(path) ? "site" : "broken";
  }
  if (kind === "site") return { url: raw, kind, site, candidates: [], match: null, fix: "" };
  if (kind === "external") return { url: raw, kind, site: a.host, candidates: [], match: null, fix: "" };
  const fix = kind === "broken" ? fixAddress(raw) : "";
  const candidates = fix || ["img", "source", "video-player"].includes(tag) ? [] : matchAddress(raw, index, { hint });
  const [best, next] = candidates;
  // used without asking: an exact match, or a close one well ahead of the next
  const clear = best && (best.score >= 0.97 || (best.score >= 0.85 && (!next || best.score - next.score >= 0.08)));
  return { url: raw, kind, site: site || (kind === "broken" ? "Links to this site" : a.host), candidates, match: clear ? best : null, fix };
}

/** The links in an HTML fragment: [{ url, tag }] (each address once). */
export function linksIn(html) {
  const out = [];
  const seen = new Set();
  for (const m of String(html || "").matchAll(/<(a|iframe|oer-iframe|img|video-player|source)\b[^>]*?\s(href|src|source)="([^"]*)"/gi)) {
    const url = decodeEntities(m[3]).trim();
    if (!url || seen.has(url)) continue;
    seen.add(url);
    out.push({ url, tag: m[1].toLowerCase() });
  }
  return out;
}

function decodeEntities(s) {
  return String(s)
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}
const escAttr = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/**
 * Rewrite links in HTML. to(url) → a new address, null for plain text (the
 * link goes, its text stays), or undefined to leave it. Links (a href) and
 * embeds (src) are both rewritten; an embed or image with no address left
 * is removed.
 */
export function rewriteLinks(html, to) {
  let out = String(html || "");
  out = out.replace(/<a\b([^>]*?)\shref="([^"]*)"([^>]*)>([\s\S]*?)<\/a>/gi, (m, pre, href, post, text) => {
    const next = to(decodeEntities(href).trim());
    if (next === undefined) return m;
    if (next === null) return text;
    return `<a${pre} href="${escAttr(next)}"${post}>${text}</a>`;
  });
  out = out.replace(/<(iframe|oer-iframe|img|video-player|source)\b([^>]*?)\s(src|source)="([^"]*)"([^>]*)>/gi, (m, tag, pre, attr, src, post) => {
    const next = to(decodeEntities(src).trim());
    if (next === undefined) return m;
    if (next === null) return "";
    return `<${tag}${pre} ${attr}="${escAttr(next)}"${post}>`;
  });
  return out;
}

/**
 * Where a reviewed link goes: { action: "page" | "replace" | "unlink" |
 * "keep", match, to }. → the new address, null (plain text) or undefined.
 */
export function linkTarget(link) {
  if (!link) return undefined;
  if (link.action === "page" && link.match?.slug) return siteHref(link.match.slug);
  if (link.action === "replace" && link.to) return link.to;
  if (link.action === "unlink") return null;
  return undefined;
}

/**
 * A link ready for review: what was found, and the choice it starts with
 * (`auto`: a page here matched it without asking).
 */
export function reviewable(info) {
  return { ...info, auto: !!info.match, action: info.match ? "page" : info.fix ? "replace" : "keep", to: info.fix || "", via: info.fix ? "fix" : "" };
}
