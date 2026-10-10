/**
 * One stylesheet for what authors write, read and edited alike: the page's
 * type, links, and on course sites and OER Courses the widths of the blocks
 * between sections.
 *
 * A page's content is drawn in two places. For readers it's the theme's own
 * light DOM, which document styles reach. While editing it's hax-body's
 * children in h-a-x's shadow root, which they don't, and where DDD (copied
 * in with HAX's other styles) resets its tokens to its own: 20px Roboto,
 * justified. So the rules live in a constructable sheet flagged `hax`,
 * adopted on the document: h-a-x copies every such sheet into its shadow
 * root, and the same rules hold in both places. Each rule names both
 * places, for readers (custom-oer-docs-theme) and for authors (hax-body).
 *
 * Fields typed inside sections are styled here too, not with ::slotted() in
 * the section: the page's and DDD's rules for p, h2 or a outrank those.
 *
 * The theme adopts it when it connects (adoptContentSheet()), before HAX's
 * editor exists; HAX's own stylesheets aren't touched.
 */
import { css, unsafeCSS } from "../../lit.js";
import { SECTION_TAGS } from "./cs-shared.js";

// the sections, and blocks that keep their own size
const SECTIONS = unsafeCSS(SECTION_TAGS.join(", "));
const MEDIA = unsafeCSS("img, video, iframe");

// The tokens tokens/ddd-bridge.js points at the site's own (its :root:root
// block). DDD's ":root, :host" rule sets them again on h-a-x; there they
// take the page's values instead.
const BRIDGED_TOKENS = [
  "--ddd-theme-primary",
  "--ddd-theme-accent",
  "--ddd-theme-default-link",
  "--ddd-theme-default-link80",
  "--ddd-theme-default-background",
  "--ddd-theme-default-error",
  "--ddd-theme-header-border-color",
  "--ddd-theme-body-font-size",
  "--ddd-font-primary",
  "--ddd-font-secondary",
  "--ddd-font-navigation",
  "--ddd-radius-xs",
  "--ddd-radius-sm",
  "--ddd-radius-md",
  "--ddd-radius-lg",
  "--ddd-border-sm",
  "--ddd-border-md",
];

export const contentStyles = css`
  /* ---------- every page ---------- */

  /* (:host(h-a-x) outranks DDD's :host) */
  :host(h-a-x) {
    ${unsafeCSS(BRIDGED_TOKENS.map((t) => `${t}: inherit;`).join("\n    "))}
  }
  /* the page's type, never justified (DDD justifies the theme and hax-body
     from 900px up; :root and :host outrank its rule) */
  :root custom-oer-docs-theme {
    text-align: start;
  }
  :host hax-body {
    font-family: var(--ddd-font-primary);
    font-size: var(--ddd-theme-body-font-size);
    text-align: start;
  }
  /* links in what authors write: plain links in the page's link colour, as
     the theme draws them for readers (DDD's "a" makes them bold on an
     accent background) */
  :host hax-body a:any-link {
    background: transparent;
    font-weight: inherit;
    color: var(--link);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  /* ---------- course sites and OER Courses ---------- */

  /* Sections are full width (cs-shared.js). Any other block between them
     keeps the reading width, centred, as on every other page (the page's
     details too, which only authors see). For readers these are the
     theme's own children; while editing, hax-body's (the theme marks it
     data-oer-microsite). */
  custom-oer-docs-theme[course-site] > :not(${MEDIA}, ${SECTIONS}),
  hax-body[data-oer-microsite] > :not(${MEDIA}, ${SECTIONS}) {
    box-sizing: border-box;
    width: min(48rem, 100% - 3rem);
    margin-inline: auto;
  }
  /* columns set to the sections' width */
  custom-oer-docs-theme[course-site] > grid-plate[width="wide"],
  hax-body[data-oer-microsite] > grid-plate[width="wide"] {
    width: min(72rem, 100% - 3rem);
  }
  /* an image, video or embed there keeps its own size, at the start of the
     reading width */
  custom-oer-docs-theme[course-site] > :is(${MEDIA}),
  hax-body[data-oer-microsite] > :is(${MEDIA}) {
    display: block;
    box-sizing: border-box;
    max-width: min(48rem, 100% - 3rem);
    margin-inline: max(1.5rem, (100% - 48rem) / 2) auto;
  }
  custom-oer-docs-theme[course-site] > :is(img, video),
  hax-body[data-oer-microsite] > :is(img, video) {
    height: auto;
  }

  /* a section's heading, typed in it: as the section draws its own */
  :is(${SECTIONS}) > :is(h1, h2) {
    font-family: var(--cs-font-display, inherit);
    font-weight: var(--cs-display-weight, 700);
    text-wrap: balance;
  }
  :is(${SECTIONS}) > h2 {
    margin: 0 0 1.5rem;
    font-size: clamp(1.5rem, 3vw, 2rem);
    line-height: 1.2;
    letter-spacing: -0.015em;
  }
  oer-courses-intro > h1 {
    margin: 0;
    font-size: clamp(2.5rem, 6vw, 4.25rem);
    line-height: 1.02;
    letter-spacing: -0.03em;
  }
`;

let sheet = null;

/**
 * Adopt the sheet on the document (once), and into h-a-x's shadow root if
 * HAX's editor is already there: h-a-x copies `hax` sheets only when it
 * connects, renders and when HAX's store is ready.
 */
export function adoptContentSheet() {
  const doc = globalThis.document;
  if (!sheet) {
    sheet = new CSSStyleSheet();
    sheet.replaceSync(contentStyles.cssText);
    sheet.hax = true;
  }
  if (!doc.adoptedStyleSheets.includes(sheet)) doc.adoptedStyleSheets = [...doc.adoptedStyleSheets, sheet];
  const body = globalThis.HaxStore?.requestAvailability?.()?.activeHaxBody;
  body?.getRootNode().host?.__applyHAXAdoptedStylesToShadowRoot?.();
}
