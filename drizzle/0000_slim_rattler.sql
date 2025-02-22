CREATE TABLE "properties" (
	"id" serial PRIMARY KEY NOT NULL,
	"attom_id" varchar NOT NULL,
	"address" jsonb NOT NULL,
	"details" jsonb,
	"analysis" text,
	"user_id" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"price" integer,
	"bedrooms" integer,
	"bathrooms" integer,
	CONSTRAINT "properties_attom_id_unique" UNIQUE("attom_id")
);
--> statement-breakpoint
CREATE TABLE "property_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"property_id" integer,
	"image_url" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"first_name" varchar,
	"last_name" varchar,
	"email" varchar
);
--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_images" ADD CONSTRAINT "property_images_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;