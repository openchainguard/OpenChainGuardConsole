import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { MarketingArticle } from "@/components/landing/MarketingArticle";
import { MarketingLayout } from "@/components/landing/MarketingLayout";

const sections = [
  {
    title: "Console",
    body: "Supervise agents, review escalations, and act from a single operator surface.",
    to: "/agents",
  },
  {
    title: "Policy editor",
    body: "Define limits, allowlists, and review rules aligned to your risk model.",
    to: "/policy",
  },
  {
    title: "Approval queue",
    body: "Human-in-the-loop decisions with audit-friendly trails.",
    to: "/approvals",
  },
  {
    title: "Audit log",
    body: "Explainable, replayable records of policy decisions and agent actions.",
    to: "/audit",
  },
] as const;

export default function DocsPage() {
  return (
    <MarketingLayout>
      <MarketingArticle
        title="Documentation"
        subtitle="Operator and developer references for OpenChainGuard—governed agents, policy modules, and standards-aligned workflows."
      >
        <p>
          This documentation hub is a demo scaffold. Wire your own content, API references, and runbooks as you connect
          controllers, policy contracts, and ERC-4337 / ERC-8004 flows in production.
        </p>
        <h2 className="!mt-12 text-xl font-semibold text-slate-900">Product surfaces</h2>
        <ul className="mt-4 space-y-4">
          {sections.map((s) => (
            <li key={s.title}>
              <Link
                to={s.to}
                className="group inline-flex items-center gap-2 font-medium text-primary hover:underline"
              >
                {s.title}
                <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <p className="mt-1 text-slate-600">{s.body}</p>
            </li>
          ))}
        </ul>
        <h2 className="!mt-12 text-xl font-semibold text-slate-900">Protocol & stats</h2>
        <p className="mt-2">
          See the{" "}
          <Link to="/protocol-overview" className="font-medium text-primary hover:underline">
            protocol overview
          </Link>{" "}
          for how controllers, policy modules, and registries fit together, and{" "}
          <Link to="/stats" className="font-medium text-primary hover:underline">
            protocol stats
          </Link>{" "}
          for demo metrics.
        </p>
      </MarketingArticle>
    </MarketingLayout>
  );
}
