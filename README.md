# Time Management

A React + Vite app for UBC BIM Services, built on the UBC BIM design system (design tokens and component library) and covering:

- **Landing** — marketing page (`/`)
- **Login** — sign in / sign up (`/login`)
- **Dashboard** — overview cards (`/app/dashboard`)
- **Manage Clients** — client list with status toggle and delete confirmation (`/app/clients`)
- **Register Client** — new client form (`/app/clients/new`)
- **Time Tracking** — start/stop timer and recent entries (`/app/time-tracking`)

Other sidebar sections (Organization, Roles, Teams, Users, Projects, Activities, Skills, Reports) are scaffolded as placeholder routes ready to be built out.

## Project structure

```
src/
  design-system/   design system components (primitives, patterns, layout, overlays, data)
  styles/          design tokens (colors, typography, spacing, radius, shadows) as CSS custom properties
  components/      shared app-level components (e.g. AppShell)
  pages/           route-level screens
  mocks/           mock data used until a backend is wired up
```

## Development

```
npm install
npm run dev
```

## Build

```
npm run build
```
