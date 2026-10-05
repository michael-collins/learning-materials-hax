/**
 * shadcn skin for HAX's learning blocks: the question elements (multiple
 * choice, true/false, fill in the blanks, matching, sorting, tagging, all
 * built on QuestionElement), self-check, stop-note, flash-card and
 * vocab-term. Same saved HTML as stock HAX; only how they look changes, and
 * only under custom-oer-docs-theme (registered with the theme skin).
 *
 * installLearningBlocks() also stacks a question's Feedback and Directions
 * under it (HAX lays them out in two columns at any width).
 */
import { css } from "./lit.js";

export const QUESTION_TAGS = ["multiple-choice", "true-false-question", "fill-in-the-blanks", "matching-question", "sorting-question", "tagging-question"];

const card = css`
  :host {
    display: block !important;
    margin: 1.5rem 0 !important;
    padding: 1.25rem !important;
    border: 1px solid var(--border) !important;
    border-radius: var(--radius-lg) !important;
    background: var(--card, var(--background)) !important;
    color: var(--card-foreground, var(--foreground)) !important;
    box-shadow: none !important;
    font-family: var(--font-sans) !important;
    font-size: 1rem !important;
    line-height: 1.6 !important;
    transition: none !important;
    text-align: start !important;
  }
  :host(:hover),
  :host(:focus-within) {
    border-color: var(--border) !important;
  }
`;

