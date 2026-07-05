import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, SectionHeading, ButtonLink } from "@/components/ui";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Mail, MessageSquare, Send, MapPin, Clock } from "lucide-react";
import { Instagram } from "@/components/BrandIcons";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Health Leaders Initiative at Cypress Woods High School: email, Instagram, Remind, and meeting details.",
};

export default async function ContactPage() {
  const { site, copy } = await getContent();
  const c = copy.contact;
  const channels = [
    {
      icon: Mail,
      title: "Email us",
      body: site.contact.email,
      href: `mailto:${site.contact.email}`,
      cta: "Send an email",
    },
    {
      icon: Instagram,
      title: "Instagram",
      body: `Follow ${site.socials.instagram.handle}`,
      href: site.socials.instagram.url,
      cta: "Open Instagram",
      external: true,
    },
    {
      icon: MessageSquare,
      title: "Remind",
      body: `Join class code ${site.join.remindClassCode}, or text ${site.join.remindText.message} to ${site.join.remindText.to}`,
      cta: "How to join",
      href: "/forms",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
      />

      <Section>
        <RevealGroup className="grid gap-6 md:grid-cols-3">
          {channels.map((c) => {
            const CIcon = c.icon;
            return (
              <Reveal
                as="article"
                key={c.title}
                className="flex flex-col rounded-2xl border border-mist-200 bg-white p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                  <CIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-semibold text-navy">
                  {c.title}
                </h3>
                <p className="mt-2 flex-1 break-words text-sm leading-relaxed text-navy/60">
                  {c.body}
                </p>
                <Link
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-royal transition-colors hover:text-navy"
                >
                  {c.cta}
                </Link>
              </Reveal>
            );
          })}
        </RevealGroup>
      </Section>

      {/* Meeting info + quick join */}
      <Section className="bg-cream">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow={c.meetEyebrow}
              title={c.meetTitle}
              subtitle={c.meetSubtitle}
            />
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4 rounded-2xl border border-mist-200 bg-white p-5">
                <Clock className="h-5 w-5 shrink-0 text-royal" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-royal">
                    Time
                  </p>
                  <p className="text-navy">{site.join.meeting.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-mist-200 bg-white p-5">
                <MapPin className="h-5 w-5 shrink-0 text-royal" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-royal">
                    Location
                  </p>
                  <p className="text-navy">{site.join.meeting.room}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-mist-200 bg-white p-5">
                <Mail className="h-5 w-5 shrink-0 text-royal" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-royal">
                    Faculty sponsor
                  </p>
                  <p className="text-navy">
                    {site.contact.sponsor} · {site.contact.sponsorRoom}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick-join card */}
          <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy-600 to-royal p-10 text-white">
            <div className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-periwinkle/30 blur-3xl" />
            <h3 className="relative font-serif text-2xl font-semibold">
              {c.quickTitle}
            </h3>
            <p className="relative mt-3 text-mist/75">{c.quickSubtitle}</p>
            <div className="relative mt-8 space-y-4">
              <div className="flex items-center gap-3 rounded-xl bg-white/10 px-5 py-4 backdrop-blur-sm">
                <MessageSquare className="h-5 w-5 shrink-0 text-periwinkle-200" />
                <span className="text-sm">
                  Remind class code:{" "}
                  <strong className="text-white">{site.join.remindClassCode}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/10 px-5 py-4 backdrop-blur-sm">
                <Send className="h-5 w-5 shrink-0 text-periwinkle-200" />
                <span className="text-sm">
                  Text <strong className="text-white">{site.join.remindText.message}</strong>{" "}
                  to <strong className="text-white">{site.join.remindText.to}</strong>
                </span>
              </div>
            </div>
            <div className="relative mt-8">
              <ButtonLink href="/forms" variant="light">
                Go to forms
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
