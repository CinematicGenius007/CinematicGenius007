// CINEMATIC GENIUS 007 — one film, no personas.
// Every number here traces to resumeFacts / the resume; the framing is the fiction.
import { resumeFacts } from "../content/resumeFacts";

export const RESUME_PATH = "/Ayush_Saini_Resume.pdf";

export const titleCard = {
  presents: "CINEMATICGENIUS007.COM PRESENTS",
  line1: "CINEMATIC",
  line2: "GENIUS",
  line3: "007",
  tagline: "a career, shot on production",
  starring: "STARRING AYUSH SAINI — SOFTWARE ENGINEER · FULL STACK · AI & SYSTEMS",
  rating: {
    badge: "RATED S",
    text: "SHIPS TO PRODUCTION · CONTAINS SCENES OF LIVE DEBUGGING",
  },
  cue: "THE HOUSE LIGHTS ARE GOING DOWN — SCROLL",
};

export const credits = {
  slate: "01 · OPENING CREDITS",
  rows: [
    { role: "STARRING", name: "AYUSH SAINI", note: "software engineer & technical co-founder" },
    { role: "SHOT ON LOCATION AT", name: "OPTMYZR · ZARIYA AI", note: "Panipat, IN — remote to the world" },
    { role: "RUNNING TIME", name: "5+ YEARS", note: "in production, no intermission" },
    { role: "GENRE", name: "SPORTS DOC / SHONEN / THRILLER", note: "depends on the sprint" },
    { role: "DIRECTED BY", name: "ALSO AYUSH", note: "someone had to" },
  ],
};

export type BoxOfficeStat = {
  figure: string;
  count?: number;
  decimals?: number;
  suffix?: string;
  caption: string;
  detail: string;
};

export const boxOffice: { slate: string; headline: string; stats: BoxOfficeStat[] } = {
  slate: "02 · THE NUMBERS",
  headline: "Critics wanted adjectives. He submitted figures.",
  stats: [
    {
      figure: "70",
      count: resumeFacts.experience.zariya.concurrentSessions,
      caption: "CONCURRENT VOICE SESSIONS",
      detail: "opening weekend, every weekend — WebRTC · Whisper · Claude · Sarvam · Go",
    },
    {
      figure: "80%",
      count: 80,
      suffix: "%",
      caption: "OF THE STUDIO'S AWS",
      detail: "one operator — SQS · EC2 · S3 · ECS Fargate · ASG",
    },
    {
      figure: "9.98",
      count: 9.98,
      decimals: 2,
      caption: "CGPA, OUT OF 10",
      detail: "Chitkara University · B.Tech CSE · 2018–2022",
    },
    {
      figure: "1000s",
      caption: "OF ADVERTISERS SERVED",
      detail: "on Optmyzr — an award-winning PPC platform",
    },
  ],
};

export type Act = {
  id: string;
  scene: string;
  genre: string;
  years: string;
  location: string;
  title: string;
  logline: string;
  shots: string[];
  subtitle: string;
};

export const acts: { slate: string; headline: string; items: Act[] } = {
  slate: "03 · THE PICTURE",
  headline: "Three acts. No montage. Everything on screen actually happened.",
  items: [
    {
      id: "act1",
      scene: "SCENE 01 · TAKE 9.98",
      genre: "COMING-OF-AGE",
      years: "2018 – 2022",
      location: "CHITKARA UNIVERSITY · OPTMYZR (INTERN) · JETBRAINS HYPERSKILL",
      title: "The Film School Years",
      logline: "A student walks into an ad-tech company and gets handed real production.",
      shots: [
        "B.Tech Computer Science, Chitkara University — 9.98/10 CGPA.",
        "Optmyzr internship, 2021–2022: classroom to production bug duty in one season.",
        "Side gig: project tester for JetBrains Hyperskill — Java and Go projects reviewed before thousands of learners saw them.",
      ],
      subtitle: "“He kept the grades. He kept the bug queue. Nobody told him to pick one.”",
    },
    {
      id: "act2",
      scene: "SCENE 02 · LONG TAKE",
      genre: "SPORTS DOCUMENTARY",
      years: "2022 – PRESENT",
      location: "OPTMYZR",
      title: "The Long Take",
      logline: "No cuts since 2022. One engineer, an entire product suite in frame.",
      shots: [
        "Built AI campaign creation from scratch — owns it end-to-end.",
        "Created portfolio-level alerts; expanded portfolio support across dashboards, audits, and alerts.",
        "Keeps Campaign Automator and Google Ads Scripts running — features, customer queries, long-haul bugfixes.",
        "React/TypeScript reporting surfaces; C# (.NET) services for campaign optimization, budgets, and data pipelines.",
      ],
      subtitle: "“He does his own stunts. Including the production bugs.”",
    },
    {
      id: "act3",
      scene: "SCENE 03 · TWO CAMERAS",
      genre: "THRILLER",
      years: "AUG 2024 – PRESENT",
      location: "ZARIYA AI (ODDMIND) · TECHNICAL CO-FOUNDER & CTO",
      title: "Two Cameras, One Operator",
      logline: "He didn't leave the first set. He built a second one and ran both.",
      shots: [
        "Leads architecture, system design, and engineering decisions across 0-to-1 products.",
        "Architected the AI interview platform — 70 concurrent real-time voice sessions: STT, LLM, TTS, WebRTC, async Go evaluation worker.",
        "Owns 80% of AWS infrastructure and technical operations.",
        "Reset architectural foundations when patching was no longer enough.",
      ],
      subtitle: "“Two productions, zero dropped frames.”",
    },
  ],
};

