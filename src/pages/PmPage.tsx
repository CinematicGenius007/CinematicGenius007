import { contact } from "../content/profile";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

const caseStudies = [
  {
    company: "Optmyzr",
    role: "SDE I",
    period: "Aug 2024 →",
    meta: "Full-time",
    extra: "(Intern Apr 2023–Aug 2024)",
    title: "Owning the part of the product that touches someone's ad spend.",
    subtitle: "Campaign Automator · Rule Engine · Audits · Google Ads Scripts",
    context:
      "Four mature product surfaces, each one a path between a customer's intent and a real change in their Google Ads account. Any bug here costs the customer money.",
    shipped:
      "Criteria Filter View, Portfolios, and Portfolio Alerts — from spec, through design review, to production. Mentored four interns through onboarding.",
    signal:
      "On-call for the bugs other engineers hand off. Three of the four interns are still here.",
  },
  {
    company: "Zariya (Oddmind)",
    role: "Founding engineer",
    period: "Late 2024 →",
    meta: "Part-time",
    title: "Picking the stack and writing the first feature of an early-stage SaaS.",
    subtitle: "Next.js · Express · AI-assisted products",
    context:
      "Founder team with a product idea, no repo, no architectural decisions made. Needed someone who'd ship the zero-to-one and stay around.",
    shipped:
      "Repo, stack, first working product (interviews.zariya.ai). Ongoing contributor across architecture and hiring.",
    signal:
      "Still the engineer the founders ping when production looks wrong.",
  },
];

const projects = [
  {
    number: "01 / interviews.zariya.ai",
    href: "https://interviews.zariya.ai",
    title: "Interview practice that actually pushes back.",
    body:
      "Mid-answer follow-ups and specific scoring, not a scripted chatbot. Built because every other practice tool felt like talking to a wall.",
    outcome: "Scope: 0→1 product · Role: eng lead",
  },
  {
    number: "02 / sudoku-solver",
    href: "https://sudoku-solver.cinematicgenius007.com",
    title: "Two algorithms, same board, visible.",
    body:
      "Brute-force vs. constraint-propagation, racing step by step. Makes \"the smart one is faster\" legible to non-programmers.",
    outcome: "Scope: solo build · Role: everything",
  },
  {
    number: "03 / ultimate-ttt",
    href: "https://ultimate-ttt.cinematicgenius007.com",
    title: "Tic-tac-toe, strategic.",
    body:
      "Your move dictates the opponent's next sub-board. Weekend build; better than slide-deck game-theory.",
    outcome: "Scope: weekend · Role: solo",
  },
];

const profileScope = [
  "4 product surfaces at Optmyzr (ad-tech, paid seats)",
  "Stack + first-feature decisions at Zariya (SaaS, 0→1)",
  "4 interns mentored (3 retained)",
  "CS, Chitkara · CGPA 9.95 · 2024",
];

export default function PmPage({ mode }: Props) {
  return (
    <main className="pm-page">
      <section className="pm-hero">
        <div className="pm-hero__left">
          <p className="pm-hero__tag">01 · Brief for a product hiring manager</p>
          <h1>
            Ayush Saini
            <br />
            <span className="pm-hero__dash">—</span>
            <br />
            engineer who can hold
            <br />
            a product conversation.
          </h1>
          <p className="pm-hero__lede">
            SDE at Optmyzr (ad-tech). Founding engineer at Zariya (early-stage). Two years of building
            the thing, debugging it at night, and explaining to a non-engineer why it broke in the
            morning.
          </p>
        </div>
        <div className="pm-hero__right">
          <b>Scope</b>
          4 product surfaces at Optmyzr.
          <br />
          <b>Decision radius</b>
          Stack, repo, first features at Zariya.
          <br />
          <b>Team</b>
          4 interns mentored; 3 stayed.
          <br />
          <b>Based in</b>
          India · remote-friendly.
          <br />
          <b>Available for</b>
          Engineering or PM-adjacent.
        </div>
      </section>

      <div className="pm-sec-head">
        <span className="pm-mono pm-eyebrow">02</span>
        <span className="pm-mono pm-mute">CASES</span>
      </div>
      <div className="pm-sec-rule" />
      <section className="pm-cases">
        {caseStudies.map((item) => (
          <article className="pm-case" key={item.company}>
            <div className="pm-case__meta">
              <b>{item.company}</b>
              {item.role}
              <br />
              {item.period}
              <br />
              {item.meta}
              {item.extra ? (
                <>
                  <br />
                  <br />
                  {item.extra}
                </>
              ) : null}
            </div>
            <div className="pm-case__body">
              <h3>{item.title}</h3>
              <p className="pm-case__sub">{item.subtitle}</p>
              <div className="pm-csr">
                <span>Context</span>
                <p>{item.context}</p>
                <span>Shipped</span>
                <p>{item.shipped}</p>
                <span>Signal</span>
                <p>{item.signal}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="pm-sec-head">
        <span className="pm-mono pm-eyebrow">03</span>
        <span className="pm-mono pm-mute">PROJECTS (PROBLEM → OUTCOME)</span>
      </div>
      <div className="pm-sec-rule" />
      <section className="pm-proj-grid">
        {projects.map((project) => (
          <a
            className="pm-proj"
            key={project.number}
            href={project.href}
            target="_blank"
            rel="noreferrer"
          >
            <p className="pm-proj__num">{project.number}</p>
            <h4>{project.title}</h4>
            <p className="pm-proj__body">{project.body}</p>
            <div className="pm-proj__footer">
              <p className="pm-proj__outcome">{project.outcome}</p>
              <span className="pm-proj__arrow">↗</span>
            </div>
          </a>
        ))}
      </section>

      <div className="pm-sec-head">
        <span className="pm-mono pm-eyebrow">04</span>
        <span className="pm-mono pm-mute">PROFILE</span>
      </div>
      <div className="pm-sec-rule" />
      <section className="pm-profile">
        <div>
          <h3>How I work</h3>
          <p>
            Backend-leaning full-stack. Prefers a boring, correct V1 over a clever V1. Writes specs
            back to stakeholders in their own words before I start — it&apos;s cheap and catches 60% of
            the bad ideas.
          </p>
          <h3 className="pm-profile__spaced">Outside of code</h3>
          <p>
            Debate society and theatre through college. Useful at Optmyzr — half my job is explaining a
            code-shaped problem to a non-code-shaped person.
          </p>
        </div>
        <div>
          <h3>Scope I&apos;ve carried</h3>
          <ul>
            {profileScope.map((item) => (
              <li key={item}>→ {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pm-contact">
        <div>
          <h2>Open to engineer or engineer-adjacent product roles.</h2>
          <p>{contact.body.pm ?? contact.body._default}</p>
        </div>
        <div className="pm-contact__links">
          <a href="mailto:ayush.trillionarie@gmail.com">EMAIL ↗</a>
          <a href="https://www.linkedin.com/in/ayush-saini-858357200/" target="_blank" rel="noreferrer">
            LINKEDIN ↗
          </a>
          <a href="https://github.com/CinematicGenius007" target="_blank" rel="noreferrer">
            GITHUB ↗
          </a>
        </div>
      </section>

      <footer className="pm-foot">
        <span>AYUSH SAINI · CINEMATICGENIUS007.COM · © 2026</span>
        <span className="pm-pill">
          VIEWING AS <b>{mode.toUpperCase()}</b> · CHANGE
        </span>
      </footer>
    </main>
  );
}
