import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, Copy, FileJson, Loader2, Mic, Network, Send, XCircle } from "lucide-react";
import { agents } from "@/lib/mockData";
import { parseSplitPolicyJson, type SplitPolicy } from "@/lib/split-policy";
import { mockGuardedVaultFromEns } from "@/lib/ens-guarded-vault-demo";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { chainIdForAddressContext } from "../agent-runtime-helpers";

const DEFAULT_POLICY = `{
  "version": "1",
  "name": "payroll_three_way",
  "chainId": 8453,
  "assetSymbol": "USDC",
  "inboundEnsName": "payroll.alice.enrouteapp.eth",
  "recipients": [
    { "label": "Finance", "address": "0x1111111111111111111111111111111111111111", "weightBps": 2000 },
    { "label": "Management", "address": "0x2222222222222222222222222222222222222222", "weightBps": 2000 },
    { "label": "Operations", "address": "0x3333333333333333333333333333333333333333", "weightBps": 6000 }
  ]
}`;

const TEMPLATES = [
  {
    id: "payroll_three_way",
    title: "payroll_three_way",
    body: "Finance / Management / Operations — same splitPolicySchema, labels vary.",
  },
  {
    id: "dao_buckets",
    title: "dao_buckets",
    body: "Treasury / Grants / Ops — same schema, different recipient labels and addresses.",
  },
  {
    id: "bounty_payout",
    title: "bounty_payout",
    body: "Single asset, several contributor addresses; weightBps must still sum to 10000.",
  },
] as const;

type ChatMessage = { id: string; role: "user" | "assistant"; text: string };

const INTRO_ASSISTANT = `OpenChainGuard routing (EnRoute-style). I will turn your request into a **split policy** (JSON) with \`weightBps\` totaling **10000**. I map ENS to a **guarded vault** (demo address); real flow uses OpenChainGuard policy and ERC-4337 UserOps — the model never holds private keys. Use **Validate** on the policy panel before treating JSON as final. For live LLM + tools, run \`npm run dev\` in the \`agent/\` package.`;

