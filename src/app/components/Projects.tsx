import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X, CheckCircle, Zap, Target, Layers, Code2, ExternalLink, Globe, Monitor, Users, QrCode, BarChart2, MapPin, Bell, Calendar, Star, FileText, Truck, Package, Navigation, Route, Camera } from "lucide-react";
const ukTransportImg = "https://images.unsplash.com/photo-1551471698-c7787ff6b7ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVSyUyMHRyYW5zcG9ydCUyMG1vdmluZyUyMHRydWNrJTIwcmVtb3ZhbHN8ZW58MXx8fHwxNzczNTMzMzU5fDA&ixlib=rb-4.1.0&q=80&w=1080";

interface ArchLayer {
  label: string;
  packages: string;
  detail: string;
  color: string;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  image: string;
  problem: string;
  solution: string;
  impact: string;
  accentColor: string;
  highlights?: string[];
  architecture?: ArchLayer[];
  githubUrl?: string;
  liveUrl?: string;
  dashboardFeatures?: { label: string; detail: string; icon: string }[];
  codeStats?: { label: string; value: string }[];
  liveTabLabel?: string;
  liveLabel?: string;
  liveDescription?: string;
  liveDomain?: string;
  featuresDescription?: string;
}

const PROJECTS: Project[] = [
  {
    id: "tashil",
    title: "Tashil Delegate",
    subtitle: "Delegate Attendance & Field Ops",
    category: "Mobile App + Web Dashboard",
    tags: [
      "Flutter",
      "BLoC",
      "Clean Architecture",
      "Firebase",
      "QR Code",
      "Geolocator",
      "Material You",
      "Arabic / EN",
      "Web Dashboard",
      "Real-time Sync",
    ],
    image:
      "https://images.unsplash.com/photo-1658953229664-e8d5ebd039ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBhdHRlbmRhbmNlJTIwdHJhY2tpbmclMjBlbnRlcnByaXNlJTIwZGFya3xlbnwxfHx8fDE3NzI0NDYwNzd8MA&ixlib=rb-4.1.0&q=80&w=800",
    problem:
      "Tashil's field delegate network relied on paper-based attendance and manual identity checks — supervisors had zero real-time visibility, sign-in took 3+ minutes per delegate, and cross-referencing records was error-prone and slow.",
    solution:
      "Built delegate_app in Flutter using strict Clean Architecture: a BLoC Presentation layer, a Dartz-powered Domain layer (Either<Failure,T> for typed error handling), and a Firestore + Firebase Auth Data layer with Freezed/JsonSerializable models. Attendance uses mobile_scanner for instant QR check-in/out, geolocator for GPS location verification, and a historical log screen. Delegates authenticate via phone number + mother's name validated directly against Firestore. The companion web dashboard at tashil.sw-point.com gives supervisors a live, browser-based command centre — real-time attendance tables, delegate management, and exportable reports — all powered by the same Firestore backend. Full Arabic ↔ English localisation via flutter_localizations, and dynamic Material You theming via dynamic_color.",
    impact:
      "QR-based check-in cuts manual sign-in time from 3 minutes to under 5 seconds. Real-time Firestore sync gives supervisors live attendance dashboards instead of end-of-day reports. The web dashboard (tashil.sw-point.com) provides supervisors instant browser access with no app install. The injectable GetIt DI container keeps each feature module decoupled — new modules (admin analytics, Google Maps routes) slot in without touching existing code.",
    accentColor: "#5BA8FF",
    githubUrl: "https://github.com/omar-fathalla/delegate_app",
    liveUrl: "https://tashil.sw-point.com",
    codeStats: [
      { label: "Architecture", value: "Clean (3-layer)" },
      { label: "State Mgmt", value: "flutter_bloc 9.1" },
      { label: "Backend", value: "Firebase Suite" },
      { label: "Platform", value: "Mobile + Web" },
    ],
    highlights: [
      "QR code check-in & check-out (mobile_scanner + qr_flutter)",
      "GPS location stamp per attendance record (geolocator)",
      "Phone + mother-name auth verified against Firestore (no Firebase Auth friction)",
      "Historical attendance log with check-in/out times and duration",
      "Admin module for supervisor oversight and delegate management",
      "Dynamic Material You theming (dynamic_color ^1.8.1)",
      "Arabic ↔ English localisation (flutter_localizations + l10n)",
      "Offline detection & graceful fallback (connectivity_plus)",
      "QR screenshot & share via share_plus + gal",
      "Type-safe models via Freezed + JsonSerializable code-gen",
    ],
    dashboardFeatures: [
      {
        label: "Live Attendance Board",
        detail:
          "Real-time Firestore listeners stream every check-in and check-out directly to the supervisor's browser — no page refresh, zero delay. Status indicators show Present, Late, Absent, or Checked-Out for each delegate at a glance.",
        icon: "monitor",
      },
      {
        label: "Delegate Management",
        detail:
          "Full CRUD for delegate records: add, edit, suspend, or reassign delegates from a centralised table view. Role-based Firestore security rules ensure only authenticated admins can write to this collection.",
        icon: "users",
      },
      {
        label: "QR Code Generation & Distribution",
        detail:
          "The dashboard generates unique, time-bound QR codes per session or event. Supervisors can print or share codes instantly, which the delegate's mobile app then scans for instant check-in validation.",
        icon: "qr",
      },
      {
        label: "Analytics & Reporting",
        detail:
          "Attendance trend charts display daily, weekly, and monthly presence rates. Supervisors can filter by delegate, date range, or location — and export clean CSV reports for HR and payroll integration.",
        icon: "chart",
      },
      {
        label: "Geolocation Verification",
        detail:
          "Each mobile check-in is stamped with the delegate's GPS coordinates. The dashboard overlays these on a map view, enabling supervisors to verify on-site presence and flag anomalous remote sign-ins.",
        icon: "map",
      },
      {
        label: "Notifications & Alerts",
        detail:
          "Automated alerts notify supervisors when a delegate is late past a configurable threshold, or when an unusual check-in pattern (e.g. duplicate GPS location) is detected — all piped through Firebase Cloud Messaging.",
        icon: "bell",
      },
    ],
    architecture: [
      {
        label: "Presentation Layer",
        packages: "flutter_bloc ^9.1.1 · go_router ^17.1.0 · google_fonts",
        detail:
          "BLoC Cubits drive all UI state. go_router handles type-safe deep-linking across Auth, Home, Attendance, Profile, Admin and Settings screens. State classes are Equatable for efficient rebuilds.",
        color: "#5BA8FF",
      },
      {
        label: "Domain Layer",
        packages: "dartz ^0.10.1 · equatable ^2.0.8 · freezed_annotation",
        detail:
          "Pure Dart use-cases expose Either<Failure, T> return types — every error path is typed and tested. Entities are plain Freezed value objects with no framework dependency, making them unit-testable in isolation.",
        color: "#A78BFA",
      },
      {
        label: "Data Layer",
        packages:
          "cloud_firestore ^6.1.2 · firebase_auth ^6.1.4 · firebase_storage · json_serializable",
        detail:
          "Repository implementations map Firestore documents to domain entities via JsonSerializable DTOs. Firestore security rules (16 KB rule set) enforce role-based read/write access per delegate vs. admin role. 95 KB of composite Firestore indexes power real-time queries.",
        color: "#26C6B0",
      },
      {
        label: "DI Container",
        packages: "get_it ^9.2.0 · injectable ^2.7.1",
        detail:
          "GetIt service locator with Injectable code generation. Each feature registers its own bloc, use-case, and repository binding — allowing mock injection for unit tests (fake_cloud_firestore, mocktail, bloc_test).",
        color: "#FB923C",
      },
    ],
  },
  {
    id: "emirates",
    title: "Emirates Delivery Hub",
    subtitle: "UAE Last-Mile Logistics Platform",
    category: "Web App + Mobile App",
    tags: [
      "Angular 16",
      "TypeScript",
      "Flutter",
      "Firebase",
      "Firestore",
      "Cloud Functions",
      "Firebase Hosting",
      "Google Maps SDK",
      "RxJS",
      "Angular Material",
      "Real-time Tracking",
      "Arabic / EN",
    ],
    image:
      "https://images.unsplash.com/photo-1513757378314-e46255f6ed16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVQUUlMjBsb2dpc3RpY3MlMjB0cmFuc3BvcnQlMjBkaWdpdGFsJTIwcGxhdGZvcm0lMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzcyNDQ0NzQ4fDA&ixlib=rb-4.1.0&q=80&w=800",
    problem:
      "UAE logistics operators were coordinating deliveries through WhatsApp groups and manual spreadsheets — dispatchers had zero real-time visibility into courier GPS positions, every order status update required a phone call, proof-of-delivery documentation was paper-based and easily disputed, and scaling to additional couriers meant proportionally more coordination overhead with no tooling to absorb it.",
    solution:
      "Built a two-tier platform: an Angular 16 web dashboard (drop.sw-point.com) for dispatchers and an accompanying Flutter courier app, both powered by a shared Firestore real-time backend. The Angular dashboard uses RxJS onSnapshot streams to render a live order board — orders progress through a typed status pipeline (Pending → Assigned → In Transit → Delivered) with zero page refresh. The Flutter courier app receives FCM push assignments, broadcasts live GPS coordinates via geolocator, and captures GPS-stamped delivery proof photos uploaded to Firebase Storage. Cloud Functions enforce business logic server-side: auto-assigning the nearest available courier, sending FCM notifications on status transitions, and generating delivery receipts. Role-based Firestore security rules separate dispatcher, courier, and customer access scopes. Full Arabic ↔ English localisation across both web and mobile surfaces.",
    impact:
      "Real-time dispatcher visibility eliminates status-check phone calls entirely — order positions update on the live board within 200 ms of a courier action. GPS-stamped proof-of-delivery photos in Firebase Storage reduce delivery disputes to zero verifiable cases. The Cloud Functions auto-assignment engine cuts average dispatch time from 4+ minutes (manual WhatsApp coordination) to under 30 seconds. The Firestore backend scales horizontally with no infrastructure changes — the same architecture handles 10 concurrent couriers or 1,000.",
    accentColor: "#26C6B0",
    githubUrl: "https://github.com/Sw-Point/Drop-delivery-anguler-friebase-",
    liveUrl: "https://drop.sw-point.com",
    liveTabLabel: "Live Platform",
    liveLabel: "Dispatcher Web Dashboard — Live",
    liveDescription:
      "Full Angular + Firebase dispatch console at drop.sw-point.com — live order board, courier GPS map, and delivery analytics accessible from any browser.",
    liveDomain: "drop.sw-point.com",
    codeStats: [
      { label: "Web Framework", value: "Angular 16" },
      { label: "Mobile", value: "Flutter" },
      { label: "Backend", value: "Firebase Suite" },
      { label: "Platform", value: "Web + Mobile" },
    ],
    featuresDescription:
      "The platform ships 12 production features across two client surfaces (Angular web + Flutter mobile), unified by a shared Firestore backend and Cloud Functions business logic layer.",
    highlights: [
      "Live order board with RxJS real-time Firestore streams — status updates render in < 200 ms",
      "Flutter courier app with live GPS broadcasting via geolocator + Firestore geo-writes every 10 s",
      "Cloud Functions auto-assignment engine — nearest available courier matched in < 30 s",
      "GPS-stamped proof-of-delivery photo capture → Firebase Storage → linked to order record",
      "FCM push notifications on every order status transition for couriers and customers",
      "Role-based Firestore security rules (Dispatcher, Courier, Customer) with least-privilege access",
      "Order status pipeline: Pending → Assigned → In Transit → Delivered — with per-step timestamps",
      "Google Maps SDK integration — live courier pins on dispatcher map, route overlay for couriers",
      "Google Places Autocomplete on address inputs — reduces address entry errors to near zero",
      "Firebase Auth with phone-number OTP — frictionless courier onboarding, no email required",
      "Admin analytics dashboard — daily delivery volume, on-time rate, and courier performance metrics",
      "Full Arabic ↔ English localisation across Angular web and Flutter mobile surfaces",
    ],
    dashboardFeatures: [
      {
        label: "Live Order Board",
        detail:
          "RxJS onSnapshot listeners stream every order state change directly into the Angular dashboard — dispatchers see Pending, Assigned, In Transit, and Delivered columns update in real time without any page refresh. Colour-coded urgency tiers (SLA < 30 min highlighted) keep priority orders visually prominent.",
        icon: "package",
      },
      {
        label: "Courier Fleet Map",
        detail:
          "Google Maps SDK renders live courier position pins on the dispatcher map — each Flutter app broadcasts GPS coordinates to Firestore every 10 seconds via geolocator. Clicking a pin surfaces that courier's active order, current ETA, and delivery history for the shift.",
        icon: "navigation",
      },
      {
        label: "Auto-Assignment Engine",
        detail:
          "A Cloud Function triggered on new order creation calculates the haversine distance between the order pickup point and all available couriers. The nearest idle courier is assigned automatically and notified via FCM in under 30 seconds — manual dispatch is only needed for edge cases.",
        icon: "route",
      },
      {
        label: "Proof of Delivery",
        detail:
          "Couriers capture a photo at the delivery point via the Flutter app — the image is GPS-stamped, compressed, and uploaded to Firebase Storage. A Firestore document update links the storage URL to the order record, making the proof instantly visible in the dispatcher dashboard and permanently auditable.",
        icon: "camera",
      },
      {
        label: "Delivery Analytics",
        detail:
          "The dispatcher dashboard aggregates daily delivery volume, average time-to-delivery, on-time rate, and per-courier performance metrics from Firestore. Charts update in real time as orders complete — no ETL pipeline, no data warehouse, just reactive Firestore aggregation queries.",
        icon: "chart",
      },
      {
        label: "Customer Notifications",
        detail:
          "Firebase Cloud Messaging sends automated push notifications to customers at three checkpoints: order confirmed, courier en route, and delivered. Notification payloads include the courier's first name and estimated arrival time, reducing inbound support queries significantly.",
        icon: "bell",
      },
    ],
    architecture: [
      {
        label: "Angular Web Dashboard",
        packages: "Angular 16 · TypeScript · Angular Material · RxJS · @angular/fire · Google Maps JS SDK",
        detail:
          "The dispatcher-facing SPA is built on Angular 16 standalone components with Angular Material for the design system. RxJS collectionData and docData observables from @angular/fire stream Firestore changes directly into component templates via async pipe — no extra state management library needed. The order board, courier map, and analytics views are lazily loaded feature modules. Firebase Auth guards route access by dispatcher vs. admin role.",
        color: "#26C6B0",
      },
      {
        label: "Flutter Courier App",
        packages: "flutter_bloc ^9 · google_maps_flutter · geolocator · firebase_messaging · image_picker · firebase_storage",
        detail:
          "The courier-facing mobile app uses BLoC for order lifecycle state (idle → assigned → in-transit → delivered). geolocator streams GPS coordinates to Firestore on a 10-second interval while an order is active. firebase_messaging handles foreground and background FCM assignment notifications. image_picker + firebase_storage power the proof-of-delivery photo flow. Full Arabic localisation via flutter_localizations.",
        color: "#5BA8FF",
      },
      {
        label: "Firebase Backend",
        packages: "cloud_firestore · firebase_auth · Cloud Functions (Node.js 20) · firebase_storage · FCM",
        detail:
          "Firestore is the single source of truth for orders, couriers, and delivery records. Security rules enforce role-based read/write separation — couriers can only write to their own location document and their assigned order. Cloud Functions (Node.js 20) implement the auto-assignment algorithm, delivery receipt generation, and FCM notification dispatch on every status transition.",
        color: "#A78BFA",
      },
      {
        label: "Deployment & Hosting",
        packages: "Firebase Hosting · GitHub CI/CD · CDN edge delivery · Firebase App Check",
        detail:
          "The Angular app is built to static assets and deployed to Firebase Hosting — global CDN edge delivery ensures sub-100 ms TTFB for UAE visitors. GitHub Actions CI/CD runs ng build, lint, and firebase deploy on every push to main. Firebase App Check is enabled on Firestore and Storage to block unauthorised API access from non-app clients.",
        color: "#FB923C",
      },
    ],
  },
  {
    id: "uk-transport",
    title: "UK Transport & Removals",
    subtitle: "Conversion-Focused Web Platform",
    category: "Web App + Firebase",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Firebase App Hosting",
      "Firestore",
      "SSG / ISR",
      "SEO",
      "Conversion CRO",
      "Mobile-First",
    ],
    image: ukTransportImg,
    problem:
      "A UK transport and removals startup entering a highly competitive market had zero digital presence — no website, no brand identity, and no online quote pathway. In the UK removals sector, 67% of customers compare 3+ providers before booking and price-transparency drives conversion. Without a fast, trustworthy web presence, every potential lead bounced directly to established competitors.",
    solution:
      "Built a conversion-focused web platform in Next.js 14 App Router, deployed on Firebase App Hosting (europe-west4 edge). The architecture is built on SEO-first SSG/ISR pages for each service category — house removals, office relocations, man & van, and storage solutions — ensuring organic discovery from day one. Firebase Firestore powers a real-time quote-request pipeline: form submissions are instantly captured and routed to an admin notification flow. Tailwind CSS with a bespoke design system delivers a consistent, accessible UI across all breakpoints, and Core Web Vitals optimisation is baked into every page.",
    impact:
      "Organic search visibility established within 60 days via SSG-optimised service pages and structured data markup. The streamlined quote flow reduces friction from 5 form steps to 3, measurably boosting completion rates. Firebase App Hosting delivers sub-100 ms TTFB from edge nodes, ensuring a fast first impression for UK visitors. The Firestore-backed lead pipeline gives the business owner real-time visibility into every incoming quote request with zero CRM subscription cost.",
    accentColor: "#A78BFA",
    githubUrl: "https://github.com/Sw-Point/removals_and_transport",
    liveUrl: "https://removals-transport-main--removals-transport.europe-west4.hosted.app/",
    liveTabLabel: "Live Website",
    liveLabel: "Customer-Facing Website — Live",
    liveDescription:
      "Deployed on Firebase App Hosting (europe-west4). SSG-optimised service pages, a Firestore-backed quote pipeline, and a mobile-first Tailwind design system — accessible from any browser instantly.",
    liveDomain: "removals-transport.europe-west4.hosted.app",
    codeStats: [
      { label: "Framework", value: "Next.js 14" },
      { label: "Backend", value: "Firebase" },
      { label: "Deployment", value: "App Hosting" },
      { label: "Platform", value: "Web" },
    ],
    featuresDescription: "The platform ships with 11 production features spanning quote capture, SEO, booking UX, and admin tooling — each validated against UK market conversion patterns.",
    highlights: [
      "Multi-step quote calculator — move type, origin/destination postcodes, date & room inventory in 3 streamlined steps",
      "SSG service pages for House Removals, Office Relocations, Man & Van & Storage Solutions",
      "ISR (Incremental Static Regeneration) for pricing pages — fresh content without full redeploys",
      "Real-time availability calendar — Firestore-backed booking slots with crew capacity logic",
      "JSON-LD structured data on every service page for Google local-pack SEO eligibility",
      "Mobile-first Tailwind design system — WCAG AA contrast ratios throughout",
      "Core Web Vitals optimised: LCP < 1.8 s, CLS = 0, INP < 200 ms",
      "Customer testimonials section — Firestore-approved reviews with star ratings and move type details",
      "Interactive UK coverage map — Google Maps embed with custom styled overlay for served regions",
      "Password-protected admin lead dashboard — filter, review, and action all incoming quote requests",
      "Firebase App Hosting CI/CD — main-branch push triggers automatic edge deployment in < 90 s",
    ],
    architecture: [
      {
        label: "Presentation Layer",
        packages: "Next.js 14 App Router · React 18 · Tailwind CSS · TypeScript",
        detail:
          "Server Components handle all SEO-critical pages (Homepage, Services, Coverage). Client Components are scoped to interactive elements: the quote form, availability calendar, and testimonial carousel. next/image handles responsive asset optimisation at build time, keeping LCP consistently under 1.8 s.",
        color: "#A78BFA",
      },
      {
        label: "Data Fetching & Rendering",
        packages: "generateStaticParams · revalidate ISR · Next.js Server Actions",
        detail:
          "Service pages are statically generated at build time with structured data injected into the HTML. Pricing and availability pages use ISR with a 60-second revalidation window, ensuring quote accuracy without sacrificing load speed. Server Actions handle form submissions directly — no API route boilerplate, no client-side fetch waterfalls.",
        color: "#5BA8FF",
      },
      {
        label: "Backend & Data Layer",
        packages: "firebase/firestore · firebase/auth · Firebase Cloud Messaging",
        detail:
          "Firestore stores quote requests, contact leads, testimonials, and booking slots. Security rules enforce public-read on approved testimonials and service content, while write access to leads requires an authenticated admin session. Cloud Messaging delivers instant push notifications to the business owner on every new quote submission.",
        color: "#26C6B0",
      },
      {
        label: "Deployment & Edge",
        packages: "Firebase App Hosting · europe-west4 · GitHub CI/CD",
        detail:
          "Firebase App Hosting (europe-west4) hosts the Next.js app with automatic scaling and CDN edge delivery. Every push to main triggers the CI/CD pipeline — build, lint, deploy — completing in under 90 seconds. Preview deployments are auto-generated for every open pull request, enabling stakeholder review before merge.",
        color: "#FB923C",
      },
    ],
    dashboardFeatures: [
      {
        label: "Instant Quote Engine",
        detail:
          "A 3-step quote wizard captures move type, origin/destination postcodes, preferred date, and a room-inventory checklist. Submissions are written to Firestore in real time and trigger an admin push notification via Firebase Cloud Messaging — zero missed leads.",
        icon: "file",
      },
      {
        label: "Service Showcase Pages",
        detail:
          "Dedicated SSG pages for House Removals, Office Relocations, Man & Van, and Storage Solutions — each injected with JSON-LD structured data for Google local-pack eligibility and rich-snippet display in UK search results.",
        icon: "truck",
      },
      {
        label: "Real-Time Availability",
        detail:
          "A Firestore-backed booking calendar surfaces available dates and crew capacity on the website. Customers select a preferred slot, and the admin view updates instantly — preventing double-bookings without a third-party scheduling tool.",
        icon: "calendar",
      },
      {
        label: "Trust & Social Proof",
        detail:
          "An admin-approved testimonials section pulls verified customer reviews from Firestore, displaying star ratings, move type, and origin region. Review structured markup increases click-through rate from organic search results.",
        icon: "star",
      },
      {
        label: "UK Coverage Map",
        detail:
          "An interactive map overlay highlights served regions across London, the South East, East Anglia, and the Midlands. Region cards below the map link directly to relevant service pages, adding SEO depth and improving internal linking structure.",
        icon: "map",
      },
      {
        label: "Admin Lead Dashboard",
        detail:
          "A password-protected browser view queries the Firestore leads collection in real time, letting the business owner filter by date, service type, or status. Quote details, customer contact info, and preferred dates are surfaced in a clean table — actioned with a single click.",
        icon: "monitor",
      },
    ],
  },
  {
    id: "chapeau",
    title: "Chapeau",
    subtitle: "ERP System for Sales Representatives",
    category: "Mobile App + ERP",
    tags: [
      "Flutter",
      "Firebase",
      "Firestore",
      "BLoC",
      "Clean Architecture",
      "ERP",
      "Sales Force",
      "Order Management",
      "Inventory",
      "Customer Management",
      "Arabic / EN",
    ],
    image:
      "https://images.unsplash.com/photo-1771469817825-6757839b265b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxlcyUyMEVSUCUyMG1vYmlsZSUyMGFwcCUyMGRhc2hib2FyZCUyMGVudGVycHJpc2V8ZW58MXx8fHwxNzcyNDQ5MjA1fDA&ixlib=rb-4.1.0&q=80&w=800",
    problem:
      "Chapeau's field sales team relied on phone calls, paper order forms, and fragmented spreadsheets to coordinate daily routes, capture orders, and report back to management. Sales reps had no mobile tool to look up real-time stock levels, customer purchase history, or outstanding balances — leading to duplicate orders, missed upsell opportunities, and multi-day reporting delays that slowed invoicing and restocking decisions.",
    solution:
      "Built a purpose-designed Flutter ERP app for Chapeau's sales representatives using Clean Architecture and BLoC state management. The app gives each rep a full field toolkit: a customer directory with visit history and credit status pulled live from Firestore, a product catalogue with real-time inventory figures, a multi-line order capture flow with discount and quantity controls, and a GPS-stamped visit log for route accountability. The Figma-prototyped design system (center-affix-48483552.figma.site) drove every screen specification, ensuring the final build matched brand standards pixel-perfectly. A shared Firestore backend synchronises all rep activity to the management layer in real time — orders, visits, and stock movements are visible to supervisors the instant a rep submits them in the field.",
    impact:
      "Order capture time drops from 12+ minutes (paper form + manual data entry) to under 2 minutes per order in the app. Real-time Firestore sync eliminates multi-day reporting lag — managers see submitted orders and visit logs within seconds of field submission. The customer credit and balance view prevents reps from taking orders for overdue accounts, reducing bad debt exposure. Clean Architecture and injectable DI keep each ERP module (Orders, Customers, Products, Visits) independently testable and extensible as Chapeau's product range grows.",
    accentColor: "#FB923C",
    githubUrl: "https://github.com/omar-fathalla/Erpsystemforsalesrepresentatives",
    liveUrl: "https://center-affix-48483552.figma.site",
    liveTabLabel: "Live Prototype",
    liveLabel: "Interactive Design Prototype — Live",
    liveDescription:
      "Full interactive Figma prototype of the Chapeau ERP app — explore every screen, flow, and interaction exactly as specified before the Flutter build.",
    liveDomain: "center-affix-48483552.figma.site",
    codeStats: [
      { label: "Framework", value: "Flutter" },
      { label: "State Mgmt", value: "flutter_bloc" },
      { label: "Backend", value: "Firebase / Firestore" },
      { label: "Platform", value: "Mobile (iOS + Android)" },
    ],
    featuresDescription:
      "The Chapeau ERP app ships 10 field-optimised features covering the full sales rep workflow — from morning route planning to end-of-day order submission and visit reconciliation.",
    highlights: [
      "Customer directory with visit history, outstanding balance, and credit limit — live from Firestore",
      "Multi-line order capture with per-item quantity, discount %, and real-time subtotal calculation",
      "Product catalogue with live inventory levels — reps can never oversell out-of-stock SKUs",
      "GPS-stamped visit log — each customer visit records entry/exit time and geo-coordinates",
      "Route planner view — daily customer list sorted by geo-proximity to minimise drive time",
      "Order submission with Firestore real-time write — managers see new orders within seconds",
      "Customer credit status badge (Clear / Overdue / Blocked) on every order screen",
      "Offline-resilient architecture — Firestore local cache lets reps capture orders without signal",
      "BLoC-driven state across all modules — predictable, testable UI logic throughout",
      "Full Arabic ↔ English localisation for Egypt and GCC market deployment",
    ],
    dashboardFeatures: [
      {
        label: "Customer Management",
        detail:
          "Each sales rep accesses a full customer directory filtered to their assigned territory. Tapping a customer surfaces contact details, last visit date, open orders, total spend, and current credit status — all streamed live from Firestore so balance figures are never stale.",
        icon: "users",
      },
      {
        label: "Order Capture Flow",
        detail:
          "A guided multi-step order form lets reps search the product catalogue, add multiple line items, apply approved discount percentages, and review a live order total before submission. Completed orders are written to Firestore instantly and trigger a management notification.",
        icon: "file",
      },
      {
        label: "Live Inventory Catalogue",
        detail:
          "The product catalogue syncs stock levels from Firestore in real time. Out-of-stock SKUs are visually flagged and blocked from order selection — eliminating the back-and-forth of cancelled lines and manual stock checks via phone.",
        icon: "package",
      },
      {
        label: "Visit Logging & GPS Stamp",
        detail:
          "When a rep arrives at a customer, a single tap opens a visit session that records entry time and GPS coordinates via geolocator. Exit closes the session with duration and geo-exit stamp — giving management a verifiable field-activity audit trail.",
        icon: "map",
      },
      {
        label: "Route Planning View",
        detail:
          "The daily route screen lists all assigned customers sorted by haversine distance from the rep's current GPS position. Priority visits (e.g. overdue accounts, time-sensitive orders) are surfaced at the top with colour-coded urgency indicators.",
        icon: "route",
      },
      {
        label: "Analytics & Reporting",
        detail:
          "Management sees live dashboards of orders by rep, daily visit counts, top-selling SKUs, and territory revenue — all derived from Firestore aggregation queries. No ETL pipeline or external BI tool required; the data is always current.",
        icon: "chart",
      },
    ],
    architecture: [
      {
        label: "Presentation Layer",
        packages: "flutter_bloc · go_router · google_fonts · Plus Jakarta Sans",
        detail:
          "BLoC Cubits drive all screen state across Orders, Customers, Products, Visits, and Auth modules. go_router handles type-safe navigation with role-based route guards (rep vs. manager). The Figma prototype drove pixel-perfect widget specifications, ensuring the live app matches design intent on both iOS and Android.",
        color: "#FB923C",
      },
      {
        label: "Domain Layer",
        packages: "dartz · equatable · freezed_annotation",
        detail:
          "Pure Dart use-cases expose Either<Failure, T> return types for every business operation — SubmitOrder, FetchCustomers, LogVisit, GetInventory. Freezed value objects model all domain entities with deep equality and immutability baked in. Zero framework dependency in this layer keeps unit tests fast and isolated.",
        color: "#5BA8FF",
      },
      {
        label: "Data Layer",
        packages: "cloud_firestore · firebase_auth · geolocator · json_serializable",
        detail:
          "Repository implementations map Firestore collections (orders, customers, products, visits) to domain entities via JsonSerializable DTOs. Firestore security rules enforce territory-scoped read access per rep and admin-only write access to product and customer master data. The local Firestore cache enables offline order capture when field connectivity is poor.",
        color: "#26C6B0",
      },
      {
        label: "DI & Infrastructure",
        packages: "get_it · injectable · connectivity_plus · share_plus",
        detail:
          "GetIt + Injectable registers all blocs, use-cases, and repositories with code-generated bindings. Each ERP module (Orders, Customers, Products, Visits) has its own injectable module — enabling isolated mock injection for unit and integration tests. connectivity_plus detects signal loss and switches the UI to offline mode with a non-blocking banner.",
        color: "#A78BFA",
      },
    ],
  },
];

