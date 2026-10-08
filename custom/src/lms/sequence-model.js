/**
 * Course sequences: a published plan for running a course (oer:sequence
 * pages). The plan lives in the page's metadata.oerSequence:
 *
 *   { version: 1,
 *     modules: [{ id, title,
 *       week,              the teaching week it starts in; "" for none (open
 *                          all term: "Start here", "Resources")
 *       weeks?,            how many weeks it spans (Weeks 14–15: 2)
 *       overview?: { mode: "list" | "written", title?, note?, html? },
 *                          the module's to-do page: a note plus the module's
 *                          items and due dates, listed at export ("list"), or
 *                          a page as written (an imported to-do page)
 *       sequential?, prerequisites?: [module id], unlock?: { week, day?, time? },
 *       items: [
 *       { page, as: "page" | "assignment" | "discussion" | "quiz" | "link" | "file",
 *         title?, indent? (0–5),                           (title: as listed
 *                                                          in the LMS, if not
 *                                                          the page's)
 *         due: { week, day?, time?, rule? }, points, graded, group, rubric,
 *         unlock?, lock?: { week, day?, time? },          (availability)
 *         submission: ["online_upload", …], extensions: ["pdf", …],
 *         peerReviews: { count, anonymous }, groupSet,      (assignments)
 *         replies, requirements: [], requireInitialPost,    (discussions)
 *         quizType: "practice" | "graded", file: url },     (quizzes, files)
 *       { as: "text", title, html },                         (a page the
 *                                                          sequence holds:
 *                                                          welcome, syllabus,
 *                                                          course policies;
 *                                                          exported as an
 *                                                          LMS page, never in
 *                                                          the library)
 *       { as: "url", title, url, newTab },                  (any address)
 *       { header: "Readings", indent? } ] }],
 *     groups: [{ id, name, weight }],
 *     moduleRules?: "own" }   modules open, order and depend as each says
 *                             (sequential, prerequisites, unlock), as an
 *                             imported course did; otherwise asynchronous
 *                             delivery opens them weekly, in order
 *
 * An item's rubric names one of the site's rubric pages (by key or page id;
 * rubrics/rubric-model.js), which brings its own criteria, weights and
 * levels; rubricVersion pins a release of it (a released sequence pins
 * its items' rubrics).
 *
 * What changes from term to term (start and end dates, breaks, the typical
 * due day and time, class meetings, the time zone) isn't part of it: the
 * export asks for those and toOffering() combines the two for the Canvas
 * package (lms/canvas-package.js). Plain functions with no browser or HAX
 * dependencies.
 */
import { deliveryFromCourse, teachingWeeks, weeksAvailable, dueAt } from "./offering-schedule.js";
import { findRubric, rubricAt, rubricOf } from "../rubrics/rubric-model.js";

export const SEQUENCE_TYPE = "oer:sequence";

export const ROLES = {
  page: { label: "Page", note: "the live page, embedded" },
  assignment: { label: "Assignment", note: "due date, points, what students submit, rubric; peer reviews and group work optional" },
  discussion: { label: "Discussion", note: "an open thread with the page as its prompt; graded ones have points, a due date, requirements and a rubric" },
  quiz: { label: "Quiz", note: "from the page's questions" },
  link: { label: "Link", note: "opens the page, or a resource's source, in a new tab" },
  file: { label: "File", note: "one of the page's attachments, copied into the course files" },
};

/** An item's indent level (links to readings sit one level in unless set). */
export const indentOf = (it) => Math.max(0, Math.min(5, Number(it.indent ?? (it.as === "link" ? 1 : 0)) || 0));

/** A page's attachments (files field), for File items. */
export const attachmentsOf = (page) => [].concat(page?.metadata?.oerFields?.attachments || []).filter((a) => a?.url);

export const SUBMISSION_TYPES = {
  online_upload: "File upload",
  online_text_entry: "Text entry",
  online_url: "Website URL",
  media_recording: "Media recording",
  on_paper: "On paper",
  none: "No submission",
};

/** The role a page of this type usually takes in an LMS. */
export function defaultRole(pageType) {
  if (["oer:exercise", "oer:project", "oer:activity"].includes(pageType)) return "assignment";
  if (pageType === "oer:quiz") return "quiz";
  if (pageType === "oer:resource") return "link";
  return "page";
}

/** A new item for a page, with the usual settings for its type. */
export function newItem(page, week) {
  const as = defaultRole(page.metadata?.pageType);
  if (as === "assignment") {
    const project = page.metadata?.pageType === "oer:project";
    return { page: page.id, as, due: { week }, points: project ? 100 : 20, submission: ["online_upload"], rubric: project ? "project" : "exercise" };
  }
  if (as === "quiz") return { page: page.id, as, quizType: "practice" };
  return { page: page.id, as };
}

/** The page's sequence, with defaults filled in. */
export function sequenceOf(page) {
  const s = page?.metadata?.oerSequence || {};
  return {
    version: 1,
    modules: Array.isArray(s.modules) ? s.modules : [],
    groups: Array.isArray(s.groups) ? s.groups : [],
    ...(s.moduleRules ? { moduleRules: s.moduleRules } : {}),
  };
}

/** The courses a sequence is for (course pages). */
export function sequenceCourses(page, items) {
  const ids = [].concat(page?.metadata?.oerFields?.courses || []).map((c) => (typeof c === "string" ? c : c?.page)).filter(Boolean);
  return ids.map((id) => items.find((i) => i.id === id)).filter(Boolean);
}

/** The sequence's length in teaching weeks: its Length field, else its last module's week. */
export function sequenceWeeks(page, sequence = sequenceOf(page)) {
  return Number(page?.metadata?.oerFields?.weeks) || Math.max(0, ...sequence.modules.map((m) => moduleEnd(m))) || sequence.modules.length;
}

