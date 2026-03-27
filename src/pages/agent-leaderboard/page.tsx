import { agents, formatUSDC } from "@/lib/mockData";

const getAvatarUrl = (seed: string) =>
  `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear`;

export default function AgentLeaderboard() {
  const sorted = [...agents].sort((a, b) => b.kyaScore - a.kyaScore);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Agent Leaderboard</h1>
        <p className="text-sm text-muted-foreground">Top agents by governance performance signals.</p>
      </div>

      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                {["Rank", "Agent", "KYA Score", "TVS", "Block Rate"].map((h) => (
                  <th key={h} className="text-left px-4 sm:px-5 py-2.5 text-[11px] font-medium text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {sorted.map((agent, i) => {
                const initials = agent.name
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((s) => s[0]?.toUpperCase())
                  .join("");
                const avatarUrl = getAvatarUrl(agent.id);

                return (
                  <tr key={agent.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 sm:px-5 py-3 text-xs font-medium text-muted-foreground">#{i + 1}</td>
                    <td className="px-4 sm:px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full overflow-hidden bg-muted flex items-center justify-center text-xs font-semibold text-foreground">
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
                        <span className="text-sm font-medium text-foreground">{agent.name}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground tabular-nums">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        {agent.kyaScore}
                      </span>
                    </td>
                    <td className="px-4 sm:px-5 py-3 text-sm text-foreground tabular-nums">{formatUSDC(agent.dailyLimit * 30)}</td>
                    <td className="px-4 sm:px-5 py-3 text-sm text-muted-foreground tabular-nums">
                      {(Math.random() * 5).toFixed(1)}%
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

