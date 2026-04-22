import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Loader2,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const wizardSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  identityUrl: z.preprocess(
    (v) => (v === "" || v === undefined ? undefined : v),
    z.string().url().optional()
  ),
  chain: z.enum(["base-sepolia", "base"]),
  dailyLimit: z.number().min(1000),
  singleTxMax: z.number().min(100),
  circuitBreakerPct: z.number().min(1).max(50),
  hitlEnabled: z.boolean(),
  hitlThresholdUsd: z.number().min(0),
});

export type WizardFormValues = z.infer<typeof wizardSchema>;

const STEPS = [
  "Basics",
  "Network",
  "Policy",
  "Automation",
  "Review",
  "Provision",
] as const;

function generateMockWalletAddress(seed: string) {
  const hex = Array.from(seed + Date.now().toString())
    .reduce((acc, c) => acc + c.charCodeAt(0), 0)
    .toString(16)
    .padStart(40, "0")
    .slice(0, 40);
  return `0x${hex}`;
}

const defaultFormValues: WizardFormValues = {
  name: "",
  description: "",
  identityUrl: "",
  chain: "base-sepolia",
  dailyLimit: 100_000,
  singleTxMax: 25_000,
  circuitBreakerPct: 5,
  hitlEnabled: true,
  hitlThresholdUsd: 10_000,
};

export interface AgentSetupWizardProps {
  open: boolean;
  onClose: () => void;
}

