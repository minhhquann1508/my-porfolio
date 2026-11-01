"use client";

import { useEffect, useRef, useState } from "react";
import { projects, timeline } from "@/data/profile";
import { useSelection } from "./Selection";

const toIndex = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export default function GanttSchedule() {
  const { selected, setSelected } = useSelection();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const from = toIndex(timeline.from);
  const to = toIndex(timeline.to);
  const span = to - from + 1;
  const pct = (ym: string) => ((toIndex(ym) - from) / span) * 100;
  const todayPct = pct(timeline.today) + 100 / span / 2;

  const months = Array.from({ length: span }, (_, i) => {
    const idx = from + i;
    return { m: idx % 12, y: Math.floor(idx / 12) };
  });

  // Earliest start first, like a schedule read top-down
  const rows = [...projects].sort((a, b) => toIndex(a.start) - toIndex(b.start));

  return (
    <div ref={ref} className={`gantt ${inView ? "is-in" : ""}`} style={{ "--span": span } as React.CSSProperties}>
      <div className="gantt-row gantt-head">
        <div className="gantt-label">Task</div>
        <div className="gantt-track">
          {months.map(({ m, y }, i) => (
            <div key={i} className={`gantt-month ${m === 0 ? "is-year" : ""}`} style={{ width: `${100 / span}%` }}>
              {m === 0 ? `’${String(y).slice(2)}` : MONTHS[m]}
            </div>
          ))}
        </div>
      </div>

      {timeline.companies.map((c) => (
        <div key={c.name} className="gantt-row is-summary">
          <div className="gantt-label">▾ {c.name}</div>
          <div className="gantt-track">
            <div
              className="gantt-bar is-company"
              style={{ left: `${pct(c.start)}%`, width: `${todayPct - pct(c.start)}%` }}
            />
          </div>
        </div>
      ))}

      {rows.map((p, i) => {
        const index = projects.indexOf(p);
        const left = pct(p.start);
        const right = p.end ? pct(p.end) + 100 / span : todayPct;
        return (
          <div key={p.id} className="gantt-row">
            <div className="gantt-label">
              <span className="muted">{p.level}</span> {p.name}
            </div>
            <div className="gantt-track">
              <button
                className={`gantt-bar ${selected === index ? "is-selected" : ""} ${p.end ? "is-done" : ""}`}
                style={{ left: `${left}%`, width: `${right - left}%`, transitionDelay: `${i * 0.12}s` }}
                onClick={() => {
                  setSelected(index);
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                title={`${p.fullName} · ${p.period}`}
              >
                <span>{p.role}</span>
              </button>
            </div>
          </div>
        );
      })}

      <div className="gantt-row is-milestones">
        <div className="gantt-label">◆ Milestones</div>
        <div className="gantt-track">
          {timeline.milestones.map((m) => (
            <div key={m.label} className="gantt-milestone" style={{ left: `${pct(m.date) + 100 / span / 2}%` }}>
              <i />
              <span>{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="gantt-overlay">
        <div className="gantt-label" />
        <div className="gantt-track">
          <div className="gantt-today" style={{ left: `${todayPct}%` }}>
            <span>Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}
