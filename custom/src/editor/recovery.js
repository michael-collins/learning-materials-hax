/**
 * Unsaved edits come back after a reload, on HAX's own copy of them (nu-hax
 * docs/editor-redesign/spec.md §3.3; docs/editor-spikes/lifecycle.md S6 and
 * change 19):
 *
 * - While the page has unsaved changes, 2 s after the last one, the site
 *   editor's _snapshotPendingEditForLogout() keeps a copy in
 *   sessionStorage "haxcms-pending-edit" ({ itemId, title, content,
 *   savedAt }, kept 30 minutes). HAX itself writes it only when a session
 *   ends. Beside it goes which saved page the edits were made to
 *   ("oer-pending-edit-base"): a copy made to a page that has been saved
 *   differently since isn't offered (it would put back the page from
 *   before). Back to no changes (Undo), the copy goes.
 * - HAX would put that copy back by itself on entering edit mode, without
 *   asking (and in Safari lost it: its restore ran into its own import,
 *   which skipped it, and the copy was cleared). Its __pendingRestore reads
 *   null to HAX, so there's one way back, this one.
 * - offerRestore(), once editing has begun and its "no changes" baseline
 *   is taken (the editing bar calls it), asks "Restore unsaved edits from
 *   2:41 pm?": Not now (the copy stays), Discard them, or Restore, which
 *   puts the copy in the editor as one undo step, so the page reads
 *   "Unsaved changes".
 * - Saving the page (stock.js savePage) and discarding the changes drop it.
 * - pendingEdit(id): a page's copy, for the reading view to say there is
 *   one ("Unsaved edits from 2:41 pm · Edit content to restore"); it
 *   sends `oer-pending-edit` on the window when the copy comes or goes.
 *
 *   installRecovery()   // from installEditorChrome (editor/index.js)
 */
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { editorState, contentKey } from "./editor-state.js";
import { confirmDialog } from "../ui/oer-confirm.js";

const KEY = "haxcms-pending-edit";
const BASE_KEY = "oer-pending-edit-base";
// as long as HAX keeps it (haxcms-site-editor.js _offerPendingEditRestore)
const KEEP = 30 * 60 * 1000;
// how long after the last change the copy is taken
const QUIET = 2000;

const activeBody = () => globalThis.HaxStore?.requestAvailability?.()?.activeHaxBody ?? null;
const siteEditor = () => store.cmsSiteEditor?.instance ?? null;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function readCopy() {
  try {
    return JSON.parse(globalThis.sessionStorage.getItem(KEY) || "null");
  } catch {
    return null;
  }
}

const changed = () => globalThis.dispatchEvent(new CustomEvent("oer-pending-edit"));

/** The page's copy of unsaved edits ({ content, savedAt, … }), or null. */
export function pendingEdit(id) {
  const copy = readCopy();
  if (!id || !copy?.content || String(copy.itemId) !== String(id)) return null;
  return typeof copy.savedAt === "number" && Date.now() - copy.savedAt <= KEEP ? copy : null;
}

/** The time a copy was taken, as people say it: "2:41 pm". */
export function copyTime(copy) {
  const time = new Date(copy.savedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return time.replace(/\s?([AaPp])\.?\s?[Mm]\.?$/, (m, a) => ` ${a.toLowerCase()}m`);
}

/** Forget the copy of unsaved edits (they're saved, or discarded). */
export function dropCopy() {
  if (!readCopy()) return;
  try {
    globalThis.sessionStorage.removeItem(KEY);
    globalThis.sessionStorage.removeItem(BASE_KEY);
  } catch {
    // (nothing kept without storage)
  }
  changed();
}

// the saved page the edits are made to, briefly: its "no changes" form
// (editor-state.js), hashed
function baseOf() {
  const text = editorState.__baseline ?? "";
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (Math.imul(h, 31) + text.charCodeAt(i)) | 0;
  return `${text.length}:${h}`;
}

/* ---------- keeping the copy ---------- */

let observer = null;
let timer = 0;

function keepCopy() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const body = activeBody();
    if (!body?.editMode || editorState.saving || !editorState.tracking) return;
    editorState._measure();
    if (!editorState.dirty) return dropCopy();
    siteEditor()?._snapshotPendingEditForLogout?.();
    try {
      globalThis.sessionStorage.setItem(BASE_KEY, JSON.stringify({ itemId: String(toJS(store.activeItem)?.id), base: baseOf() }));
    } catch {
      // (offered whatever page it was made to)
    }
    changed();
  }, QUIET);
}

