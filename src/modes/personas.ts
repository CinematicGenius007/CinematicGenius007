import { themes } from "./themes";
import type { Persona } from "./types";

export const personas: Record<string, Persona> = {
  engineer: {
    id: "engineer",
    theme: themes.engineer,
    emphasize: ["backend"],
  },
  pm: {
    id: "pm",
    theme: themes.pm,
    emphasize: ["outcomes"],
  },
  designer: {
    id: "designer",
    theme: themes.designer,
    emphasize: ["craft"],
  },
  everyday: {
    id: "everyday",
    theme: themes.everyday,
    emphasize: ["human"],
  },
  anime: {
    id: "anime",
    theme: themes.anime,
    emphasize: ["arc"],
  },
  retro: {
    id: "retro",
    theme: themes.retro,
    emphasize: ["retro"],
  },
  director: {
    id: "director",
    theme: themes.director,
    emphasize: ["craft"],
  },
  pdf: {
    id: "pdf",
    theme: themes.pdf,
    emphasize: ["backend"],
  },
};
