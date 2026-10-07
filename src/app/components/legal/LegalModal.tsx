import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, FileText, RefreshCw, Truck, Info, Mail, Phone, MapPin, Printer } from "lucide-react";
import { LEGAL_POLICIES, LegalPolicy } from "./legalPolicies";

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: string;
  onClose: () => void;
}

export function LegalModal({ isOpen, initialTab = "privacy", onClose }: LegalModalProps) {
  const [activeTabKey, setActiveTabKey] = useState<string>(initialTab);

  useEffect(() => {
    if (initialTab && LEGAL_POLICIES[initialTab]) {
      setActiveTabKey(initialTab);
    }
  }, [initialTab]);

  // Handle URL hash changes for direct deep linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "privacy-policy" || hash === "privacy") {
        setActiveTabKey("privacy");
      } else if (hash === "refund-policy" || hash === "refund") {
        setActiveTabKey("refund");
      } else if (hash === "delivery-policy" || hash === "delivery") {
        setActiveTabKey("delivery");
      } else if (hash === "terms-of-service" || hash === "terms") {
        setActiveTabKey("terms");
      } else if (hash === "about-us" || hash === "about-company") {
        setActiveTabKey("about");
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const currentPolicy: LegalPolicy = LEGAL_POLICIES[activeTabKey] || LEGAL_POLICIES.privacy;

  const tabs = [
    { id: "privacy", label: "Privacy Policy", icon: ShieldCheck },
    { id: "terms", label: "Terms of Service", icon: FileText },
    { id: "refund", label: "Refund & Cancellation", icon: RefreshCw },
    { id: "delivery", label: "Delivery & Fulfillment", icon: Truck },
    { id: "about", label: "About Us", icon: Info },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.05, 0.7, 0.1, 1.0] }}
          className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl flex flex-col overflow-hidden text-left z-10"
        >
          {/* Top Bar Header */}
          <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center font-bold text-xs">
                SP
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Switch Point Legal & Compliance Center</span>
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">Official Corporate Policies</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
                title="Print Policy"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Policy Navigation Tabs */}
          <div className="px-6 py-3 bg-slate-900/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTabKey === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabKey(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Policy Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-300 leading-relaxed scrollbar-thin scrollbar-thumb-slate-800">
            <div className="border-b border-slate-800/80 pb-5">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                <span>{currentPolicy.badge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {currentPolicy.title}
              </h2>
              <div className="text-xs text-slate-400 font-mono mt-1">
                Last Updated: {currentPolicy.lastUpdated} · Switch Point Studio
              </div>
              <p className="text-sm text-slate-300 mt-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                {currentPolicy.summary}
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {currentPolicy.sections.map((section, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-base font-bold text-white tracking-wide">
                    {section.heading}
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {section.content.map((p, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Corporate Address & Contact Box */}
            <div className="pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-400">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="font-bold text-white flex items-center gap-1.5 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  Egypt Office (Physical Address)
                </span>
                <p className="text-slate-300">Commercial Market, Smouha, Alexandria, Egypt</p>
                <p className="text-slate-400 font-mono">Tel: +20 121 185 7725</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="font-bold text-white flex items-center gap-1.5 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  UAE Office (Corporate Representative)
                </span>
                <p className="text-slate-300">Dubai, United Arab Emirates</p>
                <p className="text-slate-400 font-mono">WhatsApp: +971 55 871 5615</p>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
            <span>Official Legal Entity: Switch Point Studio (sw-point.com)</span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors"
            >
              Close Policy
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
