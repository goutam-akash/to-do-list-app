"use client";

import React, { useState, useEffect } from "react";
import { Todo } from "./interfaces/Todo";
import TodoItem from "./components/todo-item";

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Default to true to show loading placeholder
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch todos from the API when the component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/todos"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await response.json();
        setTodos(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Filter todos based on the search query
  const filteredTodos = todos.filter((todo) =>
    todo.task_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add a new todo via the API
  const addTodo = async () => {
    if (newTodo.trim()) {
      try {
        const response = await fetch("/api/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task_name: newTodo }),
        });

        if (!response.ok) {
          throw new Error("Failed to add todo");
        }

        const newTodoItem = await response.json();
        setTodos((prevTodos) => [...prevTodos, newTodoItem]);
        setNewTodo("");
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', minHeight: '100vh', color: '#fff' }}>
      {/* Display error message if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks"
        style={{
          padding: '10px',
          marginBottom: '20px',
          width: '90%',
          borderRadius: '4px',
          border: '1px solid #555',
          backgroundColor: '#333',
          color: '#fff',
        }}
      />

      {/* Add Todo Input */}
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          style={{
            padding: '10px',
            flex: 1,
            borderRadius: '4px',
            border: '1px solid #555',
            backgroundColor: '#333',
            color: '#fff',
            marginRight: '10px',
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            border: 'none',
            borderRadius: '4px',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          + Add Task
      
        </button>
      </div>

      {/* Display loading placeholder or todo list */}
      {loading ? (
        <div>
          {/* Skeleton Placeholder */}
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#333333",
                height: "50px",
                marginBottom: "10px",
                borderRadius: "4px",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  backgroundColor: "#555555",
                  width: "60%",
                  height: "12px",
                  borderRadius: "4px",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "#555555",
                  width: "20%",
                  height: "12px",
                  borderRadius: "4px",
                }}
              ></div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={() => {}}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
