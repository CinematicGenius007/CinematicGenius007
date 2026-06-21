// Persona narrative content for the codebase (IDE) mode.

export type FileId = "readme" | "experience" | "projects" | "skills" | "tests" | "contact";

export const QUIPS = [
  "Debugging: 2 known unknowns",
  "Tests: passing (probably)",
  "Runtime: production since 2021",
  "Coverage: ~94% of edge cases",
  "Build: shipping",
];

export const FILE_LIST: { id: FileId; name: string; lang: string }[] = [
  { id: "readme",     name: "README.md",      lang: "md" },
  { id: "experience", name: "experience.ts",  lang: "ts" },
  { id: "projects",   name: "projects.ts",    lang: "ts" },
  { id: "skills",     name: "skills.json",    lang: "json" },
  { id: "tests",      name: "career.test.ts", lang: "ts" },
  { id: "contact",    name: "contact.md",     lang: "md" },
];

export type CareerTest = {
  name: string;
  ms: number;
  todo?: boolean;
};

export const CAREER_TESTS: CareerTest[] = [
  { name: "ships features end-to-end without dropping scope", ms: 184 },
  { name: "finds root cause across product surfaces", ms: 412 },
  { name: "survives production incidents calmly", ms: 96 },
  { name: "converts internship to full-time via ownership", ms: 233 },
  { name: "resets architecture instead of compounding patch-debt", ms: 318 },
  { name: "explains code-shaped problems to non-code-shaped people", ms: 57 },
  { name: "maintains 9.98 CGPA under load", ms: 71 },
  { name: "works with your team", ms: 0, todo: true },
];
