import { useEffect, useMemo, useRef, useState } from "react";
import { contacts } from "../content/contacts";
import {
  SIGNAL_CHAPTERS,
  SIGNAL_LENSES,
  SIGNAL_LINKS,
  SIGNAL_NODES,
  SKILL_SIGNALS,
  type SignalNodeId,
} from "./signalContent";
import { revealOnScroll } from "../engine/animation";
import { useMotionPreference } from "../engine/useMotionPreference";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

/* ── text scramble decode ── */

const GLYPHS = "█▓▒░<>/\\|=+*#@$%&01";

function useScramble(text: string, active: boolean) {
  const [out, setOut] = useState(active ? "" : text);

  useEffect(() => {
    if (!active) {
      setOut(text);
      return;
    }
    let frame = 0;
    const total = 16;
    const id = window.setInterval(() => {
      frame++;
      const settled = Math.floor((frame / total) * text.length);
      let s = text.slice(0, settled);
      for (let i = settled; i < text.length; i++) {
        s += text[i] === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (frame >= total) {
        setOut(text);
        window.clearInterval(id);
      }
    }, 34);
    return () => window.clearInterval(id);
  }, [text, active]);

  return out;
}

/* ── clearance strip ── */

const CLEARANCE_LINES = [
  "CASE FILE 2002-AS · SUBJECT: SAINI, AYUSH",
  "ROLE UNDER INVESTIGATION: full-stack engineer",
  "CLEARANCE GRANTED — review all evidence to reach a verdict.",
];

function Clearance({ motion }: { motion: string }) {
  const [chars, setChars] = useState(motion === "none" ? Infinity : 0);

  useEffect(() => {
    if (motion === "none") {
      setChars(Infinity);
      return;
    }
    setChars(0);
    const total = CLEARANCE_LINES.join("\n").length;
    let i = 0;
    const id = window.setInterval(() => {
      i += 2;
      setChars(i);
      if (i >= total) window.clearInterval(id);
    }, 16);
    return () => window.clearInterval(id);
  }, [motion]);

  let remaining = chars;
  return (
    <div className="inv-clearance" role="status">
      {CLEARANCE_LINES.map((line, idx) => {
        const shown = remaining === Infinity ? line : line.slice(0, Math.max(0, remaining));
        if (remaining !== Infinity) remaining -= line.length;
        return <p key={idx}>{shown}</p>;
      })}
    </div>
  );
}

/* ── dossier panel ── */

function Dossier({
  nodeId,
  motion,
  onClose,
}: {
  nodeId: SignalNodeId;
  motion: string;
  onClose: () => void;
}) {
  const node = SIGNAL_NODES.find((n) => n.id === nodeId)!;
  const chapter = SIGNAL_CHAPTERS.find((c) => c.id === node.chapter)!;
  const summary = useScramble(node.summary, motion === "full");

  return (
    <aside className="inv-dossier" role="dialog" aria-label={`Evidence: ${node.label}`}>
      <div className="inv-dossier__stamp" aria-hidden="true">
        DECLASSIFIED
      </div>
      <header>
        <h3>{node.label}</h3>
        <button className="inv-dossier__close" onClick={onClose} aria-label="Close dossier">
          ✕
        </button>
      </header>
      <p className="inv-dossier__meta">
        exhibit · {node.meta} — case file {chapter.number} / {chapter.label.toUpperCase()}
      </p>
      <p className="inv-dossier__body">{summary}</p>
      <p className="inv-dossier__context">{chapter.headline}</p>
    </aside>
  );
}

/* ── page ── */

export default function SignalPage({ mode: _mode }: Props) {
  const { level: motion } = useMotionPreference();
  const [selected, setSelected] = useState<SignalNodeId | null>(null);
  const [reviewed, setReviewed] = useState<Set<SignalNodeId>>(new Set());
  const boardRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLElement>(null);

  const allReviewed = reviewed.size === SIGNAL_NODES.length;

  const select = (id: SignalNodeId | null) => {
    setSelected(id);
    if (id) {
      setReviewed((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        return next;
      });
    }
  };

  // cursor parallax on the board (full motion only)
  useEffect(() => {
    if (motion !== "full") return;
    const board = boardRef.current;
    if (!board) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const rect = board.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        board.style.setProperty("--par-x", `${-nx * 12}px`);
        board.style.setProperty("--par-y", `${-ny * 8}px`);
      });
    };
    const onLeave = () => {
      board.style.setProperty("--par-x", "0px");
      board.style.setProperty("--par-y", "0px");
    };
    board.addEventListener("pointermove", onMove);
    board.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      board.removeEventListener("pointermove", onMove);
      board.removeEventListener("pointerleave", onLeave);
    };
  }, [motion]);

  useEffect(() => {
    if (!pageRef.current) return;
    return revealOnScroll(pageRef.current, "[data-reveal]", motion);
  }, [motion]);

  const connectedTo = useMemo(() => {
    if (!selected) return new Set<string>();
    const set = new Set<string>();
    for (const [a, b] of SIGNAL_LINKS) {
      if (a === selected) set.add(b);
      if (b === selected) set.add(a);
    }
    return set;
  }, [selected]);

  const nodePos = (id: SignalNodeId) => SIGNAL_NODES.find((n) => n.id === id)!;

  return (
    <main className="inv" ref={pageRef}>
      {/* ── the board ── */}
      <section className="inv-room">
        <Clearance motion={motion} />

        <div className="inv-board" ref={boardRef}>
          <svg className="inv-threads" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {SIGNAL_LINKS.map(([a, b]) => {
              const pa = nodePos(a);
              const pb = nodePos(b);
              const lit = selected === a || selected === b;
              return (
                <line
                  key={`${a}-${b}`}
                  x1={pa.x}
                  y1={pa.y}
                  x2={pb.x}
                  y2={pb.y}
                  className={`inv-thread${lit ? " inv-thread--lit" : ""}`}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>

          {SIGNAL_NODES.map((node, i) => {
            const isSel = selected === node.id;
            const isConn = connectedTo.has(node.id);
            const isReviewed = reviewed.has(node.id);
            return (
              <button
                key={node.id}
                className={`inv-pin${isSel ? " inv-pin--selected" : ""}${isConn ? " inv-pin--linked" : ""}${
                  isReviewed ? " inv-pin--reviewed" : ""
                }`}
                style={{ left: `${node.x}%`, top: `${node.y}%`, "--pin-depth": `${(i % 3) + 1}` } as React.CSSProperties}
                onClick={() => select(isSel ? null : node.id)}
                aria-pressed={isSel}
              >
                <span className="inv-pin__dot" aria-hidden="true" />
                <span className="inv-pin__label">{node.label}</span>
                <span className="inv-pin__meta">{node.meta}</span>
              </button>
            );
          })}
        </div>

        <div className="inv-progress" aria-live="polite">
          EVIDENCE REVIEWED · {reviewed.size}/{SIGNAL_NODES.length}
          {allReviewed ? " — VERDICT UNLOCKED ↓" : ""}
        </div>

        {selected ? <Dossier nodeId={selected} motion={motion} onClose={() => select(null)} /> : null}
      </section>

      {/* ── case files ── */}
      <section className="inv-section" data-reveal>
        <header className="inv-section__head">
          <h2>case files</h2>
          <p>five chapters, twelve exhibits</p>
        </header>
        <div className="inv-cases">
          {SIGNAL_CHAPTERS.map((chapter) => (
            <article className="inv-case" key={chapter.id}>
              <div className="inv-case__no">{chapter.number}</div>
              <div className="inv-case__body">
                <h3>{chapter.headline}</h3>
                <p>{chapter.body}</p>
                <div className="inv-case__tags">
                  {chapter.nodes.map((id) => (
                    <button
                      key={id}
                      className={`inv-tag${reviewed.has(id) ? " inv-tag--reviewed" : ""}`}
                      onClick={() => {
                        select(id);
                        boardRef.current?.scrollIntoView({ behavior: motion === "none" ? "auto" : "smooth" });
                      }}
                    >
                      {nodePos(id).label}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── intercepts (lenses) ── */}
      <section className="inv-section" data-reveal>
        <header className="inv-section__head">
          <h2>intercepted transmissions</h2>
          <p>three operating modes on record</p>
        </header>
        <div className="inv-feeds">
          {SIGNAL_LENSES.map((lens) => (
            <article className="inv-feed" key={lens.id}>
              <p className="inv-feed__cmd">$ {lens.command}</p>
              <h3>{lens.headline}</h3>
              <ul>
                {lens.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── signal strength ── */}
      <section className="inv-section" data-reveal>
        <header className="inv-section__head">
          <h2>signal strength</h2>
          <p>instrument readings on the subject's toolkit</p>
        </header>
        <div className="inv-meters">
          {SKILL_SIGNALS.map((s) => (
            <div className="inv-meter" key={s.label}>
              <span className="inv-meter__label">{s.label}</span>
              <div className="inv-meter__track">
                <div className="inv-meter__fill" style={{ width: `${s.pct}%` }} />
              </div>
              <span className="inv-meter__pct">{s.pct}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── verdict ── */}
      <section className={`inv-verdict${allReviewed ? " inv-verdict--unlocked" : ""}`} data-reveal>
        <p className="inv-verdict__kicker">FINAL DETERMINATION</p>
        {allReviewed ? (
          <>
            <h2 className="inv-verdict__stamp">
              SUBJECT IS: <span>DEBUGGER</span> <span>BUILDER</span> <span>RELIABLE</span>
            </h2>
            <p>All twelve exhibits reviewed. The pattern holds across employers, codebases, and side projects.</p>
          </>
        ) : (
          <>
            <h2 className="inv-verdict__locked">VERDICT SEALED</h2>
            <p>
              {SIGNAL_NODES.length - reviewed.size} exhibits still unreviewed. Pull the threads on the board above.
            </p>
          </>
        )}
        <div className="inv-contact">
          <p className="inv-contact__line">$ channel --open</p>
          <div className="inv-contact__links">
            <a href={contacts.emailHref}>EMAIL ↗</a>
            <a href={contacts.linkedin} target="_blank" rel="noreferrer">
              LINKEDIN ↗
            </a>
            <a href={contacts.github} target="_blank" rel="noreferrer">
              GITHUB ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
