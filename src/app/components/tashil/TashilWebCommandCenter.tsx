import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WEB_ATTENDANCE_DATA } from "./tashilData";
import { 
  Monitor, 
  ExternalLink, 
  Search, 
  Download, 
  Building2, 
  TrendingUp, 
  FileSpreadsheet, 
  Lock, 
  GitBranch
} from "lucide-react";

type WebTab = "table" | "hierarchy" | "analytics";

export function TashilWebCommandCenter() {
  const [activeWebTab, setActiveWebTab] = useState<WebTab>("table");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const filteredData = WEB_ATTENDANCE_DATA.filter((row) => 
    row.delegateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = (format: string) => {
    setExportNotice(`${format} report generated and downloaded successfully!`);
    setTimeout(() => {
      setExportNotice(null);
    }, 2500);
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/80 backdrop-blur-2xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-8 text-left">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
            <Monitor className="w-3.5 h-3.5" />
            <span>Enterprise Web Command Center & Multi-Tenancy</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Enterprise Web Command Center & Multi-Tenant Portal
          </h3>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Centralized supervisory console accessible at <strong>tashil.sw-point.com</strong>.
            Provides live attendance tracking across regional branch networks, tenant isolation
            hierarchies, and direct payroll export pipelines.
          </p>
        </div>

        {/* Live URL Link Button */}
        <a
          href="https://tashil.sw-point.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-sky-500/20 hover:scale-[1.02] transition-transform whitespace-nowrap"
        >
          <span>Launch Web Console: tashil.sw-point.com</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Desktop / MacBook Browser Mockup Frame */}
      <div className="rounded-3xl border-2 border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Browser Top Window Bar */}
        <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>

          {/* Browser Address Bar with SSL Lock */}
          <div className="flex-1 max-w-xl mx-auto flex items-center gap-2 px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 shadow-inner">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-500">https://</span>
            <span className="text-white font-semibold">tashil.sw-point.com</span>
            <span className="text-slate-500">/admin/live-command</span>
          </div>

          <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Firebase Stream: LIVE</span>
          </div>
        </div>

        {/* Inner Web Dashboard Navigation */}
        <div className="px-6 py-3 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {[
              { id: "table", label: "Live Attendance Table", icon: FileSpreadsheet },
              { id: "hierarchy", label: "Multi-Tenant Hierarchy", icon: GitBranch },
              { id: "analytics", label: "Executive Analytics", icon: TrendingUp },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeWebTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveWebTab(tab.id as WebTab)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Export Toast Notice */}
          {exportNotice && (
            <div className="text-xs font-semibold text-emerald-400 animate-bounce font-mono">
              {exportNotice}
            </div>
          )}
        </div>

        {/* Dashboard Content Container */}
        <div className="p-6 bg-slate-950 min-h-[380px]">
          <AnimatePresence mode="wait">
            {/* 1. LIVE ATTENDANCE TABLE TAB */}
            {activeWebTab === "table" && (
              <motion.div
                key="table"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {/* Search & Export Action Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filter by name, store branch, or corporate tenant..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleExport("Excel (.xlsx)")}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Export Excel</span>
                    </button>
                    <button
                      onClick={() => handleExport("PDF")}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-sky-400" />
                      <span>Export PDF</span>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900 text-slate-400 font-semibold">
                        <th className="p-3.5">Delegate</th>
                        <th className="p-3.5">Operating Tenant</th>
                        <th className="p-3.5">Branch</th>
                        <th className="p-3.5">Clock-In Time</th>
                        <th className="p-3.5">Shift Duration</th>
                        <th className="p-3.5">Geofence Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {filteredData.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-3.5 font-bold text-white">
                            <div>{row.delegateName}</div>
                            <span className="text-[10px] text-slate-400 font-mono">{row.phone}</span>
                          </td>
                          <td className="p-3.5 text-slate-300">{row.company}</td>
                          <td className="p-3.5 text-slate-300">{row.branch}</td>
                          <td className="p-3.5 font-mono text-sky-400">{row.checkInTime}</td>
                          <td className="p-3.5 font-mono text-slate-300">{row.duration}</td>
                          <td className="p-3.5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                              row.status === "verified" ? "bg-emerald-500/20 text-emerald-400" :
                              row.status === "late" ? "bg-amber-500/20 text-amber-400" : "bg-rose-500/20 text-rose-400"
                            }`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />
                              {row.geoStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* 2. MULTI-TENANT HIERARCHY TAB */}
            {activeWebTab === "hierarchy" && (
              <motion.div
                key="hierarchy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="max-w-2xl text-xs text-slate-300">
                  The architecture provides a multi-tenant hierarchy allowing corporate holding groups
                  to provision autonomous subsidiaries, assign branch clusters, and maintain strict data isolation
                  via Firestore security rules.
                </div>

                {/* Tree Diagram */}
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
                  {/* Root Holding Node */}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-950 border border-indigo-500/50 shadow-lg max-w-md">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Master Enterprise Group (Holding Tenant)</div>
                      <div className="text-[11px] text-indigo-300 font-mono">Scope: Global Multi-Tenant Hub · 4,820 Staff</div>
                    </div>
                  </div>

                  {/* Connecting branches */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-6 border-l-2 border-slate-800">
                    {[
                      { name: "United Foods Group", subs: "48 Branches · 620 Delegates", color: "#38BDF8" },
                      { name: "Global Beverages Corp", subs: "32 Branches · 410 Delegates", color: "#22C55E" },
                      { name: "Gulf Distribution Logistics", subs: "62 Branches · 850 Delegates", color: "#F59E0B" },
                    ].map((company, i) => (
                      <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: company.color }} />
                          <span className="font-bold text-white text-xs">{company.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-400">{company.subs}</p>
                        <div className="text-[10px] text-emerald-400 font-mono">Isolated Firestore Collection</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. EXECUTIVE ANALYTICS TAB */}
            {activeWebTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-xs">Today's Real-time Presence Rate</span>
                    <div className="text-2xl font-black text-emerald-400 font-mono">97.8%</div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                      <div className="bg-emerald-400 h-full rounded-full w-[97.8%]" />
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-xs">Total Logged Shift Hours</span>
                    <div className="text-2xl font-black text-sky-400 font-mono">11,480 hrs</div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                      <div className="bg-sky-400 h-full rounded-full w-[88%]" />
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-xs">Verified Shelf Audits</span>
                    <div className="text-2xl font-black text-indigo-300 font-mono">1,842 audits</div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                      <div className="bg-indigo-400 h-full rounded-full w-[94%]" />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <div className="font-bold text-white">Workforce Telemetry Intelligence:</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Dashboards stream reactive aggregation updates directly from Cloud Firestore indexes,
                    avoiding ETL pipelines or reporting delays, and granting executives real-time operational decision power.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
