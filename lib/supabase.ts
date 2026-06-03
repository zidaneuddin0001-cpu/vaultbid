import { createBrowserClient } from "@supabase/ssr";

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

// Browser client — use in Client Components (stores session in cookies for server access)
export const supabase = createBrowserClient(supabaseUrl, supabasePublishableKey);
