/**
 * Book exports, built in the browser from the site outline (after
 * learning-materials-decapcms' BookExportDropdown):
 *
 * - Print / PDF: every chapter on one printable page (oer-book-print)
 * - HTML (.zip): a table of contents and one file per chapter
 * - Common Cartridge (.imscc, IMS CC 1.3): the book's outline as LMS
 *   modules, each chapter a web link to its embed view (?embed=1), so the
 *   LMS always shows the current (or pinned) content
 *
 * Chapters that include other pages (oer-include) are resolved, honouring
 * pinned versions.
 */
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { flatten } from "../outline/outline-model.js";
import { versionsOf, isSnapshot } from "../versions/versioning.js";
import { SYSTEM_TYPE } from "../types/content-types.js";
import { embedUrl } from "../embed/embed-mode.js";

const items = () => toJS(store.manifest?.items) || [];

async function rawHtml(item) {
  const url = new URL(item.location, globalThis.document.baseURI);
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) return "";
  return (await res.text()).replace(/<page-break\b[^>]*>(?:\s*<\/page-break>)?/gi, "");
}

// replace <oer-include> with the content it shows (one level deep)
async function resolvedHtml(item, all) {
  let html = await rawHtml(item);
  const includes = [...html.matchAll(/<oer-include\b([^>]*)>\s*<\/oer-include>/gi)];
  for (const m of includes) {
    const page = m[1].match(/\bpage="([^"]+)"/)?.[1];
    const version = m[1].match(/\bversion="([^"]+)"/)?.[1];
    const source = all.find((i) => i.id === page);
    const target = source && version ? versionsOf(source.id, all).find((v) => v.version === version)?.snapshot : source;
    html = html.replace(m[0], target ? await rawHtml(target) : "");
  }
  // live page lists make no sense in an export; it has its own contents
  return html.replace(/<oer-collection\b[^>]*>\s*<\/oer-collection>/gi, "").trim();
}

/** The book and its chapters in reading order: [{ item, depth, html }]. */
export async function bookChapters(bookId) {
  const all = items();
  const book = all.find((i) => i.id === bookId);
  const list = flatten(
    all.filter((i) => !isSnapshot(i) && i.metadata?.pageType !== SYSTEM_TYPE && i.metadata?.published !== false),
    bookId,
  );
  const out = [{ item: book, depth: -1, html: await resolvedHtml(book, all) }];
  for (const { item, depth } of list) out.push({ item, depth, html: await resolvedHtml(item, all) });
  return out;
}

/* ---------- a minimal zip writer (stored, no compression) ---------- */

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(bytes) {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/** files: [{ name, data: string | Uint8Array }] → Blob (application/zip) */
export function zip(files) {
  const enc = new TextEncoder();
  const parts = [];
  const central = [];
  let offset = 0;
  for (const f of files) {
    const name = enc.encode(f.name);
    const data = typeof f.data === "string" ? enc.encode(f.data) : f.data;
    const crc = crc32(data);
    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true);
    local.setUint16(4, 20, true);
    local.setUint16(6, 0x0800, true); // UTF-8 names
    local.setUint32(14, crc, true);
    local.setUint32(18, data.length, true);
    local.setUint32(22, data.length, true);
    local.setUint16(26, name.length, true);
    parts.push(local.buffer, name, data);
    const dir = new DataView(new ArrayBuffer(46));
    dir.setUint32(0, 0x02014b50, true);
    dir.setUint16(4, 20, true);
    dir.setUint16(6, 20, true);
    dir.setUint16(8, 0x0800, true);
    dir.setUint32(16, crc, true);
    dir.setUint32(20, data.length, true);
    dir.setUint32(24, data.length, true);
    dir.setUint16(28, name.length, true);
    dir.setUint32(42, offset, true);
    central.push(dir.buffer, name);
    offset += 30 + name.length + data.length;
  }
  const size = central.reduce((n, p) => n + (p.byteLength ?? p.length), 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, files.length, true);
  end.setUint16(10, files.length, true);
  end.setUint32(12, size, true);
  end.setUint32(16, offset, true);
  return new Blob([...parts, ...central, end.buffer], { type: "application/zip" });
}

/* ---------- downloads ---------- */

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slugify = (s) => String(s || "book").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "book";

export function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = Object.assign(globalThis.document.createElement("a"), { href: url, download: filename });
  globalThis.document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

