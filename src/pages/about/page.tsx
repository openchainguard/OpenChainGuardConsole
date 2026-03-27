import { MarketingArticle } from "@/components/landing/MarketingArticle";
import { MarketingLayout } from "@/components/landing/MarketingLayout";

export default function AboutPage() {
  return (
    <MarketingLayout>
      <MarketingArticle
        title="About OpenChainGuard"
        subtitle="Governance and oversight for autonomous agents—policy, identity, and human review in one operator-grade console."
      >
        <p>
          OpenChainGuard helps teams ship autonomous systems with the same rigor they expect from core infrastructure:
          binding agent behavior to policy, multisig and human approvals where needed, and audit trails that stand up to
          review.
        </p>
        <p>
          We focus on standards-aligned building blocks—ERC-4337, ERC-8004 identity signals, and clear separation between
          controllers, policy modules, and operator workflows—so your stack stays interoperable as the ecosystem evolves.
        </p>
        <p>
          This site and product are demo-ready; replace placeholders with your branding, contracts, and support channels
          when you go live.
        </p>
      </MarketingArticle>
    </MarketingLayout>
  );
}
