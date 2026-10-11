/**
 * `oer-link-popover` — links in the text (nu-hax docs/editor-redesign/
 * spec.md §6.2 #8, §6.3), in place of HAX's link prompt (which ate the
 * spaces around a link and left an empty <b> behind).
 *
 * The form, for the selected text (Format → Link… in the rail, Mod+K while
 * typing) or the link the caret is in: an address, or Link to a page (a
 * search of the site's pages, by title: ↑ ↓ choose, Enter links the one
 * chosen with its site-relative address), the link's text (plain words),
 * Open in a new tab (off unless the link has it), and Add link (Update
 * link), with Remove link for a link already there. Enter adds it.
 *
 * The bubble: a click on a link in the content doesn't follow it while
 * editing (editor/hax-fixes.js holdLinks); it shows the link's address with
 * Open in new tab ↗, and for a link in what's typed Edit link and Remove
 * link. The caret stays where the click put it; Esc, typing or a click
 * elsewhere puts the bubble away.
 *
 * The selection is kept as a Range while the popover has focus and put
 * back before anything is changed, so it works however the browser lets
 * focus go (ui/edit-selection.js). Adding, changing and removing a link
 * are one undo step each (ops.js asOneStep). White space at the ends of
 * the selection stays outside the link ("Double" in "Double diamond", the
 * space after it kept), and empty formatting the browser leaves around a
 * new link (<b></b>) goes. Cancel and Esc put the selection back as it
 * was; after a change the caret is after the link.
 *
 *   installLinkPopover()                 // Mod+K and the bubble (editor/index.js)
 *   linkPopover().edit({ back })         // the form, for the selection now
 *   removeLink()                         // the links in the selection, unlinked
 *   whyNoLink()                          // "" when the selection is in a link
 * @element oer-link-popover
 */
import { html, css } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { AnchoredPopover } from "./anchored-popover.js";
import { formControls } from "../ui/form-controls.js";
import { LUCIDE_ICONS } from "./lucide-icons.generated.js";
import { getEditRange, setEditRange } from "../ui/edit-selection.js";
import { asOneStep } from "./ops.js";
import { unitOf, elementOf, TEXT_FIELDS } from "./policy.js";
import { announce } from "./announce.js";
import { isMac } from "./stock.js";

const haxStore = () => globalThis.HaxStore?.requestAvailability?.() ?? null;
const activeBody = () => haxStore()?.activeHaxBody ?? null;
const icon = (name) => html`<span class="icon" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

// formatting the browser can leave empty around a new link
const INLINE = "b, strong, i, em, u, s, span, sub, sup, code, mark, small";

/* ---------- the site's pages ---------- */

// not pages to go to: headings in the outline, the site's own
const NOT_PAGES = new Set(["oer:heading", "oer:system"]);
const fold = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

/** The site's pages whose titles hold every word of query, best first: [{ id, title, slug, where }]. */
export function findPages(query, limit = 8) {
  const words = fold(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const items = toJS(store.manifest?.items) || [];
  const byId = new Map(items.map((i) => [i.id, i]));
  const q = words.join(" ");
  const found = [];
  for (const i of items) {
    if (!i.slug || NOT_PAGES.has(i.metadata?.pageType)) continue;
    const title = fold(i.title);
    if (!words.every((w) => title.includes(w))) continue;
    // the whole title, its start, a word's start, anywhere
    const rank = title === q ? 0 : title.startsWith(q) ? 1 : title.split(/\W+/).some((w) => w.startsWith(words[0])) ? 2 : 3;
    found.push({ rank, page: { id: i.id, title: i.title || i.slug, slug: i.slug, where: byId.get(i.parent)?.title || "" } });
  }
  return found
    .sort((a, b) => a.rank - b.rank || a.page.title.length - b.page.title.length)
    .slice(0, limit)
    .map((f) => f.page);
}

/** An address as typed, made one a link can use: "example.com" gets https://, an email mailto:. */
export function normalizeHref(typed) {
  const t = String(typed || "").trim();
  if (!t || /^[a-z][a-z0-9+.-]*:/i.test(t) || /^[/#?.]/.test(t)) return t;
  if (/^[^\s/@]+@[^\s/@]+\.[a-z]{2,}$/i.test(t)) return `mailto:${t}`;
  if (/^(www\.)?[^\s/]+\.[a-z]{2,}(\/|$)/i.test(t)) return `https://${t}`;
  return t;
}

