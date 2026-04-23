import { experiences, resolve } from "../../content/profile";
import type { ModeId } from "../../modes/types";

type Props = { mode: ModeId };

const orderedArcs = ["jetbrains", "zariya", "optmyzr"];

export default function ExperienceArc({ mode }: Props) {
  const arcs = orderedArcs
    .map((id) => experiences.find((e) => e.id === id))
    .filter(Boolean) as typeof experiences;

  return (
    <section className="experience-section section-block">
      <div className="section-head">
        <p className="section-number">03</p>
        <p className="section-kicker">STORY ARCS</p>
      </div>
      <div className="section-rule" />
      <div className="arc-list">
        {arcs.map((exp, i) => (
          <article className="arc-item" key={exp.id}>
            <div className="arc-item__number">{exp.arcChapter ?? `第${i + 1}章`}</div>
            <div className="arc-item__body">
              <p className="arc-item__arc-name">{exp.arcName}</p>
              <h3 className="arc-item__company">{exp.company}</h3>
              <p className="arc-item__period">{exp.period}</p>
              <ul className="arc-item__bullets">
                {exp.bullets.slice(0, 2).map((b, j) => (
                  <li key={j}>{resolve(b, mode)}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
