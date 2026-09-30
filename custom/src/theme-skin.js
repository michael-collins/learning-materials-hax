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
    /* shadcn SidebarMenuSub rows: h-7, no icons; the sub-menu's own rule
       replaces HAX's per-item left border */
    :host([is-nested]) {
      border-left: 0 !important;
      margin-left: 0 !important;
    }
    :host([is-nested]) button {
      min-height: 1.75rem !important;
      padding: 0.25rem 0.5rem !important;
    }
    :host([is-nested]) simple-icon-lite,
    :host([is-nested]) .no-icon {
      display: none !important;
    }
    /* top-level rows without an icon keep the label column aligned */
    :host(:not([is-nested])) .no-icon {
      display: inline-block !important;
      flex: none;
      width: 1rem;
      height: 1rem;
    }
    /* section rows leave room for the collapse chevron */
    :host([slot="heading"]) button {
      padding-right: 2rem !important;
    }
    /* per-row page-operations pencil; the page options menu covers it */
    .ops {
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
  // nested pages get the shadcn sub-menu rule on the left (mx-3.5 px-2.5)
  "map-menu-submenu": css`
    :host {
      --map-menu-item-height: 2rem;
    }
    ::slotted(map-menu-builder) {
      display: flex !important;
      flex-direction: column !important;
      gap: 0.125rem !important;
      margin: 0.125rem 0 0.25rem 0.875rem !important;
      padding: 0 0 0 0.625rem !important;
      /* --border is ~1.1:1 on the sidebar's card background; use a
         perceivable mid tone for the nesting rule */
      border-left: 1px solid color-mix(in oklch, var(--foreground) 22%, transparent) !important;
    }
  `,
  // HAX's sliding active-page bar; the active row's accent replaces it
  "map-menu-container": css`
    #activeindicator {
      display: none !important;
    }
  `,
  "map-menu-builder": css`
    /* HAX tree-connector ticks; the sub-menu rule replaces them */
    :host::after,
    :host::before {
      display: none !important;
    }
    .wrapper {
      display: flex !important;
      flex-direction: column !important;
      gap: 0.125rem !important;
    }
  `,
  // sidebar sections are a11y-collapse#container inside map-menu-submenu:
  // no accordion rules, chevron on the right that points right when closed
  "a11y-collapse": css`
    :host(#container) {
      border: 0 !important;
      margin: 0 !important;
    }
    :host(#container)::before,
    :host(#container)::after {
      display: none !important;
    }
    :host(#container) #heading {
      position: relative !important;
      align-items: center !important;
    }
    :host(#container) #text {
      flex: 1 !important;
      min-width: 0 !important;
    }
    :host(#container) #expand {
      position: absolute !important;
      right: 0.375rem !important;
      top: 50% !important;
      width: 1.25rem !important;
      height: 1.25rem !important;
      transform: translateY(-50%) !important;
      color: var(--muted-foreground) !important;
      --simple-icon-height: 1rem !important;
      --simple-icon-width: 1rem !important;
      --simple-icon-color: var(--muted-foreground);
      border-radius: var(--radius-sm);
    }
    /* stock fades the chevron in on hover only; keep it visible */
    :host(#container) #expand {
      opacity: 1 !important;
      visibility: visible !important;
    }
    :host(#container:not([expanded])) #expand {
      transform: translateY(-50%) rotate(-90deg) !important;
    }
    :host(#container) #expand:hover {
      background: var(--accent) !important;
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
