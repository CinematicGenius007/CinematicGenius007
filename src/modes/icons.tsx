// Persona glyphs for the Switchboard. One hand-tuned stroke icon per render
// target; stroke = currentColor so each tile/pill can tint its own glyph.
import type { ReactNode } from "react";
import type { ModeId } from "./types";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS: Record<ModeId, ReactNode> = {
  engineer: (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="15" rx="1" />
      <polyline points="7 9.5 10 12 7 14.5" />
      <line x1="12" y1="14.5" x2="16.5" y2="14.5" />
    </svg>
  ),
  pm: (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <rect x="3.5" y="4" width="4.8" height="9" rx="0.8" />
      <rect x="9.6" y="4" width="4.8" height="15.5" rx="0.8" />
      <rect x="15.7" y="4" width="4.8" height="6.5" rx="0.8" />
      <line x1="5.9" y1="7" x2="5.9" y2="7.01" />
      <line x1="12" y1="7" x2="12" y2="7.01" />
      <line x1="18.1" y1="7" x2="18.1" y2="7.01" />
    </svg>
  ),
  designer: (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M12 3 L17 9.5 C17 13.5 14.6 15.5 12 15.5 C9.4 15.5 7 13.5 7 9.5 Z" />
      <line x1="12" y1="15.5" x2="12" y2="21" />
      <circle cx="12" cy="10" r="1.4" />
    </svg>
  ),
  everyday: (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <rect x="3" y="6" width="18" height="12.5" rx="1" />
      <path d="M3.5 7 L12 13.5 L20.5 7" />
    </svg>
  ),
  adaptation: (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="14" rx="0.5" />
      <line x1="3.5" y1="9" x2="20.5" y2="9" />
      <line x1="7.5" y1="5" x2="9" y2="9" />
      <line x1="12" y1="5" x2="13.5" y2="9" />
      <line x1="16.5" y1="5" x2="18" y2="9" />
      <path d="M10 12.5 L14.5 15 L10 17.5 Z" />
    </svg>
  ),
  retro: (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M4 4 H17 L20 7 V20 H4 Z" />
      <rect x="8" y="4" width="8" height="5" />
      <rect x="7" y="13.5" width="10" height="6.5" />
    </svg>
  ),
  pdf: (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M6 3 H14.5 L18.5 7 V21 H6 Z" />
      <polyline points="14.5 3 14.5 7 18.5 7" />
      <line x1="9" y1="12" x2="15.5" y2="12" />
      <line x1="9" y1="15.5" x2="15.5" y2="15.5" />
    </svg>
  ),
};

export default function PersonaIcon({ id }: { id: ModeId }) {
  return <>{ICONS[id]}</>;
}
