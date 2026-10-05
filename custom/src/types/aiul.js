/**
 * AI Usage Licenses (AIUL, https://dmd-program.github.io/aiul/): what a code
 * like "AIUL-WA" or "AIUL-NA-3D" means.
 *
 * Names, links and badge images come from the AIUL API (api/licenses.json,
 * modifiers.json, combinations.json), falling back to the copy HAX ships in
 * @haxtheweb/ai-usage-license. The short description, requirements and
 * student guidelines come from the API when it has them (description,
 * requirements, studentGuidelines); until then from this copy of the AIUL
 * license sources (_licenses/aiul-*.md: front matter and "Guidelines for
 * Students"), v1.0.0.
 */
const API = "https://dmd-program.github.io/aiul/api";
export const AIUL_GUIDE = "https://dmd-program.github.io/aiul/guide.html";

export const AIUL_DETAILS = {
  "NA": {
    "description": "No AI tools allowed. All work must be entirely student-generated.",
    "requirements": [
      "Students may not use AI generation tools for any part of the assignment",
      "All work must be completed using only the student's own skills and knowledge",
      "Third-party non-AI tools and resources may still be permitted according to standard course policies",
      "Students should be prepared to explain their process and demonstrate their skills if asked"
    ],
    "students": [
      "Complete all aspects of the assignment without using AI tools",
      "Document their process in the traditional manner required by the instructor",
      "Be prepared to explain their working process if asked",
      "Follow all other course guidelines for acceptable resources"
    ]
  },
  "WA": {
    "description": "Limited AI assistance is permitted only with instructor pre-approval.",
    "requirements": [
      "Students must request and receive explicit permission before using AI tools",
      "Students must document which AI tools were used and how they were integrated into the work",
      "AI usage should support rather than replace the student's work",
      "Students must follow any additional guidelines specified in the approval"
    ],
    "students": [
      "Submit a request for AI usage approval before beginning work with AI tools",
      "Clearly explain which tools they wish to use and how they will be integrated",
      "Wait for explicit approval before proceeding with AI assistance",
      "Document their AI usage according to approved parameters",
      "Be prepared to discuss how AI contributed to their process"
    ]
  },
  "CD": {
    "description": "AI tools may be used for research and ideation, but the final work must be entirely student-generated.",
    "requirements": [
      "Students may use AI tools only for research, ideation, and concept development",
      "The final work must be entirely created by the student without AI generation",
      "Students must document which AI tools were used and how they contributed to the ideation process",
      "AI outputs may inform but not directly appear in the final work"
    ],
    "students": [
      "Use AI tools to explore concepts, gather information, and develop ideas",
      "Document the AI tools used and how they contributed to the ideation process",
      "Create the final work entirely themselves, without AI-generated content",
      "Be prepared to discuss how AI-assisted research influenced their thinking",
      "Cite AI tools and prompts used in the research/ideation phase"
    ]
  },
  "TC": {
    "description": "AI may be used as a collaborative tool, but outputs must be significantly transformed.",
    "requirements": [
      "Students may use AI tools as collaborative partners in the creation process",
      "All AI outputs must be significantly transformed and modified by the student",
      "Students must document the AI tools used, prompts provided, and how outputs were transformed",
      "The final work must demonstrate the student's critical thinking and creative direction"
    ],
    "students": [
      "Use AI tools as collaborative partners in the creation process",
      "Critically evaluate and significantly transform all AI-generated content",
      "Document the original AI outputs and your transformations",
      "Provide clear explanations of your creative decisions and modifications",
      "Be prepared to discuss your collaborative process and creative direction"
    ]
  },
  "DP": {
    "description": "AI-assisted creation is permitted with clear direction and modification from the student.",
    "requirements": [
      "Students may use AI tools to generate content under their direction",
      "Students must provide clear creative direction to the AI tools",
      "Students must apply post-processing and refinement to AI outputs",
      "Students must document their prompts, direction process, and post-processing decisions"
    ],
    "students": [
      "Provide clear, intentional direction to AI tools through careful prompt crafting",
      "Apply thoughtful post-processing and refinement to AI outputs",
      "Document the direction process, including prompt iterations and decisions",
      "Explain post-processing choices and their relationship to your creative vision",
      "Be prepared to discuss how your direction shaped the AI-generated elements"
    ]
  },
  "IU": {
    "description": "AI usage is a required component of the assignment, with focus on sophisticated AI integration.",
    "requirements": [
      "Students must use AI tools as a significant component of the assignment",
      "Students must demonstrate sophisticated and intentional AI usage",
      "Students must thoroughly document their AI usage, including prompts and process",
      "Students must reflect on the ethical implications and effectiveness of their AI integration"
    ],
    "students": [
      "Use AI tools extensively and intentionally as part of the assignment",
      "Demonstrate sophisticated prompt engineering and AI interaction techniques",
      "Document their process thoroughly, including prompts, iterations, and decision-making",
      "Reflect critically on the effectiveness and implications of their AI usage",
      "Be prepared to discuss both technical and ethical dimensions of their work with AI"
    ]
  }
};

let data = null;
/** { licenses, modifiers, combinations } from the API, or HAX's copy. */
export function loadAiul() {
  if (!data) {
    const get = (name) => fetch(`${API}/${name}.json`).then((r) => (r.ok ? r.json() : Promise.reject(r.status))).then((j) => j.data || []);
    data = Promise.all([get("licenses"), get("modifiers"), get("combinations")])
      .then(([licenses, modifiers, combinations]) => ({ licenses, modifiers, combinations }))
      .catch(() => {
        const base = globalThis.WCGlobalBasePath || new URL("build/es6/node_modules/", globalThis.document.baseURI).href;
        return fetch(`${base}@haxtheweb/ai-usage-license/lib/v1.json`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null);
      });
  }
  return data;
}

/**
 * Everything about one code: { code, title, name, modifier, url, image,
 * description, requirements, students }. Works before the API answers
 * (names fall back to the code).
 */
export function aiulInfo(code, api) {
  const [, lic, mod] = String(code).match(/^AIUL-([A-Z]+)(?:-([A-Z0-9]+))?$/i) || [];
  const L = (lic || "").toUpperCase();
  const M = (mod || "").toUpperCase();
  const license = api?.licenses?.find((l) => l.code === L);
  const modifier = M ? api?.modifiers?.find((m) => m.code === M) : null;
  const combination = M ? api?.combinations?.find((c) => c.code === `${L}-${M}`) : null;
  const own = AIUL_DETAILS[L] || { description: "", requirements: [], students: [] };
  const details = {
    description: license?.description || own.description,
    requirements: license?.requirements?.length ? license.requirements : own.requirements,
    students: license?.studentGuidelines?.length ? license.studentGuidelines : own.students,
  };
  return {
    code,
    title: license?.title || (L ? `AIUL-${L}` : String(code)),
    name: license?.fullName || "",
    modifier: modifier ? modifier.fullName || modifier.title : M,
    url: combination?.url || license?.url || "",
    image: combination?.image || license?.image || "",
    ...details,
  };
}
