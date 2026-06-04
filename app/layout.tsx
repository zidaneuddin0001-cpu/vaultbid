import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VaultBid — TCG Auction House",
  description: "Buy and sell graded trading cards with crypto. Pokémon, One Piece, Magic, Sports.",
};

const ANIMATION_CSS = `
  @keyframes float-card-1 {
    0%, 100% { transform: translateY(0px) rotate(-8deg); }
    50%       { transform: translateY(-20px) rotate(-6deg); }
  }
  @keyframes float-card-2 {
    0%, 100% { transform: translateY(0px) rotate(6deg); }
    50%       { transform: translateY(-15px) rotate(9deg); }
  }
  @keyframes float-card-3 {
    0%, 100% { transform: translateY(0px) rotate(-3deg); }
    50%       { transform: translateY(-25px) rotate(-5deg); }
  }
  @keyframes ticker-move {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes scan-move {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(3000px); }
  }
  @keyframes sparkle-pop {
    0%, 100% { opacity: 0; transform: scale(0); }
    50%       { opacity: 1; transform: scale(1); }
  }
  @keyframes btn-sweep {
    0%        { transform: translateX(-200%); }
    60%, 100% { transform: translateX(400%); }
  }
  .vb-gold-text {
    background: linear-gradient(90deg, #f59e0b, #fde68a, #fbbf24);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .vb-gold-btn {
    position: relative;
    background: linear-gradient(90deg, #d97706, #f59e0b, #fbbf24, #f59e0b, #d97706);
    overflow: hidden;
  }
  .vb-gold-btn::before {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
    animation: btn-sweep 2.5s ease-in-out infinite;
  }
  .vb-float-1 { animation: float-card-1 6s ease-in-out infinite; }
  .vb-float-2 { animation: float-card-2 7s ease-in-out infinite 0.5s; }
  .vb-float-3 { animation: float-card-3 5s ease-in-out infinite 1s; }
  .vb-ticker   { animation: ticker-move 35s linear infinite; }
  .vb-scan     { animation: scan-move 6s linear infinite; }
  .vb-sparkle-1 { animation: sparkle-pop 2s ease-in-out infinite 0s; }
  .vb-sparkle-2 { animation: sparkle-pop 2s ease-in-out infinite 0.7s; }
  .vb-sparkle-3 { animation: sparkle-pop 2s ease-in-out infinite 1.4s; }
  .vb-holo { position: relative; overflow: hidden; }
  .vb-holo::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(125deg, transparent 20%, rgba(255,255,255,0.03) 30%, rgba(120,80,255,0.07) 40%, rgba(0,200,255,0.07) 50%, rgba(255,200,0,0.05) 60%, transparent 80%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }
  .vb-holo:hover::after { opacity: 1; }
  .glass {
    background: rgba(7,5,15,0.75);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: ANIMATION_CSS }} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
