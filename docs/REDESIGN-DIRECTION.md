# Redesign Direction — Research Synthesis & Persona Verdicts

*July 2026. Input: 6 reference-site deconstructions (confirmed stacks/tokens via source inspection + Awwwards jury data), 2026 web-tech ceiling research, inspiration image set, and a visual audit of all current persona pages.*

---

## 1. Diagnosis — why the current pages "feel good for a second, then fade"

The audit of all 11 personas shows the same pattern everywhere: **competent genre pastiche without a committed interaction idea.**

- Every page is a *skin* — the same content re-themed. The theme is announced (debugger, case file, OS, manga, cinema) but the page doesn't *behave* like its metaphor beyond the first viewport. A visitor "gets it" in 5 seconds and there is nothing left to discover — that's the "fades away" feeling.
- Five of eleven pages are dark-technical variants (engineer, signal, codebase, director, anime OP). Sameness across personas kills the whole "same source, different render" premise.
- Motion is decorative (fade-ins, count-ups), not structural. Award-tier sites tie *specific* motion mechanics to *specific* meaning; generic fade-up-on-scroll is the #1 amateur signal identified in the research.
- Craft budget is spread across 11 pages. Every reference site that wins does ONE idea deeply. Eleven shallow ideas < five deep ones.

**The premise itself is world-class.** "Same source, different render — one career, N renderers" is a stronger governing metaphor than most SOTD winners have. The problem is dilution, not concept.

## 2. What the research converged on (ranked by impact)

