import { useEffect, useRef, useState } from "react";
import { contacts } from "../content/contacts";
import {
  breakpoints,
  graphNodes,
  nodeDetails,
  type Breakpoint,
} from "../content/engineerGraph";
import {
  contact,
  education,
  experiences,
  hero,
  outside,
  projects,
  resolve,
  skillGroups,
} from "../content/profile";
import { revealOnScroll } from "../engine/animation";
import { useMotionPreference } from "../engine/useMotionPreference";
import AttachTicker from "../components/engineer/AttachTicker";
import ServiceMap from "../components/engineer/ServiceMap";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

/* ---------- stack frames: career as a call stack, newest frame on top ---------- */

const frames = [
  {
    id: "zariya",
    fn: "Zariya.architect(product)",
    file: "zariya/architecture.ts",
    note: "part-time · early-stage",
    exp: experiences.find((e) => e.id === "zariya")!,
  },
  {
    id: "optmyzr",
    fn: "Optmyzr.ship(features)",
    file: "optmyzr/production.cs",
    note: "SDE-1 · promoted from intern",
    exp: experiences.find((e) => e.id === "optmyzr")!,
  },
  {
    id: "jetbrains",
    fn: "JetBrains.test(projects)",
    file: "hyperskill/review.java",
    note: "freelance",
    exp: experiences.find((e) => e.id === "jetbrains")!,
  },
];

