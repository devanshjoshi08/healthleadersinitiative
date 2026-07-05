import type { Metadata } from "next";
import { PageHero, Section, SectionHeading, ButtonLink, GridPattern, MottoBand } from "@/components/ui";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { Botanical } from "@/components/Botanical";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Mission",
  description:
    "The Health Leaders Initiative mission: empowering and preparing future medical students with guidance, resources, and real-world impact.",
};

export default async function MissionPage() {
  const { site, copy, missionValues, goals } = await getContent();
  const c = copy.mission;
  return (
    <>
      <PageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
      />

      {/* Mission statement */}
      <Section>
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-6 bg-current opacity-60" />
            {c.statementEyebrow}
          </span>
          <blockquote className="mt-6 font-serif text-2xl font-medium leading-snug text-navy sm:text-3xl md:text-[2.2rem] md:leading-[1.25]">
            &ldquo;{c.statement}&rdquo;
          </blockquote>
        </Reveal>
      </Section>

      {/* Motto */}
      <MottoBand motto={site.motto} tone="navy" />

      {/* Values */}
      <section className="relative overflow-hidden bg-mist py-24 sm:py-28">
        <GridPattern className="text-navy/[0.035]" />
        <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-periwinkle/20 blur-3xl" />
        <Botanical className="pointer-events-none absolute right-0 top-12 hidden w-48 text-periwinkle/35 lg:block" />
        <div className="container-page relative">
          <SectionHeading
            eyebrow={c.valuesEyebrow}
            title={c.valuesTitle}
          />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {missionValues.map((v) => (
              <Reveal
                as="article"
                key={v.title}
                className="rounded-2xl border border-mist-200 bg-white p-7 shadow-sm"
              >
                <Icon name={v.icon} className="h-7 w-7 text-royal" />
                <h3 className="mt-5 font-serif text-lg font-semibold text-navy">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">{v.body}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Goals */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <SectionHeading
            align="left"
            eyebrow={c.goalsEyebrow}
            title={c.goalsTitle}
            subtitle={c.goalsSubtitle}
          />
          <RevealGroup className="space-y-3">
            {goals.map((g, i) => (
              <Reveal
                as="div"
                key={g}
                className="flex items-start gap-4 rounded-2xl border border-mist-200 bg-cream p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy font-serif text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-navy/70">{g}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
        <Reveal className="mt-14 text-center">
          <ButtonLink href="/forms">{c.goalsButton}</ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
