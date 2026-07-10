import { useEffect, type ReactNode } from "react";

export type Theme = {
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
};

// The one theme. Tungsten black, projector bone, premiere gold.
export const filmTheme: Theme = {
  colors: {
    bg: "#0b0a08",
    surface: "#16130e",
    ink: "#f2ead8",
    mute: "#8f877a",
    rule: "#2a251c",
    accent: "#e0a63c",
    accentDim: "#6b4d16",
    gridColor: "transparent",
  },
  fonts: {
    display: "'Six Caps', 'Space Grotesk', sans-serif",
    body: "'DM Sans', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  radius: 2,
};

type Props = { theme: Theme; children: ReactNode };

export default function ThemeProvider({ theme, children }: Props) {
  useEffect(() => {
    const r = document.documentElement;
    const { colors: c, fonts: f } = theme;
    r.style.setProperty("--mode-bg", c.bg);
    r.style.setProperty("--mode-surface", c.surface);
    r.style.setProperty("--mode-ink", c.ink);
    r.style.setProperty("--mode-mute", c.mute);
    r.style.setProperty("--mode-rule", c.rule);
    r.style.setProperty("--mode-accent", c.accent);
    r.style.setProperty("--mode-accent-dim", c.accentDim);
    r.style.setProperty("--mode-grid", c.gridColor);
    r.style.setProperty("--mode-font-display", f.display);
    r.style.setProperty("--mode-font-body", f.body);
    r.style.setProperty("--mode-font-mono", f.mono);
    r.style.setProperty("--mode-radius", `${theme.radius}px`);
    document.body.style.background = c.bg;
    document.body.style.color = c.ink;
  }, [theme]);

  return <>{children}</>;
}
