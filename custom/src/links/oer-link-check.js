/**
 * `oer-link-check` — the site's links, checked (Site tab → Check links):
 * every live page's links (archived versions keep theirs as released), with
 * - links to the old course sites (dmd-program.github.io) and old Decap
 *   addresses (/projects/dmd400-…) pointed at the pages here they mean
 * - links to this site that go nowhere, and addresses written wrong
 * - dead, moved and sign-in links, found by the local helper
 *   (nu-hax/scripts/ai-bridge.mjs)
 * reviewed as in the Canvas import (links/link-review.js). "Change links"
 * saves only the pages whose links change, and keeps their descriptions
 * (outline saves drop them).
 *
 *   linkCheck().show()
 * @element oer-link-check
 */
import { html, css, LitElement } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { pagePicker } from "../books/oer-page-picker.js";
import { saveOutline } from "../outline/outline-model.js";
import { addressIndex, analyseLink, linksIn, linkContexts, courseCode, reviewable, rewriteLinks, linkTarget } from "./link-model.js";
import { renderLinkReview, linkReviewStyles, withCheck, checkable, checkViaHelper, helperStatus, linkCounts } from "./link-review.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

// pages whose text isn't the author's to relink
const SKIP_TYPES = new Set(["oer:system", "oer:sequence"]);

async function pageHtml(item) {
  const url = new URL(item.location, globalThis.document.baseURI);
  url.searchParams.set("t", String(Date.now()));
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Couldn't read “${item.title}” (${res.status})`);
  return (await res.text()).replace(/<page-break\b[^>]*>(?:\s*<\/page-break>)?/gi, "").trim();
}

