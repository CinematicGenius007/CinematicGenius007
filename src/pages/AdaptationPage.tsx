import { useEffect, useRef, useState } from "react";
import { contacts } from "../content/contacts";
import { revealOnScroll } from "../engine/animation";
import { useMotionPreference } from "../engine/useMotionPreference";
import type { ModeId } from "../modes/types";
import { cast, episodes, nextEpisode, opCard, sideStories } from "./adaptationContent";

type Props = { mode: ModeId };

const OP_KEY = "adp-op-seen";

/* ---------- cold open: title card, once per session ---------- */

function ColdOpen({ onDone }: { onDone: () => void }) {
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setBeat(1), 700),
      window.setTimeout(() => setBeat(2), 1500),
      window.setTimeout(onDone, 2600),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [onDone]);

  return (
    <div className="adp-op" onClick={onDone} role="presentation">
      <p className={`adp-op__kicker${beat >= 0 ? " is-on" : ""}`}>{opCard.kicker}</p>
      <div className={`adp-op__title${beat >= 1 ? " is-on" : ""}`}>
        <span className="adp-op__episode">{opCard.episode}</span>
        <h1>{opCard.title}</h1>
        <span className="adp-op__kana">{opCard.kana}</span>
      </div>
      <p className={`adp-op__sub${beat >= 2 ? " is-on" : ""}`}>{opCard.sub}</p>
      <p className="adp-op__skip">skip OP ▸▸</p>
    </div>
  );
}

/* ---------- the cut switch: broadcast vs commentary ---------- */

function CutSwitch({
  commentary,
  onChange,
}: {
  commentary: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="adp-cut" role="group" aria-label="Choose the cut">
      <span className="adp-cut__label">CUT:</span>
      <button
        className={`adp-cut__opt${!commentary ? " is-active" : ""}`}
        onClick={() => onChange(false)}
        aria-pressed={!commentary}
      >
        broadcast
      </button>
      <button
        className={`adp-cut__opt adp-cut__opt--commentary${commentary ? " is-active" : ""}`}
        onClick={() => onChange(true)}
        aria-pressed={commentary}
      >
        director's commentary
      </button>
    </div>
  );
}

/* ---------- page ---------- */

export default function AdaptationPage({ mode: _mode }: Props) {
  const { level: motion } = useMotionPreference();
  const pageRef = useRef<HTMLElement>(null);
  const [op, setOp] = useState(() => motion !== "none" && !sessionStorage.getItem(OP_KEY));
  const [commentary, setCommentary] = useState(false);

  function endOp() {
    sessionStorage.setItem(OP_KEY, "1");
    setOp(false);
  }

  useEffect(() => {
    if (!pageRef.current || op) return;
    return revealOnScroll(pageRef.current, "[data-reveal]", motion);
  }, [motion, op]);

  return (
    <main
      className={`adp${commentary ? " adp--commentary" : ""}`}
      ref={pageRef}
      data-op={op || undefined}
    >
      {op ? <ColdOpen onDone={endOp} /> : null}

      {/* ── title panel ─────────────────────────────────────────── */}
      <header className="adp-hero">
        <div className="adp-hero__panel">
          <p className="adp-kicker">{opCard.kicker} — view 05/06</p>
          <p className="adp-hero__episode">{opCard.episode}</p>
          <h1 className="adp-hero__title">
            AYUSH <em>SAINI</em>
          </h1>
          <p className="adp-hero__kana" aria-hidden="true">
            アユーシュ・サイニ
          </p>
          <p className="adp-hero__log">
            He joined an ad-tech company as an intern. He stayed. He built AI campaign creation,
            portfolio alerts, dashboards, and enough bugfixes to recognize trouble by silhouette.
            Then he co-founded the sequel.
          </p>
          <CutSwitch commentary={commentary} onChange={setCommentary} />
          <p className="adp-hero__hint" aria-live="polite">
            {commentary
              ? "commentary track on — every episode redlined back to what actually happened."
              : "the dramatized cut. flip the switch for what actually happened."}
          </p>
        </div>
      </header>

      {/* ── episodes ────────────────────────────────────────────── */}
      <section className="adp-eps" aria-label="Episodes">
        {episodes.map((e) => (
          <article className="adp-ep" key={e.id} data-reveal>
            <header className="adp-ep__head">
              <span className="adp-ep__num" aria-hidden="true">
                {e.num}
              </span>
              <div>
                <p className="adp-ep__meta">
                  {e.ep} · {e.yr}
                </p>
                <h2>{e.title}</h2>
              </div>
              {e.sfx ? (
                <span className="adp-ep__sfx" aria-hidden="true">
                  {e.sfx}
                </span>
              ) : null}
            </header>
            <div className="adp-ep__broadcast">
              {e.broadcast.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <aside className="adp-ep__commentary" aria-label="Director's commentary" hidden={!commentary}>
              <p className="adp-ep__stamp" aria-hidden="true">
                ACTUALLY —
              </p>
              {e.commentary.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </aside>
          </article>
        ))}
      </section>

      {/* ── side stories (projects) ─────────────────────────────── */}
      <section className="adp-ovas" aria-label="Side stories">
        <header className="adp-section__head" data-reveal>
          <h2>
            Side stories. <span aria-hidden="true">番外編</span>
          </h2>
          <p>the OVAs — projects that aired between seasons. all still running.</p>
        </header>
        <div className="adp-ovas__grid">
          {sideStories.map((s) => (
            <a
              className={`adp-ova${s.featured ? " adp-ova--featured" : ""}`}
              href={s.url}
              key={s.id}
              target="_blank"
              rel="noreferrer"
              data-reveal
            >
              <span className="adp-ova__num" aria-hidden="true">
                {s.num}
              </span>
              <h3>
                {s.title.map((t, i) => (
                  <span key={i}>{t}</span>
                ))}
              </h3>
              <p>{commentary ? s.commentary : s.broadcast}</p>
              <span className="adp-ova__link">{s.link}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── cast ────────────────────────────────────────────────── */}
      <section className="adp-cast" aria-label="Cast">
        <header className="adp-section__head" data-reveal>
          <h2>
            Cast. <span aria-hidden="true">配役</span>
          </h2>
          <p>{commentary ? "fine: it's a skills list." : "in order of appearance."}</p>
        </header>
        <ul className="adp-cast__list" data-reveal>
          {cast.map((c) => (
            <li key={c.role}>
              <span className="adp-cast__role">{c.role}</span>
              <span className="adp-cast__actor">{c.actor}</span>
              <span className="adp-cast__note">{c.note}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── next episode / contact ──────────────────────────────── */}
      <section className="adp-next" data-reveal>
        <p className="adp-next__kicker">{nextEpisode.kicker}</p>
        <h2>
          {nextEpisode.title} <span aria-hidden="true">{nextEpisode.teaser}</span>
        </h2>
        <p className="adp-next__body">{nextEpisode.body}</p>
        <div className="adp-next__links">
          <a href={contacts.emailHref}>EMAIL ↗</a>
          <a href={contacts.linkedin} target="_blank" rel="noreferrer">
            LINKEDIN ↗
          </a>
          <a href={contacts.github} target="_blank" rel="noreferrer">
            GITHUB ↗
          </a>
          <a href="/?as=pdf">RESUME.PDF ↗</a>
        </div>
      </section>
    </main>
  );
}
