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
        {/* Crossbones */}
        <line x1="4" y1="18" x2="24" y2="28" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="3.5" cy="17.5" r="2" fill={c} />
        <circle cx="24.5" cy="28" r="2" fill={c} />
        <line x1="24" y1="18" x2="4" y2="28" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24.5" cy="17.5" r="2" fill={c} />
        <circle cx="3.5" cy="28" r="2" fill={c} />
        {/* Skull */}
        <circle cx="14" cy="13" r="8" fill={c} />
        {/* Eye sockets */}
        <ellipse cx="10.5" cy="13" rx="2.2" ry="2.5" fill="#07050f" />
        <ellipse cx="17.5" cy="13" rx="2.2" ry="2.5" fill="#07050f" />
        {/* Nose */}
        <circle cx="14" cy="16.5" r="1" fill="#07050f" />
        {/* Jaw teeth */}
        <rect x="10" y="18.5" width="8" height="3" rx="0.5" fill={c} />
        <line x1="12" y1="18.5" x2="12" y2="21.5" stroke="#07050f" strokeWidth="0.8" />
        <line x1="14" y1="18.5" x2="14" y2="21.5" stroke="#07050f" strokeWidth="0.8" />
        <line x1="16" y1="18.5" x2="16" y2="21.5" stroke="#07050f" strokeWidth="0.8" />
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

  if (category === "Dragon Ball") {
    const c = color ?? "#f97316";
    const star = "rgba(160,30,0,0.75)";
    return (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
        {/* Sphere */}
        <circle cx="14" cy="14" r="12" fill={c} />
        {/* Shine */}
        <ellipse cx="10" cy="9" rx="4" ry="2.5" fill="white" opacity="0.18" />
        {/* Equator curve */}
        <path d="M2.5,14 Q14,19 25.5,14" stroke="rgba(0,0,0,0.15)" strokeWidth="1" fill="none" />
        {/* Centre star (5-pointed) */}
        <polygon points="14,8 15,10.8 18,10.8 15.8,12.6 16.6,15.5 14,13.8 11.4,15.5 12.2,12.6 10,10.8 13,10.8" fill={star} />
        {/* Top-left small star */}
        <polygon points="7,5 7.5,6.4 9,6.4 7.9,7.3 8.3,8.7 7,7.9 5.7,8.7 6.1,7.3 5,6.4 6.5,6.4" fill={star} />
        {/* Top-right small star */}
        <polygon points="21,5 21.5,6.4 23,6.4 21.9,7.3 22.3,8.7 21,7.9 19.7,8.7 20.1,7.3 19,6.4 20.5,6.4" fill={star} />
        {/* Bottom-left small star */}
        <polygon points="7,19 7.5,20.4 9,20.4 7.9,21.3 8.3,22.7 7,21.9 5.7,22.7 6.1,21.3 5,20.4 6.5,20.4" fill={star} />
        {/* Bottom-right small star */}
        <polygon points="21,19 21.5,20.4 23,20.4 21.9,21.3 22.3,22.7 21,21.9 19.7,22.7 20.1,21.3 19,20.4 20.5,20.4" fill={star} />
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
