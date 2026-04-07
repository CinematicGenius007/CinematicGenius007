# Portfolio Redesign — Design Plan

**Author:** Ayush Saini  
**Site:** cinematicgenius007.com  
**Status:** Ready for implementation  
**Replace:** Current newspaper "Debugger's Gazette" theme entirely

---

## 1. Design Philosophy

### Core Concept: "The System Architect"

The page is not a resume. It is not a newspaper. It is a **technical manifesto rendered as a Bauhaus composition** — structured like a system specification, styled like a mid-century modernist poster.

Every element earns its place. No decoration for decoration's sake. Geometry does the work of ornament. Typography carries meaning through weight and scale, not embellishment.

The target feeling: you are looking at something made by someone who thinks in systems — where clarity, structure, and intent are inseparable.

### Design Tensions to Hold

| Retro | Modern |
|---|---|
| Geometric slab typography | Clean sans-serif body text |
| Flat color blocks — no gradients | Dark mode base |
| Visible grid and rule lines | Generous, intentional whitespace |
| Section numbers as structural markers | Minimal hover micro-interactions |
| High contrast, primary-leaning palette | Readable, accessible type scale |

This is not 2000s-era gloss (no drop shadows, no rounded pill buttons, no bevel effects). It is not brutalist chaos either. It is **disciplined asymmetry** — Bauhaus logic applied to a developer's story.

---

## 2. Color System

### Palette

```
--bg:          #0c0c0e   /* near-black, slightly warm — the base canvas */
--surface:     #141418   /* slightly lighter — used for cards, panels */
--surface-alt: #1c1c22   /* hover states, subtle elevation */
--ink:         #f0ebe1   /* warm off-white — primary text */
--ink-muted:   #8a8490   /* secondary text, labels, metadata */
--rule:        #2a2a32   /* dividing lines — structural, not decorative */
--accent:      #e8a020   /* amber — used sparingly, high-value moments only */
--accent-dim:  #7a5510   /* dimmed amber — subtle accent backgrounds */
```

### Accent Usage Rules

Amber (`--accent`) appears in **four places only**:
1. The hover underline on the primary nav/contact links
2. The section number labels (01, 02, 03…)
3. The live-link arrow on project cards
4. The active/hover border on project cards

Everywhere else: ink, muted ink, and rule lines. The restraint is the point — amber lands hard because it is rare.

### What Is Explicitly Forbidden
- Gradients on any surface (flat color only)
- Box shadows or drop shadows
- Blur effects or frosted glass
- Any second accent color
- Any opacity tricks to create faux-depth on surfaces

---

## 3. Typography

### Font Stack

```
Display / Headers:  "Space Grotesk", sans-serif
Body:               "DM Sans", sans-serif
Mono (labels/code): "JetBrains Mono", monospace
```

All three are available on Google Fonts. Load only the weights actually used.

- Space Grotesk: **700** (display headers only)
- DM Sans: **400**, **500**
- JetBrains Mono: **400**

### Type Scale

| Role | Font | Size | Weight | Transform |
|---|---|---|---|---|
| Hero name | Space Grotesk | clamp(5rem, 14vw, 11rem) | 700 | uppercase |
| Section headers (h2) | Space Grotesk | clamp(2.4rem, 5vw, 4rem) | 700 | none |
| Company / project name (h3) | Space Grotesk | clamp(1.6rem, 2.5vw, 2.4rem) | 700 | none |
| Body paragraph | DM Sans | 1.1rem | 400 | none |
| Role / description | DM Sans | 1rem | 400 | none |
| Section number | JetBrains Mono | 0.75rem | 400 | uppercase |
| Labels / kickers | JetBrains Mono | 0.72rem | 400 | uppercase |
| Dates / metadata | JetBrains Mono | 0.78rem | 400 | none |
| Tag items | JetBrains Mono | 0.82rem | 400 | none |

### Letter Spacing Rules
- All uppercase JetBrains Mono text: `letter-spacing: 0.12em`
- Space Grotesk display: `letter-spacing: -0.02em` (tight — geometric fonts need this)
- Body text: no adjustment

### Line Height
- Display type: `line-height: 0.92`
- Section headers: `line-height: 0.96`
- Body: `line-height: 1.65`
- Mono labels: `line-height: 1.3`

---

## 4. Layout Architecture

### Grid System

The page uses a **12-column logical grid** as its structural backbone. No CSS grid framework — built with CSS Grid natively. The maximum content width is **1280px**, centered, with `padding-inline: clamp(1.5rem, 4vw, 4rem)` on the outer shell.