export const deleted = {
  slate: "04 · DELETED SCENES",
  headline: "What the trailer didn't show.",
  items: [
    {
      code: "CUT 01",
      text: "The 70-session number was weeks of load tests and one very disciplined async queue. The dramatic music was added later.",
    },
    {
      code: "CUT 02",
      text: "The rebuild scene started with the least cinematic line in engineering: “the patch isn't enough.” Everything after that was just work.",
    },
    {
      code: "CUT 03",
      text: "Five seasons of production bug duty. Off camera, that's the whole superpower: he recognizes trouble by silhouette.",
    },
  ],
};

export type Poster = {
  id: string;
  flavor: "gold" | "split" | "grid";
  billing: string;
  title: string;
  hook: string;
  microcredits: string[];
  url: string;
  cta: string;
};

export const nowShowing: { slate: string; headline: string; posters: Poster[] } = {
  slate: "05 · NOW SHOWING",
  headline: "Side projects, feature-length.",
  posters: [
    {
      id: "interviewer",
      flavor: "gold",
      billing: "A ZARIYA AI PRODUCTION",
      title: "THE INTERVIEWER",
      hook: "It asks the follow-up.",
      microcredits: ["Next.js", "Python", "Go", "WebRTC", "AWS"],
      url: "https://interviews.zariya.ai/",
      cta: "ENTER THE ROOM",
    },
    {
      id: "twominds",
      flavor: "split",
      billing: "AN ALGORITHM DOUBLE FEATURE",
      title: "TWO MINDS",
      hook: "One guesses. One thinks. Same board.",
      microcredits: ["Next.js", "TypeScript", "CSS"],
      url: "https://sudoku-solver.cinematicgenius007.com/",
      cta: "WATCH THEM RACE",
    },
    {
      id: "suddendeath",
      flavor: "grid",
      billing: "BORN OF FOUR STRAIGHT LOSSES TO A COUSIN",
      title: "SUDDEN DEATH",
      hook: "Your move chooses their battlefield.",
      microcredits: ["React", "Vite", "TypeScript"],
      url: "https://ultimate-ttt.cinematicgenius007.com/",
      cta: "PLAY A ROUND",
    },
  ],
};

export const stunt = {
  slate: "06 · THE STUNT SCENE",
  headline: "LIGHTS OUT",
  brief:
    "All stunts in this section are performed by the visitor. Five lights come on, one by one. The instant they cut to black — react. Click, tap, or hit space. Move early and the take is ruined.",
  armLabel: "ROLL CAMERA",
  retryLabel: "ANOTHER TAKE",
  jumpTitle: "CUT! TOO EARLY",
  jumpNote: "You flinched before the lights went out. The director is patient. Barely.",
  benchmarks: [
    { label: "F1 START, ELITE", ms: 200 },
    { label: "TYPICAL HUMAN", ms: 250 },
  ],
};

export function stuntRank(ms: number): string {
  if (ms < 200) return "FRAME-PERFECT. Stunt double confirmed.";
  if (ms < 235) return "ONE-TAKE WONDER. Print it.";
  if (ms < 280) return "LEADING ROLE material.";
  if (ms < 350) return "SOLID SUPPORTING ACT.";
  if (ms < 450) return "EXTRA WITH AMBITION. Again.";
  return "THE POPCORN WAS A MISTAKE.";
}

export const endCredits = {
  slate: "07 · END CREDITS",
  headline: "Roll credits.",
  crew: [
    { role: "CINEMATOGRAPHY", name: "TypeScript / React" },
    { role: "SECOND UNIT", name: "C# (.NET)" },
    { role: "STUNTS", name: "Go" },
    { role: "SCORE", name: "Python" },
    { role: "PYROTECHNICS", name: "AWS — SQS · EC2 · S3 · Fargate" },
    { role: "CONTINUITY", name: "PostgreSQL · Redis · MongoDB · SQLite" },
    { role: "DIALOGUE", name: "WebRTC · Whisper · Claude · Sarvam TTS" },
    { role: "EDITING", name: "Vite" },
    { role: "CRAFT SERVICES", name: "chai, mostly" },
  ],
  thanksLabel: "SPECIAL THANKS",
  thanks: [
    "MAX VERSTAPPEN — for proving pace is a habit",
    "KANE WILLIAMSON — for calm at the crease",
    "BEN STOKES — for Headingley, obviously",
    "VIRAT KOHLI — for the cover drive",
    "GOJO SATORU — for confidence as a discipline",
    "SAITAMA — for making mastery look boring",
    "MONKEY D. LUFFY — for declaring intent loudly",
    "BLUE LOCK — for treating ego as fuel",
    "EVERY ON-CALL ENGINEER — you know what you did",
  ],
  disclaimer:
    "No production environments were harmed in the making of this career. All bugs were fictionalized with permission. Any resemblance to stable systems is entirely intentional.",
};

export const postCredits = {
  kicker: "POST-CREDITS SCENE",
  line: "You stayed. Good — the best scene was always after the credits.",
  pitch:
    "If you're hiring, building, or stuck on something weird: the sequel is in development and casting now.",
  resumeCta: "TAKE THE SCRIPT HOME",
  resumeNote: "resume, one page, PDF",
  links: [
    { label: "EMAIL", href: `mailto:${resumeFacts.email}` },
    { label: "GITHUB", href: resumeFacts.github },
    { label: "LINKEDIN", href: resumeFacts.linkedin },
  ],
  copyright: "© CINEMATIC GENIUS 007 — AYUSH SAINI. ALL BUGS RESERVED.",
};
