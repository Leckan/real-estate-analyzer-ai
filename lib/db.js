// lib/db.js
import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import * as schema from './schema';

let db; // Initialize db variable

// Check if a connection pool already exists (for hot reloading in development)
if (!global.db) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  global.db = drizzle(pool, schema); // Attach drizzle instance to global
}

db = global.db; // Assign the global drizzle instance to db

export default db;