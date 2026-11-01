import AboutSection from "@/components/AboutSection";
import GanttSchedule from "@/components/GanttSchedule";
import HeroModel from "@/components/HeroModel";
import IfcViewer from "@/components/IfcViewer";
import { SelectionProvider } from "@/components/Selection";
import { achievements, profile, projects, skills } from "@/data/profile";

export default function Home() {
  return (
    <SelectionProvider>
      <main className="sheet">
        {/* ── Title block / hero ── */}
        <header className="hero">
          <div className="hero-left">
            <div className="eyebrow">DWG-01 · General arrangement</div>
            <h1>
              {profile.name}
              <span className="dim-line" aria-hidden>
                <i />
                <b>2+ yrs</b>
                <i />
              </span>
            </h1>
            <p className="role">
              {profile.title}{" "}
              <span className="muted">
                — building systems that carry real load.
              </span>
            </p>
            <p className="summary">{profile.summary}</p>
            <div className="cta">
              <a className="btn btn-primary" href={profile.cv} download>
                ↓ Download CV
              </a>
              <a className="btn" href={`mailto:${profile.email}`}>
                ✉ {profile.email}
              </a>
            </div>
          </div>

          <HeroModel />
        </header>

        <table className="title-block">
          <tbody>
            <tr>
              <th>Project</th>
              <th>Discipline</th>
              <th>Location</th>
              <th>Scale</th>
              <th>Rev</th>
              <th>Status</th>
            </tr>
            <tr>
              <td>{profile.name}</td>
              <td>Backend · Fullstack · System design</td>
              <td>{profile.location}</td>
              <td>1 : 1,000,000 elements</td>
              <td>2026.11</td>
              <td>
                <span className="status-dot" /> Open to opportunities
              </td>
            </tr>
          </tbody>
        </table>

        <section className="stats">
          {profile.stats.map((s) => (
            <div key={s.label} className="stat">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </section>

        <AboutSection />

      {/* ── Projects as a building ── */}
        <section className="section" id="projects">
          <div className="section-head">
            <span className="section-code">DWG-03</span>
            <h2>Projects, storey by storey</h2>
            <p className="muted">
              Every system I&apos;ve shipped is one floor of this model. Rotate
              it, pick a floor, read its properties.
            </p>
          </div>
          <IfcViewer />
        </section>

        {/* ── Experience as a construction schedule ── */}
        <section className="section" id="schedule">
          <div className="section-head">
            <span className="section-code">DWG-04</span>
            <h2>Construction schedule</h2>
            <p className="muted">
              Two companies, five systems, running in parallel. Click a bar to
              open that floor.
            </p>
          </div>
          <GanttSchedule />
        </section>

        {/* ── Skills as Bill of Quantities ── */}
        <section className="section" id="skills">
          <div className="section-head">
            <span className="section-code">DWG-05</span>
            <h2>Bill of materials</h2>
            <p className="muted">Quantity takeoff of what I build with.</p>
          </div>
          <table className="boq">
            <thead>
              <tr>
                <th>Code</th>
                <th>Category</th>
                <th>Materials</th>
                <th className="r">Qty</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((s) => (
                <tr key={s.code}>
                  <td className="mono">{s.code}</td>
                  <td>{s.category}</td>
                  <td>
                    <div className="chips">
                      {s.items.map((i) => (
                        <span key={i} className="chip">
                          {i}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="r mono">
                    {s.items.length.toString().padStart(2, "0")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ── Achievements as approval stamps ── */}
        <section className="section" id="approvals">
          <div className="section-head">
            <span className="section-code">DWG-06</span>
            <h2>Inspected &amp; approved</h2>
            <p className="muted">Sign-offs collected along the way.</p>
          </div>
          <div className="stamps">
            {achievements.map((a, i) => (
              <div key={a.title} className="stamp-card">
                <span
                  className="stamp"
                  style={{ rotate: `${(i % 2 ? 1 : -1) * (4 + i)}deg` }}
                >
                  {a.stamp}
                </span>
                <div className="stamp-title">{a.title}</div>
                <div className="muted small">{a.detail}</div>
              </div>
            ))}
          </div>
        </section>

        <footer className="footer">
          <div>
            <div className="eyebrow">
              End of drawing set · {projects.length} storeys · 0 open issues
            </div>
            <h2>Let&apos;s build something that holds up.</h2>
          </div>
          <div className="cta">
            <a className="btn btn-primary" href={`mailto:${profile.email}`}>
              ✉ Get in touch
            </a>
            {profile.github && (
              <a
                className="btn"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            )}
            {profile.linkedin && (
              <a
                className="btn"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            )}
          </div>
        </footer>
      </main>
    </SelectionProvider>
  );
}
