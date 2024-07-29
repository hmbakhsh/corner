import express, { type Request, type Response } from "express";
import { router } from "./router";
import { client } from "./models";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./models/schema";
import bodyParser from "body-parser";
import cors from "cors";
import chalk from "chalk";

const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());
app.use((req: Request, res: Response, next) => {
	console.log(
		`${new Date().toLocaleString()}` +
			chalk.blueBright(` ${req.method} ${req.url}`),
	);
	console.log("Body:", req.body);
	console.log();
	next();
});
app.use(router);

// Initialise DB Connection (Connection String in ./models/index.ts)
await client
	.connect()
	.then(() => {
		console.log(
			new Date().toLocaleString() + chalk.yellow(" Connected to Database"),
		);

		// Start Express web server
		app.listen(PORT, () => {
			console.log(
				new Date().toLocaleString() +
					chalk.green(` Server listening on http://localhost:${PORT}`),
			);
		});
	})
	.catch(() => {
		console.log("Failed to connect to the database!");
	});

const db = drizzle(client, { schema });
export { db };
