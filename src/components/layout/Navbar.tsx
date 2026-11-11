import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  const active = useActiveSection(navLinks.map((l) => l.id));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  // Close the mobile menu first, then scroll. Letting the browser handle the anchor while the
  // menu collapses can cancel the scroll on some browsers.
  const goTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView(); // honours CSS scroll-behavior and scroll-padding
      window.history.replaceState(null, "", `#${id}`);
    });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-ink/10 bg-beige/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-[4.5rem]">
        <a
          href="#home"
          onClick={(e) => goTo(e, "home")}
          className="font-display text-xl font-extrabold tracking-tight"
          aria-label={`${site.name}, back to top`}
        >
          FIZZA<span className="text-olive">.</span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id} className="relative">
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block px-3.5 py-2 text-sm font-medium transition-colors ${
                      isActive ? "text-ink" : "text-ink/70 hover:text-ink"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-3.5 -bottom-0.5 h-0.5 bg-olive"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button href="#contact" size="sm" className="hidden sm:inline-flex">
            Let&rsquo;s Talk
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/30 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x pb-8 pt-2">
              <ul>
                {navLinks.map((link) => (
                  <li key={link.id} className="border-b border-ink/10">
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => goTo(e, link.id)}
                      aria-current={active === link.id ? "true" : undefined}
                      className={`flex items-center justify-between py-4 font-serif text-3xl ${
                        active === link.id ? "text-olive-dark" : "text-ink"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Button href="#contact" onClick={(e) => goTo(e as MouseEvent<HTMLAnchorElement>, "contact")} className="mt-6 w-full">
                Let&rsquo;s Talk
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-olive"
      />
    </header>
  );
}
