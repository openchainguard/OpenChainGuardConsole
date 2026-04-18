import { Link } from "react-router-dom";
import { MarketingArticle } from "@/components/landing/MarketingArticle";
import { MarketingLayout } from "@/components/landing/MarketingLayout";

export default function ProtocolOverviewPage() {
  return (
    <MarketingLayout>
      <MarketingArticle
        title="Protocol overview"
        subtitle="How controllers, policy modules, gatekeepers, and identity signals combine so agent operations stay explainable and replayable."
      >
        <p>
          <strong className="text-slate-900">Controllers</strong> enforce rules at the boundary of what an agent can do on
          chain. <strong className="text-slate-900">Policy modules</strong> encode limits—spend caps, allowlists, and
          review gates—so changes are explicit and versionable.
        </p>
        <p>
          <strong className="text-slate-900">Gatekeepers and registries</strong> provide identity and reputation signals
          (including ERC-8004-style signals) so risk scoring and approvals have a clear basis. Together, these pieces
          make decisions <strong className="text-slate-900">explainable and replayable</strong> for operators and auditors.
        </p>
        <p>
          OpenChainGuard is designed to sit alongside ERC-4337 account abstraction flows and your existing operator
          tools—one console to register agents, tune policy, and respond when risk spikes.
        </p>
        <p className="!mt-8">
          <Link to="/#protocol" className="font-medium text-primary hover:underline">
            View the protocol section on the home page
          </Link>{" "}
          for the full marketing layout, or open the{" "}
          <Link to="/agents" className="font-medium text-primary hover:underline">
            console
          </Link>{" "}
          to explore the demo environment.
        </p>
      </MarketingArticle>
    </MarketingLayout>
  );
}
