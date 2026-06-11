import { contacts } from "../content/contacts";
import { useState, useEffect, useRef } from "react";
import {
  hero,
  about,
  experiences,
  projects,
  contact,
  resolve,
} from "../content/profile";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };
type SignalLensId = "build" | "debug" | "architect";
type SignalChapterId = "origin" | "build" | "debug" | "architect" | "evidence";
type SignalNodeId =
  | "ayush"
  | "optmyzr"
  | "ai-campaign"
  | "portfolio-alerts"
  | "scripts"
  | "campaign-automator"
  | "bug-duty"
  | "zariya"
  | "architecture"
  | "infrastructure"
  | "projects"
  | "skills";

const SIGNAL_LENSES: {
  id: SignalLensId;
  label: string;
  command: string;
  headline: string;
  lines: string[];
}[] = [
  {
    id: "build",
    label: "Build",
    command: "trace --surface=ai-campaigns",
    headline: "Owned the newest Optmyzr build from zero.",
    lines: [
      "AI campaign creation shipped from scratch",
      "Portfolio-level alerts created end-to-end",
      "Portfolio support expanded across dashboards and tools",
    ],
  },
  {
    id: "debug",
    label: "Debug",
    command: "inspect --mode=bug-duty",
    headline: "Useful where product surfaces overlap.",
    lines: [
      "Campaign Automator features and long-running fixes",
      "Google Ads Scripts maintenance and customer queries",
      "Cross-surface production bugs across ad-tech workflows",
    ],
  },
  {
    id: "architect",
    label: "Architect",
    command: "map --system=zariya-ai",
    headline: "Architecture and infrastructure at Zariya AI.",
    lines: [
      "Software design for multiple 0-to-1 features",
      "Server infrastructure implemented and maintained",
      "Product resets when patching was no longer enough",
    ],
  },
];

const SIGNAL_CHAPTERS: {
  id: SignalChapterId;
  number: string;
  label: string;
  headline: string;
  body: string;
  nodes: SignalNodeId[];
}[] = [
  {
    id: "origin",
    number: "00",
    label: "Origin",
    headline: "A resume as a map of pressure, not a list of titles.",
    body:
      "The useful story is not just where I worked. It is how work moved through me: product surfaces, bugs, infrastructure, and the places where correctness mattered.",
    nodes: ["ayush", "optmyzr", "zariya"],
  },
  {
    id: "build",
    number: "01",
    label: "Build",
    headline: "New surfaces shipped from blank page to production.",
    body:
      "AI campaign creation is the newest major Optmyzr project I built from scratch. Portfolio-level alerts and portfolio support widened that ownership across dashboards, audits, and alerting.",
    nodes: ["ai-campaign", "portfolio-alerts", "optmyzr"],
  },
  {
    id: "debug",
    number: "02",
    label: "Debug",
    headline: "Maintenance is not background work when customers are waiting.",
    body:
      "Scripts, Campaign Automator, customer queries, and bug duty formed the long-running thread: finding problems across product boundaries and making them boring again.",
    nodes: ["scripts", "campaign-automator", "bug-duty", "optmyzr"],
  },
  {
    id: "architect",
    number: "03",
    label: "Architect",
    headline: "At Zariya AI, the work becomes shape, servers, and direction.",
    body:
      "The role is architectural: software design, technical direction, infrastructure, product resets, and multiple 0-to-1 features where patching was not enough.",
    nodes: ["zariya", "architecture", "infrastructure"],
  },
  {
    id: "evidence",
    number: "04",
    label: "Evidence",
    headline: "The public projects are smaller, but they reveal the same instincts.",
    body:
      "Interviews by Zariya, the Sudoku Solver, and Ultimate TTT are proof of taste under constraint: explain the system, make the interaction legible, then ship.",
    nodes: ["projects", "skills", "ayush"],
  },
];

