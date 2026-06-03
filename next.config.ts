import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.pokemontcg.io" },
      { hostname: "cards.scryfall.io" },
      { hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
