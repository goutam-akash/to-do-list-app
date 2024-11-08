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

  console.log(currentDate, formattedDueDate, currentDate < formattedDueDate);

  if (currentDate > formattedDueDate) {
    return res.status(400).json({ message: "Due date must be in the future." });
  }

  try {
    await createTableIfNotExists();
    const result = await pool.query(
      `INSERT INTO todos (title, description, duedate, completed)
         VALUES ($1, $2, $3, $4)
         RETURNING id, title, description, duedate, completed, createdAt;`,
      [title, description, formattedDueDate, completed]
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

// get one to-do list
export const getToDoList = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query(
      `SELECT id, title, description, duedate, completed, createdAt
             FROM todos
             WHERE id = $1;`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "To-do list not found." });
    }

    res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    console.log("Error in getToDoList controller:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// all to-do lists
export const getToDoLists = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM todos`);
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.log("Error in getToDoLists controller:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// update one to-do list
export const updateToDoList = async () => {};

// delete one to-do list
export const removeToDoList = async () => {};

// create all to-do lists
export const removeToDoLists = async () => {};
