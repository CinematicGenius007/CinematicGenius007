// The Recompile — persona transition grammar.
// Every switch = EXIT (cover in the arriving persona's world) → swap → ENTER.
// Pair-specific cuts override the generic per-target line.

import type { ModeId } from "../modes/types";

export type TransitionFlavor = "recompile" | "alarm" | "compile" | "ink";

export type TransitionSpec = {
  flavor: TransitionFlavor;
  lines: string[];
};

// Generic arrival line per target persona — spoken in the target's voice.
const ARRIVAL: Record<ModeId, string[]> = {
  engineer: ["$ render --target=debugger", "attaching to process…"],
  pm: ["$ render --target=control-room", "loading program wall…"],
  designer: ["$ render --target=studio", "snapping to baseline grid…"],
  data: ["$ render --target=notebook", "kernel starting…"],
  everyday: ["$ render --target=plain-words", "unfolding the letter…"],
  anime: ["$ render --target=episode-01", "cold open in 3… 2…"],
  retro: ["$ render --target=saini-os", "memory check: 9950KB OK"],
  signal: ["$ render --target=investigation", "clearance granted…"],
  director: ["$ render --target=feature-film", "roll camera…"],
  codebase: ["$ render --target=ide", "restoring workspace…"],
  pdf: ["$ render --target=artifact", "compiling 11 views → 1 page…"],
};

// Famous routes get their own cut.
const PAIRS: Partial<Record<string, TransitionSpec>> = {
  "engineer→signal": {
    flavor: "alarm",
    lines: ["ANOMALY DETECTED IN TRACE", "escalating to investigation…"],
  },
  "signal→director": {
    flavor: "recompile",
    lines: ["evidence reviewed. case closed.", "now — the film of it. roll camera…"],
  },
  "retro→codebase": {
    flavor: "recompile",
    lines: ["upgrading toolchain… 1994 → 2026", "same window. better compiler."],
  },
  "anime→everyday": {
    flavor: "ink",
    lines: ["…the panel was a drawing on a letter.", "okay — here's what that actually means."],
  },
};

export function getTransition(from: ModeId, to: ModeId): TransitionSpec {
  const pair = PAIRS[`${from}→${to}`];
  if (pair) return pair;
  if (to === "pdf") return { flavor: "compile", lines: ARRIVAL.pdf };
  return { flavor: "recompile", lines: ARRIVAL[to] };
}

// Display order for "view NN/11" numbering — mirrors registry order.
export const VIEW_ORDER: ModeId[] = [
  "engineer",
  "pm",
  "designer",
  "data",
  "everyday",
  "anime",
  "retro",
  "signal",
  "director",
  "codebase",
  "pdf",
];

export function viewIndex(id: ModeId): string {
  return String(VIEW_ORDER.indexOf(id) + 1).padStart(2, "0");
}
