/**
 * `oer-image-popover` — Change image… (nu-hax docs/editor-redesign/spec.md
 * §5.7, §6.3): the picture a block shows, chosen in a popover beside it
 * with the image field (ui/oer-image-field.js: Upload, Choose from site,
 * Use an address, the description and It's decoration).
 *
 * The editor opens it for an `oer-edit-request` { action: "image", unit,
 * opener, focus } (editor/ops.js), which it answers by cancelling the
 * event: from the hero's Change image, the selection frame's and the
 * rail's Change image… on an img, media-image or figure (frameActionOf()),
 * and a new image block (editor-redesign WP-10), which has no picture yet
 * and so asks for its description: Done with a picture and neither a
 * description nor It's decoration ticked puts focus in the description and
 * says why, once. focus: "alt" opens it with focus in the description (the
 * editing bar's "Add a description").
 *
 * Done puts what was chosen on the block as one undo step (the apply()
 * it's given: ops.js setAttrs), only what changed; Cancel and Esc leave
 * the block as it was. Focus goes back to the opener (the button that
 * opened it), or else back() (the unit, selected). Where each block keeps
 * its picture (spotOf()):
 *
 *   oer-cs-hero    image, alt, decorative
 *   media-image    source, alt (decorative too, where it has one)
 *   img            src, alt (decoration: alt="")
 *   figure         its img's
 *
 * While what's in it isn't on the page yet it carries data-oer-draft, and
 * commitDraft() puts it there: saving or leaving (editor/stock.js) treats
 * it as typed and not yet on the page.
 *
 *   imagePopover().openFor(unit, { opener, back, focus, apply })
 * @element oer-image-popover
 */
import { html, css } from "../lit.js";
import { AnchoredPopover } from "./anchored-popover.js";
import { formControls } from "../ui/form-controls.js";
import "../ui/oer-image-field.js";

/** Blocks that show a picture of their own, which Change image… changes. */
export const IMAGE_TAGS = ["img", "media-image", "figure"];

const hasProperty = (el, name) => !!el?.constructor?.elementProperties?.has?.(name);

/**
 * Where a block keeps its picture: { target (the element the attributes
 * are on), src, alt, decorative (an attribute, or null where decoration is
 * an empty alt) }, or null for a block without one.
 */
export function spotOf(el) {
  switch (el?.localName) {
    case "oer-cs-hero":
      return { target: el, src: "image", alt: "alt", decorative: "decorative" };
    case "media-image":
      return { target: el, src: "source", alt: "alt", decorative: hasProperty(el, "decorative") ? "decorative" : null };
    case "img":
      return { target: el, src: "src", alt: "alt", decorative: null };
    case "figure": {
      const img = el.querySelector("img");
      return img ? spotOf(img) : null;
    }
    default:
      return null;
  }
}

// what a spot holds now: { value, alt, decorative }
function readSpot(spot) {
  const t = spot.target;
  const alt = t.getAttribute(spot.alt);
  return {
    value: t.getAttribute(spot.src) || "",
    alt: alt || "",
    decorative: spot.decorative ? t.hasAttribute(spot.decorative) : alt === "" && !!t.getAttribute(spot.src),
  };
}

// the attributes to set for what was chosen: only what changed
function changes(spot, was, now) {
  const out = {};
  if (now.value !== was.value) out[spot.src] = now.value || null;
  if (spot.decorative) {
    if (now.alt !== was.alt) out[spot.alt] = now.alt || null;
    if (now.decorative !== was.decorative) out[spot.decorative] = now.decorative || null;
  } else {
    // (decoration is an empty description)
    const alt = now.decorative ? "" : now.alt || null;
    const had = spot.target.getAttribute(spot.alt);
    if (alt !== had) out[spot.alt] = alt;
  }
  return out;
}

/**
 * The selection frame's own button for a block (and the rail's, under
 * Block ▾): its class's frameAction ({ label, icon, run(node, opener,
 * back) }), or Change image… for a block with a picture; null for none.
 */
export function frameActionOf(unit) {
  const own = unit?.constructor?.frameAction;
  if (own) return own;
  if (!IMAGE_TAGS.includes(unit?.localName) || !spotOf(unit)) return null;
  return {
    label: "Change image…",
    icon: "image:image",
    run: (node, opener = null, back = null) =>
      node.dispatchEvent(new CustomEvent("oer-edit-request", { bubbles: true, composed: true, cancelable: true, detail: { action: "image", unit: node, opener, back } })),
  };
}

class OerImagePopover extends AnchoredPopover {
  static get tag() {
    return "oer-image-popover";
  }

  static get properties() {
    return {
      ...super.properties,
      _value: { state: true },
      _alt: { state: true },
      _decorative: { state: true },
      _fresh: { state: true }, // a block with no picture yet (just inserted)
      _ask: { state: true }, // why Done didn't close it yet
    };
  }

  constructor() {
    super();
    this._value = "";
    this._alt = "";
    this._decorative = false;
    this._fresh = false;
    this._ask = "";
    this.__spot = null;
    this.__was = null;
    this.__apply = null;
    this.__asked = false;
    this.__new = false;
  }

