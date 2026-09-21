import { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  RefreshCw,
  Filter,
  ChevronDown,
  Search,
  Code,
  AlertTriangle,
} from 'lucide-react';
import { webhookEvents } from '../data/mockData';

function getStatusIcon(status: string) {
  switch (status) {
    case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-400" />;
    case 'processing': return <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />;
    case 'received': return <Clock className="w-4 h-4 text-blue-400" />;
    case 'failed': return <XCircle className="w-4 h-4 text-red-400" />;
    default: return <Clock className="w-4 h-4 text-gray-400" />;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'completed': return 'bg-green-500/10 text-green-400 border-green-500/30';
    case 'processing': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
    case 'received': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    case 'failed': return 'bg-red-500/10 text-red-400 border-red-500/30';
    default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
  }
}

const samplePayload = `{
  "event": "call.updated",
  "event_id": "evt_123456",
  "timestamp": "2026-09-21T10:30:00Z",
  "call_id": "call_123",
  "campaign_id": "campaign_456",
  "status": "connected",
  "duration": 42,
  "data": {
    "phone": "masked",
    "transcript": "Example transcript",
    "response": "yes"
  }
}`;

export default function WebhookLog() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPayload, setShowPayload] = useState(false);

  const filteredEvents = webhookEvents.filter((e) => {
    if (filterStatus !== 'all' && e.processing_status !== filterStatus) return false;
    if (filterType !== 'all' && e.event_type !== filterType) return false;
    if (searchQuery && !e.event_id.includes(searchQuery) && !e.external_call_id.includes(searchQuery)) return false;
    return true;
  });

  const eventTypes = [...new Set(webhookEvents.map((e) => e.event_type))];

  const completedCount = webhookEvents.filter((e) => e.processing_status === 'completed').length;
  const processingCount = webhookEvents.filter((e) => e.processing_status === 'processing').length;
  const failedCount = webhookEvents.filter((e) => e.processing_status === 'failed').length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 text-center">
          <p className="text-2xl font-bold text-white">{webhookEvents.length}</p>
          <p className="text-xs text-gray-500">Total Events</p>
        </div>
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{completedCount}</p>
          <p className="text-xs text-gray-500">Processed</p>
        </div>
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 text-center">
          <p className="text-2xl font-bold text-yellow-400">{processingCount}</p>
          <p className="text-xs text-gray-500">Processing</p>
        </div>
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 text-center">
          <p className="text-2xl font-bold text-red-400">{failedCount}</p>
          <p className="text-xs text-gray-500">Failed</p>
        </div>
      </div>

      {/* Webhook Flow Diagram */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Webhook Processing Flow</h3>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
            Sarvam Event
          </div>
          <span className="text-gray-600">→</span>
          <div className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300">
            HTTPS POST
          </div>
          <span className="text-gray-600">→</span>
          <div className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300">
            Signature Verify
          </div>
          <span className="text-gray-600">→</span>
          <div className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300">
            Schema Validate
          </div>
          <span className="text-gray-600">→</span>
          <div className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300">
            Idempotency Check
          </div>
          <span className="text-gray-600">→</span>
          <div className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300">
            Store Event
          </div>
          <span className="text-gray-600">→</span>
          <div className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300">
            Queue Job
          </div>
          <span className="text-gray-600">→</span>
          <div className="px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400">
            Process & Update
          </div>
          <span className="text-gray-600">→</span>
          <div className="px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
            Notify Dashboard
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by event_id or call_id..."
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
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="received">Received</option>
            <option value="failed">Failed</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="pl-4 pr-8 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-white appearance-none focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Event Types</option>
            {eventTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
        <button
          onClick={() => setShowPayload(!showPayload)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-all ${
            showPayload
              ? 'bg-blue-600/20 text-blue-400 border-blue-500/30'
              : 'bg-gray-900 text-gray-400 border-gray-700 hover:border-gray-600'
          }`}
        >
          <Code className="w-4 h-4" />
          Sample Payload
        </button>
      </div>

      {/* Sample Payload */}
      {showPayload && (
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Example Webhook Payload</h3>
            <span className="text-xs text-gray-500">POST /api/v1/webhooks/sarvam</span>
          </div>
          <pre className="bg-gray-950 rounded-lg border border-gray-800 p-4 text-xs text-green-400 font-mono overflow-x-auto">
            {samplePayload}
          </pre>
        </div>
      )}

      {/* Events Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Webhook Event Log</h3>
          <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-800/50">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Event ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Type</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Call ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Received</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Processed</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <tr key={event.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                  <td className="py-3 px-4">
                    <code className="text-xs text-blue-400 font-mono">{event.event_id}</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs text-gray-300 font-mono bg-gray-800 px-2 py-0.5 rounded">{event.event_type}</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-xs text-gray-400 font-mono">{event.external_call_id}</code>
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-400">
                    {new Date(event.received_at).toLocaleTimeString()}
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-400">
                    {event.processed_at ? new Date(event.processed_at).toLocaleTimeString() : '—'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(event.processing_status)}`}>
                      {getStatusIcon(event.processing_status)}
                      {event.processing_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Note */}
      <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-300 font-medium">Webhook Security</p>
            <p className="text-xs text-gray-500 mt-1">
              All webhook events are validated using signature verification (X-Webhook-Signature header).
              Idempotency is enforced via unique event_id constraint. Failed events are logged with full error details
              for debugging. Processing happens asynchronously via background workers to ensure fast 2xx responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
