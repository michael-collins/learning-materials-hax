/**
 * Quiet mode: no sound effects, no RPG-character toasts.
 *
 * - Sounds all go through store.playSound(); the preference is persisted in
 *   localStorage "app-hax-soundStatus". We pin both off.
 * - Toasts are dispatched as `haxcms-toast-show` on globalThis and rendered by
 *   haxcms-toast (the walking character with fire/hat effects). A capturing
 *   listener on the same target runs first, so we stop the event and render a
 *   plain shadcn-style toast instead (see oer-toast.js).
 * - HAX's word about recovered edits ("Recovered unsaved edits to …",
 *   "Restored unsaved edits to …") isn't shown: unsaved edits come back
 *   through the editor's own question (recovery.js), and the reading view
 *   says when there are some.
 */
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { toaster } from "./oer-toast.js";

// HAX's toasts about its own copy of unsaved edits (haxcms-site-editor.js 1633, 1665)
const HAX_RECOVERY = /^(Recovered|Restored) unsaved edits\b/;

export function installQuietMode() {
  try {
    globalThis.localStorage.setItem("app-hax-soundStatus", "false");
  } catch {}
  store.soundStatus = false;
  store.playSound = () => {};

  globalThis.addEventListener(
    "haxcms-toast-show",
    (e) => {
      e.stopImmediatePropagation();
      const d = e.detail || {};
      if (HAX_RECOVERY.test(d.text || "")) return;
      toaster().show({
        text: d.text,
        duration: d.duration,
        closeText: d.closeText,
        slot: d.slot,
        onClose: typeof d.eventCallback === "function" ? d.eventCallback : null,
      });
    },
    { capture: true },
  );
  globalThis.addEventListener(
    "haxcms-toast-hide",
    (e) => {
      e.stopImmediatePropagation();
      toaster().clear();
    },
    { capture: true },
  );
}
