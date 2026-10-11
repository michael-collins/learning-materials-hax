/**
 * Unsaved edits come back after a reload (nu-hax
 * docs/editor-redesign/spec.md §3.3; docs/editor-spikes/lifecycle.md S6 and
 * change 19):
 *
 * - While a page has unsaved changes, 2 s after the last one, and as the
 *   page goes (a reload the author has agreed to, while it saves too), a
 *   copy of hax-body is kept in sessionStorage "oer-pending-edits", one
 *   per page ({ [itemId]: { itemId, title, content, savedAt, base } }, each
 *   kept 30 minutes, the ten newest). base is which saved page the edits
 *   were made to: a copy made to a page that has been saved differently
 *   since (a save that got no answer may still have been written) is
 *   offered saying so, as restoring it puts back the page from before. Back to
 *   no changes (Undo), the page's copy goes. What's done on one page never
 *   touches another's copy.
 * - HAX keeps one copy of its own ("haxcms-pending-edit", written as a
 *   session ends, e.g. a sign-in that has run out): it joins ours. HAX
 *   would put it back by itself on entering edit mode, without asking (and
 *   in Safari lost it: its restore ran into its own import, which skipped
 *   it, and the copy was cleared). Its __pendingRestore reads null to HAX,
 *   so there's one way back, this one.
 * - offerRestore(), once editing has begun and its "no changes" baseline
 *   is taken (the editing bar calls it), asks "Restore unsaved edits from
 *   2:41 pm?": Not now, Discard them, or Restore, which puts the copy in
 *   the editor as one undo step, so the page reads "Unsaved changes". The
 *   page's details are kept as they're saved now (its page-break, which
 *   Page details or Publish may have changed since the copy was made).
 * - Not now keeps the copy for later: it's asked again next time, and
 *   until then nothing replaces it or drops it but saving the page (whose
 *   saved form it was made to) or Discard them. Meanwhile this session's
 *   own changes aren't copied.
 * - Saving the page (stock.js savePage) drops its copy, and so does
 *   discarding the changes it's a copy of (forgetCopy).
 * - pendingEdit(id): a page's copy, for the reading view to say there is
 *   one ("Unsaved edits from 2:41 pm · Edit content to restore"); it
 *   sends `oer-pending-edit` on the window when a copy comes or goes.
 *
 *   installRecovery()   // from installEditorChrome (editor/index.js)
 */
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { editorState, contentKey } from "./editor-state.js";
import { confirmDialog } from "../ui/oer-confirm.js";

const KEY = "oer-pending-edits";
// HAX's own copy (haxcms-site-editor.js _snapshotPendingEditForLogout), and
// where the editor kept a copy's base before
const HAX_KEY = "haxcms-pending-edit";
const OLD_BASE_KEY = "oer-pending-edit-base";
// as long as HAX keeps it (haxcms-site-editor.js _offerPendingEditRestore)
const KEEP = 30 * 60 * 1000;
// how many pages' copies are kept (sessionStorage holds a few megabytes)
const MOST = 10;
// how long after the last change the copy is taken
const QUIET = 2000;

const haxStore = () => globalThis.HaxStore?.requestAvailability?.() ?? null;
const activeBody = () => haxStore()?.activeHaxBody ?? null;
const siteEditor = () => store.cmsSiteEditor?.instance ?? null;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pageId = () => String(toJS(store.activeItem)?.id ?? "");
const fresh = (copy) => !!copy?.content && typeof copy.savedAt === "number" && Date.now() - copy.savedAt <= KEEP;

const changed = () => globalThis.dispatchEvent(new CustomEvent("oer-pending-edit"));

function writeCopies(copies) {
  const newest = Object.values(copies)
    .filter(fresh)
    .sort((a, b) => b.savedAt - a.savedAt)
    .slice(0, MOST);
  try {
    if (newest.length) globalThis.sessionStorage.setItem(KEY, JSON.stringify(Object.fromEntries(newest.map((c) => [c.itemId, c]))));
    else globalThis.sessionStorage.removeItem(KEY);
  } catch {
    // (nothing kept without storage)
  }
}

// every page's copy, HAX's own among them
function readCopies() {
  let copies = {};
  let hax = null;
  try {
    copies = JSON.parse(globalThis.sessionStorage.getItem(KEY) || "{}") || {};
    hax = JSON.parse(globalThis.sessionStorage.getItem(HAX_KEY) || "null");
  } catch {
    return copies;
  }
  if (hax) {
    const id = String(hax.itemId || "");
    if (id && fresh(hax) && !(copies[id]?.savedAt >= hax.savedAt)) copies[id] = { itemId: id, title: hax.title || "", content: hax.content, savedAt: hax.savedAt };
    try {
      globalThis.sessionStorage.removeItem(HAX_KEY);
      globalThis.sessionStorage.removeItem(OLD_BASE_KEY);
    } catch {
      // (read again next time)
    }
    writeCopies(copies);
  }
  return copies;
}

/** The page's copy of unsaved edits ({ content, savedAt, … }), or null. */
export function pendingEdit(id) {
  const copy = id ? readCopies()[String(id)] : null;
  return fresh(copy) ? copy : null;
}

