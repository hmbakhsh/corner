ALTER TABLE "text_primitives" DROP CONSTRAINT "text_primitives_primitive_id_primitives_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "text_primitives" ADD CONSTRAINT "text_primitives_primitive_id_primitives_id_fk" FOREIGN KEY ("primitive_id") REFERENCES "public"."primitives"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
