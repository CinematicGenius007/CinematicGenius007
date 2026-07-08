import { useSyncExternalStore } from "react";
import type { ModeId } from "../modes/types";

const VALID: ModeId[] = ["engineer", "pm", "designer", "everyday", "adaptation", "retro", "pdf"];

const DEFAULT_MODE: ModeId = "engineer";

// Retired personas → nearest surviving render (old links keep working).
const LEGACY: Record<string, ModeId> = {
  signal: "engineer",
  data: "engineer",
  codebase: "retro",
  anime: "adaptation",
  director: "adaptation",
};

function readMode(): ModeId {
  const as = new URLSearchParams(window.location.search).get("as");
  if (as && LEGACY[as]) return LEGACY[as];
  return VALID.includes(as as ModeId) ? (as as ModeId) : DEFAULT_MODE;
}

// Normalize legacy ?as= values in the address bar once on load.
{
  const as = new URLSearchParams(window.location.search).get("as");
  if (as && LEGACY[as]) {
    const url = new URL(window.location.href);
    if (LEGACY[as] === DEFAULT_MODE) {
      url.searchParams.delete("as");
    } else {
      url.searchParams.set("as", LEGACY[as]);
    }
    window.history.replaceState({}, "", url);
  }
}

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("popstate", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("popstate", listener);
  };
}

export function useMode(): ModeId {
  return useSyncExternalStore(subscribe, readMode);
}

export function setMode(id: ModeId) {
  if (id === readMode()) return;
  const url = new URL(window.location.href);
  if (id === DEFAULT_MODE) {
    url.searchParams.delete("as");
  } else {
    url.searchParams.set("as", id);
  }
  window.history.pushState({}, "", url);
  // Scroll reset happens at the transition midpoint (TransitionLayer).
  notify();
}
