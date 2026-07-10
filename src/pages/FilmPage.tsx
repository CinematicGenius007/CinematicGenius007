import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, revealOnScroll } from "../engine/animation";
import { useMotionPreference } from "../engine/useMotionPreference";
import {
  RESUME_PATH,
  acts,
  boxOffice,
  credits,
  deleted,
  endCredits,
  nowShowing,
  postCredits,
  stunt,
  stuntRank,
  titleCard,
} from "./filmContent";

const LEADER_KEY = "cg-leader-seen";
const BEST_KEY = "cg-lightsout-best";
const RUNTIME_SECONDS = 2 * 3600 + 7 * 60; // 02:07:00:00 — the runtime is the handle.
const FPS = 24;

/* ---------- countdown leader: 3 · 2 · 1, once per session ---------- */

function CountdownLeader({ onDone }: { onDone: () => void }) {
  const [beat, setBeat] = useState(3);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setBeat(2), 700),
      window.setTimeout(() => setBeat(1), 1400),
      window.setTimeout(onDone, 2200),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [onDone]);

  return (
    <div className="cg-leader" onClick={onDone} role="presentation">
      <div className="cg-leader__reticle" aria-hidden="true">
        <i className="cg-leader__cross cg-leader__cross--v" />
        <i className="cg-leader__cross cg-leader__cross--h" />
        <span key={beat} className="cg-leader__num">
          {beat}
        </span>
        <span key={`sweep-${beat}`} className="cg-leader__sweep" />
      </div>
      <p className="cg-leader__label">PICTURE START</p>
      <p className="cg-leader__skip">tap to skip leader</p>
    </div>
  );
}

/* ---------- timecode ---------- */

function toTimecode(progress: number): string {
  const total = progress * RUNTIME_SECONDS;
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = Math.floor(total % 60);
  const f = Math.floor((total * FPS) % FPS);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
}

/* ---------- slate: the clapperboard section marker ---------- */

