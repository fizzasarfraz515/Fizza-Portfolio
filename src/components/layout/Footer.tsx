import { Briefcase, Github, Linkedin, Mail } from "lucide-react";
import { navLinks, site } from "@/data/site";

const socials = [
  { label: "GitHub", href: site.github, icon: Github, external: true },
  { label: "LinkedIn", href: site.linkedin, icon: Linkedin, external: true },
  { label: "Fiverr", href: site.fiverr, icon: Briefcase, external: true },
  { label: "Email", href: `mailto:${site.email}`, icon: Mail, external: false },
];

export default function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden border-t border-cream/10 bg-ink text-cream">
      <div className="container-x relative z-10 grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="font-serif text-3xl">{site.name}</p>
          <p className="mt-2 text-taupe">{site.title}</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="font-display text-sm font-semibold text-cream">Pages</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="text-taupe transition-colors hover:text-cream">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="font-display text-sm font-semibold text-cream">Elsewhere</p>
          <ul className="mt-4 space-y-2">
            {socials.map(({ label, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  className="inline-flex items-center gap-2 text-taupe transition-colors hover:text-cream"
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-x flex flex-col gap-2 py-6 text-sm text-taupe sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <a href="#home" className="transition-colors hover:text-cream">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
