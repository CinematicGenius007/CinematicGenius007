import { useEffect, useRef, useState } from "react";
import { animeArcs, animeBattles, battleRounds, coldOpen } from "./animeContent";
import { contacts } from "../content/contacts";
import { gsap, revealOnScroll } from "../engine/animation";
import { useMotionPreference } from "../engine/useMotionPreference";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

const OP_SEEN_KEY = "anime-op-seen";

function opSeen(): boolean {
  try {
    return sessionStorage.getItem(OP_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markOpSeen() {
  try {
    sessionStorage.setItem(OP_SEEN_KEY, "1");
  } catch {
    // best effort
  }
}

/* ── impact frame: full-screen invert flash + radial speed lines ── */

function ImpactFrame({ token }: { token: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (token === 0 || !ref.current) return;
    const el = ref.current;
    const tl = gsap.timeline();
    tl.set(el, { visibility: "visible", opacity: 1 });
    tl.to(el, { opacity: 0, duration: 0.32, ease: "power4.in", delay: 0.09 });
    tl.set(el, { visibility: "hidden" });
    return () => {
      tl.kill();
      gsap.set(el, { visibility: "hidden", opacity: 0 });
    };
  }, [token]);

  return <div className="anx-impact" ref={ref} aria-hidden="true" />;
}

/* ── cold open: the skippable OP sequence ── */

function ColdOpen({ onDone, onImpact }: { onDone: () => void; onImpact: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  const impactRef = useRef(onImpact);
  impactRef.current = onImpact;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const beats = Array.from(root.querySelectorAll<HTMLElement>(".anx-op__beat"));
    const sfx = root.querySelector<HTMLElement>(".anx-op__sfx");
    const titleCard = root.querySelector<HTMLElement>(".anx-op__title");
    const titleBits = root.querySelectorAll<HTMLElement>(".anx-op__title > *");

    const tl = gsap.timeline({
      onComplete: () => {
        markOpSeen();
        doneRef.current();
      },
    });

    gsap.set(beats, { autoAlpha: 0, scale: 1.12, rotate: -1.5 });
    gsap.set(sfx, { autoAlpha: 0, scale: 2.4 });
    gsap.set(titleCard, { autoAlpha: 0 });
    gsap.set(titleBits, { autoAlpha: 0, y: 30 });

    beats.forEach((beat, i) => {
      tl.to(beat, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.28, ease: "power4.out" }, i === 0 ? 0.25 : "+=0.7");
    });
    tl.to(sfx, { autoAlpha: 1, scale: 1, duration: 0.16, ease: "power4.in" }, "+=0.55");
    tl.add(() => impactRef.current());
    tl.to(beats, { autoAlpha: 0, duration: 0.18 }, "+=0.5");
    tl.to(sfx, { autoAlpha: 0, duration: 0.18 }, "<");
    tl.to(titleCard, { autoAlpha: 1, duration: 0.01 });
    tl.to(titleBits, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.12, ease: "power3.out" });
    tl.to({}, { duration: 1.5 });
    tl.to(root, { autoAlpha: 0, duration: 0.4 });

    return () => {
      tl.kill();
    };
  }, []);

  const skip = () => {
    markOpSeen();
    doneRef.current();
  };

  return (
    <div
      className="anx-op"
      ref={rootRef}
      onClick={skip}
      role="presentation"
    >
      <div className="anx-op__panels">
        {coldOpen.beats.map((beat) => (
          <div className="anx-op__beat" key={beat.kicker}>
            <span>{beat.kicker}</span>
            <p>{beat.line}</p>
            {beat.sfx ? <em aria-hidden="true">{beat.sfx}</em> : null}
          </div>
        ))}
        <div className="anx-op__sfx" aria-hidden="true">
          {coldOpen.sfx}
        </div>
      </div>
      <div className="anx-op__title">
        <span className="anx-op__kana" aria-hidden="true">{coldOpen.kana}</span>
        <span className="anx-op__ep">{coldOpen.episode}</span>
        <h1>{coldOpen.title}</h1>
        <span className="anx-op__by">AYUSH SAINI — アユーシュ・サイニ</span>
      </div>
      <button className="anx-op__skip" onClick={skip}>
        skip OP ▸▸
      </button>
    </div>
  );
}

/* ── battle card: fight the problem, attack to advance rounds ── */

