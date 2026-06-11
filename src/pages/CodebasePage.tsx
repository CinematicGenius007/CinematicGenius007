import { FILE_LIST, QUIPS, type FileId } from "./codebaseContent";
import { contacts } from "../content/contacts";
import { useState, useEffect, useCallback } from "react";
import { experiences, projects, skillGroups, education } from "../content/profile";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

interface TooltipState {
  x: number;
  y: number;
  signature: string;
  detail: string;
}


function useQuip() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % QUIPS.length), 3200);
    return () => clearInterval(id);
  }, []);
  return QUIPS[i];
}

// ─── Files ────────────────────────────────────────────────────────────────────

// ─── Hover token ──────────────────────────────────────────────────────────────
function Token({
  children,
  cls,
  sig,
  detail,
  onHover,
  onLeave,
}: {
  children: React.ReactNode;
  cls?: string;
  sig?: string;
  detail?: string;
  onHover?: (x: number, y: number, sig: string, detail: string) => void;
  onLeave?: () => void;
}) {
  return (
    <span
      className={`ide-t${cls ? ` ide-t--${cls}` : ""}${sig ? " ide-t--hoverable" : ""}`}
      onMouseEnter={
        sig && onHover
          ? (e) => onHover(e.clientX, e.clientY, sig, detail ?? "")
          : undefined
      }
      onMouseLeave={sig && onLeave ? onLeave : undefined}
    >
      {children}
    </span>
  );
}

// ─── File renders ─────────────────────────────────────────────────────────────

type Handlers = {
  onHover: (x: number, y: number, sig: string, detail: string) => void;
  onLeave: () => void;
};

function ReadmeFile({ onHover, onLeave }: Handlers) {
  const h = { onHover, onLeave };
  return (
    <div className="ide-editor__content ide-md">
      <div className="ide-line"><Token cls="md-h1"># Ayush Saini</Token></div>
      <div className="ide-line ide-line--blank" />
      <div className="ide-line">
        <Token cls="cmt">{">"}</Token>
        {" Full-stack engineer. "}
        <Token cls="str" sig={`(property) company: "Optmyzr"`} detail="Ad-tech SaaS. Google Ads automation platform." {...h}>Optmyzr</Token>
        {" → AI campaign creation, portfolios, scripts, automation."}
      </div>
      <div className="ide-line ide-line--blank" />
      <div className="ide-line"><Token cls="md-h2">## What I do</Token></div>
      <div className="ide-line ide-line--blank" />
      <div className="ide-line">{"I build and maintain ad-tech product surfaces where correctness matters:"}</div>
      <div className="ide-line">{"AI campaign creation, portfolios, alerts, scripts, dashboards, automation,"}</div>
      <div className="ide-line">{"and the production bugs that cut across all of them."}</div>
      <div className="ide-line ide-line--blank" />
      <div className="ide-line">{"Backend-first. But I've debugged enough frontend issues hiding a bad"}</div>
      <div className="ide-line">{"rule to know the signal breaks wherever it wants."}</div>
      <div className="ide-line ide-line--blank" />
      <div className="ide-line"><Token cls="md-h2">## Quick facts</Token></div>
      <div className="ide-line ide-line--blank" />
      <div className="ide-line"><Token cls="cmt">{"- "}</Token>Two years in ad-tech. Long enough to have strong opinions.</div>
      <div className="ide-line"><Token cls="cmt">{"- "}</Token>Shipped the boring version first every single time.</div>
      <div className="ide-line"><Token cls="cmt">{"- "}</Token>Comfortable across frontend, backend, systems thinking.</div>
      <div className="ide-line"><Token cls="cmt">{"- "}</Token>Theatre + debate background. Useful in code review.</div>
      <div className="ide-line ide-line--blank" />
      <div className="ide-line"><Token cls="md-h2">## Education</Token></div>
      <div className="ide-line ide-line--blank" />
      {education.map((e) => (
        <div key={e.school} className="ide-line">
          <Token cls="cmt">{"- "}</Token>
          <Token cls="str" sig={`school: "${e.school}"`} detail={`${e.degree || "Study"} · ${e.result}`} {...h}>{e.school}</Token>
          {` · ${e.period} · `}
          <Token cls="num">{e.result}</Token>
        </div>
      ))}
    </div>
  );
}