export const learningSkin = {
  [QUESTION_TAGS.join(", ")]: css`
    ${card}
    :host {
      --simple-fields-field-checked-color: var(--primary);
      --simple-fields-field-checked-ink-color: var(--primary);
      --simple-fields-field-checkmark-color: var(--primary-foreground);
      --simple-fields-field-color: var(--foreground);
      --simple-fields-field-label-color: var(--foreground);
      --simple-fields-field-error-color: var(--destructive);
      --simple-toolbar-button-border-color: var(--input-border, var(--border));
      --grid-plate-item-margin: 0;
      --grid-plate-item-padding: 0;
      --ddd-theme-primary: var(--primary);
    }
    grid-plate {
      transition: none !important;
      view-transition-name: none !important;
    }
    details {
      transition: none !important;
      view-transition-name: none !important;
    }
    /* section headers ("Question", "Feedback", "Directions"): small labels */
    summary {
      padding: 0 0 0.5rem !important;
      font-family: var(--font-sans) !important;
      font-size: 0.75rem !important;
      font-weight: 600 !important;
      letter-spacing: 0.06em !important;
      text-transform: uppercase !important;
      color: var(--muted-foreground) !important;
      background: transparent !important;
      border: 0 !important;
      filter: none !important;
      transition: none !important;
      --simple-icon-color: var(--muted-foreground);
    }
    summary:hover,
    summary:focus {
      background: transparent !important;
      color: var(--foreground) !important;
    }
    summary:focus-visible {
      outline: 2px solid var(--ring) !important;
      outline-offset: 2px !important;
      border-radius: var(--radius-sm) !important;
    }
    summary::after {
      font-size: 1rem !important;
      color: var(--muted-foreground) !important;
    }
    .details-icon {
      --simple-icon-height: 0.875rem;
      --simple-icon-width: 0.875rem;
    }
    details[open] > summary {
      background: transparent !important;
      border: 0 !important;
    }
    details[open] .container {
      padding: 0 !important;
      border: 0 !important;
    }
    details[open] p {
      padding: 0 !important;
    }
    /* the question itself */
    h3 {
      margin: 0 0 0.75rem !important;
      font-family: var(--font-sans) !important;
      font-size: 1.0625rem !important;
      font-weight: 600 !important;
      line-height: 1.4 !important;
      color: var(--foreground) !important;
    }
    fieldset.options,
    fieldset {
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 0.375rem !important;
    }
    simple-fields-field {
      margin: 0 !important;
      padding: 0.5rem 0.75rem !important;
      border: 1px solid var(--border) !important;
      border-radius: var(--radius-md) !important;
      background: var(--background) !important;
      box-shadow: none !important;
      color: var(--foreground) !important;
    }
    :host simple-fields-field:hover,
    :host simple-fields-field:focus-within {
      background: var(--accent) !important;
      color: var(--foreground) !important;
      border-color: var(--input-border, var(--border)) !important;
      box-shadow: none !important;
    }
    #buttons {
      justify-content: flex-start !important;
      gap: 0.5rem !important;
      margin: 0.875rem 0 0 !important;
    }
    /* Check answer / Try again (and other actions): shadcn buttons */
    simple-toolbar-button::part(button) {
      height: 2.25rem !important;
      min-height: 0 !important;
      padding: 0 1rem !important;
      border: 1px solid var(--input-border, var(--border)) !important;
      border-radius: var(--radius-md) !important;
      background: var(--background) !important;
      color: var(--foreground) !important;
      box-shadow: none !important;
      opacity: 1 !important;
    }
    simple-toolbar-button::part(label) {
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      font-weight: 500 !important;
      line-height: 1 !important;
    }
    #check::part(button) {
      border-color: transparent !important;
      background: var(--primary) !important;
      color: var(--primary-foreground) !important;
    }
    :host simple-toolbar-button:hover::part(button),
    :host simple-toolbar-button:focus-within::part(button) {
      background: var(--accent) !important;
      color: var(--foreground) !important;
    }
    :host #check:hover::part(button),
    :host #check:focus-within::part(button) {
      background: color-mix(in srgb, var(--primary) 88%, black) !important;
      color: var(--primary-foreground) !important;
    }
    simple-toolbar-button[disabled]::part(button) {
      opacity: 0.5 !important;
      cursor: default !important;
    }
    /* feedback, directions and the correct / incorrect legend sit below */
    #feedback,
    #directions > summary {
      margin-top: 1rem !important;
    }
    dt.correct {
      color: oklch(0.5 0.13 150) !important;
    }
    dt.incorrect {
      color: var(--destructive) !important;
    }
    :host p,
    :host li,
    :host dd {
      text-align: start !important;
      font-size: 0.875rem !important;
      color: var(--muted-foreground) !important;
    }
  `,

  "self-check": css`
    ${card}
    :host {
      padding: 0 !important;
      overflow: hidden !important;
    }
    .card {
      margin: 0 !important;
      box-shadow: none !important;
      border: 0 !important;
      background: transparent !important;
    }
    .triangle,
    .image-wrap:empty {
      display: none !important;
    }
    #header_wrap {
      display: flex !important;
      align-items: center !important;
      gap: 0.5rem !important;
      margin: 0 !important;
      padding: 1rem 1.25rem 0 !important;
      background: transparent !important;
      color: var(--muted-foreground) !important;
      --simple-icon-color: var(--muted-foreground);
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
    }
    #questionmark {
      width: 1rem !important;
      height: 1rem !important;
      padding: 0 !important;
      margin: 0 !important;
      border: 0 !important;
      background: transparent !important;
    }
    #title,
    .heading {
      margin: 0 !important;
      padding: 0 !important;
      font-family: var(--font-sans) !important;
      font-size: 0.75rem !important;
      font-weight: 600 !important;
      letter-spacing: 0.06em !important;
      text-transform: uppercase !important;
      color: var(--muted-foreground) !important;
    }
    #question_wrap {
      position: relative !important;
      background: transparent !important;
      color: var(--foreground) !important;
    }
    .question {
      display: flex !important;
      align-items: flex-start !important;
      gap: 1rem !important;
      padding: 0.5rem 1.25rem 1.25rem !important;
      font-size: 1.0625rem !important;
      font-weight: 500 !important;
      line-height: 1.5 !important;
    }
    .check_button {
      margin-left: auto !important;
      flex: none !important;
    }
    .check-btn,
    #closeBtn {
      --simple-icon-color: var(--foreground);
      --simple-icon-height: 1.125rem;
      --simple-icon-width: 1.125rem;
      width: 2.25rem !important;
      height: 2.25rem !important;
      border: 1px solid var(--input-border, var(--border)) !important;
      border-radius: var(--radius-md) !important;
      background: var(--background) !important;
      color: var(--foreground) !important;
    }
    .check-btn:hover,
    #closeBtn:hover {
      background: var(--accent) !important;
    }
    #answer_wrap {
      background: color-mix(in srgb, var(--muted) 70%, var(--background)) !important;
      border-top: 1px solid var(--border) !important;
      color: var(--foreground) !important;
      transition: none !important;
    }
    .answer {
      display: flex !important;
      align-items: flex-start !important;
      gap: 1rem !important;
      padding: 1rem 1.25rem !important;
      font-size: 0.9375rem !important;
      line-height: 1.6 !important;
      color: var(--foreground) !important;
    }
    .close_button {
      margin-left: auto !important;
      flex: none !important;
    }
  `,

  // a callout like oer-callout, without the STOP sign
  "stop-note": css`
    :host {
      display: block !important;
      margin: 1.5rem 0 !important;
      font-family: var(--font-sans) !important;
    }
    .container {
      display: block !important;
      padding: 0.875rem 1rem 0.875rem 1.125rem !important;
      border: 1px solid var(--border) !important;
      border-left: 3px solid oklch(0.62 0.15 70) !important;
      border-radius: var(--radius-lg) !important;
      background: color-mix(in srgb, oklch(0.62 0.15 70) 7%, var(--background)) !important;
      box-shadow: none !important;
    }
    .svg_wrap {
      display: none !important;
    }
    .message_wrap {
      padding: 0 !important;
      margin: 0 !important;
      background: transparent !important;
      border: 0 !important;
    }
    .main_message,
    h3 {
      margin: 0 0 0.25rem !important;
      font-family: var(--font-sans) !important;
      font-size: 0.9375rem !important;
      font-weight: 600 !important;
      color: var(--foreground) !important;
    }
    .secondary_message {
      font-size: 0.9375rem !important;
      line-height: 1.6 !important;
      color: var(--foreground) !important;
    }
  `,

  "flash-card": css`
    :host {
      display: block !important;
      margin: 1.5rem 0 !important;
      font-family: var(--font-sans) !important;
    }
  `,

  "flash-card-answer-box": css`
    :host {
      font-family: var(--font-sans) !important;
      color: var(--foreground) !important;
    }
    :host > div,
    div {
      border-radius: var(--radius-lg) !important;
      border-color: var(--border) !important;
      box-shadow: none !important;
    }
  `,

  "vocab-term": css`
    :host {
      font-family: var(--font-sans) !important;
    }
    summary,
    #summary {
      display: inline !important;
      padding: 0 !important;
      color: var(--link, var(--primary)) !important;
      text-decoration: underline dotted !important;
      text-underline-offset: 3px !important;
      cursor: help !important;
      background: transparent !important;
      font-weight: inherit !important;
    }
  `,
};

// stack a question's two columns (Question | Feedback + Directions)
// and start Directions collapsed (one click away) instead of open
function stack(el) {
  const gp = el.shadowRoot?.querySelector("grid-plate");
  if (gp && gp.getAttribute("layout") !== "1") gp.setAttribute("layout", "1");
  const directions = el.shadowRoot?.querySelector("#directions");
  if (directions && !el.__oerDirections) {
    el.__oerDirections = true;
    directions.removeAttribute("open");
  }
}

let installed = false;
export function installLearningBlocks() {
  if (installed) return;
  installed = true;
  const patch = (tag) => {
    const cls = customElements.get(tag);
    if (!cls || cls.prototype.__oerStacked) return;
    const updated = cls.prototype.updated;
    cls.prototype.updated = function (changed) {
      updated?.call(this, changed);
      stack(this);
    };
    cls.prototype.__oerStacked = true;
    globalThis.document.querySelectorAll(tag).forEach(stack);
  };
  for (const tag of QUESTION_TAGS) {
    if (customElements.get(tag)) patch(tag);
    else customElements.whenDefined(tag).then(() => patch(tag));
  }
}