export function AgentSetupWizard({ open, onClose }: AgentSetupWizardProps) {
  const [step, setStep] = useState(0);
  const [provisionState, setProvisionState] = useState<"idle" | "running" | "done">("idle");
  const [provisionedAddress, setProvisionedAddress] = useState<string | null>(null);

  const form = useForm<WizardFormValues>({
    resolver: zodResolver(wizardSchema),
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setProvisionState("idle");
    setProvisionedAddress(null);
    form.reset(defaultFormValues);
  }, [open, form.reset]);

  const values = form.watch();

  const next = async () => {
    if (step === 0) {
      const ok = await form.trigger(["name"]);
      if (!ok) return;
    }
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const back = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const runProvision = async () => {
    setProvisionState("running");
    await new Promise((r) => setTimeout(r, 1800));
    const addr = generateMockWalletAddress(values.name || "agent");
    setProvisionedAddress(addr);
    setProvisionState("done");
    toast.success("Guarded wallet provisioned", {
      description: "Policy and Gatekeeper are bound to this account.",
    });
  };

  const copyAddr = () => {
    if (provisionedAddress) {
      void navigator.clipboard.writeText(provisionedAddress);
      toast.info("Address copied");
    }
  };

  const snippet = provisionedAddress
    ? `OPENCHAINGUARD_AGENT_WALLET=${provisionedAddress}
OPENCHAINGUARD_CHAIN=${values.chain === "base" ? "8453" : "84532"}
# Use as \`from\` for UserOps / x402-style paid calls`
    : "";

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) onClose(); }}>
      <DialogContent
        className={cn(
          "gap-0 p-0 shadow-lg",
          "!flex !h-[min(88dvh,760px)] !max-h-[min(88dvh,760px)] !w-[min(calc(100vw-1rem),42rem)] flex-col overflow-hidden",
          "max-w-2xl border-0 bg-background shadow-2xl sm:rounded-lg",
        )}
      >
        <DialogHeader className="shrink-0 space-y-0 px-4 pb-4 pt-5 text-left sm:px-6 sm:pb-5 sm:pt-6 pr-12 sm:pr-14">
          <DialogTitle className="text-lg leading-snug sm:text-xl">Create agent</DialogTitle>
          <DialogDescription className="sr-only">
            Multi-step form to configure and provision a new governed agent wallet.
          </DialogDescription>
        </DialogHeader>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="shrink-0 bg-muted/20 px-4 py-2.5 sm:px-6">
            <div className="flex flex-wrap gap-1.5">
              {STEPS.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  disabled={i > step}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors sm:px-3 sm:text-xs",
                    i === step
                      ? "bg-primary text-primary-foreground"
                      : i < step
                        ? "bg-muted text-foreground hover:bg-muted/80"
                        : "bg-muted/40 text-muted-foreground",
                  )}
                >
                  {i + 1}. {label}
                </button>
              ))}
            </div>
          </div>

          <div className="scrollbar-seamless min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3 sm:px-6 sm:py-4">
            <Card className="border-0 bg-transparent shadow-none">
              <CardHeader className="space-y-1 px-4 pb-3 pt-4 sm:px-6">
                <CardTitle className="text-base">{STEPS[step]}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
            {step === 0 && "Name your agent and optionally link ERC-8004 identity metadata."}
            {step === 1 && "Choose where this wallet will execute."}
            {step === 2 && "Spend limits and circuit breaker — enforced on-chain."}
            {step === 3 && "Human approval for high-value operations."}
            {step === 4 && "Confirm before deployment."}
            {step === 5 && "Factory deploys your guarded account."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-4 pb-4 pt-0 sm:px-6 sm:pb-5">
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Agent name</Label>
                <Input id="name" className="mt-1.5" placeholder="e.g. Treasury Alpha" {...form.register("name")} />
                {form.formState.errors.name && (
                  <p className="text-xs text-destructive mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" className="mt-1.5 min-h-[64px] resize-y max-h-40" placeholder="What this agent does" {...form.register("description")} />
              </div>
              <div>
                <Label htmlFor="identityUrl">AgentCard / identity URL (optional)</Label>
                <Input id="identityUrl" className="mt-1.5" placeholder="https://ipfs… or registry link" {...form.register("identityUrl")} />
              </div>
            </div>
          )}

          {step === 1 && (
            <RadioGroup
              value={values.chain}
              onValueChange={(v) => form.setValue("chain", v as WizardFormValues["chain"])}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 rounded-lg bg-muted/40 p-3 sm:p-4">
                <RadioGroupItem value="base-sepolia" id="base-sepolia" />
                <Label htmlFor="base-sepolia" className="min-w-0 flex-1 cursor-pointer">
                  <span className="font-medium">Base Sepolia</span>
                  <span className="block text-xs text-muted-foreground">Testnet — recommended for development</span>
                </Label>
              </div>
              <div className="flex items-center space-x-3 rounded-lg bg-muted/40 p-3 sm:p-4">
                <RadioGroupItem value="base" id="base" />
                <Label htmlFor="base" className="min-w-0 flex-1 cursor-pointer">
                  <span className="font-medium">Base Mainnet</span>
                  <span className="block text-xs text-muted-foreground">Production — real funds</span>
                </Label>
              </div>
            </RadioGroup>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm">
                  <Label>Daily limit (USD)</Label>
                  <span className="tabular-nums text-muted-foreground">{values.dailyLimit.toLocaleString()}</span>
                </div>
                <Slider
                  className="mt-3"
                  min={5000}
                  max={500_000}
                  step={1000}
                  value={[values.dailyLimit]}
                  onValueChange={([v]) => form.setValue("dailyLimit", v)}
                />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <Label>Max per transaction (USD)</Label>
                  <span className="tabular-nums text-muted-foreground">{values.singleTxMax.toLocaleString()}</span>
                </div>
                <Slider
                  className="mt-3"
                  min={1000}
                  max={100_000}
                  step={500}
                  value={[values.singleTxMax]}
                  onValueChange={([v]) => form.setValue("singleTxMax", v)}
                />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <Label>Circuit breaker (% wallet per hour)</Label>
                  <span className="tabular-nums text-muted-foreground">{values.circuitBreakerPct}%</span>
                </div>
                <Slider
                  className="mt-3"
                  min={1}
                  max={25}
                  step={1}
                  value={[values.circuitBreakerPct]}
                  onValueChange={([v]) => form.setValue("circuitBreakerPct", v)}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-muted/40 p-4">
                <div>
                  <div className="font-medium">Human-in-the-loop</div>
                  <div className="text-xs text-muted-foreground">Queue txs above threshold for approval</div>
                </div>
                <Switch checked={values.hitlEnabled} onCheckedChange={(v) => form.setValue("hitlEnabled", v)} />
              </div>
              {values.hitlEnabled && (
                <div>
                  <Label>Escalation threshold (USD)</Label>
                  <Input
                    type="number"
                    className="mt-1.5"
                    {...form.register("hitlThresholdUsd", { valueAsNumber: true })}
                  />
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="rounded-lg border bg-muted/30 p-3 text-sm space-y-3 sm:p-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                <span className="text-muted-foreground shrink-0">Name</span>
                <span className="min-w-0 font-medium sm:text-right break-words">{values.name}</span>
              </div>
              <Separator />
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                <span className="text-muted-foreground">Chain</span>
                <span className="font-medium sm:text-right">{values.chain === "base" ? "Base" : "Base Sepolia"}</span>
              </div>
              <Separator />
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                <span className="text-muted-foreground shrink-0">Daily / single-tx limit</span>
                <span className="min-w-0 font-medium tabular-nums sm:text-right break-words">
                  ${values.dailyLimit.toLocaleString()} / ${values.singleTxMax.toLocaleString()}
                </span>
              </div>
              <Separator />
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                <span className="text-muted-foreground">Circuit breaker</span>
                <span className="font-medium sm:text-right">{values.circuitBreakerPct}%</span>
              </div>
              <Separator />
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                <span className="text-muted-foreground">HITL</span>
                <span className="min-w-0 font-medium sm:text-right break-words">
                  {values.hitlEnabled ? `Above $${values.hitlThresholdUsd.toLocaleString()}` : "Off"}
                </span>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              {provisionState === "idle" && (
                <div className="space-y-4">
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    This will deploy the ERC-4337 smart account, bind <code className="break-all rounded bg-muted px-1 py-0.5 text-[10px] sm:text-xs">PolicyModule</code> and{" "}
                    <code className="break-all rounded bg-muted px-1 py-0.5 text-[10px] sm:text-xs">GatekeeperModule</code>, and register KYA linkage (demo simulates on-chain steps).
                  </p>
                  <div className="flex justify-center sm:justify-start">
                    <Button type="button" className="h-10 w-fit min-w-0 shrink-0 px-6 whitespace-nowrap" onClick={() => void runProvision()}>
                      Start provisioning
                    </Button>
                  </div>
                </div>
              )}
              {provisionState === "running" && (
                <div className="flex items-center gap-3 text-sm text-muted-foreground py-8 justify-center">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Provisioning guarded wallet…
                </div>
              )}
              {provisionState === "done" && provisionedAddress && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 rounded-lg bg-primary/10 p-4">
                    <Wallet className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-foreground">Guarded wallet address</div>
                      <div className="font-mono text-xs break-all mt-1 text-foreground">{provisionedAddress}</div>
                      <Button variant="outline" size="sm" className="mt-3 gap-1" onClick={copyAddr}>
                        <Copy className="h-3.5 w-3.5" /> Copy
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground sm:text-sm">
                    Copy the env block to the host that runs your agent.{" "}
                    <Link
                      to="/docs/agent-runtime"
                      onClick={onClose}
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      How this works
                    </Link>
                  </p>
                  <div>
                    <Label className="text-xs text-muted-foreground">Runtime env</Label>
                    <pre className="scrollbar-seamless mt-1.5 max-h-32 overflow-y-auto rounded-lg bg-muted p-3 text-[10px] leading-snug whitespace-pre-wrap break-all sm:text-[11px]">{snippet}</pre>
                  </div>
                  <Button className="w-full gap-2" onClick={onClose}>
                    <Check className="h-4 w-4" /> Done — go to agents
                  </Button>
                </div>
              )}
            </div>
          )}

          {step < 5 && (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <Button type="button" variant="outline" size="sm" className="shrink-0" onClick={back} disabled={step === 0}>
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              {step < 4 ? (
                <Button type="button" size="sm" className="shrink-0" onClick={() => void next()}>
                  Next <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              ) : step === 4 ? (
                <Button type="button" size="sm" className="shrink-0" onClick={() => setStep(5)}>
                  Deploy <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              ) : null}
            </div>
          )}

              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
