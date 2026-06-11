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
  data: (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <polyline points="4 4 4 20 20 20" />
      <line x1="9" y1="20" x2="9" y2="13" strokeWidth="2.4" />
      <line x1="13.5" y1="20" x2="13.5" y2="8.5" strokeWidth="2.4" />
      <line x1="18" y1="20" x2="18" y2="15.5" strokeWidth="2.4" />
    </svg>
  ),
  everyday: (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <rect x="3" y="6" width="18" height="12.5" rx="1" />
      <path d="M3.5 7 L12 13.5 L20.5 7" />
    </svg>
  ),
  anime: (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M12 2.5 L13.9 8.8 L20.8 7 L15.6 11.9 L19.2 18.8 L12 14.9 L4.8 18.8 L8.4 11.9 L3.2 7 L10.1 8.8 Z" />
    </svg>
  ),
  retro: (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M4 4 H17 L20 7 V20 H4 Z" />
      <rect x="8" y="4" width="8" height="5" />
      <rect x="7" y="13.5" width="10" height="6.5" />
    </svg>
  ),
  signal: (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" strokeDasharray="2.4 2.8" />
      <line x1="12" y1="12" x2="18.2" y2="5.8" />
      <circle cx="15" cy="14.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  director: (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M3.5 10.5 H20.5 V19.5 H3.5 Z" />
      <path d="M3.8 10.5 L5 6 L21 6 L20.5 10.5" />
      <line x1="8.4" y1="6.2" x2="7.4" y2="10.3" />
      <line x1="12.8" y1="6.2" x2="11.8" y2="10.3" />
      <line x1="17.2" y1="6.2" x2="16.2" y2="10.3" />
    </svg>
  ),
  codebase: (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <polyline points="8 7 3.5 12 8 17" />
      <polyline points="16 7 20.5 12 16 17" />
      <line x1="13.3" y1="5" x2="10.7" y2="19" />
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
