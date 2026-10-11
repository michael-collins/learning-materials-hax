/**
 * `oer-settings-dialog` — block settings in a centred modal, with a live
 * preview of the block beside the form; also hosts the HTML source view.
 *
 *   ┌ ⚌ Image settings ─────────────────────────────────── ✕ ┐
 *   │ ┌─────────── preview ───────────┐ ┌──── settings ────┐ │
 *   │ │                               │ │ Description      │ │
 *   │ │  (a live copy of the block,   │ │ Caption          │ │
 *   │ │   at its width on the page)   │ │ Size             │ │
 *   │ │                               │ │ Position         │ │
 *   │ └───────────────────────────────┘ └──────────────────┘ │
 *   └─────────────────────────────────────────────────────────┘
 *
 *   settingsDialog().open("settings", opener)   // the active block's
 *   settingsDialog().open("source", opener)     // the page's HTML
 *
 * The form is HAX's own editor panel (hax-tray), which builds the fields
 * for every block and applies changes to it, cut down to the block's
 * curated settings (block-settings.js, hax-fixes.js curateSettingsForms).
 * The tray stays hidden except while this dialog is open; then it is sized
 * and placed over the dialog's form area (see the hax-tray rules in
 * editor-skin.js). It doesn't open for a block with no settings: open()
 * returns false.
 *
 * While it's open the page behind it and the editor's chrome are inert
 * (HAX's palette, popovers and toasts aren't, so the form's own pickers
 * work), Tab and Shift+Tab go round the dialog and the form, and Esc
 * closes it, unless the command palette is open, which Esc closes first.
 * In the HTML source's code editor, where Tab indents, Esc leaves the
 * editor for Update HTML instead. Closing the source with changes not yet
 * applied asks first (Keep editing, Discard changes or Update HTML), and
 * Update HTML closes it. Closing gives focus back to the control that
 * opened it (opener: from the click, since Safari doesn't focus a clicked
 * button). For screen readers the element itself is the dialog, and owns
 * the panel as its form (aria-owns).
 *
 * The preview is a non-interactive copy of the block, refreshed whenever
 * the block changes, drawn at the block's width on the page in a
 * container (container-type: inline-size) and scaled down to fit, with the
 * page's type and the course site's style variables, so columns and
 * sizes show as readers will see them.
 * @element oer-settings-dialog
 */
import { html, css, LitElement } from "../lit.js";
import { LUCIDE_ICONS } from "./lucide-icons.generated.js";
import { showPanel } from "./stock.js";
import { hasSettings, settingsTitle } from "./block-settings.js";
import { confirmDialog } from "../ui/oer-confirm.js";

const icon = (name) =>
  html`<span class="icon" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[`oer:${name}`] || ""}&quot;)"></span>`;

// editor-only attributes stripped from the preview copy
const EDITOR_ATTRS = ["contenteditable", "data-hax-active", "data-hax-ray", "draggable", "id"];

// what the preview takes from the block's place on the page: its type, and
// a course site's style (types/course-site-style.js siteStyleVars)
const TYPE = ["font-family", "font-size", "line-height", "color"];
const SITE_VARS = ["--primary", "--primary-foreground", "--link", "--ring", "--cs-font-display", "--cs-display-weight", "--cs-font-body"];

// HAX's overlays, which the form's fields open (the command palette, a
// picker's popover, the text prompts) and its messages: left live while
// the page is inert
const OVERLAYS = new Set([
  "super-daemon",
  "super-daemon-toast",
  "simple-popover-manager",
  "simple-modal",
  "rich-text-editor-prompt",
  "hax-app-picker",
  "absolute-position-state-manager",
  "oer-toast",
  "oer-announcer",
  "oer-confirm",
  "haxcms-toast",
]);

const palette = () => globalThis.SuperDaemonManager?.requestAvailability?.();

// what Tab stops at in a tree, shadow roots and slots included, in order:
// a code editor's frame too (HTML source), and nothing hidden from screen
// readers (an upload field's own file input)
function tabbables(root) {
  const out = [];
  const visit = (el) => {
    if (el.inert || el.hidden || el.getAttribute("aria-hidden") === "true") return;
    if (el.tabIndex >= 0 && !el.disabled && (el.hasAttribute("tabindex") || el.matches("a[href], button, input, select, textarea, summary, iframe, [contenteditable='true']")) && el.checkVisibility?.({ visibilityProperty: true }) !== false) {
      out.push(el);
    }
    const kids = el.shadowRoot ? el.shadowRoot.children : el.localName === "slot" ? el.assignedElements({ flatten: true }) : el.children;
    for (const kid of kids) visit(kid);
  };
  for (const kid of root.children) visit(kid);
  return out;
}

