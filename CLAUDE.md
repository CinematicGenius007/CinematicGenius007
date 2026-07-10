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
  App.tsx                  # Shell: resolves current mode, mounts persona page + Dial + TransitionLayer
  main.tsx                 # React entry point
  styles.css               # ALL styles, append-only (see conventions)
  engine/
    useMode.ts             # URL-driven mode state (?as= query param, popstate sync)
    registry.ts            # Persona registry: lazy-loaded pages, labels, themes, preload
    animation.ts           # GSAP animation kernel
    transitions.ts         # Persona-to-persona transition definitions, view ordering
    useMotionPreference.tsx # Motion tier governor (respects reduced motion)
  modes/
    types.ts               # ModeId, Persona, ModeTheme types
    personas.ts            # Persona definitions (theme + emphasis per mode)
    themes.ts              # Theme tokens per persona
    icons.tsx              # Persona icons
  pages/                   # One page component per persona (EngineerPage, PmPage, DesignerPage,
                           # EverydayPage, AdaptationPage, RetroPage) + PdfPage (utility route)
                           # + sibling *Content.ts content modules
  sections/
    Dial.tsx               # Quarter-arc dial navigation (bottom-right pill; scroll/drag to spin,
                           # click to switch, Cmd/Ctrl+K toggles; poof cut on selection)
  components/
    ThemeProvider.tsx      # Applies theme tokens
    TransitionLayer.tsx    # Renders persona transition cuts
  content/                 # Shared content: profile, contacts, types, engineer graph
public/                    # Static assets
dist/                      # Build output (gitignored)
```

## Key Conventions

- **Personas/modes**: the site is 6 "personas" in the dial rotation (engineer, pm, designer, everyday, adaptation, retro) plus `pdf` as a utility route (printable resume — valid at `?as=pdf` but outside the dial; reachable via resume links and the engineer terminal's `resume` command). Navigation is via the `?as=` URL query param (no router) — `src/engine/useMode.ts` reads it, `setMode()` pushes history. `engineer` is the default and omits the param. Retired personas (signal, data, codebase, anime, director — see `RetiredModeId`) redirect via the `LEGACY` map in `useMode.ts`; keep those redirects working.
- **Adding/changing a persona**: page component in `src/pages/`, content in a sibling `*Content.ts` (or `src/content/` if shared), theme in `src/modes/themes.ts`, persona entry in `src/modes/personas.ts`, registry entry in `src/engine/registry.ts` (pages are lazy-loaded with preload hooks), transition wiring in `src/engine/transitions.ts`.
- **Content lives in data modules, not JSX**: typed arrays/constants in `src/pages/*Content.ts` and `src/content/`. Updating copy means editing those, not page markup.
- **CSS is one append-only file** (`src/styles.css`, ~18k lines). Each persona rework appends a new commented "v2" section with a fresh short class prefix (current live prefixes: `prc-` engineer, `pmb-` PM, `designer-` designer, `evd-`/`everyday-` everyday, `adp-` adaptation, `os-` retro, `dial__` nav). Don't restyle old sections in place — append a new section with a new prefix. Watch specificity when overriding older rules from an appended block (e.g. `.everyday-letter p` beats `.everyday-letter__lede`).
- **Motion is gated**: animations key off the `[data-motion]` attribute set by `useMotionPreference` (theme declares a motion tier; reduced-motion preference downgrades it). GSAP work goes through `src/engine/animation.ts`, not ad-hoc imports.
- **PdfPage is the odd one out**: it takes `{ dark, onToggleTheme }` instead of `{ mode }`, and `App.tsx` owns that special case.
- No external UI libraries or component frameworks (GSAP for animation is the exception) — keep it that way unless there is a strong reason.

## Deployment

- The live custom domain is served by Vercel behind Cloudflare (`x-vercel-id` is present on production responses).
- Serverless request handlers live in `api/`; keep provider credentials server-only and never expose them through `VITE_` variables.
- Confirm the linked Vercel project's Git/deploy settings before assuming that a push will deploy. Do not deploy from an audit or implementation pass unless explicitly requested.
