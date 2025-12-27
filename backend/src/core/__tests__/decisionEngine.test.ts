import { test, expect } from "vitest";
import { decisionEngine } from "../decisionEngine";
import type { TrustedInferenceClaim } from "../../adapters/cortensor/types";

test("ingestTrustedClaims returns ESCALATE and accepts claims", () => {
  const claims: TrustedInferenceClaim[] = [
    {
      kind: "TrustedInferenceClaim",
      source: "cortensor",
      miner: "n1",
      output: "ok",
      authenticated: true,
      provenance: { sessionId: 1, taskId: 1, network: "cortensor" },
      receivedAt: Date.now(),
    },
  ];

  const res = decisionEngine.ingestTrustedClaims(claims);

  expect(res.decision).toBe("ESCALATE");
  expect(res.reason).toMatch(/Agreement engine not active/);
});
