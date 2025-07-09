import { Pool } from "pg";
import { type HealthResult } from "@actuatorjs/actuatorjs";

export const checkPgPool = async (pool: Pool): Promise<HealthResult> => {
	try {
		await pool.query("SELECT 1");
		return { status: "UP" };
	} catch (error) {
		let errorMessage = "Unknown error";
		if (error instanceof AggregateError) {
			errorMessage = error.errors
				.map((e) => (e instanceof Error ? e.message : String(e)))
				.join("; ");
		} else if (error instanceof Error) {
			errorMessage = error.message || error.toString();
		} else if (typeof error === "string") {
			errorMessage = error;
		} else if (error && typeof error === "object") {
			try {
				errorMessage = JSON.stringify(error);
			} catch {
				errorMessage = String(error);
			}
		} else {
			errorMessage = String(error);
		}
		return {
			status: "DOWN",
			details: { error: errorMessage },
		};
	}
};
