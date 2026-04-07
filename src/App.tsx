type Experience = {
  title: string;
  company: string;
  period: string;
  mode: string;
  bullets: string[];
};

type Project = {
  number: string;
  name: string;
  description: string;
  tech: string[];
  url: string;
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

const projects: Project[] = [
  {
    number: "p.01",
    name: "Interviews by Zariya",
    description:
      "An AI interviewer platform I initiated with Oddmind to make interview practice sharper and more realistic. Built as a focused product around conversational evaluation and feedback loops.",
    tech: ["AI", "Product", "Full Stack"],
    url: "https://interviews.zariya.ai/",
  },
  {
    number: "p.02",
    name: "Sudoku Solver",
    description:
      "Two algorithms - brute force and intelligent - solving the same board in real time. Every step, guess, and backtrack animated. Built to make the difference between strategy and exhaustion visible.",
    tech: ["Next.js", "TypeScript", "CSS"],
    url: "https://sudoku-solver.cinematicgenius007.com/",
  },
  {
    number: "p.03",
    name: "Ultimate TTT",
    description:
      "Tic-tac-toe inside tic-tac-toe. Your move dictates where your opponent must play next. Simple rules, deep strategy - a two-player game that rewards thinking a move ahead.",
    tech: ["React", "Vite", "TypeScript"],
    url: "https://ultimate-ttt.cinematicgenius007.com/",
  },
];

function App() {
  return (
    <div className="page-shell">
      <main className="front-page">
        <section className="hero">
          <p className="hero-marker">01 / INTRODUCTION</p>
          <div className="hero-name-wrap">
            <h1>AYUSH SAINI</h1>
            <div className="hero-geometry" aria-hidden="true" />
          </div>
          <p className="hero-role">SOFTWARE ENGINEER - FULL STACK</p>
          <p className="hero-statement">&quot;I work best where code, ownership, and ambiguity meet.&quot;</p>
          <p className="hero-scroll">↓ scroll</p>
        </section>

        <section className="about-section section-block">
          <div className="section-head">
            <p className="section-number">02</p>
            <p className="section-kicker">THE WORK</p>
          </div>
          <div className="section-rule" />
          <div className="about-grid">
            <article className="about-copy">
              <p>
                I gravitate toward high-ownership problems where unclear systems need to become reliable. Over the last
                couple of years I&apos;ve built features,
                debugged fragile systems, and supported production-critical workflows.
              </p>
              <p>
                My center of gravity is backend-heavy work, but I&apos;m comfortable wherever the system needs attention. I also
                enjoy helping younger developers become effective contributors.
              </p>
            </article>
            <aside className="field-notes">
              {notes.map((note) => (
                <p key={note}>
                  <span>//</span>
                  {note}
                </p>
              ))}
            </aside>
          </div>
        </section>

        <section className="experience-section section-block">
          <div className="section-head">
            <p className="section-number">03</p>
            <p className="section-kicker">EXPERIENCE</p>
          </div>
          <div className="section-rule" />
          <div className="experience-list">
            {experiences.map((experience) => (
              <article className="experience-item" key={`${experience.company}-${experience.title}`}>
                <p className="experience-period">{experience.period}</p>
                <div className="experience-main">
                  <h3>{experience.company}</h3>
                  <p className="experience-role">{experience.title}</p>
                  <p className="experience-mode">{experience.mode}</p>
                  <ul>
                    {experience.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="projects-section section-block">
          <div className="section-head">
            <p className="section-number">04</p>
            <p className="section-kicker">PROJECTS</p>
          </div>
          <div className="section-rule" />
          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className="project-top">
                  <p>{project.number}</p>
                  <a href={project.url} target="_blank" rel="noreferrer">
                    STATUS: LIVE ↗
                  </a>
                </div>
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-rule" />
                <ul className="project-tech">
                  {project.tech.map((item) => (
                    <li key={`${project.number}-${item}`}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="profile-section section-block">
          <div className="section-head">
            <p className="section-number">05</p>
            <p className="section-kicker">SKILLS &amp; PROFILE</p>
          </div>
          <div className="section-rule" />
          <div className="skills-row">
            {skillGroups.map((group) => (
              <article className="skill-column" key={group.label}>
                <h3>{group.label}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="strength-row">
            {strengths.map((strength) => (
              <p key={strength}>
                <span>//</span>
                {strength}
              </p>
            ))}
          </div>
          <div className="bio-row">
            <article className="education-column">
              <div className="education-block">
                <h3>Chitkara University</h3>
                <p>B.E. in Computer Science</p>
                <p>2020 - 2024</p>
                <p>CGPA 9.95 / 10</p>
              </div>
              <div className="education-block">
                <h3>CBSE Class XII</h3>
                <p>2020</p>
                <p>96.4%</p>
              </div>
            </article>
            <article className="outside-column">
              <p>
                Member of the Debating Society. Theatre club participant. Comfortable in rooms where communication matters
                as much as code.
              </p>
            </article>
          </div>
        </section>

        <section className="contact-section section-block">
          <div className="section-head">
            <p className="section-number">06</p>
            <p className="section-kicker">CONTACT</p>
          </div>
          <div className="section-rule" />
          <div className="contact-grid">
            <div>
              <h2>Available for meaningful engineering conversations.</h2>
              <p>
                If you&apos;re hiring, building, or just want to talk through product, systems, or debugging problems, I&apos;m
                always happy to connect.
              </p>
            </div>
            <div className="contact-links">
              <a href="mailto:ayush.trillionarie@gmail.com">EMAIL ↗</a>
              <a href="https://www.linkedin.com/in/ayush-saini-858357200/" target="_blank" rel="noreferrer">
                LINKEDIN ↗
              </a>
              <a href="https://github.com/CinematicGenius007" target="_blank" rel="noreferrer">
                GITHUB ↗
              </a>
            </div>
          </div>
          <div className="contact-footer">
            <div className="section-rule" />
            <p>AYUSH SAINI / CINEMATICGENIUS007.COM / © {new Date().getFullYear()}</p>
          </div>
        </section>

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
      </main>
    </div>
  );
}

export default App;
