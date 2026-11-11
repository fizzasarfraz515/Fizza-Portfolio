import type { MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "outline" | "outlineLight" | "light";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  href?: string;
  external?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: "button" | "submit";
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
  title?: string;
  ariaLabel?: string;
}

const variants: Record<Variant, string> = {
  primary: "bg-olive text-cream hover:bg-olive-dark",
  outline: "border border-ink/40 text-ink hover:border-ink hover:bg-ink hover:text-cream",
  outlineLight: "border border-cream/40 text-cream hover:border-cream hover:bg-cream hover:text-ink",
  light: "bg-cream text-ink hover:bg-taupe",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external = false,
  onClick,
  type = "button",
  disabled = false,
  icon,
  className = "",
  title,
  ariaLabel,
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold tracking-tight transition-colors duration-300";
  const sizing = size === "md" ? "px-6 py-3.5 text-[0.95rem]" : "px-4 py-2.5 text-sm";
  const state = disabled
    ? "cursor-not-allowed border border-dashed border-current opacity-60"
    : variants[variant];
  const classes = `${base} ${sizing} ${state} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          {icon}
        </span>
      ) : null}
    </>
  );

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={classes}
        title={title}
        aria-label={ariaLabel}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      title={title}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
