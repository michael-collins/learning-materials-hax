/**
 * `oer-outline-viewer` — look through a pathway, unit, lesson or project
 * without leaving the page (after the Decap site's
 * SpecializationViewerModal): its outline on the left (units → lessons →
 * materials, stages → steps, a book lesson's sections → readings), the
 * selected page on the right, read in place.
 *
 *   outlineViewer().show(pageId, { item })   // item: the entry to open at
 *
 * The address keeps what's open (?view=<page>&item=<entry>), so a view can
 * be linked; the theme opens it on load (openViewerFromUrl).
 *
 * A native modal dialog: focus stays inside, Esc closes and focus goes back
 * where it was. The page reads in the light DOM (div.oer-reading, slotted),
 * so the theme's content styles and HAX's elements work as on the page.
 * @element oer-outline-viewer
 */
import { html, css, LitElement } from "../lit.js";
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { contentTypes } from "../types/content-types.js";
import { resolvePathway, PATHWAY_TYPE } from "../pathways/pathway-model.js";
import { projectParts, PROJECT_TYPE } from "../projects/project-model.js";
import { versionsOf } from "../versions/versioning.js";
import { formControls } from "./form-controls.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

const allItems = () => toJS(store.manifest?.items) || [];
const visible = (i) => i && !i.metadata?.oerSnapshotOf && (store.isLoggedIn || i.metadata?.published !== false);

export const UNIT_TYPE = "oer:unit";
export const LESSON_TYPE = "oer:lesson";
const SECTION_TYPE = "oer:section";
const HEADING_TYPE = "oer:heading";

/** Pages the viewer can open: pathways, units, lessons and projects with something inside. */
export const VIEWABLE_TYPES = [PATHWAY_TYPE, UNIT_TYPE, LESSON_TYPE, PROJECT_TYPE];

const sourceOf = (item, list) => (item?.metadata?.oerRef?.page && list.find((i) => i.id === item.metadata.oerRef.page)) || item;
const kidsOf = (id, list) =>
  list
    .filter((i) => i.parent === id && visible(i) && (!i.metadata?.hideInMenu || i.metadata?.pageType === HEADING_TYPE))
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

/**
 * The page whose outline the viewer shows for `item`: a book's linked
 * chapter keeps its own sections and readings, so it's used when it has
 * sub-pages; otherwise the original.
 */
export function viewerRoot(item, list = allItems()) {
  if (!item) return null;
  const src = sourceOf(item, list);
  return src !== item && kidsOf(item.id, list).length ? item : src;
}

export function canView(item, list = allItems()) {
  const root = viewerRoot(item, list);
  if (!VIEWABLE_TYPES.includes(sourceOf(root, list)?.metadata?.pageType)) return false;
  return !!viewerOutline(root.id, list)?.sections.some((s) => s.entries.length || s.id);
}

/**
 * The outline as the viewer shows it:
 * { root, sections: [{ title, id?, entries: [{ id, title, typeLabel, icon,
 *   step, children: [{ id, title, typeLabel, icon, step }] }] }] }
 * Every id is a page that can be opened (a linked chapter reads its source).
 */
