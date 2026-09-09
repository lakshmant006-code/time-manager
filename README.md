# Time Management

A React + Vite app for UBC BIM Services, built on the UBC BIM design system (design tokens and component library). Login splits into two flat-vs-hierarchical workflows, matching the app's information architecture:

- **Landing** — marketing page (`/`)
- **Login** — sign in as Employee or Admin (`/login`)

**Employee area** — flat, three screens, no sidebar (`/employee/*`):
- **Timesheet** — start/stop timer and recent entries
- **Skills** — skills and certifications, with an add-skill form
- **Profile** — editable account details

**Admin area** — sidebar-driven dashboard (`/app/*`):
- **Dashboard** — overview cards (`/app/dashboard`)
- **Manage Clients** — full CRM: searchable client list, a client profile (Contact / Projects / Invoices tabs), and Add Client with Manual or Bulk Upload paths (`/app/clients`)
- **Manage Roles** — role list with module/user counts, a role detail (Permissions / Assigned Users tabs), and Add Role with a per-module access checklist (`/app/roles`)
- **Time Tracking** — start/stop timer and recent entries (`/app/time-tracking`)

Other sidebar sections (Organization, Teams, Users, Projects, Activities, Skills, Reports) are scaffolded as placeholder routes ready to be built out.

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
