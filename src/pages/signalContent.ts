// Persona narrative content for the signal mode. Lens/chapter/node copy
// duplicates facts from src/content/profile.ts; semantic de-forking is a
// later slice.

export type SignalLensId = "build" | "debug" | "architect";
export type SignalChapterId = "origin" | "build" | "debug" | "architect" | "evidence";
export type SignalNodeId =
  | "ayush"
  | "optmyzr"
  | "ai-campaign"
  | "portfolio-alerts"
  | "scripts"
  | "campaign-automator"
  | "bug-duty"
  | "zariya"
  | "architecture"
  | "infrastructure"
  | "projects"
  | "skills";

export const SIGNAL_LENSES: {
  id: SignalLensId;
  label: string;
  command: string;
  headline: string;
  lines: string[];
}[] = [
  {
    id: "build",
    label: "Build",
    command: "trace --surface=ai-campaigns",
    headline: "Owned the newest Optmyzr build from zero.",
    lines: [
      "AI campaign creation shipped from scratch",
      "Portfolio-level alerts created end-to-end",
      "Portfolio support expanded across dashboards and tools",
    ],
  },
  {
    id: "debug",
    label: "Debug",
    command: "inspect --mode=bug-duty",
    headline: "Useful where product surfaces overlap.",
    lines: [
      "Campaign Automator features and long-running fixes",
      "Google Ads Scripts maintenance and customer queries",
      "Cross-surface production bugs across ad-tech workflows",
    ],
  },
  {
    id: "architect",
    label: "Architect",
    command: "map --system=zariya-ai",
    headline: "Architecture and infrastructure at Zariya AI.",
    lines: [
      "Software design for multiple 0-to-1 features",
      "Server infrastructure implemented and maintained",
      "Product resets when patching was no longer enough",
    ],
  },
];

export const SIGNAL_CHAPTERS: {
  id: SignalChapterId;
  number: string;
  label: string;
  headline: string;
  body: string;
  nodes: SignalNodeId[];
}[] = [
  {
    id: "origin",
    number: "00",
    label: "Origin",
    headline: "A resume as a map of pressure, not a list of titles.",
    body:
      "The useful story is not just where I worked. It is how work moved through me: product surfaces, bugs, infrastructure, and the places where correctness mattered.",
    nodes: ["ayush", "optmyzr", "zariya"],
  },
  {
    id: "build",
    number: "01",
    label: "Build",
    headline: "New surfaces shipped from blank page to production.",
    body:
      "AI campaign creation is the newest major Optmyzr project I built from scratch. Portfolio-level alerts and portfolio support widened that ownership across dashboards, audits, and alerting.",
    nodes: ["ai-campaign", "portfolio-alerts", "optmyzr"],
  },
  {
    id: "debug",
    number: "02",
    label: "Debug",
    headline: "Maintenance is not background work when customers are waiting.",
    body:
      "Scripts, Campaign Automator, customer queries, and bug duty formed the long-running thread: finding problems across product boundaries and making them boring again.",
    nodes: ["scripts", "campaign-automator", "bug-duty", "optmyzr"],
  },
  {
    id: "architect",
    number: "03",
    label: "Architect",
    headline: "At Zariya AI, the work becomes shape, servers, and direction.",
    body:
      "The role is architectural: software design, technical direction, infrastructure, product resets, and multiple 0-to-1 features where patching was not enough.",
    nodes: ["zariya", "architecture", "infrastructure"],
  },
  {
    id: "evidence",
    number: "04",
    label: "Evidence",
    headline: "The public projects are smaller, but they reveal the same instincts.",
    body:
      "Interviews by Zariya, the Sudoku Solver, and Ultimate TTT are proof of taste under constraint: explain the system, make the interaction legible, then ship.",
    nodes: ["projects", "skills", "ayush"],
  },
];

