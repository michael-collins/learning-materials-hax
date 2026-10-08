/**
 * The review of a set of links (links/link-model.js), shared by the Canvas
 * import's Links panel (lms/oer-canvas-import.js) and the site's link check
 * (links/oer-link-check.js). Links are grouped by what needs deciding:
 *   To pages here       an old site's page (or a broken link here) that a
 *                       page here clearly is: it will point at that page
 *   Might be a page here  likely pages, for the author to choose
 *   Links here that go nowhere / Written wrong
 *   Not working / Moved / Need a sign-in / Couldn't check / Working
 *                       after a check through the local helper
 * Each link has one choice (a labelled select): a page here, another page,
 * the archived copy, the new address, another address, keep it, or remove
 * the link and keep its text.
 *
 *   renderLinkReview(links, { onChange(key, patch), onPick(key), onShow(use, link), check: { can, busy, note, run } })
 * Each place a link is used ({ id, title, slug?, text, before, after,
 * count, item? }) shows its sentence with the link's words marked, and opens
 * the page in a new tab (with a slug) or, given onShow, shows the item.
 * A link's key is `key` when it has one (the same relative address can mean
 * different pages on different courses' pages), else its address.
 *   linkReviewStyles: the styles (add them to the host's)
 */
import { html, css } from "../lit.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";

/** The local helper (nu-hax/scripts/ai-bridge.mjs): Claude, and link checks. */
export const LOCAL_HELPER = "http://127.0.0.1:3110";

