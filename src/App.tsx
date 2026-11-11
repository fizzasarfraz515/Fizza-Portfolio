import { MotionConfig } from "framer-motion";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Marquee } from "@/components/ui/Marquee";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export default function App() {
  return (
    // reducedMotion="user" turns off transform animations for people who prefer reduced motion
    <MotionConfig reducedMotion="user">
      <ErrorBoundary>
        <a
          href="#main"
          className="sr-only z-[70] bg-ink px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <Marquee />
          <About />
          <Skills />
          <Projects />
          <Services />
          <Education />
          <Contact />
        </main>
        <Footer />
      </ErrorBoundary>
    </MotionConfig>
  );
}
