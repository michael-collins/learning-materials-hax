/**
 * Semver content versions, after learning-materials-decapcms: publishing a
 * version freezes the page's current content as an immutable snapshot that
 * readers (and books) can keep linking to while the page moves on.
 *
 * Storage (all through saveOutline, one git commit per release):
 * - the page: metadata.version = latest released version,
 *   metadata.oerVersions = [{ version, date, notes }] newest first
 * - each release: a hidden, locked child page titled "v1.2.0" whose
 *   metadata has oerSnapshotOf = page id, version, versionStatus "archived",
 *   and copies of the page's type, fields and structure (a rubric's
 *   oerRubric, a course sequence's oerSequence); its content is the page's
 *   HTML at release time
 *
 * Rubrics go with releases: each rubric a page or sequence uses at the
 * latest is pinned in the release to the rubric's current version, and
 * released first when it has changed since its last release (or never was),
 * so an archived version keeps the rubric as it was (rubricPlan).
 */
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { pageIcon } from "../types/page-icon.js";
import { saveOutline, newItemId } from "../outline/outline-model.js";
import { findRubric, isRubric, sameRubric, parseRubricRef, rubricRefsIn, itemRubric, isGradedItem } from "../rubrics/rubric-model.js";

export const isSnapshot = (item) => !!item?.metadata?.oerSnapshotOf;

const items = () => toJS(store.manifest?.items) || [];

export function parseVersion(v) {
  const m = String(v || "").match(/^(\d+)\.(\d+)\.(\d+)$/);
  return m ? m.slice(1).map(Number) : null;
}

