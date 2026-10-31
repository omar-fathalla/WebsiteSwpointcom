import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";
import { md } from "../md3/motion";

const STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "20+", label: "Products Delivered" },
  { value: "3", label: "Core Platforms" },
];

const PORTRAIT_SRC = "/mohamed-fathalla.jpg";
const PORTRAIT_ALT = "Mohamed Fathalla, founder of Switch Point";
const TAGS = ["Flutter", "Angular", "Firebase", "Material 3", "UI/UX Design"];
const ease = md.ease.emphasizedDecel as unknown as [number, number, number, number];

export function Hero() {
  const reduced = useReducedMotion();
  const rise = (delay: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: md.dur.short4 } }
      : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: md.dur.long2, delay, ease } };

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" aria-label="Switch Point — Digital Product Studio Hero" className="bg-surface pt-16">
      <div className="md-container py-10 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6 min-w-0">
            {/* Compact/medium portrait */}
            <motion.img {...rise(0)} src={PORTRAIT_SRC} alt={PORTRAIT_ALT} width={800} height={800} loading="eager" decoding="async"
              className="lg:hidden w-24 h-24 md:w-32 md:h-32 rounded-[28px] object-cover bg-surface-container-high" />

            <motion.div {...rise(0)}>
              <span className="md-chip text-on-surface-variant" style={{ height: "auto", minHeight: 32, whiteSpace: "normal", paddingBlock: 6 }}>
                Mohamed Fathalla · Founder &amp; Lead Product Designer
              </span>
            </motion.div>

            <motion.h1 {...rise(0.05)} className="text-headline-large md:text-display-medium lg:text-display-large text-on-surface">
              10+ years turning <span className="text-primary">design precision</span> into shipped products.
            </motion.h1>

            <motion.p {...rise(0.1)} className="text-body-large text-on-surface-variant max-w-[600px]">
              I'm Mohamed Fathalla, a Senior UI/UX Designer and Flutter Developer specialized in the Google ecosystem. Through Switch
              Point, the studio I founded in 2025, I design and build Flutter apps, Angular dashboards, and Firebase backends — from
              Tashil's enterprise platform to retail analytics powered by Gemini AI.
            </motion.p>

            <motion.div {...rise(0.15)} className="flex flex-wrap gap-3">
              <button onClick={() => scrollTo("#work")} aria-label="View our case studies and portfolio projects" className="md-btn md-btn-filled trailing-icon">
                View Case Studies <ArrowRight />
              </button>
              <button onClick={() => scrollTo("#contact")} aria-label="Start a project with Switch Point" className="md-btn md-btn-outlined">
                Start a Project
              </button>
            </motion.div>

            <motion.ul {...rise(0.2)} className="flex flex-wrap gap-2" aria-label="Core technologies">
              {TAGS.map((tag) => <li key={tag} className="md-chip">{tag}</li>)}
            </motion.ul>

            {/* Compact/medium stats */}
            <motion.dl {...rise(0.25)} className="lg:hidden grid grid-cols-3 gap-2">
              {STATS.map((s) => (
                <div key={s.label} className="md-card md-card-filled p-4 flex flex-col gap-1">
                  <dt className="order-2 text-body-small text-on-surface-variant">{s.label}</dt>
                  <dd className="order-1 text-headline-small text-primary">{s.value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Expanded+: portrait card + stats */}
          <motion.div {...rise(0.15)} className="lg:col-span-5 hidden lg:flex flex-col gap-4 items-stretch max-w-[440px] w-full justify-self-end">
            <figure className="md-card md-card-elevated overflow-hidden">
              <img src={PORTRAIT_SRC} alt={PORTRAIT_ALT} width={800} height={800} loading="eager" decoding="async" className="w-full aspect-square object-cover block" />
              <figcaption className="flex items-center gap-2 px-4 h-14 text-label-large text-on-surface-variant">
                <MapPin size={18} className="text-primary" /> Switch Point · Dubai &amp; Alexandria
              </figcaption>
            </figure>
            <dl className="grid grid-cols-3 gap-2">
              {STATS.map((s) => (
                <div key={s.label} className="md-card md-card-filled p-4 flex flex-col gap-1">
                  <dt className="order-2 text-body-small text-on-surface-variant">{s.label}</dt>
                  <dd className="order-1 text-headline-medium text-primary">{s.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
