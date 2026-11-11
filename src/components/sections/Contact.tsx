import { ArrowUpRight, Briefcase, Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { displayUrl, site } from "@/data/site";
import ContactForm from "./ContactForm";

interface Channel {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  external: boolean;
}

const channels: Channel[] = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail, external: false },
  { label: "LinkedIn", value: displayUrl(site.linkedin), href: site.linkedin, icon: Linkedin, external: true },
  { label: "GitHub", value: displayUrl(site.github), href: site.github, icon: Github, external: true },
  { label: "Fiverr", value: displayUrl(site.fiverr), href: site.fiverr, icon: Briefcase, external: true },
];

export default function Contact() {
  return (
    <Section id="contact" tone="dark" labelledBy="contact-title">
      <Reveal>
        <h2
          id="contact-title"
          className="max-w-4xl font-serif text-[clamp(2.75rem,7vw,6rem)] font-medium leading-[1.02] tracking-tight"
        >
          <span className="block">Have an Idea?</span>
          <span className="block">Let&rsquo;s Build Something.</span>
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="max-w-[44ch] text-lg leading-relaxed text-cream/80">
            Tell me what you&rsquo;re working on. I&rsquo;m open to freelance projects, collaborations and research
            conversations.
          </p>
          <ul className="mt-10 border-t border-cream/20">
            {channels.map(({ label, value, href, icon: Icon, external }) => (
              <li key={label} className="border-b border-cream/20">
                <a
                  href={href}
                  className="group flex items-center gap-4 py-5 transition-colors hover:text-olive-light"
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Icon size={22} aria-hidden="true" className="shrink-0 text-olive-light" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-taupe">{label}</span>
                    <span className="block truncate font-display text-lg font-semibold">{value}</span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    aria-hidden="true"
                    className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
