/**
 * Light or dark, as the reader chose with the theme's switch. HAX turns dark
 * mode on at every load when the system is dark (and stores whatever it
 * last was), so a choice of light never lasted; the choice is kept here
 * instead and wins. No choice yet: dark when the system is dark or HAX's
 * stored mode is dark, as HAX decides. (scripts/build-pages.mjs repeats
 * this for the published pages' first frame.)
 */
export const THEME_KEY = "oer-theme";

/** true for dark, false for light, null when the reader hasn't chosen. */
export function themeChoice() {
  try {
    const v = globalThis.localStorage.getItem(THEME_KEY);
    return v === "dark" ? true : v === "light" ? false : null;
  } catch {
    return null;
  }
}

export function rememberTheme(dark) {
  try {
    globalThis.localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  } catch {
    /* private window: the choice lasts this visit */
  }
}

/** Whether the site shows dark. */
export function siteIsDark() {
  const chosen = themeChoice();
  if (chosen !== null) return chosen;
  let stored = false;
  try {
    stored = JSON.parse(globalThis.localStorage.getItem("app-hax-darkMode")) === true;
  } catch {
    stored = false;
  }
  return !!globalThis.matchMedia?.("(prefers-color-scheme: dark)").matches || stored;
}
