/**
 * Citations in page content, as standard footnote markup (the same shape
 * scripts/lib/footnotes.mjs writes for imported pages):
 *
 *   <sup class="fn-ref" id="fnref-P-KEY"><a href="#fn-P-KEY">1</a></sup>
 *   <section class="footnotes" aria-labelledby="fn-P-label">
 *     <h2 id="fn-P-label">References</h2>
 *     <ol><li id="fn-P-KEY" data-resource="item-…">Source … <a href="#fnref-P-KEY" class="fn-back">↩</a></li></ol>
 *   </section>
 *
 * The editor keeps it consistent: citations are numbered in reading order,
 * references are listed in that order (references nobody cites stay, after
 * the rest), each citation gets a back-link, and the References section is
 * created or removed as needed. That runs after every insert and whenever
 * HAX serializes the page for saving, so manual edits are tidied too.
 */
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { saveOutline } from "../outline/outline-model.js";
import { parseReference } from "./parse-reference.js";

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** The short page id citation ids use ("fn-" + P + "-" + key). */
export const pagePrefix = (pageId = store.activeId) => String(pageId || "p").replace(/^item-/, "").slice(0, 8) || "p";

const keyOf = (href) => {
  const m = String(href || "").match(/^#fn-([^-]+)-(.+)$/);
  return m ? { prefix: m[1], key: m[2] } : null;
};

/** "Author, A. and B. (2002). Title. Publisher." with the title linked. */
export function formatCitation({ authors = [], year = "", title = "", url = "", publisher = "" } = {}) {
  const names = authors.map((a) => (typeof a === "string" ? a : a?.name)).filter(Boolean);
  const who = names.length < 3 ? names.join(" and ") : `${names.slice(0, -1).join(", ")}, and ${names.at(-1)}`;
  const t = title ? (url ? `<a href="${esc(url)}">${esc(title)}</a>` : `<cite>${esc(title)}</cite>`) : url ? `<a href="${esc(url)}">${esc(url)}</a>` : "";
  return [who && `${esc(who)}${year ? ` (${esc(year)})` : ""}.`, !who && year ? `(${esc(year)}).` : "", t && `${t}.`, publisher && `${esc(publisher)}.`].filter(Boolean).join(" ");
}

function referencesSection(body, P, create) {
  let section = body.querySelector(":scope > section.footnotes");
  if (!section && create) {
    section = globalThis.document.createElement("section");
    section.className = "footnotes";
    section.setAttribute("aria-labelledby", `fn-${P}-label`);
    section.innerHTML = `<h2 id="fn-${P}-label">References</h2><ol></ol>`;
    // after the last block that isn't an empty paragraph HAX keeps at the end
    const blocks = [...body.children].filter((el) => !(el.localName === "p" && !el.textContent.trim() && !el.querySelector("*")));
    const last = blocks.at(-1);
    if (last) last.after(section);
    else body.append(section);
  }
  if (section && !section.querySelector("ol")) section.append(globalThis.document.createElement("ol"));
  return section;
}

/**
 * Renumber citations and rebuild the References list in `body` (hax-body,
 * or any element holding page content). Returns the number of citations.
 */
export function normalizeCitations(body, pageId = store.activeId) {
  if (!body) return 0;
  const P = pagePrefix(pageId);
  const section = body.querySelector(":scope > section.footnotes");
  const links = [...body.querySelectorAll("sup.fn-ref > a[href^='#fn-']")].filter((a) => !section?.contains(a));
  if (!links.length && !section) return 0;
  const list = referencesSection(body, P, links.length > 0);
  if (!list) return 0;
  const ol = list.querySelector("ol");
  const items = new Map([...ol.querySelectorAll(":scope > li[id^='fn-']")].map((li) => [li.id, li]));
  const order = [];
  const count = new Map();
  for (const a of links) {
    const id = a.getAttribute("href").slice(1);
    const li = items.get(id);
    const sup = a.parentElement;
    if (!li) {
      // a citation whose reference was deleted: drop the dangling number
      sup.remove();
      continue;
    }
    if (!order.includes(id)) order.push(id);
    const n = (count.get(id) || 0) + 1;
    count.set(id, n);
    sup.id = `fnref-${id.slice(3)}${n > 1 ? `-${n}` : ""}`;
    a.textContent = String(order.indexOf(id) + 1);
  }
  // references in citation order, then those nobody cites any more
  const uncited = [...items.keys()].filter((id) => !order.includes(id));
  for (const id of [...order, ...uncited]) {
    const li = items.get(id);
    li.querySelectorAll(":scope > a.fn-back").forEach((b) => b.remove());
    const times = count.get(id) || 0;
    const num = order.indexOf(id) + 1;
    for (let k = 1; k <= times; k++) {
      const back = globalThis.document.createElement("a");
      back.className = "fn-back";
      back.href = `#fnref-${id.slice(3)}${k > 1 ? `-${k}` : ""}`;
      back.setAttribute("aria-label", times > 1 ? `Back to citation ${num}${String.fromCharCode(96 + k)}` : `Back to citation ${num}`);
      back.innerHTML = times > 1 ? `↩<sup>${String.fromCharCode(96 + k)}</sup>` : "↩";
      li.append(" ", back);
    }
    ol.append(li);
  }
  if (!items.size) list.remove();
  return links.length;
}

/** References already on the page: [{ id, html, text, resource, url, linkText, parts }]; parts are its citation fields, read from the text. */
export function pageReferences(body) {
  const section = body?.querySelector(":scope > section.footnotes");
  return [...(section?.querySelectorAll("ol > li[id^='fn-']") || [])].map((li) => {
    const copy = li.cloneNode(true);
    copy.querySelectorAll("a.fn-back").forEach((b) => b.remove());
    const link = copy.querySelector("a[href^='http']");
    return { id: li.id, html: copy.innerHTML.trim(), text: copy.textContent.trim(), resource: li.dataset.resource || "", url: link?.getAttribute("href") || "", linkText: link?.textContent.trim() || "", parts: parseReference(li) };
  });
}

/**
 * Cite at `range` (a collapsed caret or a selection; the citation goes after
 * it). `ref` is { id } for a reference already on the page, or { html,
 * resource?, data? } for a new one. Returns the reference's li id.
 */
export function insertCitation(body, range, ref, pageId = store.activeId) {
  const P = pagePrefix(pageId);
  let id = ref.id;
  if (!id) {
    const section = referencesSection(body, P, true);
    const key = Math.random().toString(36).slice(2, 7);
    id = `fn-${P}-${key}`;
    const li = globalThis.document.createElement("li");
    li.id = id;
    if (ref.resource) li.dataset.resource = ref.resource;
    if (ref.data) li.dataset.cite = JSON.stringify(ref.data);
    li.innerHTML = ref.html;
    section.querySelector("ol").append(li);
  }
  const sup = globalThis.document.createElement("sup");
  sup.className = "fn-ref";
  sup.innerHTML = `<a href="#${id}">?</a>`;
  const r = range.cloneRange();
  r.collapse(false);
  r.insertNode(sup);
  // leave the caret after the citation
  const after = globalThis.document.createRange();
  after.setStartAfter(sup);
  after.collapse(true);
  const sel = body.getRootNode().getSelection?.() || globalThis.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(after);
  normalizeCitations(body, pageId);
  return id;
}

/** Point a reference at a Resource page once it exists. */
export function linkReferenceToResource(body, liId, resourceId) {
  const li = body?.querySelector(`li#${CSS.escape(liId)}`);
  if (li && resourceId) li.dataset.resource = resourceId;
}

/** The Resource pages a page's References point to, in order. */
export function citedResources(root) {
  return [...new Set([...(root?.querySelectorAll("section.footnotes li[data-resource]") || [])].map((li) => li.dataset.resource).filter(Boolean))];
}

/**
 * After an editing session ends, read the page as it was saved and record
 * the Resources it cites in its metadata (oerCites), so a Resource page can
 * list the pages citing it from the outline alone (no site-wide index).
 * Cancelled edits read back unchanged, so they record nothing.
 */
let recording = false;
function recordCitationsAfterEditing() {
  if (recording) return;
  recording = true;
  let wasEditing = !!store.editMode;
  autorun(() => {
    const editing = !!store.editMode;
    const id = store.activeId;
    if (wasEditing && !editing && id) setTimeout(() => recordCitations(id), 1500);
    wasEditing = editing;
  });
}

export async function recordCitations(id) {
  const item = (toJS(store.manifest?.items) || []).find((i) => i.id === id);
  if (!item?.location) return;
  const res = await fetch(new URL(`${item.location}?t=${Date.now()}`, globalThis.document.baseURI), { cache: "no-store" }).catch(() => null);
  if (!res?.ok) return;
  const doc = new DOMParser().parseFromString(await res.text(), "text/html");
  const cites = citedResources(doc);
  const before = item.metadata?.oerCites || [];
  if (JSON.stringify(cites) === JSON.stringify(before)) return;
  await saveOutline([{ ...item, metadata: { ...item.metadata, oerCites: cites }, modified: true }]);
}

// tidy citations whenever HAX serializes the page (its save path)
let patched = false;
export function installCitationNormalizer() {
  if (patched) return;
  const patch = (cls) => {
    if (!cls || cls.prototype.__oerCitations) return;
    cls.prototype.__oerCitations = true;
    const original = cls.prototype.haxToContent;
    cls.prototype.haxToContent = async function (...args) {
      try {
        normalizeCitations(this);
      } catch (err) {
        console.warn("[oer] citations", err);
      }
      return original.apply(this, args);
    };
  };
  recordCitationsAfterEditing();
  const cls = customElements.get("hax-body");
  if (cls) patch(cls);
  else customElements.whenDefined("hax-body").then(() => patch(customElements.get("hax-body")));
  patched = true;
}

export { keyOf as citationKeyOf };
