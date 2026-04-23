import { experiences, resolve } from "../../content/profile";
import type { ModeId } from "../../modes/types";

type Props = { mode: ModeId };

const isEveryday = (mode: ModeId) => mode === "everyday";

export default function ExperienceList({ mode }: Props) {
  return (
    <section className="experience-section section-block">
      <div className="section-head">
        <p className="section-number">03</p>
        <p className="section-kicker">EXPERIENCE</p>
      </div>
      <div className="section-rule" />
      <div className="experience-list">
        {experiences.map((exp) => (
          <article className="experience-item" key={exp.id}>
            <p className="experience-period">{exp.period}</p>
            <div className="experience-main">
              <h3>{exp.company}</h3>
              <p className="experience-role">{exp.role}</p>
              {!isEveryday(mode) && (
                <p className="experience-mode">{exp.mode}</p>
              )}
              {!isEveryday(mode) && (
                <ul>
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{resolve(b, mode)}</li>
                  ))}
                </ul>
              )}
              {isEveryday(mode) && (
                <p className="experience-summary">{resolve(exp.bullets[0], mode)}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
