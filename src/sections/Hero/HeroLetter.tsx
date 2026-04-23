import { hero, resolve } from "../../content/profile";
import type { ModeId } from "../../modes/types";

type Props = { mode: ModeId };

export default function HeroLetter({ mode }: Props) {
  return (
    <section className="hero-letter">
      <p className="hero-letter__date">April 2026</p>
      <h1 className="hero-letter__name">{hero.name}</h1>
      <p className="hero-letter__role">{resolve(hero.role, mode)}</p>
      <p className="hero-letter__body">{resolve(hero.statement, mode)}</p>
      <p className="hero-letter__scroll">↓</p>
    </section>
  );
}
