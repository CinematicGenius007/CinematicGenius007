import { useState } from "react";
import { about, contact, experiences, hero, projects, resolve } from "../content/profile";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };
type DesignLens = "structure" | "interaction" | "systems";

const designLenses: {
  id: DesignLens;
  label: string;
  title: string;
  body: string;
  notes: string[];
}[] = [
  {
    id: "structure",
    label: "Structure",
    title: "Make the shape honest first.",
    body:
      "The designer version of this portfolio is not about decoration. It is about exposing hierarchy: what was owned, what was maintained, what was architectural, and what was learned.",
    notes: ["Clear hierarchy", "Visible constraints", "No vague ownership"],
  },
  {
    id: "interaction",
    label: "Interaction",
    title: "A surface should answer when touched.",
    body:
      "The best references are memorable because their UI reacts with intent. This mode treats projects as specimens: hover, scan, compare, and decide what each one proves.",
    notes: ["Inspectable projects", "Motion with purpose", "Readable states"],
  },
  {
    id: "systems",
    label: "Systems",
    title: "Taste survives contact with production.",
    body:
      "Good craft is not just visual polish. It is the ability to keep a system coherent across AI campaign creation, scripts, alerts, infrastructure, and production bugs.",
    notes: ["Product breadth", "Debugging signal", "Architecture + infra"],
  },
];

const specimenDetails: Record<string, Record<DesignLens, string>> = {
  interviews: {
    structure: "Conversation, scoring, and reporting are separated so feedback feels specific instead of generic.",
    interaction: "The product moment is the follow-up: it should feel like the interviewer heard the previous answer.",
    systems: "A Zariya AI product surface shaped by architecture, prompt behavior, and production reliability.",
  },
  sudoku: {
    structure: "Two algorithms share one board so the comparison is immediate, not explained after the fact.",
    interaction: "The animation does the teaching: guesses, backtracks, and constraints become visible state.",
    systems: "A compact proof that logic, visualization, and pacing can make an abstract system legible.",
  },
  ttt: {
    structure: "One rule change creates the whole product: every move routes the opponent into a sub-board.",
    interaction: "The board teaches by constraint. You understand the strategy because the UI forces it.",
    systems: "Small surface, high leverage: state, rules, turn flow, and affordances have to stay aligned.",
  },
};

export default function DesignerPage({ mode }: Props) {
  const [activeLens, setActiveLens] = useState<DesignLens>("structure");
  const lens = designLenses.find((item) => item.id === activeLens) ?? designLenses[0];

  return (
    <main className="designer-page">
      <section className="designer-hero">
        <div className="designer-hero__marker">
          <span>01 / INTRODUCTION</span>
          <span>AYUSH SAINI · SINCE 2002</span>
        </div>

        <div className="designer-hero__plate-wrap">
          <div className="designer-hero__plate designer-hero__plate--red" aria-hidden="true" />
          <div className="designer-hero__plate designer-hero__plate--navy" aria-hidden="true" />
          <div className="designer-hero__plate designer-hero__plate--yellow" aria-hidden="true" />
          <h1 className="designer-hero__name">
            Ayush
            <br />
            S<i>a</i>ini.
          </h1>
          <p className="designer-hero__manifesto">{resolve(hero.statement, mode)}</p>
        </div>
      </section>

      <div className="designer-rule" />

      <section className="designer-studio" aria-label="Designer studio board">
        <div className="designer-studio__panel">
          <div className="designer-studio__toolbar">
            {designLenses.map((item) => (
              <button
                key={item.id}
                className={`designer-studio__tab${activeLens === item.id ? " designer-studio__tab--active" : ""}`}
                onClick={() => setActiveLens(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="designer-studio__copy">
            <span>02 / ACTIVE LENS</span>
            <h2>{lens.title}</h2>
            <p>{lens.body}</p>
          </div>
          <ul className="designer-studio__notes">
            {lens.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>

        <div className={`designer-board designer-board--${activeLens}`}>
          <div className="designer-board__ruler designer-board__ruler--top" aria-hidden="true" />
          <div className="designer-board__ruler designer-board__ruler--left" aria-hidden="true" />
          <div className="designer-board__swatches" aria-label="Palette">
            <span className="designer-board__swatch designer-board__swatch--ink" />
            <span className="designer-board__swatch designer-board__swatch--red" />
            <span className="designer-board__swatch designer-board__swatch--gold" />
          </div>
          {projects.map((project, index) => (
            <a
              className={`designer-specimen designer-specimen--${project.id}`}
              href={project.url}
              key={project.id}
              target="_blank"
              rel="noreferrer"
              style={{ "--specimen-index": index } as React.CSSProperties}
            >
              <span className="designer-specimen__number">{project.number}</span>
              <h3>{project.name}</h3>
              <p>{specimenDetails[project.id]?.[activeLens] ?? resolve(project.description, mode)}</p>
              <span className="designer-specimen__open">Open specimen ↗</span>
            </a>
          ))}
          <div className="designer-board__annotation designer-board__annotation--one">
            hierarchy before ornament
          </div>
          <div className="designer-board__annotation designer-board__annotation--two">
            interaction is evidence
          </div>
        </div>
      </section>

      <section className="designer-about">
        <h2>
          Work as <em>composition</em>, not construction.
        </h2>
        <div>
          <p>{resolve(about.p1, mode)}</p>
          <p>{resolve(about.p2, mode)}</p>
        </div>
      </section>

      <section className="designer-projects">
        {projects.map((project) => (
          <a className="designer-tile" key={project.id} href={project.url} target="_blank" rel="noreferrer">
            <span className="designer-tile__number">{project.number}</span>
            <h3 className="designer-tile__name">
              {project.name.split(" ").map((part, index) => (
                <span key={`${project.id}-${part}-${index}`}>
                  {index === 1 ? <em>{part}</em> : part}
                  {index < project.name.split(" ").length - 1 ? " " : ""}
                </span>
              ))}
            </h3>
            <p>{resolve(project.description, mode)}</p>
            <span className="designer-tile__live">LIVE ↗</span>
          </a>
        ))}
      </section>

      <section className="designer-exp">
        <div className="designer-hero__marker designer-hero__marker--section">
          <span>03 / WHERE</span>
          <span>TWO YEARS, TWO COMPANIES, ONE VERY SPECIFIC TASTE</span>
        </div>
        {experiences.map((experience) => (
          <div className="designer-exp__row" key={experience.id}>
            <span className="designer-exp__yr">{experience.period}</span>
            <h4 className="designer-exp__title">
              {experience.company} <em>{experience.role}</em>
            </h4>
            <span className="designer-exp__meta">{experience.mode}</span>
          </div>
        ))}
      </section>

      <section className="designer-contact">
        <h2>
          {resolve(contact.h2, mode)} if the <em>surface</em> matters to you.
        </h2>
        <div className="designer-contact__links">
          <a href="mailto:ayush.trillionarie@gmail.com">EMAIL ↗</a>
          <a href="https://www.linkedin.com/in/ayush-saini-858357200/" target="_blank" rel="noreferrer">
            LINKEDIN ↗
          </a>
          <a href="https://github.com/CinematicGenius007" target="_blank" rel="noreferrer">
            GITHUB ↗
          </a>
        </div>
      </section>
    </main>
  );
}
