import { experiences } from "../../content/profile";
import type { ModeId } from "../../modes/types";

type Props = { mode: ModeId };

export default function ExperienceTable({ mode: _mode }: Props) {
  return (
    <section className="experience-section section-block">
      <div className="section-head">
        <p className="section-number">03</p>
        <p className="section-kicker">EXPERIENCE</p>
      </div>
      <div className="section-rule" />
      <div className="experience-notebook">
        <div className="nb-cell nb-cell--in">
          <span className="nb-label">In [3]:</span>
          <code className="nb-code">profile.experience.to_dataframe()</code>
        </div>
        <div className="nb-cell nb-cell--out">
          <span className="nb-label nb-label--out">Out[3]:</span>
          <div className="nb-output">
            <table className="experience-dataframe">
              <thead>
                <tr>
                  <th>company</th>
                  <th>role</th>
                  <th>period</th>
                  <th>type</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((exp) => (
                  <tr key={exp.id}>
                    <td>{exp.company}</td>
                    <td>{exp.role}</td>
                    <td>{exp.period}</td>
                    <td>{exp.mode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="nb-cell nb-cell--in" style={{ marginTop: "1.5rem" }}>
          <span className="nb-label">In [4]:</span>
          <code className="nb-code">profile.experience["optmyzr"].bullets</code>
        </div>
        <div className="nb-cell nb-cell--out">
          <span className="nb-label nb-label--out">Out[4]:</span>
          <div className="nb-output">
            <ul className="nb-list">
              {experiences[0].bullets.map((b, i) => (
                <li key={i}><span className="nb-idx">[{i}]</span> {typeof b === "string" ? b : b._default}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
