import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, 
  CheckCircle2, 
  XCircle, 
  Receipt, 
  BadgeAlert,
  Send,
  Eye,
  EyeOff,
  Sparkles
} from "lucide-react";

export function TashilPhotoAndDiscipline() {
  // Stage 6 State
  const [showWatermark, setShowWatermark] = useState<boolean>(true);
  const [approvalStatus, setApprovalStatus] = useState<"pending" | "approved" | "rejected">("pending");
  const [rejectionReason, setRejectionReason] = useState<string>("");

  // Stage 7 State
  const [appealSubmitted, setAppealSubmitted] = useState<boolean>(false);
  const [activeViolationTab, setActiveViolationTab] = useState<number>(0);

  const violations = [
    {
      typeEn: "Late Shift Arrival",
      amount: "50 SAR",
      time: "Sep 28, 2026 - 09:14 AM",
      deductionStatus: "Auto-logged by Server",
      reasonEn: "Clock-in recorded past the 15-minute grace threshold without authorized supervisor dispensation.",
      evidenceEn: "Firestore server timestamp recorded at 09:14:02 AM vs. scheduled 08:30:00 AM shift start.",
    },
    {
      typeEn: "Early Geofence Departure",
      amount: "100 SAR",
      time: "Sep 24, 2026 - 03:40 PM",
      deductionStatus: "Pending HR Review",
      reasonEn: "GPS telemetry beacon detected 850m outside store perimeter 1h 20m prior to shift conclusion.",
      evidenceEn: "Geofence boundary breach event logged with continuous out-of-bounds GPS pings.",
    },
    {
      typeEn: "Planogram Display Breach",
      amount: "75 SAR",
      time: "Sep 21, 2026 - 01:15 PM",
      deductionStatus: "Deduction Executed",
      reasonEn: "Gondola display failed to comply with trade marketing brand guidelines, leaving untagged SKUs.",
      evidenceEn: "Timestamped supervisory audit photograph attached to compliance record.",
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/80 backdrop-blur-2xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-16 text-left">
      {/* ───────────────────────────────────────────────────────────
          STAGE 6: PHOTO PERMISSION & VISUAL PROOF ENGINE
      ─────────────────────────────────────────────────────────── */}
      <div className="space-y-8 border-b border-slate-800 pb-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Photo Permissions & Automated Geotagged Watermark</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Visual Proof & In-Store Photo Permission Workflow
          </h3>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Eliminating counterfeit merchandising reports: images must be captured live through the in-app
            camera with gallery access blocked natively. Real-time GPS coordinates, server timestamps, and delegate IDs
            are permanently imprinted into pixels before encrypted streaming to Firebase Storage.
          </p>
        </div>

        {/* 4-Step Visual Workflow Lifecycle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {[
            { step: "01", title: "Live Camera Capture", desc: "Native gallery access is disabled to prevent mock images or pre-saved photos." },
            { step: "02", title: "Automated Watermarking", desc: "Cryptographic GPS coordinates, date, and delegate UUID baked directly into pixels." },
            { step: "03", title: "Encrypted Cloud Storage", desc: "Immediate secure upload to Firebase Storage with Firestore audit doc linkage." },
            { step: "04", title: "Multi-Tier Approval", desc: "Supervisors and trade marketing managers review and sign off in real-time." },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-sky-400">STAGE {item.step}</span>
              <div className="font-bold text-white text-sm">{item.title}</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive Photo Inspector Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
          {/* Photo Viewport with Watermark Overlay */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 aspect-[16/10] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=80"
                alt="Store Display Shelf Verification"
                className="w-full h-full object-cover"
              />

              {/* Dynamic Watermark Stamp Overlay */}
              <AnimatePresence>
                {showWatermark && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/20 text-xs font-mono text-emerald-300 shadow-xl space-y-1 text-left"
                  >
                    <div className="flex items-center justify-between text-white font-bold">
                      <span className="flex items-center gap-1.5 text-sky-400">
                        <Sparkles className="w-3.5 h-3.5" />
                        TASHIL SMART GEOTAG v2.4
                      </span>
                      <span className="text-emerald-400">GPS ACCURACY ± 2.1m</span>
                    </div>
                    <div className="text-slate-200">
                      Coordinates: 24.7136° N, 46.6753° E · Al Nakheel Mall, Riyadh
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>Delegate: Ahmed Mansour (ID: DEL-9041)</span>
                      <span>Server: 2026-09-28 09:41:20 GMT+3</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Toggle Watermark Floating Button */}
              <button
                onClick={() => setShowWatermark(!showWatermark)}
                className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-semibold text-white hover:bg-slate-900 transition-colors shadow-lg"
              >
                {showWatermark ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5 text-sky-400" />}
                <span>{showWatermark ? "Hide Watermark" : "Show Watermark"}</span>
              </button>
            </div>
          </div>

          {/* Supervisor Decision Simulator */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Supervisor Decision Dispatcher:</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase font-mono ${
                  approvalStatus === "approved" ? "bg-emerald-500/20 text-emerald-400" :
                  approvalStatus === "rejected" ? "bg-rose-500/20 text-rose-400" : "bg-amber-500/20 text-amber-400"
                }`}>
                  {approvalStatus === "approved" ? "Approved" :
                   approvalStatus === "rejected" ? "Rejected" : "Pending Review"}
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed">
                Supervisors cross-reference shelf stock with brand planograms and dispatch an instant
                push notification to the delegate's smartphone upon sign-off.
              </p>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setApprovalStatus("approved");
                    setRejectionReason("");
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Permit</span>
                </button>
                <button
                  onClick={() => {
                    setApprovalStatus("rejected");
                    setRejectionReason("Gaps detected between SKUs; price tags missing on lower shelf.");
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject with Feedback</span>
                </button>
              </div>

              {approvalStatus === "rejected" && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-200 space-y-1">
                  <span className="font-bold block">Feedback Delivered to Delegate:</span>
                  <p className="text-[11px] text-rose-300">{rejectionReason}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          STAGE 7: PENALTIES, VIOLATIONS & DISPUTE WORKFLOW
      ─────────────────────────────────────────────────────────── */}
      <div className="space-y-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-3">
            <BadgeAlert className="w-3.5 h-3.5" />
            <span>Automated Field Violations, Audit & Digital Dispute Engine</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Field Disciplinary Engine & Digital Dispute Adjudication
          </h3>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Maintaining discipline across distributed retail locations: infractions are automatically
            logged with server-backed telemetry. If an infraction is issued, delegates can submit a formal
            digital dispute through the app, placing deductions on hold pending HR and payroll review.
          </p>
        </div>

        {/* Interactive Violation Selector & Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Violation List Tab */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Automated Disciplinary Infractions:
            </span>
            {violations.map((v, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setActiveViolationTab(idx);
                  setAppealSubmitted(false);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeViolationTab === idx
                    ? "bg-slate-900 border-rose-500/60 shadow-lg shadow-rose-500/10"
                    : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white">{v.typeEn}</span>
                  <span className="font-mono text-sm font-bold text-rose-400">-{v.amount}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">{v.time}</div>
                <div className="text-[10px] text-emerald-400 mt-1 font-mono">{v.deductionStatus}</div>
              </div>
            ))}
          </div>

          {/* Right: Simulated Penalty Slip & Dispute Appeal Action */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-rose-400" />
                  <span className="font-bold text-white text-sm">Disciplinary Voucher #FIN-8821</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono font-semibold">
                  Auto-Deducted
                </span>
              </div>

              {/* Penalty Details */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px] block">Offending Delegate:</span>
                  <span className="font-bold text-white">Ahmed Mansour (DEL-9041)</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Deduction Amount:</span>
                  <span className="font-mono text-lg font-bold text-rose-400">
                    -{violations[activeViolationTab].amount}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Infraction Timestamp:</span>
                  <span className="text-slate-300 font-mono">{violations[activeViolationTab].time}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Supervisor E-Signature:</span>
                  <span className="text-emerald-400 font-mono font-semibold">e-Signed (Khalid Al-Rashid)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                <span className="font-bold text-slate-300">Telemetry Proof & Audit Evidence:</span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  {violations[activeViolationTab].reasonEn}
                </p>
                <div className="text-[10px] text-sky-400 font-mono pt-1">
                  Evidence Log: {violations[activeViolationTab].evidenceEn}
                </div>
              </div>

              {/* Dispute & Appeal Action */}
              <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  {appealSubmitted
                    ? "Deduction frozen pending HR & Finance review."
                    : "Delegates retain the right to dispute infractions within 48 hours."}
                </div>

                <button
                  onClick={() => setAppealSubmitted(!appealSubmitted)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    appealSubmitted
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md shadow-sky-500/20"
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {appealSubmitted ? "Dispute Under HR Hearing" : "Submit Formal Digital Dispute"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
