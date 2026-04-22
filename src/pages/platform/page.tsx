import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingArticle } from "@/components/landing/MarketingArticle";
import { MarketingLayout } from "@/components/landing/MarketingLayout";
import { stats } from "@/components/landing/landing-content";

export default function PlatformPage() {
  return (
    <MarketingLayout>
      <MarketingArticle
        title="The OpenChainGuard platform"
        subtitle="Supervise agents at production scale—policy, identity signals, and operator workflows in one stack."
      >
        <p>
          OpenChainGuard gives your team one place to enforce how autonomous agents spend, who they are on-chain, and when
          humans must approve. It is built for the same operational bar as core infrastructure: clear rules, replayable
          decisions, and controls that scale with your agent fleet.
        </p>
        <p>
          Whether you run treasury bots, trading agents, or internal copilots with wallet access, the platform connects
          ERC-4337 smart accounts, policy modules, and review queues so behavior stays inside the guardrails you define.
        </p>

        <h2 className="!mt-12 text-xl font-semibold text-slate-900">At a glance</h2>
        <div className="!mt-6 grid gap-4 sm:grid-cols-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-4">
              <div className="text-2xl font-semibold tabular-nums text-slate-900">{s.value}</div>
              <div className="mt-1 text-sm font-medium text-slate-900">{s.label}</div>
              <div className="mt-0.5 text-xs text-slate-500">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="!mt-12 flex flex-wrap gap-3">
          <Button className="rounded-full" asChild>
            <Link to="/agents" className="gap-2">
              Open the console
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" className="rounded-full" asChild>
            <Link to="/docs">Read the docs</Link>
          </Button>
        </div>
      </MarketingArticle>
    </MarketingLayout>
  );
}
