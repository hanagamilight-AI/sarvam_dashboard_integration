// Mock data for the Sarvam Real-Time Dashboard

export interface Campaign {
  id: string;
  external_campaign_id: string;
  name: string;
  status: 'active' | 'completed' | 'paused' | 'draft';
  total_contacts: number;
  total_attempts: number;
  connected_calls: number;
  completed_calls: number;
  failed_calls: number;
  pickup_rate: number;
  completion_rate: number;
  avg_duration_seconds: number;
  created_at: string;
  language: string;
}

export interface Call {
  id: string;
  external_call_id: string;
  campaign_id: string;
  campaign_name: string;
  phone_number: string;
  status: 'initiated' | 'ringing' | 'connected' | 'completed' | 'failed' | 'busy' | 'no_answer';
  started_at: string;
  connected_at: string | null;
  ended_at: string | null;
  duration_seconds: number;
  disposition: string;
}

export interface CallEvent {
  id: string;
  call_id: string;
  event_type: string;
  timestamp: string;
  details: string;
}

export interface TranscriptEntry {
  role: 'agent' | 'user';
  text: string;
  timestamp: string;
}

export interface WebhookEvent {
  id: string;
  event_id: string;
  event_type: string;
  external_call_id: string;
  received_at: string;
  processed_at: string | null;
  processing_status: 'received' | 'processing' | 'completed' | 'failed';
  error_message: string | null;
}

export interface CostMetric {
  campaign_id: string;
  campaign_name: string;
  total_cost: number;
  sarvam_cost: number;
  telephony_cost: number;
  infrastructure_cost: number;
  cost_per_attempt: number;
  cost_per_connected: number;
  cost_per_completed: number;
  cost_per_billable_minute: number;
}

export const campaigns: Campaign[] = [
  {
    id: 'c1',
    external_campaign_id: 'campaign_456',
    name: 'Customer Satisfaction Survey Q4',
    status: 'active',
    total_contacts: 5000,
    total_attempts: 30196,
    connected_calls: 10761,
    completed_calls: 8200,
    failed_calls: 892,
    pickup_rate: 35.64,
    completion_rate: 76.20,
    avg_duration_seconds: 72,
    created_at: '2026-09-15T08:00:00Z',
    language: 'Hindi',
  },
  {
    id: 'c2',
    external_campaign_id: 'campaign_789',
    name: 'Health Awareness Outreach',
    status: 'active',
    total_contacts: 3000,
    total_attempts: 18500,
    connected_calls: 6200,
    completed_calls: 4800,
    failed_calls: 450,
    pickup_rate: 33.51,
    completion_rate: 77.42,
    avg_duration_seconds: 85,
    created_at: '2026-09-18T10:30:00Z',
    language: 'Tamil',
  },
  {
    id: 'c3',
    external_campaign_id: 'campaign_012',
    name: 'Product Feedback Collection',
    status: 'completed',
    total_contacts: 2000,
    total_attempts: 12000,
    connected_calls: 4500,
    completed_calls: 3800,
    failed_calls: 320,
    pickup_rate: 37.50,
    completion_rate: 84.44,
    avg_duration_seconds: 65,
    created_at: '2026-09-10T14:00:00Z',
    language: 'English',
  },
  {
    id: 'c4',
    external_campaign_id: 'campaign_013',
    name: 'Voter Registration Drive',
    status: 'paused',
    total_contacts: 8000,
    total_attempts: 9200,
    connected_calls: 2800,
    completed_calls: 1900,
    failed_calls: 600,
    pickup_rate: 30.43,
    completion_rate: 67.86,
    avg_duration_seconds: 95,
    created_at: '2026-09-20T09:00:00Z',
    language: 'Telugu',
  },
  {
    id: 'c5',
    external_campaign_id: 'campaign_014',
    name: 'Insurance Renewal Reminder',
    status: 'active',
    total_contacts: 4000,
    total_attempts: 15000,
    connected_calls: 5500,
    completed_calls: 4200,
    failed_calls: 380,
    pickup_rate: 36.67,
    completion_rate: 76.36,
    avg_duration_seconds: 58,
    created_at: '2026-09-19T11:00:00Z',
    language: 'Marathi',
  },
  {
    id: 'c6',
    external_campaign_id: 'campaign_015',
    name: 'Education Enrollment Survey',
    status: 'draft',
    total_contacts: 6000,
    total_attempts: 0,
    connected_calls: 0,
    completed_calls: 0,
    failed_calls: 0,
    pickup_rate: 0,
    completion_rate: 0,
    avg_duration_seconds: 0,
    created_at: '2026-09-21T07:00:00Z',
    language: 'Kannada',
  },
];

