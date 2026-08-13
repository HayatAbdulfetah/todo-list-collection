const tasks = require("../data/taskData");

// 1. READ: Get all tasks
const getAllTasks = () => {
  return tasks;
};

// 2. READ: Get a single task by its ID
const getTaskById = (id) => {
  // Convert the id to a number, just in case it comes in as a string
  return tasks.find((task) => task.id === Number(id));
};

// 3. CREATE: Add a new task
const createTask = (title, priority) => {
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    title: title,
    completed: false,
    priority: priority,
  };

  tasks.push(newTask);
  return newTask;
};

// 4. UPDATE: Modify an existing task (e.g., toggling completion)
const updateTask = (id, updates) => {
  const taskIndex = tasks.findIndex((task) => task.id === Number(id));

  if (taskIndex === -1) return null;

  tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
  return tasks[taskIndex];
};

// 5. DELETE: Remove a task entirely
const deleteTask = (id) => {
  const taskIndex = tasks.findIndex((task) => task.id === Number(id));

  if (taskIndex === -1) return false;

  // Remove 1 item at the specific index
  tasks.splice(taskIndex, 1);
  return true;
};

// Export all the functions so our Controllers can use them
module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
