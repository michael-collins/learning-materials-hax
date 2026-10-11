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
 * or HTML typed in Edit HTML and not applied yet. What's typed in a field
 * that commits as focus leaves it is committed first. Right after editing
 * begins it waits for the baseline.
 */
export async function unsaved() {
  for (let waited = 0; store.editMode && !editorState.tracking && waited < 3000; waited += 50) await sleep(50);
  await commitField();
  editorState._measure();
  return editorState.dirty || !!(await unappliedSource());
}

/**
 * Whether something is typed and not on the page yet, as far as can be
 * told at once (beforeunload can't wait): in Edit HTML, or in a field that
 * commits as focus leaves it.
 */
export function typedNotOnPage() {
  return !!typedField() || sourceTyped();
}

/* ---------- fields that commit as focus leaves them ---------- */

// a text field in the content typed in since it last committed: an
// image's address (oer-image-field) puts what's typed on the page on
// `change`, as focus leaves it or Enter is pressed. (Typing is followed,
// not focus: a focus move inside the editor's shadow roots is never heard
// outside them.)
let typedIn = null;

function inContent(el) {
  const body = activeBody();
  for (let n = el; n; n = n.parentElement || n.getRootNode().host) if (n === body) return true;
  return false;
}

/** Follow typing in the content's text fields (from installLeaveGuard). */
export function followFields() {
  globalThis.addEventListener(
    "input",
    (e) => {
      const el = e.composedPath()[0];
      if (!store.editMode || el === typedIn || el?.localName !== "input" || el.type !== "text" || !inContent(el)) return;
      typedIn = el;
      el.addEventListener("change", () => typedIn === el && (typedIn = null), { once: true });
    },
    true,
  );
}

// the field focus is in, when it holds what's typed and not committed
function typedField() {
  if (!typedIn?.isConnected) return null;
  let el = globalThis.document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el === typedIn ? el : null;
}

// what's typed there, committed as Enter would (and the field's own
// element has drawn the change)
async function commitField() {
  const el = typedField();
  if (!el) return;
  el.dispatchEvent(new Event("change", { bubbles: true }));
  await frame();
  await frame();
}

/**
 * Leave the editor, dropping its changes (stock _cancelEditing, without
 * HAX's question), and this session's copy of them, though not one the
 * author chose to keep for later (recovery.js).
 */