export const liveCalls: Call[] = [
  { id: 'call_1001', external_call_id: 'ext_1001', campaign_id: 'c1', campaign_name: 'Customer Satisfaction Survey Q4', phone_number: '+91-XXXX-XX42', status: 'connected', started_at: '2026-09-21T10:28:00Z', connected_at: '2026-09-21T10:28:07Z', ended_at: null, duration_seconds: 134, disposition: '' },
  { id: 'call_1002', external_call_id: 'ext_1002', campaign_id: 'c1', campaign_name: 'Customer Satisfaction Survey Q4', phone_number: '+91-XXXX-XX87', status: 'ringing', started_at: '2026-09-21T10:29:45Z', connected_at: null, ended_at: null, duration_seconds: 12, disposition: '' },
  { id: 'call_1003', external_call_id: 'ext_1003', campaign_id: 'c2', campaign_name: 'Health Awareness Outreach', phone_number: '+91-XXXX-XX15', status: 'completed', started_at: '2026-09-21T10:25:00Z', connected_at: '2026-09-21T10:25:08Z', ended_at: '2026-09-21T10:27:11Z', duration_seconds: 131, disposition: 'Survey Completed' },
  { id: 'call_1004', external_call_id: 'ext_1004', campaign_id: 'c3', campaign_name: 'Product Feedback Collection', phone_number: '+91-XXXX-XX63', status: 'connected', started_at: '2026-09-21T10:27:30Z', connected_at: '2026-09-21T10:27:38Z', ended_at: null, duration_seconds: 98, disposition: '' },
  { id: 'call_1005', external_call_id: 'ext_1005', campaign_id: 'c5', campaign_name: 'Insurance Renewal Reminder', phone_number: '+91-XXXX-XX29', status: 'failed', started_at: '2026-09-21T10:29:00Z', connected_at: null, ended_at: '2026-09-21T10:29:05Z', duration_seconds: 5, disposition: 'No Answer' },
  { id: 'call_1006', external_call_id: 'ext_1006', campaign_id: 'c1', campaign_name: 'Customer Satisfaction Survey Q4', phone_number: '+91-XXXX-XX71', status: 'connected', started_at: '2026-09-21T10:26:00Z', connected_at: '2026-09-21T10:26:06Z', ended_at: null, duration_seconds: 210, disposition: '' },
  { id: 'call_1007', external_call_id: 'ext_1007', campaign_id: 'c2', campaign_name: 'Health Awareness Outreach', phone_number: '+91-XXXX-XX44', status: 'initiated', started_at: '2026-09-21T10:30:02Z', connected_at: null, ended_at: null, duration_seconds: 3, disposition: '' },
  { id: 'call_1008', external_call_id: 'ext_1008', campaign_id: 'c4', campaign_name: 'Voter Registration Drive', phone_number: '+91-XXXX-XX56', status: 'busy', started_at: '2026-09-21T10:29:50Z', connected_at: null, ended_at: '2026-09-21T10:29:53Z', duration_seconds: 3, disposition: 'Busy' },
  { id: 'call_1009', external_call_id: 'ext_1009', campaign_id: 'c5', campaign_name: 'Insurance Renewal Reminder', phone_number: '+91-XXXX-XX88', status: 'completed', started_at: '2026-09-21T10:24:00Z', connected_at: '2026-09-21T10:24:05Z', ended_at: '2026-09-21T10:25:30Z', duration_seconds: 90, disposition: 'Renewal Confirmed' },
  { id: 'call_1010', external_call_id: 'ext_1010', campaign_id: 'c1', campaign_name: 'Customer Satisfaction Survey Q4', phone_number: '+91-XXXX-XX33', status: 'connected', started_at: '2026-09-21T10:28:30Z', connected_at: '2026-09-21T10:28:37Z', ended_at: null, duration_seconds: 87, disposition: '' },
];

