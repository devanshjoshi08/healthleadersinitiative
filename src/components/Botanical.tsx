/**
 * Botanical line-art branch (laurel / fern) - decorative, matches the HLI flyer.
 * Colour it via `text-*` (uses currentColor) and position with the className.
 */
export function Botanical({ className = "" }: { className?: string }) {
  const n = 11;
  const leaves = [];
  for (let i = 1; i <= n; i++) {
    const t = i / (n + 1);
    const x = 14 + t * 86;
    const y = 106 - t * 96;
    const rx = 9.5 * (1 - t * 0.5);
    const ry = 3.3 * (1 - t * 0.35);
    leaves.push(
      <ellipse
        key={`r${i}`}
        cx={x + rx * 0.7}
        cy={y - ry}
        rx={rx}
        ry={ry}
        transform={`rotate(-36 ${x} ${y})`}
      />,
      <ellipse
        key={`l${i}`}
        cx={x - rx * 0.7}
        cy={y - ry}
        rx={rx}
        ry={ry}
        transform={`rotate(-144 ${x} ${y})`}
      />
    );
  }
  return (
    <svg
      viewBox="0 0 110 110"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 108 Q 46 60 102 6" />
      {leaves}
    </svg>
  );
}
