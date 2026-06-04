"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { type Auction } from "@/lib/supabase";

const CATEGORIES = ["All", "Pokémon", "Magic", "One Piece", "Sports"];

const CATEGORY_COLORS: Record<string, { border: string; glow: string; symbol: string; bg: string }> = {
  "Pokémon":  { border: "#facc15", glow: "#facc1530", symbol: "⚡", bg: "#1a120080" },
  "Magic":    { border: "#a855f7", glow: "#a855f730", symbol: "✦", bg: "#0d002080" },
  "One Piece":{ border: "#ef4444", glow: "#ef444430", symbol: "☠", bg: "#1a000080" },
  "Sports":   { border: "#3b82f6", glow: "#3b82f630", symbol: "★", bg: "#00081a80" },
};

function getRarityLabel(grade: string): string {
  if (grade.includes("10"))  return "★★★ Ultra Rare";
  if (grade.includes("9.5")) return "★★ Secret Rare";
  if (grade.includes("9"))   return "★ Rare";
  return "Common";
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
      <div className="flex items-center gap-3 bg-zinc-900 border border-white/10 rounded-full px-4 py-3 mb-6 focus-within:border-white/30 transition-colors">
        <svg className="text-zinc-500 flex-shrink-0" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by card name, set, or category..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-600"
        />
        {search && (
          <button onClick={() => setSearch("")} className="text-zinc-500 hover:text-white transition-colors text-xl leading-none flex-shrink-0">
            ×
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map((cat) => {
          const theme = CATEGORY_COLORS[cat];
          const active = category === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-bold border transition-all"
              style={active
                ? { background: theme?.border ?? "#fff", color: "#000", borderColor: theme?.border ?? "#fff" }
                : { borderColor: (theme?.border ?? "#fff") + "30", color: theme?.border ?? "#a1a1aa", background: "transparent" }
              }
            >
              {theme?.symbol ?? "◆"} {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-zinc-600">
          <p className="text-lg">No auctions found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((auction) => {
            const theme = CATEGORY_COLORS[auction.category] ?? { border: "#ffffff30", glow: "#ffffff10", symbol: "◆", bg: "#11111180" };
            const rarity = getRarityLabel(auction.grade);
            return (
              <a
                key={auction.id}
                href={`/auctions/${auction.id}`}
                className="vb-holo group flex flex-col rounded-2xl overflow-hidden transition-transform hover:-translate-y-1"
                style={{ border: `1px solid ${theme.border}40`, background: theme.bg, boxShadow: `0 4px 24px ${theme.glow}` }}
              >
                {/* Card header bar */}
                <div className="flex items-center justify-between px-3 py-2"
                  style={{ borderBottom: `1px solid ${theme.border}30`, background: `${theme.border}10` }}>
                  <span className="text-xs font-bold" style={{ color: theme.border }}>
                    {theme.symbol} {auction.category}
                  </span>
                  <span className="text-xs text-zinc-400">{auction.year}</span>
                </div>

                {/* Card image */}
                <div className="aspect-[3/4] relative overflow-hidden" style={{ background: "#07050f" }}>
                  {auction.image_url ? (
                    <Image src={auction.image_url} alt={auction.name} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <span className="text-4xl opacity-20">{theme.symbol}</span>
                      <span className="text-zinc-700 text-xs">No Image</span>
                    </div>
                  )}
                  {/* Rarity label overlay */}
                  <div className="absolute bottom-2 left-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(0,0,0,0.7)", color: theme.border, border: `1px solid ${theme.border}50` }}>
                      {rarity}
                    </span>
                  </div>
                </div>

                {/* Card info */}
                <div className="p-3 flex flex-col gap-2" style={{ borderTop: `1px solid ${theme.border}20` }}>
                  <div>
                    <h3 className="font-bold text-sm leading-tight text-white">{auction.name}</h3>
                    <p className="text-xs mt-0.5" style={{ color: theme.border + "99" }}>{auction.set_name} · {auction.grade}</p>
                  </div>
                  <div className="flex items-end justify-between pt-1" style={{ borderTop: `1px solid ${theme.border}15` }}>
                    <div>
                      <p className="text-xs text-zinc-500">Current bid</p>
                      <p className="text-base font-bold text-white">${Number(auction.current_bid).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-zinc-500">{auction.bid_count} bids</p>
                      <p className="text-xs font-bold" style={{ color: "#fb923c" }}>{formatTimeLeft(auction.ends_at)}</p>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
