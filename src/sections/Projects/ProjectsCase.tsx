import { projects, resolve } from "../../content/profile";
import type { ModeId } from "../../modes/types";

type Props = { mode: ModeId };

export default function ProjectsCase({ mode }: Props) {
  return (
    <section className="projects-section section-block">
      <div className="section-head">
        <p className="section-number">04</p>
        <p className="section-kicker">PROJECTS</p>
      </div>
      <div className="section-rule" />
      <div className="projects-case-list">
        {projects.map((p) => (
          <article className="project-case" key={p.id}>
            <div className="project-case__header">
              <span className="project-case__number">{p.number}</span>
              <h3 className="project-case__name">{p.name}</h3>
              <a className="project-case__link" href={p.url} target="_blank" rel="noreferrer">LIVE ↗</a>
            </div>
            <div className="project-case__body">
              {p.pmProblem && (
                <div className="project-case__block">
                  <p className="project-case__block-label">PROBLEM</p>
                  <p className="project-case__block-text">{p.pmProblem}</p>
                </div>
              )}
              <div className="project-case__block">
                <p className="project-case__block-label">BUILT</p>
                <p className="project-case__block-text">{resolve(p.description, mode)}</p>
              </div>
              {p.pmOutcome && (
                <div className="project-case__block">
                  <p className="project-case__block-label">OUTCOME</p>
                  <p className="project-case__block-text">{p.pmOutcome}</p>
                </div>
              )}
            </div>
            <ul className="project-case__tech">
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
