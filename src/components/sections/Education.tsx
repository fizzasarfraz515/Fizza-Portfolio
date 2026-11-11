import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { education } from "@/data/education";

export default function Education() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });

  return (
    <Section id="education" tone="beige" labelledBy="education-title">
      <SectionHeading id="education-title" title="Education" />

      <ol ref={ref} className="relative mt-16 max-w-4xl">
        <span aria-hidden="true" className="absolute bottom-3 left-[11px] top-3 w-px bg-ink/20" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: scrollYProgress }}
          className="absolute bottom-3 left-[11px] top-3 w-px origin-top bg-olive"
        />

        {education.map((item) => (
          <li key={item.degree} className="relative pb-14 pl-12 last:pb-0 md:pl-20">
            <span
              aria-hidden="true"
              className={`absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-olive ${
                item.current ? "bg-olive" : "bg-beige"
              }`}
            >
              {item.current && <span className="h-2 w-2 rounded-full bg-cream" />}
            </span>

            <Reveal>
              <p className="font-serif text-xl italic text-olive-dark md:text-2xl">{item.period}</p>
              <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">{item.degree}</h3>
              <p className="mt-2 text-lg text-ink/90">{item.institution}</p>
              <p className="text-ink/75">{item.detail}</p>
              {item.current && (
                <p className="mt-4 inline-block bg-olive px-3 py-1 text-sm font-semibold text-cream">
                  Currently pursuing
                </p>
              )}
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
