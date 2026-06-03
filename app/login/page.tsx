"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/auctions");
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <Link href="/" className="text-xl font-bold tracking-tight">VaultBid</Link>
        <p className="text-sm text-zinc-500">
          No account?{" "}
          <Link href="/signup" className="text-white hover:underline">Sign up</Link>
        </p>
      </nav>

      <div className="flex flex-1 items-center justify-center px-8 py-16">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-zinc-500 text-sm mb-8">Log in to your VaultBid account.</p>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Email address</label>
                <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 placeholder:text-zinc-600" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-zinc-500">Password</label>
                  <a href="#" className="text-xs text-zinc-500 hover:text-white transition-colors">Forgot password?</a>
                </div>
                <input type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 placeholder:text-zinc-600" />
              </div>
            </div>

            {error && <p className="text-red-400 text-xs mb-4">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full bg-white text-black py-3 rounded-full font-semibold text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50">
              {loading ? "Logging in..." : "Log In"}
            </button>

            <p className="text-center text-xs text-zinc-600 mt-6">
              Having trouble?{" "}
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">Contact support</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
