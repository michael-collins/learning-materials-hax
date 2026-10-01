/**
 * Helpers for driving HAX's stock editor from our own UI.
 *
 * The stock haxcms-site-editor-ui stays mounted but hidden (see index.js);
 * it owns save/cancel logic, dialogs, shortcuts and Merlin programs. We call
 * the same methods its template binds. simple-toolbar-button overrides
 * click(), so synthetic clicks on its buttons never reach those handlers.
 */
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";

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
export const cancelEdit = () => callStock("_cancelButtonTap", "#cancelbutton");
export const openOutline = () => callStock("_outlineButtonTap", "#outlinebutton");
export const openSiteSettings = () => callStock("_manifestButtonTap", "#manifestbtn");
export const toggleLock = () => callStock("_toggleLockedStatus", "#lockbutton");
export const logout = () => stockUI()?._logout?.();
export const undo = () => haxStore()?.activeHaxBody?.undo?.();
export const redo = () => haxStore()?.activeHaxBody?.redo?.();

export function addPage() {
  const btn = stockUI()?.shadowRoot?.querySelector("#addpagebutton");
  btn?.HAXCMSButtonClick?.(fakeEvent(btn));
}

/**
 * Show a panel in the editor side panel. Unlike stock haxButtonOp this
 * never toggles: selecting the current tab keeps it open.
 */
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
