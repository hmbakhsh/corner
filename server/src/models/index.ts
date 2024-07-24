import { Client } from "pg";

const client = new Client({
	connectionString: "postgres://localhost:5432/corner_local",
});

export { client };
