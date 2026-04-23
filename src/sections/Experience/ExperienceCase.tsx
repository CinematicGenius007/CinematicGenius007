import { experiences } from "../../content/profile";
import type { ModeId } from "../../modes/types";

type Props = { mode: ModeId };

export default function ExperienceCase({ mode: _mode }: Props) {
  return (
    <section className="experience-section section-block">
      <div className="section-head">
        <p className="section-number">03</p>
        <p className="section-kicker">EXPERIENCE</p>
      </div>
      <div className="section-rule" />
      <div className="experience-case-list">
        {experiences.map((exp) => (
          <article className="case-item" key={exp.id}>
            <div className="case-item__header">
              <h3 className="case-item__company">{exp.company}</h3>
              <span className="case-item__role">{exp.role}</span>
              <span className="case-item__period">{exp.period}</span>
            </div>
            {exp.pmCase && (
              <div className="case-item__blocks">
                <div className="case-block">
                  <p className="case-block__label">CONTEXT</p>
                  <p className="case-block__text">{exp.pmCase.context}</p>
                </div>
                <div className="case-block">
                  <p className="case-block__label">SHIPPED</p>
                  <p className="case-block__text">{exp.pmCase.shipped}</p>
                </div>
                <div className="case-block">
                  <p className="case-block__label">SIGNAL</p>
                  <p className="case-block__text">{exp.pmCase.signal}</p>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
