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
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-1">Audit Log</h1>
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
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by agent, hash, decision..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => setExportOpen(true)}><Download className="w-3.5 h-3.5" /> Export CSV</Button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                {['Block', 'Time', 'Agent', 'TX Hash', 'Destination', 'Amount', 'Decision', 'Risk', 'Layer'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(tx => (
                <tr key={tx.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{tx.blockNumber}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(tx.timestamp).toLocaleTimeString()}</td>
                  <td className="px-4 py-3 text-xs font-medium text-foreground">{tx.agentName}</td>
                  <td className="px-4 py-3"><a href="#" className="font-mono text-xs text-primary hover:underline">{truncateAddress(tx.txHash)}</a></td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{truncateAddress(tx.destination)}</td>
                  <td className="px-4 py-3 text-xs font-medium text-foreground">{formatUSDC(tx.amount)}</td>
                  <td className="px-4 py-3"><StatusBadge status={tx.decision} /></td>
                  <td className="px-4 py-3 text-xs font-medium">{tx.riskScore}</td>
                  <td className="px-4 py-3"><span className="text-[11px] bg-muted px-2 py-0.5 rounded font-mono">{tx.policyLayer}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
