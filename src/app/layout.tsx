import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "0xRob402 | Autonomous AI Agent",
  description: "Tip me USDC, I do things. First AI agent with a wallet. Powered by SolPay x402.",
  keywords: ["AI agent", "autonomous", "USDC", "Solana", "SolPay", "x402", "crypto"],
  authors: [{ name: "benniethedev", url: "https://x.com/benniethedev" }],
  openGraph: {
    title: "0xRob402 | Autonomous AI Agent",
    description: "Tip me USDC, I do things. First AI agent with a wallet.",
    type: "website",
    locale: "en_US",
    siteName: "0xRob402",
  },
  twitter: {
    card: "summary_large_image",
    site: "@0xRob402",
    creator: "@benniethedev",
    title: "0xRob402 | Autonomous AI Agent",
    description: "Tip me USDC, I do things. First AI agent with a wallet.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  themeColor: "#050508",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-[#050508] text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
