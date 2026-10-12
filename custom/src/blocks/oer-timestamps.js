/**
 * Timestamps that play a video from a moment: HAX's own `page-anchor`
 * (an inline element; HAX's Insert inline menu adds one, and nu-hax
 * scripts/video-page.mjs writes "[1:30]" as one) pointed at a video by id:
 *
 *   <page-anchor target="#video-abc" value="90">1:30</page-anchor>
 *
 * Stock page-anchor only plays HAX's video-player and audio-player, and
 * draws a <mark> that the keyboard can't reach. installTimestamps() makes
 * the mark a button (Tab, Enter, Space) named "Play from 1:30" and plays
 * any target with a seek() method too (oer-video). timestampSkin draws it
 * as a chip with a play icon. Same saved HTML as stock HAX.
 */
import { css, unsafeCSS } from "../lit.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";

const play = unsafeCSS(`url("${LUCIDE_ICONS["oer:play"]}")`);

export const timestampSkin = {
  "page-anchor": css`
    :host {
      display: inline !important;
    }
    mark {
      display: inline-flex;
      align-items: center;
      gap: 0.25em;
      padding: 0 0.375em;
      border-radius: var(--radius-sm);
      background: var(--muted);
      color: var(--foreground);
      font-family: var(--font-sans);
      font-size: 0.875em;
      font-weight: 500;
      font-variant-numeric: tabular-nums;
      line-height: 1.5;
      white-space: nowrap;
      cursor: pointer;
    }
    mark[aria-label]::before {
      content: "";
      width: 0.75em;
      height: 0.75em;
      background: currentColor;
      mask: ${play} center / contain no-repeat;
    }
    mark:hover {
      background: var(--accent);
    }
    mark:focus-visible {
      outline: 2px solid var(--ring);
      outline-offset: 2px;
    }
    simple-icon-lite {
      display: none;
    }
  `,
};

// HAX doesn't always tell page-anchor it's being edited (_haxState stays
// unset), but the editor's copy of the page is inside hax-body
const isEditing = (anchor) => !!anchor._haxState || !!anchor.closest("hax-body");

function wire(anchor) {
  const mark = anchor.shadowRoot?.querySelector("mark");
  if (!mark) return;
  // a value is a moment in a video or audio; without one it's a plain jump
  const value = anchor.getAttribute("value");
  if (value) mark.setAttribute("aria-label", `Play from ${anchor.textContent.trim() || value}`);
  else mark.removeAttribute("aria-label");
  mark.setAttribute("role", "button");
  mark.tabIndex = isEditing(anchor) ? -1 : 0;
  if (mark.__oerKeys) return;
  mark.__oerKeys = true;
  mark.addEventListener("keydown", (e) => {
    if (isEditing(anchor) || (e.key !== "Enter" && e.key !== " ")) return;
    e.preventDefault();
    mark.click();
  });
}

// page-anchor scrolls to its target, then plays only video-player,
// audio-player and play-list; this plays the rest
function onClick(e) {
  const anchor = e.composedPath().find((n) => n.tagName === "PAGE-ANCHOR");
  if (!anchor || isEditing(anchor)) return;
  let target = null;
  try {
    target = globalThis.document.querySelector(anchor.getAttribute("target") || "");
  } catch {}
  if (!target || typeof target.seek !== "function" || ["VIDEO-PLAYER", "AUDIO-PLAYER"].includes(target.tagName)) return;
  target.seek(parseInt(anchor.getAttribute("value") || "0", 10));
}

let installed = false;
export function installTimestamps() {
  if (installed) return;
  installed = true;
  globalThis.document.addEventListener("click", onClick);
  const patch = () => {
    const cls = customElements.get("page-anchor");
    for (const name of ["updated", "haxeditModeChanged"]) {
      const own = cls.prototype[name];
      cls.prototype[name] = function (...a) {
        const r = own?.apply(this, a);
        if (name === "updated") wire(this);
        else this.updateComplete.then(() => wire(this));
        return r;
      };
    }
    globalThis.document.querySelectorAll("page-anchor").forEach(wire);
  };
  if (customElements.get("page-anchor")) patch();
  else customElements.whenDefined("page-anchor").then(patch);
}
