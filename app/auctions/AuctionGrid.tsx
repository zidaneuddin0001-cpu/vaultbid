"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { type Auction } from "@/lib/supabase";

const CATEGORIES = ["All", "Pokémon", "Magic", "One Piece", "Sports"];

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

export default function AuctionGrid({ auctions }: { auctions: Auction[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("ending_soonest");

  const filtered = useMemo(() => {
    let result = [...auctions];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.set_name.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }

    if (category !== "All") {
      result = result.filter((a) => a.category === category);
    }

    if (sort === "highest_bid") result.sort((a, b) => Number(b.current_bid) - Number(a.current_bid));
    else if (sort === "most_bids") result.sort((a, b) => b.bid_count - a.bid_count);
    else if (sort === "newest") result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    else result.sort((a, b) => new Date(a.ends_at).getTime() - new Date(b.ends_at).getTime());

    return result;
  }, [auctions, search, category, sort]);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Live Auctions</h1>
          <p className="text-zinc-500 text-sm mt-1">{filtered.length} active listings</p>
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-zinc-900 border border-white/10 text-white text-sm rounded-full px-4 py-2 outline-none"
        >
          <option value="ending_soonest">Ending soonest</option>
          <option value="highest_bid">Highest bid</option>
          <option value="most_bids">Most bids</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by card name, set, or category..."
          className="w-full bg-zinc-900 border border-white/10 rounded-full pl-12 pr-10 py-3 text-sm outline-none focus:border-white/30 placeholder:text-zinc-600"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors text-xl leading-none"
          >
            ×
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              category === cat
                ? "bg-white text-black border-white"
                : "border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-zinc-600">
          <p className="text-lg">No auctions found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((auction) => (
            <a
              key={auction.id}
              href={`/auctions/${auction.id}`}
              className="group flex flex-col bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-colors"
            >
              <div className="aspect-[3/4] bg-zinc-800 relative overflow-hidden">
                {auction.image_url ? (
                  <Image src={auction.image_url} alt={auction.name} fill className="object-cover" unoptimized />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-zinc-600 text-xs">Card Image</span>
                  </div>
                )}
              </div>
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
                    <p className="text-xs text-orange-400 font-medium">{formatTimeLeft(auction.ends_at)}</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
