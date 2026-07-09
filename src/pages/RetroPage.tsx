import { useEffect, useRef, useState, type ReactNode } from "react";
import { contacts } from "../content/contacts";
import { about, education, experiences, hero, projects, resolve, skillGroups } from "../content/profile";
import { useMotionPreference } from "../engine/useMotionPreference";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

const BOOT_SEEN_KEY = "sainios-boot-seen";

function bootSeen(): boolean {
  try {
    return sessionStorage.getItem(BOOT_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markBootSeen() {
  try {
    sessionStorage.setItem(BOOT_SEEN_KEY, "1");
  } catch {
    // best effort
  }
}

/* ── boot sequence ────────────────────────────────────────────── */

const BOOT_LINES = [
  "SAINI SYSTEMS BIOS v2.0 — © 2002, Roorkee",
  "CPU: caffeine-cooled, dual-job capable",
  "RAM CHECK: 9950KB OK",
  "MOUNTING /career … ok",
  "MOUNTING /projects … ok",
  "STARTING SAINI.OS",
];

function Boot({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setShown(i);
      if (i > BOOT_LINES.length) {
        window.clearInterval(id);
        window.setTimeout(() => {
          markBootSeen();
          doneRef.current();
        }, 650);
      }
    }, 330);
    return () => window.clearInterval(id);
  }, []);

  const skip = () => {
    markBootSeen();
    doneRef.current();
  };

  return (
    <div className="os-boot" onClick={skip} role="presentation">
      <div className="os-boot__screen">
        {BOOT_LINES.slice(0, shown).map((line) => (
          <p key={line}>{line}</p>
        ))}
        {shown > BOOT_LINES.length - 1 ? (
          <div className="os-boot__bar">
            <div />
          </div>
        ) : null}
      </div>
      <span className="os-boot__skip">click to skip</span>
    </div>
  );
}

/* ── tiny TTT demake (player X vs greedy AI) ──────────────────── */

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function winnerOf(b: (string | null)[]): string | null {
  for (const [a, c, d] of WIN_LINES) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  return b.every(Boolean) ? "draw" : null;
}

function aiMove(b: (string | null)[]): number {
  const lines = WIN_LINES;
  // win if possible, block if needed, else center, else first free
  for (const mark of ["O", "X"]) {
    for (const [a, c, d] of lines) {
      const cells = [b[a], b[c], b[d]];
      if (cells.filter((v) => v === mark).length === 2 && cells.includes(null)) {
        return [a, c, d][cells.indexOf(null)];
      }
    }
  }
  if (!b[4]) return 4;
  return b.findIndex((v) => !v);
}

function TttExe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const result = winnerOf(board);

  const play = (i: number) => {
    if (board[i] || result) return;
    const next = [...board];
    next[i] = "X";
    if (!winnerOf(next)) {
      const ai = aiMove(next);
      if (ai >= 0) next[ai] = "O";
    }
    setBoard(next);
  };

  return (
    <div className="os-ttt">
      <div className="os-ttt__board">
        {board.map((cell, i) => (
          <button key={i} onClick={() => play(i)} disabled={!!cell || !!result}>
            {cell}
          </button>
        ))}
      </div>
      <p className="os-ttt__status">
        {result === "X"
          ? "YOU WIN. (the full game is harder.)"
          : result === "O"
            ? "SYSTEM WINS. happens to everyone."
            : result === "draw"
              ? "DRAW. classic."
              : "you are X. beat the machine."}
      </p>
      <div className="os-ttt__row">
        <button className="os-btn" onClick={() => setBoard(Array(9).fill(null))}>
          new game
        </button>
        <a className="os-btn" href="https://ultimate-ttt.cinematicgenius007.com/" target="_blank" rel="noreferrer">
          play ULTIMATE version ↗
        </a>
      </div>
    </div>
  );
}

/* ── terminal ─────────────────────────────────────────────────── */

