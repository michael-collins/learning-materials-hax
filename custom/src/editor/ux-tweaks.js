/**
 * Behavioural changes to stock HAX editor elements, aimed at perceivability:
 * nothing important hidden behind overflow menus, sensible panels open by
 * default. Each tweak patches one element class once it is defined.
 */
import { LUCIDE_ICONS } from "./lucide-icons.generated.js";

function onDefined(tag, fn) {
  customElements.whenDefined(tag).then(() => fn(customElements.get(tag)));
}

export function installUxTweaks() {
  // Text formatting toolbar: stock collapses every formatting control into a
  // "more" (⋮) button. SimpleToolbar supports alwaysExpanded; force it on at
  // the class level (instances are created lazily inside hax-body, so
  // patching individual elements races their creation).
  // hax-toolbar also hides "Update HTML" in the Source panel this way.
  for (const tag of ["hax-text-editor-toolbar", "rich-text-editor-toolbar", "hax-toolbar"]) {
    onDefined(tag, (Cls) => {
      const proto = Cls.prototype;
      if (proto.__oerExpanded) return;
      Object.defineProperty(proto, "alwaysExpanded", {
        get: () => true,
        set: () => {},
        configurable: true,
      });
      const updated = proto.updated;
      proto.updated = function (changed) {
        updated?.call(this, changed);
        if (this.collapsed) this.collapsed = false;
      };
      proto.__oerExpanded = true;
    });
  }

  // Insert panel: the block filter has a label but no placeholder hint.
  onDefined("hax-gizmo-browser", (Cls) => {
    const proto = Cls.prototype;
    const updated = proto.updated;
    proto.updated = function (changed) {
      updated?.call(this, changed);
      const f = this.shadowRoot?.querySelector("#inputfilter");
      if (f && !f.placeholder) f.placeholder = "Search blocks…";
    };
  });

  // Source panel: its actions are icon-only; show their text labels.
  onDefined("hax-view-source", (Cls) => {
    const proto = Cls.prototype;
    const updated = proto.updated;
    proto.updated = function (changed) {
      updated?.call(this, changed);
      for (const b of this.shadowRoot?.querySelectorAll("hax-tray-button") ?? []) {
        if (!b.showTextLabel) b.showTextLabel = true;
        b.setAttribute("data-oer-labelled", "");
      }
    };
  });
}

/**
 * Tray (the editor side panel) enhancements:
 * - Stock header has no close control, only an arrow that moves the panel to
 *   the other side of the screen. Add explicit "Switch side" and "Close
 *   panel" buttons (the stock arrow is hidden by the skin).
 * - Block settings open with every section collapsed; expand "Configure",
 *   which holds the block's main options, whenever a new block's form renders.
 */
function iconSpan(name) {
  const span = globalThis.document.createElement("span");
  span.className = "oer-icon";
  span.setAttribute("aria-hidden", "true");
  span.style.setProperty("--src", `url("${LUCIDE_ICONS[name]}")`);
  return span;
}

function headerButton(name, label, onClick) {
  const b = globalThis.document.createElement("button");
  b.type = "button";
  b.className = "oer-tray-action";
  b.title = label;
  b.setAttribute("aria-label", label);
  b.append(iconSpan(name));
  b.addEventListener("click", onClick);
  return b;
}

function whenElement(tag, fn) {
  const doc = globalThis.document;
  const found = doc.querySelector(tag);
  if (found) return fn(found);
  const mo = new MutationObserver(() => {
    const el = doc.querySelector(tag);
    if (el) {
      mo.disconnect();
      fn(el);
    }
  });
  mo.observe(doc.body, { childList: true });
}

export function installTrayEnhancer() {
  whenElement("hax-tray", async (tray) => {
    await customElements.whenDefined("hax-tray");
    await tray.updateComplete;
    if (!tray.shadowRoot || tray.__oerEnhanced) return;
    tray.__oerEnhanced = true;
    let lastConfigure = null;
    const enhance = () => {
      const root = tray.shadowRoot;
      const actions = root.querySelector(".tray-detail-titlebar-actions");
      if (actions && !actions.querySelector(".oer-tray-action")) {
        actions.append(
          headerButton("icons:swap-horiz", "Switch panel side", () =>
            root.querySelector("#haxMenuAlign")?.click(),
          ),
          headerButton("icons:close", "Close panel", () => {
            tray.collapsed = true;
            tray.trayDetail = "no-active-tray";
          }),
        );
      }
      // HAX re-renders the section elements after the form itself, so key
      // off the Configure section's identity rather than the form's
      const configure = root.querySelector('a11y-collapse[id="settings.configure"]');
      if (configure && configure !== lastConfigure) {
        lastConfigure = configure;
        requestAnimationFrame(() => {
          if (!configure.expanded) configure.expanded = true;
        });
      }
    };
    new MutationObserver(enhance).observe(tray.shadowRoot, { childList: true, subtree: true });
    enhance();
  });
}
