const express = require("express");
const cors = require("cors");
const { PORT, APP_NAME } = require("./config/env");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// --- MIDDLEWARE ---
// Enable CORS so the frontend can communicate with the backend
app.use(cors());

app.use(express.json());

// --- ROUTES ---
// Mount the task routes. Every route in taskRoutes.js will now be prefixed with '/api/tasks'
app.use("/api/tasks", taskRoutes);

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`${APP_NAME} is running on http://localhost:${PORT}`);
});