function ExperienceFile({ onHover, onLeave }: Handlers) {
  const h = { onHover, onLeave };
  return (
    <div className="ide-editor__content">
      <div className="ide-line"><Token cls="kw">interface</Token> <Token cls="type">Experience</Token> {"{"}</div>
      <div className="ide-line">{"  "}<Token cls="prop">company</Token>{": "}<Token cls="type">string</Token>{";"}</div>
      <div className="ide-line">{"  "}<Token cls="prop">role</Token>{": "}<Token cls="type">string</Token>{";"}</div>
      <div className="ide-line">{"  "}<Token cls="prop">period</Token>{": "}<Token cls="type">string</Token>{";"}</div>
      <div className="ide-line">{"  "}<Token cls="prop">focus</Token>{": "}<Token cls="type">string</Token>{"[];"}</div>
      <div className="ide-line">{"}"}</div>
      <div className="ide-line ide-line--blank" />
      <div className="ide-line">
        <Token cls="kw">const</Token>{" "}
        <Token cls="prop">experiences</Token>{": "}
        <Token cls="type">Experience</Token>{"[] = ["}
      </div>

      {experiences.map((exp, i) => (
        <div key={exp.id} className="ide-block">
          <div className="ide-line">{"  {"}</div>
          <div className="ide-line">
            {"    "}<Token cls="prop">company</Token>{": "}
            <Token
              cls="str"
              sig={`company: "${exp.company}"`}
              detail={exp.pmCase?.context ?? exp.role}
              {...h}
            >{`"${exp.company}"`}</Token>{","}
          </div>
          <div className="ide-line">
            {"    "}<Token cls="prop">role</Token>{": "}
            <Token cls="str">{`"${exp.role}"`}</Token>{","}
          </div>
          <div className="ide-line">
            {"    "}<Token cls="prop">period</Token>{": "}
            <Token cls="str" sig={`period: "${exp.period}"`} detail={exp.mode} {...h}>{`"${exp.period}"`}</Token>{","}
          </div>
          <div className="ide-line">{"    "}<Token cls="prop">focus</Token>{": ["}</div>
          {exp.bullets.map((b, j) => {
            const text = typeof b === "string" ? b : b._default;
            const short = text.length > 52 ? text.slice(0, 52) + "…" : text;
            return (
              <div key={j} className="ide-line">
                {"      "}
                <Token cls="str" sig={`focus[${j}]: string`} detail={text} {...h}>{`"${short}"`}</Token>{","}
              </div>
            );
          })}
          <div className="ide-line">{"    ],"}</div>
          <div className="ide-line">{`  }${i < experiences.length - 1 ? "," : ""}`}</div>
        </div>
      ))}
      <div className="ide-line">{"];"}</div>
    </div>
  );
}

function ProjectsFile({ onHover, onLeave }: Handlers) {
  const h = { onHover, onLeave };
  return (
    <div className="ide-editor__content">
      <div className="ide-line"><Token cls="kw">interface</Token> <Token cls="type">Project</Token> {"{"}</div>
      <div className="ide-line">{"  "}<Token cls="prop">name</Token>{": "}<Token cls="type">string</Token>{";"}</div>
      <div className="ide-line">{"  "}<Token cls="prop">url</Token>{": "}<Token cls="type">string</Token>{";"}</div>
      <div className="ide-line">{"  "}<Token cls="prop">tech</Token>{": "}<Token cls="type">string</Token>{"[];"}</div>
      <div className="ide-line">{"  "}<Token cls="prop">description</Token>{": "}<Token cls="type">string</Token>{";"}</div>
      <div className="ide-line">{"}"}</div>
      <div className="ide-line ide-line--blank" />
      <div className="ide-line">
        <Token cls="kw">const</Token>{" "}
        <Token cls="prop">projects</Token>{": "}
        <Token cls="type">Project</Token>{"[] = ["}
      </div>
      {projects.map((proj, i) => (
        <div key={proj.id} className="ide-block">
          <div className="ide-line">{"  {"}</div>
          <div className="ide-line">
            {"    "}<Token cls="prop">name</Token>{": "}
            <Token cls="str" sig={`name: "${proj.name}"`} detail={typeof proj.description === "string" ? proj.description : proj.description._default} {...h}>{`"${proj.name}"`}</Token>{","}
          </div>
          <div className="ide-line">
            {"    "}<Token cls="prop">url</Token>{": "}
            <Token cls="str">{`"${proj.url}"`}</Token>{","}
          </div>
          <div className="ide-line">
            {"    "}<Token cls="prop">tech</Token>{": ["}
            {proj.tech.map((t, j) => (
              <span key={t}>
                <Token cls="str" sig={`tech: "${t}"`} detail="" {...h}>{`"${t}"`}</Token>
                {j < proj.tech.length - 1 ? ", " : ""}
              </span>
            ))}
            {"],"}
          </div>
          <div className="ide-line">{`  }${i < projects.length - 1 ? "," : ""}`}</div>
        </div>
      ))}
      <div className="ide-line">{"];"}</div>
    </div>
  );
}

