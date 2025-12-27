const ethers = require("ethers");
import SessionV2ABI from "./abi/SessionV2.json";
import SessionQueueV2ABI from "./abi/SessionQueueV2.json";

const RPC = process.env.CORTENSOR_RPC!;
const PRIVATE_KEY = process.env.CORTENSOR_PRIVATE_KEY!;
const SESSION_V2 = process.env.SESSION_V2_ADDRESS!;
const QUEUE_V2 = process.env.SESSION_QUEUE_V2_ADDRESS!;

export const provider = new ethers.WebSocketProvider(RPC.replace("https", "wss"));

export const signer = new ethers.Wallet(PRIVATE_KEY, provider);

export const SessionV2 = new ethers.Contract(SESSION_V2, SessionV2ABI, signer);

export const SessionQueueV2 = new ethers.Contract(QUEUE_V2, SessionQueueV2ABI, provider);
