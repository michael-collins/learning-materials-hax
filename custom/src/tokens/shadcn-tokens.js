/**
 * shadcn-style semantic tokens (the "Twitter" theme used by
 * learning-materials-decapcms, assets/css/tailwind.css).
 *
 * Each token is declared with light-dark() so it follows the same switch DDD
 * uses: `color-scheme: light dark` on :root, and `color-scheme: only dark`
 * on body.dark-mode (set by haxcms-darkmode-toggle via store.darkMode).
 * Swap this file to re-skin the whole site; ddd-bridge.js stays the same.
 */
import { css } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";

export const shadcnTokens = css`
  :root {
    --background: light-dark(oklch(1 0 0), oklch(0 0 0));
    --foreground: light-dark(oklch(0.1884 0.0128 248.5103), oklch(0.9328 0.0025 228.7857));
    --card: light-dark(oklch(0.9784 0.0011 197.1387), oklch(0.2097 0.008 274.5332));
    --card-foreground: light-dark(oklch(0.1884 0.0128 248.5103), oklch(0.8853 0 0));
    --popover: light-dark(oklch(1 0 0), oklch(0 0 0));
    --popover-foreground: light-dark(oklch(0.1884 0.0128 248.5103), oklch(0.9328 0.0025 228.7857));
    --primary: light-dark(oklch(0.6723 0.1606 244.9955), oklch(0.6692 0.1607 245.011));
    --primary-foreground: oklch(1 0 0);
    --secondary: light-dark(oklch(0.1884 0.0128 248.5103), oklch(0.9622 0.0035 219.5331));
    --secondary-foreground: light-dark(oklch(1 0 0), oklch(0.1884 0.0128 248.5103));
    --muted: light-dark(oklch(0.9222 0.0013 286.3737), oklch(0.209 0 0));
    --muted-foreground: light-dark(oklch(0.45 0.0128 248.5103), oklch(0.5637 0.0078 247.9662));
    --accent: light-dark(oklch(0.9392 0.0166 250.8453), oklch(0.1928 0.0331 242.5459));
    --accent-foreground: light-dark(oklch(0.6723 0.1606 244.9955), oklch(0.6692 0.1607 245.011));
    --destructive: oklch(0.6188 0.2376 25.7658);
    --destructive-foreground: oklch(1 0 0);
    --border: light-dark(oklch(0.9317 0.0118 231.6594), oklch(0.2674 0.0047 248.0045));
    --input: light-dark(oklch(0.9809 0.0025 228.7836), oklch(0.302 0.0288 244.8244));
    --ring: oklch(0.6818 0.1584 243.354);

    --radius: 0.625rem;
    --radius-lg: var(--radius);
    --radius-md: calc(var(--radius) - 2px);
    --radius-sm: calc(var(--radius) - 4px);

    --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

    --sidebar-width: 16rem;
    --topbar-height: 3.5rem;
  }
`;
