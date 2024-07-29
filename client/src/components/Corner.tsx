import { useEffect, useState } from "react";
import type { canvasPrimitive } from "../types";
import MenuBar from "./MenuBar";
import Canvas from "./Canvas";
import CanvasToolBar from "./CanvasToolBar";
import {
	createNewPrimitiveService,
	getUserCornerPrimitivesService,
	updatePrimitiveService,
} from "../services/services";

export default function Corner() {
	const [elements, setElements] = useState<canvasPrimitive[]>();

	// ? GET ELEMENTS FROM SERVER ON RE-RENDER
	useEffect(() => {
		getUserCornerPrimitivesService(1, 1).then((data) => setElements(data));
		console.log("re-render triggered");
	}, []);

	// * HANDLER FOR CREATING A NEW TEXT PRIMITIVE
	async function handleTextButtonClick() {
		try {
			const post_body_data = {
				primitive_type: "text",
				type: "text",
				text_content: "untitled",
				text_colour: "white",
			};
			const newTextInstanceData = await createNewPrimitiveService(
				1,
				1,
				post_body_data,
			);

			setElements((prevElements) => {
				const updatedElements = [...(prevElements ?? []), newTextInstanceData];
				return updatedElements;
			});

			console.dir(elements, { depth: null });
		} catch (err) {
			console.error(`Error creating new text: ${err}`);
		}
	}

	// * HANDLER FOR CREATING A NEW TEXT SHAPE
	async function handleShapeButtonClick(type: "circle" | "rectangle") {
		try {
			const shape_data_body = {
				type: "shape",
				primitive_type: "shape",
				shape_type: type,
				shape_colour: "purple",
				width: "0px",
				height: "0px",
			};

			if (type === "circle") {
				shape_data_body.width = "100px";
				shape_data_body.height = "100px";
			} else if (type === "rectangle") {
				shape_data_body.width = "250px";
				shape_data_body.height = "100px";
			}

			const newShapeInstanceData = await createNewPrimitiveService(
				1,
				1,
				shape_data_body,
			);

			setElements((prevElements) => {
				const updatedElements = [...(prevElements ?? []), newShapeInstanceData];
				return updatedElements;
			});

			console.dir(elements, { depth: null });
		} catch (err) {
			console.error(`Error creating a new shape: ${err}`);
		}
	}

	// * HANDLER FOR CREATING A NEW IMAGE PRIMITIVE
	async function handleImageButtonClick(
		image_url: string,
		width: number,
		height: number,
	) {
		try {
			const image_data_body = {
				type: "image",
				image_url,
				width: `${width}px`,
				height: `${height}px`,
			};
			const newImagePrimitiveInstance = await createNewPrimitiveService(
				1,
				1,
				image_data_body,
			);

			setElements((prevElements) => {
				const updatedElements = [
					...(prevElements ?? []),
					newImagePrimitiveInstance,
				];
				return updatedElements;
			});
		} catch (err) {
			console.error(`Error creating a new image: ${err}`);
		}
	}

	// * HANDLE LINK FORM SUBMISSION
	async function handleLinkButtonClick(url: string) {
		const rePattern = /https?:\/\/(www\.)?(spotify|youtube)\.com\S*/i;
		const linkDataBody = {
			type: "",
		};

		if (rePattern.exec(url)) {
			linkDataBody.type = "embed";
			linkDataBody.embed_url = url;
			linkDataBody.embed_type = rePattern.exec(url)[2];
		} else {
			linkDataBody.type = "link";
			linkDataBody.link_url = url;
		}

		const newLinkEmbedPrimitiveInstance = await createNewPrimitiveService(
			1,
			1,
			linkDataBody,
		);

		setElements((prevElements) => {
			const updatedElements = [
				...(prevElements ?? []),
				newLinkEmbedPrimitiveInstance,
			];
			return updatedElements;
		});
	}

	// * HANDLER FOR DRAGGING A PRIMITIVE
	async function handlePrimitiveDrag(
		primitiveId: number,
		x_pos: number,
		y_pos: number,
	) {
		await updatePrimitiveService(1, 1, primitiveId, { x_pos });
		await updatePrimitiveService(1, 1, primitiveId, { y_pos });
		setElements(
			(prev) =>
				prev?.map((el) => {
					if (el.primitives.id === primitiveId) {
						return {
							...el,
							primitives: {
								...el.primitives,
								x_pos: x_pos,
								y_pos: y_pos,
							},
						};
					}
					return el;
				}) ?? [],
		);
	}

	// * HANDLE PRIMITIVE RENAMING
	async function handleTextPrimitiveRename(
		userId: number,
		cornerId: number,
		primitiveId: number,
		text_content: string,
	) {
		await updatePrimitiveService(1, 1, primitiveId, {
			text_content,
			type: "text",
		});
		setElements(
			(prev) =>
				prev?.map((el) => {
					if (el.primitives.id === primitiveId) {
						return {
							...el,
							text_primitives: {
								...el.text_primitives,
								text_content,
							},
						};
					}
					return el;
				}) ?? [],
		);
	}

	// * HANDLER FOR RESIZING A PRIMITIVE
	async function handlePrimitiveResize(
		primitiveId: number,
		width: string,
		height: string,
	) {
		const widthToNumber = Number.parseInt(width);
		const heightToNumber = Number.parseInt(height);

		await updatePrimitiveService(1, 1, primitiveId, { width });
		await updatePrimitiveService(1, 1, primitiveId, { height });
		setElements(
			(prev) =>
				prev?.map((el) => {
					if (el.primitives.id === primitiveId) {
						return {
							...el,
							primitives: {
								...el.primitives,
								width: widthToNumber,
								height: heightToNumber,
							},
						};
					}
					return el;
				}) ?? [],
		);
	}

	return (
		<>
			<MenuBar />
			<Canvas
				elements={elements}
				handlePrimitiveDrag={handlePrimitiveDrag}
				handlePrimitiveResize={handlePrimitiveResize}
				handleTextPrimitiveRename={handleTextPrimitiveRename}
				handleLinkButtonClick={handleLinkButtonClick}
			/>
			<CanvasToolBar
				handleTextButtonClick={handleTextButtonClick}
				handleShapeButtonClick={handleShapeButtonClick}
				handleImageButtonClick={handleImageButtonClick}
			/>
		</>
	);
}
