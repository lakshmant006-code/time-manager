# Summer — brand reference

Pulled from the live app (`src/styles/colors.css`, `src/styles/fonts.css`) so the video matches the product exactly.

## Colours
- Brand blue (primary accent): `#1900ff`
- Brand navy: `#212d5c`
- Ink (near-black): `#000000`
- White: `#ffffff`
- App surface (light bg): `#f8f9fa`
- Neutrals: gray-50 `#f9fafb` … gray-900 `#111827` (standard Tailwind-style ramp)
- Success: `#22c55e` / Danger: `#ef4444` / Warning: `#eab308`

## Type
- Display / headline: **Avant Gothic** (`OPTIAuvantGothic-Medium.woff2`, weight 600) — used for the big marketing headlines and the top bar wordmark.
- Body / UI: **Inter** (400–700) — used for everything else (labels, buttons, tables).

## Logo
- `logo-dark.png` — a white arch/dome shape with black "SUMMER" wordmark. Reads well over dark or colourful backgrounds (used on Login, nav, sidebar).
- `logo-light.png` — alternate build, lighter weight.
- The arch/dome shape is the core mark; never redraw it, use the PNG as-is.

## Signature visual motif
The app's own login and landing-page background is a custom WebGL "mesh drift" shader: slow-moving soft blobs of navy/blue/white, animated, no hard edges (`src/components/ShaderBackground.jsx`). This is the closest thing the product has to a "brand animation" already — worth referencing or literally reusing as a motion element so the video feels like an extension of the product rather than a separate asset.

## Product surface (what it actually looks like)
- Glassmorphic login: translucent frosted card, thin white border, dark glass buttons.
- Admin dashboard: left sidebar (Workspace / People sections), stat cards, data tables with pagination, a Cmd+K command palette.
- Employee side: Dashboard, Timesheet, Skills, Profile — same persistent sidebar.
- Landing page: hero over the shader background, 4 floating UI-mockup cards (timesheet sync, clock-in picker, running timer, crew on-time %), stats bar, feature grid.
