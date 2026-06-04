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
    const bg = "#07050f";
    return (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
        {/* Crossbones — behind skull */}
        <line x1="3" y1="9" x2="25" y2="26" stroke={c} strokeWidth="2" strokeLinecap="round" />
        <circle cx="2.5" cy="8" r="1.8" fill={c} />
        <circle cx="4.5" cy="10.5" r="1.2" fill={c} />
        <circle cx="25.5" cy="27" r="1.8" fill={c} />
        <circle cx="23.5" cy="24.5" r="1.2" fill={c} />
        <line x1="25" y1="9" x2="3" y2="26" stroke={c} strokeWidth="2" strokeLinecap="round" />
        <circle cx="25.5" cy="8" r="1.8" fill={c} />
        <circle cx="23.5" cy="10.5" r="1.2" fill={c} />
        <circle cx="2.5" cy="27" r="1.8" fill={c} />
        <circle cx="4.5" cy="24.5" r="1.2" fill={c} />
        {/* Skull */}
        <circle cx="14" cy="16" r="7" fill={c} />
        {/* Eye sockets */}
        <ellipse cx="10.8" cy="15.5" rx="2.2" ry="2.6" fill={bg} />
        <ellipse cx="17.2" cy="15.5" rx="2.2" ry="2.6" fill={bg} />
        {/* Nose */}
        <circle cx="14" cy="18.5" r="0.9" fill={bg} />
        {/* Teeth grid */}
        <rect x="9.5" y="20" width="9" height="3.5" rx="0.5" fill={c} />
        <line x1="11.5" y1="20" x2="11.5" y2="23.5" stroke={bg} strokeWidth="0.8" />
        <line x1="13.5" y1="20" x2="13.5" y2="23.5" stroke={bg} strokeWidth="0.8" />
        <line x1="15.5" y1="20" x2="15.5" y2="23.5" stroke={bg} strokeWidth="0.8" />
        <line x1="9.5" y1="21.8" x2="18.5" y2="21.8" stroke={bg} strokeWidth="0.8" />
        {/* Hat brim — wide flat bar */}
        <rect x="1" y="10" width="26" height="2.5" rx="1.2" fill={c} />
        {/* Hat dome */}
        <ellipse cx="14" cy="8" rx="6.5" ry="5" fill={c} />
        {/* Hat band */}
        <rect x="8" y="10" width="12" height="2.5" fill={c} opacity="0.5" />
        <line x1="8" y1="10.5" x2="20" y2="10.5" stroke={bg} strokeWidth="1" opacity="0.6" />
        {/* Straw marks */}
        <line x1="11" y1="5" x2="11.5" y2="8" stroke={bg} strokeWidth="0.6" opacity="0.4" />
        <line x1="14" y1="4" x2="14" y2="7" stroke={bg} strokeWidth="0.6" opacity="0.4" />
        <line x1="17" y1="5" x2="16.5" y2="8" stroke={bg} strokeWidth="0.6" opacity="0.4" />
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
