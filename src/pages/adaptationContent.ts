// The Adaptation — the career as a dramatized manga/film production,
// with a director's commentary track that redlines every episode back
// to what actually happened. Both voices per beat live here; the page
// only switches which one is foregrounded.

export const opCard = {
  kicker: "ADAPTED FROM A TRUE STORY",
  episode: "SEASON ONE",
  title: "THE ADAPTATION",
  kana: "アダプテーション",
  sub: "one career · two cuts",
};

export type Episode = {
  id: string;
  ep: string;
  num: string; // kanji chapter numeral
  yr: string;
  title: string;
  sfx?: string;
  broadcast: string[]; // the dramatized cut
  commentary: string[]; // what actually happened
};

export const episodes: Episode[] = [
  {
    id: "origin",
    ep: "EP 01",
    num: "壱",
    yr: "2018 – 2022",
    title: "Origin arc.",
    sfx: "ドン",
    broadcast: [
      "A quiet campus in Punjab. The protagonist discovers he can read the machine's thoughts.",
      "The elders speak in hushed tones of a mark no student had carried before: 9.98.",
    ],
    commentary: [
      "I went to class and did the assignments. The CGPA is real — the hushed elders are not.",
      "Debate and theatre club ran in parallel threads. Both still in use: half this job is explaining code-shaped problems to non-code-shaped people.",
    ],
  },
  {
    id: "training",
    ep: "EP 02",
    num: "弐",
    yr: "2021 – 2023",
    title: "Training arc.",
    broadcast: [
      "A distant guild sends trials across the sea. He breaks other people's code for coin and honor.",
      "Meanwhile, a production floor takes him in as an apprentice. He never leaves.",
    ],
    commentary: [
      "The guild was JetBrains Hyperskill — freelance project testing, Java and Go, correctness and learning flow. First paid proof that finding what's broken is a skill.",
      "The production floor was Optmyzr: intern to Software Development Engineer. Campaign Automator, Scripts, portfolios, audits, alerts, dashboards, AI campaign creation, bug duty.",
    ],
  },
  {
    id: "bug",
    ep: "EP 03",
    num: "参",
    yr: "one tuesday",
    title: "The cross-cutting bug.",
    sfx: "ゴゴゴ",
    broadcast: [
      "An enemy strikes four product surfaces at once. The villagers flee.",
      "Our hero turns, slowly, and opens… THE LOGS.",
    ],
    commentary: [
      "Symptom reported in one surface, plausible cause in three others. Real ad spend involved, so guessing was not an option.",
      "A day of reading logs. One wrong assumption found. Fixed where it started, not where it shouted. Nobody fled; one person said 'nice' in Slack.",
    ],
  },
  {
    id: "reset",
    ep: "EP 04",
    num: "肆",
    yr: "2024 →",
    title: "The reset.",
    sfx: "ドドド",
    broadcast: [
      "He looked upon the architecture and said: it ends here.",
      "In a single night he tore it down, and raised a new one from the ashes.",
    ],
    commentary: [
      "Nothing was torn down in a night. Early-stage product, patch-debt compounding faster than progress — so we rewrote incrementally: tests first, one subsystem at a time, product up the whole way.",
      "The dramatic version is better television. The boring version kept revenue.",
    ],
  },
  {
    id: "founding",
    ep: "EP 05",
    num: "伍",
    yr: "aug 2024 →",
    title: "The founding.",
    broadcast: [
      "Two allies swear an oath at dawn. He takes the title THE ARCHITECT. The servers bow.",
    ],
    commentary: [
      "Technical Co-Founder & CTO at Zariya AI. I own the architecture, most of the AWS bill, and a real-time voice interview pipeline built for 70 concurrent sessions.",
      "There was no rooftop at dawn. There was a Google Meet.",
    ],
  },
];

export type SideStory = {
  id: string;
  num: string;
  title: string[];
  broadcast: string;
  commentary: string;
  link: string;
  url: string;
  featured: boolean;
};

export const sideStories: SideStory[] = [
  {
    id: "interviews",
    num: "零",
    title: ["Interviews", "by Zariya."],
    broadcast:
      "OVA — the interviewer who pushes back. Follow-up questions mid-answer, scoring that names the exact weakness. Candidates fear it. Candidates return to it.",
    commentary:
      "The pipeline is real: Whisper, Claude, Sarvam TTS, WebRTC, and an async Go evaluation worker — 70 concurrent sessions.",
    link: "live · interviews.zariya.ai ↗",
    url: "https://interviews.zariya.ai/",
    featured: true,
  },
  {
    id: "sudoku",
    num: "壱",
    title: ["Sudoku,", "twice."],
    broadcast: "OVA — two rival solvers race on one board. Brute force swings wild; constraint propagation waits, and strikes once.",
    commentary: "Built to make algorithms visible. Better intro than any slide deck.",
    link: "live ↗",
    url: "https://sudoku-solver.cinematicgenius007.com/",
    featured: false,
  },
  {
    id: "ttt",
    num: "弐",
    title: ["Ultimate", "TTT."],
    broadcast: "OVA — a solved children's game, reforged. One rule change and the abyss opens.",
    commentary: "Weekend build after losing to my cousin four times. The cousin story is 100% true.",
    link: "live ↗",
    url: "https://ultimate-ttt.cinematicgenius007.com/",
    featured: false,
  },
];

export const cast = [
  { role: "The Blade", actor: "TypeScript", note: "sharp, everywhere, occasionally lies about types at runtime" },
  { role: "The Shield", actor: "C# / .NET", note: "carries the ad-tech backends" },
  { role: "The Landscape", actor: "AWS", note: "vast, beautiful, sends a bill" },
  { role: "The Rival", actor: "Production Bugs", note: "returns every season with a new design" },
  { role: "The Mentor", actor: "The Logs", note: "speaks only truth, rarely listened to" },
];

export const nextEpisode = {
  kicker: "NEXT EPISODE PREVIEW",
  title: "Your team.",
  body: "Same protagonist, new setting. Engineering, backend-heavy product work, or anything where things must actually run.",
  teaser: "つづく",
};
