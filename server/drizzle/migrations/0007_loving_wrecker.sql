ALTER TABLE "corners" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "corners" ADD COLUMN "updated_now" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "primitives" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "primitives" ADD COLUMN "updated_now" timestamp DEFAULT now();