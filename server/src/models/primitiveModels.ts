import { eq } from "drizzle-orm";
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

export const getUserCornerPrimitivesModel = async (
	user_id: number,
	corner_id: number,
) => {
	return await db
		.select()
		.from(primitives)
		.where(eq(primitives.corner_id, corner_id))
		.leftJoin(textPrimitives, eq(primitives.id, textPrimitives.primitive_id));
};

export const createPrimitiveModel = async (
	corner_id: string,
	// primitive_type: primitiveTypeType,
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
				case "text":
					await trx.insert(textPrimitives).values({
						primitive_id: newPrimitive.id,
						text_content: primitiveSpecificData.text_content,
						text_colour: primitiveSpecificData.text_colour,
					});
					break;
				case "shape":
					await trx.insert(shapePrimitives).values({
						primitive_id: newPrimitive.id,
						shape_type: primitiveSpecificData.shape_type,
						shape_colour: primitiveSpecificData.shape_colour,
					});
					break;
				case "image":
					await trx.insert(imagePrimitives).values({
						primitive_id: newPrimitive.id,
						image_url: primitiveSpecificData.image_url,
					});
					break;
				case "link":
					await trx.insert(linkPrimitives).values({
						primitive_id: newPrimitive.id,
						link_title: primitiveSpecificData.link_title,
						link_url: primitiveSpecificData.link_url,
					});
					break;
				case "embed":
					await trx.insert(embedPrimitives).values({
						primitive_id: newPrimitive.id,
						embed_type: primitiveSpecificData.embed_type,
						embed_url: primitiveSpecificData.embed_url,
					});
					break;
				default:
					throw new Error(
						"primitiveModels.ts: Passed unsupported primitive type",
					);
			}
			return newPrimitive;
		});
		return result;
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
