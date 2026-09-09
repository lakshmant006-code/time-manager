# Project notes

## Stack

Plain React + Vite (JS/JSX, no TypeScript, no build-time type checking).
Styling is a hand-built CSS custom-property design system under `src/styles/`
(imported via `src/styles/design-system.css`) — there is no Tailwind CSS and
no shadcn/ui setup in this project.

## Loading indicator

`src/components/Loader.jsx` (with `src/styles/loader.css`) is the standard
loading indicator for this app — a 3D animated cube/tile loader in the brand
blue (`var(--brand-blue)`). Whenever a loading state, spinner, or "loading"
UI is requested, use this component rather than building a new one.

```jsx
import { Loader } from '../components/Loader';

<Loader />
```
