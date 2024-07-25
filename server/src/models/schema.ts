import { relations, type InferInsertModel } from "drizzle-orm";
import {
	integer,
	pgEnum,
	pgTable,
	real,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

// ENUM INITILIASATIONS
// ---------------------------
// * Corners Table: "corner_theme" field ENUM
export const cornerThemeEnum = pgEnum("corner_theme", [
	"pink",
	"purple",
	"blue",
	"green",
	"grey",
]);
// * Primitives Table: "primitive_type" field ENUM
export const primitiveTypeEnum = pgEnum("primitive_type", [
	"text",
	"shape",
	"image",
	"link",
	"embed",
]);

export const shapeTypeEnum = pgEnum("shape_type", [
	"rectangle",
	"circle",
	"arrow",
]);

export const embedTypeEnum = pgEnum("embed_type", ["youtube", "spotify"]);

// TABLE SCHEMAS
// ---------------------------
// * Table Schema: Users
export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	username: varchar("username", { length: 32 }),
	email: varchar("email", { length: 256 }),
	password_hash: varchar("password_hash", { length: 256 }),
	created_at: timestamp("created_at").defaultNow(),
	updated_at: timestamp("updated_now").defaultNow(),
});

// * Table Schema: Corners
export const corners = pgTable("corners", {
	id: serial("id").primaryKey(),
	user_id: integer("user_id")
		.references(() => users.id)
		.notNull(),
	corner_title: varchar("corner_title", { length: 64 }).notNull(),
	corner_image: varchar("corner_image", { length: 512 }),
	corner_theme: cornerThemeEnum("corner_theme").notNull(),
	corner_url: varchar("corner_url", { length: 512 }),
	created_at: timestamp("created_at").defaultNow(),
	updated_at: timestamp("updated_now").defaultNow(),
});

// ! Look more into how this works in Typescript
export type cornerThemeType = (typeof corners.corner_theme.enumValues)[number];

// * Table Schema: Primitives
export const primitives = pgTable("primitives", {
	id: serial("id").primaryKey(),
	corner_id: integer("corner_id").references(() => corners.id),
	primitive_type: primitiveTypeEnum("primitive_type"),
	x_pos: real("x_pos").default(0),
	y_pos: real("y_pos").default(0),
	width: real("width"),
	height: real("height"),
	created_at: timestamp("created_at").defaultNow(),
	updated_at: timestamp("updated_now").defaultNow(),
});

export type primitiveTypeType =
	(typeof primitives.primitive_type.enumValues)[number];

// * Table Schema: Text_Primitives
export const textPrimitives = pgTable("text_primitives", {
	id: serial("id").primaryKey(),
	primitive_id: integer("primitive_id").references(() => primitives.id),
	text_content: text("content").default("text"),
	text_colour: varchar("colour", { length: 16 }).default("white"),
});

// ! Figure out how to organise the insert types for tables
export type newTextPrimitiveType = InferInsertModel<typeof textPrimitives>;

// * Table Schema: Shape_Primitives
export const shapePrimitives = pgTable("shape_primitives", {
	id: serial("id").primaryKey(),
	primitive_id: integer("primitive_id").references(() => primitives.id),
	shape_type: shapeTypeEnum("shape_type"),
	shape_colour: varchar("shape_colour", { length: 32 }),
});

export type newShapePrimitiveType = InferInsertModel<typeof shapePrimitives>;

// * Table Schema: Image_Primitives
export const imagePrimitives = pgTable("image_primitives", {
	id: serial("id").primaryKey(),
	primitive_id: integer("primitive_id").references(() => primitives.id),
	image_url: text("image_url"),
});

export type newImagePrimitiveType = InferInsertModel<typeof imagePrimitives>;

// * Table Schema: Link_Primitives
export const linkPrimitives = pgTable("link_primitives", {
	id: serial("id").primaryKey(),
	primitive_id: integer("primitive_id").references(() => primitives.id),
	link_title: varchar("title", { length: 256 }),
	link_url: varchar("link_url", { length: 512 }),
});

export type newLinkPrimitiveType = InferInsertModel<typeof linkPrimitives>;

// * Table Schema: Embed_Primitives
export const embedPrimitives = pgTable("embed_primitives", {
	id: serial("id").primaryKey(),
	primitive_id: integer("primitive_id").references(() => primitives.id),
	embed_type: embedTypeEnum("embed_type"),
	embed_url: varchar("embed_url", { length: 512 }),
	// transcription: text("transcription"),
	// summary: text("summary"),
});

export type newEmbedPrimitiveType = InferInsertModel<typeof embedPrimitives>;

// TABLE RELATIONSHIPS
// ---------------------------
// Users Table Relations
export const usersRelations = relations(users, ({ many }) => ({
	// ? One-to-Many Relationship: User-Corners
	corners: many(corners),
}));

// Corners Table Relations
export const cornersRelations = relations(corners, ({ one, many }) => ({
	// ? Many-to-One Relationship: Corners-User
	users: one(users, {
		fields: [corners.user_id],
		references: [users.id],
	}),
	// ? One-to-Many Relationship: Primitives-Corner
	primitives: many(primitives),
}));

// Primitives Table Relations
export const primitivesRelations = relations(primitives, ({ one }) => ({
	corners: one(corners, {
		fields: [primitives.id],
		references: [corners.id],
	}),
	textPrimitives: one(textPrimitives),
	shapePrimitives: one(shapePrimitives),
	imagePrimitives: one(imagePrimitives),
	linkPrimitives: one(linkPrimitives),
	embedPrimitives: one(embedPrimitives),
}));

// Text_Primitives Table Relations
export const textPrimitivesRelations = relations(textPrimitives, ({ one }) => ({
	primitives: one(primitives, {
		fields: [textPrimitives.id],
		references: [primitives.id],
	}),
}));

// Shape_Primitives Table Relations
export const shapePrimitivesRelations = relations(
	shapePrimitives,
	({ one }) => ({
		primitives: one(primitives, {
			fields: [shapePrimitives.id],
			references: [primitives.id],
		}),
	}),
);

// Image_Primitives Table Relations
export const imagePrimitivesRelations = relations(
	imagePrimitives,
	({ one }) => ({
		primitives: one(primitives, {
			fields: [imagePrimitives.id],
			references: [primitives.id],
		}),
	}),
);

// Link_Primitives Table Relations
export const linkPrimitivesRelations = relations(linkPrimitives, ({ one }) => ({
	primitives: one(primitives, {
		fields: [linkPrimitives.id],
		references: [primitives.id],
	}),
}));

// Embed_Primitives Table Relations
export const embedPrimitivesRelations = relations(
	embedPrimitives,
	({ one }) => ({
		primitives: one(primitives, {
			fields: [embedPrimitives.id],
			references: [primitives.id],
		}),
	}),
);
