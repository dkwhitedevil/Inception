import { TrustedInferenceClaim } from "../adapters/cortensor/types";

class DecisionEngine {
  private claims: TrustedInferenceClaim[] = [];

  ingestTrustedClaims(claims: TrustedInferenceClaim[]) {
    this.claims.push(...claims);

    // By design, claims are trusted as claims only and do NOT cause actions.
    return {
      decision: "ESCALATE",
      reason: "Agreement engine not active",
    };
  }
}

export const decisionEngine = new DecisionEngine();
