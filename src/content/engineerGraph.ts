// Service-map model for the engineer persona ("Attach Debugger").
// Derived from the content spine — no new claims, only topology.

export type NodeKind = "org" | "project" | "lib" | "edu";

export type GraphNode = {
  id: string;
  label: string;
  sub: string;
  kind: NodeKind;
  // Unit-space coordinates (0..1) in the map viewport. Hand-composed layout:
  // career route flows bottom-left → top-right; libraries orbit above; projects east.
  x: number;
  y: number;
  size: number;
};

export type EdgeKind = "route" | "dep" | "ship";

export type GraphEdge = {
  from: string;
  to: string;
  kind: EdgeKind;
  label: string;
  // Curve bend: perpendicular offset in unit space. Positive bends left of travel.
  bend: number;
};

export type NodeDetail = {
  title: string;
  meta: string;
  lines: string[];
  link?: { label: string; href: string };
};

export const graphNodes: GraphNode[] = [
  // career route (bottom-left → top-right)
  { id: "chitkara", label: "chitkara.edu", sub: "B.E. CS — CGPA 9.95", kind: "edu", x: 0.16, y: 0.84, size: 5 },
  { id: "jetbrains", label: "jetbrains.hyperskill", sub: "project tester · 2022–23", kind: "org", x: 0.34, y: 0.64, size: 6 },
  { id: "optmyzr", label: "optmyzr.prod", sub: "SDE-1 · 2023–now", kind: "org", x: 0.52, y: 0.38, size: 8 },
  { id: "zariya", label: "zariya.ai", sub: "architectural engineer", kind: "org", x: 0.76, y: 0.52, size: 7 },
  // shared libraries (north cluster)
  { id: "typescript", label: "typescript.so", sub: "shared lib", kind: "lib", x: 0.30, y: 0.20, size: 4 },
  { id: "csharp", label: "csharp.so", sub: "shared lib", kind: "lib", x: 0.46, y: 0.12, size: 4 },
  { id: "react", label: "react.so", sub: "shared lib", kind: "lib", x: 0.62, y: 0.16, size: 4 },
  { id: "go", label: "go.so", sub: "shared lib", kind: "lib", x: 0.16, y: 0.42, size: 4 },
  { id: "infra", label: "infra.so", sub: "servers · deploys", kind: "lib", x: 0.90, y: 0.26, size: 4 },
  // shipped artifacts (east cluster)
  { id: "interviews", label: "interviews.zariya.ai", sub: "AI interviewer · live", kind: "project", x: 0.92, y: 0.66, size: 5 },
  { id: "sudoku", label: "sudoku-solver", sub: "two algorithms racing", kind: "project", x: 0.68, y: 0.84, size: 5 },
  { id: "ttt", label: "ultimate-ttt", sub: "strategy game · live", kind: "project", x: 0.88, y: 0.86, size: 5 },
];

export const graphEdges: GraphEdge[] = [
  // the career route — this is the trace path
  { from: "chitkara", to: "jetbrains", kind: "route", label: "fundamentals → testing discipline", bend: 0.05 },
  { from: "jetbrains", to: "optmyzr", kind: "route", label: "testing instinct → bug-duty trust", bend: 0.05 },
  { from: "optmyzr", to: "zariya", kind: "route", label: "production craft → architecture ownership", bend: 0.06 },
  // dependency links
  { from: "optmyzr", to: "csharp", kind: "dep", label: "ad-tech backends", bend: 0.03 },
  { from: "optmyzr", to: "typescript", kind: "dep", label: "product surfaces", bend: -0.04 },
  { from: "optmyzr", to: "react", kind: "dep", label: "dashboards", bend: 0.03 },
  { from: "zariya", to: "infra", kind: "dep", label: "owns the servers", bend: 0.05 },
  { from: "zariya", to: "typescript", kind: "dep", label: "0→1 features", bend: -0.10 },
  { from: "jetbrains", to: "go", kind: "dep", label: "java / go review", bend: 0.04 },
  // shipped artifacts
  { from: "zariya", to: "interviews", kind: "ship", label: "0→1 product", bend: 0.04 },
  { from: "typescript", to: "sudoku", kind: "ship", label: "algorithm viz", bend: -0.18 },
  { from: "react", to: "ttt", kind: "ship", label: "weekend build", bend: -0.12 },
];

// The famous trace: run causality through the career route.
export const careerTrace = ["chitkara", "jetbrains", "optmyzr", "zariya"];

