import type { ReactNode } from "react";

type Tone = "beige" | "cream" | "dark";

interface SectionProps {
  id: string;
  tone: Tone;
  labelledBy?: string;
  children: ReactNode;
  className?: string;
}

const tones: Record<Tone, string> = {
  beige: "bg-beige text-ink grain-light",
  cream: "bg-cream text-ink grain-light",
  dark: "bg-ink text-cream grain-dark on-dark",
};

export function Section({ id, tone, labelledBy, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative isolate overflow-hidden py-24 md:py-32 ${tones[tone]} ${className}`}
    >
      <div className="container-x relative z-10">{children}</div>
    </section>
  );
}
