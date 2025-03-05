import React, { useState, useEffect } from "react";
import "./TodoApp.css"; // Importing the CSS file

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/todos");
      if (!response.ok) throw new Error("Failed to fetch todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Add a new todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) throw new Error("Failed to add todo");
      setTitle("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Delete a todo
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete todo");
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Start editing a todo
  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  // Update a todo
  const handleEdit = async (id) => {
    if (!editText.trim()) return;
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editText }),
      });
      if (!response.ok) throw new Error("Failed to update todo");
      setEditingId(null);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h2>📝 Todo App</h2>

      {/* Todo Form */}
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task"
          className="input"
        />
        <button type="submit" className="add-btn">Add</button>
      </form>

      {/* Todo List */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            {editingId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="edit-input"
                />
                <button className="save-btn" onClick={() => handleEdit(todo._id)}>Save</button>
                <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{todo.title}</span>
                <div>
                  <button className="edit-btn" onClick={() => startEdit(todo._id, todo.title)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(todo._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