const lucide = (name) => html`<span class="lucide sm" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;

const GROUPS = [
  ["here", "To pages on this site", "They'll point at the page here instead of the old site."],
  ["ask", "Might be a page here", "Choose the page each one means, or keep the old address."],
  ["broken", "Links to this site that go nowhere", "No page here has this address."],
  ["fix", "Written wrong", "The address is missing its start, or is a leftover from Markdown."],
  ["dead", "Not working", "The page is gone. Use the Internet Archive's copy where there is one, another address, or keep only the text."],
  ["moved", "Moved", "The site sends visitors on to a new address."],
  ["nohere", "On an old site, with no page here", "These stay links to the old site."],
  ["private", "Need a sign-in", "Students may need an account to open these."],
  ["unknown", "Couldn't check", "The site didn't answer the check. Open them to look."],
  ["unchecked", "Other sites", "Check them to find any that no longer work."],
  ["ok", "Working", ""],
];

/**
 * The group a link is shown in: from what was found about it (`auto`: the
 * analysis matched a page here), never from the choice made, so a row stays
 * where it is while it's being decided.
 */
export function linkGroup(l) {
  if (l.auto) return "here";
  const status = l.check?.status;
  if (l.kind === "broken") return l.fix ? "fix" : l.candidates?.length ? "ask" : "broken";
  if (l.kind === "old" && l.candidates?.length) return "ask";
  if (status === "dead") return "dead";
  if (status === "moved") return "moved";
  if (l.kind === "old") return "nohere";
  if (status) return status === "ok" ? "ok" : status === "private" ? "private" : "unknown";
  return "unchecked";
}

// a host's site, roughly: its last two labels (studio.blender.org → blender.org)
const siteOf = (url) => {
  try {
    return new URL(url).hostname.toLowerCase().split(".").slice(-2).join(".");
  } catch {
    return "";
  }
};

/**
 * What a check's result changes: a link moved within its own site takes
 * the new address (until the author says otherwise). One that now goes to
 * another site (a company bought, a domain sold) is only offered: the page
 * it meant may be gone.
 */
export function withCheck(l, result) {
  const next = { ...l, check: result };
  if (result?.status === "moved" && result.final && l.action === "keep" && siteOf(result.final) === siteOf(l.url)) Object.assign(next, { action: "replace", to: result.final, via: "final" });
  return next;
}

/** Links worth checking: outside addresses that won't point at a page here. */
export const checkable = (links) => links.filter((l) => l.action !== "page" && /^https?:\/\//i.test(l.url) && (l.kind === "external" || l.kind === "old"));

/**
 * Check links through the local helper, in batches (three at once).
 * onProgress(done, all) as batches come back. → Map url → result
 */
export async function checkViaHelper(urls, { onProgress = () => {}, signal, batch = 15 } = {}) {
  const out = new Map();
  const batches = [];
  for (let i = 0; i < urls.length; i += batch) batches.push(urls.slice(i, i + batch));
  let done = 0;
  onProgress(0, urls.length);
  const worker = async () => {
    for (let b = batches.shift(); b; b = batches.shift()) {
      const res = await fetch(`${LOCAL_HELPER}/links/check`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ urls: b }), signal });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `The helper answered ${res.status}`);
      for (const r of data.results || []) out.set(r.url, r);
      done += b.length;
      onProgress(done, urls.length);
    }
  };
  await Promise.all([worker(), worker(), worker()]);
  return out;
}

/** The local helper's status: { up, ai, model, links }. */
export async function helperStatus() {
  try {
    const res = await fetch(`${LOCAL_HELPER}/status`, { signal: AbortSignal.timeout(1200) });
    const data = await res.json();
    return { up: !!data.ok, ai: data.ai !== false && !!data.model, model: data.model || "", links: !!data.links };
  } catch {
    return { up: false, ai: false, model: "", links: false };
  }
}

const short = (url) => {
  const s = String(url).replace(/^https?:\/\/(www\.)?/, "");
  return s.length > 72 ? `${s.slice(0, 44)}…${s.slice(-24)}` : s;
};

// the select's value for the link's current choice
function chosen(l) {
  if (l.action === "page") return l.match ? `page:${l.match.id}` : "keep";
  if (l.action === "replace") return l.via || "other";
  return l.action || "keep";
}

function options(l) {
  const c = l.check || {};
  const pages = [...(l.match && !(l.candidates || []).some((x) => x.id === l.match.id) ? [l.match] : []), ...(l.candidates || [])];
  const out = [];
  for (const p of pages) out.push([`page:${p.id}`, `The page here: ${p.title}${p.score < 0.95 ? ` (${Math.round(p.score * 100)}% alike)` : ""}`]);
  if (l.kind === "old" || l.kind === "broken") out.push(["pick", "Another page here…"]);
  if (l.fix) out.push(["fix", `Use ${short(l.fix)}`]);
  if (c.status === "moved" && c.final) out.push(["final", `Use the new address (${short(c.final)})`]);
  if (c.archive) out.push(["archive", `Use the archived copy (${c.archive.date || "Internet Archive"})`]);
  out.push(["keep", l.kind === "old" ? "Keep the old address" : l.kind === "broken" ? "Keep it as it is" : c.status === "moved" ? "Keep the old address" : "Keep it"]);
  out.push(["other", "Another address…"]);
  out.push(["unlink", "Remove the link, keep its text"]);
  return out;
}

const keyOf = (l) => l.key || l.url;

function choose(l, value, handlers) {
  const k = keyOf(l);
  const onChange = (_, patch) => handlers.onChange(k, patch);
  const onPick = () => handlers.onPick(k);
  if (value.startsWith("page:")) {
    const p = [...(l.candidates || []), ...(l.match ? [l.match] : [])].find((x) => `page:${x.id}` === value);
    if (p) onChange(l.url, { action: "page", match: p });
  } else if (value === "pick") onPick(l.url);
  else if (value === "fix") onChange(l.url, { action: "replace", to: l.fix, via: "fix" });
  else if (value === "final") onChange(l.url, { action: "replace", to: l.check.final, via: "final" });
  else if (value === "archive") onChange(l.url, { action: "replace", to: l.check.archive.url, via: "archive" });
  else if (value === "other") onChange(l.url, { action: "replace", to: l.via === "other" ? l.to : "", via: "other" });
  else onChange(l.url, { action: value });
}

// one place a link is used, on one line: the page or item (opened in a new
// tab, or shown in the import), then its sentence with the link's words in
// bold (the whole sentence on hover)
function useLine(u, l, handlers) {
  // two pages with one title (a course's copy of an article): say which
  const twin = (l.uses || []).some((x) => x !== u && x.title === u.title && x.id !== u.id);
  const label = html`${u.title}${twin && u.course ? html` <span class="twin">${u.course}</span>` : ""}`;
  const where = handlers.onShow
    ? html`<button type="button" class="use-open" @click="${() => handlers.onShow(u, l)}">${label}<span class="sr"> (show it, with the link marked)</span></button>`
    : u.slug !== undefined
      ? html`<a class="use-open" href="${u.slug}" target="_blank" rel="noopener">${label}<span class="sr"> (opens in a new tab)</span></a>`
      : html`<span class="use-open">${label}</span>`;
  const sentence = u.item ? "The module's link item" : u.text ? `${u.before}${u.text}${u.after}` : "";
  return html`<li>
    ${where}
    ${u.item
      ? html`<span class="ctx">${sentence}</span>`
      : u.text
        ? html`<span class="ctx" title="${sentence}">${u.before}<b>${u.text}</b>${u.after}</span>`
        : ""}
    ${u.count > 1 ? html`<span class="times">×${u.count}</span>` : ""}
  </li>`;
}

// what the check found, in words (the group says the rest)
function checkNote(l) {
  const c = l.check;
  if (!c?.note || c.status === "ok") return "";
  if (c.status === "moved" && siteOf(c.final) !== siteOf(l.url)) return `It now goes to another site (${siteOf(c.final)}). Check it's the same page.`;
  const code = c.code >= 400 && !c.note.includes(String(c.code)) ? ` (${c.code})` : "";
  return `${c.note[0].toUpperCase()}${c.note.slice(1)}${code}.`;
}

