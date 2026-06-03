"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function createListing(formData: {
  name: string;
  setName: string;
  year: number;
  grade: string;
  grader: string;
  certNumber: string;
  category: string;
  imageUrl: string | null;
  startingBid: number;
  durationDays: number;
}) {
  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "You must be logged in to create a listing." };

  const endsAt = new Date();
  endsAt.setDate(endsAt.getDate() + formData.durationDays);

  const { data, error } = await supabase.from("auctions").insert({
    name: formData.name,
    set_name: formData.setName,
    year: formData.year,
    grade: formData.grade,
    grader: formData.grader,
    cert_number: formData.certNumber || null,
    category: formData.category,
    image_url: formData.imageUrl,
    seller_id: user.id,
    starting_bid: formData.startingBid,
    current_bid: formData.startingBid,
    ends_at: endsAt.toISOString(),
  }).select("id").single();

  if (error) return { error: error.message };

  redirect(`/auctions/${data.id}`);
}