export const nodeDetails: Record<string, NodeDetail> = {
  chitkara: {
    title: "Chitkara University",
    meta: "B.E. Computer Science · 2020–2024",
    lines: ["CGPA 9.95 / 10.", "Where the fundamentals loaded. Theatre and debate ran in parallel threads — both still in use."],
  },
  jetbrains: {
    title: "JetBrains Hyperskill",
    meta: "Project Tester · freelance · 2022–2023",
    lines: [
      "Tested Java and Go educational projects for correctness, structure, and learning flow.",
      "Feedback accepted into released content. First paid proof that finding what's broken is a skill.",
    ],
  },
  optmyzr: {
    title: "Optmyzr",
    meta: "SDE-1 · Aug 2024–present · intern Apr 2023–Aug 2024",
    lines: [
      "Built AI campaign creation from scratch; owns it end-to-end.",
      "Portfolio-level alerts; portfolio support across dashboards, audits, alerts.",
      "Campaign Automator features and long-running bugfix ownership.",
      "Google Ads Scripts: features, fixes, customer queries, production support.",
      "Strong bug-duty record — trusted with messy, cross-cutting issues.",
    ],
  },
  zariya: {
    title: "Oddmind Innovations (Zariya AI)",
    meta: "Architectural Engineer · part-time · late 2024–present",
    lines: [
      "Software design, technical direction, product foundations across 0→1 features.",
      "Implemented and maintains the full server infrastructure.",
      "Reset the architecture when the product drifted — drawing board, not patches.",
    ],
  },
  typescript: { title: "typescript.so", meta: "shared library", lines: ["Loaded by every surface he ships. Also: JavaScript, the runtime underneath."] },
  csharp: { title: "csharp.so", meta: "shared library", lines: ["The Optmyzr backend dialect. Where the ad-tech correctness work lives."] },
  react: { title: "react.so", meta: "shared library", lines: ["Dashboards, flows, this site. Plus Next.js and Vite in the same linker path."] },
  go: { title: "go.so", meta: "shared library", lines: ["Loaded at JetBrains for project review. Java linked alongside."] },
  infra: { title: "infra.so", meta: "servers · deploys · reliability", lines: ["Primary owner of Zariya's production infrastructure and deployment shape."] },
  interviews: {
    title: "Interviews by Zariya",
    meta: "AI interviewer · live product",
    lines: ["Mid-answer follow-ups, specific scoring, mentorship-ready reports.", "Identified the gap, picked the stack, built the V1."],
    link: { label: "interviews.zariya.ai ↗", href: "https://interviews.zariya.ai/" },
  },
  sudoku: {
    title: "Sudoku Solver",
    meta: "two solvers racing · live",
    lines: ["Brute-force vs constraint-propagation on the same board, step by step.", "Watching the naïve one guess next to the one that thinks."],
    link: { label: "sudoku-solver.cinematicgenius007.com ↗", href: "https://sudoku-solver.cinematicgenius007.com/" },
  },
  ttt: {
    title: "Ultimate TTT",
    meta: "two-player strategy · live",
    lines: ["Your move dictates the opponent's sub-board. One rule, emergent depth.", "Built over a weekend after losing to a cousin four times."],
    link: { label: "ultimate-ttt.cinematicgenius007.com ↗", href: "https://ultimate-ttt.cinematicgenius007.com/" },
  },
};

// Breakpoint stories — three war stories rendered as debugger step-throughs.
// Grounded in spine facts; framing is the costume, claims are real.
export type Breakpoint = {
  id: string;
  file: string;
  title: string;
  steps: { label: string; state: string }[];
  verdict: string;
};

export const breakpoints: Breakpoint[] = [
  {
    id: "bp-01",
    file: "optmyzr/bug_duty.cs",
    title: "The cross-cutting bug",
    steps: [
      {
        label: "state: before",
        state:
          "Symptom reported in one product surface. Plausible cause in three others. Ad-tech stack where a wrong assumption can touch real ad spend — guessing is not an option.",
      },
      {
        label: "step: through",
        state:
          "This is the recurring shape of Optmyzr bug duty: dashboards, portfolios, audits, alerts, scripts, automation. The skill isn't knowing one surface — it's walking the seams between them until the wrong assumption surfaces.",
      },
      {
        label: "state: after",
        state:
          "Fix lands where the cause lives, not where the symptom shouted. The record: consistently trusted with the messy, cross-cutting issues nobody can place.",
      },
    ],
    verdict: "resolved · root cause, not symptom",
  },
  {
    id: "bp-02",
    file: "zariya/architecture.ts",
    title: "The reset",
    steps: [
      {
        label: "state: before",
        state:
          "Early-stage product, small team, codebase drifting. Each new feature cost more than the last. Patch-debt compounding faster than product progress.",
      },
      {
        label: "step: through",
        state:
          "The call: stop patching. Back to the drawing board — software design, technical direction, server infrastructure rebuilt into a foundation that could carry 0→1 features instead of fighting them.",
      },
      {
        label: "state: after",
        state:
          "Stabilized product surface. Primary owner of production reliability and deployment shape. Architecture became the point of contact, not the point of failure.",
      },
    ],
    verdict: "resolved · reshaped, not patched",
  },
  {
    id: "bp-03",
    file: "optmyzr/ai_campaigns.cs",
    title: "The 0→1 feature",
    steps: [
      {
        label: "state: before",
        state:
          "No AI campaign creation existed. Blank file. The brief: take advertiser intent and turn it into correct, launchable campaigns — end to end, from scratch.",
      },
      {
        label: "step: through",
        state:
          "Built the whole flow and owns it: the product surface, the generation logic, the correctness checks. The boring version shipped first; production earned the rest.",
      },
      {
        label: "state: after",
        state:
          "Live as a major product surface. The most recent big project — and the clearest proof the bug-duty engineer can also build the thing that creates the bugs for everyone else.",
      },
    ],
    verdict: "shipped · owned end-to-end",
  },
];
