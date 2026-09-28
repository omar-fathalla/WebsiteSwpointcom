import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SECURITY_LAYERS } from "./tashilData";
import { 
  ShieldCheck, 
  ShieldAlert, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  QrCode, 
  Fingerprint, 
  Layers,
  ArrowRightLeft,
  AlertTriangle
} from "lucide-react";

const LAYER_ICONS: Record<string, React.ElementType> = {
  Clock,
  ShieldAlert,
  QrCode,
  Fingerprint,
};

export function TashilAntiFraudSection() {
  const [simulationMode, setSimulationMode] = useState<"inside" | "outside">("inside");
  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);

  const isInside = simulationMode === "inside";

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/80 backdrop-blur-2xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-12">
      {/* Section Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Anti-Fraud Geofencing & GPS Check-In Engine</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
          Anti-Fraud Geofencing & Real-Time Integrity Shield
        </h3>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
          Engineered to eradicate frontline operational fraud across multi-branch retail networks:
          GPS mock location spoofing, buddy punching, and local clock tampering. Four cryptographic verification
          layers enforce absolute location accuracy and tamper-proof attendance records.
        </p>
      </div>

      {/* Interactive Geofence Radius Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-800">
        {/* Left: Vector Radar Geofence Graphic */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
            {/* Concentric radar rings */}
            <div className="absolute inset-0 rounded-full border border-slate-800/80" />
            <div className="absolute inset-8 rounded-full border border-slate-800/80" />
            <div className="absolute inset-16 rounded-full border border-slate-800/80" />

            {/* Geofence Boundary (50m branch zone) */}
            <motion.div
              animate={{
                scale: [1, 1.04, 1],
                borderColor: isInside ? "rgba(34, 197, 94, 0.8)" : "rgba(244, 63, 94, 0.8)",
                boxShadow: isInside 
                  ? "0 0 35px rgba(34, 197, 94, 0.25)" 
                  : "0 0 35px rgba(244, 63, 94, 0.25)"
              }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
              className="absolute inset-12 rounded-full border-2 border-dashed flex items-center justify-center bg-slate-950/60 backdrop-blur-sm"
            >
              {/* Branch Center Marker */}
              <div className="flex flex-col items-center z-10">
                <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400 flex items-center justify-center text-sky-300 shadow-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-white mt-1 bg-black/60 px-2 py-0.5 rounded-full border border-white/10 font-mono">
                  Al Nakheel Mall
                </span>
                <span className="text-[9px] text-slate-400 font-mono">Geofence Radius: 50m</span>
              </div>
            </motion.div>

            {/* Delegate Position Pin */}
            <motion.div
              animate={{
                x: isInside ? 24 : 110,
                y: isInside ? -24 : 85,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="absolute z-20 flex flex-col items-center"
            >
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center shadow-2xl border-2 transition-colors"
                style={{
                  backgroundColor: isInside ? "#22C55E" : "#F43F5E",
                  borderColor: "#FFFFFF",
                }}
              >
                {isInside ? (
                  <CheckCircle2 className="w-5 h-5 text-slate-950 font-bold" />
                ) : (
                  <XCircle className="w-5 h-5 text-white font-bold" />
                )}
              </div>
              <div className="text-[10px] font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded-md border border-slate-700 mt-1 whitespace-nowrap shadow-lg font-mono">
                {isInside ? "Ahmed Mansour (18.4m Inside)" : "Unauthorized Attempt (4.2km Remote)"}
              </div>
            </motion.div>
          </div>

          {/* Interactive Simulation Switcher */}
          <div className="flex items-center gap-3 mt-4 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setSimulationMode("inside")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isInside
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Inside Geofence (Allowed)
            </button>
            <button
              onClick={() => setSimulationMode("outside")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                !isInside
                  ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Outside Perimeter / Mock GPS (Blocked)
            </button>
          </div>
        </div>

        {/* Right: Realtime Diagnostic Telemetry */}
        <div className="lg:col-span-6 space-y-4">
          <div 
            className="p-5 rounded-2xl border transition-colors space-y-3"
            style={{
              backgroundColor: isInside ? "rgba(34, 197, 94, 0.08)" : "rgba(244, 63, 94, 0.08)",
              borderColor: isInside ? "rgba(34, 197, 94, 0.3)" : "rgba(244, 63, 94, 0.3)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                TELEMETRY DIAGNOSTIC STATUS
              </span>
              <span 
                className="text-xs px-2.5 py-0.5 rounded-full font-bold font-mono"
                style={{
                  backgroundColor: isInside ? "#22C55E25" : "#F43F5E25",
                  color: isInside ? "#22C55E" : "#F43F5E",
                }}
              >
                {isInside ? "VERIFIED & ALLOWED" : "REJECTED & FLAGGED"}
              </span>
            </div>

            <div className="text-xl font-bold text-white">
              {isInside ? (
                <span className="text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  Verified: Delegate physically present within store geofence
                </span>
              ) : (
                <span className="text-rose-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  Security Alert: Distance exceeds geofence radius by 4,160m
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {isInside
                ? "Haversine algorithm computes exact distance between GPS coordinates and branch centroid (18.4m, signal accuracy ± 2.8m). Authoritative server timestamp synchronized with Google Cloud."
                : "The system intercepted an out-of-boundary check-in attempt. Mutation is immediately blocked, writing an audit flag to Firestore security logs and alerting the field supervisor."}
            </p>
          </div>

          {/* Diagnostic Metrics Matrix */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Computed Distance:</span>
              <span className={`font-mono text-sm font-bold ${isInside ? "text-emerald-400" : "text-rose-400"}`}>
                {isInside ? "18.4 Meters" : "4,210.8 Meters"}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Fake GPS Providers:</span>
              <span className="font-mono text-sm font-bold text-emerald-400">
                0 Detected (Clean)
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Server Authoritative Time:</span>
              <span className="font-mono text-sm font-bold text-sky-400">
                Firestore Cloud Synced
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Hardware Device Binding:</span>
              <span className="font-mono text-sm font-bold text-indigo-300">
                UUID Matched (iPhone 15 Pro)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* The 4 Security Layers */}
      <div className="space-y-4">
        <div className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Layers className="w-4 h-4 text-sky-400" />
          <span>The 4 Security Verification Layers:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SECURITY_LAYERS.map((layer, index) => {
            const Icon = LAYER_ICONS[layer.icon] || ShieldCheck;
            const isActive = activeLayerIndex === index;

            return (
              <div
                key={layer.number}
                onClick={() => setActiveLayerIndex(index)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                  isActive
                    ? "bg-slate-900 border-sky-400/80 shadow-lg shadow-sky-500/10"
                    : "bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-sky-400 transition-colors">
                    {layer.number}
                  </span>
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${layer.color}18`, color: layer.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h4 className="text-sm font-bold text-white mb-1">{layer.titleEn}</h4>
                <div className="text-[10px] font-mono text-slate-400 mb-2">{layer.subtitleEn}</div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {layer.descriptionEn}
                </p>

                <div 
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block font-mono"
                  style={{ backgroundColor: `${layer.color}20`, color: layer.color }}
                >
                  {layer.badge}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison: Traditional vs Tashil */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800">
        <div className="text-center max-w-xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Operational Efficiency Comparison</span>
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-white">
            Legacy Manual Check-In vs. Tashil Smart Engine
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Traditional Way */}
          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Legacy Manual Verification</span>
              <span className="text-xs text-rose-300 font-mono">3+ minutes per delegate</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-center gap-2 text-rose-200">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                Paper rosters and WhatsApp chats prone to photo sharing and forgery.
              </li>
              <li className="flex items-center gap-2 text-rose-200">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                Zero live supervisor visibility; reports delivered days after the shift.
              </li>
              <li className="flex items-center gap-2 text-rose-200">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                Buddy punching and credential sharing without hardware accountability.
              </li>
            </ul>
          </div>

          {/* Tashil Way */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Tashil Smart Attendance Engine</span>
              <span className="text-xs text-emerald-300 font-mono">&lt; 3 seconds per check-in</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-center gap-2 text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Dynamic cryptographic QR rotating every 30 seconds with screenshot blocking.
              </li>
              <li className="flex items-center gap-2 text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Zero-latency real-time sync streaming check-ins straight to supervisor screens.
              </li>
              <li className="flex items-center gap-2 text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Hardware device UUID binding and biometric auth prevent ghost delegates.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
