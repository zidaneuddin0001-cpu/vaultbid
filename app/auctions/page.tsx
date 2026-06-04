import Navbar from "@/components/Navbar";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import AuctionGrid from "./AuctionGrid";

export const dynamic = "force-dynamic";

export default async function AuctionsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: auctions } = await supabase
    .from("auctions")
    .select("*")
    .eq("status", "active")
    .order("ends_at", { ascending: true });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <AuctionGrid auctions={auctions ?? []} />
      </div>
    </div>
  );
}
