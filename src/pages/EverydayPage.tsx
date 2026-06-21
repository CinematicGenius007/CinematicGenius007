import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { contacts } from "../content/contacts";
import { about, contact, experiences, outside, projects, resolve } from "../content/profile";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

/* ── plain-language terms: tap any underlined phrase to translate it ── */

const PlainCtx = createContext<{ plain: boolean }>({ plain: false });

function Term({ jargon, plain }: { jargon: string; plain: string }) {
  const ctx = useContext(PlainCtx);
  const [local, setLocal] = useState<boolean | null>(null);

  // master toggle wins until the reader touches this term again
  useEffect(() => {
    setLocal(null);
  }, [ctx.plain]);

  const showPlain = local ?? ctx.plain;
  return (
    <button
      className={`evd-term${showPlain ? " evd-term--plain" : ""}`}
      onClick={() => setLocal(!showPlain)}
      aria-pressed={showPlain}
      title={showPlain ? "show the real words" : "explain this simply"}
    >
      {showPlain ? plain : jargon}
    </button>
  );
}

function Days({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

/* ── page ── */

export default function EverydayPage({ mode }: Props) {
  const [allPlain, setAllPlain] = useState(false);

  return (
    <main className="everyday-page">
      <section className="everyday-letter">
        <p className="everyday-letter__date">June 2026</p>
        <h1>Hi, I&apos;m Ayush.</h1>
        <p className="everyday-letter__lede">{resolve(about.p1, mode)}</p>
        <p>{resolve(about.p2, mode)}</p>
      </section>

      <PlainCtx.Provider value={{ plain: allPlain }}>
        <section className="everyday-section">
          <div className="everyday-section__head evd-days__head">
            <span>What my days look like</span>
            <button className="evd-master" onClick={() => setAllPlain((v) => !v)} aria-pressed={allPlain}>
              {allPlain ? "show the real words" : "explain everything simply"}
            </button>
          </div>
          <div className="evd-days">
            <p className="evd-days__hint">The underlined words are real job-speak. Tap any of them.</p>
            <Days>
              <p>
                Most days I&apos;m{" "}
                <Term
                  jargon="debugging production systems"
                  plain="finding out why the software broke for real customers"
                />
                . Software breaks in ways nobody predicted — my job is to{" "}
                <Term jargon="trace the root cause" plain="follow the clues back to the actual mistake" /> and fix it
                where it started, not where it shouted.
              </p>
              <p>
                At Optmyzr I built{" "}
                <Term
                  jargon="AI campaign creation"
                  plain="a tool where AI does the heavy lifting of setting up online ads"
                />{" "}
                and I keep{" "}
                <Term jargon="automation workflows" plain="the robots that do repetitive work so people don't have to" />{" "}
                healthy.
              </p>
              <p>
                At Zariya, I lead the technical side and look after the{" "}
                <Term
                  jargon="server infrastructure"
                  plain="the always-on computers that keep an app awake through the night"
                />{" "}
                and the{" "}
                <Term
                  jargon="software architecture"
                  plain="the floor plan of the code — where everything lives, and why"
                />
                .
              </p>
            </Days>
          </div>
        </section>
      </PlainCtx.Provider>

      <section className="everyday-section">
        <div className="everyday-section__head">
          <span>Work</span>
        </div>
        <div className="everyday-work">
          {experiences.map((experience) => (
            <article className="everyday-work__item" key={experience.id}>
              <div className="everyday-work__meta">
                <h2>{experience.company}</h2>
                <p>{experience.role}</p>
                <span>{experience.period}</span>
              </div>
              <p>{resolve(experience.bullets[0], mode)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="everyday-section">
        <div className="everyday-section__head">
          <span>Things I&apos;ve built — two of them are games you can play right now</span>
        </div>
        <div className="everyday-projects">
          {projects.map((project) => (
            <article className="everyday-project" key={project.id}>
              <a href={project.url} target="_blank" rel="noreferrer">
                {project.name} ↗
              </a>
              <p>{resolve(project.description, mode)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="everyday-section">
        <div className="everyday-section__head">
          <span>Outside code</span>
        </div>
        <p className="everyday-note">{resolve(outside, mode)}</p>
      </section>

      <section className="everyday-section everyday-section--contact">
        <div className="everyday-section__head">
          <span>Contact</span>
        </div>
        <h2>{resolve(contact.h2, mode)}</h2>
        <p>{resolve(contact.body, mode)}</p>
        <div className="everyday-contact__links">
          <a href={contacts.emailHref}>Email</a>
          <a href={contacts.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={contacts.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </section>
    </main>
  );
}
