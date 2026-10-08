/**
 * Apply a Canvas import plan (lms/canvas-import-plan.js) to the site:
 * 1. rubrics: new rubric pages for the plan's new rubrics (reused ones are
 *    referenced as they are)
 * 2. files: the ticked files uploaded to the site's files
 * 3. pages: a draft (unpublished) page for each item to create, of its
 *    type, under that type's section (Lessons, Exercises, Projects…), linked
 *    to the course; their Canvas file links point at the uploaded files (or
 *    lose the link when the file stayed behind)
 * 4. links between pages: Canvas page and assignment links become links to
 *    the new (or matched) pages; links reviewed under Links (plan.links)
 *    point where the review says: a page here for an old course site's
 *    page, a new address (moved, archived, corrected), or plain text
 * 5. the sequence: a draft course sequence under Sequences with the
 *    modules (their weeks or spans, order rules, prerequisites, overviews),
 *    their items' roles, titles, due weeks, availability, points, grade
 *    groups and rubrics, and the sequence's own pages, linked to the course
 * Every new page carries metadata.oerCanvasImport { batch, id } so it can be
 * found (and the import repeated or undone). One outline save per step.
 *
 * No browser or HAX dependencies: the site is reached through `io`
 *   { items() → the site's items, save(items) (an outline save; resolves
 *     once the items reflect it), describe(id, text), upload(name, bytes) →
 *     the file's URL }
 * which the wizard gives from the HAX editor (oer-canvas-import.js) and
 * nu-hax/scripts/canvas-import.mjs from the HAX API.
 */
import { RUBRIC_TYPE, isRubric } from "../rubrics/rubric-model.js";
import { SEQUENCE_TYPE } from "./sequence-model.js";
import { rewriteLinks, linkTarget } from "../links/link-model.js";

const SECTIONS = {
  "oer:lesson": "Lessons",
  "oer:lecture": "Lectures",
  "oer:tutorial": "Tutorials",
  "oer:article": "Articles",
  "oer:resource": "Resources",
  "oer:exercise": "Exercises",
  "oer:project": "Projects",
  "oer:activity": "Projects",
  "oer:quiz": "Quizzes",
  [SEQUENCE_TYPE]: "Sequences",
  [RUBRIC_TYPE]: "Rubrics",
};
const DELIVERY = ["In person", "Hybrid", "Online (synchronous)", "Online (asynchronous)"];
const newItemId = () => `item-${globalThis.crypto.randomUUID()}`;
const slugify = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
const escAttr = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** The plan's entries that come over (not skipped, not in a skipped module). */
export function importedEntries(plan) {
  return [...plan.modules.filter((m) => !m.skip).flatMap((m) => m.items), ...plan.unplaced].filter((e) => e.action !== "skip");
}

/**
 * Apply the plan. course: the read package (for file bytes); io: the site
 * (above); onStep(text) reports progress.
 * → { batch, sequence, pages: [{ id, title, slug, type }], rubrics, files }
 */
