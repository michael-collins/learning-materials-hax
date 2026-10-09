/**
 * The site's page tree (HAXcms manifest items, JSON Outline Schema) as used
 * by the sidebar nav and the outline builder, plus the two writes they need:
 * creating a page and saving a whole outline. Both go through HAXcms's own
 * site editor (haxcms-site-editor), which handles auth and refreshes the
 * manifest afterwards.
 */
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { HAX_GUESSED_ICON } from "../types/page-icon.js";
import { storedOrders, nextStoredOrder } from "./outline-order.js";

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
 * site.json's own order and parent for each item: Map id → { order, parent }
 * (the editor's items are renumbered; see outline-order.js), or null when
 * it can't be read.
 */
async function siteOrders() {
  try {
    const res = await fetch(new URL(`site.json?t=${Date.now()}`, globalThis.document.baseURI), { cache: "no-store" });
    if (!res.ok) return null;
    return new Map(((await res.json())?.items || []).map((i) => [i.id, { order: i.order, parent: i.parent || null }]));
  } catch {
    return null;
  }
}

/**
 * Create a page at the end of `parent`'s children (null = top level),
 * optionally of a content type.
 */
/**
 * Create a page under `parent` (null: the top level). Options: `metadata`
 * (merged in: published, oerFields…), `description`, `location` (its
 * address) and `edit` (HAXcms opens the new page in the editor once it's
 * there).
 */
export async function createPage(title, parent = null, pageType = "", { metadata = null, description = "", edit = false, location = "" } = {}) {
  const siblings = childrenMap(store.manifest?.items).get(parent || null) || [];
  const last = siblings[siblings.length - 1];
  const stored = await siteOrders();
  const order = stored ? nextStoredOrder(parent, toJS(store.manifest?.items) || [], stored) : last ? (Number(last.order) || 0) + 1 : 0;
  const target = siteEditor() || globalThis.document.body;
  target.dispatchEvent(
    new CustomEvent("haxcms-create-node", {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        originalTarget: target,
        values: {
          // location: the address to give it (HAXcms makes one from the title otherwise)
          node: { title: title || "New page", location: location || "", contents: starterContent(pageType) },
          order,
          parent: parent || null,
          ...(description ? { description } : {}),
          ...(pageType || metadata ? { metadata: { ...(metadata || {}), ...(pageType ? { pageType } : {}) } } : {}),
          ...(edit ? { merlinCreated: true } : {}),
        },
      },
    }),
  );
}

/**
 * Save an outline: `items` is the full item list in JSON Outline Schema
 * form, with `new`, `modified` and `delete` flags as HAX's own outline
 * designer sends them. Orders are the editor's (each parent's children
 * numbered by rank); they're saved in site.json's own numbering
 * (outline-order.js), so pages that don't move keep their stored order and
 * the navigation never reorders by itself. Siblings that must move down to
 * make room are saved too (whole, so they keep their descriptions).
 *
 * Saves run one at a time: HAXcms reads site.json when a save starts and
 * writes it back at the end, so a save that overlapped another would undo
 * it. Each resolves once HAXcms has finished and the manifest reloaded.
 */
let saving = Promise.resolve();
export function saveOutline(items) {
  const run = saving.then(() => sendOutline(items));
  saving = run.catch(() => {});
  return run;
}

async function sendOutline(items) {
  const before = store.manifest;
  // Only new, changed and deleted items go to HAXcms. Its outline save
  // processes every item it's sent, rewriting site.json and rebuilding the
  // feeds and search index (which reads every page) once per item, so
  // sending the whole outline took minutes on a large site; unchanged items
  // need nothing, and each sent item is handled on its own.
  let changed = (items || []).filter((i) => i && (i.new || i.modified || i.delete));
  if (!changed.length) return false;
  const current = toJS(store.manifest?.items) || [];
  const stored = await siteOrders();
  if (stored) changed = storedOrders(changed, current, stored).items;
  // pages keep no icon unless one was chosen (types/page-icon.js)
  changed = changed.map((i) => (i.metadata?.icon === HAX_GUESSED_ICON ? { ...i, metadata: { ...i.metadata, icon: "" } } : i));
  siteEditor()?.saveOutline?.({ detail: changed });
  // HAXcms commits and rebuilds the feeds for each deleted page (seconds each)
  const deletes = changed.filter((i) => i.delete).length;
  return manifestChange(before, Math.min(600000, 20000 + 6000 * deletes + 1000 * changed.length));
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
