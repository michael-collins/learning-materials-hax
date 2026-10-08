/**
 * A course offering as a Canvas Course Export Package (.imscc): the format
 * Canvas writes when it exports a course, which its "Import Course Content"
 * reads back with modules, assignments (due dates, points, submission
 * types, rubrics, groups and weights), quizzes, pages, links and calendar
 * events intact. Plain functions with no browser or HAX dependencies, so
 * the course builder and nu-hax/scripts/canvas-export.mjs share it.
 *
 * Format: nu-hax/docs/canvas-package-format.md, traced to canvas-lms. The
 * rules that bite: Canvas recognises the package by
 * course_settings/canvas_export.txt; it reads course_settings/, wiki_content/
 * and non_cc_assessments/ by path; it takes the first matching element, so
 * a parent's own fields come before nested blocks; a missing referenced
 * file fails the whole import; dates are UTC without an offset.
 *
 * Content is embedded, not copied: pages and assignment instructions show
 * the live page (its ?embed=1 view) in an iframe, with a link to open it.
 * Quizzes are built from the page's questions (multiple choice, true/false;
 * self-checks become ungraded short essays with the model answer as
 * feedback). Canvas can convert them to New Quizzes on import.
 *
 * buildCanvasPackage({ offering, items, htmlOf, rubrics, includeDrafts })
 *   → { files: [{ name, data }], report: { warnings, counts } }
 */
import { classMeetings, dueAt, termEnd, toUtc, unlockAt, DELIVERY_MODES } from "./offering-schedule.js";

/* ---------- helpers ---------- */

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const bool = (v) => (v ? "true" : "false");
const slugify = (s) => String(s || "page").toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || "page";
// Canvas reads UTC without an offset: "2027-01-19T18:25:00"
const utc = (local, tz) => (local ? toUtc(local, tz).replace(/Z$/, "") : "");

// stable ids (two FNV-1a passes, 32 hex digits), so a re-import updates
// what an earlier import created instead of adding copies
function hash32(s, seed) {
  let h = seed >>> 0;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0;
  return h.toString(16).padStart(8, "0");
}
const makeId = (key) => "g" + [0x811c9dc5, 0x01000193, 0x9e3779b9, 0x7f4a7c15].map((seed) => hash32(key, seed)).join("");

const XML_HEAD = '<?xml version="1.0" encoding="UTF-8"?>\n';
const CCC = 'xmlns="http://canvas.instructure.com/xsd/cccv1p0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://canvas.instructure.com/xsd/cccv1p0 https://canvas.instructure.com/xsd/cccv1p0.xsd"';

const htmlPage = (title, body, meta = {}) =>
  `<html>\n<head>\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n<title>${esc(title)}</title>\n${Object.entries(meta)
    .filter(([, v]) => v)
    .map(([k, v]) => `<meta name="${k}" content="${esc(v)}"/>`)
    .join("\n")}\n</head>\n<body>\n${body}\n</body>\n</html>\n`;

/* ---------- the live page, embedded ---------- */

const pageUrl = (siteUrl, item) => (siteUrl ? new URL(item.slug, siteUrl).href : item.slug);
const embedSrc = (siteUrl, item) => {
  const u = new URL(item.slug, siteUrl || "https://example.invalid/");
  u.searchParams.set("embed", "1");
  return siteUrl ? u.href : `${item.slug}?embed=1`;
};
// iframe sizing uses only CSS Canvas keeps (no aspect-ratio); the embedded
// page resizes its frame the way Canvas expects (embed/embed-mode.js)
const embed = (siteUrl, item, siteName) =>
  `<p><iframe src="${esc(embedSrc(siteUrl, item))}" title="${esc(item.title)}" width="100%" height="900" style="width: 100%; height: 900px; border: 0;" allow="fullscreen; clipboard-write" allowfullscreen="allowfullscreen" loading="lazy"></iframe></p>\n<p><a href="${esc(pageUrl(siteUrl, item))}" target="_blank">Open “${esc(item.title)}” on ${esc(siteName)}</a></p>`;

/* ---------- quizzes from the page's questions ---------- */

const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? "";
const decode = (s) => String(s).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const text = (html) => decode(String(html).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());

