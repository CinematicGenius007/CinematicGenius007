import { caseStudies, eraLog, profileScope, programLenses, projects, type ProgramLens } from "./pmContent";
import { contacts } from "../content/contacts";
import { useState } from "react";
import { contact } from "../content/profile";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

export default function PmPage({ mode }: Props) {
  const [activeLens, setActiveLens] = useState<ProgramLens>("launch");
  const [eraIdx, setEraIdx] = useState(eraLog.length - 1);
  const era = eraLog[eraIdx];
  const program = programLenses.find((item) => item.id === activeLens) ?? programLenses[0];

  return (
    <main className="pm-page">
      <section className="pm-hero">
        <div className="pm-hero__left">
          <p className="pm-hero__tag">01 · Brief for a program hiring manager</p>
          <h1>
            Ayush Saini
            <br />
            <span className="pm-hero__dash">—</span>
            <br />
            engineer who can run
            <br />
            the program room.
          </h1>
          <p className="pm-hero__lede">
            SDE at Optmyzr (ad-tech). Architectural engineer at Zariya AI (early-stage). Two years of
            turning ambiguous work into shippable scope, dependency maps, risk calls, and production
            follow-through.
          </p>
        </div>
        <div className="pm-hero__right">
          <b>Scope</b>
          AI campaign creation, portfolios, alerts, audits, scripts.
          <br />
          <b>Decision radius</b>
          Architecture, infrastructure, product resets at Zariya AI.
          <br />
          <b>Strength</b>
          Bug duty across a wide product suite.
          <br />
          <b>Based in</b>
          India · remote-friendly.
          <br />
          <b>Available for</b>
          Engineering, TPM, or program-heavy product work.
        </div>
      </section>

      <section className="pm-control" aria-label="Program control room">
        <div className="pm-control__top">
          <div>
            <span className="pm-mono pm-eyebrow">02</span>
            <h2>Program control room</h2>
          </div>
          <div className="pm-control__tabs" aria-label="Program lens">
            {programLenses.map((item) => (
              <button
                key={item.id}
                className={`pm-control__tab${activeLens === item.id ? " pm-control__tab--active" : ""}`}
                onClick={() => setActiveLens(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pm-control__grid">
          <article className="pm-program-card">
            <p className="pm-program-card__metric">{program.metric}</p>
            <h3>{program.title}</h3>
            <p>{program.summary}</p>
            <div className="pm-program-card__decision">
              <span>Decision</span>
              <p>{program.decision}</p>
            </div>
            <div className="pm-program-card__risk">
              <span>Risk</span>
              <p>{program.risk}</p>
            </div>
          </article>

          <div className="pm-workstreams">
            {program.workstreams.map((lane, index) => (
              <article className="pm-workstream" key={lane.lane}>
                <div className="pm-workstream__head">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{lane.lane}</h3>
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

      <section className="pm-log" aria-label="Decision log">
        <div className="pm-log__top">
          <div>
            <span className="pm-mono pm-eyebrow">02b</span>
            <h2>Decision log</h2>
          </div>
          <p className="pm-log__hint">drag the scrubber — replay four years of judgment calls</p>
        </div>

        <div className="pm-log__scrubber">
          <input
            type="range"
            min={0}
            max={eraLog.length - 1}
            step={1}
            value={eraIdx}
            onChange={(e) => setEraIdx(Number(e.target.value))}
            aria-label="Career era"
            list="pm-era-ticks"
          />
          <div className="pm-log__years">
            {eraLog.map((item, i) => (
              <button
                key={item.id}
                className={i === eraIdx ? "pm-log__year pm-log__year--active" : "pm-log__year"}
                onClick={() => setEraIdx(i)}
                type="button"
              >
                {item.year}
              </button>
            ))}
          </div>
        </div>

        <div className="pm-log__card" key={era.id}>
          <div className="pm-log__meta">
            <h3>{era.title}</h3>
            <p>{era.status}</p>
            <div className="pm-log__active">
              {era.active.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
          </div>
          <ul className="pm-log__decisions">
            {era.decisions.map((d, i) => (
              <li key={i}>
                <span>CALL {String(i + 1).padStart(2, "0")}</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="pm-sec-head">
        <span className="pm-mono pm-eyebrow">03</span>
        <span className="pm-mono pm-mute">CASES</span>
      </div>
      <div className="pm-sec-rule" />
      <section className="pm-cases">
        {caseStudies.map((item) => (
          <article className="pm-case" key={item.company}>
            <div className="pm-case__meta">
              <b>{item.company}</b>
              {item.role}
              <br />
              {item.period}
              <br />
              {item.meta}
              {item.extra ? (
                <>
                  <br />
                  <br />
                  {item.extra}
                </>
              ) : null}
            </div>
            <div className="pm-case__body">
              <h3>{item.title}</h3>
              <p className="pm-case__sub">{item.subtitle}</p>
              <div className="pm-csr">
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

      <div className="pm-sec-head">
        <span className="pm-mono pm-eyebrow">04</span>
        <span className="pm-mono pm-mute">PROJECTS (PROBLEM → OUTCOME)</span>
      </div>
      <div className="pm-sec-rule" />
      <section className="pm-proj-grid">
        {projects.map((project) => (
          <a
            className="pm-proj"
            key={project.number}
            href={project.href}
            target="_blank"
            rel="noreferrer"
          >
            <p className="pm-proj__num">{project.number}</p>
            <h4>{project.title}</h4>
            <p className="pm-proj__body">{project.body}</p>
            <div className="pm-proj__footer">
              <p className="pm-proj__outcome">{project.outcome}</p>
              <span className="pm-proj__arrow">↗</span>
            </div>
          </a>
        ))}
      </section>

      <div className="pm-sec-head">
        <span className="pm-mono pm-eyebrow">05</span>
        <span className="pm-mono pm-mute">PROFILE</span>
      </div>
      <div className="pm-sec-rule" />
      <section className="pm-profile">
        <div>
          <h3>How I work</h3>
          <p>
            Backend-leaning full-stack. Prefers a boring, correct V1 over a clever V1. Writes specs
            back to stakeholders in their own words before I start — it&apos;s cheap and catches 60% of
            the bad ideas.
          </p>
          <h3 className="pm-profile__spaced">Outside of code</h3>
          <p>
            Debate society and theatre through college. Useful at Optmyzr — half my job is explaining a
            code-shaped problem to a non-code-shaped person.
          </p>
        </div>
        <div>
          <h3>Scope I&apos;ve carried</h3>
          <ul>
            {profileScope.map((item) => (
              <li key={item}>→ {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pm-contact">
        <div>
          <h2>Open to engineer, TPM, or program-heavy product roles.</h2>
          <p>{contact.body.pm ?? contact.body._default}</p>
        </div>
        <div className="pm-contact__links">
          <a href={contacts.emailHref}>EMAIL ↗</a>
          <a href={contacts.linkedin} target="_blank" rel="noreferrer">
            LINKEDIN ↗
          </a>
          <a href={contacts.github} target="_blank" rel="noreferrer">
            GITHUB ↗
          </a>
        </div>
      </section>

      <footer className="pm-foot">
        <span>AYUSH SAINI · CINEMATICGENIUS007.COM · © 2026</span>
        <span className="pm-pill">
          VIEWING AS <b>{mode.toUpperCase()}</b> · CHANGE
        </span>
      </footer>
    </main>
  );
}
