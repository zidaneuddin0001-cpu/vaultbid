"use client";

import { useState } from "react";
import { placeBid } from "./actions";

export default function BidForm({
  auctionId,
  currentBid,
}: {
  auctionId: string;
  currentBid: number;
}) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= currentBid) {
      setError(`Bid must exceed $${currentBid.toLocaleString()}`);
      return;
    }
    setLoading(true);
    const result = await placeBid(auctionId, parsed);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setAmount("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-3">
        <input
          type="number"
          placeholder={`Min. $${(currentBid + 50).toLocaleString()}`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="flex-1 bg-zinc-800 border border-white/10 rounded-full px-4 py-3 text-sm outline-none focus:border-white/30 placeholder:text-zinc-600"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors whitespace-nowrap disabled:opacity-50"
        >
          {loading ? "Placing..." : "Place Bid"}
        </button>
      </div>
      {error && <p className="text-red-400 text-xs mt-3">{error}</p>}
      {success && <p className="text-green-400 text-xs mt-3">Bid placed successfully!</p>}
      <p className="text-xs text-zinc-600 mt-3 text-center">
        Payment in USDT or USDC only. Buyer premium applied at checkout.
      </p>
    </form>
  );
}
