import type { ModeId } from "../modes/types";

export type ModeText = { _default: string } & Partial<Record<ModeId, string>>;

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
