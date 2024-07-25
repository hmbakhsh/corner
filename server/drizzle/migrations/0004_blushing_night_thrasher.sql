DO $$ BEGIN
 CREATE TYPE "public"."corner_theme" AS ENUM('pink', 'purple', 'blue', 'green', 'grey');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."embed_type" AS ENUM('youtube', 'spotify');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."primitive_type" AS ENUM('text', 'shape', 'image', 'link', 'embed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."shape_type" AS ENUM('rectangle', 'circle', 'arrow');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "corners" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"corner_title" varchar(64),
	"corner_image" varchar(512),
	"corner_theme" "corner_theme",
	"corner_link" varchar(512)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "embed_primitives" (
	"id" serial PRIMARY KEY NOT NULL,
	"primitive_id" integer,
	"embed_type" "embed_type",
	"embed_url" varchar(512)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "image_primitives" (
	"id" serial PRIMARY KEY NOT NULL,
	"primitive_id" integer,
	"image_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "link_primitives" (
	"id" serial PRIMARY KEY NOT NULL,
	"primitive_id" integer,
	"title" varchar(256),
	"link_url" varchar(512)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "primitives" (
	"id" serial PRIMARY KEY NOT NULL,
	"corner_id" integer,
	"primitive_type" "primitive_type",
	"x_pos" real DEFAULT 0,
	"y_pos" real DEFAULT 0,
	"width" real,
	"height" real
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shape_primitives" (
	"id" serial PRIMARY KEY NOT NULL,
	"primitive_id" integer,
	"shape_type" "shape_type",
	"shape_colour" varchar(32)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "text_primitives" (
	"id" serial PRIMARY KEY NOT NULL,
	"primitive_id" integer,
	"content" text DEFAULT 'text',
	"colour" varchar(16) DEFAULT 'white'
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "corners" ADD CONSTRAINT "corners_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "embed_primitives" ADD CONSTRAINT "embed_primitives_primitive_id_primitives_id_fk" FOREIGN KEY ("primitive_id") REFERENCES "public"."primitives"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "image_primitives" ADD CONSTRAINT "image_primitives_primitive_id_primitives_id_fk" FOREIGN KEY ("primitive_id") REFERENCES "public"."primitives"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "link_primitives" ADD CONSTRAINT "link_primitives_primitive_id_primitives_id_fk" FOREIGN KEY ("primitive_id") REFERENCES "public"."primitives"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "primitives" ADD CONSTRAINT "primitives_corner_id_corners_id_fk" FOREIGN KEY ("corner_id") REFERENCES "public"."corners"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shape_primitives" ADD CONSTRAINT "shape_primitives_primitive_id_primitives_id_fk" FOREIGN KEY ("primitive_id") REFERENCES "public"."primitives"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "text_primitives" ADD CONSTRAINT "text_primitives_primitive_id_primitives_id_fk" FOREIGN KEY ("primitive_id") REFERENCES "public"."primitives"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
