/**
 * Saves of the site's outline made while a page is being edited (Page
 * details, Style, a course site callout's button; outline/outline-model.js
 * saveOutline) keep what's typed (nu-hax docs/editor-spikes/lifecycle.md
 * S6, change 5). After each, HAX reloads the site and the page, and its
 * site editor imports the reloaded page into hax-body: the editor emptied
 * and filled again with the page as it was last saved, so whatever was
 * typed since was gone, the status read "No changes" and Undo had one more
 * step. While such a save and HAX's reload after it run, its imports into
 * hax-body are held (dropped), and the page being edited stays as it is.
 *
 * saveOutline sends `oer-outline-save` { done }, a promise that settles
 * once HAXcms has saved and the manifest has reloaded. The hold lasts until
 * then and until HAX has gone 1.5 s without trying to import again (at
 * most 10 s more), or until editing ends. The page's details that HAX
 * writes back with the page (its page-break) are made current as the page
 * saves (custom-oer-docs-theme.js __beforeSave).
 *
 *   installImportHold()   // from installEditorChrome (editor/index.js)
 */

const activeBody = () => globalThis.HaxStore?.requestAvailability?.()?.activeHaxBody ?? null;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// how long HAX goes without importing before its reload counts as done,
// and the longest a hold lasts after the save
const QUIET = 1500;
const MOST = 10000;

let holds = 0;
// while holding: hax-body, its own importContent and when HAX last tried it
let held = null;

/** Hold HAX's imports into hax-body (while it's being edited); returns release(). */
export function holdImports() {
  const body = activeBody();
  if (!body?.editMode) return () => {};
  if (!held) {
    const own = Object.prototype.hasOwnProperty.call(body, "importContent");
    const importContent = body.importContent;
    held = { body, own, importContent, tried: performance.now() };
    body.importContent = function (...args) {
      // (editing has ended: HAX's imports are its own again)
      if (!this.editMode) return importContent.apply(this, args);
      held.tried = performance.now();
      return undefined;
    };
  }
  holds++;
  // (a hold that editing's end let go of already counts for nothing)
  const of = held;
  let done = false;
  return () => {
    if (done || held !== of) return;
    done = true;
    holds--;
    if (!holds) letGo();
  };
}

function letGo() {
  if (!held) return;
  const { body, own, importContent } = held;
  if (own) body.importContent = importContent;
  else delete body.importContent;
  held = null;
  holds = 0;
}

// an outline save while editing: held until it's saved and HAX has reloaded
async function onOutlineSave(e) {
  const release = holdImports();
  try {
    await e.detail?.done;
  } catch {
    // (a failed save: nothing to reload)
  }
  const saved = performance.now();
  while (held && performance.now() - saved < MOST && performance.now() - Math.max(saved, held.tried) < QUIET) await sleep(100);
  release();
}

let installed = false;
export function installImportHold() {
  if (installed) return;
  installed = true;
  globalThis.addEventListener("oer-outline-save", onOutlineSave);
  // nothing is held once editing ends
  globalThis.addEventListener("haxcms-edit-mode-changed", (e) => !e.detail && letGo());
}
