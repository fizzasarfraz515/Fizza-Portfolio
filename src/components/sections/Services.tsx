import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import { site } from "@/data/site";

export default function Services() {
  return (
    <Section id="services" tone="dark" labelledBy="services-title">
      <SectionHeading
        id="services-title"
        dark
        title="What I Can Do"
        description="I take on freelance work in machine learning, computer vision and Python. Projects are small to medium, and I'll tell you honestly if something is outside what I can deliver."
      />

      <Reveal className="mt-14">
        <ul className="grid border-l border-t border-cream/20 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, description, icon: Icon }) => (
            <li
              key={title}
              className="group border-b border-r border-cream/20 p-8 transition-colors duration-300 hover:bg-olive"
            >
              <Icon size={30} strokeWidth={1.5} aria-hidden="true" className="text-olive-light group-hover:text-cream" />
              <h3 className="mt-8 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-3 max-w-[40ch] leading-relaxed text-cream/75 group-hover:text-cream">{description}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-12 flex flex-wrap items-center gap-4">
        <Button href="#contact" variant="light">
          Start a project
        </Button>
        <Button href={site.fiverr} external variant="outlineLight" icon={<ArrowUpRight size={18} />}>
          Hire me on Fiverr
        </Button>
      </Reveal>
    </Section>
  );
}
