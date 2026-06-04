"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        const { data } = await supabase.from("profiles").select("username").eq("id", user.id).single();
        setUsername(data?.username ?? null);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data } = await supabase.from("profiles").select("username").eq("id", session.user.id).single();
        setUsername(data?.username ?? null);
      } else {
        setUsername(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 glass">
      <div className="flex items-center justify-between px-4 sm:px-8 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">VaultBid</Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center">
          <Link href="/auctions" className="text-sm text-zinc-400 hover:text-white transition-colors" style={{ marginRight: "1.5rem" }}>Browse</Link>
          <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors" style={{ marginRight: "1.5rem" }}>How it works</Link>
          {!loading && (
            username ? (
              <>
                <Link href="/sell" className="text-sm text-zinc-400 hover:text-white transition-colors" style={{ marginRight: "1.5rem" }}>Sell</Link>
                <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors" style={{ marginRight: "1.5rem" }}>{username}</Link>
                <button onClick={handleLogout}
                  className="text-sm bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-zinc-200 transition-colors">
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/sell" className="text-sm text-zinc-400 hover:text-white transition-colors" style={{ marginRight: "1.5rem" }}>Sell</Link>
                <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors" style={{ marginRight: "1.5rem" }}>Log in</Link>
                <Link href="/signup" className="text-sm bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-zinc-200 transition-colors">Sign up</Link>
              </>
            )
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="sm:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          <Link href="/auctions" onClick={() => setMenuOpen(false)} className="text-sm text-zinc-300">Browse Auctions</Link>
          <Link href="/sell" onClick={() => setMenuOpen(false)} className="text-sm text-zinc-300">Sell a Card</Link>
          {!loading && (
            username ? (
              <>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="text-sm text-zinc-300">{username}'s Dashboard</Link>
                <button onClick={handleLogout} className="text-sm text-left text-red-400">Log out</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="text-sm text-zinc-300">Log in</Link>
                <Link href="/signup" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-white">Sign up</Link>
              </>
            )
          )}
        </div>
      )}
    </nav>
  );
}
