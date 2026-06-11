import { lazy } from "react";
import type { ComponentType, LazyExoticComponent } from "react";
import { personas } from "../modes/personas";
import type { ModeId, ModeTheme } from "../modes/types";

export type PersonaEntry = {
  id: ModeId;
  label: string;
  description: string;
  theme: ModeTheme;
  // Pages take { mode } except PdfPage, which takes { dark, onToggleTheme };
  // App.tsx owns that special case until the pdf persona is reworked.
  Page: LazyExoticComponent<ComponentType<any>>;
  // Kick off the chunk download ahead of a transition cut.
  preload: () => Promise<unknown>;
};

function entry(
  id: ModeId,
  label: string,
  description: string,
  loader: () => Promise<{ default: ComponentType<any> }>,
): PersonaEntry {
  return { id, label, description, theme: personas[id].theme, Page: lazy(loader), preload: loader };
}

export function preloadPersona(id: ModeId) {
  void registry[id].preload();
}

export const registry: Record<ModeId, PersonaEntry> = {
  engineer: entry(
    "engineer",
    "Engineer",
    "Systems, debugging, and the work behind the surface.",
    () => import("../pages/EngineerPage"),
  ),
  pm: entry(
    "pm",
    "Program Manager",
    "Outcomes, case studies, and decision records.",
    () => import("../pages/PmPage"),
  ),
  designer: entry(
    "designer",
    "Designer",
    "Hierarchy, craft, and a portfolio that critiques itself.",
    () => import("../pages/DesignerPage"),
  ),
  data: entry(
    "data",
    "Analysts",
    "The same profile, served as a notebook of structured data.",
    () => import("../pages/DataPage"),
  ),
  everyday: entry(
    "everyday",
    "Common Folks",
    "Plain words, no jargon, a letter from Ayush.",
    () => import("../pages/EverydayPage"),
  ),
  anime: entry(
    "anime",
    "Anime Fans",
    "Career as story arcs, projects as battle cards.",
    () => import("../pages/AnimePage"),
  ),
  retro: entry(
    "retro",
    "Retro neobrutalist",
    "Loud borders, old-web energy, UI with a point of view.",
    () => import("../pages/RetroPage"),
  ),
  signal: entry(
    "signal",
    "The Signal",
    "An investigation: trace the evidence, resolve the incident.",
    () => import("../pages/SignalPage"),
  ),
  director: entry(
    "director",
    "Director's Cut",
    "Cinematic sequencing; theatre kid turned systems engineer.",
    () => import("../pages/DirectorPage"),
  ),
  codebase: entry(
    "codebase",
    "Live Codebase",
    "The portfolio as an IDE, files and all.",
    () => import("../pages/CodebasePage"),
  ),
  pdf: entry(
    "pdf",
    "Resume",
    "Serious, dense, printable.",
    () => import("../pages/PdfPage"),
  ),
};