// focus on an element, or, for a frame (the code editor), on what Tab
// would stop at first in it (last, going back), as the browser's own Tab
// does: focus on the frame itself left the editor in it unfocused
function focusInto(el, back = false) {
  if (el.localName === "iframe") {
    let inside = [];
    try {
      inside = el.contentDocument?.body ? tabbables(el.contentDocument.body) : [];
    } catch {}
    const target = back ? inside[inside.length - 1] : inside[0];
    if (target) return target.focus();
  }
  el.focus();
}

// code as a browser reads it (the code editor holds what it was given
// parsed, its text as typed), whitespace run together: the same page, the
// same text
function asParsed(code) {
  const t = globalThis.document.createElement("template");
  t.innerHTML = code || "";
  return t.innerHTML.replace(/\s+/g, " ").trim();
}

// focus as it really is: inside the innermost shadow root
function deepActive() {
  let el = globalThis.document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el;
}

class OerSettingsDialog extends LitElement {
  static get tag() {
    return "oer-settings-dialog";
  }

  static get properties() {
    return {
      mode: { type: String, reflect: true }, // "settings" | "source" | null
      _title: { state: true },
    };
  }

  constructor() {
    super();
    this.mode = null;
    this._title = "";
    this.__keys = (e) => this._keys(e);
    this.__frameKeys = (e) => this._frameKeys(e);
    // (focus going into a frame, by Tab or a click, takes it from this window)
    this.__intoFrame = () => setTimeout(() => this._watchFrame(deepActive()));
    this.__place = () => this._placeTray();
  }

  get _hax() {
    return globalThis.HaxStore?.requestAvailability?.();
  }

  get _tray() {
    return this._hax?.haxTray;
  }

  // HAX's HTML source panel, and its code editor
  get _source() {
    return this._tray?.shadowRoot?.querySelector("#view-source") ?? null;
  }

  get _code() {
    return this._source?.shadowRoot?.querySelector("#textarea") ?? null;
  }

  /**
   * Open the active block's settings, or (mode "source") the page HTML.
   * opener is the control to give focus back to. Returns whether it
   * opened: a block with no settings has none to show.
   */
  open(mode = "settings", opener = null) {
    const hax = this._hax;
    const node = hax?.activeNode;
    if (mode === "settings" && (!node || !hasSettings(node))) return false;
    if (this.mode) this.close({ focus: false });
    this.__opener = opener;
    this.__node = mode === "settings" ? node : null;
    this._title = mode === "settings" ? settingsTitle(node) : "HTML source";
    this.mode = mode;
    showPanel(mode === "source" ? "view-source" : "content-edit");
    this._tray?.setAttribute("data-oer-dialog", mode);
    this._watchPanel(mode === "source" ? "view-source" : "content-edit");
    this._own(true);
    globalThis.addEventListener("keydown", this.__keys, true);
    globalThis.addEventListener("resize", this.__place);
    globalThis.addEventListener("blur", this.__intoFrame);
    this.updateComplete.then(async () => {
      if (!this.mode) return;
      this.__resize = new ResizeObserver(this.__place);
      this.__resize.observe(this.shadowRoot.querySelector(".form"));
      this._placeTray();
      this._refreshPreview();
      this._watch();
      this._inertPage(true);
      await this._tray?.updateComplete;
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      if (!this.mode) return;
      // the first field, or the close button
      const [first] = this._tray ? tabbables(this._tray.shadowRoot) : [];
      focusInto(first || this.shadowRoot.querySelector(".close"));
    });
    return true;
  }

  close({ focus = true } = {}) {
    if (!this.mode) return;
    this.mode = null;
    this.__resize?.disconnect();
    this.__observer?.disconnect();
    this.__stageResize?.disconnect();
    this.__panel?.disconnect();
    globalThis.removeEventListener("keydown", this.__keys, true);
    globalThis.removeEventListener("resize", this.__place);
    globalThis.removeEventListener("blur", this.__intoFrame);
    for (const win of this.__frames || []) win.removeEventListener("keydown", this.__frameKeys, true);
    this.__frames = null;
    this._tray?.removeAttribute("data-oer-dialog");
    this._own(false);
    this._inertPage(false);
    const opener = this.__opener;
    const node = this.__node;
    this.__opener = this.__node = null;
    this.querySelector("[slot='preview']")?.replaceChildren();
    if (!focus) return;
    // back to what opened it; else, for a text block, into it
    if (opener?.isConnected && opener.checkVisibility?.() !== false) opener.focus();
    else if (node?.isConnected && node.isContentEditable) node.focus();
  }

