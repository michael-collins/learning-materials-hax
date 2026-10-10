/**
 * Helpers for driving HAX's stock editor from our own UI.
 *
 * The stock haxcms-site-editor-ui stays mounted but hidden (see index.js);
 * it owns save/cancel logic, dialogs, shortcuts and Merlin programs. We call
 * the same methods its template binds. simple-toolbar-button overrides
 * click(), so synthetic clicks on its buttons never reach those handlers.
 */
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { confirmDialog } from "../ui/oer-confirm.js";

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
export const savePage = () => callStock("_editButtonTap", "#editbutton");
export const openOutline = () => callStock("_outlineButtonTap", "#outlinebutton");
export const openSiteSettings = () => callStock("_manifestButtonTap", "#manifestbtn");
export const toggleLock = () => callStock("_toggleLockedStatus", "#lockbutton");
export const logout = () => stockUI()?._logout?.();
export const undo = () => haxStore()?.activeHaxBody?.undo?.();
export const redo = () => haxStore()?.activeHaxBody?.redo?.();

/**
 * Leave the editor without saving: at once when nothing has changed,
 * otherwise once the author has said to discard their changes (HAX's own
 * question offers only "Cancel" and "OK"). Changed means what HAX would
 * save differs from the copy taken when the page arrived in the editor
 * (watchBaseline). Called from a click, focus goes back to the button
 * after "Keep editing" (Safari doesn't focus a button that's clicked).
 */
export async function cancelEdit(e) {
  const opener = e?.currentTarget instanceof HTMLElement ? e.currentTarget : undefined;
  const ui = stockUI();
  if (!ui) return;
  const body = haxStore()?.activeHaxBody;
  if (body && (await unsaved(body, ui))) {
    const title = store.activeItem?.title;
    const choice = await confirmDialog().ask({
      title: "Leave without saving?",
      text: `Your changes${title ? ` to “${title}”` : ""} will be lost.`,
      actions: [
        { id: "keep", label: "Keep editing" },
        { id: "discard", label: "Discard changes", kind: "destructive" },
      ],
      opener,
      fallback: body,
    });
    if (choice !== "discard" || !store.editMode) return;
  }
  ui._cancelEditing(fakeEvent(ui.shadowRoot?.querySelector("#cancelbutton")));
}

/* ---------- the page as it was when editing began ---------- */

let baseline = null; // what HAX would save, normalized, once the page has arrived
let session = 0; // counts edit mode starting and ending
let arriving = 0; // the session whose copy is being taken
let watching = false;

// a page's HTML without what HAX adds while editing, or white space between tags
function normalizedHtml(html) {
  const t = globalThis.document.createElement("template");
  t.innerHTML = html;
  for (const el of t.content.querySelectorAll("*")) {
    for (const a of [...el.attributes]) {
      if (a.name.startsWith("data-hax-") || a.name === "contenteditable" || a.name === "draggable") el.removeAttribute(a.name);
    }
    if (el.getAttribute("role") === "textbox") el.removeAttribute("role");
    if (el.hasAttribute("class")) {
      const kept = [...el.classList].filter((c) => !c.startsWith("hax-"));
      if (kept.length) el.setAttribute("class", kept.join(" "));
      else el.removeAttribute("class");
    }
  }
  return t.innerHTML.replace(/>\s+</g, "><").trim();
}

/**
 * Take the "nothing changed" copy of the page (what HAX would save) once
 * HAX has imported the page into hax-body: at its first
 * hax-body-content-ready while editing, when the import is done and no
 * block has come or gone for 300 ms. HAX's own copy (_originalContent,
 * haxcms-site-editor-ui.js _editModeChanged 8103–8110) is taken on a
 * 100 ms timer as editing starts, but the page is imported 250–700 ms
 * later (haxcms-site-editor.js 57–72, hax-body.js importContent
 * 3563–3650): in Firefox and Safari it was empty, and Cancel always asked
 * to discard. HAX's copy is set to this one too.
 */
export function watchBaseline() {
  if (watching) return;
  watching = true;
  autorun(() => {
    toJS(store.editMode);
    session++;
    baseline = null;
  });
  globalThis.addEventListener("hax-body-content-ready", (e) => {
    const body = e.detail?.body;
    if (!body || !store.editMode || baseline !== null || arriving === session) return;
    const mine = (arriving = session);
    let changed = performance.now();
    const observer = new MutationObserver(() => (changed = performance.now()));
    observer.observe(body, { childList: true });
    const settled = async () => {
      if (mine !== session) return observer.disconnect();
      if (body._contentState?.getState?.("importing") || performance.now() - changed < 300) return void setTimeout(settled, 50);
      observer.disconnect();
      const html = await body.haxToContent();
      if (mine !== session) return;
      const ui = stockUI();
      if (ui) ui._originalContent = html;
      baseline = normalizedHtml(html);
    };
    setTimeout(settled, 50);
  });
}

/**
 * Whether the page has changed since it arrived in the editor. Cancel
 * straight after Edit content waits for that copy (a second or so in
 * Firefox); without one it compares with HAX's own, as HAX does.
 */
async function unsaved(body, ui) {
  const mine = session;
  for (let waited = 0; baseline === null && mine === session && waited < 3000; waited += 50) await new Promise((r) => setTimeout(r, 50));
  const now = await body.haxToContent();
  return baseline === null ? now !== ui._originalContent : normalizedHtml(now) !== baseline;
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

/** The theme's scrolling content area, for clipping overlays below the header. */
export function contentViewport() {
  const main = globalThis.document.querySelector("custom-oer-docs-theme")?.shadowRoot?.querySelector("main");
  const r = main?.getBoundingClientRect();
  return r ? { top: r.top, bottom: r.bottom } : { top: 0, bottom: globalThis.innerHeight };
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
