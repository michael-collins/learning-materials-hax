/**
 * oer-schematic: a simplified drawing of part of the site's interface, for
 * documentation. Grey boxes and lines stand in for content and only the
 * feature being explained is drawn in the primary colour, so the picture
 * can't be mistaken for the page around it (screenshots could). Drawn from
 * the theme's tokens, so it follows dark mode and never goes stale with
 * small UI changes.
 *
 *   <oer-schematic preset="sidebar" alt="…" caption="…"></oer-schematic>
 */
import { html, css, svg, LitElement } from "../lit.js";
import { registerBlocks } from "./register.js";

const W = 400;
const H = 240;

/* ---------- primitives ---------- */

const R = (x, y, w, h, cls = "box", rx = 4) => svg`<rect x=${x} y=${y} width=${w} height=${h} rx=${rx} class=${cls}></rect>`;
// a line of text
const L = (x, y, w, cls = "t") => R(x, y, w, 5, cls, 2.5);
const T = (x, y, text, cls = "lbl", anchor = "start") => svg`<text x=${x} y=${y} class=${cls} text-anchor=${anchor}>${text}</text>`;
const C = (cx, cy, r, cls = "t") => svg`<circle cx=${cx} cy=${cy} r=${r} class=${cls}></circle>`;
const P = (d, cls = "stroke") => svg`<path d=${d} class=${cls}></path>`;
const HR = (x1, y, x2) => svg`<line x1=${x1} y1=${y} x2=${x2} y2=${y} class="rule"></line>`;
// a labelled pill button
const btn = (x, y, w, text, kind = "hi-o") => svg`${R(x, y, w, 18, kind, 9)}${T(x + w / 2, y + 12.5, text, kind === "hi" ? "lbl on" : "lbl", "middle")}`;
const check = (x, y, on = true) => svg`${R(x, y, 10, 10, on ? "hi" : "card", 2.5)}${on ? P(`M${x + 2.5} ${y + 5.2} l2 2 l3.2 -4`, "tick") : ""}`;
const chevron = (x, y, cls = "stroke hi-line") => P(`M${x} ${y} l3.5 3.5 l3.5 -3.5`, cls);

// a rectangle with only some corners rounded ([top-left, top-right,
// bottom-right, bottom-left]), so a panel inside a rounded frame follows
// the frame's corners instead of poking out of them
const RC = (x, y, w, h, [tl, tr, br, bl], cls) =>
  svg`<path class=${cls} d=${`M${x + tl} ${y} H${x + w - tr} A${tr} ${tr} 0 0 1 ${x + w} ${y + tr} V${y + h - br} A${br} ${br} 0 0 1 ${x + w - br} ${y + h} H${x + bl} A${bl} ${bl} 0 0 1 ${x} ${y + h - bl} V${y + tl} A${tl} ${tl} 0 0 1 ${x + tl} ${y} Z`}></path>`;

// the browser window: frame, top bar, optional sidebar
const WIN_R = 10;
const win = (sidebar = true) => svg`
  ${R(0.5, 0.5, W - 1, H - 1, "win", WIN_R)}
  ${HR(0.5, 28, W - 0.5)}
  ${C(14, 14, 3.5, "t2")}${C(25, 14, 3.5, "t2")}${C(36, 14, 3.5, "t2")}
  ${L(W - 74, 11.5, 40, "t2")}${C(W - 18, 14, 5, "t2")}
  ${sidebar ? svg`${RC(1, 28.5, 109.5, H - 29.5, [0, 0, 0, WIN_R - 1], "panel")}${P(`M110.5 28 V${H - 0.5}`, "rule")}` : ""}`;

// the page dimmed behind a dialog, inside the window's rounded corners
const scrim = () => RC(1, 28.5, W - 2, H - 29.5, [0, 0, WIN_R - 1, WIN_R - 1], "scrim");

