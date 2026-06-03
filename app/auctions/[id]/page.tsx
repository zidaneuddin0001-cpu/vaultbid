import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import AuctionLiveData from "./AuctionLiveData";

export const dynamic = "force-dynamic";

export default async function AuctionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const [{ data: auction }, { data: bids }] = await Promise.all([
    supabase.from("auctions").select("*, profiles(username)").eq("id", id).single(),
    supabase.from("bids").select("*, profiles(username)").eq("auction_id", id).order("amount", { ascending: false }).limit(10),
  ]);

  if (!auction) notFound();

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
                <Image src={auction.image_url} alt={auction.name} fill className="object-cover rounded-2xl" unoptimized />
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

            {/* Live bid data — timer, current bid, bid form */}
            <AuctionLiveData
              auctionId={auction.id}
              initialBid={Number(auction.current_bid)}
              initialBidCount={auction.bid_count}
              initialEndsAt={auction.ends_at}
              initialBids={bids ?? []}
            />

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
      </div>
    </div>
  );
}
