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
};

function entry(id: ModeId, label: string, description: string, Page: PersonaEntry["Page"]): PersonaEntry {
  return { id, label, description, theme: personas[id].theme, Page };
}

export const registry: Record<ModeId, PersonaEntry> = {
  engineer: entry(
    "engineer",
    "Engineer",
    "Systems, debugging, and the work behind the surface.",
    lazy(() => import("../pages/EngineerPage")),
  ),
  pm: entry(
    "pm",
    "Program Manager",
    "Outcomes, case studies, and decision records.",
    lazy(() => import("../pages/PmPage")),
  ),
  designer: entry(
    "designer",
    "Designer",
    "Hierarchy, craft, and a portfolio that critiques itself.",
    lazy(() => import("../pages/DesignerPage")),
  ),
  data: entry(
    "data",
    "Analysts",
    "The same profile, served as a notebook of structured data.",
    lazy(() => import("../pages/DataPage")),
  ),
  everyday: entry(
    "everyday",
    "Common Folks",
    "Plain words, no jargon, a letter from Ayush.",
    lazy(() => import("../pages/EverydayPage")),
  ),
  anime: entry(
    "anime",
    "Anime Fans",
    "Career as story arcs, projects as battle cards.",
    lazy(() => import("../pages/AnimePage")),
  ),
  retro: entry(
    "retro",
    "Retro neobrutalist",
    "Loud borders, old-web energy, UI with a point of view.",
    lazy(() => import("../pages/RetroPage")),
  ),
  signal: entry(
    "signal",
    "The Signal",
    "An investigation: trace the evidence, resolve the incident.",
    lazy(() => import("../pages/SignalPage")),
  ),
  director: entry(
    "director",
    "Director's Cut",
    "Cinematic sequencing; theatre kid turned systems engineer.",
    lazy(() => import("../pages/DirectorPage")),
  ),
  codebase: entry(
    "codebase",
    "Live Codebase",
    "The portfolio as an IDE, files and all.",
    lazy(() => import("../pages/CodebasePage")),
  ),
  pdf: entry(
    "pdf",
    "Resume",
    "Serious, dense, printable.",
    lazy(() => import("../pages/PdfPage")),
  ),
};
