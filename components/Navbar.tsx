import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
      <Link href="/" className="text-xl font-bold tracking-tight">VaultBid</Link>
      <div className="flex items-center gap-4">
        <Link href="/auctions" className="text-sm text-zinc-400 hover:text-white transition-colors">Browse</Link>
        <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">How it works</Link>
        <Link href="/sell" className="text-sm text-zinc-400 hover:text-white transition-colors">Sell</Link>
        <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors">Log in</Link>
        <Link href="/signup" className="text-sm bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-zinc-200 transition-colors">Sign up</Link>
      </div>
    </nav>
  );
}
