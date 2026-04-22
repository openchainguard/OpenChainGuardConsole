import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/landing/MarketingLayout";
import { DocsPageLayout } from "@/components/docs/DocsPageLayout";

const toc = [
  { id: "what-you-copy", label: "What you copy" },
  { id: "environment-variables", label: "Environment variables" },
  { id: "how-agent-uses", label: "How the agent uses it" },
  { id: "sdk-skills", label: "SDK and skills" },
] as const;

export default function AgentRuntimeDocsPage() {
  return (
    <MarketingLayout>
      <DocsPageLayout
        title="Agent runtime integration"
        description="How your worker uses the guarded wallet and environment variables after you create an agent in the console."
        toc={toc}
      >
        <p>
          <Link to="/docs" className="text-sm font-medium text-primary hover:underline">
            ← Back to documentation
          </Link>
        </p>

        <h2 id="what-you-copy" className="!mt-10 scroll-mt-28 text-xl font-semibold text-slate-900">
          What you copy from the console
        </h2>
        <p>
          When provisioning finishes, the console shows a <strong>guarded wallet address</strong> and a small{" "}
          <strong>runtime env</strong> block. Those belong on the machine that runs your agent (container, worker, or
          API), not in the browser.
        </p>
        <pre>
          {`OPENCHAINGUARD_AGENT_WALLET=0x…
OPENCHAINGUARD_CHAIN=84532
# Use as \`from\` for UserOps / x402-style paid calls`}
        </pre>

        <h2 id="environment-variables" className="!mt-12 scroll-mt-28 text-xl font-semibold text-slate-900">
          Environment variables
        </h2>
        <dl className="mt-4 space-y-4">
          <div>
            <dt className="font-mono text-sm font-semibold text-slate-900">OPENCHAINGUARD_AGENT_WALLET</dt>
            <dd className="mt-1 text-slate-600">
              The ERC-4337 smart account you provisioned. This is the agent&apos;s <strong>only on-chain spend identity</strong>:
              integrations should build UserOperations for this address, or pass it as <code>from</code> for paid HTTP flows
              (for example x402-style APIs) so charges hit the correct wallet.
            </dd>
          </div>
          <div>
            <dt className="font-mono text-sm font-semibold text-slate-900">OPENCHAINGUARD_CHAIN</dt>
            <dd className="mt-1 text-slate-600">
              The chain where that account exists. Must match your RPC, bundler, and any <code>from</code> usage. Example:{" "}
              <code>84532</code> is Base Sepolia; <code>8453</code> is Base mainnet.
            </dd>
          </div>
        </dl>

        <h2 id="how-agent-uses" className="!mt-12 scroll-mt-28 text-xl font-semibold text-slate-900">
          How the agent process uses it
        </h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-slate-600">
          <li>
            <strong className="text-slate-900">UserOperations (ERC-4337):</strong> Your SDK or skill builds UserOps that
            target this smart account. Policy and the gatekeeper run on that path before execution.
          </li>
          <li>
            <strong className="text-slate-900">Paid APIs / x402:</strong> Pass the same address as the spending identity (
            <code>from</code>) so the right wallet is debited.
          </li>
          <li>
            <strong className="text-slate-900">No raw key in the LLM:</strong> The model does not receive a private key for
            that address. Signing goes through your gated path (bundler, session, paymaster, or server-side wallet) that
            policy allows.
          </li>
        </ul>

        <h2 id="sdk-skills" className="!mt-12 scroll-mt-28 text-xl font-semibold text-slate-900">
          SDK and skills
        </h2>
        <p>
          Wire these variables into <strong>GuardedWalletSkill</strong> / your OpenChainGuard client so every proposed
          action references this account. See the repository layout in your master plan (<code>packages/agent-skill</code>,{" "}
          <code>packages/sdk</code>) when you connect real contracts.
        </p>

        <p className="!mt-10">
          <Link to="/agents" className="font-medium text-primary hover:underline">
            Open the console
          </Link>{" "}
          to create or manage agents.
        </p>
      </DocsPageLayout>
    </MarketingLayout>
  );
}
