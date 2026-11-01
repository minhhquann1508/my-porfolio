import Image from "next/image";
import { featuredAward as a } from "@/data/profile";

export default function FeaturedAward() {
  return (
    <article className="award">
      <figure className="award-photo">
        <div className="award-photo-frame">
          <Image
            src={a.photo}
            alt={`${a.title} — ${a.caption}`}
            fill
            sizes="(max-width: 860px) 100vw, 640px"
            quality={90}
          />
        </div>
        <figcaption>
          <span className="muted">FIG. B —</span> {a.caption}
        </figcaption>
      </figure>

      <div className="award-body">
        <span className="stamp award-stamp">{a.stamp}</span>
        <div className="eyebrow">
          {a.issuer} · {a.period}
        </div>
        <h3>{a.title}</h3>
        <p>{a.description}</p>
        <dl className="kv award-kv">
          <dt>Status</dt>
          <dd className="hl">Approved ✓</dd>
          <dt>Issued by</dt>
          <dd>{a.issuer}</dd>
          <dt>Period</dt>
          <dd>{a.period}</dd>
        </dl>
      </div>
    </article>
  );
}
