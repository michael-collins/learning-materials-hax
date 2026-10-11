/**
 * Leaving the page being edited asks first when there's something to lose
 * (nu-hax docs/editor-redesign/spec.md §3.3):
 *
 * - A link to another page of the site outside the content (the editing
 *   bar's brand, the "off" notice's course page, the course site's footer)
 *   and the browser's Back and Forward ask "Leave without saving?": Keep
 *   editing, Leave without saving, or Save and go. With nothing to lose,
 *   editing ends and the page goes. Either way editing ends before HAX's
 *   router changes page, which it would do with the editor still on, the
 *   page left in it. Links inside the content never navigate while editing
 *   (hax-fixes.js), and a link that opens elsewhere (a new tab, another
 *   site, a #part of this page) goes as usual.
 * - Back and Forward have already changed the address when they're heard:
 *   HAX's router, which hears them first (a window's listeners run in the
 *   order they were added), doesn't change page (its _resolve, pinned);
 *   the page being edited gets its address back (a new entry, after the
 *   one stepped to), and on leaving the editor steps back to it.
 * - Closing or reloading the tab gets the browser's own question, also
 *   for HTML typed in Edit HTML and an image's address typed and not yet
 *   on the page (stock.js typedNotOnPage).
 *
 * "Something to lose" is the editor's own (stock.js unsaved: the
 * editor-state.js baseline, and HTML typed in Edit HTML), never HAX's copy
 * or its onbeforeunload, which asks whenever a page is being edited
 * (docs/editor-spikes/lifecycle.md changes 11 and 17): HAX's exit trap is
 * skipped (HAXStore.skipExitTrap) while there's nothing to lose.
 *
 *   installLeaveGuard()   // from installEditorChrome (editor/index.js)
 */
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { editorState } from "./editor-state.js";
import { savePage, discardEdits, pageName, unsaved, typedNotOnPage, followFields } from "./stock.js";
import { confirmDialog } from "../ui/oer-confirm.js";
import { pinned } from "./hax-fixes.js";

const haxStore = () => globalThis.HaxStore?.requestAvailability?.() ?? null;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const samePage = (a, b) => a.origin === b.origin && a.pathname === b.pathname && a.search === b.search;

// a link that would leave this page for another of the site's, here
function inAppLink(e) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
  const path = e.composedPath();
  // (the content's links are hax-fixes.js's)
  if (path.some((n) => n.localName === "hax-body")) return null;
  const link = path.find((n) => n.localName === "a" && n.hasAttribute?.("href"));
  if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return null;
  // (a part of this page: "#…" goes by the site's <base>, not this page)
  if (link.getAttribute("href").startsWith("#")) return null;
  const to = new URL(link.href, globalThis.document.baseURI);
  if (!/^https?:$/.test(to.protocol) || to.origin !== globalThis.location.origin) return null;
  // (this page itself, or a part of it)
  if (samePage(to, new URL(globalThis.location.href))) return null;
  return link;
}

/**
 * Whether the editor may go: at once when nothing would be lost (editing
 * ends), otherwise as the author answers. Resolves once editing has ended.
 */
async function mayLeave(opener = null) {
  let choice = "leave";
  if (await unsaved()) {
    choice = await confirmDialog().ask({
      title: "Leave without saving?",
      text: `Your changes to ${pageName()} will be lost.`,
      actions: [
        { id: "keep", label: "Keep editing" },
        { id: "leave", label: "Leave without saving", kind: "destructive" },
        { id: "save", label: "Save and go", kind: "primary" },
      ],
      opener,
    });
  }
  if (choice === "keep") return false;
  if (choice === "save" && store.editMode && !(await savePage()).ok) return false;
  if (choice === "leave") discardEdits();
  for (let i = 0; i < 120 && store.editMode; i++) await sleep(25);
  return !store.editMode;
}

// a page of the site, as HAX's router goes to it from a link (hax-router.js _onClick)
function go(url) {
  globalThis.history.pushState(null, "", url.pathname + url.search + url.hash);
  globalThis.dispatchEvent(new PopStateEvent("popstate"));
}

async function onClick(e) {
  const link = inAppLink(e);
  if (!link || !store.editMode || !editorState.editing) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  if (editorState.saving) return;
  // (kept now: a link of the editor's goes as editing ends)
  const to = new URL(link.href, globalThis.document.baseURI);
  if (await mayLeave(link)) go(to);
}

// the address of the page being edited (as editing began, or as HAX has
// changed it since), and a step through history let through (the one an
// author has answered for)
let editingAt = "";
let passing = false;

// Back or Forward (a trusted popstate) away from the page being edited
function steppedAway(e) {
  if (!e || e.type !== "popstate" || !e.isTrusted || passing || !store.editMode || !editingAt) return false;
  return !samePage(new URL(globalThis.location.href), new URL(editingAt));
}

// HAX's router changes page on popstate before onPopState hears it: not
// for a step away while editing (hax-router.js _onPopstate → _resolve())
function pinRouter() {
  const router = globalThis.HAXCMS?.requestAvailability?.()?.storePieces?.siteRouter?.router;
  if (!router) return;
  pinned(
    { fix: "Back and Forward ask before leaving the editor", owner: "hax-router", target: Object.getPrototypeOf(router), method: "_resolve", marker: "hax-router-location-changed", file: "editor/leave-guard.js" },
    (original) =>
      function (...args) {
        // (the event being heard: the router's popstate listener's)
        if (!args[0] && steppedAway(globalThis.event)) return undefined;
        return original.apply(this, args);
      },
  );
}

function onPopState(e) {
  if (passing && e.isTrusted) {
    passing = false;
    return;
  }
  if (!store.editMode || !editingAt) return;
  const here = new URL(globalThis.location.href);
  // (HAX's own: its router after a link, or a page's new address after a save)
  if (!e.isTrusted) {
    editingAt = here.href;
    return;
  }
  if (!steppedAway(e)) return;
  const at = new URL(editingAt);
  // Back or Forward: the page gets its address back
  e.stopImmediatePropagation();
  globalThis.history.pushState(null, "", at.pathname + at.search + at.hash);
  if (editorState.saving) return;
  mayLeave().then((left) => {
    if (!left) return;
    passing = true;
    globalThis.history.back();
  });
}

function onBeforeUnload(e) {
  if (!store.editMode || !editorState.editing) return;
  editorState._measure();
  if (!editorState.dirty && !editorState.saving && !typedNotOnPage()) return;
  e.preventDefault();
  e.returnValue = "";
}

// HAX's own question on leaving (hax-store.js 3163) follows ours
function followDirty() {
  const hax = haxStore();
  if (hax) hax.skipExitTrap = !(editorState.dirty || editorState.saving);
}

let installed = false;
export function installLeaveGuard() {
  if (installed) return;
  installed = true;
  // capture, on the document: before HAX's router and the theme's own
  // links. (On the window, HAX's router hears popstate first: pinRouter)
  globalThis.document.addEventListener("click", onClick, true);
  globalThis.addEventListener("popstate", onPopState, true);
  globalThis.addEventListener("haxcms-edit-mode-changed", (e) => {
    editingAt = e.detail ? globalThis.location.href : "";
    if (e.detail) pinRouter();
  });
  if (store.editMode) editingAt = globalThis.location.href;
  pinRouter();
  globalThis.addEventListener("beforeunload", onBeforeUnload);
  followFields();
  editorState.addEventListener("change", (e) => (e.detail.changed.has("dirty") || e.detail.changed.has("saving") || e.detail.changed.has("editing")) && followDirty());
}
