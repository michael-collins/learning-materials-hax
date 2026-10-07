/**
 * Pages have no icon unless someone chooses one.
 *
 * HAX's site store gives every page that has a page type but no icon a
 * guess from the type each time it builds its page list (haxcms-site-store
 * routerManifest, iconFromPageType). For this site's oer: types the guess
 * is always the same icon. It lives only in the browser, but it showed
 * beside every page title, and any save that sent the page back wrote it to
 * the page for good. So that icon reads as "no icon" here, and saves leave
 * it out.
 */
export const HAX_GUESSED_ICON = "courseicons:learning-objectives";

/** The page's own icon, or "" (never HAX's guess). */
export const pageIcon = (item) => {
  const icon = item?.metadata?.icon || "";
  return icon === HAX_GUESSED_ICON ? "" : icon;
};
