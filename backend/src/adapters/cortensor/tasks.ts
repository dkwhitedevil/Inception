import { SessionV2 } from "./client";

export async function submitInference(sessionId: number, payload: unknown) {
  const tx = await SessionV2.submit(
    sessionId,
    0,
    JSON.stringify(payload),
    0,
    "",
    [1024, 1, 1, 1, 0, 0],
    `inception-${Date.now()}`
  );

  await tx.wait();
}
