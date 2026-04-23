import { about, contact, experiences, hero, projects, resolve } from "../content/profile";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

export default function DesignerPage({ mode }: Props) {
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
