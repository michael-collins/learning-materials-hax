/**
 * Per-tag shadow-root styles that re-skin HAX's editor chrome as shadcn/ui.
 * Registered through shadow-styles.js. Keys are comma-separated tag names.
 *
 * Every editor surface also gets `noMotion`: the user asked for no
 * decorative animation, and several of these elements ignore
 * prefers-reduced-motion.
 */
import { css, unsafeCSS } from "../lit.js";

const noMotion = css`
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
`;

// every HAXcms admin dialog / dashboard rendered inside simple-modal
const DIALOG_TAGS = [
  "haxcms-appearance-admin-dialog",
  "haxcms-content-admin-dialog",
  "haxcms-files-admin-dialog",
  "haxcms-outline-editor-dialog",
  "haxcms-page-revisions-dialog",
  "haxcms-seo-admin-dialog",
  "haxcms-site-dashboard",
  "haxcms-site-details-dialog",
  "haxcms-site-import-export-dashboard",
  "haxcms-site-settings-dashboard",
  "haxcms-views-admin-dialog",
  "hax-confirm-dialog",
  "haxcms-about-dialog-ui",
  "haxcms-allowed-blocks-ui",
  "haxcms-editor-settings-dialog-ui",
  "haxcms-site-platform-ui",
  "haxcms-theme-preview-panel",
  "haxcms-page-get-started",
].join(",");

// tags that make up the logged-in editing UI
const EDITOR_TAGS = [
  "haxcms-site-editor-ui",
  "app-hax-top-bar",
  "app-hax-user-menu",
  "app-hax-user-menu-button",
  "simple-toolbar-button",
  "simple-toolbar-menu",
  "simple-toolbar-menu-item",
  "simple-modal",
  "simple-modal-template",
  "simple-popover",
  "simple-tooltip",
  "hax-tray",
  "hax-tray-button",
  "hax-gizmo-browser",
  "hax-stax-browser",
  "hax-map",
  "hax-view-source",
  "hax-gizmo-browser",
  "hax-picker",
  "hax-app-picker",
  "hax-cancel-dialog",
  "hax-plate-context",
  "hax-toolbar",
  "hax-toolbar-item",
  "hax-toolbar-menu",
  "hax-context-item",
  "hax-context-item-menu",
  "hax-text-editor-toolbar",
  "hax-text-editor-button",
  "rich-text-editor-toolbar",
  "rich-text-editor-button",
  "super-daemon",
  "super-daemon-ui",
  "super-daemon-row",
  "super-daemon-search",
  "simple-fields",
  "simple-fields-field",
  "simple-fields-tabs",
  "simple-fields-fieldset",
  "haxcms-outline-editor-dialog",
  "outline-designer",
  "haxcms-site-dashboard",
  "haxcms-page-revisions-dialog",
  "hax-body",
  "simple-toast-el",
  "rpg-character-toast",
  "haxcms-toast",
  "a11y-collapse",
  "simple-fields-container",
  "page-break",
  "simple-context-menu",
  "simple-tooltip",
  "hax-map",
  "hax-view-source",
  "hax-gizmo-browser",
  "hax-tray-upload",
  "hax-upload-field",
  "simple-file-upload",
  "simple-button-grid",
  "simple-popover-selection",
  "outline-designer",
].join(",") + "," + DIALOG_TAGS;

// shadcn Button variants, shared by dialog sheets and the light-DOM rule
export const buttonVariants = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 2.25rem;
  padding: 0 1rem;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  border: 0;
  border-radius: var(--radius-md);
  box-shadow: none;
  cursor: pointer;
`;

// shared shadcn primitives
const focusRing = css`
  outline: 2px solid var(--ring);
  outline-offset: 2px;
