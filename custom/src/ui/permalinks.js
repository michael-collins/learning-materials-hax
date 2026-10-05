/**
 * Permanent links: `<site>/?p=<page id>` (and `&version=1.2.0` for a
 * release). HAX addresses come from page titles, so renaming or moving a
 * page changes its address and breaks citations; a page's id never changes.
 * The site root always loads, and the theme then goes to wherever the page
 * lives now (its archived copy for a version).
 */
import { versionsOf } from "../versions/versioning.js";

/** The permanent link for a page, optionally for one of its releases. */
export function permalinkFor(id, version = "") {
  const url = new URL("./", globalThis.document.baseURI);
  url.searchParams.set("p", id);
  if (version) url.searchParams.set("version", version);
  return url.href;
}

/**
 * Follow `?p=` once the outline is loaded: replace the address with the
 * page's current one (keeping the reader's history clean) and route there.
 * Returns true when it navigated.
 */
export function followPermalink(items) {
  const params = new URLSearchParams(globalThis.location.search);
  const id = params.get("p");
  if (!id || !items?.length) return false;
  const page = items.find((i) => i.id === id);
  if (!page) return false;
  const version = params.get("version");
  const release = version ? versionsOf(page.metadata?.oerSnapshotOf || page.id, items).find((v) => v.version === version) : null;
  const target = release?.snapshot || page;
  params.delete("p");
  params.delete("version");
  const rest = params.toString();
  globalThis.history.replaceState({}, "", `${target.slug}${rest ? `?${rest}` : ""}${globalThis.location.hash}`);
  globalThis.dispatchEvent(new PopStateEvent("popstate"));
  return true;
}
