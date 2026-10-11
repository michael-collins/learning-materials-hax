/**
 * AnchoredPopover — the base of the editor's small popovers (the link and
 * image popovers, nu-hax docs/editor-redesign/spec.md §5.7, §6.3): a
 * shadcn Popover in the top layer (popover="manual", so nothing on the page
 * draws over it), placed under what it's for (or over it, where there's no
 * room below), and at phone width a sheet across the bottom of the window.
 *
 * Esc closes it, and so does a press outside it. Focus goes back to its
 * opener: a function given as it opens (back), which puts back the caret
 * where it was or focuses the control that opened it, as taken from the
 * event that opened it (never document.activeElement: Safari doesn't focus
 * a clicked button). A press outside leaves focus where the press put it.
 * Tab and Shift+Tab go round its controls rather than out of it. Keys and
 * pastes stop at it, so they never edit the content behind it; chords with
 * Ctrl or ⌘ (Save, Exit) go on to the editor.
 *
 *   class OerLinkPopover extends AnchoredPopover {
 *     renderBody() { return html`…`; }   // what it holds
 *     closed(how) {}                       // "cancel", "outside" or "done"
 *   }
 *   this.show(anchor, back)   // anchor: an element or a Range
 *   this.hide("done")         // closes; back() runs unless it was "outside"
 */
import { html, css, LitElement } from "../lit.js";

// from its anchor, and from the window's edges
const GAP = 6;
const MARGIN = 8;
// narrower than this (48rem), a sheet at the bottom
const PHONE = 768;
const FOCUSABLE = "button:not([disabled]), input:not([type=hidden]):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])";

// focus as the person sees it, inside shadow roots
function deepActive() {
  let el = globalThis.document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el;
}

export class AnchoredPopover extends LitElement {
  static get properties() {
    return { open: { type: Boolean, reflect: true } };
  }

  constructor() {
    super();
    this.open = false;
    this.__anchor = null;
    this.__back = null;
    this.__place = () => {
      cancelAnimationFrame(this.__placing);
      this.__placing = requestAnimationFrame(() => this.place());
    };
    this.__outside = (e) => {
      if (this.open && !e.composedPath().includes(this)) this.hide("outside");
    };
    // Esc with focus outside it (the link bubble leaves the caret where it is)
    this.__escape = (e) => {
      if (!this.open || e.key !== "Escape" || e.isComposing || e.composedPath().includes(this)) return;
      e.preventDefault();
      e.stopPropagation();
      this.hide("cancel");
    };
    const stop = (e) => {
      if (!e.ctrlKey && !e.metaKey) e.stopPropagation();
    };
    this.addEventListener("keydown", (e) => {
      // (Esc that a control in it kept for itself, closing a panel, goes no further)
      if (e.key === "Escape" && !e.defaultPrevented && !e.isComposing) {
        e.preventDefault();
        this.hide("cancel");
      }
      if (e.key === "Tab" && !e.defaultPrevented && !e.ctrlKey && !e.metaKey && !e.altKey) this._wrapTab(e);
      stop(e);
    });
    this.addEventListener("keyup", stop);
    this.addEventListener("paste", (e) => e.stopPropagation());
  }

  connectedCallback() {
    super.connectedCallback();
    // (attributes can't be set in the constructor of a created element)
    this.popover = "manual";
  }

  disconnectedCallback() {
    this._unlisten();
    super.disconnectedCallback();
  }

  /** Open it at anchor (an element, or a Range in the text), with back() to give focus back as it closes. */
  async show(anchor, back = null) {
    this.__anchor = anchor;
    this.__back = back;
    if (!this.open) {
      this.open = true;
      if (!this.matches(":popover-open")) this.showPopover();
      globalThis.addEventListener("pointerdown", this.__outside, true);
      globalThis.addEventListener("keydown", this.__escape, true);
      globalThis.addEventListener("scroll", this.__place, true);
      globalThis.addEventListener("resize", this.__place);
      globalThis.visualViewport?.addEventListener("resize", this.__place);
    }
    await this.updateComplete;
    this.place();
  }

  /** Close it: how is "done", "cancel" or "outside" (the last leaves focus where the press put it). */
  hide(how = "cancel") {
    if (!this.open) return;
    this.open = false;
    this._unlisten();
    if (this.matches(":popover-open")) this.hidePopover();
    const back = this.__back;
    this.__back = null;
    this.__anchor = null;
    this.closed(how);
    if (how !== "outside") back?.();
  }