export default function AgentRuntimeWiringPage() {
  const [agentId, setAgentId] = useState(agents[0]?.id ?? "");
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "0", role: "assistant", text: INTRO_ASSISTANT },
  ]);
  const [draft, setDraft] = useState("");
  const [policyJson, setPolicyJson] = useState(DEFAULT_POLICY);
  const [validPolicy, setValidPolicy] = useState<SplitPolicy | null>(() => {
    const r = parseSplitPolicyJson(DEFAULT_POLICY);
    return r.ok ? r.data : null;
  });
  const [validateMessage, setValidateMessage] = useState<string | null>(() => {
    const r = parseSplitPolicyJson(DEFAULT_POLICY);
    if (r.ok) {
      return `OK — "${r.data.name}" is valid for chainId ${r.data.chainId} (${r.data.recipients.length} recipients).`;
    }
    return r.error;
  });
  const [ensInput, setEnsInput] = useState("payroll.alice.enrouteapp.eth");
  const [ensVault, setEnsVault] = useState<`0x${string}` | null>(null);
  const [ensResolving, setEnsResolving] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const selected = agents.find((a) => a.id === agentId) ?? agents[0];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  const runValidate = useCallback(() => {
    const r = parseSplitPolicyJson(policyJson);
    if (r.ok) {
      setValidPolicy(r.data);
      const msg = `OK — "${r.data.name}" is valid for chainId ${r.data.chainId} (${r.data.recipients.length} recipients).`;
      setValidateMessage(msg);
      toast.success("Policy valid", { description: msg });
    } else {
      setValidPolicy(null);
      setValidateMessage(r.error);
      toast.error("Policy validation failed", { description: r.error.slice(0, 200) });
    }
  }, [policyJson]);

  const copyPolicy = async () => {
    try {
      await navigator.clipboard.writeText(policyJson);
      toast.success("JSON copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  const copyVault = async () => {
    if (!ensVault) return;
    try {
      await navigator.clipboard.writeText(ensVault);
      toast.success("Address copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  const resolveEns = async () => {
    const n = ensInput.trim();
    if (!n.includes(".")) {
      toast.error("Not a name", { description: "Use a full name like payroll.alice.enrouteapp.eth" });
      return;
    }
    setEnsResolving(true);
    setEnsVault(null);
    try {
      const v = await mockGuardedVaultFromEns(n);
      setEnsVault(v);
      setValidateMessage(`Resolved ${n} → guarded vault (demo) ${v}. Match with OpenChainGuard in production.`);
    } finally {
      setEnsResolving(false);
    }
  };

  const send = () => {
    const t = draft.trim();
    if (!t) return;
    setDraft("");
    setMessages((m) => [
      ...m,
      { id: `u-${Date.now()}`, role: "user", text: t },
      {
        id: `a-${Date.now()}`,
        role: "assistant",
        text: `Session note: wire this view to the LangChain agent (\`createRoutingAgent\`) to run **validate_split_policy**, **resolve_ens_to_guarded_vault**, and **list_policy_templates** on the server. Edit JSON on the right and click **Validate** to match \`agent/src/schema/split-policy.ts\`.${selected ? ` OpenChainGuard context: ${selected.name} (${selected.walletAddress.slice(0, 10)}…).` : ""}`,
      },
    ]);
  };

  if (!selected) {
    return null;
  }

  return (
    <div className="space-y-4 pb-8 min-h-0">
      <div className="rounded-xl border bg-gradient-to-br from-primary/10 via-background to-background px-4 py-4 sm:px-5 sm:py-5">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Routing</p>
        <h1 className="mt-1 text-xl font-semibold text-foreground">OpenChainGuard routing assistant</h1>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
          EnRoute-style: natural language and tools produce a <strong className="text-foreground/90">split policy JSON</strong> (
          <code className="text-xs">weightBps</code> = 10&nbsp;000). Execution is via policy + ERC-4337 UserOps — not raw EOAs for the
          model. This page mirrors the <code className="text-xs">agent/</code> package: validate JSON, mock ENS → vault, templates.
        </p>
        <div className="mt-4 max-w-sm">
          <Label className="text-[11px] text-muted-foreground">OpenChainGuard agent (signing / worker context)</Label>
          <Select value={agentId} onValueChange={setAgentId}>
            <SelectTrigger className="mt-1.5 h-9 bg-background/80">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {agents.map((a) => (
                <SelectItem key={a.id} value={a.id}>
                  {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="mt-2 font-mono text-[11px] text-muted-foreground break-all">
            {selected.walletAddress} · eip155:{chainIdForAddressContext(selected)} · {selected.chainLabel ?? "Base"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-2 xl:gap-6">
        {/* Session: voice + chat */}
        <Card className="flex min-h-[28rem] flex-col overflow-hidden">
          <CardHeader className="shrink-0 space-y-1 border-b py-3">
            <CardTitle className="text-base">Session (voice + type)</CardTitle>
            <CardDescription>What you would send to the agent CLI or embedded <code className="text-xs">createRoutingAgent</code> worker.</CardDescription>
          </CardHeader>
          <div className="flex flex-col items-center gap-2 border-b py-3">
            <button
              type="button"
              onClick={() => setIsListening((v) => !v)}
              className={cn(
                "relative flex h-24 w-24 items-center justify-center rounded-full",
                "bg-gradient-to-b from-primary/20 to-primary/5 text-primary shadow-md ring-1 ring-border transition-all",
                "hover:from-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isListening && "ring-4 ring-primary/40 scale-[1.02]",
              )}
              aria-pressed={isListening}
              aria-label={isListening ? "Stop" : "Speak"}
            >
              {isListening && <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping [animation-duration:1.4s]" />}
              <Mic className="relative h-10 w-10" strokeWidth={1.5} />
            </button>
            <span className="text-xs text-muted-foreground">{isListening ? "Listening (wire to STT)…" : "Push-to-talk (wire to STT)"}</span>
          </div>
          <div ref={scrollRef} className="min-h-[11rem] flex-1 overflow-y-auto border-b px-3 py-2">
            <div className="space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn("flex gap-2", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  <p
                    className={cn(
                      "max-w-[95%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                      m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted/80 text-foreground",
                    )}
                  >
                    {m.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-3">
            <div className="relative rounded-2xl border bg-muted/20 ring-1 ring-border/60 focus-within:ring-2 focus-within:ring-ring">
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Ask for a split policy, ENS name, or paste requirements…"
                className="min-h-[100px] resize-none border-0 bg-transparent pl-3 pr-14 text-sm"
                rows={3}
              />
              <div className="absolute bottom-2.5 right-2.5">
                <Button type="button" size="icon" className="h-9 w-9 rounded-xl" onClick={send} disabled={!draft.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Policy + tools — mirrors agent tools */}
        <div className="flex min-w-0 flex-col gap-4">
          <Card>
            <CardHeader className="space-y-1 border-b py-3">
              <div className="flex items-center gap-2">
                <FileJson className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">validate_split_policy</CardTitle>
              </div>
              <CardDescription>
                Same schema as <code className="text-xs">agent/src/schema/split-policy.ts</code>. All{" "}
                <code className="text-xs">weightBps</code> must sum to <code className="text-xs">10000</code>.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pt-3">
              <Textarea
                value={policyJson}
                onChange={(e) => {
                  setPolicyJson(e.target.value);
                  setValidPolicy(null);
                }}
                className="min-h-[180px] font-mono text-xs leading-relaxed"
                spellCheck={false}
              />
              <div className="flex flex-wrap gap-2">
                <Button type="button" size="sm" onClick={runValidate}>
                  Validate
                </Button>
                <Button type="button" size="sm" variant="outline" onClick={copyPolicy}>
                  <Copy className="mr-1.5 h-3.5 w-3.5" />
                  Copy JSON
                </Button>
              </div>
              {validateMessage && (
                <div
                  className={cn(
                    "flex gap-2 rounded-md border px-2.5 py-2 text-xs",
                    validPolicy ? "border-primary/30 bg-primary/5 text-foreground" : "border-destructive/30 bg-destructive/5 text-destructive",
                  )}
                >
                  {validPolicy ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <XCircle className="h-4 w-4 shrink-0" />}
                  <pre className="whitespace-pre-wrap break-words font-sans">{validateMessage}</pre>
                </div>
              )}

              {validPolicy && (
                <div className="space-y-2">
                  <Label className="text-[11px] text-muted-foreground">Recipients (bps → %)</Label>
                  {validPolicy.recipients.map((r) => (
                    <div key={r.label + r.address} className="space-y-0.5">
                      <div className="flex justify-between text-xs">
                        <span>
                          {r.label} <span className="text-muted-foreground">({r.weightBps} bps)</span>
                        </span>
                        <span className="tabular-nums">{(r.weightBps / 100).toFixed(2)}%</span>
                      </div>
                      <Progress value={r.weightBps / 100} className="h-1.5" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1 border-b py-3">
              <div className="flex items-center gap-2">
                <Network className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">resolve_ens_to_guarded_vault</CardTitle>
              </div>
              <CardDescription>Mock SHA-256 vault, same as <code className="text-xs">agent/src/tools/routing-tools.ts</code>.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pt-3">
              <Input value={ensInput} onChange={(e) => setEnsInput(e.target.value)} className="font-mono text-sm" />
              <Button type="button" size="sm" onClick={resolveEns} disabled={ensResolving}>
                {ensResolving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                Resolve (demo)
              </Button>
              {ensVault && (
                <div className="flex items-start justify-between gap-2 rounded-md border bg-muted/30 p-2">
                  <code className="break-all text-xs">{ensVault}</code>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={copyVault}>
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1 border-b py-3">
              <CardTitle className="text-base">list_policy_templates</CardTitle>
              <CardDescription>Presets the model can expand into full <code className="text-xs">splitPolicySchema</code> JSON.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-3">
              {TEMPLATES.map((t) => (
                <div key={t.id} className="rounded-lg border border-border/80 bg-muted/20 px-3 py-2">
                  <p className="text-sm font-medium text-foreground">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.body}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
