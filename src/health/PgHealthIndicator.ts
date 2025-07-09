import { AbstractHealthIndicator } from "@actuatorjs/actuatorjs";
import type { HealthResult } from "@actuatorjs/actuatorjs";
import type { Pool } from "pg";
import { checkPgPool } from "./checkPgPool";

export class PgHealthIndicator extends AbstractHealthIndicator {
	private pool: Pool;
	constructor(name: string, pool: Pool) {
		super(name);
		this.pool = pool;
	}
	override async check(): Promise<HealthResult> {
		return await checkPgPool(this.pool);
	}
}