function Terminal({ mode, openWindow }: { mode: ModeId; openWindow: (kind: string) => void }) {
  const [history, setHistory] = useState<string[]>([
    "SAINI.OS terminal — type `help`",
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [history]);

  const catFile = (name: string): string[] => {
    if (name === "readme") {
      return [
        `${hero.name} — ${resolve(hero.role, mode)}`,
        resolve(hero.statement, mode),
        "same filesystem, different wallpaper. very official.",
      ];
    }

    const exp = experiences.find((item) => item.id === name);
    if (exp) {
      return [
        `${exp.company} — ${exp.role}`,
        `${exp.period} · ${exp.mode}`,
        resolve(exp.bullets[0], mode),
      ];
    }

    const project = projects.find((item) => item.id === name);
    if (project) {
      return [
        `${project.name} — ${project.tech.join(", ")}`,
        resolve(project.description, mode),
        "file type: shipped side quest, kept around for evidence.",
      ];
    }

    return [`cat: ${name}: no such file`];
  };

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const echo = `> ${raw}`;
    let out: string[] = [];
    if (cmd === "help") {
      out = [
        "help · whoami · ls · cat <name> · open <name> · resume · uname -a · hire · clear",
        "names: readme career projects skills resume trash mail",
        "cat: readme optmyzr zariya jetbrains ttt sudoku interviews",
      ];
    } else if (cmd === "whoami") {
      out = ["ayush saini — full stack engineer. optmyzr by day, zariya by night."];
    } else if (cmd === "ls") {
      out = ["ReadMe.txt  Career.dir  Projects.dir  Skills.cfg  Resume.pdf  Trash  Mail"];
    } else if (cmd === "uname -a") {
      out = ["SAINI.OS 2.0 (caffeine-cooled) — uptime since 2002, Roorkee build"];
    } else if (cmd === "resume") {
      openWindow("resume");
      out = ["opening Resume.pdf…"];
    } else if (cmd.startsWith("cat ")) {
      const name = cmd.slice(4).trim();
      out = catFile(name);
    } else if (cmd.startsWith("open ")) {
      const name = cmd.slice(5).trim();
      const valid = ["readme", "career", "projects", "skills", "resume", "trash", "mail"];
      if (valid.includes(name)) {
        openWindow(name);
        out = [`opening ${name}…`];
      } else {
        out = [`open: ${name}: no such file`];
      }
    } else if (cmd === "hire") {
      openWindow("mail");
      out = ["good choice. opening Mail…"];
    } else if (cmd === "sudo" || cmd.startsWith("sudo ")) {
      out = ["ayush is not in the sudoers file. this incident will be reported. (to ayush.)"];
    } else if (cmd === "clear") {
      setHistory([]);
      return;
    } else if (cmd.length) {
      out = [`${cmd}: command not found — try \`help\``];
    }
    setHistory((h) => [...h, echo, ...out]);
  };

  return (
    <div className="os-term">
      <div className="os-term__scroll">
        {history.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
        <div ref={endRef} />
      </div>
      <form
        className="os-term__input"
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
          setInput("");
        }}
      >
        <span>&gt;</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Terminal command"
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}

/* ── window manager ───────────────────────────────────────────── */

type Win = { kind: string; x: number; y: number; z: number };

const WINDOW_TITLES: Record<string, string> = {
  readme: "ReadMe.txt",
  career: "Career.dir",
  "job-optmyzr": "Optmyzr.app",
  "job-zariya": "Zariya.app",
  "job-jetbrains": "JetBrains.app",
  projects: "Projects.dir",
  ttt: "TTT.EXE",
  sudoku: "SUDOKU.EXE",
  interviews: "INTERVIEWS.URL",
  skills: "Skills.cfg",
  resume: "Resume.pdf",
  terminal: "Terminal",
  trash: "Trash",
  mail: "Mail",
};

const DESKTOP_ICONS: { kind: string; label: string; glyph: string }[] = [
  { kind: "readme", label: "ReadMe.txt", glyph: "▤" },
  { kind: "career", label: "Career.dir", glyph: "▦" },
  { kind: "projects", label: "Projects.dir", glyph: "▣" },
  { kind: "skills", label: "Skills.cfg", glyph: "⚙" },
  { kind: "resume", label: "Resume.pdf", glyph: "⎙" },
  { kind: "terminal", label: "Terminal", glyph: "▮" },
  { kind: "mail", label: "Mail", glyph: "✉" },
  { kind: "trash", label: "Trash", glyph: "▼" },
];

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return <span>{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>;
}