export function viewerOutline(rootId, list = allItems()) {
  const types = contentTypes(list).types;
  const root = list.find((i) => i.id === rootId);
  if (!root) return null;
  const typeOf = (i) => types.find((t) => t.id === i?.metadata?.pageType);
  const leaf = (i, extra = {}) => {
    const t = typeOf(sourceOf(i, list));
    return { id: i.id, title: i.title, typeLabel: t?.label || "", icon: t?.icon || "", step: 0, ...extra };
  };
  // what an entry opens to: a lesson's materials and quiz, a project's steps
  const childrenOf = (i) => {
    const src = sourceOf(i, list);
    const type = src?.metadata?.pageType;
    if (type === LESSON_TYPE) {
      return (src.metadata?.oerFields?.components || [])
        .map((c) => list.find((x) => x.id === c?.page))
        .filter(visible)
        .map((c) => leaf(c));
    }
    if (type === PROJECT_TYPE) {
      return projectParts(src.id, list)
        .filter((p) => visible(p.item))
        .map((p) => leaf(p.item, { step: p.step, typeLabel: [typeOf(p.item)?.label, p.stage].filter(Boolean).join(" · ") }));
    }
    return [];
  };
  const entry = (i, extra = {}) => ({ ...leaf(i, extra), children: childrenOf(i) });

  // a pathway: its units (modules), their lessons numbered
  if (root.metadata?.pageType === PATHWAY_TYPE) {
    const p = resolvePathway(root, list, types);
    return {
      root,
      sections: p.modules.map((m) => ({
        title: m.title,
        id: m.href ? m.id : "",
        entries: m.items
          .filter((i) => !i.planned && !i.missing)
          .map((i, n) => {
            const page = list.find((x) => x.id === i.id);
            return { ...entry(page, { step: n + 1 }), typeLabel: i.typeLabel, title: i.title };
          }),
      })),
    };
  }
  // a project: its steps by stage
  if (root.metadata?.pageType === PROJECT_TYPE) {
    const sections = [];
    for (const p of projectParts(root.id, list).filter((x) => visible(x.item))) {
      if (!sections.length || sections.at(-1).title !== p.stage) sections.push({ title: p.stage, id: "", entries: [] });
      sections.at(-1).entries.push({ ...leaf(p.item, { step: p.step }), children: [] });
    }
    return { root, sections };
  }
  // a unit, a book's lesson…: its sub-pages, with headings and sections as groups
  const kids = kidsOf(root.id, list);
  if (kids.length) {
    const sections = [{ title: "", id: "", entries: [] }];
    for (const k of kids) {
      const type = k.metadata?.pageType;
      const sub = kidsOf(k.id, list);
      if (type === HEADING_TYPE) sections.push({ title: k.title, id: "", entries: [] });
      else if ((type === SECTION_TYPE || !type) && sub.length && !k.metadata?.oerRef?.page) {
        sections.push({ title: k.title, id: "", entries: sub.filter((x) => x.metadata?.pageType !== HEADING_TYPE).map((x) => entry(x)) });
        sections.push({ title: "", id: "", entries: [] });
      } else sections.at(-1).entries.push(entry(k));
    }
    return { root, sections: sections.filter((x) => x.entries.length) };
  }
  // a lesson: its materials and quiz
  return { root, sections: [{ title: "", id: "", entries: childrenOf(root).map((c) => ({ ...c, children: [] })) }] };
}

class OerOutlineViewer extends LitElement {
  static get tag() {
    return "oer-outline-viewer";
  }

  static get properties() {
    return {
      _outline: { state: true },
      _current: { state: true },
      _open: { state: true },
      _version: { state: true },
      _loading: { state: true },
      _error: { state: true },
      _showContents: { state: true },
    };
  }

  constructor() {
    super();
    this._outline = null;
    this._current = "";
    this._open = new Set();
    this._version = "";
    this._loading = false;
    this._error = "";
    this._showContents = false;
    this.__load = 0;
  }

