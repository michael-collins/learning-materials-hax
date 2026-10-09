/**
 * Course sites: one microsite per course, at a short address
 * (/up/dart-413), that pitches the course to students and helps them
 * enroll. Its page is made of section blocks (blocks/course-site/
 * cs-sections.js): most of what they show comes from the course (credits,
 * delivery, prerequisites, instructors, student work) and its plan (the
 * weeks and the projects); the pitch is typed into them (the tagline, what
 * you'll learn, the instructor's note, tools, questions). The site's own
 * fields are the course, the enroll link and the plan; its description is
 * the tagline until one is typed. blocks/oer-course-site.js is its frame;
 * the theme shows it full width in its style (types/course-site-style.js).
 *
 * A course has one site, switched on and off from the course page (and the
 * site's own bar): on makes it the first time, then on and off publish and
 * unpublish it, so what it says is kept while it's off.
 */
import { saveOutline, newItemId } from "../outline/outline-model.js";

export const COURSE_SITE_TYPE = "oer:course-site";
const COURSE_TYPE = "oer:course";
const SEQUENCE_TYPE = "oer:sequence";
const PROJECT_TYPE = "oer:project";

/** The type's definition, as the site's content types hold it. */
export const COURSE_SITE_DEF = {
  id: COURSE_SITE_TYPE,
  label: "Course site",
  icon: "oer:graduation-cap",
  description: "A page that pitches a course to students and helps them enroll, at a short address of its own.",
  children: [],
  nav: false,
  // what students read is typed into the page's sections (Edit content)
  fields: [
    { name: "course", label: "Course", kind: "relation", types: [COURSE_TYPE], header: true, required: true, help: "The course this site is for." },
    { name: "enrollUrl", label: "Enroll link", kind: "url", help: "Where students sign up. If empty, the course's bulletin entry." },
    { name: "sequence", label: "Course plan", kind: "relation", types: [SEQUENCE_TYPE], help: "The plan the roadmap shows. If empty, the course's own plan." },
  ],
};

const refIds = (v) => (Array.isArray(v) ? v : v ? [v] : []).map((r) => (typeof r === "string" ? r : r?.page)).filter(Boolean);
const isSnap = (i) => !!i?.metadata?.oerSnapshotOf;

// short campus codes for addresses (scripts/course-campus-programs.mjs has the same)
export const CAMPUS_CODES = { "University Park": "up", "World Campus": "wc" };
const slugify = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * The address a course's site gets: its campus, then its code, since the
 * same code can be taught at more than one campus ("DART 413" at
 * University Park → "up/dart-413"). A campus without a short code uses its
 * name; a course without a campus, just its code.
 */
export function siteSlug(course) {
  const f = course?.metadata?.oerFields || {};
  const code = slugify(f.code || course?.title || "course");
  const campus = f.campus ? CAMPUS_CODES[f.campus] || slugify(f.campus) : "";
  return campus ? `${campus}/${code}` : code;
}

/** A course's site, if it has one. */
export function siteForCourse(course, items) {
  return (items || []).find((i) => i.metadata?.pageType === COURSE_SITE_TYPE && !isSnap(i) && refIds(i.metadata?.oerFields?.course).includes(course?.id)) || null;
}

