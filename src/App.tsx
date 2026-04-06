type Experience = {
  title: string;
  company: string;
  period: string;
  mode: string;
  bullets: string[];
};

const experiences: Experience[] = [
  {
    title: "Software Development Engineer 1",
    company: "Optmyzr",
    period: "Full-time since Aug 2024",
    mode: "Internship from Apr 2023 to Aug 2024",
    bullets: [
      "Own core ad-tech product surfaces including Campaign Automator, Rule Engine, Audits, and Google Ads scripts support.",
      "Built and shipped mid-to-high complexity features such as Criteria Filter View, Portfolios, and Portfolio Alerts.",
      "Developed a reputation for deep debugging, production reliability, and maintaining correctness across large C# systems.",
      "Mentored 4 interns through onboarding, reviews, and delivery, while staying hands-on with production-critical work.",
    ],
  },
  {
    title: "Founding Engineer",
    company: "Oddmind Innovations (Zariya)",
    period: "Late 2024 - Present",
    mode: "Part-time, early-stage build partner",
    bullets: [
      "Built the initial tech stack for multiple SaaS applications from the ground up.",
      "Shaped frontend and backend systems with Next.js and Express.js.",
      "Contributed to architecture, engineering culture, team setup, and technical direction with the founding team.",
    ],
  },
  {
    title: "Project Tester",
    company: "JetBrains Hyperskill",
    period: "2022 - 2023",
    mode: "Freelance",
    bullets: [
      "Tested educational programming projects for correctness, structure, and learning flow.",
      "Worked across Java and Go projects, giving feedback that improved clarity and quality before release.",
    ],
  },
];

const strengths = [
  "Debugging complex systems",
  "Backend architecture",
  "Feature ownership",
  "Mentorship",
  "Production reliability",
];

const skillGroups = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "C#", "Go", "Java", "C / C++"],
  },
  {
    label: "Frameworks",
    items: ["React", "Next.js", "Vite", "Express.js"],
  },
  {
    label: "Working Style",
    items: ["End-to-end ownership", "Large-scale debugging", "Maintainable systems", "Calm production response"],
  },
];

const notes = [
  "2+ years across ad-tech and SaaS.",
  "Built for correctness before cleverness.",
  "Comfortable across frontend, backend, and systems thinking.",
  "Prefers shipping work that survives production reality.",
];

function App() {
  return (
    <div className="page-shell">
      <div className="paper-noise" aria-hidden="true" />
      <div className="floating-clips floating-clips-left" aria-hidden="true" />
      <div className="floating-clips floating-clips-right" aria-hidden="true" />

      <main className="front-page">
        <section className="nameplate">
          <p className="eyebrow">Ayush Saini / Software Engineer / Panipat, India</p>
          <div className="nameplate-rule" />
          <div className="nameplate-grid">
            <div>
              <div className="title-row">
                <div>
                  <p className="issue-label">Edition 02</p>
                  <h1>The Debugger&apos;s Gazette</h1>
                </div>
              </div>
              <p className="subhead">
                Newspaper restraint, a little Hogwarts mystery, and software work built for production instead of applause.
              </p>
            </div>
            <aside className="nameplate-meta">
              {/* <div className="life-signal" aria-hidden="true">
                <svg viewBox="0 0 220 72" role="presentation">
                  <path
                    className="trail"
                    d="M0 36 H42 L58 36 L72 14 L88 58 L104 24 L118 36 H144 L158 36 L172 22 L186 50 L198 36 H220"
                  />
                  <path
                    className="pulse"
                    pathLength="300"
                    d="M0 36 H42 L58 36 L72 14 L88 58 L104 24 L118 36 H144 L158 36 L172 22 L186 50 L198 36 H220"
                  />
                </svg>
              </div> */}
              <a href="mailto:ayush.trillionarie@gmail.com">ayush.trillionarie@gmail.com</a>
              <a href="https://www.linkedin.com/in/ayush-saini-858357200/" target="_blank" rel="noreferrer">
                linkedin / ayush-saini-858357200
              </a>
              <a href="https://github.com/CinematicGenius007" target="_blank" rel="noreferrer">
                github / CinematicGenius007
              </a>
            </aside>
          </div>
        </section>

        <section className="hero-grid">
          <article className="lead-story">
            <p className="section-kicker">Front Page</p>
            <h2>
              Engineer who likes the hard part:
              <span> understanding why a system misbehaves in production.</span>
            </h2>
            <p className="dropcap">
              I work best where code, ownership, and ambiguity meet. Over the last couple of years I&apos;ve built features,
              debugged fragile systems, supported production-critical workflows, and helped younger engineers become
              effective contributors. My center of gravity is backend-heavy work, but I&apos;m comfortable wherever the
              system needs attention.
            </p>
          </article>

          <aside className="briefing-card">
            <p className="section-kicker">Field Notes</p>
            <ul>
              {notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="split-layout">
          <article className="column-story">
            <p className="section-kicker">Experience</p>
            <div className="timeline">
              {experiences.map((experience) => (
                <section className="timeline-item" key={`${experience.company}-${experience.title}`}>
                  <div className="timeline-heading">
                    <div>
                      <h3>{experience.company}</h3>
                      <p className="role-line">{experience.title}</p>
                    </div>
                    <div className="timeline-meta">
                      <span>{experience.period}</span>
                      <span>{experience.mode}</span>
                    </div>
                  </div>
                  <ul>
                    {experience.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </article>

          <aside className="side-column">
            <section className="side-card">
              <p className="section-kicker">Strengths</p>
              <ul className="tag-list">
                {strengths.map((strength) => (
                  <li key={strength}>{strength}</li>
                ))}
              </ul>
            </section>

            <section className="side-card">
              <p className="section-kicker">Education</p>
              <div className="education-block">
                <h3>Chitkara University</h3>
                <p>B.E. in Computer Science</p>
                <p>2020 - 2024</p>
                <strong>CGPA 9.95 / 10</strong>
              </div>
              <div className="education-block">
                <h3>CBSE Class XII</h3>
                <p>2020</p>
                <strong>96.4%</strong>
              </div>
            </section>

            <section className="side-card">
              <p className="section-kicker">Outside The IDE</p>
              <p>Member of the Debating Society. Theatre club participant. Comfortable in rooms where communication matters as much as code.</p>
            </section>
          </aside>
        </section>

        <section className="skill-ledger">
          <div className="ledger-heading">
            <p className="section-kicker">Ledger</p>
            <h2>Tools, languages, and the habits behind the work.</h2>
          </div>

          <div className="ledger-grid">
            {skillGroups.map((group) => (
              <article className="ledger-card" key={group.label}>
                <h3>{group.label}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="closing-note">
          <p className="section-kicker">Final Column</p>
          <div className="closing-grid">
            <div>
              <h2>Available for meaningful engineering conversations.</h2>
              <p>
                If you&apos;re hiring, building, or just want to talk through product, systems, or debugging problems, I&apos;m
                always happy to connect.
              </p>
            </div>
            <div className="closing-links">
              <a href="mailto:ayush.trillionarie@gmail.com">Send an email</a>
              <a href="https://www.linkedin.com/in/ayush-saini-858357200/" target="_blank" rel="noreferrer">
                Visit LinkedIn
              </a>
              <a href="https://github.com/CinematicGenius007" target="_blank" rel="noreferrer">
                Browse GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