class OerLinkCheck extends LitElement {
  static get tag() {
    return "oer-link-check";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      _step: { state: true }, // reading | review | saving | done
      _links: { state: true },
      _note: { state: true },
      _check: { state: true }, // { busy, note }
      _helper: { state: true },
      _confirm: { state: true },
      _result: { state: true },
      _error: { state: true },
    };
  }

  constructor() {
    super();
    this.open = false;
    this._links = [];
    this._check = {};
    this._helper = { up: false };
    this.__keys = (e) => {
      if (!this.open || e.key !== "Escape" || globalThis.document.querySelector("oer-page-picker[open]")) return;
      e.preventDefault();
      e.stopPropagation();
      this._close();
    };
  }

  show() {
    this.open = true;
    this._step = "reading";
    this._links = [];
    this._check = {};
    this._confirm = false;
    this._result = null;
    this._error = "";
    globalThis.addEventListener("keydown", this.__keys, true);
    helperStatus().then((h) => (this._helper = h));
    this.updateComplete.then(() => this.shadowRoot.querySelector(".x")?.focus());
    this._read();
  }

  _close() {
    if (this._step === "saving") return;
    this.open = false;
    this._pages = null;
    globalThis.removeEventListener("keydown", this.__keys, true);
  }

  /* ---------- reading the site ---------- */

  async _read() {
    const items = toJS(store.manifest?.items) || [];
    const index = addressIndex(items);
    const pages = items.filter((i) => i.location && !i.metadata?.oerSnapshotOf && !SKIP_TYPES.has(i.metadata?.pageType));
    this._pages = new Map();
    const records = new Map();
    let done = 0;
    const queue = [...pages];
    const worker = async () => {
      for (let item = queue.shift(); item; item = queue.shift()) {
        let htmlText = "";
        try {
          htmlText = await pageHtml(item);
        } catch {
          htmlText = "";
        }
        done++;
        if (done % 25 === 0 || done === pages.length) this._note = `Reading pages: ${done} of ${pages.length}…`;
        if (!htmlText) continue;
        const hint = courseCode(item.metadata?.oerSource || "");
        const keys = new Set();
        const contexts = linkContexts(htmlText);
        for (const { url, tag } of linksIn(htmlText)) {
          const info = analyseLink(url, index, { hint, tag });
          if (!info || info.kind === "site") continue;
          // a relative address can mean different pages on different courses' pages
          const key = info.kind === "broken" && hint ? `${hint}::${url}` : url;
          keys.add(key);
          // where on the page: the link's words and its sentence (the first
          // of several on one page, with how many there are)
          const here = contexts.filter((c) => c.url === url);
          const use = { id: item.id, title: item.title, slug: item.slug, ...(here[0] ? { text: here[0].text, before: here[0].before, after: here[0].after } : {}), count: here.length || 1 };
          const rec = records.get(key);
          if (rec) rec.uses.push(use);
          else records.set(key, { ...reviewable(info), key, uses: [use] });
        }
        if (keys.size) this._pages.set(item.id, { item, html: htmlText, keys });
      }
    };
    await Promise.all(Array.from({ length: 8 }, worker));
    this._links = [...records.values()];
    this._note = "";
    this._step = "review";
  }

  /* ---------- review ---------- */

  _set(key, patch) {
    this._links = this._links.map((l) => (l.key === key ? { ...l, ...patch } : l));
    this._confirm = false;
  }

  async _pick(key) {
    const l = this._links.find((x) => x.key === key);
    const choice = await pagePicker().pick({ title: `The page here for ${String(l?.url || "").replace(/^https?:\/\//, "")}`, children: false });
    if (choice) this._set(key, { action: "page", match: { id: choice.page.id, title: choice.page.title, slug: choice.page.slug, type: choice.page.metadata?.pageType || "", score: 1, why: "you chose it" } });
    else this.requestUpdate();
  }

  async _runCheck() {
    const urls = [...new Set(checkable(this._links).map((l) => l.url))];
    if (!urls.length || this._check.busy) return;
    this._check = { busy: true, note: `Checking ${urls.length} links…` };
    try {
      const results = await checkViaHelper(urls, { onProgress: (n, all) => (this._check = { busy: true, note: `Checked ${n} of ${all}…` }) });
      this._links = this._links.map((l) => (results.has(l.url) ? withCheck(l, results.get(l.url)) : l));
      const r = [...results.values()];
      const n = (st) => r.filter((x) => x.status === st).length;
      this._check = { busy: false, note: `Checked ${r.length}: ${n("dead")} not working, ${n("moved")} moved, ${n("private")} need a sign-in, ${n("unknown")} couldn't be checked, ${n("ok")} working.` };
    } catch (err) {
      this._check = { busy: false, note: `The check stopped: ${err.message}` };
      this._helper = await helperStatus();
    }
  }

  // the pages whose links change: [{ item, html }] (worked out again only
  // when a choice changes)
  _changes() {
    if (this.__changes?.links === this._links) return this.__changes.out;
    const byKey = new Map(this._links.map((l) => [l.key, l]));
    const out = [];
    for (const { item, html: before, keys } of this._pages?.values() || []) {
      if (![...keys].some((k) => linkTarget(byKey.get(k)) !== undefined)) continue;
      const hint = courseCode(item.metadata?.oerSource || "");
      const after = rewriteLinks(before, (url) => linkTarget(byKey.get(`${hint}::${url}`) || byKey.get(url)));
      if (after !== before) out.push({ item, html: after });
    }
    this.__changes = { links: this._links, out };
    return out;
  }

  /* ---------- saving ---------- */

  async _save() {
    if (store.editMode) {
      this._error = "Leave edit mode first: the page you're editing would be saved over.";
      return;
    }
    const changes = this._changes();
    if (!changes.length) return;
    this._step = "saving";
    this._error = "";
    const saved = [];
    try {
      for (let i = 0; i < changes.length; i += 8) {
        const part = changes.slice(i, i + 8);
        this._note = `Saving pages: ${Math.min(i + part.length, changes.length)} of ${changes.length}…`;
        const items = toJS(store.manifest?.items) || [];
        await saveOutline(part.map(({ item, html: contents }) => ({ ...(items.find((x) => x.id === item.id) || item), contents, modified: true })));
        saved.push(...part.map((c) => c.item));
      }
      // outline saves drop descriptions: give the pages theirs back
      const now = toJS(store.manifest?.items) || [];
      for (const page of saved) {
        const after = now.find((x) => x.id === page.id);
        if (page.description && after && !after.description) await store.cmsSiteEditor?.instance?.saveNodeDetails?.({ detail: { id: page.id, operation: "setDescription", description: page.description } });
      }
      this._result = { pages: saved };
      this._step = "done";
    } catch (err) {
      this._error = `Saving stopped after ${saved.length} page${saved.length === 1 ? "" : "s"}: ${err.message}`;
      this._result = { pages: saved };
      this._step = "done";
    }
  }

  _go(slug) {
    this._close();
    globalThis.history.pushState({}, "", slug);
    globalThis.dispatchEvent(new PopStateEvent("popstate"));
  }

  /* ---------- render ---------- */

  static get styles() {
    return [
      linkReviewStyles,
      css`
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
          width: min(52rem, calc(100vw - 1.5rem));
          max-height: calc(100dvh - 1.5rem);
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
          overflow: hidden;
        }
        button {
          font: inherit;
          color: inherit;
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
        .sm {
          width: 0.875rem;
          height: 0.875rem;
        }
        header {
          flex: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 0.75rem 0.875rem 1.25rem;
          border-bottom: 1px solid var(--border);
        }
        .heading {
          flex: 1;
          min-width: 0;
        }
        h2 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }
        h2 .lucide {
          color: var(--muted-foreground);
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
          color: var(--foreground);
        }
        :is(.x, .btn):focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 1px;
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
          white-space: nowrap;
        }
        .btn.small {
          height: 2rem;
          padding: 0 0.75rem;
          font-size: 0.8125rem;
        }
        .btn.outline {
          border: 1px solid var(--input-border, var(--border));
          background: var(--background);
        }
        .btn.outline:hover {
          background: var(--accent);
        }
        .btn.primary {
          background: var(--primary);
          color: var(--primary-foreground);
        }
        .btn[aria-disabled="true"] {
          opacity: 0.5;
          cursor: default;
        }
        .body {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: 1rem 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        footer {
          flex: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-top: 1px solid var(--border);
        }
        .status {
          flex: 1;
          min-width: 0;
          font-size: 0.8125rem;
          color: var(--muted-foreground);
        }
        .warn,
        .error {
          flex: 1;
          margin: 0;
          font-size: 0.875rem;
          color: var(--destructive);
        }
        .hint {
          margin: 0;
          font-size: 0.75rem;
          color: var(--muted-foreground);
        }
        .facts {
          display: grid;
          grid-template-columns: max-content 1fr;
          gap: 0.25rem 1rem;
          margin: 0;
          font-size: 0.8125rem;
        }
        .facts dt {
          color: var(--muted-foreground);
        }
        .facts dd {
          margin: 0;
        }
        .input,
        select {
          box-sizing: border-box;
          width: 100%;
          height: 2.25rem;
          padding: 0 0.625rem;
          border: 1px solid var(--input-border, var(--border));
          border-radius: var(--radius-md);
          background: var(--background);
          color: inherit;
          font: inherit;
          font-size: 0.875rem;
        }
        .input:focus-visible,
        select:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 1px;
        }
        .done-list {
          margin: 0;
          padding-left: 1.25rem;
          font-size: 0.875rem;
          line-height: 1.7;
        }
        .done-list a,
        .done a {
          color: var(--link, var(--primary));
        }
      `,
    ];
  }

  render() {
    if (!this.open) return html``;
    const step = this._step;
    const n = linkCounts(this._links);
    const changes = step === "review" ? this._changes() : [];
    return html`
      <div class="backdrop" @click="${this._close}"></div>
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <header>
          <div class="heading">
            <h2 id="t">${lucide("icons:link")}Check links</h2>
            <p class="sub">Links to the old course sites, links here that go nowhere, and links that no longer work.</p>
          </div>
          <button class="x" aria-label="Close" title="Close (Esc)" @click="${this._close}">${lucide("oer:x")}</button>
        </header>
        <div class="body">
          ${step === "reading" ? html`<p class="hint" role="status">${this._note || "Reading pages…"}</p>` : ""}
          ${step === "review"
            ? html`<dl class="facts">
                  <dt>Links</dt>
                  <dd>${n.total} to check on ${this._pages.size} page${this._pages.size === 1 ? "" : "s"} (links within the site that work aren't listed)</dd>
                  <dt>To pages here</dt>
                  <dd>${n.here} found${n.ask ? `, ${n.ask} more that might be` : ""}</dd>
                  ${n.broken ? html`<dt>Go nowhere</dt><dd>${n.broken}</dd>` : ""}
                </dl>
                <p class="hint">Archived versions keep their links as they were released. Course sequences' own pages aren't checked here.</p>
                ${renderLinkReview(this._links, {
                  onChange: (key, patch) => this._set(key, patch),
                  onPick: (key) => this._pick(key),
                  check: { can: this._helper.up && this._helper.links, busy: this._check.busy, note: this._check.note, run: () => this._runCheck(), retry: async () => (this._helper = await helperStatus()) },
                })}`
            : ""}
          ${step === "saving" ? html`<p class="hint" role="status">${this._note}</p>` : ""}
          ${step === "done"
            ? html`<div class="done" role="status">
                <p><b>Links changed on ${this._result.pages.length} page${this._result.pages.length === 1 ? "" : "s"}.</b></p>
                ${this._error ? html`<p class="error">${this._error}</p>` : ""}
                <ul class="done-list">
                  ${this._result.pages.map((p) => html`<li><a href="${p.slug}" @click="${(e) => (e.preventDefault(), this._go(p.slug))}">${p.title}</a></li>`)}
                </ul>
              </div>`
            : ""}
        </div>
        ${step === "review"
          ? html`<footer>
              ${this._confirm
                ? html`<span class="warn">Save ${changes.length} page${changes.length === 1 ? "" : "s"} with their links changed? Each save is kept in the site's history.</span>
                    <button class="btn outline" @click="${() => (this._confirm = false)}">Not yet</button>
                    <button class="btn primary" @click="${this._save}">Save ${changes.length} page${changes.length === 1 ? "" : "s"}</button>`
                : html`<span class="status">${this._error ? html`<span class="error">${this._error}</span>` : changes.length ? `Your choices change links on ${changes.length} page${changes.length === 1 ? "" : "s"}.` : "No links change yet."}</span>
                    <button class="btn outline" @click="${this._close}">Close</button>
                    <button class="btn primary" aria-disabled="${changes.length ? "false" : "true"}" @click="${() => changes.length && (this._confirm = true)}">Change links</button>`}
            </footer>`
          : ""}
        ${step === "done" ? html`<footer><span class="status"></span><button class="btn primary" @click="${this._close}">Close</button></footer>` : ""}
      </div>
    `;
  }
}
customElements.define(OerLinkCheck.tag, OerLinkCheck);

/** The page-wide link check, created on first use. */
export function linkCheck() {
  const doc = globalThis.document;
  return doc.querySelector(OerLinkCheck.tag) || doc.body.appendChild(doc.createElement(OerLinkCheck.tag));
}