// generic page content: title and paragraphs
const page = (x, y, w, lines = 5) => svg`
  ${R(x, y, w * 0.55, 10, "t", 3)}
  ${Array.from({ length: lines }, (_, i) => L(x, y + 24 + i * 12, w * (i % 3 === 2 ? 0.7 : 0.95)))}`;

// sidebar navigation lines, plain
const navLines = (y, n, x = 14) => Array.from({ length: n }, (_, i) => L(x, y + i * 13, 58 + ((i * 17) % 26)));

/* ---------- presets ---------- */

const PRESETS = {
  sidebar: () => svg`
    ${win()}
    ${R(8, 36, 94, 20, "card", 6)}
    ${R(10, 38, 50, 16, "hi-soft", 5)}${T(35, 49, "Navigation", "lbl sm", "middle")}${L(68, 43.5, 24, "t2")}
    ${T(14, 74, "LIBRARY", "lbl sm caps")}
    ${navLines(82, 3, 22)}
    ${T(14, 132, "CURRICULUM", "lbl sm caps")}
    ${navLines(140, 3, 22)}
    ${btn(18, 186, 74, "+ Add page", "ghost")}
    ${btn(22, 210, 66, "Edit outline")}
    ${page(126, 44, 258, 9)}`,

  breadcrumb: () => svg`
    ${win(false)}
    ${HR(0.5, 62, W - 0.5)}
    ${L(18, 42, 34)}${T(60, 47, "/", "sep")}
    ${R(70, 35, 26, 18, "hi-soft", 5)}${T(83, 48, "…", "lbl", "middle")}
    ${T(104, 47, "/", "sep")}${L(114, 42, 46)}${T(168, 47, "/", "sep")}${R(178, 42, 58, 5, "t-strong", 2.5)}
    ${R(62, 58, 120, 66, "pop hi-line", 7)}
    ${L(74, 72, 72)}${L(74, 88, 88)}${L(74, 104, 64)}
    ${page(200, 82, 180, 7)}
    ${L(20, 140, 160)}${L(20, 152, 150)}${L(20, 164, 168)}${L(20, 176, 120)}`,

  editor: () => svg`
    ${win(false)}
    ${R(0.5, 28, W - 1, 30, "panel", 0)}${HR(0.5, 58, W - 0.5)}
    ${L(16, 40.5, 70, "t")}
    ${btn(W - 132, 34, 56, "Cancel", "ghost")}${btn(W - 70, 34, 54, "Save", "hi")}
    ${R(70, 72, 160, 10, "t", 3)}
    ${L(70, 92, 270)}${L(70, 104, 250)}
    ${P(`M70 126 H${W - 50}`, "stroke hi-line dash")}${C(W / 2 + 10, 126, 8, "hi")}${P(`M${W / 2 + 6} 126 h8 M${W / 2 + 10} 122 v8`, "tick")}
    ${R(64, 140, 284, 56, "hi-o", 5)}
    ${R(40, 140, 18, 72, "card", 5)}
    ${R(44, 145, 10, 10, "hi", 2.5)}${R(44, 161, 10, 10, "hi-soft", 2.5)}${R(44, 177, 10, 10, "hi-soft", 2.5)}${R(44, 193, 10, 10, "hi-soft", 2.5)}
    ${L(74, 152, 250)}${L(74, 164, 262)}${L(74, 176, 200)}
    ${L(70, 214, 260)}${L(70, 226, 180)}`,

  collection: () => svg`
    ${win(false)}
    ${R(18, 42, 160, 10, "t", 3)}
    ${R(18, 64, 150, 20, "card", 5)}${L(28, 71.5, 60, "t2")}
    ${R(176, 64, 56, 20, "card", 10)}${L(188, 71.5, 32, "t2")}
    ${R(W - 128, 64, 110, 20, "card", 6)}
    ${R(W - 126, 66, 36, 16, "hi-soft", 4)}${T(W - 108, 77.5, "Table", "lbl sm", "middle")}
    ${L(W - 82, 71.5, 24, "t2")}${L(W - 50, 71.5, 24, "t2")}
    ${R(18, 96, W - 36, 128, "card", 6)}
    ${R(18.5, 96.5, W - 37, 20, "panel", 5.5)}
    ${L(30, 104, 60, "t-strong")}${chevron(94, 103, "stroke hi-line")}${L(170, 104, 50, "t-strong")}${L(280, 104, 50, "t-strong")}
    ${[0, 1, 2, 3, 4].map((i) => svg`${HR(18.5, 116.5 + i * 21, W - 18.5)}${L(30, 124 + i * 21, 90 + ((i * 23) % 40))}${R(170, 122 + i * 21, 42, 9, "pill", 4.5)}${L(280, 124 + i * 21, 60)}`)}`,

  "content-types": () => svg`
    ${win()}
    ${T(14, 46, "SITE", "lbl sm caps")}
    ${R(8, 54, 94, 18, "hi-soft", 5)}${L(16, 60.5, 60, "t-hi")}
    ${navLines(86, 5)}
    ${R(126, 40, 120, 10, "t", 3)}
    ${R(126, 58, 52, 20, "card", 6)}${L(134, 65.5, 36, "t2")}
    ${R(182, 58, 52, 20, "hi-soft", 6)}${L(190, 65.5, 36, "t-hi")}
    ${R(238, 58, 52, 20, "card", 6)}${L(246, 65.5, 36, "t2")}
    ${[0, 1, 2, 3].map((i) => svg`
      ${R(126, 90 + i * 34, 258, 28, "card", 6)}
      ${L(136, 101.5 + i * 34, 56 + ((i * 19) % 30))}
      ${R(232, 98 + i * 34, 48, 12, "pill", 6)}
      ${i === 1 ? svg`${R(342, 98 + i * 34, 24, 12, "hi", 6)}${C(360, 104 + i * 34, 4.5, "knob")}` : svg`${R(342, 98 + i * 34, 24, 12, "pill", 6)}${C(348, 104 + i * 34, 4.5, "knob")}`}`)}`,

  "page-menu": () => svg`
    ${win()}
    ${navLines(44, 10)}
    ${R(126, 44, 160, 12, "t", 3)}
    ${R(W - 36, 42, 18, 16, "hi-o", 4)}${chevron(W - 30.5, 48)}
    ${R(126, 68, 36, 10, "pill", 5)}${R(168, 68, 30, 10, "pill", 5)}
    ${L(126, 94, 150)}${L(126, 106, 140)}${L(126, 118, 146)}
    ${R(126, 136, 150, 70, "box", 5)}
    ${R(W - 128, 64, 110, 156, "pop hi-line", 8)}
    ${R(W - 122, 70, 98, 18, "hi-soft", 5)}${L(W - 114, 76.5, 56, "t-hi")}
    ${[0, 1, 2, 3, 4].map((i) => L(W - 114, 100 + i * 16, 48 + ((i * 13) % 26)))}
    ${HR(W - 122, 184, W - 24)}${L(W - 114, 194, 44)}${L(W - 114, 208, 54)}`,

  "page-details": () => svg`
    ${win()}
    ${navLines(44, 10)}
    ${page(126, 44, 258, 9)}
    ${scrim()}
    ${R(110, 40, 200, 190, "pop hi-line", 10)}
    ${R(124, 54, 90, 10, "t", 3)}
    ${L(124, 76, 30, "t2")}${R(124, 85, 172, 18, "card", 5)}${L(132, 91.5, 50)}${chevron(282, 92, "stroke")}
    ${L(124, 114, 50, "t2")}${R(124, 123, 172, 32, "card", 5)}${L(132, 131, 120)}${L(132, 143, 90)}
    ${L(124, 166, 40, "t2")}${R(124, 175, 172, 18, "card", 5)}${L(132, 181.5, 70)}
    ${btn(246, 202, 50, "Save", "hi")}`,

  "outline-builder": () => svg`
    ${win(false)}
    ${R(18, 40, 120, 10, "t", 3)}
    ${T(W - 86, 49, "Icons", "lbl sm", "end")}${R(W - 80, 40, 24, 12, "hi", 6)}${C(W - 62, 46, 4.5, "knob")}
    ${btn(W - 50, 37, 36, "Save", "hi")}
    ${HR(18, 64, W - 18)}
    ${[
      { x: 18, w: 90, head: true },
      { x: 18, w: 110, chip: true },
      { x: 38, w: 90, chip: true },
      { x: 38, w: 100, link: true },
      { x: 18, w: 70, head: true },
      { x: 18, w: 120, chip: true },
    ].map((row, i) => {
      const y = 74 + i * 22;
      return svg`
        ${C(row.x + 4, y + 7.5, 1.3, "t")}${C(row.x + 8, y + 7.5, 1.3, "t")}${C(row.x + 4, y + 3.5, 1.3, "t")}${C(row.x + 8, y + 3.5, 1.3, "t")}${C(row.x + 4, y + 11.5, 1.3, "t")}${C(row.x + 8, y + 11.5, 1.3, "t")}
        ${row.head ? T(row.x + 18, y + 11, i ? "CURRICULUM" : "LIBRARY", "lbl sm caps") : L(row.x + 18, y + 5, row.w)}
        ${row.chip ? R(W - 92, y + 1, 52, 13, "pill", 6.5) : ""}
        ${row.link ? svg`${R(W - 92, y + 1, 52, 13, "hi-soft", 6.5)}${T(W - 66, y + 10.5, "v1.2.0", "lbl sm", "middle")}` : ""}`;
    })}
    ${btn(38, 212, 72, "+ Add page")}${btn(116, 212, 94, "+ Add existing")}${btn(216, 212, 94, "+ Add heading")}`,

  "pathways-index": () => svg`
    ${win(false)}
    ${R(18, 40, 140, 10, "t", 3)}
    ${[
      { x: 18, label: "START HERE", n: 2 },
      { x: 144, label: "BUILDS ON", n: 3 },
      { x: 270, label: "IN DEVELOPMENT", n: 1 },
    ].map(
      (col) => svg`
        ${T(col.x, 72, col.label, "lbl sm caps")}${P(`M${col.x} 78 H${col.x + 112}`, "stroke hi-line")}
        ${Array.from({ length: col.n }, (_, i) => svg`
          ${R(col.x, 86 + i * 48, 112, 40, "card", 6)}
          ${L(col.x + 10, 96 + i * 48, 70, "t-strong")}${L(col.x + 10, 108 + i * 48, 86)}
          ${R(col.x + 10, 115 + i * 48, 26, 6, "pill", 3)}`)}`,
    )}`,

  pathway: () => svg`
    ${win(false)}
    ${R(18, 40, 150, 10, "t", 3)}
    ${[0, 1, 2, 3].map((i) => svg`${R(18 + i * 92, 60, 84, 30, "card", 6)}${L(26 + i * 92, 67, 30, "t2")}${L(26 + i * 92, 78, 52, "t-strong")}`)}
    ${R(18, 104, W - 36, 120, "card", 6)}
    ${R(18.5, 104.5, W - 37, 22, "hi-soft", 5.5)}
    ${T(30, 119, "MODULE", "lbl sm caps")}
    ${["Beginner", "Intermediate", "Advanced"].map((t, i) => T(152 + i * 80, 119, t, "lbl sm"))}
    ${[0, 1, 2].map((r) => svg`
      ${HR(18.5, 126.5 + r * 32, W - 18.5)}
      ${L(30, 139 + r * 32, 80, "t-strong")}
      ${[0, 1, 2].map((c) => ((r + c) % 3 === 2 ? "" : svg`${R(152 + c * 80, 134 + r * 32, 66, 14, "pill", 7)}`))}`)}`,

  versions: () => svg`
    ${win()}
    ${navLines(44, 10)}
    ${R(126, 44, 150, 12, "t", 3)}
    ${R(126, 64, 36, 10, "pill", 5)}
    ${[0, 1, 2, 3, 4, 5].map((i) => L(126, 96 + i * 12, i % 3 === 2 ? 40 : 52))}
    ${R(186, 70, 198, 156, "pop hi-line", 10)}
    ${R(198, 82, 80, 10, "t", 3)}
    ${btn(310, 78, 62, "Publish", "hi")}
    ${[
      ["v1.2.0", true],
      ["v1.1.0", false],
      ["v1.0.0", false],
    ].map(([v, cur], i) => svg`
      ${HR(198, 108 + i * 36, 372)}
      ${T(198, 124 + i * 36, v, cur ? "lbl sm" : "muted sm")}
      ${cur ? R(238, 116 + i * 36, 34, 11, "hi-soft", 5.5) : ""}
      ${L(286, 120 + i * 36, 54, "t2")}
      ${L(198, 132 + i * 36, 140)}`)}`,

  embed: () => svg`
    ${win()}
    ${navLines(44, 10)}
    ${page(126, 44, 258, 9)}
    ${scrim()}
    ${R(100, 40, 220, 190, "pop hi-line", 10)}
    ${R(114, 54, 80, 10, "t", 3)}
    ${R(114, 72, 192, 48, "code", 6)}
    ${L(124, 82, 150, "t-code")}${L(124, 94, 170, "t-code")}${L(124, 106, 110, "t-code")}
    ${[0, 1, 2, 3].map((i) => svg`${check(114, 132 + i * 16, i !== 2)}${L(132, 134.5 + i * 16, 80 + ((i * 21) % 40))}`)}
    ${btn(248, 202, 58, "Copy", "hi")}`,

  footer: () => svg`
    ${win(false)}
    ${L(18, 42, 340)}${L(18, 54, 300)}
    ${HR(18, 76, W - 18)}
    ${C(26, 96, 8, "hi-soft")}${C(44, 96, 8, "hi-soft")}${C(62, 96, 8, "hi-soft")}${L(78, 93.5, 140)}
    ${btn(W - 158, 87, 50, "Cite")}${btn(W - 102, 87, 84, "OER Schema")}
    ${[
      ["AI use", 3],
      ["Version", 0],
      ["Used in", 0],
    ].map(([label, pills], i) => svg`
      ${HR(18, 120 + i * 36, W - 18)}
      ${T(18, 140 + i * 36, label, "muted sm")}
      ${pills
        ? Array.from({ length: pills }, (_, p) => R(110 + p * 54, 131 + i * 36, 48, 13, "pill", 6.5))
        : svg`${L(110, 135 + i * 36, i === 1 ? 120 : 170, "t")}${i === 1 ? L(240, 135 + i * 36, 48, "t-hi") : ""}`}`)}`,

  // a project page: its steps by stage, numbered; a supporting page unnumbered
  project: () => {
    const rows = [
      ["DISCOVER", [[1, 70]]],
      ["DEFINE", [[2, 96], [3, 80]]],
      ["DEVELOP", [[4, 64], [5, 88], [0, 72], [6, 92]]],
    ];
    let y = 95;
    return svg`
      ${win()}
      ${navLines(44, 10)}
      ${R(126, 40, 150, 11, "t", 3)}
      ${R(126, 58, 40, 11, "hi-soft", 5.5)}${L(172, 61, 40, "t2")}
      ${R(126, 76, 258, 156, "card hi-line", 8)}
      ${T(138, 90, "Project steps", "lbl sm")}
      ${rows.map(([stage, steps]) => {
        const out = svg`${T(138, y + 8, stage, "muted sm caps")}${steps.map(([n, w], i) => {
          const ry = y + 18 + i * 12;
          return n
            ? svg`${C(144, ry, 5, "hi-soft")}${T(144, ry + 2.5, String(n), "lbl sm", "middle")}${L(156, ry - 2.5, w, "t-hi")}`
            : svg`${R(140, ry - 4, 8, 8, "t2", 2)}${L(156, ry - 2.5, w)}`;
        })}`;
        y += 16 + steps.length * 12;
        return out;
      })}`;
  },

  // a course page: code and credits, bulletin and prerequisites, then
  // everything taught in it, grouped by type (highlighted)
  course: () => svg`
    ${win()}
    ${navLines(44, 10)}
    ${R(126, 40, 170, 11, "t", 3)}
    ${R(126, 58, 40, 11, "hi-soft", 5.5)}${R(172, 58, 48, 11, "pill", 5.5)}${R(226, 58, 34, 11, "pill", 5.5)}
    ${R(126, 76, 124, 34, "card", 6)}${L(134, 84, 40, "t2")}${L(134, 97, 90, "t-code")}
    ${R(258, 76, 126, 34, "card", 6)}${L(266, 84, 50, "t2")}${L(266, 97, 96)}
    ${R(126, 120, 258, 112, "card hi-line", 8)}
    ${T(138, 134, "Taught in this course", "lbl sm")}
    ${[
      ["LESSONS", 2],
      ["READINGS", 2],
      ["PROJECTS", 1],
    ].reduce(
      (acc, [label, n]) => {
        const y = acc.y;
        acc.out.push(svg`${T(138, y + 8, label, "muted sm caps")}${Array.from({ length: n }, (_, i) => svg`${R(138, y + 13 + i * 10, 6, 6, "t2", 1.5)}${L(150, y + 13.5 + i * 10, 80 + ((i * 23) % 50), "t-hi")}`)}`);
        acc.y += 14 + n * 10;
        return acc;
      },
      { y: 138, out: [] },
    ).out}`,

  // the viewer: a two-column window over the page, the outline beside the page being read
  viewer: () => svg`
    ${win()}
    ${navLines(44, 10)}
    ${page(126, 44, 258, 9)}
    ${scrim()}
    ${R(18, 38, 364, 194, "pop hi-line", 10)}
    ${RC(19.25, 39.25, 119.25, 191.5, [9, 0, 0, 9], "panel")}${P("M138.5 39 V231", "rule")}
    ${R(28, 50, 80, 9, "t", 3)}${L(28, 66, 96, "t2")}
    ${HR(18.5, 78, 138.5)}
    ${L(42, 88, 50)}
    ${T(28, 106, "UNIT", "muted sm caps")}
    ${C(34, 117, 5, "card")}${L(44, 114.5, 70)}
    ${R(24, 126, 108, 14, "hi-soft", 4)}${C(34, 133, 5, "card")}${L(44, 130.5, 76, "t-hi")}
    ${P("M40 144 V176", "rule")}
    ${[0, 1, 2].map((i) => L(48, 148 + i * 12, 60 + ((i * 13) % 20), "t2"))}
    ${T(28, 196, "UNIT", "muted sm caps")}
    ${C(34, 207, 5, "card")}${L(44, 204.5, 64)}
    ${L(152, 50, 110, "t2")}${btn(284, 43, 62, "Open page", "ghost")}${P("M357 48.5 l6 6 M363 48.5 l-6 6", "stroke")}
    ${HR(138.5, 66, 381.5)}
    ${page(158, 80, 200, 7)}
    ${R(158, 204, 70, 18, "card", 5)}${R(290, 204, 70, 18, "card", 5)}`,

  // Reader mode: no sidebar, a slim bar (Contents, Text, the page count with
  // arrows, Exit), the page in a narrow column, and the Text panel open
  reader: () => {
    // a segmented control: n options, one chosen (text sizes in px, optional)
    const seg = (y, labels, on, sizes = []) => {
      const w = 112 / labels.length;
      return svg`${R(82, y, 112, 14, "box", 4)}${labels.map(
        (l, i) =>
          svg`${i === on ? R(84 + i * w, y + 2, w - 4, 10, "card", 3) : ""}<text x=${82 + i * w + w / 2} y=${y + 10} class=${i === on ? "lbl sm" : "muted sm"} text-anchor="middle" style=${sizes[i] ? `font-size:${sizes[i]}px` : ""}>${l}</text>`,
      )}`;
    };
    return svg`
      ${win(false)}
      ${HR(0.5, 56, W - 0.5)}
      ${R(1, 55, 52, 2, "hi", 1)}
      ${btn(10, 33, 56, "Contents", "ghost")}${btn(72, 33, 30, "Aa")}
      ${L(146, 40, 58, "t2")}${P("M218 38.5 l-3.5 3.5 l3.5 3.5", "stroke")}${T(234, 45, "3 / 30", "muted sm", "middle")}${P("M250 38.5 l3.5 3.5 l-3.5 3.5", "stroke")}
      ${btn(332, 33, 58, "Exit", "ghost")}${P("M341 39.5 l5 5 M346 39.5 l-5 5", "stroke")}
      ${R(150, 72, 120, 10, "t", 3)}
      ${[0, 1, 2, 3, 4].map((i) => L(150, 94 + i * 11, i === 4 ? 110 : 160))}
      ${R(150, 152, 72, 7, "t", 3)}
      ${[0, 1, 2, 3, 4, 5].map((i) => L(150, 168 + i * 11, i === 5 ? 96 : 160))}
      ${R(72, 62, 132, 142, "pop hi-line", 8)}
      ${T(82, 76, "Text size", "muted sm")}${seg(80, ["A", "A", "A", "A"], 1, [6.5, 8, 9.5, 11])}
      ${T(82, 108, "Typeface", "muted sm")}${seg(112, ["Serif", "Sans"], 0)}
      ${T(82, 140, "Line width", "muted sm")}${seg(144, ["Narrow", "Medium", "Wide"], 1)}
      ${T(82, 172, "Page", "muted sm")}
      ${R(82, 176, 36, 16, "card", 4)}${R(120, 176, 36, 16, "box", 4)}${R(158, 176, 36, 16, "t-strong", 4)}
      ${R(119, 175, 38, 18, "ghost hi-line", 5)}`;
  },
};

