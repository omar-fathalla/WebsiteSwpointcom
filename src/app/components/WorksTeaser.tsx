import { Link } from "react-router";
import { ArrowRight, Briefcase } from "lucide-react";

/** Homepage stub where the client-works grid used to be; keeps the #work anchor alive. */
export function WorksTeaser() {
  return (
    <section id="work" aria-label="Client works" style={{ backgroundColor: "var(--md-surface)", padding: "64px 0", borderTop: "1px solid var(--md-outline-variant)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[var(--md-surface-container-low)] border border-[var(--md-outline-variant)]">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--md-primary)]"><Briefcase size={14} /> Selected Studio Works</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[var(--md-on-surface)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Client platforms we've shipped
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--md-on-surface-variant)]">LUX-Line, Emirates Delivery Hub, UK Transport, Chapeau ERP and more — full case studies.</p>
          </div>
          <Link to="/works" className="shrink-0 px-6 py-3.5 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 bg-[var(--md-primary)] text-[var(--md-on-primary)]">
            View our client works <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
