/**
 * `oer-tutorial-series` — a tutorial series in an exercise or project: the
 * current part's video with the series' parts as a playlist under it, a
 * Tutorial button that opens that part's written tutorial beside it, and
 * Full screen, which shows the two side by side across the screen.
 *
 *   <oer-tutorial-series series="item-…"></oer-tutorial-series>
 *
 * `series` is a Tutorial whose sub-pages are its parts
 * (tutorials/series-model.js); nu-hax scripts/video-page.mjs makes them from
 * a YouTube playlist. On a series' own page it can be left out. Open or closed is remembered for the reader, and so is
 * the part they were on. Open, the block widens to 72rem where the page has
 * room (centred on the page's main area, never wider than it), and the
 * written tutorial goes under the video where it doesn't.
 *
 * The written tutorial is read into the block's shadow DOM, never its light
 * DOM, which HAX would save into the page. Its own copy of the video is left
 * out, its timestamps play the block's video, and its headings move down
 * two levels (the series' name is this block's h2, the part's title h3).
 * A part with nothing written yet still plays ("Video only").
 * @element oer-tutorial-series
 */
import { html, css, unsafeCSS, LitElement } from "../lit.js";
import { store, autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { registerBlocks } from "./register.js";
import { editorControl } from "../ui/editor-control.js";
import { formControls } from "../ui/form-controls.js";
import { seriesParts, isSeries, partVideo, duration } from "../tutorials/series-model.js";
import "./oer-embed-blocks.js";

const lucide = (name) => html`<span class="lucide" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;
const OPEN_KEY = "oer-tutorial-open";
const partKey = (id) => `oer-tutorial-part:${id}`;
const recall = (key) => {
  try {
    return globalThis.localStorage.getItem(key);
  } catch {
    return null;
  }
};
const remember = (key, value) => {
  try {
    globalThis.localStorage.setItem(key, value);
  } catch {}
};
const clock = (t) => {
  const s = Math.max(0, Math.floor(t));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
};
const rem = () => parseFloat(getComputedStyle(globalThis.document.documentElement).fontSize) || 16;

// the nearest ancestor in the flat tree (through slots and shadow roots)
function flatAncestor(el, test) {
  for (let n = el.assignedSlot || el.parentNode || el.host; n; n = n.assignedSlot || n.parentNode || n.host) {
    if (n.nodeType === 1 && test(n)) return n;
  }
  return null;
}

/**
 * A part's stored HTML, ready to read in the block: { fragment, video,
 * written }. video is the part's own first video (the block plays it).
 */
function readable(text) {
  const tpl = globalThis.document.createElement("template");
  tpl.innerHTML = text;
  const root = tpl.content;
  root.querySelectorAll("page-break").forEach((n) => n.remove());
  let video = "";
  const own = root.querySelector("oer-video[src], video-player[source]");
  if (own) {
    video = own.getAttribute("src") || own.getAttribute("source") || "";
    own.remove();
  }
  // timestamps play the block's video: buttons, not page-anchors (whose
  // own handler looks for its target in the page, not in here)
  root.querySelectorAll("page-anchor[value]").forEach((a) => {
    const t = parseInt(a.getAttribute("value"), 10) || 0;
    const label = a.textContent.trim() || clock(t);
    const b = globalThis.document.createElement("button");
    b.type = "button";
    b.className = "ts";
    b.dataset.t = String(t);
    b.setAttribute("aria-label", `Play from ${label}`);
    b.textContent = label;
    a.replaceWith(b);
  });
  // the folded transcript as details: a11y-collapse may not be loaded
  root.querySelectorAll("a11y-collapse").forEach((c) => {
    const details = globalThis.document.createElement("details");
    const summary = globalThis.document.createElement("summary");
    summary.textContent = (c.querySelector('[slot="heading"]')?.textContent || "More").trim();
    const body = c.querySelector('[slot="content"]');
    details.append(summary, ...(body ? [...body.childNodes] : [...c.childNodes].filter((n) => n.getAttribute?.("slot") !== "heading")));
    c.replaceWith(details);
  });
  // headings two levels down, under the block's h2 and the part's h3
  for (const h of [...root.querySelectorAll("h1, h2, h3, h4, h5, h6")]) {
    const level = Math.min(6, Number(h.tagName[1]) + 2);
    const next = globalThis.document.createElement(`h${level}`);
    next.append(...h.childNodes);
    h.replaceWith(next);
  }
  const rest = root.cloneNode(true);
  rest.querySelectorAll("details").forEach((d) => d.remove());
  const written = rest.textContent.trim().length > 0 || !!rest.querySelector("img, figure");
  return { fragment: root, video, written };
}

export class OerTutorialSeries extends LitElement {
  static get tag() {
    return "oer-tutorial-series";
  }

  // only `series` is saved into the page: HAX writes every declared
  // property, so the rest is undeclared and re-renders with requestUpdate
  static get properties() {
    return { series: { type: String, reflect: true } };
  }

  constructor() {
    super();
    this.__items = [];
    this.__current = 0;
    this.__open = recall(OPEN_KEY) === "1";
    this.__parts = new Map(); // part id → readable() result, or "loading" / "failed"
  }

  connectedCallback() {
    super.connectedCallback();
    this.__dispose = autorun(() => {
      const items = toJS(store.manifest?.items) || [];
      const active = store.activeId;
      const editing = !!store.editMode;
      const signedIn = !!store.isLoggedIn;
      Promise.resolve().then(() => {
        this.__items = items;
        if (!this.__page) this.__page = active;
        this.__editing = editing;
        this.__signedIn = signedIn;
        this._pickPart();
        this.requestUpdate();
      });
    });
    this.__onFull = () => {
      // full screen granted late, after the full-window view opened
      if (this.__full === "window" && globalThis.document.fullscreenElement === this) this._closeWindow();
      this.__full = globalThis.document.fullscreenElement === this ? "screen" : false;
      if (this.__full) this._loadCurrent();
      this.requestUpdate();
      this._measure();
    };
    globalThis.document.addEventListener("fullscreenchange", this.__onFull);
    this.__resize = new ResizeObserver(() => this._measure());
    this.__onWindow = () => this._measure();
    globalThis.addEventListener("resize", this.__onWindow);
    this.updateComplete.then(() => {
      const main = flatAncestor(this, (n) => n.tagName === "MAIN");
      if (main) this.__resize.observe(main);
      this.__resize.observe(this);
    });
  }

  disconnectedCallback() {
    if (this.__full === "window") this._closeWindow();
    this.__dispose?.();
    globalThis.document.removeEventListener("fullscreenchange", this.__onFull);
    globalThis.removeEventListener("resize", this.__onWindow);
    this.__resize?.disconnect();
    super.disconnectedCallback();
  }

  updated(changed) {
    if (changed.has("series")) this._pickPart();
    // the frame was drawn again (the site's data reloaded) while it filled
    // the window: put the new one there too
    const frame = this.renderRoot.querySelector(".frame");
    if (this.__full === "window" && frame && !frame.matches(":popover-open")) {
      frame.setAttribute("popover", "manual");
      frame.showPopover();
    }
    // the written tutorial, read into the shadow DOM (Lit leaves .content's children alone)
    const box = this.renderRoot.querySelector(".content");
    const part = this._part();
    const record = part && this.__parts.get(part.item.id);
    if (box && part && typeof record === "object" && box.dataset.part !== part.item.id) {
      box.replaceChildren(record.fragment.cloneNode(true));
      box.dataset.part = part.item.id;
      box.scrollTop = 0;
      box.closest(".read")?.scrollTo?.(0, 0);
    }
    this._fitReading();
  }

  // the reading column is as tall as the video and playlist beside it.
  // Set inside the shadow DOM: HAX saves the block's own attributes and
  // styles into the page
  _fitReading() {
    const watch = this.renderRoot.querySelector(".watch");
    const frame = this.renderRoot.querySelector(".frame");
    if (watch && frame) frame.style.setProperty("--watch-h", `${watch.offsetHeight}px`);
  }

  /* ---------- data ---------- */

  _visible(item) {
    return item && (this.__signedIn || item.metadata?.published !== false);
  }

  // the chosen series; with none chosen, on a series' own page, that series
  _seriesItem() {
    if (this.series) return this.__items.find((i) => i.id === this.series) || null;
    const page = this.__items.find((i) => i.id === this.__page);
    return isSeries(page, this.__items) ? page : null;
  }

  get _seriesId() {
    return this._seriesItem()?.id || "";
  }

  _list() {
    const series = this._seriesItem();
    return series ? seriesParts(series.id, this.__items).filter((p) => this._visible(p.item)) : [];
  }

  _part() {
    return this._list()[this.__current] || null;
  }

  // the part the reader was on, or the first
  _pickPart() {
    const list = this._list();
    const saved = this._seriesId ? recall(partKey(this._seriesId)) : null;
    const at = list.findIndex((p) => p.item.id === saved);
    this.__current = at >= 0 ? at : Math.min(this.__current, Math.max(0, list.length - 1));
    this._loadCurrent();
  }

  async _loadCurrent() {
    const part = this._part();
    if (!part || this.__parts.has(part.item.id)) return;
    this.__parts.set(part.item.id, "loading");
    this.requestUpdate();
    try {
      const res = await fetch(new URL(part.item.location, globalThis.document.baseURI), { cache: "no-cache" });
      if (!res.ok) throw new Error(String(res.status));
      this.__parts.set(part.item.id, readable(await res.text()));
    } catch {
      this.__parts.set(part.item.id, "failed");
    }
    this.requestUpdate();
  }

  _videoOf(part) {
    const record = part && this.__parts.get(part.item.id);
    return partVideo(part?.item)?.src || (typeof record === "object" ? record.video : "") || "";
  }

  /* ---------- actions ---------- */

  async _choose(index, play) {
    const list = this._list();
    if (!list[index]) return;
    this.__current = index;
    remember(partKey(this._seriesId), list[index].item.id);
    this._loadCurrent();
    this.requestUpdate();
    await this.updateComplete;
    const player = this._player();
    await player?.updateComplete;
    if (play) player?.seek(0);
    this.renderRoot.querySelector(`.playlist [aria-current="true"]`)?.scrollIntoView({ block: "nearest" });
  }

  _toggleTutorial() {
    this.__open = !this.__open;
    remember(OPEN_KEY, this.__open ? "1" : "0");
    if (this.__open) this._loadCurrent();
    this.requestUpdate();
    this.updateComplete.then(() => this._measure());
  }

  // the whole screen where the browser allows it (it doesn't in some
  // embeds, such as a page shown in Canvas without allowfullscreen); else the
  // whole window, as a popover in the top layer. Either way nothing moves,
  // so the video keeps playing
  async _toggleFull() {
    if (this.__full) return this._exitFull();
    // some browsers never answer a request they won't grant (the Claude
    // app's browser pane): give it a second
    const screen = await Promise.race([
      this.requestFullscreen().then(
        () => true,
        () => false,
      ),
      new Promise((r) => setTimeout(() => r(false), 1000)),
    ]);
    if (!screen && globalThis.document.fullscreenElement !== this) this._enterWindow();
  }

  async _enterWindow() {
    const frame = this.renderRoot.querySelector(".frame");
    if (!this.isConnected || !frame?.isConnected || !frame.showPopover) return;
    frame.setAttribute("popover", "manual");
    frame.showPopover();
    this.__full = "window";
    this.__onKeys = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        this._exitFull();
      } else if (e.key === "Tab") this._trapTab(e);
    };
    globalThis.addEventListener("keydown", this.__onKeys, true);
    this._loadCurrent();
    this.requestUpdate();
    await this.updateComplete;
    this.renderRoot.querySelector(".tools .btn:last-child")?.focus();
  }

  _closeWindow() {
    const frame = this.renderRoot.querySelector(".frame");
    if (frame?.matches(":popover-open")) frame.hidePopover();
    frame?.removeAttribute("popover");
    globalThis.removeEventListener("keydown", this.__onKeys, true);
    this.__full = false;
  }

  async _exitFull() {
    if (globalThis.document.fullscreenElement === this) return globalThis.document.exitFullscreen();
    if (this.__full !== "window") return;
    this._closeWindow();
    this.requestUpdate();
    await this.updateComplete;
    this._measure();
    this.renderRoot.querySelector(".tools .btn:last-child")?.focus();
  }

  // keep Tab inside the full-window view (the page under it isn't inert)
  _trapTab(e) {
    const focusable = [...this.renderRoot.querySelectorAll(".frame button, .frame a[href], .frame [tabindex]:not([tabindex='-1']), .frame summary, .frame iframe")].filter((el) => el.offsetParent !== null);
    const video = this._player()?.shadowRoot?.querySelector("iframe");
    if (video) focusable.splice(1, 0, video);
    if (!focusable.length) return;
    const active = this.renderRoot.activeElement || (this._player()?.shadowRoot?.activeElement && video);
    const at = focusable.indexOf(active);
    if (e.shiftKey && at <= 0) {
      e.preventDefault();
      focusable.at(-1).focus();
    } else if (!e.shiftKey && (at === focusable.length - 1 || at < 0)) {
      e.preventDefault();
      focusable[0].focus();
    }
  }

  _player() {
    return this.renderRoot.querySelector("oer-video");
  }

  _onContentClick(e) {
    const b = e.target.closest?.("button.ts");
    if (!b) return;
    this._player()?.seek(Number(b.dataset.t) || 0);
  }

  // open beside the video: widen to 72rem, centred on the page's main area
  // (inside its padding); too narrow for two columns, stack instead
  _measure() {
    const open = this.__open && !this.__full;
    const main = flatAncestor(this, (n) => n.tagName === "MAIN");
    const column = flatAncestor(this, (n) => getComputedStyle(n).display !== "contents");
    let wide = false;
    let stack = false;
    if (open && main && column) {
      const m = main.getBoundingClientRect();
      const ms = getComputedStyle(main);
      const left = m.left + parseFloat(ms.paddingLeft);
      const avail = m.width - parseFloat(ms.paddingLeft) - parseFloat(ms.paddingRight);
      // the column the block sits in (not the block, which may be widened)
      const c = column.getBoundingClientRect();
      const cs = getComputedStyle(column);
      const colLeft = c.left + parseFloat(cs.paddingLeft);
      if (avail >= 56 * rem()) {
        const width = Math.min(72 * rem(), avail);
        this.__wideBox = `width:${Math.round(width)}px;margin-left:${Math.round(left + (avail - width) / 2 - colLeft)}px`;
        wide = true;
      } else stack = true;
    } else if (open) stack = true;
    const before = `${this.__wide}|${this.__stack}`;
    this.__wide = wide ? this.__wideBox : null;
    this.__stack = stack;
    if (`${this.__wide}|${this.__stack}` !== before) this.requestUpdate();
    this._fitReading();
  }

  /* ---------- view ---------- */

  _renderEmpty() {
    if (!this.__editing) {
      return this.__signedIn
        ? html`<p class="empty">No tutorial series chosen. Edit content to choose one.</p>`
        : html``;
    }
    const all = this.__items.filter((i) => isSeries(i, this.__items));
    return html`<div class="empty pick">
      <label for="pick">Tutorial series</label>
      <select id="pick" ${editorControl()} @change="${(e) => (this.series = e.target.value)}">
        <option value="">Choose a tutorial series…</option>
        ${all.map((s) => html`<option value="${s.id}" ?selected="${s.id === this.series}">${s.title} (${seriesParts(s.id, this.__items).length} parts)</option>`)}
      </select>
      <p class="hint">${all.length ? "Its videos play here as a playlist, with each part's written tutorial a click away." : "There are no tutorial series yet: a Tutorial with parts as its sub-pages."}</p>
    </div>`;
  }

  render() {
    const series = this._seriesItem();
    const list = this._list();
    if (!series || !list.length) return this._renderEmpty();
    const part = this._part();
    const record = this.__parts.get(part.item.id);
    const video = this._videoOf(part);
    const total = list.reduce((s, p) => s + (partVideo(p.item)?.duration || 0), 0);
    const reading = this.__full || this.__open;
    const layout = this.__full ? "two" : this.__open ? (this.__stack ? "stack" : "two") : "one";
    const n = this.__current;
    return html`<section class="frame ${this.__full ? "full" : ""}" style="${this.__wide && !this.__full ? this.__wide : ""}" aria-labelledby="series-h">
      <div class="bar">
        <div class="name">
          <h2 id="series-h"><a href="${series.slug}">${series.title}</a></h2>
          <span class="meta">${this.__full ? `Part ${part.part} of ${list.length}` : `Tutorial series · ${list.length} ${list.length === 1 ? "part" : "parts"}${total ? ` · ${duration(total)}` : ""}`}</span>
        </div>
        <div class="tools">
          ${this.__full
            ? html`${n > 0
                ? html`<button class="btn" ${editorControl()} aria-label="Previous: part ${n}" @click="${() => this._choose(n - 1, true)}">${lucide("oer:chevron-left")}<span>Part ${n}</span></button>`
                : ""}
              ${n < list.length - 1
                ? html`<button class="btn" ${editorControl()} aria-label="Next: part ${n + 2}" @click="${() => this._choose(n + 1, true)}"><span>Part ${n + 2}</span>${lucide("oer:chevron-right")}</button>`
                : ""}`
            : html`<button class="btn" ${editorControl()} aria-label="Tutorial" aria-pressed="${this.__open ? "true" : "false"}" aria-controls="read" @click="${this._toggleTutorial}">${lucide("oer:book-open")}<span>Tutorial</span></button>`}
          <button class="btn" ${editorControl()} aria-label="${this.__full ? "Exit full screen" : "Full screen"}" @click="${this._toggleFull}">${lucide(this.__full ? "oer:minimize" : "oer:maximize")}<span>${this.__full ? "Exit full screen" : "Full screen"}</span></button>
        </div>
      </div>
      <div class="cols ${layout}">
        <div class="watch">
          <div class="player">
            ${video
              ? html`<oer-video .src="${video}" title="${part.item.title}"></oer-video>`
              : html`<div class="novideo">${typeof record === "object" || record === "failed" ? "This part has no video." : ""}</div>`}
          </div>
          <ol class="playlist" aria-label="Parts of ${series.title}">
            ${list.map((p, i) => {
              const v = partVideo(p.item);
              return html`<li>
                <button ${editorControl()} aria-current="${i === n ? "true" : "false"}" @click="${() => this._choose(i, true)}">
                  <span class="num">${i === n ? lucide("oer:play") : p.part}</span>
                  <span class="t">${p.item.title}</span>
                  ${p.item.metadata?.published === false ? html`<span class="chip">Draft</span>` : ""}
                  ${p.item.metadata?.oerVideoSource?.written === false ? html`<span class="chip">Video only</span>` : ""}
                  <span class="dur">${v?.duration ? duration(v.duration) : ""}</span>
                </button>
              </li>`;
            })}
          </ol>
        </div>
        ${reading
          ? html`<section class="read" id="read" aria-labelledby="part-h">
              <h3 id="part-h">Part ${part.part}: ${part.item.title}</h3>
              ${record === "loading" || record === undefined ? html`<p class="muted">Loading the written tutorial…</p>` : ""}
              ${record === "failed" ? html`<p class="muted">The written tutorial couldn't be loaded. <a href="${part.item.slug}">Open its page</a> instead.</p>` : ""}
              ${typeof record === "object" && !record.written
                ? html`<p class="muted">Part ${part.part} doesn't have a written tutorial yet: watch the video.</p>`
                : ""}
              <div class="content" @click="${this._onContentClick}"></div>
              <p class="open"><a href="${part.item.slug}">Open the tutorial page${lucide("oer:arrow-up-right")}</a></p>
            </section>`
          : ""}
      </div>
    </section>`;
  }

  static get styles() {
    return [
      formControls,
      css`
        :host {
          display: block;
          font-family: var(--font-sans);
          color: var(--foreground);
        }
        :host(:fullscreen) {
          width: 100vw;
          height: 100vh;
          margin: 0;
          background: var(--background);
          overflow: hidden;
        }
        .lucide {
          display: inline-block;
          flex: none;
          width: 1rem;
          height: 1rem;
          background: currentColor;
          mask: var(--src) center / contain no-repeat;
        }
        .frame,
        .empty {
          margin: 2rem 0;
        }
        .frame {
          box-sizing: border-box;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--card, var(--background));
          overflow: hidden;
        }
        .frame.full {
          display: flex;
          flex-direction: column;
          height: 100%;
          margin: 0;
          border: 0;
          border-radius: 0;
          background: var(--background);
          color: var(--foreground);
        }
        .frame.full:popover-open {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100dvh;
          max-width: none;
          max-height: none;
          padding: 0;
        }
        .bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem 1rem;
          padding: 0.625rem 0.75rem 0.625rem 1rem;
          border-bottom: 1px solid var(--border);
        }
        .name {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0.25rem 0.625rem;
          min-width: 0;
        }
        h2 {
          margin: 0;
          font-size: 0.9375rem;
          font-weight: 600;
          line-height: 1.4;
          letter-spacing: normal;
        }
        h2 a {
          color: inherit;
          text-decoration: none;
        }
        h2 a:hover {
          text-decoration: underline;
        }
        .meta {
          font-size: 0.8125rem;
          color: var(--muted-foreground);
        }
        .tools {
          display: flex;
          gap: 0.375rem;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          height: 2rem;
          padding: 0 0.625rem;
          border: 1px solid var(--input-border, var(--border));
          border-radius: var(--radius-md);
          background: var(--background);
          color: var(--foreground);
          font: 500 0.8125rem / 1 var(--font-sans);
          cursor: pointer;
        }
        .btn:hover {
          background: var(--accent);
        }
        .btn[aria-pressed="true"] {
          background: var(--primary);
          border-color: var(--primary);
          color: var(--primary-foreground);
        }
        button:focus-visible,
        a:focus-visible,
        .read:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
        }
        .cols.two {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
          align-items: start;
        }
        .full .cols {
          flex: 1;
          min-height: 0;
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(22rem, 1fr);
          align-items: stretch;
        }
        .watch {
          padding: 0.75rem;
        }
        .cols.two .watch {
          border-right: 1px solid var(--border);
        }
        .full .watch,
        .full .read {
          overscroll-behavior: contain;
        }
        .full .watch {
          overflow: auto;
        }
        .player {
          position: relative;
        }
        oer-video {
          margin: 0;
        }
        /* editing: a click on the video selects the block */
        :host([data-hax-ray]) .player::after {
          content: "";
          position: absolute;
          inset: 0;
        }
        .novideo {
          display: grid;
          place-items: center;
          aspect-ratio: 16 / 9;
          border-radius: var(--radius-lg);
          background: var(--muted);
          color: var(--muted-foreground);
          font-size: 0.875rem;
        }
        .playlist {
          list-style: none;
          margin: 0.625rem 0 0;
          padding: 0;
          max-height: 18rem;
          overflow: auto;
        }
        .full .playlist {
          max-height: none;
        }
        .playlist button {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          width: 100%;
          padding: 0.4375rem 0.5rem;
          border: 0;
          border-radius: var(--radius-md);
          background: transparent;
          color: var(--foreground);
          font: 400 0.875rem / 1.35 var(--font-sans);
          text-align: start;
          cursor: pointer;
        }
        .playlist button:hover {
          background: var(--accent);
        }
        .playlist button[aria-current="true"] {
          background: var(--accent);
          font-weight: 500;
        }
        .num {
          display: inline-grid;
          place-items: center;
          flex: none;
          width: 1.25rem;
          font-size: 0.8125rem;
          color: var(--muted-foreground);
          font-variant-numeric: tabular-nums;
        }
        [aria-current="true"] .num {
          color: var(--primary);
        }
        .t {
          flex: 1;
          min-width: 0;
        }
        .dur {
          flex: none;
          font-size: 0.8125rem;
          color: var(--muted-foreground);
          font-variant-numeric: tabular-nums;
        }
        .chip {
          flex: none;
          padding: 0 0.375rem;
          border-radius: 999px;
          background: var(--muted);
          color: var(--muted-foreground);
          font-size: 0.6875rem;
          font-weight: 500;
          line-height: 1.25rem;
        }
        .read {
          padding: 0.75rem 1rem 1rem;
          font-size: 0.9375rem;
          line-height: 1.6;
        }
        .cols.two .read {
          max-height: var(--watch-h, 32rem);
          overflow: auto;
        }
        .cols.stack .read {
          border-top: 1px solid var(--border);
        }
        .full .read {
          max-height: none;
          overflow: auto;
          padding: 1.25rem 1.5rem 2rem;
          font-size: 1rem;
        }
        .read h3 {
          margin: 0 0 0.75rem;
          font-size: 1.0625rem;
          font-weight: 600;
          line-height: 1.35;
          letter-spacing: normal;
        }
        .muted {
          color: var(--muted-foreground);
          font-size: 0.875rem;
        }
        .content :is(h4, h5, h6) {
          margin: 1.25rem 0 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.35;
        }
        .content p {
          margin: 0 0 0.75rem;
        }
        .content :is(ol, ul) {
          margin: 0 0 0.75rem;
          padding-inline-start: 1.375rem;
        }
        .content li {
          margin: 0 0 0.5rem;
        }
        .content a,
        .open a {
          color: var(--link, var(--primary));
        }
        .content figure {
          margin: 0.75rem 0 1rem;
        }
        .content img {
          display: block;
          max-width: 100%;
          height: auto;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }
        .content figcaption {
          margin-top: 0.375rem;
          font-size: 0.8125rem;
          color: var(--muted-foreground);
        }
        .content figcaption p {
          margin: 0;
        }
        .content kbd,
        .content code {
          padding: 0.0625rem 0.3125rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          background: var(--muted);
          font-family: var(--font-mono);
          font-size: 0.8125em;
        }
        .content oer-callout {
          margin: 0.75rem 0;
        }
        .content details {
          margin: 1rem 0 0;
          border-top: 1px solid var(--border);
          padding-top: 0.5rem;
        }
        .content summary {
          cursor: pointer;
          font-weight: 500;
        }
        .ts {
          display: inline-flex;
          align-items: center;
          gap: 0.25em;
          margin: 0 0.125rem;
          padding: 0 0.375em;
          border: 0;
          border-radius: var(--radius-sm);
          background: var(--muted);
          color: var(--foreground);
          font: 500 0.875em / 1.5 var(--font-sans);
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
          cursor: pointer;
        }
        .ts::before {
          content: "";
          width: 0.75em;
          height: 0.75em;
          background: currentColor;
          mask: ${unsafeCSS(`url("${LUCIDE_ICONS["oer:play"]}")`)} center / contain no-repeat;
        }
        .ts:hover {
          background: var(--accent);
        }
        .open {
          margin: 1rem 0 0;
          font-size: 0.875rem;
        }
        .open a {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }
        .empty {
          padding: 1rem 1.25rem;
          border: 1px dashed var(--input-border, var(--border));
          border-radius: var(--radius-lg);
          color: var(--muted-foreground);
          font-size: 0.875rem;
        }
        .pick {
          display: grid;
          gap: 0.375rem;
          color: var(--foreground);
        }
        .pick label {
          font-weight: 500;
        }
        .pick .hint {
          margin: 0;
          color: var(--muted-foreground);
          font-size: 0.8125rem;
        }
        /* full view on a narrow screen: the tutorial under the video */
        @media (max-width: 56rem) {
          .full .cols {
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: auto minmax(0, 1fr);
          }
          .full .cols.two .watch {
            border-right: 0;
            border-bottom: 1px solid var(--border);
          }
          .full .playlist {
            max-height: 7.5rem;
          }
        }
        @media (max-width: 40rem) {
          .tools .btn > span:not(.lucide) {
            display: none;
          }
          .tools .btn {
            width: 2rem;
            justify-content: center;
            padding: 0;
          }
        }
      `,
    ];
  }

  static get haxProperties() {
    return {
      canScale: false,
      canEditSource: true,
      gizmo: {
        title: "Tutorial series",
        description: "A tutorial series' videos as a playlist, with each part's written tutorial beside the video and a full-screen view.",
        icon: "hax:video",
        color: "blue",
        tags: ["Media", "video", "tutorial", "playlist", "series"],
        meta: { author: "Michael Collins" },
      },
      settings: { configure: [], advanced: [] },
      demoSchema: [{ tag: "oer-tutorial-series", properties: {}, content: "" }],
    };
  }
}

if (!customElements.get(OerTutorialSeries.tag)) customElements.define(OerTutorialSeries.tag, OerTutorialSeries);
registerBlocks(OerTutorialSeries);
