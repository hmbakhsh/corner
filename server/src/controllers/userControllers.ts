import type { Request, Response } from "express";
import { getUsersModel } from "../models/userModels";

export const getUsersController = (req: Request, res: Response) => {
	try {
		const users = getUsersModel();
		res.send(users).status(200);
	} catch (err) {
		console.log(err);
	}
};