  /* ---------- keys ---------- */

  _keys(e) {
    // (the question about changes not applied is over the dialog, with its own keys)
    if (!this.mode || this.__asking) return;
    // the command palette is over the dialog: its keys are its own (Esc closes it)
    if (palette()?.opened) return;
    if (e.key === "Escape" && !e.defaultPrevented) {
      e.preventDefault();
      e.stopPropagation();
      this._requestClose();
    } else if (e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey) {
      this._trapTab(e);
      setTimeout(() => this._watchFrame(deepActive()));
    }
  }

  // keys pressed in a frame in the form (the HTML source's code editor,
  // where Tab and Shift+Tab indent) stay in it: Esc there is the way out,
  // to the form's first control (Update HTML), once focus has gone in
  // (after a Tab, or as this window loses it), unless one of the editor's
  // own pop-ups is open (suggestions, find), which Esc closes
  _watchFrame(el) {
    if (el?.localName !== "iframe" || !this.mode) return;
    let win = null;
    try {
      // (only a frame of this page's own: the editor writes its document)
      if (el.contentWindow?.document) win = el.contentWindow;
    } catch {}
    this.__frames ??= [];
    if (!win || this.__frames.includes(win)) return;
    win.addEventListener("keydown", this.__frameKeys, true);
    this.__frames.push(win);
  }

  _frameKeys(e) {
    if (e.key !== "Escape" || !this.mode || this.__asking || palette()?.opened) return;
    // (monaco's pop-ups, which take Esc themselves)
    if (e.currentTarget.document.querySelector(".editor-widget.visible")) return;
    e.preventDefault();
    e.stopPropagation();
    const [first] = this._tray ? tabbables(this._tray.shadowRoot) : [];
    focusInto(first || this.shadowRoot.querySelector(".close"));
  }

  /* ---------- closing ---------- */

  // closing as the author asks (Esc, Close, a click outside): the HTML
  // source with changes not yet on the page asks what to do with them
  async _requestClose() {
    if (this.__asking) return;
    if (this.mode !== "source" || !this._unapplied()) return this.close();
    this.__asking = true;
    const choice = await confirmDialog().ask({
      title: "Discard your HTML changes?",
      text: "The page doesn't have them yet: Update HTML puts them on it.",
      actions: [
        { id: "keep", label: "Keep editing" },
        { id: "discard", label: "Discard changes", kind: "destructive" },
        { id: "update", label: "Update HTML", kind: "primary" },
      ],
    });
    this.__asking = false;
    if (this.mode !== "source") return;
    if (choice === "discard") this.close();
    else if (choice === "update") {
      await this._source?.updateBodyFromHTML();
      this.close();
    }
    // back to the code
    else if (this._code) focusInto(tabbables(this._code.shadowRoot).find((el) => el.localName === "iframe") || this._code);
  }

  // whether the code editor holds changes the page doesn't have: its text
  // against what it was given (HAX writes that into it as a template)
  _unapplied() {
    const code = this._code;
    const given = code?.querySelector(":scope > template")?.innerHTML;
    return given !== undefined && typeof code.value === "string" && asParsed(code.value) !== asParsed(given);
  }

  // HAX moving its panel on closes the dialog, which would show the wrong
  // one: Update HTML and Clean formatting do, once they've put the code on
  // the page, and so does the active block going (the block picker)
  _watchPanel(panel) {
    const tray = this._tray;
    this.__panel?.disconnect();
    if (!tray) return;
    this.__panel = new MutationObserver(() => {
      if (this.mode && tray.trayDetail !== panel) this.close();
    });
    this.__panel.observe(tray, { attributes: true, attributeFilter: ["tray-detail"] });
  }

