import app from "./server";
import { PORT } from "./utils/env";

app.listen(PORT, () => console.log(`Backend running on :${PORT}`));
