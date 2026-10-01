/**
 * `oer-book-print` — a whole book on one page, ready to print or save as
 * PDF (the browser's print dialog). Chapters render as live HTML, so
 * blocks such as rubrics and callouts print as they look on the site.
 *
 *   bookPrint().show(bookId)
 * @element oer-book-print
 */
import { html, css, LitElement } from "../lit.js";
import { bookChapters } from "./book-export.js";

const PRINT_CSS = `@media print {
  body > *:not(oer-book-print) { display: none !important; }
  oer-book-print { position: static !important; overflow: visible !important; background: #fff !important; }
}`;

class OerBookPrint extends LitElement {
  static get tag() {
    return "oer-book-print";
  }

  static get properties() {
    return { open: { type: Boolean, reflect: true }, _status: { state: true } };
  }

  constructor() {
    super();
    this.open = false;
    this._status = "";
    this.__keys = (e) => {
      if (this.open && e.key === "Escape") this._close();
    };
  }

  async show(bookId) {
    if (!globalThis.document.getElementById("oer-print-css")) {
      const style = Object.assign(globalThis.document.createElement("style"), { id: "oer-print-css", textContent: PRINT_CSS });
      globalThis.document.head.append(style);
    }
    this.open = true;
    this._status = "Gathering chapters…";
    globalThis.addEventListener("keydown", this.__keys, true);
    this.replaceChildren();
    const chapters = await bookChapters(bookId);
    const [cover, ...rest] = chapters;
    const doc = globalThis.document;
    const title = doc.createElement("section");
    title.className = "oer-print-cover";
    title.innerHTML = `<h1>${cover.item.title}</h1>${cover.item.description ? `<p>${cover.item.description}</p>` : ""}`;
    const toc = doc.createElement("nav");
    toc.className = "oer-print-toc";
    toc.innerHTML = `<h2>Contents</h2><ol>${rest.map((c) => `<li style="margin-left:${c.depth * 1.25}rem">${c.item.title}</li>`).join("")}</ol>`;
    this.append(title, toc);
    for (const c of rest) {
      const section = doc.createElement("section");
      section.className = "oer-print-chapter";
      // top-level chapters are h1, deeper ones h2 (their content keeps its own headings)
      const h = c.depth === 0 ? "h1" : "h2";
      section.innerHTML = `<${h}>${c.item.title}</${h}>${c.html}`;
      this.append(section);
    }
    this._status = "";
    this.updateComplete.then(() => this.shadowRoot.querySelector(".print")?.focus());
  }

  _close() {
    this.open = false;
    globalThis.removeEventListener("keydown", this.__keys, true);
    this.replaceChildren();
  }

  static get styles() {
    return css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 10020;
        display: none;
        overflow-y: auto;
        background: var(--background, #fff);
        color: var(--foreground, #111);
        font-family: var(--font-sans, system-ui, sans-serif);
      }
      :host([open]) {
        display: block;
      }
      .bar {
        position: sticky;
        top: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-bottom: 1px solid var(--border, #ddd);
        background: var(--background, #fff);
      }
      .bar span {
        flex: 1;
        font-size: 0.875rem;
        color: var(--muted-foreground, #555);
      }
      button {
        all: unset;
        height: 2.25rem;
        padding: 0 1rem;
        border-radius: var(--radius-md, 0.5rem);
        font: inherit;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      button:focus-visible {
        outline: 2px solid var(--ring, #2563eb);
        outline-offset: 2px;
      }
      .print {
        background: var(--primary, #0060a8);
        color: var(--primary-foreground, #fff);
      }
      .close {
        border: 1px solid var(--input-border, var(--border, #ddd));
      }
      .page {
        max-width: 46rem;
        margin: 0 auto;
        padding: 2rem 1.25rem 4rem;
        font-size: 1.0625rem;
        line-height: 1.6;
      }
      ::slotted(.oer-print-cover) {
        padding: 6rem 0 3rem;
        text-align: center;
      }
      ::slotted(.oer-print-chapter),
      ::slotted(.oer-print-toc) {
        break-before: page;
        padding-top: 1.5rem;
      }
      @media print {
        .bar {
          display: none;
        }
        .page {
          max-width: none;
          padding: 0;
        }
      }
    `;
  }

  render() {
    return html`<div class="bar">
        <span role="status">${this._status || "Print, or choose “Save as PDF” in the print dialog."}</span>
        <button class="print" ?disabled="${!!this._status}" @click="${() => globalThis.print()}">Print / Save as PDF</button>
        <button class="close" @click="${this._close}">Close</button>
      </div>
      <div class="page"><slot></slot></div>`;
  }
}
customElements.define(OerBookPrint.tag, OerBookPrint);

export function bookPrint() {
  const doc = globalThis.document;
  return doc.querySelector(OerBookPrint.tag) || doc.body.appendChild(doc.createElement(OerBookPrint.tag));
}
