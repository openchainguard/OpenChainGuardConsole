import { MarketingArticle } from "@/components/landing/MarketingArticle";
import { MarketingLayout } from "@/components/landing/MarketingLayout";

export default function PrivacyPage() {
  return (
    <MarketingLayout>
      <MarketingArticle
        title="Privacy policy"
        subtitle="How we handle information in this demo environment. Replace with counsel-approved text for production."
      >
        <p>
          This is placeholder content. OpenChainGuard (demo) does not describe a live data processing operation here. Before
          launch, document what you collect (wallet addresses, agent metadata, logs), legal bases, retention, subprocessors,
          and user rights.
        </p>
        <h2 className="!mt-10 text-xl font-semibold text-slate-900">Information we may process</h2>
        <p>
          In a typical deployment, an operator console might process account identifiers, policy configuration, approval
          decisions, and audit logs. The exact categories depend on your implementation.
        </p>
        <h2 className="!mt-10 text-xl font-semibold text-slate-900">Security</h2>
        <p>
          Describe encryption, access controls, and incident response commitments appropriate to your threat model and
          jurisdictions.
        </p>
        <h2 className="!mt-10 text-xl font-semibold text-slate-900">Contact</h2>
        <p>
          For privacy inquiries, add a dedicated inbox or DPO contact in your production policy and link it from this page.
        </p>
      </MarketingArticle>
    </MarketingLayout>
  );
}
