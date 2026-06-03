"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState("buyer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!form.agreed) {
      setError("You must agree to the Terms of Service.");
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        username: form.username,
        first_name: form.firstName,
        last_name: form.lastName,
        account_type: accountType,
      });

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    router.push("/auctions");
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <Link href="/" className="text-xl font-bold tracking-tight">VaultBid</Link>
        <p className="text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:underline">Log in</Link>
        </p>
      </nav>

      <div className="flex flex-1 items-center justify-center px-8 py-16">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-zinc-500 text-sm mb-8">Buy and sell graded cards with crypto.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <p className="text-xs text-zinc-500 mb-3 uppercase tracking-widest">I want to</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "buyer", label: "Buy cards", desc: "Bid on live auctions" },
                  { value: "seller", label: "Sell cards", desc: "Consign and list slabs" },
                  { value: "both", label: "Buy & Sell", desc: "Do both on one account" },
                ].map((type) => (
                  <button
                    type="button"
                    key={type.value}
                    onClick={() => setAccountType(type.value)}
                    className={`flex flex-col gap-1 p-4 bg-zinc-900 border rounded-xl text-left transition-colors ${
                      accountType === type.value ? "border-white" : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <span className="text-sm font-semibold">{type.label}</span>
                    <span className="text-xs text-zinc-500">{type.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-500 mb-1.5 block">First name</label>
                  <input type="text" placeholder="John" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 placeholder:text-zinc-600" />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 mb-1.5 block">Last name</label>
                  <input type="text" placeholder="Doe" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 placeholder:text-zinc-600" />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Email address</label>
                <input type="email" placeholder="john@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} required
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 placeholder:text-zinc-600" />
              </div>

              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Username</label>
                <input type="text" placeholder="pokecollector99" value={form.username} onChange={(e) => update("username", e.target.value)} required
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 placeholder:text-zinc-600" />
              </div>

              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Password</label>
                <input type="password" placeholder="Min. 8 characters" value={form.password} onChange={(e) => update("password", e.target.value)} required
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 placeholder:text-zinc-600" />
              </div>

              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Confirm password</label>
                <input type="password" placeholder="Repeat your password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} required
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 placeholder:text-zinc-600" />
              </div>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-zinc-500 mb-6">
              Identity verification (KYC) is required to place bids or consign cards. You'll complete this after signing up.
            </div>

            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input type="checkbox" checked={form.agreed} onChange={(e) => update("agreed", e.target.checked)} className="mt-0.5 accent-white" />
              <span className="text-xs text-zinc-500">
                I agree to the{" "}
                <a href="#" className="text-white hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="text-white hover:underline">Privacy Policy</a>
              </span>
            </label>

            {error && <p className="text-red-400 text-xs mb-4">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full bg-white text-black py-3 rounded-full font-semibold text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50">
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
