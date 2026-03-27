import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { agents, dailyVolumeData, blockedReasonsData, formatUSDC } from "@/lib/mockData";

const PIE_COLORS = [
  'hsl(217, 91%, 50%)',
  'hsl(217, 70%, 65%)',
  'hsl(217, 50%, 75%)',
  'hsl(160, 60%, 40%)',
  'hsl(38, 92%, 50%)',
];

export default function ProtocolStats() {
  const avgKya = Math.round(agents.reduce((s, a) => s + a.kyaScore, 0) / agents.length);
  const tvs = 12400000;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Protocol Stats</h1>
        <p className="text-sm text-muted-foreground">Network-wide analytics</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'TVS', value: formatUSDC(tvs) },
          { label: 'Active Agents', value: agents.filter(a => a.status === 'Active').length },
          { label: 'Transactions Today', value: '171' },
          { label: 'Protocol Fee', value: formatUSDC(34200) },
          { label: 'Avg KYA Score', value: avgKya },
        ].slice(0, 4).map((stat) => (
          <div key={stat.label} className="bg-card rounded-lg border p-4">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{stat.label}</p>
            <p className="text-lg font-semibold text-foreground mt-1 tabular-nums">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-card rounded-lg border p-5">
          <h2 className="text-sm font-medium text-foreground mb-4">Daily Volume (30 days)</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dailyVolumeData}>
              <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => formatUSDC(v)} contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
              <Bar dataKey="approved" stackId="a" fill="hsl(var(--primary))" radius={[0, 0, 0, 0]} />
              <Bar dataKey="blocked" stackId="a" fill="hsl(var(--destructive))" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border p-5">
          <h2 className="text-sm font-medium text-foreground mb-4">Block Reasons</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={blockedReasonsData} cx="50%" cy="50%" outerRadius={80} innerRadius={50} dataKey="value" paddingAngle={3}>
                {blockedReasonsData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {blockedReasonsData.map((r, i) => (
              <div key={r.name} className="flex items-center gap-2 text-[11px]">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: PIE_COLORS[i] }} />
                <span className="text-muted-foreground truncate">{r.name}</span>
                <span className="ml-auto font-medium text-foreground">{r.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
