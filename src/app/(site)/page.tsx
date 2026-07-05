import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Icon } from "@/components/Icon";
import { Reveal, RevealGroup } from "@/components/Reveal";
import {
  Section,
  SectionHeading,
  ButtonLink,
  ArrowLink,
  Avatar,
  MottoBand,
} from "@/components/ui";
import { Botanical } from "@/components/Botanical";
import { CustomSections } from "@/components/Blocks";
import { getContent } from "@/lib/content";
import { MessageSquare, Send, Calendar, MapPin } from "lucide-react";
import { Instagram } from "@/components/BrandIcons";

export default async function HomePage() {
  const { site, stats, officers, events, logoUrl, copy, pillars, missionValues, blocks } =
    await getContent();
  const c = copy.home;
  const previewOfficers = officers.filter((o) => !o.isFaculty).slice(0, 4);
  const previewEvents = events.filter((e) => e.status !== "recurring").slice(0, 3);

  return (
    <>
      <Hero site={site} logoUrl={logoUrl} copy={c} />

      {/* Stats band */}
      <section className="border-b border-mist-200 bg-cream">
        <div className="container-page grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="text-center">
              <p className="font-serif text-4xl font-semibold text-navy sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-navy/55">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Motto */}
      <MottoBand motto={site.motto} />

      {/* What we offer */}
      <Section>
        <SectionHeading
          eyebrow={c.whyEyebrow}
          title={c.whyTitle}
          subtitle={c.whySubtitle}
        />
        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <Reveal
              as="article"
              key={p.title}
              className="group relative overflow-hidden rounded-2xl border border-mist-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-periwinkle-200 hover:shadow-xl hover:shadow-navy/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist-200 text-royal transition-colors group-hover:bg-navy group-hover:text-white">
                <Icon name={p.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-semibold text-navy">
                {p.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-navy/60">{p.body}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* Mission preview */}
      <section className="relative overflow-hidden bg-mist py-24 sm:py-28">
        <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-periwinkle/20 blur-3xl" />
        <Botanical className="pointer-events-none absolute left-2 top-10 hidden w-40 -scale-x-100 text-periwinkle/30 lg:block" />
        <div className="container-page relative grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow={c.missionEyebrow}
              title={c.missionTitle}
              subtitle={c.missionSubtitle}
            />
            <div className="mt-8">
              <ButtonLink href="/mission">{c.missionButton}</ButtonLink>
            </div>
          </div>

          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {missionValues.map((v) => (
              <Reveal
                as="article"
                key={v.title}
                className="rounded-2xl border border-mist-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-navy/5"
              >
                <Icon name={v.icon} className="h-6 w-6 text-royal" />
                <h3 className="mt-4 font-serif text-lg font-semibold text-navy">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">{v.body}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Officer preview */}
      <Section className="bg-cream">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow={c.officersEyebrow}
            title={c.officersTitle}
            subtitle={c.officersSubtitle}
          />
          <div className="hidden sm:block">
            <ArrowLink href="/officers">Meet the full team</ArrowLink>
          </div>
        </div>

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {previewOfficers.map((o) => (
            <Reveal
              as="article"
              key={o.role}
              className="group overflow-hidden rounded-2xl border border-mist-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/5"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <Avatar name={o.name} image={o.image} />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-royal">
                  {o.role}
                </p>
                <h3 className="mt-1 font-serif text-lg font-semibold text-navy">
                  {o.name.replace(/TODO:\s*/i, "")}
                </h3>
                {o.grade && <p className="mt-0.5 text-xs text-navy/50">{o.grade}</p>}
              </div>
            </Reveal>
          ))}
        </RevealGroup>
        <div className="mt-8 sm:hidden">
          <ArrowLink href="/officers">Meet the full team</ArrowLink>
        </div>
      </Section>

      {/* Events preview */}
      <Section>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow={c.eventsEyebrow}
            title={c.eventsTitle}
            subtitle={c.eventsSubtitle}
          />
          <div className="hidden sm:block">
            <ArrowLink href="/events">See all events</ArrowLink>
          </div>
        </div>

        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {previewEvents.map((e) => (
            <Reveal
              as="article"
              key={e.title}
              className="group flex flex-col rounded-2xl border border-mist-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-periwinkle-200 hover:shadow-xl hover:shadow-navy/5"
            >
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-mist-200 px-3 py-1 text-xs font-semibold text-royal">
                {e.type}
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold text-navy">
                {e.title}
              </h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-navy/60">
                {e.description}
              </p>
              <div className="mt-5 space-y-1.5 border-t border-mist-200 pt-4 text-xs text-navy/55">
                <p className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-royal" /> {e.date}
                </p>
                {e.location && (
                  <p className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-royal" /> {e.location}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </RevealGroup>
        <div className="mt-8 sm:hidden">
          <ArrowLink href="/events">See all events</ArrowLink>
        </div>
      </Section>

      {/* Custom sections added from the editor */}
      <CustomSections blocks={blocks} />

      {/* Join CTA */}
      <section className="pb-24">
        <div className="container-page">
          <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy-600 to-royal px-8 py-16 text-center text-white sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-periwinkle/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-10 h-64 w-64 rounded-full bg-aqua/20 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                {c.ctaTitle}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-mist/80">
                {c.ctaSubtitle}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <ButtonLink href="/forms" variant="light">
                  Join HLI now
                </ButtonLink>
                <Link
                  href={site.socials.instagram.url}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Instagram className="h-4 w-4" />
                  Follow {site.socials.instagram.handle}
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-mist/70">
                <span className="inline-flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-periwinkle-200" />
                  Remind code <strong className="text-white">{site.join.remindClassCode}</strong>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Send className="h-4 w-4 text-periwinkle-200" />
                  Text <strong className="text-white">{site.join.remindText.message}</strong> to{" "}
                  <strong className="text-white">{site.join.remindText.to}</strong>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
