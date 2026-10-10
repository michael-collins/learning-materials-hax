/**
 * One stylesheet for what authors write, read and edited alike: the page's
 * type, links, code, tables, figures and footnotes, and on course sites and
 * OER Courses the widths of the blocks between sections.
 *
 * A page's content is drawn in two places. For readers it's the theme's own
 * light DOM (or the outline viewer's reading pane, .oer-reading), which
 * document styles reach. While editing it's hax-body's children in h-a-x's
 * shadow root, which they don't, and where DDD (copied in with HAX's other
 * styles) resets its tokens to its own (20px Roboto, justified) and draws
 * code, tables and pre its own way. So the rules live in a constructable
 * sheet flagged `hax`, adopted on the document: h-a-x copies every such
 * sheet into its shadow root, and the same rules hold in both places. Each
 * rule names both places, for readers and for authors (content() writes
 * the pair).
 *
 * Fields typed inside sections and their items (a section's heading, an
 * outcome's title and sentence) are styled here too, not with ::slotted()
 * in the block: the page's and DDD's rules for p, h2 or a outrank those.
 *
 * The theme adopts it when it connects (adoptContentSheet()), before HAX's
 * editor exists; HAX's own stylesheets aren't touched. Reader mode's sizes
 * stay in the theme, since editing leaves Reader mode.
 */
import { css, unsafeCSS } from "../../lit.js";
import { SECTION_TAGS } from "./cs-shared.js";
import { DDD_TOKENS } from "../../tokens/ddd-bridge.js";

// the sections, their items, and blocks that keep their own size
const SECTIONS = unsafeCSS(SECTION_TAGS.join(", "));
const ITEMS = unsafeCSS("oer-cs-outcome, oer-cs-tool, oer-cs-question");
const MEDIA = unsafeCSS("img, video, iframe");

// selectors inside a page's content, as readers see it and as authors edit it
const content = (...selectors) =>
  unsafeCSS(selectors.flatMap((s) => [`:is(custom-oer-docs-theme, .oer-reading) ${s}`, `:host hax-body ${s}`]).join(",\n  "));

