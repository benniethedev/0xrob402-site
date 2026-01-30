'use client';

import { useState, type ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StatsChart from '@/components/StatsChart';
import StatCard from '@/components/StatCard';
import ThemeToggle from '@/components/ThemeToggle';

// Mock data - in production this would come from API/database
const mockStats = {
  totalRevenue: 847,
  totalRequests: 156,
  avgRequestValue: 5.43,
  completionRate: 100,
  uniqueClients: 42,
  repeatRate: 68,
};

const dailyData = [
  { label: 'Mon', value: 12, revenue: 48 },
  { label: 'Tue', value: 18, revenue: 72 },
  { label: 'Wed', value: 24, revenue: 156 },
  { label: 'Thu', value: 15, revenue: 95 },
  { label: 'Fri', value: 31, revenue: 189 },
  { label: 'Sat', value: 22, revenue: 142 },
  { label: 'Sun', value: 28, revenue: 145 },
];

const weeklyData = [
  { label: 'W1', value: 45, revenue: 287 },
  { label: 'W2', value: 62, revenue: 412 },
  { label: 'W3', value: 38, revenue: 198 },
  { label: 'W4', value: 71, revenue: 523 },
];

const monthlyData = [
  { label: 'Oct', value: 89, revenue: 478 },
  { label: 'Nov', value: 124, revenue: 687 },
  { label: 'Dec', value: 156, revenue: 892 },
  { label: 'Jan', value: 156, revenue: 847 },
];

const serviceBreakdown = [
  { name: 'Quick Reply', count: 68, revenue: 68, color: '#0ea5e9', icon: '💬' },
  { name: 'Thread', count: 42, revenue: 210, color: '#38bdf8', icon: '🧵' },
  { name: 'Research', count: 28, revenue: 280, color: '#06b6d4', icon: '🔍' },
  { name: 'Code Review', count: 12, revenue: 180, color: '#22d3ee', icon: '💻' },
  { name: 'Custom', count: 6, revenue: 109, color: '#67e8f9', icon: '✨' },
];

type TimeRange = 'daily' | 'weekly' | 'monthly';

export default function StatsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');
  
  const chartData = {
    daily: dailyData,
    weekly: weeklyData,
    monthly: monthlyData,
  }[timeRange];

  const totalServiceRevenue = serviceBreakdown.reduce((sum, s) => sum + s.revenue, 0);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--header-bg)] backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <Image src="/logo.png" alt="0xRob402" width={32} height={32} />
            <span className="font-semibold text-[var(--text-primary)]">0xRob402</span>
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition text-sm">
              Home
            </Link>
            <Link href="/stats" className="text-[var(--accent)] text-sm font-medium">
              Stats
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium text-[var(--accent)] mb-6">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
              Live Analytics
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gradient">
              Stats Dashboard
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
              Real-time analytics on payments, requests, and performance. Full transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard
              label="Total Revenue"
              value={`$${mockStats.totalRevenue}`}
              trend="+18%"
              trendUp={true}
              icon="💰"
            />
            <StatCard
              label="Total Requests"
              value={mockStats.totalRequests.toString()}
              trend="+24%"
              trendUp={true}
              icon="📋"
            />
            <StatCard
              label="Avg Request"
              value={`$${mockStats.avgRequestValue.toFixed(2)}`}
              trend="+5%"
              trendUp={true}
              icon="📊"
            />
            <StatCard
              label="Completion"
              value={`${mockStats.completionRate}%`}
              trend="Perfect"
              trendUp={true}
              icon="✅"
            />
            <StatCard
              label="Unique Clients"
              value={mockStats.uniqueClients.toString()}
              trend="+12%"
              trendUp={true}
              icon="👥"
            />
            <StatCard
              label="Repeat Rate"
              value={`${mockStats.repeatRate}%`}
              trend="+8%"
              trendUp={true}
              icon="🔄"
            />
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-16 px-6 section-alt">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Activity Trends</h2>
              <p className="text-[var(--text-secondary)]">Track requests and revenue over time</p>
            </div>
            <div className="flex gap-2">
              {(['daily', 'weekly', 'monthly'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    timeRange === range
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Requests</h3>
              <p className="text-[var(--text-muted)] text-sm mb-6">Number of completed requests</p>
              <StatsChart data={chartData} dataKey="value" color="#0ea5e9" />
            </div>
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Revenue</h3>
              <p className="text-[var(--text-muted)] text-sm mb-6">USDC earned in dollars</p>
              <StatsChart data={chartData} dataKey="revenue" color="#10b981" prefix="$" />
            </div>
          </div>
        </div>
      </section>

      {/* Service Breakdown */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Service Breakdown</h2>
            <p className="text-[var(--text-secondary)]">Revenue and volume by service type</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Service List */}
            <div className="glass-card p-6">
              <div className="space-y-4">
                {serviceBreakdown.map((service) => (
                  <div key={service.name} className="flex items-center gap-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `${service.color}20`, border: `1px solid ${service.color}40` }}
                    >
                      <span className="text-lg">{service.icon}</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[var(--text-primary)] font-medium">{service.name}</span>
                        <span className="text-[var(--accent)] font-semibold">${service.revenue}</span>
                      </div>
                      <div className="h-2 bg-[var(--card-bg)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(service.revenue / totalServiceRevenue) * 100}%`,
                            background: service.color,
                          }}
                        />
                      </div>
                      <p className="text-[var(--text-muted)] text-xs mt-1">{service.count} requests</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pie Chart Alternative - Donut Stats */}
            <div className="glass-card p-6 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {serviceBreakdown.reduce<{ elements: ReactElement[]; offset: number }>(
                    (acc, service, i) => {
                      const percentage = (service.revenue / totalServiceRevenue) * 100;
                      const circumference = 2 * Math.PI * 40;
                      const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                      const strokeDashoffset = -(acc.offset / 100) * circumference;
                      
                      acc.elements.push(
                        <circle
                          key={service.name}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={service.color}
                          strokeWidth="12"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-500"
                          style={{ opacity: 0.9 }}
                        />
                      );
                      acc.offset += percentage;
                      return acc;
                    },
                    { elements: [], offset: 0 }
                  ).elements}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-[var(--text-primary)]">${totalServiceRevenue}</span>
                  <span className="text-[var(--text-muted)] text-sm">Total Revenue</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {serviceBreakdown.map((service) => (
                  <div key={service.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: service.color }}
                    />
                    <span className="text-[var(--text-secondary)] text-xs">{service.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Public Stats Widget Preview */}
      <section className="py-16 px-6 section-alt">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Embed Widget</h2>
            <p className="text-[var(--text-secondary)]">Share your stats publicly with this embeddable widget</p>
          </div>

          <div className="glass-card p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div className="flex items-center gap-4">
                <Image src="/logo.png" alt="0xRob402" width={48} height={48} />
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] text-lg">0xRob402</h3>
                  <p className="text-[var(--text-muted)] text-sm">Autonomous AI Agent</p>
                </div>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="text-2xl font-bold text-[var(--accent)]">${mockStats.totalRevenue}</p>
                  <p className="text-[var(--text-muted)] text-xs">Earned</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">{mockStats.totalRequests}</p>
                  <p className="text-[var(--text-muted)] text-xs">Requests</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-400">{mockStats.completionRate}%</p>
                  <p className="text-[var(--text-muted)] text-xs">Success</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-[var(--text-muted)] text-sm mb-3">Copy embed code:</p>
            <code className="inline-block bg-[var(--wallet-bg)] px-4 py-2 rounded-lg text-[var(--accent)] text-xs font-mono border border-[var(--card-border)] max-w-full overflow-x-auto">
              {`<iframe src="https://0xrob.solpay.cash/widget" width="400" height="100" />`}
            </code>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[var(--border-subtle)]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt="0xRob402" width={36} height={36} className="opacity-70" />
              <span className="text-[var(--text-muted)] text-sm">© 2025 0xRob402</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-[var(--text-muted)]">
              <Link href="/" className="hover:text-[var(--accent)] transition">Home</Link>
              <a
                href="https://x.com/benniethedev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition"
              >
                Built by @benniethedev
              </a>
              <a
                href="https://solpay.cash"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition"
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
