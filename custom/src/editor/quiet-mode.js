/**
 * Quiet mode: no sound effects, no RPG-character toasts.
 *
 * - Sounds all go through store.playSound(); the preference is persisted in
 *   localStorage "app-hax-soundStatus". We pin both off.
 * - Toasts are dispatched as `haxcms-toast-show` on globalThis and rendered by
 *   haxcms-toast (the walking character with fire/hat effects). A capturing
 *   listener on the same target runs first, so we stop the event and render a
 *   plain shadcn-style toast instead (see oer-toast.js).
 */
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { toaster } from "./oer-toast.js";

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
