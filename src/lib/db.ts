import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";
export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 5432,
  database: process.env.DB_DATABASE,
});

export const connectToDb = async () => {
  try {
    await pool.connect();
    console.log("Connected to the PostgreSQL database.");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};

export const disconnectDB = async () => {
  try {
    await pool.end();
    console.log("Connection closed.");
  } catch (error) {
    console.error("Error disconnecting database", error);
  }
};

connectToDb();
