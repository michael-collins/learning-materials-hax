/**
 * A course site's style (page metadata `oerSiteStyle`): a colour scheme or
 * a custom accent, and a typeface pairing. The theme turns it into CSS
 * custom properties on the course site's frame (`siteStyleVars`), so the
 * microsite and its section blocks pick it up while reading and editing.
 *
 * Every scheme passes WCAG AA in light and dark mode: white text on the
 * accent and the accent as text on the page and on cards (light), dark text
 * on the accent and the accent as text (dark); the lowest is 4.9:1. A
 * custom accent is moved lighter or darker until it passes too (`accentPair`).
 */

// [light, dark] accents as oklch [L, C, h]; studio is the site's own blue
export const SCHEMES = [
  { id: "studio", label: "Studio", hint: "The site's blue", light: [0.53, 0.14, 245], dark: [0.72, 0.14, 245] },
  { id: "kiln", label: "Kiln", hint: "Terracotta", light: [0.52, 0.15, 38], dark: [0.74, 0.13, 42] },
  { id: "moss", label: "Moss", hint: "Green", light: [0.49, 0.11, 150], dark: [0.76, 0.13, 150] },
  { id: "violet", label: "Violet", hint: "Purple", light: [0.5, 0.18, 292], dark: [0.76, 0.12, 292] },
  { id: "ocean", label: "Ocean", hint: "Teal", light: [0.5, 0.09, 205], dark: [0.77, 0.1, 205] },
  { id: "graphite", label: "Graphite", hint: "Black and white", light: [0.33, 0.01, 260], dark: [0.88, 0.006, 260] },
];

// display (titles) and body typefaces, from Google Fonts like the site's own
export const FONT_PAIRS = [
  { id: "inter", label: "Inter", hint: "Clean, like the rest of the site", display: "", body: "", weight: 700, css: "" },
  { id: "fraunces", label: "Fraunces and Inter", hint: "Editorial serif titles", display: '"Fraunces", Georgia, serif', body: "", weight: 650, css: "family=Fraunces:opsz,wght@9..144,500..700" },
  { id: "space", label: "Space Grotesk and Inter", hint: "Technical, studio", display: '"Space Grotesk", var(--font-sans)', body: "", weight: 700, css: "family=Space+Grotesk:wght@500..700" },
  { id: "syne", label: "Syne and Inter", hint: "Bold and graphic", display: '"Syne", var(--font-sans)', body: "", weight: 700, css: "family=Syne:wght@600..800" },
  { id: "instrument", label: "Instrument Serif and Inter", hint: "Elegant display serif", display: '"Instrument Serif", Georgia, serif', body: "", weight: 400, css: "family=Instrument+Serif" },
  { id: "plex", label: "IBM Plex Sans", hint: "Engineered, throughout", display: '"IBM Plex Sans", var(--font-sans)', body: '"IBM Plex Sans", var(--font-sans)', weight: 700, css: "family=IBM+Plex+Sans:wght@400..700" },
];

/* ---------- colour ---------- */

const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const gam = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

function oklchToRgb([L, C, h]) {
  const a = C * Math.cos((h * Math.PI) / 180);
  const b = C * Math.sin((h * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s].map((c) =>
    Math.min(1, Math.max(0, gam(Math.max(0, c)))),
  );
}

function rgbToOklch(rgb) {
  const [r, g, b] = rgb.map(lin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [L, Math.hypot(A, B), ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360];
}

const luminance = (rgb) => {
  const [r, g, b] = rgb.map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const contrast = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

// the surfaces an accent has to read against (tokens/shadcn-tokens.js)
const WHITE = [1, 1, 1];
const CARD = [0xf7, 0xf8, 0xf8].map((v) => v / 255);
const DARK_BG = oklchToRgb([0.18, 0.006, 270]);
const DARK_CARD = [0x17, 0x18, 0x1c].map((v) => v / 255);
const DARK_FG = oklchToRgb([0.1884, 0.0128, 248.5]);
const AA = 4.6; // a little over 4.5, for rounding

const hexToRgb = (hex) => {
  const m = String(hex || "").trim().match(/^#?([0-9a-f]{6})$/i);
  return m ? [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16) / 255) : null;
};

/**
 * Light and dark accents from a colour someone picked ("#c0392b"): the
 * same hue, made dark enough for white text and text on white (light) and
 * light enough for dark text and text on dark (dark). Null if it isn't a colour.
 */
export function accentPair(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const [L0, C0, h] = rgbToOklch(rgb);
  let light = [Math.min(L0, 0.55), Math.min(C0, 0.17), h];
  while (light[0] > 0.2 && Math.min(contrast(WHITE, oklchToRgb(light)), contrast(oklchToRgb(light), CARD)) < AA) light = [light[0] - 0.01, light[1], h];
  let dark = [Math.max(L0, 0.72), Math.min(C0, 0.14), h];
  while (dark[0] < 0.97 && Math.min(contrast(DARK_FG, oklchToRgb(dark)), contrast(oklchToRgb(dark), DARK_BG), contrast(oklchToRgb(dark), DARK_CARD)) < AA) dark = [dark[0] + 0.01, dark[1], h];
  return { light, dark };
}

const css = ([L, C, h]) => `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${h.toFixed(1)})`;

/** The accent pair a style uses: its custom colour, else its scheme; null for the site's own. */
export function styleAccent(style) {
  if (style?.accent) return accentPair(style.accent);
  const scheme = SCHEMES.find((s) => s.id === style?.scheme);
  return scheme && scheme.id !== "studio" ? { light: scheme.light, dark: scheme.dark } : null;
}

/** CSS custom properties for a style, as a style attribute's text ("" for the site's own look). */
export function siteStyleVars(style) {
  const out = [];
  const accent = styleAccent(style);
  if (accent) {
    const pair = `light-dark(${css(accent.light)}, ${css(accent.dark)})`;
    out.push(`--primary: ${pair}`, `--link: ${pair}`, `--ring: ${pair}`, "--primary-foreground: light-dark(oklch(1 0 0), oklch(0.1884 0.0128 248.5))");
  }
  const fonts = FONT_PAIRS.find((f) => f.id === style?.fonts);
  if (fonts?.display) out.push(`--cs-font-display: ${fonts.display}`, `--cs-display-weight: ${fonts.weight}`);
  if (fonts?.body) out.push(`--cs-font-body: ${fonts.body}`);
  return out.join("; ");
}

/** Load a style's typefaces (once each), as the theme loads Inter. */
export function loadSiteFonts(style) {
  const fonts = FONT_PAIRS.find((f) => f.id === style?.fonts);
  if (!fonts?.css) return;
  const id = `oer-cs-font-${fonts.id}`;
  const doc = globalThis.document;
  if (doc.getElementById(id)) return;
  const link = doc.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?${fonts.css}&display=swap`;
  doc.head.appendChild(link);
}

/** Every pairing's typefaces, for the Style panel's previews. */
export const loadAllSiteFonts = () => FONT_PAIRS.forEach((f) => loadSiteFonts({ fonts: f.id }));
