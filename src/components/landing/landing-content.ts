import type { LucideIcon } from "lucide-react";
import { Shield, Layers, Cpu, Lock } from "lucide-react";

export const stats = [
  { label: "Agents governed", value: "4.2K+", sub: "on testnets" },
  { label: "Policy decisions", value: "12M+", sub: "last 30 days" },
  { label: "Protocols integrated", value: "180+", sub: "and growing" },
  { label: "Median review time", value: "< 2m", sub: "human-in-the-loop" },
] as const;

export const pillars: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Shield,
    title: "On-chain governance",
    body: "Bind agent behavior to policy modules, multisig approvals, and audit trails that match how serious teams ship.",
  },
  {
    icon: Layers,
    title: "Standards-ready",
    body: "Designed around ERC-4337 flows and ERC-8004 identity signals so your agents interoperate with the wider ecosystem.",
  },
  {
    icon: Cpu,
    title: "Operator console",
    body: "A single place to supervise agents, review escalations, and freeze risk before it hits production treasury.",
  },
  {
    icon: Lock,
    title: "Defense in depth",
    body: "Circuit breakers, spend limits, and policy checks that stack—because one guardrail is never enough.",
  },
];

export const steps = [
  { n: "01", title: "Connect & register", text: "Link wallets and register agents with controller and policy contracts." },
  { n: "02", title: "Define policy", text: "Set limits, allowlists, and review rules aligned to your risk model." },
  { n: "03", title: "Monitor & act", text: "Use the console for live decisions, audits, and protocol-wide stats." },
] as const;

export const trustLabels = ["Base", "Ethereum", "ERC-4337", "ERC-8004", "Account abstraction", "KYA registry"] as const;

export const PROTOCOL_DIAGRAM_IMAGE = "/685d5a5d6502b00adff0eb8b_home-image-chainlink-platform.avif";

export const resourceItems = [
  {
    title: "What is agent governance?",
    desc: "A concise overview of policy modules, controllers, and human-in-the-loop approvals.",
    href: "#protocol",
  },
  {
    title: "ERC-8004 and identity signals",
    desc: "How reputation and validation registries strengthen agent risk scoring.",
    href: "#protocol",
  },
  {
    title: "Launch checklist for operators",
    desc: "Register agents, set spend limits, and wire multisig before going live.",
    href: "#developers",
  },
] as const;