function Slate({ label }: { label: string }) {
  return (
    <div className="cg-slate" data-reveal>
      <i className="cg-slate__stripes" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

/* ---------- the stunt scene: LIGHTS OUT ---------- */

type Phase = "idle" | "seq" | "hold" | "go" | "result" | "jump";

function readBest(): number | null {
  try {
    const n = Number(window.localStorage.getItem(BEST_KEY));
    return Number.isFinite(n) && n > 0 ? n : null;
  } catch {
    return null;
  }
}

function writeBest(ms: number) {
  try {
    window.localStorage.setItem(BEST_KEY, String(Math.round(ms)));
  } catch {
    // Private mode — the take still counts, it just isn't archived.
  }
}

function fmt(ms: number): string {
  return `${(ms / 1000).toFixed(3)}s`;
}

function StuntScene() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [lit, setLit] = useState(0);
  const [ms, setMs] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(readBest);
  const [take, setTake] = useState(0);

  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const timers = useRef<number[]>([]);
  const goAt = useRef(0);

  function clearTimers() {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }

  useEffect(() => clearTimers, []);

  function start() {
    clearTimers();
    setMs(null);
    setLit(0);
    setTake((t) => t + 1);
    setPhase("seq");
    for (let i = 1; i <= 5; i++) {
      timers.current.push(window.setTimeout(() => setLit(i), 640 * i));
    }
    timers.current.push(
      window.setTimeout(() => {
        setPhase("hold");
        const hold = 800 + Math.random() * 2200;
        timers.current.push(
          window.setTimeout(() => {
            setLit(0);
            goAt.current = performance.now();
            setPhase("go");
          }, hold),
        );
      }, 640 * 5),
    );
  }

  function react() {
    const p = phaseRef.current;
    if (p === "idle" || p === "result" || p === "jump") {
      start();
      return;
    }
    if (p === "seq" || p === "hold") {
      clearTimers();
      setPhase("jump");
      return;
    }
    if (p === "go") {
      const t = performance.now() - goAt.current;
      setMs(t);
      setPhase("result");
      setBest((prev) => {
        if (prev === null || t < prev) {
          writeBest(t);
          return t;
        }
        return prev;
      });
    }
  }

  const active = phase === "seq" || phase === "hold" || phase === "go";
  const barMax = 500;
  const width = (v: number) => `${Math.min(100, (v / barMax) * 100)}%`;

  return (
    <div className={`cg-stunt cg-stunt--${phase}`}>
      <div className="cg-stunt__board" aria-hidden="true">
        <span>SCENE 06</span>
        <span>TAKE {String(Math.max(take, 1)).padStart(2, "0")}</span>
        <span>CAM A · 24 FPS</span>
      </div>
      <button
        type="button"
        className="cg-stunt__stage"
        onPointerDown={(e) => {
          // pointerdown beats click by the exact milliseconds being measured
          if (e.pointerType) react();
        }}
        onKeyDown={(e) => {
          if (e.repeat) return;
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            react();
          }
        }}
        onClick={(e) => e.preventDefault()}
        aria-label={
          active
            ? "Lights are running — react the instant they go out"
            : phase === "idle"
              ? stunt.armLabel
              : stunt.retryLabel
        }
      >
        <span className="cg-stunt__gantry" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className={`cg-stunt__lamp${lit >= i ? " is-lit" : ""}`} />
          ))}
        </span>
        <span className="cg-stunt__readout" aria-live="polite">
          {phase === "idle" && <b className="cg-stunt__cta">{stunt.armLabel}</b>}
          {(phase === "seq" || phase === "hold") && <b className="cg-stunt__wait">ROLLING…</b>}
          {phase === "go" && <b className="cg-stunt__go">ACTION</b>}
          {phase === "jump" && (
            <>
              <b className="cg-stunt__jump">{stunt.jumpTitle}</b>
              <i>{stunt.jumpNote}</i>
              <em>{stunt.retryLabel}</em>
            </>
          )}
          {phase === "result" && ms !== null && (
            <>
              <b className="cg-stunt__time">{fmt(ms)}</b>
              <i>{stuntRank(ms)}</i>
              <em>{stunt.retryLabel}</em>
            </>
          )}
        </span>
      </button>

      <div className="cg-stunt__bench">
        {ms !== null && (
          <div className="cg-stunt__row cg-stunt__row--you">
            <span>THIS TAKE</span>
            <i style={{ width: width(ms) }} />
            <b>{fmt(ms)}</b>
          </div>
        )}
        {best !== null && (
          <div className="cg-stunt__row cg-stunt__row--best">
            <span>YOUR BEST</span>
            <i style={{ width: width(best) }} />
            <b>{fmt(best)}</b>
          </div>
        )}
        {stunt.benchmarks.map((b) => (
          <div className="cg-stunt__row" key={b.label}>
            <span>{b.label}</span>
            <i style={{ width: width(b.ms) }} />
            <b>{fmt(b.ms)}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function FilmPage() {
  const { level: motion } = useMotionPreference();
  const pageRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [leader, setLeader] = useState(
    () => motion !== "none" && !sessionStorage.getItem(LEADER_KEY),
  );

  function endLeader() {
    sessionStorage.setItem(LEADER_KEY, "1");
    setLeader(false);
  }

  // Scroll choreography. Full motion gets the projector; calm gets reveals;
  // none gets a perfectly readable print of the film.
  useEffect(() => {
    const root = pageRef.current;
    if (!root || leader) return;
    const cleanupReveal = revealOnScroll(root, "[data-reveal]", motion);
    if (motion !== "full") return cleanupReveal;

    const ctx = gsap.context(() => {
      // Timecode advances with the scroll — the page has a runtime.
      const tc = root.querySelector<HTMLElement>("[data-timecode]");
      const reelFill = root.querySelector<HTMLElement>(".cg-hud__fill");
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (tc) tc.textContent = toTimecode(self.progress);
          if (reelFill) gsap.set(reelFill, { scaleX: self.progress });
        },
      });

      // Letterbox bars part as the film starts.
      const bars = root.querySelectorAll<HTMLElement>(".cg-title__bar");
      if (bars.length && heroRef.current) {
        gsap.to(bars, {
          scaleY: 0.22,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom 40%",
            scrub: 0.5,
          },
        });
      }

      // Frames project forward out of the dark — the spatial dolly.
      root.querySelectorAll<HTMLElement>("[data-frame]").forEach((frame, i) => {
        gsap.fromTo(
          frame,
          { z: -320, rotationY: i % 2 ? -7 : 7, autoAlpha: 0.12 },
          {
            z: 0,
            rotationY: 0,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top 96%",
              end: "top 40%",
              scrub: 0.6,
            },
          },
        );
      });

      // Box-office numbers count in.
      root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const decimals = Number(el.dataset.decimals ?? 0);
        if (!Number.isFinite(target)) return;
        const state = { v: 0 };
        el.textContent = (0).toFixed(decimals);
        gsap.to(state, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = state.v.toFixed(decimals);
          },
        });
      });
    }, root);

    return () => {
      ctx.revert();
      cleanupReveal();
    };
  }, [motion, leader]);

  // Title tilt — the marquee reacts like a camera on a shoulder rig.
  useEffect(() => {
    if (motion !== "full" || leader) return;
    const stage = heroRef.current;
    if (!stage) return;
    const marquee = stage.querySelector<HTMLElement>(".cg-title__marquee");
    if (!marquee) return;
    gsap.set(marquee, { transformPerspective: 900 });
    const toY = gsap.quickTo(marquee, "rotationY", { duration: 0.8, ease: "power3.out" });
    const toX = gsap.quickTo(marquee, "rotationX", { duration: 0.8, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      toY((((e.clientX - r.left) / r.width) * 2 - 1) * 5);
      toX((((e.clientY - r.top) / r.height) * 2 - 1) * -4);
    };
    const onLeave = () => {
      toY(0);
      toX(0);
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      gsap.set(marquee, { rotationX: 0, rotationY: 0 });
    };
  }, [motion, leader]);

  return (
    <main className="cg" ref={pageRef} data-leader={leader || undefined}>
      {leader ? <CountdownLeader onDone={endLeader} /> : null}

      {/* fixed chrome: sprockets + timecode */}
      <i className="cg-sprockets cg-sprockets--left" aria-hidden="true" />
      <i className="cg-sprockets cg-sprockets--right" aria-hidden="true" />
      <div className="cg-hud" aria-hidden="true">
        <span className="cg-hud__brand">CG·007</span>
        <span className="cg-hud__tc">
          TC <b data-timecode>00:00:00:00</b>
        </span>
        <span className="cg-hud__reel">
          <span className="cg-hud__track">
            <span className="cg-hud__fill" />
          </span>
          REEL 1/1
        </span>
      </div>

      {/* ── title card ─────────────────────────────────────────── */}
      <section className="cg-title" ref={heroRef} aria-label="Title card">
        <i className="cg-title__bar cg-title__bar--top" aria-hidden="true" />
        <i className="cg-title__bar cg-title__bar--bottom" aria-hidden="true" />
        <p className="cg-title__presents">{titleCard.presents}</p>
        <div className="cg-title__marquee">
          <span className="cg-title__line">{titleCard.line1}</span>
          <span className="cg-title__line">{titleCard.line2}</span>
          <span className="cg-title__line cg-title__line--gold">{titleCard.line3}</span>
        </div>
        <p className="cg-title__tagline">{titleCard.tagline}</p>
        <p className="cg-title__starring">{titleCard.starring}</p>
        <div className="cg-title__rating" role="note">
          <b>{titleCard.rating.badge}</b>
          <span>{titleCard.rating.text}</span>
        </div>
        <p className="cg-title__cue" aria-hidden="true">
          {titleCard.cue}
        </p>
      </section>

      {/* ── opening credits ────────────────────────────────────── */}
      <section className="cg-credits" aria-label="Opening credits">
        <Slate label={credits.slate} />
        <div className="cg-credits__list">
          {credits.rows.map((row) => (
            <div className="cg-credits__row" key={row.role} data-reveal>
              <span className="cg-credits__role">{row.role}</span>
              <span className="cg-credits__name">{row.name}</span>
              <span className="cg-credits__note">{row.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── box office ─────────────────────────────────────────── */}
      <section className="cg-box" aria-label="The numbers">
        <Slate label={boxOffice.slate} />
        <h2 className="cg-h" data-reveal>
          {boxOffice.headline}
        </h2>
        <div className="cg-box__grid">
          {boxOffice.stats.map((s) => (
            <div className="cg-box__stat" key={s.caption} data-reveal>
              <span className="cg-box__figure">
                {s.count !== undefined ? (
                  <>
                    <b data-count={s.count} data-decimals={s.decimals ?? 0}>
                      {s.count.toFixed(s.decimals ?? 0)}
                    </b>
                    {s.suffix ?? ""}
                  </>
                ) : (
                  <b>{s.figure}</b>
                )}
              </span>
              <span className="cg-box__caption">{s.caption}</span>
              <span className="cg-box__detail">{s.detail}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── three acts ─────────────────────────────────────────── */}
      <section className="cg-acts" aria-label="The picture in three acts">
        <Slate label={acts.slate} />
        <h2 className="cg-h" data-reveal>
          {acts.headline}
        </h2>
        {acts.items.map((act, i) => (
          <article className={`cg-frame cg-frame--${i % 2 ? "even" : "odd"}`} key={act.id} data-frame>
            <i className="cg-frame__corner cg-frame__corner--tl" aria-hidden="true" />
            <i className="cg-frame__corner cg-frame__corner--br" aria-hidden="true" />
            <span className="cg-frame__genre">{act.genre}</span>
            <header className="cg-frame__slateline">
              <span>{act.scene}</span>
              <span>{act.years}</span>
            </header>
            <p className="cg-frame__location">{act.location}</p>
            <h3 className="cg-frame__title">{act.title}</h3>
            <p className="cg-frame__logline">{act.logline}</p>
            <ul className="cg-frame__shots">
              {act.shots.map((shot, si) => (
                <li key={si}>
                  <span aria-hidden="true">SH.{String(si + 1).padStart(2, "0")}</span>
                  {shot}
                </li>
              ))}
            </ul>
            <p className="cg-frame__subtitle">{act.subtitle}</p>
          </article>
        ))}
      </section>

      {/* ── deleted scenes ─────────────────────────────────────── */}
      <section className="cg-deleted" aria-label="Deleted scenes">
        <Slate label={deleted.slate} />
        <h2 className="cg-h" data-reveal>
          {deleted.headline}
        </h2>
        <div className="cg-deleted__strips">
          {deleted.items.map((d) => (
            <div className="cg-deleted__strip" key={d.code} data-reveal>
              <span>{d.code}</span>
              <p>{d.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── now showing: posters ───────────────────────────────── */}
      <section className="cg-showing" aria-label="Side projects">
        <Slate label={nowShowing.slate} />
        <h2 className="cg-h" data-reveal>
          {nowShowing.headline}
        </h2>
        <div className="cg-showing__row">
          {nowShowing.posters.map((p) => (
            <a
              className={`cg-poster cg-poster--${p.flavor}`}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              key={p.id}
              data-reveal
            >
              <span className="cg-poster__billing">{p.billing}</span>
              <span className="cg-poster__title">{p.title}</span>
              <span className="cg-poster__hook">{p.hook}</span>
              <span className="cg-poster__credits">
                {p.microcredits.map((c) => (
                  <i key={c}>{c}</i>
                ))}
              </span>
              <span className="cg-poster__cta">{p.cta} ↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── the stunt scene ────────────────────────────────────── */}
      <section className="cg-stuntscene" aria-label="Lights out reaction game">
        <Slate label={stunt.slate} />
        <h2 className="cg-h" data-reveal>
          {stunt.headline}
        </h2>
        <p className="cg-stuntscene__brief" data-reveal>
          {stunt.brief}
        </p>
        <StuntScene />
      </section>

      {/* ── end credits ────────────────────────────────────────── */}
      <section className="cg-end" aria-label="End credits">
        <Slate label={endCredits.slate} />
        <h2 className="cg-h" data-reveal>
          {endCredits.headline}
        </h2>
        <div className="cg-end__screen" data-reveal>
          <div className="cg-end__roll">
            <div className="cg-end__inner">
              {endCredits.crew.map((c) => (
                <p className="cg-end__credit" key={c.role}>
                  <span>{c.role}</span>
                  <b>{c.name}</b>
                </p>
              ))}
              <p className="cg-end__thankslabel">{endCredits.thanksLabel}</p>
              {endCredits.thanks.map((t) => (
                <p className="cg-end__thanks" key={t}>
                  {t}
                </p>
              ))}
              <p className="cg-end__disclaimer">{endCredits.disclaimer}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── post-credits scene ─────────────────────────────────── */}
      <section className="cg-post" aria-label="Contact">
        <p className="cg-post__kicker" data-reveal>
          {postCredits.kicker}
        </p>
        <h2 className="cg-post__line" data-reveal>
          {postCredits.line}
        </h2>
        <p className="cg-post__pitch" data-reveal>
          {postCredits.pitch}
        </p>
        <div className="cg-post__actions" data-reveal>
          <a className="cg-post__resume" href={RESUME_PATH} download>
            <b>{postCredits.resumeCta}</b>
            <span>{postCredits.resumeNote}</span>
          </a>
          <div className="cg-post__links">
            {postCredits.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
        <p className="cg-post__copyright" data-reveal>
          {postCredits.copyright}
        </p>
      </section>
    </main>
  );
}
