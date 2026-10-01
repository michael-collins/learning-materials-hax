/**
 * Relations between pages, after learning-materials-decapcms' typed
 * references (prerequisites: lessons, tutorials, resources… optionally
 * pinned to a version) and attachments (files or external links).
 *
 * Field kinds (content-types.js):
 * - "relation": value [{ page: itemId, version: "" | "1.2.0" }]; the field's
 *   `types` (array of type ids) limits what can be linked
 * - "files": value [{ title, url, description, alt }]
 */
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { versionsOf } from "../versions/versioning.js";
import { SYSTEM_TYPE } from "./content-types.js";

const items = () => toJS(store.manifest?.items) || [];

/** A relation value with its pages resolved: [{ page, version, item, href, missing }]. */
export function resolveLinks(value, list = items()) {
  return (Array.isArray(value) ? value : [])
    .filter((v) => v && v.page)
    .map((v) => {
      const item = list.find((i) => i.id === v.page) || null;
      const snapshot = item && v.version ? versionsOf(item.id, list).find((r) => r.version === v.version)?.snapshot : null;
      return { page: v.page, version: v.version || "", item, href: (snapshot || item)?.slug || "", missing: !item };
    });
}

/**
 * Pages that link to `pageId`, through a relation field or as an included
 * chapter: [{ item, via }] where `via` names the field (or "Included").
 */
export function usedIn(pageId, types, list = items()) {
  const out = [];
  for (const item of list) {
    if (item.id === pageId || item.metadata?.oerSnapshotOf || item.metadata?.pageType === SYSTEM_TYPE) continue;
    if (item.metadata?.oerRef?.page === pageId) {
      // the chapter's parent (the book or lesson that includes it) is the useful link
      const parent = list.find((p) => p.id === item.parent);
      out.push({ item: parent || item, via: "Includes it" });
      continue;
    }
    const type = types.find((t) => t.id === item.metadata?.pageType);
    for (const f of type?.fields || []) {
      if (f.kind !== "relation") continue;
      const value = item.metadata?.oerFields?.[f.name];
      if (Array.isArray(value) && value.some((v) => v?.page === pageId)) out.push({ item, via: f.label });
    }
  }
  // one entry per page
  const seen = new Set();
  return out.filter((o) => (seen.has(o.item.id) ? false : seen.add(o.item.id)));
}

/**
 * Upload a file to the site (HAXcms /x/api/v1/files, as its own Files
 * dialog does). Resolves to the file's site-relative URL.
 */
export async function uploadFile(file) {
  const st = store;
  const form = new FormData();
  form.append("file-upload", file, file.name);
  const headers = {};
  if (st.jwt) headers.Authorization = `Bearer ${st.jwt}`;
  const siteToken = st.appSettings?.siteToken;
  if (siteToken) headers["X-HAXCMS-Site-Token"] = siteToken;
  const url = new URL("x/api/v1/files", globalThis.document.baseURI);
  const res = await fetch(url, { method: "POST", headers, body: form, credentials: "same-origin" });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.data?.message || `Upload failed (${res.status})`);
  const saved = json?.data?.file || json?.file || {};
  return saved.url || saved.fullUrl || saved.path || "";
}

export const isImage = (url) => /\.(png|jpe?g|gif|webp|svg|avif)(\?|#|$)/i.test(String(url || ""));

export function fileLabel(url) {
  const ext = String(url || "").split(/[?#]/)[0].split(".").pop();
  return ext && ext.length <= 5 && !String(url).endsWith("/") ? ext.toUpperCase() : "Link";
}
