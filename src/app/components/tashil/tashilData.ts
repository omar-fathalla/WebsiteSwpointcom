export interface TashilRole {
  id: string;
  nameEn: string;
  titleEn: string;
  icon: string;
  badgeEn: string;
  scopeEn: string;
  descriptionEn: string;
  kpis: { labelEn: string; value: string; change: string }[];
  screensEn: string[];
  keyFeaturesEn: string[];
  color: string;
}

export const TASHIL_ROLES: TashilRole[] = [
  {
    id: "delegate",
    nameEn: "Delegate & Promoter",
    titleEn: "Field Representative & Promoter",
    icon: "QrCode",
    badgeEn: "Frontline Ops",
    scopeEn: "Mobile App (Flutter)",
    descriptionEn: "Frontline mobile interface: instant QR check-in with anti-fraud geofencing, GPS-watermarked photo permits, attendance quota tracking, and digital penalty dispute submissions.",
    kpis: [
      { labelEn: "Attendance Accuracy", value: "99.8%", change: "+4.2%" },
      { labelEn: "Check-in Time", value: "< 3.2s", change: "-85%" },
      { labelEn: "Approved Permits", value: "96.4%", change: "+12%" },
    ],
    screensEn: ["QR Check-in Scanner", "Photo Permits Wallet", "Monthly Attendance Log", "Dispute Submission"],
    keyFeaturesEn: [
      "Dynamic QR scanning with 30s rotation preventing image sharing",
      "Geofence perimeter verification (50m branch radius)",
      "Live camera capture with GPS coordinates & server timestamp watermark",
      "Full offline-first support with background queue sync",
    ],
    color: "#38BDF8",
  },
  {
    id: "field_supervisor",
    nameEn: "Field Supervisor",
    titleEn: "Field Operations Supervisor",
    icon: "ShieldCheck",
    badgeEn: "Field Oversight",
    scopeEn: "Mobile + Web Live Dashboard",
    descriptionEn: "Direct field manager overseeing assigned territory: real-time location verification, multi-stage approval of photo permits, on-site audits, and issuing instant documented infractions.",
    kpis: [
      { labelEn: "Active Delegates", value: "48 / 50", change: "96% on-duty" },
      { labelEn: "Pending Permits", value: "3", change: "Avg 4m SLA" },
      { labelEn: "Territory Discipline", value: "98.1%", change: "+6%" },
    ],
    screensEn: ["Live Radar Map", "Permit Approvals Log", "Penalty Dispatcher", "Daily Patrol Report"],
    keyFeaturesEn: [
      "Live vector radar monitoring assigned branch staff in real-time",
      "Photo permit review with EXIF metadata & GPS watermark inspector",
      "Instant documented violation issuance with digital evidence",
      "Direct role-based push notifications via Firebase Cloud Messaging",
    ],
    color: "#22C55E",
  },
  {
    id: "super_admin",
    nameEn: "Super Admin",
    titleEn: "Master Platform Controller",
    icon: "Crown",
    badgeEn: "Global Multi-Tenant",
    scopeEn: "Enterprise Web Console",
    descriptionEn: "Supreme governance authority: multi-tenant organization provisioning, subscription tier billing, security rules lifecycle, and distributed Firestore index & function performance monitoring.",
    kpis: [
      { labelEn: "Active Tenants", value: "34 Org", change: "+8 this month" },
      { labelEn: "Total Fleet", value: "4,820", change: "+18%" },
      { labelEn: "Platform Uptime", value: "99.98%", change: "SLA Compliant" },
    ],
    screensEn: ["Tenant Manager", "Security Audit Logs", "SLA & Telemetry", "Licensing Matrix"],
    keyFeaturesEn: [
      "Strict logical data isolation across corporate tenants",
      "Central licensing and quota allocation for branches & field staff",
      "Tamper-proof encrypted security audit trail across all sensitive actions",
      "Real-time telemetry for Firestore composite index utilization & storage",
    ],
    color: "#818CF8",
  },
  {
    id: "org_admin",
    nameEn: "Organization Admin",
    titleEn: "Company Operations Director",
    icon: "Building2",
    badgeEn: "Tenant Scope",
    scopeEn: "Tenant Web Console",
    descriptionEn: "Executive tenant lead: branch geofence boundary configuration, supervisor/delegate roster management, and consolidated cross-branch operational productivity dashboards.",
    kpis: [
      { labelEn: "Active Branches", value: "142 stores", change: "100% active" },
      { labelEn: "Today Attendance", value: "97.4%", change: "+2.1%" },
      { labelEn: "Shift Hours Logged", value: "11,480 h", change: "Today" },
    ],
    screensEn: ["Branch Geofence Blueprint", "Consolidated Attendance Hub", "Staff Roster Management", "Shift Policy Config"],
    keyFeaturesEn: [
      "Interactive map polygon and radius definition for store locations",
      "One-click multi-format export (Excel, CSV, PDF) for corporate payroll",
      "Granular role assignment connecting delegates to supervisors",
      "Custom shift templates, grace period thresholds, and break durations",
    ],
    color: "#60A5FA",
  },
  {
    id: "tech_support",
    nameEn: "Technical Support",
    titleEn: "Technical Support & Device Ops",
    icon: "Laptop",
    badgeEn: "DevOps & Support",
    scopeEn: "Support & Device Console",
    descriptionEn: "Technical troubleshooting lead: hardware UUID device binding, session token resets, mobile OS version compliance, and diagnosing GPS drift & low-connectivity field anomalies.",
    kpis: [
      { labelEn: "Resolved Tickets", value: "99.2%", change: "< 15m SLA" },
      { labelEn: "Bound Devices", value: "3,110", change: "Hardware locked" },
      { labelEn: "Flagged GPS Errors", value: "0.14%", change: "Auto-handled" },
    ],
    screensEn: ["Device & Session Registry", "Connectivity Diagnostics", "Support Ticket Desk", "Mock-Location Detection Log"],
    keyFeaturesEn: [
      "Hardware device re-binding to prevent credential sharing between staff",
      "Safe session unlock for broken or replaced field smartphones",
      "Automated inspection logs for Fake GPS injection and device rooting",
      "Local offline cache diagnostic tool and sync queue inspection",
    ],
    color: "#A78BFA",
  },
  {
    id: "marketing",
    nameEn: "Marketing & Promotions",
    titleEn: "Trade Marketing & Display Lead",
    icon: "Megaphone",
    badgeEn: "Merchandising",
    scopeEn: "Campaign & Gallery Portal",
    descriptionEn: "Visual merchandising & campaign oversight: high-res audit of store display gondolas, verifying brand compliance standards, and measuring on-shelf share of voice against competitors.",
    kpis: [
      { labelEn: "Audited Shelf Photos", value: "18,400+", change: "This month" },
      { labelEn: "Planogram Compliance", value: "94.6%", change: "+5.3%" },
      { labelEn: "Active Campaigns", value: "14 live", change: "High traffic" },
    ],
    screensEn: ["Smart Shelf Gallery", "Campaign Coverage Map", "Share of Shelf Index", "Before/After Audit Tool"],
    keyFeaturesEn: [
      "Smart image gallery filtered by brand, retailer, branch, and SKU",
      "Camera verification ensuring direct snap without camera-roll spoofing",
      "High-resolution side-by-side comparison for shelf restock audits",
      "Exportable stakeholder brand presentation packs with timestamped proof",
    ],
    color: "#F43F5E",
  },
  {
    id: "branches_marketing",
    nameEn: "Regional Retail Allocator",
    titleEn: "Regional Marketing Allocator",
    icon: "Store",
    badgeEn: "Regional Ops",
    scopeEn: "Promoter Allocation Portal",
    descriptionEn: "Regional promoter deployment: matching promoter strengths with high-traffic store clusters, tracking branch footfall-to-conversion targets, and scaling temporary promoter shifts for retail seasons.",
    kpis: [
      { labelEn: "Branch Target Coverage", value: "100%", change: "Optimal" },
      { labelEn: "Promoter Rotation", value: "12%", change: "-8% churn" },
      { labelEn: "Allocation Efficiency", value: "96.8%", change: "+7.4%" },
    ],
    screensEn: ["Promoter Allocation Grid", "Branch Sales Target Board", "Seasonal Shift Planner", "Store Productivity Matrix"],
    keyFeaturesEn: [
      "One-click dynamic promoter reassignment syncing instantly to mobile apps",
      "Branch sales volume correlated with promoter hours on the floor",
      "Automated staffing shortfall alerts during anticipated traffic peaks",
      "Footfall engagement and promotional interaction telemetry",
    ],
    color: "#FB923C",
  },
  {
    id: "accountant",
    nameEn: "Financial Accountant",
    titleEn: "Payroll & Financial Auditor",
    icon: "Receipt",
    badgeEn: "Payroll & Audit",
    scopeEn: "Financial Reconciliation Hub",
    descriptionEn: "Financial reconciliation controller: auditing supervisor-issued field penalties, reimbursing verified travel stipends, and syncing net verified hours into monthly payroll exports.",
    kpis: [
      { labelEn: "Payroll Match Rate", value: "100%", change: "Zero gap" },
      { labelEn: "Reconciled Fines", value: "148 slips", change: "Verified" },
      { labelEn: "Month-End Close", value: "4 hours", change: "-75% time" },
    ],
    screensEn: ["Penalty & Deduction Ledger", "Net Work Hours Statement", "Field Expense Claims", "ERP System Sync"],
    keyFeaturesEn: [
      "Automatic hold on disputed penalties pending HR or management review",
      "Exact-to-the-minute deduction formulas for late arrival & early exit",
      "Direct API and CSV sync with major ERP suites (SAP, Oracle, Odoo)",
      "Cryptographically stamped digital deduction slips for delegate records",
    ],
    color: "#EAB308",
  },
  {
    id: "hr",
    nameEn: "Human Resources (HR)",
    titleEn: "HR & Labor Compliance Officer",
    icon: "Users2",
    badgeEn: "Workforce",
    scopeEn: "HR Governance Portal",
    descriptionEn: "Workforce governance officer: delegate onboarding and digital ID cards, formal shift and vacation scheduling, adjudicating disciplinary appeals, and ensuring labor law compliance.",
    kpis: [
      { labelEn: "Fair Resolution Rate", value: "98.5%", change: "< 24h SLA" },
      { labelEn: "Shift Adherence", value: "97.9%", change: "+3.8%" },
      { labelEn: "Active Digital IDs", value: "4,820", change: "100% issued" },
    ],
    screensEn: ["Delegate Digital ID Registry", "Shift & Leave Schedule", "Appeals Adjudication Desk", "Compliance Index"],
    keyFeaturesEn: [
      "Digital delegate identity badge with embedded offline QR verification",
      "Morning, evening, and split shift template assignment per branch",
      "Formal appeal hearing desk with audit-logged decision notes",
      "Comprehensive multi-year attendance dossier and reliability rating",
    ],
    color: "#EC4899",
  },
];

