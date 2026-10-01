/**
 * Make Merlin (super-daemon) behave like a shadcn Command dialog.
 *
 * - Always the centred modal: stock opens a "mini" popup anchored to the
 *   #merlin button in its own top bar, which is now collapsed out of view.
 * - Shortcut is Mod+Shift+K (Alt+Shift+K also works). Stock toggles Merlin whenever Shift and Alt
 *   (Meta on Safari) are held with *any* key, which hijacks macOS word
 *   selection (Option+Shift+Arrow): Merlin opens mid-selection and the
 *   selected text can be lost.
 */
import { openCommandPalette } from "./stock.js";

let lastKey = null;

const isMerlinChord = (e) => e.shiftKey && (e.altKey || e.metaKey || e.ctrlKey);

export async function installCommandPalette() {
  // remember the current keydown so allowedCallback() can inspect it, and
  // stop Alt/Option+Shift+K from also typing a character into the page
  globalThis.addEventListener(
    "keydown",
    (e) => {
      lastKey = e;
      if (isMerlinChord(e) && e.code === "KeyK") {
        e.preventDefault();
        // Mod+Shift+K is handled here in every browser (stock only listens
        // for Alt+Shift, or Meta+Shift on Safari); stop the event so the
        // stock toggle cannot immediately close what we just opened
        if (e.metaKey || e.ctrlKey) {
          e.stopImmediatePropagation();
          const daemon = globalThis.SuperDaemonManager?.instance;
          if (daemon?.opened) daemon.close();
          else openCommandPalette();
        }
      }
    },
    { capture: true },
  );

  await customElements.whenDefined("super-daemon");
  const SuperDaemon = customElements.get("super-daemon");
  const proto = SuperDaemon.prototype;
  if (proto.__oerModal) return;

  // keyHandler is bound at connect time, but it calls this.allowedCallback()
  // on each keydown, so gate the modifier toggle there. The instance assigns
  // its own allowedCallback (shadowing the prototype), so wrap per instance.
  // The editor also reassigns it (e.g. on entering edit mode), so keep the
  // gate in front of whatever is assigned later via an accessor.
  const gate = (el) => {
    if (!el || el.__oerGated) return;
    let current = el.allowedCallback;
    const gated = function (...args) {
      if (lastKey && isMerlinChord(lastKey) && lastKey.code !== "KeyK" && lastKey.key !== "Escape") {
        return false;
      }
      return typeof current === "function" ? current.apply(this, args) : true;
    };
    Object.defineProperty(el, "allowedCallback", {
      configurable: true,
      get: () => gated,
      set: (fn) => {
        current = fn;
      },
    });
    el.__oerGated = true;
  };
  gate(globalThis.SuperDaemonManager?.instance);

  const waveWand = proto.waveWand;
  proto.waveWand = function (...args) {
    waveWand.apply(this, args);
    this.mini = false;
    this.wand = false;
    this.activeNode = null;
  };

  // the keyboard toggle sets `opened` directly; present that as the modal too
  const updated = proto.updated;
  proto.updated = function (changed) {
    updated?.call(this, changed);
    gate(this);
    if (changed.has("opened") && this.opened && this.mini) {
      this.mini = false;
      this.wand = false;
    }
  };

  proto.__oerModal = true;
  const live = globalThis.SuperDaemonManager?.instance;
  if (live?.mini) {
    live.mini = false;
    live.wand = false;
  }
}
