import { useState } from "react";
import { contact } from "../content/profile";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };
type ProgramLens = "launch" | "scale" | "stabilize";

const caseStudies = [
  {
    company: "Optmyzr",
    role: "SDE I",
    period: "Aug 2024 →",
    meta: "Full-time",
    extra: "(Intern Apr 2023–Aug 2024)",
    title: "Building across the product suite that supports real ad spend.",
    subtitle: "AI Campaign Creation · Portfolios · Alerts · Audits · Scripts · Automation",
    context:
      "A mature ad-tech suite where dashboards, alerts, audits, scripts, automation, and campaign creation flows translate user intent into decisions that can affect real budgets.",
    shipped:
      "AI campaign creation from scratch, portfolio-level alerts, portfolio support across dashboards and tools, Campaign Automator features/fixes, and ongoing Google Ads Scripts maintenance.",
    signal:
      "Strong bug-duty record across many product surfaces; trusted with new feature ownership and messy production issues.",
  },
  {
    company: "Zariya AI (Oddmind)",
    role: "Architectural engineer",
    period: "Late 2024 →",
    meta: "Part-time",
    title: "Designing the product architecture and keeping the servers alive.",
    subtitle: "Architecture · Infrastructure · AI-assisted products",
    context:
      "Early-stage AI SaaS with multiple products, a small team, and a codebase that has needed both 0-to-1 building and architectural correction.",
    shipped:
      "Software architecture, server infrastructure, product rebuilds, multiple features from scratch, and Interviews by Zariya.",
    signal:
      "Primary owner for infrastructure and production stability; architectural point of contact when the product needs reshaping.",
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
  "AI campaign creation owned end-to-end at Optmyzr",
  "Portfolio-level alerts and portfolio support across Optmyzr",
  "Google Ads Scripts maintenance, features, bugs, and customer queries",
  "Architecture + infrastructure ownership at Zariya AI",
  "CS, Chitkara · CGPA 9.95 · 2024",
];

const programLenses: {
  id: ProgramLens;
  label: string;
  title: string;
  summary: string;
  decision: string;
  risk: string;
  metric: string;
  workstreams: {
    lane: string;
    items: string[];
  }[];
}[] = [
  {
    id: "launch",
    label: "Launch",
    title: "AI campaign creation from zero to usable product.",
    summary:
      "Turn an ambiguous AI-assisted workflow into a production surface: define the shape, build the path, keep correctness visible, and ship without hiding behind demo magic.",
    decision: "Bias toward a boring, inspectable V1 before clever automation.",
    risk: "AI output can look confident while still being wrong for a real ad account.",
    metric: "0→1 owned build",
    workstreams: [
      { lane: "Scope", items: ["Campaign creation flow", "User intent capture", "Reviewable output"] },
      { lane: "Delivery", items: ["Backend path", "UI states", "Production release"] },
      { lane: "Alignment", items: ["Tradeoff notes", "Edge-case handling", "Stakeholder language"] },
    ],
  },
  {
    id: "scale",
    label: "Scale",
    title: "Portfolio support across surfaces, not as a one-off patch.",
    summary:
      "Portfolio work touched dashboards, audits, alerts, and account-level views. The program problem was consistency: make the same idea behave across multiple product contexts.",
    decision: "Treat portfolio as a system capability, not a screen-specific feature.",
    risk: "A partial rollout creates inconsistent customer expectations across tools.",
    metric: "Portfolio alerts created",
    workstreams: [
      { lane: "Surfaces", items: ["Portfolio Dashboard", "All Account Dashboard", "Audits + Alerts"] },
      { lane: "Dependencies", items: ["Shared assumptions", "Data shape", "Alert semantics"] },
      { lane: "Outcome", items: ["Portfolio-level alerts", "Broader support", "Cleaner mental model"] },
    ],
  },
  {
    id: "stabilize",
    label: "Stabilize",
    title: "Maintenance, bugs, and infrastructure as the real operating system.",
    summary:
      "Campaign Automator, Scripts, bug duty, and Zariya AI infrastructure all point to the same program skill: keep the system understandable when the easy version has stopped working.",
    decision: "Fix the system shape when local patches are creating more drag.",
    risk: "Production issues multiply when ownership boundaries are fuzzy.",
    metric: "Infra + bug-duty owner",
    workstreams: [
      { lane: "Reliability", items: ["Scripts support", "Campaign Automator fixes", "Customer queries"] },
      { lane: "Architecture", items: ["Zariya AI servers", "Product resets", "Software design"] },
      { lane: "Communication", items: ["Explain failures", "Translate tradeoffs", "Close loops"] },
    ],
  },
];

export default function PmPage({ mode }: Props) {
  const [activeLens, setActiveLens] = useState<ProgramLens>("launch");
  const program = programLenses.find((item) => item.id === activeLens) ?? programLenses[0];

  return (
    <main className="pm-page">
      <section className="pm-hero">
        <div className="pm-hero__left">
          <p className="pm-hero__tag">01 · Brief for a program hiring manager</p>
          <h1>
            Ayush Saini
            <br />
            <span className="pm-hero__dash">—</span>
            <br />
            engineer who can run
            <br />
            the program room.
          </h1>
          <p className="pm-hero__lede">
            SDE at Optmyzr (ad-tech). Architectural engineer at Zariya AI (early-stage). Two years of
            turning ambiguous work into shippable scope, dependency maps, risk calls, and production
            follow-through.
          </p>
        </div>
        <div className="pm-hero__right">
          <b>Scope</b>
          AI campaign creation, portfolios, alerts, audits, scripts.
          <br />
          <b>Decision radius</b>
          Architecture, infrastructure, product resets at Zariya AI.
          <br />
          <b>Strength</b>
          Bug duty across a wide product suite.
          <br />
          <b>Based in</b>
          India · remote-friendly.
          <br />
          <b>Available for</b>
          Engineering, TPM, or program-heavy product work.
        </div>
      </section>

      <section className="pm-control" aria-label="Program control room">
        <div className="pm-control__top">
          <div>
            <span className="pm-mono pm-eyebrow">02</span>
            <h2>Program control room</h2>
          </div>
          <div className="pm-control__tabs" aria-label="Program lens">
            {programLenses.map((item) => (
              <button
                key={item.id}
                className={`pm-control__tab${activeLens === item.id ? " pm-control__tab--active" : ""}`}
                onClick={() => setActiveLens(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pm-control__grid">
          <article className="pm-program-card">
            <p className="pm-program-card__metric">{program.metric}</p>
            <h3>{program.title}</h3>
            <p>{program.summary}</p>
            <div className="pm-program-card__decision">
              <span>Decision</span>
              <p>{program.decision}</p>
            </div>
            <div className="pm-program-card__risk">
              <span>Risk</span>
              <p>{program.risk}</p>
            </div>
          </article>

          <div className="pm-workstreams">
            {program.workstreams.map((lane, index) => (
              <article className="pm-workstream" key={lane.lane}>
                <div className="pm-workstream__head">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{lane.lane}</h3>
                </div>
                <ul>
                  {lane.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="pm-sec-head">
        <span className="pm-mono pm-eyebrow">03</span>
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
        <span className="pm-mono pm-eyebrow">04</span>
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
        <span className="pm-mono pm-eyebrow">05</span>
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
          <h2>Open to engineer, TPM, or program-heavy product roles.</h2>
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
