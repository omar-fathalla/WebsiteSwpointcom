import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, animate, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Check, ArrowRight, Layers, ExternalLink, Pause, Play } from "lucide-react";
import { PRODUCTS, Product, ProductId } from "./productsData";
import { TONE } from "./productTone";
import { SectionHeader } from "../md3/Logo";
import { enter, md, tEnter, tExit } from "../md3/motion";
import { onRovingKeyDown } from "../md3/a11y";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduced) { setN(value); return; }
    const c = animate(0, value, { duration: md.dur.long4, ease: md.ease.emphasizedDecel as unknown as [number, number, number, number], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value, reduced]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

function Gallery({ p }: { p: Product }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const n = p.shots.length;
  const tone = TONE[p.id];
  useEffect(() => setI(0), [p.id]);
  useEffect(() => {
    if (paused || userPaused) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 4500);
    return () => clearInterval(t);
  }, [paused, userPaused, n, p.id]);
  const go = (d: number) => setI((x) => (x + d + n) % n);
  const shot = p.shots[i];
  const phone = p.frame === "phone";

  const img = (
    <AnimatePresence mode="wait">
      <motion.img key={shot.src} src={shot.src} alt={`${p.name} — ${shot.caption}`} loading="lazy"
        initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: md.dur.medium2 } }} exit={{ opacity: 0, transition: tExit }}
        drag="x" dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => { if (info.offset.x < -50) go(1); else if (info.offset.x > 50) go(-1); }}
        className="w-full h-full object-contain select-none bg-surface-container-lowest" />
    </AnimatePresence>
  );

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} className="w-full min-w-0">
      <div className="flex justify-center">
        {phone ? (
          <div className="w-[230px] sm:w-[260px] rounded-[28px] p-2 bg-surface-container-highest shadow-elevation-2">
            <div className="rounded-[20px] overflow-hidden aspect-[9/20]">{img}</div>
          </div>
        ) : (
          <div className="md-card md-card-elevated w-full overflow-hidden">
            <div className="flex items-center gap-3 px-4 h-10 bg-surface-container">
              <span className="flex gap-1.5" aria-hidden="true">{[0, 1, 2].map((k) => <span key={k} className="w-2.5 h-2.5 rounded-full bg-outline-variant" />)}</span>
              <span className="flex-1 truncate text-body-small px-3 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant">
                {p.url ? p.url.replace("https://", "") : "portal.sw-point.com"}
              </span>
            </div>
            <div className="aspect-[16/9]">{img}</div>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button aria-label="Previous screenshot" onClick={() => go(-1)} className="md-icon-btn md-icon-btn-outlined"><ChevronLeft /></button>
        <div className="flex-1 min-w-0 text-center">
          <p className="text-body-medium text-on-surface min-h-[40px]" aria-live="polite">{shot.caption}</p>
          <div className="mt-1 flex justify-center items-center gap-1" role="group" aria-label="Screenshots">
            {p.shots.map((s, k) => (
              <button key={s.src} aria-current={k === i ? "true" : undefined} aria-label={`Screenshot ${k + 1}`} onClick={() => setI(k)} className="grid place-items-center h-6 px-0.5">
                <span className="block h-1.5 rounded-full" style={{ width: k === i ? 20 : 6, background: k === i ? tone.fg : "var(--md-sys-color-outline-variant)", transition: "width 200ms var(--md-sys-motion-easing-standard)" }} />
              </button>
            ))}
          </div>
        </div>
        <button aria-label={userPaused ? "Play slideshow" : "Pause slideshow"} onClick={() => setUserPaused((v) => !v)} className="md-icon-btn">{userPaused ? <Play /> : <Pause />}</button>
        <button aria-label="Next screenshot" onClick={() => go(1)} className="md-icon-btn md-icon-btn-outlined"><ChevronRight /></button>
      </div>
    </div>
  );
}

