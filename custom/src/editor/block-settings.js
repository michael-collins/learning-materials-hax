/**
 * Block settings, curated: what a block's settings form (HAX's tray, shown
 * in oer-settings-dialog) offers, in plain words, on every page (nu-hax
 * docs/editor-redesign/spec.md §6.3).
 *
 * HAX builds each form from the block's registration in
 * HAXStore.elementList, which DDD fills out later with its style groups
 * (Style Guide, Colors, Font, Spacing, Box appearance) and HAX with
 * Developer, Schema and Lock fields: about 25 fields for an image, and
 * alignment and colours readers never see. The form is cut down as it's
 * built instead (hax-fixes.js curateSettingsForms), so it holds whatever
 * registered the block, however late:
 *
 * - A block listed in SETTINGS keeps those fields, in that order, with the
 *   words given: an image keeps its description, caption, size and
 *   position; a paragraph nothing (text is styled by the site, not
 *   block by block).
 * - Any other block keeps its own Configure fields, without DDD's groups or
 *   the lock (the rail has Lock content), in sentence case, a field for
 *   alternative text called Description. Advanced and Developer go.
 *
 * Nothing here changes what it's given: HAX shares the form's arrays and
 * fields with HAXStore.elementList, so curate() makes new ones.
 *
 *   curate("media-image", settings)  // { configure: [...], advanced: [], developer: [] }
 *   hasSettings(el)                  // whether the Block settings button shows
 *   settingsTitle(el)                // "Image settings"
 */
import { labelOf } from "./policy.js";

const NONE = { fields: [] };

// an image's size and position: DDD's attributes (data-width,
// data-float-position), which its styles draw in both views; defined here
// in full, so the fields are there before DDD has added its own
const SIZE = {
  attribute: "data-width",
  title: "Size",
  description: "Its width in the column.",
  inputMethod: "select",
  options: { "": "Full width", 75: "Three quarters", 50: "Half", 25: "A quarter" },
};
// (not DDD's Center: nothing draws it, so it looked just like Default)
const POSITION = {
  attribute: "data-float-position",
  title: "Position",
  description: "On the left or right, text wraps round it on wide screens.",
  inputMethod: "select",
  options: { "": "Default", left: "Left", right: "Right" },
};
// (a text field: HAX's own alt field marks itself required)
const DESCRIPTION = { title: "Description", description: "What it shows, for people who can't see it.", inputMethod: "textfield", required: false };

/**
 * Per tag: the fields kept (`from` names a field by its property,
 * attribute or slot, anywhere in the block's form; `field` is a whole
 * field of ours), with new words; `title` is the dialog's.
 */
