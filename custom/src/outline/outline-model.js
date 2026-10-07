/**
 * The site's page tree (HAXcms manifest items, JSON Outline Schema) as used
 * by the sidebar nav and the outline builder, plus the two writes they need:
 * creating a page and saving a whole outline. Both go through HAXcms's own
 * site editor (haxcms-site-editor), which handles auth and refreshes the
 * manifest afterwards.
 */
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { HAX_GUESSED_ICON } from "../types/page-icon.js";

const byOrder = (a, b) => (Number(a.order) || 0) - (Number(b.order) || 0);

/** Items grouped by parent id (null for the top level), each list in order. */
export function childrenMap(items) {
  const map = new Map();
  for (const item of items || []) {
    const key = item.parent || null;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
  }
  for (const list of map.values()) list.sort(byOrder);
  return map;
}

/** Depth-first flat list: [{ item, depth }]. */
export function flatten(items, rootId = null) {
  const kids = childrenMap(items);
  const out = [];
  const walk = (parent, depth) => {
    for (const item of kids.get(parent) || []) {
      out.push({ item, depth });
      walk(item.id, depth + 1);
    }
  };
  walk(rootId, 0);
  return out;
}

/** Ids of an item's ancestors, nearest first. */
export function ancestors(items, id) {
  const byId = new Map((items || []).map((i) => [i.id, i]));
  const out = [];
  let cur = byId.get(id);
  while (cur?.parent && byId.has(cur.parent)) {
    out.push(cur.parent);
    cur = byId.get(cur.parent);
  }
  return out;
}

function siteEditor() {
  return store.cmsSiteEditor?.instance ?? globalThis.document.querySelector("haxcms-site-editor");
}

/** A content type's starter content (its template), or an empty paragraph. */
export function starterContent(pageType) {
  const defs = store.manifest?.items?.find?.((i) => i.metadata?.pageType === "oer:system")?.metadata?.oerContentTypes;
  const type = defs?.types?.find?.((t) => t.id === pageType);
  return (type?.template || "").trim() || "<p></p>";
}

/**
 * Create a page at the end of `parent`'s children (null = top level),
 * optionally of a content type.
 */
export function createPage(title, parent = null, pageType = "") {
  const siblings = childrenMap(store.manifest?.items).get(parent || null) || [];
  const last = siblings[siblings.length - 1];
  const order = last ? (Number(last.order) || 0) + 1 : 0;
  const target = siteEditor() || globalThis.document.body;
  target.dispatchEvent(
    new CustomEvent("haxcms-create-node", {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        originalTarget: target,
        values: {
          node: { title: title || "New page", location: "", contents: starterContent(pageType) },
          order,
          parent: parent || null,
          ...(pageType ? { metadata: { pageType } } : {}),
        },
      },
    }),
  );
}

/**
 * Save an outline: `items` is the full item list in JSON Outline Schema
 * form, with `new`, `modified` and `delete` flags as HAX's own outline
 * designer sends them.
 */
export function saveOutline(items) {
  const before = store.manifest;
  // Only new, changed and deleted items go to HAXcms. Its outline save
  // processes every item it's sent, rewriting site.json and rebuilding the
  // feeds and search index (which reads every page) once per item, so
  // sending the whole outline took minutes on a large site; unchanged items
  // need nothing, and each sent item is handled on its own.
  const changed = (items || [])
    .filter((i) => i && (i.new || i.modified || i.delete))
    // pages keep no icon unless one was chosen (types/page-icon.js)
    .map((i) => (i.metadata?.icon === HAX_GUESSED_ICON ? { ...i, metadata: { ...i.metadata, icon: "" } } : i));
  if (!changed.length) return Promise.resolve(false);
  siteEditor()?.saveOutline?.({ detail: changed });
  return manifestChange(before);
}

/**
 * Resolves once HAXcms has reloaded the manifest after a write (the store
 * swaps in a new manifest object), or after `timeout` ms.
 */
export function manifestChange(before = store.manifest, timeout = 15000) {
  return new Promise((resolve) => {
    const started = Date.now();
    const check = () => {
      if (store.manifest !== before) resolve(true);
      else if (Date.now() - started > timeout) resolve(false);
      else setTimeout(check, 200);
    };
    setTimeout(check, 200);
  });
}

export const newItemId = () => `item-${globalThis.crypto.randomUUID()}`;

/**
 * What deleting pages `ids` takes with it: their sub-pages (hidden ones
 * too) and the archived versions of all of them. HAXcms deletes only the
 * items it is told to, which would leave the rest pointing at a missing
 * parent.
 */
export function deletionSet(items, ids) {
  const out = new Set(ids);
  let grew = true;
  while (grew) {
    grew = false;
    for (const i of items || []) {
      if (out.has(i.id)) continue;
      if (out.has(i.parent) || out.has(i.metadata?.oerSnapshotOf)) {
        out.add(i.id);
        grew = true;
      }
    }
  }
  return out;
}
