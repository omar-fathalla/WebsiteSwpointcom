import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TASHIL_ROLES, 
  TashilRole 
} from "./tashilData";
import { 
  QrCode, 
  ShieldCheck, 
  Crown, 
  Building2, 
  Laptop, 
  Megaphone, 
  Store, 
  Receipt, 
  Users2, 
  CheckCircle, 
  ArrowUpRight, 
  Sliders, 
  KeyRound,
  Sparkles,
  Camera,
  MapPin,
  Clock,
  AlertTriangle,
  RefreshCw,
  FileText,
  Send,
  CheckCircle2,
  XCircle,
  Wifi,
  Battery
} from "lucide-react";

// Icon mapping helper
const ROLE_ICONS: Record<string, React.ElementType> = {
  QrCode,
  ShieldCheck,
  Crown,
  Building2,
  Laptop,
  Megaphone,
  Store,
  Receipt,
  Users2,
};

export function TashilRoleSimulator() {
  const [selectedRoleId, setSelectedRoleId] = useState<string>("delegate");
  const selectedRole = TASHIL_ROLES.find((r) => r.id === selectedRoleId) || TASHIL_ROLES[0];
  const ActiveIcon = ROLE_ICONS[selectedRole.icon] || QrCode;

  // Interactive tool states for in-phone live preview
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const triggerActionNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 2500);
  };

  return (
    <div className="relative rounded-3xl border border-slate-800 bg-slate-950/70 backdrop-blur-2xl p-6 sm:p-8 lg:p-12 shadow-2xl overflow-hidden text-left">
      {/* Dynamic ambient illumination based on selected role color */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: selectedRole.color }}
      />
      <div 
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: selectedRole.color }}
      />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-slate-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 9-Role Persona Simulator</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            Enterprise Multi-Role Workforce Simulator
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Select any of the 9 specialized roles to inspect its dedicated interface screens,
            tailored performance metrics, and realistic mobile tools.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-2xl">
          <KeyRound className="w-4 h-4 text-emerald-400" />
          <div className="text-xs">
            <span className="text-slate-400">Security Architecture: </span>
            <span className="text-emerald-400 font-bold font-mono">Dynamic RBAC + Firestore Rules</span>
          </div>
        </div>
      </div>

      {/* ── 9 Role Selector Chips (Arranged in 2 clean wrapped rows with NO scrollbar) ── */}
      <div className="mb-12">
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-6xl mx-auto">
          {TASHIL_ROLES.map((role) => {
            const IconComp = ROLE_ICONS[role.icon] || QrCode;
            const isSelected = role.id === selectedRoleId;

            return (
              <button
                key={role.id}
                onClick={() => setSelectedRoleId(role.id)}
                className={`relative flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-semibold transition-all duration-300 border flex-1 min-w-[170px] sm:min-w-[190px] max-w-[220px] ${
                  isSelected
                    ? "text-white border-transparent shadow-lg"
                    : "text-slate-400 bg-slate-900/40 border-slate-800 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
                style={{
                  backgroundColor: isSelected ? `${role.color}1f` : undefined,
                  borderColor: isSelected ? role.color : undefined,
                }}
              >
                {isSelected && (
                  <motion.div
                    layoutId="roleActiveGlow"
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      boxShadow: `0 0 20px ${role.color}40`,
                      border: `1.5px solid ${role.color}`,
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <div 
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors shrink-0"
                  style={{
                    backgroundColor: isSelected ? role.color : "rgba(255,255,255,0.05)",
                    color: isSelected ? "#0D1117" : role.color,
                  }}
                >
                  <IconComp className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="leading-tight font-bold truncate">{role.nameEn}</span>
                  <span className="text-[10px] opacity-60 font-mono">{role.badgeEn}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Details & Mobile Mockup Grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedRole.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.05, 0.7, 0.1, 1.0] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch"
        >
          {/* Left Column: Role Details, KPIs & Permissions */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Role Header Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ 
                    backgroundColor: `${selectedRole.color}25`, 
                    color: selectedRole.color, 
                    border: `1px solid ${selectedRole.color}50` 
                  }}
                >
                  <ActiveIcon className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {selectedRole.titleEn}
                    </h4>
                    <span 
                      className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider font-mono"
                      style={{ backgroundColor: `${selectedRole.color}20`, color: selectedRole.color }}
                    >
                      {selectedRole.badgeEn}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-1">
                    Operational Scope: <span className="text-slate-300 font-semibold">{selectedRole.scopeEn}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
                {selectedRole.descriptionEn}
              </p>

              {/* KPI Cards */}
              <div className="grid grid-cols-3 gap-3">
                {selectedRole.kpis.map((kpi, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-colors"
                  >
                    <div className="text-xs text-slate-400 mb-1">{kpi.labelEn}</div>
                    <div className="text-lg sm:text-2xl font-black text-white" style={{ color: selectedRole.color }}>
                      {kpi.value}
                    </div>
                    <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                      {kpi.change}
                    </div>
                  </div>
                ))}
              </div>

              {/* Granular Capabilities */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-sky-400" />
                  <span>Tailored Operational Capabilities:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedRole.keyFeaturesEn.map((feat, i) => (
                    <div 
                      key={i} 
                      className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Architecture Banner */}
            <div 
              className="p-4 rounded-2xl border text-xs space-y-2 mt-4"
              style={{
                backgroundColor: `${selectedRole.color}0d`,
                borderColor: `${selectedRole.color}33`,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: selectedRole.color }} />
                  Clean Architecture BLoC Binding:
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-semibold">RBAC Verified</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Events for this persona are encapsulated in <span className="text-sky-300 font-mono font-semibold">{selectedRole.id.toUpperCase()}_Cubit</span>, 
                guaranteeing typed state emissions with strict Firestore security rules on mutations.
              </p>
            </div>
          </div>

          {/* Right Column: Realistic Tall Smartphone Application Frame */}
          <div className="lg:col-span-6 flex justify-center items-center">
            {/* Realistic Tall Phone Shell */}
            <div 
              className="relative w-[320px] sm:w-[350px] min-h-[660px] rounded-[48px] bg-slate-950 border-[8px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(56,189,248,0.12)] flex flex-col overflow-hidden text-left"
            >
              {/* Glossy bezel reflective sheen */}
              <div className="absolute inset-0 rounded-[40px] pointer-events-none border border-white/10 z-30" />

              {/* Dynamic Island & Status Bar */}
              <div className="relative pt-3 pb-2 px-6 flex items-center justify-between z-40 bg-slate-950">
                <span className="text-[11px] font-mono text-slate-400 font-semibold">09:41</span>
                {/* Dynamic Island Capsule */}
                <div className="w-24 h-5 rounded-full bg-black border border-slate-800/80 flex items-center justify-center gap-2 px-2 shadow-inner">
                  <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700/50" />
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: selectedRole.color }} />
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                  <span>5G</span>
                  <div className="w-3 h-2 rounded-sm border border-slate-400" />
                </div>
              </div>

              {/* Mobile App Navigation Header */}
              <div className="px-4 py-3 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-7 h-7 rounded-xl flex items-center justify-center font-bold"
                    style={{ backgroundColor: `${selectedRole.color}25`, color: selectedRole.color }}
                  >
                    <ActiveIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white tracking-wide">Tashil // {selectedRole.nameEn}</div>
                    <div className="text-[9px] text-slate-400 font-mono">v2.4 · {selectedRole.badgeEn}</div>
                  </div>
                </div>

                <div 
                  className="px-2 py-0.5 rounded text-[9px] font-mono font-bold"
                  style={{ backgroundColor: `${selectedRole.color}20`, color: selectedRole.color }}
                >
                  LIVE
                </div>
              </div>

              {/* In-Phone App Viewport with Tools Tailored to this Persona */}
              <div className="flex-1 overflow-y-auto p-4 bg-slate-950 space-y-3.5 scrollbar-none">
                {/* ── Role Status Header Card ── */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Active Operational State</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ONLINE
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="truncate">Riyadh Hub · Al Nakheel Cluster</span>
                  </div>
                </div>

                {/* ── Action Notice Toast (when simulated) ── */}
                {actionNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold text-center shadow-lg"
                  >
                    {actionNotice}
                  </motion.div>
                )}

                {/* ── Dynamic Tools View tailored to the Selected Role ── */}
                {selectedRoleId === "delegate" && (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 space-y-2.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Shift Elapsed:</span>
                        <span className="font-bold text-sky-400 font-mono">06h 45m / 08h 00m</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-sky-400 h-full rounded-full w-[84%]" />
                      </div>
                      <div className="text-[10px] text-emerald-400 font-mono">Geofence: Inside 18m centroid</div>
                    </div>

                    <button
                      onClick={() => triggerActionNotice("Session QR Scanned & Verified with Firestore!")}
                      className="w-full p-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs shadow-md shadow-sky-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>Scan Branch Session QR</span>
                    </button>

                    <button
                      onClick={() => triggerActionNotice("Camera Opened with Live GPS Geotag Watermark")}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-emerald-400" />
                        <span>Submit Shelf Photo Permit</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                  </div>
                )}

                {selectedRoleId === "field_supervisor" && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                      <div className="flex justify-between font-bold">
                        <span className="text-white">Assigned Territory Fleet</span>
                        <span className="text-emerald-400 font-mono">48 / 50 Active</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Al Nakheel Mall · 4 Promoters on floor</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/30 text-xs space-y-2">
                      <div className="flex justify-between font-bold text-white">
                        <span>Pending Photo Permit</span>
                        <span className="text-amber-400 text-[10px] font-mono">Awaiting Review</span>
                      </div>
                      <p className="text-[10px] text-slate-400">Ahmed Mansour · Shelf Gondola #4</p>
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => triggerActionNotice("Photo Permit Approved & Watermarked!")}
                          className="flex-1 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-[10px]"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => triggerActionNotice("Photo Permit Rejected: Planogram Gap")}
                          className="flex-1 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold text-[10px]"
                        >
                          Reject
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => triggerActionNotice("FCM Broadcast Sent to 48 Active Delegates")}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-300 flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Broadcast Notice to Territory</span>
                    </button>
                  </div>
                )}

                {selectedRoleId === "super_admin" && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                      <span className="text-slate-400 block text-[10px] font-mono">GLOBAL TENANT REGISTRY</span>
                      <div className="flex justify-between font-bold text-white">
                        <span>Active Corporate Tenants</span>
                        <span className="text-indigo-400 font-mono">34 Organizations</span>
                      </div>
                      <div className="text-[10px] text-emerald-400">System Health: 99.98% SLA</div>
                    </div>

                    <button
                      onClick={() => triggerActionNotice("Provisioned New Corporate Tenant Container")}
                      className="w-full p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <Building2 className="w-4 h-4" />
                      <span>Provision New Tenant</span>
                    </button>

                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[10px] text-slate-400 space-y-1">
                      <div className="font-semibold text-white">Security Audit Log:</div>
                      <div>• Role-based Firestore security rules: 16KB compiled</div>
                      <div>• Active composite query indexes: 95KB</div>
                    </div>
                  </div>
                )}

                {selectedRoleId === "org_admin" && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                      <div className="flex justify-between font-bold text-white">
                        <span>Company Stores & Clusters</span>
                        <span className="text-sky-400 font-mono">142 Locations</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Attendance Today: 97.4% on-site</div>
                    </div>

                    <button
                      onClick={() => triggerActionNotice("Geofence Radius Updated: 50m Centroid Stored")}
                      className="w-full p-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Configure Store Geofence</span>
                    </button>

                    <button
                      onClick={() => triggerActionNotice("Exporting Roster & Payroll Attendance Dataset")}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Export Consolidated Report</span>
                    </button>
                  </div>
                )}

                {selectedRoleId === "tech_support" && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                      <span className="text-[10px] font-mono text-slate-400">HARDWARE DEVICE ATTESTATION</span>
                      <div className="flex justify-between font-bold text-white">
                        <span>Hardware UUID Locked:</span>
                        <span className="text-emerald-400 font-mono">3,110 Phones</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Mock Location Intercepts: 0.14%</div>
                    </div>

                    <button
                      onClick={() => triggerActionNotice("Device Binding Token Re-issued & Verified")}
                      className="w-full p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <KeyRound className="w-4 h-4" />
                      <span>Unlock / Re-bind Hardware UUID</span>
                    </button>

                    <button
                      onClick={() => triggerActionNotice("Local Stale-While-Revalidate Cache Verified")}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
                      <span>Run Offline Cache Diagnostics</span>
                    </button>
                  </div>
                )}

                {selectedRoleId === "marketing" && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                      <div className="flex justify-between font-bold text-white">
                        <span>Planogram Compliance</span>
                        <span className="text-rose-400 font-mono">94.6%</span>
                      </div>
                      <div className="text-[10px] text-slate-400">18,400+ Audited Shelf Photos</div>
                    </div>

                    <button
                      onClick={() => triggerActionNotice("Opening Smart Shelf Merchandising Gallery")}
                      className="w-full p-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Inspect Planogram Gallery</span>
                    </button>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] text-slate-400 space-y-1">
                      <div className="text-white font-semibold">Share of Shelf Telemetry:</div>
                      <div>• Category Dominance: 68.4% share</div>
                      <div>• Out-of-Stock SKUs: 1.2% (Resolved)</div>
                    </div>
                  </div>
                )}

                {selectedRoleId === "branches_marketing" && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                      <div className="flex justify-between font-bold text-white">
                        <span>Weekend Peak Staffing</span>
                        <span className="text-orange-400 font-mono">100% Target Met</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Promoter rotation rate: 12%</div>
                    </div>

                    <button
                      onClick={() => triggerActionNotice("Promoter Dynamic Roster Reassigned")}
                      className="w-full p-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <Store className="w-4 h-4" />
                      <span>Reallocate Promoters by Traffic</span>
                    </button>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
                      Footfall-to-conversion correlation: +14.2% lift in retail branches with active promoters.
                    </div>
                  </div>
                )}

                {selectedRoleId === "accountant" && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                      <div className="flex justify-between font-bold text-white">
                        <span>Reconciled Disciplinary Slips</span>
                        <span className="text-amber-400 font-mono">148 Verified</span>
                      </div>
                      <div className="text-[10px] text-emerald-400">Payroll Match Rate: 100%</div>
                    </div>

                    <button
                      onClick={() => triggerActionNotice("Syncing Deductions to SAP / Oracle ERP API")}
                      className="w-full p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <Receipt className="w-4 h-4" />
                      <span>Sync Ledger with ERP System</span>
                    </button>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
                      Disputed penalties are automatically placed on escrow hold until formal HR hearing.
                    </div>
                  </div>
                )}

                {selectedRoleId === "hr" && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                      <div className="flex justify-between font-bold text-white">
                        <span>Active Digital ID Badges</span>
                        <span className="text-pink-400 font-mono">4,820 Staff</span>
                      </div>
                      <div className="text-[10px] text-emerald-400">Fair Dispute Resolution: 98.5%</div>
                    </div>

                    <button
                      onClick={() => triggerActionNotice("Digital ID Encrypted QR Generated for Field Badge")}
                      className="w-full p-2.5 rounded-xl bg-pink-500 hover:bg-pink-400 text-white font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <Users2 className="w-4 h-4" />
                      <span>Issue Delegate Digital Badge</span>
                    </button>

                    <button
                      onClick={() => triggerActionNotice("Formal Dispute Adjudication File Retrieved")}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-pink-400" />
                      <span>Review Open Dispute Hearings</span>
                    </button>
                  </div>
                )}

                {/* Persona Screens Catalog */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                    Integrated Persona Views:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {selectedRole.screensEn.map((screen, idx) => (
                      <div 
                        key={idx}
                        className="p-2 rounded-lg bg-slate-900/90 border border-slate-800/80 text-[10px] font-medium text-slate-300 truncate"
                      >
                        {idx + 1}. {screen}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom In-Phone Navigation Bar */}
              <div className="px-3 py-2 bg-slate-900/95 border-t border-slate-800 flex items-center justify-around z-20 text-[9px] text-slate-400 font-medium">
                <span className="font-bold" style={{ color: selectedRole.color }}>Home</span>
                <span>Actions</span>
                <span>Audits</span>
                <span>Profile</span>
              </div>

              {/* Home indicator pill */}
              <div className="pb-1.5 pt-1 bg-slate-950 flex justify-center">
                <div className="w-28 h-1 rounded-full bg-slate-700/60" />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
