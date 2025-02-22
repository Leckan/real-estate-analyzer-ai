// db/schema.js
import { pgTable, serial, varchar, jsonb, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const properties = pgTable('properties', {
  id: serial().primaryKey(),
  attomId: varchar('attom_id').unique().notNull(), // Attom ID (unique and required)
  address: jsonb('address').notNull(), // Address details (required)
  details: jsonb('details'), // Full property details from Attom (can be null)
  analysis: text('analysis'), // Gemini analysis (can be null)
  userId: varchar('user_id').references(() => users.id), // Clerk user ID (foreign key)
  createdAt: timestamp('created_at').defaultNow(), // Timestamp of property creation
  updatedAt: timestamp('updated_at'), // Timestamp of last update
  // Add other relevant fields as needed (e.g., price, bedrooms, bathrooms)
  price: integer('price'), // Example
  bedrooms: integer('bedrooms'), //Example
  bathrooms: integer('bathrooms') //Example
});

export const users = pgTable('users', {
  id: varchar('id').primaryKey(), // Clerk user ID (primary key)
  firstName: varchar('first_name'),
  lastName: varchar('last_name'),
  email: varchar('email'),
  // ... other user fields from Clerk
});


export const propertyImages = pgTable('property_images', {
    id: serial().primaryKey(),
    propertyId: integer('property_id').references(() => properties.id),
    imageUrl: varchar('image_url').notNull(),
})