export const SCHEMATICS = Object.keys(PRESETS);

export class OerSchematic extends LitElement {
  static get tag() {
    return "oer-schematic";
  }

  static get properties() {
    return {
      preset: { type: String, reflect: true },
      alt: { type: String, reflect: true },
      caption: { type: String, reflect: true },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin: 1.75rem 0;
      }
      /* as wide as the drawing, so the caption lines up under it */
      figure {
        max-width: 28rem;
        margin: 0 auto;
      }
      /* the window outline sets the drawing apart; no panel behind it */
      .frame {
        padding: 0.25rem 0;
      }
      svg {
        display: block;
        width: 100%;
        max-width: 28rem;
        height: auto;
        margin: 0 auto;
        overflow: visible;
      }
      figcaption {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        line-height: 1.5;
        color: var(--muted-foreground, #555);
      }
      .missing {
        padding: 1rem;
        font-size: 0.875rem;
        color: var(--muted-foreground, #555);
      }

      /* drawing */
      .win {
        fill: var(--background, #fff);
        stroke: var(--border, #e5e5e5);
      }
      .panel {
        fill: color-mix(in oklch, var(--muted, #f4f4f5) 60%, var(--background, #fff));
      }
      .card,
      .pop {
        fill: var(--background, #fff);
        stroke: var(--border, #e5e5e5);
      }
      .pop {
        filter: drop-shadow(0 2px 6px color-mix(in oklch, var(--foreground, #000) 12%, transparent));
      }
      .rule,
      .stroke {
        fill: none;
        stroke: var(--border, #e5e5e5);
        stroke-width: 1;
      }
      .stroke {
        stroke: color-mix(in oklch, var(--muted-foreground, #666) 50%, var(--background, #fff));
        stroke-width: 1.5;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .t {
        fill: light-dark(color-mix(in oklch, var(--muted-foreground, #666) 38%, var(--background, #fff)), color-mix(in oklch, var(--muted-foreground, #666) 58%, var(--background, #fff)));
      }
      .t2,
      .pill {
        fill: light-dark(color-mix(in oklch, var(--muted-foreground, #666) 20%, var(--background, #fff)), color-mix(in oklch, var(--muted-foreground, #666) 34%, var(--background, #fff)));
      }
      .t-strong {
        fill: light-dark(color-mix(in oklch, var(--muted-foreground, #666) 65%, var(--background, #fff)), color-mix(in oklch, var(--muted-foreground, #666) 80%, var(--background, #fff)));
      }
      .box {
        fill: light-dark(color-mix(in oklch, var(--muted-foreground, #666) 12%, var(--background, #fff)), color-mix(in oklch, var(--muted-foreground, #666) 22%, var(--background, #fff)));
      }
      .knob {
        fill: var(--background, #fff);
      }
      .scrim {
        fill: var(--foreground, #000);
        opacity: 0.12;
      }
      .code {
        fill: color-mix(in oklch, var(--muted, #f4f4f5) 80%, var(--background, #fff));
        stroke: var(--border, #e5e5e5);
      }
      .t-code {
        fill: light-dark(color-mix(in oklch, var(--muted-foreground, #666) 50%, var(--background, #fff)), color-mix(in oklch, var(--muted-foreground, #666) 65%, var(--background, #fff)));
      }
      .ghost {
        fill: transparent;
        stroke: var(--border, #e5e5e5);
      }
      /* the feature being explained */
      .hi {
        fill: var(--primary);
      }
      .hi-o {
        fill: var(--background, #fff);
        stroke: var(--primary);
        stroke-width: 1.5;
      }
      .hi-soft {
        fill: color-mix(in srgb, var(--primary) 14%, var(--background, #fff));
      }
      .t-hi {
        fill: var(--primary);
      }
      .hi-line {
        stroke: var(--primary);
        stroke-width: 1.5;
      }
      .dash {
        stroke-dasharray: 4 3;
      }
      .tick {
        fill: none;
        stroke: var(--primary-foreground, #fff);
        stroke-width: 1.6;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      text {
        font-family: var(--font-sans, system-ui, sans-serif);
        font-size: 9.5px;
        font-weight: 600;
      }
      .lbl {
        fill: var(--primary);
      }
      .lbl.on {
        fill: var(--primary-foreground, #fff);
      }
      .ghost + .lbl {
        fill: var(--muted-foreground, #555);
      }
      .muted,
      .sep {
        fill: var(--muted-foreground, #555);
      }
      .sep {
        font-weight: 400;
      }
      .sm {
        font-size: 8px;
      }
      .caps {
        letter-spacing: 0.06em;
      }
    `;
  }

  render() {
    const draw = PRESETS[this.preset];
    return html`<figure>
      <div class="frame">
        ${draw
          ? html`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label=${this.alt || this.caption || "Interface diagram"}>${draw()}</svg>`
          : html`<div class="missing">Choose a diagram in the block settings.</div>`}
      </div>
      ${this.caption ? html`<figcaption>${this.caption}</figcaption>` : ""}
    </figure>`;
  }

  static get haxProperties() {
    return {
      canScale: false,
      canEditSource: true,
      gizmo: {
        title: "Interface diagram",
        description: "A simplified drawing of part of the site, with one feature highlighted, for documentation.",
        icon: "image:image",
        color: "blue",
        tags: ["Media", "diagram", "schematic", "documentation", "help"],
        meta: { author: "Michael Collins" },
      },
      settings: {
        configure: [
          { property: "preset", title: "Diagram", inputMethod: "select", options: Object.fromEntries(SCHEMATICS.map((k) => [k, k.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase())])) },
          { property: "alt", title: "Description", description: "What the diagram shows, for screen readers.", inputMethod: "textarea" },
          { property: "caption", title: "Caption", inputMethod: "textarea" },
        ],
        advanced: [],
      },
      demoSchema: [{ tag: "oer-schematic", properties: { preset: "sidebar", alt: "The sidebar", caption: "The sidebar" }, content: "" }],
    };
  }
}

if (!customElements.get(OerSchematic.tag)) customElements.define(OerSchematic.tag, OerSchematic);
registerBlocks(OerSchematic);
