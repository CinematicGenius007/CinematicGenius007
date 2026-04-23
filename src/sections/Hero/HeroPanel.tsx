import { hero } from "../../content/profile";
import type { ModeId } from "../../modes/types";

type Props = { mode: ModeId };

export default function HeroPanel({ mode: _mode }: Props) {
  return (
    <section className="hero-panel">
      <div className="hero-panel__gutter">
        <span className="hero-panel__kana" aria-hidden="true">プロローグ</span>
      </div>
      <div className="hero-panel__content">
        <div className="hero-panel__splash">
          <p className="hero-panel__chapter">第0章</p>
          <h1 className="hero-panel__name">{hero.name}</h1>
          <p className="hero-panel__subtitle">{hero.animeSubtitle}</p>
        </div>
        <div className="hero-panel__panels">
          <div className="hero-panel__panel hero-panel__panel--wide">
            <p className="hero-panel__panel-label">ROLE</p>
            <p className="hero-panel__panel-text">FULL STACK ENGINEER</p>
          </div>
          <div className="hero-panel__panel">
            <p className="hero-panel__panel-label">STATUS</p>
            <p className="hero-panel__panel-text">ACTIVE</p>
          </div>
          <div className="hero-panel__panel">
            <p className="hero-panel__panel-label">AFFILIATION</p>
            <p className="hero-panel__panel-text">OPTMYZR · ZARIYA</p>
          </div>
        </div>
      </div>
    </section>
  );
}
