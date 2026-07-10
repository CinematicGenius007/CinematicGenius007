import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type MotionLevel = "none" | "calm" | "full";
export type MotionOverride = "system" | "reduced" | "full";

export type MotionTier = "off" | "calm" | "kinetic";

const STORAGE_KEY = "motion-override";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

const TIER_LEVEL: Record<MotionTier, MotionLevel> = {
  off: "none",
  calm: "calm",
  kinetic: "full",
};

function readStoredOverride(): MotionOverride {
  if (typeof window === "undefined") return "system";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "reduced" || raw === "full") return raw;
  } catch {
    // localStorage unavailable (privacy mode etc.) — fall back to system.
  }
  return "system";
}

function writeStoredOverride(override: MotionOverride) {
  if (typeof window === "undefined") return;
  try {
    if (override === "system") {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, override);
    }
  } catch {
    // Best effort; in-memory state still applies for this session.
  }
}

function readOsReduced(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia(REDUCED_QUERY).matches;
}

export function resolveMotionLevel(tier: MotionTier, osReduced: boolean, override: MotionOverride): MotionLevel {
  const tierLevel = TIER_LEVEL[tier];
  if (override === "reduced") return "none";
  if (override === "full") return tierLevel;
  return osReduced ? "none" : tierLevel;
}

type MotionPreference = {
  level: MotionLevel;
  override: MotionOverride;
  osReduced: boolean;
  setMotionOverride: (override: MotionOverride) => void;
};

const MotionPreferenceContext = createContext<MotionPreference>({
  level: "calm",
  override: "system",
  osReduced: false,
  setMotionOverride: () => {},
});

type Props = { tier: MotionTier; children: ReactNode };

export function MotionPreferenceProvider({ tier, children }: Props) {
  const [override, setOverrideState] = useState<MotionOverride>(readStoredOverride);
  const [osReduced, setOsReduced] = useState(readOsReduced);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const query = window.matchMedia(REDUCED_QUERY);
    const onChange = (e: MediaQueryListEvent) => setOsReduced(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const setMotionOverride = useCallback((next: MotionOverride) => {
    writeStoredOverride(next);
    setOverrideState(next);
  }, []);

  const level = resolveMotionLevel(tier, osReduced, override);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.setAttribute("data-motion", level);
    root.setAttribute("data-motion-override", override);
  }, [level, override]);

  const value = useMemo(
    () => ({ level, override, osReduced, setMotionOverride }),
    [level, override, osReduced, setMotionOverride],
  );

  return <MotionPreferenceContext.Provider value={value}>{children}</MotionPreferenceContext.Provider>;
}

export function useMotionPreference(): MotionPreference {
  return useContext(MotionPreferenceContext);
}
