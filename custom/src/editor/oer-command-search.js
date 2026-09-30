/**
 * `oer-command-search` — a search icon that expands into a field. Typing
 * hands the text to Merlin, which opens as the command dialog with the
 * query filled in; Enter on an empty field opens it directly; Escape or a
 * click elsewhere collapses back to the icon. The expansion is animated
 * unless the OS asks for reduced motion.
 * @element oer-command-search
 */
import { html, css, LitElement } from "../lit.js";
import { openCommandPalette, DAEMON } from "./stock.js";
import { LUCIDE_ICONS } from "./lucide-icons.generated.js";

class OerCommandSearch extends LitElement {
  static get tag() {
    return "oer-command-search";
  }

  static get properties() {
    return { open: { type: Boolean, reflect: true } };
  }

  constructor() {
    super();
    this.open = false;
    this.__outside = (e) => {
      if (this.open && !e.composedPath().includes(this)) this.open = false;
    };
  }

  connectedCallback() {
    super.connectedCallback();
    globalThis.addEventListener("pointerdown", this.__outside);
  }

  disconnectedCallback() {
    globalThis.removeEventListener("pointerdown", this.__outside);
    super.disconnectedCallback();
  }

  updated(changed) {
    if (changed.has("open") && this.open) {
      this.shadowRoot.querySelector("input")?.focus();
    }
  }

  _input(e) {
    const value = e.target.value;
    if (!value) return;
    e.target.value = "";
    this.open = false;
    openCommandPalette(value);
  }

  _keydown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      this.open = false;
      this.shadowRoot.querySelector("button")?.focus();
    } else if (e.key === "Enter" && !e.target.value) {
      e.preventDefault();
      this.open = false;
      openCommandPalette();
    }
  }

  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }
      .search {
        display: flex;
        align-items: center;
        width: 2rem;
        height: 2rem;
        border: 1px solid transparent;
        border-radius: var(--radius-md);
        overflow: hidden;
        transition: width 180ms ease-out, border-color 180ms ease-out;
      }
      :host([open]) .search {
        width: min(18rem, 40vw);
        border-color: var(--input-border);
        background: var(--background);
      }
      .search:focus-within {
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
      button {
        all: unset;
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        color: var(--foreground);
        cursor: pointer;
      }
      button:hover {
        background: var(--accent);
        color: var(--accent-foreground);
      }
      :host([open]) button {
        color: var(--muted-foreground);
        background: transparent;
      }
      .icon {
        width: 1rem;
        height: 1rem;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
        mask: var(--src) center / contain no-repeat;
      }
      input {
        flex: 1;
        min-width: 0;
        height: 100%;
        padding: 0 0.5rem 0 0;
        border: 0;
        outline: none;
        background: transparent;
        color: var(--foreground);
        font: inherit;
        font-size: 0.875rem;
        opacity: 0;
      }
      :host([open]) input {
        opacity: 1;
      }
      input::placeholder {
        color: var(--muted-foreground);
      }
      /* honour the OS "reduce motion" setting */
      @media (prefers-reduced-motion: reduce) {
        .search {
          transition: none;
        }
      }
    `;
  }

  render() {
    return html`
      <div class="search" role="search">
        <button
          aria-expanded="${this.open}"
          aria-controls="q"
          title="Search or run a command (${DAEMON})"
          aria-label="Search or run a command"
          @click="${() => (this.open = !this.open)}"
        >
          <span
            class="icon"
            aria-hidden="true"
            style="--src:url(&quot;${LUCIDE_ICONS["icons:search"]}&quot;)"
          ></span>
        </button>
        <input
          id="q"
          type="search"
          placeholder="Search or run a command…"
          aria-label="Search or run a command"
          tabindex="${this.open ? 0 : -1}"
          @input="${this._input}"
          @keydown="${this._keydown}"
        />
      </div>
    `;
  }
}
customElements.define(OerCommandSearch.tag, OerCommandSearch);
