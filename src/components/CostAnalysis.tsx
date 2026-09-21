import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { DollarSign, TrendingDown, Calculator, Receipt, IndianRupee } from 'lucide-react';
import { costMetrics, campaigns } from '../data/mockData';

const totalCost = costMetrics.reduce((sum, c) => sum + c.total_cost, 0);
const totalSarvam = costMetrics.reduce((sum, c) => sum + c.sarvam_cost, 0);
const totalTelephony = costMetrics.reduce((sum, c) => sum + c.telephony_cost, 0);
const totalInfra = costMetrics.reduce((sum, c) => sum + c.infrastructure_cost, 0);
const totalAttempts = campaigns.reduce((sum, c) => sum + c.total_attempts, 0);
const totalConnected = campaigns.reduce((sum, c) => sum + c.connected_calls, 0);
const totalCompleted = campaigns.reduce((sum, c) => sum + c.completed_calls, 0);

const costBreakdown = [
  { name: 'Sarvam API', value: totalSarvam, color: '#3b82f6' },
  { name: 'Telephony', value: totalTelephony, color: '#8b5cf6' },
  { name: 'Infrastructure', value: totalInfra, color: '#10b981' },
];

const costTrendData = [
  { date: 'Sep 15', cost: 1200 },
  { date: 'Sep 16', cost: 1800 },
  { date: 'Sep 17', cost: 2300 },
  { date: 'Sep 18', cost: 2800 },
  { date: 'Sep 19', cost: 3400 },
  { date: 'Sep 20', cost: 3900 },
  { date: 'Sep 21', cost: 4200 },
];

const costPerMetricData = costMetrics.map((m) => ({
  campaign: m.campaign_name.split(' ').slice(0, 2).join(' '),
  perAttempt: m.cost_per_attempt,
  perConnected: m.cost_per_connected,
  perCompleted: m.cost_per_completed,
}));

export default function CostAnalysis() {
  return (
    <div className="space-y-6">
      {/* Cost Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
              <IndianRupee className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Total Cost</p>
          </div>
          <p className="text-2xl font-bold text-white">₹{(totalCost * 83).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          <p className="text-xs text-gray-400 mt-1">${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Cost/Attempt</p>
          </div>
          <p className="text-2xl font-bold text-green-400">${(totalCost / totalAttempts).toFixed(3)}</p>
          <p className="text-xs text-gray-400 mt-1">{totalAttempts.toLocaleString()} total attempts</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <Calculator className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Cost/Connected</p>
          </div>
          <p className="text-2xl font-bold text-purple-400">${(totalCost / totalConnected).toFixed(3)}</p>
          <p className="text-xs text-gray-400 mt-1">{totalConnected.toLocaleString()} connected calls</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-yellow-400" />
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Cost/Completed</p>
          </div>
          <p className="text-2xl font-bold text-yellow-400">${(totalCost / totalCompleted).toFixed(3)}</p>
          <p className="text-xs text-gray-400 mt-1">{totalCompleted.toLocaleString()} completed calls</p>
        </div>
      </div>

      {/* Cost Breakdown & Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cost Breakdown Pie */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Cost Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={costBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {costBreakdown.map((entry, index) => (
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
                formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {costBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-300">{item.name}</span>
                </div>
                <span className="text-gray-400 font-medium">${item.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Trend */}
        <div className="lg:col-span-2 bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Daily Cost Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={costTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={11} />
              <YAxis stroke="#6b7280" fontSize={11} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Cost']}
              />
              <Line type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cost Per Metric by Campaign */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Cost Per Metric by Campaign</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={costPerMetricData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="campaign" stroke="#6b7280" fontSize={10} />
            <YAxis stroke="#6b7280" fontSize={11} tickFormatter={(v) => `$${v}`} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value: number) => [`$${value.toFixed(3)}`, '']}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="perAttempt" fill="#3b82f6" radius={[2, 2, 0, 0]} name="Per Attempt" />
            <Bar dataKey="perConnected" fill="#8b5cf6" radius={[2, 2, 0, 0]} name="Per Connected" />
            <Bar dataKey="perCompleted" fill="#10b981" radius={[2, 2, 0, 0]} name="Per Completed" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Campaign Cost Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Campaign Cost Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Campaign</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-400 uppercase">Total Cost</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-400 uppercase">Sarvam</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-400 uppercase">Telephony</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-400 uppercase">Infra</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-400 uppercase">$/Attempt</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-400 uppercase">$/Connected</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-400 uppercase">$/Completed</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-400 uppercase">$/Min</th>
              </tr>
            </thead>
            <tbody>
              {costMetrics.map((m) => (
                <tr key={m.campaign_id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-3 px-4">
                    <p className="font-medium text-white text-xs">{m.campaign_name}</p>
                  </td>
                  <td className="py-3 px-4 text-right text-white font-medium">${m.total_cost.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right text-blue-400">${m.sarvam_cost.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right text-purple-400">${m.telephony_cost.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right text-green-400">${m.infrastructure_cost.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right text-gray-300">${m.cost_per_attempt.toFixed(3)}</td>
                  <td className="py-3 px-4 text-right text-gray-300">${m.cost_per_connected.toFixed(3)}</td>
                  <td className="py-3 px-4 text-right text-gray-300">${m.cost_per_completed.toFixed(3)}</td>
                  <td className="py-3 px-4 text-right text-gray-300">${m.cost_per_billable_minute.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-gray-700 bg-gray-800/30">
                <td className="py-3 px-4 font-semibold text-white text-xs">Total</td>
                <td className="py-3 px-4 text-right font-semibold text-white">${totalCost.toFixed(2)}</td>
                <td className="py-3 px-4 text-right font-semibold text-blue-400">${totalSarvam.toFixed(2)}</td>
                <td className="py-3 px-4 text-right font-semibold text-purple-400">${totalTelephony.toFixed(2)}</td>
                <td className="py-3 px-4 text-right font-semibold text-green-400">${totalInfra.toFixed(2)}</td>
                <td className="py-3 px-4 text-right font-semibold text-gray-300">${(totalCost / totalAttempts).toFixed(3)}</td>
                <td className="py-3 px-4 text-right font-semibold text-gray-300">${(totalCost / totalConnected).toFixed(3)}</td>
                <td className="py-3 px-4 text-right font-semibold text-gray-300">${(totalCost / totalCompleted).toFixed(3)}</td>
                <td className="py-3 px-4 text-right font-semibold text-gray-300">—</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Pricing Configuration Note */}
      <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-4">
        <div className="flex items-start gap-3">
          <Receipt className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-300 font-medium">Configurable Pricing Engine</p>
            <p className="text-xs text-gray-500 mt-1">
              All cost calculations are based on provider pricing stored in PostgreSQL. Rates can be updated without changing application code.
              Formula: Total Cost = Sarvam Cost + Telephony Cost + Infrastructure Cost + Other Costs.
              Pricing is stored per-provider and can be adjusted for different campaign types and volumes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
