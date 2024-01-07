const express = require('express');
const router = express.Router();

let tasks = []; // This will store our tasks in memory
let nextId = 1; // Helper variable to assign unique IDs to tasks

// Helper function for basic validation
const validateTask = (task) => {
  if (!task.title || !task.description) {
    return false;
  }
  return true;
};

// GET /tasks - Retrieve a list of all tasks
router.get('/', (req, res) => {
  res.status(200).json(tasks);
});

// GET /tasks/:id - Retrieve a specific task by ID
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).send('Task not found');
  }
  res.status(200).json(task);
});

// POST /tasks - Create a new task
router.post('/', (req, res) => {
  if (!validateTask(req.body)) {
    return res.status(400).send('Invalid task');
  }
  const task = {
    id: nextId++,
    title: req.body.title,
    description: req.body.description
  };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT /tasks/:id - Update an existing task by ID
router.put('/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).send('Task not found');
  }
  if (!validateTask(req.body)) {
    return res.status(400).send('Invalid task');
  }
  const updatedTask = {
    id: tasks[taskIndex].id,
    title: req.body.title,
    description: req.body.description
  };
  tasks[taskIndex] = updatedTask;
  res.status(200).json(updatedTask);
});

// DELETE /tasks/:id - Delete a task by ID
router.delete('/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).send('Task not found');
  }
  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

module.exports = router;