export const SETTINGS = {
  // typed on the page and styled by the site
  ...Object.fromEntries(["p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "blockquote", "pre", "code", "dl", "dt", "dd", "div", "span", "hr"].map((tag) => [tag, NONE])),
  // Page details has these
  "page-break": NONE,
  "media-image": {
    title: "Image settings",
    fields: [{ from: "alt", ...DESCRIPTION }, { from: "caption", title: "Caption", description: "Shown under the image." }, { field: SIZE }, { field: POSITION }],
  },
  img: {
    title: "Image settings",
    fields: [{ from: "alt", ...DESCRIPTION }, { field: SIZE }, { field: POSITION }],
  },
  "grid-plate": {
    title: "Column settings",
    fields: [
      {
        from: "disableResponsive",
        title: "Keep columns side by side on phones",
        description: "Keeps their widths down to 600 pixels wide; narrower screens still stack them.",
      },
    ],
  },
  "video-player": {
    title: "Video settings",
    fields: [
      { from: "source", title: "Video address" },
      { from: "mediaTitle", title: "Title" },
      { from: "thumbnailSrc", title: "Poster image", description: "Shown before it plays." },
      { from: "tracks", title: "Captions and subtitles" },
    ],
  },
  "self-check": {
    title: "Self check settings",
    fields: [
      { from: "title", title: "Title" },
      { from: "question", title: "Question" },
      { from: "", title: "Answer" },
      { from: "image", title: "Image" },
      { from: "alt", ...DESCRIPTION, title: "Image description" },
      { from: "accentColor", title: "Colour" },
    ],
  },
};

const isLock = (f) => (f.property || f.attribute) === "data-hax-lock";
// DDD's groups: a collapse of style groups (ddd-styles), and the design
// attributes it puts at the top of some forms (a list's bullet style)
const isDDD = (f) => /^ddd-/.test(f.property || "") || /^data-(design-treatment|instructional-action|accent|primary|style-guide)$/.test(f.attribute || f.property || "");

// sentence case, keeping words in capitals (URL, QR)
const sentence = (title) =>
  typeof title !== "string"
    ? title
    : title
        .split(" ")
        .map((w, i) => (i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : /^[A-Z][a-z]+$/.test(w) ? w.toLowerCase() : w))
        .join(" ");

/** Every field of a form, its groups' fields included. */
function* everyField(settings) {
  const walk = function* (fields) {
    for (const f of fields || []) {
      if (!f || typeof f !== "object") continue;
      yield f;
      // a group (DDD's collapse and its style groups), not a list field's items
      if (Array.isArray(f.properties) && f.inputMethod !== "array") yield* walk(f.properties);
    }
  };
  for (const key of ["configure", "advanced", "developer"]) yield* walk(settings?.[key]);
}

const keyOf = (f) => f.property ?? f.attribute ?? f.slot;

// a field by its property, attribute or slot ("" for the unnamed slot)
function find(settings, from) {
  for (const f of everyField(settings)) {
    if (Array.isArray(f.properties) && f.inputMethod !== "array") continue;
    if (f.property === from || f.attribute === from || (f.slot === from && !f.property)) return f;
  }
  return null;
}

// a field of the form, copied: what HAX writes on it (its property) goes on
// the copy; for an attribute, the property is the attribute, as HAX makes it
function copy(f, words = {}) {
  const out = { ...f, ...words };
  if (out.attribute && !out.property) out.property = out.attribute;
  return out;
}

/**
 * The curated form for a tag, from its settings (HAX's form, or
 * elementList's entry): new arrays of new fields, Configure only.
 */
export function curate(tag, settings) {
  const list = SETTINGS[tag];
  let configure;
  if (list) {
    configure = [];
    for (const { from, field, ...words } of list.fields) {
      const found = field ? null : find(settings, from);
      if (field) configure.push(copy(field));
      else if (found) configure.push(copy(found, words));
    }
  } else {
    configure = (settings?.configure || [])
      .filter((f) => f && !isDDD(f) && !isLock(f))
      .map((f) => copy(f, f.inputMethod === "alt" ? DESCRIPTION : { title: sentence(f.title) }));
  }
  return { configure, advanced: [], developer: [] };
}

const haxStore = () => globalThis.HaxStore?.requestAvailability?.() ?? null;

// the fields HAX shows for a block of this type: a layout's form leaves out
// its slots (they're its columns), as HAX's tray does (hax-tray.js 1653)
function shown(entry, fields) {
  if (entry?.type !== "grid") return fields;
  return fields.filter((f) => f.slot !== "" && !f.slot && f.attribute !== "slot");
}

/**
 * The block's settings fields as its form shows them (none when it's
 * locked: HAX switches a locked block's form off).
 */
export function settingsFields(el) {
  const tag = el?.localName;
  const entry = tag && haxStore()?.elementList?.[tag];
  if (!entry || el.closest?.("[data-hax-lock]") || el.parentElement?.closest?.("[data-hax-lock]")) return [];
  return shown(entry, curate(tag, entry.settings).configure);
}

/** Whether a block has any settings to show: the Block settings button shows only then. */
export const hasSettings = (el) => settingsFields(el).length > 0;

/** What the settings dialog is called for a block: "Image settings", "True / false question settings". */
export const settingsTitle = (el) => SETTINGS[el?.localName]?.title || `${sentence(labelOf(el) || "Block")} settings`;

/**
 * The values to fill the curated form in with: each field's, from the
 * block (properties, the values HAX read off it) or, for a slot, the value
 * HAX already found (value, the form's value as HAX built it).
 */
export function curatedValue(fields, properties = {}, value = {}) {
  const found = (key) => {
    for (const container of Object.values(value?.settings || {})) {
      const stack = [container];
      while (stack.length) {
        const v = stack.pop();
        if (!v || typeof v !== "object") continue;
        if (Object.hasOwn(v, key)) return v[key];
        stack.push(...Object.values(v));
      }
    }
    return undefined;
  };
  const configure = {};
  for (const f of fields) {
    const key = keyOf(f);
    if (key === undefined) continue;
    const v = key !== "" && Object.hasOwn(properties, key) ? properties[key] : found(key);
    if (v !== undefined) configure[key] = v;
  }
  return { settings: { configure, advanced: {}, developer: {} } };
}
