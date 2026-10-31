import { CartButton } from "./cart/CartDrawer";
import { useLocation, useNavigate } from "react-router";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Menu, X, Moon, Sun, Package, Briefcase, Repeat, Info, ShieldCheck, Mail, Send } from "lucide-react";
import { Logo } from "../md3/Logo";
import { Scrim, useModal } from "../md3/Dialog";
import { tEnter, tExit } from "../md3/motion";
import { useTheme } from "../md3/theme";

interface NavigationProps {
  readonly onOpenLegal?: (tab: string) => void;
}

const NAV_LINKS: { label: string; href: string; legalTab?: string; icon: typeof Package }[] = [
  { label: "Products", href: "#products", icon: Package },
  { label: "Studio", href: "/works", icon: Briefcase },
  { label: "Subscriptions", href: "#subscriptions", icon: Repeat },
  { label: "About Us", href: "#about-us", legalTab: "about", icon: Info },
  { label: "Policies", href: "#privacy-policy", legalTab: "privacy", icon: ShieldCheck },
  { label: "Contact", href: "#contact", icon: Mail },
];

export function Navigation({ onOpenLegal }: Readonly<NavigationProps>) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggle } = useTheme();
  const reduced = useReducedMotion();
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const drawerRef = useModal(drawerOpen, closeDrawer);
  const onWorks = location.pathname.replace(/\/$/, "") === "/works";

  /** "/works" → route; "#x" → scroll on home, or go to "/#x" from other pages. */
  const goTo = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
      if (!href.includes("#")) window.scrollTo({ top: 0 });
      return;
    }
    if (location.pathname !== "/") {
      navigate("/" + href);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (link: { href: string; legalTab?: string }, fromDrawer = false) => {
    setDrawerOpen(false);
    if (link.legalTab && onOpenLegal) {
      onOpenLegal(link.legalTab);
      return;
    }
    if (fromDrawer) setTimeout(() => goTo(link.href), 220);
    else goTo(link.href);
  };

  const isActive = (href: string) => (href === "/works" ? onWorks : false);
  const ThemeIcon = mode === "dark" ? Sun : Moon;

  return (
    <header>
      {/* ── Small top app bar: 64px, surface → surface-container when scrolled under ── */}
      <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: 64,
          background: scrolled ? "var(--md-sys-color-surface-container)" : "var(--md-sys-color-surface)",
          transition: "background-color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard)",
        }}>
        <div className="md-container h-full flex items-center gap-1">
          <button className="md-icon-btn xl:hidden -ml-2 mr-1" onClick={() => setDrawerOpen(true)} aria-label="Open navigation menu" aria-expanded={drawerOpen}>
            <Menu />
          </button>
          <a href="/" aria-label="Switch Point — Back to top" className="flex items-center shrink min-w-0 rounded-[12px]"
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname !== "/") navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}>
            <Logo />
          </a>

          <div className="hidden xl:flex items-center gap-1 mx-auto">
            {NAV_LINKS.map((link) => (
              <button key={link.label} onClick={() => handleNavClick(link)} aria-current={isActive(link.href) ? "page" : undefined}
                className="md-btn md-btn-text"
                style={isActive(link.href) ? { background: "var(--md-sys-color-secondary-container)", color: "var(--md-sys-color-on-secondary-container)" } : { color: "var(--md-sys-color-on-surface-variant)" }}>
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 ml-auto xl:ml-0">
            <button className="md-icon-btn" onClick={toggle} aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} theme`} title="Toggle theme">
              <ThemeIcon />
            </button>
            <CartButton />
            <button onClick={() => handleNavClick({ href: "#contact" })} className="md-btn md-btn-filled hidden xl:inline-flex ml-2">
              Start a Project
            </button>
          </div>
        </div>
      </nav>

      {/* ── Compact/medium: modal navigation drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <Scrim onClick={closeDrawer} z={80} />
            <motion.aside ref={drawerRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Navigation"
              className="fixed top-0 left-0 bottom-0 z-[81] w-[calc(100%-56px)] max-w-[360px] flex flex-col outline-none overflow-y-auto"
              style={{ background: "var(--md-sys-color-surface-container-low)", borderRadius: "0 16px 16px 0" }}
              initial={reduced ? { opacity: 0 } : { x: "-100%" }} animate={{ x: 0, opacity: 1, transition: tEnter }} exit={reduced ? { opacity: 0, transition: tExit } : { x: "-100%", transition: tExit }}>
              <div className="flex items-center justify-between pl-7 pr-3 h-16">
                <span className="text-title-small text-on-surface-variant">Switch Point</span>
                <button className="md-icon-btn" onClick={closeDrawer} aria-label="Close navigation menu"><X /></button>
              </div>
              <div className="flex flex-col px-3 pb-3">
                {NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                    <button key={link.label} onClick={() => handleNavClick(link, true)} aria-current={active ? "page" : undefined}
                      className="state flex items-center gap-3 h-14 pl-4 pr-6 rounded-full text-label-large text-left"
                      style={active ? { background: "var(--md-sys-color-secondary-container)", color: "var(--md-sys-color-on-secondary-container)" } : { color: "var(--md-sys-color-on-surface-variant)" }}>
                      <Icon size={24} /> {link.label}
                    </button>
                  );
                })}
                <hr className="md-divider my-2 mx-4" />
                <button onClick={toggle} className="state flex items-center gap-3 h-14 pl-4 pr-6 rounded-full text-label-large text-left text-on-surface-variant">
                  <ThemeIcon size={24} /> {mode === "dark" ? "Light theme" : "Dark theme"}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Compact only: extended FAB for the main CTA ── */}
      <AnimatePresence>
        {scrolled && !drawerOpen && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, transition: tEnter }} exit={{ opacity: 0, scale: 0.8, transition: tExit }}
            onClick={() => handleNavClick({ href: "#contact" })} className="md-fab md:hidden fixed right-4 bottom-4 z-40" aria-label="Start a project">
            <Send /> Start a project
          </motion.button>
        )}
      </AnimatePresence>
    </header>
  );
}
