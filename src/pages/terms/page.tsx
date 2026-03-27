import { MarketingArticle } from "@/components/landing/MarketingArticle";
import { MarketingLayout } from "@/components/landing/MarketingLayout";

export default function TermsPage() {
  return (
    <MarketingLayout>
      <MarketingArticle
        title="Terms of service"
        subtitle="Rules for using this demo. Replace with enforceable terms before offering OpenChainGuard to customers."
      >
        <p>
          This is placeholder content only. It does not constitute legal advice or a binding agreement. Your legal team
          should draft terms that cover acceptable use, service levels, liability, indemnities, and governing law for your
          entity and users.
        </p>
        <h2 className="!mt-10 text-xl font-semibold text-slate-900">Use of the service</h2>
        <p>
          Describe permitted use, prohibited activities, and responsibility for on-chain actions initiated through the
          console or APIs.
        </p>
        <h2 className="!mt-10 text-xl font-semibold text-slate-900">Disclaimer</h2>
        <p>
          Blockchain and agent systems involve risk. Clarify that the software is provided as-is where appropriate, and
          that notional metrics or demos are non-binding.
        </p>
        <h2 className="!mt-10 text-xl font-semibold text-slate-900">Changes</h2>
        <p>
          Reserve the right to update these terms and specify how users will be notified.
        </p>
      </MarketingArticle>
    </MarketingLayout>
  );
}
