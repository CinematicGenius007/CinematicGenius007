import { useEffect, useRef, useState, type ReactNode } from "react";
import { experienceRows } from "./dataContent";
import { contacts } from "../content/contacts";
import { education, projects as spineProjects, skillGroups, strengths } from "../content/profile";
import { revealOnScroll } from "../engine/animation";
import { useMotionPreference } from "../engine/useMotionPreference";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };
type LensId = "scope" | "systems" | "proof";

/* ── queryable career: a tiny evaluator over the content spine ── */

const QUERY_SCOPE: Record<string, unknown> = {
  profile: {
    name: "Ayush Saini",
    role: "Software Engineer — Full Stack",
    based_in: "India",
    years_professional: 3.2,
    strengths,
  },
  experience: experienceRows.map(([, company, role, start, end, scope]) => ({
    company,
    role,
    start,
    end,
    scope,
  })),
  projects: spineProjects.map((p) => ({ id: p.id, name: p.name, url: p.url, stack: p.tech })),
  skills: Object.fromEntries(skillGroups.map((g) => [g.label.toLowerCase().replace(/\s+/g, "_"), g.items])),
  education: education.map((e) => ({ school: e.school, degree: e.degree || undefined, period: e.period, result: e.result })),
  contact: {
    email: contacts.email,
    linkedin: "/in/ayush-saini-858357200",
    github: "/CinematicGenius007",
    open_to: ["eng", "eng-adjacent product", "weird bugs"],
  },
};

function runQuery(raw: string): string {
  const q = raw.trim();
  if (!q) return "";
  const m = q.match(/^(\w+)((?:\.\w+|\[\d+\])*)$/);
  if (!m) return `SyntaxError: try something like  experience[0].company  or  profile.strengths`;
  let cur: any = QUERY_SCOPE[m[1]];
  if (cur === undefined) return `NameError: name '${m[1]}' is not defined — try: ${Object.keys(QUERY_SCOPE).join(", ")}`;
  const path = m[2].match(/\.\w+|\[\d+\]/g) ?? [];
  for (const part of path) {
    if (part.startsWith(".")) cur = cur?.[part.slice(1)];
    else cur = cur?.[Number(part.slice(1, -1))];
    if (cur === undefined) return `KeyError: ${part} — the data is real, the key isn't`;
  }
  return JSON.stringify(cur, null, 2);
}

const QUERY_SUGGESTIONS = ["profile.strengths", "experience[0]", "projects[1].url", "skills.languages", "contact.email"];

const CELL_COUNT = 5;

const metricStrip = [
  { value: "3.2", label: "years professional", note: "Optmyzr + early-stage architecture" },
  { value: "2", label: "active workstreams", note: "SDE I and architectural engineer" },
  { value: "3", label: "live project proofs", note: "interviews, sudoku, ultimate ttt" },
  { value: "9.95", label: "cgpa", note: "Chitkara University CSE" },
];

const lenses: Record<LensId, { label: string; question: string; signal: string; interpretation: string }> = {
  scope: {
    label: "Scope",
    question: "Where does the work touch production?",
    signal: "Ad-tech product surfaces, portfolio workflows, alerts, audits, scripts, and AI campaign creation.",
    interpretation: "Useful where correctness, customer-facing behavior, and legacy context all meet.",
  },
  systems: {
    label: "Systems",
    question: "Can the same person work below the surface?",
    signal: "Server infrastructure, architecture resets, 0-to-1 product foundations, and debugging across product boundaries.",
    interpretation: "Backend-first, but comfortable translating system shape into product behavior.",
  },
  proof: {
    label: "Proof",
    question: "What can be inspected instead of trusted?",
    signal: "Runnable query cell, live projects, evidence table, and project outcomes mapped to real URLs.",
    interpretation: "The page behaves like the work: structured, explainable, and open to inspection.",
  },
};

const signalNodes = [
  { id: "ai", label: "AI campaign creation", lens: "scope", x: 70, y: 18 },
  { id: "alerts", label: "Portfolio alerts", lens: "scope", x: 86, y: 54 },
  { id: "scripts", label: "Scripts + automation", lens: "scope", x: 62, y: 78 },
  { id: "infra", label: "Server infrastructure", lens: "systems", x: 28, y: 76 },
  { id: "arch", label: "Architecture reset", lens: "systems", x: 16, y: 40 },
  { id: "bugs", label: "Production bugs", lens: "systems", x: 38, y: 20 },
  { id: "urls", label: "Live URLs", lens: "proof", x: 48, y: 52 },
  { id: "query", label: "Queryable profile", lens: "proof", x: 72, y: 42 },
] as const;

