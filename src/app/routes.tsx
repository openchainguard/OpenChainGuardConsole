import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import LandingPage from "@/pages/landing/page";
import DocsPage from "@/pages/docs/page";
import AgentRuntimeDocsPage from "@/pages/docs/agent-runtime/page";
import ProtocolOverviewPage from "@/pages/protocol-overview/page";
import AboutPage from "@/pages/about/page";
import PlatformPage from "@/pages/platform/page";
import SolutionsPage from "@/pages/solutions/page";
import DevelopersPage from "@/pages/developers/page";
import ResourcesPage from "@/pages/resources/page";
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
import ReputationPage from "@/pages/reputation/page";
import AgentRuntimeWiring from "@/pages/agent-runtime-wiring/page";
import NotFound from "@/pages/not-found/page";

function LegacyAgentRedirect() {
  const { id } = useParams();
  if (!id) return <Navigate to="/agents" replace />;
  return <Navigate to={`/agents/${id}`} replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/docs" element={<DocsPage />} />
      <Route path="/docs/agent-runtime" element={<AgentRuntimeDocsPage />} />
      <Route path="/protocol-overview" element={<ProtocolOverviewPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/platform" element={<PlatformPage />} />
      <Route path="/solutions" element={<SolutionsPage />} />
      <Route path="/developers" element={<DevelopersPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route element={<AppLayout />}>
        <Route path="/agents" element={<Index />} />
        <Route path="/agents/new" element={<Index />} />
        <Route path="/agents/runtime" element={<AgentRuntimeWiring />} />
        <Route path="/agents/:id" element={<AgentDetail />} />
        <Route path="/console" element={<Navigate to="/agents" replace />} />
        <Route path="/agent/:id" element={<LegacyAgentRedirect />} />
        <Route path="/policy" element={<PolicyEditor />} />
        <Route path="/approvals" element={<ApprovalQueue />} />
        <Route path="/audit" element={<AuditLog />} />
        <Route path="/reputation" element={<ReputationPage />} />
        <Route path="/stats" element={<ProtocolStats />} />
        <Route path="/leaderboard" element={<AgentLeaderboard />} />
        <Route path="/settings" element={<ProfileSettings />} />
        <Route path="/profile" element={<Navigate to="/settings" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