/** The time a copy was taken, as people say it: "2:41 pm". */
export function copyTime(copy) {
  const time = new Date(copy.savedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return time.replace(/\s?([AaPp])\.?\s?[Mm]\.?$/, (m, a) => ` ${a.toLowerCase()}m`);
}

// the page whose copy was kept for later (Not now): this session leaves it alone
let kept = "";

/** Forget a page's copy of unsaved edits (they're saved, or discarded). */
export function dropCopy(id = pageId()) {
  id = String(id);
  if (kept === id) kept = "";
  const copies = readCopies();
  if (!copies[id]) return;
  delete copies[id];
  writeCopies(copies);
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

/** Forget the copy of a page's unsaved edits (they're discarded); a copy kept for later stays. */
export function forgetCopy(id = pageId()) {
  if (kept !== String(id)) dropCopy(id);
}

/* ---------- keeping the copy ---------- */

let observer = null;
let timer = 0;
// the page being edited (a copy is only ever of it)
let followed = "";

// the page's unsaved edits, copied now (or the copy dropped, back to none);
// while it saves too: a reload then cancels the save
function takeCopy() {
  clearTimeout(timer);
  const body = activeBody();
  const id = pageId();
  if (!body?.editMode || !editorState.tracking || id !== followed || kept === id) return;
  editorState._measure();
  if (!editorState.dirty) return dropCopy(id);
  const copies = readCopies();
  copies[id] = { itemId: id, title: toJS(store.activeItem)?.title || "", content: body.innerHTML, savedAt: Date.now(), base: baseOf() };
  writeCopies(copies);
  changed();
}

/** Copy the page's unsaved edits once changes have paused (2 s). */
export function keepCopySoon() {
  clearTimeout(timer);
  timer = setTimeout(takeCopy, QUIET);
}

function follow(on) {
  observer?.disconnect();
  clearTimeout(timer);
  const body = activeBody();
  followed = on ? pageId() : "";
  if (!on || !body) return;
  observer = new MutationObserver(keepCopySoon);
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
  kept = "";
  for (let waited = 0; !editorState.tracking && waited < 5000; waited += 50) await sleep(50);
  const id = pageId();
  const copy = pendingEdit(id);
  if (!copy || !body.editMode || pageId() !== id) return null;
  // (a copy of the page as it's saved: nothing to bring back)
  if (contentKey(copy.content) === contentKey(body.innerHTML)) {
    dropCopy(id);
    return null;
  }
  // edits to the page as it was saved before (a save that got no answer
  // may still have been written): restoring puts that page back with them
  const since = copy.base && copy.base !== baseOf();
  // (while it's asked, and after Not now, nothing replaces it or drops it)
  kept = id;
  const choice = await confirmDialog().ask({
    title: `Restore unsaved edits from ${copyTime(copy)}?`,
    text: since
      ? `Changes to ${name || "this page"} weren't saved when it was last open, and the page has been saved since. Restore puts back the page as it was then, with those changes, in place of what's saved now. Undo takes them out again. Not now keeps them for next time.`
      : `Changes to ${name || "this page"} weren't saved when it was last open. Restore puts them back on the page, and Undo takes them out again. Not now keeps them for next time.`,
    actions: [
      { id: "later", label: "Not now" },
      { id: "discard", label: "Discard them", kind: "destructive" },
      { id: "restore", label: "Restore", kind: "primary" },
    ],
    opener,
  });
  if (choice !== "later") kept = "";
  if (!body.editMode || pageId() !== id) return null;
  if (choice === "discard") dropCopy(id);
  if (choice !== "restore") return choice;
  // past any hold on HAX's own imports (import-hold.js)
  globalThis.customElements.get("hax-body").prototype.importContent.call(body, await withDetailsNow(body, copy.content));
  for (let i = 0; i < 100 && body._contentState?.getState("importing"); i++) await sleep(25);
  return "restore";
}

// the copy, with the page's details as they are now: the copy's
// page-break has them as editing began then, and HAXcms writes them back
// with the page (a title changed, or the page unpublished, since)
async function withDetailsNow(body, content) {
  const now = body.firstElementChild?.localName === "page-break" ? body.firstElementChild : null;
  if (!now) return content;
  const rest = String(content).replace(/^\s*<page-break\b[^>]*>[\s\S]*?<\/page-break>/i, "");
  return `${await haxStore().nodeToContent(now)}\n${rest.trim()}`;
}

let installed = false;
export function installRecovery() {
  if (installed) return;
  installed = true;
  globalThis.customElements.whenDefined("haxcms-site-editor").then(() => takeOver(globalThis.customElements.get("haxcms-site-editor")));
  globalThis.addEventListener("haxcms-edit-mode-changed", (e) => follow(!!e.detail));
  // discarding the changes drops their copy too
  globalThis.addEventListener("hax-cancel", () => forgetCopy());
  // the page going (a reload or a close the author agreed to): what's
  // changed in the last 2 s too
  globalThis.addEventListener("pagehide", takeCopy);
  if (activeBody()?.editMode) follow(true);
}
