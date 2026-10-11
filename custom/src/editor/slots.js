/**
 * Where new and moved blocks can go (nu-hax docs/editor-redesign/spec.md
 * §4.5, §5.6, §6.1): the "slots" between units, in the containers the
 * policy (policy.js) says take them. The inserter, the selection frame's
 * drag and ops.js use them.
 *
 *   the page      hax-body, between its top-level units: sections and
 *                 blocks (kind "page")
 *   a column      each column a layout (grid-plate) uses, empty ones
 *                 included (kind "column", nested)
 *   items         a section whose items run in a flow (cards, chips, a
 *                 stack), between its items (kind "items", nested); only
 *                 when asked for ({ items: true }), as only the section's
 *                 own item goes there
 *
 * refusal(slot, what) says why a block (a tag, or an element being moved)
 * can't go in a slot, or "" when it can: never before a unit pinned first
 * (the hero) or after one pinned last (Ready to start), only what the
 * container accepts, nothing in columns that never goes in them (a
 * section), only on the page types it belongs on, and one per page.
 * insertInSlot and placeInSlot refuse the same way, doing nothing.
 *
 * And the sections a page's type starts with, in order (types/course-
 * site.js COURSE_SITE_STARTER and HUB_STARTER): standardSlot(body, tag) is
 * where a missing one goes back, after the one before it in that order.
 */
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { policyOf, policyOfTag, phraseOf } from "./policy.js";
import { COURSE_SITE_TYPE, COURSE_SITE_STARTER, COURSE_HUB_TYPE, HUB_STARTER } from "../types/course-site.js";

const MIN_SLOT = 16;
const FLOWS = new Set(["cards", "chips", "stack"]);
const START = { start: true };

const isBlock = (el) => policyOf(el).kind !== "break" && el.getClientRects().length > 0;
const isLayout = (el) => policyOf(el).kind === "layout";

/** The type of the page being edited ("oer:course-site"), or null. */
export const pageType = () => store.activeItem?.metadata?.pageType ?? null;

// the tags a starter's lines begin with
const tagsOf = (starter) => starter.split("\n").map((line) => /^<([a-z][a-z0-9-]*)/.exec(line.trim())?.[1]).filter(Boolean);
const STANDARD = { [COURSE_SITE_TYPE]: tagsOf(COURSE_SITE_STARTER), [COURSE_HUB_TYPE]: tagsOf(HUB_STARTER) };

/** The sections a page of this type starts with, in their standard order. */
export const standardSections = (type = pageType()) => STANDARD[type] || [];

// the layouts in the page: grid-plates, and anything else whose children
// sit in its named slots and that the policy calls a layout
function layoutContainers(body) {
  const seen = new Set(body.querySelectorAll("grid-plate"));
  for (const child of body.querySelectorAll("[slot]")) {
    const parent = child.parentElement;
    if (parent && parent !== body) seen.add(parent);
  }
  return [...seen].filter(isLayout);
}

// a layout's visible columns: [{ name, rect }]
function columns(container) {
  const root = container.shadowRoot;
  const out = [];
  if (!root) return out;
  // grid-plate always renders six columns; the layout ("2-1", "1-1-1", ...)
  // says how many are in use
  const used = typeof container.layout === "string" ? container.layout.split("-").length : Infinity;
  for (const col of [...root.querySelectorAll("[id^='col']")].slice(0, used)) {
    const slot = col.querySelector("slot");
    const name = slot?.getAttribute("name");
    const rect = col.getBoundingClientRect();
    if (!name || rect.width === 0 || getComputedStyle(col).display === "none") continue;
    out.push({ name, rect });
  }
  return out;
}

function padded(top, bottom) {
  if (bottom - top >= MIN_SLOT) return [top, bottom];
  const mid = (top + bottom) / 2;
  return [mid - MIN_SLOT / 2, mid + MIN_SLOT / 2];
}

// the slots between kids (top to bottom), in a box from top to bottom
function between(kids, box, base) {
  const out = [];
  const rects = kids.map((el) => el.getBoundingClientRect());
  for (let i = 0; i <= kids.length; i++) {
    const t = i === 0 ? box.top : rects[i - 1].bottom;
    const b = i === kids.length ? Math.max(box.bottom, t) : rects[i].top;
    const [top, bottom] = padded(t, b);
    out.push({ ...base, before: kids[i] || null, after: kids[i - 1] || null, top, height: bottom - top, left: box.left, width: box.width });
  }
  return out;
}

