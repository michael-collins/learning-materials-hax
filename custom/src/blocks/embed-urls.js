/**
 * Turn the URLs people paste into embeddable ones. Ported from
 * learning-materials-decapcms (IframeComponent, GoogleSlidesComponent,
 * SketchfabComponent) so the same inputs work in both.
 */

/** YouTube watch / share / playlist links → privacy-enhanced embed URL. */
export function youtubeEmbed(input) {
  try {
    const url = new URL(input);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtube.com" || host === "youtube-nocookie.com" || host === "m.youtube.com") {
      const list = url.searchParams.get("list");
      const v = url.searchParams.get("v");
      if (url.pathname.startsWith("/embed/videoseries") && list) {
        return `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(list)}`;
      }
      if (url.pathname.startsWith("/embed/")) return `https://www.youtube-nocookie.com${url.pathname}${url.search}`;
      if (url.pathname.startsWith("/shorts/")) return `https://www.youtube-nocookie.com/embed/${url.pathname.split("/")[2]}`;
      if (v) return `https://www.youtube-nocookie.com/embed/${v}${list ? `?list=${encodeURIComponent(list)}` : ""}`;
      if (list) return `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(list)}`;
    }
    if (host === "youtu.be") {
      const id = url.pathname.slice(1).split("/")[0];
      if (id) return `https://www.youtube-nocookie.com/embed/${id}`;
    }
  } catch {
    // not a URL
  }
  return null;
}

/** vimeo.com/123 → player.vimeo.com/video/123 */
export function vimeoEmbed(input) {
  const m = String(input || "").match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? `https://player.vimeo.com/video/${m[1]}` : null;
}

/** Any video page URL → embed URL (YouTube, Vimeo), else the input. */
export function videoEmbed(input) {
  const src = String(input || "").trim();
  return youtubeEmbed(src) || vimeoEmbed(src) || src;
}

/** Google Slides ID, edit URL or "publish to web" URL → embed URL. */
export function slidesEmbed(input) {
  let id = String(input || "").trim();
  if (!id) return "";
  if (id.includes("docs.google.com")) {
    const m = id.match(/\/d\/(?:e\/)?([a-zA-Z0-9-_]+)/);
    if (m) id = m[1];
  }
  return id.startsWith("2PACX")
    ? `https://docs.google.com/presentation/d/e/${id}/pubembed?start=false&loop=false&delayms=3000`
    : `https://docs.google.com/presentation/d/${id}/embed?start=false&loop=false&delayms=3000`;
}

/** Sketchfab model page URL or ID → embed URL. */
export function sketchfabEmbed(input) {
  const src = String(input || "").trim();
  if (!src) return "";
  if (src.includes("/embed")) return src;
  let id = "";
  if (src.includes("/3d-models/")) id = (src.split("/").pop() || "").match(/([a-f0-9]{32})/)?.[1] || "";
  else if (src.includes("/models/")) id = (src.split("/models/")[1] || "").split(/[?#/]/)[0];
  else if (/^[a-f0-9]{32}$/.test(src)) id = src;
  return id ? `https://sketchfab.com/models/${id}/embed?autostart=1&ui_theme=dark` : src;
}
