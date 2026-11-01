"use client";

import dynamic from "next/dynamic";
import { projects } from "@/data/profile";
import { useSelection } from "./Selection";

const BuildingScene = dynamic(() => import("./BuildingScene"), {
  ssr: false,
  loading: () => <div className="viewer-loading">Erecting structure…</div>,
});

export default function HeroModel() {
  const { selected, hovered, setSelected, setHovered } = useSelection();
  const focus = projects[hovered ?? selected];

  return (
    <div className="hero-model">
      <div className="hero-model-corner tl">VIEW · ISO-NE</div>
      <div className="hero-model-corner tr">{projects.length} storeys · drag to rotate</div>
      <BuildingScene
        variant="hero"
        selected={selected}
        hovered={hovered}
        onHover={setHovered}
        onSelect={(i) => {
          setSelected(i);
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <div className="hero-model-caption">
        <span className="muted">{focus.level} ·</span> {focus.name}
        <span className="muted"> — {focus.fullName}</span>
      </div>
    </div>
  );
}
