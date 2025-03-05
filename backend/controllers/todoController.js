const Todo = require("../models/todoModel");

// Create a new task
exports.createTodo = async (req, res) => {
    try {
      const newTodo = new Todo(req.body);
      await newTodo.save();
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
// Get all tasks
exports.getTodos = async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Update a task
exports.updateTodo = async (req, res) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedTodo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Delete a task
exports.deleteTodo = async (req, res) => {
    try {
      await Todo.findByIdAndDelete(req.params.id);
      res.json({ message: "Todo deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };