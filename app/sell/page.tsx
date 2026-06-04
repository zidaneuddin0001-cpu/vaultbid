"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { lookupCardImage } from "@/lib/card-images";
import { createListing } from "./actions";

const CATEGORIES = ["Pokémon", "Magic", "One Piece", "Sports"];
const GRADERS = ["PSA", "BGS", "CGC", "SGC"];
const GRADES = ["10", "9.5", "9", "8.5", "8", "7.5", "7"];
const DURATIONS = [7, 10, 14];

export default function SellPage() {
  const [form, setForm] = useState({
    name: "",
    setName: "",
    year: new Date().getFullYear(),
    category: "Pokémon",
    grader: "PSA",
    grade: "10",
    certNumber: "",
    startingBid: "",
    durationDays: 7,
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLooking, setImageLooking] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function update(field: string, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleLookup() {
    if (!form.name || !form.setName || !form.category) return;
    setImageLooking(true);
    setImageUrl(null);
    const url = await lookupCardImage(form.category, form.name, form.setName);
    setImageUrl(url);
    setImageLooking(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const startingBid = parseFloat(form.startingBid);
    if (isNaN(startingBid) || startingBid <= 0) {
      setError("Enter a valid starting bid.");
      return;
    }

    startTransition(async () => {
      const result = await createListing({
        name: form.name,
        setName: form.setName,
        year: Number(form.year),
        grade: `${form.grader} ${form.grade}`,
        grader: form.grader,
        certNumber: form.certNumber,
        category: form.category,
        imageUrl,
        startingBid,
        durationDays: form.durationDays,
      });
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <Link href="/" className="text-xl font-bold tracking-tight">VaultBid</Link>
        <Link href="/auctions" className="text-sm text-zinc-400 hover:text-white transition-colors">Browse</Link>
      </nav>

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12">
        <h1 className="text-3xl font-bold mb-2">List a card</h1>
        <p className="text-zinc-500 text-sm mb-10">Fill in the details — we'll auto-fetch the card image.</p>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left — form fields */}
            <div className="flex flex-col gap-5">
              {/* Category */}
              <div>
                <label className="text-xs text-zinc-500 mb-2 block uppercase tracking-widest">Category</label>
                <div className="flex gap-2 flex-wrap">
                  {CATEGORIES.map((cat) => (
                    <button type="button" key={cat} onClick={() => { update("category", cat); setImageUrl(null); }}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${form.category === cat ? "bg-white text-black border-white" : "border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name + Set */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-500 mb-1.5 block">Card name</label>
                  <input type="text" placeholder="Charizard" value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    onBlur={handleLookup} required
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 placeholder:text-zinc-600" />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 mb-1.5 block">Set</label>
                  <input type="text" placeholder="Base Set" value={form.setName}
                    onChange={(e) => update("setName", e.target.value)}
                    onBlur={handleLookup} required
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 placeholder:text-zinc-600" />
                </div>
              </div>

              {/* Year */}
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Year</label>
                <input type="number" placeholder="1999" value={form.year}
                  onChange={(e) => update("year", e.target.value)} required
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 placeholder:text-zinc-600" />
              </div>

              {/* Grader + Grade */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-500 mb-1.5 block">Grading company</label>
                  <select value={form.grader} onChange={(e) => update("grader", e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30">
                    {GRADERS.map((g) => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 mb-1.5 block">Grade</label>
                  <select value={form.grade} onChange={(e) => update("grade", e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30">
                    {GRADES.map((g) => <option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              {/* Cert number */}
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Cert number <span className="text-zinc-700">(optional)</span></label>
                <input type="text" placeholder="12345678" value={form.certNumber}
                  onChange={(e) => update("certNumber", e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 placeholder:text-zinc-600" />
              </div>

              {/* Starting bid */}
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Starting bid (USD)</label>
                <input type="number" placeholder="100" value={form.startingBid}
                  onChange={(e) => update("startingBid", e.target.value)} required min="1"
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 placeholder:text-zinc-600" />
              </div>

              {/* Duration */}
              <div>
                <label className="text-xs text-zinc-500 mb-2 block uppercase tracking-widest">Auction duration</label>
                <div className="flex gap-2">
                  {DURATIONS.map((d) => (
                    <button type="button" key={d} onClick={() => update("durationDays", d)}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${form.durationDays === d ? "bg-white text-black border-white" : "border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"}`}>
                      {d} days
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-red-400 text-xs">{error}</p>}

              <button type="submit" disabled={isPending}
                className="w-full bg-white text-black py-3 rounded-full font-semibold text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50 mt-2">
                {isPending ? "Creating listing..." : "Create listing"}
              </button>
            </div>

            {/* Right — image preview */}
            <div className="flex flex-col gap-4">
              <label className="text-xs text-zinc-500 uppercase tracking-widest">Card image preview</label>
              <div className="aspect-[3/4] bg-zinc-900 border border-white/10 rounded-2xl relative overflow-hidden flex items-center justify-center">
                {imageLooking ? (
                  <p className="text-zinc-500 text-sm animate-pulse">Looking up image...</p>
                ) : imageUrl ? (
                  <Image src={imageUrl} alt={form.name} fill className="object-contain p-4" unoptimized />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center px-6">
                    <p className="text-zinc-600 text-sm">Fill in the card name and set to auto-fetch the image</p>
                    {form.name && form.setName && (
                      <button type="button" onClick={handleLookup}
                        className="text-xs text-zinc-400 border border-white/10 px-4 py-2 rounded-full hover:border-white/30 transition-colors">
                        Try again
                      </button>
                    )}
                  </div>
                )}
              </div>
              {imageUrl && (
                <button type="button" onClick={() => setImageUrl(null)}
                  className="text-xs text-zinc-600 hover:text-white transition-colors text-center">
                  Remove image
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