export const callEvents: CallEvent[] = [
  { id: 'ev1', call_id: 'call_1001', event_type: 'call.initiated', timestamp: '2026-09-21T10:28:00Z', details: 'Call initiated to +91-XXXX-XX42' },
  { id: 'ev2', call_id: 'call_1001', event_type: 'call.ringing', timestamp: '2026-09-21T10:28:04Z', details: 'Call ringing' },
  { id: 'ev3', call_id: 'call_1001', event_type: 'call.connected', timestamp: '2026-09-21T10:28:07Z', details: 'Call connected' },
  { id: 'ev4', call_id: 'call_1001', event_type: 'transcript.partial', timestamp: '2026-09-21T10:28:15Z', details: 'Partial transcript received' },
  { id: 'ev5', call_id: 'call_1001', event_type: 'survey.response', timestamp: '2026-09-21T10:28:45Z', details: 'Survey response: "Satisfied"' },
  { id: 'ev6', call_id: 'call_1001', event_type: 'transcript.final', timestamp: '2026-09-21T10:29:30Z', details: 'Final transcript available' },
];

export const transcript: TranscriptEntry[] = [
  { role: 'agent', text: 'नमस्ते, यह एक स्वचालित सर्वेक्षण कॉल है। क्या आप कुछ मिनट दे सकते हैं?', timestamp: '10:28:08' },
  { role: 'user', text: 'हाँ, बताइए।', timestamp: '10:28:15' },
  { role: 'agent', text: 'हमारे उत्पाद से आप कितने संतुष्ट हैं? कृपया 1 से 5 में से चुनें।', timestamp: '10:28:25' },
  { role: 'user', text: 'मैं 4 दूंगा।', timestamp: '10:28:40' },
  { role: 'agent', text: 'धन्यवाद! क्या आप हमें कोई सुझाव देना चाहेंगे?', timestamp: '10:28:50' },
  { role: 'user', text: 'डिलीवरी थोड़ी तेज़ हो सकती है।', timestamp: '10:29:10' },
  { role: 'agent', text: 'आपकी प्रतिक्रिया के लिए धन्यवाद। आपका दिन शुभ हो!', timestamp: '10:29:25' },
];

export const webhookEvents: WebhookEvent[] = [
  { id: 'wh1', event_id: 'evt_10001', event_type: 'call.initiated', external_call_id: 'ext_1001', received_at: '2026-09-21T10:28:00Z', processed_at: '2026-09-21T10:28:01Z', processing_status: 'completed', error_message: null },
  { id: 'wh2', event_id: 'evt_10002', event_type: 'call.connected', external_call_id: 'ext_1001', received_at: '2026-09-21T10:28:07Z', processed_at: '2026-09-21T10:28:08Z', processing_status: 'completed', error_message: null },
  { id: 'wh3', event_id: 'evt_10003', event_type: 'transcript.partial', external_call_id: 'ext_1001', received_at: '2026-09-21T10:28:15Z', processed_at: '2026-09-21T10:28:16Z', processing_status: 'completed', error_message: null },
  { id: 'wh4', event_id: 'evt_10004', event_type: 'survey.response', external_call_id: 'ext_1001', received_at: '2026-09-21T10:28:45Z', processed_at: '2026-09-21T10:28:46Z', processing_status: 'completed', error_message: null },
  { id: 'wh5', event_id: 'evt_10005', event_type: 'call.completed', external_call_id: 'ext_1003', received_at: '2026-09-21T10:27:11Z', processed_at: '2026-09-21T10:27:12Z', processing_status: 'completed', error_message: null },
  { id: 'wh6', event_id: 'evt_10006', event_type: 'call.failed', external_call_id: 'ext_1005', received_at: '2026-09-21T10:29:05Z', processed_at: '2026-09-21T10:29:06Z', processing_status: 'completed', error_message: null },
  { id: 'wh7', event_id: 'evt_10007', event_type: 'call.initiated', external_call_id: 'ext_1007', received_at: '2026-09-21T10:30:02Z', processed_at: null, processing_status: 'processing', error_message: null },
  { id: 'wh8', event_id: 'evt_10008', event_type: 'call.busy', external_call_id: 'ext_1008', received_at: '2026-09-21T10:29:53Z', processed_at: '2026-09-21T10:29:54Z', processing_status: 'completed', error_message: null },
  { id: 'wh9', event_id: 'evt_10009', event_type: 'transcript.final', external_call_id: 'ext_1004', received_at: '2026-09-21T10:30:10Z', processed_at: null, processing_status: 'received', error_message: null },
  { id: 'wh10', event_id: 'evt_10010', event_type: 'call.connected', external_call_id: 'ext_1006', received_at: '2026-09-21T10:26:06Z', processed_at: '2026-09-21T10:26:07Z', processing_status: 'completed', error_message: null },
];

