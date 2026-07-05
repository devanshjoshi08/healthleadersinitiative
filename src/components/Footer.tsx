import Link from "next/link";
import { Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { Instagram } from "./BrandIcons";
import { LogoMark } from "./Logo";
import { navLinks, site as siteDefault } from "@/lib/site";

export function Footer({
  logoUrl,
  site = siteDefault,
}: {
  logoUrl?: string | null;
  site?: typeof siteDefault;
}) {
  return (
    <footer className="relative mt-24 overflow-hidden bg-navy text-mist">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-periwinkle/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-royal/30 blur-3xl" />

      <div className="container-page relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt={`${site.name} logo`} className="h-11 w-11 rounded-full object-cover" />
            ) : (
              <LogoMark className="h-11 w-11" />
            )}
            <div className="leading-tight">
              <p className="font-serif text-lg font-semibold text-white">
                Health Leaders Initiative
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-periwinkle-200">
                {site.school}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist/70">
            {site.description}
          </p>
          <Link
            href={site.socials.instagram.url}
            target="_blank"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <Instagram className="h-4 w-4" />
            {site.socials.instagram.handle}
          </Link>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-periwinkle-200">
            Explore
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-mist/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-periwinkle-200">
            Find Us
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-mist/80">
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-periwinkle-200" />
              <span>{site.join.meeting.time}</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-periwinkle-200" />
              <span>{site.join.meeting.room}</span>
            </li>
            <li className="flex items-start gap-3">
              <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-periwinkle-200" />
              <span>
                Join on Remind: <strong className="text-white">{site.join.remindClassCode}</strong>
                <br />
                or text <strong className="text-white">{site.join.remindText.message}</strong> to{" "}
                <strong className="text-white">{site.join.remindText.to}</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-periwinkle-200" />
              <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                {site.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-mist/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Health Leaders Initiative · {site.school}
          </p>
          <p className="font-medium text-mist/70">{site.motto}</p>
        </div>
      </div>
    </footer>
  );
}
