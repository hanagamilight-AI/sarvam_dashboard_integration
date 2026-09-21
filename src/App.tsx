import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardOverview from './components/DashboardOverview';
import CampaignDashboard from './components/CampaignDashboard';
import LiveCallMonitor from './components/LiveCallMonitor';
import CallDetails from './components/CallDetails';
import Analytics from './components/Analytics';
import CostAnalysis from './components/CostAnalysis';
import WebhookLog from './components/WebhookLog';
import Architecture from './components/Architecture';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/campaigns" element={<CampaignDashboard />} />
          <Route path="/live-calls" element={<LiveCallMonitor />} />
          <Route path="/calls/:callId" element={<CallDetails />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/cost-analysis" element={<CostAnalysis />} />
          <Route path="/webhooks" element={<WebhookLog />} />
          <Route path="/architecture" element={<Architecture />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
