"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Grid, Html, OrbitControls } from "@react-three/drei";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { projects } from "@/data/profile";

const W = 6;
const D = 4;
const H = 1.1;
const LINE = "#9cc9ff";
const ACCENT = "#ffb020";

type MatProps = { color: string; active: boolean };

function Mat({ color, active, strong = 0.85, weak = 0.14 }: MatProps & { strong?: number; weak?: number }) {
  return <meshBasicMaterial color={color} transparent opacity={active ? strong : weak} depthWrite={false} />;
}

// L1 · PMS — schedule bars laid out on the slab, with sign-off markers on finished tasks
function PmsInterior({ color, active }: MatProps) {
  const bars = [
    [0, 2.2],
    [1.2, 1.6],
    [1.8, 2.4],
    [3.0, 1.4],
    [3.4, 1.8],
  ];
  return (
    <group position={[-W / 2 + 0.5, 0.12, -D / 2 + 0.7]}>
      {bars.map(([x, len], i) => (
        <group key={i}>
          <mesh position={[x + len / 2, 0, i * 0.6]}>
            <boxGeometry args={[len, 0.1, 0.28]} />
            <Mat color={i < 3 ? color : LINE} active={active} />
          </mesh>
          {i < 3 && (
            <mesh position={[x + len + 0.15, 0.12, i * 0.6]}>
              <octahedronGeometry args={[0.1]} />
              <Mat color={ACCENT} active={active} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

// L2 · AiCest — a dense steel lattice, hinting at the million-element IFC files
function AiCestInterior({ color, active }: MatProps) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const NX = 28;
  const NZ = 18;
  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    let k = 0;
    for (let x = 0; x < NX; x++)
      for (let z = 0; z < NZ; z++) {
        const h = 0.15 + 0.55 * Math.abs(Math.sin(x * 0.45) * Math.cos(z * 0.6));
        m.makeScale(1, h, 1);
        m.setPosition(-W / 2 + 0.3 + (x * (W - 0.6)) / (NX - 1), h / 2 + 0.06, -D / 2 + 0.3 + (z * (D - 0.6)) / (NZ - 1));
        ref.current!.setMatrixAt(k++, m);
      }
    ref.current!.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, NX * NZ]}>
      <boxGeometry args={[0.035, 1, 0.035]} />
      <Mat color={color} active={active} strong={0.7} weak={0.12} />
    </instancedMesh>
  );
}

// L3 · WMS — Kanban columns of standing cards
function WmsInterior({ color, active }: MatProps) {
  const cols = [4, 3, 5];
  return (
    <group position={[-1.6, 0.06, 0]}>
      {cols.map((n, c) => (
        <group key={c} position={[c * 1.6, 0, 0]}>
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry args={[1.2, 0.02, 3.2]} />
            <Mat color={LINE} active={active} strong={0.25} weak={0.05} />
          </mesh>
          {Array.from({ length: n }).map((_, i) => (
            <mesh key={i} position={[0, 0.25, -1.3 + i * 0.6]}>
              <boxGeometry args={[0.9, 0.4, 0.04]} />
              <Mat color={c === 2 ? color : LINE} active={active} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

// L4 · NewCAD — five modules behind a firewall
function NewCadInterior({ color, active }: MatProps) {
  return (
    <group position={[0, 0.06, 0]}>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[-2.2 + i * 1.1, 0.3, -0.4]}>
          <boxGeometry args={[0.8, 0.6, 1.6]} />
          <Mat color={LINE} active={active} strong={0.35} weak={0.06} />
          <Edges color={color} />
        </mesh>
      ))}
      {/* WAF */}
      <mesh position={[0, 0.45, D / 2 - 0.35]}>
        <boxGeometry args={[W - 0.6, 0.9, 0.05]} />
        <Mat color={color} active={active} strong={0.45} weak={0.08} />
      </mesh>
    </group>
  );
}

// L5 · LMS — a lecture screen and rows of students
function LmsInterior({ color, active }: MatProps) {
  const play = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, -0.22);
    s.lineTo(0.36, 0);
    s.lineTo(0, 0.22);
    s.lineTo(0, -0.22);
    return new THREE.ShapeGeometry(s);
  }, []);
  return (
    <group position={[0, 0.06, 0]}>
      <mesh position={[0, 0.55, -D / 2 + 0.3]}>
        <boxGeometry args={[3, 0.9, 0.04]} />
        <Mat color={LINE} active={active} strong={0.3} weak={0.06} />
        <Edges color={color} />
      </mesh>
      <mesh geometry={play} position={[-0.12, 0.55, -D / 2 + 0.33]}>
        <Mat color={ACCENT} active={active} />
      </mesh>
      {Array.from({ length: 3 }).map((_, r) =>
        Array.from({ length: 6 }).map((_, c) => (
          <mesh key={`${r}-${c}`} position={[-2 + c * 0.8, 0.12, 0.2 + r * 0.6]}>
            <boxGeometry args={[0.3, 0.2, 0.3]} />
            <Mat color={color} active={active} strong={0.6} weak={0.1} />
          </mesh>
        )),
      )}
    </group>
  );
}

const interiors: Record<string, (p: MatProps) => React.ReactElement> = {
  pms: PmsInterior,
  aicest: AiCestInterior,
  wms: WmsInterior,
  newcad: NewCadInterior,
  lms: LmsInterior,
};

type StoreyProps = {
  index: number;
  selected: boolean;
  hovered: boolean;
  showLabel: boolean;
  onSelect: () => void;
  onHover: (v: boolean) => void;
};

function Storey({ index, selected, hovered, showLabel, onSelect, onHover }: StoreyProps) {
  const group = useRef<THREE.Group>(null);
  const targetY = index * H;
  const start = useRef<number | null>(null);
  const project = projects[index];
  const Interior = interiors[project.id];

  // Column grid: 4 x 3 bays, like a steel frame
  const columns = useMemo(() => {
    const pts: [number, number][] = [];
    for (let x = 0; x < 4; x++) for (let z = 0; z < 3; z++) pts.push([-W / 2 + (x * W) / 3, -D / 2 + (z * D) / 2]);
    return pts;
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    if (start.current === null) start.current = state.clock.elapsedTime;
    // Floors drop in one by one, like being erected on site
    const t = Math.min(Math.max((state.clock.elapsedTime - start.current - index * 0.28) / 0.9, 0), 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const lift = selected ? 0.18 : hovered ? 0.08 : 0;
    const y = targetY + (1 - ease) * 6 + lift;
    group.current.position.y += (y - group.current.position.y) * (t < 1 ? 1 : 0.15);
    group.current.visible = t > 0;
  });

  const color = selected ? ACCENT : hovered ? "#d4e8ff" : LINE;
  const active = selected || hovered;

  return (
    <group ref={group} position={[0, targetY + 6, 0]}>
      {/* slab */}
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[W, 0.06, D]} />
        <meshBasicMaterial color={color} transparent opacity={selected ? 0.22 : 0.05} depthWrite={false} />
        <Edges color={color} />
      </mesh>
      {/* columns */}
      {columns.map(([x, z], i) => (
        <mesh key={i} position={[x, H / 2, z]}>
          <boxGeometry args={[0.08, H, 0.08]} />
          <meshBasicMaterial color={color} transparent opacity={selected ? 0.9 : 0.35} />
        </mesh>
      ))}
      {/* perimeter beams */}
      <mesh position={[0, H - 0.04, 0]}>
        <boxGeometry args={[W, 0.08, D]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        <Edges color={color} />
      </mesh>
      <Interior color={selected ? ACCENT : LINE} active={active} />
      {showLabel && (
        <Html position={[W / 2, H / 2, D / 2]} zIndexRange={[10, 0]}>
          <button
            className={`floor-label ${selected ? "is-selected" : ""} ${hovered ? "is-hovered" : ""}`}
            onClick={onSelect}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
          >
            <span>{project.level}</span>
            {project.name}
          </button>
        </Html>
      )}
      {/* invisible hit volume for picking the storey */}
      <mesh
        position={[0, H / 2, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onHover(false);
          document.body.style.cursor = "";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <boxGeometry args={[W, H, D]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Roof() {
  const y = projects.length * H;
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-D / 2, 0);
    shape.lineTo(0, 0.9);
    shape.lineTo(D / 2, 0);
    shape.lineTo(-D / 2, 0);
    const g = new THREE.ExtrudeGeometry(shape, { depth: W, bevelEnabled: false });
    g.rotateY(Math.PI / 2);
    g.translate(-W / 2, 0, 0);
    return g;
  }, []);
  return (
    <mesh geometry={geo} position={[0, y, 0]}>
      <meshBasicMaterial transparent opacity={0.04} color={LINE} />
      <Edges color={LINE} />
    </mesh>
  );
}

type Props = {
  selected: number;
  hovered: number | null;
  onSelect: (i: number) => void;
  onHover: (i: number | null) => void;
  variant?: "hero" | "viewer";
};

export default function BuildingScene({ selected, hovered, onSelect, onHover, variant = "viewer" }: Props) {
  const hero = variant === "hero";
  // Narrow screens crop the model horizontally, so pull the camera back
  const far = typeof window !== "undefined" && window.innerWidth < 640 ? 1.35 : 1;
  const base = hero ? 12 : 9;
  return (
    <Canvas camera={{ position: [base * far, 6.5 * far, base * far], fov: hero ? 36 : 38 }} dpr={[1, 2]}>
      <group position={[0, -2.8, 0]}>
        {projects.map((p, i) => (
          <Storey
            key={p.id}
            index={i}
            selected={selected === i}
            hovered={hovered === i}
            showLabel={hero}
            onSelect={() => onSelect(i)}
            onHover={(v) => onHover(v ? i : null)}
          />
        ))}
        <Roof />
        <Grid
          args={[30, 30]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#2f5f93"
          sectionSize={2}
          sectionThickness={1}
          sectionColor="#4f86c6"
          fadeDistance={22}
          fadeStrength={1.5}
          infiniteGrid
        />
      </group>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={hero ? 0.8 : 0.6}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
  );
}
