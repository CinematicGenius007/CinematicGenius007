// Persona narrative content for the PM mode. Facts here still duplicate
// src/content/profile.ts; semantic de-forking is a later slice.

export type ProgramLens = "launch" | "scale" | "stabilize";

export const caseStudies = [
  {
    company: "Optmyzr",
    role: "SDE I",
    period: "Aug 2024 →",
    meta: "Full-time",
    extra: "(Intern Apr 2023–Aug 2024)",
    title: "Building across the product suite that supports real ad spend.",
    subtitle: "AI Campaign Creation · Portfolios · Alerts · Audits · Scripts · Automation",
    context:
      "A mature ad-tech suite where dashboards, alerts, audits, scripts, automation, and campaign creation flows translate user intent into decisions that can affect real budgets.",
    shipped:
      "AI campaign creation from scratch, portfolio-level alerts, portfolio support across dashboards and tools, Campaign Automator features/fixes, and ongoing Google Ads Scripts maintenance.",
    signal:
      "Strong bug-duty record across many product surfaces; trusted with new feature ownership and messy production issues.",
  },
  {
    company: "Zariya AI (Oddmind)",
    role: "Architectural engineer",
    period: "Late 2024 →",
    meta: "Part-time",
    title: "Designing the product architecture and keeping the servers alive.",
    subtitle: "Architecture · Infrastructure · AI-assisted products",
    context:
      "Early-stage AI SaaS with multiple products, a small team, and a codebase that has needed both 0-to-1 building and architectural correction.",
    shipped:
      "Software architecture, server infrastructure, product rebuilds, multiple features from scratch, and Interviews by Zariya.",
    signal:
      "Primary owner for infrastructure and production stability; architectural point of contact when the product needs reshaping.",
  },
];

export const projects = [
  {
    number: "01 / interviews.zariya.ai",
    href: "https://interviews.zariya.ai",
    title: "Interview practice that actually pushes back.",
    body:
      "Mid-answer follow-ups and specific scoring, not a scripted chatbot. Built because every other practice tool felt like talking to a wall.",
    outcome: "Scope: 0→1 product · Role: eng lead",
  },
  {
    number: "02 / sudoku-solver",
    href: "https://sudoku-solver.cinematicgenius007.com",
    title: "Two algorithms, same board, visible.",
    body:
      "Brute-force vs. constraint-propagation, racing step by step. Makes \"the smart one is faster\" legible to non-programmers.",
    outcome: "Scope: solo build · Role: everything",
  },
  {
    number: "03 / ultimate-ttt",
    href: "https://ultimate-ttt.cinematicgenius007.com",
    title: "Tic-tac-toe, strategic.",
    body:
      "Your move dictates the opponent's next sub-board. Weekend build; better than slide-deck game-theory.",
    outcome: "Scope: weekend · Role: solo",
  },
];

export const profileScope = [
  "AI campaign creation owned end-to-end at Optmyzr",
  "Portfolio-level alerts and portfolio support across Optmyzr",
  "Google Ads Scripts maintenance, features, bugs, and customer queries",
  "Architecture + infrastructure ownership at Zariya AI",
  "CS, Chitkara · CGPA 9.95 · 2024",
];

