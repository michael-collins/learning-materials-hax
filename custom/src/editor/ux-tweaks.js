/**
 * Behavioural changes to stock HAX editor elements, aimed at perceivability:
 * nothing important hidden behind overflow menus, sensible panels open by
 * default. Each tweak patches one element class once it is defined.
 */

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

  // Colour swatch grids print no names; expose each as a tooltip.
  onDefined("simple-fields-field", (Cls) => {
    const proto = Cls.prototype;
    const updated = proto.updated;
    const name = (option) => {
      const sample = option.querySelector('d-d-d-sample[type="accent"], d-d-d-sample[type="primary"]');
      return sample?.shadowRoot?.querySelector(".label")?.textContent?.trim();
    };
    proto.updated = function (changed) {
      updated?.call(this, changed);
      if (this.type !== "radio") return;
      requestAnimationFrame(() => {
        for (const option of this.shadowRoot?.querySelectorAll('[part="option"]') ?? []) {
          const label = name(option);
          if (label && option.title !== label) option.title = label;
        }
      });
    };
  });

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
 * The editor panel (hax-tray) is only shown inside oer-settings-dialog
 * (block settings, HTML source). Block settings open with "Configure"
 * expanded.
 */

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
