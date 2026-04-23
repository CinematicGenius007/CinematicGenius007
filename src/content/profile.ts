import type { ModeId } from "../modes/types";

type ModeText = { _default: string } & Partial<Record<ModeId, string>>;

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
      "Full-stack engineer at Optmyzr. I spend most of my week in the C# rule engine that decides what gets changed in someone's Google Ads account overnight — which is a nicer way of saying I spend a lot of time near the part that breaks.",
    pm: "Full-stack engineer who's shipped ad-tech features end-to-end at production scale. At Optmyzr I own the Rule Engine, Campaign Automator, and Audits — the surfaces that determine what actually changes in a Google Ads account.",
    everyday:
      "I make software for a living. Specifically, I help build the tools that advertisers use to manage their Google Ads campaigns. Most of my week is spent making sure things work correctly — and fixing them when they don't.",
    designer:
      "I build software that has to work. The aesthetic layer and the correctness layer aren't in competition — one earns the right to the other.",
    anime:
      "Two years ago he joined an ad-tech company as an intern. He stayed. Then he ended up owning the part that runs overnight and changes strangers' money.",
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
      "I like the parts of a codebase nobody wants to open. Usually because something there is wrong and has been wrong for a while. Over the last two years that's looked like owning Campaign Automator, the Rule Engine, Audits, and the Google Ads Scripts layer at Optmyzr.",
    pm: "Over the past two years I've shipped mid-to-high complexity features end-to-end at Optmyzr — from spec to production. The work lives in ad-tech, where the Rule Engine deciding what changes in a Google Ads account overnight is the thing that actually matters to customers.",
    everyday:
      "I make software for a living. Specifically, I help build the tools that advertisers use to manage their Google Ads campaigns. Most of my week is spent making sure things work correctly and fixing them when they don't.",
    data: "Primary role: SDE-1 at Optmyzr (ad-tech, Google Ads tooling). Side role: founding engineer at Zariya (early-stage SaaS). Two years of continuous production ownership.",
    designer:
      "At Optmyzr I work on the parts that decide what actually changes in a customer's Google Ads account. It's backend-heavy, correctness-heavy work, which is exactly why I care about form: if the internal logic is messy, the surface usually leaks it.",
    retro:
      "I gravitate toward systems with visible guts. Rule engines, production bugs, side projects with strong constraints, anything where the structure shows if you're paying attention.",
  } as ModeText,
  p2: {
    _default:
      "Backend is where I'm most useful, but I've spent enough time on the other side to know when a bug is really a UI assumption in a trench coat.",
    pm: "I've also co-founded Zariya's engineering culture, which means making technical decisions with a small team — not just implementing them. The scope is smaller than Optmyzr; the decision radius is bigger.",
    everyday:
      "Outside of work I've built a few personal projects — an AI interview tool, a sudoku solver you can actually watch think, and a two-player strategy game that's harder than it sounds.",
    data: "Core competency: backend systems, large-scale debugging, feature ownership end-to-end. Secondary: frontend, mentorship, technical communication.",
    designer:
      "This portfolio isn't supposed to be one neat template with six paint jobs. It's the same person reframed six different ways, because audience changes hierarchy, rhythm, and what deserves the spotlight.",
    retro:
      "I still like the old-web instinct of making interfaces feel like places instead of blank containers. That doesn't mean nostalgia for its own sake. It means giving the UI a point of view.",
  } as ModeText,
  notes: [
    {
      _default: "Two years in ad-tech. Long enough to have opinions about Google Ads Scripts.",
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

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  mode: string;
  bullets: ModeText[];
  pmCase?: {
    context: string;
    shipped: string;
    signal: string;
  };
  arcName?: string;
  arcChapter?: string;
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
          "Own Campaign Automator, Rule Engine, Audits, and Google Ads Scripts support end-to-end.",
      },
      {
        _default:
          "Shipped Criteria Filter View, Portfolios, and Portfolio Alerts from spec to production.",
      },
      {
        _default:
          "On-call for the bugs other people hand off. The Rule Engine's decision tree is in my head, for better and worse.",
      },
      {
        _default: "Four interns through onboarding. Three of them still work here.",
      },
    ],
    pmCase: {
      context:
        "Ad-tech SaaS. The Rule Engine is the core product surface — it decides what changes happen in a customer's Google Ads account overnight. High correctness requirement; a bug here costs real money.",
      shipped:
        "Campaign Automator overhaul, Criteria Filter View, Portfolios, and Portfolio Alerts — shipped end-to-end from spec. Also own the Google Ads Scripts layer and production bug triage.",
      signal:
        "Trusted with the highest-complexity surfaces on the team. Four interns mentored; all delivered. The bugs that other engineers hand off usually end with me.",
    },
    arcName: "訓練編 — TRAINING ARC",
    arcChapter: "第1章",
  },
  {
    id: "zariya",
    company: "Oddmind Innovations (Zariya)",
    role: "Founding Engineer",
    period: "Late 2024 – Present",
    mode: "Part-time, early-stage",
    bullets: [
      {
        _default:
          "Picked the stack (Next.js + Express), set up the repo, wrote the first feature.",
      },
      {
        _default:
          "Still the person most founders ping when something in production looks wrong.",
      },
      {
        _default:
          "The interviews.zariya.ai product came out of a conversation we kept having about how bad interview practice is.",
      },
    ],
    pmCase: {
      context:
        "Early-stage SaaS. No inherited codebase, no existing team culture. Joined as the first engineer alongside the founders.",
      shipped:
        "Full stack selection (Next.js + Express), repo setup, first working features. The AI interview product (interviews.zariya.ai) — initiated based on a gap I kept noticing in the market.",
      signal:
        "Still the primary technical point of contact. The product is live and has active users.",
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

export type Project = {
  id: string;
  number: string;
  name: string;
  url: string;
  tech: string[];
  description: ModeText;
  pmProblem?: string;
  pmOutcome?: string;
};

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
