import { projects } from "../../content/profile";
import type { ModeId } from "../../modes/types";

type Props = { mode: ModeId };

export default function ProjectsJSON({ mode: _mode }: Props) {
  return (
    <section className="projects-section section-block">
      <div className="section-head">
        <p className="section-number">04</p>
        <p className="section-kicker">PROJECTS</p>
      </div>
      <div className="section-rule" />
      <div className="projects-notebook">
        <div className="nb-cell nb-cell--in">
          <span className="nb-label">In [5]:</span>
          <code className="nb-code">profile.projects.to_json()</code>
        </div>
        <div className="nb-cell nb-cell--out">
          <span className="nb-label nb-label--out">Out[5]:</span>
          <div className="nb-output">
            <pre className="json-block">
              <span className="json-bracket">{"[\n"}</span>
              {projects.map((p, i) => (
                <span key={p.id} className="json-item">
                  {"  {\n"}
                  {`    "id": `}<span className="json-str">{`"${p.id}"`}</span>{",\n"}
                  {`    "name": `}<span className="json-str">{`"${p.name}"`}</span>{",\n"}
                  {`    "tech": `}<span className="json-arr">{`[${p.tech.map((t) => `"${t}"`).join(", ")}]`}</span>{",\n"}
                  {`    "url": `}<span className="json-str">{`"${p.url}"`}</span>{",\n"}
                  {`    "description": `}<span className="json-str">{`"${p.description._default.slice(0, 80)}…"`}</span>{"\n"}
                  {"  }"}{i < projects.length - 1 ? "," : ""}{"\n"}
                </span>
              ))}
              <span className="json-bracket">{"]"}</span>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