function follow(on) {
  observer?.disconnect();
  clearTimeout(timer);
  const body = activeBody();
  if (!on || !body) return;
  observer = new MutationObserver(keepCopy);
  observer.observe(body, { subtree: true, childList: true, characterData: true, attributes: true });
}

/* ---------- HAX's own restore, off ---------- */

// HAX's copy goes to it through __pendingRestore (haxcms-site-editor.js
// 44, 1630, 1644): it always reads null, so HAX never applies it itself
function takeOver(EditorClass) {
  const proto = EditorClass?.prototype;
  if (!proto || Object.getOwnPropertyDescriptor(proto, "__pendingRestore")) return;
  Object.defineProperty(proto, "__pendingRestore", { configurable: true, get: () => null, set: () => {} });
  // (one made before this: its own property gives way to the one above)
  const editor = siteEditor();
  if (editor && Object.prototype.hasOwnProperty.call(editor, "__pendingRestore")) delete editor.__pendingRestore;
}

/* ---------- offering it back ---------- */

/**
 * Offer the page's copy of unsaved edits, once editing has begun (after the
 * baseline). Resolves to "restore", "discard", "later" or null (none to
 * offer). opener gets focus back when the question closes.
 */
export async function offerRestore({ opener = null, name = "" } = {}) {
  const body = activeBody();
  if (!body?.editMode) return null;
  for (let waited = 0; !editorState.tracking && waited < 5000; waited += 50) await sleep(50);
  const id = toJS(store.activeItem)?.id;
  const copy = pendingEdit(id);
  if (!copy || !body.editMode) return null;
  // (a copy of the page as it's saved: nothing to bring back; or edits to
  // the page as it was saved before, which would put that back)
  let made = null;
  try {
    made = JSON.parse(globalThis.sessionStorage.getItem(BASE_KEY) || "null");
  } catch {
    made = null;
  }
  const stale = made && String(made.itemId) === String(id) && made.base !== baseOf();
  if (stale || contentKey(copy.content) === contentKey(body.innerHTML)) {
    dropCopy();
    return null;
  }
  const choice = await confirmDialog().ask({
    title: `Restore unsaved edits from ${copyTime(copy)}?`,
    text: `Changes to ${name || "this page"} weren't saved when it was last open. Restore puts them back on the page, and Undo takes them out again.`,
    actions: [
      { id: "later", label: "Not now" },
      { id: "discard", label: "Discard them", kind: "destructive" },
      { id: "restore", label: "Restore", kind: "primary" },
    ],
    opener,
  });
  if (!body.editMode) return null;
  if (choice === "discard") dropCopy();
  if (choice !== "restore") return choice;
  // past any hold on HAX's own imports (import-hold.js)
  globalThis.customElements.get("hax-body").prototype.importContent.call(body, copy.content);
  for (let i = 0; i < 100 && body._contentState?.getState("importing"); i++) await sleep(25);
  return "restore";
}

let installed = false;
export function installRecovery() {
  if (installed) return;
  installed = true;
  globalThis.customElements.whenDefined("haxcms-site-editor").then(() => takeOver(globalThis.customElements.get("haxcms-site-editor")));
  globalThis.addEventListener("haxcms-edit-mode-changed", (e) => follow(!!e.detail));
  // discarding the changes drops their copy too
  globalThis.addEventListener("hax-cancel", dropCopy);
  if (activeBody()?.editMode) follow(true);
}