export interface SecurityLayer {
  number: string;
  titleEn: string;
  subtitleEn: string;
  descriptionEn: string;
  badge: string;
  icon: string;
  color: string;
}

export const SECURITY_LAYERS: SecurityLayer[] = [
  {
    number: "01",
    titleEn: "Live Cloud Server Timestamp",
    subtitleEn: "Server-Authoritative Clock",
    descriptionEn: "Bypasses local device clock completely. Every transaction is stamped directly with authoritative Google Cloud Firestore server time (FieldValue.serverTimestamp).",
    badge: "100% Time-Spoof Proof",
    icon: "Clock",
    color: "#38BDF8",
  },
  {
    number: "02",
    titleEn: "Mock Location & Root Interceptor",
    subtitleEn: "Anti-GPS Spoofing Shield",
    descriptionEn: "Kernel-level inspection flagging mock GPS providers, Android developer mock mode, emulators, and rooted/compromised environments instantly.",
    badge: "Instant Mock Detection",
    icon: "ShieldAlert",
    color: "#F43F5E",
  },
  {
    number: "03",
    titleEn: "Dynamic Rotating Session QR",
    subtitleEn: "Time-Bound Cryptographic Tokens",
    descriptionEn: "Session QR codes cycle dynamically every 30 seconds with rotating cryptographic nonces, preventing delegates from capturing or sharing codes via chat.",
    badge: "30s Cryptographic Rotation",
    icon: "QrCode",
    color: "#22C55E",
  },
  {
    number: "04",
    titleEn: "Hardware Device UUID Binding",
    subtitleEn: "Biometric & Phone Verified Auth",
    descriptionEn: "Locks the delegate account to a verified device hardware UUID, phone number, mother's name verification, and optional biometric prompt.",
    badge: "1 Device = 1 Delegate",
    icon: "Fingerprint",
    color: "#A78BFA",
  },
];

