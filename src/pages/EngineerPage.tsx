import {
  about,
  contact,
  education,
  experiences,
  hero,
  projects,
  resolve,
  skillGroups,
  strengths,
} from "../content/profile";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

export default function EngineerPage({ mode }: Props) {
  return (
    <main className="engineer-page">
      <section className="engineer-hero">
        <div className="engineer-hero__intro">
          <p className="engineer-kicker">01 / SYSTEM ENTRY</p>
          <h1>{hero.name}</h1>
          <p className="engineer-hero__role">{resolve(hero.role, mode)}</p>
          <p className="engineer-hero__statement">{resolve(hero.statement, mode)}</p>
        </div>

        <div className="engineer-console" aria-label="Engineer overview">
          <div className="engineer-console__bar">
            <span />
            <span />
            <span />
            <p>runtime / summary.log</p>
          </div>
          <div className="engineer-console__body">
            <p><span>$</span> surface.area</p>
            <p>Optmyzr / Rule Engine / Campaign Automator / Audits</p>
            <p><span>$</span> current.bias</p>
            <p>debugging hard things before they become customer-facing stories</p>
            <p><span>$</span> personal.rule</p>
            <p>ship the boring version first, let production earn the rest</p>
          </div>
        </div>
      </section>

      <section className="engineer-grid">
        <article className="engineer-card engineer-card--about">
          <div className="engineer-card__head">
            <span>02</span>
            <span>WORKING THEORY</span>
          </div>
          <p>{resolve(about.p1, mode)}</p>
          <p>{resolve(about.p2, mode)}</p>
        </article>

        <article className="engineer-card engineer-card--strengths">
          <div className="engineer-card__head">
            <span>03</span>
            <span>KNOWN STRENGTHS</span>
          </div>
          <ul className="engineer-strengths">
            {strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="engineer-section">
        <div className="engineer-section__head">
          <span>04</span>
          <h2>Experience</h2>
        </div>
        <div className="engineer-timeline">
          {experiences.map((experience) => (
            <article className="engineer-timeline__item" key={experience.id}>
              <div className="engineer-timeline__meta">
                <p>{experience.period}</p>
                <span>{experience.mode}</span>
              </div>
              <div className="engineer-timeline__body">
                <h3>{experience.company}</h3>
                <p className="engineer-timeline__role">{experience.role}</p>
                <ul>
                  {experience.bullets.map((bullet, index) => (
                    <li key={`${experience.id}-${index}`}>{resolve(bullet, mode)}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="engineer-section">
        <div className="engineer-section__head">
          <span>05</span>
          <h2>Projects</h2>
        </div>
        <div className="engineer-projects">
          {projects.map((project) => (
            <a className="engineer-project" href={project.url} key={project.id} target="_blank" rel="noreferrer">
              <div className="engineer-project__top">
                <span>{project.number}</span>
                <span>LIVE ↗</span>
              </div>
              <h3>{project.name}</h3>
              <p>{resolve(project.description, mode)}</p>
              <ul>
                {project.tech.map((item) => (
                  <li key={`${project.id}-${item}`}>{item}</li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </section>

      <section className="engineer-section">
        <div className="engineer-section__head">
          <span>06</span>
          <h2>Stack + Context</h2>
        </div>
        <div className="engineer-stack">
          {skillGroups.map((group) => (
            <article className="engineer-stack__group" key={group.label}>
              <h3>{group.label}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={`${group.label}-${item}`}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="engineer-education">
          {education.map((entry) => (
            <div className="engineer-education__item" key={entry.school}>
              <h3>{entry.school}</h3>
              {entry.degree ? <p>{entry.degree}</p> : null}
              <p>{entry.period}</p>
              <p>{entry.result}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="engineer-contact">
        <div>
          <p className="engineer-kicker">07 / CONTACT</p>
          <h2>{resolve(contact.h2, mode)}</h2>
          <p>{resolve(contact.body, mode)}</p>
        </div>
        <div className="engineer-contact__links">
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
