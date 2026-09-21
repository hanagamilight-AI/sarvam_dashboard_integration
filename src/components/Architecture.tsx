import {
  Server,
  Database,
  Globe,
  Shield,
  Zap,
  ArrowDown,
  ArrowRight,
  Layers,
  Cpu,
  HardDrive,
  Wifi,
  GitBranch,
  Lock,
  BarChart3,
} from 'lucide-react';

export default function Architecture() {
  return (
    <div className="space-y-8">
      {/* High-Level Flow */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-sm font-semibold text-white mb-6">High-Level System Architecture</h3>
        <div className="flex flex-col items-center gap-4">
          {/* Sarvam APIs */}
          <div className="w-full max-w-md bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
            <Globe className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-blue-400">Sarvam APIs</p>
            <p className="text-xs text-gray-500 mt-1">Real-time Call Data & Events</p>
          </div>

          <ArrowDown className="w-5 h-5 text-gray-600" />

          {/* Webhook */}
          <div className="w-full max-w-md bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
            <Wifi className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-purple-400">Webhook Endpoint</p>
            <p className="text-xs text-gray-500 mt-1">POST /api/v1/webhooks/sarvam</p>
          </div>

          <ArrowDown className="w-5 h-5 text-gray-600" />

          {/* Backend */}
          <div className="w-full max-w-lg bg-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Server className="w-5 h-5 text-green-400" />
              <p className="text-sm font-medium text-white">Backend Service (Go + Gin/Fiber)</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-gray-900 rounded-lg p-2 text-center border border-gray-700">
                <Shield className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                <p className="text-gray-400">Validation</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-2 text-center border border-gray-700">
                <Cpu className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <p className="text-gray-400">Processing</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-2 text-center border border-gray-700">
                <Zap className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                <p className="text-gray-400">Business Logic</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <ArrowDown className="w-5 h-5 text-gray-600" />
          </div>

          {/* Storage Layer */}
          <div className="w-full max-w-lg grid grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
              <Database className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-400">PostgreSQL</p>
              <p className="text-xs text-gray-500 mt-1">Persistent Data Store</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 text-center">
              <Zap className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-orange-400">WebSocket/SSE</p>
              <p className="text-xs text-gray-500 mt-1">Real-time Layer</p>
            </div>
          </div>

          <ArrowDown className="w-5 h-5 text-gray-600" />

          {/* Dashboard APIs */}
          <div className="w-full max-w-md bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 text-center">
            <Layers className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-cyan-400">Dashboard APIs</p>
            <p className="text-xs text-gray-500 mt-1">REST + WebSocket endpoints</p>
          </div>

          <ArrowDown className="w-5 h-5 text-gray-600" />

          {/* Dashboard */}
          <div className="w-full max-w-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
            <BarChart3 className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">Dashboard UI (React + Tailwind)</p>
            <p className="text-xs text-gray-500 mt-1">Campaigns / Calls / Analytics / Reports</p>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Backend Stack</h3>
          <div className="space-y-3">
            {[
              { name: 'Go (Golang)', desc: 'Primary backend language', icon: Cpu },
              { name: 'Gin / Fiber', desc: 'HTTP framework', icon: Server },
              { name: 'pgx', desc: 'PostgreSQL driver', icon: Database },
              { name: 'sqlc / GORM', desc: 'Database ORM/query builder', icon: HardDrive },
              { name: 'golang-migrate', desc: 'Database migrations', icon: GitBranch },
              { name: 'Redis', desc: 'Caching & event queue', icon: Zap },
              { name: 'Zap / Zerolog', desc: 'Structured logging', icon: Layers },
              { name: 'Prometheus', desc: 'Metrics & monitoring', icon: BarChart3 },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800/50">
                <item.icon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Frontend Stack</h3>
          <div className="space-y-3">
            {[
              { name: 'React / Next.js', desc: 'UI framework', icon: Layers },
              { name: 'Tailwind CSS', desc: 'Utility-first CSS', icon: Globe },
              { name: 'Recharts / ECharts', desc: 'Analytics visualization', icon: BarChart3 },
              { name: 'WebSocket / SSE', desc: 'Real-time updates', icon: Wifi },
              { name: 'TypeScript', desc: 'Type-safe development', icon: Shield },
              { name: 'React Router', desc: 'Client-side routing', icon: GitBranch },
              { name: 'Docker', desc: 'Containerization', icon: Server },
              { name: 'Nginx', desc: 'Reverse proxy & HTTPS', icon: Lock },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800/50">
                <item.icon className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* API Structure */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-sm font-semibold text-white mb-4">API Structure</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              path: '/api/v1/auth',
              methods: ['POST /login', 'POST /refresh'],
              color: 'blue',
            },
            {
              path: '/api/v1/campaigns',
              methods: ['GET /', 'GET /{id}', 'GET /{id}/calls', 'GET /{id}/analytics'],
              color: 'green',
            },
            {
              path: '/api/v1/calls',
              methods: ['GET /', 'GET /{id}', 'GET /{id}/events'],
              color: 'purple',
            },
            {
              path: '/api/v1/analytics',
              methods: ['GET /overview', 'GET /campaign-performance', 'GET /call-status'],
              color: 'cyan',
            },
            {
              path: '/api/v1/webhooks',
              methods: ['POST /sarvam'],
              color: 'yellow',
            },
            {
              path: '/api/v1/health',
              methods: ['GET /'],
              color: 'green',
            },
          ].map((api) => (
            <div key={api.path} className="bg-gray-800/50 rounded-lg border border-gray-700 p-4">
              <code className="text-xs text-blue-400 font-mono">{api.path}</code>
              <div className="mt-2 space-y-1">
                {api.methods.map((m) => (
                  <p key={m} className="text-xs text-gray-400 font-mono">{m}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Database Schema */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Database Schema (PostgreSQL)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { table: 'users', fields: ['id UUID PK', 'name VARCHAR', 'email VARCHAR UNIQUE', 'role VARCHAR', 'created_at TIMESTAMP'] },
            { table: 'campaigns', fields: ['id UUID PK', 'external_campaign_id VARCHAR UNIQUE', 'name VARCHAR', 'status VARCHAR', 'total_contacts INT', 'total_attempts INT'] },
            { table: 'calls', fields: ['id UUID PK', 'external_call_id VARCHAR UNIQUE', 'campaign_id UUID FK', 'phone_number VARCHAR', 'status VARCHAR', 'duration_seconds INT'] },
            { table: 'webhook_events', fields: ['id UUID PK', 'event_id VARCHAR UNIQUE', 'event_type VARCHAR', 'payload JSONB', 'processing_status VARCHAR', 'received_at TIMESTAMP'] },
            { table: 'call_events', fields: ['id UUID PK', 'call_id UUID FK', 'event_type VARCHAR', 'event_timestamp TIMESTAMP', 'payload JSONB'] },
            { table: 'call_transcripts', fields: ['id UUID PK', 'call_id UUID FK', 'transcript TEXT', 'language VARCHAR', 'is_final BOOLEAN'] },
            { table: 'survey_responses', fields: ['id UUID PK', 'call_id UUID FK', 'question_id VARCHAR', 'question TEXT', 'answer TEXT', 'confidence FLOAT'] },
            { table: 'api_logs', fields: ['id UUID PK', 'endpoint VARCHAR', 'method VARCHAR', 'status_code INT', 'latency_ms INT', 'created_at TIMESTAMP'] },
          ].map((t) => (
            <div key={t.table} className="bg-gray-800/50 rounded-lg border border-gray-700 p-3">
              <p className="text-xs font-bold text-green-400 font-mono mb-2">{t.table}</p>
              <div className="space-y-0.5">
                {t.fields.map((f) => (
                  <p key={f} className="text-[10px] text-gray-500 font-mono truncate">{f}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Production Deployment */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Production Deployment Architecture</h3>
        <div className="flex flex-col items-center gap-4">
          <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
            <Globe className="w-5 h-5 text-gray-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Internet</p>
          </div>
          <ArrowDown className="w-4 h-4 text-gray-600" />
          <div className="w-full max-w-md bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-center">
            <Lock className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
            <p className="text-xs text-yellow-400">Load Balancer (Nginx / Cloud LB) + HTTPS</p>
          </div>
          <ArrowDown className="w-4 h-4 text-gray-600" />
          <div className="w-full max-w-lg grid grid-cols-2 gap-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-center">
              <Server className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <p className="text-xs text-blue-400">Backend API 1</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-center">
              <Server className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <p className="text-xs text-blue-400">Backend API 2</p>
            </div>
          </div>
          <ArrowDown className="w-4 h-4 text-gray-600" />
          <div className="w-full max-w-lg grid grid-cols-2 gap-3">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3 text-center">
              <Zap className="w-4 h-4 text-orange-400 mx-auto mb-1" />
              <p className="text-xs text-orange-400">Redis</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-center">
              <Database className="w-4 h-4 text-green-400 mx-auto mb-1" />
              <p className="text-xs text-green-400">PostgreSQL</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Design Principles */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Key Design Principles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: 'Sarvam as Provider', desc: 'Sarvam is the real-time provider; the dashboard never depends on it for every screen refresh.' },
            { title: 'PostgreSQL as Source of Truth', desc: 'All data is persisted in PostgreSQL. The dashboard reads from the local database, not from Sarvam directly.' },
            { title: 'Async Processing', desc: 'Webhook events are accepted quickly (2xx) and processed asynchronously via background workers.' },
            { title: 'Configurable Cost Engine', desc: 'Provider pricing is stored in PostgreSQL and can be updated without code changes.' },
            { title: 'Idempotent Processing', desc: 'Duplicate events are detected via unique event_id and safely ignored.' },
            { title: 'Real-time via WebSocket/SSE', desc: 'Dashboard receives live updates without polling. Backend pushes events after processing.' },
          ].map((p) => (
            <div key={p.title} className="bg-gray-800/50 rounded-lg border border-gray-700 p-4">
              <p className="text-sm font-medium text-white mb-1">{p.title}</p>
              <p className="text-xs text-gray-500">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
