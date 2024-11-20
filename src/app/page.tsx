"use client";

import React, { useState, useEffect } from 'react';
import { Todo } from './interfaces/Todo';
import TodoItem from './components/todo-item';

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Added search query state

  // Fetch todos from the API when the component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      setError(null); 
      try {
        const response = await fetch('/api/todos'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []); // Empty dependency array to fetch only once when the component mounts

  // Filter todos based on the search query
  const filteredTodos = todos.filter(todo =>
    todo.task_name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter todos by search query
  );

  // Add a new todo via the API
  const addTodo = async () => {
    if (newTodo.trim()) {
      try {
        setError(null); 
        const response = await fetch('/api/todos', { // Adjust the endpoint to where you create todos
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ task_name: newTodo }),
        });

        if (!response.ok) {
          throw new Error('Failed to add todo');
        }

        const newTodoItem = await response.json();
        setTodos((prevTodos) => [...prevTodos, newTodoItem]);
        setNewTodo('');
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }
  };

  // Toggle completion status of a todo
  const toggleComplete = async (id: number, task_name: string) => {
    try {
      setError(null); 
      const response = await fetch(`/api/todos/${id}`, { // Endpoint for updating a todo
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task_name: task_name, completed: true }), // Update completed state here
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  // Edit a todo via the API
  const editTodo = async (id: number, newText: string) => {
    try {
      setError(null); 
      const response = await fetch(`/api/todos/${id}`, { // Endpoint for updating a todo
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task_name: newText, completed: false }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      setTodos(
        todos.map(todo => (todo.id === id ? { ...todo, task_name: newText } : todo))
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  // Delete a todo via the API
  const deleteTodo = async (id: number) => {
    try {
      setError(null); 
      const response = await fetch(`/api/todos/${id}`, { // Endpoint for deleting a todo
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query as user types
        placeholder="Search tasks"
      />

      {/* Add Todo Input */}
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>

      {/* Todo List */}
      <div>
        {filteredTodos.map((todo) => ( // Map over filtered todos
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={toggleComplete} // Ensure toggleComplete method is implemented
            onEdit={editTodo} // Ensure editTodo method is implemented
            onDelete={deleteTodo} // Ensure deleteTodo method is implemented
          />
        ))}
      </div>
    </div>
  );
};

export default Home;