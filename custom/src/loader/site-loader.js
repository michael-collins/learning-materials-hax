/**
 * The loading screen (#loading, from HAX's index.html). HAX fades it out as
 * soon as the first page's content arrives, which cut the building figure
 * off part-way. From here:
 *  - the figure is drawn in the page, in the site's light/dark choice (as
 *    an image it could only follow the system's), starting from the empty
 *    plate theme/theme.css shows until now;
 *  - once HAX says the page is ready, the figure gets to its built page as
 *    loader-settings.js says (by default, playing the rest faster), looping
 *    meanwhile on slow loads, then the screen dissolves into the site,
 *    whose background is the screen's colour.
 * Quick for reduced motion, LMS embeds, and tabs that loaded out of view.
 * If this never runs, HAX's own fade still applies.
 */
import { FIGURE_CSS, FIGURE_HTML, PIECES } from "./building-figure.generated.js";
import { LOADER_SETTINGS } from "./loader-settings.js";
import { drawFigure, dissolve } from "./loader-core.js";
import { isEmbedded } from "../embed/embed-mode.js";
import { siteIsDark } from "../theme-choice.js";

const QUICK = { ...LOADER_SETTINGS, figureFadeMs: 150, dissolveDelayMs: 0, dissolveMs: 150 };

function framed() {
  try {
    return globalThis.self !== globalThis.top;
  } catch {
    return true;
  }
}

function holdLoadingScreen() {
  const doc = globalThis.document;
  const screen = doc?.getElementById("loading");
  const root = doc?.documentElement;
  // gone or going already (or held already): leave it
  if (!screen || !root || screen.hidden || screen.classList.contains("loaded") || root.dataset.oerLoader) return;
  const dark = siteIsDark();
  root.dataset.oerScheme = dark ? "dark" : "light";
  root.dataset.oerLoader = "held";

  screen.style.setProperty("--oer-figure-size", `${LOADER_SETTINGS.size}px`);
  const host = doc.createElement("div");
  host.className = "oer-loader-figure";
  host.setAttribute("aria-hidden", "true");
  host.toggleAttribute("dark", dark);
  (screen.querySelector(".messaging") || screen).prepend(host);
  const figure = drawFigure(host, { css: FIGURE_CSS, html: FIGURE_HTML, pieces: PIECES }, LOADER_SETTINGS);

  const reduced = !!globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  let unseen = doc.visibilityState === "hidden";
  const onVisibility = () => {
    if (doc.visibilityState === "hidden") unseen = true;
  };
  doc.addEventListener("visibilitychange", onVisibility);

  const reveal = (settings) => {
    doc.removeEventListener("visibilitychange", onVisibility);
    // fade onto the site's own background (a reader skin's, say)
    const site = doc.querySelector(".haxcms-theme-element");
    const bg = site && globalThis.getComputedStyle(site).backgroundColor;
    if (bg && !/^(transparent|rgba\(0, 0, 0, 0\))$/.test(bg)) screen.style.backgroundColor = bg;
    dissolve(screen, settings, () => {
      screen.classList.add("oer-gone");
      screen.setAttribute("hidden", "hidden");
      screen.setAttribute("aria-busy", "false");
      host.remove();
    });
  };

  const ready = () => {
    if (reduced || unseen || isEmbedded() || framed()) {
      figure.stop();
      reveal(QUICK);
    } else {
      figure.finish(() => reveal(LOADER_SETTINGS));
    }
  };

  // HAX marks the screen .loaded, then [hidden], when the page is ready
  const watch = new MutationObserver(() => {
    if (!screen.classList.contains("loaded") && !screen.hidden) return;
    watch.disconnect();
    ready();
  });
  watch.observe(screen, { attributes: true, attributeFilter: ["class", "hidden"] });
}

holdLoadingScreen();
