import { useState } from "react";
import { CheckCircle2, XCircle, Shield } from "lucide-react";
import { transactions, formatUSDC, truncateAddress } from "@/lib/mockData";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { RiskGauge } from "@/components/shared/RiskGauge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function ApprovalQueue() {
  const escalated = transactions.filter(t => t.decision === 'ESCALATED');
  const [approveTarget, setApproveTarget] = useState<typeof escalated[0] | null>(null);
  const [rejectTarget, setRejectTarget] = useState<typeof escalated[0] | null>(null);
  const [signingTx, setSigningTx] = useState<string | null>(null);
  const signing = !!signingTx;
  const signaturesText = signing ? "3 of 3" : "2 of 3";

  const handleApprove = (tx: typeof escalated[0]) => {
    setApproveTarget(null);
    setSigningTx(tx.id);
    setTimeout(() => {
      setSigningTx(null);
      toast.success("Transaction approved", { description: `${formatUSDC(tx.amount)} to ${truncateAddress(tx.destination)} has been signed and broadcast.` });
    }, 2500);
  };

  const handleReject = (tx: typeof escalated[0]) => {
    setRejectTarget(null);
    toast.error("Transaction rejected", { description: `${formatUSDC(tx.amount)} to ${truncateAddress(tx.destination)} has been rejected.` });
  };

  return (
    <div>
      <div className="mb-6 rounded-xl border bg-gradient-to-br from-primary/10 via-background to-background px-4 sm:px-5 py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Approval Queue</h1>
            <p className="text-sm text-muted-foreground">Transactions awaiting human review</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3 w-full sm:w-auto">
            <div className="rounded-lg border bg-background/70 px-3 py-2">
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Pending</div>
              <div className="text-sm font-semibold text-foreground tabular-nums">{escalated.length}</div>
            </div>
            <div className="rounded-lg border bg-background/70 px-3 py-2">
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Multisig</div>
              <div className="text-sm font-semibold text-foreground tabular-nums">{signaturesText}</div>
            </div>
          </div>
        </div>
      </div>

      {escalated.length === 0 ? (
        <div className="bg-card rounded-lg border p-16 text-center">
          <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" />
          <p className="text-foreground font-medium">No pending approvals</p>
          <p className="text-sm text-muted-foreground mt-1">All transactions have been processed</p>
        </div>
      ) : (
        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="px-4 sm:px-5 py-3 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="text-sm font-medium text-foreground">Escalated transactions</div>
              <div className="flex items-center gap-3 sm:min-w-[220px]">
                <div className="text-xs text-muted-foreground whitespace-nowrap">Multisig progress</div>
                <div className="flex-1">
                  <Progress value={signing ? 100 : 66} className="h-1.5" />
                </div>
                <div className="text-xs font-medium text-foreground tabular-nums whitespace-nowrap">{signaturesText}</div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  {["Time", "Agent", "Destination", "Amount", "Decision", "Risk", ""].map((h) => (
                    <th key={h} className="text-left px-4 sm:px-5 py-2.5 text-[11px] font-medium text-muted-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {escalated.map((tx) => (
                  <tr key={tx.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 sm:px-5 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(tx.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 sm:px-5 py-3 text-sm font-medium text-foreground whitespace-nowrap">{tx.agentName}</td>
                    <td className="px-4 sm:px-5 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">
                      {truncateAddress(tx.destination)}
                    </td>
                    <td className="px-4 sm:px-5 py-3 text-sm font-medium text-foreground whitespace-nowrap">{formatUSDC(tx.amount)}</td>
                    <td className="px-4 sm:px-5 py-3 whitespace-nowrap">
                      <StatusBadge status={tx.decision} />
                      {tx.reason && (
                        <div className="mt-1 text-[11px] text-muted-foreground max-w-[360px] whitespace-normal">{tx.reason}</div>
                      )}
                    </td>
                    <td className="px-4 sm:px-5 py-3 whitespace-nowrap">
                      <div className="flex items-center justify-start">
                        <RiskGauge score={tx.riskScore} />
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-3 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          onClick={() => setApproveTarget(tx)}
                          disabled={signingTx === tx.id}
                        >
                          {signingTx === tx.id ? "Signing..." : "Approve"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => setRejectTarget(tx)}
                          disabled={signingTx === tx.id}
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Approve Confirmation */}
      <AlertDialog open={!!approveTarget} onOpenChange={(o) => !o && setApproveTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-success" />
              Approve Transaction
            </AlertDialogTitle>
            <AlertDialogDescription>
              You are about to approve and sign this escalated transaction. This will broadcast it on-chain.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {approveTarget && (
            <div className="bg-muted rounded-lg p-3 text-xs space-y-2">
              <div className="flex justify-between"><span className="text-muted-foreground">Agent</span><span className="font-medium text-foreground">{approveTarget.agentName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Destination</span><span className="font-mono text-foreground">{truncateAddress(approveTarget.destination)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Amount</span><span className="font-medium text-foreground">{formatUSDC(approveTarget.amount)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Risk Score</span><span className="font-medium text-foreground">{approveTarget.riskScore}/100</span></div>
              {approveTarget.reason && <div className="flex justify-between"><span className="text-muted-foreground">Escalation Reason</span><span className="font-medium text-warning">{approveTarget.reason}</span></div>}
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-success text-success-foreground hover:bg-success/90" onClick={() => approveTarget && handleApprove(approveTarget)}>
              Sign & Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Confirmation */}
      <AlertDialog open={!!rejectTarget} onOpenChange={(o) => !o && setRejectTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-destructive" />
              Reject Transaction
            </AlertDialogTitle>
            <AlertDialogDescription>
              This transaction will be permanently rejected and the agent will be notified.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {rejectTarget && (
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 text-xs space-y-2">
              <div className="flex justify-between"><span className="text-muted-foreground">Agent</span><span className="font-medium text-foreground">{rejectTarget.agentName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Amount</span><span className="font-medium text-foreground">{formatUSDC(rejectTarget.amount)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Destination</span><span className="font-mono text-foreground">{truncateAddress(rejectTarget.destination)}</span></div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => rejectTarget && handleReject(rejectTarget)}>
              Reject Transaction
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Signing overlay dialog */}
      <Dialog open={!!signingTx} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-xs" onPointerDownOutside={e => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Signing Transaction</DialogTitle>
            <DialogDescription>Collecting multisig signatures...</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-4 gap-3">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center animate-pulse">
              <Shield className="w-5 h-5 text-success" />
            </div>
            <Progress value={80} className="w-full h-1.5" />
            <p className="text-xs text-muted-foreground">3 of 3 signatures collected</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