/* ---------- links in the text ---------- */

// the link a node is in, in the content
function linkAt(node, body) {
  const a = elementOf(node)?.closest("a[href]");
  return a && body.contains(a) ? a : null;
}

// every link a range touches
function linksIn(range, body) {
  const out = new Set([linkAt(range.startContainer, body), linkAt(range.endContainer, body)]);
  const root = elementOf(range.commonAncestorContainer);
  for (const a of root?.querySelectorAll("a[href]") || []) if (range.intersectsNode(a)) out.add(a);
  out.delete(null);
  return [...out];
}

// the text nodes a range touches, in order
function textNodesIn(range) {
  const root = range.commonAncestorContainer;
  if (root.nodeType === 3) return [root];
  const out = [];
  const walker = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) if (range.intersectsNode(n)) out.push(n);
  return out;
}

// the range without the white space at its ends (it stays outside a link)
function trimmed(range) {
  const r = range.cloneRange();
  const nodes = textNodesIn(r);
  for (const n of nodes) {
    const from = n === range.startContainer ? range.startOffset : 0;
    const rest = n.data.slice(from);
    const lead = rest.length - rest.trimStart().length;
    if (lead < rest.length) {
      r.setStart(n, from + lead);
      break;
    }
  }
  for (const n of nodes.reverse()) {
    const to = n === range.endContainer ? range.endOffset : n.data.length;
    const head = n.data.slice(0, to);
    const trail = head.length - head.trimEnd().length;
    if (trail < head.length) {
      r.setEnd(n, to - trail);
      break;
    }
  }
  return r.collapsed || !r.toString().trim() ? range.cloneRange() : r;
}

// Open in a new tab, on or off
function setNewTab(a, on) {
  if (on) {
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
    return;
  }
  a.removeAttribute("target");
  if (/^(\s|noopener|noreferrer)*$/.test(a.getAttribute("rel") || "")) a.removeAttribute("rel");
}

// empty formatting left in the fields the links are in
function tidy(links) {
  for (const field of new Set(links.map((a) => a.parentElement?.closest(TEXT_FIELDS) || a.parentElement))) {
    for (const el of field?.querySelectorAll(INLINE) || []) if (!el.textContent && !el.querySelector("img, br, svg")) el.remove();
  }
}

// the caret just after a link. Chrome puts a caret at a link's edge inside
// the link (and what's typed then makes it longer), so where the link is
// followed by a space the caret goes after that
function caretAfter(a, body) {
  const r = globalThis.document.createRange();
  const next = a.nextSibling;
  if (next?.nodeType === 3) r.setStart(next, /^\s/.test(next.data) ? 1 : 0);
  else r.setStartAfter(a);
  r.collapse(true);
  body.focus({ preventScroll: true });
  setEditRange(r);
}

// the selection in the content's text, or null
function textRange(body) {
  const range = body ? getEditRange(body) : null;
  if (!range || !body.contains(range.startContainer) || !elementOf(range.startContainer)?.isContentEditable) return null;
  return range;
}

/** Why the selection can't be unlinked ("" when it's in or over a link). */
export function whyNoLink() {
  const body = activeBody();
  const range = textRange(body);
  return range && linksIn(range, body).length ? "" : "Put the caret in a link";
}

