import { Rnd } from "react-rnd";
import type { shapePrimitive } from "../types";

type ShapePrimitiveProps = {
	shapeInstance: shapePrimitive;
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

export default function ShapePrimitive({
	shapeInstance,
	handlePrimitiveDrag,
	handlePrimitiveResize,
}: ShapePrimitiveProps) {
	const renderShape = () => {
		if (shapeInstance.shape_primitives.shape_type === "rectangle") {
			return <div className="bg-indigo-500 h-full rounded-md" />;
		}
		return <div className="bg-indigo-500 h-full rounded-full" />;
	};

	return (
		<>
			<Rnd
				default={{
					x: shapeInstance.primitives.x_pos,
					y: shapeInstance.primitives.y_pos,
					height: shapeInstance.primitives.height,
					width: shapeInstance.primitives.width,
				}}
				className="z-10"
				onDragStop={(_e, d) => {
					handlePrimitiveDrag(shapeInstance.primitives.id, d.x, d.y);
				}}
				onResizeStop={(_e, _d, ref) => {
					handlePrimitiveResize(
						shapeInstance.primitives.id,
						ref.style.width,
						ref.style.height,
					);
				}}
			>
				{renderShape()}
			</Rnd>
		</>
	);
}
