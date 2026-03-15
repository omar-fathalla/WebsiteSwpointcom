import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";

const STATS = [
  { value: "4+", label: "Years in Market" },
  { value: "20+", label: "Products Delivered" },
  { value: "3", label: "Core Platforms" },
];

const TAGS = ["Flutter", "Angular", "Firebase", "Material 3", "UI/UX Design"];

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ── Animated particle grid ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const dots: { x: number; y: number; opacity: number; speed: number }[] = [];
    const COLS = Math.ceil(canvas.width / 48);
    const ROWS = Math.ceil(canvas.height / 48);
    for (let r = 0; r <= ROWS; r++) {
      for (let c = 0; c <= COLS; c++) {
        dots.push({
          x: c * 48,
          y: r * 48,
          opacity: Math.random() * 0.25 + 0.05,
          speed: Math.random() * 0.003 + 0.001,
        });
      }
    }

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.01;
      dots.forEach((d) => {
        const o = d.opacity + Math.sin(t * d.speed * 100 + d.x * 0.05) * 0.12;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(91,168,255,${Math.max(0, Math.min(0.5, o))})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const scrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      aria-label="Switch Point — Digital Product Studio Hero"
      className="relative overflow-hidden flex flex-col justify-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--md-surface)",
        paddingTop: "80px",
      }}
    >
      {/* ── Gradient mesh glows ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 15% 40%, rgba(91,168,255,0.13) 0%, transparent 60%)," +
            "radial-gradient(ellipse 60% 50% at 80% 60%, rgba(38,198,176,0.10) 0%, transparent 55%)," +
            "radial-gradient(ellipse 50% 40% at 50% -5%, rgba(91,168,255,0.08) 0%, transparent 55%)",
        }}
      />

      {/* ── Grid canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.6 }}
      />

      <div
        className="relative max-w-7xl mx-auto w-full"
        style={{ padding: "0 24px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* ── LEFT: Content ── */}
          <div className="lg:col-span-7 flex flex-col" style={{ gap: "32px" }}>
            {/* Agency label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
            >
              <span
                className="inline-flex items-center rounded-full"
                style={{
                  padding: "6px 16px",
                  background: "rgba(91,168,255,0.1)",
                  border: "1px solid rgba(91,168,255,0.25)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--md-primary)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Design Agency × Technical Studio
              </span>
            </motion.div>

            {/* Display Large */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0, 0, 1] }}
            >
              <h1
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(2.75rem, 5vw, 4.5rem)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  color: "var(--md-on-surface)",
                  margin: 0,
                }}
              >
                High-performance{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, var(--md-primary) 0%, var(--md-secondary) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  UI/UX Design
                </span>{" "}
                &amp; Technical Project Management.
              </h1>
            </motion.div>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0, 0, 1] }}
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: "1rem",
                fontWeight: 400,
                lineHeight: 1.75,
                color: "var(--md-on-surface-variant)",
                maxWidth: "560px",
                margin: 0,
              }}
            >
              Building scalable digital products with Flutter, Angular, and
              Firebase. From Material 3 design systems to production-grade
              backends — we close the gap between great design and robust
              engineering.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3, ease: [0.2, 0, 0, 1] }}
              className="flex flex-wrap"
              style={{ gap: "12px" }}
            >
              <button
                onClick={scrollToWork}
                aria-label="View our case studies and portfolio projects"
                className="flex items-center rounded-full transition-all duration-300"
                style={{
                  padding: "14px 28px",
                  background: "var(--md-primary)",
                  color: "var(--md-on-primary)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  gap: "8px",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 8px 32px rgba(91,168,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                View Case Studies
                <ArrowRight size={16} />
              </button>

              <button
                onClick={scrollToContact}
                aria-label="Start a project with Switch Point"
                className="flex items-center rounded-full transition-all duration-300"
                style={{
                  padding: "14px 28px",
                  background: "transparent",
                  color: "var(--md-on-surface)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  border: "1px solid rgba(189,195,206,0.25)",
                  cursor: "pointer",
                  gap: "8px",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(91,168,255,0.08)";
                  el.style.borderColor = "rgba(91,168,255,0.4)";
                  el.style.color = "var(--md-primary)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "transparent";
                  el.style.borderColor = "rgba(189,195,206,0.25)";
                  el.style.color = "var(--md-on-surface)";
                }}
              >
                Start a Project
              </button>
            </motion.div>

            {/* Tech tags */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4, ease: [0.2, 0, 0, 1] }}
              className="flex flex-wrap"
              style={{ gap: "8px" }}
              role="list"
              aria-label="Core technologies"
            >
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  role="listitem"
                  className="rounded-full"
                  style={{
                    padding: "4px 12px",
                    background: "var(--md-surface-container-low)",
                    border: "1px solid var(--md-outline-variant)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "var(--md-on-surface-variant)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Stats panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.2, 0, 0, 1] }}
            className="lg:col-span-5 hidden lg:flex flex-col"
            style={{ gap: "16px" }}
          >
            {/* Glassy card with stats */}
            <div
              className="rounded-[24px] flex flex-col"
              style={{
                background: "var(--md-surface-container)",
                border: "1px solid var(--md-outline-variant)",
                padding: "32px",
                gap: "32px",
              }}
            >
              {/* Decorative accent line */}
              <div
                className="rounded-full"
                style={{
                  width: "48px",
                  height: "4px",
                  background:
                    "linear-gradient(90deg, var(--md-primary) 0%, var(--md-secondary) 100%)",
                }}
              />

              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--md-on-surface-variant)",
                  lineHeight: 1.6,
                }}
              >
                We bridge the gap between design precision and engineering
                excellence. Every pixel is intentional. Every line of code is
                performant.
              </div>

              <div className="grid grid-cols-3" style={{ gap: "1px" }}>
                {STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="flex flex-col"
                    style={{
                      padding: "20px 16px",
                      borderRight:
                        i < STATS.length - 1
                          ? "1px solid var(--md-outline-variant)"
                          : "none",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "2rem",
                        fontWeight: 800,
                        color: "var(--md-primary)",
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "11px",
                        fontWeight: 400,
                        color: "var(--md-on-surface-variant)",
                        lineHeight: 1.4,
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mini stack indicator */}
              <div className="flex flex-col" style={{ gap: "12px" }}>
                {[
                  { label: "Mobile", value: "Flutter", pct: 85, color: "var(--md-primary)" },
                  { label: "Backend", value: "Firebase", pct: 75, color: "var(--md-secondary)" },
                  { label: "Web", value: "Angular", pct: 70, color: "#A78BFA" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col" style={{ gap: "6px" }}>
                    <div className="flex justify-between items-center">
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "var(--md-on-surface-variant)",
                        }}
                      >
                        {item.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "var(--md-on-surface)",
                        }}
                      >
                        {item.value}
                      </span>
                    </div>
                    <div
                      className="rounded-full overflow-hidden"
                      style={{
                        height: "4px",
                        background: "var(--md-outline-variant)",
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.pct}%` }}
                        transition={{ duration: 1, delay: 0.7, ease: [0.2, 0, 0, 1] }}
                        className="h-full rounded-full"
                        style={{ background: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        onClick={scrollToWork}
        aria-label="Scroll down to view our work"
        className="absolute bottom-10 left-1/2 flex flex-col items-center"
        style={{
          transform: "translateX(-50%)",
          gap: "6px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "var(--md-on-surface-variant)",
        }}
      >
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}