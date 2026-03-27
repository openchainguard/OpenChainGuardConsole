import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, ArrowUp, ArrowDown, ShieldAlert, Snowflake } from "lucide-react";
import { agents, transactions, defaultPolicy, formatUSDC, truncateAddress } from "@/lib/mockData";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { RiskGauge } from "@/components/shared/RiskGauge";
import { CopyAddress } from "@/components/shared/CopyAddress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

const getAvatarUrl = (seed: string) =>
  `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear`;

export default function AgentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const agent = agents.find(a => a.id === id);
  const agentTxns = transactions.filter(t => t.agentId === id);
  const [expandedTx, setExpandedTx] = useState<string | null>(null);

  if (!agent) return <div className="text-center py-20 text-muted-foreground">Agent not found</div>;

  const initials = agent.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");
  const avatarUrl = getAvatarUrl(agent.id);

  return (
    <div>
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Directory
      </button>

      <div className="mb-6 rounded-xl border bg-gradient-to-br from-primary/10 via-background to-background px-5 py-5">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="flex items-center gap-4 min-w-0">
            <div className="h-11 w-11 rounded-full overflow-hidden bg-muted text-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0">
              <img
                src={avatarUrl}
                alt={`${agent.name} avatar`}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.style.display = "none";
                  const fallback = img.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <span className="hidden h-full w-full items-center justify-center">
                {initials || "A"}
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-foreground truncate">{agent.name}</h1>
                <StatusBadge status={agent.status} />
              </div>
              <div className="mt-1">
                <CopyAddress address={agent.walletAddress} showBasescan />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <RiskGauge score={agent.kyaScore} size="lg" label="KYA Score" color="hsl(var(--primary))" />
            <RiskGauge score={agent.reputationScore} size="lg" label="Reputation" color="hsl(var(--success))" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <div className="bg-card rounded-lg border p-4">
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Today's spend</div>
          <div className="mt-1 text-lg font-semibold text-foreground tabular-nums">{formatUSDC(agent.dailySpend)}</div>
          <div className="text-xs text-muted-foreground">of {formatUSDC(agent.dailyLimit)} limit</div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Transactions today</div>
          <div className="mt-1 text-lg font-semibold text-foreground tabular-nums">{agent.transactionsToday}</div>
          <div className="text-xs text-muted-foreground">on-chain decisions</div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Risk score</div>
          <div className="mt-1 flex items-center gap-2">
            <div className="text-lg font-semibold text-foreground tabular-nums">{agent.riskScore}</div>
            {agent.riskTrend !== 0 && (
              <span className={`text-sm font-medium tabular-nums ${agent.riskTrend > 0 ? "text-destructive" : "text-success"}`}>
                {agent.riskTrend > 0 ? <ArrowUp className="inline w-4 h-4" /> : <ArrowDown className="inline w-4 h-4" />}{" "}
                {Math.abs(agent.riskTrend)}
              </span>
            )}
          </div>
          <div className="text-xs text-muted-foreground">{agent.riskTrend > 0 ? `+${agent.riskTrend}` : agent.riskTrend} from yesterday</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-lg border overflow-hidden">
          <div className="px-5 py-3 border-b">
            <h2 className="text-sm font-medium text-foreground">Transaction Feed</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  {["Time", "Decision", "Destination", "Amount", "Token", "Risk"].map((h) => (
                    <th key={h} className="text-left px-5 py-2.5 text-[11px] font-medium text-muted-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {agentTxns.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-sm text-muted-foreground">
                      No transactions
                    </td>
                  </tr>
                ) : (
                  agentTxns.map((tx) => (
                    <>
                      <tr
                        key={tx.id}
                        className="hover:bg-muted/20 transition-colors cursor-pointer"
                        onClick={() => setExpandedTx(expandedTx === tx.id ? null : tx.id)}
                      >
                        <td className="px-5 py-3 text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(tx.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="px-5 py-3 whitespace-nowrap">
                          <StatusBadge status={tx.decision} />
                        </td>
                        <td className="px-5 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">
                          {truncateAddress(tx.destination)}
                        </td>
                        <td className="px-5 py-3 text-sm font-medium text-foreground whitespace-nowrap">
                          {formatUSDC(tx.amount)}
                        </td>
                        <td className="px-5 py-3 whitespace-nowrap">
                          <Badge variant="outline" className="text-[10px]">
                            {tx.token}
                          </Badge>
                        </td>
                        <td className="px-5 py-3 whitespace-nowrap">
                          <RiskGauge score={tx.riskScore} />
                        </td>
                      </tr>
                      {expandedTx === tx.id && tx.policyChecks && (
                        <tr key={`${tx.id}-details`}>
                          <td colSpan={6} className="px-5 pb-4 pt-0">
                            <div className="mt-2 rounded-lg border bg-muted/20 p-3">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {tx.policyChecks.map((check) => (
                                  <div key={check.rule} className="flex items-center gap-2 text-xs">
                                    <span className={`h-2 w-2 rounded-full ${check.passed ? "bg-success" : "bg-destructive"}`} />
                                    <span className={check.passed ? "text-muted-foreground" : "text-destructive font-medium"}>
                                      {check.rule}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="px-5 py-3 border-b">
              <h2 className="text-sm font-medium text-foreground">Active Policy</h2>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-muted-foreground">Daily Limit</span>
                <span className="font-medium text-foreground tabular-nums">{formatUSDC(defaultPolicy.dailyLimit)}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-muted-foreground">Single TX Max</span>
                <span className="font-medium text-foreground tabular-nums">{formatUSDC(defaultPolicy.singleTxMax)}</span>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Allowed Tokens</div>
                <div className="flex flex-wrap gap-1.5">
                  {defaultPolicy.allowedTokens.map((t) => (
                    <Badge key={t.symbol} variant="secondary" className="text-[11px]">
                      {t.symbol}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-muted-foreground">Recipients</span>
                <span className="font-medium text-foreground tabular-nums">{defaultPolicy.allowedRecipients.length}</span>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Trading Hours (UTC)</div>
                <div className="font-medium text-foreground">
                  {defaultPolicy.tradingHoursStart} – {defaultPolicy.tradingHoursEnd}
                </div>
                {defaultPolicy.weekdayOnly && (
                  <Badge variant="outline" className="text-[10px] mt-2">
                    Weekday Only
                  </Badge>
                )}
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-muted-foreground">Circuit Breaker</span>
                <span className="font-medium text-foreground tabular-nums">{defaultPolicy.circuitBreakerThreshold}%</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border p-4 flex flex-col gap-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2 w-full justify-center">
                  <Snowflake className="w-4 h-4" /> Freeze Agent
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-destructive" />
                    Freeze {agent.name}?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will immediately halt all transactions for <span className="font-semibold">{agent.name}</span>.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 text-xs space-y-1">
                  <div className="flex justify-between"><span className="text-muted-foreground">Wallet</span><span className="font-mono text-foreground">{truncateAddress(agent.walletAddress)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Pending TXs</span><span className="font-medium text-foreground">{agent.transactionsToday}</span></div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={() => toast.error(`${agent.name} has been frozen`, { description: "All pending transactions have been cancelled." })}
                  >
                    Freeze
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 w-full justify-center">
                  <ExternalLink className="w-3.5 h-3.5" /> View on Basescan
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>View on Basescan</DialogTitle>
                  <DialogDescription>You are navigating to an external site.</DialogDescription>
                </DialogHeader>
                <div className="bg-muted rounded-lg p-3 text-xs">
                  <p className="text-muted-foreground mb-1">Address</p>
                  <p className="font-mono text-foreground break-all">{agent.walletAddress}</p>
                </div>
                <Button className="w-full" onClick={() => toast.info("Opening Basescan...", { description: "This is a demo — no external navigation." })}>
                  Open Basescan ↗
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
