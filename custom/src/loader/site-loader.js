/**
 * The loading screen (#loading, from HAX's index.html). HAX fades it out as
 * soon as the first page's content arrives, which cut the building figure
 * off part-way. From here:
 *  - the figure is drawn in the page, in the site's light/dark choice (as
 *    an image it could only follow the system's), starting from the empty
 *    plate theme/theme.css shows until now;
 *  - once HAX says the page is ready, the screen stays until the figure has
 *    finished building its page (looping meanwhile on slow loads), then
 *    dissolves into the site, whose background is the screen's colour.
 * Not held for reduced motion, LMS embeds, or tabs that loaded out of view.
 * If this never runs, HAX's own fade still applies.
 */
import { BUILT_AT, CYCLE_MS, FIGURE_CSS, FIGURE_HTML } from "./building-figure.generated.js";
import { isEmbedded } from "../embed/embed-mode.js";

// the figure leaves first, then the screen
const DISSOLVE_MS = 700;

/** Dark as HAX's site builder decides it: the system's dark, or dark mode switched on here. */
export function siteIsDark() {
  let chosen = false;
  try {
    chosen = JSON.parse(globalThis.localStorage.getItem("app-hax-darkMode")) === true;
  } catch {
    chosen = false;
  }
  return !!globalThis.matchMedia?.("(prefers-color-scheme: dark)").matches || chosen;
}

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

  const figure = doc.createElement("div");
  figure.className = "oer-loader-figure";
  figure.setAttribute("aria-hidden", "true");
  figure.toggleAttribute("dark", dark);
  const shadow = figure.attachShadow({ mode: "open" });
  shadow.innerHTML = `<style>${FIGURE_CSS}</style>${FIGURE_HTML}`;
  (screen.querySelector(".messaging") || screen).prepend(figure);

  const reduced = !!globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  let unseen = doc.visibilityState === "hidden";
  const onVisibility = () => {
    if (doc.visibilityState === "hidden") unseen = true;
  };
  doc.addEventListener("visibilitychange", onVisibility);

  const dissolve = () => {
    doc.removeEventListener("visibilitychange", onVisibility);
    // keep the built page still while it fades, onto the site's own
    // background (a reader skin's, say)
    for (const a of shadow.getAnimations()) a.pause();
    const site = doc.querySelector(".haxcms-theme-element");
    const bg = site && globalThis.getComputedStyle(site).backgroundColor;
    if (bg && !/^(transparent|rgba\(0, 0, 0, 0\))$/.test(bg)) screen.style.backgroundColor = bg;
    screen.classList.add("oer-dissolve");
    setTimeout(
      () => {
        screen.classList.add("oer-gone");
        screen.setAttribute("hidden", "hidden");
        screen.setAttribute("aria-busy", "false");
        figure.remove();
      },
      reduced ? 200 : DISSOLVE_MS + 50,
    );
  };

  // when the page is ready, wait for the next moment the figure's page is
  // complete (the first one at least)
  const ready = () => {
    if (reduced || unseen || isEmbedded() || framed()) {
      dissolve();
      return;
    }
    const t = Number(shadow.getAnimations()[0]?.currentTime) || 0;
    const built = BUILT_AT * CYCLE_MS;
    const at = t <= built ? built : Math.ceil((t - built) / CYCLE_MS) * CYCLE_MS + built;
    setTimeout(dissolve, at - t);
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
