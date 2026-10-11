/**
 * What the selection is called, and the keys on its name tag (nu-hax
 * docs/editor-redesign/spec.md §4.1, §4.2, §7.1): the same for the
 * selection frame's label (oer-block-frame) and the phone dock
 * (oer-block-rail), which draw it.
 *
 *   describeUnit(unit)  { name, said, crumbs, chips }
 *     name    what the name tag shows: "What you'll learn", "Outcome 2 of
 *             3", "Paragraph"
 *     said    its accessible name, which holds name: "What you'll learn,
 *             section 3 of 10, 3 outcomes", "Outcome 2 of 3 in What
 *             you'll learn"
 *     crumbs  the levels around it, outermost first: [{ label, unit }]
 *     chips   its state: [{ id: "hidden" | "empty" | "source", label, run? }]
 *   nameTagKeydown(e, unit, { actions })   true when it handled the key
 *   parentUnit(unit)                       the level above, or null
 *   bringIntoView(unit)                    scrolls it into view for its name
 *                                          tag, when too little of it shows
 *   watchBlockList(back)                   Escape out of the block list
 *                                          just opened gives focus back
 *   hasSettings(unit)                      whether a block has settings
 *   ringOf(unit, geometry), railTopOf(ring, view, height), RAIL_X
 *                                          where the ring and the rail go
 *
 * Keys on the name tag, in the Selected state (a unit as a whole, no caret):
 *   Enter            into its first field (Typing)
 *   Escape           up a level: an item's section, a column's layout; at
 *                    the top, says how to reach the editing bar
 *   ↑ ↓ (← → too for cards and chips), Home, End
 *                    the unit before or after it, the first or the last
 *   Alt+Shift+arrows move it (ops.js)
 *   Mod+Enter        add after it: an item of its kind, or (a section, a
 *                    block) the block list for the gap below it (Escape
 *                    there comes back to the name tag)
 *   Mod+Shift+D      duplicate it
 *   Delete           remove it (Backspace too: there's no text to delete)
 *   Shift+F10        its actions (the rail's menu for it)
 * Moving to another unit says its name in the live region, as focus stays
 * on the same name tag, and brings it into view: focus on a name tag
 * scrolled away is focus no one can see (WCAG 2.4.11).
 */
import { policyOf, labelOf, phraseOf, unitOf, TEXT_FIELDS } from "./policy.js";
import { ops, peersOf, HIDDEN } from "./ops.js";
import { announce } from "./announce.js";
import { isMac } from "./stock.js";
import { editorState, contentView } from "./editor-state.js";

const plural = (n, noun) => `${n} ${noun}${n === 1 ? "" : "s"}`;
const isBody = (el) => el?.localName === "hax-body";
const haxStore = () => globalThis.HaxStore?.requestAvailability?.() ?? null;

// focus as the person sees it, inside shadow roots
function deepActive() {
  let el = globalThis.document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el;
}

/** Whether an item's units run along a line (cards, chips), so ← → move between them. */
export function runsAlong(unit) {
  return policyOf(unit).kind === "item" && ["cards", "chips"].includes(policyOf(unit.parentElement).flow);
}

/** The level above a unit: an item's section, a block's layout; null at the top. */
export function parentUnit(unit) {
  const parent = unit?.parentElement;
  return parent && !isBody(parent) ? unitOf(parent) : null;
}

// the items of a section, or the sections of the page
const itemsOf = (section) => [...section.children].filter((c) => policyOf(c).kind === "item");
const sectionsOf = (body) => [...body.children].filter((c) => policyOf(c).kind === "section");

/** What the name tag says for a unit (see the top of this file). */
export function nameOf(unit) {
  const policy = policyOf(unit);
  if (policy.kind === "item") {
    const peers = itemsOf(unit.parentElement).filter((c) => c.localName === unit.localName);
    return `${policy.label || labelOf(unit)} ${peers.indexOf(unit) + 1} of ${peers.length}`;
  }
  if (policy.kind === "layout") return "Columns";
  return policy.label || labelOf(unit);
}

