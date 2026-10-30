import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Projects } from "../components/Projects";
import { TechStack } from "../components/TechStack";

/** /works — client portfolio (moved off the homepage). */
export function WorksPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
    // Footer / in-page "#section" anchors that only exist on the homepage → go to /#section.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href")!;
      if (hash.length > 1 && !document.querySelector(hash)) {
        e.preventDefault();
        navigate("/" + hash);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 pt-28">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--md-on-surface-variant)] mb-2">Switch Point · Studio Works &amp; Services</p>
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--md-primary)] hover:underline">
          <ArrowLeft size={16} /> Back to home
        </Link>
      </div>
      <div style={{ marginTop: "-48px" }}>
        <Projects />
      </div>
      <TechStack />
    </>
  );
}
