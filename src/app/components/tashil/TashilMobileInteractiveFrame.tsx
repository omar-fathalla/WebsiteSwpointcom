import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  QrCode, 
  MapPin, 
  Clock, 
  Calendar, 
  User, 
  ShieldCheck, 
  Camera, 
  CheckCircle2, 
  Languages, 
  ChevronRight, 
  Phone,
  Sparkles
} from "lucide-react";

type MobileScreen = "login" | "dashboard" | "qr_scanner" | "photo_permit" | "attendance_log" | "profile";

export function TashilMobileInteractiveFrame() {
  const [currentScreen, setCurrentScreen] = useState<MobileScreen>("dashboard");
  const [isArabic, setIsArabic] = useState<boolean>(false); // English default
  const [scanState, setScanState] = useState<"idle" | "scanning" | "success">("idle");
  const [watermarkEnabled, setWatermarkEnabled] = useState<boolean>(true);

  const t = {
    appName: isArabic ? "تسهيل المندوب" : "Tashil Delegate",
    greeting: isArabic ? "مرحباً، أحمد منصور" : "Hello, Ahmed Mansour",
    statusBadge: isArabic ? "الوردية: نشطة (حاضر)" : "Shift: Active (Present)",
    branchName: isArabic ? "فرع الرياض - النخيل مول" : "Riyadh - Al Nakheel Mall",
    checkInTime: "08:58 AM",
    checkInLabel: isArabic ? "تسجيل الحضور" : "Check-In Time",
    elapsedLabel: isArabic ? "ساعات الوردية" : "Shift Elapsed",
    elapsedValue: "6h 45m",
    scanQrBtn: isArabic ? "مسح كود الـ QR للحضور" : "Scan Session QR Code",
    requestPhotoBtn: isArabic ? "طلب تصريح تصوير" : "Request Photo Permit",
    historyBtn: isArabic ? "سجل الحضور الشهري" : "Monthly Attendance History",
    profileBtn: isArabic ? "الملف الشخصي" : "Profile & Digital ID",
    phoneAuthLabel: isArabic ? "تسجيل الدخول برقم الهاتف واسم الأم" : "Phone + Mother's Name Auth",
    loginSubtitle: isArabic ? "توثيق مباشر مع سحابة Firestore دون كلمة مرور" : "Direct Firestore verification without passwords",
    phoneInput: "+966 50 123 4567",
    motherNameInput: isArabic ? "فاطمة" : "Fatima",
    loginSubmit: isArabic ? "دخول فوري معتمد" : "Verify & Authorize",
    scanPrompt: isArabic ? "وجّه الكاميرا نحو كود الـ QR في الفرع" : "Align camera with branch session QR",
    scanSuccess: isArabic ? "تم التحقق بنجاح! ضمن النطاق الجغرافي (12m)" : "Verified! Within branch geofence (12m)",
    permitTitle: isArabic ? "تصريح تصوير معروضات الرفوف" : "Shelf Merchandising Permit",
    permitSubtitle: isArabic ? "كاميرا حية مع ختم مائي جغرافي فوري" : "Live camera with real-time geotag watermark",
  };

  const handleSimulateScan = () => {
    setScanState("scanning");
    setTimeout(() => {
      setScanState("success");
      setTimeout(() => {
        setCurrentScreen("dashboard");
        setScanState("idle");
      }, 1400);
    }, 1800);
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/80 backdrop-blur-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Information & Screen Controller Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Material Design 3 Interactive Mobile Mockup</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Live Field Representative Mobile App (Flutter)
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            Architected in <strong>Flutter</strong> utilizing strict <strong>Clean Architecture</strong> and{" "}
            <strong>BLoC 9.1</strong> state management. Interact directly with the smartphone simulator to test
            live QR scanning, mother-name authentication, and GPS watermarking.
          </p>

          {/* Interactive Screen Selector Buttons */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Select Screen to Inspect Inside the Phone:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: "dashboard", label: "Dashboard", icon: Clock },
                { id: "qr_scanner", label: "QR Check-In", icon: QrCode },
                { id: "photo_permit", label: "Photo Permits", icon: Camera },
                { id: "attendance_log", label: "Attendance Log", icon: Calendar },
                { id: "profile", label: "Profile & ID", icon: User },
                { id: "login", label: "Login Flow", icon: Phone },
              ].map((btn) => {
                const Icon = btn.icon;
                const isSelected = currentScreen === btn.id;
                return (
                  <button
                    key={btn.id}
                    onClick={() => setCurrentScreen(btn.id as MobileScreen)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold transition-all border ${
                      isSelected
                        ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-md shadow-sky-500/20"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{btn.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Technology Highlights */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs text-slate-300">
            <div className="font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Core Mobile Engineering Highlights:</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-slate-400">
              <li>0ms local cache launch with Stale-While-Revalidate background synchronization.</li>
              <li>Smooth Material 3 easing curves on all modal transitions.</li>
              <li>Full bilingual localization engine supporting both English (LTR) and Arabic (RTL).</li>
            </ul>
          </div>
        </div>

        {/* Right Phone Mockup Column */}
        <div className="lg:col-span-6 flex justify-center">
          {/* Smartphone Frame Container */}
          <div 
            className="relative w-[320px] sm:w-[340px] h-[670px] rounded-[48px] bg-slate-950 border-[7px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(56,189,248,0.15)] flex flex-col overflow-hidden text-left"
            style={{ direction: isArabic ? "rtl" : "ltr" }}
          >
            {/* Glossy bezel reflective sheen */}
            <div className="absolute inset-0 rounded-[42px] pointer-events-none border border-white/10 z-30" />

            {/* Top Speaker / Dynamic Island */}
            <div className="relative pt-3 pb-2 px-6 flex items-center justify-between z-40 bg-slate-950">
              <span className="text-[11px] font-mono text-slate-400 font-semibold">09:41</span>
              {/* Dynamic Island Capsule */}
              <div className="w-24 h-5 rounded-full bg-black border border-slate-800/80 flex items-center justify-center gap-2 px-2 shadow-inner">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                <span>5G</span>
                <span className="w-2.5 h-2 rounded-sm border border-slate-400 inline-block" />
              </div>
            </div>

            {/* In-Phone App Bar */}
            <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between z-20">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
                  <QrCode className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-white tracking-wide">{t.appName}</span>
              </div>

              {/* Language Switcher inside phone */}
              <button
                onClick={() => setIsArabic(!isArabic)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 text-[10px] font-semibold text-sky-300 hover:bg-slate-700 transition-colors"
                title="Toggle App Localization"
              >
                <Languages className="w-3 h-3" />
                <span>{isArabic ? "EN" : "AR"}</span>
              </button>
            </div>

            {/* In-Phone Screen Content */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-950 relative scrollbar-none">
              <AnimatePresence mode="wait">
                {/* 1. DASHBOARD SCREEN */}
                {currentScreen === "dashboard" && (
                  <motion.div
                    key="dash"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.28, ease: [0.05, 0.7, 0.1, 1.0] }}
                    className="space-y-3.5"
                  >
                    {/* Welcome Card */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 shadow-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white">{t.greeting}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {t.statusBadge}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                        <span className="truncate">{t.branchName}</span>
                      </div>
                    </div>

                    {/* Today's Shift Metrics */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                        <div className="text-[10px] text-slate-400">{t.checkInLabel}</div>
                        <div className="text-sm font-bold text-sky-400 mt-0.5">{t.checkInTime}</div>
                        <div className="text-[9px] text-emerald-400">GPS Verified (12m)</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                        <div className="text-[10px] text-slate-400">{t.elapsedLabel}</div>
                        <div className="text-sm font-bold text-indigo-300 mt-0.5">{t.elapsedValue}</div>
                        <div className="text-[9px] text-slate-400">Target: 8h 00m</div>
                      </div>
                    </div>

                    {/* Big Action: Scan QR */}
                    <button
                      onClick={() => setCurrentScreen("qr_scanner")}
                      className="w-full relative group overflow-hidden p-4 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                    >
                      <span className="absolute inset-0 bg-white/20 animate-pulse" />
                      <QrCode className="w-4 h-4 relative z-10 animate-bounce" />
                      <span className="relative z-10">{t.scanQrBtn}</span>
                    </button>

                    {/* Secondary Actions */}
                    <div className="space-y-2">
                      <button
                        onClick={() => setCurrentScreen("photo_permit")}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-200 flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <Camera className="w-3.5 h-3.5 text-sky-400" />
                          <span>{t.requestPhotoBtn}</span>
                        </span>
                        <ChevronRight className="w-3 h-3 text-slate-500" />
                      </button>

                      <button
                        onClick={() => setCurrentScreen("attendance_log")}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-200 flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{t.historyBtn}</span>
                        </span>
                        <ChevronRight className="w-3 h-3 text-slate-500" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 2. QR SCANNER SCREEN */}
                {currentScreen === "qr_scanner" && (
                  <motion.div
                    key="qr"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.28, ease: [0.05, 0.7, 0.1, 1.0] }}
                    className="space-y-4 text-center"
                  >
                    <div className="text-xs font-bold text-white">{t.scanPrompt}</div>
                    
                    {/* Viewfinder box with laser */}
                    <div className="relative w-48 h-48 mx-auto rounded-2xl border-2 border-sky-400 bg-slate-900/90 overflow-hidden flex items-center justify-center shadow-inner">
                      {scanState === "scanning" && (
                        <motion.div
                          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-[0_0_8px_#F43F5E]"
                          animate={{ y: [-90, 90, -90] }}
                          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                        />
                      )}

                      <QrCode className="w-24 h-24 text-slate-700 opacity-60" />

                      {scanState === "success" && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 bg-emerald-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-3"
                        >
                          <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-1" />
                          <span className="text-[11px] font-bold text-white">{t.scanSuccess}</span>
                        </motion.div>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 px-2 leading-relaxed">
                      Session QR codes cycle dynamically every 30 seconds with rotating cryptographic tokens.
                    </p>

                    <button
                      onClick={handleSimulateScan}
                      disabled={scanState !== "idle"}
                      className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-md transition-all disabled:opacity-50"
                    >
                      {scanState === "idle" ? "Simulate QR Scan" : scanState === "scanning" ? "Verifying with Cloud..." : "Check-in Confirmed!"}
                    </button>

                    <button
                      onClick={() => setCurrentScreen("dashboard")}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Return to Dashboard
                    </button>
                  </motion.div>
                )}

                {/* 3. PHOTO PERMIT SCREEN */}
                {currentScreen === "photo_permit" && (
                  <motion.div
                    key="permit"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.28, ease: [0.05, 0.7, 0.1, 1.0] }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{t.permitTitle}</span>
                      <button 
                        onClick={() => setWatermarkEnabled(!watermarkEnabled)}
                        className={`text-[10px] px-2 py-0.5 rounded font-mono ${watermarkEnabled ? "bg-sky-500/20 text-sky-300" : "bg-slate-800 text-slate-400"}`}
                      >
                        {watermarkEnabled ? "Watermark: ON" : "Watermark: OFF"}
                      </button>
                    </div>

                    {/* Camera Viewport with Watermark */}
                    <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 aspect-[4/3]">
                      <img 
                        src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500&auto=format&fit=crop&q=80" 
                        alt="Retail Shelf Preview"
                        className="w-full h-full object-cover"
                      />

                      {watermarkEnabled && (
                        <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-mono text-emerald-300 space-y-0.5 text-left">
                          <div className="flex justify-between">
                            <span>TASHIL WATERMARK v2.4</span>
                            <span className="text-sky-300">24.7136° N, 46.6753° E</span>
                          </div>
                          <div className="text-white">Delegate: Ahmed Mansour (#DEL-9041)</div>
                          <div className="text-slate-300">Al Nakheel Mall · 2026-09-28 09:41:20</div>
                        </div>
                      )}
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Camera-Only Lock:</span>
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Gallery uploads and photo-picker mocks are disabled at the native platform layer.
                      </p>
                    </div>

                    <button
                      onClick={() => setCurrentScreen("dashboard")}
                      className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800"
                    >
                      Return to Dashboard
                    </button>
                  </motion.div>
                )}

                {/* 4. ATTENDANCE LOG SCREEN */}
                {currentScreen === "attendance_log" && (
                  <motion.div
                    key="log"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.28, ease: [0.05, 0.7, 0.1, 1.0] }}
                    className="space-y-2.5"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{t.historyBtn}</span>
                      <span className="text-[10px] text-slate-400">September 2026</span>
                    </div>

                    {[
                      { date: "Today 28 Sep", in: "08:58 AM", out: "--:--", status: "On-Duty (Active)", color: "text-emerald-400" },
                      { date: "Sun 27 Sep", in: "09:01 AM", out: "05:04 PM", status: "8h 03m (Completed)", color: "text-sky-400" },
                      { date: "Sat 26 Sep", in: "09:14 AM", out: "05:15 PM", status: "Late (14m)", color: "text-amber-400" },
                      { date: "Thu 24 Sep", in: "08:55 AM", out: "05:00 PM", status: "8h 05m (Completed)", color: "text-sky-400" },
                    ].map((row, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 text-xs flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-slate-200 text-[11px]">{row.date}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            {row.in} → {row.out}
                          </div>
                        </div>
                        <span className={`text-[10px] font-semibold ${row.color}`}>
                          {row.status}
                        </span>
                      </div>
                    ))}

                    <button
                      onClick={() => setCurrentScreen("dashboard")}
                      className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800 mt-2"
                    >
                      Return to Dashboard
                    </button>
                  </motion.div>
                )}

                {/* 5. PROFILE SCREEN */}
                {currentScreen === "profile" && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.28, ease: [0.05, 0.7, 0.1, 1.0] }}
                    className="space-y-3 text-center"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full border-2 border-sky-400 p-0.5 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
                        alt="Delegate Avatar"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Ahmed Mansour</div>
                      <div className="text-[11px] text-slate-400 font-mono">ID: DEL-9041 · Field Promoter</div>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-left space-y-2">
                      <div className="flex justify-between text-slate-400 text-[11px]">
                        <span>Tenant:</span>
                        <span className="text-slate-200 font-semibold">United Foods Group</span>
                      </div>
                      <div className="flex justify-between text-slate-400 text-[11px]">
                        <span>Supervisor:</span>
                        <span className="text-slate-200 font-semibold">Khalid Al-Rashid</span>
                      </div>
                      <div className="flex justify-between text-slate-400 text-[11px]">
                        <span>Hardware Binding:</span>
                        <span className="text-emerald-400 font-semibold">Bound (UUID Verified)</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentScreen("dashboard")}
                      className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800"
                    >
                      Return to Dashboard
                    </button>
                  </motion.div>
                )}

                {/* 6. LOGIN SCREEN */}
                {currentScreen === "login" && (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.28, ease: [0.05, 0.7, 0.1, 1.0] }}
                    className="space-y-3.5 text-left"
                  >
                    <div className="text-center pt-2">
                      <div className="w-10 h-10 mx-auto rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-2">
                        <Phone className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-bold text-white">{t.phoneAuthLabel}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{t.loginSubtitle}</p>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <label className="text-[10px] text-slate-400 mb-1 block">Registered Phone Number</label>
                        <input
                          type="text"
                          readOnly
                          value={t.phoneInput}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 mb-1 block">Mother's Name Validation</label>
                        <input
                          type="text"
                          readOnly
                          value={t.motherNameInput}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentScreen("dashboard")}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-xs font-bold shadow-md shadow-sky-500/20 mt-2"
                    >
                      {t.loginSubmit}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom In-Phone Navigation Bar */}
            <div className="px-3 py-2.5 bg-slate-900/95 border-t border-slate-800 flex items-center justify-around z-20">
              <button 
                onClick={() => setCurrentScreen("dashboard")}
                className={`flex flex-col items-center gap-0.5 text-[9px] ${currentScreen === "dashboard" ? "text-sky-400 font-bold" : "text-slate-500"}`}
              >
                <Clock className="w-4 h-4" />
                <span>Home</span>
              </button>
              <button 
                onClick={() => setCurrentScreen("qr_scanner")}
                className={`flex flex-col items-center gap-0.5 text-[9px] ${currentScreen === "qr_scanner" ? "text-sky-400 font-bold" : "text-slate-500"}`}
              >
                <QrCode className="w-4 h-4" />
                <span>QR Check-in</span>
              </button>
              <button 
                onClick={() => setCurrentScreen("photo_permit")}
                className={`flex flex-col items-center gap-0.5 text-[9px] ${currentScreen === "photo_permit" ? "text-sky-400 font-bold" : "text-slate-500"}`}
              >
                <Camera className="w-4 h-4" />
                <span>Permits</span>
              </button>
              <button 
                onClick={() => setCurrentScreen("profile")}
                className={`flex flex-col items-center gap-0.5 text-[9px] ${currentScreen === "profile" ? "text-sky-400 font-bold" : "text-slate-500"}`}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
            </div>

            {/* Home Indicator */}
            <div className="pb-1.5 pt-1 bg-slate-950 flex justify-center">
              <div className="w-28 h-1 rounded-full bg-slate-700/60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
