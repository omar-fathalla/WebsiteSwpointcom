import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, animate } from "motion/react";
import { ChevronLeft, ChevronRight, Check, ArrowRight, Layers, ExternalLink } from "lucide-react";
import { PRODUCTS, Product, ProductId } from "./productsData";

const jakarta = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

function Gallery({ p }: { p: Product }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = p.shots.length;
  useEffect(() => setI(0), [p.id]);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 4500);
    return () => clearInterval(t);
  }, [paused, n, p.id]);
  const go = (d: number) => setI((x) => (x + d + n) % n);
  const shot = p.shots[i];
  const phone = p.frame === "phone";

  const img = (
    <AnimatePresence mode="wait">
      <motion.img
        key={shot.src}
        src={shot.src}
        alt={`${p.name} — ${shot.caption}`}
        loading="lazy"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -24 }}
        transition={{ duration: 0.35 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => { if (info.offset.x < -50) go(1); else if (info.offset.x > 50) go(-1); }}
        className="w-full h-full object-contain select-none"
        style={{ background: "#fff" }}
      />
    </AnimatePresence>
  );

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="w-full">
      <div className="relative flex justify-center">
        <div className="absolute inset-0 blur-3xl opacity-25 rounded-full pointer-events-none" style={{ background: p.accent }} />
        {phone ? (
          <div className="relative w-[230px] sm:w-[260px] rounded-[38px] p-2.5 bg-[#05070b] border border-[var(--md-outline-variant)] shadow-2xl">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black z-10" />
            <div className="rounded-[30px] overflow-hidden aspect-[9/20]">{img}</div>
          </div>
        ) : (
          <div className="relative w-full rounded-2xl overflow-hidden border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-high)] shadow-2xl">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--md-outline-variant)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <div className="ml-2 flex-1 truncate text-[11px] px-3 py-1 rounded-md bg-[var(--md-surface-container-lowest)] text-[var(--md-on-surface-variant)]">
                {p.url ? p.url.replace("https://", "") : "portal.sw-point.com"}
              </div>
            </div>
            <div className="aspect-[16/9]">{img}</div>
          </div>
        )}
      </div>
      <div className="mt-5 flex items-center gap-3">
        <button aria-label="Previous screenshot" onClick={() => go(-1)} className="w-9 h-9 shrink-0 rounded-full grid place-items-center border border-[var(--md-outline-variant)] text-[var(--md-on-surface)] hover:bg-[var(--md-surface-container-high)]"><ChevronLeft size={18} /></button>
        <div className="flex-1 min-w-0 text-center">
          <p className="text-sm text-[var(--md-on-surface)] min-h-[40px]">{shot.caption}</p>
          <div className="mt-2 flex justify-center gap-1.5">
            {p.shots.map((s, k) => (
              <button key={s.src} aria-label={`Screenshot ${k + 1}`} onClick={() => setI(k)} className="h-1.5 rounded-full transition-all" style={{ width: k === i ? 22 : 8, background: k === i ? p.accent : "var(--md-outline-variant)" }} />
            ))}
          </div>
        </div>
        <button aria-label="Next screenshot" onClick={() => go(1)} className="w-9 h-9 shrink-0 rounded-full grid place-items-center border border-[var(--md-outline-variant)] text-[var(--md-on-surface)] hover:bg-[var(--md-surface-container-high)]"><ChevronRight size={18} /></button>
      </div>
    </div>
  );
}

