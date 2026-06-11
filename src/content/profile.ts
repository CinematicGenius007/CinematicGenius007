import type { ModeId } from "../modes/types";
import type { Experience, ModeText, Project } from "./types";

export type { Experience, ModeText, Project } from "./types";

export function resolve(text: ModeText | string, mode: ModeId): string {
  if (typeof text === "string") return text;
  return text[mode] ?? text._default;
}

export const hero = {
  marker: "01 / INTRODUCTION",
  name: "AYUSH SAINI",
  role: {
    _default: "SOFTWARE ENGINEER — FULL STACK",
    everyday: "Software engineer",
    anime: "エンジニア / FULL STACK",
    retro: "FULL STACK ENGINEER / SYSTEMS FIXER",
  } as ModeText,
  statement: {
    _default:
      "Full-stack engineer at Optmyzr. I work across ad-tech product surfaces where correctness matters: AI campaign creation, portfolio workflows, alerts, audits, automation, scripts, and the bugs that only show up after real customers touch the system.",
    pm: "Full-stack engineer who's shipped ad-tech features end-to-end at production scale. At Optmyzr I most recently built AI campaign creation from scratch, created portfolio-level alerts, and helped expand portfolio support across the suite.",
    everyday:
      "I make software for a living. Specifically, I help build the tools that advertisers use to manage their Google Ads campaigns. Most of my week is spent building new workflows, making sure they work correctly, and fixing them when they don't.",
    designer:
      "I build software that has to work. The aesthetic layer and the correctness layer aren't in competition — one earns the right to the other.",
    anime:
      "Two years ago he joined an ad-tech company as an intern. He stayed. Then he moved through dashboards, automations, scripts, alerts, and a full AI campaign creation arc.",
    signal:
      "The signal is breadth under pressure: shipped new product surfaces, maintained old ones, debugged production issues, and built the recent AI campaign creation flow from zero.",
    director:
      "Theatre kid turned systems engineer. I build the things behind the surface: product flows, automation, infrastructure, and the quiet decisions that keep software coherent.",
    retro:
      "I like old interfaces, loud borders, and systems that explain themselves. Most of my work is still modern software; I just don't think modern has to mean generic.",
  } as ModeText,
  animeTitle: "プロローグ",
  animeSubtitle: "AN ENGINEER ENTERS THE FIELD",
};

export const about = {
  sectionNumber: "02",
  sectionKicker: {
    _default: "THE WORK",
    anime: "CHAPTER 01",
    data: "PROFILE",
    everyday: "ABOUT ME",
  } as ModeText,
  p1: {
    _default:
      "I like the parts of a codebase nobody wants to open. Usually because something there is wrong and has been wrong for a while. Over the last two years that's meant maintaining Google Ads Scripts, improving Campaign Automator, shipping portfolio dashboards and alerts, and building AI campaign creation from scratch at Optmyzr.",
    pm: "Over the past two years I've shipped mid-to-high complexity features end-to-end at Optmyzr — from spec to production. The work lives in ad-tech: dashboards, portfolios, audits, alerts, automation, scripts, and campaign creation flows where bad assumptions can touch real ad spend.",
    everyday:
      "I make software for a living. Specifically, I help build the tools that advertisers use to manage their Google Ads campaigns. That includes new AI-assisted campaign flows, account and portfolio dashboards, alerts, audits, scripts, and a steady amount of production debugging.",
    data: "Primary role: SDE-1 at Optmyzr (ad-tech, Google Ads tooling). Side role: founding/architectural engineer at Zariya AI (early-stage SaaS). Two years of continuous production work across new features, maintenance, debugging, and infrastructure.",
    designer:
      "At Optmyzr I work on product surfaces that turn complex advertising intent into usable workflows. It's backend-heavy, correctness-heavy work, which is exactly why I care about form: if the internal logic is messy, the surface usually leaks it.",
    retro:
      "I gravitate toward systems with visible guts. Automation tools, production bugs, dashboards, scripts, side projects with strong constraints, anything where the structure shows if you're paying attention.",
    signal:
      "Two years working near the places where ad-tech software touches real money. AI campaign creation, Campaign Automator features and fixes, portfolio alerts, audits, scripts, and production issues where correctness is the only acceptable output.",
    director:
      "Most of my work is invisible until it fails. Dashboards, alerts, scripts, automation, campaign creation, servers, infrastructure. That's the role — not always in the spotlight, but often deciding whether the spotlight behaves.",
  } as ModeText,
  p2: {
    _default:
      "Backend is where I'm most useful, but I've spent enough time on the other side to know when a bug is really a UI assumption in a trench coat.",
    pm: "At Zariya AI, my role is more architectural: software design, technical direction, product foundations, and the servers behind it. The scope is smaller than Optmyzr; the decision radius is bigger.",
    everyday:
      "Outside of work I've built a few personal projects — an AI interview tool, a sudoku solver you can actually watch think, and a two-player strategy game that's harder than it sounds.",
    data: "Core competency: backend systems, large-scale debugging, feature ownership end-to-end, architecture, infrastructure. Secondary: frontend, mentorship, technical communication.",
    designer:
      "This portfolio isn't supposed to be one neat template with six paint jobs. It's the same person reframed six different ways, because audience changes hierarchy, rhythm, and what deserves the spotlight.",
    retro:
      "I still like the old-web instinct of making interfaces feel like places instead of blank containers. That doesn't mean nostalgia for its own sake. It means giving the UI a point of view.",
    signal:
      "Backend-first. But I've found enough bugs hiding behind a clean UI to know the signal breaks wherever it wants. I just find it faster now.",
    director:
      "I do this at Optmyzr and at Zariya — different stages, different scales, same craft. Build the thing that works. Then make it work better.",
  } as ModeText,
  notes: [
    {
      _default: "Two years in ad-tech. Long enough to have opinions about Google Ads Scripts, campaign creation, and portfolio workflows.",
    },
    {
      _default:
        "I've never shipped the clever version first. The clever version comes after the boring version has survived a week.",
    },
    {
      _default: "Comfortable across frontend, backend, and systems thinking.",
    },
    {
      _default: "Prefers shipping work that survives production reality.",
    },
  ] as ModeText[],
};

