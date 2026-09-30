/**
 * Lit, as HAX's runtime copy.
 *
 * The site's import map only scopes `@haxtheweb/`, so a bare `lit` import
 * from this bundle would not resolve, and bundling a second Lit would split
 * style/lifecycle state from the elements we patch. HAX modules re-export
 * html/css/svg but not the base classes, so we recover LitElement and
 * ReactiveElement by walking up the prototype chain of HAX's theme base.
 * ReactiveElement is the class that owns the static finalizeStyles();
 * LitElement is its direct subclass.
 */
import {
  HAXCMSLitElementTheme,
  html,
  css,
  svg,
  unsafeCSS,
} from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";

function findBases() {
  let cls = HAXCMSLitElementTheme;
  let child = null;
  while (cls && cls !== HTMLElement) {
    if (Object.prototype.hasOwnProperty.call(cls, "finalizeStyles")) {
      return { ReactiveElement: cls, LitElement: child };
    }
    child = cls;
    cls = Object.getPrototypeOf(cls);
  }
  throw new Error("Could not locate Lit base classes from HAXCMSLitElementTheme");
}

const { ReactiveElement, LitElement } = findBases();
export { ReactiveElement, LitElement, html, css, svg, unsafeCSS };
