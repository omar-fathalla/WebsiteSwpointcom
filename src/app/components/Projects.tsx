import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Dialog } from "../md3/Dialog";
import { enter } from "../md3/motion";
import { onRovingKeyDown } from "../md3/a11y";
import { SectionHeader } from "../md3/Logo";
import { ArrowUpRight, X, CheckCircle, Zap, Target, Layers, Code2, ExternalLink, Globe, Monitor, Users, QrCode, BarChart2, MapPin, Bell, Calendar, Star, FileText, Truck, Package, Navigation, Route, Camera, Sparkles } from "lucide-react";
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
    id: "luxline",
    title: "LUX-Line Auto",
    subtitle: "Luxury Car Rental & VIP Transportation Platform",
    category: "Web Application",
    tags: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS 4",
      "Motion (Framer)",
      "Radix UI",
      "Lucide React",
      "Shadcn UI",
      "Dark Mode",
      "Interactive Fleet",
      "Instant Reservation",
    ],
    image: "/luxline-preview.png",
    problem:
      "High-end luxury automobile rentals and VIP chauffeur services require a brand presence that exudes prestige, security, and effortless booking. Standard car rental templates fail to convey white-glove luxury, lack interactive vehicle specification showcases, and present friction-filled reservation flows that turn away VIP clients.",
    solution:
      "Designed and developed a bespoke, high-performance web platform for LUX-Line Auto using React 18, Vite, and Tailwind CSS. The platform features an interactive luxury fleet showcase (Lamborghini, Rolls-Royce, Ferrari, Porsche, Maybach) with real-time vehicle specification cards, dynamic filtering, interactive photo previews, and an instant reservation workflow with direct WhatsApp VIP concierge integration. Micro-interactions powered by Motion (Framer), custom canvas particles, and smooth dark-mode aesthetics deliver a luxury showroom digital experience.",
    impact:
      "Delivers a sub-second page load time via Vite bundling and asset optimization. Interactive fleet showcases increase visitor engagement, while the instant 2-step reservation modal paired with direct WhatsApp VIP Concierge routing converts high-intent luxury rental leads seamlessly across both desktop and mobile devices.",
    accentColor: "#EAB308",
    githubUrl: "https://github.com/omar-fathalla/Luxlineauto",
    liveUrl: "https://luxe-lineauto.com/",
    liveTabLabel: "Live Website",
    liveLabel: "LUX-Line Auto — Live Platform",
    liveDescription:
      "Explore the live luxury rental showcase and VIP concierge booking experience at luxe-lineauto.com.",
    liveDomain: "luxe-lineauto.com",
    codeStats: [
      { label: "Framework", value: "React 18" },
      { label: "Styling", value: "Tailwind CSS 4" },
      { label: "Animations", value: "Motion (Framer)" },
      { label: "Platform", value: "Web (Desktop + Mobile)" },
    ],
    featuresDescription:
      "LUX-Line Auto features 8 core modules designed to deliver a high-end luxury digital showroom experience from first click to vehicle reservation.",
    highlights: [
      "Interactive Premium Fleet Showcase with real-time performance specs (0-100 km/h, V8/V12 Engine, Horsepower)",
      "Instant VIP Reservation modal with date picker, duration calculator, and white-glove delivery options",
      "Direct WhatsApp VIP Concierge routing for instant custom quotes and private chauffeur booking",
      "Custom floating particle animations & dark glassmorphism UI aesthetic tuned for luxury branding",
      "Services section detailing VIP Chauffeur, Airport Transfers, Luxury Rentals & Wedding Fleets",
      "Interactive Theme Provider supporting seamless Dark ↔ Light mode switching",
      "Full responsive design optimized for mobile, tablet, and ultra-wide luxury displays",
      "Core Web Vitals optimized with 100% client-side route transitions and zero layout shifts",
    ],
    dashboardFeatures: [
      {
        label: "Interactive Fleet Showcase",
        detail:
          "High-resolution vehicle cards displaying performance metrics, engine specifications, rental pricing, and instant booking CTA for supercar and luxury saloon fleets.",
        icon: "package",
      },
      {
        label: "Instant Reservation System",
        detail:
          "Streamlined booking modal allowing clients to select rental duration, pickup date, delivery location (Hotel, Airport, Residence), and optional chauffeur add-ons.",
        icon: "calendar",
      },
      {
        label: "VIP Concierge Integration",
        detail:
          "Direct integration with WhatsApp Business API allowing high-net-worth clients to initiate instant encrypted chats with concierge managers.",
        icon: "bell",
      },
      {
        label: "Luxury Service Spectrum",
        detail:
          "Detailed service modules for VIP Chauffeur, Executive Airport Transfers, Luxury Self-Drive, and Ceremonial / Wedding Fleet management.",
        icon: "truck",
      },
      {
        label: "Dynamic Theme Engine",
        detail:
          "Custom dark mode luxury palette with gold & neon cyan accent illumination, fully adaptable to light ambient environments.",
        icon: "monitor",
      },
      {
        label: "White-Glove Delivery Map",
        detail:
          "Interactive coverage overview showing hotel, airport, and private residence delivery zones across the UAE and regional luxury hubs.",
        icon: "map",
      },
    ],
    architecture: [
      {
        label: "Frontend Layer",
        packages: "React 18 · TypeScript · Vite · Tailwind CSS 4 · Radix UI",
        detail:
          "Built on React 18 with Vite for instantaneous HMR and sub-second production builds. Radix UI primitives ensure full accessibility across modal dialogs and dropdown menus.",
        color: "#EAB308",
      },
      {
        label: "Animation & Effects Engine",
        packages: "Motion (Framer Motion) · HTML5 Canvas Particles · Lucide Icons",
        detail:
          "Smooth scroll-driven animations and canvas particle systems create an immersive luxury ambiance without compromising 60 FPS rendering performance.",
        color: "#38BDF8",
      },
      {
        label: "Deployment & CDN",
        packages: "Firebase Hosting / Custom Domain · Edge CDN",
        detail:
          "Deployed on high-speed CDN infrastructure with SSL encryption, custom domain mapping (luxe-lineauto.com), and global edge distribution.",
        color: "#22C55E",
      },
    ],
  },
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


