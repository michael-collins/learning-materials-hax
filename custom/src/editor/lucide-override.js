/**
 * Swap HAX's Material/HAX icons for Lucide.
 *
 * simple-icon resolves names through the SimpleIconset singleton. Registering
 * a replacement namespace would wipe every name we don't map, so instead we
 * wrap getIcon(): mapped names return a Lucide data URL, everything else falls
 * through to the stock iconsets. simple-icon-lite recolours the image with
 * --simple-icon-color, so Lucide's stroke SVGs pick up theme colours.
 *
 * Must run before the editor renders: icons already drawn cache their src.
 */
import { SimpleIconsetStore } from "@haxtheweb/simple-icon/lib/simple-iconset.js";
import { LUCIDE_ICONS } from "./lucide-icons.generated.js";

export function installLucideIcons() {
  const iconset = SimpleIconsetStore;
  if (!iconset || iconset.__lucideInstalled) return;
  const original = iconset.getIcon.bind(iconset);
  iconset.getIcon = (val, context) => {
    if (typeof val === "string" && val) {
      const key = val.includes(":") ? val : `icons:${val}`;
      if (LUCIDE_ICONS[key]) return LUCIDE_ICONS[key];
    }
    return original(val, context);
  };
  iconset.__lucideInstalled = true;
  refreshRenderedIcons(globalThis.document);
}

// re-resolve any icon drawn before the override landed
function refreshRenderedIcons(root) {
  for (const el of root.querySelectorAll("*")) {
    if (typeof el.icon === "string" && el.icon && "src" in el) {
      const icon = el.icon;
      el.icon = "";
      el.icon = icon;
    }
    if (el.shadowRoot) refreshRenderedIcons(el.shadowRoot);
  }
}