  /**
   * Open it for unit's picture (a hero, an img, a media-image, a figure),
   * beside opener (or the unit). apply(target, attrs) puts the changes on
   * the page; back() is where focus goes when there's no opener to go to.
   */
  async openFor(unit, { opener = null, back = null, focus = "", apply = null } = {}) {
    const spot = spotOf(unit);
    if (!spot) return false;
    if (this.open) this.hide("cancel");
    this.__spot = spot;
    this.__was = readSpot(spot);
    this.__apply = apply;
    this.__asked = false;
    this._value = this.__was.value;
    this._alt = this.__was.alt;
    this._decorative = this.__was.decorative;
    this._fresh = !this.__was.value;
    // (a new image block, not the hero without a picture of its own)
    this.__new = this._fresh && IMAGE_TAGS.includes(unit.localName);
    this._ask = "";
    this.removeAttribute("data-oer-draft");
    const anchor = opener?.isConnected ? opener : unit;
    await this.show(anchor, () => (opener?.isConnected ? opener.focus({ preventScroll: true }) : back?.()));
    const field = this.shadowRoot.querySelector("oer-image-field");
    await field?.updateComplete;
    if (!(focus === "alt" && field?.focusDescription())) field?.focus();
    this.place();
    return true;
  }

  get changed() {
    return this.open && !!this.__spot && Object.keys(changes(this.__spot, this.__was, this._now())).length > 0;
  }

  /** What's in it, put on the page (saving or leaving with it open: editor/stock.js). */
  async commitDraft() {
    if (this.open) await this._done({ ask: false });
  }

  _now() {
    return { value: this._value, alt: this._alt, decorative: this._decorative };
  }

  _changed(e) {
    this._value = e.detail.value || "";
    this._alt = e.detail.alt || "";
    this._decorative = !!e.detail.decorative;
    if (this._ask && (this._alt || this._decorative)) this._ask = "";
    this.toggleAttribute("data-oer-draft", this.changed);
    this.updateComplete.then(() => this.place());
  }

  async _done({ ask = true } = {}) {
    const field = this.shadowRoot.querySelector("oer-image-field");
    field?.flush();
    const now = this._now();
    // a new picture asks for its description, once
    if (ask && this._fresh && now.value && !now.alt.trim() && !now.decorative && !this.__asked) {
      this.__asked = true;
      this._ask = "Describe the picture for people who can't see it, or tick It's decoration.";
      await this.updateComplete;
      field?.focusDescription();
      return;
    }
    const spot = this.__spot;
    const attrs = changes(spot, this.__was, now);
    const apply = this.__apply;
    // (focus goes back once the change is made: the block drawing it again,
    // and HAX following it, would take it from the opener)
    const back = this.__back;
    this.__back = null;
    this.removeAttribute("data-oer-draft");
    this.hide("done");
    if (Object.keys(attrs).length && spot.target.isConnected) await apply?.(spot.target, attrs);
    back?.();
  }

  closed() {
    this.removeAttribute("data-oer-draft");
    this.__spot = null;
    this.__apply = null;
  }

  renderBody() {
    return html`<div class="pop" role="dialog" aria-labelledby="t">
      <h2 id="t">${this.__new ? "Add an image" : "Change image"}</h2>
      <oer-image-field
        decoration
        label="Image"
        .value="${this._value}"
        .alt="${this._alt}"
        .decorative="${this._decorative}"
        @image-change="${this._changed}"
        @input="${(e) => e.composedPath()[0]?.matches?.("input.address, .alt input") && this.setAttribute("data-oer-draft", "")}"
      ></oer-image-field>
      ${this._ask ? html`<p class="ask" role="alert">${this._ask}</p>` : ""}
      <div class="foot">
        <button type="button" class="btn outline" @click="${() => this.hide("cancel")}">Cancel</button>
        <button type="button" class="btn primary" @click="${() => this._done()}">Done</button>
      </div>
    </div>`;
  }

  static get styles() {
    return [
      formControls,
      AnchoredPopover.popoverStyles,
      css`
        :host {
          width: min(26rem, calc(100vw - 1rem));
        }
        .pop {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1rem;
        }
        h2 {
          margin: 0;
          font-size: 0.9375rem;
          font-weight: 600;
        }
        .ask {
          margin: 0;
          font-size: 0.8125rem;
          color: var(--destructive);
        }
        .foot {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }
      `,
    ];
  }
}

if (!customElements.get(OerImagePopover.tag)) customElements.define(OerImagePopover.tag, OerImagePopover);

// nothing to change once editing ends
globalThis.addEventListener("haxcms-edit-mode-changed", (e) => {
  if (!e.detail) globalThis.document.querySelector(OerImagePopover.tag)?.hide("outside");
});

/** The page's image popover (made on first use). */
export function imagePopover() {
  const doc = globalThis.document;
  return doc.querySelector(OerImagePopover.tag) || doc.body.appendChild(doc.createElement(OerImagePopover.tag));
}
