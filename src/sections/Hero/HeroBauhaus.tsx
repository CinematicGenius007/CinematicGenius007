import { hero, resolve } from "../../content/profile";
import type { ModeId } from "../../modes/types";

type Props = { mode: ModeId };

export default function HeroBauhaus({ mode }: Props) {
  return (
    <section className="hero-bauhaus">
      <p className="hero-bauhaus__marker">01 / INTRODUCTION</p>
      <div className="hero-bauhaus__name-wrap">
        <h1>{hero.name}</h1>
        <div className="hero-bauhaus__geometry" aria-hidden="true" />
      </div>
      <p className="hero-bauhaus__role">{resolve(hero.role, mode)}</p>
      <p className="hero-bauhaus__statement">{resolve(hero.statement, mode)}</p>
      <p className="hero-bauhaus__scroll">↓ scroll</p>
    </section>
  );
}
