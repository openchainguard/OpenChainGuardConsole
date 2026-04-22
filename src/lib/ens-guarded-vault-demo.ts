/**
 * Same mock as `agent/src/tools/routing-tools.ts` — SHA-256 of `vault:${name}` → 0x + 40 hex.
 * Used to preview ENS → “guarded vault” without on-chain resolution.
 */
export async function mockGuardedVaultFromEns(ensName: string): Promise<`0x${string}`> {
  const name = ensName.trim().toLowerCase();
  const input = `vault:${name}`;
  const enc = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  const hex = Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 40);
  return `0x${hex}` as const;
}
