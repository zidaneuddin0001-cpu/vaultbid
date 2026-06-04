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
    const sw = "rgba(0,0,0,0.28)";
    return (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
        {/* Fruit body — perfect circle */}
        <circle cx="14" cy="16" r="11" fill={c} />

        {/* Snail-shell spiral swirls covering the fruit */}
        <g stroke={sw} strokeWidth="0.85" fill="none" strokeLinecap="round">
          {/* Centre */}
          <path d="M17,14 A3,3 0 1 1 11,14 A2,2 0 1 0 15,14 A1,1 0 0 1 14,13" />
          {/* Upper-left */}
          <path d="M11,10 A2.5,2.5 0 1 1 6,10 A1.6,1.6 0 1 0 9.6,10 A0.8,0.8 0 0 1 8.5,9.2" />
          {/* Upper-right */}
          <path d="M22,11 A2.5,2.5 0 1 1 17,11 A1.6,1.6 0 1 0 20.6,11 A0.8,0.8 0 0 1 19.5,10.2" />
          {/* Lower-left */}
          <path d="M9,19 A2,2 0 1 1 5,19 A1.3,1.3 0 1 0 8.3,19 A0.7,0.7 0 0 1 7,18.3" />
          {/* Lower-right */}
          <path d="M23,19 A2,2 0 1 1 19,19 A1.3,1.3 0 1 0 22.3,19 A0.7,0.7 0 0 1 21,18.3" />
          {/* Bottom */}
          <path d="M16,24 A2,2 0 1 1 12,24 A1.3,1.3 0 1 0 15.3,24 A0.7,0.7 0 0 1 14,23.3" />
          {/* Top */}
          <path d="M17,8 A2,2 0 1 1 13,8 A1.3,1.3 0 1 0 16.3,8 A0.7,0.7 0 0 1 15,7.3" />
        </g>

        {/* Corkscrew stem — left curl */}
        <path d="M14,5 L14,3.5 Q14,2 12.5,1.5 Q11,1 10.5,2.2 Q10,3.5 11.5,4 Q13,4.5 14,3.5"
          stroke={c} strokeWidth="1.3" fill="none" strokeLinecap="round" />
        {/* Corkscrew stem — right curl */}
        <path d="M14,3.5 Q16,2.5 17.5,2 Q19.5,1.5 19.5,3 Q19.5,4.5 18,4.5 Q16.5,4.5 16,3.5"
          stroke={c} strokeWidth="1.3" fill="none" strokeLinecap="round" />
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
