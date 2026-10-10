/**
 * Helpers for driving HAX's stock editor from our own UI.
 *
 * The stock haxcms-site-editor-ui stays mounted but hidden (see index.js);
 * it owns save/cancel logic, dialogs, shortcuts and Merlin programs. We call
 * the same methods its template binds. simple-toolbar-button overrides
 * click(), so synthetic clicks on its buttons never reach those handlers.
 *
 * Saving and leaving are ours (nu-hax docs/editor-redesign/spec.md §3.3,
 * docs/editor-spikes/lifecycle.md S5): savePage() saves with the edited
 * page held on screen and lands on the saved page; cancelEdit() (Exit)
 * leaves at once when nothing changed, or asks.
 */
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { confirmDialog } from "../ui/oer-confirm.js";
import { getEditRange, setEditRange } from "../ui/edit-selection.js";
import { editorState } from "./editor-state.js";
import { holdImports } from "./import-hold.js";
import { dropCopy } from "./recovery.js";
import { siteData, COURSE_SITE_TYPE } from "../types/course-site.js";

export const PANELS = ["content-add", "content-edit", "content-map", "view-source"];

export function stockUI() {
  return store.cmsSiteEditor?.haxCmsSiteEditorUIElement ?? null;
}

export function haxStore() {
  return globalThis.HaxStore?.requestAvailability?.() ?? null;
}

const fakeEvent = (target) => ({ target, preventDefault() {}, stopPropagation() {} });

/** Call a stock editor-ui handler, e.g. "_editButtonTap". */
export function callStock(method, selector) {
  const ui = stockUI();
  if (!ui) return;
  const target = selector ? ui.shadowRoot?.querySelector(selector) : null;
  ui[method]?.(fakeEvent(target));
}

export const editPage = () => callStock("_editButtonTap", "#editbutton");
export const openOutline = () => callStock("_outlineButtonTap", "#outlinebutton");
export const openSiteSettings = () => callStock("_manifestButtonTap", "#manifestbtn");
export const toggleLock = () => callStock("_toggleLockedStatus", "#lockbutton");
export const logout = () => stockUI()?._logout?.();

/**
 * What the editor calls the page being edited, in a sentence: "DART 413
 * course site", or its title in quotes.
 */
export function pageName(item = toJS(store.activeItem)) {
  if (item?.metadata?.pageType === COURSE_SITE_TYPE) {
    const { code } = siteData(item, toJS(store.manifest?.items) || []);
    return code ? `${code} course site` : "this course site";
  }
  return item?.title ? `“${item.title}”` : "this page";
}

/* ---------- leaving ---------- */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const frame = () => new Promise((r) => requestAnimationFrame(r));
// the control an event came from (Safari doesn't focus a clicked button)
const controlOf = (e) => (e?.currentTarget instanceof HTMLElement ? e.currentTarget : null);

/**
 * Whether the page has changes to lose: the editor's own baseline
 * (editor-state.js), not HAX's copy, which in Firefox and Safari is taken
 * before the page has arrived (docs/editor-spikes/lifecycle.md change 17).
 * Right after editing begins it waits for the baseline.
 */
async function unsaved() {
  for (let waited = 0; store.editMode && !editorState.tracking && waited < 3000; waited += 50) await sleep(50);
  editorState._measure();
  return editorState.dirty;
}

/** Leave the editor, dropping its changes (stock _cancelEditing, without HAX's question). */
export function discardEdits() {
  const ui = stockUI();
  if (!ui || !store.editMode) return;
  dropCopy();
  ui._cancelEditing(fakeEvent(ui.shadowRoot?.querySelector("#cancelbutton")));
}

/**
 * Exit: leave the editor at once when nothing has changed; otherwise ask
 * "Leave without saving?" with Keep editing, Discard changes and Save and
 * exit (HAX's own question offers only Cancel and OK). From a click, focus
 * goes back to the button on Keep editing.
 */
export async function cancelEdit(e) {
  const opener = controlOf(e);
  if (!store.editMode || editorState.saving) return;
  if (!(await unsaved())) return discardEdits();
  const choice = await confirmDialog().ask({
    title: "Leave without saving?",
    text: `Your changes to ${pageName()} will be lost.`,
    actions: [
      { id: "keep", label: "Keep editing" },
      { id: "discard", label: "Discard changes", kind: "destructive" },
      { id: "save", label: "Save and exit", kind: "primary" },
    ],
    opener,
  });
  if (!store.editMode) return;
  if (choice === "discard") discardEdits();
  else if (choice === "save") savePage();
  else if (opener?.isConnected) opener.focus();
}

/* ---------- saving ---------- */

