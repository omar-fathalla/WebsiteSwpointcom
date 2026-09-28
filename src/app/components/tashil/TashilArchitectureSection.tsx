import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Cpu, 
  Layers, 
  Bell, 
  Boxes, 
  CheckCircle2
} from "lucide-react";

export function TashilArchitectureSection() {
  const [selectedLayer, setSelectedLayer] = useState<number>(0);

  const architectureLayers = [
    {
      id: "presentation",
      name: "Presentation Layer (BLoC + GoRouter)",
      tech: "Flutter 3.x · flutter_bloc ^9.1 · go_router ^17.1 · Material 3",
      color: "#38BDF8",
      summary: "Decoupled UI presentation where state is managed by BLoC Cubits. Type-safe deep linking powered by GoRouter with role-based route guards and zero unnecessary widget rebuilds.",
      details: [
        "State Management: Cubits emit typed, immutable states using Equatable for granular rebuild controls.",
        "Routing: GoRouter type-safe deep-linking with dynamic authentication and role-based redirect guards.",
        "Design System: Material 3 adaptive tokens supporting dynamic light and dark ambient themes.",
        "M3 Curves: Fluid micro-interactions styled with cubic-bezier(0.05, 0.7, 0.1, 1.0) easing.",
      ],
    },
    {
      id: "domain",
      name: "Domain Layer (Pure Dart Use Cases)",
      tech: "Pure Dart · dartz ^0.10 (Either<Failure, T>) · Freezed Value Objects",
      color: "#A78BFA",
      summary: "The framework-agnostic business logic core. Pure Dart use cases handle domain rules with functional Either<Failure, Success> returns, ensuring zero uncaught runtime crashes.",
      details: [
        "Functional Error Handling: All operations return Either<Failure, T>, making error handling typed and exhaustive.",
        "Single-Responsibility Use Cases: Each business rule is an isolated class testable with 100% unit coverage.",
        "Immutable Value Objects: Freezed entities enforce immutability and structural equality.",
        "Dependency Injection: GetIt + Injectable provide clean inversion of control for test doubles.",
      ],
    },
    {
      id: "data",
      name: "Data Layer (0ms Stale-While-Revalidate)",
      tech: "Stale-While-Revalidate · Firestore Offline Cache · Freezed DTOs",
      color: "#22C55E",
      summary: "True offline-first design: the app launches in 0ms using local encrypted cache, then performs silent background synchronization with Google Cloud Firestore without blocking the user.",
      details: [
        "Stale-While-Revalidate: Instant screen population from local storage with silent background cache updates.",
        "Offline Mutation Queue: Check-ins, photo permits, and pings are persisted locally and flushed upon reconnection.",
        "Data Transformation: JsonSerializable DTOs map Firestore documents to domain entities seamlessly.",
        "Network Telemetry: connectivity_plus monitors signal state with unobtrusive non-blocking notifications.",
      ],
    },
    {
      id: "cloud",
      name: "Cloud Infrastructure (Firebase Suite)",
      tech: "Firebase Firestore · Cloud Storage · Node.js 20 Cloud Functions · FCM",
      color: "#F59E0B",
      summary: "A distributed serverless cloud backend backed by 95KB of custom composite Firestore indexes and a hardened 16KB security ruleset enforcing field-level and role-based access control.",
      details: [
        "Composite Firestore Indexes: 95KB of hand-tuned indexes power real-time geo-queries and aggregation.",
        "Strict Security Rules: Enforce least-privilege tenant and role isolation before permitting any read or write.",
        "Serverless Functions: Automated distance verification, promoter auto-allocation, and payroll slip calculation.",
        "App Check Attestation: Cryptographically validates client device integrity to block malicious API access.",
      ],
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/80 backdrop-blur-2xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-12 text-left">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>Clean Architecture, Offline-First & Realtime Telemetry</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
          System Architecture, 0ms Cache & Unified Notifications
        </h3>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
          Tashil is architected according to strict Clean Architecture standards, providing a high-reliability
          enterprise platform capable of handling thousands of simultaneous frontline delegates with zero operational friction.
        </p>
      </div>

      {/* Interactive 4-Layer Clean Architecture Diagram */}
      <div className="space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Layers className="w-4 h-4 text-sky-400" />
          <span>Interactive 4-Layer Clean Architecture Blueprint:</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Layer Selector Stack */}
          <div className="lg:col-span-5 space-y-3">
            {architectureLayers.map((layer, index) => {
              const isSelected = selectedLayer === index;
              return (
                <div
                  key={layer.id}
                  onClick={() => setSelectedLayer(index)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? "bg-slate-900 border-sky-400/80 shadow-lg shadow-sky-500/10"
                      : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-white text-xs">{layer.name}</span>
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: layer.color }} 
                    />
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 truncate">{layer.tech}</div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Layer Deep Dive */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLayer}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-8 h-8 rounded-xl flex items-center justify-center font-bold"
                      style={{ 
                        backgroundColor: `${architectureLayers[selectedLayer].color}20`,
                        color: architectureLayers[selectedLayer].color,
                        border: `1px solid ${architectureLayers[selectedLayer].color}40`
                      }}
                    >
                      <Boxes className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {architectureLayers[selectedLayer].name}
                      </h4>
                      <span className="text-[10px] font-mono text-sky-400">
                        {architectureLayers[selectedLayer].tech}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  {architectureLayers[selectedLayer].summary}
                </p>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300 block">Engineering Specifications:</span>
                  <div className="space-y-2">
                    {architectureLayers[selectedLayer].details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Universal Multi-Identifier Notification Engine Matrix */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Universal Multi-Identifier Notification Engine
              </h4>
              <p className="text-xs text-slate-400">
                Precision routing targeting roles, operating tenants, and individual UIDs with per-user soft delete
              </p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-semibold self-start sm:self-auto">
            Zero-Leak Architecture
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-sky-400 block font-mono">01. Target by Role</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Broadcast critical operational bulletins to all Field Supervisors or Delegates simultaneously without individual subscriber tracking.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400 block font-mono">02. Target by Organization</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Dispatch corporate policy updates isolated exclusively to a specific subsidiary tenant or regional branch cluster.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-indigo-300 block font-mono">03. Target by User UID</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Deliver individual disciplinary infraction receipts and photo permit approvals with per-user soft delete support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