export const programLenses: {
  id: ProgramLens;
  label: string;
  title: string;
  summary: string;
  decision: string;
  risk: string;
  metric: string;
  workstreams: {
    lane: string;
    items: string[];
  }[];
}[] = [
  {
    id: "launch",
    label: "Launch",
    title: "AI campaign creation from zero to usable product.",
    summary:
      "Turn an ambiguous AI-assisted workflow into a production surface: define the shape, build the path, keep correctness visible, and ship without hiding behind demo magic.",
    decision: "Bias toward a boring, inspectable V1 before clever automation.",
    risk: "AI output can look confident while still being wrong for a real ad account.",
    metric: "0→1 owned build",
    workstreams: [
      { lane: "Scope", items: ["Campaign creation flow", "User intent capture", "Reviewable output"] },
      { lane: "Delivery", items: ["Backend path", "UI states", "Production release"] },
      { lane: "Alignment", items: ["Tradeoff notes", "Edge-case handling", "Stakeholder language"] },
    ],
  },
  {
    id: "scale",
    label: "Scale",
    title: "Portfolio support across surfaces, not as a one-off patch.",
    summary:
      "Portfolio work touched dashboards, audits, alerts, and account-level views. The program problem was consistency: make the same idea behave across multiple product contexts.",
    decision: "Treat portfolio as a system capability, not a screen-specific feature.",
    risk: "A partial rollout creates inconsistent customer expectations across tools.",
    metric: "Portfolio alerts created",
    workstreams: [
      { lane: "Surfaces", items: ["Portfolio Dashboard", "All Account Dashboard", "Audits + Alerts"] },
      { lane: "Dependencies", items: ["Shared assumptions", "Data shape", "Alert semantics"] },
      { lane: "Outcome", items: ["Portfolio-level alerts", "Broader support", "Cleaner mental model"] },
    ],
  },
  {
    id: "stabilize",
    label: "Stabilize",
    title: "Maintenance, bugs, and infrastructure as the real operating system.",
    summary:
      "Campaign Automator, Scripts, bug duty, and Zariya AI infrastructure all point to the same program skill: keep the system understandable when the easy version has stopped working.",
    decision: "Fix the system shape when local patches are creating more drag.",
    risk: "Production issues multiply when ownership boundaries are fuzzy.",
    metric: "Infra + bug-duty owner",
    workstreams: [
      { lane: "Reliability", items: ["Scripts support", "Campaign Automator fixes", "Customer queries"] },
      { lane: "Architecture", items: ["Zariya AI servers", "Product resets", "Software design"] },
      { lane: "Communication", items: ["Explain failures", "Translate tradeoffs", "Close loops"] },
    ],
  },
];

// ── decision log: drag through four eras of judgment calls ──────────

export type Era = {
  id: string;
  year: string;
  title: string;
  status: string;
  decisions: string[];
  active: string[];
};

export const eraLog: Era[] = [
  {
    id: "era-2022",
    year: "2022",
    title: "The first paid proof",
    status: "JetBrains Hyperskill · freelance project tester · university in parallel",
    decisions: [
      "Take testing work seriously instead of waiting for a 'real' job — correctness instincts compound.",
      "Review Java and Go projects until the feedback ships into released content.",
    ],
    active: ["project testing", "B.E. CS (CGPA 9.95 track)"],
  },
  {
    id: "era-2023",
    year: "2023",
    title: "Into production",
    status: "Optmyzr · intern · first ad-tech production exposure",
    decisions: [
      "Join a domain where wrong software assumptions touch real ad spend.",
      "Volunteer for bug duty — the fastest tour of every product surface.",
    ],
    active: ["Campaign Automator", "Google Ads Scripts", "bug duty"],
  },
  {
    id: "era-2024",
    year: "2024",
    title: "Ownership, twice",
    status: "Optmyzr · promoted to SDE-1 · Zariya AI architecture seat opens",
    decisions: [
      "Convert the internship through ownership, not tenure.",
      "Take the Zariya architectural role in parallel — smaller scale, bigger decision radius.",
    ],
    active: ["portfolio alerts", "dashboards + audits", "Zariya foundations"],
  },
  {
    id: "era-2026",
    year: "2025–26",
    title: "Zero-to-one, both jobs",
    status: "Optmyzr · AI campaign creation owner · Zariya · production reliability owner",
    decisions: [
      "Build AI campaign creation from scratch; ship the boring V1 first and let production earn the rest.",
      "Reset the Zariya architecture instead of paying compounding patch-debt.",
    ],
    active: ["AI campaign creation", "server infrastructure", "product resets"],
  },
];
