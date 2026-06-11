import { contacts } from "../content/contacts";
import { experiences, projects, skillGroups, education, outside } from "../content/profile";

// content fingerprint — the 'compiled artifact' fiction made literal
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

export default function PdfPage({ dark, onToggleTheme }: Props) {
  return (
    <main className="pdf-page">
      <button
        className="pdf-theme-toggle"
        onClick={onToggleTheme}
        aria-label="Toggle dark/light theme"
        title={dark ? "Switch to light" : "Switch to dark"}
      >
        {dark ? "☀" : "☾"}
      </button>

      <header className="pdf-header">
        <div className="pdf-header__name">
          <h1>Ayush Saini</h1>
        </div>
        <div className="pdf-header__contact">
          <a href={contacts.emailHref}>{contacts.email}</a>
          <span className="pdf-header__sep">·</span>
          <a href={contacts.linkedin} target="_blank" rel="noreferrer">linkedin</a>
          <span className="pdf-header__sep">·</span>
          <a href={contacts.github} target="_blank" rel="noreferrer">github</a>
          <span className="pdf-header__sep">·</span>
          <a href="https://cinematicgenius007.com" target="_blank" rel="noreferrer">cinematicgenius007.com</a>
        </div>
      </header>

      <div className="pdf-rule" />

      <section className="pdf-section">
        <div className="pdf-section__label">Experience</div>
        <div className="pdf-section__body">
          {experiences.map((exp) => (
            <div className="pdf-entry" key={exp.id}>
              <div className="pdf-entry__top">
                <div>
                  <span className="pdf-entry__company">{exp.company}</span>
                  <span className="pdf-entry__role"> {exp.role}</span>
                </div>
                <span className="pdf-entry__period">{exp.period}</span>
              </div>
              {exp.mode && <p className="pdf-entry__mode">{exp.mode}</p>}
              <ul className="pdf-entry__bullets">
                {exp.bullets.map((b, i) => (
                  <li key={i}>{typeof b === "string" ? b : b._default}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="pdf-rule" />

      <section className="pdf-section">
        <div className="pdf-section__label">Projects</div>
        <div className="pdf-section__body">
          {projects.map((p) => (
            <div className="pdf-entry" key={p.id}>
              <div className="pdf-entry__top">
                <div>
                  <a className="pdf-entry__company" href={p.url} target="_blank" rel="noreferrer">
                    {p.name}
                  </a>
                  <span className="pdf-entry__tech"> — {p.tech.join(", ")}</span>
                </div>
                <span className="pdf-entry__period">Live ↗</span>
              </div>
              <ul className="pdf-entry__bullets">
                <li>{typeof p.description === "string" ? p.description : p.description._default}</li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="pdf-rule" />

      <section className="pdf-section">
        <div className="pdf-section__label">Skills</div>
        <div className="pdf-section__body pdf-skills">
          {skillGroups.map((group) => (
            <div className="pdf-skill-group" key={group.label}>
              <span className="pdf-skill-group__label">{group.label}</span>
              <span className="pdf-skill-group__items">{group.items.join(", ")}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="pdf-rule" />

      <section className="pdf-section">
        <div className="pdf-section__label">Education</div>
        <div className="pdf-section__body">
          {education.map((edu) => (
            <div className="pdf-entry" key={edu.school}>
              <div className="pdf-entry__top">
                <div>
                  <span className="pdf-entry__company">{edu.school}</span>
                  {edu.degree && <span className="pdf-entry__role"> — {edu.degree}</span>}
                </div>
                <span className="pdf-entry__period">{edu.period}</span>
              </div>
              <p className="pdf-entry__mode">{edu.result}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="pdf-rule" />

      <section className="pdf-section">
        <div className="pdf-section__label">Outside</div>
        <div className="pdf-section__body">
          <p className="pdf-outside">
            {typeof outside === "string" ? outside : outside._default}
          </p>
        </div>
      </section>

      <footer className="pdf-provenance">
        <span>
          Compiled from the same content spine as the interactive portfolio — ten other renders at{" "}
          <a href="https://cinematicgenius007.com" target="_blank" rel="noreferrer">
            cinematicgenius007.com
          </a>{" "}
          (?as=engineer · anime · signal · …)
        </span>
        <span className="pdf-provenance__hash">build {BUILD_HASH}</span>
      </footer>
    </main>
  );
}
