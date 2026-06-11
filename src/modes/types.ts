export type ModeId = "engineer" | "pm" | "designer" | "data" | "everyday" | "anime" | "retro" | "pdf" | "signal" | "director" | "codebase";

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
