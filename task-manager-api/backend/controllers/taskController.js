const taskService = require("../services/taskService");

// GET /api/tasks
const getTasks = (req, res) => {
  let tasks = taskService.getAllTasks();
  
  // Check if the URL includes '?completed=true' or '?completed=false'
  const { completed } = req.query;

  if (completed !== undefined) {
    const isCompleted = completed === 'true';
    tasks = tasks.filter(task => task.completed === isCompleted);
  }

  res.status(200).json(tasks);
};

// GET /api/tasks/:id
const getTask = (req, res) => {
  const task = taskService.getTaskById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json(task);
};

// POST /api/tasks
const createTask = (req, res) => {
  const { title, priority } = req.body;

  if (!title || !priority) {
    return res.status(400).json({ message: "Title and priority are required" });
  }

  // validate priority
  const validPriorities = ["low", "medium", "high"];
  if (!validPriorities.includes(priority)) {
    return res
      .status(400)
      .json({ message: "Priority must be low, medium, or high" });
  }

  const newTask = taskService.createTask(title, priority);
  res.status(201).json(newTask); // 201 Created
};

// PATCH /api/tasks/:id
const updateTask = (req, res) => {
  const updatedTask = taskService.updateTask(req.params.id, req.body);

  if (!updatedTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json(updatedTask);
};

// DELETE /api/tasks/:id
const deleteTask = (req, res) => {
  const isDeleted = taskService.deleteTask(req.params.id);

  if (!isDeleted) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({ message: "Task deleted successfully" });
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
