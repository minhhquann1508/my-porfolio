"use client";

import { createContext, useContext, useState } from "react";

type Selection = {
  selected: number;
  hovered: number | null;
  setSelected: (i: number) => void;
  setHovered: (i: number | null) => void;
};

const SelectionContext = createContext<Selection | null>(null);

// Shared between the hero model and the projects viewer so picking a floor in one is reflected in the other.
export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <SelectionContext.Provider value={{ selected, hovered, setSelected, setHovered }}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useSelection must be used inside SelectionProvider");
  return ctx;
}
