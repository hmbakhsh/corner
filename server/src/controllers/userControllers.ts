import type { Request, Response } from "express";
import {
	createUserModel,
	getUserModel,
	getUsersModel,
} from "../models/userModels";

// Controller: Get All Users
export const getUsersController = async (req: Request, res: Response) => {
	try {
		const users = await getUsersModel();
		res.send(users).status(200);
	} catch (err) {
		console.log(err);
	}
};

// Controller: Create User
export const createUserController = async (req: Request, res: Response) => {
	try {
		const { username, email, password_hash } = req.body;
		const createdUser = await createUserModel(username, email, password_hash);
		res.status(201).send(createdUser);
	} catch (err) {
		console.log(`Failed: Create User Controller: ${err}`);
	}
};

// Controller: Get User
export const getUserController = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		const user = await getUserModel(Number.parseInt(userId));
		res.status(200).send(user);
	} catch (err) {
		console.log(`Failed: Get User Controller ${err}`);
	}
};
