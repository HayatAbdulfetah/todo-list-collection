# Task Manager REST API

A full-stack Task Manager application built with an Express.js backend and a vanilla JavaScript frontend. This project demonstrates a clean MVC architecture and a RESTful API.

## Features

- Full CRUD operations for tasks (Create, Read, Update, Delete)
- In-memory data storage
- MVC Architecture (Routes, Controllers, Services, Data)
- Custom error handling (400 and 404 status codes)
- CORS enabled for frontend-backend communication

## API Endpoints

- `GET /api/tasks` – Get all tasks
- `GET /api/tasks/:id` – Get a single task by ID
- `POST /api/tasks` – Create a new task
- `PATCH /api/tasks/:id` – Update a task (e.g., mark as completed)
- `DELETE /api/tasks/:id` – Delete a task

## Project Structure

```text
project/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── data/
└── frontend/
    ├── index.html
    ├── script.js
    └── style.css
```

## Setup and Installation

1. Clone the repository:

```bash
git clone https://github.com/HayatAbdulfetah/task-manager-api
```

2. Navigate to the backend directory:

```bash
cd backend
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file in the `backend` directory and add the following:

```env
PORT=5000
APP_NAME=TaskManagerAPI
```

5. Start the development server:

```bash
npm run dev
```

6. Open `frontend/index.html` in your web browser to use the application.

## Notes

- This project uses **in-memory data storage**, so all tasks are reset whenever the server restarts.
- CORS is enabled to allow communication between the frontend and backend during development.
