import { useState } from "react";
import { Download, Search, CheckCircle2 } from "lucide-react";
import { transactions, formatUSDC, truncateAddress } from "@/lib/mockData";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function AuditLog() {
  const [search, setSearch] = useState('');
  const [exportOpen, setExportOpen] = useState(false);

  const totalTx = transactions.length;
  const blockRate = ((transactions.filter(t => t.decision === 'BLOCKED').length / totalTx) * 100).toFixed(1);
  const avgRisk = Math.round(transactions.reduce((s, t) => s + t.riskScore, 0) / totalTx);

  const filtered = transactions.filter(t => {
    if (!search) return true;
    const s = search.toLowerCase();
    return t.agentName.toLowerCase().includes(s) || t.txHash.toLowerCase().includes(s) || t.decision.toLowerCase().includes(s);
  });

  const handleExport = () => {
    setExportOpen(false);
    toast.success("CSV exported", { description: `${filtered.length} transactions exported successfully.` });
  };

  return (
    <div className="min-w-0">
      <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">Audit Log</h1>
      <p className="text-sm text-muted-foreground mb-6">Complete on-chain decision history</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Transactions', value: totalTx },
          { label: 'Block Rate', value: `${blockRate}%` },
          { label: 'Avg Risk Score', value: avgRisk },
        ].map(stat => (
          <div key={stat.label} className="bg-card rounded-xl border p-5">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <div className="relative w-full sm:flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by agent, hash, decision..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto" onClick={() => setExportOpen(true)}><Download className="w-3.5 h-3.5" /> Export CSV</Button>
      </div>

      {/* Feed: stacked below xl breakpoint; grid from xl — no horizontal scroll */}
      <div className="bg-card rounded-xl border overflow-hidden min-w-0">
        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-muted-foreground">No transactions match your search.</div>
        ) : (
          <div className="divide-y">
            <div
              className="hidden xl:grid xl:grid-cols-[4.5rem_4.5rem_minmax(0,7rem)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,5rem)_minmax(0,6rem)_2.5rem_2.75rem] xl:items-center xl:gap-x-2 px-4 py-2.5 border-b bg-muted/50 text-[11px] font-medium text-muted-foreground"
              aria-hidden
            >
              <span>Block</span>
              <span>Time</span>
              <span className="min-w-0 truncate">Agent</span>
              <span className="min-w-0">TX Hash</span>
              <span className="min-w-0">Destination</span>
              <span>Amount</span>
              <span>Decision</span>
              <span>Risk</span>
              <span>Layer</span>
            </div>
            {filtered.map((tx) => (
              <div key={tx.id} className="min-w-0">
                {/* Wide screens */}
                <div className="hidden xl:grid xl:grid-cols-[4.5rem_4.5rem_minmax(0,7rem)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,5rem)_minmax(0,6rem)_2.5rem_2.75rem] xl:items-center xl:gap-x-2 px-4 py-2.5 hover:bg-muted/30 transition-colors text-sm">
                  <div className="font-mono text-xs text-muted-foreground tabular-nums">{tx.blockNumber}</div>
                  <div className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
                    {new Date(tx.timestamp).toLocaleTimeString()}
                  </div>
                  <div className="text-xs font-medium text-foreground min-w-0 truncate" title={tx.agentName}>
                    {tx.agentName}
                  </div>
                  <div className="min-w-0">
                    <a href="#" className="font-mono text-xs text-primary hover:underline truncate block" title={tx.txHash}>
                      {truncateAddress(tx.txHash)}
                    </a>
                  </div>
                  <div className="font-mono text-xs text-muted-foreground min-w-0 truncate" title={tx.destination}>
                    {truncateAddress(tx.destination)}
                  </div>
                  <div className="text-xs font-medium text-foreground tabular-nums whitespace-nowrap">{formatUSDC(tx.amount)}</div>
                  <div className="min-w-0">
                    <StatusBadge status={tx.decision} />
                  </div>
                  <div className="text-xs font-medium tabular-nums">{tx.riskScore}</div>
                  <div>
                    <span className="text-[11px] bg-muted px-2 py-0.5 rounded font-mono">{tx.policyLayer}</span>
                  </div>
                </div>
                {/* Narrow / tablet: card */}
                <div className="xl:hidden px-4 py-3 space-y-2 hover:bg-muted/30 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground tabular-nums">
                      <span>#{tx.blockNumber}</span>
                      <span>·</span>
                      <span>{new Date(tx.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <span className="text-[11px] bg-muted px-2 py-0.5 rounded font-mono shrink-0">{tx.policyLayer}</span>
                  </div>
                  <div className="font-medium text-sm text-foreground">{tx.agentName}</div>
                  <div className="grid grid-cols-1 gap-1 text-xs">
                    <div className="min-w-0">
                      <span className="text-muted-foreground">TX </span>
                      <a href="#" className="font-mono text-primary hover:underline break-all">
                        {truncateAddress(tx.txHash)}
                      </a>
                    </div>
                    <div className="min-w-0 font-mono text-muted-foreground break-all">
                      <span className="text-muted-foreground">To </span>
                      {truncateAddress(tx.destination)}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium tabular-nums">{formatUSDC(tx.amount)}</span>
                    <StatusBadge status={tx.decision} />
                    <span className="text-xs text-muted-foreground tabular-nums">Risk {tx.riskScore}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Export CSV Dialog */}
      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Export Audit Log</DialogTitle>
            <DialogDescription>Download transaction history as CSV.</DialogDescription>
          </DialogHeader>
          <div className="bg-muted rounded-lg p-3 text-xs space-y-2">
            <div className="flex justify-between"><span className="text-muted-foreground">Records</span><span className="font-medium text-foreground">{filtered.length} transactions</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Format</span><span className="font-medium text-foreground">CSV (UTF-8)</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Includes</span><span className="font-medium text-foreground">All columns</span></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportOpen(false)}>Cancel</Button>
            <Button onClick={handleExport} className="gap-2">
              <Download className="w-4 h-4" /> Download CSV
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
