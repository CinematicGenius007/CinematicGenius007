import { useEffect, useRef, useState, type ReactNode } from "react";
import { experienceRows } from "./dataContent";
import { contacts } from "../content/contacts";
import { education, projects as spineProjects, skillGroups, strengths } from "../content/profile";
import { useMotionPreference } from "../engine/useMotionPreference";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

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
  // supported grammar: name, name.key, name[i], name[i].key — nothing else.
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

function QueryCell({ index }: { index: number }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const exec = (q: string) => {
    setQuery(q);
    setResult(runQuery(q));
  };

  return (
    <>
      <div className="data-cell">
        <div className="data-lbl">In [{index}]:</div>
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
              placeholder="query the career — e.g. experience[0].company"
              aria-label="Career query"
              spellCheck={false}
            />
            <button type="submit">run ▶</button>
          </form>
          <div className="data-query__suggestions">
            {QUERY_SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => exec(s)} type="button">
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
      {result !== null ? (
        <div className="data-cell">
          <div className="data-lbl data-lbl--out">Out[{index}]:</div>
          <pre className="data-query__result">{result}</pre>
        </div>
      ) : null}
    </>
  );
}

/* ── runnable cell pair: In prose + Out payload, gated by kernel run ── */

function Cell({
  index,
  ran,
  busy,
  onRun,
  input,
  output,
}: {
  index: number;
  ran: boolean;
  busy: boolean;
  onRun: () => void;
  input: ReactNode;
  output: ReactNode;
}) {
  return (
    <>
      <div className="data-cell">
        <div className="data-lbl">
          In [{ran ? index : " "}]:
          <button className="data-run" onClick={onRun} disabled={ran || busy} aria-label={`Run cell ${index}`}>
            {busy ? "◌" : "▶"}
          </button>
        </div>
        <div className="data-prose">{input}</div>
      </div>
      {ran ? (
        <div className="data-cell data-cell--fresh">
          <div className="data-lbl data-lbl--out">Out[{index}]:</div>
          {output}
        </div>
      ) : busy ? (
        <div className="data-cell">
          <div className="data-lbl data-lbl--out">&nbsp;</div>
          <p className="data-busy">executing…</p>
        </div>
      ) : null}
    </>
  );
}

/* ── page ── */

const CELL_COUNT = 6;

