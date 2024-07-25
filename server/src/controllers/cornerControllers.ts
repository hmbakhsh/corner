import type { Request, Response } from "express";
import {
	createUserCornerModel,
	getUserCornersModel,
} from "../models/cornerModels";

export const getUserCornersController = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		const userCorners = await getUserCornersModel(Number.parseInt(userId));
		res.status(200).send(userCorners);
	} catch (err) {
		console.log(`Failed: Getting User's Corners ${err}`);
	}
};

export const createUserCornerController = async (
	req: Request,
	res: Response,
) => {
	try {
		const { userId, corner_title, corner_image, corner_theme } = req.body;
		const newCorner = await createUserCornerModel(
			userId,
			corner_title,
			corner_image,
			corner_theme,
		);
		res.status(201).send(newCorner);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};
