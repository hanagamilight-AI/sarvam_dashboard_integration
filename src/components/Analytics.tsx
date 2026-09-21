import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { campaigns, hourlyCallData, dailyTrendData, callStatusDistribution } from '../data/mockData';

const languageData = [
  { language: 'Hindi', calls: 30196, connected: 10761, completed: 8200 },
  { language: 'Tamil', calls: 18500, connected: 6200, completed: 4800 },
  { language: 'English', calls: 12000, connected: 4500, completed: 3800 },
  { language: 'Telugu', calls: 9200, connected: 2800, completed: 1900 },
  { language: 'Marathi', calls: 15000, connected: 5500, completed: 4200 },
  { language: 'Kannada', calls: 0, connected: 0, completed: 0 },
];

const radarData = [
  { metric: 'Pickup Rate', value: 75, fullMark: 100 },
  { metric: 'Completion', value: 82, fullMark: 100 },
  { metric: 'Satisfaction', value: 68, fullMark: 100 },
  { metric: 'Quality Score', value: 90, fullMark: 100 },
  { metric: 'Response Rate', value: 72, fullMark: 100 },
  { metric: 'Survey Success', value: 85, fullMark: 100 },
];

const conversionFunnel = [
  { stage: 'Total Contacts', count: 28000, fill: '#3b82f6' },
  { stage: 'Attempts Made', count: 84896, fill: '#6366f1' },
  { stage: 'Connected', count: 29761, fill: '#8b5cf6' },
  { stage: 'Completed', count: 22900, fill: '#10b981' },
  { stage: 'Survey Done', count: 18500, fill: '#059669' },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* KPI Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Avg Pickup Rate</p>
          <p className="text-3xl font-bold text-green-400 mt-2">34.8%</p>
          <p className="text-xs text-green-400 mt-1">↑ 2.1% from last week</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Avg Completion Rate</p>
          <p className="text-3xl font-bold text-purple-400 mt-2">77.1%</p>
          <p className="text-xs text-green-400 mt-1">↑ 1.8% from last week</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Calls Per Hour (Peak)</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">1,500</p>
          <p className="text-xs text-gray-400 mt-1">10:00 - 11:00 AM</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Survey Success Rate</p>
          <p className="text-3xl font-bold text-cyan-400 mt-2">80.7%</p>
          <p className="text-xs text-green-400 mt-1">↑ 3.2% from last week</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Trend */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Daily Call Volume Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dailyTrendData}>
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
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="calls" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="Total Calls" />
              <Line type="monotone" dataKey="connected" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="Connected" />
              <Line type="monotone" dataKey="completed" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} name="Completed" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Language Distribution */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Performance by Language</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={languageData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#6b7280" fontSize={11} />
              <YAxis type="category" dataKey="language" stroke="#6b7280" fontSize={11} width={60} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="connected" fill="#10b981" radius={[0, 2, 2, 0]} name="Connected" />
              <Bar dataKey="completed" fill="#8b5cf6" radius={[0, 2, 2, 0]} name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Campaign Performance Radar</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="metric" stroke="#6b7280" fontSize={10} />
              <PolarRadiusAxis stroke="#374151" fontSize={10} />
              <Radar name="Performance" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Pie */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Call Outcome Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={callStatusDistribution}
                cx="50%"
                cy="50%"
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: '#6b7280' }}
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
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-sm font-semibold text-white mb-6">Conversion Funnel</h3>
        <div className="space-y-3">
          {conversionFunnel.map((stage, idx) => {
            const maxCount = Math.max(...conversionFunnel.map((s) => s.count));
            const width = (stage.count / maxCount) * 100;
            return (
              <div key={stage.stage} className="flex items-center gap-4">
                <div className="w-32 text-right">
                  <p className="text-xs text-gray-400">{stage.stage}</p>
                </div>
                <div className="flex-1 relative">
                  <div className="w-full h-8 bg-gray-800 rounded-lg overflow-hidden">
                    <div
                      className="h-full rounded-lg transition-all duration-500 flex items-center px-3"
                      style={{ width: `${width}%`, backgroundColor: stage.fill }}
                    >
                      <span className="text-xs font-medium text-white whitespace-nowrap">
                        {stage.count.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-16 text-right">
                  {idx > 0 && (
                    <span className="text-xs text-gray-500">
                      {((stage.count / conversionFunnel[idx - 1].count) * 100).toFixed(0)}%
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Campaign Comparison */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Campaign Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={hourlyCallData}>
            <defs>
              <linearGradient id="colorAnalytics1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAnalytics2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAnalytics3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
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
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Area type="monotone" dataKey="calls" stroke="#3b82f6" fill="url(#colorAnalytics1)" strokeWidth={2} name="Total" />
            <Area type="monotone" dataKey="connected" stroke="#10b981" fill="url(#colorAnalytics2)" strokeWidth={2} name="Connected" />
            <Area type="monotone" dataKey="completed" stroke="#f59e0b" fill="url(#colorAnalytics3)" strokeWidth={2} name="Completed" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
