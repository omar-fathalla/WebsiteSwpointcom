import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { TechStack } from "./components/TechStack";
import { Contact } from "./components/Contact";
import { useEffect } from "react";

export default function App() {
  // Enhanced SEO meta tags
  useEffect(() => {
    document.title = "Switch Point — Digital Product Studio | UI/UX Design & App Development";
    
    const setMeta = (name: string, content: string, property?: boolean) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    // Primary meta tags
    setMeta("description", "Switch Point is a digital product studio specializing in UI/UX design, Flutter mobile apps, Angular web platforms, and Firebase backends. Based in Egypt & UAE.");
    setMeta("keywords", "Switch Point, UI/UX design, app development, Flutter, React, Angular, Firebase, SaaS, digital agency, Egypt, UAE, mobile app development, web development, Material Design 3, design system, product studio, technical project management");
    setMeta("author", "Switch Point");
    
    // Open Graph
    setMeta("og:title", "Switch Point — Digital Product Studio | UI/UX & App Development", true);
    setMeta("og:description", "We craft premium digital products — from Flutter mobile apps to Angular web platforms and Firebase backends. Based in Egypt & UAE.", true);
    setMeta("og:url", "https://www.sw-point.com", true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", "Switch Point", true);
    setMeta("og:locale", "en_US", true);
    setMeta("og:image", "https://images.unsplash.com/photo-1758186351359-66b2b268f0df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200", true);
    setMeta("og:image:width", "1200", true);
    setMeta("og:image:height", "630", true);
    setMeta("og:image:alt", "Switch Point Digital Product Studio", true);
    
    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Switch Point — Digital Product Studio | UI/UX & App Development");
    setMeta("twitter:description", "We craft premium digital products — from Flutter mobile apps to Angular web platforms and Firebase backends.");
    setMeta("twitter:image", "https://images.unsplash.com/photo-1758186351359-66b2b268f0df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200");
    setMeta("twitter:image:alt", "Switch Point Digital Product Studio");

    // Add canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://www.sw-point.com/";

    // Add structured data for creative work portfolio
    let portfolioLd = document.querySelector('#portfolio-structured-data') as HTMLScriptElement;
    if (!portfolioLd) {
      portfolioLd = document.createElement("script");
      portfolioLd.id = "portfolio-structured-data";
      portfolioLd.type = "application/ld+json";
      document.head.appendChild(portfolioLd);
    }
    portfolioLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Switch Point Portfolio — Case Studies",
      "description": "Featured digital products built by Switch Point studio",
      "numberOfItems": 4,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "CreativeWork",
            "name": "Tashil Delegate",
            "description": "Delegate attendance and field operations mobile app with QR code check-in, GPS verification, and real-time web dashboard. Built with Flutter, BLoC, Clean Architecture, and Firebase.",
            "url": "https://www.sw-point.com/#tashil",
            "creator": { "@type": "Organization", "name": "Switch Point" },
            "keywords": "Flutter, BLoC, Clean Architecture, Firebase, QR Code, Attendance Tracking"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "CreativeWork",
            "name": "Emirates Delivery Hub",
            "description": "UAE last-mile logistics platform with Angular web dashboard and Flutter courier app. Real-time GPS tracking, auto-assignment engine, and proof-of-delivery system.",
            "url": "https://www.sw-point.com/#emirates",
            "creator": { "@type": "Organization", "name": "Switch Point" },
            "keywords": "Angular, Flutter, Firebase, Logistics, UAE, Delivery Management"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "CreativeWork",
            "name": "UK Transport & Removals",
            "description": "Conversion-focused Next.js web platform for UK transport and removals company. SSG/ISR pages, real-time quote engine, and Firebase backend.",
            "url": "https://www.sw-point.com/#uk-transport",
            "creator": { "@type": "Organization", "name": "Switch Point" },
            "keywords": "Next.js, React, Firebase, SEO, UK Transport, Removals"
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "CreativeWork",
            "name": "Chapeau ERP",
            "description": "Mobile ERP system for field sales representatives with customer management, order capture, real-time inventory, and GPS visit tracking. Built with Flutter and Firebase.",
            "url": "https://www.sw-point.com/#chapeau",
            "creator": { "@type": "Organization", "name": "Switch Point" },
            "keywords": "Flutter, Firebase, ERP, Sales Force, Order Management"
          }
        }
      ]
    });

    // FAQ structured data for common questions
    let faqLd = document.querySelector('#faq-structured-data') as HTMLScriptElement;
    if (!faqLd) {
      faqLd = document.createElement("script");
      faqLd.id = "faq-structured-data";
      faqLd.type = "application/ld+json";
      document.head.appendChild(faqLd);
    }
    faqLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services does Switch Point offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Switch Point offers mobile app development (Flutter), web application development (Angular), backend engineering (Firebase), and UI/UX design (Material Design 3). We deliver end-to-end digital products from concept to deployment."
          }
        },
        {
          "@type": "Question",
          "name": "Where is Switch Point based?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Switch Point operates from Egypt and the United Arab Emirates, serving clients globally. Contact us via WhatsApp Egypt (+20 121 185 7725) or WhatsApp UAE (+971 55 871 5615)."
          }
        },
        {
          "@type": "Question",
          "name": "What technologies does Switch Point use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our core tech stack includes Flutter for cross-platform mobile apps, Angular for web platforms, Firebase (Firestore, Cloud Functions, Auth) for backends, and Material Design 3 for design systems. We also work with Next.js, React, and TypeScript."
          }
        },
        {
          "@type": "Question",
          "name": "How can I start a project with Switch Point?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can start a project by contacting us through our website contact form, emailing support@sw-point.com, or reaching out via WhatsApp. We begin with a discovery session to understand your requirements before providing a proposal."
          }
        }
      ]
    });

  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--md-surface)" }}
    >
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg"
        style={{ background: "var(--md-primary)", color: "var(--md-on-primary)" }}
      >
        Skip to main content
      </a>
      <Navigation />
      <main role="main">
        <Hero />
        <Projects />
        <TechStack />
        <Contact />
      </main>
    </div>
  );
}