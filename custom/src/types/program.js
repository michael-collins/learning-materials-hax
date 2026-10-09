/**
 * Programs: the degrees (and certificates) courses count toward, each a
 * page under Institution → Programs. A course names its programs in its
 * Degree programs field, which links to these pages; a program page lists
 * those courses (oer-collection scope="linked"), and OER Courses groups
 * course sites by them.
 */
const PROGRAM_TYPE = "oer:program";
export { PROGRAM_TYPE };

const isSnap = (i) => !!i?.metadata?.oerSnapshotOf;

/** The type, as the site's content types hold it (scripts/programs.mjs adds it). */
export const PROGRAM_DEF = {
  id: PROGRAM_TYPE,
  label: "Program",
  icon: "oer:school",
  description: "A degree or certificate: where it's offered, its bulletin entry, and the courses that count toward it.",
  schemaType: "EducationalOccupationalProgram",
  children: [],
  nav: false,
  template: '<p></p>\n<h2>Courses</h2>\n<oer-collection types="oer:course" scope="linked" view="table" sort="title" controls="none"></oer-collection>',
  fields: [
    { name: "shortName", label: "Short name", kind: "text", header: true, help: "What people call it, e.g. DMD." },
    { name: "degree", label: "Degree", kind: "text", header: true, help: "The credential, e.g. Bachelor of Design (B.Des.)." },
    { name: "institution", label: "Institution", kind: "text", header: true },
    {
      name: "campuses",
      label: "Campuses",
      kind: "select",
      multiple: true,
      header: true,
      filter: true,
      options: [
        { value: "University Park", label: "University Park" },
        { value: "World Campus", label: "World Campus" },
      ],
      help: "Where it's offered.",
    },
    { name: "programUrl", label: "Program website", kind: "url", header: true },
    { name: "bulletin", label: "Bulletin entry", kind: "url", header: true },
  ],
};

/** The site's programs, in navigation order. */
export const programPages = (items) =>
  (items || []).filter((i) => i.metadata?.pageType === PROGRAM_TYPE && !isSnap(i)).sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

/**
 * A course's programs, by title: its Degree programs links resolved to the
 * program pages (a name, as courses held them before programs were pages,
 * is kept as it is).
 */
export function programsOf(course, items) {
  const v = course?.metadata?.oerFields?.programs;
  return (Array.isArray(v) ? v : [])
    .map((x) => (x && typeof x === "object" ? (items || []).find((i) => i.id === x.page)?.title : x))
    .filter(Boolean);
}
