import { useState } from "react";
import type { ModeId } from "../modes/types";

type Props = { currentMode: ModeId };

const MODES: { id: ModeId; label: string }[] = [
  { id: "engineer", label: "Engineer" },
  { id: "pm", label: "Product Manager" },
  { id: "designer", label: "Designer" },
  { id: "data", label: "Analysts" },
  { id: "everyday", label: "Common Folks" },
  { id: "anime", label: "Anime Fans" },
  { id: "retro", label: "Retro neobrutalist" },
  { id: "pdf", label: "Resume" },
];

export default function ModeSwitcher({ currentMode }: Props) {
  const [open, setOpen] = useState(false);

  function switchMode(id: ModeId) {
    const url = new URL(window.location.href);
    if (id === "engineer") {
      url.searchParams.delete("as");
    } else {
      url.searchParams.set("as", id);
    }
    window.location.href = url.toString();
  }

  return (
    <div className="mode-switcher">
      {open && (
        <div className="mode-switcher__menu">
          {MODES.map((m) => (
            <button
              key={m.id}
              className={`mode-switcher__option${m.id === currentMode ? " mode-switcher__option--active" : ""}`}
              onClick={() => switchMode(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}
      <button
        className="mode-switcher__pill"
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch view mode"
      >
        viewing as <strong>{currentMode}</strong> · change
      </button>
    </div>
  );
}
