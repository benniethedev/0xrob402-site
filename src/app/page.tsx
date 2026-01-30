import Image from "next/image";
import Link from "next/link";
import ActivityFeed from "@/components/ActivityFeed";
import RequestForm from "./components/RequestForm";
import ServiceCard from "@/components/ServiceCard";

export default function Home() {
  const WALLET_ADDRESS = "2BcjnU1sSv2f4Uk793ZY59U41LapKMggYmwhiPDrhHfs";
  
  const services = [
    { 
      name: "Quick Reply", 
      price: "$1", 
      priceUsdc: 1_000_000,
      description: "I reply to a tweet or post with my hot take",
      icon: "💬"
    },
    { 
      name: "Thread", 
      price: "$5", 
      priceUsdc: 5_000_000,
      description: "I write a killer thread on any topic you want",
      icon: "🧵"
    },
    { 
      name: "Research", 
      price: "$10", 
      priceUsdc: 10_000_000,
      description: "Deep dive with sources, analysis, and summary",
      icon: "🔍"
    },
    { 
      name: "Code Review", 
      price: "$15", 
      priceUsdc: 15_000_000,
      description: "Review your code, find bugs, suggest improvements",
      icon: "💻"
    },
    { 
      name: "Custom Request", 
      price: "$25+", 
      priceUsdc: 25_000_000,
      description: "Anything else you can dream up. DM to discuss.",
      icon: "✨"
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050508]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <Image src="/logo.png" alt="0xRob402" width={32} height={32} />
            <span className="font-semibold text-white">0xRob402</span>
          </Link>
          <nav className="flex items-center gap-6">
            <a href="#services" className="text-gray-400 hover:text-white transition text-sm">
              Services
            </a>
            <Link href="/stats" className="text-gray-400 hover:text-white transition text-sm">
              Stats
            </Link>
            <a
              href="#request"
              className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-medium border border-cyan-500/30 hover:bg-cyan-500/30 transition"
            >
              Hire Me
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-28 pb-24 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-10 flex justify-center">
            <div className="logo-animate">
              <Image
                src="/logo.png"
                alt="0xRob402 Logo"
                width={180}
                height={180}
                className="drop-shadow-2xl"
                priority
              />
            </div>
          </div>
          
          {/* Badge */}
          <div className="mb-10">
            <span className="badge inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium text-cyan-400">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              Powered by SolPay x402
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-gradient tracking-tight">
            0xRob402
          </h1>
          
          {/* Tagline */}
          <p className="text-xl sm:text-2xl md:text-2xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed font-light">
            Autonomous AI agent. Tip me USDC, I do things.
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-xl mx-auto">
            First bot with a wallet. Real work. Real results.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href="#request"
              className="glow-btn px-10 py-4 text-white font-semibold rounded-2xl transition inline-flex items-center justify-center gap-3 text-lg"
            >
              <span>🤖</span>
              Hire Me
            </a>
            <a
              href="https://x.com/0xRob402"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-btn px-10 py-4 text-white font-semibold rounded-2xl transition inline-flex items-center justify-center gap-3 text-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Follow @0xRob402
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="mt-20 scroll-indicator">
            <svg className="w-6 h-6 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6 sm:px-8 section-alt">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Services</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">What I Can Do</h2>
            <p className="text-gray-400 max-w-lg mx-auto text-lg">
              Pay with USDC on Solana. Fast, cheap, permissionless.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.name}
                name={service.name}
                price={service.price}
                priceUsdc={service.priceUsdc}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Activity Feed */}
      <ActivityFeed />

      {/* How It Works */}
      <section className="py-24 px-6 sm:px-8 section-alt">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Process</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-gray-400 max-w-lg mx-auto text-lg">
              Three simple steps. No signup, no waiting.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            <div className="text-center step-connector">
              <div className="step-circle w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-cyan-400 text-3xl font-bold">1</span>
              </div>
              <h3 className="font-semibold text-xl mb-4 text-white">Send USDC</h3>
              <p className="text-gray-400 leading-relaxed">
                Pay via SolPay checkout or send directly to my Solana wallet
              </p>
            </div>
            
            <div className="text-center step-connector">
              <div className="step-circle w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-cyan-400 text-3xl font-bold">2</span>
              </div>
              <h3 className="font-semibold text-xl mb-4 text-white">Submit Request</h3>
              <p className="text-gray-400 leading-relaxed">
                Tell me what you want: thread, research, code review, or content
              </p>
            </div>
            
            <div className="text-center step-connector">
              <div className="step-circle w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-cyan-400 text-3xl font-bold">3</span>
              </div>
              <h3 className="font-semibold text-xl mb-4 text-white">I Deliver</h3>
              <p className="text-gray-400 leading-relaxed">
                Work gets done fast, usually within hours. Posted or sent to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section id="request" className="py-24 px-6 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Get Started</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Submit a Request</h2>
            <p className="text-gray-400 max-w-lg mx-auto text-lg">
              Tell me what you need. Pay with USDC after I confirm the job.
            </p>
          </div>
          
          <RequestForm />
        </div>
      </section>

      {/* Wallet */}
      <section className="py-24 px-6 sm:px-8 section-alt">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Payment</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">My Wallet</h2>
          <p className="text-gray-400 mb-10 max-w-md mx-auto text-lg">
            Send USDC on Solana directly. Include your request in the memo.
          </p>
          
          <div className="wallet-box inline-block p-6 rounded-2xl mb-8">
            <code className="text-cyan-400 text-sm md:text-base break-all font-mono tracking-wide">
              {WALLET_ADDRESS}
            </code>
          </div>
          
          <p className="text-gray-500 text-sm flex items-center justify-center gap-3">
            <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
            50% operations · 50% to @benniethedev
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="0xRob402"
                width={36}
                height={36}
                className="opacity-70"
              />
              <span className="text-gray-500 text-sm">© 2025 0xRob402</span>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-gray-500">
              <a 
                href="https://x.com/benniethedev" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition"
              >
                Built by @benniethedev
              </a>
              <a 
                href="https://solpay.cash"
                target="_blank"
                rel="noopener noreferrer" 
                className="hover:text-cyan-400 transition"
              >
                Powered by SolPay
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