/**
 * Every slot on the page. A slot is
 *   { container, slotName, kind, before, after, nested, end, top, height, left, width }
 * where a new block goes after `after` / in front of `before` (either may be
 * null), inside `container` (and its named slot, in a column). The page's
 * slot after its last unit has `end: true`. Viewport pixels.
 */
export function computeSlots(body, { items = false } = {}) {
  const out = [];
  if (!body) return out;
  const b = body.getBoundingClientRect();
  const top = [...body.children].filter(isBlock);
  const rects = top.map((el) => el.getBoundingClientRect());
  for (let i = 0; i <= top.length; i++) {
    const end = i === top.length;
    const t = i === 0 ? (rects[0]?.top ?? b.top) - MIN_SLOT : rects[i - 1].bottom;
    const bt = end ? t + MIN_SLOT : rects[i].top;
    const [st, sb] = padded(t, bt);
    out.push({ container: body, slotName: null, kind: "page", before: top[i] || null, after: top[i - 1] || null, nested: false, end, top: st, height: sb - st, left: b.left, width: b.width });
  }
  for (const container of layoutContainers(body)) {
    for (const col of columns(container)) {
      const kids = [...container.children].filter((el) => (el.getAttribute("slot") || "col-1") === col.name && isBlock(el));
      out.push(...between(kids, col.rect, { container, slotName: col.name, kind: "column", nested: true, end: false }));
    }
  }
  if (items) {
    for (const section of top) {
      if (policyOf(section).kind !== "section" || !FLOWS.has(policyOf(section).flow)) continue;
      const kids = [...section.children].filter((el) => policyOf(el).kind === "item" && isBlock(el));
      out.push(...between(kids, section.getBoundingClientRect(), { container: section, slotName: null, kind: "items", nested: true, end: false }));
    }
  }
  return out;
}

/** The innermost slot under a point, if any. */
export function slotAt(slots, x, y, { gutter = 0 } = {}) {
  let best = null;
  for (const s of slots) {
    const left = s.nested ? s.left : s.left - gutter;
    if (x < left || x > s.left + s.width || y < s.top || y > s.top + s.height) continue;
    if (!best || s.width * s.height < best.width * best.height) best = s;
  }
  return best;
}

/** The slot nearest a point (for dropping a dragged block anywhere). */
export function nearestSlot(slots, x, y) {
  const inside = slotAt(slots, x, y, { gutter: 96 });
  if (inside) return inside;
  let best = null;
  let dist = Infinity;
  for (const s of slots) {
    const dx = x < s.left ? s.left - x : x > s.left + s.width ? x - s.left - s.width : 0;
    const dy = y < s.top ? s.top - y : y > s.top + s.height ? y - s.top - s.height : 0;
    const d = Math.hypot(dx * 2, dy); // prefer same column over same row
    if (d < dist) {
      dist = d;
      best = s;
    }
  }
  return best;
}

export const sameSlot = (a, b) =>
  !!a && !!b && a.container === b.container && a.slotName === b.slotName && a.before === b.before && a.after === b.after;

// the top-level units of the page holding el, and whether one is pinned
const unitsOf = (body) => [...body.children].filter((el) => policyOf(el).kind !== "break");

/**
 * Why `what` (a tag, or an element being moved) can't go in a slot, in a
 * sentence ("The hero stays at the top", "Only one per page"), or "".
 */