// no answer from the server by then: editing goes on, with every edit
const ANSWER_WITHIN = 20000;
// the most the edited page is held while HAX reloads the saved one
const RELOAD_WITHIN = 20000;
// HAX's reload has settled when nothing has moved for this long
const RELOAD_QUIET = 300;

const activeBody = () => haxStore()?.activeHaxBody ?? null;
const siteEditor = () => store.cmsSiteEditor?.instance ?? null;
const siteBuilder = () => globalThis.document.querySelector("haxcms-site-builder");

let saving = null;

/**
 * Save the page and land on the saved page (spec §3.3, lifecycle S5). The
 * edited page stays on screen, inert and busy, with "Saving…", while HAX
 * saves it with edit mode still on (haxcms-save-node, as its own toggle
 * sends it, so the theme's __beforeSave runs first); then until HAX's
 * reload of the saved page has settled, with HAX's imports into the
 * editor held (import-hold.js), so the page from before never shows. Then
 * editing ends, on the saved page, and the copy of unsaved edits goes
 * (recovery.js). On an error, or no answer in 20 s, editing goes on with
 * every edit and the caret, and the status says why (saveError); an
 * answer after that still counts: what was sent is then what "no changes"
 * means. Resolves to { ok, reason }. One save at a time.
 */
export function savePage() {
  saving ??= save().finally(() => (saving = null));
  return saving;
}

async function save() {
  const body = activeBody();
  const editor = siteEditor();
  if (!store.editMode || !body?.editMode || !editor || editorState.preview) return { ok: false, reason: "not editing" };
  const sent = body.innerHTML;
  const refocus = keepFocus(body);
  editorState.set({ saving: true, saveError: "", savedAt: 0 });
  body.inert = true;
  body.setAttribute("aria-busy", "true");
  const release = holdImports();
  const reload = watchReload(siteBuilder());
  const answer = answerOf(editor);
  globalThis.dispatchEvent(new CustomEvent("haxcms-save-node", { bubbles: true, composed: true, cancelable: false, detail: toJS(store.activeItem) }));
  const result = await answer.first;
  if (!result.ok) {
    body.inert = false;
    body.removeAttribute("aria-busy");
    refocus();
    editorState.set({ saving: false, saveError: result.reason });
    if (!result.late) {
      reload.stop();
      release();
      return result;
    }
    // the server may answer yet: then the page was saved as sent, and
    // HAX's reload mustn't reach the editor, where the author goes on
    result.late.then(async () => {
      if (body.editMode) {
        editorState._baseline(body, sent);
        editorState.set({ saveError: "", savedAt: Date.now() });
        dropCopy();
      }
      await reload.settled();
      reload.stop();
      release();
    });
    return result;
  }
  await reload.settled();
  reload.stop();
  dropCopy();
  store.editMode = false;
  await frame();
  release();
  body.inert = false;
  body.removeAttribute("aria-busy");
  editorState.set({ saving: false, savedAt: Date.now() });
  return { ok: true };
}

// the caret, to put back when the page stops being inert after a failed
// save (inert takes focus to <body>)
function keepFocus(body) {
  let el = globalThis.document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  const range = el === body ? getEditRange(body) : null;
  return () => {
    if (!range || !body.isConnected || !range.startContainer.isConnected) return;
    body.focus({ preventScroll: true });
    setEditRange(range);
  };
}

/**
 * HAX's answer to a save: { ok: true } from its node response; { ok:
 * false, reason } from its error handler (but 401 and 403 first try a
 * fresh sign-in and send it again, so they count only without one); or no
 * answer in time: { ok: false, reason, late }, late resolving if the
 * answer still comes (haxcms-site-editor.js _handleNodeResponse,
 * lastErrorChanged).
 */
let stopAnswering = () => {};
function answerOf(editor) {
  stopAnswering();
  let settle;
  let lateSettle;
  let timedOut = false;
  const first = new Promise((r) => (settle = r));
  const late = new Promise((r) => (lateSettle = r));
  const undo = [];
  const wrap = (name, wrapper) => {
    const own = Object.prototype.hasOwnProperty.call(editor, name);
    const original = editor[name];
    editor[name] = wrapper(original);
    undo.push(() => (own ? (editor[name] = original) : delete editor[name]));
  };
  const timer = setTimeout(() => {
    timedOut = true;
    settle({ ok: false, reason: "No answer from the server", late });
  }, ANSWER_WITHIN);
  stopAnswering = () => {
    clearTimeout(timer);
    undo.forEach((f) => f());
    stopAnswering = () => {};
  };
  wrap("_handleNodeResponse", (handled) =>
    function (...args) {
      stopAnswering();
      if (timedOut) lateSettle();
      else settle({ ok: true });
      return handled.apply(this, args);
    },
  );
  wrap("lastErrorChanged", (failed) =>
    function (e) {
      const value = e?.detail?.value || {};
      const status = Number(value.status);
      const out = failed.call(this, e);
      if (![401, 403, 405].includes(status) || !editor.jwt) {
        stopAnswering();
        if (!timedOut) settle({ ok: false, reason: `${status || ""} ${value.statusText || "The request failed"}`.trim() });
      }
      return out;
    },
  );
  return { first };
}

