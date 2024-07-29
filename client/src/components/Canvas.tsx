import { useEffect, useState } from "react";
import TextPrimitive from "./TextPrimitive";
import type {
	canvasPrimitive,
	embedPrimitive,
	imagePrimitive,
	shapePrimitive,
	textPrimitive,
} from "../types";
import ShapePrimitive from "./ShapePrimitive";
import ImagePrimitive from "./ImagePrimitive";
import EmbedPrimitive from "./EmbedPrimitive";

type CanvasProps = {
	elements: canvasPrimitive[];
	handlePrimitiveDrag: (
		primitiveId: number,
		x_pos: number,
		y_pos: number,
	) => void;
	handlePrimitiveResize: (
		primitiveId: number,
		width: string,
		height: string,
	) => void;
	handleTextPrimitiveRename: (
		userId: number,
		cornerId: number,
		primitiveId: number,
		text_content: string,
	) => void;
};

export default function Canvas({
	elements,
	handlePrimitiveDrag,
	handlePrimitiveResize,
	handleTextPrimitiveRename,
}: CanvasProps) {
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });

	function handleCanvasMouseDown(e: React.MouseEvent) {
		if (
			(e.target as HTMLElement).closest(".react-draggable") ||
			(e.target as HTMLElement).closest(".link-form")
		) {
			return;
		}
		setIsDragging(true);
		setStartPoint({ x: e.clientX - offset.x, y: e.clientY - offset.y });
	}

	function handleCanvasMouseMove(e: React.MouseEvent) {
		if (!isDragging) return;
		const newOffset = {
			x: e.clientX - startPoint.x,
			y: e.clientY - startPoint.y,
		};
		setOffset(newOffset);
	}

	function handleCanvasMouseUp() {
		setIsDragging(false);
	}

	return (
		<>
			<div
				className="canvas-container"
				style={{
					width: "100vw",
					height: "95vh",
					overflow: "hidden",
					position: "relative",
					cursor: isDragging ? "grabbing" : "grab",
				}}
				onMouseDown={handleCanvasMouseDown}
				onMouseMove={handleCanvasMouseMove}
				onMouseUp={handleCanvasMouseUp}
			>
				<div
					className="canvas"
					style={{
						transform: `translate(${offset.x}px, ${offset.y}px)`,
						position: "absolute",
						top: 0,
						left: 0,
					}}
				>
					{elements ? (
						elements.map((el: canvasPrimitive) => {
							switch (el.primitives.primitive_type) {
								case "text": {
									const text = el as textPrimitive;
									return (
										<TextPrimitive
											key={text.primitives.id}
											textInstance={text}
											handlePrimitiveDrag={handlePrimitiveDrag}
											handleTextPrimitiveRename={handleTextPrimitiveRename}
										/>
									);
								}
								case "shape": {
									const shape = el as shapePrimitive;
									return (
										<ShapePrimitive
											key={shape.primitives.id}
											handlePrimitiveDrag={handlePrimitiveDrag}
											handlePrimitiveResize={handlePrimitiveResize}
											shapeInstance={shape}
										/>
									);
								}
								case "image": {
									const image = el as imagePrimitive;
									return (
										<ImagePrimitive
											key={image.primitives.id}
											handlePrimitiveDrag={handlePrimitiveDrag}
											handlePrimitiveResize={handlePrimitiveResize}
											imageInstance={image}
										/>
									);
								}
								case "embed": {
									const embed = el as embedPrimitive;
									return (
										<EmbedPrimitive
											key={embed.primitives.id}
											embedInstance={embed}
										/>
									);
								}
							}
						})
					) : (
						<></>
					)}
				</div>
			</div>
		</>
	);
}
