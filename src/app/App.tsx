import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { TechStack } from "./components/TechStack";
import { Contact } from "./components/Contact";

export default function App() {
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
