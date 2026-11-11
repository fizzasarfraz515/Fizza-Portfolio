import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { roles, site } from "@/data/site";
import HeroVisual from "./HeroVisual";

const headline = ["Building", "Intelligent", "Solutions", "Through", "Technology."];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { availability } = site;

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-beige pb-20 pt-28 grain-light md:pt-32"
    >
      {/* Background details */}
      <div aria-hidden="true" className="bg-grid absolute inset-0 z-0" />
      <div
        aria-hidden="true"
        className="absolute -right-48 top-1/2 z-0 hidden h-[760px] w-[760px] -translate-y-1/2 rounded-full border border-dashed border-taupe/70 motion-safe:animate-[spin_120s_linear_infinite] lg:block"
      />

      <div className="container-x relative z-10 grid grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2.5 border border-ink/15 bg-cream/80 px-3.5 py-2 text-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              {availability.open && (
                <span className="absolute inline-flex h-full w-full rounded-full bg-olive opacity-60 motion-safe:animate-ping" />
              )}
              <span
                className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                  availability.open ? "bg-olive" : "bg-taupe"
                }`}
              />
            </span>
            {availability.open ? availability.openLabel : availability.closedLabel}
          </motion.p>

          <h1 id="hero-title" className="mt-8">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="block font-display text-lg font-semibold text-olive-dark md:text-xl"
            >
              Hi, I&rsquo;m {site.name}.
            </motion.span>
            <span className="mt-4 block font-serif text-[clamp(2.6rem,5.4vw,4.5rem)] font-medium leading-[1.02] tracking-tight">
              {headline.map((word, i) => (
                <span key={word} className="inline-block overflow-hidden pb-[0.14em] align-bottom">
                  <motion.span
                    className="inline-block pr-[0.22em]"
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.85, delay: 0.25 + i * 0.09, ease }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80 md:text-xl"
          >
            AI Developer &amp; Machine Learning Engineer passionate about transforming ideas into
            practical, intelligent applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95, ease }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button href="#projects" icon={<ArrowDown size={18} />}>
              Explore My Work
            </Button>
            <Button href="#contact" variant="outline" icon={<ArrowUpRight size={18} />}>
              Let&rsquo;s Connect
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            aria-label="Roles"
            className="mt-12 flex max-w-2xl flex-wrap gap-x-7 gap-y-2 text-sm font-medium text-ink/80"
          >
            {roles.map((role) => (
              <li key={role} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-px w-4 bg-olive" />
                {role}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
