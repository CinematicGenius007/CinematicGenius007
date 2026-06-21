import { resumeFacts } from "../content/resumeFacts";

export type ProgramLens = "launch" | "scale" | "stabilize";

export const tickerItems = [
  "PROGRAM STATUS: GREEN",
  "SCOPE: AI CAMPAIGN CREATION · LOCKED",
  "RISK REGISTER: REVIEWED",
  "DEPENDENCIES: MAPPED",
  "TWO ROLES RUNNING IN PARALLEL SINCE 2024",
  "DECISION LOG: 8 CALLS ON RECORD",
  "NEXT MILESTONE: YOUR TEAM",
];

export const pmStats: { value: number; decimals?: number; suffix: string; label: string }[] = [
  { value: 5, suffix: " yrs", label: "shipping in production" },
  { value: 2, suffix: "", label: "roles run in parallel" },
  { value: 6, suffix: "+", label: "product surfaces owned" },
  { value: 9.98, decimals: 2, suffix: "", label: "CGPA · CSE, class of 2022" },
];

export const ganttRange = { start: 2018.0, end: 2026.8, today: 2026.45 };

export const ganttTracks = [
  { label: "B.Tech CSE", detail: "Chitkara · CGPA 9.98", start: 2018.5, end: 2022.5 },
  { label: "JetBrains Hyperskill", detail: "freelance project tester", start: 2022.0, end: 2023.3 },
  { label: "Optmyzr", detail: "intern → software engineer", start: 2021.0, end: 2026.45 },
  { label: "Zariya AI", detail: "technical co-founder + CTO", start: 2024.6, end: 2026.45 },
];

export const pmSections = [
  { id: "brief", num: "01", label: "Brief" },
  { id: "control", num: "02", label: "Control room" },
  { id: "log", num: "03", label: "Decision log" },
  { id: "cases", num: "04", label: "Case studies" },
  { id: "shipped", num: "05", label: "Shipped" },
  { id: "profile", num: "06", label: "Operator" },
  { id: "contact", num: "07", label: "Handoff" },
];

export const caseStudies = [
  {
    company: resumeFacts.experience.optmyzr.company,
    role: resumeFacts.experience.optmyzr.role,
    period: "2022 →",
    meta: "Full-time",
    extra: "(Intern 2021–2022)",
    title: "Building across the product suite that supports real ad spend.",
    subtitle: "AI Campaign Creation · Portfolios · Alerts · Scripts · Reporting · .NET",
    context: "A mature ad-tech suite where dashboards, alerts, audits, scripts, automation, reporting, and campaign flows translate intent into decisions that can affect real budgets.",
    shipped: "AI campaign creation, portfolio alerts and support, Campaign Automator fixes, Google Ads Scripts maintenance, React reporting, and .NET campaign services.",
    signal: "Strong bug-duty record across many surfaces, alongside end-to-end feature and production ownership.",
  },
  {
    company: resumeFacts.experience.zariya.company,
    role: resumeFacts.experience.zariya.role,
    period: "Aug 2024 →",
    meta: "Founding team",
    title: "Designing the product architecture and keeping the servers alive.",
    subtitle: "Architecture · Infrastructure · AI-assisted products",
    context: "Early-stage AI SaaS with multiple products, a small team, and a codebase that has needed both 0-to-1 building and architectural correction.",
    shipped: "Architecture, infrastructure, product rebuilds, a 70-session voice interviewer, Zariya Recruit, and multiple features from scratch.",
    signal: "Technical co-founder owning 80% of AWS operations and the product's architectural direction.",
  },
];

export const projects = [
  {
    number: "01 / interviews.zariya.ai",
    href: "https://interviews.zariya.ai",
    title: "Interview practice that actually pushes back.",
    body: "Mid-answer follow-ups and specific scoring on a voice platform designed for 70 concurrent sessions.",
    outcome: "Scope: 0→1 product · Role: eng lead",
  },
  {
    number: "02 / sudoku-solver",
    href: "https://sudoku-solver.cinematicgenius007.com",
    title: "Two algorithms, same board, visible.",
    body: "Brute-force vs. constraint-propagation, racing step by step. Makes the smart one legible to non-programmers.",
    outcome: "Scope: solo build · Role: everything",
  },
  {
    number: "03 / ultimate-ttt",
    href: "https://ultimate-ttt.cinematicgenius007.com",
    title: "Tic-tac-toe, strategic.",
    body: "Your move dictates the opponent's next sub-board. Weekend build; better than slide-deck game theory.",
    outcome: "Scope: weekend · Role: solo",
  },
];

export const profileScope = [
  "AI campaign creation owned end-to-end at Optmyzr",
  "Portfolio-level alerts and portfolio support across Optmyzr",
  "Google Ads Scripts, Campaign Automator, reporting, and .NET services",
  "Technical co-founder with 80% AWS ownership at Zariya AI",
  "70-session voice interviewer and Zariya Recruit architecture",
  "B.Tech CSE, Chitkara · CGPA 9.98 · 2022",
];

export const programLenses = [
  {
    id: "launch" as const,
    label: "Launch",
    title: "AI campaign creation from zero to usable product.",
    summary: "Turn an ambiguous AI-assisted workflow into a production surface: define the shape, build the path, keep correctness visible, and ship without hiding behind demo magic.",
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
    id: "scale" as const,
    label: "Scale",
    title: "Portfolio support across surfaces, not as a one-off patch.",
    summary: "Portfolio work touched dashboards, audits, alerts, and account-level views. The program problem was consistency: make the same idea behave across multiple product contexts.",
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
    id: "stabilize" as const,
    label: "Stabilize",
    title: "Maintenance, bugs, and infrastructure as the real operating system.",
    summary: "Campaign Automator, Scripts, bug duty, and Zariya AI infrastructure all point to the same program skill: keep the system understandable when the easy version has stopped working.",
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

export type Era = { id: string; year: string; title: string; status: string; decisions: string[]; active: string[] };

export const eraLog: Era[] = [
  {
    id: "era-2018",
    year: "2018–22",
    title: "The first paid proof",
    status: "Chitkara B.Tech CSE · JetBrains Hyperskill project testing in parallel",
    decisions: ["Take testing work seriously instead of waiting for a 'real' job.", "Review Java and Go projects until feedback ships into released content."],
    active: ["project testing", "B.Tech CSE · CGPA 9.98"],
  },
  {
    id: "era-2021",
    year: "2021–22",
    title: "Into production",
    status: "Optmyzr · SDE intern · React, TypeScript, C#",
    decisions: ["Join a domain where wrong assumptions touch real ad spend.", "Volunteer for bug duty — the fastest tour of every product surface."],
    active: ["Campaign Automator", "Google Ads Scripts", "bug duty"],
  },
  {
    id: "era-2022",
    year: "2022–24",
    title: "Ownership expands",
    status: "Optmyzr · Software Development Engineer",
    decisions: ["Carry AI campaign creation from zero to production.", "Treat portfolio support as a system capability across tools."],
    active: ["AI campaign creation", "portfolio alerts", "reporting + .NET"],
  },
  {
    id: "era-2024",
    year: "2024–26",
    title: "Ownership, twice",
    status: "Zariya AI · Technical Co-Founder & CTO · Optmyzr in parallel",
    decisions: ["Take the Zariya technical co-founder role in parallel.", "Architect the 70-session voice pipeline and reset product foundations when needed."],
    active: ["AI interviews", "Zariya Recruit", "80% AWS operations"],
  },
];
