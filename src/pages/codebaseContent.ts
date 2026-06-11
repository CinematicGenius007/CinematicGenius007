// Persona narrative content for the codebase (IDE) mode.

export type FileId = "readme" | "experience" | "projects" | "skills" | "contact";

export const QUIPS = [
  "Debugging: 2 known unknowns",
  "Tests: passing (probably)",
  "Runtime: 2 yrs in production",
  "Coverage: ~94% of edge cases",
  "Build: shipping",
];

export const FILE_LIST: { id: FileId; name: string; lang: string }[] = [
  { id: "readme",     name: "README.md",      lang: "md" },
  { id: "experience", name: "experience.ts",  lang: "ts" },
  { id: "projects",   name: "projects.ts",    lang: "ts" },
  { id: "skills",     name: "skills.json",    lang: "json" },
  { id: "contact",    name: "contact.md",     lang: "md" },
];
