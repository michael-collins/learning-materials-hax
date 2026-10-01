/**
 * Pathways, after learning-materials-decapcms' pathway pages
 * (composables/usePathwayData + useOutlineResolver).
 *
 * In HAX a pathway is a page of type "oer:pathway" whose sub-pages are its
 * modules; each module's sub-pages are its items. An item is usually a
 * linked chapter (`metadata.oerRef`, shown with oer-include), so it reads
 * its type, duration and status from the original page.
 * - `metadata.oerLevel` on an item (or module) tags it with one of the
 *   pathway's levels; items inherit their module's level, and untagged
 *   items belong to every level.
 * - An untyped, unlinked item without sub-pages is a planned item: a
 *   placeholder title for content not written yet.
 * - An untyped or section sub-page with sub-pages of its own inside a
 *   module is a group: its items join the module.
 */
import { html, css } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { contentTypes, isSystemItem, SECTION_TYPE } from "../types/content-types.js";
import { childrenMap } from "../outline/outline-model.js";
import { resolveLinks } from "../types/relations.js";

export const PATHWAY_TYPE = "oer:pathway";
export const SPECIALIZATION_TYPE = "oer:specialization";
export const LEVELS = ["Beginner", "Intermediate", "Advanced"];

const toList = (v) => (Array.isArray(v) ? v : typeof v === "string" && v ? v.split(",").map((s) => s.trim()).filter(Boolean) : []);
const items = () => toJS(store.manifest?.items) || [];

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

/** Position on the three-step scale (0 for a level outside it). */
export const levelSteps = (level) => LEVELS.findIndex((l) => l.toLowerCase() === String(level || "").toLowerCase()) + 1;

/** Levels in scale order (unknown ones keep their place after). */
export const sortLevels = (list) =>
  [...new Set(toList(list))].sort((a, b) => (levelSteps(a) || 99) - (levelSteps(b) || 99));

/**
 * A level as a three-step scale (●○○ / ●●○ / ●●●) plus its name, so the
 * difference reads without relying on colour.
 */
export function levelChip(level, cls = "") {
  const steps = levelSteps(level);
  return html`<span class="level ${cls}"
    ><span class="steps" aria-hidden="true">${[1, 2, 3].map((i) => html`<span class="${i <= steps ? "on" : ""}"></span>`)}</span>${level}</span
  >`;
}

export const inDevelopmentBadge = (cls = "") => html`<span class="dev ${cls}">${lucide("oer:circle-dashed", "xs")}In development</span>`;

/** Styles for levelChip and inDevelopmentBadge, shared by every view. */
export const pathwayChipStyles = css`
  .level {
    display: inline-flex;
    flex: none;
    align-items: center;
    gap: 0.375rem;
    padding: 0.125rem 0.5rem;
    border: 1px solid var(--border, #e5e5e5);
    border-radius: 999px;
    background: var(--background, #fff);
    color: var(--foreground, #111);
    font-size: 0.6875rem;
    font-weight: 500;
    line-height: 1rem;
    white-space: nowrap;
  }
  .level .steps {
    display: inline-flex;
    gap: 2px;
  }
  .level .steps span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--border, #d4d4d8);
  }
  .level .steps span.on {
    background: var(--primary, #0071b6);
  }
  .dev {
    display: inline-flex;
    flex: none;
    align-items: center;
    gap: 0.25rem;
    padding: 0.125rem 0.5rem;
    border: 1px dashed color-mix(in srgb, var(--muted-foreground, #555) 50%, transparent);
    border-radius: 999px;
    background: color-mix(in srgb, var(--muted, #f4f4f5) 60%, transparent);
    color: var(--muted-foreground, #555);
    font-size: 0.6875rem;
    font-weight: 500;
    line-height: 1rem;
    white-space: nowrap;
  }
  .dev.md {
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
  }
`;

/** The pathway a page belongs to (itself, or its nearest pathway ancestor). */
export function pathwayOf(id, list = items()) {
  const byId = new Map(list.map((i) => [i.id, i]));
  for (let item = byId.get(id); item; item = byId.get(item.parent)) {
    if (item.metadata?.pageType === PATHWAY_TYPE) return item;
  }
  return null;
}

/** Levels of a pathway page, in scale order. */
export const pathwayLevels = (item) => sortLevels(item?.metadata?.oerFields?.levels);

const visibleTo = (i) => !isSystemItem(i) && !i.metadata?.oerSnapshotOf && (store.isLoggedIn || i.metadata?.published !== false);

/**
 * Everything a pathway view shows:
 * { item, fields, levels, courses, targetRole, duration, placeholder,
 *   objectives, testOut, prerequisites, modules, specializations }
 * modules: [{ id, title, href, level, items: [{ id, title, href, level,
 *   type, typeLabel, duration, planned, missing, placeholder, group }] }]
 */
export function resolvePathway(pathway, list = items(), types = contentTypes(list).types) {
  const kids = childrenMap(list.filter(visibleTo));
  const byId = new Map(list.map((i) => [i.id, i]));
  const typeOf = (i) => types.find((t) => t.id === i?.metadata?.pageType) || null;
  const isContainer = (i) => !i.metadata?.oerRef?.page && (!i.metadata?.pageType || i.metadata.pageType === SECTION_TYPE);

  const resolveItem = (page, inherited, group) => {
    const refId = page.metadata?.oerRef?.page;
    const src = refId ? byId.get(refId) : page;
    const type = typeOf(src);
    const planned = !refId && !page.metadata?.pageType && !(kids.get(page.id) || []).length;
    return {
      id: page.id,
      title: page.title,
      href: planned ? "" : page.slug,
      level: page.metadata?.oerLevel || inherited || "",
      type,
      typeLabel: type?.label || "",
      duration: src?.metadata?.oerFields?.estimatedDuration || "",
      planned,
      missing: !!refId && !src,
      placeholder: !!src?.metadata?.oerFields?.placeholder,
      group,
    };
  };

  const modules = (kids.get(pathway.id) || [])
    .filter((m) => m.metadata?.pageType !== SPECIALIZATION_TYPE)
    .map((m) => {
      const level = m.metadata?.oerLevel || "";
      const rows = [];
      for (const c of kids.get(m.id) || []) {
        const sub = kids.get(c.id) || [];
        if (sub.length && isContainer(c)) {
          const groupLevel = c.metadata?.oerLevel || level;
          for (const s of sub) rows.push(resolveItem(s, groupLevel, c.title));
        } else rows.push(resolveItem(c, level, ""));
      }
      // a module that is itself content (e.g. a linked lesson) links to it
      return { id: m.id, title: m.title, href: isContainer(m) ? "" : m.slug, level, items: rows };
    });

  const f = pathway.metadata?.oerFields || {};
  return {
    item: pathway,
    fields: f,
    levels: sortLevels(f.levels),
    courses: toList(f.courses),
    targetRole: f.targetRole || "",
    duration: f.estimatedDuration || "",
    placeholder: !!f.placeholder,
    objectives: toList(f.learningObjectives),
    testOut: toList(f.testOutCriteria),
    prerequisites: resolveLinks(f.prerequisites, list),
    modules,
    // pathways planned before they had modules list their specializations
    specializations: (kids.get(pathway.id) || []).filter((m) => m.metadata?.pageType === SPECIALIZATION_TYPE),
  };
}

/** Keep one level: untagged items apply at every level; empty modules go. */
export function filterModulesByLevel(modules, level) {
  if (!level) return modules;
  return modules
    .map((m) => ({ ...m, items: m.items.filter((i) => !i.level || i.level === level) }))
    .filter((m) => m.items.length);
}
