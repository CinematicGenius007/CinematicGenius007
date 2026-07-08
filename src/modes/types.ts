export type ModeId = "engineer" | "pm" | "designer" | "everyday" | "anime" | "retro" | "pdf" | "director";

// Retired personas (July 2026 consolidation): signal/data folded into engineer,
// codebase folded into retro. Legacy ?as= values redirect in useMode.ts.
export type RetiredModeId = "signal" | "data" | "codebase";

export type ModeTheme = {
  colors: {
    bg: string;
    surface: string;
    ink: string;
    mute: string;
    rule: string;
    accent: string;
    accentDim: string;
    gridColor: string;
  };
  fonts: {
    display: string;
    body: string;
    mono: string;
  };
  radius: number;
  motion: "off" | "calm" | "kinetic";
};

export type Persona = {
  id: ModeId;
  theme: ModeTheme;
  emphasize: Array<"backend" | "outcomes" | "craft" | "data" | "human" | "arc" | "retro" | "systems">;
};
