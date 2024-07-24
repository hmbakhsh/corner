import { relations } from "drizzle-orm";
import {
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

// * Table Schema: Users
export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	username: varchar("username", { length: 32 }),
	email: varchar("email", { length: 256 }),
	password_hash: varchar("password", { length: 256 }),
	created_at: timestamp("created_at").defaultNow(),
	updated_at: timestamp("updated_now").defaultNow(),
});

// ? One-to-Many Relationship: Users-Corners
export const usersRelations = relations(users, ({ many }) => ({
	corners: many(corners),
}));

// * Table Schema: Corners
export const corners = pgTable("corners", {
	id: serial("id").primaryKey(),
	user_id: integer("user_id").references(() => users.id),
});

// ? Many-to-One Relationship: Users-Corners
export const cornersRelations = relations(corners, ({ one }) => ({
	users: one(users, {
		fields: [corners.user_id],
		references: [users.id],
	}),
}));
