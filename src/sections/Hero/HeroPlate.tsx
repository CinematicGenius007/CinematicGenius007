import { hero, resolve } from "../../content/profile";
import type { ModeId } from "../../modes/types";

type Props = { mode: ModeId };

export default function HeroPlate({ mode }: Props) {
  return (
    <section className="hero-plate">
      <p className="hero-plate__marker">01 / INTRODUCTION</p>
      <div className="hero-plate__stage">
        <div className="hero-plate__plate-a" aria-hidden="true" />
        <div className="hero-plate__plate-b" aria-hidden="true" />
        <h1 className="hero-plate__name">{hero.name}</h1>
      </div>
      <p className="hero-plate__role">{resolve(hero.role, mode)}</p>
      <p className="hero-plate__statement">{resolve(hero.statement, mode)}</p>
      <p className="hero-plate__scroll">↓ scroll</p>
    </section>
  );
}