export default function RetroPage({ mode }: Props) {
  const { level: motion } = useMotionPreference();
  const [booted, setBooted] = useState(() => motion !== "full" || bootSeen());
  const [wins, setWins] = useState<Win[]>([{ kind: "readme", x: 26, y: 12, z: 1 }]);
  const zRef = useRef(1);
  const dragRef = useRef<{ kind: string; dx: number; dy: number } | null>(null);
  const deskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (motion !== "full") setBooted(true);
  }, [motion]);

  const openWindow = (kind: string) => {
    zRef.current += 1;
    setWins((prev) => {
      const existing = prev.find((w) => w.kind === kind);
      if (existing) {
        return prev.map((w) => (w.kind === kind ? { ...w, z: zRef.current } : w));
      }
      const n = prev.length;
      return [...prev, { kind, x: 18 + ((n * 7) % 38), y: 8 + ((n * 6) % 30), z: zRef.current }];
    });
  };

  const closeWindow = (kind: string) => {
    setWins((prev) => prev.filter((w) => w.kind !== kind));
  };

  const focusWindow = (kind: string) => {
    zRef.current += 1;
    setWins((prev) => prev.map((w) => (w.kind === kind ? { ...w, z: zRef.current } : w)));
  };

  // drag handling
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const drag = dragRef.current;
      const desk = deskRef.current;
      if (!drag || !desk) return;
      const rect = desk.getBoundingClientRect();
      const x = ((e.clientX - rect.left - drag.dx) / rect.width) * 100;
      const y = ((e.clientY - rect.top - drag.dy) / rect.height) * 100;
      setWins((prev) =>
        prev.map((w) =>
          w.kind === drag.kind
            ? { ...w, x: Math.min(92, Math.max(-10, x)), y: Math.min(92, Math.max(0, y)) }
            : w,
        ),
      );
    };
    const onUp = () => {
      dragRef.current = null;
    };
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };
  }, []);

  const startDrag = (kind: string, e: React.PointerEvent) => {
    const winEl = (e.target as HTMLElement).closest(".os-window") as HTMLElement | null;
    if (!winEl) return;
    const rect = winEl.getBoundingClientRect();
    dragRef.current = { kind, dx: e.clientX - rect.left, dy: e.clientY - rect.top };
    focusWindow(kind);
  };

  const windowBody = (kind: string): ReactNode => {
    switch (kind) {
      case "readme":
        return (
          <div className="os-doc">
            <h1>{hero.name}</h1>
            <p className="os-doc__role">{resolve(hero.role, mode)}</p>
            <p>{resolve(hero.statement, mode)}</p>
            <p>{resolve(about.p2, mode)}</p>
            <p className="os-doc__hint">→ double trouble: open Career.dir and Projects.dir on the desktop.</p>
          </div>
        );
      case "career":
        return (
          <ul className="os-files">
            {experiences.map((exp) => (
              <li key={exp.id}>
                <button onClick={() => openWindow(`job-${exp.id}`)}>
                  <span className="os-files__icon">▦</span>
                  <span>{exp.company}</span>
                  <span className="os-files__meta">{exp.period}</span>
                </button>
              </li>
            ))}
            <li>
              <div className="os-files__static">
                <span className="os-files__icon">▤</span>
                <span>{education[0].school}</span>
                <span className="os-files__meta">{education[0].result}</span>
              </div>
            </li>
          </ul>
        );
      case "job-optmyzr":
      case "job-zariya":
      case "job-jetbrains": {
        const exp = experiences.find((e) => `job-${e.id}` === kind)!;
        return (
          <div className="os-doc">
            <h2>{exp.company}</h2>
            <p className="os-doc__role">
              {exp.role} · {exp.period} ({exp.mode})
            </p>
            <ul className="os-doc__list">
              {exp.bullets.map((b, i) => (
                <li key={i}>{resolve(b, mode)}</li>
              ))}
            </ul>
          </div>
        );
      }
      case "projects":
        return (
          <ul className="os-files">
            <li>
              <button onClick={() => openWindow("ttt")}>
                <span className="os-files__icon">▣</span>
                <span>TTT.EXE</span>
                <span className="os-files__meta">playable</span>
              </button>
            </li>
            <li>
              <button onClick={() => openWindow("sudoku")}>
                <span className="os-files__icon">▣</span>
                <span>SUDOKU.EXE</span>
                <span className="os-files__meta">two solvers</span>
              </button>
            </li>
            <li>
              <button onClick={() => openWindow("interviews")}>
                <span className="os-files__icon">⌘</span>
                <span>INTERVIEWS.URL</span>
                <span className="os-files__meta">AI tool</span>
              </button>
            </li>
          </ul>
        );
      case "ttt":
        return <TttExe />;
      case "sudoku": {
        const p = projects.find((x) => x.id === "sudoku")!;
        return (
          <div className="os-doc">
            <h2>{p.name}</h2>
            <p>{resolve(p.description, mode)}</p>
            <a className="os-btn" href={p.url} target="_blank" rel="noreferrer">
              run full version ↗
            </a>
          </div>
        );
      }
      case "interviews": {
        const p = projects.find((x) => x.id === "interviews")!;
        return (
          <div className="os-doc">
            <h2>{p.name}</h2>
            <p>{resolve(p.description, mode)}</p>
            <a className="os-btn" href={p.url} target="_blank" rel="noreferrer">
              open interviews.zariya.ai ↗
            </a>
          </div>
        );
      }
      case "skills":
        return (
          <div className="os-cfg">
            {skillGroups.map((group) => (
              <fieldset key={group.label}>
                <legend>{group.label}</legend>
                {group.items.map((item) => (
                  <label key={item}>
                    <input type="checkbox" defaultChecked /> {item}
                  </label>
                ))}
              </fieldset>
            ))}
            <p className="os-cfg__note">all modules enabled by default. disabling has no effect; he&apos;ll use them anyway.</p>
          </div>
        );
      case "resume":
        return (
          <div className="os-doc os-resume">
            <h2>Resume.pdf</h2>
            <p>The same career, compiled to one printable page.</p>
            <div className="os-resume__panel" aria-label="Print dialog">
              <div>
                <span>Destination</span>
                <strong>/?as=pdf</strong>
              </div>
              <div>
                <span>Pages</span>
                <strong>1, allegedly</strong>
              </div>
              <div>
                <span>Format</span>
                <strong>a portfolio pretending to be a printer</strong>
              </div>
            </div>
            <div className="os-resume__actions">
              <a className="os-btn" href="/?as=pdf">
                Open print render
              </a>
              <button className="os-btn" onClick={() => window.print()}>
                Print
              </button>
            </div>
          </div>
        );
      case "terminal":
        return <Terminal mode={mode} openWindow={openWindow} />;
      case "trash":
        return (
          <ul className="os-files os-files--trash">
            <li>
              <div className="os-files__static">
                <span className="os-files__icon">▥</span>
                <span>imposter_syndrome.tmp</span>
                <span className="os-files__meta">keeps respawning</span>
              </div>
            </li>
            <li>
              <div className="os-files__static">
                <span className="os-files__icon">▥</span>
                <span>clever_version_v1.ts</span>
                <span className="os-files__meta">shipped boring one instead</span>
              </div>
            </li>
            <li>
              <div className="os-files__static">
                <span className="os-files__icon">▥</span>
                <span>untested_hotfix.patch</span>
                <span className="os-files__meta">deleted. always.</span>
              </div>
            </li>
          </ul>
        );
      case "mail":
        return (
          <div className="os-doc">
            <h2>New message</h2>
            <p className="os-doc__role">to: ayush — re: hiring / building / something weird</p>
            <p>He reads his email. Fastest channel below.</p>
            <div className="os-mail__row">
              <a className="os-btn" href={contacts.emailHref}>
                EMAIL ↗
              </a>
              <a className="os-btn" href={contacts.linkedin} target="_blank" rel="noreferrer">
                LINKEDIN ↗
              </a>
              <a className="os-btn" href={contacts.github} target="_blank" rel="noreferrer">
                GITHUB ↗
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="os">
      {!booted ? <Boot onDone={() => setBooted(true)} /> : null}

      <div className="os-menubar">
        <span className="os-menubar__logo">■ SAINI.OS</span>
        <span className="os-menubar__item">File</span>
        <span className="os-menubar__item">Edit</span>
        <span className="os-menubar__item os-menubar__item--wide">Special</span>
        <span className="os-menubar__hint">a portfolio pretending to be a computer · v2.0</span>
        <Clock />
      </div>

      <div className="os-desk" ref={deskRef}>
        <div className="os-icons">
          {DESKTOP_ICONS.map((icon) => (
            <button className="os-icon" key={icon.kind} onClick={() => openWindow(icon.kind)}>
              <span className="os-icon__glyph" aria-hidden="true">
                {icon.glyph}
              </span>
              <span className="os-icon__label">{icon.label}</span>
            </button>
          ))}
        </div>

        {wins.map((win) => (
          <section
            className="os-window"
            key={win.kind}
            style={{ left: `${win.x}%`, top: `${win.y}%`, zIndex: win.z }}
            onPointerDown={() => focusWindow(win.kind)}
            aria-label={WINDOW_TITLES[win.kind]}
          >
            <header className="os-window__bar" onPointerDown={(e) => startDrag(win.kind, e)}>
              <button
                className="os-window__close"
                onClick={() => closeWindow(win.kind)}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label={`Close ${WINDOW_TITLES[win.kind]}`}
              />
              <span className="os-window__title">{WINDOW_TITLES[win.kind]}</span>
            </header>
            <div className="os-window__body">{windowBody(win.kind)}</div>
          </section>
        ))}
      </div>
    </main>
  );
}