export function CompanyProducts() {
  const [active, setActive] = useState<ProductId>("tashil");
  const reduced = useReducedMotion();
  const p = PRODUCTS.find((x) => x.id === active)!;
  const tone = TONE[p.id];

  const subscribe = () => {
    window.dispatchEvent(new CustomEvent("sp:subscription-tab", { detail: active }));
    scrollToId("subscriptions");
  };

  return (
    <section id="products" aria-label="Switch Point company products" className="md-section bg-surface-container-low">
      <div className="md-container">
        <motion.div {...enter(reduced)} className="mb-8">
          <SectionHeader center label="Company Products" icon={<Layers />} title={<>Built in-house. <span className="text-primary">Running in production.</span></>}
            body="Three platforms we designed, engineered and operate end to end — here is the real system, screen by screen." />
        </motion.div>

        <div role="tablist" aria-label="Products" onKeyDown={onRovingKeyDown} className="md-tabs max-w-xl mx-auto mb-10">
          {PRODUCTS.map((x) => (
            <button key={x.id} role="tab" id={`tab-${x.id}`} aria-selected={active === x.id} aria-controls="product-panel" tabIndex={active === x.id ? 0 : -1} onClick={() => setActive(x.id)} className="md-tab">
              <span className="md-tab-label">{x.name}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={p.id} id="product-panel" role="tabpanel" tabIndex={0} aria-labelledby={`tab-${p.id}`}
            initial={{ opacity: 0, y: reduced ? 0 : 16 }} animate={{ opacity: 1, y: 0, transition: tEnter }} exit={{ opacity: 0, transition: tExit }}>
            <div className={`grid grid-cols-1 gap-8 lg:gap-12 items-center ${p.frame === "phone" ? "lg:grid-cols-[1fr_340px]" : "lg:grid-cols-[1fr_1.35fr]"}`}>
              <div className="min-w-0">
                <span className="md-chip selected" style={{ background: tone.container, color: tone.onContainer, paddingLeft: 12, paddingRight: 12 }}>Product</span>
                <h3 className="mt-3 text-headline-medium text-on-surface">{p.name}</h3>
                <p className="mt-2 text-body-large text-on-surface-variant">{p.tagline}</p>
                <div className="mt-6 grid gap-3">
                  <div className="md-card md-card-outlined p-4">
                    <span className="text-label-large text-error">The problem</span>
                    <p className="mt-1 text-body-medium text-on-surface-variant">{p.problem}</p>
                  </div>
                  <div className="md-card md-card-outlined p-4">
                    <span className="text-label-large" style={{ color: tone.fg }}>Our solution</span>
                    <p className="mt-1 text-body-medium text-on-surface-variant">{p.solution}</p>
                  </div>
                </div>
                <ul className="mt-6 grid sm:grid-cols-2 gap-x-4 gap-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-body-medium text-on-surface-variant"><Check size={18} className="shrink-0" style={{ color: tone.fg }} />{f}</li>
                  ))}
                </ul>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
                  {p.stack.map((s) => <li key={s} className="md-chip">{s}</li>)}
                </ul>
              </div>
              <Gallery p={p} />
            </div>

            <dl className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3">
              {p.stats.map((s) => (
                <div key={s.label} className="md-card md-card-filled p-4 md:p-6 flex flex-col">
                  <dt className="order-2 mt-1 text-body-medium text-on-surface-variant">{s.label}</dt>
                  <dd className="order-1 text-headline-medium md:text-display-small" style={{ color: tone.fg }}><Counter value={s.value} suffix={s.suffix} /></dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-body-small text-on-surface-variant">{p.statsNote}</p>

            <div className="mt-12">
              <h4 className="text-title-large text-on-surface mb-4">How it works</h4>
              <ol className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
                {p.workflow.map((w, k) => (
                  <motion.li key={w.title} {...enter(reduced, k * 0.05)} className="md-card md-card-outlined p-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full grid place-items-center text-label-large shrink-0" style={{ background: tone.container, color: tone.onContainer }}>{k + 1}</span>
                      <span className="text-title-small text-on-surface">{w.title}</span>
                    </div>
                    <p className="mt-2 text-body-small text-on-surface-variant">{w.text}</p>
                  </motion.li>
                ))}
              </ol>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <button onClick={subscribe} className="md-btn md-btn-filled trailing-icon">Subscribe to {p.name} <ArrowRight /></button>
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="md-btn md-btn-text trailing-icon">Visit platform <ExternalLink /></a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
