import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, SectionHeading } from "@/components/ui";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { ArrowRight, MessageSquare, Send } from "lucide-react";
import { Instagram } from "@/components/BrandIcons";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Forms",
  description:
    "Sign-in, membership, and volunteering forms for the Health Leaders Initiative at Cypress Woods High School.",
};

export default async function FormsPage() {
  const { forms, site, copy } = await getContent();
  const c = copy.forms;
  return (
    <>
      <PageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
      />

      <Section>
        <SectionHeading
          eyebrow={c.formsEyebrow}
          title={c.formsTitle}
          subtitle={c.formsSubtitle}
        />
        <RevealGroup className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
          {forms.map((f) => {
            const ready = Boolean(f.href && f.href !== "#");
            const inner = (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist-200 text-royal transition-colors group-hover:bg-navy group-hover:text-white">
                    <Icon name={f.icon} className="h-6 w-6" />
                  </div>
                  {!ready && (
                    <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-navy/50">
                      Link coming soon
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-serif text-xl font-semibold text-navy">
                  {f.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-navy/60">
                  {f.description}
                </p>
                <span
                  className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${
                    ready ? "text-royal" : "text-navy/40"
                  }`}
                >
                  {ready ? f.cta : "Available soon"}
                  {ready && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  )}
                </span>
              </>
            );
            const cardClass = `group flex h-full flex-col rounded-2xl border bg-white p-7 transition-all duration-300 ${
              ready
                ? "border-mist-200 hover:-translate-y-1 hover:border-periwinkle-200 hover:shadow-xl hover:shadow-navy/5"
                : "border-dashed border-mist-300"
            }`;
            return (
              <Reveal as="div" key={f.title}>
                {ready ? (
                  <Link
                    href={f.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className={cardClass}>{inner}</div>
                )}
              </Reveal>
            );
          })}
        </RevealGroup>
      </Section>

      {/* Alternate ways to join */}
      <Section className="bg-cream">
        <SectionHeading eyebrow={c.quickEyebrow} title={c.quickTitle} />
        <RevealGroup className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
          <Reveal className="rounded-2xl border border-mist-200 bg-white p-7 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-serif text-lg font-semibold text-navy">
              Join on Remind
            </h3>
            <p className="mt-2 text-sm text-navy/60">
              Add class code{" "}
              <strong className="text-navy">{site.join.remindClassCode}</strong> in the
              Remind app.
            </p>
          </Reveal>
          <Reveal className="rounded-2xl border border-mist-200 bg-white p-7 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
              <Send className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-serif text-lg font-semibold text-navy">
              Text to join
            </h3>
            <p className="mt-2 text-sm text-navy/60">
              Text <strong className="text-navy">{site.join.remindText.message}</strong>{" "}
              to <strong className="text-navy">{site.join.remindText.to}</strong>.
            </p>
          </Reveal>
          <Link
            href={site.socials.instagram.url}
            target="_blank"
            className="group rounded-2xl border border-mist-200 bg-white p-7 text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/5"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
              <Instagram className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-serif text-lg font-semibold text-navy">
              Follow on Instagram
            </h3>
            <p className="mt-2 text-sm text-navy/60">
              Follow{" "}
              <strong className="text-navy">{site.socials.instagram.handle}</strong> for
              updates & reminders.
            </p>
          </Link>
        </RevealGroup>
      </Section>
    </>
  );
}
