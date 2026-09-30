/**
 * shadcn skin for HAX's public navigation components used by
 * custom-oer-docs-theme (sidebar menu, breadcrumb). Registered through the
 * same shadow-style mechanism as the editor chrome.
 */
import { css, unsafeCSS } from "./lit.js";
import { LUCIDE_ICONS } from "./editor/lucide-icons.generated.js";

const chevron = unsafeCSS(`url("${LUCIDE_ICONS["icons:chevron-right"]}")`);

export const themeSkin = {
  // shadcn Sidebar menu items
  "map-menu-item, map-menu-header": css`
    :host {
      font-family: var(--font-sans) !important;
      --simple-icon-height: 1rem;
      --simple-icon-width: 1rem;
      --simple-icon-color: var(--muted-foreground);
    }
    a {
      text-decoration: none !important;
      color: inherit !important;
    }
    button {
      display: flex !important;
      align-items: center !important;
      gap: 0.5rem !important;
      width: 100% !important;
      min-height: 2rem !important;
      margin: 0 !important;
      padding: 0.375rem 0.5rem !important;
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
      font-weight: 400 !important;
      line-height: 1.25rem !important;
      text-align: start !important;
      color: var(--muted-foreground) !important;
      background: transparent !important;
      border: 0 !important;
      border-radius: var(--radius-md) !important;
      cursor: pointer;
    }
    button:hover {
      background: var(--accent) !important;
      color: var(--foreground) !important;
    }
    /* "selected" is set on every visible row; "active" marks the page */
    :host([active]) button,
    button[aria-current="page"] {
      background: var(--accent) !important;
      color: var(--foreground) !important;
      font-weight: 500 !important;
    }
    button:focus-visible {
      outline: 2px solid var(--ring) !important;
      outline-offset: -2px !important;
    }
    .no-icon {
      display: none !important;
    }
    simple-icon-lite,
    simple-icon {
      flex: none;
      width: 1rem !important;
      height: 1rem !important;
      color: var(--muted-foreground) !important;
    }
    .title {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `,
  // nested pages get the shadcn sub-menu rule on the left
  "map-menu-submenu": css`
    #container,
    .container,
    #content,
    slot:not([name]) {
      border-left: 0 !important;
    }
    :host {
      --map-menu-item-height: 2rem;
    }
    ::slotted(*) {
      margin-left: 0.875rem !important;
      padding-left: 0.5rem !important;
      border-left: 1px solid var(--border) !important;
    }
  `,
  "site-breadcrumb": css`
    :host {
      font-family: var(--font-sans) !important;
      font-size: 0.875rem !important;
    }
    ol {
      display: flex !important;
      flex-wrap: wrap;
      align-items: center !important;
      gap: 0.375rem !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    li {
      display: inline-flex !important;
      align-items: center !important;
      gap: 0.375rem !important;
      color: var(--muted-foreground) !important;
    }
    a {
      background: transparent !important;
      color: var(--muted-foreground) !important;
      padding: 0 !important;
      text-decoration: none !important;
      border-radius: var(--radius-sm);
    }
    a:hover {
      color: var(--foreground) !important;
    }
    a:focus-visible {
      outline: 2px solid var(--ring) !important;
      outline-offset: 2px !important;
    }
    /* HAX renders no separators; shadcn uses a chevron */
    li:not(:last-child)::after {
      content: "";
      width: 0.875rem;
      height: 0.875rem;
      background: currentColor;
      -webkit-mask: ${chevron} center / contain no-repeat;
      mask: ${chevron} center / contain no-repeat;
    }
    li:last-child,
    li:last-child span {
      color: var(--foreground) !important;
      font-weight: 400 !important;
      background: transparent !important;
    }
  `,
};
