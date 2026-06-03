"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { type Bid } from "@/lib/supabase";
import BidForm from "./BidForm";

function getBuyerPremiumRate(price: number): number {
  if (price >= 10000) return 0.04;
  if (price >= 2500) return 0.06;
  if (price >= 500) return 0.08;
  return 0.10;
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

function formatRelativeTime(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function AuctionLiveData({
  auctionId,
  initialBid,
  initialBidCount,
  initialEndsAt,
  initialBids,
}: {
  auctionId: string;
  initialBid: number;
  initialBidCount: number;
  initialEndsAt: string;
  initialBids: Bid[];
}) {
  const router = useRouter();
  const [currentBid, setCurrentBid] = useState(initialBid);
  const [bidCount, setBidCount] = useState(initialBidCount);
  const [bids, setBids] = useState<Bid[]>(initialBids);
  const [timeLeft, setTimeLeft] = useState(formatTimeLeft(initialEndsAt));
  const [ended, setEnded] = useState(new Date(initialEndsAt).getTime() <= Date.now());

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = new Date(initialEndsAt).getTime() - Date.now();
      setTimeLeft(formatTimeLeft(initialEndsAt));
      if (remaining <= 0) setEnded(true);
    }, 30000);
    return () => clearInterval(interval);
  }, [initialEndsAt]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel(`auction-${auctionId}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "auctions", filter: `id=eq.${auctionId}` },
        (payload) => {
          setCurrentBid(Number(payload.new.current_bid));
          setBidCount(payload.new.bid_count);
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bids", filter: `auction_id=eq.${auctionId}` },
        async (payload) => {
          // Fetch the new bid with profile info
          const { data } = await supabase
            .from("bids")
            .select("*, profiles(username)")
            .eq("id", payload.new.id)
            .single();
          if (data) {
            setBids((prev) => [data, ...prev].slice(0, 10));
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [auctionId]);

  function handleBidSuccess() {
    router.refresh();
  }

  const premiumRate = getBuyerPremiumRate(currentBid);
  const buyerPremium = Math.round(currentBid * premiumRate);
  const totalDue = currentBid + buyerPremium;

  return (
    <>
      {/* Timer */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-500 mb-1">{ended ? "Auction ended" : "Auction ends in"}</p>
          <p className={`text-2xl font-bold ${ended ? "text-zinc-500" : "text-orange-400"}`}>{timeLeft}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-zinc-500 mb-1">Total bids</p>
          <p className="text-2xl font-bold">{bidCount}</p>
        </div>
      </div>

      {/* Current bid */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5">
        <p className="text-xs text-zinc-500 mb-1">{ended ? "Final price" : "Current bid"}</p>
        <p className="text-4xl font-bold mb-4">${currentBid.toLocaleString()}</p>

        {ended ? (
          <div className="border-t border-white/10 pt-4">
            <p className="text-sm text-zinc-500 text-center">This auction has ended.</p>
            <a href="/auctions" className="mt-4 block text-center text-sm text-zinc-400 hover:text-white transition-colors">
              Browse live auctions →
            </a>
          </div>
        ) : (
          <>
            <div className="text-xs text-zinc-500 space-y-1 mb-5 border-t border-white/10 pt-4">
              <div className="flex justify-between">
                <span>Hammer price</span>
                <span className="text-white">${currentBid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Buyer premium ({(premiumRate * 100).toFixed(0)}%)</span>
                <span className="text-white">+${buyerPremium.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold text-white pt-1 border-t border-white/10">
                <span>Total if you win</span>
                <span>${totalDue.toLocaleString()}</span>
              </div>
            </div>
            <BidForm auctionId={auctionId} currentBid={currentBid} onSuccess={handleBidSuccess} />
          </>
        )}
      </div>

      {/* Bid history */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Bid History</h2>
        {bids.length === 0 ? (
          <p className="text-zinc-600 text-sm">No bids yet.</p>
        ) : (
          <div className="border border-white/10 rounded-2xl overflow-hidden">
            {bids.map((bid, i) => (
              <div
                key={bid.id}
                className={`flex items-center justify-between px-6 py-4 text-sm ${i !== bids.length - 1 ? "border-b border-white/10" : ""}`}
              >
                <span className="text-zinc-400">{bid.profiles?.username ?? "anonymous"}</span>
                <span className="font-semibold">${Number(bid.amount).toLocaleString()}</span>
                <span className="text-zinc-600 text-xs">{formatRelativeTime(bid.created_at)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
