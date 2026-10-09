/**
 * shadcn/ui form controls (new-york) for every component's own fields:
 * Checkbox, Radio Group item, Select trigger, Input / Textarea focus and
 * states, Slider accent. Add `formControls` first in a component's styles;
 * the rules are :where() (no specificity), so a component's own rules for
 * size or spacing still win. Switches (role="switch") keep their own look.
 * See docs/design-system.md (Forms).
 */
import { css, unsafeCSS } from "../lit.js";

// Lucide check and minus, as masks
const CHECK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E")`;
const MINUS = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round'%3E%3Cpath d='M5 12h14'/%3E%3C/svg%3E")`;

export const formControls = css`
  /* Input, Textarea, Select: one box (components set their own sizes) */
  :where(
      input:not([type]),
      input[type="text"],
      input[type="search"],
      input[type="url"],
      input[type="email"],
      input[type="number"],
      input[type="date"],
      input[type="time"],
      input[type="datetime-local"],
      input[type="password"],
      input[type="tel"],
      textarea,
      select
    ) {
    font: inherit;
    color: var(--foreground);
    transition:
      border-color 0.15s,
      box-shadow 0.15s;
  }
  :where(input, textarea)::placeholder {
    color: var(--muted-foreground);
    opacity: 1;
  }
  :where(input:not([type="checkbox"], [type="radio"], [type="range"]), textarea, select):focus-visible {
    outline: none;
    border-color: var(--ring);
    box-shadow: 0 0 0 3px color-mix(in oklch, var(--ring) 40%, transparent);
  }
  :where(input, textarea, select):disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  :where(input, textarea, select)[aria-invalid="true"] {
    border-color: var(--destructive);
  }
  /* Select trigger: the native list keeps its arrow */
  :where(select) {
    box-sizing: border-box;
    height: 2.25rem;
    padding: 0 0.75rem;
    border: 1px solid var(--input-border, var(--border));
    border-radius: var(--radius-md, 0.5rem);
    background-color: var(--background);
    box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
    font-size: 0.875rem;
    cursor: pointer;
  }

  /* Checkbox */
  :where(input[type="checkbox"]:not([role="switch"])) {
    appearance: none;
    -webkit-appearance: none;
    flex: none;
    box-sizing: border-box;
    display: inline-grid;
    place-content: center;
    width: 1rem;
    height: 1rem;
    margin: 0;
    border: 1px solid var(--input-border, var(--border));
    border-radius: 4px;
    background: var(--background);
    box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
    vertical-align: middle;
    cursor: pointer;
  }
  :where(input[type="checkbox"]:not([role="switch"]))::before {
    content: "";
    width: 0.75rem;
    height: 0.75rem;
    background: var(--primary-foreground);
    -webkit-mask: ${unsafeCSS(CHECK)} center / contain no-repeat;
    mask: ${unsafeCSS(CHECK)} center / contain no-repeat;
    transform: scale(0);
  }
  :where(input[type="checkbox"]:not([role="switch"])):is(:checked, :indeterminate) {
    border-color: var(--primary);
    background: var(--primary);
  }
  :where(input[type="checkbox"]:not([role="switch"])):checked::before {
    transform: scale(1);
  }
  :where(input[type="checkbox"]:not([role="switch"])):indeterminate::before {
    -webkit-mask-image: ${unsafeCSS(MINUS)};
    mask-image: ${unsafeCSS(MINUS)};
    transform: scale(1);
  }

  /* Radio Group item */
  :where(input[type="radio"]) {
    appearance: none;
    -webkit-appearance: none;
    flex: none;
    box-sizing: border-box;
    display: inline-grid;
    place-content: center;
    width: 1rem;
    height: 1rem;
    margin: 0;
    border: 1px solid var(--input-border, var(--border));
    border-radius: 50%;
    background: var(--background);
    box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
    vertical-align: middle;
    cursor: pointer;
  }
  :where(input[type="radio"])::before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: var(--primary);
    transform: scale(0);
  }
  :where(input[type="radio"]):checked {
    border-color: var(--primary);
  }
  :where(input[type="radio"]):checked::before {
    transform: scale(1);
  }

  /* Checkbox and radio focus: the shadcn ring */
  :where(input[type="checkbox"]:not([role="switch"]), input[type="radio"]):focus-visible {
    outline: none;
    border-color: var(--ring);
    box-shadow: 0 0 0 3px color-mix(in oklch, var(--ring) 40%, transparent);
  }

  /* Slider */
  :where(input[type="range"]) {
    accent-color: var(--primary);
  }
`;