  // Tab goes round the dialog's own controls, then the form (the tray,
  // elsewhere in the document): at either end, on to the other
  _trapTab(e) {
    const own = tabbables(this.shadowRoot);
    const form = this._tray ? tabbables(this._tray.shadowRoot) : [];
    const ring = [...own, ...form];
    if (!ring.length) return;
    // (anywhere else, the browser's own Tab stays inside: the rest is inert)
    const at = deepActive();
    if (!ring.includes(at)) return;
    // the ends of each part, where the browser's own Tab would leave
    const last = (list) => list[list.length - 1];
    let next = null;
    if (!e.shiftKey) {
      if (at === last(own)) next = form[0] || own[0];
      else if (at === last(form)) next = own[0];
    } else if (at === own[0]) next = last(form) || last(own);
    else if (at === form[0]) next = last(own);
    if (!next) return;
    e.preventDefault();
    focusInto(next, e.shiftKey);
  }

  /* ---------- for screen readers ---------- */

  // this element is the dialog, and owns HAX's panel (elsewhere in the
  // document) as its form, so the fields are read out in it: a dialog in
  // the shadow root couldn't name the panel, and aria-modal hid it
  _own(on) {
    const tray = this._tray;
    if (on && tray && !tray.id) tray.id = "oer-settings-form";
    const attrs = { role: "dialog", "aria-modal": "true", "aria-label": this._title, "aria-owns": tray?.id };
    for (const [name, value] of Object.entries(attrs)) {
      if (on && value) this.setAttribute(name, value);
      else this.removeAttribute(name);
    }
  }

  /* ---------- the page behind ---------- */

  // the page, the editor's chrome and anything else in the document: inert
  // while the dialog is open (not the tray, nor HAX's overlays)
  _inertPage(on) {
    if (!on) {
      for (const el of this.__inerted || []) el.inert = false;
      this.__inerted = null;
      return;
    }
    const tray = this._tray;
    this.__inerted = [...globalThis.document.body.children].filter((el) => el !== this && el !== tray && !OVERLAYS.has(el.localName) && !el.inert);
    for (const el of this.__inerted) el.inert = true;
  }

  // keep HAX's panel exactly over the dialog's form area
  _placeTray() {
    const tray = this._tray;
    const area = this.shadowRoot.querySelector(".form");
    if (!tray || !area || !this.mode) return;
    const r = area.getBoundingClientRect();
    tray.style.setProperty("--oer-tray-top", `${r.top}px`);
    tray.style.setProperty("--oer-tray-left", `${r.left}px`);
    tray.style.setProperty("--oer-tray-width", `${r.width}px`);
    tray.style.setProperty("--oer-tray-height", `${r.height}px`);
    this._fitPreview();
  }

  /* ---------- the preview ---------- */

  _watch() {
    this.__observer?.disconnect();
    const node = this.__node;
    if (!node) return;
    this.__observer = new MutationObserver(() => {
      cancelAnimationFrame(this.__previewRaf);
      this.__previewRaf = requestAnimationFrame(() => this._refreshPreview());
    });
    this.__observer.observe(node, { attributes: true, childList: true, subtree: true, characterData: true });
  }

  // a copy of the block at its width on the page, in its type and the
  // site's style (the page's content styles don't reach this dialog)
  _refreshPreview() {
    const stage = this.querySelector("[slot='preview']");
    const node = this.__node;
    if (!stage || !node?.isConnected) return;
    const copy = node.cloneNode(true);
    for (const el of [copy, ...copy.querySelectorAll("*")]) {
      for (const a of EDITOR_ATTRS) el.removeAttribute(a);
    }
    stage.replaceChildren(copy);
    stage.inert = true;
    const cs = getComputedStyle(node);
    for (const prop of [...TYPE, ...SITE_VARS]) {
      const value = cs.getPropertyValue(prop);
      if (value) stage.style.setProperty(prop, value);
      else stage.style.removeProperty(prop);
    }
    Object.assign(stage.style, { containerType: "inline-size", width: `${Math.max(1, Math.round(this._previewWidth(node)))}px`, transformOrigin: "0 0" });
    if (!this.__stageResize) this.__stageResize = new ResizeObserver(() => this._fitPreview());
    this.__stageResize.disconnect();
    this.__stageResize.observe(stage);
    this._fitPreview();
  }

