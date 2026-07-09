import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import { contacts } from "../content/contacts";
import { about, contact, experiences, hero, projects, resolve } from "../content/profile";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };
type DesignLens = "structure" | "interaction" | "systems";

const designLenses: {
  id: DesignLens;
  label: string;
  title: string;
  body: string;
  notes: string[];
}[] = [
  {
    id: "structure",
    label: "Structure",
    title: "Make the shape honest first.",
    body:
      "Expose the hierarchy before polishing the surface: ownership, constraints, product logic, and the seams where decisions become visible.",
    notes: ["Hierarchy map", "Constraints visible", "No vague ownership"],
  },
  {
    id: "interaction",
    label: "Interaction",
    title: "A surface should answer when touched.",
    body:
      "Treat every project as an inspectable specimen. The page should react with intent, not just decorate the work around it.",
    notes: ["Readable states", "Intentional motion", "Touchable evidence"],
  },
  {
    id: "systems",
    label: "Systems",
    title: "Taste survives contact with production.",
    body:
      "Good craft is keeping the system coherent across AI products, dashboards, infrastructure, long-running bugs, and release pressure.",
    notes: ["Product breadth", "Debugging signal", "Architecture + UI"],
  },
];

const specimenDetails: Record<string, Record<DesignLens, string>> = {
  interviews: {
    structure: "Conversation, scoring, and reporting are separated so feedback feels specific instead of generic.",
    interaction: "The product moment is the follow-up: it should feel like the interviewer heard the previous answer.",
    systems: "A Zariya AI product surface shaped by architecture, prompt behavior, a 70-session voice pipeline, and production reliability.",
  },
  sudoku: {
    structure: "Two algorithms share one board so the comparison is immediate, not explained after the fact.",
    interaction: "The animation does the teaching: guesses, backtracks, and constraints become visible state.",
    systems: "A compact proof that logic, visualization, and pacing can make an abstract system legible.",
  },
  ttt: {
    structure: "One rule change creates the whole product: every move routes the opponent into a sub-board.",
    interaction: "The board teaches by constraint. You understand the strategy because the UI forces it.",
    systems: "Small surface, high leverage: state, rules, turn flow, and affordances have to stay aligned.",
  },
};

const heroSignals = [
  ["Role", "Software engineer / product-minded builder"],
  ["Method", "Research → architecture → interface → release"],
  ["Evidence", "AI products, dashboards, visual algorithms, games"],
] as const;

const specSelectors = [
  ".designer-hero__name",
  ".designer-hero__manifesto",
  ".designer-studio__tab",
  ".designer-specimen h3",
  ".designer-about p",
  ".designer-exp__title",
  ".designer-contact h2",
] as const;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <path d="M5 13 13 5M7 5h6v6" />
    </svg>
  );
}

function Anno({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span className="designer-anno" style={style} aria-hidden="true">
      {children}
    </span>
  );
}

function clampChannel(value: number) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function channelToHex(value: number) {
  return clampChannel(value).toString(16).padStart(2, "0");
}

