/**
 * `oer-settings-dialog` — block settings in a centred modal, with a live
 * preview of the block beside the form; also hosts the HTML source view.
 *
 *   ┌ ⚌ Paragraph settings ─────────────────────────────── ✕ ┐
 *   │ ┌─────────── preview ───────────┐ ┌──── settings ────┐ │
 *   │ │                               │ │ Configure      ⌄ │ │
 *   │ │   (a live copy of the block)  │ │ Colors         › │ │
 *   │ │                               │ │ Font           › │ │
 *   │ └───────────────────────────────┘ └──────────────────┘ │
 *   └─────────────────────────────────────────────────────────┘
 *
 * The form is HAX's own editor panel (hax-tray), which already builds the
 * right fields for every block and applies changes to it. The tray stays
 * hidden except while this dialog is open; then it is sized and placed over
 * the dialog's form area (see the hax-tray rules in editor-skin.js). The
 * preview is a non-interactive copy of the block, refreshed whenever the
 * block changes, so every setting shows its effect immediately.
 * @element oer-settings-dialog
 */
import { html, css, LitElement } from "../lit.js";
import { LUCIDE_ICONS } from "./lucide-icons.generated.js";
import { showPanel } from "./stock.js";

const icon = (name) =>
  html`<span class="icon" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[`oer:${name}`] || ""}&quot;)"></span>`;

// editor-only attributes stripped from the preview copy
const EDITOR_ATTRS = ["contenteditable", "data-hax-active", "data-hax-ray", "draggable", "id"];

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
    this.__keys = (e) => {
      if (this.mode && e.key === "Escape" && !e.defaultPrevented) {
        e.preventDefault();
        e.stopPropagation();
        this.close();
      }
    };
    this.__place = () => {
      if (!this.mode) return;
      this.__raf = requestAnimationFrame(this.__place);
      this._placeTray();
    };
  }

  get _hax() {
    return globalThis.HaxStore?.requestAvailability?.();
  }

  /** Open the active block's settings, or (mode "source") the page HTML. */
  open(mode = "settings") {
    const hax = this._hax;
    const node = hax?.activeNode;
    if (mode === "settings" && !node) return;
    this.__returnFocus = globalThis.document.activeElement;
    this.__node = mode === "settings" ? node : null;
    if (mode === "settings") {
      const schema = hax.haxSchemaFromTag?.(node.localName);
      this._title = `${schema?.gizmo?.title || node.localName} settings`;
    } else {
      this._title = "HTML source";
    }
    this.mode = mode;
    showPanel(mode === "source" ? "view-source" : "content-edit");
    const tray = hax?.haxTray;
    tray?.setAttribute("data-oer-dialog", mode);
    globalThis.addEventListener("keydown", this.__keys, true);
    this.updateComplete.then(() => {
      this._refreshPreview();
      this._watch();
      this.__place();
      this.shadowRoot.querySelector(".close")?.focus();
    });
  }

  close() {
    if (!this.mode) return;
    this.mode = null;
    cancelAnimationFrame(this.__raf);
    this.__observer?.disconnect();
    globalThis.removeEventListener("keydown", this.__keys, true);
    const tray = this._hax?.haxTray;
    tray?.removeAttribute("data-oer-dialog");
    const node = this.__node;
    this.__node = null;
    // back to the block (or whatever had focus) so editing continues
    (node?.isConnected ? node : this.__returnFocus)?.focus?.();
  }

  // keep HAX's panel exactly over the dialog's form area
  _placeTray() {
    const tray = this._hax?.haxTray;
    const area = this.shadowRoot.querySelector(".form");
    if (!tray || !area) return;
    const r = area.getBoundingClientRect();
    const key = `${r.top}|${r.left}|${r.width}|${r.height}`;
    if (key === this.__trayKey) return;
    this.__trayKey = key;
    tray.style.setProperty("--oer-tray-top", `${r.top}px`);
    tray.style.setProperty("--oer-tray-left", `${r.left}px`);
    tray.style.setProperty("--oer-tray-width", `${r.width}px`);
    tray.style.setProperty("--oer-tray-height", `${r.height}px`);
  }

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

  // a copy of the block, reflowed to the pane's width, in the block's own
  // type (the page's content styles do not reach this dialog)
  _refreshPreview() {
    const stage = this.querySelector("[slot='preview']");
    const node = this.__node;
    if (!stage || !node?.isConnected) return;
    const copy = node.cloneNode(true);
    for (const el of [copy, ...copy.querySelectorAll("*")]) {
      for (const a of EDITOR_ATTRS) el.removeAttribute(a);
    }
    stage.replaceChildren(copy);
    const cs = getComputedStyle(node);
    for (const prop of ["font-family", "font-size", "line-height", "color"]) {
      stage.style.setProperty(prop, cs.getPropertyValue(prop));
    }
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
      .stage {
        padding: 1.5rem;
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
      }
      ::slotted([slot="preview"]) {
        pointer-events: none;
      }
      :host([mode="source"]) .preview {
        display: none;
      }
      /* HAX's editor panel is laid over this area while the dialog is open */
      .form {
        min-width: 0;
        min-height: 0;
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
      <div class="backdrop" @click="${this.close}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="title">
        <header>
          ${icon(this.mode === "source" ? "code" : "sliders-horizontal")}
          <h2 id="title">${this._title}</h2>
          <button class="close" aria-label="Close" title="Close (Esc)" @click="${this.close}">${icon("x")}</button>
        </header>
        <div class="body">
          <div class="preview" aria-label="Preview">
            <p class="preview-label">Preview</p>
            <div class="stage" inert><slot name="preview"></slot></div>
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
