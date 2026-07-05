import Link from "next/link";
import { Reveal } from "./Reveal";
import type { Block } from "@/lib/site";

function youtubeId(url = "") {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : "";
}

function BlockView({ block: b }: { block: Block }) {
  const align = b.align === "left" ? "text-left" : "text-center mx-auto";

  switch (b.type) {
    case "heading":
      return (
        <Reveal className={`max-w-3xl ${align}`}>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            {b.heading}
          </h2>
        </Reveal>
      );

    case "text":
      return (
        <Reveal className={`max-w-3xl ${align}`}>
          {b.heading && (
            <h2 className="font-serif text-2xl font-semibold text-navy sm:text-3xl">
              {b.heading}
            </h2>
          )}
          {(b.body || "").split(/\n{2,}/).map((p, i) => (
            <p key={i} className="mt-4 text-base leading-relaxed text-navy/70 whitespace-pre-line">
              {p}
            </p>
          ))}
        </Reveal>
      );

    case "image":
      return (
        <Reveal className="mx-auto max-w-3xl text-center">
          {b.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={b.url} alt={b.caption || ""} className="mx-auto max-h-[32rem] w-full rounded-2xl object-cover shadow-lg shadow-navy/10" />
          )}
          {b.caption && <p className="mt-3 text-sm text-navy/55">{b.caption}</p>}
        </Reveal>
      );

    case "gallery":
      return (
        <Reveal className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {(b.images || []).filter(Boolean).map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt="" className="aspect-square w-full rounded-xl object-cover shadow-sm" />
            ))}
          </div>
        </Reveal>
      );

    case "button":
      return (
        <Reveal className="text-center">
          <Link
            href={b.href || "#"}
            target={b.href?.startsWith("http") ? "_blank" : undefined}
            className="inline-flex items-center justify-center rounded-full bg-navy px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-navy/25 transition-all hover:-translate-y-0.5 hover:bg-navy-600"
          >
            {b.label || "Learn more"}
          </Link>
        </Reveal>
      );

    case "video": {
      const id = youtubeId(b.url);
      if (!id) return null;
      return (
        <Reveal className="mx-auto max-w-3xl">
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg shadow-navy/10">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${id}`}
              title="Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Reveal>
      );
    }

    case "quote":
      return (
        <Reveal className="mx-auto max-w-3xl text-center">
          <blockquote className="font-serif text-2xl font-medium leading-snug text-navy sm:text-3xl">
            &ldquo;{b.body}&rdquo;
          </blockquote>
          {b.author && (
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-royal">
              {b.author}
            </p>
          )}
        </Reveal>
      );

    case "cards":
      return (
        <Reveal className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(b.items || []).map((item, i) => (
              <div key={i} className="rounded-2xl border border-mist-200 bg-white p-7 shadow-sm">
                <h3 className="font-serif text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">{item.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      );

    default:
      return null;
  }
}

export function CustomSections({ blocks }: { blocks: Block[] }) {
  if (!blocks || blocks.length === 0) return null;
  return (
    <div className="bg-white">
      {blocks.map((b, i) => (
        <section key={b.id || i} className={i % 2 === 1 ? "bg-cream" : "bg-white"}>
          <div className="container-page py-16 sm:py-20">
            <BlockView block={b} />
          </div>
        </section>
      ))}
    </div>
  );
}
