export default function CategoryEmblem({ category, size = 28, color }: { category: string; size?: number; color?: string }) {
  const s = size;

  if (category === "Pokémon") {
    const c = color ?? "#facc15";
    return (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="12" stroke={c} strokeWidth="1.5" />
        <path d="M2 14h24" stroke={c} strokeWidth="1.5" />
        <circle cx="14" cy="14" r="3.5" fill={c} />
        <circle cx="14" cy="14" r="2" fill="#07050f" />
      </svg>
    );
  }

  if (category === "One Piece") {
    const c = color ?? "#ef4444";
    const sw = "rgba(0,0,0,0.3)";
    // Snail-shell spiral formula: M cx+r,cy  A r,r 0 1 1 cx-r,cy  A r*.7,r*.7 0 0 0 cx+r*.4,cy  A r*.3,r*.3 0 0 1 cx,cy-r*.3
    return (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
        {/* Fruit body — perfect sphere */}
        <circle cx="14" cy="16" r="11" fill={c} />

        {/* Snail-shell spirals — each is 3 chained arcs spiralling inward */}
        <g stroke={sw} strokeWidth="0.85" fill="none" strokeLinecap="round">
          {/* Centre (14,13) r=2.8 */}
          <path d="M16.8,13 A2.8,2.8 0 1 1 11.2,13 A1.96,1.96 0 0 0 15.12,13 A0.84,0.84 0 0 1 14,12.16" />
          {/* Upper-left (9,11) r=2.3 */}
          <path d="M11.3,11 A2.3,2.3 0 1 1 6.7,11 A1.61,1.61 0 0 0 9.92,11 A0.69,0.69 0 0 1 9,10.31" />
          {/* Upper-right (19,11) r=2.3 */}
          <path d="M21.3,11 A2.3,2.3 0 1 1 16.7,11 A1.61,1.61 0 0 0 19.92,11 A0.69,0.69 0 0 1 19,10.31" />
          {/* Left (7,18) r=2.0 */}
          <path d="M9,18 A2,2 0 1 1 5,18 A1.4,1.4 0 0 0 7.8,18 A0.6,0.6 0 0 1 7,17.4" />
          {/* Right (21,18) r=2.0 */}
          <path d="M23,18 A2,2 0 1 1 19,18 A1.4,1.4 0 0 0 21.8,18 A0.6,0.6 0 0 1 21,17.4" />
          {/* Lower-left (12,23) r=1.8 */}
          <path d="M13.8,23 A1.8,1.8 0 1 1 10.2,23 A1.26,1.26 0 0 0 12.72,23 A0.54,0.54 0 0 1 12,22.46" />
          {/* Lower-right (19,23) r=1.8 */}
          <path d="M20.8,23 A1.8,1.8 0 1 1 17.2,23 A1.26,1.26 0 0 0 19.72,23 A0.54,0.54 0 0 1 19,22.46" />
          {/* Top-small (14,9) r=1.5 */}
          <path d="M15.5,9 A1.5,1.5 0 1 1 12.5,9 A1.05,1.05 0 0 0 14.6,9 A0.45,0.45 0 0 1 14,8.55" />
        </g>

        {/* Stem — vertical stalk + horizontal bar + two corkscrew curls */}
        <g stroke={c} strokeWidth="1.3" fill="none" strokeLinecap="round">
          <line x1="14" y1="5" x2="14" y2="3" />
          <line x1="10" y1="3" x2="18" y2="3" />
          {/* Left curl */}
          <path d="M10,3 Q8,3 8,1.5 Q8,0 10,0.5 Q12,1 11,2.5" />
          {/* Right curl */}
          <path d="M18,3 Q20,3 20,1.5 Q20,0 18,0.5 Q16,1 17,2.5" />
        </g>
      </svg>
    );
  }

  if (category === "Magic") {
    const c = color ?? "#a855f7";
    return (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
        <polygon
          points="14,3 17.5,11 26,11 19.5,16.5 22,25 14,20 6,25 8.5,16.5 2,11 10.5,11"
          stroke={c} strokeWidth="1.3" fill="none" strokeLinejoin="round"
        />
        <circle cx="14" cy="14" r="2.5" fill={c} opacity="0.7" />
      </svg>
    );
  }

  if (category === "Sports") {
    const c = color ?? "#3b82f6";
    return (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
        <path d="M9 4h10v9a5 5 0 01-10 0V4z" stroke={c} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <path d="M9 7H5a3 3 0 003 3" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M19 7h4a3 3 0 01-3 3" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M14 18v4" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 22h8" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  return null;
}
