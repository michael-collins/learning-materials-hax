/**
 * `oer-site-style` — a course site's Style panel (types/course-site-style.js):
 * a colour scheme or a custom accent, and a typeface pairing. A side sheet,
 * not a modal, so the course site stays visible and scrollable beside it:
 * every choice previews on the page at once (the theme listens for
 * `oer-site-style-preview`); Save keeps it, Cancel or Esc puts it back.
 *
 *   siteStyle().show(siteItem)
 * @element oer-site-style
 */
import { html, css, LitElement } from "../lit.js";
import { LUCIDE_ICONS } from "../editor/lucide-icons.generated.js";
import { saveOutline } from "../outline/outline-model.js";
import { SCHEMES, FONT_PAIRS, accentPair, loadAllSiteFonts } from "../types/course-site-style.js";
import { formControls } from "./form-controls.js";

const lucide = (name, cls = "") =>
  html`<span class="lucide ${cls}" aria-hidden="true" style="--src:url(&quot;${LUCIDE_ICONS[name] || ""}&quot;)"></span>`;
const oklchCss = ([L, C, h]) => `oklch(${L} ${C} ${h})`;

const preview = (style) => globalThis.dispatchEvent(new CustomEvent("oer-site-style-preview", { detail: style }));

class OerSiteStyle extends LitElement {
  static get tag() {
    return "oer-site-style";
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      _style: { state: true },
      _saving: { state: true },
      _error: { state: true },
    };
  }

  constructor() {
    super();
    this.open = false;
    this._style = {};
    this._saving = false;
    this._error = "";
    this.__keys = (e) => {
      if (this.open && e.key === "Escape" && !this._saving) {
        e.preventDefault();
        this._cancel();
      }
    };
  }

  show(site) {
    if (!site) return;
    this._site = site;
    this._before = { scheme: "studio", fonts: "inter", accent: "", ...(site.metadata?.oerSiteStyle || {}) };
    this._style = { ...this._before };
    this._saving = false;
    this._error = "";
    loadAllSiteFonts();
    this.open = true;
    globalThis.addEventListener("keydown", this.__keys);
    this.updateComplete.then(() => this.shadowRoot.querySelector('[aria-checked="true"]')?.focus());
  }

  _set(patch) {
    this._style = { ...this._style, ...patch };
    preview(this._style);
  }

  _cancel() {
    preview(null);
    this._close();
  }

  _close() {
    this.open = false;
    globalThis.removeEventListener("keydown", this.__keys);
  }

  async _save() {
    if (this._saving) return;
    const style = { scheme: this._style.accent ? "" : this._style.scheme || "studio", accent: this._style.accent || "", fonts: this._style.fonts || "inter" };
    this._saving = true;
    this._error = "";
    try {
      await saveOutline([{ ...this._site, metadata: { ...(this._site.metadata || {}), oerSiteStyle: style }, modified: true }]);
      preview(null);
      this._close();
    } catch (err) {
      this._error = `Saving stopped: ${err.message || err}`;
    } finally {
      this._saving = false;
    }
  }

  // arrow keys move through a radio group, as native radios do
  _radioKeys(e, choose) {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const radios = [...e.currentTarget.querySelectorAll('[role="radio"]')];
    const next = radios[(radios.indexOf(e.target) + keys[e.key] + radios.length) % radios.length];
    next?.focus();
    choose(next?.dataset.id);
  }

  render() {
    if (!this.open) return html``;
    const st = this._style;
    const custom = !!st.accent;
    const pair = custom ? accentPair(st.accent) : null;
    return html`<aside class="sheet" role="dialog" aria-labelledby="t" aria-describedby="sub">
      <header>
        <div>
          <h2 id="t">${lucide("oer:sparkles")}Style</h2>
          <p class="sub" id="sub">How this course site looks. Choices show on the page as you make them.</p>
        </div>
        <button class="x" aria-label="Close without saving" title="Close (Esc)" @click="${this._cancel}">${lucide("oer:x")}</button>
      </header>
      <div class="body">
        <section>
          <h3 id="colour-h">Colour</h3>
          <div class="swatches" role="radiogroup" aria-labelledby="colour-h" @keydown="${(e) => this._radioKeys(e, (id) => this._set({ scheme: id, accent: "" }))}">
            ${SCHEMES.map((s) => {
              const on = !custom && (st.scheme || "studio") === s.id;
              return html`<button
                role="radio"
                data-id="${s.id}"
                aria-checked="${on ? "true" : "false"}"
                tabindex="${on || (custom && s.id === "studio") ? "0" : "-1"}"
                class="swatch"
                @click="${() => this._set({ scheme: s.id, accent: "" })}"
              >
                <span class="chip" style="background: light-dark(${oklchCss(s.light)}, ${oklchCss(s.dark)})"></span>
                <span class="name">${s.label}</span>
                <span class="hint">${s.hint}</span>
              </button>`;
            })}
          </div>
          <div class="custom ${custom ? "on" : ""}">
            <label for="accent">Or your own colour</label>
            <div class="custom-row">
              <input type="color" aria-label="Pick a colour" .value="${st.accent || "#0071b6"}" @input="${(e) => this._set({ accent: e.target.value })}" />
              <input id="accent" class="input" type="text" placeholder="#0071b6" .value="${st.accent || ""}" @change="${(e) => this._set({ accent: /^#?[0-9a-f]{6}$/i.test(e.target.value.trim()) ? `#${e.target.value.trim().replace(/^#/, "")}` : "" })}" />
              ${custom ? html`<button class="btn ghost" @click="${() => this._set({ accent: "" })}">Clear</button>` : ""}
            </div>
            ${pair
              ? html`<p class="hint-line">
                  ${lucide("oer:circle-check", "sm")}Adjusted to pass AA contrast:
                  <span class="mini" style="background:${oklchCss(pair.light.map((v) => +v.toFixed(3)))}"></span>light mode
                  <span class="mini" style="background:${oklchCss(pair.dark.map((v) => +v.toFixed(3)))}"></span>dark mode
                </p>`
              : html`<p class="hint-line">Any colour works: it's made darker or lighter as needed so text stays readable.</p>`}
          </div>
        </section>
        <section>
          <h3 id="type-h">Typefaces</h3>
          <div class="fonts" role="radiogroup" aria-labelledby="type-h" @keydown="${(e) => this._radioKeys(e, (id) => this._set({ fonts: id }))}">
            ${FONT_PAIRS.map((f) => {
              const on = (st.fonts || "inter") === f.id;
              return html`<button role="radio" data-id="${f.id}" aria-checked="${on ? "true" : "false"}" tabindex="${on ? "0" : "-1"}" class="font" @click="${() => this._set({ fonts: f.id })}">
                <span class="sample" style="font-family: ${f.display || "var(--font-sans)"}; font-weight: ${f.weight}">Digital Fabrication</span>
                <span class="name">${f.label}</span>
                <span class="hint">${f.hint}</span>
              </button>`;
            })}
          </div>
        </section>
      </div>
      <footer>
        ${this._error ? html`<p class="err" role="alert">${this._error}</p>` : ""}
        <button class="btn outline" @click="${this._cancel}">Cancel</button>
        <button class="btn primary" aria-disabled="${this._saving ? "true" : "false"}" @click="${this._save}">${this._saving ? "Saving…" : "Save style"}</button>
      </footer>
    </aside>`;
  }

  static get styles() {
    return [
      formControls,
      css`
        :host {
          font-family: var(--font-sans, system-ui, sans-serif);
          color: var(--popover-foreground, var(--foreground));
        }
        .sheet {
          position: fixed;
          z-index: 1000;
          top: calc(var(--editor-bar-height, 0px) + 0.5rem);
          right: 0.5rem;
          bottom: 0.5rem;
          display: flex;
          flex-direction: column;
          width: min(22rem, calc(100vw - 1rem));
          border: 1px solid var(--border);
          border-radius: var(--radius-lg, 0.75rem);
          background: var(--popover, var(--background));
          box-shadow: 0 16px 48px rgb(0 0 0 / 0.24);
        }
        header {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          padding: 1rem 1rem 0.75rem 1.25rem;
          border-bottom: 1px solid var(--border);
        }
        h2 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0;
          font-size: 1.0625rem;
          font-weight: 600;
        }
        .sub {
          margin: 0.25rem 0 0;
          font-size: 0.8125rem;
          line-height: 1.5;
          color: var(--muted-foreground);
        }
        .x {
          all: unset;
          display: inline-grid;
          place-items: center;
          width: 2rem;
          height: 2rem;
          margin-left: auto;
          border-radius: var(--radius-md);
          cursor: pointer;
        }
        .x:hover {
          background: var(--accent);
        }
        .body {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        h3 {
          margin: 0 0 0.625rem;
          font-size: 0.875rem;
          font-weight: 600;
        }
        .lucide {
          flex: none;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          background: currentColor;
          -webkit-mask: var(--src) center / contain no-repeat;
          mask: var(--src) center / contain no-repeat;
        }
        .lucide.sm {
          width: 0.875rem;
          height: 0.875rem;
        }
        .swatches {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.5rem;
        }
        .swatch,
        .font {
          all: unset;
          box-sizing: border-box;
          display: grid;
          gap: 0.125rem 0.625rem;
          padding: 0.5rem 0.625rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--background);
          cursor: pointer;
        }
        .swatch {
          grid-template-columns: auto 1fr;
          align-items: center;
        }
        .swatch .chip {
          grid-row: span 2;
          width: 1.75rem;
          height: 1.75rem;
          border-radius: var(--radius-sm, 0.375rem);
        }
        .swatch:hover,
        .font:hover {
          background: var(--accent);
        }
        [role="radio"][aria-checked="true"] {
          border-color: var(--primary);
          box-shadow: 0 0 0 1px var(--primary);
        }
        [role="radio"]:focus-visible,
        .x:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
        }
        .name {
          font-size: 0.8125rem;
          font-weight: 600;
        }
        .hint,
        .hint-line {
          font-size: 0.75rem;
          line-height: 1.4;
          color: var(--muted-foreground);
        }
        .custom {
          margin-top: 0.875rem;
        }
        .custom label {
          display: block;
          margin-bottom: 0.375rem;
          font-size: 0.8125rem;
          font-weight: 500;
        }
        .custom-row {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        input[type="color"] {
          flex: none;
          width: 2.25rem;
          height: 2.25rem;
          padding: 0.125rem;
          border: 1px solid var(--input-border, var(--border));
          border-radius: var(--radius-md);
          background: var(--background);
          cursor: pointer;
        }
        .input {
          flex: 1;
          min-width: 0;
          box-sizing: border-box;
          height: 2.25rem;
          padding: 0 0.75rem;
          border: 1px solid var(--input-border, var(--border));
          border-radius: var(--radius-md);
          background: var(--background);
          font: inherit;
          font-size: 0.875rem;
          color: var(--foreground);
        }
        .hint-line {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.375rem;
          margin: 0.5rem 0 0;
        }
        .mini {
          width: 0.875rem;
          height: 0.875rem;
          border-radius: 0.25rem;
          margin-left: 0.25rem;
        }
        .fonts {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .sample {
          font-size: 1.375rem;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }
        footer {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-top: 1px solid var(--border);
        }
        .err {
          flex-basis: 100%;
          margin: 0;
          font-size: 0.8125rem;
          color: var(--destructive);
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          height: 2.25rem;
          padding: 0 0.875rem;
          border: 1px solid transparent;
          border-radius: var(--radius-md);
          background: none;
          font: inherit;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--foreground);
          cursor: pointer;
        }
        .btn.outline {
          border-color: var(--input-border, var(--border));
        }
        .btn.outline:hover,
        .btn.ghost:hover {
          background: var(--accent);
        }
        .btn.primary {
          background: var(--primary);
          color: var(--primary-foreground);
        }
        .btn[aria-disabled="true"] {
          opacity: 0.6;
          cursor: progress;
        }
        .btn:focus-visible {
          outline: 2px solid var(--ring);
          outline-offset: 2px;
        }
      `,
    ];
  }
}

if (!customElements.get(OerSiteStyle.tag)) customElements.define(OerSiteStyle.tag, OerSiteStyle);

export function siteStyle() {
  const doc = globalThis.document;
  return doc.querySelector(OerSiteStyle.tag) || doc.body.appendChild(doc.createElement(OerSiteStyle.tag));
}
