# CLAUDE.md

## Project Overview

This is Ayush Saini's personal portfolio — a newspaper-styled single-page React application hosted at [cinematicgenius007.com](https://www.cinematicgenius007.com). The design follows a print/broadsheet aesthetic ("The Debugger's Gazette").

## Tech Stack

- **React 18** with **TypeScript**
- **Vite** for build tooling
- **pnpm** as package manager
- Plain CSS (`src/styles.css`) — no CSS framework

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Type-check + build to dist/
pnpm preview    # Preview production build
```

## Project Structure

```
src/
  App.tsx         # All page content and component logic (single file)
  main.tsx        # React entry point
  styles.css      # All styles
  vite-env.d.ts   # Vite type declarations
public/           # Static assets
dist/             # Build output (gitignored)
```

## Key Conventions

- All page content (experiences, skills, notes) lives as typed arrays/constants at the top of `App.tsx`. Adding or updating content means editing those arrays.
- No routing — this is a single page.
- CSS class names follow a BEM-like semantic naming convention (e.g. `nameplate`, `lead-story`, `timeline-item`, `ledger-card`).
- No external UI libraries or component frameworks — keep it that way unless there is a strong reason.
- The commented-out `life-signal` SVG block in `App.tsx` is intentionally left in — do not remove it without checking with the owner.

## Deployment

- Hosted via GitHub Pages with a custom domain (`cinematicgenius007.com`), configured via the `CNAME` file in the repo root.
- Pushing to `main` does not auto-deploy — build and deploy manually if needed.