const stackRows = [
  ["C#", 82, "~33h", "production backend"],
  ["TypeScript", 62, "~25h", "app logic"],
  ["Next.js / React", 42, "~17h", "product surfaces"],
  ["MS SQL", 22, "~9h", "data + debugging"],
  ["Go / Java", 8, "~3h", "testing context"],
] as const;

const timelineRows = [
  { label: "Chitkara B.E.", detail: "CSE · 9.95 CGPA", start: 0, width: 72, tone: "study" },
  { label: "JetBrains HS", detail: "Java + Go QA", start: 36, width: 20, tone: "test" },
  { label: "Optmyzr", detail: "intern → SDE I", start: 58, width: 42, tone: "work" },
  { label: "Zariya AI", detail: "architecture + infra", start: 82, width: 18, tone: "arch" },
];

function NotebookCell({
  index,
  title,
  label,
  ran,
  busy,
  onRun,
  input,
  output,
}: {
  index: number;
  title: string;
  label: string;
  ran: boolean;
  busy: boolean;
  onRun: () => void;
  input: ReactNode;
  output: ReactNode;
}) {
  return (
    <section className="data-cell data-reveal" aria-label={title}>
      <div className="data-lbl">
        <span>In [{ran ? index : " "}]:</span>
        <button className="data-run" onClick={onRun} disabled={ran || busy} aria-label={`Run ${title}`}>
          {busy ? "running" : "run"}
        </button>
      </div>
      <div className="data-cell__body">
        <div className="data-prose">
          <span>{label}</span>
          <h2>{title}</h2>
          {input}
        </div>
        {ran ? (
          <div className="data-output data-cell--fresh">
            <span className="data-lbl data-lbl--out">Out[{index}]:</span>
            {output}
          </div>
        ) : busy ? (
          <div className="data-busy">executing notebook cell...</div>
        ) : null}
      </div>
    </section>
  );
}

