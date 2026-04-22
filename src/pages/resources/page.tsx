import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { MarketingArticle } from "@/components/landing/MarketingArticle";
import { MarketingLayout } from "@/components/landing/MarketingLayout";

const guides = [
  {
    title: "What is agent governance?",
    desc: "How policy modules, guarded wallets, and human-in-the-loop approvals fit together.",
    to: "/protocol-overview",
  },
  {
    title: "Agent runtime integration",
    desc: "Environment variables, ERC-4337 UserOps, and x402-style spend identity after provisioning.",
    to: "/docs/agent-runtime",
  },
  {
    title: "Documentation hub",
    desc: "Operator and developer references, console surfaces, and protocol links.",
    to: "/docs",
  },
  {
    title: "Protocol metrics",
    desc: "Demo stats and footprint for the OpenChainGuard stack.",
    to: "/stats",
  },
] as const;

export default function ResourcesPage() {
  return (
    <MarketingLayout>
      <MarketingArticle
        title="Resources"
        subtitle="Deep dives and entry points so your team can align before wiring production agents."
      >
        <p>
          Start with protocol context, then follow runtime integration when you are ready to connect workers and SDKs.
          Everything here links to first-party pages in this demo site—swap in your own PDFs, Notion, or GitBook when you
          ship.
        </p>

        <div className="!mt-10 grid gap-4 md:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.title}
              to={g.to}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-base font-semibold text-slate-900 group-hover:text-primary">{g.title}</h2>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{g.desc}</p>
              <span className="mt-4 text-xs font-medium text-primary">Open</span>
            </Link>
          ))}
        </div>

        <p className="!mt-10">
          Ready to try the product?{" "}
          <Link to="/agents" className="font-medium text-primary hover:underline">
            Go to the console →
          </Link>
        </p>
      </MarketingArticle>
    </MarketingLayout>
  );
}