const SIGNAL_NODES: {
  id: SignalNodeId;
  label: string;
  meta: string;
  x: number;
  y: number;
  chapter: SignalChapterId;
  summary: string;
}[] = [
  {
    id: "ayush",
    label: "Ayush",
    meta: "center",
    x: 50,
    y: 50,
    chapter: "origin",
    summary: "Full-stack engineer moving between product ownership, debugging, architecture, and communication.",
  },
  {
    id: "optmyzr",
    label: "Optmyzr",
    meta: "ad-tech",
    x: 31,
    y: 31,
    chapter: "origin",
    summary: "Primary role since 2023 across Google Ads tooling, dashboards, alerts, audits, scripts, and automation.",
  },
  {
    id: "ai-campaign",
    label: "AI Campaign Creation",
    meta: "owned",
    x: 20,
    y: 57,
    chapter: "build",
    summary: "Newest major project: built from scratch and owned end-to-end.",
  },
  {
    id: "portfolio-alerts",
    label: "Portfolio Alerts",
    meta: "created",
    x: 36,
    y: 75,
    chapter: "build",
    summary: "Created portfolio-level alerts and helped expand portfolio support through dashboards, audits, and alerts.",
  },
  {
    id: "scripts",
    label: "Google Ads Scripts",
    meta: "maintained",
    x: 65,
    y: 24,
    chapter: "debug",
    summary: "Long-running maintenance: features, bug fixes, customer queries, and production support.",
  },
  {
    id: "campaign-automator",
    label: "Campaign Automator",
    meta: "improved",
    x: 78,
    y: 46,
    chapter: "debug",
    summary: "Feature work and bugfixes over time without overstating ownership of the whole tool.",
  },
  {
    id: "bug-duty",
    label: "Bug Duty",
    meta: "strength",
    x: 63,
    y: 72,
    chapter: "debug",
    summary: "A reliable strength: messy cross-surface bugs, customer-facing issues, and production weirdness.",
  },
  {
    id: "zariya",
    label: "Zariya AI",
    meta: "early-stage",
    x: 83,
    y: 67,
    chapter: "architect",
    summary: "Architectural role across product foundations, technical direction, and software design.",
  },
  {
    id: "architecture",
    label: "Architecture",
    meta: "shape",
    x: 76,
    y: 84,
    chapter: "architect",
    summary: "Went back to the drawing board when needed: product resets, system design, and cleaner foundations.",
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    meta: "owned",
    x: 91,
    y: 29,
    chapter: "architect",
    summary: "Implemented and maintain the server infrastructure behind Zariya AI.",
  },
  {
    id: "projects",
    label: "Projects",
    meta: "public",
    x: 21,
    y: 21,
    chapter: "evidence",
    summary: "Interviews by Zariya, Sudoku Solver, and Ultimate TTT: small products with clear interaction ideas.",
  },
  {
    id: "skills",
    label: "Skills",
    meta: "toolkit",
    x: 50,
    y: 14,
    chapter: "evidence",
    summary: "C#, TypeScript, React, Next.js, Express, backend architecture, infrastructure, and debugging.",
  },
];