1. **One-sentence governing metaphor, obeyed everywhere.** Bruegel = "the painting comes alive." Samuel Day = "inside my mind." Every design decision traces to that sentence, and conventional best-practice is *sacrificed* for it (Samuel Day: usability 6.92, creativity 8.45 — rewarded, not punished). A personal portfolio can afford this trade; a commerce site can't.
2. **Small named color-token systems (2–6 colors), sampled from the metaphor's source material** — Bruegel's palette was programmatically extracted from the paintings (#000/#fff/#ECD06F). Not "a vintage filter" — period-authentic sampling.
3. **Typography carries identity, not imagery.** 4 of 6 references have near-zero photography. The move: a *voice* font + a *structure* font + a *label/accent* font with strict role separation (Cantor8 uses Fragment Mono as the HEADLINE face — mono-as-voice makes marketing copy read like a spec sheet).
4. **Content-specific motion, never generic.** iamthecode.xyz has a literal scroll *ruler* (engineer's workbench metaphor made mechanical). Samuel Day scrubs a 32-second authored Lottie through the whole scroll. Apple's pattern: pre-rendered frame sequence on canvas, scroll position = frame index, section pinned until the one idea plays out.
5. **One driving scalar, many synchronized outputs.** The Codrops React+Vite+GSAP portfolio breakdown (May 2026, our exact stack): a single 0→1 progress number drives shader uniforms, clip-paths, and DOM transforms together. That's what "intentional" motion is mechanically.
6. **Motion frequency inversely proportional to use frequency** (rauno.me). Elaborate choreography for one-time moments (hero, persona switch); zero animation on things touched repeatedly (nav). And **don't replay spent delight** — boot/intro sequences play on first visit only.
7. **Contextual cursor states** — cursor swaps to telegraph the available interaction (Samuel Day has 4+ states). Instructional, not decorative. Cheap, high perceived craft.
8. **No WebGL required.** Every verified award reference ships on GSAP/Lottie/CSS or even Webflow/Framer. Our GSAP kernel is the right architecture; it does not need a three.js rewrite to compete. (WebGL/OGL stays available as a *scoped* accent, not a foundation.)

## 3. 2026 tech unlocks relevant to us

| Unlock | Status | What it changes for us |
|---|---|---|
| **GSAP 100% free** (SplitText, ScrollTrigger, ScrollSmoother, MorphSVG, DrawSVG, Inertia) | Since Apr 2025 | Per-character text choreography + scroll scrubbing with zero licensing. Biggest single unlock. |
| **View Transitions API (same-document)** | Baseline Oct 2025 (incl. Firefox 144+) | Persona swaps: browser auto-morphs matched `view-transition-name` elements; GSAP layers choreography on top. Fits our router-less `?as=` pattern exactly. |
| **CSS scroll-driven animations** (`animation-timeline`) | Chrome + Safari 26; Firefox still flagged | Off-main-thread scroll effects for cheap; needs GSAP fallback for Firefox. |
| **Variable font axis animation** | Compositor-cheap | Weight/width morph on scroll/hover without layout shift. |
| **SVG `feTurbulence`/`feDisplacementMap`** | Mature | Print misregistration, paper grain, glitch — keep filtered regions small. |
| **Canvas frame-scrub (Apple pattern)** | Just canvas 2D | Pre-rendered sequences scrubbed by scroll for hero moments. |
| **Lottie scroll-scrub** | Mature | Authored vector narrative scrubbed by scroll (Samuel Day's 9.0/10 motion score mechanism). |

## 4. Verdict: 11 personas → 6

Cut is not loss — it's concentration. Redirect retired `?as=` values to nearest survivor so old links never break.

| Persona | Verdict | Reasoning |
|---|---|---|
| **engineer** | **KEEP — flagship rebuild** | Default view = first impression. Currently generic dark-dev. Highest ROI. |
| **pm** | **KEEP — light pass** | Already the strongest page (Program Briefing). Add Zariya as program-of-record case study. |
| **designer** | **KEEP — finish v2 in flight** | Bauhaus "inspection surface" direction is right; commit to the inspection mechanic (below). |
| **everyday** | **KEEP — the restraint page** | The quiet letter is the taste-proof counterweight (rauno principle). Absorbs the "human" audience. |
| **retro** | **KEEP — becomes the playground** | SAINI.OS has the most genuine character today. Absorbs `codebase` (as a Terminal/IDE app window) and `pdf`'s print function (Print.app). |
| **anime + director** | **MERGE → "The Adaptation"** | Two narrative-cinema pages is one too many. Merge into one page with a killer mechanic (below). |
| **signal** | **CUT → redirect to engineer** | Detective graph = re-skin of engineer's service map. Same content, same audience. |
| **data** | **CUT → redirect to engineer** | Notebook concept folds into engineer's live/queryable identity. |
| **codebase** | **CUT → app inside retro** | VS Code replica is a saturated genre; as a *working app in SAINI.OS* it becomes charming instead of cliché. |
| **pdf** | **DEMOTE to utility** | Printable resume stays (it has a real job) — reachable as a print action everywhere + Print.app in retro. Not a persona. |

## 5. Per-persona direction (the one idea, committed)

### engineer — "The page is a running process" (flagship)
Not a picture of a system — a system. One sentence: *you didn't open a portfolio, you attached to a live process.*
- **Attach sequence** (first visit only): the page traces its own real startup — actual `performance` marks, real font/data load times, rendered as an attach log. Self-referential and true.
- **Career as request trace**: scroll drives one request traveling through the service map (single progress scalar; ScrollTrigger + DrawSVG on edges). Each node pins, expands with real log lines (achievements as structured logs), releases. Apple's pin-and-scrub discipline: one idea per viewport.
- **Live data where honest**: real visitor counter ("you are request #N" via PostHog), real GitHub activity, real uptime of zariya/optmyzr surfaces.
- **A real terminal**: `ayush --help`, `trace career`, `cat projects/zariya.md`, `curl /contact`. The queryable-profile idea from the data page lives here.
- Type: mono-as-voice (Cantor8 lesson) — mono headlines make the whole page read like a spec sheet. Palette sampled from an actual terminal theme, 3 tokens max.

### pm — Program Briefing (light pass, no rebuild)
Add Zariya Recruit as the program of record: 0→1 architecture ownership, AI interviews + call screening + ATS scope, 100k+ interview minutes KPI count-up, ISB/MeitY proof points. The decision-log scrubber gets Zariya decisions (real ones: voice pipeline, interview scoring). Keep everything else.

### designer — "The page inspects itself" (finish v2)
The bauhaus surface is right. The commit: the ANNOTATE/GRID tools in the hero must *actually work on the entire page* — toggling overlays a real baseline grid, spec callouts (type sizes, spacing values, color tokens) on every element. The portfolio's own design system is the exhibit. SVG turbulence for print misregistration on hover, kept to small regions. Multi-state cursor: measure / annotate / inspect.

### the adaptation (anime × director merge) — "Dramatization vs. what actually happened"
The invented-for-us mechanic: the career told as a dramatized manga/film — panels drawing themselves in (DrawSVG), screentone (feTurbulence), pinned spreads, JP typography kept — **with a Director's Commentary toggle**. Flip it and each dramatic panel gets deadpan redline annotations: "EPISODE 4: THE ARCHITECTURE RESET" → *"what actually happened: I spent six hours on a config file."* Two renders of the same scene — the site's whole premise, enacted on one page. Skip-OP stays, plays once.

### retro — SAINI.OS becomes real (the playground)
Depth from working apps, not more chrome: draggable/stackable windows, Terminal (absorbing codebase page's content), Sudoku.app (the solver already exists — let it run in a window), Mail.app (contact), Print.app (the PDF resume). Boot sequence first visit only. This page earns time-on-site because things *do* things.

### everyday — "The Letter" (restraint)
Nearly right already. Keep the jargon-tap mechanic (it's genuinely good). Refine: variable-font warmth, first-load-only entrance, no further motion. Its job is to prove the maximalism elsewhere is a choice.

## 6. Sequencing

1. **Finish designer v2** (in flight, uncommitted — ship it first).
2. **Cuts + redirects** (signal/data/codebase/pdf → survivors; registry/transitions/Switchboard updates). Mechanical — good codex work items.
3. **Engineer flagship rebuild** (biggest ROI; default view).
4. **The Adaptation** (anime+director merge).
5. **SAINI.OS apps** (incremental — one app at a time).
6. **PM Zariya pass + Letter polish** (small).

Each step follows the repo's v2 convention: new class prefix, appended styles.css section, motion gated by `[data-motion]`.

## 7. Side notes

- **Zariya Recruit as content**: partial owner / architect of recruit.zariya.ai (AI interviews, call screening, resume parsing, built-in ATS; ISB + MeitY backing; 100k+ interview minutes). Belongs in engineer trace + PM briefing + terminal.
- **recruit.zariya.ai's own design** ("2016-level") is a separate project — same principles apply (governing metaphor, token system, type tiers), but don't let it compete with the portfolio for craft budget. Worth its own session.
- **References with confirmed tokens** worth keeping open while building: Koffi (`--koffi-*` token discipline, 4-tier type), iamthecode.xyz (scroll ruler, hard-shadow plates, contextual cursor), Cantor8 (Fragment Mono as voice), Samuel Day (scroll-scrubbed authored narrative, 4-state cursor), Bruegel (palette sampled from source material).
