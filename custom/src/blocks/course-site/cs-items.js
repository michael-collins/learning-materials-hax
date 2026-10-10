/**
 * The items written inside a course site's sections (nu-hax
 * docs/editor-redesign/spec.md §5.1, §5.2): an outcome of What you'll
 * learn, a tool, a question. Each is a small HAX grid holding ordinary text
 * fields, and draws itself as readers see it (a card, a chip, a question
 * that opens) in both modes, with its fields slotted in:
 *
 *   <oer-cs-outcome icon="target"><h3>Cut with confidence</h3><p>Plan, cut and finish parts.</p></oer-cs-outcome>
 *   <oer-cs-tool><p>Epilog Fusion Pro laser cutter</p></oer-cs-tool>
 *   <oer-cs-question><h3>Do I need experience?</h3><p>No. Week 1 starts with safety.</p></oer-cs-question>
 *
 * Slots are assigned by hand (slotAssignment "manual"): the first field
 * (the h3, or a tool's p) to "title", the rest to "text"; nothing is stored
 * in the markup for it, and it's done again on every change to the fields,
 * since HAX's undo, Edit HTML and imports make new elements. An item is a
 * list item to assistive technology (ElementInternals, kept in _internals,
 * where axe-core reads it) in its section's list. While editing, an empty
 * field shows what goes there in the item's shadow DOM (aria-hidden, under
 * the field, which takes the click), never in the page's HTML; and an item
 * whose fields are all empty isn't saved.
 *
 * The section an item is in says whether it's being edited (setEditing()),
 * and keys and pastes in its fields are answered by cs-keys.js.
 */
import { html, css, LitElement } from "../../lit.js";
import { registerBlocks } from "../register.js";
import { csStyles, icon, OUTCOME_ICONS } from "./cs-shared.js";
import { fieldKeydown, fieldKeyup, fieldPaste } from "./cs-keys.js";
import { editorControl } from "../../ui/editor-control.js";

const MEDIA = "img, video, audio, iframe";
const isEmpty = (el) => !el.textContent.trim() && !el.querySelector(MEDIA);

const gizmo = (title, description, icon, parent) => ({
  title,
  description,
  icon,
  color: "blue",
  tags: ["Course site"],
  // made inside its section, not from the block list
  requiresParent: parent,
  meta: { author: "Michael Collins", hidden: true },
});

/* ---------- the base class ---------- */

export class SiteItem extends LitElement {
  static get shadowRootOptions() {
    return { ...LitElement.shadowRootOptions, slotAssignment: "manual" };
  }

  /** The tag of the item's fields after its title ("p"), made by Enter in the title; null for none. */
  static get textTag() {
    return "p";
  }

  /** What its later fields are to the keys (cs-keys.js): "sentence" or "answer". */
  static get textRole() {
    return "sentence";
  }

  constructor() {
    super();
    this._editing = false;
    this._empty = { title: true, text: true };
    // a list item in its section's list, with nothing stored in the markup
    this._internals = this.attachInternals?.();
    if (this._internals) this._internals.role = "listitem";
  }

  connectedCallback() {
    super.connectedCallback();
    this.__fields = new MutationObserver(() => {
      this.assignSlots();
      this.requestUpdate();
    });
    this.__fields.observe(this, { childList: true, subtree: true, characterData: true });
    this._editing = !!this.parentElement?._editing;
  }

  disconnectedCallback() {
    this.__fields?.disconnect();
    super.disconnectedCallback();
  }

  /** Drawn for editing (the section it's in says), or for readers. */
  setEditing(editing) {
    if (this._editing === !!editing) return;
    this._editing = !!editing;
    this.requestUpdate();
  }

  /** Its title field: its first h3 (a tool's first p), or null. */
  get titleElement() {
    const tag = this.constructor.titleTag;
    return [...this.children].find((c) => c.localName === tag) || null;
  }

  static get titleTag() {
    return "h3";
  }

  /** Whether readers would see anything of it. */
  get hasText() {
    return [...this.children].some((c) => !isEmpty(c));
  }

  // its fields, sorted for its slots
  _fields() {
    const title = this.titleElement;
    return { title, text: [...this.children].filter((c) => c !== title) };
  }

  willUpdate() {
    const { title, text } = this._fields();
    this._empty = { title: !title || isEmpty(title), text: text.every(isEmpty) };
  }

  updated() {
    this.assignSlots();
  }