export function refusal(slot, what) {
  const node = typeof what === "string" ? null : what;
  const tag = node ? node.localName : what;
  const container = slot?.container;
  if (!tag || !container?.isConnected) return "Nowhere to add it";
  if (node && (node === container || node.contains(container))) return "Not inside itself";
  const policy = policyOfTag(tag);
  const { before, after } = slot;
  if (before && before !== node && policyOf(before).pin === "first") return `${phraseOf(before, START)} stays at the top`;
  if (after && after !== node && policyOf(after).pin === "last") return `${phraseOf(after, START)} stays at the end`;
  const body = container.closest("hax-body");
  // (a slot made by hand may not say which kind it is)
  const kind = slot.kind || (container === body ? "page" : isLayout(container) ? "column" : "items");
  if (kind === "page") {
    const units = unitsOf(container).filter((el) => el !== node);
    const at = after ? units.indexOf(after) + 1 : before ? units.indexOf(before) : units.length;
    if (policy.pin === "first" && at > 0) return `${phraseOf(tag, START)} stays at the top`;
    if (policy.pin === "last" && at < units.length) return `${phraseOf(tag, START)} stays at the end`;
    if (policy.kind === "item") return `${phraseOf(tag, START)} goes in its section`;
  } else if (kind === "column") {
    if (!policy.columns) return policy.kind === "section" ? "Sections don't go in columns" : `${phraseOf(tag, START)} doesn't go in columns`;
  } else {
    const { accepts } = policyOf(container);
    if (!accepts.includes("*") && !accepts.includes(tag)) return `${phraseOf(tag, START)} doesn't go in ${phraseOf(container)}`;
  }
  if (policy.pageTypes && !policy.pageTypes.includes(pageType())) return `${phraseOf(tag, START)} belongs on another kind of page`;
  if (policy.limit === 1 && body && [...body.querySelectorAll(tag)].some((el) => el !== node)) return "Only one per page";
  return "";
}

/**
 * Where a standard section the page doesn't have goes back: right after the
 * nearest one before it in the standard order (at the top when there's
 * none, and the end for one pinned last). Null when it isn't one of the
 * page's standard sections, or the page has it.
 */
export function standardSlot(body, tag) {
  const order = standardSections();
  const i = order.indexOf(tag);
  if (!body || i < 0 || body.querySelector(`:scope > ${tag}`)) return null;
  const units = unitsOf(body);
  const base = { container: body, slotName: null, kind: "page", nested: false, end: false };
  if (policyOfTag(tag).pin === "last") return { ...base, after: units[units.length - 1] || null, before: null, end: true };
  for (let j = i - 1; j >= 0; j--) {
    const after = units.find((el) => el.localName === order[j]);
    if (after) return { ...base, after, before: units[units.indexOf(after) + 1] || null };
  }
  return { ...base, after: null, before: units[0] || null };
}

/**
 * Drop `slot` attributes from blocks that are no longer in a layout. HAX's
 * Block panel re-applies the slot it read earlier a moment after a block is
 * moved, so this runs again once that has happened.
 */
export function clearStraySlots(nodes) {
  const clean = () => {
    for (const n of nodes) {
      if (n?.isConnected && n.hasAttribute("slot") && !isLayout(n.parentElement)) n.removeAttribute("slot");
    }
  };
  clean();
  setTimeout(clean, 150);
  setTimeout(clean, 600);
}

/** Put an existing block into a slot. Returns false, moving nothing, where it can't go. */
export function placeInSlot(node, slot) {
  if (refusal(slot, node)) return false;
  if (slot.before) slot.before.before(node);
  else if (slot.after) slot.after.after(node);
  else slot.container.append(node);
  if (slot.slotName) node.setAttribute("slot", slot.slotName);
  else clearStraySlots([node]);
  return true;
}

/**
 * Insert a new block into a slot via HAX, returning the new element, or
 * null (inserting nothing) where it can't go.
 */
export async function insertInSlot(hax, slot, { tag, content = "", properties = {} }) {
  if (refusal(slot, tag)) return null;
  const body = hax.activeHaxBody;
  const before = new Set(slot.container.children);
  const beforeBody = new Set(body.children);
  // haxInsert(tag, content, props, afterNode) puts the block after afterNode,
  // copying afterNode's layout slot
  let after = slot.after;
  if (!after && !slot.nested) after = [...body.children].find((el) => policyOf(el).kind === "break");
  if (!after) after = slot.before || slot.container;
  body.__addAbove = false;
  body.haxInsert(tag, content, properties, after);
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const added =
    [...slot.container.children].find((el) => !before.has(el)) ||
    [...body.children].find((el) => !beforeBody.has(el));
  if (!added) return null;
  // haxInsert can only go after a node; fix up the first-in-column and
  // empty-column cases
  if (slot.nested && (!slot.after || added.parentElement !== slot.container)) placeInSlot(added, slot);
  return added;
}
