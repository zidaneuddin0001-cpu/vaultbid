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
    return (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
        {/* Stem — curly like a real devil fruit */}
        <path d="M14 7 Q15 4 18 3.5 Q21 3.5 20 6" stroke={c} strokeWidth="1.4" strokeLinecap="round" fill="none" />
        {/* Leaf */}
        <path d="M14 7 Q11 3.5 9 5 Q10 7.5 14 7Z" fill={c} opacity="0.7" />
        {/* Fruit body — slightly pear-shaped like devil fruits */}
        <ellipse cx="14" cy="17" rx="9.5" ry="10" fill={c} />
        <ellipse cx="14" cy="13" rx="7" ry="6" fill={c} />
        {/* Devil fruit swirl lines — the signature wavy horizontal bands */}
        <path d="M5 13 Q9 10.5 14 13 Q19 15.5 23 13" stroke="rgba(0,0,0,0.3)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        <path d="M5 17 Q9 14.5 14 17 Q19 19.5 23 17" stroke="rgba(0,0,0,0.3)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        <path d="M6 21 Q10 18.5 14 21 Q18 23.5 22 21" stroke="rgba(0,0,0,0.25)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        <path d="M7 9.5 Q10.5 7.5 14 9.5 Q17.5 11.5 21 9.5" stroke="rgba(0,0,0,0.2)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
        {/* Highlight */}
        <ellipse cx="10.5" cy="12" rx="2.5" ry="1.5" fill="white" opacity="0.12" />
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
