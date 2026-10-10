/**
 * Leaving the page with unsaved changes asks first (nu-hax
 * docs/editor-redesign/spec.md §3.3):
 *
 * - A link to another page of the site outside the content (the editing
 *   bar's brand, the "off" notice's course page, the course site's footer)
 *   asks "Leave without saving?": Keep editing, Leave without saving, or
 *   Save and go. Links inside the content never navigate while editing
 *   (hax-fixes.js), and a link that opens elsewhere (a new tab, another
 *   site, the same page's #part) goes as usual.
 * - Closing or reloading the tab gets the browser's own question.
 *
 * "Changed" is the editor's own (editor-state.js dirty), never HAX's copy
 * or its onbeforeunload, which asks whenever a page is being edited
 * (docs/editor-spikes/lifecycle.md changes 11 and 17): HAX's exit trap is
 * skipped (HAXStore.skipExitTrap) while there's nothing to lose.
 *
 *   installLeaveGuard()   // from installEditorChrome (editor/index.js)
 */
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { editorState } from "./editor-state.js";
import { savePage, discardEdits, pageName } from "./stock.js";
import { confirmDialog } from "../ui/oer-confirm.js";

const haxStore = () => globalThis.HaxStore?.requestAvailability?.() ?? null;

// a link that would leave this page for another of the site's, here
function inAppLink(e) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
  const path = e.composedPath();
  // (the content's links are hax-fixes.js's)
  if (path.some((n) => n.localName === "hax-body")) return null;
  const link = path.find((n) => n.localName === "a" && n.hasAttribute?.("href"));
  if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return null;
  const to = new URL(link.href, globalThis.document.baseURI);
  const here = new URL(globalThis.location.href);
  if (to.origin !== here.origin || !/^https?:$/.test(to.protocol)) return null;
  if (to.pathname === here.pathname && to.search === here.search && to.hash) return null;
  return link;
}

// lets a link asked about go on (a click of its own)
let letThrough = null;

async function onClick(e) {
  const link = inAppLink(e);
  if (!link || link === letThrough) return;
  if (!store.editMode || !editorState.editing || editorState.saving) return;
  editorState._measure();
  if (!editorState.dirty) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  const choice = await confirmDialog().ask({
    title: "Leave without saving?",
    text: `Your changes to ${pageName()} will be lost.`,
    actions: [
      { id: "keep", label: "Keep editing" },
      { id: "leave", label: "Leave without saving", kind: "destructive" },
      { id: "save", label: "Save and go", kind: "primary" },
    ],
    opener: link,
  });
  if (choice === "keep" || !store.editMode) return;
  const left = choice === "save" ? (await savePage()).ok : (discardEdits(), true);
  if (!left || !link.isConnected) return;
  letThrough = link;
  try {
    link.click();
  } finally {
    letThrough = null;
  }
}

function onBeforeUnload(e) {
  if (!store.editMode || !editorState.editing) return;
  editorState._measure();
  if (!editorState.dirty && !editorState.saving) return;
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
  // capture, on the document: before HAX's router and the theme's own links
  globalThis.document.addEventListener("click", onClick, true);
  globalThis.addEventListener("beforeunload", onBeforeUnload);
  editorState.addEventListener("change", (e) => (e.detail.changed.has("dirty") || e.detail.changed.has("saving") || e.detail.changed.has("editing")) && followDirty());
}
