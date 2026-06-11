import { useEffect, useRef } from "react";
import { gsap } from "../engine/animation";
import { getTransition } from "../engine/transitions";
import { registry } from "../engine/registry";
import { useMotionPreference, resolveMotionLevel } from "../engine/useMotionPreference";
import type { ModeId } from "../modes/types";

type Props = {
  from: ModeId;
  to: ModeId | null; // null = idle
  onMidpoint: () => void; // swap the page under the cover
  onDone: () => void;
};

/**
 * The Recompile. A fullscreen cover themed as the ARRIVING persona slats in,
 * the page swaps underneath, the cover slats out. Pair-specific cuts change
 * the copy and flavor. Reduced motion: instant swap + a brief status toast.
 */
export default function TransitionLayer({ from, to, onMidpoint, onDone }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { override, osReduced } = useMotionPreference();

  const onMidpointRef = useRef(onMidpoint);
  onMidpointRef.current = onMidpoint;
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!to) return;
    const spec = getTransition(from, to);
    const theme = registry[to].theme;
    // The cut belongs to the arriving world — use its motion tier.
    const level = resolveMotionLevel(theme.motion, osReduced, override);

    if (level === "none") {
      onMidpointRef.current();
      onDoneRef.current();
      return;
    }

    const root = rootRef.current;
    if (!root) return;
    const slats = Array.from(root.querySelectorAll<HTMLElement>(".tx-slat"));
    const lines = Array.from(root.querySelectorAll<HTMLElement>(".tx-line"));
    const flash = root.querySelector<HTMLElement>(".tx-flash");
    const fast = level === "calm";
    let cancelled = false;

    const tl = gsap.timeline({
      onComplete: () => {
        if (!cancelled) onDoneRef.current();
      },
    });

    gsap.set(root, { visibility: "visible", pointerEvents: "auto" });
    gsap.set(slats, { scaleY: 0, transformOrigin: "top center" });
    gsap.set(lines, { autoAlpha: 0, y: 8 });

    if (spec.flavor === "alarm" && flash && !fast) {
      tl.fromTo(flash, { autoAlpha: 0 }, { autoAlpha: 0.55, duration: 0.07, yoyo: true, repeat: 3 });
    }

    tl.to(slats, {
      scaleY: 1,
      duration: fast ? 0.22 : 0.34,
      stagger: fast ? 0.03 : 0.05,
      ease: "power3.inOut",
    });
    tl.to(lines, { autoAlpha: 1, y: 0, duration: fast ? 0.15 : 0.25, stagger: 0.12 }, "<60%");
    tl.add(() => {
      if (cancelled) return;
      onMidpointRef.current();
      window.scrollTo(0, 0);
    });
    tl.to({}, { duration: fast ? 0.25 : spec.flavor === "compile" ? 0.7 : 0.45 });
    tl.set(slats, { transformOrigin: "bottom center" });
    tl.to(lines, { autoAlpha: 0, duration: 0.15 });
    tl.to(slats, {
      scaleY: 0,
      duration: fast ? 0.22 : 0.34,
      stagger: fast ? 0.03 : 0.05,
      ease: "power3.inOut",
    });
    tl.set(root, { visibility: "hidden", pointerEvents: "none" });

    return () => {
      cancelled = true;
      tl.kill();
      gsap.set(root, { visibility: "hidden", pointerEvents: "none" });
    };
  }, [from, to, osReduced, override]);

  const spec = to ? getTransition(from, to) : null;
  const colors = to ? registry[to].theme.colors : null;

  return (
    <>
      <div
        ref={rootRef}
        className={`tx${spec ? ` tx--${spec.flavor}` : ""}`}
        style={
          colors
            ? ({
                "--tx-bg": colors.bg,
                "--tx-ink": colors.ink,
                "--tx-accent": colors.accent,
              } as React.CSSProperties)
            : undefined
        }
        aria-hidden="true"
      >
        <div className="tx-flash" />
        <div className="tx-slats">
          {Array.from({ length: 5 }, (_, i) => (
            <div className="tx-slat" key={i} />
          ))}
        </div>
        <div className="tx-copy">
          {spec?.lines.map((line, i) => (
            <p className="tx-line" key={`${to}-${i}`}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
