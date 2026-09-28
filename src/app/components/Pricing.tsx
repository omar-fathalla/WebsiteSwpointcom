import { useState } from "react";
import { motion } from "motion/react";
import { Check, ShieldCheck, Zap, Sparkles, Building2, Smartphone, ArrowRight, HelpCircle, RefreshCw, Clock } from "lucide-react";

interface PricingProps {
  onOpenLegal?: (tab: string) => void;
}

export function Pricing({ onOpenLegal }: PricingProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [activeTab, setActiveTab] = useState<"saas" | "services">("saas");

  const saasPlans = [
    {
      id: "starter",
      name: "Tashil Starter",
      subtitle: "For small teams and localized field delegate fleets",
      monthlyPrice: 1.8,
      annualPrice: 1.5,
      unit: "per delegate / month",
      popular: false,
      description: "Essential biometric attendance, dynamic QR scanning, and automated zone geofencing.",
      features: [
        "Up to 15 field delegates",
        "Circular GPS geofence zone verification",
        "Dynamic anti-spoofing QR check-in & check-out",
        "Daily attendance logs & PDF report export",
        "Native Android & iOS delegate application",
        "Standard email & ticket support (24h response)",
      ],
      ctaText: "Start 14-Day Free Pilot",
      ctaLink: "#contact",
      highlight: false,
    },
    {
      id: "pro",
      name: "Tashil Growth",
      subtitle: "For growing distribution companies and multi-branch teams",
      monthlyPrice: 5,
      annualPrice: 4,
      unit: "per delegate / month",
      popular: true,
      description: "Full real-time tracking, offline synchronization engine, and automated payroll calculations.",
      features: [
        "Up to 100 field delegates",
        "Multi-polygon geofences & branch hierarchies",
        "Offline-first sync engine with local SQLite cache",
        "Camera audit photo capture (gallery bypass protection)",
        "Real-time supervisor web dashboard",
        "Automated payroll, overtime & delay deductions",
        "Priority WhatsApp & phone support (under 2 hours)",
      ],
      ctaText: "Deploy Tashil Growth",
      ctaLink: "#contact",
      highlight: true,
    },
    {
      id: "enterprise",
      name: "Tashil Enterprise",
      subtitle: "For nationwide distribution, logistics corporations & government delegates",
      monthlyPrice: 9.5,
      annualPrice: 7.9,
      unit: "per delegate / month",
      popular: false,
      description: "Dedicated cloud tenant, custom HRMS / ERP API connectors, and bespoke compliance SLAs.",
      features: [
        "Unlimited field delegates & branch zones",
        "Dedicated isolated Google Cloud Firestore database",
        "Custom ERP / SAP / Oracle HR payroll integrations",
        "3-Factor biometric security & hardware binding",
        "Custom feature engineering & on-premise relay options",
        "99.95% enterprise uptime SLA guarantee",
        "Dedicated Technical Account Manager & direct phone hotline",
      ],
      ctaText: "Contact Enterprise Sales",
      ctaLink: "#contact",
      highlight: false,
    },
  ];

  const servicePackages = [
    {
      id: "sprint",
      name: "Design Sprint & Prototype",
      subtitle: "From rough concept to investor-ready Figma interactive prototype",
      price: 2400,
      duration: "2 Weeks Turnaround",
      features: [
        "Complete UI/UX Design System in Figma",
        "Interactive high-fidelity clickable prototype",
        "Information architecture & user journey mapping",
        "Design tokens ready for Flutter & React/Next.js",
        "Full commercial intellectual property assignment",
      ],
      ctaText: "Book Design Sprint",
      ctaLink: "#contact",
      popular: false,
    },
    {
      id: "mvp",
      name: "Full MVP Engineering",
      subtitle: "End-to-end production mobile app and cloud backend ready for market launch",
      price: 6800,
      duration: "6–8 Weeks Turnaround",
      features: [
        "Cross-platform Flutter iOS & Android production app",
        "Cloud backend (Firebase / PostgreSQL / Cloud Functions)",
        "Responsive web admin dashboard for management",
        "App Store & Google Play Store submission & review pass",
        "Clean architecture with comprehensive test coverage",
        "30-day post-launch warranty & bug-free guarantee",
      ],
      ctaText: "Build Your MVP",
      ctaLink: "#contact",
      popular: true,
    },
    {
      id: "retainer",
      name: "Dedicated Studio Retainer",
      subtitle: "Continuous product engineering, feature sprints, and infrastructure scaling",
      price: 3600,
      duration: "Monthly Dedicated Sprint",
      features: [
        "Dedicated senior Flutter & cloud engineers",
        "Bi-weekly sprint planning & continuous deployment",
        "Security patching, database optimizations & 24/7 monitoring",
        "Priority feature implementation & tech debt resolution",
        "Flexible cancellation with 30-day advance notice",
      ],
      ctaText: "Hire Studio Retainer",
      ctaLink: "#contact",
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
      aria-label="Products and Services Pricing"
      style={{
        backgroundColor: "var(--md-surface)",
        padding: "96px 0",
        borderTop: "1px solid var(--md-outline-variant)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-low)] text-[var(--md-primary)]">
            <Sparkles size={14} /> Transparent Commercial Pricing
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--md-on-surface)]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Predictable plans.{" "}
            <span
              style={{
                background: "linear-gradient(90deg, var(--md-primary) 0%, var(--md-secondary) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Enterprise execution.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--md-on-surface-variant)] leading-relaxed">
            Whether you are licensing our flagship <strong>Tashil Delegate SaaS</strong> platform or partnering with our product studio for custom software engineering, all pricing is transparent with clear milestones and SLA guarantees.
          </p>

          {/* Product Category Selector */}
          <div className="mt-8 inline-flex p-1 rounded-2xl bg-[var(--md-surface-container-high)] border border-[var(--md-outline-variant)]">
            <button
              onClick={() => setActiveTab("saas")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === "saas"
                  ? "bg-[var(--md-primary)] text-[var(--md-on-primary)] shadow-lg shadow-[rgba(91,168,255,0.25)]"
                  : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)]"
              }`}
            >
              <Smartphone size={16} /> Tashil Delegate SaaS
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === "services"
                  ? "bg-[var(--md-primary)] text-[var(--md-on-primary)] shadow-lg shadow-[rgba(91,168,255,0.25)]"
                  : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)]"
              }`}
            >
              <Building2 size={16} /> Studio Custom Engineering
            </button>
          </div>

          {/* Monthly / Annual Toggle for SaaS */}
          {activeTab === "saas" && (
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className={`text-sm ${billingCycle === "monthly" ? "text-[var(--md-on-surface)] font-medium" : "text-[var(--md-on-surface-variant)]"}`}>
                Monthly Billing
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={billingCycle === "annual"}
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
                className="w-13 h-7 flex items-center rounded-full p-1 transition-colors duration-200 bg-[var(--md-surface-container-highest)] border border-[var(--md-outline-variant)]"
              >
                <div
                  className={`bg-[var(--md-primary)] w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                    billingCycle === "annual" ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
              <span className={`text-sm flex items-center gap-1.5 ${billingCycle === "annual" ? "text-[var(--md-on-surface)] font-medium" : "text-[var(--md-on-surface-variant)]"}`}>
                Annual Billing <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">Save 20%</span>
              </span>
            </div>
          )}
        </div>

        {/* Pricing Cards Grid */}
        {activeTab === "saas" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {saasPlans.map((plan) => {
              const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-b from-[var(--md-surface-container)] to-[var(--md-surface-container-low)] border-2 border-[var(--md-primary)] shadow-2xl shadow-[rgba(91,168,255,0.15)] md:-translate-y-2"
                      : "bg-[var(--md-surface-container-low)] border border-[var(--md-outline-variant)] hover:border-[var(--md-outline)]"
                  }`}
                  style={{ padding: "32px" }}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--md-primary)] text-[var(--md-on-primary)] shadow-md">
                      Most Popular Plan
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-[var(--md-on-surface)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--md-on-surface-variant)] min-h-[32px]">{plan.subtitle}</p>

                    <div className="mt-6 mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold text-[var(--md-on-surface)]">${price}</span>
                        <span className="text-sm text-[var(--md-on-surface-variant)]">USD</span>
                      </div>
                      <span className="text-xs text-[var(--md-on-surface-variant)] block mt-0.5">{plan.unit}</span>
                      {billingCycle === "annual" && (
                        <span className="text-xs text-emerald-400 mt-1 block">Billed annually (${(price * 12).toFixed(1).replace(/\.0$/, "")}/delegate/yr)</span>
                      )}
                    </div>

                    <p className="text-sm text-[var(--md-on-surface-variant)] pb-6 border-b border-[var(--md-outline-variant)]">
                      {plan.description}
                    </p>

                    <div className="mt-6 space-y-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--md-on-surface)] block">
                        Included Features:
                      </span>
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-sm text-[var(--md-on-surface-variant)]">
                          <Check size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[var(--md-outline-variant)]">
                    <a
                      href={plan.ctaLink}
                      className={`w-full py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 text-center ${
                        plan.popular
                          ? "bg-[var(--md-primary)] text-[var(--md-on-primary)] hover:opacity-95 shadow-md shadow-[rgba(91,168,255,0.25)]"
                          : "bg-[var(--md-surface-container-high)] text-[var(--md-on-surface)] hover:bg-[var(--md-surface-container-highest)] border border-[var(--md-outline-variant)]"
                      }`}
                    >
                      {plan.ctaText} <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {servicePackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                  pkg.popular
                    ? "bg-gradient-to-b from-[var(--md-surface-container)] to-[var(--md-surface-container-low)] border-2 border-[var(--md-primary)] shadow-2xl shadow-[rgba(91,168,255,0.15)] md:-translate-y-2"
                    : "bg-[var(--md-surface-container-low)] border border-[var(--md-outline-variant)] hover:border-[var(--md-outline)]"
                }`}
                style={{ padding: "32px" }}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--md-primary)] text-[var(--md-on-primary)] shadow-md">
                    Recommended Choice
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-[var(--md-on-surface)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {pkg.name}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--md-on-surface-variant)] min-h-[32px]">{pkg.subtitle}</p>

                  <div className="mt-6 mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-[var(--md-on-surface)]">${pkg.price.toLocaleString()}</span>
                      <span className="text-sm text-[var(--md-on-surface-variant)]">USD</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 mt-1 text-xs font-medium text-[var(--md-primary)]">
                      <Clock size={13} /> {pkg.duration}
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-[var(--md-outline-variant)]">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--md-on-surface)] block">
                      Deliverables Included:
                    </span>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-[var(--md-on-surface-variant)]">
                        <Check size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--md-outline-variant)]">
                  <a
                    href={pkg.ctaLink}
                    className={`w-full py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 text-center ${
                      pkg.popular
                        ? "bg-[var(--md-primary)] text-[var(--md-on-primary)] hover:opacity-95 shadow-md shadow-[rgba(91,168,255,0.25)]"
                        : "bg-[var(--md-surface-container-high)] text-[var(--md-on-surface)] hover:bg-[var(--md-surface-container-highest)] border border-[var(--md-outline-variant)]"
                    }`}
                  >
                    {pkg.ctaText} <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Commercial & Compliance Assurance Banner */}
        <div className="mt-14 rounded-2xl bg-[var(--md-surface-container-low)] border border-[var(--md-outline-variant)] p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[var(--md-on-surface)]">14-Day Pilot Guarantee</h4>
                <p className="mt-1 text-xs text-[var(--md-on-surface-variant)] leading-relaxed">
                  Test Tashil SaaS risk-free for 14 days. Eligible for a 100% full refund if operational criteria are unmet.
                </p>
                {onOpenLegal && (
                  <button
                    onClick={() => onOpenLegal("refund")}
                    className="mt-2 text-xs font-semibold text-[var(--md-primary)] hover:underline inline-flex items-center gap-1"
                  >
                    Read Refund Policy <ArrowRight size={12} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                <Zap size={22} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[var(--md-on-surface)]">Instant Digital Fulfillment</h4>
                <p className="mt-1 text-xs text-[var(--md-on-surface-variant)] leading-relaxed">
                  SaaS organization tenants and admin credentials are automatically provisioned within 24 hours of checkout.
                </p>
                {onOpenLegal && (
                  <button
                    onClick={() => onOpenLegal("delivery")}
                    className="mt-2 text-xs font-semibold text-[var(--md-primary)] hover:underline inline-flex items-center gap-1"
                  >
                    Read Delivery Policy <ArrowRight size={12} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                <RefreshCw size={22} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[var(--md-on-surface)]">Multi-Currency & VAT Invoicing</h4>
                <p className="mt-1 text-xs text-[var(--md-on-surface-variant)] leading-relaxed">
                  Prices billed in USD or converted to local EGP and AED currencies. Official tax invoices provided for Egypt & UAE corporate accounts.
                </p>
                {onOpenLegal && (
                  <button
                    onClick={() => onOpenLegal("privacy")}
                    className="mt-2 text-xs font-semibold text-[var(--md-primary)] hover:underline inline-flex items-center gap-1"
                  >
                    Review Privacy & Security <ArrowRight size={12} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
