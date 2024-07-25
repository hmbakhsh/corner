import { eq } from "drizzle-orm";
import { db } from "..";
import { corners, type cornerThemeType } from "./schema";

export const getUserCornersModel = async (userId: number) => {
	return await db.select().from(corners).where(eq(corners.user_id, userId));
};

export const createUserCornerModel = async (
	userId: number,
	corner_title: string,
	corner_image: string,
	corner_theme: cornerThemeType,
) => {
	try {
		return await db
			.insert(corners)
			.values({
				user_id: userId,
				corner_title,
				corner_image,
				corner_theme,
			})
			.returning();
	} catch (err) {
		return err;
	}
};
