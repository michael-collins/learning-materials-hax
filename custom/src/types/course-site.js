/**
 * Course sites: one microsite per course, at a short address (/dart-413),
 * that pitches the course to students and helps them enroll. Most of it
 * comes from the course (credits, delivery, prerequisites, instructors,
 * student work) and its plan (the weeks and the projects); the site's own
 * fields hold the pitch (hero image, outcomes, tools, a note from the
 * instructor, questions, the enroll link) and its description is the
 * tagline. blocks/oer-course-site.js draws it; the theme shows it full width.
 */
import { createPage } from "../outline/outline-model.js";

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
  fields: [
    { name: "course", label: "Course", kind: "relation", types: [COURSE_TYPE], header: true, required: true, help: "The course this site is for." },
    { name: "heroImage", label: "Hero image", kind: "image", help: "A wide image, such as student work or the studio, at least 1600 pixels wide." },
    { name: "heroImageAlt", label: "Hero image description", kind: "text" },
    { name: "outcomes", label: "What you'll learn", kind: "list", help: "One outcome a row: a short title, a colon, then a sentence. For example “Cut with confidence: plan, cut and finish work on the laser.”" },
    { name: "tools", label: "Tools and software", kind: "list", help: "Software, machines and materials students use." },
    { name: "instructorNote", label: "A note from the instructor", kind: "longtext" },
    { name: "faq", label: "Questions and answers", kind: "longtext", help: "A question on its own line ending with ?, its answer below, a blank line between each." },
    { name: "enrollUrl", label: "Enroll link", kind: "url", help: "Where students sign up. If empty, the course's bulletin entry." },
    { name: "sequence", label: "Course plan", kind: "relation", types: [SEQUENCE_TYPE], help: "The plan the roadmap shows. If empty, the course's own plan." },
  ],
};

const refIds = (v) => (Array.isArray(v) ? v : v ? [v] : []).map((r) => (typeof r === "string" ? r : r?.page)).filter(Boolean);
const isSnap = (i) => !!i?.metadata?.oerSnapshotOf;

/** The address a course's site gets: its code, "DART 413" → "dart-413". */
export function siteSlug(course) {
  const code = course?.metadata?.oerFields?.code || course?.title || "course";
  return String(code).toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** A course's site, if it has one. */
export function siteForCourse(course, items) {
  return (items || []).find((i) => i.metadata?.pageType === COURSE_SITE_TYPE && !isSnap(i) && refIds(i.metadata?.oerFields?.course).includes(course?.id)) || null;
}

/** "Title: sentence" rows → [{ title, text }]. */
export function parseOutcomes(list) {
  return (Array.isArray(list) ? list : [])
    .map((row) => String(row || "").trim())
    .filter(Boolean)
    .map((row) => {
      const at = row.search(/[:—–]\s/);
      const text = at > 0 ? row.slice(at + 1).trim() : "";
      return { title: at > 0 ? row.slice(0, at).trim() : row, text: text.charAt(0).toUpperCase() + text.slice(1) };
    });
}

/** Questions (a line ending with ?) and the answers under them → [{ q, a }]. */
export function parseFaq(text) {
  const out = [];
  for (const block of String(text || "").split(/\n\s*\n/)) {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    if (!lines.length) continue;
    if (/\?$/.test(lines[0])) out.push({ q: lines[0], a: lines.slice(1).join(" ") });
    else if (out.length) out[out.length - 1].a = `${out[out.length - 1].a} ${lines.join(" ")}`.trim();
  }
  return out.filter((f) => f.a);
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
    institutionUrl: cf.institutionUrl || "",
    bulletin: cf.bulletin || "",
    prerequisites: refIds(cf.coursePrerequisites).map((id) => byId.get(id)).filter(Boolean),
    prerequisiteNote: cf.prerequisiteNote || "",
    instructors: (Array.isArray(cf.instructors) ? cf.instructors : []).map((p) => (typeof p === "string" ? { name: p } : p)).filter((p) => p?.name),
    instructorNote: f.instructorNote || "",
    heroImage: f.heroImage || "",
    heroImageAlt: f.heroImageAlt || "",
    outcomes: parseOutcomes(f.outcomes),
    tools: (Array.isArray(f.tools) ? f.tools : []).map((t) => String(t).trim()).filter(Boolean),
    faq: parseFaq(f.faq),
    enrollUrl: f.enrollUrl || cf.bulletin || "",
    weeks,
    projects,
    work: work.map((w) => ({ ...w, image: IMAGE.test(w.url || "") ? w.url : "" })),
    license: cf.license || "",
  };
}

/** Make a course's site at /<code>, out of the navigation (a draft unless `publish`); HAXcms then opens it. */
export async function createCourseSite(course, { publish = false } = {}) {
  return createPage(course.title, null, COURSE_SITE_TYPE, {
    location: siteSlug(course),
    description: course.description || "",
    metadata: { published: !!publish, hideInMenu: true, overridePathauto: true, oerFields: { course: [{ page: course.id, version: "" }] } },
  });
}