/** Unlink link, or the links in the selection, as one undo step; their text stays, selected. */
export async function removeLink({ link = null } = {}) {
  const body = activeBody();
  if (!body?.editMode) return false;
  const range = link ? null : textRange(body);
  const links = link ? [link] : range ? linksIn(range, body) : [];
  if (!links.length) {
    announce("Put the caret in a link first");
    return false;
  }
  let first = null;
  let last = null;
  const done = await asOneStep(unitOf(links[0]), links.length > 1 ? "removed links" : "removed a link", () => {
    for (const a of links) {
      if (!a.isConnected) continue;
      const kids = [...a.childNodes];
      first ??= kids[0] || null;
      last = kids[kids.length - 1] || last;
      a.replaceWith(...kids);
    }
    return true;
  });
  if (first?.isConnected && last?.isConnected) {
    const r = globalThis.document.createRange();
    r.setStartBefore(first);
    r.setEndAfter(last);
    body.focus({ preventScroll: true });
    setEditRange(r);
  }
  if (done) announce(links.length > 1 ? "Links removed" : "Link removed");
  return done;
}

/* ---------- the popover ---------- */

class OerLinkPopover extends AnchoredPopover {
  static get tag() {
    return "oer-link-popover";
  }

  static get properties() {
    return {
      ...super.properties,
      mode: { type: String, reflect: true }, // "form" or "bubble"
      _tab: { state: true }, // "address" or "page"
      _href: { state: true },
      _text: { state: true },
      _newTab: { state: true },
      _query: { state: true },
      _results: { state: true },
      _active: { state: true },
      _error: { state: true },
      _editable: { state: true },
    };
  }

  constructor() {
    super();
    this.mode = "form";
    this._tab = "address";
    this._href = "";
    this._text = "";
    this._newTab = false;
    this._query = "";
    this._results = [];
    this._active = 0;
    this._error = "";
    this._editable = false;
    this.__body = null;
    this.__range = null;
    this.__link = null;
    this.__textWas = "";
    // the bubble goes as the author types on
    this.__typing = (e) => {
      if (this.open && this.mode === "bubble" && !["Escape", "Shift", "Control", "Alt", "Meta"].includes(e.key) && !e.composedPath().includes(this)) this.hide("outside");
    };
  }

  /**
   * The form, for the selected text, or the link the caret is in (or
   * link). back() is where focus goes on Cancel; by default the selection
   * as it was.
   */
  async edit({ link = null, back = null } = {}) {
    const body = activeBody();
    if (!body?.editMode) return false;
    let range = link ? null : textRange(body);
    if (!link && !range) {
      announce("Put the caret in the text first");
      return false;
    }
    if (!link) {
      const at = linkAt(range.startContainer, body);
      if (at && at === linkAt(range.endContainer, body)) link = at;
    }
    if (link) {
      range = globalThis.document.createRange();
      range.selectNodeContents(link);
    }
    if (this.open) this.hide("outside");
    this.__body = body;
    this.__range = range;
    this.__link = link;
    this.mode = "form";
    this._tab = "address";
    this._href = link?.getAttribute("href") || "";
    this._text = (link ? link.textContent : range.toString()).replace(/\s+/g, " ").trim();
    this.__textWas = this._text;
    this._newTab = link?.getAttribute("target") === "_blank";
    this._query = "";
    this._results = [];
    this._active = 0;
    this._error = "";
    const kept = range.cloneRange();
    await this.show(
      range,
      back ||
        (() => {
          if (!kept.startContainer.isConnected) return;
          body.focus({ preventScroll: true });
          setEditRange(kept);
        }),
    );
    this.shadowRoot.querySelector("input.href")?.focus();
    return true;
  }

  /** The bubble for a link clicked in the content; editable: it's in what's typed (Edit link, Remove link). */
  async bubble(link, { editable = false } = {}) {
    if (this.open) this.hide("outside");
    this.__body = activeBody();
    this.__link = link;
    this.__range = null;
    this.mode = "bubble";
    this._editable = editable;
    this._href = link.getAttribute("href") || "";
    globalThis.addEventListener("keydown", this.__typing, true);
    await this.show(link, null);
  }

