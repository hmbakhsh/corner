import { Rnd } from "react-rnd";
import type { textPrimitive } from "../types";
import { useState } from "react";

type TextPrimitiveProps = {
	textInstance: textPrimitive;
	handlePrimitiveDrag: (
		primitiveId: number,
		x_pos: number,
		y_pos: number,
	) => void;
	handleTextPrimitiveRename: (
		userId: number,
		cornerId: number,
		primitiveId: number,
		text_content: string,
	) => void;
};

export default function TextPrimitive({
	textInstance,
	handlePrimitiveDrag,
	handleTextPrimitiveRename,
}: TextPrimitiveProps) {
	const [isEditing, setIsEditing] = useState(false);

	function handleBlur() {
		setIsEditing(false);
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		handleTextPrimitiveRename(1, 1, textInstance.primitives.id, e.target.value);
	}

	if (isEditing) {
		return (
			<>
				<input
					type="text"
					value={textInstance.text_primitives.text_content}
					onChange={handleChange}
					className="w-fit bg-transparent border-transparent text-white text-3xl font-medium z-50 outline-none"
					onBlur={handleBlur}
					style={{
						position: "absolute",
						top: textInstance.primitives.y_pos,
						left: textInstance.primitives.x_pos,
					}}
					// biome-ignore lint/a11y/noAutofocus: <explanation>
					autoFocus
				/>
			</>
		);
	}

	return (
		<>
			<Rnd
				default={{
					x: textInstance.primitives.x_pos,
					y: textInstance.primitives.y_pos,
				}}
				className="z-50"
				onDragStop={(_e, d) => {
					handlePrimitiveDrag(textInstance.primitives.id, d.x, d.y);
				}}
			>
				<p
					className="text-3xl font-medium"
					onDoubleClick={() => setIsEditing(true)}
					onBlur={() => setIsEditing(false)}
				>
					{textInstance.text_primitives.text_content}
				</p>
			</Rnd>
		</>
	);
}