export function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const reduced = useReducedMotion();

  // Filter out tashil from the secondary list because Tashil has its flagship showcase at the top
  const otherProjects = PROJECTS.filter((p) => p.id !== "tashil");
  const expandedProject = PROJECTS.find((p) => p.id === expanded) ?? null;
  const [last, setLast] = useState<Project | null>(null);
  if (expandedProject && expandedProject !== last) setLast(expandedProject);

  return (
    <section id="work" aria-label="Featured case studies and portfolio projects" className="md-section bg-surface">
      <div className="md-container">
        <motion.div {...enter(reduced)} className="mb-10">
          <SectionHeader as="h3" label="Selected Studio Works" title="Other Selected Client Works"
            body="Explore additional enterprise web applications, cross-platform mobile systems, and logistics solutions engineered by Switch Point studio." />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {otherProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onExpand={() => setExpanded(project.id)} />
          ))}
        </div>
      </div>
      {last && <ProjectModal project={last} open={!!expandedProject} onClose={() => setExpanded(null)} />}
    </section>
  );
}

/* ─────────────────── Project Card ─────────────────── */
function ProjectCard({ project, index, onExpand }: { project: Project; index: number; onExpand: () => void }) {
  const reduced = useReducedMotion();
  return (
    <motion.article {...enter(reduced, (index % 2) * 0.05)}
      className="md-card md-card-outlined md-card-interactive state cursor-pointer flex flex-col overflow-hidden"
      onClick={onExpand} role="button" tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onExpand())}
      aria-label={`View ${project.title} case study`}>
      <div className="relative aspect-[16/9] overflow-hidden bg-surface-container-highest">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
      </div>
      <div className="flex flex-col flex-1 gap-4 p-4 md:p-6">
        <div className="flex flex-wrap gap-2">
          <span className="md-chip" style={{ height: 24, paddingInline: 8 }}>{project.category}</span>
          {project.liveUrl && (
            <span className="md-chip" style={{ height: 24, paddingInline: 8, background: "var(--md-sys-color-tertiary-container)", color: "var(--md-sys-color-on-tertiary-container)", borderColor: "transparent" }}>
              <Globe size={14} /> Live
            </span>
          )}
          {project.architecture && (
            <span className="md-chip" style={{ height: 24, paddingInline: 8, background: "var(--md-sys-color-secondary-container)", color: "var(--md-sys-color-on-secondary-container)", borderColor: "transparent" }}>
              <Layers size={14} /> {project.id === "uk-transport" ? "App Router" : project.id === "emirates" ? "Angular + Flutter" : "Clean Arch"}
            </span>
          )}
        </div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1 min-w-0">
            <h3 className="text-title-large text-on-surface">{project.title}</h3>
            <span className="text-body-medium text-on-surface-variant">{project.subtitle}</span>
          </div>
          <span className="md-icon-btn md-icon-btn-tonal shrink-0" aria-hidden="true"><ArrowUpRight /></span>
        </div>
        {project.codeStats && (
          <dl className="grid grid-cols-2 gap-2">
            {project.codeStats.map((stat) => (
              <div key={stat.label} className="rounded-[12px] px-3 py-2 bg-surface-container-high flex flex-col">
                <dt className="text-label-medium text-on-surface-variant">{stat.label}</dt>
                <dd className="text-title-small text-on-surface">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <p className="text-body-medium text-on-surface-variant line-clamp-2">{project.problem}</p>
        <hr className="md-divider mt-auto" />
        <ul className="flex flex-wrap gap-2" aria-label="Tags">
          {project.tags.map((tag) => <li key={tag} className="md-chip" style={{ height: 28 }}>{tag}</li>)}
        </ul>
      </div>
    </motion.article>
  );
}

/* ─────────────────── Dashboard Icon Map ─────────────────── */
function DashboardIcon({ name, size = 18 }: { name: string; size?: number }) {
  const props = { size };
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

const strong = (t: string) => <span className="text-on-surface" style={{ fontWeight: 500 }}>{t}</span>;

/* ─────────────────── Detail Modal ─────────────────── */
function ProjectModal({ project, open, onClose }: { project: Project; open: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "features" | "dashboard">("overview");
  const hasExtendedContent = !!project.architecture;
  const hasDashboard = !!project.dashboardFeatures;
  const tabs = [
    { id: "overview", label: "Overview", icon: <Target size={18} /> },
    { id: "architecture", label: "Architecture", icon: <Layers size={18} /> },
    { id: "features", label: "Features", icon: <Code2 size={18} /> },
    ...(hasDashboard ? [{ id: "dashboard", label: project.liveTabLabel ?? "Web Dashboard", icon: <Monitor size={18} /> }] : []),
  ] as { id: "overview" | "architecture" | "features" | "dashboard"; label: string; icon: React.ReactNode }[];

  return (
    <Dialog open={open} onClose={onClose} label={`${project.title} case study`} size="wide">
      <div className="overflow-y-auto flex flex-col md:max-w-[800px]">
        <div className="relative shrink-0 aspect-[21/9] max-h-[240px] bg-surface-container-highest">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" decoding="async" />
          <button onClick={onClose} className="md-icon-btn md-icon-btn-tonal absolute top-3 right-3" aria-label="Close"><X /></button>
        </div>
        <div className="px-6 pt-5 flex flex-col gap-2">
          <ul className="flex flex-wrap gap-2">{project.tags.slice(0, 4).map((tag) => <li key={tag} className="md-chip" style={{ height: 28 }}>{tag}</li>)}</ul>
          <h2 className="text-headline-small text-on-surface">{project.title}</h2>
          <p className="text-body-medium text-on-surface-variant">{project.subtitle}</p>
          {(project.liveUrl || project.githubUrl) && (
            <div className="flex flex-wrap gap-2 pt-1">
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="md-btn md-btn-tonal has-icon"><Globe /> Live Demo</a>}
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="md-btn md-btn-outlined has-icon"><ExternalLink /> Repo</a>}
            </div>
          )}
        </div>

        {hasExtendedContent && (
          <div role="tablist" aria-label="Case study sections" onKeyDown={onRovingKeyDown} className="md-tabs mt-4 overflow-x-auto shrink-0" style={{ justifyContent: "flex-start" }}>
            {tabs.map((tab) => (
              <button key={tab.id} role="tab" aria-selected={activeTab === tab.id} tabIndex={activeTab === tab.id ? 0 : -1} onClick={() => setActiveTab(tab.id)} className="md-tab" style={{ flex: "0 0 auto", paddingInline: 16 }}>
                <span className="md-tab-label">{tab.icon} {tab.label}</span>
              </button>
            ))}
          </div>
        )}

        <div role={hasExtendedContent ? "tabpanel" : undefined} className="flex flex-col gap-6 p-6">
          {(!hasExtendedContent || activeTab === "overview") && (
            <>
              {[
                { icon: <Target size={20} />, label: "The Problem", content: project.problem, cls: "text-error" },
                { icon: <Zap size={20} />, label: "The Solution", content: project.solution, cls: "text-primary" },
                { icon: <CheckCircle size={20} />, label: "The Impact", content: project.impact, cls: "text-tertiary" },
              ].map((block) => (
                <div key={block.label} className="flex flex-col gap-2">
                  <h3 className={`flex items-center gap-2 text-title-medium ${block.cls}`}>{block.icon}{block.label}</h3>
                  <p className="text-body-medium text-on-surface-variant pl-7">{block.content}</p>
                </div>
              ))}
              {project.liveUrl && (
                <div className="md-card md-card-filled p-4 flex items-center gap-4">
                  <span className="w-10 h-10 shrink-0 rounded-full grid place-items-center bg-primary-container text-on-primary-container"><Globe size={20} /></span>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-title-small text-on-surface">{project.liveLabel ?? "Web Dashboard — Live"}</span>
                    <span className="text-body-small text-on-surface-variant break-words">
                      {project.liveDescription ?? (<>Supervisor command centre at <span className="text-primary">{project.liveDomain ?? new URL(project.liveUrl!).hostname}</span></>)}
                    </span>
                  </div>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="md-btn md-btn-filled trailing-icon shrink-0">Visit <ArrowUpRight /></a>
                </div>
              )}
            </>
          )}

          {hasExtendedContent && activeTab === "architecture" && project.architecture && (
            <div className="flex flex-col gap-4">
              <p className="text-body-medium text-on-surface-variant">
                {project.id === "uk-transport" ? (
                  <>The platform is structured around {strong("Next.js App Router")} with four independently optimised layers — presentation, rendering, data, and edge deployment — each with a single, clearly scoped responsibility.</>
                ) : project.id === "emirates" ? (
                  <>The platform combines an {strong("Angular 16 web dashboard")} and a {strong("Flutter courier app")}, unified by a shared Firestore real-time backend and Cloud Functions business logic — four independently deployable layers with zero shared code coupling.</>
                ) : (
                  <>The app follows strict {strong("Clean Architecture")} with three independent layers and a GetIt/Injectable DI container — each layer is tested in isolation and can evolve independently.</>
                )}
              </p>
              <ol className="flex flex-col gap-3">
                {project.architecture.map((layer, idx) => (
                  <li key={layer.label} className="md-card md-card-outlined p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full grid place-items-center text-label-large bg-secondary-container text-on-secondary-container shrink-0">{idx + 1}</span>
                      <span className="text-title-small text-on-surface">{layer.label}</span>
                    </div>
                    <code className="block rounded-[8px] px-3 py-2 bg-surface-container-highest text-on-surface-variant text-body-small break-words" style={{ fontFamily: "'Roboto Mono', ui-monospace, monospace" }}>{layer.packages}</code>
                    <p className="text-body-medium text-on-surface-variant">{layer.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {hasExtendedContent && activeTab === "features" && project.highlights && (
            <div className="flex flex-col gap-4">
              <p className="text-body-medium text-on-surface-variant">
                {project.featuresDescription ?? (<>The MVP ships with {strong(`${project.highlights.length} production features`)} across six screen modules (auth, home, attendance, profile, admin, settings).</>)}
              </p>
              <ul className="md-card md-card-outlined divide-y divide-outline-variant">
                {project.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-3 px-4 py-3 text-body-medium text-on-surface-variant">
                    <CheckCircle size={20} className="shrink-0 text-primary" />{h}
                  </li>
                ))}
              </ul>
              <div className="md-card md-card-filled p-4">
                <h4 className="text-title-small text-on-surface mb-3">Full Tech Stack</h4>
                <ul className="flex flex-wrap gap-2">{project.tags.map((tag) => <li key={tag} className="md-chip">{tag}</li>)}</ul>
              </div>
            </div>
          )}

          {hasExtendedContent && activeTab === "dashboard" && project.dashboardFeatures && (
            <div className="flex flex-col gap-4">
              <div className="md-card md-card-filled p-4 flex items-start gap-4">
                <span className="w-11 h-11 shrink-0 rounded-full grid place-items-center bg-primary-container text-on-primary-container"><Globe size={20} /></span>
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-title-small text-on-surface">{project.liveLabel ?? "Supervisor Web Dashboard"}</span>
                    <span className="md-chip" style={{ height: 24, paddingInline: 8, background: "var(--md-sys-color-tertiary-container)", color: "var(--md-sys-color-on-tertiary-container)", borderColor: "transparent" }}><Globe size={14} /> Live</span>
                  </div>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-body-medium text-primary hover:underline break-all">{project.liveDomain ?? "tashil.sw-point.com"}</a>
                  <p className="text-body-small text-on-surface-variant">{project.liveDescription ?? "The companion admin portal shares the same Firestore backend as the Flutter mobile app — supervisors get a full browser-based command centre with no app install required."}</p>
                </div>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.dashboardFeatures.map((feature) => (
                  <li key={feature.label} className="md-card md-card-outlined p-4 flex gap-3">
                    <span className="w-9 h-9 shrink-0 rounded-full grid place-items-center bg-secondary-container text-on-secondary-container"><DashboardIcon name={feature.icon} /></span>
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-title-small text-on-surface">{feature.label}</span>
                      <span className="text-body-small text-on-surface-variant">{feature.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="md-btn md-btn-filled has-icon self-start" style={{ height: "auto", minHeight: 40, whiteSpace: "normal", paddingBlock: 8 }}>
                  <Globe /> {project.liveTabLabel ? `Open ${project.liveTabLabel}` : "Open Live Dashboard"} — {project.liveDomain ?? "tashil.sw-point.com"}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}
