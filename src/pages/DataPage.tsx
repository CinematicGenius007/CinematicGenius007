import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

const experienceRows = [
  ["0", "Optmyzr", "SDE I", "Aug 2024", "current", "Rule Engine · Campaign Automator · Audits · GAds Scripts"],
  ["1", "Optmyzr", "Intern", "Apr 2023", "Aug 2024", "(promoted)"],
  ["2", "Zariya", "Founding Eng.", "Late 2024", "current", "Stack, repo, first V1; interviews.zariya.ai"],
  ["3", "JetBrains HS", "Tester", "2022", "2023", "Java + Go curriculum QA"],
];

export default function DataPage({ mode }: Props) {
  return (
    <main className="data-page">
      <div className="data-topbar">
        <span>
          <b>portfolio.ipynb</b> · kernel: python3 · last run Apr 2026
        </span>
        <span>as={mode} · cell 1 of 9</span>
      </div>

      <h1 className="data-title">Ayush Saini — profile, as data.</h1>
      <p className="data-subtitle">Same portfolio, served structured. Prose cells for context, output cells for the rows.</p>

      <div className="data-cell">
        <div className="data-lbl">In [1]:</div>
        <div className="data-prose">
          <h2>About</h2>
          <p>
            Full-stack engineer at Optmyzr (ad-tech, C# / TS) since 2023. Founding engineer at Zariya
            (early-stage SaaS) since late 2024. This notebook is the source-of-truth version of the
            portfolio — the other modes are just queries over this.
          </p>
        </div>
      </div>

      <div className="data-cell">
        <div className="data-lbl data-lbl--out">Out[1]:</div>
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
          &nbsp;&nbsp;<span className="data-codeblk__str">"years_professional"</span>: <span className="data-codeblk__num">2.0</span>,
          <br />
          &nbsp;&nbsp;<span className="data-codeblk__str">"strengths"</span>: [<span className="data-codeblk__str">"debugging"</span>, <span className="data-codeblk__str">"feature ownership"</span>, <span className="data-codeblk__str">"mentorship"</span>],
          <br />
          &nbsp;&nbsp;<span className="data-codeblk__str">"primary_stack"</span>: [<span className="data-codeblk__str">"C#"</span>, <span className="data-codeblk__str">"TypeScript"</span>, <span className="data-codeblk__str">"Next.js"</span>, <span className="data-codeblk__str">"Express"</span>]
          <br />
          {"}"}
        </div>
      </div>

      <div className="data-cell">
        <div className="data-lbl">In [2]:</div>
        <div className="data-prose">
          <p>Experience, as a frame:</p>
        </div>
      </div>

      <div className="data-cell">
        <div className="data-lbl data-lbl--out">Out[2]:</div>
        <div>
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
        </div>
      </div>

      <div className="data-cell">
        <div className="data-lbl">In [3]:</div>
        <div className="data-prose">
          <p>Projects — live URLs, the stack, and the one-line problem each solves:</p>
        </div>
      </div>

      <div className="data-cell">
        <div className="data-lbl data-lbl--out">Out[3]:</div>
        <div className="data-codeblk">
          <span className="data-codeblk__kw">projects</span> = [
          <br />
          &nbsp;&nbsp;{"{"}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="data-codeblk__str">"id"</span>: <span className="data-codeblk__str">"interviews"</span>,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="data-codeblk__str">"url"</span>: <span className="data-codeblk__str">"https://interviews.zariya.ai"</span>,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="data-codeblk__str">"stack"</span>: [<span className="data-codeblk__str">"Next.js"</span>, <span className="data-codeblk__str">"TypeScript"</span>, <span className="data-codeblk__str">"LLM"</span>],
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="data-codeblk__str">"problem"</span>: <span className="data-codeblk__str">"practice tools feel scripted; feedback is vague"</span>,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="data-codeblk__str">"status"</span>: <span className="data-codeblk__str">"live"</span>
          <br />
          &nbsp;&nbsp;{"},"}
          <br />
          &nbsp;&nbsp;{"{"}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="data-codeblk__str">"id"</span>: <span className="data-codeblk__str">"sudoku-solver"</span>,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="data-codeblk__str">"url"</span>: <span className="data-codeblk__str">"https://sudoku-solver.cinematicgenius007.com"</span>,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="data-codeblk__str">"stack"</span>: [<span className="data-codeblk__str">"Next.js"</span>, <span className="data-codeblk__str">"TypeScript"</span>],
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="data-codeblk__str">"problem"</span>: <span className="data-codeblk__str">"strategy-vs-brute-force is hard to teach on slides"</span>,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="data-codeblk__str">"status"</span>: <span className="data-codeblk__str">"live"</span>
          <br />
          &nbsp;&nbsp;{"},"}
          <br />
          &nbsp;&nbsp;{"{"}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="data-codeblk__str">"id"</span>: <span className="data-codeblk__str">"ultimate-ttt"</span>,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="data-codeblk__str">"url"</span>: <span className="data-codeblk__str">"https://ultimate-ttt.cinematicgenius007.com"</span>,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="data-codeblk__str">"stack"</span>: [<span className="data-codeblk__str">"React"</span>, <span className="data-codeblk__str">"Vite"</span>, <span className="data-codeblk__str">"TypeScript"</span>],
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="data-codeblk__str">"problem"</span>: <span className="data-codeblk__str">"simple games can still be deep — show it"</span>,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="data-codeblk__str">"status"</span>: <span className="data-codeblk__str">"live"</span>
          <br />
          &nbsp;&nbsp;{"}"}
          <br />
          ]
        </div>
      </div>

      <div className="data-cell">
        <div className="data-lbl">In [4]:</div>
        <div className="data-prose">
          <p>Stack usage, by rough weekly hours. This is qualitative; take the shape, not the exact bar length.</p>
        </div>
      </div>

      <div className="data-cell">
        <div className="data-lbl data-lbl--out">Out[4]:</div>
        <div className="data-chart">
          <h4>stack · approx. weekly hours (q1 2026)</h4>
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
      </div>

      <div className="data-cell">
        <div className="data-lbl">In [5]:</div>
        <div className="data-prose">
          <p>Timeline of roles, aligned to a single axis. Overlap is intentional — the Zariya thing started while Optmyzr was already full-time.</p>
        </div>
      </div>

      <div className="data-cell">
        <div className="data-lbl data-lbl--out">Out[5]:</div>
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
                <div className="data-tl__year" style={{ left }}>{year}</div>
              </div>
            ))}
            <div className="data-tl__segment data-tl__segment--chit" style={{ left: "0%", width: "80%" }} />
            <div className="data-tl__label" style={{ left: "2%", top: "calc(50% - 36px)" }}>Chitkara B.E.</div>
            <div className="data-tl__segment data-tl__segment--opt" style={{ left: "62%", width: "38%" }} />
            <div className="data-tl__label data-tl__label--strong" style={{ left: "64%", top: "calc(50% - 36px)" }}>
              Optmyzr (intern → FT)
            </div>
            <div className="data-tl__segment data-tl__segment--zar" style={{ left: "84%", width: "16%" }} />
            <div className="data-tl__label data-tl__label--zar" style={{ left: "84%", top: "calc(50% + 26px)" }}>
              Zariya
            </div>
          </div>
        </div>
      </div>

      <div className="data-cell">
        <div className="data-lbl">In [6]:</div>
        <div className="data-prose">
          <h2>Contact</h2>
          <p>Queryable: email, LinkedIn, GitHub. The prose mode is in <code>?as=engineer</code>.</p>
        </div>
      </div>

      <div className="data-cell">
        <div className="data-lbl data-lbl--out">Out[6]:</div>
        <div className="data-codeblk">
          <span className="data-codeblk__kw">contact</span> = {"{"}
          <br />
          &nbsp;&nbsp;<span className="data-codeblk__str">"email"</span>: <span className="data-codeblk__str">"ayush.trillionarie@gmail.com"</span>,
          <br />
          &nbsp;&nbsp;<span className="data-codeblk__str">"linkedin"</span>: <span className="data-codeblk__str">"/in/ayush-saini-858357200"</span>,
          <br />
          &nbsp;&nbsp;<span className="data-codeblk__str">"github"</span>: <span className="data-codeblk__str">"/CinematicGenius007"</span>,
          <br />
          &nbsp;&nbsp;<span className="data-codeblk__str">"open_to"</span>: [<span className="data-codeblk__str">"eng"</span>, <span className="data-codeblk__str">"eng-adjacent product"</span>, <span className="data-codeblk__str">"weird bugs"</span>]
          <br />
          {"}"}
        </div>
      </div>

      <div className="data-contact-links">
        <a href="mailto:ayush.trillionarie@gmail.com">email ↗</a>
        <a href="https://www.linkedin.com/in/ayush-saini-858357200/" target="_blank" rel="noreferrer">
          linkedin ↗
        </a>
        <a href="https://github.com/CinematicGenius007" target="_blank" rel="noreferrer">
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