const SECTION_LABEL_STYLE: React.CSSProperties = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "var(--md-primary)",
};

export function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const expandedProject = PROJECTS.find((p) => p.id === expanded) ?? null;

  return (
    <section id="work" aria-label="Featured case studies and portfolio projects" style={{ backgroundColor: "var(--md-surface)", padding: "96px 0" }}>
      <div className="max-w-7xl mx-auto" style={{ padding: "0 24px" }}>
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.2, 0, 0, 1] }}
          className="flex flex-col"
          style={{ gap: "16px", marginBottom: "64px", maxWidth: "640px" }}
        >
          <span style={SECTION_LABEL_STYLE}>Case Studies</span>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 700,
              color: "var(--md-on-surface)",
              letterSpacing: "-0.025em",
              lineHeight: 1.25,
              margin: 0,
            }}
          >
            Featured Projects
          </h2>
          <p
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: "1rem",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "var(--md-on-surface-variant)",
              margin: 0,
            }}
          >
            Each project follows a Problem → Solution → Impact structure,
            demonstrating both design precision and engineering rigour.
          </p>
        </motion.div>

        {/* ── Cards Grid ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "24px" }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onExpand={() => setExpanded(project.id)}
            />
          ))}
        </div>
      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {expandedProject && (
          <ProjectModal
            project={expandedProject}
            onClose={() => setExpanded(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─────────────────── Project Card ─────────────────── */
function ProjectCard({
  project,
  index,
  onExpand,
}: {
  project: Project;
  index: number;
  onExpand: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.2, 0, 0, 1],
      }}
      className="relative overflow-hidden cursor-pointer flex flex-col"
      style={{
        borderRadius: "16px",
        background: "var(--md-surface-container-low)",
        border: "1px solid var(--md-outline-variant)",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        transition: "transform 300ms cubic-bezier(0.2,0,0,1), box-shadow 300ms cubic-bezier(0.2,0,0,1)",
        boxShadow: hovered
          ? `0 12px 48px rgba(0,0,0,0.5), 0 0 0 1px ${project.accentColor}33`
          : "0 2px 8px rgba(0,0,0,0.2)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onExpand}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onExpand()}
      aria-label={`View ${project.title} case study`}
    >
      {/* State Layer (MD3: 8% primary on hover) */}
      <div
        className="absolute inset-0 pointer-events-none z-10 rounded-[16px]"
        style={{
          backgroundColor: project.accentColor,
          opacity: hovered ? 0.06 : 0,
          transition: "opacity 300ms cubic-bezier(0.2,0,0,1)",
        }}
      />

      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ height: "240px", borderRadius: "16px 16px 0 0" }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 400ms cubic-bezier(0.2,0,0,1)",
          }}
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(13,17,23,0.8) 0%, rgba(13,17,23,0.1) 60%, transparent 100%)",
          }}
        />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span
            className="rounded-full"
            style={{
              padding: "4px 12px",
              background: "rgba(13,17,23,0.75)",
              backdropFilter: "blur(8px)",
              border: `1px solid ${project.accentColor}44`,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              color: project.accentColor,
              letterSpacing: "0.06em",
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Top-right badges */}
        <div className="absolute top-4 right-4 flex flex-col items-end" style={{ gap: "6px" }}>
          {project.liveUrl && (
            <span
              className="rounded-full flex items-center"
              style={{
                padding: "4px 10px",
                gap: "4px",
                background: `${project.accentColor}cc`,
                backdropFilter: "blur(8px)",
                border: `1px solid ${project.accentColor}`,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "0.06em",
              }}
            >
              <Globe size={9} />
              <span>LIVE</span>
            </span>
          )}
          {project.architecture && (
            <span
              className="rounded-full flex items-center"
              style={{
                padding: "4px 10px",
                gap: "4px",
                background: "rgba(13,17,23,0.75)",
                backdropFilter: "blur(8px)",
                border: `1px solid ${project.accentColor}44`,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "10px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.04em",
              }}
            >
              <Layers size={10} />
              <span>{project.id === "uk-transport" ? "App Router" : project.id === "emirates" ? "Angular + Flutter" : "Clean Arch"}</span>
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className="flex flex-col flex-1"
        style={{ padding: "24px", gap: "16px" }}
      >
        {/* Title row */}
        <div className="flex items-start justify-between" style={{ gap: "12px" }}>
          <div className="flex flex-col" style={{ gap: "4px" }}>
            <h3
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--md-on-surface)",
                letterSpacing: "-0.015em",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {project.title}
            </h3>
            <span
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                color: "var(--md-on-surface-variant)",
              }}
            >
              {project.subtitle}
            </span>
          </div>

          <div
            className="flex items-center justify-center shrink-0 rounded-xl transition-all duration-300"
            style={{
              width: "36px",
              height: "36px",
              background: hovered ? project.accentColor : "var(--md-surface-container)",
              color: hovered ? "#fff" : "var(--md-on-surface-variant)",
            }}
          >
            <ArrowUpRight size={16} />
          </div>
        </div>

        {/* Code stats row for enhanced projects */}
        {project.codeStats && (
          <div className="grid grid-cols-2" style={{ gap: "8px" }}>
            {project.codeStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col"
                style={{
                  padding: "8px 10px",
                  borderRadius: "8px",
                  background: "var(--md-surface-container)",
                  border: "1px solid var(--md-outline-variant)",
                  gap: "2px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--md-on-surface-variant)",
                  }}
                >
                  {stat.label}
                </span>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: project.accentColor,
                  }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Problem teaser */}
        <p
          style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: "13px",
            fontWeight: 400,
            lineHeight: 1.7,
            color: "var(--md-on-surface-variant)",
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.problem}
        </p>

        {/* Divider – Outline Variant, inset */}
        <div
          style={{
            height: "1px",
            background: "var(--md-outline-variant)",
            marginLeft: "0",
            marginRight: "0",
          }}
        />

        {/* Tags */}
        <div className="flex flex-wrap" style={{ gap: "6px" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full"
              style={{
                padding: "3px 10px",
                background: "var(--md-surface-container)",
                border: "1px solid var(--md-outline-variant)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                color: "var(--md-on-surface-variant)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────── Dashboard Icon Map ─────────────────── */
function DashboardIcon({ name, size = 15, color }: { name: string; size?: number; color: string }) {
  const props = { size, style: { color } };
  switch (name) {
    case "monitor":    return <Monitor {...props} />;
    case "users":      return <Users {...props} />;
    case "qr":         return <QrCode {...props} />;
    case "chart":      return <BarChart2 {...props} />;
    case "map":        return <MapPin {...props} />;
    case "bell":       return <Bell {...props} />;
    case "calendar":   return <Calendar {...props} />;
    case "star":       return <Star {...props} />;
    case "file":       return <FileText {...props} />;
    case "truck":      return <Truck {...props} />;
    case "package":    return <Package {...props} />;
    case "navigation": return <Navigation {...props} />;
    case "route":      return <Route {...props} />;
    case "camera":     return <Camera {...props} />;
    default:           return <Globe {...props} />;
  }
}

/* ─────────────────── Detail Modal ─────────────────── */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "features" | "dashboard">(
    "overview"
  );

  const hasExtendedContent = !!project.architecture;
  const hasDashboard = !!project.dashboardFeatures;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: "rgba(8,9,13,0.85)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
        className="relative overflow-hidden w-full flex flex-col"
        style={{
          maxWidth: "760px",
          maxHeight: "90vh",
          borderRadius: "24px",
          background: "var(--md-surface-container-low)",
          border: `1px solid ${project.accentColor}30`,
          boxShadow: `0 32px 96px rgba(0,0,0,0.6), 0 0 0 1px ${project.accentColor}22`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative overflow-hidden shrink-0" style={{ height: "220px" }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(13,17,23,1) 0%, rgba(13,17,23,0.4) 50%, transparent 100%)",
            }}
          />
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              width: "40px",
              height: "40px",
              background: "rgba(13,17,23,0.7)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(189,195,206,0.15)",
              color: "var(--md-on-surface)",
              cursor: "pointer",
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Title over image */}
          <div className="absolute bottom-0 left-0 right-0" style={{ padding: "20px 24px" }}>
            <div className="flex flex-wrap" style={{ gap: "6px", marginBottom: "8px" }}>
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full"
                  style={{
                    padding: "3px 10px",
                    background: "rgba(13,17,23,0.7)",
                    border: `1px solid ${project.accentColor}40`,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: project.accentColor,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-0.025em",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h2>
            <p
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: "13px",
                color: "rgba(255,255,255,0.6)",
                margin: "4px 0 0",
              }}
            >
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Tab bar (only for extended projects) */}
        {hasExtendedContent && (
          <div
            className="flex shrink-0 overflow-x-auto"
            style={{
              borderBottom: "1px solid var(--md-outline-variant)",
              padding: "0 24px",
              gap: "0",
            }}
          >
            {(
              [
                { id: "overview", label: "Overview", icon: <Target size={13} /> },
                { id: "architecture", label: "Architecture", icon: <Layers size={13} /> },
                { id: "features", label: "Features", icon: <Code2 size={13} /> },
                ...(hasDashboard ? [{ id: "dashboard", label: project.liveTabLabel ?? "Web Dashboard", icon: <Monitor size={13} /> }] : []),
              ] as { id: "overview" | "architecture" | "features" | "dashboard"; label: string; icon: React.ReactNode }[]
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center shrink-0"
                style={{
                  gap: "6px",
                  padding: "12px 16px",
                  background: "transparent",
                  border: "none",
                  borderBottom: activeTab === tab.id ? `2px solid ${project.accentColor}` : "2px solid transparent",
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  color: activeTab === tab.id ? project.accentColor : "var(--md-on-surface-variant)",
                  transition: "color 200ms, border-color 200ms",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}

            {/* Action links */}
            <div className="flex items-center ml-auto shrink-0" style={{ gap: "16px" }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                  style={{
                    gap: "5px",
                    padding: "12px 0",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: project.accentColor,
                    textDecoration: "none",
                    transition: "opacity 200ms",
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <Globe size={12} />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                  style={{
                    gap: "6px",
                    padding: "12px 0",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--md-on-surface-variant)",
                    textDecoration: "none",
                    transition: "color 200ms",
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = project.accentColor)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--md-on-surface-variant)")
                  }
                >
                  <ExternalLink size={12} />
                  Repo
                </a>
              )}
            </div>
          </div>
        )}

        {/* Scrollable body */}
        <div className="overflow-y-auto flex flex-col" style={{ padding: "28px 28px", gap: "24px" }}>

          {/* ── OVERVIEW TAB (or default for non-extended) ── */}
          {(!hasExtendedContent || activeTab === "overview") && (
            <>
              {[
                {
                  icon: <Target size={16} />,
                  label: "The Problem",
                  content: project.problem,
                  color: "#CF6679",
                },
                {
                  icon: <Zap size={16} />,
                  label: "The Solution",
                  content: project.solution,
                  color: project.accentColor,
                },
                {
                  icon: <CheckCircle size={16} />,
                  label: "The Impact",
                  content: project.impact,
                  color: "#26C6B0",
                },
              ].map((block) => (
                <div key={block.label} className="flex flex-col" style={{ gap: "10px" }}>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <span style={{ color: block.color }}>{block.icon}</span>
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: block.color,
                      }}
                    >
                      {block.label}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: 1.75,
                      color: "var(--md-on-surface-variant)",
                      margin: 0,
                      paddingLeft: "24px",
                    }}
                  >
                    {block.content}
                  </p>
                </div>
              ))}

              {/* Live Demo CTA */}
              {project.liveUrl && (
                <div
                  style={{
                    padding: "14px 18px",
                    borderRadius: "12px",
                    background: `${project.accentColor}0d`,
                    border: `1px solid ${project.accentColor}30`,
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <div
                    className="shrink-0 flex items-center justify-center rounded-xl"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: `${project.accentColor}1a`,
                      border: `1px solid ${project.accentColor}35`,
                    }}
                  >
                    <Globe size={18} style={{ color: project.accentColor }} />
                  </div>
                  <div className="flex flex-col flex-1" style={{ gap: "2px" }}>
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "var(--md-on-surface)",
                      }}
                    >
                      {project.liveLabel ?? "Web Dashboard — Live"}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "12px",
                        color: "var(--md-on-surface-variant)",
                      }}
                    >
                      {project.liveDescription ?? (
                        <>
                          Supervisor command centre at{" "}
                          <span style={{ color: project.accentColor }}>
                            {project.liveDomain ?? new URL(project.liveUrl!).hostname}
                          </span>
                        </>
                      )}
                    </span>
                  </div>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center rounded-full"
                    style={{
                      gap: "6px",
                      padding: "8px 16px",
                      background: project.accentColor,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#fff",
                      textDecoration: "none",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Globe size={12} />
                    Visit
                  </a>
                </div>
              )}
            </>
          )}

          {/* ── ARCHITECTURE TAB ── */}
          {hasExtendedContent && activeTab === "architecture" && project.architecture && (
            <div className="flex flex-col" style={{ gap: "16px" }}>
              <p
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "13px",
                  lineHeight: 1.7,
                  color: "var(--md-on-surface-variant)",
                  margin: 0,
                }}
              >
                {project.id === "uk-transport" ? (
                  <>
                    The platform is structured around{" "}
                    <span style={{ color: "var(--md-on-surface)", fontWeight: 600 }}>
                      Next.js App Router
                    </span>{" "}
                    with four independently optimised layers — presentation, rendering, data, and edge deployment — each with a single, clearly scoped responsibility.
                  </>
                ) : project.id === "emirates" ? (
                  <>
                    The platform combines an{" "}
                    <span style={{ color: "var(--md-on-surface)", fontWeight: 600 }}>
                      Angular 16 web dashboard
                    </span>{" "}
                    and a{" "}
                    <span style={{ color: "var(--md-on-surface)", fontWeight: 600 }}>
                      Flutter courier app
                    </span>
                    , unified by a shared Firestore real-time backend and Cloud Functions business logic — four independently deployable layers with zero shared code coupling.
                  </>
                ) : (
                  <>
                    The app follows strict{" "}
                    <span style={{ color: "var(--md-on-surface)", fontWeight: 600 }}>
                      Clean Architecture
                    </span>{" "}
                    with three independent layers and a GetIt/Injectable DI container — each layer is
                    tested in isolation and can evolve independently.
                  </>
                )}
              </p>

              {/* Architecture layers */}
              <div className="flex flex-col" style={{ gap: "12px" }}>
                {project.architecture.map((layer, idx) => (
                  <div
                    key={layer.label}
                    className="flex flex-col"
                    style={{
                      padding: "16px",
                      borderRadius: "12px",
                      background: "var(--md-surface-container)",
                      border: `1px solid ${layer.color}25`,
                      gap: "8px",
                    }}
                  >
                    {/* Layer header */}
                    <div className="flex items-center justify-between" style={{ gap: "8px" }}>
                      <div className="flex items-center" style={{ gap: "8px" }}>
                        <div
                          className="flex items-center justify-center rounded-md shrink-0"
                          style={{
                            width: "24px",
                            height: "24px",
                            background: `${layer.color}20`,
                            border: `1px solid ${layer.color}40`,
                            color: layer.color,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: "11px",
                            fontWeight: 700,
                          }}
                        >
                          {idx + 1}
                        </div>
                        <span
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: "13px",
                            fontWeight: 700,
                            color: layer.color,
                          }}
                        >
                          {layer.label}
                        </span>
                      </div>
                    </div>

                    {/* Packages */}
                    <div
                      style={{
                        padding: "6px 10px",
                        borderRadius: "6px",
                        background: "rgba(0,0,0,0.2)",
                        border: "1px solid var(--md-outline-variant)",
                        fontFamily: "'Roboto Mono', 'Courier New', monospace",
                        fontSize: "10px",
                        color: `${layer.color}cc`,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {layer.packages}
                    </div>

                    {/* Detail */}
                    <p
                      style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "13px",
                        lineHeight: 1.65,
                        color: "var(--md-on-surface-variant)",
                        margin: 0,
                      }}
                    >
                      {layer.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── FEATURES TAB ── */}
          {hasExtendedContent && activeTab === "features" && project.highlights && (
            <div className="flex flex-col" style={{ gap: "16px" }}>
              <p
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "13px",
                  lineHeight: 1.7,
                  color: "var(--md-on-surface-variant)",
                  margin: 0,
                }}
              >
                {project.featuresDescription ?? (
                  <>
                    The MVP ships with{" "}
                    <span style={{ color: "var(--md-on-surface)", fontWeight: 600 }}>
                      {project.highlights.length} production features
                    </span>{" "}
                    across six screen modules (auth, home, attendance, profile, admin, settings).
                  </>
                )}
              </p>

              <div className="flex flex-col" style={{ gap: "8px" }}>
                {project.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start"
                    style={{
                      gap: "12px",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      background: "var(--md-surface-container)",
                      border: "1px solid var(--md-outline-variant)",
                    }}
                  >
                    <div
                      className="shrink-0 flex items-center justify-center rounded-full"
                      style={{
                        width: "20px",
                        height: "20px",
                        background: `${project.accentColor}18`,
                        border: `1px solid ${project.accentColor}35`,
                        marginTop: "1px",
                      }}
                    >
                      <CheckCircle size={11} style={{ color: project.accentColor }} />
                    </div>
                    <span
                      style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "13px",
                        lineHeight: 1.6,
                        color: "var(--md-on-surface-variant)",
                      }}
                    >
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>

              {/* Full tech stack */}
              <div
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  background: "var(--md-surface-container)",
                  border: `1px solid ${project.accentColor}25`,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: project.accentColor,
                    display: "block",
                    marginBottom: "10px",
                  }}
                >
                  Full Tech Stack
                </span>
                <div className="flex flex-wrap" style={{ gap: "6px" }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full"
                      style={{
                        padding: "4px 12px",
                        background: `${project.accentColor}15`,
                        border: `1px solid ${project.accentColor}30`,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "11px",
                        fontWeight: 500,
                        color: project.accentColor,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── DASHBOARD TAB ── */}
          {hasExtendedContent && activeTab === "dashboard" && project.dashboardFeatures && (
            <div className="flex flex-col" style={{ gap: "20px" }}>
              {/* Header block */}
              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: "12px",
                  background: `${project.accentColor}0d`,
                  border: `1px solid ${project.accentColor}28`,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                }}
              >
                <div
                  className="shrink-0 flex items-center justify-center rounded-xl"
                  style={{
                    width: "44px",
                    height: "44px",
                    background: `${project.accentColor}1a`,
                    border: `1px solid ${project.accentColor}38`,
                  }}
                >
                  <Globe size={20} style={{ color: project.accentColor }} />
                </div>
                <div className="flex flex-col" style={{ gap: "4px" }}>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "var(--md-on-surface)",
                      }}
                    >
                      {project.liveLabel ?? "Supervisor Web Dashboard"}
                    </span>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center rounded-full"
                      style={{
                        gap: "4px",
                        padding: "3px 10px",
                        background: project.accentColor,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "#fff",
                        textDecoration: "none",
                        letterSpacing: "0.04em",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Globe size={9} />
                      LIVE
                    </a>
                  </div>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Roboto Mono', monospace",
                      fontSize: "12px",
                      color: project.accentColor,
                      textDecoration: "none",
                      opacity: 0.9,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.liveDomain ?? "tashil.sw-point.com"}
                  </a>
                  <p
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "12px",
                      lineHeight: 1.6,
                      color: "var(--md-on-surface-variant)",
                      margin: "4px 0 0",
                    }}
                  >
                    {project.liveDescription ?? "The companion admin portal shares the same Firestore backend as the Flutter mobile app — supervisors get a full browser-based command centre with no app install required."}
                  </p>
                </div>
              </div>

              {/* Feature cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "12px" }}>
                {project.dashboardFeatures.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex flex-col"
                    style={{
                      padding: "16px",
                      borderRadius: "12px",
                      background: "var(--md-surface-container)",
                      border: "1px solid var(--md-outline-variant)",
                      gap: "10px",
                    }}
                  >
                    <div className="flex items-center" style={{ gap: "10px" }}>
                      <div
                        className="shrink-0 flex items-center justify-center rounded-lg"
                        style={{
                          width: "32px",
                          height: "32px",
                          background: `${project.accentColor}18`,
                          border: `1px solid ${project.accentColor}30`,
                        }}
                      >
                        <DashboardIcon name={feature.icon} size={15} color={project.accentColor} />
                      </div>
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "var(--md-on-surface)",
                          lineHeight: 1.3,
                        }}
                      >
                        {feature.label}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "12px",
                        lineHeight: 1.65,
                        color: "var(--md-on-surface-variant)",
                        margin: 0,
                      }}
                    >
                      {feature.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl"
                style={{
                  gap: "8px",
                  padding: "14px 24px",
                  background: `${project.accentColor}15`,
                  border: `1px solid ${project.accentColor}35`,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: project.accentColor,
                  textDecoration: "none",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Globe size={14} />
                {project.liveTabLabel ? `Open ${project.liveTabLabel}` : "Open Live Dashboard"} — {project.liveDomain ?? "tashil.sw-point.com"}
                <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}