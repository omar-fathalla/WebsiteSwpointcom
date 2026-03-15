import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { TechStack } from "./components/TechStack";
import { Contact } from "./components/Contact";
import { useEffect } from "react";
import { projectId } from "/utils/supabase/info";

export default function App() {
  // Set SEO meta tags dynamically
  useEffect(() => {
    document.title = "Switch Point — Digital Product Studio | UI/UX & App Development";
    
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

    setMeta("description", "Switch Point is a digital product studio specializing in UI/UX design, mobile app development, and SaaS solutions. Based in Egypt & UAE.");
    setMeta("keywords", "Switch Point, UI/UX design, app development, Flutter, React, SaaS, digital agency, Egypt, UAE");
    setMeta("author", "Switch Point");
    
    // Open Graph
    setMeta("og:title", "Switch Point — Digital Product Studio", true);
    setMeta("og:description", "We craft premium digital products — from mobile apps to SaaS platforms. Based in Egypt & UAE.", true);
    setMeta("og:url", "https://www.sw-point.com", true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", "Switch Point", true);
    
    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Switch Point — Digital Product Studio");
    setMeta("twitter:description", "We craft premium digital products — from mobile apps to SaaS platforms.");

    // Add canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://www.sw-point.com";

    // Add structured data (JSON-LD)
    let jsonLd = document.querySelector('#structured-data') as HTMLScriptElement;
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.id = "structured-data";
      jsonLd.type = "application/ld+json";
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Switch Point",
      "url": "https://www.sw-point.com",
      "email": "support@sw-point.com",
      "description": "Digital product studio specializing in UI/UX design, mobile app development, and SaaS solutions.",
      "sameAs": [
        "https://www.linkedin.com/company/switchpoint",
        "https://github.com/switchpoint"
      ]
    });
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--md-surface)" }}
    >
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <TechStack />
        <Contact />
      </main>
    </div>
  );
}