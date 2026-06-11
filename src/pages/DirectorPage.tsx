import { contacts } from "../content/contacts";
import { useState, useEffect, useRef } from "react";
import {
  hero,
  about,
  experiences,
  projects,
  contact,
  education,
  resolve,
} from "../content/profile";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

// ─── Hooks ────────────────────────────────────────────────────────────────────

type IntroPhase = "counting" | "slate" | "content";

function useIntro(): { phase: IntroPhase; count: number; skip: () => void } {
  const seen = sessionStorage.getItem("director-intro") === "seen";
  const [phase, setPhase] = useState<IntroPhase>(seen ? "content" : "counting");
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (seen) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setCount(2), 500));
    timers.push(setTimeout(() => setCount(1), 1000));
    timers.push(setTimeout(() => setPhase("slate"), 1500));
    timers.push(setTimeout(() => {
      setPhase("content");
      sessionStorage.setItem("director-intro", "seen");
    }, 2400));
    return () => timers.forEach(clearTimeout);
  }, []);

  const skip = () => {
    setPhase("content");
    sessionStorage.setItem("director-intro", "seen");
  };

  return { phase, count, skip };
}

function useFollowCursor() {
  const target = useRef({ x: -200, y: -200 });
  const cur = useRef({ x: -200, y: -200 });
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const focused = el?.closest("a, button, [role='button']");
      ringRef.current?.classList.toggle("director-ring--focused", !!focused);
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const tick = () => {
      const alpha = 0.11;
      cur.current.x += (target.current.x - cur.current.x) * alpha;
      cur.current.y += (target.current.y - cur.current.y) * alpha;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${cur.current.x}px, ${cur.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return ringRef;
}

function useActiveAct() {
  const [active, setActive] = useState("act-1");
  useEffect(() => {
    const ids = ["act-1", "act-2", "act-3", "credits"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);
  return active;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
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

// ─── Countdown / Intro ────────────────────────────────────────────────────────

function CountdownScreen({
  count,
  phase,
  onSkip,
}: {
  count: number;
  phase: IntroPhase;
  onSkip: () => void;
}) {
  return (
    <div
      className="director-intro"
      onClick={onSkip}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onSkip();
      }}
      role="button"
      tabIndex={0}
    >
      {phase === "counting" && (
        <div className="director-countdown" key={count}>
          <div className="director-countdown__outer" />
          <div className="director-countdown__mid" />
          <span className="director-countdown__num">{count}</span>
          <div className="director-countdown__h" />
          <div className="director-countdown__v" />
        </div>
      )}

      {phase === "slate" && (
        <div className="director-slate">
          <div className="director-slate__clapper">
            <div className="director-slate__stripe" />
          </div>
          <div className="director-slate__body">
            <p><span>DIRECTOR</span> AYUSH SAINI</p>
            <p><span>PROD</span> CINEMATICGENIUS007</p>
            <p><span>SCENE</span> 001 &nbsp; <span>TAKE</span> 001</p>
            <p><span>DATE</span> {new Date().getFullYear()}</p>
          </div>
        </div>
      )}

      <p className="director-intro__skip">click to skip</p>
    </div>
  );
}

// ─── Film Strip Nav ────────────────────────────────────────────────────────────

const ACTS = [
  { id: "act-1",   num: "01", label: "PROLOGUE" },
  { id: "act-2",   num: "02", label: "THE WORK" },
  { id: "act-3",   num: "03", label: "SCENES"   },
  { id: "credits", num: "04", label: "CREDITS"  },
];

function FilmStripNav({ active }: { active: string }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav className="director-strip" aria-label="Film acts">
      <div className="director-strip__sprockets director-strip__sprockets--top" />
      <div className="director-strip__frames">
        {ACTS.map((act) => (
          <button
            key={act.id}
            className={`director-strip__frame${act.id === active ? " director-strip__frame--active" : ""}`}
            onClick={() => scrollTo(act.id)}
          >
            <span className="director-strip__num">{act.num}</span>
            <span className="director-strip__label">{act.label}</span>
          </button>
        ))}
      </div>
      <div className="director-strip__sprockets director-strip__sprockets--bot" />
    </nav>
  );
}

// ─── Scene Item (Experience) ───────────────────────────────────────────────────

function SceneItem({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) {
  const { ref, inView } = useInView(0.12);
  const mode: ModeId = "director";
  const loc = experience.period.includes("Present") ? "PRESENT DAY" : experience.period.split("–")[1]?.trim() ?? "";

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={`director-scene${inView ? " director-scene--visible" : ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <p className="director-scene__int">
        INT. {experience.company.toUpperCase()} — {loc}
      </p>
      <div className="director-scene__body">
        <div className="director-scene__meta">
          <h3>{experience.company}</h3>
          <span>{experience.role}</span>
          <span className="director-scene__period">{experience.period}</span>
        </div>
        <ul className="director-scene__bullets">
          {experience.bullets.map((b, i) => (
            <li key={i}>{resolve(b, mode)}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

// ─── Film Card (Project) ───────────────────────────────────────────────────────

function FilmCard({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  const mode: ModeId = "director";
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className={`director-film-card${inView ? " director-film-card--visible" : ""}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="director-film-card__top">
        <span className="director-film-card__scene">SCENE {project.number.replace("p.", "")}</span>
        <span className="director-film-card__link">↗</span>
      </div>
      <h3 className="director-film-card__title">{project.name}</h3>
      <p className="director-film-card__desc">{resolve(project.description, mode)}</p>
      <ul className="director-film-card__tech">
        {project.tech.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </a>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DirectorPage({ mode }: Props) {
  const { phase, count, skip } = useIntro();
  const ringRef = useFollowCursor();
  const active = useActiveAct();
  const { ref: projSectionRef, inView: projInView } = useInView(0.08);

  if (phase !== "content") {
    return <CountdownScreen count={count} phase={phase} onSkip={skip} />;
  }

  return (
    <>
      {/* Cursor ring */}
      <div className="director-ring" ref={ringRef} aria-hidden />

      <main className="director-page">
        {/* ── ACT I — PROLOGUE ───────────────────────────────────── */}
        <section id="act-1" className="director-act director-act--hero">
          <div className="director-act__label">
            <span className="director-act__num">ACT I</span>
            <span className="director-act__rule" />
            <span className="director-act__name">PROLOGUE</span>
          </div>

          <h1 className="director-hero__name">{hero.name}</h1>
          <p className="director-hero__role">{resolve(hero.role, mode)}</p>
          <p className="director-hero__statement">{resolve(hero.statement, mode)}</p>

          <div className="director-hero__about">
            <p>{resolve(about.p1, mode)}</p>
            <p>{resolve(about.p2, mode)}</p>
          </div>

          <div className="director-scroll-hint">scroll to advance ↓</div>
        </section>

        {/* ── ACT II — THE WORK ──────────────────────────────────── */}
        <section id="act-2" className="director-act">
          <div className="director-act__label">
            <span className="director-act__num">ACT II</span>
            <span className="director-act__rule" />
            <span className="director-act__name">THE WORK</span>
          </div>
          <div className="director-scenes">
            {experiences.map((exp, i) => (
              <SceneItem key={exp.id} experience={exp} index={i} />
            ))}
          </div>
        </section>

        {/* ── ACT III — SCENES ───────────────────────────────────── */}
        <section
          id="act-3"
          className="director-act"
          ref={projSectionRef as React.RefObject<HTMLElement>}
        >
          <div className="director-act__label">
            <span className="director-act__num">ACT III</span>
            <span className="director-act__rule" />
            <span className="director-act__name">SCENES</span>
          </div>
          <div className="director-film-cards">
            {projects.map((proj, i) => (
              <FilmCard
                key={proj.id}
                project={proj}
                index={i}
                inView={projInView}
              />
            ))}
          </div>

          {/* Education as a brief interlude */}
          <div className="director-interlude">
            {education.map((e) => (
              <div key={e.school} className="director-interlude__item">
                <span className="director-interlude__school">{e.school}</span>
                <span className="director-interlude__meta">{e.period} · {e.result}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── CREDITS ────────────────────────────────────────────── */}
        <section id="credits" className="director-act director-act--credits">
          <div className="director-act__label">
            <span className="director-act__num">CREDITS</span>
            <span className="director-act__rule" />
            <span className="director-act__name">{resolve(contact.h2, mode)}</span>
          </div>

          <p className="director-credits__body">{resolve(contact.body, mode)}</p>

          <div className="director-credits__links">
            <a href={contacts.emailHref} className="director-credits__link">
              <span className="director-credits__role">EMAIL</span>
              <span className="director-credits__name">{contacts.email}</span>
            </a>
            <a
              href={contacts.linkedin}
              target="_blank"
              rel="noreferrer"
              className="director-credits__link"
            >
              <span className="director-credits__role">LINKEDIN</span>
              <span className="director-credits__name">ayush-saini-858357200</span>
            </a>
            <a
              href={contacts.github}
              target="_blank"
              rel="noreferrer"
              className="director-credits__link"
            >
              <span className="director-credits__role">GITHUB</span>
              <span className="director-credits__name">CinematicGenius007</span>
            </a>
          </div>

          <p className="director-credits__fin">— FIN —</p>
        </section>
      </main>

      {/* Film strip nav — outside main so it overlays */}
      <FilmStripNav active={active} />
    </>
  );
}