export const experiences: Experience[] = [
  {
    id: "optmyzr",
    company: "Optmyzr",
    role: "Software Development Engineer 1",
    period: "Aug 2024 – Present",
    mode: "Internship Apr 2023 – Aug 2024",
    bullets: [
      {
        _default:
          "Built AI campaign creation from scratch and own it end-to-end as the most recent major project.",
      },
      {
        _default:
          "Created portfolio-level alerts and helped expand portfolio support across Portfolio Dashboard, All Account Dashboard, Audits, Alerts, and related workflows.",
      },
      {
        _default:
          "Helped maintain and improve Campaign Automator with feature work and long-running bugfix ownership; contributed occasional Rule Engine fixes without overstating ownership.",
      },
      {
        _default:
          "Continuously maintained Google Ads Scripts: new features, bug fixes, customer queries, and production support.",
      },
      {
        _default:
          "Strong bug-duty record across a wide variety of product surfaces; often trusted with messy, cross-cutting issues.",
      },
    ],
    pmCase: {
      context:
        "Ad-tech SaaS with mature and newer product surfaces: dashboards, portfolios, alerts, audits, automation, scripts, and AI-assisted campaign creation. The correctness bar is high because bad software assumptions can touch real ad spend.",
      shipped:
        "AI campaign creation from scratch; portfolio-level alerts; portfolio support across dashboards, audits, and alerts; Campaign Automator features and fixes; ongoing Google Ads Scripts maintenance and production bug triage.",
      signal:
        "Trusted across a broad product suite and especially useful on bug duty: new feature ownership, legacy maintenance, customer-facing fixes, and cross-surface debugging.",
    },
    arcName: "訓練編 — TRAINING ARC",
    arcChapter: "第1章",
  },
  {
    id: "zariya",
    company: "Oddmind Innovations (Zariya AI)",
    role: "Architectural Engineer",
    period: "Late 2024 – Present",
    mode: "Part-time, early-stage",
    bullets: [
      {
        _default:
          "Architectural engineer for Zariya AI: software design, technical direction, and product foundations across multiple 0-to-1 features.",
      },
      {
        _default:
          "Implemented and maintain the full server infrastructure; primary owner for production reliability and deployment shape.",
      },
      {
        _default:
          "Helped reset the software when it was drifting: went back to the drawing board, fixed architectural issues, and stabilized the product surface.",
      },
      {
        _default:
          "Built multiple products and features from scratch, including Interviews by Zariya, while spending more time on architecture than pure coding.",
      },
    ],
    pmCase: {
      context:
        "Early-stage AI SaaS. Small team, large decision radius, and a codebase that needed both new product development and architectural correction.",
      shipped:
        "System architecture, software design, server infrastructure, multiple 0-to-1 products and features, and the AI interview product at interviews.zariya.ai.",
      signal:
        "Primary technical owner for infrastructure and production stability; architectural point of contact when the product needs to be reshaped instead of patched.",
    },
    arcName: "創設編 — FOUNDING ARC",
    arcChapter: "第3章",
  },
  {
    id: "jetbrains",
    company: "JetBrains Hyperskill",
    role: "Project Tester",
    period: "2022 – 2023",
    mode: "Freelance",
    bullets: [
      {
        _default:
          "Tested educational programming projects for correctness, structure, and learning flow.",
      },
      {
        _default:
          "Worked across Java and Go projects, giving feedback that shaped content before release.",
      },
    ],
    pmCase: {
      context: "Freelance project quality work for an educational platform used by thousands of learners.",
      shipped: "Reviewed and quality-tested Java and Go educational projects.",
      signal: "Feedback accepted into released content.",
    },
    arcName: "準備編 — PREPARATION ARC",
    arcChapter: "第2章",
  },
];