A **very faint graph-paper grid** is rendered as a fixed background layer (`position: fixed`) using CSS `background-image` with two perpendicular linear gradients. The lines are `rgba(255,255,255, 0.025)` — barely visible. This creates a technical document feeling without being loud. No `pointer-events`, `z-index: -1`.

### Section Anatomy

Every major section shares this structural pattern:

```
┌─ section ───────────────────────────────────────────┐
│  [section-number in mono, amber]  [kicker label]    │
│  ─────────────────────────────────────────────────  │  ← rule line (full width)
│                                                      │
│  [section content]                                   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

The section number sits **left**, the kicker label sits immediately right of it, both in JetBrains Mono. A full-width 1px rule (`--rule` color) runs below them. This pattern repeats for every section and becomes the page's visual rhythm.

Sections have **generous vertical padding**: `padding-block: clamp(4rem, 8vw, 7rem)`. No cramping.

---

## 5. Section-by-Section Specification

### Section 01 — Hero

**Purpose:** First impression. Name, role, one definitive statement.

**Layout:** Full viewport height (`min-height: 100vh`), content vertically centered via flexbox. Background: `--bg`. No border, no card.

**Structure (top to bottom):**
1. Section marker: `01 / INTRODUCTION` in JetBrains Mono, amber color, top-left
2. **Name:** `AYUSH SAINI` — Space Grotesk 700, the largest text on the page (see scale above). This text should feel like it occupies space. Two words, two lines or one depending on viewport.
3. **Role line:** `Software Engineer — Full Stack` in JetBrains Mono, `--ink-muted`, `letter-spacing: 0.12em`, small size (0.9rem). Sits directly below the name.
4. **Statement line:** One sentence from existing copy — `"I work best where code, ownership, and ambiguity meet."` — in DM Sans 400, ~1.3rem, `--ink`. Slightly indented (left-padded by 2–3 chars worth of space) to create visual offset from the name above.
5. **Scroll indicator:** bottom-center, a simple downward-pointing arrow or the text `↓ scroll` in JetBrains Mono at 0.7rem, `--ink-muted`. No animation.

**Geometric accent:** A single rectangle (CSS `outline: 2px solid var(--rule)`) positioned behind-and-offset from the name text. It does NOT contain the text — it overlaps partially, sitting `z-index: -1` relative to the text. This creates depth through geometry, not shadow. Size: roughly matching the bounding box of the name, offset 1rem down and 1.5rem right.

**What this section replaces:** The old nameplate with "The Debugger's Gazette" masthead.

---

### Section 02 — The Work

**Purpose:** Who Ayush is, in prose. Replaces the old lead-story + briefing-card hero-grid.

**Layout:** Two columns — `1.4fr 0.6fr` — at ≥980px. Single column below.

**Left column:** Two short paragraphs from existing copy, lightly edited for the new tone. No dropcap. Use the existing lead-story paragraph content. Body text in DM Sans.

**Right column:** A vertical stack of 3–4 **"field note" lines** — the existing `notes` array content. Each line is:
- A short mono label before it (e.g., `//`) in amber
- The note text in DM Sans, `--ink-muted`
- A 1px bottom border in `--rule` between items

No card border around the right column. It floats on the background.

**Left column accent:** A 3px vertical line in `--rule` sits to the left of the left column text, `8px` gap between line and text. This is the only decorative element in the section and it runs the full text height.

---

### Section 03 — Experience

**Purpose:** Work history. Replaces the old split-layout timeline.

**Layout:** Full width. No side column. Each experience entry gets its own horizontal band.

**Each experience entry structure:**
```
[YEAR-RANGE in mono, large]   [COMPANY in Space Grotesk, large]
                              [ROLE in JetBrains Mono, muted]
                              [MODE in JetBrains Mono, muted, smaller]
──────────────────────────────────────────────────────────────────  ← rule
[bullet 1]
[bullet 2]
[bullet 3]
```

The year/date is in the left "margin" column (`~180px` wide), large JetBrains Mono (1.4rem), `--ink-muted`. The company name, role, bullets sit in the right wide column.

Between entries: a full-width 1px rule at `--rule`. No dots, no vertical timeline line, no connecting spine. Clean horizontal separation.

The **company name** in Space Grotesk is noticeably large — this is intentional. Employers are the subject. The role lines below it are in smaller mono — the supporting data. This visual hierarchy is a deliberate inversion of the typical resume (which foregrounds title over company).

