"use client";

import { useState, useTransition } from "react";
import { saveAll, uploadImageAction, logout } from "./actions";
import type { SiteContent } from "@/lib/content";

type Obj = Record<string, unknown>;

const EVENT_TYPES = ["Meeting", "Workshop", "Volunteering", "Guest Speaker", "Fundraiser", "Social"];
const EVENT_STATUS = ["upcoming", "planning", "recurring"];
const CARD_SECTIONS = [
  { value: "pillar", label: "Why HLI card" },
  { value: "value", label: "Mission value" },
  { value: "highlight", label: "About highlight" },
];

function pretty(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/([0-9]+)/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

/* ---------- primitives ---------- */
function Txt({
  label,
  value,
  onChange,
  area = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  area?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-navy/50">{label}</span>
      {area ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-mist-300 px-3 py-2 text-sm text-navy outline-none focus:border-royal"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-mist-300 px-3 py-2 text-sm text-navy outline-none focus:border-royal"
        />
      )}
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  return (
    <div>
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-navy/50">{label}</span>
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-mist-300 bg-mist text-xs text-navy/40">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            "No photo"
          )}
        </div>
        <label className="cursor-pointer rounded-full border border-navy/20 px-4 py-2 text-sm font-semibold text-navy hover:bg-mist">
          {busy ? "Uploading..." : value ? "Change photo" : "Upload photo"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setBusy(true);
              const fd = new FormData();
              fd.append("file", file);
              const r = await uploadImageAction(fd);
              setBusy(false);
              if (r.ok && r.url) onChange(r.url);
              else alert(r.error || "Upload failed");
            }}
          />
        </label>
        {value && (
          <button type="button" onClick={() => onChange("")} className="text-xs font-semibold text-red-500 hover:underline">
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

function GalleryEditor({ images, onChange }: { images: string[]; onChange: (v: string[]) => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {images.filter(Boolean).map((src, i) => (
          <div key={i} className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="aspect-square w-full rounded-lg object-cover" />
            <button
              type="button"
              onClick={() => onChange(images.filter((_, j) => j !== i))}
              className="absolute right-1 top-1 rounded-full bg-white/90 px-1.5 text-xs font-bold text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <label className="mt-3 inline-block cursor-pointer rounded-full border border-navy/20 px-4 py-2 text-sm font-semibold text-navy hover:bg-mist">
        {busy ? "Uploading..." : "+ Add photo"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            setBusy(true);
            const fd = new FormData();
            fd.append("file", f);
            const r = await uploadImageAction(fd);
            setBusy(false);
            if (r.ok && r.url) onChange([...images, r.url]);
            else alert(r.error || "Upload failed");
          }}
        />
      </label>
    </div>
  );
}

function CardsEditor({
  items,
  onChange,
}: {
  items: { title: string; body: string }[];
  onChange: (v: { title: string; body: string }[]) => void;
}) {
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className="rounded-lg border border-mist-200 p-3">
          <div className="mb-2 flex justify-end">
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="text-xs font-semibold text-red-500 hover:underline">
              Remove
            </button>
          </div>
          <Txt label="Title" value={it.title} onChange={(v) => onChange(items.map((x, j) => (j === i ? { ...x, title: v } : x)))} />
          <div className="mt-2">
            <Txt label="Text" value={it.body} onChange={(v) => onChange(items.map((x, j) => (j === i ? { ...x, body: v } : x)))} area />
          </div>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, { title: "", body: "" }])} className="rounded-full border border-navy/20 px-4 py-2 text-sm font-semibold text-navy hover:bg-mist">
        + Add card
      </button>
    </div>
  );
}

