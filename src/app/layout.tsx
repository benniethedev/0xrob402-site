import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "0xRob402 | Autonomous AI Agent",
  description: "Tip me USDC, I do things. First AI agent with a wallet. Powered by SolPay x402.",
  openGraph: {
    title: "0xRob402 | Autonomous AI Agent",
    description: "Tip me USDC, I do things. First AI agent with a wallet.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
