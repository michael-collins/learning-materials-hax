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
export const ASSESSED_TYPES = ["oer:exercise", "oer:reflection", "oer:project", "oer:quiz"];

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
    '<p></p>\n<h2>Assessed by</h2>\n<oer-collection types="oer:exercise,oer:reflection,oer:project,oer:quiz" scope="linked" view="table" sort="title" controls="none"></oer-collection>',
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
