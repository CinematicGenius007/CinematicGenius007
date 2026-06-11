import { useEffect, useRef, useState } from "react";
import { gsap } from "../engine/animation";
import { registry, preloadPersona } from "../engine/registry";
import { setMode } from "../engine/useMode";
import { VIEW_ORDER } from "../engine/transitions";
import { useMotionPreference, type MotionOverride } from "../engine/useMotionPreference";
import PersonaIcon from "../modes/icons";
import type { ModeId } from "../modes/types";

type Props = { currentMode: ModeId };

const MOTION_OPTIONS: { id: MotionOverride; label: string }[] = [
  { id: "system", label: "System" },
  { id: "reduced", label: "Reduced" },
  { id: "full", label: "Full" },
];

/**
 * The Dial — a quarter-clock roulette pinned to the bottom-right corner.
 * Channels sit on a 90° arc; scrolling or dragging spins the wheel and it
 * snaps to the needle on the corner diagonal. The focused channel is only
 * highlighted — committing requires a click, which fires the poof.
 */

const STEP = 17; // degrees between channels
const FOCUS = 45; // needle angle (corner diagonal)
const SPAN = 62; // visibility window either side of the needle
const MAX = (VIEW_ORDER.length - 1) * STEP;

// ── the poof — old-Mac-style stepped smoke, hand-placed frames, persona-tinted ──

// Five frames of [cx, cy, r] puffs on a 120×120 canvas: dense → bloom → ring → scatter → flecks.
const POOF_FRAMES: [number, number, number][][] = [
  [
    [60, 62, 16],
    [48, 55, 12],
    [72, 55, 12],
    [60, 46, 11],
  ],
  [
    [60, 66, 18],
    [44, 56, 14],
    [76, 56, 14],
    [53, 42, 12],
    [68, 43, 12],
  ],
  [
    [38, 60, 12],
    [82, 60, 12],
    [50, 38, 11],
    [70, 38, 11],
    [48, 78, 11],
    [72, 78, 11],
  ],
  [
    [30, 56, 9],
    [90, 56, 9],
    [46, 30, 8],
    [74, 30, 8],
    [42, 86, 8],
    [78, 86, 8],
    [60, 20, 6],
  ],
  [
    [24, 52, 4],
    [96, 52, 4],
    [40, 22, 4],
    [80, 22, 4],
    [36, 92, 3],
    [84, 92, 3],
    [60, 12, 3],
    [60, 98, 3],
  ],
];

function poofFrameSvg(
  circles: [number, number, number][],
  frameIdx: number,
  ink: string,
  surface: string,
  accent: string,
) {
  const puffs = circles
    .map(
      ([x, y, r]) =>
        `<circle cx="${x}" cy="${y}" r="${r}" fill="${surface}" stroke="${ink}" stroke-width="2.5"/>`,
    )
    .join("");
  // later frames pick up accent flecks as the smoke breaks apart
  const flecks =
    frameIdx >= 2
      ? `<circle cx="${20 + frameIdx * 6}" cy="${30 - frameIdx * 3}" r="2.4" fill="${accent}"/>` +
        `<circle cx="${100 - frameIdx * 5}" cy="${88 + frameIdx * 2}" r="2" fill="${accent}"/>`
      : "";
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">${puffs}${flecks}</svg>`;
}

function firePoof(x: number, y: number, target: ModeId, onCut: () => void) {
  const c = registry[target].theme.colors;
  const host = document.createElement("div");
  host.className = "macpoof";
  host.style.left = `${x}px`;
  host.style.top = `${y}px`;

  const frames = POOF_FRAMES.map((circles, i) => {
    const f = document.createElement("div");
    f.className = "macpoof__frame";
    f.innerHTML = poofFrameSvg(circles, i, c.ink, c.surface, c.accent);
    f.style.visibility = "hidden";
    host.appendChild(f);
    return f;
  });

  document.body.appendChild(host);

  // Stepped like a sprite sheet: hard cuts between frames, no tweening inside one.
  const tl = gsap.timeline({ onComplete: () => host.remove() });
  const at = [0, 0.07, 0.15, 0.24, 0.34];
  frames.forEach((f, i) => {
    tl.set(f, { visibility: "visible" }, at[i]);
    if (i > 0) tl.set(frames[i - 1], { visibility: "hidden" }, at[i]);
    tl.set(host, { scale: 0.85 + i * 0.09 }, at[i]);
  });
  tl.add(onCut, 0.12);
  tl.to(host, { opacity: 0, duration: 0.16 }, 0.34);
}

