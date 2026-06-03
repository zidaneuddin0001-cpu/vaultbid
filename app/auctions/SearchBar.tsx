"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";

export default function SearchBar({ currentSearch }: { currentSearch: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(currentSearch);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      router.push(`/auctions?${params.toString()}`);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative mb-8">
      <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by card name, set, or category..."
        className="w-full bg-zinc-900 border border-white/10 rounded-full pl-11 pr-4 py-3 text-sm outline-none focus:border-white/30 placeholder:text-zinc-600"
      />
      {value && (
        <button
          onClick={() => setValue("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors text-lg leading-none"
        >
          ×
        </button>
      )}
    </div>
  );
}
