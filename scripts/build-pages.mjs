// Build the published site for a static host (GitHub Pages): a read-only
// copy with no editing, the published pages only, and HAX's code included.
//   node scripts/build-pages.mjs <out-dir> [--domain https://user.github.io/repo/] [--hax-build <dir>] [--keep-drafts]
//
// 1. The site is copied without what only editing needs: git, node_modules,
//    the theme's source (its build stays), the PHP and dev-server files and
//    these scripts.
// 2. Drafts come out: every page that is unpublished, or under an
//    unpublished page (archived versions included), leaves site.json and its
//    page folder is deleted. HAX's search index, sitemap and feeds list them
//    too, so their entries go. The system page (content types) stays: the
//    theme reads it.
// 3. HAX's code goes in build/: the site's build/ is a link hax serve fills,
//    so the files come from an installed @haxtheweb/haxcms-nodejs (its
//    dist/public/build), the version the theme was made for, not HAX's CDN,
//    which serves whatever HAX releases next. --hax-build points at that
//    folder (the publish workflow downloads 26.8.1's).
// 4. Each published page gets <slug>/index.html with its title,
//    description, canonical link and citation tags in real HTML (crawlers
//    that don't run JavaScript, such as Google Scholar, read them); the app
//    still loads and routes to the page. --domain makes the links absolute.
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, rmSync, lstatSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const SITE_DIR = path.resolve(new URL("..", import.meta.url).pathname);
const args = process.argv.slice(2);
const opt = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : "");
const OUT = path.resolve(args.find((a, i) => !a.startsWith("--") && !["--domain", "--hax-build"].includes(args[i - 1])) || "");
if (!args.find((a, i) => !a.startsWith("--") && !["--domain", "--hax-build"].includes(args[i - 1]))) {
  console.error("usage: node scripts/build-pages.mjs <out-dir> [--domain https://user.github.io/repo/] [--hax-build <dir>] [--keep-drafts]");
  process.exit(1);
}
if (OUT === SITE_DIR || OUT.startsWith(`${SITE_DIR}${path.sep}`)) {
  console.error("the output folder must be outside the site folder");
  process.exit(1);
}
const KEEP_DRAFTS = args.includes("--keep-drafts");
const site = JSON.parse(readFileSync(path.join(SITE_DIR, "site.json"), "utf8"));
const DOMAIN = (opt("--domain") || site.metadata?.site?.domain || "").replace(/\/?$/, "/");
const abs = (rel) => (DOMAIN !== "/" ? new URL(rel, DOMAIN).href : rel);

/* ---------- what's published ---------- */

const all = site.items;
const byId = new Map(all.map((i) => [i.id, i]));
// unpublished itself, or under an unpublished page; the system page stays
const isDraft = (item) => {
  if (item.metadata?.pageType === "oer:system") return false;
  for (let c = item; c; c = byId.get(c.parent)) if (c.metadata?.published === false) return true;
  return false;
};
const drafts = KEEP_DRAFTS ? [] : all.filter(isDraft);
const draftIds = new Set(drafts.map((i) => i.id));
const items = all.filter((i) => !draftIds.has(i.id));

/* ---------- 1. the site, copied ---------- */

const SKIP_TOP = new Set([".git", ".github", "node_modules", "scripts", "dist", "build", "config.php", "index.php", "Dockerfile", "netlify.toml", "web-dev-server.haxcms.config.cjs", "create-cli.recipe", "AGENTS.md", "README.md", "CNAME", "ghpages.html"]);
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(SITE_DIR, OUT, {
  recursive: true,
  filter: (src) => {
    const rel = path.relative(SITE_DIR, src);
    if (!rel) return true;
    const parts = rel.split(path.sep);
    if (SKIP_TOP.has(parts[0]) && parts.length >= 1) return false;
    if (parts.includes("node_modules") || parts.includes(".DS_Store") || /^\.env/.test(parts.at(-1))) return false;
    // the theme: only its build ships
    if (parts[0] === "custom" && parts.length > 1 && parts[1] !== "build") return false;
    return !lstatSync(src).isSymbolicLink();
  },
});

/* ---------- 2. drafts out ---------- */

