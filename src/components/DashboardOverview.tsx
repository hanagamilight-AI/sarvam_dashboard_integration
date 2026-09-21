import {
  Phone,
  PhoneCall,
  PhoneOff,
  CheckCircle2,
  Clock,
  TrendingUp,
  Activity,
  AlertTriangle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { campaigns, hourlyCallData, callStatusDistribution, dailyTrendData } from '../data/mockData';

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  trend,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  color: string;
  trend?: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/30 text-blue-400',
    green: 'from-green-500/20 to-green-600/5 border-green-500/30 text-green-400',
    red: 'from-red-500/20 to-red-600/5 border-red-500/30 text-red-400',
    yellow: 'from-yellow-500/20 to-yellow-600/5 border-yellow-500/30 text-yellow-400',
    purple: 'from-purple-500/20 to-purple-600/5 border-purple-500/30 text-purple-400',
    cyan: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/30 text-cyan-400',
  };

  return (
    <div className={`relative overflow-hidden rounded-xl border bg-gradient-to-br p-5 ${colorClasses[color]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-gray-400">{subtitle}</p>}
          {trend && (
            <p className="mt-2 flex items-center gap-1 text-xs text-green-400">
              <TrendingUp className="w-3 h-3" /> {trend}
            </p>
          )}
        </div>
        <Icon className="w-8 h-8 opacity-40" />
      </div>
    </div>
  );
}

export default function DashboardOverview() {
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter((c) => c.status === 'active').length;
  const totalCalls = campaigns.reduce((sum, c) => sum + c.total_attempts, 0);
  const totalConnected = campaigns.reduce((sum, c) => sum + c.connected_calls, 0);
  const totalCompleted = campaigns.reduce((sum, c) => sum + c.completed_calls, 0);
  const totalFailed = campaigns.reduce((sum, c) => sum + c.failed_calls, 0);
  const pickupRate = ((totalConnected / totalCalls) * 100).toFixed(1);
  const completionRate = ((totalCompleted / totalConnected) * 100).toFixed(1);
  const avgDuration = Math.round(
    campaigns.reduce((sum, c) => sum + c.avg_duration_seconds, 0) / campaigns.filter(c => c.avg_duration_seconds > 0).length
  );

  return (
    <div className="space-y-8">
      {/* Primary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Calls"
          value={totalCalls.toLocaleString()}
          subtitle={`${activeCampaigns} active campaigns`}
          icon={Phone}
          color="blue"
          trend="+12.5% vs yesterday"
        />
        <StatCard
          title="Connected"
          value={totalConnected.toLocaleString()}
          subtitle={`${pickupRate}% pickup rate`}
          icon={PhoneCall}
          color="green"
          trend="+8.3% vs yesterday"
        />
        <StatCard
          title="Completed"
          value={totalCompleted.toLocaleString()}
          subtitle={`${completionRate}% completion rate`}
          icon={CheckCircle2}
          color="purple"
          trend="+5.1% vs yesterday"
        />
        <StatCard
          title="Failed Calls"
          value={totalFailed.toLocaleString()}
          subtitle="No answer + busy + errors"
          icon={PhoneOff}
          color="red"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Calls"
          value={180}
          subtitle="Currently in progress"
          icon={Activity}
          color="cyan"
        />
        <StatCard
          title="Avg Duration"
          value={`${Math.floor(avgDuration / 60)}:${String(avgDuration % 60).padStart(2, '0')}`}
          subtitle="Minutes per call"
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Calls Today"
          value="28,000"
          subtitle="Since midnight"
          icon={TrendingUp}
          color="blue"
          trend="+15% vs avg"
        />
        <StatCard
          title="Error Rate"
          value="2.1%"
          subtitle="Below 5% threshold"
          icon={AlertTriangle}
          color="green"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hourly Distribution */}
        <div className="lg:col-span-2 bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Hourly Call Distribution (Today)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={hourlyCallData}>
              <defs>
                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorConnected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#6b7280" fontSize={11} />
              <YAxis stroke="#6b7280" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Area type="monotone" dataKey="calls" stroke="#3b82f6" fill="url(#colorCalls)" strokeWidth={2} />
              <Area type="monotone" dataKey="connected" stroke="#10b981" fill="url(#colorConnected)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Call Status Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={callStatusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {callStatusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {callStatusDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-300">{item.name}</span>
                </div>
                <span className="text-gray-400 font-medium">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Trend */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-sm font-semibold text-white mb-4">7-Day Call Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={dailyTrendData}>
            <defs>
              <linearGradient id="colorDailyCalls" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#6b7280" fontSize={11} />
            <YAxis stroke="#6b7280" fontSize={11} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Area type="monotone" dataKey="calls" stroke="#8b5cf6" fill="url(#colorDailyCalls)" strokeWidth={2} />
            <Area type="monotone" dataKey="completed" stroke="#10b981" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Campaign Summary Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Campaign Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Campaign</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Status</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-400 uppercase">Attempts</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-400 uppercase">Connected</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-400 uppercase">Pickup Rate</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-400 uppercase">Completion</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-white">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.language}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      c.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/30' :
                      c.status === 'completed' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                      c.status === 'paused' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' :
                      'bg-gray-500/10 text-gray-400 border border-gray-500/30'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-300">{c.total_attempts.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-gray-300">{c.connected_calls.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-gray-300">{c.pickup_rate}%</td>
                  <td className="py-3 px-4 text-right text-gray-300">{c.completion_rate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
