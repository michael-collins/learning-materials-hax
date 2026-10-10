/**
 * `oer-block-rail` — a slim vertical toolbar in the gutter to the left of
 * the selected block, replacing HAX's floating block and text toolbars
 * (which sit on top of the content). Commands are grouped into categories;
 * each opens a labelled menu beside the rail.
 *
 *   Block   move, insert above/below, duplicate, columns, HTML, lock, remove
 *   Text    paragraph/heading/quote, lists, indent, alignment
 *   Format  bold, italic, ... link, clear formatting
 *   Insert  symbol, emoji, math, vocabulary, ...
 *
 * The stock toolbars stay mounted (hidden by editor-skin.js) and own every
 * command: a rail item presses the matching stock control, so selection
 * handling, undo and HAX's own state stay intact. Items whose stock control
 * is absent are left out, so the rail mirrors whatever HAX offers.
 *
 * Items HAX has switched off are shown off, with the reason. Add and Remove
 * column go through layouts.js (two equal columns, the block still
 * selected), and aren't offered for or inside course site sections.
 *
 * Keyboard: Alt+F10 moves focus from the content to the rail; arrows move,
 * Enter/Space/Right opens a menu, Escape/Left steps back, and Escape on the
 * rail returns to the content, as running a command does. Keys and pastes
 * stop at the rail, so they never edit the content behind it; Ctrl and ⌘
 * shortcuts (Save, Undo…) go on to the editor.
 * @element oer-block-rail
 */