const draftLocations = new Set(drafts.map((i) => i.location).filter(Boolean));
for (const loc of draftLocations) rmSync(path.join(OUT, path.dirname(loc)), { recursive: true, force: true });
writeFileSync(path.join(OUT, "site.json"), JSON.stringify({ ...site, items }, null, 2));
const draftSlugs = new Set(drafts.map((i) => i.slug).filter(Boolean));
const draftRefs = [...draftSlugs, ...draftLocations, ...draftIds];
const mentionsDraft = (text) => draftRefs.some((r) => text.includes(r));
// search index: [{ id, title, location, … }]
const lunrFile = path.join(OUT, "lunrSearchIndex.json");
if (existsSync(lunrFile)) {
  const lunr = JSON.parse(readFileSync(lunrFile, "utf8"));
  if (Array.isArray(lunr)) writeFileSync(lunrFile, JSON.stringify(lunr.filter((e) => !draftIds.has(e.id) && !draftLocations.has(e.location) && !draftSlugs.has(e.location))));
}
// sitemap and feeds: drop each <url>/<item>/<entry> that names a draft
const dropEntries = (file, tag) => {
  const f = path.join(OUT, file);
  if (!existsSync(f)) return;
  const xml = readFileSync(f, "utf8");
  writeFileSync(f, xml.replace(new RegExp(`<${tag}\\b[\\s\\S]*?</${tag}>\\s*`, "g"), (m) => (mentionsDraft(m) ? "" : m)));
};
dropEntries("sitemap.xml", "url");
dropEntries("rss.xml", "item");
dropEntries("atom.xml", "entry");
// llms.txt: one line per page
const llms = path.join(OUT, "llms.txt");
if (existsSync(llms)) writeFileSync(llms, readFileSync(llms, "utf8").split("\n").filter((line) => !(line.startsWith("- [") && mentionsDraft(line))).join("\n"));
// HAX writes these with the address it was served from (hax serve's
// localhost): the published address instead, or relative ones
const LOCAL = /https?:\/\/localhost(?::\d+)?\/learning-materials(?:\/|(?=["<\s]))/g;
for (const f of ["sitemap.xml", "sitemap-index.xml", "rss.xml", "atom.xml", "llms.txt", "robots.txt"]) {
  const file = path.join(OUT, f);
  if (existsSync(file)) writeFileSync(file, readFileSync(file, "utf8").replace(LOCAL, DOMAIN !== "/" ? DOMAIN : ""));
}

/* ---------- 3. HAX's code ---------- */

function haxPublic() {
  const given = opt("--hax-build");
  if (given) return path.resolve(given.replace(/[\\/]build[\\/]?$/, ""));
  const require = createRequire(import.meta.url);
  for (const from of [SITE_DIR, path.join(SITE_DIR, "..")]) {
    try {
      return path.join(path.dirname(require.resolve("@haxtheweb/haxcms-nodejs/package.json", { paths: [from] })), "dist", "public");
    } catch {
      // not installed there
    }
  }
  return "";
}
const HAX_PUBLIC = haxPublic();
if (!HAX_PUBLIC || !existsSync(path.join(HAX_PUBLIC, "build"))) {
  console.error("HAX's build wasn't found: install @haxtheweb/haxcms-nodejs, or pass --hax-build <dist/public/build>");
  process.exit(1);
}
cpSync(path.join(HAX_PUBLIC, "build"), path.join(OUT, "build"), { recursive: true, dereference: true });
for (const f of ["build.js", "build-haxcms.js", "wc-registry.json"]) {
  if (!existsSync(path.join(OUT, f)) && existsSync(path.join(HAX_PUBLIC, f))) cpSync(path.join(HAX_PUBLIC, f), path.join(OUT, f));
}
writeFileSync(path.join(OUT, ".nojekyll"), "");

/* ---------- 4. a page file for every published page ---------- */

const SITE_TITLE = site.title || "";
const SITE_AUTHOR = site.metadata?.author?.name || "";
const sys = all.find((i) => i.metadata?.pageType === "oer:system");
const types = sys?.metadata?.oerContentTypes?.types || [];
const typeOf = (id) => types.find((t) => t.id === id) || { fields: [] };
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const pad = (n) => String(n).padStart(2, "0");
const ymd = (d, sep = "/") => `${d.getFullYear()}${sep}${pad(d.getMonth() + 1)}${sep}${pad(d.getDate())}`;
const CC = (code) => {
  const c = String(code || "").trim();
  if (/^cc0/i.test(c)) return "https://creativecommons.org/publicdomain/zero/1.0/";
  const m = c.match(/^CC\s+([A-Z-]+)\s+(\d\.\d)$/i);
  return m ? `https://creativecommons.org/licenses/${m[1].toLowerCase()}/${m[2]}/` : c;
};

// a page's fields, with its type's defaults (as the footer reads them)
function fieldsOf(item) {
  const values = { ...(item.metadata?.oerFields || {}) };
  for (const f of typeOf(item.metadata?.pageType).fields || []) {
    if ((values[f.name] === undefined || values[f.name] === "") && f.default) values[f.name] = f.default;
  }
  return values;
}

function citeInfo(item) {
  const isSnap = !!item.metadata?.oerSnapshotOf;
  const pageId = item.metadata?.oerSnapshotOf || item.id;
  const page = byId.get(pageId) || item;
  // linked chapters credit their source
  const src = item.metadata?.oerRef?.page ? byId.get(item.metadata.oerRef.page) || item : item;
  const f = fieldsOf(src);
  const authors = (Array.isArray(f.authors) ? f.authors : []).map((a) => (typeof a === "object" ? a.name : a)).filter(Boolean);
  if (!authors.length && f.author) authors.push(String(f.author));
  if (!authors.length && SITE_AUTHOR) authors.push(SITE_AUTHOR);
  const version = item.metadata?.version || "";
  const release = version ? (page.metadata?.oerVersions || []).find((r) => r.version === version) : null;
  const snap = version ? all.find((i) => i.metadata?.oerSnapshotOf === pageId && i.metadata?.version === version) : null;
  const pinned = isSnap || !!snap;
  const fieldDate = f.date ? new Date(f.date) : null;
  const issued =
    release?.date && Number(release.date)
      ? new Date(Number(release.date) * 1000)
      : fieldDate && !Number.isNaN(fieldDate.getTime())
        ? fieldDate
        : new Date((item.metadata?.updated || item.metadata?.created || Date.now() / 1000) * 1000);
  const permalink = abs(`?p=${pageId}${pinned && version ? `&version=${version}` : ""}`);
  return { title: item.metadata?.oerSnapshotTitle || item.title, authors, issued, version, permalink, license: f.license, description: item.description || src.description || "" };
}

function headFor(item) {
  const c = citeInfo(item);
  const updated = item.metadata?.updated ? new Date(item.metadata.updated * 1000) : null;
  const tags = String(item.metadata?.tags || "").split(",").map((t) => t.trim()).filter(Boolean);
  const people = c.authors.length ? c.authors : [SITE_TITLE];
  const meta = [
    ["citation_title", c.title],
    ...people.map((a) => ["citation_author", a]),
    ["citation_publication_date", ymd(c.issued)],
    ...(updated ? [["citation_online_date", ymd(updated)]] : []),
    ["citation_publisher", SITE_TITLE],
    ["citation_public_url", c.permalink],
    ["citation_abstract_html_url", abs(item.slug)],
    ["citation_language", "en"],
    ...(tags.length ? [["citation_keywords", tags.join("; ")]] : []),
    ["DC.title", c.title],
    ...people.map((a) => ["DC.creator", a]),
    ["DC.date", ymd(c.issued, "-")],
    ["DC.publisher", SITE_TITLE],
    ["DC.identifier", c.permalink],
    ["DC.language", "en"],
    ["DC.type", "Text"],
    ...(c.license ? [["DC.rights", CC(c.license)]] : []),
    ...(c.description ? [["DC.description", c.description]] : []),
  ];
  return [
    ...meta.filter(([, v]) => v).map(([n, v]) => `  <meta name="${esc(n)}" content="${esc(v)}" data-oer-cite />`),
    ...(DOMAIN !== "/" ? [`  <link rel="canonical" href="${esc(abs(item.slug))}" />`] : []),
  ].join("\n");
}

// HAX's index.html sets its <base> from a script, after the browser has
// already fetched the preloaded files relative to the page's own address
// (404s on every deep link): a real <base> first, from the published path
const BASE = DOMAIN !== "/" ? new URL(DOMAIN).pathname.replace(/\/?$/, "/") : "/";
const withBase = (html) => html.replace(/<head>/, `<head>\n  <base href="${esc(BASE)}" />`);
const template = withBase(readFileSync(path.join(SITE_DIR, "index.html"), "utf8"));
writeFileSync(path.join(OUT, "index.html"), template);
let pages = 0;
for (const item of items) {
  if (!item.slug || item.metadata?.published === false) continue;
  if (["oer:system", "oer:heading"].includes(item.metadata?.pageType)) continue;
  const c = citeInfo(item);
  // static hosts serve this file at "<slug>/", which HAX's router doesn't
  // match: drop the slash before anything routes
  const unslash = `<script>if(location.pathname.length>1&&location.pathname.endsWith("/"))history.replaceState(null,"",location.pathname.replace(/\\/+$/,"")+location.search+location.hash)</script>`;
  const html = template
    .replace(/(<base [^>]*>)/, `$1\n  ${unslash}`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(`${c.title} | ${SITE_TITLE}`)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(c.description)}$2`)
    .replace(/(<meta name="og:description" property="og:description" content=")[^"]*(")/, `$1${esc(c.description)}$2`)
    .replace(/(<meta name="twitter:description" property="twitter:description" content=")[^"]*(")/, `$1${esc(c.description)}$2`)
    .replace(/<\/head>/, `${headFor(item)}\n</head>`);
  // a page may have sub-pages, whose folders live inside its own
  const dir = path.join(OUT, item.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "index.html"), html);
  pages++;
}

const size = (dir) => readdirSync(dir).reduce((s, f) => {
  const p = path.join(dir, f);
  const st = lstatSync(p);
  return s + (st.isDirectory() ? size(p) : st.size);
}, 0);
console.log(`built ${OUT}: ${items.length} items (${drafts.length} drafts left out), ${pages} page files, ${(size(OUT) / 1048576).toFixed(0)} MB${DOMAIN !== "/" ? `, links for ${DOMAIN}` : " (relative links: pass --domain for absolute ones)"}`);
if (!existsSync(path.join(OUT, "404.html"))) console.log("note: no 404.html in the site");
