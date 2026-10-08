/**
 * `oer-versions-dialog` — a page's released versions (newest first, with
 * notes and links to each frozen snapshot) and, for authors, "Publish a
 * version": choose patch / minor / major (shown as 1.2.0 → 1.3.0), add
 * release notes, publish.
 *
 *   versionsDialog().show(pageId, { publish: true })
 * @element oer-versions-dialog
 */
import { html, css, LitElement } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { versionsOf, bump, publishVersion, rubricPlan } from "./versioning.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

const BUMPS = [
  { part: "patch", label: "Patch", hint: "Fixes: typos, broken links" },
  { part: "minor", label: "Minor", hint: "Additions that keep existing use working" },
  { part: "major", label: "Major", hint: "Changes that break how it was used" },
];

class OerVersionsDialog extends LitElement {
  static get tag() {
    return "oer-versions-dialog";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      _part: { state: true },
      _notes: { state: true },
      _busy: { state: true },
      _error: { state: true },
      _publishing: { state: true },
    };
  }

  constructor() {
    super();
    this.open = false;
    this._part = "minor";
    this._notes = "";
    this.__keys = (e) => {
      if (this.open && e.key === "Escape" && !this._busy) {
        e.preventDefault();
        e.stopPropagation();
        this._close();
      }
    };
  }

  show(pageId, { publish = false } = {}) {
    this._pageId = pageId;
    this._part = "minor";
    this._notes = "";
    this._error = "";
    this._busy = false;
    this._publishing = publish && store.isLoggedIn;
    this.open = true;
    globalThis.addEventListener("keydown", this.__keys, true);
    this.updateComplete.then(() => this.shadowRoot.querySelector(this._publishing ? "textarea" : "a, button")?.focus());
  }

  _close() {
    this.open = false;
    globalThis.removeEventListener("keydown", this.__keys, true);
  }

  get _page() {
    return (toJS(store.manifest?.items) || []).find((i) => i.id === this._pageId) || null;
  }

  async _publish() {
    if (this._busy) return;
    const page = this._page;
    const next = bump(page?.metadata?.version || "0.0.0", this._part);
    this._busy = true;
    this._error = "";
    try {
      await publishVersion(this._pageId, next, this._notes);
      this._publishing = false;
    } catch (err) {
      this._error = err.message;
    }
    this._busy = false;
  }

  // the rubrics that go with the release: pinned as they are, or released
  // first because they changed
  _renderRubricPlan(page) {
    const plan = rubricPlan(page, toJS(store.manifest?.items) || []);
    if (!plan.length) return "";
    return html`<div class="rubric-plan">
      <p class="hint"><b>Rubrics</b> stay as they are now in this version:</p>
      <ul>
        ${plan.map(
          (p) => html`<li>
            <a href="${p.rubric.slug}" target="_blank">${p.rubric.title}</a>${p.release
              ? `: released as v${p.version} too, ${p.since ? `since it changed after v${p.since}` : "its first release"}`
              : `: v${p.version}, its current release`}
          </li>`,
        )}
      </ul>
    </div>`;
  }

  _go(slug) {
    this._close();
    globalThis.history.pushState({}, "", slug);
    globalThis.dispatchEvent(new PopStateEvent("popstate"));
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
      :host([open]) {
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
        width: min(36rem, calc(100vw - 2rem));
        max-height: min(42rem, calc(100dvh - 2rem));
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        overflow: hidden;
      }
      button,
      textarea {
        font: inherit;
        color: inherit;
      }
      :focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: 1px;
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
      header {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        padding: 1rem 0.75rem 1rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      .heading {
        flex: 1;
      }
      h2 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
      }
      .sub {
        margin: 0.125rem 0 0;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .x {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .x:hover {
        background: var(--accent);
      }
      .body {
        overflow-y: auto;
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
      .publish {
        padding: 1rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        background: color-mix(in srgb, var(--muted) 50%, transparent);
      }
      h3 {
        margin: 0 0 0.75rem;
        font-size: 0.875rem;
        font-weight: 600;
      }
      .bumps {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }
      .bump {
        all: unset;
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        padding: 0.625rem 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        cursor: pointer;
      }
      .bump[aria-checked="true"] {
        border-color: var(--primary);
        box-shadow: inset 0 0 0 1px var(--primary);
      }
      .bump b {
        font-size: 0.875rem;
      }
      .bump code {
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.8125rem;
        color: var(--primary);
      }
      .bump span {
        font-size: 0.6875rem;
        color: var(--muted-foreground);
      }
      label {
        display: block;
        margin-bottom: 0.375rem;
        font-size: 0.8125rem;
        font-weight: 500;
      }
      textarea {
        box-sizing: border-box;
        width: 100%;
        min-height: 4.5rem;
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--input-border, var(--border));
        border-radius: var(--radius-md);
        background: var(--background);
        font-size: 0.875rem;
        resize: vertical;
      }
      .hint {
        margin: 0.375rem 0 0;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .rubric-plan ul {
        margin: 0.25rem 0 0;
        padding-left: 1.25rem;
        font-size: 0.8125rem;
      }
      .rubric-plan a {
        color: var(--link, var(--primary));
      }
      .error {
        margin: 0.5rem 0 0;
        font-size: 0.8125rem;
        color: var(--destructive);
      }
      .row {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        margin-top: 0.75rem;
      }
      .btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2.25rem;
        padding: 0 1rem;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
      }
      .btn.primary {
        background: var(--primary);
        color: var(--primary-foreground);
      }
      .btn.outline {
        border: 1px solid var(--input-border, var(--border));
      }
      .btn.outline:hover {
        background: var(--accent);
      }
      .btn[aria-disabled="true"] {
        opacity: 0.5;
        cursor: default;
      }
      ol {
        list-style: none;
        margin: 0;
        padding: 0;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        overflow: hidden;
      }
      li {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 0.25rem 0.75rem;
        align-items: baseline;
        padding: 0.75rem 1rem;
      }
      li + li {
        border-top: 1px solid var(--border);
      }
      .v {
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 0.875rem;
        font-weight: 600;
      }
      .when {
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .badge {
        justify-self: end;
        padding: 0 0.5rem;
        border-radius: 999px;
        font-size: 0.6875rem;
        font-weight: 600;
        color: var(--primary);
        background: color-mix(in srgb, var(--primary) 10%, transparent);
      }
      .notes {
        grid-column: 1 / -1;
        margin: 0;
        font-size: 0.8125rem;
        line-height: 1.5;
        white-space: pre-wrap;
      }
      .link {
        all: unset;
        grid-column: 1 / -1;
        justify-self: start;
        font-size: 0.8125rem;
        color: var(--link, var(--primary));
        text-decoration: underline;
        text-underline-offset: 2px;
        cursor: pointer;
      }
      .empty {
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
    `;
  }

  render() {
    if (!this.open) return html``;
    const page = this._page;
    if (!page) return html``;
    const current = page.metadata?.version || "";
    const versions = versionsOf(page.id);
    const fmt = (d) => (d ? new Date(Number(d) * 1000).toLocaleDateString() : "");
    return html`
      <div class="backdrop" @click="${() => !this._busy && this._close()}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${lucide("icons:history")}Versions</h2>
            <p class="sub">${page.title}${current ? ` — latest release v${current}` : " — not released yet"}</p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._close}">${lucide("oer:x")}</button>
        </header>
        <div class="body">
          ${this._publishing
            ? html`<section class="publish">
                <h3>Publish a version</h3>
                <div class="bumps" role="radiogroup" aria-label="Kind of change">
                  ${BUMPS.map(
                    (b) => html`<button class="bump" role="radio" aria-checked="${this._part === b.part}" @click="${() => (this._part = b.part)}">
                      <b>${b.label}</b><code>${current || "0.0.0"} → ${bump(current || "0.0.0", b.part)}</code><span>${b.hint}</span>
                    </button>`,
                  )}
                </div>
                <label for="notes">Release notes</label>
                <textarea id="notes" .value="${this._notes}" @input="${(e) => (this._notes = e.target.value)}" placeholder="What changed in this version?"></textarea>
                <p class="hint">Freezes the page as it is now. Readers and books can keep using this version while the page changes.</p>
                ${this._renderRubricPlan(page)}
                ${this._error ? html`<p class="error">${this._error}</p>` : ""}
                <div class="row">
                  <button class="btn outline" @click="${() => (this._publishing = false)}">Cancel</button>
                  <button class="btn primary" aria-disabled="${this._busy ? "true" : "false"}" @click="${this._publish}">
                    ${this._busy ? "Publishing…" : `Publish v${bump(current || "0.0.0", this._part)}`}
                  </button>
                </div>
              </section>`
            : store.isLoggedIn
              ? html`<div><button class="btn outline" @click="${() => (this._publishing = true)}">${lucide("oer:plus")}Publish a version</button></div>`
              : ""}
          ${versions.length
            ? html`<ol>
                ${versions.map(
                  (v, n) => html`<li>
                    <span class="v">v${v.version}</span>
                    <span class="when">${fmt(v.date)}</span>
                    ${n === 0 ? html`<span class="badge">Latest release</span>` : html`<span></span>`}
                    ${v.notes ? html`<p class="notes">${v.notes}</p>` : ""}
                    ${v.snapshot ? html`<button class="link" @click="${() => this._go(v.snapshot.slug)}">View v${v.version} as released</button>` : ""}
                  </li>`,
                )}
              </ol>`
            : html`<p class="empty">No versions yet. ${store.isLoggedIn ? "Publish one to freeze the page as it is now." : ""}</p>`}
        </div>
      </div>
    `;
  }
}
customElements.define(OerVersionsDialog.tag, OerVersionsDialog);

export function versionsDialog() {
  const doc = globalThis.document;
  return doc.querySelector(OerVersionsDialog.tag) || doc.body.appendChild(doc.createElement(OerVersionsDialog.tag));
}
