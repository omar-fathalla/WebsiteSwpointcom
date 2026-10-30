import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Minus, Plus, Repeat, ShoppingCart, ArrowRight } from "lucide-react";
import { formatEGP, round2, useCart, type CartProductId } from "../context/CartContext";

const jakarta = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

interface SubPlan {
  id: CartProductId;
  name: string;
  arName: string;
  accent: string;
  subtitle: string;
  unitPrice: number;
  /** null = flat price, no quantity */
  unit: { en: string; ar: string; plural: string } | null;
  defaultQty: number;
  features: string[];
}

export const SUB_PLANS: SubPlan[] = [
  {
    id: "tashil", name: "Tashil", arName: "نظام المناديب", accent: "#A78BFA",
    subtitle: "Field workforce & attendance — pay per employee",
    unitPrice: 83.33, unit: { en: "employee", ar: "موظف", plural: "employees" }, defaultQty: 10,
    features: [
      "Geofenced check-in & check-out with mock-GPS blocking",
      "Device binding & anti-fraud audit logs",
      "Live tracking, tasks and shelf-photo permissions",
      "Leave, excuse & device-unbind approvals",
      "Penalties, payroll and wallets",
      "Supervisor web command center + Android & iOS app",
    ],
  },
  {
    id: "gift", name: "Tashil Gift", arName: "نظام الهدايا", accent: "#D4B24C",
    subtitle: "AI receipt-to-reward campaigns — pay per branch",
    unitPrice: 1000, unit: { en: "branch", ar: "فرع", plural: "branches" }, defaultQty: 5,
    features: [
      "AI receipt scanning with duplicate & fraud checks",
      "Spin the Wheel, Scratch & Win and surprise box",
      "Branch stock & prize management",
      "Partner portal: stock, daily sales, vouchers",
      "WhatsApp winner notifications",
      "Campaign reports & analytics",
    ],
  },
  {
    id: "data", name: "Tashil Data Sharing", arName: "منصة البيانات", accent: "#5BA8FF",
    subtitle: "Sell-in / sell-out intelligence portal — flat 5,000 EGP per subscription / month",
    unitPrice: 5000, unit: { en: "subscription", ar: "اشتراك", plural: "subscriptions" }, defaultQty: 1,
    features: [
      "Branded tenant portal with 6 user roles",
      "Smart AI upload for Sell-In, Sell-Out & Product Master",
      "Executive dashboards, targets & OOS monitor",
      "Store matrix, pricing & compare views",
      "CPFR replenishment & trade-marketing ROI",
      "Data-quality reports, audit logs & Excel export",
    ],
  },
];

