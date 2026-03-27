import { useState } from "react";
import { AlertTriangle, X, Plus, ShieldAlert, Clock, CheckCircle2 } from "lucide-react";
import { defaultPolicy, formatUSDC } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export default function PolicyEditor() {
  const [policy, setPolicy] = useState(defaultPolicy);
  const [newToken, setNewToken] = useState('');
  const [proposalOpen, setProposalOpen] = useState(false);
  const [proposalSubmitted, setProposalSubmitted] = useState(false);

  const handlePropose = () => {
    setProposalSubmitted(true);
    setTimeout(() => {
      setProposalOpen(false);
      setProposalSubmitted(false);
      toast.success("Policy proposal submitted", { description: "48-hour timelock started. Awaiting 3/5 multisig approval." });
    }, 2000);
  };

  return (
    <div>
      <div className="mb-6 rounded-xl border bg-gradient-to-br from-primary/10 via-background to-background px-5 py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Policy Editor</h1>
            <p className="text-sm text-muted-foreground">Configure agent governance rules</p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={proposalOpen} onOpenChange={setProposalOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2"><Clock className="w-4 h-4" /> Propose change</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Confirm Policy Proposal</DialogTitle>
                  <DialogDescription>Review changes before submitting to the timelock.</DialogDescription>
                </DialogHeader>
                {!proposalSubmitted ? (
                  <div className="space-y-4">
                    <div className="rounded-lg border bg-muted/30 px-4 py-3 text-sm">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                        <div className="text-muted-foreground">
                          This change enters a <span className="font-medium text-foreground">48-hour timelock</span> and requires{" "}
                          <span className="font-medium text-foreground">3/5 multisig</span> approval.
                        </div>
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-4 text-xs space-y-2">
                      <div className="flex justify-between"><span className="text-muted-foreground">Daily Limit</span><span className="font-mono font-medium text-foreground">{formatUSDC(policy.dailyLimit)}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Single TX Max</span><span className="font-mono font-medium text-foreground">{formatUSDC(policy.singleTxMax)}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Hourly Limit</span><span className="font-mono font-medium text-foreground">{formatUSDC(policy.hourlyLimit)}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Circuit Breaker</span><span className="font-medium text-foreground">{policy.circuitBreakerThreshold}%</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Allowed Tokens</span><span className="font-medium text-foreground">{policy.allowedTokens.map(t => t.symbol).join(', ')}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Trading Hours</span><span className="font-medium text-foreground">{policy.tradingHoursStart} – {policy.tradingHoursEnd}</span></div>
                      <hr className="border-border" />
                      <div className="flex justify-between"><span className="text-muted-foreground">Timelock Expires</span><span className="font-medium text-foreground">{new Date(Date.now() + 48 * 60 * 60 * 1000).toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Signers Required</span><span className="font-medium text-foreground">3 of 5</span></div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setProposalOpen(false)}>Cancel</Button>
                      <Button onClick={handlePropose}>Submit</Button>
                    </DialogFooter>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-6 gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-primary animate-in zoom-in" />
                    </div>
                    <p className="font-semibold text-foreground">Submitting proposal...</p>
                    <Progress value={66} className="w-full max-w-[200px] h-1.5" />
                    <p className="text-xs text-muted-foreground">Broadcasting to multisig</p>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2"><ShieldAlert className="w-4 h-4" /> Emergency freeze</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-destructive" />
                    Emergency Freeze All Agents
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will <span className="font-semibold text-destructive">immediately freeze all agents</span> and halt all on-chain transactions. This bypasses the 48-hour timelock.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 text-xs space-y-1">
                  <p className="font-medium text-destructive">⚠ This action cannot be undone without multisig approval.</p>
                  <p className="text-muted-foreground">All active agents will be immediately set to Frozen status. Pending transactions will be rejected.</p>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => toast.error("Emergency freeze activated", { description: "All agents have been frozen. Multisig required to unfreeze." })}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Spending Limits */}
        <section className="bg-card rounded-lg border p-5">
          <h2 className="text-sm font-medium text-foreground mb-4">Spending Limits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Daily Limit', value: policy.dailyLimit, key: 'dailyLimit' },
              { label: 'Single TX Max', value: policy.singleTxMax, key: 'singleTxMax' },
              { label: 'Hourly Limit', value: policy.hourlyLimit, key: 'hourlyLimit' },
            ].map(field => (
              <div key={field.key}>
                <Label className="text-xs text-muted-foreground">{field.label}</Label>
                <div className="relative mt-1">
                  <Input type="number" value={field.value} onChange={e => setPolicy({ ...policy, [field.key]: Number(e.target.value) })} className="pr-14 h-9" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">USDC</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Token Whitelist */}
        <section className="bg-card rounded-lg border p-5">
          <h2 className="text-sm font-medium text-foreground mb-4">Token Whitelist</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {policy.allowedTokens.map(t => (
              <Badge key={t.symbol} className="gap-1.5 pl-3 pr-1.5 py-1.5 bg-primary/10 text-primary border-0 hover:bg-primary/20">
                {t.symbol}
                <button onClick={() => setPolicy({ ...policy, allowedTokens: policy.allowedTokens.filter(x => x.symbol !== t.symbol) })} className="p-0.5 rounded-full hover:bg-primary/30">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input placeholder="Token symbol" value={newToken} onChange={e => setNewToken(e.target.value)} className="max-w-[160px] h-9" />
            <Button variant="outline" size="sm" onClick={() => { if (newToken) { setPolicy({ ...policy, allowedTokens: [...policy.allowedTokens, { symbol: newToken.toUpperCase(), address: '0x...' }] }); setNewToken(''); } }}>
              <Plus className="w-3.5 h-3.5 mr-1" /> Add
            </Button>
          </div>
        </section>

        {/* Trading Hours */}
        <section className="bg-card rounded-lg border p-5">
          <h2 className="text-sm font-medium text-foreground mb-4">Trading Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label className="text-xs text-muted-foreground">Start (UTC)</Label>
              <Input type="time" value={policy.tradingHoursStart} onChange={e => setPolicy({ ...policy, tradingHoursStart: e.target.value })} className="mt-1 h-9" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">End (UTC)</Label>
              <Input type="time" value={policy.tradingHoursEnd} onChange={e => setPolicy({ ...policy, tradingHoursEnd: e.target.value })} className="mt-1 h-9" />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={policy.weekdayOnly} onCheckedChange={v => setPolicy({ ...policy, weekdayOnly: v })} />
              <Label className="text-xs text-muted-foreground">Weekday Only</Label>
            </div>
          </div>
        </section>

        {/* Circuit Breaker */}
        <section className="bg-card rounded-lg border p-5">
          <h2 className="text-sm font-medium text-foreground mb-1">Circuit Breaker</h2>
          <p className="text-xs text-muted-foreground mb-4">Trip if agent moves X% of wallet in one hour</p>
          <div className="flex items-center gap-4">
            <Slider value={[policy.circuitBreakerThreshold]} onValueChange={v => setPolicy({ ...policy, circuitBreakerThreshold: v[0] })} min={1} max={25} step={1} className="flex-1" />
            <span className="text-lg font-bold text-primary min-w-[3rem] text-right">{policy.circuitBreakerThreshold}%</span>
          </div>
        </section>
      </div>
    </div>
  );
}
