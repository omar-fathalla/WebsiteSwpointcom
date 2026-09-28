import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RADAR_DELEGATES, RadarDelegate } from "./tashilData";
import { 
  Radio, 
  Activity
} from "lucide-react";

export function TashilFieldRadar() {
  const [selectedDelegate, setSelectedDelegate] = useState<RadarDelegate | null>(RADAR_DELEGATES[0]);
  const [activeCityFilter, setActiveCityFilter] = useState<string>("all");
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [pingCount, setPingCount] = useState<number>(142);

  const filteredDelegates = activeCityFilter === "all" 
    ? RADAR_DELEGATES 
    : RADAR_DELEGATES.filter((d) => d.city === activeCityFilter);

  const handleSimulatePing = () => {
    setIsPinging(true);
    setPingCount((prev) => prev + 1);
    setTimeout(() => {
      setIsPinging(false);
    }, 2200);
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/80 backdrop-blur-2xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-8 text-left">
      {/* Header and Telemetry Stats Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse text-sky-400" />
            <span>Real-Time Live Field Radar & Interactive Map</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Real-Time Field Fleet Radar & Regional Map
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Live supervisory interface tracking frontline promoters across retail hubs in Saudi Arabia,
            Egypt, and the UAE with high-precision GPS telemetry and dynamic presence beacons.
          </p>
        </div>

        {/* Simulate Live Ping Button */}
        <button
          onClick={handleSimulatePing}
          disabled={isPinging}
          className="relative inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-sky-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 whitespace-nowrap"
        >
          {isPinging ? (
            <Activity className="w-4 h-4 animate-spin text-white" />
          ) : (
            <Radio className="w-4 h-4 animate-pulse text-white" />
          )}
          <span>{isPinging ? "Broadcasting Radar Ping..." : "Simulate Live Telemetry Ping"}</span>
        </button>
      </div>

      {/* Live Telemetry KPI Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
          <div className="text-[11px] text-slate-400">Total Field Fleet</div>
          <div className="text-xl font-black text-white mt-0.5">1,420+</div>
          <div className="text-[10px] text-sky-400 font-mono">Managed Personnel</div>
        </div>
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
          <div className="text-[11px] text-slate-400">Active On-Duty</div>
          <div className="text-xl font-black text-emerald-400 mt-0.5">1,184 Staff</div>
          <div className="text-[10px] text-emerald-500 font-mono">Currently Present</div>
        </div>
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
          <div className="text-[11px] text-slate-400">Geofence Compliance</div>
          <div className="text-xl font-black text-indigo-300 mt-0.5">99.4%</div>
          <div className="text-[10px] text-indigo-400 font-mono">Verified Boundary</div>
        </div>
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
          <div className="text-[11px] text-slate-400">Daily Telemetry Pings</div>
          <div className="text-xl font-black text-amber-400 mt-0.5">{pingCount}K pings</div>
          <div className="text-[10px] text-amber-500 font-mono">10s Sync Interval</div>
        </div>
      </div>

      {/* City Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: "all", label: "All Regional Hubs" },
          { id: "riyadh", label: "Riyadh (KSA)" },
          { id: "jeddah", label: "Jeddah (Red Sea)" },
          { id: "cairo", label: "Cairo (Egypt)" },
          { id: "dubai", label: "Dubai (UAE)" },
        ].map((city) => (
          <button
            key={city.id}
            onClick={() => setActiveCityFilter(city.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeCityFilter === city.id
                ? "bg-sky-500/20 text-sky-300 border border-sky-400/40"
                : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white"
            }`}
          >
            {city.label}
          </button>
        ))}
      </div>

      {/* Map & Radar Grid Viewport */}
      <div className="relative w-full h-[450px] sm:h-[500px] rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-inner flex items-center justify-center">
        {/* Background Dark Themed Vector Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 60%),
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "100% 100%, 40px 40px, 40px 40px"
          }}
        />

        {/* Regional Contours Graphic */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none" stroke="currentColor">
            <path 
              d="M150 150 Q 250 200 300 320 T 450 400 T 700 420 T 850 350" 
              stroke="#38BDF8" 
              strokeWidth="1.5" 
              strokeDasharray="4 6" 
            />
            <circle cx="240" cy="220" r="140" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.4" />
            <circle cx="600" cy="300" r="180" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.4" />
            <circle cx="820" cy="320" r="110" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.4" />
          </svg>
        </div>

        {/* Animated Radar Sweep Wave when Pinging */}
        {isPinging && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3.5, opacity: 0 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            className="absolute w-64 h-64 rounded-full border-2 border-sky-400 bg-sky-500/10 pointer-events-none z-10"
          />
        )}

        {/* City Label Anchors */}
        <div className="absolute top-[28%] left-[22%] text-[11px] font-bold text-slate-500 font-mono tracking-wider pointer-events-none">
          CAIRO / EGYPT HUB
        </div>
        <div className="absolute top-[38%] left-[58%] text-[11px] font-bold text-slate-500 font-mono tracking-wider pointer-events-none">
          RIYADH / KSA HUB
        </div>
        <div className="absolute top-[52%] left-[45%] text-[11px] font-bold text-slate-500 font-mono tracking-wider pointer-events-none">
          JEDDAH / RED SEA
        </div>
        <div className="absolute top-[42%] left-[78%] text-[11px] font-bold text-slate-500 font-mono tracking-wider pointer-events-none">
          DUBAI / UAE HUB
        </div>

        {/* Pulsing Delegate Beacons */}
        {filteredDelegates.map((delegate) => {
          const statusColor = 
            delegate.status === "present" ? "#22C55E" :
            delegate.status === "late" ? "#F59E0B" : "#64748B";

          return (
            <div
              key={delegate.id}
              onClick={() => setSelectedDelegate(delegate)}
              onMouseEnter={() => setSelectedDelegate(delegate)}
              className="absolute z-20 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
              style={{
                left: `${delegate.xPercent}%`,
                top: `${delegate.yPercent}%`,
              }}
            >
              {/* Pulsing outer aura ring */}
              <div 
                className="w-10 h-10 -m-2 rounded-full absolute inset-0 animate-ping opacity-30 pointer-events-none"
                style={{ backgroundColor: statusColor }}
              />

              {/* Central Beacon Pin */}
              <div 
                className="relative w-7 h-7 rounded-full border-2 flex items-center justify-center shadow-xl transition-transform group-hover:scale-125"
                style={{
                  backgroundColor: statusColor,
                  borderColor: "#FFFFFF",
                }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950" />
              </div>

              {/* Delegate name tag label */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700 text-[10px] text-white font-medium whitespace-nowrap shadow-lg group-hover:border-sky-400 transition-colors">
                {delegate.nameEn.split(" ")[0]}
              </div>
            </div>
          );
        })}

        {/* Floating Interactive Popover Detail Card */}
        <AnimatePresence>
          {selectedDelegate && (
            <motion.div
              key={selectedDelegate.id}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-5 right-5 left-5 sm:left-auto sm:w-80 p-4 rounded-2xl bg-slate-900/95 border border-sky-400/40 backdrop-blur-xl shadow-2xl z-30 space-y-3 text-left"
            >
              <div className="flex items-center gap-3">
                <img
                  src={selectedDelegate.avatar}
                  alt={selectedDelegate.nameEn}
                  className="w-11 h-11 rounded-xl object-cover border border-sky-400/50 shadow-md"
                />
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{selectedDelegate.nameEn}</span>
                    <span 
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: 
                          selectedDelegate.status === "present" ? "#22C55E" :
                          selectedDelegate.status === "late" ? "#F59E0B" : "#64748B"
                      }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    ID: {selectedDelegate.id.toUpperCase()} · {selectedDelegate.cityLabelEn}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Assigned Branch:</span>
                  <span className="font-semibold text-white truncate max-w-[170px]">{selectedDelegate.branchEn}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Attendance State:</span>
                  <span className={`font-semibold ${
                    selectedDelegate.status === "present" ? "text-emerald-400" :
                    selectedDelegate.status === "late" ? "text-amber-400" : "text-slate-400"
                  }`}>
                    {selectedDelegate.statusLabelEn}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">GPS Signal Accuracy:</span>
                  <span className="font-mono text-sky-400 font-semibold">{selectedDelegate.accuracy}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Last Telemetry Ping:</span>
                  <span className="font-mono text-slate-400">{selectedDelegate.lastPing}</span>
                </div>
              </div>

              <div className="pt-1 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>Firestore Realtime Stream</span>
                <span className="text-emerald-400 font-mono">Signal Verified</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
