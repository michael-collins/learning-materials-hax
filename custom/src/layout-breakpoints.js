/**
 * Column layouts (grid-plate) go side by side at this theme's widths.
 *
 * grid-plate picks its column mode from its own width against breakpoints
 * (HAX defaults 600/900/1200/1500, and saved pages often carry 900+ as
 * attributes). The article column here is 48rem, so every layout rendered
 * stacked for readers and editors alike. The breakpoints are handed to
 * responsive-utility in a "responsive-element" event; theme values are
 * substituted there, so nothing is written back into page content.
 */
const BREAKPOINTS = { sm: 560, md: 720, lg: 960, xl: 1200 };

let installed = false;

/** Called by custom-oer-docs-theme when it connects; stock themes keep HAX's breakpoints. */
export function installLayoutBreakpoints() {
  if (installed) return;
  installed = true;
  globalThis.addEventListener(
    "responsive-element",
    (e) => {
      if (e.detail?.element?.localName === "grid-plate") Object.assign(e.detail, BREAKPOINTS);
    },
    { capture: true },
  );

  // grid-plates that registered before this module ran: register again
  customElements.whenDefined("grid-plate").then(() => {
    for (const grid of globalThis.document.querySelectorAll("grid-plate")) {
      if (!grid.hasUpdated) continue;
      globalThis.dispatchEvent(
        new CustomEvent("responsive-element", {
          detail: { element: grid, attribute: "responsive-size", relativeToParent: false, ...BREAKPOINTS },
        }),
      );
    }
  });
}
