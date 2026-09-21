import { useState, useEffect } from 'react';
import { Phone, PhoneCall, PhoneOff, Clock, Radio, Volume2 } from 'lucide-react';
import { liveCalls as initialCalls, Call } from '../data/mockData';

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function getStatusColor(status: string) {
  switch (status) {
    case 'connected': return 'text-green-400 bg-green-500/10 border-green-500/30';
    case 'ringing': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    case 'completed': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    case 'failed': return 'text-red-400 bg-red-500/10 border-red-500/30';
    case 'busy': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
    case 'initiated': return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    case 'no_answer': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'connected': return <Volume2 className="w-3.5 h-3.5" />;
    case 'ringing': return <Radio className="w-3.5 h-3.5 animate-pulse" />;
    case 'completed': return <PhoneCall className="w-3.5 h-3.5" />;
    case 'failed': return <PhoneOff className="w-3.5 h-3.5" />;
    case 'busy': return <PhoneOff className="w-3.5 h-3.5" />;
    default: return <Phone className="w-3.5 h-3.5" />;
  }
}

export default function LiveCallMonitor() {
  const [calls, setCalls] = useState<Call[]>(initialCalls);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCalls((prev) =>
        prev.map((call) => {
          if (call.status === 'connected' || call.status === 'ringing' || call.status === 'initiated') {
            return { ...call, duration_seconds: call.duration_seconds + 1 };
          }
          return call;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Simulate new calls coming in
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses: Call['status'][] = ['initiated', 'ringing', 'connected'];
      const campaigns = ['Customer Satisfaction Survey Q4', 'Health Awareness Outreach', 'Insurance Renewal Reminder'];
      const newCall: Call = {
        id: `call_${Math.random().toString(36).substr(2, 6)}`,
        external_call_id: `ext_${Math.random().toString(36).substr(2, 6)}`,
        campaign_id: 'c1',
        campaign_name: campaigns[Math.floor(Math.random() * campaigns.length)],
        phone_number: `+91-XXXX-XX${Math.floor(Math.random() * 90 + 10)}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        started_at: new Date().toISOString(),
        connected_at: null,
        ended_at: null,
        duration_seconds: 0,
        disposition: '',
      };
      setCalls((prev) => [newCall, ...prev.slice(0, 14)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredCalls = filterStatus === 'all' ? calls : calls.filter((c) => c.status === filterStatus);
  const activeCount = calls.filter((c) => ['connected', 'ringing', 'initiated'].includes(c.status)).length;
  const connectedCount = calls.filter((c) => c.status === 'connected').length;

  return (
    <div className="space-y-6">
      {/* Live Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-green-400 uppercase">Live</span>
          </div>
          <p className="text-2xl font-bold text-white">{activeCount}</p>
          <p className="text-xs text-gray-500">Active Calls</p>
        </div>
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{connectedCount}</p>
          <p className="text-xs text-gray-500">Connected Now</p>
        </div>
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 text-center">
          <p className="text-2xl font-bold text-yellow-400">
            {calls.filter((c) => c.status === 'ringing').length}
          </p>
          <p className="text-xs text-gray-500">Ringing</p>
        </div>
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">
            {calls.filter((c) => c.status === 'completed').length}
          </p>
          <p className="text-xs text-gray-500">Completed Today</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {['all', 'connected', 'ringing', 'initiated', 'completed', 'failed', 'busy'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterStatus === status
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'
            }`}
          >
            {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Live Calls Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <h3 className="text-sm font-semibold text-white">Real-Time Call Monitor</h3>
          </div>
          <p className="text-xs text-gray-500">Updates every second • SSE/WebSocket connected</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-800/50">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Call ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Campaign</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Phone</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Status</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-400 uppercase">Duration</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Disposition</th>
              </tr>
            </thead>
            <tbody>
              {filteredCalls.map((call) => (
                <tr
                  key={call.id}
                  className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-3 px-4">
                    <code className="text-xs text-blue-400 font-mono">{call.external_call_id}</code>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-gray-300 text-xs">{call.campaign_name}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-400 font-mono text-xs">{call.phone_number}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(call.status)}`}>
                      {getStatusIcon(call.status)}
                      {call.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-mono text-xs ${
                      ['connected', 'ringing', 'initiated'].includes(call.status) ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      <Clock className="w-3 h-3 inline mr-1" />
                      {formatDuration(call.duration_seconds)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs text-gray-400">{call.disposition || '—'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Connection Info */}
      <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-4">
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span>WebSocket: Connected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span>SSE Stream: Active</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Events/min: ~45</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span>Latency: 12ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
