/**
 * `oer-delete-page` — confirm deleting a page (the page menu's Delete
 * page): what goes with it (sub-pages), its versions nothing else uses
 * (deleted too unless unticked, so they aren't left behind), the versions
 * something still uses (kept, and where), and the links that will break.
 *
 *   deletePage().show(pageId)
 *
 * A native modal dialog: focus stays inside, Esc closes.
 * @element oer-delete-page
 */
import { html, css, LitElement } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { saveOutline } from "../outline/outline-model.js";
import { deletionPlan, deletionItems, versionList } from "../versions/versioning.js";
import { formControls } from "./form-controls.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;
const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;

class OerDeletePage extends LitElement {
  static get tag() {
    return "oer-delete-page";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      _withVersions: { state: true },
      _busy: { state: true },
      _error: { state: true },
    };
  }

  constructor() {
    super();
    this.open = false;
    this._withVersions = true;
    this._busy = false;
    this._error = "";
  }

  show(pageId) {
    this._items = toJS(store.manifest?.items) || [];
    this._page = this._items.find((i) => i.id === pageId) || null;
    if (!this._page) return;
    this._plan = deletionPlan([pageId], this._items);
    this._withVersions = true;
    this._busy = false;
    this._error = "";
    this.open = true;
  }

  updated(changed) {
    if (changed.has("open")) {
      const dialog = this.shadowRoot.querySelector("dialog");
      if (this.open && !dialog.open) {
        dialog.showModal();
        this.shadowRoot.querySelector(".btn.outline")?.focus();
      }
      if (!this.open && dialog.open) dialog.close();
    }
  }

  _close() {
    if (!this._busy) this.open = false;
  }

  async _delete() {
    if (this._busy || (this._page?.metadata?.locked && !this._page.metadata.oerSnapshotOf)) return;
    this._busy = true;
    const plan = this._plan;
    // leave the page first: HAX reload-loops on the address of a page that's gone
    if (plan.pages.has(store.activeId)) {
      let p = this._items.find((i) => i.id === this._page.parent);
      while (p && plan.pages.has(p.id)) p = this._items.find((i) => i.id === p.parent);
      globalThis.history.pushState({}, "", p?.slug || store.homeLink || "./");
      globalThis.dispatchEvent(new PopStateEvent("popstate"));
    }
    try {
      await saveOutline(deletionItems(plan, this._items, this._withVersions));
      this._busy = false;
      this.open = false;
    } catch (err) {
      this._busy = false;
      this._error = `Deleting stopped: ${err.message || err}`;
    }
  }

  render() {
    const page = this._page;
    const plan = this._plan;
    if (!page || !plan) return html`<dialog></dialog>`;
    const subPages = [...plan.pages].filter((id) => id !== page.id).length;
    const n = plan.unused.length;
    const versionsGo = this._withVersions ? n : 0;
    const version = page.metadata?.oerSnapshotOf ? page.metadata.version : "";
    const title = version ? `${page.metadata.oerSnapshotTitle || page.title} v${version}` : page.title;
    // an archived version is locked against editing, not deleting
    const locked = !version && !!page.metadata?.locked;
    return html`<dialog aria-labelledby="t" aria-describedby="what" @close="${() => (this.open = false)}" @click="${(e) => e.target.localName === "dialog" && this._close()}">
      <div class="panel">
        <h2 id="t">Delete “${title}”?</h2>
        <p id="what">
          ${version ? "This archived version will be deleted." : subPages ? `It and its ${plural(subPages, "sub-page")} will be deleted.` : "The page will be deleted."} You
          can't undo this here.
        </p>
        ${n
          ? html`<label class="choice">
              <input type="checkbox" .checked="${this._withVersions}" @change="${(e) => (this._withVersions = e.target.checked)}" />
              <span
                ><b>Also delete ${n === 1 ? "its version" : `its ${n} versions`}</b> (${versionList(plan.unused)}). Nothing else uses
                ${n === 1 ? "it" : "them"}. If you keep ${n === 1 ? "it, it stays" : "them, they stay"} in Browse pages without ${n === 1 ? "its" : "their"} page.</span
              >
            </label>`
          : ""}
        ${plan.used.length
          ? html`<div class="kept">
              ${lucide("icons:info")}
              <span
                >${plan.used.length === 1 ? "One version stays" : `${plan.used.length} versions stay`} because they're in use:
                <ul>
                  ${plan.used.map((u) => html`<li>Version ${u.snap.metadata.version}: ${u.uses.join("; ")}</li>`)}
                </ul></span
              >
            </div>`
          : ""}
        ${plan.breaks.map((b) => html`<p class="warn"><b>Version ${b.snap.metadata.version} is in use</b> (${b.uses.join("; ")}). Deleting it leaves ${b.uses.length === 1 ? "that" : "those"} showing it as missing.</p>`)}
        ${plan.links ? html`<p class="warn">${plural(plan.links, "page")} link${plan.links === 1 ? "s" : ""} to it; ${plan.links === 1 ? "it" : "they"} will show it as missing.</p>` : ""}
        ${locked ? html`<p class="warn">This page is locked. Unlock it before deleting it.</p>` : ""}
        ${this._error ? html`<p class="warn" role="alert">${this._error}</p>` : ""}
        <footer>
          <button class="btn outline" @click="${this._close}">Cancel</button>
          <button class="btn destructive" aria-disabled="${this._busy || locked ? "true" : "false"}" @click="${this._delete}">
            ${lucide("oer:trash-2")}${this._busy ? "Deleting…" : version ? "Delete version" : versionsGo ? `Delete page and ${plural(versionsGo, "version")}` : "Delete page"}
          </button>
        </footer>
      </div>
    </dialog>`;
  }

  static get styles() {
    return [
      formControls,
      css`
        :host {
          font-family: var(--font-sans, system-ui, sans-serif);
          color: var(--foreground);
        }
        dialog {
          width: min(32rem, calc(100vw - 2rem));
          padding: 0;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg, 0.75rem);
          background: var(--popover, var(--background));
          color: var(--popover-foreground, var(--foreground));
          box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        }
        dialog::backdrop {
          background: rgb(0 0 0 / 0.5);
        }
        .panel {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
          padding: 1.25rem;
        }
        h2 {
          margin: 0;
          font-size: 1.0625rem;
          font-weight: 600;
        }
        p {
          margin: 0;
          font-size: 0.875rem;
          line-height: 1.5;
        }
        #what {
          color: var(--muted-foreground);
        }
        button {
          font: inherit;
        }
        :focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
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
        .choice {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.875rem;
          line-height: 1.5;
          cursor: pointer;
        }
        .choice input {
          margin-top: 0.1875rem;
        }
        .kept {
          display: flex;
          gap: 0.5rem;
          padding: 0.625rem 0.75rem;
          border-radius: var(--radius-md, 0.5rem);
          background: var(--muted);
          font-size: 0.875rem;
          line-height: 1.5;
        }
        .kept .lucide {
          margin-top: 0.1875rem;
        }
        .kept ul {
          margin: 0.25rem 0 0;
          padding-left: 1.125rem;
        }
        .warn {
          color: var(--destructive);
        }
        footer {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
          margin-top: 0.25rem;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          height: 2.25rem;
          padding: 0 0.875rem;
          border: 1px solid transparent;
          border-radius: var(--radius-md, 0.5rem);
          background: none;
          color: var(--foreground);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
        }
        .btn.outline {
          border-color: var(--input-border, var(--border));
        }
        .btn.outline:hover {
          background: var(--accent);
        }
        .btn.destructive {
          background: var(--destructive);
          color: var(--destructive-foreground, #fff);
        }
        .btn[aria-disabled="true"] {
          opacity: 0.55;
          cursor: default;
        }
      `,
    ];
  }
}

if (!customElements.get(OerDeletePage.tag)) customElements.define(OerDeletePage.tag, OerDeletePage);

export function deletePage() {
  const doc = globalThis.document;
  return doc.querySelector(OerDeletePage.tag) || doc.body.appendChild(doc.createElement(OerDeletePage.tag));
}
