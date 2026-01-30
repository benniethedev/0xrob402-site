import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#050508" },
  ],
  width: "device-width",
  initialScale: 1,
};

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
};

// Script to prevent flash of wrong theme
const themeScript = `
  (function() {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.add(theme);
    document.documentElement.classList.remove(theme === 'dark' ? 'light' : 'dark');
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
