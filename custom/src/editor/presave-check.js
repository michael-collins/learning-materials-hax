/**
 * "To check" (nu-hax docs/editor-redesign/spec.md §3.3): what readers would
 * miss on a course site or OER Courses if it were saved as it is, each with
 * a way to fix it. The editing bar shows "⚠ 2 to check" only when there's
 * something; it never stops a save.
 *
 * - The hero's picture has no description (and isn't marked as decoration):
 *   Add a description, which opens its image field.
 * - A written section is empty, so readers won't see it: Go to it.
 * - The course site has no enroll link: Open Page details, at that field.
 * - An outcome or a question without its title: Go to it.
 *
 *   const issues = presaveChecks(body, site)   // [{ id, text, fix, run }]
 */
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { policyOf, labelOf } from "./policy.js";
import { HIDDEN, select, caretInto } from "./ops.js";
import { pageDetails } from "../types/oer-page-details.js";
import { siteData, COURSE_SITE_TYPE } from "../types/course-site.js";

const SECTION_TITLE = { "oer-cs-outcome": "An outcome has no title", "oer-cs-question": "A question has no question" };

/**
 * What to check on the page being edited (hax-body), a microsite's (site,
 * its item); [] on other pages. Each: { id, text, fix (the button's
 * words), run(opener) }.
 */
export function presaveChecks(body, site) {
  if (!body?.editMode || !site) return [];
  const out = [];
  const hero = body.querySelector(":scope > oer-cs-hero");
  if (hero?.getAttribute("image")?.trim() && !hero.getAttribute("alt")?.trim() && !hero.hasAttribute("decorative")) {
    out.push({
      id: "hero-alt",
      text: "The hero's picture has no description",
      fix: "Add a description",
      run: () => {
        select(hero, { focus: false });
        hero.shadowRoot?.querySelector(".change-image")?.click();
      },
    });
  }
  for (const section of body.children) {
    const policy = policyOf(section);
    if (policy.kind !== "section" || policy.source || section.hasAttribute(HIDDEN) || section.shown !== false) continue;
    out.push({ id: `empty-${section.localName}`, text: `${labelOf(section)} is empty, so readers won't see it`, fix: "Go to it", run: () => select(section) });
  }
  if (site.metadata?.pageType === COURSE_SITE_TYPE) {
    const items = toJS(store.manifest?.items) || [];
    const fresh = items.find((i) => i.id === site.id) || site;
    if (!siteData(fresh, items).enrollUrl) {
      out.push({
        id: "enroll",
        text: "There's no enroll link, so the bar has no Enroll",
        fix: "Open Page details",
        run: (opener) => pageDetails().show(fresh.id, { section: "details", field: "enrollUrl", opener }),
      });
    }
  }
  for (const [tag, text] of Object.entries(SECTION_TITLE)) {
    const item = [...body.querySelectorAll(tag)].find((el) => {
      const title = el.querySelector(":scope > h3");
      return el.textContent.trim() && !title?.textContent.trim();
    });
    const title = item?.querySelector(":scope > h3");
    if (item) out.push({ id: `untitled-${tag}`, text, fix: "Go to it", run: () => (title ? caretInto(title) : select(item)) });
  }
  return out;
}
