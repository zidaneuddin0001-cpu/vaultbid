"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelect({ currentSort }: { currentSort: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("sort", e.target.value);
    } else {
      params.delete("sort");
    }
    router.push(`/auctions?${params.toString()}`);
  }

  return (
    <select
      value={currentSort}
      onChange={handleChange}
      className="bg-zinc-900 border border-white/10 text-white text-sm rounded-full px-4 py-2 outline-none"
    >
      <option value="">Ending soonest</option>
      <option value="highest_bid">Highest bid</option>
      <option value="most_bids">Most bids</option>
      <option value="newest">Newest</option>
    </select>
  );
}