export const SIGNAL_NODES: {
  id: SignalNodeId;
  label: string;
  meta: string;
  x: number;
  y: number;
  chapter: SignalChapterId;
  summary: string;
}[] = [
  {
    id: "ayush",
    label: "Ayush",
    meta: "center",
    x: 50,
    y: 50,
    chapter: "origin",
    summary: "Full-stack engineer moving between product ownership, debugging, architecture, and communication.",
  },
  {
    id: "optmyzr",
    label: "Optmyzr",
    meta: "ad-tech",
    x: 31,
    y: 31,
    chapter: "origin",
    summary: "Primary role since 2023 across Google Ads tooling, dashboards, alerts, audits, scripts, and automation.",
  },
  {
    id: "ai-campaign",
    label: "AI Campaign Creation",
    meta: "owned",
    x: 20,
    y: 57,
    chapter: "build",
    summary: "Newest major project: built from scratch and owned end-to-end.",
  },
  {
    id: "portfolio-alerts",
    label: "Portfolio Alerts",
    meta: "created",
    x: 36,
    y: 75,
    chapter: "build",
    summary: "Created portfolio-level alerts and helped expand portfolio support through dashboards, audits, and alerts.",
  },
  {
    id: "scripts",
    label: "Google Ads Scripts",
    meta: "maintained",
    x: 65,
    y: 24,
    chapter: "debug",
    summary: "Long-running maintenance: features, bug fixes, customer queries, and production support.",
  },
  {
    id: "campaign-automator",
    label: "Campaign Automator",
    meta: "improved",
    x: 78,
    y: 46,
    chapter: "debug",
    summary: "Feature work and bugfixes over time without overstating ownership of the whole tool.",
  },
  {
    id: "bug-duty",
    label: "Bug Duty",
    meta: "strength",
    x: 63,
    y: 72,
    chapter: "debug",
    summary: "A reliable strength: messy cross-surface bugs, customer-facing issues, and production weirdness.",
  },
  {
    id: "zariya",
    label: "Zariya AI",
    meta: "early-stage",
    x: 83,
    y: 67,
    chapter: "architect",
    summary: "Architectural role across product foundations, technical direction, and software design.",
  },
  {
    id: "architecture",
    label: "Architecture",
    meta: "shape",
    x: 76,
    y: 84,
    chapter: "architect",
    summary: "Went back to the drawing board when needed: product resets, system design, and cleaner foundations.",
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    meta: "owned",
    x: 91,
    y: 29,
    chapter: "architect",
    summary: "Implemented and maintain the server infrastructure behind Zariya AI.",
  },
  {
    id: "projects",
    label: "Projects",
    meta: "public",
    x: 21,
    y: 21,
    chapter: "evidence",
    summary: "Interviews by Zariya, Sudoku Solver, and Ultimate TTT: small products with clear interaction ideas.",
  },
  {
    id: "skills",
    label: "Skills",
    meta: "toolkit",
    x: 50,
    y: 14,
    chapter: "evidence",
    summary: "C#, TypeScript, React, Next.js, Express, backend architecture, infrastructure, and debugging.",
  },
];

export const SIGNAL_LINKS: [SignalNodeId, SignalNodeId][] = [
  ["ayush", "optmyzr"],
  ["ayush", "zariya"],
  ["ayush", "projects"],
  ["ayush", "skills"],
  ["optmyzr", "ai-campaign"],
  ["optmyzr", "portfolio-alerts"],
  ["optmyzr", "scripts"],
  ["optmyzr", "campaign-automator"],
  ["campaign-automator", "bug-duty"],
  ["scripts", "bug-duty"],
  ["zariya", "architecture"],
  ["zariya", "infrastructure"],
];

export const SKILL_SIGNALS = [
  { label: "JavaScript", pct: 92 },
  { label: "TypeScript", pct: 88 },
  { label: "C#", pct: 80 },
  { label: "React / Next.js", pct: 85 },
  { label: "Node / Express", pct: 76 },
  { label: "Go", pct: 62 },
];
