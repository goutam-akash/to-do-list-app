// create one to-do list

import { pool } from "../DB/connectDb.js";

export const createToDoList = async (req, res) => {
  const { title, description, duedate, completed = false } = req.body;
  const createTableIfNotExists = async () => {
    try {
      // Create table if it doesn't already exist
      const createTableQuery = `
           CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,  -- Auto-incremented ID
        title VARCHAR(255) NOT NULL,  -- Title of the task
        description TEXT,  -- Description of the task
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Created date with default to current timestamp
        duedate TIMESTAMP,  -- Due date of the task
        completed BOOLEAN DEFAULT FALSE  -- Task completion status (defaults to false)
        );
        `;

      await pool.query(createTableQuery);
      console.log('Table "todos" is ready.');
    } catch (error) {
      console.error("Error creating table:", error);
    }
  };

  const currentDate = new Date().toISOString();
  const formattedDueDate = new Date(duedate).toISOString();

  if (currentDate < formattedDueDate) {
    return res.status(400).json({ message: "Due date must be in the future." });
  }

  console.log(currentDate, formattedDueDate, currentDate < formattedDueDate);

  try {
    await createTableIfNotExists();
    const result = await pool.query(
      `INSERT INTO todos (title, description, duedate, completed)
        VALUES ('${title}', '${description}', '${formattedDueDate}', ${completed})
        RETURNING id, title, description, duedate, completed, createdAt
        ;`
    );
    res.status(201).json({
      message: "To-do list created successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.log("Error in createToDoList controller:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// all to-do lists
export const getToDoLists = async () => {};

// update one to-do list
export const updateToDoList = async () => {};

// delete one to-do list
export const removeToDoList = async () => {};

// create all to-do lists
export const removeToDoLists = async () => {};
