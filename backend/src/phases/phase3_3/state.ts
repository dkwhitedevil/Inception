export type AgreementState =
  | "COLLECTING"
  | "INSUFFICIENT_CLAIMS"
  | "CONFLICT_DETECTED"
  | "AGREED"
  | "ESCALATED";

export function deriveState(
  decision: "BLOCK" | "ESCALATE" | "RELEASE"
): AgreementState {
  switch (decision) {
    case "RELEASE":
      return "AGREED";
    case "ESCALATE":
      return "ESCALATED";
    case "BLOCK":
      return "CONFLICT_DETECTED";
  }
}