export function CompanyProducts() {
  const [active, setActive] = useState<ProductId>("tashil");
  const p = PRODUCTS.find((x) => x.id === active)!;

  const subscribe = () => {
    window.dispatchEvent(new CustomEvent("sp:subscription-tab", { detail: active }));
    scrollToId("subscriptions");
  };

  return (
    <section id="products" aria-label="Switch Point company products" style={{ backgroundColor: "var(--md-surface)", padding: "96px 0", borderTop: "1px solid var(--md-outline-variant)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-low)] text-[var(--md-primary)]">
            <Layers size={14} /> Company Products
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--md-on-surface)]" style={jakarta}>
            Built in-house.{" "}
            <span style={{ background: "linear-gradient(90deg, var(--md-primary) 0%, var(--md-secondary) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Running in production.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--md-on-surface-variant)] leading-relaxed">
            Three platforms we designed, engineered and operate end to end — here is the real system, screen by screen.
          </p>
        </motion.div>

        <div role="tablist" aria-label="Products" className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center gap-1 p-1 rounded-2xl bg-[var(--md-surface-container-high)] border border-[var(--md-outline-variant)]">
            {PRODUCTS.map((x) => (
              <button key={x.id} role="tab" aria-selected={active === x.id} onClick={() => setActive(x.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${active === x.id ? "text-[#0D1117] shadow-lg" : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)]"}`}
                style={active === x.id ? { background: x.accent } : undefined}>
                <span className="w-2 h-2 rounded-full" style={{ background: active === x.id ? "#0D1117" : x.accent }} />
                {x.name}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
            <div className={`grid grid-cols-1 gap-10 items-center ${p.frame === "phone" ? "lg:grid-cols-[1fr_340px]" : "lg:grid-cols-[1fr_1.35fr]"}`}>
              <div className={p.frame === "phone" ? "lg:order-1" : ""}>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: p.accent }}>Product</span>
                <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[var(--md-on-surface)]" style={jakarta}>{p.name}</h3>
                <p className="mt-2 text-[var(--md-on-surface-variant)]">{p.tagline}</p>
                <div className="mt-6 space-y-3">
                  <div className="rounded-xl p-4 bg-[var(--md-surface-container-low)] border border-[var(--md-outline-variant)]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-red-300">The problem</span>
                    <p className="mt-1 text-sm text-[var(--md-on-surface-variant)]">{p.problem}</p>
                  </div>
                  <div className="rounded-xl p-4 bg-[var(--md-surface-container-low)] border border-[var(--md-outline-variant)]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Our solution</span>
                    <p className="mt-1 text-sm text-[var(--md-on-surface-variant)]">{p.solution}</p>
                  </div>
                </div>
                <ul className="mt-6 grid sm:grid-cols-2 gap-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--md-on-surface-variant)]"><Check size={16} className="shrink-0 mt-0.5" style={{ color: p.accent }} />{f}</li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => <span key={s} className="text-xs px-2.5 py-1 rounded-full border border-[var(--md-outline-variant)] bg-[var(--md-surface-container)] text-[var(--md-on-surface)]">{s}</span>)}
                </div>
              </div>
              <div className={p.frame === "phone" ? "lg:order-2" : ""}><Gallery p={p} /></div>
            </div>

            <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {p.stats.map((s) => (
                <div key={s.label} className="rounded-2xl p-5 bg-[var(--md-surface-container-low)] border border-[var(--md-outline-variant)]">
                  <div className="text-3xl sm:text-4xl font-extrabold" style={{ ...jakarta, color: p.accent }}><Counter value={s.value} suffix={s.suffix} /></div>
                  <div className="mt-1 text-sm text-[var(--md-on-surface-variant)]">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-[var(--md-outline)]">{p.statsNote}</p>

            <div className="mt-14">
              <h4 className="text-lg font-bold text-[var(--md-on-surface)] mb-6" style={jakarta}>How it works</h4>
              <ol className="relative grid gap-4 md:gap-3" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(150px, 1fr))` }}>
                {p.workflow.map((w, k) => (
                  <motion.li key={w.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: k * 0.1, duration: 0.4 }}
                    className="relative rounded-2xl p-4 bg-[var(--md-surface-container)] border border-[var(--md-outline-variant)]">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full grid place-items-center text-xs font-bold text-[#0D1117]" style={{ background: p.accent }}>{k + 1}</span>
                      <span className="font-semibold text-[var(--md-on-surface)]">{w.title}</span>
                    </div>
                    <p className="mt-2 text-xs text-[var(--md-on-surface-variant)] leading-relaxed">{w.text}</p>
                  </motion.li>
                ))}
              </ol>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <button onClick={subscribe} className="px-5 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2 text-[#0D1117]" style={{ background: p.accent }}>
                Subscribe to {p.name} <ArrowRight size={16} />
              </button>
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2 text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)]">
                  Visit platform <ExternalLink size={15} />
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