/** The last teaching week a module covers (0 for a module with no week). */
export const moduleEnd = (m) => (Number(m.week) ? Number(m.week) + Math.max(1, Number(m.weeks) || 1) - 1 : 0);

/** "Week 3", "Weeks 14–15", or "All term" for a module with no week. */
export function moduleWeekLabel(m) {
  if (!Number(m.week)) return "All term";
  const end = moduleEnd(m);
  return end > Number(m.week) ? `Weeks ${m.week}–${end}` : `Week ${m.week}`;
}

/**
 * The offering the Canvas package is built from: the sequence plus the
 * term the export asked for.
 *   run: { start, end, breaks, timeZone, defaults: { dueRule, dueDay, dueTime },
 *          meetings, siteUrl, publish }
 */
export function toOffering(page, items, run) {
  const sequence = sequenceOf(page);
  const courses = sequenceCourses(page, items);
  return {
    title: page.title,
    code: courses.map((c) => c.metadata?.oerFields?.code).filter(Boolean).join(" / ") || page.title,
    course: courses[0]?.id || null,
    term: run.term || "",
    delivery: deliveryFromCourse(page.metadata?.oerFields?.delivery) || "in-person",
    weeks: sequenceWeeks(page, sequence),
    timeZone: run.timeZone || "America/New_York",
    start: run.start,
    end: run.end || "",
    breaks: run.breaks || [],
    meetings: run.meetings || [],
    defaults: run.defaults || {},
    siteUrl: run.siteUrl || "",
    publish: run.publish !== false,
    groups: sequence.groups,
    moduleRules: sequence.moduleRules || "",
    modules: sequence.modules,
  };
}

/** Problems to fix before exporting: [{ level: "error" | "warning", text }]. */
export function readiness(page, items, run = null) {
  const out = [];
  const sequence = sequenceOf(page);
  const byId = new Map(items.map((i) => [i.id, i]));
  const weeks = sequenceWeeks(page, sequence);
  const groupIds = new Set(sequence.groups.map((g) => g.id));
  if (!sequence.modules.length) out.push({ level: "error", text: "The sequence has no modules yet." });
  const total = sequence.groups.reduce((s, g) => s + (Number(g.weight) || 0), 0);
  if (sequence.groups.length && Math.round(total) !== 100) out.push({ level: "warning", text: `Grade group weights add up to ${Math.round(total * 10) / 10}%, not 100%.` });
  for (const m of sequence.modules) {
    if (moduleEnd(m) > weeks) out.push({ level: "warning", text: `${m.title} runs to week ${moduleEnd(m)}, after the sequence's ${weeks} weeks.` });
    for (const it of m.items || []) {
      if (it.header !== undefined) continue;
      if (it.as === "text") {
        if (!String(it.title || "").trim()) out.push({ level: "warning", text: `${m.title}: a page in the sequence needs a title.` });
        continue;
      }
      if (it.as === "url") {
        if (!/^https?:\/\//.test(String(it.url || ""))) out.push({ level: "warning", text: `${m.title}: the link “${it.title || "untitled"}” needs a full web address (https://…).` });
        continue;
      }
      const page = byId.get(it.page);
      if (!page) {
        out.push({ level: "error", text: `${m.title}: a page here isn't on the site any more.` });
        continue;
      }
      if (it.as === "file" && !attachmentsOf(page).some((a) => a.url === it.file)) out.push({ level: "warning", text: `${page.title}: choose which of its files to add.` });
      if ((it.as === "assignment" || it.as === "discussion") && it.graded !== false) {
        if (!it.due?.week && !it.due?.at) out.push({ level: "warning", text: `${page.title} has no due week.` });
        if (!(Number(it.points) > 0)) out.push({ level: "warning", text: `${page.title} has no points.` });
        if (sequence.groups.length && (!it.group || !groupIds.has(it.group))) out.push({ level: "warning", text: `${page.title} isn't in a grade group.` });
        if (it.due?.week > weeks) out.push({ level: "warning", text: `${page.title} is due in week ${it.due.week}, after the sequence's ${weeks} weeks.` });
        if (it.rubric) {
          const rubric = findRubric(items, it.rubric);
          if (!rubric) out.push({ level: "warning", text: `${page.title}: its rubric (${it.rubric}) isn't on the site.` });
          else if (!rubricOf(rubric).criteria.length) out.push({ level: "warning", text: `${page.title}: the rubric “${rubric.title}” has no criteria yet.` });
          else if (it.rubricVersion && rubricAt(items, it.rubric, it.rubricVersion).missing) out.push({ level: "warning", text: `${page.title}: rubric version ${it.rubricVersion} isn't on the site.` });
        }
      }
    }
  }
  if (run) {
    const available = weeksAvailable({ ...run, weeks });
    if (available && available < weeks) out.push({ level: "warning", text: `The term has ${available} teaching weeks between its dates, but the sequence runs ${weeks}.` });
    if (run.start && teachingWeeks({ ...run, weeks }).length < weeks) out.push({ level: "warning", text: "Some weeks fall outside the term." });
    // due dates that land after the term ends
    if (run.end) {
      for (const m of sequence.modules) {
        for (const it of m.items || []) {
          const when = it.as === "assignment" && dueAt({ ...toOffering(page, items, run) }, it.due);
          if (when && when.slice(0, 10) > run.end) out.push({ level: "warning", text: `${byId.get(it.page)?.title || "An assignment"} would be due ${when.slice(0, 10)}, after the term ends.` });
        }
      }
    }
  }
  return out;
}
