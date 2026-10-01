/**
 * Content blocks ported from learning-materials-decapcms MDC components that
 * HAX has no match for:
 *
 *   oer-callout     :::callout{type title}   info / tip / warning / danger /
 *                                             definition / objective note with
 *                                             rich text edited in place
 *   oer-code-embed  ::code-embed-component   CodePen, JSFiddle, CodeSandbox,
 *                                             StackBlitz, Replit, Glitch
 *   oer-divider     ::content-divider        rule with an optional label
 *   oer-spacer      ::spacer                 vertical space (sm–xl)
 */
import { html, css, LitElement } from "../lit.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { OerMediaFigure } from "./oer-media-figure.js";
import { registerBlocks } from "./register.js";

const gizmo = (title, description, icon, tags) => ({ title, description, icon, color: "blue", tags, meta: { author: "Michael Collins" } });

/* ---------- callout ---------- */

const CALLOUTS = {
  info: { label: "Note", icon: "icons:info", color: "oklch(0.55 0.15 250)" },
  tip: { label: "Tip", icon: "courseicons:strategy", color: "oklch(0.55 0.14 150)" },
  warning: { label: "Warning", icon: "icons:warning", color: "oklch(0.62 0.15 70)" },
  danger: { label: "Important", icon: "icons:error", color: "oklch(0.55 0.2 25)" },
  definition: { label: "Definition", icon: "hax:lesson", color: "oklch(0.52 0.16 300)" },
  objective: { label: "Objective", icon: "courseicons:learning-objectives", color: "oklch(0.5 0.13 200)" },
};

export class OerCallout extends LitElement {
  static get tag() {
    return "oer-callout";
  }

  static get properties() {
    return {
      type: { type: String, reflect: true },
      title: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.type = "info";
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin: 1.5rem 0;
      }
      .callout {
        --c: oklch(0.55 0.15 250);
        display: flex;
        gap: 0.75rem;
        padding: 1rem 1.25rem;
        border: 1px solid color-mix(in oklch, var(--c) 35%, transparent);
        border-left: 4px solid var(--c);
        border-radius: var(--radius-md, 0.5rem);
        background: color-mix(in srgb, var(--c) 7%, var(--background, #fff));
        color: var(--foreground, #111);
      }
      .icon {
        flex: none;
        width: 1.25rem;
        height: 1.25rem;
        margin-top: 0.125rem;
        background: var(--c);
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      .body {
        flex: 1;
        min-width: 0;
      }
      .title {
        margin: 0 0 0.25rem;
        font-weight: 600;
        line-height: 1.5;
      }
      ::slotted(*) {
        margin-top: 0 !important;
      }
      ::slotted(*:last-child) {
        margin-bottom: 0 !important;
      }
    `;
  }

  render() {
    const kind = CALLOUTS[this.type] || CALLOUTS.info;
    return html`<div class="callout" role="note" aria-label="${this.title || kind.label}" style="--c:${kind.color}">
      <span class="icon" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[kind.icon] || ""}&quot;)"></span>
      <div class="body">
        ${this.title ? html`<p class="title">${this.title}</p>` : ""}
        <slot></slot>
      </div>
    </div>`;
  }

  static get haxProperties() {
    return {
      type: "grid",
      canScale: false,
      canEditSource: true,
      contentEditable: true,
      gizmo: gizmo("Callout", "A highlighted note: info, tip, warning, important, definition or objective.", "icons:info", ["Instructional", "callout", "note", "tip", "warning"]),
      settings: {
        configure: [
          {
            property: "type",
            title: "Kind",
            inputMethod: "select",
            options: Object.fromEntries(Object.entries(CALLOUTS).map(([k, v]) => [k, v.label])),
          },
          { property: "title", title: "Title", description: "Optional heading inside the callout.", inputMethod: "textfield" },
          { slot: "", title: "Text", inputMethod: "code-editor", slotWrapper: "p" },
        ],
        advanced: [],
      },
      demoSchema: [{ tag: "oer-callout", properties: { type: "tip", title: "Tip" }, content: "<p>Write the callout text here.</p>" }],
    };
  }
}

/* ---------- code embed ---------- */

const PROVIDERS = {
  codepen: "CodePen",
  jsfiddle: "JSFiddle",
  codesandbox: "CodeSandbox",
  stackblitz: "StackBlitz",
  replit: "Replit",
  glitch: "Glitch",
  other: "Other (embed address)",
};

/** Ported from the Decap CodeEmbedComponent: link or short ID → embed URL. */
export function codeEmbedUrl(provider, src) {
  const raw = String(src || "").trim();
  if (!raw) return "";
  const slash = (s, add) => s.replace(/\/?$/, add);
  switch ((provider || "").toLowerCase()) {
    case "codepen":
      if (raw.includes("codepen.io")) {
        try {
          return `https://codepen.io${new URL(raw).pathname.replace(/\/pen\//, "/embed/")}?default-tab=result`;
        } catch {
          return "";
        }
      }
      if (raw.includes("/")) {
        const [user, pen] = raw.split("/");
        return `https://codepen.io/${user}/embed/${pen}?default-tab=result`;
      }
      return "";
    case "jsfiddle":
      return raw.includes("jsfiddle.net") ? slash(raw, "/embedded/") : `https://jsfiddle.net/${raw}/embedded/`;
    case "codesandbox":
      if (raw.includes("codesandbox.io")) {
        try {
          const id = new URL(raw).pathname.split("/s/")[1]?.split("/")[0];
          return id ? `https://codesandbox.io/embed/${id}` : "";
        } catch {
          return "";
        }
      }
      return `https://codesandbox.io/embed/${raw}`;
    case "stackblitz":
      if (raw.includes("stackblitz.com")) return raw.includes("/embed") || raw.includes("embed=1") ? raw : slash(raw, "?embed=1");
      return `https://stackblitz.com/edit/${raw}?embed=1`;
    case "replit":
      if (raw.includes("replit.com") || raw.includes("repl.it")) return raw.includes("embed=true") ? raw : slash(raw, "?embed=true");
      return `https://replit.com/${raw}?embed=true`;
    case "glitch":
      if (raw.includes("glitch.com")) return raw.includes("/embed") ? raw : slash(raw, "/embed");
      return `https://glitch.com/embed/#!/embed/${raw}`;
    default:
      try {
        return new URL(raw).href;
      } catch {
        return "";
      }
  }
}

