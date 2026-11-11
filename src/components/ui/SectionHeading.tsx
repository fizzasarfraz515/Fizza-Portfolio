import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  dark?: boolean;
  className?: string;
}

export function SectionHeading({ id, title, description, dark = false, className = "" }: SectionHeadingProps) {
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      <h2
        id={id}
        className="font-serif text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.05] tracking-tight"
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 max-w-xl text-lg leading-relaxed ${dark ? "text-cream/75" : "text-ink/75"}`}>
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
