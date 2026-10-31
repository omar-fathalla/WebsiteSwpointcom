import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { TONE } from "./productTone";
import { SectionHeader } from "../md3/Logo";
import { enter, tEnter, tExit } from "../md3/motion";
import { onRovingKeyDown } from "../md3/a11y";
import { Check, Minus, Plus, Repeat, ShoppingCart, ArrowRight } from "lucide-react";
import { formatEGP, round2, useCart, type CartProductId } from "../context/CartContext";


interface SubPlan {
  id: CartProductId;
  name: string;
  arName: string;
  subtitle: string;
  unitPrice: number;
  /** null = flat price, no quantity */
  unit: { en: string; ar: string; plural: string } | null;
  defaultQty: number;
  features: string[];
}

export const SUB_PLANS: SubPlan[] = [
  {
    id: "tashil", name: "Tashil", arName: "نظام المناديب",
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
    id: "gift", name: "Tashil Gift", arName: "نظام الهدايا",
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
    id: "data", name: "Tashil Data Sharing", arName: "منصة البيانات",
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
  const tone = TONE[plan.id];

  const add = () => {
    addItem({ productId: plan.id, name: plan.name, unitLabel: plan.unit?.en ?? "plan", quantity: plan.unit ? qty : 1, unitPrice: plan.unitPrice });
    setDrawerOpen(true);
  };

  return (
    <div className="md-card md-card-outlined p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 min-w-0">
      <div className="min-w-0">
        <span className="md-chip" style={{ background: tone.container, color: tone.onContainer, borderColor: "transparent" }}>
          <span dir="rtl">{plan.arName}</span>
        </span>
        <h3 className="mt-3 text-headline-medium text-on-surface">{plan.name}</h3>
        <p className="mt-1 text-body-medium text-on-surface-variant">{plan.subtitle}</p>
        <div className="mt-6 flex items-baseline gap-2 flex-wrap">
          <span className="text-display-medium text-on-surface">{plan.unitPrice.toLocaleString("en-EG", { maximumFractionDigits: 2 })}</span>
          <span className="text-title-medium" style={{ color: tone.fg }}>EGP</span>
          <span className="text-body-medium text-on-surface-variant">/ {plan.id === "data" ? "" : `${plan.unit?.en} `}month</span>
        </div>
        <p className="text-body-small text-on-surface-variant mt-1" dir="rtl">
          {plan.id === "data" ? `${plan.unitPrice.toLocaleString("ar-EG")} جنيه شهرياً — سعر ثابت` : `${plan.unitPrice.toLocaleString("ar-EG")} جنيه / ${plan.unit?.ar} / شهرياً`}
        </p>
        <ul className="mt-6 space-y-3">
          {plan.features.map((f) => <li key={f} className="flex items-start gap-3 text-body-medium text-on-surface-variant"><Check size={20} className="shrink-0" style={{ color: tone.fg }} />{f}</li>)}
        </ul>
      </div>

      <div className="min-w-0 md-card md-card-filled p-5 md:p-6 flex flex-col" style={{ ["--md-field-bg" as string]: "var(--md-sys-color-surface-container-highest)" }}>
        <h4 className="text-title-medium text-on-surface">Build your subscription</h4>
        {plan.unit ? (
          <div className="mt-6">
            <div className="md-field">
              <input id={`qty-${plan.id}`} type="number" min={1} inputMode="numeric" value={qty} onChange={(e) => setQ(Number(e.target.value))} placeholder=" "
                className="text-center [appearance:textfield]" style={{ paddingInline: 56 }} />
              <label htmlFor={`qty-${plan.id}`}>Number of {plan.unit.plural}</label>
              <button type="button" aria-label={`Fewer ${plan.unit.plural}`} onClick={() => setQ(qty - 1)} className="md-icon-btn absolute left-1 top-1/2 -translate-y-1/2"><Minus /></button>
              <button type="button" aria-label={`More ${plan.unit.plural}`} onClick={() => setQ(qty + 1)} className="md-icon-btn absolute right-1 top-1/2 -translate-y-1/2"><Plus /></button>
            </div>
            <p className="md-supporting" dir="rtl">عدد {plan.unit.ar === "فرع" ? "الفروع" : plan.unit.ar === "موظف" ? "الموظفين" : "الاشتراكات"}</p>
          </div>
        ) : (
          <p className="mt-4 text-body-medium text-on-surface-variant">One flat monthly price for your company tenant — no per-user fees.</p>
        )}
        <div className="mt-6 flex justify-between text-body-medium text-on-surface-variant">
          <span>{plan.unit ? `${qty} × ${formatEGP(plan.unitPrice)}` : "Flat plan"}</span><span>{formatEGP(total)}</span>
        </div>
        <div className="mt-auto pt-6">
          <hr className="md-divider" />
          <div className="flex justify-between items-baseline pt-4 gap-2 flex-wrap">
            <span className="text-body-medium text-on-surface-variant">Monthly total</span>
            <span className="text-headline-medium text-on-surface" aria-live="polite">{formatEGP(total)}</span>
          </div>
          <button onClick={add} className="mt-5 w-full md-btn md-btn-filled has-icon">
            <ShoppingCart /> {inCart ? "Update cart" : "Add to cart"} · Subscribe
          </button>
          <a href="#contact" className="mt-2 w-full md-btn md-btn-text trailing-icon">
            Questions first? Talk to us <ArrowRight />
          </a>
        </div>
      </div>
    </div>
  );
}

export function SubscriptionServices() {
  const [active, setActive] = useState<CartProductId>(() => "tashil");
  const reduced = useReducedMotion();
  // Product section's "Subscribe" button selects the matching plan.
  useEffect(() => {
    const h = (e: Event) => setActive((e as CustomEvent<CartProductId>).detail);
    window.addEventListener("sp:subscription-tab", h);
    return () => window.removeEventListener("sp:subscription-tab", h);
  }, []);
  const plan = SUB_PLANS.find((p) => p.id === active)!;

  return (
    <section id="subscriptions" aria-label="Monthly subscription services" className="md-section bg-surface">
      <div className="md-container max-w-[1200px]">
        <motion.div {...enter(reduced)} className="mb-8">
          <SectionHeader center label="Subscription Services · اشتراكات شهرية" icon={<Repeat />} title="Our products, as a monthly service."
            body="Simple pricing in Egyptian pounds. Hosting, updates, support and onboarding included." />
        </motion.div>

        <div className="flex justify-center mb-8">
          <div role="radiogroup" aria-label="Choose a plan" onKeyDown={onRovingKeyDown} className="md-segmented w-full max-w-[480px]">
            {SUB_PLANS.map((t) => (
              <button key={t.id} role="radio" aria-checked={active === t.id} tabIndex={active === t.id ? 0 : -1} onClick={() => setActive(t.id)} className="md-segment flex-1">
                {active === t.id && <Check />}{t.name}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={plan.id} initial={{ opacity: 0, y: reduced ? 0 : 16 }} animate={{ opacity: 1, y: 0, transition: tEnter }} exit={{ opacity: 0, transition: tExit }}>
            <PlanCard plan={plan} />
          </motion.div>
        </AnimatePresence>
        <p className="mt-6 text-center text-body-small text-on-surface-variant">Prices in EGP, billed monthly. Secure payment by Paymob.</p>
      </div>
    </section>
  );
}
