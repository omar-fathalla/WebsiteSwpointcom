import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { WorksTeaser } from "./components/WorksTeaser";
import { Routes, Route, useLocation } from "react-router";
import { CompanyProducts } from "./components/CompanyProducts";
import { SubscriptionServices } from "./components/SubscriptionServices";
import { CartProvider } from "./context/CartContext";
import { SnackbarProvider } from "./md3/Snackbar";
import { CartDrawer } from "./components/cart/CartDrawer";
import { CheckoutModal } from "./components/cart/CheckoutModal";
import { PaymentResult } from "./components/cart/PaymentResult";
import { Contact } from "./components/Contact";
import { useEffect, useState, useCallback, lazy, Suspense } from "react";

// Code-split: /works and the legal dialog are not needed for first paint of the homepage.
const WorksPage = lazy(() => import("./pages/WorksPage").then((m) => ({ default: m.WorksPage })));
const LegalModal = lazy(() => import("./components/legal/LegalModal").then((m) => ({ default: m.LegalModal })));
 
// ─── SEO Constants ───────────────────────────────────────────────────────────
const SITE_CONFIG = {
  url: "https://www.sw-point.com",
  name: "Switch Point",
  title: "Switch Point — Digital Product Studio | UI/UX Design & App Development",
  description:
    "Switch Point is a digital product studio in Egypt & UAE. We run Tashil, Tashil Gift and Tashil Data Sharing as monthly SaaS subscriptions (billed in EGP via Paymob), and design and build Flutter apps, Angular platforms and Firebase backends for clients.",
  ogImage: "https://www.sw-point.com/og-image.png",
  keywords:
    "Switch Point, Tashil, Tashil Gift, Tashil Data Sharing, SaaS subscriptions Egypt, field workforce attendance app, UI/UX design, Flutter app development, Angular web development, Firebase backend, Material Design 3, digital product studio, Egypt, UAE, mobile app, SaaS, technical project management, product design, design system",
  author: "Switch Point",
  phones: {
    egypt: "+20-121-185-7725",
    uae: "+971-55-871-5615",
  },
  email: "support@sw-point.com",
  social: {
    linkedin: "https://www.linkedin.com/company/111152120",
    github: "https://github.com/Sw-Point",
    twitter: "@swpointstudio",
  },
};
 
// ─── Helper Functions ────────────────────────────────────────────────────────
 
/**
 * Set or update a meta tag
 */
function setMeta(
  name: string,
  content: string,
  isProperty: boolean = false
): void {
  const attr = isProperty ? "property" : "name";
  let el = document.querySelector(
    `meta[${attr}="${name}"]`
  ) as HTMLMetaElement | null;
 
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
 
  el.content = content;
}
 
/**
 * Set or update a JSON-LD structured data script
 */
function setJsonLd(id: string, data: Record<string, unknown>): void {
  let el = document.querySelector(`#${id}`) as HTMLScriptElement | null;
 
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
 
  el.textContent = JSON.stringify(data, null, 2);
}
 
/**
 * Set or update a link element
 */
function setLink(rel: string, href: string): void {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
 
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
 
  el.href = href;
}
 
