/**
 * Column layout (grid-plate) helpers for the selection frame's layout menu:
 * find the layout around a block, its columns, and change, add or remove
 * layouts while keeping the blocks inside them.
 *
 * grid-plate always renders six column slots (col-1 … col-6); its `layout`
 * ("1-1", "2-1", "1-1-1", …) says how many are used and their ratio.
 */

import { clearStraySlots } from "./slots.js";

const isLayoutEl = (el) => el?.localName === "grid-plate";

/** The closest column layout containing `node` (or `node` itself). */
export function layoutOf(body, node, { self = true } = {}) {
  let el = self ? node : node?.parentElement;
  while (el && el !== body) {
    if (isLayoutEl(el)) return el;
    el = el.parentElement;
  }
  return null;
}

export const columnCount = (grid) => (typeof grid?.layout === "string" ? grid.layout.split("-").length : 1);

/** Rects of a layout's used columns. */
export function columnRects(grid) {
  const cols = [...(grid.shadowRoot?.querySelectorAll("[id^='col']") || [])].slice(0, columnCount(grid));
  return cols.map((c) => c.getBoundingClientRect()).filter((r) => r.width > 0);
}

/** The presets grid-plate offers, as [{ key, label, ratios }]. */
export function layoutPresets(grid) {
  const layouts = grid?.layouts || globalThis.document.createElement("grid-plate").layouts || {};
  return Object.entries(layouts).map(([key, v]) => ({
    key,
    label: (v.columnLayout || key).replace(/^\d+:\s*/, ""),
    ratios: key.split("-").map(Number),
  }));
}

const settle = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

/**
 * Change a layout's preset. Blocks in columns the new preset drops move to
 * its last column instead of disappearing.
 */
export function setLayout(grid, key) {
  const count = key.split("-").length;
  const last = `col-${count}`;
  for (const child of [...grid.children]) {
    const n = Number((child.getAttribute("slot") || "col-1").replace("col-", ""));
    if (n > count) child.setAttribute("slot", last);
  }
  grid.layout = key;
}

/** Wrap a block in a new column layout; the block becomes column 1. */
export async function wrapInColumns(hax, node, key) {
  const body = hax.activeHaxBody;
  const parent = node.parentElement;
  const before = new Set(parent.children);
  body.__addAbove = false;
  body.haxInsert("grid-plate", "", { layout: key }, node);
  await settle();
  const grid = [...parent.children].find((el) => !before.has(el) && el.localName === "grid-plate");
  if (!grid) return null;
  grid.append(node);
  node.setAttribute("slot", "col-1");
  return grid;
}

/** Remove a layout, keeping its blocks (column by column) where it was. */
export function removeLayout(grid) {
  // a nested layout hands its column to its blocks; at page level they
  // carry no slot (a stray slot attribute can be left on the grid itself)
  const ownSlot = isLayoutEl(grid.parentElement) ? grid.getAttribute("slot") : null;
  const order = (el) => Number((el.getAttribute("slot") || "col-1").replace("col-", ""));
  const kids = [...grid.children].sort((a, b) => order(a) - order(b));
  for (const kid of kids) {
    grid.before(kid);
    if (ownSlot) kid.setAttribute("slot", ownSlot);
    else kid.removeAttribute("slot");
  }
  grid.remove();
  if (!ownSlot) clearStraySlots(kids);
  return kids[0] || null;
}