/**
 * Follow HAX's reload after a save (docs/editor-spikes/lifecycle.md
 * change 1): its page and site loads and each redraw of the reading copy.
 * settled() resolves once the reload has begun and ended and nothing has
 * moved for 300 ms, or after 20 s.
 */
function watchReload(builder) {
  let begun = false;
  let busy = 0;
  let last = performance.now();
  const touch = () => (last = performance.now());
  const undo = [];
  for (const name of ["loadPageData", "loadJOSData", "_activeItemContentChanged"]) {
    const original = builder?.[name];
    if (typeof original !== "function") continue;
    const own = Object.prototype.hasOwnProperty.call(builder, name);
    builder[name] = function (...args) {
      busy++;
      touch();
      const out = original.apply(this, args);
      Promise.resolve(out).finally(() => {
        busy--;
        touch();
      });
      return out;
    };
    undo.push(() => (own ? (builder[name] = original) : delete builder[name]));
  }
  const onNode = () => {
    begun = true;
    touch();
  };
  globalThis.addEventListener("haxcms-trigger-update-node", onNode);
  globalThis.addEventListener("json-outline-schema-active-body-changed", touch);
  return {
    async settled() {
      const end = performance.now() + RELOAD_WITHIN;
      while (performance.now() < end) {
        const idle = !busy && !builder?.loading && !builder?.__pendingPageLoad;
        if (begun && idle && performance.now() - last >= RELOAD_QUIET) return true;
        await sleep(25);
      }
      return false;
    },
    stop() {
      undo.forEach((f) => f());
      globalThis.removeEventListener("haxcms-trigger-update-node", onNode);
      globalThis.removeEventListener("json-outline-schema-active-body-changed", touch);
    },
  };
}

export function addPage() {
  const btn = stockUI()?.shadowRoot?.querySelector("#addpagebutton");
  btn?.HAXCMSButtonClick?.(fakeEvent(btn));
}

/**
 * Show a panel in the editor side panel. Unlike stock haxButtonOp this
 * never toggles: selecting the current tab keeps it open.
 */
/**
 * Press a control in HAX's (hidden) block toolbar by its event-name, e.g.
 * "hax-plate-up". Clicks the control's inner native button, which runs its
 * handler; the custom element's own click() is overridden.
 */
export function pressPlate(eventName) {
  const plate = haxStore()?.activeHaxBody?.shadowRoot?.querySelector("hax-plate-context");
  const find = (root) => {
    for (const el of root?.querySelectorAll("*") || []) {
      if (el.getAttribute("event-name") === eventName) return el;
      const inner = el.shadowRoot && find(el.shadowRoot);
      if (inner) return inner;
    }
    return null;
  };
  const item = plate && (find(plate) || find(plate.shadowRoot));
  let button = null;
  const queue = [item?.shadowRoot];
  while (!button && queue.length) {
    const root = queue.shift();
    if (!root) continue;
    button = root.querySelector("button");
    for (const child of root.querySelectorAll("*")) queue.push(child.shadowRoot);
  }
  button?.click();
}

export function showPanel(name) {
  const tray = haxStore()?.haxTray;
  if (!tray || !PANELS.includes(name)) return;
  if (name === "view-source") {
    tray.shadowRoot?.querySelector("#view-source")?.openSource?.();
  }
  tray.trayDetail = name;
  tray.collapsed = false;
}

export function openCommandPalette(query = "") {
  const daemon = globalThis.SuperDaemonManager?.requestAvailability?.();
  if (!daemon) return;
  // runProgram + open() rather than waveWand(): waveWand renders the mini
  // popup first, and switching to the dialog mid-filter leaves the results
  // list stuck on "Loading"
  daemon.runProgram(query, "*");
  daemon.mini = false;
  daemon.wand = false;
  daemon.open();
}

export const isMac = /Mac|iPhone|iPad/.test(globalThis.navigator?.platform ?? "");
export const MOD = isMac ? "⌘" : "Ctrl";
export const DAEMON = isMac ? "⌘⇧K" : "Ctrl⇧K";