/** [{ type: "mc" | "tf" | "essay", prompt, answers: [{ text, correct }], feedback }] */
export function quizQuestions(html, { includeDrafts = false } = {}) {
  let src = String(html || "");
  if (!includeDrafts) src = src.replace(/<oer-draft\b[^>]*>[\s\S]*?<\/oer-draft>/gi, "");
  const out = [];
  const re = /<(multiple-choice|true-false-question)\b([^>]*)>([\s\S]*?)<\/\1>|<self-check\b([^>]*)>([\s\S]*?)<\/self-check>/gi;
  for (const m of src.matchAll(re)) {
    if (m[1]) {
      const answers = [...m[3].matchAll(/<input\b([^>]*)>/gi)].map((a) => ({ text: decode(attr(a[1], "value")), correct: /data-correct="true"/.test(a[1]) }));
      if (!answers.length || !answers.some((a) => a.correct)) continue;
      out.push({ type: m[1].toLowerCase() === "true-false-question" ? "tf" : "mc", prompt: decode(attr(m[2], "question")), answers });
    } else {
      const body = m[5];
      const prompt = body.match(/<[^>]+slot="question"[^>]*>([\s\S]*?)<\/[^>]+>/i)?.[1] || attr(m[4], "title");
      const feedback = body.replace(/<[^>]+slot="question"[^>]*>[\s\S]*?<\/[^>]+>/i, "").trim();
      out.push({ type: "essay", prompt: text(prompt), answers: [], feedback });
    }
  }
  return out;
}

function qtiItem(q, n, quizId) {
  const ident = `${quizId}_q${n}`;
  const answers = q.answers.map((a, i) => ({ ...a, id: n * 100 + i + 1 }));
  const points = q.type === "essay" ? 0 : 1;
  const type = q.type === "mc" ? "multiple_choice_question" : q.type === "tf" ? "true_false_question" : "essay_question";
  const prompt = `<mattext texttype="text/html">${esc(`<div><p>${esc(q.prompt)}</p></div>`)}</mattext>`;
  const meta = `<itemmetadata><qtimetadata>
          <qtimetadatafield><fieldlabel>question_type</fieldlabel><fieldentry>${type}</fieldentry></qtimetadatafield>
          <qtimetadatafield><fieldlabel>points_possible</fieldlabel><fieldentry>${points.toFixed(1)}</fieldentry></qtimetadatafield>
          <qtimetadatafield><fieldlabel>original_answer_ids</fieldlabel><fieldentry>${answers.map((a) => a.id).join(",")}</fieldentry></qtimetadatafield>
        </qtimetadata></itemmetadata>`;
  if (q.type === "essay") {
    const fb = q.feedback ? `\n        <itemfeedback ident="general_fb"><flow_mat><material><mattext texttype="text/html">${esc(q.feedback)}</mattext></material></flow_mat></itemfeedback>` : "";
    return `      <item ident="${ident}" title="Question ${n}">
        ${meta}
        <presentation>
          <material>${prompt}</material>
          <response_str ident="response1" rcardinality="Single"><render_fib><response_label ident="answer1" rshuffle="No"/></render_fib></response_str>
        </presentation>
        <resprocessing>
          <outcomes><decvar maxvalue="100" minvalue="0" varname="SCORE" vartype="Decimal"/></outcomes>${q.feedback ? `
          <respcondition continue="Yes"><conditionvar><other/></conditionvar><displayfeedback feedbacktype="Response" linkrefid="general_fb"/></respcondition>` : ""}
          <respcondition continue="No"><conditionvar><other/></conditionvar></respcondition>
        </resprocessing>${fb}
      </item>`;
  }
  const correct = answers.find((a) => a.correct);
  return `      <item ident="${ident}" title="Question ${n}">
        ${meta}
        <presentation>
          <material>${prompt}</material>
          <response_lid ident="response1" rcardinality="Single">
            <render_choice>
${answers.map((a) => `              <response_label ident="${a.id}"><material><mattext texttype="text/plain">${esc(a.text)}</mattext></material></response_label>`).join("\n")}
            </render_choice>
          </response_lid>
        </presentation>
        <resprocessing>
          <outcomes><decvar maxvalue="100" minvalue="0" varname="SCORE" vartype="Decimal"/></outcomes>
          <respcondition continue="No">
            <conditionvar><varequal respident="response1">${correct.id}</varequal></conditionvar>
            <setvar action="Set" varname="SCORE">100</setvar>
          </respcondition>
        </resprocessing>
      </item>`;
}

