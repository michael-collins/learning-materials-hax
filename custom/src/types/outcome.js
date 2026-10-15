/**
 * Learning outcomes: one shared bank of outcome pages (Curriculum →
 * Learning outcomes), each linked to any number of courses, pathways and
 * programs. Assessed work (exercises, reflections, projects, quizzes) names
 * the outcomes it assesses in its Learning outcomes field, so the same
 * exercise assesses the same outcomes in every sequence that uses it, and an
 * outcome page lists the work that assesses it (oer-collection
 * scope="linked").
 *
 * The page's title is the outcome statement ("Model hard-surface objects for
 * real-time use"). Plain functions with no browser or HAX dependencies
 * (the curriculum check runs them in node); nu-hax scripts/outcomes.mjs adds
 * the type and the field.
 */
const OUTCOME_TYPE = "oer:outcome";
export { OUTCOME_TYPE };

/** The types whose pages assess outcomes (they carry the `outcomes` field). */
export const ASSESSED_TYPES = ["oer:exercise", "oer:reflection", "oer:project", "oer:activity", "oer:quiz"];

/** Bloom's revised levels, lowest first. */
export const LEVELS = ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"];

const isSnap = (i) => !!i?.metadata?.oerSnapshotOf;
const linksOf = (page, field) =>
  (Array.isArray(page?.metadata?.oerFields?.[field]) ? page.metadata.oerFields[field] : []).map((v) => (v && typeof v === "object" ? v.page : null)).filter(Boolean);

/** The type, as the site's content types hold it (scripts/outcomes.mjs adds it). */
export const OUTCOME_DEF = {
  id: OUTCOME_TYPE,
  label: "Learning outcome",
  icon: "oer:target",
  description: "What students can do after a course, pathway or program. One shared list: link each outcome to everywhere it applies.",
  schemaType: "DefinedTerm",
  children: [],
  nav: false,
  template:
    '<p></p>\n<h2>Assessed by</h2>\n<oer-collection types="oer:exercise,oer:reflection,oer:project,oer:activity,oer:quiz" scope="linked" view="table" sort="title" controls="none"></oer-collection>',
  fields: [
    { name: "code", label: "Code", kind: "text", header: true, help: "A short label, if the program numbers its outcomes, e.g. PLO 2." },
    {
      name: "level",
      label: "Level",
      kind: "select",
      header: true,
      filter: true,
      options: LEVELS.map((l) => ({ value: l, label: l })),
      help: "How demanding it is, on Bloom's scale: Remember is the lowest, Create the highest.",
    },
    { name: "courses", label: "Courses", kind: "relation", types: ["oer:course"], header: true, filter: true, help: "Courses that teach toward it." },
    { name: "pathways", label: "Pathways", kind: "relation", types: ["oer:pathway"], header: true, filter: true, help: "Pathways that lead to it." },
    { name: "programs", label: "Programs", kind: "relation", types: ["oer:program"], header: true, filter: true, help: "Programs that promise it." },
    { name: "partOf", label: "Part of", kind: "relation", types: [OUTCOME_TYPE], header: true, help: "A broader outcome this one contributes to, e.g. a program outcome." },
  ],
};

/** The field assessed work names its outcomes in (scripts/outcomes.mjs adds it to ASSESSED_TYPES). */
export const OUTCOMES_FIELD = {
  name: "outcomes",
  label: "Learning outcomes",
  kind: "relation",
  types: [OUTCOME_TYPE],
  header: true,
  help: "The outcomes this work shows a student has met.",
};

export const isOutcome = (item) => item?.metadata?.pageType === OUTCOME_TYPE && !isSnap(item);

/** The site's outcomes, by code then statement. */
export const outcomePages = (items) =>
  (items || [])
    .filter(isOutcome)
    .sort((a, b) => String(a.metadata?.oerFields?.code || "").localeCompare(String(b.metadata?.oerFields?.code || ""), undefined, { numeric: true }) || String(a.title).localeCompare(String(b.title)));

/** The outcome pages a page assesses (its Learning outcomes field), in the order it lists them. */
export function outcomesOf(page, items) {
  const byId = new Map((items || []).map((i) => [i.id, i]));
  return linksOf(page, "outcomes").map((id) => byId.get(id)).filter(isOutcome);
}

/**
 * The outcomes that apply to a course, pathway or program: those linked to
 * it, and for a course, those linked to its programs and pathways too.
 * [{ outcome, via }] where `via` is the page the link is on (the scope itself
 * or one of its programs or pathways).
 */