// ─── Structured Data Objects ────────────────────────────────────────────────
 
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_CONFIG.name,
  alternateName: "SW Point",
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/logo.png`,
  image: SITE_CONFIG.ogImage,
  email: SITE_CONFIG.email,
  description:
    "Digital product studio specializing in UI/UX design, Flutter mobile app development, Angular web platforms, and Firebase backend engineering. Based in Egypt & UAE.",
  foundingDate: "2022",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 2, maxValue: 10 },
  areaServed: [
    { "@type": "Country", name: "Egypt" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "United Kingdom" },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.phones.egypt,
      contactType: "sales",
      areaServed: "EG",
      availableLanguage: ["English", "Arabic"],
    },
    {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.phones.uae,
      contactType: "sales",
      areaServed: "AE",
      availableLanguage: ["English", "Arabic"],
    },
  ],
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Commercial Market, Smouha",
      addressLocality: "Alexandria",
      addressCountry: "EG",
      description: "Regional Operations Headquarters",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
      description: "Commercial & Corporate Office",
    },
  ],
  sameAs: [SITE_CONFIG.social.linkedin, SITE_CONFIG.social.github],
  knowsAbout: [
    "UI/UX Design",
    "Flutter Development",
    "Angular Development",
    "Firebase Backend",
    "Material Design 3",
    "Mobile App Development",
    "Web Application Development",
    "SaaS Development",
    "Technical Project Management",
  ],
};
 
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_CONFIG.name,
  alternateName: "SW Point Digital Studio",
  url: SITE_CONFIG.url,
};
 
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  email: SITE_CONFIG.email,
  telephone: SITE_CONFIG.phones.egypt,
  image: SITE_CONFIG.ogImage,
  description:
    "Digital product studio offering UI/UX design, Flutter mobile apps, Angular web platforms, and Firebase backend engineering.",
  priceRange: "$$",
  areaServed: ["Egypt", "United Arab Emirates", "United Kingdom"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Product Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile App Development",
          description:
            "Cross-platform Flutter apps with Material Design 3, native performance on iOS and Android. We handle UI/UX, architecture (BLoC / Clean Architecture), Firebase integration, and App Store / Play Store deployment.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Application Development",
          description:
            "Angular-based web platforms with progressive web app capabilities, conversion-optimised UX, and Next.js/React options for SEO-first projects.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Backend Engineering",
          description:
            "Firebase serverless backends with Firestore, Cloud Functions, Authentication, and real-time sync. Scalable, cost-effective, and zero-infrastructure-management.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UI/UX Design",
          description:
            "Material Design 3 compliant design systems, Figma component libraries, interaction design, and accessibility-first UX research.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Technical Project Management",
          description:
            "End-to-end technical project management bridging design teams and engineering squads. Sprint planning, architecture review, and delivery ownership.",
        },
      },
    ],
  },
};
 
const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Switch Point — Products & Client Works",
  description: "In-house SaaS products offered as monthly subscriptions, plus selected client platforms built by Switch Point studio",
  numberOfItems: 6,
  itemListElement: [
    ...[
      { name: "Tashil", desc: "Field workforce & attendance platform for retail chains and their suppliers: geofenced, device-bound check-ins, live supervision and automated payroll. Flutter app + Angular web command center.", price: "83.33", unit: "per employee / month" },
      { name: "Tashil Gift", desc: "AI receipt-to-reward campaigns for FMCG brands inside retail chains: AI receipt validation, in-store games, live stock and sell-through reports.", price: "1000", unit: "per branch / month" },
      { name: "Tashil Data Sharing", desc: "Sell-in / sell-out intelligence portal for manufacturers and retail chains, offered as a flat monthly company plan.", price: "5000", unit: "flat / month" },
    ].map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: p.name,
        description: p.desc,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, Android, iOS",
        url: `${SITE_CONFIG.url}/#products`,
        publisher: { "@type": "Organization", name: SITE_CONFIG.name },
        offers: {
          "@type": "Offer",
          price: p.price,
          priceCurrency: "EGP",
          description: `Monthly subscription, ${p.unit}`,
          url: `${SITE_CONFIG.url}/#subscriptions`,
        },
      },
    })),
    ...[
      { name: "Emirates Delivery Hub — UAE Last-Mile Logistics Platform", desc: "Angular 16 web dispatcher dashboard + Flutter courier app for UAE last-mile logistics with real-time GPS tracking, auto-assignment, POD and a Firebase backend." },
      { name: "UK Transport & Removals — Conversion-Focused Web Platform", desc: "Next.js / React web platform for a UK transport and removals company with SSG/ISR pages, a real-time quote engine and a Firebase backend." },
      { name: "Chapeau ERP — Field Sales Representative System", desc: "Flutter mobile ERP for field sales reps with customer management, order capture, inventory visibility, GPS visit tracking and offline-first sync." },
    ].map((w, i) => ({
      "@type": "ListItem",
      position: i + 4,
      item: { "@type": "CreativeWork", name: w.name, description: w.desc, url: `${SITE_CONFIG.url}/works`, creator: { "@type": "Organization", name: SITE_CONFIG.name } },
    })),
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does Switch Point offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Switch Point offers mobile app development (Flutter / iOS & Android), web application development (Angular, Next.js, React), backend engineering (Firebase Firestore, Cloud Functions, Auth), UI/UX design (Material Design 3, Figma), and technical project management. We deliver end-to-end digital products from concept to deployment.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Switch Point based?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Switch Point operates from Egypt and the United Arab Emirates, serving clients globally including the UK and Europe. Contact us via WhatsApp Egypt (${SITE_CONFIG.phones.egypt}) or WhatsApp UAE (${SITE_CONFIG.phones.uae}), or email ${SITE_CONFIG.email}.`,
      },
    },
    {
      "@type": "Question",
      name: "What technologies does Switch Point specialise in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our core tech stack includes Flutter for cross-platform mobile apps, Angular 16+ for web platforms, Firebase (Firestore, Cloud Functions, Authentication) for serverless backends, and Material Design 3 for design systems. We also work with Next.js, React, TypeScript, Supabase, and Google Maps SDK.",
      },
    },
    {
      "@type": "Question",
      name: "How can I start a project with Switch Point?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Start a project by using the contact form on our website, emailing ${SITE_CONFIG.email}, or reaching out via WhatsApp. We begin with a free discovery session to understand your requirements before providing a detailed proposal and project roadmap.`,
      },
    },
    {
      "@type": "Question",
      name: "Does Switch Point build apps for both iOS and Android?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We build cross-platform mobile apps with Flutter, delivering native-performance apps for both iOS and Android from a single codebase. All apps are Material Design 3 compliant and optimised for App Store and Google Play Store submission.",
      },
    },
  ],
};
 
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_CONFIG.url}/` },
    { "@type": "ListItem", position: 2, name: "Products & Subscriptions", item: `${SITE_CONFIG.url}/#products` },
    { "@type": "ListItem", position: 3, name: "Studio Works", item: `${SITE_CONFIG.url}/works` },
    {
      "@type": "ListItem",
      position: 4,
      name: "Services",
      item: `${SITE_CONFIG.url}/works#services`,
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Contact",
      item: `${SITE_CONFIG.url}/#contact`,
    },
  ],
};
 
