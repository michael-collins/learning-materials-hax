/**
 * Read a Canvas course export (.imscc, a Canvas Course Export Package) into
 * a plain course model for the import (lms/canvas-import-plan.js). Also
 * reads a plain Common Cartridge from another LMS as far as it goes: its
 * organization becomes the modules, its web pages, discussions and links
 * come through. Format: nu-hax/docs/canvas-package-format.md, traced to
 * canvas-lms. No browser or Node dependencies (the zip reader inflates with
 * the platform's DecompressionStream).
 *
 *   const course = await readCanvasPackage(bytes);
 *   → { title, code, start, end, timeZone, modules, pages, assignments,
 *       discussions, quizzes, files, groups, rubrics, syllabus, problems,
 *       canvas, zip }
 * Maps (pages, assignments, …) are keyed by the package's identifiers, which
 * module items name; HTML keeps Canvas's link tokens ($IMS-CC-FILEBASE$,
 * $WIKI_REFERENCE$, $CANVAS_OBJECT_REFERENCE$) for the import to resolve.
 */
import { readZip } from "./zip.js";
import { parseXml, child, children, find, findAll, textOf, childText } from "./xml-lite.js";

const bool = (v) => String(v).trim() === "true";
const num = (v) => (v === "" || v == null ? null : Number(v));
const bodyOf = (htmlText) => (String(htmlText || "").match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? String(htmlText || "")).trim();
const titleOf = (htmlText) => (String(htmlText || "").match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "").trim();
const metaOf = (htmlText, name) => String(htmlText || "").match(new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`, "i"))?.[1] || "";

// module item content types → the model's kinds
const KINDS = {
  WikiPage: "page",
  Assignment: "assignment",
  DiscussionTopic: "discussion",
  "Quizzes::Quiz": "quiz",
  Quiz: "quiz",
  Attachment: "file",
  ExternalUrl: "link",
  ContextModuleSubHeader: "header",
  ContextExternalTool: "tool",
};

// an assignment's settings (assignment_settings.xml, or the <assignment>
// nested in a graded discussion or quiz)
function assignmentFields(node) {
  const submission = childText(node, "submission_types").split(",").map((s) => s.trim()).filter(Boolean);
  const toolUrl = childText(node, "external_tool_url") || textOf(find(node, "url"));
  return {
    title: childText(node, "title"),
    dueAt: childText(node, "due_at"),
    unlockAt: childText(node, "unlock_at"),
    points: num(childText(node, "points_possible")),
    gradingType: childText(node, "grading_type") || "points",
    submission,
    group: childText(node, "assignment_group_identifierref"),
    rubric: childText(node, "rubric_identifierref"),
    peerReviews: bool(childText(node, "peer_reviews")),
    peerCount: num(childText(node, "peer_review_count")) || 0,
    anonymousPeerReviews: bool(childText(node, "anonymous_peer_reviews")),
    groupSet: bool(childText(node, "has_group_category")) ? childText(node, "group_category") || "Groups" : "",
    gradeIndividually: bool(childText(node, "grade_group_students_individually")),
    extensions: childText(node, "allowed_extensions").split(",").map((s) => s.trim()).filter(Boolean),
    published: childText(node, "workflow_state") !== "unpublished",
    // a New Quiz is an assignment that opens the quizzes tool
    newQuiz: submission.includes("external_tool") && /quiz-lti|quizzes-next|quiz_lti|quiz\.instructure/i.test(toolUrl),
    tool: submission.includes("external_tool") ? toolUrl : "",
  };
}

// a classic quiz's questions (Canvas-flavoured QTI 1.2)
function qtiQuestions(qti) {
  return findAll(qti, "item").map((item) => {
    const meta = Object.fromEntries(findAll(item, "qtimetadatafield").map((f) => [childText(f, "fieldlabel"), childText(f, "fieldentry")]));
    const presentation = child(item, "presentation");
    const prompt = textOf(find(child(presentation, "material") || presentation, "mattext"));
    const labels = findAll(presentation, "response_label").map((l) => ({ id: l.attrs.ident, text: textOf(find(l, "mattext")) }));
    // correct answers: the varequal of a condition that sets SCORE to 100
    // (multiple answers: every varequal not inside <not>)
    const correct = new Set();
    for (const rc of findAll(item, "respcondition")) {
      const setvar = child(rc, "setvar");
      if (!setvar || Number(textOf(setvar)) < 100) continue;
      const cond = child(rc, "conditionvar");
      const walk = (n, negated) => {
        for (const c of n?.children || []) {
          if (c.name === "not") walk(c, true);
          else if (c.name === "varequal") !negated && correct.add(textOf(c));
          else walk(c, negated);
        }
      };
      walk(cond, false);
    }
    const feedback = findAll(item, "itemfeedback")
      .filter((f) => /general|correct/i.test(f.attrs.ident || ""))
      .map((f) => textOf(find(f, "mattext")))
      .filter(Boolean)
      .join(" ");
    return {
      type: meta.question_type || "",
      points: num(meta.points_possible) || 0,
      prompt,
      answers: labels.map((l) => ({ text: l.text, correct: correct.has(l.id) })),
      feedback,
    };
  });
}

/** Read a Canvas course export (bytes of the .imscc). */
export async function readCanvasPackage(input) {
  const zip = readZip(input);
  const manifestText = await zip.text("imsmanifest.xml");
  if (!manifestText) throw new Error("This isn't a Canvas or Common Cartridge export: there's no imsmanifest.xml in it.");
  const manifest = parseXml(manifestText);
  const problems = [];
  const xml = async (name) => {
    const t = await zip.text(name);
    return t ? parseXml(t) : null;
  };

  // resources by identifier
  const resources = new Map();
  for (const r of findAll(manifest, "resource")) {
    resources.set(r.attrs.identifier, {
      id: r.attrs.identifier,
      type: r.attrs.type || "",
      href: r.attrs.href || "",
      files: children(r, "file").map((f) => f.attrs.href),
      deps: children(r, "dependency").map((d) => d.attrs.identifierref),
    });
  }
  const canvas = zip.has("course_settings/canvas_export.txt") || zip.has("course_settings/module_meta.xml");

  /* ---------- course settings ---------- */
  const settings = await xml("course_settings/course_settings.xml");
  const title = childText(settings, "title") || textOf(find(find(manifest, "metadata"), "string")) || "Imported course";
  const course = {
    canvas,
    title,
    code: childText(settings, "course_code"),
    start: childText(settings, "start_at"),
    end: childText(settings, "conclude_at"),
    timeZone: childText(settings, "time_zone"),
    syllabus: bodyOf(await zip.text("course_settings/syllabus.html")),
    zip,
    problems,
  };

  /* ---------- grade groups and rubrics ---------- */
  const groupsXml = await xml("course_settings/assignment_groups.xml");
  course.groups = findAll(groupsXml, "assignmentGroup").map((g) => ({
    id: g.attrs.identifier,
    title: childText(g, "title"),
    position: num(childText(g, "position")) || 0,
    weight: num(childText(g, "group_weight")) || 0,
  }));
  const rubricsXml = await xml("course_settings/rubrics.xml");
  course.rubrics = new Map(
    findAll(rubricsXml, "rubric").map((r) => [
      r.attrs.identifier,
      {
        id: r.attrs.identifier,
        title: childText(r, "title"),
        description: childText(r, "description"),
        points: num(childText(r, "points_possible")) || 0,
        criteria: findAll(r, "criterion").map((c) => ({
          id: childText(c, "criterion_id"),
          name: childText(c, "description"),
          description: childText(c, "long_description"),
          points: num(childText(c, "points")) || 0,
          ratings: findAll(c, "rating").map((x) => ({ name: childText(x, "description"), description: childText(x, "long_description"), points: num(childText(x, "points")) || 0 })),
        })),
      },
    ]),
  );

  /* ---------- wiki pages ---------- */
  course.pages = new Map();
  course.pageSlugs = new Map(); // file slug → identifier, for $WIKI_REFERENCE$/pages/<slug>
  for (const name of zip.names.filter((n) => /^wiki_content\/[^/]+\.html?$/i.test(n))) {
    const text = await zip.text(name);
    const id = metaOf(text, "identifier") || name;
    const slug = name.replace(/^wiki_content\//, "").replace(/\.html?$/i, "");
    course.pages.set(id, { id, slug, title: titleOf(text) || slug, html: bodyOf(text), published: (metaOf(text, "workflow_state") || "active") === "active", front: metaOf(text, "front_page") === "true" });
    course.pageSlugs.set(slug, id);
  }

  /* ---------- assignments ---------- */
  course.assignments = new Map();
  for (const r of resources.values()) {
    const settingsFile = r.files.find((f) => /assignment_settings\.xml$/.test(f));
    if (!settingsFile) continue;
    const node = await xml(settingsFile);
    if (!node) continue;
    const htmlFile = r.files.find((f) => /\.html?$/i.test(f)) || r.href;
    const fields = assignmentFields(node);
    course.assignments.set(r.id, { id: r.id, ...fields, html: bodyOf(await zip.text(htmlFile)) });
  }

  /* ---------- discussions ---------- */
  course.discussions = new Map();
  for (const r of [...resources.values()].filter((x) => x.type === "imsdt_xmlv1p1")) {
    const topic = await xml(r.files[0] || r.href);
    if (!topic) continue;
    const metaRes = r.deps.map((d) => resources.get(d)).find(Boolean);
    const meta = metaRes ? await xml(metaRes.files[0] || metaRes.href) : null;
    if (childText(meta, "type") === "announcement") continue;
    const graded = child(meta, "assignment");
    course.discussions.set(r.id, {
      id: r.id,
      title: childText(topic, "title"),
      html: childText(topic, "text"),
      requireInitialPost: bool(childText(meta, "require_initial_post")),
      groupSet: bool(childText(meta, "has_group_category")) ? childText(meta, "group_category") || "Groups" : "",
      published: childText(meta, "workflow_state") !== "unpublished",
      todoAt: childText(meta, "todo_date"),
      assignment: graded ? assignmentFields(graded) : null,
    });
  }

  /* ---------- classic quizzes ---------- */
  course.quizzes = new Map();
  for (const r of resources.values()) {
    const metaFile = r.files.find((f) => /assessment_meta\.xml$/.test(f));
    if (!metaFile) continue;
    const quizId = metaFile.split("/")[0];
    const meta = await xml(metaFile);
    const qti = await xml(`non_cc_assessments/${quizId}.xml.qti`);
    const graded = child(meta, "assignment");
    course.quizzes.set(quizId, {
      id: quizId,
      title: childText(meta, "title"),
      html: childText(meta, "description"),
      quizType: childText(meta, "quiz_type") || "assignment",
      points: num(childText(meta, "points_possible")) || 0,
      dueAt: childText(meta, "due_at"),
      group: childText(meta, "assignment_group_identifierref") || (graded ? childText(graded, "assignment_group_identifierref") : ""),
      published: childText(meta, "workflow_state") !== "unpublished",
      questions: qti ? qtiQuestions(qti) : [],
    });
  }

  /* ---------- files and links ---------- */
  course.files = new Map(
    zip.names
      .filter((n) => n.startsWith("web_resources/"))
      .map((n) => [n.slice("web_resources/".length), { path: n.slice("web_resources/".length), name: n.split("/").pop() }]),
  );
  course.links = new Map();
  for (const r of [...resources.values()].filter((x) => /imswl/.test(x.type))) {
    const wl = await xml(r.files[0] || r.href);
    if (wl) course.links.set(r.id, { id: r.id, title: childText(wl, "title"), url: find(wl, "url")?.attrs.href || "" });
  }
  const fileOfResource = (id) => {
    const r = resources.get(id);
    const href = r?.href || r?.files?.[0] || "";
    return href.startsWith("web_resources/") ? decodeURIComponent(href.slice("web_resources/".length)) : "";
  };

  /* ---------- modules ---------- */
  const modulesXml = await xml("course_settings/module_meta.xml");
  if (modulesXml) {
    course.modules = findAll(modulesXml, "module").map((m) => ({
      id: m.attrs.identifier,
      title: childText(m, "title"),
      position: num(childText(m, "position")) || 0,
      unlockAt: childText(m, "unlock_at"),
      sequential: bool(childText(m, "require_sequential_progress")),
      published: childText(m, "workflow_state") !== "unpublished",
      items: children(child(m, "items"), "item").map((it) => {
        const type = childText(it, "content_type");
        const kind = KINDS[type] || "unknown";
        const ref = childText(it, "identifierref");
        return {
          id: it.attrs.identifier,
          kind,
          canvasType: type,
          title: childText(it, "title"),
          ref: kind === "file" ? fileOfResource(ref) || ref : ref,
          url: childText(it, "url"),
          indent: num(childText(it, "indent")) || 0,
          published: childText(it, "workflow_state") !== "unpublished",
        };
      }),
    }));
    course.modules.sort((a, b) => a.position - b.position);
  } else {
    // plain Common Cartridge: the organization's top items are the modules
    const org = find(find(manifest, "organizations"), "organization");
    const top = children(find(org, "item"), "item");
    const kindOf = (res) => {
      if (!res) return "header";
      if (res.type === "imsdt_xmlv1p1") return "discussion";
      if (/imswl/.test(res.type)) return "link";
      if (/assessment/.test(res.type)) return "quiz";
      if (res.type === "webcontent" && /\.html?$/i.test(res.href)) return "page";
      if (res.type === "webcontent") return "file";
      return "unknown";
    };
    course.modules = top.map((m, n) => ({
      id: m.attrs.identifier,
      title: childText(m, "title"),
      position: n + 1,
      unlockAt: "",
      sequential: false,
      published: true,
      items: findAll(m, "item").map((it) => {
        const res = resources.get(it.attrs.identifierref);
        const kind = kindOf(res);
        // a CC web page that isn't a Canvas wiki page: read it as a page
        if (kind === "page" && res && !course.pages.has(res.id)) course.pages.set(res.id, { id: res.id, slug: res.href, title: childText(it, "title"), html: "", href: res.href, published: true });
        return { id: it.attrs.identifier, kind, canvasType: res?.type || "", title: childText(it, "title"), ref: kind === "file" ? fileOfResource(res?.id) : res?.id || "", url: "", indent: 0, published: true };
      }),
    }));
    for (const p of course.pages.values()) if (p.href && !p.html) p.html = bodyOf(await zip.text(p.href));
    if (course.modules.length) problems.push({ level: "info", text: "This isn't a Canvas export, so assignments, quizzes and dates may not come through. Its outline became the modules." });
  }

  /* ---------- what can't come over ---------- */
  for (const m of course.modules) {
    for (const it of m.items) {
      if (it.kind === "tool") problems.push({ level: "warning", item: it.id, text: `${m.title}: “${it.title}” is an external tool (LTI), which can't be imported.` });
      if (it.kind === "assignment" && course.assignments.get(it.ref)?.newQuiz) problems.push({ level: "warning", item: it.id, text: `${m.title}: “${it.title}” is a New Quiz. Its questions aren't in this export; export the quiz from Canvas as QTI to bring them.` });
      if (it.kind === "unknown") problems.push({ level: "warning", item: it.id, text: `${m.title}: “${it.title}” (${it.canvasType || "unknown type"}) can't be imported.` });
    }
  }
  return course;
}
