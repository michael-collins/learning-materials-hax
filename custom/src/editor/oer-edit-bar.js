/**
 * `oer-edit-bar` — the editing bar (nu-hax docs/editor-redesign/spec.md
 * §3.1–3.3, §7): what the theme shows in place of its top bar while a page
 * is edited, at the same height, so nothing moves. On every page: Undo and
 * Redo (off, with the reason, when there's nothing to take back), the
 * status, Exit and Save; on a course site or OER Courses (a microsite) also
 * Sections, Style, Page details and Preview, and Edit HTML, Keyboard
 * shortcuts and Command search under ⋯ More, where ordinary pages show Edit
 * HTML and Command search in the bar.
 *
 *   ● Editing  DART 413 │ Sections │ Undo Redo │ Style  Page details  Preview │ ⋯ … ● Unsaved changes  ⚠ 2 to check  Exit  Save
 *
 * - Room: as the bar narrows, its items move into ⋯ More (Preview first,
 *   Undo and Redo last), never Exit or Save; below 48rem (a phone, or 200%
 *   zoom) it reads [✕ Exit] DART 413 ● [⋯] [Save]. Words beside the icons
 *   by default; ⋯ More → Show labels is each viewer's own (localStorage
 *   oer-editor-labels, sent as `oer-editor-labels` { labels } on the
 *   window for the editor's other toolbars).
 * - Keys: a <header> named for the page ("Editing DART 413 course site"),
 *   led by Skip to selected section, with one roving toolbar (arrows,
 *   Home, End). Mod+Shift+S saves, Mod+Shift+/ exits, Mod+/ lists the
 *   keyboard shortcuts, and Esc leaves Preview (installEditBar()); not
 *   while a question or a dialog is open, whose keys are its own (but
 *   Save takes along HTML typed in Edit HTML).
 * - While the page saves, what would change it is off ("Wait until the
 *   page is saved"): a change then would be dropped by the save.
 * - Status (role="status"): No changes, Unsaved changes, Saving…, Saved,
 *   or "Couldn't save: … Your edits are still here." with Try again
 *   (stock.js savePage). "⚠ 2 to check" (presave-check.js) only when
 *   something would be missed, never stopping a save.
 * - Sections sends `oer-sections-toggle` { opener } on the window
 *   (cancelable) for the Sections sheet, which says whether it's open with
 *   `oer-sections-state` { open }.
 * - Preview (setPreview()): hax-body inert, with data-oer-preview on it
 *   and on <html> (the theme hides the editor's overlays by it), and an
 *   `oer-preview` { preview } window event, on which sections and items
 *   draw what readers see. Esc returns to editing with the same selection.
 * - As editing begins (it's made for each edit session), it keeps the page
 *   where it was read (anchor, from the theme: which block was at the top
 *   of the screen and where) until HAX has settled, selects that section,
 *   says what's being edited, and offers any unsaved edits a reload left
 *   behind (recovery.js).
 *
 *   <oer-edit-bar .site=${courseSite} page-title="…" .anchor=${{ index, top }}></oer-edit-bar>
 * @element oer-edit-bar
 */
import { html, css, LitElement } from "../lit.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "./lucide-icons.generated.js";
import { editorState, contentView } from "./editor-state.js";
import { savePage, cancelEdit, pageName, openCommandPalette, closeSource, saveAnswers, caretBefore, followPresses, isMac, MOD, DAEMON } from "./stock.js";
import { undo, redo } from "./undo.js";
import { announce } from "./announce.js";
import { select, caretInto } from "./ops.js";
import { policyOf, labelOf, phraseOf, TEXT_FIELDS } from "./policy.js";
import { offerRestore } from "./recovery.js";
import { presaveChecks } from "./presave-check.js";
import { settingsDialog } from "./oer-settings-dialog.js";
import { siteStyle } from "../ui/oer-site-style.js";
import { pageDetails } from "../types/oer-page-details.js";
import { siteData, hubPage, COURSE_SITE_TYPE } from "../types/course-site.js";
import { setEditRange } from "../ui/edit-selection.js";
import { onDefined, pinned } from "./hax-fixes.js";