export const costMetrics: CostMetric[] = [
  { campaign_id: 'c1', campaign_name: 'Customer Satisfaction Survey Q4', total_cost: 4529.40, sarvam_cost: 2415.68, telephony_cost: 1509.80, infrastructure_cost: 603.92, cost_per_attempt: 0.15, cost_per_connected: 0.42, cost_per_completed: 0.55, cost_per_billable_minute: 0.038 },
  { campaign_id: 'c2', campaign_name: 'Health Awareness Outreach', total_cost: 2775.00, sarvam_cost: 1480.00, telephony_cost: 925.00, infrastructure_cost: 370.00, cost_per_attempt: 0.15, cost_per_connected: 0.45, cost_per_completed: 0.58, cost_per_billable_minute: 0.033 },
  { campaign_id: 'c3', campaign_name: 'Product Feedback Collection', total_cost: 1800.00, sarvam_cost: 960.00, telephony_cost: 600.00, infrastructure_cost: 240.00, cost_per_attempt: 0.15, cost_per_connected: 0.40, cost_per_completed: 0.47, cost_per_billable_minute: 0.028 },
  { campaign_id: 'c4', campaign_name: 'Voter Registration Drive', total_cost: 1380.00, sarvam_cost: 736.00, telephony_cost: 460.00, infrastructure_cost: 184.00, cost_per_attempt: 0.15, cost_per_connected: 0.49, cost_per_completed: 0.73, cost_per_billable_minute: 0.045 },
  { campaign_id: 'c5', campaign_name: 'Insurance Renewal Reminder', total_cost: 2250.00, sarvam_cost: 1200.00, telephony_cost: 750.00, infrastructure_cost: 300.00, cost_per_attempt: 0.15, cost_per_connected: 0.41, cost_per_completed: 0.54, cost_per_billable_minute: 0.035 },
];

export const hourlyCallData = [
  { hour: '00:00', calls: 120, connected: 42, completed: 35 },
  { hour: '01:00', calls: 85, connected: 30, completed: 25 },
  { hour: '02:00', calls: 45, connected: 15, completed: 12 },
  { hour: '03:00', calls: 30, connected: 10, completed: 8 },
  { hour: '04:00', calls: 25, connected: 8, completed: 6 },
  { hour: '05:00', calls: 40, connected: 14, completed: 11 },
  { hour: '06:00', calls: 180, connected: 65, completed: 52 },
  { hour: '07:00', calls: 450, connected: 160, completed: 130 },
  { hour: '08:00', calls: 820, connected: 290, completed: 240 },
  { hour: '09:00', calls: 1200, connected: 430, completed: 360 },
  { hour: '10:00', calls: 1500, connected: 540, completed: 450 },
  { hour: '11:00', calls: 1350, connected: 480, completed: 400 },
  { hour: '12:00', calls: 900, connected: 320, completed: 270 },
  { hour: '13:00', calls: 1100, connected: 390, completed: 325 },
  { hour: '14:00', calls: 1400, connected: 500, completed: 420 },
  { hour: '15:00', calls: 1250, connected: 450, completed: 375 },
  { hour: '16:00', calls: 980, connected: 350, completed: 290 },
  { hour: '17:00', calls: 750, connected: 270, completed: 225 },
  { hour: '18:00', calls: 520, connected: 185, completed: 155 },
  { hour: '19:00', calls: 380, connected: 135, completed: 112 },
  { hour: '20:00', calls: 280, connected: 100, completed: 83 },
  { hour: '21:00', calls: 200, connected: 70, completed: 58 },
  { hour: '22:00', calls: 150, connected: 52, completed: 43 },
  { hour: '23:00', calls: 100, connected: 35, completed: 29 },
];

export const dailyTrendData = [
  { date: 'Sep 15', calls: 8500, connected: 3020, completed: 2450 },
  { date: 'Sep 16', calls: 12000, connected: 4280, completed: 3500 },
  { date: 'Sep 17', calls: 15200, connected: 5420, completed: 4380 },
  { date: 'Sep 18', calls: 18000, connected: 6430, completed: 5200 },
  { date: 'Sep 19', calls: 22000, connected: 7850, completed: 6400 },
  { date: 'Sep 20', calls: 25500, connected: 9100, completed: 7380 },
  { date: 'Sep 21', calls: 28000, connected: 10000, completed: 8100 },
];

export const callStatusDistribution = [
  { name: 'Completed', value: 22900, color: '#10b981' },
  { name: 'Connected (Active)', value: 180, color: '#3b82f6' },
  { name: 'No Answer', value: 4500, color: '#f59e0b' },
  { name: 'Busy', value: 1200, color: '#f97316' },
  { name: 'Failed', value: 2642, color: '#ef4444' },
];
