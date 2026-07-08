import { useEffect, useMemo, useRef, useState } from "react";
import { contacts } from "../content/contacts";
import { breakpoints, careerTrace, nodeDetails, type Breakpoint } from "../content/engineerGraph";
import {
  contact,
  education,
  experiences,
  hero,
  outside,
  projects,
  resolve,
  skillGroups,
} from "../content/profile";
import { ScrollTrigger, revealOnScroll } from "../engine/animation";
import { useMotionPreference } from "../engine/useMotionPreference";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

/* ---------- real telemetry: the page reports its own startup ---------- */

type Mark = { label: string; value: string };

function readMarks(): Mark[] {
  const marks: Mark[] = [];
  const nav = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  if (nav) {
    if (nav.responseStart > 0) marks.push({ label: "first byte", value: `${Math.round(nav.responseStart)}ms` });
    if (nav.domInteractive > 0) marks.push({ label: "dom interactive", value: `${Math.round(nav.domInteractive)}ms` });
    if (nav.domContentLoadedEventEnd > 0)
      marks.push({ label: "content loaded", value: `${Math.round(nav.domContentLoadedEventEnd)}ms` });
  }
  const paint = performance.getEntriesByName("first-contentful-paint")[0];
  if (paint) marks.push({ label: "first paint", value: `${Math.round(paint.startTime)}ms` });
  marks.push({ label: "js heap", value: reportHeap() });
  return marks;
}

function reportHeap(): string {
  const mem = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory;
  if (!mem) return "n/a on this engine";
  return `${(mem.usedJSHeapSize / 1048576).toFixed(1)}MB`;
}