export function outcomesFor(scope, items) {
  const list = items || [];
  const byId = new Map(list.map((i) => [i.id, i]));
  const field = { "oer:course": "courses", "oer:pathway": "pathways", "oer:program": "programs" }[scope?.metadata?.pageType];
  if (!field) return [];
  // a course reaches outcomes through its Degree programs and Pathways too
  const via = [{ page: scope, field }];
  if (field === "courses") {
    for (const id of linksOf(scope, "programs")) if (byId.get(id)) via.push({ page: byId.get(id), field: "programs" });
    for (const id of linksOf(scope, "pathways")) if (byId.get(id)) via.push({ page: byId.get(id), field: "pathways" });
  }
  const out = [];
  const seen = new Set();
  for (const outcome of outcomePages(list)) {
    const hit = via.find((v) => linksOf(outcome, v.field).includes(v.page.id));
    if (hit && !seen.has(outcome.id)) {
      seen.add(outcome.id);
      out.push({ outcome, via: hit.page });
    }
  }
  return out;
}

/** The assessed pages that name an outcome (live pages, no version snapshots). */
export const assessedBy = (outcomeId, items) =>
  (items || []).filter((i) => ASSESSED_TYPES.includes(i.metadata?.pageType) && !isSnap(i) && linksOf(i, "outcomes").includes(outcomeId));

/**
 * The live pages that show an outcome's latest wording: they link to it
 * unpinned, so a change to it reaches them (pinned links keep a release).
 */
export const followersOf = (outcomeId, items) =>
  (items || []).filter(
    (i) => !isSnap(i) && i.id !== outcomeId && Object.values(i.metadata?.oerFields || {}).some((v) => Array.isArray(v) && v.some((x) => x?.page === outcomeId && !x.version)),
  );

/* ---------- versions ---------- */

/** An outcome's statement: its title, or for a release, the title it had. */
export const statementOf = (page) => String(page?.metadata?.oerSnapshotTitle || page?.title || "");

/**
 * Whether two outcomes (a page and a release of it) say the same: statement,
 * level and code. Its links and page text don't count, as a rubric's name
 * doesn't.
 */
export function sameOutcome(a, b) {
  const norm = (p) => JSON.stringify([statementOf(p).trim(), p?.metadata?.oerFields?.level || "", String(p?.metadata?.oerFields?.code || "").trim()]);
  return !!a && !!b && norm(a) === norm(b);
}

/* ---------- choosing outcomes ---------- */

/**
 * The course pages a page belongs with, nearest first: its own Courses
 * field, then its parents' (an activity in a project), then the courses of
 * sequences that use it.
 */
export function coursesAround(page, items, courses = null) {
  const list = items || [];
  const byId = new Map(list.map((i) => [i.id, i]));
  const ids = [];
  const add = (id) => byId.get(id)?.metadata?.pageType === "oer:course" && !ids.includes(id) && ids.push(id);
  (courses ? courses.map((v) => v?.page).filter(Boolean) : linksOf(page, "courses")).forEach(add);
  for (let p = byId.get(page?.parent), n = 0; p && n < 20; p = byId.get(p.parent), n++) linksOf(p, "courses").forEach(add);
  for (const s of list) {
    if (s.metadata?.pageType !== "oer:sequence" || isSnap(s)) continue;
    const uses = (s.metadata?.oerSequence?.modules || []).some((m) => (m.items || []).some((it) => it.page === page?.id));
    if (uses) linksOf(s, "courses").forEach(add);
  }
  return ids.map((id) => byId.get(id));
}

/**
 * The bank in groups for choosing from, nearest first: [{ id, label,
 * outcomes }] for each course around the page (its own outcomes), then each
 * of their programs and pathways, then "other" with the rest. Each outcome
 * appears once, in the nearest group.
 */
export function outcomeGroups(page, items, courses = null) {
  const list = items || [];
  const byId = new Map(list.map((i) => [i.id, i]));
  const all = outcomePages(list).filter((o) => o.id !== page?.id);
  const placed = new Set();
  const groups = [];
  const take = (id, label, field, scope) => {
    if (!scope || groups.some((g) => g.id === id)) return;
    const outcomes = all.filter((o) => !placed.has(o.id) && linksOf(o, field).includes(scope.id));
    outcomes.forEach((o) => placed.add(o.id));
    groups.push({ id, label, outcomes });
  };
  const around = coursesAround(page, list, courses);
  for (const c of around) take(c.id, c.metadata?.oerFields?.code || c.title, "courses", c);
  for (const c of around) {
    for (const id of linksOf(c, "programs")) take(id, byId.get(id)?.title, "programs", byId.get(id));
    for (const id of linksOf(c, "pathways")) take(id, byId.get(id)?.title, "pathways", byId.get(id));
  }
  groups.push({ id: "other", label: "Other outcomes", outcomes: all.filter((o) => !placed.has(o.id)) });
  return { groups, courses: around };
}
