/**
 * Where each content type's pages live, and how to explain the types to
 * someone adding a page. The New page dialog (ui/oer-new-page.js), the
 * New [type] button on listing pages and the Canvas importer read it.
 */
import { SECTION_TYPE, contentTypes } from "./content-types.js";

// the top-level page that lists each type's pages, by its title
export const HOME_TITLES = {
  "oer:lesson": "Lessons",
  "oer:lecture": "Lectures",
  "oer:tutorial": "Tutorials",
  "oer:article": "Articles",
  "oer:resource": "Resources",
  "oer:exercise": "Exercises",
  "oer:reflection": "Reflections",
  "oer:project": "Projects",
  "oer:activity": "Projects",
  "oer:quiz": "Quizzes",
  "oer:rubric": "Rubrics",
  "oer:course": "Courses",
  "oer:sequence": "Sequences",
  "oer:pathway": "Pathways",
  "oer:book": "Books",
  "oer:program": "Programs",
};

/** The page that lists a type's pages, if the site has it. */
export function homeOf(typeId, list) {
  const title = HOME_TITLES[typeId];
  return (title && (list || []).find((i) => !i.parent && i.title === title && !i.metadata?.oerSnapshotOf)) || null;
}

/** The type a top-level listing page is for ("Lessons" → oer:lesson), or null. */
export function typeListedOn(item) {
  if (!item || item.parent) return null;
  return Object.keys(HOME_TITLES).find((t) => HOME_TITLES[t] === item.title) || null;
}

// the types in the order someone adding a page thinks of them
export const TYPE_GROUPS = [
  { label: "Course materials", hint: "Pages students read, watch or look up.", types: ["oer:lesson", "oer:lecture", "oer:tutorial", "oer:article", "oer:resource"] },
  { label: "Assessed work", hint: "Work students do and hand in, and how it's graded.", types: ["oer:exercise", "oer:reflection", "oer:project", "oer:activity", "oer:quiz", "oer:rubric"] },
  { label: "Courses and pathways", hint: "How the materials come together for teaching.", types: ["oer:program", "oer:course", "oer:course-site", "oer:sequence", "oer:pathway", "oer:unit", "oer:book", "oer:specialization"] },
  { label: "Site structure", hint: "Groups pages in the navigation.", types: [SECTION_TYPE] },
];

// a line for each type whose definition has no description of its own
const HINTS = {
  "oer:lesson": "A topic taught in a session or two: its objectives, readings, lectures and activities in one place.",
  "oer:lecture": "Slides, a recording or notes for a talk.",
  "oer:tutorial": "Step-by-step instructions for a tool or technique.",
  "oer:article": "Writing to read: background, a guide or an essay.",
  "oer:exercise": "Practice on a narrow skill, handed in and assessed.",
  "oer:project": "A larger piece of work in steps (activities), assessed as a whole.",
  "oer:pathway": "A route through units and lessons toward a goal, in levels.",
  "oer:book": "Pages from across the site gathered as chapters, in reading order.",
  "oer:specialization": "A set of pathways that together make a specialization.",
};

/** A type's one-line description: its own, or the guide's. */
export const typeHint = (type) => type?.description || HINTS[type?.id] || "";

/** The site's types (no system page or headings), grouped as TYPE_GROUPS, any others last. */
export function groupedTypes(list, only = null) {
  const types = contentTypes(list).types.filter((t) => !only || only.some((o) => o.id === t.id));
  const placed = new Set();
  const groups = TYPE_GROUPS.map((g) => {
    const members = g.types.map((id) => types.find((t) => t.id === id)).filter(Boolean);
    members.forEach((t) => placed.add(t.id));
    return { ...g, types: members };
  });
  const rest = types.filter((t) => !placed.has(t.id));
  if (rest.length) groups.push({ label: "Other", hint: "Types added for this site.", types: rest });
  return groups.filter((g) => g.types.length);
}