/** The unit's name, place and state, for its name tag and the live region. */
export function describeUnit(unit) {
  if (!unit?.isConnected) return null;
  const policy = policyOf(unit);
  const name = nameOf(unit);
  const crumbs = [];
  for (let up = parentUnit(unit); up; up = parentUnit(up)) crumbs.unshift({ label: nameOf(up), unit: up });
  const chips = [];
  const hidden = unit.hasAttribute(HIDDEN);
  if (hidden) chips.push({ id: "hidden", label: "Hidden" });
  // (a section knows whether readers see it; an item whether it has words)
  const empty = policy.kind === "section" ? unit.shown === false : policy.kind === "item" ? unit.hasText === false : false;
  if (empty && !hidden) chips.push({ id: "empty", label: "Empty: readers won't see it" });
  if (policy.source) chips.push({ id: "source", label: policy.source.label, run: typeof unit.haxEditSource === "function" ? () => unit.haxEditSource() : null });
  let said = name;
  if (policy.kind === "section" && isBody(unit.parentElement)) {
    const sections = sectionsOf(unit.parentElement);
    said = `${name}, section ${sections.indexOf(unit) + 1} of ${sections.length}`;
    const items = itemsOf(unit);
    if (items.length) said += `, ${plural(items.length, (policyOf(items[0]).label || "item").toLowerCase())}`;
  } else if (crumbs.length) {
    said = `${name} in ${crumbs.at(-1).label}`;
  }
  if (hidden) said += ", hidden from readers";
  else if (empty) said += ", empty: readers won't see it";
  if (policy.source) said += `, ${policy.source.label.toLowerCase()}`;
  return { unit, name, said, crumbs, chips };
}

/* ---------- moving the selection ---------- */

// the units the arrows go through from a unit: an item's fellow items; on
// the page, every section and block (not the page's details); in a column,
// the blocks in it
function around(unit) {
  const parent = unit.parentElement;
  if (!parent) return [];
  if (policyOf(unit).kind === "item") return peersOf(unit);
  if (isBody(parent)) return [...parent.children].filter((c) => policyOf(c).kind !== "break" && c.getClientRects().length > 0);
  return peersOf(unit);
}

// select a unit (focus on its name tag) and say which it is
function go(unit) {
  if (!unit) return;
  ops.select(unit);
  const info = describeUnit(unit);
  if (info) announce(info.said);
}

// the field the caret goes into: the first one shown, in reading order
function firstField(unit) {
  const fields = unit.matches(TEXT_FIELDS) ? [unit] : [...unit.querySelectorAll(TEXT_FIELDS)];
  return fields.find((f) => !f.querySelector(TEXT_FIELDS) && f.getClientRects().length > 0) || null;
}

const ARROWS = { ArrowUp: -1, ArrowDown: 1, ArrowLeft: -1, ArrowRight: 1 };

/**
 * A key on a unit's name tag (see the top of this file). actions() opens
 * the unit's actions (Shift+F10). Returns true when the key was handled;
 * the caller stops it.
 */
export function nameTagKeydown(e, unit, { actions } = {}) {
  if (!unit?.isConnected || e.isComposing) return false;
  const mod = isMac ? e.metaKey && !e.ctrlKey : e.ctrlKey && !e.metaKey;
  const along = runsAlong(unit);
  const sideways = e.key === "ArrowLeft" || e.key === "ArrowRight";
  // Alt+Shift+arrows move it (sideways only where its kind runs along)
  if (e.altKey && e.shiftKey && !mod && e.key in ARROWS) {
    if (sideways && !along) return false;
    ops.move(unit, ARROWS[e.key]);
    return true;
  }
  if (mod && e.shiftKey && !e.altKey && e.code === "KeyD") {
    ops.duplicate(unit);
    return true;
  }
  if (mod && !e.shiftKey && !e.altKey && e.key === "Enter") {
    const { kind, pin } = policyOf(unit);
    if (kind === "item") ops.addItem(unit);
    else if (pin === "last") announce(`${phraseOf(unit, { start: true })} stays at the end`);
    else {
      globalThis.document.querySelector("oer-block-inserter")?.openFor(unit, "below");
      watchBlockList(() => editorState.requestFocus(unit));
    }
    return true;
  }
  if ((e.shiftKey && e.key === "F10") || e.key === "ContextMenu") {
    actions?.();
    return true;
  }
  if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return false;
  switch (e.key) {
    case "Enter": {
      const field = firstField(unit);
      if (field) ops.caretInto(field);
      else announce(policyOf(unit).source ? `Nothing to type here: ${policyOf(unit).source.label.toLowerCase()}` : "Nothing to type here");
      return true;
    }
    case "Escape": {
      const up = parentUnit(unit);
      if (up) go(up);
      else announce("Press Control-backtick for the editing bar");
      return true;
    }
    case "Home":
    case "End": {
      const all = around(unit);
      go(e.key === "Home" ? all[0] : all.at(-1));
      return true;
    }
    case "Delete":
    case "Backspace":
      ops.remove(unit);
      return true;
    default:
      break;
  }
  if (!(e.key in ARROWS) || (sideways && !along)) return false;
  const all = around(unit);
  const next = all[all.indexOf(unit) + ARROWS[e.key]];
  if (next) go(next);
  else announce(ARROWS[e.key] < 0 ? "Already the first" : "Already the last");
  return true;
}

