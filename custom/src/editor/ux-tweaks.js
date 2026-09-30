/**
 * Behavioural changes to stock HAX editor elements, aimed at perceivability:
 * nothing important hidden behind overflow menus, sensible panels open by
 * default. Each tweak patches one element class once it is defined.
 */
import { LUCIDE_ICONS } from "./lucide-icons.generated.js";
import { showPanel, PANELS } from "./stock.js";
import { store } from "@haxtheweb/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";

function onDefined(tag, fn) {
  customElements.whenDefined(tag).then(() => fn(customElements.get(tag)));
}

const SOURCE_LABELS = {
  "editor:format-clear": "Clean",
  "hax:format-textblock": "Prettify",
  "icons:content-copy": "Copy",
};

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

  // Block hover previews render in simple-popover-manager; flag it while it
  // holds one so the skin can move the card outside the editor panel.
  whenElement("simple-popover-manager", (mgr) => {
    const flag = () =>
      mgr.toggleAttribute("data-oer-preview", !!mgr.querySelector("hax-element-demo"));
    new MutationObserver(flag).observe(mgr, { childList: true, subtree: true });
    flag();
  });

  // Source panel: its actions are icon-only; show their text labels.
  onDefined("hax-view-source", (Cls) => {
    const proto = Cls.prototype;
    const updated = proto.updated;
    proto.updated = function (changed) {
      updated?.call(this, changed);
      this.shadowRoot?.querySelector("hax-toolbar")?.setAttribute("data-oer-source", "");
      for (const b of this.shadowRoot?.querySelectorAll("hax-tray-button") ?? []) {
        if (!b.showTextLabel) b.showTextLabel = true;
        b.setAttribute("data-oer-labelled", "");
        // short labels so the secondary actions fit one row in the panel
        const short = SOURCE_LABELS[b.icon];
        if (short && b.label !== short) b.label = short;
      }
    };
  });
}

/**
 * The editor side panel (hax-tray), docked where the site sidebar sits:
 * - A tab strip (Insert / Block / Outline / Source) is injected at the top.
 *   Tabs always *show* their panel; stock toggled it closed when the active
 *   button was pressed again, which is why Insert and Block both appeared
 *   to switch the pane off.
 * - The panel stays open for the whole editing session.
 * - Block settings open with "Configure" expanded.
 */

const TABS = [
  ["content-add", "hax:add-brick", "Insert"],
  ["content-edit", "image:tune", "Block"],
  ["content-map", "icons:toc", "Outline"],
  ["view-source", "hax:html-code", "Source"],
];

function iconSpan(name) {
  const span = globalThis.document.createElement("span");
  span.className = "oer-icon";
  span.setAttribute("aria-hidden", "true");
  span.style.setProperty("--src", `url("${LUCIDE_ICONS[name]}")`);
  return span;
}

function buildTabs() {
  const list = globalThis.document.createElement("div");
  list.className = "oer-tabs";
  list.setAttribute("role", "tablist");
  list.setAttribute("aria-label", "Editor panel");
  for (const [name, iconName, label] of TABS) {
    const b = globalThis.document.createElement("button");
    b.type = "button";
    b.className = "oer-tab";
    b.dataset.panel = name;
    b.setAttribute("role", "tab");
    b.append(iconSpan(iconName), globalThis.document.createTextNode(label));
    b.addEventListener("click", () => showPanel(name));
    list.append(b);
  }
  // arrow keys move between tabs, as in any tablist
  list.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const tabs = [...list.querySelectorAll(".oer-tab")];
    const i = tabs.indexOf(e.target);
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
    next.focus();
    next.click();
  });
  return list;
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

    const syncTabs = () => {
      const current = tray.getAttribute("tray-detail");
      for (const tab of tray.shadowRoot.querySelectorAll(".oer-tab")) {
        const on = tab.dataset.panel === current;
        tab.setAttribute("aria-selected", String(on));
        tab.tabIndex = on ? 0 : -1;
      }
    };

    const enhance = () => {
      const root = tray.shadowRoot;
      const detail = root.querySelector(".detail");
      if (detail && !detail.querySelector(".oer-tabs")) {
        detail.prepend(buildTabs());
        syncTabs();
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
    new MutationObserver(syncTabs).observe(tray, { attributes: true, attributeFilter: ["tray-detail"] });
    enhance();

    // keep the panel open while editing, defaulting to Insert
    autorun(() => {
      if (!toJS(store.editMode)) return;
      requestAnimationFrame(() => {
        const current = tray.getAttribute("tray-detail");
        showPanel(PANELS.includes(current) ? current : "content-add");
      });
    });
  });
}
