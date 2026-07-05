import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { Botanical } from "./Botanical";

/* ---------- Buttons ---------- */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
  external?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200";
  const styles = {
    primary:
      "bg-navy text-white shadow-lg shadow-navy/25 hover:bg-navy-600 hover:shadow-navy/35 hover:-translate-y-0.5",
    secondary:
      "border border-navy/15 bg-white text-navy hover:border-navy/30 hover:bg-mist/60",
    ghost: "text-navy hover:bg-mist/70",
    light:
      "bg-white text-navy shadow-lg shadow-black/10 hover:-translate-y-0.5 hover:shadow-black/20",
  }[variant];

  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link href={href} className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </Link>
  );
}

/* ---------- Section wrapper ---------- */
export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

/* ---------- Section heading ---------- */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <Reveal
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <span className={`eyebrow ${light ? "!text-periwinkle-200" : ""}`}>
          <span className="h-px w-6 bg-current opacity-60" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1] ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            light ? "text-mist/75" : "text-navy/65"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

/* ---------- Page hero (subpage headers) ---------- */
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist-200 via-mist to-white pt-36 pb-20 text-navy sm:pb-24">
      <div className="pointer-events-none absolute -right-20 -top-10 h-80 w-80 rounded-full bg-periwinkle/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-periwinkle-300/25 blur-3xl" />
      <GridPattern className="text-navy/[0.035]" />
      <Botanical className="pointer-events-none absolute -right-2 top-20 w-40 text-periwinkle/40 sm:w-56" />
      <div className="container-page relative">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">
            <span className="h-px w-6 bg-current opacity-60" />
            {eyebrow}
          </span>
          <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight text-navy sm:text-5xl md:text-6xl md:leading-[1.05]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy/65">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Motto band ---------- */
export function MottoBand({
  motto,
  tone = "light",
}: {
  motto: string;
  tone?: "light" | "navy";
}) {
  const phrases = motto
    .split(".")
    .map((p) => p.trim())
    .filter(Boolean);

  const navy = tone === "navy";

  return (
    <div
      className={`relative overflow-hidden ${
        navy ? "bg-navy text-white" : "bg-mist"
      }`}
    >
      <div className="container-page py-10">
        <div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-0">
          {phrases.map((phrase, i) => (
            <div key={phrase} className="flex items-center">
              <span
                className={`font-serif text-xl font-semibold tracking-tight sm:text-2xl ${
                  navy ? "text-white" : "text-navy"
                }`}
              >
                {phrase}
                <span className="text-royal">.</span>
              </span>
              {i < phrases.length - 1 && (
                <span
                  className={`mx-6 hidden h-1.5 w-1.5 rotate-45 sm:inline-block ${
                    navy ? "bg-periwinkle-200" : "bg-periwinkle"
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Decorative grid ---------- */
export function GridPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M44 0H0V44" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

/* ---------- Avatar (initials fallback) ---------- */
export function Avatar({
  name,
  image,
  className = "",
}: {
  name: string;
  image?: string;
  className?: string;
}) {
  const initials = name
    .replace(/TODO:\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={image}
        alt={name}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-600 to-periwinkle font-serif text-2xl font-semibold text-white ${className}`}
    >
      {initials || "HLI"}
    </div>
  );
}

/* ---------- Inline "read more" arrow link ---------- */
export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors hover:text-navy"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
