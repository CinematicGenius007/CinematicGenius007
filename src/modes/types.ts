export type ModeId = "engineer" | "pm" | "designer" | "data" | "everyday" | "anime" | "retro" | "pdf";

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

export type HeroVariant = "bauhaus" | "plate" | "cell" | "panel" | "letter";
export type ExperienceVariant = "list" | "case" | "table" | "arc";
export type ProjectsVariant = "grid" | "case" | "tile" | "json" | "story";
export type SkillsVariant = "columns" | "table" | "hidden";

export type Persona = {
  id: ModeId;
  theme: ModeTheme;
  sections: {
    hero: HeroVariant;
    experience: ExperienceVariant;
    projects: ProjectsVariant;
    skills: SkillsVariant;
  };
  emphasize: Array<"backend" | "outcomes" | "craft" | "data" | "human" | "arc" | "retro">;
};
