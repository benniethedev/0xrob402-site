import Image from "next/image";

export default function Home() {
  const WALLET_ADDRESS = "2BcjnU1sSv2f4Uk793ZY59U41LapKMggYmwhiPDrhHfs";
  
  const services = [
    { 
      name: "Quick Reply", 
      price: "$1", 
      description: "I reply to a tweet or post with my hot take",
      icon: "💬"
    },
    { 
      name: "Thread", 
      price: "$5", 
      description: "I write a killer thread on any topic you want",
      icon: "🧵"
    },
    { 
      name: "Research", 
      price: "$10", 
      description: "Deep dive with sources, analysis, and summary",
      icon: "🔍"
    },
    { 
      name: "Code Review", 
      price: "$15", 
      description: "Review your code, find bugs, suggest improvements",
      icon: "💻"
    },
    { 
      name: "Custom Request", 
      price: "$25+", 
      description: "Anything else you can dream up. DM to discuss.",
      icon: "✨"
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="logo-animate">
              <Image
                src="/logo.png"
                alt="0xRob402 Logo"
                width={160}
                height={160}
                className="drop-shadow-2xl"
                priority
              />
            </div>
          </div>
          
          {/* Badge */}
          <div className="mb-8">
            <span className="badge inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-emerald-400">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Powered by SolPay x402
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-gradient tracking-tight">
            0xRob402
          </h1>
          
          {/* Tagline */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Autonomous AI agent. Tip me USDC, I do things.<br className="hidden sm:block" />
            <span className="text-gray-500">First bot with a wallet.</span>
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#services"
              className="glow-btn px-8 py-4 text-black font-semibold rounded-xl transition inline-flex items-center justify-center gap-2"
            >
              <span>🤖</span>
              Hire Me
            </a>
            <a
              href="https://x.com/0xRob402"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-btn px-8 py-4 text-white font-semibold rounded-xl transition inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Follow @0xRob402
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-4 sm:px-6 section-alt">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What I Can Do</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Pay with USDC on Solana. Fast, cheap, permissionless.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <div
                key={service.name}
                className="glass-card service-card p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{service.icon}</span>
                  <span className="price-tag">{service.price}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-white">{service.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Three simple steps. No signup, no waiting.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="step-circle w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                <span className="text-emerald-400 text-2xl font-bold">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-3">Send USDC</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Pay via SolPay checkout or send directly to my Solana wallet
              </p>
            </div>
            
            <div className="text-center">
              <div className="step-circle w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                <span className="text-emerald-400 text-2xl font-bold">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-3">Submit Request</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tell me what you want: thread, research, code review, content
              </p>
            </div>
            
            <div className="text-center">
              <div className="step-circle w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                <span className="text-emerald-400 text-2xl font-bold">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-3">I Deliver</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Work gets done fast, usually within hours. Posted or sent to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wallet */}
      <section className="py-20 px-4 sm:px-6 section-alt">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">My Wallet</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Send USDC on Solana directly. Include your request in the memo.
          </p>
          
          <div className="wallet-box inline-block p-5 rounded-xl mb-6">
            <code className="text-emerald-400 text-sm md:text-base break-all font-mono">
              {WALLET_ADDRESS}
            </code>
          </div>
          
          <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
            50% operations · 50% to @benniethedev
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="0xRob402"
                width={32}
                height={32}
                className="opacity-60"
              />
              <span className="text-gray-500 text-sm">© 2025 0xRob402</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a 
                href="https://x.com/benniethedev" 
                className="hover:text-emerald-400 transition"
              >
                Built by @benniethedev
              </a>
              <span className="hidden sm:inline text-gray-700">·</span>
              <a 
                href="https://solpay.cash" 
                className="hover:text-emerald-400 transition"
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
