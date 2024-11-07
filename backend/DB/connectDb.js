import pkg from "pg";
const { Pool } = pkg;
export const pool = new Pool({
  host: process.env.DB_HOST,
  user: "postgres",
  password: "pgadmin@7285",
  port: process.env.DB_PORT,
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
