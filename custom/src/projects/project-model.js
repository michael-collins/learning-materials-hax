/**
 * Projects made of activities (OER Schema: a Project hasActivity Activity).
 * The outline is the single source of truth: a project's activities are
 * its sub-pages of type Activity, in outline order; their step is their
 * position among those activities, and their stage is the heading above
 * them ("Discover", "Concept stage"…). Other sub-pages (articles,
 * tutorials) are the project's supporting material.
 *
 *   Ritual Project            (Project)
 *     Ritual Inspiration      (Article: supporting)
 *     Discover                (heading: a stage)
 *       Discover: Interview   (Activity, step 1, stage Discover)
 *     Define
 *       …
 */
import { isHeading } from "../types/content-types.js";

export const PROJECT_TYPE = "oer:project";
export const ACTIVITY_TYPE = "oer:activity";

const ordered = (list) => [...list].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

/**
 * A project's sub-pages in order: [{ item, activity, step, stage }]. step
 * is 1-based among activities (0 for supporting pages); stage is the
 * nearest heading above, or "".
 */
export function projectParts(projectId, items) {
  const kids = ordered((items || []).filter((i) => i.parent === projectId && !i.metadata?.oerSnapshotOf));
  const out = [];
  let stage = "";
  let step = 0;
  for (const item of kids) {
    if (isHeading(item)) {
      stage = item.title;
      continue;
    }
    if (item.metadata?.hideInMenu) continue;
    const activity = item.metadata?.pageType === ACTIVITY_TYPE;
    if (activity) step++;
    out.push({ item, activity, step: activity ? step : 0, stage });
  }
  return out;
}

/** For an activity inside a project: { project, step, total, stage }, else null. */
export function activityContext(item, items) {
  if (!item?.parent || item.metadata?.pageType !== ACTIVITY_TYPE) return null;
  const project = (items || []).find((i) => i.id === item.parent);
  if (project?.metadata?.pageType !== PROJECT_TYPE) return null;
  const parts = projectParts(project.id, items);
  const me = parts.find((p) => p.item.id === item.id);
  if (!me) return null;
  return { project, step: me.step, total: parts.filter((p) => p.activity).length, stage: me.stage };
}
