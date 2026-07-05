import Link from "next/link";
import { site } from "@/lib/site";

/**
 * HLI badge - a faithful recreation of the circular Health Leaders Initiative
 * logo (navy + periwinkle: laurel, medical cross, HL monogram + rod of
 * Asclepius, "HEALTH LEADERS / INITIATIVE", first-aid kit, "AT CY-WOODS").
 *
 * This is the default. Once a real logo image is supplied (via the CMS or a
 * file), pass `src` to <Logo> to render it instead.
 */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  const navy = "#131e4f";
  const peri = "#6a7ed8";
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {/* badge */}
      <circle cx="100" cy="100" r="97" fill="#eaedfb" stroke={navy} strokeWidth="3.5" />
      <circle cx="100" cy="100" r="87" fill="none" stroke="#98a6e6" strokeWidth="1.4" />

      {/* top medical cross */}
      <g fill={navy}>
        <rect x="94" y="21" width="12" height="27" rx="2.5" />
        <rect x="86.5" y="28.5" width="27" height="12" rx="2.5" />
      </g>

      {/* top laurel sprigs */}
      <g fill={peri} opacity="0.85">
        {[0, 1, 2].map((i) => (
          <ellipse key={`tl${i}`} cx={74 - i * 9} cy={34 + i * 3} rx="5" ry="2.4" transform={`rotate(${-25 - i * 8} ${74 - i * 9} ${34 + i * 3})`} />
        ))}
        {[0, 1, 2].map((i) => (
          <ellipse key={`tr${i}`} cx={126 + i * 9} cy={34 + i * 3} rx="5" ry="2.4" transform={`rotate(${25 + i * 8} ${126 + i * 9} ${34 + i * 3})`} />
        ))}
      </g>

      {/* HL monogram */}
      <text x="60" y="120" fontFamily="Georgia, 'Times New Roman', serif" fontSize="56" fontWeight="700" fill={navy}>
        HL
      </text>

      {/* rod of Asclepius (the implied "I") */}
      <circle cx="137" cy="74" r="4" fill={navy} />
      <line x1="137" y1="76" x2="137" y2="126" stroke={navy} strokeWidth="3.2" strokeLinecap="round" />
      <path
        d="M137 82 C128 88 146 95 137 101 C128 107 146 114 137 120"
        fill="none"
        stroke={peri}
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* divider */}
      <line x1="54" y1="132" x2="146" y2="132" stroke={navy} strokeWidth="1.2" />

      {/* wordmark */}
      <text x="100" y="147" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13.5" fontWeight="700" fill={navy} letterSpacing="0.3">
        HEALTH LEADERS
      </text>
      <text x="100" y="159" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fill={peri} letterSpacing="3.2">
        INITIATIVE
      </text>

      {/* first-aid kit */}
      <g>
        <rect x="88" y="163" width="24" height="14.5" rx="2.5" fill="none" stroke={navy} strokeWidth="1.8" />
        <rect x="95" y="160" width="10" height="4" rx="1.4" fill="none" stroke={navy} strokeWidth="1.8" />
        <g fill={peri}>
          <rect x="98.6" y="166" width="2.8" height="9" rx="1" />
          <rect x="95.6" y="169" width="8.8" height="3" rx="1" />
        </g>
      </g>

      {/* bottom laurel + AT CY-WOODS */}
      <g fill={peri} opacity="0.85">
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={`bl${i}`} cx={60 - i * 8} cy={176 - i * 6} rx="4.6" ry="2.2" transform={`rotate(${55 - i * 6} ${60 - i * 8} ${176 - i * 6})`} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={`br${i}`} cx={140 + i * 8} cy={176 - i * 6} rx="4.6" ry="2.2" transform={`rotate(${-55 + i * 6} ${140 + i * 8} ${176 - i * 6})`} />
        ))}
      </g>
      <text x="100" y="190" textAnchor="middle" fontFamily="Georgia, serif" fontSize="8.5" fontWeight="700" fill={navy} letterSpacing="1.6">
        AT CY-WOODS
      </text>
    </svg>
  );
}

export function Logo({ light = false, src }: { light?: boolean; src?: string }) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${site.name} logo`}
          className="h-11 w-11 shrink-0 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <LogoMark className="h-11 w-11 shrink-0 transition-transform duration-300 group-hover:scale-105" />
      )}
      <span className="hidden flex-col leading-none sm:flex">
        <span
          className={`font-serif text-lg font-semibold tracking-tight transition-colors ${
            light ? "text-white" : "text-navy"
          }`}
        >
          Health Leaders Initiative
        </span>
        <span
          className={`text-[0.68rem] font-medium uppercase tracking-[0.2em] transition-colors ${
            light ? "text-periwinkle-200" : "text-royal/80"
          }`}
        >
          {site.school}
        </span>
      </span>
    </Link>
  );
}