  closed() {
    globalThis.removeEventListener("keydown", this.__typing, true);
  }

  /* ---------- the form ---------- */

  _setTab(tab) {
    this._tab = tab;
    this._error = "";
    this.updateComplete.then(() => {
      this.shadowRoot.querySelector(tab === "page" ? "input.search" : "input.href")?.focus();
      this.place();
    });
  }

  _search(query) {
    this._query = query;
    this._results = findPages(query);
    this._active = 0;
    this._error = "";
    this.updateComplete.then(() => this.place());
  }

  _searchKeys(e) {
    const n = this._results.length;
    if ((e.key === "ArrowDown" || e.key === "ArrowUp") && n) {
      e.preventDefault();
      this._active = (this._active + (e.key === "ArrowDown" ? 1 : n - 1)) % n;
      this.shadowRoot.querySelector(`#page-${this._active}`)?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" && !e.isComposing) {
      e.preventDefault();
      this._submit();
    }
  }

  _submit() {
    if (this._tab === "page") {
      const page = this._results[this._active];
      if (!page) {
        this._error = this._query.trim() ? "No page matches. Try other words." : "Search for a page by its title.";
        return;
      }
      this._apply(page.slug, page.title);
      return;
    }
    const href = normalizeHref(this._href);
    if (!href) {
      this._error = "Type an address, or choose Link to a page.";
      this.shadowRoot.querySelector("input.href")?.focus();
      return;
    }
    this._apply(href, this._href.trim());
  }

  // the link on the page, as one undo step; the caret after it
  async _apply(href, fallbackText) {
    const body = this.__body;
    const range = this.__range;
    const link = this.__link?.isConnected ? this.__link : null;
    const newTab = this._newTab;
    const text = this._text.replace(/\s+/g, " ").trim();
    const retext = !!text && text !== this.__textWas;
    // (focus is put after the link, not back where it was)
    this.__back = null;
    this.hide("done");
    if (!body?.isConnected || !range) return;
    let last = null;
    const done = await asOneStep(unitOf(link || range.startContainer), link ? "changed a link" : "added a link", () => {
      body.focus({ preventScroll: true });
      let links;
      if (link) {
        link.setAttribute("href", href);
        if (retext) link.textContent = text;
        links = [link];
      } else if (!range.toString().trim()) {
        // nothing selected: a new link, its text the words given (or the page's title, the address)
        const a = globalThis.document.createElement("a");
        a.setAttribute("href", href);
        a.textContent = text || fallbackText || href;
        range.collapse(false);
        range.insertNode(a);
        links = [a];
      } else {
        const r = trimmed(range);
        setEditRange(r);
        globalThis.document.execCommand("createLink", false, href);
        links = linksIn(getEditRange(body) || r, body).filter((a) => a.getAttribute("href") === href);
        if (retext && links.length === 1) links[0].textContent = text;
        tidy(links);
      }
      for (const a of links) setNewTab(a, newTab);
      last = links[links.length - 1] || null;
      return links.length > 0;
    });
    if (last?.isConnected) caretAfter(last, body);
    if (done) announce(link ? "Link changed" : "Link added");
  }

  _remove() {
    const link = this.__link;
    this.__back = null;
    this.hide("done");
    if (link?.isConnected) removeLink({ link });
  }

  /* ---------- the bubble ---------- */

  _openLink() {
    const href = this._href;
    this.hide("outside");
    try {
      globalThis.open(new URL(href, globalThis.document.baseURI).href, "_blank", "noopener");
    } catch {
      // (an address that isn't one)
    }
  }

  renderBody() {
    return this.mode === "bubble" ? this._renderBubble() : this._renderForm();
  }

