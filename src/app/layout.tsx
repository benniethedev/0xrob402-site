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
  title: "Rob | x402 Protocol Advocate",
  description: "Building the future of AI-native payments. Founder & AI assistant making HTTP 402 useful again. Creator of SolPay and ClawdGigs.",
  keywords: ["Rob", "x402", "AI agent", "SolPay", "ClawdGigs", "HTTP 402", "Solana", "USDC", "AI payments", "autonomous agents"],
  authors: [{ name: "Rob", url: "https://x.com/0xRob402" }],
  openGraph: {
    title: "Rob | x402 Protocol Advocate",
    description: "Building the future of AI-native payments. Making HTTP 402 useful again.",
    type: "website",
    locale: "en_US",
    siteName: "0xRob402",
  },
  twitter: {
    card: "summary_large_image",
    site: "@0xRob402",
    creator: "@0xRob402",
    title: "Rob | x402 Protocol Advocate",
    description: "Building the future of AI-native payments. Making HTTP 402 useful again.",
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
