/**
 * Analyse a Canvas course (lms/canvas-reader.js) against the site: an
 * import plan the review wizard shows and the import applies
 * (lms/oer-canvas-import.js). Plain functions with no browser or HAX
 * dependencies.
 *
 * For each module item: what it becomes (an action and a site type), with
 * the reasons, and its place in the draft course sequence (role, due week,
 * points, grade group, rubric):
 * - link: the site already has it. Its embedded or linked page's address
 *   matches a page's, or its title does; the sequence points at the page
 *   (under the item's Canvas title).
 * - create: a new draft page of the suggested type, its HTML cleaned.
 * - overview: the module's to-do page, kept as written as the module's
 *   overview in the sequence.
 * - text: a page about running this course (welcome, syllabus, policies),
 *   kept in the sequence as one of its own pages, not in the library.
 * - url / header: a link or text header in the sequence only.
 * - skip: instructor-only material, surveys, external tools, New Quizzes.
 * Modules keep their week (or span: Weeks 14–15; or none: open all term),
 * their order rules and prerequisites, and items their availability dates.
 * Rubrics that are the same are merged, and reuse a site rubric with the
 * same criteria. Due dates become teaching weeks from the course's start.
 * Links in what comes over are listed (plan.links, links/link-model.js):
 * ones to the old course sites point at the pages here that they mean; the
 * rest can be checked for dead links by the local helper.
 * Files come over only when ticked: a course's files can include student
 * work, and uploaded files are public once the site is published.
 *
 *   const plan = planImport(course, siteItems);
 */
import { cleanCanvasHtml, htmlText, placeholdersIn, questionsHtml } from "./canvas-html.js";
import { rubricPages, rubricOf } from "../rubrics/rubric-model.js";
import { addressIndex, alike, analyseLink, matchAddress, isOldSite, linksIn as linksInHtml, linkContexts, courseCode, reviewable } from "../links/link-model.js";

/* ---------- words and matching ---------- */

const STOP = new Set("a an and the of to for in on at by with your you my our is are be this that it as or from into about week module page discussion assignment required optional read".split(" "));
// words of a title or address: lower case, plural s off, small numbers (list
// counters) out, course numbers (100+) kept
export function words(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/\.(html?|php|aspx?)$/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((w) => w && !STOP.has(w) && !(/^\d+$/.test(w) && Number(w) < 100))
    .map((w) => (w.length > 3 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w));
}

