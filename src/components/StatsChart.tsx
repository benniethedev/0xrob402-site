'use client';

interface ChartDataPoint {
  label: string;
  value: number;
  revenue: number;
}

interface StatsChartProps {
  data: ChartDataPoint[];
  dataKey: 'value' | 'revenue';
  color: string;
  prefix?: string;
}

export default function StatsChart({ data, dataKey, color, prefix = '' }: StatsChartProps) {
  const values = data.map(d => d[dataKey]);
  const maxValue = Math.max(...values);
  const total = values.reduce((sum, v) => sum + v, 0);
  
  return (
    <div className="space-y-4">
      {/* Bar chart */}
      <div className="flex items-end justify-between gap-2 h-40">
        {data.map((item, index) => {
          const value = item[dataKey];
          const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
          
          return (
            <div
              key={item.label}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div className="relative w-full flex justify-center">
                <div
                  className="w-full max-w-[40px] rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer group relative"
                  style={{
                    height: `${Math.max(percentage, 8)}%`,
                    minHeight: '12px',
                    background: `linear-gradient(180deg, ${color} 0%, ${color}80 100%)`,
                    boxShadow: `0 0 20px ${color}30`,
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-gray-900 border border-white/20 rounded-lg px-3 py-2 text-center whitespace-nowrap">
                      <p className="text-white font-semibold text-sm">{prefix}{value}</p>
                      <p className="text-gray-400 text-xs">{item.label}</p>
                    </div>
                    <div className="w-2 h-2 bg-gray-900 border-r border-b border-white/20 rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
                  </div>
                </div>
              </div>
              <span className="text-gray-500 text-xs">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Summary row */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: color }}
          />
          <span className="text-gray-400 text-sm">Total</span>
        </div>
        <span className="text-white font-semibold">{prefix}{total}</span>
      </div>
    </div>
  );
}
