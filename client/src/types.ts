export interface Primitive {
	primitives: {
		id: number;
		corner_id: number;
		primitive_type: string;
		height: number;
		width: number;
		x_pos: number;
		y_pos: number;
		created_at: string;
		updated_at: string;
	};
}

export interface textPrimitive extends Primitive {
	text_primitives: {
		id: number;
		primitive_id: number;
		text_colour: string;
		text_content: string;
	};
}

export interface shapePrimitive extends Primitive {
	shape_primitives: {
		id: number;
		primitive_id: number;
		shape_type: string;
		shape_colour: string;
	};
}

export interface imagePrimitive extends Primitive {
	image_primitives: {
		id: number;
		primitive_id: number;
		image_url: string;
	};
}

export interface linkPrimitive extends Primitive {
	link_primitives: {
		id: number;
		primtive_id: number;
		link_title: string;
		link_url: string;
	};
}

export interface embedPrimitive extends Primitive {
	embed_primitives: {
		id: number;
		primitive_id: number;
		embed_type: string;
		embed_url: string;
	};
}

export type canvasPrimitive =
	| textPrimitive
	| shapePrimitive
	| imagePrimitive
	| linkPrimitive
	| embedPrimitive;
