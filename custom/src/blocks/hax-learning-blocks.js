/**
 * HAX question types that HAX ships but this site's block catalogue leaves
 * out: true/false, fill in the blanks, matching, sorting and tagging. When
 * the editor's catalogue loads, load each element and hand HAX its own
 * haxProperties (lib/<tag>.haxProperties.json), so they can be inserted
 * like any other block. Content that already uses them renders anywhere,
 * since HAX autoloads elements found in a page.
 */
const MODULES = {
  "true-false-question": "multiple-choice/lib/true-false-question.js",
  "fill-in-the-blanks": "fill-in-the-blanks/fill-in-the-blanks.js",
  "matching-question": "matching-question/matching-question.js",
  "sorting-question": "sorting-question/sorting-question.js",
  "tagging-question": "tagging-question/tagging-question.js",
};

const base = () => globalThis.WCGlobalBasePath || new URL("build/es6/node_modules/", globalThis.document.baseURI).href;

async function register(hax) {
  for (const [tag, path] of Object.entries(MODULES)) {
    if (hax.elementList?.[tag]) continue;
    try {
      await import(`${base()}@haxtheweb/${path}`);
      let props = customElements.get(tag)?.haxProperties;
      if (typeof props === "string") props = await fetch(new URL(props, globalThis.document.baseURI)).then((r) => (r.ok ? r.json() : null));
      if (props) hax.setHaxProperties(props, tag);
    } catch (err) {
      console.warn(`[oer] could not add ${tag} to the block list`, err);
    }
  }
}

let started = false;
function tryRegister() {
  const hax = globalThis.HaxStore?.requestAvailability?.();
  if (!hax || !hax.appStoreLoaded || started) return !!started;
  started = true;
  register(hax);
  return true;
}

globalThis.addEventListener("hax-store-app-store-loaded", () => setTimeout(tryRegister, 0));
const poll = setInterval(() => tryRegister() && clearInterval(poll), 1500);
