import { SessionQueueV2 } from "./client";
import { TrustedInferenceClaim } from "./types";

type ClaimHandler = (claims: TrustedInferenceClaim[]) => void;

export function listenForTrustedClaims(handler: ClaimHandler) {
  SessionQueueV2.on("TaskEnded", async (sessionId: any, taskId: any) => {
    const [miners, outputs] = await SessionQueueV2.getTaskResults(sessionId, taskId);

    const claims: TrustedInferenceClaim[] = miners.map((miner: string, i: number) => ({
      kind: "TrustedInferenceClaim",
      source: "cortensor",
      miner,
      output: outputs[i],
      authenticated: true,
      provenance: {
        sessionId: Number(sessionId),
        taskId: Number(taskId),
        network: "cortensor",
      },
      receivedAt: Date.now(),
    }));

    handler(claims);
  });
}
