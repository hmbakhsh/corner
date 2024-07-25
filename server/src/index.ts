import express from "express";
import { router } from "./router";
import { client } from "./models";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./models/schema";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

// Initialise DB Connection (Connection String in ./models/index.ts)
await client.connect();

// Connect to the database
const db = drizzle(client, { schema });
console.log("Database: Successfully connected!");

app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});

export { db };