export async function applyImport(plan, course, { io, onStep = () => {} }) {
  const items = () => io.items();
  const saveOutline = (list) => io.save(list);
  const describe = async (id, text) => id && text && io.describe(id, text);
  const batch = `canvas-${Date.now().toString(36)}`;
  const section = (type) => items().find((i) => i.metadata?.pageType === "oer:section" && i.title === SECTIONS[type] && !i.parent) || null;
  const childCount = (parent) => items().filter((i) => (i.parent || null) === (parent || null)).length;
  const entries = importedEntries(plan);
  const coursePage = plan.coursePage ? items().find((i) => i.id === plan.coursePage.id) : null;
  const courses = coursePage ? [{ page: coursePage.id, version: "" }] : [];

  /* 1. rubrics */
  onStep("Rubrics");
  const usedRubrics = new Set(entries.map((e) => e.role?.rubric).filter(Boolean));
  const rubricRef = new Map(); // plan rubric id → the key sequence items name it by
  const keys = new Set(items().filter(isRubric).map((i) => i.metadata?.oerRubric?.key));
  const newRubrics = [];
  const rubricParent = section(RUBRIC_TYPE)?.id || null;
  for (const r of plan.rubrics.filter((x) => usedRubrics.has(x.id))) {
    if (r.action === "reuse" && r.match) {
      rubricRef.set(r.id, r.match.key);
      continue;
    }
    let key = slugify(r.title) || "rubric";
    for (let n = 2; keys.has(key); n++) key = `${slugify(r.title) || "rubric"}-${n}`;
    keys.add(key);
    rubricRef.set(r.id, key);
    newRubrics.push({
      id: newItemId(),
      title: r.title,
      parent: rubricParent,
      order: childCount(rubricParent) + newRubrics.length,
      indent: rubricParent ? 1 : 0,
      location: "",
      description: "",
      metadata: { pageType: RUBRIC_TYPE, published: false, oerRubric: { version: 1, key, levels: r.data.levels, criteria: r.data.criteria }, oerCanvasImport: { batch, id: r.id } },
      contents: "",
      new: true,
      _description: r.data.description,
    });
  }
  if (newRubrics.length) {
    await saveOutline(newRubrics.map(({ _description, ...i }) => i));
    for (const r of newRubrics) await describe(items().find((i) => i.metadata?.oerCanvasImport?.batch === batch && i.metadata.oerCanvasImport.id === r.metadata.oerCanvasImport.id)?.id, r._description);
  }

  /* 2. files */
  const fileUrl = new Map();
  const ticked = plan.files.filter((f) => f.import);
  for (const [n, f] of ticked.entries()) {
    onStep(`Files (${n + 1} of ${ticked.length})`);
    const bytes = await course.zip.bytes(`web_resources/${f.path}`);
    if (bytes) fileUrl.set(f.path, await io.upload(f.name, bytes));
  }
  // reviewed links (plan.links): to a page here, a new address, or text
  const linkByUrl = new Map((plan.links || []).map((l) => [l.url, l]));
  const relink = (html) => rewriteLinks(html, (url) => linkTarget(linkByUrl.get(url)));
  const withFiles = (html) =>
    String(html || "")
      .replace(/<a\b([^>]*?)href="canvas-file:([^"]*)"([^>]*)>([\s\S]*?)<\/a>/g, (m, a, path, b, text) => (fileUrl.has(path) ? `<a${a}href="${escAttr(fileUrl.get(path))}"${b}>${text}</a>` : text))
      .replace(/<img\b([^>]*?)src="canvas-file:([^"]*)"([^>]*)>/g, (m, a, path, b) => (fileUrl.has(path) ? `<img${a}src="${escAttr(fileUrl.get(path))}"${b}>` : ""));

  /* 3. pages */
  onStep("Pages");
  const toCreate = entries.filter((e) => e.action === "create" && e.type);
  const counters = new Map();
  const pageItems = toCreate.map((e) => {
    const parent = section(e.type)?.id || null;
    const order = (counters.get(parent) ?? childCount(parent)) + 0;
    counters.set(parent, order + 1);
    const file = e.kind === "file" && fileUrl.get(e.files[0]);
    return {
      id: newItemId(),
      title: e.title,
      parent,
      order,
      indent: parent ? 1 : 0,
      location: "",
      description: "",
      metadata: {
        pageType: e.type,
        published: false,
        oerFields: { ...(courses.length ? { courses } : {}), ...(file ? { attachments: [{ title: e.title.replace(/^download:\s*/i, ""), url: file }] } : {}) },
        oerCanvasImport: { batch, id: e.id },
      },
      contents: relink(withFiles(e.html)) || "<p></p>",
      new: true,
    };
  });
  if (pageItems.length) await saveOutline(pageItems);
  const created = new Map(items().filter((i) => i.metadata?.oerCanvasImport?.batch === batch && i.metadata.pageType !== RUBRIC_TYPE).map((i) => [i.metadata.oerCanvasImport.id, i]));
  const pageOf = (e) => (e.action === "link" && e.match ? items().find((i) => i.id === e.match.id) : created.get(e.id)) || null;

  /* 4. links between pages */
  onStep("Links between pages");
  const all = [...plan.modules.flatMap((m) => m.items), ...plan.unplaced];
  const target = (kind, ref) => {
    const e = kind === "page" ? all.find((x) => x.kind === "page" && (x.slug === ref || x.ref === ref)) : all.find((x) => x.ref === ref);
    return e && e.action !== "skip" ? pageOf(e) : null;
  };
  // files and Canvas links resolved: to the uploaded file, the new or
  // matched page, or plain text when it didn't come over
  const resolve = (html) =>
    relink(withFiles(html)).replace(/<a\b([^>]*?)href="canvas-(page|object|course):([^"]*)"([^>]*)>([\s\S]*?)<\/a>/g, (m, a, kind, ref, b, text) => {
      const hit = kind === "page" ? target("page", ref) : kind === "object" ? target("object", ref.split("/").pop()) : null;
      return hit ? `<a${a}href="${escAttr(hit.slug)}"${b}>${text}</a>` : text;
    });
  const relinked = [];
  for (const e of toCreate) {
    const page = created.get(e.id);
    if (!page || !/canvas-(page|object|course):/.test(e.html)) continue;
    relinked.push({ ...page, contents: resolve(e.html), modified: true });
  }
  if (relinked.length) await saveOutline(relinked);

  /* 5. the sequence */
  onStep("Course sequence");
  const roleFields = (role) => {
    const { as, ...rest } = role || {};
    const out = Object.fromEntries(Object.entries(rest).filter(([, v]) => v !== undefined && v !== ""));
    if (out.rubric) out.rubric = rubricRef.get(out.rubric) || undefined;
    if (!out.rubric) delete out.rubric;
    return out;
  };
  const kept = new Set(plan.modules.filter((m) => !m.skip).map((m) => m.id));
  const modules = plan.modules
    .filter((m) => !m.skip)
    .map((m) => {
      const overview = m.items.find((e) => e.action === "overview");
      return {
        id: m.id,
        title: m.title,
        week: m.week,
        ...(Number(m.week) && m.weeks > 1 ? { weeks: m.weeks } : {}),
        ...(overview ? { overview: { mode: "written", title: overview.title, html: resolve(overview.html) } } : {}),
        ...(m.sequential ? { sequential: true } : {}),
        ...(m.unlock ? { unlock: m.unlock } : {}),
        ...((m.prerequisites || []).some((id) => kept.has(id)) ? { prerequisites: m.prerequisites.filter((id) => kept.has(id)) } : {}),
        items: m.items
          .filter((e) => !["skip", "overview"].includes(e.action))
          .map((e) => {
            const indent = Math.max(0, Math.min(5, Number(e.indent) || 0));
            if (e.action === "header") return { header: e.title, indent };
            if (e.action === "url") {
              // a link reviewed to a page here, another address, or none
              const link = linkByUrl.get(e.url);
              if (link?.action === "page" && link.match) return { page: link.match.id, as: "page", title: e.title, indent };
              if (link?.action === "unlink") return { header: e.title, indent };
              return { as: "url", title: e.title, url: linkTarget(link) || e.url, newTab: true, indent };
            }
            if (e.action === "text") return { as: "text", title: e.title, html: resolve(e.html), indent };
            const page = pageOf(e);
            if (!page) return null;
            // the title it had in Canvas, when the page's is different
            const title = e.canvasTitle && e.canvasTitle !== page.title ? { title: e.canvasTitle } : {};
            if (e.kind === "file") return fileUrl.get(e.files[0]) ? { page: page.id, as: "file", file: fileUrl.get(e.files[0]), title: e.canvasTitle || e.title, indent } : { page: page.id, as: "page", ...title, indent };
            const as = e.role?.as === "url" ? "page" : e.role?.as || "page";
            return { page: page.id, as, ...title, ...roleFields(e.role), indent };
          })
          .filter(Boolean),
      };
    });
  const delivery = coursePage?.metadata?.oerFields?.delivery;
  const sequence = {
    id: newItemId(),
    title: plan.sequenceTitle,
    parent: section(SEQUENCE_TYPE)?.id || null,
    order: childCount(section(SEQUENCE_TYPE)?.id || null),
    indent: section(SEQUENCE_TYPE) ? 1 : 0,
    location: "",
    description: "",
    metadata: {
      pageType: SEQUENCE_TYPE,
      published: false,
      oerFields: { courses, weeks: plan.course.weeks, delivery: DELIVERY.includes(delivery) ? delivery : /online/i.test(delivery || "") ? "Online (asynchronous)" : "In person", license: "CC BY 4.0" },
      // modules keep the rules they had in Canvas
      oerSequence: { version: 1, modules, groups: plan.groups, moduleRules: "own" },
      oerCanvasImport: { batch, id: "sequence" },
    },
    contents: `<p>Imported from the Canvas course “${escAttr(plan.course.title)}”${plan.course.start ? `, which started ${plan.course.start}` : ""}. Check each week, then export it to Canvas with your term's dates.</p>`,
    new: true,
  };
  await saveOutline([sequence]);
  const seqPage = items().find((i) => i.metadata?.oerCanvasImport?.batch === batch && i.metadata.oerCanvasImport.id === "sequence");
  await describe(seqPage?.id, `${plan.course.weeks} weeks, imported from Canvas: the schedule, assignments and grading for ${plan.course.code || plan.course.title}.`);
  onStep("Done");
  return {
    batch,
    sequence: seqPage,
    pages: [...created.values()].map((p) => ({ id: p.id, title: p.title, slug: p.slug, type: p.metadata?.pageType })),
    rubrics: newRubrics.length,
    files: fileUrl.size,
  };
}
