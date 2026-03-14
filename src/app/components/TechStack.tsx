import { useState } from "react";
import { motion } from "motion/react";
import {
  Smartphone,
  Globe,
  Database,
  Layers,
  ChevronRight,
} from "lucide-react";

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  color: string;
  bgGlow: string;
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
    color: "#5BA8FF",
    bgGlow: "rgba(91,168,255,0.06)",
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
    color: "#A78BFA",
    bgGlow: "rgba(167,139,250,0.06)",
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
    color: "#26C6B0",
    bgGlow: "rgba(38,198,176,0.06)",
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
    color: "#FB923C",
    bgGlow: "rgba(251,146,60,0.06)",
  },
];

const SECTION_LABEL_STYLE: React.CSSProperties = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "var(--md-primary)",
};

export function TechStack() {
  const [activeService, setActiveService] = useState<string>("mobile");
  const active = SERVICES.find((s) => s.id === activeService)!;

  return (
    <section
      id="services"
      style={{
        backgroundColor: "var(--md-surface-container-lowest)",
        padding: "96px 0",
      }}
    >
      <div className="max-w-7xl mx-auto" style={{ padding: "0 24px" }}>
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.2, 0, 0, 1] }}
          className="flex flex-col"
          style={{ gap: "16px", marginBottom: "64px" }}
        >
          <span style={SECTION_LABEL_STYLE}>Capabilities</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between" style={{ gap: "24px" }}>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                fontWeight: 700,
                color: "var(--md-on-surface)",
                letterSpacing: "-0.025em",
                lineHeight: 1.25,
                margin: 0,
              }}
            >
              Tech Stack &amp; Services
            </h2>
            <p
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: "1rem",
                fontWeight: 400,
                lineHeight: 1.7,
                color: "var(--md-on-surface-variant)",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              From pixel-perfect UI to production backends — one studio, end-to-end.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "24px" }}>
          {/* ── Service Tabs (Left) ── */}
          <div
            className="lg:col-span-4 flex flex-col"
            style={{ gap: "8px" }}
          >
            {SERVICES.map((service, i) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.2, 0, 0, 1] }}
                onClick={() => setActiveService(service.id)}
                className="flex items-center justify-between text-left rounded-[12px] transition-all duration-300"
                style={{
                  padding: "16px 20px",
                  background:
                    activeService === service.id
                      ? service.bgGlow
                      : "transparent",
                  border: `1px solid ${
                    activeService === service.id
                      ? service.color + "33"
                      : "var(--md-outline-variant)"
                  }`,
                  cursor: "pointer",
                }}
              >
                <div className="flex items-center" style={{ gap: "14px" }}>
                  <div
                    className="flex items-center justify-center rounded-xl transition-all duration-300"
                    style={{
                      width: "40px",
                      height: "40px",
                      background:
                        activeService === service.id
                          ? service.color + "1A"
                          : "var(--md-surface-container)",
                      color:
                        activeService === service.id
                          ? service.color
                          : "var(--md-on-surface-variant)",
                    }}
                  >
                    {service.icon}
                  </div>
                  <div className="flex flex-col" style={{ gap: "2px" }}>
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        color:
                          activeService === service.id
                            ? "var(--md-on-surface)"
                            : "var(--md-on-surface-variant)",
                      }}
                    >
                      {service.title}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "12px",
                        fontWeight: 400,
                        color: service.color,
                        opacity: activeService === service.id ? 1 : 0.6,
                      }}
                    >
                      {service.subtitle}
                    </span>
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  style={{
                    color: activeService === service.id
                      ? service.color
                      : "var(--md-outline)",
                    transform: activeService === service.id
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                    transition: "transform 300ms cubic-bezier(0.2,0,0,1)",
                  }}
                />
              </motion.button>
            ))}
          </div>

          {/* ── Detail Panel (Right) ── */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
              className="flex flex-col h-full rounded-[16px]"
              style={{
                background: "var(--md-surface-container-low)",
                border: `1px solid ${active.color}22`,
                padding: "32px",
                gap: "28px",
                boxShadow: `0 0 40px ${active.bgGlow}`,
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between" style={{ gap: "16px" }}>
                <div className="flex flex-col" style={{ gap: "8px" }}>
                  <div className="flex items-center" style={{ gap: "10px" }}>
                    <div
                      className="flex items-center justify-center rounded-xl"
                      style={{
                        width: "48px",
                        height: "48px",
                        background: active.color + "1A",
                        color: active.color,
                      }}
                    >
                      {active.icon}
                    </div>
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: "1.25rem",
                          fontWeight: 700,
                          color: "var(--md-on-surface)",
                          letterSpacing: "-0.02em",
                          margin: 0,
                          lineHeight: 1.3,
                        }}
                      >
                        {active.title}
                      </h3>
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: active.color,
                        }}
                      >
                        {active.subtitle}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "15px",
                  fontWeight: 400,
                  lineHeight: 1.8,
                  color: "var(--md-on-surface-variant)",
                  margin: 0,
                }}
              >
                {active.description}
              </p>

              {/* Inset divider */}
              <div
                style={{
                  height: "1px",
                  background: "var(--md-outline-variant)",
                  marginLeft: "16px",
                }}
              />

              {/* Capabilities */}
              <div className="flex flex-col" style={{ gap: "12px" }}>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: active.color,
                  }}
                >
                  Capabilities
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "10px" }}>
                  {active.capabilities.map((cap) => (
                    <div
                      key={cap}
                      className="flex items-center rounded-[10px]"
                      style={{
                        gap: "10px",
                        padding: "12px 16px",
                        background: "var(--md-surface-container)",
                        border: "1px solid var(--md-outline-variant)",
                      }}
                    >
                      <div
                        className="rounded-full shrink-0"
                        style={{
                          width: "6px",
                          height: "6px",
                          background: active.color,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'Roboto', sans-serif",
                          fontSize: "13px",
                          fontWeight: 400,
                          color: "var(--md-on-surface)",
                          lineHeight: 1.4,
                        }}
                      >
                        {cap}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Process teaser ── */}
        <motion.div
          id="process"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.2, 0, 0, 1] }}
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: "24px", marginTop: "64px" }}
        >
          {[
            {
              step: "01",
              title: "Discovery & Problem Framing",
              desc: "We map your users, goals, and constraints before writing a single line of code.",
            },
            {
              step: "02",
              title: "Design System & Prototyping",
              desc: "MD3-compliant design systems built in Figma — tested and validated before development.",
            },
            {
              step: "03",
              title: "Build, Iterate & Ship",
              desc: "Agile sprints with weekly builds. You see progress, not promises.",
            },
          ].map((item, i) => (
            <div
              key={item.step}
              className="flex flex-col rounded-[16px]"
              style={{
                padding: "32px",
                background: "var(--md-surface-container-low)",
                border: "1px solid var(--md-outline-variant)",
                gap: "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "var(--md-outline-variant)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {item.step}
              </span>
              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--md-on-surface)",
                  letterSpacing: "-0.01em",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: "var(--md-on-surface-variant)",
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}