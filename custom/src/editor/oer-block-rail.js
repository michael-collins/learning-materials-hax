/**
 * `oer-block-rail` — the one toolbar for what can be done with the
 * selection (nu-hax docs/editor-redesign/spec.md §4.3, §4.4), at a fixed
 * place: the content's left edge plus 8px, level with the selection's
 * top. Its categories follow what's selected:
 *
 *   a section (selected, or typing in its heading or text)
 *                       Section ▾, and Format ▾ while typing
 *   an item, selected   Section ▾, Outcome ▾ (Tool ▾, Question ▾)
 *   typing in an item   Section ▾, Outcome ▾, Format ▾, and Text ▾
 *                       (paragraph and lists only) in an answer
 *   an ordinary block   Block ▾, and Text ▾, Format ▾, Insert inline ▾ for text
 *
 * Section ▾ and the item's menu hold the same verbs in the same order
 * (Move, Add, Duplicate, Hide, Remove) through the editor (ops.js: one undo
 * step each, their pins and limits, Remove's question), then the unit's own
 * commands. A generated section's first command opens where its content
 * comes from ("Edit course details…"). Each block declares its commands
 * through HAX's inlineContextMenu hook (plate.ceButtons, { icon, label,
 * callback }); the rail asks it for them as a menu opens
 * (HAXStore.runHook(unit, "inlineContextMenu", [proxy])) rather than reading
 * HAX's hidden block toolbar, and calls unit[callback]() as HAX does. Hide
 * and Show come from there.
 *
 * Block ▾, Text ▾, Format ▾ and Insert inline ▾ press HAX's own controls
 * (its toolbars stay mounted, hidden by editor-skin.js), so selection
 * handling, undo and HAX's state stay intact; items whose control is
 * absent are left out. Format ▾'s Link… and Remove link are the editor's
 * own (oer-link-popover.js), and an image's Block ▾ has Change image…
 * (oer-image-popover.js frameActionOf). Move up and down go through ops.js there too (the
 * hero and Ready to start stay put). Items that can't run now are shown
 * off, with the reason ("Already first", "Only one per page", "Unlock it
 * first"). Columns… opens the Columns menu (layouts.js). Block ▾ ends with
 * the block's own: Block settings… (when it has some) and its frame
 * button (the rubric's Edit rubric), as the selection frame's label has.
 *
 * Words beside the icons (a per-viewer setting, Show labels, on by
 * default, in the first menu) show where the margin has room for them
 * beside the selection's handle.
 * Where it has no room even for the icons and the selection's handle
 * (narrow windows, 200% zoom, phones: editorState's geometry.dock), the
 * rail becomes a dock at the bottom of the window, above the on-screen
 * keyboard, holding the selection's label and its moves as well:
 *
 *   │ What you'll learn › Outcome 2 of 3       │
 *   │ [↑][↓] [Section ▾] [Outcome ▾] [Format ▾] │
 *
 * Keyboard: Alt+F10 moves focus from the content (or a name tag) to the
 * rail; Shift+F10 on a name tag opens the unit's menu. Arrows move along
 * the rail, Enter, Space and → (↑ in the dock) open a menu, Escape or ←
 * steps back, and Escape on the rail goes back where focus came from (the
 * caret where it was, or the name tag), as running a command from the
 * keyboard does, and as Escape out of the block list it opened does. Keys
 * and pastes stop at the rail, so they never edit the content behind it;
 * Ctrl and ⌘ shortcuts (Save, Undo…) go on to the editor.
 *
 * It stays below the editing bar (the part of it a unit scrolling away
 * takes up under the bar is cut off, unless it has focus or a menu open)
 * and under the block list while that's open. The dock's height is the
 * page's --oer-dock-height, which the theme and the toasts keep clear of.
 *
 * It follows the editor's state (editor-state.js), changing as it changes.
 * @element oer-block-rail
 */