// ── the dial ──

export default function Dial({ currentMode }: Props) {
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState(0); // wheel rotation in degrees
  const [radius, setRadius] = useState(280);
  const [firing, setFiring] = useState(false);

  const wheelRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLButtonElement>(null);
  const offsetRef = useRef(0);
  offsetRef.current = offset;
  const snapTween = useRef<gsap.core.Tween | null>(null);
  const snapTimer = useRef(0);
  const drag = useRef({ active: false, lastPhi: 0, moved: 0 });
  const suppressClick = useRef(false);

  const { level, override, setMotionOverride } = useMotionPreference();
  const currentIdx = VIEW_ORDER.indexOf(currentMode);

  function clampSoft(v: number) {
    return Math.max(-8, Math.min(MAX + 8, v));
  }

  function killSnap() {
    snapTween.current?.kill();
    window.clearTimeout(snapTimer.current);
  }

  function snap(delay = 0) {
    window.clearTimeout(snapTimer.current);
    snapTimer.current = window.setTimeout(() => {
      const target = Math.max(0, Math.min(MAX, Math.round(offsetRef.current / STEP) * STEP));
      if (level === "none") {
        setOffset(target);
        return;
      }
      const proxy = { v: offsetRef.current };
      snapTween.current?.kill();
      snapTween.current = gsap.to(proxy, {
        v: target,
        duration: 0.45,
        ease: "power3.out",
        onUpdate: () => setOffset(proxy.v),
      });
    }, delay);
  }

  function spinTo(idx: number) {
    const target = Math.max(0, Math.min(MAX, idx * STEP));
    killSnap();
    if (level === "none") {
      setOffset(target);
      return;
    }
    const proxy = { v: offsetRef.current };
    snapTween.current = gsap.to(proxy, {
      v: target,
      duration: 0.4,
      ease: "power3.out",
      onUpdate: () => setOffset(proxy.v),
    });
  }

  function openDial() {
    setOffset(Math.max(0, currentIdx) * STEP);
    setOpen(true);
  }

  function close() {
    killSnap();
    setOpen(false);
    pillRef.current?.focus();
  }

  function select(id: ModeId, el: HTMLElement) {
    if (firing) return;
    if (id === currentMode) {
      close();
      return;
    }
    preloadPersona(id);
    if (level === "none") {
      setOpen(false);
      setMode(id);
      return;
    }
    setFiring(true);
    const r = el.getBoundingClientRect();
    gsap.to(el, { opacity: 0, scale: 0.4, duration: 0.12, ease: "power2.in" });
    firePoof(r.left + r.width / 2, r.top + r.height / 2, id, () => {
      setOpen(false);
      setFiring(false);
      setMode(id);
    });
  }

  // ⌘K / Ctrl+K toggles the dial from anywhere.
  useEffect(() => {
    function onGlobalKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => {
          if (!v) setOffset(Math.max(0, VIEW_ORDER.indexOf(currentMode)) * STEP);
          return !v;
        });
      }
    }
    document.addEventListener("keydown", onGlobalKey);
    return () => document.removeEventListener("keydown", onGlobalKey);
  }, [currentMode]);

  // Open-state listeners: scroll lock, radius fit, native wheel (non-passive), escape.
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const fit = () =>
      setRadius(Math.min(290, Math.min(window.innerWidth * 0.62, window.innerHeight * 0.52)));
    fit();
    window.addEventListener("resize", fit);

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      killSnap();
      setOffset((v) => clampSoft(v + e.deltaY * 0.07));
      snap(150);
    }
    document.addEventListener("wheel", onWheel, { passive: false });

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        spinTo(Math.round(offsetRef.current / STEP) - 1);
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        spinTo(Math.round(offsetRef.current / STEP) + 1);
      }
    }
    document.addEventListener("keydown", onKeyDown);

    wheelRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", fit);
      document.removeEventListener("wheel", onWheel);
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, level]);

  // Pointer angle around the bottom-right corner; 0° = straight up, 90° = straight left.
  function phiOf(e: React.PointerEvent) {
    return (
      (Math.atan2(window.innerWidth - e.clientX, window.innerHeight - e.clientY) * 180) / Math.PI
    );
  }

  function onPointerDown(e: React.PointerEvent) {
    if (firing) return;
    drag.current = { active: true, lastPhi: phiOf(e), moved: 0 };
    killSnap();
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current.active) return;
    const phi = phiOf(e);
    const d = phi - drag.current.lastPhi;
    drag.current.lastPhi = phi;
    drag.current.moved += Math.abs(d);
    setOffset((v) => clampSoft(v - d));
  }

  function onPointerUp() {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (drag.current.moved > 3) {
      suppressClick.current = true;
      window.setTimeout(() => {
        suppressClick.current = false;
      }, 0);
    }
    snap();
  }

  const focusedIdx = Math.max(0, Math.min(VIEW_ORDER.length - 1, Math.round(offset / STEP)));

  return (
    <div className="dial">
      {open && (
        <div
          className="dial__overlay"
          role="dialog"
          aria-modal="true"
          aria-label="The dial — spin to a render target"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            className="dial__scrim"
            onClick={() => {
              if (!suppressClick.current) close();
            }}
          />

          <div className="dial__rings" aria-hidden="true" style={{ "--r": `${radius}px` } as React.CSSProperties}>
            <span className="dial__ring dial__ring--outer" />
            <span className="dial__ring dial__ring--inner" />
            <span className="dial__needle" />
          </div>

          <div
            className="dial__wheel"
            ref={wheelRef}
            tabIndex={-1}
            role="listbox"
            aria-label="Render targets"
            aria-activedescendant={`dial-opt-${VIEW_ORDER[focusedIdx]}`}
          >
            {VIEW_ORDER.map((id, i) => {
              const theta = FOCUS + i * STEP - offset;
              if (Math.abs(theta - FOCUS) > SPAN) return null;
              const rad = (theta * Math.PI) / 180;
              const x = -Math.sin(rad) * radius;
              const y = -Math.cos(rad) * radius;
              const t = Math.max(0, 1 - Math.abs(theta - FOCUS) / STEP); // 1 at the needle
              const fade = Math.max(0, 1 - Math.abs(theta - FOCUS) / SPAN);
              const persona = registry[id];
              return (
                <button
                  key={id}
                  id={`dial-opt-${id}`}
                  type="button"
                  role="option"
                  aria-selected={i === focusedIdx}
                  className={`dial__item${t > 0.5 ? " dial__item--focus" : ""}${
                    id === currentMode ? " dial__item--current" : ""
                  }`}
                  style={
                    {
                      transform: `translate(${x + 21}px, ${y + 21}px)`,
                      opacity: 0.25 + fade * 0.75,
                      zIndex: Math.round(10 + t * 10),
                      "--i": i,
                      "--t": t,
                      "--ch-accent": persona.theme.colors.accent,
                    } as React.CSSProperties
                  }
                  onClick={(e) => {
                    if (suppressClick.current) return;
                    if (i !== focusedIdx) {
                      spinTo(i);
                      return;
                    }
                    select(id, e.currentTarget);
                  }}
                  onPointerEnter={() => preloadPersona(id)}
                >
                  <span className="dial__card">
                    <span className="dial__label">{persona.label}</span>
                    <span className="dial__chip">
                      <PersonaIcon id={id} />
                      {id === currentMode ? <i className="dial__here" /> : null}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="dial__hud">
            <span className="dial__hint">scroll or drag to spin · click to switch · esc</span>
            <div className="dial__motion" role="group" aria-label="Motion preference">
              {MOTION_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`dial__motion-btn${option.id === override ? " dial__motion-btn--active" : ""}`}
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
        className="dial__pill"
        onClick={() => (open ? close() : openDial())}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`Viewing as ${registry[currentMode].label} — open the dial to change`}
        type="button"
      >
        <span className="dial__pill-icon" aria-hidden="true">
          <PersonaIcon id={currentMode} />
        </span>
        <span className="dial__pill-name">{registry[currentMode].label.toLowerCase()}</span>
      </button>
    </div>
  );
}
