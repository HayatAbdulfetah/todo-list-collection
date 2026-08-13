const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Map the routes to the controller functions
router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTask);
router.post("/", taskController.createTask);
router.patch("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
