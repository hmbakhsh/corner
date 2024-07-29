import { and, eq } from "drizzle-orm";
import { db } from "..";
import {
	embedPrimitives,
	imagePrimitives,
	linkPrimitives,
	primitives,
	shapePrimitives,
	textPrimitives,
	type newEmbedPrimitiveType,
	type newImagePrimitiveType,
	type newLinkPrimitiveType,
	type newShapePrimitiveType,
	type newTextPrimitiveType,
	type primitiveTypeType,
} from "./schema";
import type { updateObjectType } from "../controllers/primitiveControllers";

// Get All Primitives for a User's Corner
// Params: User_Id, Corner_Id
export const getUserCornerPrimitivesModel = async (
	user_id: number,
	corner_id: number,
) => {
	const cornerTextPrimitives = await db
		.select()
		.from(primitives)
		.where(
			and(
				eq(primitives.corner_id, corner_id),
				eq(primitives.primitive_type, "text"),
			),
		)
		.leftJoin(textPrimitives, eq(primitives.id, textPrimitives.primitive_id));

	const cornerShapePrimitives = await db
		.select()
		.from(primitives)
		.where(
			and(
				eq(primitives.corner_id, corner_id),
				eq(primitives.primitive_type, "shape"),
			),
		)
		.leftJoin(shapePrimitives, eq(primitives.id, shapePrimitives.primitive_id));
	const cornerImagePrimitives = await db
		.select()
		.from(primitives)
		.where(
			and(
				eq(primitives.corner_id, corner_id),
				eq(primitives.primitive_type, "image"),
			),
		)
		.leftJoin(imagePrimitives, eq(primitives.id, imagePrimitives.primitive_id));

	const cornerLinkPrimitives = await db
		.select()
		.from(primitives)
		.where(
			and(
				eq(primitives.corner_id, corner_id),
				eq(primitives.primitive_type, "link"),
			),
		)
		.leftJoin(linkPrimitives, eq(primitives.id, linkPrimitives.primitive_id));

	const cornerEmbedPrimitives = await db
		.select()
		.from(primitives)
		.where(
			and(
				eq(primitives.corner_id, corner_id),
				eq(primitives.primitive_type, "embed"),
			),
		)
		.leftJoin(embedPrimitives, eq(primitives.id, embedPrimitives.primitive_id));

	return [
		...cornerTextPrimitives,
		...cornerShapePrimitives,
		...cornerImagePrimitives,
		...cornerLinkPrimitives,
		...cornerEmbedPrimitives,
	];
};

export const createPrimitiveModel = async (
	corner_id: string,
	width: number,
	height: number,
	primitiveSpecificData:
		| (newTextPrimitiveType & { type: "text" })
		| (newShapePrimitiveType & { type: "shape" })
		| (newImagePrimitiveType & { type: "image" })
		| (newLinkPrimitiveType & { type: "link" })
		| (newEmbedPrimitiveType & { type: "embed" }),
) => {
	try {
		const result = await db.transaction(async (trx) => {
			const [newPrimitive] = await trx
				.insert(primitives)
				.values({
					corner_id: Number(corner_id),
					primitive_type: primitiveSpecificData.type,
					width,
					height,
				})
				.returning();

			switch (primitiveSpecificData.type) {
				case "text": {
					await trx
						.insert(textPrimitives)
						.values({
							primitive_id: newPrimitive.id,
							text_content: primitiveSpecificData.text_content,
							text_colour: primitiveSpecificData.text_colour,
						})
						.returning();
					break;
				}
				case "shape": {
					await trx.insert(shapePrimitives).values({
						primitive_id: newPrimitive.id,
						shape_type: primitiveSpecificData.shape_type,
						shape_colour: primitiveSpecificData.shape_colour,
					});
					break;
				}
				case "image": {
					await trx.insert(imagePrimitives).values({
						primitive_id: newPrimitive.id,
						image_url: primitiveSpecificData.image_url,
					});
					break;
				}
				case "link": {
					await trx.insert(linkPrimitives).values({
						primitive_id: newPrimitive.id,
						link_title: primitiveSpecificData.link_title,
						link_url: primitiveSpecificData.link_url,
					});
					break;
				}
				case "embed": {
					await trx.insert(embedPrimitives).values({
						primitive_id: newPrimitive.id,
						embed_type: primitiveSpecificData.embed_type,
						embed_url: primitiveSpecificData.embed_url,
					});
					break;
				}
				default:
					throw new Error(
						"primitiveModels.ts: Passed unsupported primitive type",
					);
			}
			return newPrimitive;
		});

		switch (result.primitive_type) {
			case "text": {
				const newTextPrimitiveData = await db
					.select()
					.from(primitives)
					.where(eq(primitives.id, result.id))
					.leftJoin(textPrimitives, eq(textPrimitives.primitive_id, result.id));
				return newTextPrimitiveData[0];
			}
			case "shape": {
				const newShapePrimitiveData = await db
					.select()
					.from(primitives)
					.where(eq(primitives.id, result.id))
					.leftJoin(
						shapePrimitives,
						eq(shapePrimitives.primitive_id, result.id),
					);
				return newShapePrimitiveData[0];
			}
			case "image": {
				const newImagePrimitiveData = await db
					.select()
					.from(primitives)
					.where(eq(primitives.id, result.id))
					.leftJoin(
						imagePrimitives,
						eq(imagePrimitives.primitive_id, result.id),
					);
				return newImagePrimitiveData[0];
			}
			case "link": {
				const newLinkPrimitiveData = await db
					.select()
					.from(primitives)
					.where(eq(primitives.id, result.id))
					.leftJoin(linkPrimitives, eq(linkPrimitives.primitive_id, result.id));
				return newLinkPrimitiveData[0];
			}
			case "embed": {
				const newEmbedPrimitiveData = await db
					.select()
					.from(primitives)
					.where(eq(primitives.id, result.id))
					.leftJoin(
						embedPrimitives,
						eq(embedPrimitives.primitive_id, result.id),
					);
				return newEmbedPrimitiveData[0];
			}
		}
	} catch (err) {
		// !  Improve this error message
		console.error("Failed to post to the database", err);
		throw err;
	}
};

export const updatePrimitiveModel = async (
	userId: number,
	cornerId: number,
	primitiveId: number,
	updateObject: updateObjectType,
	operationType: string,
	type: string,
) => {
	console.log(updateObject);
	try {
		if (operationType === "primitive") {
			await db
				.update(primitives)
				.set(updateObject)
				.where(eq(primitives.id, primitiveId));
		} else if (type === "text") {
			await db
				.update(textPrimitives)
				.set(updateObject)
				.where(eq(textPrimitives.primitive_id, primitiveId));
		} else if (type === "shape") {
			await db
				.update(shapePrimitives)
				.set(updateObject)
				.where(eq(shapePrimitives.primitive_id, primitiveId));
		} else if (type === "image") {
			await db
				.update(imagePrimitives)
				.set(updateObject)
				.where(eq(imagePrimitives.primitive_id, primitiveId));
		} else if (type === "link") {
			await db
				.update(linkPrimitives)
				.set(updateObject)
				.where(eq(linkPrimitives.primitive_id, primitiveId));
		} else if (type === "embed") {
			await db
				.update(embedPrimitives)
				.set(updateObject)
				.where(eq(embedPrimitives, primitiveId));
		}
	} catch (err) {
		console.error(err);
	}
};