**What this removes:** timeline dots, timeline spine, side-column education/strengths/outside-ide cards. Education and strengths move to a different section or get folded into the skills section.

---

### Section 04 — Projects

**Purpose:** NEW section. Showcases the three concrete builds.

**Layout:** A 3-column grid at ≥980px. 2 columns at 640–980px. 1 column below 640px. Each project is a card.

**Project card structure:**

```
┌─────────────────────────────────────────────┐
│  [PROJECT NUMBER]  [STATUS: LIVE ↗]         │
│                                             │
│  PROJECT NAME                               │  ← Space Grotesk, large
│                                             │
│  Short description — 2 sentences max.       │  ← DM Sans, body
│                                             │
│  ─────────────────────────────────────────  │  ← rule
│  [tech stack tags in mono]                  │
└─────────────────────────────────────────────┘
```

- Card background: `--surface`
- Card border: `1px solid var(--rule)`
- On hover: border color transitions to `--accent` (amber). No shadow, no lift, no scale transform. Just the border color.
- The `↗` live link in the top-right is amber, links to the live URL, `target="_blank"`
- Project number (p.01, p.02, p.03) in JetBrains Mono, muted

**Project Data:**

**p.01 — Sudoku Solver**
- Name: `Sudoku Solver`
- Description: `Two algorithms — brute force and intelligent — solving the same board in real time. Every step, guess, and backtrack animated. Built to make the difference between strategy and exhaustion visible.`
- Tech: `Next.js · TypeScript · CSS`
- Live URL: `https://sudoku-solver.cinematicgenius007.com/`

**p.02 — Ultimate Tic-Tac-Toe**
- Name: `Ultimate TTT`
- Description: `Tic-tac-toe inside tic-tac-toe. Your move dictates where your opponent must play next. Simple rules, deep strategy — a two-player game that rewards thinking a move ahead.`
- Tech: `React · Vite · TypeScript`
- Live URL: `https://ultimate-ttt.cinematicgenius007.com/`

**p.03 — This Portfolio**
- Name: `This Site`
- Description: `A single-page portfolio built with deliberate restraint. React, TypeScript, Vite, and plain CSS — no UI framework, no component library. The design is the constraint.`
- Tech: `React · TypeScript · Vite`
- Live URL: `https://www.cinematicgenius007.com/`

---

### Section 05 — Skills & Profile

**Purpose:** Tools, working style, education, and the person outside the IDE. Replaces old skill-ledger + scattered side-column content.

**Layout:** Three rows.

**Row 1 — Skills grid:** Four columns (one per `skillGroups` item), each a frameless vertical stack. Column header in Space Grotesk 700 (small ~1rem). Items in JetBrains Mono 0.82rem, `--ink-muted`. Items have no bullets, no borders — just clean vertical spacing. A 1px rule separates columns visually (vertical rule, same `--rule` color, full row height).

**Row 2 — Working style statements:** The existing `strengths` array, but displayed as **large statements** rather than tags. Each strength rendered in Space Grotesk at ~1.6rem, `--ink`, with a tiny amber `//` prefix. These sit in a horizontal scrollable row (no wrapping) — or at narrow viewports, stacked. This is the most "editorial" element in the section. The scale difference from normal body text makes the section pause and breathe.

**Row 3 — Education + Outside the IDE:** Two columns at ≥640px, 1 column below.

Left: Education. No card. Two education blocks (Chitkara University, CBSE XII). Degree in Space Grotesk medium size, year and score in mono, muted. A 1px rule separates the two blocks.

Right: Outside the IDE paragraph in DM Sans, body size. Verbatim from existing copy: *"Member of the Debating Society. Theatre club participant. Comfortable in rooms where communication matters as much as code."*

---

### Section 06 — Contact

**Purpose:** Closing. Direct. No filler. Replaces old closing-note.

**Layout:** Full-width. Two columns — `1.6fr 0.4fr` — at ≥640px.

**Left:** Large headline in Space Grotesk — `"Available for meaningful engineering conversations."`. Below it: one sentence from existing copy. No elaborate CTA language.

**Right:** Three links in a vertical stack. Each link is in JetBrains Mono, uppercase, `--ink`. On hover: amber color. No arrow, no underline trick — the hover color change is the only feedback.
- `EMAIL ↗` → `mailto:ayush.trillionarie@gmail.com`
- `LINKEDIN ↗` → LinkedIn URL
- `GITHUB ↗` → GitHub URL

**Below the two columns:** a thin full-width rule, then a single line in JetBrains Mono, muted: `AYUSH SAINI / CINEMATICGENIUS007.COM / © 2025`. This is the footer.

