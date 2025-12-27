import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import escrowRouter from "./routes/escrow";
import validateRouter from "./api/validate.controller";
import testRouter from "./routes/test";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => res.json({ ok: true }));

app.use("/auth", authRouter);
app.use("/", escrowRouter);
app.use("/validate", validateRouter);
app.use("/test", testRouter);

export default app;
