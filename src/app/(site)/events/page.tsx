import type { Metadata } from "next";
import { PageHero, Section, SectionHeading, ButtonLink } from "@/components/ui";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Calendar, Clock, MapPin } from "lucide-react";
import { type EventItem } from "@/lib/site";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects & Events",
  description:
    "Upcoming projects, meetings, workshops, guest speakers, and volunteering opportunities with the Health Leaders Initiative.",
};

const statusStyle: Record<EventItem["status"], { label: string; className: string }> = {
  upcoming: { label: "Upcoming", className: "bg-aqua/15 text-aqua" },
  recurring: { label: "Recurring", className: "bg-royal/12 text-royal" },
  planning: { label: "In planning", className: "bg-mist-200 text-navy/60" },
};

export default async function EventsPage() {
  const { events, site, copy } = await getContent();
  const c = copy.events;
  const recurring = events.filter((e) => e.status === "recurring");
  const rest = events.filter((e) => e.status !== "recurring");

  return (
    <>
      <PageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
      />

      {/* Recurring highlight */}
      {recurring.map((e) => (
        <section key={e.title} className="border-b border-mist-200 bg-cream">
          <div className="container-page py-12">
            <Reveal className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-mist-200 bg-white p-8 md:flex-row md:items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-royal/12 px-3 py-1 text-xs font-semibold text-royal">
                  {e.type} · Every week
                </span>
                <h2 className="mt-3 font-serif text-2xl font-semibold text-navy">
                  {e.title}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-navy/60">
                  {e.description}
                </p>
              </div>
              <div className="space-y-2 text-sm text-navy/70">
                {e.time && (
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-royal" /> {e.time}
                  </p>
                )}
                {e.location && (
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-royal" /> {e.location}
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* Upcoming grid */}
      <Section>
        <SectionHeading
          eyebrow={c.calendarEyebrow}
          title={c.calendarTitle}
          subtitle={c.calendarSubtitle}
        />
        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((e) => {
            const s = statusStyle[e.status];
            return (
              <Reveal
                as="article"
                key={e.title}
                className="group flex flex-col rounded-2xl border border-mist-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-periwinkle-200 hover:shadow-xl hover:shadow-navy/5"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-mist-200 px-3 py-1 text-xs font-semibold text-royal">
                    {e.type}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${s.className}`}>
                    {s.label}
                  </span>
                </div>
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
                  {e.time && (
                    <p className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-royal" /> {e.time}
                    </p>
                  )}
                  {e.location && (
                    <p className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-royal" /> {e.location}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </RevealGroup>
      </Section>

      {/* CTA */}
      <Section className="bg-cream">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-2xl font-semibold text-navy sm:text-3xl">
            {c.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-navy/65">
            Dates go out first on Remind and Instagram. Join {site.join.remindClassCode}{" "}
            on Remind or text {site.join.remindText.message} to {site.join.remindText.to}{" "}
            to stay in the loop.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/forms">Sign up to volunteer</ButtonLink>
            <ButtonLink href={site.socials.instagram.url} variant="secondary" external>
              Follow {site.socials.instagram.handle}
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
