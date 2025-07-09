import { Pool } from "pg";

export const pool: Pool = new Pool({
	host: "localhost",
	port: 5432,
	user: "user",
	password: "pass",
	database: "db",
});
