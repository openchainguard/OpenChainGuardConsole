import { Link } from "react-router-dom";
import { pillars } from "@/components/landing/landing-content";
import { MarketingArticle } from "@/components/landing/MarketingArticle";
import { MarketingLayout } from "@/components/landing/MarketingLayout";

export default function SolutionsPage() {
  return (
    <MarketingLayout>
      <MarketingArticle
        title="Solutions"
        subtitle="Capabilities operators rely on—policy, auditability, and controls teams can trust."
      >
        <p>
          Every deployment is different, but the problems are the same: limit blast radius, prove compliance, and move fast
          without losing oversight. OpenChainGuard packages governance patterns—limits, allowlists, circuit breakers, and
          human review—so you are not reinventing controls for each agent.
        </p>

        <div className="!mt-10 grid gap-4 sm:grid-cols-2">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-primary ring-1 ring-blue-100">
                <p.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-base font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.body}</p>
            </div>
          ))}
        </div>

        <p className="!mt-10">
          See how it fits the protocol in the{" "}
          <Link to="/protocol-overview" className="font-medium text-primary hover:underline">
            protocol overview
          </Link>
          , or jump into the{" "}
          <Link to="/agents" className="font-medium text-primary hover:underline">
            console
          </Link>{" "}
          to explore the operator experience.
        </p>
      </MarketingArticle>
    </MarketingLayout>
  );
}
