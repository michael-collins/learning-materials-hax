/**
 * `oer-book-site` — a book on its own (types/book-site.js), at
 * /book/<short name>, for sending to readers: a bar (the book, Text
 * settings, Download), its chapters down the side, and one chapter at a
 * time set in the reader's own type and page colour (Reader mode's Text
 * settings, remembered on their device). No site navigation and no page
 * metadata: just the book.
 *
 * The title page (cover, description, authors, Start reading, downloads,
 * contents) comes first. Chapters are deep-linked (#<the chapter's address
 * inside the book>), ← and → turn pages, and downloads are PDF (the
 * book's print view) and EPUB (books/epub.js).
 *
 *   <oer-book-site .site=${item}></oer-book-site>
 * @element oer-book-site
 */
import { html, css, unsafeCSS, LitElement } from "../lit.js";
import { store, autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { bookOfSite, bookOutline, bookSiteIsOn } from "../types/book-site.js";
import { peopleOf } from "../types/content-types.js";
import { resolvedHtml } from "../books/book-export.js";
import { bookPrint } from "../books/oer-book-print.js";
import { exportEpub } from "../books/epub.js";
import { loadReaderSettings, saveReaderSettings, readerVars, readerPaletteCss } from "../ui/oer-reader.js";
import { formControls } from "../ui/form-controls.js";
import { watchFootnotes } from "../ui/footnotes.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;
const typing = (e) => e.composedPath().some((n) => n.isContentEditable || /^(input|textarea|select)$/i.test(n.localName || ""));

// the chapters sit beside the page on wide screens and slide in on narrow ones
const WIDE = "(min-width: 861px)";
const TOC_KEY = "oer-book-toc";
const tocWanted = () => {
  try {
    return globalThis.localStorage.getItem(TOC_KEY) !== "closed";
  } catch {
    return true;
  }
};

/**
 * A group's rows folded for the chapters down the side: a heading holds
 * the chapters after it (until the next heading), and a chapter holds the
 * ones under it (a project's steps). Nodes: { c, kids }.
 */
function foldRows(rows, inset) {
  const level = (c) => Math.max(0, c.depth - inset);
  const out = [];
  const lastChapter = () => {
    const last = out[out.length - 1];
    if (!last) return null;
    if (!last.c.heading) return last;
    return last.kids[last.kids.length - 1] || null;
  };
  for (const c of rows) {
    const node = { c, kids: [] };
    if (level(c) === 0) {
      const last = out[out.length - 1];
      if (!c.heading && last?.c.heading) last.kids.push(node);
      else out.push(node);
    } else {
      const host = lastChapter();
      if (host) host.kids.push(node);
      else out.push(node);
    }
  }
  return out;
}

/**
 * The contents in groups for the title page: each part (a top-level chapter
 * with chapters under it) on its own, a top-level heading with the
 * chapters after it, and runs of single top-level chapters together.
 */
function contentsGroups(list) {
  const groups = [];
  list.forEach((c, i) => {
    const last = groups[groups.length - 1];
    if (c.depth > 0) {
      if (last) last.rows.push(c);
      else groups.push({ lead: null, rows: [c] });
    } else if (c.heading) groups.push({ lead: c, rows: [] });
    else if (list[i + 1]?.depth > 0) groups.push({ lead: c, rows: [] });
    else if (last && (!last.lead || (last.lead.heading && last.rows.every((r) => r.depth === 0)))) last.rows.push(c);
    else groups.push({ lead: null, rows: [c] });
  });
  return groups;
}

class OerBookSite extends LitElement {
  static get tag() {
    return "oer-book-site";
  }

  static get properties() {
    return {
      site: { type: Object },
      colour: { type: String, reflect: true },
      _route: { state: true },
      _loading: { state: true },
      _panel: { state: true },
      _tocOpen: { state: true },
      _folds: { state: true }, // groups in the chapters down the side opened or closed by hand
      _filter: { state: true },
      _busy: { state: true },
      _signedIn: { state: true },
    };
  }

  constructor() {
    super();
    this.site = null;
    this._route = decodeURIComponent(globalThis.location.hash.slice(1));
    this._panel = "";
    this.__wide = globalThis.matchMedia(WIDE);
    this._tocOpen = this.__wide.matches && tocWanted();
    this.__onWide = (e) => (this._tocOpen = e.matches && tocWanted());
    this._filter = "";
    this._folds = new Map(); // item id → open (true) or closed (false)
    this._busy = "";
    this._settings = loadReaderSettings();
    this.colour = this._settings.colour;
    this._html = "";
    this.__onHash = () => (this._route = decodeURIComponent(globalThis.location.hash.slice(1)));
    this.__onKeys = (e) => {
      if (e.key === "Escape" && (this._panel || (this._tocOpen && !this.__wide.matches))) {
        this._panel = "";
        if (!this.__wide.matches) this._tocOpen = false;
        return;
      }
      if (typing(e) || e.altKey || e.ctrlKey || e.metaKey || globalThis.document.querySelector("oer-book-print[open]")) return;
      if (e.key === "ArrowLeft" && this._turn(-1)) e.preventDefault();
      if (e.key === "ArrowRight" && this._turn(1)) e.preventDefault();
    };
    this.__onLink = (e) => this._followLink(e);
    this.addEventListener("click", this.__onLink);
    this.__outside = (e) => {
      if (this._panel && !e.composedPath().some((n) => n.classList?.contains("pop") || n.classList?.contains("pop-btn"))) this._panel = "";
    };
  }

  connectedCallback() {
    super.connectedCallback();
    globalThis.addEventListener("hashchange", this.__onHash);
    globalThis.addEventListener("keydown", this.__onKeys);
    globalThis.addEventListener("pointerdown", this.__outside, true);
    this.__wide.addEventListener("change", this.__onWide);
    this.__stop = autorun(() => {
      const items = toJS(store.manifest?.items) || [];
      const signedIn = !!store.isLoggedIn;
      Promise.resolve().then(() => {
        this._items = items;
        this._signedIn = signedIn;
        this.requestUpdate();
      });
    });
  }

  disconnectedCallback() {
    globalThis.removeEventListener("hashchange", this.__onHash);
    globalThis.removeEventListener("keydown", this.__onKeys);
    globalThis.removeEventListener("pointerdown", this.__outside, true);
    this.__wide.removeEventListener("change", this.__onWide);
    this.__stop?.();
    super.disconnectedCallback();
  }

  get _book() {
    return bookOfSite(this.site, this._items);
  }

  get _outline() {
    return bookOutline(this._book, this._items);
  }

  // the chapter the address names in `list` (the outline), or null for the
  // title page; headings have no page of their own
  _currentIn(list) {
    return this._route ? list.find((c) => c.rel === this._route && !c.heading) || null : null;
  }

  // show or hide the chapters; on wide screens the choice is remembered
  _toggleToc() {
    this._tocOpen = !this._tocOpen;
    if (!this.__wide.matches) return;
    try {
      globalThis.localStorage.setItem(TOC_KEY, this._tocOpen ? "open" : "closed");
    } catch {
      /* private window: for this visit only */
    }
  }

  // a chapter's address: the book site's own, with the chapter after the #
  // (a bare "#…" would resolve against the site's <base>, its home page)
  _href(rel) {
    return rel ? `${this.site.slug}#${encodeURI(rel)}` : this.site.slug;
  }

  /**
   * A click on a link to a chapter of this book (the contents, the pager,
   * or a link inside a chapter) turns to it here, instead of leaving for
   * the site's own page; a modified click (a new tab) goes its own way.
   */
  _followLink(e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.composedPath().find((n) => n.localName === "a");
    if (!a || (a.target && a.target !== "_self")) return;
    let rel = a.dataset.rel;
    if (rel === undefined) {
      const url = new URL(a.getAttribute("href") || "", globalThis.document.baseURI);
      const root = new URL(".", globalThis.document.baseURI);
      if (url.origin !== root.origin || !url.pathname.startsWith(root.pathname)) return;
      const slug = decodeURIComponent(url.pathname.slice(root.pathname.length)).replace(/\/$/, "");
      if (slug === this.site.slug) rel = decodeURIComponent(url.hash.slice(1));
      else {
        const hit = this._outline.find((c) => !c.heading && c.item.slug === slug);
        if (!hit) return;
        rel = hit.rel;
      }
    }
    e.preventDefault();
    e.stopPropagation();
    this._go(rel);
  }

  // a chapter by its address in the book, or "" for the title page
  _go(rel) {
    if (!this.__wide.matches) this._tocOpen = false;
    if (rel) {
      globalThis.location.hash = encodeURI(rel);
      return;
    }
    globalThis.history.pushState({}, "", globalThis.location.pathname + globalThis.location.search);
    this._route = "";
  }

  _turn(step) {
    const list = this._outline.filter((c) => !c.heading);
    const current = this._currentIn(list);
    const i = current ? list.indexOf(current) : -1;
    const next = i + step;
    if (next < -1 || next >= list.length) return false;
    this._go(next === -1 ? "" : list[next].rel);
    return true;
  }

  willUpdate(changed) {
    // load the chapter the address names
    const current = this._currentIn(this._outline);
    const key = current ? `${current.item.id}:${current.item.metadata?.updated || ""}` : "";
    if (key && key !== this.__loaded && this._items) {
      this.__loaded = key;
      this._loading = true;
      resolvedHtml(current.item, this._items).then((text) => {
        if (this.__loaded !== key) return;
        this._html = text;
        this._loading = false;
        this.requestUpdate();
      });
    }
    if (!key) {
      this.__loaded = "";
      this._html = "";
    }
    if (changed.has("_route")) this.updateComplete.then(() => this.shadowRoot.querySelector(".top")?.scrollIntoView({ block: "start" }));
  }

  firstUpdated() {
    // footnote previews for the chapters (their links jump within this page: ui/footnotes.js)
    watchFootnotes(this.shadowRoot);
  }

  updated() {
    // the chapter's own HTML, as the site stores it (its blocks render themselves)
    const box = this.shadowRoot.querySelector(".content");
    if (box && box.__html !== this._html) {
      box.innerHTML = this._html;
      box.__html = this._html;
    }
    // the reader's type, measure and page colour
    for (const [k, v] of Object.entries(readerVars(this._settings))) this.style.setProperty(k, v);
  }

  _setSettings(s) {
    this._settings = s;
    this.colour = s.colour;
    saveReaderSettings(s);
    this.requestUpdate();
  }

  async _epub() {
    const book = this._book;
    if (!book || this._busy) return;
    this._panel = "";
    this._busy = "Making the EPUB…";
    try {
      await exportEpub(book.id, {
        online: (item) => new URL(`${this.site.slug}${item.id === book.id ? "" : `#${this._outline.find((c) => c.item.id === item.id)?.rel || ""}`}`, globalThis.document.baseURI).href,
        onProgress: (m) => (this._busy = m ? `Making the EPUB: ${m.toLowerCase()}…` : "Making the EPUB…"),
      });
      this._busy = "";
    } catch (err) {
      this._busy = `The EPUB couldn't be made: ${err.message || err}`;
    }
  }

  _pdf() {
    this._panel = "";
    if (this._book) bookPrint().show(this._book.id);
  }

  // a fold in the chapters down the side: open by hand, or holding the page being read
  _isOpen(node, current) {
    const id = node.c.item.id;
    if (this._folds.has(id)) return this._folds.get(id);
    const holds = (n) => n.c === current || n.kids.some(holds);
    return node.kids.some(holds);
  }

  _fold(node, current) {
    const next = new Map(this._folds);
    next.set(node.c.item.id, !this._isOpen(node, current));
    this._folds = next;
  }

  _renderNode(node, current) {
    const { c, kids } = node;
    const open = kids.length ? this._isOpen(node, current) : false;
    const chevron = html`<span class="chev ${open ? "open" : ""}" aria-hidden="true">${lucide("oer:chevron-right", "sm")}</span>`;
    const list = kids.length && open ? html`<ol class="kids">${kids.map((k) => this._renderNode(k, current))}</ol>` : "";
    // a heading: a button that opens the chapters after it
    if (c.heading) {
      return kids.length
        ? html`<li>
            <button class="fold" aria-expanded="${open ? "true" : "false"}" @click="${() => this._fold(node, current)}">${c.item.title}${chevron}</button>
            ${list}
          </li>`
        : html`<li class="label">${c.item.title}</li>`;
    }
    const link = html`<a href="${this._href(c.rel)}" data-rel="${c.rel}" class="${c === current ? "here" : ""}" aria-current="${c === current ? "page" : "false"}">${c.item.title}</a>`;
    return kids.length
      ? html`<li>
          <div class="row">
            ${link}<button class="fold-btn" aria-expanded="${open ? "true" : "false"}" aria-label="${open ? "Hide" : "Show"} the parts of ${c.item.title}" @click="${() => this._fold(node, current)}">${chevron}</button>
          </div>
          ${list}
        </li>`
      : html`<li>${link}</li>`;
  }

  _renderToc(list, current) {
    const q = this._filter.trim().toLowerCase();
    const found = q ? list.filter((c) => !c.heading && c.item.title.toLowerCase().includes(q)) : [];
    return html`<nav class="toc" id="toc" aria-label="Chapters">
      ${list.length > 12
        ? html`<label class="filter">${lucide("icons:search", "sm")}<input type="search" placeholder="Find a chapter" aria-label="Find a chapter" .value="${this._filter}" @input="${(e) => (this._filter = e.target.value)}" /></label>`
        : ""}
      ${q
        ? html`<ol class="found">
              ${found.map(
                (c) => html`<li><a href="${this._href(c.rel)}" data-rel="${c.rel}" class="${c === current ? "here" : ""}" aria-current="${c === current ? "page" : "false"}">${c.item.title}</a></li>`,
              )}
            </ol>
            ${found.length ? "" : html`<p class="muted">No chapter matches.</p>`}`
        : html`<ol class="top-links">
              <li><a href="${this._href("")}" data-rel="" class="${current ? "" : "here"}" aria-current="${current ? "false" : "page"}">About this book</a></li>
            </ol>
            ${contentsGroups(list).map(({ lead, rows }) => {
              const inset = lead && !lead.heading ? 1 : 0;
              return html`<section class="tgroup">
                ${lead
                  ? lead.heading
                    ? html`<h3>${lead.item.title}</h3>`
                    : html`<h3><a href="${this._href(lead.rel)}" data-rel="${lead.rel}" class="${lead === current ? "here" : ""}" aria-current="${lead === current ? "page" : "false"}">${lead.item.title}</a></h3>`
                  : ""}
                ${rows.length ? html`<ol>${foldRows(rows, inset).map((n) => this._renderNode(n, current))}</ol>` : ""}
              </section>`;
            })}`}
    </nav>`;
  }

  _renderTitlePage(book, list) {
    const pages = list.filter((c) => !c.heading);
    const f = book.metadata?.oerFields || {};
    const authors = peopleOf(f.authors).map((p) => p.name).filter(Boolean);
    return html`<article class="title-page">
      ${f.coverImage ? html`<img class="cover" src="${f.coverImage}" alt="${f.coverImageAlt || ""}" />` : ""}
      <h1>${book.title}</h1>
      ${book.description ? html`<p class="desc">${book.description}</p>` : ""}
      ${authors.length ? html`<p class="authors">${authors.join(", ")}</p>` : ""}
      <div class="ctas">
        ${pages.length ? html`<button class="btn primary" @click="${() => this._go(pages[0].rel)}">Start reading${lucide("oer:arrow-right", "sm")}</button>` : ""}
        <button class="btn outline" @click="${this._pdf}">${lucide("icons:print", "sm")}PDF</button>
        <button class="btn outline" @click="${this._epub}">${lucide("oer:book-a", "sm")}EPUB</button>
      </div>
      <section class="contents" aria-labelledby="contents-h">
        <h2 id="contents-h">Contents <span class="count">${pages.length} chapter${pages.length === 1 ? "" : "s"}</span></h2>
        <div class="groups">
          ${contentsGroups(list).map(({ lead, rows }) => {
            // rows sit one level in under a part's title; anything below a
            // part's own chapters (a project's steps) folds into a count
            // after its chapter here, and the chapters down the side list it all
            const inset = lead && !lead.heading ? 1 : 0;
            const level = (c) => Math.max(0, c.depth - inset);
            const shownRows = [];
            for (const c of rows) {
              if (level(c) >= 1) {
                const host = shownRows[shownRows.length - 1];
                if (host && !c.heading) host.more++;
              } else shownRows.push({ c, more: 0 });
            }
            return html`<div class="group">
              ${lead ? (lead.heading ? html`<h3 class="g-label">${lead.item.title}</h3>` : html`<h3><a href="${this._href(lead.rel)}" data-rel="${lead.rel}">${lead.item.title}</a></h3>`) : ""}
              ${shownRows.length
                ? html`<ol>
                    ${shownRows.map(({ c, more }) =>
                      c.heading
                        ? html`<li class="label" style="--depth:${level(c)}">${c.item.title}</li>`
                        : html`<li style="--depth:${level(c)}">
                            <a href="${this._href(c.rel)}" data-rel="${c.rel}">${c.item.title}</a>${more ? html`<span class="more"> · ${more} more</span>` : ""}
                          </li>`,
                    )}
                  </ol>`
                : ""}
            </div>`;
          })}
        </div>
      </section>
    </article>`;
  }

  _renderChapter(current, outline) {
    const list = outline.filter((c) => !c.heading);
    const i = list.indexOf(current);
    const prev = i > 0 ? list[i - 1] : null;
    const next = i < list.length - 1 ? list[i + 1] : null;
    // the part it's in: the nearest chapter above it
    let part = null;
    const at = outline.indexOf(current);
    for (let k = at - 1; k >= 0 && current.depth > 0; k--) if (outline[k].depth < current.depth && !outline[k].heading) (part = outline[k]), (k = -1);
    return html`<article class="chapter">
      ${part ? html`<p class="part"><a href="${this._href(part.rel)}" data-rel="${part.rel}">${part.item.title}</a></p>` : ""}
      <h1>${current.item.title}</h1>
      <div class="content" aria-busy="${this._loading ? "true" : "false"}"></div>
      ${this._loading && !this._html ? html`<p class="muted">Loading…</p>` : ""}
      <nav class="pager" aria-label="Previous and next chapter">
        ${prev
          ? html`<a class="turn prev" href="${this._href(prev.rel)}" data-rel="${prev.rel}"><span class="dir">${lucide("oer:chevron-left", "sm")}Previous</span><span class="t">${prev.item.title}</span></a>`
          : html`<a class="turn prev" href="${this._href("")}" data-rel=""><span class="dir">${lucide("oer:chevron-left", "sm")}About this book</span></a>`}
        ${next ? html`<a class="turn next" href="${this._href(next.rel)}" data-rel="${next.rel}"><span class="dir">Next${lucide("oer:chevron-right", "sm")}</span><span class="t">${next.item.title}</span></a>` : html`<span></span>`}
      </nav>
      <p class="pos">${i + 1} of ${list.length}</p>
    </article>`;
  }

  // the chapters' button, at the start of the bar
  _tocButton() {
    const label = this._tocOpen ? "Hide chapters" : "Show chapters";
    return html`<button
      class="icon-btn toc-btn"
      aria-controls="toc"
      aria-expanded="${this._tocOpen ? "true" : "false"}"
      aria-label="${label}"
      title="${label}"
      @click="${this._toggleToc}"
    >
      ${lucide(this._tocOpen ? "oer:panel-left-close" : "oer:panel-left-open")}
    </button>`;
  }

  render() {
    const book = this._book;
    if (!book) return html`<p class="missing">${this._items ? "This book site's book isn't on the site any more." : ""}</p>`;
    const list = this._outline;
    const current = this._currentIn(list);
    return html`<div class="top"></div>
      <header class="bar">
        ${this._tocButton()}
        <span class="divider" aria-hidden="true"></span>
        <a class="title" href="${this._href("")}" data-rel="">${book.title}</a>
        <span class="spacer"></span>
        ${this._busy ? html`<span class="busy" role="status">${this._busy}</span>` : ""}
        <span class="pop-wrap">
          <button class="btn ghost pop-btn" aria-expanded="${this._panel === "text" ? "true" : "false"}" @click="${() => (this._panel = this._panel === "text" ? "" : "text")}"><span class="aa" aria-hidden="true">Aa</span><span class="lbl">Text</span></button>
          ${this._panel === "text"
            ? html`<div class="pop text" role="dialog" aria-label="Text settings"><oer-reader-text .settings="${this._settings}" @reader-settings="${(e) => this._setSettings(e.detail)}"></oer-reader-text></div>`
            : ""}
        </span>
        <span class="pop-wrap">
          <button class="btn ghost pop-btn" aria-haspopup="menu" aria-expanded="${this._panel === "download" ? "true" : "false"}" @click="${() => (this._panel = this._panel === "download" ? "" : "download")}">${lucide("icons:file-download", "sm")}<span class="lbl">Download</span></button>
          ${this._panel === "download"
            ? html`<div class="pop menu" role="menu">
                <button role="menuitem" @click="${this._pdf}">${lucide("icons:print", "sm")}<span><b>PDF</b><small>The whole book, to print or save</small></span></button>
                <button role="menuitem" @click="${this._epub}">${lucide("oer:book-a", "sm")}<span><b>EPUB</b><small>For e-readers and Apple Books</small></span></button>
              </div>`
            : ""}
        </span>
      </header>
      ${this._signedIn && !bookSiteIsOn(this.site)
        ? html`<p class="off-note" role="status">This book site is off, so readers can't see it. Turn it on from <a href="${book.slug}">the book's page</a>.</p>`
        : ""}
      <div class="layout ${this._tocOpen ? "toc-open" : ""}">
        ${this._renderToc(list, current)}
        ${this._tocOpen ? html`<div class="scrim" @click="${() => (this._tocOpen = false)}"></div>` : ""}
        <main class="reading">
          ${current ? this._renderChapter(current, list) : this._renderTitlePage(book, list)}
        </main>
      </div>`;
  }

  static get styles() {
    return [
      formControls,
      css`
        :host {
          display: block;
          min-height: 100dvh;
          background-color: var(--background);
          color: var(--foreground);
          font-family: var(--font-sans, system-ui, sans-serif);
          /* DDD justifies the theme's text */
          text-align: start;
          --toc-width: 17rem;
          --bar: 3.5rem;
          --reader-h2: 1.5em;
          --reader-h3: 1.25em;
          --reader-h4: 1.05em;
          --reader-gap: 1em;
          --reader-table: 0.85em;
          --oer-include-source: none;
        }
        ${unsafeCSS(readerPaletteCss((c) => `:host([colour="${c}"])`))}
        a {
          color: var(--link);
        }
        button {
          font: inherit;
          color: inherit;
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
        .lucide.sm {
          width: 0.875rem;
          height: 0.875rem;
        }
        .muted {
          color: var(--muted-foreground);
          font-size: 0.875rem;
        }

        /* the bar */
        .bar {
          position: sticky;
          top: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          height: var(--bar);
          padding: 0 1rem;
          border-bottom: 1px solid var(--border);
          background-color: var(--background);
          background-image: var(--reader-texture, none);
        }
        .title {
          min-width: 0;
          overflow: hidden;
          color: inherit;
          font-weight: 600;
          font-size: 0.9375rem;
          text-decoration: none;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .spacer {
          flex: 1;
        }
        .busy {
          font-size: 0.8125rem;
          color: var(--muted-foreground);
        }
        .btn,
        .icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;
          height: 2.25rem;
          padding: 0 0.75rem;
          border: 1px solid transparent;
          border-radius: var(--radius-md, 0.5rem);
          background: none;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
        }
        .icon-btn {
          width: 2.25rem;
          padding: 0;
        }
        .btn.ghost:hover,
        .icon-btn:hover,
        .btn.outline:hover {
          background: var(--accent);
        }
        .btn.outline {
          border-color: var(--input-border, var(--border));
        }
        .btn.primary {
          background: var(--primary);
          color: var(--primary-foreground);
        }
        .aa {
          font-family: Georgia, serif;
          font-size: 1rem;
        }
        .pop-wrap {
          position: relative;
        }
        .pop {
          position: absolute;
          right: 0;
          top: calc(100% + 0.5rem);
          z-index: 30;
          box-sizing: border-box;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg, 0.75rem);
          background: var(--popover, var(--background));
          color: var(--popover-foreground, var(--foreground));
          box-shadow: 0 12px 32px rgb(0 0 0 / 0.18);
        }
        .pop.text {
          width: min(21rem, calc(100vw - 2rem));
          max-height: calc(100dvh - var(--bar) - 2rem);
          overflow-y: auto;
          padding: 1rem;
        }
        .pop.menu {
          display: flex;
          flex-direction: column;
          min-width: 16rem;
          padding: 0.375rem;
        }
        .pop.menu button {
          all: unset;
          display: flex;
          gap: 0.625rem;
          align-items: flex-start;
          padding: 0.5rem 0.625rem;
          border-radius: var(--radius-md, 0.5rem);
          cursor: pointer;
          font-size: 0.875rem;
        }
        .pop.menu button:hover,
        .pop.menu button:focus-visible {
          background: var(--accent);
        }
        .pop.menu .lucide {
          margin-top: 0.1875rem;
        }
        .pop.menu small {
          display: block;
          font-size: 0.75rem;
          color: var(--muted-foreground);
        }
        .off-note {
          margin: 0;
          padding: 0.5rem 1rem;
          border-bottom: 1px solid var(--border);
          background: var(--muted);
          font-size: 0.875rem;
        }

        /* chapters down the side: beside the page on wide screens, shown
           and hidden with the bar's button (remembered); on narrow ones
           they slide in over it */
        .layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
        }
        .layout.toc-open {
          grid-template-columns: var(--toc-width) minmax(0, 1fr);
        }
        .toc {
          display: none;
        }
        .layout.toc-open .toc {
          display: block;
        }
        .scrim {
          display: none;
        }
        .toc {
          position: sticky;
          top: var(--bar);
          align-self: start;
          box-sizing: border-box;
          height: calc(100dvh - var(--bar));
          overflow-y: auto;
          padding: 1rem 1.25rem 2rem;
          border-right: 1px solid var(--border);
          font-size: 0.875rem;
          scrollbar-width: thin;
        }
        .toc ol {
          display: flex;
          flex-direction: column;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .tgroup {
          padding: 0.75rem 0;
          border-top: 1px solid var(--border);
        }
        .top-links {
          padding-bottom: 0.5rem;
        }
        .tgroup h3 {
          margin: 0 0 0.25rem;
          font-size: 0.875rem;
          font-weight: 700;
          line-height: 1.45;
          color: var(--foreground);
        }
        .tgroup h3 a {
          padding: 0.25rem 0;
          color: inherit;
          font-weight: inherit;
        }
        .toc a,
        .fold {
          display: block;
          padding: 0.25rem 0;
          color: var(--muted-foreground);
          font-weight: 500;
          line-height: 1.45;
          text-decoration: none;
        }
        .toc a:hover,
        .fold:hover {
          color: var(--foreground);
        }
        .toc a.here {
          color: var(--link);
          font-weight: 600;
        }
        .fold {
          all: unset;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0.25rem 0;
          color: var(--muted-foreground);
          font-weight: 500;
          line-height: 1.45;
          cursor: pointer;
        }
        .row {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .row a {
          flex: 1;
          min-width: 0;
        }
        .fold-btn {
          all: unset;
          display: inline-grid;
          place-items: center;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: var(--radius-sm, 0.375rem);
          color: var(--muted-foreground);
          cursor: pointer;
        }
        .fold-btn:hover {
          background: var(--accent);
          color: var(--foreground);
        }
        .fold:focus-visible,
        .fold-btn:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 1px;
        }
        .chev {
          display: inline-grid;
          transition: transform 0.15s ease;
        }
        .chev.open {
          transform: rotate(90deg);
        }
        .kids {
          margin: 0.125rem 0 0.25rem 0.125rem !important;
          padding-left: 0.75rem !important;
          border-left: 1px solid var(--border);
        }
        .toc li.label {
          padding: 0.5rem 0 0.125rem;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted-foreground);
        }
        @media (prefers-reduced-motion: reduce) {
          .chev {
            transition: none;
          }
        }
        .filter {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          height: 2rem;
          margin: 0 0 0.75rem;
          padding: 0 0.625rem;
          border: 1px solid var(--input-border, var(--border));
          border-radius: var(--radius-md, 0.5rem);
          color: var(--muted-foreground);
        }
        .filter input {
          flex: 1;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          font: inherit;
          color: var(--foreground);
        }

        /* a rule between the chapters' button and the book's title, so the
           button doesn't read as a logo */
        .divider {
          flex: none;
          width: 1px;
          height: 1.5rem;
          margin: 0 0.25rem;
          background: var(--border);
        }
        .toc-btn {
          color: var(--muted-foreground);
        }
        .toc-btn:hover {
          color: var(--foreground);
        }

        /* the page */
        .reading {
          min-width: 0;
          padding: 3rem 1.5rem 5rem;
          background-image: var(--reader-texture, none);
          --reader-ink: var(--foreground);
          --reader-muted-ink: var(--muted-foreground);
          --reader-link-ink: var(--link);
        }
        article {
          box-sizing: border-box;
          max-width: var(--reader-measure, 68ch);
          margin: 0 auto;
          font-family: var(--reader-font, var(--font-sans));
          font-size: var(--reader-size, 19px);
          line-height: var(--reader-leading, 1.7);
          /* Text dimming: text mixed toward the page, each kind by its own
             amount (the inks are taken on .reading: defined here they'd
             refer to themselves and cancel out) */
          --foreground: color-mix(in oklab, var(--reader-ink) calc(100% - var(--reader-dim, 0%)), var(--background));
          --muted-foreground: color-mix(in oklab, var(--reader-muted-ink) calc(100% - var(--reader-dim-muted, 0%)), var(--background));
          --link: color-mix(in oklab, var(--reader-link-ink) calc(100% - var(--reader-dim-link, 0%)), var(--background));
          color: var(--foreground);
        }
        article h1 {
          margin: 0 0 1.25rem;
          font-size: 1.85em;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }
        .part {
          margin: 0 0 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .part a {
          color: var(--muted-foreground);
          text-decoration: none;
        }
        .content h2 {
          margin: 1.6em 0 0.5em;
          font-size: var(--reader-h2);
          line-height: 1.25;
        }
        .content h3 {
          margin: 1.4em 0 0.4em;
          font-size: var(--reader-h3);
          line-height: 1.3;
        }
        .content h4 {
          margin: 1.2em 0 0.3em;
          font-size: var(--reader-h4);
        }
        .content p,
        .content ul,
        .content ol,
        .content blockquote,
        .content figure,
        .content pre,
        .content table {
          margin: 0 0 var(--reader-gap);
        }
        .content img,
        .content video {
          max-width: 100%;
          height: auto;
        }
        .content figure {
          margin-inline: 0;
        }
        .content figcaption {
          font-size: 0.85em;
          color: var(--muted-foreground);
        }
        .content table {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--reader-table);
        }
        .content td,
        .content th {
          padding: 0.4em 0.6em;
          border: 1px solid var(--border);
          vertical-align: top;
        }
        .content blockquote {
          padding-left: 1em;
          border-left: 3px solid var(--border);
          color: var(--muted-foreground);
        }
        /* footnotes (scripts/lib/footnotes.mjs), as the site sets them */
        .content sup.fn-ref {
          line-height: 0;
        }
        .content sup.fn-ref a {
          padding: 0 0.15em;
          font-family: var(--font-sans);
          font-size: 0.7em;
          font-weight: 600;
          text-decoration: none;
          color: var(--link);
        }
        .content sup.fn-ref a:hover {
          text-decoration: underline;
        }
        .content .footnotes {
          margin-top: 2.5em;
          padding-top: 1em;
          border-top: 1px solid var(--border);
          font-size: 0.85em;
          line-height: 1.6;
          color: var(--muted-foreground);
        }
        .content .footnotes h2 {
          margin: 0 0 0.5em;
          font-size: 1.1em;
          color: var(--foreground);
        }
        .content .footnotes ol {
          margin: 0;
          padding-left: 1.5em;
        }
        .content .footnotes li + li {
          margin-top: 0.375em;
        }
        .content .footnotes a {
          overflow-wrap: anywhere;
        }
        .content .footnotes a.fn-back {
          text-decoration: none;
        }
        .content :is(.footnotes li, sup.fn-ref):focus {
          outline: none;
          background: color-mix(in srgb, var(--primary) 12%, transparent);
          border-radius: var(--radius-sm, 0.375rem);
        }
        .content pre,
        .content code {
          font-family: var(--font-mono, monospace);
          font-size: 0.85em;
        }
        .content pre {
          overflow-x: auto;
          padding: 0.75em 1em;
          border-radius: var(--radius-md, 0.5rem);
          background: var(--muted);
        }
        .pager {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
          font-family: var(--font-sans);
          line-height: 1.4;
        }
        .turn {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0.875rem 1rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg, 0.75rem);
          color: var(--foreground);
          text-decoration: none;
        }
        .turn:hover {
          background: var(--accent);
        }
        .turn.next {
          text-align: end;
          align-items: flex-end;
        }
        .dir {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8125rem;
          color: var(--muted-foreground);
        }
        .t {
          font-weight: 600;
          font-size: 0.9375rem;
        }
        .pos {
          margin: 1rem 0 0;
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          text-align: center;
          color: var(--muted-foreground);
        }

        /* the title page: its opening centred, its contents in columns */
        .title-page {
          max-width: min(72rem, 100%);
          text-align: center;
        }
        .cover {
          display: block;
          max-width: min(20rem, 70%);
          max-height: 26rem;
          margin: 0 auto 2rem;
          border-radius: var(--radius-md, 0.5rem);
          box-shadow: 0 12px 32px rgb(0 0 0 / 0.18);
        }
        .title-page h1 {
          font-size: 2.25em;
        }
        .desc {
          margin: 0 auto 1rem;
          max-width: 46ch;
          color: var(--muted-foreground);
        }
        .authors {
          margin: 0 0 1.5rem;
          font-style: italic;
        }
        .ctas {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.625rem;
          font-family: var(--font-sans);
        }
        .contents {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
          text-align: start;
        }
        .contents h2 {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          margin: 0 0 1.5rem;
          font-size: 1.35em;
        }
        .count {
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          font-weight: 400;
          color: var(--muted-foreground);
        }
        /* as many columns as fit, kept even: a part may carry on into the
           next column, but its title and labels stay with what follows */
        .groups {
          columns: 15rem;
          column-gap: 2.5rem;
          font-size: 0.8em;
          line-height: 1.35;
        }
        .group {
          margin-bottom: 1.5rem;
        }
        .group h3,
        .group li.label {
          break-after: avoid;
          break-inside: avoid;
        }
        .group li {
          break-inside: avoid;
        }
        .more {
          font-family: var(--font-sans);
          font-size: 0.85em;
          color: var(--muted-foreground);
          white-space: nowrap;
        }
        .group h3 {
          margin: 0 0 0.375rem;
          padding-bottom: 0.375rem;
          border-bottom: 1px solid var(--border);
          font-size: 1.05em;
          line-height: 1.3;
        }
        .group h3 a {
          color: var(--foreground);
          text-decoration: none;
        }
        .group h3 a:hover {
          text-decoration: underline;
        }
        .g-label,
        .group li.label {
          font-family: var(--font-sans);
          font-size: 0.75em;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted-foreground);
        }
        .group ol {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .group li {
          padding: 0.1875rem 0 0.1875rem calc(var(--depth, 0) * 1rem);
        }
        .group li.label {
          padding-top: 0.625rem;
        }
        .group li.label:first-child {
          padding-top: 0;
        }
        .group li a {
          color: var(--foreground);
          text-decoration: none;
        }
        .group li a:hover {
          color: var(--link);
          text-decoration: underline;
        }
        .missing {
          padding: 3rem;
          text-align: center;
        }

        /* narrow screens: the chapters slide in over the page */
        @media (max-width: 860px) {
          .layout.toc-open {
            grid-template-columns: minmax(0, 1fr);
          }
          .toc {
            display: block;
            visibility: hidden;
            position: fixed;
            top: var(--bar);
            left: 0;
            z-index: 25;
            width: min(20rem, 85vw);
            background: var(--background);
            box-shadow: 0 12px 32px rgb(0 0 0 / 0.18);
            transform: translateX(-105%);
            transition:
              transform 0.2s ease,
              visibility 0s linear 0.2s;
          }
          .layout.toc-open .toc {
            visibility: visible;
            transform: none;
            transition: transform 0.2s ease;
          }
          .layout.toc-open .scrim {
            display: block;
            position: fixed;
            inset: var(--bar) 0 0 0;
            z-index: 24;
            background: rgb(0 0 0 / 0.35);
          }
          .lbl {
            display: none;
          }
          .reading {
            padding: 2rem 1rem 4rem;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .toc {
            transition: none;
          }
        }
      `,
    ];
  }
}

if (!customElements.get(OerBookSite.tag)) customElements.define(OerBookSite.tag, OerBookSite);
