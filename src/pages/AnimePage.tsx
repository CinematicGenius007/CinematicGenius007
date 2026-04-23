import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

const animeArcs = [
  {
    id: "origin",
    yr: "2020 – 2024",
    num: "壱",
    title: "Origin arc.",
    body: "Chitkara University, B.E. in Computer Science. Graduated with a CGPA of 9.95. Debate, theatre, a sleep schedule that was sometimes a suggestion.",
    current: false,
  },
  {
    id: "training",
    yr: "2023 →",
    num: "弐",
    title: "Training arc.",
    body: "Optmyzr. Intern to SDE I. Learns the Rule Engine. Starts owning Campaign Automator. Mentors four interns. Sharpens debugging on live ad-tech systems.",
    current: false,
  },
  {
    id: "current",
    yr: "2024 →",
    num: "参",
    title: "Current arc.",
    body: "Zariya. Founding engineer. Picks the stack, sets up the repo, ships Interviews. Still at Optmyzr by day. A full-time job and a zero-to-one, in parallel.",
    current: true,
  },
];

const animeBattles = [
  {
    id: "interviews",
    num: "零",
    title: ["Interviews", "by Zariya."],
    body: "An AI interviewer that actually pushes back. Follow-up questions. Specific scoring. A report you could hand to a mentor. Built because every other practice tool felt like a wall.",
    link: "live · interviews.zariya.ai ↗",
    url: "https://interviews.zariya.ai/",
    featured: true,
  },
  {
    id: "sudoku",
    num: "壱",
    title: ["Sudoku,", "twice."],
    body: "Two solvers race on one board. Brute force vs. constraint propagation. Strategy becomes visible.",
    link: "live ↗",
    url: "https://sudoku-solver.cinematicgenius007.com/",
    featured: false,
  },
  {
    id: "ttt",
    num: "弐",
    title: ["Ultimate", "TTT."],
    body: "Tic-tac-toe where your move picks the next sub-board. Simple rules, deep play. Weekend build after losing to a cousin four times.",
    link: "live ↗",
    url: "https://ultimate-ttt.cinematicgenius007.com/",
    featured: false,
  },
];

export default function AnimePage({ mode: _mode }: Props) {
  return (
    <main className="anime-page">
      <section className="anime-frame anime-cover">
        <div className="anime-label">
          <span className="anime-kana anime-kana--red">プロローグ</span>
          <span className="anime-kana">アユーシュ</span>
        </div>

        <div className="anime-panel anime-panel--splash">
          <div className="anime-panel__sub">Chapter 01 · Prologue</div>
          <div className="anime-panel__chapter">
            第<span>壱</span>章
          </div>
          <div className="anime-panel__speed" aria-hidden="true" />
          <div className="anime-panel__sfx">bugged.</div>
        </div>

        <div className="anime-panel anime-panel--name">
          <div>
            <div className="anime-tag">Main character · Software engineer</div>
            <div className="anime-line" />
            <h1>
              AYUSH
              <br />
              S<em>A</em>INI
            </h1>
          </div>
          <div>
            <div className="anime-line" />
            <p className="anime-monologue">
              Two years ago he joined an ad-tech company as an intern. He stayed. He ended up owning the part of the
              product that runs unsupervised overnight and changes strangers' money. He sleeps fine. Usually.
            </p>
          </div>
        </div>
      </section>

      <section className="anime-frame anime-strip anime-strip--arcs">
        <div className="anime-label">
          <span className="anime-kana">章</span>
          <span className="anime-kana anime-kana--red">三編</span>
        </div>

        {animeArcs.map((arc) => (
          <article
            className={`anime-arc${arc.current ? " anime-arc--current" : ""}`}
            key={arc.id}
          >
            <span className="anime-arc__yr">{arc.yr}</span>
            <div className="anime-arc__title">
              <div className="anime-arc__num">{arc.num}</div>
              <h3>{arc.title}</h3>
            </div>
            <p>{arc.body}</p>
          </article>
        ))}
      </section>

      <section className="anime-frame anime-strip anime-strip--projects">
        <div className="anime-label">
          <span className="anime-kana anime-kana--red">戦</span>
          <span className="anime-kana">プロジェクト</span>
        </div>

        {animeBattles.map((battle) => (
          <a
            className={`anime-battle${battle.featured ? " anime-battle--featured" : ""}`}
            href={battle.url}
            key={battle.id}
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <div className="anime-battle__no">{battle.num}</div>
              <h4>
                {battle.title[0]}
                <br />
                {battle.title[1]}
              </h4>
            </div>
            <p>{battle.body}</p>
            <div className="anime-battle__link">{battle.link}</div>
          </a>
        ))}
      </section>

      <section className="anime-frame anime-strip anime-strip--dialogue">
        <div className="anime-label">
          <span className="anime-kana">続く</span>
          <span className="anime-kana anime-kana--red">連絡</span>
        </div>

        <div className="anime-panel anime-panel--speech">
          <span className="anime-speech__who">Ayush · Final panel</span>
          <q>If you're hiring, building, or stuck on something weird — the fastest way to me is one panel over.</q>
        </div>

        <div className="anime-panel anime-panel--cta">
          <div className="anime-cta__label">To be continued →</div>
          <ul>
            <li>
              <a href="mailto:ayush.trillionarie@gmail.com">Email <span>↗</span></a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/ayush-saini-858357200/" target="_blank" rel="noreferrer">
                LinkedIn <span>↗</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/CinematicGenius007" target="_blank" rel="noreferrer">
                GitHub <span>↗</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
