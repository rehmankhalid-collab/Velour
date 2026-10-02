export type Size = "regular" | "large";

export type Flavor = {
  id: string;
  name: string;
  note: string;
  garnish: string;
  cup: string;
  panel: string; // css var of panel ground
  ink: "cocoa" | "cream";
};

export const SIZES: Record<Size, { label: string; cents: number }> = {
  regular: { label: "Regular", cents: 600 },
  large: { label: "Large", cents: 800 },
};

// Order is fixed by the brand: chocolate, vanilla, strawberry, pistachio.
export const FLAVORS: Flavor[] = [
  {
    id: "velvet-chocolate",
    name: "Velvet Chocolate",
    note: "Deep, slow-churned cocoa with a silken finish.",
    garnish: "Shaved chocolate curls",
    cup: "/cups/velvet-chocolate.png",
    panel: "var(--color-flavor-chocolate)",
    ink: "cocoa",
  },
  {
    id: "madagascar-vanilla",
    name: "Madagascar Vanilla",
    note: "Real vanilla bean, warm and creamy from first spoonful.",
    garnish: "A vanilla-bean piece",
    cup: "/cups/madagascar-vanilla.png",
    panel: "var(--color-flavor-vanilla)",
    ink: "cocoa",
  },
  {
    id: "strawberry-blush",
    name: "Strawberry Blush",
    note: "Fresh strawberry swirled into soft, rosy cream.",
    garnish: "One strawberry half",
    cup: "/cups/strawberry-blush.png",
    panel: "var(--color-flavor-strawberry)",
    ink: "cream",
  },
  {
    id: "pistachio-silk",
    name: "Pistachio Silk",
    note: "Smooth, nutty and quietly sweet, with a crushed pistachio crown.",
    garnish: "Crushed pistachio",
    cup: "/cups/pistachio-silk.png",
    panel: "var(--color-flavor-pistachio)",
    ink: "cream",
  },
];

export const lineId = (flavorId: string, size: Size) => `${flavorId}:${size}`;

export function priceOf(flavorId: string, size: Size): number | null {
  if (!FLAVORS.some((f) => f.id === flavorId)) return null;
  return SIZES[size]?.cents ?? null;
}

export const money = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    cents / 100,
  );
