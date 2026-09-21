import { useState } from 'react';
import {
  Phone,
  PhoneCall,
  Clock,
  MapPin,
  Calendar,
  MessageSquare,
  List,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Radio,
} from 'lucide-react';
import { liveCalls, callEvents, transcript } from '../data/mockData';

export default function CallDetails() {
  const [activeTab, setActiveTab] = useState<'conversation' | 'events'>('conversation');
  const selectedCall = liveCalls[0];

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Live Calls
      </button>

      {/* Call Info Header */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
              <PhoneCall className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Call {selectedCall.external_call_id}</h2>
              <p className="text-sm text-gray-400">{selectedCall.campaign_name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/30">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {selectedCall.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
          <div>
            <p className="text-xs text-gray-500 flex items-center gap-1"><Phone className="w-3 h-3" /> Call ID</p>
            <p className="text-sm text-white font-mono mt-1">{selectedCall.external_call_id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> Phone</p>
            <p className="text-sm text-white font-mono mt-1">{selectedCall.phone_number}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> Started</p>
            <p className="text-sm text-white mt-1">{new Date(selectedCall.started_at).toLocaleTimeString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> Connected</p>
            <p className="text-sm text-white mt-1">
              {selectedCall.connected_at ? new Date(selectedCall.connected_at).toLocaleTimeString() : '—'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> Duration</p>
            <p className="text-sm text-green-400 font-mono mt-1">
              {Math.floor(selectedCall.duration_seconds / 60)}:{String(selectedCall.duration_seconds % 60).padStart(2, '0')}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Disposition</p>
            <p className="text-sm text-white mt-1">{selectedCall.disposition || 'In Progress'}</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 bg-gray-900 rounded-lg border border-gray-800 p-1 w-fit">
        <button
          onClick={() => setActiveTab('conversation')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'conversation'
              ? 'bg-blue-600/20 text-blue-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Conversation
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'events'
              ? 'bg-blue-600/20 text-blue-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <List className="w-4 h-4" />
          Events Timeline
        </button>
      </div>

      {/* Conversation Tab */}
      {activeTab === 'conversation' && (
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-white">Transcript</h3>
            <span className="text-xs text-gray-500">Language: Hindi • Sarvam STT</span>
          </div>
          <div className="space-y-4">
            {transcript.map((entry, idx) => (
              <div key={idx} className={`flex gap-3 ${entry.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  entry.role === 'agent'
                    ? 'bg-blue-500/10 border border-blue-500/30'
                    : 'bg-green-500/10 border border-green-500/30'
                }`}>
                  {entry.role === 'agent' ? (
                    <Radio className="w-4 h-4 text-blue-400" />
                  ) : (
                    <Phone className="w-4 h-4 text-green-400" />
                  )}
                </div>
                <div className={`max-w-[70%] ${entry.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`rounded-xl px-4 py-3 ${
                    entry.role === 'agent'
                      ? 'bg-gray-800 border border-gray-700'
                      : 'bg-blue-600/10 border border-blue-500/30'
                  }`}>
                    <p className="text-sm text-gray-200">{entry.text}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 px-1">
                    {entry.role === 'agent' ? 'Agent' : 'User'} • {entry.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Events Timeline Tab */}
      {activeTab === 'events' && (
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-sm font-semibold text-white mb-6">Events Timeline</h3>
          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gray-800" />
            <div className="space-y-6">
              {callEvents.map((event, idx) => (
                <div key={event.id} className="relative flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border z-10 ${
                    event.event_type.includes('completed') || event.event_type.includes('connected')
                      ? 'bg-green-500/10 border-green-500/30'
                      : event.event_type.includes('failed')
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-blue-500/10 border-blue-500/30'
                  }`}>
                    {event.event_type.includes('completed') ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : event.event_type.includes('failed') ? (
                      <XCircle className="w-4 h-4 text-red-400" />
                    ) : (
                      <Radio className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1 pt-1.5">
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-medium text-white">{event.event_type}</p>
                      <span className="text-xs text-gray-500 font-mono">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{event.details}</p>
                  </div>
                  {idx === 0 && (
                    <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/30">
                      Latest
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Survey Response */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Survey Responses</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4">
            <p className="text-xs text-gray-500 mb-1">Question 1</p>
            <p className="text-sm text-gray-300 mb-2">How satisfied are you with our product?</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-green-400">4/5</span>
              <span className="text-xs text-gray-500">Confidence: 94%</span>
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4">
            <p className="text-xs text-gray-500 mb-1">Question 2</p>
            <p className="text-sm text-gray-300 mb-2">Any suggestions for improvement?</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-yellow-400">"Faster delivery"</span>
              <span className="text-xs text-gray-500">Confidence: 87%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