function colorToHex(color: string) {
  const trimmed = color.trim();
  const hex = /^#([0-9a-f]{3,8})$/i.exec(trimmed);

  if (hex) {
    const value = hex[1];

    if (value.length === 3 || value.length === 4) {
      return `#${value
        .slice(0, 3)
        .split("")
        .map((char) => char + char)
        .join("")}`.toUpperCase();
    }

    return `#${value.slice(0, 6)}`.toUpperCase();
  }

  const rgb = /rgba?\(\s*([+-]?\d*\.?\d+)(?:\s*,\s*|\s+)([+-]?\d*\.?\d+)(?:\s*,\s*|\s+)([+-]?\d*\.?\d+)/i.exec(trimmed);

  if (rgb) {
    return `#${channelToHex(Number(rgb[1]))}${channelToHex(Number(rgb[2]))}${channelToHex(Number(rgb[3]))}`.toUpperCase();
  }

  const srgb = /^color\(\s*srgb\s+([+-]?\d*\.?\d+)\s+([+-]?\d*\.?\d+)\s+([+-]?\d*\.?\d+)/i.exec(trimmed);

  if (srgb) {
    return `#${channelToHex(Number(srgb[1]) * 255)}${channelToHex(Number(srgb[2]) * 255)}${channelToHex(Number(srgb[3]) * 255)}`.toUpperCase();
  }

  return trimmed.toUpperCase();
}

function firstFontFamily(fontFamily: string) {
  return fontFamily.split(",")[0]?.trim().replace(/^["']|["']$/g, "") || "Font";
}

function roundedPx(value: string, fallback: number) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? Math.round(parsed) : Math.round(fallback);
}

function measuredLineHeight(style: CSSStyleDeclaration, fontSize: number) {
  if (style.lineHeight === "normal") {
    return Math.round(fontSize * 1.2);
  }

  return roundedPx(style.lineHeight, fontSize * 1.2);
}

function SpecLayer({ refreshKey, rootRef }: { refreshKey: string; rootRef: RefObject<HTMLElement> }) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const layer = layerRef.current;

    if (!root || !layer) {
      return undefined;
    }

    let frame = 0;
    let resizeFrame = 0;
    let chips: { chip: HTMLDivElement; element: Element }[] = [];

    const positionChips = () => {
      chips.forEach(({ chip, element }) => {
        const rect = element.getBoundingClientRect();
        chip.style.transform = `translate(${Math.round(rect.right)}px, ${Math.round(rect.top)}px)`;
      });
    };

    const schedulePosition = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        positionChips();
      });
    };

    const rebuildChips = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }

      layer.replaceChildren();
      chips = specSelectors.flatMap((selector) => {
        const element = root.querySelector(selector);

        if (!element) {
          return [];
        }

        const style = window.getComputedStyle(element);
        const fontSize = roundedPx(style.fontSize, 0);
        const lineHeight = measuredLineHeight(style, fontSize);
        const chip = document.createElement("div");
        const tick = document.createElement("span");
        const body = document.createElement("span");
        const typeLine = document.createElement("span");
        const colorLine = document.createElement("span");

        chip.className = "designer-spec-chip";
        tick.className = "designer-spec-chip__tick";
        body.className = "designer-spec-chip__body";
        typeLine.textContent = `${firstFontFamily(style.fontFamily)} ${fontSize}/${lineHeight}`;
        colorLine.textContent = colorToHex(style.color);

        body.append(typeLine, colorLine);
        chip.append(tick, body);
        layer.append(chip);

        return [{ chip, element }];
      });

      positionChips();
    };

    const handleResize = () => {
      if (resizeFrame) {
        return;
      }

      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0;
        rebuildChips();
      });
    };

    rebuildChips();
    window.addEventListener("scroll", schedulePosition, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedulePosition);
      window.removeEventListener("resize", handleResize);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      if (resizeFrame) {
        window.cancelAnimationFrame(resizeFrame);
      }

      layer.replaceChildren();
      chips = [];
    };
  }, [refreshKey, rootRef]);

  return <div className="designer-spec-layer" ref={layerRef} aria-hidden="true" />;
}

