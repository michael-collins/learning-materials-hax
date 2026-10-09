/**
 * A book as an EPUB 3 ebook, made in the browser: a title page (cover,
 * title, description, authors and the book's own page), a table of
 * contents (nav.xhtml, and toc.ncx for older readers) and one XHTML file
 * per chapter in reading order, with the chapters' images inside.
 *
 * Chapters are site pages full of HAX blocks, which e-readers can't run:
 * images become figures, video and embeds become links, blocks that hold
 * other content give it up, and anything else interactive is left out
 * with a note pointing to the chapter online.
 *
 *   await exportEpub(bookId, { online: (item) => url })
 */
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { bookChapters, download } from "./book-export.js";
import { zipBytes } from "../lms/zip.js";
import { peopleOf } from "../types/content-types.js";

const XHTML = "http://www.w3.org/1999/xhtml";
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slugify = (s) => String(s || "book").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "book";
const TYPES = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", webp: "image/webp", svg: "image/svg+xml", avif: "image/avif" };
// e-readers show these; others (webp, avif) are kept anyway: most current readers manage
const extOf = (url, type) => (String(url).split(/[?#]/)[0].split(".").pop() || "").toLowerCase().replace("jpeg", "jpg") || Object.keys(TYPES).find((k) => TYPES[k] === type) || "img";

const CSS = `body{font-family:serif;line-height:1.55;margin:0 4%}
h1{font-size:1.6em;line-height:1.2;margin:1.2em 0 .6em}h2{font-size:1.3em;margin:1.4em 0 .5em}h3{font-size:1.1em;margin:1.2em 0 .4em}
img{max-width:100%;height:auto}figure{margin:1.2em 0}figcaption{font-size:.85em;font-style:italic}
table{border-collapse:collapse;width:100%;font-size:.9em}td,th{border:1px solid #999;padding:.3em .5em;vertical-align:top}
blockquote{margin:1em 1.5em;font-style:italic}pre,code{font-family:monospace;font-size:.9em}pre{white-space:pre-wrap}
.title-page{text-align:center}.title-page img{max-height:60vh}.authors{font-style:italic}.online{font-size:.85em;font-style:italic}
nav ol{list-style:none;padding-left:1.2em}`;

const page = (title, body) => `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="${XHTML}" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="en" lang="en">
<head><meta charset="utf-8"/><title>${esc(title)}</title><link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>${body}</body>
</html>`;

/**
 * A chapter's HTML as well-formed XHTML for an e-reader: blocks turned into
 * plain HTML, images gathered through `image(url)` (which returns their
 * path in the book, or "" if they can't be had), links made absolute.
 */
async function toXhtml(htmlText, { image, base, online }) {
  const doc = new DOMParser().parseFromString(`<body>${htmlText || ""}</body>`, "text/html");
  const body = doc.body;
  let dropped = false;
  const replace = (el, html) => {
    const t = doc.createElement("template");
    t.innerHTML = html;
    el.replaceWith(t.content);
  };
  for (const el of [...body.querySelectorAll("script, style, template, page-break, oer-draft, noscript")]) el.remove();
  for (const el of [...body.querySelectorAll("media-image, simple-img")]) {
    const src = el.getAttribute("source") || el.getAttribute("src") || el.querySelector("img")?.getAttribute("src") || "";
    const alt = el.getAttribute("alt") ?? el.querySelector("img")?.getAttribute("alt") ?? "";
    const caption = el.getAttribute("caption") || el.querySelector("figcaption, [slot=caption]")?.textContent || "";
    replace(el, src ? `<figure><img src="${esc(src)}" alt="${esc(alt)}"/>${caption.trim() ? `<figcaption>${esc(caption.trim())}</figcaption>` : ""}</figure>` : "");
  }
  for (const el of [...body.querySelectorAll("video-player, a11y-media-player, audio-player, video, audio, iframe, model-viewer")]) {
    const src = el.getAttribute("source") || el.getAttribute("src") || el.querySelector("source")?.getAttribute("src") || "";
    const label = el.getAttribute("media-title") || el.getAttribute("title") || (/audio/.test(el.localName) ? "Audio" : el.localName === "iframe" ? "Embedded content" : el.localName === "model-viewer" ? "3D model" : "Video");
    replace(el, src ? `<p class="online">${esc(label)}: <a href="${esc(new URL(src, base).href)}">${esc(new URL(src, base).href)}</a></p>` : "");
  }
  // other blocks: keep what they hold, else drop them (and say so)
  for (const el of [...body.querySelectorAll("*")].reverse()) {
    if (!el.localName.includes("-") || !el.isConnected) continue;
    if (el.children.length || el.textContent.trim()) el.replaceWith(...el.childNodes);
    else {
      el.remove();
      dropped = true;
    }
  }
  for (const el of body.querySelectorAll("*")) {
    for (const a of [...el.attributes]) {
      if (/^on|^data-hax|^contenteditable$|^style$|^slot$|^role$|^tabindex$/i.test(a.name)) el.removeAttribute(a.name);
    }
    if (el.localName === "a" && el.getAttribute("href") && !/^(#|mailto:)/.test(el.getAttribute("href"))) {
      try {
        el.setAttribute("href", new URL(el.getAttribute("href"), base).href);
      } catch {
        el.removeAttribute("href");
      }
    }
  }
  for (const img of [...body.querySelectorAll("img")]) {
    const src = img.getAttribute("src") || "";
    const path = src ? await image(new URL(src, base).href) : "";
    if (path) {
      img.setAttribute("src", path);
      if (!img.hasAttribute("alt")) img.setAttribute("alt", "");
    } else replace(img, img.getAttribute("alt") ? `<span>[${esc(img.getAttribute("alt"))}]</span>` : "");
  }
  if (dropped && online) body.insertAdjacentHTML("beforeend", `<p class="online">Some interactive parts of this chapter are only online: <a href="${esc(online)}">${esc(online)}</a></p>`);
  const section = doc.createElement("section");
  section.append(...body.childNodes);
  // XMLSerializer gives well-formed XHTML (self-closed voids, escaped text)
  return new XMLSerializer().serializeToString(section).replace(/^<section xmlns="http:\/\/www\.w3\.org\/1999\/xhtml">/, "").replace(/<\/section>$/, "");
}

/** Chapters as nested lists by depth (a jump of more than one level counts as one). */
function navOl(list) {
  let html = "<ol>";
  let level = 0;
  list.forEach((c, i) => {
    const d = i === 0 ? 0 : Math.min(Math.max(0, c.depth), level + 1);
    if (i > 0) {
      if (d > level) html += "<ol>";
      else {
        html += "</li>";
        for (let k = level; k > d; k--) html += "</ol></li>";
      }
    }
    html += `<li><a href="${c.file}">${esc(c.title)}</a>`;
    level = d;
  });
  if (list.length) html += "</li>";
  for (let k = level; k > 0; k--) html += "</ol></li>";
  return `${html}</ol>`;
}

/** Download a book as an EPUB. `online(item)` gives a chapter's web address, for notes and links. */
export async function exportEpub(bookId, { online = null, onProgress = null } = {}) {
  const chapters = await bookChapters(bookId);
  // headings label the chapters after them, with no page of their own: an ebook leaves them out
  const [cover, ...withHeadings] = chapters;
  const rest = withHeadings.filter((c) => c.item.metadata?.pageType !== "oer:heading");
  const book = cover.item;
  const items = toJS(store.manifest?.items) || [];
  const base = new URL(".", globalThis.document.baseURI).href;
  const f = book.metadata?.oerFields || {};

  // images, fetched once each
  const images = new Map(); // url -> { path, type, data }
  const image = async (url) => {
    if (images.has(url)) return images.get(url)?.path || "";
    images.set(url, null);
    try {
      const res = await fetch(url, { credentials: "same-origin" });
      if (!res.ok) return "";
      const type = (res.headers.get("content-type") || "").split(";")[0].trim();
      const ext = extOf(url, type);
      const media = TYPES[ext] || type;
      if (!/^image\//.test(media)) return "";
      const entry = { path: `images/img-${images.size}.${ext}`, type: media, data: new Uint8Array(await res.arrayBuffer()) };
      images.set(url, entry);
      return entry.path;
    } catch {
      return "";
    }
  };

  const files = [];
  const chapterFiles = [];
  const name = (n) => `chapter-${String(n).padStart(3, "0")}.xhtml`;
  let n = 0;
  for (const c of rest) {
    n++;
    onProgress?.(`Chapter ${n} of ${rest.length}`);
    const body = await toXhtml(c.html, { image, base, online: online?.(c.item) });
    const h = c.depth === 0 ? "h1" : "h2";
    files.push({ name: `OEBPS/${name(n)}`, data: page(c.item.title, `<section epub:type="chapter"><${h}>${esc(c.item.title)}</${h}>${body}</section>`) });
    chapterFiles.push({ file: name(n), title: c.item.title, depth: c.depth });
  }

  // the title page: cover, title, description, authors, the book's own page
  const coverPath = f.coverImage ? await image(new URL(f.coverImage, base).href) : "";
  const authors = peopleOf(f.authors).map((p) => p.name).filter(Boolean);
  const intro = await toXhtml(cover.html, { image, base, online: online?.(book) });
  files.unshift({
    name: "OEBPS/title.xhtml",
    data: page(
      book.title,
      `<section epub:type="titlepage" class="title-page">${coverPath ? `<img src="${coverPath}" alt="${esc(f.coverImageAlt || "")}"/>` : ""}<h1>${esc(book.title)}</h1>${book.description ? `<p>${esc(book.description)}</p>` : ""}${authors.length ? `<p class="authors">${esc(authors.join(", "))}</p>` : ""}</section><section>${intro}</section>`,
    ),
  });

  // contents: nav.xhtml (nested by depth) and toc.ncx
  const navList = navOl(chapterFiles);
  files.push({ name: "OEBPS/nav.xhtml", data: page("Contents", `<nav epub:type="toc" id="toc"><h1>Contents</h1>${navList}</nav>`) });
  const uid = `urn:uuid:${String(book.id).replace(/^item-/, "")}`;
  files.push({
    name: "OEBPS/toc.ncx",
    data: `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1"><head><meta name="dtb:uid" content="${esc(uid)}"/></head><docTitle><text>${esc(book.title)}</text></docTitle>
<navMap>${chapterFiles.map((c, i) => `<navPoint id="np${i + 1}" playOrder="${i + 1}"><navLabel><text>${esc(c.title)}</text></navLabel><content src="${c.file}"/></navPoint>`).join("")}</navMap></ncx>`,
  });
  files.push({ name: "OEBPS/style.css", data: CSS });

  const imageEntries = [...images.values()].filter(Boolean);
  for (const img of imageEntries) files.push({ name: `OEBPS/${img.path}`, data: img.data });
  const coverEntry = imageEntries.find((i) => i.path === coverPath);
  const modified = new Date().toISOString().replace(/\.\d+Z$/, "Z");
  files.push({
    name: "OEBPS/content.opf",
    data: `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid" xml:lang="en">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
<dc:identifier id="bookid">${esc(uid)}</dc:identifier>
<dc:title>${esc(book.title)}</dc:title>
<dc:language>en</dc:language>
${authors.map((a) => `<dc:creator>${esc(a)}</dc:creator>`).join("\n")}
${book.description ? `<dc:description>${esc(book.description)}</dc:description>` : ""}
${f.license ? `<dc:rights>${esc(f.license)}</dc:rights>` : ""}
<meta property="dcterms:modified">${modified}</meta>
${coverEntry ? `<meta name="cover" content="img-cover"/>` : ""}
</metadata>
<manifest>
<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
<item id="css" href="style.css" media-type="text/css"/>
<item id="title" href="title.xhtml" media-type="application/xhtml+xml"/>
${chapterFiles.map((c, i) => `<item id="c${i + 1}" href="${c.file}" media-type="application/xhtml+xml"/>`).join("\n")}
${imageEntries.map((img, i) => `<item id="${img === coverEntry ? "img-cover" : `img${i + 1}`}" href="${img.path}" media-type="${img.type}"${img === coverEntry ? ' properties="cover-image"' : ""}/>`).join("\n")}
</manifest>
<spine toc="ncx">
<itemref idref="title"/>
<itemref idref="nav"/>
${chapterFiles.map((c, i) => `<itemref idref="c${i + 1}"/>`).join("\n")}
</spine>
</package>`,
  });
  // the container must come first and uncompressed (zipBytes stores everything)
  const zipFiles = [
    { name: "mimetype", data: "application/epub+zip" },
    { name: "META-INF/container.xml", data: `<?xml version="1.0" encoding="UTF-8"?>\n<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>` },
    ...files,
  ];
  onProgress?.("");
  const short = slugify(String(book.title).split(":")[0]);
  download(new Blob([zipBytes(zipFiles)], { type: "application/epub+zip" }), `${short}.epub`);
  return { chapters: chapterFiles.length, images: imageEntries.length, items: items.length };
}