function BattleCard({
  battle,
  motion,
  onVictory,
}: {
  battle: (typeof animeBattles)[number];
  motion: string;
  onVictory: () => void;
}) {
  const rounds = battleRounds[battle.id];
  const [round, setRound] = useState(0);
  const current = rounds[round];
  const won = current.hp === 0;
  const showAll = motion === "none";
  const cardRef = useRef<HTMLDivElement>(null);

  const attack = () => {
    if (won) return;
    const next = round + 1;
    setRound(next);
    if (rounds[next].hp === 0) {
      onVictory();
    } else if (cardRef.current && motion === "full") {
      gsap.fromTo(cardRef.current, { x: -6 }, { x: 0, duration: 0.3, ease: "elastic.out(1, 0.3)" });
    }
  };

  if (showAll) {
    return (
      <article className="anx-battle">
        <header className="anx-battle__head">
          <span className="anx-battle__no">{battle.num}</span>
          <h4>
            {battle.title[0]} {battle.title[1]}
          </h4>
        </header>
        {rounds.map((r) => (
          <div className="anx-battle__round" key={r.label}>
            <p className="anx-battle__label">{r.label}</p>
            <p>{r.text}</p>
          </div>
        ))}
        <a className="anx-battle__link" href={battle.url} target="_blank" rel="noreferrer">
          {battle.link}
        </a>
      </article>
    );
  }

  return (
    <article className={`anx-battle${won ? " anx-battle--won" : ""}`} ref={cardRef as any}>
      <header className="anx-battle__head">
        <span className="anx-battle__no">{battle.num}</span>
        <h4>
          {battle.title[0]} {battle.title[1]}
        </h4>
      </header>

      <div className="anx-battle__hp" aria-label={`Problem HP ${current.hp} of 100`}>
        <span className="anx-battle__hp-tag">PROBLEM HP</span>
        <div className="anx-battle__hp-bar">
          <div className="anx-battle__hp-fill" style={{ width: `${current.hp}%` }} />
        </div>
      </div>

      <div className="anx-battle__round" key={round}>
        <p className="anx-battle__label">{current.label}</p>
        <p>{current.text}</p>
      </div>

      <footer className="anx-battle__foot">
        {won ? (
          <>
            <span className="anx-battle__stamp" aria-hidden="true">勝利</span>
            <a className="anx-battle__link" href={battle.url} target="_blank" rel="noreferrer">
              {battle.link}
            </a>
          </>
        ) : (
          <button className="anx-battle__attack" onClick={attack}>
            攻撃 — attack ▸
          </button>
        )}
      </footer>
    </article>
  );
}

/* ── page ── */

export default function AnimePage({ mode: _mode }: Props) {
  const { level: motion } = useMotionPreference();
  const [opDone, setOpDone] = useState(() => motion !== "full" || opSeen());
  const [impactToken, setImpactToken] = useState(0);
  const pageRef = useRef<HTMLElement>(null);

  const impact = () => setImpactToken((t) => t + 1);

  useEffect(() => {
    if (motion !== "full") setOpDone(true);
  }, [motion]);

  useEffect(() => {
    if (!pageRef.current || !opDone) return;
    return revealOnScroll(pageRef.current, ".anime-frame > *:not(.anime-label)", motion);
  }, [motion, opDone]);

  return (
    <main className="anime-page" ref={pageRef}>
      {!opDone ? <ColdOpen onDone={() => setOpDone(true)} onImpact={impact} /> : null}
      <ImpactFrame token={impactToken} />

      <section className="anime-frame anime-cover">
        <div className="anime-label">
          <span className="anime-kana anime-kana--red">プロローグ</span>
          <span className="anime-kana">アユーシュ</span>
        </div>

        <div className="anime-panel anime-panel--splash">
          <div className="anime-panel__sub">Episode 01 · Prologue</div>
          <div className="anime-panel__chapter">
            第<span>壱</span>章
          </div>
          <div className="anime-panel__speed" aria-hidden="true" />
          <div className="anime-panel__sfx">bugged.</div>
        </div>

        <div className="anime-panel anime-panel--name">
          <div>
            <div className="anime-tag">Main character · Software engineer</div>
            <div className="anime-line" />
            <h1>
              AYUSH
              <br />
              S<em>A</em>INI
            </h1>
          </div>
          <div>
            <div className="anime-line" />
            <p className="anime-monologue">
              Two years ago he joined an ad-tech company as an intern. He stayed. He built AI campaign creation,
              portfolio alerts, scripts support, dashboards, and enough bugfixes to recognize trouble by silhouette.
            </p>
          </div>
        </div>
      </section>

      <section className="anime-frame anime-strip anime-strip--arcs">
        <div className="anime-label">
          <span className="anime-kana">章</span>
          <span className="anime-kana anime-kana--red">三編</span>
        </div>

        {animeArcs.map((arc) => (
          <article className={`anime-arc${arc.current ? " anime-arc--current" : ""}`} key={arc.id}>
            <span className="anime-arc__yr">{arc.yr}</span>
            <div className="anime-arc__title">
              <div className="anime-arc__num">{arc.num}</div>
              <h3>{arc.title}</h3>
            </div>
            <p>{arc.body}</p>
          </article>
        ))}
      </section>

      <section className="anime-frame anime-strip anime-strip--battles">
        <div className="anime-label">
          <span className="anime-kana anime-kana--red">戦</span>
          <span className="anime-kana">プロジェクト</span>
        </div>

        <div className="anx-battles">
          {animeBattles.map((battle) => (
            <BattleCard key={battle.id} battle={battle} motion={motion} onVictory={impact} />
          ))}
        </div>
      </section>

      <section className="anime-frame anime-strip anime-strip--dialogue">
        <div className="anime-label">
          <span className="anime-kana">続く</span>
          <span className="anime-kana anime-kana--red">連絡</span>
        </div>

        <div className="anime-panel anime-panel--speech">
          <span className="anime-speech__who">Ayush · Final panel</span>
          <q>If you're hiring, building, or stuck on something weird — the fastest way to me is one panel over.</q>
        </div>

        <div className="anime-panel anime-panel--cta">
          <div className="anime-cta__label">EPISODE 02: YOUR TEAM? →</div>
          <ul>
            <li>
              <a href={contacts.emailHref}>Email <span>↗</span></a>
            </li>
            <li>
              <a href={contacts.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <span>↗</span>
              </a>
            </li>
            <li>
              <a href={contacts.github} target="_blank" rel="noreferrer">
                GitHub <span>↗</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