function row(l, handlers) {
  const id = `l-${Math.abs([...keyOf(l)].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) | 0, 7))}`;
  const uses = l.uses || [];
  const note = checkNote(l);
  return html`<li class="link-row" data-key="${keyOf(l)}">
    <div class="lr-main">
      <a class="addr" href="${l.url}" target="_blank" rel="noopener noreferrer" title="${l.url}">${short(l.url)}${lucide("icons:open-in-new")}<span class="sr"> (opens in a new tab)</span></a>
      ${note ? html`<p class="note-line">${note}</p>` : ""}
      ${uses.length
        ? html`<ul class="uses" aria-label="Where it's used">
              ${uses.slice(0, 2).map((u) => useLine(u, l, handlers))}
            </ul>
            ${uses.length > 2
              ? html`<details class="more-uses">
                  <summary>${lucide("oer:chevron-right")}${uses.length - 2} more place${uses.length - 2 === 1 ? "" : "s"}</summary>
                  <ul class="uses">
                    ${uses.slice(2).map((u) => useLine(u, l, handlers))}
                  </ul>
                </details>`
              : ""}`
        : ""}
    </div>
    <div class="lr-choice">
      <label class="sr" for="${id}">What the link to ${short(l.url)} becomes</label>
      <select id="${id}" @change="${(e) => choose(l, e.target.value, handlers)}">
        ${options(l).map(([v, label]) => html`<option value="${v}" ?selected="${chosen(l) === v}">${label}</option>`)}
      </select>
      ${l.action === "replace" && l.via === "other"
        ? html`<input class="input" type="url" placeholder="https://…" aria-label="The new address for ${short(l.url)}" .value="${l.to || ""}" @change="${(e) => handlers.onChange(keyOf(l), { action: "replace", to: e.target.value.trim(), via: "other" })}" />`
        : ""}
      ${l.action === "page" && l.match?.why ? html`<p class="why">${l.match.why[0].toUpperCase()}${l.match.why.slice(1)}.</p>` : ""}
    </div>
  </li>`;
}

/**
 * The review: a bar with the summary (given) and the dead-link check, then
 * the links by group.
 */
export function renderLinkReview(links, { onChange, onPick, onShow, check = {}, summary = "" }) {
  const by = new Map(GROUPS.map(([k]) => [k, []]));
  for (const l of links) by.get(linkGroup(l)).push(l);
  const handlers = { onChange, onPick, onShow };
  const unchecked = checkable(links).filter((l) => !l.check).length;
  return html`<div class="link-review">
    <div class="review-bar">
      <div class="review-summary">${summary}</div>
      ${check.can
        ? html`<button class="btn outline small" aria-disabled="${check.busy || !checkable(links).length ? "true" : "false"}" @click="${() => !check.busy && checkable(links).length && check.run()}">
            ${lucide("oer:circle-alert")}${check.busy ? "Checking…" : unchecked ? `Check ${unchecked} for dead links` : "Check again"}
          </button>`
        : ""}
    </div>
    ${check.note ? html`<p class="hint" role="status">${check.note}</p>` : ""}
    ${check.can
      ? ""
      : html`<p class="hint">
          To find dead links, start the local helper in nu-hax: <code>node --env-file=.env.local scripts/ai-bridge.mjs</code>${check.retry ? html` <button class="btn outline small inline" @click="${check.retry}">Check again</button>` : ""}
        </p>`}
    ${GROUPS.map(([key, label, about]) => {
      const list = by.get(key);
      if (!list.length) return "";
      const head = html`<h4>${label}<span class="count">${list.length}</span></h4>`;
      const body = html`${about ? html`<p class="group-about">${about}</p>` : ""}
        <ul class="link-list">
          ${list.map((l) => row(l, handlers))}
        </ul>`;
      return key === "ok" || (key === "unchecked" && list.length > 8)
        ? html`<details class="link-group">
            <summary>${lucide("oer:chevron-right")}${head}</summary>
            ${body}
          </details>`
        : html`<section class="link-group" aria-label="${label}">${head}${body}</section>`;
    })}
  </div>`;
}

