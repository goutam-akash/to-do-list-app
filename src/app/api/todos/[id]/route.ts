// app/api/todos/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../../lib/db";

// PUT request to update a todo by id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Access `params` directly without awaiting
  const { task_name, completed } = await req.json();

  if (!task_name) {
    return NextResponse.json(
      { message: "Task name is required" },
      { status: 400 }
    );
  }

  try {
    const res = await pool.query(
      "UPDATE todos SET task_name = $1, completed = $2 WHERE id = $3 RETURNING *",
      [task_name, completed, id]
    );

    if (res.rowCount === 0) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(res.rows[0], { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { message: "Failed to update task" },
      { status: 500 }
    );
  }
}

// DELETE request to delete a todo by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Access `params` directly without awaiting

  try {
    const res = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );

    if (res.rowCount === 0) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { message: "Failed to delete task" },
      { status: 500 }
    );
  }
}
