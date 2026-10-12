/**
 * Tutorial series: a Tutorial whose sub-pages are its parts, in outline
 * order (a YouTube playlist becomes one, with a part per video; nu-hax
 * scripts/video-page.mjs). Like a project's steps, the outline is the only
 * source of truth: a part's number is its place among the series' Tutorial
 * sub-pages.
 *
 *   Bouncing a ball                          (Tutorial: the series)
 *     Keyframing a bouncing ball, pose by…   (Tutorial: part 1)
 *     Motion paths and bounce interpolation  (Tutorial: part 2)
 *
 * A part's video is metadata.oerVideoSource ({ source, duration }) when a
 * script made it, otherwise the first oer-video in its content (the
 * tutorial series block reads that when it loads the part).
 *
 * No imports from the theme, so nu-hax scripts can use it too.
 */
export const TUTORIAL_TYPE = "oer:tutorial";

const ordered = (list) => [...list].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
const isTutorial = (i) => i?.metadata?.pageType === TUTORIAL_TYPE && !i.metadata?.oerSnapshotOf;

/** A series' parts in order: [{ item, part }] (part is 1-based). */
export function seriesParts(seriesId, items) {
  return ordered((items || []).filter((i) => i.parent === seriesId && isTutorial(i) && !i.metadata?.hideInMenu)).map((item, n) => ({ item, part: n + 1 }));
}

/** A Tutorial with Tutorial sub-pages is a series. */
export function isSeries(item, items) {
  return isTutorial(item) && seriesParts(item.id, items).length > 0;
}

/** For a part of a series: { series, part, total }, else null. */
export function partContext(item, items) {
  if (!isTutorial(item) || !item.parent) return null;
  const series = (items || []).find((i) => i.id === item.parent);
  if (!isTutorial(series)) return null;
  const parts = seriesParts(series.id, items);
  const me = parts.find((p) => p.item.id === item.id);
  return me ? { series, part: me.part, total: parts.length } : null;
}

/** The series every page shows with a tutorial series block (recorded when it's saved). */
export const seriesShownBy = (item) => item?.metadata?.oerTutorialSeries || [];

/** The series ids in a page's HTML (its tutorial series blocks). */
export function seriesInHtml(doc) {
  return [...new Set([...doc.querySelectorAll("oer-tutorial-series[series]")].map((el) => el.getAttribute("series")).filter(Boolean))];
}

/** A part's video link and length (seconds), from its metadata, or null. */
export function partVideo(item) {
  const v = item?.metadata?.oerVideoSource;
  return v?.source && /^https?:/.test(v.source) ? { src: v.source, duration: Number(v.duration) || 0 } : null;
}

/** 754 → "12:34"; 3750 → "1:02:30" */
export function duration(seconds) {
  const s = Math.round(Number(seconds) || 0);
  if (!s) return "";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}
