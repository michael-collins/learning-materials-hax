/**
 * Embed mode: `?embed=1` (or `?embed=true`, as in learning-materials-decapcms)
 * shows a page without the site chrome, for LMS iframes. While embedded the
 * page reports its height to the parent the way Canvas expects
 * (`lti.frameResize`) and asks it to scroll to the top on navigation
 * (`lti.scrollToTop`), so the iframe sizes itself to the content.
 */
export function isEmbedded() {
  const v = new URLSearchParams(globalThis.location.search).get("embed");
  return v === "1" || v === "true";
}

let observer = null;
let lastHeight = 0;
let timer = null;

function post(message) {
  try {
    globalThis.parent?.postMessage(JSON.stringify(message), "*");
  } catch {
    // no parent to talk to
  }
}

function sendHeight(content) {
  const height = Math.ceil(content.getBoundingClientRect().height) + 24;
  // only real changes, or the parent resizing us would loop
  if (Math.abs(height - lastHeight) < 5) return;
  lastHeight = height;
  post({ subject: "lti.frameResize", height });
}

/** Start reporting `content`'s height to the embedding page. */
export function startEmbedReporting(content) {
  if (globalThis.parent === globalThis || !content) return;
  stopEmbedReporting();
  observer = new ResizeObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(() => sendHeight(content), 100);
  });
  observer.observe(content);
  sendHeight(content);
  post({ subject: "lti.scrollToTop" });
}

export function stopEmbedReporting() {
  observer?.disconnect();
  observer = null;
  lastHeight = 0;
}

/** The embed address for a page, with options such as hideRubric. */
export function embedUrl(slug, options = {}) {
  const url = new URL(slug || "", globalThis.document.baseURI);
  url.searchParams.set("embed", "1");
  for (const [k, v] of Object.entries(options)) if (v) url.searchParams.set(k, "true");
  return url.href;
}
