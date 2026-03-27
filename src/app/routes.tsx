import { Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import LandingPage from "@/pages/landing/page";
import DocsPage from "@/pages/docs/page";
import ProtocolOverviewPage from "@/pages/protocol-overview/page";
import AboutPage from "@/pages/about/page";
import ContactPage from "@/pages/contact/page";
import PrivacyPage from "@/pages/privacy/page";
import TermsPage from "@/pages/terms/page";
import Index from "@/pages/home/page";
import AgentDetail from "@/pages/agent-detail/page";
import PolicyEditor from "@/pages/policy-editor/page";
import ApprovalQueue from "@/pages/approval-queue/page";
import AuditLog from "@/pages/audit-log/page";
import ProtocolStats from "@/pages/protocol-stats/page";
import AgentLeaderboard from "@/pages/agent-leaderboard/page";
import ProfileSettings from "@/pages/profile-settings/page";
import NotFound from "@/pages/not-found/page";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/docs" element={<DocsPage />} />
      <Route path="/protocol-overview" element={<ProtocolOverviewPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route element={<AppLayout />}>
        <Route path="/console" element={<Index />} />
        <Route path="/agent/:id" element={<AgentDetail />} />
        <Route path="/policy" element={<PolicyEditor />} />
        <Route path="/approvals" element={<ApprovalQueue />} />
        <Route path="/audit" element={<AuditLog />} />
        <Route path="/stats" element={<ProtocolStats />} />
        <Route path="/leaderboard" element={<AgentLeaderboard />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

