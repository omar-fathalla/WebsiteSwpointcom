import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Smartphone, Globe, Database, Layers, ChevronRight, Check } from "lucide-react";
import { SectionHeader } from "../md3/Logo";
import { enter, tEnter } from "../md3/motion";
import { onRovingKeyDown } from "../md3/a11y";

interface Service {
  id: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
}

const SERVICES: Service[] = [
  {
    id: "mobile",
    icon: <Smartphone size={22} strokeWidth={1.8} />,
    title: "Mobile Development",
    subtitle: "Flutter",
    description:
      "Cross-platform apps with native performance. We build high-fidelity Material 3 interfaces that feel truly native on both iOS and Android — with a single codebase.",
    capabilities: [
      "Material 3 compliant UI systems",
      "Reactive state with Antigravity engine",
      "Custom animations & transitions",
      "Platform-adaptive components",
    ],
  },
  {
    id: "web",
    icon: <Globe size={22} strokeWidth={1.8} />,
    title: "Web Architecture",
    subtitle: "Angular",
    description:
      "Signals-based Angular architecture for performant, scalable web applications. We design systems that are as maintainable as they are fast.",
    capabilities: [
      "Angular Signals architecture",
      "Micro-frontend patterns",
      "Progressive Web Apps (PWA)",
      "Conversion-optimised UX",
    ],
  },
  {
    id: "backend",
    icon: <Database size={22} strokeWidth={1.8} />,
    title: "Backend Engineering",
    subtitle: "Firebase",
    description:
      "Serverless, real-time backends that scale effortlessly. Firestore, Cloud Functions, Authentication — architected for reliability under any load.",
    capabilities: [
      "Firestore data modelling",
      "Cloud Functions & serverless logic",
      "Firebase Auth & role-based access",
      "Real-time sync & offline support",
    ],
  },
  {
    id: "design",
    icon: <Layers size={22} strokeWidth={1.8} />,
    title: "UI/UX Design",
    subtitle: "Material Design 3",
    description:
      "Senior-level interface design rooted in MD3 principles. We build complete design systems — tonal palettes, type scales, component libraries — that teams can actually use.",
    capabilities: [
      "MD3 design system creation",
      "Figma component libraries",
      "Tonal palette & typography",
      "Interaction design & prototyping",
    ],
  },
];

const PROCESS = [
  { step: "01", title: "Discovery & Problem Framing", desc: "We map your users, goals, and constraints before writing a single line of code." },
  { step: "02", title: "Design System & Prototyping", desc: "MD3-compliant design systems built in Figma — tested and validated before development." },
  { step: "03", title: "Build, Iterate & Ship", desc: "Agile sprints with weekly builds. You see progress, not promises." },
];

export function TechStack() {
  const [activeService, setActiveService] = useState<string>("mobile");
  const active = SERVICES.find((s) => s.id === activeService)!;
  const reduced = useReducedMotion();

  return (
    <section id="services" aria-label="Switch Point capabilities and tech stack" className="md-section bg-surface-container-low">
      <div className="md-container">
        <motion.div {...enter(reduced)} className="mb-10">
          <SectionHeader label="Capabilities" title="Tech Stack & Services" body="From pixel-perfect UI to production backends — one studio, end-to-end." />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,360px)_1fr] gap-4 lg:gap-6">
          <div role="tablist" aria-label="Services" aria-orientation="vertical" onKeyDown={onRovingKeyDown} className="md-card md-card-filled p-2 flex flex-col gap-1 self-start">
            {SERVICES.map((s) => {
              const sel = s.id === activeService;
              return (
                <button key={s.id} role="tab" aria-selected={sel} aria-controls="service-panel" tabIndex={sel ? 0 : -1} onClick={() => setActiveService(s.id)}
                  className="state flex items-center gap-4 min-h-[72px] px-4 rounded-[12px] text-left"
                  style={sel ? { background: "var(--md-sys-color-secondary-container)", color: "var(--md-sys-color-on-secondary-container)" } : { color: "var(--md-sys-color-on-surface)" }}>
                  <span className="w-10 h-10 grid place-items-center rounded-full shrink-0 [&_svg]:w-5 [&_svg]:h-5" style={{ background: sel ? "var(--md-sys-color-surface-container-lowest)" : "var(--md-sys-color-surface-container-highest)" }}>{s.icon}</span>
                  <span className="flex flex-col flex-1 min-w-0">
                    <span className="text-title-medium">{s.title}</span>
                    <span className="text-body-medium" style={{ color: sel ? undefined : "var(--md-sys-color-on-surface-variant)" }}>{s.subtitle}</span>
                  </span>
                  <ChevronRight size={20} className="shrink-0" />
                </button>
              );
            })}
          </div>

          <motion.div key={active.id} id="service-panel" role="tabpanel" tabIndex={0} aria-label={active.title} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: tEnter }}
            className="md-card md-card-outlined p-6 md:p-8 flex flex-col gap-6 min-w-0 bg-surface">
            <div className="flex items-start gap-4">
              <span className="w-14 h-14 grid place-items-center rounded-[16px] bg-primary-container text-on-primary-container shrink-0 [&_svg]:w-6 [&_svg]:h-6">{active.icon}</span>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-label-large text-primary">{active.subtitle}</span>
                <h3 className="text-headline-small text-on-surface">{active.title}</h3>
              </div>
            </div>
            <p className="text-body-large text-on-surface-variant">{active.description}</p>
            <hr className="md-divider" />
            <div className="flex flex-col gap-3">
              <h4 className="text-title-small text-on-surface">Capabilities</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {active.capabilities.map((cap) => (
                  <li key={cap} className="flex items-center gap-3 rounded-[12px] px-4 py-3 bg-surface-container text-body-medium text-on-surface-variant">
                    <Check size={18} className="shrink-0 text-primary" />{cap}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <div id="process" className="mt-16 scroll-mt-20">
          <ol className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {PROCESS.map((item, i) => (
              <motion.li key={item.step} {...enter(reduced, i * 0.05)} className="md-card md-card-elevated p-6 flex flex-col gap-3 bg-surface-container-low">
                <span className="text-display-small text-primary">{item.step}</span>
                <h3 className="text-title-large text-on-surface">{item.title}</h3>
                <p className="text-body-medium text-on-surface-variant">{item.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
