import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export type Profile = {
  id: string;
  username: string;
  created_at: string;
};

export type Auction = {
  id: string;
  name: string;
  set_name: string;
  year: number;
  grade: string;
  grader: string;
  cert_number: string | null;
  category: string;
  image_url: string | null;
  seller_id: string;
  starting_bid: number;
  current_bid: number;
  bid_count: number;
  ends_at: string;
  status: "active" | "ended" | "cancelled";
  created_at: string;
  profiles?: Pick<Profile, "username">;
};

export type Bid = {
  id: string;
  auction_id: string;
  bidder_id: string;
  amount: number;
  created_at: string;
  profiles?: Pick<Profile, "username">;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Browser client — use in Client Components
export const supabase = createClient(supabaseUrl, supabasePublishableKey);

// Server client — use in Server Components and Server Actions (handles auth cookies)
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component — cookies can't be set, safe to ignore
        }
      },
    },
  });
}
