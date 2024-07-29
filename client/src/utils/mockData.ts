import type { canvasPrimitive } from "../types";

export const mock_data: canvasPrimitive[] = [
	{
		primitives: {
			id: 1,
			corner_id: 1,
			primitive_type: "text",
			width: 100,
			height: 200,
			x_pos: 10,
			y_pos: 10,
			created_at: "now",
			updated_at: "now",
		},
		text_primitives: {
			id: 1,
			primitive_id: 1,
			text_colour: "white",
			text_content: "Hey!",
		},
	},
	{
		primitives: {
			id: 1,
			corner_id: 1,
			primitive_type: "shape",
			width: 100,
			height: 200,
			x_pos: 600,
			y_pos: 500,
			created_at: "now",
			updated_at: "now",
		},
		shape_primitives: {
			id: 1,
			primitive_id: 1,
			shape_colour: "pink",
			shape_type: "circle",
		},
	},
];
