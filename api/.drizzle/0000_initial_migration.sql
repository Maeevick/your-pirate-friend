CREATE TABLE IF NOT EXISTS "health" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"status" varchar(256) DEFAULT 'Pirate!' NOT NULL
);
