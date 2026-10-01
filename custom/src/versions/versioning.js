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
 *   and copies of the page's type and fields; its content is the page's
 *   HTML at release time
 */
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { saveOutline, newItemId } from "../outline/outline-model.js";

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

/**
 * Release the page's current content as `version` with notes. Resolves when
 * HAXcms has saved it.
 */
export async function publishVersion(pageId, version, notes = "") {
  if (!parseVersion(version)) throw new Error("Versions look like 1.2.0");
  const list = items();
  const page = list.find((i) => i.id === pageId);
  if (!page) throw new Error("Page not found");
  if (versionsOf(pageId, list).some((r) => r.version === version)) throw new Error(`Version ${version} already exists`);
  const contents = await pageHtml(page);
  const date = Math.floor(Date.now() / 1000);
  const siblings = list.filter((i) => i.parent === pageId);
  const snapshot = {
    id: newItemId(),
    title: `v${version}`,
    parent: pageId,
    order: siblings.length + 1000,
    indent: (Number(page.indent) || 0) + 1,
    location: "",
    description: page.description || "",
    metadata: {
      pageType: page.metadata?.pageType,
      oerFields: page.metadata?.oerFields || {},
      icon: page.metadata?.icon,
      oerSnapshotOf: pageId,
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
  const record = { version, date, notes: notes.trim() };
  const out = list.map((i) =>
    i.id === pageId
      ? {
          ...i,
          metadata: { ...i.metadata, version, oerVersions: [record, ...(i.metadata?.oerVersions || [])] },
          modified: true,
        }
      : i,
  );
  out.push(snapshot);
  return saveOutline(out);
}
