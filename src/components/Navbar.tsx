"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks } from "@/lib/site";

export function Navbar({ logoUrl }: { logoUrl?: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "glass border-b border-mist-300/70 shadow-[0_8px_30px_-18px_rgba(19,30,79,0.4)]"
          : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-20 items-center justify-between">
        <Logo src={logoUrl ?? undefined} />

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "text-navy" : "text-navy/60 hover:text-navy"
                }`}
              >
                {active && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-mist-200/80" />
                )}
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex">
          <Link
            href="/forms"
            className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-navy/20 transition-all hover:bg-navy-600 hover:shadow-navy/30"
          >
            Join HLI
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-navy transition-colors lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-mist-300/60 glass lg:hidden transition-[max-height] duration-300 ${
          open ? "max-h-[520px]" : "max-h-0"
        }`}
      >
        <div className="container-page flex flex-col gap-1 py-4">
          {navLinks.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  active ? "bg-mist-200 text-navy" : "text-navy/70 hover:bg-mist/70"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/forms"
            className="mt-2 rounded-xl bg-navy px-4 py-3 text-center text-base font-semibold text-white"
          >
            Join HLI
          </Link>
        </div>
      </div>
    </header>
  );
}
