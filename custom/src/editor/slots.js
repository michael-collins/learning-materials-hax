/**
 * Geometry shared by the block frame (selection ring + drag handle), the
 * rail and the inserter: where the selection frame sits, and the empty
 * "slots" between blocks that a new or dragged block can go into.
 *
 * Slots exist between the top-level blocks of the page body and between
 * the blocks inside each layout container (grid-plate columns), including
 * empty columns.
 */

export const RING_OFFSET = 4; // frame sits this far outside the block
export const FULL_HANDLE_HEIGHT = 60; // shorter frames show only the grip
export const HANDLE_WIDTH = 20;
const MIN_SLOT = 16;

/**
 * The selection frame around a block, in viewport coordinates. `compact`
 * frames are too short for the handle's ↑ ⠿ ↓ and show just the grip (move
 * up / down stay in the rail's Block menu).
 */
export function frameRect(node) {
  const r = node.getBoundingClientRect();
  const top = r.top - RING_OFFSET;
  const bottom = r.bottom + RING_OFFSET;
  return {
    top,
    bottom,
    left: r.left - RING_OFFSET,
    right: r.right + RING_OFFSET,
    height: bottom - top,
    compact: bottom - top < FULL_HANDLE_HEIGHT,
    block: r,
  };
}

const isBlock = (el) => el.localName !== "page-break" && el.getClientRects().length > 0;

function layoutContainers(body) {
  const seen = new Set();
  for (const child of body.querySelectorAll("[slot]")) {
    const parent = child.parentElement;
    if (!parent || parent === body || seen.has(parent)) continue;
    const isLayout = body.__isLayout ? body.__isLayout(parent) : parent.localName === "grid-plate";
    if (isLayout) seen.add(parent);
  }
  // grid-plates with no children yet still offer their columns
  for (const grid of body.querySelectorAll("grid-plate")) seen.add(grid);
  return [...seen];
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

/**
 * Every slot on the page. A slot is
 *   { container, slotName, before, after, nested, top, height, left, width }
 * where a new block goes after `after` / in front of `before` (either may be
 * null), inside `container` (and its named slot, for layouts).
 * The slot after the last top-level block is included with `end: true`.
 */
export function computeSlots(body) {
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
    out.push({
      container: body,
      slotName: null,
      before: top[i] || null,
      after: top[i - 1] || null,
      nested: false,
      end,
      top: st,
      height: sb - st,
      left: b.left,
      width: b.width,
    });
  }

  for (const container of layoutContainers(body)) {
    for (const col of columns(container)) {
      const kids = [...container.children].filter((el) => el.getAttribute("slot") === col.name && isBlock(el));
      const kr = kids.map((el) => el.getBoundingClientRect());
      if (!kids.length) {
        const [st, sb] = padded(col.rect.top, col.rect.bottom);
        out.push({ container, slotName: col.name, before: null, after: null, nested: true, top: st, height: sb - st, left: col.rect.left, width: col.rect.width });
        continue;
      }
      for (let i = 0; i <= kids.length; i++) {
        const t = i === 0 ? col.rect.top : kr[i - 1].bottom;
        const bt = i === kids.length ? Math.max(col.rect.bottom, t) : kr[i].top;
        const [st, sb] = padded(t, bt);
        out.push({
          container,
          slotName: col.name,
          before: kids[i] || null,
          after: kids[i - 1] || null,
          nested: true,
          top: st,
          height: sb - st,
          left: col.rect.left,
          width: col.rect.width,
        });
      }
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

/**
 * Drop `slot` attributes from blocks that are no longer in a layout. HAX's
 * Block panel re-applies the slot it read earlier a moment after a block is
 * moved, so this runs again once that has happened.
 */
export function clearStraySlots(nodes) {
  const clean = () => {
    for (const n of nodes) {
      if (n?.isConnected && n.hasAttribute("slot") && n.parentElement?.localName !== "grid-plate") n.removeAttribute("slot");
    }
  };
  clean();
  setTimeout(clean, 150);
  setTimeout(clean, 600);
}

/** Put an existing block into a slot. */
export function placeInSlot(node, slot) {
  if (slot.before) slot.before.before(node);
  else if (slot.after) slot.after.after(node);
  else slot.container.append(node);
  if (slot.slotName) node.setAttribute("slot", slot.slotName);
  else clearStraySlots([node]);
}

/** Insert a new block into a slot via HAX, returning the new element. */
export async function insertInSlot(hax, slot, { tag, content = "", properties = {} }) {
  const body = hax.activeHaxBody;
  const before = new Set(slot.container.children);
  const beforeBody = new Set(body.children);
  // haxInsert(tag, content, props, afterNode) puts the block after afterNode,
  // copying afterNode's layout slot
  let after = slot.after;
  if (!after && !slot.nested) after = [...body.children].find((el) => el.localName === "page-break");
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