import { html, css, LitElement } from "../lit.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { LUCIDE_ICONS } from "./lucide-icons.generated.js";
import { MOD, contentViewport } from "./stock.js";
import { HANDLE_WIDTH, frameRect } from "./slots.js";
import { insertCitation, pageReferences, linkReferenceToResource } from "./citations.js";
import { citeDialog } from "./oer-cite-dialog.js";
import { saveOutline } from "../outline/outline-model.js";
import { toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { layoutOf, columnCount, setLayout, wrapInColumns, removeLayout } from "./layouts.js";
import { sectionOf } from "../blocks/course-site/cs-shared.js";

const SEP = { sep: true };

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
const nodeLength = (n) => (n.nodeType === 1 ? n.childNodes.length : n.length);

// why HAX has switched a block command off, from its toolbar's state
function offReason(plate, el) {
  if (plate?.viewSource) return "Close Edit HTML first";
  if (plate?.disableOps) return "Unlock it first";
  if (plate?.hasActiveEditingElement) return "Finish editing first";
  if (el.getAttribute("event-name") === "hax-source-view-toggle" && !plate?.sourceView) return "Not for this block";
  return "Not here";
}

const byEvent = (name) => (els) => els.find((e) => e.getAttribute?.("event-name") === name);
const byCommand = (cmd, label) => (els) =>
  els.find((e) => e.command === cmd && (!label || e.label === label));

/* ---------- categories ---------- */

const BLOCK = [
  { label: "Move up", icon: "arrow-up", find: byEvent("hax-plate-up") },
  { label: "Move down", icon: "arrow-down", find: byEvent("hax-plate-down") },
  SEP,
  // these open oer-block-inserter's block list for that gap
  { label: "Insert block above…", icon: "arrow-up-to-line", find: byEvent("insert-above-active"), insert: "above" },
  { label: "Insert block below…", icon: "arrow-down-to-line", find: byEvent("insert-below-active"), insert: "below" },
  { label: "Duplicate", icon: "copy", find: byEvent("hax-plate-duplicate") },
  SEP,
  // outside a layout, Add column puts the block in two equal columns (HAX's
  // own makes three, with the block in the middle one); Remove column works
  // from any block in the layout (HAX's only from the layout itself)
  { label: "Add column", icon: "columns-2", find: byEvent("hax-plate-create-right"), columns: "add" },
  { label: "Remove column", icon: "panel-right-close", find: byEvent("hax-plate-remove-right"), columns: "remove" },
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
const HEADING_LABELS = { pre: "Code block", blockquote: "Quote" };

const TEXT = [
  { picker: "hax-text-editor-heading-picker", icons: HEADING_ICONS, labels: HEADING_LABELS, checked: "tag" },
  SEP,
  { label: "Bulleted list", icon: "list", find: byCommand("ul") },
  { label: "Numbered list", icon: "list-ordered", find: byCommand("ol") },
  { label: "Indent", icon: "indent-increase", find: byCommand("indent"), shortcut: `${MOD}]`, needs: "In lists" },
  { label: "Outdent", icon: "indent-decrease", find: byCommand("outdent"), shortcut: `${MOD}[`, needs: "In lists" },
  SEP,
  {
    picker: "hax-text-editor-alignment-picker",
    icons: { "": "align-left", center: "align-center", right: "align-right" },
    labels: { "": "Align left", center: "Align center", right: "Align right" },
    checked: "align",
  },
];

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
  { label: "Link", icon: "link", find: byCommand("createLink"), shortcut: `${MOD}K` },
  { label: "Remove link", icon: "unlink", find: byCommand("unlink") },
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

const CATEGORIES = [
  { id: "block", label: "Block", icon: "box", source: "plate", items: BLOCK },
  { id: "text", label: "Text", icon: "pilcrow", source: "text", items: TEXT },
  { id: "format", label: "Format", icon: "type", source: "text", items: FORMAT },
  // "Insert inline" so it is not mistaken for inserting a block
  { id: "insert", label: "Insert inline", icon: "smile-plus", source: "text", items: INSERT },
];

const icon = (name) =>
  html`<span
    class="icon"
    aria-hidden="true"
    style="--src:url(&quot;${LUCIDE_ICONS[`oer:${name}`] || ""}&quot;)"
  ></span>`;

// symbol and emoji values are HTML entities
const decoder = globalThis.document.createElement("textarea");
const decode = (s) => {
  decoder.innerHTML = s;
  return decoder.value;
};

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
    };
  }

  constructor() {
    super();
    this._cats = [];
    this._open = null;
    this._grid = null;
    this._query = "";
    this.__tick = this._tick.bind(this);
    this.__keys = this._globalKeys.bind(this);
    this.__outside = (e) => {
      if (this._open && !e.composedPath().includes(this)) this._close();
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
    this.__raf = requestAnimationFrame(this.__tick);
    globalThis.addEventListener("keydown", this.__keys, true);
    globalThis.addEventListener("pointerdown", this.__outside, true);
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.__raf);
    globalThis.removeEventListener("keydown", this.__keys, true);
    globalThis.removeEventListener("pointerdown", this.__outside, true);
    super.disconnectedCallback();
  }

  /* ---------- stock state ---------- */

  get _hax() {
    return globalThis.HaxStore?.requestAvailability?.();
  }

  _stock() {
    const root = this._hax?.activeHaxBody?.shadowRoot;
    const plate = root?.querySelector("hax-plate-context");
    const text = root?.querySelector("hax-text-editor-toolbar");
    return {
      plate,
      // stock hides the text toolbar (display:none) unless the active block
      // takes inline text editing
      text: shown(text) ? text : null,
    };
  }

  // follow the active block every frame: blocks move as content reflows,
  // the page scrolls and the panel opens
  _tick() {
    this.__raf = requestAnimationFrame(this.__tick);
    const node = store.editMode ? this._hax?.activeNode : null;
    if (!node || !node.isConnected || node.localName === "page-break") {
      if (!this.hidden) this._hide();
      return;
    }
    const r = node.getBoundingClientRect();
    const stock = this._stock();
    const key = `${node.localName}|${!!stock.plate}|${!!stock.text}`;
    if (node !== this.__node || key !== this.__key) {
      if (node !== this.__node) this._close();
      this.__node = node;
      this.__key = key;
      this._cats = CATEGORIES.filter((c) => stock[c.source]);
    }
    const rail = this.shadowRoot?.querySelector(".rail");
    const railH = rail?.offsetHeight || 0;
    const view = contentViewport();
    const top0 = view.top + 8;
    // level with the selection frame's top (see oer-block-frame), sticking
    // inside the viewport while a tall block scrolls, but never below the
    // frame's bottom edge
    const f = frameRect(node);
    let top = f.top;
    if (top < top0) top = Math.max(Math.min(top0, f.bottom - railH), f.top);
    const offscreen = f.bottom < top0 || f.top > view.bottom || r.width === 0;
    if (offscreen && !this._open) {
      this.hidden = true;
      return;
    }
    this.hidden = false;
    // left of the frame's drag handle, but always in the page gutter: a
    // block in a second column must not put the rail over the first
    const bodyLeft = this._hax?.activeHaxBody?.getBoundingClientRect().left ?? f.left;
    const anchor = Math.min(f.left, bodyLeft - 4 - 6);
    const left = Math.round(anchor - HANDLE_WIDTH - 8 - (rail?.offsetWidth || 42));
    this.style.transform = `translate(${left}px, ${Math.round(top)}px)`;
  }

  _hide() {
    this._close();
    this.hidden = true;
    this.__node = null;
  }

  /* ---------- menus ---------- */

  // resolve a category's items against the stock controls present now
  _items(cat) {
    const stock = this._stock();
    const source = stock[cat.source];
    if (!source) return [];
    const els = [source, ...deepAll(source), ...deepAll(source.shadowRoot)];
    const out = [];
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
        out.push({ label: spec.label, icon: spec.icon, run: () => this._cite() });
        continue;
      }
      if (spec.grid) {
        const el = els.find((e) => e.localName === spec.grid);
        if (!el) continue;
        out.push({ label: spec.label, icon: spec.icon, submenu: true, run: () => this._openGrid(spec, el) });
        continue;
      }
      const el = spec.find(els);
      if (!el) continue;
      // (inside a course site section, blocks go above or below the section)
      let run = spec.insert
        ? () => globalThis.document.querySelector("oer-block-inserter")?.openFor(sectionOf(this._hax.activeNode) || this._hax.activeNode, spec.insert)
        : () => nativeButton(el)?.click();
      // our own columns commands: off when HAX switches all its block
      // commands off (a locked block, Edit HTML open), not for its other reasons
      let ours = false;
      if (spec.columns) {
        const node = this._hax?.activeNode;
        const layout = layoutOf(this._hax?.activeHaxBody, node);
        if (sectionOf(node) || (spec.columns === "remove" && !layout)) continue;
        if (spec.columns === "add" && !layout) run = () => this._putInColumns(node);
        if (spec.columns === "remove") run = () => this._removeColumn(node, layout);
        ours = spec.columns === "remove" || !layout;
      }
      const available = shown(el);
      // controls that only apply to selected text are shown disabled rather
      // than vanishing, so the menu does not change shape under the pointer
      const needs = spec.needs || (spec.selection ? "Select text" : "");
      if (!available && !needs) continue;
      // and ones HAX has switched off say why
      const plate = stock.plate;
      const off = !available || (ours ? !!(plate?.viewSource || plate?.disableOps || plate?.hasActiveEditingElement) : disabled(el));
      out.push({
        label: typeof spec.label === "function" ? spec.label(el) : spec.label,
        icon: typeof spec.icon === "function" ? spec.icon(el) : spec.icon,
        shortcut: spec.shortcut,
        danger: spec.danger,
        disabled: off,
        hint: !available ? needs : off ? offReason(stock.plate, el) : "",
        pressed: spec.toggle && available ? !!el.toggled : undefined,
        run,
      });
    }
    while (out.length && out[out.length - 1].sep) out.pop();
    return out;
  }

  // two equal columns around the block, which stays selected
  async _putInColumns(node) {
    const hax = this._hax;
    if (!hax || !node) return;
    if (await wrapInColumns(hax, node, "1-1")) hax.activeNode = node;
  }

  // one column fewer (its blocks join the last one); from two, the layout
  // goes and its blocks stay where it was
  _removeColumn(node, grid) {
    const hax = this._hax;
    if (!hax || !grid) return;
    if (columnCount(grid) > 2) {
      setLayout(grid, grid.layout.split("-").slice(0, -1).join("-"));
      if (!node.isConnected) hax.activeNode = grid;
      return;
    }
    const first = removeLayout(grid);
    // (an empty paragraph goes with the layout)
    hax.activeNode = node !== grid && node.isConnected ? node : first;
  }

  _pickerCurrent(spec) {
    const node = this._hax?.activeNode;
    if (!node) return undefined;
    if (spec.checked === "tag") return node.localName;
    if (spec.checked === "align") {
      const a = node.style?.textAlign || "";
      return a === "left" ? "" : a;
    }
    return undefined;
  }

  _toggle(cat, e) {
    if (this._open?.id === cat.id && !this._grid) {
      this._close();
      return;
    }
    this._grid = null;
    this._query = "";
    this._open = { ...cat, items: this._items(cat), y: e?.currentTarget?.offsetTop ?? 0 };
  }

  _close(refocus = false) {
    const id = this._open?.id;
    this._open = null;
    this._grid = null;
    this._query = "";
    if (refocus && id) {
      this.updateComplete.then(() => this.shadowRoot.querySelector(`[data-cat="${id}"]`)?.focus());
    }
  }

  _openGrid(spec, el) {
    const inner = el.shadowRoot?.querySelector("simple-symbol-picker, simple-emoji-picker, simple-picker");
    const options = (inner?.options || []).flat().filter((o) => o && o.value);
    this._grid = { label: spec.label.replace("…", ""), filter: spec.filter, options, el };
    this.updateComplete.then(() => {
      const first = this.shadowRoot.querySelector(".grid input, .grid button");
      first?.focus();
    });
  }

  _run(item) {
    if (item.disabled || item.sep) return;
    if (item.submenu) {
      item.run();
      return;
    }
    const byKeys = this.matches(":focus-within");
    item.run();
    this._close();
    // chosen from the keyboard: back to the content, unless the command
    // opened something of its own (the block list, a dialog)
    if (byKeys) {
      requestAnimationFrame(() => {
        const focus = globalThis.document.activeElement;
        if (!focus || focus === globalThis.document.body || focus === this) this._toContent();
      });
    }
  }

  // focus back in the content: the caret where it was when Alt+F10 came to
  // the rail, or, if the command moved things (Duplicate selects the copy,
  // Move up moves a section), at the start of the selected text block, or
  // just before any other block, as HAX has it when one is selected
  _toContent() {
    const body = this._hax?.activeHaxBody;
    const node = this._hax?.activeNode;
    if (!body || !node?.isConnected) return;
    // a block open in Edit HTML: its HTML editor, which runs in a frame
    // (HAX focuses the editor's element, which can't take focus), or
    // focuses itself once it has loaded
    const source = this._hax.activeEditingElement;
    if (source?.isConnected && source.contains(node)) {
      source.autofocus = true;
      const frame = source.shadowRoot?.querySelector("monaco-element")?.shadowRoot?.querySelector("iframe");
      frame?.focus();
      frame?.contentDocument?.querySelector("textarea")?.focus();
      return;
    }
    const at = this.__caret;
    const range = globalThis.document.createRange();
    if (at && node.contains(at.startContainer) && node.contains(at.endContainer)) {
      range.setStart(at.startContainer, Math.min(at.startOffset, nodeLength(at.startContainer)));
      range.setEnd(at.endContainer, Math.min(at.endOffset, nodeLength(at.endContainer)));
    } else if (this._hax.isTextElement(node)) {
      range.selectNodeContents(node);
      range.collapse(true);
    } else {
      range.setStartBefore(node);
      range.collapse(true);
    }
    body.focus({ preventScroll: true });
    const sel = body.getRootNode().getSelection?.() || globalThis.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  // cite at the caret (or after the selection) in the active text block
  async _cite() {
    const hax = this._hax;
    const body = hax?.activeHaxBody;
    const node = hax?.activeNode;
    if (!body || !node) return;
    let range = hax.getRange?.();
    if (!range || !node.contains(range.startContainer)) {
      range = globalThis.document.createRange();
      range.selectNodeContents(node);
      range.collapse(false);
    } else range = range.cloneRange();
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

  /* ---------- keyboard ---------- */

  _globalKeys(e) {
    if (this.hidden) return;
    // Alt+F10: jump to the toolbar, the convention in rich-text editors
    if (e.altKey && e.key === "F10") {
      e.preventDefault();
      e.stopPropagation();
      // where to come back to (Esc, or after a command)
      const body = this._hax?.activeHaxBody;
      const sel = body?.getRootNode().getSelection?.() || globalThis.getSelection();
      const range = sel?.rangeCount ? sel.getRangeAt(0) : null;
      if (!this.matches(":focus-within")) this.__caret = range && body.contains(range.startContainer) ? new StaticRange(range) : null;
      this.shadowRoot.querySelector(".rail button")?.focus();
    }
  }

  _railKeys(e) {
    const buttons = [...this.shadowRoot.querySelectorAll(".rail button")];
    const i = buttons.indexOf(this.shadowRoot.activeElement);
    const move = (n) => buttons[(i + n + buttons.length) % buttons.length]?.focus();
    if (e.key === "ArrowDown") move(1);
    else if (e.key === "ArrowUp") move(-1);
    else if (e.key === "Home") buttons[0]?.focus();
    else if (e.key === "End") buttons[buttons.length - 1]?.focus();
    else if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
      const cat = this._cats[i];
      if (cat && this._open?.id !== cat.id) this._toggle(cat, { currentTarget: buttons[i] });
      this._focusMenu();
    } else if (e.key === "Escape") {
      if (this._open) this._close();
      else this._toContent();
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
    else if (e.key === "Escape" || e.key === "ArrowLeft") this._close(true);
    else if (e.key === "Tab") this._close();
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

  // keep the text selection: pressing a rail control must not move focus
  // out of the block before the stock command reads the selection
  _keepSelection(e) {
    if (e.target.closest?.("input")) return;
    e.preventDefault();
  }

  // menus open level with their rail button; lift one that would run past
  // the bottom of the window (its top is relative to the rail)
  updated() {
    const menu = this.shadowRoot.querySelector(".menu");
    if (!menu) return;
    const r = menu.getBoundingClientRect();
    const over = r.bottom - (globalThis.innerHeight - 8);
    if (over > 0) menu.style.top = `${Math.max(menu.offsetTop - over, 8 - this.getBoundingClientRect().top)}px`;
  }

  /* ---------- render ---------- */

  static get styles() {
    return css`
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
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        color: var(--foreground);
      }
      .rail button:hover,
      .rail button[aria-expanded="true"] {
        background: var(--accent);
        color: var(--accent-foreground);
      }
      .icon {
        flex: none;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
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
      .label {
        padding: 0.375rem 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--muted-foreground);
      }
      .sep {
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
        background: color-mix(in oklch, var(--destructive) 10%, transparent);
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
    `;
  }

  _renderItem(item) {
    if (item.sep) return html`<div class="sep" role="separator"></div>`;
    const role = item.checked !== undefined ? "menuitemradio" : item.pressed !== undefined ? "menuitemcheckbox" : "menuitem";
    const state = item.checked ?? item.pressed;
    return html`<button
      role="${role}"
      class="${item.danger ? "danger" : ""}"
      tabindex="-1"
      aria-checked="${state === undefined ? "" : String(!!state)}"
      aria-disabled="${item.disabled ? "true" : "false"}"
      aria-haspopup="${item.submenu ? "true" : "false"}"
      @click="${() => this._run(item)}"
    >
      ${icon(item.icon)}
      <span class="text">${item.label}</span>
      ${item.hint
        ? html`<span class="end">${item.hint}</span>`
        : item.shortcut
          ? html`<span class="end">${item.shortcut}</span>`
          : ""}
      ${state ? html`<span class="check">${icon("check")}</span>` : ""}
      ${item.submenu ? icon("chevron-right") : ""}
    </button>`;
  }

  _renderGrid() {
    const g = this._grid;
    const q = this._query.trim().toLowerCase();
    const options = q ? g.options.filter((o) => (o.description || "").toLowerCase().includes(q)) : g.options;
    return html`<div class="menu grid" style="top:${this._open.y}px" role="dialog" aria-label="${g.label}" @keydown="${this._gridKeys}">
      <div class="label">${g.label}</div>
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

  render() {
    const open = this._open;
    return html`
      <div class="wrap" @mousedown="${this._keepSelection}">
        <div class="rail" role="toolbar" aria-label="Block tools" aria-orientation="vertical" @keydown="${this._railKeys}">
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
              ${icon(cat.icon)}
            </button>`,
          )}
        </div>
        ${open && this._grid
          ? this._renderGrid()
          : open
            ? html`<div class="menu" role="menu" aria-label="${open.label}" style="top:${open.y}px" @keydown="${this._menuKeys}">
                <div class="label">${open.label}</div>
                ${open.items.map((item) => this._renderItem(item))}
              </div>`
            : ""}
      </div>
    `;
  }
}
customElements.define(OerBlockRail.tag, OerBlockRail);