  _renderBubble() {
    return html`<div class="bubble" role="toolbar" aria-label="Link">
      <span class="url" title="${this._href}">${this._href}</span>
      <button type="button" class="btn" @click="${this._openLink}">${icon("icons:open-in-new")}Open in new tab</button>
      ${this._editable
        ? html`<button type="button" class="btn" @click="${() => this.edit({ link: this.__link })}">${icon("oer:pencil")}Edit link</button>
            <button type="button" class="btn danger" @click="${this._remove}">${icon("oer:unlink")}Remove link</button>`
        : ""}
    </div>`;
  }

  _renderForm() {
    const page = this._tab === "page";
    const listed = page && this._results.length > 0;
    return html`<form
      class="form"
      role="dialog"
      aria-label="${this.__link ? "Edit link" : "Add link"}"
      @submit="${(e) => {
        e.preventDefault();
        this._submit();
      }}"
    >
      <div class="seg" role="group" aria-label="Link to">
        <button type="button" aria-pressed="${page ? "false" : "true"}" @click="${() => this._setTab("address")}">Address</button>
        <button type="button" aria-pressed="${page ? "true" : "false"}" @click="${() => this._setTab("page")}">Link to a page</button>
      </div>
      ${page
        ? html`<label class="field">
              <span class="lbl">Page</span>
              <input
                class="search"
                type="text"
                role="combobox"
                autocomplete="off"
                aria-autocomplete="list"
                aria-expanded="${listed ? "true" : "false"}"
                aria-controls="pages"
                aria-activedescendant="${listed ? `page-${this._active}` : ""}"
                placeholder="Search the site's pages"
                .value="${this._query}"
                @input="${(e) => this._search(e.target.value)}"
                @keydown="${this._searchKeys}"
              />
            </label>
            <ul id="pages" role="listbox" aria-label="Pages" ?hidden="${!listed}">
              ${this._results.map(
                (p, i) => html`<li
                  id="page-${i}"
                  role="option"
                  aria-selected="${i === this._active ? "true" : "false"}"
                  @mousedown="${(e) => e.preventDefault()}"
                  @click="${() => this._apply(p.slug, p.title)}"
                >
                  <span class="title">${p.title}</span>${p.where ? html`<span class="where">${p.where}</span>` : ""}
                </li>`,
              )}
            </ul>
            ${this._query.trim() && !listed ? html`<p class="none">No page matches.</p>` : ""}`
        : html`<label class="field">
            <span class="lbl">Address</span>
            <input class="href" type="text" inputmode="url" autocomplete="off" placeholder="https://… or a page's address" .value="${this._href}" @input="${(e) => ((this._href = e.target.value), (this._error = ""))}" />
          </label>`}
      <label class="field">
        <span class="lbl">Text</span>
        <input class="text" type="text" autocomplete="off" placeholder="${page ? "The page's title" : "The address"}" .value="${this._text}" @input="${(e) => (this._text = e.target.value)}" />
      </label>
      <label class="check">
        <input type="checkbox" .checked="${this._newTab}" @change="${(e) => (this._newTab = e.target.checked)}" />
        <span>Open in a new tab</span>
      </label>
      ${this._error ? html`<p class="err" role="alert">${this._error}</p>` : ""}
      <div class="foot">
        ${this.__link ? html`<button type="button" class="btn danger" @click="${this._remove}">${icon("oer:unlink")}Remove link</button>` : ""}
        <span class="grow"></span>
        <button type="button" class="btn outline" @click="${() => this.hide("cancel")}">Cancel</button>
        <button type="submit" class="btn primary">${this.__link ? "Update link" : "Add link"}</button>
      </div>
    </form>`;
  }

