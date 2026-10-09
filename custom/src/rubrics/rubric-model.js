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
 *                  weight,                    relative: share = weight / total
 *                  descriptors: { [levelId]: "what this level looks like" } }] }
 *
 * Weights are relative (OER Schema's criterionWeight): a criterion's share
 * of the grade is its weight over the total, so 1, 1, 1 (or 10, 10, 10) is
 * exactly a third each, which no percentage can say. One rubric fits a
 * 20-point exercise and a 100-point project: the points are split by weight
 * when the work is graded or exported. The rubric's name and
 * description are its page's title and description. `key` keeps older
 * references working: <oer-rubric rubric-id="exercise"> and sequence items'
 * rubric: "exercise" find the rubric by it; new references use the page id.
 *
 * Versions: a rubric is released like any page (an archived copy keeps the
 * rubric as it was). A reference can pin a release: the block's version
 * attribute, a sequence item's rubricVersion; releasing a page pins its
 * rubrics (versions/versioning.js). Usage lists name pins as
 * "exercise@1.0.0".
 *
 * A course sequence's graded item grades with the rubric its page shows,
 * unless the item names its own (rubric: a reference) or none (rubric: "")
 * (itemRubric).
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

/** The names pages and sequences may use for a rubric: its page id, key and address. */
export function rubricRefs(page) {
  return [page?.id, page?.metadata?.oerRubric?.key, String(page?.slug || "").split("/").filter(Boolean).pop()].filter(Boolean);
}

/** "exercise@1.0.0" → { ref: "exercise", version: "1.0.0" }; no "@", the latest. */
export function parseRubricRef(entry = "") {
  const at = String(entry).lastIndexOf("@");
  return at > 0 ? { ref: entry.slice(0, at), version: entry.slice(at + 1) } : { ref: String(entry), version: "" };
}

/** The rubric a page shows (its first Rubric block): { ref, version } or null. */
export function pageRubric(page) {
  const first = [].concat(page?.metadata?.oerRubrics || [])[0];
  return first ? parseRubricRef(first) : null;
}

/**
 * The rubric a course sequence's item grades with:
 * - its own, when it names one (rubric, rubricVersion)
 * - none, when it says so (rubric: "")
 * - else the one its page shows (pinned as the page's block is)
 * → { ref, version, from: "item" | "page" | "", pageShows: { ref, version } | null }
 */
export function itemRubric(it, page) {
  const pageShows = pageRubric(page);
  if (it?.rubric === "") return { ref: "", version: "", from: "", pageShows };
  if (it?.rubric) return { ref: it.rubric, version: it.rubricVersion || "", from: "item", pageShows };
  if (pageShows) return { ...pageShows, from: "page", pageShows };
  return { ref: "", version: "", from: "", pageShows };
}

/** True for a sequence item that's graded work (an assignment or discussion). */
export const isGradedItem = (it) => (it?.as === "assignment" || it?.as === "discussion") && it?.graded !== false;

/** True when an item names its own rubric and its page shows a different one. */
export function rubricDiffers(it, page, items = []) {
  const r = itemRubric(it, page);
  if (r.from !== "item" || !r.pageShows) return false;
  const own = findRubric(items, r.ref);
  const shown = findRubric(items, r.pageShows.ref);
  return !!own && !!shown && own.id !== shown.id;
}

/**
 * Where a rubric is used: pages that show it with the Rubric block (their
 * metadata.oerRubrics, kept up to date when a page is saved), archived
 * versions of pages, and course sequences that grade with it. Uses pinned
 * to a release (archived versions, as a rule) don't change with the rubric:
 *   → { pages, versions, sequences: [{ page, items }], pinned: [item] }
 */
export function rubricUsage(items = [], page) {
  const refs = new Set(rubricRefs(page));
  const out = { pages: [], versions: [], sequences: [], pinned: [] };
  if (!refs.size) return out;
  const byId = new Map(items.map((i) => [i.id, i]));
  for (const i of items) {
    if (i.id === page.id || i.metadata?.oerSnapshotOf === page.id) continue;
    const named = [].concat(i.metadata?.oerRubrics || []).map(parseRubricRef).filter((r) => refs.has(r.ref));
    if (named.some((r) => !r.version)) (i.metadata?.oerSnapshotOf ? out.versions : out.pages).push(i);
    else if (named.length) out.pinned.push(i);
    if (i.metadata?.pageType === "oer:sequence") {
      // items grading with it: their own choice, or their page's rubric
      const uses = (i.metadata?.oerSequence?.modules || []).flatMap((m) => (m.items || []).filter(isGradedItem).map((it) => itemRubric(it, byId.get(it.page))).filter((r) => r.ref && refs.has(r.ref)));
      if (uses.some((r) => !r.version) && !i.metadata?.oerSnapshotOf) out.sequences.push({ page: i, items: uses.filter((r) => !r.version).length });
      else if (uses.length) out.pinned.push(i);
    }
  }
  return out;
}

const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"))?.[1] || "";

/** The rubrics a page's content shows: its Rubric blocks, "exercise" or pinned "exercise@1.0.0". */
export function rubricRefsIn(htmlText = "") {
  const out = [...String(htmlText).matchAll(/<oer-rubric\b[^>]*>/gi)].map(([tag]) => {
    const ref = attr(tag, "rubric-id");
    const version = attr(tag, "version");
    return ref ? (version ? `${ref}@${version}` : ref) : "";
  });
  return [...new Set(out.filter(Boolean))];
}

/** The archived version `version` of a deleted rubric that `ref` named (its id, key or address). */
function keptVersion(items, ref, version) {
  const ids = new Set(items.map((i) => i.id));
  return (
    items.find((i) => {
      const m = i.metadata || {};
      if (m.pageType !== RUBRIC_TYPE || !m.oerSnapshotOf || m.version !== version || ids.has(m.oerSnapshotOf)) return false;
      return m.oerSnapshotOf === ref || m.oerRubric?.key === ref || String(i.slug || "").split("/").filter(Boolean).slice(-2, -1)[0] === ref;
    }) || null
  );
}

/**
 * A rubric as a reference shows it: the release `version` names (its
 * archived copy), else the latest. → { page (the latest), shown, missing }
 * where missing means that release isn't on the site (the latest is shown).
 */
export function rubricAt(items = [], ref = "", version = "") {
  const page = findRubric(items, ref);
  if (!page) {
    // a deleted rubric's version kept because this pinned it (versions/versioning.js deletionPlan)
    const kept = version ? keptVersion(items, ref, version) : null;
    return { page: kept, shown: kept, missing: false };
  }
  if (!version || page.metadata?.oerSnapshotOf) return { page, shown: page, missing: false };
  const snapshot = items.find((i) => i.metadata?.oerSnapshotOf === page.id && i.metadata?.version === version);
  return { page, shown: snapshot || page, missing: !snapshot };
}

/**
 * True when two rubric pages (or a page and a release) grade the same way:
 * the same criteria, weights and levels (a new name or description alone
 * isn't a new version).
 */
export function sameRubric(a, b) {
  const norm = (p) => {
    const r = rubricOf(p);
    return JSON.stringify([r.levels, r.criteria]);
  };
  return !!a && !!b && norm(a) === norm(b);
}

/** Equal weights for n criteria: each counts the same. */
export function evenWeights(n) {
  return Array.from({ length: Math.max(0, n) }, () => 1);
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
    // an archived copy is titled "v1.0.0"; it keeps the page's title too
    name: page?.metadata?.oerSnapshotTitle || page?.title || "",
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

/** The criteria's weights added up. */
export const weightTotal = (rubric) => rubric.criteria.reduce((s, c) => s + (Number(c.weight) || 0), 0);

/**
 * The points each criterion is worth when the work is worth `points`: its
 * share (weight over total) in hundredths, adding up to exactly `points`
 * (30 points over weights 1, 1, 1 is 10, 10, 10).
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

const gcd = (a, b) => (b ? gcd(b, a % b) : a);

/**
 * A criterion's share of the grade, for display: "1/3 · 33.3%" (the exact
 * fraction too when the weights are whole numbers and the percentage isn't
 * exact), else "40%".
 */
export function shareLabel(weight, total) {
  const w = Number(weight) || 0;
  const t = Number(total) || 0;
  if (t <= 0) return "0%";
  const pct = `${Math.round((w / t) * 1000) / 10}%`;
  // as whole numbers (0.5 of 1.5 is 5 of 15), then the reduced fraction
  const places = Math.min(4, Math.max(...[w, t].map((x) => (String(x).split(".")[1] || "").length)));
  const [a, b] = [w, t].map((x) => Math.round(x * 10 ** places));
  if (a > 0 && a < b && (a * 1000) % b !== 0) {
    const g = gcd(a, b);
    if (b / g <= 12) return `${a / g}/${b / g} · ${pct}`;
  }
  return pct;
}

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