function SkillsFile({ onHover, onLeave }: Handlers) {
  const h = { onHover, onLeave };
  return (
    <div className="ide-editor__content">
      <div className="ide-line">{"{"}</div>
      {skillGroups.map((group, gi) => (
        <div key={group.label} className="ide-block">
          <div className="ide-line">
            {"  "}
            <Token cls="prop">{`"${group.label.toLowerCase()}"`}</Token>
            {": ["}
          </div>
          {group.items.map((item, ii) => (
            <div key={item} className="ide-line">
              {"    "}
              <Token cls="str" sig={`${group.label}: "${item}"`} detail={`${group.label} skill`} {...h}>{`"${item}"`}</Token>
              {ii < group.items.length - 1 ? "," : ""}
            </div>
          ))}
          <div className="ide-line">{`  ]${gi < skillGroups.length - 1 ? "," : ""}`}</div>
        </div>
      ))}
      <div className="ide-line">{"}"}</div>
    </div>
  );
}

function ContactFile() {
  return (
    <div className="ide-editor__content ide-md">
      <div className="ide-line"><Token cls="md-h1"># Contact</Token></div>
      <div className="ide-line ide-line--blank" />
      <div className="ide-line">{"I read my email."}</div>
      <div className="ide-line ide-line--blank" />
      <div className="ide-line">
        {"If you're hiring, building, or stuck on something weird,"}
      </div>
      <div className="ide-line">{"the fastest way to me is below."}</div>
      <div className="ide-line ide-line--blank" />
      <div className="ide-line"><Token cls="md-h2">## Routes</Token></div>
      <div className="ide-line ide-line--blank" />
      <div className="ide-line">
        <Token cls="cmt">{"- "}</Token>
        <Token cls="str">{"email"}</Token>
        {" → "}
        <a className="ide-link" href={contacts.emailHref}>
          {contacts.email}
        </a>
      </div>
      <div className="ide-line">
        <Token cls="cmt">{"- "}</Token>
        <Token cls="str">{"linkedin"}</Token>
        {" → "}
        <a className="ide-link" href={contacts.linkedin} target="_blank" rel="noreferrer">
          ayush-saini-858357200
        </a>
      </div>
      <div className="ide-line">
        <Token cls="cmt">{"- "}</Token>
        <Token cls="str">{"github"}</Token>
        {" → "}
        <a className="ide-link" href={contacts.github} target="_blank" rel="noreferrer">
          CinematicGenius007
        </a>
      </div>
    </div>
  );
}

// ─── Tooltip overlay ──────────────────────────────────────────────────────────

function HoverTooltip({ tip }: { tip: TooltipState }) {
  return (
    <div
      className="ide-tooltip"
      style={{
        left: Math.min(tip.x + 16, window.innerWidth - 320),
        top: tip.y - 60,
      }}
    >
      <p className="ide-tooltip__sig">
        <Token cls="kw">const</Token>{" "}
        <span className="ide-tooltip__code">{tip.signature}</span>
      </p>
      {tip.detail && (
        <p className="ide-tooltip__detail">{tip.detail}</p>
      )}
    </div>
  );
}

// ─── Line numbers ─────────────────────────────────────────────────────────────