function StackFrame({
  index,
  frame,
  mode,
  open,
  onToggle,
}: {
  index: number;
  frame: (typeof frames)[number];
  mode: ModeId;
  open: boolean;
  onToggle: () => void;
}) {
  const { exp } = frame;
  return (
    <article className={`dbg-frame${open ? " dbg-frame--open" : ""}`}>
      <button className="dbg-frame__head" onClick={onToggle} aria-expanded={open}>
        <span className="dbg-frame__idx">#{index}</span>
        <span className="dbg-frame__fn">
          at <em>{frame.fn}</em>
        </span>
        <span className="dbg-frame__loc">
          {frame.file} · {exp.period}
        </span>
        <span className="dbg-frame__toggle">{open ? "−" : "+"}</span>
      </button>
      <div className="dbg-frame__body">
        <div className="dbg-frame__inner">
          <p className="dbg-frame__role">
            {exp.company} — {exp.role} <span>({frame.note})</span>
          </p>
          <ul className="dbg-locals">
            {exp.bullets.map((b, i) => (
              <li key={i}>
                <span className="dbg-locals__key">local_{i}</span>
                {resolve(b, mode)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

/* ---------- breakpoint stories: step-through war stories ---------- */

function BreakpointStory({ bp, motion }: { bp: Breakpoint; motion: string }) {
  const [step, setStep] = useState(0);
  const done = step >= bp.steps.length - 1;
  const showAll = motion === "none";

  return (
    <article className="dbg-bp">
      <header className="dbg-bp__head">
        <span className="dbg-bp__dot" aria-hidden="true" />
        <span className="dbg-bp__file">break at {bp.file}</span>
        <h3>{bp.title}</h3>
      </header>

      {showAll ? (
        <div className="dbg-bp__steps">
          {bp.steps.map((s) => (
            <div className="dbg-bp__step" key={s.label}>
              <p className="dbg-bp__label">{s.label}</p>
              <p>{s.state}</p>
            </div>
          ))}
          <p className="dbg-bp__verdict">⏺ {bp.verdict}</p>
        </div>
      ) : (
        <div className="dbg-bp__steps">
          <div className="dbg-bp__step" key={step}>
            <p className="dbg-bp__label">{bp.steps[step].label}</p>
            <p>{bp.steps[step].state}</p>
          </div>
          <div className="dbg-bp__controls">
            <div className="dbg-bp__pips" aria-hidden="true">
              {bp.steps.map((_, i) => (
                <span key={i} className={i <= step ? "is-hit" : undefined} />
              ))}
            </div>
            {done ? (
              <p className="dbg-bp__verdict">⏺ {bp.verdict}</p>
            ) : (
              <button className="dbg-bp__continue" onClick={() => setStep((s) => s + 1)}>
                continue ▸
              </button>
            )}
            {done ? (
              <button className="dbg-bp__continue dbg-bp__continue--restart" onClick={() => setStep(0)}>
                ↺ restart
              </button>
            ) : null}
          </div>
        </div>
      )}
    </article>
  );
}

/* ---------- page ---------- */

export default function EngineerPage({ mode }: Props) {
  const { level: motion } = useMotionPreference();
  const [selected, setSelected] = useState<string | null>(null);
  const [traceToken, setTraceToken] = useState(0);
  const [traceHop, setTraceHop] = useState<string | null>(null);
  const [openFrame, setOpenFrame] = useState<string | null>("zariya");
  const pageRef = useRef<HTMLElement>(null);

  // auto-run the career trace once, after the graph blooms (full motion only)
  useEffect(() => {
    if (motion !== "full") return;
    const id = window.setTimeout(() => setTraceToken((t) => t + 1), 2200);
    return () => window.clearTimeout(id);
  }, [motion]);

  // scroll reveals, governed
  useEffect(() => {
    if (!pageRef.current) return;
    return revealOnScroll(pageRef.current, "[data-reveal]", motion);
  }, [motion]);

  const detail = selected ? nodeDetails[selected] : null;

  return (
    <main className="dbg" ref={pageRef}>
      {/* ── 01 · attach ───────────────────────────────────────────── */}
      <section className="dbg-hero">
        <ServiceMap
          motion={motion}
          selected={selected}
          onSelect={setSelected}
          traceToken={traceToken}
          onTraceHop={setTraceHop}
        />

        <div className="dbg-hero__intro">
          <p className="dbg-kicker">SAME SOURCE · DIFFERENT RENDER — view 01/11: DEBUGGER</p>
          <p className="dbg-meta">
            process <strong>ayush.saini</strong> · pid 2002 · state{" "}
            <strong className="dbg-meta__live">RUNNING</strong>
          </p>
          <h1>{hero.name}</h1>
          <p className="dbg-role">{resolve(hero.role, mode)}</p>
          <p className="dbg-statement">{resolve(hero.statement, mode)}</p>
          <AttachTicker motion={motion} />
          <div className="dbg-traceline">
            <button className="dbg-btn" onClick={() => setTraceToken((t) => t + 1)} disabled={motion === "none"}>
              ▸ trace career.route
            </button>
            <p className="dbg-traceline__hop" aria-live="polite">
              {traceHop ?? (motion === "none" ? "route: fundamentals → testing → production → architecture" : "")}
            </p>
          </div>
        </div>

        {/* node legend — keyboard path into the canvas graph */}
        <nav className="dbg-legend" aria-label="Service map nodes">
          {graphNodes.map((n) => (
            <button
              key={n.id}
              className={`dbg-legend__chip dbg-legend__chip--${n.kind}${selected === n.id ? " is-active" : ""}`}
              onClick={() => setSelected(selected === n.id ? null : n.id)}
              aria-pressed={selected === n.id}
            >
              {n.label}
            </button>
          ))}
        </nav>

        {/* inspector panel */}
        {detail ? (
          <aside className="dbg-inspector" role="dialog" aria-label={`Inspect ${detail.title}`}>
            <header>
              <h2>{detail.title}</h2>
              <button className="dbg-inspector__close" onClick={() => setSelected(null)} aria-label="Close inspector">
                ✕
              </button>
            </header>
            <p className="dbg-inspector__meta">{detail.meta}</p>
            <ul>
              {detail.lines.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
            {detail.link ? (
              <a href={detail.link.href} target="_blank" rel="noreferrer">
                {detail.link.label}
              </a>
            ) : null}
          </aside>
        ) : null}
      </section>

      {/* ── 02 · stack trace ─────────────────────────────────────── */}
      <section id="stack-trace" className="dbg-section" data-reveal>
        <header className="dbg-section__head">
          <span>02</span>
          <h2>stack trace</h2>
          <p>career, newest frame on top — expand any frame to read its locals</p>
        </header>
        <div className="dbg-stack">
          {frames.map((f, i) => (
            <StackFrame
              key={f.id}
              index={i}
              frame={f}
              mode={mode}
              open={motion === "none" ? true : openFrame === f.id}
              onToggle={() => setOpenFrame(openFrame === f.id ? null : f.id)}
            />
          ))}
          <article className="dbg-frame dbg-frame--bottom">
            <div className="dbg-frame__head dbg-frame__head--static">
              <span className="dbg-frame__idx">#{frames.length}</span>
              <span className="dbg-frame__fn">
                at <em>Chitkara.load(fundamentals)</em>
              </span>
              <span className="dbg-frame__loc">
                chitkara/cs.degree · {education[0].period} · {education[0].result}
              </span>
            </div>
          </article>
        </div>
      </section>

      {/* ── 03 · breakpoints ─────────────────────────────────────── */}
      <section id="breakpoints" className="dbg-section" data-reveal>
        <header className="dbg-section__head">
          <span>03</span>
          <h2>breakpoints</h2>
          <p>three places the debugger actually stopped — step through each</p>
        </header>
        <div className="dbg-bps">
          {breakpoints.map((bp) => (
            <BreakpointStory key={bp.id} bp={bp} motion={motion} />
          ))}
        </div>
      </section>

      {/* ── 04 · /proc ───────────────────────────────────────────── */}
      <section id="proc" className="dbg-section" data-reveal>
        <header className="dbg-section__head">
          <span>04</span>
          <h2>/proc/ayush</h2>
          <p>runtime capabilities, as mounted</p>
        </header>
        <div className="dbg-proc">
          {skillGroups.map((group) => (
            <article className="dbg-proc__group" key={group.label}>
              <h3>/proc/skills/{group.label.toLowerCase().replace(/\s+/g, "_")}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
          <article className="dbg-proc__group">
            <h3>/proc/education</h3>
            <ul>
              {education.map((e) => (
                <li key={e.school}>
                  {e.school}
                  {e.degree ? ` — ${e.degree}` : ""} · {e.period} · {e.result}
                </li>
              ))}
            </ul>
          </article>
          <article className="dbg-proc__group">
            <h3>/proc/extras</h3>
            <ul>
              <li>{resolve(outside, mode)}</li>
            </ul>
          </article>
        </div>
      </section>

      {/* ── 05 · loaded modules ──────────────────────────────────── */}
      <section id="modules" className="dbg-section" data-reveal>
        <header className="dbg-section__head">
          <span>05</span>
          <h2>loaded modules</h2>
          <p>$ lsmod — personal projects, all running in production</p>
        </header>
        <div className="dbg-modules">
          {projects.map((project) => (
            <a className="dbg-module" href={project.url} key={project.id} target="_blank" rel="noreferrer">
              <div className="dbg-module__row">
                <span className="dbg-module__num">{project.number}</span>
                <h3>{project.name}</h3>
                <span className="dbg-module__live">● LIVE ↗</span>
              </div>
              <p>{resolve(project.description, mode)}</p>
              <ul>
                {project.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </section>

      {/* ── 06 · open socket ─────────────────────────────────────── */}
      <section id="contact" className="dbg-contact" data-reveal>
        <p className="dbg-contact__listen">
          LISTENING on <strong>:hire</strong>
          <span className="dbg-cursor" />
        </p>
        <h2>{resolve(contact.h2, mode)}</h2>
        <p className="dbg-contact__body">{resolve(contact.body, mode)}</p>
        <div className="dbg-contact__links">
          <a href={contacts.emailHref}>EMAIL ↗</a>
          <a href={contacts.linkedin} target="_blank" rel="noreferrer">
            LINKEDIN ↗
          </a>
          <a href={contacts.github} target="_blank" rel="noreferrer">
            GITHUB ↗
          </a>
        </div>
      </section>
    </main>
  );
}
