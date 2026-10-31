import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Projects } from "../components/Projects";
import { TechStack } from "../components/TechStack";

/** /works — client portfolio (moved off the homepage). */
export function WorksPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const h = window.location.hash;
    if (!h) window.scrollTo(0, 0);
    else setTimeout(() => document.querySelector(h)?.scrollIntoView({ block: "start" }), 120);
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
      <div className="md-container pt-24 md:pt-28">
        <Link to="/" className="md-btn md-btn-text has-icon -ml-3"><ArrowLeft /> Back to home</Link>
        <p className="mt-2 text-title-small text-on-surface-variant">Switch Point · Studio Works &amp; Services</p>
      </div>
      <div className="-mt-10 md:-mt-16">
        <Projects />
      </div>
      <TechStack />
    </>
  );
}
