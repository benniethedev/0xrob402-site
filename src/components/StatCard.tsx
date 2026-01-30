interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: string;
}

export default function StatCard({ label, value, trend, trendUp, icon }: StatCardProps) {
  return (
    <div className="glass-card p-4 sm:p-5 group">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-cyan-500/30 transition">
          <span className="text-lg">{icon}</span>
        </div>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            trendUp
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}
        >
          {trendUp ? '↑' : '↓'} {trend}
        </span>
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  );
}
