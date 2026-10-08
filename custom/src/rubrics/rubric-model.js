/**
 * Rubrics: self-contained scoring guides, each a page of type Rubric
 * (oer:rubric), reused by any number of exercises, projects and discussions
 * (the rubric block on a page, a sequence item's rubric). A rubric lives in
 * its page's metadata.oerRubric, in the shape of OER Schema's Rubric,
 * RubricCriterion, RubricScale and RubricLevel:
 *
 *   { version: 1, key: "exercise",
 *     levels: [{ id, name, share }],          highest first; share of a
 *                                             criterion's points (1 = all)
 *     criteria: [{ id, name, description,
 *                  weight,                    % of the work's points
 *                  descriptors: { [levelId]: "what this level looks like" } }] }
 *
 * Weights are percentages (OER Schema's criterionWeight), so one rubric fits
 * a 20-point exercise and a 100-point project: the points are split by
 * weight when the work is graded or exported. The rubric's name and
 * description are its page's title and description. `key` keeps older
 * references working: <oer-rubric rubric-id="exercise"> and sequence items'
 * rubric: "exercise" find the rubric by it; new references use the page id.
 *
 * Plain functions with no browser or HAX dependencies (the Canvas export
 * runs in Node too).
 */
export const RUBRIC_TYPE = "oer:rubric";

export const DEFAULT_LEVELS = [
  { id: "exemplary", name: "Exemplary", share: 1 },
  { id: "proficient", name: "Proficient", share: 0.85 },
  { id: "developing", name: "Developing", share: 0.7 },
  { id: "beginning", name: "Beginning", share: 0.5 },
  { id: "missing", name: "Missing", share: 0 },
];

/** A rubric page (its latest version, not an archived copy). */
export const isRubric = (item) => item?.metadata?.pageType === RUBRIC_TYPE && !item.metadata?.oerSnapshotOf;

/** The site's rubric pages, by title. */
export function rubricPages(items = []) {
  return items.filter(isRubric).sort((a, b) => String(a.title).localeCompare(String(b.title)));
}

/**
 * The rubric page a reference names: its page id (an archived version's
 * too), its key, or the last part of its address.
 */
export function findRubric(items = [], ref = "") {
  if (!ref) return null;
  const rubrics = items.filter(isRubric);
  return (
    items.find((p) => p.id === ref && p.metadata?.pageType === RUBRIC_TYPE) ||
    rubrics.find((p) => p.metadata?.oerRubric?.key === ref) ||
    rubrics.find((p) => String(p.slug || "").split("/").filter(Boolean).pop() === ref) ||
    null
  );
}

/** Whole-number weights for n criteria that add up to 100. */
export function evenWeights(n) {
  if (n <= 0) return [];
  const base = Math.floor(100 / n);
  return Array.from({ length: n }, (_, i) => base + (i < 100 - base * n ? 1 : 0));
}

/**
 * A rubric page's rubric, with defaults filled in: { id, key, name,
 * description, levels, criteria }. Criteria without weights share the
 * points evenly.
 */
export function rubricOf(page) {
  const r = page?.metadata?.oerRubric || {};
  const levels = Array.isArray(r.levels) && r.levels.length ? r.levels : DEFAULT_LEVELS;
  const criteria = Array.isArray(r.criteria) ? r.criteria : [];
  const even = evenWeights(criteria.length);
  const weighted = criteria.some((c) => Number(c.weight) > 0);
  return {
    id: page?.id || "",
    key: r.key || "",
    name: page?.title || "",
    description: page?.description || "",
    levels: levels.map((l, i) => ({ id: l.id || `level-${i + 1}`, name: l.name || "", share: Math.max(0, Math.min(1, Number(l.share) || 0)) })),
    criteria: criteria.map((c, i) => ({
      id: c.id || `criterion-${i + 1}`,
      name: c.name || "",
      description: c.description || "",
      weight: weighted ? Math.max(0, Number(c.weight) || 0) : even[i],
      descriptors: c.descriptors && typeof c.descriptors === "object" ? c.descriptors : {},
    })),
  };
}

/** The criteria's weights added up (100 when they're right). */
export const weightTotal = (rubric) => rubric.criteria.reduce((s, c) => s + (Number(c.weight) || 0), 0);

/**
 * The points each criterion is worth when the work is worth `points`: split
 * by weight in hundredths, adding up to exactly `points` (weights that don't
 * add up to 100 are scaled to).
 */
export function criterionPoints(rubric, points) {
  const total = weightTotal(rubric);
  const n = rubric.criteria.length;
  if (!n) return [];
  const cents = Math.round((Number(points) || 0) * 100);
  const raw = rubric.criteria.map((c) => (total > 0 ? (cents * (Number(c.weight) || 0)) / total : cents / n));
  const out = raw.map(Math.floor);
  // the cents lost to rounding down go to the largest remainders
  let left = cents - out.reduce((s, x) => s + x, 0);
  raw
    .map((x, i) => [x - Math.floor(x), i])
    .sort((a, b) => b[0] - a[0])
    .forEach(([, i]) => {
      if (left > 0) {
        out[i]++;
        left--;
      }
    });
  return out.map((c) => c / 100);
}

/** True when any criterion describes what its levels look like. */
export const hasDescriptors = (rubric) => rubric.criteria.some((c) => rubric.levels.some((l) => String(c.descriptors?.[l.id] || "").trim()));

/** A percentage for display: 0.85 -> "85%". */
export const percent = (share) => `${Math.round((Number(share) || 0) * 1000) / 10}%`;

/** OER Schema JSON-LD for a rubric (on its page, and where work uses it). */
export function rubricJsonLd(rubric, url = "") {
  return {
    "@type": "oer:Rubric",
    ...(url ? { "@id": url, "schema:url": url } : {}),
    "schema:name": rubric.name,
    ...(rubric.description ? { "schema:description": rubric.description } : {}),
    "oer:rubricType": "analytic",
    "oer:hasCriterion": rubric.criteria.map((c) => ({
      "@type": "oer:RubricCriterion",
      "schema:name": c.name,
      ...(c.description ? { "schema:description": c.description } : {}),
      "oer:criterionWeight": Number(c.weight) || 0,
    })),
    "oer:rubricScale": {
      "@type": "oer:RubricScale",
      "oer:hasLevel": rubric.levels.map((l, i) => ({
        "@type": "oer:RubricLevel",
        "schema:name": l.name,
        "oer:levelOrdinal": rubric.levels.length - i,
        // points as a percentage of a criterion's points
        "oer:levelPoints": Math.round(l.share * 1000) / 10,
      })),
    },
  };
}