function Card({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-mist-200 bg-white p-6 shadow-sm">
      <h2 className="font-serif text-xl font-semibold text-navy">{title}</h2>
      {hint && <p className="mt-1 text-sm text-navy/50">{hint}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ListEditor<T extends Obj>({
  items,
  setItems,
  blank,
  render,
  label,
}: {
  items: T[];
  setItems: (v: T[]) => void;
  blank: T;
  render: (item: T, update: (patch: Partial<T>) => void) => React.ReactNode;
  label: string;
}) {
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const copy = [...items];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    setItems(copy);
  };
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-mist-200 bg-mist/40 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-royal">
              {label} {i + 1}
            </span>
            <div className="flex items-center gap-2 text-navy/50">
              <button type="button" onClick={() => move(i, -1)} title="Move up" className="rounded px-1.5 hover:bg-mist-200">↑</button>
              <button type="button" onClick={() => move(i, 1)} title="Move down" className="rounded px-1.5 hover:bg-mist-200">↓</button>
              <button type="button" onClick={() => setItems(items.filter((_, j) => j !== i))} className="text-xs font-semibold text-red-500 hover:underline">
                Remove
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {render(item, (patch) => setItems(items.map((it, j) => (j === i ? { ...it, ...patch } : it))))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setItems([...items, { ...blank }])}
        className="rounded-full border border-navy/20 px-4 py-2 text-sm font-semibold text-navy hover:bg-mist"
      >
        + Add {label.toLowerCase()}
      </button>
    </div>
  );
}

/* ================= main ================= */
export function Editor(props: {
  canWrite: boolean;
  site: SiteContent["site"];
  logoUrl: string | null;
  basics: Record<string, string>;
  stats: { value: string; label: string }[];
  officers: Obj[];
  events: Obj[];
  forms: Obj[];
  cards: Obj[];
  copy: Record<string, Record<string, string>>;
  goals: string[];
  blocks: Obj[];
  banner: { enabled: boolean; text: string; href?: string };
}) {
  const { canWrite } = props;
  const [tab, setTab] = useState("basics");

  const [logoUrl, setLogoUrl] = useState(props.logoUrl || "");
  const [basics, setBasics] = useState(props.basics);
  const [stats, setStats] = useState(props.stats);
  const [officers, setOfficers] = useState(props.officers);
  const [events, setEvents] = useState(props.events);
  const [forms, setForms] = useState(props.forms);
  const [cards, setCards] = useState(props.cards);
  const [copy, setCopy] = useState(props.copy);
  const [goals, setGoals] = useState(props.goals);
  const [blocks, setBlocks] = useState<Obj[]>(props.blocks);
  const [banner, setBanner] = useState(props.banner);

  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const setB = (k: string, v: string) => setBasics({ ...basics, [k]: v });

  function buildContent(): SiteContent {
    const cardOf = (c: Obj) => ({
      icon: String(c.icon || "Sparkles"),
      title: String(c.title || ""),
      body: String(c.body || ""),
    });
    return {
      site: {
        ...props.site,
        name: basics.orgName,
        school: basics.school,
        tagline: basics.tagline,
        motto: basics.motto,
        description: basics.description,
        join: {
          ...props.site.join,
          remindClassCode: basics.remindCode,
          remindText: { to: basics.remindTextTo, message: basics.remindTextMessage },
          meeting: { ...props.site.join.meeting, time: basics.meetingTime, room: basics.meetingRoom },
        },
        socials: { instagram: { handle: basics.instagramHandle, url: basics.instagramUrl } },
        contact: { email: basics.contactEmail, sponsor: basics.sponsorName, sponsorRoom: basics.sponsorRoom },
      },
      logoUrl: logoUrl || null,
      stats,
      officers: officers.map((o) => ({
        name: String(o.name || ""),
        role: String(o.role || ""),
        grade: String(o.grade || ""),
        bio: String(o.bio || ""),
        image: String(o.image || ""),
        isFaculty: Boolean(o.isFacultySponsor),
      })),
      events: events.map((e) => ({
        title: String(e.title || ""),
        date: String(e.date || "TBD"),
        time: String(e.time || ""),
        location: String(e.location || ""),
        type: String(e.type || "Meeting") as SiteContent["events"][number]["type"],
        description: String(e.description || ""),
        status: String(e.status || "upcoming") as SiteContent["events"][number]["status"],
      })),
      forms: forms.map((f) => ({
        title: String(f.title || ""),
        description: String(f.description || ""),
        href: String(f.url || "") || "#",
        icon: String(f.icon || "ClipboardCheck"),
        cta: String(f.cta || "Open Form"),
      })),
      pillars: cards.filter((c) => c.section === "pillar").map(cardOf),
      missionValues: cards.filter((c) => c.section === "value").map(cardOf),
      highlights: cards.filter((c) => c.section === "highlight").map(cardOf),
      goals,
      copy: copy as unknown as SiteContent["copy"],
      blocks: blocks as unknown as SiteContent["blocks"],
      banner: {
        enabled: Boolean(banner.enabled),
        text: String(banner.text || ""),
        href: String(banner.href || ""),
      },
    };
  }

  function save() {
    start(async () => {
      const r = await saveAll(buildContent());
      setMsg({ ok: r.ok, text: r.ok ? "Saved. Your site is updating." : r.error || "Error" });
      setTimeout(() => setMsg(null), 6000);
    });
  }

  const tabs = [
    { id: "basics", label: "Basics & logo" },
    { id: "sections", label: "➕ Add sections" },
    { id: "officers", label: "Officers" },
    { id: "events", label: "Events" },
    { id: "forms", label: "Forms" },
    { id: "cards", label: "Cards" },
    { id: "text", label: "Page text" },
  ];

  const BLOCK_TYPES: { type: string; label: string }[] = [
    { type: "heading", label: "Heading" },
    { type: "text", label: "Text" },
    { type: "image", label: "Photo" },
    { type: "gallery", label: "Photo gallery" },
    { type: "button", label: "Button" },
    { type: "video", label: "YouTube video" },
    { type: "quote", label: "Quote" },
    { type: "cards", label: "Info cards" },
  ];
  const addBlock = (type: string) =>
    setBlocks([
      ...blocks,
      { id: (globalThis.crypto?.randomUUID?.() ?? String(Date.now())), type },
    ]);
  const updateBlock = (i: number, patch: Obj) =>
    setBlocks(blocks.map((b, j) => (j === i ? { ...b, ...patch } : b)));
  const moveBlock = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    const copyArr = [...blocks];
    [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]];
    setBlocks(copyArr);
  };

  return (
    <div className="min-h-screen bg-mist pb-24">
      <header className="sticky top-0 z-10 border-b border-mist-300 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <h1 className="font-serif text-lg font-semibold text-navy">Edit your website</h1>
          <div className="flex items-center gap-4 text-sm">
            <a href="/" target="_blank" className="font-semibold text-royal hover:underline">
              View live site
            </a>
            <button onClick={() => logout()} className="text-navy/60 hover:text-navy">
              Sign out
            </button>
            <button
              onClick={save}
              disabled={pending || !canWrite}
              className="rounded-full bg-navy px-5 py-2 font-semibold text-white transition-colors hover:bg-navy-600 disabled:opacity-50"
            >
              {pending ? "Saving..." : "Save all changes"}
            </button>
          </div>
        </div>
        {msg && (
          <div className={`px-6 pb-2 text-sm ${msg.ok ? "text-green-600" : "text-red-500"}`}>{msg.text}</div>
        )}
      </header>

      <div className="mx-auto max-w-4xl px-6 py-8">
        {!canWrite && (
          <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
            You can view everything here, but saving is not switched on yet.
          </div>
        )}

        <p className="mb-6 text-sm text-navy/60">
          Type over anything, add photos, then click <strong>Save all changes</strong>. Your site
          updates in a few seconds.
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                tab === t.id ? "bg-navy text-white" : "bg-white text-navy/70 hover:bg-white/70"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "basics" && (
          <div className="space-y-6">
            <Card title="Logo" hint="Upload your logo. Square images look best.">
              <ImageField label="Website logo" value={logoUrl} onChange={setLogoUrl} />
            </Card>
            <Card title="Club info">
              <div className="grid gap-4 sm:grid-cols-2">
                <Txt label="Club name" value={basics.orgName} onChange={(v) => setB("orgName", v)} />
                <Txt label="School" value={basics.school} onChange={(v) => setB("school", v)} />
                <Txt label="Tagline" value={basics.tagline} onChange={(v) => setB("tagline", v)} />
                <Txt label="Motto" value={basics.motto} onChange={(v) => setB("motto", v)} />
              </div>
              <div className="mt-4">
                <Txt label="Short description" value={basics.description} onChange={(v) => setB("description", v)} area />
              </div>
            </Card>
            <Card title="Contact & meeting">
              <div className="grid gap-4 sm:grid-cols-2">
                <Txt label="Contact email" value={basics.contactEmail} onChange={(v) => setB("contactEmail", v)} />
                <Txt label="Instagram handle" value={basics.instagramHandle} onChange={(v) => setB("instagramHandle", v)} />
                <Txt label="Instagram link" value={basics.instagramUrl} onChange={(v) => setB("instagramUrl", v)} />
                <Txt label="Faculty sponsor name" value={basics.sponsorName} onChange={(v) => setB("sponsorName", v)} />
                <Txt label="Sponsor room" value={basics.sponsorRoom} onChange={(v) => setB("sponsorRoom", v)} />
                <Txt label="Meeting time" value={basics.meetingTime} onChange={(v) => setB("meetingTime", v)} />
                <Txt label="Meeting room" value={basics.meetingRoom} onChange={(v) => setB("meetingRoom", v)} />
                <Txt label="Remind class code" value={basics.remindCode} onChange={(v) => setB("remindCode", v)} />
                <Txt label="Text-to-join message" value={basics.remindTextMessage} onChange={(v) => setB("remindTextMessage", v)} />
                <Txt label="Text-to-join number" value={basics.remindTextTo} onChange={(v) => setB("remindTextTo", v)} />
              </div>
            </Card>
            <Card title="Homepage stats">
              <ListEditor
                items={stats}
                setItems={setStats}
                label="Stat"
                blank={{ value: "", label: "" }}
                render={(item, update) => (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Txt label="Number" value={item.value} onChange={(v) => update({ value: v })} />
                    <Txt label="Label" value={item.label} onChange={(v) => update({ label: v })} />
                  </div>
                )}
              />
            </Card>
            <Card title="Announcement banner" hint="A bar at the bottom of every page. Great for a big deadline or event.">
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy">
                <input
                  type="checkbox"
                  checked={Boolean(banner.enabled)}
                  onChange={(e) => setBanner({ ...banner, enabled: e.target.checked })}
                />
                Show the banner
              </label>
              <Txt label="Banner text" value={String(banner.text || "")} onChange={(v) => setBanner({ ...banner, text: v })} />
              <div className="mt-3">
                <Txt label="Link (optional)" value={String(banner.href || "")} onChange={(v) => setBanner({ ...banner, href: v })} />
              </div>
            </Card>
          </div>
        )}

        {tab === "sections" && (
          <div className="space-y-6">
            <Card title="Add anything to your homepage" hint="Stack sections in any order. They appear near the bottom of your homepage.">
              <div className="flex flex-wrap gap-2">
                {BLOCK_TYPES.map((t) => (
                  <button
                    key={t.type}
                    type="button"
                    onClick={() => addBlock(t.type)}
                    className="rounded-full border border-navy/20 px-4 py-2 text-sm font-semibold text-navy hover:bg-mist"
                  >
                    + {t.label}
                  </button>
                ))}
              </div>
            </Card>

            {blocks.length === 0 && (
              <p className="text-center text-sm text-navy/50">No sections yet. Click a button above to add one.</p>
            )}

            {blocks.map((b, i) => {
              const type = String(b.type);
              const set = (patch: Obj) => updateBlock(i, patch);
              return (
                <Card key={String(b.id) || i} title={`${i + 1}. ${BLOCK_TYPES.find((t) => t.type === type)?.label || type}`}>
                  <div className="mb-3 flex items-center gap-2 text-navy/50">
                    <button type="button" onClick={() => moveBlock(i, -1)} className="rounded px-1.5 hover:bg-mist-200">↑</button>
                    <button type="button" onClick={() => moveBlock(i, 1)} className="rounded px-1.5 hover:bg-mist-200">↓</button>
                    <button type="button" onClick={() => setBlocks(blocks.filter((_, j) => j !== i))} className="text-xs font-semibold text-red-500 hover:underline">
                      Remove section
                    </button>
                  </div>
                  <div className="space-y-3">
                    {type === "heading" && (
                      <Txt label="Heading text" value={String(b.heading || "")} onChange={(v) => set({ heading: v })} />
                    )}
                    {type === "text" && (
                      <>
                        <Txt label="Heading (optional)" value={String(b.heading || "")} onChange={(v) => set({ heading: v })} />
                        <Txt label="Paragraph" value={String(b.body || "")} onChange={(v) => set({ body: v })} area />
                      </>
                    )}
                    {type === "image" && (
                      <>
                        <ImageField label="Photo" value={String(b.url || "")} onChange={(url) => set({ url })} />
                        <Txt label="Caption (optional)" value={String(b.caption || "")} onChange={(v) => set({ caption: v })} />
                      </>
                    )}
                    {type === "gallery" && (
                      <GalleryEditor images={(b.images as string[]) || []} onChange={(imgs) => set({ images: imgs })} />
                    )}
                    {type === "button" && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Txt label="Button text" value={String(b.label || "")} onChange={(v) => set({ label: v })} />
                        <Txt label="Link" value={String(b.href || "")} onChange={(v) => set({ href: v })} />
                      </div>
                    )}
                    {type === "video" && (
                      <Txt label="YouTube link" value={String(b.url || "")} onChange={(v) => set({ url: v })} />
                    )}
                    {type === "quote" && (
                      <>
                        <Txt label="Quote" value={String(b.body || "")} onChange={(v) => set({ body: v })} area />
                        <Txt label="Who said it (optional)" value={String(b.author || "")} onChange={(v) => set({ author: v })} />
                      </>
                    )}
                    {type === "cards" && (
                      <CardsEditor items={(b.items as { title: string; body: string }[]) || []} onChange={(items) => set({ items })} />
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {tab === "officers" && (
          <Card title="Officers" hint="Add photos, edit names and roles, reorder with the arrows.">
            <ListEditor
              items={officers}
              setItems={setOfficers}
              label="Officer"
              blank={{ name: "", role: "", grade: "", bio: "", image: "", isFacultySponsor: false }}
              render={(item, update) => (
                <>
                  <ImageField label="Photo" value={String(item.image || "")} onChange={(url) => update({ image: url })} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Txt label="Name" value={String(item.name || "")} onChange={(v) => update({ name: v })} />
                    <Txt label="Role" value={String(item.role || "")} onChange={(v) => update({ role: v })} />
                    <Txt label="Grade / class" value={String(item.grade || "")} onChange={(v) => update({ grade: v })} />
                  </div>
                  <Txt label="Short bio" value={String(item.bio || "")} onChange={(v) => update({ bio: v })} area />
                  <label className="flex items-center gap-2 text-sm text-navy/70">
                    <input
                      type="checkbox"
                      checked={Boolean(item.isFacultySponsor)}
                      onChange={(e) => update({ isFacultySponsor: e.target.checked })}
                    />
                    This is the faculty sponsor
                  </label>
                </>
              )}
            />
          </Card>
        )}

        {tab === "events" && (
          <Card title="Projects & events">
            <ListEditor
              items={events}
              setItems={setEvents}
              label="Event"
              blank={{ title: "", date: "", time: "", location: "", type: "Meeting", description: "", status: "upcoming" }}
              render={(item, update) => (
                <>
                  <Txt label="Title" value={String(item.title || "")} onChange={(v) => update({ title: v })} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Txt label="Date" value={String(item.date || "")} onChange={(v) => update({ date: v })} />
                    <Txt label="Time" value={String(item.time || "")} onChange={(v) => update({ time: v })} />
                    <Txt label="Location" value={String(item.location || "")} onChange={(v) => update({ location: v })} />
                    <label className="block">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-navy/50">Type</span>
                      <select value={String(item.type || "Meeting")} onChange={(e) => update({ type: e.target.value })} className="w-full rounded-lg border border-mist-300 px-3 py-2 text-sm text-navy">
                        {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-navy/50">Status</span>
                      <select value={String(item.status || "upcoming")} onChange={(e) => update({ status: e.target.value })} className="w-full rounded-lg border border-mist-300 px-3 py-2 text-sm text-navy">
                        {EVENT_STATUS.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </label>
                  </div>
                  <Txt label="Description" value={String(item.description || "")} onChange={(v) => update({ description: v })} area />
                </>
              )}
            />
          </Card>
        )}

        {tab === "forms" && (
          <Card title="Forms" hint="Paste your Google Form links.">
            <ListEditor
              items={forms}
              setItems={setForms}
              label="Form"
              blank={{ title: "", description: "", url: "", cta: "Open Form", icon: "ClipboardCheck" }}
              render={(item, update) => (
                <>
                  <Txt label="Title" value={String(item.title || "")} onChange={(v) => update({ title: v })} />
                  <Txt label="Description" value={String(item.description || "")} onChange={(v) => update({ description: v })} area />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Txt label="Google Form link" value={String(item.url || "")} onChange={(v) => update({ url: v })} />
                    <Txt label="Button text" value={String(item.cta || "")} onChange={(v) => update({ cta: v })} />
                  </div>
                </>
              )}
            />
          </Card>
        )}

        {tab === "cards" && (
          <Card title="Cards" hint="The Why HLI boxes, mission values, and About highlights.">
            <ListEditor
              items={cards}
              setItems={setCards}
              label="Card"
              blank={{ section: "pillar", icon: "Sparkles", title: "", body: "" }}
              render={(item, update) => (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-navy/50">Section</span>
                      <select value={String(item.section || "pillar")} onChange={(e) => update({ section: e.target.value })} className="w-full rounded-lg border border-mist-300 px-3 py-2 text-sm text-navy">
                        {CARD_SECTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </label>
                    <Txt label="Title" value={String(item.title || "")} onChange={(v) => update({ title: v })} />
                  </div>
                  <Txt label="Body" value={String(item.body || "")} onChange={(v) => update({ body: v })} area />
                </>
              )}
            />
          </Card>
        )}

        {tab === "text" && (
          <div className="space-y-6">
            {Object.entries(copy).map(([page, fields]) => (
              <Card key={page} title={`${pretty(page)} page`}>
                <div className="space-y-3">
                  {Object.entries(fields).map(([key, val]) => (
                    <Txt
                      key={key}
                      label={pretty(key)}
                      value={val}
                      area={val.length > 60}
                      onChange={(v) => setCopy({ ...copy, [page]: { ...copy[page], [key]: v } })}
                    />
                  ))}
                </div>
              </Card>
            ))}
            <Card title="Mission goals">
              <ListEditor
                items={goals.map((g) => ({ text: g }))}
                setItems={(v) => setGoals(v.map((x) => String(x.text || "")))}
                label="Goal"
                blank={{ text: "" }}
                render={(item, update) => (
                  <Txt label="Goal" value={String(item.text || "")} onChange={(v) => update({ text: v })} />
                )}
              />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