export interface RadarDelegate {
  id: string;
  nameEn: string;
  avatar: string;
  branchEn: string;
  city: "riyadh" | "jeddah" | "cairo" | "dubai";
  cityLabelEn: string;
  status: "present" | "late" | "shift_ended";
  statusLabelEn: string;
  accuracy: string;
  lastPing: string;
  xPercent: number;
  yPercent: number;
}

export const RADAR_DELEGATES: RadarDelegate[] = [
  {
    id: "del-1",
    nameEn: "Ahmed Mansour",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    branchEn: "Riyadh - Al Nakheel Mall",
    city: "riyadh",
    cityLabelEn: "Riyadh Hub",
    status: "present",
    statusLabelEn: "On-Site Present",
    accuracy: "± 3.4m",
    lastPing: "8 seconds ago",
    xPercent: 62,
    yPercent: 44,
  },
  {
    id: "del-2",
    nameEn: "Sarah Al-Otaibi",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    branchEn: "Jeddah - Red Sea Mall",
    city: "jeddah",
    cityLabelEn: "Jeddah Hub",
    status: "present",
    statusLabelEn: "On-Site Present",
    accuracy: "± 2.1m",
    lastPing: "4 seconds ago",
    xPercent: 48,
    yPercent: 58,
  },
  {
    id: "del-3",
    nameEn: "Mohamed El-Shennawy",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    branchEn: "Cairo - Citystars Heliopolis",
    city: "cairo",
    cityLabelEn: "Cairo Hub",
    status: "present",
    statusLabelEn: "On-Site Present",
    accuracy: "± 4.0m",
    lastPing: "12 seconds ago",
    xPercent: 24,
    yPercent: 36,
  },
  {
    id: "del-4",
    nameEn: "Tariq Al-Qasimi",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    branchEn: "Dubai - The Dubai Mall",
    city: "dubai",
    cityLabelEn: "Dubai Hub",
    status: "present",
    statusLabelEn: "On-Site Present",
    accuracy: "± 1.8m",
    lastPing: "2 seconds ago",
    xPercent: 82,
    yPercent: 49,
  },
  {
    id: "del-5",
    nameEn: "Yasser Kamal",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    branchEn: "Riyadh - Granada Center",
    city: "riyadh",
    cityLabelEn: "Riyadh Hub",
    status: "late",
    statusLabelEn: "Late (14m)",
    accuracy: "± 5.2m",
    lastPing: "24 seconds ago",
    xPercent: 67,
    yPercent: 41,
  },
  {
    id: "del-6",
    nameEn: "Omar Farouk",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    branchEn: "Alexandria - San Stefano",
    city: "cairo",
    cityLabelEn: "Alexandria Hub",
    status: "shift_ended",
    statusLabelEn: "Shift Completed",
    accuracy: "± 3.9m",
    lastPing: "18 minutes ago",
    xPercent: 20,
    yPercent: 28,
  },
];