export default function DesignerPage({ mode }: Props) {
  const [activeLens, setActiveLens] = useState<DesignLens>("structure");
  const [annotate, setAnnotate] = useState(false);
  const [grid, setGrid] = useState(false);
  const pageRef = useRef<HTMLElement>(null);
  const lens = designLenses.find((item) => item.id === activeLens) ?? designLenses[0];

  return (
    <main ref={pageRef} className={`designer-page designer-page--reclaimed${annotate ? " designer-page--annotated" : ""}${grid ? " designer-page--grid" : ""}`}>
      {grid ? <div className="designer-gridxray" aria-hidden="true" /> : null}
      {annotate ? <SpecLayer refreshKey={activeLens} rootRef={pageRef} /> : null}

      <header className="designer-shellbar">
        <a className="designer-shellbar__brand" href="#designer-title" aria-label="Ayush Saini, back to top">
          <span className="designer-shellbar__mark">AS</span>
          <span className="designer-shellbar__name">Ayush Saini</span>
        </a>
        <nav aria-label="Designer portfolio navigation">
          <a href="#designer-studio">Work</a>
          <a href="#designer-practice">Practice</a>
          <a href="#designer-experience">Experience</a>
          <a href="#designer-composition">About</a>
          <a href="#designer-contact">Contact</a>
        </nav>
      </header>

      <section className="designer-hero" aria-labelledby="designer-title">
        <div className="designer-hero__marker">
          <span>01 / Introduction</span>
          <span>Design persona · inspection surface</span>
        </div>

        <div className="designer-hero__plate-wrap">
          <div className="designer-hero__plate designer-hero__plate--red" aria-hidden="true" />
          <div className="designer-hero__plate designer-hero__plate--navy" aria-hidden="true" />
          <div className="designer-hero__plate designer-hero__plate--yellow" aria-hidden="true" />
          <h1 className="designer-hero__name" id="designer-title">
            Ayush
            <br />
            S<i>a</i>ini.
            {annotate ? (
              <svg className="designer-anno__circle" viewBox="0 0 200 90" aria-hidden="true">
                <ellipse cx="100" cy="45" rx="94" ry="40" />
              </svg>
            ) : null}
          </h1>
          <p className="designer-hero__manifesto">{resolve(hero.statement, mode)}</p>
          {annotate ? (
            <>
              <Anno style={{ top: "7%", right: "5%" }}>display type is the lead instrument, not a decoration layer</Anno>
              <Anno style={{ bottom: "17%", left: "1%" }}>geometric plates: retained from the fresh original direction, tightened into a system</Anno>
            </>
          ) : null}
        </div>

        <dl className="designer-hero__signals" aria-label="Designer mode signals">
          {heroSignals.map(([term, description]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="designer-studio" id="designer-studio" aria-label="Designer studio board">
        <aside className="designer-studio__panel" id="designer-practice">
          <div className="designer-studio__toolbar" role="tablist" aria-label="Design lens">
            {designLenses.map((item) => (
              <button
                key={item.id}
                className={`designer-studio__tab${activeLens === item.id ? " designer-studio__tab--active" : ""}`}
                onClick={() => setActiveLens(item.id)}
                type="button"
                role="tab"
                aria-selected={activeLens === item.id}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="designer-tools" role="group" aria-label="Design inspection tools">
            <span>Tools</span>
            <button onClick={() => setAnnotate((value) => !value)} aria-pressed={annotate} className={annotate ? "is-on" : undefined}>
              Annotate
            </button>
            <button onClick={() => setGrid((value) => !value)} aria-pressed={grid} className={grid ? "is-on" : undefined}>
              Grid
            </button>
          </div>
          <div className="designer-studio__copy">
            <span>02 / Active lens</span>
            <h2>{lens.title}</h2>
            <p>{lens.body}</p>
          </div>
          <ul className="designer-studio__notes">
            {lens.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </aside>

        <div className={`designer-board designer-board--${activeLens}`}>
          <div className="designer-board__ruler designer-board__ruler--top" aria-hidden="true" />
          <div className="designer-board__ruler designer-board__ruler--left" aria-hidden="true" />
          <div className="designer-board__swatches" aria-label="Palette">
            <span className="designer-board__swatch designer-board__swatch--ink" />
            <span className="designer-board__swatch designer-board__swatch--red" />
            <span className="designer-board__swatch designer-board__swatch--gold" />
          </div>
          <svg className="designer-board__paths" viewBox="0 0 900 620" aria-hidden="true">
            <path d="M125 220 C250 40 525 40 650 240 S795 505 610 545" />
            <path d="M225 520 C305 400 430 335 600 310" />
          </svg>

          {projects.map((project, index) => (
            <a
              className={`designer-specimen designer-specimen--${project.id}`}
              href={project.url}
              key={project.id}
              target="_blank"
              rel="noreferrer"
              style={{ "--specimen-index": index } as CSSProperties}
            >
              <span className="designer-specimen__number">{project.number}</span>
              <h3>{project.name}</h3>
              <p>{specimenDetails[project.id]?.[activeLens] ?? resolve(project.description, mode)}</p>
              <span className="designer-specimen__open">
                Open specimen <ArrowIcon />
              </span>
            </a>
          ))}

          {annotate ? (
            <Anno style={{ top: "-1.65rem", right: "0" }}>the page is allowed to critique itself →</Anno>
          ) : null}
          <div className="designer-board__annotation designer-board__annotation--one">hierarchy before ornament</div>
          <div className="designer-board__annotation designer-board__annotation--two">interaction is evidence</div>
        </div>
      </section>

      <section className="designer-about" id="designer-composition">
        {annotate ? <Anno style={{ top: "0.4rem", right: "4%" }}>this section keeps the portfolio human, not just formal</Anno> : null}
        <h2>
          Work as <em>composition</em>, not decoration.
        </h2>
        <div>
          <p>{resolve(about.p1, mode)}</p>
          <p>{resolve(about.p2, mode)}</p>
        </div>
      </section>

      <section className="designer-exp" id="designer-experience">
        <div className="designer-hero__marker designer-hero__marker--section">
          <span>03 / Where</span>
          <span>Places the practice has been tested</span>
        </div>
        {experiences.map((experience) => (
          <article className="designer-exp__row" key={experience.id}>
            <span className="designer-exp__yr">{experience.period}</span>
            <h3 className="designer-exp__title">
              {experience.company} <em>{experience.role}</em>
            </h3>
            <span className="designer-exp__meta">{experience.mode}</span>
          </article>
        ))}
      </section>

      <footer className="designer-contact" id="designer-contact">
        <h2>
          {resolve(contact.h2, mode)} if the <em>surface</em> matters to you.
        </h2>
        <div className="designer-contact__links">
          <a href={contacts.emailHref}>Email ↗</a>
          <a href={contacts.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={contacts.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </footer>
    </main>
  );
}