/** Counts for a summary line. */
export function linkCounts(links) {
  const n = (k) => links.filter((l) => linkGroup(l) === k).length;
  return { here: n("here"), ask: n("ask"), broken: n("broken") + n("fix"), dead: n("dead"), moved: n("moved"), total: links.length };
}

export const linkReviewStyles = css`
  .link-review {
    container-type: inline-size;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .review-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem 1rem;
    padding: 0.75rem 1rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--muted);
  }
  .review-summary {
    flex: 1;
    min-width: 14rem;
    font-size: 0.875rem;
  }
  .review-summary p {
    margin: 0;
  }
  .review-summary p + p {
    margin-top: 0.125rem;
    font-size: 0.75rem;
    color: var(--muted-foreground);
  }
  .link-review > .hint {
    margin-top: -0.75rem;
  }
  .btn.inline {
    display: inline-flex;
    margin-left: 0.25rem;
    height: 1.75rem;
  }
  /* groups */
  .link-group h4 {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
  }
  .link-group .count {
    display: inline-grid;
    place-items: center;
    min-width: 1.25rem;
    height: 1.25rem;
    padding: 0 0.375rem;
    border-radius: 999px;
    background: var(--muted);
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--muted-foreground);
  }
  .group-about {
    margin: 0.125rem 0 0;
    font-size: 0.8125rem;
    color: var(--muted-foreground);
  }
  details.link-group > summary {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    min-height: 2rem;
    width: fit-content;
    cursor: pointer;
  }
  details.link-group > summary::-webkit-details-marker,
  .more-uses > summary::-webkit-details-marker {
    display: none;
  }
  details.link-group > summary .lucide,
  .more-uses > summary .lucide {
    color: var(--muted-foreground);
  }
  details.link-group[open] > summary .lucide,
  .more-uses[open] > summary .lucide {
    transform: rotate(90deg);
  }
  details.link-group > summary:focus-visible,
  .more-uses > summary:focus-visible,
  .link-row a:focus-visible,
  .use-open:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
    border-radius: 2px;
  }
  .link-list {
    margin: 0.625rem 0 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid var(--border);
  }
  /* a link: what and where on the left, the choice on the right */
  .link-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.625rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border);
  }
  @container (min-width: 36rem) {
    .link-row {
      grid-template-columns: minmax(0, 1fr) minmax(13rem, 18rem);
      column-gap: 1.25rem;
      align-items: start;
    }
  }
  .lr-main {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .link-row .addr {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    width: fit-content;
    max-width: 100%;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--foreground);
    text-decoration: none;
    overflow-wrap: anywhere;
  }
  .link-row .addr:hover {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .link-row .addr .lucide {
    color: var(--muted-foreground);
  }
  .note-line {
    margin: 0;
    font-size: 0.8125rem;
    color: var(--muted-foreground);
  }
  .uses {
    margin: 0.125rem 0 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }
  .uses li {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    min-width: 0;
    font-size: 0.8125rem;
    line-height: 1.5;
  }
  .use-open {
    all: unset;
    flex: none;
    max-width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--link, var(--primary));
    cursor: pointer;
  }
  .use-open:hover {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .use-open .twin {
    color: var(--muted-foreground);
  }
  .uses .ctx {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--muted-foreground);
  }
  .uses .ctx b {
    font-weight: 600;
    color: var(--foreground);
  }
  .uses .times {
    flex: none;
    font-size: 0.75rem;
    color: var(--muted-foreground);
  }
  .more-uses {
    font-size: 0.8125rem;
  }
  .more-uses > summary {
    list-style: none;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    min-height: 1.5rem;
    color: var(--muted-foreground);
    cursor: pointer;
  }
  .more-uses > summary:hover {
    color: var(--foreground);
  }
  .more-uses > .uses {
    margin-top: 0.125rem;
  }
  .lr-choice {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    min-width: 0;
  }
  .lr-choice select,
  .lr-choice .input {
    width: 100%;
  }
  .lr-choice .why {
    margin: 0;
    font-size: 0.75rem;
    color: var(--muted-foreground);
  }
  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
  code {
    font-size: 0.75rem;
  }
`;
