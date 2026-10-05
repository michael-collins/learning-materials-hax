/**
 * oer-draft: blocks that aren't ready for readers yet, such as suggested
 * self-check questions waiting for review. Readers never see it; signed-in
 * authors see it outlined and labelled. While editing, "Publish" removes the
 * wrapper and keeps what's inside in its place; deleting the block discards
 * the draft.
 *
 *   <oer-draft note="Suggested from the learning objectives">…blocks…</oer-draft>
 */
import { html, css, LitElement } from "../lit.js";
import { store, autorun } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { registerBlocks } from "./register.js";

const lucide = (name) => html`<span class="icon" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

export class OerDraft extends LitElement {
  static get tag() {
    return "oer-draft";
  }

  static get properties() {
    return { note: { type: String, reflect: true } };
  }

  connectedCallback() {
    super.connectedCallback();
    // shown to signed-in authors only; follows sign-in and edit mode
    // (plain fields, not Lit properties: HAX would save those into the page)
    this.__stop = autorun(() => {
      this.toggleAttribute("data-author", !!store.isLoggedIn);
      this.toggleAttribute("data-editing", !!store.editMode);
      this.requestUpdate();
    });
    // HAX marks blocks with data-hax-ray while editing
    this.__ray = new MutationObserver(() => this.requestUpdate());
    this.__ray.observe(this, { attributes: true, attributeFilter: ["data-hax-ray"] });
  }

  disconnectedCallback() {
    this.__stop?.();
    this.__ray?.disconnect();
    super.disconnectedCallback();
  }

  static get styles() {
    return css`
      :host {
        display: none;
      }
      :host([data-author]),
      :host([data-hax-ray]) {
        display: block;
        margin: 1.5rem 0;
        padding: 0.75rem 1rem 0.25rem;
        border: 1px dashed var(--input-border, var(--border));
        border-radius: var(--radius-lg);
      }
      .bar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.375rem 0.75rem;
        font-family: var(--font-sans, system-ui, sans-serif);
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .label {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.125rem 0.5rem;
        border-radius: 999px;
        font-weight: 600;
        color: oklch(0.45 0.12 70);
        background: color-mix(in srgb, oklch(0.62 0.15 70) 14%, transparent);
      }
      .note {
        flex: 1 1 16rem;
      }
      .icon {
        width: 0.875rem;
        height: 0.875rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      button {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 1.875rem;
        padding: 0 0.75rem;
        border-radius: var(--radius-md);
        background: var(--primary);
        color: var(--primary-foreground);
        font-weight: 500;
        cursor: pointer;
      }
      button:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
    `;
  }

  // keep the contents where the draft is, without the wrapper
  _publish() {
    const parent = this.parentNode;
    if (!parent) return;
    const kids = [...this.childNodes];
    for (const k of kids) parent.insertBefore(k, this);
    this.remove();
  }

  render() {
    const editing = this.hasAttribute("data-editing") || this.hasAttribute("data-hax-ray");
    return html`<div class="bar">
        <span class="label">${lucide("icons:visibility-off")}Draft for review</span>
        <span class="note"
          >${this.note ? `${this.note}. ` : ""}Only signed-in authors see this.${editing ? "" : " Edit the page to review and publish it."}</span
        >
        ${editing ? html`<button @click="${this._publish}">${lucide("oer:check")}Publish</button>` : ""}
      </div>
      <slot></slot>`;
  }

  static get haxProperties() {
    return {
      type: "grid",
      canScale: false,
      canEditSource: true,
      gizmo: {
        title: "Draft",
        description: "Blocks only signed-in authors see, until you publish them.",
        icon: "icons:visibility-off",
        color: "orange",
        tags: ["Layout", "draft", "review", "hidden"],
        meta: { author: "Michael Collins" },
      },
      settings: {
        configure: [{ property: "note", title: "Note", description: "Why it's a draft, e.g. “Suggested questions”.", inputMethod: "textfield" }],
        advanced: [],
      },
      demoSchema: [{ tag: "oer-draft", properties: { note: "Not ready yet" }, content: "<p>Draft content.</p>" }],
    };
  }
}

if (!customElements.get(OerDraft.tag)) customElements.define(OerDraft.tag, OerDraft);
registerBlocks(OerDraft);