  /** Put its fields in its slots: by hand, after every render and change. Readers get only fields with text. */
  assignSlots() {
    const root = this.shadowRoot;
    if (!root) return;
    const { title, text } = this._fields();
    const shown = (els) => (this._editing ? els : els.filter((el) => !isEmpty(el)));
    const kept = shown(text);
    root.querySelector('slot[name="title"]')?.assign(...shown(title ? [title] : []));
    // (the first shares its cell with what goes there, while empty)
    root.querySelector('slot[name="text-first"]')?.assign(...kept.slice(0, 1));
    root.querySelector('slot[name="text"]')?.assign(...kept.slice(1));
  }

  /**
   * A field ("title", or "text": the fields after it) and, while it's
   * empty, what goes there, under its first field in the same cell.
   */
  field(name, placeholder) {
    const empty = this._empty[name];
    const shown = this._editing && empty;
    return html`<div class="field ${name} ${shown ? "empty" : ""}" ?hidden="${!this._editing && empty}">
      ${name === "title" ? html`<slot name="title" class="first"></slot>` : html`<slot name="text-first" class="first"></slot>`}${shown ? html`<span class="ph" aria-hidden="true">${placeholder}</span>` : ""}${name === "title" ? "" : html`<slot name="text"></slot>`}
    </div>`;
  }

  /* ---------- keys, for the editor (cs-keys.js) ---------- */

  oerFieldKey(e, field) {
    return fieldKeydown(this, e, field);
  }

  oerFieldKeyup(e, field) {
    return fieldKeyup(this, e, field);
  }

  oerFieldPaste(e, field) {
    return fieldPaste(this, e, field);
  }

  /* ---------- HAX ---------- */

  haxHooks() {
    return { preProcessNodeToContent: "haxpreProcessNodeToContent" };
  }

  /** Saving: an item with nothing in it isn't saved (HAX takes a string as what to write). */
  haxpreProcessNodeToContent(node) {
    return [...node.children].every(isEmpty) ? "\n" : node;
  }

  static itemHaxProperties(tag, title, description, iconName, parent, content) {
    return {
      type: "grid",
      canScale: false,
      canEditSource: false,
      contentEditable: true,
      hideDefaultSettings: true,
      designSystem: false,
      gizmo: gizmo(title, description, iconName, parent),
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag, properties: {}, content }],
    };
  }
}

const itemStyles = css`
  :host {
    box-sizing: border-box;
    min-width: 0;
  }
  .field {
    min-width: 0;
  }
  /* an empty field and what goes there share one cell: a click lands in the field */
  .field.empty {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }
  .field.empty .first::slotted(*),
  .field.empty .ph {
    grid-area: 1 / 1;
  }
  .ph {
    pointer-events: none;
    color: var(--muted-foreground);
  }
  /* what the item draws while editing is never part of the text */
  .editing,
  .editing * {
    -webkit-user-select: none;
    user-select: none;
  }
`;

/* ---------- an outcome, a card ---------- */

export class OerCsOutcome extends SiteItem {
  static get tag() {
    return "oer-cs-outcome";
  }
  static get properties() {
    // reflected: HAX's undo and Edit HTML work from the markup
    return { icon: { type: String, reflect: true } };
  }
  static get oerEditor() {
    return {
      kind: "item",
      label: "Outcome",
      fields: { h3: { name: "title", single: true, paste: "line" }, p: { name: "sentence", paste: "line" } },
      starter: "<h3></h3><p></p>",
    };
  }

  // its icon: the one chosen, or by its place among the outcomes
  _icon() {
    if (this.icon && OUTCOME_ICONS.includes(this.icon)) return this.icon;
    const peers = [...(this.parentElement?.children || [])].filter((c) => c.localName === this.localName);
    return OUTCOME_ICONS[Math.max(0, peers.indexOf(this)) % OUTCOME_ICONS.length];
  }

  render() {
    const name = this._icon();
    const said = name.charAt(0).toUpperCase() + name.slice(1);
    return html`<div class="card ${this._editing ? "editing" : ""}">
      ${this._editing
        ? html`<button
            class="tile"
            ${editorControl()}
            aria-label="Change icon: ${said}${this.icon ? "" : " (automatic)"}"
            title="Change icon"
            @click="${() => this.dispatchEvent(new CustomEvent("oer-edit-request", { bubbles: true, composed: true, detail: { action: "icon", unit: this, choices: OUTCOME_ICONS } }))}"
          >
            ${icon(name)}
          </button>`
        : html`<span class="tile" aria-hidden="true">${icon(name)}</span>`}
      ${this.field("title", "Outcome title")}
      ${this.field("text", "What students will be able to do")}
    </div>`;
  }

