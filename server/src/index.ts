import express from "express";
import { router } from "./router";
import { client } from "./models";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./models/schema";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(router);

// Initialise DB Connection (Connection String in ./models/index.ts)
await client
	.connect()
	.then(() => {
		console.log("Database: Successfully connected!");

		// Start Express web server
		app.listen(PORT, () => {
			console.log(`Server listening on http://localhost:${PORT}`);
		});
	})
	.catch(() => {
		console.log("Failed to connect to the database!");
	});

const db = drizzle(client, { schema });
export { db };
