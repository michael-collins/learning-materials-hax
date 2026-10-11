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
import { formatHTML } from "@haxtheweb/utils/utils.js";
import { confirmDialog } from "../ui/oer-confirm.js";
import { getEditRange, setEditRange } from "../ui/edit-selection.js";
import { editorState } from "./editor-state.js";
import { holdImports } from "./import-hold.js";
import { dropCopy, forgetCopy, keepCopySoon } from "./recovery.js";
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
 * before the page has arrived (docs/editor-spikes/lifecycle.md change 17),
 * or HTML typed in Edit HTML and not applied yet. Right after editing
 * begins it waits for the baseline.
 */
export async function unsaved() {
  for (let waited = 0; store.editMode && !editorState.tracking && waited < 3000; waited += 50) await sleep(50);
  editorState._measure();
  return editorState.dirty || !!(await unappliedSource());
}

/**
 * Leave the editor, dropping its changes (stock _cancelEditing, without
 * HAX's question), and this session's copy of them, though not one the
 * author chose to keep for later (recovery.js).
 */
export function discardEdits() {
  const ui = stockUI();
  if (!ui || !store.editMode) return;
  forgetCopy();
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

/* ---------- Edit HTML ---------- */

const tidy = (html) => String(html ?? "").replace(/\r\n?/g, "\n").trim();

/**
 * Edit HTML (HAX's view-source panel, which oer-settings-dialog shows)
 * holding HTML that isn't on the page yet: the panel, or null. Its code
 * starts as formatHTML() of the page (hax-view-source.js updateEditor), so
 * anything else has been typed.
 */
async function unappliedSource() {
  const tray = haxStore()?.haxTray;
  const body = activeBody();
  if (tray?.getAttribute("data-oer-dialog") !== "source" || !body?.editMode) return null;
  const view = tray.shadowRoot?.querySelector("#view-source");
  const typed = tidy(view?.shadowRoot?.querySelector("#textarea")?.value);
  // (still loading: nothing typed yet)
  if (!typed) return null;
  return typed === tidy(formatHTML(await body.haxToContent())) ? null : view;
}

// what's typed in Edit HTML goes on the page before it's saved, as its
// Update HTML puts it there (hax-view-source.js updateBodyFromHTML), past
// any hold on HAX's imports (import-hold.js); and the dialog closes
async function applySource() {
  const view = await unappliedSource();
  const body = activeBody();
  if (view && body) {
    let typed = view.shadowRoot.querySelector("#textarea").value;
    const first = body.firstElementChild;
    if (first?.localName === "page-break" && !typed.includes("<page-break")) typed = `${await haxStore().nodeToContent(first)}\n${typed}`;
    globalThis.customElements.get("hax-body").prototype.importContent.call(body, typed);
    haxStore().haxTray.trayDetail = "";
    await sleep(0);
    for (let i = 0; i < 200 && body._contentState?.getState("importing"); i++) await sleep(25);
    await frame();
    editorState._measure();
  }
  closeSource();
}

/** Close Edit HTML (or a block's settings) if it's open. */
export function closeSource() {
  globalThis.document.querySelector("oer-settings-dialog")?.close?.();
}

/* ---------- saving ---------- */

// no answer from the server by then: editing goes on, with every edit
const ANSWER_WITHIN = 20000;
// how long the edited page is held while HAX reloads the saved one, and
// the most, while HAX is still loading it then (lifecycle.md change 18)
const RELOAD_WITHIN = 20000;
const RELOAD_MOST = 60000;
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
 * (recovery.js). Preview ends first, and HTML typed in Edit HTML goes on
 * the page first. On an error, or no answer in 20 s, editing goes on with
 * every edit and the caret, and the status says why (saveError); an
 * answer after that still counts (answerLate). Resolves to { ok, reason }.
 * One save at a time.
 */
export function savePage() {
  saving ??= save().finally(() => (saving = null));
  return saving;
}

const NOT_EDITING = { ok: false, reason: "not editing" };

async function save() {
  if (!store.editMode || !activeBody()?.editMode || !siteEditor()) return NOT_EDITING;
  // (the editing bar's Preview, which this module doesn't import)
  if (editorState.preview) globalThis.dispatchEvent(new CustomEvent("oer-preview-end"));
  await applySource();
  const body = activeBody();
  if (!store.editMode || !body?.editMode || editorState.preview) return NOT_EDITING;
  const sent = body.innerHTML;
  const refocus = keepFocus(body);
  editorState.set({ saving: true, saveError: "", savedAt: 0 });
  body.inert = true;
  body.setAttribute("aria-busy", "true");
  const release = holdImports();
  const asked = request();
  // HAX's reload of the saved page, followed from its answer on
  let waiting = true;
  let reload = null;
  asked.hooks.push((answer) => waiting && answer.ok && (reload = watchReload(siteBuilder())));
  next = asked;
  globalThis.dispatchEvent(new CustomEvent("haxcms-save-node", { bubbles: true, composed: true, cancelable: false, detail: toJS(store.activeItem) }));
  const answer = await Promise.race([asked.answered, sleep(ANSWER_WITHIN).then(() => null)]);
  waiting = false;
  if (next === asked) next = null;
  if (!answer?.ok) {
    reload?.stop();
    release();
    body.inert = false;
    body.removeAttribute("aria-busy");
    refocus();
    const reason = answer?.reason || (asked.sent ? "No answer from the server" : "The page wasn't sent");
    editorState.set({ saving: false, saveError: reason });
    if (!answer && asked.sent) answerLate(asked, body, sent);
    return { ok: false, reason };
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

/*
 * Each save hears its own answer (lifecycle.md S5 and change 3). HAX's
 * saveNode sends the page with _requestJson (requestId "nodeupdateajax"),
 * whose onSuccess means the server has saved it; a failure goes to
 * lastErrorChanged with the request (its target's body is the payload
 * sent), except that 401, 403 and 405 first try a fresh sign-in and send
 * it again. save() marks the request it's about to send (next), and
 * installEditBar pins saveAnswers on the site editor: a request's answer
 * is its own, however late, never a later save's. And an older page the
 * server writes after a newer one (a try that timed out, answered after
 * Try again had saved) is written over with the newer one again, which
 * HAX isn't told about: it has the newer page already, and shows it.
 */
let seq = 0;
// the save about to send its request, and the last one the server saved
let next = null;
let newest = null;
const requests = new WeakMap();

function request() {
  let resolve;
  const asked = { seq: ++seq, sent: false, resent: false, answer: null, send: null, hooks: [] };
  asked.answered = new Promise((r) => (resolve = r));
  // (hooks run as the answer comes, before HAX handles it)
  asked.settle = (answer) => {
    if (asked.answer) return;
    asked.answer = answer;
    for (const hook of asked.hooks) hook(answer);
    resolve(answer);
  };
  return asked;
}

/** The site editor's _requestJson and lastErrorChanged, as saves hear them (pinned by installEditBar). */
export const saveAnswers = {
  _requestJson: (original) =>
    function (options = {}) {
      const asked = options?.requestId === "nodeupdateajax" ? next : null;
      if (!asked) return original.call(this, options);
      next = null;
      const onSuccess = options.onSuccess;
      const sending = {
        ...options,
        onSuccess: (response, target) => {
          // (the newer page sent again: HAX has it, and shows it, already)
          if (asked.resent) return void (asked.resent = false);
          if (newest && newest.seq > asked.seq) {
            asked.settle({ ok: false, stale: true, reason: "Saved again since" });
            newest.resent = true;
            newest.send();
            return;
          }
          newest = asked;
          asked.settle({ ok: true });
          return onSuccess?.(response, target);
        },
      };
      asked.sent = true;
      asked.send = () => original.call(this, sending);
      requests.set(options.payload, asked);
      return asked.send();
    },
  lastErrorChanged: (original) =>
    function (e) {
      const asked = requests.get(e?.detail?.target?.body);
      if (!asked || asked.answer) return original.call(this, e);
      const value = e.detail.value || {};
      const status = Number(value.status);
      let signedOut = false;
      const onLogout = () => (signedOut = true);
      globalThis.addEventListener("jwt-login-logout", onLogout);
      try {
        return original.call(this, e);
      } finally {
        globalThis.removeEventListener("jwt-login-logout", onLogout);
        if (signedOut) asked.settle({ ok: false, reason: "You've been signed out. Sign in again to save" });
        else if (![401, 403, 405].includes(status) || !this.jwt) asked.settle({ ok: false, reason: `${status || ""} ${value.statusText || "The request failed"}`.trim() });
      }
    },
};

// an answer after the time ran out: the page was saved as sent, which in
// the session it was sent from is what "no changes" means now; and HAX's
// reload of it mustn't reach the editor, where the author has gone on
function answerLate(asked, body, sent) {
  const session = editorState.__entry;
  asked.hooks.push((answer) => {
    if (!answer.ok || !body.editMode) return;
    keepThroughReload();
    if (editorState.__entry !== session) return;
    editorState._baseline(body, sent);
    editorState.set({ saveError: "", savedAt: Date.now() });
    // (HAX drops the copy of unsaved edits as it saves: a copy of what's
    // changed since)
    keepCopySoon();
  });
}

// while HAX reloads the page after a save it has heard back about, its
// imports into the editor are held
function keepThroughReload() {
  const release = holdImports();
  const reload = watchReload(siteBuilder());
  reload.settled().then(() => {
    reload.stop();
    release();
  });
}

/*
 * HAX's loads and redraws after a save (docs/editor-spikes/lifecycle.md
 * change 1): its page and site loads and each redraw of the reading copy,
 * followed while any save watches (a late answer can come while another
 * save waits for its own), with one wrapper each.
 */
const loads = { watchers: 0, busy: 0, last: 0, undo: [] };
const touch = () => (loads.last = performance.now());

function followLoads(builder) {
  if (loads.watchers++) return;
  Object.assign(loads, { busy: 0, undo: [] });
  touch();
  for (const name of ["loadPageData", "loadJOSData", "_activeItemContentChanged"]) {
    const original = builder?.[name];
    if (typeof original !== "function") continue;
    const own = Object.prototype.hasOwnProperty.call(builder, name);
    builder[name] = function (...args) {
      loads.busy++;
      touch();
      const out = original.apply(this, args);
      Promise.resolve(out).finally(() => {
        loads.busy--;
        touch();
      });
      return out;
    };
    loads.undo.push(() => (own ? (builder[name] = original) : delete builder[name]));
  }
  globalThis.addEventListener("json-outline-schema-active-body-changed", touch);
}

function unfollowLoads() {
  if (--loads.watchers) return;
  loads.undo.forEach((f) => f());
  loads.undo = [];
  globalThis.removeEventListener("json-outline-schema-active-body-changed", touch);
}

/**
 * Follow HAX's reload after a save heard back about. settled() resolves
 * once the reload has begun (haxcms-trigger-update-node) and ended and
 * nothing has moved for 300 ms; or after 20 s, or a minute while HAX is
 * still loading.
 */
function watchReload(builder) {
  let begun = false;
  let stopped = false;
  const onNode = () => {
    begun = true;
    touch();
  };
  followLoads(builder);
  globalThis.addEventListener("haxcms-trigger-update-node", onNode);
  return {
    async settled() {
      const start = performance.now();
      for (;;) {
        const now = performance.now();
        const idle = !loads.busy && !builder?.loading && !builder?.__pendingPageLoad;
        if (begun && idle && now - loads.last >= RELOAD_QUIET) return true;
        if (now - start >= (idle ? RELOAD_WITHIN : RELOAD_MOST)) return false;
        await sleep(25);
      }
    },
    stop() {
      if (stopped) return;
      stopped = true;
      globalThis.removeEventListener("haxcms-trigger-update-node", onNode);
      unfollowLoads();
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
