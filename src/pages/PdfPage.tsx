import type { ReactNode } from "react";
import { contacts } from "../content/contacts";
import { education, experiences, outside, projects, skillGroups } from "../content/profile";
import type { Experience, Project } from "../content/types";

const BUILD_HASH = (() => {
  const src = JSON.stringify({ experiences, projects, skillGroups, education });
  let h = 0x811c9dc5;
  for (let i = 0; i < src.length; i++) {
    h ^= src.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
})();

type Props = {
  dark: boolean;
  onToggleTheme: () => void;
};

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

const icons = {
  print: (
    <Icon>
      <path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v7H7z" />
      <path d="M17.5 11.5h.01" />
    </Icon>
  ),
  sun: (
    <Icon>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </Icon>
  ),
  moon: (
    <Icon>
      <path d="M20 15.3A8.5 8.5 0 0 1 8.7 4a8.5 8.5 0 1 0 11.3 11.3Z" />
    </Icon>
  ),
  mail: (
    <Icon>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m4 7 8 6 8-6" />
    </Icon>
  ),
  linkedin: (
    <Icon>
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M7 10v7M7 7v.01M11 17v-4a3 3 0 0 1 6 0v4M11 10v7" />
    </Icon>
  ),
  github: (
    <Icon>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.5 5.5 0 0 0 19.3 4 5.1 5.1 0 0 0 19.2.5S18 0 15 2a13.4 13.4 0 0 0-7 0C5-.1 3.8.5 3.8.5A5.1 5.1 0 0 0 3.7 4a5.5 5.5 0 0 0-1.5 3.6c0 5.3 3.5 6.5 6.8 6.9A4.8 4.8 0 0 0 8 18v4M8 19c-3 .9-3-1.5-4.2-2" />
    </Icon>
  ),
  globe: (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </Icon>
  ),
};

function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="resume-section-label">
      <h2>{children}</h2>
      <span>{index}</span>
    </div>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a className="resume-contact" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      <span className="resume-contact__icon">{icon}</span>
      <span>
        <strong>{label}</strong>
        <small>{value}</small>
      </span>
    </a>
  );
}

function MetaSection({ index, title, children }: { index: string; title: string; children: ReactNode }) {
  return (
    <section className="resume-meta-section">
      <SectionLabel index={index}>{title}</SectionLabel>
      {children}
    </section>
  );
}

