// frontend/app.js
const API_URL = 'http://localhost:5000/api/tasks';
const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');

// --- 1. GET TASKS ---
async function fetchTasks() {
  try {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    
    taskList.innerHTML = ''; 
    
    tasks.forEach(task => {
      const li = document.createElement('li');
      if (task.completed) li.classList.add('completed');
      
      // We are adding a Checkbox to toggle and a Button to delete
      li.innerHTML = `
        <span>
          <input type="checkbox" ${task.completed ? 'checked' : ''} 
            onchange="toggleTask(${task.id}, ${task.completed})">
          <strong>${task.title}</strong> (${task.priority})
        </span>
        <button onclick="deleteTask(${task.id})" style="background: red; color: white; border: none; padding: 5px; cursor: pointer;">Delete</button>
      `;
      
      taskList.appendChild(li);
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

// --- 2. POST A NEW TASK ---
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault(); 
  const title = document.getElementById('title').value;
  const priority = document.getElementById('priority').value;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, priority }) 
    });

    if (response.ok) {
      fetchTasks(); 
      taskForm.reset(); 
    }
  } catch (error) {
    console.error('Error adding task:', error);
  }
});

// --- 3. BONUS: TOGGLE COMPLETED (PATCH) ---
async function toggleTask(id, currentStatus) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !currentStatus }) // Flip true to false, or false to true
    });
    fetchTasks(); // Refresh the UI
  } catch (error) {
    console.error('Error toggling task:', error);
  }
}

// --- 4. BONUS: DELETE FROM UI (DELETE) ---
async function deleteTask(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    fetchTasks(); // Refresh the UI
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}

// Load tasks on startup
fetchTasks();