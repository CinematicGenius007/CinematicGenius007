import { themes } from "./themes";
import type { Persona } from "./types";

export const personas: Record<string, Persona> = {
  engineer: {
    id: "engineer",
    theme: themes.engineer,
    sections: { hero: "bauhaus", experience: "list", projects: "grid", skills: "columns" },
    emphasize: ["backend"],
  },
  pm: {
    id: "pm",
    theme: themes.pm,
    sections: { hero: "bauhaus", experience: "case", projects: "case", skills: "columns" },
    emphasize: ["outcomes"],
  },
  designer: {
    id: "designer",
    theme: themes.designer,
    sections: { hero: "plate", experience: "list", projects: "tile", skills: "columns" },
    emphasize: ["craft"],
  },
  data: {
    id: "data",
    theme: themes.data,
    sections: { hero: "cell", experience: "table", projects: "json", skills: "table" },
    emphasize: ["data"],
  },
  everyday: {
    id: "everyday",
    theme: themes.everyday,
    sections: { hero: "letter", experience: "list", projects: "story", skills: "hidden" },
    emphasize: ["human"],
  },
  anime: {
    id: "anime",
    theme: themes.anime,
    sections: { hero: "panel", experience: "arc", projects: "grid", skills: "hidden" },
    emphasize: ["arc"],
  },
  retro: {
    id: "retro",
    theme: themes.retro,
    sections: { hero: "panel", experience: "case", projects: "tile", skills: "hidden" },
    emphasize: ["retro"],
  },
  pdf: {
    id: "pdf",
    theme: themes.pdf,
    sections: { hero: "plate", experience: "list", projects: "grid", skills: "columns" },
    emphasize: ["backend"],
  },
};
