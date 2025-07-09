import express, { type Request, type Response } from "express";
import {
  Actuator,
  HealthCheck,
  SimpleHealthIndicator,
} from "@actuatorjs/actuatorjs";
import { checkPgPool } from "./src/health/checkPgPool";
import { pool } from "./src/config/pg";
import { PgHealthIndicator } from "./src/health/PgHealthIndicator";

export const pgHealthIndicator = new PgHealthIndicator(
  "abstract-postgres",
  pool,
);

export const simplePgHealthIndicator = new SimpleHealthIndicator(
  "simple-postgres",
  async () => {
    return await checkPgPool(pool);
  },
);

export const healthCheck = new HealthCheck([
  pgHealthIndicator,
  simplePgHealthIndicator,
]);

export const actuator = new Actuator(healthCheck);

const app = express();
const PORT = 3000;

app.get("/actuator/health", async (_req: Request, res: Response) => {
  try {
    const health = await actuator.getHealth();
    res.json(health);
  } catch (err) {
    console.error("Failed to get health:", err);
    res.status(500).json({ status: "DOWN", error: String(err) });
  }
});

app.get("/actuator/info", async (_req: Request, res: Response) => {
  try {
    const info = await actuator.getInfo();
    res.json(info);
  } catch (err) {
    console.error("Failed to get info:", err);
    res.status(500).json({ status: "DOWN", error: String(err) });
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
