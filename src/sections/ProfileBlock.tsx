import { education, outside, resolve } from "../content/profile";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

export default function ProfileBlock({ mode }: Props) {
  if (mode === "everyday") {
    return (
      <section className="profile-section section-block">
        <div className="section-head">
          <p className="section-number">05</p>
          <p className="section-kicker">A BIT MORE</p>
        </div>
        <div className="section-rule" />
        <p className="outside-text">{resolve(outside, mode)}</p>
      </section>
    );
  }

  if (mode === "data") {
    return (
      <section className="profile-section section-block">
        <div className="section-head">
          <p className="section-number">05b</p>
          <p className="section-kicker">EDUCATION</p>
        </div>
        <div className="section-rule" />
        <div className="nb-cell nb-cell--in">
          <span className="nb-label">In [7]:</span>
          <code className="nb-code">profile.education.to_dataframe()</code>
        </div>
        <div className="nb-cell nb-cell--out">
          <span className="nb-label nb-label--out">Out[7]:</span>
          <div className="nb-output">
            <table className="experience-dataframe">
              <thead>
                <tr><th>institution</th><th>degree</th><th>period</th><th>result</th></tr>
              </thead>
              <tbody>
                {education.map((e) => (
                  <tr key={e.school}>
                    <td>{e.school}</td>
                    <td>{e.degree || "—"}</td>
                    <td>{e.period}</td>
                    <td>{e.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="profile-section section-block" style={{ paddingTop: 0 }}>
      <div className="bio-row">
        <article className="education-column">
          {education.map((e, i) => (
            <div className="education-block" key={e.school} style={i > 0 ? { borderTop: "1px solid var(--mode-rule)", marginTop: "0.8rem", paddingTop: "1rem" } : {}}>
              <h3>{e.school}</h3>
              {e.degree && <p>{e.degree}</p>}
              <p>{e.period}</p>
              <p>{e.result}</p>
            </div>
          ))}
        </article>
        <article className="outside-column">
          <p>{resolve(outside, mode)}</p>
        </article>
      </div>
    </section>
  );
}
