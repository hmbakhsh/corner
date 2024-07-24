import express from "express";
import { router } from "./router";
import { client } from "./models";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import * as schema from "./models/schema";

const app = express();
const PORT = 3000;

// let db: NodePgDatabase<Record<string, never>>;
let db: any;

try {
	// Initialise DB Connection (Connection String in ./models/index.ts)
	await client.connect();

	// Connect to the database
	db = drizzle(client, { schema });
	console.log("Successfully connected!");
} catch (err) {
	console.log(`Failed to connect to/migrate the databse -> ${err}`);
}

app.use(router);

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});

export { db };
