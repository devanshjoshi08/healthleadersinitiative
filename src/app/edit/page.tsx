import type { Metadata } from "next";
import { isAuthed, login } from "./actions";
import { getContent, canWrite } from "@/lib/content";
import { Editor } from "./Editor";
import { LogoMark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Edit site",
  robots: { index: false, follow: false },
};

export default async function EditPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const authed = await isAuthed();
  const { error } = await searchParams;

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mist px-6">
        <form
          action={login}
          className="w-full max-w-sm rounded-3xl border border-mist-200 bg-white p-8 shadow-xl shadow-navy/5"
        >
          <div className="flex flex-col items-center text-center">
            <LogoMark className="h-14 w-14" />
            <h1 className="mt-4 font-serif text-2xl font-semibold text-navy">
              Edit your website
            </h1>
            <p className="mt-1 text-sm text-navy/60">Enter your password to continue.</p>
          </div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoFocus
            className="mt-6 w-full rounded-xl border border-mist-300 px-4 py-3 text-navy outline-none focus:border-royal"
          />
          {error && (
            <p className="mt-2 text-sm text-red-500">Wrong password, try again.</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-navy px-4 py-3 font-semibold text-white transition-colors hover:bg-navy-600"
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }

  const content = await getContent();
  const s = content.site;

  const basics = {
    orgName: s.name,
    school: s.school,
    tagline: s.tagline,
    motto: s.motto,
    description: s.description,
    contactEmail: s.contact.email,
    sponsorName: s.contact.sponsor,
    sponsorRoom: s.contact.sponsorRoom,
    instagramHandle: s.socials.instagram.handle,
    instagramUrl: s.socials.instagram.url,
    remindCode: s.join.remindClassCode,
    remindTextMessage: s.join.remindText.message,
    remindTextTo: s.join.remindText.to,
    meetingTime: s.join.meeting.time,
    meetingRoom: s.join.meeting.room,
  };

  const officers = content.officers.map((o) => ({
    name: o.name,
    role: o.role,
    grade: o.grade || "",
    bio: o.bio || "",
    image: o.image || "",
    isFacultySponsor: Boolean(o.isFaculty),
  }));

  const events = content.events.map((e) => ({
    title: e.title,
    date: e.date,
    time: e.time || "",
    location: e.location || "",
    type: e.type,
    description: e.description,
    status: e.status,
  }));

  const forms = content.forms.map((f) => ({
    title: f.title,
    description: f.description,
    url: f.href === "#" ? "" : f.href,
    cta: f.cta,
    icon: f.icon,
  }));

  const cards = [
    ...content.pillars.map((c) => ({ ...c, section: "pillar" })),
    ...content.missionValues.map((c) => ({ ...c, section: "value" })),
    ...content.highlights.map((c) => ({ ...c, section: "highlight" })),
  ];

  return (
    <Editor
      canWrite={canWrite}
      site={content.site}
      logoUrl={content.logoUrl}
      basics={basics}
      stats={content.stats}
      officers={officers}
      events={events}
      forms={forms}
      cards={cards}
      copy={content.copy}
      goals={content.goals}
      blocks={content.blocks}
      banner={content.banner}
    />
  );
}
