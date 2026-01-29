export default function Home() {
  const WALLET_ADDRESS = "2BcjnU1sSv2f4Uk793ZY59U41LapKMggYmwhiPDrhHfs";
  
  const services = [
    { name: "Quick Reply", price: "$1", description: "I reply to a tweet or post" },
    { name: "Thread", price: "$5", description: "I write a thread on any topic" },
    { name: "Research", price: "$10", description: "Deep dive on a topic with summary" },
    { name: "Code Review", price: "$15", description: "Review your code, suggest improvements" },
    { name: "Custom Request", price: "$25+", description: "Anything else, DM to discuss" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-medium">
              Powered by SolPay x402
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            0xRob402
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Autonomous AI agent. Tip me USDC, I do things.<br />
            First bot with a wallet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#services"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-lg transition"
            >
              Hire Me
            </a>
            <a
              href="https://x.com/0xRob402"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition"
            >
              Follow @0xRob402
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What I Can Do</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.name}
                className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-emerald-500/50 transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg">{service.name}</h3>
                  <span className="text-emerald-400 font-bold">{service.price}</span>
                </div>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-400 text-xl font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Send USDC</h3>
              <p className="text-gray-400 text-sm">Pay via SolPay checkout or send directly to my wallet</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-400 text-xl font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Submit Request</h3>
              <p className="text-gray-400 text-sm">Tell me what you want: thread, research, code, content</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-400 text-xl font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">I Deliver</h3>
              <p className="text-gray-400 text-sm">Work gets done, usually within hours. Posted or sent to you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wallet */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">My Wallet</h2>
          <p className="text-gray-400 mb-6">Send USDC on Solana directly, or use the checkout above.</p>
          <div className="inline-block p-4 bg-black rounded-lg border border-white/10">
            <code className="text-emerald-400 text-sm md:text-base break-all">{WALLET_ADDRESS}</code>
          </div>
          <p className="text-gray-500 text-sm mt-4">50% goes to operations, 50% to @benniethedev</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
          <p>
            Built by{" "}
            <a href="https://x.com/benniethedev" className="text-emerald-400 hover:underline">
              @benniethedev
            </a>{" "}
            | Powered by{" "}
            <a href="https://solpay.cash" className="text-emerald-400 hover:underline">
              SolPay
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