function QueryCell({ index }: { index: number }) {
  const [query, setQuery] = useState("profile.strengths");
  const [result, setResult] = useState<string | null>(() => runQuery("profile.strengths"));

  const exec = (q: string) => {
    setQuery(q);
    setResult(runQuery(q));
  };

  return (
    <section className="data-cell data-cell--query data-reveal" aria-label="Query the career">
      <div className="data-lbl">
        <span>In [{index}]:</span>
      </div>
      <div className="data-cell__body">
        <div className="data-prose">
          <span>Live check</span>
          <h2>Query the career</h2>
          <p>Use the small grammar this page exposes: names, keys, and array indexes. The output is generated from the portfolio content.</p>
        </div>
        <div className="data-query">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setResult(runQuery(query));
            }}
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="experience[0].company"
              aria-label="Career query"
              spellCheck={false}
            />
            <button type="submit">Run analysis</button>
          </form>
          <div className="data-query__suggestions">
            {QUERY_SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => exec(s)} type="button">
                {s}
              </button>
            ))}
          </div>
          {result !== null ? (
            <div className="data-output data-output--query">
              <span className="data-lbl data-lbl--out">Out[{index}]:</span>
              <pre className="data-query__result">{result}</pre>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function SignalMap({ activeLens }: { activeLens: LensId }) {
  return (
    <div className="data-signal-map" aria-label="Career signal map">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M18 40 C34 18, 56 18, 70 18 S88 34, 86 54 S70 74, 62 78 S40 84, 28 76 S12 58, 16 40" />
        <path d="M38 20 C48 36, 54 44, 48 52 S34 64, 28 76" />
        <path d="M48 52 C58 46, 64 42, 72 42 S82 48, 86 54" />
        <path d="M48 52 C52 64, 56 72, 62 78" />
      </svg>
      {signalNodes.map((node) => (
        <span
          key={node.id}
          className={`data-node${node.lens === activeLens ? " data-node--active" : ""}`}
          style={{ "--x": `${node.x}%`, "--y": `${node.y}%` } as React.CSSProperties}
        >
          {node.label}
        </span>
      ))}
      <b>Profile as data</b>
    </div>
  );
}

export default function DataPage({ mode }: Props) {
  const pageRef = useRef<HTMLElement>(null);
  const { level: motion } = useMotionPreference();
  const [activeLens, setActiveLens] = useState<LensId>("scope");
  const [ranThrough, setRanThrough] = useState(() => (motion === "full" ? 2 : CELL_COUNT));
  const [busy, setBusy] = useState(false);
  const timerRef = useRef<number[]>([]);

  useEffect(() => {
    if (motion !== "full") setRanThrough(CELL_COUNT);
  }, [motion]);

  useEffect(() => () => timerRef.current.forEach((t) => window.clearTimeout(t)), []);

  useEffect(() => {
    if (!pageRef.current) return;
    return revealOnScroll(pageRef.current, ".data-reveal", motion);
  }, [motion]);

  const runTo = (target: number) => {
    if (target <= ranThrough || busy) return;
    setBusy(true);
    let current = ranThrough;
    const step = () => {
      current++;
      setRanThrough(current);
      if (current < target) {
        timerRef.current.push(window.setTimeout(step, 220 + Math.random() * 220));
      } else {
        setBusy(false);
      }
    };
    timerRef.current.push(window.setTimeout(step, 180 + Math.random() * 180));
  };

  const lens = lenses[activeLens];
  const cellProps = (i: number) => ({
    index: i,
    ran: ranThrough >= i,
    busy: busy && ranThrough === i - 1,
    onRun: () => runTo(i),
  });

  return (
    <main className="data-page" ref={pageRef}>
      <div className="data-topbar">
        <span>
          <b>career.ipynb</b> · kernel: ayush3.2 · {busy ? "busy ●" : "idle ○"}
        </span>
        {ranThrough < CELL_COUNT ? (
          <button className="data-runall" onClick={() => runTo(CELL_COUNT)} disabled={busy} type="button">
            Run analysis
          </button>
        ) : (
          <span>all cells executed</span>
        )}
      </div>

      <section className="data-hero">
        <div className="data-hero__copy">
          <h1 className="data-title">Ayush Saini — profile, as data.</h1>
          <p className="data-subtitle">
            A live analysis notebook for the same portfolio facts: question, data, signal, interpretation, outcome.
            The cells run, the evidence stays inspectable, and the final query is yours.
          </p>
          <div className="data-lenses" role="tablist" aria-label="Analytical lens">
            {(Object.keys(lenses) as LensId[]).map((id) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={activeLens === id}
                className={activeLens === id ? "data-lens data-lens--active" : "data-lens"}
                onClick={() => setActiveLens(id)}
              >
                {lenses[id].label}
              </button>
            ))}
          </div>
        </div>
        <div className="data-hero__instrument">
          <SignalMap activeLens={activeLens} />
          <div className="data-question">
            <span>Question</span>
            <p>{lens.question}</p>
          </div>
        </div>
      </section>

      <section className="data-metric-strip data-reveal" aria-label="Profile metrics">
        {metricStrip.map((metric) => (
          <div className="data-metric" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            <p>{metric.note}</p>
          </div>
        ))}
      </section>

      <section className="data-lens-panel data-reveal" aria-live="polite">
        <div>
          <span>Signal</span>
          <p>{lens.signal}</p>
        </div>
        <div>
          <span>Interpretation</span>
          <p>{lens.interpretation}</p>
        </div>
        <div>
          <span>Outcome</span>
          <p>Readable proof for hiring conversations: breadth, systems judgment, and work that can be traced to shipped surfaces.</p>
        </div>
      </section>

      <div className="data-notebook">
        <NotebookCell
          {...cellProps(1)}
          label="Data"
          title="Evidence ledger"
          input={<p>Experience is treated as rows: company, role, time window, and the concrete scope attached to each row.</p>}
          output={
            <div className="data-table-shell">
              <table className="data-table data-table--framed">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>company</th>
                    <th>role</th>
                    <th>period</th>
                    <th>scope</th>
                  </tr>
                </thead>
                <tbody>
                  {experienceRows.map(([index, company, role, start, end, scope]) => (
                    <tr key={index}>
                      <td className="data-table__idx">{index}</td>
                      <td>{index === "0" || index === "2" ? <b>{company}</b> : company}</td>
                      <td>{role}</td>
                      <td>
                        {start} → <span className={end === "current" ? "data-table__green" : undefined}>{end}</span>
                      </td>
                      <td>{scope}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        />

        <NotebookCell
          {...cellProps(2)}
          label="Signal"
          title="Stack footprint"
          input={<p>Approximate weekly shape, not a timesheet. The useful read is where production attention clusters.</p>}
          output={
            <div className="data-chart">
              {stackRows.map(([label, width, value, note]) => (
                <div className="data-bar-row" key={label}>
                  <span>{label}</span>
                  <span className="data-bar" aria-hidden="true">
                    <i style={{ width: `${width}%` }} />
                  </span>
                  <span className="data-bar-row__value">{value}</span>
                  <em>{note}</em>
                </div>
              ))}
            </div>
          }
        />

        <NotebookCell
          {...cellProps(3)}
          label="Interpretation"
          title="Time axis"
          input={<p>Overlap matters: Optmyzr is the production spine; Zariya AI adds architecture and infrastructure depth.</p>}
          output={
            <div className="data-timeline">
              {timelineRows.map((row) => (
                <div className="data-tl-row" key={row.label}>
                  <div>
                    <strong>{row.label}</strong>
                    <span>{row.detail}</span>
                  </div>
                  <div className="data-tl-track">
                    <i
                      className={`data-tl-segment data-tl-segment--${row.tone}`}
                      style={{ left: `${row.start}%`, width: `${row.width}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="data-tl-years" aria-hidden="true">
                <span>2020</span>
                <span>2022</span>
                <span>2024</span>
                <span>now</span>
              </div>
            </div>
          }
        />

        <NotebookCell
          {...cellProps(4)}
          label="Outcome"
          title="Project proof"
          input={<p>Side projects are presented as evidence artifacts: problem, visible outcome, and stack.</p>}
          output={
            <div className="data-projects">
              {spineProjects.map((project) => (
                <a className="data-project" href={project.url} target="_blank" rel="noreferrer" key={project.id}>
                  <span>{project.number}</span>
                  <h3>{project.name}</h3>
                  <p>{project.pmProblem}</p>
                  <b>{project.pmOutcome}</b>
                  <small>{project.tech.join(" · ")}</small>
                </a>
              ))}
            </div>
          }
        />

        <NotebookCell
          {...cellProps(5)}
          label="Model"
          title="Structured profile"
          input={<p>The compact object view of the person behind the notebook.</p>}
          output={
            <div className="data-codeblk">
              <span className="data-codeblk__mute"># type: Profile</span>
              <br />
              <span className="data-codeblk__kw">profile</span> = {"{"}
              <br />
              &nbsp;&nbsp;<span className="data-codeblk__str">"name"</span>: <span className="data-codeblk__str">"Ayush Saini"</span>,
              <br />
              &nbsp;&nbsp;<span className="data-codeblk__str">"role"</span>: <span className="data-codeblk__str">"Software Engineer — Full Stack"</span>,
              <br />
              &nbsp;&nbsp;<span className="data-codeblk__str">"based_in"</span>: <span className="data-codeblk__str">"India"</span>,
              <br />
              &nbsp;&nbsp;<span className="data-codeblk__str">"strengths"</span>: [<span className="data-codeblk__str">"debugging"</span>, <span className="data-codeblk__str">"feature ownership"</span>, <span className="data-codeblk__str">"architecture"</span>, <span className="data-codeblk__str">"infrastructure"</span>],
              <br />
              &nbsp;&nbsp;<span className="data-codeblk__str">"primary_stack"</span>: [<span className="data-codeblk__str">"C#"</span>, <span className="data-codeblk__str">"TypeScript"</span>, <span className="data-codeblk__str">"Next.js"</span>, <span className="data-codeblk__str">"Express"</span>]
              <br />
              {"}"}
            </div>
          }
        />

        <QueryCell index={6} />
      </div>

      <section className="data-contact-links data-reveal" aria-label="Contact links">
        <a href={contacts.emailHref}>email</a>
        <a href={contacts.linkedin} target="_blank" rel="noreferrer">
          linkedin
        </a>
        <a href={contacts.github} target="_blank" rel="noreferrer">
          github
        </a>
      </section>

      <footer className="data-foot">
        <span>ayush saini · cinematicgenius007.com · © 2026</span>
        <span className="data-pill">
          viewing as <b>{mode}</b>
        </span>
      </footer>
    </main>
  );
}
