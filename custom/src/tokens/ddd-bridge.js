/**
 * Bridge: point HAX's DDD design-system tokens at the shadcn semantic tokens
 * from shadcn-tokens.js, so stock HAX blocks, the site menu and (partly) the
 * editor chrome pick up the same palette, radius and fonts.
 *
 * Two tiers:
 * 1. Semantic DDD tokens (--ddd-theme-primary, -accent, -default-link, fonts,
 *    radius) are remapped globally. These are meant to be themed.
 * 2. The editor chrome uses *named* palette colours (skyBlue, coalyGray,
 *    limestoneGray, white) instead of semantic ones, so those names are only
 *    remapped inside the editor elements. Redefining them site-wide would
 *    change every block that asks for, say, "skyBlue" on purpose.
 */
import { css } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";

export const dddBridge = css`
  /* :root:root out-ranks DDD's own :root declarations, which load after ours */
  :root:root {
    /* semantic colour */
    --ddd-theme-primary: var(--primary);
    --ddd-theme-accent: var(--accent);
    --ddd-theme-default-link: var(--link);
    --ddd-theme-default-link80: var(--link);
    --ddd-theme-default-background: var(--background);
    --ddd-theme-default-error: var(--destructive);
    --ddd-theme-header-border-color: var(--border);

    /* type */
    --ddd-font-primary: var(--font-sans);
    --ddd-font-secondary: var(--font-sans);
    --ddd-font-navigation: var(--font-sans);

    /* shape */
    --ddd-radius-xs: var(--radius-sm);
    --ddd-radius-sm: var(--radius-sm);
    --ddd-radius-md: var(--radius-md);
    --ddd-radius-lg: var(--radius-lg);
    --ddd-border-sm: 1px solid var(--border);
    --ddd-border-md: 1px solid var(--border);

    /* site-menu / map-menu */
    --site-menu-color: var(--foreground);
    --site-menu-background-color: transparent;
    --site-menu-container-background-color: transparent;
    --map-menu-item-a-color: var(--muted-foreground);
    --map-menu-item-a-active-color: var(--foreground);
    --map-menu-item-a-active-background-color: var(--accent);
    --map-menu-item-border-radius: var(--radius-md);
    --map-menu-item-a-text-decoration: none;
    --map-menu-header-a-text-decoration: none;
    --map-menu-font-size: 0.875rem;
    --site-breadcrumb-last-color: var(--foreground);
  }

  /* tier 2: editor chrome only */
  haxcms-site-editor-ui,
  hax-tray,
  super-daemon {
    --ddd-theme-default-skyBlue: var(--primary);
    --ddd-theme-default-coalyGray: var(--foreground);
    --ddd-theme-default-limestoneGray: var(--muted);
    --ddd-theme-default-white: var(--background);
    --ddd-theme-default-error: var(--destructive);
  }

  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: var(--font-sans);
  }
`;
