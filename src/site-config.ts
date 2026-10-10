/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — the one file to edit when re-skinning this app.
 * ─────────────────────────────────────────────────────────────
 *  Everything brand-specific lives here. Change these values and the
 *  whole UI updates (ThemeProvider injects the colors into CSS variables
 *  that the entire design system references via var(--color-brand-*) /
 *  var(--color-accent)).
 *
 *  Configurable here:
 *    • name / tagline / description  → shown in sidebar, titles, metadata
 *    • colors.brand (50–700)         → primary accent scale: buttons, glows,
 *                                       ambient light, links, active states,
 *                                       progress, focus rings, glass highlights
 *    • colors.accent                 → secondary accent (e.g. dashboard banner gradient)
 *    • logo                          → replace the image served at /api/logo
 *                                       (falls back to the name text if missing)
 *
 *  NOT configured here (intentionally): the dark surface palette + fonts live
 *  in app/globals.css (@theme). They are the base theme, shared across brands,
 *  and are where a future light mode will be defined.
 */
export const siteConfig = {
  name: 'Creative Media',
  tagline: 'نظام إدارة وتشغيل Creative Media',
  description:
    'للدعاية والإعلان والتشطيبات والواجهات',

  // Logo: swap the asset served at /api/logo. Dark chrome (sidebar, login) asks
  // for `logo-dark.*` and falls back to `logo.*` when there isn't one, so the
  // dark lockup is optional. It carries the mark on its white disc with a
  // light wordmark, since the standard teal wordmark goes muddy on near-black.
  // `invertLogoInSidebar` flips the fallback for logos that need it;
  // `showNameUnderLogo` renders the name beneath the mark.
  invertLogoInSidebar: false,
  showNameUnderLogo: false,

  colors: {
    // Primary brand scale — this is the accent color of the entire app.
    // Generate a full 50→700 ramp of your brand color and drop it in.
    brand: {
      50: '#FFF9EB',
      100: '#FCEFC7',
      200: '#F8DE93',
      300: '#F5CB5F',
      400: '#F2B93B',
      500: '#EFA406',
      600: '#D18104',
      700: '#A95E05',
    } as Record<number, string>,
    // Secondary accent (used sparingly, e.g. the dashboard welcome gradient).
    accent: '#D18104',
  },
};
