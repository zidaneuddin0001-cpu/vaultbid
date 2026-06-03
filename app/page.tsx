import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative flex flex-col items-center text-center px-8 py-32 max-w-4xl mx-auto">

        {/* Animated orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="orb-1 absolute top-10 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="orb-2 absolute top-20 right-1/4 w-80 h-80 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="orb-3 absolute bottom-0 left-1/2 w-72 h-72 rounded-full bg-cyan-400/5 blur-3xl" />
        </div>

        {/* Scan line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="scan-line absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Crypto-Native Card Auctions
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-tight mb-6">
            The auction house<br />
            <span className="gradient-text">built for collectors.</span>
          </h1>

          <p className="text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed">
            Consign your graded slabs. We verify, list, and ship. You get paid in stablecoins within 48 hours of sale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/auctions"
              className="relative bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-zinc-200 transition-colors group overflow-hidden">
              <span className="relative z-10">Browse Auctions</span>
            </a>
            <a href="/sell"
              className="border border-cyan-500/40 text-white px-8 py-3 rounded-full font-semibold hover:border-cyan-400/70 hover:bg-cyan-500/5 transition-colors">
              Sell Your Cards
            </a>
          </div>
        </div>
      </section>

      {/* Live ticker */}
      <div className="border-y border-white/5 bg-zinc-950/60 py-3 overflow-hidden">
        <div className="flex gap-0 ticker-track whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-10 pr-10">
              {[
                { name: "Charizard PSA 10", bid: "$4,200", change: "+$250" },
                { name: "Black Lotus BGS 9.5", bid: "$31,000", change: "+$1,000" },
                { name: "Pikachu Illustrator CGC 9", bid: "$58,000", change: "+$2,000" },
                { name: "LeBron Rookie PSA 9", bid: "$2,100", change: "+$100" },
                { name: "Monkey D. Luffy PSA 10", bid: "$890", change: "+$50" },
                { name: "Mew PSA 9", bid: "$340", change: "+$20" },
              ].map((item) => (
                <span key={item.name} className="text-xs text-zinc-500 flex items-center gap-2">
                  <span className="text-zinc-300 font-medium">{item.name}</span>
                  <span>{item.bid}</span>
                  <span className="text-cyan-400">{item.change}</span>
                  <span className="text-zinc-700">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section className="border-b border-white/5 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/5">
        {[
          { label: "Cards Sold", value: "—" },
          { label: "Total Volume", value: "—" },
          { label: "Active Auctions", value: "—" },
          { label: "Avg. Payout Time", value: "48h" },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center py-10 gap-1">
            <span className="text-3xl font-bold">{stat.value}</span>
            <span className="text-sm text-zinc-500">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section className="px-8 py-24 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">How it works</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Consign", desc: "Ship your graded slabs to our secure warehouse. We verify, photograph, and list them.", color: "cyan" },
            { step: "02", title: "Auction", desc: "Your card goes live for 7, 10, or 14 days. Buyers compete in real-time bidding.", color: "violet" },
            { step: "03", title: "Get Paid", desc: "We deduct our fee, pay you in USDT or USDC within 48 hours, and ship to the buyer.", color: "cyan" },
          ].map((item) => (
            <div key={item.step}
              className="card-glow relative flex flex-col gap-4 p-6 border border-white/10 rounded-2xl bg-zinc-950/50 overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${item.color === "cyan" ? "via-cyan-500/40" : "via-violet-500/40"} to-transparent`} />
              <span className="text-xs font-bold text-zinc-600 tracking-widest">{item.step}</span>
              <h3 className={`text-lg font-semibold ${item.color === "cyan" ? "text-cyan-400" : "text-violet-400"}`}>{item.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-8 py-8 flex items-center justify-between text-xs text-zinc-600">
        <span className="font-bold tracking-tight">VaultBid</span>
        <span>© 2026</span>
      </footer>
    </div>
  );
}
