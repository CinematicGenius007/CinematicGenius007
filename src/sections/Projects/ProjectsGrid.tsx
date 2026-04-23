import { projects, resolve } from "../../content/profile";
import type { ModeId } from "../../modes/types";

type Props = { mode: ModeId };

export default function ProjectsGrid({ mode }: Props) {
  return (
    <section className="projects-section section-block">
      <div className="section-head">
        <p className="section-number">04</p>
        <p className="section-kicker">PROJECTS</p>
      </div>
      <div className="section-rule" />
      <div className="projects-grid">
        {projects.map((p) => (
          <article className="project-card" key={p.id}>
            <div className="project-card__top">
              <p>{p.number}</p>
              <a href={p.url} target="_blank" rel="noreferrer">STATUS: LIVE ↗</a>
            </div>
            <h3>{p.name}</h3>
            <p className="project-card__description">{resolve(p.description, mode)}</p>
            <div className="project-card__rule" />
            <ul className="project-card__tech">
              {p.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
