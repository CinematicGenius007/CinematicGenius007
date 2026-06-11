import { useEffect, useRef, useState } from "react";
import { registry, preloadPersona } from "../engine/registry";
import { setMode } from "../engine/useMode";
import { viewIndex } from "../engine/transitions";
import { useMotionPreference, type MotionOverride } from "../engine/useMotionPreference";
import type { ModeId } from "../modes/types";

type Props = { currentMode: ModeId };

const MOTION_OPTIONS: { id: MotionOverride; label: string }[] = [
  { id: "system", label: "System" },
  { id: "reduced", label: "Reduced" },
  { id: "full", label: "Full" },
];

export default function ModeSwitcher({ currentMode }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLButtonElement>(null);
  const { override, setMotionOverride } = useMotionPreference();

  function switchMode(id: ModeId) {
    setMode(id);
    setOpen(false);
  }

  // ⌘K / Ctrl+K toggles the render-target menu from anywhere.
  useEffect(() => {
    function onGlobalKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", onGlobalKey);
    return () => document.removeEventListener("keydown", onGlobalKey);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        pillRef.current?.focus();
      }
    }

    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div className="mode-switcher" ref={rootRef}>
      {open && (
        <div className="mode-switcher__menu" role="group" aria-label="Choose how to view this portfolio">
          {Object.values(registry).map((persona) => (
            <button
              key={persona.id}
              className={`mode-switcher__option${persona.id === currentMode ? " mode-switcher__option--active" : ""}`}
              aria-current={persona.id === currentMode ? "true" : undefined}
              onClick={() => switchMode(persona.id)}
              onPointerEnter={() => preloadPersona(persona.id)}
            >
              <span className="mode-switcher__option-label">
                <span className="mode-switcher__option-num">{viewIndex(persona.id)}</span> {persona.label}
              </span>
              <span className="mode-switcher__option-desc">{persona.description}</span>
            </button>
          ))}
          <div className="mode-switcher__motion" role="group" aria-label="Motion preference">
            <span className="mode-switcher__motion-label">Motion</span>
            <div className="mode-switcher__motion-options">
              {MOTION_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  className={`mode-switcher__motion-btn${option.id === override ? " mode-switcher__motion-btn--active" : ""}`}
                  aria-pressed={option.id === override}
                  onClick={() => setMotionOverride(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <button
        ref={pillRef}
        className="mode-switcher__pill"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Switch view mode"
      >
        viewing as <strong>{registry[currentMode].label.toLowerCase()}</strong> · change
      </button>
    </div>
  );
}