/* ---------- rubrics ---------- */

// split points across criteria in hundredths, the remainder on the last
function splitPoints(total, n) {
  const each = Math.floor((total * 100) / n) / 100;
  return Array.from({ length: n }, (_, i) => (i === n - 1 ? Math.round((total - each * (n - 1)) * 100) / 100 : each));
}

function rubricXml(id, rubric, points, scale) {
  const shares = points > 0 ? splitPoints(points, rubric.criteria.length) : rubric.criteria.map(() => 0);
  const criteria = rubric.criteria
    .map((c, i) => {
      const cid = `_${i + 1}`;
      const pts = shares[i];
      const ratings = scale
        .map((lvl, j) => `<rating><description>${esc(lvl.name)}</description><points>${(Math.round(pts * lvl.share * 100) / 100).toFixed(2)}</points><criterion_id>${cid}</criterion_id><id>${cid}_${j + 1}</id></rating>`)
        .join("");
      return `      <criterion>
        <criterion_id>${cid}</criterion_id>
        <points>${pts.toFixed(2)}</points>
        <description>${esc(c.name)}</description>
        <long_description>${esc(c.description || "")}</long_description>
        <criterion_use_range>false</criterion_use_range>
        <ratings>${ratings}</ratings>
      </criterion>`;
    })
    .join("\n");
  return `  <rubric identifier="${id}">
    <title>${esc(rubric.name)} (${points} pts)</title>
    <reusable>false</reusable>
    <public>false</public>
    <points_possible>${points.toFixed(2)}</points_possible>
    <hide_score_total>false</hide_score_total>
    <free_form_criterion_comments>false</free_form_criterion_comments>
    <rating_order>descending</rating_order>
    <description>${esc(rubric.description || "")}</description>
    <criteria>
${criteria}
    </criteria>
  </rubric>`;
}

/* ---------- the package ---------- */

