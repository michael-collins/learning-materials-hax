/**
 * `oer-block-label` — names the selected block ("Paragraph", "Video player")
 * in a tab attached to the top-right of its selection ring, so it is always
 * clear what the toolbar and the Block panel are acting on.
 *
 * Follows HaxStore.activeNode while editing; the block name comes from the
 * element's haxProperties gizmo title.
 * @element oer-block-label
 */
import { html, css, LitElement } from "../lit.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";

class OerBlockLabel extends LitElement {
  static get tag() {
    return "oer-block-label";
  }

  static get properties() {
    return { _text: { state: true } };
  }

  constructor() {
    super();
    this._text = "";
    this.__raf = null;
    this.__tick = this._tick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.__raf = requestAnimationFrame(this.__tick);
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.__raf);
    super.disconnectedCallback();
  }

  // position every frame while visible: blocks move as content reflows,
  // the page scrolls and the tray resizes
  _tick() {
    this.__raf = requestAnimationFrame(this.__tick);
    const hax = globalThis.HaxStore?.requestAvailability?.();
    const node = store.editMode ? hax?.activeNode : null;
    if (!node || !node.isConnected || node.localName === "page-break") {
      this.hidden = true;
      return;
    }
    const r = node.getBoundingClientRect();
    if (r.bottom < 0 || r.top > globalThis.innerHeight || r.width === 0) {
      this.hidden = true;
      return;
    }
    const tag = node.localName;
    if (tag !== this.__tag) {
      this.__tag = tag;
      const schema = hax.haxSchemaFromTag?.(tag);
      this._text = schema?.gizmo?.title || tag;
    }
    this.hidden = false;
    // sit on the ring's top edge (ring is offset 4px outside the block)
    this.style.transform = `translate(${Math.round(r.right + 4)}px, ${Math.round(r.top - 4)}px) translate(-100%, -100%)`;
  }

  static get styles() {
    return css`
      :host {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9990;
        pointer-events: none;
      }
      :host([hidden]) {
        display: none;
      }
      span {
        display: inline-block;
        padding: 0.125rem 0.5rem;
        font-family: var(--font-sans, system-ui, sans-serif);
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1.25rem;
        white-space: nowrap;
        color: var(--primary-foreground);
        /* --primary carries --primary-foreground at >= 4.5:1 in both modes */
        background: var(--primary);
        border-radius: var(--radius-sm) var(--radius-sm) 0 0;
      }
    `;
  }

  render() {
    return html`<span>${this._text}</span>`;
  }
}
customElements.define(OerBlockLabel.tag, OerBlockLabel);
