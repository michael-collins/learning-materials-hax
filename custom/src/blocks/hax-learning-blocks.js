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

/*
 * Keep question answers through a save. HAX question elements mark a right
 * answer as <input correct>, but HAXcms's storage sanitizer (DOMPurify) drops
 * unknown attributes on standard elements like <input>, so every page save
 * deleted the answers. data-* attributes survive it, so answers are saved as
 * both correct and data-correct, and data-correct counts as correct when a
 * question loads. Runs under any theme, since content must load everywhere.
 */
function patchQuestionElement(QE) {
  if (!QE || QE.prototype.__oerCorrect) return;
  QE.prototype.__oerCorrect = true;
  const processInput = QE.prototype.processInput;
  if (processInput) {
    QE.prototype.processInput = function (i, inputs, ...rest) {
      const out = processInput.call(this, i, inputs, ...rest);
      const input = inputs?.[i];
      if (out && input?.hasAttribute?.("data-correct")) out.correct = true;
      return out;
    };
  }
  const pre = QE.prototype.haxpreProcessNodeToContent;
  if (pre) {
    QE.prototype.haxpreProcessNodeToContent = async function (node, ...rest) {
      const out = await pre.call(this, node, ...rest);
      for (const root of new Set([this, node, out].filter((n) => n?.querySelectorAll))) {
        root.querySelectorAll("input[correct]").forEach((input) => input.setAttribute("data-correct", "true"));
      }
      return out;
    };
  }
}

// QuestionElement isn't exported on its own: find it from any question tag
for (const tag of ["multiple-choice", "true-false-question", "fill-in-the-blanks", "matching-question", "sorting-question", "tagging-question"]) {
  customElements.whenDefined(tag).then(() => {
    let cls = customElements.get(tag);
    while (cls && cls !== HTMLElement && cls.name !== "QuestionElement") cls = Object.getPrototypeOf(cls);
    if (cls?.name === "QuestionElement") patchQuestionElement(cls);
  });
}
