"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Banner as BannerType } from "@/lib/site";

export function Banner({ banner }: { banner: BannerType }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!banner.enabled || !banner.text) return;
    setShow(localStorage.getItem("hli_banner") !== banner.text);
  }, [banner.enabled, banner.text]);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy text-white shadow-2xl">
      <div className="container-page flex items-center justify-center gap-4 py-3 text-sm">
        {banner.href ? (
          <Link
            href={banner.href}
            target={banner.href.startsWith("http") ? "_blank" : undefined}
            className="font-medium underline-offset-2 hover:underline"
          >
            {banner.text}
          </Link>
        ) : (
          <span className="font-medium">{banner.text}</span>
        )}
        <button
          onClick={() => {
            localStorage.setItem("hli_banner", banner.text);
            setShow(false);
          }}
          aria-label="Dismiss"
          className="absolute right-4 text-white/60 transition-colors hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
