import type { Metadata } from "next";
import { PageHero, Section, SectionHeading, ButtonLink, Avatar } from "@/components/ui";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Officer Team",
  description:
    "Meet the student leaders and faculty sponsor behind the Health Leaders Initiative at Cypress Woods High School.",
};

export default async function OfficersPage() {
  const { officers, copy } = await getContent();
  const c = copy.officers;
  const students = officers.filter((o) => !o.isFaculty);
  const faculty = officers.filter((o) => o.isFaculty);

  return (
    <>
      <PageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
      />

      <Section>
        <SectionHeading
          eyebrow={c.teamEyebrow}
          title={c.teamTitle}
          subtitle={c.teamSubtitle}
        />
        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {students.map((o) => (
            <Reveal
              as="article"
              key={o.role}
              className="group overflow-hidden rounded-2xl border border-mist-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/5"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <Avatar name={o.name} image={o.image} />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-royal">
                  {o.role}
                </p>
                <h3 className="mt-1.5 font-serif text-lg font-semibold text-navy">
                  {o.name.replace(/TODO:\s*/i, "")}
                </h3>
                {o.grade && <p className="mt-0.5 text-xs text-navy/50">{o.grade}</p>}
                {o.bio && (
                  <p className="mt-3 text-sm leading-relaxed text-navy/60">{o.bio}</p>
                )}
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {faculty.length > 0 && (
        <Section className="bg-cream">
          <SectionHeading eyebrow={c.facultyEyebrow} title={c.facultyTitle} />
          <RevealGroup className="mx-auto mt-12 max-w-2xl">
            {faculty.map((o) => (
              <Reveal
                key={o.role}
                className="flex flex-col items-center gap-6 rounded-2xl border border-mist-200 bg-white p-8 text-center sm:flex-row sm:text-left"
              >
                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full">
                  <Avatar name={o.name} image={o.image} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-royal">
                    {o.role}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl font-semibold text-navy">
                    {o.name.replace(/TODO:\s*/i, "")}
                  </h3>
                  {o.bio && <p className="mt-3 text-sm leading-relaxed text-navy/60">{o.bio}</p>}
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </Section>
      )}

      {/* Recruiting CTA */}
      <Section>
        <Reveal className="mx-auto max-w-2xl rounded-3xl border border-mist-200 bg-cream p-10 text-center">
          <h2 className="font-serif text-2xl font-semibold text-navy sm:text-3xl">
            {c.recruitTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-navy/65">{c.recruitBody}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/forms">Get involved</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact us
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
