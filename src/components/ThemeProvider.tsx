import { useEffect, type ReactNode } from "react";
import type { ModeTheme } from "../modes/types";

type Props = { theme: ModeTheme; children: ReactNode };

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