  static get styles() {
    return [formControls, css`
      :host {
        display: contents;
        font-family: var(--font-sans, system-ui, sans-serif);
        color: var(--foreground);
      }
      dialog {
        box-sizing: border-box;
        width: min(80rem, calc(100vw - 2rem));
        height: calc(100dvh - 2rem);
        max-width: none;
        max-height: none;
        padding: 0;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg, 0.75rem);
        background: var(--background);
        color: var(--foreground);
        box-shadow: 0 24px 64px rgb(0 0 0 / 0.28);
        overflow: hidden;
      }
      dialog::backdrop {
        background: rgb(0 0 0 / 0.6);
      }
      .frame {
        display: grid;
        grid-template-columns: minmax(16rem, 22rem) 1fr;
        height: 100%;
      }
      aside {
        display: flex;
        flex-direction: column;
        min-height: 0;
        border-right: 1px solid var(--border);
        background: var(--muted-bg, color-mix(in srgb, var(--muted) 45%, var(--background)));
      }
      .head {
        padding: 1.25rem 1.25rem 1rem;
        border-bottom: 1px solid var(--border);
      }
      .type {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--muted-foreground);
      }
      .type simple-icon-lite {
        --simple-icon-width: 0.875rem;
        --simple-icon-height: 0.875rem;
      }
      h2 {
        margin: 0.25rem 0 0;
        font-size: 1.25rem;
        line-height: 1.3;
        letter-spacing: -0.01em;
      }
      .desc {
        margin: 0.5rem 0 0;
        font-size: 0.8125rem;
        line-height: 1.5;
        color: var(--muted-foreground);
      }
      nav {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        padding: 0.75rem;
      }
      nav h3 {
        margin: 1rem 0.5rem 0.25rem;
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--muted-foreground);
      }
      nav ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      nav ul ul {
        margin: 0.125rem 0 0.25rem 1.75rem;
        padding-left: 0.5rem;
        border-left: 1px solid var(--border);
      }
      .row {
        display: flex;
        align-items: flex-start;
        gap: 0.125rem;
      }
      .entry {
        flex: 1;
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        min-width: 0;
        padding: 0.4375rem 0.5rem;
        border: 0;
        border-radius: var(--radius-md, 0.5rem);
        background: transparent;
        color: inherit;
        font: inherit;
        font-size: 0.875rem;
        line-height: 1.4;
        text-align: start;
        cursor: pointer;
      }
      .entry:hover {
        background: var(--accent, var(--muted));
      }
      .entry[aria-current="true"] {
        background: var(--accent, var(--muted));
        font-weight: 600;
      }
      .entry .label {
        flex: 1;
        min-width: 0;
      }
      .entry small {
        display: block;
        font-weight: 400;
        font-size: 0.75rem;
        color: var(--muted-foreground);
      }
      .num {
        flex: none;
        display: inline-grid;
        place-items: center;
        min-width: 1.375rem;
        height: 1.375rem;
        border: 1px solid var(--border);
        border-radius: 999px;
        background: var(--background);
        font-size: 0.75rem;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }
      .entry simple-icon-lite,
      .entry .noicon {
        flex: none;
        width: 1.375rem;
        height: 1.375rem;
        --simple-icon-width: 0.875rem;
        --simple-icon-height: 0.875rem;
        color: var(--muted-foreground);
      }
      .toggle,
      .icon-btn {
        flex: none;
        display: inline-grid;
        place-items: center;
        width: 2rem;
        height: 2rem;
        border: 0;
        border-radius: var(--radius-md, 0.5rem);
        background: transparent;
        color: var(--muted-foreground);
        cursor: pointer;
      }
      .toggle:hover,
      .icon-btn:hover {
        background: var(--accent, var(--muted));
        color: var(--foreground);
      }
      .toggle[aria-expanded="true"] .lucide {
        transform: rotate(90deg);
      }
      main {
        display: flex;
        flex-direction: column;
        min-width: 0;
        min-height: 0;
      }
      .bar {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        min-height: 3.25rem;
        padding: 0.5rem 0.75rem 0.5rem 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      .crumbs {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
        margin: 0;
        padding: 0;
        list-style: none;
        font-size: 0.8125rem;
        color: var(--muted-foreground);
      }
      .crumbs li + li::before {
        content: "›";
        margin-right: 0.25rem;
      }
      .crumbs li:last-child {
        color: var(--foreground);
        font-weight: 500;
      }
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        height: 2rem;
        padding: 0 0.75rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md, 0.5rem);
        background: var(--background);
        color: inherit;
        font: inherit;
        font-size: 0.8125rem;
        font-weight: 500;
        text-decoration: none;
        white-space: nowrap;
        cursor: pointer;
      }
      .btn:hover {
        background: var(--accent, var(--muted));
      }
      select.btn {
        padding-right: 0.5rem;
      }
      .btn.contents-btn {
        display: none;
      }
      .scroll {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
      }
      .page {
        max-width: 46rem;
        margin: 0 auto;
        padding: 1.5rem 1.5rem 2rem;
      }
      /* long words and links wrap rather than scroll sideways */
      ::slotted(.oer-reading) {
        overflow-wrap: anywhere;
      }
      .page-type {
        margin-bottom: 0.25rem;
      }
      .page h2 {
        margin: 0 0 0.5rem;
        font-size: 1.75rem;
        letter-spacing: -0.02em;
      }
      .status {
        padding: 2rem 0;
        color: var(--muted-foreground);
      }
      .pager {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid var(--border);
      }
      .pager a,
      .pager button {
        display: inline-flex;
        flex-direction: column;
        gap: 0.125rem;
        max-width: 48%;
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md, 0.5rem);
        background: var(--background);
        color: inherit;
        font: inherit;
        font-size: 0.875rem;
        text-align: start;
        cursor: pointer;
      }
      .pager button:hover {
        background: var(--accent, var(--muted));
      }
      .pager .next {
        margin-left: auto;
        text-align: end;
        align-items: flex-end;
      }
      .pager small {
        font-size: 0.75rem;
        color: var(--muted-foreground);
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
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
      /* narrow screens: the outline is a "Contents" panel above the page */
      @media (max-width: 767px) {
        dialog {
          width: 100vw;
          height: 100dvh;
          border: 0;
          border-radius: 0;
        }
        .frame {
          position: relative;
          grid-template-columns: 1fr;
        }
        /* the outline opens below the toolbar, over the page */
        aside {
          display: none;
          position: absolute;
          inset: 3.25rem 0 0;
          z-index: 2;
          border-right: 0;
          background: var(--background);
        }
        aside.shown {
          display: flex;
        }
        .btn.contents-btn {
          display: inline-flex;
        }
        .crumbs {
          display: none;
        }
        .bar {
          padding-left: 0.75rem;
        }
        .page {
          padding: 1rem;
        }
      }
    `];
  }

