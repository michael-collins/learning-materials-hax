/**
 * Keep each page's metadata.oerRubrics (the rubrics its Rubric blocks show,
 * "exercise" or pinned to a release "exercise@1.0.0")
 * in step with its content, so a rubric knows where it's used without
 * reading every page (rubric-model.js rubricUsage). The theme calls this
 * as a page is saved; scripts/index-rubric-usage.mjs filled it in for the
 * pages that existed before.
 */
import { store, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { saveOutline, manifestChange } from "../outline/outline-model.js";

const same = (a, b) => a.length === b.length && a.every((x) => b.includes(x));

/** After page `id` is saved showing rubrics `refs`, record them if they changed. */
export async function syncRubricRefs(id, refs) {
  const find = () => (toJS(store.manifest?.items) || []).find((i) => i.id === id);
  const before = find();
  if (!before || same([].concat(before.metadata?.oerRubrics || []), refs)) return;
  // the page save rewrites the manifest; record the rubrics on top of it
  await manifestChange(store.manifest);
  const page = find();
  if (!page || same([].concat(page.metadata?.oerRubrics || []), refs)) return;
  await saveOutline([{ ...page, metadata: { ...page.metadata, oerRubrics: refs }, modified: true }]);
}
