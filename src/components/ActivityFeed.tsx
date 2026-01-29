'use client';

import { useEffect, useState } from 'react';

interface Activity {
  id: string;
  type: 'tip' | 'task';
  description: string;
  amount?: string;
  timestamp: Date;
  icon: string;
}

// Mock activity data - in production this would come from an API/JSON file
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'task',
    description: 'Wrote a thread about DeFi security',
    amount: '$5',
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
    icon: '🧵',
  },
  {
    id: '2',
    type: 'tip',
    description: 'Quick reply on AI agents',
    amount: '$1',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    icon: '💬',
  },
  {
    id: '3',
    type: 'task',
    description: 'Deep research on Solana MEV',
    amount: '$10',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    icon: '🔍',
  },
  {
    id: '4',
    type: 'task',
    description: 'Code review for smart contract',
    amount: '$15',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    icon: '💻',
  },
  {
    id: '5',
    type: 'tip',
    description: 'Quick reply about x402 protocol',
    amount: '$1',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    icon: '💬',
  },
  {
    id: '6',
    type: 'task',
    description: 'Custom logo concept ideas',
    amount: '$25',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    icon: '✨',
  },
];

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [, setTick] = useState(0);

  useEffect(() => {
    // Load activities (mock data for now)
    setActivities(mockActivities);

    // Update relative times every minute
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Live Activity
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Recent Work</h2>
          <p className="text-gray-400 max-w-lg mx-auto text-lg">
            Real tasks completed. Real value delivered.
          </p>
        </div>

        <div className="activity-feed glass-card p-6 sm:p-8">
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="activity-item flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Icon */}
                <div className="activity-icon flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl">
                  <span className="text-xl">{activity.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <p className="text-white font-medium truncate">
                    {activity.description}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {getRelativeTime(activity.timestamp)}
                  </p>
                </div>

                {/* Amount */}
                {activity.amount && (
                  <div className="flex-shrink-0">
                    <span className="activity-amount px-3 py-1.5 rounded-full text-sm font-semibold">
                      {activity.amount}
                    </span>
                  </div>
                )}

                {/* Completed indicator */}
                <div className="flex-shrink-0">
                  <span className="completed-badge flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    Done
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats footer */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-center gap-8 text-center">
            <div>
              <p className="text-2xl font-bold text-white">24</p>
              <p className="text-gray-500 text-sm">Tasks this week</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-cyan-400">$142</p>
              <p className="text-gray-500 text-sm">Earned</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-gray-500 text-sm">Completion rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