function PlanCard({ plan }: { plan: SubPlan }) {
  const { addItem, setDrawerOpen, items } = useCart();
  const [qty, setQty] = useState(plan.defaultQty);
  const total = round2(qty * plan.unitPrice);
  const inCart = items.some((i) => i.productId === plan.id);
  const setQ = (v: number) => setQty(Math.max(1, Math.min(100000, Math.floor(v || 1))));

  const add = () => {
    addItem({ productId: plan.id, name: plan.name, unitLabel: plan.unit?.en ?? "plan", quantity: plan.unit ? qty : 1, unitPrice: plan.unitPrice });
    setDrawerOpen(true);
  };

  return (
    <div className="relative rounded-3xl p-6 sm:p-8 bg-[var(--md-surface-container)] border-2 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-8 min-w-0" style={{ borderColor: plan.accent + "88" }}>
      <div className="min-w-0">
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border" style={{ color: plan.accent, borderColor: plan.accent + "55", background: plan.accent + "15" }}>
          <span dir="rtl">{plan.arName}</span>
        </span>
        <h3 className="mt-3 text-2xl font-bold text-[var(--md-on-surface)]" style={jakarta}>{plan.name}</h3>
        <p className="mt-1 text-sm text-[var(--md-on-surface-variant)]">{plan.subtitle}</p>
        <div className="mt-6 flex items-baseline gap-1.5 flex-wrap">
          <span className="text-5xl font-extrabold text-[var(--md-on-surface)]" style={jakarta}>{plan.unitPrice.toLocaleString("en-EG", { maximumFractionDigits: 2 })}</span>
          <span className="text-base font-bold" style={{ color: plan.accent }}>EGP</span>
          <span className="text-sm text-[var(--md-on-surface-variant)]">/ {plan.id === "data" ? "" : `${plan.unit?.en} `}month</span>
        </div>
        <p className="text-xs text-[var(--md-on-surface-variant)] mt-1" dir="rtl">
          {plan.id === "data" ? `${plan.unitPrice.toLocaleString("ar-EG")} جنيه شهرياً — سعر ثابت` : `${plan.unitPrice.toLocaleString("ar-EG")} جنيه / ${plan.unit?.ar} / شهرياً`}
        </p>
        <ul className="mt-6 space-y-2.5">
          {plan.features.map((f) => <li key={f} className="flex items-start gap-2 text-sm text-[var(--md-on-surface-variant)]"><Check size={16} className="shrink-0 mt-0.5 text-emerald-400" />{f}</li>)}
        </ul>
      </div>

      <div className="min-w-0 rounded-2xl p-5 sm:p-6 bg-[var(--md-surface-container-low)] border border-[var(--md-outline-variant)] flex flex-col">
        <h4 className="font-semibold text-[var(--md-on-surface)]">Build your subscription</h4>
        {plan.unit ? (
          <label className="mt-4 block">
            <span className="flex justify-between text-xs font-semibold text-[var(--md-on-surface-variant)] mb-2">
              <span>Number of {plan.unit.plural}</span><span dir="rtl">عدد {plan.unit.ar === "فرع" ? "الفروع" : plan.unit.ar === "موظف" ? "الموظفين" : "الاشتراكات"}</span>
            </span>
            <div className="flex items-center rounded-xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container)]">
              <button type="button" aria-label="Decrease" onClick={() => setQ(qty - 1)} className="w-12 h-12 grid place-items-center text-[var(--md-on-surface)]"><Minus size={16} /></button>
              <input type="number" min={1} inputMode="numeric" value={qty} onChange={(e) => setQ(Number(e.target.value))}
                className="flex-1 min-w-0 text-center bg-transparent text-xl font-bold text-[var(--md-on-surface)] outline-none [appearance:textfield]" />
              <button type="button" aria-label="Increase" onClick={() => setQ(qty + 1)} className="w-12 h-12 grid place-items-center text-[var(--md-on-surface)]"><Plus size={16} /></button>
            </div>
          </label>
        ) : (
          <p className="mt-4 text-sm text-[var(--md-on-surface-variant)]">One flat monthly price for your company tenant — no per-user fees.</p>
        )}
        <div className="mt-6 space-y-1.5 text-sm">
          <div className="flex justify-between text-[var(--md-on-surface-variant)]">
            <span>{plan.unit ? `${qty} × ${formatEGP(plan.unitPrice)}` : "Flat plan"}</span><span>{formatEGP(total)}</span>
          </div>
        </div>
        <div className="mt-auto pt-6">
          <div className="flex justify-between items-baseline pt-4 border-t border-[var(--md-outline-variant)]">
            <span className="text-sm text-[var(--md-on-surface-variant)]">Monthly total</span>
            <motion.span key={total} initial={{ scale: 1.08, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }} className="text-3xl font-extrabold text-[var(--md-on-surface)]" style={jakarta}>{formatEGP(total)}</motion.span>
          </div>
          <button onClick={add} className="mt-5 w-full py-3.5 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 text-[#0D1117]" style={{ background: plan.accent }}>
            <ShoppingCart size={16} /> {inCart ? "Update cart" : "Add to cart"} · Subscribe
          </button>
          <a href="#contact" className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)]">
            Questions first? Talk to us <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}

export function SubscriptionServices() {
  const [active, setActive] = useState<CartProductId>(() => "tashil");
  // Product section's "Subscribe" button selects the matching tab.
  useEffect(() => {
    const h = (e: Event) => setActive((e as CustomEvent<CartProductId>).detail);
    window.addEventListener("sp:subscription-tab", h);
    return () => window.removeEventListener("sp:subscription-tab", h);
  }, []);
  const plan = SUB_PLANS.find((p) => p.id === active)!;

  return (
    <section id="subscriptions" aria-label="Monthly subscription services" style={{ backgroundColor: "var(--md-surface-container-lowest)", padding: "96px 0", borderTop: "1px solid var(--md-outline-variant)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-low)] text-[var(--md-secondary)]">
            <Repeat size={14} /> Subscription Services · اشتراكات شهرية
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--md-on-surface)]" style={jakarta}>Our products, as a monthly service.</h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--md-on-surface-variant)]">Simple pricing in Egyptian pounds. Hosting, updates, support and onboarding included.</p>
        </motion.div>

        <div role="tablist" className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center gap-1 p-1 rounded-2xl bg-[var(--md-surface-container-high)] border border-[var(--md-outline-variant)]">
            {SUB_PLANS.map((t) => (
              <button key={t.id} role="tab" aria-selected={active === t.id} onClick={() => setActive(t.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${active === t.id ? "text-[#0D1117] shadow-lg" : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)]"}`}
                style={active === t.id ? { background: t.accent } : undefined}>{t.name}</button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={plan.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
            <PlanCard plan={plan} />
          </motion.div>
        </AnimatePresence>
        <p className="mt-6 text-center text-xs text-[var(--md-outline)]">Prices in EGP, billed monthly. Secure payment by Paymob.</p>
      </div>
    </section>
  );
}