import { html, css, LitElement } from "../lit.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { LUCIDE_ICONS } from "./lucide-icons.generated.js";
import { MOD, pressPlate } from "./stock.js";
import { editorState } from "./editor-state.js";
import { settingsDialog } from "./oer-settings-dialog.js";
import { insertCitation, pageReferences, linkReferenceToResource } from "./citations.js";
import { citeDialog } from "./oer-cite-dialog.js";
import { saveOutline } from "../outline/outline-model.js";
import { toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { layoutOf, columnsMenu, whyNoColumns } from "./layouts.js";
import { policyOf, phraseOf } from "./policy.js";
import { ops } from "./ops.js";
import { announce } from "./announce.js";
import { getEditRange, setEditRange } from "../ui/edit-selection.js";
import { describeUnit, nameTagKeydown, runsAlong, bringIntoView, watchBlockList, ringOf, railTopOf, RAIL_X } from "./selection-label.js";
import { hasSettings } from "./block-settings.js";
import { linkPopover, removeLink, whyNoLink } from "./oer-link-popover.js";
import { frameActionOf } from "./oer-image-popover.js";

const SEP = { sep: true };
// the room the selection's handle takes between the rail and the text
const HANDLE_ROOM = 28;
// where the viewer's Show labels setting is kept
const LABELS_KEY = "oer-rail-labels";

const haxStore = () => globalThis.HaxStore?.requestAvailability?.() ?? null;
const inserter = () => globalThis.document.querySelector("oer-block-inserter");
const frames = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

/* ---------- finding stock controls ---------- */

// every element in a stock toolbar, through slots and shadow roots
function deepAll(root, acc = []) {
  if (!root) return acc;
  for (const el of root.querySelectorAll("*")) {
    acc.push(el);
    if (el.shadowRoot) deepAll(el.shadowRoot, acc);
  }
  return acc;
}

// the native <button> a stock control renders; clicking it runs the
// control's handler (the custom element's own click() is overridden)
function nativeButton(el) {
  if (!el) return null;
  if (el.localName === "button") return el;
  const queue = [el.shadowRoot];
  while (queue.length) {
    const root = queue.shift();
    if (!root) continue;
    const b = root.querySelector("button");
    if (b) return b;
    for (const child of root.querySelectorAll("*")) queue.push(child.shadowRoot);
  }
  return null;
}

const shown = (el) => el && !el.hidden && getComputedStyle(el).display !== "none";
const disabled = (el) => !!el.disabled || el.hasAttribute?.("disabled");

// focus as the person sees it, inside shadow roots
function deepActive() {
  let el = globalThis.document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el;
}

// where focus is now, for a dialog to give it back to as it closes: the
// caret where it is, or the control that has it
function focusHere() {
  const at = deepActive();
  const body = haxStore()?.activeHaxBody;
  const range = body && at === body ? getEditRange(body) : null;
  const kept = range && body.contains(range.startContainer) ? new StaticRange(range) : null;
  return () => {
    if (kept?.startContainer.isConnected) {
      body.focus({ preventScroll: true });
      setEditRange(kept);
    } else if (at?.isConnected && at !== globalThis.document.body) at.focus({ preventScroll: true });
  };
}

// why HAX has switched a block command off, from its toolbar's state
function offReason(plate, el) {
  if (plate?.viewSource) return "Close Edit HTML first";
  if (plate?.disableOps) return "Unlock it first";
  if (plate?.hasActiveEditingElement) return "Finish editing first";
  if (el.getAttribute("event-name") === "hax-source-view-toggle" && !plate?.sourceView) return "Not for this block";
  return "Not here";
}

const byEvent = (name) => (els) => els.find((e) => e.getAttribute?.("event-name") === name);
const byCommand = (cmd, label) => (els) => els.find((e) => e.command === cmd && (!label || e.label === label));

// "an outcome", "a tool"
const withArticle = (noun) => `${/^[aeiou]/i.test(noun) ? "an" : "a"} ${noun}`;

/**
 * A unit's own commands, as it declares them to HAX's block toolbar
 * (inlineContextMenu: plate.ceButtons), each run as HAX runs them.
 */
async function ceButtonsOf(unit) {
  const hax = haxStore();
  const proxy = { ceButtons: [], activeNode: unit };
  if (unit && hax?.testHook?.(unit, "inlineContextMenu")) await hax.runHook(unit, "inlineContextMenu", [proxy]);
  return (proxy.ceButtons || []).map((b) => ({ ...b, run: () => typeof unit[b.callback] === "function" && unit[b.callback]() }));
}

/* ---------- an ordinary block's categories ---------- */

const BLOCK = [
  { label: "Move up", icon: "arrow-up", find: byEvent("hax-plate-up"), move: -1 },
  { label: "Move down", icon: "arrow-down", find: byEvent("hax-plate-down"), move: 1 },
  SEP,
  // these open oer-block-inserter's block list for that gap
  { label: "Insert block above…", icon: "arrow-up-to-line", find: byEvent("insert-above-active"), insert: "above" },
  { label: "Insert block below…", icon: "arrow-down-to-line", find: byEvent("insert-below-active"), insert: "below" },
  { label: "Duplicate", icon: "copy", find: byEvent("hax-plate-duplicate") },
  SEP,
  // the Columns menu (layouts.js), for HAX's Add and Remove column (its Add
  // made three, with the block in the middle one)
  { label: "Columns…", icon: "columns-2", columns: true },
  SEP,
  { label: "Edit HTML", icon: "code", find: byEvent("hax-source-view-toggle") },
  {
    // stock flips this item's label and icon between Lock and Unlock
    label: (el) => el.label || "Lock",
    icon: (el) => (el.icon === "icons:lock" ? "lock" : "lock-open"),
    find: (els) => els.find((e) => e.localName === "hax-context-item" && /lock/.test(e.icon || "")),
  },
  SEP,
  { label: "Remove block", icon: "trash-2", danger: true, find: byEvent("hax-plate-delete") },
];

const HEADING_ICONS = {
  p: "pilcrow",
  h2: "heading-2",
  h3: "heading-3",
  h4: "heading-4",
  h5: "heading-5",
  h6: "heading-6",
  blockquote: "quote",
  pre: "square-code",
};
const HEADING_LABELS = { p: "Paragraph", pre: "Code block", blockquote: "Quote" };

const LISTS = [
  { label: "Bulleted list", icon: "list", find: byCommand("ul") },
  { label: "Numbered list", icon: "list-ordered", find: byCommand("ol") },
  { label: "Indent", icon: "indent-increase", find: byCommand("indent"), shortcut: `${MOD}]`, needs: "In lists" },
  { label: "Outdent", icon: "indent-decrease", find: byCommand("outdent"), shortcut: `${MOD}[`, needs: "In lists" },
];

const TEXT = [
  { picker: "hax-text-editor-heading-picker", icons: HEADING_ICONS, labels: HEADING_LABELS, checked: "tag" },
  SEP,
  ...LISTS,
  SEP,
  {
    picker: "hax-text-editor-alignment-picker",
    icons: { "": "align-left", center: "align-center", right: "align-right" },
    labels: { "": "Align left", center: "Align center", right: "Align right" },
    checked: "align",
  },
];

// in a question's answer: a paragraph or a list, never a heading
const ANSWER = [{ picker: "hax-text-editor-heading-picker", icons: HEADING_ICONS, labels: HEADING_LABELS, checked: "tag", only: ["p"] }, SEP, ...LISTS];

const FORMAT = [
  { label: "Bold", icon: "bold", find: byCommand("bold"), shortcut: `${MOD}B`, toggle: true },
  { label: "Italic", icon: "italic", find: byCommand("italic"), shortcut: `${MOD}I`, toggle: true },
  { label: "Underline", icon: "underline", find: byCommand("underline"), shortcut: `${MOD}U`, toggle: true, selection: true },
  { label: "Strikethrough", icon: "strikethrough", find: byCommand("strikeThrough"), toggle: true, selection: true },
  { label: "Highlight", icon: "highlighter", find: byCommand("wrapRange", "Highlight"), toggle: true, selection: true },
  { label: "Inline code", icon: "code", find: byCommand("wrapRange", "Code"), toggle: true, selection: true },
  { label: "Subscript", icon: "subscript", find: byCommand("subscript"), toggle: true },
  { label: "Superscript", icon: "superscript", find: byCommand("superscript"), toggle: true },
  { label: "Abbreviation", icon: "whole-word", find: byCommand("wrapRange", "Abbreviation"), selection: true },
  SEP,
  // our own: the link popover (oer-link-popover.js), in place of HAX's prompt
  { label: "Link…", icon: "link", action: "link", shortcut: `${MOD}K` },
  { label: "Remove link", icon: "unlink", action: "unlink" },
  SEP,
  { label: "Clear formatting", icon: "remove-formatting", find: byCommand("removeFormat") },
];

const INSERT = [
  // our own: a numbered citation and its entry in the page's References
  { label: "Citation…", icon: "quote", action: "cite" },
  SEP,
  { label: "Symbol…", icon: "omega", grid: "rich-text-editor-symbol-picker" },
  { label: "Emoji…", icon: "smile", grid: "rich-text-editor-emoji-picker", filter: true },
  SEP,
  { label: "Math", icon: "sigma", find: byCommand("insertHTML", "Math") },
  { label: "Vocabulary", icon: "book-a", find: byCommand("insertHTML", "Vocab"), selection: true },
  { label: "Inline audio", icon: "audio-lines", find: byCommand("insertHTML", "Inline audio"), selection: true },
  { label: "Sarcasm", icon: "message-square-quote", find: byCommand("insertHTML", "Sarcasm"), selection: true },
];

const CAT = {
  block: { id: "block", label: "Block", icon: "box", source: "plate", items: BLOCK },
  text: { id: "text", label: "Text", icon: "pilcrow", source: "text", items: TEXT },
  answer: { id: "text", label: "Text", icon: "pilcrow", source: "text", items: ANSWER },
  format: { id: "format", label: "Format", icon: "type", source: "text", items: FORMAT },
  // "Insert inline" so it is not mistaken for inserting a block
  insert: { id: "insert", label: "Insert inline", icon: "smile-plus", source: "text", items: INSERT },
};

/**
 * The rail's categories for what's selected (see the top of this file): a
 * section's and an item's own (each with the unit it acts on), then the
 * text ones while typing.
 */
function categoriesFor({ unit, mode, field }) {
  const policy = policyOf(unit);
  const typing = mode === "typing";
  if (policy.kind === "section" || policy.kind === "item") {
    const item = policy.kind === "item" ? unit : null;
    const section = item ? item.parentElement : unit;
    const cats = [{ id: "section", label: "Section", icon: "panels-top-left", unit: section }];
    if (item) cats.push({ id: "item", label: policy.label || "Item", icon: "square-stack", unit: item });
    if (typing) cats.push(CAT.format);
    if (typing && item?.constructor?.textRole === "answer" && field && field !== item.titleElement) cats.push(CAT.answer);
    return cats;
  }
  const hax = haxStore();
  const text = typing || !!hax?.isTextElement?.(hax.activeNode);
  return text ? [CAT.block, CAT.text, CAT.format, CAT.insert] : [CAT.block];
}

const iconSrc = (name) => LUCIDE_ICONS[name?.includes(":") ? name : `oer:${name}`] || "";
const icon = (name) => html`<span class="icon" aria-hidden="true" style="--src:url(&quot;${iconSrc(name)}&quot;)"></span>`;

// symbol and emoji values are HTML entities
const decoder = globalThis.document.createElement("textarea");
const decode = (s) => {
  decoder.innerHTML = s;
  return decoder.value;
};

// the viewer's Show labels setting (on unless they turned it off), read once
let wantLabels = null;
function labelsWanted() {
  if (wantLabels === null) {
    try {
      wantLabels = globalThis.localStorage.getItem(LABELS_KEY) !== "off";
    } catch {
      wantLabels = true;
    }
  }
  return wantLabels;
}

class OerBlockRail extends LitElement {
  static get tag() {
    return "oer-block-rail";
  }

  static get properties() {
    return {
      _cats: { state: true },
      _open: { state: true },
      _grid: { state: true },
      _query: { state: true },
      _labels: { state: true }, // words beside the icons
      _dock: { state: true }, // drawn as the dock at the bottom
      _info: { state: true }, // the selection's name, in the dock
      _steps: { state: true }, // why the dock's moves are off: [up, down]
    };
  }

  constructor() {
    super();
    this._cats = [];
    this._open = null;
    this._grid = null;
    this._query = "";
    this._labels = labelsWanted();
    this._dock = false;
    this._info = null;
    this._steps = ["", ""];
    this.__unit = null;
    // how wide the rail is with its words, by categories
    this.__wide = new Map();
    this.__changed = () => this._sync();
    this.__focusRequest = (e) => {
      // (the frame draws the name tag unless the dock does)
      if (!e.defaultPrevented && editorState.geometry?.dock && this.focusTag(e.detail?.unit)) e.preventDefault();
    };
    this.__keys = this._globalKeys.bind(this);
    this.__outside = (e) => {
      if (this._open && !e.composedPath().includes(this)) this._close();
    };
    this.__viewport = () => this._sync();
    // under the block list while it's open (focus is in it then)
    this.__restack = () => {
      cancelAnimationFrame(this.__stacking);
      this.__stacking = requestAnimationFrame(() => this.toggleAttribute("under", !!inserter()?.matches(":focus-within")));
    };
    // HAX acts on keys and pastes anywhere in the window, at the last
    // caret in the content (Enter here split the paragraph): ours stop
    // here, except chords with Ctrl or ⌘ (Save, Exit, Undo and the site
    // editor's other shortcuts)
    const stop = (e) => {
      if (!e.ctrlKey && !e.metaKey) e.stopPropagation();
    };
    this.addEventListener("keydown", stop);
    this.addEventListener("keyup", stop);
    this.addEventListener("paste", (e) => e.stopPropagation());
  }

  connectedCallback() {
    super.connectedCallback();
    // (attributes cannot be set in the constructor of a created element)
    this.hidden = true;
    editorState.addEventListener("change", this.__changed);
    editorState.addEventListener("focusrequest", this.__focusRequest);
    globalThis.addEventListener("keydown", this.__keys, true);
    globalThis.addEventListener("pointerdown", this.__outside, true);
    for (const type of ["focusin", "keydown", "pointerdown"]) globalThis.addEventListener(type, this.__restack, true);
    // the dock stays above the on-screen keyboard
    globalThis.visualViewport?.addEventListener("resize", this.__viewport);
    globalThis.visualViewport?.addEventListener("scroll", this.__viewport);
    this._sync();
  }

  disconnectedCallback() {
    editorState.removeEventListener("change", this.__changed);
    editorState.removeEventListener("focusrequest", this.__focusRequest);
    globalThis.removeEventListener("keydown", this.__keys, true);
    globalThis.removeEventListener("pointerdown", this.__outside, true);
    for (const type of ["focusin", "keydown", "pointerdown"]) globalThis.removeEventListener(type, this.__restack, true);
    cancelAnimationFrame(this.__stacking);
    globalThis.visualViewport?.removeEventListener("resize", this.__viewport);
    globalThis.visualViewport?.removeEventListener("scroll", this.__viewport);
    super.disconnectedCallback();
  }

  /** The rail's size beside the content, for the selection frame's handle to keep clear of; null when docked or hidden. */
  get railSize() {
    const rail = !this.hidden && !this._dock ? this.shadowRoot?.querySelector(".rail") : null;
    return rail ? { width: rail.offsetWidth, height: rail.offsetHeight } : null;
  }

  /* ---------- following the editor's state ---------- */

  _sync() {
    const s = editorState;
    const unit = s.unit;
    const g = s.geometry;
    const off = !s.editing || !g || !unit?.isConnected || s.preview || s.saving || policyOf(unit).kind === "break" || !!s.body?.hasAttribute("data-oer-preview");
    if (off) {
      this._hide();
      return;
    }
    // what's selected, and its categories: while the keyboard is in the
    // tools (Alt+F10) or a menu is open, focus has left the field typed in,
    // but the text commands are still for it (not on the dock's name tag:
    // that's the unit selected as a whole)
    const held = !!this._open || this.matches(":focus-within");
    const inTools = !!this._open || !!this.shadowRoot?.querySelector(".rail")?.matches(":focus-within");
    if (s.mode === "typing") this.__typedIn = s.field;
    else if (!(inTools && this.__typedIn?.isConnected && unit.contains(this.__typedIn))) this.__typedIn = null;
    const cats = categoriesFor(this.__typedIn ? { unit, mode: "typing", field: this.__typedIn } : s);
    const key = cats.map((c) => c.id + (c.unit ? `:${c.unit.localName}` : "")).join("|");
    if (unit !== this.__unit || key !== this.__key) {
      if (unit !== this.__unit && !this.__opening) this._close();
      this.__unit = unit;
      this.__key = key;
      this._cats = cats;
    }
    const info = describeUnit(unit);
    if (JSON.stringify(info && [info.name, info.said, info.crumbs.map((c) => c.label), info.chips.map((c) => c.label)]) !== this.__infoKey) {
      this.__infoKey = JSON.stringify(info && [info.name, info.said, info.crumbs.map((c) => c.label), info.chips.map((c) => c.label)]);
      this._info = info;
    }
    // (locking takes the dock's Block settings away)
    if (s.locked !== this.__locked) {
      this.__locked = s.locked;
      this.requestUpdate();
    }
    if (g.dock) {
      // (the unit's place among the others changes why its moves are off)
      const steps = [ops.whyNot("move", unit, { dir: -1 }), ops.whyNot("move", unit, { dir: 1 })];
      if (steps.join("|") !== this._steps.join("|")) this._steps = steps;
      this._placeDock(g);
      return;
    }
    if (this._dock) {
      this._dock = false;
      this.removeAttribute("dock");
      this.style.removeProperty("--dock-bottom");
      this._dockHeight(0);
    }
    const ring = ringOf(unit, g);
    const rail = this.shadowRoot?.querySelector(".rail");
    const height = rail?.offsetHeight || 0;
    const offscreen = !g.visible;
    if (offscreen && !held) {
      this.hidden = true;
      return;
    }
    this.hidden = false;
    // level with the ring, and below the editing bar: what a unit scrolling
    // away takes up under the bar is cut off, unless it's in use
    let top = railTopOf(ring, g.view, height);
    if (held) top = Math.max(top, g.view.top + 8);
    const cut = Math.round(g.view.top - top);
    this.style.clipPath = cut > 0 ? `inset(${cut}px -100vw -100vh -100vw)` : "";
    // words beside the icons where the margin has room for them, and the
    // selection's handle between them and the unit (beside the unit's ring,
    // or inside a unit as wide as the page)
    const room = ring.inset ? g.gutter : Math.min(g.gutter, ring.left - g.view.left);
    const wide = this.__wide.get(key);
    const labels = labelsWanted() && (wide === undefined || RAIL_X + wide + 4 + HANDLE_ROOM <= room);
    if (labels !== this._labels) this._labels = labels;
    this.style.transform = `translate(${Math.round(g.view.left + RAIL_X)}px, ${Math.round(top)}px)`;
  }

  // the dock: the window's width at the bottom, above the on-screen keyboard
  _placeDock(g) {
    const vv = globalThis.visualViewport;
    const keyboard = vv ? Math.max(0, globalThis.innerHeight - (vv.offsetTop + vv.height)) : 0;
    this.hidden = false;
    if (!this._dock) {
      this._dock = true;
      this.setAttribute("dock", "");
    }
    if (!this._labels && labelsWanted()) this._labels = true;
    this.style.transform = "";
    this.style.clipPath = "";
    this.style.setProperty("--dock-left", `${Math.round(g.view.left)}px`);
    this.style.setProperty("--dock-right", `${Math.round(Math.max(0, globalThis.innerWidth - g.view.right))}px`);
    this.style.setProperty("--dock-bottom", `${Math.round(keyboard)}px`);
  }

  _hide() {
    if (this.hidden && !this.__unit) return;
    this._close();
    this.hidden = true;
    this.__unit = null;
    this.__key = "";
    this.__typedIn = null;
    if (this._dock) {
      this._dock = false;
      this.removeAttribute("dock");
    }
    this._dockHeight(0);
  }

  // how much of the window the dock covers: for the content view, and for
  // the scrollers' padding (so focus is never hidden under it, and the
  // page's end scrolls clear of it: --oer-dock-height, which the theme and
  // the toasts read)
  _dockHeight(height) {
    if (editorState.dockHeight !== height) editorState.set({ dockHeight: height });
    const root = globalThis.document.documentElement;
    if (height) {
      root.style.setProperty("--oer-dock-height", `${height}px`);
      root.style.setProperty("scroll-padding-bottom", `${height}px`);
    } else {
      root.style.removeProperty("--oer-dock-height");
      root.style.removeProperty("scroll-padding-bottom");
    }
  }

  /* ---------- menus ---------- */

  // a category's items: a section's and an item's own (asked of the unit),
  // or resolved against the stock controls present now
  async _items(cat) {
    if (cat.id === "section") return this._sectionItems(cat.unit);
    if (cat.id === "item") return this._itemItems(cat.unit);
    const items = this._stockItems(cat);
    if (cat.id === "block") {
      const unit = this.__unit;
      const own = (await ceButtonsOf(unit)).map((b) => ({ label: b.label, icon: b.icon, run: b.run }));
      // the frame label's buttons, for the keyboard here too (focus goes
      // back to where it was as the menu ran it: the name tag, or the caret)
      if (unit && !unit.closest("[data-hax-lock]") && hasSettings(unit)) own.unshift({ label: "Block settings…", icon: "sliders-horizontal", opens: true, run: (back) => settingsDialog().open("settings", back) });
      const action = frameActionOf(unit);
      if (action) own.push({ label: action.label, icon: action.icon, opens: true, run: (back) => action.run(unit, null, back) });
      if (own.length) items.push(SEP, ...own);
    }
    return items;
  }

  _stock() {
    const root = haxStore()?.activeHaxBody?.shadowRoot;
    const plate = root?.querySelector("hax-plate-context");
    const text = root?.querySelector("hax-text-editor-toolbar");
    // stock hides the text toolbar (display:none) unless the active block
    // takes inline text editing
    return { plate, text: shown(text) ? text : null };
  }

  // a move through the editor, a unit's verb (ops.js whyNot), with HAX's
  // reasons for switching block commands off too (a locked block)
  _verb(unit, label, iconName, action, { dir = 1, danger = false, plate = null, el = null } = {}) {
    const why = ops.whyNot(action, unit, { dir }) || (plate?.viewSource || plate?.disableOps ? offReason(plate, el) : "");
    return {
      label,
      icon: iconName,
      danger,
      disabled: !!why,
      hint: why,
      run: () => (action === "move" ? ops.move(unit, dir) : ops[action](unit)),
    };
  }

  // Section ▾: where its content comes from (a generated section), Move,
  // Add, Duplicate, Hide or Show, Remove; then its own (Add an outcome,
  // Edit HTML…)
  async _sectionItems(section) {
    const ce = await ceButtonsOf(section);
    const take = (...callbacks) => {
      const i = ce.findIndex((b) => callbacks.includes(b.callback));
      return i < 0 ? null : ce.splice(i, 1)[0];
    };
    const source = take("haxEditSource");
    const hide = take("haxHideFromReaders", "haxShowToReaders");
    const add = take("haxAddItem");
    const { pin } = policyOf(section);
    const stays = pin && `${phraseOf(section, { start: true })} stays at the ${pin === "first" ? "top" : "end"}`;
    const out = [];
    if (source) out.push({ label: source.label, icon: "arrow-right", run: source.run, opens: true }, SEP);
    out.push(this._verb(section, "Move up", "arrow-up", "move", { dir: -1 }), this._verb(section, "Move down", "arrow-down", "move", { dir: 1 }), SEP);
    out.push(
      { label: "Add above…", icon: "arrow-up-to-line", disabled: pin === "first", hint: pin === "first" ? stays : "", opens: true, list: true, run: () => inserter()?.openFor(section, "above") },
      { label: "Add below…", icon: "arrow-down-to-line", disabled: pin === "last", hint: pin === "last" ? stays : "", opens: true, list: true, run: () => inserter()?.openFor(section, "below") },
      this._verb(section, "Duplicate", "copy", "duplicate"),
    );
    if (hide) {
      const why = ops.whyNot(hide.callback === "haxHideFromReaders" ? "hide" : "show", section);
      out.push({ label: hide.label, icon: hide.callback === "haxHideFromReaders" ? "eye-off" : "eye", disabled: !!why, hint: why, run: hide.run });
    }
    out.push(this._verb(section, "Remove section", "trash-2", "remove", { danger: true }));
    const own = [add, ...ce].filter(Boolean).map((b) => ({ label: b.label, icon: b.callback === "haxAddItem" ? "plus" : b.icon, run: b.run }));
    if (haxStore()?.haxSchemaFromTag?.(section.localName)?.canEditSource) own.push({ label: "Edit HTML…", icon: "code", run: () => this._sectionSource(section) });
    if (own.length) out.push(SEP, ...own);
    return out;
  }

  // the item's menu: Move (earlier and later for cards and chips), Add,
  // Duplicate, Remove; then its own (Change icon…)
  async _itemItems(item) {
    const ce = await ceButtonsOf(item);
    const noun = (policyOf(item).label || "item").toLowerCase();
    const along = runsAlong(item);
    const addWhy = ops.whyNot("add-item", item);
    const add = (where, above) => ({ label: `Add ${withArticle(noun)} ${where}`, icon: above ? "arrow-up-to-line" : "arrow-down-to-line", disabled: !!addWhy, hint: addWhy, run: () => ops.addItem(item, { above }) });
    const out = [
      this._verb(item, along ? "Move earlier" : "Move up", along ? "arrow-left" : "arrow-up", "move", { dir: -1 }),
      this._verb(item, along ? "Move later" : "Move down", along ? "arrow-right" : "arrow-down", "move", { dir: 1 }),
      SEP,
      add(along ? "before" : "above", true),
      add(along ? "after" : "below", false),
      this._verb(item, "Duplicate", "copy", "duplicate"),
      this._verb(item, `Remove ${noun}`, "trash-2", "remove", { danger: true }),
    ];
    if (ce.length) out.push(SEP, ...ce.map((b) => ({ label: b.label, icon: b.icon, run: b.run })));
    return out;
  }

  // a written section's own Edit HTML: HAX's source view, on the section
  async _sectionSource(section) {
    if (haxStore()?.activeNode !== section) {
      ops.select(section, { focus: false });
      await frames();
    }
    pressPlate("hax-source-view-toggle");
  }

  // an ordinary block's category, resolved against the stock controls present now
  _stockItems(cat) {
    const stock = this._stock();
    const source = stock[cat.source];
    if (!source) return [];
    const els = [source, ...deepAll(source), ...deepAll(source.shadowRoot)];
    const out = [];
    const plate = stock.plate;
    for (const spec of cat.items) {
      if (spec.sep) {
        if (out.length && !out[out.length - 1].sep) out.push(SEP);
        continue;
      }
      if (spec.picker) {
        const picker = els.find((e) => e.localName === spec.picker);
        if (!picker) continue;
        const current = this._pickerCurrent(spec);
        for (const opt of (picker.options || []).flat()) {
          if (!opt || opt.value === null || opt.value === undefined) continue;
          if (spec.only && !spec.only.includes(opt.value)) continue;
          out.push({
            label: spec.labels?.[opt.value] || opt.alt,
            icon: spec.icons?.[opt.value] || "pilcrow",
            checked: current === opt.value,
            run: () => picker._pickerChange?.({ detail: { value: opt.value } }),
          });
        }
        continue;
      }
      if (spec.action === "cite") {
        out.push({ label: spec.label, icon: spec.icon, opens: true, run: () => this._cite() });
        continue;
      }
      if (spec.action === "link") {
        out.push({ label: spec.label, icon: spec.icon, shortcut: spec.shortcut, opens: true, run: () => linkPopover().edit() });
        continue;
      }
      if (spec.action === "unlink") {
        const why = whyNoLink();
        out.push({ label: spec.label, icon: spec.icon, disabled: !!why, hint: why, run: () => removeLink() });
        continue;
      }
      if (spec.grid) {
        const el = els.find((e) => e.localName === spec.grid);
        if (!el) continue;
        out.push({ label: spec.label, icon: spec.icon, submenu: true, run: () => this._openGrid(spec, el) });
        continue;
      }
      // the Columns menu: for a block in columns or one that may go in them;
      // off when HAX switches all its block commands off (a locked block,
      // Edit HTML open)
      if (spec.columns) {
        const node = this.__unit;
        if (!layoutOf(haxStore()?.activeHaxBody, node) && whyNoColumns(node)) continue;
        const off = !!(plate?.viewSource || plate?.disableOps || plate?.hasActiveEditingElement);
        const anchor = this.shadowRoot.querySelector(".dock, .rail");
        out.push({ label: spec.label, icon: spec.icon, opens: true, disabled: off, hint: off ? offReason(plate, source) : "", run: (back) => columnsMenu().open(node, { opener: back, anchor }) });
        continue;
      }
      const el = spec.find(els);
      if (!el) continue;
      // moves go through the editor: the hero and Ready to start stay put,
      // and a block at the end of a column goes on to the next
      if (spec.move) {
        out.push(this._verb(this.__unit, spec.label, spec.icon, "move", { dir: spec.move, plate, el }));
        continue;
      }
      const run = spec.insert ? () => inserter()?.openFor(this.__unit, spec.insert) : () => nativeButton(el)?.click();
      const available = shown(el);
      // controls that only apply to selected text are shown disabled rather
      // than vanishing, so the menu does not change shape under the pointer
      const needs = spec.needs || (spec.selection ? "Select text" : "");
      if (!available && !needs) continue;
      // and ones HAX has switched off say why
      const off = !available || disabled(el);
      out.push({
        label: typeof spec.label === "function" ? spec.label(el) : spec.label,
        icon: typeof spec.icon === "function" ? spec.icon(el) : spec.icon,
        shortcut: spec.shortcut,
        danger: spec.danger,
        opens: !!spec.insert,
        list: !!spec.insert,
        disabled: off,
        hint: !available ? needs : off ? offReason(plate, el) : "",
        pressed: spec.toggle && available ? !!el.toggled : undefined,
        run,
      });
    }
    while (out.length && out[out.length - 1].sep) out.pop();
    return out;
  }

  _pickerCurrent(spec) {
    const node = haxStore()?.activeNode;
    if (!node) return undefined;
    if (spec.checked === "tag") return node.localName;
    if (spec.checked === "align") {
      const a = node.style?.textAlign || "";
      return a === "left" ? "" : a;
    }
    return undefined;
  }

  /**
   * Open a category's menu below (or, in the dock, above) its button: by
   * the button (invoker), the control focus goes back to when the menu
   * closes by a key. With keys, focus goes into the menu.
   */
  async _openMenu(cat, invoker, { keys = false } = {}) {
    this._grid = null;
    this._query = "";
    this.__opening = true;
    const items = await this._items(cat);
    this.__opening = false;
    // (the selection changed meanwhile)
    if (!this._cats.some((c) => c.id === cat.id)) return;
    const y = invoker?.offsetTop ?? 0;
    const x = invoker?.offsetLeft ?? 0;
    this._open = { ...cat, items, y, x, invoker };
    if (keys) this._focusMenu();
  }

  _toggle(cat, e) {
    if (this._open?.id === cat.id && !this._grid) {
      this._close();
      return;
    }
    this._openMenu(cat, e.currentTarget, { keys: e.detail === 0 });
  }

  _close(refocus = false) {
    const invoker = this._open?.invoker;
    this._open = null;
    this._grid = null;
    this._query = "";
    if (refocus && invoker?.isConnected) this.updateComplete.then(() => invoker.focus());
  }

  _openGrid(spec, el) {
    const inner = el.shadowRoot?.querySelector("simple-symbol-picker, simple-emoji-picker, simple-picker");
    const options = (inner?.options || []).flat().filter((o) => o && o.value);
    this._grid = { label: spec.label.replace("…", ""), filter: spec.filter, options, el };
    this.updateComplete.then(() => this.shadowRoot.querySelector(".grid input, .grid button")?.focus());
  }

  /**
   * Run a menu item. From the keyboard (the click has no pointer: detail
   * 0), focus then goes back where it came from, unless the command put it
   * somewhere (a dialog, the block list, a name tag); something that opens
   * a dialog finds focus back there first, and is given the way back
   * (run(back)) for the dialog to take as it closes; Escape out of the
   * block list comes back there too. (A click leaves focus where it was:
   * the rail never takes it.)
   */
  _run(item, e) {
    if (item.disabled || item.sep) return;
    if (item.submenu) {
      item.run();
      return;
    }
    const keys = e?.detail === 0;
    this._close();
    if (item.opens && keys) this._back({ quiet: true });
    item.run(item.opens ? (keys ? () => this._back() : focusHere()) : undefined);
    if (item.list && keys) watchBlockList(() => this._back());
    if (!keys || item.opens) return;
    requestAnimationFrame(() => {
      const focus = deepActive();
      if (!focus || focus === globalThis.document.body || !focus.isConnected || this.shadowRoot.contains(focus)) this._back();
    });
  }

  // back where focus came from: the caret where it was (in the content, a
  // block's Edit HTML), a name tag, or the selection's name tag
  _back({ quiet = false } = {}) {
    const origin = this.__origin;
    if (!quiet) this.__origin = null;
    if (typeof origin?.back === "function") return origin.back();
    const hax = haxStore();
    const body = hax?.activeHaxBody;
    const node = hax?.activeNode;
    if (!body?.editMode) return;
    // a block open in Edit HTML: its HTML editor, which runs in a frame
    const source = hax.activeEditingElement;
    if (source?.isConnected && node && source.contains(node)) {
      source.autofocus = true;
      const frame = source.shadowRoot?.querySelector("monaco-element")?.shadowRoot?.querySelector("iframe");
      frame?.focus();
      frame?.contentDocument?.querySelector("textarea")?.focus();
      return;
    }
    const at = origin?.range;
    const inNode = (n) => !!node && node.contains(n);
    if (at?.startContainer.isConnected && body.contains(at.startContainer) && (!node || inNode(at.startContainer))) {
      body.focus({ preventScroll: true });
      setEditRange(at);
      return;
    }
    // a unit selected as a whole (a command moved things): its name tag; a
    // text block: the start of its text, as HAX has it when one is selected
    if (node && hax.isTextElement?.(node) && body.contains(node)) {
      const range = globalThis.document.createRange();
      range.selectNodeContents(node);
      range.collapse(true);
      body.focus({ preventScroll: true });
      setEditRange(range);
      return;
    }
    const unit = editorState.unit;
    if (!(unit && editorState.requestFocus(unit))) body.focus({ preventScroll: true });
  }

  /** Focus on the selection's name tag in the dock, drawn for unit now. Returns whether it took it. */
  focusTag(unit) {
    if (!unit?.isConnected || !editorState.geometry?.dock) return false;
    bringIntoView(unit);
    this._placeDock(editorState.geometry);
    this._info = describeUnit(unit);
    this.updateComplete.then(() => this.shadowRoot.querySelector(".dock .tag")?.focus({ preventScroll: true }));
    return true;
  }

  /**
   * A unit's actions (Shift+F10 on its name tag): its own menu (Section ▾,
   * Outcome ▾, Block ▾), with focus in it; back() puts focus back.
   */
  async openActions(unit, back) {
    const cat = this._cats.find((c) => c.unit === unit) || this._cats.find((c) => c.id === "item") || this._cats[0];
    if (!cat) return;
    this.__origin = { back };
    this.hidden = false;
    await this.updateComplete;
    const button = this.shadowRoot.querySelector(`[data-cat="${cat.id}"]`);
    await this._openMenu(cat, button, { keys: true });
  }

  // cite at the caret (or after the selection) in the active text block
  async _cite() {
    const hax = haxStore();
    const body = hax?.activeHaxBody;
    const node = hax?.activeNode;
    if (!body || !node) return;
    let range = getEditRange(body);
    if (!range || !node.contains(range.startContainer)) {
      range = globalThis.document.createRange();
      range.selectNodeContents(node);
      range.collapse(false);
    }
    const choice = await citeDialog().pick({ references: pageReferences(body) });
    if (!choice) {
      node.focus?.();
      return;
    }
    // linking an existing reference to Resources: no new citation
    if (choice.linkReference) {
      node.focus?.();
      if (choice.resource) linkReferenceToResource(body, choice.linkReference, choice.resource);
      else this._saveResource(choice.data, choice.resourceExtras).then((id) => linkReferenceToResource(body, choice.linkReference, id));
      return;
    }
    const liId = insertCitation(body, range, choice);
    node.focus?.();
    if (choice.saveAsResource) this._saveResource(choice.data, choice.resourceExtras).then((id) => linkReferenceToResource(body, liId, id));
  }

  // a new source becomes a Resource page (in the Resources section)
  async _saveResource(parts, { kind = "", description = "" } = {}) {
    const items = toJS(store.manifest?.items) || [];
    const existing = items.find((i) => i.metadata?.pageType === "oer:resource" && i.title.toLowerCase() === parts.title.toLowerCase() && (i.metadata?.oerFields?.url || "") === (parts.url || ""));
    if (existing) return existing.id;
    const section = items.find((i) => !i.parent && i.title === "Resources" && i.metadata?.pageType === "oer:section");
    const siblings = items.filter((i) => i.parent === (section?.id || null));
    await saveOutline([
      {
        id: `new-resource-${Date.now()}`,
        title: parts.title,
        parent: section?.id || null,
        order: siblings.length,
        indent: section ? 1 : 0,
        location: "",
        description,
        metadata: {
          pageType: "oer:resource",
          oerFields: {
            ...(parts.url ? { url: parts.url } : {}),
            ...(kind ? { kind } : {}),
            ...(parts.authors?.length ? { authors: parts.authors.map((name) => ({ name, url: "" })) } : {}),
            ...(parts.year ? { date: parts.year } : {}),
            ...(parts.container ? { container: parts.container } : {}),
            ...(parts.publisher ? { publisher: parts.publisher } : {}),
          },
        },
        contents: "<p></p>",
        new: true,
      },
    ]);
    // the outline can refresh more than once; wait for the one with the page
    const find = () =>
      (toJS(store.manifest?.items) || []).find((i) => i.metadata?.pageType === "oer:resource" && i.title === parts.title && (i.metadata?.oerFields?.url || "") === (parts.url || ""))?.id || "";
    for (let waited = 0; waited < 15000; waited += 250) {
      const id = find();
      if (id) return id;
      await new Promise((r) => setTimeout(r, 250));
    }
    return "";
  }

  _insertGlyph(opt) {
    this._grid.el._pickerChange?.({ detail: { value: opt.value } });
    this._close();
  }

  _toggleLabels() {
    const on = !labelsWanted();
    wantLabels = on;
    try {
      globalThis.localStorage.setItem(LABELS_KEY, on ? "on" : "off");
    } catch {
      // (kept for this page only)
    }
    this._labels = on;
    this._close();
    this._sync();
    announce(on ? "Labels shown on the toolbar" : "The toolbar shows icons only");
  }

  /* ---------- keyboard ---------- */

  _globalKeys(e) {
    if (this.hidden) return;
    // Escape closes a menu opened with the pointer (focus stayed where it was)
    if (e.key === "Escape" && this._open && !this.matches(":focus-within")) {
      e.preventDefault();
      e.stopPropagation();
      this._close();
      return;
    }
    // Alt+F10: to the toolbar, the convention in rich-text editors
    if (e.altKey && !e.shiftKey && e.key === "F10") {
      e.preventDefault();
      e.stopPropagation();
      // where to come back to (Escape, or after a command): the caret, or
      // the name tag it came from
      if (!this.matches(":focus-within")) {
        const body = haxStore()?.activeHaxBody;
        const from = e.composedPath()[0];
        const unit = editorState.unit;
        const fromTag = from?.classList?.contains("tag") && unit;
        const range = !fromTag && body ? getEditRange(body) : null;
        this.__origin = fromTag ? { back: () => editorState.requestFocus(unit) } : { range: range && body.contains(range.startContainer) ? new StaticRange(range) : null };
      }
      this.shadowRoot.querySelector(".rail button[data-cat]")?.focus();
    }
  }

  _railKeys(e) {
    const buttons = [...this.shadowRoot.querySelectorAll(".rail button")];
    const i = buttons.indexOf(this.shadowRoot.activeElement);
    const move = (n) => buttons[(i + n + buttons.length) % buttons.length]?.focus();
    const [back, on, opens] = this._dock ? ["ArrowLeft", "ArrowRight", "ArrowUp"] : ["ArrowUp", "ArrowDown", "ArrowRight"];
    const cat = this._cats.find((c) => c.id === buttons[i]?.dataset.cat);
    if (e.key === on) move(1);
    else if (e.key === back) move(-1);
    else if (e.key === "Home") buttons[0]?.focus();
    else if (e.key === "End") buttons[buttons.length - 1]?.focus();
    else if (cat && (e.key === opens || e.key === "Enter" || e.key === " ")) {
      if (this._open?.id !== cat.id) this._openMenu(cat, buttons[i], { keys: true });
      else this._focusMenu();
    } else if (e.key === "Escape") {
      if (this._open) this._close();
      else this._back();
    } else return;
    e.preventDefault();
  }

  _focusMenu() {
    this.updateComplete.then(() => this.shadowRoot.querySelector(".menu [role^=menuitem]:not([aria-disabled=true])")?.focus());
  }

  _menuKeys(e) {
    const items = [...this.shadowRoot.querySelectorAll(".menu [role^=menuitem]")];
    const i = items.indexOf(this.shadowRoot.activeElement);
    const move = (n) => items[(i + n + items.length) % items.length]?.focus();
    if (e.key === "ArrowDown") move(1);
    else if (e.key === "ArrowUp") move(-1);
    else if (e.key === "Home") items[0]?.focus();
    else if (e.key === "End") items[items.length - 1]?.focus();
    else if (e.key === "Escape" || (!this._dock && e.key === "ArrowLeft")) {
      // opened from a name tag (Shift+F10): back there
      if (typeof this.__origin?.back === "function") {
        this._close();
        this._back();
      } else this._close(true);
    } else if (e.key === "Tab") this._close();
    else return;
    e.preventDefault();
  }

  _gridKeys(e) {
    const cells = [...this.shadowRoot.querySelectorAll(".cells button")];
    const i = cells.indexOf(this.shadowRoot.activeElement);
    const cols = 8;
    const go = (n) => {
      e.preventDefault();
      cells[Math.max(0, Math.min(cells.length - 1, n))]?.focus();
    };
    if (e.key === "Escape") {
      e.preventDefault();
      this._grid = null;
      this._focusMenu();
    } else if (i < 0) {
      if (e.key === "ArrowDown") go(0);
    } else if (e.key === "ArrowRight") go(i + 1);
    else if (e.key === "ArrowLeft") go(i - 1);
    else if (e.key === "ArrowDown") go(i + cols);
    else if (e.key === "ArrowUp") {
      if (i < cols) {
        e.preventDefault();
        this.shadowRoot.querySelector(".grid input")?.focus();
      } else go(i - cols);
    }
  }

  _tagKeys(e) {
    const unit = this._info?.unit;
    if (nameTagKeydown(e, unit, { actions: () => this.openActions(unit, () => this.focusTag(unit)) })) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  // keep the text selection: pressing a rail control must not move focus
  // out of the block before the stock command reads the selection
  _keepSelection(e) {
    if (e.target.closest?.("input")) return;
    e.preventDefault();
  }

  updated() {
    // how wide the rail is with its words, to know where they fit
    const rail = this.shadowRoot.querySelector(".rail");
    if (rail && this._labels && !this._dock && this.__key && !this.__wide.has(this.__key)) {
      this.__wide.set(this.__key, rail.offsetWidth);
      this._sync();
    }
    if (this._dock) this._dockHeight(this.shadowRoot.querySelector(".dock")?.offsetHeight || 0);
    // menus open level with their rail button; lift one that would run past
    // the bottom of the window (its top is relative to the rail)
    const menu = this.shadowRoot.querySelector(".menu");
    if (!menu || this._dock) return;
    const r = menu.getBoundingClientRect();
    const over = r.bottom - (globalThis.innerHeight - 8);
    if (over > 0) menu.style.top = `${Math.max(menu.offsetTop - over, 8 - this.getBoundingClientRect().top)}px`;
  }

  /* ---------- render ---------- */

  static get styles() {
    return css`
      /* above the selection frame (9985) and the inserter's gaps (9989);
         under the block list while it's open, and sheets (Style, 9998) */
      :host {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9991;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--popover-foreground);
      }
      :host([hidden]) {
        display: none;
      }
      :host([under]) {
        z-index: 9988;
      }
      :host([dock]) {
        top: auto;
        left: var(--dock-left, 0);
        right: var(--dock-right, 0);
        bottom: var(--dock-bottom, 0);
      }
      .wrap {
        position: relative;
      }
      .rail {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        padding: 0.25rem;
        background: var(--popover);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 1px 3px rgb(0 0 0 / 0.08);
      }
      button {
        all: unset;
        box-sizing: border-box;
        cursor: pointer;
      }
      button:focus-visible,
      [role^="menuitem"]:focus-visible,
      input:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .rail button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.375rem;
        min-width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        color: var(--foreground);
        font-size: 0.8125rem;
        font-weight: 500;
        white-space: nowrap;
      }
      .rail.labels button {
        justify-content: flex-start;
        padding: 0 0.5rem;
      }
      .rail button:hover,
      .rail button[aria-expanded="true"] {
        background: var(--accent);
        color: var(--accent-foreground);
      }
      .rail button[aria-disabled="true"] {
        cursor: default;
        color: var(--muted-foreground);
        background: transparent;
      }
      .icon {
        flex: none;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }

      /* the dock: the selection's label, then its moves and tools */
      .dock {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding: 0.375rem 0.5rem calc(0.375rem + env(safe-area-inset-bottom, 0px));
        background: var(--popover);
        border-top: 1px solid var(--border);
        box-shadow: 0 -2px 8px rgb(0 0 0 / 0.08);
      }
      .dock .rail {
        flex-direction: row;
        flex-wrap: wrap;
        padding: 0;
        border: 0;
        border-radius: 0;
        box-shadow: none;
        background: transparent;
      }
      .dock .rail .step {
        padding: 0;
        width: 2rem;
        justify-content: center;
      }
      .dock .rail .divider {
        width: 1px;
        align-self: stretch;
        margin: 0.25rem 0.125rem;
        background: var(--border);
      }
      .dock-label {
        display: flex;
        align-items: center;
        gap: 0.125rem;
        min-width: 0;
        overflow: hidden;
        font-size: 0.8125rem;
        white-space: nowrap;
      }
      .dock-label button {
        display: inline-flex;
        align-items: center;
        height: 1.75rem;
        padding: 0 0.375rem;
        border-radius: var(--radius-sm);
        color: var(--muted-foreground);
        font-weight: 500;
      }
      .dock-label .tag {
        flex: none;
        color: var(--foreground);
        font-weight: 600;
      }
      .dock-label button:hover {
        background: var(--accent);
        color: var(--accent-foreground);
      }
      .dock-label .sep {
        padding: 0 0.125rem;
        color: var(--muted-foreground);
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        height: 1.375rem;
        margin-left: 0.25rem;
        padding: 0 0.5rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--foreground);
        background: var(--muted);
      }
      .dock-label button.chip {
        height: 1.375rem;
        color: var(--foreground);
      }
      .chip .icon {
        width: 0.75rem;
        height: 0.75rem;
      }

      /* shadcn DropdownMenu */
      .menu {
        position: absolute;
        left: calc(100% + 0.5rem);
        min-width: 14rem;
        max-height: min(28rem, calc(100dvh - 2rem));
        overflow-y: auto;
        box-sizing: border-box;
        padding: 0.25rem;
        background: var(--popover);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
      }
      :host([dock]) .menu {
        top: auto;
        bottom: calc(100% + 0.25rem);
        left: clamp(0.5rem, var(--menu-x, 0.5rem), calc(100% - 14.5rem));
        max-height: min(28rem, calc(100dvh - 8rem));
      }
      .label {
        padding: 0.375rem 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--muted-foreground);
      }
      .menu .sep {
        height: 1px;
        margin: 0.25rem -0.25rem;
        background: var(--border);
      }
      [role^="menuitem"] {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        height: 2rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
        line-height: 1.25rem;
        white-space: nowrap;
      }
      [role^="menuitem"]:hover,
      [role^="menuitem"]:focus-visible {
        background: var(--accent);
        color: var(--accent-foreground);
      }
      [role^="menuitem"][aria-disabled="true"] {
        cursor: default;
        color: var(--muted-foreground);
        background: transparent;
      }
      [role^="menuitem"].danger {
        color: var(--destructive);
      }
      [role^="menuitem"].danger:hover,
      [role^="menuitem"].danger:focus-visible {
        background: color-mix(in oklab, var(--destructive) 10%, transparent);
      }
      .text {
        flex: 1;
      }
      .end {
        margin-left: auto;
        padding-left: 1rem;
        font-size: 0.75rem;
        letter-spacing: 0.05em;
        color: var(--muted-foreground);
      }
      .check {
        width: 1rem;
        height: 1rem;
      }

      /* symbol / emoji grid */
      .grid input {
        box-sizing: border-box;
        width: 100%;
        height: 2rem;
        margin: 0 0 0.25rem;
        padding: 0 0.5rem;
        border: 1px solid var(--input-border);
        border-radius: var(--radius-md);
        background: var(--background);
        color: var(--foreground);
        font: inherit;
        font-size: 0.875rem;
      }
      .cells {
        display: grid;
        grid-template-columns: repeat(8, 2rem);
        gap: 0.125rem;
      }
      .cells button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-sm);
        font-size: 1.125rem;
      }
      .cells button:hover {
        background: var(--accent);
      }
      .empty {
        padding: 0.5rem;
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
      @media (forced-colors: active) {
        .rail,
        .dock,
        .menu {
          border: 1px solid CanvasText;
        }
      }
    `;
  }

  _renderItem(item) {
    if (item.sep) return html`<div class="sep" role="separator"></div>`;
    const role = item.checked !== undefined ? "menuitemradio" : item.pressed !== undefined ? "menuitemcheckbox" : "menuitem";
    const state = item.checked ?? item.pressed;
    // (aria-checked only where it's allowed, and aria-haspopup only where
    // there's one: ARIA reflection removes them with null)
    return html`<button
      role="${role}"
      class="${item.danger ? "danger" : ""}"
      tabindex="-1"
      .ariaChecked="${state === undefined ? null : String(!!state)}"
      aria-disabled="${item.disabled ? "true" : "false"}"
      .ariaHasPopup="${item.submenu ? "true" : null}"
      @click="${(e) => this._run(item, e)}"
    >
      ${icon(item.icon)}
      <span class="text">${item.label}</span>
      ${item.hint ? html`<span class="end">${item.hint}</span>` : item.shortcut ? html`<span class="end">${item.shortcut}</span>` : ""}
      ${state ? html`<span class="check">${icon("check")}</span>` : ""} ${item.submenu ? icon("chevron-right") : ""}
    </button>`;
  }

  _renderGrid() {
    const g = this._grid;
    const q = this._query.trim().toLowerCase();
    const options = q ? g.options.filter((o) => (o.description || "").toLowerCase().includes(q)) : g.options;
    return html`<div class="menu grid" style="${this._menuPlace()}" role="dialog" aria-label="${g.label}" @keydown="${this._gridKeys}">
      <div class="label" aria-hidden="true">${g.label}</div>
      ${g.filter
        ? html`<input
            type="search"
            placeholder="Search ${g.label.toLowerCase()}…"
            aria-label="Search ${g.label.toLowerCase()}"
            .value="${this._query}"
            @input="${(e) => (this._query = e.target.value)}"
          />`
        : ""}
      <div class="cells" role="group" aria-label="${g.label}">
        ${options.map((o) => {
          const glyph = decode(o.value);
          const name = o.description || glyph;
          return html`<button title="${name}" aria-label="${name}" @click="${() => this._insertGlyph(o)}">${glyph}</button>`;
        })}
      </div>
      ${options.length ? "" : html`<div class="empty">No matches</div>`}
    </div>`;
  }

  // a menu opens level with its button beside the rail, or above the dock
  // from its button's left
  _menuPlace() {
    const open = this._open;
    return this._dock ? `--menu-x:${open.x}px` : `top:${open.y}px`;
  }

  _renderMenu() {
    const open = this._open;
    const first = this._cats[0]?.id === open.id;
    return html`<div class="menu" role="menu" aria-label="${open.label}" style="${this._menuPlace()}" @keydown="${this._menuKeys}">
      <div class="label" aria-hidden="true">${open.label}</div>
      ${open.items.map((item) => this._renderItem(item))}
      ${first
        ? html`<div class="sep" role="separator"></div>
            ${this._renderItem({ label: "Show labels", icon: "type", pressed: labelsWanted(), run: () => this._toggleLabels() })}`
        : ""}
    </div>`;
  }

  // the category buttons, and in the dock the selection's moves before them
  _renderTools() {
    const open = this._open;
    const unit = this._info?.unit;
    const along = unit && runsAlong(unit);
    const step = (dir) => {
      const why = this._steps[dir < 0 ? 0 : 1];
      const label = along ? (dir < 0 ? "Move earlier" : "Move later") : dir < 0 ? "Move up" : "Move down";
      return html`<button
        class="step"
        tabindex="-1"
        aria-label="${label}"
        title="${why ? `${label}: ${why}` : label}"
        aria-disabled="${why ? "true" : "false"}"
        @click="${() => !why && ops.move(unit, dir)}"
      >
        ${icon(along ? (dir < 0 ? "arrow-left" : "arrow-right") : dir < 0 ? "arrow-up" : "arrow-down")}
      </button>`;
    };
    return html`<div
      class="rail ${this._labels ? "labels" : ""}"
      role="toolbar"
      aria-label="Tools for ${this._info?.name || "the selection"}"
      aria-orientation="${this._dock ? "horizontal" : "vertical"}"
      @keydown="${this._railKeys}"
    >
      ${this._dock && unit ? html`${step(-1)}${step(1)}<span class="divider" aria-hidden="true"></span>` : ""}
      ${this._cats.map(
        (cat, i) => html`<button
          data-cat="${cat.id}"
          tabindex="${i === 0 ? 0 : -1}"
          title="${cat.label}"
          aria-label="${cat.label}"
          aria-haspopup="menu"
          aria-expanded="${open?.id === cat.id ? "true" : "false"}"
          @click="${(e) => this._toggle(cat, e)}"
        >
          ${icon(cat.icon)}${this._labels ? html`<span>${cat.label}</span>` : ""}
        </button>`,
      )}
    </div>`;
  }

  // the dock's label row: the levels around the selection, its name tag, its state
  _renderDockLabel() {
    const info = this._info;
    if (!info) return "";
    // the frame label's Block settings, for an ordinary block (oer-block-frame.js)
    const unit = this.__unit;
    const kind = unit ? policyOf(unit).kind : null;
    const settings = !!unit && kind !== "section" && kind !== "item" && !unit.closest("[data-hax-lock]") && hasSettings(unit);
    return html`<div class="dock-label" role="toolbar" aria-label="Selection">
      ${info.crumbs.map(
        (c) => html`<button class="crumb" tabindex="-1" title="Select ${c.label}" @click="${() => ops.select(c.unit)}">${c.label}</button
          ><span class="sep" aria-hidden="true">›</span>`,
      )}
      <button class="tag" aria-label="${info.said}" title="${info.name}: Enter edits it, arrows go to others, Shift+F10 for its actions" @keydown="${this._tagKeys}">
        ${info.name}
      </button>
      ${info.chips.map((c) =>
        c.run
          ? html`<button class="chip" tabindex="-1" title="${c.label}: open it" @click="${() => c.run()}">${c.label}${icon("arrow-right")}</button>`
          : html`<span class="chip">${c.label}</span>`,
      )}
      ${settings
        ? html`<button
            title="Block settings"
            aria-label="Block settings"
            aria-haspopup="dialog"
            @click="${(e) => {
              // (the button to give focus back to: Safari doesn't focus a clicked button)
              settingsDialog().open("settings", e.currentTarget);
            }}"
          >
            ${icon("sliders-horizontal")}
          </button>`
        : ""}
    </div>`;
  }

  render() {
    const open = this._open;
    const menu = open && this._grid ? this._renderGrid() : open ? this._renderMenu() : "";
    if (this._dock) {
      return html`<div class="wrap" @mousedown="${this._keepSelection}">
        <div class="dock" role="region" aria-label="Selection">${this._renderDockLabel()} ${this._renderTools()}</div>
        ${menu}
      </div>`;
    }
    return html`<div class="wrap" @mousedown="${this._keepSelection}">${this._renderTools()} ${menu}</div>`;
  }
}
customElements.define(OerBlockRail.tag, OerBlockRail);
