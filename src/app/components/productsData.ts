export type ProductId = "tashil" | "gift" | "data";

export interface Shot { src: string; caption: string; }
export interface Stat { value: number; suffix?: string; label: string; }

export interface Product {
  id: ProductId;
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  accent: string;
  frame: "phone" | "browser";
  url?: string;
  shots: Shot[];
  workflow: { title: string; text: string }[];
  features: string[];
  stack: string[];
  stats: Stat[];
  statsNote: string;
}

const t = "/products/tashil-app/";
const g = "/products/tashil-gift/";
const d = "/products/tashil-data-sharing/";

export const PRODUCTS: Product[] = [
  {
    id: "tashil",
    name: "Tashil",
    tagline: "Field workforce & attendance platform for retail chains and their suppliers",
    problem: "Suppliers can't verify that promoters are really inside the store, and HR closes payroll from scattered sheets.",
    solution: "Geofenced, device-bound check-ins, live supervision and an automated payroll loop in one mobile app plus web command center.",
    accent: "#A78BFA",
    frame: "phone",
    url: "https://tashil.sw-point.com",
    shots: [
      { src: t + "03_supervisor_home.webp", caption: "Supervisor home: company, linked chains and responsibilities" },
      { src: t + "04_supervisor_menu.webp", caption: "Supervisor toolkit: live tracking, leave, payroll, anti-fraud, photos, tasks" },
      { src: t + "05_attendance_log_blurred.webp", caption: "Attendance log with daily totals and chain/branch filters (delegates blurred)" },
      { src: t + "06_company_delegates_blurred.webp", caption: "Company delegates with multi-chain linking (names blurred)" },
      { src: t + "07_leave_requests.webp", caption: "Leave & excuse requests: pending, approved and rejected" },
      { src: t + "02_login_staff.webp", caption: "Unified login for delegates and staff" },
    ],
    workflow: [
      { title: "Onboard", text: "Chain sets branches with geofences; suppliers add their delegates." },
      { title: "Check-in", text: "Delegate checks in only inside the geofence, offline-ready." },
      { title: "Supervise", text: "Live tracking, tasks and shelf-photo permissions." },
      { title: "Approve", text: "Leave, excuses and device unbinding with audit trail." },
      { title: "Payroll", text: "Penalties, wallets and monthly payroll closed by HR." },
    ],
    features: [
      "Geofenced attendance with mock-GPS blocking",
      "Hardware device binding & anti-fraud audit logs",
      "Live fleet tracking and field shelf photos",
      "Tasks, leave requests and photo permissions",
      "Penalties, payroll and wallets",
      "Push notifications via FCM",
    ],
    stack: ["Flutter · BLoC", "Angular PWA", "Firebase"],
    stats: [
      { value: 317, label: "Branches covered" },
      { value: 8157, label: "Shelf photos captured" },
      { value: 631, label: "Active accounts" },
      { value: 1, suffix: "K+", label: "Google Play downloads" },
    ],
    statsNote: "Production data, Oct 2026",
  },
  {
    id: "gift",
    name: "Tashil Gift",
    tagline: "AI receipt-to-reward campaigns for FMCG brands inside retail chains",
    problem: "In-store promotions leak through fake or reused receipts, and brands can't see stock or sell-through per branch.",
    solution: "Reps snap the receipt, AI reads and validates it, the shopper plays a game and wins — stock and reports update instantly.",
    accent: "#D4B24C",
    frame: "browser",
    url: "https://gift.sw-point.com",
    shots: [
      { src: g + "04-admin-campaigns.webp", caption: "Campaigns overview with live KPIs per company" },
      { src: g + "06-admin-invoices-log.webp", caption: "Invoices log: accepted receipts and AI extraction time per branch" },
      { src: g + "05-admin-reports.webp", caption: "Reports & analytics: invoice totals, sales value, top products" },
      { src: g + "07-admin-chains-branches.webp", caption: "Retail chains & branches, with AI 'extract chain from receipt'" },
      { src: g + "08-admin-games.webp", caption: "Shopper games catalog: Spin the Wheel, Scratch & Win" },
      { src: g + "09-gift-stock-prizes.webp", caption: "Gift stock & distribution per prize and voucher value" },
      { src: g + "02-rep-upload-edita.webp", caption: "Rep upload page: no login, just a campaign link" },
    ],
    workflow: [
      { title: "Campaign", text: "Admin sets chains, brands, receipt tiers, prizes and game." },
      { title: "Rep link", text: "Branch rep opens a link — no app, no login." },
      { title: "AI scan", text: "Gemini reads the receipt, branch and eligible brands." },
      { title: "Validate", text: "Duplicate check and lock on every accepted receipt." },
      { title: "Play & win", text: "Shopper plays; stock is deducted atomically." },
      { title: "Notify", text: "Winner message on WhatsApp, partner reports update." },
    ],
    features: [
      "AI receipt scanning (server-side Gemini)",
      "Duplicate & fraud prevention with receipt locks",
      "Spin the Wheel, Scratch & Win and surprise box",
      "Shared stock pool per branch and prize",
      "Partner portal: stock, daily sales, vouchers",
      "WhatsApp winner notifications, App Check & rate limits",
    ],
    stack: ["Flutter Web PWA", "Firebase Functions", "Gemini AI"],
    stats: [
      { value: 10462, label: "Receipts processed" },
      { value: 7751, label: "Gifts claimed" },
      { value: 21, label: "Companies served" },
      { value: 100, label: "Branches" },
    ],
    statsNote: "Production data, Oct 2026 · 9,225 receipts accepted",
  },
  {
    id: "data",
    name: "Tashil Data Sharing",
    tagline: "Sell-in / sell-out intelligence portal for manufacturers and retail chains",
    problem: "Manufacturers get chain sales as messy Excel files and can't spot out-of-stock or ROI in time.",
    solution: "AI ingests every file into BigQuery and turns it into executive dashboards, OOS alerts, store matrix and CPFR.",
    accent: "#5BA8FF",
    frame: "browser",
    shots: [
      { src: d + "03-smart-upload-ingestion-portal.webp", caption: "Smart AI upload: Sell-In, Sell-Out and Product Master ingestion" },
      { src: d + "05-trade-marketing-roi.webp", caption: "Trade marketing & promo ROI matrix" },
      { src: d + "01-executive-dashboard.webp", caption: "Executive dashboard (client figures masked)" },
      { src: d + "02-store-matrix-benchmarking.webp", caption: "Store matrix benchmarking, Tier A/B/C (figures masked)" },
      { src: d + "06-cpfr-replenishment-reconciliation.webp", caption: "CPFR replenishment & PO reconciliation (figures masked)" },
      { src: d + "04-data-quality-errors.webp", caption: "Data quality: every rejected row is traceable" },
    ],
    workflow: [
      { title: "Upload", text: "Tenant uploads Sell-In, Sell-Out and master Excel files." },
      { title: "AI ingest", text: "Two-tier Gemini parsing with offline fallback parsers." },
      { title: "Quality", text: "Rows are cleaned, matched to master and errors flagged." },
      { title: "Warehouse", text: "Data lands in BigQuery, isolated per tenant (RLS)." },
      { title: "Insights", text: "Dashboards, targets, OOS alerts and store matrix." },
      { title: "Replenish", text: "CPFR and PO reconciliation with Excel export." },
    ],
    features: [
      "12 modules from executive dashboard to CPFR",
      "Smart AI upload with data-quality reports",
      "OOS monitor with estimated daily lost sales",
      "Store matrix tiers, pricing & compare views",
      "Branded tenant portal, 6 roles, audit logs",
      "Arabic RTL interface",
    ],
    stack: ["Flutter Web", "Go · Cloud Run", "BigQuery", "Gemini AI"],
    stats: [
      { value: 66, suffix: "K+", label: "Sales rows ingested" },
      { value: 12, label: "Analytics modules" },
      { value: 6, label: "User roles" },
      { value: 2, label: "AI parsing tiers" },
    ],
    statsNote: "Live with Adeco, Oct 2026",
  },
];
