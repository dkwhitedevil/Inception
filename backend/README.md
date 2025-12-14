# Inception — Backend

Minimal backend to start development quickly.

Prereqs: Node.js >= 18

Install dependencies:

```bash
cd backend
npm install
cp .env.example .env
# edit .env if necessary
npm run dev
```

Endpoints:
- `GET /health` — health check
- `POST /infer-escrow` — dummy escrow decision (body: `{ prompt: string }`)

Replace the placeholder auth and Cortensor integration with real services when ready.