export function discardEdits() {
  const ui = stockUI();
  if (!ui || !store.editMode) return;
  forgetCopy(pageId());
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

// the same, at once: the code as typed against the code as it was loaded
// (code-editor keeps that as editorValue)
function sourceTyped() {
  const tray = haxStore()?.haxTray;
  if (tray?.getAttribute("data-oer-dialog") !== "source" || !activeBody()?.editMode) return false;
  const code = tray.shadowRoot?.querySelector("#view-source")?.shadowRoot?.querySelector("#textarea");
  return !!code?.editorValue && tidy(code.value) !== tidy(code.editorValue);
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
// the most the edited page is held while HAX reloads the saved one
// (lifecycle.md change 18; HAX's loading flag can stay up after a failed
// load, haxcms-site-builder.js loadJOSData)
const RELOAD_WITHIN = 20000;
// HAX's reload has settled when nothing has moved for this long
const RELOAD_QUIET = 300;

const activeBody = () => haxStore()?.activeHaxBody ?? null;
const siteEditor = () => store.cmsSiteEditor?.instance ?? null;
const siteBuilder = () => globalThis.document.querySelector("haxcms-site-builder");
// the page on screen, by its id
const pageId = () => String(toJS(store.activeItem)?.id ?? "");
// the page hax-body holds, by its page-break (which HAXcms saves it to)
const heldPage = (body) => (body.firstElementChild?.localName === "page-break" ? body.firstElementChild.getAttribute("item-id") || "" : "");

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
 * One save at a time. A page that isn't the one on screen is never sent:
 * HAXcms saves hax-body to the page its page-break names, with the details
 * of the page on screen (custom-oer-docs-theme.js __beforeSave).
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
  const page = pageId();
  const held = heldPage(body);
  if (held && held !== page) {
    const reason = "The page shown isn't the one being edited";
    editorState.set({ saveError: reason });
    return { ok: false, reason };
  }
  const sent = body.innerHTML;
  const refocus = keepFocus(body);
  editorState.set({ saving: true, saveError: "", savedAt: 0 });
  body.inert = true;
  body.setAttribute("aria-busy", "true");
  const release = holdImports();
  const asked = request(page);
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
  dropCopy(page);
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
  const range = caretBefore(body);
  return () => {
    if (!range || !body.isConnected || !range.startContainer.isConnected) return;
    body.focus({ preventScroll: true });
    setEditRange(range);
  };
}

/* ---------- the caret as a control was pressed ---------- */

// where the caret was as the last press began, before the press took focus
// out of the content: to the control in Chrome, to <body> in Safari and
// Firefox on macOS, which don't focus a clicked button. A key pressed
// since forgets it (the author has moved on by keyboard).
let pressedCaret = null;

function deepActive() {
  let el = globalThis.document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el;
}

/** Follow presses for caretBefore (from installEditBar). */
export function followPresses() {
  globalThis.addEventListener(
    "pointerdown",
    () => {
      const body = activeBody();
      pressedCaret = body?.editMode && deepActive() === body ? getEditRange(body) : null;
    },
    true,
  );
  globalThis.addEventListener("keydown", () => (pressedCaret = null), true);
}

/**
 * The caret in the content (a Range), as it is, or as it was when the
 * control being used now was pressed; null when it wasn't in the content.
 */
export function caretBefore(body) {
  const range = deepActive() === body ? getEditRange(body) : pressedCaret;
  return range?.startContainer.isConnected && body.contains(range.startContainer) ? range : null;
}

/*
 * Each save hears its own answer (lifecycle.md S5 and change 3). HAX's
 * saveNode sends the page with _requestJson (requestId "nodeupdateajax"),
 * whose onSuccess means the server has saved it; a failure goes to
 * lastErrorChanged with the request (its target's body is the payload
 * sent), except that 401, 403 and 405 first try a fresh sign-in and send
 * it again. save() marks the request it's about to send (next), and
 * installEditBar pins saveAnswers on the site editor: a request's answer
 * is its own, however late, never a later save's. An older version of a
 * page the server writes after a newer one (a try that timed out, answered
 * after Try again had saved) is written over with the newer one again,
 * which HAX isn't told about: it has the newer page already, and shows it.
 * And an answer about a page that isn't on screen any more (the author has
 * gone on to another) isn't HAX's to handle: it takes every answer for the
 * page on screen, and would move to the saved page's address mid-edit
 * (_handleNodeResponse). HAX's copy of the site is reloaded instead.
 */
let seq = 0;
// the save about to send its request, and the last one the server saved of each page
let next = null;
const newest = new Map();
const requests = new WeakMap();

function request(page) {
  let resolve;
  const asked = { seq: ++seq, page, session: editorState.__entry, sent: false, resent: false, answer: null, send: null, hooks: [] };
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
          const last = newest.get(asked.page);
          if (last && last.seq > asked.seq) {
            asked.settle({ ok: false, stale: true, reason: "Saved again since" });
            last.resent = true;
            last.send();
            return;
          }
          newest.set(asked.page, asked);
          asked.settle({ ok: true });
          if (asked.page !== pageId()) return reloadSite();
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

// an answer after the time ran out, about the page still being edited: it
// was saved as sent, which in the session it was sent from is what "no
// changes" means now; and HAX's reload of it mustn't reach the editor,
// where the author has gone on. (About another page: saveAnswers.)
function answerLate(asked, body, sent) {
  asked.hooks.push((answer) => {
    if (!answer.ok || !body.editMode || asked.page !== pageId()) return;
    keepThroughReload();
    if (editorState.__entry === asked.session) {
      editorState._baseline(body, sent);
      editorState.set({ saveError: "", savedAt: Date.now() });
    }
    // (the copy of unsaved edits, made again from what's changed since)
    keepCopySoon();
  });
}

// while HAX reloads the page after a save it has heard back about, its
// imports into the editor are held; begun: the reload is under way
// already (no haxcms-trigger-update-node to wait for)
function keepThroughReload({ begun = false } = {}) {
  const release = holdImports();
  const reload = watchReload(siteBuilder(), { begun });
  reload.settled().then(() => {
    reload.stop();
    release();
  });
}

// a page saved that isn't on screen: HAX's copy of the site (its details,
// and the time that keeps pages from coming from the browser's cache)
// catches up, past the page being edited, if one is
function reloadSite() {
  keepThroughReload({ begun: true });
  globalThis.dispatchEvent(new CustomEvent("haxcms-trigger-update", { bubbles: true, composed: true, cancelable: false, detail: true }));
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
 * once the reload has begun (haxcms-trigger-update-node, unless begun) and
 * ended and nothing has moved for 300 ms; or after 20 s.
 */
function watchReload(builder, { begun = false } = {}) {
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
        if (now - start >= RELOAD_WITHIN) return false;
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
