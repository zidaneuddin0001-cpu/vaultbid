import Image from "next/image";
import Navbar from "@/components/Navbar";
import { createSupabaseServerClient, type Auction } from "@/lib/supabase";

const CATEGORIES = ["All", "Pokémon", "Magic", "One Piece", "Sports"];

export const dynamic = "force-dynamic";

export default async function AuctionsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const { category, sort } = await searchParams;
  const supabase = await createSupabaseServerClient();

  let query = supabase
    .from("auctions")
    .select("*")
    .eq("status", "active");

  if (category && category !== "All") {
    query = query.eq("category", category);
  }

  if (sort === "highest_bid") {
    query = query.order("current_bid", { ascending: false });
  } else if (sort === "most_bids") {
    query = query.order("bid_count", { ascending: false });
  } else if (sort === "newest") {
    query = query.order("created_at", { ascending: false });
  } else {
    query = query.order("ends_at", { ascending: true });
  }

  const { data: auctions } = await query;
  const activeCategory = category ?? "All";

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold">Live Auctions</h1>
            <p className="text-zinc-500 text-sm mt-1">{auctions?.length ?? 0} active listings</p>
          </div>
          <form>
            {category && <input type="hidden" name="category" value={category} />}
            <select
              name="sort"
              defaultValue={sort ?? ""}
              className="bg-zinc-900 border border-white/10 text-white text-sm rounded-full px-4 py-2 outline-none"
              onChange={(e) => {
                const form = e.currentTarget.form!;
                form.submit();
              }}
            >
              <option value="">Ending soonest</option>
              <option value="highest_bid">Highest bid</option>
              <option value="most_bids">Most bids</option>
              <option value="newest">Newest</option>
            </select>
          </form>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((cat) => (
            <a
              key={cat}
              href={cat === "All" ? "/auctions" : `/auctions?category=${encodeURIComponent(cat)}${sort ? `&sort=${sort}` : ""}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                cat === activeCategory
                  ? "bg-white text-black border-white"
                  : "border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
            </a>
          ))}
        </div>

        {/* Auction grid */}
        {!auctions || auctions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-zinc-600">
            <p className="text-lg">No active auctions yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {auctions.map((auction: Auction) => (
              <a
                key={auction.id}
                href={`/auctions/${auction.id}`}
                className="group flex flex-col bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-colors"
              >
                {/* Card image */}
                <div className="aspect-[3/4] bg-zinc-800 relative overflow-hidden">
                  {auction.image_url ? (
                    <Image src={auction.image_url} alt={auction.name} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-zinc-600 text-xs">Card Image</span>
                    </div>
                  )}
                </div>

                {/* Card info */}
                <div className="p-4 flex flex-col gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-zinc-500">{auction.category} · {auction.year}</span>
                      <span className="text-xs font-semibold text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded-full">{auction.grade}</span>
                    </div>
                    <h3 className="font-semibold text-sm leading-tight">{auction.name}</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">{auction.set_name}</p>
                  </div>

                  <div className="border-t border-white/10 pt-3 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-zinc-500">Current bid</p>
                      <p className="text-lg font-bold">${Number(auction.current_bid).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-zinc-500">{auction.bid_count} bids</p>
                      <p className="text-xs text-orange-400 font-medium">
                        {formatTimeLeft(auction.ends_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

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
