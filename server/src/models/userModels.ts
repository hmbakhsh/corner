import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "./schema";

export const getUsersModel = async () => {
	return await db.select().from(users);
};

export const createUserModel = async (
	username: string,
	email: string,
	password_hash: string,
) => {
	return await db
		.insert(users)
		.values({
			username,
			email,
			password_hash,
		})
		.returning();
};

export const getUserModel = async (userId: number) => {
	return await db.select().from(users).where(eq(users.id, userId));
};