  // Tab from its last control to its first, Shift+Tab from its first to its last
  _wrapTab(e) {
    const all = [];
    const walk = (root) => {
      for (const el of root.querySelectorAll("*")) {
        if (el.matches(FOCUSABLE) && el.checkVisibility()) all.push(el);
        if (el.shadowRoot) walk(el.shadowRoot);
      }
    };
    walk(this.shadowRoot);
    const at = all.indexOf(deepActive());
    const to = e.shiftKey ? (at <= 0 ? all.length - 1 : -1) : at === all.length - 1 ? 0 : -1;
    if (to < 0 || !all.length) return;
    e.preventDefault();
    all[to].focus();
  }

  /** What to do as it closes (for subclasses). */
  closed() {}

  _unlisten() {
    globalThis.removeEventListener("pointerdown", this.__outside, true);
    globalThis.removeEventListener("keydown", this.__escape, true);
    globalThis.removeEventListener("scroll", this.__place, true);
    globalThis.removeEventListener("resize", this.__place);
    globalThis.visualViewport?.removeEventListener("resize", this.__place);
    cancelAnimationFrame(this.__placing);
  }

  // where its anchor is on screen now
  _anchorRect() {
    const a = this.__anchor;
    if (a instanceof Range) {
      const r = a.getBoundingClientRect();
      if (r.width || r.height) return r;
      // (a caret: its line, or the element it's in)
      const el = a.startContainer.nodeType === 1 ? a.startContainer : a.startContainer.parentElement;
      return a.getClientRects()[0] || el?.getBoundingClientRect() || r;
    }
    return a?.isConnected ? a.getBoundingClientRect() : null;
  }

  /** Put it beside its anchor again (as the page scrolls or the window changes). */
  place() {
    if (!this.open) return;
    const width = globalThis.innerWidth;
    const height = globalThis.visualViewport?.height ?? globalThis.innerHeight;
    const sheet = width < PHONE;
    this.toggleAttribute("sheet", sheet);
    if (sheet) {
      this.style.removeProperty("left");
      this.style.removeProperty("top");
      return;
    }
    const a = this._anchorRect();
    if (!a) return;
    const w = this.offsetWidth;
    const h = this.offsetHeight;
    const below = height - a.bottom - GAP - MARGIN;
    const above = a.top - GAP - MARGIN;
    let top = h <= below || below >= above ? a.bottom + GAP : a.top - GAP - h;
    top = Math.max(MARGIN, Math.min(top, height - h - MARGIN));
    const left = Math.max(MARGIN, Math.min(a.left, width - w - MARGIN));
    this.style.left = `${Math.round(left)}px`;
    this.style.top = `${Math.round(top)}px`;
  }

  render() {
    return this.open ? this.renderBody() : html``;
  }

  renderBody() {
    return html``;
  }

  /** The popover's own look; subclasses add theirs after it. */
  static get popoverStyles() {
    return css`
      :host {
        position: fixed;
        inset: auto;
        top: 0;
        left: 0;
        box-sizing: border-box;
        width: min(24rem, calc(100vw - 1rem));
        max-height: calc(100dvh - 1rem);
        margin: 0;
        padding: 0;
        overflow: auto;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg, 0.75rem);
        background: var(--popover, var(--background));
        color: var(--popover-foreground, var(--foreground));
        box-shadow:
          0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -4px rgb(0 0 0 / 0.1);
        font-family: var(--font-sans, system-ui, sans-serif);
        font-size: 0.875rem;
        line-height: 1.5;
      }
      :host(:not([open])) {
        display: none;
      }
      :host([sheet]) {
        top: auto;
        left: 0.5rem;
        right: 0.5rem;
        bottom: calc(0.5rem + var(--oer-dock-height, 0px));
        width: auto;
        max-height: calc(100dvh - 1rem - var(--oer-dock-height, 0px));
      }
      @media (forced-colors: active) {
        :host {
          border-color: CanvasText;
        }
      }
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.375rem;
        height: 2rem;
        padding: 0 0.75rem;
        border: 1px solid transparent;
        border-radius: var(--radius-md, 0.5rem);
        background: none;
        font: inherit;
        font-size: 0.8125rem;
        font-weight: 500;
        color: var(--foreground);
        white-space: nowrap;
        cursor: pointer;
      }
      .btn.outline {
        border-color: var(--input-border, var(--border));
        background: var(--background);
      }
      .btn.primary {
        border-color: var(--primary);
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .btn.danger {
        color: var(--destructive);
      }
      .btn:not(.primary):hover {
        background: var(--accent);
      }
      .btn.primary:hover {
        background: color-mix(in oklab, var(--primary) 90%, var(--foreground));
      }
      .btn:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
      .icon {
        flex: none;
        display: inline-block;
        width: 0.875rem;
        height: 0.875rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      @media (forced-colors: active) {
        .icon {
          background: ButtonText;
        }
      }
    `;
  }
}
