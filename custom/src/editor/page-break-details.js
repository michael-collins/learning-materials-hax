/**
 * page-break's edit-mode strip opens our Page details dialog instead of
 * selecting the page-break, whose stock settings form duplicates it and
 * shows our `oer:` page types as blank (saving that field could clear a
 * page's type). The strip reads "Page details".
 *
 * While the page is being edited, the page-break's attributes are what the
 * next content save writes back to the page, so after Page details saves we
 * copy the new type and description onto it.
 */
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { pageDetails } from "../types/oer-page-details.js";

const LABEL = "Page details";

const pageBreakIn = (e) => e.composedPath().find((n) => n?.localName === "page-break" && n.closest?.("hax-body"));

function relabel(pb) {
  if (pb.t && pb.t.selectToEditPageDetails !== LABEL) {
    pb.t = { ...pb.t, selectToEditPageDetails: LABEL };
  }
}

function open(pb) {
  const id = pb.getAttribute("item-id") || store.activeId;
  pageDetails().show(id, {
    onSaved: ({ pageType, description }) => {
      if (!pb.isConnected) return;
      if (pageType) pb.setAttribute("page-type", pageType);
      else pb.removeAttribute("page-type");
      pb.setAttribute("description", description || "");
      if ("pageType" in pb) pb.pageType = pageType || null;
      if ("description" in pb) pb.description = description || "";
    },
  });
}

let installed = false;
export function installPageBreakDetails() {
  if (installed) return;
  installed = true;
  const win = globalThis;
  // keep HAX from selecting the page-break (that opens its stock form)
  const swallow = (e) => {
    if (!store.editMode) return;
    const pb = pageBreakIn(e);
    if (!pb) return;
    relabel(pb);
    e.preventDefault();
    e.stopImmediatePropagation();
  };
  for (const type of ["pointerdown", "mousedown"]) win.addEventListener(type, swallow, true);
  win.addEventListener(
    "click",
    (e) => {
      if (!store.editMode) return;
      const pb = pageBreakIn(e);
      if (!pb) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      open(pb);
    },
    true,
  );
  win.addEventListener(
    "keydown",
    (e) => {
      if (!store.editMode || (e.key !== "Enter" && e.key !== " ")) return;
      const pb = pageBreakIn(e);
      if (!pb) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      open(pb);
    },
    true,
  );
  // relabel when editing starts (hax-body lives in a shadow root, so it is
  // found through HAX's store; it fills in shortly after edit mode turns on)
  const relabelAll = () => {
    const body = globalThis.HaxStore?.requestAvailability?.()?.activeHaxBody;
    body?.querySelectorAll?.("page-break").forEach(relabel);
  };
  autorun(() => {
    if (!store.editMode) return;
    for (const ms of [0, 300, 1000, 2500]) setTimeout(relabelAll, ms);
  });
}
