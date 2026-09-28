import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, QrCode, Smartphone, Globe, Cpu, Sparkles, Database, Users } from "lucide-react";

interface TashilHeroProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function TashilHero({ activeTab, setActiveTab }: TashilHeroProps) {
  const tabs = [
    { id: "roles", label: "9-Role Simulator", icon: Users },
    { id: "mobile", label: "Interactive Mobile App", icon: Smartphone },
    { id: "geofence", label: "Geofence & Field Radar", icon: ShieldCheck },
    { id: "photos", label: "Permits & Violations", icon: QrCode },
    { id: "web_arch", label: "Command Center & Architecture", icon: Globe },
  ];

  const stats = [
    { 
      value: "9", 
      label: "Specialized Roles", 
      sublabel: "Full enterprise RBAC coverage",
      icon: Users, 
      color: "#38BDF8" 
    },
    { 
      value: "100%", 
      label: "Anti-Fraud Precision", 
      sublabel: "Geofencing & server-authoritative clock",
      icon: ShieldCheck, 
      color: "#22C55E" 
    },
    { 
      value: "0ms", 
      label: "Offline-First Response", 
      sublabel: "Stale-while-revalidate local cache",
      icon: Cpu, 
      color: "#A78BFA" 
    },
    { 
      value: "Realtime", 
      label: "Cloud Firestore Sync", 
      sublabel: "Live sub-second field telemetry",
      icon: Database, 
      color: "#F59E0B" 
    },
  ];

  return (
    <div className="relative overflow-hidden mb-16">
      {/* Background ambient radial glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[360px] pointer-events-none opacity-25 blur-3xl -z-10"
        style={{
          background: "radial-gradient(ellipse at center, #38BDF8 0%, #6366F1 45%, transparent 70%)"
        }}
      />

      {/* Flagship Product Badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center mb-6"
      >
        <div 
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-sky-400/30 text-xs font-semibold tracking-wide"
          style={{
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.12), rgba(99, 102, 241, 0.08))",
            color: "#38BDF8",
            boxShadow: "0 0 24px rgba(56, 189, 248, 0.15)"
          }}
        >
          <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
          <span className="uppercase tracking-widest font-mono text-[11px]">Flagship Enterprise Platform</span>
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <span className="text-slate-300 font-medium">Tashil Field Ecosystem</span>
        </div>
      </motion.div>

      {/* Main Title & Executive Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center max-w-4xl mx-auto mb-12"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Tashil Enterprise Platform
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-teal-300">
            Next-Gen Field Operations & Attendance Ecosystem
          </span>
        </h2>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
          A mission-critical enterprise platform bridging a high-performance Flutter mobile application
          and an Angular web command center. Engineered for 9 distinct organizational roles with hardware-bound
          anti-fraud geofencing, dynamic rotating QR validation, and real-time live field radar tracking.
        </p>
      </motion.div>

      {/* Top Telemetry Stats Ribbon */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12"
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="relative p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md overflow-hidden group hover:border-sky-500/40 transition-all duration-300"
            >
              <div 
                className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full blur-xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: stat.color }}
              />
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {stat.value}
                </span>
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}18`, color: stat.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-sm font-semibold text-slate-200">{stat.label}</div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">{stat.sublabel}</div>
            </div>
          );
        })}
      </motion.div>

      {/* Modern Stage Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center justify-center"
      >
        <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTashilTabPill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 shadow-md shadow-sky-500/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span className="font-semibold">{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
