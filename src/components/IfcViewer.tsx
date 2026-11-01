"use client";

import dynamic from "next/dynamic";
import { projects } from "@/data/profile";
import { useSelection } from "./Selection";

const BuildingScene = dynamic(() => import("./BuildingScene"), {
  ssr: false,
  loading: () => <div className="viewer-loading">Loading model…</div>,
});

export default function IfcViewer() {
  const { selected, hovered, setSelected, setHovered } = useSelection();
  const p = projects[selected];

  return (
    <div className="viewer">
      <div className="viewer-bar">
        <span>● MQ_Portfolio.ifc</span>
        <span className="muted">IFC4 · {projects.length} storeys · click a floor to inspect</span>
      </div>

      <div className="viewer-body">
        {/* Model tree */}
        <aside className="panel tree">
          <div className="panel-title">Model tree</div>
          <ul>
            <li className="muted">▾ IfcProject · Career</li>
            <li className="muted indent-1">▾ IfcBuilding · Experience</li>
            {[...projects].reverse().map((proj) => {
              const i = projects.indexOf(proj);
              return (
                <li key={proj.id} className="indent-2">
                  <button
                    className={`tree-item ${selected === i ? "is-selected" : ""} ${hovered === i ? "is-hovered" : ""}`}
                    onClick={() => setSelected(i)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span className="lvl">{proj.level}</span> {proj.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* 3D canvas */}
        <div className="canvas-wrap">
          <BuildingScene selected={selected} hovered={hovered} onSelect={setSelected} onHover={setHovered} />
          <div className="canvas-tag">
            {hovered !== null ? `Hover · ${projects[hovered].level} ${projects[hovered].name}` : `Selected · ${p.level} ${p.name}`}
          </div>
        </div>

        {/* Properties */}
        <aside className="panel props" key={p.id}>
          <div className="panel-title">Properties</div>
          <dl className="kv">
            <dt>Type</dt>
            <dd>IfcBuildingStorey</dd>
            <dt>Level</dt>
            <dd>{p.level}</dd>
            <dt>Name</dt>
            <dd className="hl">{p.name}</dd>
            <dt>Long name</dt>
            <dd>{p.fullName}</dd>
            <dt>Role</dt>
            <dd>{p.role}</dd>
            <dt>Owner</dt>
            <dd>{p.company}</dd>
            <dt>Period</dt>
            <dd>{p.period}</dd>
          </dl>
          {p.metric && (
            <div className="metric">
              <span className="metric-value">{p.metric.value}</span>
              <span className="metric-label">{p.metric.label}</span>
            </div>
          )}
          <p className="desc">{p.description}</p>
          <div className="panel-sub">Elements · {p.features.length}</div>
          <ul className="features">
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="panel-sub">Materials</div>
          <div className="chips">
            {p.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
