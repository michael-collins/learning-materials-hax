/**
 * Make Merlin (super-daemon) behave like a shadcn Command dialog.
 *
 * Stock HAX opens Merlin in "mini" mode: a small popup anchored to the
 * #merlin button in its own top bar. That bar is now an invisible spacer
 * collapsed out of view, so a popup anchored there would float in a corner.
 * We keep every Merlin program but always present it as the centred modal.
 */
export async function installCommandPalette() {
  await customElements.whenDefined("super-daemon");
  const SuperDaemon = customElements.get("super-daemon");
  const proto = SuperDaemon.prototype;
  if (proto.__oerModal) return;
  const waveWand = proto.waveWand;
  proto.waveWand = function (...args) {
    waveWand.apply(this, args);
    this.mini = false;
    this.wand = false;
    this.activeNode = null;
  };
  proto.__oerModal = true;
  // an instance may already be mid-popup
  const live = globalThis.SuperDaemonManager?.instance;
  if (live?.mini) {
    live.mini = false;
    live.wand = false;
  }
}
