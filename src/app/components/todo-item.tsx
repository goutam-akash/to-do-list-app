// app/components/todo-item.tsx

import React, { useState } from "react";
import { Todo } from "../interfaces/Todo";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number, task_name: string) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.task_name);

  const handleEdit = () => {
    if (newText.trim() && newText !== todo.task_name) {
      onEdit(todo.id, newText);
      setIsEditing(false); // Close edit mode
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "10px 0",
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id, todo.task_name)}
        style={{ marginRight: "10px" }}
      />
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            style={{ marginRight: "10px", padding: "5px", width: "200px" }}
          />
          <button
            onClick={handleEdit}
            style={{ padding: "5px 10px", cursor: "pointer" }}
          >
            Save
          </button>
        </div>
      ) : (
        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            flexGrow: 1,
          }}
        >
          {todo.task_name}
        </span>
      )}
      <div>
        <button
          onClick={() => onDelete(todo.id)}
          style={{ padding: "5px 10px", cursor: "pointer", marginLeft: "5px" }}
        >
          Delete
        </button>
        {!isEditing && !todo.completed && (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              padding: "5px 10px",
              cursor: "pointer",
              marginLeft: "5px",
            }}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