  static get styles() {
    return [
      formControls,
      AnchoredPopover.popoverStyles,
      css`
        :host([mode="bubble"]) {
          width: max-content;
          max-width: min(36rem, calc(100vw - 1rem));
        }
        .bubble {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.25rem 0.25rem 0.75rem;
        }
        .url {
          flex: 0 1 auto;
          min-width: 0;
          max-width: 16rem;
          margin-right: 0.25rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.8125rem;
          color: var(--muted-foreground);
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin: 0;
          padding: 1rem;
        }
        .seg {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.25rem;
          padding: 0.1875rem;
          border-radius: var(--radius-md, 0.5rem);
          background: var(--muted);
        }
        .seg button {
          height: 1.75rem;
          border: 0;
          border-radius: calc(var(--radius-md, 0.5rem) - 2px);
          background: none;
          font: inherit;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--muted-foreground);
          cursor: pointer;
        }
        .seg button[aria-pressed="true"] {
          background: var(--background);
          color: var(--foreground);
          box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
        }
        .seg button:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 1px;
        }
        @media (forced-colors: active) {
          .seg button[aria-pressed="true"] {
            outline: 2px solid Highlight;
          }
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }
        .lbl {
          font-size: 0.8125rem;
          font-weight: 500;
        }
        input[type="text"] {
          box-sizing: border-box;
          width: 100%;
          height: 2.25rem;
          padding: 0 0.75rem;
          font: inherit;
          font-size: 0.875rem;
        }
        .check {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }
        #pages {
          max-height: 14rem;
          margin: -0.25rem 0 0;
          padding: 0.25rem;
          overflow-y: auto;
          list-style: none;
          border: 1px solid var(--border);
          border-radius: var(--radius-md, 0.5rem);
        }
        #pages[hidden] {
          display: none;
        }
        [role="option"] {
          display: flex;
          flex-direction: column;
          padding: 0.375rem 0.5rem;
          border-radius: calc(var(--radius-md, 0.5rem) - 2px);
          cursor: pointer;
        }
        [role="option"]:hover,
        [role="option"][aria-selected="true"] {
          background: var(--accent);
        }
        @media (forced-colors: active) {
          [role="option"][aria-selected="true"] {
            outline: 2px solid Highlight;
          }
        }
        .title {
          font-size: 0.875rem;
        }
        .where {
          font-size: 0.75rem;
          color: var(--muted-foreground);
        }
        .none,
        .err {
          margin: 0;
          font-size: 0.8125rem;
          color: var(--muted-foreground);
        }
        .err {
          color: var(--destructive);
        }
        .foot {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .grow {
          flex: 1;
        }
      `,
    ];
  }
}

if (!customElements.get(OerLinkPopover.tag)) customElements.define(OerLinkPopover.tag, OerLinkPopover);

/** The page's link popover (made on first use). */
export function linkPopover() {
  const doc = globalThis.document;
  return doc.querySelector(OerLinkPopover.tag) || doc.body.appendChild(doc.createElement(OerLinkPopover.tag));
}

/* ---------- Mod+K and the bubble ---------- */

// Mod+K while typing in the content: the form, for the selection
function linkKey(e) {
  if (e.code !== "KeyK" || !(isMac ? e.metaKey : e.ctrlKey) || e.shiftKey || e.altKey || e.defaultPrevented) return;
  const body = activeBody();
  const from = e.composedPath()[0];
  if (!body?.editMode || !(from === body || body.contains(from)) || !textRange(body)) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  linkPopover().edit();
}

let installed = false;
export function installLinkPopover() {
  if (installed) return;
  installed = true;
  // capture, on the window: before HAX's own keys
  globalThis.addEventListener("keydown", linkKey, true);
  // a link clicked in the content (hax-fixes.js holdLinks)
  globalThis.addEventListener("oer-link-click", (e) => {
    const { link, editable } = e.detail || {};
    if (link?.isConnected && activeBody()?.editMode) linkPopover().bubble(link, { editable });
  });
  // nothing to link once editing ends
  globalThis.addEventListener("haxcms-edit-mode-changed", (e) => {
    if (!e.detail) globalThis.document.querySelector(OerLinkPopover.tag)?.hide("outside");
  });
}