`;

export const editorSkin = {
  [EDITOR_TAGS]: noMotion,

  /* ---------- form fields: shadcn Input / Textarea / Select ---------- */
  // simple-fields-field extends the container and shares its shadow root
  "simple-fields-container, simple-fields-field": css`
    :host {
      --simple-fields-font-family: var(--font-sans);
      --simple-fields-font-size: 0.875rem;
      --simple-fields-detail-font-family: var(--font-sans);
      --simple-fields-detail-font-size: 0.8125rem;
      --simple-fields-color: var(--foreground);
      --simple-fields-accent-color: var(--ring);
      --simple-fields-border-color: var(--input-border);
      --simple-fields-border-color-light: var(--border);
      --simple-fields-error-color: var(--destructive);
      --simple-fields-background-color: var(--background);
      margin: 0 0 1rem !important;
      font-family: var(--font-sans);
    }
    /* material underline -> none; the field itself gets the box */
    .border-bottom {
      display: none !important;
    }
    [part="label"],
    .label-main {
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      font-weight: 500 !important;
      color: var(--foreground) !important;
      margin-bottom: 0.375rem !important;
      text-transform: none !important;
      letter-spacing: normal !important;
    }
    [part="field-desc"],
    #description {
      font-size: 0.8125rem !important;
      color: var(--muted-foreground) !important;
      margin-top: 0.375rem !important;
    }
    [part="error-msg"] {
      font-size: 0.8125rem !important;
      color: var(--destructive) !important;
    }
  `,
  "simple-fields-field": css`
    :host {
      --simple-fields-font-family: var(--font-sans);
      --simple-fields-font-size: 0.875rem;
      --simple-fields-color: var(--foreground);
      --simple-fields-accent-color: var(--ring);
      --simple-fields-border-color: var(--input-border);
      --simple-fields-border-color-light: var(--border);
      --simple-fields-background-color: var(--background);
      --simple-fields-placeholder-color: var(--muted-foreground);
      --simple-fields-placeholder-opacity: 1;
      --simple-fields-placeholder-font-style: normal;
      --simple-fields-select-background-color: var(--background);
      --simple-fields-select-option-background-color: var(--popover);
      --simple-fields-select-option-selected-background-color: var(--accent);
    }
    input.field:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="color"]),
    textarea.field,
    select.field,
    [part="select"],
    [part="textarea"] {
      box-sizing: border-box !important;
      width: 100% !important;
      min-height: 2.25rem !important;
      padding: 0.375rem 0.75rem !important;
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      line-height: 1.5 !important;
      color: var(--foreground) !important;
      background: var(--background) !important;
      border: 1px solid var(--input-border) !important;
      border-radius: var(--radius-md) !important;
      box-shadow: 0 1px 2px rgb(0 0 0 / 0.04) !important;
    }
    textarea.field,
    [part="textarea"] {
      min-height: 5rem !important;
    }
    input.field:focus-visible,
    textarea.field:focus-visible,
    select.field:focus-visible {
      outline: 2px solid var(--ring) !important;
      outline-offset: 1px !important;
    }
    input::placeholder,
    textarea::placeholder {
      color: var(--muted-foreground) !important;
      font-style: normal !important;
    }
    /* Merlin's filter field sits bare in the Command header */
    :host([part="filter"][role="combobox"]) {
      background: transparent !important;
      padding: 0 !important;
    }
    :host([part="filter"][role="combobox"])
      input.field.box-input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not(
        [type="color"]
      ) {
      border: 0 !important;
      box-shadow: none !important;
      background: transparent !important;
      padding-left: 0 !important;
      height: 2.75rem !important;
    }
    :host([part="filter"][role="combobox"]) input.field:focus-visible {
      outline: none !important;
    }
    simple-icon-lite,
    [part="option-icon"] {
      --simple-icon-height: 1rem !important;
      --simple-icon-width: 1rem !important;
      color: var(--muted-foreground);
    }
    input[type="checkbox"],
    input[type="radio"] {
      accent-color: var(--primary);
      width: 1rem;
      height: 1rem;
    }
    [part="fieldset-legend"] {
      font-size: 0.875rem !important;
      font-weight: 500 !important;
      color: var(--foreground) !important;
    }
    [part="option-label"] {
      font-size: 0.875rem !important;
    }
  `,

  /* ---------- toolbar buttons: shadcn ghost Button (icon, h-8) ---------- */
  "simple-toolbar-button, hax-toolbar-item, rich-text-editor-button, hax-text-editor-button": css`
    :host {
      --simple-toolbar-button-height: 2rem;
      --simple-toolbar-button-min-width: 2rem;
      --simple-toolbar-button-padding: 0 0.5rem;
      --simple-toolbar-button-border-radius: var(--radius-md);
      --simple-toolbar-button-border-width: 0;
      --simple-toolbar-button-bg: transparent;
      --simple-toolbar-button-color: var(--foreground);
      --simple-toolbar-button-hover-bg: var(--accent);
      --simple-toolbar-button-hover-color: var(--accent-foreground);
      --simple-toolbar-button-hover-border-color: transparent;
      --simple-toolbar-button-toggled-bg: var(--accent);
      --simple-toolbar-button-toggled-color: var(--accent-foreground);
      --simple-toolbar-button-toggled-border-color: transparent;
      --simple-toolbar-button-disabled-opacity: 0.5;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      font-family: var(--font-sans);
      font-size: 0.875rem;
    }
    button {
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      font-weight: 500 !important;
      border-radius: var(--radius-md) !important;
      box-shadow: none !important;
      text-transform: none !important;
    }
    button:focus-visible {
      ${focusRing}
    }
  `,

  /* ---------- tags: shadcn Badge (secondary) ---------- */
  "simple-tag": css`
    :host {
      --simple-tag-font-size: 0.75rem;
    }
    :host,
    .tag,
    span {
      font-family: var(--font-sans) !important;
      font-size: 0.75rem !important;
      font-weight: 500 !important;
      line-height: 1.25rem !important;
      background: var(--secondary-muted, var(--muted)) !important;
      color: var(--foreground) !important;
      border: 1px solid var(--border) !important;
      border-radius: 999px !important;
      padding: 0 0.5rem !important;
      margin: 0 !important;
    }
  `,

  /* ---------- block tray: shadcn Sheet side panel ---------- */
  "hax-tray": css`
    :host {
      font-family: var(--font-sans) !important;
      color: var(--foreground);
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
    }
    .detail {
      background: var(--background) !important;
      color: var(--foreground) !important;
      border-right: 1px solid var(--border) !important;
      box-shadow: none !important;
    }
    .resize-visual {
      width: 1px !important;
      background: var(--border) !important;
    }
    .resize:hover .resize-visual {
      width: 2px !important;
      background: var(--ring) !important;
    }
    .tray-detail-titlebar {
      display: flex !important;
      align-items: center !important;
      gap: 0.5rem !important;
      height: 3rem !important;
      margin: 0 !important;
      padding: 0 0.5rem 0 1rem !important;
      background: var(--background) !important;
      color: var(--foreground) !important;
      border-bottom: 1px solid var(--border) !important;
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      font-weight: 600 !important;
      letter-spacing: normal !important;
      text-transform: none !important;
      --simple-icon-color: var(--muted-foreground);
    }
    .tray-detail-titlebar-icon {
      --simple-icon-height: 1rem !important;
      --simple-icon-width: 1rem !important;
      width: 1rem !important;
      height: 1rem !important;
      color: var(--muted-foreground) !important;
    }
    .tray-detail-titlebar-label {
      flex: 1;
      text-align: start !important;
    }
    /* stock "move panel" arrow read as a close button; replaced by the
       labelled actions injected in ux-tweaks.js */
    #haxMenuAlign {
      display: none !important;
    }
    .tray-detail-titlebar-actions {
      display: flex !important;
      gap: 0.125rem !important;
    }
    .oer-tray-action {
      all: unset;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border-radius: var(--radius-md);
      color: var(--muted-foreground);
      cursor: pointer;
    }
    .oer-tray-action:hover {
      background: var(--accent);
      color: var(--foreground);
    }
    .oer-tray-action:focus-visible {
      outline: 2px solid var(--ring);
      outline-offset: 2px;
    }
    .oer-icon {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      background: currentColor;
      -webkit-mask: var(--src) center / contain no-repeat;
      mask: var(--src) center / contain no-repeat;
    }
    /* Insert panel: finding a block comes first, uploading media last */
    .block-add-wrapper {
      display: flex !important;
      flex-direction: column !important;
      gap: 0.75rem !important;
      padding: 0.75rem 1rem 1rem !important;
    }
    #gizmobrowser {
      order: 1;
    }
    #staxbrowser {
      order: 2;
    }
    #pagesbrowser {
      order: 3;
    }
    hax-tray-upload {
      order: 4;
    }
    #settingsform,
    simple-fields {
      padding: 0.75rem 1rem 1rem !important;
      background: transparent !important;
      font-size: 0.875rem !important;
    }
  `,
  "a11y-collapse": css`
    :host {
      font-family: var(--font-sans);
      border: 0 !important;
      border-bottom: 1px solid var(--border) !important;
      margin: 0 !important;
    }
    #heading,
    button {
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      font-weight: 500 !important;
      color: var(--foreground) !important;
      background: transparent !important;
    }
    button:hover #heading {
      text-decoration: underline;
      text-underline-offset: 4px;
    }
    button:focus-visible {
      ${focusRing}
    }
    #content {
      font-size: 0.875rem;
    }
  `,

  "hax-gizmo-browser": css`
    .toolbar-inner {
      padding: 0 0 0.5rem !important;
      margin: 0 !important;
    }
    #inputfilter {
      margin: 0 !important;
    }
  `,

  /* block tiles in the Add-block browser */
  "hax-tray-button": css`
    :host {
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      font-family: var(--font-sans);
    }
    button {
      font-family: var(--font-sans) !important;
      background: var(--background) !important;
      color: var(--foreground) !important;
      border: 1px solid var(--border) !important;
      border-radius: var(--radius-md) !important;
      box-shadow: none !important;
      gap: 0.375rem !important;
      padding: 0.5rem 0.25rem !important;
    }
    button:hover,
    :host([toggled]) button,
    :host([active]) button {
      background: var(--accent) !important;
      color: var(--accent-foreground) !important;
      border-color: var(--accent) !important;
    }
    button:focus-visible {
      ${focusRing}
    }
    #icon {
      width: 1rem !important;
      height: 1rem !important;
      color: var(--muted-foreground) !important;
    }
    #label {
      font-size: 0.75rem !important;
      font-weight: 500 !important;
      line-height: 1rem !important;
    }
    /* labelled action buttons (Source panel) read as shadcn Buttons */
    :host([data-oer-labelled]) button {
      flex-direction: row !important;
      height: 2rem !important;
      padding: 0 0.75rem !important;
      gap: 0.375rem !important;
      background: var(--simple-toolbar-button-bg, var(--background)) !important;
      color: var(--simple-toolbar-button-color, var(--foreground)) !important;
      border-color: var(--input-border) !important;
    }
    :host([data-oer-labelled]) #label {
      font-size: 0.8125rem !important;
    }
  `,

  /* media upload: shadcn dropzone */
  "hax-tray-upload, hax-upload-field": css`
    fieldset {
      border: 1px dashed var(--input-border) !important;
      border-radius: var(--radius-lg) !important;
      padding: 0.75rem !important;
      margin: 0 0 1rem !important;
      background: transparent !important;
    }
    legend {
      font-family: var(--font-sans) !important;
      font-size: 0.75rem !important;
      font-weight: 500 !important;
      color: var(--muted-foreground) !important;
      padding: 0 0.25rem !important;
    }
    [part="drop-area-text"] {
      display: block;
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      font-weight: 400 !important;
      color: var(--muted-foreground) !important;
      margin-bottom: 0.5rem !important;
    }
    [part="sources"] {
      display: flex !important;
      flex-wrap: wrap !important;
      justify-content: center !important;
      gap: 0.375rem !important;
    }
    [part="sources"] simple-toolbar-button {
      width: 2.25rem !important;
      height: 2.25rem !important;
      min-width: 0 !important;
      margin: 0 !important;
      --simple-toolbar-button-height: 2.25rem;
      --simple-toolbar-button-min-width: 2.25rem;
      --simple-toolbar-button-border-width: 1px;
      --simple-toolbar-button-border-color: var(--input-border);
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
    }
  `,
  "simple-file-upload": css`
    :host {
      font-family: var(--font-sans) !important;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
    }
    [part="drop-area-text"] {
      font-size: 0.875rem !important;
      color: var(--muted-foreground) !important;
      font-weight: 400 !important;
    }
    [part="sources"] {
      gap: 0.375rem !important;
    }
  `,

  /* ---------- floating block + text toolbars (shadcn Toolbar) ---------- */
  /* block toolbar: one continuous toolbar with dividers between groups,
     instead of three separate floating boxes */
  "hax-toolbar": css`
    :host {
      display: inline-flex !important;
      align-items: center !important;
      gap: 0 !important;
      padding: 0.1875rem !important;
      background: var(--popover) !important;
      border: 1px solid var(--border) !important;
      border-radius: var(--radius-md) !important;
      box-shadow: 0 2px 8px rgb(0 0 0 / 0.1) !important;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      --simple-icon-color: var(--foreground);
    }
    .group {
      display: flex !important;
      align-items: center !important;
      gap: 0.125rem !important;
      padding: 0 0.125rem !important;
      background: transparent !important;
      border: 0 !important;
      border-radius: 0 !important;
      box-shadow: none !important;
    }
    .group + .group,
    .group + #buttons {
      border-left: 1px solid var(--border) !important;
      margin-left: 0.125rem !important;
      padding-left: 0.25rem !important;
    }
  `,
  "hax-text-editor-toolbar, rich-text-editor-toolbar": css`
    :host {
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      font-family: var(--font-sans) !important;
      /* #buttons draws the container; avoid a second border */
      border: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
    }
    #buttons {
      gap: 0.125rem !important;
      padding: 0.125rem !important;
      background: var(--popover) !important;
      border: 1px solid var(--border) !important;
      border-radius: var(--radius-md) !important;
      box-shadow: 0 1px 3px rgb(0 0 0 / 0.08) !important;
    }
  `,
  "hax-toolbar-menu, hax-context-item-menu, simple-toolbar-menu": css`
    :host {
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      font-family: var(--font-sans);
      font-size: 0.875rem;
    }
    /* dropdown list -> shadcn DropdownMenu content */
    [role="menu"],
    #menu,
    .menu,
    simple-popover,
    absolute-position-behavior {
      background: var(--popover) !important;
      color: var(--popover-foreground) !important;
      border: 1px solid var(--border) !important;
      border-radius: var(--radius-md) !important;
      box-shadow: 0 4px 12px rgb(0 0 0 / 0.08) !important;
      padding: 0.25rem !important;
    }
  `,
  "simple-toolbar-menu-item, hax-toolbar-menu-item": css`
    :host {
      font-family: var(--font-sans);
      font-size: 0.875rem;
    }
    ::slotted(*),
    button {
      border-radius: var(--radius-sm) !important;
      font-size: 0.875rem !important;
    }
  `,

  /* page-break's edit-mode strip ("Select to edit Page details") */
  "page-break": css`
    :host([data-hax-ray]),
    :host([edit-mode]),
    :host {
      border-width: 1px !important;
      border-color: var(--border) !important;
      border-radius: var(--radius-md) !important;
    }
    /* "Select to edit Page details" is a button: make it look like one.
       Only while HAX shows it (data-hax-ray); otherwise it stays hidden */
    :host([data-hax-ray]) .text {
      display: inline-flex !important;
    }
    .text {
      align-items: center !important;
      gap: 0.5rem !important;
      height: 2rem !important;
      font-family: var(--font-sans) !important;
      font-size: 0.8125rem !important;
      font-weight: 500 !important;
      color: var(--foreground) !important;
      background: var(--background) !important;
      border: 1px solid var(--input-border) !important;
      border-radius: var(--radius-md) !important;
      box-shadow: 0 1px 2px rgb(0 0 0 / 0.05) !important;
      padding: 0 0.75rem !important;
      cursor: pointer !important;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
    }
    .text:hover {
      background: var(--accent) !important;
    }
    .menu-button,
    .save-button,
    .cancel-button {
      --simple-toolbar-button-height: 1.75rem;
      --simple-toolbar-button-min-width: 1.75rem;
      border-radius: var(--radius-sm) !important;
      box-shadow: none !important;
    }
    .menu-button {
      background: transparent !important;
      color: var(--foreground) !important;
      --simple-icon-color: var(--muted-foreground);
    }
    .save-button {
      background: var(--primary) !important;
      color: var(--primary-foreground) !important;
      --simple-icon-color: var(--primary-foreground);
    }
    .cancel-button {
      background: transparent !important;
      color: var(--foreground) !important;
      border: 1px solid var(--input-border) !important;
      --simple-icon-color: var(--foreground);
    }
    .link-info {
      font-family: var(--font-sans) !important;
      background: var(--muted) !important;
      border-color: var(--border) !important;
      color: var(--muted-foreground) !important;
      border-radius: var(--radius-md) !important;
    }
    .link-url {
      font-family: var(--font-mono) !important;
      background: var(--background) !important;
      border-color: var(--border) !important;
      color: var(--foreground) !important;
    }
  `,

  /* page outline panel: a layers list, full-width rows, clear current row */
  "hax-map": css`
    :host {
      font-family: var(--font-sans) !important;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      --simple-icon-color: var(--muted-foreground);
    }
    ul {
      list-style: none !important;
      margin: 0 !important;
      padding: 0.5rem !important;
    }
    li {
      position: relative;
      display: flex !important;
      align-items: center !important;
      gap: 0.125rem !important;
      min-height: 2rem !important;
      margin: 0 0 1px !important;
      padding: 0 !important;
      border-radius: var(--radius-md) !important;
    }
    li:hover {
      background: var(--accent);
    }
    li:has(hax-toolbar-item[data-active-item]) {
      background: var(--accent);
      box-shadow: inset 2px 0 0 var(--primary);
    }
    hax-toolbar-item {
      flex: 1;
      min-width: 0;
      --simple-toolbar-button-border-width: 0 !important;
      --simple-toolbar-button-bg: transparent !important;
      --simple-toolbar-button-hover-bg: transparent !important;
      --simple-toolbar-button-height: 2rem !important;
    }
    hax-toolbar-item::part(button) {
      width: 100%;
      justify-content: flex-start;
      padding: 0 0.5rem;
      font-size: 0.875rem;
      font-weight: 400;
      background: transparent !important;
      color: var(--foreground) !important;
      border: 0 !important;
      box-shadow: none !important;
    }
    hax-toolbar-item[data-active-item]::part(button) {
      font-weight: 600;
    }
    hax-toolbar-item::part(label) {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: start;
    }
    /* nested blocks (list items etc.) indent with a guide line */
    li.is-child {
      margin-left: 0.875rem !important;
      padding-left: 0.375rem !important;
      border-radius: 0 var(--radius-md) var(--radius-md) 0 !important;
      box-shadow: inset 1px 0 0 var(--border);
    }
    li.is-child:has(hax-toolbar-item[data-active-item]) {
      box-shadow: inset 2px 0 0 var(--primary);
    }
    /* row actions: shown on the current row and on the hovered/focused
       row, hidden elsewhere so labels keep their width */
    simple-icon-button-lite {
      flex: none;
      display: none !important;
      width: 1.75rem !important;
      height: 1.75rem !important;
      margin: 0 !important;
      border: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
      border-radius: var(--radius-sm);
      --simple-icon-height: 1rem !important;
      --simple-icon-width: 1rem !important;
      --simple-icon-color: var(--muted-foreground) !important;
      color: var(--muted-foreground) !important;
    }
    li:hover simple-icon-button-lite,
    li:focus-within simple-icon-button-lite,
    li:has(hax-toolbar-item[data-active-item]) simple-icon-button-lite {
      display: inline-flex !important;
      opacity: 1 !important;
      visibility: visible !important;
    }
    simple-icon-button-lite:hover {
      background: var(--background) !important;
      color: var(--foreground);
    }
    simple-icon-button-lite.del:hover {
      color: var(--destructive);
    }
  `,

  /* Source panel: labelled actions, Update HTML as the primary one */
  "hax-view-source": css`
    :host {
      font-family: var(--font-sans) !important;
    }
    hax-toolbar {
      display: flex !important;
      flex-wrap: wrap !important;
      margin: 0.75rem 1rem !important;
      padding: 0 !important;
      background: transparent !important;
      border: 0 !important;
      box-shadow: none !important;
      gap: 0.375rem !important;
    }
    hax-tray-button.updatecontent {
      --simple-toolbar-button-bg: var(--primary);
      --simple-toolbar-button-color: var(--primary-foreground);
      --simple-icon-color: var(--primary-foreground);
    }
    textarea,
    code-editor,
    #textarea {
      font-family: var(--font-mono) !important;
      font-size: 0.8125rem !important;
      line-height: 1.6 !important;
      border: 1px solid var(--input-border) !important;
      border-radius: var(--radius-md) !important;
      background: var(--background) !important;
      color: var(--foreground) !important;
    }
  `,

  /* shadcn Tooltip: high-contrast inverse chip */
  "simple-tooltip": css`
    #tooltip {
      font-family: var(--font-sans) !important;
      font-size: 0.75rem !important;
      font-weight: 500 !important;
      line-height: 1rem !important;
      color: var(--background) !important;
      background: var(--foreground) !important;
      border: 0 !important;
      border-radius: var(--radius-sm) !important;
      padding: 0.3125rem 0.625rem !important;
      box-shadow: 0 2px 8px rgb(0 0 0 / 0.15) !important;
      opacity: 1 !important;
      white-space: nowrap;
    }
  `,

  /* ---------- editor canvas ---------- */
  "hax-body": css`
    ::slotted(p),
    ::slotted(li),
    ::slotted(ul),
    ::slotted(ol) {
      text-align: start !important;
    }
    /* hover = dashed hint, selected = solid ring (labelled by
       oer-block-label); distinct in shape, not just in colour */
    ::slotted(*:hover:not([data-hax-active])) {
      outline: 1px dashed var(--muted-foreground) !important;
      outline-offset: 4px !important;
    }
    ::slotted([data-hax-active]) {
      outline: 2px solid var(--primary) !important;
      outline-offset: 4px !important;
      border-radius: var(--radius-sm);
    }
  `,

  /* ---------- every HAX dialog: shadcn Dialog ---------- */
  // callers pass titlebar colours as inline custom properties on the host;
  // :host !important outranks an inline (outer, normal) declaration
  "simple-modal": css`
    :host {
      --simple-modal-titlebar-background: var(--background) !important;
      --simple-modal-titlebar-color: var(--foreground) !important;
      --simple-modal-titlebar-height: auto !important;
      --simple-modal-titlebar-line-height: 1.4 !important;
      --simple-modal-titlebar-padding: 0 !important;
      --simple-modal-header-background: var(--background) !important;
      --simple-modal-header-color: var(--foreground) !important;
      --simple-modal-content-container-background: var(--background) !important;
      --simple-modal-content-container-color: var(--foreground) !important;
      --simple-modal-buttons-background: var(--background) !important;
      --simple-modal-buttons-color: var(--foreground) !important;
      --simple-modal-button-background: var(--primary) !important;
      --simple-modal-button-color: var(--primary-foreground) !important;
      --simple-modal-backdrop-background: rgb(0 0 0 / 0.5) !important;
      --simple-modal-title-icon-size: 1rem !important;
      --simple-modal-titlebar-icon-height: 1rem !important;
      --simple-modal-titlebar-icon-width: 1rem !important;
      --dialog-border-radius: var(--radius-lg);
      /* size to content like shadcn Dialog, not a fixed 80vw x 80vh */
      --simple-modal-width: min(56rem, calc(100vw - 2rem)) !important;
      --simple-modal-max-width: calc(100vw - 2rem) !important;
      --simple-modal-height: auto !important;
      --simple-modal-min-height: 0 !important;
      --simple-modal-max-height: 85vh !important;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      font-family: var(--font-sans) !important;
    }
    /* [part=dialog] is the full-screen web-dialog host; the box itself is
       inside its shadow root and only reachable through its variables */
    web-dialog {
      --dialog-bg: var(--background);
      --dialog-color: var(--foreground);
      --dialog-border-radius: var(--radius-lg);
      --dialog-box-shadow: 0 0 0 1px var(--border), 0 16px 40px rgb(0 0 0 / 0.18);
      --dialog-backdrop-bg: transparent;
      --dialog-animation-duration: 0s;
      --dialog-padding: 0;
      /* the host is the full-screen fixed layer; dim with it directly (its
         own z-index:-1 #backdrop does not reliably paint over the page) */
      background: rgb(0 0 0 / 0.5) !important;
    }
    #titlebar {
      display: flex !important;
      align-items: center !important;
      gap: 0.5rem !important;
      min-height: 0 !important;
      padding: 1.25rem 1.5rem 0.75rem !important;
      background: var(--background) !important;
      color: var(--foreground) !important;
      border: 0 !important;
    }
    #simple-modal-title,
    [part="title"] {
      flex: 1;
      margin: 0 !important;
      padding: 0 !important;
      font-family: var(--font-sans) !important;
      font-size: 1.125rem !important;
      font-weight: 600 !important;
      line-height: 1.4 !important;
      letter-spacing: -0.01em !important;
      color: var(--foreground) !important;
      border: 0 !important;
    }
    #simple-modal-title *,
    .breadcrumbs {
      font-size: inherit !important;
      color: inherit !important;
    }
    .breadcrumbs simple-icon-lite,
    #simple-modal-title simple-icon-lite {
      --simple-icon-height: 1rem !important;
      --simple-icon-width: 1rem !important;
      width: 1rem !important;
      height: 1rem !important;
      color: var(--muted-foreground) !important;
    }
    #close {
      width: 2rem !important;
      height: 2rem !important;
      padding: 0 !important;
      border-radius: var(--radius-sm) !important;
      color: var(--muted-foreground) !important;
      --simple-icon-color: var(--muted-foreground);
      --simple-icon-width: 1rem !important;
      --simple-icon-height: 1rem !important;
    }
    #close:hover {
      background: var(--accent) !important;
    }
    #close:focus-visible,
    #close:focus-within {
      outline: 2px solid var(--ring) !important;
      outline-offset: 2px !important;
    }
    #headerbar {
      padding: 0 1.5rem !important;
    }
    #simple-modal-content,
    [part="content"] {
      margin: 0 !important;
      padding: 0.5rem 1.5rem 1.5rem !important;
      background: var(--background) !important;
      color: var(--foreground) !important;
      font-size: 0.875rem !important;
      line-height: 1.5 !important;
    }
    /* dialogs render their own footer; keep the modal's slot neutral */
    .buttons,
    [part="buttons"] {
      display: flex !important;
      justify-content: flex-end !important;
      gap: 0.5rem !important;
      padding: 0 1.5rem !important;
      background: var(--background) !important;
      border: 0 !important;
    }
  `,

  [DIALOG_TAGS]: css`
    :host {
      font-family: var(--font-sans) !important;
      font-size: 0.875rem;
      line-height: 1.5;
      color: var(--foreground);
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
    }
    h1,
    h2,
    h3,
    h4,
    h5 {
      font-family: var(--font-sans) !important;
      color: var(--foreground) !important;
      font-weight: 600 !important;
      letter-spacing: -0.01em !important;
      line-height: 1.3 !important;
      text-transform: none !important;
    }
    h1 {
      font-size: 1.25rem !important;
    }
    h2 {
      font-size: 1.125rem !important;
    }
    h3 {
      font-size: 1rem !important;
    }
    h4,
    h5 {
      font-size: 0.875rem !important;
    }
    p,
    li,
    label,
    td,
    th {
      font-size: 0.875rem !important;
    }
    p {
      color: var(--muted-foreground);
    }
    .buttons {
      display: flex !important;
      justify-content: flex-end !important;
      gap: 0.5rem !important;
      margin-top: 1rem !important;
      padding: 1rem 0 0 !important;
      background: transparent !important;
      border-top: 1px solid var(--border) !important;
    }
    /* collapsible settings groups -> shadcn Card with header */
    details.group {
      margin: 0 0 0.75rem !important;
      padding: 0 !important;
      background: var(--background) !important;
      border: 1px solid var(--border) !important;
      border-radius: var(--radius-lg) !important;
      box-shadow: none !important;
      overflow: hidden;
    }
    summary.group-summary {
      display: flex !important;
      align-items: center !important;
      gap: 0.5rem !important;
      min-height: 0 !important;
      padding: 0.75rem 1rem !important;
      background: transparent !important;
      color: var(--foreground) !important;
      font-size: 0.875rem !important;
      cursor: pointer;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      --simple-icon-color: var(--muted-foreground);
    }
    summary.group-summary simple-icon-lite {
      width: 1rem !important;
      height: 1rem !important;
      color: var(--muted-foreground) !important;
    }
    summary.group-summary h3,
    summary.group-summary h4 {
      flex: 1;
      margin: 0 !important;
      font-size: 0.875rem !important;
      font-weight: 600 !important;
    }
    summary.group-summary::after,
    summary.group-summary::marker {
      color: var(--muted-foreground) !important;
      font-size: 1rem !important;
      font-weight: 400 !important;
    }
    details.group[open] > summary.group-summary {
      border-bottom: 1px solid var(--border) !important;
    }
    .group-body {
      padding: 1rem !important;
    }
    .actions {
      display: flex !important;
      justify-content: flex-end !important;
      gap: 0.5rem !important;
      padding: 1rem 0 0 !important;
      background: transparent !important;
      border-top: 1px solid var(--border) !important;
    }
    button.action,
    .actions button {
      ${unsafeCSS(buttonVariants)}
      height: 2.25rem !important;
      padding: 0 1rem !important;
      font-size: 0.875rem !important;
      background: var(--primary) !important;
      color: var(--primary-foreground) !important;
      border: 0 !important;
      border-radius: var(--radius-md) !important;
    }
    button.action.secondary,
    button.action.cancel,
    .actions button.secondary,
    .actions button.cancel {
      background: var(--background) !important;
      color: var(--foreground) !important;
      border: 1px solid var(--input-border) !important;
    }
    .hax-modal-btn,
    button.hax-modal-btn {
      ${unsafeCSS(buttonVariants)}
      background: var(--primary) !important;
      color: var(--primary-foreground) !important;
      font-size: 0.875rem !important;
      height: 2.25rem !important;
      padding: 0 1rem !important;
      border-radius: var(--radius-md) !important;
      border: 0 !important;
    }
    .hax-modal-btn:hover {
      background: color-mix(in oklch, var(--primary) 90%, black) !important;
    }
    .hax-modal-btn.import,
    .hax-modal-btn.cancel,
    .hax-modal-btn.secondary,
    .hax-modal-btn[data-variant="outline"] {
      background: var(--background) !important;
      color: var(--foreground) !important;
      border: 1px solid var(--input-border) !important;
    }
    .hax-modal-btn.import:hover,
    .hax-modal-btn.cancel:hover,
    .hax-modal-btn.secondary:hover {
      background: var(--accent) !important;
      color: var(--accent-foreground) !important;
    }
    .hax-modal-btn.danger,
    .hax-modal-btn.delete {
      background: var(--destructive) !important;
      color: var(--destructive-foreground) !important;
    }
    button:focus-visible,
    a:focus-visible {
      ${focusRing}
    }
  `,

  /* confirm prompts: shadcn AlertDialog (outline cancel + destructive) */
  "hax-confirm-dialog": css`
    .confirm-shell {
      background: transparent !important;
      background-image: none !important;
      border: 0 !important;
      padding: 0 !important;
    }
    .message {
      margin: 0 0 1rem !important;
      font-size: 0.875rem !important;
      color: var(--muted-foreground) !important;
    }
    .actions {
      border-top: 0 !important;
      padding-top: 0 !important;
    }
    .actions button:not(.destructive) {
      background: var(--background) !important;
      color: var(--foreground) !important;
      border: 1px solid var(--input-border) !important;
    }
    .actions button:not(.destructive):hover {
      background: var(--accent) !important;
    }
    .actions button.destructive {
      background: var(--destructive) !important;
      color: var(--destructive-foreground) !important;
    }
  `,

  /* site settings launcher: shadcn Card grid */
  "haxcms-site-settings-dashboard": css`
    .dashboard-shell {
      display: flex !important;
      flex-direction: column !important;
      gap: 1.25rem !important;
    }
    .primary-grid,
    .advanced-grid {
      gap: 0.75rem !important;
    }
    .dashboard-item {
      height: auto !important;
      min-height: 0 !important;
    }
    .dashboard-action {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      justify-content: flex-end !important;
      gap: 0.75rem !important;
      width: 100% !important;
      height: 6rem !important;
      min-height: 0 !important;
      padding: 1rem !important;
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      font-weight: 500 !important;
      text-align: start !important;
      color: var(--card-foreground) !important;
      background: var(--card) !important;
      border: 1px solid var(--border) !important;
      border-radius: var(--radius-lg) !important;
      box-shadow: none !important;
      --simple-icon-height: 1.25rem !important;
      --simple-icon-width: 1.25rem !important;
      --simple-icon-color: var(--muted-foreground);
    }
    .dashboard-action.advanced {
      height: 4.5rem !important;
      flex-direction: row !important;
      align-items: center !important;
      justify-content: flex-start !important;
      --simple-icon-height: 1rem !important;
      --simple-icon-width: 1rem !important;
    }
    .dashboard-action simple-icon-lite,
    .dashboard-action simple-icon {
      width: 1.25rem !important;
      height: 1.25rem !important;
      color: var(--muted-foreground) !important;
    }
    .dashboard-action.advanced simple-icon-lite,
    .dashboard-action.advanced simple-icon {
      width: 1rem !important;
      height: 1rem !important;
    }
    .dashboard-action:hover {
      background: var(--accent) !important;
      color: var(--accent-foreground) !important;
      border-color: var(--accent) !important;
    }
    .dashboard-action:focus-visible {
      ${focusRing}
    }
    .advanced-heading {
      display: flex !important;
      align-items: center !important;
      gap: 0.75rem !important;
    }
    .advanced-title {
      margin: 0 !important;
      font-size: 0.75rem !important;
      font-weight: 500 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.06em !important;
      color: var(--muted-foreground) !important;
    }
    .advanced-rule {
      flex: 1;
      border: 0 !important;
      border-top: 1px solid var(--border) !important;
      height: 0 !important;
    }
  `,

  /* ---------- outline designer (site structure) ---------- */
  "outline-designer": css`
    :host {
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      --simple-icon-color: var(--muted-foreground);
    }
    .controls {
      display: flex !important;
      gap: 0.25rem !important;
      padding: 0 0 0.75rem !important;
      background: transparent !important;
    }
    .controls .control {
      height: 2rem !important;
      min-width: 2rem !important;
      background: transparent !important;
      --simple-toolbar-button-height: 2rem;
      --simple-toolbar-button-min-width: 2rem;
      --simple-toolbar-button-border-width: 1px;
      --simple-toolbar-button-border-color: var(--input-border);
    }
    #list {
      margin: 0 !important;
      padding: 0 !important;
      border: 1px solid var(--border) !important;
      border-radius: var(--radius-md) !important;
      overflow: hidden;
    }
    li.item {
      display: flex !important;
      align-items: center !important;
      min-height: 2.5rem !important;
      margin: 0 !important;
      padding: 0 0.5rem !important;
      border: 0 !important;
      border-bottom: 1px solid var(--border) !important;
      background: var(--background) !important;
      color: var(--foreground) !important;
      box-shadow: none !important;
    }
    li.item:last-child {
      border-bottom: 0 !important;
    }
    li.item:hover,
    li.item:focus-within {
      background: var(--accent) !important;
    }
    .item-leading-operations {
      display: flex !important;
      align-items: center !important;
      gap: 0.125rem !important;
      height: 2.5rem !important;
    }
    .drag-handle,
    .actions-menu-button,
    .collapse-slot simple-icon-button-lite,
    .controls .control {
      --simple-icon-height: 1rem !important;
      --simple-icon-width: 1rem !important;
    }
    .drag-handle,
    .actions-menu-button,
    .collapse-slot simple-icon-button-lite {
      width: 1.75rem !important;
      height: 1.75rem !important;
      background: transparent !important;
      border-radius: var(--radius-sm) !important;
      --simple-toolbar-button-height: 1.75rem;
      --simple-toolbar-button-min-width: 1.75rem;
    }
    .drag-handle {
      cursor: grab;
    }
    .label {
      font-size: 0.875rem !important;
      font-weight: 400 !important;
      color: var(--foreground) !important;
    }
    .actions-menu {
      font-size: 0.875rem !important;
    }
  `,

  /* ---------- Merlin: shadcn Command dialog ---------- */
  "super-daemon": css`
    web-dialog {
      --dialog-border-radius: var(--radius-lg);
      --dialog-padding: 0;
      --dialog-max-width: 40rem;
      --dialog-width: min(40rem, calc(100vw - 2rem));
      --dialog-background: var(--popover);
      --dialog-color: var(--popover-foreground);
      --dialog-backdrop-bg: rgb(0 0 0 / 0.5);
      --dialog-box-shadow: 0 16px 40px rgb(0 0 0 / 0.18);
    }
    web-dialog {
      --dialog-box-shadow: 0 0 0 1px var(--border), 0 16px 40px rgb(0 0 0 / 0.18);
      --dialog-bg: var(--popover);
      --dialog-color: var(--popover-foreground);
      --dialog-animation-duration: 0s;
    }
    web-dialog[open] {
      background: rgb(0 0 0 / 0.5) !important;
    }
    /* shadcn Dialog close: small ghost X in the corner */
    #cancel {
      position: absolute !important;
      top: 0.625rem !important;
      right: 0.625rem !important;
      z-index: 2;
      width: 1.75rem !important;
      height: 1.75rem !important;
      padding: 0 !important;
      border-radius: var(--radius-sm) !important;
      background: transparent !important;
      color: var(--muted-foreground) !important;
      opacity: 0.8;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      --simple-icon-color: var(--muted-foreground);
      --simple-icon-button-border-radius: var(--radius-sm);
    }
    #cancel:hover {
      opacity: 1;
      background: var(--accent) !important;
    }
  `,
  "super-daemon-ui": css`
    :host {
      font-family: var(--font-sans) !important;
      color: var(--popover-foreground) !important;
      background: var(--popover) !important;
      border-radius: var(--radius-lg);
    }
    super-daemon-search {
      border-bottom: 1px solid var(--border) !important;
      padding-right: 2.75rem !important;
    }
    super-daemon-row,
    super-daemon-row:nth-child(even),
    super-daemon-row:nth-child(odd) {
      background: transparent !important;
    }
    .results {
      padding: 0.25rem !important;
    }
    .no-results,
    .loading {
      padding: 1.5rem !important;
      text-align: center;
      font-size: 0.875rem !important;
      font-style: normal !important;
      color: var(--muted-foreground) !important;
    }
    .results-stats,
    .mini-results-counter {
      font-family: var(--font-sans) !important;
      font-size: 0.75rem !important;
      color: var(--muted-foreground) !important;
      background: transparent !important;
      border-top: 1px solid var(--border) !important;
      padding: 0.375rem 0.75rem !important;
    }
  `,
  "super-daemon-search": css`
    :host {
      display: flex !important;
      align-items: center !important;
      gap: 0.5rem !important;
      padding: 0 0.75rem !important;
      height: 3rem !important;
      --simple-icon-height: 1rem !important;
      --simple-icon-width: 1rem !important;
      background: transparent !important;
      border: 0 !important;
      border-radius: 0 !important;
      font-family: var(--font-sans) !important;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      --simple-icon-color: var(--muted-foreground);
    }
    simple-fields-field {
      flex: 1;
      margin: 0 !important;
      padding: 0 !important;
      background: transparent !important;
      --simple-fields-font-size: 0.875rem;
    }
    .program {
      font-size: 0.75rem !important;
      font-weight: 500 !important;
      padding: 0.125rem 0.5rem !important;
      border-radius: var(--radius-sm) !important;
      background: var(--muted) !important;
      color: var(--foreground) !important;
    }
    .voice {
      display: none !important;
    }
  `,
  "super-daemon-row": css`
    :host {
      display: block;
      font-family: var(--font-sans) !important;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      --simple-icon-color: var(--muted-foreground);
    }
    button {
      display: flex !important;
      align-items: center !important;
      gap: 0.75rem !important;
      width: 100% !important;
      min-height: 2.25rem !important;
      padding: 0.375rem 0.75rem !important;
      border: 0 !important;
      border-radius: var(--radius-sm) !important;
      background: transparent !important;
      color: var(--popover-foreground) !important;
      text-align: start !important;
      cursor: pointer;
    }
    :host([active]) button,
    :host([aria-selected="true"]) button,
    button:hover,
    button:focus-visible {
      background: var(--accent) !important;
      color: var(--accent-foreground) !important;
      outline: none !important;
    }
    .result-icon,
    .result-image {
      flex: none;
      width: 1rem !important;
      height: 1rem !important;
      --simple-icon-height: 1rem !important;
      --simple-icon-width: 1rem !important;
    }
    .label-wrap {
      flex: 1;
      min-width: 0;
    }
    .action {
      font-size: 0.875rem !important;
      font-weight: 400 !important;
      line-height: 1.25rem !important;
    }
    .path {
      font-size: 0.75rem !important;
      font-style: normal !important;
      color: var(--muted-foreground) !important;
      line-height: 1rem !important;
    }
    .tags {
      display: none !important;
    }
    .more {
      flex: none;
    }
  `,

  // stock top bar is hidden behind oer-editor-bar; shrink its spacer to match
  "haxcms-site-editor-ui": css`
    :host {
      --top-bar-height: 3.5rem !important;
      height: 3.5rem !important;
      min-height: 0 !important;
      overflow: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
  `,
  "app-hax-top-bar": css`
    :host {
      --top-bar-height: 3.5rem !important;
    }
  `,
};
