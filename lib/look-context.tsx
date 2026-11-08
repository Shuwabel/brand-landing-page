"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { looks, type Look } from "@/lib/content";

type LookState = {
  /** The look the visitor stopped on last, or null until they visit the lookbook. */
  favourite: Look | null;
  setFavourite: (id: string) => void;
};

const LookContext = createContext<LookState>({ favourite: null, setFavourite: () => {} });

export function LookProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<string | null>(null);
  const value = useMemo<LookState>(
    () => ({
      favourite: looks.find((l) => l.id === id) ?? null,
      setFavourite: setId,
    }),
    [id],
  );
  return <LookContext.Provider value={value}>{children}</LookContext.Provider>;
}

export const useLook = () => useContext(LookContext);
