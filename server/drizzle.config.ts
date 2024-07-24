import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/models/schema.ts",
	out: "./drizzle/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: "postgres://localhost:5432/corner_local",
	},
	verbose: true,
	strict: true,
});
