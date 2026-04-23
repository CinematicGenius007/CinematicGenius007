import { about, contact, experiences, outside, projects, resolve } from "../content/profile";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

export default function EverydayPage({ mode }: Props) {
  return (
    <main className="everyday-page">
      <section className="everyday-letter">
        <p className="everyday-letter__date">April 2026</p>
        <h1>Hi, I&apos;m Ayush.</h1>
        <p className="everyday-letter__lede">{resolve(about.p1, mode)}</p>
        <p>{resolve(about.p2, mode)}</p>
      </section>

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
          <span>Things I&apos;ve built</span>
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
          <a href="mailto:ayush.trillionarie@gmail.com">Email</a>
          <a href="https://www.linkedin.com/in/ayush-saini-858357200/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/CinematicGenius007" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </section>
    </main>
  );
}
