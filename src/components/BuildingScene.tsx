"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Grid, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { projects } from "@/data/profile";

const W = 6;
const D = 4;
const H = 1.1;
const LINE = "#9cc9ff";
const ACCENT = "#ffb020";

type StoreyProps = {
  index: number;
  selected: boolean;
  hovered: boolean;
  onSelect: () => void;
  onHover: (v: boolean) => void;
};

function Storey({ index, selected, hovered, onSelect, onHover }: StoreyProps) {
  const group = useRef<THREE.Group>(null);
  const targetY = index * H;
  const start = useRef<number | null>(null);

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

  return (
    <group ref={group} position={[0, targetY + 6, 0]}>
      {/* slab */}
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[W, 0.06, D]} />
        <meshBasicMaterial color={color} transparent opacity={selected ? 0.35 : 0.06} />
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
};

export default function BuildingScene({ selected, hovered, onSelect, onHover }: Props) {
  return (
    <Canvas camera={{ position: [9, 6.5, 9], fov: 38 }} dpr={[1, 2]}>
      <group position={[0, -2.8, 0]}>
        {projects.map((p, i) => (
          <Storey
            key={p.id}
            index={i}
            selected={selected === i}
            hovered={hovered === i}
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
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
  );
}