const IMAGE = /\.(png|jpe?g|gif|webp|avif|svg)(\?|#|$)/i;

/** Everything a course site shows, from the site, its course and the course's plan. */
export function siteData(site, items) {
  const byId = new Map((items || []).map((i) => [i.id, i]));
  const f = site?.metadata?.oerFields || {};
  const course = byId.get(refIds(f.course)[0]) || null;
  const cf = course?.metadata?.oerFields || {};
  const sequence =
    byId.get(refIds(f.sequence)[0]) ||
    (items || []).find((i) => i.metadata?.pageType === SEQUENCE_TYPE && !isSnap(i) && refIds(i.metadata?.oerFields?.courses).includes(course?.id)) ||
    null;
  const plan = sequence?.metadata?.oerSequence || {};
  // each week: its title (without "Week n:"), and the pages in it that exist here
  const weeks = (plan.modules || []).map((m) => ({
    week: m.week,
    title: String(m.title || "").replace(/^week\s*\d+\s*[:–—-]\s*/i, ""),
    items: (m.items || []).map((it) => ({ ...it, page: byId.get(it.page) })).filter((it) => it.page && !isSnap(it.page)),
  }));
  const projects = [];
  for (const w of weeks)
    for (const it of w.items) if (it.page.metadata?.pageType === PROJECT_TYPE && !projects.some((p) => p.page.id === it.page.id)) projects.push({ page: it.page, week: w.week });
  const work = (Array.isArray(cf.studentWork) ? cf.studentWork : []).filter((w) => w?.url || w?.title);
  return {
    course,
    sequence,
    code: cf.code || "",
    title: course?.title || site?.title || "",
    tagline: site?.description || course?.description || "",
    credits: cf.credits || "",
    delivery: cf.delivery || sequence?.metadata?.oerFields?.delivery || "",
    terms: Array.isArray(cf.termsOffered) ? cf.termsOffered.filter(Boolean) : [],
    weekCount: Number(sequence?.metadata?.oerFields?.weeks) || weeks.length || 0,
    institution: cf.institution || "",
    campus: cf.campus || "",
    programs: Array.isArray(cf.programs) ? cf.programs.filter(Boolean) : [],
    institutionUrl: cf.institutionUrl || "",
    bulletin: cf.bulletin || "",
    prerequisites: refIds(cf.coursePrerequisites).map((id) => byId.get(id)).filter(Boolean),
    prerequisiteNote: cf.prerequisiteNote || "",
    instructors: (Array.isArray(cf.instructors) ? cf.instructors : []).map((p) => (typeof p === "string" ? { name: p } : p)).filter((p) => p?.name),
    enrollUrl: f.enrollUrl || cf.bulletin || "",
    weeks,
    projects,
    work: work.map((w) => ({ ...w, image: IMAGE.test(w.url || "") ? w.url : "" })),
    license: cf.license || "",
  };
}

/** A course site is on when readers can see it. */
export const siteIsOn = (site) => !!site && site.metadata?.published !== false;

/** Show or hide a site for readers (its address stays). Resolves once saved. */
export function setSiteOn(site, on) {
  return saveOutline([{ ...site, metadata: { ...(site.metadata || {}), published: !!on, overridePathauto: true }, modified: true }]);
}

/**
 * A new course site's page: the standard sections, the written ones each
 * with an empty block to type into.
 */
export const COURSE_SITE_STARTER = [
  "<oer-cs-hero><p></p></oer-cs-hero>",
  "<oer-cs-facts></oer-cs-facts>",
  "<oer-cs-learn><ul><li></li></ul></oer-cs-learn>",
  "<oer-cs-semester></oer-cs-semester>",
  "<oer-cs-make></oer-cs-make>",
  "<oer-cs-people><p></p></oer-cs-people>",
  "<oer-cs-tools><ul><li></li></ul></oer-cs-tools>",
  "<oer-cs-faq><h3></h3><p></p></oer-cs-faq>",
  "<oer-cs-closing></oer-cs-closing>",
].join("\n");

/**
 * Turn a course's site on or off. The first time on makes it at /<code>,
 * out of the navigation, without leaving the course page; its tagline is
 * the course's description until it has its own. Resolves once saved.
 */
export async function setCourseSite(course, on, items) {
  const site = siteForCourse(course, items);
  if (site) return siteIsOn(site) === !!on || setSiteOn(site, on);
  if (!on) return true;
  return saveOutline([
    {
      id: newItemId(),
      title: course.title,
      parent: null,
      indent: 0,
      order: items.filter((i) => !i.parent).length,
      slug: siteSlug(course),
      location: "",
      description: "",
      metadata: { pageType: COURSE_SITE_TYPE, published: true, hideInMenu: true, overridePathauto: true, oerFields: { course: [{ page: course.id, version: "" }] } },
      contents: COURSE_SITE_STARTER,
      new: true,
    },
  ]);
}

/* ---------- OER Courses: the students' hub of course sites ---------- */

export const COURSE_HUB_TYPE = "oer:course-hub";
export const HUB_SLUG = "oer-courses";

/** The hub's type, as the site's content types hold it: it has no fields of its own. */
export const COURSE_HUB_DEF = {
  id: COURSE_HUB_TYPE,
  label: "Courses hub",
  icon: "oer:graduation-cap",
  description: "OER Courses: a page for students that lists the course sites, by degree program.",
  children: [],
  nav: false,
  fields: [],
};

/** The hub's page: an intro to write, then the catalog of course sites. */
export const HUB_STARTER = ["<oer-courses-intro><p></p></oer-courses-intro>", "<oer-courses-catalog></oer-courses-catalog>"].join("\n");

/** The site's hub, if it has one. */
export const hubPage = (items) => (items || []).find((i) => i.metadata?.pageType === COURSE_HUB_TYPE && !isSnap(i)) || null;

/** Whether a page is shown as a microsite (a course site or the hub). */
export const isMicrosite = (item) => [COURSE_SITE_TYPE, COURSE_HUB_TYPE].includes(item?.metadata?.pageType) && !isSnap(item);

/**
 * The course sites readers can see, as catalog entries grouped by degree
 * program, in `programOrder` (the course type's options), a course in two
 * degrees under both; courses without a degree come last. Also the sites
 * that are off, for authors.
 */
export function catalog(items, programOrder = []) {
  const sites = (items || []).filter((i) => i.metadata?.pageType === COURSE_SITE_TYPE && !isSnap(i));
  const entries = sites
    .filter(siteIsOn)
    .map((site) => {
      const d = siteData(site, items);
      const programs = Array.isArray(d.course?.metadata?.oerFields?.programs) ? d.course.metadata.oerFields.programs.filter(Boolean) : [];
      const image = d.projects.map((p) => p.page.metadata?.oerFields?.image).find(Boolean) || d.work.map((w) => w.image).find(Boolean) || "";
      return { site, ...d, programs, image };
    })
    .sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }));
  const named = [...new Set([...programOrder, ...entries.flatMap((e) => e.programs)])];
  const groups = named.map((program) => ({ program, entries: entries.filter((e) => e.programs.includes(program)) })).filter((g) => g.entries.length);
  const loose = entries.filter((e) => !e.programs.length);
  if (loose.length) groups.push({ program: "", entries: loose });
  return { groups, count: entries.length, off: sites.filter((s) => !siteIsOn(s)) };
}
