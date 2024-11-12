import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Create the Pool with environment variables
export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 5432, // Default PostgreSQL port
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

export const disconnectDb = async () => {
  try {
    await pool.end();
    console.log("Connection closed.");
  } catch (error) {
    console.error("Error disconnecting from database", error);
  }
};

export const testDbConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Database connection test:", res.rows[0]);
  } catch (error) {
    console.error("Error during database connection test", error);
  }
};