const tail = (url) => {
  try {
    const u = new URL(url);
    return u.pathname.split("/").filter(Boolean).pop() || u.hostname;
  } catch {
    return String(url).split("/").filter(Boolean).pop() || "";
  }
};
const iframesIn = (html) => [...String(html || "").matchAll(/<(?:iframe|oer-iframe)\b[^>]*\ssrc="(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
const linksIn = (html) => [...String(html || "").matchAll(/<a\b[^>]*\shref="(https?:\/\/[^"]+)"/g)].map((m) => m[1]);

const NOT_MATCHABLE = new Set(["oer:system", "oer:heading", "oer:section", "oer:sequence", "oer:rubric"]);
const ROLE_TYPES = {
  page: ["oer:lesson", "oer:article", "oer:tutorial", "oer:lecture", "oer:resource", "oer:book"],
  assignment: ["oer:activity", "oer:exercise", "oer:reflection", "oer:project"],
  discussion: ["oer:activity", "oer:exercise", "oer:reflection"],
  quiz: ["oer:quiz"],
  link: ["oer:resource", "oer:book", "oer:course", "oer:lesson", "oer:article"],
  file: ["oer:resource"],
};

/**
 * Site pages an item could be: [{ id, title, score, why }], best first. The
 * address of a page the item embeds (or a link item's address) is strong
 * evidence, an exact match strongest; a link in its text is weak (a prompt
 * mentions pages it isn't); so is a one-word address.
 */
export function matchCandidates(entry, site) {
  const titleWords = words(entry.title);
  const strong = [...new Set([...(entry.url ? [entry.url] : []), ...iframesIn(entry.rawHtml)])];
  const weak = linksIn(entry.rawHtml).filter((u) => !strong.includes(u));
  const out = [];
  for (const c of site) {
    let score = alike(titleWords, c.words);
    let why = score >= 0.5 ? `its title is like “${c.page.title}”` : "";
    let exact = false;
    for (const url of [...strong, ...weak]) {
      const isStrong = strong.includes(url);
      // this site's own page, embedded or linked (a course exported from here)
      if (c.slug && url.replace(/[?#].*$/, "").replace(/\/$/, "").endsWith(`/${c.slug}`)) {
        score = 1;
        exact = true;
        why = `it shows this site's “${c.page.title}”`;
        break;
      }
      const t = words(tail(url));
      let s = alike(t, c.slugWords);
      const same = t.length >= 2 && t.join("-") === c.slugWords.join("-");
      if (!isStrong || t.length < 2) s = Math.min(s, 0.6);
      if (s > score || (s >= 0.7 && score >= 0.5) || (same && isStrong)) {
        const both = score >= 0.5 && s >= 0.5;
        score = Math.min(1, Math.max(s, score) + (both ? 0.1 : 0));
        exact = exact || (same && isStrong);
        why = `${both ? "its title and " : ""}the page it ${entry.url === url ? "links to" : isStrong ? "embeds" : "mentions"} (${tail(url)}) ${both ? "match" : "matches"} “${c.page.title}”`;
      }
    }
    // the kind of page this item would be
    if ((ROLE_TYPES[entry.kind] || []).includes(c.page.metadata?.pageType)) score += 0.03;
    if (entry.kind === "discussion" && /discussion/i.test(c.page.title)) score += 0.1;
    if (score >= 0.5) out.push({ id: c.page.id, title: c.page.title, slug: c.page.slug, type: c.page.metadata?.pageType || "", score: Math.min(1, Math.round(score * 100) / 100), rank: score + (exact ? 0.5 : 0), why });
  }
  return out.sort((a, b) => b.rank - a.rank).slice(0, 5).map(({ rank, ...c }) => c);
}

/* ---------- dates ---------- */

// the course's time zone, from its start (Canvas stores midnight local in UTC)
function zoneOf(course) {
  if (course.timeZone) return course.timeZone;
  const hour = Number(String(course.start).match(/T(\d\d)/)?.[1]);
  return { 4: "America/New_York", 5: "America/New_York", 6: "America/Chicago", 7: "America/Denver", 8: "America/Los_Angeles", 9: "America/Anchorage", 10: "Pacific/Honolulu" }[hour] || "UTC";
}

// a UTC timestamp (no offset, as Canvas writes them) in a time zone
function local(utc, zone) {
  if (!utc) return null;
  const d = new Date(`${utc.replace(/Z$/, "")}Z`);
  if (Number.isNaN(d.getTime())) return null;
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", weekday: "short", hourCycle: "h23" })
      .formatToParts(d)
      .map((x) => [x.type, x.value]),
  );
  return { date: `${p.year}-${p.month}-${p.day}`, time: `${p.hour}:${p.minute}`, day: p.weekday };
}

const dayNumber = (ymd) => Math.floor(Date.UTC(...ymd.split("-").map((x, i) => Number(x) - (i === 1 ? 1 : 0))) / 86400000);

/* ---------- what an item becomes ---------- */

const TODO = /^(?:(?:week|weeks|module|unit)\s*[\d][\d\s&,–-]*(?:and\s*\d+)?\s*:?\s*)?(?:to ?-?do|overview|checklist|agenda|this week)\b|^(?:week|weeks|module|unit)\s*[\d][\d\s&,–-]*:?\s*(?:to ?-?do|overview|checklist|agenda)/i;
const INSTRUCTOR = /\b(faculty|instructor only|instructors only|teacher|professor guidance|course prep|todos?\b|to update|staff only|course template|sandbox)\b/i;
const SURVEY = /\b(survey|feedback session|evaluation|course feedback|wrap-?up)\b/i;
const VIDEO = /kaltura|youtube|youtu\.be|vimeo|panopto|loom/i;

function pageType(title, html, text) {
  const n = text.split(/\s+/).filter(Boolean).length;
  if (VIDEO.test(html) && n < 250) return ["oer:lecture", "it's mostly a video"];
  if (/\b(how to|tutorial|step[- ]by[- ]step|walkthrough)\b/i.test(title)) return ["oer:tutorial", "its title says it's a how-to"];
  if (/\b(reading|article|essay)\b/i.test(title) || (n > 900 && (html.match(/<h[2-4]/gi) || []).length >= 3)) return ["oer:article", n > 900 ? "it's a long read with sections" : "its title says it's a reading"];
  if (/\b(resource|tip|links?|toolkit|reference)\b/i.test(title)) return ["oer:resource", "its title says it's a resource"];
  return ["oer:lesson", "a page of course material"];
}

function assignmentType(a, title, group) {
  const g = group?.title || "";
  if ((Number(a.points) || 0) >= 50 || /\b(final project|portfolio)\b/i.test(title)) return ["oer:project", (Number(a.points) || 0) >= 50 ? `${a.points} points make it a project` : "its title says it's a project"];
  if (/\bproject\b/i.test(title) || /\bproject\b/i.test(g)) return ["oer:activity", "a step of a project"];
  if (/\b(reading responses?|responses?|reflections?|reflect|journal)\b/i.test(`${title} ${g}`)) return ["oer:reflection", "its title or group says it's a reading response or reflection"];
  if (/\b(exercise|practice|lab|drill|worksheet)\b/i.test(`${title} ${g}`)) return ["oer:exercise", "its title or group says it's practice"];
  return ["oer:activity", "work students hand in"];
}

/* ---------- rubrics ---------- */

// a Canvas rubric in the site's shape: weights are criterion points
// (relative); levels are the ratings' names, worth their share of points
function siteRubric(r) {
  const names = [];
  const shares = new Map();
  for (const c of r.criteria) {
    for (const x of [...c.ratings].sort((a, b) => b.points - a.points)) {
      const name = x.name || "Rating";
      if (!names.includes(name)) names.push(name);
      const list = shares.get(name) || [];
      list.push(c.points > 0 ? x.points / c.points : 0);
      shares.set(name, list);
    }
  }
  const levels = names.map((name, i) => ({ id: `level-${i + 1}`, name, share: Math.round(((shares.get(name) || [0]).reduce((s, v) => s + v, 0) / (shares.get(name) || [0]).length) * 100) / 100 }));
  levels.sort((a, b) => b.share - a.share);
  return {
    name: r.title.replace(/\s*\(\d+\)\s*$/, "").trim() || "Rubric",
    description: r.description || "",
    levels,
    criteria: r.criteria.map((c, i) => ({
      id: c.id || `criterion-${i + 1}`,
      name: c.name,
      // Canvas keeps rubric text as HTML (<br/>); the site's is plain text
      description: htmlText(c.description || ""),
      weight: c.points || 1,
      descriptors: Object.fromEntries(c.ratings.filter((x) => x.description).map((x) => [levels.find((l) => l.name === (x.name || "Rating"))?.id, htmlText(x.description)])),
    })),
  };
}
const rubricShape = (r) => JSON.stringify(r.criteria.map((c) => [words(c.name).join(" "), c.weight, (c.ratings || []).length]));
const criteriaNames = (criteria) => criteria.map((c) => words(c.name).join(" ")).sort().join("|");

/* ---------- the plan ---------- */

/** The import plan for a Canvas course, against the site's items. */
export function planImport(course, items = []) {
  const zone = zoneOf(course);
  const start = local(course.start, zone)?.date || "";
  const site = items
    .filter((i) => !i.metadata?.oerSnapshotOf && !i.metadata?.oerRef && !NOT_MATCHABLE.has(i.metadata?.pageType))
    .map((page) => ({ page, words: words(page.title), slug: page.slug, slugWords: words(String(page.slug || "").split("/").pop()) }));
  const groupsById = new Map(course.groups.map((g) => [g.id, g]));
  const addresses = addressIndex(items);
  const problems = [...course.problems];

  // rubrics: merge the same, reuse the site's
  const siteRubrics = rubricPages(items).map((p) => ({ page: p, names: criteriaNames(rubricOf(p).criteria) }));
  const rubrics = [];
  const rubricFor = new Map(); // canvas rubric id → plan rubric
  for (const r of course.rubrics.values()) {
    const shape = rubricShape({ criteria: r.criteria.map((c) => ({ name: c.name, weight: c.points, ratings: c.ratings })) });
    let plan = rubrics.find((x) => x.shape === shape);
    if (!plan) {
      const data = siteRubric(r);
      const existing = siteRubrics.find((x) => x.names === criteriaNames(data.criteria));
      plan = { id: `rubric-${rubrics.length + 1}`, shape, canvas: [], title: data.name, data, action: existing ? "reuse" : "create", match: existing ? { id: existing.page.id, title: existing.page.title, key: existing.page.metadata?.oerRubric?.key || existing.page.id } : null, uses: 0 };
      rubrics.push(plan);
    }
    plan.canvas.push(r.id);
    rubricFor.set(r.id, plan);
  }

  // an item in the plan
  const entryFor = (it, moduleTitle, moduleSkip) => {
    const e = { id: it.id, kind: it.kind, ref: it.ref || "", title: it.title, canvasTitle: it.title, indent: it.indent, url: it.url || "", rawHtml: "", html: "", reasons: [], action: "create", type: "", role: null, candidates: [], match: null, files: [], skipped: [] };
    const skip = (why) => Object.assign(e, { action: "skip", reasons: [why, ...e.reasons] });
    let src = null;
    if (it.kind === "page") src = course.pages.get(it.ref);
    if (it.kind === "assignment") src = course.assignments.get(it.ref);
    if (it.kind === "discussion") src = course.discussions.get(it.ref);
    if (it.kind === "quiz") src = course.quizzes.get(it.ref);
    e.rawHtml = src?.html || "";
    if (it.kind === "page" && src?.slug) e.slug = src.slug;
    e.html = cleanCanvasHtml(e.rawHtml);
    e.files = [...placeholdersIn(e.html).files];
    e.links = linksInHtml(e.html).map((l) => l.url);
    const text = htmlText(e.html);
    e.words = text.split(/\s+/).filter(Boolean).length;

    if (it.kind === "header") return Object.assign(e, { action: "header", role: { header: it.title }, reasons: ["a text header in the module"] });
    if (it.kind === "tool") return skip("an external tool (LTI) can't come over");
    if (it.kind === "unknown") return skip(`Canvas ${it.canvasType || "content"} the site has no equivalent for`);
    if (moduleSkip) skip(moduleSkip);
    else if (INSTRUCTOR.test(it.title)) skip("its title says it's for instructors");
    else if (it.published === false) skip("it's unpublished in Canvas");

    // the sequence role and settings
    const graded = (a) => a && a.gradingType !== "not_graded" && (Number(a.points) || 0) > 0;
    const due = (utc) => {
      const d = local(utc, zone);
      if (!d) return null;
      const week = start ? Math.max(1, Math.floor((dayNumber(d.date) - dayNumber(start)) / 7) + 1) : null;
      const out = { week };
      // Sunday 11:59 pm is the term default: leave it implied
      if (!(d.day === "Sun" && d.time >= "23:59")) Object.assign(out, { day: d.day, time: d.time });
      return out;
    };
    // an availability date: its week (from the start), day and time
    const when = (utc) => {
      const d = local(utc, zone);
      if (!d || !start) return undefined;
      return { week: Math.max(1, Math.floor((dayNumber(d.date) - dayNumber(start)) / 7) + 1), day: d.day, time: d.time };
    };
    const assignmentRole = (a, as) => {
      const rubric = a.rubric ? rubricFor.get(a.rubric) : null;
      if (rubric) rubric.uses++;
      return {
        as,
        due: due(a.dueAt) || undefined,
        unlock: when(a.unlockAt),
        lock: when(a.lockAt),
        points: Number(a.points) || 0,
        graded: graded(a),
        group: a.group || "",
        rubric: rubric?.id || "",
        submission: as === "assignment" ? (a.submission.length && !a.submission.includes("none") ? a.submission.filter((s) => s !== "discussion_topic") : ["none"]) : undefined,
        extensions: a.extensions?.length ? a.extensions : undefined,
        peerReviews: a.peerReviews ? { count: a.peerCount || 1, anonymous: a.anonymousPeerReviews } : undefined,
        groupSet: a.groupSet || undefined,
        gradeIndividually: a.gradeIndividually || undefined,
      };
    };

    if (it.kind === "page") {
      const [type, why] = pageType(it.title, e.rawHtml, text);
      Object.assign(e, { type, role: { as: "page" } });
      if (e.action !== "skip") {
        if (TODO.test(it.title)) Object.assign(e, { action: "overview", reasons: ["the module's to-do page: kept as written as the module's overview in the sequence"] });
        else if (/\b(syllabus|welcome|course information|getting started|communication|policies|netiquette|etiquette|office hours|course schedule)\b/i.test(it.title)) Object.assign(e, { action: "text", reasons: ["about running this course: kept in the sequence as one of its own pages, not in the library"] });
        else e.reasons.push(why);
      }
    } else if (it.kind === "assignment") {
      const a = src || {};
      if (a.newQuiz) skip("a New Quiz: its questions aren't in this export");
      const [type, why] = assignmentType(a, it.title, groupsById.get(a.group));
      Object.assign(e, { type, role: assignmentRole(a, "assignment") });
      if (e.action !== "skip") e.reasons.push(why);
    } else if (it.kind === "discussion") {
      const d = src || {};
      const reflects = /\b(reading responses?|responses?|reflections?|reflect|journal)\b/i.test(it.title || "");
      Object.assign(e, { type: reflects ? "oer:reflection" : "oer:activity", role: d.assignment ? { ...assignmentRole(d.assignment, "discussion"), requireInitialPost: d.requireInitialPost, groupSet: d.groupSet || undefined } : { as: "discussion", graded: false, requireInitialPost: d.requireInitialPost } });
      const page = reflects ? "a reflection page" : "an activity page";
      if (e.action !== "skip") e.reasons.push(d.assignment ? `a graded discussion: ${page} as its prompt` : `a discussion: ${page} as its prompt`);
    } else if (it.kind === "quiz") {
      const q = src || {};
      const built = questionsHtml(q.questions || []);
      e.html = [e.html, built.html].filter(Boolean).join("\n");
      e.links = linksInHtml(e.html).map((l) => l.url);
      e.skipped = built.skipped;
      Object.assign(e, { type: "oer:quiz", role: { as: "quiz", quizType: q.quizType === "assignment" ? "graded" : "practice", due: due(q.dueAt) || undefined, group: q.group || "", points: q.points } });
      if (e.action !== "skip") {
        if (q.quizType === "survey" || q.quizType === "graded_survey" || SURVEY.test(it.title)) skip("a survey: no right answers to bring over");
        else if (!built.html) skip("none of its questions have right answers the site can check");
        else e.reasons.push(`a quiz with ${(q.questions || []).length - built.skipped.length} of ${(q.questions || []).length} questions the site can use`);
      }
    } else if (it.kind === "link") {
      e.links = it.url ? [it.url] : [];
      Object.assign(e, { action: e.action === "skip" ? "skip" : "url", role: { as: "url", title: it.title, url: it.url, newTab: true } });
      if (e.action !== "skip") e.reasons.push("a link: in the sequence, no page needed");
    } else if (it.kind === "file") {
      const file = course.files.get(it.ref);
      e.files = file ? [file.path] : [];
      Object.assign(e, { type: "oer:resource", role: { as: "file", file: file?.path || "" } });
      if (e.action !== "skip") e.reasons.push("a file: a resource page with it attached (tick the file to bring it)");
      if (!file) skip("its file isn't in the export");
    }

    // the site may already have it
    if (["page", "assignment", "discussion", "quiz", "link", "file"].includes(it.kind)) {
      e.candidates = matchCandidates(e, site);
      // an embedded or linked page on an old course site that's here now
      const known = [...new Set([...(e.url ? [e.url] : []), ...iframesIn(e.rawHtml)])]
        .filter((u) => isOldSite(u))
        .flatMap((u) => matchAddress(u, addresses).filter((c) => c.score >= 0.97).map((c) => ({ ...c, score: 1, why: `the old page it ${u === e.url ? "links to" : "embeds"} (${tail(u)}) is now “${c.title}”` })));
      if (known.length) e.candidates = [...known.slice(0, 1), ...e.candidates.filter((c) => c.id !== known[0].id)].slice(0, 5);
      const best = e.candidates[0];
      if (best && best.score >= 0.8 && !["skip", "overview"].includes(e.action)) {
        e.match = best;
        e.action = "link";
        e.reasons.unshift(`the site has it: ${best.why}`);
        if (e.role?.as === "url") e.role = { as: "page" };
      }
    }
    e.confidence = e.action === "link" ? (e.match.score >= 0.95 ? "high" : "medium") : ["skip", "header", "url", "overview"].includes(e.action) ? "high" : e.type === "oer:lesson" ? "low" : "medium";
    return e;
  };

  // modules → the sequence's weeks: a span (Weeks 14–15), or none for the
  // modules before the first week that set no work (Start here, Resources)
  const modules = [];
  const titled = course.modules.map((m) => {
    const span = m.title.match(/\bweeks?\s*(\d+)\s*(?:-|–|—|&|and|to|through)\s*(?:week\s*)?(\d+)/i);
    const one = m.title.match(/\bweek\s*(\d+)/i);
    return span ? { week: Number(span[1]), weeks: Math.max(1, Number(span[2]) - Number(span[1]) + 1) } : one ? { week: Number(one[1]), weeks: 1 } : null;
  });
  const firstWeekly = titled.findIndex(Boolean);
  let lastEnd = 0;
  for (const [mi, m] of course.modules.entries()) {
    const hidden = m.unlockAt && Number(m.unlockAt.slice(0, 4)) > new Date().getFullYear() + 5;
    const moduleSkip = INSTRUCTOR.test(m.title) ? "the module is for instructors" : hidden ? "the module is hidden from students (it opens in the far future)" : !m.published ? "the module is unpublished in Canvas" : "";
    const items2 = m.items.map((it) => entryFor(it, m.title, moduleSkip));
    const dueWeeks = items2.map((e) => e.role?.due?.week).filter(Boolean);
    let week;
    let weeks = 1;
    if (titled[mi]) ({ week, weeks } = titled[mi]);
    else if (!dueWeeks.length && (firstWeekly < 0 ? mi === 0 : mi < firstWeekly)) week = "";
    else if (dueWeeks.length) {
      week = Math.min(...dueWeeks);
      const nextStart = titled.slice(mi + 1).find(Boolean)?.week || Infinity;
      weeks = Math.max(1, Math.min(Math.max(...dueWeeks), nextStart - 1) - week + 1);
    } else week = lastEnd ? lastEnd + 1 : 1;
    if (week) lastEnd = week + weeks - 1;
    // one overview per module: the first to-do page; any others stay pages
    let overview = false;
    for (const e of items2) {
      if (e.action !== "overview") continue;
      if (overview) Object.assign(e, { action: "text", reasons: ["another to-do page in the module: kept in the sequence as a page"] });
      overview = true;
    }
    if (!week) for (const e of items2) if (e.action === "create" && e.kind === "page") Object.assign(e, { action: "text", reasons: ["course information in a module that runs all term: kept in the sequence as one of its own pages", ...e.reasons] });
    const opens = !hidden && m.unlockAt ? local(m.unlockAt, zone) : null;
    const unlock = opens && start ? { week: Math.max(1, Math.floor((dayNumber(opens.date) - dayNumber(start)) / 7) + 1), day: opens.day, time: opens.time } : undefined;
    modules.push({ id: m.id, title: m.title, week, weeks, sequential: !!m.sequential, prerequisites: m.prerequisites || [], unlock, skip: !!moduleSkip, reason: moduleSkip, items: items2 });
  }

  // pages and quizzes not in any module
  const placed = new Set(course.modules.flatMap((m) => m.items.map((i) => i.ref)));
  const unplaced = [
    ...[...course.pages.values()].filter((p) => !placed.has(p.id)).map((p) => ({ id: `page:${p.id}`, kind: "page", ref: p.id, title: p.title, indent: 0, published: p.published })),
    ...[...course.quizzes.values()].filter((q) => !placed.has(q.id)).map((q) => ({ id: `quiz:${q.id}`, kind: "quiz", ref: q.id, title: q.title, indent: 0, published: q.published })),
  ].map((it) => {
    const e = entryFor(it, "", "");
    if (e.action !== "skip" && e.action !== "link") Object.assign(e, { action: "skip", reasons: ["it isn't in any module", ...e.reasons] });
    return e;
  });

  // files the imported items use; none come over unless ticked
  const all = [...modules.flatMap((m) => m.items), ...unplaced];
  const files = [...course.files.values()].map((f) => {
    const usedBy = all.filter((e) => e.files.includes(f.path)).map((e) => e.id);
    return { path: f.path, name: f.name, usedBy, import: false };
  });

  // grade groups
  const used = new Set(all.map((e) => e.role?.group).filter(Boolean));
  const groups = course.groups.filter((g) => used.has(g.id) || g.weight > 0).map((g) => ({ id: g.id, name: g.title, weight: g.weight }));
  const total = groups.reduce((s, g) => s + g.weight, 0);
  if (groups.length && Math.round(total) !== 100) problems.push({ level: "info", text: `The Canvas grade groups add up to ${total}%, not 100%; adjust them in the sequence's Course settings.` });

  // links: each address once, with what's known about it
  const hint = courseCode(course.code || course.title);
  const tags = new Map();
  for (const e of all) for (const l of linksInHtml(e.html)) if (!tags.has(l.url)) tags.set(l.url, l.tag);
  const links = [...new Set(all.flatMap((e) => e.links || []))]
    .map((url) => analyseLink(url, addresses, { hint, tag: tags.get(url) || "a" }))
    .filter((l) => l && l.kind !== "site")
    .map(reviewable);

  // the course page: one of the site's with the same course code
  const code = String(course.code || course.title).match(/\b([A-Z]{2,5})\s*-?\s*(\d{3})\b/);
  const coursePage = code ? items.find((i) => i.metadata?.pageType === "oer:course" && !i.metadata?.oerSnapshotOf && String(i.metadata?.oerFields?.code || i.title).replace(/\s+/g, " ").toUpperCase().startsWith(`${code[1]} ${code[2]}`)) : null;
  const weeks = Math.max(1, ...modules.filter((m) => !m.skip).flatMap((m) => [Number(m.week) ? Number(m.week) + m.weeks - 1 : 0, ...m.items.map((e) => e.role?.due?.week || 0)]));

  return {
    course: { title: course.title, code: code ? `${code[1]} ${code[2]}` : "", start, timeZone: zone, weeks },
    coursePage: coursePage ? { id: coursePage.id, title: coursePage.title } : null,
    sequenceTitle: `${code ? `${code[1]} ${code[2]}` : course.title}: ${weeks}-week (from Canvas)`,
    modules,
    unplaced,
    rubrics,
    groups,
    files,
    links,
    problems,
  };
}

// what of an entry comes over: a page's text, or a link item's address
const carried = (e) => (["create", "text", "overview", "url"].includes(e.action) ? e.links || [] : []);

// an entry's links with their words and sentences, worked out once per text
const contextCache = new Map();
function contextsOf(htmlText) {
  if (!contextCache.has(htmlText)) {
    if (contextCache.size > 500) contextCache.clear();
    contextCache.set(htmlText, linkContexts(htmlText));
  }
  return contextCache.get(htmlText);
}

/**
 * The plan's links in what comes over, each with where it's used:
 * [{ ...link, uses: [{ id, title, text, before, after, count, item }] }]
 * (text: the link's words; before/after: its sentence; item: it's the
 * module's link item itself). Links only in skipped items, or in items
 * linked to the site's pages (whose own text is used), aren't listed.
 */
export function importedLinks(plan) {
  const uses = new Map();
  const entries = [...plan.modules.filter((m) => !m.skip).flatMap((m) => m.items), ...plan.unplaced].filter((e) => e.action !== "skip");
  for (const e of entries) {
    for (const url of carried(e)) {
      const here = e.action === "url" ? [] : contextsOf(e.html).filter((c) => c.url === url);
      const use = { id: e.id, title: e.title, ...(here[0] ? { text: here[0].text, before: here[0].before, after: here[0].after } : {}), count: here.length || 1, ...(e.action === "url" ? { item: true } : {}) };
      uses.set(url, [...(uses.get(url) || []), use]);
    }
  }
  return (plan.links || []).filter((l) => uses.has(l.url)).map((l) => ({ ...l, uses: uses.get(l.url) }));
}

/** Counts for a summary: what the import will do. */
export function planCounts(plan) {
  const all = [...plan.modules.filter((m) => !m.skip).flatMap((m) => m.items), ...plan.unplaced];
  const n = (pred) => all.filter(pred).length;
  return {
    create: n((e) => e.action === "create"),
    link: n((e) => e.action === "link"),
    skip: n((e) => e.action === "skip") + plan.modules.filter((m) => m.skip).reduce((s, m) => s + m.items.length, 0),
    urls: n((e) => e.action === "url"),
    overviews: n((e) => e.action === "overview"),
    texts: n((e) => e.action === "text"),
    rubricsNew: plan.rubrics.filter((r) => r.action === "create" && r.uses).length,
    rubricsReused: plan.rubrics.filter((r) => r.action === "reuse" && r.uses).length,
    files: plan.files.filter((f) => f.import).length,
    linksHere: importedLinks(plan).filter((l) => l.action === "page").length,
  };
}
