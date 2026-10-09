/**
 * What's in a page, for Page details' Media and Report sections: its
 * images, video, audio, embeds and files (each image with or without a
 * description), its words and reading time, its headings, and its links.
 * Read from the page's stored HTML (pages/<id>/index.html), so it works for
 * any page, not only the open one.
 */

const READING_WPM = 230;
const fileName = (url) => decodeURIComponent(String(url || "").split(/[?#]/)[0].split("/").pop() || url || "");
const FILE = /\.(pdf|docx?|pptx?|xlsx?|zip|stl|obj|glb|gltf|svg|ai|psd|blend|fbx|3mf|dxf|csv)(\?|#|$)/i;

/** A page's stored HTML, or "" if it can't be read. */
export async function pageHtml(item) {
  if (!item?.location) return "";
  try {
    const res = await fetch(new URL(item.location, globalThis.document.baseURI), { credentials: "same-origin", cache: "no-cache" });
    return res.ok ? await res.text() : "";
  } catch {
    return "";
  }
}

/** The media in a page's HTML: [{ kind, src, name, alt, needsAlt, label }]. */
export function pageMedia(doc) {
  const out = [];
  const add = (kind, src, extra = {}) => src && out.push({ kind, src, name: fileName(src), ...extra });
  for (const el of doc.querySelectorAll("img")) {
    if (el.closest("media-image, simple-img")) continue;
    add("image", el.getAttribute("src"), { alt: el.getAttribute("alt") ?? null, needsAlt: !el.hasAttribute("alt") || el.getAttribute("alt").trim() === "" });
  }
  for (const el of doc.querySelectorAll("media-image, simple-img")) {
    const src = el.getAttribute("source") || el.getAttribute("src") || el.querySelector("img")?.getAttribute("src");
    const alt = el.getAttribute("alt") ?? el.querySelector("img")?.getAttribute("alt") ?? null;
    add("image", src, { alt, needsAlt: !alt || !alt.trim(), label: el.getAttribute("caption") || "" });
  }
  for (const el of doc.querySelectorAll("video-player, video, a11y-media-player")) {
    add("video", el.getAttribute("source") || el.getAttribute("src") || el.querySelector("source")?.getAttribute("src"), { label: el.getAttribute("media-title") || el.getAttribute("title") || "" });
  }
  for (const el of doc.querySelectorAll("audio-player, audio")) add("audio", el.getAttribute("source") || el.getAttribute("src") || el.querySelector("source")?.getAttribute("src"));
  for (const el of doc.querySelectorAll("iframe, oer-embed, model-viewer")) {
    add(el.localName === "model-viewer" ? "3D model" : "embed", el.getAttribute("src") || el.getAttribute("source"), { label: el.getAttribute("title") || "" });
  }
  for (const el of doc.querySelectorAll("a[href]")) if (FILE.test(el.getAttribute("href"))) add("file", el.getAttribute("href"), { label: el.textContent.trim() });
  return out;
}

/** The page's words, reading time, headings and links. */
export function pageReport(doc) {
  const text = (doc.body?.textContent || "").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  const headings = [...doc.querySelectorAll("h2, h3, h4, h5, h6")].map((h) => ({ level: Number(h.localName[1]), text: h.textContent.trim() })).filter((h) => h.text);
  const links = [...doc.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")).filter((h) => h && !h.startsWith("#") && !h.startsWith("mailto:"));
  const external = links.filter((h) => /^https?:\/\//i.test(h) && !h.startsWith(globalThis.location?.origin || "\u0000")).length;
  const media = pageMedia(doc);
  return {
    words,
    minutes: words ? Math.max(1, Math.round(words / READING_WPM)) : 0,
    headings,
    links: { internal: links.length - external, external },
    media,
    missingAlt: media.filter((m) => m.kind === "image" && m.needsAlt).length,
    // a heading that skips a level (h2 then h4) is hard to follow with a screen reader
    skipped: headings.filter((h, i) => i > 0 && h.level > headings[i - 1].level + 1).length,
  };
}

/** Parse stored page HTML once for both. */
export const parsePage = (htmlText) => new DOMParser().parseFromString(`<body>${htmlText || ""}</body>`, "text/html");
