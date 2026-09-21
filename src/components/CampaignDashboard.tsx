import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  Phone,
  PhoneCall,
  PhoneOff,
  CheckCircle2,
  Clock,
  Users,
  RotateCcw,
  Filter,
  Search,
  ChevronDown,
} from 'lucide-react';
import { campaigns, hourlyCallData } from '../data/mockData';

export default function CampaignDashboard() {
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampaigns = campaigns.filter((c) => {
    if (filterStatus !== 'all' && c.status !== filterStatus) return false;
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const campaignHourlyData = hourlyCallData.map((h) => ({
    ...h,
    calls: Math.round(h.calls * 0.4),
    connected: Math.round(h.connected * 0.4),
    completed: Math.round(h.completed * 0.4),
  }));

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-8 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-white appearance-none focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused</option>
            <option value="draft">Draft</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            onClick={() => setSelectedCampaign(campaign)}
            className={`bg-gray-900 rounded-xl border p-5 cursor-pointer transition-all hover:border-blue-500/50 ${
              selectedCampaign.id === campaign.id ? 'border-blue-500/50 ring-1 ring-blue-500/20' : 'border-gray-800'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-white text-sm">{campaign.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{campaign.external_campaign_id}</p>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                campaign.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/30' :
                campaign.status === 'completed' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                campaign.status === 'paused' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' :
                'bg-gray-500/10 text-gray-400 border border-gray-500/30'
              }`}>
                {campaign.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Contacts</p>
                  <p className="text-sm font-medium text-white">{campaign.total_contacts.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Attempts</p>
                  <p className="text-sm font-medium text-white">{campaign.total_attempts.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-green-500" />
                <div>
                  <p className="text-xs text-gray-500">Connected</p>
                  <p className="text-sm font-medium text-green-400">{campaign.connected_calls.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-500">Completed</p>
                  <p className="text-sm font-medium text-purple-400">{campaign.completed_calls.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <PhoneOff className="w-3.5 h-3.5 text-red-500" />
                <div>
                  <p className="text-xs text-gray-500">Failed</p>
                  <p className="text-sm font-medium text-red-400">{campaign.failed_calls.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-yellow-500" />
                <div>
                  <p className="text-xs text-gray-500">Avg Duration</p>
                  <p className="text-sm font-medium text-yellow-400">
                    {Math.floor(campaign.avg_duration_seconds / 60)}:{String(campaign.avg_duration_seconds % 60).padStart(2, '0')}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500">Progress</span>
                <span className="text-gray-400">
                  {((campaign.completed_calls / campaign.total_contacts) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                  style={{ width: `${(campaign.completed_calls / campaign.total_contacts) * 100}%` }}
                />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3 h-3" /> Retry: {campaign.total_attempts - campaign.connected_calls - campaign.failed_calls}
              </span>
              <span>Pickup: {campaign.pickup_rate}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Campaign Detail */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">{selectedCampaign.name}</h3>
            <p className="text-sm text-gray-400">
              Hourly distribution • Language: {selectedCampaign.language} • Created: {new Date(selectedCampaign.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{selectedCampaign.pickup_rate}%</p>
              <p className="text-xs text-gray-500">Pickup Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">{selectedCampaign.completion_rate}%</p>
              <p className="text-xs text-gray-500">Completion Rate</p>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={campaignHourlyData}>
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
            <Bar dataKey="calls" fill="#3b82f6" radius={[2, 2, 0, 0]} name="Total Calls" />
            <Bar dataKey="connected" fill="#10b981" radius={[2, 2, 0, 0]} name="Connected" />
            <Bar dataKey="completed" fill="#8b5cf6" radius={[2, 2, 0, 0]} name="Completed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
