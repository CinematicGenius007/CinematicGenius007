import { about, resolve } from "../content/profile";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

export default function AboutSection({ mode }: Props) {
  const kicker = resolve(about.sectionKicker, mode);
  const p1 = resolve(about.p1, mode);
  const p2 = resolve(about.p2, mode);

  if (mode === "everyday") {
    return (
      <section className="about-section section-block">
        <div className="section-head">
          <p className="section-number">{about.sectionNumber}</p>
          <p className="section-kicker">{kicker}</p>
        </div>
        <div className="section-rule" />
        <div className="about-copy about-copy--single">
          <p>{p1}</p>
          <p>{p2}</p>
        </div>
      </section>
    );
  }

  if (mode === "data") {
    return (
      <section className="about-section section-block">
        <div className="section-head">
          <p className="section-number">{about.sectionNumber}</p>
          <p className="section-kicker">{kicker}</p>
        </div>
        <div className="section-rule" />
        <div className="about-data">
          <div className="data-cell">
            <span className="data-cell__label">In [1]:</span>
            <code className="data-cell__code">profile.summary()</code>
          </div>
          <div className="data-cell data-cell--out">
            <span className="data-cell__label data-cell__label--out">Out[1]:</span>
            <div className="data-cell__content">
              <p>{p1}</p>
              <p>{p2}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (mode === "anime") {
    return (
      <section className="about-section section-block">
        <div className="section-head">
          <p className="section-number">02</p>
          <p className="section-kicker">PROLOGUE</p>
        </div>
        <div className="section-rule" />
        <div className="about-grid">
          <article className="about-copy">
            <p>{p1}</p>
            <p style={{ marginTop: "1.2rem" }}>{p2}</p>
          </article>
          <aside className="field-notes">
            {about.notes.map((note, i) => (
              <p key={i}>
                <span>//</span>
                {resolve(note, mode)}
              </p>
            ))}
          </aside>
        </div>
      </section>
    );
  }

  return (
    <section className="about-section section-block">
      <div className="section-head">
        <p className="section-number">{about.sectionNumber}</p>
        <p className="section-kicker">{kicker}</p>
      </div>
      <div className="section-rule" />
      <div className="about-grid">
        <article className="about-copy">
          <p>{p1}</p>
          <p>{p2}</p>
        </article>
        <aside className="field-notes">
          {about.notes.map((note, i) => (
            <p key={i}>
              <span>//</span>
              {resolve(note, mode)}
            </p>
          ))}
        </aside>
      </div>
    </section>
  );
}