export interface WebAttendanceRow {
  id: string;
  delegateName: string;
  phone: string;
  company: string;
  branch: string;
  checkInTime: string;
  checkOutTime: string;
  duration: string;
  status: "verified" | "late" | "flagged";
  geoStatus: "Within Geofence (12m)" | "Outside Geofence (Alert)" | "Verified GPS";
}

export const WEB_ATTENDANCE_DATA: WebAttendanceRow[] = [
  {
    id: "ATT-9041",
    delegateName: "Ahmed Mansour",
    phone: "+966 50 123 4567",
    company: "United Foods Group",
    branch: "Riyadh - Al Nakheel Mall",
    checkInTime: "08:58:12 AM",
    checkOutTime: "--:--:--",
    duration: "6h 42m",
    status: "verified",
    geoStatus: "Within Geofence (12m)",
  },
  {
    id: "ATT-9042",
    delegateName: "Sarah Al-Otaibi",
    phone: "+966 55 987 6543",
    company: "Global Beverages Corp",
    branch: "Jeddah - Red Sea Mall",
    checkInTime: "09:02:44 AM",
    checkOutTime: "--:--:--",
    duration: "6h 38m",
    status: "verified",
    geoStatus: "Within Geofence (12m)",
  },
  {
    id: "ATT-9043",
    delegateName: "Yasser Kamal",
    phone: "+966 54 332 1100",
    company: "United Foods Group",
    branch: "Riyadh - Granada Center",
    checkInTime: "09:14:02 AM",
    checkOutTime: "--:--:--",
    duration: "6h 26m",
    status: "late",
    geoStatus: "Within Geofence (12m)",
  },
  {
    id: "ATT-9044",
    delegateName: "Tariq Al-Qasimi",
    phone: "+971 50 445 7788",
    company: "Gulf Distribution Logistics",
    branch: "Dubai - The Dubai Mall",
    checkInTime: "08:55:10 AM",
    checkOutTime: "--:--:--",
    duration: "6h 45m",
    status: "verified",
    geoStatus: "Verified GPS",
  },
  {
    id: "ATT-9045",
    delegateName: "Mahmoud Shami",
    phone: "+20 100 554 9911",
    company: "Nile Consumer Goods",
    branch: "Cairo - Mall of Arabia",
    checkInTime: "09:41:20 AM",
    checkOutTime: "--:--:--",
    duration: "5h 59m",
    status: "flagged",
    geoStatus: "Outside Geofence (Alert)",
  },
];