  /** Open the viewer on a page (a pathway or project), at `item` if given. */
  show(rootId, { item = "", version = "" } = {}) {
    const list = allItems();
    const id = viewerRoot(list.find((i) => i.id === rootId), list)?.id || rootId;
    this._outline = viewerOutline(id, list);
    if (!this._outline) return;
    // the element that had focus, inside any shadow roots, to return to
    let active = globalThis.document.activeElement;
    while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement;
    this._returnFocus = active;
    this._showContents = false;
    const entries = this._flat();
    const start = entries.some((e) => e.id === item) ? item : id;
    this._open = new Set(this._outline.sections.flatMap((s) => s.entries).filter((e) => e.children.some((c) => c.id === start) || e.id === start).map((e) => e.id));
    this.updateComplete.then(() => {
      const dialog = this.shadowRoot.querySelector("dialog");
      if (!dialog.open) dialog.showModal();
      this._select(start, { version, focus: false });
      this.shadowRoot.querySelector(".head h2")?.focus();
    });
  }

  close() {
    this.shadowRoot?.querySelector("dialog")?.close();
  }

  _onClose() {
    this._outline = null;
    this._reading.replaceChildren();
    const url = new URL(globalThis.location.href);
    url.searchParams.delete("view");
    url.searchParams.delete("item");
    url.searchParams.delete("version");
    globalThis.history.replaceState(globalThis.history.state, "", url);
    this._returnFocus?.focus?.();
  }

  // the reading pane: light DOM, so the theme's content styles reach it
  get _reading() {
    let div = this.querySelector(":scope > .oer-reading");
    if (!div) {
      div = globalThis.document.createElement("div");
      div.className = "oer-reading";
      div.slot = "page";
      // links to other pages leave the viewer; in-page links stay
      div.addEventListener("click", (e) => {
        const a = e.composedPath().find((n) => n.localName === "a" && n.href);
        if (!a) return;
        const url = new URL(a.href, globalThis.document.baseURI);
        if (url.origin === globalThis.location.origin && !(url.hash && url.pathname === globalThis.location.pathname)) this.close();
      });
      this.append(div);
    }
    return div;
  }

  // every page in the viewer, in reading order: the root, then each
  // section's page, entries and their materials
  _flat() {
    const o = this._outline;
    if (!o) return [];
    const out = [{ id: o.root.id, title: "Overview", section: "" }];
    for (const s of o.sections) {
      if (s.id) out.push({ id: s.id, title: s.title, section: s.title });
      for (const e of s.entries) {
        out.push({ id: e.id, title: e.title, section: s.title, entry: e });
        for (const c of e.children) out.push({ id: c.id, title: c.title, section: s.title, entry: e, child: c });
      }
    }
    return out;
  }

  async _select(id, { version = "", focus = true } = {}) {
    const list = allItems();
    const page = list.find((i) => i.id === id);
    if (!page) return;
    this._current = id;
    this._version = version;
    const flat = this._flat().find((f) => f.id === id);
    if (flat?.entry && flat.entry.children.length) this._open = new Set([...this._open, flat.entry.id]);
    this._showContents = false;
    const url = new URL(globalThis.location.href);
    url.searchParams.set("view", this._outline.root.id);
    if (id === this._outline.root.id) url.searchParams.delete("item");
    else url.searchParams.set("item", id);
    if (version) url.searchParams.set("version", version);
    else url.searchParams.delete("version");
    globalThis.history.replaceState(globalThis.history.state, "", url);
    await this._loadPage(page, version);
    this.shadowRoot.querySelector(".scroll")?.scrollTo(0, 0);
    if (focus) this.shadowRoot.querySelector(".page h2")?.focus();
  }

