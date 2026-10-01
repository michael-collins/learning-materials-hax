/**
 * Content types: named kinds of page (Lesson, Article, Pathway…) with their
 * own fields and rules about what they may contain, like the collections of
 * learning-materials-decapcms.
 *
 * Storage (HAXcms has no content-type system and no free-form site
 * settings, but it keeps any metadata on outline items):
 * - Definitions live in `metadata.oerContentTypes` of one hidden system
 *   page (`pageType: "oer:system"`), edited by oer-type-editor.
 * - A page's type is its `metadata.pageType` (HAX's own page-type field),
 *   always prefixed `oer:` so it can't collide with HAX's own values
 *   (lesson, project…, which carry HAX icons and labels);
 *   its field values are `metadata.oerFields`.
 * All writes go through saveOutline, so each change is one git commit.
 *
 * Definition shape:
 *   { version: 1, types: [{ id, label, icon, description,
 *       children: null (any type) | [] (none) | [typeId…],
 *       fields: [{ name, label, kind, help?, required?, header?, options? }] }] }
 * Field kinds: text, longtext, number, select, list, boolean, date, image, url.
 */
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { saveOutline, newItemId } from "../outline/outline-model.js";

/** Every content type id carries this prefix (see the header comment). */
export const TYPE_PREFIX = "oer:";
export const SYSTEM_TYPE = "oer:system";
export const SECTION_TYPE = "oer:section";
/**
 * Headings: outline items that only label a group of the pages after them
 * in the sidebar (Decap's "Library", "Assessments"…). They are hidden from
 * menus (stock themes skip them), hold no sub-pages and are never a stop in
 * Previous / Next, so grouping never changes a page's URL.
 */
export const HEADING_TYPE = "oer:heading";
export const HEADING_DEF = { id: HEADING_TYPE, label: "Heading", icon: "oer:heading-2", children: [], fields: [] };
export const isHeading = (item) => item?.metadata?.pageType === HEADING_TYPE;

export const FIELD_KINDS = [
  { kind: "text", label: "Text" },
  { kind: "longtext", label: "Long text" },
  { kind: "number", label: "Number" },
  { kind: "select", label: "Choice" },
  { kind: "list", label: "List" },
  { kind: "boolean", label: "Yes / no" },
  { kind: "date", label: "Date" },
  { kind: "image", label: "Image URL" },
  { kind: "url", label: "Link" },
  { kind: "relation", label: "Link to pages" },
  { kind: "files", label: "Files and links" },
];

const items = () => toJS(store.manifest?.items) || [];

export const isSystemItem = (item) => item?.metadata?.pageType === SYSTEM_TYPE;

export function systemItem(list = items()) {
  return list.find(isSystemItem) || null;
}

/** The current definitions ({ version, types }). */
export function contentTypes(list = items()) {
  const defs = systemItem(list)?.metadata?.oerContentTypes;
  return defs && Array.isArray(defs.types) ? defs : { version: 1, types: [] };
}

export function typeById(id, list = items()) {
  return contentTypes(list).types.find((t) => t.id === id) || null;
}

/**
 * Types allowed directly inside a page of type `parentTypeId` (null = the
 * top level, where any type may go). A parent without a known type allows
 * anything.
 */
export function allowedChildTypes(parentTypeId, list = items()) {
  const all = contentTypes(list).types;
  if (!parentTypeId) return all;
  const parent = all.find((t) => t.id === parentTypeId);
  if (!parent || parent.children === null || parent.children === undefined) return all;
  return all.filter((t) => parent.children.includes(t.id));
}

export function canContain(parentTypeId, childTypeId, list = items()) {
  if (!childTypeId) return true;
  return allowedChildTypes(parentTypeId, list).some((t) => t.id === childTypeId);
}

/** Pages per type id, for "used by n pages". */
export function typeUsage(list = items()) {
  const counts = new Map();
  for (const item of list) {
    const t = item.metadata?.pageType;
    if (t && t !== SYSTEM_TYPE) counts.set(t, (counts.get(t) || 0) + 1);
  }
  return counts;
}

/** A machine id from a label: "Case study" → "oer:case-study". */
export const typeIdFrom = (label) =>
  TYPE_PREFIX +
  (String(label || "")
    .replace(/^oer:/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "type");

/** Field key from a label: "Estimated duration" → "estimatedDuration". */
export const fieldNameFrom = (label) => {
  const words = String(label || "")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return words.map((w, i) => (i ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase())).join("") || "field";
};

/**
 * Save new definitions. The first save creates the hidden system page.
 * `extraChanges(item)` may return a changed copy of any other item to save
 * in the same request (e.g. pages renamed to a new type id).
 */
export async function saveContentTypes(defs, extraChanges = null) {
  const list = items();
  const sys = systemItem(list);
  const out = list.map((item) => {
    if (sys && item.id === sys.id) {
      return { ...item, metadata: { ...item.metadata, oerContentTypes: defs }, modified: true };
    }
    const changed = extraChanges?.(item);
    return changed ? { ...changed, modified: true } : item;
  });
  if (!sys) {
    const top = list.filter((i) => !i.parent);
    out.push({
      id: newItemId(),
      title: "Content types",
      parent: null,
      order: top.length,
      indent: 0,
      location: "",
      description: "Site configuration: content type definitions (hidden).",
      metadata: { pageType: SYSTEM_TYPE, hideInMenu: true, published: false, oerContentTypes: defs },
      contents: "<p>This page stores the site's content type definitions.</p>",
      new: true,
    });
  }
  return saveOutline(out);
}

function siteEditor() {
  return store.cmsSiteEditor?.instance ?? null;
}

/**
 * Save one page's type and field values (one outline save), then its
 * description if that changed (HAX keeps descriptions out of outline saves;
 * they go through the page-details operation instead).
 */
export async function savePageDetails(id, { pageType, description, fields }) {
  const list = items();
  const current = list.find((i) => i.id === id);
  const out = list.map((item) => {
    if (item.id !== id) return item;
    // HAXcms merges metadata on outline saves (oerFields too, key by key),
    // so clear with "" or [] (a missing key would leave the old value)
    const cleared = {};
    for (const [k, v] of Object.entries(item.metadata?.oerFields || {})) {
      if (!(k in fields)) cleared[k] = Array.isArray(v) ? [] : "";
    }
    const metadata = { ...item.metadata, oerFields: { ...cleared, ...fields } };
    metadata.pageType = pageType || "";
    return { ...item, metadata, modified: true };
  });
  await saveOutline(out);
  if (current && typeof description === "string" && description !== (current.description || "")) {
    // the items API reads `description` at the top level (as HAX's own
    // "edit description" program sends it), not inside `details`
    await siteEditor()?.saveNodeDetails?.({ detail: { id, operation: "setDescription", description } });
  }
}
