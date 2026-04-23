import { about, contact, experiences, hero, projects, resolve } from "../content/profile";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

const desktopIcons = ["finder", "safari", "slack", "docs"];

export default function RetroPage({ mode }: Props) {
  return (
    <main className="retro-page">
      <section className="retro-desk">
        <div className="retro-icons" aria-hidden="true">
          {desktopIcons.map((icon) => (
            <div className="retro-icons__item" key={icon}>
              <div className="retro-icons__glyph" />
              <span>{icon}</span>
            </div>
          ))}
        </div>

        <div className="retro-window">
          <div className="retro-window__chrome">
            <div className="retro-window__lights">
              <span />
              <span />
              <span />
            </div>
            <p>Ayush OS / Portfolio</p>
          </div>

          <div className="retro-window__body">
            <aside className="retro-sidebar">
              <div className="retro-sidebar__card">
                <p className="retro-label">MODE</p>
                <h1>RETRO BRUTALIST</h1>
                <p className="retro-sidebar__role">{resolve(hero.role, mode)}</p>
              </div>

              <div className="retro-sidebar__card">
                <p className="retro-label">INDEX</p>
                <ul>
                  <li>hero / present tense</li>
                  <li>work / visible structure</li>
                  <li>projects / live artifacts</li>
                  <li>contact / open tab</li>
                </ul>
              </div>
            </aside>

            <div className="retro-main">
              <section className="retro-hero">
                <div>
                  <p className="retro-label">CURRENT STATUS</p>
                  <h2>{hero.name}</h2>
                  <p className="retro-hero__lede">{resolve(hero.statement, mode)}</p>
                </div>
                <div className="retro-hero__art" aria-hidden="true">
                  <div className="retro-hero__sun" />
                  <div className="retro-hero__halftone" />
                  <div className="retro-hero__checker" />
                </div>
              </section>

              <section className="retro-grid">
                <article className="retro-card retro-card--wide">
                  <p className="retro-label">WHY THIS VIEW EXISTS</p>
                  <p>{resolve(about.p1, mode)}</p>
                  <p>{resolve(about.p2, mode)}</p>
                </article>

                <article className="retro-card">
                  <p className="retro-label">NOW SHIPPING</p>
                  <h3>{experiences[0].company}</h3>
                  <p>{experiences[0].bullets[1]._default}</p>
                </article>

                <article className="retro-card">
                  <p className="retro-label">SIDE QUEST</p>
                  <h3>{experiences[1].company}</h3>
                  <p>{experiences[1].bullets[0]._default}</p>
                </article>
              </section>

              <section className="retro-project-stack">
                {projects.map((project, index) => (
                  <a
                    className={`retro-project${index === 0 ? " retro-project--featured" : ""}`}
                    href={project.url}
                    key={project.id}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="retro-project__head">
                      <span>{project.number}</span>
                      <span>LIVE ↗</span>
                    </div>
                    <h3>{project.name}</h3>
                    <p>{resolve(project.description, mode)}</p>
                  </a>
                ))}
              </section>

              <section className="retro-contact">
                <div>
                  <p className="retro-label">CONTACT</p>
                  <h2>{resolve(contact.h2, mode)}</h2>
                  <p>{resolve(contact.body, mode)}</p>
                </div>
                <div className="retro-contact__links">
                  <a href="mailto:ayush.trillionarie@gmail.com">EMAIL ↗</a>
                  <a href="https://www.linkedin.com/in/ayush-saini-858357200/" target="_blank" rel="noreferrer">
                    LINKEDIN ↗
                  </a>
                  <a href="https://github.com/CinematicGenius007" target="_blank" rel="noreferrer">
                    GITHUB ↗
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