export async function buildCanvasPackage({ offering, items, htmlOf = async () => "", rubrics = [], includeDrafts = false, siteName = "Digital Arts OER" }) {
  const tz = offering.timeZone || "UTC";
  const siteUrl = offering.siteUrl || "";
  const byId = new Map(items.map((i) => [i.id, i]));
  const publish = offering.publish !== false;
  const files = [];
  const resources = [];
  const warnings = [];
  const counts = { modules: 0, pages: 0, assignments: 0, quizzes: 0, links: 0, headers: 0, events: 0, rubrics: 0 };
  const add = (name, data) => files.push({ name, data });
  const key = (...parts) => makeId([offering.code, offering.term, ...parts].join("|"));

  if (!siteUrl) warnings.push("No public site address (siteUrl): embedded pages and links point at relative paths and won't load in Canvas.");
  if (DELIVERY_MODES[offering.delivery]?.meets && !(offering.meetings || []).length) {
    const firstClass = (offering.defaults?.dueRule || "first-class") === "first-class";
    warnings.push(`No class meetings given, so the Canvas calendar won't list class sessions${firstClass ? ", and assignments due at the first class fall on the usual day and time instead" : ""}.`);
  }

  // grade groups
  const groupId = (gid) => key("group", gid);
  const groupsXml = (offering.groups || [])
    .map((g, i) => `  <assignmentGroup identifier="${groupId(g.id)}">\n    <title>${esc(g.name)}</title>\n    <position>${i + 1}</position>\n    <group_weight>${Number(g.weight || 0).toFixed(1)}</group_weight>\n  </assignmentGroup>`)
    .join("\n");

  // rubrics, one per rubric and point total
  const rubricIds = new Map();
  const rubricParts = [];
  const rubricFor = (slug, points) => {
    const rubric = rubrics.find((r) => r.slug === slug);
    if (!rubric?.criteria?.length) return "";
    const k = `${slug}:${points}`;
    if (!rubricIds.has(k)) {
      const id = key("rubric", k);
      rubricIds.set(k, id);
      rubricParts.push(rubricXml(id, rubric, points, offering.rubricScale || [{ name: "Full marks", share: 1 }, { name: "No marks", share: 0 }]));
    }
    return rubricIds.get(k);
  };

  const pageFiles = new Set();
  const uniqueSlug = (base) => {
    let s = slugify(base);
    for (let n = 2; pageFiles.has(s); n++) s = `${slugify(base)}-${n}`;
    pageFiles.add(s);
    return s;
  };

  const unpublished = new Set();
  const modulesXml = [];
  const orgModules = [];
  let assignmentPos = 0;
  let previousModule = null;
  for (const [mi, mod] of (offering.modules || []).entries()) {
    const modId = key("module", mod.id);
    const itemXml = [];
    const orgItems = [];
    const requirements = [];
    const async = offering.delivery === "online-async";
    for (const [ii, entry] of (mod.items || []).entries()) {
      const tagId = key("tag", mod.id, ii);
      if (entry.header) {
        itemXml.push(`      <item identifier="${tagId}">\n        <content_type>ContextModuleSubHeader</content_type>\n        <workflow_state>active</workflow_state>\n        <title>${esc(entry.header)}</title>\n        <new_tab/>\n        <indent>0</indent>\n      </item>`);
        orgItems.push(`<item identifier="${tagId}"><title>${esc(entry.header)}</title></item>`);
        counts.headers++;
        continue;
      }
      const page = byId.get(entry.page);
      if (!page) {
        warnings.push(`${mod.title}: a page in this module isn't on the site any more (${entry.page}).`);
        continue;
      }
      // the live page shows in Canvas only once it's published on the site
      if (entry.as !== "link" && page.metadata?.published === false) unpublished.add(page.title);
      const title = entry.title && entry.as === "page" && entry.title !== "Overview" ? entry.title : page.title;
      const indent = entry.indent ?? (entry.as === "link" ? 1 : 0);

      if (entry.as === "link") {
        const url = page.metadata?.oerFields?.url || pageUrl(siteUrl, page);
        if (!/^https?:\/\//.test(url)) {
          warnings.push(`${mod.title}: “${page.title}” has no absolute address, so Canvas would skip its link.`);
          continue;
        }
        const wlId = key("weblink", mod.id, ii);
        add(`${wlId}.xml`, `${XML_HEAD}<webLink xmlns="http://www.imsglobal.org/xsd/imsccv1p1/imswl_v1p1"><title>${esc(page.title)}</title><url href="${esc(url)}"/></webLink>\n`);
        resources.push(`<resource identifier="${wlId}" type="imswl_xmlv1p1"><file href="${wlId}.xml"/></resource>`);
        itemXml.push(`      <item identifier="${tagId}">\n        <content_type>ExternalUrl</content_type>\n        <workflow_state>active</workflow_state>\n        <title>${esc(page.title)}</title>\n        <identifierref>${wlId}</identifierref>\n        <url>${esc(url)}</url>\n        <new_tab>true</new_tab>\n        <indent>${indent}</indent>\n      </item>`);
        orgItems.push(`<item identifier="${tagId}" identifierref="${wlId}"><title>${esc(page.title)}</title></item>`);
        if (async) requirements.push(`<completionRequirement type="must_view"><identifierref>${tagId}</identifierref></completionRequirement>`);
        counts.links++;
      } else if (entry.as === "assignment") {
        const aId = key("assignment", page.id);
        const slug = slugify(page.title);
        const points = Number(entry.points ?? 0);
        const graded = entry.graded !== false && points > 0;
        const due = utc(dueAt(offering, entry.due), tz);
        const rubricId = graded && entry.rubric ? rubricFor(entry.rubric, points) : "";
        if (graded && entry.rubric && !rubricId) warnings.push(`${page.title}: rubric “${entry.rubric}” wasn't found.`);
        const ai = [].concat(page.metadata?.oerFields?.aiLicense || []).filter(Boolean);
        const intro = [
          page.description ? `<p>${esc(page.description)}</p>` : "",
          ai.length ? `<p><strong>AI use:</strong> ${ai.map((c) => esc(c)).join(", ")} (see the instructions for what this allows).</p>` : "",
        ].join("\n");
        add(`${aId}/${slug}.html`, htmlPage(`Assignment: ${page.title}`, `${intro}\n${embed(siteUrl, page, siteName)}`));
        add(
          `${aId}/assignment_settings.xml`,
          `${XML_HEAD}<assignment identifier="${aId}" ${CCC}>
  <title>${esc(page.title)}</title>
  ${due ? `<due_at>${due}</due_at>` : "<due_at/>"}
  <lock_at/>
  <unlock_at/>
  ${entry.group ? `<assignment_group_identifierref>${groupId(entry.group)}</assignment_group_identifierref>` : ""}
  <workflow_state>${publish ? "published" : "unpublished"}</workflow_state>
  ${rubricId ? `<rubric_identifierref>${rubricId}</rubric_identifierref>\n  <rubric_use_for_grading>true</rubric_use_for_grading>\n  <rubric_hide_points>false</rubric_hide_points>\n  <rubric_hide_outcome_results>false</rubric_hide_outcome_results>\n  <rubric_hide_score_total>false</rubric_hide_score_total>` : ""}
  <assignment_overrides/>
  <allowed_extensions>${esc((entry.extensions || []).join(","))}</allowed_extensions>
  <has_group_category>false</has_group_category>
  <points_possible>${points.toFixed(1)}</points_possible>
  <grading_type>${graded ? "points" : "not_graded"}</grading_type>
  <all_day>false</all_day>
  <submission_types>${esc((graded ? entry.submission || ["online_upload"] : ["not_graded"]).join(","))}</submission_types>
  <position>${++assignmentPos}</position>
  <peer_review_count>0</peer_review_count>
  <peer_reviews>false</peer_reviews>
  <automatic_peer_reviews>false</automatic_peer_reviews>
  <anonymous_peer_reviews>false</anonymous_peer_reviews>
  <omit_from_final_grade>${bool(!graded)}</omit_from_final_grade>
  <hide_in_gradebook>false</hide_in_gradebook>
  <allowed_attempts>-1</allowed_attempts>
</assignment>
`,
        );
        resources.push(`<resource identifier="${aId}" type="associatedcontent/imscc_xmlv1p1/learning-application-resource" href="${aId}/${slug}.html"><file href="${aId}/${slug}.html"/><file href="${aId}/assignment_settings.xml"/></resource>`);
        itemXml.push(`      <item identifier="${tagId}">\n        <content_type>Assignment</content_type>\n        <workflow_state>active</workflow_state>\n        <title>${esc(page.title)}</title>\n        <identifierref>${aId}</identifierref>\n        <new_tab/>\n        <indent>${indent}</indent>\n      </item>`);
        orgItems.push(`<item identifier="${tagId}" identifierref="${aId}"><title>${esc(page.title)}</title></item>`);
        if (async) requirements.push(`<completionRequirement type="must_submit"><identifierref>${tagId}</identifierref></completionRequirement>`);
        counts.assignments++;
      } else if (entry.as === "quiz") {
        const qId = key("quiz", page.id);
        const questions = quizQuestions(await htmlOf(page), { includeDrafts });
        if (!questions.length) {
          warnings.push(`${page.title}: no questions to export${includeDrafts ? "" : " (draft questions are left out until they're published)"}; the quiz was skipped.`);
          continue;
        }
        const practice = (entry.quizType || "practice") === "practice";
        const points = questions.filter((q) => q.type !== "essay").length;
        const due = utc(dueAt(offering, entry.due), tz);
        const description = esc(`${page.description ? `<p>${esc(page.description)}</p>` : ""}<p><a href="${esc(pageUrl(siteUrl, page))}" target="_blank">Open “${esc(page.title)}” on ${esc(siteName)}</a></p>`);
        add(
          `non_cc_assessments/${qId}.xml.qti`,
          `${XML_HEAD}<questestinterop xmlns="http://www.imsglobal.org/xsd/ims_qtiasiv1p2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsglobal.org/xsd/ims_qtiasiv1p2 http://www.imsglobal.org/xsd/ims_qtiasiv1p2p1.xsd">
  <assessment ident="${qId}" title="${esc(page.title)}">
    <qtimetadata><qtimetadatafield><fieldlabel>cc_maxattempts</fieldlabel><fieldentry>unlimited</fieldentry></qtimetadatafield></qtimetadata>
    <section ident="root_section">
${questions.map((q, n) => qtiItem(q, n + 1, qId)).join("\n")}
    </section>
  </assessment>
</questestinterop>
`,
        );
        const nested = practice
          ? ""
          : `
  <assignment identifier="${qId}_asg">
    <title>${esc(page.title)}</title>
    ${due ? `<due_at>${due}</due_at>` : "<due_at/>"}
    ${entry.group ? `<assignment_group_identifierref>${groupId(entry.group)}</assignment_group_identifierref>` : ""}
    <workflow_state>${publish ? "published" : "unpublished"}</workflow_state>
    <quiz_identifierref>${qId}</quiz_identifierref>
    <points_possible>${points.toFixed(1)}</points_possible>
    <grading_type>points</grading_type>
    <submission_types>online_quiz</submission_types>
    <omit_from_final_grade>false</omit_from_final_grade>
  </assignment>`;
        add(
          `${qId}/assessment_meta.xml`,
          `${XML_HEAD}<quiz identifier="${qId}" ${CCC}>
  <title>${esc(page.title)}</title>
  <description>${description}</description>
  ${due ? `<due_at>${due}</due_at>` : "<due_at/>"}
  <lock_at/>
  <unlock_at/>
  <shuffle_answers>true</shuffle_answers>
  <scoring_policy>keep_highest</scoring_policy>
  <hide_results></hide_results>
  <quiz_type>${practice ? "practice_quiz" : "assignment"}</quiz_type>
  <points_possible>${points.toFixed(1)}</points_possible>
  <require_lockdown_browser>false</require_lockdown_browser>
  <show_correct_answers>true</show_correct_answers>
  <anonymous_submissions>false</anonymous_submissions>
  <could_be_locked>false</could_be_locked>
  <allowed_attempts>-1</allowed_attempts>
  <one_question_at_a_time>false</one_question_at_a_time>
  <cant_go_back>false</cant_go_back>
  <available>${bool(publish)}</available>
  <one_time_results>false</one_time_results>
  <show_correct_answers_last_attempt>false</show_correct_answers_last_attempt>
  <only_visible_to_overrides>false</only_visible_to_overrides>
  <module_locked>false</module_locked>${nested}
  <assignment_overrides/>
</quiz>
`,
        );
        resources.push(`<resource identifier="${qId}_meta" type="associatedcontent/imscc_xmlv1p1/learning-application-resource" href="${qId}/assessment_meta.xml"><file href="${qId}/assessment_meta.xml"/><file href="non_cc_assessments/${qId}.xml.qti"/></resource>`);
        itemXml.push(`      <item identifier="${tagId}">\n        <content_type>Quizzes::Quiz</content_type>\n        <workflow_state>active</workflow_state>\n        <title>${esc(page.title)}</title>\n        <identifierref>${qId}</identifierref>\n        <new_tab/>\n        <indent>${indent}</indent>\n      </item>`);
        orgItems.push(`<item identifier="${tagId}" identifierref="${qId}_meta"><title>${esc(page.title)}</title></item>`);
        if (async) requirements.push(`<completionRequirement type="must_submit"><identifierref>${tagId}</identifierref></completionRequirement>`);
        counts.quizzes++;
      } else {
        // a page: the live page, embedded
        const pId = key("page", mod.id, page.id);
        const file = `wiki_content/${uniqueSlug(title)}.html`;
        add(file, htmlPage(title, `${page.description ? `<p>${esc(page.description)}</p>\n` : ""}${embed(siteUrl, page, siteName)}`, { identifier: pId, editing_roles: "teachers", workflow_state: publish ? "active" : "unpublished" }));
        resources.push(`<resource identifier="${pId}" type="webcontent" href="${file}"><file href="${file}"/></resource>`);
        itemXml.push(`      <item identifier="${tagId}">\n        <content_type>WikiPage</content_type>\n        <workflow_state>active</workflow_state>\n        <title>${esc(title)}</title>\n        <identifierref>${pId}</identifierref>\n        <new_tab/>\n        <indent>${indent}</indent>\n      </item>`);
        orgItems.push(`<item identifier="${tagId}" identifierref="${pId}"><title>${esc(title)}</title></item>`);
        if (async) requirements.push(`<completionRequirement type="must_view"><identifierref>${tagId}</identifierref></completionRequirement>`);
        counts.pages++;
      }
    }
    const unlock = utc(unlockAt(offering, mod.week), tz);
    modulesXml.push(`  <module identifier="${modId}">
    <title>${esc(mod.title)}</title>
    <workflow_state>${publish ? "active" : "unpublished"}</workflow_state>
    <position>${mi + 1}</position>${unlock ? `\n    <unlock_at>${unlock}</unlock_at>` : ""}
    <require_sequential_progress>${bool(offering.delivery === "online-async")}</require_sequential_progress>${offering.delivery === "online-async" && previousModule ? `\n    <prerequisites><prerequisite type="context_module"><title>${esc(previousModule.title)}</title><identifierref>${previousModule.id}</identifierref></prerequisite></prerequisites>` : ""}
    <items>
${itemXml.join("\n")}
    </items>${requirements.length ? `\n    <completionRequirements>${requirements.join("")}</completionRequirements>` : ""}
  </module>`);
    orgModules.push(`<item identifier="${modId}"><title>${esc(mod.title)}</title>${orgItems.join("")}</item>`);
    previousModule = { id: modId, title: mod.title };
    counts.modules++;
  }

  if (unpublished.size) {
    const list = [...unpublished];
    warnings.push(`${list.length} embedded page${list.length === 1 ? " is" : "s are"} unpublished on the site, so students will see an empty frame until they're published: ${list.slice(0, 5).map((t) => `“${t}”`).join(", ")}${list.length > 5 ? ` and ${list.length - 5} more` : ""}.`);
  }

  // class meetings on the calendar (location and link in the description)
  const eventsXml = classMeetings(offering)
    .map((m, i) => {
      const mod = (offering.modules || []).find((x) => x.week === m.week);
      const where = m.mode === "online" ? (m.link ? `<p>Online: <a href="${esc(m.link)}" target="_blank">${esc(m.link)}</a></p>` : "<p>Online</p>") : m.location ? `<p>Location: ${esc(m.location)}</p>` : "";
      const about = mod ? `<p>${esc(mod.title)}</p>` : "";
      counts.events++;
      return `  <event identifier="${key("event", m.date, m.start, i)}">
    <title>${esc(`${offering.code} class${m.mode === "online" && offering.delivery === "hybrid" ? " (online)" : ""}`)}</title>
    <description>${esc(about + where)}</description>
    <start_at>${utc(`${m.date}T${m.start}`, tz)}</start_at>
    <end_at>${utc(`${m.date}T${m.end || m.start}`, tz)}</end_at>
  </event>`;
    })
    .join("\n");

  // syllabus: the course page, then the schedule
  const course = byId.get(offering.course);
  const scheduleRows = (offering.modules || [])
    .map((mod) => {
      const due = (mod.items || [])
        .filter((e) => e.as === "assignment" && byId.get(e.page))
        .map((e) => `${esc(byId.get(e.page).title)}${e.due ? ` (due ${esc(dueAt(offering, e.due).replace("T", " "))})` : ""}`)
        .join("<br/>");
      return `<tr><td>${esc(mod.title)}</td><td>${due || "&#8212;"}</td></tr>`;
    })
    .join("\n");
  const syllabus = htmlPage(
    "Syllabus",
    `${course ? `<p>${esc(course.description || "")}</p>\n${embed(siteUrl, course, siteName)}\n` : ""}<h2>Schedule</h2>\n<table border="1" style="border-collapse: collapse; width: 100%;"><thead><tr><th>Week</th><th>Due</th></tr></thead><tbody>\n${scheduleRows}\n</tbody></table>`,
  );

  // course settings
  const settingsFiles = ["course_settings.xml", "module_meta.xml", "assignment_groups.xml", "rubrics.xml", "events.xml", "canvas_export.txt"];
  add("course_settings/canvas_export.txt", "Exported from the course builder: a Canvas Course Export Package.\n");
  add(
    "course_settings/course_settings.xml",
    `${XML_HEAD}<course identifier="${key("course")}" ${CCC}>
  <title>${esc(offering.title)}</title>
  <course_code>${esc(offering.code)}</course_code>
  <start_at>${utc(`${offering.start}T00:00`, tz)}</start_at>
  <conclude_at>${utc(`${termEnd(offering)}T23:59`, tz)}</conclude_at>
  <default_view>modules</default_view>
  <group_weighting_scheme>percent</group_weighting_scheme>
  <time_zone>${esc(tz)}</time_zone>
  <hide_final_grade>false</hide_final_grade>
</course>
`,
  );
  add("course_settings/module_meta.xml", `${XML_HEAD}<modules ${CCC}>\n${modulesXml.join("\n")}\n</modules>\n`);
  add("course_settings/assignment_groups.xml", `${XML_HEAD}<assignmentGroups ${CCC}>\n${groupsXml}\n</assignmentGroups>\n`);
  add("course_settings/rubrics.xml", `${XML_HEAD}<rubrics ${CCC}>\n${rubricParts.join("\n")}\n</rubrics>\n`);
  add("course_settings/events.xml", `${XML_HEAD}<events ${CCC}>\n${eventsXml}\n</events>\n`);
  add("course_settings/syllabus.html", syllabus);
  counts.rubrics = rubricParts.length;

  const courseRes = `<resource identifier="${key("course")}" type="associatedcontent/imscc_xmlv1p1/learning-application-resource" href="course_settings/canvas_export.txt">${settingsFiles.map((f) => `<file href="course_settings/${f}"/>`).join("")}</resource>
    <resource identifier="${key("course", "syllabus")}" type="associatedcontent/imscc_xmlv1p1/learning-application-resource" href="course_settings/syllabus.html" intendeduse="syllabus"><file href="course_settings/syllabus.html"/></resource>`;
  add(
    "imsmanifest.xml",
    `${XML_HEAD}<manifest identifier="${key("manifest")}" xmlns="http://www.imsglobal.org/xsd/imsccv1p1/imscp_v1p1" xmlns:lom="http://ltsc.ieee.org/xsd/imsccv1p1/LOM/resource" xmlns:lomimscc="http://ltsc.ieee.org/xsd/imsccv1p1/LOM/manifest" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsglobal.org/xsd/imsccv1p1/imscp_v1p1 http://www.imsglobal.org/profile/cc/ccv1p1/ccv1p1_imscp_v1p2_v1p0.xsd http://ltsc.ieee.org/xsd/imsccv1p1/LOM/resource http://www.imsglobal.org/profile/cc/ccv1p1/LOM/ccv1p1_lomresource_v1p0.xsd http://ltsc.ieee.org/xsd/imsccv1p1/LOM/manifest http://www.imsglobal.org/profile/cc/ccv1p1/LOM/ccv1p1_lommanifest_v1p0.xsd">
  <metadata>
    <schema>IMS Common Cartridge</schema>
    <schemaversion>1.1.0</schemaversion>
    <lomimscc:lom><lomimscc:general><lomimscc:title><lomimscc:string>${esc(offering.title)}</lomimscc:string></lomimscc:title></lomimscc:general></lomimscc:lom>
  </metadata>
  <organizations>
    <organization identifier="org_1" structure="rooted-hierarchy">
      <item identifier="LearningModules">${orgModules.join("")}</item>
    </organization>
  </organizations>
  <resources>
    ${courseRes}
    ${resources.join("\n    ")}
  </resources>
</manifest>
`,
  );

  // every file the manifest names must exist (a missing one fails the import)
  const names = new Set(files.map((f) => f.name));
  for (const href of files.find((f) => f.name === "imsmanifest.xml").data.matchAll(/<file href="([^"]+)"/g)) {
    if (!names.has(href[1])) throw new Error(`the manifest names a file the package lacks: ${href[1]}`);
  }
  return { files, report: { warnings, counts } };
}