export default function DataPage({ mode }: Props) {
  const { level: motion } = useMotionPreference();
  // reduced/calm: notebook arrives pre-executed; full: you run it
  const [ranThrough, setRanThrough] = useState(() => (motion === "full" ? 0 : CELL_COUNT));
  const [busy, setBusy] = useState(false);
  const timerRef = useRef<number[]>([]);

  useEffect(() => {
    if (motion !== "full") setRanThrough(CELL_COUNT);
  }, [motion]);

  useEffect(() => () => timerRef.current.forEach((t) => window.clearTimeout(t)), []);

  const runTo = (target: number) => {
    if (target <= ranThrough || busy) return;
    setBusy(true);
    let current = ranThrough;
    const step = () => {
      current++;
      setRanThrough(current);
      if (current < target) {
        timerRef.current.push(window.setTimeout(step, 260 + Math.random() * 320));
      } else {
        setBusy(false);
      }
    };
    timerRef.current.push(window.setTimeout(step, 220 + Math.random() * 240));
  };

  const kernelState = busy ? "busy ●" : "idle ○";
  const cellProps = (i: number) => ({
    index: i,
    ran: ranThrough >= i,
    busy: busy && ranThrough === i - 1,
    onRun: () => runTo(i),
  });

  return (
    <main className="data-page">
      <div className="data-topbar">
        <span>
          <b>career.ipynb</b> · kernel: ayush3.2 · {kernelState}
        </span>
        <span>
          {ranThrough < CELL_COUNT ? (
            <button className="data-runall" onClick={() => runTo(CELL_COUNT)} disabled={busy}>
              ▶▶ run all cells
            </button>
          ) : (
            `all ${CELL_COUNT} cells executed`
          )}
        </span>
      </div>

      <h1 className="data-title">Ayush Saini — profile, as data.</h1>
      <p className="data-subtitle">
        Same portfolio, served structured. {motion === "full" ? "The cells actually run — hit ▶ or run all." : "Pre-executed for your reading comfort."}
      </p>

      <Cell
        {...cellProps(1)}
        input={
          <>
            <h2>About</h2>
            <p>
              Full-stack engineer at Optmyzr (ad-tech, C# / TS) since 2023 — AI campaign creation, portfolios, alerts,
              audits, scripts, automation, production bugs. Architectural engineer at Zariya AI since late 2024 —
              software design and server infrastructure. This notebook is the source-of-truth version of the
              portfolio; the other ten modes are queries over it.
            </p>
          </>
        }
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

      <Cell
        {...cellProps(2)}
        input={<p>Experience, as a frame:</p>}
        output={
          <table className="data-table data-table--framed">
            <thead>
              <tr>
                <th>#</th>
                <th>company</th>
                <th>role</th>
                <th>start</th>
                <th>end</th>
                <th>scope</th>
              </tr>
            </thead>
            <tbody>
              {experienceRows.map(([index, company, role, start, end, scope]) => (
                <tr key={index}>
                  <td className="data-table__idx">{index}</td>
                  <td>{index === "0" || index === "2" ? <b>{company}</b> : company}</td>
                  <td>{role}</td>
                  <td>{start}</td>
                  <td className={end === "current" ? "data-table__green" : undefined}>{end}</td>
                  <td>{scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      />

      <Cell
        {...cellProps(3)}
        input={<p>Projects — live URLs, the stack, and the one-line problem each solves:</p>}
        output={
          <div className="data-codeblk">
            <span className="data-codeblk__kw">projects</span> = [
            {spineProjects.map((p) => (
              <span key={p.id}>
                <br />
                &nbsp;&nbsp;{"{"} <span className="data-codeblk__str">"id"</span>: <span className="data-codeblk__str">"{p.id}"</span>,{" "}
                <span className="data-codeblk__str">"url"</span>: <span className="data-codeblk__str">"{p.url}"</span>,{" "}
                <span className="data-codeblk__str">"stack"</span>: [{p.tech.map((t, i) => (
                  <span key={t}>
                    <span className="data-codeblk__str">"{t}"</span>
                    {i < p.tech.length - 1 ? ", " : ""}
                  </span>
                ))}], <span className="data-codeblk__str">"status"</span>: <span className="data-codeblk__str">"live"</span> {"},"}
              </span>
            ))}
            <br />]
          </div>
        }
      />

      <Cell
        {...cellProps(4)}
        input={<p>Stack usage, by rough weekly hours. Qualitative — take the shape, not the exact bar length.</p>}
        output={
          <div className="data-chart">
            <h4>stack · approx. weekly hours (q2 2026)</h4>
            {[
              ["C#", "82%", "~33h"],
              ["TypeScript", "62%", "~25h"],
              ["Next.js / React", "42%", "~17h"],
              ["MS SQL", "22%", "~9h"],
              ["Go / Java", "8%", "~3h"],
            ].map(([label, width, value]) => (
              <div className="data-bar-row" key={label}>
                <span>{label}</span>
                <span className="data-bar">
                  <i style={{ width }} />
                </span>
                <span className="data-bar-row__value">{value}</span>
              </div>
            ))}
          </div>
        }
      />

      <Cell
        {...cellProps(5)}
        input={
          <p>Timeline of roles on a single axis. Overlap is intentional — Zariya AI started while Optmyzr was already full-time.</p>
        }
        output={
          <div className="data-timeline">
            <h4>timeline</h4>
            <div className="data-tl">
              <div className="data-tl__axis" />
              {[
                ["0%", "'20"],
                ["20%", "'21"],
                ["40%", "'22"],
                ["60%", "'23"],
                ["80%", "'24"],
                ["100%", "'26"],
              ].map(([left, year]) => (
                <div key={year}>
                  <div className="data-tl__tick" style={{ left }} />
                  <div className="data-tl__year" style={{ left }}>
                    {year}
                  </div>
                </div>
              ))}
              <div className="data-tl__segment data-tl__segment--chit" style={{ left: "0%", width: "80%" }} />
              <div className="data-tl__label" style={{ left: "2%", top: "calc(50% - 36px)" }}>
                Chitkara B.E.
              </div>
              <div className="data-tl__segment data-tl__segment--opt" style={{ left: "62%", width: "38%" }} />
              <div className="data-tl__label data-tl__label--strong" style={{ left: "64%", top: "calc(50% - 36px)" }}>
                Optmyzr (intern → FT)
              </div>
              <div className="data-tl__segment data-tl__segment--zar" style={{ left: "84%", width: "16%" }} />
              <div className="data-tl__label data-tl__label--zar" style={{ left: "84%", top: "calc(50% + 26px)" }}>
                Zariya AI
              </div>
            </div>
          </div>
        }
      />

      <Cell
        {...cellProps(6)}
        input={
          <>
            <h2>Contact</h2>
            <p>
              Queryable like everything else. The prose version lives in <code>?as=engineer</code>.
            </p>
          </>
        }
        output={
          <div className="data-codeblk">
            <span className="data-codeblk__kw">contact</span> = {"{"}
            <br />
            &nbsp;&nbsp;<span className="data-codeblk__str">"email"</span>: <span className="data-codeblk__str">"{contacts.email}"</span>,
            <br />
            &nbsp;&nbsp;<span className="data-codeblk__str">"linkedin"</span>: <span className="data-codeblk__str">"/in/ayush-saini-858357200"</span>,
            <br />
            &nbsp;&nbsp;<span className="data-codeblk__str">"github"</span>: <span className="data-codeblk__str">"/CinematicGenius007"</span>,
            <br />
            &nbsp;&nbsp;<span className="data-codeblk__str">"open_to"</span>: [<span className="data-codeblk__str">"eng"</span>, <span className="data-codeblk__str">"eng-adjacent product"</span>, <span className="data-codeblk__str">"weird bugs"</span>]
            <br />
            {"}"}
          </div>
        }
      />

      <QueryCell index={7} />

      <div className="data-contact-links">
        <a href={contacts.emailHref}>email ↗</a>
        <a href={contacts.linkedin} target="_blank" rel="noreferrer">
          linkedin ↗
        </a>
        <a href={contacts.github} target="_blank" rel="noreferrer">
          github ↗
        </a>
      </div>

      <footer className="data-foot">
        <span>ayush saini · cinematicgenius007.com · © 2026</span>
        <span className="data-pill">
          viewing as <b>{mode}</b> · change
        </span>
      </footer>
    </main>
  );
}
