import { projects, resolve } from "../../content/profile";
import type { ModeId } from "../../modes/types";

type Props = { mode: ModeId };

export default function ProjectsStory({ mode }: Props) {
  return (
    <section className="projects-section section-block">
      <div className="section-head">
        <p className="section-number">04</p>
        <p className="section-kicker">THINGS I'VE BUILT</p>
      </div>
      <div className="section-rule" />
      <div className="projects-story-list">
        {projects.map((p) => (
          <article className="project-story" key={p.id}>
            <a className="project-story__name" href={p.url} target="_blank" rel="noreferrer">
              {p.name} ↗
            </a>
            <p className="project-story__description">{resolve(p.description, mode)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
