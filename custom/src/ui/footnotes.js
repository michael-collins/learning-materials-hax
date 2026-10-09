/**
 * In-page links and footnote previews for page content.
 *
 * - HAX sets <base href> to the site root, so a plain "#fn-1" link would
 *   resolve to the home page. Links to an id on the current page scroll to
 *   it instead (and move focus there), keeping the page's own address.
 * - Footnote citations (sup.fn-ref a, see scripts/lib/footnotes.mjs) show
 *   their reference in a small preview on hover or keyboard focus, so
 *   readers don't lose their place; the link still jumps to the list.
 * - Content inside a shadow root (a book site's chapter) works too: links
 *   find their target in the same root, and that root watches for
 *   previews itself (watchFootnotes), since events inside it don't reach
 *   the document as themselves.
 */
let installed = false;
let tip = null;
let hideTimer = null;

// the element a "#id" link points to, in the link's own document or shadow root
function targetOf(a) {
  const href = a?.getAttribute?.("href") || "";
  if (!href.startsWith("#") || href.length < 2) return null;
  try {
    const id = decodeURIComponent(href.slice(1));
    const root = a.getRootNode?.();
    return root?.getElementById?.(id) || globalThis.document.getElementById(id);
  } catch {
    return null;
  }
}

function jump(target) {
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.scrollIntoView({ block: "center" });
  target.focus({ preventScroll: true });
  // the address names the spot on an ordinary page; inside a shadow root
  // (a book site, whose address names the chapter) it stays as it is
  if (target.getRootNode() !== globalThis.document) return;
  const { pathname, search } = globalThis.location;
  globalThis.history.replaceState(globalThis.history.state, "", `${pathname}${search}#${target.id}`);
}

function ensureTip() {
  if (tip) return tip;
  tip = globalThis.document.createElement("div");
  tip.className = "oer-fn-tip";
  tip.setAttribute("role", "tooltip");
  tip.id = "oer-fn-tip";
  tip.hidden = true;
  tip.addEventListener("pointerenter", () => clearTimeout(hideTimer));
  tip.addEventListener("pointerleave", () => hide());
  globalThis.document.body.append(tip);
  return tip;
}

function show(a) {
  const note = targetOf(a);
  if (!note) return;
  clearTimeout(hideTimer);
  const t = ensureTip();
  const copy = note.cloneNode(true);
  copy.querySelectorAll(".fn-back").forEach((b) => b.remove());
  copy.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
  t.innerHTML = `<span class="oer-fn-num">${a.textContent.trim()}</span> ${copy.innerHTML}`;
  t.hidden = false;
  a.setAttribute("aria-describedby", t.id);
  // place it above the citation, or below when there's no room; keep it in the window
  const r = a.getBoundingClientRect();
  const w = Math.min(t.offsetWidth, globalThis.innerWidth - 16);
  const left = Math.max(8, Math.min(r.left + r.width / 2 - w / 2, globalThis.innerWidth - w - 8));
  const above = r.top - t.offsetHeight - 8;
  t.style.left = `${left}px`;
  t.style.top = `${above > 8 ? above : r.bottom + 8}px`;
}

function hide(now = false) {
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    if (tip) tip.hidden = true;
  }, now ? 0 : 150);
}

const isCitation = (a) => a?.closest?.("sup.fn-ref");

/** Show a citation's note on hover and focus for content in `root` (the document, or a shadow root). */
export function watchFootnotes(root) {
  if (root.__oerFootnotes) return;
  root.__oerFootnotes = true;
  const citation = (e) => e.composedPath()[0]?.closest?.("sup.fn-ref a");
  root.addEventListener("pointerover", (e) => {
    const a = citation(e);
    if (a) show(a);
  });
  root.addEventListener("pointerout", (e) => {
    if (isCitation(e.composedPath()[0]) && !isCitation(e.relatedTarget)) hide();
  });
  root.addEventListener("focusin", (e) => {
    const a = citation(e);
    if (a) show(a);
  });
  root.addEventListener("focusout", (e) => {
    if (isCitation(e.composedPath()[0])) hide();
  });
}

export function installFootnotes() {
  if (installed) return;
  installed = true;
  const doc = globalThis.document;
  // capture phase on window, ahead of HAX's router (which would resolve
  // "#id" against <base href> and navigate to the home page)
  globalThis.addEventListener(
    "click",
    (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.composedPath().find((n) => n?.localName === "a" && (n.getAttribute("href") || "").startsWith("#"));
      if (!a || a.closest("[contenteditable], hax-body")) return;
      const target = targetOf(a);
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();
      hide(true);
      jump(target);
    },
    true,
  );
  watchFootnotes(doc);
  doc.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && tip && !tip.hidden) hide(true);
  });
  globalThis.addEventListener("scroll", () => hide(true), { passive: true, capture: true });
}
