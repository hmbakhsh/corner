import type { Request, Response } from "express";
import {
	createPrimitiveModel,
	getUserCornerPrimitivesModel,
	updatePrimitiveModel,
} from "../models/primitiveModels";

export const getCornerPrimitivesController = async (
	req: Request,
	res: Response,
) => {
	const { userId, cornerId } = req.params;

	const userIdNum = Number.parseInt(userId);
	const cornerIdNum = Number.parseInt(cornerId);

	try {
		const cornerPrimitives = await getUserCornerPrimitivesModel(
			userIdNum,
			cornerIdNum,
		);
		res.status(200).send(cornerPrimitives);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};

export const createPrimitiveController = async (
	req: Request,
	res: Response,
) => {
	const { cornerId } = req.params;

	console.log("Recevied cornerId: ", cornerId);
	console.log("Received body:", cornerId);

	let { primitive_type, width, height, ...primitiveSpecificData } = req.body;

	width = Number.parseInt(width);
	height = Number.parseInt(height);

	try {
		const newPrimitive = await createPrimitiveModel(
			cornerId,
			width,
			height,
			primitiveSpecificData,
		);
		res.status(201).send(newPrimitive);
		console.log("Successfully created new primitive");
	} catch (err) {
		console.log(`Failed: Create new primitive ${err}`);
		res.sendStatus(500);
	}
};

// export type updateObjectType = {
// 	operationType: "primitive" | "text" | "shape" | "image" | "link" | "embed";
// 	updateColumn: string;
// };

export type updateObjectType = {
	x_pos: "string";
};

export const updatePrimitiveController = async (
	req: Request,
	res: Response,
) => {
	try {
		const { userId, cornerId, primitiveId } = req.params;
		const updateData = req.body;

		const userIdNum = Number.parseInt(userId);
		const cornerIdNum = Number.parseInt(cornerId);
		const primitiveIdNum = Number.parseInt(primitiveId);

		const { type } = updateData;

		// Extract the property to be changed
		const updateDataArr = Object.entries(updateData);
		const updateProp = updateDataArr.find(([property]) => property !== "type");
		const [updateColumn, updateValue] = updateProp;

		const updateObject = {};
		updateObject[updateColumn] = updateValue;

		const primitiveFields = ["x_pos", "y_pos", "width", "height"];
		let operationType: string;

		if (primitiveFields.includes(updateColumn)) {
			operationType = "primitive";
		} else {
			operationType = "specific";
		}

		const updatedPrimitive = await updatePrimitiveModel(
			userIdNum,
			cornerIdNum,
			primitiveIdNum,
			updateObject,
			operationType,
			type,
		);

		res.sendStatus(202);
	} catch (err) {
		res.sendStatus(500);
		console.error(err);
	}
};
