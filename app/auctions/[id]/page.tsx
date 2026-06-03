import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { createSupabaseServerClient } from "@/lib/supabase-server";
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

export const dynamic = "force-dynamic";

export default async function AuctionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const [{ data: auction }, { data: bids }] = await Promise.all([
    supabase
      .from("auctions")
      .select("*, profiles(username)")
      .eq("id", id)
      .single(),
    supabase
      .from("bids")
      .select("*, profiles(username)")
      .eq("auction_id", id)
      .order("amount", { ascending: false })
      .limit(10),
  ]);

  if (!auction) notFound();

  const currentBid = Number(auction.current_bid);
  const premiumRate = getBuyerPremiumRate(currentBid);
  const buyerPremium = Math.round(currentBid * premiumRate);
  const totalDue = currentBid + buyerPremium;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <div className="text-xs text-zinc-500 mb-8">
          <a href="/auctions" className="hover:text-white transition-colors">Live Auctions</a>
          <span className="mx-2">/</span>
          <span>{auction.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — Card image */}
          <div className="flex flex-col gap-4">
            <div className="aspect-[3/4] bg-zinc-900 border border-white/10 rounded-2xl relative overflow-hidden">
              {auction.image_url ? (
                <Image src={auction.image_url} alt={auction.name} fill className="object-cover rounded-2xl" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-zinc-600 text-sm">Card Image</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-zinc-900 border border-white/10 rounded-xl flex items-center justify-center">
                  <span className="text-zinc-700 text-xs">View {i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Auction details */}
          <div className="flex flex-col gap-6">
            {/* Title */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-zinc-500">{auction.category} · {auction.set_name} · {auction.year}</span>
              </div>
              <h1 className="text-4xl font-bold mb-3">{auction.name}</h1>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold bg-zinc-800 border border-white/10 px-3 py-1 rounded-full">{auction.grade}</span>
                {auction.cert_number && (
                  <span className="text-sm text-zinc-500">Cert #{auction.cert_number}</span>
                )}
              </div>
            </div>

            {/* Timer */}
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-500 mb-1">Auction ends in</p>
                <p className="text-2xl font-bold text-orange-400">{formatTimeLeft(auction.ends_at)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-500 mb-1">Total bids</p>
                <p className="text-2xl font-bold">{auction.bid_count}</p>
              </div>
            </div>

            {/* Current bid */}
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5">
              <p className="text-xs text-zinc-500 mb-1">Current bid</p>
              <p className="text-4xl font-bold mb-4">${currentBid.toLocaleString()}</p>

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

              <BidForm auctionId={auction.id} currentBid={currentBid} />
            </div>

            {/* Card details */}
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5">
              <h3 className="text-sm font-semibold mb-3">Card Details</h3>
              <div className="grid grid-cols-2 gap-y-2 text-xs">
                {[
                  ["Name", auction.name],
                  ["Set", auction.set_name],
                  ["Year", auction.year],
                  ["Category", auction.category],
                  ["Grading Company", auction.grader],
                  ["Grade", auction.grade],
                  ...(auction.cert_number ? [["Cert Number", auction.cert_number]] : []),
                  ["Seller", auction.profiles?.username ?? "—"],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <p className="text-zinc-500">{label}</p>
                    <p className="text-white font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bid history */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">Bid History</h2>
          {!bids || bids.length === 0 ? (
            <p className="text-zinc-600 text-sm">No bids yet.</p>
          ) : (
            <div className="border border-white/10 rounded-2xl overflow-hidden">
              {bids.map((bid: Bid, i: number) => (
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
      </div>
    </div>
  );
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
