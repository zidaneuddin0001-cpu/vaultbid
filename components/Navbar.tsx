"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .single();
        setUsername(data?.username ?? null);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", session.user.id)
          .single();
        setUsername(data?.username ?? null);
      } else {
        setUsername(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
      <Link href="/" className="text-xl font-bold tracking-tight">VaultBid</Link>
      <div className="flex items-center gap-4">
        <Link href="/auctions" className="text-sm text-zinc-400 hover:text-white transition-colors">Browse</Link>
        <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">How it works</Link>
        {!loading && (
          username ? (
            <>
              <Link href="/sell" className="text-sm text-zinc-400 hover:text-white transition-colors">Sell</Link>
              <span className="text-sm text-zinc-400">{username}</span>
              <button
                onClick={handleLogout}
                className="text-sm bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-zinc-200 transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/sell" className="text-sm text-zinc-400 hover:text-white transition-colors">Sell</Link>
              <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors">Log in</Link>
              <Link href="/signup" className="text-sm bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-zinc-200 transition-colors">Sign up</Link>
            </>
          )
        )}
      </div>
    </nav>
  );
}