function useUptime(): string {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setT((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, []);
  const m = String(Math.floor(t / 60)).padStart(2, "0");
  const s = String(t % 60).padStart(2, "0");
  return `${m}:${s}`;
}

/* ---------- boot: attach sequence, first visit per session only ---------- */

const BOOT_KEY = "prc-booted";

function BootOverlay({ marks, onDone }: { marks: Mark[]; onDone: () => void }) {
  const lines = useMemo(
    () => [
      "$ debugger attach ayush.saini --pid 2002",
      "reading /proc/2002/maps … ok",
      ...marks.map((m) => `  ${m.label.padEnd(16, " ")} ${m.value}`),
      "symbols loaded · source available",
      "attached — resuming process",
    ],
    [marks],
  );
  const [shown, setShown] = useState(1);

  useEffect(() => {
    if (shown < lines.length) {
      const id = window.setTimeout(() => setShown((s) => s + 1), 240);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(onDone, 600);
    return () => window.clearTimeout(id);
  }, [shown, lines.length, onDone]);

  return (
    <div className="prc-boot" onClick={onDone} role="presentation">
      <div className="prc-boot__log">
        {lines.slice(0, shown).map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </div>
      <p className="prc-boot__skip">click to skip</p>
    </div>
  );
}

/* ---------- trace: career as a request, scrubbed by scroll ---------- */

// Fraction of the path length at which each station sits.
const STATION_AT = [0.02, 0.35, 0.67, 0.98];
const STATION_XY = [
  { x: 60, y: 202 },
  { x: 353, y: 152 },
  { x: 646, y: 106 },
  { x: 940, y: 62 },
];
const TRACE_PATH =
  "M 60 202 C 200 208 262 158 353 152 C 452 145 548 118 646 106 C 752 93 842 74 940 62";

function TraceSection({ motion }: { motion: string }) {
  const stations = careerTrace.map((id) => nodeDetails[id]);
  const outerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const packetRef = useRef<SVGGElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    if (motion !== "full") return;
    const outer = outerRef.current;
    const path = pathRef.current;
    const packet = packetRef.current;
    if (!outer || !path || !packet) return;

    const total = path.getTotalLength();
    path.style.strokeDasharray = String(total);
    path.style.strokeDashoffset = String(total);

    const st = ScrollTrigger.create({
      trigger: outer,
      start: "top top",
      end: "+=280%",
      pin: outer.querySelector<HTMLElement>(".prc-trace__stage"),
      scrub: 0.35,
      onUpdate: (self) => {
        const p = self.progress;
        // One scalar drives everything: drawn route, packet, station focus.
        path.style.strokeDashoffset = String(total * (1 - p));
        const pt = path.getPointAtLength(total * p);
        packet.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
        let idx = 0;
        for (let i = 0; i < STATION_AT.length; i++) if (p >= STATION_AT[i] - 0.06) idx = i;
        if (idx !== activeRef.current) {
          activeRef.current = idx;
          setActive(idx);
        }
      },
    });
    return () => st.kill();
  }, [motion]);

  if (motion !== "full") {
    // Static render: the whole route, all hops readable, no pin.
    return (
      <section className="prc-section prc-trace prc-trace--static" id="trace">
        <header className="prc-section__head" data-reveal>
          <span>02</span>
          <h2>trace career.route</h2>
          <p>one request, four hops — fundamentals to architecture ownership</p>
        </header>
        <ol className="prc-trace__list">
          {stations.map((s, i) => (
            <li key={s.title} data-reveal>
              <p className="prc-trace__hopnum">hop {i + 1}/4</p>
              <h3>{s.title}</h3>
              <p className="prc-trace__meta">{s.meta}</p>
              <ul>
                {s.lines.map((l, j) => (
                  <li key={j}>{l}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  const station = stations[active];
  return (
    <section className="prc-section prc-trace" id="trace" ref={outerRef}>
      <div className="prc-trace__stage">
        <header className="prc-section__head">
          <span>02</span>
          <h2>trace career.route</h2>
          <p>scroll drives the request — one hop at a time</p>
        </header>
        <div className="prc-trace__map" aria-hidden="true">
          <svg viewBox="0 0 1000 260" preserveAspectRatio="xMidYMid meet">
            <path className="prc-trace__rail" d={TRACE_PATH} />
            <path className="prc-trace__wire" d={TRACE_PATH} ref={pathRef} />
            {STATION_XY.map((s, i) => (
              <g key={i} className={`prc-trace__station${i <= active ? " is-hit" : ""}`}>
                <circle cx={s.x} cy={s.y} r="10" className="prc-trace__halo" />
                <circle cx={s.x} cy={s.y} r="4.5" className="prc-trace__dot" />
              </g>
            ))}
            <g ref={packetRef} className="prc-trace__packet" transform="translate(60, 202)">
              <circle r="7" className="prc-trace__packet-halo" />
              <circle r="3" className="prc-trace__packet-core" />
            </g>
          </svg>
        </div>
        <div className="prc-trace__card" aria-live="polite">
          <p className="prc-trace__hopnum">
            hop {active + 1}/4 · {["fundamentals", "testing discipline", "production craft", "architecture ownership"][active]}
          </p>
          <h3>{station.title}</h3>
          <p className="prc-trace__meta">{station.meta}</p>
          <ul>
            {station.lines.map((l, i) => (
              <li key={`${active}-${i}`}>{l}</li>
            ))}
          </ul>
          {station.link ? (
            <a href={station.link.href} target="_blank" rel="noreferrer">
              {station.link.label}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ---------- breakpoints: step-through war stories (kept mechanic) ---------- */

function BreakpointStory({ bp, motion }: { bp: Breakpoint; motion: string }) {
  const [step, setStep] = useState(0);
  const done = step >= bp.steps.length - 1;
  const showAll = motion === "none";

  return (
    <article className="prc-bp">
      <header className="prc-bp__head">
        <span className="prc-bp__dot" aria-hidden="true" />
        <span className="prc-bp__file">break at {bp.file}</span>
        <h3>{bp.title}</h3>
      </header>
      {showAll ? (
        <div className="prc-bp__steps">
          {bp.steps.map((s) => (
            <div className="prc-bp__step" key={s.label}>
              <p className="prc-bp__label">{s.label}</p>
              <p>{s.state}</p>
            </div>
          ))}
          <p className="prc-bp__verdict">⏺ {bp.verdict}</p>
        </div>
      ) : (
        <div className="prc-bp__steps">
          <div className="prc-bp__step" key={step}>
            <p className="prc-bp__label">{bp.steps[step].label}</p>
            <p>{bp.steps[step].state}</p>
          </div>
          <div className="prc-bp__controls">
            <div className="prc-bp__pips" aria-hidden="true">
              {bp.steps.map((_, i) => (
                <span key={i} className={i <= step ? "is-hit" : undefined} />
              ))}
            </div>
            {done ? (
              <>
                <p className="prc-bp__verdict">⏺ {bp.verdict}</p>
                <button className="prc-btn prc-btn--ghost" onClick={() => setStep(0)}>
                  ↺ restart
                </button>
              </>
            ) : (
              <button className="prc-btn" onClick={() => setStep((s) => s + 1)}>
                continue ▸
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

/* ---------- terminal: the queryable profile ---------- */

type TermLine = { kind: "in" | "out"; text: string };

function runCommand(cmd: string, mode: ModeId): string[] {
  const [head, ...rest] = cmd.trim().split(/\s+/);
  const arg = rest.join(" ").toLowerCase();
  switch (head.toLowerCase()) {
    case "help":
      return [
        "available commands:",
        "  whoami          who is this process",
        "  trace           run the career route",
        "  ls projects     shipped side projects",
        "  cat <name>      read a project or job (try: cat zariya)",
        "  skills          /proc/skills, mounted",
        "  contact         open a line",
        "  resume          printable render of the same source",
        "  uptime          how long you've been here",
        "  clear           wipe the buffer",
      ];
    case "whoami":
      return [hero.name, resolve(hero.role, mode), resolve(hero.statement, mode)];
    case "trace":
      return careerTrace.map((id, i) => `hop ${i + 1}/4 · ${nodeDetails[id].title} — ${nodeDetails[id].meta}`);
    case "ls":
      return projects.map((p) => `${p.number}  ${p.name.toLowerCase().replace(/\s+/g, "-")}  · live`);
    case "cat": {
      if (!arg) return ["usage: cat <name> — try: cat zariya, cat optmyzr, cat sudoku"];
      const proj = projects.find((p) => p.name.toLowerCase().includes(arg) || p.id.includes(arg));
      if (proj) return [proj.name, resolve(proj.description, mode), `stack: ${proj.tech.join(", ")}`, proj.url];
      const exp = experiences.find((e) => e.id.includes(arg) || e.company.toLowerCase().includes(arg));
      if (exp)
        return [
          `${exp.company} — ${exp.role} · ${exp.period}`,
          ...exp.bullets.slice(0, 3).map((b) => `· ${resolve(b, mode)}`),
        ];
      return [`cat: ${arg}: no such file — try "ls projects"`];
    }
    case "skills":
      return skillGroups.map((g) => `${g.label.toLowerCase().padEnd(14, " ")} ${g.items.join(" · ")}`);
    case "contact":
      return [`email     ${contacts.email}`, `linkedin  ${contacts.linkedin}`, `github    ${contacts.github}`];
    case "resume":
      return ["same facts, print layout: /?as=pdf"];
    case "uptime":
      return [`${Math.round(performance.now() / 1000)}s this session — the process itself has been running since 2021.`];
    case "sudo":
      return ["nice try. this process is supervised."];
    case "exit":
      return ["the process stays attached. (there are 7 other renders — ⌘K.)"];
    case "":
      return [];
    default:
      return [`command not found: ${head} — try "help"`];
  }
}

function Terminal({ mode }: { mode: ModeId }) {
  const [lines, setLines] = useState<TermLine[]>([
    { kind: "out", text: 'interactive — this profile is queryable. type "help".' },
  ]);
  const [value, setValue] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  function focusPrompt() {
    // Whole terminal is a click target, like a real one — but never
    // steal an in-progress text selection.
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus();
  }

  function submit() {
    const cmd = value;
    setValue("");
    if (cmd.trim().toLowerCase() === "clear") {
      setLines([]);
      return;
    }
    const out = runCommand(cmd, mode).map((text): TermLine => ({ kind: "out", text }));
    setLines((prev) => [...prev, { kind: "in", text: cmd }, ...out]);
  }

  return (
    <div className="prc-term">
      <div className="prc-term__bar">
        <span />
        <span />
        <span />
        <p>ayush@prod: ~/career — attached</p>
      </div>
      <div className="prc-term__body" ref={bodyRef} onClick={focusPrompt}>
        {lines.map((l, i) => (
          <p key={i} className={`prc-term__line prc-term__line--${l.kind}`}>
            {l.kind === "in" ? <span className="prc-term__ps1">ayush@prod:~$ </span> : null}
            {l.text}
          </p>
        ))}
        <form
          className="prc-term__prompt"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <span className="prc-term__ps1">ayush@prod:~$ </span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Terminal input — type help for commands"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function EngineerPage({ mode }: Props) {
  const { level: motion } = useMotionPreference();
  const pageRef = useRef<HTMLElement>(null);
  const [marks] = useState<Mark[]>(readMarks);
  const [booting, setBooting] = useState(
    () => motion === "full" && !sessionStorage.getItem(BOOT_KEY),
  );
  const uptime = useUptime();

  function endBoot() {
    sessionStorage.setItem(BOOT_KEY, "1");
    setBooting(false);
  }

  useEffect(() => {
    if (!pageRef.current || booting) return;
    return revealOnScroll(pageRef.current, "[data-reveal]", motion);
  }, [motion, booting]);

  // Pin heights shift layout when trace mounts; keep ScrollTrigger honest.
  useEffect(() => {
    if (booting) return;
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 60);
    return () => window.clearTimeout(id);
  }, [booting]);

  return (
    <main className="prc" ref={pageRef} data-booting={booting || undefined}>
      {booting ? <BootOverlay marks={marks} onDone={endBoot} /> : null}

      {/* ── 01 · attached ────────────────────────────────────────── */}
      <section className="prc-hero">
        <p className="prc-kicker">SAME SOURCE · DIFFERENT RENDER — view 01/06: DEBUGGER</p>
        <p className="prc-meta">
          process <strong>ayush.saini</strong> · pid 2002 · state{" "}
          <strong className="prc-meta__live">RUNNING</strong> · session uptime{" "}
          <strong className="prc-meta__uptime">{uptime}</strong>
        </p>
        <h1 className="prc-name">{hero.name}</h1>
        <p className="prc-role">{resolve(hero.role, mode)}</p>
        <p className="prc-statement">{resolve(hero.statement, mode)}</p>
        <dl className="prc-marks" aria-label="This page's real startup telemetry">
          {marks.map((m) => (
            <div key={m.label}>
              <dt>{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
          <div>
            <dt>telemetry</dt>
            <dd>real — measured on your load</dd>
          </div>
        </dl>
        <p className="prc-hero__hint" aria-hidden="true">
          scroll to trace the route ↓
        </p>
      </section>

      <TraceSection motion={motion} />

      {/* ── 03 · breakpoints ─────────────────────────────────────── */}
      <section id="breakpoints" className="prc-section" data-reveal>
        <header className="prc-section__head">
          <span>03</span>
          <h2>breakpoints</h2>
          <p>three places the debugger actually stopped — step through each</p>
        </header>
        <div className="prc-bps">
          {breakpoints.map((bp) => (
            <BreakpointStory key={bp.id} bp={bp} motion={motion} />
          ))}
        </div>
      </section>

      {/* ── 04 · loaded modules ──────────────────────────────────── */}
      <section id="modules" className="prc-section" data-reveal>
        <header className="prc-section__head">
          <span>04</span>
          <h2>loaded modules</h2>
          <p>$ lsmod — personal projects, all running in production</p>
        </header>
        <div className="prc-modules">
          {projects.map((project) => (
            <a className="prc-module" href={project.url} key={project.id} target="_blank" rel="noreferrer">
              <div className="prc-module__row">
                <span className="prc-module__num">{project.number}</span>
                <h3>{project.name}</h3>
                <span className="prc-module__live">● LIVE ↗</span>
              </div>
              <p>{resolve(project.description, mode)}</p>
              <ul>
                {project.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </section>

      {/* ── 05 · /proc ───────────────────────────────────────────── */}
      <section id="proc" className="prc-section" data-reveal>
        <header className="prc-section__head">
          <span>05</span>
          <h2>/proc/ayush</h2>
          <p>runtime capabilities, as mounted</p>
        </header>
        <div className="prc-proc">
          {skillGroups.map((group) => (
            <article className="prc-proc__group" key={group.label}>
              <h3>/proc/skills/{group.label.toLowerCase().replace(/\s+/g, "_")}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
          <article className="prc-proc__group">
            <h3>/proc/education</h3>
            <ul>
              {education.map((e) => (
                <li key={e.school}>
                  {e.school}
                  {e.degree ? ` — ${e.degree}` : ""} · {e.period} · {e.result}
                </li>
              ))}
            </ul>
          </article>
          <article className="prc-proc__group">
            <h3>/proc/extras</h3>
            <ul>
              <li>{resolve(outside, mode)}</li>
            </ul>
          </article>
        </div>
      </section>

      {/* ── 06 · interactive ─────────────────────────────────────── */}
      <section id="terminal" className="prc-section" data-reveal>
        <header className="prc-section__head">
          <span>06</span>
          <h2>query the process</h2>
          <p>the same facts, interactive — ask the profile directly</p>
        </header>
        <Terminal mode={mode} />
      </section>

      {/* ── 07 · open socket ─────────────────────────────────────── */}
      <section id="contact" className="prc-contact" data-reveal>
        <p className="prc-contact__listen">
          LISTENING on <strong>:hire</strong>
          <span className="prc-cursor" />
        </p>
        <h2>{resolve(contact.h2, mode)}</h2>
        <p className="prc-contact__body">{resolve(contact.body, mode)}</p>
        <div className="prc-contact__links">
          <a href={contacts.emailHref}>EMAIL ↗</a>
          <a href={contacts.linkedin} target="_blank" rel="noreferrer">
            LINKEDIN ↗
          </a>
          <a href={contacts.github} target="_blank" rel="noreferrer">
            GITHUB ↗
          </a>
        </div>
      </section>
    </main>
  );
}
