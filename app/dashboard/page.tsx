import Image from "next/image";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

function formatTimeLeft(endsAt: string): string {
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return "Ended";
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [{ data: profile }, { data: listings }, { data: bids }] = await Promise.all([
    supabase.from("profiles").select("username").eq("id", user.id).single(),
    supabase.from("auctions").select("*").eq("seller_id", user.id).order("created_at", { ascending: false }),
    supabase.from("bids").select("*, auctions(id, name, image_url, current_bid, ends_at, status)").eq("bidder_id", user.id).order("created_at", { ascending: false }),
  ]);

  // Deduplicate bids — keep only the highest bid per auction
  const topBidsByAuction = new Map<string, typeof bids[0]>();
  for (const bid of bids ?? []) {
    const auctionId = bid.auctions?.id;
    if (!auctionId) continue;
    if (!topBidsByAuction.has(auctionId) || bid.amount > topBidsByAuction.get(auctionId)!.amount) {
      topBidsByAuction.set(auctionId, bid);
    }
  }
  const activeBids = [...topBidsByAuction.values()];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-zinc-500 text-sm mt-1">Welcome back, {profile?.username}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { label: "Active listings", value: listings?.filter(l => l.status === "active").length ?? 0 },
            { label: "Auctions bidding on", value: activeBids.length },
            { label: "Total listed", value: listings?.length ?? 0 },
          ].map((stat) => (
            <div key={stat.label} className="bg-zinc-900 border border-white/10 rounded-2xl p-5">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* My listings */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">My listings</h2>
            <a href="/sell" className="text-sm text-zinc-400 hover:text-white transition-colors">+ New listing</a>
          </div>

          {!listings || listings.length === 0 ? (
            <div className="border border-white/10 rounded-2xl p-10 text-center text-zinc-600 text-sm">
              No listings yet. <a href="/sell" className="text-white hover:underline">Create your first listing.</a>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {listings.map((auction) => (
                <a key={auction.id} href={`/auctions/${auction.id}`}
                  className="flex items-center gap-4 bg-zinc-900 border border-white/10 rounded-2xl p-4 hover:border-white/30 transition-colors">
                  <div className="w-12 h-16 bg-zinc-800 rounded-lg relative overflow-hidden flex-shrink-0">
                    {auction.image_url ? (
                      <Image src={auction.image_url} alt={auction.name} fill className="object-cover" unoptimized />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-zinc-700 text-xs">—</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{auction.name}</p>
                    <p className="text-xs text-zinc-500">{auction.set_name} · {auction.grade}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${Number(auction.current_bid).toLocaleString()}</p>
                    <p className="text-xs text-zinc-500">{auction.bid_count} bids</p>
                  </div>
                  <div className="text-right min-w-16">
                    <p className={`text-xs font-medium ${auction.status === "active" ? "text-orange-400" : "text-zinc-500"}`}>
                      {auction.status === "active" ? formatTimeLeft(auction.ends_at) : auction.status}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* My bids */}
        <section>
          <h2 className="text-xl font-bold mb-5">My bids</h2>

          {activeBids.length === 0 ? (
            <div className="border border-white/10 rounded-2xl p-10 text-center text-zinc-600 text-sm">
              You haven't placed any bids yet. <a href="/auctions" className="text-white hover:underline">Browse auctions.</a>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {activeBids.map((bid) => {
                const auction = bid.auctions;
                if (!auction) return null;
                const isWinning = bid.amount >= auction.current_bid;
                return (
                  <a key={bid.id} href={`/auctions/${auction.id}`}
                    className="flex items-center gap-4 bg-zinc-900 border border-white/10 rounded-2xl p-4 hover:border-white/30 transition-colors">
                    <div className="w-12 h-16 bg-zinc-800 rounded-lg relative overflow-hidden flex-shrink-0">
                      {auction.image_url ? (
                        <Image src={auction.image_url} alt={auction.name} fill className="object-cover" unoptimized />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-zinc-700 text-xs">—</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{auction.name}</p>
                      <p className="text-xs text-zinc-500">Your bid: ${Number(bid.amount).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${Number(auction.current_bid).toLocaleString()}</p>
                      <p className={`text-xs font-medium ${isWinning ? "text-green-400" : "text-red-400"}`}>
                        {isWinning ? "Winning" : "Outbid"}
                      </p>
                    </div>
                    <div className="text-right min-w-16">
                      <p className="text-xs text-orange-400 font-medium">{formatTimeLeft(auction.ends_at)}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