function LineNumbers({ count }: { count: number }) {
  return (
    <div className="ide-gutter">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="ide-gutter__num">{i + 1}</span>
      ))}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function CodebasePage({ mode }: Props) {
  const [active, setActive] = useState<FileId>("readme");
  const [openTabs, setOpenTabs] = useState<FileId[]>(["readme", "experience"]);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const quip = useQuip();

  const openFile = useCallback((id: FileId) => {
    setActive(id);
    setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const closeTab = useCallback((id: FileId, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenTabs((prev) => {
      const next = prev.filter((t) => t !== id);
      if (active === id && next.length > 0) {
        setActive(next[next.length - 1]);
      }
      return next;
    });
  }, [active]);

  const showTip = useCallback((x: number, y: number, signature: string, detail: string) => {
    setTooltip({ x, y, signature, detail });
  }, []);

  const hideTip = useCallback(() => setTooltip(null), []);

  const handlers: Handlers = { onHover: showTip, onLeave: hideTip };

  const currentFile = FILE_LIST.find((f) => f.id === active);

  // Count lines for gutter
  const lineCount = (() => {
    switch (active) {
      case "readme":     return 22;
      case "experience": return 14 + experiences.reduce((a, e) => a + e.bullets.length + 6, 0);
      case "projects":   return 10 + projects.reduce((a, p) => a + p.tech.length + 4, 0);
      case "skills":     return 2 + skillGroups.reduce((a, g) => a + g.items.length + 2, 0);
      case "contact":    return 18;
      default:           return 20;
    }
  })();

  return (
    <div className="ide-page">
      <h1 className="sr-only">Ayush Saini live codebase portfolio</h1>
      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside className="ide-sidebar">
        <div className="ide-sidebar__header">EXPLORER</div>
        <div className="ide-sidebar__root">
          <div className="ide-tree-root">
            <span className="ide-tree-arrow">▾</span>
            <span className="ide-tree-folder">ayush-saini</span>
          </div>
          <ul className="ide-file-tree">
            {FILE_LIST.map((f) => (
              <li
                key={f.id}
              >
                <button
                  className={`ide-file-item${active === f.id ? " ide-file-item--active" : ""}`}
                  onClick={() => openFile(f.id)}
                  aria-current={active === f.id ? "page" : undefined}
                >
                  <span className="ide-file-item__icon">
                    {f.lang === "ts" ? "TS" : f.lang === "json" ? "{}" : "MD"}
                  </span>
                  <span className="ide-file-item__name">{f.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* ── Editor ──────────────────────────────────────────────── */}
      <div className="ide-editor-area">
        {/* Tabs */}
        <div className="ide-tabs">
          {openTabs.map((id) => {
            const f = FILE_LIST.find((x) => x.id === id)!;
            return (
              <div
                key={id}
                className={`ide-tab${id === active ? " ide-tab--active" : ""}`}
                onClick={() => setActive(id)}
              >
                <span className="ide-tab__icon">
                  {f.lang === "ts" ? "TS" : f.lang === "json" ? "{}" : "MD"}
                </span>
                <span className="ide-tab__name">{f.name}</span>
                <button
                  className="ide-tab__close"
                  onClick={(e) => closeTab(id, e)}
                  aria-label={`Close ${f.name}`}
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>

        {/* Breadcrumb */}
        <div className="ide-breadcrumb">
          <span className="ide-breadcrumb__seg">ayush-saini</span>
          <span className="ide-breadcrumb__sep">›</span>
          <span className="ide-breadcrumb__seg ide-breadcrumb__seg--active">
            {currentFile?.name}
          </span>
        </div>

        {/* Content */}
        <div className="ide-editor-body">
          <LineNumbers count={lineCount} />
          <div className="ide-editor-scroll">
            {active === "readme"     && <ReadmeFile {...handlers} />}
            {active === "experience" && <ExperienceFile {...handlers} />}
            {active === "projects"   && <ProjectsFile {...handlers} />}
            {active === "skills"     && <SkillsFile {...handlers} />}
            {active === "contact"    && <ContactFile />}
          </div>
        </div>
      </div>

      {/* ── Status bar ──────────────────────────────────────────── */}
      <div className="ide-status">
        <div className="ide-status__left">
          <span className="ide-status__item ide-status__item--branch">⎇ main</span>
          <span className="ide-status__item">⚠ 0</span>
          <span className="ide-status__item">✓ 0</span>
        </div>
        <div className="ide-status__center">
          <span className="ide-status__quip">{quip}</span>
        </div>
        <div className="ide-status__right">
          <span className="ide-status__item">
            {currentFile?.lang === "ts" ? "TypeScript" : currentFile?.lang === "json" ? "JSON" : "Markdown"}
          </span>
          <span className="ide-status__item">UTF-8</span>
          <span className="ide-status__item">Ln 1, Col 1</span>
        </div>
      </div>

      {/* ── Tooltip ─────────────────────────────────────────────── */}
      {tooltip && <HoverTooltip tip={tooltip} />}
    </div>
  );
}
