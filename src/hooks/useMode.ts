import { useMemo } from "react";
import type { ModeId } from "../modes/types";

const VALID: ModeId[] = ["engineer", "pm", "designer", "data", "everyday", "anime", "retro", "pdf"];

export function useMode(): ModeId {
  return useMemo(() => {
    const as = new URLSearchParams(window.location.search).get("as");
    return VALID.includes(as as ModeId) ? (as as ModeId) : "engineer";
  }, []);
}