export const projects: Project[] = [
  {
    id: "interviews",
    number: "p.01",
    name: "Interviews by Zariya",
    url: "https://interviews.zariya.ai/",
    tech: ["Next.js", "TypeScript", "LLM"],
    description: {
      _default:
        "An AI interviewer that actually pushes back. Mid-answer follow-ups, scoring that's specific instead of vague, and an end-of-session report you could hand to a mentor. Built because every other interview-practice tool I tried felt like talking to a wall.",
      pm: "Interview practice with feedback that's specific instead of vague. Zero-to-one product — I identified the gap, picked the tech, and built the V1.",
      everyday: "A tool that practices job interviews with you — and actually gives you useful feedback afterward.",
      designer:
        "Conversational interface built around the rhythm of a real interview. The feedback loop is the product.",
    },
    pmProblem: "Most interview-practice tools give generic feedback. Candidates can't improve on vague.",
    pmOutcome: "Live product with active users. Specific mid-answer follow-ups and end-of-session report.",
  },
  {
    id: "sudoku",
    number: "p.02",
    name: "Sudoku Solver",
    url: "https://sudoku-solver.cinematicgenius007.com/",
    tech: ["Next.js", "TypeScript", "CSS"],
    description: {
      _default:
        "Two solvers — brute-force and constraint-propagation — racing on the same board, step by step. Watching the naïve one guess-and-backtrack next to the one that thinks is a better intro to algorithms than a slide deck would be.",
      pm: "Visual algorithm comparison tool. Two approaches to the same problem, animated side by side so the difference is obvious.",
      everyday:
        "Two ways to solve a sudoku, drawn out step by step. One guesses randomly; the other actually thinks.",
      designer: "Side-by-side animated visualization. The design serves the cognitive comparison.",
    },
    pmProblem: "Algorithm explanations are abstract. Hard to internalize without seeing the difference.",
    pmOutcome: "Visual, step-by-step diff between brute-force and constraint-propagation on a live board.",
  },
  {
    id: "ttt",
    number: "p.03",
    name: "Ultimate TTT",
    url: "https://ultimate-ttt.cinematicgenius007.com/",
    tech: ["React", "Vite", "TypeScript"],
    description: {
      _default:
        "Tic-tac-toe, except your move tells the opponent which sub-board they have to play in. Deceptively strategic. Built over a weekend after I lost to my cousin four times in a row.",
      pm: "Two-player strategy game with emergent depth from a single rule change. Built for fun; shipped as a clean product.",
      everyday:
        "Tic-tac-toe inside tic-tac-toe. Your move tells the other player where they have to play next. Surprisingly hard.",
      designer: "Simple rule, complex strategy. The UI gets out of the way and lets the game work.",
    },
    pmProblem: "Wanted to understand how a single constraint changes game dynamics.",
    pmOutcome: "Fully playable two-player game. Deceptively strategic from one rule addition.",
  },
];

export const skillGroups = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "C#", "Go", "Java", "C / C++"],
  },
  {
    label: "Frameworks",
    items: ["React", "Next.js", "Vite", "Express.js"],
  },
  {
    label: "Working Style",
    items: [
      "End-to-end ownership",
      "Architecture + infrastructure",
      "Large-scale debugging",
      "Maintainable systems",
      "Calm production response",
    ],
  },
];

export const strengths = [
  "Debugging complex systems",
  "Backend architecture",
  "Feature ownership",
  "Infrastructure ownership",
  "Mentorship",
  "Production reliability",
];

export const education = [
  {
    school: "Chitkara University",
    degree: "B.E. in Computer Science",
    period: "2020 – 2024",
    result: "CGPA 9.95 / 10",
  },
  {
    school: "CBSE Class XII",
    degree: "",
    period: "2020",
    result: "96.4%",
  },
];

export const outside = {
  _default:
    "Debate and theatre through college. Two of the more useful things I've done — half my job at Optmyzr is explaining code-shaped problems to non-code-shaped people.",
  everyday:
    "I did debate and theatre in college. Turns out both are useful — a lot of software engineering is explaining things to people who don't write code.",
} as ModeText;

export const contact = {
  sectionNumber: "06",
  sectionKicker: "CONTACT",
  h2: {
    _default: "I read my email.",
    pm: "Let's talk.",
    everyday: "Say hello.",
    retro: "Open a window.",
  } as ModeText,
  body: {
    _default:
      "If you're hiring, building, or stuck on something weird, the fastest way to me is below.",
    pm: "Hiring, building a product, or want to talk through a system problem — I'm available.",
    everyday: "If you want to get in touch, email is the best way.",
    retro: "If you're building something opinionated, messy, or unexpectedly difficult, that's usually my lane.",
  } as ModeText,
};
