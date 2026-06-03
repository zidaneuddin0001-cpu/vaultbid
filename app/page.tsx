import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-8 py-32 max-w-4xl mx-auto">
        <div className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-6">Crypto-Native Card Auctions</div>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-tight mb-6">
          The auction house <br />
          <span className="text-zinc-400">built for collectors.</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed">
          Consign your graded slabs. We verify, list, and ship. You get paid in stablecoins within 48 hours of sale.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/auctions" className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-zinc-200 transition-colors">
            Browse Auctions
          </a>
          <a href="/sell" className="border border-white/20 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/5 transition-colors">
            Sell Your Cards
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
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
            { step: "01", title: "Consign", desc: "Ship your graded slabs to our secure warehouse. We verify, photograph, and list them." },
            { step: "02", title: "Auction", desc: "Your card goes live for 7, 10, or 14 days. Buyers compete in real-time bidding." },
            { step: "03", title: "Get Paid", desc: "We deduct our fee, pay you in USDT or USDC within 48 hours, and ship to the buyer." },
          ].map((item) => (
            <div key={item.step} className="flex flex-col gap-4 p-6 border border-white/10 rounded-2xl">
              <span className="text-xs font-bold text-zinc-600 tracking-widest">{item.step}</span>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-8 py-8 flex items-center justify-between text-xs text-zinc-600">
        <span>VaultBid</span>
        <span>© 2026</span>
      </footer>
     </div>
  );
}
