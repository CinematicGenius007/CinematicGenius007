// Animation kernel — the single GSAP entry point.
// Rule: no component imports gsap directly; everything comes through here so
// the motion governor can stay the one authority over timing.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { MotionLevel } from "./useMotionPreference";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/**
 * Scroll-reveal for a set of elements, governed by motion level.
 * Returns a cleanup function. At "none" it does nothing — elements must be
 * fully visible by default; reveals only ever subtract initial visibility
 * inside this helper.
 */
export function revealOnScroll(
  scope: HTMLElement,
  selector: string,
  level: MotionLevel,
): () => void {
  if (level === "none") return () => {};
  const targets = Array.from(scope.querySelectorAll<HTMLElement>(selector));
  if (!targets.length) return () => {};

  const ctx = gsap.context(() => {
    for (const el of targets) {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: level === "full" ? 26 : 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: level === "full" ? 0.85 : 0.55,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    }
  }, scope);

  return () => ctx.revert();
}