export const contentStyles = css`
  /* ---------- every page ---------- */

  /* DDD sets its tokens again on h-a-x; there they take the page's values
     (tokens/ddd-bridge.js). :host(h-a-x) outranks DDD's :host */
  :host(h-a-x) {
    ${unsafeCSS(Object.keys(DDD_TOKENS).map((t) => `${t}: inherit;`).join("\n    "))}
  }
  /* the page's type, never justified (DDD justifies the theme and hax-body
     from 900px up; :root and :host outrank its rule). An author's own
     alignment (Text align, data-text-align) is set on the block itself, so
     it shows the same read and edited */
  :root :is(custom-oer-docs-theme, .oer-reading),
  :host hax-body {
    text-align: start;
  }
  :host hax-body {
    font-family: var(--ddd-font-primary);
    font-size: var(--ddd-theme-body-font-size);
  }
  /* screenshots and other figures */
  ${content("figure")} {
    margin: 1.5rem 0;
  }
  /* AI Usage License badges (dmd-program.github.io/aiul) sit at badge
     size; their embed's own max-width is an inline style, which HAX
     strips when it saves a page */
  ${content('img[src*="/aiul/assets/images/licenses/"]')} {
    width: auto;
    max-width: 100%;
    height: 2rem;
    border: 0;
    border-radius: 0;
    vertical-align: middle;
  }
  ${content("figure img")} {
    display: block;
    max-width: 100%;
    height: auto;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }
  /* footnotes (scripts/lib/footnotes.mjs): citations and references */
  ${content("sup.fn-ref")} {
    line-height: 0;
  }
  ${content("sup.fn-ref a")} {
    padding: 0 0.15em;
    font-size: 0.75em;
    font-weight: 600;
    text-decoration: none;
    color: var(--link);
  }
  ${content("sup.fn-ref a:hover")} {
    text-decoration: underline;
  }
  ${content(".footnotes")} {
    margin-top: 2.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--muted-foreground);
  }
  ${content(".footnotes h2")} {
    margin: 0 0 0.5rem;
    font-size: 1rem;
    color: var(--foreground);
  }
  ${content(".footnotes ol")} {
    margin: 0;
    padding-left: 1.5rem;
  }
  ${content(".footnotes li + li")} {
    margin-top: 0.375rem;
  }
  ${content(".footnotes li:target", "sup.fn-ref:target")} {
    background: color-mix(in srgb, var(--primary) 12%, transparent);
    border-radius: var(--radius-sm);
  }
  ${content(".footnotes a.fn-back")} {
    text-decoration: none;
    color: var(--link);
  }
  ${content("figcaption")} {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--muted-foreground);
  }
  ${content(".lead")} {
    font-size: 1.125rem;
    color: var(--muted-foreground);
  }
  ${content(":is(h2, h3, h4)")} {
    letter-spacing: -0.015em;
    scroll-margin-top: calc(var(--topbar-height) + 1rem);
  }
  /* DDD's global "a" rule gives every link an accent background and bold
     text; links in page content read as plain links */
  ${content("a:any-link")} {
    background: transparent;
    font-weight: inherit;
    color: var(--link);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  /* code, after shadcn's typography. DDD styles every code element as an
     inline-block box with a groove border, tight line height, margins and
     a transition; reset all of it here */
  ${content(":not(pre) > code")} {
    display: inline;
    margin: 0;
    border: 0;
    padding: 0.125rem 0.375rem;
    border-radius: var(--radius-sm);
    background: var(--muted);
    color: var(--foreground);
    font-family: var(--font-mono);
    font-size: 0.875em;
    line-height: inherit;
    transition: none;
    /* long snippets wrap at spaces, each line keeping its padding and
       corners; a word breaks only when it can't fit at all */
    overflow-wrap: break-word;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
  }
  /* tables, after shadcn's: an outer rounded border, lines between rows
     only, a quiet header, room in each cell, a faint stripe to follow a row
     across; wide tables scroll sideways. DDD gives every cell a border on
     all sides (its color !important, inherited: set on the table), no
     padding and middle alignment */
  ${content("table")} {
    display: block;
    box-sizing: border-box;
    width: auto;
    max-width: 100%;
    margin: 1.5rem 0;
    overflow-x: auto;
    border: 1px solid var(--border);
    border-color: var(--border);
    border-radius: var(--radius-lg);
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.9375rem;
    line-height: 1.55;
  }
  ${content(":is(th, td)")} {
    padding: 0.625rem 0.875rem;
    border: 0;
    border-bottom: 1px solid;
    font-family: inherit;
    font-size: inherit;
    text-align: start;
    vertical-align: top;
  }
  ${content("th")} {
    background: color-mix(in srgb, var(--muted) 45%, transparent);
    color: var(--muted-foreground);
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
  }
  ${content("tbody tr:nth-child(even) > *")} {
    background: color-mix(in srgb, var(--muted) 30%, transparent);
  }
  ${content("tr:last-child > td")} {
    border-bottom: 0;
  }
  /* a cell that's only a name in code (a model, a command) keeps it whole */
  ${content(":is(th, td) > code:only-child")} {
    white-space: nowrap;
  }
  ${content("caption")} {
    caption-side: bottom;
    padding: 0.5rem 0.875rem;
    font-size: 0.875rem;
    color: var(--muted-foreground);
    text-align: start;
  }
  ${content("pre")} {
    /* DDD makes pre an inline box sized to its text */
    display: block;
    box-sizing: border-box;
    width: auto;
    max-width: 100%;
    margin: 1rem 0;
    padding: 0.875rem 1rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--muted);
    color: var(--foreground);
    font-family: var(--font-mono);
    font-size: 0.875rem;
    line-height: 1.6;
    overflow-x: auto;
    tab-size: 2;
  }
  ${content("pre > code")} {
    display: block;
    margin: 0;
    border: 0;
    padding: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    line-height: inherit;
    white-space: pre;
    transition: none;
  }

  /* ---------- course sites and OER Courses ---------- */

  /* The course site's body face, as oer-course-site sets it for readers.
     For readers the blocks below are the theme's own children; while
     editing, hax-body's (the theme marks it data-oer-microsite). */
  :host hax-body[data-oer-microsite] {
    font-family: var(--cs-font-body, var(--ddd-font-primary));
  }
  /* Sections are full width (cs-shared.js). Any other block between them
     keeps the reading width, centred, as on every other page (the page's
     details too, which only authors see). These come after, and outrank,
     the margins above. */
  custom-oer-docs-theme[course-site] > :not(${MEDIA}, ${SECTIONS}),
  :host hax-body[data-oer-microsite] > :not(${MEDIA}, ${SECTIONS}) {
    box-sizing: border-box;
    width: min(48rem, 100% - 3rem);
    margin-inline: auto;
  }
  /* columns set to the sections' width */
  custom-oer-docs-theme[course-site] > grid-plate[width="wide"],
  :host hax-body[data-oer-microsite] > grid-plate[width="wide"] {
    width: min(72rem, 100% - 3rem);
  }
  /* an image, video or embed there keeps its own size, at the start of the
     reading width */
  custom-oer-docs-theme[course-site] > :is(${MEDIA}),
  :host hax-body[data-oer-microsite] > :is(${MEDIA}) {
    display: block;
    box-sizing: border-box;
    max-width: min(48rem, 100% - 3rem);
    margin-inline: max(1.5rem, (100% - 48rem) / 2) auto;
  }
  custom-oer-docs-theme[course-site] > :is(img, video),
  :host hax-body[data-oer-microsite] > :is(img, video) {
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
  /* an empty field still has a line to click into */
  :is(${SECTIONS}) > :is(h1, h2, h3, h4, h5, h6, p, blockquote),
  :is(${SECTIONS}) > :is(ul, ol) > li,
  :is(${ITEMS}) > * {
    min-block-size: 1lh;
  }
  /* an item's fields, as its card, chip or question draws them */
  ${content("oer-cs-outcome > h3", "oer-cs-question > h3")} {
    margin: 0;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: normal;
  }
  ${content("oer-cs-outcome > p")} {
    margin: 0;
    font-size: 0.9375rem;
    line-height: 1.55;
    color: var(--muted-foreground);
  }
  ${content("oer-cs-tool > p")} {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.5;
  }
  ${content("oer-cs-question > :not(h3)")} {
    margin: 0 0 0.5rem;
    line-height: 1.6;
  }
  /* while editing, what can be typed is tinted under the pointer (and
     what's drawn from elsewhere isn't) */
  :host hax-body :is(${SECTIONS}) > :is(h1, h2):hover,
  :host hax-body :is(${ITEMS}) > :hover {
    background: color-mix(in oklab, var(--accent) 60%, transparent);
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
