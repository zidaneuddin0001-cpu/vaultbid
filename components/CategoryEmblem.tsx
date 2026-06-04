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
        {/* Skull */}
        <ellipse cx="14" cy="13" rx="6.5" ry="6" fill={c} opacity="0.9" />
        {/* Eyes */}
        <ellipse cx="11.5" cy="12" rx="1.6" ry="1.8" fill="#07050f" />
        <ellipse cx="16.5" cy="12" rx="1.6" ry="1.8" fill="#07050f" />
        {/* Nose */}
        <path d="M13.5 14.5 L14 15.5 L14.5 14.5" stroke="#07050f" strokeWidth="0.8" strokeLinecap="round" fill="none" />
        {/* Smile */}
        <path d="M11 16.5 Q14 19 17 16.5" stroke="#07050f" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        {/* Straw hat — brim */}
        <path d="M5.5 10 Q14 13.5 22.5 10" stroke={c} strokeWidth="2.2" strokeLinecap="round" fill="none" />
        {/* Straw hat — dome */}
        <path d="M9 10 Q9.5 4 14 3.5 Q18.5 4 19 10" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Hat band */}
        <path d="M10 9.5 Q14 11.5 18 9.5" stroke={c} strokeWidth="1" strokeLinecap="round" opacity="0.6" fill="none" />
        {/* Crossbones */}
        <line x1="5.5" y1="20" x2="9.5" y2="25" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="9.5" y1="20" x2="5.5" y2="25" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="18.5" y1="20" x2="22.5" y2="25" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="22.5" y1="20" x2="18.5" y2="25" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
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
