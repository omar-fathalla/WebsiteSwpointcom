import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Send, Mail, ArrowRight, Globe, Loader2, AlertCircle, MapPin, Clock, ShieldCheck, FileText, RefreshCw, Truck, Info, Building, Lock, Check } from "lucide-react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { useSnackbar } from "../md3/Snackbar";
import { enter } from "../md3/motion";
import { Logo, SectionHeader } from "../md3/Logo";


function LinkedinIcon({ size = 16, className = "" }: Readonly<{ size?: number; className?: string }>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon({ size = 16, className = "" }: Readonly<{ size?: number; className?: string }>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}


const PROJECT_TYPES = [
  "Tashil SaaS Pilot",
  "Fleet Attendance & GPS",
  "In-Store Retail & Photo Audit",
  "Cross-Platform Flutter App",
  "Web Platform & Dashboard",
  "Firebase & Cloud Backend",
  "UI/UX & Design System",
  "Custom Enterprise Solution",
];

interface ContactProps {
  readonly onOpenLegal?: (tab: string) => void;
}

export function Contact({ onOpenLegal }: Readonly<ContactProps>) {
  const reduced = useReducedMotion();
  const snack = useSnackbar();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "Tashil SaaS Pilot",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLegalNavigation = (tab: string, hashFallback: string) => {
    if (onOpenLegal) {
      onOpenLegal(tab);
    } else {
      window.location.hash = hashFallback;
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-101cd544/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Send email error:", data);
        setError(data.error || "Failed to send message. Please try again.");
        return;
      }

      setSubmitted(true);
      snack("Message sent — we'll reply within 24 business hours.");
    } catch (err) {
      console.error("Network error sending form:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "", company: "", projectType: "Tashil SaaS Pilot", message: "" });
  };

  const field = (id: keyof typeof form, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="md-field">
      <input id={`contact-${id}`} value={form[id]} onChange={(e) => setForm({ ...form, [id]: e.target.value })} {...props} />
      <label htmlFor={`contact-${id}`}>{label}</label>
    </div>
  );

  const OFFICES = [
    { icon: <MapPin />, title: "Egypt Office (Regional Operations)", lines: ["Commercial Market, Smouha, Alexandria, Egypt"], rtl: "السوق التجاري، سموحة، الإسكندرية", link: { href: "tel:+201211857725", label: "Tel / WhatsApp: +20 121 185 7725" } },
    { icon: <Building />, title: "UAE Office (Commercial & Corporate)", lines: ["Dubai, United Arab Emirates"], link: { href: "https://wa.me/971558715615", label: "WhatsApp: +971 55 871 5615", ext: true } },
    { icon: <Mail />, title: "Official Support & Billing Desk", link: { href: "mailto:support@sw-point.com", label: "support@sw-point.com" }, lines: [], after: "Response SLA: Under 24 Business Hours" },
    { icon: <Clock />, title: "Working Hours", lines: ["Sunday – Thursday: 9:00 AM – 6:00 PM (GMT+2 / GMT+4)"] },
  ];
  const SOCIAL = [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/111152120", icon: <LinkedinIcon size={18} /> },
    { label: "GitHub", href: "https://github.com/Sw-Point", icon: <GithubIcon size={18} /> },
    { label: "Website", href: "https://www.sw-point.com", icon: <Globe /> },
  ];
  const LEGAL = [
    { tab: "privacy", hash: "privacy-policy", label: "Privacy Policy (Tashil)", icon: <ShieldCheck /> },
    { tab: "delivery", hash: "delivery-policy", label: "Delivery & Fulfillment", icon: <Truck /> },
    { tab: "refund", hash: "refund-policy", label: "Refund & Cancellation", icon: <RefreshCw /> },
    { tab: "terms", hash: "terms-of-service", label: "Terms of Service", icon: <FileText /> },
    { tab: "about", hash: "about-us", label: "About Us (Switch Point Studio)", icon: <Info /> },
  ];

  return (
    <>
      <section id="contact" className="md-section bg-surface">
        <div className="md-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <motion.div {...enter(reduced)} className="lg:col-span-5 flex flex-col gap-8 min-w-0">
              <SectionHeader label="Get In Touch" title={<>Ready to build something <span className="text-primary">exceptional?</span></>}
                body="Tell us about your project. Whether it's a Flutter app, a Firebase backend, or a complete design system — we'd love to hear what you're building." />
              <ul className="md-card md-card-filled py-2">
                {OFFICES.map((o) => (
                  <li key={o.title} className="flex gap-4 px-4 py-3">
                    <span className="w-10 h-10 shrink-0 rounded-full grid place-items-center bg-secondary-container text-on-secondary-container [&_svg]:w-5 [&_svg]:h-5">{o.icon}</span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-title-small text-on-surface">{o.title}</span>
                      {o.lines.map((l) => <span key={l} className="text-body-medium text-on-surface-variant">{l}</span>)}
                      {o.rtl && <span className="text-body-small text-on-surface-variant" dir="rtl">{o.rtl}</span>}
                      {o.link && (
                        <a href={o.link.href} {...(o.link.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="text-body-medium text-primary underline-offset-4 hover:underline py-1 break-all">{o.link.label}</a>
                      )}
                      {o.after && <span className="text-body-small text-on-surface-variant">{o.after}</span>}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {SOCIAL.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="md-btn md-btn-outlined has-icon">{s.icon}{s.label}</a>
                ))}
              </div>
            </motion.div>

            <motion.div {...enter(reduced, 0.05)} className="lg:col-span-7 min-w-0">
              <div className="md-card md-card-outlined p-6 md:p-8">
                {submitted ? (
                  <div className="flex flex-col items-center text-center gap-4 py-12">
                    <span className="w-14 h-14 rounded-full grid place-items-center bg-primary-container text-on-primary-container"><Send /></span>
                    <h3 className="text-headline-small text-on-surface">Message Received!</h3>
                    <p className="text-body-large text-on-surface-variant max-w-md">Thanks for reaching out. We'll be in touch within 24 hours to discuss your project.</p>
                    <button onClick={reset} className="md-btn md-btn-outlined">Send another message</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                      {field("name", "Full Name", { type: "text", placeholder: "Your name", required: true, autoComplete: "name" })}
                      {field("email", "Email Address", { type: "email", placeholder: "you@company.com", required: true, autoComplete: "email" })}
                      {field("phone", "Phone / WhatsApp (Recommended)", { type: "tel", placeholder: "+20 1xx xxx xxxx", autoComplete: "tel" })}
                      {field("company", "Company / Fleet Size", { type: "text", placeholder: "e.g. Acme FMCG (30 Delegates)", autoComplete: "organization" })}
                    </div>
                    <fieldset className="flex flex-col gap-3">
                      <legend className="text-title-small text-on-surface-variant mb-3">Project Type / Desired Solution</legend>
                      <div className="flex flex-wrap gap-2">
                        {PROJECT_TYPES.map((type) => {
                          const sel = form.projectType === type;
                          return (
                            <button key={type} type="button" aria-pressed={sel} onClick={() => setForm({ ...form, projectType: type })} className="md-chip">
                              {sel && <Check />}{type}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                    <div className="md-field">
                      <textarea id="contact-message" rows={5} required placeholder="Describe what you're building, your timeline, or any specific fleet requirements..."
                        value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                      <label htmlFor="contact-message">Tell us about your project or requirements</label>
                    </div>
                    {error && (
                      <div role="alert" className="flex items-start gap-2 rounded-[12px] p-3 bg-error-container text-on-error-container text-body-medium"><AlertCircle size={20} className="shrink-0" />{error}</div>
                    )}
                    <div className="flex flex-col gap-2">
                      <button type="submit" disabled={loading} className="md-btn md-btn-filled trailing-icon w-full md:w-auto md:self-end">
                        {loading ? <Loader2 className="animate-spin" /> : <>Send Message <ArrowRight /></>}
                      </button>
                      <p className="text-body-small text-on-surface-variant flex flex-wrap items-center gap-x-2 md:justify-end">
                        <Lock size={14} /> 256-Bit SSL Encrypted <span aria-hidden="true">•</span> Response Under 24 Business Hours
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer id="about" role="contentinfo" aria-label="Switch Point footer and legal center" className="bg-surface-container pt-12 pb-24 md:pb-8">
        <div className="md-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-10">
            <div className="lg:col-span-4 flex flex-col gap-4">
              <a href="https://sw-point.com" className="self-start"><Logo sub="Digital Product Studio & Enterprise SaaS" /></a>
              <p className="text-body-medium text-on-surface-variant">Engineering high-concurrency cross-platform applications, biometric field attendance systems (Tashil), and modern digital experiences across Egypt and the UAE.</p>
              <div className="text-body-small text-on-surface-variant flex flex-col gap-1">
                <span><strong className="text-on-surface">Egypt Office:</strong> Commercial Market, Smouha, Alexandria, Egypt</span>
                <span><strong className="text-on-surface">UAE Office:</strong> Dubai, United Arab Emirates</span>
                <span><strong className="text-on-surface">Support:</strong> support@sw-point.com</span>
              </div>
            </div>
            <div className="lg:col-span-3 flex flex-col gap-2">
              <h3 className="text-title-small text-on-surface">Platform & Solutions</h3>
              <nav aria-label="Footer platform links" className="flex flex-col -ml-3">
                {[
                  { label: "Studio Works", href: "/works" },
                  { label: "Studio Services", href: "/works#services" },
                  { label: "Engineering Process", href: "/works#process" },
                  { label: "Subscriptions", href: "#subscriptions" },
                  { label: "Contact Us", href: "#contact" },
                ].map((item) => (
                  <a key={item.label} href={item.href} className="md-btn md-btn-text self-start" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>{item.label}</a>
                ))}
              </nav>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-3">
              <h3 className="flex items-center gap-2 text-title-small text-on-surface"><ShieldCheck size={18} className="text-primary" /> Legal & Compliance Policies</h3>
              <p className="text-body-small text-on-surface-variant">Fully transparent commercial and operational terms for merchant account and payment approval:</p>
              <div className="flex flex-wrap gap-2">
                {LEGAL.map((l) => (
                  <button key={l.tab} onClick={() => handleLegalNavigation(l.tab, l.hash)} className="md-chip">{l.icon}{l.label}</button>
                ))}
              </div>
            </div>
          </div>
          <hr className="md-divider" />
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-body-small text-on-surface-variant">
            <p className="text-center md:text-left">&copy; 2026 Switch Point. All rights reserved. Commercial registration in Alexandria, Egypt & Dubai, UAE.</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><Lock size={14} /> 256-Bit SSL Encrypted</span>
              <a href="mailto:support@sw-point.com" className="text-primary hover:underline py-3">support@sw-point.com</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
