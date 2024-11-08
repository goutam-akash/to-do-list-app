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
      message: "Task added successfully.",
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
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    console.log("Error in getToDoList controller:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// get all to-do lists
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
export const updateToDoList = async (req, res) => {
  const id = req.params.id;
  const { title, description, duedate, completed } = req.body;

  try {
    const taskExists = await pool.query(
      `SELECT id, title, description, duedate, completed, createdAt
          FROM todos
          WHERE id = $1;`,
      [id]
    );

    if (taskExists.rows.length === 0) {
      return res.status(404).json({ message: "Task not found." });
    }
    const currentDate = new Date().toISOString();
    const formattedDueDate = new Date(duedate).toISOString();

    if (currentDate > formattedDueDate) {
      return res
        .status(400)
        .json({ message: "Due date must be in the future." });
    }

    const result = await pool.query(
      `UPDATE todos
        SET title = $1, description = $2, duedate = $3, completed = $4
        WHERE id = $5
        RETURNING id, title, description, duedate, completed, createdAt;`,
      [title, description, formattedDueDate, completed, id]
    );

    res.status(200).json({
      message: "Task updated successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.log("Error in updateToDoList controller:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// delete one to-do list
export const removeToDoList = async (req, res) => {
  const id = req.params.id;

  try {
    const taskExists = await pool.query(
      `SELECT id, title, description, duedate, completed, createdAt
            FROM todos
            WHERE id = $1;`,
      [id]
    );

    if (taskExists.rows.length === 0) {
      return res.status(404).json({ message: "Task not found." });
    }

    const result = await pool.query(
      `DELETE FROM todos WHERE id = $1 RETURNING id;`,
      [id]
    );

    res.status(200).json({
      message: "Task deleted successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.log("Error in removeToDoList controller:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// delete all to-do lists
export const removeToDoLists = async (req, res) => {
  try {
    await pool.query(`DELETE FROM todos`);
    res.status(200).json({ message: "All tasks deleted successfully." });
  } catch (error) {
    console.log("Error in removeToDoList controller:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