const SIGNAL_LINKS: [SignalNodeId, SignalNodeId][] = [
  ["ayush", "optmyzr"],
  ["ayush", "zariya"],
  ["ayush", "projects"],
  ["ayush", "skills"],
  ["optmyzr", "ai-campaign"],
  ["optmyzr", "portfolio-alerts"],
  ["optmyzr", "scripts"],
  ["optmyzr", "campaign-automator"],
  ["campaign-automator", "bug-duty"],
  ["scripts", "bug-duty"],
  ["zariya", "architecture"],
  ["zariya", "infrastructure"],
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useLatency() {
  const [ms, setMs] = useState(12);
  useEffect(() => {
    let lastFire = 0;
    const jitter = () => {
      const now = Date.now();
      if (now - lastFire > 100) {
        setMs(Math.floor(6 + Math.random() * 18));
        lastFire = now;
      }
    };
    window.addEventListener("mousemove", jitter);
    const id = setInterval(() => setMs(Math.floor(6 + Math.random() * 18)), 1800);
    return () => {
      window.removeEventListener("mousemove", jitter);
      clearInterval(id);
    };
  }, []);
  return ms;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

type HeroPhase = "idle" | "spiking" | "stable";

function useHeroPhase(): HeroPhase {
  const [phase, setPhase] = useState<HeroPhase>("idle");
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("spiking"), 700);
    const t2 = setTimeout(() => setPhase("stable"), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return phase;
}

// ─── Oscilloscope ─────────────────────────────────────────────────────────────

const SPIKE_PATH =
  "M0,50 L320,50 L333,43 L343,14 L350,4 L357,16 L364,50 L371,66 L377,57 L384,50 L900,50";

function Oscilloscope({ phase }: { phase: HeroPhase }) {
  return (
    <svg
      className="signal-osc"
      viewBox="0 0 900 100"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      {[20, 40, 60, 80].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="900" y2={y} className="signal-osc__grid-h" />
      ))}
      {[180, 360, 540, 720].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="100" className="signal-osc__grid-v" />
      ))}

      <line x1="0" y1="50" x2="900" y2="50" className="signal-osc__baseline" />

      <path
        d={SPIKE_PATH}
        className={[
          "signal-osc__spike",
          phase === "spiking" ? "signal-osc__spike--draw" : "",
          phase === "stable" ? "signal-osc__spike--stable" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />
    </svg>
  );
}

// ─── Rule Card (Experience) ────────────────────────────────────────────────────

type RulePhase = "hidden" | "scanning" | "matched";

function RuleCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) {
  const { ref, inView } = useInView(0.12);
  const [phase, setPhase] = useState<RulePhase>("hidden");
  const mode: ModeId = "signal";

  useEffect(() => {
    if (!inView) return;
    setPhase("scanning");
    const t = setTimeout(() => setPhase("matched"), 480 + index * 60);
    return () => clearTimeout(t);
  }, [inView, index]);

  const isActive = experience.period.includes("Present");

  return (
    <div
      ref={ref}
      className={`signal-rule-card signal-rule-card--${phase}`}
    >
      <div className="signal-rule-card__hdr">
        <span className="signal-rule-card__cmd">
          {phase === "scanning" ? (
            <>
              SCOPE<span className="signal-dim-txt">::</span>EVAL
              <span className="signal-blink">_</span>
            </>
          ) : (
            <>
              SCOPE<span className="signal-dim-txt">::</span>EVAL
              {"  "}
              <span className="signal-dim-txt">id=</span>
              &ldquo;{experience.id}&rdquo;
            </>
          )}
        </span>
        {phase === "matched" && (
          <span className="signal-rule-card__match">MATCH</span>
        )}
      </div>

      {phase === "matched" && (
        <div className="signal-rule-card__body">
          <div className="signal-rule-card__top">
            <div>
              <h3 className="signal-rule-card__company">{experience.company}</h3>
              <p className="signal-rule-card__role">{experience.role}</p>
            </div>
            <span className="signal-rule-card__period">{experience.period}</span>
          </div>
          <ul className="signal-rule-card__bullets">
            {experience.bullets.map((b, i) => (
              <li key={i}>{resolve(b, mode)}</li>
            ))}
          </ul>
          <div className="signal-rule-card__footer">
            <div className="signal-rule-card__bar-track">
              <div className="signal-rule-card__bar-fill" />
            </div>
            <span
              className={`signal-rule-card__status ${
                isActive ? "signal-rule-card__status--active" : ""
              }`}
            >
              {isActive ? "● ACTIVE" : "○ CLOSED"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

type CompilePhase = "pending" | "compiling" | "done";

function ProjectCard({
  project,
  index,
  parentInView,
}: {
  project: (typeof projects)[0];
  index: number;
  parentInView: boolean;
}) {
  const [phase, setPhase] = useState<CompilePhase>("pending");
  const mode: ModeId = "signal";

  useEffect(() => {
    if (!parentInView) return;
    const t1 = setTimeout(() => setPhase("compiling"), index * 240);
    const t2 = setTimeout(() => setPhase("done"), index * 240 + 750);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [parentInView, index]);

  return (
    <div className={`signal-project signal-project--${phase}`}>
      <div className="signal-project__hdr">
        <span className="signal-dim-txt">{project.number}</span>
        {phase === "pending" && (
          <span className="signal-dim-txt">PENDING</span>
        )}
        {phase === "compiling" && (
          <span className="signal-project__compiling">
            COMPILING<span className="signal-blink">_</span>
          </span>
        )}
        {phase === "done" && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="signal-project__ok"
          >
            [OK] ↗
          </a>
        )}
      </div>
      {phase === "done" && (
        <>
          <h3 className="signal-project__name">{project.name}</h3>
          <p className="signal-project__desc">
            {resolve(project.description, mode)}
          </p>
          <ul className="signal-project__tech">
            {project.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

// ─── Skill Bars ───────────────────────────────────────────────────────────────

const SKILL_SIGNALS = [
  { label: "JavaScript", pct: 92 },
  { label: "TypeScript", pct: 88 },
  { label: "C#", pct: 80 },
  { label: "React / Next.js", pct: 85 },
  { label: "Node / Express", pct: 76 },
  { label: "Go", pct: 62 },
];

function SkillBars({ inView }: { inView: boolean }) {
  return (
    <div className="signal-bars">
      {SKILL_SIGNALS.map(({ label, pct }, i) => (
        <div key={label} className="signal-bar" style={{ transitionDelay: inView ? `${i * 80}ms` : "0ms" }}>
          <span className="signal-bar__label">{label}</span>
          <div className="signal-bar__track">
            <div
              className="signal-bar__fill"
              style={{ width: inView ? `${pct}%` : "0%" }}
            />
          </div>
          <span className="signal-bar__pct">{inView ? `${pct}%` : "---"}</span>
        </div>
      ))}
    </div>
  );
}

function SignalStoryMap() {
  const [activeChapter, setActiveChapter] = useState<SignalChapterId>("origin");
  const [selectedNode, setSelectedNode] = useState<SignalNodeId>("ayush");
  const stepRefs = useRef<Record<SignalChapterId, HTMLElement | null>>({
    origin: null,
    build: null,
    debug: null,
    architect: null,
    evidence: null,
  });

  useEffect(() => {
    let frame = 0;
    const updateActiveChapter = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;
      const closest = SIGNAL_CHAPTERS
        .map((chapter) => {
          const node = stepRefs.current[chapter.id];
          if (!node) return null;
          const rect = node.getBoundingClientRect();
          return {
            chapter,
            distance: Math.abs(rect.top + rect.height / 2 - viewportCenter),
          };
        })
        .filter(Boolean)
        .sort((a, b) => a!.distance - b!.distance)[0];

      if (!closest) return;
      const nextChapter = closest.chapter;
      setActiveChapter(nextChapter.id);
      if (!nextChapter.nodes.includes(selectedNode)) {
        setSelectedNode(nextChapter.nodes[0]);
      }
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveChapter);
    };

    updateActiveChapter();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [selectedNode]);

  const activeChapterData =
    SIGNAL_CHAPTERS.find((chapter) => chapter.id === activeChapter) ?? SIGNAL_CHAPTERS[0];
  const activeNodes = new Set(activeChapterData.nodes);
  const selected =
    SIGNAL_NODES.find((node) => node.id === selectedNode) ??
    SIGNAL_NODES.find((node) => node.id === activeChapterData.nodes[0]) ??
    SIGNAL_NODES[0];

  const jumpToChapter = (id: SignalChapterId) => {
    stepRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="signal-map-section" aria-label="Signal systems map">
      <div className="signal-map-section__visual">
        <div className="signal-map__rail" aria-label="Signal chapters">
          {SIGNAL_CHAPTERS.map((chapter) => (
            <button
              key={chapter.id}
              className={`signal-map__rail-step${activeChapter === chapter.id ? " signal-map__rail-step--active" : ""}`}
              onClick={() => jumpToChapter(chapter.id)}
              type="button"
            >
              <span>{chapter.number}</span>
              {chapter.label}
            </button>
          ))}
        </div>

        <div className="signal-map" aria-label="Interactive professional scope map">
          <svg className="signal-map__links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            {SIGNAL_LINKS.map(([from, to]) => {
              const a = SIGNAL_NODES.find((node) => node.id === from);
              const b = SIGNAL_NODES.find((node) => node.id === to);
              if (!a || !b) return null;
              const active = activeNodes.has(from) || activeNodes.has(to);
              return (
                <line
                  key={`${from}-${to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  className={active ? "signal-map__link signal-map__link--active" : "signal-map__link"}
                />
              );
            })}
          </svg>

          {SIGNAL_NODES.map((node) => {
            const isActive = activeNodes.has(node.id);
            const isSelected = selected.id === node.id;
            return (
              <button
                key={node.id}
                className={[
                  "signal-map__node",
                  isActive ? "signal-map__node--active" : "",
                  isSelected ? "signal-map__node--selected" : "",
                ].filter(Boolean).join(" ")}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onClick={() => setSelectedNode(node.id)}
                type="button"
              >
                <span className="signal-map__node-dot" />
                <span className="signal-map__node-label">{node.label}</span>
                <span className="signal-map__node-meta">{node.meta}</span>
              </button>
            );
          })}
        </div>

        <aside className="signal-map-detail" aria-live="polite">
          <p className="signal-map-detail__eyebrow">{selected.meta}</p>
          <h3>{selected.label}</h3>
          <p>{selected.summary}</p>
        </aside>
      </div>

      <div className="signal-map-section__story">
        {SIGNAL_CHAPTERS.map((chapter) => (
          <article
            key={chapter.id}
            className={`signal-map-step${activeChapter === chapter.id ? " signal-map-step--active" : ""}`}
            data-chapter={chapter.id}
            ref={(node) => {
              stepRefs.current[chapter.id] = node;
            }}
          >
            <span className="signal-map-step__number">{chapter.number}</span>
            <p className="signal-map-step__label">{chapter.label}</p>
            <h2>{chapter.headline}</h2>
            <p>{chapter.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SignalPage({ mode }: Props) {
  const latency = useLatency();
  const heroPhase = useHeroPhase();
  const [activeLens, setActiveLens] = useState<SignalLensId>("build");
  const { ref: expRef, inView: expInView } = useInView(0.05);
  const { ref: projRef, inView: projInView } = useInView(0.05);
  const { ref: skillRef, inView: skillInView } = useInView(0.15);
  const lens = SIGNAL_LENSES.find((item) => item.id === activeLens) ?? SIGNAL_LENSES[0];

  return (
    <main className="signal-page">
      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="signal-hero">
        <div className="signal-hero__topbar">
          <span className="signal-dim-txt">SIGNAL / 01 / INTRODUCTION</span>
          <span className="signal-latency">
            LATENCY{" "}
            <span className="signal-latency__val">{latency}ms</span>
          </span>
        </div>

        <Oscilloscope phase={heroPhase} />

        <div
          className={`signal-hero__ident signal-hero__ident--${heroPhase}`}
        >
          <h1 className="signal-hero__name">{hero.name}</h1>
          <p className="signal-hero__role">{resolve(hero.role, mode)}</p>
          <p className="signal-hero__statement">
            {resolve(hero.statement, mode)}
          </p>
        </div>

        <div className="signal-lens" aria-label="Signal focus">
          <div className="signal-lens__controls">
            {SIGNAL_LENSES.map((item) => (
              <button
                key={item.id}
                className={`signal-lens__button${activeLens === item.id ? " signal-lens__button--active" : ""}`}
                onClick={() => setActiveLens(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="signal-lens__terminal">
            <p>
              <span className="signal-accent-txt">$</span> {lens.command}
            </p>
            <h2>{lens.headline}</h2>
            <ul>
              {lens.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="signal-hero__status">
          <span className="signal-status-dot" />
          <span className="signal-dim-txt">SYSTEM ONLINE</span>
          <span className="signal-dim-txt signal-sep">·</span>
          <span className="signal-dim-txt">ALL SIGNALS LOADED</span>
          <span className="signal-dim-txt signal-sep">·</span>
          <span className="signal-dim-txt">PROCESS RUNNING</span>
        </div>
      </section>

      <SignalStoryMap />

      {/* ── PROFILE ────────────────────────────────────────────────── */}
      <section className="signal-section">
        <div className="signal-section__hdr">
          <span className="signal-accent-txt">02</span>
          <span className="signal-dim-txt">/ SIGNAL PROFILE</span>
        </div>
        <div className="signal-profile">
          <div className="signal-profile__main">
            <p>{resolve(about.p1, mode)}</p>
            <p>{resolve(about.p2, mode)}</p>
          </div>
          <div className="signal-profile__log">
            {about.notes.map((note, i) => (
              <div key={i} className="signal-log-entry">
                <span className="signal-log-entry__n">
                  {String(i).padStart(2, "0")}
                </span>
                <span>{resolve(note, mode)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ─────────────────────────────────────────────── */}
      <section className="signal-section" ref={expRef}>
        <div className="signal-section__hdr">
          <span className="signal-accent-txt">03</span>
          <span className="signal-dim-txt">/ SYSTEM OUTPUT</span>
          {expInView && (
            <span className="signal-running">
              RUNNING<span className="signal-blink">_</span>
            </span>
          )}
        </div>
        <div className="signal-exp-list">
          {experiences.map((exp, i) => (
            <RuleCard key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────────────────────────── */}
      <section className="signal-section" ref={projRef}>
        <div className="signal-section__hdr">
          <span className="signal-accent-txt">04</span>
          <span className="signal-dim-txt">/ BUILD ARTIFACTS</span>
        </div>
        <div className="signal-projects">
          {projects.map((proj, i) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              index={i}
              parentInView={projInView}
            />
          ))}
        </div>
      </section>

      {/* ── SKILLS ─────────────────────────────────────────────────── */}
      <section className="signal-section" ref={skillRef}>
        <div className="signal-section__hdr">
          <span className="signal-accent-txt">05</span>
          <span className="signal-dim-txt">/ SIGNAL STRENGTH</span>
        </div>
        <SkillBars inView={skillInView} />
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────── */}
      <section className="signal-section signal-section--contact">
        <div className="signal-section__hdr">
          <span className="signal-accent-txt">06</span>
          <span className="signal-dim-txt">/ OPEN CHANNEL</span>
        </div>
        <div className="signal-terminal">
          <p className="signal-terminal__line">
            <span className="signal-accent-txt">$</span> connect
            <span className="signal-dim-txt"> --target</span> ayush.saini
          </p>
          <p className="signal-terminal__line signal-terminal__line--out">
            ✓ Connection established. Routes available:
          </p>
          <div className="signal-terminal__links">
            <a
              href={contacts.emailHref}
              className="signal-terminal__cmd"
            >
              → email<span className="signal-dim-txt">()</span>
            </a>
            <a
              href={contacts.linkedin}
              target="_blank"
              rel="noreferrer"
              className="signal-terminal__cmd"
            >
              → linkedin<span className="signal-dim-txt">()</span>
            </a>
            <a
              href={contacts.github}
              target="_blank"
              rel="noreferrer"
              className="signal-terminal__cmd"
            >
              → github<span className="signal-dim-txt">()</span>
            </a>
          </div>
          <p className="signal-terminal__cursor">
            <span className="signal-accent-txt">$</span>{" "}
            <span className="signal-blink">_</span>
          </p>
        </div>
      </section>
    </main>
  );
}