export function bump(v, part) {
  const [major, minor, patch] = parseVersion(v) || [0, 0, 0];
  if (part === "major") return `${major + 1}.0.0`;
  if (part === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

export const compareVersions = (a, b) => {
  const x = parseVersion(a) || [0, 0, 0];
  const y = parseVersion(b) || [0, 0, 0];
  return x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
};

/** Releases of a page, newest first: [{ version, date, notes, snapshot }]. */
export function versionsOf(pageId, list = items()) {
  const page = list.find((i) => i.id === pageId);
  const snapshots = list.filter((i) => i.metadata?.oerSnapshotOf === pageId);
  const recorded = page?.metadata?.oerVersions || [];
  const out = recorded.map((r) => ({ ...r, snapshot: snapshots.find((s) => s.metadata?.version === r.version) || null }));
  // snapshots without a record (e.g. after a manual edit) still count
  for (const s of snapshots) {
    if (!out.some((r) => r.version === s.metadata.version)) {
      out.push({ version: s.metadata.version, date: s.metadata.created, notes: "", snapshot: s });
    }
  }
  return out.sort((a, b) => compareVersions(b.version, a.version));
}

/** The page a snapshot belongs to. */
export function latestOf(snapshot, list = items()) {
  return list.find((i) => i.id === snapshot?.metadata?.oerSnapshotOf) || null;
}

// the page's stored HTML, without the page-break (it carries page metadata
// such as title and parent, which must not leak into the snapshot)
async function pageHtml(item) {
  const url = new URL(item.location, globalThis.document.baseURI);
  url.searchParams.set("t", String(Date.now()));
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Could not read the page (${res.status})`);
  const htmlText = await res.text();
  return htmlText.replace(/<page-break\b[^>]*>(?:\s*<\/page-break>)?/gi, "").trim() || "<p></p>";
}

// the rubric a sequence item grades with (its own, or its page's)
const gradingRubric = (it, list) => (isGradedItem(it) ? itemRubric(it, list.find((i) => i.id === it.page)) : { ref: "" });

// the rubric pages a page uses at the latest (not pinned): its Rubric
// blocks (from `contents`, else its recorded list) and a sequence's graded
// items (their own rubrics, or their pages')
function rubricsUsed(page, contents, list) {
  const refs = new Set();
  for (const entry of contents != null ? rubricRefsIn(contents) : [].concat(page.metadata?.oerRubrics || [])) {
    const r = parseRubricRef(entry);
    if (!r.version) refs.add(r.ref);
  }
  for (const m of page.metadata?.oerSequence?.modules || []) {
    for (const it of m.items || []) {
      const r = gradingRubric(it, list);
      if (r.ref && !r.version) refs.add(r.ref);
    }
  }
  const out = new Map();
  for (const ref of refs) {
    const rubric = findRubric(list, ref);
    if (rubric && !isSnapshot(rubric)) out.set(rubric.id, rubric);
  }
  return [...out.values()];
}

/**
 * What releasing `page` does to its rubrics: [{ rubric, version, release,
 * since }]. Each is pinned to `version`, its current release, or released
 * first as `version` (release: true) when it changed since `since` or was
 * never released.
 */
export function rubricPlan(page, list = items(), contents = null) {
  if (!page || isRubric(page) || isSnapshot(page)) return [];
  return rubricsUsed(page, contents, list).map((rubric) => {
    const latest = versionsOf(rubric.id, list)[0];
    if (latest?.snapshot && sameRubric(rubric, latest.snapshot)) return { rubric, version: latest.version, release: false, since: latest.version };
    return { rubric, version: latest ? bump(latest.version, "minor") : "1.0.0", release: true, since: latest?.version || "" };
  });
}

// pin a page's Rubric blocks that show the latest to the plan's versions
function pinBlocks(html, plan, list) {
  return html.replace(/<oer-rubric\b[^>]*>/gi, (tag) => {
    if (/\sversion="/i.test(tag)) return tag;
    const rubric = findRubric(list, tag.match(/\srubric-id="([^"]*)"/i)?.[1] || "");
    const pin = rubric && plan.find((p) => p.rubric.id === rubric.id);
    return pin ? tag.replace(/\s*(\/?)>$/, ` version="${pin.version}"$1>`) : tag;
  });
}

// pin a sequence's items that grade with the latest rubric; an item using
// its page's rubric names it, so the release keeps grading with it as it
// was whatever the page shows later
function pinSequence(sequence, plan, list) {
  return {
    ...sequence,
    modules: (sequence.modules || []).map((m) => ({
      ...m,
      items: (m.items || []).map((it) => {
        const r = gradingRubric(it, list);
        if (!r.ref || r.version) return r.from === "page" ? { ...it, rubric: r.ref, rubricVersion: r.version } : it;
        const rubric = findRubric(list, r.ref);
        const pin = rubric && plan.find((p) => p.rubric.id === rubric.id);
        return pin ? { ...it, rubric: r.ref, rubricVersion: pin.version } : it;
      }),
    })),
  };
}

// a release: the page's record of it, and its archived copy
function releaseItems(page, version, notes, contents, list, extra = {}) {
  const siblings = list.filter((i) => i.parent === page.id);
  const snapshot = {
    id: newItemId(),
    title: `v${version}`,
    parent: page.id,
    order: siblings.length + 1000,
    indent: (Number(page.indent) || 0) + 1,
    location: "",
    description: page.description || "",
    metadata: {
      pageType: page.metadata?.pageType,
      oerFields: page.metadata?.oerFields || {},
      ...(page.metadata?.oerRubric ? { oerRubric: page.metadata.oerRubric } : {}),
      ...(page.metadata?.oerSequence ? { oerSequence: page.metadata.oerSequence } : {}),
      ...extra,
      icon: pageIcon(page),
      oerSnapshotOf: page.id,
      oerSnapshotTitle: page.title,
      version,
      versionStatus: "archived",
      hideInMenu: true,
      locked: true,
      published: page.metadata?.published !== false,
    },
    contents,
    new: true,
  };
  if (!snapshot.metadata.pageType) delete snapshot.metadata.pageType;
  if (!snapshot.metadata.icon) delete snapshot.metadata.icon;
  const record = { version, date: Math.floor(Date.now() / 1000), notes: notes.trim() };
  const update = { ...page, metadata: { ...page.metadata, version, oerVersions: [record, ...(page.metadata?.oerVersions || [])] }, modified: true };
  return [update, snapshot];
}

/**
 * Release the page's current content as `version` with notes, with its
 * rubrics pinned (and released first where they changed; rubricPlan).
 * Resolves when HAXcms has saved it, in one outline save.
 */
export async function publishVersion(pageId, version, notes = "") {
  if (!parseVersion(version)) throw new Error("Versions look like 1.2.0");
  const list = items();
  const page = list.find((i) => i.id === pageId);
  if (!page) throw new Error("Page not found");
  if (versionsOf(pageId, list).some((r) => r.version === version)) throw new Error(`Version ${version} already exists`);
  let contents = await pageHtml(page);
  const plan = rubricPlan(page, list, contents);
  const out = [];
  for (const p of plan.filter((x) => x.release)) {
    out.push(...releaseItems(p.rubric, p.version, `Released with “${page.title}” v${version}.`, await pageHtml(p.rubric), list));
  }
  contents = pinBlocks(contents, plan, list);
  const extra = { oerRubrics: rubricRefsIn(contents) };
  if (page.metadata?.oerSequence) extra.oerSequence = pinSequence(page.metadata.oerSequence, plan, list);
  out.push(...releaseItems(page, version, notes, contents, list, extra));
  await saveOutline(out);
  // outline saves drop descriptions: give the archived copies theirs
  const fresh = items();
  for (const snap of out.filter((i) => i.new && i.description)) {
    const saved = fresh.find((i) => i.metadata?.oerSnapshotOf === snap.metadata.oerSnapshotOf && i.metadata?.version === snap.metadata.version);
    if (saved && !saved.description) await store.cmsSiteEditor?.instance?.saveNodeDetails?.({ detail: { id: saved.id, operation: "setDescription", description: snap.description } });
  }
}
