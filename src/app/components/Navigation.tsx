import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header>
      <nav
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(13, 17, 23, 0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(189, 195, 206, 0.1)"
            : "1px solid transparent",
        }}
      >
        <div
          className="max-w-7xl mx-auto flex items-center justify-between gap-8"
          style={{ height: "64px", padding: "0 24px" }}
        >
          {/* ── Logo ── */}
          <a
            href="#"
            aria-label="Switch Point — Back to top"
            className="flex items-center shrink-0"
            style={{ gap: "10px" }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div
              className="flex items-center justify-center rounded-[10px]"
              style={{
                width: "32px",
                height: "32px",
                background: "linear-gradient(135deg, var(--md-primary) 0%, var(--md-secondary) 100%)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.03em",
                }}
              >
                SP
              </span>
            </div>
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--md-on-surface)",
                letterSpacing: "-0.025em",
              }}
            >
              Switch Point
            </span>
          </a>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden md:flex items-center" style={{ gap: "2px" }}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                onMouseEnter={() => setActiveLink(link.label)}
                onMouseLeave={() => setActiveLink(null)}
                className="relative rounded-full transition-colors duration-200"
                style={{
                  padding: "8px 16px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color:
                    activeLink === link.label
                      ? "var(--md-primary)"
                      : "var(--md-on-surface-variant)",
                  background:
                    activeLink === link.label
                      ? "rgba(91, 168, 255, 0.08)"
                      : "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="hidden md:flex items-center" style={{ gap: "12px" }}>
            <button
              onClick={() => handleNavClick("#contact")}
              className="rounded-full transition-all duration-200"
              style={{
                padding: "10px 20px",
                background: "var(--md-primary)",
                color: "var(--md-on-primary)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 20px rgba(91, 168, 255, 0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              Start a Project
            </button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden rounded-xl transition-colors duration-200"
            style={{
              padding: "8px",
              color: "var(--md-on-surface)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* ── Mobile Drawer ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
              className="md:hidden overflow-hidden"
              style={{
                backgroundColor: "rgba(13, 17, 23, 0.97)",
                borderTop: "1px solid rgba(189, 195, 206, 0.08)",
              }}
            >
              <div className="flex flex-col" style={{ padding: "16px 24px 24px" }}>
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      setMobileOpen(false);
                      setTimeout(() => {
                        const el = document.querySelector(link.href);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }, 320);
                    }}
                    className="rounded-xl text-left transition-colors duration-200"
                    style={{
                      padding: "14px 16px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "var(--md-on-surface)",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      WebkitTapHighlightColor: "transparent",
                      touchAction: "manipulation",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(91, 168, 255, 0.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setTimeout(() => {
                      const el = document.querySelector("#contact");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 320);
                  }}
                  className="rounded-full mt-4 transition-all duration-200"
                  style={{
                    padding: "14px 24px",
                    background: "var(--md-primary)",
                    color: "var(--md-on-primary)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    textAlign: "center",
                    WebkitTapHighlightColor: "transparent",
                    touchAction: "manipulation",
                  }}
                >
                  Start a Project
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      </header>
    </>
  );
}