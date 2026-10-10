/**
 * What the editor says to screen readers, in one place (nu-hax
 * docs/editor-redesign/spec.md §7.3): one polite live region for what
 * changed ("Tools moved to 6 of 9", "Undid: moved Tools up") and toasts
 * (oer-toast says its text here rather than in a region of its own), and
 * one assertive region for errors. Both are drawn by `oer-announcer`, made
 * once on the document's body, outside the content, so nothing said is
 * ever saved with a page.
 *
 * A message is put in its region a frame after the region is emptied, so
 * saying the same thing twice is heard twice; it's cleared after a while,
 * so nobody reading the page later comes across it.
 *
 * Undo and Redo (undo.js, which sends `oer-undo`) are said here too, by the
 * step they took back.
 *
 *   announce("Tools moved to 6 of 9")
 *   announce("Couldn't save: …", { assertive: true })
 *   installAnnounce()   // from installEditorChrome (editor/index.js)
 * @element oer-announcer
 */
import { html, css, LitElement } from "../lit.js";

// long enough to be heard, and read by a check, before it goes
const CLEAR_AFTER = 10000;

class OerAnnouncer extends LitElement {
  static get tag() {
    return "oer-announcer";
  }

  /** Say text in the polite region, or the assertive one. */
  say(text, { assertive = false } = {}) {
    const region = this.shadowRoot?.querySelector(assertive ? ".assertive" : ".polite");
    if (!region || !text) return;
    clearTimeout(region.__clear);
    cancelAnimationFrame(region.__raf);
    region.textContent = "";
    region.__raf = requestAnimationFrame(() => {
      region.textContent = text;
      region.__clear = setTimeout(() => (region.textContent = ""), CLEAR_AFTER);
    });
  }

  static get styles() {
    return css`
      :host {
        position: fixed;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
    `;
  }

  render() {
    return html`<div class="polite" role="status" aria-live="polite" aria-atomic="true"></div>
      <div class="assertive" role="alert" aria-live="assertive" aria-atomic="true"></div>`;
  }
}
if (!customElements.get(OerAnnouncer.tag)) customElements.define(OerAnnouncer.tag, OerAnnouncer);

function announcer() {
  const doc = globalThis.document;
  return doc.querySelector(OerAnnouncer.tag) || doc.body.appendChild(doc.createElement(OerAnnouncer.tag));
}

/** Say something to screen readers: politely, or at once ({ assertive: true }) for errors. */
export function announce(text, options = {}) {
  const el = announcer();
  // a region made just now needs its first render before it speaks
  el.updateComplete.then(() => el.say(String(text ?? ""), options));
}

let installed = false;
export function installAnnounce() {
  if (installed) return;
  installed = true;
  // the regions exist before anything is said, so the first message is heard
  if (globalThis.document.body) announcer();
  globalThis.addEventListener("oer-undo", (e) => {
    const { redo, label } = e.detail || {};
    if (label) announce(`${redo ? "Redid" : "Undid"}: ${label}`);
    else announce(redo ? "Redone" : "Undone");
  });
}