const lucide = (name) => html`<span class="lucide" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

const haxStore = () => globalThis.HaxStore?.requestAvailability?.() ?? null;
const activeBody = () => haxStore()?.activeHaxBody ?? null;
const frame = () => new Promise((r) => requestAnimationFrame(r));
const LABELS_KEY = "oer-editor-labels";
// the phone layout: a window below 48rem (a phone, or 200% zoom on a laptop)
const PHONE = globalThis.matchMedia("(width < 48rem)");
// the bar's items in the order they move into ⋯ More as room runs out
const MICROSITE_ORDER = ["preview", "details", "style", "sections", "checks", "status", "undo"];
const PAGE_ORDER = ["search", "html", "checks", "status", "undo"];
// the gap between the bar's items, and a margin so they don't flap in and out
const GAP = 4;
const SLACK = 8;

function readLabels() {
  try {
    return globalThis.localStorage.getItem(LABELS_KEY) !== "false";
  } catch {
    return true;
  }
}

// focus as the person sees it, inside shadow roots
function deepActive() {
  let el = globalThis.document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el;
}

// the width an item of the bar would take with room: the page's name and
// the status, which give way as the bar narrows, at their own width (the
// name at most 14rem)
function natural(el, rem) {
  const style = getComputedStyle(el);
  const margins = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
  if (!el.matches(".who, .status")) return el.offsetWidth + margins;
  const parts = [...el.children].filter((c) => c.checkVisibility());
  const own = parts.reduce((w, c) => w + (c.matches(".name") ? Math.min(c.scrollWidth, 14 * rem) : Math.max(c.offsetWidth, c.scrollWidth)), 0);
  return own + parseFloat(style.columnGap || "0") * Math.max(0, parts.length - 1) + margins;
}

// the page's blocks as readers have them, past the page-break
const blocksOf = (body) => [...(body?.children || [])].filter((el) => el.localName !== "page-break");

// words as a sentence: a full stop, unless they end in one already
const sentence = (words) => (/[.?!…][”’")]*$/.test(words) ? words : `${words}.`);

// why the bar's changes are off while the page saves
const SAVING = "Wait until the page is saved";
// what of the editor's state the bar shows (editor-state.js)
const BAR_STATE = ["dirty", "saving", "preview", "saveError", "savedAt", "tracking"];

/* ---------- Preview ---------- */

let previewPlace = null;

/**
 * Show the page as readers see it, or go back to editing (spec §3.2):
 * hax-body inert and marked data-oer-preview (attributes of the host, not
 * its content: never saved, never an undo step), the same mark on <html>
 * for the editor's overlays, and `oer-preview` { preview } on the window.
 * Back, the selection is as it was: the caret where it was, or the unit.
 */
export function setPreview(on) {
  const body = activeBody();
  on = !!on;
  if (!body?.editMode || editorState.preview === on || (on && editorState.saving)) return false;
  const doc = globalThis.document.documentElement;
  if (on) {
    previewPlace = { unit: editorState.unit, range: caretBefore(body) };
    body.inert = true;
    body.setAttribute("data-oer-preview", "");
    doc.setAttribute("data-oer-preview", "");
  } else {
    body.inert = false;
    body.removeAttribute("data-oer-preview");
    doc.removeAttribute("data-oer-preview");
  }
  editorState.set({ preview: on });
  globalThis.dispatchEvent(new CustomEvent("oer-preview", { detail: { preview: on } }));
  if (on) {
    announce("Preview: the page as readers see it. Escape goes back to editing.");
    return true;
  }
  const place = previewPlace;
  previewPlace = null;
  announce("Back to editing");
  if (place?.range?.startContainer.isConnected && body.contains(place.range.startContainer)) {
    body.focus({ preventScroll: true });
    setEditRange(place.range);
  } else if (place?.unit?.isConnected) select(place.unit);
  return true;
}

/* ---------- the keyboard shortcuts ---------- */

const KEYS = [
  ["The page", [
    [`${MOD}⇧S`, "Save"],
    [`${MOD}⇧/`, "Exit"],
    [`${MOD}Z · ${MOD}⇧Z`, "Undo · Redo"],
    [`${DAEMON}`, "Command search"],
    [`${MOD}/`, "These shortcuts"],
    ["Esc", "Leave Preview"],
  ]],
  ["Typing", [
    ["Enter", "The next field, or a new item after this one"],
    [`${MOD}Enter`, "A new item"],
    ["Tab · ⇧Tab", "The next or previous field"],
    ["Esc", "Select what you're typing in, as a whole"],
  ]],
  ["Selected", [
    ["Enter", "Type in it"],
    ["Esc", "Up a level"],
    ["↑ ↓", "The previous or next one"],
    ["⌥⇧↑ ⌥⇧↓", "Move it"],
    [`${MOD}⇧D`, "Duplicate"],
    ["Delete", "Remove"],
    ["⇧F10", "Its actions"],
  ]],
  ["Around the editor", [
    ["Ctrl+` · Ctrl+⇧`", "The next or previous part: the bar, Sections, the selection, the page"],
    ["Alt+F10", "The selection's tools"],
  ]],
];

class OerEditBar extends LitElement {
  static get tag() {
    return "oer-edit-bar";
  }

  static get properties() {
    return {
      // the course site or OER Courses being edited (its item), or null
      site: { type: Object },
      pageTitle: { type: String, attribute: "page-title" },
      // where the page was as reading (the theme): { index, top }
      anchor: { type: Object },
      labels: { type: Boolean, reflect: true },
      _phone: { state: true },
      _hidden: { state: true },
      _s: { state: true },
      _issues: { state: true },
      _canUndo: { state: true },
      _canRedo: { state: true },
      _sectionsOpen: { state: true },
      _menu: { state: true },
    };
  }

  constructor() {
    super();
    this.site = null;
    this.pageTitle = "";
    this.anchor = null;
    this.labels = readLabels();
    this._phone = false;
    this._hidden = new Set();
    this._s = {};
    this._issues = [];
    this._canUndo = false;
    this._canRedo = false;
    this._sectionsOpen = false;
    this._menu = [];
    this.__widths = new Map();
    this.__current = "";
    this.__onState = (e) => this._follow(e?.detail?.changed);
    this.__onUndo = () => this._followUndo();
    this.__onSections = (e) => (this._sectionsOpen = !!e.detail?.open);
    this.__onLabels = (e) => (this.labels = e.detail?.labels !== false);
    this.__onContent = () => this._checkSoon();
    // the author has clicked or typed since editing began: the page is theirs
    this.__onInput = (e) => e.isTrusted && (this.__touched = true);
  }

  connectedCallback() {
    super.connectedCallback();
    editorState.addEventListener("change", this.__onState);
    for (const type of ["can-undo-changed", "can-redo-changed", "oer-undo", "haxcms-edit-mode-changed"]) globalThis.addEventListener(type, this.__onUndo);
    globalThis.addEventListener("oer-sections-state", this.__onSections);
    globalThis.addEventListener("oer-editor-labels", this.__onLabels);
    for (const type of ["cs-items-change", "cs-section-change", "oer-pending-edit"]) globalThis.addEventListener(type, this.__onContent);
    this.__touched = false;
    for (const type of ["pointerdown", "keydown", "wheel"]) globalThis.addEventListener(type, this.__onInput, true);
    this._follow();
    this._followUndo();
    this._begin();
  }

  disconnectedCallback() {
    editorState.removeEventListener("change", this.__onState);
    for (const type of ["can-undo-changed", "can-redo-changed", "oer-undo", "haxcms-edit-mode-changed"]) globalThis.removeEventListener(type, this.__onUndo);
    globalThis.removeEventListener("oer-sections-state", this.__onSections);
    globalThis.removeEventListener("oer-editor-labels", this.__onLabels);
    for (const type of ["cs-items-change", "cs-section-change", "oer-pending-edit"]) globalThis.removeEventListener(type, this.__onContent);
    for (const type of ["pointerdown", "keydown", "wheel"]) globalThis.removeEventListener(type, this.__onInput, true);
    this.__ro?.disconnect();
    globalThis.document.documentElement.style.removeProperty("--editor-bar-height");
    clearTimeout(this.__checking);
    // leaving Preview with the editor
    if (editorState.preview) setPreview(false);
    super.disconnectedCallback();
  }

  firstUpdated() {
    this.__ro = new ResizeObserver(() => {
      this._fit();
      this._shareHeight();
    });
    this.__ro.observe(this.renderRoot.querySelector("header"));
  }

  // the sheets beside the page (Style: oer-site-style.js, under <body>)
  // start below the bar, through the variable the theme sets on itself
  _shareHeight() {
    const bottom = this.renderRoot.querySelector("header")?.getBoundingClientRect().bottom || 0;
    globalThis.document.documentElement.style.setProperty("--editor-bar-height", `${Math.max(0, Math.round(bottom))}px`);
  }

  updated() {
    this._roving();
    this._fit();
  }

  /* ---------- what it shows ---------- */

  get _microsite() {
    return !!this.site;
  }

  // what the bar calls the page: a course site's code, else its title;
  // and the course sites' hub. Worked out again only when the site's
  // pages (site.json) or the page change: the site has hundreds of pages
  get _names() {
    const manifest = store.manifest;
    const site = this.site;
    const known = this.__names;
    if (known?.manifest === manifest && known.site === site && known.title === this.pageTitle) return known;
    const items = site ? toJS(manifest?.items) || [] : [];
    const short = site?.metadata?.pageType === COURSE_SITE_TYPE ? siteData(site, items).code || site.title : site?.title || this.pageTitle || "";
    this.__names = { manifest, site, title: this.pageTitle, short, hub: site ? hubPage(items) : null };
    return this.__names;
  }

  get _shortName() {
    return this._names.short;
  }

  // the editor's state, as far as the bar shows it (only these: the
  // selection's place changes every frame while it moves)
  _follow(changed) {
    const s = editorState;
    if (!changed || BAR_STATE.some((key) => changed.has(key))) {
      this._s = { dirty: !!s.dirty, saving: !!s.saving, preview: !!s.preview, saveError: s.saveError || "", savedAt: s.savedAt || 0, tracking: !!s.tracking };
    }
    if (!changed || changed.has("dirty") || changed.has("unit") || changed.has("saving")) this._checkSoon();
  }

  _followUndo() {
    const body = activeBody();
    this._canUndo = !!body?.editMode && !!body.canUndo;
    this._canRedo = !!body?.editMode && !!body.canRedo;
  }

  // the "to check" list, once typing has paused
  _checkSoon() {
    clearTimeout(this.__checking);
    this.__checking = setTimeout(() => {
      const body = activeBody();
      if (!body?.editMode || !this.site) return (this._issues = []);
      const items = toJS(store.manifest?.items) || [];
      this._issues = presaveChecks(body, items.find((i) => i.id === this.site.id) || this.site);
    }, 400);
  }

  _status() {
    const s = this._s;
    if (s.saving) return { kind: "saving", words: "Saving…" };
    if (s.saveError) return { kind: "error", words: `Couldn't save: ${s.saveError}. Your edits are still here.` };
    if (s.dirty) return { kind: "dirty", words: "Unsaved changes" };
    if (s.savedAt) return { kind: "saved", words: "Saved" };
    return { kind: "clean", words: "No changes" };
  }

  /* ---------- its items ---------- */

  // the bar's items: { id, icon, label, name (when it says more than the
  // label), keys, run(opener), off (why), pressed, expanded }
  _items() {
    const s = this._s;
    const out = [];
    const busy = s.saving ? SAVING : "";
    // (typing HAX hasn't made a step of yet is undone too: undo.js)
    const undoOff = busy || (!this._canUndo && !s.dirty ? "Nothing to undo yet" : s.preview ? "Leave Preview to undo" : "");
    const redoOff = busy || (!this._canRedo ? "Nothing to redo" : s.preview ? "Leave Preview to redo" : "");
    if (this._microsite) out.push({ id: "sections", icon: "icons:toc", label: "Sections", run: (o) => this._sections(o), expanded: this._sectionsOpen, off: busy });
    out.push({ id: "undo", icon: "icons:undo", label: "Undo", keys: `${MOD}Z`, run: () => undo(), off: undoOff });
    out.push({ id: "redo", icon: "icons:redo", label: "Redo", keys: `${MOD}⇧Z`, run: () => redo(), off: redoOff });
    if (this._microsite) {
      out.push({ id: "style", icon: "lrn:palette", label: "Style", run: (o) => this._style(o), off: busy });
      out.push({ id: "details", icon: "oer:sliders-horizontal", label: "Page details", run: (o) => pageDetails().show(this.site.id, { opener: o }), off: busy });
      out.push({ id: "preview", icon: "oer:eye", label: "Preview", run: () => setPreview(!editorState.preview), pressed: s.preview, off: busy });
    } else {
      out.push({ id: "html", icon: "oer:code", label: "Edit HTML", name: "Edit HTML source", run: () => settingsDialog().open("source"), off: busy });
      out.push({ id: "search", icon: "oer:command", label: "Command search", keys: DAEMON, run: () => openCommandPalette(), off: busy });
    }
    return out;
  }

  // the order items move into ⋯ More, for this kind of page
  get _order() {
    return this._microsite ? MICROSITE_ORDER : PAGE_ORDER;
  }

  // whether an item is in ⋯ More now (Redo goes with Undo)
  _inMore(item) {
    return this._phone || this._hidden.has(item.id === "redo" ? "undo" : item.id);
  }

  _press(item, e) {
    // (the control pressed: Safari doesn't focus a clicked button)
    const opener = e?.currentTarget instanceof HTMLElement ? e.currentTarget : null;
    if (item.off) {
      announce(item.off);
      return;
    }
    item.run(opener);
  }

  _button(item) {
    const words = this.labels;
    const tip = [item.label, item.keys ? `(${item.keys})` : "", item.off ? `· ${item.off}` : ""].filter(Boolean).join(" ");
    // (ARIA reflection: null leaves the attribute out)
    return html`<button
      class="btn ghost ${words ? "" : "icon"}"
      data-id="${item.id}"
      .ariaLabel="${item.name || (words ? null : item.label)}"
      title="${tip}"
      aria-disabled="${item.off ? "true" : "false"}"
      .ariaPressed="${item.pressed === undefined ? null : String(!!item.pressed)}"
      .ariaExpanded="${item.expanded === undefined ? null : String(!!item.expanded)}"
      @click="${(e) => this._press(item, e)}"
    >
      ${lucide(item.icon)}${words ? html`<span class="t">${item.label}</span>` : ""}
    </button>`;
  }

  /* ---------- drawing ---------- */

  render() {
    const microsite = this._microsite;
    const name = this._shortName;
    const status = this._status();
    const items = this._items().filter((i) => !this._inMore(i));
    const group = (ids) => items.filter((i) => ids.includes(i.id));
    const groups = microsite ? [group(["sections"]), group(["undo", "redo"]), group(["style", "details", "preview"])] : [group(["undo", "redo"]), group(["html", "search"])];
    const issues = this._issues;
    const statusWords = !this._phone && !this._hidden.has("status");
    const checks = issues.length && !this._phone && !this._hidden.has("checks");
    const exit = html`<button class="btn outline exit" data-id="exit" title="Exit (${MOD}⇧/)" aria-disabled="${this._s.saving ? "true" : "false"}" @click="${(e) => !this._s.saving && cancelEdit(e)}">
      ${this._phone ? lucide("oer:x") : ""}<span class="t">Exit</span>
    </button>`;
    const statusTpl = html`<span class="status ${status.kind}" title="${status.words}">
      <span class="dot" aria-hidden="true"></span><span role="status" class="${statusWords ? "words" : "words sr"}" data-id="status">${status.words}</span>
    </span>`;
    const label = microsite && this.site?.metadata?.pageType === COURSE_SITE_TYPE ? `Editing ${name} course site` : `Editing ${name}`;
    return html`<header aria-label="${label}" class="${this._phone ? "phone" : ""}">
      <a class="skip" href="#" @click="${this._skip}">${microsite ? "Skip to selected section" : "Skip to the content"}</a>
      <div class="row" role="toolbar" aria-label="Editing" @keydown="${this._rowKeys}" @focusin="${this._focused}">
        ${this._phone ? exit : ""}
        <div class="who">
          ${microsite && !this._phone ? this._brand() : ""}
          ${this._phone ? "" : html`<span class="badge"><span class="pip" aria-hidden="true"></span>Editing</span>`}
          <span class="name" title="${name}">${name}</span>
        </div>
        ${this._phone ? statusTpl : ""}
        ${groups.filter((g) => g.length).map((g) => html`<div class="group">${g.map((i) => this._button(i))}</div>`)}
        <div class="group more-wrap">
          <button
            class="btn ghost icon"
            data-id="more"
            aria-label="More"
            title="More"
            aria-haspopup="menu"
            aria-expanded="${this._menu.length ? "true" : "false"}"
            @pointerdown="${() => (this.__menuWasOpen = !!this._menu.length)}"
            @click="${this._openMore}"
          >
            ${lucide("icons:more-horiz")}
          </button>
        </div>
        <span class="spacer"></span>
        ${this._phone ? "" : statusTpl}
        ${status.kind === "error" ? html`<button class="btn outline" data-id="retry" @click="${() => savePage()}">Try again</button>` : ""}
        ${checks
          ? html`<button class="btn ghost chip" data-id="checks" aria-haspopup="dialog" @click="${(e) => this._openChecks(e.currentTarget)}">
              ${lucide("icons:warning")}<span class="t">${issues.length} to check</span>
            </button>`
          : ""}
        ${this._phone ? "" : exit}
        <button class="btn primary" data-id="save" title="Save (${MOD}⇧S)" aria-disabled="${this._s.saving ? "true" : "false"}" @click="${this._save}">
          ${lucide("icons:save")}<span class="t">Save</span>
        </button>
      </div>
      ${this._renderMenu()} ${this._renderChecks()} ${this._renderKeys()}
    </header>`;
  }

  // the course sites' brand: OER Courses, through the leave guard
  _brand() {
    const hub = this._names.hub;
    if (!hub) return "";
    return html`<a class="brand" data-id="brand" href="${hub.slug}" aria-label="${hub.title || "OER Courses"}: all the course sites" title="${hub.title || "OER Courses"}: all the course sites"
      >${lucide("lrn:book")}</a
    >`;
  }

  _renderMenu() {
    const entries = this._menu;
    return html`<div class="menu" role="menu" aria-label="More" popover="auto" @keydown="${this._menuKeys}" @toggle="${this._menuToggled}">
      ${entries.map((e) =>
        e.sep
          ? html`<div class="sep" role="separator"></div>`
          : html`<button
              role="${e.checked === undefined ? "menuitem" : "menuitemcheckbox"}"
              .ariaChecked="${e.checked === undefined ? null : String(!!e.checked)}"
              aria-disabled="${e.off ? "true" : "false"}"
              tabindex="-1"
              @click="${() => this._menuRun(e)}"
            >
              ${e.checked === undefined ? lucide(e.icon) : html`<span class="check">${e.checked ? lucide("oer:check") : ""}</span>`}<span class="t">${e.label}</span>
              ${e.off ? html`<span class="end">${e.off}</span>` : e.keys ? html`<kbd>${e.keys}</kbd>` : ""}
            </button>`,
      )}
    </div>`;
  }

  _renderChecks() {
    const issues = this._issues;
    return html`<div class="checks" role="dialog" aria-labelledby="checks-t" popover="auto" @toggle="${this._checksToggled}" @keydown="${this._checksKeys}">
      <h2 id="checks-t">To check</h2>
      <p class="sub">Saving still works; readers would miss these.</p>
      ${issues.length
        ? html`<ul>
            ${issues.map((i) => html`<li><span>${i.text}</span><button class="btn outline sm" @click="${(e) => this._fix(i, e)}">${i.fix}</button></li>`)}
          </ul>`
        : html`<p class="sub">Nothing to check.</p>`}
    </div>`;
  }

  _renderKeys() {
    return html`<dialog class="keys" aria-labelledby="keys-t" @close="${this._keysClosed}">
      <div class="keys-head">
        <h2 id="keys-t">Keyboard shortcuts</h2>
        <button class="btn ghost icon" aria-label="Close" title="Close (Esc)" @click="${() => this.renderRoot.querySelector("dialog.keys").close()}">${lucide("oer:x")}</button>
      </div>
      <div class="keys-body">
        ${KEYS.map(
          ([heading, rows]) => html`<section>
            <h3>${heading}</h3>
            <dl>${rows.map(([k, what]) => html`<dt><kbd>${k}</kbd></dt><dd>${what}</dd>`)}</dl>
          </section>`,
        )}
      </div>
    </dialog>`;
  }

  /* ---------- room ---------- */

  // move items into ⋯ More (or back) to fit the bar's width
  _fit() {
    const header = this.renderRoot.querySelector("header");
    const row = this.renderRoot.querySelector(".row");
    if (!header || !row) return;
    const rem = parseFloat(getComputedStyle(globalThis.document.documentElement).fontSize) || 16;
    const phone = PHONE.matches;
    if (phone !== this._phone) {
      this._phone = phone;
      return;
    }
    if (phone) return;
    // what each movable item takes while it's shown (Undo with Redo)
    const shown = new Map();
    for (const el of row.querySelectorAll("[data-id]")) {
      const id = el.dataset.id === "redo" ? "undo" : el.dataset.id;
      if (this._order.includes(id) && el.offsetWidth) shown.set(id, (shown.get(id) || 0) + el.offsetWidth + GAP);
    }
    for (const [id, width] of shown) this.__widths.set(`${this.labels}:${id}`, width);
    const needed = [...row.children].filter((el) => !el.matches(".spacer")).reduce((sum, el) => sum + natural(el, rem) + GAP, -GAP);
    const free = row.clientWidth - needed;
    const order = this._order.filter((id) => id !== "checks" || this._issues.length);
    if (free < 0) {
      const next = order.find((id) => !this._hidden.has(id));
      if (next) this._hidden = new Set([...this._hidden, next]);
      return;
    }
    const back = order.filter((id) => this._hidden.has(id)).pop();
    const width = back && this.__widths.get(`${this.labels}:${back}`);
    // (a group coming back brings its divider)
    if (back && width && free >= width + rem + SLACK) {
      const hidden = new Set(this._hidden);
      hidden.delete(back);
      this._hidden = hidden;
    }
  }

  /* ---------- keys and focus ---------- */

  // the toolbar's buttons, as shown
  _buttons() {
    return [...this.renderRoot.querySelectorAll(".row button, .row a[href]")].filter((b) => b.checkVisibility());
  }

  // one tab stop in the toolbar: the button last used, or the first
  _roving() {
    const buttons = this._buttons();
    const current = buttons.find((b) => b.dataset.id === this.__current) || buttons[0];
    for (const b of buttons) b.tabIndex = b === current ? 0 : -1;
  }

  _focused(e) {
    const id = e.target?.dataset?.id || (e.target?.matches?.(".brand") ? "brand" : "");
    if (!id || id === this.__current) return;
    this.__current = id;
    this._roving();
  }

  _rowKeys(e) {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    const buttons = this._buttons();
    const i = buttons.indexOf(e.target);
    if (i < 0) return;
    let next = null;
    if (step) next = buttons[(i + step + buttons.length) % buttons.length];
    else if (e.key === "Home") next = buttons[0];
    else if (e.key === "End") next = buttons[buttons.length - 1];
    else return;
    e.preventDefault();
    next.focus();
  }

  // Skip to selected section (on an ordinary page, Skip to the content):
  // focus on what's selected (its name tag), or the caret in its first
  // field; with nothing selected, the first section (or block)
  _skip(e) {
    e.preventDefault();
    const body = activeBody();
    if (!body?.editMode || editorState.preview) return;
    const unit = editorState.unit?.isConnected ? editorState.unit : blocksOf(body).find((el) => policyOf(el).kind === "section") || blocksOf(body)[0];
    if (!unit) return;
    select(unit);
    if (deepActive() !== e.currentTarget) return;
    const field = unit.matches(TEXT_FIELDS) ? unit : unit.querySelector(TEXT_FIELDS);
    if (field) caretInto(field);
    else body.focus({ preventScroll: true });
  }

  /* ---------- the actions ---------- */

  // (from Preview too, which ends first; focus goes to Edit content once
  // the saved page is up: the theme)
  _save() {
    if (this._s.saving) return;
    savePage();
  }

  _sections(opener) {
    const asked = new CustomEvent("oer-sections-toggle", { cancelable: true, detail: { opener } });
    globalThis.dispatchEvent(asked);
  }

  _style(opener) {
    const items = toJS(store.manifest?.items) || [];
    siteStyle().show(items.find((i) => i.id === this.site.id) || this.site, { opener });
  }

  // the ⋯ More menu: what's moved there, then Edit HTML (on a microsite),
  // the shortcuts, command search and Show labels
  _openMore(e) {
    const trigger = e.currentTarget;
    const menu = this.renderRoot.querySelector(".menu");
    // (a press on ⋯ with the menu open closes it: the press itself did)
    const wasOpen = this.__menuWasOpen || menu.matches(":popover-open");
    this.__menuWasOpen = false;
    if (wasOpen) return menu.matches(":popover-open") && menu.hidePopover();
    const entries = this._items().filter((i) => this._inMore(i));
    if (this._issues.length && (this._phone || this._hidden.has("checks"))) {
      entries.push({ id: "checks", icon: "icons:warning", label: `${this._issues.length} to check`, run: () => this._openChecks(trigger) });
    }
    if (entries.length) entries.push({ sep: true });
    const busy = this._s.saving ? SAVING : "";
    if (this._microsite) entries.push({ id: "html", icon: "oer:code", label: "Edit HTML", run: () => settingsDialog().open("source"), off: busy || (this._s.preview ? "Leave Preview to edit HTML" : "") });
    entries.push({ id: "keys", icon: "hardware:keyboard", label: "Keyboard shortcuts", keys: `${MOD}/`, run: () => this.showKeys(trigger) });
    if (this._microsite) entries.push({ id: "search", icon: "oer:command", label: "Command search", keys: DAEMON, run: () => openCommandPalette(), off: busy });
    entries.push({ sep: true });
    entries.push({ id: "labels", label: "Show labels", checked: this.labels, run: () => this._setLabels(!this.labels) });
    this.__menuOpener = trigger;
    this._menu = entries;
    this.updateComplete.then(() => {
      const r = trigger.getBoundingClientRect();
      menu.style.top = `${Math.round(r.bottom + 4)}px`;
      menu.style.left = `${Math.round(Math.max(8, Math.min(r.left, globalThis.innerWidth - 8 - 16 * 16)))}px`;
      menu.showPopover();
      menu.querySelector("[role^=menuitem]")?.focus();
    });
  }

  _menuRun(entry) {
    if (entry.off) return announce(entry.off);
    const opener = this.__menuOpener;
    this.renderRoot.querySelector(".menu").hidePopover();
    entry.run(opener);
  }

  _menuKeys(e) {
    const items = [...e.currentTarget.querySelectorAll("[role^=menuitem]")];
    const i = items.indexOf(this.renderRoot.activeElement);
    const to = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: items.length - 1 }[e.key];
    if (to !== undefined) {
      e.preventDefault();
      items[(to + items.length) % items.length]?.focus();
    } else if (e.key === "Tab") e.currentTarget.hidePopover();
  }

  _menuToggled(e) {
    if (e.newState !== "closed") return;
    this._menu = [];
    // back to ⋯ when focus was in the menu (Esc, or a click outside it took none)
    const active = deepActive();
    if (!active || active === globalThis.document.body || e.currentTarget.contains(active)) this.__menuOpener?.focus();
  }

  _setLabels(on) {
    this.labels = on;
    this.__widths.clear();
    this._hidden = new Set();
    try {
      globalThis.localStorage.setItem(LABELS_KEY, on ? "true" : "false");
    } catch {
      // (for this visit only)
    }
    globalThis.dispatchEvent(new CustomEvent("oer-editor-labels", { detail: { labels: on } }));
    announce(on ? "Labels shown" : "Icons only");
  }

  _openChecks(opener) {
    const pop = this.renderRoot.querySelector(".checks");
    this.__checksOpener = opener;
    const r = opener.getBoundingClientRect();
    pop.style.top = `${Math.round(r.bottom + 4)}px`;
    pop.style.left = `${Math.round(Math.max(8, Math.min(r.right - 22 * 16, globalThis.innerWidth - 8 - 22 * 16)))}px`;
    pop.showPopover();
    pop.querySelector("button")?.focus();
  }

  _checksKeys(e) {
    if (e.key === "Tab") {
      const buttons = [...e.currentTarget.querySelectorAll("button")];
      if (!buttons.length) return;
      const i = buttons.indexOf(this.renderRoot.activeElement);
      const to = buttons[(i + (e.shiftKey ? -1 : 1) + buttons.length) % buttons.length];
      e.preventDefault();
      to.focus();
    }
  }

  _checksToggled(e) {
    if (e.newState !== "closed") return;
    const active = deepActive();
    if (!active || active === globalThis.document.body || e.currentTarget.contains(active)) this.__checksOpener?.focus();
  }

  _fix(issue, e) {
    const pop = this.renderRoot.querySelector(".checks");
    const opener = this.__checksOpener?.isConnected ? this.__checksOpener : e.currentTarget;
    // (closed first, so focus can go where the fix takes it)
    this.__checksOpener = null;
    pop.hidePopover();
    issue.run(opener);
  }

  /** The keyboard shortcuts, in a dialog; focus goes back to opener as it closes. */
  showKeys(opener = null) {
    const dialog = this.renderRoot.querySelector("dialog.keys");
    if (!dialog || dialog.open) return;
    this.__keysOpener = opener || deepActive();
    dialog.showModal();
    dialog.querySelector("button")?.focus();
  }

  _keysClosed() {
    const opener = this.__keysOpener;
    this.__keysOpener = null;
    if (opener?.isConnected) opener.focus();
  }

  /* ---------- as editing begins ---------- */

  // an ordinary page: the caret at the start of the first block on screen
  // that takes typing, or that block selected, so focus isn't left nowhere
  _caretAtTop(body) {
    const view = contentView();
    const block = blocksOf(body).find((el) => el.getBoundingClientRect().bottom > view.top + 1);
    if (!block) return false;
    const field = block.matches(TEXT_FIELDS) ? block : block.querySelector(TEXT_FIELDS);
    if (field && haxStore()?.isTextElement?.(block)) {
      caretInto(field);
      return true;
    }
    select(block);
    return false;
  }

  // keep the block that was at the top of the screen at the same height
  // (until the author clicks, types or scrolls)
  _keepPlace() {
    const anchor = this.__touched ? null : this.anchor;
    const body = activeBody();
    const block = anchor && blocksOf(body)[anchor.index];
    if (!block) return;
    const dy = block.getBoundingClientRect().top - anchor.top;
    if (Math.abs(dy) < 0.5) return;
    const main = globalThis.document.querySelector("custom-oer-docs-theme")?.shadowRoot?.querySelector("main");
    if (contentView().scroller === "main" && main) main.scrollTop += dy;
    else globalThis.scrollBy(0, dy);
  }

  async _begin() {
    const started = performance.now();
    editorState.set({ saveError: "", savedAt: 0 });
    // until HAX has imported the page and settled (the baseline is taken then)
    while (this.isConnected && store.editMode && !editorState.tracking && performance.now() - started < 5000) {
      this._keepPlace();
      await frame();
    }
    if (!this.isConnected || !store.editMode) return;
    this._keepPlace();
    const body = activeBody();
    const name = pageName();
    // "Editing DART 413 course site, 10 sections. Hero selected. Enter
    // edits it; arrows go to other sections; Control-backtick reaches the
    // editing bar." (spec §2)
    let said = `Editing ${name.replace(/^“(.*)”$/, "$1")}`;
    let ways = "Control-backtick reaches the editing bar.";
    let unit = null;
    if (this._microsite && body) {
      const sections = blocksOf(body).filter((el) => policyOf(el).kind === "section");
      unit = blocksOf(body)[this.anchor?.index ?? -1] || sections[0] || null;
      said += `, ${sections.length} ${sections.length === 1 ? "section" : "sections"}`;
      // (not over what the author has chosen meanwhile)
      if (unit && !this.__touched && select(unit)) {
        this._keepPlace();
        const what = policyOf(unit).kind === "section" ? labelOf(unit) : phraseOf(unit, { start: true });
        said += `. ${what} selected`;
        ways = `Enter edits it; arrows go to other sections; ${ways[0].toLowerCase()}${ways.slice(1)}`;
      }
    } else if (body && !this.__touched && this._caretAtTop(body)) {
      ways = `Typing goes where the caret is. ${ways}`;
    }
    announce(`${sentence(said)} ${ways}`);
    const restored = await offerRestore({ name, opener: deepActive() });
    // (the page put back is a new copy: the section again)
    if (restored === "restore" && unit && this.isConnected) {
      const again = blocksOf(activeBody())[blocksOf(body).indexOf(unit)] || blocksOf(activeBody())[this.anchor?.index ?? 0];
      if (again) select(again);
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      header {
        box-sizing: border-box;
        position: relative;
        height: calc(3.5rem + 1px);
        padding: 0 1rem;
        border-bottom: 1px solid var(--border);
        background: color-mix(in oklch, var(--background) 88%, transparent);
        backdrop-filter: blur(8px);
      }
      .skip {
        position: absolute;
        left: 0.5rem;
        top: 0.5rem;
        z-index: 2;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-md);
        background: var(--primary);
        color: var(--primary-foreground);
        font-size: 0.875rem;
        font-weight: 500;
        text-decoration: none;
        transform: translateY(-200%);
      }
      .skip:focus {
        transform: none;
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        height: 100%;
        min-width: 0;
      }
      .row > * {
        flex: none;
      }
      .who {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 0 1 auto;
        min-width: 3rem;
        margin-right: 0.25rem;
      }
      .brand {
        display: inline-grid;
        place-items: center;
        flex: none;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-md);
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .brand:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        flex: none;
        height: 1.5rem;
        padding: 0 0.5rem;
        border: 1px solid var(--border);
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 500;
        white-space: nowrap;
      }
      .pip {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 999px;
        background: var(--primary);
      }
      .name {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.875rem;
        font-weight: 600;
      }
      .group {
        display: flex;
        align-items: center;
        gap: 0.125rem;
        position: relative;
        padding-left: 0.5rem;
      }
      .group::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        width: 1px;
        height: 1rem;
        margin-top: -0.5rem;
        background: var(--border);
      }
      .spacer {
        flex: 1 1 0;
        min-width: 0;
      }
      .lucide {
        flex: none;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      .btn {
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.375rem;
        height: 2rem;
        padding: 0 0.625rem;
        border: 1px solid transparent;
        border-radius: var(--radius-md);
        background: none;
        color: var(--foreground);
        font: inherit;
        font-size: 0.8125rem;
        font-weight: 500;
        white-space: nowrap;
        cursor: pointer;
      }
      .btn.icon {
        width: 2rem;
        padding: 0;
      }
      .btn.sm {
        height: 1.75rem;
        padding: 0 0.5rem;
        font-size: 0.75rem;
      }
      .btn.ghost:hover,
      .btn.outline:hover {
        background: var(--accent);
      }
      .btn.outline {
        border-color: var(--input-border, var(--border));
        background: var(--background);
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .btn.primary:hover {
        background: color-mix(in oklab, var(--primary) 88%, var(--foreground));
      }
      .btn[aria-pressed="true"] {
        background: var(--accent);
        box-shadow: inset 0 0 0 1px var(--input-border, var(--border));
      }
      .btn[aria-disabled="true"] {
        color: var(--muted-foreground);
        cursor: default;
      }
      .btn[aria-disabled="true"]:hover {
        background: none;
      }
      .btn.primary[aria-disabled="true"] {
        background: color-mix(in oklab, var(--primary) 60%, var(--background));
        color: var(--primary-foreground);
      }
      .btn:focus-visible,
      [role^="menuitem"]:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
      .chip {
        color: var(--foreground);
      }
      .status {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        flex: 0 1 auto;
        min-width: 1rem;
        margin: 0 0.25rem;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .status .words {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .status.error {
        color: var(--destructive);
      }
      .status.error .words {
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 1.25;
        max-width: 22rem;
      }
      .dot {
        flex: none;
        box-sizing: border-box;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 999px;
        border: 1.5px solid var(--muted-foreground);
      }
      .dirty .dot,
      .saving .dot {
        border-color: var(--primary);
        background: var(--primary);
      }
      .error .dot {
        border-color: var(--destructive);
        background: var(--destructive);
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
      /* a phone: [✕ Exit] DART 413 ● [⋯] [Save] */
      .phone .who {
        flex: 1 1 auto;
        margin-left: 0.25rem;
      }
      .phone .group {
        padding-left: 0;
      }
      .phone .group::before {
        display: none;
      }
      .phone .spacer {
        display: none;
      }
      .phone .status {
        margin: 0 0.25rem;
      }
      @media (forced-colors: active) {
        .dot,
        .pip {
          border: 1px solid CanvasText;
        }
      }

      /* ⋯ More and To check: popovers below their button */
      .menu,
      .checks {
        position: fixed;
        inset: auto;
        margin: 0;
        box-sizing: border-box;
        padding: 0.25rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        background: var(--popover, var(--background));
        color: var(--popover-foreground, var(--foreground));
        box-shadow: 0 8px 24px rgb(0 0 0 / 0.12);
        font-family: var(--font-sans, system-ui, sans-serif);
      }
      .menu {
        width: 16rem;
      }
      .menu [role^="menuitem"] {
        all: unset;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        padding: 0.4375rem 0.5rem;
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
        cursor: pointer;
      }
      .menu [role^="menuitem"]:hover,
      .menu [role^="menuitem"]:focus-visible {
        background: var(--accent);
      }
      .menu [aria-disabled="true"] {
        color: var(--muted-foreground);
        cursor: default;
      }
      .menu .t {
        flex: 1;
      }
      .menu kbd,
      .menu .end {
        font: inherit;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .menu .check {
        display: inline-grid;
        place-items: center;
        width: 1rem;
        height: 1rem;
      }
      .menu .sep {
        height: 1px;
        margin: 0.25rem -0.25rem;
        background: var(--border);
      }
      .menu .sep:first-child,
      .menu .sep:last-child {
        display: none;
      }
      .checks {
        width: min(22rem, calc(100vw - 1rem));
        padding: 0.75rem;
      }
      .checks h2,
      .keys h2 {
        margin: 0;
        font-size: 0.9375rem;
        font-weight: 600;
      }
      .checks .sub {
        margin: 0.25rem 0 0.5rem;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .checks ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .checks li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        font-size: 0.8125rem;
        line-height: 1.4;
      }
      .checks li .btn {
        flex: none;
      }

      /* the keyboard shortcuts */
      dialog.keys {
        width: min(36rem, calc(100vw - 2rem));
        max-height: calc(100dvh - 2rem);
        padding: 0;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg, 0.75rem);
        background: var(--popover, var(--background));
        color: var(--popover-foreground, var(--foreground));
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        font-family: var(--font-sans, system-ui, sans-serif);
      }
      dialog.keys::backdrop {
        background: rgb(0 0 0 / 0.5);
      }
      .keys-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem 0.75rem 0.75rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      .keys-body {
        padding: 0.5rem 1.25rem 1.25rem;
        overflow-y: auto;
      }
      .keys h3 {
        margin: 1rem 0 0.375rem;
        font-size: 0.8125rem;
        font-weight: 600;
      }
      .keys dl {
        display: grid;
        grid-template-columns: max-content 1fr;
        gap: 0.375rem 1rem;
        margin: 0;
        font-size: 0.8125rem;
      }
      .keys dd {
        margin: 0;
        color: var(--muted-foreground);
      }
      .keys kbd {
        font: inherit;
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.75rem;
        padding: 0.0625rem 0.375rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        background: var(--muted);
      }
      @media (prefers-reduced-motion: no-preference) {
        .skip {
          transition: transform 120ms ease-out;
        }
      }
    `;
  }
}

if (!customElements.get(OerEditBar.tag)) customElements.define(OerEditBar.tag, OerEditBar);

/* ---------- keys anywhere while editing ---------- */

const bar = () => globalThis.document.querySelector("custom-oer-docs-theme")?.shadowRoot?.querySelector(OerEditBar.tag) ?? null;

// what's open over the page where a key was pressed: a question
// (oer-confirm), Edit HTML (oer-settings-dialog showing HAX's view-source
// in its tray), another dialog or a popover, a sheet beside the page (a
// non-modal dialog: Style, Sections); or nothing
function openOver(e) {
  if (globalThis.document.querySelector("oer-confirm")?.shadowRoot?.querySelector("dialog[open]")) return "question";
  const path = e.composedPath();
  const settings = globalThis.document.querySelector("oer-settings-dialog");
  if (settings?.mode && path.some((n) => n === settings || n.localName === "hax-tray")) return settings.mode === "source" ? "source" : "dialog";
  const role = (n) => (n.nodeType === 1 && n.getAttribute("role")) || "";
  const open = (n) => n.nodeType === 1 && ((n.localName === "dialog" && n.open) || n.matches(":popover-open") || role(n) === "alertdialog" || (role(n) === "dialog" && n.getAttribute("aria-modal") === "true"));
  if (path.some(open)) return "dialog";
  return path.some((n) => role(n) === "dialog") ? "sheet" : "";
}

function editingKeys(e) {
  if (!store.editMode || e.defaultPrevented || e.isComposing) return;
  if (e.key === "Escape") {
    // (an Esc for what's open over the page is its own)
    if (!editorState.preview || openOver(e) || globalThis.document.querySelector("oer-settings-dialog")?.mode) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    setPreview(false);
    return;
  }
  // ⌘ on a Mac (and HAX's own Ctrl), Ctrl elsewhere
  const mod = isMac ? e.metaKey || e.ctrlKey : e.ctrlKey && !e.metaKey;
  if (!mod || e.altKey) return;
  const key = e.code;
  let run = null;
  if (e.shiftKey && key === "KeyS") run = () => !editorState.saving && savePage();
  else if (e.shiftKey && key === "Slash") run = () => cancelEdit();
  else if (!e.shiftKey && key === "Slash") run = () => bar()?.showKeys();
  if (!run) return;
  // (before HAX's own shortcuts, which save by leaving edit mode first)
  e.preventDefault();
  e.stopImmediatePropagation();
  // under a question or a dialog, nothing (Save takes Edit HTML's along;
  // a sheet beside the page stays as it is)
  const over = openOver(e);
  if (over && over !== "source" && over !== "sheet") return;
  run();
}

let installed = false;
/**
 * The editing bar's keys: Mod+Shift+S, Mod+Shift+/, Mod+/ and Esc in
 * Preview. And HAX's own way to save (its edit button's handler, which its
 * command palette and shortcuts call: it ends editing first, so the page
 * from before showed for seconds) saves as Save does.
 * haxcms-site-editor-ui.js _editButtonTap 5743, _toggleEditMode 5808.
 */
export function installEditBar() {
  if (installed) return;
  installed = true;
  globalThis.addEventListener("keydown", editingKeys, true);
  followPresses();
  onDefined("haxcms-site-editor-ui", (EditorUI) => {
    pinned(
      { fix: "HAX's save holds the edited page", owner: "haxcms-site-editor-ui", target: EditorUI.prototype, method: "_editButtonTap", marker: "_toggleEditMode", file: "editor/oer-edit-bar.js" },
      (original) =>
        function (...args) {
          if (!this.editMode || !store.editMode) return original.apply(this, args);
          savePage();
          return false;
        },
    );
  });
  // each save hears its own answer (stock.js saveAnswers)
  onDefined("haxcms-site-editor", (SiteEditor) => {
    const spec = { owner: "haxcms-site-editor", target: SiteEditor.prototype, file: "editor/stock.js" };
    pinned({ ...spec, fix: "a save hears its own answer", method: "_requestJson", marker: "generateRequest" }, saveAnswers._requestJson);
    pinned({ ...spec, fix: "a save hears its own failure", method: "lastErrorChanged", marker: "jwt-login-refresh-token" }, saveAnswers.lastErrorChanged);
  });
  // a save from Preview ends it first (stock.js)
  globalThis.addEventListener("oer-preview-end", () => setPreview(false));
  // Preview ends with editing, and so do the questions and dialogs about it
  globalThis.addEventListener("haxcms-edit-mode-changed", (e) => {
    if (e.detail) return;
    const body = activeBody();
    if (body?.hasAttribute("data-oer-preview")) {
      body.inert = false;
      body.removeAttribute("data-oer-preview");
    }
    globalThis.document.documentElement.removeAttribute("data-oer-preview");
    previewPlace = null;
    globalThis.document.querySelector("oer-confirm")?.dismiss?.();
    closeSource();
  });
}
