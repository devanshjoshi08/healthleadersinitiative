"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { Instagram } from "./BrandIcons";
import Link from "next/link";
import { LogoMark } from "./Logo";
import { Botanical } from "./Botanical";
import { site as siteDefault, copy as copyDefault } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({
  site = siteDefault,
  logoUrl,
  copy = copyDefault.home,
}: {
  site?: typeof siteDefault;
  logoUrl?: string | null;
  copy?: typeof copyDefault.home;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist-200 via-mist to-white text-navy">
      {/* soft periwinkle wash (like the flyer) */}
      <div className="pointer-events-none absolute -left-28 top-16 h-96 w-96 rounded-full bg-periwinkle/25 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-4 h-[26rem] w-[26rem] rounded-full bg-periwinkle-300/30 blur-[110px] animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-aqua/15 blur-[110px]" />

      {/* botanical line-art */}
      <Botanical className="pointer-events-none absolute right-4 top-24 w-36 text-periwinkle/45 sm:w-52 lg:w-64" />
      <Botanical className="pointer-events-none absolute -left-6 bottom-8 w-32 -scale-x-100 text-periwinkle/30 sm:w-44" />

      {/* subtle grid */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full text-navy/[0.035]" aria-hidden>
        <defs>
          <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* animated EKG line */}
      <svg
        className="pointer-events-none absolute bottom-0 left-0 h-40 w-full text-periwinkle/30"
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0 110 H220 l24 -60 26 100 30 -132 26 132 24 -40 h140 l24 -50 26 90 28 -110 26 110 24 -30 H820 l24 -46 26 80 28 -90 26 90 24 -24 H1200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1200"
          style={{ animation: "dash 6s linear infinite" }}
        />
      </svg>

      <div className="container-page relative grid items-center gap-16 pt-36 pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:pt-40 lg:pb-32">
        {/* Left - copy */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-royal shadow-sm backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {site.school}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="mt-6 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-5xl md:text-6xl lg:text-[4.1rem]"
          >
            {copy.heroHeadlineLine1}
            <br />
            {copy.heroHeadlineLine2}{" "}
            <span className="bg-gradient-to-r from-royal via-periwinkle to-aqua bg-clip-text text-transparent">
              {copy.heroHeadlineAccent}
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-navy/70"
          >
            {copy.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.18 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              href="/forms"
              className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-navy/20 transition-transform hover:-translate-y-0.5"
            >
              Join HLI
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/mission"
              className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white/70 px-6 py-3 text-sm font-semibold text-navy backdrop-blur-sm transition-colors hover:border-navy/30 hover:bg-white"
            >
              Our Mission
            </Link>
          </motion.div>

          {/* join chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.24 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-navy/70"
          >
            <span className="inline-flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-royal" />
              Remind: <strong className="text-navy">{site.join.remindClassCode}</strong>
            </span>
            <span className="inline-flex items-center gap-2">
              <Instagram className="h-4 w-4 text-royal" />
              <strong className="text-navy">{site.socials.instagram.handle}</strong>
            </span>
          </motion.div>
        </div>

        {/* Right - floating meeting card */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="animate-float rounded-3xl border border-mist-300 bg-white/60 p-1.5 shadow-2xl shadow-navy/15 backdrop-blur-xl">
            <div className="rounded-[1.35rem] bg-gradient-to-br from-white to-mist p-7 text-navy">
              <div className="flex items-center justify-between">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoUrl} alt={`${site.name} logo`} className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <LogoMark className="h-12 w-12" />
                )}
                <span className="rounded-full bg-mist-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-royal">
                  Join us
                </span>
              </div>
              <h3 className="mt-6 font-serif text-2xl font-semibold">
                Weekly Meetings
              </h3>
              <p className="mt-1 text-sm text-navy/60">
                Introductions, medical games, guest speakers & more.
              </p>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-3 rounded-xl bg-mist/70 px-4 py-3">
                  <Clock className="h-4 w-4 shrink-0 text-royal" />
                  <span className="font-medium">{site.join.meeting.time}</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-mist/70 px-4 py-3">
                  <MapPin className="h-4 w-4 shrink-0 text-royal" />
                  <span className="font-medium">{site.join.meeting.room}</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-navy px-4 py-3 text-white">
                  <MessageSquare className="h-4 w-4 shrink-0 text-periwinkle-200" />
                  <span className="text-[0.82rem]">
                    Text <strong>{site.join.remindText.message}</strong> to{" "}
                    <strong>{site.join.remindText.to}</strong>
                  </span>
                </div>
              </div>

              <p className="mt-5 text-center text-xs font-medium uppercase tracking-[0.15em] text-royal/70">
                Free food · Free entry · All grades welcome
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