  // the page to read: a linked chapter reads its source; a version its archived copy
  _source(page, list = allItems()) {
    const src = page.metadata?.oerRef?.page ? list.find((i) => i.id === page.metadata.oerRef.page) || page : page;
    const release = this._version ? versionsOf(src.metadata?.oerSnapshotOf || src.id, list).find((v) => v.version === this._version) : null;
    return release?.snapshot || src;
  }

  async _loadPage(page, version) {
    const load = ++this.__load;
    const src = this._source(page);
    this._loading = true;
    this._error = "";
    const div = this._reading;
    div.replaceChildren();
    try {
      const res = await fetch(new URL(src.location, globalThis.document.baseURI), { cache: "no-cache" });
      if (!res.ok) throw new Error(String(res.status));
      const text = await res.text();
      if (load !== this.__load) return;
      const tpl = globalThis.document.createElement("template");
      tpl.innerHTML = text;
      // HAX's page metadata marker isn't content
      tpl.content.querySelectorAll("page-break").forEach((n) => n.remove());
      // blocks that show "this page" (a pathway's outline…) read it from here
      div.dataset.oerPage = src.id;
      div.replaceChildren(tpl.content);
      // HAX loads the definitions of elements it hasn't seen yet
      globalThis.WCAutoload?.process?.();
    } catch {
      if (load === this.__load) this._error = "This page couldn't be loaded.";
    }
    if (load === this.__load) this._loading = false;
    void version;
  }

  _toggle(id) {
    const open = new Set(this._open);
    if (open.has(id)) open.delete(id);
    else open.add(id);
    this._open = open;
  }

  _renderEntry(e) {
    const current = this._current === e.id;
    const open = this._open.has(e.id);
    return html`<li>
      <div class="row">
        <button class="entry" aria-current="${current ? "true" : "false"}" @click="${() => this._select(e.id)}">
          ${e.step
            ? html`<span class="num" aria-hidden="true">${e.step}</span>`
            : e.icon
              ? html`<simple-icon-lite icon="${e.icon}"></simple-icon-lite>`
              : html`<span class="noicon"></span>`}
          <span class="label">${e.step ? html`<span class="sr">${e.step}. </span>` : ""}${e.title}${e.typeLabel ? html`<small>${e.typeLabel}</small>` : ""}</span>
        </button>
        ${e.children.length
          ? html`<button class="toggle" aria-expanded="${open ? "true" : "false"}" aria-label="${open ? "Hide" : "Show"} what's in ${e.title}" @click="${() => this._toggle(e.id)}">
              ${lucide("oer:chevron-right")}
            </button>`
          : ""}
      </div>
      ${e.children.length && open
        ? html`<ul role="list">
            ${e.children.map(
              (c) => html`<li>
                <button class="entry" aria-current="${this._current === c.id ? "true" : "false"}" @click="${() => this._select(c.id)}">
                  ${c.step
                    ? html`<span class="num" aria-hidden="true">${c.step}</span>`
                    : c.icon
                      ? html`<simple-icon-lite icon="${c.icon}"></simple-icon-lite>`
                      : html`<span class="noicon"></span>`}
                  <span class="label">${c.step ? html`<span class="sr">${c.step}. </span>` : ""}${c.title}${c.typeLabel ? html`<small>${c.typeLabel}</small>` : ""}</span>
                </button>
              </li>`,
            )}
          </ul>`
        : ""}
    </li>`;
  }

