import { useEffect, useState } from "react";
import type { MotionLevel } from "../../engine/useMotionPreference";

const LINES = [
  "$ debugger attach ayush.saini --pid 2002",
  "reading symbols from /opt/career/*.so … done",
  "12 nodes mapped · 12 edges resolved · 3 breakpoints set",
  "process is live. click any node to inspect.",
];

type Props = { motion: MotionLevel };

export default function AttachTicker({ motion }: Props) {
  const [chars, setChars] = useState(motion === "none" ? Infinity : 0);

  useEffect(() => {
    if (motion === "none") {
      setChars(Infinity);
      return;
    }
    setChars(0);
    const total = LINES.join("\n").length;
    let i = 0;
    const id = window.setInterval(() => {
      i += 3;
      setChars(i);
      if (i >= total) window.clearInterval(id);
    }, 24);
    return () => window.clearInterval(id);
  }, [motion]);

  let remaining = chars;
  return (
    <div className="dbg-ticker" role="status" aria-label="Debugger attached to process ayush.saini">
      {LINES.map((line, idx) => {
        const shown = remaining === Infinity ? line : line.slice(0, Math.max(0, remaining));
        if (remaining !== Infinity) remaining -= line.length;
        const done = shown.length === line.length;
        return (
          <p key={idx} className={idx === 0 ? "dbg-ticker__cmd" : undefined}>
            {shown}
            {!done && shown.length > 0 ? <span className="dbg-cursor" /> : null}
          </p>
        );
      })}
    </div>
  );
}