---

## 6. Interaction Design

### Hover States

The rule: hover states communicate affordance, not excitement. No transforms, no shadows, no scale.

| Element | Hover Change |
|---|---|
| All `<a>` tags | color: `--accent` (amber) — transition 150ms ease |
| Project cards | border-color: `--accent` — transition 200ms ease |
| Nav/contact links | color: `--accent` |

That is the complete list of hover interactions. Nothing else moves.

### Animations

There are none, except:
- `scroll-behavior: smooth` on `html`
- The `@media (prefers-reduced-motion: reduce)` block disables scroll-behavior as well

No entrance animations, no scroll-triggered reveals, no parallax. The page loads fully rendered. This is intentional — performance, accessibility, and the aesthetic philosophy all point the same direction.

---

## 7. Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `≥ 980px` | All multi-column layouts active. Full design as specified. |
| `640–979px` | Most 2-col layouts collapse to 1 col. Ledger grid: 2 cols. Project grid: 2 cols. |
| `< 640px` | All layouts single column. Hero name size reduces to clamp floor. Padding tightens. |

No breakpoint should ever hide content or reorder it in a confusing way. The page reads top-to-bottom at all widths.

---

## 8. DOM / Component Structure Changes

These changes need to be made to `App.tsx` and `styles.css`:

**Data additions to `App.tsx`:**
- Add a `projects` typed array at the top with the three project objects (name, description, tech array, url, number)
- Keep `experiences`, `strengths`, `skillGroups`, `notes` as-is (content unchanged, only presentation changes)

**Sections to add:**
- `<section className="projects-section">` — new, between experience and skills

**Sections to rename/replace:**
- `.nameplate` → `.hero` (section 01)
- `.hero-grid` → `.about-section` (section 02)
- `.split-layout` → `.experience-section` (section 03)
- `.skill-ledger` → `.profile-section` (section 05)
- `.closing-note` → `.contact-section` (section 06)

**Removed entirely:**
- `.paper-noise` div (the old newspaper grid texture — replaced by the new graph-paper background on the body)
- `.floating-clips-left` and `.floating-clips-right` divs and all their CSS
- `.front-page::before` pseudo-element (the old paper card background)
- `.dropcap` styling (no dropcap in new design)
- `@keyframes drift` (no longer needed)

**Retained (do not remove):**
- The commented-out `life-signal` SVG block — keep it commented in `App.tsx` as per project convention

---

## 9. CSS Variable Migration

Remove all old CSS variables from `:root`. Replace with the new system:

```css
:root {
  --bg:          #0c0c0e;
  --surface:     #141418;
  --surface-alt: #1c1c22;
  --ink:         #f0ebe1;
  --ink-muted:   #8a8490;
  --rule:        #2a2a32;
  --accent:      #e8a020;
  --accent-dim:  #7a5510;
}
```

Remove: `--paper`, `--paper-deep`, `--shadow`, and the old `--accent` (which was just a faint rgba).

---

## 10. Font Import Change

Replace the existing Google Fonts import:

**Remove:**
```css
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");
```

**Replace with:**
```css
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400&display=swap");
```

Update the `font-family` on `:root` to `"DM Sans", sans-serif` (body default).

---

## 11. Implementation Order (Suggested)

1. Update font import + CSS variables in `styles.css`
2. Add graph-paper background to `body` in CSS
3. Update `App.tsx` data: add `projects` array, remove unused cruft
4. Rebuild HTML structure section by section (Hero → About → Experience → Projects → Profile → Contact)
5. Style each section in `styles.css` following this document
6. Add hover transitions last
7. Test all three breakpoints
8. Verify the `life-signal` SVG comment is still present and untouched

---

## 12. What This Design Is Not

To prevent drift during implementation, a clear list of things to avoid:

- **No gradients** — not on backgrounds, not on borders, not on text
- **No box-shadow or drop-shadow** on any element
- **No border-radius > 0** — all corners are sharp (Bauhaus aesthetic)
- **No animations** beyond hover color transitions
- **No second accent color** introduced beyond amber
- **No external UI library** imported
- **No inline styles** — all styling through `styles.css` class names
- **No card "lift" effect** on hover (no translateY, no scale)
- **No neon** — amber is warm, not electric. If it looks like a vaporwave poster, it's wrong.
- **No parallax, no scroll-triggered effects, no entrance animations**

---

*This document is the single source of truth for the redesign. Any implementation decision not covered here should favor restraint over elaboration.*
