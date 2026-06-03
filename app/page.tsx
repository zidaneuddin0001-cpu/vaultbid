import Navbar from "@/components/Navbar";

const TICKER_ITEMS = [
  { name: "Charizard PSA 10", bid: "$4,200", change: "+$250", category: "Pokémon" },
  { name: "Black Lotus BGS 9.5", bid: "$31,000", change: "+$1,000", category: "Magic" },
  { name: "Monkey D. Luffy PSA 10", bid: "$890", change: "+$50", category: "One Piece" },
  { name: "Pikachu Illustrator CGC 9", bid: "$58,000", change: "+$2,000", category: "Pokémon" },
  { name: "LeBron James Rookie PSA 9", bid: "$2,100", change: "+$100", category: "Sports" },
  { name: "Nami PSA 10", bid: "$620", change: "+$30", category: "One Piece" },
  { name: "Mew PSA 9", bid: "$340", change: "+$20", category: "Pokémon" },
  { name: "Mike Trout BGS 9.5", bid: "$1,750", change: "+$80", category: "Sports" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Pokémon": "#facc15",
  "Magic": "#a855f7",
  "One Piece": "#ef4444",
  "Sports": "#3b82f6",
};

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: "#07050f" }}>
      <Navbar />

      {/* Live ticker */}
      <div className="border-b border-white/5 overflow-hidden py-2" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="flex ticker-track whitespace-nowrap gap-0">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8 pr-8">
              {TICKER_ITEMS.map((item) => (
                <span key={item.name + i} className="text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: CATEGORY_COLORS[item.category] }} />
                  <span className="text-zinc-300 font-medium">{item.name}</span>
                  <span className="text-zinc-500">{item.bid}</span>
                  <span className="font-medium" style={{ color: "#4ade80" }}>{item.change}</span>
                  <span className="text-zinc-700">│</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="relative flex flex-col items-center text-center px-8 pt-20 pb-16 overflow-hidden">

        {/* Background glow pools */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20"
            style={{ background: "radial-gradient(ellipse, #f59e0b 0%, transparent 70%)", filter: "blur(80px)" }} />
          <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(ellipse, #a855f7 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute top-20 right-1/4 w-64 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(ellipse, #ef4444 0%, transparent 70%)", filter: "blur(60px)" }} />
        </div>

        {/* Floating decorative cards */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Left card */}
          <div className="float-1 absolute left-[5%] top-[10%] w-32 h-44 rounded-xl border opacity-20"
            style={{ background: "linear-gradient(135deg, #1a0030, #0d1a40)", borderColor: "#a855f7", boxShadow: "0 0 20px #a855f720" }}>
            <div className="h-full flex flex-col p-2 gap-1">
              <div className="h-24 rounded-lg bg-purple-900/40" />
              <div className="h-2 w-3/4 rounded bg-purple-700/40" />
              <div className="h-1.5 w-1/2 rounded bg-purple-700/30" />
            </div>
          </div>
          {/* Right card */}
          <div className="float-2 absolute right-[5%] top-[5%] w-28 h-40 rounded-xl border opacity-20"
            style={{ background: "linear-gradient(135deg, #1a1000, #0a1a10)", borderColor: "#facc15", boxShadow: "0 0 20px #facc1520" }}>
            <div className="h-full flex flex-col p-2 gap-1">
              <div className="h-20 rounded-lg bg-yellow-900/40" />
              <div className="h-2 w-3/4 rounded bg-yellow-700/40" />
              <div className="h-1.5 w-1/2 rounded bg-yellow-700/30" />
            </div>
          </div>
          {/* Far left card */}
          <div className="float-3 absolute left-[15%] bottom-[10%] w-24 h-36 rounded-xl border opacity-10"
            style={{ background: "linear-gradient(135deg, #0a0020, #001a0a)", borderColor: "#ef4444", boxShadow: "0 0 20px #ef444420" }}>
            <div className="h-full flex flex-col p-2 gap-1">
              <div className="h-16 rounded-lg bg-red-900/40" />
              <div className="h-2 w-3/4 rounded bg-red-700/40" />
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Rarity badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{ background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.3)", color: "#f59e0b" }}>
            <span className="sparkle-1 inline-block w-1.5 h-1.5 rounded-full bg-yellow-400" />
            ★ Ultra Rare Marketplace
            <span className="sparkle-2 inline-block w-1.5 h-1.5 rounded-full bg-yellow-400" />
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-tight mb-4">
            Where Legends<br />
            <span className="gold-text">Get Auctioned.</span>
          </h1>

          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Pokémon. One Piece. Magic. Sports. Every slab, every grade, every chase card — live auctions paid in crypto.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/auctions"
              className="relative px-8 py-3.5 rounded-full font-bold text-black overflow-hidden group"
              style={{ background: "linear-gradient(90deg, #f59e0b, #fde68a, #f59e0b)", backgroundSize: "200%", animation: "gold-shimmer 3s linear infinite" }}>
              Browse Auctions
            </a>
            <a href="/sell"
              className="px-8 py-3.5 rounded-full font-semibold border transition-all hover:bg-white/5"
              style={{ borderColor: "rgba(245,158,11,0.3)", color: "#fbbf24" }}>
              List a Card
            </a>
          </div>
        </div>

        {/* Scan line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="scan-line absolute left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.15), transparent)" }} />
        </div>
      </section>

      {/* Category showcase */}
      <section className="px-8 py-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              name: "Pokémon", color: "#facc15", bg: "#1a1200",
              emblem: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  {/* Pokéball */}
                  <circle cx="14" cy="14" r="12" stroke="#facc15" strokeWidth="1.5" fill="none" />
                  <path d="M2 14h24" stroke="#facc15" strokeWidth="1.5" />
                  <circle cx="14" cy="14" r="3.5" fill="#facc15" />
                  <circle cx="14" cy="14" r="2" fill="#1a1200" />
                </svg>
              ),
            },
            {
              name: "One Piece", color: "#ef4444", bg: "#1a0000",
              emblem: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  {/* Straw Hat Jolly Roger skull */}
                  <circle cx="14" cy="13" r="6" fill="#ef4444" opacity="0.9" />
                  <circle cx="11.5" cy="12" r="1.5" fill="#1a0000" />
                  <circle cx="16.5" cy="12" r="1.5" fill="#1a0000" />
                  <path d="M11 16 Q14 18.5 17 16" stroke="#1a0000" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  {/* Straw hat brim */}
                  <path d="M7 9 Q14 6 21 9" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M9 9 Q14 7 19 9" stroke="#ef4444" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
                  {/* Crossbones */}
                  <line x1="6" y1="20" x2="10" y2="24" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="10" y1="20" x2="6" y2="24" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="18" y1="20" x2="22" y2="24" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="22" y1="20" x2="18" y2="24" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ),
            },
            {
              name: "Magic", color: "#a855f7", bg: "#0d0020",
              emblem: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  {/* Magic planeswalker spark / five-pointed pentagon */}
                  <polygon points="14,3 17.5,11 26,11 19.5,16.5 22,25 14,20 6,25 8.5,16.5 2,11 10.5,11"
                    stroke="#a855f7" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
                  <circle cx="14" cy="14" r="2.5" fill="#a855f7" opacity="0.7" />
                </svg>
              ),
            },
            {
              name: "Sports", color: "#3b82f6", bg: "#00081a",
              emblem: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  {/* Trophy */}
                  <path d="M9 4h10v9a5 5 0 01-10 0V4z" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                  <path d="M9 7H5a3 3 0 003 3" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  <path d="M19 7h4a3 3 0 01-3 3" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  <path d="M14 18v4" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M10 22h8" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ),
            },
          ].map((cat) => (
            <a key={cat.name} href={`/auctions?category=${encodeURIComponent(cat.name)}`}
              className="holo-card relative flex flex-col items-center justify-center py-8 rounded-2xl border font-bold text-sm gap-3 transition-transform hover:-translate-y-1 cursor-pointer"
              style={{ background: cat.bg, borderColor: cat.color + "40", color: cat.color }}>
              <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity"
                style={{ boxShadow: `0 0 30px ${cat.color}20` }} />
              {cat.emblem}
              <span>{cat.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y mx-8 my-4 grid grid-cols-2 sm:grid-cols-4 divide-x divide-yellow-900/20"
        style={{ borderColor: "rgba(245,158,11,0.1)" }}>
        {[
          { label: "Cards Sold", value: "—" },
          { label: "Total Volume", value: "—" },
          { label: "Active Auctions", value: "—" },
          { label: "Avg. Payout Time", value: "48h" },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center py-10 gap-1">
            <span className="text-3xl font-bold gold-text">{stat.value}</span>
            <span className="text-sm text-zinc-500">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section className="px-8 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest text-yellow-500 uppercase mb-3">The Process</p>
          <h2 className="text-3xl font-bold">How VaultBid works</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { step: "01", title: "Consign", desc: "Ship your graded slabs to our secure facility. We verify authenticity, photograph every angle, and create your listing.", icon: "📦", color: "#facc15" },
            { step: "02", title: "Auction", desc: "Your card goes live for 7, 10, or 14 days. Real-time bidding with live updates — every bid visible on chain.", icon: "⚡", color: "#a855f7" },
            { step: "03", title: "Get Paid", desc: "Auction closes, we handle shipping to the buyer. You receive USDT or USDC within 48 hours, no questions asked.", icon: "💎", color: "#22d3ee" },
          ].map((item) => (
            <div key={item.step} className="holo-card relative rounded-2xl p-6 border overflow-hidden"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
              {/* Top glow line */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${item.color}60, transparent)` }} />
              <div className="text-3xl mb-4">{item.icon}</div>
              <p className="text-xs font-bold tracking-widest mb-2" style={{ color: item.color }}>{item.step} — {item.title}</p>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-8 py-8 flex items-center justify-between text-xs text-zinc-600"
        style={{ borderColor: "rgba(245,158,11,0.1)" }}>
        <span className="font-bold tracking-tight text-zinc-400">VaultBid</span>
        <span>© 2026 · Powered by crypto</span>
      </footer>
    </div>
  );
}
