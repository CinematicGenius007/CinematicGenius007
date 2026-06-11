// Persona narrative content for the anime mode. Arc/battle copy duplicates
// facts from src/content/profile.ts; semantic de-forking is a later slice.


export const animeArcs = [
  {
    id: "origin",
    yr: "2020 – 2024",
    num: "壱",
    title: "Origin arc.",
    body: "Chitkara University, B.E. in Computer Science. Graduated with a CGPA of 9.95. Debate, theatre, a sleep schedule that was sometimes a suggestion.",
    current: false,
  },
  {
    id: "training",
    yr: "2023 →",
    num: "弐",
    title: "Training arc.",
    body: "Optmyzr. Intern to SDE I. Moves through Campaign Automator, Scripts, portfolios, audits, alerts, dashboards, and bug duty. Sharpens debugging on live ad-tech systems.",
    current: false,
  },
  {
    id: "current",
    yr: "2024 →",
    num: "参",
    title: "Current arc.",
    body: "Zariya AI. Architectural engineer. Designs the software, maintains the servers, helps rebuild the product when the shape goes wrong. Still at Optmyzr by day.",
    current: true,
  },
];

export const animeBattles = [
  {
    id: "interviews",
    num: "零",
    title: ["Interviews", "by Zariya."],
    body: "An AI interviewer that actually pushes back. Follow-up questions. Specific scoring. A report you could hand to a mentor. Built because every other practice tool felt like a wall.",
    link: "live · interviews.zariya.ai ↗",
    url: "https://interviews.zariya.ai/",
    featured: true,
  },
  {
    id: "sudoku",
    num: "壱",
    title: ["Sudoku,", "twice."],
    body: "Two solvers race on one board. Brute force vs. constraint propagation. Strategy becomes visible.",
    link: "live ↗",
    url: "https://sudoku-solver.cinematicgenius007.com/",
    featured: false,
  },
  {
    id: "ttt",
    num: "弐",
    title: ["Ultimate", "TTT."],
    body: "Tic-tac-toe where your move picks the next sub-board. Simple rules, deep play. Weekend build after losing to a cousin four times.",
    link: "live ↗",
    url: "https://ultimate-ttt.cinematicgenius007.com/",
    featured: false,
  },
];

// ── Episode 01 kinetic layer ──────────────────────────────────────────

export type BattleRound = {
  label: string;
  text: string;
  hp: number; // problem HP remaining after this round
};

// Each battle = a fight against a problem. Rounds advance on attack.
export const battleRounds: Record<string, BattleRound[]> = {
  interviews: [
    { label: "ROUND 1 — the enemy appears", text: "Every interview-practice tool gives the same vague feedback. Candidates can't improve on vague. The wall wins again.", hp: 100 },
    { label: "ROUND 2 — counterattack", text: "An AI interviewer that pushes back: follow-up questions mid-answer, scoring that names the exact weakness.", hp: 40 },
    { label: "FINISHING MOVE", text: "End-of-session report you could hand to a mentor. Live product, active users.", hp: 0 },
  ],
  sudoku: [
    { label: "ROUND 1 — the enemy appears", text: "Algorithms are invisible. Slide decks explain them to nobody.", hp: 100 },
    { label: "ROUND 2 — counterattack", text: "Two solvers race on the same board — brute force guessing next to constraint propagation thinking.", hp: 45 },
    { label: "FINISHING MOVE", text: "Strategy becomes visible, step by step. Better intro than any lecture.", hp: 0 },
  ],
  ttt: [
    { label: "ROUND 1 — the enemy appears", text: "Tic-tac-toe is solved. Boring. Beneath us.", hp: 100 },
    { label: "ROUND 2 — counterattack", text: "One rule change: your move picks the opponent's sub-board. Depth appears out of nowhere.", hp: 45 },
    { label: "FINISHING MOVE", text: "Deceptively strategic. Built in a weekend after losing to a cousin four times.", hp: 0 },
  ],
};

export const coldOpen = {
  beats: [
    { kicker: "PRODUCTION · 2:47 AM", line: "a bug only customers can see." },
    { kicker: "PANEL 02", line: "he opens the logs.", sfx: "ゴゴゴ" },
  ],
  sfx: "デバッグ",
  episode: "EPISODE 01",
  title: "THE DEBUGGER",
  kana: "デバッガー",
};
