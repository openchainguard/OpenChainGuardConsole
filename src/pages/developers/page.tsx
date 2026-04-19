import { Link } from "react-router-dom";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { steps } from "@/components/landing/landing-content";
import { MarketingArticle } from "@/components/landing/MarketingArticle";
import { MarketingLayout } from "@/components/landing/MarketingLayout";

export default function DevelopersPage() {
  return (
    <MarketingLayout>
      <MarketingArticle
        title="Developers"
        subtitle="Integrate once, govern everywhere—SDK-first workflows with operators in the loop."
      >
        <p>
          Ship an integration against OpenChainGuard contracts and APIs, then let policy owners tune limits and approvals
          from the console without redeploying your agent for every change.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">Typical integration path</h2>
        <ol className="!mt-4 space-y-4">
          {steps.map((s) => (
            <li key={s.n} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {s.n}
              </span>
              <div>
                <div className="font-medium text-slate-900">{s.title}</div>
                <p className="mt-1 text-slate-600">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="!mt-12 text-xl font-semibold text-slate-900">Agent runtime</h2>
        <p className="mt-2">
          After you create an agent in the console, your worker uses environment variables for the guarded wallet and
          chain. Follow the{" "}
          <Link to="/docs/agent-runtime" className="font-medium text-primary hover:underline">
            agent runtime integration
          </Link>{" "}
          guide for UserOperations, x402-style <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm">from</code>{" "}
          usage, and signing boundaries.
        </p>

        <div className="!mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button size="lg" className="h-12 gap-2 rounded-full px-8" asChild>
            <Link to="/agents">
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-slate-200 bg-white px-8 text-slate-900 hover:bg-slate-50"
            asChild
          >
            <a href="https://github.com" target="_blank" rel="noreferrer noopener" className="gap-2">
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
          </Button>
        </div>

        <p className="!mt-8">
          <Link to="/docs" className="font-medium text-primary hover:underline">
            Full documentation →
          </Link>
        </p>
      </MarketingArticle>
    </MarketingLayout>
  );
}
