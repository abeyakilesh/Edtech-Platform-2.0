import app from "./app.js";
import { connectDB, dbState } from "./config/db.js";
import { env } from "./config/env.js";

await connectDB();

app.listen(env.port, () => {
  console.log(`EduCore API running on http://localhost:${env.port} (${dbState.mode} mode)`);
});
