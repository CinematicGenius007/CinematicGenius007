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

export type HeroVariant = "bauhaus" | "plate" | "cell" | "panel" | "letter" | "signal";
export type ExperienceVariant = "list" | "case" | "table" | "arc" | "signal";
export type ProjectsVariant = "grid" | "case" | "tile" | "json" | "story" | "signal";
export type SkillsVariant = "columns" | "table" | "hidden" | "signal";

export type Persona = {
  id: ModeId;
  theme: ModeTheme;
  sections: {
    hero: HeroVariant;
    experience: ExperienceVariant;
    projects: ProjectsVariant;
    skills: SkillsVariant;
  };
  emphasize: Array<"backend" | "outcomes" | "craft" | "data" | "human" | "arc" | "retro" | "systems">;
};
