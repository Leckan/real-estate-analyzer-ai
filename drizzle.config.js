require('dotenv').config({ path: '.env.local' }); // Load environment variables from .env file
console.log(process.env.DATABASE_URL)
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.js",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  }
});