const PAGE_CSS = `body{font:18px/1.6 system-ui,sans-serif;max-width:46rem;margin:2rem auto;padding:0 1rem;color:#111}
img,video{max-width:100%;height:auto}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ccc;padding:.4rem .6rem}
nav a{display:block;padding:.15rem 0}.meta{color:#555;font-size:.9rem}a{color:#0059a0}`;

/** HTML (.zip): index.html (contents) + one file per chapter. */
export async function exportHtmlZip(bookId) {
  const chapters = await bookChapters(bookId);
  const book = chapters[0].item;
  const base = new URL(".", globalThis.document.baseURI).href;
  const name = (n) => `chapter-${String(n).padStart(2, "0")}.html`;
  const files = chapters.slice(1).map((c, n) => ({
    name: name(n + 1),
    data: `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(c.item.title)} — ${esc(book.title)}</title><base href="${base}"><style>${PAGE_CSS}</style></head><body>
<p class="meta"><a href="index.html">${esc(book.title)}</a></p><h1>${esc(c.item.title)}</h1>${c.html}
<p class="meta">${n > 0 ? `<a href="${name(n)}">← Previous</a> · ` : ""}${n + 2 < chapters.length ? `<a href="${name(n + 2)}">Next →</a>` : ""}</p></body></html>`,
  }));
  const toc = chapters
    .slice(1)
    .map((c, n) => `<a href="${name(n + 1)}" style="padding-left:${c.depth * 1.25}rem">${esc(c.item.title)}</a>`)
    .join("\n");
  files.unshift({
    name: "index.html",
    data: `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(book.title)}</title><base href="${base}"><style>${PAGE_CSS}</style></head><body>
<h1>${esc(book.title)}</h1>${book.description ? `<p>${esc(book.description)}</p>` : ""}${chapters[0].html}<h2>Contents</h2><nav>${toc}</nav></body></html>`,
  });
  download(zip(files), `${slugify(book.title)}-html.zip`);
}

/** Common Cartridge 1.3 (.imscc): outline as modules of web links. */
export async function exportCommonCartridge(bookId) {
  const all = items();
  const book = all.find((i) => i.id === bookId);
  const list = flatten(all.filter((i) => !isSnapshot(i) && i.metadata?.pageType !== SYSTEM_TYPE && i.metadata?.published !== false), bookId);
  const files = [];
  const resources = [];
  const link = (item, n) => {
    const id = `WL${n}`;
    files.push({
      name: `${id}.xml`,
      data: `<?xml version="1.0" encoding="UTF-8"?>
<webLink xmlns="http://www.imsglobal.org/xsd/imsccv1p3/imswl_v1p3"><title>${esc(item.title)}</title><url href="${esc(embedUrl(item.slug))}" target="_iframe"/></webLink>`,
    });
    resources.push(`<resource identifier="${id}" type="imswl_xmlv1p3"><file href="${id}.xml"/></resource>`);
    return id;
  };
  // organization mirroring the outline: a page with sub-pages is a folder
  // that links itself first; a page without is a plain link
  let body = "";
  let depthOpen = 0;
  list.forEach(({ item, depth }, n) => {
    for (; depthOpen > depth; depthOpen--) body += "</item>";
    const ref = link(item, n + 1);
    const hasKids = list[n + 1]?.depth > depth;
    if (hasKids) {
      body += `<item identifier="F${n + 1}"><title>${esc(item.title)}</title><item identifier="I${n + 1}" identifierref="${ref}"><title>${esc(item.title)}</title></item>`;
      depthOpen = depth + 1;
    } else {
      body += `<item identifier="I${n + 1}" identifierref="${ref}"><title>${esc(item.title)}</title></item>`;
    }
  });
  for (; depthOpen > 0; depthOpen--) body += "</item>";
  files.unshift({
    name: "imsmanifest.xml",
    data: `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${esc(book.id)}" xmlns="http://www.imsglobal.org/xsd/imsccv1p3/imscp_v1p1" xmlns:lomimscc="http://ltsc.ieee.org/xsd/imsccv1p3/LOM/manifest">
<metadata><schema>IMS Common Cartridge</schema><schemaversion>1.3.0</schemaversion>
<lomimscc:lom><lomimscc:general><lomimscc:title><lomimscc:string>${esc(book.title)}</lomimscc:string></lomimscc:title></lomimscc:general></lomimscc:lom></metadata>
<organizations><organization identifier="O1" structure="rooted-hierarchy"><item identifier="root">${body}</item></organization></organizations>
<resources>${resources.join("")}</resources>
</manifest>`,
  });
  download(zip(files), `${slugify(book.title)}.imscc`);
}
