import { useMemo } from "react";
import { agents } from "@/lib/mockData";

/**
 * Resolved guarded smart-account address for an agent (the `from` address for spend / x402-style flows).
 */
export function useAgentWallet(agentId: string | undefined) {
  return useMemo(() => {
    if (!agentId) return { agent: undefined as undefined, walletAddress: undefined as string | undefined };
    const agent = agents.find((a) => a.id === agentId);
    return {
      agent,
      walletAddress: agent?.walletAddress,
      chainLabel: agent?.chainLabel ?? "Base",
    };
  }, [agentId]);
}
