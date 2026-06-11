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
