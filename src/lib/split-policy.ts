import { z } from "zod";

/** Basis points: 10_000 = 100%. Mirrors `agent/src/schema/split-policy.ts`. */
export const recipientSchema = z.object({
  label: z.string().min(1),
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Each address must be 0x-prefixed 40 hex chars"),
  weightBps: z.number().int().min(1).max(10_000),
});

export const splitPolicySchema = z
  .object({
    version: z.literal("1"),
    name: z.string().min(1),
    chainId: z.number().int().positive(),
    assetSymbol: z.string().min(1),
    assetAddress: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/)
      .optional(),
    inboundEnsName: z.string().min(1).optional(),
    recipients: z.array(recipientSchema).min(1),
  })
  .strict()
  .superRefine((data, ctx) => {
    const sum = data.recipients.reduce((s, r) => s + r.weightBps, 0);
    if (sum !== 10_000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Recipient weightBps must sum to 10000 (100%); got ${sum}.`,
      });
    }
  });

export type SplitPolicy = z.infer<typeof splitPolicySchema>;
export type PolicyRecipient = z.infer<typeof recipientSchema>;

export function parseSplitPolicyJson(json: string): { ok: true; data: SplitPolicy } | { ok: false; error: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json) as unknown;
  } catch {
    return { ok: false, error: "Invalid JSON" };
  }
  const result = splitPolicySchema.safeParse(parsed);
  if (!result.success) {
    const lines = result.error.issues.map((i) => `${i.path.join(".") || "policy"}: ${i.message}`);
    return { ok: false, error: lines.join("\n") };
  }
  return { ok: true, data: result.data };
}
