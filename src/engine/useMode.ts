import { useSyncExternalStore } from "react";
import type { ModeId } from "../modes/types";

const VALID: ModeId[] = ["engineer", "pm", "designer", "data", "everyday", "anime", "retro", "pdf", "signal", "director", "codebase"];

const DEFAULT_MODE: ModeId = "engineer";

function readMode(): ModeId {
  const as = new URLSearchParams(window.location.search).get("as");
  return VALID.includes(as as ModeId) ? (as as ModeId) : DEFAULT_MODE;
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
  // Reload-based switching always landed at the top; keep that behavior.
  window.scrollTo(0, 0);
  notify();
}
