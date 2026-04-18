import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { agents, formatUSDC } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReputationPage() {
  const avgKya = Math.round(agents.reduce((s, a) => s + a.kyaScore, 0) / agents.length);
  const avgRep = Math.round(agents.reduce((s, a) => s + a.reputationScore, 0) / agents.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Reputation</h1>
        <p className="text-sm text-muted-foreground mt-1">
          ERC-8004 signals and KYA rollup for agents under OpenChainGuard.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Org KYA (avg)
            </CardTitle>
            <CardDescription>Across {agents.length} agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tabular-nums">{avgKya}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Reputation (avg)</CardTitle>
            <CardDescription>Registry-attested scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tabular-nums">{avgRep}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Deeper analytics</CardTitle>
          <CardDescription>Volume, block reasons, and leaderboards.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link to="/stats">
              Protocol stats <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/leaderboard">
              Agent leaderboard <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-sm font-medium text-foreground mb-2">Agents</h2>
        <ul className="rounded-lg border divide-y">
          {agents.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
              <Link to={`/agents/${a.id}`} className="font-medium text-primary hover:underline truncate">
                {a.name}
              </Link>
              <span className="text-muted-foreground tabular-nums shrink-0">
                KYA {a.kyaScore} · Rep {a.reputationScore} · {formatUSDC(a.dailySpend)} today
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
