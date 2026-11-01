import Image from "next/image";
import { about, personalSkills, profile } from "@/data/profile";

export default function AboutSection() {
  return (
    <section className="section" id="about">
      <div className="section-head">
        <span className="section-code">DWG-02</span>
        <h2>Elevation — the engineer</h2>
        <p className="muted">The person behind the drawings.</p>
      </div>

      <div className="about">
        <figure className="portrait">
          <div className="portrait-frame">
            <div className="portrait-photo">
              <Image src={about.photo} alt={profile.name} fill sizes="(max-width: 960px) 100vw, 380px" quality={90} priority />
            </div>
            <span className="cross tl" />
            <span className="cross tr" />
            <span className="cross bl" />
            <span className="cross br" />
          </div>
          <div className="dim-v" aria-hidden>
            <i />
            <b>1 : 1</b>
            <i />
          </div>
          <figcaption>
            <span className="muted">FIG. A —</span> {profile.name}, on site
          </figcaption>
        </figure>

        <div className="about-text">
          <p className="about-greeting">{about.greeting}</p>
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <dl className="kv about-facts">
            {about.facts.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="section-sub">
        <h3>Structural properties</h3>
        <p className="muted">How I work — each claim comes with its test certificate.</p>
      </div>
      <div className="props-grid">
        {personalSkills.map((s) => (
          <article key={s.code} className="prop-card">
            <header>
              <span className="mono prop-code">{s.code}</span>
              <span className="mono prop-property">{s.property}</span>
            </header>
            <h4>{s.title}</h4>
            <p>{s.description}</p>
            <footer>
              <span className="mono">PROOF</span>
              {s.proof}
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
