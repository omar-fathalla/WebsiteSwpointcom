import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Briefcase, Layers } from "lucide-react";
import { enter } from "../md3/motion";

/** Homepage stub where the client-works grid used to be; keeps the #work anchor alive. */
export function WorksTeaser() {
  const reduced = useReducedMotion();
  return (
    <section id="work" aria-label="Studio works and services" className="bg-surface py-12 md:py-16">
      <div className="md-container max-w-[1200px]">
        <motion.div {...enter(reduced)} className="md-card md-card-filled p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 text-title-small text-primary"><Briefcase size={18} aria-hidden="true" /> Studio works &amp; services</span>
            <h2 className="mt-2 text-headline-medium text-on-surface">Need something custom? We build it too.</h2>
            <p className="mt-2 text-body-large text-on-surface-variant">Beyond our own products, our studio designs and ships Flutter apps, Angular platforms and Firebase backends for clients — see the case studies (LUX-Line, Emirates Delivery Hub, UK Transport, Chapeau ERP) and what we can build for you.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0 self-start md:self-auto">
            <Link to="/works" className="md-btn md-btn-tonal trailing-icon">
              View client works <ArrowRight aria-hidden="true" />
            </Link>
            <Link to="/works#services" className="md-btn md-btn-outlined">
              <Layers aria-hidden="true" /> Our services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
