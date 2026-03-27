import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, CheckCircle2 } from "lucide-react";
import { agents, truncateAddress, formatUSDC } from "@/lib/mockData";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const filters = ['All', 'Active', 'Frozen', 'High Risk'] as const;

const getAvatarUrl = (seed: string) =>
  `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear`;

export default function AgentDirectory() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<typeof filters[number]>('All');
  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerForm, setRegisterForm] = useState({ name: '', controller: '', policy: '', erc8004: '' });
  const navigate = useNavigate();
  const activeAgents = agents.filter(a => a.status === 'Active').length;
  const tvs = 12400000;
  const txnsToday = 171;

  const filtered = agents.filter(a => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === 'Active') return a.status === 'Active';
    if (filter === 'Frozen') return a.status === 'Frozen';
    if (filter === 'High Risk') return a.riskScore >= 60;
    return true;
  });

  const handleRegister = () => {
    setRegisterOpen(false);
    setRegisterForm({ name: '', controller: '', policy: '', erc8004: '' });
    toast.success("Agent registered successfully", { description: `${registerForm.name || 'New Agent'} has been added to the directory.` });
  };

  return (
    <div>
      <div className="mb-6 rounded-xl border bg-gradient-to-br from-primary/10 via-background to-background px-4 sm:px-5 py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Agent Directory</h1>
            <p className="text-sm text-muted-foreground">Discover and supervise governed agents.</p>
          </div>
          <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 w-full sm:w-auto">
                <Plus className="w-4 h-4" /> Register New Agent
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Register New Agent</DialogTitle>
                <DialogDescription>Add a new AI agent to the governance protocol.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div><Label>Agent Name</Label><Input placeholder="e.g. Treasury Alpha" className="mt-1" value={registerForm.name} onChange={e => setRegisterForm({ ...registerForm, name: e.target.value })} /></div>
                <div><Label>Controller Contract</Label><Input placeholder="0x..." className="mt-1 font-mono" value={registerForm.controller} onChange={e => setRegisterForm({ ...registerForm, controller: e.target.value })} /></div>
                <div><Label>Policy Module Address</Label><Input placeholder="0x..." className="mt-1 font-mono" value={registerForm.policy} onChange={e => setRegisterForm({ ...registerForm, policy: e.target.value })} /></div>
                <div><Label>ERC-8004 Agent ID</Label><Input placeholder="ERC8004-XXX" className="mt-1 font-mono" value={registerForm.erc8004} onChange={e => setRegisterForm({ ...registerForm, erc8004: e.target.value })} /></div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setRegisterOpen(false)}>Cancel</Button>
                  <Button onClick={handleRegister}>
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Register Agent
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search agents..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9 bg-background/70" />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground hover:bg-muted'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-card rounded-xl border p-4">
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">TVS</div>
          <div className="mt-1 text-lg font-semibold text-foreground tabular-nums">{formatUSDC(tvs)}</div>
        </div>
        <div className="bg-card rounded-xl border p-4">
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Agents</div>
          <div className="mt-1 text-lg font-semibold text-foreground tabular-nums">{activeAgents}</div>
        </div>
        <div className="bg-card rounded-xl border p-4">
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Txns Today</div>
          <div className="mt-1 text-lg font-semibold text-foreground tabular-nums">{txnsToday}</div>
        </div>
      </div>

      <div className="md:hidden">
        <ul className="flex flex-col gap-3">
          {filtered.map((agent) => {
            const avatarUrl = getAvatarUrl(agent.id);
            const initials = agent.name
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((s) => s[0]?.toUpperCase())
              .join("");
            return (
              <li key={agent.id}>
                <button
                  type="button"
                  onClick={() => navigate(`/agent/${agent.id}`)}
                  className="w-full rounded-xl border bg-card p-4 text-left transition-colors active:bg-muted/40 hover:bg-muted/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-xs font-semibold text-foreground">
                      <img
                        src={avatarUrl}
                        alt=""
                        className="absolute inset-0 z-10 h-full w-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <span className="relative z-0">{initials || "?"}</span>
                    </div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-foreground">{agent.name}</span>
                        <StatusBadge status={agent.status} />
                      </div>
                      <p className="font-mono text-xs text-muted-foreground">{truncateAddress(agent.walletAddress)}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
                        <div>
                          <div className="text-muted-foreground">KYA</div>
                          <div className="font-medium tabular-nums text-foreground">{agent.kyaScore}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Daily</div>
                          <div className="font-medium tabular-nums text-foreground">{formatUSDC(agent.dailySpend)}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Txns</div>
                          <div className="tabular-nums text-foreground">{agent.transactionsToday}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="hidden bg-card md:block rounded-lg border overflow-hidden">
        <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                {["Agent", "Status", "KYA", "Daily spend", "Txns today", "Risk trend"].map((h) => (
                  <th key={h} className="text-left px-4 sm:px-5 py-2.5 text-[11px] font-medium text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((agent) => {
                const initials = agent.name
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((s) => s[0]?.toUpperCase())
                  .join("");
                const avatarUrl = getAvatarUrl(agent.id);
                return (
                  <tr
                    key={agent.id}
                    onClick={() => navigate(`/agent/${agent.id}`)}
                    className="cursor-pointer hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 sm:px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full overflow-hidden bg-muted flex items-center justify-center text-xs font-semibold text-foreground">
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
                          <div className="font-medium text-foreground truncate">{agent.name}</div>
                          <div className="font-mono text-xs text-muted-foreground">{truncateAddress(agent.walletAddress)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-3 whitespace-nowrap">
                      <StatusBadge status={agent.status} />
                    </td>
                    <td className="px-4 sm:px-5 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        <span className="font-medium text-foreground tabular-nums">{agent.kyaScore}</span>
                      </span>
                    </td>
                    <td className="px-4 sm:px-5 py-3 min-w-[260px]">
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-sm font-medium text-foreground tabular-nums">{formatUSDC(agent.dailySpend)}</span>
                        <span className="text-xs text-muted-foreground tabular-nums">of {formatUSDC(agent.dailyLimit)}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-3 text-sm text-foreground tabular-nums whitespace-nowrap">
                      {agent.transactionsToday}
                    </td>
                    <td className="px-4 sm:px-5 py-3 whitespace-nowrap">
                      <span
                        className={`text-sm font-medium tabular-nums ${agent.riskTrend > 0 ? "text-destructive" : "text-success"}`}
                      >
                        {agent.riskTrend > 0 ? "↑" : "↓"} {Math.abs(agent.riskTrend)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