export class OerCodeEmbed extends OerMediaFigure {
  static get tag() {
    return "oer-code-embed";
  }

  static get properties() {
    return {
      ...super.properties,
      provider: { type: String, reflect: true },
      src: { type: String, reflect: true },
      height: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.provider = "codepen";
    this.height = "400";
  }

  renderMedia() {
    const url = codeEmbedUrl(this.provider, this.src);
    if (!url) {
      return this.src
        ? this.renderEmpty("valid address", `That doesn't look like a ${PROVIDERS[this.provider] || "code"} link.`)
        : this.renderEmpty("code example", "Pick the service and paste the link in the block settings.");
    }
    return html`<iframe
      src="${url}"
      title="${this.title || "Code example"}"
      loading="lazy"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
      allow="clipboard-write"
      credentialless
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>`;
  }

  static get haxProperties() {
    return {
      canScale: false,
      canEditSource: true,
      gizmo: gizmo("Code example", "A live code example from CodePen, JSFiddle, CodeSandbox, StackBlitz, Replit or Glitch.", "icons:code", ["Media", "code", "codepen", "embed"]),
      settings: {
        configure: [
          { property: "provider", title: "Service", inputMethod: "select", options: PROVIDERS },
          { property: "src", title: "Link", description: "The example's link (or its short ID, e.g. user/pen for CodePen).", inputMethod: "textfield", required: true },
          { property: "height", title: "Height", description: "In pixels.", inputMethod: "textfield" },
          ...OerMediaFigure.figureSettings(),
        ],
        advanced: [],
      },
      demoSchema: [{ tag: "oer-code-embed", properties: { provider: "codepen", height: "400", title: "Code example" }, content: "" }],
    };
  }
}

/* ---------- divider ---------- */

export class OerDivider extends LitElement {
  static get tag() {
    return "oer-divider";
  }

  static get properties() {
    return { label: { type: String, reflect: true } };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin: 2.5rem 0;
      }
      .rule {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: var(--muted-foreground, #555);
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .rule::before,
      .rule::after {
        content: "";
        flex: 1;
        height: 1px;
        background: var(--border, #e5e5e5);
      }
      .rule.plain::after {
        display: none;
      }
    `;
  }

  render() {
    return this.label
      ? html`<div class="rule" role="separator" aria-label="${this.label}">${this.label}</div>`
      : html`<div class="rule plain" role="separator"></div>`;
  }

  static get haxProperties() {
    return {
      canScale: false,
      canEditSource: true,
      gizmo: gizmo("Divider with label", "A horizontal rule, optionally with a short label in the middle.", "hax:hr", ["Layout", "divider", "rule", "separator"]),
      settings: { configure: [{ property: "label", title: "Label", description: "Optional, e.g. “Part 2”.", inputMethod: "textfield" }], advanced: [] },
      demoSchema: [{ tag: "oer-divider", properties: { label: "Part 2" }, content: "" }],
    };
  }
}

/* ---------- spacer ---------- */

const SPACES = { sm: "Small", md: "Medium", lg: "Large", xl: "Extra large" };

export class OerSpacer extends LitElement {
  static get tag() {
    return "oer-spacer";
  }

  static get properties() {
    return { size: { type: String, reflect: true } };
  }

  constructor() {
    super();
    this.size = "md";
  }

  static get styles() {
    return css`
      :host {
        display: block;
        height: 2rem;
      }
      :host([size="sm"]) {
        height: 1rem;
      }
      :host([size="lg"]) {
        height: 4rem;
      }
      :host([size="xl"]) {
        height: 6rem;
      }
      /* visible only while editing */
      :host([data-hax-ray]) {
        outline: 1px dashed var(--border, #ccc);
        outline-offset: -1px;
        background: repeating-linear-gradient(-45deg, transparent 0 6px, color-mix(in oklch, var(--muted, #eee) 70%, transparent) 6px 12px);
      }
    `;
  }

  render() {
    return html``;
  }

  static get haxProperties() {
    return {
      canScale: false,
      canEditSource: true,
      gizmo: gizmo("Spacer", "Extra vertical space between blocks.", "icons:swap-vert", ["Layout", "spacer", "space", "gap"]),
      settings: { configure: [{ property: "size", title: "Size", inputMethod: "select", options: SPACES }], advanced: [] },
      demoSchema: [{ tag: "oer-spacer", properties: { size: "md" }, content: "" }],
    };
  }
}

for (const cls of [OerCallout, OerCodeEmbed, OerDivider, OerSpacer]) {
  if (!customElements.get(cls.tag)) customElements.define(cls.tag, cls);
}
registerBlocks(OerCallout, OerCodeEmbed, OerDivider, OerSpacer);
