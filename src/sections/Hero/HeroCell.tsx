import { hero, resolve } from "../../content/profile";
import type { ModeId } from "../../modes/types";

type Props = { mode: ModeId };

export default function HeroCell({ mode }: Props) {
  return (
    <section className="hero-cell">
      <div className="hero-cell__notebook">
        <div className="hero-cell__cell hero-cell__cell--input">
          <span className="hero-cell__label">In [1]:</span>
          <div className="hero-cell__code">
            <span className="hero-cell__kw">print</span>
            <span className="hero-cell__paren">(</span>
            <span className="hero-cell__str">"ayush_saini"</span>
            <span className="hero-cell__paren">)</span>
          </div>
        </div>
        <div className="hero-cell__cell hero-cell__cell--output">
          <span className="hero-cell__label hero-cell__label--out">Out[1]:</span>
          <div className="hero-cell__output-content">
            <p className="hero-cell__name">{hero.name}</p>
            <p className="hero-cell__role">{resolve(hero.role, mode)}</p>
          </div>
        </div>
        <div className="hero-cell__cell hero-cell__cell--input" style={{ marginTop: "1.5rem" }}>
          <span className="hero-cell__label">In [2]:</span>
          <div className="hero-cell__code">
            <span className="hero-cell__kw">describe</span>
            <span className="hero-cell__paren">(ayush_saini)</span>
          </div>
        </div>
        <div className="hero-cell__cell hero-cell__cell--output">
          <span className="hero-cell__label hero-cell__label--out">Out[2]:</span>
          <p className="hero-cell__statement">{resolve(hero.statement, mode)}</p>
        </div>
      </div>
    </section>
  );
}
