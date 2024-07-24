CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(32),
	"email" varchar(256),
	"password" varchar(256)
);
