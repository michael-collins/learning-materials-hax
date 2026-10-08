/**
 * Page order as HAXcms stores it, for outline saves (outline-model.js).
 *
 * HAXcms renumbers every page's children 0, 1, 2… when it loads site.json
 * (json-outline-schema's unflattenItems sorts each parent's children by
 * order, ties in site.json order, and overwrites `order` with the rank), but
 * only in the browser: site.json keeps its own numbers, with gaps where
 * pages were deleted or moved. So the items the editor hands out carry
 * ranks. Saving ranks for some pages while their siblings keep their stored
 * numbers ties or crosses them, and the navigation reorders.
 *
 * storedOrders() turns the items a save sends back into stored numbers:
 * - a page that stays where it is keeps its stored order
 * - a page that moves, or a new one, gets a number between the stored
 *   orders of the pages it now sits between; where there's no room (orders
 *   are whole numbers), the siblings after it move down by as little as
 *   they need, and are sent too
 * Nothing else changes, so a save that only edits pages never renumbers.
 */

const NONE = Symbol("none");

/**
 * changed: the items the save sends (new, modified or deleted), orders as
 *   the editor numbers them (each parent's children by rank)
 * current: the editor's items (that numbering)
 * stored: Map id → { order, parent } from site.json
 * → { items: the changed items with stored orders, then any siblings that
 *   had to move; moved: ids of those siblings }
 */
export function storedOrders(changed, current, stored) {
  const now = new Map(current.map((i, index) => [i.id, { item: i, index }]));
  const sent = new Map(changed.map((i) => [i.id, i]));
  const parentOf = (i) => i.parent || null;
  const storedOrder = (id) => {
    const s = stored.get(id);
    const n = Number(s?.order);
    return s && Number.isFinite(n) ? n : NONE;
  };

  // which sent pages change place: new, another parent, another rank (an
  // item with no order stays where it was)
  const movedIds = new Set();
  for (const i of changed) {
    if (i.delete) continue;
    const was = now.get(i.id)?.item;
    if (!was || parentOf(was) !== parentOf(i) || (i.order !== undefined && Number(i.order) !== Number(was.order))) movedIds.add(i.id);
  }

  const out = new Map(changed.map((i) => [i.id, { ...i }]));
  // pages that stay where they are keep their stored numbers
  for (const i of out.values()) {
    if (i.delete || movedIds.has(i.id)) continue;
    const s = storedOrder(i.id);
    if (s !== NONE) i.order = s;
    else if (i.order === undefined) i.order = Number(now.get(i.id)?.item.order) || 0;
  }

  // parents a page moves into (or within): work out their order afresh
  const parents = new Set([...movedIds].map((id) => parentOf(sent.get(id))));
  const bumped = new Set();
  for (const parent of parents) {
    const members = [];
    // the pages there now, except those leaving or deleted
    for (const { item, index } of now.values()) {
      if (parentOf(item) !== parent) continue;
      const s = sent.get(item.id);
      if (s && (s.delete || parentOf(s) !== parent)) continue;
      if (movedIds.has(item.id)) continue;
      members.push({ id: item.id, key: Number(item.order) || 0, first: 1, index, moved: false });
    }
    // the pages arriving or moving within it, at the rank they were given
    let extra = current.length;
    for (const id of movedIds) {
      const s = sent.get(id);
      if (parentOf(s) !== parent) continue;
      const was = now.get(id);
      members.push({ id, key: s.order === undefined ? Infinity : Number(s.order) || 0, first: 0, index: was ? was.index : extra++, moved: true, sameParent: !!was && parentOf(was.item) === parent });
    }
    // a moved page goes before a page that has the same rank
    members.sort((a, b) => a.key - b.key || a.first - b.first || a.index - b.index);

    let prev = -Infinity;
    members.forEach((m, at) => {
      const s = storedOrder(m.id);
      // the next page that keeps its place bounds this one
      let next = Infinity;
      let run = 1;
      for (let j = at + 1; j < members.length; j++) {
        const n = members[j];
        const ns = storedOrder(n.id);
        if (!n.moved && ns !== NONE) {
          next = ns;
          break;
        }
        run++;
      }
      let value;
      if (!m.moved && s !== NONE && s > prev) value = s;
      // a moved page keeps its number when it, and the moved pages after it,
      // still fit before the next page that stays (not when the whole list
      // moved: then it's numbered afresh)
      else if (m.moved && m.sameParent && s !== NONE && s > prev && s + run - 1 < next && next !== Infinity) value = s;
      else if (prev === -Infinity) value = next === Infinity ? 0 : Math.max(0, next - run);
      else value = prev + 1;
      prev = value;
      if (out.has(m.id)) out.get(m.id).order = value;
      else if (value !== s) {
        out.set(m.id, { ...now.get(m.id).item, order: value, modified: true });
        bumped.add(m.id);
      }
    });
  }
  return { items: [...out.values()], moved: bumped };
}

/**
 * Where a new last child of `parent` goes, in stored numbers: one after the
 * highest stored order among its children (0 for the first).
 */
export function nextStoredOrder(parent, current, stored) {
  const orders = current.filter((i) => (i.parent || null) === (parent || null)).map((i) => Number(stored.get(i.id)?.order ?? i.order));
  const finite = orders.filter(Number.isFinite);
  return finite.length ? Math.max(...finite) + 1 : 0;
}
