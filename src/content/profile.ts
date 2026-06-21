import type { ModeId } from "../modes/types";
import type { Experience, ModeText, Project } from "./types";
import { resumeFacts } from "./resumeFacts";

export type { Experience, ModeText, Project } from "./types";

export function resolve(text: ModeText | string, mode: ModeId): string {
  if (typeof text === "string") return text;
  return text[mode] ?? text._default;
}

export const hero = {
  marker: "01 / INTRODUCTION",
  name: "AYUSH SAINI",
  role: {
    _default: "SOFTWARE ENGINEER — FULL STACK · AI & SYSTEMS",
    everyday: "Software engineer",
    anime: "エンジニア / FULL STACK",
    retro: "FULL STACK ENGINEER / SYSTEMS FIXER",
  } as ModeText,
  statement: {
    _default:
      "Software engineer and technical co-founder working across ad-tech SaaS, full-stack product engineering, and AI systems — from Optmyzr's global PPC platform to Zariya's real-time hiring products.",
    pm: "Software engineer at Optmyzr and Technical Co-Founder & CTO at Zariya AI. Recent scope spans AI campaign creation, portfolio alerts, a 70-session voice platform, and hiring-system architecture.",
    everyday:
      "I build software for advertisers and hiring teams. That means reporting tools and campaign systems at Optmyzr, plus AI interviews and recruiting workflows at Zariya AI.",
    designer:
      "I build software that has to work. The aesthetic layer and the correctness layer aren't in competition — one earns the right to the other.",
    anime:
      "He joined ad-tech as an intern. He stayed. Then he moved through dashboards, automations, scripts, alerts, AI campaign creation, and a founding CTO arc.",
    signal:
      "The signal is breadth under pressure: new product surfaces, legacy maintenance, production debugging, AWS ownership, and a 70-session voice pipeline.",
    director:
      "Theatre kid turned systems engineer and technical co-founder. I build the things behind the surface: product flows, automation, voice pipelines, infrastructure, and the quiet decisions that keep software coherent.",
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
      "I like the parts of a codebase nobody wants to open. At Optmyzr that has meant AI campaign creation, Scripts, Campaign Automator, portfolios, reporting dashboards, .NET services, and production bugs across the seams.",
    pm: "At Optmyzr I've shipped features end-to-end across dashboards, portfolios, alerts, audits, automation, scripts, reporting, and campaign flows. At Zariya I lead architecture across real-time interviews and recruiting systems.",
    everyday:
      "I help build the tools advertisers use to manage campaigns — including AI-assisted creation, dashboards, alerts, audits, scripts, and automation — and AI products for hiring teams.",
    data: "Roles: Software Development Engineer at Optmyzr (2022–present); Technical Co-Founder & CTO at Zariya AI (Aug 2024–present). Production scope spans ad-tech SaaS, AI hiring, real-time voice, and cloud infrastructure.",
    designer:
      "At Optmyzr I work on product surfaces that turn complex advertising intent into usable workflows. It's backend-heavy, correctness-heavy work, which is exactly why I care about form: if the internal logic is messy, the surface usually leaks it.",
    retro:
      "I gravitate toward systems with visible guts. Automation tools, production bugs, dashboards, scripts, side projects with strong constraints, anything where the structure shows if you're paying attention.",
    signal:
      "Evidence across the seams: AI campaign creation, Campaign Automator, Scripts, portfolio alerts, production bugs, and an AI interviewer supporting 70 concurrent voice sessions.",
    director:
      "Most of my work is invisible until it fails. Dashboards, alerts, scripts, automation, voice pipelines, servers, infrastructure. That's the role — deciding whether the spotlight behaves.",
  } as ModeText,
  p2: {
    _default:
      "Backend is where I'm most useful, but I've spent enough time on the other side to know when a bug is really a UI assumption in a trench coat.",
    pm: "At Zariya AI, I lead technical architecture, system design, and engineering decisions across the product suite. The scope includes 80% of AWS infrastructure and technical operations.",
    everyday:
      "Outside the main work, I've built an AI interview tool, a sudoku solver you can watch think, and a two-player strategy game that's harder than it sounds.",
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
      _default: "Production engineering since 2021, from an Optmyzr internship to full-time software engineering and technical co-founding.",
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
    company: resumeFacts.experience.optmyzr.company,
    role: resumeFacts.experience.optmyzr.role,
    period: resumeFacts.experience.optmyzr.period,
    mode: `Internship ${resumeFacts.experience.optmyzr.internshipPeriod}`,
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
          "Maintained Campaign Automator and Google Ads Scripts through feature work, customer queries, production support, and long-running bugfix ownership.",
      },
      {
        _default:
          "Developed React and TypeScript reporting surfaces plus C# (.NET) services for campaign optimization, budget management, and data pipelines.",
      },
      {
        _default:
          "Contributed to an award-winning PPC platform used by thousands of advertisers while maintaining test coverage and service reliability.",
      },
    ],
    pmCase: {
      context:
        "Ad-tech SaaS with mature and newer product surfaces: dashboards, portfolios, alerts, audits, automation, scripts, reporting, and campaign workflows where bad assumptions can touch real ad spend.",
      shipped:
        "AI campaign creation; portfolio-level alerts; portfolio support across dashboards, audits, and alerts; Campaign Automator and Google Ads Scripts work; React reporting; and .NET campaign services.",
      signal:
        "Trusted across a broad product suite for new feature ownership, legacy maintenance, customer-facing fixes, and cross-surface debugging.",
    },
    arcName: "訓練編 — TRAINING ARC",
    arcChapter: "第1章",
  },
  {
    id: "zariya",
    company: resumeFacts.experience.zariya.company,
    role: resumeFacts.experience.zariya.role,
    period: resumeFacts.experience.zariya.period,
    mode: "Founding team · Remote, India",
    bullets: [
      {
        _default:
          "Leads technical architecture, system design, and engineering decisions across multiple 0-to-1 products and features.",
      },
      {
        _default:
          "Architected an AI interview platform supporting 70 concurrent real-time voice sessions with STT, LLM, TTS, WebRTC, and a Go-based async evaluation worker.",
      },
      {
        _default:
          "Co-architects Zariya Recruit across call screening, resume parsing, ATS, scheduling, and the end-to-end hiring pipeline.",
      },
      {
        _default:
          "Owns 80% of AWS infrastructure and technical operations, and has reset architectural foundations when patching was no longer enough.",
      },
    ],
    pmCase: {
      context: "Early-stage AI SaaS with a small team, a wide technical decision radius, and both new-product and architectural-correction work.",
      shipped: "System architecture, AWS infrastructure, product rebuilds, Interviews by Zariya, and the foundation for Zariya Recruit.",
      signal: "Technical co-founder responsible for architecture, production stability, and 80% of AWS operations.",
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
    tech: ["Next.js", "Python", "Go", "WebRTC", "AWS"],
    description: {
      _default:
        "An AI interviewer that pushes back, now backed by a real-time voice system supporting 70 concurrent sessions across Whisper, Claude, Sarvam TTS, WebRTC, and an async Go evaluation worker.",
      pm: "A 70-concurrent-session voice interview system with specific feedback, mid-answer follow-ups, and an async post-session scoring workflow.",
      everyday: "A tool that practices job interviews with you, follows up on your answers, and can run 70 voice sessions at once.",
      designer:
        "Conversational rhythm on the surface; a coordinated real-time voice and evaluation pipeline underneath.",
    },
    pmProblem: "Interview tools often give generic feedback, while real-time voice adds media and evaluation complexity.",
    pmOutcome: "Specific feedback and follow-ups on a platform supporting 70 concurrent sessions.",
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
      everyday: "Two ways to solve a sudoku, drawn out step by step. One guesses randomly; the other actually thinks.",
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
      _default: "Tic-tac-toe, except your move tells the opponent which sub-board they have to play in. Deceptively strategic. Built over a weekend after I lost to my cousin four times in a row.",
      pm: "Two-player strategy game with emergent depth from a single rule change. Built for fun; shipped as a clean product.",
      everyday: "Tic-tac-toe inside tic-tac-toe. Your move tells the other player where they have to play next. Surprisingly hard.",
      designer: "Simple rule, complex strategy. The UI gets out of the way and lets the game work.",
    },
    pmProblem: "Wanted to understand how a single constraint changes game dynamics.",
    pmOutcome: "Fully playable two-player game. Deceptively strategic from one rule addition.",
  },
];

export const skillGroups = [
  {
    label: "Languages",
    items: [...resumeFacts.skills.languages, "Java", "C / C++"],
  },
  {
    label: "Frameworks",
    items: ["React", "Next.js 14", "Vite", "Tailwind CSS", "Node.js", ".NET (C#)", "Express.js"],
  },
  {
    label: "Working Style",
    items: ["End-to-end ownership", "Architecture + infrastructure", "Large-scale debugging", "Maintainable systems", "Calm production response"],
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
  resumeFacts.education.university,
  resumeFacts.education.school,
];

export const outside = {
  _default:
    "Debate and theatre through college. Two of the more useful things I've done — half my job is explaining code-shaped problems to non-code-shaped people.",
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
