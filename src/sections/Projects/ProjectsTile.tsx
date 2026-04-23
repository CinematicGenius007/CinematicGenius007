import { projects, resolve } from "../../content/profile";
import type { ModeId } from "../../modes/types";

type Props = { mode: ModeId };

export default function ProjectsTile({ mode }: Props) {
  return (
    <section className="projects-section section-block">
      <div className="section-head">
        <p className="section-number">04</p>
        <p className="section-kicker">PROJECTS</p>
      </div>
      <div className="section-rule" />
      <div className="projects-tile-list">
        {projects.map((p) => (
          <a
            className="project-tile"
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noreferrer"
          >
            <span className="project-tile__number">{p.number}</span>
            <h3 className="project-tile__name">{p.name}</h3>
            <p className="project-tile__sub">{resolve(p.description, mode)}</p>
            <span className="project-tile__arrow">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