function ExperienceEntry({ experience, index }: { experience: Experience; index: number }) {
  return (
    <article className="resume-experience">
      <span className="resume-experience__index">[{String(index + 1).padStart(2, "0")}]</span>
      <div className="resume-experience__content">
        <div className="resume-experience__header">
          <div>
            <h3>{experience.company}</h3>
            <p>{experience.role}</p>
          </div>
          <time>{experience.period}</time>
        </div>
        <p className="resume-experience__mode">{experience.mode}</p>
        <ul>
          {experience.bullets.map((bullet, bulletIndex) => (
            <li key={bulletIndex}>{typeof bullet === "string" ? bullet : bullet._default}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ProjectMark({ id }: { id: Project["id"] }) {
  if (id === "sudoku") {
    return (
      <span className="resume-project-mark" aria-hidden="true">
        <svg className="resume-project-mark__art" viewBox="0 0 48 48">
          <rect x="3" y="3" width="42" height="42" />
          <path d="M17 3v42M31 3v42M3 17h42M3 31h42" />
          <text x="10" y="10">1</text><text x="24" y="10">2</text><text x="38" y="10">3</text>
          <text x="10" y="24">4</text><text x="24" y="24">5</text><text x="38" y="24">6</text>
          <text x="10" y="38">7</text><text x="24" y="38">8</text><text x="38" y="38">9</text>
        </svg>
      </span>
    );
  }
  if (id === "ttt") {
    return (
      <span className="resume-project-mark" aria-hidden="true">
        <svg className="resume-project-mark__art" viewBox="0 0 48 48">
          <path d="M18 4v40M30 4v40M4 18h40M4 30h40M7 7l8 8M15 7l-8 8M33 33l8 8M41 33l-8 8" />
          <circle cx="36" cy="12" r="5" /><circle cx="12" cy="36" r="5" />
        </svg>
      </span>
    );
  }
  return (
    <span className="resume-project-mark" aria-hidden="true">
      <svg className="resume-project-mark__art" viewBox="0 0 48 48">
        <path d="M4 31V17l12-7 12 7v14l-12 7ZM28 17l12-7M28 31l12 7M40 10v28M16 10V4M12 7h8" />
        <circle cx="40" cy="10" r="3" /><circle cx="40" cy="38" r="3" />
      </svg>
    </span>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <article className="resume-project-row">
      <span className="resume-project-row__number">{String(index + 1).padStart(2, "0")}</span>
      <ProjectMark id={project.id} />
      <div className="resume-project-row__copy">
        <h3>{project.name}</h3>
        <p>{typeof project.description === "string" ? project.description : project.description._default}</p>
      </div>
      <ul className="resume-project-row__stack">
        {project.tech.map((tech) => <li key={tech}>{tech}</li>)}
      </ul>
      <a className="resume-project-row__link" href={project.url} target="_blank" rel="noreferrer">
        Live <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}

export default function PdfPage({ dark, onToggleTheme }: Props) {
  return (
    <main className={`pdf-page${dark ? " pdf-page--dark" : ""}`}>
      <article className="resume-sheet">
        <nav className="resume-utility" aria-label="Resume actions">
          <div className="resume-utility__id">
            <span>Ayush</span><i>/</i><span>Resume</span><i>/</i><span>2026</span>
          </div>
          <div className="resume-utility__actions">
            <button type="button" onClick={() => window.print()}>{icons.print}<span>Print</span></button>
            <span className="resume-utility__divider" aria-hidden="true" />
            <button type="button" onClick={onToggleTheme} aria-pressed={dark}>
              {dark ? icons.sun : icons.moon}<span>{dark ? "Light" : "Dark"}</span>
            </button>
          </div>
        </nav>

        <header className="resume-hero">
          <div className="resume-hero__identity">
            <h1><span>Ayush</span><span>Saini</span></h1>
            <p className="resume-hero__role">Software Engineer — Full Stack</p>
            <p className="resume-hero__summary">
              Backend-first software engineer building reliable product systems across ad-tech, AI workflows,
              infrastructure, and the production bugs that refuse to stay hypothetical.
            </p>
          </div>
          <div className="resume-hero__note" aria-hidden="true">
            <span>make systems<br />people trust</span>
            <svg viewBox="0 0 110 78">
              <path d="M11 10c31 2 49 13 57 38" />
              <path d="m60 43 9 7 4-11" />
              <path className="resume-hero__note-accent" d="M47 65c17-3 29-3 43-2M56 72c11-3 20-4 29-3" />
            </svg>
          </div>
        </header>

        <div className="resume-contacts">
          <ContactItem icon={icons.mail} label="Email" value="ayush.trillionarie@gmail.com" href={contacts.emailHref} />
          <ContactItem icon={icons.linkedin} label="LinkedIn" value="ayush-saini" href={contacts.linkedin} />
          <ContactItem icon={icons.github} label="GitHub" value="CinematicGenius007" href={contacts.github} />
          <ContactItem icon={icons.globe} label="Website" value="cinematicgenius007.com" href="https://cinematicgenius007.com" />
        </div>

        <div className="resume-body">
          <aside className="resume-meta">
            <MetaSection index="01" title="Profile">
              <p>
                I build software that has to work. Strongest in backend systems, architecture, debugging, and owning
                features all the way from a vague problem to a calm production release.
              </p>
              <span className="resume-stamp">Based in India</span>
            </MetaSection>

            <MetaSection index="02" title="Education">
              <div className="resume-education-list">
                {education.map((item) => (
                  <article key={item.school}>
                    <h3>{item.school}</h3>
                    {item.degree ? <p>{item.degree}</p> : null}
                    <time>{item.period}</time>
                    <span>{item.result}</span>
                  </article>
                ))}
              </div>
            </MetaSection>

            <MetaSection index="03" title="Skills">
              <div className="resume-skill-list">
                {skillGroups.map((group) => (
                  <div key={group.label}>
                    <h3>{group.label}</h3>
                    <p>{group.items.join(", ")}</p>
                  </div>
                ))}
              </div>
            </MetaSection>

            <MetaSection index="04" title="Outside the terminal">
              <p>{typeof outside === "string" ? outside : outside._default}</p>
              <span className="resume-stamp">Debate · Theatre · Systems</span>
            </MetaSection>
          </aside>

          <section className="resume-experience-list">
            <SectionLabel index="05">Experience</SectionLabel>
            {experiences.map((experience, index) => (
              <ExperienceEntry key={experience.id} experience={experience} index={index} />
            ))}
          </section>
        </div>

        <section className="resume-projects">
          <SectionLabel index="06">Projects / Selected builds</SectionLabel>
          <div className="resume-projects__rows">
            {projects.map((project, index) => <ProjectRow key={project.id} project={project} index={index} />)}
          </div>
          <div className="resume-projects__footer">
            <span>+</span>
            <a href={contacts.github} target="_blank" rel="noreferrer">More builds and experiments on GitHub.</a>
            <strong>Build. Share. Learn. Repeat.</strong>
          </div>
        </section>

        <footer className="pdf-provenance">
          <a href="https://cinematicgenius007.com" target="_blank" rel="noreferrer">cinematicgenius007.com</a>
          <span className="pdf-provenance__hash">Build {BUILD_HASH} · 2026</span>
          <span>Available for ambitious systems work.</span>
        </footer>
      </article>
    </main>
  );
}
