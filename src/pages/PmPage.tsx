import { useEffect, useRef, useState } from "react";
import {
  caseStudies,
  eraLog,
  ganttRange,
  ganttTracks,
  pmSections,
  pmStats,
  profileScope,
  programLenses,
  projects,
  tickerItems,
  type ProgramLens,
} from "./pmContent";
import { contacts } from "../content/contacts";
import { contact } from "../content/profile";
import { revealOnScroll } from "../engine/animation";
import { useMotionPreference, type MotionLevel } from "../engine/useMotionPreference";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

const pct = (v: number) =>
  ((v - ganttRange.start) / (ganttRange.end - ganttRange.start)) * 100;

const GANTT_YEARS = [2018, 2020, 2022, 2024, 2026];

function Stat({
  value,
  decimals = 0,
  suffix,
  label,
  level,
}: (typeof pmStats)[number] & { level: MotionLevel }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(level === "none" ? value : 0);

  useEffect(() => {
    if (level === "none") {
      setShown(value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1100;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          setShown(value * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, level]);

  return (
    <div className="pmb-stat pmb-reveal">
      <span className="pmb-stat__num" ref={ref}>
        {shown.toFixed(decimals)}
        <em>{suffix}</em>
      </span>
      <span className="pmb-stat__label">{label}</span>
    </div>
  );
}

export default function PmPage({ mode }: Props) {
  const pageRef = useRef<HTMLElement>(null);
  const { level } = useMotionPreference();
  const [activeLens, setActiveLens] = useState<ProgramLens>("launch");
  const [era, setEra] = useState({ idx: eraLog.length - 1, dir: 1 });
  const [activeSection, setActiveSection] = useState("brief");

  const currentEra = eraLog[era.idx];
  const program = programLenses.find((item) => item.id === activeLens) ?? programLenses[0];

  function scrubTo(idx: number) {
    setEra((prev) => (idx === prev.idx ? prev : { idx, dir: idx > prev.idx ? 1 : -1 }));
  }

  useEffect(() => {
    if (!pageRef.current) return;
    return revealOnScroll(pageRef.current, ".pmb-reveal", level);
  }, [level]);

  // Scroll-spy for the milestone rail.
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-pmb-section]"),
    );
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute("data-pmb-section") ?? "brief");
          }
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const railIdx = Math.max(
    0,
    pmSections.findIndex((s) => s.id === activeSection),
  );

  return (
    <main className="pmb-page" ref={pageRef}>
      {/* ── program status ticker ─────────────────────────────────── */}
      <div className="pmb-ticker" aria-hidden="true">
        <div className="pmb-ticker__track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i}>
              {item}
              <i>◆</i>
            </span>
          ))}
        </div>
      </div>

      {/* ── milestone rail (desktop) ──────────────────────────────── */}
      <nav className="pmb-rail" aria-label="Briefing sections">
        <div className="pmb-rail__line">
          <div
            className="pmb-rail__fill"
            style={{ height: `${(railIdx / (pmSections.length - 1)) * 100}%` }}
          />
        </div>
        {pmSections.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`pmb-rail__stop${activeSection === s.id ? " pmb-rail__stop--active" : ""}`}
            onClick={() =>
              document.getElementById(`pmb-${s.id}`)?.scrollIntoView({
                behavior: level === "none" ? "auto" : "smooth",
                block: "start",
              })
            }
          >
            <span className="pmb-rail__num">{s.num}</span>
            <span className="pmb-rail__label">{s.label}</span>
          </button>
        ))}
      </nav>

      <div className="pmb-inner">
        {/* ── 01 · brief ──────────────────────────────────────────── */}
        <section className="pmb-hero" id="pmb-brief" data-pmb-section="brief">
          <div className="pmb-hero__main">
            <p className="pmb-eyebrow">01 · Brief for a program hiring manager</p>
            <h1 className="pmb-hero__title">
              <span className="pmb-line" style={{ "--d": "60ms" } as React.CSSProperties}>
                <span>Ayush Saini —</span>
              </span>
              <span className="pmb-line" style={{ "--d": "150ms" } as React.CSSProperties}>
                <span>engineer who runs</span>
              </span>
              <span className="pmb-line" style={{ "--d": "240ms" } as React.CSSProperties}>
                <span>
                  the <em className="pmb-mark">program room.</em>
                </span>
              </span>
            </h1>
            <p className="pmb-hero__lede">
              Software engineer at Optmyzr. Technical Co-Founder & CTO at Zariya AI. Production
              work spanning award-winning ad-tech software, real-time AI interviews, hiring systems,
              and cloud operations.
            </p>
          </div>

          <aside className="pmb-hero__facts">
            <span className="pmb-hero__facts-tag">FACT SHEET</span>
            <dl>
              <dt>Scope</dt>
              <dd>AI campaign creation, portfolios, alerts, audits, scripts.</dd>
              <dt>Decision radius</dt>
              <dd>Architecture, infrastructure, product resets, and 70-session voice systems.</dd>
              <dt>Strength</dt>
              <dd>Bug duty across a wide product suite.</dd>
              <dt>Based in</dt>
              <dd>India · remote-friendly.</dd>
              <dt>Available for</dt>
              <dd>Engineering, TPM, or program-heavy product work.</dd>
            </dl>
          </aside>

          {/* parallel-track timeline — the PM artifact as hero furniture */}
          <div className="pmb-gantt pmb-reveal" role="img" aria-label="Career timeline, 2018 to 2026, four parallel tracks">
            <div className="pmb-gantt__head">
              <span className="pmb-mono-tag">PARALLEL TRACKS · 2018 → NOW</span>
              <span className="pmb-mono-tag pmb-gantt__legend">
                <i /> active workstream
              </span>
            </div>
            <div className="pmb-gantt__plot">
              <div className="pmb-gantt__gridlayer" aria-hidden="true">
                {GANTT_YEARS.map((year) => (
                  <span key={year} className="pmb-gantt__year" style={{ left: `${pct(year)}%` }}>
                    {year}
                  </span>
                ))}
                <span className="pmb-gantt__today" style={{ left: `${pct(ganttRange.today)}%` }}>
                  <b>TODAY</b>
                </span>
              </div>
              {ganttTracks.map((track, i) => (
                <div className="pmb-gantt__row" key={track.label}>
                  <span className="pmb-gantt__row-label">
                    {track.label} <em>{track.detail}</em>
                  </span>
                  <div className="pmb-gantt__track">
                    <div
                      className="pmb-gantt__bar"
                      style={
                        {
                          left: `${pct(track.start)}%`,
                          width: `${pct(track.end) - pct(track.start)}%`,
                          "--d": `${200 + i * 140}ms`,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── KPI strip ───────────────────────────────────────────── */}
        <section className="pmb-stats" aria-label="Key numbers">
          {pmStats.map((stat) => (
            <Stat key={stat.label} {...stat} level={level} />
          ))}
        </section>

        {/* ── 02 · control room ───────────────────────────────────── */}
        <section
          className="pmb-control pmb-reveal"
          id="pmb-control"
          data-pmb-section="control"
          aria-label="Program control room"
        >
          <div className="pmb-control__top">
            <div className="pmb-control__title">
              <span className="pmb-eyebrow">02 · One program, three lenses</span>
              <h2>Control room</h2>
            </div>
            <div className="pmb-control__tabs" role="tablist" aria-label="Program lens">
              {programLenses.map((item) => (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={activeLens === item.id}
                  className={`pmb-control__tab${activeLens === item.id ? " pmb-control__tab--active" : ""}`}
                  onClick={() => setActiveLens(item.id)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pmb-control__grid" key={program.id}>
            <article className="pmb-program">
              <p className="pmb-program__metric">{program.metric}</p>
              <h3>{program.title}</h3>
              <p className="pmb-program__summary">{program.summary}</p>
              <div className="pmb-program__call">
                <span>Decision</span>
                <p>{program.decision}</p>
              </div>
              <div className="pmb-program__call pmb-program__call--risk">
                <span>Risk</span>
                <p>{program.risk}</p>
              </div>
            </article>

            <div className="pmb-lanes">
              {program.workstreams.map((lane, index) => (
                <article
                  className="pmb-lane"
                  key={lane.lane}
                  style={{ "--d": `${index * 90}ms` } as React.CSSProperties}
                >
                  <div className="pmb-lane__head">
                    <span className="pmb-lane__dot" />
                    <h3>{lane.lane}</h3>
                    <span className="pmb-lane__num">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <ul>
                    {lane.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 03 · decision log ───────────────────────────────────── */}
        <section className="pmb-log pmb-reveal" id="pmb-log" data-pmb-section="log" aria-label="Decision log">
          <div className="pmb-log__top">
            <div>
              <span className="pmb-eyebrow">03 · Replay the judgment calls</span>
              <h2>Decision log</h2>
            </div>
            <p className="pmb-log__hint">drag the scrubber — four eras on record</p>
          </div>

          <div className="pmb-log__scrubber">
            <input
              type="range"
              min={0}
              max={eraLog.length - 1}
              step={1}
              value={era.idx}
              onChange={(e) => scrubTo(Number(e.target.value))}
              aria-label="Career era"
            />
            <div className="pmb-log__stops">
              {eraLog.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  className={`pmb-log__stop${i === era.idx ? " pmb-log__stop--active" : ""}`}
                  onClick={() => scrubTo(i)}
                >
                  <span className="pmb-log__stop-dot" />
                  {item.year}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`pmb-log__card pmb-log__card--${era.dir > 0 ? "fwd" : "back"}`}
            key={currentEra.id}
          >
            <div className="pmb-log__meta">
              <h3>{currentEra.title}</h3>
              <p>{currentEra.status}</p>
              <div className="pmb-log__active">
                {currentEra.active.map((a) => (
                  <span key={a}>{a}</span>
                ))}
              </div>
            </div>
            <ul className="pmb-log__decisions">
              {currentEra.decisions.map((d, i) => (
                <li key={i}>
                  <span>CALL {String(i + 1).padStart(2, "0")}</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 04 · case studies ───────────────────────────────────── */}
        <section className="pmb-cases" id="pmb-cases" data-pmb-section="cases" aria-label="Case studies">
          <div className="pmb-sec-head pmb-reveal">
            <span className="pmb-eyebrow">04 · Context → shipped → signal</span>
            <h2>Case studies</h2>
          </div>
          {caseStudies.map((item, idx) => (
            <article className="pmb-case pmb-reveal" key={item.company}>
              <span className="pmb-case__index">{String(idx + 1).padStart(2, "0")}</span>
              <div className="pmb-case__meta">
                <b>{item.company}</b>
                <span>{item.role}</span>
                <span>{item.period}</span>
                <span>{item.meta}</span>
                {item.extra ? <span className="pmb-case__extra">{item.extra}</span> : null}
              </div>
              <div className="pmb-case__body">
                <h3>{item.title}</h3>
                <p className="pmb-case__sub">{item.subtitle}</p>
                <div className="pmb-csr">
                  <span>Context</span>
                  <p>{item.context}</p>
                  <span>Shipped</span>
                  <p>{item.shipped}</p>
                  <span>Signal</span>
                  <p>{item.signal}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* ── 05 · shipped ────────────────────────────────────────── */}
        <section className="pmb-proj" id="pmb-shipped" data-pmb-section="shipped" aria-label="Projects">
          <div className="pmb-sec-head pmb-reveal">
            <span className="pmb-eyebrow">05 · Problem → outcome</span>
            <h2>Shipped on the side</h2>
          </div>
          <div className="pmb-proj__grid">
            {projects.map((project) => (
              <a
                className="pmb-proj__card pmb-reveal"
                key={project.number}
                href={project.href}
                target="_blank"
                rel="noreferrer"
              >
                <p className="pmb-proj__num">{project.number}</p>
                <h4>{project.title}</h4>
                <p className="pmb-proj__body">{project.body}</p>
                <div className="pmb-proj__footer">
                  <p className="pmb-proj__outcome">{project.outcome}</p>
                  <span className="pmb-proj__arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── 06 · operator profile ───────────────────────────────── */}
        <section className="pmb-profile" id="pmb-profile" data-pmb-section="profile" aria-label="Operator profile">
          <div className="pmb-sec-head pmb-reveal">
            <span className="pmb-eyebrow">06 · How the operator works</span>
            <h2>Operator profile</h2>
          </div>
          <div className="pmb-profile__grid pmb-reveal">
            <div>
              <h3>How I work</h3>
              <p>
                Backend-leaning full-stack. Prefers a boring, correct V1 over a clever V1. Writes
                specs back to stakeholders in their own words before I start — it&apos;s cheap and
                catches 60% of the bad ideas.
              </p>
              <h3 className="pmb-profile__spaced">Outside of code</h3>
              <p>
                Debate society and theatre through college. Useful in engineering — half my job is
                explaining a code-shaped problem to a non-code-shaped person.
              </p>
            </div>
            <div>
              <h3>Scope I&apos;ve carried</h3>
              <ul>
                {profileScope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 07 · handoff ────────────────────────────────────────── */}
        <section className="pmb-handoff pmb-reveal" id="pmb-contact" data-pmb-section="contact">
          <span className="pmb-handoff__eyebrow">07 · Handoff</span>
          <h2>The program is ready for handoff.</h2>
          <p>{contact.body.pm ?? contact.body._default}</p>
          <div className="pmb-handoff__links">
            <a href={contacts.emailHref}>
              EMAIL <i>↗</i>
            </a>
            <a href={contacts.linkedin} target="_blank" rel="noreferrer">
              LINKEDIN <i>↗</i>
            </a>
            <a href={contacts.github} target="_blank" rel="noreferrer">
              GITHUB <i>↗</i>
            </a>
          </div>
        </section>

        <footer className="pmb-foot">
          <span>AYUSH SAINI · CINEMATICGENIUS007.COM · © 2026</span>
          <span className="pmb-foot__pill">
            VIEWING AS <b>{mode.toUpperCase()}</b> · ⌘K TO CHANGE
          </span>
        </footer>
      </div>
    </main>
  );
}