/* ---------- focus that can be seen, and comes back ---------- */

// how much of a unit shows, at least, for its name tag and ring to show
const SHOWN = 48;
// and how far inside the content view it's brought
const MARGIN = 8;

/**
 * Scroll the content so a unit whose name tag takes focus shows: when
 * less than SHOWN px of it is in the content view (below the editing bar,
 * above the dock), all of it, or its top when it's taller than the view.
 * Measured now, as the editor's state may not have caught up.
 */
export function bringIntoView(unit) {
  if (!unit?.isConnected) return;
  const view = contentView();
  const r = unit.getBoundingClientRect();
  const shown = Math.min(r.bottom, view.bottom) - Math.max(r.top, view.top);
  if (!r.height || shown >= Math.min(SHOWN, r.height)) return;
  const tall = r.height > view.bottom - view.top - 2 * MARGIN;
  const dy = tall || r.top < view.top ? r.top - (view.top + MARGIN) : r.bottom - (view.bottom - MARGIN);
  const main = globalThis.document.querySelector("custom-oer-docs-theme")?.shadowRoot?.querySelector("main");
  if (view.scroller === "main" && main) main.scrollBy({ top: dy });
  else globalThis.scrollBy({ top: dy });
}

/**
 * The block list (oer-block-inserter) was just opened from the keyboard:
 * Escape out of it gives focus back (back()), which the list, opened from
 * its own gaps too, doesn't know to do. Anything else done there (adding a
 * block, a click elsewhere) ends the watch.
 */
export function watchBlockList(back) {
  const list = globalThis.document.querySelector("oer-block-inserter");
  if (!list) return;
  const stop = () => {
    globalThis.removeEventListener("keydown", key, true);
    globalThis.removeEventListener("pointerdown", stop, true);
  };
  const key = (e) => {
    if (!e.composedPath().includes(list) || e.key === "Enter") stop();
    else if (e.key === "Escape") {
      stop();
      // (once the list has closed)
      setTimeout(() => {
        const focus = deepActive();
        if (!focus || focus === globalThis.document.body) back();
      });
    }
  };
  globalThis.addEventListener("keydown", key, true);
  globalThis.addEventListener("pointerdown", stop, true);
}

/**
 * Whether a block has settings to show: HAX's fields for it (until
 * editor-redesign WP-13's block-settings.js hasSettings, which curates
 * them, takes this one's place). The frame's label and the rail's Block ▾
 * offer Block settings for it.
 */
export function hasSettings(node) {
  const settings = haxStore()?.haxSchemaFromTag?.(node.localName)?.settings || {};
  return [...(settings.configure || []), ...(settings.advanced || [])].length > 0;
}

/* ---------- where the selection's tools go ---------- */

/** The rail's left edge, from the content's left edge (spec §4.3): the same for every selection. */
export const RAIL_X = 8;
// a ring outside a unit, this far from it; or inside one as wide as the page
const RING = 4;
const INSET = 3;
// the selection's handle, beside the ring (oer-block-frame)
const HANDLE = 24;

/**
 * The ring around a unit, from the editor's geometry for it ({ view, unit,
 * dock }, editor-state.js): just outside it, or inside the edges of a unit
 * as wide as the page (a course site's section, which abuts the next),
 * whose margin has no room for it and the handle beside it (docked, there's
 * no handle: a block on a phone keeps its ring outside, off its text).
 * { top, right, bottom, left, inset }
 */
export function ringOf(unit, { view, unit: r, dock = false }) {
  const inset = !!policyOf(unit).fullBleed || r.left - RING - (dock ? 0 : HANDLE) < view.left;
  const o = inset ? -INSET : RING;
  return { top: r.top - o, bottom: r.bottom + o, left: r.left - o, right: r.right + o, inset };
}

/**
 * The rail's top: level with the ring's, kept in the view (below the
 * editing bar) while a tall unit scrolls, and never below its bottom.
 */
export function railTopOf(ring, view, height) {
  const top = view.top + 8;
  if (ring.top >= top) return ring.top;
  return Math.max(Math.min(top, ring.bottom - height), ring.top);
}