// ─── Main App Component ──────────────────────────────────────────────────────
 
export default function App() {
  // Wrap SEO setup in useCallback to prevent recreation
  const setupSEO = useCallback(() => {
    // Document title + description (route-specific ones are set by the route effect)
    if (window.location.pathname === "/") {
      document.title = SITE_CONFIG.title;
      setMeta("description", SITE_CONFIG.description);
    }
    setMeta("keywords", SITE_CONFIG.keywords);
    setMeta("author", SITE_CONFIG.author);
    setMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMeta("googlebot", "index, follow");
 
    // Canonical
    if (window.location.pathname === "/") setLink("canonical", `${SITE_CONFIG.url}/`);
 
    // Open Graph
    setMeta("og:type", "website", true);
    setMeta("og:url", `${SITE_CONFIG.url}/`, true);
    setMeta("og:title", SITE_CONFIG.title, true);
    setMeta("og:description", SITE_CONFIG.description, true);
    setMeta("og:image", SITE_CONFIG.ogImage, true);
    setMeta("og:image:width", "1200", true);
    setMeta("og:image:height", "630", true);
    setMeta("og:image:alt", `${SITE_CONFIG.name} — Digital Product Studio`, true);
    setMeta("og:site_name", SITE_CONFIG.name, true);
    setMeta("og:locale", "en_US", true);
 
    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:site", SITE_CONFIG.social.twitter);
    setMeta("twitter:url", `${SITE_CONFIG.url}/`);
    setMeta("twitter:title", SITE_CONFIG.title);
    setMeta("twitter:description", SITE_CONFIG.description);
    setMeta("twitter:image", SITE_CONFIG.ogImage);
    setMeta("twitter:image:alt", `${SITE_CONFIG.name} — Digital Product Studio`);
 
    // Structured Data
    setJsonLd("ld-organization", organizationSchema);
    setJsonLd("ld-website", websiteSchema);
    setJsonLd("ld-service", serviceSchema);
    setJsonLd("ld-portfolio", portfolioSchema);
    setJsonLd("ld-faq", faqSchema);
    setJsonLd("ld-breadcrumb", breadcrumbSchema);
  }, []);
  const location = useLocation();

  // Per-route title + scroll to /#section after cross-page navigation
  useEffect(() => {
    if (location.pathname.replace(/\/$/, "") === "/works") {
      document.title = "Studio Works & Services — Switch Point";
      setMeta("description", "Switch Point studio works and services: mobile, web, backend and UI/UX capabilities, our engineering process, and client platforms: LUX-Line, Emirates Delivery Hub, UK Transport & Removals, Chapeau ERP — Flutter, Angular, React and Firebase case studies.");
      setLink("canonical", `${SITE_CONFIG.url}/works`);
    } else {
      document.title = SITE_CONFIG.title;
      setMeta("description", SITE_CONFIG.description);
      setLink("canonical", `${SITE_CONFIG.url}/`);
    }
    if (location.hash) {
      const t = setTimeout(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" }), 150);
      return () => clearTimeout(t);
    }
  }, [location.pathname, location.hash]);

  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalLoaded, setLegalLoaded] = useState(false);
  useEffect(() => { if (legalModalOpen) setLegalLoaded(true); }, [legalModalOpen]);
  const [activeLegalTab, setActiveLegalTab] = useState("privacy");

  const handleOpenLegal = useCallback((tab: string) => {
    setActiveLegalTab(tab);
    setLegalModalOpen(true);
  }, []);

  // Handle URL hash changes for deep linking policies (e.g. sw-point.com/#privacy-policy)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase().replace("#", "");
      if (hash === "privacy-policy" || hash === "privacy") {
        setActiveLegalTab("privacy");
        setLegalModalOpen(true);
      } else if (hash === "refund-policy" || hash === "refund") {
        setActiveLegalTab("refund");
        setLegalModalOpen(true);
      } else if (hash === "delivery-policy" || hash === "delivery") {
        setActiveLegalTab("delivery");
        setLegalModalOpen(true);
      } else if (hash === "terms-of-service" || hash === "terms") {
        setActiveLegalTab("terms");
        setLegalModalOpen(true);
      } else if (hash === "about-us" || hash === "about-company") {
        setActiveLegalTab("about");
        setLegalModalOpen(true);
      } else if (hash === "tashil" || hash === "tashil-platform") {
        const el = document.getElementById("products");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useEffect(() => {
    setupSEO();
  }, [setupSEO]);

  return (
    <CartProvider>
    <SnackbarProvider>
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--md-sys-color-surface)", color: "var(--md-sys-color-on-surface)" }}
    >
      {/* Skip-to-content link for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg"
        style={{ background: "var(--md-sys-color-primary)", color: "var(--md-sys-color-on-primary)" }}
      >
        Skip to main content
      </a>

      <Navigation onOpenLegal={handleOpenLegal} />

      <main id="main" tabIndex={-1} role="main" className="outline-none overflow-x-clip" itemScope itemType="https://schema.org/WebPage">
        <Routes>
          <Route path="/works" element={<Suspense fallback={<div className="min-h-screen" aria-busy="true" />}><WorksPage /></Suspense>} />
          <Route
            path="*"
            element={
              <>
                <Hero />
                <CompanyProducts />
                <WorksTeaser />
                <SubscriptionServices />
              </>
            }
          />
        </Routes>
        <Contact onOpenLegal={handleOpenLegal} />
      </main>

      {legalLoaded && (
        <Suspense fallback={null}>
          <LegalModal
            isOpen={legalModalOpen}
            initialTab={activeLegalTab}
            onClose={() => setLegalModalOpen(false)}
          />
        </Suspense>
      )}
      <CartDrawer />
      <CheckoutModal />
      <PaymentResult />
    </div>
    </SnackbarProvider>
    </CartProvider>
  );
}
 
