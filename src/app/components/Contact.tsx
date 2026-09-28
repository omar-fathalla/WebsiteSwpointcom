import { useState } from "react";
import { motion } from "motion/react";
import {
  Send,
  Mail,
  Linkedin,
  Github,
  ArrowRight,
  Globe,
  Phone,
  Loader2,
  AlertCircle,
  MapPin,
  Clock,
  ShieldCheck,
  FileText,
  RefreshCw,
  Truck,
  Info,
  Building,
} from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const SECTION_LABEL_STYLE: React.CSSProperties = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "var(--md-primary)",
};

interface ContactProps {
  onOpenLegal?: (tab: string) => void;
}

export function Contact({ onOpenLegal }: ContactProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (err) {
      console.error("Network error sending form:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    background: "var(--md-surface-container)",
    border: `1px solid ${
      focused === field ? "var(--md-primary)" : "var(--md-outline-variant)"
    }`,
    color: "var(--md-on-surface)",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "15px",
    fontWeight: 400,
    lineHeight: 1.5,
    outline: "none",
    transition: "border-color 200ms, box-shadow 200ms",
    boxShadow:
      focused === field
        ? "0 0 0 3px rgba(91,168,255,0.12)"
        : "none",
    resize: "none" as const,
    boxSizing: "border-box" as const,
  });

  return (
    <>
      {/* ── Contact Section ── */}
      <section
        id="contact"
        style={{
          backgroundColor: "var(--md-surface)",
          padding: "96px 0",
        }}
      >
        <div className="max-w-7xl mx-auto" style={{ padding: "0 24px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "64px" }}>
            {/* ── Left: CTA Copy ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.2, 0, 0, 1] }}
              className="lg:col-span-5 flex flex-col"
              style={{ gap: "32px" }}
            >
              <div className="flex flex-col" style={{ gap: "16px" }}>
                <span style={SECTION_LABEL_STYLE}>Get In Touch</span>
                <h2
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    fontWeight: 800,
                    color: "var(--md-on-surface)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  Ready to build something{" "}
                  <span
                    style={{
                      background:
                        "linear-gradient(90deg, var(--md-primary) 0%, var(--md-secondary) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    exceptional?
                  </span>
                </h2>
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
                  Tell us about your project. Whether it's a Flutter app, a
                  Firebase backend, or a complete design system — we'd love to
                  hear what you're building.
                </p>
              </div>

              {/* Contact methods */}
              <div className="flex flex-col" style={{ gap: "12px" }}>
                {/* Egypt Office */}
                <div
                  className="rounded-[14px] p-4 flex items-start gap-3 transition-all duration-200"
                  style={{
                    background: "var(--md-surface-container-low)",
                    border: "1px solid var(--md-outline-variant)",
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-lg shrink-0 mt-0.5"
                    style={{
                      width: "32px",
                      height: "32px",
                      background: "rgba(91, 168, 255, 0.12)",
                      color: "var(--md-primary)",
                    }}
                  >
                    <MapPin size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "12px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "var(--md-primary)",
                      }}
                    >
                      Egypt Office (Regional Operations)
                    </span>
                    <span
                      style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "var(--md-on-surface)",
                        marginTop: "2px",
                      }}
                    >
                      Alexandria, Egypt
                    </span>
                    <a
                      href="tel:+201211857725"
                      className="text-xs mt-1 hover:underline"
                      style={{ color: "var(--md-on-surface-variant)" }}
                    >
                      Tel / WhatsApp: +20 121 185 7725
                    </a>
                  </div>
                </div>

                {/* UAE Office */}
                <div
                  className="rounded-[14px] p-4 flex items-start gap-3 transition-all duration-200"
                  style={{
                    background: "var(--md-surface-container-low)",
                    border: "1px solid var(--md-outline-variant)",
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-lg shrink-0 mt-0.5"
                    style={{
                      width: "32px",
                      height: "32px",
                      background: "rgba(46, 213, 115, 0.12)",
                      color: "#25D366",
                    }}
                  >
                    <Building size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "12px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "#25D366",
                      }}
                    >
                      UAE Office (Commercial & Corporate)
                    </span>
                    <span
                      style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "var(--md-on-surface)",
                        marginTop: "2px",
                      }}
                    >
                      Dubai, United Arab Emirates
                    </span>
                    <a
                      href="https://wa.me/971558715615"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs mt-1 hover:underline"
                      style={{ color: "var(--md-on-surface-variant)" }}
                    >
                      WhatsApp: +971 55 871 5615
                    </a>
                  </div>
                </div>

                {/* Support Email */}
                <div
                  className="rounded-[14px] p-4 flex items-start gap-3 transition-all duration-200"
                  style={{
                    background: "var(--md-surface-container-low)",
                    border: "1px solid var(--md-outline-variant)",
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-lg shrink-0 mt-0.5"
                    style={{
                      width: "32px",
                      height: "32px",
                      background: "rgba(167, 139, 250, 0.12)",
                      color: "#a78bfa",
                    }}
                  >
                    <Mail size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "12px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "#a78bfa",
                      }}
                    >
                      Official Support & Billing Desk
                    </span>
                    <a
                      href="mailto:support@sw-point.com"
                      className="text-sm font-medium hover:underline mt-0.5"
                      style={{ color: "var(--md-on-surface)" }}
                    >
                      support@sw-point.com
                    </a>
                    <span className="text-xs mt-1" style={{ color: "var(--md-on-surface-variant)" }}>
                      Response SLA: Under 24 Business Hours
                    </span>
                  </div>
                </div>

                {/* Hours & Availability */}
                <div
                  className="rounded-[14px] p-4 flex items-start gap-3 transition-all duration-200"
                  style={{
                    background: "var(--md-surface-container-low)",
                    border: "1px solid var(--md-outline-variant)",
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-lg shrink-0 mt-0.5"
                    style={{
                      width: "32px",
                      height: "32px",
                      background: "rgba(251, 191, 36, 0.12)",
                      color: "#fbbf24",
                    }}
                  >
                    <Clock size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "12px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "#fbbf24",
                      }}
                    >
                      Working Hours
                    </span>
                    <span
                      style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "13px",
                        color: "var(--md-on-surface)",
                        marginTop: "2px",
                      }}
                    >
                      Sunday – Thursday: 9:00 AM – 6:00 PM (GMT+2 / GMT+4)
                    </span>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="flex" style={{ gap: "12px" }}>
                {[
                  {
                    icon: <Linkedin size={16} />,
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/company/111152120",
                  },
                  {
                    icon: <Github size={16} />,
                    label: "GitHub",
                    href: "https://github.com/Sw-Point",
                  },
                  {
                    icon: <Globe size={16} />,
                    label: "Website",
                    href: "https://www.sw-point.com",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center rounded-full transition-all duration-200"
                    style={{
                      gap: "8px",
                      padding: "10px 16px",
                      background: "var(--md-surface-container-low)",
                      border: "1px solid var(--md-outline-variant)",
                      color: "var(--md-on-surface-variant)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "rgba(91,168,255,0.08)";
                      el.style.borderColor = "rgba(91,168,255,0.3)";
                      el.style.color = "var(--md-primary)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "var(--md-surface-container-low)";
                      el.style.borderColor = "var(--md-outline-variant)";
                      el.style.color = "var(--md-on-surface-variant)";
                    }}
                  >
                    {social.icon}
                    {social.label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* ── Right: Contact Form ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.2, 0, 0, 1] }}
              className="lg:col-span-7"
            >
              {submitted ? (
                <div
                  className="flex flex-col items-center justify-center rounded-[24px]"
                  style={{
                    minHeight: "400px",
                    background: "var(--md-surface-container-low)",
                    border: "1px solid var(--md-secondary)30",
                    padding: "48px",
                    gap: "20px",
                    textAlign: "center",
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: "64px",
                      height: "64px",
                      background: "rgba(38,198,176,0.12)",
                      color: "var(--md-secondary)",
                    }}
                  >
                    <Send size={24} />
                  </div>
                  <div className="flex flex-col" style={{ gap: "8px" }}>
                    <h3
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "var(--md-on-surface)",
                        margin: 0,
                      }}
                    >
                      Message Received!
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "15px",
                        color: "var(--md-on-surface-variant)",
                        margin: 0,
                        lineHeight: 1.7,
                      }}
                    >
                      Thanks for reaching out. We'll be in touch within 24
                      hours to discuss your project.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", message: "" });
                    }}
                    className="rounded-full transition-all duration-200"
                    style={{
                      padding: "10px 24px",
                      background: "var(--md-surface-container)",
                      border: "1px solid var(--md-outline-variant)",
                      color: "var(--md-on-surface)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col rounded-[24px]"
                  style={{
                    background: "var(--md-surface-container-low)",
                    border: "1px solid var(--md-outline-variant)",
                    padding: "32px",
                    gap: "20px",
                  }}
                >
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "16px" }}>
                    <div className="flex flex-col" style={{ gap: "8px" }}>
                      <label
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "var(--md-on-surface-variant)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        required
                        style={inputStyle("name")}
                      />
                    </div>
                    <div className="flex flex-col" style={{ gap: "8px" }}>
                      <label
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "var(--md-on-surface-variant)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        required
                        style={inputStyle("email")}
                      />
                    </div>
                  </div>

                  {/* Project type selector */}
                  <div className="flex flex-col" style={{ gap: "8px" }}>
                    <label
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "var(--md-on-surface-variant)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      Project Type
                    </label>
                    <div className="flex flex-wrap" style={{ gap: "8px" }}>
                      {[
                        "Flutter App",
                        "Web Platform",
                        "Design System",
                        "Firebase Backend",
                        "Full Project",
                      ].map((type) => {
                        const isSelected = form.message.startsWith(type);
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() =>
                              setForm({
                                ...form,
                                message: isSelected ? "" : type + "\n\n",
                              })
                            }
                            className="rounded-full transition-all duration-200"
                            style={{
                              padding: "7px 14px",
                              background: isSelected
                                ? "var(--md-primary)"
                                : "var(--md-surface-container)",
                              border: `1px solid ${
                                isSelected
                                  ? "transparent"
                                  : "var(--md-outline-variant)"
                              }`,
                              color: isSelected
                                ? "var(--md-on-primary)"
                                : "var(--md-on-surface-variant)",
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fontSize: "12px",
                              fontWeight: 500,
                              cursor: "pointer",
                            }}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col" style={{ gap: "8px" }}>
                    <label
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "var(--md-on-surface-variant)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      Tell us about your project
                    </label>
                    <textarea
                      placeholder="Describe what you're building, your timeline, and any specific requirements..."
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      rows={5}
                      required
                      style={inputStyle("message")}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="flex items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      padding: "16px 32px",
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
                      el.style.transform = "translateY(-1px)";
                      el.style.boxShadow = "0 8px 32px rgba(91,168,255,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                  {error && (
                    <div
                      className="flex items-center rounded-[12px] transition-all duration-200"
                      style={{
                        padding: "14px 16px",
                        background: "rgba(255,0,0,0.08)",
                        border: "1px solid rgba(255,0,0,0.3)",
                        color: "var(--md-on-surface-variant)",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "13px",
                        fontWeight: 500,
                        gap: "8px",
                      }}
                    >
                      <AlertCircle size={16} />
                      {error}
                    </div>
                  )}
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        id="about"
        role="contentinfo"
        aria-label="Switch Point footer and legal center"
        style={{
          backgroundColor: "var(--md-surface-container-lowest)",
          borderTop: "1px solid var(--md-outline-variant)",
          padding: "56px 0 36px 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[var(--md-outline-variant)]">
            {/* Col 1: Brand & Registration */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <a
                href="https://sw-point.com"
                className="flex items-center gap-2.5 text-decoration-none"
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
                <div className="flex flex-col">
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
                  <span
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "11px",
                      color: "var(--md-on-surface-variant)",
                    }}
                  >
                    Digital Product Studio & Enterprise SaaS
                  </span>
                </div>
              </a>
              <p
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "13px",
                  lineHeight: 1.7,
                  color: "var(--md-on-surface-variant)",
                  margin: 0,
                }}
              >
                Engineering high-concurrency cross-platform applications, biometric field attendance systems (Tashil), and modern digital experiences across Egypt and the UAE.
              </p>
              <div className="text-xs text-[var(--md-on-surface-variant)] flex flex-col gap-1">
                <span>📍 <strong>Egypt Office:</strong> Alexandria, Egypt</span>
                <span>🏢 <strong>UAE Office:</strong> Dubai, United Arab Emirates</span>
                <span>✉️ <strong>Support:</strong> support@sw-point.com</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--md-on-surface)",
                }}
              >
                Platform & Solutions
              </span>
              <nav aria-label="Footer platform links" className="flex flex-col gap-2">
                {[
                  { label: "Work & Portfolio", href: "#work" },
                  { label: "Studio Services", href: "#services" },
                  { label: "Engineering Process", href: "#process" },
                  { label: "Commercial Pricing", href: "#pricing" },
                  { label: "Contact Us", href: "#contact" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-xs text-[var(--md-on-surface-variant)] hover:text-[var(--md-primary)] transition-colors duration-150"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Col 3: Legal & Regulatory Policies */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[var(--md-primary)]" />
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--md-on-surface)",
                  }}
                >
                  Legal & Compliance Policies
                </span>
              </div>
              <p className="text-xs text-[var(--md-on-surface-variant)] mb-1">
                Fully transparent commercial and operational terms for merchant account and payment approval:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onOpenLegal ? onOpenLegal("privacy") : (window.location.hash = "privacy-policy")}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[var(--md-on-surface)] bg-[var(--md-surface-container)] hover:bg-[var(--md-surface-container-high)] border border-[var(--md-outline-variant)] text-left transition-colors duration-150"
                >
                  <ShieldCheck size={14} className="text-cyan-400 shrink-0" />
                  <span>Privacy Policy (Tashil)</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLegal ? onOpenLegal("delivery") : (window.location.hash = "delivery-policy")}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[var(--md-on-surface)] bg-[var(--md-surface-container)] hover:bg-[var(--md-surface-container-high)] border border-[var(--md-outline-variant)] text-left transition-colors duration-150"
                >
                  <Truck size={14} className="text-blue-400 shrink-0" />
                  <span>Delivery & Fulfillment</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLegal ? onOpenLegal("refund") : (window.location.hash = "refund-policy")}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[var(--md-on-surface)] bg-[var(--md-surface-container)] hover:bg-[var(--md-surface-container-high)] border border-[var(--md-outline-variant)] text-left transition-colors duration-150"
                >
                  <RefreshCw size={14} className="text-emerald-400 shrink-0" />
                  <span>Refund & Cancellation</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLegal ? onOpenLegal("terms") : (window.location.hash = "terms-of-service")}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[var(--md-on-surface)] bg-[var(--md-surface-container)] hover:bg-[var(--md-surface-container-high)] border border-[var(--md-outline-variant)] text-left transition-colors duration-150"
                >
                  <FileText size={14} className="text-amber-400 shrink-0" />
                  <span>Terms of Service</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLegal ? onOpenLegal("about") : (window.location.hash = "about-us")}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[var(--md-on-surface)] bg-[var(--md-surface-container)] hover:bg-[var(--md-surface-container-high)] border border-[var(--md-outline-variant)] text-left transition-colors duration-150 sm:col-span-2"
                >
                  <Info size={14} className="text-purple-400 shrink-0" />
                  <span>About Us (Switch Point Studio)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Security */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--md-on-surface-variant)]">
            <p className="margin-0 text-center sm:text-left">
              &copy; 2026 Switch Point. All rights reserved. Commercial registration in Alexandria, Egypt & Dubai, UAE.
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                256-Bit SSL Encrypted
              </span>
              <a
                href="mailto:support@sw-point.com"
                className="text-[var(--md-primary)] hover:underline"
              >
                support@sw-point.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}