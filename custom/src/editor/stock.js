/**
 * Helpers for driving HAX's stock editor from our own UI.
 *
 * The stock haxcms-site-editor-ui stays mounted but hidden (see index.js);
 * it owns save/cancel logic, dialogs, shortcuts and Merlin programs. We call
 * the same methods its template binds. simple-toolbar-button overrides
 * click(), so synthetic clicks on its buttons never reach those handlers.
 */
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
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
 * question offers only "Cancel" and "OK"). Changed means the page's HTML
 * differs from what the stock editor took 100 ms after editing began, as
 * in its own _cancelButtonTap.
 */
export async function cancelEdit() {
  const ui = stockUI();
  if (!ui) return;
  const body = haxStore()?.activeHaxBody;
  if (body && (await body.haxToContent()) !== ui._originalContent) {
    const title = store.activeItem?.title;
    const choice = await confirmDialog().ask({
      title: "Leave without saving?",
      text: `Your changes${title ? ` to “${title}”` : ""} will be lost.`,
      actions: [
        { id: "keep", label: "Keep editing" },
        { id: "discard", label: "Discard changes", kind: "destructive" },
      ],
    });
    if (choice !== "discard" || !store.editMode) return;
  }
  ui._cancelEditing(fakeEvent(ui.shadowRoot?.querySelector("#cancelbutton")));
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
