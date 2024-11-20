import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../lib/db";

// GET all list of todos
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM todos");
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error in get all route:", error);
    return NextResponse.json(
      { error: "Failed to retrieve tasks" },
      { status: 500 }
    );
  }
}

// create one task

export async function POST(req: NextRequest) {
  try {
    const { task_name } = await req.json();

    if (!task_name) {
      return NextResponse.json(
        { error: "Task name is required" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "INSERT INTO todos (task_name) VALUES ($1) RETURNING *",
      [task_name]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error in create route:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
  
}
