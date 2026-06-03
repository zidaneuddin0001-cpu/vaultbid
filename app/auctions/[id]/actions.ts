"use server";

import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function placeBid(auctionId: string, amount: number) {
  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "You must be logged in to place a bid." };
  }

  const { error } = await supabase.rpc("place_bid", {
    p_auction_id: auctionId,
    p_amount: amount,
  });

  if (error) {
    return { error: error.message };
  }
}