  static get styles() {
    return [
      csStyles,
      itemStyles,
      css`
        :host {
          display: block;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--background);
          overflow: hidden;
        }
        .card {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1.25rem;
        }
        .tile {
          display: inline-grid;
          place-items: center;
          width: 2.5rem;
          height: 2.5rem;
          margin-bottom: 0.25rem;
          padding: 0;
          border: 0;
          border-radius: var(--radius-md);
          background: color-mix(in oklab, var(--primary) 14%, transparent);
          color: var(--primary);
        }
        button.tile {
          cursor: pointer;
        }
        button.tile:hover {
          background: color-mix(in oklab, var(--primary) 22%, transparent);
        }
        .tile .i {
          width: 1.25rem;
          height: 1.25rem;
        }
        /* (the fields' own type is the page's: cs-content.js) */
        .title .ph {
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.4;
        }
        .text .ph {
          font-size: 0.9375rem;
          line-height: 1.55;
        }
      `,
    ];
  }

  static get haxProperties() {
    return SiteItem.itemHaxProperties("oer-cs-outcome", "Outcome", "What students will be able to do: a title and a sentence.", "icons:check-circle", "oer-cs-learn", "<h3></h3><p></p>");
  }
}

/* ---------- a tool, a chip ---------- */

export class OerCsTool extends SiteItem {
  static get tag() {
    return "oer-cs-tool";
  }
  static get titleTag() {
    return "p";
  }
  static get textTag() {
    return null;
  }
  static get oerEditor() {
    return { kind: "item", label: "Tool", fields: { p: { name: "tool", single: true, paste: "line" } }, starter: "<p></p>" };
  }
  render() {
    return html`<div class="chip ${this._editing ? "editing" : ""}">${this.field("title", "A tool, machine or material")}</div>`;
  }
  static get styles() {
    return [
      csStyles,
      itemStyles,
      css`
        :host {
          display: inline-block;
          max-width: 100%;
        }
        .chip {
          padding: 0.375rem 0.75rem;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: var(--card);
          font-size: 0.875rem;
        }
        .title .ph {
          font-size: 0.875rem;
          white-space: nowrap;
        }
      `,
    ];
  }
  static get haxProperties() {
    return SiteItem.itemHaxProperties("oer-cs-tool", "Tool", "A tool, machine or material students use.", "icons:build", "oer-cs-tools", "<p></p>");
  }
}

/* ---------- a question, which opens to its answer ---------- */

export class OerCsQuestion extends SiteItem {
  static get tag() {
    return "oer-cs-question";
  }
  static get textRole() {
    return "answer";
  }
  static get oerEditor() {
    return {
      kind: "item",
      label: "Question",
      fields: { h3: { name: "question", single: true, paste: "line" }, p: { name: "answer" }, li: { name: "answer" } },
      starter: "<h3></h3><p></p>",
    };
  }
  render() {
    // open while editing, so every answer can be typed in (and found)
    if (this._editing) {
      return html`<div class="q editing">
        <div class="summary">${this.field("title", "A question students ask")}${icon("chevron")}</div>
        <div class="answer">${this.field("text", "Its answer")}</div>
      </div>`;
    }
    return html`<details class="q">
      <summary>${this.field("title", "")}${icon("chevron")}</summary>
      <div class="answer">${this.field("text", "")}</div>
    </details>`;
  }
  static get styles() {
    return [
      csStyles,
      itemStyles,
      css`
        :host {
          display: block;
          border-bottom: 1px solid var(--border);
        }
        .summary,
        summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 0;
          font-weight: 600;
          list-style: none;
        }
        summary {
          cursor: pointer;
        }
        summary::-webkit-details-marker {
          display: none;
        }
        .summary .field,
        summary .field {
          flex: 1;
        }
        .i {
          color: var(--muted-foreground);
          transition: transform 0.15s;
        }
        details[open] summary .i {
          transform: rotate(180deg);
        }
        .answer {
          padding-bottom: 1rem;
          line-height: 1.6;
          color: var(--muted-foreground);
        }
        .title .ph {
          font-weight: 600;
        }
        @media (prefers-reduced-motion: reduce) {
          .i {
            transition: none;
          }
        }
      `,
    ];
  }
  static get haxProperties() {
    return SiteItem.itemHaxProperties("oer-cs-question", "Question", "A question students ask, with its answer.", "icons:help", "oer-cs-faq", "<h3></h3><p></p>");
  }
}

const ITEMS = [OerCsOutcome, OerCsTool, OerCsQuestion];
for (const cls of ITEMS) if (!customElements.get(cls.tag)) customElements.define(cls.tag, cls);
registerBlocks(...ITEMS);
