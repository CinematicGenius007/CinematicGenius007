import { skillGroups } from "../../content/profile";
import type { ModeId } from "../../modes/types";

type Props = { mode: ModeId };

export default function SkillsTable({ mode: _mode }: Props) {
  const allItems = skillGroups.flatMap((g) =>
    g.items.map((item) => ({ item, category: g.label }))
  );

  return (
    <section className="profile-section section-block">
      <div className="section-head">
        <p className="section-number">05</p>
        <p className="section-kicker">SKILLS &amp; PROFILE</p>
      </div>
      <div className="section-rule" />
      <div className="skills-notebook">
        <div className="nb-cell nb-cell--in">
          <span className="nb-label">In [6]:</span>
          <code className="nb-code">profile.skills.value_counts()</code>
        </div>
        <div className="nb-cell nb-cell--out">
          <span className="nb-label nb-label--out">Out[6]:</span>
          <div className="nb-output">
            <table className="skills-dataframe">
              <thead>
                <tr>
                  <th>skill</th>
                  <th>category</th>
                </tr>
              </thead>
              <tbody>
                {allItems.map(({ item, category }) => (
                  <tr key={item}>
                    <td>{item}</td>
                    <td className="skills-dataframe__cat">{category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
