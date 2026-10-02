"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { FLAVORS, SIZES, lineId, type Size } from "@/lib/catalog";

export type Line = { flavorId: string; size: Size; qty: number };

type CartCtx = {
  lines: Line[];
  count: number;
  totalCents: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (flavorId: string, size: Size) => void;
  setQty: (flavorId: string, size: Size, qty: number) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "velour-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Line[];
        // Restoring from localStorage must happen after hydration.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLines(
          parsed.filter(
            (l) =>
              FLAVORS.some((f) => f.id === l.flavorId) &&
              l.size in SIZES &&
              l.qty > 0,
          ),
        );
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, ready]);

  const add = useCallback((flavorId: string, size: Size) => {
    setLines((prev) => {
      const id = lineId(flavorId, size);
      const hit = prev.find((l) => lineId(l.flavorId, l.size) === id);
      if (hit) {
        return prev.map((l) =>
          lineId(l.flavorId, l.size) === id ? { ...l, qty: l.qty + 1 } : l,
        );
      }
      return [...prev, { flavorId, size, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((flavorId: string, size: Size, qty: number) => {
    setLines((prev) =>
      prev
        .map((l) =>
          l.flavorId === flavorId && l.size === size ? { ...l, qty } : l,
        )
        .filter((l) => l.qty > 0),
    );
  }, []);

  const value = useMemo<CartCtx>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      totalCents: lines.reduce((n, l) => n + l.qty * SIZES[l.size].cents, 0),
      open,
      setOpen,
      add,
      setQty,
    }),
    [lines, open, add, setQty],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
