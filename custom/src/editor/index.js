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
import { installPageBreakDetails } from "./page-break-details.js";
import { installCitationNormalizer } from "./citations.js";
import { installHaxFixes } from "./hax-fixes.js";
import { installUndo } from "./undo.js";
import { installFieldKeys } from "./field-keys.js";
import { installBoundaryGuard } from "./boundary-guard.js";
import { installEditorState, editorState } from "./editor-state.js";
import { installOps, ops } from "./ops.js";
import { installAnnounce, announce } from "./announce.js";
import { installImportHold } from "./import-hold.js";
import { installRecovery } from "./recovery.js";
import { installLeaveGuard } from "./leave-guard.js";
import { installEditBar } from "./oer-edit-bar.js";
import { installLinkPopover } from "./oer-link-popover.js";
import "./oer-block-frame.js";
import "./oer-block-rail.js";
import "./oer-block-inserter.js";
import { wrapInColumns } from "./layouts.js";

/**
 * Turn the editor chrome on. Called by custom-oer-docs-theme when it is the
 * active theme: HAXcms loads this bundle (custom/build/custom.es6.js) for
 * every theme, so nothing here may run under a stock theme, which keeps its
 * own top bar and look. Safe to call more than once.
 */
let installed = false;
export function installEditorChrome() {
  if (installed) return;
  installed = true;
  installLucideIcons();
  installHaxFixes();
  installUndo();
  // (keys in a section's fields are its own first, then the guard's)
  installFieldKeys();
  installBoundaryGuard();
  installAnnounce();
  installEditorState();
  installOps();
  installImportHold();
  installLinkPopover();
  // the page level: the editing bar's keys, unsaved edits after a reload, leaving
  installEditBar();
  installRecovery();
  installLeaveGuard();
  // for the editor checks and the console
  globalThis.OerEditor = { state: editorState, ops, announce, wrapInColumns };
  installQuietMode();
  installShadowStyles();
  registerShadowStyles(editorSkin);
  installCommandPalette();
  installUxTweaks();
  installTrayEnhancer();
  installPageBreakDetails();
  installCitationNormalizer();
  new MutationObserver(adoptStockBar).observe(globalThis.document.body, { childList: true });
  adoptStockBar();
}

// The stock top bar is replaced by controls in the theme itself (page
// options menu, sidebar Site group, editor header). The stock element stays
// mounted, since it owns shortcuts, Merlin programs and save logic, but is
// collapsed to an invisible, inert, zero-height element.
function adoptStockBar() {
  const doc = globalThis.document;
  const stock = doc.querySelector("haxcms-site-editor-ui");
  if (stock) {
    if (!stock.hasAttribute("data-oer-hidden")) {
      stock.setAttribute("data-oer-hidden", "");
      stock.setAttribute("aria-hidden", "true");
      stock.inert = true;
      // inline so it beats the element's outer styles; matches our bar height
      for (const [prop, value] of [
        ["height", "0"],
        ["min-height", "0"],
        ["overflow", "hidden"],
        ["opacity", "0"],
        ["pointer-events", "none"],
      ]) {
        stock.style.setProperty(prop, value, "important");
      }
    }
    for (const tag of ["oer-block-frame", "oer-block-rail", "oer-block-inserter"]) {
      if (!doc.querySelector(tag)) doc.body.append(doc.createElement(tag));
    }
  } else {
    doc.querySelector("oer-block-frame")?.remove();
    doc.querySelector("oer-block-rail")?.remove();
    doc.querySelector("oer-block-inserter")?.remove();
  }
}