  // the width the copy is laid out in: the block's own, or its column's,
  // for an image sized or placed in it (Size and Position) and for
  // anything in a line of text (at its own width, a link wrapped a word
  // to a line)
  _previewWidth(node) {
    const inLine = getComputedStyle(node).display === "inline";
    if (!inLine && !node.hasAttribute("data-width") && !node.hasAttribute("data-float-position")) return node.getBoundingClientRect().width;
    const column = node.assignedSlot?.parentElement ?? node.parentElement;
    const s = getComputedStyle(column);
    return column.clientWidth - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight);
  }

  // scaled down to the pane's width, the frame around it as tall as it shows
  _fitPreview() {
    const stage = this.querySelector("[slot='preview']");
    const box = this.shadowRoot?.querySelector(".stage");
    if (!stage || !box || !stage.firstElementChild) return;
    const room = box.clientWidth;
    const width = stage.offsetWidth;
    const scale = width > room && room > 0 ? room / width : 1;
    stage.style.transform = scale < 1 ? `scale(${scale})` : "";
    box.style.height = `${Math.ceil(stage.offsetHeight * scale)}px`;
  }

  static get styles() {
    return css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: none;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      :host([mode]) {
        display: grid;
        place-items: center;
      }
      .backdrop {
        position: absolute;
        inset: 0;
        background: rgb(0 0 0 / 0.5);
      }
      .dialog {
        position: relative;
        display: flex;
        flex-direction: column;
        width: min(64rem, calc(100vw - 2rem));
        height: min(42rem, calc(100dvh - 2rem));
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        overflow: hidden;
      }
      header {
        flex: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 3.25rem;
        padding: 0 0.75rem 0 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      h2 {
        flex: 1;
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
        letter-spacing: -0.01em;
      }
      header .icon {
        color: var(--muted-foreground);
      }
      .hint {
        min-width: 0;
        margin: 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .close {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        cursor: pointer;
        color: var(--muted-foreground);
      }
      .close:hover {
        background: var(--accent);
        color: var(--accent-foreground);
      }
      .close:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
      }
      .icon {
        flex: none;
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      .body {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: minmax(0, 1fr) 22rem;
      }
      :host([mode="source"]) .body {
        grid-template-columns: minmax(0, 1fr);
      }
      .preview {
        position: relative;
        overflow: auto;
        padding: 1.5rem;
        background: var(--muted);
        border-right: 1px solid var(--border);
      }
      .preview-label {
        margin: 0 0 0.75rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--muted-foreground);
      }
      .card {
        padding: 1.5rem;
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
      }
      /* the copy is laid out at the block's width and scaled to fit here */
      .stage {
        overflow: hidden;
      }
      ::slotted([slot="preview"]) {
        pointer-events: none;
        text-align: start;
      }
      :host([mode="source"]) .preview {
        display: none;
      }
      /* HAX's editor panel is laid over this area while the dialog is open */
      .form {
        min-width: 0;
        min-height: 0;
      }
      @media (max-width: 480px) {
        .hint {
          display: none;
        }
      }
      @media (max-width: 720px) {
        .body {
          grid-template-columns: minmax(0, 1fr);
          grid-template-rows: minmax(8rem, 35%) minmax(0, 1fr);
        }
        .preview {
          border-right: 0;
          border-bottom: 1px solid var(--border);
        }
      }
    `;
  }

  render() {
    return html`
      <div class="backdrop" @click="${() => this._requestClose()}"></div>
      <div class="dialog">
        <header>
          ${icon(this.mode === "source" ? "code" : "sliders-horizontal")}
          <h2>${this._title}</h2>
          ${this.mode === "source" ? html`<p class="hint">Esc leaves the code editor</p>` : ""}
          <button class="close" aria-label="Close" title="Close (Esc)" @click="${() => this._requestClose()}">${icon("x")}</button>
        </header>
        <div class="body">
          <div class="preview" role="group" aria-label="Preview">
            <p class="preview-label" aria-hidden="true">Preview</p>
            <div class="card"><div class="stage" inert><slot name="preview"></slot></div></div>
          </div>
          <div class="form"></div>
        </div>
      </div>
    `;
  }
}
customElements.define(OerSettingsDialog.tag, OerSettingsDialog);

/** The page-wide settings dialog, created on first use. */
export function settingsDialog() {
  const doc = globalThis.document;
  let dlg = doc.querySelector(OerSettingsDialog.tag);
  if (!dlg) {
    dlg = doc.createElement(OerSettingsDialog.tag);
    const stage = doc.createElement("div");
    stage.slot = "preview";
    dlg.append(stage);
    doc.body.append(dlg);
  }
  return dlg;
}
