import { NextResponse } from "next/server";

import { pool } from "../../lib/db";

// get all list
export async function GET() {
  try {
    const res = await pool.query("SELECT * FROM todos");
    return NextResponse.json(res.rows);
  } catch (error) {
    console.error("Error in get all route:", error);
    return NextResponse.json(
      { message: "Internal server eerror" },
      { status: 500 }
    );
  }
}

// create one task

export async function POST(req: Request) {
  const { task_name } = await req.json();

  if (!task_name) {
    return NextResponse.json(
      { message: "Task name is required" },
      { status: 400 }
    );
  }

  try {
    const res = await pool.query(
      "INSERT INTO tasks (task_name) VALUES ($1) RETURNING *",
      [task_name]
    );
    return NextResponse.json(res.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { message: "Failed to create task" },
      { status: 500 }
    );
  }
}
