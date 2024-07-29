import { Rnd } from "react-rnd";
import type { imagePrimitive } from "../types";

type ImagePrimitiveProps = {
	imageInstance: imagePrimitive;
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
};

function handleMouseDown(e) {
	e.preventDefault();
}

export default function ImagePrimitive({
	imageInstance,
	handlePrimitiveDrag,
	handlePrimitiveResize,
}: ImagePrimitiveProps) {
	return (
		<>
			<Rnd
				default={{
					x: imageInstance.primitives.x_pos,
					y: imageInstance.primitives.y_pos,
					width: imageInstance.primitives.width,
					height: imageInstance.primitives.height,
				}}
				onDragStop={(_e, d) => {
					handlePrimitiveDrag(imageInstance.primitives.id, d.x, d.y);
				}}
				onResizeStop={(_e, _d, ref) => {
					handlePrimitiveResize(
						imageInstance.primitives.id,
						ref.style.width,
						ref.style.height,
					);
				}}
			>
				<img
					src={imageInstance.image_primitives.image_url}
					alt="image_primitive"
					onMouseDown={handleMouseDown}
				/>
			</Rnd>
		</>
	);
}
