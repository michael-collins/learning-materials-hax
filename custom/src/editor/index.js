/**
 * shadcn editor chrome for HAXcms.
 *
 * Import this first from custom.js so the icon override and shadow-style
 * patch are in place before the editor UI (lazy-loaded after login) renders.
 */
import { installLucideIcons } from "./lucide-override.js";
import { installQuietMode } from "./quiet-mode.js";
import { installShadowStyles, registerShadowStyles } from "./shadow-styles.js";
import { editorSkin } from "./editor-skin.js";
import { installCommandPalette } from "./command-palette.js";
import { installUxTweaks, installTrayEnhancer } from "./ux-tweaks.js";
import "./oer-editor-bar.js";
import "./oer-block-label.js";

installLucideIcons();
installQuietMode();
installShadowStyles();
registerShadowStyles(editorSkin);
installCommandPalette();
installUxTweaks();
installTrayEnhancer();

// Swap the stock top bar for oer-editor-bar. The stock element stays mounted
// (it owns shortcuts, Merlin programs and save logic) but becomes an
// invisible, inert spacer the same height as our bar, which is what the
// theme measures to offset its sticky sidebar.
function adoptStockBar() {
  const doc = globalThis.document;
  const stock = doc.querySelector("haxcms-site-editor-ui");
  let bar = doc.querySelector("oer-editor-bar");
  if (stock) {
    if (!stock.hasAttribute("data-oer-hidden")) {
      stock.setAttribute("data-oer-hidden", "");
      stock.setAttribute("aria-hidden", "true");
      stock.inert = true;
      // inline so it beats the element's outer styles; matches our bar height
      for (const [prop, value] of [
        ["height", "3.5rem"],
        ["min-height", "0"],
        ["overflow", "hidden"],
        ["opacity", "0"],
        ["pointer-events", "none"],
      ]) {
        stock.style.setProperty(prop, value, "important");
      }
    }
    if (!bar) {
      bar = doc.createElement("oer-editor-bar");
      doc.body.prepend(bar);
    }
    if (!doc.querySelector("oer-block-label")) {
      doc.body.append(doc.createElement("oer-block-label"));
    }
  } else if (bar) {
    bar.remove();
    doc.querySelector("oer-block-label")?.remove();
  }
}
new MutationObserver(adoptStockBar).observe(globalThis.document.body, { childList: true });
adoptStockBar();
