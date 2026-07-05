import { list, put } from "@vercel/blob";
import {
  site as defaultSite,
  stats as defaultStats,
  officers as defaultOfficers,
  events as defaultEvents,
  forms as defaultForms,
  pillars as defaultPillars,
  missionValues as defaultMissionValues,
  highlights as defaultHighlights,
  goals as defaultGoals,
  copy as defaultCopy,
  blocks as defaultBlocks,
  banner as defaultBanner,
  type Officer,
  type EventItem,
  type FormLink,
  type Copy,
  type Block,
  type Banner,
} from "@/lib/site";

/**
 * Content store backed by Vercel Blob. The on-site editor (/edit) saves a single
 * JSON file here; the site reads it and falls back to the built-in defaults in
 * site.ts for anything missing. No third-party accounts or tokens needed - the
 * BLOB_READ_WRITE_TOKEN is provisioned automatically with the linked store.
 */

export type OfficerC = Officer & { isFaculty?: boolean };
type CardItem = { icon: string; title: string; body: string };

export type SiteContent = {
  site: typeof defaultSite;
  logoUrl: string | null;
  stats: { value: string; label: string }[];
  officers: OfficerC[];
  events: EventItem[];
  forms: FormLink[];
  copy: Copy;
  pillars: CardItem[];
  missionValues: CardItem[];
  highlights: CardItem[];
  goals: string[];
  blocks: Block[];
  banner: Banner;
};

const PATH = "site-content.json";
const DEFAULT_LOGO = "/logo.jpg";

export function defaultContent(): SiteContent {
  return {
    site: defaultSite,
    logoUrl: DEFAULT_LOGO,
    stats: [...defaultStats],
    officers: defaultOfficers.map((o) => ({ ...o, isFaculty: o.role === "Faculty Sponsor" })),
    events: [...defaultEvents],
    forms: [...defaultForms],
    copy: defaultCopy,
    pillars: [...defaultPillars],
    missionValues: [...defaultMissionValues],
    highlights: [...defaultHighlights],
    goals: [...defaultGoals],
    blocks: [...defaultBlocks],
    banner: { ...defaultBanner },
  };
}

type Deep = Record<string, unknown>;
const isArr = Array.isArray;

function mergeSite(b: typeof defaultSite, s?: Deep): typeof defaultSite {
  if (!s) return b;
  const join = (s.join as Deep) || {};
  const socials = (s.socials as Deep) || {};
  const contact = (s.contact as Deep) || {};
  return {
    ...b,
    ...(s as object),
    join: {
      ...b.join,
      ...(join as object),
      meeting: { ...b.join.meeting, ...((join.meeting as object) || {}) },
      remindText: { ...b.join.remindText, ...((join.remindText as object) || {}) },
    },
    socials: {
      instagram: { ...b.socials.instagram, ...(((socials.instagram as object)) || {}) },
    },
    contact: { ...b.contact, ...(contact as object) },
  } as typeof defaultSite;
}

function mergeCopy(b: Copy, s?: Deep): Copy {
  if (!s) return b;
  const base = b as unknown as Record<string, Record<string, string>>;
  const out: Record<string, Record<string, string>> = {};
  for (const page of Object.keys(base)) {
    out[page] = { ...base[page], ...((s[page] as object) || {}) };
  }
  return out as unknown as Copy;
}

function merge(base: SiteContent, s: Partial<SiteContent>): SiteContent {
  return {
    site: mergeSite(base.site, s.site as Deep),
    logoUrl: s.logoUrl || base.logoUrl,
    stats: isArr(s.stats) ? s.stats! : base.stats,
    officers: isArr(s.officers) ? s.officers! : base.officers,
    events: isArr(s.events) ? s.events! : base.events,
    forms: isArr(s.forms) ? s.forms! : base.forms,
    pillars: isArr(s.pillars) ? s.pillars! : base.pillars,
    missionValues: isArr(s.missionValues) ? s.missionValues! : base.missionValues,
    highlights: isArr(s.highlights) ? s.highlights! : base.highlights,
    goals: isArr(s.goals) ? s.goals! : base.goals,
    blocks: isArr(s.blocks) ? s.blocks! : base.blocks,
    banner: { ...base.banner, ...((s.banner as object) || {}) },
    copy: mergeCopy(base.copy, s.copy as Deep),
  };
}

async function readStored(): Promise<Partial<SiteContent> | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { blobs } = await list({ prefix: PATH, limit: 100 });
    const blob = blobs.find((x) => x.pathname === PATH);
    if (!blob) return null;
    // Bust both the CDN cache (via ?v=uploadedAt) and Next's fetch cache
    // (no-store) so edits appear immediately.
    const bust = blob.uploadedAt ? new Date(blob.uploadedAt).getTime() : Date.now();
    const res = await fetch(`${blob.url}?v=${bust}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as Partial<SiteContent>;
  } catch {
    return null;
  }
}

/** Effective site content (stored overrides merged over defaults). */
export async function getContent(): Promise<SiteContent> {
  const base = defaultContent();
  const stored = await readStored();
  return stored ? merge(base, stored) : base;
}

/** True once the Blob store is available (so the editor can save). */
export const canWrite = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

/** Save the full content object. */
export async function saveContent(data: SiteContent): Promise<void> {
  await put(PATH, JSON.stringify(data), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

/** Upload an image file, returns its public URL. */
export async function uploadImage(file: File): Promise<string> {
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_") || "image";
  const blob = await put(`images/${Date.now()}-${safe}`, file, {
    access: "public",
    addRandomSuffix: true,
  });
  return blob.url;
}
