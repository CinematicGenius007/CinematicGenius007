import { skillGroups, strengths } from "../../content/profile";
import type { ModeId } from "../../modes/types";

type Props = { mode: ModeId };

export default function SkillsColumns({ mode: _mode }: Props) {
  return (
    <section className="profile-section section-block">
      <div className="section-head">
        <p className="section-number">05</p>
        <p className="section-kicker">SKILLS &amp; PROFILE</p>
      </div>
      <div className="section-rule" />
      <div className="skills-row">
        {skillGroups.map((group) => (
          <article className="skill-column" key={group.label}>
            <h3>{group.label}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="strength-row">
        {strengths.map((s) => (
          <p key={s}>
            <span>//</span>
            {s}
          </p>
        ))}
      </div>
    </section>
  );
}