  render() {
    const o = this._outline;
    const list = allItems();
    const types = contentTypes(list).types;
    const rootType = o ? types.find((t) => t.id === o.root.metadata?.pageType) : null;
    const flat = this._flat();
    const at = flat.findIndex((f) => f.id === this._current);
    const here = flat[at];
    const page = list.find((i) => i.id === this._current);
    const src = page ? this._source(page, list) : null;
    const type = src ? types.find((t) => t.id === src.metadata?.pageType) : null;
    const versions = page ? versionsOf((page.metadata?.oerRef?.page && list.find((i) => i.id === page.metadata.oerRef.page)?.id) || page.id, list).filter((v) => v.snapshot) : [];
    const prev = at > 0 ? flat[at - 1] : null;
    const next = at >= 0 && at < flat.length - 1 ? flat[at + 1] : null;
    const crumbs = here ? [o.root.title, here.section, here.child ? here.entry.title : "", here.id === o.root.id ? "Overview" : here.title].filter(Boolean) : [];
    return html`<dialog aria-labelledby="viewer-title" @close="${this._onClose}">
      ${o
        ? html`<div class="frame">
            <aside class="${this._showContents ? "shown" : ""}" aria-label="Contents">
              <div class="head">
                ${rootType ? html`<span class="type">${rootType.icon ? html`<simple-icon-lite icon="${rootType.icon}"></simple-icon-lite>` : ""}${rootType.label}</span>` : ""}
                <h2 id="viewer-title" tabindex="-1">${o.root.title}</h2>
                ${o.root.description ? html`<p class="desc">${o.root.description}</p>` : ""}
              </div>
              <nav aria-label="${o.root.title}">
                <ul role="list">
                  <li>
                    <div class="row">
                      <button class="entry" aria-current="${this._current === o.root.id ? "true" : "false"}" @click="${() => this._select(o.root.id)}">
                        ${lucide("oer:book-a")}<span class="label">Overview</span>
                      </button>
                    </div>
                  </li>
                </ul>
                ${o.sections.map(
                  (s) => html`${s.title
                      ? s.id
                        ? html`<h3><button class="entry" aria-current="${this._current === s.id ? "true" : "false"}" @click="${() => this._select(s.id)}">${s.title}</button></h3>`
                        : html`<h3>${s.title}</h3>`
                      : ""}
                    <ul role="list">
                      ${s.entries.map((e) => this._renderEntry(e))}
                    </ul>`,
                )}
              </nav>
            </aside>
            <main>
              <div class="bar">
                <button class="btn contents-btn" aria-expanded="${this._showContents ? "true" : "false"}" @click="${() => (this._showContents = !this._showContents)}">
                  ${lucide("oer:list")}Contents
                </button>
                <ol class="crumbs" aria-label="You are here">
                  ${crumbs.map((c) => html`<li>${c}</li>`)}
                </ol>
                ${versions.length
                  ? html`<label class="sr" for="viewer-version">Version</label>
                      <select id="viewer-version" class="btn" @change="${(e) => this._select(this._current, { version: e.target.value, focus: false })}">
                        <option value="" ?selected="${!this._version}">Latest</option>
                        ${versions.map((v) => html`<option value="${v.version}" ?selected="${v.version === this._version}">v${v.version}</option>`)}
                      </select>`
                  : ""}
                ${src ? html`<a class="btn" href="${src.slug}" @click="${() => this.close()}">${lucide("icons:open-in-new")}Open page</a>` : ""}
                <button class="icon-btn" aria-label="Close viewer" title="Close" @click="${() => this.close()}">${lucide("oer:x")}</button>
              </div>
              <div class="scroll">
                <article class="page" aria-labelledby="viewer-page-title" aria-busy="${this._loading ? "true" : "false"}">
                  ${type ? html`<div class="type page-type">${type.icon ? html`<simple-icon-lite icon="${type.icon}"></simple-icon-lite>` : ""}${type.label}${this._version ? ` · v${this._version}` : ""}</div>` : ""}
                  <h2 id="viewer-page-title" tabindex="-1">${src?.metadata?.oerSnapshotTitle || src?.title || ""}</h2>
                  ${this._loading ? html`<p class="status" role="status">Loading…</p>` : ""}
                  ${this._error ? html`<p class="status" role="alert">${this._error}</p>` : ""}
                  <slot name="page"></slot>
                  <nav class="pager" aria-label="Previous and next">
                    ${prev
                      ? html`<button @click="${() => this._select(prev.id)}"><small>Previous</small>${prev.title}</button>`
                      : ""}
                    ${next
                      ? html`<button class="next" @click="${() => this._select(next.id)}"><small>Next</small>${next.title}</button>`
                      : ""}
                  </nav>
                </article>
              </div>
            </main>
          </div>`
        : ""}
    </dialog>`;
  }
}

if (!customElements.get(OerOutlineViewer.tag)) customElements.define(OerOutlineViewer.tag, OerOutlineViewer);

export function outlineViewer() {
  const doc = globalThis.document;
  return doc.querySelector(OerOutlineViewer.tag) || doc.body.appendChild(doc.createElement(OerOutlineViewer.tag));
}

/** Open the viewer an address asks for (?view=<page>&item=<entry>), once the outline has loaded. */
export function openViewerFromUrl(items) {
  const params = new URLSearchParams(globalThis.location.search);
  const view = params.get("view");
  if (!view || !items?.some((i) => i.id === view)) return false;
  outlineViewer().show(view, { item: params.get("item") || "", version: params.get("version") || "" });
  return true;
}
