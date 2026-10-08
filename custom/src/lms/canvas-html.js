/**
 * Canvas HTML → this site's HTML, for the Canvas import. String-based (no
 * DOM), so it runs in the browser and in Node:
 * - drops Canvas's styling and plumbing: style attributes (brand colours,
 *   font sizes), classes, data-* attributes (API addresses with course ids),
 *   ids, empty spans and paragraphs; h1 becomes h2
 * - Canvas's link tokens become placeholders the import resolves once pages
 *   and files exist: canvas-file:<path>, canvas-page:<slug>,
 *   canvas-object:<kind>/<id>
 * - video and document embeds become the site's oer-iframe block
 * - a quiz's questions become the site's question blocks
 */
import { decodeEntities } from "./xml-lite.js";

const escAttr = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escText = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Plain text of an HTML fragment. */
export function htmlText(html) {
  return decodeEntities(
    String(html || "")
      .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<br\s*\/?>|<\/(p|div|li|h\d|tr)>/gi, "\n")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/[ \t ]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .trim();
}

// a Canvas link token → the import's placeholder
function token(url) {
  const u = decodeEntities(url);
  let m = u.match(/^\$IMS-CC-FILEBASE\$\/([^?#]*)/);
  if (m) return `canvas-file:${decodeURIComponent(m[1])}`;
  m = u.match(/^\$WIKI_REFERENCE\$\/pages\/([^?#]*)/);
  if (m) return `canvas-page:${decodeURIComponent(m[1])}`;
  m = u.match(/^\$CANVAS_OBJECT_REFERENCE\$\/([a-z_]+)\/([^?#/]*)/);
  if (m) return `canvas-object:${m[1]}/${m[2]}`;
  m = u.match(/^\$CANVAS_COURSE_REFERENCE\$\/(.*)$/);
  if (m) return `canvas-course:${m[1]}`;
  return u;
}

/** The placeholders an HTML fragment uses: { files, pages, objects }. */
export function placeholdersIn(html) {
  const out = { files: new Set(), pages: new Set(), objects: new Set() };
  for (const m of String(html).matchAll(/(?:href|src)="(canvas-(file|page|object):([^"]*))"/g)) {
    out[{ file: "files", page: "pages", object: "objects" }[m[2]]].add(m[3]);
  }
  return out;
}

const EMBED = /youtube\.com|youtu\.be|vimeo\.com|kaltura\.com|panopto|docs\.google\.com|drive\.google\.com|loom\.com|sketchfab\.com|figma\.com/i;

/** Clean Canvas HTML for the site. */
export function cleanCanvasHtml(html) {
  let out = String(html || "");
  // tokens in links and sources first, while attributes are intact
  out = out.replace(/\b(href|src)="([^"]*)"/gi, (m, a, v) => (/\$[A-Z_-]+\$/.test(v) ? `${a}="${escAttr(token(v))}"` : m));
  // embeds: an iframe to a video or document host → the oer-iframe block;
  // others stay iframes (without Canvas's inline styles)
  out = out.replace(/<iframe\b([^>]*)>(?:\s*<\/iframe>)?/gi, (m, attrs) => {
    const src = attrs.match(/\ssrc="([^"]*)"/i)?.[1] || "";
    const title = attrs.match(/\stitle="([^"]*)"/i)?.[1] || "Embedded content";
    if (EMBED.test(src)) return `<oer-iframe src="${src}" title="${title}"></oer-iframe>`;
    const height = attrs.match(/\sheight="(\d+)"/i)?.[1];
    return `<iframe src="${src}" title="${title}"${height ? ` height="${Math.min(Number(height), 1600)}"` : ""} width="100%" loading="lazy"></iframe>`;
  });
  // Canvas plumbing
  out = out
    .replace(/\s(style|class|id|role|target|rel|data-[\w-]+|aria-[\w-]+)="[^"]*"/gi, "")
    .replace(/<\/?(font|o:p)[^>]*>/gi, "")
    .replace(/<span>([\s\S]*?)<\/span>/gi, "$1")
    .replace(/<span>([\s\S]*?)<\/span>/gi, "$1")
    .replace(/<(\/?)h1\b/gi, "<$1h2")
    .replace(/<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, "")
    .replace(/<div>([\s\S]*?)<\/div>/gi, "$1")
    .replace(/\n{3,}/g, "\n\n");
  // links open in the same tab unless they leave the site (the theme decides)
  return out.trim();
}

/**
 * A quiz's questions as the site's question blocks: multiple choice (one or
 * several right answers), true/false; short answers and others with an
 * answer become self-checks; questions with no right answer are listed in
 * `skipped`. → { html, skipped: [{ prompt, type }] }
 */
export function questionsHtml(questions = []) {
  const blocks = [];
  const skipped = [];
  for (const q of questions) {
    const prompt = htmlText(q.prompt).replace(/\s+/g, " ").trim();
    const right = q.answers.filter((a) => a.correct);
    if (["multiple_choice_question", "multiple_answers_question", "true_false_question"].includes(q.type) && right.length) {
      const tf = q.type === "true_false_question";
      const tag = tf ? "true-false-question" : "multiple-choice";
      const single = q.type === "multiple_choice_question" ? ' single-option=""' : "";
      const inputs = q.answers.map((a) => `  <input type="checkbox" value="${escAttr(htmlText(a.text))}"${a.correct ? ' data-correct="true"' : ""}>`).join("\n");
      blocks.push(`<${tag} question="${escAttr(prompt)}"${single}>\n${inputs}\n</${tag}>`);
    } else if (q.type === "short_answer_question" && right.length) {
      blocks.push(`<self-check title="Check yourself">\n  <p slot="question">${escText(prompt)}</p>\n  <p>${escText(right.map((a) => htmlText(a.text)).join(" / "))}</p>\n</self-check>`);
    } else if (q.feedback) {
      blocks.push(`<self-check title="Think it through">\n  <p slot="question">${escText(prompt)}</p>\n  <p>${escText(htmlText(q.feedback))}</p>\n</self-check>`);
    } else if (q.type !== "text_only_question") {
      skipped.push({ prompt, type: q.type });
    }
  }
  return { html: blocks.join("\n"), skipped };
}
