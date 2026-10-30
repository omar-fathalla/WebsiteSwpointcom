import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartProductId = "tashil" | "gift" | "data";

export interface CartItem {
  productId: CartProductId;
  name: string;
  /** What `quantity` counts: employees, branches or one flat plan */
  unitLabel: string;
  quantity: number;
  /** Price per unit per month, in EGP */
  unitPrice: number;
  /** quantity × unitPrice, per month, EGP */
  lineTotal: number;
}

interface CartCtx {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (item: Omit<CartItem, "lineTotal">) => void;
  updateQuantity: (id: CartProductId, qty: number) => void;
  removeItem: (id: CartProductId) => void;
  clear: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (v: boolean) => void;
}

const KEY = "sp_cart_v1";
const Ctx = createContext<CartCtx | null>(null);

export const round2 = (n: number) => Math.round(n * 100) / 100;
export const formatEGP = (n: number) =>
  `${n.toLocaleString("en-EG", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })} EGP`;

function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignore */ }
  }, [items]);

  const addItem = useCallback((it: Omit<CartItem, "lineTotal">) => {
    const q = Math.max(1, Math.floor(it.quantity));
    const next: CartItem = { ...it, quantity: q, lineTotal: round2(q * it.unitPrice) };
    // One subscription line per product: adding again replaces the quantity.
    setItems((prev) => [...prev.filter((p) => p.productId !== it.productId), next]);
  }, []);

  const updateQuantity = useCallback((id: CartProductId, qty: number) => {
    const q = Math.max(1, Math.floor(qty || 1));
    setItems((prev) => prev.map((p) => (p.productId === id ? { ...p, quantity: q, lineTotal: round2(q * p.unitPrice) } : p)));
  }, []);

  const removeItem = useCallback((id: CartProductId) => setItems((prev) => prev.filter((p) => p.productId !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartCtx>(() => ({
    items,
    count: items.length,
    total: round2(items.reduce((s, i) => s + i.lineTotal, 0)),
    addItem, updateQuantity, removeItem, clear,
    drawerOpen, setDrawerOpen, checkoutOpen, setCheckoutOpen,
  }), [items, addItem, updateQuantity, removeItem, clear, drawerOpen, checkoutOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside <CartProvider>");
  return c;
}
