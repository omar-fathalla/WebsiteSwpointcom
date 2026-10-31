import { useState, useEffect } from "react";
import { Dialog } from "../../md3/Dialog";
import { onRovingKeyDown } from "../../md3/a11y";
import { X, ShieldCheck, FileText, RefreshCw, Truck, Info, MapPin, Printer } from "lucide-react";
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

  return (
    <Dialog open={isOpen} onClose={onClose} label="Switch Point Legal & Compliance Center" size="wide">
      <div className="flex items-center justify-between gap-2 pl-6 pr-3 pt-4 pb-2 shrink-0">
        <div className="min-w-0">
          <h2 className="text-title-large text-on-surface truncate">Switch Point Legal & Compliance Center</h2>
          <span className="text-body-small text-on-surface-variant">Official Corporate Policies</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={() => window.print()} className="md-icon-btn hidden md:inline-flex" title="Print Policy" aria-label="Print Policy"><Printer /></button>
          <button onClick={onClose} className="md-icon-btn" aria-label="Close modal"><X /></button>
        </div>
      </div>

      <div role="tablist" aria-label="Policies" onKeyDown={onRovingKeyDown} className="md-tabs shrink-0 overflow-x-auto" style={{ justifyContent: "flex-start" }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} role="tab" aria-selected={activeTabKey === tab.id} tabIndex={activeTabKey === tab.id ? 0 : -1} onClick={() => setActiveTabKey(tab.id)} className="md-tab" style={{ flex: "0 0 auto", paddingInline: 16 }}>
              <span className="md-tab-label"><Icon size={18} /> {tab.label}</span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" tabIndex={0} aria-label={currentPolicy.title} className="flex-1 overflow-y-auto px-6 py-6 md:px-8 space-y-6">
        <div className="space-y-2">
          <span className="md-chip selected" style={{ background: "var(--md-sys-color-tertiary-container)", color: "var(--md-sys-color-on-tertiary-container)", borderColor: "transparent" }}>{currentPolicy.badge}</span>
          <h3 className="text-headline-small md:text-headline-medium text-on-surface">{currentPolicy.title}</h3>
          <div className="text-body-small text-on-surface-variant">Last Updated: {currentPolicy.lastUpdated} · Switch Point Studio</div>
          <p className="md-card md-card-filled p-4 text-body-medium text-on-surface-variant">{currentPolicy.summary}</p>
        </div>
        <div className="space-y-6">
          {currentPolicy.sections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="text-title-medium text-on-surface">{section.heading}</h4>
              <div className="space-y-2 text-body-medium text-on-surface-variant">
                {section.content.map((p, pIdx) => <p key={pIdx}>{p}</p>)}
              </div>
            </div>
          ))}
        </div>
        <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="md-card md-card-outlined p-4 space-y-1">
            <span className="text-title-small text-on-surface flex items-center gap-2"><MapPin size={18} className="text-primary" /> Egypt Office (Physical Address)</span>
            <p className="text-body-medium text-on-surface-variant">Commercial Market, Smouha, Alexandria, Egypt</p>
            <p className="text-body-small text-on-surface-variant">Tel: +20 121 185 7725</p>
          </div>
          <div className="md-card md-card-outlined p-4 space-y-1">
            <span className="text-title-small text-on-surface flex items-center gap-2"><MapPin size={18} className="text-primary" /> UAE Office (Corporate Representative)</span>
            <p className="text-body-medium text-on-surface-variant">Dubai, United Arab Emirates</p>
            <p className="text-body-small text-on-surface-variant">WhatsApp: +971 55 871 5615</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-2 text-body-small text-on-surface-variant shrink-0">
        <span>Official Legal Entity: Switch Point Studio (sw-point.com)</span>
        <button onClick={onClose} className="md-btn md-btn-text">Close Policy</button>
      </div>
    </Dialog>
  );
}
