import type { canvasPrimitive } from "../types";

const baseURL = "http://localhost:3000";

export const getUsersService = async () => {
	const res = await fetch(`${baseURL}/users`);
	return await res.json();
};

export const getUserService = async (userId: number) => {
	const res = await fetch(`${baseURL}/user/${userId}`);
	return await res.json();
};

export const getUserCornersService = async (userId: number) => {
	const res = await fetch(`${baseURL}/user/${userId}/corners`);
	return await res.json();
};

export const createUserCornerService = async () => {};

export const getUserCornerPrimitivesService = async (
	userId: number,
	cornerId: number,
): Promise<canvasPrimitive[]> => {
	const res = await fetch(
		`${baseURL}/user/${userId}/corner/${cornerId}/primitives`,
	);
	return await res.json();
};

export const createNewPrimitiveService = async (
	userId: number,
	cornerId: number,
	body,
) => {
	try {
		const res = await fetch(
			`${baseURL}/user/${userId}/corner/${cornerId}/primitive`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			},
		);
		return await res.json();
	} catch (err) {
		console.error(`Failed to create new primitive: ${err}`);
		throw err;
	}
};

export const updatePrimitiveService = async (
	userId: number,
	cornerId: number,
	primitiveId: number,
	body,
) => {
	try {
		await fetch(
			`${baseURL}/user/${userId}/corner/${cornerId}/primitive/${primitiveId}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			},
		);
		return;
	} catch (err) {
		console.error(err);
		throw err;
	}
};
