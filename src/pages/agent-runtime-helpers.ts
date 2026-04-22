import type { Agent } from "@/lib/mockData";

const BASE_MAINNET = "8453";
const BASE_SEPOLIA = "84532";

export function chainIdForAddressContext(agent: Agent): string {
  const l = (agent.chainLabel ?? "").toLowerCase();
  if (l.includes("sepolia")) return BASE_SEPOLIA;
  return BASE_MAINNET;
}
