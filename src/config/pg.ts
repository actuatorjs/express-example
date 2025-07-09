import { Pool } from "pg";
import * as process from "node:process";

export const pool: Pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  user: "user",
  password: "pass",
  database: "db",
});
