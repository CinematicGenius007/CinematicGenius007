# CLAUDE.md

## Project Overview

This is Ayush Saini's personal portfolio — hosted at [cinematicgenius007.com](https://www.cinematicgenius007.com). The persona era (11 → 6 modes, dial navigation) is over: the site is now **one single-page experience, "CINEMATIC GENIUS 007"** — the career presented as a film (countdown leader, title card, opening credits, box-office numbers, three acts, deleted scenes, project posters, a LIGHTS OUT reaction mini-game, an end-credit roll, and a post-credits contact scene with a downloadable resume PDF).

## Tech Stack

- **React 18** with **TypeScript**
- **Vite** for build tooling
- **pnpm** as package manager
- Plain CSS (`src/styles.css`) — no CSS framework; GSAP (via `src/engine/animation.ts`) is the only animation dependency

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Type-check + build to dist/
pnpm preview    # Preview production build
```

## Project Structure

```
src/
  App.tsx                  # Shell: providers + FilmPage + chat/contact widgets;
                           # strips legacy ?as= params (old persona links land here)
  main.tsx                 # React entry point
  styles.css               # ALL styles, append-only; live section is the final
                           # "CINEMATIC GENIUS 007 (cg-)" block — older prefixed
                           # sections (prc-, pmb-, designer-, evd-, adp-, os-,
                           # apx-, dial__…) are dead code kept per convention
  engine/
    animation.ts           # GSAP kernel (only place gsap is imported)
    useMotionPreference.tsx# Motion governor: tier + prefers-reduced-motion →
                           # [data-motion] attr (none|calm|full)
  pages/
    FilmPage.tsx           # The one page (incl. LIGHTS OUT game component)
    filmContent.ts         # All copy/data for the page
  content/
    resumeFacts.ts         # Canonical facts from the real resume — source of truth
    contacts.ts            # Email/social links
    chatPrompts.ts         # Single system prompt + greeting/suggestions for chat
    contactCopy.ts         # Copy for the contact dialog
  components/
    ThemeProvider.tsx      # Sets --mode-* CSS vars from the single filmTheme
    ChatWidget.tsx         # Floating AI chat (Vercel AI SDK → /api/chat)
    ContactWidget.tsx      # Floating contact form (→ /api/contact)
api/                       # Vercel edge handlers (chat.ts, contact.ts)
public/                    # Static assets, incl. Ayush_Saini_Resume.pdf (downloadable)
dist/                      # Build output (gitignored)
```

## Key Conventions

- **One page, no routing.** There is no persona/mode system, no dial, no `?as=` routing. `App.tsx` deletes any legacy `?as=` query param on load so old links resolve to the film. Do not reintroduce mode machinery.
- **Content lives in data modules, not JSX**: `src/pages/filmContent.ts` and `src/content/`. Updating copy means editing those, not page markup. `resumeFacts.ts` is authoritative for factual claims.
- **CSS is one append-only file** (`src/styles.css`, ~20k lines). The live section is the final `cg-` block. Don't restyle old dead sections; if reworking the page, append a new commented section with a fresh short prefix. Watch specificity when overriding earlier rules.
- **Motion is gated**: all animation keys off `[data-motion]` set by `useMotionPreference` (`none|calm|full`). Static-first rule: everything must be fully visible/readable with no JS or at `none`; GSAP/CSS animations only subtract visibility at `full` (CSS keyframes gated behind `[data-motion="full"]`). GSAP goes through `src/engine/animation.ts`, never ad-hoc imports.
- **The visual identity** (cg- block): tungsten black `#0b0a08`, bone `#f2ead8`, premiere gold `#e0a63c`, signal red `#e3312b`; type = Six Caps (display) + DM Serif Display italic (titles/narration) + JetBrains Mono (timecode/slates) + DM Sans (body). Film devices carry structure: slates, timecode HUD, sprocket rails, letterbox, subtitle lines, credit roll.
- **Storage keys**: `cg-leader-seen` (sessionStorage — countdown plays once per session), `cg-lightsout-best` (localStorage — game PB).
- No external UI libraries or component frameworks (GSAP is the exception) — keep it that way unless there is a strong reason.

## Deployment

- The live custom domain is served by Vercel behind Cloudflare (`x-vercel-id` is present on production responses).
- Serverless request handlers live in `api/`; keep provider credentials server-only and never expose them through `VITE_` variables.
- Confirm the linked Vercel project's Git/deploy settings before assuming that a push will deploy. Do not deploy from an audit or implementation pass unless explicitly requested.
