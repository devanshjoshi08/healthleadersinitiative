import type { Metadata } from "next";
import { PageHero, Section, SectionHeading, ButtonLink } from "@/components/ui";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Health Leaders Initiative, a student-led pre-med club at Cypress Woods High School preparing future healthcare leaders.",
};

export default async function AboutPage() {
  const { stats, pillars, highlights, copy } = await getContent();
  const c = copy.about;
  return (
    <>
      <PageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
      />

      {/* Intro + stats */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-current opacity-60" />
              {c.whoEyebrow}
            </span>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              {c.whoTitle}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-navy/65">
              <p>{c.whoParagraph1}</p>
              <p>{c.whoParagraph2}</p>
              <p>{c.whoParagraph3}</p>
            </div>
            <div className="mt-8">
              <ButtonLink href="/forms">{c.whoButton}</ButtonLink>
            </div>
          </Reveal>

          <RevealGroup className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <Reveal
                key={s.label}
                className="rounded-2xl border border-mist-200 bg-cream p-6 text-center"
              >
                <p className="font-serif text-3xl font-semibold text-navy sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-2 text-xs font-medium text-navy/55">{s.label}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Highlights */}
      <Section className="bg-cream">
        <SectionHeading
          eyebrow={c.highlightsEyebrow}
          title={c.highlightsTitle}
        />
        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {highlights.map((h) => (
            <Reveal
              as="article"
              key={h.title}
              className="rounded-2xl border border-mist-200 bg-white p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                <Icon name={h.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-semibold text-navy">
                {h.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-navy/60">{h.body}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* What members get */}
      <Section>
        <SectionHeading
          eyebrow={c.experienceEyebrow}
          title={c.experienceTitle}
          subtitle={c.experienceSubtitle}
        />
        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <Reveal
              as="article"
              key={p.title}
              className="rounded-2xl border border-mist-200 bg-white p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist-200 text-royal">
                <Icon name={p.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-serif text-lg font-semibold text-navy">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/60">{p.body}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
