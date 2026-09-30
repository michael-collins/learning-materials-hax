/**
 * Inject extra stylesheets into HAX elements' shadow roots.
 *
 * Every HAX element is a Lit element sharing one ReactiveElement, whose
 * createRenderRoot() attaches the shadow root and adopts the class styles.
 * We wrap it to append our per-tag sheet afterwards, and sweep elements that
 * already rendered before this ran.
 *
 * This reaches internal markup, so selectors in the skin can break when HAX
 * changes a template. Keep rules on stable hooks (parts, ids used as API,
 * custom properties) where possible, and pin the HAX version.
 */
import { ReactiveElement, unsafeCSS } from "../lit.js";

const sheets = new Map(); // tagName -> CSSStyleSheet[]

function toSheet(cssResult) {
  if (cssResult.styleSheet) return cssResult.styleSheet;
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(String(cssResult.cssText ?? cssResult));
  return sheet;
}

function adopt(root, extra) {
  const current = root.adoptedStyleSheets;
  const missing = extra.filter((s) => !current.includes(s));
  if (missing.length) root.adoptedStyleSheets = [...current, ...missing];
}

/** Register styles for one or more tags: { "tag-name": css`...` } */
export function registerShadowStyles(map) {
  for (const [tags, cssResult] of Object.entries(map)) {
    const sheet = toSheet(cssResult);
    for (const tag of tags.split(",").map((t) => t.trim()).filter(Boolean)) {
      if (!sheets.has(tag)) sheets.set(tag, []);
      sheets.get(tag).push(sheet);
    }
  }
  sweep(globalThis.document);
}

export function installShadowStyles() {
  const proto = ReactiveElement.prototype;
  if (proto.__oerShadowStyles) return;
  const original = proto.createRenderRoot;
  proto.createRenderRoot = function () {
    const root = original.call(this);
    const extra = sheets.get(this.localName);
    if (extra && root && root.adoptedStyleSheets) adopt(root, extra);
    return root;
  };
  proto.__oerShadowStyles = true;
}

function sweep(root) {
  for (const el of root.querySelectorAll("*")) {
    if (el.shadowRoot) {
      const extra = sheets.get(el.localName);
      if (extra) adopt(el.shadowRoot, extra);
      sweep(el.shadowRoot);
    }
  }
}

export { unsafeCSS };
